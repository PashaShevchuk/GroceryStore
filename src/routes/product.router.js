const { Router } = require('express');

const { productController } = require('../controllers');
const { productMiddleware: { checkIsProductExistById } } = require('../middlewares');

const productRouter = Router();

productRouter.get('/', productController.getAll);

productRouter.get(
  '/:id',
  checkIsProductExistById,
  productController.detOne,
);

module.exports = productRouter;
