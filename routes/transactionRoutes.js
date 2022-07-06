const express = require('express');
const transactionController = require('../controller/transactionController');
const authController = require('../controller/authController');

const router = express.Router();
router.use(authController.protect);

router.route('/deposit').post(transactionController.depositFunds);
router.route('/payments').post(transactionController.createPayment);

module.exports = router;
