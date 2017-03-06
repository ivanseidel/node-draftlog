const chalk = require('chalk')
const DraftLog = require('../').into(console)

function QueueWorker(queueName){
  this.TAG = '[' + chalk.yellow(queueName) + ']'
  this.status = console.draft()
  this.working = false
  this.idle()
}

QueueWorker.prototype.isWorking = function () {
  return this.working
}

QueueWorker.prototype.idle = function () {
  this.working = false
  this.status(chalk.dim(this.TAG), chalk.dim('iddle'))
}

QueueWorker.prototype.run = function (){
  var self = this
  self.working = true
  self.status(self.TAG, chalk.green('Executing task...'))

  // Wait 300ms before next step
  setTimeout(function () {finished()}, 150 + Math.random() * 400)

  function finished() {
    self.idle()
  }
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
  if(tasksLeft-- <= 0) {
    // Cancel interval. All work is done
    clearInterval(interval)
  }

  // Get idle workers
  var idle = workers.filter(function (w) { return !w.isWorking() })

  // Run if existent
  idle[0] && idle[0].run()

}, 50)