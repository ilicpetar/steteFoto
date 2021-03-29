const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('@gef-ui/gef-scripts/webpack');
const { prodConfig } = require('@gef-ui/gef-scripts/webpack');
const { useBabel: gefUseBabel } = require('@gef-ui/gef-scripts/webpack/common.parts');

const appName = require('../apps/app/src/constants/appName');

const PATHS = {
	rootNodeModules: path.join(process.cwd(), 'node_modules'),
	apps: path.join(process.cwd(), 'apps'),
	commons: path.join(process.cwd(), 'common'),
	app: path.join(process.cwd(), `apps/${appName}/src`),
};

module.exports = merge(
	prodConfig,
	{
		entry: {
			app: PATHS.app,
		},
		output: {
			path: path.resolve(process.cwd(), `apps/${appName}/build/stat/static`),
			publicPath: '/static/',
			filename: '[name].js',
		},
		plugins: [
			new webpack.DefinePlugin({
				__DEV__: false,
			}),
			new HtmlWebpackPlugin({
				title: appName,
				inject: true,
				filename: '../index.html',
				template: path.resolve(__dirname, '../node_modules/@gef-ui/gef-scripts/webpack/devTemplate.ejs'),
				appMountId: 'root',
			}),
		],
	},
	gefUseBabel([PATHS.app, PATHS.rootNodeModules, PATHS.apps, PATHS.commons], {
		cacheDirectory: true,
		presets: ['@gef-ui/babel-preset-gef'],
	})
);
