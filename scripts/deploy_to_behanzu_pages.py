import os
import shutil
import json
import re
import subprocess

SRC_DIR = r'E:\Projects\khizri-ways-app'
PUBLIC_DIR = os.path.join(SRC_DIR, 'public')
DB_FILE = os.path.join(SRC_DIR, 'server', 'data', 'db.json')
DEST_REPO = r'E:\Projects\behanzu_pages_temp'
DEST_KHIZRI = os.path.join(DEST_REPO, 'khizri')

print("=== Starting deployment to behanzu.github.io/khizri/ ===")

# 1. Clean or create dest folder
if os.path.exists(DEST_KHIZRI):
    shutil.rmtree(DEST_KHIZRI)
os.makedirs(DEST_KHIZRI, exist_ok=True)

# 2. Copy public directory
print("Copying public assets to khizri/...")
for item in os.listdir(PUBLIC_DIR):
    s = os.path.join(PUBLIC_DIR, item)
    d = os.path.join(DEST_KHIZRI, item)
    if os.path.isdir(s):
        shutil.copytree(s, d)
    else:
        shutil.copy2(s, d)

# 3. Create static api endpoints
api_dir = os.path.join(DEST_KHIZRI, 'api')
os.makedirs(api_dir, exist_ok=True)

with open(DB_FILE, 'r', encoding='utf-8') as f:
    db = json.load(f)

endpoints = {
    'resources': {'success': True, 'data': db.get('resources', [])},
    'videos': {'success': True, 'data': db.get('videos', [])},
    'wazaif': {'success': True, 'data': db.get('wazaif', [])},
    'fatwas': {'success': True, 'data': db.get('fatwas', [])},
    'settings': {'success': True, 'data': db.get('settings', {})},
}

for name, payload in endpoints.items():
    # Save as both name and name.json for max compatibility
    for fname in [name, f"{name}.json"]:
        p = os.path.join(api_dir, fname)
        with open(p, 'w', encoding='utf-8') as f:
            json.dump(payload, f, ensure_ascii=False, indent=2)

print("Generated static API JSON endpoints!")

# 4. Make index.html relative for GitHub Pages subfolder /khizri/
index_path = os.path.join(DEST_KHIZRI, 'index.html')
with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace root slashes with relative dots
html = html.replace('href="/css/', 'href="./css/')
html = html.replace('src="/js/', 'src="./js/')
html = html.replace('src="/assets/', 'src="./assets/')
html = html.replace('src="/uploads/', 'src="./uploads/')
html = html.replace('href="/downloads/', 'href="./downloads/')
html = html.replace('action="/api/', 'action="./api/')

# Add <base href="./"> right after <head>
if '<head>' in html:
    html = html.replace('<head>', '<head>\n  <base href="./">', 1)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated index.html with relative paths and <base href='./'>!")

# 5. Make app.js relative
appjs_path = os.path.join(DEST_KHIZRI, 'js', 'app.js')
if os.path.exists(appjs_path):
    with open(appjs_path, 'r', encoding='utf-8') as f:
        js = f.read()

    js = js.replace("fetch('/api/", "fetch('./api/")
    js = js.replace('fetch("/api/', 'fetch("./api/')
    js = js.replace("'/uploads/", "'./uploads/")
    js = js.replace('"/uploads/', '"./uploads/')
    js = js.replace("'/assets/", "'./assets/")
    js = js.replace('"/assets/', '"./assets/')

    with open(appjs_path, 'w', encoding='utf-8') as f:
        f.write(js)
    print("Updated app.js with relative fetch calls!")

# 6. Ensure .nojekyll in root of repo
nojekyll = os.path.join(DEST_REPO, '.nojekyll')
if not os.path.exists(nojekyll):
    open(nojekyll, 'w').close()

# 7. Also create a nice redirect or link from root index.html if desired or keep existing
# We preserve root index.html completely so existing automation dashboard is untouched!

print("=== Files ready in behanzu_pages_temp/khizri ===")
