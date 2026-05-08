const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Add cash to user's wallet
exports.addCashBalance = async (userId, amount) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { cashBalance: { increment: amount } },
  });
  return user;
};

// Add credits to user's wallet
exports.addCreditBalance = async (userId, credits) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { creditBalance: { increment: credits } },
  });
  return user;
};

// Get current wallet balance
exports.getBalance = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      cashBalance: true,
      creditBalance: true,
      trustScore: true,
    },
  });
  if (!user) throw new Error('User not found');
  return user;
};

// Hybrid payment — use credits first, then cash for the rest
exports.hybridDeduct = async (userId, totalAmount) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) throw new Error('User not found');

  let creditsToUse = 0;
  let cashToUse = 0;

  if (user.creditBalance >= totalAmount) {
    creditsToUse = totalAmount;
    cashToUse = 0;
  } else {
    creditsToUse = user.creditBalance;
    cashToUse = totalAmount - creditsToUse;
  }

  if (user.cashBalance < cashToUse) {
    throw new Error('Insufficient balance');
  }

  const [updatedUser, ledgerEntry] = await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: {
        creditBalance: { decrement: creditsToUse },
        cashBalance: { decrement: cashToUse },
      },
    }),
    prisma.creditLedger.create({
      data: {
        userId,
        amount: creditsToUse,
        type: 'debit',
      },
    }),
  ]);

  return {
    updatedUser,
    ledgerEntry,
    creditsUsed: creditsToUse,
    cashUsed: cashToUse,
  };
};
