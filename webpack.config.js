const path = require('path');
const webpack = require('webpack');
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  module: {
    rules: [
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
    new ExtractTextPlugin('style.css'),
  ],
  entry: {
    app: './index.js',
  },
  output: {
    filename: 'bundle.js',
    library: 'JsonPollock',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'dist'),
  },
};
