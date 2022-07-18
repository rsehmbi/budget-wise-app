const express = require('express')
var cors = require('cors');

const app = express()
app.use('/', cors())

const PORT = process.env.PORT || 3000
const path = require('path')
const  reactBuild = path.join(__dirname, 'build')


const dotenv = require('dotenv');
dotenv.config();

app.use(express.static(reactBuild))
app.use(express.json())

// Uncomment this to use build folder and running the app. 
// I set up my app differently through front end and back end 
// that's why i enabled cors and in my api calls you will see the localhost:3000/:APICALL

// app.get('/!*', async(req, res) => {
//     res.sendFile(path.join(reactBuild, 'index.html'))
// })

app.get('/BudgetLog', async(req, res) => {
    res.sendFile(path.join(reactBuild, 'index.html'))
})

app.use('/', require('./Routes/allRoutes'))

app.listen(PORT, () => {
    console.log('server is running on ' + PORT)
})


module.exports = app;