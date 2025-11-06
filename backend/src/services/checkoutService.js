const cartService = require('./cartService');
const orderRepository = require('../repositories/orderRepository');

const submitOrder = async ({ name, email }) => {
  if (!name || !email) {
    const error = new Error('Name and email are required for checkout.');
    error.status = 400;
    throw error;
  }

  const cart = await cartService.fetchCart();

  if (!cart.items.length) {
    const error = new Error('Cart is empty.');
    error.status = 400;
    throw error;
  }

  const createdAt = new Date().toISOString();

  const { id: orderId } = await orderRepository.createOrder({
    name,
    email,
    total: cart.total,
    createdAt,
    payload: cart,
  });

  await cartService.emptyCart();

  return {
    orderId,
    name,
    email,
    total: cart.total,
    createdAt,
    items: cart.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),
    message: 'Checkout successful. Cart has been cleared.',
  };
};

module.exports = {
  submitOrder,
};

