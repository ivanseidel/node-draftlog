const assert = require('assert')

const package = require('../package.json')

module.exports = [
  hasNoDependencies,
]

function hasNoDependencies() {
  assert.equal('dependencies' in package, false, 'This should be a dependency-free repo. Dependencies are only allowed in devDependencies.')
}
