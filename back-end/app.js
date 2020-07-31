const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// create express app
const app = express()

// enable cors
app.use(cors())

// parse application/json
app.use(bodyParser.json())

require('./routes/textRoutes')(app)

module.exports = app