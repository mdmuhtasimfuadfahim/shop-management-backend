const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { productService } = require('../services');
const { success } = require('../utils/ApiResponse');

const addProduct = catchAsync(async (req, res) => {
  const product = await productService.addProduct(req.body);
  res.status(httpStatus.CREATED).send(success(product, 'Successfully added a product'));
});

const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'price']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productService.queryProducts(filter, options);
  res.status(httpStatus.OK).send(success(result, 'Successfully retrieved products'));
});

const getProduct = catchAsync(async (req, res) => {
  const product = await productService.getProductBySKU(req.params.sku);
  if (!product) {
    throw new ApiError(5003, 'Product not found');
  }
  res.status(httpStatus.OK).send(success(product, `Successfully retrieved product with SKU ${req.params.sku}`));
});

const updateProduct = catchAsync(async (req, res) => {
  const product = await productService.updateProductBySKU(req.params.sku, req.body);
  res.status(httpStatus.OK).send(success(product, `Successfully updated product with SKU ${req.params.sku}`));
});

const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductBySKU(req.params.sku);
  res.status(httpStatus.NO_CONTENT).send(success());
});

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
