const { all, get, run } = require('../db/connection');

const cartItemSelect = `
  SELECT c.id, c.quantity, p.id as productId, p.name, p.price, p.imageUrl, p.description
  FROM cart_items c
  JOIN products p ON c.product_id = p.id
`;

const listCartItems = () => all(`${cartItemSelect} ORDER BY c.id`);

const findCartItemByProductId = (productId) =>
  get('SELECT * FROM cart_items WHERE product_id = ?', [productId]);

const findCartItemById = (id) => get('SELECT * FROM cart_items WHERE id = ?', [id]);

const insertCartItem = (productId, quantity) =>
  run('INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)', [productId, quantity]);

const updateCartItemQuantity = (id, quantity) =>
  run('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, id]);

const deleteCartItem = (id) => run('DELETE FROM cart_items WHERE id = ?', [id]);

const clearCart = () => run('DELETE FROM cart_items');

module.exports = {
  listCartItems,
  findCartItemByProductId,
  findCartItemById,
  insertCartItem,
  updateCartItemQuantity,
  deleteCartItem,
  clearCart,
};

