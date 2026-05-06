const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const projectRoutes = require('./routes/projects');
const statsRoutes = require('./routes/stats');

const app = express();

// Middleware
app.use(cors()); // Allow all for local dev troubleshooting
app.use(express.json());

// MongoDB connection (cached for serverless reuse)
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'yaahvi-portfolio', // Explicitly set DB name
      serverSelectionTimeoutMS: 5000 // Timeout after 5s
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error; // Throw so the request fails visibly
  }
};

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is reachable', env: process.env.NODE_ENV });
});

// Routes
app.use('/api/projects', async (req, res, next) => {
  await connectDB();
  next();
}, projectRoutes);

app.use('/api/stats', async (req, res, next) => {
  await connectDB();
  next();
}, statsRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.send('Yaahvi Portfolio API is running. Use /api/stats or /api/projects.');
});

// For local testing
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
