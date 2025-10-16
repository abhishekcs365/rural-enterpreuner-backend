const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Route files
const authRoutes = require('./routes/authRoutes');
const businessRoutes = require('./routes/businessRoutes');

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/businesses', businessRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Rural Entrepreneur Backend API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      businesses: '/api/businesses',
      health: '/api/health',
    },
  });
});

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
