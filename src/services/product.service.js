const httpStatus = require('http-status');
const { Product, Category, Inventory, Invoice } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Get category by name
 * @param {string} name
 * @returns {Promise<Category>}
 */
 const getCategoryByName = async (name) => {
  return Category.findOne({ name });
};

/**
 * Get product by name
 * @param {string} name
 * @returns {_id}
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
 * Generate random SKU
 * @param {number} length
 * @returns {Promise<Result>}
 */
function generateSKU(length) {
  var result  = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}

/**
 * Create a product
 * @param {Object} productBody
 * @returns {Promise<Product>}
 */
const addProduct = async (productBody) => {
  try {
    let category;
    let inventory;
    let product;

    if (await Category.isCategoryExists(productBody.categoryName)) {
      category = await getCategoryByName(productBody.categoryName);
    } else {
      category = await Category.create({ name: productBody.categoryName });
    }

    if (await Product.isProductExists(productBody.productName)) {
      product = await getProductByName(productBody.productName);
      const findInventory = await getInventoryByProductId(product._id);
      let total = parseInt(findInventory.quantity, 10) + parseInt(productBody.quantity, 10);
      if(product.price !== productBody.price) {
        product = await updateProductById(product._id, productBody.price);
        inventory = await updateInventoryById(findInventory._id, total);
      } else {
        inventory = await updateInventoryById(findInventory._id, total);
      }
    } else {
      product = await Product.create({ sku: generateSKU(6), name: productBody.productName, price: productBody.price, category: category._id});
      inventory = await Inventory.create({ product: product._id, quantity: productBody.quantity });
    }

    const invoice = await Invoice.create({ product: product._id, inventory: inventory._id, type: "inventory" });
    return { category, product, inventory, invoice };
  } catch (error) {
    console.log(error);
    throw new ApiError(5001, 'Something went wrong');
  }
};

/**
 * Query for products
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
 const queryProducts = async (filter, options) => {
  try {
    const products = await Product.paginate(filter, options);
    return products;
  } catch (error) {
    throw new ApiError(5002, 'Product retrieve error');
  }
};

/**
 * Get prodcut by sku
 * @param {number} SKU
 * @returns {Promise<Product>}
 */
 const getProductBySKU = async (id) => {
  return Product.findOne({ sku: id });
};


/**
 * Update product by sku
 * @param {Number} SKU
 * @param {Object} updateBody
 * @returns {Promise<Product>}
 */
const updateProductBySKU = async (sku, updateBody) => {
  try {
    const product = await getProductBySKU(sku);
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    if (updateBody.name && (await Product.isProductExists(updateBody.name, sku))) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Product name already taken');
    }
    Object.assign(product, updateBody);
    await product.save();
    return product;
  } catch (error) {
    throw new ApiError(5004, `Cannot update prodcut by sku ${sku}`);
  }
};

/**
 * Delete product by sku
 * @param {Number} sku
 * @returns {Promise<Product>}
 */
const deleteProductBySKU = async (sku) => {
  try {
    const product = await getProductBySKU(sku);
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product not found');
    }
    await product.remove();
    return product;
  } catch (error) {
    throw new ApiError(5005, `Cannot delete product by sku ${sku}`);
  }
};

module.exports = {
  addProduct,
  queryProducts,
  getProductBySKU,
  updateProductBySKU,
  deleteProductBySKU,
};
