/* global mocha,document,window */
((function () {
  var $ = document.querySelector.bind(document)
  var runner = mocha.run()

  var template = Handlebars.compile($('#main-template').innerHTML)

  $('.loading').style.display = 'block'

  runner.on('end', function () {
    $('.loading').style.display = 'none'

    var workerTypes = window.testResults

    if (!window.testResults['Service Workers']) {
      window.testResults['Service Workers'] = {}
      Object.keys(window.testResults['Web Workers']).forEach(function (key) {
        window.testResults['Service Workers'][key] = false
      })
    }

    var html = template({workerTypes: workerTypes, uaString: navigator.userAgent})
    var el = document.createElement('div')
    el.innerHTML = html
    $('.container').appendChild(el)
  })
}))()
