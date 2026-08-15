/**
 * CliniPortal — Hematology Calculators & Anemia SPA Views (TypeScript)
 * Path: src/content/calculators/hematology/hematology-views.ts
 */

export type HematoToolTab = 'thieu-mau' | 'lab-studio';

export function renderHematologyToolsView(activeTab: HematoToolTab = 'thieu-mau'): string {
  return `
    <div class="hemato-tools-container animate-fade-in" style="max-width: 1300px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/calculators" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Công Cụ & Thang Điểm</a> / Huyết Học & Xét Nghiệm
          </div>
          <h1 style="font-size: 1.75rem; font-weight: 800; color: #dc2626; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-vial"></i> Công Cụ Huyết Học, Phân Tầng Thiếu Máu & Lab Pro Studio
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
        <button class="hemato-tab-btn ${activeTab === 'thieu-mau' ? 'active' : ''}" onclick="window.switchHematoTab('thieu-mau')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'thieu-mau' ? '#dc2626' : 'transparent'}; color: ${activeTab === 'thieu-mau' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-droplet"></i> Phân Tầng Thiếu Máu & Chỉ Số Hồng Cầu (MCV / RPI)
        </button>
        <button class="hemato-tab-btn ${activeTab === 'lab-studio' ? 'active' : ''}" onclick="window.switchHematoTab('lab-studio')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'lab-studio' ? '#dc2626' : 'transparent'}; color: ${activeTab === 'lab-studio' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-flask-vial"></i> Lab Pro Studio PACS
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="hematoContentArea">
        ${renderActiveHematoTab(activeTab)}
      </div>
    </div>
  `;
}

function renderActiveHematoTab(tab: HematoToolTab): string {
  switch (tab) {
    case 'thieu-mau':
      return renderThieuMauContent();
    case 'lab-studio':
      return renderLabStudioContent();
    default:
      return renderThieuMauContent();
  }
}

// 1. PHÂN TẦNG THIẾU MÁU
export function renderThieuMauContent(): string {
  return `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1rem;">
          <i class="fa-solid fa-microscope" style="color: #dc2626;"></i> Nhập Chỉ Số Huyết Học (CBC & Hồng Cầu Lưới)
        </h3>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Hemoglobin Hb (g/L):</label>
            <input type="number" id="anemia-hb" value="95" min="20" max="200" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px;" oninput="window.recalcAnemia()" />
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">MCV (fL):</label>
            <input type="number" id="anemia-mcv" value="72" min="50" max="150" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px;" oninput="window.recalcAnemia()" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">RBC (T/L):</label>
            <input type="number" id="anemia-rbc" value="3.8" step="0.1" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px;" oninput="window.recalcAnemia()" />
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Hồng cầu lưới Reticulocyte (%):</label>
            <input type="number" id="anemia-retic" value="1.2" step="0.1" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px;" oninput="window.recalcAnemia()" />
          </div>
        </div>
      </div>

      <!-- KẾT QUẢ PHÂN LOẠI THIẾU MÁU -->
      <div style="background: linear-gradient(135deg, rgba(220,38,38,0.06) 0%, rgba(2,132,199,0.02) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #dc2626; background: #fee2e2; padding: 0.25rem 0.6rem; border-radius: 6px;">Chẩn Đoán Phân Biệt Thiếu Máu</span>
          
          <div style="text-align: center; padding: 1.5rem 0;">
            <div id="anemia-type-title" style="font-size: 2rem; font-weight: 800; color: #dc2626;">Thiếu Máu Hồng Cầu Nhỏ</div>
            <div id="anemia-mentzer-desc" style="font-size: 0.95rem; font-weight: 600; color: var(--color-text, #334155); margin-top: 0.25rem;">Chỉ số Mentzer (MCV/RBC) = 18.9 (&gt; 13: Gợi ý Thiếu sắt)</div>
          </div>
        </div>

        <div id="anemia-guidance-box" style="background: #f8fafc; border-left: 4px solid #dc2626; padding: 0.85rem 1rem; border-radius: 0 8px 8px 0; font-size: 0.825rem; color: var(--color-text, #334155); line-height: 1.5;">
          🩸 <strong>Thuật toán tiếp cận:</strong><br>
          1. MCV &lt; 80 fL (Hồng cầu nhỏ): Làm Ferritin, Sắt huyết thanh, TIBC (Phân biệt Thiếu sắt vs Thalassemia).<br>
          2. MCV 80 - 100 fL (Đẳng bào): Tính chỉ số RPI. Nếu RPI &gt; 2 (Tủy tăng sinh: Tán huyết/Xuất huyết cấp); Nếu RPI &lt; 2 (Bệnh mạn tính, Suy thận, Suy tủy).<br>
          3. MCV &gt; 100 fL (Hồng cầu to): Định lượng Vitamin B12, Acid Folic, TSH (Suy giáp).
        </div>
      </div>
    </div>
  `;
}

// 2. LAB STUDIO PACS
export function renderLabStudioContent(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #dc2626; margin-bottom: 0.75rem;">
        <i class="fa-solid fa-flask-vial"></i> Lab Pro Studio — Giả Lập & Phân Tích Kết Quả Xét Nghiệm Máu
      </h3>
      <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">
        Trình giả lập kết quả xét nghiệm máu tương tác PACS-style: Tổng phân tích tế bào máu ngoại vi (CBC), Sinh hóa máu (Gan AST/ALT/Bilirubin, Thận Ure/Creatinine/eGFR, Lipid máu), Điện giải đồ (Na/K/Cl/Ca/Mg) và Đông máu (PT/APTT/INR/Fibrinogen).
      </p>
    </div>
  `;
}

// Global Window Bindings
declare global {
  interface Window {
    switchHematoTab: (tab: HematoToolTab) => void;
    recalcAnemia: () => void;
  }
}

if (typeof window !== 'undefined') {
  window.switchHematoTab = (tab: HematoToolTab) => {
    const container = document.getElementById('app');
    if (container) {
      container.innerHTML = renderHematologyToolsView(tab);
    }
  };

  window.recalcAnemia = () => {
    const mcv = parseFloat((document.getElementById('anemia-mcv') as HTMLInputElement)?.value || '72');
    const rbc = parseFloat((document.getElementById('anemia-rbc') as HTMLInputElement)?.value || '3.8');

    const mentzer = rbc > 0 ? mcv / rbc : 0;
    const titleEl = document.getElementById('anemia-type-title');
    const descEl = document.getElementById('anemia-mentzer-desc');

    if (titleEl && descEl) {
      if (mcv < 80) {
        titleEl.textContent = 'Thiếu Máu Hồng Cầu Nhỏ (Microcytic)';
        titleEl.style.color = '#dc2626';
        if (mentzer > 13) {
          descEl.textContent = `Chỉ số Mentzer (MCV/RBC) = ${mentzer.toFixed(1)} (> 13: Gợi ý Thiếu Máu Thiếu Sắt)`;
        } else {
          descEl.textContent = `Chỉ số Mentzer (MCV/RBC) = ${mentzer.toFixed(1)} (< 13: Gợi ý Thalassemia mang gen)`;
        }
      } else if (mcv <= 100) {
        titleEl.textContent = 'Thiếu Máu Đẳng Bào (Normocytic)';
        titleEl.style.color = '#0284c7';
        descEl.textContent = `MCV = ${mcv} fL bình thường. Cần đánh giá thêm RPI và chức năng thận.`;
      } else {
        titleEl.textContent = 'Thiếu Máu Hồng Cầu To (Macrocytic)';
        titleEl.style.color = '#7c3aed';
        descEl.textContent = `MCV = ${mcv} fL (> 100 fL: Gợi ý thiếu Vitamin B12 / Folate / Nghiện rượu / Suy giáp).`;
      }
    }
  };
}
