import express from 'express';
import auth from '../middleware/authMiddleware.js';
import Service from '../models/Service.js';

const router = express.Router();

// Create a new service
router.post('/', auth, async (req, res) => {
  try {
    const newService = new Service({
      ...req.body,
      user: req.user.id,
    });
    const service = await newService.save();
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().populate('user', 'username email');
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a service
router.put('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedService);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a service
router.delete('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    await service.remove();
    res.json({ message: 'Service removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
