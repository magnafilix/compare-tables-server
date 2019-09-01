const mongoose = require('mongoose')
const chalk = require('chalk')

const connected = chalk.bold.cyan
const disconnected = chalk.bold.yellow
const error = chalk.bold.red
const termination = chalk.bold.magenta

const mc = 'MongoDB connection'

module.exports = () => {
  mongoose.connect(process.env.DATABASE_URL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true
  })

  mongoose.connection
    .on('connected', () => console.log(connected(`${mc} is open`)))
    .on('error', e => console.log(error(`${mc} has occurred error: ${e}`)))
    .on('disconnected', () => console.log(disconnected(`${mc} is disconnected`)))

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(termination(`${mc} is disconnected due to application termination`))
      process.exit(0)
    })
  })
}