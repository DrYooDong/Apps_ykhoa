/**
 * CliniPortal — Physiology Formula Vault SPA View (TypeScript)
 * Path: src/content/pathophysiology/formula-vault-view.ts
 */

import { PHYSIO_FORMULAS_DATA } from '../data/data';

export function renderFormulaVaultView(): string {
  return `
    <div class="formula-vault-container animate-fade-in" style="max-width: 1300px; margin: 0 auto; padding: 1.5rem 1rem 3.5rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/basic-medical" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Cơ Sở Y Khoa</a> / Kho Công Thức Sinh Lý
          </div>
          <h1 style="font-size: clamp(1.4rem, 3vw, 1.85rem); font-weight: 800; color: var(--color-primary, #0284c7); margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-calculator"></i> Kho Công Thức Sinh Lý Học & Máy Tính Tương Tác
          </h1>
          <p style="font-size: 0.925rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0; line-height: 1.5;">
            Tính toán nhanh Anion Gap, Công thức Winters bù hô hấp, Phân suất thải Natri (FENa) và các hằng số sinh lý vi mạch.
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/basic-medical" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Cơ Sở Y Khoa Hub
          </a>
          <a href="#/docspace/tools" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1.5px solid var(--color-primary, #0284c7); color: var(--color-primary, #0284c7); background: rgba(2,132,199,0.08); text-decoration: none; font-size: 0.875rem; font-weight: 700;">
            <i class="fa-solid fa-stethoscope"></i> Kho Thang Điểm Lâm Sàng DocSpace
          </a>
        </div>
      </div>

      <!-- Formula Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)); gap: 1.25rem;">
        
        <!-- Formula 1: Anion Gap -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 14px; padding: 1.25rem; box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.04));">
          <span style="font-size: 0.75rem; font-weight: 700; color: #0284c7; background: rgba(2,132,199,0.12); padding: 0.2rem 0.6rem; border-radius: 6px; text-transform: uppercase;">Khí Máu & Toan Kiềm</span>
          <h3 style="font-size: 1.1rem; font-weight: 700; margin: 0.6rem 0 0.4rem; color: var(--color-text, #0f172a);">1. Khoảng Trống Anion Máu (Anion Gap - AG)</h3>
          <div style="font-family: monospace; font-size: 0.88rem; background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); padding: 0.6rem 0.8rem; border-radius: 8px; margin-bottom: 1rem; color: var(--color-text, #0f172a);">
            AG = [Na⁺] - ([Cl⁻] + [HCO₃⁻])
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(85px, 1fr)); gap: 0.5rem; margin-bottom: 1rem;">
            <div>
              <label style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted, #64748b); display: block; margin-bottom: 4px;">Na⁺ (mmol/L):</label>
              <input type="number" id="ag-na" value="140" style="width: 100%; padding: 0.55rem; font-size: 16px; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; background: var(--color-bg, #f8fafc); color: var(--color-text, #0f172a); outline: none; box-sizing: border-box;" oninput="window.calcAg()" />
            </div>
            <div>
              <label style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted, #64748b); display: block; margin-bottom: 4px;">Cl⁻ (mmol/L):</label>
              <input type="number" id="ag-cl" value="104" style="width: 100%; padding: 0.55rem; font-size: 16px; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; background: var(--color-bg, #f8fafc); color: var(--color-text, #0f172a); outline: none; box-sizing: border-box;" oninput="window.calcAg()" />
            </div>
            <div>
              <label style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted, #64748b); display: block; margin-bottom: 4px;">HCO₃⁻ (mmol/L):</label>
              <input type="number" id="ag-hco3" value="24" style="width: 100%; padding: 0.55rem; font-size: 16px; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; background: var(--color-bg, #f8fafc); color: var(--color-text, #0f172a); outline: none; box-sizing: border-box;" oninput="window.calcAg()" />
            </div>
          </div>

          <div style="background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 10px; padding: 0.85rem; text-align: center;">
            <div style="font-size: 0.78rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Kết quả Anion Gap:</div>
            <div id="ag-result" style="font-size: 1.75rem; font-weight: 800; color: #0284c7; margin: 0.2rem 0;">12 mmol/L</div>
            <div style="font-size: 0.75rem; color: #16a34a; font-weight: 700;">Bình thường (8 - 12 mmol/L)</div>
          </div>
        </div>

        <!-- Formula 2: Winters Formula -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 14px; padding: 1.25rem; box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.04));">
          <span style="font-size: 0.75rem; font-weight: 700; color: #8b5cf6; background: rgba(139,92,246,0.12); padding: 0.2rem 0.6rem; border-radius: 6px; text-transform: uppercase;">Bù Trừ Hô Hấp</span>
          <h3 style="font-size: 1.1rem; font-weight: 700; margin: 0.6rem 0 0.4rem; color: var(--color-text, #0f172a);">2. Công Thức Winters (Toan Chuyển Hóa)</h3>
          <div style="font-family: monospace; font-size: 0.88rem; background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); padding: 0.6rem 0.8rem; border-radius: 8px; margin-bottom: 1rem; color: var(--color-text, #0f172a);">
            PaCO₂ Dự Đoán = (1.5 × [HCO₃⁻]) + 8 (± 2)
          </div>

          <div style="margin-bottom: 1rem;">
            <label style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted, #64748b); display: block; margin-bottom: 4px;">HCO₃⁻ đo được (mmol/L):</label>
            <input type="number" id="winters-hco3" value="15" style="width: 100%; padding: 0.55rem; font-size: 16px; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; background: var(--color-bg, #f8fafc); color: var(--color-text, #0f172a); outline: none; box-sizing: border-box;" oninput="window.calcWinters()" />
          </div>

          <div style="background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 10px; padding: 0.85rem; text-align: center;">
            <div style="font-size: 0.78rem; color: var(--color-text-muted, #64748b); font-weight: 600;">PaCO₂ Kỳ Vọng:</div>
            <div id="winters-result" style="font-size: 1.75rem; font-weight: 800; color: #8b5cf6; margin: 0.2rem 0;">30.5 ± 2 mmHg</div>
            <div style="font-size: 0.75rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Khoảng bù đủ: 28.5 - 32.5 mmHg</div>
          </div>
        </div>

        <!-- Formula 3: FENa -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 14px; padding: 1.25rem; box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.04));">
          <span style="font-size: 0.75rem; font-weight: 700; color: #059669; background: rgba(16,185,129,0.12); padding: 0.2rem 0.6rem; border-radius: 6px; text-transform: uppercase;">Thận Học</span>
          <h3 style="font-size: 1.1rem; font-weight: 700; margin: 0.6rem 0 0.4rem; color: var(--color-text, #0f172a);">3. Phân Suất Thải Natri (FENa)</h3>
          <div style="font-family: monospace; font-size: 0.85rem; background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); padding: 0.6rem 0.8rem; border-radius: 8px; margin-bottom: 1rem; color: var(--color-text, #0f172a);">
            FENa = ([UNa] × [PCr] / [PNa] × [UCr]) × 100
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 1rem;">
            <div>
              <label style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted, #64748b); display: block; margin-bottom: 4px;">UNa (mmol/L):</label>
              <input type="number" id="fena-una" value="15" style="width: 100%; padding: 0.55rem; font-size: 16px; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; background: var(--color-bg, #f8fafc); color: var(--color-text, #0f172a); outline: none; box-sizing: border-box;" oninput="window.calcFena()" />
            </div>
            <div>
              <label style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted, #64748b); display: block; margin-bottom: 4px;">PNa (mmol/L):</label>
              <input type="number" id="fena-pna" value="140" style="width: 100%; padding: 0.55rem; font-size: 16px; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; background: var(--color-bg, #f8fafc); color: var(--color-text, #0f172a); outline: none; box-sizing: border-box;" oninput="window.calcFena()" />
            </div>
            <div>
              <label style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted, #64748b); display: block; margin-bottom: 4px;">UCr (μmol/L):</label>
              <input type="number" id="fena-ucr" value="10000" style="width: 100%; padding: 0.55rem; font-size: 16px; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; background: var(--color-bg, #f8fafc); color: var(--color-text, #0f172a); outline: none; box-sizing: border-box;" oninput="window.calcFena()" />
            </div>
            <div>
              <label style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted, #64748b); display: block; margin-bottom: 4px;">PCr (μmol/L):</label>
              <input type="number" id="fena-pcr" value="250" style="width: 100%; padding: 0.55rem; font-size: 16px; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; background: var(--color-bg, #f8fafc); color: var(--color-text, #0f172a); outline: none; box-sizing: border-box;" oninput="window.calcFena()" />
            </div>
          </div>

          <div style="background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 10px; padding: 0.85rem; text-align: center;">
            <div style="font-size: 0.78rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Kết quả FENa:</div>
            <div id="fena-result" style="font-size: 1.75rem; font-weight: 800; color: #059669; margin: 0.2rem 0;">0.27%</div>
            <div id="fena-desc" style="font-size: 0.75rem; color: #16a34a; font-weight: 700;">&lt; 1%: Gợi ý AKI trước thận (Pre-renal)</div>
          </div>
        </div>

        <!-- Formula 4: eGFR CKD-EPI & Guideline Cutoffs -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 14px; padding: 1.25rem; box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.04));">
          <span style="font-size: 0.75rem; font-weight: 700; color: #0891b2; background: rgba(8,145,178,0.12); padding: 0.2rem 0.6rem; border-radius: 6px; text-transform: uppercase;">KDIGO 2024 / EBM Dosing</span>
          <h3 style="font-size: 1.1rem; font-weight: 700; margin: 0.6rem 0 0.4rem; color: var(--color-text, #0f172a);">4. Mức Lọc Cầu Thận (eGFR) &amp; Khuyến Cáo Thuốc</h3>
          <div style="font-family: monospace; font-size: 0.85rem; background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); padding: 0.6rem 0.8rem; border-radius: 8px; margin-bottom: 1rem; color: var(--color-text, #0f172a);">
            CKD-EPI 2021 (Creatinine máu + Tuổi + Giới)
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; margin-bottom: 1rem;">
            <div>
              <label style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted, #64748b); display: block; margin-bottom: 4px;">Creatinine (μmol/L):</label>
              <input type="number" id="egfr-cr" value="120" style="width: 100%; padding: 0.55rem; font-size: 16px; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; background: var(--color-bg, #f8fafc); color: var(--color-text, #0f172a); outline: none; box-sizing: border-box;" oninput="window.calcEgfr()" />
            </div>
            <div>
              <label style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted, #64748b); display: block; margin-bottom: 4px;">Tuổi:</label>
              <input type="number" id="egfr-age" value="65" style="width: 100%; padding: 0.55rem; font-size: 16px; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; background: var(--color-bg, #f8fafc); color: var(--color-text, #0f172a); outline: none; box-sizing: border-box;" oninput="window.calcEgfr()" />
            </div>
            <div>
              <label style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted, #64748b); display: block; margin-bottom: 4px;">Giới tính:</label>
              <select id="egfr-gender" style="width: 100%; padding: 0.55rem; font-size: 14px; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; background: var(--color-bg, #f8fafc); color: var(--color-text, #0f172a); outline: none; box-sizing: border-box;" onchange="window.calcEgfr()">
                <option value="nam">Nam</option>
                <option value="nu">Nữ</option>
              </select>
            </div>
          </div>

          <div style="background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 10px; padding: 0.85rem; text-align: center;">
            <div style="font-size: 0.78rem; color: var(--color-text-muted, #64748b); font-weight: 600;">eGFR Ước Tính:</div>
            <div id="egfr-result" style="font-size: 1.75rem; font-weight: 800; color: #0891b2; margin: 0.2rem 0;">54 mL/min/1.73m²</div>
            <div id="egfr-desc" style="font-size: 0.75rem; color: #d97706; font-weight: 700;">G3a (Giảm nhẹ - vừa) — KDIGO 2024: Duy trì SGLT2i &amp; RAASi</div>
          </div>
        </div>

        <!-- Formula 5: PaO2 / FiO2 (Horowitz Ratio) -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 14px; padding: 1.25rem; box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.04));">
          <span style="font-size: 0.75rem; font-weight: 700; color: #dc2626; background: rgba(220,38,38,0.12); padding: 0.2rem 0.6rem; border-radius: 6px; text-transform: uppercase;">ARDS Berlin / Hồi Sức</span>
          <h3 style="font-size: 1.1rem; font-weight: 700; margin: 0.6rem 0 0.4rem; color: var(--color-text, #0f172a);">5. Chỉ Số P/F (PaO₂ / FiO₂ Ratio)</h3>
          <div style="font-family: monospace; font-size: 0.85rem; background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); padding: 0.6rem 0.8rem; border-radius: 8px; margin-bottom: 1rem; color: var(--color-text, #0f172a);">
            P/F = PaO₂ (mmHg) / FiO₂ (thập phân 0.21 - 1.0)
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 1rem;">
            <div>
              <label style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted, #64748b); display: block; margin-bottom: 4px;">PaO₂ Khí Máu (mmHg):</label>
              <input type="number" id="pf-pao2" value="80" style="width: 100%; padding: 0.55rem; font-size: 16px; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; background: var(--color-bg, #f8fafc); color: var(--color-text, #0f172a); outline: none; box-sizing: border-box;" oninput="window.calcPf()" />
            </div>
            <div>
              <label style="font-size: 0.75rem; font-weight: 600; color: var(--color-text-muted, #64748b); display: block; margin-bottom: 4px;">FiO₂ Thở Vào (%):</label>
              <input type="number" id="pf-fio2" value="60" style="width: 100%; padding: 0.55rem; font-size: 16px; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; background: var(--color-bg, #f8fafc); color: var(--color-text, #0f172a); outline: none; box-sizing: border-box;" oninput="window.calcPf()" />
            </div>
          </div>

          <div style="background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #e2e8f0); border-radius: 10px; padding: 0.85rem; text-align: center;">
            <div style="font-size: 0.78rem; color: var(--color-text-muted, #64748b); font-weight: 600;">Chỉ Số P/F:</div>
            <div id="pf-result" style="font-size: 1.75rem; font-weight: 800; color: #dc2626; margin: 0.2rem 0;">133.3 mmHg</div>
            <div id="pf-desc" style="font-size: 0.75rem; color: #b91c1c; font-weight: 700;">ARDS Trung Bình (P/F 100-200) — Guideline: Nằm sáp (Prone) ≥ 16h/ngày</div>
          </div>
        </div>

      </div>
    </div>
  `;
}

// Global Window Bindings
declare global {
  interface Window {
    calcAg: () => void;
    calcWinters: () => void;
    calcFena: () => void;
    calcEgfr: () => void;
    calcPf: () => void;
  }
}

if (typeof window !== 'undefined') {
  window.calcAg = () => {
    const na = parseFloat((document.getElementById('ag-na') as HTMLInputElement)?.value || '140');
    const cl = parseFloat((document.getElementById('ag-cl') as HTMLInputElement)?.value || '104');
    const hco3 = parseFloat((document.getElementById('ag-hco3') as HTMLInputElement)?.value || '24');

    const ag = na - (cl + hco3);
    const resEl = document.getElementById('ag-result');
    if (resEl) resEl.textContent = `${ag} mmol/L`;
  };

  window.calcWinters = () => {
    const hco3 = parseFloat((document.getElementById('winters-hco3') as HTMLInputElement)?.value || '15');
    const paco2 = (1.5 * hco3) + 8;
    const resEl = document.getElementById('winters-result');
    if (resEl) resEl.textContent = `${paco2.toFixed(1)} ± 2 mmHg`;
  };

  window.calcFena = () => {
    const una = parseFloat((document.getElementById('fena-una') as HTMLInputElement)?.value || '15');
    const pna = parseFloat((document.getElementById('fena-pna') as HTMLInputElement)?.value || '140');
    const ucr = parseFloat((document.getElementById('fena-ucr') as HTMLInputElement)?.value || '10000');
    const pcr = parseFloat((document.getElementById('fena-pcr') as HTMLInputElement)?.value || '250');

    if (pna * ucr === 0) return;
    const fena = ((una * pcr) / (pna * ucr)) * 100;
    const resEl = document.getElementById('fena-result');
    const descEl = document.getElementById('fena-desc');

    if (resEl) resEl.textContent = `${fena.toFixed(2)}%`;
    if (descEl) {
      if (fena < 1) {
        descEl.textContent = '< 1%: Gợi ý AKI trước thận (Pre-renal)';
        descEl.style.color = '#16a34a';
      } else if (fena > 2) {
        descEl.textContent = '> 2%: Gợi ý Hoại tử ống thận cấp (ATN) tại thận';
        descEl.style.color = '#dc2626';
      } else {
        descEl.textContent = '1 - 2%: Vùng xám (Cần kết hợp lâm sàng)';
        descEl.style.color = '#ca8a04';
      }
    }
  };

  window.calcEgfr = () => {
    const crUm = parseFloat((document.getElementById('egfr-cr') as HTMLInputElement)?.value || '120');
    const age = parseFloat((document.getElementById('egfr-age') as HTMLInputElement)?.value || '65');
    const gender = (document.getElementById('egfr-gender') as HTMLSelectElement)?.value || 'nam';

    const scr = crUm / 88.4; // mg/dL
    const isFemale = gender === 'nu';
    const kappa = isFemale ? 0.7 : 0.9;
    const alpha = isFemale ? -0.241 : -0.302;
    const minVal = Math.min(scr / kappa, 1);
    const maxVal = Math.max(scr / kappa, 1);
    const genderFactor = isFemale ? 1.012 : 1;

    const egfr = 142 * Math.pow(minVal, alpha) * Math.pow(maxVal, -1.200) * Math.pow(0.9938, age) * genderFactor;
    const resEl = document.getElementById('egfr-result');
    const descEl = document.getElementById('egfr-desc');

    if (resEl) resEl.textContent = `${Math.round(egfr)} mL/min/1.73m²`;
    if (descEl) {
      if (egfr >= 90) {
        descEl.textContent = 'G1 (Bình thường/Cao) — KDIGO: Tối ưu HA & lối sống';
        descEl.style.color = '#16a34a';
      } else if (egfr >= 60) {
        descEl.textContent = 'G2 (Giảm nhẹ) — KDIGO: Đánh giá Albumin niệu UACR';
        descEl.style.color = '#059669';
      } else if (egfr >= 45) {
        descEl.textContent = 'G3a (Giảm nhẹ-vừa) — KDIGO 2024: Chỉ định SGLT2i + RAASi';
        descEl.style.color = '#d97706';
      } else if (egfr >= 30) {
        descEl.textContent = 'G3b (Giảm vừa-nặng) — KDIGO 2024: Chỉnh liều thuốc qua thận, SGLT2i tiếp tục đến khi lọc máu';
        descEl.style.color = '#ea580c';
      } else if (egfr >= 15) {
        descEl.textContent = 'G4 (Suy thận nặng) — Chuẩn bị tạo đường vào mạch máu (AVF), ngưng Metformin';
        descEl.style.color = '#dc2626';
      } else {
        descEl.textContent = 'G5 (Suy thận giai đoạn cuối - ESKD) — Chỉ định điều trị thay thế thận (RRT/Ghép thận)';
        descEl.style.color = '#991b1b';
      }
    }
  };

  window.calcPf = () => {
    const pao2 = parseFloat((document.getElementById('pf-pao2') as HTMLInputElement)?.value || '80');
    const fio2Percent = parseFloat((document.getElementById('pf-fio2') as HTMLInputElement)?.value || '60');
    const fio2 = fio2Percent / 100;

    if (fio2 <= 0) return;
    const pf = pao2 / fio2;
    const resEl = document.getElementById('pf-result');
    const descEl = document.getElementById('pf-desc');

    if (resEl) resEl.textContent = `${pf.toFixed(1)} mmHg`;
    if (descEl) {
      if (pf > 300) {
        descEl.textContent = '> 300 mmHg: Trao đổi khí bình thường';
        descEl.style.color = '#16a34a';
      } else if (pf > 200) {
        descEl.textContent = '201 - 300 mmHg: ARDS Nhẹ — Guideline: Thở máy bảo vệ phổi Vt 6 mL/kg, PEEP 5-10';
        descEl.style.color = '#d97706';
      } else if (pf > 100) {
        descEl.textContent = '101 - 200 mmHg: ARDS Trung Bình — Guideline: Nằm sáp (Prone) ≥ 16h/ngày, PEEP cao';
        descEl.style.color = '#dc2626';
      } else {
        descEl.textContent = '≤ 100 mmHg: ARDS Nặng — Guideline: Giãn cơ sớm 48h (NMBAs), Cân nhắc ECMO VV';
        descEl.style.color = '#991b1b';
      }
    }
  };
}
