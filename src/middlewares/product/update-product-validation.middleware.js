const { CustomError, productError: { BAD_REQUEST_NOT_VALID_PRODUCT } } = require('../../errors');
const { productValidator } = require('../../validators');
const { resStatusCodesEnum: { BAD_REQUEST } } = require('../../constants');
const { winston } = require('../../logger');

const logger = winston('UPDATE-PRODUCT-VALIDATION');

module.exports = (req, res, next) => {
  try {
    const dataToUpdateProduct = Object.keys(req.body).length !== 0;

    if (!dataToUpdateProduct) {
      logger.info({ message: BAD_REQUEST_NOT_VALID_PRODUCT.message });
      return next(new CustomError(
        BAD_REQUEST_NOT_VALID_PRODUCT.message,
        BAD_REQUEST,
        BAD_REQUEST_NOT_VALID_PRODUCT.code,
      ));
    }

    const { error } = productValidator.updateProduct.validate(req.body);

    if (error) {
      logger.info({ message: BAD_REQUEST_NOT_VALID_PRODUCT.message });
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
