const fs = require('fs');
const path = require('path');

function createSimplePDF(title, subtitle, content) {
  // Construct a valid PDF 1.4 document with text content
  const textStream = `BT
/F1 20 Tf
50 750 Td
(${title}) Tj
/F1 14 Tf
0 -30 Td
(${subtitle}) Tj
/F1 11 Tf
0 -40 Td
(${content}) Tj
ET`;

  const streamLen = Buffer.byteLength(textStream);

  const objects = [
    // 1: Catalog
    `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`,
    // 2: Pages
    `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`,
    // 3: Page
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n`,
    // 4: Contents
    `4 0 obj\n<< /Length ${streamLen} >>\nstream\n${textStream}\nendstream\nendobj\n`,
    // 5: Font
    `5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`
  ];

  let pdfContent = `%PDF-1.4\n`;
  const offsets = [0];

  for (let i = 0; i < objects.length; i++) {
    offsets.push(pdfContent.length);
    pdfContent += objects[i];
  }

  const xrefOffset = pdfContent.length;
  pdfContent += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;

  for (let i = 1; i <= objects.length; i++) {
    pdfContent += String(offsets[i]).padStart(10, '0') + ` 00000 n \n`;
  }

  pdfContent += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(pdfContent);
}

const pdfDir = path.join(__dirname, 'server', 'uploads', 'pdfs');
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

const samplePdfs = [
  {
    name: 'khizri_daily_wazaif.pdf',
    title: 'Khizri Ways - Majmooa Daily Wazaif Guide',
    subtitle: 'Authentic Islamic Spiritual Invocations and Remedies',
    content: 'This official PDF guide from Khizri Ways covers daily wazaif for protection and blessings.'
  },
  {
    name: 'durood_e_khizri_fazail.pdf',
    title: 'Durood-e-Khizri - Fazail and Recitation Method',
    subtitle: 'Sallallahu ala Habeebihi Muhammadinw wa Aalihi wa Sallam',
    content: 'Key benefits, spiritual light, and guidelines for reciting Durood-e-Khizri daily.'
  },
  {
    name: 'khizri_hisar_hifazat.pdf',
    title: 'Khizri Hisar - Spiritual Protection and Protection against Nazar',
    subtitle: 'Sunnah Invocations and Shielding Methods',
    content: 'Comprehensive guidance on spiritual hisar (fortification) and evil eye remedies.'
  },
  {
    name: 'rizq_barkat_amal.pdf',
    title: 'Rizq and Barkat - Quranic Practices and Surahs',
    subtitle: 'Remedies for Financial Abundance and Peace of Mind',
    content: 'Authentic Quranic wazaif, Surah Al-Waqiah, and Asma-ul-Husna for barakah.'
  }
];

samplePdfs.forEach(p => {
  const buf = createSimplePDF(p.title, p.subtitle, p.content);
  fs.writeFileSync(path.join(pdfDir, p.name), buf);
  console.log(`Generated ${p.name}`);
});
console.log('Sample PDFs successfully generated.');
