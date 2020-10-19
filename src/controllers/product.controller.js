const { productService } = require('../services');
const { resStatusCodesEnum: { OK } } = require('../constants');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const products = await productService.getAll();

      res.json(products);
    } catch (e) {
      next(e);
    }
  },

  deleteOne: async (req, res, next) => {
    try {
      const { id } = req.params;
      const messageAboutDeletingProduct = await productService.deleteById(id);

      res.status(OK).send(messageAboutDeletingProduct);
    } catch (e) {
      next(e);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const { product } = req;

      res.json(product);
    } catch (e) {
      next(e);
    }
  },
};
