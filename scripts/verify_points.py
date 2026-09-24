import re

with open('public/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

print("Original length:", len(content))

# Verify insertion points
assert '<section class="tab-screen" id="tabProfile">' in content, "tabProfile not found"
assert '</body>' in content, "</body> not found"
assert '<!-- 8. Dam Kiya Hua Tail -->' in content, "Dam Kiya Hua Tail card not found"

print("All assertion points verified!")
