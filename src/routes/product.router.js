const { Router } = require('express');

const { constants: { ACCESS } } = require('../constants');
const { productController } = require('../controllers');
const {
  authMiddleware: { checkTokenType },
  productMiddleware: {
    checkIsProductExistById,
    checkIsUserCanModifyProduct,
    newProductValidation,
    updateProductValidation,
  },
} = require('../middlewares');

const productRouter = Router();

// create
productRouter.post(
  '/',
  checkTokenType(ACCESS),
  newProductValidation,
  productController.createOne,
);
// read
productRouter.get(
  '/',
  productController.getAll,
);
productRouter.get(
  '/:id',
  checkIsProductExistById,
  productController.getOne,
);
// update
productRouter.patch(
  '/:id',
  checkTokenType(ACCESS),
  checkIsProductExistById,
  checkIsUserCanModifyProduct,
  updateProductValidation,
  productController.updateOne,
);
// delete
productRouter.delete(
  '/:id',
  checkTokenType(ACCESS),
  checkIsProductExistById,
  checkIsUserCanModifyProduct,
  productController.deleteOne,
);

module.exports = productRouter;
