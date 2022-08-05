const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getInvoices = {
  query: Joi.object().keys({
    product: Joi.string().custom(objectId).optional(),
    inventory: Joi.string().custom(objectId).optional(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getInvoice = {
  params: Joi.object().keys({
    type: Joi.string().required(),
  }),
};


module.exports = {
  getInvoices,
  getInvoice,
};

