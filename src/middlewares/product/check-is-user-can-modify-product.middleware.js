module.exports = (req, res, next) => {
  try {
    const { user, product } = req;

    if (user.id !== product.user_id) {
      return next(new Error('You do not have access to update/delete this product.'));
    }

    next();
  } catch (e) {
    next(e);
  }
};
