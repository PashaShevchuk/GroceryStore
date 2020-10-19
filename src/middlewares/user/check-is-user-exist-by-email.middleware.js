const { userService } = require('../../services');

module.exports = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await userService.findOneByParams({ email });

    if (!user) {
      return next(new Error('Not valid data'));
    }

    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};
