import { Router } from 'express';
import { register, login, getProfile, updateProfile, changePassword } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateRegistration, validateLogin, validateProfileUpdate, validatePasswordChange } from '../middleware/validation.js';

const router = Router();

// Public routes
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, validateProfileUpdate, updateProfile);
router.put('/change-password', authenticateToken, validatePasswordChange, changePassword);

export default router;