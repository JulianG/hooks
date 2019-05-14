
         'use strict'

      if (process.env.NODE_ENV === 'production') {
        module.exports = require('./bananahooks.cjs.production.js')
      } else {
        module.exports = require('./bananahooks.cjs.development.js')
      }