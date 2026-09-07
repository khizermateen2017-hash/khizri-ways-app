/**
 * DEEN ISLAMIC APP - 100% EXACT USER SCREENSHOT JAVASCRIPT
 * Full functionality for Dual Phone presentation and all 16 Islamic features
 */

// 1. Force purge any old service worker & browser caches immediately
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (let reg of registrations) reg.unregister();
  });
}
if ('caches' in window) {
  caches.keys().then(keys => {
    for (let key of keys) caches.delete(key);
  });
}

// Global App State (Default English as requested by user)
const state = {
  currentLang: localStorage.getItem('khizri_app_lang') || 'en',
  resources: [],
  videos: [],
  articles: [],
  wazaif: [],
  settings: {},
  userName: localStorage.getItem('deen_user_name') || 'Khizri Ways',
  tasbeeh: {
    count: 0,
    target: 313,
    sound: true,
    vibrate: true
  },
  qibla: {
    targetAngle: 257,
    currentAngle: 257
  }
};

// Bilingual Translation Dictionary (English <-> اردو)
const i18n = {
  en: {
    langBtn: 'اردو',
    greeting: "Assalamu'alaikum",
    nowPrayer: 'Now prayer is',
    nextPrayerPrefix: 'Next prayer is',
    featQuran: 'AL Quran',
    featHadith: 'Hadith',
    featRohaniIlaj: 'Spiritual<br>Healing',
    featDuroodKhizri: 'Durood<br>Khizri',
    featIstikhara: 'Online<br>Istikhara',
    featTaweezat: 'Mujarab<br>Taweezat',
    featTasawwuf: 'Tasawwuf<br>& Irfan',
    featKhawab: 'Khawab Ki<br>Tabeer',
    titleTaweezat: 'Mujarab Taweezat',
    titleTasawwuf: 'Tasawwuf & Irfan',
    titleKhawab: 'Khawab Ki Tabeer',
    featWazaif: 'Khas<br>Wazaif',
    featPdfBooks: 'PDF<br>Books',
    featPrayer: 'Prayer',
    featQibla: 'Qibla',
    featTasbeeh: 'Tasbeeh',
    featName: 'Name',
    featZakat: 'Zakat',
    featRamadan: 'Ramadan<br>Planner',
    featHajj: 'Hajj &<br>Umrah',
    featMakkah: 'Makkah &<br>Madina',
    featVideo: 'Khizri<br>Videos',
    featBabyNames: 'Islamic<br>Name',
    featMosque: 'Find<br>Mosque',
    navHome: 'Home',
    navServices: 'Services',
    featServices: 'Our<br>Services',
    titleServices: 'Khizri Ways Services',
    titleAbout: 'About Khizri Ways',
    titleFastTreatment: 'Fast Treatment',
    featFastTreatment: 'Fast<br>Treatment',
    featMasail: 'Islamic<br>Masail',
    titleMasail: 'Islamic Masail & Fatwas',
    featStories: 'Customer<br>Stories',
    featAbout: 'About<br>Us',
    navHealing: 'Healing',
    navQuran: 'Quran',
    navPrayer: 'Prayer',
    navProfile: 'Profile',
    titleQuran: 'Al Quran Al Kareem',
    titlePrayer: 'Prayer Schedule',
    titleQibla: 'Qibla Direction',
    titleTasbeeh: 'Digital Tasbeeh',
    titleRohaniIlaj: 'Spiritual Healing',
    titleWazaif: 'Khizri Wazaif',
    titlePdfBooks: 'PDF Library',
    titleHadith: 'Hadith Collection',
    titleAllahNames: 'Asma-ul-Husna (99 Names)',
    titleMakkahLive: 'Makkah & Madina Live',
    titleVideos: 'Khizri Video Library',
    titleProfile: 'Profile & Settings',
    rcbHeading: 'Online Istikhara & Spiritual Guidance',
    rcbDesc: 'Direct WhatsApp consultation with Khizri Ways spiritual scholars for illness, evil eye, anxiety, and family matters.',
    rcbBtnText: 'Consult on WhatsApp',
    plbHeading: 'Khizri Ways PDF Library',
    plbDesc: 'Read and download authentic Islamic booklets, wazaif collections, and spiritual healing guides for free.',
    prayerNames: {
      Fajr: 'Fajr',
      Sunrise: 'Sunrise',
      Dhuhr: 'Dhuhr',
      Asr: 'Asr',
      Maghrib: 'Maghrib',
      Isha: 'Isha'
    },
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  ur: {
    langBtn: 'English',
    greeting: 'السلام علیکم',
    nowPrayer: 'اب وقت ہے',
    nextPrayerPrefix: 'اگلی نماز ہے',
    featQuran: 'القرآن<br>الکریم',
    featHadith: 'احادیث<br>مبارکہ',
    featRohaniIlaj: 'روحانی<br>علاج',
    featDuroodKhizri: 'درودِ<br>خضریٰ',
    featIstikhara: 'استخارہ<br>آن لائن',
    featTaweezat: 'مجرب<br>تعویذات',
    featTasawwuf: 'تصوف و<br>طریقت',
    featKhawab: 'خوابوں کی<br>تعبیر',
    titleTaweezat: 'مجرب قرآنی تعویذات و نقوش',
    titleTasawwuf: 'تصوف و تزکیۂ باطن',
    titleKhawab: 'تعبیر الروءیا - خوابوں کی تعبیر',
    featWazaif: 'خاص<br>وظائف',
    featPdfBooks: 'پی ڈی ایف<br>کتب',
    featPrayer: 'اوقاتِ<br>نماز',
    featQibla: 'قبلہ<br>رخ',
    featTasbeeh: 'ڈیجیٹل<br>تسبیح',
    featName: 'اسمائے<br>حسنیٰ',
    featZakat: 'زکوٰۃ<br>کیلکولیٹر',
    featRamadan: 'رمضان<br>پلانر',
    featHajj: 'حج و<br>عمرہ',
    featMakkah: 'مکہ و<br>مدینہ',
    featVideo: 'ویڈیو<br>بیانات',
    featBabyNames: 'اسلامی<br>نام',
    featMosque: 'قریبی<br>مسجد',
    navHome: 'ہوم',
    navServices: 'خدمات',
    featServices: 'ہماری<br>خدمات',
    titleServices: 'ہماری خدمات و علاج',
    titleAbout: 'ہمارا تعارف و مشن',
    titleFastTreatment: 'فاسٹ ٹریٹمنٹ و فوری علاج',
    featFastTreatment: 'فاسٹ<br>ٹریٹمنٹ',
    featMasail: 'اسلامی<br>مسائل',
    titleMasail: 'اسلامی مسائل و فتاویٰ (بنوری ٹاؤن)',
    featStories: 'کسٹمر<br>کہانیاں',
    featAbout: 'ہمارا<br>تعارف',
    navHealing: 'روحانی علاج',
    navQuran: 'قرآن',
    navPrayer: 'نماز',
    navProfile: 'پروفائل',
    titleQuran: 'القرآن الکریم',
    titlePrayer: 'اوقاتِ نماز کا شیڈول',
    titleQibla: 'قبلہ نما کمپاس',
    titleTasbeeh: 'ڈیجیٹل تسبیح',
    titleRohaniIlaj: 'روحانی علاج و شفا',
    titleVideos: 'خضری ویڈیو لائبریری',
    titleWazaif: 'مستند وظائف خضری',
    titlePdfBooks: 'کتب و رسائل لائبریری',
    titleHadith: 'مجموعہ احادیث نبویہ',
    titleAllahNames: 'اسمائے حسنیٰ (99 مبارک نام)',
    titleMakkahLive: 'مکہ و مدینہ براہِ راست',
    titleProfile: 'پروفائل اور ترتیبات',
    rcbHeading: 'آن لائن استخارہ و روحانی رہنمائی',
    rcbDesc: 'پریشانی، بیماری، نظرِ بد یا گھریلو الجھن کے حل کے لیے خضری ویز کے روحانی ماہرین سے براہ راست واٹس ایپ پر رابطہ کریں۔',
    rcbBtnText: 'واٹس ایپ پر رہنمائی حاصل کریں',
    plbHeading: 'خضری ویز پی ڈی ایف کتب',
    plbDesc: 'روحانی علاج، درود خضری کے فضائل، اور روزمرہ کے مستند وظائف کی مستند کتابیں مفت پڑھیں اور ڈاؤنلوڈ کریں۔',
    prayerNames: {
      Fajr: 'فجر',
      Sunrise: 'طلوعِ آفتاب',
      Dhuhr: 'ظہر',
      Asr: 'عصر',
      Maghrib: 'مغرب',
      Isha: 'عشاء'
    },
    days: ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'],
    months: ['جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون', 'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر']
  }
};

// Web Audio API Click Sound Synthesizer
let audioCtx = null;
function playClickSound() {
  if (!state.tasbeeh.sound) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(850, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, audioCtx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } catch (e) {}
}

// Dom Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initClock();
  initLocation();
  initViewModes();
  initNavigation();
  initTasbeeh();
  initQibla();
  initUserName();
  initWazaifFilters();
  initPdfFilters();
  fetchAllData();
  populateSurahs();
  populateHadith();
  populateAllahNames();
  populatePrayerTimes();
});

// Language Initialization & Switching Engine
function initLanguage() {
  setAppLanguage(state.currentLang);
}

window.toggleAppLanguage = function() {
  const nextLang = state.currentLang === 'en' ? 'ur' : 'en';
  setAppLanguage(nextLang);
  playClickSound();
  if (state.tasbeeh.vibrate && 'vibrate' in navigator) {
    navigator.vibrate(25);
  }
  showToast(nextLang === 'ur' ? 'اردو زبان منتخب ہو گئی' : 'Language switched to English');
};

function setAppLanguage(lang) {
  state.currentLang = lang;
  localStorage.setItem('khizri_app_lang', lang);
  document.body.classList.toggle('lang-ur', lang === 'ur');

  const t = i18n[lang] || i18n.en;

  // Toggle button labels
  const toggleBtnText = document.getElementById('langToggleText');
  const desktopBtnText = document.getElementById('desktopLangText');
  if (toggleBtnText) toggleBtnText.textContent = t.langBtn;
  if (desktopBtnText) desktopBtnText.textContent = t.langBtn;

  // Greeting
  const greetingEl = document.getElementById('headerGreetingText');
  if (greetingEl) greetingEl.textContent = t.greeting;

  // Hero Prayer Card labels
  const curLabel = document.getElementById('currentPrayerLabel');
  if (curLabel) curLabel.textContent = t.nowPrayer;

  // Special Banners
  const rcbHeading = document.getElementById('rcbHeading');
  const rcbDesc = document.getElementById('rcbDesc');
  const rcbBtnText = document.getElementById('rcbBtnText');
  if (rcbHeading) rcbHeading.textContent = t.rcbHeading;
  if (rcbDesc) rcbDesc.textContent = t.rcbDesc;
  if (rcbBtnText) rcbBtnText.textContent = t.rcbBtnText;

  const plbHeading = document.getElementById('plbHeading');
  const plbDesc = document.getElementById('plbDesc');
  if (plbHeading) plbHeading.textContent = t.plbHeading;
  if (plbDesc) plbDesc.textContent = t.plbDesc;

  // All elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.innerHTML = t[key];
    }
  });

  // Re-run clock & prayer times formatting immediately
  if (typeof updateClockDisplay === 'function') {
    updateClockDisplay();
  }
}

// Live Clock, Date, and Next Prayer Time Calculation
let updateClockDisplay = null;
function initClock() {
  updateClockDisplay = function() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;

    const hrsPad = String(hours).padStart(2, '0');
    const minsPad = String(minutes).padStart(2, '0');
    const hrs12Pad = String(hours12).padStart(2, '0');

    // Status bar clock (24hr or standard 9:41 style)
    document.querySelectorAll('.status-clock').forEach(el => {
      el.textContent = `${hrsPad}:${minsPad}`;
    });

    // Top Header Live Clock in White
    const headerTime = document.getElementById('headerLiveTime');
    const headerAmpm = document.getElementById('headerTimeAmpm');
    const headerDate = document.getElementById('headerLiveDate');

    if (headerTime) headerTime.textContent = `${hrs12Pad}:${minsPad}`;
    if (headerAmpm) headerAmpm.textContent = ampm;

    if (headerDate) {
      const t = i18n[state.currentLang] || i18n.en;
      if (state.currentLang === 'ur') {
        const day = t.days[now.getDay()];
        const month = t.months[now.getMonth()];
        const dNum = String(now.getDate()).padStart(2, '0');
        headerDate.textContent = `${day}، ${dNum} ${month} ${now.getFullYear()}`;
      } else {
        const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
        headerDate.textContent = now.toLocaleDateString('en-GB', options);
      }
    }

    // Dynamic Current & Next Prayer calculation
    updateCurrentAndNextPrayer(now);
  };

  updateClockDisplay();
  setInterval(updateClockDisplay, 1000);
}

// IP-Based Location Detection
function initLocation() {
  const cityEl = document.getElementById('headerCityName');
  
  // 1. Check local cache first for instant zero-latency display
  const cachedCity = localStorage.getItem('khizri_user_city');
  if (cachedCity && cityEl) {
    cityEl.textContent = cachedCity;
  }

  // 2. Fallback to browser timezone identifier if not cached
  if (!cachedCity && cityEl) {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz) {
        const parts = tz.split('/');
        const fallbackCity = parts[parts.length - 1].replace(/_/g, ' ');
        cityEl.textContent = fallbackCity;
      }
    } catch(e) {}
  }

  // 3. Fetch exact city & country from IP Geolocation API asynchronously
  fetch('https://ipwho.is/')
    .then(r => r.json())
    .then(data => {
      if (data && data.success) {
        const locStr = `${data.city || data.region || 'Pakistan'}, ${data.country_code || 'PK'}`;
        if (cityEl) cityEl.textContent = locStr;
        localStorage.setItem('khizri_user_city', locStr);
      } else {
        // Alternative free IP geolocation fallback
        fetch('https://ipapi.co/json/')
          .then(r => r.json())
          .then(d => {
            if (d && d.city) {
              const locStr = `${d.city}, ${d.country_code || 'PK'}`;
              if (cityEl) cityEl.textContent = locStr;
              localStorage.setItem('khizri_user_city', locStr);
            }
          }).catch(() => {});
      }
    })
    .catch(() => {
      // Offline or network error - keep timezone or cached city
    });
}

// Prayer Timings & Countdown
function updateCurrentAndNextPrayer(now) {
  const currentPrayerEl = document.getElementById('currentPrayerName');
  const nextPrayerEl = document.getElementById('nextPrayerTime');
  const currentPrayerLabel = document.getElementById('currentPrayerLabel');
  const nextPrayerLabel = document.getElementById('nextPrayerLabel');
  if (!currentPrayerEl || !nextPrayerEl) return;

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Prayer times in minutes from midnight
  const prayers = [
    { name: 'Fajr', mins: 4 * 60 + 45, timeStr: '04:45 AM' },
    { name: 'Sunrise', mins: 6 * 60 + 5, timeStr: '06:05 AM' },
    { name: 'Dhuhr', mins: 13 * 60 + 15, timeStr: '01:15 PM' },
    { name: 'Asr', mins: 16 * 60 + 4, timeStr: '04:04 PM' },
    { name: 'Maghrib', mins: 18 * 60 + 35, timeStr: '06:35 PM' },
    { name: 'Isha', mins: 20 * 60 + 0, timeStr: '08:00 PM' }
  ];

  let current = prayers[prayers.length - 1]; // Default to Isha if before Fajr or after Isha
  let next = prayers[0];

  for (let i = 0; i < prayers.length; i++) {
    if (currentMinutes >= prayers[i].mins) {
      current = prayers[i];
      next = prayers[(i + 1) % prayers.length];
    }
  }

  const t = i18n[state.currentLang] || i18n.en;
  const curNameKey = current.name === 'Sunrise' ? 'Dhuhr' : current.name;
  const localizedCurrentName = t.prayerNames[curNameKey] || curNameKey;
  const localizedNextName = t.prayerNames[next.name] || next.name;

  if (currentPrayerLabel) currentPrayerLabel.textContent = t.nowPrayer;
  currentPrayerEl.textContent = localizedCurrentName;
  if (nextPrayerLabel) nextPrayerLabel.textContent = `${t.nextPrayerPrefix} ${localizedNextName}`;
  
  // Format next prayer time (matches "04:04 PM")
  const parts = next.timeStr.split(' ');
  nextPrayerEl.innerHTML = `${parts[0]} <span class="pm-unit">${parts[1]}</span>`;
}

// User Display Name Management (Default: Khizri Ways)
function initUserName() {
  const displayEl = document.getElementById('userDisplayName');
  const profileHeading = document.getElementById('profileNameHeading');
  const inputEl = document.getElementById('inputCustomName');
  const btnSave = document.getElementById('btnSaveDisplayName');

  if (displayEl) displayEl.textContent = state.userName;
  if (profileHeading) profileHeading.textContent = state.userName;
  if (inputEl) inputEl.value = state.userName;

  btnSave?.addEventListener('click', () => {
    const newName = inputEl.value.trim() || 'Khizri Ways';
    state.userName = newName;
    localStorage.setItem('deen_user_name', newName);
    if (displayEl) displayEl.textContent = newName;
    if (profileHeading) profileHeading.textContent = newName;
    showToast(`Display name updated to: ${newName}`);
  });
}

// Desktop Presentation Mode Switcher (Dual Phones, Single App, Full Screen)
function initViewModes() {
  const stage = document.getElementById('presentationStage');
  const btnDual = document.getElementById('btnModeDual');
  const btnSingle = document.getElementById('btnModeSingle');
  const btnFull = document.getElementById('btnModeFull');
  const btnSplashTap = document.getElementById('btnSplashTap');

  function setMode(mode) {
    stage.classList.remove('mode-dual-view', 'mode-single-view', 'mode-full-view');
    btnDual?.classList.remove('active');
    btnSingle?.classList.remove('active');
    btnFull?.classList.remove('active');

    if (mode === 'dual') {
      stage.classList.add('mode-dual-view');
      btnDual?.classList.add('active');
    } else if (mode === 'single') {
      stage.classList.add('mode-single-view');
      btnSingle?.classList.add('active');
    } else if (mode === 'full') {
      stage.classList.add('mode-full-view');
      btnFull?.classList.add('active');
    }
  }

  btnDual?.addEventListener('click', () => setMode('dual'));
  btnSingle?.addEventListener('click', () => setMode('single'));
  btnFull?.addEventListener('click', () => setMode('full'));

  // Clicking the splash button highlights the interactive main phone
  btnSplashTap?.addEventListener('click', () => {
    const appPhone = document.getElementById('phoneMockupApp');
    appPhone?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast('Switched to Interactive Main App Screen');
  });

  // Wi-Fi Local IP Copy
  document.getElementById('btnShowWifi')?.addEventListener('click', () => {
    openModal('modalWifiDialog');
  });

  document.getElementById('btnCopyWifiIp')?.addEventListener('click', () => {
    const text = document.getElementById('wifiLocalIp').textContent;
    navigator.clipboard.writeText(text).then(() => showToast('Wi-Fi Link copied to clipboard!'));
  });
}

// Tab and Feature Navigation Switcher
function initNavigation() {
  const tabScreens = document.querySelectorAll('.tab-screen');
  const bottomNavCells = document.querySelectorAll('.exact-bottom-nav .bottom-nav-cell');

  window.switchTab = function(targetId) {
    tabScreens.forEach(s => s.classList.remove('active'));
    bottomNavCells.forEach(c => c.classList.remove('active'));

    const targetTab = document.getElementById(targetId);
    if (targetTab) targetTab.classList.add('active');
    if (targetId === 'tabIslamicMasail') { renderMasailMiniButtons(); }

    const activeCell = document.querySelector(`.exact-bottom-nav .bottom-nav-cell[data-open="${targetId}"]`);
    if (activeCell) activeCell.classList.add('active');

    // Scroll to top of newly opened screen
    const scrollArea = targetTab?.querySelector('.sub-screen-scroll') || targetTab?.querySelector('.sixteen-grid-section');
    if (scrollArea) scrollArea.scrollTop = 0;
  };

  // Bind all elements with data-open attribute (Grid cells, back buttons, nav items)
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-open]');
    if (!trigger) return;

    const target = trigger.getAttribute('data-open');
    if (target.startsWith('modal')) {
      openModal(target);
    } else {
      window.switchTab(target);
    }
  });
}

// Modal Helpers
window.openModal = function(modalId) {
  const m = document.getElementById(modalId);
  if (m) m.classList.add('active');
};

window.closeModal = function(modalId) {
  const m = document.getElementById(modalId);
  if (m) {
    m.classList.remove('active');
    // If video player, stop playback
    if (modalId === 'modalVideoPlayer') {
      const frame = document.getElementById('videoPlayerFrame');
      if (frame) frame.src = '';
    }
    // If PDF reader, clear iframe
    if (modalId === 'modalPdfReader') {
      const frame = document.getElementById('pdfModalFrame');
      if (frame) frame.src = '';
    }
  }
};

// Toast Helper
window.showToast = function(msg) {
  const toast = document.getElementById('deenToast');
  const msgEl = document.getElementById('deenToastMsg');
  if (toast && msgEl) {
    msgEl.textContent = msg;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 2800);
  }
};

// Digital Tasbeeh Implementation
function initTasbeeh() {
  const btnDial = document.getElementById('btnTasbeehDial');
  const countVal = document.getElementById('tasbeehCountValue');
  const targetHint = document.getElementById('tasbeehTargetHint');
  const btnReset = document.getElementById('btnResetTasbeeh');
  const picker = document.getElementById('tasbeehDhikrPicker');
  const banner = document.getElementById('tasbeehArabicBanner');
  const soundChip = document.getElementById('btnSoundChip');
  const vibrateChip = document.getElementById('btnVibrateChip');

  picker?.addEventListener('change', (e) => {
    const selected = e.target.options[e.target.selectedIndex];
    banner.textContent = selected.value;
    state.tasbeeh.target = parseInt(selected.getAttribute('data-target')) || 33;
    state.tasbeeh.count = 0;
    countVal.textContent = '0';
    targetHint.textContent = state.tasbeeh.target;
  });

  btnDial?.addEventListener('click', () => {
    state.tasbeeh.count++;
    countVal.textContent = state.tasbeeh.count;

    playClickSound();

    if (state.tasbeeh.vibrate && 'vibrate' in navigator) {
      navigator.vibrate(35);
    }

    if (state.tasbeeh.count === state.tasbeeh.target) {
      showToast(`MashaAllah! Target of ${state.tasbeeh.target} reached!`);
      if (state.tasbeeh.vibrate && 'vibrate' in navigator) {
        navigator.vibrate([80, 50, 80]);
      }
    }
  });

  btnReset?.addEventListener('click', () => {
    state.tasbeeh.count = 0;
    countVal.textContent = '0';
    showToast('Tasbeeh counter reset');
  });

  soundChip?.addEventListener('click', () => {
    state.tasbeeh.sound = !state.tasbeeh.sound;
    soundChip.classList.toggle('active', state.tasbeeh.sound);
  });

  vibrateChip?.addEventListener('click', () => {
    state.tasbeeh.vibrate = !state.tasbeeh.vibrate;
    vibrateChip.classList.toggle('active', state.tasbeeh.vibrate);
  });
}

// Qibla Compass Animation
function initQibla() {
  const compassNeedle = document.getElementById('compassNeedleStick');
  const qiblaDegNumber = document.getElementById('qiblaDegreeNumber');

  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      let alpha = e.alpha || 0;
      let heading = Math.round(360 - alpha);
      if (heading < 0) heading += 360;
      let needleRotation = state.qibla.targetAngle - heading;
      if (compassNeedle) {
        compassNeedle.style.transform = `rotate(${needleRotation}deg)`;
      }
      if (qiblaDegNumber) {
        qiblaDegNumber.textContent = `${Math.round(needleRotation)}°`;
      }
    }, true);
  }
}

// Zakat Calculator
window.calcZakat = function() {
  const input = document.getElementById('inputWealth');
  const resultBox = document.getElementById('zakatResultBox');
  const wealth = parseFloat(input?.value) || 0;
  const zakat = (wealth * 0.025).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  if (resultBox) {
    resultBox.innerHTML = `Your Payable Zakat (2.5%): <strong>${zakat}</strong>`;
  }
};

// WhatsApp Consult Link
window.openWhatsAppConsult = function(customMsg) {
  const phone = (state.settings && state.settings.whatsapp ? state.settings.whatsapp.replace(/[^0-9]/g, '') : '') || '923317704807';
  const defaultMsg = 'السلام علیکم، مجھے خضریٰ ویز سے روحانی علاج، وظائف، اور استخارہ کے بارے میں رہنمائی چاہیے۔';
  const text = encodeURIComponent(customMsg || defaultMsg);
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
};

// Live Streams (Makkah & Madina)
window.openLiveStream = function(title, url) {
  const modal = document.getElementById('modalVideoPlayer');
  const titleEl = document.getElementById('videoPlayerTitle');
  const frame = document.getElementById('videoPlayerFrame');
  const desc = document.getElementById('videoPlayerDesc');

  if (titleEl) titleEl.textContent = title;
  if (frame) frame.src = url;
  if (desc) desc.textContent = '24/7 Official Live Transmission in Full HD';
  openModal('modalVideoPlayer');
};

// PDF In-App Reader
window.openPdfInApp = function(title, fileUrl) {
  const modal = document.getElementById('modalPdfReader');
  const titleEl = document.getElementById('pdfModalTitle');
  const frame = document.getElementById('pdfModalFrame');
  const dlLink = document.getElementById('pdfModalDownloadLink');

  if (titleEl) titleEl.textContent = title;
  if (frame) frame.src = fileUrl;
  if (dlLink) {
    dlLink.href = fileUrl;
    dlLink.download = `${title}.pdf`;
  }
  openModal('modalPdfReader');
};

// Generic Info Modals (Ramadan, Hajj, Islamic Names, Mosques, Events)
window.openFeatureModal = function(title, htmlContent) {
  const titleEl = document.getElementById('genericInfoTitle');
  const bodyEl = document.getElementById('genericInfoBody');
  if (titleEl) titleEl.textContent = title;
  if (bodyEl) bodyEl.innerHTML = htmlContent;
  openModal('modalInfoGeneric');
};

// Bind Special Modal Popups
document.addEventListener('click', (e) => {
  const cell = e.target.closest('.feature-cell');
  if (!cell) return;
  const trigger = cell.getAttribute('data-open');

  if (trigger === 'modalRamadan') {
    openFeatureModal('Ramadan Planner', `
      <div style="text-align:center; padding: 10px 0;">
        <i class="fa-solid fa-moon" style="font-size:2.5rem; color:#0D5C46; margin-bottom:12px;"></i>
        <h4 style="font-size:1.15rem; font-weight:800; margin-bottom:6px;">Ramadan 1447 Planner</h4>
        <p style="color:#64748B; font-size:0.85rem; margin-bottom:18px;">Track your daily fasts, Taraweeh prayers, and Sehri & Iftar timings.</p>
        <div style="background:#E6F4F0; padding:14px; border-radius:12px; text-align:left; margin-bottom:14px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:6px;"><strong>Sehri End (Fajr):</strong> <span style="font-weight:700; color:#0D5C46;">04:45 AM</span></div>
          <div style="display:flex; justify-content:space-between;"><strong>Iftar (Maghrib):</strong> <span style="font-weight:700; color:#0D5C46;">06:35 PM</span></div>
        </div>
        <p style="font-size:0.8rem; color:#1E2925;"><em>"Whoever fasts during Ramadan with faith and seeking reward, his past sins will be forgiven."</em> (Bukhari)</p>
      </div>
    `);
  } else if (trigger === 'modalHajj') {
    openFeatureModal('Hajj & Umrah Guide', `
      <div style="text-align:left; padding: 6px 0;">
        <h4 style="font-size:1.1rem; font-weight:800; color:#0D5C46; margin-bottom:8px;">Step-by-Step Umrah Guide</h4>
        <ol style="padding-left:18px; line-height:1.6; font-size:0.86rem; color:#1F2925;">
          <li><strong>Ihram:</strong> Enter the state of purity and recite Talbiyah at Miqat.</li>
          <li><strong>Tawaf:</strong> Circumambulate the Holy Kaaba 7 times anti-clockwise starting from the Black Stone (Hajr-e-Aswad).</li>
          <li><strong>Maqam Ibrahim:</strong> Offer two rak'ahs behind Maqam Ibrahim and drink Zamzam.</li>
          <li><strong>Sa'i:</strong> Walk 7 laps between the hills of Safa and Marwah.</li>
          <li><strong>Halq or Taqsir:</strong> Shave or trim hair to complete the Umrah.</li>
        </ol>
      </div>
    `);
  } else if (trigger === 'modalNames') {
    openFeatureModal('Islamic Baby Names', `
      <div style="text-align:left; padding: 6px 0;">
        <h4 style="font-size:1.05rem; font-weight:800; color:#0D5C46; margin-bottom:10px;">Popular Islamic Names</h4>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.82rem;">
          <div style="background:#F8FAF9; padding:8px 10px; border-radius:8px;"><strong>Muhammad:</strong> Praised one</div>
          <div style="background:#F8FAF9; padding:8px 10px; border-radius:8px;"><strong>Fatima:</strong> Pure, abstinent</div>
          <div style="background:#F8FAF9; padding:8px 10px; border-radius:8px;"><strong>Ali:</strong> Noble, exalted</div>
          <div style="background:#F8FAF9; padding:8px 10px; border-radius:8px;"><strong>Aisha:</strong> Prosperous, alive</div>
          <div style="background:#F8FAF9; padding:8px 10px; border-radius:8px;"><strong>Zayd:</strong> Abundance, growth</div>
          <div style="background:#F8FAF9; padding:8px 10px; border-radius:8px;"><strong>Maryam:</strong> Beloved, pious</div>
        </div>
      </div>
    `);
  } else if (trigger === 'modalMosque') {
    openFeatureModal('Find Mosque', `
      <div style="text-align:center; padding: 10px 0;">
        <i class="fa-solid fa-location-dot" style="font-size:2.5rem; color:#0D5C46; margin-bottom:12px;"></i>
        <h4 style="font-size:1.1rem; font-weight:800; margin-bottom:6px;">Nearby Mosques</h4>
        <p style="color:#64748B; font-size:0.84rem; margin-bottom:16px;">Locate local Jama Masjid and prayer rooms near your location.</p>
        <button onclick="window.open('https://www.google.com/maps/search/mosques+near+me', '_blank')" style="background:#0D5C46; color:#fff; border:none; padding:10px 20px; border-radius:8px; font-weight:700; cursor:pointer;">
          <i class="fa-solid fa-map-location-dot"></i> Open in Maps
        </button>
      </div>
    `);
  } else if (trigger === 'modalEvents') {
    openFeatureModal('Islamic Calendar Events', `
      <div style="text-align:left; padding: 6px 0;">
        <h4 style="font-size:1.05rem; font-weight:800; color:#0D5C46; margin-bottom:10px;">Hijri Calendar Highlights (1447-1448)</h4>
        <ul style="list-style:none; padding:0; display:flex; flex-direction:column; gap:8px; font-size:0.84rem;">
          <li style="display:flex; justify-content:space-between; border-bottom:1px solid #EEF3F0; padding-bottom:6px;"><strong>1st Ramadan:</strong> <span>Fasting Begins</span></li>
          <li style="display:flex; justify-content:space-between; border-bottom:1px solid #EEF3F0; padding-bottom:6px;"><strong>Laylat al-Qadr:</strong> <span>Night of Power</span></li>
          <li style="display:flex; justify-content:space-between; border-bottom:1px solid #EEF3F0; padding-bottom:6px;"><strong>1st Shawwal:</strong> <span>Eid-ul-Fitr</span></li>
          <li style="display:flex; justify-content:space-between; border-bottom:1px solid #EEF3F0; padding-bottom:6px;"><strong>9th Dhul Hijjah:</strong> <span>Day of Arafah</span></li>
          <li style="display:flex; justify-content:space-between; border-bottom:1px solid #EEF3F0; padding-bottom:6px;"><strong>10th Dhul Hijjah:</strong> <span>Eid-ul-Adha</span></li>
          <li style="display:flex; justify-content:space-between;"><strong>10th Muharram:</strong> <span>Day of Ashura</span></li>
        </ul>
      </div>
    `);
  }
});

// Quran Surahs Data
function populateSurahs() {
  const container = document.getElementById('quranSurahList');
  if (!container) return;

  const surahs = [
    { num: 1, name: 'Al-Fatihah', meaning: 'The Opening', verses: 7, ar: 'الفاتحة' },
    { num: 2, name: 'Al-Baqarah', meaning: 'The Cow', verses: 286, ar: 'البقرة' },
    { num: 3, name: 'Ali \'Imran', meaning: 'Family of Imran', verses: 200, ar: 'آل عمران' },
    { num: 18, name: 'Al-Kahf', meaning: 'The Cave', verses: 110, ar: 'الكهف' },
    { num: 36, name: 'Ya-Sin', meaning: 'Ya-Sin (Heart of Quran)', verses: 83, ar: 'يس' },
    { num: 55, name: 'Ar-Rahman', meaning: 'The Most Merciful', verses: 78, ar: 'الرحمن' },
    { num: 56, name: 'Al-Waqi\'ah', meaning: 'The Inevitable', verses: 96, ar: 'الواقعة' },
    { num: 67, name: 'Al-Mulk', meaning: 'The Sovereignty', verses: 30, ar: 'الملك' },
    { num: 112, name: 'Al-Ikhlas', meaning: 'The Sincerity', verses: 4, ar: 'الإخلاص' },
    { num: 113, name: 'Al-Falaq', meaning: 'The Daybreak', verses: 5, ar: 'الفلق' },
    { num: 114, name: 'An-Nas', meaning: 'Mankind', verses: 6, ar: 'الناس' }
  ];

  container.innerHTML = surahs.map(s => `
    <div class="surah-card-row" onclick="playSurahRecitation('${s.num}', '${s.name}')">
      <div style="display:flex; align-items:center;">
        <div class="surah-num-badge">${s.num}</div>
        <div class="surah-info-col">
          <div class="surah-eng-name">${s.name}</div>
          <div class="surah-meaning">${s.meaning} • ${s.verses} Verses</div>
        </div>
      </div>
      <div class="surah-arabic-title">${s.ar}</div>
    </div>
  `).join('');
}

window.playSurahRecitation = function(num, name) {
  const pad = String(num).padStart(3, '0');
  const audioUrl = `https://server8.mp3quran.net/afs/${pad}.mp3`;
  openLiveStream(`Surah ${name} - Mishary Alafasy`, `https://quran.com/${num}`);
};

// Hadith Collection Data
function populateHadith() {
  const container = document.getElementById('hadithStack');
  if (!container) return;

  const hadiths = [
    {
      source: 'Sahih al-Bukhari (1)',
      ar: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
      eng: '"Actions are judged by intentions, and each person will be rewarded according to that which they intended."'
    },
    {
      source: 'Sahih al-Bukhari (13)',
      ar: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
      eng: '"None of you truly believes until he loves for his brother what he loves for himself."'
    },
    {
      source: 'Sunan al-Tirmidhi (1987)',
      ar: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ',
      eng: '"Your smile for your brother is charity for you."'
    }
  ];

  container.innerHTML = hadiths.map(h => `
    <div style="background:#FFFFFF; border:1px solid #EEF3F0; border-radius:14px; padding:16px; margin-bottom:12px;">
      <div style="font-size:0.75rem; font-weight:700; color:#0D5C46; margin-bottom:8px;">${h.source}</div>
      <div style="font-family:'Amiri', serif; font-size:1.35rem; font-weight:700; color:#14221E; line-height:1.6; direction:rtl; margin-bottom:10px;">${h.ar}</div>
      <div style="font-size:0.86rem; color:#374151; line-height:1.45;">${h.eng}</div>
    </div>
  `).join('');
}

// 99 Names of Allah (Asma-ul-Husna)
function populateAllahNames() {
  const container = document.getElementById('allahNamesGrid');
  if (!container) return;

  const names = [
    { ar: 'الرَّحْمَنُ', trans: 'Ar-Rahman', mean: 'The All-Compassionate' },
    { ar: 'الرَّحِيمُ', trans: 'Ar-Raheem', mean: 'The All-Merciful' },
    { ar: 'الْمَلِكُ', trans: 'Al-Malik', mean: 'The King and Sovereign' },
    { ar: 'الْقُدُّوسُ', trans: 'Al-Quddus', mean: 'The Most Holy' },
    { ar: 'السَّلاَمُ', trans: 'As-Salam', mean: 'The Source of Peace' },
    { ar: 'الْمُؤْمِنُ', trans: 'Al-Mu\'min', mean: 'The Giver of Faith' },
    { ar: 'الْمُهَيْمِنُ', trans: 'Al-Muhaymin', mean: 'The Guardian' },
    { ar: 'الْعَزِيزُ', trans: 'Al-Aziz', mean: 'The All-Mighty' },
    { ar: 'الْجَبَّارُ', trans: 'Al-Jabbar', mean: 'The Restorer' },
    { ar: 'الْمُتَكَبِّرُ', trans: 'Al-Mutakabbir', mean: 'The Supreme' },
    { ar: 'الْخَالِقُ', trans: 'Al-Khaliq', mean: 'The Creator' },
    { ar: 'الْبَارِئُ', trans: 'Al-Bari\'', mean: 'The Maker of Order' }
  ];

  container.innerHTML = names.map(n => `
    <div class="allah-name-cell">
      <div class="an-arabic">${n.ar}</div>
      <div class="an-translit">${n.trans}</div>
      <div class="an-meaning">${n.mean}</div>
    </div>
  `).join('');
}

// Prayer Times Schedule
function populatePrayerTimes() {
  const container = document.getElementById('prayerTimesSchedule');
  if (!container) return;

  const times = [
    { name: 'Fajr', time: '04:45 AM', active: false },
    { name: 'Sunrise', time: '06:05 AM', active: false },
    { name: 'Dhuhr', time: '01:15 PM', active: true },
    { name: 'Asr', time: '04:04 PM', active: false },
    { name: 'Maghrib', time: '06:35 PM', active: false },
    { name: 'Isha', time: '08:00 PM', active: false }
  ];

  container.innerHTML = times.map(t => `
    <div class="prayer-time-item ${t.active ? 'active-prayer' : ''}">
      <div class="p-time-name">${t.name} ${t.active ? '<span style="font-size:0.75rem; margin-left:6px; opacity:0.85;">(Now Active)</span>' : ''}</div>
      <div class="p-time-val">${t.time}</div>
    </div>
  `).join('');
}

// Fetch Backend REST API Data (PDFs, Videos, Wazaif)
async function fetchAllData() {
  try {
    const [resResp, vidResp, wazResp] = await Promise.allSettled([
      fetch('/api/resources').then(r => r.json()),
      fetch('/api/videos').then(r => r.json()),
      fetch('/api/wazaif').then(r => r.json())
    ]);

    if (resResp.status === 'fulfilled' && resResp.value.success) {
      state.resources = resResp.value.data;
      renderResources();
    }

    if (vidResp.status === 'fulfilled' && vidResp.value.success) {
      state.videos = vidResp.value.data;
      renderVideos();
    }

    if (wazResp.status === 'fulfilled' && wazResp.value.success) {
      state.wazaif = wazResp.value.data;
      renderWazaif();
    }
  } catch (err) {
    console.error('Error fetching data:', err);
  }
}

// Render PDF Resources Stack with Category Filtering
function renderResources(filterCategory = 'all') {
  const container = document.getElementById('pdfResourcesStack');
  if (!container) return;

  let items = state.resources || [];
  if (filterCategory && filterCategory !== 'all') {
    items = items.filter(item => item.category === filterCategory);
  }

  if (!items.length) {
    container.innerHTML = `
      <div style="text-align:center; padding: 28px 16px; color:#64748B;">
        <i class="fa-solid fa-file-pdf" style="font-size:2.2rem; color:#CBD5E1; margin-bottom:10px;"></i>
        <p style="font-size:0.9rem; font-weight:600; margin-bottom:10px;">کوئی کتاب دستیاب نہیں ہے</p>
        <a href="/admin" target="_blank" style="color:var(--khizri-navy-primary); font-weight:800; text-decoration:none; font-size:0.84rem;">Open Admin to Upload PDFs</a>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="pdf-item-card">
      <div class="pdf-main-row">
        <div class="pdf-icon-box">
          <i class="fa-solid fa-file-pdf"></i>
        </div>
        <div class="pdf-meta-col">
          <h4 class="pdf-meta-title">${item.title}</h4>
          <p class="pdf-meta-sub">${item.description || 'مستند خضری گائیڈ مع تفصیلی طریقہ کار'}</p>
          <div class="pdf-meta-badges">
            <span class="pdf-badge-tag cat-tag">${item.category || 'Islamic Guide'}</span>
            <span class="pdf-badge-tag">${item.pages ? item.pages + ' Pages' : 'E-Book'}</span>
            <span class="pdf-badge-tag">${item.fileSize || 'PDF'}</span>
          </div>
        </div>
      </div>
      <div class="pdf-card-footer">
        <span class="pdf-dl-count"><i class="fa-solid fa-download"></i> ${item.downloads ? item.downloads.toLocaleString() : '1,200+'} downloads</span>
        <div class="pdf-action-btns">
          <button class="btn-read-pdf" title="Read In-App" onclick="openPdfInApp('${item.title}', '${item.fileUrl}')">
            <i class="fa-solid fa-eye"></i> پڑھیں
          </button>
          <a href="${item.fileUrl}" download="${item.fileName || item.title + '.pdf'}" class="btn-dl-pdf" title="Download PDF">
            <i class="fa-solid fa-download"></i> ڈاؤنلوڈ
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

// PDF Category Filter Buttons
function initPdfFilters() {
  const container = document.getElementById('pdfFilterChips');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const chip = e.target.closest('.p-chip');
    if (!chip) return;

    container.querySelectorAll('.p-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    const filter = chip.getAttribute('data-pdf-filter') || 'all';
    renderResources(filter);
  });
}

// ====================================================
// RENDER VIDEO LIBRARY & HOME FEATURED STRIP
// ====================================================
let currentVideoCategory = 'all';

function renderVideos(filterCategory = null, searchQuery = null) {
  if (filterCategory !== null) currentVideoCategory = filterCategory;
  const search = (searchQuery !== null ? searchQuery : (document.getElementById('videoSearchInput')?.value || '')).trim().toLowerCase();

  const libContainer = document.getElementById('videosLibraryGrid');
  const homeContainer = document.getElementById('homeFeaturedVideosGrid');

  // Filter video list for Library
  let filtered = state.videos || [];
  if (currentVideoCategory && currentVideoCategory !== 'all') {
    filtered = filtered.filter(v => {
      const cat = (v.category || '').toLowerCase();
      const targetCat = currentVideoCategory.toLowerCase();
      if (targetCat.includes('magic')) return cat.includes('magic') || cat.includes('jadu');
      if (targetCat.includes('jinn')) return cat.includes('jinn') || cat.includes('aseb');
      if (targetCat.includes('rohani') || targetCat.includes('ilaj')) return cat.includes('rohani') || cat.includes('ilaj');
      if (targetCat.includes('tasawwuf') || targetCat.includes('irfan')) return cat.includes('tasawwuf') || cat.includes('irfan');
      if (targetCat.includes('wazaif') || targetCat.includes('durood')) return cat.includes('wazaif') || cat.includes('durood');
      if (targetCat.includes('bayan')) return cat.includes('bayan');
      return cat.includes(targetCat);
    });
  }

  if (search) {
    filtered = filtered.filter(v => {
      const t = (v.title || '').toLowerCase();
      const d = (v.description || '').toLowerCase();
      const c = (v.category || '').toLowerCase();
      return t.includes(search) || d.includes(search) || c.includes(search);
    });
  }

  // 1. Render Library Screen (tabVideos)
  if (libContainer) {
    if (!filtered.length) {
      libContainer.innerHTML = `
        <div style="text-align:center; padding:36px 16px; color:#64748B;">
          <i class="fa-solid fa-film" style="font-size:2.4rem; color:#CBD5E1; margin-bottom:12px;"></i>
          <p style="font-size:0.92rem; font-weight:700; margin:0 0 6px;">کوئی ویڈیو نہیں ملی</p>
          <p style="font-size:0.78rem; color:#94A3B8; margin:0;">براہ کرم کوئی دوسرا لفظ تلاش کریں یا تمام ویڈیوز منتخب کریں۔</p>
          <button class="vcat-chip active" style="margin-top:14px;" onclick="filterVideosCategory('all', null)">تمام ویڈیوز دیکھیں</button>
        </div>
      `;
    } else {
      libContainer.innerHTML = filtered.map(v => {
        const safeTitle = (v.title || '').replace(/"/g, '&quot;').replace(/'/g, "\'");
        const safeDesc = (v.description || safeTitle).replace(/"/g, '&quot;').replace(/'/g, "\'");
        const safeSpeaker = (v.speaker || 'Mufti Khizer Mateen').replace(/"/g, '&quot;').replace(/'/g, "\'");
        const catBadge = v.category || 'Khizri Bayan';
        const dur = v.duration || '5:00';
        const thumb = v.thumbnailUrl || `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;
        const ytUrl = v.youtubeUrl || `https://www.youtube.com/watch?v=${v.youtubeId}`;

        return `
          <div class="khizri-video-card">
            <div class="kvc-thumb-container" onclick="openInAppVideo('${v.youtubeId}', '${safeTitle}', '${safeSpeaker}', '${safeDesc}')">
              <img src="${thumb}" alt="${safeTitle}" loading="lazy">
              <span class="kvc-category-pill">${catBadge}</span>
              <span class="kvc-duration-pill"><i class="fa-regular fa-clock"></i> ${dur}</span>
              <div class="kvc-play-button-center">
                <i class="fa-solid fa-play"></i>
              </div>
            </div>
            <div class="kvc-content">
              <h4 class="kvc-title" onclick="openInAppVideo('${v.youtubeId}', '${safeTitle}', '${safeSpeaker}', '${safeDesc}')" style="cursor:pointer;">${v.title}</h4>
              <div class="kvc-meta-row">
                <span class="kvc-speaker"><i class="fa-solid fa-circle-check text-gold"></i> ${v.speaker || 'Mufti Khizer Mateen'}</span>
                <span style="color:#64748B;"><i class="fa-brands fa-youtube text-red"></i> YouTube</span>
              </div>
              <div class="kvc-actions-row">
                <button class="btn-kvc-play" onclick="openInAppVideo('${v.youtubeId}', '${safeTitle}', '${safeSpeaker}', '${safeDesc}')">
                  <i class="fa-solid fa-play"></i> ایپ میں سنیں
                </button>
                <a href="${ytUrl}" target="_blank" class="btn-kvc-yt" title="Open in YouTube App">
                  <i class="fa-brands fa-youtube"></i> یوٹیوب
                </a>
                <button class="btn-kvc-share" onclick="shareVideoWhatsApp('${safeTitle}', '${ytUrl}')" title="Share Video">
                  <i class="fa-brands fa-whatsapp"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // 2. Render Home Strip (Top 4 videos)
  if (homeContainer && state.videos && state.videos.length) {
    const featuredList = state.videos.slice(0, 4);
    homeContainer.innerHTML = featuredList.map(v => {
      const safeTitle = (v.title || '').replace(/"/g, '&quot;').replace(/'/g, "\'");
      const safeDesc = (v.description || safeTitle).replace(/"/g, '&quot;').replace(/'/g, "\'");
      const safeSpeaker = (v.speaker || 'Mufti Khizer Mateen').replace(/"/g, '&quot;').replace(/'/g, "\'");
      const dur = v.duration || '5:00';
      const thumb = v.thumbnailUrl || `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;

      return `
        <div class="hyt-card-item" onclick="openInAppVideo('${v.youtubeId}', '${safeTitle}', '${safeSpeaker}', '${safeDesc}')">
          <div class="hyt-thumb-box">
            <img src="${thumb}" alt="${safeTitle}" loading="lazy">
            <span class="hyt-dur-pill">${dur}</span>
            <div class="hyt-play-icon"><i class="fa-solid fa-play"></i></div>
          </div>
          <div class="hyt-card-title">${v.title}</div>
        </div>
      `;
    }).join('');
  }
}

// In-App Video Playback in modalVideoPlayer
window.openInAppVideo = function(youtubeId, title, speaker = 'Mufti Khizer Mateen', desc = '') {
  const frame = document.getElementById('videoPlayerFrame');
  const titleEl = document.getElementById('videoPlayerTitle');
  const speakerEl = document.getElementById('videoPlayerSpeaker');
  const descEl = document.getElementById('videoPlayerDesc');

  if (frame) {
    frame.src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;
  }
  if (titleEl) titleEl.textContent = title;
  if (speakerEl) speakerEl.textContent = speaker;
  if (descEl) descEl.textContent = desc || title;

  openModal('modalVideoPlayer');
};

// Filter Category
window.filterVideosCategory = function(cat, btn) {
  const chips = document.querySelectorAll('#videoCatFilters .vcat-chip');
  chips.forEach(c => c.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  } else {
    document.querySelector(`#videoCatFilters .vcat-chip[onclick*="${cat}"]`)?.classList.add('active');
  }
  renderVideos(cat);
};

// Live Video Search
window.handleVideoSearch = function(query) {
  const clearBtn = document.getElementById('btnClearVideoSearch');
  if (clearBtn) {
    clearBtn.style.display = query.trim() ? 'block' : 'none';
  }
  renderVideos(currentVideoCategory, query);
};

window.clearVideoSearch = function() {
  const input = document.getElementById('videoSearchInput');
  if (input) input.value = '';
  const clearBtn = document.getElementById('btnClearVideoSearch');
  if (clearBtn) clearBtn.style.display = 'none';
  renderVideos(currentVideoCategory, '');
};

// Share WhatsApp
window.shareVideoWhatsApp = function(title, url) {
  const msg = encodeURIComponent(`*${title}*\nبیان و رہنمائی از مفتی خضر متین (خضری ویز):\n${url}\n\nخضری ویز موبائل ایپ`);
  window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
};

window.shareChannelWhatsApp = function() {
  const msg = encodeURIComponent(`*خضری ویز آفیشل یوٹیوب چینل*\nمفتی خضر متین کے تمام قرآنی بیانات، روحانی علاج اور وظائف دیکھیے:\nhttps://www.youtube.com/@KhizriWays`);
  window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
};

// Render Wazaif with Interactive In-Card Counters and Category Filtering
function renderWazaif(filterCategory = 'all') {
  const container = document.getElementById('wazaifInteractiveStack');
  if (!container) return;

  let items = state.wazaif || [];
  if (filterCategory && filterCategory !== 'all') {
    items = items.filter(w => {
      if (filterCategory === 'Durood Sharif') return w.category && w.category.includes('Durood');
      if (filterCategory === 'Rizq & Barkat') return (w.category && (w.category.includes('Rizq') || w.category.includes('Wealth'))) || w.title.includes('رزق');
      if (filterCategory === 'Rohani Ilaj') return (w.category && (w.category.includes('Shifa') || w.category.includes('Health') || w.category.includes('Rohani'))) || w.title.includes('شفا');
      if (filterCategory === 'Hifazat') return (w.category && (w.category.includes('Hifazat') || w.category.includes('Protection') || w.category.includes('Problem'))) || w.title.includes('حصار');
      return true;
    });
  }

  if (!items.length) {
    container.innerHTML = `
      <div style="text-align:center; padding:28px 16px; color:#64748B;">
        <i class="fa-solid fa-hands-praying" style="font-size:2.2rem; color:#CBD5E1; margin-bottom:10px;"></i>
        <p style="font-size:0.9rem; font-weight:600;">اس کیٹیگری میں وظائف جلد شامل کیے جائیں گے۔</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(w => {
    const targetReps = parseInt(w.repetitions) || 100;
    return `
      <div class="wazifa-interactive-card">
        <div class="wic-header">
          <span class="wic-category-tag"><i class="fa-solid fa-star-and-crescent"></i> ${w.category || 'Khas Wazifa'}</span>
          <span class="wic-timing-tag"><i class="fa-regular fa-clock"></i> ${w.timing || 'صبح و شام'}</span>
        </div>
        <h4 class="wic-title">${w.title}</h4>
        <div class="wic-arabic">${w.arabicText || ''}</div>
        <div class="wic-urdu"><strong>ترجمہ:</strong> ${w.urduTranslation || ''}</div>
        <div class="wic-benefits"><strong>فضیلت و فوائد:</strong> ${w.benefits || 'قلبی سکون اور روحانی برکات کے لیے مجرب عمل۔'}</div>
        <div class="wic-footer">
          <span class="wic-reps-text">تعداد: ${w.repetitions || '100 مرتبہ'}</span>
          <button class="btn-wazifa-tap-counter" onclick="countModuleWazifa(this, ${targetReps})">
            <i class="fa-solid fa-fingerprint"></i> <span class="m-count-val">0</span> / ${targetReps}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Wazaif Category Filter Buttons
function initWazaifFilters() {
  const container = document.getElementById('wazaifFilterChips');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const chip = e.target.closest('.w-chip');
    if (!chip) return;

    container.querySelectorAll('.w-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    const filter = chip.getAttribute('data-filter') || 'all';
    renderWazaif(filter);
  });
}

// Interactive In-Card Counter Function for Spiritual Healing & Wazaif
window.countModuleWazifa = function(btn, target) {
  target = parseInt(target) || 33;
  let current = parseInt(btn.dataset.count) || 0;
  current++;
  btn.dataset.count = current;

  playClickSound();
  if (state.tasbeeh.vibrate && 'vibrate' in navigator) {
    navigator.vibrate(25);
  }

  const valSpan = btn.querySelector('.m-count-val');
  if (valSpan) valSpan.textContent = current;

  if (current >= target) {
    btn.classList.add('completed');
    btn.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span class="m-count-val">${current}</span> / ${target} Complete`;
    if (state.tasbeeh.vibrate && 'vibrate' in navigator) {
      navigator.vibrate([60, 40, 100]);
    }
    showToast(`MashaAllah! Target of ${target} completed!`);
  }
};

// =========================================================
// INTERACTIVE FUNCTIONS: TAWEEZAT, TASAWWUF & KHAWAB
// =========================================================

// Taweezat Filter
window.filterTaweez = function(cat, btn) {
  document.querySelectorAll('#tabTaweezat .filter-chip-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const items = document.querySelectorAll('#tabTaweezat .taweez-item');
  items.forEach(it => {
    if (cat === 'all' || it.getAttribute('data-cat') === cat) {
      it.style.display = 'block';
    } else {
      it.style.display = 'none';
    }
  });
};

// Tasawwuf Muraqaba Timer & Pulse
let muraqabaInterval = null;
let muraqabaRemaining = 300; // 5 minutes in seconds

window.toggleMuraqaba = function() {
  const circle = document.getElementById('muraqabaCircle');
  const icon = document.getElementById('muraqabaIcon');
  const label = document.getElementById('muraqabaBtnLabel');
  const timerDisplay = document.getElementById('muraqabaTimer');
  const breathText = document.getElementById('muraqabaBreathText');

  if (muraqabaInterval) {
    // Stop
    clearInterval(muraqabaInterval);
    muraqabaInterval = null;
    circle?.classList.remove('pulsing');
    if (icon) icon.className = 'fa-solid fa-play';
    if (label) label.textContent = 'مراقبہ جاری رکھیں';
    if (breathText) breathText.textContent = 'مراقبہ روکا گیا';
    showToast('مراقبہ pause کر دیا گیا');
  } else {
    // Start
    circle?.classList.add('pulsing');
    if (icon) icon.className = 'fa-solid fa-pause';
    if (label) label.textContent = 'مراقبہ روکیں (Pause)';
    showToast('مراقبۂ خضریٰ شروع ہو گیا - دھیان اللہ کی طرف رکھیں');

    muraqabaInterval = setInterval(() => {
      if (muraqabaRemaining > 0) {
        muraqabaRemaining--;
        const mins = Math.floor(muraqabaRemaining / 60);
        const secs = muraqabaRemaining % 60;
        if (timerDisplay) {
          timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
        if (breathText) {
          breathText.textContent = muraqabaRemaining % 6 < 3 ? 'سانس لیں (اللہ)' : 'سانس چھوڑیں (ھُو)';
        }
      } else {
        clearInterval(muraqabaInterval);
        muraqabaInterval = null;
        circle?.classList.remove('pulsing');
        if (icon) icon.className = 'fa-solid fa-rotate-right';
        if (label) label.textContent = 'دوبارہ شروع کریں';
        if (breathText) breathText.textContent = 'مراقبہ مکمل ہوا - الحمد للہ';
        muraqabaRemaining = 300;
        showToast('ماشاء اللہ! مراقبہ مکمل ہوا۔');
      }
    }, 1000);
  }
};

// Khawab ki Tabeer Live Search
window.handleKhawabSearch = function(query) {
  const q = query.trim().toLowerCase();
  const cards = document.querySelectorAll('#tabeerCardsList .tabeer-card');
  document.querySelectorAll('#khawabAlphaRow .alpha-btn').forEach(b => b.classList.remove('active'));

  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    const keywords = (card.getAttribute('data-keyword') || '').toLowerCase();
    if (!q || text.includes(q) || keywords.includes(q)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
};

// Khawab Alphabet Filter
window.filterKhawabAlpha = function(letter, btn) {
  document.querySelectorAll('#khawabAlphaRow .alpha-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const searchInput = document.getElementById('khawabSearchInput');
  if (searchInput) searchInput.value = '';

  const cards = document.querySelectorAll('#tabeerCardsList .tabeer-card');
  cards.forEach(card => {
    const cardAlpha = card.getAttribute('data-alpha');
    if (letter === 'all' || cardAlpha === letter) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
};


// ====================================================
// SERVICES SCREEN INTERACTIVITY (CATEGORY & SEARCH)
// ====================================================
window.filterServicesCategory = function(cat, btn) {
  const chips = document.querySelectorAll('#servicesCategoryChips .scat-chip');
  chips.forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const search = (document.getElementById('servicesSearchInput')?.value || '').trim().toLowerCase();
  applyServicesFilter(cat, search);
};

window.handleServicesSearch = function(query) {
  const clearBtn = document.getElementById('btnClearServicesSearch');
  if (clearBtn) {
    clearBtn.style.display = query.trim() ? 'block' : 'none';
  }
  const activeChip = document.querySelector('#servicesCategoryChips .scat-chip.active');
  let currentCat = 'all';
  if (activeChip) {
    const match = activeChip.getAttribute('onclick')?.match(/'([^']+)'/);
    if (match) currentCat = match[1];
  }
  applyServicesFilter(currentCat, query.trim().toLowerCase());
};

window.clearServicesSearch = function() {
  const input = document.getElementById('servicesSearchInput');
  if (input) input.value = '';
  const clearBtn = document.getElementById('btnClearServicesSearch');
  if (clearBtn) clearBtn.style.display = 'none';
  const activeChip = document.querySelector('#servicesCategoryChips .scat-chip.active');
  let currentCat = 'all';
  if (activeChip) {
    const match = activeChip.getAttribute('onclick')?.match(/'([^']+)'/);
    if (match) currentCat = match[1];
  }
  applyServicesFilter(currentCat, '');
};

function applyServicesFilter(cat, search) {
  const cards = document.querySelectorAll('#servicesDetailedList .detailed-service-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-service-cat') || '';
    const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
    const title = (card.querySelector('.dsc-title-group')?.textContent || '').toLowerCase();
    const desc = (card.querySelector('.dsc-desc')?.textContent || '').toLowerCase();

    let matchesCat = (cat === 'all') || (cardCat === cat);
    let matchesSearch = !search || keywords.includes(search) || title.includes(search) || desc.includes(search);

    if (matchesCat && matchesSearch) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}


// ====================================================
// FAST TREATMENT CATEGORY FILTER
// ====================================================
window.filterFastTreatment = function(cat, btn) {
  const chips = document.querySelectorAll('#ftCategoryChips .ft-chip');
  chips.forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const cards = document.querySelectorAll('#fastCardsGrid .ft-card-short');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-ft-cat') || '';
    if (cat === 'all' || cardCat === cat) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
};

// ==========================================
// Customer Stories Filtering
// ==========================================
window.filterCustomerStories = function(category, btnElement) {
  // Update active chip
  const chips = document.querySelectorAll('.cs-category-chips .cs-chip');
  chips.forEach(c => c.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  const cards = document.querySelectorAll('#csCardsList .cs-card-item');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-story-cat');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
};

// ==========================================
// 2-Minute Continuous Engagement Review Popup
// ==========================================
let engagementTimer = null;
const TWO_MINUTES_MS = 120000; // 2 minutes (120 seconds)

function initReviewEngagementTracker() {
  // Check if already shown or dismissed in current session
  if (sessionStorage.getItem('khizri_review_prompt_shown')) {
    return;
  }

  // Set timeout for 2 minutes of continuous app usage
  engagementTimer = setTimeout(() => {
    // Only show if user hasn't reviewed yet and hasn't closed it in this session
    if (!sessionStorage.getItem('khizri_review_prompt_shown') && !localStorage.getItem('khizri_user_reviewed')) {
      if (typeof window.openModal === 'function') {
        window.openModal('modalReviewPrompt');
        sessionStorage.setItem('khizri_review_prompt_shown', 'true');
      }
    }
  }, TWO_MINUTES_MS);
}

window.dismissReviewPrompt = function() {
  if (typeof window.closeModal === 'function') {
    window.closeModal('modalReviewPrompt');
  }
  sessionStorage.setItem('khizri_review_prompt_shown', 'true');
};

window.handleGoogleReviewClick = function() {
  localStorage.setItem('khizri_user_reviewed', 'true');
  sessionStorage.setItem('khizri_review_prompt_shown', 'true');
  if (typeof window.closeModal === 'function') {
    window.closeModal('modalReviewPrompt');
  }
};

// Global helper for manual test trigger
window.showReviewPopup = function() {
  if (typeof window.openModal === 'function') {
    window.openModal('modalReviewPrompt');
  }
};

// Start tracker when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReviewEngagementTracker);
} else {
  initReviewEngagementTracker();
}

// ==========================================
// Islamic Masail & Banuri Town Fatwas Module
// ==========================================
const DEFAULT_BANURI_FATWAS = [
  {
    "id": "fatwa-1",
    "fatwaNumber": "144208200155",
    "title": "کیا قرآنی آیات کا تعویذ لٹکانا اور دم کروانا شرعاً جائز ہے؟",
    "category": "تعویذات و جادو",
    "categoryEn": "Taweez & Rohani Ilaj",
    "darulIfta": "جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی",
    "question": "السلام علیکم! کیا بیماری، نظرِ بد یا حفاظت کے لیے گلے میں قرآنی آیات اور ادعیہ ماثورہ کے تعویذ پہننا جائز ہے؟ کیا یہ شرک کے زمرے میں آتا ہے؟",
    "answer": "الجواب حامداً ومصلیاً:\nاگر تعویذ میں قرآنِ کریم کی آیات، ادعیہ ماثورہ (احادیث میں وارد شدہ دعائیں) یا اللہ تعالیٰ کے اسماءِ حسنیٰ لکھے ہوئے ہوں، اور اس میں کوئی شرکیہ، کفریہ یا نامعلوم کلمات نہ ہوں، نیز اس بات کا پختہ عقیدہ ہو کہ شفا اور نفع و نقصان کا اصل مالک صرف اللہ تعالیٰ ہے اور تعویذ محض ایک ظاہری سبب اور وسیلہ ہے، تو ایسا تعویذ پہننا اور دم کروانا شرعاً بالاتفاق جائز اور درست ہے۔\n\nاحادیثِ مبارکہ میں جس تمیمہ (تعویذ) سے منع فرمایا گیا ہے وہ زمانہ جاہلیت کے شرکیہ اور غیر شرعی تعویذات تھے جن میں بتوں یا نامعلوم جنات کے نام ہوتے تھے۔ لہٰذا خالص قرآنی تعویذ لٹکانا اور شرعی دم کروانا بلا شبہ جائز ہے۔",
    "references": "رد المحتار علی الدر المختار (فتاویٰ شامی): 6/363 • الفتاویٰ الہندیہ: 5/356 • مشکوٰۃ المصابیح، باب التمائم والتمائم",
    "muftiVerification": "مفتیانِ کرام دار الافتاء جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی"
  },
  {
    "id": "fatwa-2",
    "fatwaNumber": "144310200892",
    "title": "کیا استخارہ سے یہ معلوم ہو سکتا ہے کہ جادو کس نے کروایا ہے؟",
    "category": "تعویذات و جادو",
    "categoryEn": "Taweez & Rohani Ilaj",
    "darulIfta": "جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی",
    "question": "کیا استخارہ یا حساب کے ذریعے یہ پتہ چل سکتا ہے کہ ہمارے اوپر جادو کس نے کروایا ہے یا چوری کس نے کی ہے؟ بعض عاملین نام بتاتے ہیں، ان کی بات کی شرعی حیثیت کیا ہے؟",
    "answer": "الجواب حامداً ومصلیاً:\nشرعی استخارہ کسی جائز و مباح کام (مثلاً شادی، نیا کاروبار، یا سفر) میں اللہ تعالیٰ سے خیر اور رہنمائی طلب کرنے کے لیے مسنون ہے، استخارہ غیب کی باتیں معلوم کرنے کا ذریعہ ہرگز نہیں ہے۔\n\nاستخارہ یا کسی نام نہاد عددی حساب سے یہ معلوم نہیں ہو سکتا کہ جادو کس نے کروایا یا چوری کس نے کی ہے۔ غیب کا مطلق علم صرف اللہ تعالیٰ کے پاس ہے۔ نام نہاد عاملین کا کسی شخص کا نام لے کر الزام لگانا محض وہم، قیاس اور جھوٹ پر مبنی ہے جس سے معاشرے میں نفرت، قطع رحمی اور بدگمانیاں پھیلتی ہیں۔ ایسی باتوں کی تصدیق کرنا اور ان پر یقین رکھنا سخت گناہ ہے۔",
    "references": "صحیح البخاری: حدیث نمبر 1162 • روح المعانی للآلوسی: 20/12 • فتاویٰ رحیمیہ: 2/189",
    "muftiVerification": "دار الافتاء جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی"
  },
  {
    "id": "fatwa-3",
    "fatwaNumber": "144105200341",
    "title": "قضا نمازوں کا حساب اور ادا کرنے کا آسان فقہی طریقہ",
    "category": "طہارت و عبادات",
    "categoryEn": "Worship & Taharah",
    "darulIfta": "جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی",
    "question": "میری گزشتہ کئی سالوں کی نمازیں قضا ہو چکی ہیں، اب مجھے توبہ کی توفیق ہوئی ہے۔ قضا نمازوں کا حساب کیسے لگاؤں اور انہیں روزمرہ زندگی میں آسانی سے کیسے ادا کروں؟",
    "answer": "الجواب حامداً ومصلیاً:\nبلوغت کے بعد سے لے کر توبہ کے وقت تک جتنی نمازیں فوت ہوئی ہیں، ان کا غالب گمان اور احتیاط کے ساتھ ایک تخمینہ لگائیں۔ مثلاً اگر 3 سال کی نمازیں قضا ہیں تو روزانہ ہر وقتی نماز کے ساتھ ایک وقتی قضا نماز پڑھنے کا معمول بنا لیں، یعنی فجر کے ساتھ ایک قضا فجر، ظہر کے ساتھ ایک قضا ظہر وغیرہ۔\n\nنیت اس طرح کریں: 'میں اپنی ذمہ باقی تمام فجر کی نمازوں میں سے سب سے پہلی قضا فجر ادا کر رہا ہوں'۔ قضا نمازوں میں وتر کی قضا بھی واجب ہے۔ اس طرح مسلسل قضا ادا کرتے رہیں جب تک دل مطمئن نہ ہو جائے کہ تمام نمازیں ادا ہو چکی ہیں۔",
    "references": "رد المحتار علی الدر المختار: 2/68 • البحر الرائق: 2/86 • الفتاویٰ الہندیہ: 1/121",
    "muftiVerification": "دار الافتاء جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی"
  },
  {
    "id": "fatwa-4",
    "fatwaNumber": "144211200673",
    "title": "کیا بغیر وضو موبائل اسکرین پر قرآنِ مجید چھونا اور پڑھنا جائز ہے؟",
    "category": "طہارت و عبادات",
    "categoryEn": "Worship & Taharah",
    "darulIfta": "جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی",
    "question": "موبائل فون میں قرآنی ایپس ہوتی ہیں، کیا بے وضو حالت میں موبائل کی اسکرین پر قرآنی آیات کو ہاتھ لگانا یا اسکرین اسکرول کرنا جائز ہے؟",
    "answer": "الجواب حامداً ومصلیاً:\nزبانی طور پر بغیر وضو قرآنِ مجید کی تلاوت کرنا جائز ہے بشرطیکہ جنابت (غسل کی ضرورت) نہ ہو۔\n\nجہاں تک موبائل اسکرین کو چھونے کا تعلق ہے، تو جس وقت موبائل اسکرین پر قرآنی آیات واضح طور پر نظر آ رہی ہوں، اس وقت بلا وضو انگلی براہِ راست آیات کے الفاظ پر رکھنا جائز نہیں ہے؛ کیونکہ اسکرین شیشے کا حصہ بن کر قرآنی کلمات کا مظہر ہے۔ البتہ موبائل کے خالی حاشیوں کو چھونا، یا کسی قلم/کور کے ذریعے اسکرول کرنا جائز ہے۔ لیکن ادب اور تقویٰ کا تقاضا یہی ہے کہ قرآن کی تلاوت ہمیشہ باوضو حالت میں کی جائے۔",
    "references": "الدر المختار مع رد المحتار: 1/173 • امداد الفتاویٰ: 1/54 • فتاویٰ بنوری ٹاؤن آن لائن",
    "muftiVerification": "دار الافتاء جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی"
  },
  {
    "id": "fatwa-5",
    "fatwaNumber": "144302200418",
    "title": "شدید غصے کی حالت میں دی گئی طلاق کا شرعی وقوع",
    "category": "نکاح و گھریلو",
    "categoryEn": "Family & Nikah",
    "darulIfta": "جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی",
    "question": "شوہر نے سخت غصے میں آ کر بیوی کو طلاق کے الفاظ کہے، بعد میں کہتا ہے کہ میرا ہوش ٹھکانے نہیں تھا اور غصے میں دی گئی طلاق واقع نہیں ہوتی، اس کی کیا شرعی حقیقت ہے؟",
    "answer": "الجواب حامداً ومصلیاً:\nشریعتِ مطہرہ میں طلاق عام طور پر غصے ہی کی حالت میں دی جاتی ہے، خوشی میں کوئی طلاق نہیں دیتا، لہٰذا محض غصے کا عذر پیش کرنے سے طلاق نہیں رکتی۔\n\nفقہی اصول کے مطابق غصے کی تین حالتیں ہیں: 1) معمولی غصہ: جس میں انسان کو اپنا اور اپنے کلام کا پورا ہوش ہوتا ہے، اس میں طلاق بالاتفاق واقع ہو جاتی ہے۔ 2) انتہائی شدت: جس میں انسان کا حواس باختہ ہو جائے، جنون اور بے ہوشی جیسی کیفیت طاری ہو جائے اور اسے پتہ ہی نہ چلے کہ اس نے کیا بولا ہے، اس نادر حالت میں طلاق واقع نہیں ہوتی۔ 3) درمیانی حالت: اس میں بھی راجح قول کے مطابق طلاق واقع ہو جاتی ہے۔ لہٰذا ایسے حساس معاملات میں زبانی بیان کی بجائے باقاعدہ فریقین کا دارالافتاء تشریف لانا ضروری ہوتا ہے۔",
    "references": "رد المحتار علی الدر المختار: 3/243 • الفتاویٰ الہندیہ: 1/353 • فتاویٰ دار العلوم دیوبند: 9/27",
    "muftiVerification": "دار الافتاء جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی"
  },
  {
    "id": "fatwa-6",
    "fatwaNumber": "144406200529",
    "title": "ڈراپ شپنگ اور آن لائن ای کامرس بزنس کا شرعی ضابطہ",
    "category": "کاروبار و مال",
    "categoryEn": "Business & Finance",
    "darulIfta": "جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی",
    "question": "آن لائن کاروبار (مثلاً ڈراپ شپنگ) جس میں بیچنے والے کے پاس مال موجود نہیں ہوتا، آرڈر ملنے پر تیسری پارٹی سے کسٹمر کو بھیجتا ہے اور منافع رکھتا ہے، کیا یہ شرعاً جائز ہے؟",
    "answer": "الجواب حامداً ومصلیاً:\nرسول اللہ ﷺ کا واضح ارشادِ گرامی ہے: «لَا تَبِعْ مَا لَيْسَ عِنْدَكَ» یعنی جو چیز تمہاری ملکیت اور قبضے میں نہ ہو اسے فروخت نہ کرو (سنن ابوداؤد: 3503)۔\n\nڈراپ شپنگ کی مروجہ صورت جس میں سیلر کے پاس مال کا قبضہ نہیں ہوتا اور وہ سودا پکا کر کے کسٹمر سے رقم لے لیتا ہے، وہ ناجائز اور بیع قبل القبض ہے۔ اس کو شرعی بنانے کی دو جائز صورتیں ہیں: 1) وکالت (کمیشن ایجنسی): سیلر خریدار کو صاف بتا دے کہ میں مال بیچ نہیں رہا بلکہ آپ کے لیے خرید کر پہنچانے کا وکیل ہوں اور اس خدمت کی طے شدہ فیس لوں گا۔ 2) وعدۂ بیع: کسٹمر سے صرف مال منگوانے کا وعدہ کرے، پھر اصل سپلائر سے مال خرید کر اپنے وکیل یا اپنے قبضے میں لینے کے بعد کسٹمر کو باقاعدہ فروخت کرے۔",
    "references": "بدائع الصنائع فی ترتیب الشرائع: 5/147 • فتح القدیر للسیواسی: 6/514 • فتاویٰ عثمانی: 3/112",
    "muftiVerification": "دار الافتاء جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی"
  },
  {
    "id": "fatwa-7",
    "fatwaNumber": "144109200215",
    "title": "نظرِ بد (نظر لگنا) کا شرعی ثبوت اور مسنون نبوی علاج",
    "category": "تعویذات و جادو",
    "categoryEn": "Taweez & Rohani Ilaj",
    "darulIfta": "جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی",
    "question": "کیا نظر لگنا برحق ہے؟ اگر کسی بچے یا بڑے کو نظر لگ جائے تو شریعت میں اس کے توڑ کا کیا مسنون طریقہ بیان ہوا ہے؟",
    "answer": "الجواب حامداً ومصلیاً:\nرسول اللہ ﷺ کا فرمانِ عالیشان ہے: «العَيْنُ حَقٌّ» یعنی نظر کا لگنا برحق ہے (صحیح البخاری: 5740)۔ حاسد کی بد نگاہی اور زہریلے اثرات سے انسان، جانور اور مال متاثر ہو سکتے ہیں۔\n\nنظرِ بد کے مسنون علاج درج ذیل ہیں:\n1. سورۃ الفاتحہ، آیت الکرسی اور معوذتین (سورۃ الفلق اور سورۃ الناس) 3، 3 بار پڑھ کر دم کریں اور پانی پر دم کر کے پلائیں۔\n2. مسنون نبوی دعا: «أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ» روزانہ صبح و شام 3 بار پڑھیں۔\n3. اگر نظر لگانے والا معلوم ہو تو حدیث کے مطابق اس کے وضو یا ہاتھ منہ دھونے کا پانی لے کر مریض کے سر و پیٹھ پر بہانا بھی مجرب و مسنون ہے۔ مرچیں جلانا وغیرہ حدیث سے ثابت نہیں، لیکن اگر کوئی شرکیہ کلمات نہ ہوں تو مباح علاج کے طور پر حرج نہیں۔",
    "references": "صحیح البخاری: کتاب الطب • مشکوٰۃ المصابیح: 2/387 • فتح الباری لابن حجر: 10/203",
    "muftiVerification": "دار الافتاء جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی"
  },
  {
    "id": "fatwa-8",
    "fatwaNumber": "144204200762",
    "title": "بینک کے سودی منافع سے چھٹکارے اور خلاصی کا شرعی طریقہ",
    "category": "کاروبار و مال",
    "categoryEn": "Business & Finance",
    "darulIfta": "جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی",
    "question": "بینک میں جمع شدہ رقم پر جو سود آتا ہے اس کا کیا کیا جائے؟ کیا اس سودی رقم کو ٹیکس ادا کرنے یا اپنے کسی خرچ میں استعمال کیا جا سکتا ہے؟",
    "answer": "الجواب حامداً ومصلیاً:\nسود لینا اور دینا دونوں شریعت میں قطعی حرام اور اللہ اور اس کے رسول ﷺ کے خلاف اعلانِ جنگ کے مترادف ہیں (سورۃ البقرہ: 279)۔\n\nاگر بینک نے اکاؤنٹ میں سود کی رقم جمع کر دی ہے تو اسے اپنے ذاتی استعمال، گھریلو خرچ، یا اپنے ذمہ عائد ٹیکس و یوٹیلیٹی بلز کی ادائیگی میں استعمال کرنا ہرگز جائز نہیں ہے۔ اس سودی رقم سے خلاصی کی شرعی صورت یہ ہے کہ اسے ثواب کی نیت کے بغیر کسی مستحقِ زکوٰۃ غریب، مسکین یا لاوارث مریض کو دے دیا جائے، یا کسی عمومی رفاہی کام میں بغیر نیتِ ثواب خرچ کر دیا جائے تاکہ اس حرام مال کے وبال سے جان چھوٹ جائے۔",
    "references": "الفتاویٰ الہندیہ (عالمگیری): 5/349 • رد المحتار: 5/99 • فتاویٰ بنوری ٹاؤن، فتویٰ نمبر 144204200762",
    "muftiVerification": "دار الافتاء جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی"
  },
  {
    "id": "fatwa-9",
    "fatwaNumber": "144308200194",
    "title": "خوابوں کی شرعی حیثیت اور برے خواب سے حفاظت کے آداب",
    "category": "متفرق مسائل",
    "categoryEn": "General Fiqh",
    "darulIfta": "جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی",
    "question": "کیا اچھے یا برے خوابوں کی تعبیر ہر کسی کو بتانا درست ہے؟ برے خواب دیکھنے پر شریعت کیا رہنمائی فرماتی ہے؟",
    "answer": "الجواب حامداً ومصلیاً:\nنبی کریم ﷺ نے فرمایا: خواب تین قسم کے ہوتے ہیں: 1) رحمانی خواب: جو سچے اور بشارت پر مبنی ہوتے ہیں۔ 2) شیطانی خواب: جو انسان کو پریشان اور غمگین کرنے کے لیے شیطان کی طرف سے وسوسہ ہوتے ہیں۔ 3) نفسانی خواب: جو دن بھر کے خیالات اور سوچوں کا عکس ہوتے ہیں (صحیح مسلم: 2261)۔\n\nاگر کوئی برا یا ڈراونا خواب دیکھے تو مسنون طریقہ یہ ہے کہ: بائیں جانب تین مرتبہ ہلکی سی تھتکار کرے، تین بار اعوذ باللہ پڑھے، اپنی کروٹ تبدیل کر لے، اور اگر چاہے تو اٹھ کر دو رکعت نفل پڑھ لے۔ سب سے اہم بات یہ کہ برا خواب کسی سے ہرگز بیان نہ کرے، تو وہ اسے کچھ نقصان نہیں پہنچائے گا۔ اچھا خواب صرف کسی دیندار، مخلص اور علم والے معبر سے بیان کیا جائے۔",
    "references": "صحیح مسلم: کتاب الرؤیا • مرقاۃ المفاتیح شرح مشکوٰۃ المصابیح: 8/362 • فتاویٰ محمودیہ: 19/335",
    "muftiVerification": "دار الافتاء جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی"
  },
  {
    "id": "fatwa-10",
    "fatwaNumber": "144112200481",
    "title": "گھر میں جنات و شیاطین کے اثرات سے حفاظت کا مسنون نبوی نسخہ",
    "category": "تعویذات و جادو",
    "categoryEn": "Taweez & Rohani Ilaj",
    "darulIfta": "جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی",
    "question": "جس گھر میں آسیب یا جنات کی شکایت ہو، یا برتن گرنے اور پراسرار آوازیں آنے کی پریشانی ہو، اس گھر کو پاک کرنے کا کیا شرعی طریقہ ہے؟",
    "answer": "الجواب حامداً ومصلیاً:\nجنات اور شیاطین کے شر سے گھر کو محفوظ رکھنے کے لیے مستند نبوی تعلیمات درج ذیل ہیں:\n1. گھر میں سورۃ البقرہ کی باقاعدگی سے تلاوت کی جائے۔ رسول اللہ ﷺ نے فرمایا: 'اپنے گھروں کو قبرستان نہ بناؤ، شیطان اس گھر سے بھاگ جاتا ہے جس میں سورۃ البقرہ پڑھی جاتی ہے' (صحیح مسلم: 780)۔\n2. صبح و شام آیت الکرسی پڑھنے کا اہتمام کریں۔\n3. گھر میں داخل ہوتے وقت اور کھانا کھاتے وقت بسم اللہ پڑھیں، اس سے شیطان گھر میں داخل ہونے اور کھانے میں شریک ہونے سے محروم ہو جاتا ہے۔\n4. جاندار کی تصاویر اور گانے باجے سے گھر کو پاک رکھیں، کیونکہ جس گھر میں تصویر یا کتا ہو وہاں رحمت کے فرشتے داخل نہیں ہوتے۔\n5. پانی پر سورۃ الفاتحہ، آیت الکرسی اور چاروں قل دم کر کے گھر کے کونوں میں چھڑکنا بھی مباح اور موثر علاج ہے۔",
    "references": "صحیح مسلم: 780 • سنن ابوداؤد: 5096 • رد المحتار علی الدر المختار: 1/385",
    "muftiVerification": "دار الافتاء جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی"
  },
  {
    "id": "fatwa-11",
    "fatwaNumber": "144401200326",
    "title": "ٹیٹو (Tattoo) اور ناخن پالش کے ساتھ وضو اور نماز کا شرعی حکم",
    "category": "طہارت و عبادات",
    "categoryEn": "Worship & Taharah",
    "darulIfta": "جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی",
    "question": "کیا جسم پر مستقل ٹیٹو بنوانا جائز ہے؟ اور کیا ناخن پالش یا کاسمیٹکس لگے ہونے کی صورت میں وضو اور نماز ہو جاتی ہے؟",
    "answer": "الجواب حامداً ومصلیاً:\nجسم کی کھال میں سوئیاں چھو کر رنگ بھرنا (مستقل ٹیٹو / گودنا) شریعتِ اسلامیہ میں قطعی ناجائز اور حرام ہے، رسول اللہ ﷺ نے ٹیٹو بنانے والی اور بنوانے والی دونوں پر لعنت فرمائی ہے (صحیح البخاری: 5937)۔ اگر کسی نے بنوا لیا ہو تو صدقِ دل سے توبہ کرے اور اگر آسانی سے بغیر نقصان کے مٹ سکتا ہو تو مٹوا لے۔\n\nجہاں تک ناخن پالش کا تعلق ہے، تو چونکہ عام نیل پالش ایک ٹھوس تہہ جما دیتی ہے جو ناخن تک پانی پہنچنے سے مانع ہوتی ہے، لہٰذا نیل پالش لگے ہوئے وضو یا غسل ہرگز صحیح نہیں ہوتا، اور جب وضو نہ ہو تو نماز بھی ادا نہیں ہوتی۔ وضو سے پہلے نیل پالش کو مکمل طور پر چھڑانا لازم ہے۔ البتہ قدرتی مہندی کا رنگ لگانے سے وضو ہو جاتا ہے کیونکہ اس کی کوئی موٹی تہہ نہیں بنتی۔",
    "references": "صحیح البخاری: کتاب اللباس • الدر المختار مع رد المحتار: 1/154 • الفتاویٰ الہندیہ: 1/4",
    "muftiVerification": "دار الافتاء جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی"
  },
  {
    "id": "fatwa-12",
    "fatwaNumber": "144209200812",
    "title": "والدین کی رضامندی کے بغیر خفیہ نکاح یا کورٹ میرج کی شرعی حیثیت",
    "category": "نکاح و گھریلو",
    "categoryEn": "Family & Nikah",
    "darulIfta": "جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی",
    "question": "لڑکا اور لڑکی اگر والدین کو بتائے بغیر خفیہ طور پر دو گواہوں کی موجودگی میں کورٹ میرج کر لیں، تو کیا یہ نکاح شرعاً منعقد ہو جاتا ہے؟",
    "answer": "الجواب حامداً ومصلیاً:\nاگر عاقل اور بالغ لڑکا اور لڑکی دو مسلمان عاقل بالغ مرد گواہوں (یا ایک مرد اور دو عورتوں) کی موجودگی میں ایجاب و قبول کر لیں، تو فقہ حنفی کے مفتیٰ بہ قول کے مطابق نکاح شرعاً منعقد ہو جاتا ہے۔\n\nلیکن والدین کو لاعلم رکھ کر چھپ کر نکاح کرنا یا کورٹ میرج کرنا شریعت اور اخلاق کی رو سے سخت قبیح، ناپسندیدہ اور خاندانی بے برکتی کا باعث ہے۔ نیز اس میں ایک اہم شرعی شرط 'کفاءت' (یعنی لڑکے کا لڑکی کے خاندان اور دین داری میں ہم پلہ ہونا) اور 'مہرِ مثل' ہے۔ اگر لڑکی نے غیر کفو میں یا مہرِ مثل سے کم پر والدین کی اجازت کے بغیر نکاح کیا ہو، تو لڑکی کے ولی (والد وغیرہ) کو عدالت کے ذریعے اس نکاح کو فسخ کروانے کا شرعی حق حاصل ہوتا ہے۔ لہٰذا والدین کی سرپرستی اور برکت کے ساتھ ہی نکاح کرنا چاہیے۔",
    "references": "الدر المختار مع رد المحتار: 3/56 • بدائع الصنائع: 2/317 • الفتاویٰ الہندیہ: 1/292",
    "muftiVerification": "دار الافتاء جامعہ علوم اسلامیہ علامہ بنوری ٹاؤن، کراچی"
  }
];

state.fatwas = [...DEFAULT_BANURI_FATWAS];
let currentActiveFatwa = null;
let currentMasailCat = 'all';
let currentMasailQuery = '';

async function fetchFatwas() {
  try {
    const res = await fetch('/api/fatwas').then(r => r.json());
    if (res.success && res.data && res.data.length > 0) {
      state.fatwas = res.data;
      renderMasailMiniButtons();
    }
  } catch (err) {
    console.warn('Using local pre-loaded Banuri Town fatwas:', err);
  }
}

function renderMasailMiniButtons() {
  const container = document.getElementById('masailButtonsGrid');
  if (!container) return;

  let items = (state.fatwas && state.fatwas.length > 0) ? state.fatwas : DEFAULT_BANURI_FATWAS;

  // Filter by category
  if (currentMasailCat && currentMasailCat !== 'all') {
    items = items.filter(f => f.category === currentMasailCat || f.categoryEn === currentMasailCat);
  }

  // Filter by search query
  if (currentMasailQuery && currentMasailQuery.trim()) {
    const q = currentMasailQuery.trim().toLowerCase();
    items = items.filter(f => 
      (f.title && f.title.toLowerCase().includes(q)) ||
      (f.question && f.question.toLowerCase().includes(q)) ||
      (f.answer && f.answer.toLowerCase().includes(q)) ||
      (f.fatwaNumber && f.fatwaNumber.includes(q)) ||
      (f.category && f.category.includes(q))
    );
  }

  if (!items.length) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px 16px; color:#94A3B8;">
        <i class="fa-solid fa-file-circle-question" style="font-size:2.2rem; margin-bottom:8px; color:#CBD5E1;"></i>
        <h4 style="margin:0 0 4px 0; color:#0F172A; font-size:0.95rem;">کوئی مسئلہ نہیں ملا</h4>
        <p style="margin:0; font-size:0.8rem;">براہ کرم کوئی دوسرا لفظ لکھ کر تلاش کریں یا واٹس ایپ پر دریافت کریں۔</p>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map((f, idx) => `
    <div class="fatwa-mini-btn" onclick="openFatwaDetail('${f.id}')" title="فتویٰ دیکھیں: ${f.title}">
      <div class="fmb-left">
        <span class="fmb-icon"><i class="fa-solid fa-book-open"></i></span>
        <div class="fmb-title-wrap">
          <h4 class="fmb-title">${f.title}</h4>
          <div class="fmb-tags">
            <span class="fmb-cat-tag">${f.category}</span>
            <span class="fmb-no-tag">فتویٰ نمبر: ${f.fatwaNumber}</span>
          </div>
        </div>
      </div>
      <i class="fa-solid fa-chevron-left fmb-arrow"></i>
    </div>
  `).join('');
}

window.filterMasailCategory = function(cat, btn) {
  currentMasailCat = cat;
  const chips = document.querySelectorAll('#masailFilterChips .m-chip');
  chips.forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderMasailMiniButtons();
};

window.handleMasailSearch = function(query) {
  currentMasailQuery = query;
  const clearBtn = document.getElementById('btnClearMasailSearch');
  if (clearBtn) {
    clearBtn.style.display = query.trim() ? 'block' : 'none';
  }
  renderMasailMiniButtons();
};

window.clearMasailSearch = function() {
  const input = document.getElementById('masailSearchInput');
  if (input) input.value = '';
  window.handleMasailSearch('');
};

window.openFatwaDetail = function(fatwaId) {
  const allFatwas = (state.fatwas && state.fatwas.length > 0) ? state.fatwas : DEFAULT_BANURI_FATWAS;
  const fatwa = allFatwas.find(f => f.id === fatwaId || f.fatwaNumber === fatwaId);
  if (!fatwa) return;

  currentActiveFatwa = fatwa;

  const elNo = document.getElementById('fmdFatwaNo');
  const elCat = document.getElementById('fmdCategory');
  const elTitle = document.getElementById('fmdTitle');
  const elQ = document.getElementById('fmdQuestion');
  const elAns = document.getElementById('fmdAnswer');
  const elRef = document.getElementById('fmdReferences');

  if (elNo) elNo.textContent = 'فتویٰ نمبر: ' + fatwa.fatwaNumber;
  if (elCat) elCat.textContent = fatwa.category;
  if (elTitle) elTitle.textContent = fatwa.title;
  if (elQ) elQ.textContent = fatwa.question;
  if (elAns) elAns.textContent = fatwa.answer;
  if (elRef) elRef.textContent = fatwa.references || 'فتاویٰ شامی، عالمگیری، دار الافتاء بنوری ٹاؤن';

  if (typeof window.openModal === 'function') {
    window.openModal('modalFatwaDetail');
  }
};

window.askFatwaWhatsApp = function() {
  if (currentActiveFatwa) {
    const msg = `السلام علیکم مفتی صاحب، مجھے دار الافتاء بنوری ٹاؤن کے فتویٰ نمبر ${currentActiveFatwa.fatwaNumber} ("${currentActiveFatwa.title}") کے حوالے سے مزید مسئلہ پوچھنا ہے۔`;
    openWhatsAppConsult(msg);
  } else {
    openWhatsAppConsult('السلام علیکم مفتی صاحب، مجھے ایک شرعی مسئلہ دریافت کرنا ہے۔');
  }
};

// Auto-render on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    renderMasailMiniButtons();
    fetchFatwas();
  });
} else {
  renderMasailMiniButtons();
  fetchFatwas();
}
