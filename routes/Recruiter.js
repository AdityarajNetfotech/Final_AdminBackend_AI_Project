import express from 'express';
import {generateJD,editJD,deleteJD, updateHRProfile } from '../controllers/Recruiter.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

        router.post('/generate-jd', protect, generateJD);
        router.put('/edit-jd/:id', protect, editJD);
        router.delete('/delete-jd/:id', protect, deleteJD);
        router.put('/profile/me', protect, updateHRProfile);
export default router;