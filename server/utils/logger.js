// core
const path = require('path')
// libs
const _ = require('lodash')
const winston = require('winston')
require('winston-daily-rotate-file')
// env
const env = require('.env')


// Logger
// ============================================
// winston + winston-daily-rotate-file to setup log files

// Setting up the error.log
var errorLogTransport = new winston.transports.DailyRotateFile({
  filename: `${path.resolve(env.logs)}/${env.appName}_error.log`,
  datePattern: 'yy_MM_dd_',
  prepend: true,
  name: 'error',
  level: 'error'
})

// Setting up the debug.log
var debugLogTransport = new winston.transports.DailyRotateFile({
  filename: `${path.resolve(env.logs)}/${env.appName}_debug.log`,
  datePattern: 'yy_MM_dd_',
  prepend: true,
  name: 'debug',
  level: 'debug'
})

module.exports = new (winston.Logger)({
  transports: [
    errorLogTransport,
    debugLogTransport,
    new (winston.transports.Console)({
      name: 'console',
      colorize: true,
      level: 'debug'
    })
  ],
  exitOnError: false
})
