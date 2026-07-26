/**
 * ============================================================
 * CLINI-PORTAL: PHYSIOLOGY VANILLA WEB COMPONENTS
 * (Phát triển theo kiến trúc Component-Based native JS)
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

// 2. LINH KIỆN HỘP THÔNG BÁO / LƯU Ý / CLINICAL PEARLS (<physio-alert>)
class PhysioAlert extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered) return;
    const type = this.getAttribute('type') || 'info';
    const title = this.getAttribute('title') || '';
    const content = this.innerHTML;

    const iconMap = {
      info: 'fas fa-info-circle',
      warning: 'fas fa-exclamation-triangle',
      danger: 'fas fa-exclamation-circle',
      pearl: 'fas fa-gem',
      concept: 'fas fa-key'
    };

    const titleMap = {
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
class PhysioMirrorButton extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered) return;
    const target = this.getAttribute('target') || '#';
    const title = this.getAttribute('title') || 'Xem cơ chế bệnh lý tương ứng';

    this.innerHTML = `
      <div style="margin: 1.5rem 0;">
        <button class="physio-step-card physio-mirror-btn" style="width:100%; cursor:pointer; text-align:left; border-left: 4px solid var(--color-purple, #8b5cf6);" data-mirror-target="${target}" data-mirror-title="${title}">
          <strong style="color: var(--color-purple, #8b5cf6);"><i class="fas fa-sync-alt" style="margin-right:6px;"></i> Physio-Patho Mirror:</strong> ${title} &rarr;
        </button>
      </div>
    `;

    const btn = this.querySelector('.physio-mirror-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        window.location.href = target;
      });
    }
    this.dataset.rendered = "true";
  }
}
if (!customElements.get('physio-mirror-button')) {
  customElements.define('physio-mirror-button', PhysioMirrorButton);
}

// 4. LINH KIỆN TRẮC NGHIỆM TƯƠNG TÁC NHANH (<physio-quiz>)
class PhysioQuiz extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered) return;
    let question = this.getAttribute('question') || '';
    let options = [];
    let correctIndex = parseInt(this.getAttribute('correct') || '0', 10);
    let explanation = this.getAttribute('explanation') || '';

    // Ưu tiên đọc cấu hình JSON nhúng bên trong thẻ script nếu có
    const scriptJson = this.querySelector('script[type="application/json"]');
    if (scriptJson) {
      try {
        const data = JSON.parse(scriptJson.textContent);
        question = data.question || question;
        options = data.options || options;
        correctIndex = data.correctIndex !== undefined ? data.correctIndex : correctIndex;
        explanation = data.explanation || explanation;
      } catch (e) {
        console.error('PhysioQuiz JSON parse error:', e);
      }
    } else if (this.getAttribute('options')) {
      try {
        options = JSON.parse(this.getAttribute('options'));
      } catch (e) {
        options = [];
      }
    }

    const quizId = this.getAttribute('quiz-id') || 'quiz_' + Math.random().toString(36).substr(2, 9);

    const optionsHtml = options.map((opt, idx) => `
      <label class="physio-quiz-option" data-index="${idx}">
        <input type="radio" name="${quizId}" value="${idx}">
        <span class="quiz-opt-text">${opt}</span>
      </label>
    `).join('');

    this.innerHTML = `
      <div class="physio-quiz-card" id="${quizId}">
        <div class="physio-quiz-badge"><i class="fas fa-question-circle"></i> Kiểm tra nhanh sinh lý</div>
        <div class="physio-quiz-question">${question}</div>
        <div class="physio-quiz-options">${optionsHtml}</div>
        <div class="physio-quiz-feedback" style="display:none;"></div>
      </div>
    `;

    const card = this.querySelector('.physio-quiz-card');
    const optionLabels = card.querySelectorAll('.physio-quiz-option');
    const feedback = card.querySelector('.physio-quiz-feedback');

    optionLabels.forEach(label => {
      const input = label.querySelector('input');
      input.addEventListener('change', () => {
        optionLabels.forEach(l => l.classList.remove('selected', 'correct', 'incorrect'));
        label.classList.add('selected');

        const selectedIdx = parseInt(input.value, 10);
        const isCorrect = selectedIdx === correctIndex;

        if (isCorrect) {
          label.classList.add('correct');
          feedback.className = 'physio-quiz-feedback feedback-success';
          feedback.innerHTML = `<i class="fas fa-check-circle"></i> <strong>Chính xác!</strong> ${explanation}`;
        } else {
          label.classList.add('incorrect');
          if (optionLabels[correctIndex]) {
            optionLabels[correctIndex].classList.add('correct');
          }
          feedback.className = 'physio-quiz-feedback feedback-error';
          feedback.innerHTML = `<i class="fas fa-times-circle"></i> <strong>Chưa chính xác.</strong> ${explanation}`;
        }
        feedback.style.display = 'block';
      });
    });

    this.dataset.rendered = "true";
  }
}
if (!customElements.get('physio-quiz')) {
  customElements.define('physio-quiz', PhysioQuiz);
}

// 5. LINH KIỆN HÌNH ẢNH CÓ LIGHTBOX (<physio-figure>)
class PhysioFigure extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered) return;
    const src = this.getAttribute('src') || '';
    const alt = this.getAttribute('alt') || '';
    const caption = this.getAttribute('caption') || '';

    this.innerHTML = `
      <figure class="physio-figure">
        <img src="${src}" alt="${alt}" class="physio-img lightbox-trigger" loading="lazy">
        ${caption ? `<figcaption>${caption}</figcaption>` : ''}
      </figure>
    `;
    this.dataset.rendered = "true";
  }
}
if (!customElements.get('physio-figure')) {
  customElements.define('physio-figure', PhysioFigure);
}
