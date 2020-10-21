const Joi = require('joi');

const { regexpEnum: { EMAIL, PASSWORD } } = require('../../constants');

module.exports = Joi.object().keys({
  name: Joi.string().trim().alphanum().min(2).max(255).required(),
  surname: Joi.string().trim().alphanum().min(2).max(255).required(),
  email: Joi.string().trim().regex(EMAIL).max(50).required(),
  password: Joi.string().trim().regex(PASSWORD).required(),
});
