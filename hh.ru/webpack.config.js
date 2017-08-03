var webpack = require('webpack');
var ExtractTextPlugin = require ('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    entry: {
        main: ['webpack-hot-middleware/client', './src/index.js'],
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
        extensions: [ '.js' ],
    },
    module: {
        rules: [
            {
                test: /(\.js$)/,
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
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
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
        new ExtractTextPlugin({
            filename: 'style/style.min.css',
            allChunks: true,
            disable: false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, 'dist', 'index.html')
        })
    ]
}