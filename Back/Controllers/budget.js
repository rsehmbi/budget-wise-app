const { response } = require('express');
const { Pool } = require('pg');
var pool;

let TEST_TOKEN = "U2FsdGVkX18/MBV90AXZBpcvv99bu153rmAdkzO1jjc="

pool = new Pool({
    connectionString: 'postgres://abcbzhmz:WKDuSCwBbWd6SInyA0nRfGUMlI1fbOCY@heffalump.db.elephantsql.com/abcbzhmz',
    host: 'heffalump.db.elephantsql.com',
    user: 'abcbzhmz',
    password: 'WKDuSCwBbWd6SInyA0nRfGUMlI1fbOCY',
    database: 'db'
})

exports.deleteBudget = async (req, res) => {
    console.log("I get callled")
    var token = TEST_TOKEN
    var budgetname = req.body.budgetname
    var delete_query_string = `DELETE FROM budgettable WHERE userid = $1 AND budgetname = $2`
    try {
        const result = await pool.query(delete_query_string,[token, budgetname ])
        res.json({
            isSuccess: true,
            message: "Success",
            res: result.rows,
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
// Get logs of all budgets
exports.getbudgetList = async (req, res) => {
    var token = TEST_TOKEN
    var query_string = `SELECT * FROM budgettable WHERE userid = $1`
    try {
        const result = await pool.query(query_string,[token])
        res.json({
            isSuccess: true,
            message: "Success",
            res: result.rows,
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

// Get distinct budget names based and total expenses
exports.getBudgetAggregate = async (req, res) => {
    var token = TEST_TOKEN
    pool.query('SELECT budgetname, sum(amount) as amount, max(maximumamount) as maximumamount FROM budgettable WHERE userid = $1 GROUP BY budgetname',[token], (error, result) => {
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

// Add a new budget name with amount, max amount etc
exports.addbudget = async (req, res) => {
    var expense = req.body.expense
    var maxamount = req.body.maxamount
    var amount = req.body.amount
    var currentUserId = TEST_TOKEN

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

// Add new expenses for budget name already in database
exports.addExpense = async (req, res) => {
    var budgetname = req.body.budgetname
    var amount = parseInt(req.body.amount)
    var maxamount =  parseInt(req.body.maxamount)
    var currentUserId = TEST_TOKEN
    const add_budget_query = `INSERT INTO budgettable (userid, budgetname, amount, maximumamount) VALUES ($1,$2,$3,$4)`
    try {
        await pool.query(add_budget_query,[currentUserId, budgetname, amount, maxamount])
        res.json({
            isSuccess: true,
            message: "Success",
        })
    }
    catch (error) {
        res.json({
            error: error,
            isSuccess: false,
            message: "Failed",
        })
    }
}

/* TODO: Convert this function to Update only max amount and add option in card to update max amount 
    Max amount will be same for a budget name and won't be shown in logs
    Log will show budget name, expense added, description and date
    Create another function to update expenses, budget name, description which will be placed in table showing log
*/
exports.updatebudget = async (req, res) => {
    var budgetname = req.body.budgetname
    var amount = parseInt(req.body.amount)
    var maxamount =  parseInt(req.body.maxamount)
    var currentUserId = TEST_TOKEN
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
        res.json({
            error: error,
            isSuccess: false,
            message: "Failed",
        })
    }
}

exports.getBudgetNames = async(req,res) => {
    var currentUserId = TEST_TOKEN
    const getAllExpenses = `SELECT budgetname FROM budgettable WHERE userid = $1`
    try {
        const result = await pool.query(getAllExpenses, [currentUserId])
        res.json({
            isSuccess: true,
            res: result.rows,
            message: "Success",
        })
    }
    catch (error) {
        res.json({
            error: error,
            isSuccess: false,
            message: "Failed",
        })
    }
}

exports.getNameLogs = async(req, res) => {
    const budgetName = req.params.name
    var currentUserId = TEST_TOKEN
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
        res.json({
            error: error,
            isSuccess: false,
            message: "Failed",
        })
    }

}