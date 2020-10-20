const { ProductModel } = require('../models');

module.exports = {
  createOne: (productObject) => ProductModel.create(productObject).then((newProduct) => newProduct),

  deleteById: (id) => ProductModel.destroy({ where: { id } }).then(() => 'The product has deleted'),

  findOneById: (id) => ProductModel.findOne({ where: { id } }),

  getAll: () => ProductModel.findAll(),

  updateById: async (id, productObject) => {
    await ProductModel.update(productObject, { where: { id } });

    return ProductModel.findOne({ where: { id } });
  },
};
