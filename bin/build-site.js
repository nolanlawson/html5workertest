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

var BROWSERS = ['Chrome', 'Firefox', 'IE', 'Edge', 'Safari', 'iOS', 'Android']
var WORKER_TYPES = ['Web Workers', 'Service Workers']

function getSimpleName (ua) {
  if (ua.device.type === 'mobile') {
    return ua.os.name
  }
  return ua.browser.name
}

function getVerboseVersion (ua) {
  if (ua.device.type === 'mobile') {
    return `${ua.browser.major} (${ua.os.name} ${ua.os.version})`
  }
  return ua.browser.major
}

function getVerboseName(simpleName) {
  if (simpleName === 'iOS') {
    return 'iOS Safari'
  } else if (simpleName === 'Android') {
    return 'Android Chrome'
  } else {
    return simpleName
  }
}

function getContext () {
  return db.replicate.from('http://nolan.cloudant.com/html5workertest').then(() => {
    return db.allDocs({ include_docs: true })
  }).then(res => {
    var docs = res.rows.map(_ => _.doc)
    var lastGroup = Math.max.apply(null, docs.map(_ => parseInt(_.group)))
    docs = docs.filter(doc => parseInt(doc.group) === lastGroup)

    var allApis = lodash.uniq(lodash.flatten(docs.map(doc => Object.keys(doc.results['Web Workers']))))

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

    var workerTypesToApisToBrowsersToSupported = WORKER_TYPES.map(workerType => {
      var apisToBrowserToSupported = {}
      allApis.forEach(api => {
        apisToBrowserToSupported[api] = []
      })

      browsersToResults.forEach(browser => {
        var workerResults = browser.results[ workerType ]
        Object.keys(apisToBrowserToSupported).forEach(api => {
          apisToBrowserToSupported[api].push({
            supported: workerResults && workerResults[ api ]
          })
        })
      })
      return {
        name: workerType,
        apis: apisToBrowserToSupported
      }
    })

    var browsersToWorkerTypesToApisToVersionsToSupported = BROWSERS.map(browser => {
      var browserDocs = docs.filter(doc => getSimpleName(doc.ua) === browser)
      // remove duplicates, which are added occasionally due to Travis restarted jobs
      browserDocs = lodash.uniqBy(browserDocs, doc => `${getSimpleName(doc.ua)}_${doc.ua.browser.major}`)

      var sortedVersions = browserDocs.sort((a, b) => compareVersion(a.ua.browser.major, b.ua.browser.major))

      var workerTypes = WORKER_TYPES.map(workerType => {
        var apisToVersionToSupported = {}
        allApis.forEach(api => {
          apisToVersionToSupported[api] = []
        })

        sortedVersions.forEach(version => {
          var workerResults = version.results[ workerType ]
          Object.keys(apisToVersionToSupported).forEach(api => {
            apisToVersionToSupported[ api ].push({
              supported: workerResults && workerResults[ api ]
            })
          })
        })
        return {
          name: workerType,
          versions: sortedVersions,
          apis: apisToVersionToSupported
        }
      })
      return {
        name: browser,
        verboseName: getVerboseName(browser),
        workerTypes: workerTypes,
        versions: sortedVersions.map(doc => getVerboseVersion(doc.ua))
      }
    })

    var templateContext = {
      browsers: browsersToResults,
      workerTypes: workerTypesToApisToBrowsersToSupported,
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
        })
      })
    }

    function buildAndLogErrors () {
      build().then(() => console.log('Built site')).catch(err => console.error(err.stack))
    }
    if (process.argv[process.argv.length - 1] !== 'dev') {
      return build()
    }

    watchGlob('www/*', lodash.debounce(buildAndLogErrors, 300))
    buildAndLogErrors()
  })
}

buildSite().catch(err => {
  console.error(err)
  console.error(err.stack)
  process.exit(1)
})