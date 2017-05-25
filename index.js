/*
 * @Author: J3n5en with ❤️
 * @Date: 2017-05-25 21:06:44
 * @Last Modified by:   J3n5en with ❤️
 * @Last Modified time: 2017-05-25 21:06:44
*/

const path = require('path');
const Koa = require('koa');
const log4js = require('log4js');

module.exports = class Hollow {
  constructor(settings) {
    this.logger = log4js.getLogger();
    this.settings = settings;
    this.context = {}; // 上下文
    this.middlewares = []; // 中间件
    this.server = new Koa(); // koa 实例
  }
  run() {
    // 注册中间件
    this.initMiddleware();
    // 按优先级排序中间件
    this.server.listen(this.settings.port);
    this.logger.info(`Server listening on ${this.settings.port}`);
  }
  use(middleware) {
    this.server.use(middleware);
  }
  initMiddleware() {
    const middlewares = this.settings.middlewares;
    for (let i = 0; i < middlewares.length; i += 1) {
      const middlewarePath = path.join(this.settings.baseDir, 'node_modules', middlewares[i]);
      /* eslint-disable import/no-dynamic-require*/
      /* eslint-disable global-require*/
      const middleware = require(middlewarePath);
      this.use(middleware(this));
    }
  }
};
