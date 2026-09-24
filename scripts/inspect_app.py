with open('public/index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

with open('out_inspect.txt', 'w', encoding='utf-8') as out:
    for j in range(1660, 1890):
        l = lines[j]
        if any(k in l for k in ['<div class="taweez-card', '<div class="rohani-module-card', 'VIP', 'لوح', 'تیل', 'اگربتی', 'دوا', 'روغنیات', 'ہدیہ']):
            out.write(f"{j+1}: {l.strip()}\n")
print("Done writing out_inspect.txt")
