/*
 * @Author: J3n5en with ❤️
 * @Date: 2017-05-26 16:34:14
 * @Last Modified by: J3n5en with ❤️
 * @Last Modified time: 2017-05-26 17:15:14
*/
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
// 'mysql'|'sqlite'|'postgres'|'mssql',
function getMoudlesName(dialect) {
  let moudles;
  switch (dialect) {
    case 'mysql':
      moudles = 'mysql2';
      break;
    case 'sqlite':
      moudles = 'sqlite3';
      break;
    case 'pg':
      moudles = 'sqlite3';
      break;
    case 'mssql':
      moudles = 'tedious';
      break;
    default:
      throw new Error('err database dialect!!');
  }
  return moudles;
}
module.exports = (app) => {
  async function orm(ctx, next) {
    const config = app.settings.database;
    config.dialectModulePath = path.join(app.settings.baseDir, 'node_modules', getMoudlesName(config.dialect));
    const sequelize = new Sequelize(config.database, config.username, config.password, config);
    // conMsg = await sequelize.authenticate();
    const database = {
      sequelize: sequelize,
      sync: sequelize.sync.bind(sequelize),
    };
    const modelsDir = config.modelsDir;
    const models = {};
    fs.readdirSync(modelsDir)
      .forEach((file) => {
        if (/\.js$/.test(file)) {
          const model = sequelize.import(path.join(modelsDir, file));
          models[model.name] = model;
        }
      });
    Object.assign(database, models);
    ctx.orm = database;
    await next();
  }
  return orm;
};



