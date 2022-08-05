const Joi = require('joi');

const addOrder = {
  body: Joi.object().keys({
    productName: Joi.string().required(),
    quantity: Joi.number().integer(),
  }),
};

module.exports = {
  addOrder,
};

