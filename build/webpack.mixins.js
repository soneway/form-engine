const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const nodeExternals = require('webpack-node-externals');
const externals = require('./externals');
const mixins = require('./entry/mixins');

console.log('============ mixins entry ============\n', mixins);

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  entry: mixins,
  output: {
    path: path.resolve(__dirname, '../dist/mixins'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2',
  },
  externals: [
    externals,
    nodeExternals(),
  ],
});
