const { CustomError, productError: { FORBIDDEN_PRODUCT_NOT_MODIFIED } } = require('../../errors');
const { resStatusCodesEnum: { FORBIDDEN } } = require('../../constants');
const { winston } = require('../../logger');

const logger = winston('CHECK-IS-USER-EXIST-BY-EMAIL');

module.exports = (req, res, next) => {
  try {
    const { user, product } = req;

    if (user.id !== product.user_id) {
      logger.info({ message: FORBIDDEN_PRODUCT_NOT_MODIFIED.message });
      return next(new CustomError(
        FORBIDDEN_PRODUCT_NOT_MODIFIED.message,
        FORBIDDEN,
        FORBIDDEN_PRODUCT_NOT_MODIFIED.code,
      ));
    }

    next();
  } catch (e) {
    next(e);
  }
};
