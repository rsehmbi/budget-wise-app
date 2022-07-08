const express = require('express')
const _r = express.Router()


const {test} = require('../Controllers/APIs')


_r.post('/test', test)


module.exports = _r