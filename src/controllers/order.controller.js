const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { orderService } = require('../services');
const { success } = require('../utils/ApiResponse');

const addOrder = catchAsync(async (req, res) => {
  const order = await orderService.addOrder(req.body, req.userData.sub);
  res.status(httpStatus.CREATED).send(success(order, 'Successfully added a product'));
});

module.exports = {
  addOrder,
};
