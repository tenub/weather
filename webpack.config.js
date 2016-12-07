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
				include: [path.resolve(__dirname, 'src')],
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
				loader: ExtractTextPlugin.extract('style?sourceMap', 'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!sass?sourceMap')
			},
			{
				test: /.*\.(gif|png|jpe?g|svg)$/i,
				include: [path.resolve(__dirname, 'src')],
				loader: 'file?name=[path][name].[ext]&context=./src'
			}
		]
	},
	resolve: {
		extensions: ['', '.json', '.js', '.jsx', '.scss']
	},
	devtool: 'source-map',
	plugins: [
		new CleanWebpackPlugin(['build']),
		new ExtractTextPlugin('app.css', { allChunks: true })
	],
	sassLoader: {
		includePaths: [path.resolve(__dirname, './src')]
	}
};
