module.exports = {
  baseDir: __dirname,
  port: 3000, // 监听端口
  // 引入中间件
  middlewares: [
  // 中间件自上而下加载
    '../../middlewares/orm',
    '../../middlewares/render',
    '../../middlewares/router',
    '../../middlewares/static',
    // 'koa-bodyparser',
  ],
  static: {
    root: 'static',
    prefix: 'public',
  },
  template: {
    views: `${__dirname}/views`, // 模板位置
    extname: 'xtpl', // 模板扩展名
  },
  database: {
    modelsDir: `${__dirname}/models`,
    logging: false,
    database: 'db',
    username: '',
    password: '',
    host: 'localhost',
    // dialect: 'mysql'|'sqlite'|'postgres'|'mssql',
    dialect: 'sqlite',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },

    // SQLite only
    storage: `${__dirname}/db.sqlite`,
  },
};
