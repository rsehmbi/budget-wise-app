const express = require('express')
const _r = express.Router()


const { test } = require('../Controllers/APIs')
const { getbudgetList, addbudget, updatebudget, getBudgetNames, getNameLogs } =  require('../Controllers/budget')

_r.post('/test', test)
_r.get('/getbudgetList', getbudgetList)
_r.post('/addbudget', addbudget)
_r.put('/updatebudget', updatebudget)
_r.get('/getBudgetNames', getBudgetNames)
_r.get('/getBudgetList/:name', getNameLogs)

module.exports = _r