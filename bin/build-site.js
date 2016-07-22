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
  return readFile('www/index.html', 'utf-8')
}).then(template => {
  return db.replicate.from('http://nolan.cloudant.com/html5workertest').then(() => {
    return db.allDocs({ include_docs: true })
  }).then(res => {
    var docs = res.rows.map(_ => _.doc)
    var lastGroup = Math.max.apply(null, docs.map(_ => parseInt(_.group)))
    docs = docs.filter(doc => parseInt(doc.group) === lastGroup)

    var browsersToLatestResults = BROWSERS.map(browser => {
      return lodash.find(docs, doc => doc.ua.browser.name === browser)
    })

    var html = handlebars.compile(template)({
      browsers: browsersToLatestResults,
      workerTypes: ['Web Workers', 'Service Workers']
    })

    return writeFile('dist/index.html', html, 'utf-8')
  })
}).catch(err => {
  console.error(err)
  console.error(err.stack)
  process.exit(1)
})
