const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  try {
    const { user } = req;
    const { password } = req.body;

    const isPasswordsEquals = await bcrypt.compare(password, user.password);

    if (!isPasswordsEquals) {
      return next(new Error('Wrong password'));
    }

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};
