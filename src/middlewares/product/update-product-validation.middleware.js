const { productValidator } = require('../../validators');

module.exports = (req, res, next) => {
  try {
    const dataToUpdateProduct = Object.keys(req.body).length !== 0;

    if (!dataToUpdateProduct) {
      return next(new Error('No data to update product'));
    }

    const { error } = productValidator.updateProduct.validate(req.body);

    if (error) {
      return next(new Error('Not valid product'));
    }

    next();
  } catch (e) {
    next(e);
  }
};
