const chalk = require('chalk')
const DraftLog = require('../').into(console)

function QueueWorker(queueName) {
  this.TAG = '[' + chalk.yellow(queueName) + ']'
  this.status = console.draft()
  this.working = false
  this.idle()
}

QueueWorker.prototype.idle = function () {
  this.working = false
  this.status(chalk.dim(this.TAG), chalk.dim('idle'))
}

QueueWorker.prototype.run = function () {
  this.working = true
  this.status(this.TAG, chalk.green('Executing task...'))

  // Wait 150-550ms before next step
  setTimeout(() => this.idle(), 150 + Math.random() * 400)
}

console.log()
console.log()
console.log('> Workers:')

// Create multiple queues
var workers = []
for (var k = 0; k < 10; k++) {
  workers.push(new QueueWorker('worker:' + k))
}

console.log()
console.log()

// Simulate many queue tasks
var tasksLeft = 50
var interval = setInterval(function addQueue() {
  if (tasksLeft-- <= 0) {
    // Cancel interval. All work is done
    clearInterval(interval)
  }

  // Get idle workers
  var idle = workers.filter(w => !w.working)

  // Run if existent
  if (idle[0]) {
    idle[0].run()
  }
}, 50)
