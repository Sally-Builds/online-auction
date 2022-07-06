const axios = require('axios');
const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.depositFunds = async (req, res, next) => {
  try {
    // console.log(req.user);
    const data = {
      tx_ref: Date.now(),
      amount: req.body.funds,
      currency: 'NGN',
      //   redirect_url: `${req.protocol}://${req.get('host')}/#/${
      //     req.user.role === 'admin' ? 'dashboard/admin' : 'dashboard'
      //   }`,
      redirect_url: `http://localhost:8080/deposit`,
      payment_options: 'card',
      customer: {
        email: req.user.email,
        // phonenumber: '080****4528',
        name: req.user.name,
      },
      meta: {
        dues: 'due._id',
      },
      customizations: {
        title: 'BidReaper Inc',
        description: `Fund Deposit`,
        logo: 'https://assets.piedpiper.com/logo.png',
      },
    };
    const result = await axios({
      method: 'POST',
      url: 'https://api.flutterwave.com/v3/payments',
      data,
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET}`,
      },
    });
    res.status(200).json({
      status: 'success',
      data: result.data,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: 'fail',
      data: 'Something went wrong',
    });
  }
};

exports.createPayment = catchAsync(async (req, res, next) => {
  try {
    const result = await axios({
      method: 'GET',
      url: `https://api.flutterwave.com/v3/transactions/${req.body.transaction_id}/verify`,
      headers: {
        Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET}`,
      },
    });
    //verify that the response with tx_ref and status and user
    const { data } = result.data;
    if (data.status !== req.body.status && data.tx_ref !== req.body.tx_ref) {
      return next(
        new AppError('Transaction not successful. Try again later', 404)
      );
    }
    console.log(data);
    //get user with the transaction email
    const user = await User.findOne({ email: data.customer.email });
    if (!user) {
      return next(new AppError('No user found', 404));
    }

    //prevent duplicate transaction by checking if tx_ref already exists
    const check = await Transaction.findOne({
      tx_ref: req.body.tx_ref,
      user: user.id,
    });
    if (check) {
      return next(new AppError('Duplicate Transaction', 404));
    }
    const transaction = Transaction.create({
      amount: data.amount,
      type: 'deposit',
      user: user.id,
      tx_ref: req.body.tx_ref,
    });
    await User.findByIdAndUpdate(
      user.id,
      {
        $inc: { balance: data.amount },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(transaction);
    res.status(201).json({
      status: 'success',
      data: 'Account Credited',
    });
  } catch (e) {
    res.status(400).json({
      status: 'fail',
      data: e,
    });
  }
});
