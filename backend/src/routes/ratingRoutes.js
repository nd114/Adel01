const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, ratingController.createRating);
router.get('/business/:businessId', ratingController.getBusinessRatings);
router.get('/top-businesses', ratingController.getTopBusinesses);

module.exports = router;
