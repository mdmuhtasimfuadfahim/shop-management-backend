const mongoose = require('mongoose');
const { status } = require('../config/status');
const { toJSON, paginate } = require('./plugins');

const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    product:{
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    buyer: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: status,
      default: status.Pending.valueOf(),
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);


/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
