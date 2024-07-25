import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import ratingRoutes from './routes/ratingRoutes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({origin: 'https://adel01-phzn7cccj-nds-projects-f3c7bf77.vercel.app',
}));
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

run().catch(console.dir);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/ratings', ratingRoutes);

app.get('/', (req, res) => {
  res.send('Aidel API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
