import { getValueByPath } from 'utils-lib/dist/object';

// 获取依赖配置
function getDepConfig (deps = [], formValue) {
  return deps.map((item) => {
    const { dep, ...rest } = item;
    let { key, opt, val } = dep;
    const depValue = getValueByPath(formValue, key);

    // 为函数
    if (typeof opt === 'function') {
      if (opt(depValue, val)) {
        return rest;
      }
      return;
    }

    /* eslint-disable */
    switch (opt) {
      // 等于
      case 'eq': {
        // 不用全等
        if (depValue == val) {
          return rest;
        }
        break;
      }
      // 不等于
      case 'neq': {
        // 不用全等
        if (depValue != val) {
          return rest;
        }
        break;
      }
      // 为空
      case 'ie': {
        if (!depValue) {
          return rest;
        }
        break;
      }
      // 不为空
      case 'nie': {
        if (depValue) {
          return rest;
        }
        break;
      }
      // 小于
      case 'lt': {
        if (+depValue < +val) {
          return rest;
        }
        break;
      }
      // 大于
      case 'gt': {
        if (+depValue > +val) {
          return rest;
        }
        break;
      }
      // 小于等于
      case 'lte': {
        if (+depValue <= +val) {
          return rest;
        }
        break;
      }
      // 大于等于
      case 'gte': {
        if (+depValue >= +val) {
          return rest;
        }
        break;
      }
      // 枚举
      case 'in': {
        if (typeof val === 'string') {
          val = val.split(',');
        }
        // 不用全等
        if (val.filter(i => i == depValue).length) {
          return rest;
        }
        break;
      }
      // 正则
      case 'reg': {
        const reg = new RegExp(val);
        if (reg.test(depValue)) {
          return rest;
        }
        break;
      }
    }
    /* eslint-enable */
  }).filter(i => i);
}

export {
  getDepConfig,
};
