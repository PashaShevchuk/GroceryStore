const { ProductModel } = require('../models');

module.exports = {
  createOne: (productObject) => ProductModel.create(productObject).then((newProduct) => newProduct),

  deleteById: (id) => ProductModel.destroy({ where: { id } }).then(() => 'The product has deleted'),

  findOneById: (id) => ProductModel.findOne({ where: { id } }),

  getAll: () => ProductModel.findAll(),
};
