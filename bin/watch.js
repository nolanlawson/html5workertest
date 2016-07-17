var browserify = require('browserify')
var watchify = require('watchify')
var fs = require('fs')
var babelify = require('babelify')

var b = browserify('./src/worker', {
  cache: {},
  packageCache: {},
  plugin: [watchify],
  debug: true
}).transform(babelify)

b.on('update', bundle)
bundle()

function bundle () {
  b.bundle().pipe(fs.createWriteStream('worker-bundle.js'))
}
