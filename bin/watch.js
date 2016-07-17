var browserify = require('browserify')
var watchify = require('watchify')
var fs = require('fs')
var babelify = require('babelify')

var webWorkerBundler = browserify('./src/worker', {
  cache: {},
  packageCache: {},
  plugin: [watchify],
  debug: true
}).transform(babelify)

webWorkerBundler.on('update', bundleWebWorker)
bundleWebWorker()

function bundleWebWorker () {
  webWorkerBundler.bundle().pipe(fs.createWriteStream('worker-bundle.js'))
}

var serviceWorkerBundler = browserify('./src/serviceWorker', {
  cache: {},
  packageCache: {},
  plugin: [watchify],
  debug: true
}).transform(babelify)

serviceWorkerBundler.on('update', bundleServiceWorker)
bundleServiceWorker()

function bundleServiceWorker () {
  serviceWorkerBundler.bundle().pipe(fs.createWriteStream('service-worker-bundle.js'))
}
