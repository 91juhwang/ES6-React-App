const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app.js',
    contact: './src/contact.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { 
        test: /\.css$/,
        use: ['style-loader' ,'css-loader'] 
      }, // CSS Loader Rule
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      } // JS Loader rule
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // saving path
    compress: true,   // Set this if you want to enable gzip compression for assets
    stats: "errors-only", // Shows errors
    open: true,
    port: 8080
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My Project!!',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      excludeChunks: ['contact'],
      template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new HtmlWebpackPlugin({
      title: 'Contact Page',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      filename: 'contact.html',
      chunks: ['<contact></contact>'],
      template: './src/contact.html', // Load a custom template (ejs by default see the FAQ for details)
    })
  ]
}