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

// 5. LINH KIỆN GIẢI THÍCH SINH LÝ BỆNH TẠI CHỖ (<physio-explain>)
const PHYSIO_EXPLAIN_DB = {
  'jvp': {
    title: 'Tĩnh Mạch Cổ Nổi (JVP)',
    mechanism: 'Áp lực tĩnh mạch cảnh (JVP) phản ánh trực tiếp áp lực nhĩ phải (CVP). Khi suy tim phải hoặc suy tim toàn bộ, thất phải giảm khả năng tống máu, gây ứ máu ngược dòng ở nhĩ phải và tĩnh mạch chủ trên. Áp lực thủy tĩnh tăng cao làm dâng cột máu ở tĩnh mạch cảnh ngoài & cảnh trong (>4cm so với góc ức).',
    pearl: 'JVP nổi kèm Phản hồi gan - tĩnh mạch cảnh dương tính là dấu hiệu có độ đặc hiệu cao của suy tim hoặc quá tải thể tích.',
    link: '../../../pathophysiology/cardiovascular/suy-tim.html'
  },
  't3-gallop': {
    title: 'Tiếng Ngựa Phi T3 (S3 Gallop)',
    mechanism: 'Tiếng T3 xuất hiện ở đầu kỳ tâm trương (ngay sau T2), tạo ra do dòng máu từ nhĩ tống rất nhanh và mạnh vào một tâm thất đang giãn rộng hoặc giảm độ tuân thủ (stiff/dilated ventricle). Sự dội đột ngột của dòng máu vào thành thất làm rung thành thất và bộ máy van nhĩ thất.',
    pearl: 'Ở người >40 tuổi, tiếng T3 là dấu hiệu chỉ điểm rất nhạy của suy tim tâm thu thất trái (giảm phân suất tống máu EF).',
    link: '../../../pathophysiology/cardiovascular/suy-tim.html'
  },
  'pulsus-paradoxus': {
    title: 'Mạch Nghịch Thường (Pulsus Paradoxus)',
    mechanism: 'Bình thường khi hít vào, áp lực âm lồng ngực làm tăng máu về thất phải, đẩy nhẹ vách liên thất sang trái khiến Huyết áp tâm thu giảm nhẹ (<10 mmHg). Trong chèn ép tim cấp (Cardiac Tamponade), túi màng ngoài tim căng cứng giới hạn thể tích chung. Máu về thất phải ép mạnh vách liên thất sang trái, làm thể tích tống máu thất trái giảm sút nghiêm trọng (>10 mmHg).',
    pearl: 'HA tâm thu giảm >10 mmHg khi hít vào là dấu hiệu cấp cứu báo động chèn ép tim cấp cần chọc dò màng màng ngoài tim.',
    link: '../../../pathophysiology/cardiovascular/chen-ep-tim.html'
  },
  'hepatojugular-reflux': {
    title: 'Phản Hồi Gan - Tĩnh Mạch Cảnh',
    mechanism: 'Ấn liên tục vào vùng gan trong 10-15 giây đẩy một lượng lớn máu tĩnh mạch từ gan về thất phải qua tĩnh mạch chủ dưới. Nếu thất phải bình thường, nó sẽ dung nạp và tống số máu này đi dễ dàng. Nếu thất phải suy, máu bị dồn ứ lại làm cột áp lực JVP dâng cao liên tục (>3cm) trong suốt thời gian ấn.',
    pearl: 'Giúp phân biệt tĩnh mạch cổ nổi do suy tim (dương tính) với tĩnh mạch cổ nổi do hội chứng tắc nghẽn tĩnh mạch chủ trên (âm tính).',
    link: '../../../pathophysiology/cardiovascular/suy-tim.html'
  },
  'peripheral-edema': {
    title: 'Phù Ngoại Vi (Peripheral Edema)',
    mechanism: 'Xảy ra theo định luật Starling do: (1) Tăng áp lực thủy tĩnh mao mạch (ứ máu tĩnh mạch trong suy tim/tắc tĩnh mạch), (2) Giảm áp lực keo huyết tương (giảm Albumin trong suy gan, thận hư), hoặc (3) Tăng tính thấm mao mạch. Dịch thoát từ lòng mạch vào mô kẽ vượt quá khả năng dẫn lưu của hệ bạch huyết.',
    pearl: 'Phù do suy tim có tính chất: phù mềm, ấn lõm, đối xứng 2 bên, xuất hiện ở vùng thấp (mắt cá chân hoặc vùng cùng cụt).',
    link: '../../../pathophysiology/renal/phu-va-dien-giai.html'
  },
  'clubbing': {
    title: 'Ngón Tay Dùi Trống (Digital Clubbing)',
    mechanism: 'Tình trạng thiếu máu mạn tính (bệnh tim bẩm sinh có tím, bệnh phổi mạn tính) kích thích giải phóng PDGF và VEGF từ các mảng tiểu cầu mắc kẹt ở vi mạch ngón tay. Các yếu tố tăng trưởng này gây tăng sinh mô liên kết và tân tạo mạch máu dưới nền móng.',
    pearl: 'Mất góc Lovibond (>180°) và dấu hiệu Schamroth dương tính (mất khoảng trống hình trám giữa 2 móng tay áp vào nhau).',
    link: '../../../pathophysiology/respiratory/thieu-oxy-mau.html'
  },
  'crackles': {
    title: 'Tiếng Rán Nổ (Crackles / Râles)',
    mechanism: 'Do sự bóc tách đột ngột của các phế nang nhỏ và phế quản tận bị dính lại bởi dịch nhầy hoặc dịch phù trong thì hít vào. Sự chênh lệch áp lực làm các phế nang bật mở đồng loạt tạo ra tiếng nổ lách tách tần số cao.',
    pearl: 'Rán nổ cuối thì hít vào ở 2 đáy phổi là dấu hiệu đặc trưng của phù phổi cấp (ứ dịch kẽ phế nang) hoặc xơ phổi.',
    link: '../../../pathophysiology/respiratory/phu-phoi-cap.html'
  }
};

class PhysioExplainEngine {
  static initModal() {
    if (document.getElementById('physioExplainModalOverlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'physioExplainModalOverlay';
    overlay.className = 'physio-explain-modal-overlay';
    overlay.style.cssText = 'display:none; position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,0.6); backdrop-filter:blur(4px); align-items:center; justify-content:center; padding:20px;';
    
    overlay.innerHTML = `
      <div class="physio-explain-modal-card" style="background:var(--color-surface, #fff); color:var(--color-text, #1e293b); width:100%; max-width:520px; border-radius:14px; border:1px solid var(--color-border, #e2e8f0); box-shadow:0 20px 30px rgba(0,0,0,0.25); overflow:hidden; animation:physioPopIn 0.25s ease-out;">
        <div style="padding:16px 20px; background:linear-gradient(135deg, #0284c7, #0369a1); color:#fff; display:flex; justify-content:space-between; align-items:center;">
          <h3 id="pemTitle" style="margin:0; font-size:1.05rem; font-weight:700; display:flex; align-items:center; gap:8px;">
            <i class="fa-solid fa-brain" style="color:#fde047;"></i> Cơ Chế Sinh Lý Bệnh
          </h3>
          <button id="pemCloseBtn" style="background:none; border:none; color:#fff; font-size:1.5rem; cursor:pointer; opacity:0.8; line-height:1;">&times;</button>
        </div>
        <div style="padding:20px; max-height:70vh; overflow-y:auto;">
          <div style="margin-bottom:16px;">
            <div style="font-weight:700; font-size:0.85rem; color:var(--color-primary, #0284c7); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px;">
              <i class="fa-solid fa-gears"></i> Cơ chế huyết động & bệnh sinh:
            </div>
            <p id="pemMechanism" style="margin:0; font-size:0.95rem; line-height:1.6; color:var(--color-text);"></p>
          </div>
          <div style="background:var(--color-surface-offset, #f8fafc); border-left:4px solid #eab308; padding:12px 14px; border-radius:6px; margin-bottom:16px;">
            <div style="font-weight:700; font-size:0.85rem; color:#ca8a04; margin-bottom:4px;">
              <i class="fa-solid fa-lightbulb"></i> Clinical Pearl (Ý nghĩa lâm sàng):
            </div>
            <div id="pemPearl" style="font-size:0.9rem; line-height:1.5; color:var(--color-text-muted);"></div>
          </div>
        </div>
        <div style="padding:12px 20px; background:var(--color-bg, #f1f5f9); border-top:1px solid var(--color-border, #e2e8f0); display:flex; justify-content:flex-end;">
          <button id="pemCloseBtn2" class="dsp-btn dsp-btn-primary" style="padding:6px 16px; font-size:0.85rem; border-radius:6px; cursor:pointer;">
            <i class="fa-solid fa-check"></i> Đã hiểu
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const closeFn = () => { overlay.style.display = 'none'; };
    document.getElementById('pemCloseBtn')?.addEventListener('click', closeFn);
    document.getElementById('pemCloseBtn2')?.addEventListener('click', closeFn);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeFn();
    });
  }

  static show(signKey, fallbackLabel = '') {
    PhysioExplainEngine.initModal();

    const info = PHYSIO_EXPLAIN_DB[signKey] || {
      title: fallbackLabel || 'Giải thích Cơ chế',
      mechanism: 'Chưa có thông tin chi tiết về cơ chế sinh lý bệnh cho triệu chứng này.',
      pearl: 'Hãy tham khảo bài học Sinh lý bệnh tương ứng để xem phân tích chi tiết.',
      link: '#'
    };

    const overlay = document.getElementById('physioExplainModalOverlay');
    const titleEl = document.getElementById('pemTitle');
    const mechEl = document.getElementById('pemMechanism');
    const pearlEl = document.getElementById('pemPearl');

    if (overlay && titleEl && mechEl && pearlEl) {
      titleEl.innerHTML = `<i class="fa-solid fa-brain" style="color:#fde047;"></i> ${info.title}`;
      mechEl.innerText = info.mechanism;
      pearlEl.innerText = info.pearl;

      overlay.style.display = 'flex';
    }
  }
}

class PhysioExplain extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered) return;
    const sign = this.getAttribute('sign') || '';
    const label = this.getAttribute('label') || this.innerHTML.trim() || 'Giải thích Cơ chế';

    this.innerHTML = `
      <button type="button" class="physio-explain-badge" title="Click xem giải thích cơ chế sinh lý bệnh tại chỗ">
        <i class="fa-solid fa-brain"></i>
        <span>${label}</span>
      </button>
    `;

    const btn = this.querySelector('.physio-explain-badge');
    btn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      PhysioExplainEngine.show(sign, label);
    });

    this.dataset.rendered = "true";
  }
}

if (!customElements.get('physio-explain')) {
  customElements.define('physio-explain', PhysioExplain);
}

