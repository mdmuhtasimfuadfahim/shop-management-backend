const express = require('express');
const validate = require('../../middlewares/validate');
const tokenValidation = require('../../validations/token.validation');
const invoiceValidation = require('../../validations/invoice.validation');
const invoiceController = require('../../controllers/invoice.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .get(auth('getInvoice'), tokenValidation.token, validate(invoiceValidation.getInvoices), invoiceController.getInvoices);

router
  .route('/:type')
  .get(auth('getInvoice'), tokenValidation.token, validate(invoiceValidation.getInvoice), invoiceController.getInvoice);

router
  .route('/:gte/:lte')
  .get(auth('getInvoice'), tokenValidation.token, invoiceController.getInvoiceByDate);

module.exports = router;