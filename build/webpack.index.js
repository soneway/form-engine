const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const nodeExternals = require('webpack-node-externals');
const pkg = require('../package.json');

module.exports = merge(baseConfig, {
  devtool: 'source-map',
  entry: {
    index: './src/components/index.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    library: pkg.name.split('/').pop(),
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  externals: [
    nodeExternals(),
  ],
});
