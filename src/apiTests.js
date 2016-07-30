/* global Worker,location */

var tests = [
  //
  // basic tests
  //
  {
    name: 'IndexedDB',
    category: 'Storage',
    func: () => typeof indexedDB !== 'undefined'
  },
  {
    name: 'WebSQL',
    category: 'Storage',
    func: () => typeof openDatabase !== 'undefined'
  },
  {
    name: 'LocalStorage',
    category: 'Storage',
    func: () => typeof localStorage !== 'undefined'
  },
  {
    name: 'SessionStorage',
    category: 'Storage',
    func: () => typeof sessionStorage !== 'undefined'
  },
  {
    name: 'location.protocol',
    category: 'Location',
    func: () => typeof location.protocol === 'string'
  },
  {
    name: 'location.host',
    category: 'Location',
    func: () => typeof location.host === 'string'
  },
  {
    name: 'location.hostname',
    category: 'Location',
    func: () => typeof location.hostname === 'string'
  },
  {
    name: 'location.port',
    category: 'Location',
    func: () => typeof location.port === 'string'
  },
  {
    name: 'location.pathname',
    category: 'Location',
    func: () => typeof location.pathname === 'string'
  },
  {
    name: 'location.search',
    category: 'Location',
    func: () => typeof location.search === 'string'
  },
  {
    name: 'location.hash',
    category: 'Location',
    func: () => typeof location.hash === 'string'
  },
  {
    name: 'location.origin',
    category: 'Location',
    func: () => typeof location.origin === 'string'
  },
  {
    name: 'navigator.userAgent',
    category: 'Navigator',
    func: () => typeof navigator.userAgent === 'string'
  },
  {
    name: 'navigator.onLine',
    category: 'Navigator',
    func: () => typeof navigator.onLine === 'boolean'
  },
  {
    name: 'navigator.sendBeacon',
    category: 'Navigator',
    func: () => typeof navigator.sendBeacon === 'function'
  },
  {
    name: 'navigator.product',
    category: 'Navigator',
    func: () => typeof navigator.product === 'string'
  },
  {
    name: 'importScripts',
    category: 'Miscellaneous',
    func: () => typeof importScripts === 'function'
  },
  {
    name: 'setTimeout',
    category: 'Timers',
    func: () => typeof setTimeout === 'function'
  },
  {
    name: 'clearTimeout',
    category: 'Timers',
    func: () => typeof clearTimeout === 'function'
  },
  {
    name: 'setInterval',
    category: 'Timers',
    func: () => typeof setInterval === 'function'
  },
  {
    name: 'clearInterval',
    category: 'Timers',
    func: () => typeof clearInterval === 'function'
  },
  {
    name: 'setImmediate',
    category: 'Timers',
    func: () => typeof setImmediate === 'function'
  },
  {
    name: 'clearImmediate',
    category: 'Timers',
    func: () => typeof clearImmediate === 'function'
  },
  {
    name: 'atob',
    category: 'Binary',
    func: () => typeof atob === 'function'
  },
  {
    name: 'btoa',
    category: 'Binary',
    func: () => typeof btoa === 'function'
  },
  {
    name: 'Blob',
    category: 'Binary',
    func: () => typeof Blob === 'function'
  },
  {
    name: 'FileReader',
    category: 'Binary',
    func: () => typeof FileReader === 'function'
  },
  {
    name: 'FileReaderSync',
    category: 'Binary',
    func: () => typeof FileReaderSync === 'function'
  },
  {
    name: 'createImageBitmap',
    category: 'Binary',
    func: () => typeof createImageBitmap === 'function'
  },
  {
    name: 'Worker',
    category: 'Miscellaneous',
    func: () => typeof Worker === 'function'
  },
  {
    name: 'console',
    category: 'Miscellaneous',
    func: () => typeof console !== 'undefined'
  },
  {
    name: 'fetch',
    category: 'Network',
    func: () => typeof fetch === 'function'
  },
  {
    name: 'XMLHttpRequest',
    category: 'Network',
    func: () => typeof XMLHttpRequest === 'function'
  },
  {
    name: 'Promise',
    category: 'Timers',
    func: () => typeof Promise === 'function'
  },
  {
    name: 'BroadcastChannel',
    category: 'Miscellaneous',
    func: () => typeof BroadcastChannel === 'function'
  },
  {
    name: 'Cache',
    category: 'Storage',
    func: () => typeof caches === 'object'
  },
  {
    name: 'Channel Messaging',
    category: 'Miscellaneous',
    func: () => typeof MessageChannel === 'function'
  },
  {
    name: 'CustomEvent',
    category: 'Miscellaneous',
    func: () => typeof CustomEvent === 'function'
  },
  {
    name: 'DOMRequest',
    category: 'Miscellaneous',
    func: () => typeof DOMRequest === 'function'
  },
  {
    name: 'DOMCursor',
    category: 'Miscellaneous',
    func: () => typeof DOMCursor === 'function'
  },
  {
    name: 'FormData',
    category: 'Miscellaneous',
    func: () => typeof FormData === 'function'
  },
  {
    name: 'ImageData',
    category: 'Binary',
    func: () => typeof ImageData === 'function'
  },
  {
    name: 'Notifications',
    category: 'Miscellaneous',
    func: () => typeof Notification !== 'undefined'
  },
  {
    name: 'performance',
    category: 'Miscellaneous',
    func: () => typeof performance !== 'undefined'
  },
  {
    name: 'TextEncoder/TextDecoder',
    category: 'Miscellaneous',
    func: () => typeof TextEncoder !== 'undefined' && typeof TextDecoder !== 'undefined'
  },
  {
    name: 'URL',
    category: 'Miscellaneous',
    func: () => typeof URL !== 'undefined'
  },
  {
    name: 'WebSockets',
    category: 'Network',
    func: () => typeof WebSocket !== 'undefined'
  },
  {
    name: 'requestIdleCallback',
    category: 'Timers',
    func: () => typeof requestIdleCallback === 'function'
  }
]

module.exports = tests
