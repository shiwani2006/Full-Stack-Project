const razorpay = require('../config/razorpay');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Razorpay order
exports.createOrder = async (amount) => {
  const options = {
    amount: amount * 100, // Razorpay needs paise
    currency: 'INR',
    receipt: `receipt_${Date.now()}`,
  };
  const order = await razorpay.orders.create(options);
  return order;
};

// Store payment after verification
exports.storeTransaction = async (userId, amount, bookingId, razorpayOrderId, razorpayPaymentId) => {
  let commissionRate = 0.05;
  if (amount > 1000) commissionRate = 0.06;
  if (amount > 5000) commissionRate = 0.08;
  const commissionAmount = amount * commissionRate;

  const payment = await prisma.payment.create({
    data: {
      bookingId,
      razorpayOrderId,
      razorpayPaymentId,
      amount,
      commission: commissionAmount,
      status: 'success',
    },
  });

  return payment;
};

// Refund a payment
exports.refundTransaction = async (paymentId) => {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
  });

  if (!payment) throw new Error('Payment not found');
  if (payment.status === 'refunded') throw new Error('Already refunded');

  const refund = await razorpay.payments.refund(
    payment.razorpayPaymentId,
    { amount: payment.amount * 100 }
  );

  await prisma.payment.update({
    where: { id: paymentId },
    data: { status: 'refunded' },
  });

  const booking = await prisma.booking.findUnique({
    where: { id: payment.bookingId },
  });

  await prisma.user.update({
    where: { id: booking.requesterId },
    data: { cashBalance: { decrement: payment.amount } },
  });

  return refund;
};
