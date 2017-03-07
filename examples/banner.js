const chalk = require('chalk')
const DraftLog = require('../')

DraftLog(console).addLineListener(process.stdin)

// Shows a rolling name
var nodeStr = '  NodeJS is Awesome!    What else can you want from a language?   '.split('')

console.log()
console.log()
console.log()
console.log(chalk.dim('*'.repeat(nodeStr.length)))
var update = console.draft()
console.log(chalk.dim('*'.repeat(nodeStr.length)))
console.log()
console.log()

setInterval(function () {
  nodeStr.push(nodeStr.shift())
  update(chalk.yellow(nodeStr.join('')))
}, 100)