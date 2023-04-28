const chalk = require('chalk')
const DraftLog = require('../').into(console)

// Mock download
var downloadMock = setInterval

// Shows an installation log for a `library` on the `step`
function InstallationProgress(library, step, finished) {
  var fillSpaces = ' '.repeat(15 - library.length)
  if (finished) {
    return chalk.cyan.dim(' > ') + chalk.yellow.dim(library) + fillSpaces + chalk.green('Installed')
  } else {
    return chalk.cyan(' > ') + chalk.yellow(library) + fillSpaces+ chalk.blue(step)
  }
}

// Pretend do install stuff in series
var libs = ['async', 'lodash', 'mongodb', 'chalk', 'express', 'forever', 'socket.io', 'pm2', 'mocha']
var finished = false
var installed = 0

function startNextDownload() {
  if (installed >= libs.length) {
    // Finished! (logs only once)
    if (!finished) {
      console.log()
      console.log(chalk.green('Finished Installation.'))
      console.log()
      console.log()
    }
    finished = true
    return
  }

  install(libs[installed], startNextDownload)

  // Increment current install
  installed++
}


function install(lib, callback) {
  var status = console.draft()
  
  gatherDependencies()

  function gatherDependencies() {
    status(InstallationProgress(lib, 'gatherDependencies'))

    // Wait 300ms before next step
    setTimeout(function () {downloadDependencies()}, 100 + Math.random() * 200)
  }

  function downloadDependencies() {
    status(InstallationProgress(lib, 'downloading dependencies'))

    // Wait 300ms before next step
    setTimeout(function () {compileCode()}, 150 + Math.random() * 200)
  }

  function compileCode() {
    status(InstallationProgress(lib, 'compiling code'))

    // Wait 300ms before next step
    setTimeout(function () {finishUp()}, 50 + Math.random() * 200)
  }

  function finishUp() {
    status(InstallationProgress(lib, 'finished', true))
    callback()
  }
}


// Start demo here
console.log()
console.log()
console.log('Starting downloads...')
startNextDownload()
startNextDownload()