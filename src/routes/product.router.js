const { Router } = require('express');

const { constants: { ACCESS } } = require('../constants');
const { productController } = require('../controllers');
const {
  authMiddleware: { checkTokenType },
  productMiddleware: { checkIsProductExistById, checkIsUserCanDeleteProduct, newProductValidation },
} = require('../middlewares');

const productRouter = Router();

productRouter.post(
  '/',
  checkTokenType(ACCESS),
  newProductValidation,
  productController.createOne,
);

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
