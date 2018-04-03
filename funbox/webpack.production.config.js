var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var publicPath =  `/${packageSettings.name}/client/`;

module.exports = {
	entry: {
		main: './src/index',
		react: ['react']
	},
	output: {
		path: project.build.localClientPath,
		publicPath: publicPath,
		filename: '[chunkhash].bundle.js',
		library: '[name]'
	},
	resolve: {
		modules: [ path.join(__dirname, 'src'), 'node_modules' ],
		extensions: [ '.js', '.jsx' ],
	},
	module: {
		rules: [
			{
				test: /(\.js$)|(\.jsx$)/,
				loader: 'eslint-loader',
				enforce: 'pre',
				include: [
					path.resolve(__dirname, 'src'),
				],
				options: {
					fix: true
				}
			},
			{
				test: /\.woff(2)?(\?)?(\d+)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader',
				options: {
					publicPath: publicPath,
					name: 'fonts/[hash].[name].[ext]',
					limit: 10000,
					mimetype: 'application/font-woff'
				}
			},
			{
				test: /\.(ttf|eot|svg)(\?)?(\d+)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader',
				options: {
					publicPath: publicPath,
					name: 'fonts/[hash].[name].[ext]',
					limit: 10000
				}
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [ 'css-loader', 'postcss-loader', 'sass-loader' ]
				})
			},
			{
				test: /\.styl$/,
				loader:  ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [ 'css-loader', 'postcss-loader', 'stylus-loader' ]
				})
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader',
				options: {
					publicPath: publicPath,
					name: 'images/[hash].[name].[ext]'
				}
			},
			{
				test: /\.jsx$/,
				use: [
					'react-hot-loader',
					'babel-loader'
				],
				include: path.join(__dirname, 'src')
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: path.join(__dirname, 'src'),
			}
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': '"production"'
			}
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'react',
			filename: `[hash].react.js`
		}),
		new ExtractTextPlugin({
			filename: 'style/[chunkhash].style.min.css',
			allChunks: true,
			disable: false
		}),
		//new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
		new webpack.optimize.UglifyJsPlugin({ mangle: false }),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'dist', 'index.html'),
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true
		})
	]
}
