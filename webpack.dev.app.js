const { resolve } = require('path');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');

const config = require('./webpack.config');

Object.assign(config, {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './app.js',
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
  },
  devServer: {
    historyApiFallback: { index: 'index.html' },
    static: {
      directory: resolve(__dirname, 'build'),
    },
  },
  plugins: [
    new ESLintPlugin(),
    new webpack.LoaderOptionsPlugin({
      test: /\.jsx?$/,
      options: {
        eslint: {
          configFile: resolve(__dirname, '.eslintrc'),
          cache: false,
        },
      },
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
});

module.exports = config;
