import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app: Express = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', service: 'api-gateway' });
});

// Proxy middleware configuration
// User Service
app.use('/api/users', createProxyMiddleware({
  target: process.env.USER_SERVICE_URL || 'http://localhost:3002',
  changeOrigin: true,
  pathRewrite: {
    '^/api/users': '/api/users',
  },
}));

// Parking Service
app.use('/api/parking', createProxyMiddleware({
  target: process.env.PARKING_SERVICE_URL || 'http://localhost:3003',
  changeOrigin: true,
  pathRewrite: {
    '^/api/parking': '/api/parking',
  },
}));

// Vehicle Service
app.use('/api/vehicles', createProxyMiddleware({
  target: process.env.VEHICLE_SERVICE_URL || 'http://localhost:3004',
  changeOrigin: true,
  pathRewrite: {
    '^/api/vehicles': '/api/vehicles',
  },
}));

// Reporting Service
app.use('/api/reports', createProxyMiddleware({
  target: process.env.REPORTING_SERVICE_URL || 'http://localhost:3005',
  changeOrigin: true,
  pathRewrite: {
    '^/api/reports': '/api/reports',
  },
}));

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app;