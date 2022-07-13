const { Pool } = require('pg');
const CryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");
var pool;

var uuid = require('uuid');

pool = new Pool({
    connectionString: 'postgres://abcbzhmz:WKDuSCwBbWd6SInyA0nRfGUMlI1fbOCY@heffalump.db.elephantsql.com/abcbzhmz',
    host: 'heffalump.db.elephantsql.com',
    user: 'abcbzhmz',
    password: 'WKDuSCwBbWd6SInyA0nRfGUMlI1fbOCY',
    database: 'db'
})

function decrypted(decryptedString){
    let newDecryptedString = decodeURIComponent(decryptedString)
    const decrypted = CryptoJS.AES.decrypt(newDecryptedString, process.env.EncryptedPass);
    return decrypted.toString(CryptoJS.enc.Utf8)
}


exports.login = async  (req, res) => {
    let userEmail = decrypted(req.body.email)
    let queryString = 'SELECT * FROM users WHERE ' + '"email"' + ' = ' + "'" + userEmail + "';"
    pool.query(queryString, (error, result) => {
        if (error || result.rows.length === 0){
            console.log(error)
            res.json({
                isSuccess: false,
                message: "no such email in db",
            })
        }
        else{
            const id = result.rows[0].id
            const token = jwt.sign({id}, process.env.JWT_VAR, {
                expiresIn: 2000
            })
            res.json({
                isSuccess: true,
                token: token,
            })
        }

    })
}

exports.isUserAuth = (req, res) => {
    const token = req.headers["x-access-token"]
    if (!token) {
        res.json({
            auth: false,
            status: "Token not provided",
        })
    } else {
        jwt.verify(token, process.env.JWT_VAR, (err, decoded) => {
            if (err){
                res.json({
                    auth: false,
                    status: "error during verifying token",
                })
            } else {
                let queryString = 'SELECT * FROM users WHERE ' + '"id"' + ' = ' + "'" + decoded.id + "';"
                pool.query(queryString, (error, result) => {
                    if (result === null){
                        res.json({
                            auth: false,
                            status: "error during verifying token",
                        })
                    } else if (error){
                        console.log(error)
                        res.json({
                            auth: false,
                            status: "error during verifying token",
                        })
                    }
                    else{
                        res.json({
                            auth: true,
                            status: "success auth",
                            email: result.rows[0].email
                        })
                    }
                })
            }
        })
    }
}


exports.signUp = async  (req, res) => {
    let userEmail = decrypted(req.body.email)
    let queryString = 'SELECT * FROM users WHERE ' + '"email"' + ' = ' + "'" + userEmail + "';"
    pool.query(queryString, (error, result) => {
        if (error){
            console.log(error)
            res.json({
                isSuccess: false,
                message: "error on server side",
            })
        }
        else if( result.rows.length > 0){
            res.json({
                isSuccess: false,
                message: "such email already exist",
            })
        }
        else{
            let id = uuid.v1().toString()
            queryString = 'INSERT INTO users VALUES (' + "'" + userEmail + "', "  + "'" + id + "', "  + "'" + true + "');"
            pool.query(queryString, (er, resul) => {
                if (er){
                    res.json({
                        isSuccess: false,
                        message: "error on server side",
                    })
                }
                else{
                    res.json({
                        isSuccess: true,
                        message: "email successfully added to the app. Try to log in",
                    })
                }
            })
        }

    })
}