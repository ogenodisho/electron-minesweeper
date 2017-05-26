var path = require('path');
var webpack = require('webpack');

var INDEX_DIR = path.resolve(__dirname);
var BUILD_DIR = path.resolve(__dirname) + "/build";

module.exports = {
  entry: INDEX_DIR + '/app/app.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      include: INDEX_DIR,
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react'],
      }
    }, {
      test: /\.scss$/,
      loaders: ["style-loader", "css-loader", "sass-loader"],
      include: INDEX_DIR,
      exclude: /node_modules/
    }]
  }
};
