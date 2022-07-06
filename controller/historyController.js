const Transaction = require('../models/transactionModel');
// const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

//create history
exports.createHistory = catchAsync(async (req, res, next) => {
  const newTransaction = await Transaction.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      newTransaction,
    },
  });
});

//Get all Blog
exports.getAllTransactions = catchAsync(async (req, res, next) => {
  const transactions = Transaction.find({ user: req.user.id });
  res.status(200).json({
    status: 'success',
    results: transactions.length,
    data: {
      transactions,
    },
  });
});
