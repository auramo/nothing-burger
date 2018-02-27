const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const uuidv4 = require('uuid/v4')

const prodBuild = process.env.NODE_ENV === 'production'

const jsBundleName = 'bundle-[hash].js'
const cssBundleName = 'styles-[hash].css'

const lastCommit = process.env.SOURCE_VERSION || "N/A"
const versionString = lastCommit + '_' + new Date().toISOString()

const alwaysInUseplugins = [
  new ExtractTextPlugin({filename: cssBundleName}),
  new HtmlWebpackPlugin({template: './web-resources/index.html'}),
  new webpack.DefinePlugin(
    {
      __SYSTEM_VERSION__: `"${versionString}"`,
      __BUST__: `"${uuidv4()}"`
    }
  )
]

const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {warnings: false},
  output: {comments: false},
  sourceMap: true
})

const plugins = prodBuild ? [...alwaysInUseplugins, uglifyPlugin] : alwaysInUseplugins

const webPackConfig = {
  entry: './webapp/main.js',
  output: {
    filename: jsBundleName,
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: [require('babel-plugin-transform-object-rest-spread')]
          }
        }
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      }
    ]
  },
  plugins: plugins
}

webPackConfig.devtool = 'source-map'

module.exports = webPackConfig
