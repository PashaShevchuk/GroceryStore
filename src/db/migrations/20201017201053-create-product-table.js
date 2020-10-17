const { DataTypes } = require('sequelize');

const { dbTablesEnum, productTypeEnum } = require('../../configs');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(dbTablesEnum.PRODUCTS, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
        references: {
          model: dbTablesEnum.USERS,
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(dbTablesEnum.PRODUCTS);
  },
};
