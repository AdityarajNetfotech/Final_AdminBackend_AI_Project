// routes/authRoutes.js
import express from 'express';
import { register, login, getCandidateMe, getUserMe,syncCompanyFromExternalDB,getAllCompanies , toggleUserStatus  } from '../controllers/authController.js';

import { protectCandidate } from '../middlewares/authCandidate.js';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/roles.js';
import { protects } from '../middlewares/protect.js';
import { authorizes } from '../middlewares/authorize.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protectCandidate, getCandidateMe);
router.get('/meAll', protect, authorize("RMG", "HR", "Admin"), getUserMe);
router.post(
  "/sync-company",
  syncCompanyFromExternalDB
);
router.get(
  "/all-companies",
  getAllCompanies
);
router.put('/toggle-user/:id', protects, authorizes('Admin'), toggleUserStatus);

export default router;
