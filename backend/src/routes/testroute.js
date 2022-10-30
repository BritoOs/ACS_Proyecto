const express = require('express')
const router = express.Router()

const queries = require('../controllers/testcontroller')

router.get('/testdata', queries.testquery)

module.exports = router