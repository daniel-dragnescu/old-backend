const express = require('express')
const router = express.Router()
const qsoController = require('../controllers/qsoController')

router.route('/')
  .get(qsoController.getAllQso)
  .post(qsoController.createNewQso)
  
router.route('/:id')
  .patch(qsoController.updateQso)
  .delete(qsoController.deleteQso)

router.get('/indicative/:callsign', qsoController.getIndicativeCount); // New route for fetching indicative count

module.exports = router
