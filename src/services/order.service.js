const httpStatus = require('http-status');
const { nanoid } = require('nanoid');
const { Product, Category, Inventory, Invoice, Order, Balance } = require('../models');
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
    return order;
  } catch (error) {
    throw new ApiError(8001, 'Cannot add order');
  }
};

/**
 * Get orders by buyer id
 * @param {string} id
 * @returns {Promise<Order>}
 */
 const getOrders = async (id) => {
  try {
    return Order.find({ buyer: id }, null, { sort: { 'createdAt': -1 }}).populate(['product']);
  } catch (error) {
    throw new ApiError(8002, 'Cannot get orders', error);
  }
};

/**
 * Get order by order id
 * @param {string} id
 * @returns {Promise<Order>}
 */
 const getOrderById = async (orderId) => {
  try {
    return Order.findOne({ _id: orderId }).populate(['product', 'buyer']);
  } catch (error) {
    throw new ApiError(8003, `Cannot get order by id ${orderId}`, error);
  }
};

/**
 * Query for orders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
 const queryOrders = async (filter, options) => {
  try {
    const orders = await Order.paginate(filter, options);
    return orders;
  } catch (error) {
    throw new ApiError(8004, 'Cannot get customer orders by pagination', error);
  }
};

/**
 * Update order by id
 * @param {ObjectId} orderId
 * @param {Object} updateBody
 * @returns {Promise<Order>}
 */
 const updateOrderById = async (orderId, updateBody) => {
  try {
    const order = await getOrderById(orderId);
    if (!order) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }

    const inventory = await getInventoryByProductId(order.product._id);
    if (!inventory) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Inventory not found');
    }

    let total = 0;
    if(order.quantity > inventory.quantity) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Not enough inventory');
    } else {
      total = (inventory.quantity - order.quantity);
    }
    const updateInventory = await updateInventoryById(inventory.id, total);

    Object.assign(order, updateBody);
    await order.save();
    let data = {
      orderId: order.orderId,
      status: order.status
    }
    await PublishEvent(RegisteredTopics.CUSTOMER, RegisteredEvents.UPDATE_ORDER_STATUS, data);

    const balanceData = new Balance({ balance: order.price, orderId: order._id });
    const balance = await balanceData.save();
    return { order, updateInventory, balance };
  } catch (error) {
    throw new ApiError(8005, `Cannot update order by id ${orderId}`);
  }
};

/**
 * Delete order by id
 * @param {ObjectId} orderId
 * @returns {Promise<Order>}
 */
 const deleteOrderById = async (orderId) => {
  try {
    const order = await getOrderById(orderId);
    if (!order) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
    }
    await order.remove();
    return order;
  } catch (error) {
    throw new ApiError(8006, `Cannot delete order by id ${orderId}`);
  }
};

module.exports = {
  addOrder,
  getOrders,
  getOrderById,
  queryOrders,
  updateOrderById,
  deleteOrderById,
};
