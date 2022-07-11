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

// SELECT userid, budgetname, SUM (amount), MAX (maximumamount) FROM budgettable WHERE userid = 1 GROUP BY budgetname
exports.getBudgetAggregate = async  (req, res) => {
    pool.query('SELECT budgetname, sum(amount) as amount, max(maximumamount) as maximumamount FROM budgettable WHERE userid = 1 GROUP BY budgetname', (error, result) => {
        if (error){
            res.json({
                isSuccess: false,
                message: "Failed",
            })
        }
        else{
            console.log(result.rows)
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
    var amount = req.body.amount
    var currentUserId = 1 
    

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

// Add new expenses for budget name
exports.addExpense = async (req, res) => {
    var budgetname = req.body.budgetname
    var amount = parseInt(req.body.amount)
    var maxamount =  parseInt(req.body.maxamount)
    var currentUserId = 1
    const add_budget_query = `INSERT INTO budgettable (userid, budgetname, amount, maximumamount) VALUES ($1,$2,$3,$4)`
    try {
        await pool.query(add_budget_query,[currentUserId, budgetname, amount, maxamount])
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

// TODO: Removed from expenses card, will be used with logs to update logs
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

exports.getBudgetNames = async(req,res) => {
    var currentUserId = 1
    const getAllExpenses = `SELECT Distinct budgetname FROM budgettable WHERE userid = $1`
    try {
        const result = await pool.query(getAllExpenses, [currentUserId])
        res.json({
            isSuccess: true,
            res: result.rows,
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

exports.getNameLogs = async(req, res) => {
    const budgetName = req.params.name
    var currentUserId = 1
    const getAllExpenses = `SELECT * FROM budgettable WHERE userid = $1 AND budgetname = $2`
    try {
        const result = await pool.query(getAllExpenses, [currentUserId, budgetName])
        res.json({
            isSuccess: true,
            res: result.rows,
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