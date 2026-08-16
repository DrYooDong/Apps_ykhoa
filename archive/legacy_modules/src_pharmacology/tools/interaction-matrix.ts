/**
 * CliniPortal — 2D Interaction Matrix (TypeScript Module)
 */
import { DRUG_INTERACTIONS_DATA } from '../data';
import { DrugInteraction } from '../types';

export function showInteractionDetail(interactionId: string): void {
  const item = DRUG_INTERACTIONS_DATA.find(i => i.id === interactionId);
  if (!item) return;

  let modal = document.getElementById('interaction-detail-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'interaction-detail-modal';
    modal.className = 'pharma-modal';
    document.body.appendChild(modal);
  }

  const severityColor = item.severity === 'contraindicated' ? '#dc2626' : item.severity === 'major' ? '#ea580c' : item.severity === 'synergistic' ? '#16a34a' : '#ca8a04';

  modal.innerHTML = `
    <div class="pharma-modal-backdrop" onclick="document.getElementById('interaction-detail-modal').classList.remove('active')"></div>
    <div class="pharma-modal-content" style="max-width: 600px; padding: 1.5rem;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1rem; border-bottom:1px solid var(--color-divider); padding-bottom:0.75rem;">
        <div>
          <span class="badge" style="background:${severityColor}20; color:${severityColor}; font-weight:700; border:1px solid ${severityColor}40;">${item.severityLabel}</span>
          <h3 style="margin:0.5rem 0 0; font-size:1.15rem; color:var(--color-text);">${item.summary}</h3>
        </div>
        <button onclick="document.getElementById('interaction-detail-modal').classList.remove('active')" style="background:none; border:none; font-size:1.5rem; cursor:pointer;">&times;</button>
      </div>
      <div style="font-size:0.9rem; line-height:1.5;">
        <h4 style="margin:0.75rem 0 0.25rem; color:var(--color-primary);">🔬 Cơ Chế Dược Lý</h4>
        <p style="margin:0 0 1rem; color:var(--color-text);">${item.mechanism}</p>

        <h4 style="margin:0.75rem 0 0.25rem; color:${severityColor};">🩺 Hướng Dẫn Xử Trí Lâm Sàng</h4>
        <p style="margin:0; background:var(--color-surface-2); padding:0.75rem; border-radius:6px; border-left:3px solid ${severityColor};">${item.clinicalManagement}</p>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

export function initInteractionMatrixPage(): void {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  function switchTab(targetId: string) {
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));

    const targetBtn = document.querySelector(`.tab-btn[data-target="${targetId}"]`);
    const targetPane = document.getElementById(targetId);

    if (targetBtn && targetPane) {
      targetBtn.classList.add('active');
      targetPane.classList.add('active');
    }
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = (btn as HTMLElement).dataset.target;
      if (target) {
        switchTab(target);
        window.history.replaceState(null, '', `#${target}`);
      }
    });
  });

  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    if (document.getElementById(hash)) {
      switchTab(hash);
    }
  }

  // Render sample matrix if containers are present
  const tmMount = document.getElementById('pharma-heatmap-mount-timmach');
  if (tmMount && tmMount.children.length === 0) {
    tmMount.innerHTML = `
      <div style="overflow-x:auto; margin-top:1rem;">
        <table class="matrix-table" style="width:100%; border-collapse:collapse; text-align:center; font-size:0.85rem;">
          <thead>
            <tr style="background:var(--color-surface-2);">
              <th style="padding:0.75rem; border:1px solid var(--color-divider); text-align:left;">Nhóm Thuốc</th>
              <th style="padding:0.75rem; border:1px solid var(--color-divider);">ACEi / ARB</th>
              <th style="padding:0.75rem; border:1px solid var(--color-divider);">Beta-Blocker</th>
              <th style="padding:0.75rem; border:1px solid var(--color-divider);">Non-DHP CCB</th>
              <th style="padding:0.75rem; border:1px solid var(--color-divider);">SGLT2i</th>
              <th style="padding:0.75rem; border:1px solid var(--color-divider);">MRA (Spirono)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:0.75rem; border:1px solid var(--color-divider); font-weight:700; text-align:left;">ARNI (Entresto)</td>
              <td style="padding:0.75rem; border:1px solid var(--color-divider); background:#fee2e2; color:#991b1b; font-weight:700; cursor:pointer;" onclick="window.showInteractionDetail('inter_arni_acei')">🚫 CCĐ</td>
              <td style="padding:0.75rem; border:1px solid var(--color-divider); background:#dcfce7; color:#166534;">✅ Phối hợp</td>
              <td style="padding:0.75rem; border:1px solid var(--color-divider); background:#fef9c3; color:#854d0e;">⚠️ Thận trọng</td>
              <td style="padding:0.75rem; border:1px solid var(--color-divider); background:#dcfce7; color:#166534;">⭐ 4 trụ cột</td>
              <td style="padding:0.75rem; border:1px solid var(--color-divider); background:#dcfce7; color:#166534;">⭐ 4 trụ cột</td>
            </tr>
            <tr>
              <td style="padding:0.75rem; border:1px solid var(--color-divider); font-weight:700; text-align:left;">Beta-Blocker</td>
              <td style="padding:0.75rem; border:1px solid var(--color-divider); background:#dcfce7; color:#166534;">✅ Phối hợp</td>
              <td style="padding:0.75rem; border:1px solid var(--color-divider); background:var(--color-surface-2); color:var(--color-text-muted);">-</td>
              <td style="padding:0.75rem; border:1px solid var(--color-divider); background:#fee2e2; color:#991b1b; font-weight:700; cursor:pointer;" onclick="window.showInteractionDetail('inter_bb_non_dhp_ccb')">🚫 CCĐ</td>
              <td style="padding:0.75rem; border:1px solid var(--color-divider); background:#dcfce7; color:#166534;">⭐ 4 trụ cột</td>
              <td style="padding:0.75rem; border:1px solid var(--color-divider); background:#dcfce7; color:#166534;">⭐ 4 trụ cột</td>
            </tr>
            <tr>
              <td style="padding:0.75rem; border:1px solid var(--color-divider); font-weight:700; text-align:left;">SGLT2i (Jardiance)</td>
              <td style="padding:0.75rem; border:1px solid var(--color-divider); background:#dcfce7; color:#166534;">⭐ Phối hợp</td>
              <td style="padding:0.75rem; border:1px solid var(--color-divider); background:#dcfce7; color:#166534;">⭐ Phối hợp</td>
              <td style="padding:0.75rem; border:1px solid var(--color-divider); background:#dcfce7; color:#166534;">✅ Phối hợp</td>
              <td style="padding:0.75rem; border:1px solid var(--color-divider); background:var(--color-surface-2); color:var(--color-text-muted);">-</td>
              <td style="padding:0.75rem; border:1px solid var(--color-divider); background:#bbf7d0; color:#15803d; font-weight:700; cursor:pointer;" onclick="window.showInteractionDetail('inter_sglt2i_mra')">⚡ Hiệp đồng</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
  }

  if (typeof window !== 'undefined') {
    (window as any).showInteractionDetail = showInteractionDetail;
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractionMatrixPage);
  } else {
    initInteractionMatrixPage();
  }
}
