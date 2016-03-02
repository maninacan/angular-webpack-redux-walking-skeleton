//////////// NOT COMPLETE IN IT'S CURRENT STATE //////////////////////
/// Look to webpack.config.js for ideas //////////////////////////////
var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'src', 'app.js');
var vendorPath = path.resolve(__dirname, 'src', 'vendor.js');

var config = {

  // We change to normal source mapping
  devtool: 'source-map',
  entry: {
    vendor: vendorPath,
    bundle: mainPath
  },
  output: {
    path: buildPath,
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: [nodeModulesPath]
    },{
      test: /\.css$/,
      loader: 'style!css'
    }]
  }
};

module.exports = config;
