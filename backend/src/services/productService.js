const productRepository = require('../repositories/productRepository');

const getCatalogue = () => productRepository.listProducts();

const getProductById = (productId) => productRepository.findProductById(productId);

module.exports = {
  getCatalogue,
  getProductById,
};

