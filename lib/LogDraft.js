'use strict'
const util = require('util')
const defaults = require('./defaults')
const CSIHelper = require('./CSIHelper')

// Expose
module.exports = LogDraft

/*
 * This is a single Line object, that saves it's relative position
 * in terminal. It is responsible by updating itself.
 */
function LogDraft(console, methodName) {
  this._stream = console._stdout
  this._styleFn = console[methodName]

  // Valid flag. If set to false, should NOT write anymore
  this.valid = true

  // Save line where content will be saved
  this.saveLine()
}

/*
 * After creating a draft, you can call as many times as you want to update it
 */
LogDraft.prototype.update = function update(/* log arguments */) {
  // Get line difference
  var linesUp = this.linesUp()

  // Check if is offscreen
  if (this.isOffScreen()) {
    if (defaults.canReWrite) {
      // It can be rewritten, move line to current cursor line, and keep updating
      this.saveLine(-1)
    } else {
      // Invalidate and prevent writting
      this.valid = false
      return;
    }
  }

  // Start editing stream
  this._stream.stopLineCount()

  // Save state (if content is not null)
  this._stream.write(CSIHelper.save())

  // Move up cursor up
  this._stream.write(CSIHelper.up(linesUp))

  // Clear line
  this._stream.write(CSIHelper.clearLine())

  // Call write function
  this.write.apply(this, arguments)

  // Restore state
  this._stream.write(CSIHelper.restore())

  // Resume counting lines
  this._stream.resumeLineCount()
}

/*
 * Returns true if line is out of screen
 */
LogDraft.prototype.isOffScreen = function isOffScren() {
  var rows = this._stream.rows() || defaults.maximumLinesUp
  return this._stream.rows() <= this.linesUp()
}

/*
 * Return how many lines past our current log
 */
LogDraft.prototype.linesUp = function linesUp() {
  return this._stream.line() - this._line
}

/*
 * Writes to the stream by calling the writeFn. 
 * Will not print if it's invalid
 * Defaults to `_stream.write` (set on constructor)
 */
LogDraft.prototype.write = function write() {
  this.valid && this._styleFn.apply(this._styleFn, arguments)
}

/*
 * Saves current line number as the insertion point
 */
LogDraft.prototype.saveLine = function saveLine(relative) {
  relative = relative || 0
  this._line = this._stream.line() + relative
}