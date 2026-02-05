import express from 'express';
import { createNotification, getNotifications, markAsRead } from '../controllers/notificationController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// Get notifications for logged-in user
router.get('/get-notify', protect, getNotifications);
// Mark notification as read
router.patch('/:id/read', protect, markAsRead);
// Create notification (internal use)
router.post('/', createNotification);

export default router;
