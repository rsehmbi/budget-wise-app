const express = require('express')
const _r = express.Router()


const { test, getbudgetList } = require('../Controllers/APIs')


_r.post('/test', test)
_r.get('/getbudgetList', getbudgetList)

module.exports = _r