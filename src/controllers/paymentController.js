const paymentService = require('../services/paymentService');
const { verify } = require('../utils/verifyPayment');

// POST /api/payments/create-order
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid amount is required' });
    }
    const order = await paymentService.createOrder(amount);
    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/payments/verify
exports.verifyAndStore = async (req, res) => {
  try {
    const { order_id, payment_id, signature, userId, amount, bookingId } = req.body;

    if (!order_id || !payment_id || !signature || !userId || !amount || !bookingId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const isValid = verify(order_id, payment_id, signature);
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    const payment = await paymentService.storeTransaction(
      userId, amount, bookingId, order_id, payment_id
    );

    res.json({
      success: true,
      message: 'Payment verified and stored',
      paymentId: payment.id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/payments/refund
exports.refund = async (req, res) => {
  try {
    const { paymentId } = req.body;
    if (!paymentId) {
      return res.status(400).json({ error: 'paymentId is required' });
    }
    const refund = await paymentService.refundTransaction(paymentId);
    res.json({
      success: true,
      message: 'Refund processed successfully',
      refund,
    });
  } catch (err) {
    if (err.message === 'Already refunded') {
      return res.status(400).json({ error: 'This payment is already refunded' });
    }
    if (err.message === 'Payment not found') {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.status(500).json({ error: err.message });
  }
};

// POST /api/payments/webhook
exports.webhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const crypto = require('crypto');

    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (digest !== req.headers['x-razorpay-signature']) {
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }

    const event = req.body.event;
    if (event === 'payment.captured') {
      console.log('Payment captured:', req.body.payload.payment.entity.id);
    }
    if (event === 'payment.failed') {
      console.log('Payment failed:', req.body.payload.payment.entity.id);
    }

    res.json({ received: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
