const path = require('path');
const webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /(\.scss|\.css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: 'src/index.html', to: './'}
    ])
  ],
  devServer: {
    contentBase: path.join(__dirname, "build"),
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js"
  },
  devtool: 'source-map'
};
