with open('public/js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'fetch\([\'"](/api[^ \'"]+)[\'"]', text)
print('API fetch calls in app.js:', set(matches))
