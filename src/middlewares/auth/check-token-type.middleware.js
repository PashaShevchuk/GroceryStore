const jwt = require('jsonwebtoken');

const { authService } = require('../../services');
const { config: { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } } = require('../../configs');
const {
  constants: {
    AUTHORIZATION, ACCESS, REFRESH, ACCESS_TOKEN, REFRESH_TOKEN,
  },
} = require('../../constants');

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
        return next(new Error('Not valid token'));
    }

    const token = req.get(AUTHORIZATION);

    if (!token) {
      return next(new Error('Token not found'));
    }

    jwt.verify(token, secretWord, (err) => {
      if (err) {
        return next(new Error('Token is not valid'));
      }
    });

    const tokenWithUser = await authService.getByParams({ [keyName]: token });

    if (!tokenWithUser) {
      return next(new Error('Token is not valid'));
    }

    req.user = tokenWithUser.user;
    next();
  } catch (e) {
    next(e);
  }
};
