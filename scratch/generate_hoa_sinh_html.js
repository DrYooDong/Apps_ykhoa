const fs = require('fs');
const path = require('path');

// Đọc dữ liệu từ biochemistry-data.ts
const dataFile = path.join(__dirname, '../src/content/pathophysiology/data/biochemistry-data.ts');
let tsContent = fs.readFileSync(dataFile, 'utf8');
tsContent = tsContent.replace(/import\s+[^;]+;/, '');
tsContent = tsContent.replace(/:\s*BiochemistryDataStore\s*=/, '=');
tsContent = tsContent.replace(/export\s+const\s+BIOCHEMISTRY_DATA/, 'var BIOCHEMISTRY_DATA');

const sandbox = {};
const fn = new Function('sandbox', `${tsContent}; return BIOCHEMISTRY_DATA;`);
const data = fn(sandbox);

const blockFolders = {
  'block-1': 'block1-biomolecules',
  'block-2': 'block2-catalysis-signaling',
  'block-3': 'block3-bioenergetics',
  'block-4': 'block4-intermediary-metabolism',
  'block-5': 'block5-molecular-genetics',
  'block-6': 'block6-organ-metabolism',
  'block-7': 'block7-clinical-biochemistry'
};

const htmlContent = `<!DOCTYPE html>
<html lang="vi" data-theme="light">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="CliniPortal - Module Hóa Sinh Y Học & Chuyển Hóa Phân Tử Lâm Sàng (7 Khối - 31 Chuyên Đề)">
    <title>Hóa Sinh Y Học – CliniPortal</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">

    <link rel="stylesheet" href="../../../css/reset.css">
    <link rel="stylesheet" href="../../../css/main.css">
    <link rel="stylesheet" href="../../../css/components/header.css">
    <link rel="stylesheet" href="../../../css/components/sidebar.css">
    <link rel="stylesheet" href="../../../css/components/footer.css">
    <link rel="stylesheet" href="../../../css/components/dashboard/dashboard-hub.css">
    <link rel="stylesheet" href="../../../css/components/dashboard/dashboard-widgets.css">
    <link rel="stylesheet" href="../../../css/components/dashboard/dashboard-specialty.css">
    <link rel="stylesheet" href="../../../css/components/physio-content.css">
    <link rel="stylesheet" href="./css/physio-shared.css">
    <link rel="stylesheet" href="../../../css/components/biochemistry-hub.css">

    <script type="module" src="../../../components/header.ts" defer></script>
    <script type="module" src="../../../components/footer.ts" defer></script>
    <script src="../../../js/main.js" defer></script>

    <style>
        body {
            padding-top: 64px !important;
            background-color: var(--color-bg, #f8fafc) !important;
        }

        .main-wrapper {
            max-width: 1440px !important;
            margin: 0 auto !important;
            padding: 1.5rem 1.25rem 3rem 1.25rem !important;
            width: 100% !important;
        }

        .dashboard-layout {
            display: flex !important;
            gap: 1.75rem !important;
            align-items: flex-start !important;
            width: 100% !important;
        }

        .layout-nav-sidebar {
            width: 280px !important;
            flex-shrink: 0 !important;
            position: sticky !important;
            top: 80px !important;
        }

        .layout-content-area {
            flex: 1 !important;
            min-width: 0 !important;
        }

        .specialty-card {
            text-decoration: none;
            color: inherit;
        }
    </style>
</head>

<body>
    <div id="siteHeaderContainer"></div>

    <div class="main-wrapper" id="mainContent">

        <!-- BREADCRUMB -->
        <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
            <a href="../../../#/index.html" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp;
            <a href="./giai-phau-sinh-ly.html" style="color: inherit; text-decoration: none;">Cơ Sở Y Khoa</a> &nbsp;/&nbsp;
            <span style="color: var(--color-primary, #0284c7); font-weight: 600;">Hóa Sinh Y Học & Chuyển Hóa (HS - CH)</span>
        </div>

        <!-- HERO SECTION -->
        <section class="hero-dashboard hero-physio" aria-labelledby="hero-title" style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #0284c7 100%); margin-bottom: 1.5rem;">
            <div class="tcm-hero-content">
                <div class="hero-intro">
                    <h1 id="hero-title" style="color: #fff;">🧪 HÓA SINH Y HỌC & CHUYỂN HÓA</h1>
                    <p style="color: rgba(255,255,255,0.92);">Hệ thống hóa cấu trúc phân tử sinh học, động học enzym, năng lượng sinh học ty thể, chuyển hóa 4 đại phân tử và biện luận xét nghiệm lâm sàng tại giường bệnh (EBM & Clinical Biochemistry).</p>
                </div>
                <div class="tcm-hero-decor">
                    <!-- Molecular Rings & Flask SVG Decor -->
                    <svg class="dna-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="38" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="6 4" opacity="0.6"/>
                        <polygon points="50,22 72,35 72,61 50,74 28,61 28,35" stroke="#ffffff" stroke-width="3.5" fill="rgba(56,189,248,0.15)" stroke-linejoin="round"/>
                        <circle cx="50" cy="48" r="14" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="4 3"/>
                        <circle cx="50" cy="22" r="5" fill="#38bdf8"/>
                        <circle cx="72" cy="35" r="5" fill="#ffffff"/>
                        <circle cx="72" cy="61" r="5" fill="#38bdf8"/>
                        <circle cx="50" cy="74" r="5" fill="#ffffff"/>
                        <circle cx="28" cy="61" r="5" fill="#38bdf8"/>
                        <circle cx="28" cy="35" r="5" fill="#ffffff"/>
                        <line x1="72" y1="35" x2="88" y2="25" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
                        <circle cx="88" cy="25" r="4.5" fill="#fbbf24"/>
                    </svg>
                </div>
            </div>
            <div class="hero-pattern"></div>
        </section>

        <!-- FEATURE BANNER -->
        <section style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
            <div class="physio-step-card" style="display: flex; align-items: center; gap: 1rem; padding: 1.25rem 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.05));">
                <div style="font-size: 2.2rem; background: rgba(2,132,199,0.1); width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; border-radius: 12px; flex-shrink: 0;">🔬</div>
                <div>
                    <span style="font-size: 0.75rem; font-weight: 700; background: rgba(2,132,199,0.15); color: var(--color-primary, #0284c7); padding: 0.15rem 0.5rem; border-radius: 4px;">Chuẩn Y Khoa Toàn Diện</span>
                    <h4 style="margin: 0.2rem 0; color: var(--color-text, #0f172a); font-size: 1.05rem; font-weight: 700;">7 Khối Chuyên Đề & 31 Bài Học</h4>
                    <p style="margin: 0; font-size: 0.825rem; color: var(--color-text-muted, #64748b);">Tổng hòa 4 giáo trình: Hóa Sinh Y Học ĐHYD 2024, Harper 32nd, Clinical Biochemistry 7th & Pratt.</p>
                </div>
            </div>

            <div class="physio-step-card" style="display: flex; align-items: center; gap: 1rem; padding: 1.25rem 1.5rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.05));">
                <div style="font-size: 2.2rem; background: rgba(245,158,11,0.1); width: 56px; height: 56px; display: flex; align-items: center; justify-content: center; border-radius: 12px; flex-shrink: 0;">💡</div>
                <div>
                    <span style="font-size: 0.75rem; font-weight: 700; background: rgba(245,158,11,0.15); color: #d97706; padding: 0.15rem 0.5rem; border-radius: 4px;">EBM & Clinical Pearls</span>
                    <h4 style="margin: 0.2rem 0; color: var(--color-text, #0f172a); font-size: 1.05rem; font-weight: 700;">112+ Điểm Ngọc & Biện Luận Xét Nghiệm</h4>
                    <p style="margin: 0; font-size: 0.825rem; color: var(--color-text-muted, #64748b);">Gắn liền cơ chế enzym với bệnh lý lâm sàng (DKA, Gout, Suy gan, Hội chứng thận hư, Troponin HS).</p>
                </div>
            </div>
        </section>

        <!-- CONTROL BAR / TOOLBAR -->
        <div class="dashboard-controls" style="margin-bottom: 1.5rem;">
            <div class="search-box-container">
                <span class="search-icon-svg">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </span>
                <input type="text" id="lesson-search" placeholder="Tìm kiếm chuyên đề hóa sinh (Krebs, Đường phân, Enzym, PFK-1, Bilirubin, Acid Uric, Troponin...)..." aria-label="Tìm kiếm chuyên đề hóa sinh">
                <button id="clear-search" class="clear-search-btn" aria-label="Xóa tìm kiếm" style="display: none;">&times;</button>
            </div>
            <div class="view-toggle-container">
                <span class="toggle-label">Chế độ xem:</span>
                <div class="toggle-buttons">
                    <button id="view-grid-btn" class="toggle-btn active" title="Dạng lưới" aria-label="Xem dạng lưới">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                    </button>
                    <button id="view-list-btn" class="toggle-btn" title="Dạng danh sách" aria-label="Xem dạng danh sách">
                        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="8" y1="6" x2="21" y2="6"></line>
                            <line x1="8" y1="12" x2="21" y2="12"></line>
                            <line x1="8" y1="18" x2="21" y2="18"></line>
                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- DASHBOARD LAYOUT -->
        <div class="dashboard-layout">
            <!-- Navigation Sidebar (Sticky) -->
            <aside class="layout-nav-sidebar" aria-label="Danh mục khối hóa sinh">
                <div class="nav-sidebar-sticky" id="physio-nav">
                    <h4 class="nav-sidebar-title">Khối Kiến Thức</h4>
                    <ul class="part-nav-list">
                        ${data.blocks.map((b, idx) => `
                            <li>
                                <a href="#${b.id}-section" class="part-nav-item p${idx + 1} ${idx === 0 ? 'active' : ''}" data-target="${b.id}-section">
                                    <span class="part-icon"><i class="fa-solid ${b.icon}"></i></span>
                                    <span class="part-text">${b.code}. ${b.name.replace(/^Khối \d+:\s*/, '')}</span>
                                    <span class="part-count-badge">${data.topics.filter(t => t.blockId === b.id).length}</span>
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </aside>

            <!-- Main Content Area -->
            <main class="layout-content-area" id="lessons-container">
                <!-- Empty Search State -->
                <div id="empty-search-state" class="empty-search-state" style="display: none;">
                    <div class="empty-search-icon">🔍</div>
                    <h3>Không tìm thấy chuyên đề hóa sinh nào</h3>
                    <p>Vui lòng thử từ khóa khác (ví dụ: Krebs, Đường phân, Troponin, Ure, Acid Uric, Bilirubin...).</p>
                </div>

                <!-- 7 BLOCKS SECTIONS -->
                ${data.blocks.map(block => {
                    const blockTopics = data.topics.filter(t => t.blockId === block.id);
                    const folder = blockFolders[block.id] || 'block1-biomolecules';
                    return `
                        <section id="${block.id}-section" aria-labelledby="${block.id}-heading" style="margin-bottom: 2rem;">
                            <div class="physio-group-container">
                                <div class="physio-group-header">
                                    <span class="physio-group-icon" style="color: ${block.color}; background: ${block.bgColor};">
                                        <i class="fa-solid ${block.icon}"></i>
                                    </span>
                                    <div>
                                        <h3 id="${block.id}-heading">${block.code}. ${block.name}</h3>
                                        <p style="margin: 0.15rem 0 0 0; font-size: 0.85rem; color: var(--color-text-muted, #64748b); font-weight: normal;">${block.description}</p>
                                    </div>
                                </div>

                                <div class="specialty-grid">
                                    ${blockTopics.map(topic => `
                                        <a href="./biochemistry/${folder}/${topic.slug}.html" class="specialty-card" data-topic-id="${topic.id}">
                                            <div class="specialty-card-top">
                                                <div class="specialty-icon" style="background: ${block.bgColor}; color: ${block.color};">
                                                    <i class="fa-solid ${block.icon}"></i>
                                                </div>
                                                <div class="specialty-info">
                                                    <div style="display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.25rem;">
                                                        <span style="font-size: 0.72rem; font-weight: 700; background: var(--color-bg, #f1f5f9); color: var(--color-primary, #0284c7); padding: 0.1rem 0.4rem; border-radius: 4px;">${topic.code}</span>
                                                        <span style="font-size: 0.72rem; color: var(--color-text-muted, #64748b);"><i class="fa-solid fa-star" style="color: #f59e0b; font-size: 0.65rem;"></i> ${topic.clinicalPearls.length} Pearls</span>
                                                    </div>
                                                    <h3>${topic.title}</h3>
                                                    <p>${topic.overview}</p>
                                                    <div style="display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.4rem;">
                                                        ${topic.tags.slice(0, 3).map(tag => `<span style="font-size: 0.7rem; background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text-muted, #64748b); padding: 0.05rem 0.35rem; border-radius: 3px;">#${tag}</span>`).join('')}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="specialty-card-action">
                                                <span>Xem bài</span>
                                                <i class="fa-solid fa-chevron-right"></i>
                                            </div>
                                        </a>
                                    `).join('')}
                                </div>
                            </div>
                        </section>
                    `;
                }).join('')}
            </main>
        </div>

    </div>

    <div id="siteFooterContainer"></div>
</body>

</html>
`;

fs.writeFileSync(path.join(__dirname, '../src/content/pathophysiology/hoa-sinh.html'), htmlContent, 'utf8');
console.log('Successfully written updated hoa-sinh.html with Xem bài links.');
