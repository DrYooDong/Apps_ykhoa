import { render_ptnc_tim_mach_View } from './ptnc-tim-mach-view';
import { render_dg_ldl_c_View } from './dg-ldl-c-view';
import { render_dg_suy_tim_View } from './dg-suy-tim-view';
import { render_dg_vte_View } from './dg-vte-view';
import { render_phan_loai_roi_loan_nhip_studio_View } from './phan-loai-roi-loan-nhip-studio-view';
import { calculateScore2Engine } from './ptnc-tim-mach';

export type CardioToolTab = 'ptnc-tim-mach' | 'phan-loai-roi-loan-nhip' | 'dg-ldlc' | 'dg-suy-tim' | 'vte-toolkit';

export function renderCardiologyToolsView(activeTab: CardioToolTab = 'ptnc-tim-mach'): string {
  setTimeout(() => {
    const w = typeof window !== 'undefined' ? (window as any) : {};
    if (activeTab === 'ptnc-tim-mach' && w.recalcScore2) w.recalcScore2();
    if (activeTab === 'dg-ldlc' && w.recalcLdlc) w.recalcLdlc();
    if (activeTab === 'dg-suy-tim' && w.recalcSuyTim) w.recalcSuyTim();
    if (activeTab === 'vte-toolkit' && w.recalcWellsDvt) {
      w.recalcWellsDvt();
      if (w.recalcWellsPe) w.recalcWellsPe();
    }
  }, 50);

  return `
    <div class="cardio-tools-container animate-fade-in" style="max-width: 1440px; margin: 0 auto; padding: 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/calculators" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Công Cụ & Thang Điểm</a> / Tim Mạch & Huyết Khối
          </div>
          <h1 style="font-size: 1.75rem; font-weight: 800; color: #e11d48; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-heart-pulse"></i> Công Cụ Tim Mạch, Điện Tâm Đồ & Huyết Khối
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
        <button class="cardio-tab-btn ${activeTab === 'ptnc-tim-mach' ? 'active' : ''}" onclick="window.switchCardioTab('ptnc-tim-mach')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'ptnc-tim-mach' ? '#e11d48' : 'transparent'}; color: ${activeTab === 'ptnc-tim-mach' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-chart-line"></i> Phân Tầng Nguy Cơ Tim Mạch (SCORE2)
        </button>
        <button class="cardio-tab-btn ${activeTab === 'dg-ldlc' ? 'active' : ''}" onclick="window.switchCardioTab('dg-ldlc')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'dg-ldlc' ? '#e11d48' : 'transparent'}; color: ${activeTab === 'dg-ldlc' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-droplet"></i> Mục Tiêu LDL-C (ESC/VNHA)
        </button>
        <button class="cardio-tab-btn ${activeTab === 'dg-suy-tim' ? 'active' : ''}" onclick="window.switchCardioTab('dg-suy-tim')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'dg-suy-tim' ? '#e11d48' : 'transparent'}; color: ${activeTab === 'dg-suy-tim' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-heart"></i> Đánh Giá Suy Tim (HFrEF/HFpEF)
        </button>
        <button class="cardio-tab-btn ${activeTab === 'vte-toolkit' ? 'active' : ''}" onclick="window.switchCardioTab('vte-toolkit')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'vte-toolkit' ? '#e11d48' : 'transparent'}; color: ${activeTab === 'vte-toolkit' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-shield-halved"></i> VTE Toolkit (Wells DVT & PE)
        </button>
        <button class="cardio-tab-btn ${activeTab === 'phan-loai-roi-loan-nhip' ? 'active' : ''}" onclick="window.switchCardioTab('phan-loai-roi-loan-nhip')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'phan-loai-roi-loan-nhip' ? '#e11d48' : 'transparent'}; color: ${activeTab === 'phan-loai-roi-loan-nhip' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-wave-square"></i> Arrhythmia Studio & ECG
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="cardioContentArea">
        ${renderActiveCardioTab(activeTab)}
      </div>
    </div>
  `;
}

function renderActiveCardioTab(tab: CardioToolTab): string {
  switch (tab) {
    case 'ptnc-tim-mach':
      return render_ptnc_tim_mach_View();
    case 'dg-ldlc':
      return render_dg_ldl_c_View();
    case 'dg-suy-tim':
      return render_dg_suy_tim_View();
    case 'vte-toolkit':
      return render_dg_vte_View();
    case 'phan-loai-roi-loan-nhip':
      return render_phan_loai_roi_loan_nhip_studio_View();
    default:
      return render_ptnc_tim_mach_View();
  }
}

// 1. SCORE2 ASCVD RISK
export function renderScore2Content(): string {
  return `
    <div style="display: grid; grid-template-columns: 1.1fr 1fr; gap: 1.5rem;">
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1rem;">
          <i class="fa-solid fa-user-gear" style="color: #e11d48;"></i> Thông Tin Bệnh Nhân
        </h3>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Tuổi (năm):</label>
            <input type="number" id="score2-age" value="55" min="40" max="89" style="width: 100%; padding: 0.6rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;" oninput="window.recalcScore2()" />
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Giới tính:</label>
            <select id="score2-sex" style="width: 100%; padding: 0.6rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;" onchange="window.recalcScore2()">
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Hút thuốc lá:</label>
            <select id="score2-smoker" style="width: 100%; padding: 0.6rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;" onchange="window.recalcScore2()">
              <option value="1">Có hút thuốc</option>
              <option value="0" selected>Không hút</option>
            </select>
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Huyết áp tâm thu (mmHg):</label>
            <input type="number" id="score2-sbp" value="140" min="90" max="220" style="width: 100%; padding: 0.6rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;" oninput="window.recalcScore2()" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Non-HDL Cholesterol (mmol/L):</label>
            <input type="number" id="score2-nonhdl" value="4.0" step="0.1" style="width: 100%; padding: 0.6rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;" oninput="window.recalcScore2()" />
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Mắc ĐTĐ Type 2:</label>
            <select id="score2-diabetes" style="width: 100%; padding: 0.6rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;" onchange="window.recalcScore2()">
              <option value="0" selected>Không</option>
              <option value="1">Có ĐTĐ (SCORE2-Diabetes)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- KẾT QUẢ SCORE2 -->
      <div style="background: linear-gradient(135deg, rgba(225,29,72,0.06) 0%, rgba(2,132,199,0.02) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #e11d48; background: #ffe4e6; padding: 0.25rem 0.6rem; border-radius: 6px;">Nguy Cơ Biến Cố Tim Mạch 10 Năm (SCORE2)</span>
          
          <div style="text-align: center; padding: 2rem 0;">
            <div style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">Xác suất biến cố tim mạch gây tử vong & không tử vong:</div>
            <div id="score2-risk-percent" style="font-size: 3.5rem; font-weight: 800; color: #e11d48;">6.8%</div>
            <div id="score2-risk-tier" style="font-size: 1.15rem; font-weight: 700; color: #d97706; margin-top: 0.25rem;">Nguy cơ Trung Bình (Moderate Risk)</div>
          </div>
        </div>

        <div style="background: #f8fafc; border-left: 4px solid #e11d48; padding: 0.85rem 1rem; border-radius: 0 8px 8px 0; font-size: 0.825rem; color: var(--color-text, #334155); line-height: 1.5;">
          🎯 <strong>Mục tiêu điều trị khuyến cáo (ESC 2026):</strong><br>
          - Mục tiêu LDL-C: &lt; 2.6 mmol/L (&lt; 100 mg/dL)<br>
          - Kiểm soát HA mục tiêu: &lt; 130/80 mmHg<br>
          - Lối sống: Ngưng thuốc lá, tập thể lực ≥ 150 phút/tuần
        </div>
      </div>
    </div>
  `;
}

// 2. MỤC TIÊU LDL-C VIEW
export function renderLdlcContent(): string {
  return `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1rem;">
          <i class="fa-solid fa-list-check" style="color: var(--color-primary, #0284c7);"></i> Phân Tầng Bệnh Nhân Theo ESC / VNHA
        </h3>

        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--color-text, #334155);">Phân nhóm bệnh cảnh tim mạch:</label>
          <select id="ldl-risk-group" style="width: 100%; padding: 0.65rem 0.75rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;" onchange="window.recalcLdlc()">
            <option value="extreme">1. Nguy cơ RẤT RẤT CAO (Extreme Risk) — Biến cố mạch vành tái phát trong 2 năm</option>
            <option value="very-high">2. Nguy cơ RẤT CAO (Very High Risk) — Đã có ASCVD, ĐTĐ kèm tổn thương cơ quan đích, CKD nặng</option>
            <option value="high">3. Nguy cơ CAO (High Risk) — TC &gt; 8 mmol/L, HA ≥ 180/110, ĐTĐ không tổn thương cơ quan đích</option>
            <option value="moderate" selected>4. Nguy cơ TRUNG BÌNH (Moderate Risk) — Bệnh nhân trẻ, SCORE2 2-7%</option>
            <option value="low">5. Nguy cơ THẤP (Low Risk) — SCORE2 &lt; 2%</option>
          </select>
        </div>

        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--color-text, #334155);">LDL-C hiện tại của bệnh nhân (mmol/L):</label>
          <input type="number" id="ldl-current" value="3.8" step="0.1" style="width: 100%; padding: 0.65rem 0.75rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;" oninput="window.recalcLdlc()" />
        </div>
      </div>

      <div style="background: linear-gradient(135deg, rgba(2,132,199,0.06) 0%, rgba(16,185,129,0.02) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--color-primary, #0284c7); background: #e0f2fe; padding: 0.25rem 0.6rem; border-radius: 6px;">Mục Tiêu Điều Trị Khuyến Cáo</span>
          
          <div style="text-align: center; padding: 1.5rem 0;">
            <div style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">Mục tiêu LDL-C cần đạt:</div>
            <div id="ldl-target-val" style="font-size: 3rem; font-weight: 800; color: var(--color-primary, #0284c7);">&lt; 2.6 <span style="font-size: 1.25rem;">mmol/L</span></div>
            <div style="font-size: 0.95rem; color: var(--color-text-muted, #64748b);">(&lt; 100 mg/dL) và Giảm ≥ 50% so với nền</div>
          </div>
        </div>

        <div id="ldl-drug-guidance" style="background: #f8fafc; border-left: 4px solid var(--color-primary, #0284c7); padding: 0.85rem 1rem; border-radius: 0 8px 8px 0; font-size: 0.825rem; color: var(--color-text, #334155);">
          💊 <strong>Phác đồ Statin đề xuất:</strong> Khởi đầu Statin cường độ vừa (Atorvastatin 20mg hoặc Rosuvastatin 10mg). Đánh giá lại lipid máu sau 4-12 tuần.
        </div>
      </div>
    </div>
  `;
}

// 3. ĐÁNH GIÁ SUY TIM
export function renderSuyTimContent(): string {
  return `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1rem;">
          <i class="fa-solid fa-heart-crack" style="color: #e11d48;"></i> Phân Loại Suy Tim Theo Phân Suất Tống Máu (EF)
        </h3>

        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--color-text, #334155);">Phân suất tống máu thất trái EF (%):</label>
          <input type="number" id="hf-ef" value="35" min="10" max="80" style="width: 100%; padding: 0.65rem 0.75rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;" oninput="window.recalcHf()" />
        </div>

        <div style="margin-bottom: 1rem;">
          <label style="display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem; color: var(--color-text, #334155);">Phân độ chức năng NYHA:</label>
          <select id="hf-nyha" style="width: 100%; padding: 0.65rem 0.75rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px;">
            <option value="I">NYHA I: Không hạn chế hoạt động thể lực</option>
            <option value="II" selected>NYHA II: Hạn chế nhẹ thể lực (mệt khi gắng sức thông thường)</option>
            <option value="III">NYHA III: Hạn chế nhiều thể lực (mệt khi làm việc nhẹ)</option>
            <option value="IV">NYHA IV: Mệt ngay cả khi nghỉ ngơi tại giường</option>
          </select>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, rgba(225,29,72,0.06) 0%, rgba(245,158,11,0.02) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #e11d48; background: #ffe4e6; padding: 0.25rem 0.6rem; border-radius: 6px;">Phân Loại Thể Suy Tim</span>
          
          <div style="text-align: center; padding: 1.5rem 0;">
            <div id="hf-category-name" style="font-size: 2.25rem; font-weight: 800; color: #e11d48;">HFrEF</div>
            <div id="hf-category-desc" style="font-size: 1rem; font-weight: 600; color: var(--color-text, #334155); margin-top: 0.25rem;">Suy tim phân suất tống máu giảm (EF ≤ 40%)</div>
          </div>
        </div>

        <div style="background: #f8fafc; border-left: 4px solid #e11d48; padding: 0.85rem 1rem; border-radius: 0 8px 8px 0; font-size: 0.825rem; color: var(--color-text, #334155); line-height: 1.5;">
          🛡️ <strong>Bộ Tứ Trụ Cột Điều Trị HFrEF (Fantastic Four):</strong><br>
          1. ARNI (Sacubitril/Valsartan) hoặc ACEi/ARB<br>
          2. Beta-blocker (Bisoprolol / Carvedilol / Metoprolol succinate)<br>
          3. MRA (Spironolactone / Eplerenone)<br>
          4. SGLT2i (Dapagliflozin / Empagliflozin)
        </div>
      </div>
    </div>
  `;
}

// 4. VTE TOOLKIT (WELLS DVT / PE)
export function renderVteToolkitContent(): string {
  return `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1rem;">
          <i class="fa-solid fa-check-double" style="color: var(--color-primary, #0284c7);"></i> Thang Điểm Wells DVT (Huyết Khối Tĩnh Mạch Sâu)
        </h3>

        <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem;">
          <label style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" class="wells-dvt-chk" value="1" onchange="window.recalcWellsDvt()" /> Ung thư đang hoạt động (+1)</label>
          <label style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" class="wells-dvt-chk" value="1" onchange="window.recalcWellsDvt()" /> Liệt hoặc bất động chi dưới (+1)</label>
          <label style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" class="wells-dvt-chk" value="1" onchange="window.recalcWellsDvt()" /> Nằm liệt giường &gt; 3 ngày hoặc đại phẫu trong 12 tuần (+1)</label>
          <label style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" class="wells-dvt-chk" value="1" onchange="window.recalcWellsDvt()" /> Đau dọc theo đường đi của tĩnh mạch sâu (+1)</label>
          <label style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" class="wells-dvt-chk" value="1" onchange="window.recalcWellsDvt()" /> Sưng toàn bộ một bên chân (+1)</label>
          <label style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" class="wells-dvt-chk" value="1" onchange="window.recalcWellsDvt()" /> Bắp chân sưng to hơn bên lành &gt; 3 cm (+1)</label>
          <label style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" class="wells-dvt-chk" value="1" onchange="window.recalcWellsDvt()" /> Phù ấn lõm nhiều hơn ở chân bệnh (+1)</label>
          <label style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" class="wells-dvt-chk" value="1" onchange="window.recalcWellsDvt()" /> Tuần hoàn bàng hệ tĩnh mạch nông (+1)</label>
          <label style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" class="wells-dvt-chk" value="-2" onchange="window.recalcWellsDvt()" /> Có chẩn đoán phân biệt khác hợp lý hơn (-2)</label>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, rgba(2,132,199,0.06) 0%, rgba(225,29,72,0.02) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--color-primary, #0284c7); background: #e0f2fe; padding: 0.25rem 0.6rem; border-radius: 6px;">Đánh Giá Nguy Cơ DVT</span>
          
          <div style="text-align: center; padding: 2rem 0;">
            <div style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">Tổng điểm Wells DVT:</div>
            <div id="wells-dvt-score" style="font-size: 3.5rem; font-weight: 800; color: var(--color-primary, #0284c7);">0</div>
            <div id="wells-dvt-risk" style="font-size: 1.1rem; font-weight: 700; color: #059669; margin-top: 0.25rem;">Nguy cơ Thấp (Low Risk)</div>
          </div>
        </div>

        <div id="wells-dvt-action" style="background: #f8fafc; border-left: 4px solid var(--color-primary, #0284c7); padding: 0.85rem 1rem; border-radius: 0 8px 8px 0; font-size: 0.825rem; color: var(--color-text, #334155);">
          📋 <strong>Khuyến cáo xử trí:</strong> Xét nghiệm D-Dimer độ nhạy cao. Nếu D-Dimer âm tính (&lt; 500 ng/mL) → Loại trừ DVT an toàn mà không cần siêu âm Doppler.
        </div>
      </div>
    </div>
  `;
}

// 5. ARRHYTHMIA STUDIO STUB
export function renderArrhythmiaStudioContent(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #e11d48; margin-bottom: 0.75rem;">
        <i class="fa-solid fa-wave-square"></i> Arrhythmia Pro Studio — Phân Tích Rối Loạn Nhịp Tim Cấp Cứu
      </h3>
      <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">
        Giả lập dạng sóng ECG 12 chuyển đạo tương tác, thuật toán Brugada 4 bước phân biệt VT vs SVT có dẫn truyền lệch hướng, QTc 4 công thức (Bazett, Fridericia, Framingham, Hodges) và phân tầng nguy cơ Xoắn đỉnh (Torsades de Pointes).
      </p>

      <div style="background: #0f172a; border-radius: 8px; padding: 2rem; text-align: center; color: #38bdf8; font-family: monospace; margin-bottom: 1.5rem;">
        <div style="font-size: 1.25rem; margin-bottom: 0.5rem;">[ Real-time HTML5 Canvas ECG Monitor Simulator ]</div>
        <div style="font-size: 0.85rem; color: #94a3b8;">HR: 72 bpm | PR: 160ms | QRS: 88ms | QT: 380ms | QTc: 416ms (Bazett)</div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem;">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.4rem;">Thuật toán Brugada 4 Bước</h4>
          <p style="font-size: 0.8rem; color: #64748b; margin: 0;">Phân biệt chính xác Nhịp nhanh thất (VT) vs Nhịp nhanh trên thất dẫn truyền lệch hướng.</p>
        </div>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem;">
          <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 0.4rem;">Tính QTc Đa Công Thức</h4>
          <p style="font-size: 0.8rem; color: #64748b; margin: 0;">Hiệu chỉnh khoảng QT theo tần số tim phòng ngừa hội chứng QT kéo dài do thuốc.</p>
        </div>
      </div>
    </div>
  `;
}

// Global Window Bindings
declare global {
  interface Window {
    switchCardioTab: (tab: CardioToolTab) => void;
    recalcScore2: () => void;
    recalcLdlc: () => void;
    recalcHf: () => void;
    recalcWellsDvt: () => void;
  }
}

if (typeof window !== 'undefined') {
  window.switchCardioTab = (tab: CardioToolTab) => {
    const container = document.getElementById('app');
    if (container) {
      container.innerHTML = renderCardiologyToolsView(tab);
    }
  };

  window.recalcScore2 = () => {
    const age = parseInt((document.getElementById('score2-age') as HTMLInputElement)?.value || '55', 10);
    const sex = (document.getElementById('score2-sex') as HTMLSelectElement)?.value || 'male';
    const smoker = (document.getElementById('score2-smoker') as HTMLSelectElement)?.value === '1';
    const sbp = parseInt((document.getElementById('score2-sbp') as HTMLInputElement)?.value || '140', 10);
    const nonHdl = parseFloat((document.getElementById('score2-nonhdl') as HTMLInputElement)?.value || '4.0');
    const isDm = (document.getElementById('score2-diabetes') as HTMLSelectElement)?.value === '1';

    let risk = calculateScore2Engine(age, sex, smoker, sbp, nonHdl);
    if (isDm) risk *= 1.35;

    const riskPercentEl = document.getElementById('score2-risk-percent');
    const riskTierEl = document.getElementById('score2-risk-tier');
    if (riskPercentEl && riskTierEl) {
      riskPercentEl.textContent = `${risk.toFixed(1)}%`;
      if (risk >= 10) {
        riskTierEl.textContent = 'Nguy cơ RẤT CAO (Very High Risk)';
        riskTierEl.style.color = '#dc2626';
      } else if (risk >= 5) {
        riskTierEl.textContent = 'Nguy cơ CAO (High Risk)';
        riskTierEl.style.color = '#ea580c';
      } else if (risk >= 2.5) {
        riskTierEl.textContent = 'Nguy cơ TRUNG BÌNH (Moderate Risk)';
        riskTierEl.style.color = '#d97706';
      } else {
        riskTierEl.textContent = 'Nguy cơ THẤP (Low Risk)';
        riskTierEl.style.color = '#059669';
      }
    }
  };

  window.recalcLdlc = () => {
    const group = (document.getElementById('ldl-risk-group') as HTMLSelectElement)?.value || 'moderate';
    const targetValEl = document.getElementById('ldl-target-val');
    const guidanceEl = document.getElementById('ldl-drug-guidance');

    if (!targetValEl || !guidanceEl) return;

    if (group === 'extreme') {
      targetValEl.innerHTML = `&lt; 1.0 <span style="font-size: 1.25rem;">mmol/L</span>`;
      guidanceEl.innerHTML = `💊 <strong>Phác đồ Rất Rất Cao:</strong> Statin liều cao tối đa (Atorvastatin 80mg / Rosuvastatin 40mg) + Ezetimibe 10mg + Cân nhắc ức chế PCSK9 nếu không đạt mục tiêu.`;
    } else if (group === 'very-high') {
      targetValEl.innerHTML = `&lt; 1.4 <span style="font-size: 1.25rem;">mmol/L</span>`;
      guidanceEl.innerHTML = `💊 <strong>Phác đồ Rất Cao:</strong> Statin liều cao (Atorvastatin 40-80mg / Rosuvastatin 20-40mg) + Ezetimibe 10mg.`;
    } else if (group === 'high') {
      targetValEl.innerHTML = `&lt; 1.8 <span style="font-size: 1.25rem;">mmol/L</span>`;
      guidanceEl.innerHTML = `💊 <strong>Phác đồ Cao:</strong> Statin cường độ cao hoặc vừa liều tối đa.`;
    } else if (group === 'moderate') {
      targetValEl.innerHTML = `&lt; 2.6 <span style="font-size: 1.25rem;">mmol/L</span>`;
      guidanceEl.innerHTML = `💊 <strong>Phác đồ Trung bình:</strong> Statin cường độ vừa (Atorvastatin 20mg / Rosuvastatin 10mg).`;
    } else {
      targetValEl.innerHTML = `&lt; 3.0 <span style="font-size: 1.25rem;">mmol/L</span>`;
      guidanceEl.innerHTML = `🥗 <strong>Phác đồ Thấp:</strong> Ưu tiên can thiệp lối sống, dinh dưỡng ít chất béo bão hòa.`;
    }
  };

  window.recalcHf = () => {
    const ef = parseInt((document.getElementById('hf-ef') as HTMLInputElement)?.value || '35', 10);
    const catNameEl = document.getElementById('hf-category-name');
    const catDescEl = document.getElementById('hf-category-desc');

    if (!catNameEl || !catDescEl) return;

    if (ef <= 40) {
      catNameEl.textContent = 'HFrEF';
      catDescEl.textContent = 'Suy tim phân suất tống máu giảm (EF ≤ 40%)';
      catNameEl.style.color = '#e11d48';
    } else if (ef <= 49) {
      catNameEl.textContent = 'HFmrEF';
      catDescEl.textContent = 'Suy tim phân suất tống máu giảm nhẹ (EF 41 - 49%)';
      catNameEl.style.color = '#d97706';
    } else {
      catNameEl.textContent = 'HFpEF';
      catDescEl.textContent = 'Suy tim phân suất tống máu bảo tồn (EF ≥ 50%)';
      catNameEl.style.color = '#059669';
    }
  };

  window.recalcWellsDvt = () => {
    let score = 0;
    document.querySelectorAll<HTMLInputElement>('.wells-dvt-chk:checked').forEach(c => {
      score += parseInt(c.value, 10);
    });

    const scoreEl = document.getElementById('wells-dvt-score');
    const riskEl = document.getElementById('wells-dvt-risk');
    const actionEl = document.getElementById('wells-dvt-action');

    if (scoreEl && riskEl && actionEl) {
      scoreEl.textContent = `${score}`;
      if (score >= 3) {
        riskEl.textContent = 'Nguy cơ CAO (High Risk - ~75% mắc DVT)';
        riskEl.style.color = '#dc2626';
        actionEl.innerHTML = `🚨 <strong>Khuyến cáo:</strong> Chỉ định ngay Siêu âm Doppler mạch máu chi dưới. Điều trị kháng đông kinh nghiệm nếu không có chống chỉ định.`;
      } else if (score >= 1) {
        riskEl.textContent = 'Nguy cơ TRUNG BÌNH (Moderate Risk - ~17% mắc DVT)';
        riskEl.style.color = '#d97706';
        actionEl.innerHTML = `📋 <strong>Khuyến cáo:</strong> Làm D-Dimer độ nhạy cao. Nếu (+) → Siêu âm Doppler. Nếu (-) → Loại trừ DVT.`;
      } else {
        riskEl.textContent = 'Nguy cơ THẤP (Low Risk - &lt; 5% mắc DVT)';
        riskEl.style.color = '#059669';
        actionEl.innerHTML = `✅ <strong>Khuyến cáo:</strong> Xét nghiệm D-Dimer độ nhạy cao để loại trừ an toàn.`;
      }
    }
  };
}
