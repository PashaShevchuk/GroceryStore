const { productService } = require('../services');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const products = await productService.getAll();

      res.json(products);
    } catch (e) {
      next(e);
    }
  },
};
