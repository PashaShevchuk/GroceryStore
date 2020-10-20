const { productValidator } = require('../../validators');

module.exports = (req, res, next) => {
  try {
    const newProduct = req.body;
    const { error } = productValidator.newProduct.validate(newProduct);

    if (error) {
      return next(new Error(error.details[0].message));
    }

    next();
  } catch (e) {
    next(e);
  }
};
