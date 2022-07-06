const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Please you must place a bid'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Deposit = mongoose.model('Deposit', depositSchema);

module.exports = Deposit;
