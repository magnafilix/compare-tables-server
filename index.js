const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const chalk = require('chalk')

require('dotenv').config()

module.exports = require('redis').createClient(6379, 'localhost')

const routes = require('./routes')

const app = express()
const router = express.Router()

const connectToDatabase = require('./helpers/db')
connectToDatabase()

routes(router)

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())

app.use('/', router)

app.use('*', (err, req, res, next) => {
  err.status = err.status || 500
  res.status(err.status)

  const message = err.message || 'Internal Server Error'

  res.send({ status: err.status, message })
})

app.listen(PORT, () => console.log(`${chalk.blue('Compare Tables')} is listening on port: ${PORT}`))