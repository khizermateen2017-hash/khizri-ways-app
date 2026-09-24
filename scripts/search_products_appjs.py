with open('public/js/app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

with open('products_code_context.txt', 'w', encoding='utf-8') as out:
    for i, line in enumerate(lines):
        if any(k in line.lower() for k in ['titleproducts', 'tabproducts', 'corner nails', 'dam-shuda', 'agarbatti', 'opennailordermodal', 'opentailordermodal']):
            out.write(f"Line {i+1}: {line.strip()}\n")
print("Done searching app.js")
