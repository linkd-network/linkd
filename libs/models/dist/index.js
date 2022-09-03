
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./models.cjs.production.min.js')
} else {
  module.exports = require('./models.cjs.development.js')
}
