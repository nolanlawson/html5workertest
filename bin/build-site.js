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

function getContext () {
  return db.replicate.from('http://nolan.cloudant.com/html5workertest').then(() => {
    return db.allDocs({ include_docs: true })
  }).then(res => {
    var docs = res.rows.map(_ => _.doc)
    var lastGroup = Math.max.apply(null, docs.map(_ => parseInt(_.group)))
    docs = docs.filter(doc => parseInt(doc.group) === lastGroup)

    var browsersToLatestResults = BROWSERS.map(browser => {
      var browserDocs = docs.filter(doc => getSimpleName(doc.ua) === browser)
      var latest = browserDocs.sort((a, b) => compareVersion(b.ua.browser.major, a.ua.browser.major))[ 0 ]
      return { name: browser, results: latest.results }
    })

    var workerTypesToBrowsers = WORKER_TYPES.map(workerType => {
      var apisToBrowserToSupported = {}

      browsersToLatestResults.forEach(browser => {
        var workerResults = browser.results[ workerType ]
        Object.keys(workerResults || {}).forEach(api => {
          apisToBrowserToSupported[ api ] = []
        })
      })
      browsersToLatestResults.forEach(browser => {
        var workerResults = browser.results[ workerType ]
        Object.keys(apisToBrowserToSupported).forEach(api => {
          apisToBrowserToSupported[ api ].push({
            browser: browser.name,
            supported: workerResults && workerResults[ api ]
          })
        })
      })
      return {
        name: workerType,
        apis: apisToBrowserToSupported
      }
    })

    var templateContext = {
      browsers: browsersToLatestResults,
      workerTypes: workerTypesToBrowsers
    }
    return templateContext
  })
}

function buildSite () {
  return getContext().then(templateContext => {
    function build() {
      return readFile('www/index.hbs', 'utf-8').then(templateSource => {
        var template = handlebars.compile(templateSource)
        var html = template(templateContext)
        return writeFile('dist/index.html', html, 'utf-8').then(() => {
          return ncp('./www', './dist')
        })
      })
    }

    function buildAndLogErrors() {
      build().catch(err => console.error(err.stack))
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
