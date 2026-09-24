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
      fatherName = '',
      motherName = '',
      targetName = '',
      targetMotherName = '',
      purpose = '',
      phone,
      city,
      address,
      notes = '',
      hadya = 2200,
      paymentMethod = 'Bank / EasyPaisa / JazzCash',
      slipBase64 = null,
      customImageBase64 = null
    } = req.body;

    if (!customerName || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name and Phone are required.'
      });
    }

    const orderId = 'ORD-' + Date.now().toString().slice(-6);
    const newOrder = {
      id: orderId,
      itemName,
      customerName: customerName.trim(),
      fatherName: (fatherName || '').trim(),
      motherName: (motherName || '').trim(),
      targetName: (targetName || '').trim(),
      targetMotherName: (targetMotherName || '').trim(),
      purpose: (purpose || '').trim(),
      phone: phone.trim(),
      city: (city || 'Not specified').trim(),
      address: address.trim(),
      notes: notes.trim(),
      hadya: Number(hadya) || 2200,
      paymentMethod,
      hasSlip: Boolean(slipBase64),
      hasCustomImage: Boolean(customImageBase64),
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
