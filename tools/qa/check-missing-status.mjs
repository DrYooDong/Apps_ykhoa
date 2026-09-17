import fs from 'fs';

const content = fs.readFileSync('src/content/ebm/guidelines/js/kho-guidelines-registry.ts', 'utf8');
const missingFiles = [
  '2016-jama-sepsis-3-consensus.mdx',
  '2021-ssc-soc-nhiem-khuan-sepsis3.mdx',
  '2024-byt-taychanmieng.mdx',
  '2024-esc-atrial-fibrillation.mdx',
  '2025-byt-benh-than-kinh-dai-thao-duong.mdx',
  '2025-byt-cummua.mdx',
  '2026-aha-acc-ckm-syndrome.mdx',
  '2026-byt-chi-dinh-nhap-vien-cap-cuu.mdx',
  '2026-esc-heart-failure-p1.mdx',
  '2026-esc-heart-failure-p2.mdx',
  '2026-icu-khang-sinh-cho-bn-nang.mdx'
];

for (const f of missingFiles) {
  const base = f.replace('.mdx', '');
  const hasFile = content.includes(`"${f}"`);
  const hasId = content.includes(`"id": "${base}"`);
  console.log(`${f} -> hasFile: ${hasFile}, hasId: ${hasId}`);
}
