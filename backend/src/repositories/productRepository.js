const { all, get } = require('../db/connection');

const listProducts = () => all('SELECT * FROM products ORDER BY id');

const findProductById = (id) => get('SELECT * FROM products WHERE id = ?', [id]);

module.exports = {
  listProducts,
  findProductById,
};

