/**
 * CliniPortal — Clinical Handbook Hub SPA View
 * Path: src/content/clinical-handbook/views/handbook-hub-view.ts
 * 
 * Màn hình Cấp 1 & Cấp 2: Mục lục 8 Chuyên khoa & Danh mục Bệnh lý thực chiến
 * 100% Design Tokens & Dark/Light Mode Compliant
 */

import '../../../styles/components/clinical-handbook.css';
import { 
  HANDBOOK_SPECIALTIES, 
  getHandbookSpecialtyById 
} from '../data/handbook-catalog';
import { SpecialtyId } from '../types/handbook.types';

export function renderHandbookHubView(activeSpecialtyId: SpecialtyId = 'truyen-nhiem'): string {
  const currentSpecialty = getHandbookSpecialtyById(activeSpecialtyId) || HANDBOOK_SPECIALTIES[0];
  const totalDiseases = HANDBOOK_SPECIALTIES.reduce((acc, s) => acc + s.diseases.length, 0);

  return `
    <div class="handbook-hub-container" id="handbookMainContent">

      <!-- BREADCRUMB -->
      <nav class="handbook-breadcrumb" aria-label="Breadcrumb">
        <a href="#/">🏠 Trang chủ</a>
        <span class="separator">/</span>
        <span class="current">Sổ Tay Kinh Nghiệm & Đúc Kết Lâm Sàng</span>
      </nav>

      <!-- PROMAX LUXURY HERO SECTION -->
      <header class="handbook-hero">
        <div class="handbook-hero-badge">
          <span class="handbook-pulse-dot"></span>
          <span>Clinical Pearls & Decision Handbook • EBM 2026</span>
        </div>

        <h1>🩺 SỔ TAY KINH NGHIỆM & ĐÚC KẾT LÂM SÀNG</h1>
        <p>
          Kho tích lũy tri thức thực chiến theo từng <strong>Chuyên khoa & Bệnh lý cụ thể</strong>. 
          Đúc kết những <strong>vùng xám ra quyết định, cạm bẫy cận lâm sàng, sai lầm kê đơn thường gặp</strong> và bảng đối chiếu nhanh tại giường bệnh theo chuẩn Y học chứng cứ mới nhất.
        </p>

        <!-- KPI METRIC BAR -->
        <div class="handbook-kpi-row">
          <div class="handbook-kpi-pill">
            <i class="fa-solid fa-stethoscope"></i>
            <div>
              <strong>${HANDBOOK_SPECIALTIES.length}</strong>
              <span>Chuyên Khoa</span>
            </div>
          </div>

          <div class="handbook-kpi-pill">
            <i class="fa-solid fa-viruses"></i>
            <div>
              <strong>${totalDiseases}</strong>
              <span>Bệnh Lý Trọng Tâm</span>
            </div>
          </div>

          <div class="handbook-kpi-pill">
            <i class="fa-solid fa-book-medical"></i>
            <div>
              <strong>MDX Native</strong>
              <span>Đúc Kết Thực Chiến</span>
            </div>
          </div>
        </div>
      </header>

      <!-- SEARCH BAR -->
      <div class="handbook-search-bar">
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
        <input 
          type="text" 
          id="handbook-search-input" 
          class="handbook-search-input"
          placeholder="Tìm kiếm bệnh lý hoặc kinh nghiệm (Viêm gan B, Sốt xuất huyết, ALT, FibroScan...)" 
          aria-label="Tìm kiếm bệnh lý trong sổ tay"
        />
        <div class="handbook-search-counter" id="handbook-search-counter">
          <span>Hiển thị tất cả <strong>${currentSpecialty.diseases.length}</strong> bệnh lý</span>
        </div>
      </div>

      <!-- TẦNG 1: MỤC LỤC CHUYÊN KHOA (SPECIALTIES SEGMENTED RAIL) -->
      <section class="handbook-specialty-section">
        <div class="handbook-section-title-row">
          <h2>
            <i class="fa-solid fa-layer-group"></i>
            <span>1. Chọn Chuyên Khoa Y Khoa</span>
          </h2>
          <button type="button" class="btn-toggle-specialties" id="btn-toggle-overview">
            <i class="fa-solid fa-table-cells-large"></i>
            <span>Tổng quan 8 Chuyên khoa</span>
          </button>
        </div>

        <!-- SPECIALTY HORIZONTAL RAIL -->
        <div class="handbook-specialty-rail" role="tablist">
          ${HANDBOOK_SPECIALTIES.map(specialty => {
            const isActive = specialty.id === currentSpecialty.id;
            return `
              <a 
                href="#/clinical-handbook/${specialty.id}" 
                class="handbook-specialty-pill ${isActive ? 'is-active' : ''}"
                role="tab"
                aria-selected="${isActive ? 'true' : 'false'}"
                title="${specialty.name} — ${specialty.description}"
              >
                <i class="fa-solid ${specialty.icon}" style="color: ${isActive ? 'inherit' : specialty.color};"></i>
                <span>${specialty.shortName}</span>
                <span class="pill-count">
                  ${specialty.diseases.length > 0 ? `${specialty.diseases.length} bệnh` : 'Sắp có'}
                </span>
              </a>
            `;
          }).join('')}
        </div>

        <!-- EXPANDABLE OVERVIEW GRID (COLLAPSIBLE) -->
        <div class="handbook-specialties-overview-grid" id="handbook-overview-grid" style="display: none;">
          ${HANDBOOK_SPECIALTIES.map(spec => {
            const isActive = spec.id === currentSpecialty.id;
            return `
              <a 
                href="#/clinical-handbook/${spec.id}" 
                class="spec-overview-card ${isActive ? 'is-active' : ''}"
              >
                <div class="spec-overview-icon" style="background: ${spec.bgColor}; color: ${spec.color};">
                  <i class="fa-solid ${spec.icon}"></i>
                </div>
                <div>
                  <h4>${spec.name}</h4>
                  <p>${spec.description}</p>
                </div>
              </a>
            `;
          }).join('')}
        </div>
      </section>

      <!-- TẦNG 2: DANH MỤC BỆNH LÝ TRONG CHUYÊN KHOA ĐANG CHỌN -->
      <section class="handbook-disease-section" id="disease-list-section">
        <div class="handbook-section-title-row">
          <div>
            <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--handbook-primary); font-weight: 700; margin-bottom: 0.2rem;">
              Chuyên khoa đang chọn
            </div>
            <h2>
              <i class="fa-solid ${currentSpecialty.icon}" style="color: ${currentSpecialty.color};"></i>
              <span>${currentSpecialty.name}</span>
            </h2>
          </div>
          <span class="handbook-status-badge">
            ${currentSpecialty.badge}
          </span>
        </div>

        <!-- DANH SÁCH BỆNH LÝ DẠNG CARDS -->
        ${currentSpecialty.diseases.length > 0 ? `
          <div class="handbook-diseases-grid" id="handbook-disease-cards-container">
            ${currentSpecialty.diseases.map(disease => `
              <div 
                class="handbook-disease-card"
                data-name="${disease.name.toLowerCase()}"
                data-icd="${disease.icd10.toLowerCase()}"
                data-summary="${disease.summary.toLowerCase()}"
              >
                <div>
                  <!-- Top Meta -->
                  <div class="disease-card-header">
                    <div style="display: flex; align-items: center; gap: 0.6rem;">
                      <div class="disease-card-icon" style="color: ${disease.color || 'var(--handbook-primary)'};">
                        <i class="fa-solid ${disease.icon}"></i>
                      </div>
                      <span class="handbook-icd-badge">
                        ICD-10: ${disease.icd10}
                      </span>
                    </div>

                    ${disease.badge ? `
                      <span class="handbook-status-badge">
                        ${disease.badge}
                      </span>
                    ` : ''}
                  </div>

                  <!-- Tên bệnh lý -->
                  <h3>${disease.name}</h3>
                  <div class="disease-name-en">${disease.nameEn}</div>

                  <!-- Tóm tắt ngắn -->
                  <p class="disease-card-desc">${disease.summary}</p>

                  <!-- Key Pearls Preview -->
                  <div class="handbook-pearl-preview-box">
                    <div class="pearl-box-title">
                      <i class="fa-solid fa-lightbulb"></i>
                      <span>Đúc kết cốt lõi:</span>
                    </div>
                    <ul>
                      ${disease.keyPearlsPreview.slice(0, 2).map(pearl => `<li>${pearl}</li>`).join('')}
                    </ul>
                  </div>
                </div>

                <!-- Action Link -->
                <div class="disease-card-footer">
                  <span class="article-count-label">
                    <i class="fa-solid fa-book-medical"></i>
                    ${disease.articles.length > 0 ? `<strong>${disease.articles.length}</strong> bài đúc kết` : 'Đang biên soạn'}
                  </span>

                  <a 
                    href="#/clinical-handbook/${currentSpecialty.id}/${disease.slug}" 
                    class="btn-handbook-read"
                  >
                    <span>Xem đúc kết</span>
                    <i class="fa-solid fa-chevron-right" style="font-size: 0.75rem;"></i>
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        ` : `
          <div style="text-align: center; padding: 3rem 1.5rem; background: var(--handbook-surface); border: 1px dashed var(--handbook-border); border-radius: var(--handbook-radius-lg);">
            <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--handbook-primary-hl); color: var(--handbook-primary); display: inline-flex; align-items: center; justify-content: center; font-size: 1.5rem; margin-bottom: 1rem;">
              <i class="fa-solid fa-pen-ruler"></i>
            </div>
            <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--handbook-text); margin: 0 0 0.5rem 0;">
              Chuyên khoa ${currentSpecialty.name} Đang Được Biên Soạn
            </h3>
            <p style="font-size: 0.9rem; color: var(--handbook-muted); max-width: 600px; margin: 0 auto 1.5rem auto;">
              Hội đồng Y học chứng cứ CliniPortal đang chuẩn hóa các bài đúc kết thực chiến theo khuyến cáo 2026. Mời bạn tham khảo 8 Bệnh lý Trọng tâm thuộc Chuyên khoa Truyền Nhiễm.
            </p>
            <a href="#/clinical-handbook/truyen-nhiem" class="btn-handbook-read">
              <i class="fa-solid fa-virus-covid"></i>
              <span>Xem Chuyên Khoa Truyền Nhiễm</span>
            </a>
          </div>
        `}
      </section>

    </div>
  `;
}

export function initHandbookHubView(): void {
  // 1. Search Bar Filter
  const searchInput = document.getElementById('handbook-search-input') as HTMLInputElement | null;
  const searchCounter = document.getElementById('handbook-search-counter');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = (e.target as HTMLInputElement).value.toLowerCase().trim();
      const cards = document.querySelectorAll('.handbook-disease-card');
      let visibleCount = 0;

      cards.forEach(card => {
        const el = card as HTMLElement;
        const name = el.getAttribute('data-name') || '';
        const icd = el.getAttribute('data-icd') || '';
        const summary = el.getAttribute('data-summary') || '';
        const text = el.innerText.toLowerCase();

        const isMatch = !val || name.includes(val) || icd.includes(val) || summary.includes(val) || text.includes(val);
        if (isMatch) {
          el.style.display = 'flex';
          visibleCount++;
        } else {
          el.style.display = 'none';
        }
      });

      if (searchCounter) {
        if (val) {
          searchCounter.innerHTML = `Tìm thấy <strong>${visibleCount}</strong> kết quả phù hợp cho "<em>${val}</em>"`;
        } else {
          searchCounter.innerHTML = `Hiển thị tất cả <strong>${cards.length}</strong> bệnh lý`;
        }
      }
    });
  }

  // 2. Toggle Overview Grid
  const btnToggle = document.getElementById('btn-toggle-overview');
  const overviewGrid = document.getElementById('handbook-overview-grid');

  if (btnToggle && overviewGrid) {
    btnToggle.addEventListener('click', () => {
      const isHidden = overviewGrid.style.display === 'none';
      overviewGrid.style.display = isHidden ? 'grid' : 'none';
      btnToggle.innerHTML = isHidden 
        ? '<i class="fa-solid fa-chevron-up"></i><span>Thu gọn 8 Chuyên khoa</span>'
        : '<i class="fa-solid fa-table-cells-large"></i><span>Tổng quan 8 Chuyên khoa</span>';
    });
  }
}
