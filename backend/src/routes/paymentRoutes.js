import express from 'express';
import stripe from '../config/stripe.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a payment intent
router.post('/create-payment-intent', auth, async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // amount in cents
      currency: 'usd',
      payment_method_types: ['card'],
    });
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Retrieve a payment intent
router.get('/payment-intent/:id', auth, async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);
    res.status(200).json(paymentIntent);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
