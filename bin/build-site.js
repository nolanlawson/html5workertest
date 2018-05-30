var PouchDB = require('pouchdb-node')
var db = new PouchDB('_pouch')
var lodash = require('lodash')
var fs = require('fs')
var denodeify = require('denodeify')
var readFile = denodeify(fs.readFile)
var writeFile = denodeify(fs.writeFile)
var handlebars = require('handlebars')
var compareVersion = require('compare-version')
var ncp = denodeify(require('ncp'))
var watchGlob = require('watch-glob')
var browserify = require('browserify')
var streamToPromise = require('stream-to-promise')

var BROWSERS = ['Chrome', 'Firefox', 'IE', 'Edge', 'Safari', 'iOS', 'Android']
var WORKER_TYPES = ['Web Workers', 'Service Workers']

var categories = require('../src/categories')
var apiTests = require('../src/apiTests')

function getSimpleName (ua) {
  if (ua.device.type === 'mobile') {
    return ua.os.name
  }
  return ua.browser.name
}

function getVerboseVersion (ua) {
  if (ua.device.type === 'mobile') {
    return `${ua.browser.version.replace(/(\.0)+$/, '')} (${ua.os.name} ${ua.os.version})`
  }
  return ua.browser.version.replace(/(\.0)+$/, '')
}

function getVerboseName (simpleName) {
  if (simpleName === 'iOS') {
    return 'iOS Safari'
  } else if (simpleName === 'Android') {
    return 'Android Chrome'
  } else {
    return simpleName
  }
}

function getContext () {
  return db.replicate.from('https://couchdb.nolanlawson.com/html5workertest').then(() => {
    return db.allDocs({ include_docs: true })
  }).then(res => {
    var docs = res.rows.map(_ => _.doc).filter(_ => !/^_design\//.test(_._id))
    var lastGroup = Math.max.apply(null, docs.map(_ => parseInt(_.group)))
    docs = docs.filter(doc => parseInt(doc.group) === lastGroup)

    var browsersToResults = BROWSERS.map(browser => {
      var browserDocs = docs.filter(doc => getSimpleName(doc.ua) === browser)
      var sorted = browserDocs.sort((a, b) => compareVersion(a.ua.browser.major, b.ua.browser.major))
      var latest = lodash.reverse(sorted)[0]
      return {
        name: browser,
        verboseName: getVerboseName(browser),
        version: latest.ua.browser.major,
        results: latest.results
      }
    })

    var workerTypesToCategoriesToApisToBrowsersToSupported = WORKER_TYPES.map(workerType => {
      var results = categories.map(category => {
        var results = apiTests.filter(_ => _.category === category).map(apiTest => {
          var results = browsersToResults.map(browser => {
            var workerResults = browser.results[ workerType ]
            return {
              name: browser.name,
              verboseName: getVerboseName(browser),
              supported: workerResults && workerResults[apiTest.name]
            }
          })
          return {
            name: apiTest.name,
            specification: apiTest.specification,
            results: results
          }
        }).sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
        return {
          name: category,
          results: results
        }
      })
      return {
        name: workerType,
        results: results
      }
    })

    var browsersToWorkerTypesToApisToVersionsToSupported = BROWSERS.map(browser => {
      var browserDocs = docs.filter(doc => getSimpleName(doc.ua) === browser)
      // remove duplicates, which are added occasionally due to Travis restarted jobs
      browserDocs = lodash.uniqBy(browserDocs, doc => `${getSimpleName(doc.ua)}_${doc.ua.browser.major}`)

      var sortedVersions = browserDocs.sort((a, b) => compareVersion(a.ua.browser.major, b.ua.browser.major))

      var workerTypes = WORKER_TYPES.map(workerType => {
        var results = categories.map(category => {
          var results = apiTests.filter(_ => _.category === category).map(apiTest => {
            var results = sortedVersions.map(version => {
              var workerResults = version.results[ workerType ]
              return {
                name: getVerboseVersion(version.ua),
                supported: workerResults && workerResults[apiTest.name]
              }
            })
            return {
              name: apiTest.name,
              specification: apiTest.specification,
              results: results
            }
          }).sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
          return {
            name: category,
            results: results,
            tableWidth: sortedVersions.length + 1
          }
        })
        return {
          name: workerType,
          results: results
        }
      })
      return {
        name: browser,
        verboseName: getVerboseName(browser),
        results: workerTypes,
        versions: sortedVersions.map(doc => getVerboseVersion(doc.ua))
      }
    })

    var templateContext = {
      browsers: browsersToResults,
      workerTypes: workerTypesToCategoriesToApisToBrowsersToSupported,
      detailedBrowsers: browsersToWorkerTypesToApisToVersionsToSupported
    }
    return templateContext
  })
}

function buildSite () {
  return getContext().then(templateContext => {
    function build () {
      return readFile('www/index.hbs', 'utf-8').then(templateSource => {
        var template = handlebars.compile(templateSource)
        var html = template(templateContext)
        return writeFile('dist/index.html', html, 'utf-8').then(() => {
          return ncp('./www', './dist')
        }).then(() => {
          return ncp('./node_modules/mocha/mocha.js', './dist/mocha.js')
        }).then(() => {
          return ncp('./service-worker-bundle.js', './dist/service-worker-bundle.js')
        }).then(() => {
          return ncp('./worker-bundle.js', './dist/worker-bundle.js')
        }).then(() => {
          var b = browserify('./src/testMyBrowser').transform('hbsify').transform('bubleify')
          return streamToPromise(b.bundle()).then(b => {
            return writeFile('www/test-bundle.js', b)
          })
        })
      })
    }

    function buildAndLogErrors () {
      build().then(() => console.log('Built site')).catch(err => {
        console.error(err)
        console.error(err.stack)
      })
    }
    if (process.argv[process.argv.length - 1] !== 'dev') {
      return build()
    }

    watchGlob(['src/*', 'www/*.hbs', 'www/*.css', 'www/*.html'], lodash.debounce(buildAndLogErrors, 300))
    buildAndLogErrors()
  })
}

buildSite().catch(err => {
  console.error(err)
  console.error(err.stack)
  process.exit(1)
})
