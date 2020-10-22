const { Router } = require('express');

const { userController } = require('../controllers');
const {
  userMiddleware: {
    checkNewUserValidity,
    checkIsUserCreated,
    checkIsUserExistByEmail,
    checkEmailValidity,
    checkPasswordValidity,
    checkTokenForgotPassword,
  },
} = require('../middlewares');

const userRouter = Router();

userRouter.post(
  '/',
  checkNewUserValidity,
  checkIsUserCreated,
  userController.createOne,
);

userRouter.post(
  '/password/forgot',
  checkEmailValidity,
  checkIsUserExistByEmail,
  userController.forgotPassword,
);

userRouter.post(
  '/password/reset',
  checkPasswordValidity,
  checkTokenForgotPassword,
  userController.setForgotPass,
);

module.exports = userRouter;
