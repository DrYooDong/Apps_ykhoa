/**
 * guideline-cmd-palette.js
 * Quản lý Command Palette (Ctrl+K), Tra cứu nhanh Snippet Guidelines & ICD-10 Registry
 * Pure HTML5 / Vanilla CSS3 / ES6+ JavaScript
 */

(function () {
  'use strict';

  let selectedCmdIndex = 0;
  let cmdResultsList = [];

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
      { id: 'cmd_case', type: 'system', icon: '🎯', title: 'Mở Mode Trình Bệnh & CDSS Matcher', action: () => window.openCaseModal && window.openCaseModal() },
      { id: 'cmd_multicompare', type: 'system', icon: '⚖️', title: 'Mở Ma Trận Đối Sánh Multi-Matrix (Compare Mode)', action: () => window.openMultiCompareModal && window.openMultiCompareModal() },
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

    // Match Studies & Deep Snippet Search in parts / subgroups
    let matchedStudies = [];
    if (trimmed) {
      matchedStudies = studies.filter(s => {
        const titleMatch = s.title && s.title.toLowerCase().includes(trimmed);
        const drugMatch = s.drug && s.drug.toLowerCase().includes(trimmed);
        const summaryMatch = s.summary && s.summary.toLowerCase().includes(trimmed);
        const keyResultsMatch = s.keyResults && String(s.keyResults).toLowerCase().includes(trimmed);
        const icdMatch = s.icd10 && (Array.isArray(s.icd10) ? s.icd10.some(code => code.toLowerCase().includes(trimmed)) : String(s.icd10).toLowerCase().includes(trimmed));
        const specMatch = s.specialty && window.SPECIALTIES && window.SPECIALTIES[s.specialty] && window.SPECIALTIES[s.specialty].name.toLowerCase().includes(trimmed);
        
        let partsMatch = false;
        if (s.parts && Array.isArray(s.parts)) {
          partsMatch = s.parts.some(p => (p.title + ' ' + (p.content || '')).toLowerCase().includes(trimmed));
        }

        return titleMatch || drugMatch || summaryMatch || keyResultsMatch || icdMatch || specMatch || partsMatch;
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
          <div class="cmd-item ${isActive ? 'active' : ''}" data-index="${idx}" onclick="window.executeCmdIndex(${idx})">
            <span class="cmd-icon">${cmd.icon}</span>
            <span class="cmd-title">${escapeHtml(cmd.title)}</span>
          </div>
        `;
      });
    }

    if (matchedStudies.length > 0) {
      html += `<div class="cmd-section-label">📚 Trích Xuất Snippet Guideline</div>`;
      const offset = matchedCmds.length;
      matchedStudies.forEach((study, sIdx) => {
        const idx = offset + sIdx;
        const isActive = idx === selectedCmdIndex;
        html += `
          <div class="cmd-item ${isActive ? 'active' : ''}" data-index="${idx}" onclick="window.executeCmdIndex(${idx})">
            <span class="cmd-icon">📖</span>
            <div style="flex:1; overflow:hidden;">
              <div class="cmd-title" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${escapeHtml(study.title)}</div>
              <div style="font-size:0.72rem; color:var(--text-muted);">💊 ${escapeHtml(study.drug || 'N/A')} • 🏛️ ${escapeHtml(study.organization || 'N/A')} (${study.year || ''})</div>
            </div>
          </div>
        `;
      });
    }

    container.innerHTML = html;
  }

  function executeCmdIndex(idx) {
    if (cmdResultsList && cmdResultsList[idx]) {
      executeCmdItem(cmdResultsList[idx]);
    }
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

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCommandPalette);
  } else {
    initCommandPalette();
  }

  window.initCommandPalette = initCommandPalette;
  window.toggleCommandPalette = toggleCommandPalette;
  window.openCommandPalette = openCommandPalette;
  window.closeCommandPalette = closeCommandPalette;
  window.handleCmdInput = handleCmdInput;
  window.executeCmdIndex = executeCmdIndex;

})();
