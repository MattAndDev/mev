'use strict'
// core
const EventEmitter = require('events').EventEmitter
const Mongoose = require('mongoose')
const logger = require('../utils/logger')
// env
const env = require('.env')

class Db extends EventEmitter {
  constructor (endPoint) {
    // eventemitter
    super()
  }

  // connect
  // ============================================
  // @params
  // db => String, the name of the db to connect to]
  //
  connect (db) {
    // try to conenct on setup
    Mongoose.connect(`mongodb://${env.host}/${db}`, { useMongoClient: true })
    // pass on
    let connection = Mongoose.connection
    // can't open connection
    connection.once('error', (err) => {
      // rady but pass error
      this.emit('connected', (err, null))
    })
    // connected and ready, emit event by passing connection
    connection.once('open', (e) => {
      this.emit('connected', null, db, connection)
    })
  }
}

module.exports = Db
