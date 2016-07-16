import PromiseWorker from 'promise-worker'
import functionToString from 'function-to-string'
import tests from './tests'

var worker = new Worker('worker-bundle.js')
var promiseWorker = new PromiseWorker(worker)

var results = {}

describe('html5workertest', function () {

  this.timeout(30000)

  describe('worker', function () {

    var res = {}

    before(() => {
    })

    tests.forEach(test => {
      it(test.name, () => {
        return promiseWorker.postMessage({
          test: functionToString(test.func).body
        }).then(passed => {
          res[test.name] = passed
        })
      })
    })

    after(() => {
      console.log(res)
    })
  })
})
