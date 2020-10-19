const { authService } = require('../services');
const { createTokens } = require('../helpers');

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
};
