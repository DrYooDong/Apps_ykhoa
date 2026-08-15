/**
 * CliniPortal — Cận Lâm Sàng Decision Support Native SPA View (TypeScript)
 * Path: src/content/approaches/paraclinical/paraclinical-view.ts
 */

import { PARACLINICAL_APPROACH_DATA, ParaclinicalApproachItem } from './tc-paraclinical-engine';

export function renderParaclinicalView(activeId: string = 'tc-thieumau'): string {
  const currentItem = PARACLINICAL_APPROACH_DATA[activeId] || PARACLINICAL_APPROACH_DATA['tc-thieumau'];

  return `
    <div class="paraclinical-container animate-fade-in" style="max-width: 1200px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/approaches" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Phân Hệ Tiếp Cận</a> / Cận Lâm Sàng & Xét Nghiệm
          </div>
          <h1 style="font-size: 1.75rem; font-weight: 800; color: var(--color-primary, #0284c7); margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-flask-vial"></i> Tiếp Cận Cận Lâm Sàng & Phân Tích Kết Quả
          </h1>
        </div>
        
        <div style="display: flex; gap: 0.5rem;">
          <a href="#/approaches" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Quay lại
          </a>
        </div>
      </div>

      <!-- Main Layout: Sidebar & Content -->
      <div style="display: grid; grid-template-columns: 280px 1fr; gap: 1.5rem;" class="paraclinical-layout">
        <!-- Sidebar Navigation -->
        <div>
          <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
            <div style="padding: 0.75rem 1rem; background: var(--color-bg, #f8fafc); border-bottom: 1px solid var(--color-border, #e2e8f0); font-weight: 700; font-size: 0.85rem; color: var(--color-text-muted, #64748b);">
              CÁC PHÁC ĐỒ CẬN LÂM SÀNG
            </div>
            <div style="display: flex; flex-direction: column;">
              ${Object.values(PARACLINICAL_APPROACH_DATA).map(item => `
                <button onclick="window.switchParaclinicalItem('${item.id}')" class="para-nav-btn ${item.id === currentItem.id ? 'active' : ''}" style="text-align: left; padding: 0.85rem 1rem; border: none; background: ${item.id === currentItem.id ? 'rgba(2, 132, 199, 0.08)' : 'transparent'}; border-left: 4px solid ${item.id === currentItem.id ? 'var(--color-primary, #0284c7)' : 'transparent'}; border-bottom: 1px solid var(--color-border, #f1f5f9); cursor: pointer; font-weight: ${item.id === currentItem.id ? '700' : '600'}; font-size: 0.875rem; color: ${item.id === currentItem.id ? 'var(--color-primary, #0284c7)' : 'var(--color-text, #334155)'}; display: flex; align-items: center; gap: 0.6rem;">
                  <span style="font-size: 1.1rem;">${item.icon}</span>
                  <span style="line-height: 1.3;">${item.name}</span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- R-Value Calculator Quick Widget for Liver -->
          <div style="margin-top: 1.25rem; background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem;">
            <div style="font-weight: 700; font-size: 0.9rem; color: var(--color-text, #1e293b); margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
              <i class="fa-solid fa-calculator" style="color: var(--color-primary, #0284c7);"></i> Máy Tính Nhanh R-Value Gan
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem;">
              <div>
                <label style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">ALT bệnh nhân (U/L):</label>
                <input type="number" id="altVal" placeholder="VD: 350" style="width: 100%; padding: 0.4rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px; box-sizing: border-box;" />
              </div>
              <div>
                <label style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">ALP bệnh nhân (U/L):</label>
                <input type="number" id="alpVal" placeholder="VD: 120" style="width: 100%; padding: 0.4rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px; box-sizing: border-box;" />
              </div>
              <button onclick="window.calcRValue()" style="margin-top: 0.25rem; padding: 0.5rem; background: var(--color-primary, #0284c7); color: white; border: none; border-radius: 6px; font-weight: 700; cursor: pointer;">
                Tính Tỷ Số R
              </button>
              <div id="rValueResult" style="margin-top: 0.5rem; padding: 0.5rem; background: var(--color-bg, #f8fafc); border-radius: 6px; font-size: 0.8rem; display: none;"></div>
            </div>
          </div>
        </div>

        <!-- Detail Content Area -->
        <div id="paraclinicalDetailArea">
          ${renderItemContent(currentItem)}
        </div>
      </div>
    </div>
  `;
}

function renderItemContent(item: ParaclinicalApproachItem): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.75rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
      <!-- Title & Summary -->
      <div style="border-bottom: 2px solid var(--color-primary, #0284c7); padding-bottom: 1rem; margin-bottom: 1.5rem;">
        <div style="font-size: 1.8rem; margin-bottom: 0.25rem;">${item.icon}</div>
        <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--color-text, #1e293b); margin: 0 0 0.5rem 0;">
          ${item.name}
        </h2>
        <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0; line-height: 1.5;">
          ${item.summary}
        </p>
      </div>

      <!-- Systematic Steps -->
      <div style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #1e293b); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-list-ol" style="color: var(--color-primary, #0284c7);"></i> Các Bước Tiếp Cận Hệ Thống
        </h3>
        
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${item.steps.map((step, idx) => `
            <div style="padding: 1.25rem; background: var(--color-bg, #f8fafc); border-radius: 8px; border-left: 4px solid var(--color-primary, #0284c7);">
              <div style="font-weight: 700; font-size: 1rem; color: var(--color-text, #1e293b); margin-bottom: 0.35rem;">
                ${step.title}
              </div>
              <p style="margin: 0; font-size: 0.9rem; color: var(--color-text, #334155); line-height: 1.5;">
                ${step.description}
              </p>
              ${step.criticalAlerts ? step.criticalAlerts.map(alert => `
                <div style="margin-top: 0.75rem; padding: 0.75rem 1rem; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; color: #b91c1c; font-size: 0.85rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                  <i class="fa-solid fa-triangle-exclamation"></i> ${alert}
                </div>
              `).join('') : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Differential Diagnoses Matrix -->
      <div>
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #1e293b); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-diagram-project" style="color: var(--color-primary, #0284c7);"></i> Chẩn Đoán Phân Biệt & Bước Xét Nghiệm Tiếp Theo
        </h3>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${item.differentialDiagnoses.map(diff => `
            <div style="border: 1px solid var(--color-border, #e2e8f0); border-radius: 8px; padding: 1.25rem; background: var(--color-surface, #fff);">
              <div style="font-weight: 700; font-size: 0.95rem; color: var(--color-primary, #0284c7); margin-bottom: 0.5rem;">
                📌 ${diff.pattern}
              </div>
              
              <div style="margin-bottom: 0.5rem;">
                <strong style="font-size: 0.85rem; color: var(--color-text, #1e293b);">Nguyên nhân thường gặp:</strong>
                <ul style="margin: 0.25rem 0 0 1.25rem; font-size: 0.85rem; color: var(--color-text, #334155); padding: 0;">
                  ${diff.likelyCauses.map(cause => `<li>${cause}</li>`).join('')}
                </ul>
              </div>

              <div style="background: rgba(2, 132, 199, 0.05); padding: 0.6rem 0.85rem; border-radius: 6px; font-size: 0.85rem; color: var(--color-text, #334155);">
                <strong><i class="fa-solid fa-vial"></i> Xét nghiệm chỉ định tiếp theo:</strong> ${diff.nextTests.join('; ')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// Global Handlers
if (typeof window !== 'undefined') {
  (window as any).switchParaclinicalItem = (id: string) => {
    const item = PARACLINICAL_APPROACH_DATA[id];
    const container = document.getElementById('paraclinicalDetailArea');
    if (item && container) {
      container.innerHTML = renderItemContent(item);
    }
    document.querySelectorAll('.para-nav-btn').forEach(b => {
      (b as HTMLElement).style.background = 'transparent';
      (b as HTMLElement).style.borderLeftColor = 'transparent';
      (b as HTMLElement).style.color = 'var(--color-text, #334155)';
    });
    const cur = (event?.target as HTMLElement)?.closest('.para-nav-btn') as HTMLElement;
    if (cur) {
      cur.style.background = 'rgba(2, 132, 199, 0.08)';
      cur.style.borderLeftColor = 'var(--color-primary, #0284c7)';
      cur.style.color = 'var(--color-primary, #0284c7)';
    }
  };

  (window as any).calcRValue = () => {
    const alt = parseFloat((document.getElementById('altVal') as HTMLInputElement)?.value || '0');
    const alp = parseFloat((document.getElementById('alpVal') as HTMLInputElement)?.value || '0');
    const resBox = document.getElementById('rValueResult');
    if (!resBox) return;

    if (!alt || !alp || alt <= 0 || alp <= 0) {
      resBox.style.display = 'block';
      resBox.innerHTML = '<span style="color: #dc2626;">Vui lòng nhập giá trị ALT và ALP hợp lệ!</span>';
      return;
    }

    // ULN: ALT ~ 40 U/L, ALP ~ 120 U/L
    const r = (alt / 40) / (alp / 120);
    let interpretation = '';
    let color = '';

    if (r >= 5) {
      interpretation = '<strong>Kiểu tổn thương Tế bào gan (Hepatocellular)</strong> — R ≥ 5. Nghĩ nhiều đến Viêm gan virus, Thiếu máu gan, Thuốc/Độc chất.';
      color = '#dc2626';
    } else if (r <= 2) {
      interpretation = '<strong>Kiểu tổn thương Ứ mật (Cholestatic)</strong> — R ≤ 2. Nghĩ nhiều đến Tắc mật ngoài gan (Sỏi, U) hoặc ứ mật trong gan (PBC, PSC).';
      color = '#ea580c';
    } else {
      interpretation = '<strong>Kiểu tổn thương Hỗn hợp (Mixed)</strong> — 2 < R < 5. Phối hợp cả hoại tử tế bào gan và tổn thương đường mật.';
      color = '#d97706';
    }

    resBox.style.display = 'block';
    resBox.innerHTML = `
      <div style="font-weight: 800; font-size: 0.95rem; color: ${color}; margin-bottom: 0.25rem;">Tỷ số R = ${r.toFixed(2)}</div>
      <div style="font-size: 0.8rem; color: var(--color-text, #334155);">${interpretation}</div>
    `;
  };
}
