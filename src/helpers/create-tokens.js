const jwt = require('jsonwebtoken');

const { actionEnum: { USER_AUTH, FORGOT_PASSWORD } } = require('../constants');
const {
  config: {
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_LIFETIME,
    ACCESS_TOKEN_RESET_PASSWORD_SECRET,
    ACCESS_TOKEN_RESET_PASSWORD_LIFETIME,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_LIFETIME,
  },
} = require('../configs');
const { constants: { WRONG_ACTION_TYPE } } = require('../constants');

module.exports = (action) => {
  let access_token = '';
  let refresh_token = '';

  switch (action) {
    case USER_AUTH:
      access_token = jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFETIME });
      refresh_token = jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_LIFETIME });
      break;

    case FORGOT_PASSWORD:
      access_token = jwt.sign(
        {},
        ACCESS_TOKEN_RESET_PASSWORD_SECRET,
        { expiresIn: ACCESS_TOKEN_RESET_PASSWORD_LIFETIME },
      );
      break;

    default:
      throw new Error(WRONG_ACTION_TYPE);
  }

  return {
    access_token,
    refresh_token,
  };
};
