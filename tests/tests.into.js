const chalk = require('chalk')
const assert = require('assert')
const Console = require('console').Console

const WritableStringStream = require('./WritableStringStream')

const Lib = require('../')

module.exports = [
  OverrideConsoleStream,
  OverrideConsoleStreamOnlyOnce
]

function OverrideConsoleStream() {
  var output = new WritableStringStream()
  var nconsole = new Console(output, output)

  Lib.into(nconsole)

  assert.notEqual(output, nconsole._stdout)
}

function OverrideConsoleStreamOnlyOnce() {
  var output = new WritableStringStream()
  var nconsole = new Console(output, output)

  Lib.into(nconsole)
  var newStream = nconsole._stdout
  Lib.into(nconsole)

  assert.equal(newStream, nconsole._stdout)
}