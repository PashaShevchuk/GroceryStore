const bcrypt = require('bcrypt');

const { CustomError, userError: { BAD_REQUEST_NOT_VALID_USER } } = require('../../errors');
const { resStatusCodesEnum: { BAD_REQUEST } } = require('../../constants');
const { winston } = require('../../logger');

const logger = winston('CHECK-HASH-USER-PASSWORD');

module.exports = async (req, res, next) => {
  try {
    const { user } = req;
    const { password } = req.body;

    const isPasswordsEquals = await bcrypt.compare(password, user.password);

    if (!isPasswordsEquals) {
      logger.info({ message: BAD_REQUEST_NOT_VALID_USER.message });
      return next(new CustomError(
        BAD_REQUEST_NOT_VALID_USER.message,
        BAD_REQUEST,
        BAD_REQUEST_NOT_VALID_USER.code,
      ));
    }

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};
