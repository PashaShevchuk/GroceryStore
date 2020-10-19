const { DataTypes } = require('sequelize');

const { dbTablesEnum } = require('../../configs');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(dbTablesEnum.AUTH, {
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
        references: {
          model: dbTablesEnum.USERS,
          key: 'id',
        },
      },
      created_at: {
        type: DataTypes.STRING,
        default: new Date().toISOString(),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(dbTablesEnum.AUTH);
  },
};
