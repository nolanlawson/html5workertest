/* global mocha,document,window */

require('./index')

var $ = document.querySelector.bind(document)
var runner = mocha.run()

var template = require('./myBrowser.hbs')

$('.loading').style.display = 'block'

runner.on('end', function () {
  $('.loading').style.display = 'none'
  if (!window.testResults['Service Workers']) {
    window.testResults['Service Workers'] = {}
    Object.keys(window.testResults['Web Workers']).forEach(function (key) {
      window.testResults['Service Workers'][key] = false
    })
  }

  var workerTypes = window.testResults
  var html = template({workerTypes: workerTypes, uaString: navigator.userAgent})
  var el = document.createElement('div')
  el.innerHTML = html
  $('.container').appendChild(el)
})
