const { Model, DataTypes } = require('sequelize');

const { dbTablesEnum } = require('../constants');
const { sequelize } = require('../db');

class UserModel extends Model {
}

UserModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'user',
  tableName: dbTablesEnum.USERS,
  timestamps: false,
});

module.exports = UserModel;
