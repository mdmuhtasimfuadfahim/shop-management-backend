const httpStatus = require('http-status');
const { Inventory } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for inventories
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
 const queryInventory = async (filter, option) => {
  try {
    var options = { filter: filter, sort: option.sortBy, populate: 'product', path: 'product', populate: 'product.category', page: option.page, limit: option.limit };
    const inventories = await Inventory.paginate({}, options);
    return inventories;
  } catch (error) {
    throw new ApiError(6001, 'Inventories retrieve error');
  }
};

/**
 * Get inventory by id
 * @param {ObjectId} id
 * @returns {Promise<Inventory>}
 */
 const getInventoryById = async (id) => {
  return Inventory.findOne({ _id: id }).populate(['product', { path: 'product', populate: { path: 'category' } }]);
};


/**
 * Update inventory by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Inventory>}
 */
const updateInventoryById = async (id, updateBody) => {
  try {
    const inventory = await getInventoryById(id);
    if (!inventory) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Inventory not found');
    }
    Object.assign(inventory, updateBody);
    await inventory.save();
    return inventory;
  } catch (error) {
    throw new ApiError(6003, `Cannot update invenotyr by id ${id}`);
  }
};

module.exports = {
  queryInventory,
  getInventoryById,
  updateInventoryById,
};
