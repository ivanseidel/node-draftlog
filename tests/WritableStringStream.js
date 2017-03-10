var util = require('util')
var stream = require('stream')

// Expose
module.exports = WritableStringStream

function WritableStringStream(options) {
  stream.Writable.call(this, options)

  this.string = ''
}
util.inherits(WritableStringStream, stream.Writable)

WritableStringStream.prototype._write = function (chunk, enc, cb) {
  this.string += chunk.toString()
  cb()
}