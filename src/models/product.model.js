const { Model, DataTypes } = require('sequelize');

const { dbTablesEnum, productTypeEnum } = require('../constants');
const { sequelize } = require('../db');
const UserModel = require('./user.model');

class ProductModel extends Model {
}

ProductModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM(productTypeEnum.COUNTED, productTypeEnum.WEIGHTED),
    allowNull: false,
    defaultValue: productTypeEnum.COUNTED,
  },
  stock_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  has_discount: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  old_price: {
    type: DataTypes.INTEGER,
  },
  photos: {
    type: DataTypes.STRING,
  },
  user_id: {
    type: DataTypes.INTEGER,
    foreignKey: true,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'product',
  tableName: dbTablesEnum.PRODUCTS,
  timestamps: false,
});

ProductModel.belongsTo(UserModel, { foreignKey: 'user_id' });

module.exports = ProductModel;
