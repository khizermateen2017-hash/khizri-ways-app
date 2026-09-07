const express = require('express');
const router = express.Router();
const { readDB, writeDB } = require('../db');

// GET all articles
router.get('/', (req, res) => {
  try {
    const db = readDB();
    let articles = [...(db.articles || [])];
    const { category, q } = req.query;

    if (category && category !== 'All') {
      articles = articles.filter(a => a.category.toLowerCase() === category.toLowerCase());
    }

    if (q) {
      const query = q.toLowerCase();
      articles = articles.filter(a => 
        (a.title && a.title.toLowerCase().includes(query)) ||
        (a.excerpt && a.excerpt.toLowerCase().includes(query)) ||
        (a.content && a.content.toLowerCase().includes(query)) ||
        (a.category && a.category.toLowerCase().includes(query))
      );
    }

    res.json({ success: true, count: articles.length, data: articles });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET single article
router.get('/:id', (req, res) => {
  try {
    const db = readDB();
    const article = db.articles.find(a => a.id === req.params.id || a.slug === req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    res.json({ success: true, data: article });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST new article
router.post('/', (req, res) => {
  try {
    const { title, category, excerpt, content, author, readTime } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required.' });
    }

    const db = readDB();
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .substring(0, 50) + '-' + Date.now();

    const newArticle = {
      id: 'art-' + Date.now(),
      title: title.trim(),
      slug: slug,
      category: category ? category.trim() : 'General',
      author: author ? author.trim() : 'Khizri Ways',
      readTime: readTime ? readTime.trim() : '5 منٹ',
      publishedDate: new Date().toISOString().split('T')[0],
      featured: false,
      excerpt: excerpt ? excerpt.trim() : content.substring(0, 150) + '...',
      content: content.trim()
    };

    db.articles.unshift(newArticle);
    writeDB(db);

    res.status(201).json({ success: true, message: 'Article created successfully', data: newArticle });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update article
router.put('/:id', (req, res) => {
  try {
    const db = readDB();
    const idx = db.articles.findIndex(a => a.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    const { title, category, excerpt, content, author, readTime, featured } = req.body;
    const existing = db.articles[idx];

    db.articles[idx] = {
      ...existing,
      title: title !== undefined ? title.trim() : existing.title,
      category: category !== undefined ? category.trim() : existing.category,
      excerpt: excerpt !== undefined ? excerpt.trim() : existing.excerpt,
      content: content !== undefined ? content.trim() : existing.content,
      author: author !== undefined ? author.trim() : existing.author,
      readTime: readTime !== undefined ? readTime.trim() : existing.readTime,
      featured: featured !== undefined ? Boolean(featured) : existing.featured
    };

    writeDB(db);
    res.json({ success: true, message: 'Article updated successfully', data: db.articles[idx] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// DELETE article
router.delete('/:id', (req, res) => {
  try {
    const db = readDB();
    const idx = db.articles.findIndex(a => a.id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    db.articles.splice(idx, 1);
    writeDB(db);

    res.json({ success: true, message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
