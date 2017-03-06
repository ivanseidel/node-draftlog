const chalk = require('chalk')
const DraftLog = require('../').into(console)

var frame = 0
var frames = ['-', '\\', '|', '/']
function Loading(text) {
  // Next frame
  frame = (frame + 1) % frames.length

  return chalk.blue(frames[frame]) + ' ' + chalk.yellow(text) + ' ' + chalk.blue(frames[frame])
}

console.log()
console.log()
var updateLoading = console.draft()

function loadingTest(){
  updateLoading(Loading('Inderteminate Loading...'))
}

// Keeps updating underteminate loading
var interval = setInterval(loadingTest, 100)

var steps = ['Doing that', 'Then that', 'And after that', 'We will finish', 'In', '3', '2', '1']
setInterval(function() {
  console.log(' > ' + chalk.cyan(steps.shift()))

  if(steps.length <= 0){
    console.log()
    console.log()
    process.exit()
  }
}, 500)
