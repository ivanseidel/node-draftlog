module.exports = {
  /*
   * Number of lines after log has been created, to stop updating Log
   * Default value if console does not support rows counting
   */
  maximumLinesUp: 30,

  /*
   * ReWrites the line if maximumLinesUp reached, and reset _line
   */
  canReWrite: true,

  /*
   * Allows automatically binding to process.stdin as a input source.
   * Set to false, because it prevents the process from exiting,
   * and that's not cool. Let user decide if it's good to use or not.
   * Calls lineCountStream.addLineListener(process.stdin) when true
   */
  stdinAutoBind: false,
}