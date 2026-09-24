# 1. Update public/index.html
with open('public/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Update product benefits grid for Agarbatti
old_grid = """        <div class="product-benefits-grid">
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> مکمل 40 یوم کا پیکٹ</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> سحر و بندش کا خاتمہ</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> رزق و برکت کی فضا</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-truck-fast"></i> ہوم ڈلیوری بذریعہ TCS</div>
        </div>"""

new_grid = """        <div class="product-benefits-grid">
          <div class="product-benefit-badge" style="grid-column: span 2; background: #FAF5FF; border-color: #DDD6FE; color: #6D28D9; font-weight: 800;">
            <i class="fa-solid fa-fire-flame-curved" style="color: #7C3AED;"></i> گھر، آفس، کمپنی اور فیکٹری میں جلانے کیلئے (نیگیٹیویٹی کا خاتمہ)
          </div>
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> سحر و بندش کا خاتمہ</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> رزق و برکت کی فضا</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-circle-check"></i> آسیب، نظرِ بد و نحوست دور</div>
          <div class="product-benefit-badge"><i class="fa-solid fa-truck-fast"></i> ہوم ڈلیوری بذریعہ TCS</div>
        </div>"""

if old_grid in content:
    content = content.replace(old_grid, new_grid, 1)
    print("Updated Agarbatti benefits grid in index.html!")
else:
    print("WARNING: old_grid not found!")

# Update modalAgarbattiOrder
old_modal_header = """          <h4 style="margin: 0; font-size: 0.95rem; font-weight: 800;"><i class="fa-solid fa-wind"></i> طلبِ روحانی اگر بتی (آن لائن آرڈر فارم)</h4>
          <span style="font-size: 0.72rem; color: #EDE9FE;">Rohani Agarbatti • 40 یوم کا خصوصی پیکٹ</span>"""

new_modal_header = """          <h4 style="margin: 0; font-size: 0.95rem; font-weight: 800;"><i class="fa-solid fa-wind"></i> طلبِ روحانی اگر بتی (آن لائن آرڈر فارم)</h4>
          <span style="font-size: 0.72rem; color: #EDE9FE;">Rohani Agarbatti • گھر، آفس، کمپنی و فیکٹری میں جلانے کیلئے</span>"""

content = content.replace(old_modal_header, new_modal_header, 1)

old_qty = '<option value="1 پیکٹ - Rs. 1,500" selected>1 پیکٹ (40 یوم) - Rs. 1,500</option>'
new_qty = '<option value="1 پیکٹ - Rs. 1,500" selected>1 پیکٹ - Rs. 1,500</option>'
content = content.replace(old_qty, new_qty, 1)

old_purp = '<option value="گھر سے منفی اثرات (Negativity) و نحوست دور کرنا" selected>گھر سے منفی اثرات و نحوست دور کرنا</option>'
new_purp = '<option value="گھر، آفس، کمپنی یا فیکٹری سے نیگیٹیویٹی (Negativity) و نحوست دور کرنا" selected>گھر، آفس، کمپنی یا فیکٹری سے نیگیٹیویٹی و نحوست دور کرنا</option>'
content = content.replace(old_purp, new_purp, 1)

# Bump cache buster
content = content.replace('/css/app.css?v=20260923_1955', '/css/app.css?v=20260923_2005')
content = content.replace('/js/app.js?v=20260923_1955', '/js/app.js?v=20260923_2005')

with open('public/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Saved updated public/index.html!")

# 2. Update public/js/app.js
with open('public/js/app.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

old_js_purp = "const purpose = (document.getElementById('agarbattiPurpose')?.value || 'گھر سے منفی اثرات (Negativity) و نحوست دور کرنا').trim();"
new_js_purp = "const purpose = (document.getElementById('agarbattiPurpose')?.value || 'گھر، آفس، کمپنی یا فیکٹری سے نیگیٹیویٹی (Negativity) و نحوست دور کرنا').trim();"

if old_js_purp in js_content:
    js_content = js_content.replace(old_js_purp, new_js_purp, 1)
    print("Updated purpose in app.js!")
else:
    print("WARNING: old_js_purp not found in app.js!")

with open('public/js/app.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Saved updated public/js/app.js!")
