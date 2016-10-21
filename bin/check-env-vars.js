var envVariables = [
  'SAUCE_USERNAME',
  'SAUCE_ACCESS_KEY'
]

envVariables.forEach(variable => {
  if (typeof process.env[variable] === 'undefined') {
    throw new Error(`you must provide a ${variable} environment variable!`)
  }
})
