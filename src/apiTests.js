/* global Worker,location,crypto */

var tests = [
  //
  // basic tests
  //
  {
    name: 'IndexedDB',
    category: 'Storage',
    func: () => typeof indexedDB !== 'undefined',
    specification: 'https://w3c.github.io/IndexedDB/'
  },
  {
    name: 'WebSQL',
    category: 'Storage',
    func: () => typeof openDatabase !== 'undefined',
    specification: 'https://www.w3.org/TR/webdatabase/'
  },
  {
    name: 'LocalStorage',
    category: 'Storage',
    func: () => typeof localStorage !== 'undefined',
    specification: 'https://html.spec.whatwg.org/multipage/webstorage.html#dom-localstorage'
  },
  {
    name: 'SessionStorage',
    category: 'Storage',
    func: () => typeof sessionStorage !== 'undefined',
    specification: 'https://html.spec.whatwg.org/multipage/webstorage.html#dom-sessionstorage'
  },
  {
    name: 'location.protocol',
    category: 'Location',
    func: () => typeof location.protocol === 'string',
    specification: 'https://html.spec.whatwg.org/multipage/browsers.html#dom-location-protocol'
  },
  {
    name: 'location.host',
    category: 'Location',
    func: () => typeof location.host === 'string',
    specification: 'https://html.spec.whatwg.org/multipage/browsers.html#dom-location-host'
  },
  {
    name: 'location.hostname',
    category: 'Location',
    func: () => typeof location.hostname === 'string',
    specification: 'https://html.spec.whatwg.org/multipage/browsers.html#dom-location-hostname'
  },
  {
    name: 'location.port',
    category: 'Location',
    func: () => typeof location.port === 'string',
    specification: 'https://html.spec.whatwg.org/multipage/browsers.html#dom-location-port'
  },
  {
    name: 'location.pathname',
    category: 'Location',
    func: () => typeof location.pathname === 'string',
    specification: 'https://html.spec.whatwg.org/multipage/browsers.html#dom-location-pathname'
  },
  {
    name: 'location.search',
    category: 'Location',
    func: () => typeof location.search === 'string',
    specification: 'https://html.spec.whatwg.org/multipage/browsers.html#dom-location-search'
  },
  {
    name: 'location.hash',
    category: 'Location',
    func: () => typeof location.hash === 'string',
    specification: 'https://html.spec.whatwg.org/multipage/browsers.html#dom-location-hash'
  },
  {
    name: 'location.origin',
    category: 'Location',
    func: () => typeof location.origin === 'string',
    specification: 'https://html.spec.whatwg.org/multipage/browsers.html#dom-location-origin'
  },
  {
    name: 'navigator.userAgent',
    category: 'Navigator',
    func: () => typeof navigator.userAgent === 'string',
    specification: 'https://html.spec.whatwg.org/multipage/webappapis.html#dom-navigator-useragent'
  },
  {
    name: 'navigator.onLine',
    category: 'Navigator',
    func: () => typeof navigator.onLine === 'boolean',
    specification: 'https://html.spec.whatwg.org/multipage/browsers.html#navigatoronline'
  },
  {
    name: 'navigator.sendBeacon',
    category: 'Navigator',
    func: () => typeof navigator.sendBeacon === 'function',
    specification: 'https://w3c.github.io/beacon/#sec-sendBeacon-method'
  },
  {
    name: 'navigator.product',
    category: 'Navigator',
    func: () => typeof navigator.product === 'string',
    specification: 'https://html.spec.whatwg.org/multipage/webappapis.html#dom-navigator-product'
  },
  {
    name: 'importScripts',
    category: 'Miscellaneous',
    func: () => typeof importScripts === 'function',
    specification: 'https://html.spec.whatwg.org/multipage/workers.html#dom-workerglobalscope-importscripts'
  },
  {
    name: 'setTimeout',
    category: 'Timers',
    func: () => typeof setTimeout === 'function',
    specification: 'https://html.spec.whatwg.org/multipage/webappapis.html#timers:dom-settimeout'
  },
  {
    name: 'clearTimeout',
    category: 'Timers',
    func: () => typeof clearTimeout === 'function',
    specification: 'https://html.spec.whatwg.org/multipage/webappapis.html#dom-cleartimeout'
  },
  {
    name: 'setInterval',
    category: 'Timers',
    func: () => typeof setInterval === 'function',
    specification: 'https://html.spec.whatwg.org/multipage/webappapis.html#dom-setinterval'
  },
  {
    name: 'clearInterval',
    category: 'Timers',
    func: () => typeof clearInterval === 'function',
    specification: 'https://html.spec.whatwg.org/multipage/webappapis.html#dom-cleartimeout'
  },
  {
    name: 'setImmediate',
    category: 'Timers',
    func: () => typeof setImmediate === 'function',
    specification: ''
  },
  {
    name: 'clearImmediate',
    category: 'Timers',
    func: () => typeof clearImmediate === 'function',
    specification: ''
  },
  {
    name: 'atob',
    category: 'Binary',
    func: () => typeof atob === 'function',
    specification: 'https://html.spec.whatwg.org/multipage/webappapis.html#dom-windowbase64-atob'
  },
  {
    name: 'btoa',
    category: 'Binary',
    func: () => typeof btoa === 'function',
    specification: 'https://html.spec.whatwg.org/multipage/webappapis.html#dom-windowbase64-btoa'
  },
  {
    name: 'Blob',
    category: 'Binary',
    func: () => typeof Blob === 'function',
    specification: 'https://w3c.github.io/FileAPI/#constructorBlob'
  },
  {
    name: 'FileReader',
    category: 'Binary',
    func: () => typeof FileReader === 'function',
    specification: 'https://w3c.github.io/FileAPI/#dfn-filereader'
  },
  {
    name: 'FileReaderSync',
    category: 'Binary',
    func: () => typeof FileReaderSync === 'function',
    specification: 'https://www.w3.org/TR/FileAPI/#FileReaderSync'
  },
  {
    name: 'createImageBitmap',
    category: 'Binary',
    func: () => typeof createImageBitmap === 'function',
    specification: 'https://html.spec.whatwg.org/multipage/webappapis.html#dom-createimagebitmap'
  },
  {
    name: 'Worker',
    category: 'Miscellaneous',
    func: () => typeof Worker === 'function',
    specification: 'https://html.spec.whatwg.org/multipage/workers.html#dom-worker'
  },
  {
    name: 'console',
    category: 'Miscellaneous',
    func: () => typeof console !== 'undefined',
    specification: 'https://github.com/DeveloperToolsWG/console-object/blob/master/api.md'
  },
  {
    name: 'fetch',
    category: 'Network',
    func: () => typeof fetch === 'function',
    specification: 'https://fetch.spec.whatwg.org/#dom-global-fetch'
  },
  {
    name: 'XMLHttpRequest',
    category: 'Network',
    func: () => typeof XMLHttpRequest === 'function',
    specification: 'https://xhr.spec.whatwg.org/'
  },
  {
    name: 'Promise',
    category: 'Timers',
    func: () => typeof Promise === 'function',
    specification: 'http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects'
  },
  {
    name: 'BroadcastChannel',
    category: 'Miscellaneous',
    func: () => typeof BroadcastChannel === 'function',
    specification: 'https://html.spec.whatwg.org/multipage/comms.html#dom-broadcastchannel'
  },
  {
    name: 'Cache',
    category: 'Storage',
    func: () => typeof caches === 'object',
    specification: 'https://www.w3.org/TR/service-workers/#cache'
  },
  {
    name: 'Channel Messaging',
    category: 'Miscellaneous',
    func: () => typeof MessageChannel === 'function',
    specification: 'https://html.spec.whatwg.org/multipage/#toc-comms'
  },
  {
    name: 'CustomEvent',
    category: 'Miscellaneous',
    func: () => typeof CustomEvent === 'function',
    specification: 'https://dom.spec.whatwg.org/#interface-customevent'
  },
  {
    name: 'DOMRequest',
    category: 'Miscellaneous',
    func: () => typeof DOMRequest === 'function',
    specification: ''
  },
  {
    name: 'DOMCursor',
    category: 'Miscellaneous',
    func: () => typeof DOMCursor === 'function',
    specification: ''
  },
  {
    name: 'FormData',
    category: 'Miscellaneous',
    func: () => typeof FormData === 'function',
    specification: 'https://xhr.spec.whatwg.org/#dom-formdata'
  },
  {
    name: 'ImageData',
    category: 'Binary',
    func: () => typeof ImageData === 'function',
    specification: 'https://html.spec.whatwg.org/multipage/scripting.html#dom-imagedata'
  },
  {
    name: 'Notifications',
    category: 'Miscellaneous',
    func: () => typeof Notification !== 'undefined',
    specification: 'https://notifications.spec.whatwg.org/#dom-notification-notificationtitle-options'
  },
  {
    name: 'performance',
    category: 'Miscellaneous',
    func: () => typeof performance !== 'undefined',
    specification: 'https://w3c.github.io/hr-time/#the-performance-attribute'
  },
  {
    name: 'TextEncoder/TextDecoder',
    category: 'Miscellaneous',
    func: () => typeof TextEncoder !== 'undefined' && typeof TextDecoder !== 'undefined',
    specification: 'https://www.w3.org/TR/encoding/'
  },
  {
    name: 'URL',
    category: 'Miscellaneous',
    func: () => typeof URL !== 'undefined',
    specification: 'https://url.spec.whatwg.org/'
  },
  {
    name: 'WebSockets',
    category: 'Network',
    func: () => typeof WebSocket !== 'undefined',
    specification: 'https://html.spec.whatwg.org/multipage/comms.html#network'
  },
  {
    name: 'EventSource (SSE)',
    category: 'Network',
    func: () => typeof EventSource !== 'undefined',
    specification: 'http://www.w3.org/TR/2009/WD-eventsource-20090423/'
  },
  {
    name: 'requestIdleCallback',
    category: 'Timers',
    func: () => typeof requestIdleCallback === 'function',
    specification: 'https://www.w3.org/TR/requestidlecallback/'
  },
  {
    name: 'WebCrypto',
    category: 'Miscellaneous',
    func: () => typeof crypto !== 'undefined' && typeof crypto.subtle !== 'undefined',
    specification: 'https://dvcs.w3.org/hg/webcrypto-api/raw-file/tip/spec/Overview.html#crypto-interface'
  },
  {
    name: 'Intl',
    category: 'Miscellaneous',
    func: () => typeof Intl !== 'undefined',
    specification: 'http://tc39.github.io/ecma402/#intl-object'
  }
]

module.exports = tests
