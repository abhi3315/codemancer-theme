/**
 * External dependencies
 */
const fs = require('fs');
const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

/**
 * WordPress dependencies
 */
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

// Extend the default config.
const sharedConfig = {
	...defaultConfig,
	output: {
		path: path.resolve(process.cwd(), 'build', 'js'),
		filename: '[name].js',
		chunkFilename: '[name].js',
	},
	plugins: [
		...defaultConfig.plugins.map((plugin) => {
			if (plugin.constructor.name === 'MiniCssExtractPlugin') {
				plugin.options.filename = '../css/[name].css';
			}
			return plugin;
		}),
		new RemoveEmptyScriptsPlugin(),
	],
	optimization: {
		...defaultConfig.optimization,
		splitChunks: {
			...defaultConfig.optimization.splitChunks,
		},
		minimizer: defaultConfig.optimization.minimizer.concat([
			new CssMinimizerPlugin(),
		]),
	},
};

// Generate a webpack config which includes setup for CSS extraction.
// Look for css/scss files and extract them into a build/css directory.
const styles = {
	...sharedConfig,
	entry: () => {
		const entries = {};

		const dir = './assets/src/css';
		fs.readdirSync(dir).forEach((fileName) => {
			const fullPath = `${dir}/${fileName}`;
			if (!fs.lstatSync(fullPath).isDirectory()) {
				entries[fileName.replace(/\.[^/.]+$/, '')] = fullPath;
			}
		});

		return entries;
	},
	module: {
		...sharedConfig.module,
	},
	plugins: [
		...sharedConfig.plugins.filter(
			(plugin) =>
				plugin.constructor.name !== 'DependencyExtractionWebpackPlugin'
		),
	],
};

// webpack config for javascript files which are inside the assets/src/js directory
const scripts = {
	...defaultConfig,
	entry: () => {
		const entries = {};

		const dir = './assets/src/js';
		fs.readdirSync(dir).forEach((fileName) => {
			entries[fileName.replace(/\.[^/.]+$/, '')] = path.resolve(
				dir,
				fileName
			);
		});

		return entries;
	},
	output: {
		path: path.resolve(process.cwd(), 'build', 'js'),
		filename: '[name].js',
		chunkFilename: '[name].js',
	},
};

module.exports = [scripts, styles];
