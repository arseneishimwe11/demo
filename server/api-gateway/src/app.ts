import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app: Express = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", service: "api-gateway" });
});

// Proxy middleware configuration
// User Service
app.use(
  "/api/users",
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL || "http://localhost:3004",
    changeOrigin: true,
    pathRewrite: {
      "^/api/users": "/api/users",
    },
  })
);

// User Service Swagger
app.use(
  "/api/docs/users",
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL || "http://localhost:3004",
    changeOrigin: true,
    pathRewrite: {
      "^/api/docs/users": "/api-docs",
    },
  })
);

// Parking Service
app.use(
  "/api/parking",
  createProxyMiddleware({
    target: process.env.PARKING_SERVICE_URL || "http://localhost:3002",
    changeOrigin: true,
    pathRewrite: {
      "^/api/parking": "/api/parking",
    },
  })
);

// Parking Service Swagger
app.use(
  "/api/docs/parking",
  createProxyMiddleware({
    target: process.env.PARKING_SERVICE_URL || "http://localhost:3002",
    changeOrigin: true,
    pathRewrite: {
      "^/api/docs/parking": "/api-docs",
    },
  })
);

// Vehicle Service
app.use(
  "/api/vehicles",
  createProxyMiddleware({
    target: process.env.VEHICLE_SERVICE_URL || "http://localhost:3005",
    changeOrigin: true,
    pathRewrite: {
      "^/api/vehicles": "/api/vehicles",
    },
  })
);

// Vehicle Service Swagger
app.use(
  "/api/docs/vehicles",
  createProxyMiddleware({
    target: process.env.VEHICLE_SERVICE_URL || "http://localhost:3005",
    changeOrigin: true,
    pathRewrite: {
      "^/api/docs/vehicles": "/api-docs",
    },
  })
);

// Reporting Service
app.use(
  "/api/reports",
  createProxyMiddleware({
    target: process.env.REPORTING_SERVICE_URL || "http://localhost:3003",
    changeOrigin: true,
    pathRewrite: {
      "^/api/reports": "/api/reports",
    },
  })
);

// Reporting Service Swagger
app.use(
  "/api/docs/reports",
  createProxyMiddleware({
    target: process.env.REPORTING_SERVICE_URL || "http://localhost:3003",
    changeOrigin: true,
    pathRewrite: {
      "^/api/docs/reports": "/api-docs",
    },
  })
);

// API Documentation index page
app.get("/api/docs", (req: Request, res: Response) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Parking Management API Documentation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            line-height: 1.6;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
          }
          h1 {
            color: #333;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
          li {
            margin-bottom: 10px;
          }
          a {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            text-decoration: none;
            border-radius: 4px;
            width: 200px;
            text-align: center;
          }
          a:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Parking Management API Documentation</h1>
          <ul>
            <li><a href="/api/docs/users">User Service API</a></li>
            <li><a href="/api/docs/parking">Parking Service API</a></li>
            <li><a href="/api/docs/vehicles">Vehicle Service API</a></li>
            <li><a href="/api/docs/reports">Reporting Service API</a></li>
          </ul>
        </div>
      </body>
    </html>
  `);
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

export default app;
