const { Pool } = require('pg');
var pool;

pool = new Pool({
    connectionString: 'postgres://abcbzhmz:WKDuSCwBbWd6SInyA0nRfGUMlI1fbOCY@heffalump.db.elephantsql.com/abcbzhmz',
    host: 'heffalump.db.elephantsql.com',
    user: 'abcbzhmz',
    password: 'WKDuSCwBbWd6SInyA0nRfGUMlI1fbOCY',
    database: 'db'
})


exports.test = async  (req, res) => {
    pool.query('SELECT * FROM users', (error, result) => {
        if (error){
            res.json({
                isSuccess: false,
                message: "we do not get it",
            })
        }
        else{
            res.json({
                isSuccess: true,
                res: result,
                message: "we get it",
            })
        }

    })
}


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