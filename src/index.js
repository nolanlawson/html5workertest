/* global it,describe,after,Worker, */

import PromiseWorker from 'promise-worker'
import functionToString from 'function-to-string'
import tests from './tests'
import Promise from 'pouchdb-promise'
import UAParser from 'ua-parser-js'
import PouchDB from 'pouchdb-http'

var worker = new Worker('worker-bundle.js')
var promiseWorker = new PromiseWorker(worker)

describe('html5workertest', function () {
  this.timeout(30000)

  describe('worker', function () {
    var res = {}

    function runCustomTest (test) {
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
        try {
          customTest.preWorker(worker)
        } catch (e) {
          console.log(e)
          cleanup()
          reject(e)
        }
      }).then(e => {
        var passed = customTest.postWorker(e)
        res[test.name] = passed
      }, () => { // error, assume failure
        res[test.name] = false
      })
    }

    function runBasicTest (test) {
      return promiseWorker.postMessage({
        test: functionToString(test.func).body
      }).then(passed => {
        res[test.name] = passed
      })
    }

    tests.forEach(test => {
      it(test.name, () => {
        if (test.custom) {
          return runCustomTest(test)
        } else {
          return runBasicTest(test)
        }
      })
    })

    function displayResults () {
      var pre = document.createElement('pre')
      pre.style.position = 'absolute'
      pre.style.top = '0'
      pre.style.left = '40%'
      pre.style.background = 'rgba(0, 0, 0, 0.7)'
      pre.style.color = '#fafafa'
      pre.style.padding = '40px'
      pre.innerHTML = JSON.stringify(res, null, '  ')
      document.body.appendChild(pre)
    }

    function postResults () {
      var opts = {}
      if (process.env.COUCH_USERNAME) {
        opts = {
          auth: {
            username: process.env.COUCH_USERNAME,
            password: process.env.COUCH_PASSWORD
          }
        }
      }
      var db = new PouchDB(process.env.COUCH_URL, opts)
      var ua = new UAParser().getResult()
      return db.put({
        _id: new Date().toISOString(),
        ua: ua,
        results: res,
        version: 1
      })
    }

    after(() => {
      displayResults()

      if (typeof process.env.COUCH_URL !== 'undefined' && Object.keys(res).length === tests.length) {
        return postResults()
      }
    })
  })
})
