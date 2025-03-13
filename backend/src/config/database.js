const { Sequelize } = require('sequelize');
const path = require('path');
const configDict = require('./configDict');

// add configDict.js
const sequelize = new Sequelize({
  database: configDict.database.name,
  username: configDict.database.user,
  password: configDict.database.password,
  host: configDict.database.host,
  dialect: 'mysql',
  port: configDict.database.port,
  logging: console.log,  // Enable logging to debug connection issues
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
});
module.exports = sequelize;