const { Router } = require('express');

const { productController } = require('../controllers');

const productRouter = Router();

productRouter.get('/', productController.getAll);

module.exports = productRouter;
