const path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    app: './src/index.js',
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
      }, // JS Loader rule
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: "file-loader?name=[name].[ext]&outputPath=images/"
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // saving path
    compress: true,   // Set this if you want to enable gzip compression for assets
    stats: "errors-only", // Shows errors
    open: true,
    hot: isProduction,
    port: 8080
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Projects!!',
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
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}