import express from 'express';
import auth from '../middleware/authMiddleware.js';
import admin from '../middleware/admin.js';
import User from '../models/User.js';
import Service from '../models/Service.js';
import Booking from '../models/Booking.js';

const router = express.Router();

// Get user analytics (for admin)
router.get('/users', [auth, admin], async (req, res) => {
  try {
    const users = await User.find();
    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.lastLogin).length; // assuming there's a lastLogin field
    const newUsers = users.filter(user => new Date(user.createdAt) > new Date(Date.now() - 30*24*60*60*1000)).length; // users created in the last 30 days

    res.json({ totalUsers, activeUsers, newUsers });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get service analytics (for admin)
router.get('/services', [auth, admin], async (req, res) => {
  try {
    const services = await Service.find();
    const totalServices = services.length;
    const activeServices = services.filter(service => service.status === 'active').length; // assuming there's a status field
    const newServices = services.filter(service => new Date(service.createdAt) > new Date(Date.now() - 30*24*60*60*1000)).length; // services created in the last 30 days

    res.json({ totalServices, activeServices, newServices });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get booking analytics (for admin)
router.get('/bookings', [auth, admin], async (req, res) => {
  try {
    const bookings = await Booking.find();
    const totalBookings = bookings.length;
    const completedBookings = bookings.filter(booking => booking.status === 'completed').length; // assuming there's a status field
    const newBookings = bookings.filter(booking => new Date(booking.createdAt) > new Date(Date.now() - 30*24*60*60*1000)).length; // bookings created in the last 30 days

    res.json({ totalBookings, completedBookings, newBookings });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;