const path = require('path');

const APP_PORT = parseInt(process.env.PORT, 10) || 4000;
const DATA_DIRECTORY = path.join(__dirname, '..', '..', 'data');

module.exports = {
  APP_PORT,
  DATA_DIRECTORY,
};

