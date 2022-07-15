const express = require('express')
const _r = express.Router()


const { login , isUserAuth, signUp} = require('../Controllers/login')
const { getbudgetList, getBudgetAggregate, addbudget, addExpense, updatebudget, getBudgetNames, getNameLogs, deleteBudget } =  require('../Controllers/budget')

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
                next()
            }
        })
    }
}


_r.post('/login', login)
_r.post('/signUp', signUp)
_r.post('/isUserAuth', isUserAuth)
_r.get('/getbudgetList',  getbudgetList)
_r.get('/getbudgetaggregate', getBudgetAggregate)
_r.post('/addbudget', addbudget)
_r.post('/addExpense', addExpense)
_r.put('/updatebudget', updatebudget)
_r.get('/getBudgetNames', getBudgetNames)
_r.delete('/deleteBudget', deleteBudget)
_r.get('/getBudgetList/:name', getNameLogs)

module.exports = _r