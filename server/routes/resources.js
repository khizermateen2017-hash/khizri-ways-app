const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { readDB, writeDB } = require('../db');

// Multer storage for PDFs
const pdfStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '..', 'uploads', 'pdfs');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const cleanOriginalName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E6);
    cb(null, `${uniqueSuffix}-${cleanOriginalName}`);
  }
});

const upload = multer({
  storage: pdfStorage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF documents are allowed!'));
    }
  }
});

// Helper to format file size
function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// GET all resources
router.get('/', (req, res) => {
  try {
    const db = readDB();
    let resources = [...(db.resources || [])];
    const { category, q } = req.query;

    if (category && category !== 'All') {
      resources = resources.filter(r => r.category.toLowerCase() === category.toLowerCase());
    }

    if (q) {
      const query = q.toLowerCase();
      resources = resources.filter(r => 
        (r.title && r.title.toLowerCase().includes(query)) ||
        (r.description && r.description.toLowerCase().includes(query)) ||
        (r.category && r.category.toLowerCase().includes(query)) ||
        (r.author && r.author.toLowerCase().includes(query))
      );
    }

    res.json({ success: true, count: resources.length, data: resources });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST new PDF resource (File Upload)
router.post('/upload', upload.single('pdfFile'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please attach a valid PDF file.' });
    }

    const { title, description, category, author, pages } = req.body;
    if (!title) {
      // Clean up uploaded file if title missing
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ success: false, message: 'Title is required for the resource.' });
    }

    const db = readDB();
    const newResource = {
      id: 'res-' + Date.now(),
      title: title.trim(),
      description: description ? description.trim() : '',
      category: category ? category.trim() : 'General Resources',
      author: author ? author.trim() : 'Khizri Ways',
      fileName: req.file.filename,
      fileUrl: `/uploads/pdfs/${req.file.filename}`,
      fileSize: formatBytes(req.file.size),
      pages: pages ? parseInt(pages, 10) || 1 : 1,
      downloads: 0,
      createdAt: new Date().toISOString()
    };

    db.resources.unshift(newResource);
    writeDB(db);

    res.status(201).json({
      success: true,
      message: 'PDF Resource successfully uploaded!',
      data: newResource
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Increment download counter
router.post('/:id/download', (req, res) => {
  try {
    const db = readDB();
    const item = db.resources.find(r => r.id === req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }
    item.downloads = (item.downloads || 0) + 1;
    writeDB(db);
    res.json({ success: true, downloads: item.downloads });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE resource
router.delete('/:id', (req, res) => {
  try {
    const db = readDB();
    const idx = db.resources.findIndex(r => r.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    const removed = db.resources[idx];
    db.resources.splice(idx, 1);
    writeDB(db);

    // Remove local file if it is an uploaded file
    if (removed.fileName) {
      const filePath = path.join(__dirname, '..', 'uploads', 'pdfs', removed.fileName);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn("Could not delete physical file:", filePath);
        }
      }
    }

    res.json({ success: true, message: 'Resource successfully deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
