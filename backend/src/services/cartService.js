const cartRepository = require('../repositories/cartRepository');
const productService = require('./productService');

const buildCartSummary = (items) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return {
    items: items.map((item) => ({
      id: item.id,
      productId: item.productId,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      description: item.description,
      quantity: item.quantity,
      lineTotal: parseFloat((item.price * item.quantity).toFixed(2)),
    })),
    total: parseFloat(total.toFixed(2)),
  };
};

const fetchCart = async () => {
  const items = await cartRepository.listCartItems();
  return buildCartSummary(items);
};

const addOrUpdateItem = async ({ productId, quantity }) => {
  if (!productId || Number.isNaN(Number(quantity)) || quantity < 1) {
    const error = new Error('productId and quantity (>=1) are required.');
    error.status = 400;
    throw error;
  }

  const product = await productService.getProductById(productId);
  if (!product) {
    const error = new Error('Product not found.');
    error.status = 404;
    throw error;
  }

  const existing = await cartRepository.findCartItemByProductId(productId);
  const wasNew = !existing;

  if (existing) {
    await cartRepository.updateCartItemQuantity(existing.id, quantity);
  } else {
    await cartRepository.insertCartItem(productId, quantity);
  }

  const [updated] = (await cartRepository.listCartItems()).filter(
    (item) => item.productId === productId
  );

  return {
    wasNew,
    item: {
      id: updated.id,
      productId: updated.productId,
      name: updated.name,
      price: updated.price,
      imageUrl: updated.imageUrl,
      description: updated.description,
      quantity: updated.quantity,
      lineTotal: parseFloat((updated.price * updated.quantity).toFixed(2)),
    },
  };
};

const removeItem = async (cartItemId) => {
  const existing = await cartRepository.findCartItemById(cartItemId);
  if (!existing) {
    const error = new Error('Cart item not found.');
    error.status = 404;
    throw error;
  }

  await cartRepository.deleteCartItem(cartItemId);
};

const emptyCart = () => cartRepository.clearCart();

module.exports = {
  fetchCart,
  addOrUpdateItem,
  removeItem,
  emptyCart,
};

