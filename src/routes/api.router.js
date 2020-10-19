const { Router } = require('express');

const { userRouter } = require('./index');

const apiRouter = Router();

apiRouter.use('/users', userRouter);

module.exports = apiRouter;
