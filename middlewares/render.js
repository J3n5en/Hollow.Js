/*
 * @Author: J3n5en with ❤️
 * @Date: 2017-05-25 21:06:15
 * @Last Modified by: J3n5en with ❤️
 * @Last Modified time: 2017-05-25 21:14:11
 * @description: render中间件,解析模板.
*/
const xtpl = require('xtpl/lib/xtpl');
const Path = require('path');

let settings;
let app;

function merge(target, source) {
  for (const i in source) {
    target[i] = source[i];
  }
}
/**
 * 向Koa context 注入 render && json 方法
 */
module.exports = (_app) => {
  app = _app;
  settings = app.settings.template;

  return async function render(ctx, next) {
    const views = settings.views;
    const extname = settings.extname;

    ctx.render = (path, data) => {
      let context = {};
      merge(context, this.state || {});
      merge(context, data);
      let filePath;
      if (path.charAt(0) === '/') {
        filePath = path;
      } else {
        filePath = Path.resolve(views, `${path}.${extname}`);
      }

      xtpl.renderFile(filePath, context, (error, html) => {
        if (!error) {
          ctx.type = 'html';
          ctx.body = html;
        } else {
          app.logger(error);
        }
      });
    };

    ctx.json = (data) => {
      ctx.body = data;
    };
    await next();
  };
};
