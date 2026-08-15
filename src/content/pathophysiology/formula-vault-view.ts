/**
 * CliniPortal — Physiology Formula Vault SPA View (TypeScript)
 * Path: src/content/pathophysiology/formula-vault-view.ts
 */

import { PHYSIO_FORMULAS_DATA } from './data';

export function renderFormulaVaultView(): string {
  return `
    <div class="formula-vault-container animate-fade-in" style="max-width: 1300px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/pathophysiology" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Cơ Sở Y Khoa</a> / Kho Công Thức Sinh Lý
          </div>
          <h1 style="font-size: 1.85rem; font-weight: 800; color: #0284c7; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-calculator"></i> Kho Công Thức Sinh Lý Học & Máy Tính Tương Tác
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Tính toán nhanh Anion Gap, Công thức Winters bù hô hấp, Phân suất thải Natri (FENa) và các hằng số sinh lý vi mạch.
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/pathophysiology" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Cơ Sở Y Khoa Hub
          </a>
        </div>
      </div>

      <!-- Formula Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 1.5rem;">
        
        <!-- Formula 1: Anion Gap -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
          <span style="font-size: 0.75rem; font-weight: 700; color: #0284c7; background: #f0f9ff; padding: 0.2rem 0.5rem; border-radius: 4px; text-transform: uppercase;">Khí Máu & Toan Kiềm</span>
          <h3 style="font-size: 1.15rem; font-weight: 700; margin: 0.5rem 0;">1. Khoảng Trống Anion Máu (Anion Gap - AG)</h3>
          <div style="font-family: monospace; font-size: 0.9rem; background: #f8fafc; padding: 0.6rem; border-radius: 6px; margin-bottom: 1rem; color: #0f172a;">
            AG = [Na+] - ([Cl-] + [HCO3-])
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; margin-bottom: 1rem;">
            <div>
              <label style="font-size: 0.75rem; color: #64748b;">Na+ (mmol/L):</label>
              <input type="number" id="ag-na" value="140" style="width: 100%; padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 6px;" oninput="window.calcAg()" />
            </div>
            <div>
              <label style="font-size: 0.75rem; color: #64748b;">Cl- (mmol/L):</label>
              <input type="number" id="ag-cl" value="104" style="width: 100%; padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 6px;" oninput="window.calcAg()" />
            </div>
            <div>
              <label style="font-size: 0.75rem; color: #64748b;">HCO3- (mmol/L):</label>
              <input type="number" id="ag-hco3" value="24" style="width: 100%; padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 6px;" oninput="window.calcAg()" />
            </div>
          </div>

          <div style="background: #f8fafc; border-radius: 8px; padding: 0.75rem; text-align: center;">
            <div style="font-size: 0.8rem; color: #64748b;">Kết quả Anion Gap:</div>
            <div id="ag-result" style="font-size: 1.75rem; font-weight: 800; color: #0284c7;">12 mmol/L</div>
            <div style="font-size: 0.75rem; color: #16a34a; font-weight: 600;">Bình thường (8 - 12 mmol/L)</div>
          </div>
        </div>

        <!-- Formula 2: Winters Formula -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
          <span style="font-size: 0.75rem; font-weight: 700; color: #7c3aed; background: #faf5ff; padding: 0.2rem 0.5rem; border-radius: 4px; text-transform: uppercase;">Bù Trừ Hô Hấp</span>
          <h3 style="font-size: 1.15rem; font-weight: 700; margin: 0.5rem 0;">2. Công Thức Winters (Toan Chuyển Hóa)</h3>
          <div style="font-family: monospace; font-size: 0.9rem; background: #f8fafc; padding: 0.6rem; border-radius: 6px; margin-bottom: 1rem; color: #0f172a;">
            PaCO2 Dự Đoán = (1.5 × [HCO3-]) + 8 (± 2)
          </div>

          <div style="margin-bottom: 1rem;">
            <label style="font-size: 0.75rem; color: #64748b;">HCO3- đo được (mmol/L):</label>
            <input type="number" id="winters-hco3" value="15" style="width: 100%; padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 6px;" oninput="window.calcWinters()" />
          </div>

          <div style="background: #f8fafc; border-radius: 8px; padding: 0.75rem; text-align: center;">
            <div style="font-size: 0.8rem; color: #64748b;">PaCO2 Kỳ Vọng:</div>
            <div id="winters-result" style="font-size: 1.75rem; font-weight: 800; color: #7c3aed;">30.5 ± 2 mmHg</div>
            <div style="font-size: 0.75rem; color: #64748b;">Khoảng bù đủ: 28.5 - 32.5 mmHg</div>
          </div>
        </div>

        <!-- Formula 3: FENa -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
          <span style="font-size: 0.75rem; font-weight: 700; color: #059669; background: #ecfdf5; padding: 0.2rem 0.5rem; border-radius: 4px; text-transform: uppercase;">Thận Học</span>
          <h3 style="font-size: 1.15rem; font-weight: 700; margin: 0.5rem 0;">3. Phân Suất Thải Natri (FENa)</h3>
          <div style="font-family: monospace; font-size: 0.85rem; background: #f8fafc; padding: 0.6rem; border-radius: 6px; margin-bottom: 1rem; color: #0f172a;">
            FENa = ([UNa] × [PCr] / [PNa] × [UCr]) × 100
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 1rem;">
            <div>
              <label style="font-size: 0.75rem; color: #64748b;">UNa (mmol/L):</label>
              <input type="number" id="fena-una" value="15" style="width: 100%; padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 6px;" oninput="window.calcFena()" />
            </div>
            <div>
              <label style="font-size: 0.75rem; color: #64748b;">PNa (mmol/L):</label>
              <input type="number" id="fena-pna" value="140" style="width: 100%; padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 6px;" oninput="window.calcFena()" />
            </div>
            <div>
              <label style="font-size: 0.75rem; color: #64748b;">UCr (μmol/L):</label>
              <input type="number" id="fena-ucr" value="10000" style="width: 100%; padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 6px;" oninput="window.calcFena()" />
            </div>
            <div>
              <label style="font-size: 0.75rem; color: #64748b;">PCr (μmol/L):</label>
              <input type="number" id="fena-pcr" value="250" style="width: 100%; padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 6px;" oninput="window.calcFena()" />
            </div>
          </div>

          <div style="background: #f8fafc; border-radius: 8px; padding: 0.75rem; text-align: center;">
            <div style="font-size: 0.8rem; color: #64748b;">Kết quả FENa:</div>
            <div id="fena-result" style="font-size: 1.75rem; font-weight: 800; color: #059669;">0.27%</div>
            <div id="fena-desc" style="font-size: 0.75rem; color: #16a34a; font-weight: 600;">&lt; 1%: Gợi ý AKI trước thận</div>
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
}
