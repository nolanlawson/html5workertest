/* global self */

import register from 'promise-worker/register'
import Promise from 'pouchdb-promise'

var resolved = Promise.resolve()

function runTest (func) {
  return resolved.then(() => {
    /* eslint-disable no-new-func */
    return new Function(func)()
  }).catch(err => {
    if (typeof console !== 'undefined' && typeof console.log === 'function') {
      console.log(err)
    }
    return false // failed
  })
}

register(message => {
  return runTest(message.test)
})

function runCustomTest (e) {
  /* eslint-disable no-new-func */
  var func = new Function('e', e.data.func)
  self.postMessage({message: func(e)})
}

self.addEventListener('message', e => {
  if (typeof e.data === 'string') {
    return // let promise-worker handle it
  }
  runCustomTest(e.data)
})

self.addEventListener('activate', function(event) {
  console.log('activate');
  event.waitUntil((() => {
    // activate right now
    return self.clients.claim()
  })())
})
