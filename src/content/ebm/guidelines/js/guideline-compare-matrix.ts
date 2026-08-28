/**
 * CliniPortal 2.0 — Guidelines Compare Matrix (TypeScript)
 * Path: src/content/ebm/guidelines/js/guideline-compare-matrix.ts
 */

import { Study } from './guidelines-types';

import './guidelines-types';

const compareStudyIds = new Set<string>();

export function addToCompare(studyId: string): void {
  if (!studyId) return;
  compareStudyIds.add(studyId);
  if (window.selectedIds && typeof window.selectedIds.add === 'function') {
    window.selectedIds.add(studyId);
  }
  updateFloatingCompareBar();
  alert(`⚖️ Đã thêm bài vào Danh sách Đối Sánh! (Hiện có ${compareStudyIds.size} bài)`);
}

export function removeFromCompare(studyId: string): void {
  compareStudyIds.delete(studyId);
  if (window.selectedIds && typeof window.selectedIds.delete === 'function') {
    window.selectedIds.delete(studyId);
  }
  updateFloatingCompareBar();
  if (compareStudyIds.size === 0) {
    closeMultiCompareModal();
  } else {
    renderMultiCompareTable();
  }
}

export function clearCompareList(): void {
  compareStudyIds.clear();
  if (window.selectedIds && typeof window.selectedIds.clear === 'function') {
    window.selectedIds.clear();
  }
  updateFloatingCompareBar();
  closeMultiCompareModal();
}

export function updateFloatingCompareBar(): void {
  const bar = document.getElementById('floating-compare-bar');
  const countEl = document.getElementById('floating-compare-count');
  
  if (window.selectedIds && window.selectedIds.size > 0) {
    window.selectedIds.forEach(id => compareStudyIds.add(id));
  }

  if (!bar || !countEl) return;

  if (compareStudyIds.size > 0) {
    bar.style.display = 'flex';
    bar.classList.add('active');
    countEl.textContent = `${compareStudyIds.size} bài đã chọn đối sánh`;
  } else {
    bar.style.display = 'none';
    bar.classList.remove('active');
  }
}

export function openMultiCompareModal(): void {
  if (window.selectedIds && window.selectedIds.size > 0) {
    window.selectedIds.forEach(id => compareStudyIds.add(id));
  }

  const modal = document.getElementById('multi-compare-modal');
  if (!modal) return;

  if (compareStudyIds.size === 0) {
    alert('⚠️ Vui lòng tích chọn ít nhất 1-4 bài nghiên cứu trong danh sách hoặc bấm "Thêm vào So sánh" để mở Ma trận đối sánh!');
    return;
  }

  modal.classList.add('active');
  renderMultiCompareTable();
}

export function closeMultiCompareModal(): void {
  const modal = document.getElementById('multi-compare-modal');
  if (modal) modal.classList.remove('active');
}

export function renderMultiCompareTable(): void {
  const body = document.getElementById('multi-compare-modal-body');
  const statusText = document.getElementById('compare-modal-status-text');
  if (!body) return;

  const allStudies: Study[] = window.studies || [];
  const selectedStudies = allStudies.filter(s => compareStudyIds.has(s.id));

  if (statusText) {
    statusText.textContent = `Đang so sánh đối sánh ${selectedStudies.length} bài nghiên cứu / guidelines`;
  }

  if (selectedStudies.length === 0) {
    body.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
        🧩 Không tìm thấy dữ liệu nghiên cứu đã chọn.
      </div>
    `;
    return;
  }

  let html = `
    <div style="overflow-x: auto; -webkit-overflow-scrolling: touch;">
      <table class="regimen-table" style="width: 100%; border-collapse: collapse; min-width: 850px; font-size: 0.82rem;">
        <thead>
          <tr>
            <th style="width: 160px; background: var(--surface-2); color: var(--text); border: 1px solid var(--border-light); text-align: left; padding: 10px;">Tiêu chí Đối sánh</th>
            ${selectedStudies.map(s => `
              <th style="background: var(--surface); border: 1px solid var(--border-light); padding: 10px; text-align: left; vertical-align: top;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 6px;">
                  <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 0.88rem; color: var(--accent);">${escapeHtml(s.title)}</div>
                  <button class="btn btn-small" onclick="removeFromCompare('${s.id}')" title="Xóa khỏi so sánh" style="padding: 2px 6px; font-size: 0.7rem;">✖</button>
                </div>
                <div style="font-weight: 600; font-size: 0.74rem; color: var(--text-muted); margin-top: 4px;">
                  🏛️ ${escapeHtml(s.organization || 'N/A')} (${s.year || ''})
                </div>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-weight: 700; background: var(--surface-2); border: 1px solid var(--border-light); padding: 10px;">💊 Hoạt chất / Intervention</td>
            ${selectedStudies.map(s => `<td style="border: 1px solid var(--border-light); padding: 10px; font-weight: 700;">${escapeHtml(s.drug || s.intervention || 'N/A')}</td>`).join('')}
          </tr>
          <tr>
            <td style="font-weight: 700; background: var(--surface-2); border: 1px solid var(--border-light); padding: 10px;">📊 Cỡ mẫu (N) & Thiết kế</td>
            ${selectedStudies.map(s => `<td style="border: 1px solid var(--border-light); padding: 10px;">N = ${s.sampleSize ? Number(s.sampleSize).toLocaleString('vi-VN') : 'N/A'}<br><span style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(s.design || 'RCT')}</span></td>`).join('')}
          </tr>
          <tr>
            <td style="font-weight: 700; background: var(--surface-2); border: 1px solid var(--border-light); padding: 10px;">👥 Dân số Bệnh nhân</td>
            ${selectedStudies.map(s => `<td style="border: 1px solid var(--border-light); padding: 10px;">${escapeHtml(s.population || 'N/A')}</td>`).join('')}
          </tr>
          <tr>
            <td style="font-weight: 700; background: var(--surface-2); border: 1px solid var(--border-light); padding: 10px;">🎯 Kết cục chính (Primary Endpoint)</td>
            ${selectedStudies.map(s => `<td style="border: 1px solid var(--border-light); padding: 10px; color: var(--accent); font-weight: 600;">${escapeHtml(s.primaryEndpoint || 'N/A')}</td>`).join('')}
          </tr>
          <tr>
            <td style="font-weight: 700; background: var(--surface-2); border: 1px solid var(--border-light); padding: 10px;">📈 Kết quả nổi bật (HR / 95% CI)</td>
            ${selectedStudies.map(s => `<td style="border: 1px solid var(--border-light); padding: 10px;">${escapeHtml(s.keyResults || 'N/A')}</td>`).join('')}
          </tr>
          <tr>
            <td style="font-weight: 700; background: var(--surface-2); border: 1px solid var(--border-light); padding: 10px;">🔥 Tác động Lâm sàng</td>
            ${selectedStudies.map(s => `
              <td style="border: 1px solid var(--border-light); padding: 10px;">
                <span class="impact-tag" style="background: ${s.impact === 'practice-changing' ? '#fee2e2' : '#eff6ff'}; color: ${s.impact === 'practice-changing' ? '#dc2626' : '#2563eb'};">
                  ${escapeHtml(s.impact || 'Informative')}
                </span>
              </td>
            `).join('')}
          </tr>
          <tr>
            <td style="font-weight: 700; background: var(--surface-2); border: 1px solid var(--border-light); padding: 10px;">💡 Kết luận / Khuyến cáo chính</td>
            ${selectedStudies.map(s => `<td style="border: 1px solid var(--border-light); padding: 10px; line-height: 1.5;">${escapeHtml(s.summary || 'N/A')}</td>`).join('')}
          </tr>
          <tr>
            <td style="font-weight: 700; background: var(--surface-2); border: 1px solid var(--border-light); padding: 10px;">📖 Bài viết chi tiết</td>
            ${selectedStudies.map(s => `
              <td style="border: 1px solid var(--border-light); padding: 10px;">
                ${s.file ? `<a href="${window.resolveStudyFile ? window.resolveStudyFile(s.file) : s.file}" class="btn btn-small btn-primary" style="font-size:0.72rem;">📖 Xem Trang Chi Tiết</a>` : '<span style="color:var(--text-muted);">Không có bài riêng</span>'}
              </td>
            `).join('')}
          </tr>
        </tbody>
      </table>
    </div>
  `;

  body.innerHTML = html;
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
  window.addToCompare = addToCompare;
  window.removeFromCompare = removeFromCompare;
  window.clearCompareList = clearCompareList;
  window.updateFloatingCompareBar = updateFloatingCompareBar;
  window.openMultiCompareModal = openMultiCompareModal;
  window.closeMultiCompareModal = closeMultiCompareModal;
  window.renderMultiCompareTable = renderMultiCompareTable;
}
