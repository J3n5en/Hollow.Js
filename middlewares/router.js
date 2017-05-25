/*
 * @Author: J3n5en with ❤️
 * @Date: 2017-05-25 21:06:30
 * @Last Modified by: J3n5en with ❤️
 * @Last Modified time: 2017-05-25 21:08:42
 * @description: 路由器(router)中间价.
*/

/* eslin-disable no-loop-func*/
/* eslint-disable import/no-dynamic-require*/
/* eslint-disable global-require*/
const router = require('koa-router')();

let app;

function setRoute(routes) {
  for (let i = 0; i < routes.length; i += 1) {
    const route = routes[i];
    router[route.method](route.urlpattern, async (ctx, next) => {
      ctx.params = Object.assign(ctx.params, ctx.quert, ctx.request.body || {});
      ctx.routeInfo = route;
      ctx.settings = app.settings;
      const action = require(`${app.settings.baseDir}/${route.controller}`).prototype[route.action];
      await action.call(ctx);
      await next();
    });
  }
}

module.exports = function Hrouter(_app) {
  app = _app;
  const routes = require(`${app.settings.baseDir}/urls`);
  setRoute(routes);
  return router.routes();
};
