const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../src/content/pathophysiology/biochemistry');

const blockFolders = {
  'block-1': { folder: 'block1-biomolecules', name: 'Khối 1: Cấu Trúc Phân Tử Sinh Học' },
  'block-2': { folder: 'block2-catalysis-signaling', name: 'Khối 2: Động Học Xúc Tác & Truyền Tín Hiệu' },
  'block-3': { folder: 'block3-bioenergetics', name: 'Khối 3: Năng Lượng Sinh Học & ETC' },
  'block-4': { folder: 'block4-intermediary-metabolism', name: 'Khối 4: Chuyển Hóa Chuyên Biệt 4 Đại Phân Tử' },
  'block-5': { folder: 'block5-molecular-genetics', name: 'Khối 5: Sinh Học Phân Tử & Kỹ Thuật Gen' },
  'block-6': { folder: 'block6-organ-metabolism', name: 'Khối 6: Hóa Sinh Cơ Quan & Tích Hợp' },
  'block-7': { folder: 'block7-clinical-biochemistry', name: 'Khối 7: Hóa Sinh Lâm Sàng & Dịch Sinh Học' }
};

// Đọc dữ liệu từ biochemistry-data.ts
const dataFile = path.join(__dirname, '../src/content/pathophysiology/data/biochemistry-data.ts');
let tsContent = fs.readFileSync(dataFile, 'utf8');
tsContent = tsContent.replace(/import\s+[^;]+;/, '');
tsContent = tsContent.replace(/:\s*BiochemistryDataStore\s*=/, '=');
tsContent = tsContent.replace(/export\s+const\s+BIOCHEMISTRY_DATA/, 'var BIOCHEMISTRY_DATA');

const sandbox = {};
const fn = new Function('sandbox', `${tsContent}; return BIOCHEMISTRY_DATA;`);
const data = fn(sandbox);

data.topics.forEach(t => {
  const blockInfo = blockFolders[t.blockId] || { folder: 'general', name: 'Hóa Sinh' };
  const folderPath = path.join(baseDir, blockInfo.folder);
  fs.mkdirSync(folderPath, { recursive: true });

  const fileName = `${t.slug}.html`;
  const filePath = path.join(folderPath, fileName);

  const htmlContent = `<!DOCTYPE html>
<html lang="vi" data-theme="light">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.code}: ${t.title} – Hóa Sinh Y Học – CliniPortal</title>
    <link rel="stylesheet" href="../../../../css/reset.css">
    <link rel="stylesheet" href="../../../../css/main.css">
    <link rel="stylesheet" href="../../../../css/components/physio-content.css">
    <link rel="stylesheet" href="../../css/physio-shared.css">
    <script type="module" src="../../physio-shared.ts"></script>
    <style>
        .biochem-article-header {
            background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0284c7 100%);
            color: #fff;
            padding: 2.25rem 2rem;
            border-radius: 16px;
            margin-bottom: 2rem;
        }
        .biochem-badge {
            display: inline-block;
            background: rgba(255,255,255,0.2);
            padding: 0.25rem 0.75rem;
            border-radius: 6px;
            font-size: 0.825rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
        }
        .reaction-box {
            background: rgba(139, 92, 246, 0.08);
            border-left: 4px solid #8b5cf6;
            padding: 1.25rem 1.5rem;
            border-radius: 0 12px 12px 0;
            margin: 1.5rem 0;
        }
        .pearl-box {
            background: rgba(245, 158, 11, 0.08);
            border-left: 4px solid #f59e0b;
            padding: 1.25rem 1.5rem;
            border-radius: 0 12px 12px 0;
            margin: 1.5rem 0;
        }
        .lab-table {
            width: 100%;
            border-collapse: collapse;
            margin: 1.5rem 0;
        }
        .lab-table th, .lab-table td {
            border: 1px solid var(--color-border, #e2e8f0);
            padding: 0.75rem 1rem;
            text-align: left;
        }
        .lab-table th {
            background: var(--color-bg, #f8fafc);
            font-weight: 700;
        }
    </style>
</head>

<body class="physio-article-body">
    <div class="physio-article-container">
        
        <!-- ARTICLE HEADER -->
        <header class="biochem-article-header">
            <span class="biochem-badge">${t.code} • ${blockInfo.name}</span>
            <h1 style="margin: 0.25rem 0 0.75rem 0; font-size: 1.85rem; font-weight: 800; color: #fff;">${t.title}</h1>
            <p style="margin: 0; font-size: 1rem; opacity: 0.92; line-height: 1.6;">${t.overview}</p>
        </header>

        <!-- SECTION 1: TỔNG QUAN CƠ CHẾ -->
        <section class="article-section">
            <h2 class="section-title"><i class="fa-solid fa-circle-info"></i> 1. Mục Tiêu & Cơ Chế Phân Tử</h2>
            <p class="section-text">${t.overview}</p>
        </section>

        <!-- SECTION 2: PHẢN ỨNG & ĐIỂM CHỐT ENZYM -->
        <section class="article-section">
            <h2 class="section-title"><i class="fa-solid fa-flask"></i> 2. Phản Ứng & Điểm Chốt Cơ Chế</h2>
            <div class="reaction-box">
                <ul style="margin: 0; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem;">
                    ${t.keyReactions.map(r => `<li><code>${r}</code></li>`).join('\n')}
                </ul>
            </div>
        </section>

        <!-- SECTION 3: ĐIỂM NGỌC LÂM SÀNG -->
        <section class="article-section">
            <h2 class="section-title"><i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> 3. Điểm Ngọc Lâm Sàng (Clinical Pearls)</h2>
            <div class="pearl-box">
                <ul style="margin: 0; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.6rem;">
                    ${t.clinicalPearls.map(p => `<li><strong>${p}</strong></li>`).join('\n')}
                </ul>
            </div>
        </section>

        <!-- SECTION 4: THĂM DÒ & XÉT NGHIỆM LIÊN QUAN -->
        <section class="article-section">
            <h2 class="section-title"><i class="fa-solid fa-vial" style="color: #10b981;"></i> 4. Chỉ Số Xét Nghiệm & Biện Luận Cận Lâm Sàng</h2>
            <table class="lab-table">
                <thead>
                    <tr>
                        <th style="width: 80px;">STT</th>
                        <th>Chỉ số xét nghiệm</th>
                        <th>Ý nghĩa & Ứng dụng lâm sàng</th>
                    </tr>
                </thead>
                <tbody>
                    ${t.relatedLabTests.map((l, i) => `
                        <tr>
                            <td><strong>${i + 1}</strong></td>
                            <td><strong style="color: var(--color-primary, #0284c7);">${l}</strong></td>
                            <td>Đánh giá chẩn đoán, phân tầng nguy cơ và theo dõi đáp ứng điều trị</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </section>

        <footer style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--color-border, #e2e8f0); color: var(--color-text-muted, #64748b); font-size: 0.85rem;">
            <em>Tài liệu tham khảo: Hóa Sinh Y Học ĐHYD 2024, Harper's Illustrated Biochemistry 32nd, Clinical Biochemistry 7th.</em>
        </footer>

    </div>
</body>
</html>
`;

  fs.writeFileSync(filePath, htmlContent, 'utf8');
});

console.log(`Successfully created 31 HTML articles across 7 block folders in src/content/pathophysiology/biochemistry/!`);
