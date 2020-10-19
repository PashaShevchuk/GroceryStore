const { ProductModel } = require('../models');

module.exports = {
  findOneById: (id) => ProductModel.findOne({ where: { id } }),

  getAll: () => ProductModel.findAll(),
};
