'use strict'

const chalk = require('chalk')

const tests = [].concat(
  require('./tests.package'),
  require('./tests.CSIHelper'),
  require('./tests.lineCountStream'),
  require('./tests.into')
)

// Run tests
var allTestsOk = true

console.log()
console.log(chalk.yellow('Testing ' + require('../package').name))
console.log()

tests.map( executeTest )

console.log()
console.log(chalk[allTestsOk ? 'yellow' : 'red']('Completed'))
console.log()

process.exit(allTestsOk ? 0 : 1)

// Execute a single test
function executeTest (test) {
  try {
    test()
    showTestSuccess(test.name)
  } catch (e) {
    var error = e.stack || e

    showTestError(test.name, error)
    allTestsOk = false
  }
}

function showTestError(testName, retVal) {
  retVal = retVal || ''

  console.log(chalk.red(` ✕  ${testName}`))
    
  // Format lines in indentation
  const SPACER = '    '
  retVal = SPACER + retVal.toString().split('\n').join('\n' + SPACER)
  console.log(chalk.blue(retVal))
}

function showTestSuccess(testName) {
  console.log(chalk.green(` ✓  ${testName}`))
}