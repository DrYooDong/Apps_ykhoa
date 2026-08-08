/**
 * CliniPortal — Homepage Advanced Effects & Features
 * Includes: Clock, Counter animation, Scroll reveal, Command Palette,
 *           Recently visited, 3D tilt, Back-to-top, Scroll progress
 */
(function () {
  'use strict';

  // ============================================================
  // UTILITIES
  // ============================================================
  function removeAccents(str) {
    return str.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D');
  }

  function escapeHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;')
            .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  // ============================================================
  // 1. LIVE CLOCK + TIME-BASED GREETING in Hero
  // ============================================================
  function initHeroClock() {
    const timeEl  = document.getElementById('heroClockTime');
    const dateEl  = document.getElementById('heroClockDate');
    const greetEl = document.getElementById('heroGreeting');
    if (!timeEl) return;

    const DAYS   = ['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'];
    const MONTHS = ['tháng 1','tháng 2','tháng 3','tháng 4','tháng 5','tháng 6',
                    'tháng 7','tháng 8','tháng 9','tháng 10','tháng 11','tháng 12'];

    function getGreeting(h) {
      if (h >= 5  && h < 12) return { emoji: '🌅', text: 'Chào buổi sáng, Bác sĩ!' };
      if (h >= 12 && h < 14) return { emoji: '☀️', text: 'Chào buổi trưa, Bác sĩ!' };
      if (h >= 14 && h < 18) return { emoji: '⛅', text: 'Chào buổi chiều, Bác sĩ!' };
      if (h >= 18 && h < 22) return { emoji: '🌆', text: 'Chào buổi tối, Bác sĩ!' };
      return { emoji: '🌙', text: 'Chào khuya, Bác sĩ!' };
    }

    function updateDayScoreBadge(now) {
      if (!window.GoodDayCalculator) return;
      const scoreBtn = document.getElementById('heroDayScoreBtn');
      const valEl = document.getElementById('heroDayScoreVal');
      const textEl = document.getElementById('heroDayScoreText');
      const iconEl = document.getElementById('heroDayScoreIcon');
      if (!scoreBtn || !valEl || !textEl) return;

      const evalData = window.GoodDayCalculator.evaluateDayScore(now);
      valEl.textContent = `${evalData.total}/100`;
      textEl.textContent = evalData.rating;
      if (iconEl) iconEl.textContent = evalData.icon;

      scoreBtn.className = `hero-day-score-badge ${evalData.badgeClass}`;
      scoreBtn.setAttribute('data-score', evalData.total);
    }

    function openDayScoreModal() {
      if (!window.GoodDayCalculator) return;
      const evalData = window.GoodDayCalculator.evaluateDayScore(new Date());
      const doc = evalData.docProfile;

      // Remove existing modal if any
      const existing = document.getElementById('dayScoreModalOverlay');
      if (existing) existing.remove();

      const truc = evalData.trucNgay;
      const tiet = evalData.tietKhiInfo;
      const than = evalData.thanSat;

      const modalHtml = `
        <div class="day-score-modal-overlay" id="dayScoreModalOverlay">
          <div class="day-score-modal-card animate-pop-in">
            <div class="modal-card-header">
              <div class="header-title-group">
                <span class="modal-badge-tag">☯ CHI TIẾT CHỈ SỐ NGÀY TỐT</span>
                <h3>Phân Tích Nhật Hạn & Cát Hung Lâm Sàng</h3>
              </div>
              <button class="modal-close-btn" id="closeDayScoreModal">&times;</button>
            </div>

            <div class="modal-card-body">
              <!-- Top Score Summary Banner -->
              <div class="score-summary-banner ${evalData.badgeClass}">
                <div class="score-gauge-wrap">
                  <svg class="score-gauge-svg" viewBox="0 0 100 100">
                    <circle class="gauge-bg" cx="50" cy="50" r="42" />
                    <circle class="gauge-bar" cx="50" cy="50" r="42" style="stroke-dasharray: 264; stroke-dashoffset: ${264 - (264 * evalData.total) / 100};" />
                  </svg>
                  <div class="score-gauge-val">
                    <span class="gauge-num">${evalData.total}</span>
                    <span class="gauge-sub">/100</span>
                  </div>
                </div>
                <div class="score-summary-info">
                  <div class="rating-badge-pill">${evalData.icon} ${evalData.rating}</div>
                  <h4>Ngày ${evalData.canChiDay} (Âm lịch: ${evalData.lunarDay}/${evalData.lunarMonth})</h4>
                  <p>${evalData.summaryText}</p>
                  <div class="doc-profile-chip">
                    <span>👨‍⚕️ <strong>${doc.name || 'Bác sĩ'}</strong> (${doc.gender || 'Nam'}) — Tuổi ${doc.canNam} ${doc.chiNam} (${doc.birthDay}/${doc.birthMonth}/${doc.birthYear} lúc ${doc.birthHour}h${doc.birthMinute}p) — Mệnh ${doc.hanhMenh}</span>
                    <button type="button" class="btn-config-doc-age" id="btnEditDocAge">⚙️ Hồ sơ Sinh</button>
                  </div>
                </div>
              </div>

              <!-- Form Đổi Hồ Sơ Sinh Đầy Đủ Bác Sĩ (hidden by default) -->
              <div class="doc-age-edit-box" id="docAgeEditBox" style="display:none;">
                <label style="font-weight:700; font-size:0.82rem; margin-bottom:0.4rem; display:block; color:var(--color-primary);">⚙️ Cấu Hình Hồ Sơ Sinh Cá Nhân Hóa (Bát Tự & Tử Vi):</label>
                <div class="edit-profile-grid">
                  <div>
                    <span style="font-size:0.72rem; color:var(--color-text-muted);">Họ & Tên Bác sĩ:</span>
                    <input type="text" id="inputDocName" value="${doc.name || 'Bác sĩ'}" class="input-age-num" style="width:100%;">
                  </div>
                  <div>
                    <span style="font-size:0.72rem; color:var(--color-text-muted);">Giới tính:</span>
                    <select id="selectDocGender" class="select-age-hanh" style="width:100%;">
                      <option value="Nam" ${doc.gender === 'Nam' ? 'selected' : ''}>♂️ Nam</option>
                      <option value="Nữ" ${doc.gender === 'Nữ' ? 'selected' : ''}>♀️ Nữ</option>
                    </select>
                  </div>
                  <div>
                    <span style="font-size:0.72rem; color:var(--color-text-muted);">Ngày sinh:</span>
                    <input type="number" id="inputDocDay" min="1" max="31" value="${doc.birthDay || 15}" class="input-age-num" style="width:100%;">
                  </div>
                  <div>
                    <span style="font-size:0.72rem; color:var(--color-text-muted);">Tháng sinh:</span>
                    <input type="number" id="inputDocMonth" min="1" max="12" value="${doc.birthMonth || 8}" class="input-age-num" style="width:100%;">
                  </div>
                  <div>
                    <span style="font-size:0.72rem; color:var(--color-text-muted);">Năm sinh:</span>
                    <input type="number" id="inputDocYear" min="1930" max="2020" value="${doc.birthYear || 1990}" class="input-age-num" style="width:100%;">
                  </div>
                  <div>
                    <span style="font-size:0.72rem; color:var(--color-text-muted);">Giờ sinh (0-23h):</span>
                    <input type="number" id="inputDocHour" min="0" max="23" value="${doc.birthHour || 8}" class="input-age-num" style="width:100%;">
                  </div>
                  <div>
                    <span style="font-size:0.72rem; color:var(--color-text-muted);">Phút sinh:</span>
                    <input type="number" id="inputDocMin" min="0" max="59" value="${doc.birthMinute || 0}" class="input-age-num" style="width:100%;">
                  </div>
                  <div>
                    <span style="font-size:0.72rem; color:var(--color-text-muted);">Ngũ Hành Bản Mệnh:</span>
                    <select id="selectDocHanhMenh" class="select-age-hanh" style="width:100%;">
                      <option value="Kim" ${doc.hanhMenh === 'Kim' ? 'selected' : ''}>Mệnh Kim ⚙️</option>
                      <option value="Mộc" ${doc.hanhMenh === 'Mộc' ? 'selected' : ''}>Mệnh Mộc 🌿</option>
                      <option value="Thủy" ${doc.hanhMenh === 'Thủy' ? 'selected' : ''}>Mệnh Thủy 🌊</option>
                      <option value="Hỏa" ${doc.hanhMenh === 'Hỏa' ? 'selected' : ''}>Mệnh Hỏa 🔥</option>
                      <option value="Thổ" ${doc.hanhMenh === 'Thổ' ? 'selected' : ''}>Mệnh Thổ 🏔️</option>
                    </select>
                  </div>
                </div>
                <div style="margin-top:0.6rem; text-align:right;">
                  <button type="button" class="btn-save-doc-age" id="btnSaveDocAge">💾 Lưu Hồ Sơ Sinh & Tính Lại</button>
                </div>
              </div>

              <!-- Trực Ngày & Tiết Khí Strip -->
              <div class="truc-tietkhi-banner">
                <div class="truc-box ${truc.type}">
                  <span class="truc-tag">TRỰC NGÀY</span>
                  <strong>Trực ${truc.name} (${truc.rating})</strong>
                  <p>${truc.desc}</p>
                </div>
                <div class="tietkhi-box">
                  <span class="tietkhi-tag">TIẾT KHÍ</span>
                  <strong>${tiet.tietKhi.icon} Tiết ${tiet.tietKhi.name}</strong>
                  <p>Cát khí mùa: +${tiet.tietKhi.score}đ ${tiet.tuLyTuTuyet ? ` | <span style="color:#ef4444; font-weight:700;">⚠️ ${tiet.tuLyTuTuyet.name} (${tiet.tuLyTuTuyet.score}đ)</span>` : ''}</p>
                </div>
              </div>

              <!-- Thần Sát & Ngày Cát/Hung Âm Lịch -->
              ${(than.list.length > 0 || evalData.b4.errors.length > 0 || evalData.b4.bonuses.length > 0) ? `
                <div class="than-sat-container">
                  <div style="font-size:0.78rem; font-weight:700; color:var(--color-text); margin-bottom:0.4rem;">
                    <i class="fa-solid fa-star-of-david" style="color:var(--color-primary);"></i> Thần Sát & Ngày Cát / Hung Âm Lịch:
                  </div>
                  <div class="than-sat-chips">
                    ${than.list.map(ts => `<span class="ts-chip ${ts.type}" title="${ts.desc}">${ts.name} (${ts.score >= 0 ? '+' : ''}${ts.score}đ)</span>`).join('')}
                    ${evalData.b4.bonuses.map(b => `<span class="ts-chip pos">${b}</span>`).join('')}
                    ${evalData.b4.errors.map(err => `<span class="ts-chip neg">${err}</span>`).join('')}
                  </div>
                </div>
              ` : ''}

              <!-- Medical Biorhythms Summary & Clinical Tips -->
              ${evalData.bio ? `
                <div class="biorhythm-summary-box">
                  <div class="bio-box-header">
                    <strong><i class="fa-solid fa-heart-pulse" style="color:#ef4444;"></i> Nhịp Sinh Học Y Khoa (Biorhythms Hôm Nay):</strong>
                    <span class="bio-days-tag">${evalData.bio.daysLived} ngày tuổi</span>
                  </div>
                  <div class="bio-bars-grid">
                    <div class="bio-bar-item">
                      <span>💪 Thể lực: <strong>${evalData.bio.physical}%</strong></span>
                      <div class="bio-progress-bg"><div class="bio-progress-fill" style="width:${Math.max(10, (evalData.bio.physical + 100)/2)}%; background:#10b981;"></div></div>
                    </div>
                    <div class="bio-bar-item">
                      <span>🧠 Trí tuệ: <strong>${evalData.bio.intellectual}%</strong></span>
                      <div class="bio-progress-bg"><div class="bio-progress-fill" style="width:${Math.max(10, (evalData.bio.intellectual + 100)/2)}%; background:#8b5cf6;"></div></div>
                    </div>
                    <div class="bio-bar-item">
                      <span>❤️ Cảm xúc: <strong>${evalData.bio.emotional}%</strong></span>
                      <div class="bio-progress-bg"><div class="bio-progress-fill" style="width:${Math.max(10, (evalData.bio.emotional + 100)/2)}%; background:#0284c7;"></div></div>
                    </div>
                  </div>

                  ${evalData.bio.clinicalTips && evalData.bio.clinicalTips.length > 0 ? `
                    <div class="clinical-tips-box">
                      <div class="ct-title">💡 Gợi Ý Hành Động Lâm Sàng:</div>
                      <ul>
                        ${evalData.bio.clinicalTips.map(tip => `<li>${tip}</li>`).join('')}
                      </ul>
                    </div>
                  ` : ''}
                </div>
              ` : ''}

              <!-- Breakdown Grid -->
              <div class="score-breakdown-grid">
                <div class="breakdown-card">
                  <div class="bd-icon">👑</div>
                  <div class="bd-content">
                    <h5>Can Ngày vs Can Tuổi</h5>
                    <p>${evalData.b1.text}</p>
                    <span class="score-tag ${evalData.b1.score >= 30 ? 'pos' : 'neg'}">${evalData.b1.score >= 0 ? '+' : ''}${evalData.b1.score}đ</span>
                  </div>
                </div>

                <div class="breakdown-card">
                  <div class="bd-icon">☯</div>
                  <div class="bd-content">
                    <h5>Giao thoa Can Chi Ngày</h5>
                    <p>${evalData.canChiNgayScore.text}</p>
                    <span class="score-tag ${evalData.canChiNgayScore.score >= 0 ? 'pos' : 'neg'}">${evalData.canChiNgayScore.score >= 0 ? '+' : ''}${evalData.canChiNgayScore.score}đ</span>
                  </div>
                </div>

                <div class="breakdown-card">
                  <div class="bd-icon">🔮</div>
                  <div class="bd-content">
                    <h5>Tương sinh Ngũ Hành</h5>
                    <p>${evalData.b3.detail.join(', ') || 'Đồng hành bình hòa'}</p>
                    <span class="score-tag pos">+${evalData.b3.point}đ</span>
                  </div>
                </div>

                <div class="breakdown-card">
                  <div class="bd-icon">⚡</div>
                  <div class="bd-content">
                    <h5>Lục Xung Tuổi Bác sĩ</h5>
                    <p>${evalData.lucXung.text}</p>
                    <span class="score-tag ${evalData.lucXung.score < 0 ? 'neg' : 'neutral'}">${evalData.lucXung.score}đ</span>
                  </div>
                </div>
              </div>

              <!-- Giờ Hoàng Đạo Section -->
              <div class="hoang-dao-section">
                <h4><i class="fa-solid fa-sun" style="color:#f59e0b;"></i> Các Giờ Hoàng Đạo Trong Ngày (Cát Giờ):</h4>
                <div class="hoang-dao-pills">
                  ${evalData.hoangDaoHours.map(h => `<span class="hd-pill"><i class="fa-regular fa-clock"></i> ${h}</span>`).join('')}
                </div>
              </div>
            </div>

            <div class="modal-card-footer">
              <span class="footer-hint"><i class="fa-solid fa-shield-halved"></i> Chỉ số được tính theo Tử vi Bát tự, 12 Trực, 24 Tiết Khí & Biorhythm y khoa</span>
              <button class="btn btn-primary btn-sm" id="btnCloseDayScoreModalBottom">Đóng</button>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHtml);

      const overlay = document.getElementById('dayScoreModalOverlay');
      const closeBtn = document.getElementById('closeDayScoreModal');
      const closeBottom = document.getElementById('btnCloseDayScoreModalBottom');
      const btnEditAge = document.getElementById('btnEditDocAge');
      const editBox = document.getElementById('docAgeEditBox');
      const btnSaveAge = document.getElementById('btnSaveDocAge');

      const closeModal = () => overlay && overlay.remove();
      if (closeBtn) closeBtn.addEventListener('click', closeModal);
      if (closeBottom) closeBottom.addEventListener('click', closeModal);
      if (overlay) {
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) closeModal();
        });
      }

      if (btnEditAge && editBox) {
        btnEditAge.addEventListener('click', () => {
          editBox.style.display = editBox.style.display === 'none' ? 'block' : 'none';
        });
      }

      if (btnSaveAge) {
        btnSaveAge.addEventListener('click', () => {
          const name = document.getElementById('inputDocName').value.trim() || 'Bác sĩ';
          const gender = document.getElementById('selectDocGender').value || 'Nam';
          const d = parseInt(document.getElementById('inputDocDay').value, 10) || 15;
          const m = parseInt(document.getElementById('inputDocMonth').value, 10) || 8;
          const y = parseInt(document.getElementById('inputDocYear').value, 10) || 1990;
          const hr = parseInt(document.getElementById('inputDocHour').value, 10) || 8;
          const min = parseInt(document.getElementById('inputDocMin').value, 10) || 0;
          const h = document.getElementById('selectDocHanhMenh').value || 'Thổ';

          window.GoodDayCalculator.saveDoctorProfile({
            name,
            gender,
            birthDay: d,
            birthMonth: m,
            birthYear: y,
            birthHour: hr,
            birthMinute: min,
            hanhMenh: h
          });

          closeModal();
          updateDayScoreBadge(new Date());
          openDayScoreModal(); // reopen with new full profile score
        });
      }
    }

    function tick() {
      const now = new Date();
      const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
      const pad = n => String(n).padStart(2, '0');

      timeEl.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
      dateEl.textContent = `${DAYS[now.getDay()]}, ${now.getDate()} ${MONTHS[now.getMonth()]}`;

      if (greetEl) {
        const g = getGreeting(h);
        greetEl.innerHTML = `<span>${g.emoji}</span> ${escapeHtml(g.text)}`;
      }

      updateDayScoreBadge(now);
    }

    // Attach click listener for Day Score Badge
    const scoreBtn = document.getElementById('heroDayScoreBtn');
    if (scoreBtn) {
      scoreBtn.addEventListener('click', openDayScoreModal);
    }

    tick();
    setInterval(tick, 1000);
  }

  // ============================================================
  // 2. ANIMATED STAT COUNTER — numbers count up on load
  // ============================================================
  function initCounters() {
    const counters = document.querySelectorAll('.hero-stat-number[data-count]');
    if (!counters.length) return;

    const duration = 1400; // ms
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    counters.forEach(el => {
      const target = parseInt(el.getAttribute('data-count'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const start  = performance.now();

      function step(now) {
        const t = Math.min((now - start) / duration, 1);
        const val = Math.floor(easeOut(t) * target);
        el.textContent = val + (t === 1 ? suffix : '');
        if (t < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    });
  }

  // ============================================================
  // 3. SCROLL REVEAL — Intersection Observer
  // ============================================================
  function initScrollReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach(el => observer.observe(el));
  }

  // ============================================================
  // 4. SCROLL PROGRESS BAR
  // ============================================================
  function initScrollProgress() {
    const bar = document.getElementById('scrollProgressBar');
    if (!bar) return;

    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // ============================================================
  // 5. BACK-TO-TOP BUTTON
  // ============================================================
  function initBackToTop() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 320);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // 6. COMMAND PALETTE (Ctrl+K)
  // ============================================================
  // Re-use searchIndex from homepage-widgets.js (window scope)
  function initCommandPalette() {
    const overlay = document.getElementById('cmdPaletteOverlay');
    const input   = document.getElementById('cmdSearchInput');
    const results = document.getElementById('cmdResults');
    if (!overlay || !input || !results) return;

    // Quick action items (always shown when empty)
    const quickActions = [
      { icon: '🔍', title: 'Tra cứu mã ICD-10',       desc: 'Tìm mã bệnh quốc tế',           url: 'src/content/calculators/general/tracuu-ma-icd10.html' },
      { icon: '📈', title: 'Đọc ECG cơ bản',           desc: 'Phân tích sóng và chẩn đoán',    url: 'src/content/skills/can-lam-sang/doc-ecg-co-ban.html' },
      { icon: '🩸', title: 'Phân tích tế bào máu CBC', desc: 'Diễn giải kết quả huyết học',   url: 'src/content/skills/can-lam-sang/doc-tpttb-mau.html' },
      { icon: '🧪', title: 'Sinh hóa chức năng Thận',  desc: 'Ure, Creatinine, eGFR',          url: 'src/content/skills/can-lam-sang/doc-sh-than.html' },
      { icon: '💊', title: 'Kháng sinh kinh nghiệm',   desc: 'Lựa chọn kháng sinh ban đầu',    url: 'src/content/skills/treatment-management/luachon-khangsinh.html' },
    ];

    // Master index — try to borrow from homepage-widgets.js via window, or use built-in
    const masterIndex = window._cpSearchIndex || quickActions;

    let activeIdx = -1;
    let currentList = [];

    function open() {
      overlay.classList.add('active');
      input.focus();
      input.value = '';
      renderQuickActions();
    }

    function close() {
      overlay.classList.remove('active');
      input.blur();
    }

    function renderQuickActions() {
      results.innerHTML = `<div class="cmd-section-label">⚡ Truy cập nhanh</div>`;
      quickActions.forEach((item, i) => {
        results.appendChild(makeItem(item, i, 'quick'));
      });
      currentList = quickActions;
      activeIdx = -1;
    }

    function renderSearch(q) {
      const clean = removeAccents(q).toLowerCase();
      const filtered = masterIndex.filter(item => {
        const t = removeAccents(item.title).toLowerCase();
        const k = removeAccents(item.keywords || item.desc || '').toLowerCase();
        return t.includes(clean) || k.includes(clean);
      }).slice(0, 10);

      results.innerHTML = '';

      if (!filtered.length) {
        results.innerHTML = `<div class="cmd-section-label" style="padding:1.5rem 1rem;text-align:center;color:var(--color-text-muted);">
          Không tìm thấy kết quả cho "<strong>${escapeHtml(q)}</strong>"
        </div>`;
        currentList = [];
        activeIdx = -1;
        return;
      }

      results.innerHTML = `<div class="cmd-section-label">🔎 ${filtered.length} kết quả</div>`;
      filtered.forEach((item, i) => results.appendChild(makeItem(item, i, 'search')));
      currentList = filtered;
      activeIdx = -1;
    }

    function makeItem(item, idx, type) {
      const a = document.createElement('a');
      a.href = item.url;
      a.className = 'cmd-result-item';
      a.dataset.cmdIndex = idx;

      a.innerHTML = `
        <div class="cmd-result-icon">${escapeHtml(item.icon || '📄')}</div>
        <div class="cmd-result-text">
          <span class="cmd-result-title">${escapeHtml(item.title)}</span>
          <span class="cmd-result-desc">${escapeHtml(item.desc || item.category || '')}</span>
        </div>
        <span class="cmd-result-shortcut"><i class="fa-solid fa-arrow-right-to-bracket" style="font-size:0.75rem;opacity:0.4"></i></span>
      `;

      a.addEventListener('click', () => {
        try {
          let recent = JSON.parse(localStorage.getItem('cliniportal_recent') || '[]');
          recent = recent.filter(r => r.url !== item.url);
          recent.unshift({ title: item.title, url: item.url, category: item.category || '' });
          recent = recent.slice(0, 5);
          localStorage.setItem('cliniportal_recent', JSON.stringify(recent));
        } catch(e) {}
        close();
      });

      return a;
    }

    function moveFocus(dir) {
      const items = results.querySelectorAll('.cmd-result-item');
      if (!items.length) return;

      if (activeIdx !== -1) items[activeIdx].classList.remove('cmd-active');
      activeIdx = (activeIdx + dir + items.length) % items.length;
      items[activeIdx].classList.add('cmd-active');
      items[activeIdx].scrollIntoView({ block: 'nearest' });
    }

    // Event listeners
    input.addEventListener('input', () => {
      const q = input.value.trim();
      q ? renderSearch(q) : renderQuickActions();
    });

    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveFocus(1); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); moveFocus(-1); }
      if (e.key === 'Enter') {
        if (activeIdx !== -1) {
          const item = results.querySelectorAll('.cmd-result-item')[activeIdx];
          if (item) item.click();
        }
      }
      if (e.key === 'Escape') close();
    });

    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

    // Global shortcut
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        overlay.classList.contains('active') ? close() : open();
      }
      if (e.key === 'Escape' && overlay.classList.contains('active')) close();
    });

    // Trigger button in header
    const triggerBtn = document.getElementById('cmdPaletteTrigger');
    if (triggerBtn) triggerBtn.addEventListener('click', open);
  }

  // ============================================================
  // 7. RECENTLY VISITED TOOLS WIDGET
  // ============================================================
  function initRecentlyVisited() {
    const container = document.getElementById('recentlyVisitedList');
    if (!container) return;

    function render() {
      let recent = [];
      try {
        recent = JSON.parse(localStorage.getItem('cliniportal_recent') || '[]');
      } catch (e) { recent = []; }

      if (!recent.length) {
        container.innerHTML = `
          <div class="recent-empty">
            <i class="fa-regular fa-clock"></i>
            <span>Chưa có lịch sử truy cập.<br>Hãy mở một công cụ để bắt đầu.</span>
          </div>
        `;
        return;
      }

      container.innerHTML = '';
      recent.forEach(item => {
        const a = document.createElement('a');
        a.href = item.url;
        a.className = 'recent-item';
        a.innerHTML = `
          <div class="recent-item-icon"><i class="fa-solid fa-file-medical"></i></div>
          <div class="recent-item-info">
            <span class="recent-item-title">${escapeHtml(item.title)}</span>
            <span class="recent-item-cat">${escapeHtml(item.category || 'Công cụ')}</span>
          </div>
          <i class="fa-solid fa-chevron-right" style="font-size:0.7rem;color:var(--color-text-faint);opacity:0.5"></i>
        `;
        container.appendChild(a);
      });
    }

    render();
  }

  // ============================================================
  // 8. 3D TILT EFFECT on tool cards
  // ============================================================
  function initCardTilt() {
    const cards = document.querySelectorAll('.tool-card');
    if (!cards.length || window.matchMedia('(hover: none)').matches) return;

    const TILT_MAX = 6; // degrees
    const SCALE_UP = 1.025;

    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width  / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);

        const rotX = -dy * TILT_MAX;
        const rotY =  dx * TILT_MAX;

        card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${SCALE_UP})`;
        card.style.transition = 'transform 80ms linear, box-shadow var(--tr-slow)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform var(--tr), box-shadow var(--tr-slow), border-color var(--tr)';
      });
    });
  }

  // ============================================================
  // 9. ANNOUNCEMENT BANNER dismiss
  // ============================================================
  function initAnnouncementBanner() {
    const banner  = document.getElementById('announcementBanner');
    const closeBtn = document.getElementById('announcementClose');
    if (!banner || !closeBtn) return;

    // Check if already dismissed this session
    if (sessionStorage.getItem('cp_banner_dismissed')) {
      banner.style.display = 'none';
      return;
    }

    closeBtn.addEventListener('click', () => {
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(-8px)';
      banner.style.transition = 'opacity 0.25s, transform 0.25s';
      setTimeout(() => { banner.style.display = 'none'; }, 260);
      sessionStorage.setItem('cp_banner_dismissed', '1');
    });
  }

  // ============================================================
  // 10. QUICK ACCESS CARDS — Ripple click effect
  // ============================================================
  function initRipple() {
    const targets = document.querySelectorAll('.quick-access-card, .tool-card a, .tool-footer a');

    targets.forEach(el => {
      el.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = el.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top  - size / 2;

        Object.assign(ripple.style, {
          position: 'absolute',
          width: size + 'px',
          height: size + 'px',
          left: x + 'px',
          top:  y + 'px',
          background: 'rgba(var(--color-primary-rgb), 0.12)',
          borderRadius: '50%',
          transform: 'scale(0)',
          animation: 'ripple-expand 500ms ease-out forwards',
          pointerEvents: 'none',
          zIndex: 10,
        });

        el.style.position = 'relative';
        el.style.overflow = 'hidden';
        el.appendChild(ripple);
        setTimeout(() => ripple.remove(), 510);
      });
    });

    // Inject keyframe
    if (!document.getElementById('ripple-keyframe')) {
      const style = document.createElement('style');
      style.id = 'ripple-keyframe';
      style.textContent = `
        @keyframes ripple-expand {
          to { transform: scale(2.5); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ============================================================
  // 11. ADD .reveal CLASS to all major homepage sections
  // ============================================================
  function tagRevealElements() {
    const selectors = [
      '.emergency-section',
      '.favorites-section',
      '.quick-access-section',
      '.main-content-grid',
      '.updates-feed-section',
      '.announcement-banner',
      '.widget-card',
    ];

    selectors.forEach((sel, si) => {
      document.querySelectorAll(sel).forEach((el, idx) => {
        el.classList.add('reveal');
        if (idx > 0) el.classList.add(`reveal-delay-${Math.min(idx, 4)}`);
      });
    });
  }

  // ============================================================
  // INIT ALL
  // ============================================================
  document.addEventListener('DOMContentLoaded', () => {
    tagRevealElements();
    initHeroClock();
    initCounters();
    initScrollReveal();
    initScrollProgress();
    initBackToTop();
    initCommandPalette();
    initRecentlyVisited();
    initCardTilt();
    initAnnouncementBanner();
    initRipple();
  });

})();
