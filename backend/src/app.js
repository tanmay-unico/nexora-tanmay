const express = require('express');
const cors = require('cors');

const apiRoutes = require('./routes');
const asyncHandler = require('./utils/asyncHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.get(
  '/api/health',
  asyncHandler(async (_req, res) => {
    res.json({ status: 'ok' });
  })
);

app.use('/api', apiRoutes);

app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || 'Unexpected server error.';
  if (status >= 500) {
    console.error(err);
  }
  res.status(status).json({ message });
});

module.exports = app;

