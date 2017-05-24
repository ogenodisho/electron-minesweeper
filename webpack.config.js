var path = require('path');
var webpack = require('webpack');

var INDEX_DIR = path.resolve(__dirname);

module.exports = {
  entry: INDEX_DIR + '/app.js',
  output: { path: INDEX_DIR, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: INDEX_DIR,
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
