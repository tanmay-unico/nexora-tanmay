const checkoutService = require('../services/checkoutService');

const submitCheckout = async (req, res) => {
  const { name, email } = req.body || {};
  const receipt = await checkoutService.submitOrder({ name, email });
  res.json(receipt);
};

module.exports = {
  submitCheckout,
};

