var browserify = require('browserify')
var watchify = require('watchify')
var fs = require('fs')
var rollupify = require('rollupify')
var bubleify = require('bubleify')

var b = browserify('./src/worker', {
  cache: {},
  packageCache: {},
  plugin: [watchify],
  debug: true
}).transform(rollupify).transform(bubleify);

b.on('update', bundle)
bundle()

function bundle () {
  b.bundle().pipe(fs.createWriteStream('worker-bundle.js'));
}