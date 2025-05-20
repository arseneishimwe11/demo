import { Router } from 'express';
import * as reportController from '../controllers/report.controller';

const router = Router();

// Get usage reports
router.get('/usage', reportController.getUsageReport);

// Get revenue reports
router.get('/revenue', reportController.getRevenueReport);

// Get occupancy reports
router.get('/occupancy', reportController.getOccupancyReport);

// Get vehicle type distribution reports
router.get('/vehicle-types', reportController.getVehicleTypeReport);

export default router;