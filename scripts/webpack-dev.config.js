const path = require('path');
const webpack = require('webpack');
const { merge, devConfig } = require('@gef-ui/gef-scripts/webpack');
const { useBabel: gefUseBabel } = require('@gef-ui/gef-scripts/webpack/common.parts');

const appName = require('../apps/app/src/constants/appName');

const PATHS = {
	rootNodeModules: path.join(process.cwd(), 'node_modules'),
	apps: path.join(process.cwd(), 'apps'),
	commons: path.join(process.cwd(), 'common'),
	app: path.join(process.cwd(), `apps/${appName}/src`),
};

module.exports = merge(
	devConfig,
	{
		entry: {
			app: PATHS.app,
		},
		plugins: [
			new webpack.DefinePlugin({
				__DEV__: true,
			}),
		],
	},
	gefUseBabel([PATHS.app, PATHS.rootNodeModules, PATHS.apps, PATHS.commons], {
		cacheDirectory: true,
		presets: ['@gef-ui/babel-preset-gef'],
	})
);
