const express = require('express')
const _r = express.Router()


const { test } = require('../Controllers/APIs')
const { getbudgetList, addbudget } =  require('../Controllers/budget')

_r.post('/test', test)
_r.get('/getbudgetList', getbudgetList)
_r.post('/addbudget', addbudget)

module.exports = _r