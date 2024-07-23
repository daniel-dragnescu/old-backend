const User = require('../models/User')
const bcrypt = require('bcrypt')

const handleUpdateUser = async (req, res) => {
  const userId = req.params.id
  const { email, password } = req.body

  const allowedFields = ['email', 'password']

  const disallowedFields = Object.keys(req.body).filter(field => !allowedFields.includes(field))
  if (disallowedFields.length > 0) {
      return res.status(400).json({ message: `Cannot update ${disallowedFields.join(', ')}. Only email and password are allowed for update.` })
  }

  try {
    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({ message: 'User not found.' })
    }

    if (email) {
        user.email = email
    }

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
    }

    await user.save()

    return res.status(200).json({ message: 'User updated successfully.', user })

  } catch (error) {
    return res.status(500).json({ message: 'An error occurred while updating the user.', error: error.message })
  }
}


module.exports = { handleUpdateUser }
