const path = require('path');
const fs = require('fs');

// 获取entry函数
function getEntry (baseDir = './src/components/', fileExt) {
  const entryDir = path.join(process.cwd(), baseDir);

  // 文件夹不存在
  if (!fs.existsSync(entryDir)) {
    return {};
  }

  const files = fs.readdirSync(entryDir);
  return files.map((file) => path.join(entryDir, file))
    .filter((filePath) => {
      const stat = fs.statSync(filePath);
      if (fileExt) {
        // 筛选出文件
        return stat.isFile() && filePath.endsWith(fileExt);
      }
      // 文件夹
      return stat.isDirectory();
    })
    // 返回entry信息: {name: path}对象
    .reduce((prev, filePath) => {
      const pathInfo = path.parse(filePath);
      // 文件夹
      if (!fileExt) {
        filePath += '/index.js';
      }
      prev[pathInfo.name] = filePath;
      return prev;
    }, {});
}

module.exports = getEntry;
