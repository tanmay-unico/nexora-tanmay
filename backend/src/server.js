const { APP_PORT } = require('./config/appConfig');
const app = require('./app');
const { initializeDatabase } = require('./db/seed');

const start = async () => {
  try {
    await initializeDatabase();
    app.listen(APP_PORT, () => {
      console.log(`API server ready on http://localhost:${APP_PORT}`);
    });
  } catch (err) {
    console.error('Failed to initialize database', err);
    process.exit(1);
  }
};

start();

