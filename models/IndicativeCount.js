const mongoose = require('mongoose')

const indicativeCountSchema = new mongoose.Schema({
  callsign: { 
    type: String, 
    required: true, 
    unique: true 
  },
  count: { 
    type: Number, 
    default: 0 
  },
})

module.exports = mongoose.model('IndicativeCount', indicativeCountSchema)
