const express = require('express');

const asyncHandler = require('../utils/asyncHandler');
const checkoutController = require('../controllers/checkoutController');

const router = express.Router();

router.post('/', asyncHandler(checkoutController.submitCheckout));

module.exports = router;

