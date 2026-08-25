/**
 * ============================================================
 * CLINI-PORTAL: CLINICAL TOOLS VANILLA WEB COMPONENTS
 * (Bộ linh kiện Web Components cho phân hệ Công cụ lâm sàng & Máy tính y khoa)
 * ============================================================
 */

// 1. LINH KIỆN BREADCRUMB (<clini-breadcrumb>)
class CliniBreadcrumb extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered) return;
    let items = [];
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

// 2. LINH KIỆN HỘP CẢNH BÁO LÂM SÀNG CÔNG CỤ (<tool-alert>)
class ToolAlert extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered) return;
    const type = this.getAttribute('type') || 'info'; // danger, warn, info, ok
    const title = this.getAttribute('title') || '';
    const content = this.innerHTML;

    const iconMap = {
      danger: '⛔',
      warn: '⚠️',
      info: 'ℹ️',
      ok: '✅'
    };

    const icon = iconMap[type] || iconMap.info;

    this.innerHTML = `
      <div class="ab ab-${type}">
        <span class="ab-icon" style="margin-right:6px;">${icon}</span>
        ${title ? `<strong>${title}:</strong> ` : ''}${content}
      </div>
    `;
    this.dataset.rendered = "true";
  }
}
if (!customElements.get('tool-alert')) {
  customElements.define('tool-alert', ToolAlert);
}

// 3. LINH KIỆN THẺ KẾT QUẢ CỦA MÁY TÍNH LÂM SÀNG (<tool-card>)
class ToolCard extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered) return;
    const color = this.getAttribute('color') || 'blue'; // blue, green, red, amber
    const title = this.getAttribute('title') || 'Loại chỉ số';
    const value = this.getAttribute('value') || '0';
    const unit = this.getAttribute('unit') || '';

    this.innerHTML = `
      <div class="fluid-card fc-${color}">
        <div class="fc-header">${title}</div>
        <div class="fc-body">
          <div class="rate-display">
            <span class="rate-val">${value}</span>
            ${unit ? `<span class="rate-unit">${unit}</span>` : ''}
          </div>
        </div>
      </div>
    `;
    this.dataset.rendered = "true";
  }
}
if (!customElements.get('tool-card')) {
  customElements.define('tool-card', ToolCard);
}

// 4. LINH KIỆN BADGE CHẨN ĐOÁN & PHÂN LOẠI (<tool-badge>)
class ToolBadge extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered) return;
    const type = this.getAttribute('type') || 'info'; // danger, warning, success, info
    const content = this.innerHTML || this.getAttribute('label') || 'Phân loại';

    this.innerHTML = `<span class="badge badge-${type}">${content}</span>`;
    this.dataset.rendered = "true";
  }
}
if (!customElements.get('tool-badge')) {
  customElements.define('tool-badge', ToolBadge);
}
