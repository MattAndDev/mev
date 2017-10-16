// core
const path = require('path')
const env = require('../../.env')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// paths
// const JsDir = path.resolve(process.env.frontend_app_root_dir, 'js/')
const RootDir  = process.env.frontend_app_root_dir
const DistDir = path.resolve('./public/${webpackApp}')



module.exports = {
  context: RootDir,
  entry: {
    app: path.resolve(RootDir, 'index.js')
  },
  output: {
    filename: '[name].js',
    path: DistDir,
    publicPath: '/'
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
   new webpack.HotModuleReplacementPlugin(),
   new webpack.NoEmitOnErrorsPlugin(),
   new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${RootDir}/index.html`,
      inject: true
    })
  ],
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
      '@': RootDir,
      vue: 'vue/dist/vue.js',
      // components: path.resolve(JsDir, 'components'),
      // views: path.resolve(JsDir, 'views'),
      // store: path.resolve(JsDir, 'store'),
      // settings: path.resolve(JsDir, 'utils/settings')
    }
  }
}
