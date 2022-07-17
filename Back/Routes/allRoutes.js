const express = require('express')
const _r = express.Router()
const jwt = require("jsonwebtoken");

const { login , isUserAuth, signUp} = require('../Controllers/login')
const { getbudgetList, 
    getBudgetAggregate, 
    addbudget, addExpense, 
    updatebudget, 
    getBudgetNames, 
    getBudgetLogs, 
    getNameLogs, 
    deleteBudget, 
    deleteAllBudgets, 
    updateMaxAmount } =  require('../Controllers/budget')

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"]
    if (!token) {
        res.json({
            auth: false,
            status: "There is not token",
        })
    } else{
        jwt.verify(token, process.env.JWT_VAR, (err, decoded) => {
            if (err){
                res.json({
                    auth: false,
                    status: "you are fail to auth",
                })
            } else {
                res.locals.userid = decoded.id;  
                next()
            }
        })
    }
}


_r.post('/login', login)
_r.post('/signUp', signUp)
_r.post('/isUserAuth', isUserAuth)

_r.get('/getbudgetList', verifyJWT, getbudgetList)

_r.get('/getbudgetaggregate', verifyJWT, getBudgetAggregate)
_r.post('/addbudget',verifyJWT, addbudget)
_r.post('/addExpense', verifyJWT, addExpense)
_r.put('/updatebudget', verifyJWT, updatebudget)
_r.get('/BudgetLog/getBudgetNames',verifyJWT, getBudgetNames)
_r.delete('/deleteBudget', verifyJWT, deleteBudget)
_r.delete('/deleteAllBudgets', verifyJWT, deleteAllBudgets)
_r.put('/updateMaxAmount', verifyJWT, updateMaxAmount)

_r.get('/BudgetLog/getbudgetlogs', verifyJWT, getBudgetLogs)

_r.get('/BudgetLog/getbudgetlogs/:name', verifyJWT, getNameLogs)

module.exports = _r