const chalk = require('chalk')
const assert = require('assert')
const stream = require('stream')

const Lib = require('../')

module.exports = [
  CSIsave,
  CSIrestore,
  CSImoveUp,
  CSImoveDown,
  CSIclearLine,
]

function CSIsave() {
  assert.equal(Lib.CSIHelper.save(), '\u001b7')
}

function CSIrestore() {
  assert.equal(Lib.CSIHelper.restore(), '\u001b8')
}

function CSImoveUp() {
  var ansi

  // Test up with default
  ansi = Lib.CSIHelper.up()
  assert.equal(ansi, '\033[1A')

  // Test custom up
  ansi = Lib.CSIHelper.up(100)
  assert.equal(ansi, '\033[100A')

  // Test 0 up
  ansi = Lib.CSIHelper.up(0)
  assert.equal(ansi, '')
}

function CSImoveDown() {
  var ansi

  // Test down with default
  ansi = Lib.CSIHelper.down()
  assert.equal(ansi, '\033[1B')

  // Test custom down
  ansi = Lib.CSIHelper.down(100)
  assert.equal(ansi, '\033[100B')

  // Test 0 down
  ansi = Lib.CSIHelper.down(0)
  assert.equal(ansi, '')
}

function CSIclearLine() {
  var ansi

  // Test up with default
  ansi = Lib.CSIHelper.clearLine()
  assert.equal(ansi, '\033[2K\033[1G')
}