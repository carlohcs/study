# Grunt Vs Gulp (Webpack)

## Tente algo novo: Webpack

[https://www.youtube.com/watch?v=9kJVYpOqcVU](https://www.youtube.com/watch?v=9kJVYpOqcVU)

Site: [https://webpack.github.io/](https://webpack.github.io/)

[O que é o Webpack](https://webpack.github.io/docs/what-is-webpack.html)

Arquivo de configuração básica: [https://gist.github.com/learncodeacademy/25092d8f1daf5e4a6fd3](https://gist.github.com/learncodeacademy/25092d8f1daf5e4a6fd3)

```
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/scripts.js",
  output: {
    path: __dirname + "/js",
    filename: "scripts.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
```
