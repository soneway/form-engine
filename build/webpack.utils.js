const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const nodeExternals = require('webpack-node-externals');
const externals = require('./externals');
const utils = require('./entry/utils');

console.log('============ utils entry ============\n', utils);

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  entry: utils,
  output: {
    path: path.resolve(__dirname, '../dist/utils'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2',
  },
  externals: [
    externals,
    nodeExternals(),
  ],
});
