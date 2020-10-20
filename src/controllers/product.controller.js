const { productService } = require('../services');
const { resStatusCodesEnum: { OK } } = require('../constants');

module.exports = {
  createOne: async (req, res, next) => {
    try {
      const { body: product, user } = req;

      const newProduct = await productService.createOne({ ...product, user_id: user.id });

      res.json(newProduct);
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

  getAll: async (req, res, next) => {
    try {
      const products = await productService.getAll();

      res.json(products);
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

  updateOne: async (req, res, next) => {
    try {
      const { product, user } = req;
      const productToUpdate = { ...product, ...req.body, user_id: user.id };

      const updatedProduct = await productService.updateById(+req.params.id, productToUpdate);

      res.json(updatedProduct);
    } catch (e) {
      next(e);
    }
  },
};
