const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../db');
const { dbTablesEnum } = require('../constants');
const UserModel = require('./user.model');

class AuthModel extends Model {
}

AuthModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  access_token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refresh_token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    foreignKey: true,
  },
  created_at: {
    type: DataTypes.STRING,
    defaultValue: new Date().toISOString(),
  },

}, {
  sequelize,
  modelName: 'auth',
  tableName: dbTablesEnum.AUTH,
  timestamps: false,
});

AuthModel.belongsTo(UserModel, { foreignKey: 'user_id' });

module.exports = AuthModel;
