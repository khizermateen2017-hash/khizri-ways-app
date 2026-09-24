import re

print("Starting update for payment details and button layout...")

# 1. Update public/css/app.css
with open('public/css/app.css', 'r', encoding='utf-8') as f:
    css = f.read()

old_css_target = """.product-price-action-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-top: 10px;
  border-top: 1px solid #F1F5F9;
  flex-wrap: wrap;
}
.product-price-box {
  display: flex;
  flex-direction: column;
}
.product-price-label {
  font-size: 0.7rem;
  color: #64748B;
  font-weight: 700;
}
.product-price-value {
  font-size: 1.12rem;
  font-weight: 900;
  color: #0F172A;
}

.product-buttons-wrap {
  display: flex;
  gap: 8px;
  flex: 1 1 auto;
  justify-content: flex-end;
  flex-wrap: wrap;
}
.btn-product-order {
  padding: 9px 14px;
  border-radius: 10px;
  font-size: 0.82rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  white-space: nowrap;
}"""

new_css_target = """.product-price-action-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 12px;
  border-top: 1px solid #F1F5F9;
  width: 100%;
}
.product-price-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 2px 4px;
}
.product-price-label {
  font-size: 0.78rem;
  color: #64748B;
  font-weight: 700;
}
.product-price-value {
  font-size: 1.15rem;
  font-weight: 900;
  color: #0F172A;
}

.product-buttons-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}
@media (min-width: 520px) {
  .product-buttons-wrap {
    display: grid;
    grid-template-columns: 1.2fr 0.9fr;
  }
}
.btn-product-order {
  padding: 11px 14px;
  border-radius: 10px;
  font-size: 0.86rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  white-space: nowrap;
  width: 100%;
  box-sizing: border-box;
}"""

if old_css_target in css:
    css = css.replace(old_css_target, new_css_target, 1)
    print("Updated CSS in public/css/app.css successfully!")
else:
    print("WARNING: old_css_target not directly matched in CSS, checking normalized...")
    # fallback line replace if needed
    css = re.sub(
        r'\.product-price-action-row\s*\{[^}]+\}\s*\.product-price-box\s*\{[^}]+\}\s*\.product-price-label\s*\{[^}]+\}\s*\.product-price-value\s*\{[^}]+\}\s*\.product-buttons-wrap\s*\{[^}]+\}\s*\.btn-product-order\s*\{[^}]+\}',
        new_css_target,
        css,
        count=1
    )
    print("Applied regex replacement for CSS!")

with open('public/css/app.css', 'w', encoding='utf-8') as f:
    f.write(css)

# 2. Update public/index.html
with open('public/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Payment block template for product modals
payment_box_html = """          <!-- Official Verified Payment Accounts Section (سرکاری ادائیگی اکاؤنٹس) -->
          <div style="background: linear-gradient(135deg, #FEF9C3 0%, #FEF3C7 100%); border: 1.5px solid #F59E0B; border-radius: 12px; padding: 12px; margin-bottom: 14px; box-shadow: 0 2px 8px rgba(245, 158, 11, 0.12); text-align: right; direction: rtl;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; border-bottom: 1px solid rgba(212, 175, 55, 0.35); padding-bottom: 5px;">
              <span style="font-size: 0.82rem; font-weight: 800; color: #854D0E; display: flex; align-items: center; gap: 6px;">
                <i class="fa-solid fa-building-columns text-gold"></i> سرکاری ادائیگی اکاؤنٹس (Official Accounts)
              </span>
              <span style="font-size: 0.68rem; color: #15803D; font-weight: 800; background: #DCFCE7; padding: 2px 7px; border-radius: 6px;">
                <i class="fa-solid fa-circle-check"></i> تصدیق شدہ
              </span>
            </div>

            <!-- Meezan Bank -->
            <div style="background: rgba(255,255,255,0.92); border: 1px solid rgba(212, 175, 55, 0.35); border-radius: 8px; padding: 8px 10px; margin-bottom: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="color: #065F46; font-size: 0.82rem;"><i class="fa-solid fa-landmark"></i> Meezan Bank Ltd</strong>
                <span style="font-size: 0.72rem; color: #475569; font-weight: 700;">Muhammad Khizer Mateen</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                <span style="font-size: 0.76rem;">اکاؤنٹ نمبر: <code style="background:#FEF3C7; padding:2px 6px; border-radius:4px; font-weight:800; color:#92400E; font-size: 0.78rem;">01500103494030</code></span>
                <button type="button" onclick="navigator.clipboard.writeText('01500103494030'); alert('میزان بینک اکاؤنٹ کاپی ہو گیا: 01500103494030');" style="background:#065F46; color:#FFF; border:none; border-radius:4px; padding:3px 9px; font-size:0.68rem; font-weight: 700; cursor:pointer;">کاپی کریں</button>
              </div>
            </div>

            <!-- JazzCash / EasyPaisa / Raast -->
            <div style="background: rgba(255,255,255,0.92); border: 1px solid rgba(212, 175, 55, 0.35); border-radius: 8px; padding: 8px 10px; margin-bottom: 6px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <strong style="color: #DC2626; font-size: 0.82rem;"><i class="fa-solid fa-mobile-screen-button"></i> JazzCash / EasyPaisa / Raast</strong>
                <span style="font-size: 0.72rem; color: #475569; font-weight: 700;">Muhammad Khizer Mateen</span>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                <span style="font-size: 0.76rem;">موبائل اکاؤنٹ: <code style="background:#FEE2E2; padding:2px 6px; border-radius:4px; font-weight:800; color:#B91C1C; font-size: 0.78rem;">03317704807</code></span>
                <button type="button" onclick="navigator.clipboard.writeText('03317704807'); alert('جاز کیش / ایزی پیسہ نمبر کاپی ہو گیا: 03317704807');" style="background:#DC2626; color:#FFF; border:none; border-radius:4px; padding:3px 9px; font-size:0.68rem; font-weight: 700; cursor:pointer;">کاپی کریں</button>
              </div>
            </div>

            <!-- Western Union & International Remittance -->
            <div style="background: rgba(255,255,255,0.95); border: 1px solid rgba(234, 179, 8, 0.45); border-radius: 8px; padding: 8px 10px; margin-bottom: 4px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong style="color: #B45309; font-size: 0.78rem;"><i class="fa-solid fa-earth-americas text-gold"></i> Western Union / بیرونِ ملک ترسیل</strong>
                <span style="font-size: 0.66rem; color: #B45309; font-weight: 800; background: #FEF3C7; padding: 1px 5px; border-radius: 4px;">Wise / Remitly / WU</span>
              </div>
              <div style="font-size: 0.72rem; color: #334155; line-height: 1.4;">
                <div>نام: <strong>Muhammad Khizer Mateen</strong> | شہر: <strong>Karachi, Pakistan</strong></div>
                <div style="margin-top: 2px; display: flex; justify-content: space-between; align-items: center;">
                  <span>IBAN: <code style="background:#FFFBEB; padding:1px 5px; border-radius:3px; font-weight:700; color:#92400E; font-size: 0.7rem;">PK04MEZN0001500103494030</code></span>
                  <button type="button" onclick="navigator.clipboard.writeText('PK04MEZN0001500103494030'); alert('IBAN کاپی ہو گیا: PK04MEZN0001500103494030');" style="background:#D97706; color:#FFF; border:none; border-radius:3px; padding:2px 6px; font-size:0.64rem; font-weight:700; cursor:pointer;">کاپی کریں</button>
                </div>
              </div>
            </div>

            <div style="font-size: 0.72rem; color: #78350F; margin-top: 6px; line-height: 1.4; background: rgba(255,255,255,0.75); padding: 6px 8px; border-radius: 6px;">
              <i class="fa-solid fa-circle-info text-blue"></i> رقم کی ادائیگی کے بعد سلپ / اسکرین شاٹ واٹس ایپ <strong>0315 2395969</strong> پر بھیج دیں۔
            </div>
          </div>"""

# Modal 1: modalTailOrder
old_tail_submit = """          <button type="submit" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #16A34A 0%, #15803D 100%); color: #FFFFFF; border: none; border-radius: 10px; font-size: 0.95rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);">
            <i class="fa-brands fa-whatsapp" style="font-size: 1.15rem;"></i> واٹس ایپ پر آرڈر بھیجیں
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- ====================================================
       MODAL: ROHANI AGARBATTI ORDER"""

new_tail_submit = payment_box_html + "\n\n" + old_tail_submit

if old_tail_submit in html:
    html = html.replace(old_tail_submit, new_tail_submit, 1)
    print("Added payment box to modalTailOrder!")
else:
    print("WARNING: modalTailOrder target not matched!")

# Modal 2: modalAgarbattiOrder
old_agarbatti_submit = """          <button type="submit" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #16A34A 0%, #15803D 100%); color: #FFFFFF; border: none; border-radius: 10px; font-size: 0.95rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);">
            <i class="fa-brands fa-whatsapp" style="font-size: 1.15rem;"></i> واٹس ایپ پر آرڈر بھیجیں
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- ====================================================
       MODAL: 5 STEEL NAILS ORDER"""

new_agarbatti_submit = payment_box_html + "\n\n" + old_agarbatti_submit

if old_agarbatti_submit in html:
    html = html.replace(old_agarbatti_submit, new_agarbatti_submit, 1)
    print("Added payment box to modalAgarbattiOrder!")
else:
    print("WARNING: modalAgarbattiOrder target not matched!")

# Modal 3: modalSteelNailsOrder
old_steel_submit = """          <button type="submit" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #16A34A 0%, #15803D 100%); color: #FFFFFF; border: none; border-radius: 10px; font-size: 0.95rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);">
            <i class="fa-brands fa-whatsapp" style="font-size: 1.15rem;"></i> واٹس ایپ پر آرڈر بھیجیں
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- ====================================================
       MODAL: 4 HEAVY SARIYE ORDER"""

new_steel_submit = payment_box_html + "\n\n" + old_steel_submit

if old_steel_submit in html:
    html = html.replace(old_steel_submit, new_steel_submit, 1)
    print("Added payment box to modalSteelNailsOrder!")
else:
    print("WARNING: modalSteelNailsOrder target not matched!")

# Modal 4: modalSariyeOrder
old_sariye_submit = """          <button type="submit" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #16A34A 0%, #15803D 100%); color: #FFFFFF; border: none; border-radius: 10px; font-size: 0.95rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);">
            <i class="fa-brands fa-whatsapp" style="font-size: 1.15rem;"></i> واٹس ایپ پر آرڈر بھیجیں
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- ====================================================
       MODAL: GEMSTONE & RING ORDER"""

new_sariye_submit = payment_box_html + "\n\n" + old_sariye_submit

if old_sariye_submit in html:
    html = html.replace(old_sariye_submit, new_sariye_submit, 1)
    print("Added payment box to modalSariyeOrder!")
else:
    print("WARNING: modalSariyeOrder target not matched!")

# Modal 5: modalGemstoneRingOrder
old_gem_submit = """          <button type="submit" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #16A34A 0%, #15803D 100%); color: #FFFFFF; border: none; border-radius: 10px; font-size: 0.95rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.3);">
            <i class="fa-brands fa-whatsapp" style="font-size: 1.15rem;"></i> واٹس ایپ پر آرڈر بھیجیں
          </button>
        </form>
      </div>
    </div>
  </div>

</body>"""

new_gem_submit = payment_box_html + "\n\n" + old_gem_submit

if old_gem_submit in html:
    html = html.replace(old_gem_submit, new_gem_submit, 1)
    print("Added payment box to modalGemstoneRingOrder!")
else:
    print("WARNING: modalGemstoneRingOrder target not matched!")

# Update product card buttons order in all 5 cards so WhatsApp is FIRST and prominent below the price
old_tail_btns = """          <div class="product-buttons-wrap">
            <button class="btn-product-order btn-product-order-outline" onclick="openTailOrderModal()">
              <i class="fa-solid fa-file-invoice"></i> فارم سے آرڈر
            </button>
            <button class="btn-product-order btn-product-order-primary" onclick="window.open('https://wa.me/923152395969?text=' + encodeURIComponent('السلام علیکم مفتی خضر متین صاحب! مجھے دم شدہ تیل آرڈر کرنا ہے۔ برائے مہربانی ڈلیوری اور تفصیلات سے آگاہ فرمائیں۔ جزاک اللہ خیراً!'), '_blank')">
              <i class="fa-brands fa-whatsapp"></i> واٹس ایپ آرڈر
            </button>
          </div>"""

new_tail_btns = """          <div class="product-buttons-wrap">
            <button class="btn-product-order btn-product-order-primary" onclick="window.open('https://wa.me/923152395969?text=' + encodeURIComponent('السلام علیکم مفتی خضر متین صاحب! مجھے دم شدہ تیل آرڈر کرنا ہے۔ برائے مہربانی ڈلیوری اور تفصیلات سے آگاہ فرمائیں۔ جزاک اللہ خیراً!'), '_blank')">
              <i class="fa-brands fa-whatsapp" style="font-size: 1.1rem;"></i> واٹس ایپ آرڈر (0315 2395969)
            </button>
            <button class="btn-product-order btn-product-order-outline" onclick="openTailOrderModal()">
              <i class="fa-solid fa-file-invoice"></i> فارم سے آرڈر کریں
            </button>
          </div>"""

if old_tail_btns in html:
    html = html.replace(old_tail_btns, new_tail_btns, 1)
    print("Updated button order in Tail card!")

old_agar_btns = """          <div class="product-buttons-wrap">
            <button class="btn-product-order btn-product-order-outline" onclick="openAgarbattiOrderModal()">
              <i class="fa-solid fa-file-invoice"></i> فارم سے آرڈر
            </button>
            <button class="btn-product-order btn-product-order-primary" onclick="window.open('https://wa.me/923152395969?text=' + encodeURIComponent('السلام علیکم مفتی خضر متین صاحب! مجھے روحانی اگر بتی (Rs. 1,500) حاصل کرنی ہے۔ برائے مہربانی ڈلیوری کا طریقہ ارسال فرمائیں۔'), '_blank')">
              <i class="fa-brands fa-whatsapp"></i> واٹس ایپ آرڈر
            </button>
          </div>"""

new_agar_btns = """          <div class="product-buttons-wrap">
            <button class="btn-product-order btn-product-order-primary" onclick="window.open('https://wa.me/923152395969?text=' + encodeURIComponent('السلام علیکم مفتی خضر متین صاحب! مجھے روحانی اگر بتی (Rs. 1,500) حاصل کرنی ہے۔ برائے مہربانی ڈلیوری کا طریقہ ارسال فرمائیں۔'), '_blank')">
              <i class="fa-brands fa-whatsapp" style="font-size: 1.1rem;"></i> واٹس ایپ آرڈر (0315 2395969)
            </button>
            <button class="btn-product-order btn-product-order-outline" onclick="openAgarbattiOrderModal()">
              <i class="fa-solid fa-file-invoice"></i> فارم سے آرڈر کریں
            </button>
          </div>"""

if old_agar_btns in html:
    html = html.replace(old_agar_btns, new_agar_btns, 1)
    print("Updated button order in Agarbatti card!")

old_steel_btns = """          <div class="product-buttons-wrap">
            <button class="btn-product-order btn-product-order-outline" onclick="openSteelNailsOrderModal()">
              <i class="fa-solid fa-file-invoice"></i> فارم سے آرڈر
            </button>
            <button class="btn-product-order btn-product-order-primary" onclick="window.open('https://wa.me/923152395969?text=' + encodeURIComponent('السلام علیکم مفتی خضر متین صاحب! مجھے ۵ دم شدہ اسٹیل کیلوں کا سیٹ (Rs. 6,000) آرڈر کرنا ہے۔ برائے مہربانی رہنمائی فرمائیں۔'), '_blank')">
              <i class="fa-brands fa-whatsapp"></i> واٹس ایپ آرڈر
            </button>
          </div>"""

new_steel_btns = """          <div class="product-buttons-wrap">
            <button class="btn-product-order btn-product-order-primary" onclick="window.open('https://wa.me/923152395969?text=' + encodeURIComponent('السلام علیکم مفتی خضر متین صاحب! مجھے ۵ دم شدہ اسٹیل کیلوں کا سیٹ (Rs. 6,000) آرڈر کرنا ہے۔ برائے مہربانی رہنمائی فرمائیں۔'), '_blank')">
              <i class="fa-brands fa-whatsapp" style="font-size: 1.1rem;"></i> واٹس ایپ آرڈر (0315 2395969)
            </button>
            <button class="btn-product-order btn-product-order-outline" onclick="openSteelNailsOrderModal()">
              <i class="fa-solid fa-file-invoice"></i> فارم سے آرڈر کریں
            </button>
          </div>"""

if old_steel_btns in html:
    html = html.replace(old_steel_btns, new_steel_btns, 1)
    print("Updated button order in Steel Nails card!")

old_sariye_btns = """          <div class="product-buttons-wrap">
            <button class="btn-product-order btn-product-order-outline" onclick="openSariyeOrderModal()">
              <i class="fa-solid fa-file-invoice"></i> فارم سے آرڈر
            </button>
            <button class="btn-product-order btn-product-order-primary" onclick="window.open('https://wa.me/923152395969?text=' + encodeURIComponent('السلام علیکم مفتی خضر متین صاحب! مجھے دم شدہ ۱۸ انچ فولادی سریوں (Rs. 25,000) کی معلومات اور آرڈر کے لیے رابطہ کرنا ہے۔'), '_blank')">
              <i class="fa-brands fa-whatsapp"></i> واٹس ایپ آرڈر
            </button>
          </div>"""

new_sariye_btns = """          <div class="product-buttons-wrap">
            <button class="btn-product-order btn-product-order-primary" onclick="window.open('https://wa.me/923152395969?text=' + encodeURIComponent('السلام علیکم مفتی خضر متین صاحب! مجھے دم شدہ ۱۸ انچ فولادی سریوں (Rs. 25,000) کی معلومات اور آرڈر کے لیے رابطہ کرنا ہے۔'), '_blank')">
              <i class="fa-brands fa-whatsapp" style="font-size: 1.1rem;"></i> واٹس ایپ آرڈر (0315 2395969)
            </button>
            <button class="btn-product-order btn-product-order-outline" onclick="openSariyeOrderModal()">
              <i class="fa-solid fa-file-invoice"></i> فارم سے آرڈر کریں
            </button>
          </div>"""

if old_sariye_btns in html:
    html = html.replace(old_sariye_btns, new_sariye_btns, 1)
    print("Updated button order in Sariye card!")

old_gem_btns = """          <div class="product-buttons-wrap">
            <button class="btn-product-order btn-product-order-outline" onclick="openGemstoneRingOrderModal()">
              <i class="fa-solid fa-file-invoice"></i> فارم سے آرڈر
            </button>
            <button class="btn-product-order btn-product-order-primary" onclick="window.open('https://wa.me/923152395969?text=' + encodeURIComponent('السلام علیکم مفتی خضر متین صاحب! مجھے متبرک منقش عقیق انگوٹھی یا نگینہ حاصل کرنے کے لیے رہنمائی درکار ہے۔'), '_blank')">
              <i class="fa-brands fa-whatsapp"></i> واٹس ایپ آرڈر
            </button>
          </div>"""

new_gem_btns = """          <div class="product-buttons-wrap">
            <button class="btn-product-order btn-product-order-primary" onclick="window.open('https://wa.me/923152395969?text=' + encodeURIComponent('السلام علیکم مفتی خضر متین صاحب! مجھے متبرک منقش عقیق انگوٹھی یا نگینہ حاصل کرنے کے لیے رہنمائی درکار ہے۔'), '_blank')">
              <i class="fa-brands fa-whatsapp" style="font-size: 1.1rem;"></i> واٹس ایپ آرڈر (0315 2395969)
            </button>
            <button class="btn-product-order btn-product-order-outline" onclick="openGemstoneRingOrderModal()">
              <i class="fa-solid fa-file-invoice"></i> فارم سے آرڈر کریں
            </button>
          </div>"""

if old_gem_btns in html:
    html = html.replace(old_gem_btns, new_gem_btns, 1)
    print("Updated button order in Gemstone card!")

# Bump cache busters
html = html.replace('/css/app.css?v=20260923_2005', '/css/app.css?v=20260923_2025')
html = html.replace('/js/app.js?v=20260923_2005', '/js/app.js?v=20260923_2025')

with open('public/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Saved updated public/index.html with payment details and updated button layout!")
