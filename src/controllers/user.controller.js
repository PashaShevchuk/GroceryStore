const { actionEnum: { FORGOT_PASSWORD } } = require('../constants');
const { createTokens } = require('../helpers');
const { hashPassword } = require('../helpers');
const { resStatusCodesEnum: { CREATED } } = require('../constants');
const { emailService, userService } = require('../services');

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

  forgotPassword: async (req, res, next) => {
    try {
      const { id, email } = req.user;
      const { access_token } = createTokens(FORGOT_PASSWORD);

      await userService.addTokenById(id, access_token);
      await emailService.sendMail(email, FORGOT_PASSWORD, { token: access_token });

      res.end();
    } catch (e) {
      next(e);
    }
  },

  setForgotPass: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { password } = req.body;

      const newHashPassword = await hashPassword(password);
      await userService.updateById(id, { password: newHashPassword, token: null });

      res.end();
    } catch (e) {
      next(e);
    }
  },
};
