'use strict'
// relative paths
require('app-module-path').addPath(__dirname)
// Core imports
const fs = require('fs')
const util = require('util')
const path = require('path')
const stat = util.promisify(fs.stat)
// env
const env = require('./.env')

// core builders
const devFrontendServer = require('./frontend-apps/.webpack/utils/dev-server')


// Frontend builder 👷
const frontend = async () => {

  // Use command line argument to define what env we are on
  // this is crucial for webpack to know how to handle assets

  // Available envs
  const supportedEnvs = ['development', 'production']

  // Passed envs
  // TODO: maybe use commander
  const currentEnv = process.argv[2] // ['development', 'production']
  if (supportedEnvs.indexOf(currentEnv) === -1) {
    console.error(`Environment ${currentEnv} is not supported by the builder`)
    process.exit(0)
  }
  // globalize the environment
  process.env.NODE_ENV = env


  // get process args
  // NOTE: argv[3] is passed into the npm-run frontend-dev this_value
  // TODO: maybe use commander
  const webpackApp = process.argv[3] // shoudl match an app folder in './frontend-apps/'
  // first create path to cehck if app entry file exists
  let entryFile = `./${env.frontendFolder}/${webpackApp}/index.js`

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

  // Ok validation is fine we can pass on data
  process.env['APP_NAME'] = webpackApp
  process.env['APP_SRC_DIR'] = path.resolve(`./${env.frontendFolder}/${webpackApp}/`)
  console.log(process.env.APP_SRC_DIR)
  devFrontendServer()
}
module.exports = frontend()
