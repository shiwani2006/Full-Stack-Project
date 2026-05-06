const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/service');
const bookingRoutes = require('./routes/booking');
const userRoutes = require('./routes/user');
const reviewRoutes = require('./routes/review');
const paymentRoutes = require('./routes/payment');
const walletRoutes = require('./routes/wallet');
const adminRoutes = require('./routes/admin');
const serviceRequestRoutes = require('./routes/serviceRequest');
const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/service-requests', serviceRequestRoutes);
// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Skillbridge backend is running!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
require('./utils/cronJobs');