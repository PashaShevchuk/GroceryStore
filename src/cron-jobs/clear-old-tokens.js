const dayjs = require('dayjs');
const { Op } = require('sequelize');

const { authService } = require('../services');

module.exports = async () => {
  await authService.deleteByParams({
    created_at: {
      [Op.lte]: dayjs().subtract(30, 'day').format(),
    },
  });
};
