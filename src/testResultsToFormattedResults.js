var categories = require('./categories')
var apiTests = require('./apiTests')

var WORKER_TYPES = ['Web Workers', 'Service Workers']

// sort by categories in specified order, then api name in order
function testResultsToFormattedResults (testResults) {
  return WORKER_TYPES.map(workerType => {
    var workerResults = []
    var categoriesToApiTests = {}
    apiTests.forEach(apiTest => {
      categoriesToApiTests[ apiTest.category ] = categoriesToApiTests[ apiTest.category ] || []
      categoriesToApiTests[ apiTest.category ].push({
        name: apiTest.name,
        supported: testResults[workerType] && testResults[workerType][apiTest.name]
      })
    })
    categories.forEach(category => {
      categoriesToApiTests[category].sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)
      workerResults.push({
        name: category,
        results: categoriesToApiTests[category]
      })
    })
    return {
      name: workerType,
      results: workerResults
    }
  })
}

module.exports = testResultsToFormattedResults
