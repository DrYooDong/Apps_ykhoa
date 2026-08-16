/**
 * CliniPortal — EBM Practice Lab SPA View (TypeScript)
 * Path: src/content/ebm/ebm-lab/ebm-lab-view.ts
 */

export type EbmLabTab = 'pico' | 'nnt' | 'appraisal' | 'charts';

export function renderEbmLabView(activeTab: EbmLabTab = 'nnt'): string {
  return `
    <div class="ebm-lab-container animate-fade-in" style="max-width: 1300px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/ebm" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Y Học Chứng Cứ</a> / EBM Practice Lab
          </div>
          <h1 style="font-size: 1.85rem; font-weight: 800; color: #059669; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-flask-vial"></i> EBM Practice Lab — Phòng Thực Hành Y Học Chứng Cứ
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Bộ công cụ xây dựng câu hỏi PICO, tính toán NNT/NNH/ARR/RRR và thẩm định chất lượng nghiên cứu lâm sàng (Critical Appraisal).
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/ebm" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> EBM Command Center
          </a>
        </div>
      </div>

      <!-- Navigation Tabs -->
      <div style="display: flex; gap: 0.5rem; border-bottom: 2px solid var(--color-border, #e2e8f0); margin-bottom: 1.5rem; overflow-x: auto; padding-bottom: 0.5rem;">
        <button class="ebm-tab-btn ${activeTab === 'nnt' ? 'active' : ''}" onclick="window.switchEbmLabTab('nnt')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'nnt' ? '#059669' : 'transparent'}; color: ${activeTab === 'nnt' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-calculator"></i> Máy Tính NNT / NNH / ARR / RRR
        </button>
        <button class="ebm-tab-btn ${activeTab === 'pico' ? 'active' : ''}" onclick="window.switchEbmLabTab('pico')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'pico' ? '#059669' : 'transparent'}; color: ${activeTab === 'pico' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-crosshairs"></i> PICO Question Builder
        </button>
        <button class="ebm-tab-btn ${activeTab === 'appraisal' ? 'active' : ''}" onclick="window.switchEbmLabTab('appraisal')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'appraisal' ? '#059669' : 'transparent'}; color: ${activeTab === 'appraisal' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-clipboard-check"></i> Critical Appraisal (CASP/RoB 2)
        </button>
        <button class="ebm-tab-btn ${activeTab === 'charts' ? 'active' : ''}" onclick="window.switchEbmLabTab('charts')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'charts' ? '#059669' : 'transparent'}; color: ${activeTab === 'charts' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-chart-line"></i> Kho Biểu Đồ Y Học (Forest/Funnel/KM/ROC)
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="ebmLabContentArea">
        ${renderActiveLabTab(activeTab)}
      </div>
    </div>
  `;
}

function renderActiveLabTab(tab: EbmLabTab): string {
  switch (tab) {
    case 'nnt':
      return renderNntCalculator();
    case 'pico':
      return renderPicoBuilder();
    case 'appraisal':
      return renderCriticalAppraisal();
    case 'charts':
      return renderChartsDirectory();
    default:
      return renderNntCalculator();
  }
}

// 1. NNT CALCULATOR
function renderNntCalculator(): string {
  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr)); gap: 1.5rem;">
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1rem;">
          <i class="fa-solid fa-calculator" style="color: #059669;"></i> Nhập Dữ Liệu Biến Cố Lâm Sàng
        </h3>

        <div style="margin-bottom: 1.25rem;">
          <h4 style="font-size: 0.9rem; font-weight: 700; color: #0284c7; margin: 0 0 0.5rem 0;">1. Nhóm Can Thiệp (Intervention / Experimental):</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(140px, 100%), 1fr)); gap: 0.75rem;">
            <div>
              <label style="font-size: 0.8rem; color: #475569;">Số biến cố (Events - a):</label>
              <input type="number" id="nnt-event-exp" value="82" min="0" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px; box-sizing: border-box;" oninput="window.recalcNnt()" />
            </div>
            <div>
              <label style="font-size: 0.8rem; color: #475569;">Tổng cỡ mẫu nhóm can thiệp (n1):</label>
              <input type="number" id="nnt-total-exp" value="2373" min="1" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px; box-sizing: border-box;" oninput="window.recalcNnt()" />
            </div>
          </div>
        </div>

        <div>
          <h4 style="font-size: 0.9rem; font-weight: 700; color: #64748b; margin: 0 0 0.5rem 0;">2. Nhóm Chứng (Control / Placebo):</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(140px, 100%), 1fr)); gap: 0.75rem;">
            <div>
              <label style="font-size: 0.8rem; color: #475569;">Số biến cố (Events - c):</label>
              <input type="number" id="nnt-event-ctrl" value="137" min="0" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px; box-sizing: border-box;" oninput="window.recalcNnt()" />
            </div>
            <div>
              <label style="font-size: 0.8rem; color: #475569;">Tổng cỡ mẫu nhóm chứng (n2):</label>
              <input type="number" id="nnt-total-ctrl" value="2371" min="1" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px; box-sizing: border-box;" oninput="window.recalcNnt()" />
            </div>
          </div>
        </div>
      </div>

      <!-- KẾT QUẢ NNT / ARR -->
      <div style="background: linear-gradient(135deg, rgba(5,150,105,0.06) 0%, rgba(2,132,199,0.02) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #059669; background: #dcfce7; padding: 0.25rem 0.6rem; border-radius: 6px;">Chỉ Số Hiệu Quả Lâm Sàng</span>
          
          <div style="text-align: center; padding: 1rem 0;">
            <div style="font-size: 0.9rem; color: var(--color-text-muted, #64748b);">Number Needed to Treat (NNT):</div>
            <div id="nnt-result-val" style="font-size: 3.5rem; font-weight: 800; color: #059669;">43</div>
            <div id="nnt-summary-text" style="font-size: 0.9rem; font-weight: 600; color: var(--color-text, #334155); margin-top: 0.25rem;">Cần điều trị 43 bệnh nhân để phòng ngừa 1 biến cố có hại.</div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(90px, 100%), 1fr)); gap: 0.75rem; text-align: center;">
            <div style="background: #f8fafc; border-radius: 8px; padding: 0.75rem;">
              <div style="font-size: 0.75rem; color: #64748b;">CER (Chứng):</div>
              <div id="nnt-cer-val" style="font-size: 1.15rem; font-weight: 700; color: #334155;">5.78%</div>
            </div>
            <div style="background: #f8fafc; border-radius: 8px; padding: 0.75rem;">
              <div style="font-size: 0.75rem; color: #64748b;">EER (Can thiệp):</div>
              <div id="nnt-eer-val" style="font-size: 1.15rem; font-weight: 700; color: #0284c7;">3.46%</div>
            </div>
            <div style="background: #f8fafc; border-radius: 8px; padding: 0.75rem;">
              <div style="font-size: 0.75rem; color: #64748b;">ARR (Giảm Tuyệt Đối):</div>
              <div id="nnt-arr-val" style="font-size: 1.15rem; font-weight: 700; color: #059669;">2.32%</div>
            </div>
          </div>
        </div>

        <div style="background: #f8fafc; border-left: 4px solid #059669; padding: 0.75rem 1rem; border-radius: 0 8px 8px 0; font-size: 0.825rem; color: var(--color-text, #334155); margin-top: 1rem;">
          💡 <strong>Quy tắc lâm sàng:</strong> NNT càng nhỏ thì thuốc/can thiệp càng có hiệu quả mạnh mẽ trên thực tế lâm sàng.
        </div>
      </div>
    </div>
  `;
}

// 2. PICO BUILDER
function renderPicoBuilder(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #059669; margin-bottom: 1rem;">
        <i class="fa-solid fa-crosshairs"></i> Khung Xây Dựng Câu Hỏi Lâm Sàng Chuẩn PICO
      </h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr)); gap: 1rem;">
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 1rem;">
          <h4 style="color: #16a34a; margin: 0 0 0.5rem 0;">P — Population / Patient</h4>
          <p style="font-size: 0.85rem; color: #334155; margin: 0;">Bệnh nhân hoặc quần thể nghiên cứu mục tiêu (Đặc điểm, tuổi, giai đoạn bệnh).</p>
        </div>
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 1rem;">
          <h4 style="color: #2563eb; margin: 0 0 0.5rem 0;">I — Intervention</h4>
          <p style="font-size: 0.85rem; color: #334155; margin: 0;">Biện pháp can thiệp chính (Thuốc mới, phẫu thuật, thủ thuật, xét nghiệm).</p>
        </div>
        <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 1rem;">
          <h4 style="color: #d97706; margin: 0 0 0.5rem 0;">C — Comparison</h4>
          <p style="font-size: 0.85rem; color: #334155; margin: 0;">Nhóm đối chứng so sánh (Giả dược Placebo, chăm sóc tiêu chuẩn Standard Care).</p>
        </div>
        <div style="background: #faf5ff; border: 1px solid #e9d5ff; border-radius: 8px; padding: 1rem;">
          <h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">O — Outcome</h4>
          <p style="font-size: 0.85rem; color: #334155; margin: 0;">Kết cục lâm sàng mong đợi (Tử vong do mọi nguyên nhân, nhập viện, tác dụng phụ).</p>
        </div>
      </div>
    </div>
  `;
}

// 3. CRITICAL APPRAISAL
function renderCriticalAppraisal(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #059669; margin-bottom: 1rem;">
        <i class="fa-solid fa-clipboard-check"></i> Bộ Tiêu Chuẩn Thẩm Định Nghiên Cứu (CASP & RoB 2)
      </h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr)); gap: 1rem;">
        <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem;">
          <h4 style="color: #0284c7; margin: 0 0 0.5rem 0;">1. Đánh giá Tính Hợp Lệ Nội Tại (Internal Validity):</h4>
          <ul style="font-size: 0.85rem; color: #334155; margin: 0; padding-left: 1.25rem; line-height: 1.6;">
            <li>Phân ngẫu nhiên có được làm mù thích hợp (Allocation Concealment) không?</li>
            <li>Làm mù đôi (Double-blind) cho bệnh nhân, bác sĩ và người đánh giá kết cục?</li>
            <li>Phân tích theo ý định điều trị (Intention-to-Treat Analysis — ITT)?</li>
          </ul>
        </div>
        <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem;">
          <h4 style="color: #7c3aed; margin: 0 0 0.5rem 0;">2. Đánh giá Tính Ứng Dụng Lâm Sàng (External Validity):</h4>
          <ul style="font-size: 0.85rem; color: #334155; margin: 0; padding-left: 1.25rem; line-height: 1.6;">
            <li>Quần thể nghiên cứu có tương đồng với bệnh nhân thực tế của bạn không?</li>
            <li>Lợi ích mang lại có vượt trội hơn nguy cơ tác dụng phụ và chi phí không?</li>
          </ul>
    </div>
  `;
}

// 4. CHARTS DIRECTORY
function renderChartsDirectory(): string {
  return `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
      <div style="background: var(--color-surface, #fff); border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem; text-align: center;">
        <i class="fa-solid fa-tree" style="font-size: 2rem; color: #0284c7; margin-bottom: 0.75rem;"></i>
        <h4 style="font-weight: 700; margin: 0 0 0.5rem 0;">Forest Plot Visualizer</h4>
        <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Trực quan hóa gộp kết quả Meta-analysis & Odds Ratio.</p>
        <a href="#/ebm/forest-plot" class="btn btn-sm" style="padding: 0.4rem 0.85rem; background: #0284c7; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.825rem;">Mở Forest Plot Studio</a>
      </div>

      <div style="background: var(--color-surface, #fff); border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem; text-align: center;">
        <i class="fa-solid fa-filter" style="font-size: 2rem; color: #7c3aed; margin-bottom: 0.75rem;"></i>
        <h4 style="font-weight: 700; margin: 0 0 0.5rem 0;">Funnel Plot (Publication Bias)</h4>
        <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Đánh giá sai lệch xuất bản và hiệu ứng nghiên cứu cỡ mẫu nhỏ.</p>
        <a href="#/ebm/funnel-plot" class="btn btn-sm" style="padding: 0.4rem 0.85rem; background: #7c3aed; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.825rem;">Mở Funnel Plot Studio</a>
      </div>

      <div style="background: var(--color-surface, #fff); border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem; text-align: center;">
        <i class="fa-solid fa-chart-area" style="font-size: 2rem; color: #ca8a04; margin-bottom: 0.75rem;"></i>
        <h4 style="font-weight: 700; margin: 0 0 0.5rem 0;">Kaplan-Meier Survival Curve</h4>
        <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Đường cong sống còn tích lũy, Log-rank test và Hazard Ratio.</p>
        <a href="#/ebm/kaplan-meier" class="btn btn-sm" style="padding: 0.4rem 0.85rem; background: #ca8a04; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.825rem;">Mở Kaplan-Meier Studio</a>
      </div>

      <div style="background: var(--color-surface, #fff); border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.25rem; text-align: center;">
        <i class="fa-solid fa-chart-line" style="font-size: 2rem; color: #dc2626; margin-bottom: 0.75rem;"></i>
        <h4 style="font-weight: 700; margin: 0 0 0.5rem 0;">ROC Curve & AUC Analyzer</h4>
        <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 1rem;">Độ nhạy (Sensitivity), Độ đặc hiệu (Specificity) & Điểm cắt Youden.</p>
        <a href="#/ebm/roc-curve" class="btn btn-sm" style="padding: 0.4rem 0.85rem; background: #dc2626; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 0.825rem;">Mở ROC Curve Studio</a>
      </div>
    </div>
  `;
}

// Global Window Bindings
declare global {
  interface Window {
    switchEbmLabTab: (tab: EbmLabTab) => void;
    recalcNnt: () => void;
  }
}

if (typeof window !== 'undefined') {
  window.switchEbmLabTab = (tab: EbmLabTab) => {
    const container = document.getElementById('app');
    if (container) {
      container.innerHTML = renderEbmLabView(tab);
    }
  };

  window.recalcNnt = () => {
    const a = parseFloat((document.getElementById('nnt-event-exp') as HTMLInputElement)?.value || '82');
    const n1 = parseFloat((document.getElementById('nnt-total-exp') as HTMLInputElement)?.value || '2373');
    const c = parseFloat((document.getElementById('nnt-event-ctrl') as HTMLInputElement)?.value || '137');
    const n2 = parseFloat((document.getElementById('nnt-total-ctrl') as HTMLInputElement)?.value || '2371');

    const eer = n1 > 0 ? a / n1 : 0;
    const cer = n2 > 0 ? c / n2 : 0;
    const arr = Math.abs(cer - eer);
    const nnt = arr > 0 ? Math.round(1 / arr) : 0;

    const eerEl = document.getElementById('nnt-eer-val');
    const cerEl = document.getElementById('nnt-cer-val');
    const arrEl = document.getElementById('nnt-arr-val');
    const nntEl = document.getElementById('nnt-result-val');
    const summaryEl = document.getElementById('nnt-summary-text');

    if (eerEl) eerEl.textContent = `${(eer * 100).toFixed(2)}%`;
    if (cerEl) cerEl.textContent = `${(cer * 100).toFixed(2)}%`;
    if (arrEl) arrEl.textContent = `${(arr * 100).toFixed(2)}%`;
    if (nntEl) nntEl.textContent = nnt.toString();
    if (summaryEl) {
      if (cer >= eer) {
        summaryEl.textContent = `Cần điều trị ${nnt} bệnh nhân để phòng ngừa 1 biến cố có hại.`;
      } else {
        summaryEl.textContent = `(NNH): Cứ ${nnt} bệnh nhân điều trị thì phát sinh 1 tác dụng phụ không mong muốn.`;
      }
    }
  };
}
