import express from 'express';
import auth from '../middleware/authMiddleware.js';
import Message from '../models/Message.js';

const router = express.Router();

// Send a new message
router.post('/', auth, async (req, res) => {
  try {
    const newMessage = new Message({
      ...req.body,
      sender: req.user.id,
    });
    const message = await newMessage.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get messages for a user
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user.id }, { receiver: req.user.id }],
    })
      .populate('sender', 'username')
      .populate('receiver', 'username')
      .sort({ timestamp: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
