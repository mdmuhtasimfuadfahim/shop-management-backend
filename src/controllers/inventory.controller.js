const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { inventoryService } = require('../services');
const { success } = require('../utils/ApiResponse');

const getInventories = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['product name']);
  const option = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await inventoryService.queryInventory(filter, option);
  res.status(httpStatus.OK).send(success(result, 'Successfully retrieved inventories'));
});

const getInventory = catchAsync(async (req, res) => {
  const inventory = await inventoryService.getInventoryById(req.params.id);
  if (!inventory) {
    throw new ApiError(6002, 'Inventory not found');
  }
  res.status(httpStatus.OK).send(success(inventory, `Successfully retrieved inventory by id ${req.params.id}`));
});

const updateInventory = catchAsync(async (req, res) => {
  const product = await inventoryService.updateInventoryById(req.params.id, req.body);
  res.status(httpStatus.OK).send(success(product, `Successfully updated inventory by id ${req.params.id}`));
});

module.exports = {
  getInventories,
  getInventory,
  updateInventory,
};
