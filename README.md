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

#### HTML-Webpack-Plugin

  [The official guide link](https://github.com/jantimon/html-webpack-plugin)

  * Run `npm install html-webpack-plugin --save-dev` 
  

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

#### Webpack Dev Server

  * `npm install webpack-dev-server`

  * Change `"dev"` in npm scripts of package.json to `webpack-dev-server`

  * Server is now up!! default is 8080

  * It is on the watch mode, and it does not require us to refresh the page after changing JavaScript

##### Advance Webpack Server Configuration

[The official config link](https://webpack.github.io/docs/webpack-dev-server.html)

The difference between `webpack -d` and `webpack-dev-server` is that webpack development mode is renders and write files in the disk, the server is written in the <strong>Memory.</strong> 

To Create the configuration file, modify `webpack.config.js` by adding the `devServer: {}`

  * Some basic configuration in `webpack.config.js`
  ```jsx
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    stats: "errors-only",
    open: true,
    port: 8080
  },
  ```
#### Install React in Webpack

There are 2 ways to installing React. 

1. Create-React-App

2. Manually installing starting from Webpack server

For adding React to existing app: [Guide](https://facebook.github.io/react/docs/installation.html)

* `npm install -D react react-dom`

* Enable ES6 and JSX by installing `Babel`

  * Babel compiles ES6 to javascript, so you don't need to worry about browser compatiabilities.

  * `npm install -D babel babel-preset-react babel-preset-es2015`

  * Enable above presets in `.babelrc`
    ```jsx
    {
      "presets": ["es2015", "react"]
    }
    ```
* Add the ReactDOM in index.html

* Add the Loader to 

  * Define the `rule` in `webpack.config.js`

  * Need the Webpack to test for javascript files to load the `babel-loader`. More informatino on official Babel guide

  * `npm install --save-dev babel-loader babel-core`
  