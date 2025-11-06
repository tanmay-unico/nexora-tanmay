const express = require('express');

const asyncHandler = require('../utils/asyncHandler');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.get('/', asyncHandler(cartController.getCart));
router.post('/', asyncHandler(cartController.upsertCartItem));
router.delete('/:id', asyncHandler(cartController.deleteCartItem));

module.exports = router;

