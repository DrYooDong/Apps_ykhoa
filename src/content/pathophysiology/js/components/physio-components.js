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
        <button class="physio-step-card physio-mirror-btn" style="width:100%; cursor:pointer; text-align:left; border-left: 4px solid var(--color-purple); background: var(--color-surface); color: var(--color-text);" data-mirror-target="${target}" data-mirror-title="${title}">
          <strong style="color: var(--color-purple);"><i class="fas fa-sync-alt" style="margin-right:6px;"></i> Physio-Patho Mirror:</strong> ${title} &rarr;
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
        ${caption ? `<figcaption class="physio-figcaption">${caption}</figcaption>` : ''}
      </figure>
    `;
    this.dataset.rendered = "true";
  }
}
if (!customElements.get('physio-figure')) {
  customElements.define('physio-figure', PhysioFigure);
}

// 6. LINH KIỆN CƠ CHẾ BỆNH SINH (<patho-mechanism>)
class PathoMechanism extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered) return;
    const title = this.getAttribute('title') || 'Cơ chế Sinh lý bệnh';
    const concept = this.getAttribute('concept') || '';
    const stepsAttr = this.getAttribute('steps');
    const content = this.innerHTML;

    let stepsHtml = '';
    if (stepsAttr) {
      try {
        const parsed = JSON.parse(stepsAttr);
        stepsHtml = `
          <div class="patho-steps-ribbon" style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-top:0.75rem;">
            ${parsed.map((st, idx) => `
              <div style="background:var(--color-bg); border:1px solid var(--color-border); border-left:3px solid var(--color-primary); padding:0.4rem 0.6rem; border-radius:6px; font-size:0.8rem; flex:1; min-width:140px;">
                <span style="font-weight:700; color:var(--color-primary);">Bước ${idx + 1}:</span> ${st}
              </div>
            `).join('')}
          </div>
        `;
      } catch (e) {}
    }

    this.innerHTML = `
      <div class="patho-mechanism-card" style="background:var(--color-surface); border:1px solid var(--color-primary); border-radius:10px; padding:1rem; margin:1rem 0; box-shadow:0 3px 12px rgba(2, 132, 199, 0.08);">
        <div style="display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--color-divider); padding-bottom:0.5rem; margin-bottom:0.75rem;">
          <div style="font-weight:700; color:var(--color-primary); display:flex; align-items:center; gap:0.5rem; font-size:0.95rem;">
            <i class="fa-solid fa-dna" style="color:var(--color-purple);"></i> ${title}
          </div>
          ${concept ? `<span style="font-size:0.75rem; background:rgba(2, 132, 199, 0.1); color:var(--color-primary); padding:0.25rem 0.5rem; border-radius:12px; font-weight:600;">${concept}</span>` : ''}
        </div>
        <div class="patho-mechanism-body" style="font-size:0.875rem; color:var(--color-text); line-height:1.5;">
          ${content}
        </div>
        ${stepsHtml}
      </div>
    `;
    this.dataset.rendered = "true";
  }
}
if (!customElements.get('patho-mechanism')) {
  customElements.define('patho-mechanism', PathoMechanism);
}

// 7. LINH KIỆN CƠ CHẾ SINH LÝ BỆNH LIÊN KẾT KỸ NĂNG LÂM SÀNG (<physio-concept>)
class PhysioConcept extends HTMLElement {
  connectedCallback() {
    if (this.dataset.rendered) return;
    const conceptId = this.getAttribute('concept-id') || this.getAttribute('id') || '';
    const title = this.getAttribute('title') || 'Khái niệm Sinh lý bệnh';
    
    const catalog = {
      'action_potential': {
        title: 'Điện thế Hoạt động Cơ tim & Cơ chế Tái cực',
        summary: 'Điện thế hoạt động cơ tim gồm 5 pha (pha 0 khử cực nhanh bởi Na+, pha 1 tái cực sớm bởi K+, pha 2 cao nguyên bởi Ca2+ L-type, pha 3 tái cực nhanh, pha 4 nghỉ). Bất thường pha 2/3 kéo dài khoảng QT gây xoắn đỉnh và loạn nhịp.',
        url: `../../../../pages/Sinh lý - Sinh lý bệnh/`
      },
      'jvp_mechanics': {
        title: 'Sinh lý Tĩnh mạch Cổ nổi (JVP) & Huyết động Nhĩ phải',
        summary: 'JVP phản ánh áp lực trực tiếp từ Nhĩ phải (CVP). Sóng a tương ứng nhĩ co, sóng c do van 3 lá lồi vào nhĩ khi thất co, sóng v do máu về nhĩ cuối tâm thu. JVP cao gợi ý Suy tim phải, Viêm màng ngoài tim co thắt hoặc Chèn ép tim cấp.',
        url: `../../../../pages/Sinh lý - Sinh lý bệnh/`
      },
      'heart_sounds_murmurs': {
        title: 'Cơ chế Tạo Tiếng tim (T1, T2) & Âm thổi Lâm sàng',
        summary: 'Tiếng T1 do đóng van 2 lá & 3 lá bắt đầu tâm thu. Tiếng T2 do đóng van ĐMC & ĐMP bắt đầu tâm trương. Dòng máu xoáy tốc độ cao qua van hẹp/hở gây rung âm tần số cao tạo nên Âm thổi tâm thu hoặc Âm thổi tâm trương.',
        url: `../../../../pages/Sinh lý - Sinh lý bệnh/`
      },
      'respiratory_mechanics': {
        title: 'Cơ chế Hô hấp, Kháng lực Đường thở & Ran Phổi',
        summary: 'Sự co cơ hô hấp tạo áp lực âm khoang màng phổi hút khí vào. Sự thu hẹp lòng phế quản (co thắt cơ trơn, phù nề) tăng kháng lực gây Tiếng Rít/Khò khè (Wheezing/Rhonchi). Dịch đọng trong phế nang vỡ ra khi hít vào tạo Tiếng Ran Nổ (Crackles).',
        url: `../../../../pages/Sinh lý - Sinh lý bệnh/`
      }
    };

    const data = catalog[conceptId] || {
      title: title,
      summary: this.getAttribute('summary') || this.innerHTML || 'Xem cơ chế sinh lý bệnh chi tiết.',
      url: this.getAttribute('url') || `../../../../pages/Sinh lý - Sinh lý bệnh/`
    };

    this.innerHTML = `
      <div class="physio-concept-card" style="background:var(--color-surface); border:1px solid var(--color-primary); border-left:4px solid var(--color-primary); border-radius:10px; padding:0.85rem 1.1rem; margin:1rem 0; box-shadow:0 3px 12px rgba(2, 132, 199, 0.07);">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.4rem; border-bottom:1px solid var(--color-divider); padding-bottom:0.4rem;">
          <span style="font-weight:700; color:var(--color-primary); font-size:0.9rem; display:flex; align-items:center; gap:0.45rem;">
            <i class="fa-solid fa-brain" style="color:var(--color-purple);"></i> ${data.title}
          </span>
          <span style="font-size:0.7rem; background:rgba(2, 132, 199, 0.1); color:var(--color-primary); padding:0.2rem 0.55rem; border-radius:12px; font-weight:600;">Cơ chế Sinh lý bệnh</span>
        </div>
        <div style="font-size:0.825rem; color:var(--color-text); line-height:1.5;">
          ${data.summary}
        </div>
        <div style="margin-top:0.6rem; text-align:right;">
          <a href="${data.url}" target="_blank" style="font-size:0.75rem; color:var(--color-primary); font-weight:600; text-decoration:none; display:inline-flex; align-items:center; gap:0.3rem;">
            Khám phá bài học Sinh lý bệnh liên quan <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    `;
    this.dataset.rendered = "true";
  }
}
if (!customElements.get('physio-concept')) {
  customElements.define('physio-concept', PhysioConcept);
}
