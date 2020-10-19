const { productService } = require('../../services');

module.exports = async (req, res, next) => {
  try {
    const id = +req.params.id;

    const product = await productService.findOneById(id);

    if (!product) {
      return next(new Error('Product not found'));
    }

    req.product = product;
    next();
  } catch (e) {
    next(e);
  }
};
