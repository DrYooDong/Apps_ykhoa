/**
 * CliniPortal — Epidemiology & Biostatistics (Dịch Tễ Học Y Khoa) SPA View
 * Path: src/content/basic-medical/views/epidemiology-view.ts
 * Giao diện kinh điển đồng bộ chuẩn 100% với Sinh Lý, Cơ Chế Bệnh Sinh & Hóa Sinh
 * (Classic Hero Surveillance SVG, Feature Bento Banners, Toolbar Search/Grid Toggle, Sticky Block-Nav 6 Khối, Specialty Cards & Quick Modal)
 */

import '../../../../css/components/module-dashboard.css';
import '../../../../css/components/physio-content.css';
import '../../../../css/components/formula-vault.css';
import '../../../../css/components/physio-promax-hub.css';
import '../../../../css/components/epidemiology-hub.css';
import { 
  EPIDEMIOLOGY_BLOCKS, 
  EPIDEMIOLOGY_TOPICS 
} from '../data/epidemiology-data';
import { EpidemiologyBlock, EpidemiologyTopic } from '../types/epidemiology.types';

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
              Hệ thống hóa phương pháp luận dịch tễ học, thiết kế nghiên cứu quan sát và can thiệp, đo lường nguy cơ (RR, OR, AR), đánh giá test chẩn đoán (Se, Sp, PPV, NPV, LR) và kỹ năng điều tra dập dịch thực địa.
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

      <!-- PROMAX BENTO ACTION GRID (4 CÔNG CỤ DỊCH TỄ TƯƠNG TÁC CAO CẤP DẪN TỚI WEB CON) -->
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
          <input type="text" id="lesson-search" class="promax-search-input" placeholder="Tìm kiếm bài học dịch tễ học (Prevalence, RR, OR, Se/Sp, R0, Sốt xuất huyết, Sốt rét, Thủy đậu, Bradford Hill...)..." aria-label="Tìm kiếm chuyên đề dịch tễ">
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

      <!-- COUNTER -->
      <div class="search-counter" id="search-counter" style="margin-bottom: 1.5rem; font-size: 0.875rem; color: var(--color-text-muted);">
        Hiển thị <strong id="visible-count" style="color: #0d9488;">${EPIDEMIOLOGY_TOPICS.length + 3}</strong> / ${EPIDEMIOLOGY_TOPICS.length + 3} bài học &amp; chuyên khảo dịch tễ học
      </div>

      <!-- STICKY BLOCK NAVIGATION STRIP -->
      <nav class="promax-part-nav" aria-label="Điều hướng khối chuyên đề dịch tễ">
        ${EPIDEMIOLOGY_BLOCKS.map((b) => `
          <button type="button" class="promax-part-btn" data-target="#block-${b.id}">
            <i class="fa-solid ${b.icon}"></i>
            <span>${b.code}: ${b.name.split('&')[0].trim()}</span>
          </button>
        `).join('')}
      </nav>

      <!-- 6 BLOCKS SECTION -->
      <div id="blocks-container" class="blocks-container">
        ${EPIDEMIOLOGY_BLOCKS.map(block => renderBlockSection(block)).join('')}
      </div>

      <!-- QUICK PREVIEW MODAL -->
      <div id="topicModalBackdrop" class="modal-backdrop" aria-hidden="true">
        <div class="modal-container" role="dialog" aria-modal="true" aria-labelledby="modalTitle" id="topicModalContainer">
          <!-- Populated by JS -->
        </div>
      </div>

    </div>
  `;
}

function renderBlockSection(block: EpidemiologyBlock): string {
  const topics = EPIDEMIOLOGY_TOPICS.filter(t => t.blockId === block.id);
  
  // Custom Disease Articles for Block 4
  const diseaseHtml = block.id === 'block-4' ? `
    <!-- DISEASE ARTICLE CARDS -->
    <div class="topic-card-grid" style="margin-top: 1rem;">
      <!-- Dengue Card -->
      <div class="topic-card" data-topic-id="dth-dengue" style="border-top: 4px solid #ef4444;">
        <div class="topic-card-header">
          <span class="topic-code-badge" style="background: rgba(239,68,68,0.12); color: #ef4444;">DTH-VIRUS • A90-A91</span>
          <span class="topic-pearl-badge"><i class="fa-solid fa-mosquito"></i> Véc-tơ Aedes</span>
        </div>
        <h4 class="topic-title">Dịch Tễ Học Sốt Xuất Huyết Dengue (DENV)</h4>
        <p class="topic-overview">
          Tam giác dịch tễ học DENV, sinh học muỗi <em>Aedes aegypti / albopictus</em>, chu kỳ ủ bệnh ngoại lai (EIP), cơ chế tăng cường miễn dịch phụ thuộc kháng thể (ADE), số liệu dịch kỷ lục 2024–2026.
        </p>
        <div class="topic-pearl-preview" style="background: rgba(239,68,68,0.06); border-left-color: #ef4444;">
          <i class="fa-solid fa-lightbulb" style="color: #ef4444;"></i>
          <span>Tái nhiễm khác serotype kích hoạt ADE gây bão cytokine, rò rỉ huyết tương và sốc DSS.</span>
        </div>
        <div class="topic-card-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
          <span style="font-size: 0.78rem; color: var(--color-text-muted);"><i class="fa-solid fa-clock"></i> 12 phút đọc</span>
          <a href="src/content/basic-medical/epidemiology/dth-dengue.html" class="btn-read-topic" style="background: #ef4444; color: #fff; text-decoration: none; padding: 0.35rem 0.85rem; border-radius: 6px; font-size: 0.8rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.35rem;">
            <span>Xem Bài Viết</span> <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>

      <!-- Malaria Card -->
      <div class="topic-card" data-topic-id="dth-sot-ret" style="border-top: 4px solid #d97706;">
        <div class="topic-card-header">
          <span class="topic-code-badge" style="background: rgba(217,119,6,0.12); color: #d97706;">DTH-PARASITE • B50-B54</span>
          <span class="topic-pearl-badge"><i class="fa-solid fa-mosquito"></i> Véc-tơ Anopheles</span>
        </div>
        <h4 class="topic-title">Dịch Tễ Học Bệnh Sốt Rét (Malaria / Plasmodium)</h4>
        <p class="topic-overview">
          5 loài <em>Plasmodium</em>, thể ngủ gan (Hypnozoites), động học lây truyền muỗi <em>Anopheles</em>, 4 mối đe dọa sinh học (kháng Artemisinin gen <em>pfk13</em>, xóa gen <em>pfhrp2/3</em>), WHO 2025 và QĐ 4922/QĐ-BYT.
        </p>
        <div class="topic-pearl-preview" style="background: rgba(217,119,6,0.06); border-left-color: #d97706;">
          <i class="fa-solid fa-lightbulb" style="color: #d97706;"></i>
          <span>Điều trị tiệt căn <em>P. vivax</em> bắt buộc dùng Primaquine tiêu diệt thể ngủ và phải test men G6PD.</span>
        </div>
        <div class="topic-card-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
          <span style="font-size: 0.78rem; color: var(--color-text-muted);"><i class="fa-solid fa-clock"></i> 15 phút đọc</span>
          <a href="src/content/basic-medical/epidemiology/dth-sot-ret.html" class="btn-read-topic" style="background: #d97706; color: #fff; text-decoration: none; padding: 0.35rem 0.85rem; border-radius: 6px; font-size: 0.8rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.35rem;">
            <span>Xem Bài Viết</span> <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>

      <!-- Chickenpox Card -->
      <div class="topic-card" data-topic-id="dth-thuy-dau" style="border-top: 4px solid #8b5cf6;">
        <div class="topic-card-header">
          <span class="topic-code-badge" style="background: rgba(139,92,246,0.12); color: #8b5cf6;">DTH-VIRUS • B01-B02</span>
          <span class="topic-pearl-badge"><i class="fa-solid fa-shield-virus"></i> VZV Latency</span>
        </div>
        <h4 class="topic-title">Dịch Tễ Học Bệnh Thủy Đậu (Varicella / VZV)</h4>
        <p class="topic-overview">
          Sự tương phản sâu sắc giữa ôn đới vs nhiệt đới, tỷ lệ tử vong chữ U (gấp 23–29 lần ở người lớn), kỷ nguyên vắc-xin 1-liều/2-liều, rủi ro dịch chuyển tuổi khi độ bao phủ thấp dưới 80% (WHO).
        </p>
        <div class="topic-pearl-preview" style="background: rgba(139,92,246,0.06); border-left-color: #8b5cf6;">
          <i class="fa-solid fa-lightbulb" style="color: #8b5cf6;"></i>
          <span>Bao phủ vắc-xin &lt;80% đẩy lùi tuổi mắc bệnh sang người lớn, làm tăng ca nặng và tử vong chung.</span>
        </div>
        <div class="topic-card-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
          <span style="font-size: 0.78rem; color: var(--color-text-muted);"><i class="fa-solid fa-clock"></i> 14 phút đọc</span>
          <a href="src/content/basic-medical/epidemiology/dth-thuy-dau.html" class="btn-read-topic" style="background: #8b5cf6; color: #fff; text-decoration: none; padding: 0.35rem 0.85rem; border-radius: 6px; font-size: 0.8rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.35rem;">
            <span>Xem Bài Viết</span> <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  ` : '';

  return `
    <section id="block-${block.id}" class="block-section" style="margin-bottom: 2.75rem; scroll-margin-top: 90px;">
      <div class="block-section-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; border-bottom: 2px solid var(--color-border); padding-bottom: 0.75rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 40px; height: 40px; border-radius: 10px; background: ${block.bgColor}; color: ${block.color}; display: flex; align-items: center; justify-content: center; font-size: 1.25rem;">
            <i class="fa-solid ${block.icon}"></i>
          </div>
          <div>
            <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: var(--color-text);">
              ${block.code}: ${block.name}
            </h3>
            <p style="margin: 0.15rem 0 0 0; font-size: 0.85rem; color: var(--color-text-muted);">
              ${block.description}
            </p>
          </div>
        </div>
        <span class="block-topic-count" style="font-size: 0.78rem; font-weight: 700; background: var(--color-bg); border: 1px solid var(--color-border); padding: 0.25rem 0.65rem; border-radius: 999px; color: var(--color-text-muted);">
          ${topics.length + (block.id === 'block-4' ? 3 : 0)} Chuyên đề
        </span>
      </div>

      <div class="topic-card-grid">
        ${topics.map(topic => renderTopicCard(topic, block)).join('')}
      </div>

      ${diseaseHtml}
    </section>
  `;
}

function renderTopicCard(topic: EpidemiologyTopic, block: EpidemiologyBlock): string {
  return `
    <div class="topic-card" data-topic-id="${topic.id}">
      <div class="topic-card-header">
        <span class="topic-code-badge" style="background: ${block.bgColor}; color: ${block.color};">${topic.code}</span>
        <span class="topic-pearl-badge"><i class="fa-solid fa-lightbulb"></i> ${topic.clinicalPearls.length} Pearls</span>
      </div>

      <h4 class="topic-title">${topic.title}</h4>
      <p class="topic-overview">${topic.overview}</p>

      <div class="topic-pearl-preview">
        <i class="fa-solid fa-quote-left"></i>
        <span>${topic.clinicalPearls[0] || 'Xem chi tiết trong bài học'}</span>
      </div>

      <div class="topic-tags-strip" style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin: 0.85rem 0;">
        ${topic.relatedMetrics.slice(0, 3).map(m => `
          <span style="font-size: 0.72rem; font-weight: 600; background: var(--color-bg); border: 1px solid var(--color-border); color: var(--color-text-muted); padding: 0.15rem 0.45rem; border-radius: 4px;">${m}</span>
        `).join('')}
      </div>

      <div class="topic-card-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; border-top: 1px solid var(--color-border); padding-top: 0.75rem;">
        <span style="font-size: 0.78rem; color: var(--color-text-muted);"><i class="fa-solid fa-clock"></i> 8 phút đọc</span>
        <button type="button" class="btn-read-topic" onclick="window.EpiHub?.openQuickPreview('${topic.id}')" style="background: ${block.color}; color: #ffffff; border: none; padding: 0.35rem 0.85rem; border-radius: 6px; font-size: 0.8rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 0.35rem;">
          <span>Xem Tóm Tắt</span> <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </button>
      </div>
    </div>
  `;
}

/**
 * Initialize Event Listeners for Master Epidemiology Hub
 */
export function initEpidemiologyView(): void {
  // Search & Filtering
  const searchInput = document.getElementById('lesson-search') as HTMLInputElement;
  const clearBtn = document.getElementById('clear-search');
  const visibleCountEl = document.getElementById('visible-count');
  const topicCards = document.querySelectorAll('.topic-card');

  const filterTopics = () => {
    const query = (searchInput?.value || '').toLowerCase().trim();
    if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';

    let count = 0;
    topicCards.forEach((card) => {
      const el = card as HTMLElement;
      const text = el.textContent?.toLowerCase() || '';
      if (!query || text.includes(query)) {
        el.style.display = '';
        count++;
      } else {
        el.style.display = 'none';
      }
    });

    if (visibleCountEl) {
      visibleCountEl.textContent = count.toString();
    }
  };

  searchInput?.addEventListener('input', filterTopics);
  clearBtn?.addEventListener('click', () => {
    if (searchInput) {
      searchInput.value = '';
      filterTopics();
      searchInput.focus();
    }
  });

  // Shortcut Ctrl + K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      const activeEl = document.activeElement;
      if (activeEl?.tagName !== 'INPUT' && activeEl?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInput?.focus();
      }
    }
  });

  // View Switcher (Grid / List)
  const viewGridBtn = document.getElementById('view-grid-btn');
  const viewListBtn = document.getElementById('view-list-btn');
  const grids = document.querySelectorAll('.topic-card-grid');

  viewGridBtn?.addEventListener('click', () => {
    viewGridBtn.classList.add('active');
    viewListBtn?.classList.remove('active');
    grids.forEach(g => g.classList.remove('list-view'));
  });

  viewListBtn?.addEventListener('click', () => {
    viewListBtn.classList.add('active');
    viewGridBtn?.classList.remove('active');
    grids.forEach(g => g.classList.add('list-view'));
  });

  // Sticky Block Nav Scrolling
  const navBtns = document.querySelectorAll('.promax-part-btn');
  navBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (targetId) {
        const targetEl = document.querySelector(targetId);
        targetEl?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Modal Setup
  const modalBackdrop = document.getElementById('topicModalBackdrop');
  const modalContainer = document.getElementById('topicModalContainer');

  function openQuickPreview(topicId: string): void {
    const topic = EPIDEMIOLOGY_TOPICS.find(t => t.id === topicId);
    if (!topic || !modalContainer || !modalBackdrop) return;

    const block = EPIDEMIOLOGY_BLOCKS.find(b => b.id === topic.blockId);

    modalContainer.innerHTML = `
      <div class="modal-header" style="padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--color-border); display: flex; justify-content: space-between; align-items: center; background: var(--color-surface);">
        <div>
          <span style="font-size: 0.75rem; font-weight: 700; background: var(--color-bg); color: var(--color-primary); padding: 0.2rem 0.5rem; border-radius: 4px;">
            ${topic.code} • ${block ? block.name : ''}
          </span>
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
            <i class="fa-solid fa-circle-info"></i> Định Nghĩa & Phương Pháp Luận
          </h4>
          <p style="margin: 0; font-size: 0.9rem; line-height: 1.65; color: var(--color-text);">${topic.overview}</p>
        </div>

        <!-- Công thức -->
        <div style="margin-bottom: 1.5rem;">
          <h4 style="margin: 0 0 0.6rem 0; font-size: 0.95rem; font-weight: 700; color: #0d9488; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-calculator"></i> Công Thức Tính & Phương Trình Cốt Lõi
          </h4>
          <ul style="margin: 0; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.45rem;">
            ${topic.keyFormulas.map(f => `<li style="font-size: 0.875rem; color: var(--color-text);"><code style="background: rgba(13,148,136,0.1); color: #0f766e; padding: 0.2rem 0.5rem; border-radius: 4px; font-family: monospace;">${f}</code></li>`).join('')}
          </ul>
        </div>

        <!-- Clinical Pearls -->
        <div style="margin-bottom: 1.5rem; background: rgba(245,158,11,0.08); border-left: 4px solid #f59e0b; padding: 1.25rem; border-radius: 0 10px 10px 0;">
          <h4 style="margin: 0 0 0.6rem 0; font-size: 0.95rem; font-weight: 700; color: #b45309; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-lightbulb" style="color: #f59e0b;"></i> Điểm Ngọc Lâm Sàng & Dịch Tễ (Clinical Pearls)
          </h4>
          <ul style="margin: 0; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem;">
            ${topic.clinicalPearls.map(p => `<li style="font-size: 0.875rem; color: var(--color-text); line-height: 1.5;">${p}</li>`).join('')}
          </ul>
        </div>

        <!-- Sai số & Cạm bẫy -->
        <div style="margin-bottom: 1.5rem; background: rgba(239,68,68,0.08); border-left: 4px solid #ef4444; padding: 1.25rem; border-radius: 0 10px 10px 0;">
          <h4 style="margin: 0 0 0.6rem 0; font-size: 0.95rem; font-weight: 700; color: #b91c1c; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-triangle-exclamation" style="color: #ef4444;"></i> Cạm Bẫy Sai Số & Sai Lầm Cần Tránh (Bias & Pitfalls)
          </h4>
          <ul style="margin: 0; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem;">
            ${topic.biasAndPitfalls.map(b => `<li style="font-size: 0.875rem; color: var(--color-text); line-height: 1.5;">${b}</li>`).join('')}
          </ul>
        </div>

        <!-- Chỉ số liên quan -->
        <div>
          <h4 style="margin: 0 0 0.6rem 0; font-size: 0.95rem; font-weight: 700; color: #3b82f6; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-chart-line"></i> Chỉ Số & Thước Đo Liên Quan
          </h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${topic.relatedMetrics.map(m => `<span style="font-size: 0.825rem; background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-primary); font-weight: 600; padding: 0.35rem 0.75rem; border-radius: 6px; display: inline-flex; align-items: center; gap: 0.35rem;"><i class="fa-solid fa-chart-simple" style="font-size: 0.75rem; color: #3b82f6;"></i> ${m}</span>`).join('')}
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
