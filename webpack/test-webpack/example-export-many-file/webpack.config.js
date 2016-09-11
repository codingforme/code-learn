var webpack = require('webpack');
var path = require("path");

module.exports = {
  entry: {
	"entry" : './entry.js',
	"common" : './common.js'
  },
  output: {
	path: path.join(__dirname, "dist"), 
	publicPath:"dist/", //给require.ensure用
    filename: "[name].js"
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'}
    ]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by lufeng')
  ]
}