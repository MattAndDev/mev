const fs = require('fs')
const util = require('util')
const env = require('./.env')
const stat = util.promisify(fs.stat)

// NOTE: HEAVY WIP
// Dev task for frontend build

const webpack = async () => {

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
  process.env.frontend_app = webpackApp

}
module.exports = webpack()
