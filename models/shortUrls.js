const mongoose = require('mongoose')

const Schema = mongoose.Schema

const urlSchema = new Schema({
  shortCode: {
    type: String
  },
  realUrl: {
    type: String
  }
})

module.exports = mongoose.model('Shorten', urlSchema)