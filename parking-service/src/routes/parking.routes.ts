import { Router } from 'express';
import { create, getAll, getByCode, update, remove } from '../controllers/parking.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { UserRole } from '../types';

const router = Router();

// Public routes - anyone can view parking locations
router.get('/', getAll);
router.get('/:code', getByCode);

// Protected routes - only admin can manage parking locations
router.post('/', authenticate, authorize([UserRole.ADMIN]), create);
router.put('/:code', authenticate, authorize([UserRole.ADMIN]), update);
router.delete('/:code', authenticate, authorize([UserRole.ADMIN]), remove);

export default router;