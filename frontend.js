// Core imports

const fs = require('fs')
const util = require('util')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const env = require('./.env')
const stat = util.promisify(fs.stat)

// NOTE: HEAVY WIP
// Dev task for frontend build

const build = async () => {

  // get process args
  // NOTE: argv[3] is passed into the npm-run frontend-dev this_value
  const webpackApp = process.argv[3] // shoudl match an app folder in './frontend-apps/'
  const webpackEnv = process.argv[2] // ['dev', 'build']
  const availableWebpackEnvs = ['dev', 'build']

  // first create path to cehck if app entry file exists
  let entryFile = `./${env.frontendFolder}/${process.argv[3]}/index.js`

  // first check if ffrontend app is passed as argument
  try {
    let entry = await stat(entryFile)
  }
  catch (err) {
    console.error(`Can't find frontend app index.js at ${entryFile}/`)
    console.error('Did you forget to pass the frontend applciation folder?')
    console.error(err)
    process.exit(0)
  }

  // Check if the webpack environment is supported
  if (availableWebpackEnvs.indexOf(webpackEnv) === -1) {
    console.error(`Environment ${webpackEnv} is not supported by the builder`)
    process.exit(0)
  }

  // Ok validation is fine we can pass on data
  process.env['frontend_app_name'] = webpackApp
  process.env['frontend_app_root_dir'] = path.resolve(`./${env.frontendFolder}/${webpackApp}/`)


  // pass in webpac dev environment to get config
  // TODO: Add checks
  const config = require(`./frontend-apps/.webpack/${webpackEnv}.webpack.config.js`)

  // init express
  const app = express()
  // add hot-reload related code to entry chunks
  Object.keys(config.entry).forEach(function (name) {
    config.entry[name] = ['../.webpack/hot-client-config'].concat(config.entry[name])
    console.log(config.entry);
  })
  // init compiler
  const compiler = webpack(config)

  // dev middleware for webpack
  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    quiet: false
  })
  // hot middleware for webpack
  const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    heartbeat: 2000
  })

  // pass to express
  app.use(hotMiddleware)
  app.use(devMiddleware)


  app.use(express.static(process.env['frontend_app_root_dir']))
  var portfinder = require('portfinder')
  portfinder.basePort = 3000

  console.log('> Starting dev server...')
  var readyPromise = new Promise((resolve, reject) => {
    _resolve = resolve
    _reject = reject
  })

  devMiddleware.waitUntilValid(() => {
    portfinder.getPort((err, port) => {
      if (err) {
        _reject(err)
      }
      console.log(port);
      process.env.PORT = port
      var uri = 'http://localhost:' + port
      console.log('> Listening at ' + uri + '\n')
      // when env is testing, don't need open it
      // if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      //   opn(uri)
      // }
      server = app.listen(port)
      _resolve()
    })
  })
}
module.exports = build()
