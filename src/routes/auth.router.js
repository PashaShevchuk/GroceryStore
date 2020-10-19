const { Router } = require('express');

const { authController } = require('../controllers');
const {
  userMiddleware: { checkEmailAndPasswordValidity, checkHashUserPassword, checkIsUserExistByEmail },
} = require('../middlewares');

const authRouter = Router();

authRouter.post(
  '/',
  checkEmailAndPasswordValidity,
  checkIsUserExistByEmail,
  checkHashUserPassword,
  authController.login,
);

module.exports = authRouter;
