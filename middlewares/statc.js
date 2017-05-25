/*
 * @Author: J3n5en with ❤️
 * @Date: 2017-05-25 21:08:50
 * @Last Modified by: J3n5en with ❤️
 * @Last Modified time: 2017-05-25 21:13:46
 * @description: 静态资源(static)中间件.用于加载静态文件,生产环境建议使用更专业的,例如:nginx
*/
const path = require('path');
const fs = require('fs');
const send = require('koa-send');

/**
* 处理静态资源中间件
*/
module.exports = (app) => {
  let options = [];
  options = app.settings.static ? app.settings.static : {};
  options.root = options.root ? options.root : 'static';
  options.prefix = options.prefix ? options.prefix : 'static';
  return async (ctx, next) => {
    await next();
    if (ctx.method !== 'HEAD' && ctx.method !== 'GET') return;
    if (ctx.body != null || ctx.status !== 404) return;
    // ctx.path.replace(options.prefix,options.root)
    if (!fs.existsSync(path.join(app.settings.baseDir, ctx.path.replace(`/${options.prefix}`, '')))) return;
    await send(ctx, ctx.path.replace(`/${options.prefix}`, ''), options);
    // console.log()
  };
};
