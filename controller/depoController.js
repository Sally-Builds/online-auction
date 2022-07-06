const { pusher } = require('../utils/pusher');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const AuctionBid = require('../models/auctionBidModel');
const Product = require('../models/productModel');

exports.createBid = catchAsync(async (req, res, next) => {
  // try {
  let product = await Product.findById(req.body.product);
  //   if (req.body.amount * 1 < product.startingBid * 1) {
  //     return next(
  //       new AppError('Must be greater than starting bid or winning bid', 404)
  //     );
  //   }
  //   if (req.body.amount * 1 <= product.winningBid * 1) {
  //     return next(
  //       new AppError('Must be greater than starting bid or winning bid', 404)
  //     );
  //   }

  const hasBidded = await AuctionBid.findOne({
    user: req.body.user,
    product: req.body.product,
  });
  if (hasBidded) {
    if (req.body.amount * 1 < product.minBidInc * 1) {
      return next(
        new AppError('Must be greater than the minimum bid increament', 404)
      );
    }
    await AuctionBid.findByIdAndUpdate(
      hasBidded.id,
      {
        $inc: { amount: req.body.amount },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  } else {
    if (req.body.amount * 1 < product.startingBid * 1) {
      return next(
        new AppError('Must be greater than starting bid or winning bid', 404)
      );
    }
    if (req.body.amount * 1 <= product.winningBid * 1) {
      return next(
        new AppError('Must be greater than starting bid or winning bid', 404)
      );
    }
    await AuctionBid.create(req.body);
  }
  await Product.findByIdAndUpdate(
    req.body.product,
    {
      winningBid: req.body.amount,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  product = await Product.findById(req.body.product).populate('auctionBids');
  console.log(product);
  pusher.trigger('my-channel', 'my-event', {
    product,
  });
  res.status(200).json({
    status: 'success',
  });
  // } catch (e) {
  //   console.log(e);
  //   res.status(400).json({
  //     error: e,
  //   });
  // }
});
