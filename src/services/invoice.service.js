const { Invoice } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query for invocies
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
 const queryInvoice = async (filter, option) => {
  try {
    var options = { filter: filter, sort: option.sortBy, populate: 'product', page: option.page, limit: option.limit };
    const invoices = await Invoice.paginate({}, options);
    return invoices;
  } catch (error) {
    throw new ApiError(7001, 'Invoices retrieve error');
  }
};

/**
 * Get invoice by type
 * @param {ObjectId} type
 * @returns {Promise<Invoice>}
 */
 const getInvoiceByType = async (type) => {
  return Invoice.findOne({ type: type }).populate(['product', 'inventory']);
};

/**
 * Get invoice between two dates
 * @param {ObjectId} dates
 * @returns {Promise<Invoice>}
 */
 const getInvoicesBetweenDates = async (dates) => {
    return await Invoice.find({
      date: {
        $gte: new Date(dates.gte).toISOString(),
        $lte: new Date(dates.lte).toISOString(),
      }
    });
};

module.exports = {
  queryInvoice,
  getInvoiceByType,
  getInvoicesBetweenDates,
};
