const {resolve} = require('path');
const webpack = require('webpack');

module.exports = (option = {}) =>({
  entry: resolve(__dirname, './src/index.js'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'MyLibrary',
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  }
})