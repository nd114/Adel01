import express from 'express';
import { createRating, getBusinessRatings, getTopBusinesses } from '../controllers/ratingController.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', auth, createRating);
router.get('/business/:businessId', getBusinessRatings);
router.get('/top-businesses', getTopBusinesses);

export default router;