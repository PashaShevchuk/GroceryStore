const { DataTypes } = require('sequelize');

const { dbTablesEnum } = require('../../configs');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(dbTablesEnum.USERS, {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(dbTablesEnum.USERS);
  },
};
