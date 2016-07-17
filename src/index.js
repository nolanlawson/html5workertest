import PromiseWorker from 'promise-worker'
import functionToString from 'function-to-string'
import tests from './tests'
import Promise from 'pouchdb-promise'

var worker = new Worker('worker-bundle.js')
var promiseWorker = new PromiseWorker(worker)

var results = {}

describe('html5workertest', function () {

  this.timeout(30000)

  describe('worker', function () {

    var res = {}

    before(() => {
    })

    function runCustomTest(test) {
      return new Promise((resolve) => {
        var listener = message => {
          if (!message.custom) {
            return
          }
          worker.removeEventListener('message', listener)
          resolve(message)
        }
        worker.addEventListener('message', listener)
        test.custom(worker)
      }).then(result => {
        res[test.name] = result.passed
      })
    }

    function runBasicTest(test) {
      return promiseWorker.postMessage({
        test: functionToString(test.func).body
      }).then(passed => {
        res[test.name] = passed
      })
    }

    tests.forEach(test => {
      it(test.name, () => {
        if (test.custom) {
          return runCustomTest(test);
        } else {
          return runBasicTest(test)
        }
      })
    })

    after(() => {
      var pre = document.createElement('pre')
      pre.style.position = 'absolute'
      pre.style.top = '0'
      pre.style.left = '40%'
      pre.style.background = 'rgba(0, 0, 0, 0.7)'
      pre.style.color = '#fafafa'
      pre.innerHTML = JSON.stringify(res, null, '  ')
      document.body.appendChild(pre)
    })
  })
})
