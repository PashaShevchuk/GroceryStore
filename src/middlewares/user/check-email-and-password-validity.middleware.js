const { CustomError, userError: { BAD_REQUEST_NOT_VALID_USER } } = require('../../errors');
const { resStatusCodesEnum: { BAD_REQUEST } } = require('../../constants');
const { userValidator } = require('../../validators');

module.exports = (req, res, next) => {
  try {
    const user = req.body;
    const { error } = userValidator.emailAndPassword.validate(user);

    if (error) {
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
