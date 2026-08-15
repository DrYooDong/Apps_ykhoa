/**
 * CliniPortal 2.0 — Guidelines Command Palette & Quick Search (TypeScript)
 * Path: src/content/ebm/guidelines/js/guideline-cmd-palette.ts
 */

import { Study } from '../guidelines-types';

interface SystemCommandItem {
  id: string;
  type: 'system';
  icon: string;
  title: string;
  action: () => void;
}

type CmdPaletteResultItem = SystemCommandItem | Study;

import '../guidelines-types';

let selectedCmdIndex = 0;
let cmdResultsList: CmdPaletteResultItem[] = [];

export function initCommandPalette(): void {
  if (typeof document !== 'undefined') {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        toggleCommandPalette();
      }
    });
  }
}

export function toggleCommandPalette(): void {
  const modal = document.getElementById('command-palette-modal');
  if (!modal) return;
  if (modal.classList.contains('active')) {
    closeCommandPalette();
  } else {
    openCommandPalette();
  }
}

export function openCommandPalette(): void {
  const modal = document.getElementById('command-palette-modal');
  const input = document.getElementById('cmd-palette-input') as HTMLInputElement | null;
  if (!modal || !input) return;

  modal.classList.add('active');
  input.value = '';
  selectedCmdIndex = 0;
  renderCmdResults('');

  setTimeout(() => {
    input.focus();
  }, 50);
}

export function closeCommandPalette(): void {
  const modal = document.getElementById('command-palette-modal');
  if (modal) modal.classList.remove('active');
}

export function handleCmdInput(e: any): void {
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

function renderCmdResults(query: string): void {
  const container = document.getElementById('cmd-palette-results');
  if (!container) return;

  const trimmed = query.trim().toLowerCase();
  const studies = window.studies || [];

  const systemCommands: SystemCommandItem[] = [
    { id: 'cmd_case', type: 'system', icon: '🎯', title: 'Mở Mode Trình Bệnh & CDSS Matcher', action: () => window.openCaseModal && window.openCaseModal() },
    { id: 'cmd_multicompare', type: 'system', icon: '⚖️', title: 'Mở Ma Trận Đối Sánh Multi-Matrix (Compare Mode)', action: () => window.openMultiCompareModal && window.openMultiCompareModal() },
    { id: 'cmd_compare', type: 'system', icon: '🔄', title: 'Chuyển sang Tab So Sánh Guidelines', action: () => window.switchTab && window.switchTab('compare') },
    { id: 'cmd_analytics', type: 'system', icon: '📊', title: 'Xem Thống Kê & Evidence Map', action: () => window.switchTab && window.switchTab('analytics') },
    { id: 'cmd_icd', type: 'system', icon: '🔍', title: 'Tra Cứu Mã Bệnh ICD-10', action: () => window.openIcdFilterModal && window.openIcdFilterModal() },
    { id: 'cmd_saved', type: 'system', icon: '⭐', title: 'Xem Các Tài Liệu Đã Lưu', action: () => window.switchTab && window.switchTab('saved') },
    { id: 'cmd_dark', type: 'system', icon: '🌙', title: 'Chuyển đổi Chế Độ Giao Diện (Dark/Light)', action: () => toggleDarkModePreference() }
  ];

  let matchedCmds: SystemCommandItem[] = [];
  if (!trimmed) {
    matchedCmds = systemCommands;
  } else {
    matchedCmds = systemCommands.filter(c => c.title.toLowerCase().includes(trimmed));
  }

  let matchedStudies: Study[] = [];
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
        partsMatch = s.parts.some((p: any) => (p.title + ' ' + (p.content || '')).toLowerCase().includes(trimmed));
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
    html += `<div class="cmd-section-title">⚡ Lệnh Hệ Thống</div>`;
    matchedCmds.forEach((cmd, idx) => {
      const isSelected = idx === selectedCmdIndex;
      html += `
        <div class="cmd-item ${isSelected ? 'active' : ''}" data-index="${idx}" onclick="executeCmdIndex(${idx})">
          <span class="cmd-item-icon">${cmd.icon}</span>
          <div class="cmd-item-info">
            <div class="cmd-item-title">${escapeHtml(cmd.title)}</div>
          </div>
          <span class="cmd-item-badge">Lệnh</span>
        </div>
      `;
    });
  }

  if (matchedStudies.length > 0) {
    html += `<div class="cmd-section-title">📚 Nghiên Cứu & Hướng Dẫn</div>`;
    matchedStudies.forEach((study, idx) => {
      const realIdx = matchedCmds.length + idx;
      const isSelected = realIdx === selectedCmdIndex;
      html += `
        <div class="cmd-item ${isSelected ? 'active' : ''}" data-index="${realIdx}" onclick="executeCmdIndex(${realIdx})">
          <span class="cmd-item-icon">📄</span>
          <div class="cmd-item-info">
            <div class="cmd-item-title">${escapeHtml(study.title)}</div>
            <div class="cmd-item-sub">
              ${study.drug ? `💊 ${escapeHtml(study.drug)} • ` : ''}
              🏛️ ${escapeHtml(study.organization || 'N/A')} (${study.year || ''})
            </div>
          </div>
          ${study.file ? `<span class="cmd-item-badge badge-summary">Tóm tắt</span>` : ''}
        </div>
      `;
    });
  }

  container.innerHTML = html;
}

function updateCmdActiveState(): void {
  const items = document.querySelectorAll('.cmd-item');
  items.forEach((el, idx) => {
    el.classList.toggle('active', idx === selectedCmdIndex);
    if (idx === selectedCmdIndex) {
      el.scrollIntoView({ block: 'nearest' });
    }
  });
}

export function executeCmdIndex(idx: number): void {
  if (cmdResultsList[idx]) {
    executeCmdItem(cmdResultsList[idx]);
  }
}

function executeCmdItem(item: CmdPaletteResultItem): void {
  closeCommandPalette();
  if ('type' in item && item.type === 'system') {
    item.action();
  } else {
    const study = item as Study;
    if (study.file) {
      const url = window.resolveStudyFile ? window.resolveStudyFile(study.file) : study.file;
      window.location.href = url;
    } else {
      if (window.switchTab) window.switchTab('list');
      if (window.setFilter) window.setFilter('search', study.title);
    }
  }
}

function toggleDarkModePreference(): void {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  try {
    localStorage.setItem('theme', newTheme);
  } catch(e) {}
}

function escapeHtml(str?: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

if (typeof window !== 'undefined') {
  window.initCommandPalette = initCommandPalette;
  window.toggleCommandPalette = toggleCommandPalette;
  window.openCommandPalette = openCommandPalette;
  window.closeCommandPalette = closeCommandPalette;
  window.handleCmdInput = handleCmdInput;
  window.executeCmdIndex = executeCmdIndex;
}
