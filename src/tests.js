import { binaryStringToBlob, blobToArrayBuffer } from 'blob-util'
import functionToString from 'function-to-string'

var tests = [
  {
    name: 'IndexedDB',
    func: () => typeof indexedDB !== 'undefined'
  },
  {
    name: 'WebSQL',
    func: () => typeof openDatabase !== 'undefined'
  },
  {
    name: 'LocalStorage',
    func: () => typeof localStorage !== 'undefined'
  },
  {
    name: 'SessionStorage',
    func: () => typeof sessionStorage !== 'undefined'
  },
  {
    name: 'location.protocol',
    func: () => typeof location.protocol === 'string'
  },
  {
    name: 'location.host',
    func: () => typeof location.host === 'string'
  },
  {
    name: 'location.hostname',
    func: () => typeof location.hostname === 'string'
  },
  {
    name: 'location.port',
    func: () => typeof location.port === 'string'
  },
  {
    name: 'location.pathname',
    func: () => typeof location.pathname === 'string'
  },
  {
    name: 'location.search',
    func: () => typeof location.search === 'string'
  },
  {
    name: 'location.hash',
    func: () => typeof location.hash === 'string'
  },
  {
    name: 'location.origin',
    func: () => typeof location.origin === 'string'
  },
  {
    name: 'navigator.userAgent',
    func: () => typeof navigator.userAgent === 'string'
  },
  {
    name: 'navigator.onLine',
    func: () => typeof navigator.onLine === 'boolean'
  },
  {
    name: 'navigator.sendBeacon',
    func: () => typeof navigator.sendBeacon === 'function'
  },
  {
    name: 'importScripts',
    func: () => typeof importScripts === 'function'
  },
  {
    name: 'setTimeout',
    func: () => typeof setTimeout === 'function'
  },
  {
    name: 'clearTimeout',
    func: () => typeof clearTimeout === 'function'
  },
  {
    name: 'setInterval',
    func: () => typeof setInterval === 'function'
  },
  {
    name: 'clearInterval',
    func: () => typeof clearInterval === 'function'
  },
  {
    name: 'setImmediate',
    func: () => typeof setImmediate === 'function'
  },
  {
    name: 'clearImmediate',
    func: () => typeof clearImmediate === 'function'
  },
  {
    name: 'atob',
    func: () => typeof atob === 'function'
  },
  {
    name: 'btoa',
    func: () => typeof btoa === 'function'
  },
  {
    name: 'Blob',
    func: () => typeof Blob === 'function'
  },
  {
    name: 'FileReader',
    func: () => typeof FileReader === 'function'
  },
  {
    name: 'FileReaderSync',
    func: () => typeof FileReaderSync === 'function'
  },
  {
    name: 'createImageBitmap',
    func: () => typeof createImageBitmap === 'function'
  },
  {
    name: 'Sub-Worker',
    func: () => typeof Worker === 'function'
  },
  {
    name: 'console',
    func: () => typeof console !== 'undefined'
  },
  {
    name: 'Transferable to worker',
    custom: worker => {

      var func = message => {
        return {passed: message.data.buff.byteLength === 5}
      }

      return binaryStringToBlob('hello world').then(blobToArrayBuffer).then(buff => {
        worker.postMessage({buff: buff, func: functionToString(func).body}, [buff])
      })
    }
  }
]

export default tests