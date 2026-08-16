/**
 * CliniPortal — Renal & Hepatic Dose Optimizer SPA View (TypeScript)
 * Path: src/content/pharmacology/tools/dose-optimizer-view.ts
 */

import { DRUG_RECS } from './dose-optimizer';

export function renderDoseOptimizerView(): string {
  return `
    <div class="dose-optimizer-container animate-fade-in" style="max-width: 1200px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/pharmacology" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Dược Lý Lâm Sàng</a> / Tối Ưu Hóa Liều
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; color: #0284c7; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-calculator"></i> Máy Tính Hiệu Chỉnh Liều Thuốc (CrCl / Chức Năng Gan)
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Tính toán độ thanh thải Creatinine (Cockcroft-Gault) và tra cứu khuyến cáo liều an toàn cho Enoxaparin, Metformin, Vancomycin, DOACs, Colchicine...
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/pharmacology/tra-cuu-thuoc" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-magnifying-glass"></i> Tra Cứu Thuốc
          </a>
        </div>
      </div>

      <!-- Main Calculator Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
        <!-- Input Panel -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1rem;">
            <i class="fa-solid fa-user" style="color: #0284c7;"></i> Thông Số Bệnh Nhân & Thuốc Mục Tiêu
          </h3>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="font-size: 0.85rem; font-weight: 600; color: #334155;">Tuổi (năm):</label>
              <input type="number" id="opt-age" value="65" min="18" max="110" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px;" oninput="window.calcDoseOptimization()" />
            </div>
            <div>
              <label style="font-size: 0.85rem; font-weight: 600; color: #334155;">Giới tính:</label>
              <select id="opt-gender" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px;" onchange="window.calcDoseOptimization()">
                <option value="male" selected>Nam</option>
                <option value="female">Nữ (× 0.85)</option>
              </select>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
            <div>
              <label style="font-size: 0.85rem; font-weight: 600; color: #334155;">Cân nặng (kg):</label>
              <input type="number" id="opt-weight" value="60" min="30" max="180" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px;" oninput="window.calcDoseOptimization()" />
            </div>
            <div>
              <label style="font-size: 0.85rem; font-weight: 600; color: #334155;">Creatinine máu (μmol/L):</label>
              <input type="number" id="opt-scr" value="180" min="30" max="1500" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px;" oninput="window.calcDoseOptimization()" />
            </div>
          </div>

          <div style="margin-top: 1.25rem;">
            <label style="font-size: 0.85rem; font-weight: 700; color: #0284c7; display: block; margin-bottom: 0.4rem;">Chọn Thuốc Cần Hiệu Chỉnh Liều:</label>
            <select id="opt-drug" style="width: 100%; padding: 0.75rem; border: 2px solid #0284c7; border-radius: 8px; font-weight: 600; font-size: 0.95rem;" onchange="window.calcDoseOptimization()">
              <option value="enoxaparin">Enoxaparin (LMWH)</option>
              <option value="metformin">Metformin</option>
              <option value="vancomycin">Vancomycin</option>
              <option value="digoxin">Digoxin</option>
              <option value="rivaroxaban">Rivaroxaban (Xarelto)</option>
              <option value="colchicine">Colchicine</option>
              <option value="allopurinol">Allopurinol</option>
            </select>
          </div>
        </div>

        <!-- Result Box -->
        <div style="background: linear-gradient(135deg, rgba(2,132,199,0.06) 0%, rgba(219,39,119,0.02) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #0284c7; background: #e0f2fe; padding: 0.25rem 0.6rem; border-radius: 6px;">Chức Năng Thận</span>
              <span id="opt-crcl-badge" style="font-size: 0.8rem; font-weight: 700; color: #ea580c; background: #ffedd5; padding: 0.25rem 0.6rem; border-radius: 6px;">Suy thận trung bình</span>
            </div>

            <div style="text-align: center; padding: 1rem 0; border-bottom: 1px solid var(--color-border, #f1f5f9);">
              <div style="font-size: 0.85rem; color: #64748b;">Độ thanh thải Creatinine (Cockcroft-Gault):</div>
              <div id="opt-crcl-val" style="font-size: 3rem; font-weight: 800; color: #0284c7;">28.5 <span style="font-size: 1.15rem;">mL/min</span></div>
            </div>

            <div style="margin-top: 1.25rem;">
              <h4 style="font-size: 0.9rem; font-weight: 700; color: #334155; margin: 0 0 0.5rem 0;">📋 Khuyến Cáo Liều Điều Trị:</h4>
              <div id="opt-rec-text" style="background: #f8fafc; border-left: 4px solid #ea580c; padding: 1rem; border-radius: 0 8px 8px 0; font-size: 0.95rem; font-weight: 600; color: #0f172a; line-height: 1.5;">
                Giảm 50% liều: 1 mg/kg x 1 lần/ngày (thay vì 2 lần/ngày).
              </div>
              <p id="opt-rec-note" style="font-size: 0.85rem; color: #64748b; margin-top: 0.5rem;">
                Thận trọng theo dõi chỉ số Anti-Xa và dấu hiệu xuất huyết.
              </p>
            </div>
          </div>

          <div style="background: #f8fafc; padding: 0.6rem 0.85rem; border-radius: 6px; font-size: 0.75rem; color: #94a3b8;">
            * Công thức Cockcroft-Gault: CrCl = [(140 - Tuổi) × Cân nặng (kg)] / [0.814 × SCr (μmol/L)] (× 0.85 nếu là Nữ).
          </div>
        </div>
      </div>
    </div>
  `;
}

// Global Window Bindings
declare global {
  interface Window {
    calcDoseOptimization: () => void;
  }
}

if (typeof window !== 'undefined') {
  window.calcDoseOptimization = () => {
    const age = parseFloat((document.getElementById('opt-age') as HTMLInputElement)?.value || '65');
    const gender = (document.getElementById('opt-gender') as HTMLSelectElement)?.value || 'male';
    const weight = parseFloat((document.getElementById('opt-weight') as HTMLInputElement)?.value || '60');
    const scr = parseFloat((document.getElementById('opt-scr') as HTMLInputElement)?.value || '180');
    const drugKey = (document.getElementById('opt-drug') as HTMLSelectElement)?.value || 'enoxaparin';

    if (scr <= 0) return;

    let crcl = ((140 - age) * weight) / (0.814 * scr);
    if (gender === 'female') crcl *= 0.85;

    const crclEl = document.getElementById('opt-crcl-val');
    const badgeEl = document.getElementById('opt-crcl-badge');
    const recTextEl = document.getElementById('opt-rec-text');
    const recNoteEl = document.getElementById('opt-rec-note');

    if (crclEl) crclEl.innerHTML = `${crcl.toFixed(1)} <span style="font-size: 1.15rem;">mL/min</span>`;

    if (badgeEl) {
      if (crcl >= 60) {
        badgeEl.textContent = 'Chức năng thận tốt';
        badgeEl.style.background = '#dcfce7';
        badgeEl.style.color = '#16a34a';
      } else if (crcl >= 30) {
        badgeEl.textContent = 'Suy thận trung bình';
        badgeEl.style.background = '#ffedd5';
        badgeEl.style.color = '#ea580c';
      } else {
        badgeEl.textContent = 'Suy thận nặng (CrCl < 30)';
        badgeEl.style.background = '#fee2e2';
        badgeEl.style.color = '#dc2626';
      }
    }

    const drugHandler = DRUG_RECS[drugKey];
    if (drugHandler && recTextEl && recNoteEl) {
      const rec = drugHandler.calc(crcl);
      recTextEl.textContent = rec.text;
      recNoteEl.textContent = rec.note;

      if (rec.status === 'status-contraindicated') {
        recTextEl.style.borderLeftColor = '#dc2626';
        recTextEl.style.background = '#fef2f2';
        recTextEl.style.color = '#991b1b';
      } else if (rec.status === 'status-reduced') {
        recTextEl.style.borderLeftColor = '#ea580c';
        recTextEl.style.background = '#fff7ed';
        recTextEl.style.color = '#9a3412';
      } else {
        recTextEl.style.borderLeftColor = '#16a34a';
        recTextEl.style.background = '#f0fdf4';
        recTextEl.style.color = '#166534';
      }
    }
  };
}
