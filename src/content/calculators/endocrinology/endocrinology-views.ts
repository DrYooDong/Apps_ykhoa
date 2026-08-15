/**
 * CliniPortal — Endocrinology & Diabetes Calculators SPA Views (TypeScript)
 * Path: src/content/calculators/endocrinology/endocrinology-views.ts
 */

export function renderEndocrinologyToolsView(): string {
  return `
    <div class="endo-tools-container animate-fade-in" style="max-width: 1300px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/calculators" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Công Cụ & Thang Điểm</a> / Nội Tiết & Đái Tháo Đường
          </div>
          <h1 style="font-size: 1.75rem; font-weight: 800; color: #7c3aed; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-syringe"></i> Diabetes & Insulin Pro Studio (Phác Đồ Đái Tháo Đường & Bơm Tiêm Điện)
          </h1>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/calculators" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Danh sách công cụ
          </a>
        </div>
      </div>

      <!-- Main Insulin Calculator Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1rem;">
            <i class="fa-solid fa-calculator" style="color: #7c3aed;"></i> Tính Liều Insulin Tổng Ngày (TDD) & Phác Đồ Basal-Bolus
          </h3>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Cân nặng (kg):</label>
              <input type="number" id="ins-weight" value="60" min="30" max="150" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px;" oninput="window.recalcInsulin()" />
            </div>
            <div>
              <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Hệ số khởi liều (UI/kg):</label>
              <select id="ins-factor" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px;" onchange="window.recalcInsulin()">
                <option value="0.3">0.3 UI/kg (Bệnh nhân cao tuổi, CKD, nguy cơ hạ đường huyết)</option>
                <option value="0.5" selected>0.5 UI/kg (Khởi đầu tiêu chuẩn ĐTĐ type 2)</option>
                <option value="0.7">0.7 UI/kg (Đề kháng insulin nặng, béo phì, đang dùng Corticoid)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- KẾT QUẢ PHÂN CHIA LIỀU -->
        <div style="background: linear-gradient(135deg, rgba(124,58,237,0.06) 0%, rgba(2,132,199,0.02) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #7c3aed; background: #ede9fe; padding: 0.25rem 0.6rem; border-radius: 6px;">Phác Đồ Basal-Bolus Phân Chia 50/50</span>
            
            <div style="text-align: center; padding: 1.5rem 0;">
              <div style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">Tổng liều insulin trong ngày (TDD):</div>
              <div id="ins-tdd-val" style="font-size: 3.5rem; font-weight: 800; color: #7c3aed;">30 <span style="font-size: 1.25rem;">UI/ngày</span></div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; text-align: center;">
              <div style="background: #f8fafc; border-radius: 8px; padding: 0.75rem;">
                <div style="font-size: 0.75rem; color: #64748b;">Insulin Nền (Basal 50%):</div>
                <div id="ins-basal-val" style="font-size: 1.5rem; font-weight: 700; color: #7c3aed;">15 UI</div>
                <div style="font-size: 0.75rem; color: #64748b;">Glargine / Degludec tiêm 21h</div>
              </div>
              <div style="background: #f8fafc; border-radius: 8px; padding: 0.75rem;">
                <div style="font-size: 0.75rem; color: #64748b;">Insulin Bữa ăn (Bolus 50%):</div>
                <div id="ins-bolus-val" style="font-size: 1.5rem; font-weight: 700; color: #0284c7;">5 UI × 3 bữa</div>
                <div style="font-size: 0.75rem; color: #64748b;">Aspart / Lispro trước ăn</div>
              </div>
            </div>
          </div>

          <div style="background: #f8fafc; border-left: 4px solid #7c3aed; padding: 0.85rem 1rem; border-radius: 0 8px 8px 0; font-size: 0.825rem; color: var(--color-text, #334155); margin-top: 1rem;">
            🎯 <strong>Mục tiêu đường huyết nội trú (ADA 2026):</strong><br>
            - Bệnh nhân nặng/ICU: 7.8 - 10.0 mmol/L (140 - 180 mg/dL)<br>
            - Bệnh nhân không nặng: Trước ăn 5.6 - 7.8 mmol/L (&lt; 140 mg/dL)
          </div>
        </div>
      </div>
    </div>
  `;
}

// Global Window Bindings
declare global {
  interface Window {
    recalcInsulin: () => void;
  }
}

if (typeof window !== 'undefined') {
  window.recalcInsulin = () => {
    const w = parseFloat((document.getElementById('ins-weight') as HTMLInputElement)?.value || '60');
    const f = parseFloat((document.getElementById('ins-factor') as HTMLSelectElement)?.value || '0.5');

    const tdd = Math.round(w * f);
    const basal = Math.round(tdd * 0.5);
    const bolusTotal = tdd - basal;
    const bolusPerMeal = Math.round(bolusTotal / 3);

    const tddEl = document.getElementById('ins-tdd-val');
    const basalEl = document.getElementById('ins-basal-val');
    const bolusEl = document.getElementById('ins-bolus-val');

    if (tddEl && basalEl && bolusEl) {
      tddEl.innerHTML = `${tdd} <span style="font-size: 1.25rem;">UI/ngày</span>`;
      basalEl.textContent = `${basal} UI`;
      bolusEl.textContent = `${bolusPerMeal} UI × 3 bữa`;
    }
  };
}
