const { userValidator } = require('../../validators');

module.exports = (req, res, next) => {
  try {
    const user = req.body;
    const { error } = userValidator.createNewUser.validate(user);

    if (error) {
      return next(new Error('Not valid data'));
    }

    next();
  } catch (e) {
    next(e);
  }
};
