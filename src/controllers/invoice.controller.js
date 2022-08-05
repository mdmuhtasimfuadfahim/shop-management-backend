const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { invoiceService } = require('../services');
const { success } = require('../utils/ApiResponse');

const getInvoices = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['product name', 'inventory name']);
  const option = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await invoiceService.queryInvoice(filter, option);
  res.status(httpStatus.OK).send(success(result, 'Successfully retrieved invoices'));
});

const getInvoice = catchAsync(async (req, res) => {
  const invoice = await invoiceService.getInvoiceByType(req.params.type);
  if (!invoice) {
    throw new ApiError(7002, 'Invoice not found');
  }
  res.status(httpStatus.OK).send(success(invoice, `Successfully retrieved invoice by type ${req.params.type}`));
});

const getInvoiceByDate = catchAsync(async (req, res) => {
  const inventory = await invoiceService.getInvoicesBetweenDates(req.params);
  if (!inventory) {
    throw new ApiError(7003, 'Inventory not found');
  }
  res.status(httpStatus.OK).send(success(inventory, `Successfully retrieved invoice between ${req.params.gte} to ${req.params.lte}`));
});


module.exports = {
  getInvoices,
  getInvoice,
  getInvoiceByDate,
};
