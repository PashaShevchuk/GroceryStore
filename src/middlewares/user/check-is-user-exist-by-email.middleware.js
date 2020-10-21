const { CustomError, userError: { BAD_REQUEST_NOT_VALID_USER } } = require('../../errors');
const { resStatusCodesEnum: { BAD_REQUEST } } = require('../../constants');
const { userService } = require('../../services');
const { winston } = require('../../logger');

const logger = winston('CHECK-IS-USER-EXIST-BY-EMAIL');

module.exports = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await userService.findOneByParams({ email });

    if (!user) {
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
