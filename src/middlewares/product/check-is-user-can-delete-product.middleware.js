module.exports = (req, res, next) => {
  try {
    const { user, product } = req;

    if (user.id !== product.user_id) {
      return next(new Error('You can only delete products that you created yourself'));
    }

    next();
  } catch (e) {
    next(e);
  }
};
