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
productRouter.post('/', checkTokenType(ACCESS), newProductValidation, productController.createOne);

// read
productRouter.get('/', productController.getAll);

// for get, patch, delete - '/:id'
productRouter.use('/:id', checkIsProductExistById);

productRouter.get('/:id', productController.getOne);

// for patch, delete - '/:id' + checkTokenType
productRouter.use('/:id', checkTokenType(ACCESS), checkIsUserCanModifyProduct);

// update
productRouter.patch('/:id', updateProductValidation, productController.updateOne);

// delete
productRouter.delete('/:id', productController.deleteOne);

module.exports = productRouter;
