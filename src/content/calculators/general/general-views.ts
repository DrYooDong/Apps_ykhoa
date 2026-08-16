/**
 * CliniPortal — General Clinical Tools & Research SPA View (TypeScript)
 * Path: src/content/calculators/general/general-views.ts
 */

import { EQUIV_DATABASE } from './quy-doi-lieu-tuong-duong';

import { render_quy_doi_lieu_tuong_duong_View } from './quy-doi-lieu-tuong-duong-view';
import { render_nckh_tinh_co_mau_View } from './nckh-tinh-co-mau-view';
import { render_formula_vault_View } from './formula-vault-view';
import { render_tracuu_ma_icd10_View } from './tracuu-ma-icd10-view';
import { render_benh_an_noi_khoa_View } from './benh-an-noi-khoa-view';
import { initSampleSizeCalculator } from './nckh-tinh-co-mau';
import { initVirtualICDList } from './tracuu-ma-icd10';

export function getDrugNames(category: string): string[] {
  const cat = EQUIV_DATABASE[category];
  return cat ? cat.drugs.map(d => d.name) : [];
}

export function calcEquiv(catKey: string, srcName: string, dose: number, targetName: string) {
  const cat = EQUIV_DATABASE[catKey];
  if (!cat) return null;
  const src = cat.drugs.find(d => d.name === srcName);
  const target = cat.drugs.find(d => d.name === targetName);
  if (!src || !target) return null;

  let targetDose = 0;
  if (catKey === 'opioid') {
    const ome = dose * (src.factor || 1);
    targetDose = ome / (target.factor || 1);
  } else {
    const standardUnits = dose / (src.equiv || 1);
    targetDose = standardUnits * (target.equiv || 1);
  }
  return {
    targetDose: parseFloat(targetDose.toFixed(2)),
    unit: cat.unit,
    targetDrug: targetName
  };
}

export type GeneralToolTab = 'quy-doi-lieu' | 'tinh-co-mau' | 'icd10' | 'benh-an' | 'formula-vault';

export function renderGeneralToolsView(activeTab: GeneralToolTab = 'quy-doi-lieu'): string {
  setTimeout(() => {
    if (activeTab === 'tinh-co-mau') initSampleSizeCalculator();
  }, 50);

  return `
    <div class="general-tools-container animate-fade-in" style="max-width: 1440px; margin: 0 auto; padding: 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/calculators" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Công Cụ & Thang Điểm</a> / Công Cụ Chung & NCKH
          </div>
          <h1 style="font-size: 1.75rem; font-weight: 800; color: var(--color-primary, #0284c7); margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-toolbox"></i> Công Cụ Chung, Quy Đổi Liều & Thống Kê NCKH
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
        <button class="general-tab-btn ${activeTab === 'quy-doi-lieu' ? 'active' : ''}" onclick="window.switchGeneralToolTab('quy-doi-lieu')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'quy-doi-lieu' ? 'var(--color-primary, #0284c7)' : 'transparent'}; color: ${activeTab === 'quy-doi-lieu' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-scale-balanced"></i> Quy Đổi Liều Tương Đương
        </button>
        <button class="general-tab-btn ${activeTab === 'tinh-co-mau' ? 'active' : ''}" onclick="window.switchGeneralToolTab('tinh-co-mau')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'tinh-co-mau' ? 'var(--color-primary, #0284c7)' : 'transparent'}; color: ${activeTab === 'tinh-co-mau' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-calculator"></i> Tính Cỡ Mẫu NCKH
        </button>
        <button class="general-tab-btn ${activeTab === 'formula-vault' ? 'active' : ''}" onclick="window.switchGeneralToolTab('formula-vault')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'formula-vault' ? 'var(--color-primary, #0284c7)' : 'transparent'}; color: ${activeTab === 'formula-vault' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-square-root-variable"></i> Kho Công Thức Sinh Lý
        </button>
        <button class="general-tab-btn ${activeTab === 'icd10' ? 'active' : ''}" onclick="window.switchGeneralToolTab('icd10')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'icd10' ? 'var(--color-primary, #0284c7)' : 'transparent'}; color: ${activeTab === 'icd10' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-book-medical"></i> Tra Cứu ICD-10 & BHYT
        </button>
        <button class="general-tab-btn ${activeTab === 'benh-an' ? 'active' : ''}" onclick="window.switchGeneralToolTab('benh-an')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'benh-an' ? 'var(--color-primary, #0284c7)' : 'transparent'}; color: ${activeTab === 'benh-an' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-file-waveform"></i> Mẫu Bệnh Án Nội Khoa
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="generalToolContentArea">
        ${renderActiveGeneralTab(activeTab)}
      </div>
    </div>
  `;
}

function renderActiveGeneralTab(tab: GeneralToolTab): string {
  switch (tab) {
    case 'quy-doi-lieu':
      return render_quy_doi_lieu_tuong_duong_View();
    case 'tinh-co-mau':
      return render_nckh_tinh_co_mau_View();
    case 'formula-vault':
      return render_formula_vault_View();
    case 'icd10':
      return render_tracuu_ma_icd10_View();
    case 'benh-an':
      return render_benh_an_noi_khoa_View();
    default:
      return render_quy_doi_lieu_tuong_duong_View();
  }
}

// 1. QUY ĐỔI LIỀU TƯƠNG ĐƯƠNG VIEW
export function renderQuyDoiLieuContent(): string {
  return `
    <div class="equiv-calc-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-sliders" style="color: var(--color-primary, #0284c7);"></i> Chọn Nhóm Dược Lý Cần Quy Đổi
        </h3>
        
        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--color-text, #334155);">Nhóm thuốc:</label>
          <select id="equiv-category-select" style="width: 100%; padding: 0.65rem 0.75rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; background: var(--color-surface, #fff); color: var(--color-text, #0f172a); font-size: 0.9rem;" onchange="window.handleEquivCatChange(this.value)">
            <option value="corticoid">1. Corticosteroids (Kháng Viêm Steroid)</option>
            <option value="opioid">2. Opioids Giảm Đau (Morphine / OME)</option>
            <option value="statin">3. Statins (Hạ Lipid Máu / Cường độ)</option>
            <option value="ppi">4. PPIs (Ức Chế Bơm Proton)</option>
            <option value="doac">5. DOACs / NOACs (Kháng Đông Đường Uống)</option>
            <option value="benzo">6. Benzodiazepines (An Thần / Gây Ngủ)</option>
          </select>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--color-text, #334155);">Thuốc nguồn:</label>
            <select id="equiv-src-drug" style="width: 100%; padding: 0.65rem 0.75rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; background: var(--color-surface, #fff); color: var(--color-text, #0f172a); font-size: 0.9rem;" onchange="window.recalcEquiv()">
              <option value="Methylprednisolone">Methylprednisolone (4 mg)</option>
              <option value="Prednisone">Prednisone (5 mg)</option>
              <option value="Prednisolone">Prednisolone (5 mg)</option>
              <option value="Hydrocortisone">Hydrocortisone (20 mg)</option>
              <option value="Dexamethasone">Dexamethasone (0.75 mg)</option>
              <option value="Betamethasone">Betamethasone (0.6 mg)</option>
            </select>
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--color-text, #334155);">Liều dùng hiện tại (mg):</label>
            <input type="number" id="equiv-src-dose" value="16" step="0.5" style="width: 100%; padding: 0.65rem 0.75rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; background: var(--color-surface, #fff); color: var(--color-text, #0f172a); font-size: 0.9rem;" oninput="window.recalcEquiv()" />
          </div>
        </div>

        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--color-text, #334155);">Thuốc đích muốn chuyển sang:</label>
          <select id="equiv-target-drug" style="width: 100%; padding: 0.65rem 0.75rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; background: var(--color-surface, #fff); color: var(--color-text, #0f172a); font-size: 0.9rem;" onchange="window.recalcEquiv()">
            <option value="Prednisone">Prednisone</option>
            <option value="Methylprednisolone">Methylprednisolone</option>
            <option value="Dexamethasone">Dexamethasone</option>
            <option value="Hydrocortisone">Hydrocortisone</option>
          </select>
        </div>
      </div>

      <!-- KẾT QUẢ QUY ĐỔI -->
      <div style="background: linear-gradient(135deg, rgba(2,132,199,0.06) 0%, rgba(59,130,246,0.02) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--color-primary, #0284c7); background: #e0f2fe; padding: 0.25rem 0.6rem; border-radius: 6px;">Kết Quả Tương Đương</span>
            <span id="equiv-badge" style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">Kháng viêm: 5x | Giữ muối: 0</span>
          </div>

          <div style="text-align: center; padding: 1.5rem 0;">
            <div style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">Liều tương đương khuyến cáo:</div>
            <div id="equiv-result-value" style="font-size: 2.75rem; font-weight: 800; color: var(--color-primary, #0284c7);">20.0 <span style="font-size: 1.25rem; font-weight: 600;">mg</span></div>
            <div id="equiv-result-target" style="font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a); margin-top: 0.25rem;">Prednisone (uống/tiêm)</div>
          </div>
        </div>

        <div id="equiv-pearl-box" style="background: #f8fafc; border-left: 4px solid var(--color-primary, #0284c7); padding: 0.85rem 1rem; border-radius: 0 8px 8px 0; font-size: 0.825rem; color: var(--color-text, #334155); line-height: 1.5;">
          💡 <strong>Clinical Pearl:</strong> Methylprednisolone 4mg = Prednisone 5mg = Dexamethasone 0.75mg = Hydrocortisone 20mg. Chú ý giảm 25-50% liều khi chuyển đổi Opioid để phòng dung nạp chéo (incomplete cross-tolerance).
        </div>
      </div>
    </div>
  `;
}

// 2. TÍNH CỠ MẪU NCKH VIEW
export function renderTinhCoMauContent(): string {
  return `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-vial-circle-check" style="color: var(--color-primary, #0284c7);"></i> Thiết Kế Nghiên Cứu & Tham Số
        </h3>

        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--color-text, #334155);">Loại thiết kế:</label>
          <select id="stat-design" style="width: 100%; padding: 0.65rem 0.75rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;" onchange="window.updateStatInputs()">
            <option value="cs-prop">1. Cắt ngang — Ước lượng một Tỷ lệ (Prevalence)</option>
            <option value="cs-mean">2. Cắt ngang — Ước lượng một Trung bình (Mean)</option>
            <option value="cc-prop">3. Bệnh - Chứng (Case-Control) / So sánh 2 tỷ lệ</option>
            <option value="rct-prop">4. Thử nghiệm lâm sàng (RCT) — So sánh 2 tỷ lệ</option>
          </select>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--color-text, #334155);">Mức ý nghĩa α (Z_α):</label>
            <select id="stat-alpha" style="width: 100%; padding: 0.65rem 0.75rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;" onchange="window.recalcStat()">
              <option value="1.96">5% (α = 0.05, 95% CI)</option>
              <option value="2.576">1% (α = 0.01, 99% CI)</option>
              <option value="1.645">10% (α = 0.10, 90% CI)</option>
            </select>
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--color-text, #334155);">Độ mạnh Power (1-β):</label>
            <select id="stat-power" style="width: 100%; padding: 0.65rem 0.75rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;" onchange="window.recalcStat()">
              <option value="0.842">80% (Power = 0.80)</option>
              <option value="1.282">90% (Power = 0.90)</option>
              <option value="1.645">95% (Power = 0.95)</option>
            </select>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--color-text, #334155);">Tỷ lệ dự đoán p (0-1):</label>
            <input type="number" id="stat-p" value="0.30" step="0.05" min="0.01" max="0.99" style="width: 100%; padding: 0.65rem 0.75rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;" oninput="window.recalcStat()" />
          </div>
          <div>
            <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--color-text, #334155);">Sai số tuyệt đối d (0-1):</label>
            <input type="number" id="stat-d" value="0.05" step="0.01" min="0.001" style="width: 100%; padding: 0.65rem 0.75rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;" oninput="window.recalcStat()" />
          </div>
        </div>

        <div>
          <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--color-text, #334155);">Dự phòng mất mẫu (Dropout %):</label>
          <input type="number" id="stat-dropout" value="10" step="5" min="0" max="50" style="width: 100%; padding: 0.65rem 0.75rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;" oninput="window.recalcStat()" />
        </div>
      </div>

      <div style="background: linear-gradient(135deg, rgba(16,185,129,0.06) 0%, rgba(2,132,199,0.02) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #059669; background: #d1fae5; padding: 0.25rem 0.6rem; border-radius: 6px;">Cỡ Mẫu Khuyến Nghị (N)</span>
          
          <div style="text-align: center; padding: 2rem 0;">
            <div style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">Cỡ mẫu tối thiểu cần thu thập:</div>
            <div id="stat-result-n" style="font-size: 3.5rem; font-weight: 800; color: #059669;">360</div>
            <div id="stat-result-detail" style="font-size: 0.9rem; color: var(--color-text-muted, #64748b);">(Cỡ mẫu thô n0 = 323 + 10% dự phòng)</div>
          </div>
        </div>

        <div style="background: #f8fafc; border-radius: 8px; padding: 1rem; font-size: 0.825rem; color: var(--color-text, #334155);">
          <strong>Công thức áp dụng:</strong> <span id="stat-formula-str">n = [Z²_(1-α/2) × p(1-p)] / d²</span>
        </div>
      </div>
    </div>
  `;
}

// 3. KHO CÔNG THỨC SINH LÝ ĐỊNH LƯỢNG
export function renderFormulaVaultContent(): string {
  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1.25rem;">
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem;">
        <h4 style="font-weight: 700; color: var(--color-primary, #0284c7); margin: 0 0 0.5rem 0;">Phương trình Nernst (Điện thế màng cân bằng)</h4>
        <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.75rem;">E_ion = (61.5 / z) × log10([Ion]_ngoài / [Ion]_trong) tại 37°C</p>
        <div style="font-size: 0.8rem; background: #f1f5f9; padding: 0.5rem; border-radius: 6px;">E_K+ ≈ -90 mV | E_Na+ ≈ +65 mV | E_Ca2+ ≈ +120 mV</div>
      </div>

      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem;">
        <h4 style="font-weight: 700; color: var(--color-primary, #0284c7); margin: 0 0 0.5rem 0;">Định luật Fick (Cung lượng tim / Khuếch tán)</h4>
        <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.75rem;">CO = VO2 / (C_aO2 - C_vO2)</p>
        <div style="font-size: 0.8rem; background: #f1f5f9; padding: 0.5rem; border-radius: 6px;">Đo lường lưu lượng máu tim vàng dựa trên tiêu thụ Oxy phế nang.</div>
      </div>

      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem;">
        <h4 style="font-weight: 700; color: var(--color-primary, #0284c7); margin: 0 0 0.5rem 0;">Lực Starling vi tuần hoàn mao mạch</h4>
        <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.75rem;">J_v = K_f × [(P_c - P_if) - σ(π_c - π_if)]</p>
        <div style="font-size: 0.8rem; background: #f1f5f9; padding: 0.5rem; border-radius: 6px;">Cân bằng áp suất thủy tĩnh và áp suất keo tạo dịch kẽ và phù ngoại biên.</div>
      </div>

      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem;">
        <h4 style="font-weight: 700; color: var(--color-primary, #0284c7); margin: 0 0 0.5rem 0;">Khí Phế Nang PAO2 & A-a Gradient</h4>
        <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.75rem;">PAO2 = FiO2 × (P_atm - 47) - (PaCO2 / 0.8)</p>
        <div style="font-size: 0.8rem; background: #f1f5f9; padding: 0.5rem; border-radius: 6px;">A-a gradient bình thường: < (Tuổi / 4) + 4. Đánh giá Shunt vs V/Q mismatch.</div>
      </div>
    </div>
  `;
}

// 4. TRA CỨU ICD-10 & BHYT
export function renderIcd10Content(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <div style="margin-bottom: 1.25rem;">
        <input type="text" id="icd-quick-search" placeholder="Nhập tên bệnh hoặc mã ICD-10 (VD: I10, E11, K21, Viêm phổi, Nhồi máu cơ tim)..." 
          style="width: 100%; padding: 0.85rem 1.25rem; font-size: 1rem; border: 2px solid var(--color-primary, #0284c7); border-radius: 8px; outline: none;" 
          oninput="window.filterIcdList(this.value)" />
      </div>

      <div id="icd-results-container" style="max-height: 480px; overflow-y: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
          <thead>
            <tr style="border-bottom: 2px solid var(--color-border, #e2e8f0); background: #f8fafc; text-align: left;">
              <th style="padding: 0.75rem 1rem; width: 120px;">Mã ICD-10</th>
              <th style="padding: 0.75rem 1rem;">Tên bệnh danh (Việt ngữ)</th>
              <th style="padding: 0.75rem 1rem; width: 140px;">BHYT Chi trả</th>
              <th style="padding: 0.75rem 1rem; width: 120px;">Thao tác</th>
            </tr>
          </thead>
          <tbody id="icd-table-body">
            <tr style="border-bottom: 1px solid var(--color-border, #f1f5f9);">
              <td style="padding: 0.75rem 1rem; font-weight: 700; color: var(--color-primary, #0284c7);">I10</td>
              <td style="padding: 0.75rem 1rem;">Tăng huyết áp vô căn (nguyên phát)</td>
              <td style="padding: 0.75rem 1rem;"><span style="background: #dcfce7; color: #166534; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">100% BHYT</span></td>
              <td style="padding: 0.75rem 1rem;"><button class="btn btn-sm" onclick="navigator.clipboard.writeText('I10 - Tăng huyết áp vô căn')" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; border-radius: 4px; border: 1px solid var(--color-border, #e2e8f0); cursor: pointer;">Copy</button></td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border, #f1f5f9);">
              <td style="padding: 0.75rem 1rem; font-weight: 700; color: var(--color-primary, #0284c7);">E11.9</td>
              <td style="padding: 0.75rem 1rem;">Đái tháo đường týp 2, không có biến chứng</td>
              <td style="padding: 0.75rem 1rem;"><span style="background: #dcfce7; color: #166534; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">100% BHYT</span></td>
              <td style="padding: 0.75rem 1rem;"><button class="btn btn-sm" onclick="navigator.clipboard.writeText('E11.9 - Đái tháo đường týp 2')" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; border-radius: 4px; border: 1px solid var(--color-border, #e2e8f0); cursor: pointer;">Copy</button></td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border, #f1f5f9);">
              <td style="padding: 0.75rem 1rem; font-weight: 700; color: var(--color-primary, #0284c7);">J18.9</td>
              <td style="padding: 0.75rem 1rem;">Viêm phổi không xác định tác nhân</td>
              <td style="padding: 0.75rem 1rem;"><span style="background: #dcfce7; color: #166534; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">100% BHYT</span></td>
              <td style="padding: 0.75rem 1rem;"><button class="btn btn-sm" onclick="navigator.clipboard.writeText('J18.9 - Viêm phổi')" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; border-radius: 4px; border: 1px solid var(--color-border, #e2e8f0); cursor: pointer;">Copy</button></td>
            </tr>
            <tr style="border-bottom: 1px solid var(--color-border, #f1f5f9);">
              <td style="padding: 0.75rem 1rem; font-weight: 700; color: var(--color-primary, #0284c7);">K21.0</td>
              <td style="padding: 0.75rem 1rem;">Bệnh trào ngược dạ dày - thực quản có viêm thực quản</td>
              <td style="padding: 0.75rem 1rem;"><span style="background: #dcfce7; color: #166534; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">100% BHYT</span></td>
              <td style="padding: 0.75rem 1rem;"><button class="btn btn-sm" onclick="navigator.clipboard.writeText('K21.0 - Trào ngược dạ dày')" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; border-radius: 4px; border: 1px solid var(--color-border, #e2e8f0); cursor: pointer;">Copy</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// 5. MẪU BỆNH ÁN NỘI KHOA
export function renderBenhAnContent(): string {
  return `
    <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 1.5rem;">
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1rem;">
          <i class="fa-solid fa-pen-to-square" style="color: var(--color-primary, #0284c7);"></i> Nhập Thông Tin Bệnh Án
        </h3>

        <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem;">
          <div>
            <label style="font-size: 0.8rem; font-weight: 600; color: var(--color-text, #334155);">Họ tên bệnh nhân:</label>
            <input type="text" id="ba-hoten" placeholder="Nguyễn Văn A" style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px;" oninput="window.updateBaPreview()" />
          </div>
          <div>
            <label style="font-size: 0.8rem; font-weight: 600; color: var(--color-text, #334155);">Tuổi:</label>
            <input type="number" id="ba-tuoi" placeholder="65" style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px;" oninput="window.updateBaPreview()" />
          </div>
          <div>
            <label style="font-size: 0.8rem; font-weight: 600; color: var(--color-text, #334155);">Giới tính:</label>
            <select id="ba-gioitinh" style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px;" onchange="window.updateBaPreview()">
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
        </div>

        <div style="margin-bottom: 0.75rem;">
          <label style="font-size: 0.8rem; font-weight: 600; color: var(--color-text, #334155);">Lý do vào viện:</label>
          <input type="text" id="ba-lydovv" placeholder="Đau ngực trái giờ thứ 3" style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px;" oninput="window.updateBaPreview()" />
        </div>

        <div style="margin-bottom: 0.75rem;">
          <label style="font-size: 0.8rem; font-weight: 600; color: var(--color-text, #334155);">Bệnh sử:</label>
          <textarea id="ba-benhsu" rows="3" placeholder="Cách nhập viện 3 giờ, bệnh nhân đột ngột đau ngực sau xương ức..." style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px; font-family: inherit;" oninput="window.updateBaPreview()"></textarea>
        </div>

        <div style="margin-bottom: 0.75rem;">
          <label style="font-size: 0.8rem; font-weight: 600; color: var(--color-text, #334155);">Tiền căn:</label>
          <textarea id="ba-tiencan" rows="2" placeholder="Tăng huyết áp 5 năm, Đái tháo đường type 2 3 năm..." style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px; font-family: inherit;" oninput="window.updateBaPreview()"></textarea>
        </div>

        <div>
          <label style="font-size: 0.8rem; font-weight: 600; color: var(--color-text, #334155);">Chẩn đoán sơ bộ:</label>
          <input type="text" id="ba-chandoan" placeholder="Hội chứng mạch vành cấp theo dõi STEMI thành trước" style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px;" oninput="window.updateBaPreview()" />
        </div>
      </div>

      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h4 style="font-weight: 700; margin: 0; color: var(--color-text, #0f172a);">Văn Bản Bệnh Án Hoàn Chỉnh</h4>
            <button onclick="window.copyBaText()" style="padding: 0.4rem 0.8rem; font-size: 0.8rem; background: var(--color-primary, #0284c7); color: #fff; border: none; border-radius: 6px; cursor: pointer;">
              <i class="fa-solid fa-copy"></i> Sao chép
            </button>
          </div>
          <div id="ba-preview-text" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; font-size: 0.85rem; line-height: 1.6; white-space: pre-wrap; color: #1e293b; min-height: 260px;">
I. HÀNH CHÍNH
- Họ và tên: NGUYỄN VĂN A
- Tuổi: 65 | Giới tính: Nam

II. LÝ DO VÀO VIỆN: Đau ngực trái giờ thứ 3

III. BỆNH SỬ:
Cách nhập viện 3 giờ, bệnh nhân đột ngột đau ngực sau xương ức dữ dội, cảm giác đè nặng lan lên cằm và vai trái...

IV. TIỀN CĂN:
- Tăng huyết áp 5 năm đang dùng Amlodipine 5mg.
- Đái tháo đường type 2.

V. CHẨN ĐOÁN SƠ BỘ:
Hội chứng mạch vành cấp theo dõi STEMI thành trước giờ thứ 3.
          </div>
        </div>
      </div>
    </div>
  `;
}

// Client Global Window Handlers
declare global {
  interface Window {
    switchGeneralToolTab: (tab: GeneralToolTab) => void;
    handleEquivCatChange: (cat: string) => void;
    recalcEquiv: () => void;
    updateStatInputs: () => void;
    recalcStat: () => void;
    filterIcdList: (q: string) => void;
    updateBaPreview: () => void;
    copyBaText: () => void;
  }
}

if (typeof window !== 'undefined') {
  window.switchGeneralToolTab = (tab: GeneralToolTab) => {
    const container = document.getElementById('app');
    if (container) {
      container.innerHTML = renderGeneralToolsView(tab);
    }
  };

  window.handleEquivCatChange = (cat: string) => {
    const srcSelect = document.getElementById('equiv-src-drug') as HTMLSelectElement;
    const targetSelect = document.getElementById('equiv-target-drug') as HTMLSelectElement;
    if (!srcSelect || !targetSelect) return;

    const names = getDrugNames(cat);
    srcSelect.innerHTML = names.map(n => `<option value="${n}">${n}</option>`).join('');
    targetSelect.innerHTML = names.map(n => `<option value="${n}">${n}</option>`).join('');
    if (names.length > 1) {
      targetSelect.selectedIndex = 1;
    }
    window.recalcEquiv();
  };

  window.recalcEquiv = () => {
    const cat = (document.getElementById('equiv-category-select') as HTMLSelectElement)?.value || 'corticoid';
    const src = (document.getElementById('equiv-src-drug') as HTMLSelectElement)?.value || '';
    const dose = parseFloat((document.getElementById('equiv-src-dose') as HTMLInputElement)?.value || '0');
    const target = (document.getElementById('equiv-target-drug') as HTMLSelectElement)?.value || '';

    const res = calcEquiv(cat, src, dose, target);
    const valEl = document.getElementById('equiv-result-value');
    const targetEl = document.getElementById('equiv-result-target');
    if (valEl && targetEl && res) {
      valEl.innerHTML = `${res.targetDose} <span style="font-size: 1.25rem; font-weight: 600;">${res.unit}</span>`;
      targetEl.textContent = `${res.targetDrug}`;
    }
  };

  window.recalcStat = () => {
    const p = parseFloat((document.getElementById('stat-p') as HTMLInputElement)?.value || '0.3');
    const d = parseFloat((document.getElementById('stat-d') as HTMLInputElement)?.value || '0.05');
    const z = parseFloat((document.getElementById('stat-alpha') as HTMLSelectElement)?.value || '1.96');
    const dropout = parseFloat((document.getElementById('stat-dropout') as HTMLInputElement)?.value || '10') / 100;

    const n0 = (z * z * p * (1 - p)) / (d * d);
    const nFinal = Math.ceil(n0 / (1 - dropout));

    const resultEl = document.getElementById('stat-result-n');
    const detailEl = document.getElementById('stat-result-detail');
    if (resultEl && detailEl) {
      resultEl.textContent = `${nFinal}`;
      detailEl.textContent = `(Cỡ mẫu thô n0 = ${Math.ceil(n0)} + ${(dropout*100).toFixed(0)}% dự phòng)`;
    }
  };

  window.filterIcdList = (query: string) => {
    const q = query.toLowerCase().trim();
    const rows = document.querySelectorAll('#icd-table-body tr');
    rows.forEach(r => {
      const text = (r.textContent || '').toLowerCase();
      (r as HTMLElement).style.display = !q || text.includes(q) ? '' : 'none';
    });
  };

  window.updateBaPreview = () => {
    const hoTen = (document.getElementById('ba-hoten') as HTMLInputElement)?.value || 'NGUYỄN VĂN A';
    const tuoi = (document.getElementById('ba-tuoi') as HTMLInputElement)?.value || '65';
    const gioiTinh = (document.getElementById('ba-gioitinh') as HTMLSelectElement)?.value || 'Nam';
    const lyDo = (document.getElementById('ba-lydovv') as HTMLInputElement)?.value || 'Đau ngực trái';
    const benhSu = (document.getElementById('ba-benhsu') as HTMLTextAreaElement)?.value || 'Cách nhập viện...';
    const tienCan = (document.getElementById('ba-tiencan') as HTMLTextAreaElement)?.value || 'Tăng huyết áp...';
    const chanDoan = (document.getElementById('ba-chandoan') as HTMLInputElement)?.value || 'Hội chứng vành cấp';

    const text = `I. HÀNH CHÍNH\n- Họ và tên: ${hoTen.toUpperCase()}\n- Tuổi: ${tuoi} | Giới tính: ${gioiTinh}\n\nII. LÝ DO VÀO VIỆN: ${lyDo}\n\nIII. BỆNH SỬ:\n${benhSu}\n\nIV. TIỀN CĂN:\n${tienCan}\n\nV. CHẨN ĐOÁN SƠ BỘ:\n${chanDoan}`;
    const previewEl = document.getElementById('ba-preview-text');
    if (previewEl) {
      previewEl.textContent = text;
    }
  };

  window.copyBaText = () => {
    const text = document.getElementById('ba-preview-text')?.textContent || '';
    navigator.clipboard.writeText(text).then(() => {
      alert('Đã sao chép nội dung bệnh án vào clipboard!');
    });
  };
}
