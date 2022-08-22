const httpStatus = require('http-status');
const pick = require('../utils/pick');
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
  res.status(httpStatus.CREATED).send(success(order, `Successfully get order by id ${req.params.orderId}`));
});

const getAllOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['product']);
  const option = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderService.queryOrders(filter, option);
  res.status(httpStatus.OK).send(success(result, 'Successfully retrieved orders'));
});

const updateOrder = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderById(req.params.orderId, req.body);
  res.status(httpStatus.OK).send(success(order, `Successfully updated order by id ${req.params.orderId}`));
});

const deleteOrder = catchAsync(async (req, res) => {
  const order = await orderService.deleteOrderById(req.params.orderId);
  res.status(httpStatus.NO_CONTENT).send(success(order, `Successfully deleted order by id ${req.params.orderId}`));
});

module.exports = {
  addOrder,
  getOrders,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
