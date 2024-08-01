import express from 'express';
import auth from '../middleware/authMiddleware.js';
import Notification from '../models/Notification.js';

const router = express.Router();

// Create a new notification
router.post('/', auth, async (req, res) => {
  try {
    const newNotification = new Notification({
      ...req.body,
      user: req.user.id,
    });
    const notification = await newNotification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get notifications for a user
router.get('/', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
