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
