const express = require('express');
const router = express.Router();
const { readDB } = require('../db');

// GET all Banuri Town Fatwas
router.get('/', (req, res) => {
  try {
    const db = readDB();
    let fatwas = [...(db.fatwas || [])];
    const { category, q } = req.query;

    if (category && category !== 'all') {
      fatwas = fatwas.filter(f => f.category === category || f.categoryEn === category);
    }

    if (q) {
      const query = q.toLowerCase();
      fatwas = fatwas.filter(f =>
        (f.title && f.title.toLowerCase().includes(query)) ||
        (f.question && f.question.toLowerCase().includes(query)) ||
        (f.answer && f.answer.toLowerCase().includes(query)) ||
        (f.fatwaNumber && f.fatwaNumber.includes(query)) ||
        (f.category && f.category.includes(query))
      );
    }

    res.json({ success: true, count: fatwas.length, data: fatwas });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single fatwa by ID
router.get('/:id', (req, res) => {
  try {
    const db = readDB();
    const fatwa = (db.fatwas || []).find(f => f.id === req.params.id || f.fatwaNumber === req.params.id);
    if (!fatwa) {
      return res.status(404).json({ success: false, message: 'Fatwa not found' });
    }
    res.json({ success: true, data: fatwa });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
