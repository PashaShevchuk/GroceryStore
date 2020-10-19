const { Router } = require('express');

const { constants: { ACCESS } } = require('../constants');
const { productController } = require('../controllers');
const {
  authMiddleware: { checkTokenType },
  productMiddleware: { checkIsProductExistById, checkIsUserCanDeleteProduct },
} = require('../middlewares');

const productRouter = Router();

productRouter.get(
  '/',
  productController.getAll,
);

productRouter.get(
  '/:id',
  checkIsProductExistById,
  productController.getOne,
);

productRouter.delete(
  '/:id',
  checkTokenType(ACCESS),
  checkIsProductExistById,
  checkIsUserCanDeleteProduct,
  productController.deleteOne,
);

module.exports = productRouter;
