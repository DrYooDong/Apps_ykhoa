/**
 * CliniPortal — Epidemiology & Biostatistics (Dịch Tễ Học Y Khoa) SPA View
 * Path: src/content/basic-medical/views/epidemiology-view.ts
 * Giao diện kinh điển đồng bộ chuẩn 100% với Sinh Lý, Cơ Chế Bệnh Sinh & Hóa Sinh
 * (Classic Hero Surveillance SVG, Feature Bento Banners, Toolbar Search/Grid Toggle, Sticky Nav Sidebar, 
 *  PHẦN DỊCH TỄ CÁC BỆNH ĐƯỢC ĐẶT LÊN ĐẦU TIÊN, Specialty Cards & Quick Preview Modal)
 */

import '../../../../css/components/module-dashboard.css';
import '../../../../css/components/physio-content.css';
import '../../../../css/components/formula-vault.css';
import '../../../../css/components/physio-promax-hub.css';
import '../../../../css/components/epidemiology-hub.css';
import '../../../../css/components/biochemistry-hub.css';
import { 
  EPIDEMIOLOGY_BLOCKS, 
  EPIDEMIOLOGY_TOPICS 
} from '../data/epidemiology-data';
import { EpidemiologyBlock, EpidemiologyTopic } from '../types/epidemiology.types';

// Danh sách các bài chuyên khảo Dịch tễ học bệnh lý cụ thể (Đưa lên đầu)
interface DiseaseEpidemiologyArticle {
  id: string;
  code: string;
  icd: string;
  title: string;
  slug: string;
  vector: string;
  icon: string;
  color: string;
  bgColor: string;
  overview: string;
  pearlsCount: number;
  pearlPreview: string;
  readTime: string;
  tags: string[];
}

const DISEASE_ARTICLES: DiseaseEpidemiologyArticle[] = [
  {
    id: 'dth-dengue',
    code: 'DTH-DENGUE',
    icd: 'ICD-10: A90–A91',
    title: 'Dịch Tễ Học Sốt Xuất Huyết Dengue (DENV)',
    slug: 'dth-dengue',
    vector: 'Véc-tơ Aedes aegypti / albopictus',
    icon: 'fa-mosquito',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.12)',
    overview: 'Tam giác dịch tễ học DENV, sinh học muỗi véc-tơ, chu kỳ ủ bệnh ngoại lai (EIP), cơ chế tăng cường miễn dịch phụ thuộc kháng thể (ADE), số liệu dịch kỷ lục 2024–2026 và phác đồ BYT/WHO.',
    pearlsCount: 3,
    pearlPreview: 'Tái nhiễm khác serotype kích hoạt ADE gây bão cytokine, rò rỉ huyết tương và sốc DSS nguy kịch.',
    readTime: '12 phút đọc',
    tags: ['Aedes', 'ADE', 'DENV 1-4', 'Sốc Dengue', 'WHO 2024']
  },
  {
    id: 'dth-sot-ret',
    code: 'DTH-MALARIA',
    icd: 'ICD-10: B50–B54',
    title: 'Dịch Tễ Học Bệnh Sốt Rét (Malaria / Plasmodium)',
    slug: 'dth-sot-ret',
    vector: 'Véc-tơ Anopheles',
    icon: 'fa-mosquito',
    color: '#d97706',
    bgColor: 'rgba(217, 119, 6, 0.12)',
    overview: '5 loài Plasmodium, thể ngủ gan (Hypnozoites), động học lây truyền muỗi Anopheles, 4 mối đe dọa sinh học (kháng Artemisinin gen pfk13, xóa gen pfhrp2/3), WHO 2025 và QĐ 4922/QĐ-BYT.',
    pearlsCount: 3,
    pearlPreview: 'Điều trị tiệt căn P. vivax bắt buộc dùng Primaquine tiêu diệt thể ngủ và phải xét nghiệm men G6PD.',
    readTime: '15 phút đọc',
    tags: ['Anopheles', 'Plasmodium', 'Hypnozoites', 'Artemisinin', 'G6PD']
  },
  {
    id: 'dth-thuy-dau',
    code: 'DTH-VARICELLA',
    icd: 'ICD-10: B01–B02',
    title: 'Dịch Tễ Học Bệnh Thủy Đậu (Varicella / VZV)',
    slug: 'dth-thuy-dau',
    vector: 'Đường hô hấp & Giọt bắn',
    icon: 'fa-shield-virus',
    color: '#8b5cf6',
    bgColor: 'rgba(139, 92, 246, 0.12)',
    overview: 'Sự tương phản sâu sắc ôn đới vs nhiệt đới, tỷ lệ tử vong chữ U (gấp 23–29 lần ở người lớn), kỷ nguyên vắc-xin 1-liều/2-liều, rủi ro dịch chuyển tuổi khi độ bao phủ thấp dưới 80% (WHO).',
    pearlsCount: 3,
    pearlPreview: 'Bao phủ vắc-xin <80% đẩy lùi tuổi mắc bệnh sang người lớn, làm tăng ca nặng và tử vong chung.',
    readTime: '14 phút đọc',
    tags: ['VZV', 'Varicella', 'Vaccine', 'R0 ≈ 10-12', 'Tuổi mắc']
  }
];

export function renderEpidemiologyView(): string {
  return `
    <div class="promax-wrapper" id="mainContent">

      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <a href="#/basic-medical" style="color: inherit; text-decoration: none;">Basic Medical Sciences</a> &nbsp;/&nbsp; 
        <span style="color: #0d9488; font-weight: 600;">Dịch Tễ Học Y Khoa & Y Tế Công Cộng (DTH - YTCC)</span>
      </div>

      <!-- PROMAX LUXURY HERO SECTION (SURVEILLANCE THEME) -->
      <section class="promax-hero hero-epi-theme" aria-labelledby="hero-title">
        <div class="promax-hero-grid">
          <div>
            <div class="epi-badge-pulse">
              <span class="pulse-dot" style="background: #2dd4bf;"></span>
              <span>Epidemiological Surveillance & Evidence-Based Public Health • CDC & WHO Standards</span>
            </div>
            <h1 id="hero-title" class="promax-hero-title">
              🦠 DỊCH TỄ HỌC & Y TẾ CÔNG CỘNG
            </h1>
            <p class="promax-hero-desc">
              Hệ thống hóa phương pháp luận dịch tễ học, thiết kế nghiên cứu quan sát và can thiệp, đo lường nguy cơ (RR, OR, AR), đánh giá test chẩn đoán (Se, Sp, PPV, NPV, LR), điều tra dập dịch thực địa và chuyên khảo dịch tễ các bệnh lý truyền nhiễm trọng điểm.
            </p>

            <!-- KPI Metric Bar -->
            <div class="promax-kpi-bar">
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-chart-pie" style="font-size: 1.1rem; color: #2dd4bf;"></i>
                <div>
                  <div class="promax-kpi-num">6 Khối</div>
                  <div class="promax-kpi-lbl">Chuyên Đề Cốt Lõi</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-book-medical" style="font-size: 1.1rem; color: #38bdf8;"></i>
                <div>
                  <div class="promax-kpi-num">28 Bài</div>
                  <div class="promax-kpi-lbl">Bài Học & Bệnh Lý</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-lightbulb" style="font-size: 1.1rem; color: #fbbf24;"></i>
                <div>
                  <div class="promax-kpi-num">105+</div>
                  <div class="promax-kpi-lbl">Clinical Pearls</div>
                </div>
              </div>
              <div class="promax-kpi-pill">
                <i class="fa-solid fa-calculator" style="font-size: 1.1rem; color: #a78bfa;"></i>
                <div>
                  <div class="promax-kpi-num">4 Studio</div>
                  <div class="promax-kpi-lbl">Công Cụ Tương Tác</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Hero Vector Artwork (Radar & Outbreak Curve) -->
          <div class="tcm-hero-decor" style="display: flex; align-items: center; justify-content: center;">
            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 140px; height: 140px; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.3));">
              <circle cx="60" cy="60" r="50" stroke="rgba(45, 212, 191, 0.25)" stroke-width="2" stroke-dasharray="4 4"/>
              <circle cx="60" cy="60" r="32" stroke="rgba(45, 212, 191, 0.4)" stroke-width="2"/>
              <circle cx="60" cy="60" r="16" stroke="#2dd4bf" stroke-width="2"/>
              <!-- Crosshairs -->
              <line x1="60" y1="5" x2="60" y2="115" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
              <line x1="5" y1="60" x2="115" y2="60" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
              <!-- Outbreak Epicurve Line -->
              <path d="M15 95 Q 40 90, 50 40 T 75 75 T 105 95" stroke="#fbbf24" stroke-width="3.5" fill="none" stroke-linecap="round"/>
              <circle cx="50" cy="40" r="5.5" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
              <circle cx="75" cy="75" r="4.5" fill="#fbbf24" stroke="#ffffff" stroke-width="1.5"/>
              <circle cx="28" cy="92" r="3.5" fill="#2dd4bf"/>
              <circle cx="95" cy="90" r="3.5" fill="#2dd4bf"/>
            </svg>
          </div>
        </div>
      </section>

      <!-- PROMAX BENTO ACTION GRID (4 CÔNG CỤ DỊCH TỄ TƯƠNG TÁC CAO CẤP) -->
      <section class="promax-bento-grid">
        <a href="#/basic-medical/epidemiology/matrix-solver" class="promax-bento-card" style="--bento-color: #0d9488; --bento-bg: rgba(13, 148, 136, 0.1);">
          <div class="promax-bento-icon"><i class="fa-solid fa-table-cells"></i></div>
          <div>
            <span class="promax-bento-tag">Interactive Analytics</span>
            <h4 class="promax-bento-title">Bộ Giải Ma Trận 2×2</h4>
            <p class="promax-bento-desc">Tính tức thì RR, OR, AR, PAF, Se, Sp, PPV, NPV, LR+, LR- & NNT/NNH.</p>
          </div>
        </a>

        <a href="#/basic-medical/epidemiology/epicurve" class="promax-bento-card" style="--bento-color: #f59e0b; --bento-bg: rgba(245, 158, 11, 0.1);">
          <div class="promax-bento-icon"><i class="fa-solid fa-chart-area"></i></div>
          <div>
            <span class="promax-bento-tag">Outbreak Simulator</span>
            <h4 class="promax-bento-title">Đường Cong Dịch Tễ (Epicurve)</h4>
            <p class="promax-bento-desc">Phân biệt Ổ dịch điểm, Nguồn liên tục và Lan tỏa người sang người.</p>
          </div>
        </a>

        <a href="#/basic-medical/epidemiology/study-designs" class="promax-bento-card" style="--bento-color: #3b82f6; --bento-bg: rgba(59, 130, 246, 0.1);">
          <div class="promax-bento-icon"><i class="fa-solid fa-sitemap"></i></div>
          <div>
            <span class="promax-bento-tag">Design Comparator</span>
            <h4 class="promax-bento-title">Ma Trận Thiết Kế Nghiên Cứu</h4>
            <p class="promax-bento-desc">So sánh RCT, Cohort, Case-Control, Cross-Sectional & Ecological.</p>
          </div>
        </a>

        <a href="#/basic-medical/epidemiology/bradford-hill" class="promax-bento-card" style="--bento-color: #8b5cf6; --bento-bg: rgba(139, 92, 246, 0.1);">
          <div class="promax-bento-icon"><i class="fa-solid fa-scale-balanced"></i></div>
          <div>
            <span class="promax-bento-tag">Causality Framework</span>
            <h4 class="promax-bento-title">9 Tiêu Chuẩn Bradford Hill</h4>
            <p class="promax-bento-desc">Bộ khung thẩm định mối quan hệ Nhân - Quả y học chuẩn mực.</p>
          </div>
        </a>
      </section>

      <!-- PROMAX TOOLBAR & SEARCH -->
      <div class="promax-toolbar">
        <div class="promax-search-wrap">
          <i class="fa-solid fa-magnifying-glass promax-search-icon"></i>
          <input type="text" id="lesson-search" class="promax-search-input" placeholder="Tìm kiếm bài học dịch tễ học (Prevalence, Incidence, RR, OR, Se/Sp, Sốt xuất huyết, Sốt rét, Thủy đậu, Bradford Hill...)..." aria-label="Tìm kiếm chuyên đề dịch tễ">
          <span class="promax-shortcut-pill">Ctrl + K</span>
          <button id="clear-search" class="clear-search-btn" aria-label="Xóa tìm kiếm" style="display: none; position: absolute; right: 4.5rem; top: 50%; transform: translateY(-50%); background: none; border: none; font-size: 1.2rem; cursor: pointer; color: var(--color-text-muted);">&times;</button>
        </div>

        <div class="view-toggle-container" style="display: flex; align-items: center; gap: 0.5rem;">
          <span class="toggle-label" style="font-size: 0.825rem; font-weight: 600; color: var(--color-text-muted);">Hiển thị:</span>
          <div class="toggle-buttons">
            <button id="view-grid-btn" class="toggle-btn active" title="Dạng lưới" aria-label="Xem dạng lưới">
              <i class="fa-solid fa-grip"></i>
            </button>
            <button id="view-list-btn" class="toggle-btn" title="Dạng danh sách" aria-label="Xem dạng danh sách">
              <i class="fa-solid fa-list-ul"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- DASHBOARD LAYOUT (ĐỒNG BỘ 100% VỚI HÓA SINH, SINH LÝ & CCBS) -->
      <div class="dashboard-layout">
        
        <!-- Navigation Sidebar (Sticky) -->
        <aside class="layout-nav-sidebar" aria-label="Danh mục khối dịch tễ">
          <div class="nav-sidebar-sticky" id="physio-nav">
            <h4 class="nav-sidebar-title">Khối Dịch Tễ Học</h4>
            <ul class="part-nav-list">
              
              <!-- 1. DỊCH TỄ CÁC BỆNH (TOP NAVIGATION) -->
              <li>
                <a href="#disease-epidemiology-section" class="part-nav-item p1 active" data-target="disease-epidemiology-section">
                  <span class="part-icon"><i class="fa-solid fa-shield-virus" style="color: #ef4444;"></i></span>
                  <span class="part-text">Dịch Tễ Các Bệnh</span>
                  <span class="part-count-badge" style="background: rgba(239, 68, 68, 0.15); color: #ef4444;">3</span>
                </a>
              </li>

              <!-- 2. KHỐI 1 ĐẾN KHỐI 6 -->
              ${EPIDEMIOLOGY_BLOCKS.map((b, idx) => `
                <li>
                  <a href="#${b.id}-section" class="part-nav-item p${idx + 2}" data-target="${b.id}-section">
                    <span class="part-icon"><i class="fa-solid ${b.icon}"></i></span>
                    <span class="part-text">${b.code}. ${b.name.replace(/^Khối \d+:\s*/, '').split('&')[0].trim()}</span>
                    <span class="part-count-badge">${EPIDEMIOLOGY_TOPICS.filter(t => t.blockId === b.id).length}</span>
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
            <h3>Không tìm thấy chuyên đề dịch tễ nào</h3>
            <p>Vui lòng thử từ khóa khác (ví dụ: Sốt xuất huyết, Sốt rét, Thủy đậu, Prevalence, Incidence, RR, OR, Se/Sp, Bradford Hill...).</p>
          </div>

          <!-- ========================================================================= -->
          <!-- PHẦN 1: DỊCH TỄ HỌC CÁC BỆNH TRUYỀN NHIỄM CỤ THỂ (ĐƯA LÊN ĐẦU TIÊN THEO YÊU CẦU) -->
          <!-- ========================================================================= -->
          <section id="disease-epidemiology-section" aria-labelledby="disease-epidemiology-heading" style="margin-bottom: 2rem;">
            <div class="physio-group-container">
              <div class="physio-group-header">
                <span class="physio-group-icon" style="color: #ef4444; background: rgba(239, 68, 68, 0.12);">
                  <i class="fa-solid fa-shield-virus"></i>
                </span>
                <div>
                  <h3 id="disease-epidemiology-heading">Chuyên Khảo Dịch Tễ Bệnh Học Cụ Thể</h3>
                  <p style="margin: 0.15rem 0 0 0; font-size: 0.85rem; color: var(--color-text-muted, #64748b); font-weight: normal;">
                    Phân tích chuyên sâu tam giác dịch tễ học, véc-tơ truyền bệnh, động học lây truyền, cơ chế ADE/thể ngủ, gánh nặng dịch tễ &amp; phác đồ phòng chống chuẩn Bộ Y Tế &amp; WHO.
                  </p>
                </div>
              </div>

              <div class="specialty-grid">
                ${DISEASE_ARTICLES.map(art => `
                  <a href="#/basic-medical/epidemiology/article/${art.slug}" class="specialty-card" data-topic-id="${art.id}">
                    <div class="specialty-card-top">
                      <div class="specialty-icon" style="background: ${art.bgColor}; color: ${art.color};">
                        <i class="fa-solid ${art.icon}"></i>
                      </div>
                      <div class="specialty-info">
                        <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.4rem; margin-bottom: 0.25rem;">
                          <div style="display: flex; align-items: center; gap: 0.4rem;">
                            <span style="font-size: 0.72rem; font-weight: 700; background: ${art.bgColor}; color: ${art.color}; padding: 0.1rem 0.4rem; border-radius: 4px;">${art.code}</span>
                            <span style="font-size: 0.7rem; font-weight: 600; color: var(--color-text-muted);">${art.icd}</span>
                          </div>
                          <span style="font-size: 0.72rem; color: var(--color-text-muted);"><i class="fa-solid fa-lightbulb" style="color: #f59e0b; font-size: 0.65rem;"></i> ${art.pearlsCount} Pearls</span>
                        </div>
                        <h3>${art.title}</h3>
                        <p>${art.overview}</p>
                        
                        <div style="margin-top: 0.5rem; padding: 0.4rem 0.6rem; background: var(--color-bg, #f8fafc); border-left: 3px solid ${art.color}; border-radius: 0 6px 6px 0; font-size: 0.775rem; color: var(--color-text-muted); line-height: 1.4;">
                          <strong style="color: ${art.color};"><i class="fa-solid fa-quote-left"></i> Pearl:</strong> ${art.pearlPreview}
                        </div>

                        <div style="display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.5rem;">
                          <span style="font-size: 0.7rem; background: rgba(13, 148, 136, 0.1); color: #0d9488; font-weight: 600; padding: 0.05rem 0.35rem; border-radius: 3px;">
                            <i class="fa-solid fa-bullseye" style="font-size: 0.65rem;"></i> ${art.vector}
                          </span>
                          ${art.tags.slice(0, 3).map(tag => `<span style="font-size: 0.7rem; background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text-muted, #64748b); padding: 0.05rem 0.35rem; border-radius: 3px;">#${tag}</span>`).join('')}
                        </div>
                      </div>
                    </div>
                    <div class="specialty-card-action">
                      <span><i class="fa-solid fa-book-open"></i> Đọc bài chuyên khảo</span>
                      <i class="fa-solid fa-chevron-right"></i>
                    </div>
                  </a>
                `).join('')}
              </div>
            </div>
          </section>

          <!-- ========================================================================= -->
          <!-- PHẦN 2: 6 KHỐI CHUYÊN ĐỀ DỊCH TỄ HỌC CỐT LÕI (BLOCK 1 -> BLOCK 6) -->
          <!-- ========================================================================= -->
          ${EPIDEMIOLOGY_BLOCKS.map(block => {
            const blockTopics = EPIDEMIOLOGY_TOPICS.filter(t => t.blockId === block.id);

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
                      <a href="javascript:void(0)" onclick="window.EpiHub?.openQuickPreview('${topic.id}')" class="specialty-card" data-topic-id="${topic.id}">
                        <div class="specialty-card-top">
                          <div class="specialty-icon" style="background: ${block.bgColor}; color: ${block.color};">
                            <i class="fa-solid ${block.icon}"></i>
                          </div>
                          <div class="specialty-info">
                            <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.4rem; margin-bottom: 0.25rem;">
                              <span style="font-size: 0.72rem; font-weight: 700; background: var(--color-bg, #f1f5f9); color: ${block.color}; padding: 0.1rem 0.4rem; border-radius: 4px;">${topic.code}</span>
                              <span style="font-size: 0.72rem; color: var(--color-text-muted, #64748b);"><i class="fa-solid fa-lightbulb" style="color: #f59e0b; font-size: 0.65rem;"></i> ${topic.clinicalPearls.length} Pearls</span>
                            </div>
                            <h3>${topic.title}</h3>
                            <p>${topic.overview}</p>
                            
                            <div style="display: flex; flex-wrap: wrap; gap: 0.3rem; margin-top: 0.4rem;">
                              ${topic.relatedMetrics.slice(0, 3).map(m => `<span style="font-size: 0.7rem; background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text-muted, #64748b); padding: 0.05rem 0.35rem; border-radius: 3px;">${m}</span>`).join('')}
                            </div>
                          </div>
                        </div>
                        <div class="specialty-card-action">
                          <span><i class="fa-solid fa-bolt"></i> Xem tóm tắt &amp; công thức</span>
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

    <!-- QUICK PREVIEW MODAL / DRAWER (CHỨA ĐẦY ĐỦ CÔNG THỨC, PEARLS & BIAS) -->
    <div class="biochem-modal-backdrop" id="epiModalBackdrop">
      <div class="biochem-modal" id="epiModalContainer" role="dialog" aria-modal="true"></div>
    </div>
  `;
}

/**
 * Initialize Event Listeners for Master Epidemiology Hub
 */
export function initEpidemiologyView(): void {
  const searchInput = document.getElementById('lesson-search') as HTMLInputElement | null;
  const clearBtn = document.getElementById('clear-search') as HTMLElement | null;
  const emptyState = document.getElementById('empty-search-state') as HTMLElement | null;
  const viewGridBtn = document.getElementById('view-grid-btn') as HTMLElement | null;
  const viewListBtn = document.getElementById('view-list-btn') as HTMLElement | null;
  const lessonsContainer = document.getElementById('lessons-container') as HTMLElement | null;
  const navItems = document.querySelectorAll<HTMLElement>('.part-nav-item');
  const sections = document.querySelectorAll<HTMLElement>('.layout-content-area > section');
  const modalBackdrop = document.getElementById('epiModalBackdrop');
  const modalContainer = document.getElementById('epiModalContainer');

  // 1. Live Search
  function performSearch(query: string): void {
    const q = query.toLowerCase().trim();
    if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';

    let totalVisible = 0;

    sections.forEach(sec => {
      const sectionEl = sec;
      const cards = sectionEl.querySelectorAll<HTMLElement>('.specialty-card');
      let sectionVisibleCount = 0;

      cards.forEach(card => {
        const text = card.textContent?.toLowerCase() || '';
        if (!q || text.includes(q)) {
          card.style.display = '';
          sectionVisibleCount++;
          totalVisible++;
        } else {
          card.style.display = 'none';
        }
      });

      sectionEl.style.display = sectionVisibleCount > 0 ? '' : 'none';
    });

    if (emptyState) {
      emptyState.style.display = totalVisible === 0 ? 'block' : 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      performSearch((e.target as HTMLInputElement).value);
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      performSearch('');
      searchInput.focus();
    });
  }

  // 2. View Toggle (Grid / List)
  if (viewGridBtn && viewListBtn && lessonsContainer) {
    viewGridBtn.addEventListener('click', () => {
      viewGridBtn.classList.add('active');
      viewListBtn.classList.remove('active');
      lessonsContainer.querySelectorAll('.specialty-grid').forEach(g => g.classList.remove('list-view'));
    });

    viewListBtn.addEventListener('click', () => {
      viewListBtn.classList.add('active');
      viewGridBtn.classList.remove('active');
      lessonsContainer.querySelectorAll('.specialty-grid').forEach(g => g.classList.add('list-view'));
    });
  }

  // 3. Scroll Spy for Sticky Nav Sidebar
  function updateScrollSpy(): void {
    const scrollPos = window.scrollY + 160;

    sections.forEach(sec => {
      const sectionEl = sec;
      if (sectionEl.style.display === 'none') return;

      const top = sectionEl.offsetTop;
      const height = sectionEl.offsetHeight;
      const id = sectionEl.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(item => {
          if (item.getAttribute('data-target') === id) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateScrollSpy, { passive: true });

  // 4. Smooth Scroll when clicking nav item
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('data-target');
      if (!targetId) return;

      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const offset = 100;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });

        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });

  // 5. Quick Preview Modal Engine
  function openQuickPreview(topicId: string): void {
    if (!modalBackdrop || !modalContainer) return;

    const topic = EPIDEMIOLOGY_TOPICS.find(t => t.id === topicId);
    if (!topic) return;

    const block = EPIDEMIOLOGY_BLOCKS.find(b => b.id === topic.blockId);

    modalContainer.innerHTML = `
      <div class="modal-header" style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center; background: var(--color-surface);">
        <div>
          <span style="font-size: 0.75rem; font-weight: 700; background: var(--color-bg); color: ${block?.color || '#0d9488'}; padding: 0.2rem 0.5rem; border-radius: 4px;">${topic.code} • ${block ? block.name : 'Dịch Tễ Học'}</span>
          <h3 style="margin: 0.35rem 0 0 0; font-size: 1.25rem; font-weight: 700; color: var(--color-text);">${topic.title}</h3>
        </div>
        <button type="button" class="modal-close-btn" onclick="window.EpiHub?.closeModal()" aria-label="Đóng" style="background: transparent; border: none; font-size: 1.5rem; cursor: pointer; color: var(--color-text-muted); width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 8px;">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="modal-body" style="padding: 1.5rem; max-height: 75vh; overflow-y: auto;">
        <!-- Tổng quan -->
        <div style="margin-bottom: 1.5rem; background: var(--color-bg); padding: 1.25rem; border-radius: 10px; border: 1px solid var(--color-border);">
          <h4 style="margin: 0 0 0.5rem 0; font-size: 0.95rem; font-weight: 700; color: var(--color-primary); display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-circle-info"></i> Định Nghĩa & Tổng Quan Dịch Tễ
          </h4>
          <p style="margin: 0; font-size: 0.9rem; line-height: 1.65; color: var(--color-text);">${topic.overview}</p>
        </div>

        <!-- Công thức cốt lõi -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="margin: 0 0 0.6rem 0; font-size: 0.95rem; font-weight: 700; color: #0d9488; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-calculator"></i> Công Thức Tính & Thuật Toán Đo Lường
          </h4>
          <ul style="margin: 0; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.45rem;">
            ${topic.keyFormulas.map(f => `<li style="font-size: 0.875rem; color: var(--color-text);"><code style="background: rgba(13, 148, 136, 0.1); color: #0f766e; padding: 0.2rem 0.5rem; border-radius: 4px; font-family: monospace; font-weight: 600; display: inline-block;">${f}</code></li>`).join('')}
          </ul>
        </div>

        <!-- Clinical Pearls -->
        <div style="margin-bottom: 1.5rem; background: rgba(245,158,11,0.08); border-left: 4px solid #f59e0b; padding: 1.25rem; border-radius: 0 10px 10px 0;">
          <h4 style="margin: 0 0 0.6rem 0; font-size: 0.95rem; font-weight: 700; color: #b45309; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> Điểm Ngọc Lâm Sàng & Thực Địa (Clinical Pearls)
          </h4>
          <ul style="margin: 0; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem;">
            ${topic.clinicalPearls.map(p => `<li style="font-size: 0.875rem; color: var(--color-text); line-height: 1.5;">${p}</li>`).join('')}
          </ul>
        </div>

        <!-- Pitfalls & Biases -->
        <div style="margin-bottom: 1.5rem; background: rgba(239,68,68,0.08); border-left: 4px solid #ef4444; padding: 1.25rem; border-radius: 0 10px 10px 0;">
          <h4 style="margin: 0 0 0.6rem 0; font-size: 0.95rem; font-weight: 700; color: #b91c1c; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-triangle-exclamation" style="color: #ef4444;"></i> Cạm Bẫy Sai Số & Ngụy Biện Dịch Tễ Cần Tránh
          </h4>
          <ul style="margin: 0; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem;">
            ${topic.biasAndPitfalls.map(b => `<li style="font-size: 0.875rem; color: var(--color-text); line-height: 1.5;">${b}</li>`).join('')}
          </ul>
        </div>

        <!-- Related Metrics & Tags -->
        <div>
          <h4 style="margin: 0 0 0.6rem 0; font-size: 0.95rem; font-weight: 700; color: #3b82f6; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-tags"></i> Chỉ Số & Thuật Ngữ Liên Quan
          </h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${topic.relatedMetrics.map(m => `<span style="font-size: 0.825rem; background: var(--color-surface); border: 1px solid var(--color-border); color: #2563eb; font-weight: 600; padding: 0.35rem 0.75rem; border-radius: 6px; display: inline-flex; align-items: center; gap: 0.35rem;"><i class="fa-solid fa-chart-simple" style="font-size: 0.75rem; color: #3b82f6;"></i> ${m}</span>`).join('')}
          </div>
        </div>
      </div>
    `;

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(): void {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // Bind to window for HTML event handlers
  (window as any).EpiHub = {
    openQuickPreview,
    closeModal
  };

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('open')) {
      closeModal();
    }
  });
}
