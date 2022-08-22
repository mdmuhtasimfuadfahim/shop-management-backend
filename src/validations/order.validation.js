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

module.exports = {
  addOrder,
  getOrderById,
};

