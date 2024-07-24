const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['customer', 'business'], required: true },
  businessBio: { type: String },
  businessFields: { type: [String], enum: ['Sports & Healthcare', 'Education, Tutoring and Consulting', 'Manual labour, home services and repairs', 'Event planning, catering and decoration', 'Fashion & Tailoring'] },
  rating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

userSchema.virtual('averageRating').get(function() {
  return this.totalRatings > 0 ? this.rating / this.totalRatings : 0;
});

module.exports = mongoose.model('User', userSchema);
