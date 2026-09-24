with open('public/index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if any(k in line.lower() for k in ['id="tabproducts"', 'rohani agarbatti', 'dam-shuda-tail-poster']):
        safe_snippet = line.strip()[:80].encode('ascii', errors='replace').decode()
        print(f"Line {i+1}: {safe_snippet}")
