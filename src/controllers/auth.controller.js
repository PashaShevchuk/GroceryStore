const { authService } = require('../services');
const { createTokens } = require('../helpers');
const { constants: { AUTHORIZATION } } = require('../constants');
const { resStatusCodesEnum } = require('../constants');

module.exports = {
  login: async (req, res, next) => {
    try {
      const { user } = req;
      const tokens = createTokens();

      await authService.createTokenPair({
        ...tokens,
        user_id: user.id,
      });

      res.json(tokens);
    } catch (e) {
      next(e);
    }
  },

  logout: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      await authService.deleteByParams({ access_token: token });

      res.status(resStatusCodesEnum.NO_CONTENT).end();
    } catch (e) {
      next(e);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { user } = req;
      const token = req.get(AUTHORIZATION);
      const newTokensPair = createTokens();

      await authService.deleteByParams({ refresh_token: token });
      await authService.createTokenPair({ ...newTokensPair, user_id: user.id });

      res.json(newTokensPair);
    } catch (e) {
      next(e);
    }
  },
};
