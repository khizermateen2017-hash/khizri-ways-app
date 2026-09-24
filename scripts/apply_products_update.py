import re

with open('public/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Card 8 in tabFastTreatment (line 4006)
old_ft_card = """              <!-- 8. Dam Kiya Hua Tail -->
              <div class="ft-card-short" data-ft-cat="taweez-oil" onclick="openWhatsAppConsult('السلام علیکم، مجھے دم کیا ہوا تیل آرڈر کرنا ہے۔')" title="کلک کر کے معلومات حاصل کریں">
                <div class="ftc-top-row">
                  <div class="ftc-left-group">
                    <div class="ftc-icon-circle" style="background: linear-gradient(135deg, #D97706 0%, #B45309 100%);">
                      <i class="fa-solid fa-bottle-droplet"></i>
                    </div>
                    <div class="ftc-title-box">
                      <h4>دم کیا ہوا تیل</h4>
                      <div class="ftc-subtitle">Blessed Ruqyah Treatment Oil</div>
                    </div>
                  </div>
                  <span class="ftc-tag">دم شدہ دوا</span>
                </div>
                <div class="ftc-desc">
                  تمام روحانی اور جسمانی بیماریوں، پٹھوں اور جوڑوں کے درد اور سحر کے جسمانی اثرات کے خاتمے کیلئے نہایت مؤثر دم کیا ہوا تیل۔
                </div>
              </div>"""

new_ft_card = """              <!-- 8. Dam Kiya Hua Tail -->
              <div class="ft-card-short" data-ft-cat="taweez-oil" onclick="openTailOrderModal()" title="کلک کر کے دم شدہ تیل کا پوسٹر و آرڈر فارم کھولیں" style="cursor: pointer; border: 1.5px solid #F59E0B; background: linear-gradient(145deg, #FFFFFF 0%, #FFFBEB 100%);">
                <div class="ftc-top-row">
                  <div class="ftc-left-group">
                    <div class="ftc-icon-circle" style="background: linear-gradient(135deg, #D97706 0%, #B45309 100%);">
                      <i class="fa-solid fa-bottle-droplet"></i>
                    </div>
                    <div class="ftc-title-box">
                      <h4 style="color: #92400E;">دم کیا ہوا تیل</h4>
                      <div class="ftc-subtitle">Blessed Ruqyah Treatment Oil • آسان و قرآنی علاج</div>
                    </div>
                  </div>
                  <span class="ftc-tag" style="background: #FEF3C7; color: #92400E; border: 1px solid #FDE68A;">دم شدہ دوا</span>
                </div>
                <div class="ftc-desc">
                  جادو، نظرِ بد، جنات کے خاتمے، بالوں کے گرنے، جلد کے امراض اور جسمانی و جوڑوں کے درد سے نجات کیلئے مفتی صاحب کا خاص دم شدہ تیل۔
                </div>
                <div style="margin-top: 8px; display: flex; justify-content: space-between; align-items: center; font-size: 0.74rem; font-weight: 800; color: #B45309;">
                  <span><i class="fa-solid fa-tag"></i> ہدیہ: Rs. 300 - Rs. 500</span>
                  <span style="background: #16A34A; color: #FFF; padding: 3px 8px; border-radius: 6px;"><i class="fa-solid fa-file-invoice"></i> آرڈر فارم کھولیں</span>
                </div>
              </div>"""

if old_ft_card in content:
    content = content.replace(old_ft_card, new_ft_card, 1)
    print("Updated Card 8 in tabFastTreatment!")
else:
    print("WARNING: old_ft_card not matched exactly, checking regex...")

# 2. Add quick access banner on tabHome (right after prayer card, before sixteen-grid-section)
target_prayer_end = '<!-- 16 Circular Feature Icons (4x4 Grid in Royal Navy Theme) -->'
home_quick_banner = """          <!-- Quick Access VIP Banner: Consecrated Spiritual Products & Dam Shuda Tail -->
          <div class="products-quick-banner" onclick="window.switchTab('tabProducts')" style="margin: 12px 14px 6px 14px; background: linear-gradient(135deg, #1E1B4B 0%, #2E1065 50%, #4338CA 100%); border-radius: 16px; padding: 12px 14px; color: #FFFFFF; display: flex; align-items: center; justify-content: space-between; cursor: pointer; box-shadow: 0 6px 18px rgba(46, 16, 101, 0.22); border: 1px solid rgba(255,255,255,0.15);">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 42px; height: 42px; border-radius: 12px; background: rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; color: #FDE047;">
                <i class="fa-solid fa-bottle-droplet"></i>
              </div>
              <div>
                <div style="font-size: 0.92rem; font-weight: 800; color: #FFFFFF; display: flex; align-items: center; gap: 6px;">
                  <span>متبرک روحانی اشیاء و دم شدہ تیل</span>
                  <span style="font-size: 0.65rem; background: #F59E0B; color: #0F172A; padding: 1px 6px; border-radius: 4px; font-weight: 900;">نیا</span>
                </div>
                <div style="font-size: 0.72rem; color: #CBD5E1;">دم شدہ تیل، روحانی اگر بتی، ۵ کیلیں، سریے، منقش عقیق</div>
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 4px; font-size: 0.78rem; font-weight: 800; color: #FDE047;">
              <span>دیکھیں</span> <i class="fa-solid fa-chevron-left"></i>
            </div>
          </div>

          <!-- 16 Circular Feature Icons (4x4 Grid in Royal Navy Theme) -->"""

if target_prayer_end in content:
    content = content.replace(target_prayer_end, home_quick_banner, 1)
    print("Added quick access banner to tabHome!")
else:
    print("WARNING: target_prayer_end not found!")

# 3. Add tabProducts screen right before tabProfile
tab_profile_target = '<section class="tab-screen" id="tabProfile">'

tab_products_screen = """<!-- ====================================================
     TAB: SPIRITUAL PRODUCTS & TABARRUKAT (متبرک پراڈکٹس و تبرکات)
     ==================================================== -->
<section class="tab-screen" id="tabProducts">
  <div class="sub-screen-header">
    <button class="btn-sub-back" data-open="tabHome" title="واپس ہوم اسکرین پر جائیں"><i class="fa-solid fa-chevron-left"></i></button>
    <h3 class="sub-screen-title" data-i18n="titleProducts">متبرک روحانی پراڈکٹس و تبرکات</h3>
    <button class="btn-sub-action" onclick="openWhatsAppConsult('السلام علیکم مفتی صاحب! مجھے ادارہ خضریٰ ویز کے متبرک تبرکات و دم شدہ اشیاء کی معلومات حاصل کرنی ہے۔')" title="براہِ راست واٹس ایپ رابطہ">
      <i class="fa-brands fa-whatsapp text-green" style="font-size: 1.25rem;"></i>
    </button>
  </div>

  <div class="sub-screen-scroll">
    <div class="products-container">

      <!-- Category Filter Chips -->
      <div class="products-filter-strip">
        <button class="filter-chip-btn active" onclick="filterProducts('all', this)">
          <i class="fa-solid fa-shapes"></i> تمام تبرکات
        </button>
        <button class="filter-chip-btn" onclick="filterProducts('oil', this)">
          <i class="fa-solid fa-bottle-droplet"></i> دم شدہ تیل
        </button>
        <button class="filter-chip-btn" onclick="filterProducts('agarbatti', this)">
          <i class="fa-solid fa-smog"></i> روحانی اگر بتی
        </button>
        <button class="filter-chip-btn" onclick="filterProducts('iron', this)">
          <i class="fa-solid fa-shield-halved"></i> حفاظتی کیلیں و سریے
        </button>
        <button class="filter-chip-btn" onclick="filterProducts('rings', this)">
          <i class="fa-solid fa-gem"></i> متبرک پتھر و انگوٹھیاں
        </button>
      </div>

      <!-- PRODUCT 1: DAM SHUDA TAIL (دم شدہ تیل - OFFICIAL NEW POSTER) -->
      <div class="product-card-item" data-pcat="oil all">
        <div class="product-poster-wrap">
          <img src="/assets/dam-shuda-tail-poster.jpg?v=20260923_1945" alt="دم شدہ تیل - خضریٰ ویز" class="product-poster-img" onclick="openTailOrderModal()" title="پوسٹر بڑا دیکھیں / آرڈر کریں">
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px;">
          <span class="product-badge-pill" style="background: #FEF3C7; color: #92400E; border: 1px solid #FDE68A;">
            <i class="fa-solid fa-star text-gold"></i> آسان علاج • روحانی علاج • قرآنی علاج
          </span>
          <div class="product-title-row">
            <h4 class="product-main-title">دم شدہ تیل (Blessed Ruqyah Treatment Oil)</h4>
          </div>
          <p class="product-desc-text">
            ہر قسم کے جادو، نظرِ بد اور جناتی اثرات کے خاتمے، بالوں کے گرنے، جلدی بیماریوں اور جسمانی و جوڑوں کے شدید درد سے نجات کے لیے مفتی خضر متین صاحب کا خاص دم شدہ تیل۔
          </p>
        </div>

        <!-- 7 Benefits from Official Poster -->
        <div class="product-benefits-grid">
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> جادو کا خاتمہ</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> نظرِ بد کا خاتمہ</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> جنات کا خاتمہ</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> بالوں کا گرنا روکنا</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> جلد کی بیماریاں</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> جسمانی درد کا علاج</div>
          <div class="product-benefit-badge" style="grid-column: span 2; justify-content: center; background: #ECFDF5; border-color: #A7F3D0; color: #047857;">
            <i class="fa-solid fa-circle-check" style="color: #059669;"></i> جوڑ کا درد سے نجات
          </div>
        </div>

        <!-- Official Quote -->
        <div class="product-quote-box">
          <i class="fa-solid fa-quote-right" style="margin-left: 4px; opacity: 0.7;"></i>
          "اس دم شدہ تیل سے اب تک سینکڑوں لوگوں کو شفاء ہوئی ہے"
          <div style="font-size: 0.72rem; color: #78350F; margin-top: 2px;">مذہبی اسکالر ماہر عملیات و جنات • مفتی خضر متین مدظلہ</div>
        </div>

        <!-- Price & Action Row -->
        <div class="product-price-action-row">
          <div class="product-price-box">
            <span class="product-price-label">ہدیہ مبارکہ:</span>
            <span class="product-price-value" style="color: #B45309;">Rs. 300 - Rs. 500</span>
          </div>
          <div class="product-buttons-wrap">
            <button class="btn-product-order btn-product-order-outline" onclick="openTailOrderModal()">
              <i class="fa-solid fa-file-invoice"></i> فارم سے آرڈر
            </button>
            <button class="btn-product-order btn-product-order-primary" onclick="window.open('https://wa.me/923152395969?text=' + encodeURIComponent('السلام علیکم مفتی خضر متین صاحب! مجھے دم شدہ تیل آرڈر کرنا ہے۔ برائے مہربانی ڈلیوری اور تفصیلات سے آگاہ فرمائیں۔ جزاک اللہ خیراً!'), '_blank')">
              <i class="fa-brands fa-whatsapp"></i> واٹس ایپ آرڈر
            </button>
          </div>
        </div>
      </div>

      <!-- PRODUCT 2: ROHANI AGARBATTI (روحانی اگر بتی) -->
      <div class="product-card-item" data-pcat="agarbatti all">
        <div class="product-poster-wrap">
          <img src="/assets/rohani-agarbatti-poster.jpg?v=20260923_1945" alt="روحانی اگر بتی - خضریٰ ویز" class="product-poster-img" onclick="openAgarbattiOrderModal()" title="پوسٹر بڑا دیکھیں / آرڈر کریں">
        </div>

        <div style="display: flex; flex-direction: column; gap: 6px;">
          <span class="product-badge-pill" style="background: #EDE9FE; color: #5B21B6; border: 1px solid #DDD6FE;">
            <i class="fa-solid fa-wind"></i> CONSECRATED SPIRITUAL AGARBATTI
          </span>
          <div class="product-title-row">
            <h4 class="product-main-title">روحانی اگر بتی (Rohani Agarbatti - Spiritual Incense)</h4>
          </div>
          <p class="product-desc-text">
            سحر، جادو و آسیب، شیاطین و نظربد، بیماری، پریشانی، کاروبار کی بندش، بے برکتی اور نحوست کے اثرات ختم کرنے میں نہایت مفید و نافع۔
          </p>
        </div>

        <div class="product-benefits-grid">
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> مکمل 40 یوم کا پیکٹ</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> سحر و بندش کا خاتمہ</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> رزق و برکت کی فضا</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-truck-fast"></i> ہوم ڈلیوری بذریعہ TCS</div>
        </div>

        <div class="product-price-action-row">
          <div class="product-price-box">
            <span class="product-price-label">ہدیہ پیکٹ:</span>
            <span class="product-price-value" style="color: #6D28D9;">Rs. 1,500</span>
          </div>
          <div class="product-buttons-wrap">
            <button class="btn-product-order btn-product-order-outline" onclick="openAgarbattiOrderModal()">
              <i class="fa-solid fa-file-invoice"></i> فارم سے آرڈر
            </button>
            <button class="btn-product-order btn-product-order-primary" onclick="window.open('https://wa.me/923152395969?text=' + encodeURIComponent('السلام علیکم مفتی خضر متین صاحب! مجھے روحانی اگر بتی (Rs. 1,500) حاصل کرنی ہے۔ برائے مہربانی ڈلیوری کا طریقہ ارسال فرمائیں۔'), '_blank')">
              <i class="fa-brands fa-whatsapp"></i> واٹس ایپ آرڈر
            </button>
          </div>
        </div>
      </div>

      <!-- PRODUCT 3: 5 CONSECRATED STEEL NAILS (۵ دم شدہ ۲ انچ اسٹیل کیلیں) -->
      <div class="product-card-item" data-pcat="iron all">
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <span class="product-badge-pill" style="background: #FEE2E2; color: #991B1B; border: 1px solid #FECACA;">
            <i class="fa-solid fa-shield-halved"></i> SPECIAL ROOM & HOME SHIELD • ۵ دم شدہ کیلیں
          </span>
          <div class="product-title-row">
            <h4 class="product-main-title">دم شدہ ۲ انچ اسٹیل کی کیلیں (5 Room Protection Nails)</h4>
          </div>
          <p class="product-desc-text">
            کمرے، فلیٹ یا مکان کے چاروں کونوں اور مرکزی دروازے پر تنصیب کے لیے خاص قرآنی عزائم اور آیاتِ حرز پر دم شدہ ۲ انچ کی ۵ مضبوط اسٹیل کیلیں۔ شدید جناتی اثرات، سحر اور شیطانی وسوسوں سے محفوظ قلعہ۔
          </p>
        </div>

        <div class="product-benefits-grid">
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> ۵ اسٹیل کیلوں کا سیٹ</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> نقشۂ تنصیب شامل</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> جنات و سحر سے مکمل امان</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-box-open"></i> محفوظ کوریئر پارسل</div>
        </div>

        <div class="product-price-action-row">
          <div class="product-price-box">
            <span class="product-price-label">ہدیہ مکمل سیٹ:</span>
            <span class="product-price-value" style="color: #DC2626;">Rs. 6,000</span>
          </div>
          <div class="product-buttons-wrap">
            <button class="btn-product-order btn-product-order-outline" onclick="openSteelNailsOrderModal()">
              <i class="fa-solid fa-file-invoice"></i> فارم سے آرڈر
            </button>
            <button class="btn-product-order btn-product-order-primary" onclick="window.open('https://wa.me/923152395969?text=' + encodeURIComponent('السلام علیکم مفتی خضر متین صاحب! مجھے ۵ دم شدہ اسٹیل کیلوں کا سیٹ (Rs. 6,000) آرڈر کرنا ہے۔ برائے مہربانی رہنمائی فرمائیں۔'), '_blank')">
              <i class="fa-brands fa-whatsapp"></i> واٹس ایپ آرڈر
            </button>
          </div>
        </div>
      </div>

      <!-- PRODUCT 4: 4 CONSECRATED 18-INCH HEAVY IRON RODS (۴ بڑے ۱۸ انچ وزنی سریے) -->
      <div class="product-card-item" data-pcat="iron all">
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <span class="product-badge-pill" style="background: #E0E7FF; color: #3730A3; border: 1px solid #C7D2FE;">
            <i class="fa-solid fa-landmark"></i> PERMANENT BOUNDARY FORTRESS • ۱۸ انچ وزنی سریے
          </span>
          <div class="product-title-row">
            <h4 class="product-main-title">دم شدہ ۱۸ انچ وزنی فولادی سریے (Plot & Property Shield)</h4>
          </div>
          <p class="product-desc-text">
            نئے مکان، فیکٹری، گودام، بنگلے یا رہائشی و کمرشل پلاٹ کے چاروں کونوں میں زیرِ زمین دفن کرنے کے لیے قوی ترین قرآنی عزائم سے دم شدہ ۱۸ انچ کے ۴ وزنی فولادی سریے۔ پرانے خبیث جادو اور دفینوں کا خاتمہ۔
          </p>
        </div>

        <div class="product-benefits-grid">
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> ۴ وزنی ۱۸ انچ سریے</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> پلاٹ و فیکٹری کی مستقل امان</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> شرعی طریقہ تنصیب رہنمائی</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-truck-shield"></i> کارگو محفوظ ڈلیوری</div>
        </div>

        <div class="product-price-action-row">
          <div class="product-price-box">
            <span class="product-price-label">ہدیہ مکمل سیٹ:</span>
            <span class="product-price-value" style="color: #4338CA;">Rs. 25,000</span>
          </div>
          <div class="product-buttons-wrap">
            <button class="btn-product-order btn-product-order-outline" onclick="openSariyeOrderModal()">
              <i class="fa-solid fa-file-invoice"></i> فارم سے آرڈر
            </button>
            <button class="btn-product-order btn-product-order-primary" onclick="window.open('https://wa.me/923152395969?text=' + encodeURIComponent('السلام علیکم مفتی خضر متین صاحب! مجھے دم شدہ ۱۸ انچ فولادی سریوں (Rs. 25,000) کی معلومات اور آرڈر کے لیے رابطہ کرنا ہے۔'), '_blank')">
              <i class="fa-brands fa-whatsapp"></i> واٹس ایپ آرڈر
            </button>
          </div>
        </div>
      </div>

      <!-- PRODUCT 5: CONSECRATED GEMSTONES, RINGS & LOCKETS (متبرک نگینے، انگوٹھیاں و لاکٹ) -->
      <div class="product-card-item" data-pcat="rings all">
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <span class="product-badge-pill" style="background: #ECFDF5; color: #065F46; border: 1px solid #A7F3D0;">
            <i class="fa-solid fa-gem"></i> NATURAL BLESSED GEMSTONES • متبرک پتھر و انگوٹھیاں
          </span>
          <div class="product-title-row">
            <h4 class="product-main-title">متبرک منقش عقیق انگوٹھی و لاکٹ (Engraved Naqsh-e-Ali Gemstones)</h4>
          </div>
          <p class="product-desc-text">
            اصلی یمنی عقیق، فیروزہ اور درِ نجف پر نقشِ علیؓ اور آیاتِ شفاء و حفاظت کی خاص کندہ کاری۔ جادو، جنات اور دشمنوں کے وار سے حفاظت اور روزگار و برکت کے لیے چاندی کی انگوٹھی یا گلے کے لاکٹ کے لیے تیار کردہ۔
          </p>
        </div>

        <div class="product-benefits-grid">
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> اصلی یمنی عقیق و فیروزہ</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> منقش نقشِ علیؓ و حرز</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> چاندی کی انگوٹھی / لاکٹ</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-gift"></i> حسبِ سائز و پسند دستیابی</div>
        </div>

        <div class="product-price-action-row">
          <div class="product-price-box">
            <span class="product-price-label">ہدیہ مبارکہ:</span>
            <span class="product-price-value" style="color: #059669; font-size: 0.95rem;">حسبِ سائز و نگینہ</span>
          </div>
          <div class="product-buttons-wrap">
            <button class="btn-product-order btn-product-order-outline" onclick="openGemstoneRingOrderModal()">
              <i class="fa-solid fa-file-invoice"></i> فارم سے آرڈر
            </button>
            <button class="btn-product-order btn-product-order-primary" onclick="window.open('https://wa.me/923152395969?text=' + encodeURIComponent('السلام علیکم مفتی خضر متین صاحب! مجھے متبرک منقش عقیق انگوٹھی / لاکٹ نگینہ حاصل کرنے کے سلسلے میں معلومات اور ہدیہ کی تفصیل چاہیے۔'), '_blank')">
              <i class="fa-brands fa-whatsapp"></i> واٹس ایپ آرڈر
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<section class="tab-screen" id="tabProfile">"""

if tab_profile_target in content:
    content = content.replace(tab_profile_target, tab_products_screen, 1)
    print("Added tabProducts screen!")
else:
    print("WARNING: tab_profile_target not found!")

# 4. Add the 5 Product Modals right before </body>
all_modals_html = """
  <!-- ====================================================
       MODAL: DAM SHUDA TAIL ORDER (طلبِ دم شدہ تیل)
       ==================================================== -->
  <div class="modal-dialog-layer" id="modalTailOrder">
    <div class="modal-card-container" style="max-width: 480px; width: 92%; max-height: 90vh; overflow-y: auto; border-radius: 20px;">
      <div class="modal-card-top-bar" style="background: linear-gradient(135deg, #B45309 0%, #D97706 50%, #F59E0B 100%); color: #FFFFFF; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h4 style="margin: 0; font-size: 0.95rem; font-weight: 800;"><i class="fa-solid fa-bottle-droplet"></i> طلبِ دم شدہ تیل (آن لائن آرڈر فارم)</h4>
          <span style="font-size: 0.72rem; color: #FEF3C7;">Blessed Ruqyah Treatment Oil • آسان و قرآنی علاج</span>
        </div>
        <button type="button" class="btn-modal-x" onclick="closeTailOrderModal()" style="color: #FFFFFF; background: rgba(255,255,255,0.18); border: none; border-radius: 50%; width: 28px; height: 28px; cursor: pointer;"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div class="modal-card-body" style="padding: 16px 18px; direction: rtl; text-align: right;">
        <!-- Official Poster Display in Modal -->
        <div style="text-align: center; margin-bottom: 12px; border-radius: 12px; overflow: hidden; background: #FFFBEB; border: 1px solid #FDE68A; padding: 6px;">
          <img src="/assets/dam-shuda-tail-poster.jpg?v=20260923_1945" alt="دم شدہ تیل" style="width: 100%; max-height: 220px; object-fit: contain; border-radius: 8px;">
          <div style="font-size: 0.72rem; color: #92400E; font-weight: 700; margin-top: 4px;">
            "اس دم شدہ تیل سے اب تک سینکڑوں لوگوں کو شفاء ہوئی ہے" • مفتی خضر متین مدظلہ
          </div>
        </div>

        <form onsubmit="submitTailOrder(event)">
          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">خریدار / سائل کا نام: *</label>
            <input type="text" id="tailCustName" placeholder="آپ کا پورا نام" required style="width: 100%; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem;">
          </div>

          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">رابطہ / واٹس ایپ موبائل نمبر: *</label>
            <input type="tel" id="tailCustPhone" placeholder="0300 1234567" required style="width: 100%; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem; direction: ltr; text-align: left;">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
            <div>
              <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">بوتل سائز: *</label>
              <select id="tailBottleSize" style="width: 100%; padding: 8px 10px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.82rem;">
                <option value="بڑی بوتل (200ml) - Rs. 500" selected>بڑی بوتل (200ml) - Rs. 500</option>
                <option value="چھوٹی بوتل (100ml) - Rs. 300">چھوٹی بوتل (100ml) - Rs. 300</option>
                <option value="فیملی پیک (3 بڑی بوتلیں) - Rs. 1,500">فیملی پیک (3 بوتلیں) - Rs. 1,500</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">تعداد: *</label>
              <select id="tailQuantity" style="width: 100%; padding: 8px 10px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.82rem;">
                <option value="1" selected>1 بوتل</option>
                <option value="2">2 بوتلیں</option>
                <option value="3">3 بوتلیں</option>
                <option value="5">5 بوتلیں</option>
              </select>
            </div>
          </div>

          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">بیماری / استعمال کا مقصد: *</label>
            <select id="tailDisease" style="width: 100%; padding: 8px 10px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.82rem;">
              <option value="جوڑ کا درد سے نجات" selected>جوڑ کا درد سے نجات (Joint Pain & Arthritis)</option>
              <option value="جسمانی درد کا علاج">جسمانی درد کا علاج (Body & Muscular Pain)</option>
              <option value="جادو کا خاتمہ">جادو کا خاتمہ (Black Magic Destruction)</option>
              <option value="نظرِ بد کا خاتمہ">نظرِ بد کا خاتمہ (Evil Eye Neutralization)</option>
              <option value="جنات کا خاتمہ">جنات کا خاتمہ (Demonic Entity Removal)</option>
              <option value="بالوں کا گرنا">بالوں کا گرنا (Hair Fall Treatment)</option>
              <option value="جلد کی بیماریاں">جلد کی بیماریاں (Skin Diseases & Rashes)</option>
              <option value="عام برکت و مسنون حصار">عام برکت و مسنون حصار (General Healing)</option>
            </select>
          </div>

          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">شہر و ڈلیوری کا طریقہ: *</label>
            <select id="tailDeliveryMode" style="width: 100%; padding: 8px 10px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.82rem;">
              <option value="کراچی (اسی دن بائیکیا / رائیڈر ڈلیوری)" selected>کراچی (اسی دن بائیکیا / رائیڈر ڈلیوری)</option>
              <option value="دیگر شہر پاکستان (بذریعہ ٹی سی ایس / کوریئر)">دیگر شہر پاکستان (بذریعہ ٹی سی ایس / کوریئر)</option>
              <option value="اوورسیز / بین الاقوامی کارگو">اوورسیز / انٹرنیشنل پارسل</option>
            </select>
          </div>

          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">مکمل ڈلیوری ایڈریس (گھر، گلی، علاقہ، شہر): *</label>
            <textarea id="tailCustAddress" rows="2" placeholder="مکمل پتہ درج فرمائیں" required style="width: 100%; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem; resize: vertical;"></textarea>
          </div>

          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 8px 10px; font-size: 0.72rem; color: #64748B; margin-bottom: 14px; line-height: 1.4;">
            <i class="fa-solid fa-circle-info text-blue"></i> <strong>نوٹ:</strong> علاوہ ڈلیوری چارجز (کراچی بذریعہ بائیکیا، دیگر شہر بذریعہ کوریئر)۔ فارم جمع ہوتے ہی تفصیلات واٹس ایپ <strong>0315 2395969</strong> پر موصول ہو جائیں گی۔
          </div>

          <button type="submit" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #16A34A 0%, #15803D 100%); color: #FFFFFF; border: none; border-radius: 10px; font-size: 0.95rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);">
            <i class="fa-brands fa-whatsapp" style="font-size: 1.15rem;"></i> واٹس ایپ پر آرڈر بھیجیں
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- ====================================================
       MODAL: ROHANI AGARBATTI ORDER (طلبِ روحانی اگر بتی)
       ==================================================== -->
  <div class="modal-dialog-layer" id="modalAgarbattiOrder">
    <div class="modal-card-container" style="max-width: 480px; width: 92%; max-height: 90vh; overflow-y: auto; border-radius: 20px;">
      <div class="modal-card-top-bar" style="background: linear-gradient(135deg, #5B21B6 0%, #6D28D9 50%, #7C3AED 100%); color: #FFFFFF; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h4 style="margin: 0; font-size: 0.95rem; font-weight: 800;"><i class="fa-solid fa-wind"></i> طلبِ روحانی اگر بتی (آن لائن آرڈر فارم)</h4>
          <span style="font-size: 0.72rem; color: #EDE9FE;">Rohani Agarbatti • 40 یوم کا خصوصی پیکٹ</span>
        </div>
        <button type="button" class="btn-modal-x" onclick="closeAgarbattiOrderModal()" style="color: #FFFFFF; background: rgba(255,255,255,0.18); border: none; border-radius: 50%; width: 28px; height: 28px; cursor: pointer;"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div class="modal-card-body" style="padding: 16px 18px; direction: rtl; text-align: right;">
        <form onsubmit="submitAgarbattiOrder(event)">
          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">خریدار کا نام: *</label>
            <input type="text" id="agarbattiCustName" placeholder="آپ کا نام" required style="width: 100%; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem;">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
            <div>
              <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">ملک: *</label>
              <select id="agarbattiCountry" style="width: 100%; padding: 8px 10px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.82rem;">
                <option value="Pakistan" selected>Pakistan</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="UAE">UAE</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">واٹس ایپ نمبر: *</label>
              <input type="tel" id="agarbattiCustPhone" placeholder="0300 1234567" required style="width: 100%; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem; direction: ltr; text-align: left;">
            </div>
          </div>

          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">تعداد پیکٹ: *</label>
            <select id="agarbattiQuantity" style="width: 100%; padding: 8px 10px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.82rem;">
              <option value="1 پیکٹ - Rs. 1,500" selected>1 پیکٹ (40 یوم) - Rs. 1,500</option>
              <option value="2 پیکٹ - Rs. 3,000">2 پیکٹ - Rs. 3,000</option>
              <option value="3 پیکٹ - Rs. 4,500">3 پیکٹ - Rs. 4,500</option>
            </select>
          </div>

          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">مقصد / مسئلہ: *</label>
            <select id="agarbattiPurpose" style="width: 100%; padding: 8px 10px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.82rem;">
              <option value="گھر سے منفی اثرات (Negativity) و نحوست دور کرنا" selected>گھر سے منفی اثرات و نحوست دور کرنا</option>
              <option value="سحر، جادو اور شیاطین کا توڑ">سحر، جادو اور شیاطین کا توڑ</option>
              <option value="کاروبار اور روزگار کی بندش کا خاتمہ">کاروبار اور روزگار کی بندش کا خاتمہ</option>
              <option value="گھر میں امن و سکون اور برکت کی فضا">گھر میں امن و سکون اور برکت کی فضا</option>
            </select>
          </div>

          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">مکمل ڈلیوری ایڈریس: *</label>
            <textarea id="agarbattiAddress" rows="2" placeholder="مکمل پتہ درج فرمائیں" required style="width: 100%; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem; resize: vertical;"></textarea>
          </div>

          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">طریقہ ادائیگی: *</label>
            <select id="agarbattiPaymentMethod" style="width: 100%; padding: 8px 10px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.82rem;">
              <option value="ایزی پیسہ / جاز کیش" selected>ایزی پیسہ / جاز کیش</option>
              <option value="میزان بینک آن لائن ٹرانسفر">میزان بینک آن لائن ٹرانسفر</option>
              <option value="کیش آن ڈلیوری (ٹی سی ایس)">کیش آن ڈلیوری (TCS)</option>
            </select>
          </div>

          <button type="submit" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #16A34A 0%, #15803D 100%); color: #FFFFFF; border: none; border-radius: 10px; font-size: 0.95rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);">
            <i class="fa-brands fa-whatsapp" style="font-size: 1.15rem;"></i> واٹس ایپ پر آرڈر بھیجیں
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- ====================================================
       MODAL: 5 STEEL NAILS ORDER (۵ دم شدہ ۲ انچ اسٹیل کیلیں)
       ==================================================== -->
  <div class="modal-dialog-layer" id="modalSteelNailsOrder">
    <div class="modal-card-container" style="max-width: 480px; width: 92%; max-height: 90vh; overflow-y: auto; border-radius: 20px;">
      <div class="modal-card-top-bar" style="background: linear-gradient(135deg, #991B1B 0%, #DC2626 50%, #EF4444 100%); color: #FFFFFF; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h4 style="margin: 0; font-size: 0.95rem; font-weight: 800;"><i class="fa-solid fa-shield-halved"></i> طلبِ ۵ دم شدہ اسٹیل کیلیں</h4>
          <span style="font-size: 0.72rem; color: #FEE2E2;">2-Inch Steel Corner Nails • کمرے اور گھر کا حصار</span>
        </div>
        <button type="button" class="btn-modal-x" onclick="closeSteelNailsOrderModal()" style="color: #FFFFFF; background: rgba(255,255,255,0.18); border: none; border-radius: 50%; width: 28px; height: 28px; cursor: pointer;"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div class="modal-card-body" style="padding: 16px 18px; direction: rtl; text-align: right;">
        <form onsubmit="submitSteelNailsOrder(event)">
          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">خریدار کا نام: *</label>
            <input type="text" id="steelCustName" placeholder="آپ کا نام" required style="width: 100%; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem;">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
            <div>
              <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">ملک: *</label>
              <select id="steelCountry" style="width: 100%; padding: 8px 10px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.82rem;">
                <option value="Pakistan" selected>Pakistan</option>
                <option value="Overseas">Overseas</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">واٹس ایپ نمبر: *</label>
              <input type="tel" id="steelCustPhone" placeholder="0300 1234567" required style="width: 100%; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem; direction: ltr; text-align: left;">
            </div>
          </div>

          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">مطلوبہ سیٹ: *</label>
            <select id="steelQuantity" style="width: 100%; padding: 8px 10px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.82rem;">
              <option value="1 سیٹ (۵ کیلیں) - Rs. 6,000" selected>1 سیٹ (۵ کیلیں) - Rs. 6,000</option>
              <option value="2 سیٹ (۱۰ کیلیں) - Rs. 12,000">2 سیٹ (۱۰ کیلیں) - Rs. 12,000</option>
            </select>
          </div>

          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">مقصد / مسئلہ: *</label>
            <select id="steelPurpose" style="width: 100%; padding: 8px 10px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.82rem;">
              <option value="کمرے سے شدید نیگیٹیوٹی کا خاتمہ" selected>کمرے سے شدید نیگیٹیوٹی کا خاتمہ</option>
              <option value="مکان پر جناتی یا سحر کے اثرات کا قلع قمع">مکان پر جناتی یا سحر کے اثرات کا قلع قمع</option>
              <option value="دکان و دفتر کی مستقل حفاظت و حصار">دکان و دفتر کی مستقل حفاظت و حصار</option>
            </select>
          </div>

          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">ڈلیوری ایڈریس: *</label>
            <textarea id="steelAddress" rows="2" placeholder="مکمل پتہ درج فرمائیں" required style="width: 100%; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem; resize: vertical;"></textarea>
          </div>

          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">طریقہ ادائیگی: *</label>
            <select id="steelPaymentMethod" style="width: 100%; padding: 8px 10px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.82rem;">
              <option value="ایزی پیسہ / جاز کیش" selected>ایزی پیسہ / جاز کیش</option>
              <option value="میزان بینک آن لائن ٹرانسفر">میزان بینک آن لائن ٹرانسفر</option>
            </select>
          </div>

          <button type="submit" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #16A34A 0%, #15803D 100%); color: #FFFFFF; border: none; border-radius: 10px; font-size: 0.95rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);">
            <i class="fa-brands fa-whatsapp" style="font-size: 1.15rem;"></i> واٹس ایپ پر آرڈر بھیجیں
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- ====================================================
       MODAL: 4 HEAVY SARIYE ORDER (۴ دم شدہ ۱۸ انچ فولادی سریے)
       ==================================================== -->
  <div class="modal-dialog-layer" id="modalSariyeOrder">
    <div class="modal-card-container" style="max-width: 480px; width: 92%; max-height: 90vh; overflow-y: auto; border-radius: 20px;">
      <div class="modal-card-top-bar" style="background: linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #4338CA 100%); color: #FFFFFF; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h4 style="margin: 0; font-size: 0.95rem; font-weight: 800;"><i class="fa-solid fa-landmark"></i> طلبِ ۴ دم شدہ فولادی سریے</h4>
          <span style="font-size: 0.72rem; color: #C7D2FE;">18-Inch Heavy Steel Rods • پلاٹ و مکان کی مستقل حفاظت</span>
        </div>
        <button type="button" class="btn-modal-x" onclick="closeSariyeOrderModal()" style="color: #FFFFFF; background: rgba(255,255,255,0.18); border: none; border-radius: 50%; width: 28px; height: 28px; cursor: pointer;"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div class="modal-card-body" style="padding: 16px 18px; direction: rtl; text-align: right;">
        <form onsubmit="submitSariyeOrder(event)">
          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">سائل کا نام: *</label>
            <input type="text" id="sariyeCustName" placeholder="آپ کا نام" required style="width: 100%; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem;">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
            <div>
              <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">ملک: *</label>
              <select id="sariyeCountry" style="width: 100%; padding: 8px 10px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.82rem;">
                <option value="Pakistan" selected>Pakistan</option>
                <option value="Overseas">Overseas</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">واٹس ایپ نمبر: *</label>
              <input type="tel" id="sariyeCustPhone" placeholder="0300 1234567" required style="width: 100%; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem; direction: ltr; text-align: left;">
            </div>
          </div>

          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">پراپرٹی کی نوعیت (رقبہ / سائز):</label>
            <input type="text" id="sariyePropertyDetail" placeholder="مثلاً: 240 گز مکان / 1 کنال پلاٹ / فیکٹری" style="width: 100%; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem;">
          </div>

          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">مطلوبہ سیٹ: *</label>
            <select id="sariyeQuantity" style="width: 100%; padding: 8px 10px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.82rem;">
              <option value="1 سیٹ (۴ بڑے ۱۸ انچ وزنی سریے) - Rs. 25,000" selected>1 سیٹ (۴ سریے) - Rs. 25,000</option>
              <option value="2 سیٹ (۸ بڑے ۱۸ انچ وزنی سریے) - Rs. 50,000">2 سیٹ (۸ سریے) - Rs. 50,000</option>
            </select>
          </div>

          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">ڈلیوری ایڈریس: *</label>
            <textarea id="sariyeAddress" rows="2" placeholder="مکمل پتہ درج فرمائیں" required style="width: 100%; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem; resize: vertical;"></textarea>
          </div>

          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">طریقہ ادائیگی: *</label>
            <select id="sariyePaymentMethod" style="width: 100%; padding: 8px 10px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.82rem;">
              <option value="میزان بینک آن لائن ٹرانسفر" selected>میزان بینک آن لائن ٹرانسفر</option>
              <option value="ایزی پیسہ / جاز کیش">ایزی پیسہ / جاز کیش</option>
            </select>
          </div>

          <button type="submit" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #16A34A 0%, #15803D 100%); color: #FFFFFF; border: none; border-radius: 10px; font-size: 0.95rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);">
            <i class="fa-brands fa-whatsapp" style="font-size: 1.15rem;"></i> واٹس ایپ پر آرڈر بھیجیں
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- ====================================================
       MODAL: GEMSTONE & RING ORDER (متبرک نگینے، انگوٹھیاں و لاکٹ)
       ==================================================== -->
  <div class="modal-dialog-layer" id="modalGemstoneRingOrder">
    <div class="modal-card-container" style="max-width: 480px; width: 92%; max-height: 90vh; overflow-y: auto; border-radius: 20px;">
      <div class="modal-card-top-bar" style="background: linear-gradient(135deg, #065F46 0%, #059669 50%, #10B981 100%); color: #FFFFFF; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h4 style="margin: 0; font-size: 0.95rem; font-weight: 800;"><i class="fa-solid fa-gem"></i> طلبِ متبرک نگینہ و انگوٹھی</h4>
          <span style="font-size: 0.72rem; color: #A7F3D0;">Natural Gemstone &amp; Naqsh-e-Ali Ring / Locket</span>
        </div>
        <button type="button" class="btn-modal-x" onclick="closeGemstoneRingOrderModal()" style="color: #FFFFFF; background: rgba(255,255,255,0.18); border: none; border-radius: 50%; width: 28px; height: 28px; cursor: pointer;"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div class="modal-card-body" style="padding: 16px 18px; direction: rtl; text-align: right;">
        <form onsubmit="submitGemstoneRingOrder(event)">
          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">سائل کا نام: *</label>
            <input type="text" id="gemCustName" placeholder="آپ کا پورا نام" required style="width: 100%; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem;">
          </div>

          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">والدہ کا نام (برائے دعا و روحانی نسبت):</label>
            <input type="text" id="gemMotherName" placeholder="والدہ کا نام" style="width: 100%; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem;">
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
            <div>
              <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">ملک: *</label>
              <select id="gemCountry" style="width: 100%; padding: 8px 10px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.82rem;">
                <option value="Pakistan" selected>Pakistan</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
                <option value="UAE">UAE</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">واٹس ایپ نمبر: *</label>
              <input type="tel" id="gemCustPhone" placeholder="0300 1234567" required style="width: 100%; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem; direction: ltr; text-align: left;">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 10px; margin-bottom: 10px;">
            <div>
              <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">مطلوبہ نگینہ / انگوٹھی: *</label>
              <select id="gemItemType" style="width: 100%; padding: 8px 10px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.82rem;">
                <option value="چاندی کی منقش عقیق انگوٹھی (نقش علی)" selected>چاندی کی منقش عقیق انگوٹھی (نقش علی)</option>
                <option value="صرف منقش یمنی عقیق پتھر (برائے لاکٹ یا انگوٹھی)">صرف منقش یمنی عقیق پتھر (برائے لاکٹ)</option>
                <option value="درِ نجف منقش نگینہ">درِ نجف منقش نگینہ</option>
                <option value="نیشاپوری فیروزہ منقش انگوٹھی">نیشاپوری فیروزہ منقش انگوٹھی</option>
              </select>
            </div>
            <div>
              <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">انگوٹھی سائز:</label>
              <input type="text" id="gemRingSize" placeholder="مثلاً: 18 یا معلوم نہیں" style="width: 100%; padding: 8px 10px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.82rem;">
            </div>
          </div>

          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">مقصد / نیت: *</label>
            <select id="gemPurpose" style="width: 100%; padding: 8px 10px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.82rem;">
              <option value="جادو، جنات اور نظرِ بد سے مستقل حفاظت" selected>جادو، جنات اور نظرِ بد سے مستقل حفاظت</option>
              <option value="رزق، برکت اور دلی تسکین">رزق، برکت اور دلی تسکین</option>
              <option value="دشمنوں اور حاسدین کے شر سے امان">دشمنوں اور حاسدین کے شر سے امان</option>
            </select>
          </div>

          <div style="margin-bottom: 10px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">ڈلیوری ایڈریس: *</label>
            <textarea id="gemAddress" rows="2" placeholder="مکمل پتہ درج فرمائیں" required style="width: 100%; padding: 8px 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.85rem; resize: vertical;"></textarea>
          </div>

          <div style="margin-bottom: 14px;">
            <label style="display: block; font-size: 0.78rem; font-weight: 800; color: #0F172A; margin-bottom: 4px;">طریقہ ادائیگی: *</label>
            <select id="gemPaymentMethod" style="width: 100%; padding: 8px 10px; border: 1px solid #CBD5E1; border-radius: 8px; font-size: 0.82rem;">
              <option value="ایزی پیسہ / جاز کیش" selected>ایزی پیسہ / جاز کیش</option>
              <option value="میزان بینک آن لائن ٹرانسفر">میزان بینک آن لائن ٹرانسفر</option>
              <option value="ویسٹرن یونین / منی گرام (اوورسیز)">ویسٹرن یونین / منی گرام (اوورسیز)</option>
            </select>
          </div>

          <button type="submit" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #16A34A 0%, #15803D 100%); color: #FFFFFF; border: none; border-radius: 10px; font-size: 0.95rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);">
            <i class="fa-brands fa-whatsapp" style="font-size: 1.15rem;"></i> واٹس ایپ پر آرڈر بھیجیں
          </button>
        </form>
      </div>
    </div>
  </div>
"""

body_end_target = '</body>'
if body_end_target in content:
    content = content.replace(body_end_target, all_modals_html + '\n' + body_end_target, 1)
    print("Added all 5 product modals before </body>!")
else:
    print("WARNING: </body> not found!")

with open('public/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully written updated public/index.html! New length:", len(content))
