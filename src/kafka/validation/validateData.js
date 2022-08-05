/* eslint-disable prettier/prettier */
const RegisteredEvents = require('../config/RegisteredEvents');
const ApiError = require('../../utils/ApiError');

const validateData = (event, data) => {
  switch (event) {
      case RegisteredEvents.ADD_ORDER:
      if (!data.orderId) {
        throw new ApiError(0, 'Order ID is required');
      }
      if (!data.status) {
        throw new ApiError(0, 'No status found');
      }
      if (!data.product) {
        throw new ApiError(0, 'Product ID is required');
      }
      if (!data.quantity) {
        throw new ApiError(0, 'Quantity is required');
      }
      if (!data.price) {
        throw new ApiError(0, 'Price is required');
      }
      if (!data.buyer) {
        throw new ApiError(0, 'Buyer ID is required');
      }
      if (!data.isPaid) {
        throw new ApiError(0, 'Payment status is required');
      }
      break;
    case RegisteredEvents.UPDATE_ORDER_STATUS:
      if (!data.orderId) {
        throw new ApiError(0, 'Order ID is required');
      }
      if (!data.status) {
        throw new ApiError(0, 'Order status id is required');
      }
      break;
    default:
      throw new ApiError(0, 'No registered event found');
  }
}

module.exports = validateData;