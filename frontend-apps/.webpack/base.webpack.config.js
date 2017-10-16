// ============================================
// Base webpack config
// ============================================
// This is the base webpack config out of which all toher extend
// Your frotnend apps shoudl match the given setup to being built succesfully

// core
const path = require('path')

// Get constant paths passed in by builder script
const rootSrcDir  = process.env.frontend_app_root_dir
const distDir = path.resolve('./public/${webpackApp}')

module.exports = {
  context: rootSrcDir,
  entry: {
    app: path.resolve(rootSrcDir, 'index.js')
  },
  output: {
    filename: '[name].js',
    path: distDir,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
    ]
  },
  resolve: {
    alias: {
      '@': rootSrcDir,
      vue: 'vue/dist/vue.js'
    }
  }
}
