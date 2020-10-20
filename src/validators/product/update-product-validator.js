const Joi = require('joi');

const { productTypeEnum: { COUNTED, WEIGHTED } } = require('../../constants');

module.exports = Joi.object().keys({
  title: Joi.string().trim().min(2).max(150),
  description: Joi.string().trim().min(2).max(10000),
  type: Joi.string().trim().valid(...[COUNTED, WEIGHTED]),
  stock_count: Joi.number().min(0.1).max(10000),
  category: Joi.string().trim().min(2).max(100),
  price: Joi.number().min(0.1).max(1000000),
  has_discount: Joi.boolean(),
  old_price: Joi.number().min(0.1).max(1000000)
    .when('has_discount', { is: true, then: Joi.required() }),
});
