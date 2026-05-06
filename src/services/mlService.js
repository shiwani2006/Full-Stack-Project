const fetch = require('node-fetch');

const ML_BASE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

// AUTO-TAG a service description
const autoTagService = async (description) => {
  try {
    const response = await fetch(`${ML_BASE_URL}/auto-tag`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description })
    });
    const data = await response.json();
    return data.tags || [];
  } catch (error) {
    console.error('ML auto-tag failed:', error.message);
    return []; // return empty if ML service is down
  }
};

// GET RECOMMENDED PROVIDERS for a service request
const getRecommendations = async (requestData) => {
  try {
    const response = await fetch(`${ML_BASE_URL}/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
    });
    const data = await response.json();
    return data.providers || [];
  } catch (error) {
    console.error('ML recommend failed:', error.message);
    return [];
  }
};

// FRAUD CHECK a user
const fraudCheck = async (userId, userData) => {
  try {
    const response = await fetch(`${ML_BASE_URL}/fraud_check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, ...userData })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('ML fraud check failed:', error.message);
    return { isSuspicious: false }; // fail safe
  }
};

// SUGGEST HYBRID PAYMENT
const suggestHybridPayment = async (requesterId, serviceId) => {
  try {
    const response = await fetch(`${ML_BASE_URL}/suggest-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requesterId, serviceId })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('ML payment suggestion failed:', error.message);
    return null;
  }
};

module.exports = { autoTagService, getRecommendations, fraudCheck, suggestHybridPayment };