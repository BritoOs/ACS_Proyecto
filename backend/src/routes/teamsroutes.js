const express = require('express')
const router = express.Router()

const queries = require('../controllers/teamscontroller')

router.get('/teams', queries.allteamsquery)
router.post('/newteam', queries.newteam)

module.exports = router