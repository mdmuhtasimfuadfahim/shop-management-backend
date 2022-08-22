const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');
const { success } = require('../utils/ApiResponse');

const addOrder = catchAsync(async (req, res) => {
  const order = await orderService.addOrder(req.body, req.userData.sub);
  res.status(httpStatus.CREATED).send(success(order, 'Successfully placed a new order'));
});

const getOrders = catchAsync(async (req, res) => {
  const order = await orderService.getOrders(req.userData.sub);
  res.status(httpStatus.CREATED).send(success(order, 'Successfully get orders'));
});

const getOrderById = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.orderId);
  res.status(httpStatus.CREATED).send(success(order, `Successfully get order with id ${req.params.orderId}`));
});

module.exports = {
  addOrder,
  getOrders,
  getOrderById,
};
