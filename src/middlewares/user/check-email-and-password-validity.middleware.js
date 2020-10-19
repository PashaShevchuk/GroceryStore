const { userValidator } = require('../../validators');

module.exports = (req, res, next) => {
  try {
    const user = req.body;
    const { error } = userValidator.emailAndPassword.validate(user);

    if (error) {
      return next(new Error('Not valid email or password'));
    }

    next();
  } catch (e) {
    next(e);
  }
};
