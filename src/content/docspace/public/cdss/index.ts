/**
 * CliniPortal CDSS — Hub Entry Point & Exports
 * Path: src/content/knowledge-vault/cdss/index.ts
 */

export * from './cdss-types';
export * from './cdss-registry';
export * from './dengue/dengue-data';
export * from './dengue/dengue-engine';
export * from './dengue/dengue-ui';
export * from './ecg/ecg-types';
export * from './ecg/ecg-cases';
export * from './ecg/ecg-math';
export * from './ecg/ecg-canvas-renderer';
export * from './ecg/ecg-ui';
export * from './abg/abg-types';
export * from './abg/abg-engine';
export * from './abg/abg-ui';
export * from './xray/xray-types';
export * from './xray/xray-canvas-renderer';
export * from './xray/xray-ui';

import { CDSS_MODULES, getCDSSModuleById } from './cdss-registry';

/**
 * Khởi tạo giao diện Hub CDSS
 */
export function initCDSSHub(containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="cdss-hub-container">
      <!-- Hero Banner -->
      <section class="cdss-hub-hero">
        <div class="cdss-hero-tag">
          <i class="fa-solid fa-microchip"></i> Hệ Thống Hỗ Trợ Quyết Định Lâm Sàng 2.0
        </div>
        <h1 class="cdss-hero-title">
          Kho CDSS Lâm Sàng Độc Lập
        </h1>
        <p class="cdss-hero-subtitle">
          Tập hợp các công cụ thuật toán tính toán liều lượng, điều phối phác đồ truyền dịch động học, phân tích sóng điện tim và hỗ trợ ra quyết định điều trị tại giường bệnh (Bedside Decision Support).
        </p>
      </section>

      <!-- Grid of CDSS Modules -->
      <section class="cdss-hub-modules-section">
        <div class="cdss-modules-header">
          <h2 class="cdss-section-heading">
            <i class="fa-solid fa-shapes"></i> Danh Sách Module CDSS Đang Hoạt Động
          </h2>
          <span class="cdss-module-count">${CDSS_MODULES.length} modules sẵn sàng</span>
        </div>

        <div class="cdss-modules-grid">
          ${CDSS_MODULES.map(m => `
            <div class="cdss-module-card cdss-module-card--${m.category}">
              <div class="cdss-card-top">
                <div class="cdss-card-icon-wrap">
                  <i class="${m.icon}"></i>
                </div>
                <div class="cdss-card-badges">
                  <span class="cdss-badge cdss-badge--category">${m.categoryName}</span>
                  ${m.badge ? `<span class="cdss-badge cdss-badge--highlight">${m.badge}</span>` : ''}
                </div>
              </div>

              <h3 class="cdss-card-title">
                <a href="${m.standaloneUrl}">${m.title}</a>
              </h3>
              ${m.titleEn ? `<p class="cdss-card-title-en">${m.titleEn}</p>` : ''}
              
              <p class="cdss-card-desc">${m.shortDesc}</p>

              <div class="cdss-card-meta">
                <div class="cdss-meta-item">
                  <i class="fa-solid fa-book-medical"></i> <span>${m.guidelineSource}</span>
                </div>
                ${m.icd10 && m.icd10.length > 0 ? `
                  <div class="cdss-meta-item">
                    <i class="fa-solid fa-barcode"></i> <span>ICD-10: ${m.icd10.join(', ')}</span>
                  </div>
                ` : ''}
              </div>

              <div class="cdss-card-footer">
                <span class="cdss-version-tag">Phiên bản ${m.version}</span>
                <a href="${m.standaloneUrl}" class="cdss-open-btn">
                  <span>Mở CDSS</span> <i class="fa-solid fa-arrow-right"></i>
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}

if (typeof window !== 'undefined') {
  (window as any).initCDSSHub = initCDSSHub;
  (window as any).CDSS_MODULES = CDSS_MODULES;
  (window as any).getCDSSModuleById = getCDSSModuleById;
}

