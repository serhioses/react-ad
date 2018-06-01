const webpack = require('webpack');
const path = require('path');
const jsDir = path.resolve(__dirname, 'app/dev/js');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  context: path.resolve(__dirname, 'app'),
  entry: path.resolve(jsDir, 'app.jsx'),
  output: {
    path: path.resolve(__dirname, 'app/dist/js'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
    alias: {

    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react']
        }
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devtool: isDevelopment ? 'cheap-inline-module-source-map' : false,
  watch: isDevelopment,
  mode: process.env.NODE_ENV
};
