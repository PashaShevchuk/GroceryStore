const { ProductModel } = require('../models');

module.exports = {
  findOneById: (id) => ProductModel.findOne({ where: { id } }),

  deleteById: (id) => ProductModel.destroy({ where: { id } }).then(() => 'The product has deleted'),

  getAll: () => ProductModel.findAll(),
};
