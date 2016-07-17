if (typeof process.env.COUCH_URL === 'undefined') {
  throw new Error('you must provide a COUCH_URL environment variable!')
}

if (typeof process.env.COUCH_USERNAME === 'undefined') {
  throw new Error('you must provide a COUCH_USERNAME environment variable!')
}

if (typeof process.env.COUCH_PASSWORD === 'undefined') {
  throw new Error('you must provide a COUCH_PASSWORD environment variable!')
}