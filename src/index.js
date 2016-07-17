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

    function runCustomTest(test) {
      var customTest = test.custom()
      if (!customTest) {
        // short circuit, feature not supported
        res[test.name] = false
        return
      }
      return new Promise((resolve, reject) => {
        var onMessage = e => {
          cleanup()
          resolve(e)
        }
        var onError = err => {
          cleanup(err)
          reject(err)
        }
        var cleanup = () => {
          worker.removeEventListener('message', onMessage)
          worker.removeEventListener('error', onError)
        }
        worker.addEventListener('message', onMessage)
        worker.addEventListener('error', onError)
        customTest.preWorker(worker)
      }).then(e => {
        var passed = customTest.postWorker(e)
        res[test.name] = passed
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
      pre.style.padding = '40px'
      pre.innerHTML = JSON.stringify(res, null, '  ')
      document.body.appendChild(pre)
    })
  })
})
