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
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // saving path
    compress: true,   // Set this if you want to enable gzip compression for assets
    stats: "errors-only", // Shows errors
    open: true,
    port: 8080
  },
  plugins: [new HtmlWebpackPlugin({
      title: 'My Project!!',
      minify: {
        collapseWhitespace: true
      },
      template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
    })
  ]
}