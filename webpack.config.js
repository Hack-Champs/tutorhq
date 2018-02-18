var path = require('path');
var webpack = require('webpack');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env'],
        },
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]',
          outputPath: 'images/',
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        query: {
          limit: '10000',
          name: '[name].[ext]',
          outputPath: 'fonts/',
        },
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
};
