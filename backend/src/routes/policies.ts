import { Router } from 'express';
import { createPolicy, getPolicies, getPolicyById, updatePolicy } from '../controllers/policyController.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { validatePolicy } from '../middleware/validation.js';

const router = Router();

// All policy routes require authentication
router.use(authenticateToken);

// Get policies (customers see only their own, agents/admins see all)
router.get('/', getPolicies);

// Get specific policy by ID
router.get('/:id', getPolicyById);

// Create new policy (only agents and admins)
router.post('/', authorizeRoles('admin', 'agent'), validatePolicy, createPolicy);

// Update policy
router.put('/:id', updatePolicy);

export default router;