const Joi = require('joi');

const { regexpEnum } = require('../../constants');

module.exports = Joi.object().keys({
  email: Joi.string().trim().regex(regexpEnum.EMAIL).required(),
  password: Joi.string().trim().regex(regexpEnum.PASSWORD).required(),
});
