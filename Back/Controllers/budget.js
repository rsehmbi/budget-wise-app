const { response } = require('express');
const { Pool } = require('pg');
var pool;

pool = new Pool({
    connectionString: 'postgres://abcbzhmz:WKDuSCwBbWd6SInyA0nRfGUMlI1fbOCY@heffalump.db.elephantsql.com/abcbzhmz',
    host: 'heffalump.db.elephantsql.com',
    user: 'abcbzhmz',
    password: 'WKDuSCwBbWd6SInyA0nRfGUMlI1fbOCY',
    database: 'db'
})


exports.getbudgetList = async  (req, res) => {
    pool.query('SELECT * FROM budgettable WHERE userid = 1', (error, result) => {
        if (error){
            res.json({
                isSuccess: false,
                message: "Failed",
            })
        }
        else{
            res.json({
                isSuccess: true,
                res: result.rows,
                message: "Success",
            })
        }

    })
}

exports.addbudget = async (req, res) => {
    var expense = req.body.expense
    var maxamount = req.body.maxamount
    var currentUserId = 1 
    var amount = 0 

    const add_budget_query = `INSERT INTO budgettable (userid, budgetname, amount, maximumamount) VALUES ($1,$2,$3,$4)`
    try {
        await pool.query(add_budget_query,[currentUserId, expense, amount, maxamount])
        res.json({
            isSuccess: true,
            message: "Success",
        })
    }
    catch (error){
        res.json({
            error: error,
            isSuccess: false,
            message: "Failed",
        })
    }
}

exports.updatebudget = async (req, res) => {
    var budgetname = req.body.budgetname
    var amount = parseInt(req.body.amount)
    var maxamount =  parseInt(req.body.maxamount)
    var currentUserId = 1
    const update_budget_query = `UPDATE "budgettable" 
                   SET "amount" = "amount" + $1, "maximumamount" = $2 
                   WHERE "userid" = $3 AND "budgetname" = $4`
    try {
        await pool.query(update_budget_query,[amount, maxamount, currentUserId, budgetname])
        res.json({
            isSuccess: true,
            message: "Success",
        })
    }
    catch (error) {
        console.log(error)
        res.json({
            error: error,
            isSuccess: false,
            message: "Failed",
        })
    }
}