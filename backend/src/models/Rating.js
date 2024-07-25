import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: { type: String },
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
