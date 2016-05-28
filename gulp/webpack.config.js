'use strict';

import webpack from 'webpack';
import util from 'gulp-util';
import merge from 'webpack-merge';

const isProduction = (util.env.type === 'production');

let config = {
  entry: {
    animal: ['./source/assets/javascripts/animal.js'],
    dog: './source/assets/javascripts/dog.js',
    vendor: ['jquery']
  },
  output: {
    path: __dirname + '/dist/assets/javascripts/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: Infinity
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
};

// for production
if (isProduction) {
  config = merge(config, {
    plugins: [
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.UglifyJsPlugin()
    ]
  });
}

module.exports = config;
