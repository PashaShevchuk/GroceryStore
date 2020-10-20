const Joi = require('joi');

const { productTypeEnum: { COUNTED, WEIGHTED } } = require('../../constants');

module.exports = Joi.object().keys({
  title: Joi.string().trim().min(2).max(150).required(),
  description: Joi.string().trim().min(2).max(10000).required(),
  type: Joi.string().trim().valid(...[COUNTED, WEIGHTED]).required(),
  stock_count: Joi.number().min(0.1).max(10000).required(),
  category: Joi.string().trim().min(2).max(100).required(),
  price: Joi.number().min(0.1).max(1000000).required(),
  has_discount: Joi.boolean(),
  old_price: Joi.number().min(0.1).max(1000000)
    .when('has_discount', { is: true, then: Joi.required() }),
});
