import register from 'promise-worker/register'
import Promise from 'pouchdb-promise'

var resolved = Promise.resolve()

function runTest (func) {
  return resolved.then(() => {
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

function runCustomTest(message) {
  try {
    var fun = new Function('message', message.data.func)
    var passed = fun(message)
    self.postMessage({custom: true, passed: passed})
  } catch (e) {
    self.postMessage({custom: true, passed: false})
  }
}

self.addEventListener('message', message => {
  if (typeof message === 'string') {
    return // let promise-worker handle it
  }
  runCustomTest(message)
})