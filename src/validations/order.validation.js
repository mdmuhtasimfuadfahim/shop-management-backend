const Joi = require('joi');
const { objectId } = require('./custom.validation');

const addOrder = {
  body: Joi.object().keys({
    productName: Joi.string().required(),
    quantity: Joi.number().integer(),
  }),
};

const getOrderById = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId).required(),
  }),
};

const getAllOrders = {
  query: Joi.object().keys({
    product: Joi.string().custom(objectId).optional(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateOrder = {
  params: Joi.object().keys({
    orderId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      status: Joi.string().required(),
    }),
};

module.exports = {
  addOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
};

