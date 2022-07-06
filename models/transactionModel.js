const mongoose = require('mongoose');
// const User = require('./userModel');

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Please enter an amount.'],
    },
    type: {
      type: String,
      enum: ['deposit', 'withdraw'],
      required: [true, 'you must include to type of transaction.'],
    },
    tx_ref: {
      type: String,
      required: [true, 'you must include transaction ref.'],
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

// transactionSchema.statics.calculateBalance = async function (user) {
//   const deposit = await this.aggregate([
//     {
//       $match: { user, type: 'deposit' },
//     },
//   ]);
//   const withdraw = await this.aggregate([
//     {
//       $match: { user, type: 'withdraw' },
//     },
//   ]);
//   let depositAmount = 0;
//   let withdrawAmount = 0;
//   if (deposit.length > 0) {
//     deposit.forEach((e) => {
//       depositAmount += e.amount;
//     });
//   }
//   if (withdraw.length > 0) {
//     withdraw.forEach((e) => {
//       withdrawAmount += e.amount;
//     });
//   }
//   console.log(depositAmount, 'deposit');
//   const amount = depositAmount - withdrawAmount;
//   await User.findByIdAndUpdate(user, { balance: amount });
//   console.log(amount, 'total');
// };

// transactionSchema.post('save', function () {
//   this.constructor.calculateBalance(this.user);
// });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
