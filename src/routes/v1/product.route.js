const express = require('express');
const validate = require('../../middlewares/validate');
const tokenValidation = require('../../validations/token.validation');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth('addProduct'), tokenValidation.token, validate(productValidation.addProduct), productController.addProduct)
  .get(auth('getProducts'), tokenValidation.token, validate(productValidation.getProducts), productController.getProducts);

router
  .route('/:sku')
  .get(auth('getProducts'), tokenValidation.token, validate(productValidation.getProduct), productController.getProduct)
  .patch(auth('manageProducts'), tokenValidation.token, validate(productValidation.updateProduct), productController.updateProduct)
  .delete(auth('manageProducts'), tokenValidation.token, validate(productValidation.deleteProduct), productController.deleteProduct);
module.exports = router;