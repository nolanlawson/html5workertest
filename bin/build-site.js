var PouchDB = require('pouchdb-node')
var db = new PouchDB('_pouch')
var lodash = require('lodash')
var fs = require('fs')
var denodeify = require('denodeify')
var readFile = denodeify(fs.readFile)
var writeFile = denodeify(fs.writeFile)
var handlebars = require('handlebars')

var BROWSERS = ['Chrome', 'Firefox', 'Safari', 'Edge']

Promise.resolve().then(() => {
  return readFile('www/index.hbs', 'utf-8')
}).then(template => {
  return db.replicate.from('http://nolan.cloudant.com/html5workertest').then(() => {
    return db.allDocs({ include_docs: true })
  }).then(res => {
    var docs = res.rows.map(_ => _.doc)
    var lastGroup = Math.max.apply(null, docs.map(_ => parseInt(_.group)))
    docs = docs.filter(doc => parseInt(doc.group) === lastGroup)

    var browsersToLatestResults = BROWSERS.map(browser => {
      var doc = lodash.find(docs, doc => doc.ua.browser.name === browser)
      return {name: browser, results: doc.results}
    })

    var workerTypesToBrowsers = ['Web Workers', 'Service Workers'].map(workerType => {
      var apisToBrowserToSupported = {}

      browsersToLatestResults.forEach(browser => {
        var workerResults = browser.results[workerType]
        Object.keys(workerResults || {}).forEach(api => {
          apisToBrowserToSupported[api] = []
        })
      })
      browsersToLatestResults.forEach(browser => {
        var workerResults = browser.results[workerType]
        Object.keys(apisToBrowserToSupported).forEach(api => {
          apisToBrowserToSupported[api].push({
            browser: browser.name,
            supported: workerResults && workerResults[api]
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

    console.log(JSON.stringify(templateContext, null, '  '))

    var html = handlebars.compile(template)(templateContext)

    return writeFile('dist/index.htmlf', html, 'utf-8')
  })
}).catch(err => {
  console.error(err)
  console.error(err.stack)
  process.exit(1)
})
