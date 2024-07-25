import express from 'express';
import { createRating, getBusinessRatings, getTopBusinesses } from '../controllers/ratingController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, createRating);
router.get('/business/:businessId', getBusinessRatings);
router.get('/top-businesses', getTopBusinesses);

export default router;