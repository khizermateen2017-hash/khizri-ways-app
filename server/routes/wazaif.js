const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { readDB, writeDB } = require('../db');

// Multer storage for Wazaif & Taweezat images
const wazaifStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', 'uploads', 'wazaif');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const cleanOriginalName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E6);
    cb(null, `taweez-${uniqueSuffix}-${cleanOriginalName}`);
  }
});

const upload = multer({
  storage: wazaifStorage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB limit
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif|svg/;
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
    if (allowed.test(ext) || file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPG, PNG, WebP) are allowed!'));
    }
  }
});

// GET latest daily VIP taweez / wazifa for mobile app & community portal
router.get('/daily-taweez', (req, res) => {
  try {
    const db = readDB();
    const wazaif = db.wazaif || [];
    
    // First look for item flagged as VIP community or with category containing VIP/Taweez
    let daily = wazaif.find(w => w.isVipCommunity === true || (w.category && w.category.includes('VIP')) || (w.imageUrl && w.imageUrl.length > 0));
    
    // Fallback to the first item if none specifically flagged
    if (!daily && wazaif.length > 0) {
      daily = wazaif[0];
    }

    if (!daily) {
      return res.json({
        success: true,
        data: {
          id: 'default-daily',
          title: 'نقشِ کشائشِ رزق و فتحِ عظیم (مستند و مجرب)',
          arabicText: 'یا فتاح یا رزاق یا غنی یا مغنی',
          repetitions: '313 مرتبہ',
          timing: 'بعد نمازِ فجر یا عشاء',
          category: 'VIP Daily Taweez',
          benefits: 'رزق کی کشادگی، بندش کا خاتمہ اور خیر و برکت۔',
          methodInstructions: 'باوضو حالت میں قبلہ رخ بیٹھ کر اول و آخر ۱۱ بار درود شریف اور ۳۱۳ بار "يَا بَاسِطُ يَا رَزَّاقُ" پڑھ کر اس نقش پر دم کریں۔',
          imageUrl: ''
        }
      });
    }

    res.json({ success: true, data: daily });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET all wazaif
router.get('/', (req, res) => {
  try {
    const db = readDB();
    let wazaif = [...(db.wazaif || [])];
    const { category, q } = req.query;

    if (category && category !== 'All') {
      wazaif = wazaif.filter(w => w.category && w.category.toLowerCase() === category.toLowerCase());
    }

    if (q) {
      const query = q.toLowerCase();
      wazaif = wazaif.filter(w =>
        (w.title && w.title.toLowerCase().includes(query)) ||
        (w.arabicText && w.arabicText.includes(query)) ||
        (w.urduTranslation && w.urduTranslation.toLowerCase().includes(query)) ||
        (w.benefits && w.benefits.toLowerCase().includes(query)) ||
        (w.methodInstructions && w.methodInstructions.toLowerCase().includes(query))
      );
    }

    res.json({ success: true, count: wazaif.length, data: wazaif });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST new wazifa / taweez (Supports both JSON and Multipart with image upload)
router.post('/', upload.single('imageFile'), (req, res) => {
  try {
    const {
      title,
      arabicText,
      transliteration,
      urduTranslation,
      repetitions,
      timing,
      category,
      benefits,
      methodInstructions,
      isVipCommunity
    } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Title (عنوان / نامِ تعویذ) is required.' });
    }

    let imageUrl = '';
    if (req.file) {
      imageUrl = `/uploads/wazaif/${req.file.filename}`;
    } else if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl.trim();
    }

    const db = readDB();
    const newWazifa = {
      id: 'waz-' + Date.now(),
      title: title.trim(),
      arabicText: arabicText ? arabicText.trim() : (imageUrl ? 'نقشِ مبارک' : ''),
      transliteration: transliteration ? transliteration.trim() : '',
      urduTranslation: urduTranslation ? urduTranslation.trim() : '',
      repetitions: repetitions ? repetitions.trim() : '100 مرتبہ',
      timing: timing ? timing.trim() : 'روزانہ کسی بھی وقت',
      category: category ? category.trim() : 'Daily Wazaif & Taweezat',
      benefits: benefits ? benefits.trim() : '',
      methodInstructions: methodInstructions ? methodInstructions.trim() : '',
      imageUrl: imageUrl,
      isVipCommunity: isVipCommunity === 'true' || isVipCommunity === true,
      createdAt: new Date().toISOString()
    };

    if (!db.wazaif) db.wazaif = [];
    db.wazaif.unshift(newWazifa);
    writeDB(db);

    res.status(201).json({
      success: true,
      message: 'Wazifa / Taweez published successfully!',
      data: newWazifa
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE wazifa
router.delete('/:id', (req, res) => {
  try {
    const db = readDB();
    const idx = (db.wazaif || []).findIndex(w => w.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Wazifa not found' });
    }

    const [deleted] = db.wazaif.splice(idx, 1);
    
    // Optionally delete uploaded image file if local
    if (deleted.imageUrl && deleted.imageUrl.startsWith('/uploads/wazaif/')) {
      const filePath = path.join(__dirname, '..', deleted.imageUrl);
      if (fs.existsSync(filePath)) {
        try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
      }
    }

    writeDB(db);
    res.json({ success: true, message: 'Wazifa / Taweez deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
