/**
 * Guideline Journal Quality Badge Injector (guideline-journal-badge.ts)
 * Path: src/content/ebm/guidelines/js/guideline-journal-badge.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

import { getJournalMetrics } from '../guidelinesdata.js';

export function initJournalQualityBadge(): void {
  let targetContainer = document.getElementById('journal-quality-badge');
  if (!targetContainer) {
    const heroMeta = document.querySelector('.hero-meta') || document.querySelector('.stats-strip') || document.querySelector('.hero-inner');
    if (!heroMeta) return;

    targetContainer = document.createElement('div');
    targetContainer.id = 'journal-quality-badge';
    targetContainer.style.maxWidth = '1000px';
    targetContainer.style.margin = '1rem auto 0';
    heroMeta.parentNode?.insertBefore(targetContainer, heroMeta.nextSibling);
  }

  const metaEl = document.querySelector('meta[name="journal"]') as HTMLMetaElement | null;
  let journalName = metaEl?.content || '';

  if (!journalName) {
    const text = document.body.innerText || '';
    const match = text.match(/(N Engl J Med|NEJM|Lancet|JAMA|BMJ|Circulation|Eur Heart J|JACC|Diabetes Care|Gastroenterology|Gut|Kidney Int|CHEST|Blood|Ann Intern Med|Bộ Y tế)/i);
    if (match) journalName = match[1];
  }

  if (!journalName) return;
  const metrics = getJournalMetrics(journalName);
  if (!metrics) return;

  const qClass = metrics.quartile === 'Q1' ? 'jq-tag-q1' : metrics.quartile === 'Q2' ? 'jq-tag-q2' : 'jq-tag-moh';

  targetContainer.innerHTML = `
    <div class="jq-card" style="background:var(--color-surface); border:1px solid var(--color-divider); border-radius:12px; margin:0.75rem 0; padding:1rem 1.25rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem; padding-bottom:0.5rem; border-bottom:1px solid var(--color-divider);">
        <div>
          <div style="font-size:0.72rem; font-weight:800; color:var(--color-primary); text-transform:uppercase;">🏆 Chỉ Số Chất Lượng Tạp Chí</div>
          <div style="font-size:0.95rem; font-weight:700; color:var(--color-text);">${metrics.name || metrics.journal}</div>
        </div>
        <div>
          <span class="jq-badge ${qClass}" style="background:#dcfce7; color:#166534; font-weight:800; padding:3px 8px; border-radius:4px; font-size:0.75rem;">${metrics.quartile || 'Q1'}</span>
        </div>
      </div>
      <div style="display:flex; gap:1.5rem; font-size:0.85rem;">
        <div><strong>IF:</strong> ${metrics.if ?? '—'}</div>
        <div><strong>SJR:</strong> ${metrics.sjr ?? '—'}</div>
        <div><strong>H-Index:</strong> ${metrics.hIndex ?? '—'}</div>
      </div>
    </div>
  `;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initJournalQualityBadge);
  } else {
    initJournalQualityBadge();
  }
}
