const { hashPassword } = require('../helpers');
const { resStatusCodesEnum: { CREATED } } = require('../constants');
const { userService } = require('../services');

module.exports = {
  createOne: async (req, res, next) => {
    try {
      const user = req.body;

      user.password = await hashPassword(user.password);
      const newUser = await userService.create(user);

      res.status(CREATED).json(newUser);
    } catch (e) {
      next(e);
    }
  },
};
