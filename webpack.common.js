const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'client', 'src', 'index.jsx'),
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},

			{
				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['*', '.js', '.jsx'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.join(__dirname, 'client', 'public', 'index.html'),
		}),
		// new CopyWebpackPlugin({
		//	 patterns: [
		//		 {
		//			 from: path.resolve(__dirname, 'client', 'public', 'assets'),
		//			 to: path.resolve(__dirname, 'dist'),
		//		 },
		//	 ],
		// }),
	],
};