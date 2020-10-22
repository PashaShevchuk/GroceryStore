const jwt = require('jsonwebtoken');

const {
  CustomError,
  authError: { BAD_REQUEST_NO_TOKEN, UNAUTHORIZED_NOT_VALID_TOKEN },
  userError: { NOT_FOUND_USER },
} = require('../../errors');
const {
  constants: { AUTHORIZATION },
  resStatusCodesEnum: { BAD_REQUEST, UNAUTHORIZED, NOT_FOUND }
} = require('../../constants');
const { config: { ACCESS_TOKEN_RESET_PASSWORD_SECRET } } = require('../../configs');
const { userService } = require('../../services');
const { winston } = require('../../logger');

const logger = winston('CHECK-TOKEN-FORGOT-PASSWORD');

module.exports = async (req, res, next) => {
  try {
    const token = req.get(AUTHORIZATION);

    if (!token) {
      logger.info({ message: BAD_REQUEST_NO_TOKEN.message });
      return next(new CustomError(
        BAD_REQUEST_NO_TOKEN.message,
        BAD_REQUEST,
        BAD_REQUEST_NO_TOKEN.code,
      ));
    }

    jwt.verify(token, ACCESS_TOKEN_RESET_PASSWORD_SECRET, (err) => {
      if (err) {
        logger.info({ message: UNAUTHORIZED_NOT_VALID_TOKEN.message });
        return next(new CustomError(
          UNAUTHORIZED_NOT_VALID_TOKEN.message,
          UNAUTHORIZED,
          UNAUTHORIZED_NOT_VALID_TOKEN.code,
        ));
      }
    });

    const userByToken = await userService.findOneByParams({ token });

    if (!userByToken) {
      logger.info({ message: NOT_FOUND_USER.message });
      return next(new CustomError(
        NOT_FOUND_USER.message,
        NOT_FOUND,
        NOT_FOUND_USER.code,
      ));
    }

    req.user = userByToken;

    next();
  } catch (e) {
    next(e);
  }
};
