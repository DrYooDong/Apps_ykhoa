/**
 * ============================================================
 * CLINI-PORTAL: PHYSIOLOGY VANILLA WEB COMPONENTS
 * (Phát triển theo kiến trúc Component-Based native TypeScript)
 * ============================================================
 */

export interface BreadcrumbItem {
  label: string;
  url: string;
}

// 1. LINH KIỆN BREADCRUMB (<clini-breadcrumb>)
export class CliniBreadcrumb extends HTMLElement {
  connectedCallback(): void {
    if (this.dataset.rendered) return;
    let items: BreadcrumbItem[] = [];
    const rawItems = this.getAttribute('items');
    if (rawItems) {
      try {
        items = JSON.parse(rawItems);
      } catch (e) {
        console.error('Breadcrumb JSON parse error:', e);
      }
    }

    if (!items.length) return;

    let html = `
      <nav aria-label="Breadcrumb" class="breadcrumb-container" style="padding: 1rem 2rem; border-bottom: 1px solid var(--color-divider);">
        <ol class="breadcrumb-list" style="display:flex; gap:0.5rem; list-style:none; font-size:0.9rem; margin:0; padding:0; align-items:center; flex-wrap:wrap;">
    `;

    items.forEach((item, index) => {
      const isLast = index === items.length - 1;
      if (isLast) {
        html += `<li style="color:var(--color-primary); font-weight:600;">${item.label}</li>`;
      } else {
        html += `<li><a href="${item.url}" style="text-decoration:none; color:var(--color-text-muted);">${item.label}</a> <span style="color:var(--color-text-faint); margin-left:0.25rem;">&gt;</span></li>`;
      }
    });

    html += `</ol></nav>`;
    this.innerHTML = html;
    this.dataset.rendered = "true";
  }
}
if (!customElements.get('clini-breadcrumb')) {
  customElements.define('clini-breadcrumb', CliniBreadcrumb);
}

// 2. LINH KIỆN HỘP THÔNG BÁO / LƯU Ý / CLINICAL PEARLS (<physio-alert>)
export class PhysioAlert extends HTMLElement {
  connectedCallback(): void {
    if (this.dataset.rendered) return;
    const type = this.getAttribute('type') || 'info';
    const title = this.getAttribute('title') || '';
    const content = this.innerHTML;

    const iconMap: Record<string, string> = {
      info: 'fas fa-info-circle',
      warning: 'fas fa-exclamation-triangle',
      danger: 'fas fa-exclamation-circle',
      pearl: 'fas fa-gem',
      concept: 'fas fa-key'
    };

    const titleMap: Record<string, string> = {
      info: 'Thông tin bổ sung',
      warning: 'Lưu ý lâm sàng',
      danger: 'Cảnh báo nguy hiểm / Chống chỉ định',
      pearl: 'Clinical Pearl (Ngọc lâm sàng)',
      concept: 'Khái niệm chìa khóa'
    };

    const icon = iconMap[type] || iconMap.info;
    const displayTitle = title || titleMap[type] || 'Thông báo';

    this.innerHTML = `
      <div class="physio-alert-card alert-type-${type}">
        <div class="physio-alert-header">
          <i class="${icon} alert-icon"></i>
          <span class="alert-title">${displayTitle}</span>
        </div>
        <div class="physio-alert-content">${content}</div>
      </div>
    `;
    this.dataset.rendered = "true";
  }
}
if (!customElements.get('physio-alert')) {
  customElements.define('physio-alert', PhysioAlert);
}

// 3. LINH KIỆN NÚT KẾT NỐI SINH LÝ - BỆNH LÝ (<physio-mirror-button>)
export class PhysioMirrorButton extends HTMLElement {
  connectedCallback(): void {
    if (this.dataset.rendered) return;
    const target = this.getAttribute('target') || '#';
    const title = this.getAttribute('title') || 'Xem cơ chế bệnh lý tương ứng';

    this.innerHTML = `
      <div style="margin: 1.5rem 0;">
        <button class="physio-step-card physio-mirror-btn" style="width:100%; cursor:pointer; text-align:left; border-left: 4px solid var(--color-purple); background: var(--color-surface); color: var(--color-text);" data-mirror-target="${target}" data-mirror-title="${title}">
          <strong style="color: var(--color-purple);"><i class="fas fa-sync-alt" style="margin-right:6px;"></i> Physio-Patho Mirror:</strong> ${title} &rarr;
        </button>
      </div>
    `;
    this.dataset.rendered = "true";
  }
}
if (!customElements.get('physio-mirror-button')) {
  customElements.define('physio-mirror-button', PhysioMirrorButton);
}
