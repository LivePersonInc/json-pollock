const path = require('path');
const webpack = require('webpack');
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkgjson = require('./package.json');

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
        test: /index.no_validation.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'string-replace-loader',
          query: {
            search: '@@VERSION',
            replace: pkgjson.version,
          },
        },
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
            options: { minimize: true },
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
    new ExtractTextPlugin('json-pollock.min.css'),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
    }),
  ],
  entry: {    
    'json-pollock.global.no_validation.min': './index.no_validation.js',
  },
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    library: 'JsonPollock',
    libraryTarget: 'this',
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'dist'),
  },
};
