const express = require('express');
const validate = require('../../middlewares/validate');
const tokenValidation = require('../../validations/token.validation');
const inventoryValidation = require('../../validations/inventory.validation');
const inventoryController = require('../../controllers/inventory.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth('getInventory'), tokenValidation.token, validate(inventoryValidation.getInventories), inventoryController.getInventories);

router
  .route('/:id')
  .get(auth('getInventory'), tokenValidation.token, validate(inventoryValidation.getInventory), inventoryController.getInventory)
  .patch(auth('manageProducts'), tokenValidation.token, validate(inventoryValidation.updateInventory), inventoryController.updateInventory)

module.exports = router;