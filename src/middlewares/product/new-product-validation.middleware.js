const { CustomError, productError: { BAD_REQUEST_NOT_VALID_PRODUCT } } = require('../../errors');
const { productValidator } = require('../../validators');
const { resStatusCodesEnum: { BAD_REQUEST } } = require('../../constants');

module.exports = (req, res, next) => {
  try {
    const newProduct = req.body;
    const { error } = productValidator.newProduct.validate(newProduct);

    if (error) {
      return next(new CustomError(
        error.details[0].message,
        BAD_REQUEST,
        BAD_REQUEST_NOT_VALID_PRODUCT.code,
      ));
    }

    next();
  } catch (e) {
    next(e);
  }
};
