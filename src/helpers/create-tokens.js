const jwt = require('jsonwebtoken');

const { config } = require('../configs');

module.exports = () => {
  const access_token = jwt.sign({}, config.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
  const refresh_token = jwt.sign({}, config.REFRESH_TOKEN_SECRET, { expiresIn: '29d' });

  return {
    access_token,
    refresh_token,
  };
};
