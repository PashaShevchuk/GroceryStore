const { Router } = require('express');

const { userController } = require('../controllers');
const { userMiddleware: { checkNewUserValidity, checkIsUserCreated } } = require('../middlewares');

const userRouter = Router();

userRouter.post(
  '/',
  checkNewUserValidity,
  checkIsUserCreated,
  userController.createOne,
);

module.exports = userRouter;
