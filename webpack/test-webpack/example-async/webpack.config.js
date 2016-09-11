var webpack = require('webpack');
var path = require("path");

module.exports = {
  entry: './entry.js',
  output: {
    path: path.join(__dirname, "dist"), 
    filename: 'bundle.js',
	publicPath:"dist/", //给require.ensure用
    chunkFilename: "[name].chunk.js"//给require.ensure用
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'}
    ]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by lufeng')
  ],
  devtool: "source-map"
}