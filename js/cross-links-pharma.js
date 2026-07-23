// ════════════════════════════════════════════════════════════════
//  CLINIPORTAL - CONTEXTUAL CROSS-LINKS NAVIGATION ENGINE
//  Tự động chèn khối "Tài liệu & Công cụ Liên quan" xuyên phân hệ
// ════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  // Calculate relative depth prefix based on current pathname
  function getRelativePrefix() {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/pages/Dược lý/Chuyên khoa/') || path.includes('/pages/Dược lý/Triệu chứng/')) {
      return '../../../';
    }
    if (path.includes('/pages/Dược lý/')) {
      return '../../';
    }
    return '../';
  }

  const prefix = getRelativePrefix();

  // Curated cross-links catalog mapped by topic/page type
  const CROSS_LINKS_CATALOG = [
    {
      title: 'Các Bước Đọc ECG Cơ Bản',
      category: 'Kỹ năng lâm sàng',
      desc: 'Phân tích điện tâm đồ chuẩn y khoa: theo dõi khoảng QT, loạn nhịp tim & thiếu máu cơ tim.',
      url: `${prefix}pages/Kỹ năng/Cận lâm sàng/doc-ecg-co-ban.html`,
      icon: 'fa-solid fa-heart-pulse'
    },
    {
      title: 'Phân Tích Khí Máu (ABG) & Nomogram',
      category: 'Công cụ lâm sàng',
      desc: 'Biểu đồ Siggaard-Andersen tương tác đánh giá rối loạn toan kiềm & bù trừ.',
      url: `${prefix}pages/Công cụ/Cấp cứu & hồi sức/ABG_Nomogram.html`,
      icon: 'fa-solid fa-chart-line'
    },
    {
      title: 'Bộ Quy Đổi Liều Tương Đương Lâm Sàng',
      category: 'Công cụ Dược lý',
      desc: 'Quy đổi tương đương liều Corticoids, Opioids, Statins, PPIs, DOACs, Benzodiazepines.',
      url: `${prefix}pages/Công cụ/Chung/QuyDoi_LieuTuongDuong.html`,
      icon: 'fa-solid fa-arrows-rotate'
    },
    {
      title: 'Quản Lý Thuốc Vận Mạch & Trợ Tim',
      category: 'Công cụ hồi sức',
      desc: 'Tính toán tốc độ truyền và liều lượng Noradrenaline, Adrenaline, Dobutamine.',
      url: `${prefix}pages/Công cụ/Cấp cứu & hồi sức/QL_Vanmach.html`,
      icon: 'fa-solid fa-syringe'
    }
  ];

  /**
   * Render Cross-links section into page
   */
  function renderCrossLinks() {
    if (document.getElementById('pharma-crosslinks-section')) return;

    // Check if page already has an explicit related-links-section
    if (document.querySelector('.related-links-section')) return;

    const mainContainer = document.querySelector('main') || document.querySelector('.main-wrapper') || document.querySelector('.app-container');
    if (!mainContainer) return;

    const section = document.createElement('section');
    section.id = 'pharma-crosslinks-section';
    section.className = 'pharma-crosslinks-card';

    section.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; border-bottom: 1px solid var(--color-divider); padding-bottom: 0.75rem;">
        <h4 style="margin: 0; font-size: var(--text-md); font-weight: 700; color: var(--color-primary); display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-link"></i> Khám Phá Xuyên Phân Hệ CliniPortal
        </h4>
        <span style="font-size: var(--text-xs); color: var(--color-text-muted);">Liên kết học thuật tích hợp</span>
      </div>
      <div class="crosslinks-grid">
        ${CROSS_LINKS_CATALOG.map(item => `
          <a href="${item.url}" class="crosslink-item-card">
            <div class="crosslink-icon">
              <i class="${item.icon}"></i>
            </div>
            <div>
              <div style="font-size: 0.7rem; font-weight: 700; color: var(--color-primary); text-transform: uppercase;">${item.category}</div>
              <div style="font-size: var(--text-xs); font-weight: 700; color: var(--color-text); margin: 0.15rem 0;">${item.title}</div>
              <div style="font-size: 0.725rem; color: var(--color-text-muted); line-height: 1.3;">${item.desc}</div>
            </div>
          </a>
        `).join('')}
      </div>
    `;

    mainContainer.appendChild(section);
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderCrossLinks();
  });
})();
