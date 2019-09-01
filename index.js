const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const redis = require('redis')
const chalk = require('chalk')

require('dotenv').config()

module.exports = redis.createClient()

const routes = require('./routes')

const app = express()
const router = express.Router()

const connectToDatabase = require('./services/db')
connectToDatabase()

routes(router)

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())

app.use('/', router)

app.use('*', (err, req, res, next) => {
  err.status = err.status || 500
  res
    .status(err.status)
    .send(err.message || 'Internal Server Error')
})

app.listen(PORT, () => console.log(`${chalk.blue('Compare Tables')} is listening on port: ${PORT}`))