with open('public/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update cache busters
content = content.replace('/css/app.css?v=20260923_1825', '/css/app.css?v=20260923_1945')
content = content.replace('/js/app.js?v=20260923_1825', '/js/app.js?v=20260923_1945')

# 2. Add tabProducts link in tabProfile
profile_target = """            <div class="profile-links-list">
              <div class="p-link-item" data-open="tabAboutUs" style="cursor:pointer;">"""

profile_replacement = """            <div class="profile-links-list">
              <!-- Link to Consecrated Spiritual Products -->
              <div class="p-link-item" data-open="tabProducts" style="cursor:pointer; border: 1.5px solid #F59E0B; background: #FFFBEB;">
                <div class="p-link-left">
                  <div class="p-icon-box" style="background:#D97706; color:#FFFFFF;"><i class="fa-solid fa-bottle-droplet"></i></div>
                  <div>
                    <strong style="color: #92400E;">متبرک روحانی اشیاء و دم شدہ تیل</strong>
                    <p>Dam Shuda Tail, Agarbatti, 5 Nails, Sariye &amp; Rings</p>
                  </div>
                </div>
                <i class="fa-solid fa-chevron-right" style="color: #D97706;"></i>
              </div>

              <div class="p-link-item" data-open="tabAboutUs" style="cursor:pointer;">"""

if profile_target in content:
    content = content.replace(profile_target, profile_replacement, 1)
    print("Added tabProducts link in tabProfile!")
else:
    print("WARNING: profile_target not matched!")

# 3. Add Dam Shuda Tail showcase card in tabRohaniIlaj (Urdu section)
rohani_target = """                <div style="font-size: 0.72rem; color: var(--text-muted); text-align: center; margin-top: 8px; font-family: var(--font-arabic);">
                  <i class="fa-solid fa-circle-info text-gold"></i> مریض اور فیملی ممبرز کے نام درج کرنے کے لیے اوپر سے مطلوبہ پلان کے بٹن پر کلک فرمائیں۔
                </div>
              </div>

              <!-- ==========================================
                   2. KHAS AMLIYAT & SADQA / KAAT HISAS (APP THEMED)"""

rohani_replacement = """                <div style="font-size: 0.72rem; color: var(--text-muted); text-align: center; margin-top: 8px; font-family: var(--font-arabic);">
                  <i class="fa-solid fa-circle-info text-gold"></i> مریض اور فیملی ممبرز کے نام درج کرنے کے لیے اوپر سے مطلوبہ پلان کے بٹن پر کلک فرمائیں۔
                </div>
              </div>

              <!-- SPECIAL TABARRUK: DAM SHUDA TAIL CARD IN ROHANI ILAJ -->
              <div class="rohani-module-card" style="margin-bottom: 20px; border: 1.5px solid #F59E0B; background: linear-gradient(135deg, #FFFDF8 0%, #FFFBEB 100%); box-shadow: 0 4px 18px rgba(217, 119, 6, 0.12);">
                <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 10px;">
                  <img src="/assets/dam-shuda-tail-poster.jpg?v=20260923_1945" alt="دم شدہ تیل" style="width: 85px; height: 110px; object-fit: contain; border-radius: 10px; border: 1px solid #FDE68A; cursor: pointer; background: #FFF;" onclick="openTailOrderModal()">
                  <div style="flex: 1;">
                    <span style="background: #FEF3C7; color: #92400E; font-size: 0.68rem; font-weight: 800; padding: 2px 6px; border-radius: 4px; border: 1px solid #FDE68A;">
                      آسان علاج • روحانی علاج • قرآنی علاج
                    </span>
                    <h4 style="margin: 4px 0 2px 0; font-size: 0.98rem; font-weight: 900; color: #78350F;">دم شدہ تیل (خضریٰ شفاء آئل)</h4>
                    <p style="margin: 0; font-size: 0.74rem; color: #451A03; line-height: 1.4;">
                      جادو، نظرِ بد، جنات کے خاتمے، بالوں کے گرنے، جلدی بیماریوں اور جسمانی و جوڑوں کے درد کا مجرب علاج۔
                    </p>
                  </div>
                </div>
                <div style="display: flex; gap: 8px; justify-content: flex-end;">
                  <button type="button" onclick="openTailOrderModal()" style="flex: 1; padding: 8px 12px; background: #D97706; color: #FFF; border: none; border-radius: 8px; font-size: 0.78rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                    <i class="fa-solid fa-file-invoice"></i> آرڈر فارم پُر کریں
                  </button>
                  <button type="button" onclick="window.switchTab('tabProducts')" style="padding: 8px 12px; background: #FEF3C7; color: #92400E; border: 1px solid #FDE68A; border-radius: 8px; font-size: 0.78rem; font-weight: 800; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 5px;">
                    <i class="fa-solid fa-eye"></i> تمام تبرکات دیکھیں
                  </button>
                </div>
              </div>

              <!-- ==========================================
                   2. KHAS AMLIYAT & SADQA / KAAT HISAS (APP THEMED)"""

if rohani_target in content:
    content = content.replace(rohani_target, rohani_replacement, 1)
    print("Added Dam Shuda Tail card in tabRohaniIlaj!")
else:
    print("WARNING: rohani_target not matched!")

with open('public/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Saved public/index.html updates successfully!")
