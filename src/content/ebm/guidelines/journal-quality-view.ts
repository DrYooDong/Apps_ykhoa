/**
 * CliniPortal — Journal Quality & Trust Analyzer SPA View (TypeScript)
 * Path: src/content/ebm/guidelines/journal-quality-view.ts
 */

import { JOURNAL_METRICS_DATABASE } from '../data';
import { getJournalMetrics } from '../renderer';

export function renderJournalQualityView(): string {
  return `
    <div class="journal-quality-container animate-fade-in" style="max-width: 1200px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/ebm" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Y Học Chứng Cứ</a> / 
            <a href="#/ebm/kho-guidelines" style="color: var(--color-primary, #0284c7); text-decoration: none;">Kho Guidelines</a> / Đánh Giá Tạp Chí
          </div>
          <h1 style="font-size: 1.85rem; font-weight: 800; color: #ca8a04; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-award"></i> Journal Quality & Trust Analyzer
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Tra cứu Impact Factor (IF), Quartile (Q1 - Q4), Scimago SJR, SNIP và H-index của hơn 100+ tạp chí y sinh học hàng đầu thế giới.
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/ebm/kho-guidelines" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Kho Guidelines
          </a>
        </div>
      </div>

      <!-- Main Search & Analyzer Form -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1rem;">
            <i class="fa-solid fa-magnifying-glass" style="color: #ca8a04;"></i> Tra Cứu Tên Tạp Chí Y Khoa
          </h3>

          <div style="margin-bottom: 1rem;">
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155); display: block; margin-bottom: 0.4rem;">Nhập tên viết tắt hoặc đầy đủ:</label>
            <input type="text" id="journal-query-input" value="NEJM" placeholder="VD: NEJM, Lancet, JAMA, Circulation, Chest..." style="width: 100%; padding: 0.75rem; border: 1px solid #cbd5e1; border-radius: 8px;" oninput="window.analyzeJournal()" />
          </div>

          <div style="margin-top: 1rem;">
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155); display: block; margin-bottom: 0.4rem;">Gợi ý phổ biến:</label>
            <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
              <button onclick="window.setJournalQuery('NEJM')" style="padding: 0.35rem 0.65rem; border-radius: 6px; border: 1px solid #e2e8f0; background: #f8fafc; font-size: 0.8rem; cursor: pointer;">NEJM</button>
              <button onclick="window.setJournalQuery('Lancet')" style="padding: 0.35rem 0.65rem; border-radius: 6px; border: 1px solid #e2e8f0; background: #f8fafc; font-size: 0.8rem; cursor: pointer;">Lancet</button>
              <button onclick="window.setJournalQuery('JAMA')" style="padding: 0.35rem 0.65rem; border-radius: 6px; border: 1px solid #e2e8f0; background: #f8fafc; font-size: 0.8rem; cursor: pointer;">JAMA</button>
              <button onclick="window.setJournalQuery('Circulation')" style="padding: 0.35rem 0.65rem; border-radius: 6px; border: 1px solid #e2e8f0; background: #f8fafc; font-size: 0.8rem; cursor: pointer;">Circulation</button>
              <button onclick="window.setJournalQuery('Chest')" style="padding: 0.35rem 0.65rem; border-radius: 6px; border: 1px solid #e2e8f0; background: #f8fafc; font-size: 0.8rem; cursor: pointer;">Chest</button>
              <button onclick="window.setJournalQuery('Intensive Care Med')" style="padding: 0.35rem 0.65rem; border-radius: 6px; border: 1px solid #e2e8f0; background: #f8fafc; font-size: 0.8rem; cursor: pointer;">ICM</button>
            </div>
          </div>
        </div>

        <!-- Result Box -->
        <div id="journal-metric-result" style="background: linear-gradient(135deg, rgba(202,138,4,0.06) 0%, rgba(2,132,199,0.02) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <span id="res-quartile-badge" style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #16a34a; background: #dcfce7; padding: 0.25rem 0.6rem; border-radius: 6px;">Q1 Journal</span>
              <span id="res-issn" style="font-size: 0.8rem; color: #64748b;">ISSN: 0028-4793</span>
            </div>

            <h2 id="res-journal-name" style="font-size: 1.4rem; font-weight: 800; color: var(--color-text, #0f172a); margin: 0.75rem 0 0.25rem 0;">
              The New England Journal of Medicine (NEJM)
            </h2>
            <div id="res-publisher" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b);">NXB: Massachusetts Medical Society</div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; margin-top: 1.5rem; text-align: center;">
              <div style="background: #f8fafc; border-radius: 8px; padding: 0.75rem;">
                <div style="font-size: 0.75rem; color: #64748b; font-weight: 600;">Impact Factor</div>
                <div id="res-if-val" style="font-size: 1.75rem; font-weight: 800; color: #ca8a04;">158.5</div>
              </div>
              <div style="background: #f8fafc; border-radius: 8px; padding: 0.75rem;">
                <div style="font-size: 0.75rem; color: #64748b; font-weight: 600;">Scimago SJR</div>
                <div id="res-sjr-val" style="font-size: 1.75rem; font-weight: 800; color: #0284c7;">14.52</div>
              </div>
              <div style="background: #f8fafc; border-radius: 8px; padding: 0.75rem;">
                <div style="font-size: 0.75rem; color: #64748b; font-weight: 600;">H-Index</div>
                <div id="res-hindex-val" style="font-size: 1.75rem; font-weight: 800; color: #7c3aed;">1150</div>
              </div>
            </div>
          </div>

          <div style="background: #f8fafc; border-left: 4px solid #ca8a04; padding: 0.75rem 1rem; border-radius: 0 8px 8px 0; font-size: 0.825rem; color: var(--color-text, #334155); margin-top: 1rem;">
            💡 <strong>Ý nghĩa chỉ số:</strong> Tạp chí thuộc phân vị Q1 (Top 25% chuyên ngành) có mức độ tin cậy và kiểm duyệt đồng cấp (peer review) nghiêm ngặt nhất.
          </div>
        </div>
      </div>
    </div>
  `;
}

// Global Window Bindings
declare global {
  interface Window {
    analyzeJournal: () => void;
    setJournalQuery: (q: string) => void;
  }
}

if (typeof window !== 'undefined') {
  window.setJournalQuery = (q: string) => {
    const input = document.getElementById('journal-query-input') as HTMLInputElement;
    if (input) {
      input.value = q;
      window.analyzeJournal();
    }
  };

  window.analyzeJournal = () => {
    const q = (document.getElementById('journal-query-input') as HTMLInputElement)?.value.trim() || '';
    const res = getJournalMetrics(q);

    const nameEl = document.getElementById('res-journal-name');
    const pubEl = document.getElementById('res-publisher');
    const ifEl = document.getElementById('res-if-val');
    const sjrEl = document.getElementById('res-sjr-val');
    const hEl = document.getElementById('res-hindex-val');
    const qBadge = document.getElementById('res-quartile-badge');
    const issnEl = document.getElementById('res-issn');

    if (!res) {
      if (nameEl) nameEl.textContent = `Không tìm thấy thông tin cho "${q}"`;
      if (pubEl) pubEl.textContent = 'Vui lòng kiểm tra lại chính tả hoặc thử tên viết tắt.';
      if (ifEl) ifEl.textContent = 'N/A';
      if (sjrEl) sjrEl.textContent = 'N/A';
      if (hEl) hEl.textContent = 'N/A';
      if (qBadge) qBadge.textContent = 'Chưa phân hạng';
      return;
    }

    if (nameEl) nameEl.textContent = res.name;
    if (pubEl) pubEl.textContent = `NXB: ${res.publisher || 'N/A'}`;
    if (ifEl) ifEl.textContent = res.if ? res.if.toString() : 'MOH';
    if (sjrEl) sjrEl.textContent = res.sjr ? res.sjr.toString() : 'N/A';
    if (hEl) hEl.textContent = res.hIndex ? res.hIndex.toString() : 'N/A';
    if (qBadge) qBadge.textContent = `${res.quartile} Journal`;
    if (issnEl) issnEl.textContent = `ISSN: ${res.issn || 'N/A'}`;
  };
}
