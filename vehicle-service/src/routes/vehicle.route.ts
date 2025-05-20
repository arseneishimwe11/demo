import { Router } from 'express';
import { 
  entryVehicle, 
  exitVehicle, 
  getAllEntries, 
  getEntryById,
  getBill
} from '../controllers/vehicle.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { validate, vehicleEntrySchema, vehicleExitSchema } from '../middlewares/validation.middleware';
import { UserRole } from '../types';

const router = Router();

// Vehicle entry and exit routes (protected)
router.post(
  '/entry',
  authenticate,
  authorize([UserRole.ADMIN, UserRole.ATTENDANT]),
  validate(vehicleEntrySchema),
  entryVehicle
);

router.post(
  '/exit',
  authenticate,
  authorize([UserRole.ADMIN, UserRole.ATTENDANT]),
  validate(vehicleExitSchema),
  exitVehicle
);

// Bill generation
router.get(
  '/:id/bill',
  authenticate,
  getBill
);

// Get all entries (with optional filters)
router.get(
  '/',
  authenticate,
  getAllEntries
);

// Get entry by ID
router.get(
  '/:id',
  authenticate,
  getEntryById
);

export default router;