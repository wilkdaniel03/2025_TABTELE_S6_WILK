const path = require('path');
const process = require('process');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackPluginServe } = require('webpack-plugin-serve');

PORT = process.env['PORT'] === undefined ? 8080 : parseInt(process.env['PORT']);

exports.loadHtml = () => ({
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname,'src','index.html')
		})
	]
});

exports.runDevServer = () => ({
	plugins: [
		new WebpackPluginServe({
			port: PORT,
			static: path.join(__dirname,'dist'),
			host: '0.0.0.0',
			historyFallback: true
		})
	]
});

exports.loadTsLoader = () => ({
	module: {
		rules: [
			{ test: /\.(ts|tsx)$/, exclude: /node_modules/, loader: 'ts-loader' }
		]
	}
});

exports.loadCssLoader = () => ({
	module: {
		rules: [
			{ test: /\.css$/, exclude: /node_modules/, use: ['style-loader', 'css-loader'] }
		]
	}
});

exports.loadFileLoader = () => ({
	module: {
		rules: [
			{ test: /\.(png|jpe?g|gif|svg|webp)$/, exclude: /node_modules/, loader: 'file-loader' }
		]
	}
});

exports.loadBabelLoader = () => ({
	module: {
		rules: [
			{ test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader' }
		]
	}
});
