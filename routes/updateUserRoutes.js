const express = require('express')
const router = express.Router()
const updateUserController = require('../controllers/updateUserController')

router.patch('/:id', updateUserController.handleUpdateUser)

module.exports = router
