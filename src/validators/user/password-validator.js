const Joi = require('joi');

const { regexpEnum } = require('../../constants');

module.exports = Joi.object().keys({
  password: Joi.string().trim().regex(regexpEnum.PASSWORD).required(),
});
