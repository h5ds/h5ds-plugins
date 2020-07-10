const path = require('path');
const resolve = url => path.resolve(__dirname, url);

module.exports = {
  theme: {},
  rootPath: (...args) => path.join(__dirname, '..', ...args),
  resolve,
  packSpecifiedPlugins: false, // 如果是 ['demo'] 就会单独打包demo插件, 如果是 false，全部打包
  port: 7777,
  host: '127.0.0.1',
  version: '6.0.0'
};
