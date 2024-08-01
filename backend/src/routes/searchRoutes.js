import express from 'express';
import Service from '../models/Service.js';

const router = express.Router();

// Search and filter services
router.get('/', async (req, res) => {
  try {
    const { query, category, location, minPrice, maxPrice } = req.query;
    let filters = {};

    if (query) {
      filters.title = { $regex: query, $options: 'i' };
    }

    if (category) {
      filters.category = category;
    }

    if (location) {
      filters.location = location;
    }

    if (minPrice) {
      filters.price = { ...filters.price, $gte: minPrice };
    }

    if (maxPrice) {
      filters.price = { ...filters.price, $lte: maxPrice };
    }

    const services = await Service.find(filters);
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;