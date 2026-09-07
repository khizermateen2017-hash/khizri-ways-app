const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../db');

// GET all wazaif
router.get('/', (req, res) => {
  try {
    const db = readDB();
    let wazaif = [...(db.wazaif || [])];
    const { category, q } = req.query;

    if (category && category !== 'All') {
      wazaif = wazaif.filter(w => w.category.toLowerCase() === category.toLowerCase());
    }

    if (q) {
      const query = q.toLowerCase();
      wazaif = wazaif.filter(w =>
        (w.title && w.title.toLowerCase().includes(query)) ||
        (w.arabicText && w.arabicText.includes(query)) ||
        (w.urduTranslation && w.urduTranslation.toLowerCase().includes(query)) ||
        (w.benefits && w.benefits.toLowerCase().includes(query))
      );
    }

    res.json({ success: true, count: wazaif.length, data: wazaif });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST new wazifa
router.post('/', (req, res) => {
  try {
    const { title, arabicText, transliteration, urduTranslation, repetitions, timing, category, benefits } = req.body;
    if (!title || !arabicText) {
      return res.status(400).json({ success: false, message: 'Title and Arabic text are required.' });
    }

    const db = readDB();
    const newWazifa = {
      id: 'waz-' + Date.now(),
      title: title.trim(),
      arabicText: arabicText.trim(),
      transliteration: transliteration ? transliteration.trim() : '',
      urduTranslation: urduTranslation ? urduTranslation.trim() : '',
      repetitions: repetitions ? repetitions.trim() : '100 مرتبہ',
      timing: timing ? timing.trim() : 'روزانہ کسی بھی وقت',
      category: category ? category.trim() : 'General Wazifa',
      benefits: benefits ? benefits.trim() : '',
      createdAt: new Date().toISOString()
    };

    db.wazaif.unshift(newWazifa);
    writeDB(db);

    res.status(201).json({ success: true, message: 'Wazifa added successfully', data: newWazifa });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE wazifa
router.delete('/:id', (req, res) => {
  try {
    const db = readDB();
    const idx = db.wazaif.findIndex(w => w.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Wazifa not found' });
    }

    db.wazaif.splice(idx, 1);
    writeDB(db);

    res.json({ success: true, message: 'Wazifa deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
