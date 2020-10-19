const { Router } = require('express');

const { authController } = require('../controllers');
const {
  authMiddleware: { checkTokenType },
  userMiddleware: { checkEmailAndPasswordValidity, checkHashUserPassword, checkIsUserExistByEmail },
} = require('../middlewares');
const { constants: { ACCESS, REFRESH } } = require('../constants');

const authRouter = Router();

authRouter.post(
  '/',
  checkEmailAndPasswordValidity,
  checkIsUserExistByEmail,
  checkHashUserPassword,
  authController.login,
);

authRouter.post(
  '/logout',
  checkTokenType(ACCESS),
  authController.logout,
);

authRouter.post(
  '/refresh',
  checkTokenType(REFRESH),
  authController.refreshToken,
);

module.exports = authRouter;
