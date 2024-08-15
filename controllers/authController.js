const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const handleLogin = async (req, res) => {
    const { callsign, password } = req.body
    if (!callsign || !password) return res.status(400).json({ message: 'Callsign and password are required.' })

    try {
      const foundUser = await User.findOne({ callsign }).exec()
      if (!foundUser) return res.sendStatus(401)

        const match = await bcrypt.compare(password, foundUser.password)
        if (match) {
          const accessToken = jwt.sign(
            { userId: foundUser._id,
              callsign: foundUser.callsign },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '4h' }
            )
            res.json({ accessToken,
                       user: {
                        email: foundUser.email,
                        callsign: foundUser.callsign,
                        id: foundUser._id
                      }
                    })
        } else {
          res.sendStatus(401)
        }
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while processing your request.' })
    }
}

module.exports = { handleLogin }