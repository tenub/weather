const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: ['babel-polyfill', path.resolve(__dirname, 'src/index.js')],
	output: {
		path: path.resolve(__dirname),
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
						[
							'transform-async-to-module-method',
							{
								module: 'bluebird',
								method: 'coroutine'
							}
						],
						'transform-class-properties',
						'transform-object-rest-spread'
					]
				}
			}
		]
	},
	resolve: {
		extensions: ['', '.json', '.js', '.jsx']
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		})
	]
};
