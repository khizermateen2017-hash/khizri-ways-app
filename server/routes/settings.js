const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../db');

// GET settings
router.get('/', (req, res) => {
  try {
    const db = readDB();
    res.json({ success: true, data: db.settings || {} });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// UPDATE settings
router.post('/', (req, res) => {
  try {
    const db = readDB();
    db.settings = {
      ...(db.settings || {}),
      ...req.body
    };
    writeDB(db);
    res.json({ success: true, message: 'Settings updated successfully', data: db.settings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET stats summary
router.get('/stats', (req, res) => {
  try {
    const db = readDB();
    const resources = db.resources || [];
    const articles = db.articles || [];
    const videos = db.videos || [];
    const wazaif = db.wazaif || [];

    const totalDownloads = resources.reduce((acc, curr) => acc + (curr.downloads || 0), 0);

    res.json({
      success: true,
      data: {
        totalPdfs: resources.length,
        totalArticles: articles.length,
        totalVideos: videos.length,
        totalWazaif: wazaif.length,
        totalDownloads: totalDownloads
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
