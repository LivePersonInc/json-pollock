const path = require('path');
const webpack = require('webpack');
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');

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
            presets: ['flow', 'es2015', 'stage-2'],
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [{
          loader: 'style-loader',  // creates style nodes from JS strings
        }, {
          loader: 'css-loader',  // translates CSS into CommonJS
        }, {
          loader: 'sass-loader', // compiles Sass to CSS
        }],
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new FlowStatusWebpackPlugin({
      failOnError: true,
    }),
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
