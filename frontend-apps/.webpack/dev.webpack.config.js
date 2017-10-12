var path = require('path')
var env = require('../../.env')
var webpack = require('webpack')
const jsDir = path.resolve(process.env.frontend_app_root_dir, 'js/')
const RootDir  = process.env.frontend_app_root_dir
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin({
  filename: '../css/main.css',
  disable: process.env.NODE_ENV === 'development'
})
module.exports = {
  context: RootDir,
  // entry: [path.resolve(__dirname, 'index.js'), path.resolve(__dirname, 'sass/main.sass')],
  entry: [path.resolve(RootDir, 'index.js')],
  output: {
    path: path.resolve(RootDir, '../js'),
    filename: 'index.js'
  },
  devServer: {
    publicPath: '/js/',
    contentBase: RootDir,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    extractSass
  ],
  module: {
    rules: [{
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
    },
    {
      test: /\.sass$/,
      use: extractSass.extract({
        use: [
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(RootDir, '../../node_modules/normalize.css')]
            }
          },
        ],
        fallback: 'style-loader'
      })
    }
    ]
  },
  resolve: {
    alias: {
      '@': RootDir,
      vue: 'vue/dist/vue.js',
      components: path.resolve(jsDir, 'components'),
      views: path.resolve(jsDir, 'views'),
      store: path.resolve(jsDir, 'store'),
      settings: path.resolve(jsDir, 'utils/settings')
    }
  }
}
