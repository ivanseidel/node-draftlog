'use strict'
const util = require('util')
const stream = require('stream')
const PassThrough = stream.PassThrough

// Expose
module.exports = LineCountStream

/*
 * This is a PassThrough stream that keep track of how many lines have been logged.
 *
 * TODO: Account for terminal size changes/wrapping
 */
function LineCountStream(outStream) {
  // Checks if the outStream is already a LineCountStream. If so, return it
  if (outStream instanceof LineCountStream)
    return outStream

  // Make sure this is a new instance
  if (!(this instanceof LineCountStream))
    return new LineCountStream(outStream)

  // Call super constructor
  PassThrough.call(this)

  // Save outStream
  this._outStream = outStream

  // Initialize line and logs (line starts as 1)
  this._line = 1
  this._logs = 0

  // Flag indicating a change is being made not with current cursor
  this._editing = false

  // Pipe this data to output stream
  outStream && this.pipe(outStream)
}

// Inherits from PassThrough
util.inherits(LineCountStream, PassThrough)

/*
 * Get current line
 */
LineCountStream.prototype.line = function line() {
  return this._line
}

/*
 * Get log count
 */
LineCountStream.prototype.logs = function logs() {
  return this._logs
}

/*
 * On write, increment lines and logs
 *
 * Benchmark: http://jsperf.com/count-the-number-of-characters-in-a-string
 */
LineCountStream.prototype.write = function write(data) {
  if (! this._editing) {
    this.countLines(data)
  }
  this.push(data)
}

/*
 * Binds a inputStream to this, in order to account for extra lines
 * typed in the Terminal.
 * This method will bind event 'data' into the stream, and call
 * countLines(data) with the data. It will not account for '_editing',
 * because there can be user input while editing.
 */
LineCountStream.prototype.addLineListener = function addLineListener(inStream) {
  // Binds to 'data' event
  inStream.on('data', this.countLines.bind(this))
}

/*
 * Counts lines on the data and increment counters.
 * Compensation for `_editing` mode should be done 
 * outside this method. Keep this as clean as possible
 */
LineCountStream.prototype.countLines = function countLines(data) {
  var dataLines = (data.toString().split('\n').length - 1)
  this._logs++
  this._line += dataLines || 0
}

/*
 * Call this to stop line counts (during some change of data in previous records)
 */
LineCountStream.prototype.stopLineCount = function stopLineCount() {
  this._editing = true
}

/*
 * Call this to resume line counts
 */
LineCountStream.prototype.resumeLineCount = function resumeLineCount() {
  this._editing = false
}

/*
 * Proxy rows from the stream
 */
LineCountStream.prototype.rows = function rows() {
  return this._outStream.rows
}

/*
 * Proxy columns from the stream
 */
LineCountStream.prototype.columns = function columns() {
  return this._outStream.columns
}