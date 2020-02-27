const components = require('./entry/components');
const utils = require('./entry/utils');
const mixins = require('./entry/mixins');
const pkg = require('../package.json');

const externals = {};

// 组件中相互引用
Object.keys(components)
  .forEach(key => {
    externals[`../${key}`] = `${pkg.name}/dist/${key}`;
  });

// mixins
Object.keys(mixins)
  .forEach(key => {
    externals[`../../scripts/mixins/${key}`] = `${pkg.name}/dist/mixins/${key}`;
  });

// utils
Object.keys(utils)
  .forEach(key => {
    externals[`../../scripts/utils/${key}`] = `${pkg.name}/dist/utils/${key}`;
  });

module.exports = externals;
