const { Router } = require('express');

const { authRouter, userRouter } = require('./index');

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);

module.exports = apiRouter;
