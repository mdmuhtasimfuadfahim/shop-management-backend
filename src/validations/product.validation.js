const Joi = require('joi');

const addProduct = {
  body: Joi.object().keys({
    categoryName: Joi.string().required(),
    productName: Joi.string().required(),
    price: Joi.number().integer(),
    quantity: Joi.number().integer(),
  }),
};

const getProducts = {
  query: Joi.object().keys({
    name: Joi.string(),
    price: Joi.number().integer(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getProduct = {
  params: Joi.object().keys({
    sku: Joi.string(),
  }),
};

const updateProduct = {
  params: Joi.object().keys({
    sku: Joi.string(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      price: Joi.number().integer(),
    })
    .min(1),
};

const deleteProduct = {
  params: Joi.object().keys({
    sku: Joi.string(),
  }),
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};

