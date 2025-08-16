import { Router } from 'express';
import { createClaim, getClaims, updateClaimStatus } from '../controllers/claimController.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { validateClaim } from '../middleware/validation.js';

const router = Router();

// All claim routes require authentication
router.use(authenticateToken);

// Get claims (customers see only their own, agents/admins see all)
router.get('/', getClaims);

// Create new claim
router.post('/', validateClaim, createClaim);

// Update claim status (only agents and admins)
router.put('/:id/status', authorizeRoles('admin', 'agent'), updateClaimStatus);

export default router;