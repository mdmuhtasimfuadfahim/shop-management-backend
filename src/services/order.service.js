const httpStatus = require('http-status');
const { nanoid } = require('nanoid');
const { Product, Category, Inventory, Invoice, Order } = require('../models');
const ApiError = require('../utils/ApiError');
const RegisteredEvents = require('../kafka/config/RegisteredEvents');
const RegisteredTopics = require('../kafka/config/RegisteredTopics');
const PublishEvent = require('../kafka/PublishEvent');

/**
 * Get product by name
 * @param {string} name
 * @returns {Promise<Product>}
 */
 const getProductByName = async (name) => {
  return await Product.findOne({ name });
};

/**
 * Get inventory by product id
 * @param {string} id
 * @returns {Promise<Inventory>}
 */
 const getInventoryByProductId = async (id) => {
  return Inventory.findOne({ product: id });
};

/**
 * Update inventory by id
 * @param {string} id
 * @returns {Promise<Inventory>}
 */
 const updateInventoryById = async (id, total) => {
  return Inventory.findByIdAndUpdate(id, { quantity: total });
};

/**
 * Update product by id
 * @param {string} id
 * @returns {Promise<Product>}
 */
 const updateProductById = async (id, price) => {
  return Product.findByIdAndUpdate(id, { price: price });
};


/**
 * Create a product
 * @param {Object} orderBody
 * @param {ObjectId} id
 * @returns {Promise<Product>}
 */
const addOrder = async (orderBody, id) => {
  try {
    const product = await getProductByName(orderBody.productName);
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }

    const inventory = await getInventoryByProductId(product._id);
    if (!inventory) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Inventory not found');
    } else if (inventory.quantity < orderBody.quantity) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Not enough inventory');
    }

    const order = Order.create({
      orderId: nanoid(10),
      product: product._id,
      quantity: orderBody.quantity,
      price: product.price * orderBody.quantity,
      buyer: id,
    });

    const kafka = await PublishEvent(RegisteredTopics.ADMIN, RegisteredEvents.ADD_ORDER, order);
    console.log(kafka);
    return order;
  } catch (error) {
    throw new ApiError(8001, 'Cannot add order');
  }
};


module.exports = {
  addOrder,
};
