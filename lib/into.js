'use strict'
const LogDraft = require('./LogDraft')
const LineCountStream = require('./LineCountStream')

/*
 * Injects DrafLog into a console object
 */
module.exports = function into(console, method) {
  method = method || 'log'

  // Transform stdout from console to LineCounter
  console._stdout = new LineCountStream(console._stdout)

  // Add "draft" to console
  console.draft = function draft() {
    // Create Draft at this point in time
    var logDraft = new LogDraft(console, method)

    // Log first
    logDraft.write.apply(logDraft, arguments)

    // Return update function
    return logDraft.update.bind(logDraft)
  }
}