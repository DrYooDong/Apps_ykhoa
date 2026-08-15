/**
 * CliniPortal 2.0 — Guidelines Journal Quality Badge Injector (TypeScript)
 * Path: src/content/ebm/guidelines/js/guideline-journal-badge.ts
 */

import '../guidelines-types';

export function initJournalQualityBadge(): void {
  let targetContainer = document.getElementById('journal-quality-badge');

  if (!targetContainer) {
    const heroMeta = document.querySelector('.hero-meta') || document.querySelector('.stats-strip') || document.querySelector('.hero-inner');
    if (!heroMeta || !heroMeta.parentNode) return;

    targetContainer = document.createElement('div');
    targetContainer.id = 'journal-quality-badge';
    targetContainer.style.maxWidth = '1000px';
    targetContainer.style.margin = '1rem auto 0';
    heroMeta.parentNode.insertBefore(targetContainer, heroMeta.nextSibling);
  }

  let journalName = (document.querySelector('meta[name="journal"]') as HTMLMetaElement | null)?.content ||
                    (document.querySelector('meta[name="citation_journal_title"]') as HTMLMetaElement | null)?.content;

  if (!journalName) {
    const text = document.body.innerText || '';
    const match = text.match(/(N Engl J Med|NEJM|Lancet|JAMA|BMJ|Circulation|Eur Heart J|JACC|Diabetes Care|Gastroenterology|Gut|Kidney Int|CHEST|Blood|Ann Intern Med|Bộ Y tế)/i);
    if (match) {
      journalName = match[1];
    }
  }

  if (!journalName) return;

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
          ${pAudit.flags.map((f: any) => `<div>• <strong>${f.title}</strong>: ${f.detail}</div>`).join('')}
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
          <div class="jq-metric-val" style="font-size:1rem;">${m.hIndex ? Number(m.hIndex).toLocaleString() : '—'}</div>
          <div class="jq-metric-lbl">H-Index</div>
        </div>
      </div>

      ${predatoryAlertHtml}
    </div>
  `;
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initJournalQualityBadge();
  });
}

if (typeof window !== 'undefined') {
  window.initJournalQualityBadge = initJournalQualityBadge;
}
