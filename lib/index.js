'use strict'

// Lib main object is 'into' method
var Lib = require('./into')

// Expose injecter 'into' method
Lib.into = Lib

// Expose Defaults
Lib.defaults = require('./defaults')

// Expose CSIHelper
Lib.CSIHelper = require('./CSIHelper')

// Expose LogDraft
Lib.LogDraft = require('./LogDraft')

// Expose LineCountStream
Lib.LineCountStream = require('./LineCountStream')

// Expose API
module.exports = Lib