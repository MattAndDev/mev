// Core imports
const fs = require('fs')
const util = require('util')
const path = require('path')
const webpack = require('webpack')
const env = require('.env')
// NOTE: HEAVY WIP
// Dev task for frontend build

const build = async () => {

  // pass in webpac dev environment to get config
  const config = require(`../prod.webpack.config.js`)
  // init compiler
  webpack(config, function (err, stats) {
    if (err) {
      console.log(err);
    }
    console.log(stats);
  })

}
module.exports = build
