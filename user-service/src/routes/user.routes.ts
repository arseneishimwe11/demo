import { Router } from 'express';
import { register, login, getUsers, getUser, getCurrentUser } from '../controllers/user.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { UserRole } from '../types';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', authenticate, getCurrentUser);
router.get('/', authenticate, authorize([UserRole.ADMIN]), getUsers);
router.get('/:id', authenticate, authorize([UserRole.ADMIN]), getUser);

export default router;