/**
 * guideline-journal-badge.js
 * Module Tự động Inject "Journal Quality Card" vào các Trang Bài Viết Hướng Dẫn Lâm Sàng (kho-guidelines/*.html)
 * 
 * CliniPortal - Y học Chứng cứ
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initJournalQualityBadge();
  });

  function initJournalQualityBadge() {
    // 1. Tìm placeholder hoăc vị trí thích hợp để inject
    let targetContainer = document.getElementById('journal-quality-badge');

    if (!targetContainer) {
      const heroMeta = document.querySelector('.hero-meta') || document.querySelector('.stats-strip') || document.querySelector('.hero-inner');
      if (!heroMeta) return;

      targetContainer = document.createElement('div');
      targetContainer.id = 'journal-quality-badge';
      targetContainer.style.maxWidth = '1000px';
      targetContainer.style.margin = '1rem auto 0';
      heroMeta.parentNode.insertBefore(targetContainer, heroMeta.nextSibling);
    }

    // 2. Trích xuất tên Tạp chí từ Meta Tag hoặc Text
    let journalName = document.querySelector('meta[name="journal"]')?.content ||
                      document.querySelector('meta[name="citation_journal_title"]')?.content;

    if (!journalName) {
      // Try extract from hero meta or title
      const text = document.body.innerText || '';
      const match = text.match(/(N Engl J Med|NEJM|Lancet|JAMA|BMJ|Circulation|Eur Heart J|JACC|Diabetes Care|Gastroenterology|Gut|Kidney Int|CHEST|Blood|Ann Intern Med|Bộ Y tế)/i);
      if (match) {
        journalName = match[1];
      }
    }

    if (!journalName) return;

    // 3. Lấy hồ sơ đánh giá chất lượng
    const profile = window.getJournalQualityProfile ? window.getJournalQualityProfile(journalName) : null;
    if (!profile || !profile.metrics) return;

    const m = profile.metrics;
    const ts = profile.trustScore;
    const pAudit = profile.predatoryAudit;

    const qClass = m.quartile === 'Q1' ? 'jq-tag-q1' : m.quartile === 'Q2' ? 'jq-tag-q2' : m.quartile === 'Q3' ? 'jq-tag-q3' : m.quartile === 'Q4' ? 'jq-tag-q4' : 'jq-tag-moh';

    let predatoryAlertHtml = '';
    if (pAudit && pAudit.flags && pAudit.flags.length > 0) {
      predatoryAlertHtml = `
        <div class="predatory-alert-banner" style="margin-top: 0.6rem; padding: 0.65rem 0.85rem; font-size: 0.78rem;">
          <div class="predatory-title-row">
            <span>${pAudit.summary}</span>
          </div>
          <div class="predatory-flag-list">
            ${pAudit.flags.map(f => `<div>• <strong>${f.title}</strong>: ${f.detail}</div>`).join('')}
          </div>
        </div>
      `;
    }

    targetContainer.innerHTML = `
      <div class="jq-card" style="margin: 0.75rem 0; padding: 1rem 1.25rem;">
        <div class="jq-card-header" style="margin-bottom:0.6rem; padding-bottom:0.5rem;">
          <div>
            <div style="font-size:0.72rem; font-weight:800; color:var(--accent); text-transform:uppercase; letter-spacing:0.04em;">🏆 Chỉ Số Chất Lượng Tạp Chi</div>
            <div class="jq-card-title" style="font-size:0.95rem;">${m.name || m.journal}</div>
          </div>
          <div style="text-align:right;">
            <span class="jq-badge ${qClass}">${m.quartile || 'Q1'}</span>
            <div style="font-size:0.75rem; font-weight:800; color:${ts.color}; margin-top:2px;">Trust Score: ${ts.score}/100</div>
          </div>
        </div>

        <div class="jq-metrics-grid" style="padding: 0.6rem 0.4rem;">
          <div class="jq-metric-item">
            <div class="jq-metric-val" style="font-size:1rem; color:var(--accent);">${m.if ?? '—'}</div>
            <div class="jq-metric-lbl">Impact Factor</div>
          </div>
          <div class="jq-metric-item">
            <div class="jq-metric-val"><span class="jq-badge ${qClass}">${m.quartile ?? '—'}</span></div>
            <div class="jq-metric-lbl">Quartile</div>
          </div>
          <div class="jq-metric-item">
            <div class="jq-metric-val" style="font-size:1rem;">${m.sjr ?? '—'}</div>
            <div class="jq-metric-lbl">SJR Index</div>
          </div>
          <div class="jq-metric-item">
            <div class="jq-metric-val" style="font-size:1rem;">${m.snip ?? '—'}</div>
            <div class="jq-metric-lbl">SNIP Index</div>
          </div>
          <div class="jq-metric-item">
            <div class="jq-metric-val" style="font-size:1rem;">${m.hIndex ? m.hIndex.toLocaleString() : '—'}</div>
            <div class="jq-metric-lbl">H-Index</div>
          </div>
        </div>

        ${predatoryAlertHtml}
      </div>
    `;
  }

})();
