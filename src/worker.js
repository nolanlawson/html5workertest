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

function runCustomTest(e) {
  var func = new Function('e', e.data.func)
  self.postMessage({message: func(e)})
}

self.addEventListener('message', message => {
  if (typeof message === 'string') {
    return // let promise-worker handle it
  }
  runCustomTest(message)
})