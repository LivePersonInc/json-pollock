const path = require('path');
const webpack = require('webpack');
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
});

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['flow']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                            loader: "css-loader"
                        }, {
                            loader: "sass-loader"
                        }],
                        // use style-loader in development
                        fallback: "style-loader"
                    })
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new FlowStatusWebpackPlugin({
            failOnError: true
        }),
        new ExtractTextPlugin('style.css'),
    ],
    entry: {
        app: './'
    },
    output: {
        filename: 'bundle.js',
        publicPath: '/dist/',
        path: path.resolve(__dirname, 'dist')
    }
};