import express, { Express, Request, Response, NextFunction } from "express";
import { setupSwagger } from './config/swagger';
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import vehicleRoutes from "./routes/vehicle.route";

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
  res.status(200).json({ status: "ok", service: "vehicle-service" });
});

// Routes
app.use("/api/vehicles", vehicleRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Swagger documentation
setupSwagger(app);

export default app;
