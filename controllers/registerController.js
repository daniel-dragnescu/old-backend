const User = require('../models/User')
const bcrypt = require('bcrypt')

const handleRegister = async (req, res) => {
  const { email, callsign, password } = req.body
  if (!email || !callsign || !password) return res.status(400).json({ message: 'Email, callsign, and password are required.' })

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { callsign }] }).exec()
    if (existingUser) {
      const existingField = existingUser.email === email ? 'Email' : 'Callsign';
      return res.status(409).json({ message: `${existingField} already exists.` })
    }

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = await User.create({ email, callsign, password: hashedPassword })
      res.status(201).json({ message: 'User created successfully.', user: newUser })
  } catch (error) {
      res.status(500).json({ message: 'An error occurred while creating the user.', error: error.message })
  }
}

module.exports = { handleRegister }

