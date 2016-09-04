/* global mocha,document,window */

require('./index') // loads the Mocha tests
var template = require('./myBrowser.hbs')

var testResultsToFormattedResults = require('./testResultsToFormattedResults')

var $ = document.querySelector.bind(document)
var runner = mocha.run()

$('.loading').style.display = 'block'

runner.on('end', function () {
  $('.loading').style.display = 'none'
  var formattedResults = testResultsToFormattedResults(window.mocha.__testResults)
  var html = template({formattedResults: formattedResults, uaString: navigator.userAgent})
  var el = document.createElement('div')
  el.innerHTML = html
  $('.container').appendChild(el)
})
