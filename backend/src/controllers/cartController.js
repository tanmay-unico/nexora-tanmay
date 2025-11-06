const cartService = require('../services/cartService');

const getCart = async (_req, res) => {
  const cart = await cartService.fetchCart();
  res.json(cart);
};

const upsertCartItem = async (req, res) => {
  const { productId, qty } = req.body || {};
  const { item, wasNew } = await cartService.addOrUpdateItem({
    productId,
    quantity: parseInt(qty, 10),
  });
  res.status(wasNew ? 201 : 200).json(item);
};

const deleteCartItem = async (req, res) => {
  const { id } = req.params;
  await cartService.removeItem(Number(id));
  res.status(204).send();
};

module.exports = {
  getCart,
  upsertCartItem,
  deleteCartItem,
};

