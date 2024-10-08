const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  callsign: {
      type: String,
      required: true,
      unique: true
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
      type: String,
      required: true,
      unique: true
  }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)
