const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader' ,'css-loader'] } // CSS Loader rule
    ]
  },
  plugins: [new HtmlWebpackPlugin({
      title: 'My Project!!',
      minify: {
        collapseWhitespace: true
      },
      template: './src/index.ejs', // Load a custom template (ejs by default see the FAQ for details)
    })
  ]
}