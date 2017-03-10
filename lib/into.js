'use strict'
const defaults = require('./defaults')
const LogDraft = require('./LogDraft')
const LineCountStream = require('./LineCountStream')

/*
 * Injects DrafLog into a console object
 * call with a seccond parameter as 'true' to 
 * Mock instalation, and add only the `draft` method
 * as a alias to `console.log`
 */
module.exports = function into(console, extra) {
  // If extra is set to `true`, it's production mode
  var production = (extra === true ? true : false)

  // If production mode, mock api
  if (production) {
    // Mock draft and set is as console.log
    console.draft = function draft() {
      // Log this
      console.log.apply(null, arguments)

      // Return usual console.log method
      return console.log.bind(console)
    }
    return 
  }

  // Transform stdout from console to LineCounter
  var lineCountStream = LineCountStream(console._stdout)
  console._stdout = lineCountStream

  // Can it bind to process.stdin automatically?
  if (defaults.stdinAutoBind) {
    lineCountStream.addLineListener(process.stdin)
  }

  // Add "draft" to console
  console.draft = console.draft || function draft() {
    // Create Draft at this point in time
    var logDraft = new LogDraft(console, 'log')

    // Log first
    logDraft.write.apply(logDraft, arguments)

    // Return update function
    return logDraft.update.bind(logDraft)
  }

  // Return the created Transform Stream
  return lineCountStream
}