const { CustomError, productError: { FORBIDDEN_PRODUCT_NOT_MODIFIED } } = require('../../errors');
const { resStatusCodesEnum: { FORBIDDEN } } = require('../../constants');

module.exports = (req, res, next) => {
  try {
    const { user, product } = req;

    if (user.id !== product.user_id) {
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
