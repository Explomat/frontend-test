var webpack = require('webpack');
var ExtractTextPlugin = require ('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: {
        main: ['webpack-hot-middleware/client', './src/index.jsx'],
        react: ['react']
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
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
                    name: 'fonts/[name].[ext]',
                    limit: 10000,
                    mimetype: 'application/font-woff'
                }
            },
            {
                test: /\.(ttf|eot|svg)(\?)?(\d+)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    name: 'fonts/[name].[ext]',
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
                    name: 'images/[name].[ext]'
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
                'NODE_ENV': '"development"'
            }
	    }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'react',
            filename: 'react.js'
        }),
        new ExtractTextPlugin({
            filename: 'style/style.min.css',
            allChunks: true,
            disable: false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'map',
            inject: true,
            template: path.join(__dirname, 'dist', 'index.html'),
            filename: path.join(__dirname, 'dist', 'index.html')
        })
    ]
}
