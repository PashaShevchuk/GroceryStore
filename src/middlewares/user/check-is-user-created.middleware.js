const { CustomError, userError: { BAD_REQUEST_USER_REGISTERED } } = require('../../errors');
const { resStatusCodesEnum: { BAD_REQUEST } } = require('../../constants');
const { userService } = require('../../services');
const { winston } = require('../../logger');

const logger = winston('CHECK-IS-USER-CREATED');

module.exports = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await userService.findOneByParams({ email });

    if (user) {
      logger.info({ message: BAD_REQUEST_USER_REGISTERED.message });
      return next(new CustomError(
        BAD_REQUEST_USER_REGISTERED.message,
        BAD_REQUEST,
        BAD_REQUEST_USER_REGISTERED.code,
      ));
    }

    next();
  } catch (e) {
    next(e);
  }
};
