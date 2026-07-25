/**
 * ============================================================
 * CLINI-PORTAL: CLINICAL SKILLS VANILLA WEB COMPONENTS
 * (Bộ linh kiện Web Components cho phân hệ Kỹ năng lâm sàng)
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
      <nav aria-label="Breadcrumb" class="breadcrumb-container" style="padding: 1rem 2rem; border-bottom: 1px solid var(--color-divider, #e2e8f0);">
        <ol class="breadcrumb-list" style="display:flex; gap:0.5rem; list-style:none; font-size:0.9rem; margin:0; padding:0; align-items:center; flex-wrap:wrap;">
    `;

    items.forEach((item, index) => {
      const isLast = index === items.length - 1;
      if (isLast) {
        html += `<li style="color:var(--color-primary, #0284c7); font-weight:600;">${item.label}</li>`;
      } else {
        html += `<li><a href="${item.url}" style="text-decoration:none; color:var(--color-text-muted, #64748b);">${item.label}</a> &gt;</li>`;
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

// 2. LINH KIỆN HỘP GHI CHÚ KỸ NĂNG (<skill-note>)
class SkillNote extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered) return;
    const type = this.getAttribute('type') || 'info';
    const title = this.getAttribute('title') || '';
    const content = this.innerHTML;

    const iconMap = {
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle',
      danger: 'fas fa-ban',
      pearl: 'fas fa-gem'
    };

    const icon = iconMap[type] || iconMap.info;

    this.innerHTML = `
      <div class="skill-note note-${type}">
        <i class="${icon}"></i>
        <div class="skill-note-content">
          ${title ? `<strong>${title}:</strong> ` : ''}${content}
        </div>
      </div>
    `;
    this.dataset.rendered = "true";
  }
}
if (!customElements.get('skill-note')) {
  customElements.define('skill-note', SkillNote);
}

// 3. LINH KIỆN BADGE XÉT NGHIỆM CẬN LÂM SÀNG (<lab-badge>)
class LabBadge extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered) return;
    const type = this.getAttribute('type') || 'normal';
    const content = this.innerHTML || this.getAttribute('label') || 'Bình thường';

    this.innerHTML = `<span class="lab-badge badge-${type}">${content}</span>`;
    this.dataset.rendered = "true";
  }
}
if (!customElements.get('lab-badge')) {
  customElements.define('lab-badge', LabBadge);
}

// 4. LINH KIỆN ĐỒNG HỒ ĐẠO ĐỨC & LUYỆN TẬP OSCE (<osce-timer>)
class OsceTimer extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered) return;
    const minutes = parseInt(this.getAttribute('default-minutes') || '7', 10);
    const formattedDefault = minutes.toString().padStart(2, '0') + ':00';

    this.innerHTML = `
      <div class="osce-timer-widget" id="osce-timer-widget">
        <div class="osce-timer-header"><i class="fas fa-stopwatch"></i> Đồng hồ thực hành OSCE (${minutes} phút)</div>
        <div class="osce-timer-display" id="osce-timer-display">${formattedDefault}</div>
        <div class="osce-timer-controls">
          <button id="osce-timer-start" class="btn-timer-start">Bắt đầu</button>
          <button id="osce-timer-reset" class="btn-timer-reset">Đặt lại</button>
        </div>
      </div>
    `;
    this.dataset.rendered = "true";
  }
}
if (!customElements.get('osce-timer')) {
  customElements.define('osce-timer', OsceTimer);
}
