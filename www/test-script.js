/* global mocha */
((function () {
  var runner = mocha.run()
  runner.on('end', function () {
    console.log('end')
  })
}))()
