const { hashPassword } = require('../helpers');
const { userService } = require('../services');

module.exports = {
  createOne: async (req, res, next) => {
    try {
      const user = req.body;

      user.password = await hashPassword(user.password);
      const newUser = await userService.create(user);

      res.status(201).json(newUser);
    } catch (e) {
      next(e);
    }
  },
};
