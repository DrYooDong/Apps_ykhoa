/**
 * journal-quality-analyzer.js
 * Controller cho Trang Tra Cứu, So Sánh & Phân Tích Tạp Chí Y Khoa Chuyên Sâu
 * 
 * CliniPortal - Y học Chứng cứ
 */

(function () {
  'use strict';

  let searchTimeout = null;

  document.addEventListener('DOMContentLoaded', () => {
    initSearchInput();
    renderJournalTable();
    loadPresetCompare(['NEJM', 'Lancet', 'JAMA']);
  });

  function initSearchInput() {
    const input = document.getElementById('analyzer-search-input');
    if (!input) return;

    input.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (searchTimeout) clearTimeout(searchTimeout);

      if (val.length < 2) {
        const sec = document.getElementById('search-result-section');
        if (sec) sec.style.display = 'none';
        return;
      }

      searchTimeout = setTimeout(() => {
        performJournalSearch(val);
      }, 350);
    });
  }

  async function performJournalSearch(query) {
    const sec = document.getElementById('search-result-section');
    const container = document.getElementById('search-results-container');
    if (!container || !sec) return;

    sec.style.display = 'block';
    container.innerHTML = `<div style="padding:1.5rem; text-align:center; color:var(--text-muted);"><i class="fa-solid fa-spinner fa-spin"></i> Đang tìm kiếm trong CSDL & OpenAlex REST API...</div>`;

    // 1. Check local DB
    const localMatches = [];
    if (window.JOURNAL_METRICS_DATABASE) {
      const qLower = query.toLowerCase();
      Object.keys(window.JOURNAL_METRICS_DATABASE).forEach(k => {
        const item = window.JOURNAL_METRICS_DATABASE[k];
        if (k.toLowerCase().includes(qLower) || item.name.toLowerCase().includes(qLower) || (item.aliases && item.aliases.some(a => a.toLowerCase().includes(qLower)))) {
          if (!localMatches.some(m => m.name === item.name)) {
            localMatches.push({ ...item, source: 'CSDL Local' });
          }
        }
      });
    }

    // 2. Fetch OpenAlex REST API live
    let oaResults = [];
    if (window.searchOpenAlexJournals) {
      try {
        oaResults = await window.searchOpenAlexJournals(query);
      } catch (e) {
        console.warn('OpenAlex error:', e);
      }
    }

    // Combine results (avoid duplicates)
    const combined = [...localMatches];
    oaResults.forEach(oa => {
      if (!combined.some(c => c.name.toLowerCase() === oa.name.toLowerCase() || (c.issn && oa.issn && c.issn === oa.issn))) {
        combined.push(oa);
      }
    });

    if (combined.length === 0) {
      container.innerHTML = `
        <div style="padding:1.5rem; text-align:center; color:var(--text-muted); background:var(--surface-2); border-radius:12px;">
          ⚠️ Không tìm thấy tạp chí nào phù hợp với từ khóa "<strong>${escapeHtml(query)}</strong>". Bạn có thể điền thông tin thủ công trong form Hướng dẫn.
        </div>
      `;
      return;
    }

    container.innerHTML = combined.map(item => renderFullJournalCard(item)).join('');
  }

  function renderFullJournalCard(m) {
    const profile = window.getJournalQualityProfile ? window.getJournalQualityProfile(m.name || m.journal, m) : null;
    const ts = profile ? profile.trustScore : { score: 75, grade: 'Chưa xếp hạng', color: '#2563eb' };
    const pAudit = profile ? profile.predatoryAudit : { isPredatory: false, flags: [] };

    const qClass = m.quartile === 'Q1' ? 'jq-tag-q1' : m.quartile === 'Q2' ? 'jq-tag-q2' : m.quartile === 'Q3' ? 'jq-tag-q3' : m.quartile === 'Q4' ? 'jq-tag-q4' : 'jq-tag-moh';

    let predatoryAlertHtml = '';
    if (pAudit && pAudit.flags && pAudit.flags.length > 0) {
      predatoryAlertHtml = `
        <div class="predatory-alert-banner">
          <div class="predatory-title-row">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span>${pAudit.summary}</span>
          </div>
          <div class="predatory-flag-list">
            ${pAudit.flags.map(f => `<div>• <strong>${f.title}</strong>: ${f.detail}</div>`).join('')}
          </div>
        </div>
      `;
    }

    return `
      <div class="jq-card">
        <div class="jq-card-header">
          <div>
            <div class="jq-card-title">${m.name || m.journal}</div>
            <div class="jq-card-subtitle">
              <span><i class="fa-solid fa-building"></i> ${m.publisher || 'Nhà xuất bản N/A'}</span>
              ${m.issn ? `<span><i class="fa-solid fa-barcode"></i> ISSN: ${m.issn}</span>` : ''}
              <span class="openalex-badge">${m.source || 'CSDL Local'}</span>
            </div>
          </div>

          <div style="text-align:right;">
            <div style="font-size:0.75rem; font-weight:700; color:var(--text-muted);">Trust Score</div>
            <div style="font-size:1.4rem; font-weight:900; color:${ts.color}; line-height:1.1;">${ts.score}<span style="font-size:0.8rem; font-weight:600;">/100</span></div>
            <span class="jq-badge ${qClass}" style="margin-top:4px;">${m.quartile || 'Q4'}</span>
          </div>
        </div>

        <div class="trust-score-meter">
          <div class="trust-score-header">
            <span style="color:${ts.color};">${ts.grade}</span>
            <span style="font-size:0.72rem; color:var(--text-muted); font-weight:600;">(IF • Q1 • SJR • SNIP)</span>
          </div>
          <div class="trust-score-track">
            <div class="trust-score-fill" style="width: ${ts.score}%;"></div>
          </div>
        </div>

        <div class="jq-metrics-grid" style="margin-top:1rem;">
          <div class="jq-metric-item">
            <div class="jq-metric-val" style="color:var(--accent);">${m.if ?? '—'}</div>
            <div class="jq-metric-lbl">Impact Factor</div>
          </div>
          <div class="jq-metric-item">
            <div class="jq-metric-val"><span class="jq-badge ${qClass}">${m.quartile ?? '—'}</span></div>
            <div class="jq-metric-lbl">Quartile</div>
          </div>
          <div class="jq-metric-item">
            <div class="jq-metric-val">${m.sjr ?? '—'}</div>
            <div class="jq-metric-lbl">SJR Index</div>
          </div>
          <div class="jq-metric-item">
            <div class="jq-metric-val">${m.snip ?? '—'}</div>
            <div class="jq-metric-lbl">SNIP Index</div>
          </div>
          <div class="jq-metric-item">
            <div class="jq-metric-val">${m.hIndex ? m.hIndex.toLocaleString() : '—'}</div>
            <div class="jq-metric-lbl">H-Index</div>
          </div>
        </div>

        ${predatoryAlertHtml}
      </div>
    `;
  }

  function loadPresetCompare(keys) {
    const container = document.getElementById('compare-grid-container');
    if (!container || !window.JOURNAL_METRICS_DATABASE) return;

    const items = keys.map(k => window.JOURNAL_METRICS_DATABASE[k]).filter(Boolean);
    container.innerHTML = items.map(item => renderFullJournalCard(item)).join('');
  }

  function renderJournalTable(categoryFilter = 'ALL') {
    const tbody = document.getElementById('journal-table-body');
    if (!tbody || !window.JOURNAL_METRICS_DATABASE) return;

    const db = window.JOURNAL_METRICS_DATABASE;
    const keys = Object.keys(db).filter(k => {
      if (categoryFilter === 'ALL') return true;
      return db[k].category === categoryFilter;
    });

    tbody.innerHTML = keys.map(k => {
      const item = db[k];
      const profile = window.getJournalQualityProfile ? window.getJournalQualityProfile(item.name, item) : null;
      const ts = profile ? profile.trustScore : { score: 70, color: '#2563eb' };
      const qClass = item.quartile === 'Q1' ? 'jq-tag-q1' : item.quartile === 'Q2' ? 'jq-tag-q2' : item.quartile === 'Q3' ? 'jq-tag-q3' : item.quartile === 'Q4' ? 'jq-tag-q4' : 'jq-tag-moh';

      return `
        <tr>
          <td>
            <div style="font-weight:800; color:var(--text);">${item.name}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${item.journal} ${item.issn ? '• ISSN: ' + item.issn : ''}</div>
          </td>
          <td><span style="font-size:0.78rem; font-weight:600; color:var(--text-muted);">${item.category || 'N/A'}</span></td>
          <td><span class="jq-badge ${qClass}">${item.quartile || 'Q1'}</span></td>
          <td><strong style="color:var(--accent);">${item.if ?? '—'}</strong></td>
          <td>${item.sjr ?? '—'}</td>
          <td><strong style="color:${ts.color};">${ts.score}/100</strong></td>
          <td style="font-size:0.78rem; color:var(--text-muted);">${item.publisher || 'N/A'}</td>
        </tr>
      `;
    }).join('');
  }

  function filterJournalTable() {
    const select = document.getElementById('category-filter');
    if (select) {
      renderJournalTable(select.value);
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  window.loadPresetCompare = loadPresetCompare;
  window.filterJournalTable = filterJournalTable;

})();
