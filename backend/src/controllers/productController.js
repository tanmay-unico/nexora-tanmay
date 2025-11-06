const productService = require('../services/productService');

const getProducts = async (_req, res) => {
  const products = await productService.getCatalogue();
  res.json(products);
};

module.exports = {
  getProducts,
};

