const jwt = require('jsonwebtoken');

const { authService } = require('../../services');
const { config: { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } } = require('../../configs');
const {
  constants: {
    AUTHORIZATION, ACCESS, REFRESH, ACCESS_TOKEN, REFRESH_TOKEN,
  },
} = require('../../constants');
const { CustomError, authError: { BAD_REQUEST_NO_TOKEN, UNAUTHORIZED_NOT_VALID_TOKEN } } = require('../../errors');
const { resStatusCodesEnum: { BAD_REQUEST, UNAUTHORIZED } } = require('../../constants');

module.exports = (tokenType) => async (req, res, next) => {
  try {
    let secretWord = '';
    let keyName = '';

    switch (tokenType) {
      case ACCESS:
        secretWord = ACCESS_TOKEN_SECRET;
        keyName = ACCESS_TOKEN;
        break;

      case REFRESH:
        secretWord = REFRESH_TOKEN_SECRET;
        keyName = REFRESH_TOKEN;
        break;

      default:
        return next(new CustomError(
          UNAUTHORIZED_NOT_VALID_TOKEN.message,
          UNAUTHORIZED,
          UNAUTHORIZED_NOT_VALID_TOKEN.code,
        ));
    }

    const token = req.get(AUTHORIZATION);

    if (!token) {
      return next(new CustomError(
        BAD_REQUEST_NO_TOKEN.message,
        BAD_REQUEST,
        BAD_REQUEST_NO_TOKEN.code,
      ));
    }

    jwt.verify(token, secretWord, (err) => {
      if (err) {
        return next(new CustomError(
          UNAUTHORIZED_NOT_VALID_TOKEN.message,
          UNAUTHORIZED,
          UNAUTHORIZED_NOT_VALID_TOKEN.code,
        ));
      }
    });

    const tokenWithUser = await authService.getByParams({ [keyName]: token });

    if (!tokenWithUser) {
      return next(new CustomError(
        UNAUTHORIZED_NOT_VALID_TOKEN.message,
        UNAUTHORIZED,
        UNAUTHORIZED_NOT_VALID_TOKEN.code,
      ));
    }

    req.user = tokenWithUser.user;
    next();
  } catch (e) {
    next(e);
  }
};
