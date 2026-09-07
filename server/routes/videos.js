const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../db');

// Helper to extract YouTube ID
function extractYouTubeId(urlOrId) {
  if (!urlOrId) return null;
  const str = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
    return str;
  }
  const match = str.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : str;
}

// GET all videos
router.get('/', (req, res) => {
  try {
    const db = readDB();
    let videos = [...(db.videos || [])];
    const { category, q } = req.query;

    if (category && category !== 'All') {
      videos = videos.filter(v => v.category.toLowerCase() === category.toLowerCase());
    }

    if (q) {
      const query = q.toLowerCase();
      videos = videos.filter(v =>
        (v.title && v.title.toLowerCase().includes(query)) ||
        (v.description && v.description.toLowerCase().includes(query)) ||
        (v.category && v.category.toLowerCase().includes(query)) ||
        (v.speaker && v.speaker.toLowerCase().includes(query))
      );
    }

    res.json({ success: true, count: videos.length, data: videos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST new video
router.post('/', (req, res) => {
  try {
    const { title, youtubeUrl, category, description, duration, speaker } = req.body;
    if (!title || !youtubeUrl) {
      return res.status(400).json({ success: false, message: 'Title and YouTube URL / Video ID are required.' });
    }

    const yId = extractYouTubeId(youtubeUrl);
    const db = readDB();

    const newVideo = {
      id: 'vid-' + Date.now(),
      title: title.trim(),
      youtubeId: yId,
      youtubeUrl: youtubeUrl.trim(),
      category: category ? category.trim() : 'Islamic Knowledge',
      duration: duration ? duration.trim() : '10:00',
      speaker: speaker ? speaker.trim() : 'Khizri Ways',
      description: description ? description.trim() : '',
      createdAt: new Date().toISOString()
    };

    db.videos.unshift(newVideo);
    writeDB(db);

    res.status(201).json({ success: true, message: 'Video added successfully', data: newVideo });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE video
router.delete('/:id', (req, res) => {
  try {
    const db = readDB();
    const idx = db.videos.findIndex(v => v.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    db.videos.splice(idx, 1);
    writeDB(db);

    res.json({ success: true, message: 'Video deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
