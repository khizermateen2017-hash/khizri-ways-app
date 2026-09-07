const express = require('express');
const cors = require('cors');
const path = require('path');
const os = require('os');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure upload directories exist
const uploadDir = path.join(__dirname, 'uploads');
const pdfDir = path.join(uploadDir, 'pdfs');
const thumbDir = path.join(uploadDir, 'thumbnails');
[uploadDir, pdfDir, thumbDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Disable browser caching completely so changes reflect immediately
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
  next();
});

// Serve static frontend and uploaded files
app.use(express.static(path.join(__dirname, '..', 'public'), {
  etag: false,
  maxAge: 0
}));
app.use('/uploads', express.static(uploadDir));

// Explicit route for Admin Dashboard
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'admin.html'));
});

// Explicit route to download Android APK
app.get('/download/apk', (req, res) => {
  const apkPath = path.join(__dirname, '..', 'public', 'downloads', 'khizri-ways-v1.0.apk');
  if (fs.existsSync(apkPath)) {
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.download(apkPath, 'KhizriWays-v1.0.apk');
  } else {
    res.status(404).send('APK file not found.');
  }
});

// API Routes
app.use('/api/resources', require('./routes/resources'));
app.use('/api/articles', require('./routes/articles'));
app.use('/api/videos', require('./routes/videos'));
app.use('/api/wazaif', require('./routes/wazaif'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/fatwas', require('./routes/fatwas'));

// Fallback to index.html for SPA client
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/') || req.path.startsWith('/uploads/')) {
    return res.status(404).json({ success: false, message: 'Endpoint not found' });
  }
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Helper to get local network IP for mobile testing
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

const server = app.listen(PORT, '0.0.0.0', () => {
  const localIp = getLocalIp();
  console.log('====================================================');
  console.log('🕌 Deen Muslim UI (Khizri Ways) - Server Active');
  console.log('====================================================');
  console.log(`📱 Mobile App UI:         http://localhost:${PORT}`);
  console.log(`📲 On your Android Phone: http://${localIp}:${PORT}`);
  console.log(`⚙️  Admin Dashboard:      http://localhost:${PORT}/admin`);
  console.log('====================================================');
});

module.exports = app;
