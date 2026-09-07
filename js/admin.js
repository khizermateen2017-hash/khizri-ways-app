/**
 * KHIZRI WAYS - ADMIN DASHBOARD JAVASCRIPT
 * English Management Portal for PDFs, Articles, Videos, Wazaif, APK & iOS Testing
 */

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  initDragDrop();
  initForms();
  loadAllAdminData();
});

// Switch Admin Views
function switchAdminView(viewId) {
  document.querySelectorAll('.admin-view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.sidebar-nav .nav-btn').forEach(b => b.classList.remove('active'));

  const targetView = document.getElementById(viewId);
  if (targetView) targetView.classList.add('active');

  const activeBtn = document.querySelector(`.sidebar-nav .nav-btn[data-view="${viewId}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  const titleMap = {
    viewOverview: 'Dashboard Overview & Analytics',
    viewPdfs: 'PDF Resources & Booklets Manager',
    viewArticles: 'Islamic Articles & Guides Manager',
    viewVideos: 'Video Library & Lectures Manager',
    viewWazaif: 'Daily Wazaif & Healing Manager',
    viewMobileTesting: 'iPhone & Mobile Device Testing',
    viewSettings: 'Application Settings'
  };
  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle && titleMap[viewId]) {
    pageTitle.textContent = titleMap[viewId];
  }

  // Close mobile sidebar if open
  document.getElementById('adminSidebar')?.classList.remove('open');
}

// Sidebar Initialization
function initSidebar() {
  document.querySelectorAll('.sidebar-nav .nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const viewId = btn.getAttribute('data-view');
      switchAdminView(viewId);
    });
  });

  const toggle = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('adminSidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
}

// File Drag and Drop for PDF Upload
function initDragDrop() {
  const dropArea = document.getElementById('pdfDropArea');
  const fileInput = document.getElementById('pdfFileInput');
  const nameDisplay = document.getElementById('selectedFileName');

  if (!dropArea || !fileInput) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropArea.classList.add('dragover');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropArea.classList.remove('dragover');
    }, false);
  });

  dropArea.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0 && files[0].name.toLowerCase().endsWith('.pdf')) {
      fileInput.files = files;
      nameDisplay.textContent = files[0].name + ` (${(files[0].size / (1024 * 1024)).toFixed(2)} MB)`;
    } else {
      showAdminToast('Please select a valid PDF (.pdf) file!');
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      const f = fileInput.files[0];
      nameDisplay.textContent = f.name + ` (${(f.size / (1024 * 1024)).toFixed(2)} MB)`;
    } else {
      nameDisplay.textContent = 'No file selected';
    }
  });
}

// Forms Submission Setup
function initForms() {
  // 1. Upload PDF Form
  const uploadPdfForm = document.getElementById('uploadPdfForm');
  if (uploadPdfForm) {
    uploadPdfForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('btnSubmitPdf');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Uploading...';

      try {
        const formData = new FormData(uploadPdfForm);
        const res = await fetch('/api/resources/upload', {
          method: 'POST',
          body: formData
        });
        const result = await res.json();

        if (result.success) {
          showAdminToast('PDF book uploaded successfully!');
          uploadPdfForm.reset();
          document.getElementById('selectedFileName').textContent = 'No file selected';
          closeModal('modalUploadPdf');
          loadPdfs();
          loadOverviewStats();
        } else {
          alert(result.message || 'Error occurred while uploading PDF');
        }
      } catch (err) {
        console.error(err);
        alert('Upload failed: ' + err.message);
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-upload"></i> Upload Now';
      }
    });
  }

  // 2. Add Article Form
  const addArticleForm = document.getElementById('addArticleForm');
  if (addArticleForm) {
    addArticleForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const body = {
        title: document.getElementById('artTitle').value,
        category: document.getElementById('artCategory').value,
        author: document.getElementById('artAuthor').value,
        readTime: document.getElementById('artReadTime').value,
        excerpt: document.getElementById('artExcerpt').value,
        content: document.getElementById('artContent').value
      };

      try {
        const res = await fetch('/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        const result = await res.json();
        if (result.success) {
          showAdminToast('Article published successfully!');
          addArticleForm.reset();
          closeModal('modalAddArticle');
          loadArticles();
          loadOverviewStats();
        } else {
          alert(result.message);
        }
      } catch (err) {
        alert('Error publishing article: ' + err.message);
      }
    });
  }

  // 3. Add Video Form
  const addVideoForm = document.getElementById('addVideoForm');
  if (addVideoForm) {
    addVideoForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const body = {
        title: document.getElementById('vidTitle').value,
        youtubeUrl: document.getElementById('vidUrl').value,
        category: document.getElementById('vidCategory').value,
        duration: document.getElementById('vidDuration').value,
        speaker: document.getElementById('vidSpeaker').value,
        description: document.getElementById('vidDesc').value
      };

      try {
        const res = await fetch('/api/videos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        const result = await res.json();
        if (result.success) {
          showAdminToast('Video added to library successfully!');
          addVideoForm.reset();
          closeModal('modalAddVideo');
          loadVideos();
          loadOverviewStats();
        } else {
          alert(result.message);
        }
      } catch (err) {
        alert('Error adding video: ' + err.message);
      }
    });
  }

  // 4. Add Wazifa Form
  const addWazifaForm = document.getElementById('addWazifaForm');
  if (addWazifaForm) {
    addWazifaForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const body = {
        title: document.getElementById('wazTitle').value,
        arabicText: document.getElementById('wazArabic').value,
        transliteration: document.getElementById('wazTranslit').value,
        urduTranslation: document.getElementById('wazUrdu').value,
        repetitions: document.getElementById('wazRepetitions').value,
        category: document.getElementById('wazCategory').value,
        benefits: document.getElementById('wazBenefits').value
      };

      try {
        const res = await fetch('/api/wazaif', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        const result = await res.json();
        if (result.success) {
          showAdminToast('Wazifa saved successfully!');
          addWazifaForm.reset();
          closeModal('modalAddWazifa');
          loadWazaif();
          loadOverviewStats();
        } else {
          alert(result.message);
        }
      } catch (err) {
        alert('Error saving wazifa: ' + err.message);
      }
    });
  }

  // 5. Settings Form
  const settingsForm = document.getElementById('settingsForm');
  if (settingsForm) {
    settingsForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const body = {
        appName: document.getElementById('setAppName').value,
        tagline: document.getElementById('setTagline').value,
        whatsapp: document.getElementById('setWhatsApp').value,
        email: document.getElementById('setEmail').value,
        youtubeChannel: document.getElementById('setYoutube').value,
        facebookPage: document.getElementById('setFacebook').value,
        description: document.getElementById('setDescription').value
      };

      try {
        const res = await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        const result = await res.json();
        if (result.success) {
          showAdminToast('Settings updated successfully!');
        }
      } catch (err) {
        alert('Error updating settings: ' + err.message);
      }
    });
  }
}

// Load All Admin Data
async function loadAllAdminData() {
  loadOverviewStats();
  loadPdfs();
  loadArticles();
  loadVideos();
  loadWazaif();
  loadSettings();
}

// 1. Stats
async function loadOverviewStats() {
  try {
    const res = await fetch('/api/settings/stats').then(r => r.json());
    if (res.success) {
      document.getElementById('statPdfs').textContent = res.data.totalPdfs || 0;
      document.getElementById('statArticles').textContent = res.data.totalArticles || 0;
      document.getElementById('statVideos').textContent = res.data.totalVideos || 0;
      document.getElementById('statWazaif').textContent = res.data.totalWazaif || 0;
      document.getElementById('statDownloads').textContent = res.data.totalDownloads || 0;
    }
  } catch (e) {
    console.error(e);
  }
}

// 2. Load PDFs
async function loadPdfs() {
  try {
    const res = await fetch('/api/resources').then(r => r.json());
    const tbody = document.getElementById('pdfTableBody');
    if (!tbody) return;

    if (!res.success || res.data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:24px;">No PDF resources found. Click "Upload New PDF" above.</td></tr>`;
      return;
    }

    tbody.innerHTML = res.data.map(item => `
      <tr>
        <td class="tbl-title">${escapeHtml(item.title)}</td>
        <td><span class="tbl-badge">${escapeHtml(item.category)}</span></td>
        <td>${item.pages || 1} pages</td>
        <td>${item.fileSize || 'PDF'}</td>
        <td><i class="fa-solid fa-cloud-arrow-down" style="color:var(--khizri-navy-primary);"></i> ${item.downloads || 0}</td>
        <td>${item.createdAt ? item.createdAt.split('T')[0] : ''}</td>
        <td>
          <div class="tbl-actions">
            <a href="${item.fileUrl}" target="_blank" class="btn-action-view" title="View PDF">
              <i class="fa-solid fa-eye"></i> View
            </a>
            <button class="btn-action-delete" onclick="deletePdf('${item.id}')" title="Delete PDF">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (e) {
    console.error(e);
  }
}

// 3. Load Articles
async function loadArticles() {
  try {
    const res = await fetch('/api/articles').then(r => r.json());
    const tbody = document.getElementById('articlesTableBody');
    if (!tbody) return;

    if (!res.success || res.data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:24px;">No published articles found. Click "Write New Article" above.</td></tr>`;
      return;
    }

    tbody.innerHTML = res.data.map(art => `
      <tr>
        <td class="tbl-title">${escapeHtml(art.title)}</td>
        <td><span class="tbl-badge">${escapeHtml(art.category)}</span></td>
        <td>${escapeHtml(art.author || 'Khizri Ways')}</td>
        <td>${escapeHtml(art.readTime || '5 min')}</td>
        <td>${art.publishedDate || ''}</td>
        <td>
          <div class="tbl-actions">
            <button class="btn-action-delete" onclick="deleteArticle('${art.id}')" title="Delete Article">
              <i class="fa-solid fa-trash-can"></i> Delete
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (e) {
    console.error(e);
  }
}

// 4. Load Videos
async function loadVideos() {
  try {
    const res = await fetch('/api/videos').then(r => r.json());
    const tbody = document.getElementById('videosTableBody');
    if (!tbody) return;

    if (!res.success || res.data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--text-muted);padding:24px;">No videos found. Click "Add New Video" above.</td></tr>`;
      return;
    }

    tbody.innerHTML = res.data.map(vid => `
      <tr>
        <td>
          <img class="tbl-thumb" src="https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg" alt="Video Thumbnail" loading="lazy">
        </td>
        <td class="tbl-title">${escapeHtml(vid.title)}</td>
        <td><span class="tbl-badge">${escapeHtml(vid.category)}</span></td>
        <td>${escapeHtml(vid.speaker || 'Khizri Ways')}</td>
        <td>${vid.duration || '10:00'}</td>
        <td>
          <div class="tbl-actions">
            <a href="https://www.youtube.com/watch?v=${vid.youtubeId}" target="_blank" class="btn-action-view" title="Watch on YouTube">
              <i class="fa-brands fa-youtube"></i> Watch
            </a>
            <button class="btn-action-delete" onclick="deleteVideo('${vid.id}')" title="Delete Video">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (e) {
    console.error(e);
  }
}

// 5. Load Wazaif
async function loadWazaif() {
  try {
    const res = await fetch('/api/wazaif').then(r => r.json());
    const tbody = document.getElementById('wazaifTableBody');
    if (!tbody) return;

    if (!res.success || res.data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:24px;">No wazaif entries found. Click "Add New Wazifa" above.</td></tr>`;
      return;
    }

    tbody.innerHTML = res.data.map(waz => `
      <tr>
        <td class="tbl-title">${escapeHtml(waz.title)}</td>
        <td style="font-family:var(--font-arabic);font-size:1.1rem;color:var(--khizri-navy-primary);direction:rtl;text-align:right;">${escapeHtml(waz.arabicText)}</td>
        <td>${escapeHtml(waz.repetitions || '100')}</td>
        <td><span class="tbl-badge">${escapeHtml(waz.category)}</span></td>
        <td>
          <div class="tbl-actions">
            <button class="btn-action-delete" onclick="deleteWazifa('${waz.id}')" title="Delete Wazifa">
              <i class="fa-solid fa-trash-can"></i> Delete
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (e) {
    console.error(e);
  }
}

// 6. Load Settings
async function loadSettings() {
  try {
    const res = await fetch('/api/settings').then(r => r.json());
    if (res.success && res.data) {
      const s = res.data;
      if (document.getElementById('setAppName')) document.getElementById('setAppName').value = s.appName || '';
      if (document.getElementById('setTagline')) document.getElementById('setTagline').value = s.tagline || '';
      if (document.getElementById('setWhatsApp')) document.getElementById('setWhatsApp').value = s.whatsapp || '';
      if (document.getElementById('setEmail')) document.getElementById('setEmail').value = s.email || '';
      if (document.getElementById('setYoutube')) document.getElementById('setYoutube').value = s.youtubeChannel || '';
      if (document.getElementById('setFacebook')) document.getElementById('setFacebook').value = s.facebookPage || '';
      if (document.getElementById('setDescription')) document.getElementById('setDescription').value = s.description || '';
    }
  } catch (e) {
    console.error(e);
  }
}

// Delete Handlers
window.deletePdf = async function(id) {
  if (!confirm('Are you sure you want to delete this PDF file? This cannot be undone.')) return;
  try {
    const res = await fetch(`/api/resources/${id}`, { method: 'DELETE' }).then(r => r.json());
    if (res.success) {
      showAdminToast('PDF file deleted successfully!');
      loadPdfs();
      loadOverviewStats();
    }
  } catch (e) {
    alert('Failed to delete PDF: ' + e.message);
  }
};

window.deleteArticle = async function(id) {
  if (!confirm('Are you sure you want to delete this article?')) return;
  try {
    const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' }).then(r => r.json());
    if (res.success) {
      showAdminToast('Article deleted successfully!');
      loadArticles();
      loadOverviewStats();
    }
  } catch (e) {
    alert('Failed to delete article: ' + e.message);
  }
};

window.deleteVideo = async function(id) {
  if (!confirm('Are you sure you want to delete this video from the library?')) return;
  try {
    const res = await fetch(`/api/videos/${id}`, { method: 'DELETE' }).then(r => r.json());
    if (res.success) {
      showAdminToast('Video removed successfully!');
      loadVideos();
      loadOverviewStats();
    }
  } catch (e) {
    alert('Failed to delete video: ' + e.message);
  }
};

window.deleteWazifa = async function(id) {
  if (!confirm('Are you sure you want to delete this wazifa entry?')) return;
  try {
    const res = await fetch(`/api/wazaif/${id}`, { method: 'DELETE' }).then(r => r.json());
    if (res.success) {
      showAdminToast('Wazifa deleted successfully!');
      loadWazaif();
      loadOverviewStats();
    }
  } catch (e) {
    alert('Failed to delete wazifa: ' + e.message);
  }
};

// Modal Openers & Closers
window.openModal = function(modalId) {
  document.getElementById(modalId)?.classList.add('active');
};

window.openUploadPdfModal = function() {
  document.getElementById('modalUploadPdf')?.classList.add('active');
};

window.openAddArticleModal = function() {
  document.getElementById('modalAddArticle')?.classList.add('active');
};

window.openAddVideoModal = function() {
  document.getElementById('modalAddVideo')?.classList.add('active');
};

window.openAddWazifaModal = function() {
  document.getElementById('modalAddWazifa')?.classList.add('active');
};

window.closeModal = function(modalId) {
  document.getElementById(modalId)?.classList.remove('active');
};

// Toast Notification
function showAdminToast(msg) {
  const toast = document.getElementById('adminToast');
  const msgEl = document.getElementById('adminToastMsg');
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// HTML Escaper
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
