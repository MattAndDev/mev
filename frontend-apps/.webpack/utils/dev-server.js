// Core imports
const fs = require('fs')
const util = require('util')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const env = require('.env')
const stat = util.promisify(fs.stat)
// NOTE: HEAVY WIP
// Dev task for frontend build

const frontendDevServer = async () => {

  // pass in webpac dev environment to get config
  const config = require(`../dev.webpack.config.js`)

  // init express
  const app = express()

  // init compiler
  const compiler = webpack(config)

  // dev middleware for webpack
  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    quiet: false,
    stats: {
      colors: true
    }
  })
  // hot middleware for webpack
  const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    heartbeat: 2000
  })

  // pass to express
  app.use(hotMiddleware)
  app.use(devMiddleware)

  // serve static the src d
  // app.use(express.static(process.env.APP_SRC_DIR))
  var portfinder = require('portfinder')
  portfinder.basePort = 3000

  console.log('> Starting frontend dev server...')

  devMiddleware.waitUntilValid(() => {
    portfinder.getPort((err, port) => {
      if (err) throw err
      process.env.PORT = port
      var uri = 'http://localhost:' + port
      console.log(`> Dev server up and running at ${uri}\n`)
      server = app.listen(port)
    })
  })
}
module.exports = frontendDevServer
