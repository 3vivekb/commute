const {Schema} = require('mongoose')

import Organization from './organization'

const agencySchema = new Schema({
  name: {
    required: true,
    type: String
  }
})

agencySchema.pre('remove', function (next) {
  // CASCADE DELETE
  Organization.remove({ agencyId: this._id }).exec()
  next()
})

module.exports = agencySchema