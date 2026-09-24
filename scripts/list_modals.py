with open('public/index.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
modals = re.findall(r'id=["\'](modal[A-Za-z0-9_]+)["\']', text)
for m in sorted(set(modals)):
    print(f"Modal: {m}")
