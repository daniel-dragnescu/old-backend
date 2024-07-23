const mongoose = require('mongoose')

const qsoSchema = new mongoose.Schema(
  {
  callsign: {
    type: String,
    required: true,
  },
  rst_received: {
    type: Number,
    required: true
  },
  rst_sent: {
    type: Number,
    required: true
  },
  op: {
    type: String,
  },
  qth: {
    type: String
  },
  comments: {
    type: String
  }
}, 
{
  timestamps: true
}
)

module.exports = mongoose.model('Qso', qsoSchema)