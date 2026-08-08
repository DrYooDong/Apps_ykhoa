/**
 * guideline-tools.js
 * Quản lý tính năng Trình Bệnh Mode & Command Palette (Ctrl+K)
 * Pure HTML5 / Vanilla CSS3 / ES6+ JavaScript
 */

(function () {
  'use strict';

  let selectedCmdIndex = 0;
  let cmdResultsList = [];

  // ════════════════════════════════════════════════════════════════
  // 1. COMMAND PALETTE (CTRL+K)
  // ════════════════════════════════════════════════════════════════

  function initCommandPalette() {
    // Global keyboard shortcut: Ctrl+K / Cmd+K
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        toggleCommandPalette();
      }
    });
  }

  function toggleCommandPalette() {
    const modal = document.getElementById('command-palette-modal');
    if (!modal) return;
    if (modal.classList.contains('active')) {
      closeCommandPalette();
    } else {
      openCommandPalette();
    }
  }

  function openCommandPalette() {
    const modal = document.getElementById('command-palette-modal');
    const input = document.getElementById('cmd-palette-input');
    if (!modal || !input) return;

    modal.classList.add('active');
    input.value = '';
    selectedCmdIndex = 0;
    renderCmdResults('');

    setTimeout(() => {
      input.focus();
    }, 50);
  }

  function closeCommandPalette() {
    const modal = document.getElementById('command-palette-modal');
    if (modal) modal.classList.remove('active');
  }

  function handleCmdInput(e) {
    const query = e.target.value;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdResultsList.length > 0) {
        selectedCmdIndex = (selectedCmdIndex + 1) % cmdResultsList.length;
        updateCmdActiveState();
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdResultsList.length > 0) {
        selectedCmdIndex = (selectedCmdIndex - 1 + cmdResultsList.length) % cmdResultsList.length;
        updateCmdActiveState();
      }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (cmdResultsList.length > 0 && cmdResultsList[selectedCmdIndex]) {
        executeCmdItem(cmdResultsList[selectedCmdIndex]);
      }
      return;
    }

    if (e.key === 'Escape') {
      closeCommandPalette();
      return;
    }

    selectedCmdIndex = 0;
    renderCmdResults(query);
  }

  function renderCmdResults(query) {
    const container = document.getElementById('cmd-palette-results');
    if (!container) return;

    const trimmed = query.trim().toLowerCase();
    const studies = window.studies || [];

    // Quick Command Shortcuts
    const systemCommands = [
      { id: 'cmd_case', type: 'system', icon: '🎯', title: 'Mở Mode Trình Bệnh (Case Suggester)', action: () => openCaseModal() },
      { id: 'cmd_compare', type: 'system', icon: '🔄', title: 'Chuyển sang Tab So Sánh Guidelines', action: () => window.switchTab && window.switchTab('compare') },
      { id: 'cmd_analytics', type: 'system', icon: '📊', title: 'Xem Thống Kê & Evidence Map', action: () => window.switchTab && window.switchTab('analytics') },
      { id: 'cmd_icd', type: 'system', icon: '🔍', title: 'Tra Cứu Mã Bệnh ICD-10', action: () => window.openIcdFilterModal && window.openIcdFilterModal() },
      { id: 'cmd_saved', type: 'system', icon: '⭐', title: 'Xem Các Tài Liệu Đã Lưu', action: () => window.switchTab && window.switchTab('saved') },
      { id: 'cmd_dark', type: 'system', icon: '🌙', title: 'Chuyển đổi Chế Độ Giao Diện (Dark/Light)', action: () => toggleDarkModePreference() }
    ];

    let matchedCmds = [];
    if (!trimmed) {
      matchedCmds = systemCommands;
    } else {
      matchedCmds = systemCommands.filter(c => c.title.toLowerCase().includes(trimmed));
    }

    // Match Studies
    let matchedStudies = [];
    if (trimmed) {
      matchedStudies = studies.filter(s => {
        const titleMatch = s.title && s.title.toLowerCase().includes(trimmed);
        const drugMatch = s.drug && s.drug.toLowerCase().includes(trimmed);
        const icdMatch = s.icd10 && (Array.isArray(s.icd10) ? s.icd10.some(code => code.toLowerCase().includes(trimmed)) : String(s.icd10).toLowerCase().includes(trimmed));
        const specMatch = s.specialty && window.SPECIALTIES && window.SPECIALTIES[s.specialty] && window.SPECIALTIES[s.specialty].name.toLowerCase().includes(trimmed);
        return titleMatch || drugMatch || icdMatch || specMatch;
      }).slice(0, 8);
    }

    cmdResultsList = [...matchedCmds, ...matchedStudies];

    if (cmdResultsList.length === 0) {
      container.innerHTML = `
        <div class="cmd-empty">
          <div class="cmd-empty-icon">🔍</div>
          <p>Không tìm thấy tài liệu hoặc câu lệnh phù hợp với "${escapeHtml(query)}"</p>
        </div>
      `;
      return;
    }

    let html = '';

    if (matchedCmds.length > 0) {
      html += `<div class="cmd-section-label">⚡ Lệnh Hệ Thống</div>`;
      matchedCmds.forEach((cmd, idx) => {
        const isActive = idx === selectedCmdIndex;
        html += `
          <div class="cmd-item ${isActive ? 'active' : ''}" data-index="${idx}">
            <span class="cmd-icon">${cmd.icon}</span>
            <div class="cmd-item-info">
              <div class="cmd-item-title">${escapeHtml(cmd.title)}</div>
              <div class="cmd-item-sub">Lệnh nhanh</div>
            </div>
            <span class="cmd-enter-badge">↵ Select</span>
          </div>
        `;
      });
    }

    if (matchedStudies.length > 0) {
      const offset = matchedCmds.length;
      html += `<div class="cmd-section-label">📚 Hướng Dẫn & Nghiên Cứu</div>`;
      matchedStudies.forEach((study, idx) => {
        const globalIdx = offset + idx;
        const isActive = globalIdx === selectedCmdIndex;
        const specObj = window.SPECIALTIES && window.SPECIALTIES[study.specialty] ? window.SPECIALTIES[study.specialty] : { name: study.specialty || '' };

        html += `
          <div class="cmd-item ${isActive ? 'active' : ''}" data-index="${globalIdx}">
            <span class="cmd-icon">📄</span>
            <div class="cmd-item-info">
              <div class="cmd-item-title">${escapeHtml(study.title)}</div>
              <div class="cmd-item-sub">
                <span class="cmd-badge-tag">${escapeHtml(specObj.name)}</span>
                ${study.drug ? `💊 ${escapeHtml(study.drug)} • ` : ''}
                ${study.year ? ` NĂM ${study.year}` : ''}
              </div>
            </div>
            <span class="cmd-enter-badge">↵ Nhảy tới</span>
          </div>
        `;
      });
    }

    container.innerHTML = html;

    // Attach click events
    container.querySelectorAll('.cmd-item').forEach(el => {
      el.addEventListener('click', () => {
        const index = parseInt(el.getAttribute('data-index'), 10);
        if (cmdResultsList[index]) {
          executeCmdItem(cmdResultsList[index]);
        }
      });
    });
  }

  function updateCmdActiveState() {
    const container = document.getElementById('cmd-palette-results');
    if (!container) return;
    container.querySelectorAll('.cmd-item').forEach(el => {
      const idx = parseInt(el.getAttribute('data-index'), 10);
      el.classList.toggle('active', idx === selectedCmdIndex);
      if (idx === selectedCmdIndex) {
        el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    });
  }

  function executeCmdItem(item) {
    closeCommandPalette();
    if (!item) return;

    if (item.type === 'system' && typeof item.action === 'function') {
      item.action();
    } else if (item.id && window.filterByStudyId) {
      window.filterByStudyId(item.id);
    }
  }

  function toggleDarkModePreference() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('cliniportal_theme', next);
  }


  // ════════════════════════════════════════════════════════════════
  // 2. 🎯 MODE TRÌNH BỆNH (CASE-BASED GUIDELINE SUGGESTER)
  // ════════════════════════════════════════════════════════════════

  function openCaseModal() {
    const modal = document.getElementById('clinical-case-modal');
    if (!modal) return;
    modal.classList.add('active');
    
    // Clear previous results container
    const resultsContainer = document.getElementById('case-results-container');
    if (resultsContainer) resultsContainer.innerHTML = '';
  }

  function closeCaseModal() {
    const modal = document.getElementById('clinical-case-modal');
    if (modal) modal.classList.remove('active');
  }

  function handleCaseAnalysis(event) {
    if (event) event.preventDefault();

    const icdVal = document.getElementById('case-icd-input')?.value.trim().toUpperCase() || '';
    const problemVal = document.getElementById('case-problem-input')?.value.trim() || '';

    const prefAsia = document.getElementById('case-pref-asia')?.checked || false;
    const prefMoh = document.getElementById('case-pref-moh')?.checked || false;
    const prefPc = document.getElementById('case-pref-pc')?.checked || false;

    const container = document.getElementById('case-results-container');
    if (!container) return;

    if (!icdVal && !problemVal) {
      container.innerHTML = `
        <div style="background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 0.8rem; border-radius: 8px; font-size: 0.8rem; text-align: center;">
          ⚠️ Vui lòng nhập Mã ICD-10 hoặc mô tả vấn đề lâm sàng của bệnh nhân để hệ thống phân tích.
        </div>
      `;
      return;
    }

    const studies = window.studies || [];
    const scoredList = studies.map(study => {
      let score = 0;
      let reasons = [];

      // 1. ICD-10 Match (+30 pts)
      if (icdVal && study.icd10) {
        const studyIcds = Array.isArray(study.icd10) ? study.icd10 : String(study.icd10).split(',').map(s => s.trim());
        const hasMatch = studyIcds.some(code => code.toUpperCase().startsWith(icdVal) || icdVal.startsWith(code.toUpperCase()));
        if (hasMatch) {
          score += 30;
          reasons.push(`Trùng khớp mã ICD-10: <strong>${icdVal}</strong>`);
        }
      }

      // 2. Keyword matching in title, drug, summary, population (+25 pts max)
      if (problemVal) {
        const keywords = problemVal.toLowerCase().split(/[\s,;]+/).filter(k => k.length > 2);
        let kwMatches = 0;

        const fullContent = (study.title + ' ' + (study.drug || '') + ' ' + (study.summary || '') + ' ' + (study.population || '')).toLowerCase();

        keywords.forEach(kw => {
          if (fullContent.includes(kw)) {
            kwMatches++;
          }
        });

        if (kwMatches > 0) {
          const matchPts = Math.min(kwMatches * 10, 25);
          score += matchPts;
          reasons.push(`Khớp từ khóa lâm sàng (${kwMatches} từ trùng khớp)`);
        }
      }

      // 3. Clinical Impact (+15 pts)
      if (study.impact === 'practice-changing') {
        score += 15;
        reasons.push('Khuyến cáo có tính Đột phá / Thay đổi thực hành (*Practice-Changing*)');
      }

      // 4. Year Recency (+10 pts)
      if (study.year && study.year >= 2024) {
        score += 10;
        reasons.push(`Cập nhật mới nhất năm ${study.year}`);
      }

      // 5. User Preferences (+10 pts)
      if (prefAsia && study.asianData) {
        score += 10;
        reasons.push('Có dữ liệu phân tích trên quần thể Châu Á');
      }

      if (prefMoh && (study.sourceType === 'vn-moh' || study.sourceType === 'national-guideline')) {
        score += 10;
        reasons.push('Được ban hành chính thức bởi Bộ Y Tế Việt Nam');
      }

      if (prefPc && study.impact === 'practice-changing') {
        score += 5;
      }

      // Calculate percentage score normalized to 100%
      const matchPct = Math.min(Math.round((score / 80) * 100), 99);

      return { study, score, matchPct, reasons };
    });

    // Sort descending by score and pick top 3
    const top3 = scoredList.sort((a, b) => b.score - a.score).filter(item => item.score > 0).slice(0, 3);

    if (top3.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 1.5rem 0;">
          <div class="empty-state-icon">🧩</div>
          <p>Chưa tìm thấy hướng dẫn khớp tuyệt đối với từ khóa đã nhập. Hãy thử thay đổi mã ICD hoặc mở rộng mô tả lâm sàng.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="case-results-wrapper">
        <div style="font-size: 0.82rem; font-weight: 800; color: var(--text); margin-bottom: 0.75rem; display: flex; align-items: center; justify-content: space-between;">
          <span>🎯 TOP 3 GUIDELINES PHÙ HỢP NHẤT VỚI BỆNH ÁN</span>
          <span style="font-size: 0.72rem; color: var(--accent); font-weight: 600;">Phân tích hoàn tất</span>
        </div>

        <div class="case-cards-list">
          ${top3.map((item, idx) => `
            <div class="case-card">
              <div class="case-card-rank">#${idx + 1}</div>
              
              <div class="case-card-content">
                <div class="case-card-header">
                  <span class="case-card-title">${escapeHtml(item.study.title)}</span>
                  <div class="case-match-badge" style="background: ${getScoreColor(item.matchPct).bg}; color: ${getScoreColor(item.matchPct).text}; border: 1px solid ${getScoreColor(item.matchPct).border};">
                    ${item.matchPct}% Tương thích
                  </div>
                </div>

                <div class="case-card-sub">
                  💊 <strong>Hoạt chất / Can thiệp:</strong> ${escapeHtml(item.study.drug || item.study.intervention || 'Khuyến cáo')}
                  • 🏛️ ${escapeHtml(item.study.organization || 'N/A')} (${item.study.year || ''})
                </div>

                <div class="case-reasoning-box">
                  <div class="reasoning-title">💡 Lý do đề xuất lâm sàng:</div>
                  <ul class="reasoning-list">
                    ${item.reasons.map(r => `<li>${r}</li>`).join('')}
                  </ul>
                </div>

                <div class="case-card-actions">
                  ${item.study.file ? `<a href="${item.study.file}" target="_blank" class="btn btn-small btn-primary" style="font-size:0.75rem;">📝 Đọc Tóm Tắt Chi Tiết</a>` : ''}
                  <button class="btn btn-small" onclick="window.filterByStudyId && window.filterByStudyId('${item.study.id}'); window.GuidelineTools.closeCaseModal();">📌 Nhảy tới bài này</button>
                  <button class="btn btn-small" onclick="window.addToCompare && window.addToCompare('${item.study.id}')">🔄 Thêm vào So sánh</button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function getScoreColor(pct) {
    if (pct >= 85) return { bg: '#ecfdf5', text: '#047857', border: '#a7f3d0' };
    if (pct >= 65) return { bg: '#eff6ff', text: '#1d4ed8', border: '#bfdbfe' };
    return { bg: '#fffbe6', text: '#d97706', border: '#fef3c7' };
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Initialize command listener on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCommandPalette);
  } else {
    initCommandPalette();
  }

  // Export module API to window
  window.GuidelineTools = {
    toggleCommandPalette,
    openCommandPalette,
    closeCommandPalette,
    handleCmdInput,
    openCaseModal,
    closeCaseModal,
    handleCaseAnalysis
  };

  window.openCommandPalette = openCommandPalette;
  window.openCaseModal = openCaseModal;

})();
