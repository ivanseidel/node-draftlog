/*
 * CSIHelper, or "Control Sequence Introducer Helper" is the translator of actions into
 * sequence of ANSI characters that will trigger some action in the Terminal.
 *
 * Note: CSI is not from the TV Series.
 *
 * More info: 
 *  - https://en.wikipedia.org/wiki/ANSI_escape_code
 *  - http://tldp.org/HOWTO/Bash-Prompt-HOWTO/x361.html
 *  - http://ascii-table.com/ansi-escape-sequences-vt-100.php
 */
var CSIHelper = module.exports = {}

const ESC = CSIHelper.ESC = '\u001b'

/*
 * Save current cursor position
 */
CSIHelper.save = function save() {
  return '\u001b7'
}

/*
 * Restore cursor position
 */
CSIHelper.restore = function restore() {
  return '\u001b8'
}

/*
 * Move cursor up `n` lines. Default is 1
 */
CSIHelper.up = function up(n) {
  n = typeof n === 'number' ? n : 1
  return n > 0 ? ESC + '[' + n + 'A' : ''
}

/*
 * Move cursor down `n` lines. Default is 1
 */
CSIHelper.down = function down(n) {
  n = typeof n === 'number' ? n : 1
  return n > 0 ? ESC + '[' + n + 'B' : ''
}

CSIHelper.clearLine = function clearLine() {
  return ESC + '[2K' + ESC + '[1G'
}