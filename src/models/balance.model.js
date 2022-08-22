const mongoose = require('mongoose');
const { status } = require('../config/status');
const { toJSON, paginate } = require('./plugins');

const balanceSchema = mongoose.Schema(
  {
    balance:{
      type: Number,
      required: true,
      default: 0
    },
    status: {
      type: String,
      enum: status,
      default: 'pending',
    },
    orderId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Order',
      required: true,
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
balanceSchema.plugin(toJSON);
balanceSchema.plugin(paginate);


/**
 * @typedef Balance
 */
const Balance = mongoose.model('Balance', balanceSchema);

module.exports = Balance;
