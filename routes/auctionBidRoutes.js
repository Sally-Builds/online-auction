const express = require('express');
const auctionBidController = require('../controller/auctionBidController');
const authController = require('../controller/authController');

const router = express.Router();

router.use(authController.protect);

// router.use(authController.restrictTo('admin'))
// router.route('/reversebids/:id').post(auctionBidController.reverseBids);

router.route('/').post(auctionBidController.createBid);
router.route('/').get(auctionBidController.getBids);
module.exports = router;
