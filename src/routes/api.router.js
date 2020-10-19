const { Router } = require('express');

const { authRouter, productRouter, userRouter } = require('./index');

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/product', productRouter);
apiRouter.use('/users', userRouter);

module.exports = apiRouter;
