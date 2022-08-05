const mongoose = require('mongoose');
const { v4: uuid4 } = require('uuid')
const { toJSON, paginate } = require('./plugins');

const invoiceSchema = mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true,
      unique: true,
      default: uuid4(),
    },
    product:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Product',
      required: true,
    },
    inventory: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Inventory',
    },
    type: {
      type: String,
      default: 0
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
invoiceSchema.plugin(toJSON);
invoiceSchema.plugin(paginate);


/**
 * @typedef Invoice
 */
const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
