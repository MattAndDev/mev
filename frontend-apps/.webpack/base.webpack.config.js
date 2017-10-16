// ============================================
// Base webpack config
// ============================================
// This is the base webpack config out of which all toher extend
// Your frotnend apps shoudl match the given setup to being built succesfully

// core
const path = require('path')

module.exports = {
  context: process.env.APP_SRC_DIR,
  entry: {
    app: path.resolve(process.env.APP_SRC_DIR, 'index.js')
  },
  output: {
    filename: '[name].js',
    path: process.env.APP_DIST_DIR,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        // pure js loader
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        ]
      },
      // svg sprite loader
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,

        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[path][name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      },
    ]
  },
  resolve: {
    alias: {
      '@': process.env.APP_SRC_DIR,
      vue: 'vue/dist/vue.js'
    }
  }
}
