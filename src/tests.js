/* global Worker,location */

var tests = [
  //
  // basic tests
  //
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
    name: 'navigator.product',
    func: () => typeof navigator.product === 'string'
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
    name: 'fetch',
    func: () => typeof fetch === 'function'
  },
  {
    name: 'XmlHTTPRequest',
    func: () => typeof XMLHttpRequest === 'function'
  },
  {
    name: 'Promise',
    func: () => typeof Promise === 'function'
  },
  {
    name: 'BroadcastChannel',
    func: () => typeof BroadcastChannel === 'function'
  },
  {
    name: 'Cache',
    func: () => typeof caches === 'object'
  },
  {
    name: 'Channel Messaging',
    func: () => typeof MessageChannel === 'function'
  },
  {
    name: 'CustomEvent',
    func: () => typeof CustomEvent === 'function'
  },
  {
    name: 'DOMRequest',
    func: () => typeof DOMRequest === 'function'
  },
  {
    name: 'DOMCursor',
    func: () => typeof DOMCursor === 'function'
  },
  {
    name: 'FormData',
    func: () => typeof FormData === 'function'
  },
  {
    name: 'ImageData',
    func: () => typeof ImageData === 'function'
  },
  {
    name: 'Notifications',
    func: () => typeof Notification !== 'undefined'
  },
  {
    name: 'performance',
    func: () => typeof performance !== 'undefined'
  },
  {
    name: 'TextEncoder/TextDecoder',
    func: () => typeof TextEncoder !== 'undefined' && typeof TextDecoder !== 'undefined'
  },
  {
    name: 'URL',
    func: () => typeof URL !== 'undefined'
  },
  {
    name: 'WebSockets',
    func: () => typeof WebSocket !== 'undefined'
  },
  {
    name: 'requestIdleCallback',
    func: () => typeof requestIdleCallback === 'function'
  }
]

export default tests
