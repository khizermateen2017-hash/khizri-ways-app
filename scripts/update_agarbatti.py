with open('public/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Bump cache busters
content = content.replace('/assets/rohani-agarbatti-poster.jpg?v=20260923_1945', '/assets/rohani-agarbatti-poster.jpg?v=20260923_1955')
content = content.replace('/css/app.css?v=20260923_1945', '/css/app.css?v=20260923_1955')
content = content.replace('/js/app.js?v=20260923_1945', '/js/app.js?v=20260923_1955')

# 2. Add poster display in modalAgarbattiOrder
target_modal_body = """      <div class="modal-card-body" style="padding: 16px 18px; direction: rtl; text-align: right;">
        <form onsubmit="submitAgarbattiOrder(event)">"""

replacement_modal_body = """      <div class="modal-card-body" style="padding: 16px 18px; direction: rtl; text-align: right;">
        <!-- Official Poster Display in Modal -->
        <div style="text-align: center; margin-bottom: 12px; border-radius: 12px; overflow: hidden; background: #FAF5FF; border: 1px solid #DDD6FE; padding: 6px;">
          <img src="/assets/rohani-agarbatti-poster.jpg?v=20260923_1955" alt="روحانی اگر بتی" style="width: 100%; max-height: 220px; object-fit: contain; border-radius: 8px;">
          <div style="font-size: 0.72rem; color: #6D28D9; font-weight: 700; margin-top: 4px;">
            سحر، جادو، شیاطین، نظربد اور نحوست کے اثرات کے خاتمے میں مفید و نافع • مفتی خضر متین مدظلہ
          </div>
        </div>

        <form onsubmit="submitAgarbattiOrder(event)">"""

if target_modal_body in content:
    content = content.replace(target_modal_body, replacement_modal_body, 1)
    print("Added poster preview inside modalAgarbattiOrder!")
else:
    print("WARNING: target_modal_body not matched!")

with open('public/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Saved public/index.html with Agarbatti updates!")
