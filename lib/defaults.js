module.exports = {
  /*
   * Number of lines after log has been created, to stop updating Log
   * Default value if console does not support rows counting
   */
  maximumLinesUp: 30,

  // ReWrites the line if maximumLinesUp reached, and reset _line
  canReWrite: true,
}