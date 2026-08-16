/**
 * CliniPortal — Tiếp Cận Triệu Chứng Lâm Sàng Native SPA View (TypeScript)
 * Path: src/content/approaches/symptoms/symptoms-view.ts
 */

import { SYMPTOMS_APPROACH_DATA, SymptomApproachData } from './symptoms-engine';

export function renderSymptomsView(activeId: string = 'daunguc'): string {
  const current = SYMPTOMS_APPROACH_DATA[activeId] || SYMPTOMS_APPROACH_DATA['daunguc'];

  return `
    <div class="symptoms-container animate-fade-in" style="max-width: 1200px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/approaches" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Phân Hệ Tiếp Cận</a> / Triệu Chứng Lâm Sàng
          </div>
          <h1 style="font-size: 1.75rem; font-weight: 800; color: var(--color-text, #1e293b); margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-stethoscope" style="color: var(--color-primary, #0284c7);"></i> Tiếp Cận Triệu Chứng Lâm Sàng & Cờ Đỏ Cấp Cứu
          </h1>
        </div>
        
        <div style="display: flex; gap: 0.5rem;">
          <a href="#/approaches" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Quay lại
          </a>
        </div>
      </div>

      <!-- Main Layout: Sidebar & Content -->
      <div style="display: grid; grid-template-columns: 280px 1fr; gap: 1.5rem;" class="symptoms-layout">
        <!-- Sidebar Navigation -->
        <div>
          <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
            <div style="padding: 0.75rem 1rem; background: var(--color-bg, #f8fafc); border-bottom: 1px solid var(--color-border, #e2e8f0); font-weight: 700; font-size: 0.85rem; color: var(--color-text-muted, #64748b);">
              CÁC TRIỆU CHỨNG HỆ THỐNG
            </div>
            <div style="display: flex; flex-direction: column;">
              ${Object.values(SYMPTOMS_APPROACH_DATA).map(item => `
                <button onclick="window.switchSymptomItem('${item.id}')" class="symp-nav-btn ${item.id === current.id ? 'active' : ''}" style="text-align: left; padding: 0.85rem 1rem; border: none; background: ${item.id === current.id ? 'rgba(2, 132, 199, 0.08)' : 'transparent'}; border-left: 4px solid ${item.id === current.id ? 'var(--color-primary, #0284c7)' : 'transparent'}; border-bottom: 1px solid var(--color-border, #f1f5f9); cursor: pointer; font-weight: ${item.id === current.id ? '700' : '600'}; font-size: 0.875rem; color: ${item.id === current.id ? 'var(--color-primary, #0284c7)' : 'var(--color-text, #334155)'}; display: flex; align-items: center; gap: 0.6rem;">
                  <span style="font-size: 1.1rem;">${item.icon}</span>
                  <span style="line-height: 1.3;">${item.name.split('(')[0]}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Detail Content Area -->
        <div id="symptomDetailContainer">
          ${renderSymptomContent(current)}
        </div>
      </div>
    </div>
  `;
}

function renderSymptomContent(item: SymptomApproachData): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.75rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
      <!-- Title Header -->
      <div style="border-bottom: 2px solid var(--color-primary, #0284c7); padding-bottom: 1rem; margin-bottom: 1.5rem;">
        <div style="font-size: 2rem; margin-bottom: 0.25rem;">${item.icon}</div>
        <h2 style="font-size: 1.5rem; font-weight: 800; color: var(--color-text, #1e293b); margin: 0 0 0.5rem 0;">
          ${item.name}
        </h2>
      </div>

      <!-- Red Flags Warning Card -->
      <div style="margin-bottom: 1.5rem; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 1.25rem;">
        <h3 style="font-size: 1.05rem; font-weight: 800; color: #b91c1c; margin: 0 0 0.75rem 0; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-triangle-exclamation"></i> CỜ ĐỎ BÁO ĐỘNG NGUY HIỂM (RED FLAGS)
        </h3>
        <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.875rem; color: #991b1b; line-height: 1.6;">
          ${item.redFlags.map(rf => `<li><strong>${rf}</strong></li>`).join('')}
        </ul>
      </div>

      <!-- Immediate Actions -->
      <div style="margin-bottom: 1.5rem; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 1.25rem;">
        <h3 style="font-size: 1.05rem; font-weight: 800; color: #1e40af; margin: 0 0 0.75rem 0; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-bolt"></i> XỬ TRÍ BAN ĐẦU & CẬN LÂM SÀNG CẤP (IMMEDIATE ACTIONS)
        </h3>
        <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.875rem; color: #1e3a8a; line-height: 1.6;">
          ${item.immediateActions.map(act => `<li>${act}</li>`).join('')}
        </ul>
      </div>

      <!-- Differential Diagnoses -->
      <div style="margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #1e293b); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-sitemap" style="color: var(--color-primary, #0284c7);"></i> Chẩn Đoán Phân Biệt & Dấu Hiệu Phân Biệt
        </h3>

        ${item.differentialCategories.map(cat => `
          <div style="margin-bottom: 1.25rem;">
            <div style="font-weight: 700; font-size: 0.95rem; color: var(--color-primary, #0284c7); margin-bottom: 0.5rem;">
              • ${cat.groupName}
            </div>
            <div style="display: flex; flex-direction: column; gap: 0.75rem;">
              ${cat.conditions.map(cond => `
                <div style="border: 1px solid var(--color-border, #e2e8f0); border-radius: 6px; padding: 0.85rem 1rem; background: var(--color-bg, #f8fafc);">
                  <div style="font-weight: 700; font-size: 0.9rem; color: var(--color-text, #1e293b); margin-bottom: 0.25rem;">
                    ${cond.name}
                  </div>
                  <div style="font-size: 0.85rem; color: var(--color-text, #334155); margin-bottom: 0.25rem;">
                    <strong>Đặc điểm lâm sàng:</strong> ${cond.hallmark}
                  </div>
                  <div style="font-size: 0.8rem; color: var(--color-text-muted, #64748b);">
                    <i class="fa-solid fa-vial"></i> <strong>Khảo sát xác định:</strong> ${cond.investigation}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Clinical Pearls -->
      <div style="padding: 1rem; background: rgba(2, 132, 199, 0.06); border-left: 4px solid var(--color-primary, #0284c7); border-radius: 6px;">
        <div style="font-weight: 700; font-size: 0.9rem; color: var(--color-primary, #0284c7); margin-bottom: 0.35rem;">
          💡 KINH NGHIỆM THỰC HÀNH LÂM SÀNG (CLINICAL PEARLS)
        </div>
        <ul style="margin: 0; padding-left: 1.25rem; font-size: 0.85rem; color: var(--color-text, #334155); line-height: 1.5;">
          ${item.clinicalPearls.map(pearl => `<li>${pearl}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

// Global Handlers
if (typeof window !== 'undefined') {
  (window as any).switchSymptomItem = (id: string) => {
    const item = SYMPTOMS_APPROACH_DATA[id];
    const container = document.getElementById('symptomDetailContainer');
    if (item && container) {
      container.innerHTML = renderSymptomContent(item);
    }
    document.querySelectorAll('.symp-nav-btn').forEach(b => {
      (b as HTMLElement).style.background = 'transparent';
      (b as HTMLElement).style.borderLeftColor = 'transparent';
      (b as HTMLElement).style.color = 'var(--color-text, #334155)';
    });
    const cur = (event?.target as HTMLElement)?.closest('.symp-nav-btn') as HTMLElement;
    if (cur) {
      cur.style.background = 'rgba(2, 132, 199, 0.08)';
      cur.style.borderLeftColor = 'var(--color-primary, #0284c7)';
      cur.style.color = 'var(--color-primary, #0284c7)';
    }
  };
}
