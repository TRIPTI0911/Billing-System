const express = require('express');
const router = express.Router();
const TransactionRepo = require('../repositories/TransactionRepo');

// For brevity, only POST routes for payments shown — can add GET, DELETE similarly

// Add party payment
router.post('/party_payments', async (req, res) => {
  try {
    const data = req.body;
    const payment = await TransactionRepo.createPartyPayment(data);
    res.status(201).json(payment);
  } catch (error) {
    console.error('Party payment creation error:', error.stack || error);
    res.status(500).json({ message: 'Failed to create party payment' });
  }
});

// Get party payments (optional date range)
router.get('/party_payments/:party_id', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const payments = await TransactionRepo.getPartyPaymentsRawByDate(
      req.params.party_id,
      startDate || null,
      endDate || null
    );
    res.json(payments);
  } catch (error) {
    console.error('Party payments fetch error:', error.stack || error);
    res.status(500).json({ message: 'Failed to fetch party payments' });
  }
});

// Add factory payment
router.post('/factory_payments', async (req, res) => {
  try {
    const data = req.body;
    const payment = await TransactionRepo.createFactoryPayment(data);
    res.status(201).json(payment);
  } catch (error) {
    console.error('Factory payment creation error:', error.stack || error);
    res.status(500).json({ message: 'Failed to create factory payment' });
  }
});

// Get factory payments (optional date range)
router.get('/factory_payments/:factory_id', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const payments = await TransactionRepo.getFactoryPaymentsRawByDate(
      req.params.factory_id,
      startDate || null,
      endDate || null
    );
    res.json(payments);
  } catch (error) {
    console.error('Factory payments fetch error:', error.stack || error);
    res.status(500).json({ message: 'Failed to fetch factory payments' });
  }
});

module.exports = router;
