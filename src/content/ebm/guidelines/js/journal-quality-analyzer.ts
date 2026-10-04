/**
 * CliniPortal 2.0 — Journal Quality Analyzer Controller (TypeScript)
 * Path: js/journal-quality-analyzer.ts
 */

import './guidelines-types';

let searchTimeout: any = null;
let currentComparedJournals: string[] = ['NEJM', 'Lancet', 'JAMA'];

export function initSearchInput(): void {
  const input = document.getElementById('analyzer-search-input') as HTMLInputElement | null;
  if (!input) return;

  input.addEventListener('input', (e: any) => {
    const val = e.target.value.trim();
    if (searchTimeout) clearTimeout(searchTimeout);

    if (val.length < 2) {
      const sec = document.getElementById('search-result-section');
      if (sec) sec.style.display = 'none';
      return;
    }

    searchTimeout = setTimeout(() => {
      performJournalSearch(val);
    }, 300);
  });
}

function stripVietnameseDiacritics(str?: string): string {
  if (!str) return '';
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, (m) => (m === 'đ' ? 'd' : 'D')).toLowerCase();
}

export async function performJournalSearch(query: string): Promise<void> {
  const sec = document.getElementById('search-result-section');
  const container = document.getElementById('search-results-container');
  if (!container || !sec) return;

  sec.style.display = 'block';
  container.innerHTML = `
    <div style="padding:1.5rem; text-align:center; color:var(--text-muted);">
      <i class="fa-solid fa-spinner fa-spin" style="font-size:1.5rem; margin-bottom:0.5rem; color:var(--accent);"></i>
      <p style="margin:0;">Đang tra cứu dữ liệu tạp chí &amp; tính toán Trust Score...</p>
    </div>
  `;

  const localMatches: any[] = [];
  if (window.JOURNAL_METRICS_DATABASE) {
    const qLower = query.toLowerCase();
    const qNorm = stripVietnameseDiacritics(query);
    Object.keys(window.JOURNAL_METRICS_DATABASE).forEach(k => {
      const item = window.JOURNAL_METRICS_DATABASE[k];
      const kNorm = stripVietnameseDiacritics(k);
      const nameNorm = stripVietnameseDiacritics(item.name);
      const aliasMatch = item.aliases && item.aliases.some((a: string) => {
        return a.toLowerCase().includes(qLower) || stripVietnameseDiacritics(a).includes(qNorm);
      });

      if (
        k.toLowerCase().includes(qLower) ||
        kNorm.includes(qNorm) ||
        item.name.toLowerCase().includes(qLower) ||
        nameNorm.includes(qNorm) ||
        aliasMatch
      ) {
        if (!localMatches.some(m => m.name === item.name)) {
          localMatches.push({ ...item, source: 'CSDL Y Văn' });
        }
      }
    });
  }

  let oaResults: any[] = [];
  if (window.searchOpenAlexJournals) {
    try {
      oaResults = await window.searchOpenAlexJournals(query);
    } catch (e) {
      console.warn('OpenAlex search notice:', e);
    }
  }

  const combined = [...localMatches];
  oaResults.forEach(oa => {
    if (!combined.some(c => c.name.toLowerCase() === oa.name.toLowerCase() || (c.issn && oa.issn && c.issn === oa.issn))) {
      combined.push(oa);
    }
  });

  if (combined.length === 0) {
    container.innerHTML = `
      <div style="padding:2rem; text-align:center; color:var(--text-muted); background:var(--surface-2); border-radius:12px;">
        <i class="fa-solid fa-magnifying-glass" style="font-size:2rem; margin-bottom:0.75rem; color:#94a3b8;"></i>
        <h4 style="margin-bottom:0.35rem; color:var(--text);">Không tìm thấy tạp chí: "${escapeHtml(query)}"</h4>
        <p style="font-size:0.85rem; margin:0;">Hãy thử tên viết tắt phổ biến (vd: NEJM, Lancet, JAMA, JACC, CHEST, ERJ, CID) hoặc tên nhà xuất bản.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:1rem;">
      ${combined.map(item => renderFullJournalCard(item)).join('')}
    </div>
  `;
}

function renderFullJournalCard(m: any): string {
  const profile = window.getJournalQualityProfile ? window.getJournalQualityProfile(m.name || m.journal, m) : null;
  const ts = profile ? profile.trustScore : { score: 75, grade: 'Đáng tin cậy', color: '#0284c7' };
  const pAudit = profile ? profile.predatoryAudit : { isPredatory: false, flags: [], summary: '' };

  const qClass = m.quartile === 'Q1' ? 'jq-tag-q1' : m.quartile === 'Q2' ? 'jq-tag-q2' : m.quartile === 'Q3' ? 'jq-tag-q3' : m.quartile === 'Q4' ? 'jq-tag-q4' : 'jq-tag-moh';

  let predatoryAlertHtml = '';
  if (pAudit && pAudit.flags && pAudit.flags.length > 0) {
    predatoryAlertHtml = `
      <div class="predatory-alert-banner" style="margin-top:1rem; padding:0.85rem 1rem; border-radius:10px; background:#fef2f2; border:1px solid #f87171;">
        <div class="predatory-title-row" style="display:flex; align-items:center; gap:8px; font-weight:800; color:#b91c1c; font-size:0.9rem;">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>${pAudit.summary}</span>
        </div>
        <div class="predatory-flag-list" style="margin-top:0.4rem; font-size:0.82rem; color:#7f1d1d; line-height:1.5;">
          ${pAudit.flags.map((f: any) => `<div>• <strong>${escapeHtml(f.title)}</strong>: ${escapeHtml(f.detail)}</div>`).join('')}
        </div>
      </div>
    `;
  }

  const isAlreadyComparing = currentComparedJournals.includes(m.name || m.journal);

  return `
    <div class="jq-card" style="border:1px solid var(--border-light); border-radius:14px; padding:1.5rem; background:var(--surface);">
      <div class="jq-card-header" style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1rem;">
        <div style="flex:1; min-width:260px;">
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.25rem;">
            <span class="jq-badge ${qClass}" style="font-weight:800; font-size:0.75rem; padding:0.2rem 0.6rem; border-radius:6px;">${m.quartile || 'Q1'}</span>
            <span style="font-size:0.78rem; color:var(--text-muted); font-weight:600;">${m.category || 'General Medicine'}</span>
          </div>
          <h3 class="jq-card-title" style="font-size:1.15rem; font-weight:800; color:var(--text); margin:0 0 0.4rem 0;">${escapeHtml(m.name || m.journal)}</h3>
          <div class="jq-card-subtitle" style="display:flex; gap:12px; font-size:0.8rem; color:var(--text-muted); flex-wrap:wrap;">
            <span><i class="fa-solid fa-building"></i> ${escapeHtml(m.publisher || 'N/A')}</span>
            ${m.issn ? `<span><i class="fa-solid fa-barcode"></i> ISSN: ${m.issn}</span>` : ''}
            <span style="background:var(--surface-2); padding:0.1rem 0.5rem; border-radius:4px; font-weight:600;"><i class="fa-solid fa-database"></i> ${m.source || 'CSDL Y Khoa'}</span>
          </div>
        </div>

        <div style="text-align:right; display:flex; flex-direction:column; align-items:flex-end;">
          <div style="font-size:0.72rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.04em;">Trust Score</div>
          <div style="font-size:1.75rem; font-weight:900; color:${ts.color}; line-height:1.1; font-family:'Space Grotesk',sans-serif;">${ts.score}<span style="font-size:0.9rem; font-weight:600; color:var(--text-muted);">/100</span></div>
          <span style="font-size:0.75rem; font-weight:700; color:${ts.color}; margin-top:2px;">${ts.grade}</span>
        </div>
      </div>

      <div class="trust-score-meter" style="margin-bottom:1.25rem;">
        <div style="height:6px; background:var(--surface-2,#e2e8f0); border-radius:99px; overflow:hidden;">
          <div style="width: ${ts.score}%; height:100%; background:${ts.color}; border-radius:99px; transition:width 0.4s ease;"></div>
        </div>
      </div>

      <div class="jq-metrics-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:0.75rem; background:var(--surface-2,#f8fafc); padding:0.85rem; border-radius:10px; text-align:center;">
        <div class="jq-metric-item">
          <div class="jq-metric-val" style="font-weight:800; font-size:1.1rem; color:var(--accent); font-family:'Space Grotesk',sans-serif;">${m.if ?? '—'}</div>
          <div class="jq-metric-lbl" style="font-size:0.72rem; color:var(--text-muted); font-weight:600;">Impact Factor</div>
        </div>
        <div class="jq-metric-item">
          <div class="jq-metric-val" style="font-weight:800; font-size:1.1rem; color:var(--text); font-family:'Space Grotesk',sans-serif;">${m.sjr ?? '—'}</div>
          <div class="jq-metric-lbl" style="font-size:0.72rem; color:var(--text-muted); font-weight:600;">SJR Index</div>
        </div>
        <div class="jq-metric-item">
          <div class="jq-metric-val" style="font-weight:800; font-size:1.1rem; color:var(--text); font-family:'Space Grotesk',sans-serif;">${m.snip ?? '—'}</div>
          <div class="jq-metric-lbl" style="font-size:0.72rem; color:var(--text-muted); font-weight:600;">SNIP Index</div>
        </div>
        <div class="jq-metric-item">
          <div class="jq-metric-val" style="font-weight:800; font-size:1.1rem; color:var(--text); font-family:'Space Grotesk',sans-serif;">${m.hIndex ? Number(m.hIndex).toLocaleString() : '—'}</div>
          <div class="jq-metric-lbl" style="font-size:0.72rem; color:var(--text-muted); font-weight:600;">H-Index</div>
        </div>
        <div class="jq-metric-item" style="display:flex; align-items:center; justify-content:center;">
          <button class="btn ${isAlreadyComparing ? 'btn-outline' : 'btn-primary'}" onclick="toggleCompareJournal('${escapeHtml(m.journal || m.name)}')" style="padding:0.35rem 0.75rem; font-size:0.75rem; font-weight:700; border-radius:6px; cursor:pointer;">
            ${isAlreadyComparing ? '<i class=\"fa-solid fa-check\"></i> Đang so sánh' : '<i class=\"fa-solid fa-plus\"></i> Thêm So Sánh'}
          </button>
        </div>
      </div>

      ${predatoryAlertHtml}
    </div>
  `;
}

export function filterJournalTable(selectedCategory?: string): void {
  const filterEl = document.getElementById('category-filter') as HTMLSelectElement | null;
  const category = selectedCategory || filterEl?.value || 'ALL';
  renderJournalTable(category);
}

export function renderJournalTable(category = 'ALL'): void {
  const tbody = (document.getElementById('journal-table-body') || document.getElementById('journal-rank-tbody')) as HTMLTableSectionElement | null;
  if (!tbody || !window.JOURNAL_METRICS_DATABASE) return;

  let list = Object.values(window.JOURNAL_METRICS_DATABASE);
  
  // Deduplicate by name
  const seen = new Set<string>();
  list = list.filter((item: any) => {
    const key = item.name || item.journal;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (category !== 'ALL') {
    list = list.filter((item: any) => item.category && item.category.toLowerCase().includes(category.toLowerCase()));
  }

  list.sort((a: any, b: any) => (b.if || 0) - (a.if || 0));

  tbody.innerHTML = list.map((item: any) => {
    const qClass = item.quartile === 'Q1' ? 'jq-tag-q1' : item.quartile === 'Q2' ? 'jq-tag-q2' : item.quartile === 'Q3' ? 'jq-tag-q3' : item.quartile === 'Q4' ? 'jq-tag-q4' : 'jq-tag-moh';
    const profile = window.getJournalQualityProfile ? window.getJournalQualityProfile(item.name || item.journal, item) : null;
    const ts = profile ? profile.trustScore : { score: 85, color: '#059669' };
    const isComparing = currentComparedJournals.includes(item.journal || item.name);

    return `
      <tr>
        <td style="font-weight:700; color:var(--text);">
          <div style="font-size:0.92rem;">${escapeHtml(item.name || item.journal)}</div>
          ${item.issn ? `<div style="font-size:0.75rem; color:var(--text-muted); font-family:monospace;">ISSN: ${item.issn}</div>` : ''}
        </td>
        <td style="font-size:0.84rem; color:var(--text-muted); font-weight:600;">${item.category || 'General'}</td>
        <td><span class="jq-badge ${qClass}" style="font-weight:800; font-size:0.75rem; padding:0.2rem 0.55rem; border-radius:6px;">${item.quartile || 'Q1'}</span></td>
        <td style="font-weight:800; color:var(--accent); font-family:'Space Grotesk',sans-serif; font-size:0.95rem;">${item.if ? item.if.toFixed(1) : '—'}</td>
        <td style="font-family:'Space Grotesk',sans-serif; font-weight:600;">${item.sjr ?? '—'}</td>
        <td>
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-weight:800; color:${ts.color}; font-size:0.9rem;">${ts.score}</span>
            <div style="width:40px; height:5px; background:var(--surface-2); border-radius:4px; overflow:hidden;">
              <div style="width:${ts.score}%; height:100%; background:${ts.color};"></div>
            </div>
          </div>
        </td>
        <td style="color:var(--text-muted); font-size:0.8rem;">${escapeHtml(item.publisher || 'N/A')}</td>
        <td style="text-align:right;">
          <button class="btn" onclick="toggleCompareJournal('${escapeHtml(item.journal || item.name)}')" style="padding:0.3rem 0.6rem; font-size:0.75rem; font-weight:700; border-radius:6px; border:1px solid var(--border-light); background:${isComparing ? 'var(--accent,#0284c7)' : 'var(--surface)'}; color:${isComparing ? '#fff' : 'var(--text)'}; cursor:pointer;">
            ${isComparing ? '<i class=\"fa-solid fa-check\"></i> So sánh' : '<i class=\"fa-solid fa-plus\"></i> Thêm'}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

export function loadPresetCompare(journals: string[]): void {
  currentComparedJournals = [...journals];
  renderCompareGrid();
}

function showAnalyzerNotification(msg: string, type: 'info' | 'warning' | 'success' = 'info'): void {
  if (typeof window !== 'undefined' && typeof (window as any).showMedicalToast === 'function') {
    (window as any).showMedicalToast({ type, message: msg, title: 'Thẩm định tạp chí' });
    return;
  }
  let toast = document.getElementById('analyzer-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'analyzer-toast';
    toast.style.cssText = 'position:fixed; bottom:24px; right:24px; z-index:9999; background:#0f172a; color:#fff; padding:0.75rem 1.25rem; border-radius:10px; box-shadow:0 10px 25px rgba(0,0,0,0.2); font-weight:600; font-size:0.88rem;';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.display = 'block';
  setTimeout(() => { if (toast) toast.style.display = 'none'; }, 3000);
}

export function toggleCompareJournal(journalName: string): void {
  if (!journalName) return;
  const idx = currentComparedJournals.indexOf(journalName);
  if (idx > -1) {
    if (currentComparedJournals.length <= 1) {
      showAnalyzerNotification('Vui lòng giữ ít nhất 1 tạp chí trong bảng so sánh.', 'warning');
      return;
    }
    currentComparedJournals.splice(idx, 1);
  } else {
    if (currentComparedJournals.length >= 4) {
      currentComparedJournals.shift(); // keep max 4
    }
    currentComparedJournals.push(journalName);
    showAnalyzerNotification(`Đã thêm ${journalName} vào bảng đối chiếu.`, 'success');
  }

  renderCompareGrid();
  renderJournalTable((document.getElementById('category-filter') as HTMLSelectElement)?.value || 'ALL');
}

export function renderCompareGrid(): void {
  const container = (document.getElementById('compare-grid-container') || document.getElementById('preset-compare-container')) as HTMLElement | null;
  if (!container || !window.JOURNAL_METRICS_DATABASE) return;

  const items: any[] = [];
  currentComparedJournals.forEach(j => {
    const found = window.JOURNAL_METRICS_DATABASE[j] || Object.values(window.JOURNAL_METRICS_DATABASE).find((x: any) => 
      x.journal?.toLowerCase() === j.toLowerCase() || x.name?.toLowerCase().includes(j.toLowerCase())
    );
    if (found) items.push(found);
  });

  if (items.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1; padding:2rem; text-align:center; color:var(--text-muted);">Chưa chọn tạp chí để so sánh. Hãy bấm "+ Thêm So Sánh" từ bảng bên dưới.</div>`;
    return;
  }

  container.innerHTML = items.map(item => renderFullJournalCard(item)).join('');
}

function escapeHtml(str?: string): string {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initSearchInput();
    renderJournalTable();
    loadPresetCompare(['NEJM', 'Lancet', 'JAMA']);
  });
}

if (typeof window !== 'undefined') {
  (window as any).initSearchInput = initSearchInput;
  (window as any).performJournalSearch = performJournalSearch;
  (window as any).renderJournalTable = renderJournalTable;
  (window as any).filterJournalTable = filterJournalTable;
  (window as any).loadPresetCompare = loadPresetCompare;
  (window as any).toggleCompareJournal = toggleCompareJournal;
}
