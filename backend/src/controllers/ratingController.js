import Rating from '../models/Rating.js';
import User from '../models/User.js';

export const createRating = async (req, res) => {
  try {
    const { businessId, rating, comment } = req.body;
    const customerId = req.user.userId;

    const newRating = new Rating({
      customer: customerId,
      business: businessId,
      rating,
      comment,
    });

    await newRating.save();

    // Update business rating
    const business = await User.findById(businessId);
    business.rating += rating;
    business.totalRatings += 1;
    await business.save();

    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ message: 'Error creating rating', error: error.message });
  }
};

export const getBusinessRatings = async (req, res) => {
  try {
    const { businessId } = req.params;
    const ratings = await Rating.find({ business: businessId }).populate('customer', 'username');
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ratings', error: error.message });
  }
};

export const getTopBusinesses = async (req, res) => {
  try {
    const topBusinesses = await User.find({ userType: 'business' })
      .sort({ rating: -1, totalRatings: -1 })
      .limit(10);
    res.json(topBusinesses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top businesses', error: error.message });
  }
};
