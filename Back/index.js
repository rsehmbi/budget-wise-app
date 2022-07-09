const express = require('express')
var cors = require('cors');

const app = express()
app.use('/', cors())

const PORT = process.env.PORT || 3000
const path = require('path')
const  reactBuild = path.join(__dirname, '../','Front', 'build')

app.use(express.static(reactBuild))
app.use(express.json())

// app.get('/*', async(req, res) => {
//     res.sendFile(path.join(reactBuild, 'index.html'))
// })

app.use('/', require('./Routes/allRoutes'))

app.listen(PORT, () => {
    console.log('server is running on ' + PORT)
})


module.exports = app;