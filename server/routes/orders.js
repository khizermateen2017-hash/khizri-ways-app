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

    const orderId = req.body.id || ('ORD-' + Date.now().toString().slice(-6));
    const unlockCode = req.body.unlockCode || orderId.slice(-4);
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
      address: (address || '').trim(),
      notes: notes.trim(),
      hadya: Number(hadya) || 2200,
      paymentMethod,
      unlockCode: String(unlockCode).trim(),
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
      unlockCode: newOrder.unlockCode,
      data: newOrder
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST verify-code (for unlocking protected items like Hirz Abi Dujanah)
router.post('/verify-code', (req, res) => {
  try {
    const { orderId, code } = req.body;
    const cleanCode = (code || '').toString().trim().toUpperCase();
    if (!cleanCode) {
      return res.status(400).json({ success: false, verified: false, message: 'Code is required' });
    }

    const MASTER_CODES = ['78692', '786', 'KHZ786', 'KHIZRI786', 'DUJANAH786', 'KHIZRI2026', '92331'];
    if (MASTER_CODES.includes(cleanCode)) {
      return res.json({ success: true, verified: true, master: true, message: 'Master code verified' });
    }

    const db = readDB();
    const orders = db.orders || [];
    const matched = orders.find(o => {
      if (orderId && o.id === orderId) {
        return (o.unlockCode && o.unlockCode.toUpperCase() === cleanCode) ||
               (o.id && o.id.toUpperCase().endsWith(cleanCode)) ||
               (o.phone && o.phone.endsWith(cleanCode));
      }
      return (o.unlockCode && o.unlockCode.toUpperCase() === cleanCode);
    });

    if (matched) {
      // Mark order as verified
      matched.status = 'verified';
      writeDB(db);
      return res.json({ success: true, verified: true, orderId: matched.id, message: 'Order verified successfully' });
    }

    // Also match if code is the last 4 digits of the provided orderId
    if (orderId && (orderId.toUpperCase().endsWith(cleanCode) || orderId.replace(/\D/g, '').endsWith(cleanCode))) {
      return res.json({ success: true, verified: true, message: 'Code verified' });
    }

    return res.status(401).json({ success: false, verified: false, message: 'Invalid verification code' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
