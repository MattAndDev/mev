'use strict'
// relative paths
require('app-module-path').addPath(__dirname)
// core
const os = require('os')
// libs
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
// Classes
const Socket = require('./server/socket')
const Api = require('./server/api')
const Db = require('./server/db')
const Static = require('./server/static')
// env
const env = require('./.env')
const logger = require('./server/utils/logger')


class App {
  constructor () {
    // setup app
    this.app = require('express')()
    // setup server and pass express app -> to make sockets work
    this.server = require('http').Server(this.app)
    // dock sockets
    this.socket = new Socket(this.server)
    // init express stuff
    this.router = express.Router()
    // setup sockets :tada:
    // cors (!) this should remove in prod
    if (env.environment === 'dev') this.app.use(cors())
    // we love json
    this.app.use(bodyParser.json({limit: '50mb'}))
    // set api endpoint for this router
    // NOTE: this because the rest
    // is static and handled by vue.js
    this.app.use('/api', this.router)
    // init the static server
    this.staticServer = new Static(this.app)

    // init db conenction
    this.db = new Db()
    this.db.connect('careship-id-dev')
    // conenction test
    this.db.on('connected', (err, db, connection) => {
      if (!err) {
        console.log(`Succesfully connected to db ${db}`)
      }
    })
    // ship it
    this.init()
  }

  init () {
    // first entry point pass static
    // add api routes, pass socket
    Api.addRoutes(this.router, this.socket)
    // all the rest <- redirect home
    // let swallowAll = (req, res) => {
    //   res.redirect('/')
    // }
    // this.app.use(swallowAll)
    // listening
    this.server.listen(env.port, () => {
      logger.log('debug', `App booted and serving on http://${env.host}:${env.port}`)
    })

  }

}

// WOOT!!
module.exports = new App()
