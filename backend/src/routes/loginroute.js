const express = require('express')
const router = express.Router()

const queries = require('../controllers/logincontroller')

router.post('/login', queries.loginquery)

module.exports = router