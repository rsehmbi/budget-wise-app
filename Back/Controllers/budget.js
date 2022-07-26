const { response } = require('express');
const { Pool } = require('pg');
const CryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");

var uuid = require('uuid');

var pool;

pool = new Pool({
    connectionString: 'postgres://abcbzhmz:WKDuSCwBbWd6SInyA0nRfGUMlI1fbOCY@heffalump.db.elephantsql.com/abcbzhmz',
    host: 'heffalump.db.elephantsql.com',
    user: 'abcbzhmz',
    password: 'WKDuSCwBbWd6SInyA0nRfGUMlI1fbOCY',
    database: 'db'
})

exports.deleteAllBudgets = async (req, res) => {
    var token = res.locals.userid
    var delete_query_string = `DELETE FROM budgettable WHERE userid = $1`
    try {
        const result = await pool.query(delete_query_string,[token])
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

exports.deleteBudget = async (req, res) => {
    var token = res.locals.userid
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
// Get logs of all budgets from budgettable
exports.getbudgetList = async (req, res) => {
    var token = res.locals.userid
    var query_string = `SELECT * FROM budgettable WHERE userid = $1`
    try {
        const result = await pool.query(query_string,[token])
        console.log(result.rows)
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
    var token = res.locals.userid
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
    var currentUserId = res.locals.userid

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

// Add new expenses for budget name already in database to the expensetable and update amount in budgettable
exports.addExpense = async (req, res) => {
    var budgetCategory = req.body.budgetcategory
    var amount = parseInt(req.body.amount)
    var description =  req.body.description
    var currentUserId = res.locals.userid
    const add_budget_query = `INSERT INTO expensetable (userid, budgetcategory, amount, description, date) VALUES ($1,$2,$3,$4, CURRENT_DATE)`
    const update_amount = `UPDATE budgettable 
                           SET amount = (SELECT sum(amount) FROM expensetable WHERE budgetcategory=$1 AND userid=$2 GROUP BY budgetcategory) 
                           WHERE userid=$3 AND budgetname=$4`
    
    try {
        await pool.query(add_budget_query,[currentUserId, budgetCategory, amount, description])
        await pool.query(update_amount, [budgetCategory, currentUserId, currentUserId, budgetCategory])
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


exports.updateMaxAmount = async (req, res) => {
    var maxamount = parseInt(req.body.maxamount)
    var budgetname =  req.body.budgetname
    var currentUserId = res.locals.userid
    
    const update_budget_query = `UPDATE "budgettable" 
                   SET "maximumamount" = $1 
                   WHERE "userid" = $2 AND "budgetname" = $3`
    try {
        await pool.query(update_budget_query,[maxamount, currentUserId, budgetname])
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
        console.log(error)
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
    var currentUserId = res.locals.userid
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
    var currentUserId = res.locals.userid
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
    var currentUserId = res.locals.userid
    const getAllExpenses = `SELECT * FROM expensetable WHERE userid = $1 AND budgetcategory = $2`
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

// Get logs of all budgets from expensetable
exports.getBudgetLogs = async (req, res) => {
    var token = res.locals.userid
    var query_string = `SELECT * FROM expensetable WHERE userid = $1`
    try {
        const result = await pool.query(query_string, [token])
        console.log(result.rows)
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


exports.addCreditCard = async (req, res) => {
    var currentUserId = res.locals.userid
    var cardname = req.body.cardname
    var expiry = req.body.expiry
    var cardnumber  = req.body.number
    var amount = parseInt(req.body.amount)
    const add_creditcard_query = `INSERT INTO creditcards (userid, cardname, expiry, number, amount) VALUES ($1,$2,$3,$4,$5)`    
    try {
        await pool.query(add_creditcard_query, [currentUserId, cardname, expiry, cardnumber, amount])
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

exports.getAvailableCredit = async (req, res) => {
    var token = res.locals.userid
    var total_credit_query_string = `SELECT SUM (amount) AS total_credit FROM creditcards WHERE userid = $1`
    var total_expense_query_string = `SELECT SUM (amount) AS total_expense FROM budgettable WHERE userid = $1`
    
    try {
        const total_credit = await pool.query(total_credit_query_string, [token])
        const total_expense = await pool.query(total_expense_query_string,[token])
        let available_Credit = parseFloat(total_credit.rows[0]['total_credit']) - parseFloat(total_expense.rows[0]['total_expense'])
        res.json({
            isSuccess: true,
            message: "Success",
            res: available_Credit,
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

exports.getUserCreditCards = async (req, res) => {
    var token = res.locals.userid
    var query_string = `SELECT * FROM creditcards WHERE userid = $1`
    
    try {
        const result = await pool.query(query_string, [token])
        res.json({
            isSuccess: true,
            message: "Success",
            res: result.rows,
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