import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import leadRoutes from './routes/leads.js';
import applicationRoutes from './routes/applications.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(helmet());

app.use(
  cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
  })
);

app.use(express.json({ limit: '1mb' }));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    service: 'riyadvi-api',
    database:
      mongoose.connection.readyState === 1
        ? 'connected'
        : 'disconnected',
    time: new Date().toISOString()
  });
});

app.use('/api', leadRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
});

async function start() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not set.');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    app.listen(port, () => {
      console.log(`API running on port ${port} `);
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

start();
