import urllib.request
import re

print("Running automated verification tests...")

# 1. Fetch home page
with urllib.request.urlopen("http://127.0.0.1:5000", timeout=5) as res:
    html = res.read().decode('utf-8')
    assert res.status == 200, "Home page failed to return 200"
    print("[OK] Home page returns 200 OK")

# 2. Check Tab & Modals existence
assert 'id="tabProducts"' in html, "tabProducts not found in HTML"
print("[OK] tabProducts exists in HTML")

modals = ['modalTailOrder', 'modalAgarbattiOrder', 'modalSteelNailsOrder', 'modalSariyeOrder', 'modalGemstoneRingOrder']
for m in modals:
    assert f'id="{m}"' in html, f"{m} not found in HTML"
    print(f"[OK] {m} exists in HTML")

# 3. Check Form Inputs in modalTailOrder
inputs = ['tailCustName', 'tailCustPhone', 'tailBottleSize', 'tailQuantity', 'tailDisease', 'tailDeliveryMode', 'tailCustAddress']
for inp in inputs:
    assert f'id="{inp}"' in html, f"Input {inp} not found"
    print(f"[OK] Input #{inp} verified")

# 4. Check 7 Poster Benefits in HTML
benefits = [
    "جادو کا خاتمہ",
    "نظرِ بد کا خاتمہ",
    "جنات کا خاتمہ",
    "بالوں کا گرنا",
    "جلد کی بیماریاں",
    "جسمانی درد کا علاج",
    "جوڑ کا درد سے نجات"
]
for b in benefits:
    assert b in html, f"Benefit '{b}' not found in HTML"
    print(f"[OK] Benefit verified")

# 5. Check Poster Image HTTP Serving
with urllib.request.urlopen("http://127.0.0.1:5000/assets/dam-shuda-tail-poster.jpg", timeout=5) as res:
    data = res.read()
    assert res.status == 200, "Poster image failed to load"
    assert len(data) == 393269, f"Unexpected poster length: {len(data)}"
    print(f"[OK] /assets/dam-shuda-tail-poster.jpg served perfectly (size: {len(data)} bytes)")

with urllib.request.urlopen("http://127.0.0.1:5000/assets/product-poster-1.jpg", timeout=5) as res:
    data = res.read()
    assert res.status == 200, "product-poster-1.jpg failed to load"
    assert len(data) == 393269, f"Unexpected product-poster-1 length: {len(data)}"
    print(f"[OK] /assets/product-poster-1.jpg served perfectly (size: {len(data)} bytes)")

# 6. Check WhatsApp Number
assert "0315 2395969" in html or "923152395969" in html, "Official WhatsApp not found"
print("[OK] Official WhatsApp 0315 2395969 verified")

print("\n==========================================")
print("ALL 16 VERIFICATION TESTS PASSED 100%!")
print("==========================================")
