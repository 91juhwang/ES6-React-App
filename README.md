# React & Webpack Tutorial

[Link](https://www.youtube.com/watch?v=cKTDYSK0ArI)

## Usage
  * `npm start`

Add the `scripts` inside the package.json for below commands.

  * `npm run dev` for development environment. 

  * `npm run prod` for production environment (uses Webpack2 to uglify)

## Development Notes
  * [JavaScript(ES6)](https://github.com/91juhwang/TIL/tree/master/JavaScript/ES6)
  * [React](https://github.com/91juhwang/TIL/tree/master/JavaScript/React)

#### Webpack2

##### HTML-Webpack-Plugin

  * Run `npm install html-webpack-plugin --save-dev` [The official guide link](https://github.com/jantimon/html-webpack-plugin)

  * Configure the `webpack.config.js` to include the plugins, output path and filename. The `path` must have an absolute path as shown in below.
  ```javascript
  const path = require('path')
  var HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/app.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.bundle.js'
    },
    plugins: [new HtmlWebpackPlugin()]
  }
  ```
  * Then run `npm run dev`, and dynamically generate html file with the `app.bundle.js` script. 

  * To use the custom template, add the plugin as shown in the official guide.
  ```jsx
  const path = require('path')
  var HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/app.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.bundle.js'
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'My Project!', // Project Title
        minify: {
          collapseWhitespace: true // minifies the html template
        },
        template: './src/index.ejs', // Load a custom template (ejs by default see the FAQ for details)
      })
    ]
  }
  ```
  * `<%= htmlWebpackPlugin.options.title %>` in index.ejs will use the `webpack.config.js`'s project title.

##### CSS Loader

  * Run `npm install css-loader --save-dev`

  * Add the module into the webpack configuration.
  ```jsx
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
        { test: /\.css$/, loaders: 'css-loader' } // CSS Loader rule
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
  ```

  * Then link the css into the app.js.
  ```jsx
  const css = require('./app.js')

  <!-- app.js contents here -->
  ```

  * This won't load the css into the newly created index.html, because it is included in the javascript `app.bundle.js`. Therefore, we need to load the style by adding the `style-loader`.

  * `npm install style-loader --save-dev` then, 
 
  * Add the configuration to webpack.config.js 
  ```jsx
  { test: /\.css$/, use: ['style-loader' ,'css-loader'] } // added style-loader! infront of previous css-loader
  
  // Version 1 uses loaders: 'style-loader!css-loader`, but 2 uses the above syntax
  ```

  * You can use `ExtractTextPlugin()` to extract all styleshets and put into 1 single file.

