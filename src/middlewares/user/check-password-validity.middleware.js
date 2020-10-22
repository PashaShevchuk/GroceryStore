const { CustomError, userError: { BAD_REQUEST_NOT_VALID_USER } } = require('../../errors');
const { resStatusCodesEnum: { BAD_REQUEST } } = require('../../constants');
const { userValidator } = require('../../validators');
const { winston } = require('../../logger');

const logger = winston('CHECK-PASSWORD-VALIDITY');

module.exports = (req, res, next) => {
  try {
    const { error } = userValidator.pasword.validate(req.body);

    if (error) {
      logger.info({ message: BAD_REQUEST_NOT_VALID_USER.message });
      return next(new CustomError(
        BAD_REQUEST_NOT_VALID_USER.message,
        BAD_REQUEST,
        BAD_REQUEST_NOT_VALID_USER.code,
      ));
    }

    next();
  } catch (e) {
    next(e);
  }
};
