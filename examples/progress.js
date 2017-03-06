const chalk = require('chalk')
const DraftLog = require('../').into(console)

// Mock download
var downloadMock = setInterval

// Input progess goes from 0 to 100
function ProgressBar(progress) {
  // Make it 50 characters length
  progress = Math.min(100, progress)
  var units = Math.round(progress / 2)
  return chalk.dim('[') + chalk.blue('=').repeat(units) + ' '.repeat(50 - units) + chalk.dim('] ') + chalk.yellow(progress + '%')
}

console.log()
console.log()
console.log('Starting downloads...')

// Start 10 downloads
for (var i = 0; i < 10; i ++) {
  startDownload()
}

console.log()
console.log()


function startDownload() {
  var barLine = console.draft('Wait...')
  var progress = 0
  var interval = downloadMock(function () {
    // To add random speed, we use random:
    progress += Math.round(Math.random() * 5)

    // Update bar
    barLine(ProgressBar(progress))

    // Check ended
    if (progress >= 100) {
      barLine(ProgressBar(progress), chalk.green('Finished download!'))
      clearInterval(interval)
    }
  }, 50)
}