const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: ['babel-polyfill', path.resolve(__dirname, 'src/app.js')],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'app.bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.json$/,
				include: [path.resolve(__dirname, 'data')],
				loader: 'json'
			},
			{
				test: /\.jsx?$/,
				include: [path.resolve(__dirname, 'src')],
				loader: 'babel',
				query: {
					presets: [
						'latest',
						'react'
					],
					plugins: [
						['transform-async-to-module-method', {
							module: 'bluebird',
							method: 'coroutine'
						}],
						'transform-class-properties',
						'transform-object-rest-spread'
					]
				}
			},
			{
				test: /\.scss$/,
				include: [path.resolve(__dirname, 'src')],
				loader: ExtractTextPlugin.extract('css!resolve-url!sass?sourceMap')
			},
			{
				test: /.*\.(gif|png|jpe?g|svg)$/i,
				include: [path.resolve(__dirname, 'src')],
				loader: 'file?name=[path][name].[ext]&context=./src'
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.json', '.jsx']
	},
	devtool: 'source-map',
	plugins: [
		new CleanWebpackPlugin(['build']),
		new ExtractTextPlugin('styles.css')
	],
	sassLoader: {
		includePaths: [path.resolve(__dirname, './src')]
	}
};
