const { Sequelize } = require('sequelize');

const { config } = require('../config');

module.exports = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
  host: 'localhost', dialect: 'mysql',
});
