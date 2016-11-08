const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');

const PATHS = {
	indexJS: path.join(__dirname, 'app/index.jsx'),
	indexHTML: path.join(__dirname, 'app/index.html'),
	build: path.join(__dirname, 'build'),
};

module.exports = {
	devTool: 'eval-source-map',
	devServer: {
		hot: true,
		inline: true,
		host: 'localhost',
		port: 3000,
		historyApiFallback: true,
		stats: 'errors-only',
	},
	entry: {
		vendor: Object.keys(pkg.dependencies),
		app: PATHS.indexJS,
	},
	output: {
		path: PATHS.build,
		filename: '[name].bundle.js',
	},
	module: {
		loaders : [
			{
				loader : 'babel',
				test : /\.jsx?$/,
				exclude : /node_modules/,
			},
			{
				loader : 'style-loader!css-loader!stylus-loader',
				test : /\.styl$/,
			},
			{
				loader : 'url-loader?limit=100000',
				test : /\.(png|woff|woff2|eot|ttf|svg)$/,
			},
			{
				loader: 'file-loader?name=images/[name].[ext]',
				test: /\.(png|jpg)$/,
			},
		],
	},
	resolve : {
		extensions : ['', '.js', '.jsx']
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin({ multiStep: true }),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
		new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js", Infinity),
		new HtmlWebpackPlugin({
			inject: true,
			template: PATHS.indexHTML,
		})
	],
};
