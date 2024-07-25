import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  businessBio: { type: String },
  businessFields: [{ type: String }],
  rating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
});

const User = mongoose.model('User', userSchema);

export default User;
