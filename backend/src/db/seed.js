const { run, get, db } = require('./connection');

const ensureSchema = async () => {
  await run(
    `CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      imageUrl TEXT,
      price REAL NOT NULL
    )`
  );

  await run(
    `CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      FOREIGN KEY (product_id) REFERENCES products(id)
    )`
  );

  await run(
    `CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      total REAL NOT NULL,
      created_at TEXT NOT NULL,
      payload TEXT NOT NULL
    )`
  );
};

const defaultProducts = [
  {
    id: 1,
    name: 'Aurora Headphones',
    description: 'Wireless over-ear headphones with luxe memory-foam cups.',
    price: 129.99,
    imageUrl: '/assets/products/headphones.jpg',
  },
  {
    id: 2,
    name: 'Lumen Smart Lamp',
    description: 'Adaptive desk lighting that follows your circadian rhythm.',
    price: 79.5,
    imageUrl: '/assets/products/night_map.jpg',
  },
  {
    id: 3,
    name: 'Pulse Fitness Tracker',
    description: 'Water-resistant wearable with 24/7 heart-rate analytics.',
    price: 59.0,
    imageUrl: '/assets/products/fitness_tracker.jpg',
  },
  {
    id: 4,
    name: 'Echo Bluetooth Speaker',
    description: 'Compact speaker with 360-degree sound and ambient light halo.',
    price: 45.25,
    imageUrl: '/assets/products/bluetooth.jpg',
  },
  {
    id: 5,
    name: 'Nimbus Desk Organizer',
    description: 'Sustainably sourced organizer with modular compartments.',
    price: 32.0,
    imageUrl: '/assets/products/desk.jpg',
  },
  {
    id: 6,
    name: 'Vibe Ceramic Mug Set',
    description: 'Pair of hand-glazed mugs, dishwasher and microwave safe.',
    price: 24.75,
    imageUrl: '/assets/products/ceramic.jpg',
  },
];

const seedProducts = async () => {
  await run('DELETE FROM cart_items');
  await run('DELETE FROM products');
  const insertStatement = db.prepare(
    'INSERT OR REPLACE INTO products (id, name, description, imageUrl, price) VALUES (?, ?, ?, ?, ?)'
  );

  await new Promise((resolve, reject) => {
    db.serialize(() => {
      defaultProducts.forEach((product) => {
        insertStatement.run(
          product.id,
          product.name,
          product.description,
          product.imageUrl,
          product.price
        );
      });
    });
    insertStatement.finalize((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const initializeDatabase = async () => {
  await ensureSchema();
  await seedProducts();
};

module.exports = {
  initializeDatabase,
};

