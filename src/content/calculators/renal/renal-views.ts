import { render_renal_function_View } from './renal-function-view';
import { render_dg_abg_studio_View } from './dg-abg-studio-view';
import { render_electrolyte_studio_View } from './electrolyte-studio-view';
import { render_dg_nguyen_nhan_aki_View } from './dg-nguyen-nhan-aki-view';

import { initRenalStudio } from './renal-function';

export type RenalToolTab = 'chuc-nang-than' | 'khi-mau' | 'electrolyte' | 'aki-cause';

export function renderRenalToolsView(activeTab: RenalToolTab = 'chuc-nang-than'): string {
  setTimeout(() => {
    const w = typeof window !== 'undefined' ? (window as any) : {};
    if (activeTab === 'chuc-nang-than') initRenalStudio();
    if (activeTab === 'khi-mau' && (w.recalcAbg || w.calcAg)) (w.recalcAbg || w.calcAg)();
    if (activeTab === 'electrolyte' && w.recalcElectrolyte) w.recalcElectrolyte();
    if (activeTab === 'aki-cause' && w.recalcAki) w.recalcAki();
  }, 50);

  return `
    <div class="renal-tools-container animate-fade-in" style="max-width: 1440px; margin: 0 auto; padding: 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/calculators" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Công Cụ & Thang Điểm</a> / Thận & Điện Giải
          </div>
          <h1 style="font-size: 1.75rem; font-weight: 800; color: #0284c7; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-filter"></i> Công Cụ Thận, Điện Giải, Toan Kiềm & AKI
          </h1>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/calculators" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Danh sách công cụ
          </a>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div style="display: flex; gap: 0.5rem; border-bottom: 2px solid var(--color-border, #e2e8f0); margin-bottom: 1.5rem; overflow-x: auto; padding-bottom: 0.5rem;">
        <button class="renal-tab-btn ${activeTab === 'chuc-nang-than' ? 'active' : ''}" onclick="window.switchRenalTab('chuc-nang-than')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'chuc-nang-than' ? '#0284c7' : 'transparent'}; color: ${activeTab === 'chuc-nang-than' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-calculator"></i> eGFR (CKD-EPI 2021 & Cockcroft-Gault)
        </button>
        <button class="renal-tab-btn ${activeTab === 'khi-mau' ? 'active' : ''}" onclick="window.switchRenalTab('khi-mau')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'khi-mau' ? '#0284c7' : 'transparent'}; color: ${activeTab === 'khi-mau' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-fire-flame-curved"></i> Khí Máu Động Mạch (ABG Studio)
        </button>
        <button class="renal-tab-btn ${activeTab === 'electrolyte' ? 'active' : ''}" onclick="window.switchRenalTab('electrolyte')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'electrolyte' ? '#0284c7' : 'transparent'}; color: ${activeTab === 'electrolyte' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-flask"></i> Rối Loạn Điện Giải (Na / K / Ca)
        </button>
        <button class="renal-tab-btn ${activeTab === 'aki-cause' ? 'active' : ''}" onclick="window.switchRenalTab('aki-cause')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'aki-cause' ? '#0284c7' : 'transparent'}; color: ${activeTab === 'aki-cause' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-magnifying-glass-chart"></i> Đánh Giá Nguyên Nhân AKI
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="renalContentArea">
        ${renderActiveRenalTab(activeTab)}
      </div>
    </div>
  `;
}

function renderActiveRenalTab(tab: RenalToolTab): string {
  switch (tab) {
    case 'chuc-nang-than':
      return render_renal_function_View();
    case 'khi-mau':
      return render_dg_abg_studio_View();
    case 'electrolyte':
      return render_electrolyte_studio_View();
    case 'aki-cause':
      return render_dg_nguyen_nhan_aki_View();
    default:
      return render_renal_function_View();
  }
}

// 1. CHỨC NĂNG THẬN (CKD-EPI 2021 & COCKCROFT-GAULT)
export function renderChucNangThanContent(): string {
  return `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1rem;">
          <i class="fa-solid fa-user" style="color: #0284c7;"></i> Thông Số Bệnh Nhân & Creatinine
        </h3>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Tuổi (năm):</label>
            <input type="number" id="ren-age" value="62" min="18" max="110" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px;" oninput="window.recalcEgfr()" />
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Giới tính:</label>
            <select id="ren-gender" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px;" onchange="window.recalcEgfr()">
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Cân nặng (kg):</label>
            <input type="number" id="ren-weight" value="65" min="30" max="150" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px;" oninput="window.recalcEgfr()" />
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Chiều cao (cm):</label>
            <input type="number" id="ren-height" value="165" min="100" max="220" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px;" oninput="window.recalcEgfr()" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Creatinine huyết thanh (Scr):</label>
            <input type="number" id="ren-cr" value="110" step="1" min="10" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px;" oninput="window.recalcEgfr()" />
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Đơn vị:</label>
            <select id="ren-cr-unit" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px;" onchange="window.recalcEgfr()">
              <option value="umol">μmol/L</option>
              <option value="mg">mg/dL</option>
            </select>
          </div>
        </div>
      </div>

      <!-- KẾT QUẢ eGFR -->
      <div style="background: linear-gradient(135deg, rgba(2,132,199,0.06) 0%, rgba(16,185,129,0.02) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #0284c7; background: #e0f2fe; padding: 0.25rem 0.6rem; border-radius: 6px;">Độ Lọc Cầu Thận (CKD-EPI 2021)</span>
          
          <div style="text-align: center; padding: 1.5rem 0;">
            <div style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">eGFR (CKD-EPI 2021 không dùng chủng tộc):</div>
            <div id="egfr-epi-val" style="font-size: 3.5rem; font-weight: 800; color: #0284c7;">62.4</div>
            <div style="font-size: 0.9rem; color: var(--color-text-muted, #64748b);">mL/min/1.73 m² (KDIGO G2 — Giảm nhẹ chức năng thận)</div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; text-align: center;">
            <div style="background: #f8fafc; border-radius: 8px; padding: 0.75rem;">
              <div style="font-size: 0.75rem; color: #64748b;">Cockcroft-Gault (CrCl):</div>
              <div id="crcl-cg-val" style="font-size: 1.5rem; font-weight: 700; color: #334155;">60.2 mL/min</div>
            </div>
            <div style="background: #f8fafc; border-radius: 8px; padding: 0.75rem;">
              <div style="font-size: 0.75rem; color: #64748b;">Diện tích da BSA:</div>
              <div id="bsa-val" style="font-size: 1.5rem; font-weight: 700; color: #334155;">1.72 m²</div>
            </div>
          </div>
        </div>

        <div style="background: #f8fafc; border-left: 4px solid #0284c7; padding: 0.85rem 1rem; border-radius: 0 8px 8px 0; font-size: 0.825rem; color: var(--color-text, #334155); margin-top: 1rem;">
          💊 <strong>Khuyến cáo chỉnh liều thuốc:</strong> FDA khuyến cáo sử dụng Cockcroft-Gault (CrCl) để chỉnh liều hầu hết các loại thuốc kháng sinh và kháng đông (NOACs).
        </div>
      </div>
    </div>
  `;
}

// 2. KHÍ MÁU ĐỘNG MẠCH (ABG)
export function renderKhiMauContent(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #0284c7; margin-bottom: 0.75rem;">
        <i class="fa-solid fa-fire-flame-curved"></i> Arterial Blood Gas (ABG) & Davenport Studio
      </h3>
      <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">
        Quy trình 6 bước đọc khí máu động mạch chuẩn quốc tế: Xác định pH (Toan/Kiềm) → Rối loạn nguyên phát (Hô hấp/Chuyển hóa) → Đáp ứng bù trừ (Winter's formula) → Tính Anion Gap (AG) → Delta-Delta Ratio (Phát hiện toan kiềm hỗn hợp) → Khí máu Oxy hóa phế nang (A-a gradient).
      </p>
    </div>
  `;
}

// 3. RỐI LOẠN ĐIỆN GIẢI
export function renderElectrolyteContent(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #0284c7; margin-bottom: 0.75rem;">
        <i class="fa-solid fa-flask"></i> Electrolyte Pro Studio (Hạ/Tăng Natri, Kali & Canxi)
      </h3>
      <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">
        Phương trình Adrogué-Madias tính lượng Natri thay đổi theo mỗi lít dịch truyền (NaCl 3%, NaCl 0.9%), kiểm soát tốc độ nâng Natri phòng hội chứng tiêu hủy Myelin cầu não (ODS: không quá 8 mmol/L trong 24h) và Phác đồ cấp cứu Tăng Kali máu dọa ngừng tim (Calcium Gluconate + Insulin/Glucose + Khí dung Salbutamol).
      </p>
    </div>
  `;
}

// 4. NGUYÊN NHÂN AKI
export function renderAkiCauseContent(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #0284c7; margin-bottom: 0.75rem;">
        <i class="fa-solid fa-magnifying-glass-chart"></i> Phân Loại Nguyên Nhân Tổn Thương Thận Cấp (AKI)
      </h3>
      <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">
        Phân biệt AKI Trước thận (Pre-renal: FeNa &lt; 1%, FeUrea &lt; 35%, BUN/Cr &gt; 20), Tại thận (Intrinsic ATN/AIN: FeNa &gt; 2%, trụ hạt nâu bùn) và Sau thận (Post-renal: Tắc nghẽn đường tiểu trên Siêu âm hệ niệu).
      </p>
    </div>
  `;
}

// Global Window Bindings
declare global {
  interface Window {
    switchRenalTab: (tab: RenalToolTab) => void;
    recalcEgfr: () => void;
  }
}

if (typeof window !== 'undefined') {
  window.switchRenalTab = (tab: RenalToolTab) => {
    const container = document.getElementById('app');
    if (container) {
      container.innerHTML = renderRenalToolsView(tab);
    }
  };

  window.recalcEgfr = () => {
    const age = parseInt((document.getElementById('ren-age') as HTMLInputElement)?.value || '62', 10);
    const gender = (document.getElementById('ren-gender') as HTMLSelectElement)?.value || 'male';
    const weight = parseFloat((document.getElementById('ren-weight') as HTMLInputElement)?.value || '65');
    const height = parseFloat((document.getElementById('ren-height') as HTMLInputElement)?.value || '165');
    let cr = parseFloat((document.getElementById('ren-cr') as HTMLInputElement)?.value || '110');
    const unit = (document.getElementById('ren-cr-unit') as HTMLSelectElement)?.value || 'umol';

    let crMg = unit === 'umol' ? cr / 88.4 : cr;

    // CKD-EPI 2021 Formula
    let kappa = gender === 'female' ? 0.7 : 0.9;
    let alpha = gender === 'female' ? -0.241 : -0.302;
    let genderFactor = gender === 'female' ? 1.012 : 1.0;

    let minRatio = Math.min(crMg / kappa, 1);
    let maxRatio = Math.max(crMg / kappa, 1);

    let egfr = 142 * Math.pow(minRatio, alpha) * Math.pow(maxRatio, -1.200) * Math.pow(0.9938, age) * genderFactor;

    // Cockcroft-Gault Formula
    let cg = ((140 - age) * weight) / (72 * crMg);
    if (gender === 'female') cg *= 0.85;

    // Du Bois BSA
    let bsa = 0.007184 * Math.pow(height, 0.725) * Math.pow(weight, 0.425);

    const egfrEl = document.getElementById('egfr-epi-val');
    const crclEl = document.getElementById('crcl-cg-val');
    const bsaEl = document.getElementById('bsa-val');

    if (egfrEl && crclEl && bsaEl) {
      egfrEl.textContent = egfr.toFixed(1);
      crclEl.textContent = `${cg.toFixed(1)} mL/min`;
      bsaEl.textContent = `${bsa.toFixed(2)} m²`;
    }
  };
}
