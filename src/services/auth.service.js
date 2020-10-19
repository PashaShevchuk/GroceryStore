const { AuthModel } = require('../models');

module.exports = {
  createTokenPair: (tokenObject) => AuthModel.create(tokenObject),
};
