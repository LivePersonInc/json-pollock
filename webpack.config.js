const path = require('path');
const webpack = require('webpack');
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['flow', 'es2015', 'stage-0'],
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
          }, {
            loader: 'sass-loader',
          }],
          // use style-loader in development
          fallback: 'style-loader',
        }),
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new FlowStatusWebpackPlugin({
      failOnError: true,
    }),
    new ExtractTextPlugin('json-pollock.css'),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
    }),
  ],
  entry: {
    'json-pollock': './index.js',
    'json-pollock.min': './index.js',
  },
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    library: 'JsonPollock',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'dist'),
  },
};
