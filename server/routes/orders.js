const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../db');

// GET all orders (for admin / dashboard)
router.get('/', (req, res) => {
  try {
    const db = readDB();
    res.json({ success: true, count: (db.orders || []).length, data: db.orders || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST new order
router.post('/', (req, res) => {
  try {
    const db = readDB();
    if (!db.orders) {
      db.orders = [];
    }

    const {
      itemName = 'خاص مجرب لوحِ حفاظت و گولی بند تعویذ',
      customerName,
      motherName,
      phone,
      city,
      address,
      notes = '',
      hadya = 2500,
      paymentMethod = 'Bank / EasyPaisa / JazzCash',
      slipBase64 = null
    } = req.body;

    if (!customerName || !motherName || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: 'Name, Mother Name, Phone and Address are required.'
      });
    }

    const orderId = 'ORD-' + Date.now().toString().slice(-6);
    const newOrder = {
      id: orderId,
      itemName,
      customerName: customerName.trim(),
      motherName: motherName.trim(),
      phone: phone.trim(),
      city: (city || 'Not specified').trim(),
      address: address.trim(),
      notes: notes.trim(),
      hadya: Number(hadya) || 2500,
      paymentMethod,
      hasSlip: Boolean(slipBase64),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    db.orders.unshift(newOrder);
    writeDB(db);

    res.json({
      success: true,
      message: 'Order saved successfully',
      orderId: newOrder.id,
      data: newOrder
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
