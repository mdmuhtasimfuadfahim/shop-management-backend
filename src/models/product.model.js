const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productSchema = mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category',
      required: true,
    },
    price: {
      type: Number,
      default: 0
    },
    dateAdded: {
      type: Date,
      default: Date.now
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * Check if name is taken
 * @param {string} name - The product's name
 * @param {ObjectId} [excludeProductId] - The id of the product to be excluded
 * @returns {Promise<boolean>}
 */
productSchema.statics.isProductExists = async function (name, excludeProductId) {
  const product = await this.findOne({ name, _id: { $ne: excludeProductId } });
  return !!product;
};


/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
