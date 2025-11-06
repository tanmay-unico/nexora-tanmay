const { run } = require('../db/connection');

const createOrder = ({ name, email, total, createdAt, payload }) =>
  run(
    `INSERT INTO orders (customer_name, customer_email, total, created_at, payload)
     VALUES (?, ?, ?, ?, ?)`,
    [name, email, total, createdAt, JSON.stringify(payload)]
  );

module.exports = {
  createOrder,
};

