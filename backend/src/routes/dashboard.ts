import { Router } from 'express';
import { getDashboardStats, getMonthlyStats } from '../controllers/dashboardController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// All dashboard routes require authentication
router.use(authenticateToken);

// Get dashboard overview stats
router.get('/stats', getDashboardStats);

// Get monthly statistics
router.get('/monthly-stats', getMonthlyStats);

export default router;