const express = require('express')
const _r = express.Router()


const { login , isUserAuth} = require('../Controllers/login')
const { getbudgetList, getBudgetAggregate, addbudget, addExpense, updatebudget, getBudgetNames, getNameLogs } =  require('../Controllers/budget')

_r.post('/login', login)
_r.post('/isUserAuth', isUserAuth)
_r.get('/getbudgetList', getbudgetList)
_r.get('/getbudgetaggregate', getBudgetAggregate)
_r.post('/addbudget', addbudget)
_r.post('/addExpense', addExpense)
_r.put('/updatebudget', updatebudget)
_r.get('/getBudgetNames', getBudgetNames)
_r.get('/getBudgetList/:name', getNameLogs)

module.exports = _r