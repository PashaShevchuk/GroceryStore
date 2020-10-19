const { ProductModel } = require('../models');

module.exports = {
  getAll: () => ProductModel.findAll(),
};
