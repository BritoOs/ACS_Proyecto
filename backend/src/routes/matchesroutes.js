const express = require('express')
const router = express.Router()

const queries = require('../controllers/matchescontroller')

router.get('/matches', queries.allmatchesquery)

module.exports = router