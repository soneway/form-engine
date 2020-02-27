const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const nodeExternals = require('webpack-node-externals');
const externals = require('./externals');
const components = require('./entry/components');

console.log('============ components entry ============\n', components);

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  entry: components,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2',
  },
  externals: [
    externals,
    nodeExternals(),
  ],
});
