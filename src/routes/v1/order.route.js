const express = require('express');
const validate = require('../../middlewares/validate');
const tokenValidation = require('../../validations/token.validation');
const orderValidation = require('../../validations/order.validation');
const orderController = require('../../controllers/order.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth('addOrder'), tokenValidation.token, validate(orderValidation.addOrder), orderController.addOrder)
  .get(auth('getOrder'), tokenValidation.token, orderController.getOrders);

router
  .route('/:orderId')
  .get(auth('getOrder'), tokenValidation.token, validate(orderValidation.getOrderById), orderController.getOrderById);

module.exports = router;