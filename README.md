# React & Webpack Tutorial (Dev Notes)
This repository follows various tutorials including the Facebook's official Tutorial (Tic-Tac-Toe).

Instead of using create-react-app, I chose to build it from the ground using Webpack2 and ES6.

## Accessbile Pages (Usage)

Clone and run `npm run prod`.

URLs include:

* `/`                 -> root page including the Facebook's tic-tac-toe game
* `/todo.html`     -> To-Do application

<strong>Tic-Tac-Toe React Tutorial</strong>: (`/`)

![alt text](https://drive.google.com/uc?id=0Byxeja4jYwq4Smx2akVsSXJRZXM)

<strong>To Do Lists React Tutorial</strong>: (`/todo.html`)

## Design Process

We must understand and decide how the layouts will look like. It is good to break down each components by each functionalities and each block in the layouts. The examlple app below would have 4 components: header, Input field, List of tasks, and managing lists components.

Always break down into smaller pieces depending on the layout!!

![alt text](https://drive.google.com/uc?id=0Byxeja4jYwq4ejYtTVFvZ2NyYkU)

## Webpack HTML-Webpack-Plugin

[The official Plugin Guide](https://github.com/jantimon/html-webpack-plugin)

Run `npm install html-webpack-plugin --save-dev`

Configure the `webpack.config.js` to include the plugins, output path and filename. The `path` must have an absolute path as shown in below.
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
Then run `npm run dev`, and dynamically generate html file with the `app.bundle.js` script.

To use the custom template, add the plugin as shown in the official guide.
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
`<%= htmlWebpackPlugin.options.title %>` in index.ejs will use the `webpack.config.js`'s project title.

## CSS Loader:

Run `npm install css-loader --save-dev`

Add the module into the webpack configuration.
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

Then link the css into the app.js.
  ```jsx
  const css = require('./app.js')

  <!-- app.js contents here -->
  ```
This won't load the css into the newly created index.html, because it is included in the javascript `app.bundle.js`.

Therefore, we need to load the style by adding the `style-loader`.

`npm install style-loader --save-dev`

Then add the configuration to webpack.config.js
  ```jsx
  { test: /\.css$/, use: ['style-loader' ,'css-loader'] } // added style-loader! infront of previous css-loader

  // Version 1 uses loaders: 'style-loader!css-loader`, but 2 uses the above syntax
  ```

You can use `ExtractTextPlugin()` to extract all styleshets and put into 1 single file.


## Advance Webpack Server Configuration:

[The official config link](https://webpack.github.io/docs/webpack-dev-server.html)

The difference between `webpack -d` and `webpack-dev-server` is that webpack development mode is renders and write files in the disk, the server is written in the <strong>Memory.</strong>

If you run `webpack-dev-server` IT DOES NOT produce the bundle.js file in the disk, whicih means no physical copy of the file. If you want to generate the file, build through `webpack`.

### Webpack Dev Server:

  1. `npm install webpack-dev-server`

  2. Change `"dev"` in npm scripts of package.json to `webpack-dev-server`

  3. Server is now up!! default is 8080

To Create the configuration file, modify `webpack.config.js` by adding the `devServer: {}`

  * Some basic configuration in `webpack.config.js`:
    ```jsx
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      stats: "errors-only",
      open: true,
      port: 8080
    },
    ```
## Install React in Webpack:

There are 2 ways to installing React.

1. Create-React-App

2. Manually installing starting from Webpack server (one I'm using)

For adding React to existing app: [Guide](https://facebook.github.io/react/docs/installation.html)

1. `npm install -D react react-dom`

2. Enable ES6 and JSX by installing `Babel`

    * Babel compiles ES6 to javascript, so you don't need to worry about browser compatiabilities.

    * `npm install -D babel babel-preset-react babel-preset-es2015`

    * Enable above presets in `.babelrc`
      ```jsx
      {
        "presets": ["es2015", "react"]
      }
      ```
3. Add the ReactDOM in index.html

4. Add the Loader to render JavaScript

    * Need the Webpack to test for javascript files to load the `babel-loader`. More informatino on official Babel guide

    * `npm install --save-dev babel-loader babel-core`

    * Configure `webpack.config.js` by adding a new rule.
      ```jsx
      module: {
          rules: [
            {
              test: /\.css$/,
              use: ['style-loader' ,'css-loader']
            }, // CSS Loader Rule
            {
              test: /\.js$/,
              exclude: /node_modules/, // Exclude node_modules for faster load
              use: ["babel-loader"]
            } // JS Loader rule
          ]
        },
      ```
5. `npm run dev`, and you will see the created ReactDOM in app.bundle.js

## RimRaf & Multiple Templates:

Clear all before we continue building it especially when we go into the production mode.

1. Add another script to the package.json.
    ```jsx
    "scripts": {
      "dev": "webpack-dev-server",
      "prod": "npm run clean && webpack -p",
      "clean": "rimraf ./dist/*"
    },
    ```
2. `npm run clean` -> cleans out all files in the dist folder

What if you want to generate multiple templates, and not keep it in the dist folder?<br>
You can configure it inthe webpack.config.js by adding more HtmlWebpckPlugin.

```jsx
 plugins: [
    new HtmlWebpackPlugin({
      title: 'My Project!!',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
    }),
    new HtmlWebpackPlugin({
      title: 'Contact Page',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      filename: contact.html,
      template: './src/contact.html', // Load a custom template (ejs by default see the FAQ for details)
    })
```
* `localhost:port/contact.html` is now accessible.

If you want to have multiple bundles, you will need to define multiple entry points. You can group them as however you wanted.

This is usefuly when you need to use separate css, javascript bundler and have multiple templates to work on.

Once the configuration is made, create the corresponding(contact.js) file inside the src folder.
```jsx
  entry: {
    app: './src/app.js', // app.bundle.js
    contact: './src/contact.js' // app.contact.js
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js' // specify the name for the bundler
  },
```

3. Only include corresponding JavaScript Bundler for each template.

    * Add the `excludeChunks` and `chunks` option.

## Module Replacement:

This allows us to see the changed CSS without refreshing the page. Similar to Live Reload, but smarter.

Add `hot: true` to the `devServer` in `wepack.config.js`

Then, add the plugins for React hot module or CSS hot module. Guide can be found in the official Webpack website.
```jsx
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
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin()
]
```

## Production vs Development

Controlling plugins for specific envionment.

We can configure this in package.json by adding
```jsx
"scripts": {
  "prod": "npm run clean && NODE_ENV=production webpack -p"
}
```
We can use `NODE_ENV=production` inside the `webpack.config.js` file, and check if it is set to `true` or `false`.

webpack.config.js
  ```jsx
  const path = require('path')
  var webpack = require('webpack')
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var isProduction = process.env.NODE_ENV === 'production'

  // Control configuration for different modes
  var cssProduction = whatever you need
  var cssDevelopment = whatever you desire
  var cssConfig = isProduction ? cssProduction : cssDevelopment

  // configure true or false values in the webpack.config.js by using the varialble isProduction or !isProduction
  ```

## File Loader with Webpack2

How should we include images inside css or HTML? With below plugins()

* file-loader

* image-loader

```jsx
npm install --save-dev file-loader
npm install --save-dev image-loader
```
Add the `rules` for the `.png` files

You can use the `|` to separate and test for different file types.

The `"file-loader?name=[name].[ext]&outputPath=images/"` Lets us to create the outputPath of `images/` in the `dist` folder when we run in the production mode.

Installing and using the `image-loader` will optimize the image sizes, which will make the page loading faster. Below config didn't use this.

Full `webpack.config.js rules`:
```jsx
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
```
## React Fundamentals

More notes on TIL Repository. Links are listed below.

<strong>`.jsx` expression must have only one parent element.</strong>

Very Basic React Component:
```jsx
const css = require('./app.css')

import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  return (
  <div>
    <h1 className="title">Hello React </h1>
  </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
```

## React Export and Import Components

Export module vs export component.

module:
```jsx
... codes
...

export default App
```
exporting component
```jsx
export const App () => {
  return (
    <div>
      <h1>hello</h1>
    </div>
  )
}
```
## Props and PropTypes
Components can be customized through params called `props`. It's like an argument for functions, and we can defined the `props` by passing the argument inside `App` component, which `Greeeting` component takes in the argumnet and renders it.
```jsx
const Greeting = (props) => {
  const {name, age} = props
  return(
    <div id="greeting">
      <p>Welcome to React Tutorial {name}</p>
      <p>You are {age} years old!</p>
    </div>
  )
}
The above `const {name, age} = props;` statement is caleld <strong>DESTRUCTION</strong>, which destructures the props for us to easily use the passed data.

<strong>Prop Types: </strong> We can also define the data Type for the props, which validates the passed data type before passing it to the components.

const App = () => {
  return (
  <div>
    <Headline />
    <Greeting name="james" age="30" />
  </div>
  )
}
```

## Building a Tic-Tac-Toe

React components can have state by setting `this.state` in the `constructor`, which should be considered priate to the component.

JavaScript classes we need to explicitly call `super()` when defining a constructor of a subclass.

<strong>When you want to aggregate data from multiple children or to have two child components communicate with each other, move the state upwards so that it lives in the parent component. The parent can then pass the state back down to the children via props, so that the child components are always in sync with each other and with the parent.</strong>

IMMUTABILITY!!

## Immutability

<strong>Immutability is IMPORTANT!</strong>

There are generally two ways for changing data.

1. Mutate the data by directly changing the values of a variable.

2. Replace the data with a new copy of the object that also includes desired changes.

<strong>REASONS:</strong>

* Easier Undo/Redo and Time Travel
  * Avoiding data mutations lets us keep a reference to older versions of the data, and switch between them if we need to. (ex. game stage)
* Tracking Changes
* Determining When to Re-render in React#
  * The biggest benefit of immutability in React comes when you build simple pure components.
  * Performance, (`shouldComponentUpdate()`)

<strong>Usage</strong>
```jsx
// Copy the original array by using .slice()
arr = [0,1,2,3,4]
newArry = arr.slice()
newArry[2] = "a"

console.log(arr) // returns [0,1,2,3,4]
console.log(newArry) // returns [0,1,"a",3,4]
```

## Functional Components
If a component doesn't have constructors and is very simple, just use Functional Component!!

```jsx
// Instead of this
class Square extends React.Component {
  render() {
    return (
        <button className="square" onClick={() => this.props.onClick()} >
        {this.props.value}
      </button>
    );
  }
}
// Use this!!
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

## React Keys
When you render a list of items, React always stores some info about each item in the list.

React asks you to specify a key property on each element in a list, a string to differentiate each component from its siblings.

if the items correspond to objects in a database, the database ID is usually a good choice:

```jsx
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
```

key is a special property that's reserved by React (along with `ref`, a more advanced feature). When an element is created, React pulls off the key property and stores the key directly on the returned element. Even though it may look like it is part of props, it cannot be referenced with `this.props.key`.

<strong> It's strongly recommended that you assign proper keys whenever you build dynamic lists. </strong>

## Notes + References

* [JavaScript(ES6) TIL repo](https://github.com/91juhwang/TIL/tree/master/JavaScript/ES6)
* [React TIL repo](https://github.com/91juhwang/TIL/tree/master/JavaScript/React)
* [Webpack Tutorial Link](https://www.youtube.com/watch?v=cKTDYSK0ArI)