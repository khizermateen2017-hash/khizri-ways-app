import re
from collections import Counter

with open('public/index.html', 'r', encoding='utf-8') as f:
    c = f.read()

matches = re.findall(r'data-open="([^"]+)"', c)
for k, v in Counter(matches).most_common():
    print(f"{k}: {v}")
