'use strict'
// core
const baseConfig = require('./base.webpack.config')
const webpack = require('webpack')
// libs
const merge = require('webpack-merge')
// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Get constant paths passed in by builder script
const rootSrcDir  = process.env.frontend_app_root_dir

// add hot-reload related code to entry chunks
Object.keys(baseConfig.entry).forEach(function (name) {
  // TODO: make path absolute
  baseConfig.entry[name] = ['../.webpack/hot-client-config'].concat(baseConfig.entry[name])
})


module.exports = merge(baseConfig, {
  devtool: '#cheap-module-eval-source-map',
  plugins: [
   new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${rootSrcDir}/index.html`,
      inject: true
    })
  ]
})
