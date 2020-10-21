const { CustomError, productError: { NOT_FOUND_PRODUCT } } = require('../../errors');
const { productService } = require('../../services');
const { resStatusCodesEnum: { NOT_FOUND } } = require('../../constants');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productService.findOneById(id);

    if (!product) {
      return next(new CustomError(
        NOT_FOUND_PRODUCT.message,
        NOT_FOUND,
        NOT_FOUND_PRODUCT.code,
      ));
    }

    req.product = product;
    next();
  } catch (e) {
    next(e);
  }
};
