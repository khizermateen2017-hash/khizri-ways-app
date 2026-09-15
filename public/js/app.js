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
  currentLang: localStorage.getItem('khizri_app_lang_v3') || 'en',
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
    featQuran: 'Quran<br>Majeed',
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
    featMasail: 'Deeni<br>Masail',
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
    featMasail: 'دینی<br>مسائل',
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

// (startApp moved to bottom of file)

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
  localStorage.setItem('khizri_app_lang_v3', lang);
  document.body.classList.toggle('lang-ur', lang === 'ur');

  const t = i18n[lang] || i18n.en;

  // Toggle button labels:
  // In English mode, show "اردو" so user can click to switch to Urdu
  // In Urdu mode, show "English" so user can click to switch to English
  const toggleBtnText = document.getElementById('langToggleText');
  const desktopBtnText = document.getElementById('desktopLangText');
  if (toggleBtnText) toggleBtnText.textContent = (lang === 'en' ? 'اردو' : 'English');
  if (desktopBtnText) desktopBtnText.textContent = (lang === 'en' ? 'اردو' : 'English');

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

  // Search input placeholders
  const khawabSearchInput = document.getElementById('khawabSearchInput');
  if (khawabSearchInput) {
    khawabSearchInput.placeholder = (lang === 'en' 
      ? 'Search dream interpretations (e.g. water, snake, kaaba...)' 
      : 'خواب تلاش کریں (مثلاً: پانی، سانپ، کعبہ، پرواز...)');
  }

  // Dynamic lists re-render for active language
  if (typeof renderWazaif === 'function') {
  // Update Wazaif Filter Chips text
  document.querySelectorAll('#wazaifFilterChips .w-chip').forEach(chip => {
    const ur = chip.getAttribute('data-ur');
    const en = chip.getAttribute('data-en');
    if (lang === 'ur' && ur) chip.textContent = ur;
    else if (lang === 'en' && en) chip.textContent = en;
  });

    renderWazaif(state.activeWazaifFilter || 'all_folders');
  }
  if (typeof populatePrayerTimes === 'function') {
    populatePrayerTimes();
  }

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
        if (typeof window.initCountryDropdowns === 'function' && data.country) {
          window.initCountryDropdowns(data.country);
        }
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
    if (targetId === 'tabQuran') { if (typeof populateSurahs === 'function') populateSurahs(); }
    if (targetId === 'tabWazaif') { renderWazaif(state.activeWazaifFilter || 'all_folders'); }

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
// =========================================================================
// COMPLETE 114 SURAHS & 30 PARAS INTERACTIVE QURAN ENGINE
// =========================================================================

let quranCurrentSurahNum = 1;
let quranArabicFontSize = 1.45; // in rem
let quranCurrentAudio = null;
let quranIsAudioPlaying = false;
let quranCurrentTabFilter = 'all';

function populateSurahs(filteredList) {
  const container = document.getElementById('quranSurahList');
  if (!container) return;

  const list = filteredList || window.QURAN_SURAHS;
  if (!list || !list.length) {
    if (!filteredList && (!window.QURAN_SURAHS || !window.QURAN_SURAHS.length)) {
      if (!window._surahRetryCount) window._surahRetryCount = 0;
      if (window._surahRetryCount++ < 10) {
        setTimeout(() => populateSurahs(), 150);
      }
      return;
    }
    container.innerHTML = '<div style="text-align:center; padding:30px; color:#64748B;">کوئی سورت نہیں ملی (No Surah found)</div>';
    return;
  }

  container.innerHTML = list.map(s => {
    const isPlaying = (quranCurrentSurahNum === s.num && quranIsAudioPlaying);
    const typeBadge = s.type === 'Makki' 
      ? '<span class="surah-type-tag tag-makki">مکی</span>' 
      : '<span class="surah-type-tag tag-madani">مدنی</span>';

    return `
      <div class="surah-card-row" onclick="openSurahReader(${s.num})">
        <div class="surah-card-left">
          <div class="surah-num-badge">${s.num}</div>
          <div class="surah-info-col">
            <div class="surah-eng-name">
              ${s.name} ${typeBadge}
            </div>
            <div class="surah-meaning">${s.meaning} • ${s.verses} Verses</div>
          </div>
        </div>
        <div class="surah-card-right">
          <div class="surah-arabic-title">${s.ar}</div>
          <button class="btn-card-action btn-surah-play" onclick="event.stopPropagation(); playSurahTilawat(${s.num})" title="Listen Tilawat">
            <i class="fa-solid ${isPlaying ? 'fa-pause text-emerald' : 'fa-play'}"></i>
          </button>
          <button class="btn-card-action btn-surah-read" onclick="event.stopPropagation(); openSurahReader(${s.num})" title="Read Surah">
            <i class="fa-solid fa-book-open"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function populateParas() {
  const container = document.getElementById('quranParasList');
  if (!container) return;

  const list = window.QURAN_PARAS || [];
  container.innerHTML = list.map(p => `
    <div class="para-card-row" onclick="jumpToParaStart('${p.start}')">
      <div style="display:flex; align-items:center; gap:12px;">
        <div class="surah-num-badge" style="background:#FEF9C3; color:#854D0E; border-color:#FDE047;">${p.num}</div>
        <div>
          <div style="font-weight:800; font-size:0.92rem; color:#0F172A;">Juz ${p.num}: ${p.engName}</div>
          <div style="font-size:0.72rem; color:#64748B; margin-top:2px;">${p.start} ➔ ${p.end}</div>
        </div>
      </div>
      <div class="para-arabic-title">${p.name}</div>
    </div>
  `).join('');
}

window.jumpToParaStart = function(startDesc) {
  // Switch back to all surahs tab and filter/scroll
  filterQuranTab('all', document.getElementById('chipAllSurahs'));
  showToast(`Juz start: ${startDesc}`);
};

window.filterQuranTab = function(tab, btn) {
  quranCurrentTabFilter = tab;
  document.querySelectorAll('.quran-chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const surahList = document.getElementById('quranSurahList');
  const parasList = document.getElementById('quranParasList');

  if (tab === 'paras') {
    if (surahList) surahList.style.display = 'none';
    if (parasList) {
      parasList.style.display = 'block';
      populateParas();
    }
  } else {
    if (parasList) parasList.style.display = 'none';
    if (surahList) surahList.style.display = 'flex';

    if (tab === 'all') {
      populateSurahs(window.QURAN_SURAHS);
    } else if (tab === 'Makki' || tab === 'Madani') {
      const filtered = (window.QURAN_SURAHS || []).filter(s => s.type === tab);
      populateSurahs(filtered);
    }
  }
};

window.handleQuranSearch = function(query) {
  const q = (query || '').trim().toLowerCase();
  const clearBtn = document.getElementById('btnClearQuranSearch');
  if (clearBtn) clearBtn.style.display = q ? 'inline-block' : 'none';

  if (!q) {
    filterQuranTab(quranCurrentTabFilter, document.querySelector('.quran-chip.active'));
    return;
  }

  // Switch to surah list
  const surahList = document.getElementById('quranSurahList');
  const parasList = document.getElementById('quranParasList');
  if (surahList) surahList.style.display = 'flex';
  if (parasList) parasList.style.display = 'none';

  const numQ = parseInt(q, 10);
  const matched = (window.QURAN_SURAHS || []).filter(s => {
    if (!isNaN(numQ) && s.num === numQ) return true;
    return s.name.toLowerCase().includes(q) ||
      s.ar.includes(q) ||
      (s.urName && s.urName.includes(q)) ||
      (s.meaning && s.meaning.toLowerCase().includes(q));
  });

  populateSurahs(matched);
};

window.clearQuranSearch = function() {
  const input = document.getElementById('quranSearchInput');
  if (input) input.value = '';
  handleQuranSearch('');
};

// =========================================================================
// QURAN AUDIO TILAWAT PLAYBACK (Mishary Rashid Alafasy)
// =========================================================================

window.playSurahTilawat = function(num) {
  const surah = (window.QURAN_SURAHS || []).find(s => s.num === num);
  if (!surah) return;

  const pad = String(num).padStart(3, '0');
  const audioUrl = `https://server8.mp3quran.net/afs/${pad}.mp3`;

  // If already playing this surah, toggle play/pause
  if (quranCurrentSurahNum === num && quranCurrentAudio) {
    if (quranIsAudioPlaying) {
      quranCurrentAudio.pause();
      quranIsAudioPlaying = false;
      updateAudioUiStates(false, surah);
      return;
    } else {
      quranCurrentAudio.play().catch(e => console.log(e));
      quranIsAudioPlaying = true;
      updateAudioUiStates(true, surah);
      return;
    }
  }

  // Stop old audio if playing
  if (quranCurrentAudio) {
    quranCurrentAudio.pause();
    quranCurrentAudio = null;
  }

  quranCurrentSurahNum = num;
  const audio = new Audio(audioUrl);
  quranCurrentAudio = audio;
  quranIsAudioPlaying = true;

  audio.play().then(() => {
    updateAudioUiStates(true, surah);
    showToast(`تلاوت سورة ${surah.ar} - مشاری راشد العفاسی`);
  }).catch(err => {
    console.log('Audio autoplay prevented:', err);
    updateAudioUiStates(false, surah);
  });

  audio.ontimeupdate = function() {
    const cur = formatAudioTime(audio.currentTime);
    const dur = formatAudioTime(audio.duration || 0);
    const timeEl = document.getElementById('readerAudioTime');
    if (timeEl) timeEl.textContent = `${cur} / ${dur}`;
  };

  audio.onended = function() {
    quranIsAudioPlaying = false;
    updateAudioUiStates(false, surah);
    // Auto advance to next surah
    if (num < 114) {
      playSurahTilawat(num + 1);
    }
  };

  audio.onerror = function() {
    quranIsAudioPlaying = false;
    updateAudioUiStates(false, surah);
    showToast('آڈیو لوڈ کرنے میں دشواری، براہِ کرم انٹرنیٹ کنکشن چیک کریں۔');
  };
};

function formatAudioTime(sec) {
  if (isNaN(sec) || sec === Infinity) return '00:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updateAudioUiStates(isPlaying, surah) {
  // 1. Floating Mini Bar
  const floatingBar = document.getElementById('quranFloatingPlayer');
  const qfbTitle = document.getElementById('qfbSurahTitle');
  const iconQfbPlay = document.getElementById('iconQfbPlay');

  if (floatingBar && surah) {
    floatingBar.style.display = 'flex';
    if (qfbTitle) qfbTitle.textContent = `Surah ${surah.name} (${surah.ar})`;
    if (iconQfbPlay) {
      iconQfbPlay.className = isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';
    }
  }

  // 2. Reader Modal Audio Strip
  const iconReader = document.getElementById('iconReaderAudio');
  if (iconReader) {
    iconReader.className = isPlaying ? 'fa-solid fa-pause' : 'fa-solid fa-play';
  }

  // 3. Update Surah card list button state
  populateSurahs();
}

window.toggleGlobalQuranAudio = function() {
  if (!quranCurrentAudio) {
    playSurahTilawat(quranCurrentSurahNum);
    return;
  }
  if (quranIsAudioPlaying) {
    quranCurrentAudio.pause();
    quranIsAudioPlaying = false;
  } else {
    quranCurrentAudio.play().catch(e => console.log(e));
    quranIsAudioPlaying = true;
  }
  const surah = (window.QURAN_SURAHS || []).find(s => s.num === quranCurrentSurahNum);
  updateAudioUiStates(quranIsAudioPlaying, surah);
};

window.stopGlobalQuranAudio = function() {
  if (quranCurrentAudio) {
    quranCurrentAudio.pause();
    quranCurrentAudio.currentTime = 0;
    quranCurrentAudio = null;
  }
  quranIsAudioPlaying = false;
  const floatingBar = document.getElementById('quranFloatingPlayer');
  if (floatingBar) floatingBar.style.display = 'none';
  const surah = (window.QURAN_SURAHS || []).find(s => s.num === quranCurrentSurahNum);
  updateAudioUiStates(false, surah);
};

window.toggleReaderAudio = function() {
  toggleGlobalQuranAudio();
};

window.downloadSurahMp3 = function() {
  const pad = String(quranCurrentSurahNum).padStart(3, '0');
  const url = `https://server8.mp3quran.net/afs/${pad}.mp3`;
  window.open(url, '_blank');
};

// =========================================================================
// SURAH READER (Interactive Modal with Arabic Uthmani & Urdu Translation)
// =========================================================================

window.openSurahReader = function(num) {
  quranCurrentSurahNum = num;
  const surah = (window.QURAN_SURAHS || []).find(s => s.num === num);
  if (!surah) return;

  const modal = document.getElementById('modalSurahReader');
  if (modal) modal.classList.add('active');

  // Set titles
  const titleEl = document.getElementById('readerSurahTitle');
  const subEl = document.getElementById('readerSurahSub');
  if (titleEl) titleEl.textContent = `Surah ${surah.name} (${surah.ar})`;
  if (subEl) subEl.textContent = `${surah.meaning} • ${surah.verses} Verses • ${surah.type === 'Makki' ? 'مکی (Makki)' : 'مدنی (Madani)'}`;

  // Update audio controls in reader
  updateAudioUiStates(quranIsAudioPlaying, surah);

  // Load Ayahs
  loadSurahAyahs(num, surah);
};

window.closeSurahReader = function() {
  const modal = document.getElementById('modalSurahReader');
  if (modal) modal.classList.remove('active');
};

window.reopenCurrentSurahReader = function() {
  openSurahReader(quranCurrentSurahNum);
};

window.changeArabicFontSize = function(delta) {
  quranArabicFontSize = Math.max(1.1, Math.min(2.5, quranArabicFontSize + (delta * 0.1)));
  document.querySelectorAll('.ayah-arabic-text').forEach(el => {
    el.style.fontSize = `${quranArabicFontSize}rem`;
  });
};

function loadSurahAyahs(num, surah) {
  const container = document.getElementById('readerAyahsContainer');
  if (!container) return;

  // Show loading spinner
  container.innerHTML = `
    <div style="text-align:center; padding:50px 20px;">
      <i class="fa-solid fa-spinner fa-spin" style="font-size:2rem; color:#059669;"></i>
      <p style="margin-top:12px; font-weight:700; color:#0F172A;">سورة ${surah.ar} کے آیات و ترجمہ لوڈ ہو رہے ہیں...</p>
      <span style="font-size:0.75rem; color:#64748B;">Al-Quran Cloud Uthmani & Jalandhry Translation</span>
    </div>
  `;

  // Check LocalStorage cache
  const cacheKey = 'khizri_surah_cache_' + num;
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      const data = JSON.parse(cached);
      renderAyahs(container, num, surah, data.arabic, data.urdu, data.english);
      return;
    } catch(e) {
      console.log('Cache parse error, refetching...');
    }
  }

  // Fetch from AlQuran Cloud API (Uthmani Arabic + Fateh Muhammad Jalandhry Urdu + Sahih English)
  const apiUrl = `https://api.alquran.cloud/v1/surah/${num}/editions/quran-uthmani,ur.jalandhry,en.sahih`;

  fetch(apiUrl)
    .then(r => r.json())
    .then(res => {
      if (res.code === 200 && res.data && res.data.length >= 2) {
        const arabic = res.data[0].ayahs;
        const urdu = res.data[1].ayahs;
        const english = res.data[2] ? res.data[2].ayahs : [];

        // Cache response in localStorage
        try {
          localStorage.setItem(cacheKey, JSON.stringify({ arabic, urdu, english }));
        } catch(e) { /* storage full, ignore */ }

        renderAyahs(container, num, surah, arabic, urdu, english);
      } else {
        throw new Error('Invalid API response');
      }
    })
    .catch(err => {
      console.error('Failed to load surah ayahs:', err);
      container.innerHTML = `
        <div style="text-align:center; padding:40px 20px; color:#DC2626;">
          <i class="fa-solid fa-circle-exclamation" style="font-size:2rem; margin-bottom:10px;"></i>
          <p style="font-weight:700;">آیات لوڈ نہیں ہو سکیں۔ براہِ کرم انٹرنیٹ کنکشن چیک کریں۔</p>
          <button onclick="loadSurahAyahs(${num}, window.QURAN_SURAHS[${num - 1}])" style="background:#047857; color:#FFF; border:none; border-radius:8px; padding:8px 16px; font-weight:700; cursor:pointer; margin-top:8px;">دوبارہ کوشش کریں (Retry)</button>
        </div>
      `;
    });
}

function renderAyahs(container, num, surah, arabicAyahs, urduAyahs, englishAyahs) {
  let html = '';

  // Show Bismillah except for Surah At-Tawbah (9)
  if (num !== 9) {
    html += `
      <div class="reader-bismillah-box">
        بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
      </div>
    `;
  }

  html += arabicAyahs.map((ayah, i) => {
    const ayahNum = ayah.numberInSurah;
    let arText = ayah.text;

    // For Surah 1, Bismillah is Ayah 1. For other surahs, remove prefix Bismillah from Ayah 1 if present
    if (num !== 1 && ayahNum === 1 && arText.startsWith('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ')) {
      arText = arText.replace('بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ', '').trim();
    }

    const urText = urduAyahs && urduAyahs[i] ? urduAyahs[i].text : '';
    const enText = englishAyahs && englishAyahs[i] ? englishAyahs[i].text : '';

    return `
      <div class="ayah-card" id="ayahRow_${ayahNum}">
        <div class="ayah-top-row">
          <div class="ayah-badge">${ayahNum}</div>
          <div class="ayah-actions">
            <button class="btn-ayah-copy" onclick="copyAyahText(${num}, ${ayahNum})" title="Copy Ayah">
              <i class="fa-regular fa-copy"></i> نقل
            </button>
          </div>
        </div>
        <div class="ayah-arabic-text" style="font-size:${quranArabicFontSize}rem;">
          ${arText} <span style="font-size:0.9rem; color:#047857;">۝${ayahNum}</span>
        </div>
        <div class="ayah-urdu-text">${urText}</div>
        <div class="ayah-eng-text lang-en-only">${enText}</div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}

window.copyAyahText = function(surahNum, ayahNum) {
  const row = document.getElementById('ayahRow_' + ayahNum);
  const ar = row ? (row.querySelector('.ayah-arabic-text') ? row.querySelector('.ayah-arabic-text').innerText : '').replace(/\s*۝\d+\s*/g, '').trim() : '';
  const ur = row ? (row.querySelector('.ayah-urdu-text') ? row.querySelector('.ayah-urdu-text').innerText : '').trim() : '';
  const fullText = ar + '\n\n' + 'ترجمہ: ' + ur + '\n' + '[القرآن - سورة ' + surahNum + '، آیت ' + ayahNum + ']';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(fullText).then(function() {
      showToast('آیت نمبر ' + ayahNum + ' کاپی کرلی گئی!');
    });
  } else {
    showToast('آیت منتخب کرلی گئی');
  }
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

// Wazaif Category Folders Definition (8 Folders - Balanced 2-Column Grid)
const WAZAIF_FOLDERS = [
  {
    id: 'manzil',
    titleUr: 'منزل شریف (۳۳ آیات)',
    titleEn: 'Manzil Sharif (33 Verses)',
    subtitleUr: 'آیاتِ شفا و تلاوت',
    subtitleEn: 'Healing Verses & Audio',
    icon: 'fa-book-quran',
    iconBg: '#FEF9C3',
    iconColor: '#CA8A04',
    badgeUr: 'پی ڈی ایف و قاری آڈیو',
    badgeEn: 'PDF & Qari Audio',
    filterFn: (w) => (w.id === 'waz-manzil' || (w.title || '').includes('منزل'))
  },
  {
    id: 'hizb-bahr',
    titleUr: 'حزب البحر الشریف',
    titleEn: 'Hizb-ul-Bahr Al-Sharif',
    subtitleUr: 'کامل حصار و پی ڈی ایف',
    subtitleEn: 'Shield & PDF',
    icon: 'fa-shield-halved',
    iconBg: '#E0F2FE',
    iconColor: '#0284C7',
    badgeUr: 'پی ڈی ایف و تلاوت',
    badgeEn: 'PDF & Audio',
    filterFn: (w) => (w.id === 'waz-hizb-bahr' || (w.title || '').includes('حزب البحر'))
  },
  {
    id: 'hizb-nasr',
    titleUr: 'دعائے حزب النصر',
    titleEn: 'Hizb-un-Nasr',
    subtitleUr: 'نصرت و فتحِ عظیم',
    subtitleEn: 'Victory & Triumph',
    icon: 'fa-shield-heart',
    iconBg: '#CCFBF1',
    iconColor: '#0F766E',
    badgeUr: 'فتح و نصرت',
    badgeEn: 'Divine Victory',
    filterFn: (w) => (w.id === 'waz-hizb-nasr' || (w.title || '').includes('حزب النصر'))
  },
  {
    id: 'chehal-kaaf',
    titleUr: 'دعائے چہل کاف',
    titleEn: 'Dua-e-Chehal Kaaf',
    subtitleUr: '۱۱۰۴ طریقہ و اجازت',
    subtitleEn: 'Count & Ijazah 1104',
    icon: 'fa-stamp',
    iconBg: '#EDE9FE',
    iconColor: '#7C3AED',
    badgeUr: 'طریقہ و اجازت فارم',
    badgeEn: 'Method & Ijazah',
    filterFn: (w) => (w.id === 'waz-chehal-kaaf' || (w.title || '').includes('چہل کاف'))
  },
  {
    id: 'nadi-ali',
    titleUr: 'نادِ علی جل جلالہ',
    titleEn: 'Dua-e-Nadi Ali',
    subtitleUr: 'حلِ جمیع مشکلات',
    subtitleEn: 'Problem Solving',
    icon: 'fa-hand-holding-heart',
    iconBg: '#FFEDD5',
    iconColor: '#EA580C',
    badgeUr: 'حلِ مشکلات و نصرت',
    badgeEn: 'Problem Solving',
    filterFn: (w) => (w.id === 'waz-nadi-ali' || (w.title || '').includes('نادِ علی'))
  },
  {
    id: 'muharram',
    titleUr: 'وظائفِ محرم الحرام',
    titleEn: 'Muharram Litanies',
    subtitleUr: '۵ اکسیری اعمال و شفا',
    subtitleEn: '5 Muharram Practices',
    icon: 'fa-mosque',
    iconBg: '#FEE2E2',
    iconColor: '#DC2626',
    badgeUr: '۵ اکسیری اعمال',
    badgeEn: '5 Special Acts',
    filterFn: (w) => (w.id === 'waz-khas-muharram' || (w.title || '').includes('محرم'))
  },
  {
    id: 'shab-17-ramadan',
    titleUr: 'شبِ ۱۷ رمضان (بدر)',
    titleEn: '17th Ramadan (Badr)',
    subtitleUr: '۴۴ سورتیں و تسبیحات',
    subtitleEn: 'Surahs Litany 44',
    icon: 'fa-moon',
    iconBg: '#EEF2FF',
    iconColor: '#4F46E5',
    badgeUr: '۴۴ سورتیں و تسبیحات',
    badgeEn: '44 Surahs List',
    filterFn: (w) => (w.id === 'waz-khas-17-ramadan' || (w.title || '').includes('۱۷ رمضان'))
  },
  {
    id: 'ramadan',
    titleUr: 'رمضان و آخری عشرہ',
    titleEn: 'Ramadan & Last 10 Days',
    subtitleUr: 'سحر، افطار و شبِ قدر',
    subtitleEn: 'Iftar & Laylatul Qadr',
    icon: 'fa-star-and-crescent',
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
    badgeUr: '۲ مسنون اعمال',
    badgeEn: '2 Essential Acts',
    filterFn: (w) => (w.id === 'waz-khas-ramadan' || w.id === 'waz-khas-aakhri-ashra')
  }
];

// Render Wazaif Folders and In-Card Interactive Wazaif
function renderWazaif(filterCategory = 'all_folders') {
  const container = document.getElementById('wazaifInteractiveStack');
  if (!container) return;

  state.activeWazaifFilter = filterCategory;
  const isEn = state.currentLang === 'en';
  const allItems = (state.wazaif && state.wazaif.length) ? state.wazaif : [];

  // Sync active chip
  const activeFilterVal = (filterCategory === 'all' || !filterCategory) ? 'all_folders' : filterCategory;
  document.querySelectorAll('#wazaifFilterChips .w-chip').forEach(c => {
    if (c.getAttribute('data-filter') === activeFilterVal) {
      c.classList.add('active');
      c.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
      c.classList.remove('active');
    }
  });

  // Scroll to top of tab
  const scrollArea = document.querySelector('#tabWazaif .sub-screen-scroll');
  if (scrollArea) scrollArea.scrollTop = 0;

  // CASE 1: RENDER FOLDERS GRID (فولڈرز مین ویو - 2-Column Grid matching Healing)
  if (filterCategory === 'all_folders' || filterCategory === 'all' || !filterCategory) {
    const foldersHtml = WAZAIF_FOLDERS.map(f => {
      const title = isEn ? f.titleEn : f.titleUr;
      const subtitle = isEn ? f.subtitleEn : f.subtitleUr;

      return `
        <div class="wazaif-folder-card ${isEn ? 'ltr-card' : 'rtl-card'}" onclick="renderWazaif('${f.id}')" role="button" tabindex="0">
          <div class="wfc-icon-wrap" style="background: ${f.iconBg}; color: ${f.iconColor};">
            <i class="fa-solid ${f.icon}"></i>
          </div>
          <div class="wfc-content-wrap">
            <div class="wfc-title">${title}</div>
            <div class="wfc-subtitle">${subtitle}</div>
          </div>
        </div>
      `;
    }).join('');

    const flatListBanner = `
      <div style="grid-column: 1 / -1; margin-top: 10px; text-align: center;">
        <button type="button" class="btn-view-all-flat" onclick="renderWazaif('flat_all')" style="background: #F8FAFC; border: 1px dashed #CBD5E1; color: #475569; padding: 10px 18px; border-radius: 12px; font-size: 0.8rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 8px;">
          <i class="fa-solid fa-list-ul"></i>
          <span>${isEn ? 'View all 19 wazaif in single list' : 'تمام ۱۹ وظائف کی مکمل فہرست ایک ساتھ دیکھیں'}</span>
        </button>
      </div>
    `;

    container.innerHTML = `<div class="wazaif-folders-grid">${foldersHtml}${flatListBanner}</div>`;
    return;
  }

  // CASE 2: RENDER SPECIFIC FOLDER ITEMS WITH STICKY HEADER & BACK BUTTON
  const selectedFolder = WAZAIF_FOLDERS.find(f => f.id === filterCategory);
  let items = [];
  let headerTitle = '';
  let headerBadge = '';

  if (filterCategory === 'flat_all') {
    items = allItems;
    headerTitle = isEn ? 'All Wazaif (Complete Collection)' : 'تمام وظائف (مکمل ۱۹ وظائف)';
    headerBadge = isEn ? `${items.length} Wazaif` : `${items.length} وظائف`;
  } else if (selectedFolder) {
    items = allItems.filter(selectedFolder.filterFn);
    headerTitle = isEn ? selectedFolder.titleEn : selectedFolder.titleUr;
    headerBadge = isEn ? selectedFolder.badgeEn : selectedFolder.badgeUr;
  } else {
    // Fallback search
    items = allItems.filter(w => {
      const cat = (w.category || '').toLowerCase();
      const title = (w.title || '').toLowerCase();
      const fc = filterCategory.toLowerCase();
      return cat.includes(fc) || title.includes(fc);
    });
    headerTitle = filterCategory;
    headerBadge = `${items.length} ${isEn ? 'items' : 'وظائف'}`;
  }

  const backBtnText = isEn ? '← Back to Folders' : '← تمام فولڈرز پر واپس جائیں';

  const headerBarHtml = `
    <div class="wazaif-folder-header-bar">
      <button type="button" class="btn-back-folders" onclick="renderWazaif('all_folders')">
        <span>${backBtnText}</span>
      </button>
      <div class="wfh-meta">
        <div class="wfh-title">${headerTitle}</div>
        <div class="wfh-count">${headerBadge} (${items.length} ${isEn ? 'items' : 'وظائف'})</div>
      </div>
    </div>
  `;

  if (!items.length) {
    container.innerHTML = headerBarHtml + `
      <div style="text-align:center; padding:32px 16px; color:#64748B;">
        <i class="fa-solid fa-hands-praying" style="font-size:2.4rem; color:#CBD5E1; margin-bottom:12px;"></i>
        <p style="font-size:0.95rem; font-weight:700; margin-bottom:6px;">${isEn ? 'No Wazaif found in this folder' : 'اس فولڈر میں وظائف جلد شامل کیے جائیں گے۔'}</p>
        <p style="font-size:0.8rem; color:#94A3B8;">${isEn ? 'Click "Back to Folders" above to browse all folders.' : 'دیگر وظائف دیکھنے کے لیے اوپر دیے گئے بٹن سے تمام فولڈرز پر تشریف لے جائیں۔'}</p>
      </div>
    `;
    return;
  }

  const cardsHtml = items.map((w, index) => {
    const targetReps = parseInt(w.repetitions) || 100;
    const catLabel = isEn ? (w.categoryEn || w.category || 'Khas Wazifa') : (w.category || 'خاص وظیفہ');
    const timingLabel = isEn ? (w.timingEn || (w.timing === 'صبح و شام' ? 'Morning & Evening' : w.timing || 'Daily')) : (w.timing || 'صبح و شام');
    const transLabel = isEn ? 'Translation:' : 'ترجمہ:';
    const transText = isEn ? (w.englishTranslation || w.urduTranslation || '') : (w.urduTranslation || '');
    const benefitsLabel = isEn ? 'Virtues & Benefits:' : 'فضیلت و فوائد:';
    const benefitsText = isEn ? (w.benefitsEn || w.benefits || 'Authentic practice for spiritual peace and divine protection.') : (w.benefits || 'قلبی سکون اور روحانی برکات کے لیے مجرب عمل۔');
    const repsLabel = isEn ? `Count: ${w.repetitions || targetReps + ' times'}` : `تعداد: ${w.repetitions || targetReps + ' مرتبہ'}`;
    const tapHint = isEn ? 'Tap to Count' : 'شمار کریں';

    const safeTitle = (w.title || '').replace(/'/g, "\\'");
    const isLongText = (w.arabicText || '').length > 240;
    const cardElId = 'waz-item-' + (w.id ? w.id.replace(/[^a-zA-Z0-9_-]/g, '') : index);

    return `
      <div class="wazifa-interactive-card ${isEn ? 'ltr-card' : 'rtl-card'}" id="${cardElId}">
        <div class="wic-header">
          <span class="wic-category-tag"><i class="fa-solid fa-star-and-crescent"></i> ${catLabel}</span>
          <span class="wic-timing-tag"><i class="fa-regular fa-clock"></i> ${timingLabel}</span>
        </div>
        <h4 class="wic-title">${w.title}</h4>
        
        <!-- Media Actions (PDF Open, Download, Audio Play) -->
        ${(w.pdfUrl || w.hasAudio) ? `
          <div class="wic-media-actions">
            ${w.pdfUrl ? `
              <a href="${w.pdfUrl}" target="_blank" class="btn-wic-action btn-wic-open">
                <i class="fa-solid fa-book-open-reader"></i> <span>${isEn ? 'Read PDF' : 'پی ڈی ایف پڑھیں'}</span>
              </a>
              <a href="${w.pdfUrl}" download="${w.pdfDownloadName || 'wazifa.pdf'}" class="btn-wic-action btn-wic-download">
                <i class="fa-solid fa-file-arrow-down"></i> <span>${isEn ? 'Download PDF' : 'ڈاؤنلوڈ پی ڈی ایف'}</span>
              </a>
            ` : ''}
            ${w.hasAudio ? `
              <button type="button" class="btn-wic-action btn-wic-audio" onclick="playWazifaAudio(this, '${w.id}')">
                <i class="fa-solid fa-volume-high"></i> <span class="audio-btn-txt">${isEn ? 'Listen Recitation (Qari)' : 'تلاوت سنیں (قاری صاحب)'}</span>
              </button>
            ` : ''}
          </div>
        ` : ''}

        <!-- Prominent Method Box (طریقہ و معمول) -->
        ${w.methodInstructions ? `
          <div class="wic-method-box">
            ${(w.methodInstructions || '').replace(/\n/g, '<br>')}
          </div>
        ` : ''}

        <!-- 3-Step Reading Counter Tracker for Manzil Sharif -->
        ${w.id === 'waz-manzil' ? `
          <div class="manzil-reading-tracker" data-current-step="0">
            <div class="mrt-header">
              <i class="fa-solid fa-list-check"></i>
              <span>${isEn ? '3-Times Recitation Progress Tracker' : '۳ مرتبہ تلاوت کا کاؤنٹر ٹریکر'}</span>
            </div>
            <div class="mrt-steps">
              <div class="mrt-step-pill" data-step="1">
                <span>${isEn ? '1st Time' : 'پہلی مرتبہ'}</span>
                <span class="mrt-status" style="font-size:0.68rem;">${isEn ? 'Pending' : 'باقی'}</span>
              </div>
              <div class="mrt-step-pill" data-step="2">
                <span>${isEn ? '2nd Time' : 'دوسری مرتبہ'}</span>
                <span class="mrt-status" style="font-size:0.68rem;">${isEn ? 'Pending' : 'باقی'}</span>
              </div>
              <div class="mrt-step-pill" data-step="3">
                <span>${isEn ? '3rd Time' : 'تیسری مرتبہ'}</span>
                <span class="mrt-status" style="font-size:0.68rem;">${isEn ? 'Pending' : 'باقی'}</span>
              </div>
            </div>
            <button type="button" class="btn-mrt-action" onclick="trackManzilStep(this)">
              <i class="fa-solid fa-fingerprint"></i>
              <span class="mrt-btn-text">${isEn ? 'Mark 1st Recitation Done' : 'پہلی مرتبہ مکمل (یہاں کلک کریں)'}</span>
            </button>
          </div>
        ` : ''}

        <div class="wic-arabic ${isLongText ? 'wic-arabic-collapsible' : ''}" id="${cardElId}-arabic">
          ${(w.itemsList && w.itemsList.length) ? `
            <div class="wazifa-items-grid">
              ${w.itemsList.map(item => `
                <div class="wazifa-grid-item">
                  <div class="wgi-top">
                    <span class="wgi-badge">${item.num}</span>
                    <span class="wgi-count">${item.count}</span>
                  </div>
                  <div class="wgi-arabic">${item.text}</div>
                </div>
              `).join('')}
            </div>
          ` : (w.arabicText || '').replace(/\n/g, '<br>')}
        </div>

        ${isLongText ? `
          <button type="button" class="btn-wic-expand" onclick="toggleWazifaLongText('${cardElId}-arabic', this)">
            <i class="fa-solid fa-book-open"></i> <span>${isEn ? 'Read Complete Litany / Supplication' : 'مکمل تلاوت و دعا دیکھیں'}</span>
          </button>
        ` : ''}

        <div class="wic-urdu"><strong>${transLabel}</strong> ${transText}</div>
        <div class="wic-benefits"><strong>${benefitsLabel}</strong> ${benefitsText}</div>

        <!-- Request Ijazah Button (for Chehal Kaaf, Hizb-ul-Bahr & Special Litanies) -->
        ${w.requiresIjazah ? `
          <button type="button" class="btn-request-ijazah" onclick="openIjazahModal('${safeTitle}')">
            <i class="fa-solid fa-stamp"></i> <span>${isEn ? 'Request Wazifa Ijazah (Permission)' : 'وظیفہ کی اجازت حاصل کریں'}</span>
          </button>
        ` : ''}
        
        <div class="wic-footer">
          <span class="wic-reps-text">${repsLabel}</span>
          <div style="display:inline-flex; align-items:center; gap:8px;">
            <button class="btn-wazifa-tap-counter" onclick="countModuleWazifa(this, ${targetReps})" title="${tapHint}">
              <i class="fa-solid fa-fingerprint"></i> <span class="m-count-val">0</span> / ${targetReps}
            </button>
            <button class="btn-wazifa-consult" onclick="openWazifaConsult('${safeTitle}')" title="${isEn ? 'Ask Guidance / Ijazah on WhatsApp' : 'رہنمائی و اجازت حاصل کریں'}">
              <i class="fa-brands fa-whatsapp"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = headerBarHtml + cardsHtml;
}

// Global function to open a wazifa folder directly from anywhere (e.g. Healing screen)
window.openWazifaFolder = function(folderId) {
  if (typeof window.switchTab === 'function') {
    window.switchTab('tabWazaif');
  }
  setTimeout(() => {
    renderWazaif(folderId);
  }, 50);
};

// Wazaif Category Filter Buttons
function initWazaifFilters() {
  const container = document.getElementById('wazaifFilterChips');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const chip = e.target.closest('.w-chip');
    if (!chip) return;

    container.querySelectorAll('.w-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');

    const filter = chip.getAttribute('data-filter') || 'all_folders';
    renderWazaif(filter);
  });
}

// Expand/Collapse Long Wazifa Prayer Text
window.toggleWazifaLongText = function(arabicElId, btn) {
  const el = document.getElementById(arabicElId);
  if (!el) return;
  const isExpanded = el.classList.toggle('is-expanded');
  const isEn = state.currentLang === 'en';
  if (btn) {
    const span = btn.querySelector('span');
    const icon = btn.querySelector('i');
    if (isExpanded) {
      if (span) span.textContent = isEn ? 'Collapse View' : 'مختصر کریں';
      if (icon) icon.className = 'fa-solid fa-chevron-up';
      btn.classList.add('active');
    } else {
      if (span) span.textContent = isEn ? 'Read Complete Litany / Supplication' : 'مکمل تلاوت و دعا دیکھیں';
      if (icon) icon.className = 'fa-solid fa-book-open';
      btn.classList.remove('active');
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
};

// Open Wazifa Ijazah Request Modal
window.openIjazahModal = function(wazifaTitle) {
  const modal = document.getElementById('modalWazifaIjazah');
  if (!modal) return;
  const titleInput = document.getElementById('ijazahWazifaTitle');
  if (titleInput) titleInput.value = wazifaTitle || 'منزل شریف';
  if (typeof window.initCountryDropdowns === 'function') {
    window.initCountryDropdowns('Pakistan');
  }
  if (typeof openModal === 'function') {
    openModal('modalWazifaIjazah');
  } else {
    modal.classList.add('active');
  }
};

// Submit Wazifa Ijazah Request to WhatsApp
window.submitWazifaIjazah = function() {
  const isEn = state.currentLang === 'en';
  const wazifa = (document.getElementById('ijazahWazifaTitle')?.value || 'منزل شریف').trim();
  const name = (document.getElementById('ijazahFullName')?.value || '').trim();
  const fatherName = (document.getElementById('ijazahFatherName')?.value || '').trim();
  const issue = (document.getElementById('ijazahIssue')?.value || '').trim();
  const city = (document.getElementById('ijazahCity')?.value || '').trim();
  const country = (document.getElementById('wazifaIjazahCountry')?.value || 'Pakistan').trim();
  const prof = (document.getElementById('ijazahProfession')?.value || '').trim();
  const purpose = (document.getElementById('ijazahPurpose')?.value || '').trim();
  const phone = (document.getElementById('ijazahWhatsApp')?.value || '').trim();

  if (!name) {
    alert(isEn ? 'Please enter your full name.' : 'براہِ کرم سائل / مریض کا مکمل نام درج فرمائیں۔');
    document.getElementById('ijazahFullName')?.focus();
    return;
  }
  if (!phone) {
    alert(isEn ? 'Please enter your WhatsApp mobile number.' : 'براہِ کرم واٹس ایپ موبائل نمبر ضرور درج فرمائیں۔');
    document.getElementById('ijazahWhatsApp')?.focus();
    return;
  }

  let text = `*درخواستِ شرعی و روحانی اجازت (Khizri Ways)*\n\n`;
  text += `📋 *وظیفہ:* ${wazifa}\n`;
  text += `👤 *سائل / مریض کا نام:* ${name}\n`;
  if (fatherName) text += `👨‍👩‍👧 *والد / والدہ کا نام:* ${fatherName}\n`;
  if (issue) text += `⚠️ *مسئلہ / بیماری کی نوعیت:* ${issue}\n`;
  if (city) text += `🏙️ *شہر و پتہ:* ${city}\n`;
  if (country) text += `🌍 *ملک:* ${country}\n`;
  if (prof) text += `💼 *پیشہ / کام:* ${prof}\n`;
  if (purpose) text += `🎯 *خاص مقصد / نیت:* ${purpose}\n`;
  text += `📱 *واٹس ایپ نمبر:* ${phone}\n`;
  text += `\nحضرت مفتی صاحب! مجھے اس وظیفے کی باقاعدہ شرعی و روحانی اجازت اور دعاؤں سے نوازیں۔ جزاک اللہ خیراً!`;

  const encoded = encodeURIComponent(text);
  window.open(`https://wa.me/923136224339?text=${encoded}`, '_blank');
  
  if (typeof closeModal === 'function') {
    closeModal('modalWazifaIjazah');
  } else {
    const modal = document.getElementById('modalWazifaIjazah');
    if (modal) modal.classList.remove('active');
  }
}

// Global Audio Player instance for authentic Qari MP3 recitations
let currentWazifaAudio = null;

window.playWazifaAudio = function(btn, wazifaId) {
  const isEn = state.currentLang === 'en';
  const txtSpan = btn.querySelector('.audio-btn-txt');
  const icon = btn.querySelector('i');

  // If already playing this button, pause/stop it
  if (btn.classList.contains('playing')) {
    if (currentWazifaAudio) {
      currentWazifaAudio.pause();
      currentWazifaAudio.currentTime = 0;
    }
    btn.classList.remove('playing');
    if (txtSpan) txtSpan.textContent = isEn ? 'Listen Recitation (Qari)' : 'تلاوت سنیں (قاری صاحب)';
    if (icon) icon.className = 'fa-solid fa-volume-high';
    return;
  }

  // Stop any other active playing audio buttons
  document.querySelectorAll('.btn-wic-audio.playing').forEach(b => {
    b.classList.remove('playing');
    const s = b.querySelector('.audio-btn-txt');
    const ic = b.querySelector('i');
    if (s) s.textContent = isEn ? 'Listen Recitation (Qari)' : 'تلاوت سنیں (قاری صاحب)';
    if (ic) ic.className = 'fa-solid fa-volume-high';
  });
  if (currentWazifaAudio) {
    currentWazifaAudio.pause();
    currentWazifaAudio.currentTime = 0;
  }

  // Find item audioUrl from state.wazaif or fallback to downloaded Qari recitations
  const item = (state.wazaif || []).find(w => w.id === wazifaId);
  const audioSrc = item?.audioUrl || (wazifaId === 'waz-manzil' ? '/uploads/manzil-qari-recitation.mp3' : (wazifaId === 'waz-hizb-bahr' ? '/uploads/hizb-ul-bahr-recitation.mp3' : (wazifaId === 'waz-hizb-nasr' ? '/uploads/hizb-un-nasr-recitation.mp3' : (wazifaId === 'waz-chehal-kaaf' ? '/uploads/chehal-kaaf-recitation.mp3' : null))));

  if (audioSrc) {
    btn.classList.add('playing');
    if (txtSpan) txtSpan.textContent = isEn ? 'Playing Recitation...' : 'تلاوت جاری ہے...';
    if (icon) icon.className = 'fa-solid fa-pause';

    currentWazifaAudio = new Audio(audioSrc);
    currentWazifaAudio.play().catch(e => {
      console.error('Audio play error:', e);
      btn.classList.remove('playing');
      if (txtSpan) txtSpan.textContent = isEn ? 'Listen Recitation (Qari)' : 'تلاوت سنیں (قاری صاحب)';
      if (icon) icon.className = 'fa-solid fa-volume-high';
    });

    currentWazifaAudio.onended = function() {
      btn.classList.remove('playing');
      if (txtSpan) txtSpan.textContent = isEn ? 'Listen Recitation (Qari)' : 'تلاوت سنیں (قاری صاحب)';
      if (icon) icon.className = 'fa-solid fa-volume-high';
    };
  } else {
    alert(isEn ? 'Audio recitation by professional Qari will be available shortly.' : 'اس وظیفے کی مستند قاری کی تلاوت جلد اپ لوڈ کی جا رہی ہے۔');
  }
};

// WhatsApp Consultation for Specific Wazifa
window.openWazifaConsult = function(wazifaTitle) {
  const msg = encodeURIComponent(`السلام علیکم حضرت! مجھے "${wazifaTitle}" کے وظیفہ کے متعلق رہنمائی اور اجازت درکار ہے۔`);
  window.open(`https://wa.me/923136224339?text=${msg}`, '_blank');
};

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
// ==========================================
// KHAWAB KI TABEER MODULE (HAROOF-E-TAHAJJI & ACCORDION)
// ==========================================
let currentKhawabAlpha = 'all';
let currentKhawabQuery = '';
const expandedKhawabIds = new Set();
let areAllKhawabExpanded = false;

window.renderKhawabCards = function() {
  const container = document.getElementById('tabeerCardsList');
  if (!container) return;

  const db = (window.KHAWAB_DATABASE && window.KHAWAB_DATABASE.length > 0) ? window.KHAWAB_DATABASE : [];
  let items = [...db];

  // 1. Filter by Harf (letter)
  if (currentKhawabAlpha && currentKhawabAlpha !== 'all') {
    items = items.filter(item => {
      if (currentKhawabAlpha === 'ا') {
        return item.alpha === 'ا' || item.alpha === 'آ';
      }
      return item.alpha === currentKhawabAlpha;
    });
  }

  // 2. Filter by search query
  if (currentKhawabQuery && currentKhawabQuery.trim()) {
    const q = currentKhawabQuery.trim().toLowerCase();
    items = items.filter(item => 
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.meaning && item.meaning.toLowerCase().includes(q)) ||
      (item.scholar && item.scholar.toLowerCase().includes(q)) ||
      (item.keywords && item.keywords.toLowerCase().includes(q)) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(q))
    );
  }

  // Update count badge
  const countEl = document.getElementById('khawabCountBadge');
  if (countEl) countEl.textContent = items.length;

  if (!items.length) {
    container.innerHTML = `
      <div style="text-align:center; padding:35px 16px; background:#F8FAFC; border-radius:14px; border:1px solid #E2E8F0; color:#94A3B8;">
        <i class="fa-solid fa-cloud-moon" style="font-size:2.4rem; margin-bottom:10px; color:#CBD5E1;"></i>
        <h4 style="margin:0 0 6px 0; color:#0F172A; font-size:0.98rem; font-weight:800;">کوئی تعبیر نہیں ملی</h4>
        <p style="margin:0 0 12px 0; font-size:0.82rem;">براہ کرم کوئی دوسرا لفظ تلاش کریں یا فارم کے ذریعے دریافت فرمائیں۔</p>
        <button onclick="clearKhawabSearch()" style="background:#6D28D9; color:#FFF; border:none; border-radius:6px; padding:6px 14px; font-size:0.78rem; font-weight:700; cursor:pointer;">
          تمام تعبیرات دیکھیں
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map((item, idx) => {
    const isOpen = expandedKhawabIds.has(item.id);
    const openClass = isOpen ? 'is-open' : '';

    return `
      <div class="tabeer-card ${openClass}" id="tabeerCard_${item.id}">
        <!-- Clickable Header: Title, Letter & Scholar -->
        <div class="tabeer-header" onclick="toggleKhawabCard('${item.id}')" role="button" tabindex="0" title="تعبیر پڑھنے کے لیے کلک کریں">
          <div class="tabeer-header-main">
            <span class="tabeer-alpha-badge">${item.alpha}</span>
            <div class="tabeer-title-wrap">
              <h4 class="tabeer-title">${item.title}</h4>
              <span class="tabeer-scholar-badge"><i class="fa-solid fa-user-graduate text-purple"></i> ${item.scholar}</span>
            </div>
          </div>
          <div class="tabeer-header-meta">
            <span class="tabeer-tag-badge">${item.tag}</span>
            <span class="tabeer-chevron-wrap">
              <i class="fa-solid fa-chevron-down tabeer-chevron"></i>
            </span>
          </div>
        </div>

        <!-- Body: Detailed Interpretation & Guidance -->
        <div class="tabeer-body" id="tabeerBody_${item.id}">
          <div class="tabeer-meaning-box">
            <div class="tabeer-box-title">
              <i class="fa-solid fa-book-open-reader text-purple"></i>
              <strong>تعبیر و مفہوم:</strong>
            </div>
            <p class="tabeer-meaning-text">${item.meaning}</p>
          </div>

          <div class="tabeer-advice-box">
            <i class="fa-solid fa-lightbulb text-gold"></i>
            <span><strong>شرعی ہدایت:</strong> ${item.advice}</span>
          </div>

          <div class="tabeer-card-footer">
            <button class="btn-tabeer-collapse" onclick="toggleKhawabCard('${item.id}')">
              <i class="fa-solid fa-chevron-up"></i> تعبیر بند کریں
            </button>
            <button class="btn-tabeer-wa" onclick="askSpecificKhawabWhatsApp('${item.id}')">
              <i class="fa-solid fa-file-pen"></i> مفتی صاحب سے تعبیر پوچھیں (فارم پُر کریں)
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
};

window.toggleKhawabCard = function(id) {
  const card = document.getElementById('tabeerCard_' + id);
  if (!card) return;

  if (expandedKhawabIds.has(id)) {
    expandedKhawabIds.delete(id);
    card.classList.remove('is-open');
  } else {
    expandedKhawabIds.add(id);
    card.classList.add('is-open');
  }

  const totalCards = document.querySelectorAll('.tabeer-card').length;
  const btnAll = document.getElementById('btnToggleAllKhawab');
  if (btnAll) {
    if (expandedKhawabIds.size === totalCards && totalCards > 0) {
      areAllKhawabExpanded = true;
      btnAll.innerHTML = '<i class="fa-solid fa-chevron-up"></i> تمام تعبیرات سمیٹیں';
    } else {
      areAllKhawabExpanded = false;
      btnAll.innerHTML = '<i class="fa-solid fa-chevron-down"></i> تمام تعبیرات کھولیں';
    }
  }
};

window.toggleAllKhawab = function() {
  const db = (window.KHAWAB_DATABASE && window.KHAWAB_DATABASE.length > 0) ? window.KHAWAB_DATABASE : [];
  const cards = document.querySelectorAll('.tabeer-card');
  const anyClosed = Array.from(cards).some(c => !c.classList.contains('is-open'));

  if (anyClosed) {
    db.forEach(item => expandedKhawabIds.add(item.id));
    cards.forEach(c => c.classList.add('is-open'));
    areAllKhawabExpanded = true;
  } else {
    expandedKhawabIds.clear();
    cards.forEach(c => c.classList.remove('is-open'));
    areAllKhawabExpanded = false;
  }

  const btnAll = document.getElementById('btnToggleAllKhawab');
  if (btnAll) {
    btnAll.innerHTML = areAllKhawabExpanded
      ? '<i class="fa-solid fa-chevron-up"></i> تمام تعبیرات سمیٹیں'
      : '<i class="fa-solid fa-chevron-down"></i> تمام تعبیرات کھولیں';
  }
};

window.filterKhawabAlpha = function(letter, btn) {
  currentKhawabAlpha = letter;
  document.querySelectorAll('#khawabAlphaRow .alpha-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const searchInput = document.getElementById('khawabSearchInput');
  if (searchInput) searchInput.value = '';
  currentKhawabQuery = '';

  const btnClear = document.getElementById('btnClearKhawabSearch');
  if (btnClear) btnClear.style.display = 'none';

  renderKhawabCards();
};

window.handleKhawabSearch = function(query) {
  currentKhawabQuery = query || '';
  if (currentKhawabQuery.trim()) {
    currentKhawabAlpha = 'all';
    document.querySelectorAll('#khawabAlphaRow .alpha-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-alpha') === 'all');
    });
  }
  const btnClear = document.getElementById('btnClearKhawabSearch');
  if (btnClear) {
    btnClear.style.display = query && query.trim() ? 'block' : 'none';
  }
  renderKhawabCards();
};

window.clearKhawabSearch = function() {
  const searchInput = document.getElementById('khawabSearchInput');
  if (searchInput) searchInput.value = '';
  currentKhawabQuery = '';
  currentKhawabAlpha = 'all';

  const btnClear = document.getElementById('btnClearKhawabSearch');
  if (btnClear) btnClear.style.display = 'none';

  document.querySelectorAll('#khawabAlphaRow .alpha-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-alpha') === 'all');
  });

  renderKhawabCards();
};

window.askSpecificKhawabWhatsApp = function(id) {
  const db = (window.KHAWAB_DATABASE && window.KHAWAB_DATABASE.length > 0) ? window.KHAWAB_DATABASE : [];
  const item = db.find(d => d.id === id);
  const title = item ? item.title : '';

  // Open the Khawab Consultation Form modal (Not direct WhatsApp)
  openModal('modalKhawabConsult');

  // Pre-fill the dream description field with this specific dream's title
  const dreamInput = document.getElementById('khawabDreamText');
  if (dreamInput) {
    dreamInput.value = title ? `${title}: ` : '';
    setTimeout(() => {
      dreamInput.focus();
      try {
        dreamInput.setSelectionRange(dreamInput.value.length, dreamInput.value.length);
      } catch (e) {}
    }, 250);
  }
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
  try {
    if (typeof window !== 'undefined' && window.sessionStorage && sessionStorage.getItem('khizri_review_prompt_shown')) {
      return;
    }
  } catch(e) { return; }

  engagementTimer = setTimeout(() => {
    try {
      const shown = typeof window !== 'undefined' && window.sessionStorage && sessionStorage.getItem('khizri_review_prompt_shown');
      const reviewed = typeof window !== 'undefined' && window.localStorage && localStorage.getItem('khizri_user_reviewed');
      if (!shown && !reviewed) {
        if (typeof window.openModal === 'function') {
          window.openModal('modalReviewPrompt');
          if (window.sessionStorage) sessionStorage.setItem('khizri_review_prompt_shown', 'true');
        }
      }
    } catch(e) {}
  }, TWO_MINUTES_MS);
}

window.dismissReviewPrompt = function() {
  if (typeof window.closeModal === 'function') {
    window.closeModal('modalReviewPrompt');
  }
  try { if (typeof window !== 'undefined' && window.sessionStorage) sessionStorage.setItem('khizri_review_prompt_shown', 'true'); } catch(e) {}
};

window.handleGoogleReviewClick = function() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) localStorage.setItem('khizri_user_reviewed', 'true');
    if (typeof window !== 'undefined' && window.sessionStorage) sessionStorage.setItem('khizri_review_prompt_shown', 'true');
  } catch(e) {}
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

const expandedFatwaIds = new Set();
let areAllFatwasExpanded = false;

function renderMasailMiniButtons() {
  renderMasailCards();
      if (window.renderKhawabCards) window.renderKhawabCards();
}

function renderMasailCards() {
  const container = document.getElementById('masailCardsContainer') || document.getElementById('masailButtonsGrid');
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
      <div style="text-align:center; padding:35px 16px; background:#F8FAFC; border-radius:14px; border:1px solid #E2E8F0; color:#94A3B8;">
        <i class="fa-solid fa-file-circle-question" style="font-size:2.4rem; margin-bottom:10px; color:#CBD5E1;"></i>
        <h4 style="margin:0 0 6px 0; color:#0F172A; font-size:0.98rem; font-weight:800;">کوئی مسئلہ نہیں ملا</h4>
        <p style="margin:0 0 12px 0; font-size:0.82rem;">براہ کرم کوئی دوسرا لفظ تلاش کریں یا فارم کے ذریعے دریافت فرمائیں۔</p>
        <button onclick="clearMasailSearch()" style="background:#0284C7; color:#FFF; border:none; border-radius:6px; padding:6px 14px; font-size:0.78rem; font-weight:700; cursor:pointer;">
          تمام مسائل دیکھیں
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map((f, idx) => {
    const isOpen = expandedFatwaIds.has(f.id);
    const formattedAnswer = (f.answer || '').replace(/\n/g, '<br>');
    const openClass = isOpen ? 'is-open' : '';

    return `
      <div class="fatwa-screen-card ${openClass}" id="fatwaCard_${f.id}">
        <!-- Clickable Header: ONLY Masala Title shown initially -->
        <div class="fsc-header" onclick="toggleFatwaCard('${f.id}')" role="button" tabindex="0" title="جواب دیکھنے کے لیے کلک کریں">
          <div class="fsc-header-main">
            <span class="fsc-index-badge">${idx + 1}</span>
            <h3 class="fsc-title">${f.title}</h3>
          </div>
          <div class="fsc-header-meta">
            <span class="fsc-cat-badge">${f.category}</span>
            <span class="fsc-chevron-wrap" title="جواب کھولیں / بند کریں">
              <i class="fa-solid fa-chevron-down fsc-chevron"></i>
            </span>
          </div>
        </div>

        <!-- Body: Contains Sawaal & Jawaab, shown ONLY upon click -->
        <div class="fsc-body" id="fatwaBody_${f.id}">
          <!-- Meta details: Fatwa Number & Darul Ifta -->
          <div class="fsc-top-bar">
            <div class="fsc-meta-left">
              <span class="fsc-no-badge"><i class="fa-solid fa-stamp text-gold"></i> فتویٰ نمبر: ${f.fatwaNumber}</span>
              <span class="fsc-darulifta-tag">
                <i class="fa-solid fa-building-columns text-gold"></i> دار الافتاء بنوری ٹاؤن کراچی
              </span>
            </div>
            <span class="fsc-verified-stamp">
              <i class="fa-solid fa-certificate text-gold"></i> تصدیق شدہ
            </span>
          </div>

          <!-- Question Box -->
          <div class="fsc-question-box">
            <div class="fsc-box-header">
              <i class="fa-solid fa-circle-question text-danger"></i>
              <strong>سوال (سائل کی طرف سے):</strong>
            </div>
            <p class="fsc-question-text">${f.question}</p>
          </div>

          <!-- Answer Box (الجواب حامداً ومصلیاً) -->
          <div class="fsc-answer-box">
            <div class="fsc-box-header">
              <i class="fa-solid fa-scale-balanced text-gold"></i>
              <strong>الجواب حامداً ومصلیاً (شرعی فتویٰ):</strong>
            </div>
            <div class="fsc-answer-text">${formattedAnswer}</div>
          </div>

          <!-- Reference Citation -->
          <div class="fsc-ref-box">
            <i class="fa-solid fa-book-bookmark text-gold"></i>
            <strong>کتبِ حوالہ / مراجع:</strong> ${f.references || 'رد المحتار علی الدر المختار (فتاویٰ شامی)، الفتاویٰ الہندیہ (عالمگیری)'}
          </div>

          <!-- Card Footer Actions -->
          <div class="fsc-footer">
            <button class="btn-fsc-collapse" onclick="toggleFatwaCard('${f.id}')" title="جواب بند کریں">
              <i class="fa-solid fa-chevron-up"></i> جواب بند کریں
            </button>
            <div class="fsc-actions">
              <button class="btn-fsc-copy" onclick="copyFatwaText('${f.id}')" title="فتویٰ نقل کریں">
                <i class="fa-regular fa-copy"></i> نقل / کاپی
              </button>
              <button class="btn-fsc-wa" onclick="askSpecificFatwaWhatsApp('${f.id}')" title="اس پر مزید رہنمائی لیں">
                <i class="fa-brands fa-whatsapp"></i> مسئلہ پوچھیں
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.toggleFatwaCard = function(fatwaId) {
  const card = document.getElementById('fatwaCard_' + fatwaId);
  if (!card) return;

  if (expandedFatwaIds.has(fatwaId)) {
    expandedFatwaIds.delete(fatwaId);
    card.classList.remove('is-open');
  } else {
    expandedFatwaIds.add(fatwaId);
    card.classList.add('is-open');
  }

  // Update master toggle button state
  const totalCards = document.querySelectorAll('.fatwa-screen-card').length;
  const btnAll = document.getElementById('btnToggleAllFatwas');
  if (btnAll) {
    if (expandedFatwaIds.size === totalCards && totalCards > 0) {
      areAllFatwasExpanded = true;
      btnAll.innerHTML = '<i class="fa-solid fa-chevron-up"></i> تمام جوابات بند کریں';
    } else {
      areAllFatwasExpanded = false;
      btnAll.innerHTML = '<i class="fa-solid fa-chevron-down"></i> تمام جوابات کھولیں';
    }
  }
};

window.toggleFatwaAnswer = window.toggleFatwaCard;

window.toggleAllFatwas = function() {
  const allFatwas = (state.fatwas && state.fatwas.length > 0) ? state.fatwas : DEFAULT_BANURI_FATWAS;
  const cards = document.querySelectorAll('.fatwa-screen-card');
  const anyClosed = Array.from(cards).some(c => !c.classList.contains('is-open'));

  if (anyClosed) {
    allFatwas.forEach(f => expandedFatwaIds.add(f.id));
    cards.forEach(c => c.classList.add('is-open'));
    areAllFatwasExpanded = true;
  } else {
    expandedFatwaIds.clear();
    cards.forEach(c => c.classList.remove('is-open'));
    areAllFatwasExpanded = false;
  }

  const btnAll = document.getElementById('btnToggleAllFatwas');
  if (btnAll) {
    btnAll.innerHTML = areAllFatwasExpanded
      ? '<i class="fa-solid fa-chevron-up"></i> تمام جوابات بند کریں'
      : '<i class="fa-solid fa-chevron-down"></i> تمام جوابات کھولیں';
  }
};

window.copyFatwaText = function(fatwaId) {
  const allFatwas = (state.fatwas && state.fatwas.length > 0) ? state.fatwas : DEFAULT_BANURI_FATWAS;
  const f = allFatwas.find(item => item.id === fatwaId || item.fatwaNumber === fatwaId);
  if (!f) return;

  const text = `📜 *دار الافتاء جامعہ بنوری ٹاؤن کراچی — فتویٰ نمبر ${f.fatwaNumber}* 📜\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `📌 *عنوان:* ${f.title}\n` +
    `📂 *شعبہ:* ${f.category}\n\n` +
    `❓ *سوال:*\n${f.question}\n\n` +
    `⚖️ *الجواب حامداً ومصلیاً:*\n${f.answer}\n\n` +
    `📚 *مراجع و حوالہ جات:* ${f.references || 'کتبِ فقہ حنفی'}\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `خضریٰ ویز — دینی مسائل و روحانی رہنمائی ایپ`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`فتویٰ نمبر ${f.fatwaNumber} کاپی کر لیا گیا!`);
    });
  } else {
    showToast('فتویٰ منتخب کر لیا گیا');
  }
};

window.askSpecificFatwaWhatsApp = function(fatwaId) {
  const allFatwas = (state.fatwas && state.fatwas.length > 0) ? state.fatwas : DEFAULT_BANURI_FATWAS;
  const f = allFatwas.find(item => item.id === fatwaId || item.fatwaNumber === fatwaId);

  // Open Shariah Consultation Form modal
  openModal('modalMasailConsult');

  const qInput = document.getElementById('masailQuestionText');
  if (qInput && f) {
    qInput.value = `فتویٰ نمبر ${f.fatwaNumber} ("${f.title}") کے حوالے سے شرعی مسئلہ: `;
    setTimeout(() => {
      qInput.focus();
      try {
        qInput.setSelectionRange(qInput.value.length, qInput.value.length);
      } catch (e) {}
    }, 250);
  }
};

window.openFatwaDetail = function(fatwaId) {
  // Directly scroll into view of the fatwa card on screen and expand it!
  const card = document.getElementById('fatwaCard_' + fatwaId);
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const ansEl = document.getElementById('fatwaAns_' + fatwaId);
    if (ansEl && ansEl.classList.contains('collapsed')) {
      window.toggleFatwaAnswer(fatwaId);
    }
    card.style.outline = '2px solid #0284C7';
    setTimeout(() => card.style.outline = 'none', 1800);
    return;
  }

  // Fallback modal if card element not found
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


// =========================================================

// =========================================================
// COMPREHENSIVE GLOBAL COUNTRIES LIST & DROPDOWN INITIALIZER
// =========================================================
const TOP_PRIORITY_COUNTRIES = [
  { name: 'Pakistan', flag: '🇵🇰' },
  { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'United Arab Emirates', flag: '🇦🇪' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'United States', flag: '🇺🇸' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Oman', flag: '🇴🇲' },
  { name: 'Qatar', flag: '🇶🇦' },
  { name: 'Kuwait', flag: '🇰🇼' },
  { name: 'Bahrain', flag: '🇧🇭' },
  { name: 'Turkey', flag: '🇹🇷' },
  { name: 'Malaysia', flag: '🇲🇾' },
  { name: 'India', flag: '🇮🇳' },
  { name: 'Bangladesh', flag: '🇧🇩' },
  { name: 'South Africa', flag: '🇿🇦' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'Ireland', flag: '🇮🇪' },
  { name: 'New Zealand', flag: '🇳🇿' }
];

const ALL_WORLD_COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Brazzaville)", "Congo (Kinshasa)",
  "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador",
  "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
  "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
  "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia",
  "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal",
  "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan",
  "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
  "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
  "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania",
  "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
  "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe"
];

window.initCountryDropdowns = function(preferredCountry = 'Pakistan') {
  const selects = document.querySelectorAll('.country-select');
  if (!selects || !selects.length) return;

  const isEn = (typeof state !== 'undefined' && state.currentLang === 'en');
  const defaultLabel = isEn ? '-- Select Country --' : '-- ملک منتخب کریں (Select Country) --';
  const topGroupLabel = isEn ? '🌟 Popular Countries' : '🌟 مقبول ممالک (Popular)';
  const allGroupLabel = isEn ? '🌐 All Countries (A to Z)' : '🌐 تمام ممالک (All Countries A-Z)';

  selects.forEach(select => {
    const currentVal = select.value;
    if (select.options && select.options.length > 20) {
      if (!currentVal && preferredCountry) select.value = preferredCountry;
      return;
    }

    let html = `<option value="">${defaultLabel}</option>`;
    
    html += `<optgroup label="${topGroupLabel}">`;
    TOP_PRIORITY_COUNTRIES.forEach(c => {
      html += `<option value="${c.name}">${c.flag} ${c.name}</option>`;
    });
    html += `</optgroup>`;

    html += `<optgroup label="${allGroupLabel}">`;
    ALL_WORLD_COUNTRIES.forEach(cName => {
      html += `<option value="${cName}">${cName}</option>`;
    });
    html += `</optgroup>`;

    select.innerHTML = html;
    if (currentVal) {
      select.value = currentVal;
    } else if (preferredCountry) {
      select.value = preferredCountry;
    }
  });
};

// Auto-run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.initCountryDropdowns('Pakistan'));
} else {
  window.initCountryDropdowns('Pakistan');
}


// VIP SERVICES: MONTHLY DAM, AMLIYAT SADQA, TAWEEZ COURIER
// =========================================================

window.submitMonthlyDam = function(isEnglish = false) {
  const isEn = isEnglish || state.currentLang === 'en';
  const name = (document.getElementById(isEn ? 'damLeadNameEn' : 'damLeadName')?.value || document.getElementById('damLeadName')?.value || '').trim();
  const family = (document.getElementById(isEn ? 'damFamilyNamesEn' : 'damFamilyNames')?.value || document.getElementById('damFamilyNames')?.value || '').trim();
  const plan = (document.getElementById(isEn ? 'damPlanSelectEn' : 'damPlanSelect')?.value || document.getElementById('damPlanSelect')?.value || '');
  const city = (document.getElementById(isEn ? 'damCityEn' : 'damCity')?.value || document.getElementById('damCity')?.value || '').trim();

  if (!name) {
    alert(isEn ? 'Please enter your full name.' : 'براہِ کرم اپنا بنیادی نام درج کریں۔');
    return;
  }

  let msg = '';
  if (isEn) {
    msg = 'Assalamu Alaikum Mufti Sahib!\nI would like to activate the "Monthly Ruqyah & Protection Subscription".\n\n';
    msg += '👤 Seeker Name: ' + name + '\n';
    if (family) msg += '👨‍👩‍👧‍👦 Family Members: ' + family + '\n';
    msg += '📦 Selected Plan: ' + plan + '\n';
    if (city) msg += '📍 City / Country: ' + city + '\n';
    msg += '\nPlease share the payment details and daily Ruqyah schedule. Thank you!';
  } else {
    msg = 'السلام علیکم مفتی صاحب!\nمیں "ماہانہ دم و حفاظت سبسکرپشن" شروع کروانا چاہتا ہوں۔\n\n';
    msg += '👤 سائل کا نام: ' + name + '\n';
    if (family) msg += '👨‍👩‍👧‍👦 فیملی کے نام: ' + family + '\n';
    msg += '📦 منتخب پلان: ' + plan + '\n';
    if (city) msg += '📍 شہر / ملک: ' + city + '\n';
    msg += '\nبراہِ کرم ہدیہ کی ادائیگی اور روزانہ کے دم کی تفصیلات بھیج دیں۔ شکریہ!';
  }

  openWhatsAppConsult(msg);
  return;
};
window._old_submitMonthlyDam = function() {
  const name = document.getElementById('damLeadName')?.value.trim() || '';
  const family = document.getElementById('damFamilyNames')?.value.trim() || '';
  const plan = document.getElementById('damPlanSelect')?.value || 'مکمل فیملی دم (Rs. 5,000 / ماہانہ)';
  const phone = document.getElementById('damPhone')?.value.trim() || '';
  const city = document.getElementById('damCity')?.value.trim() || '';

  if (!name) {
    alert('براہِ کرم اپنا بنیادی نام درج کریں۔');
    return;
  }

  let msg = 'السلام علیکم مفتی صاحب!\nمیں "ماہانہ دم و حفاظت سبسکرپشن" شروع کروانا چاہتا ہوں۔\n\n';
  msg += '👤 سائل کا نام: ' + name + '\n';
  if (family) msg += '👨‍👩‍👧‍👦 فیملی کے نام: ' + family + '\n';
  msg += '📦 منتخب پلان: ' + plan + '\n';
  if (phone) msg += '📱 فون / واٹس ایپ: ' + phone + '\n';
  if (city) msg += '📍 شہر / ملک: ' + city + '\n';
  msg += '\nبراہِ کرم ہدیہ کی ادائیگی اور روزانہ کے دم کی تفصیلات بھیج دیں۔ شکریہ!';

  openWhatsAppConsult(msg);
};

window.orderAmalSadqa = function(animal, hissaType, isEnglish = false) {
  const isEn = isEnglish || state.currentLang === 'en';
  let animalTitle = '';
  let detail = '';
  if (animal === 'bakra') {
    animalTitle = isEn ? 'Goat Sacrifice & Remedy (Bakra Amal)' : 'بکرے کا عمل و صدقہ (Bakra Amal)';
    detail = hissaType === 'single' ? (isEn ? '1 Share (Rs. 3,500)' : '1 حصہ (Rs. 3,500)') : (isEn ? 'Full Goat (Rs. 25,000)' : 'مکمل بکرا فیملی عمل (Rs. 25,000)');
  } else if (animal === 'gaye') {
    animalTitle = isEn ? 'Cow Sacrifice & Remedy (Cow / Gaye Amal)' : 'گائے کا عمل و صدقہ (Cow / Gaye Amal)';
    detail = hissaType === 'single' ? (isEn ? '1 Share (Rs. 6,000)' : '1 حصہ (Rs. 6,000)') : (isEn ? 'Full Cow (Rs. 40,000)' : 'مکمل گائے خاندانی عمل (Rs. 40,000)');
  } else if (animal === 'oont') {
    animalTitle = isEn ? 'Camel Sacrifice & Remedy (Camel / Oont Amal)' : 'اونٹ کا عمل و صدقہ (Camel / Oont Amal)';
    detail = hissaType === 'single' ? (isEn ? '1 Share (Rs. 15,000)' : '1 حصہ (Rs. 15,000)') : (isEn ? 'Full Camel (Rs. 100,000)' : 'مکمل اونٹ بڑا عمل (Rs. 100,000)');
  }

  let msg = '';
  if (isEn) {
    msg = 'Assalamu Alaikum Mufti Sahib!\nI would like to register for "' + animalTitle + '".\n\n';
    msg += '📋 Package: ' + detail + '\n';
    msg += 'Purpose: Immediate cure for severe black magic, jinn afflictions, and life blockages.\n\n';
    msg += 'Please provide details for name registration and payment. Thank you!';
  } else {
    msg = 'السلام علیکم مفتی صاحب!\nمیں "' + animalTitle + '" میں اپنا نام درج کروانا چاہتا ہوں۔\n\n';
    msg += '📋 پیکیج: ' + detail + '\n';
    msg += 'مقصد: شدید جادو، جنات اور سخت بندشوں کی کاٹ و دفعِ بلا۔\n\n';
    msg += 'براہِ کرم نام کی اندراج اور ہدیہ ادائیگی کی تفصیل فراہم فرمائیں۔';
  }

  openWhatsAppConsult(msg);
  return;
};
window._old_orderAmalSadqa = function(animal, hissaType) {
  let animalTitle = '';
  let detail = '';
  if (animal === 'bakra') {
    animalTitle = 'بکرے کا عمل و صدقہ (Bakra Amal)';
    detail = hissaType === 'single' ? '1 حصہ (Rs. 3,500)' : 'مکمل بکرا فیملی عمل (Rs. 25,000)';
  } else if (animal === 'gaye') {
    animalTitle = 'گائے کا عمل و صدقہ (Cow / Gaye Amal)';
    detail = hissaType === 'single' ? '1 حصہ (Rs. 6,000)' : 'مکمل گائے خاندانی عمل (Rs. 40,000)';
  } else if (animal === 'oont') {
    animalTitle = 'اونٹ کا عمل و صدقہ (Camel / Oont Amal)';
    detail = hissaType === 'single' ? '1 حصہ (Rs. 15,000)' : 'مکمل اونٹ بڑا عمل (Rs. 100,000)';
  }

  let msg = 'السلام علیکم مفتی صاحب!\nمیں "' + animalTitle + '" میں اپنا نام درج کروانا چاہتا ہوں۔\n\n';
  msg += '📋 پیکیج: ' + detail + '\n';
  msg += 'مقصد: شدید جادو، جنات اور سخت بندشوں کی کاٹ و دفعِ بلا۔\n\n';
  msg += 'براہِ کرم نام کی اندراج اور ہدیہ ادائیگی کی تفصیل فراہم فرمائیں۔';

  openWhatsAppConsult(msg);
};

window.submitTaweezCourier = function() {
  const taweezType = document.getElementById('courierTaweezSelect')?.value || 'گولی بند تعویذ (حفاظتِ جان و مال)';
  const name = document.getElementById('courierClientName')?.value.trim() || '';
  const mother = document.getElementById('courierMotherName')?.value.trim() || '';
  const phone = document.getElementById('courierPhone')?.value.trim() || '';
  const address = document.getElementById('courierAddress')?.value.trim() || '';
  const city = document.getElementById('courierCity')?.value.trim() || '';

  if (!name || !address || !phone) {
    alert('براہِ کرم نام، موبائل نمبر اور مکمل پتہ لازمی درج کریں۔');
    return;
  }

  let msg = 'السلام علیکم مفتی صاحب!\nمیں تعویذ کا کوریئر ہوم ڈیلیوری آرڈر کرنا چاہتا ہوں۔\n\n';
  msg += '📜 مطلوبہ تعویذ: ' + taweezType + '\n';
  msg += '👤 سائل کا نام: ' + name + '\n';
  if (mother) msg += '👵 والدہ کا نام: ' + mother + '\n';
  msg += '📱 موبائل نمبر: ' + phone + '\n';
  msg += '🏠 مکمل کوریئر پتہ: ' + address + '\n';
  msg += '📍 شہر: ' + city + '\n\n';
  msg += 'براہِ کرم پارسل بکنگ اور ہدیہ وصولی کی معلومات فراہم کریں۔';

  openWhatsAppConsult(msg);
};

// =========================================================
// TASAWWUF MEDITATION SUBSCRIPTION & JOINING FORM HANDLER
// =========================================================
let uploadedSubProofBase64 = '';

window.openTasawwufSubscription = function(sessionType = 'group') {
  const modal = document.getElementById('modalTasawwufSubscription');
  if (!modal) return;
  if (typeof window.initCountryDropdowns === 'function') window.initCountryDropdowns();

  const typeSelect = document.getElementById('tasSubSessionType');
  if (typeSelect) {
    typeSelect.value = sessionType;
  }
  if (typeof window.updateTasSubFeeNotice === 'function') {
    window.updateTasSubFeeNotice();
  }

  const formView = document.getElementById('tasSubFormView');
  const successView = document.getElementById('tasSubSuccessView');
  if (formView) formView.style.display = 'block';
  if (successView) successView.style.display = 'none';

  const preview = document.getElementById('tasProofPreview');
  if (preview) {
    preview.style.display = 'none';
    preview.src = '';
  }
  uploadedSubProofBase64 = '';

  if (typeof window.openModal === 'function') {
    window.openModal('modalTasawwufSubscription');
  }
};

window.handleSubProofPreview = function(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    uploadedSubProofBase64 = e.target.result;
    const preview = document.getElementById('tasProofPreview');
    if (preview) {
      preview.src = uploadedSubProofBase64;
      preview.style.display = 'block';
    }
  };
  reader.readAsDataURL(file);
};

window.submitTasawwufSubscription = function() {
  const isEn = (typeof state !== 'undefined' && state.currentLang === 'en');
  
  const name = (document.getElementById('tasSubName')?.value || '').trim();
  const phone = (document.getElementById('tasSubPhone')?.value || '').trim();
  const country = (document.getElementById('tasSubCountry')?.value || 'Pakistan').trim();
  const address = (document.getElementById('tasSubAddress')?.value || '').trim();
  const profession = (document.getElementById('tasSubProfession')?.value || '').trim();
  const sessionType = document.getElementById('tasSubSessionType')?.value || 'group';

  if (!name) {
    alert(isEn ? 'Please enter your full name.' : 'براہِ کرم اپنا مکمل نام درج کریں۔');
    document.getElementById('tasSubName')?.focus();
    return;
  }
  if (!phone) {
    alert(isEn ? 'Please enter your WhatsApp or Mobile number.' : 'براہِ کرم اپنا فون یا واٹس ایپ نمبر درج کریں۔');
    document.getElementById('tasSubPhone')?.focus();
    return;
  }
  if (!country) {
    alert(isEn ? 'Please select your country.' : 'براہِ کرم فہرست سے اپنا ملک منتخب کریں۔');
    document.getElementById('tasSubCountry')?.focus();
    return;
  }
  if (!address) {
    alert(isEn ? 'Please enter your City & Address.' : 'براہِ کرم اپنا شہر و پتہ درج کریں۔');
    document.getElementById('tasSubAddress')?.focus();
    return;
  }
  if (!profession) {
    alert(isEn ? 'Please enter your profession / occupation.' : 'براہِ کرم اپنا پیشہ / شعبہ زندگی درج کریں۔');
    document.getElementById('tasSubProfession')?.focus();
    return;
  }

  const sessionTitle = sessionType === 'private' 
    ? (isEn ? 'Private 1-on-1 Meditation Session' : 'خصوصی پرائیویٹ ون آن ون سیشن')
    : (isEn ? 'Daily Group Meditation Session' : 'روزانہ گروپ مراقبہ سیشن');

  const registrationRecord = {
    id: 'TAS_' + Date.now(),
    name,
    phone,
    country,
    address,
    profession,
    sessionType,
    sessionTitle,
    hasProof: !!uploadedSubProofBase64,
    date: new Date().toISOString()
  };
  
  try {
    const prev = JSON.parse(localStorage.getItem('khizri_tasawwuf_subs') || '[]');
    prev.push(registrationRecord);
    localStorage.setItem('khizri_tasawwuf_subs', JSON.stringify(prev));
  } catch (e) {}

  // Transition to Success View (Instant Join Link)
  const formView = document.getElementById('tasSubFormView');
  const successView = document.getElementById('tasSubSuccessView');
  if (formView) formView.style.display = 'none';
  if (successView) successView.style.display = 'block';

  window.lastTasSub = registrationRecord;
};

window.sendTasSubWhatsAppConfirm = function() {
  const isEn = (typeof state !== 'undefined' && state.currentLang === 'en');
  const rec = window.lastTasSub || {};
  
  let msg = '';
  if (isEn) {
    msg = 'Assalamu Alaikum Mufti Sahib!\nI have submitted my registration for the Meditation & Lataif Subscription.\n\n';
    msg += '👤 Name: ' + (rec.name || '') + '\n';
    msg += '📱 WhatsApp: ' + (rec.phone || '') + '\n';
    msg += '📍 Location: ' + (rec.country ? rec.country + ' — ' : '') + (rec.address || '') + '\n';
    msg += '💼 Profession: ' + (rec.profession || '') + '\n';
    msg += '📦 Session Type: ' + (rec.sessionTitle || '') + '\n';
    msg += '🧾 Payment Slip: Attached / Transferred\n\n';
    msg += 'Please confirm my subscription and access to the daily schedule. Thank you!';
  } else {
    msg = 'السلام علیکم مفتی صاحب!\nمیں نے مراقبہ و اسباقِ لطائف سبسکرپشن کا فارم جمع کروا دیا ہے۔\n\n';
    msg += '👤 سائل کا نام: ' + (rec.name || '') + '\n';
    msg += '📱 واٹس ایپ: ' + (rec.phone || '') + '\n';
    msg += '📍 ملک و پتہ: ' + (rec.country ? rec.country + ' — ' : '') + (rec.address || '') + '\n';
    msg += '💼 پیشہ / شعبہ زندگی: ' + (rec.profession || '') + '\n';
    msg += '📦 سیشن کی نوعیت: ' + (rec.sessionTitle || '') + '\n';
    msg += '🧾 پیمنٹ سلپ: ٹرانسفر مکمل کر کے سکرین شاٹ منسلک ہے۔\n\n';
    msg += 'براہِ کرم تصدیق فرما کر روزانہ شیڈول میں شمولیت فراہم فرمائیں۔ شکریہ!';
  }

  openWhatsAppConsult(msg);
};


// =========================================================
// AUTHENTIC IJAZAH MODAL & DYNAMIC PRICING HANDLERS
// =========================================================
window.openAuthenticIjazahModal = function() {
  if (typeof window.initCountryDropdowns === 'function') window.initCountryDropdowns();
  if (typeof window.openModal === 'function') {
    window.openModal('modalAuthenticIjazah');
  }
};

window.submitAuthenticIjazahForm = function() {
  const isEn = (typeof state !== 'undefined' && state.currentLang === 'en');

  const name = (document.getElementById('ijazahName')?.value || '').trim();
  const phone = (document.getElementById('ijazahPhone')?.value || '').trim();
  const country = (document.getElementById('ijazahCountry')?.value || 'Pakistan').trim();
  const address = (document.getElementById('ijazahAddress')?.value || '').trim();
  const profession = (document.getElementById('ijazahProfession')?.value || '').trim();
  const statusVal = document.getElementById('ijazahStatus')?.value || 'none';
  const details = (document.getElementById('ijazahDetails')?.value || '').trim();

  if (!name) {
    alert(isEn ? 'Please enter your full name.' : 'براہِ کرم اپنا مکمل نام درج کریں۔');
    document.getElementById('ijazahName')?.focus();
    return;
  }
  if (!phone) {
    alert(isEn ? 'Please enter your WhatsApp or phone number.' : 'براہِ کرم اپنا واٹس ایپ نمبر درج کریں۔');
    document.getElementById('ijazahPhone')?.focus();
    return;
  }
  if (!country) {
    alert(isEn ? 'Please select your country.' : 'براہِ کرم فہرست سے اپنا ملک منتخب کریں۔');
    document.getElementById('ijazahCountry')?.focus();
    return;
  }
  if (!address) {
    alert(isEn ? 'Please enter your City & Address.' : 'براہِ کرم اپنا شہر و پتہ درج کریں۔');
    document.getElementById('ijazahAddress')?.focus();
    return;
  }
  if (!profession) {
    alert(isEn ? 'Please enter your profession / occupation.' : 'براہِ کرم اپنا پیشہ یا شعبہ زندگی درج کریں۔');
    document.getElementById('ijazahProfession')?.focus();
    return;
  }

  let statusText = '';
  if (statusVal === 'wazaif') {
    statusText = isEn ? 'Practicing regular daily Wazaif' : 'روزانہ وظائف و اوراد جاری ہیں';
  } else if (statusVal === 'bayah') {
    statusText = isEn ? 'Already pledged Bayah in a Sufi Order' : 'پہلے سے کسی سلسلے میں بیعت ہیں';
  } else if (statusVal === 'both') {
    statusText = isEn ? 'Both practicing Wazaif & pledged in Order' : 'وظائف اور بیعت دونوں کا تعلق ہے';
  } else {
    statusText = isEn ? 'No previous Wazaif or Bayah (New Seeker)' : 'کوئی سابقہ وظیفہ یا بیعت نہیں ہے (نیا طالب)';
  }

  let msg = '';
  if (isEn) {
    msg = '*Bismillahir Rahmanir Rahim*\n';
    msg += '*Application for Authentic Ijazah & Sufi Bay\'at (خضریٰ ویز)*\n';
    msg += '------------------------------------\n';
    msg += '👤 *Applicant Name:* ' + name + '\n';
    msg += '📱 *WhatsApp:* ' + phone + '\n';
    msg += '📍 *Country & Address:* ' + country + ' — ' + address + '\n';
    msg += '💼 *Profession:* ' + profession + '\n';
    msg += '📿 *Spiritual Background:* ' + statusText + '\n';
    if (details) {
      msg += '📝 *Additional Details:* ' + details + '\n';
    }
    msg += '------------------------------------\n';
    msg += 'Assalamu Alaikum Mufti Sahib! I humbly request authentic Ijazat (permission) and guidance in the 5 Sufi Orders and Lataif disciplines. Please review my details. JazakAllahu Khairan.';
  } else {
    msg = '*بسم الله الرحمن الرحيم*\n';
    msg += '*درخواست برائے باقاعدہ شرعی اجازت و بیعتِ تصوف (خضریٰ ویز)*\n';
    msg += '------------------------------------\n';
    msg += '👤 *سائل کا نام:* ' + name + '\n';
    msg += '📱 *واٹس ایپ نمبر:* ' + phone + '\n';
    msg += '📍 *ملک و پتہ:* ' + country + ' — ' + address + '\n';
    msg += '💼 *پیشہ / شعبہ زندگی:* ' + profession + '\n';
    msg += '📿 *سابقہ وظائف / بیعت کا تعلق:* ' + statusText + '\n';
    if (details) {
      msg += '📝 *تفصیلات:* ' + details + '\n';
    }
    msg += '------------------------------------\n';
    msg += 'السلام علیکم مفتی صاحب! میں ۵ سلاسلِ تصوف کے اسباق، لطائف و چاکراز اور معمولات کی باقاعدہ شرعی اجازت و بیعت کا طلبگار ہوں۔ برائے مہربانی اجازت و رہنمائی عنایت فرمائیں۔ جزاک اللہ خیراً۔';
  }

  if (typeof window.closeModal === 'function') {
    window.closeModal('modalAuthenticIjazah');
  }

  if (typeof window.openWhatsAppConsult === 'function') {
    window.openWhatsAppConsult(msg);
  }
};

window.updateTasSubFeeNotice = function() {
  const typeSelect = document.getElementById('tasSubSessionType');
  const noticeTitle = document.getElementById('tasSubFeeTitle');
  const noticeDetail = document.getElementById('tasSubFeeDetail');
  const noticeAmount = document.getElementById('tasSubFeeAmount');
  if (!typeSelect || !noticeTitle) return;

  const isEn = (typeof state !== 'undefined' && state.currentLang === 'en');
  if (typeSelect.value === 'private') {
    noticeTitle.textContent = isEn ? 'Private 1-on-1 Session' : 'خصوصی پرائیویٹ ون آن ون سیشن';
    noticeDetail.textContent = isEn 
      ? 'Daily ~20 Mins dedicated session for personal meditation & chakra guidance' 
      : 'روزانہ تقریباً ۲۰ منٹ کا خصوصی انفرادی سیشن برائے مراقبہ و باطنی لطائف رہنمائی';
    noticeAmount.textContent = 'Rs. 10,000 / Mo';
  } else {
    noticeTitle.textContent = isEn ? 'Daily Group Session' : 'روزانہ اجتماعی گروپ سیشن';
    noticeDetail.textContent = isEn 
      ? 'Live daily guided group meditation circle & collective transmission' 
      : 'روزانہ لائیو اجتماعی مراقبہ حلقہ اور باجماعت روحانی مشقیں';
    noticeAmount.textContent = 'Rs. 5,000 / Mo';
  }
};


// =========================================================
// ANIMAL SADQA MODAL & DYNAMIC NOTICE LOGIC
// =========================================================
let uploadedSadqaProofBase64 = '';

window.openAnimalSadqaModal = function(animal = 'murghi', hissaType = 'single', isEnglish = false) {
  const modal = document.getElementById('modalAnimalSadqaBooking');
  if (!modal) return;
  if (typeof window.initCountryDropdowns === 'function') window.initCountryDropdowns();

  const select = document.getElementById('sadqaPackageSelect');
  if (select) {
    if (animal === 'karhai' && hissaType === 'single') select.value = 'karhai_single';
    else if (animal === 'karhai' && hissaType === 'full') select.value = 'karhai_full';
    else if (animal === 'murghi') select.value = 'murghi_single';
    else if (animal === 'bakra' && hissaType === 'single') select.value = 'bakra_single';
    else if (animal === 'bakra' && hissaType === 'full') select.value = 'bakra_full';
    else if (animal === 'gaye' && hissaType === 'single') select.value = 'gaye_single';
    else if (animal === 'gaye' && hissaType === 'full') select.value = 'gaye_full';
    else if (animal === 'oont' && hissaType === 'single') select.value = 'oont_single';
    else if (animal === 'oont' && hissaType === 'full') select.value = 'oont_full';
  }

  if (typeof window.updateSadqaNotice === 'function') {
    window.updateSadqaNotice();
  }

  const preview = document.getElementById('sadqaProofPreview');
  if (preview) {
    preview.style.display = 'none';
    preview.src = '';
  }
  uploadedSadqaProofBase64 = '';

  if (typeof window.openModal === 'function') {
    window.openModal('modalAnimalSadqaBooking');
  }
};

window.updateSadqaNotice = function() {
  const select = document.getElementById('sadqaPackageSelect');
  const title = document.getElementById('sadqaNoticeTitle');
  const detail = document.getElementById('sadqaNoticeDetail');
  const amount = document.getElementById('sadqaNoticeAmount');
  const famBlock = document.getElementById('sadqaFamilyMembersBlock');
  const famNote = document.getElementById('sadqaFamilyBlockNote');
  if (!select || !title) return;

  const isEn = (typeof state !== 'undefined' && state.currentLang === 'en');
  const val = select.value;

  let maxMembers = 1;
  if (val === 'karhai_single') {
    title.textContent = isEn ? 'Amal-e-Karhai (Shared Share - 1 Person)' : 'کڑھائی کا خاص عمل (مشترکہ حصہ — ۱ فرد)';
    detail.textContent = isEn ? 'Sacred Qur\'anic inscriptions incinerated in iron pot for complete relief' : 'سائل کے نام و امراض کے تعویذات کڑھائی میں جلا کر سخت سحر و جنات کی کاٹ';
    amount.textContent = 'Rs. 5,000';
    maxMembers = 1;
  } else if (val === 'karhai_full') {
    title.textContent = isEn ? 'Full Dedicated Amal-e-Karhai (Max 5 Persons)' : 'مکمل انفرادی کڑھائی کا عمل (زیادہ سے زیادہ ۵ افراد)';
    detail.textContent = isEn ? 'Dedicated pot incineration for patient & family (up to 5 members)' : 'مریض یا فیملی کیلئے خصوصی سیپریٹ کڑھائی کا عمل (زیادہ سے زیادہ ۵ افراد)';
    amount.textContent = 'Rs. 25,000';
    maxMembers = 5;
  } else if (val === 'murghi_single') {
    title.textContent = isEn ? 'Rooster / Bird Kaat & Remedy (1 Person)' : 'مرغی کا خاص عمل و صدقہ (۱ فرد)';
    detail.textContent = isEn ? 'Instant spiritual cut for 1 person' : '۱ فرد کیلئے فوری کاٹ و دفعِ بلا';
    amount.textContent = 'Rs. 6,000';
    maxMembers = 1;
  } else if (val === 'bakra_single') {
    title.textContent = isEn ? 'Goat Remedy (Shared — Max 7 Persons)' : 'بکرے کا عمل (۱ حصہ — زیادہ سے زیادہ ۷ افراد)';
    detail.textContent = isEn ? 'Up to 7 family members included' : 'زیادہ سے زیادہ ۷ افراد کے نام شامل ہو سکتے ہیں';
    amount.textContent = 'Rs. 15,000';
    maxMembers = 7;
  } else if (val === 'bakra_full') {
    title.textContent = isEn ? 'Full Goat Individual Remedy (Max 7 Persons)' : 'مکمل بکرا (سیپریٹ انفرادی عمل — زیادہ سے زیادہ ۷ افراد)';
    detail.textContent = isEn ? 'Dedicated sacrifice for up to 7 family members' : 'مستقل انفرادی بکرا برائے کامل دفعِ سحر (زیادہ سے زیادہ ۷ افراد)';
    amount.textContent = 'Rs. 100,000';
    maxMembers = 7;
  } else if (val === 'gaye_single') {
    title.textContent = isEn ? 'Cow Remedy (Shared Share — Max 12 Persons)' : 'گائے کا خاندانی عمل (۱ حصہ — زیادہ سے زیادہ ۱۲ افراد)';
    detail.textContent = isEn ? 'Ancestral witchcraft & family discord (up to 12 persons)' : 'خاندانی عداوت و نحوست کی کاٹ (زیادہ سے زیادہ ۱۲ افراد)';
    amount.textContent = 'Rs. 25,000';
    maxMembers = 12;
  } else if (val === 'gaye_full') {
    title.textContent = isEn ? 'Full Cow Family Remedy (Max 12 Persons)' : 'مکمل گائے (پورا خاندان — زیادہ سے زیادہ ۱۲ افراد)';
    detail.textContent = isEn ? 'Protection for whole extended family (up to 12 persons)' : 'پورے خاندان اور گھرانے کیلئے مکمل گائے (زیادہ سے زیادہ ۱۲ افراد)';
    amount.textContent = 'Rs. 300,000';
    maxMembers = 12;
  } else if (val === 'oont_single') {
    title.textContent = isEn ? 'Camel Remedy (1 Share — Max 12 Persons)' : 'اونٹ کا عمل و صدقہ (۱ حصہ — زیادہ سے زیادہ ۱۲ افراد)';
    detail.textContent = isEn ? 'For severe chronic illness & cancer (up to 12 persons)' : 'مہلک امراض و کینسر سے شفا کیلئے (زیادہ سے زیادہ ۱۲ افراد)';
    amount.textContent = 'Rs. 100,000';
    maxMembers = 12;
  } else if (val === 'oont_full') {
    title.textContent = isEn ? 'Full Grand Camel Remedy (Max 12 Persons)' : 'مکمل اونٹ (بڑا خاندانی عمل — زیادہ سے زیادہ ۱۲ افراد)';
    detail.textContent = isEn ? 'Grand ancestral sacrifice for family (up to 12 persons)' : 'نسلوں پرانے سحر و امراض کا بڑا خاتمہ (زیادہ سے زیادہ ۱۲ افراد)';
    amount.textContent = 'Rs. 1,200,000';
    maxMembers = 12;
  }

  // Update slots visibility according to user-specified limits:
  // Karhai: max 5, Bakra: max 7, Cow & Camel: max 12
  if (famBlock) {
    if (maxMembers <= 1) {
      famBlock.style.display = 'none';
    } else {
      famBlock.style.display = 'block';
      if (famNote) {
        if (maxMembers === 5) {
          famNote.innerHTML = isEn 
            ? '<strong>Amal-e-Karhai Slots (Max 5 Persons):</strong> Enter details for 1 or more family members (up to 5 members). All slots are optional.'
            : '<strong>کڑھائی کا عمل (زیادہ سے زیادہ ۵ افراد):</strong> ۱ یا اس سے زائد جتنے بھی فیملی ممبرز کے نام درج کرنا چاہیں درج فرمائیں (زیادہ سے زیادہ ۵ افراد تک)۔';
        } else if (maxMembers === 7) {
          famNote.innerHTML = isEn 
            ? '<strong>Goat Sadqa Slots (Max 7 Persons):</strong> Enter details for 1 or more family members (up to 7 members). All slots are optional.'
            : '<strong>بکرے کا صدقہ و عمل (زیادہ سے زیادہ ۷ افراد):</strong> ۱ یا اس سے زائد جتنے بھی فیملی ممبرز کے نام درج کرنا چاہیں درج فرمائیں (زیادہ سے زیادہ ۷ افراد تک)۔';
        } else {
          famNote.innerHTML = isEn 
            ? '<strong>Cow / Camel Slots (Max 12 Persons):</strong> Enter details for 1 or more family members (up to 12 members). All slots are optional.'
            : '<strong>گائے و اونٹ کا عمل (زیادہ سے زیادہ ۱۲ افراد):</strong> ۱ یا اس سے زائد جتنے بھی فیملی ممبرز کے نام درج کرنا چاہیں درج فرمائیں (زیادہ سے زیادہ ۱۲ افراد تک)۔';
        }
      }
      for (let i = 2; i <= 12; i++) {
        const slotEl = document.getElementById('sadqaFamSlot' + i);
        if (slotEl) {
          slotEl.style.display = (i <= maxMembers) ? 'block' : 'none';
        }
      }
    }
  }
};

window.handleSadqaProofPreview = function(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    uploadedSadqaProofBase64 = e.target.result;
    const preview = document.getElementById('sadqaProofPreview');
    if (preview) {
      preview.src = uploadedSadqaProofBase64;
      preview.style.display = 'block';
    }
  };
  reader.readAsDataURL(file);
};

window.submitAnimalSadqaForm = function() {
  const isEn = (typeof state !== 'undefined' && state.currentLang === 'en');

  // Member 1 (Primary / Head)
  const m1Name = (document.getElementById('sadqaFam1Name')?.value || document.getElementById('sadqaLeadName')?.value || '').trim();
  const m1Mother = (document.getElementById('sadqaFam1Mother')?.value || document.getElementById('sadqaParentName')?.value || '').trim();
  const m1Issue = (document.getElementById('sadqaFam1Issue')?.value || '').trim();

  if (!m1Name) {
    alert(isEn ? 'Please enter Member 1 (Primary / Head) name.' : 'براہِ کرم پہلے فرد (بنیادی مریض یا سائل) کا نام درج کریں۔');
    document.getElementById('sadqaFam1Name')?.focus();
    return;
  }
  if (!m1Mother) {
    alert(isEn ? 'Please enter Member 1 mother\'s name.' : 'براہِ کرم پہلے فرد کی والدہ کا نام درج کریں۔');
    document.getElementById('sadqaFam1Mother')?.focus();
    return;
  }
  if (!m1Issue) {
    alert(isEn ? 'Please describe Member 1 illness / problem.' : 'براہِ کرم پہلے فرد کے مرض یا مسئلے کی تفصیل درج کریں۔');
    document.getElementById('sadqaFam1Issue')?.focus();
    return;
  }

  const select = document.getElementById('sadqaPackageSelect');
  const val = select ? select.value : '';
  const selectedPkgText = select ? select.options[select.selectedIndex]?.text : '';

  let maxMembers = 1;
  if (val === 'karhai_full') maxMembers = 5;
  else if (val === 'bakra_single' || val === 'bakra_full') maxMembers = 7;
  else if (val === 'gaye_single' || val === 'gaye_full' || val === 'oont_single' || val === 'oont_full') maxMembers = 12;

  // Collect all filled members up to maxMembers
  const members = [];
  members.push({ num: 1, name: m1Name, mother: m1Mother, issue: m1Issue });

  for (let i = 2; i <= maxMembers; i++) {
    const slotEl = document.getElementById('sadqaFamSlot' + i);
    if (!slotEl || slotEl.style.display !== 'none') {
      const n = (document.getElementById('sadqaFam' + i + 'Name')?.value || '').trim();
      const m = (document.getElementById('sadqaFam' + i + 'Mother')?.value || '').trim();
      const iss = (document.getElementById('sadqaFam' + i + 'Issue')?.value || '').trim();
      if (n) {
        members.push({ num: i, name: n, mother: m || 'Mother', issue: iss || 'General Protection & Shifa' });
      }
    }
  }

  const address = (document.getElementById('sadqaAddress')?.value || '').trim();
  const country = (document.getElementById('sadqaCountry')?.value || 'Pakistan').trim();
  const phone = (document.getElementById('sadqaPhone')?.value || '').trim();

  if (!address) {
    alert(isEn ? 'Please enter City & Residential Address.' : 'براہِ کرم شہر و رہائشی پتہ درج کریں۔');
    document.getElementById('sadqaAddress')?.focus();
    return;
  }
  if (!country) {
    alert(isEn ? 'Please select country.' : 'براہِ کرم فہرست سے ملک منتخب کریں۔');
    document.getElementById('sadqaCountry')?.focus();
    return;
  }
  if (!phone) {
    alert(isEn ? 'Please enter WhatsApp or Contact number.' : 'براہِ کرم واٹس ایپ یا رابطہ نمبر درج کریں۔');
    document.getElementById('sadqaPhone')?.focus();
    return;
  }

  let msg = '';
  if (isEn) {
    msg = '*Bismillahir Rahmanir Rahim*\n';
    msg += '*Animal & Bird Sadqa / Karhai Registration (خضریٰ ویز)*\n';
    msg += '------------------------------------\n';
    msg += '📦 *Selected Ritual:* ' + selectedPkgText + '\n';
    msg += '📍 *Country & Address:* ' + country + ' — ' + address + '\n';
    msg += '📱 *WhatsApp / Mobile:* ' + phone + '\n';
    msg += '\n👨‍👩‍👧‍👦 *Registered Members (شامل افراد مع والدہ و امراض):*\n';
    members.forEach((m) => {
      msg += '• *Member ' + m.num + ':* ' + m.name + ' (Mother: ' + m.mother + ') — Issue: ' + m.issue + '\n';
    });
    msg += '\n🧾 *Payment Slip:* ' + (uploadedSadqaProofBase64 ? 'Attached & Uploaded' : 'Transferred') + '\n';
    msg += '------------------------------------\n';
    msg += 'Assalamu Alaikum Mufti Sahib! I have submitted our registration details and fee for this sacred remedy. Please perform the ritual supplications and provide confirmation. JazakAllahu Khairan.';
  } else {
    msg = '*بسم الله الرحمن الرحيم*\n';
    msg += '*درخواست برائے عملِ حیوانات، صدقات و کڑھائی (خضریٰ ویز)*\n';
    msg += '------------------------------------\n';
    msg += '📦 *منتخب عمل:* ' + selectedPkgText + '\n';
    msg += '📍 *ملک و رہائشی پتہ:* ' + country + ' — ' + address + '\n';
    msg += '📱 *واٹس ایپ نمبر:* ' + phone + '\n';
    msg += '\n👨‍👩‍👧‍👦 *شامل افراد کی تفصیلات (نمبر وار مع والدہ و امراض):*\n';
    members.forEach((m) => {
      msg += '• *فرد ' + m.num + ':* ' + m.name + ' (والدہ: ' + m.mother + ') — مسئلہ: ' + m.issue + '\n';
    });
    msg += '\n🧾 *ہدیہ / سلپ:* ' + (uploadedSadqaProofBase64 ? 'سکرین شاٹ منسلک ہے' : 'ٹرانسفر مکمل') + '\n';
    msg += '------------------------------------\n';
    msg += 'السلام علیکم مفتی صاحب! میں نے عمل و صدقات کے اندراج کا فارم ہدیہ کی ادائیگی کے ساتھ جمع کروا دیا ہے۔ براہِ کرم نام شامل فرما کر عمل کا آغاز فرمائیں۔ جزاک اللہ خیراً۔';
  }

  if (typeof window.closeModal === 'function') {
    window.closeModal('modalAnimalSadqaBooking');
  }

  if (typeof window.openWhatsAppConsult === 'function') {
    window.openWhatsAppConsult(msg);
  }
};

// ==========================================
// MONTHLY RUQYAH & SPIRITUAL PROTECTION MODAL HANDLERS
// ==========================================
let activeDamPlan = 'individual';
let uploadedDamSlipBase64 = '';

window.openMonthlyDamModal = function(planType = 'individual') {
  if (typeof window.initCountryDropdowns === 'function') window.initCountryDropdowns();
  activeDamPlan = (planType === 'family') ? 'family' : 'individual';
  switchDamModalPlan(activeDamPlan);
  
  const preview = document.getElementById('damSlipPreview');
  if (preview) {
    preview.style.display = 'none';
    preview.src = '';
  }
  uploadedDamSlipBase64 = '';
  const fileInput = document.getElementById('damSlipFile');
  if (fileInput) fileInput.value = '';

  if (typeof window.openModal === 'function') {
    window.openModal('modalMonthlyDamBooking');
  }
};

window.switchDamModalPlan = function(planType) {
  activeDamPlan = (planType === 'family') ? 'family' : 'individual';
  const isEn = (typeof state !== 'undefined' && state.currentLang === 'en');

  const btnIndiv = document.getElementById('btnDamTabIndiv');
  const btnFam = document.getElementById('btnDamTabFam');
  const secIndiv = document.getElementById('damFormIndividual');
  const secFam = document.getElementById('damFormFamily');

  const noticeTitle = document.getElementById('damPlanNoticeTitle');
  const noticeDetail = document.getElementById('damPlanNoticeDetail');
  const noticeAmount = document.getElementById('damPlanNoticeAmount');

  if (activeDamPlan === 'individual') {
    if (btnIndiv) {
      btnIndiv.style.background = 'var(--khizri-navy-primary)';
      btnIndiv.style.color = '#FFFFFF';
    }
    if (btnFam) {
      btnFam.style.background = 'transparent';
      btnFam.style.color = 'var(--text-muted)';
    }
    if (secIndiv) secIndiv.style.display = 'block';
    if (secFam) secFam.style.display = 'none';

    if (noticeTitle) noticeTitle.textContent = isEn ? 'Individual Plan (1 Person Daily Ruqyah)' : 'انفرادی پلان (۱ فرد کا روزانہ دم و دعا)';
    if (noticeDetail) noticeDetail.textContent = isEn ? 'Daily specialized Ruqyah & prayers for 1 person' : 'سائل کا نام مع والدہ روزانہ خصوصی دعاؤں اور دم میں شامل';
    if (noticeAmount) noticeAmount.textContent = isEn ? 'Rs. 3,000 / mo' : '3,000 روپے / ماہ';
  } else {
    if (btnIndiv) {
      btnIndiv.style.background = 'transparent';
      btnIndiv.style.color = 'var(--text-muted)';
    }
    if (btnFam) {
      btnFam.style.background = 'var(--khizri-navy-primary)';
      btnFam.style.color = '#FFFFFF';
    }
    if (secIndiv) secIndiv.style.display = 'none';
    if (secFam) secFam.style.display = 'block';

    if (noticeTitle) noticeTitle.textContent = isEn ? 'Complete Family Plan (4 to 5 Members)' : 'مکمل فیملی پلان (۴ تا ۵ افراد کا روزانہ دم)';
    if (noticeDetail) noticeDetail.textContent = isEn ? 'Daily prayers for 4 to 5 members with separate illness slots' : 'خاندان کے ۴ تا ۵ افراد کے نام، والدہ کا نام اور الگ الگ امراض درج کریں';
    if (noticeAmount) noticeAmount.textContent = isEn ? 'Rs. 6,000 / mo' : '6,000 روپے / ماہ';
  }
};

window.handleDamSlipPreview = function(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    uploadedDamSlipBase64 = e.target.result;
    const preview = document.getElementById('damSlipPreview');
    if (preview) {
      preview.src = e.target.result;
      preview.style.display = 'block';
    }
  };
  reader.readAsDataURL(file);
};

window.submitMonthlyDamModal = function() {
  const isEn = (typeof state !== 'undefined' && state.currentLang === 'en');

  let msg = '';
  if (activeDamPlan === 'individual') {
    const name = (document.getElementById('damIndivName')?.value || '').trim();
    const mother = (document.getElementById('damIndivMother')?.value || '').trim();
    const issue = (document.getElementById('damIndivIssue')?.value || '').trim();
    const country = (document.getElementById('damIndivCountry')?.value || 'Pakistan').trim();
    const address = (document.getElementById('damIndivAddress')?.value || '').trim();
    const phone = (document.getElementById('damIndivPhone')?.value || '').trim();

    if (!name) {
      alert(isEn ? 'Please enter patient / seeker full name.' : 'براہِ کرم مریض یا سائل کا نام درج کریں۔');
      document.getElementById('damIndivName')?.focus();
      return;
    }
    if (!mother) {
      alert(isEn ? 'Please enter mother name.' : 'براہِ کرم والدہ کا نام درج کریں۔');
      document.getElementById('damIndivMother')?.focus();
      return;
    }
    if (!issue) {
      alert(isEn ? 'Please describe the illness or problem.' : 'براہِ کرم مرض یا مسئلے کی تفصیل درج کریں۔');
      document.getElementById('damIndivIssue')?.focus();
      return;
    }
    if (!country) {
      alert(isEn ? 'Please select your country.' : 'براہِ کرم فہرست سے اپنا ملک منتخب کریں۔');
      document.getElementById('damIndivCountry')?.focus();
      return;
    }
    if (!address) {
      alert(isEn ? 'Please enter city and address.' : 'براہِ کرم شہر و پتہ درج کریں۔');
      document.getElementById('damIndivAddress')?.focus();
      return;
    }
    if (!phone) {
      alert(isEn ? 'Please enter WhatsApp or contact phone number.' : 'براہِ کرم رابطہ نمبر درج کریں۔');
      document.getElementById('damIndivPhone')?.focus();
      return;
    }

    if (isEn) {
      msg = '*Bismillahir Rahmanir Rahim*\n';
      msg += '*Monthly Ruqyah & Protection Subscription (خضریٰ ویز)*\n';
      msg += '------------------------------------\n';
      msg += '📦 *Plan:* Individual Plan (1 Person Daily Ruqyah) — Rs. 3,000 / mo\n';
      msg += '👤 *Patient Name:* ' + name + '\n';
      msg += '🧕 *Mother\'s Name:* ' + mother + '\n';
      msg += '📝 *Illness / Affliction Details:* ' + issue + '\n';
      msg += '📍 *Country & Address:* ' + country + ' — ' + address + '\n';
      msg += '📱 *WhatsApp / Mobile:* ' + phone + '\n';
      msg += '🧾 *Payment Slip:* ' + (uploadedDamSlipBase64 ? 'Attached & Uploaded' : 'Transferred') + '\n';
      msg += '------------------------------------\n';
      msg += 'Assalamu Alaikum Mufti Sahib, please activate this monthly Ruqyah plan and include my name in the daily prayers. JazakAllah Khair!';
    } else {
      msg = '*بسم اللہ الرحمن الرحیم*\n';
      msg += '*ماہانہ دم و روحانی حفاظت سبسکرپشن (خضریٰ ویز)*\n';
      msg += '------------------------------------\n';
      msg += '📦 *پلان:* انفرادی پلان (۱ فرد کا روزانہ دم و دعا) — 3,000 روپے ماہانہ\n';
      msg += '👤 *مریض کا نام:* ' + name + '\n';
      msg += '🧕 *والدہ کا نام:* ' + mother + '\n';
      msg += '📝 *مرض یا مسئلہ کی تفصیل:* ' + issue + '\n';
      msg += '📍 *ملک و پتہ:* ' + country + ' — ' + address + '\n';
      msg += '📱 *واٹس ایپ / رابطہ نمبر:* ' + phone + '\n';
      msg += '🧾 *ہدیہ کی رسید:* ' + (uploadedDamSlipBase64 ? 'سلپ ساتھ منسلک ہے' : 'ارسال کر دی گئی ہے') + '\n';
      msg += '------------------------------------\n';
      msg += 'السلام علیکم مفتی صاحب! براہِ کرم یہ انفرادی ماہانہ دم کا پلان ایکٹو فرما کر روزانہ کے دم و دعاؤں میں شامل فرمائیں۔ جزاک اللہ خیراً۔';
    }

  } else {
    // Family Plan
    const m1Name = (document.getElementById('damFam1Name')?.value || '').trim();
    const m1Mother = (document.getElementById('damFam1Mother')?.value || '').trim();
    const m1Issue = (document.getElementById('damFam1Issue')?.value || '').trim();

    if (!m1Name) {
      alert(isEn ? 'Please enter Member 1 (Head / Primary) name.' : 'براہِ کرم پہلے فرد کا نام درج کریں۔');
      document.getElementById('damFam1Name')?.focus();
      return;
    }
    if (!m1Mother) {
      alert(isEn ? 'Please enter Member 1 mother name.' : 'براہِ کرم پہلے فرد کی والدہ کا نام درج کریں۔');
      document.getElementById('damFam1Mother')?.focus();
      return;
    }
    if (!m1Issue) {
      alert(isEn ? 'Please enter Member 1 illness / problem.' : 'براہِ کرم پہلے فرد کے مرض یا مسئلے کی تفصیل درج کریں۔');
      document.getElementById('damFam1Issue')?.focus();
      return;
    }

    const members = [];
    members.push({ num: 1, name: m1Name, mother: m1Mother, issue: m1Issue });

    // Members 2 to 5
    for (let i = 2; i <= 5; i++) {
      const n = (document.getElementById('damFam' + i + 'Name')?.value || '').trim();
      const m = (document.getElementById('damFam' + i + 'Mother')?.value || '').trim();
      const iss = (document.getElementById('damFam' + i + 'Issue')?.value || '').trim();
      if (n) {
        members.push({ num: i, name: n, mother: m || 'Mother', issue: iss || 'General Protection & Dua' });
      }
    }

    const famCountry = (document.getElementById('damFamCountry')?.value || 'Pakistan').trim();
    const famAddress = (document.getElementById('damFamAddress')?.value || '').trim();
    const famPhone = (document.getElementById('damFamPhone')?.value || '').trim();

    if (!famCountry) {
      alert(isEn ? 'Please select family country.' : 'براہِ کرم فہرست سے خاندان کا ملک منتخب کریں۔');
      document.getElementById('damFamCountry')?.focus();
      return;
    }
    if (!famAddress) {
      alert(isEn ? 'Please enter family city and residential address.' : 'براہِ کرم خاندان کا رہائشی پتہ و شہر درج کریں۔');
      document.getElementById('damFamAddress')?.focus();
      return;
    }
    if (!famPhone) {
      alert(isEn ? 'Please enter family WhatsApp or contact number.' : 'براہِ کرم رابطہ نمبر درج کریں۔');
      document.getElementById('damFamPhone')?.focus();
      return;
    }

    if (isEn) {
      msg = '*Bismillahir Rahmanir Rahim*\n';
      msg += '*Monthly Ruqyah & Protection Subscription (خضریٰ ویز)*\n';
      msg += '------------------------------------\n';
      msg += '📦 *Plan:* Complete Family Plan (4 to 5 Members) — Rs. 6,000 / mo\n';
      msg += '📍 *Family Country & Address:* ' + famCountry + ' — ' + famAddress + '\n';
      msg += '📱 *Family Contact / WhatsApp:* ' + famPhone + '\n';
      msg += '\n👨‍👩‍👧‍👦 *Family Members Registered:*\n';
      members.forEach((m) => {
        msg += '• *Member ' + m.num + ':* ' + m.name + ' (Mother: ' + m.mother + ') — Issue: ' + m.issue + '\n';
      });
      msg += '\n🧾 *Payment Slip:* ' + (uploadedDamSlipBase64 ? 'Attached & Uploaded' : 'Transferred') + '\n';
      msg += '------------------------------------\n';
      msg += 'Assalamu Alaikum Mufti Sahib, please activate this family Ruqyah subscription and include our family in the daily prayers. JazakAllah Khair!';
    } else {
      msg = '*بسم اللہ الرحمن الرحیم*\n';
      msg += '*ماہانہ دم و روحانی حفاظت سبسکرپشن (خضریٰ ویز)*\n';
      msg += '------------------------------------\n';
      msg += '📦 *پلان:* مکمل فیملی پلان (۴ تا ۵ افراد) — 6,000 روپے ماہانہ\n';
      msg += '📍 *خاندان کا ملک و پتہ:* ' + famCountry + ' — ' + famAddress + '\n';
      msg += '📱 *رابطہ / واٹس ایپ نمبر:* ' + famPhone + '\n';
      msg += '\n👨‍👩‍👧‍👦 *شامل فیملی ممبرز کی تفصیلات:*\n';
      members.forEach((m) => {
        msg += '• *فرد ' + m.num + ':* ' + m.name + ' (والدہ: ' + m.mother + ') — مرض/مسئلہ: ' + m.issue + '\n';
      });
      msg += '\n🧾 *ہدیہ کی رسید:* ' + (uploadedDamSlipBase64 ? 'سلپ ساتھ منسلک ہے' : 'ارسال کر دی گئی ہے') + '\n';
      msg += '------------------------------------\n';
      msg += 'السلام علیکم مفتی صاحب! براہِ کرم یہ فیملی دم کا پلان ایکٹو فرما کر تمام اہل خانہ کو روزانہ کے دم و دعاؤں میں شامل فرمائیں۔ جزاک اللہ خیراً۔';
    }
  }

  if (typeof window.closeModal === 'function') {
    window.closeModal('modalMonthlyDamBooking');
  }

  if (typeof window.openWhatsAppConsult === 'function') {
    window.openWhatsAppConsult(msg);
  }
};


// ==========================================
// SPIRITUAL DIAGNOSIS & ONLINE CLINIC (TASHKHEES) HANDLERS
// ==========================================
let uploadedTashkheesSlipBase64 = '';

window.openTashkheesModal = function(issueKey = 'black_magic') {
  if (typeof window.initCountryDropdowns === 'function') window.initCountryDropdowns('Pakistan');

  const select = document.getElementById('tashkheesIssueSelect');
  if (select) {
    select.value = issueKey || 'black_magic';
    // If exact key didn't match an option, default to black_magic
    if (!select.value) select.value = 'black_magic';
  }

  const preview = document.getElementById('tashkheesSlipPreview');
  if (preview) {
    preview.style.display = 'none';
    preview.src = '';
  }
  uploadedTashkheesSlipBase64 = '';
  const fileInput = document.getElementById('tashkheesSlipFile');
  if (fileInput) fileInput.value = '';

  if (typeof window.openModal === 'function') {
    window.openModal('modalTashkheesBooking');
  }
};

window.handleTashkheesSlipPreview = function(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    uploadedTashkheesSlipBase64 = e.target.result;
    const preview = document.getElementById('tashkheesSlipPreview');
    if (preview) {
      preview.src = uploadedTashkheesSlipBase64;
      preview.style.display = 'block';
    }
  };
  reader.readAsDataURL(file);
};

window.submitTashkheesForm = function() {
  const isEn = (typeof state !== 'undefined' && state.currentLang === 'en');

  const name = (document.getElementById('tashkheesName')?.value || '').trim();
  const mother = (document.getElementById('tashkheesMother')?.value || '').trim();
  const address = (document.getElementById('tashkheesAddress')?.value || '').trim();
  const country = (document.getElementById('tashkheesCountry')?.value || 'Pakistan').trim();
  const phone = (document.getElementById('tashkheesPhone')?.value || '').trim();
  const symptoms = (document.getElementById('tashkheesSymptoms')?.value || '').trim();

  const select = document.getElementById('tashkheesIssueSelect');
  const issueText = select ? select.options[select.selectedIndex]?.text : 'Spiritual Diagnosis';

  if (!name) {
    alert(isEn ? 'Please enter patient / seeker name.' : 'براہِ کرم مریض یا سائل کا مکمل نام درج کریں۔');
    document.getElementById('tashkheesName')?.focus();
    return;
  }
  if (!mother) {
    alert(isEn ? 'Please enter mother or father name.' : 'براہِ کرم والدہ یا والد کا نام درج کریں۔');
    document.getElementById('tashkheesMother')?.focus();
    return;
  }
  if (!address) {
    alert(isEn ? 'Please enter city & residential address.' : 'براہِ کرم شہر و رہائشی پتہ درج کریں۔');
    document.getElementById('tashkheesAddress')?.focus();
    return;
  }
  if (!country) {
    alert(isEn ? 'Please select country.' : 'براہِ کرم فہرست سے ملک منتخب کریں۔');
    document.getElementById('tashkheesCountry')?.focus();
    return;
  }
  if (!phone) {
    alert(isEn ? 'Please enter WhatsApp or mobile number.' : 'براہِ کرم واٹس ایپ یا رابطہ نمبر درج کریں۔');
    document.getElementById('tashkheesPhone')?.focus();
    return;
  }
  if (!symptoms) {
    alert(isEn ? 'Please describe your symptoms, problem or dreams.' : 'براہِ کرم تکلیف، علامات یا خواب کی مختصر تفصیل درج کریں۔');
    document.getElementById('tashkheesSymptoms')?.focus();
    return;
  }

  let msg = '';
  if (isEn) {
    msg = '*Bismillahir Rahmanir Rahim*\n';
    msg += '*Spiritual Diagnosis & Case Checkup Booking (خضریٰ ویز)*\n';
    msg += '------------------------------------\n';
    msg += '🩺 *Case Type / Issue:* ' + issueText + '\n';
    msg += '👤 *Patient Name:* ' + name + '\n';
    msg += '🧕 *Mother / Parent Name:* ' + mother + '\n';
    msg += '📍 *Country & Address:* ' + country + ' — ' + address + '\n';
    msg += '📱 *WhatsApp / Mobile:* ' + phone + '\n';
    msg += '📝 *Symptoms & Details:* ' + symptoms + '\n';
    msg += '💰 *Consultation Fee:* Rs. 1,000 (Tashkhees Fee)\n';
    msg += '🧾 *Payment Slip:* ' + (uploadedTashkheesSlipBase64 ? 'Attached & Uploaded' : 'Transferred') + '\n';
    msg += '------------------------------------\n';
    msg += 'Assalamu Alaikum Mufti Sahib, I have submitted my case details and the diagnosis consultation fee. Please evaluate my case and advise the authentic spiritual remedy. JazakAllahu Khair!';
  } else {
    msg = '*بسم الله الرحمن الرحيم*\n';
    msg += '*درخواست برائے روحانی تشخیص و آن لائن مطب (خضریٰ ویز)*\n';
    msg += '------------------------------------\n';
    msg += '🩺 *مسئلہ کی قسم:* ' + issueText + '\n';
    msg += '👤 *مریض / سائل کا نام:* ' + name + '\n';
    msg += '🧕 *والدہ / والد کا نام:* ' + mother + '\n';
    msg += '📍 *ملک و رہائشی پتہ:* ' + country + ' — ' + address + '\n';
    msg += '📱 *واٹس ایپ نمبر:* ' + phone + '\n';
    msg += '📝 *تکلیف، علامات یا خواب کی تفصیل:* ' + symptoms + '\n';
    msg += '💰 *ہدیہ تشخیص:* 1,000 روپے (فیس ادا شدہ)\n';
    msg += '🧾 *ہدیہ کی رسید:* ' + (uploadedTashkheesSlipBase64 ? 'سلپ ساتھ منسلک ہے' : 'ارسال کر دی گئی ہے') + '\n';
    msg += '------------------------------------\n';
    msg += 'السلام علیکم مفتی صاحب! میں نے روحانی تشخیص و چیک اپ کیلئے کیس کی تفصیلات اور ہدیہ جمع کروا دیا ہے۔ براہِ کرم معائنہ فرما کر رہنمائی و شرعی علاج تجویز فرمائیں۔ جزاک اللہ خیراً۔';
  }

  if (typeof window.closeModal === 'function') {
    window.closeModal('modalTashkheesBooking');
  }

  if (typeof window.openWhatsAppConsult === 'function') {
    window.openWhatsAppConsult(msg);
  }
};


// =========================================================================
// KHAWAB KI TABEER & ISLAMIC MASAIL CONSULTATION FORM HANDLERS
// =========================================================================

window.submitKhawabConsult = function() {
  const name = document.getElementById('khawabName')?.value.trim();
  const address = document.getElementById('khawabAddress')?.value.trim();
  const dream = document.getElementById('khawabDreamText')?.value.trim();
  const profession = document.getElementById('khawabProfession')?.value.trim();
  const countrySelect = document.getElementById('khawabCountry');
  const country = countrySelect?.value || 'Pakistan (+92)';
  const phone = document.getElementById('khawabPhone')?.value.trim();

  if (!name) {
    showToast('براہِ کرم اپنا مکمل نام درج فرمائیں (Please enter your name)');
    document.getElementById('khawabName')?.focus();
    return;
  }
  if (!address) {
    showToast('براہِ کرم اپنا شہر و رہائشی پتہ درج فرمائیں (Please enter city/address)');
    document.getElementById('khawabAddress')?.focus();
    return;
  }
  if (!dream) {
    showToast('براہِ کرم خواب کی مکمل تفصیل درج فرمائیں (Please enter dream details)');
    document.getElementById('khawabDreamText')?.focus();
    return;
  }
  if (!profession) {
    showToast('براہِ کرم اپنا پیشہ / کام درج فرمائیں (Please enter your profession)');
    document.getElementById('khawabProfession')?.focus();
    return;
  }
  if (!phone) {
    showToast('براہِ کرم اپنا رابطہ واٹس ایپ نمبر درج فرمائیں (Please enter WhatsApp number)');
    document.getElementById('khawabPhone')?.focus();
    return;
  }

  const msg = `🌙 *خضریٰ ویز — خواب کی تعبیر فارم (Khawab Ki Tabeer)* 🌙\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 *سائل / سائلہ کا نام:* ${name}\n` +
    `💼 *پیشہ / کام (Profession):* ${profession}\n` +
    `📍 *شہر و رہائشی پتہ:* ${address}\n` +
    `💭 *دیکھے گئے خواب کی تفصیل:*\n${dream}\n` +
    `📱 *رابطہ نمبر:* ${country} ${phone}\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `السلام علیکم مفتی صاحب، میں نے خواب دیکھا ہے اور اس کی مستند شرعی تعبیر معلوم کرنا چاہتا/چاہتی ہوں۔ برائے مہربانی تعبیر و رہنمائی سے نوازیں۔ جزاکم اللہ خیراً۔`;

  closeModal('modalKhawabConsult');
  const waUrl = `https://wa.me/923317704807?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
  showToast('خواب کی تفصیل واٹس ایپ پر ارسال کی جا رہی ہے...');
};

window.submitMasailConsult = function() {
  const name = document.getElementById('masailName')?.value.trim();
  const question = document.getElementById('masailQuestionText')?.value.trim();
  const profession = document.getElementById('masailProfession')?.value.trim();
  const countrySelect = document.getElementById('masailCountry');
  const country = countrySelect?.value || 'Pakistan (+92)';
  const phone = document.getElementById('masailPhone')?.value.trim();

  if (!name) {
    showToast('براہِ کرم سائل کا نام درج فرمائیں (Please enter your name)');
    document.getElementById('masailName')?.focus();
    return;
  }
  if (!question) {
    showToast('براہِ کرم اپنا شرعی مسئلہ تفصیل سے درج فرمائیں (Please enter question details)');
    document.getElementById('masailQuestionText')?.focus();
    return;
  }
  if (!profession) {
    showToast('براہِ کرم اپنا پیشہ / کام درج فرمائیں (Please enter profession)');
    document.getElementById('masailProfession')?.focus();
    return;
  }
  if (!phone) {
    showToast('براہِ کرم اپنا رابطہ واٹس ایپ نمبر درج فرمائیں (Please enter WhatsApp number)');
    document.getElementById('masailPhone')?.focus();
    return;
  }

  const msg = `⚖️ *خضریٰ ویز — شرعی مسئلہ و فتویٰ فارم (Islamic Masail & Fatwa)* ⚖️\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 *سائل کا نام:* ${name}\n` +
    `❓ *شرعی مسئلہ کی تفصیل:*\n${question}\n` +
    `💼 *پیشہ / کام (Profession):* ${profession}\n` +
    `📱 *رابطہ نمبر:* ${country} ${phone}\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `السلام علیکم مفتی صاحب، برائے مہربانی اس مسئلے کے بارے میں فقہ حنفی و بنوری ٹاؤن کے اصولوں کے مطابق مستند شرعی حکم و فتویٰ مرحمت فرمائیں۔ جزاکم اللہ خیراً۔`;

  closeModal('modalMasailConsult');
  const waUrl = `https://wa.me/923317704807?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
  showToast('شرعی مسئلہ واٹس ایپ پر ارسال کیا جا رہا ہے...');
};


window.downloadSampleResource = function(id) {
  showToast('ڈاؤنلوڈ جاری ہے...');
};


// =========================================================================
// APP BOOTSTRAP: ALL MODULES & FUNCTIONS LOADED
// =========================================================================
function startApp() {
  const tasks = [
    ['Language', typeof initLanguage === 'function' ? initLanguage : null],
    ['Clock', typeof initClock === 'function' ? initClock : null],
    ['Location', typeof initLocation === 'function' ? initLocation : null],
    ['ViewModes', typeof initViewModes === 'function' ? initViewModes : null],
    ['Navigation', typeof initNavigation === 'function' ? initNavigation : null],
    ['Tasbeeh', typeof initTasbeeh === 'function' ? initTasbeeh : null],
    ['Qibla', typeof initQibla === 'function' ? initQibla : null],
    ['UserName', typeof initUserName === 'function' ? initUserName : null],
    ['WazaifFilters', typeof initWazaifFilters === 'function' ? initWazaifFilters : null],
    ['PdfFilters', typeof initPdfFilters === 'function' ? initPdfFilters : null],
    ['FetchData', typeof fetchAllData === 'function' ? fetchAllData : null],
    ['Surahs', typeof populateSurahs === 'function' ? populateSurahs : null],
    ['Hadith', typeof populateHadith === 'function' ? populateHadith : null],
    ['AllahNames', typeof populateAllahNames === 'function' ? populateAllahNames : null],
    ['PrayerTimes', typeof populatePrayerTimes === 'function' ? populatePrayerTimes : null]
  ];

  tasks.forEach(([name, fn]) => {
    try {
      if (fn) fn();
    } catch (err) {
      console.warn('Init task warning [' + name + ']:', err);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApp);
} else {
  startApp();
}


// Interactive 3-Times Recitation Step Tracker for Manzil Sharif
window.trackManzilStep = function(btn) {
  const container = btn.closest('.manzil-reading-tracker');
  if (!container) return;
  const isEn = state.currentLang === 'en';
  let step = parseInt(container.getAttribute('data-current-step') || '0');
  
  step = (step + 1) % 4;
  container.setAttribute('data-current-step', step);

  const pills = container.querySelectorAll('.mrt-step-pill');
  pills.forEach((p, idx) => {
    if (idx < step) {
      p.classList.add('completed');
      p.classList.remove('active');
      p.querySelector('.mrt-status').innerHTML = '<i class="fa-solid fa-circle-check"></i> ' + (isEn ? 'Done' : 'مکمل');
    } else if (idx === step && step < 3) {
      p.classList.add('active');
      p.classList.remove('completed');
      p.querySelector('.mrt-status').textContent = isEn ? 'Reading...' : 'جاری ہے...';
    } else {
      p.classList.remove('completed', 'active');
      p.querySelector('.mrt-status').textContent = isEn ? 'Pending' : 'باقی';
    }
  });

  const btnTxt = btn.querySelector('.mrt-btn-text');
  if (step === 1) {
    if (btnTxt) btnTxt.textContent = isEn ? 'Mark 2nd Recitation Done' : 'دوسری مرتبہ مکمل (یہاں کلک کریں)';
    btn.style.background = '#16A34A';
  } else if (step === 2) {
    if (btnTxt) btnTxt.textContent = isEn ? 'Mark 3rd Recitation Done' : 'تیسری مرتبہ مکمل (یہاں کلک کریں)';
    btn.style.background = '#059669';
  } else if (step === 3) {
    if (btnTxt) btnTxt.textContent = isEn ? '🎉 3 Times Completed! Tap to Reset' : '🎉 ماشاء اللہ! ۳ مرتبہ مکمل ہو گئی (ری سیٹ کریں)';
    btn.style.background = '#047857';
  } else {
    if (btnTxt) btnTxt.textContent = isEn ? 'Mark 1st Recitation Done' : 'پہلی مرتبہ مکمل (یہاں کلک کریں)';
    btn.style.background = '#16A34A';
  }

  // Also sync the tap counter in card footer
  const card = container.closest('.wazifa-interactive-card');
  const countSpan = card ? card.querySelector('.m-count-val') : null;
  if (countSpan) countSpan.textContent = step;
};
