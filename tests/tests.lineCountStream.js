const chalk = require('chalk')
const assert = require('assert')
const stream = require('stream')

const Lib = require('../')

module.exports = [
  countsLines,
]

// Should bind to output stream (and receive stream data)
function countsLines() {
  var lineCounter = Lib.LineCountStream()

  lineCounter.write('this is\n')
  lineCounter.write('a test\n')
  lineCounter.write('to\nsee\n\n\n')
  lineCounter.write('if it counts\n')
  lineCounter.write('correctly\n')

  assert.equal(lineCounter.line(), 9)
  assert.equal(lineCounter.logs(), 5)
}