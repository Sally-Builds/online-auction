/* eslint-disable no-await-in-loop */
const schedule = require('node-schedule');
const moment = require('moment');
const { pusher } = require('../utils/pusher');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const AuctionBid = require('../models/auctionBidModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');

exports.createBid = catchAsync(async (req, res, next) => {
  // try {
  //check if bidder's bid is within the range of what his balance is
  if (req.body.amount > req.user.balance) {
    return next(new AppError('You do not have sufficient funds', 404));
  }
  //check if amount is less than starting bid
  let product = await Product.findById(req.body.product);
  const previousBid = product.winningBid;
  if (req.body.amount * 1 < product.startingBid * 1) {
    return next(
      new AppError('Must be greater than starting bid or winning bid', 404)
    );
  }
  //check if amouint is less than winning bid
  if (req.body.amount * 1 < product.winningBid * 1) {
    return next(
      new AppError('Must be greater than starting bid or winning bid', 404)
    );
  }
  //check if user has bidded for that auction
  const hasBidded = await AuctionBid.findOne({
    user: req.body.user,
    product: req.body.product,
  });
  //if user has bidded update the amount
  let auctionBid;
  if (hasBidded) {
    auctionBid = await AuctionBid.findByIdAndUpdate(
      hasBidded.id,
      {
        amount: req.body.amount,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    //if user has'nt bidded create new amount
  } else {
    auctionBid = await AuctionBid.create(req.body);
  }

  //check if bid is from the same user
  let isSameUser = 0;
  product = await Product.findById(req.body.product).populate('auctionBids');
  // eslint-disable-next-line eqeqeq
  if (auctionBid.user.id == product.user) {
    isSameUser = 1;
  }
  // debit the current/latest bidder
  if (isSameUser === 1) {
    const amountToDec = auctionBid.amount - previousBid;
    await User.findByIdAndUpdate(
      auctionBid.user,
      {
        $inc: { balance: -amountToDec },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } else {
    await User.findByIdAndUpdate(
      auctionBid.user,
      {
        $inc: { balance: -auctionBid.amount },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  // update/change the winning bid to the current bid
  await Product.findByIdAndUpdate(
    req.body.product,
    {
      winningBid: req.body.amount,
      user: req.body.user,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  // product = await Product.findById(req.body.product).populate('auctionBids');

  //reverse the previous bid
  if (isSameUser === 0) {
    const sortedArr = product.auctionBids.sort(
      (a, b) => b.updatedAt - a.updatedAt
    );
    if (sortedArr.length > 1) {
      const user = await User.findByIdAndUpdate(
        sortedArr[1].user._id,
        {
          $inc: { balance: sortedArr[1].amount },
        },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!user)
        return next(new AppError('Something went terribly wrong', 404));
    }
  }
  pusher.trigger('my-channel', 'my-event', {
    product,
  });
  res.status(200).json({
    status: 'success',
  });
});

exports.getBids = catchAsync(async (req, res, next) => {
  const myBids = await AuctionBid.find({ user: req.user.id }).populate(
    'product'
  );
  console.log(myBids);
  res.status(200).json({
    status: 'success',
    data: { myBids },
  });
});

const updateProductStatus = async (id, status) => {
  await Product.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
      runValidators: true,
    }
  );
};

exports.SystemSchedule = async () => {
  try {
    schedule.scheduleJob('* * * * * ', async () => {
      try {
        const products = await Product.find();
        // eslint-disable-next-line no-restricted-syntax
        for (const product of products) {
          if (
            moment() >= moment(product.startTime) &&
            moment() <= moment(product.endTime)
          ) {
            if (product.status !== 'ongoing') {
              //update product.status to ongoing
              await updateProductStatus(product.id, 'ongoing');
            }
          }
          //check if auction has ended
          if (moment() > moment(product.endTime)) {
            //update status to finished and send mail to winner
            await updateProductStatus(product.id, 'finished');
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
  } catch (e) {
    console.log(e);
  }
};
