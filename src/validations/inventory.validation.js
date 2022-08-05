const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getInventories = {
  query: Joi.object().keys({
    product: Joi.string().custom(objectId).optional(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getInventory = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const updateInventory = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      quantity: Joi.number().integer().required(),
    })
};

module.exports = {
  getInventories,
  getInventory,
  updateInventory,
};

