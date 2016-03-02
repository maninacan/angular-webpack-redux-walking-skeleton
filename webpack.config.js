var Webpack = require('webpack');
var path = require('path');

// Plugins
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

// Paths
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'src', 'app.js');
var vendorPath = path.resolve(__dirname, 'src', 'vendor.js');
var testFiles = path.resolve(__dirname, 'src', 'components', '**', '*_test.js');
var projectPath = __dirname;

var config = {
	// Makes sure errors in console map to the correct file
	// and line number
	devtool: 'source-map',
	entry: {
		// vendor: vendorPath,
		bundle: [
			// For hot style updates
			'webpack/hot/dev-server',

			// The script refreshing the browser on none hot updates
			'webpack-dev-server/client?http://localhost:8080',

			// Our application
			mainPath
		]
	},
	output: {

		// We need to give Webpack a path. It does not actually need it,
		// because files are kept in memory in webpack-dev-server, but an
		// error will occur if nothing is specified. We use the buildPath
		// as that points to where the files will eventually be bundled
		// in production
		path: buildPath,
		filename: '[name].js',

		// Everything related to Webpack should go through a build path,
		// localhost:3000/build. That makes proxying easier to handle
		publicPath: '/build/'
	},
	module: {
		loaders: [
			{ test: /\.woff$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
			{ test: /\.woff2$/, loader: "url-loader?limit=10000&minetype=application/font-woff2" },
      { test: /\.ttf$/, loader: "file-loader" },
      { test: /\.eot$/, loader: "file-loader" },
      { test: /\.svg$/, loader: "file-loader" },

			// I highly recommend using the babel-loader as it gives you
			// ES6/7 syntax and JSX transpiling out of the box
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: [nodeModulesPath, testFiles]
			},

			// Let us also add the style-loader and css-loader, which you can
			// expand with less-loader etc.
			{
				test: /\.scss$/,
				loaders: ['style', 'css', 'sass'],
				include: __dirname + '/src',
			},

			{
				test: /\.html$/,
				loader: 'raw'
			}
		]
	},
	sassLoader: {
		includePaths: [
			path.resolve(__dirname, "./src/styles"),
			'./node_modules/bootstrap/dist/css/bootstrap.min.css'
		]
	},
	// We have to manually add the Hot Replacement plugin when running
	// from Node
	plugins: [
		new Webpack.HotModuleReplacementPlugin(),
		// Directories to be copied.  Only the bare necessities should be copied into the build.
		// uncomment to copy stuff when webpack builds
		// new CopyWebpackPlugin([{
		// 	from: './src/assets',
		// 	to: '../assets'
		// }]),
		new CleanWebpackPlugin(['public/build'], {
      root: projectPath,
      verbose: true,
      dry: false
    })
	]
};

module.exports = config;
