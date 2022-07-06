const mongoose = require('mongoose');

const auctionBidSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Please you must place a bid'],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now(),
    //   select: false,
    // },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

auctionBidSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '-__v',
  });
  next();
});

const AuctionBid = mongoose.model('AuctionBid', auctionBidSchema);

module.exports = AuctionBid;
