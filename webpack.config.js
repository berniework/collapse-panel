const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        app: './demo/index',
        vendor: ['react', 'react-dom', 'lodash']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[chunkHash:8].js',
        publicPath: '',
        chunkFilename: '[name].[chunkHash:8].js',
        library: 'CollapsePanel'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss', '.css']
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: [
                        'react',
                        ['es2015', { modules: false }],
                        'es2016',
                        'stage-0'
                    ]
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader!sass-loader!postcss-loader'
                })
            },
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
            }
        }),
        new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, './demo/index.html'),
            inject: 'body'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'common'],
        })
    ],
};
