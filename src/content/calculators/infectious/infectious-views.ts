/**
 * CliniPortal — Infectious Disease & Sepsis Calculators SPA Views (TypeScript)
 * Path: src/content/calculators/infectious/infectious-views.ts
 */

export type InfectToolTab = 'sepsis' | 'chinh-lieu' | 'vancomycin' | 'microbiology';

export function renderInfectiousToolsView(activeTab: InfectToolTab = 'sepsis'): string {
  return `
    <div class="infect-tools-container animate-fade-in" style="max-width: 1300px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/calculators" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Công Cụ & Thang Điểm</a> / Truyền Nhiễm & Kháng Sinh
          </div>
          <h1 style="font-size: 1.75rem; font-weight: 800; color: #0d9488; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-virus-covid"></i> Công Cụ Truyền Nhiễm, Sepsis Studio & Chỉnh Liều Kháng Sinh
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
        <button class="infect-tab-btn ${activeTab === 'sepsis' ? 'active' : ''}" onclick="window.switchInfectTab('sepsis')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'sepsis' ? '#0d9488' : 'transparent'}; color: ${activeTab === 'sepsis' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-triangle-exclamation"></i> Sepsis Pro Studio (qSOFA & SOFA)
        </button>
        <button class="infect-tab-btn ${activeTab === 'chinh-lieu' ? 'active' : ''}" onclick="window.switchInfectTab('chinh-lieu')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'chinh-lieu' ? '#0d9488' : 'transparent'}; color: ${activeTab === 'chinh-lieu' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-pills"></i> Chỉnh Liều Kháng Sinh Theo Thận
        </button>
        <button class="infect-tab-btn ${activeTab === 'vancomycin' ? 'active' : ''}" onclick="window.switchInfectTab('vancomycin')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'vancomycin' ? '#0d9488' : 'transparent'}; color: ${activeTab === 'vancomycin' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-syringe"></i> Quản Lý Vancomycin (AUC/MIC)
        </button>
        <button class="infect-tab-btn ${activeTab === 'microbiology' ? 'active' : ''}" onclick="window.switchInfectTab('microbiology')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'microbiology' ? '#0d9488' : 'transparent'}; color: ${activeTab === 'microbiology' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-microscope"></i> Microbiology Pro Studio
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="infectContentArea">
        ${renderActiveInfectTab(activeTab)}
      </div>
    </div>
  `;
}

function renderActiveInfectTab(tab: InfectToolTab): string {
  switch (tab) {
    case 'sepsis':
      return renderSepsisContent();
    case 'chinh-lieu':
      return renderChinhLieuContent();
    case 'vancomycin':
      return renderVancomycinContent();
    case 'microbiology':
      return renderMicrobiologyContent();
    default:
      return renderSepsisContent();
  }
}

// 1. SEPSIS PRO STUDIO
export function renderSepsisContent(): string {
  return `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1rem;">
          <i class="fa-solid fa-bolt" style="color: #0d9488;"></i> Sàng Lọc Nhanh qSOFA (Quick SOFA)
        </h3>

        <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.875rem;">
          <label style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" class="qsofa-chk" value="1" onchange="window.recalcQsofa()" /> <strong>R (Respiratory rate):</strong> Tần số thở ≥ 22 lần/phút (+1 điểm)</label>
          <label style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" class="qsofa-chk" value="1" onchange="window.recalcQsofa()" /> <strong>A (Altered mentation):</strong> Thay đổi tri giác (GCS &lt; 15) (+1 điểm)</label>
          <label style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" class="qsofa-chk" value="1" onchange="window.recalcQsofa()" /> <strong>S (Systolic BP):</strong> Huyết áp tâm thu ≤ 100 mmHg (+1 điểm)</label>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, rgba(13,148,136,0.06) 0%, rgba(220,38,38,0.02) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #0d9488; background: #ccfbf1; padding: 0.25rem 0.6rem; border-radius: 6px;">Đánh Giá Nguy Cơ Nhiễm Khuẩn Huyết (Sepsis-3)</span>
          
          <div style="text-align: center; padding: 1.5rem 0;">
            <div style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">Tổng điểm qSOFA:</div>
            <div id="qsofa-score-val" style="font-size: 3.5rem; font-weight: 800; color: #059669;">0 / 3</div>
            <div id="qsofa-tier-text" style="font-size: 1.15rem; font-weight: 700; color: #059669; margin-top: 0.25rem;">qSOFA Âm tính (&lt; 2 điểm)</div>
          </div>
        </div>

        <div id="qsofa-action-box" style="background: #f8fafc; border-left: 4px solid #059669; padding: 0.85rem 1rem; border-radius: 0 8px 8px 0; font-size: 0.825rem; color: var(--color-text, #334155);">
          ✅ <strong>Khuyến cáo lâm sàng:</strong> Theo dõi sát sinh hiệu, đánh giá thêm điểm NEWS2 hoặc SOFA đầy đủ nếu nghi ngờ nhiễm khuẩn nặng.
        </div>
      </div>
    </div>
  `;
}

// 2. CHỈNH LIỀU KHÁNG SINH
export function renderChinhLieuContent(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #0d9488; margin-bottom: 0.75rem;">
        <i class="fa-solid fa-pills"></i> Tra Cứu & Chỉnh Liều Kháng Sinh Theo Chức Năng Thận
      </h3>
      <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">
        Bảng tra cứu liều khởi đầu (Loading dose) và liều duy trì hiệu chỉnh theo CrCl cho hơn 60+ kháng sinh phổ biến (Meropenem, Piperacillin/Tazobactam, Cefepime, Ceftriaxone, Levofloxacin, Colistin, Imipenem).
      </p>
    </div>
  `;
}

// 3. QUẢN LÝ VANCOMYCIN
export function renderVancomycinContent(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #0d9488; margin-bottom: 0.75rem;">
        <i class="fa-solid fa-syringe"></i> Dược Động Học Vancomycin — Mục Tiêu AUC24/MIC = 400 - 600
      </h3>
      <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">
        Theo dõi nồng độ thuốc trong máu TDM (Therapeutic Drug Monitoring): Tính liều nạp 20-35 mg/kg (tối đa 2g - 3g), nồng độ đáy C_trough mục tiêu 15-20 mcg/mL (đối với nhiễm khuẩn nặng MRSA) hoặc tính diện tích dưới đường cong AUC24 dựa trên 2 mẫu máu (Peak & Trough).
      </p>
    </div>
  `;
}

// 4. MICROBIOLOGY PRO STUDIO
export function renderMicrobiologyContent(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #0d9488; margin-bottom: 0.75rem;">
        <i class="fa-solid fa-microscope"></i> Microbiology Pro Studio — Vi Sinh Lâm Sàng & Kháng Sinh Đồ Antibiogram
      </h3>
      <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">
        Giả lập kính hiển vi ảo nhận diện hình thái Nhuộm Gram (Cầu khuẩn Gram dương, Trực khuẩn Gram âm, Cầu trực khuẩn), Cây quyết định nhận diện vi khuẩn (Catalase, Coagulase, Oxidase, Lactose fermentation) và Diễn giải Kháng sinh đồ theo tiêu chuẩn CLSI/EUCAST (Nhạy cảm S, Trung gian I, Đề kháng R).
      </p>
    </div>
  `;
}

// Global Window Bindings
declare global {
  interface Window {
    switchInfectTab: (tab: InfectToolTab) => void;
    recalcQsofa: () => void;
  }
}

if (typeof window !== 'undefined') {
  window.switchInfectTab = (tab: InfectToolTab) => {
    const container = document.getElementById('app');
    if (container) {
      container.innerHTML = renderInfectiousToolsView(tab);
    }
  };

  window.recalcQsofa = () => {
    let score = 0;
    document.querySelectorAll<HTMLInputElement>('.qsofa-chk:checked').forEach(c => {
      score += parseInt(c.value, 10);
    });

    const valEl = document.getElementById('qsofa-score-val');
    const tierEl = document.getElementById('qsofa-tier-text');
    const actEl = document.getElementById('qsofa-action-box');

    if (valEl && tierEl && actEl) {
      valEl.textContent = `${score} / 3`;
      if (score >= 2) {
        valEl.style.color = '#dc2626';
        tierEl.textContent = 'qSOFA DƯƠNG TÍNH (Nguy cơ Sepsis cao)';
        tierEl.style.color = '#dc2626';
        actEl.innerHTML = `🚨 <strong>Kích hoạt Gói Sepsis 1 Giờ (Sepsis-3 1-Hour Bundle):</strong><br>1. Đo Lactate máu ngay.<br>2. Cấy máu trước khi dùng kháng sinh.<br>3. Kháng sinh phổ rộng đường tĩnh mạch trong 1 giờ đầu.<br>4. Truyền dịch tinh thể 30 mL/kg nếu hạ HA hoặc Lactate ≥ 4 mmol/L.<br>5. Bắt đầu Noradrenaline nếu MAP &lt; 65 mmHg sau bù dịch.`;
        actEl.style.borderLeftColor = '#dc2626';
      } else {
        valEl.style.color = '#059669';
        tierEl.textContent = 'qSOFA Âm tính (&lt; 2 điểm)';
        tierEl.style.color = '#059669';
        actEl.innerHTML = `✅ <strong>Khuyến cáo:</strong> Theo dõi sát sinh hiệu, đánh giá thêm điểm NEWS2 hoặc SOFA đầy đủ nếu lâm sàng nghi ngờ nhiễm khuẩn tiến triển.`;
        actEl.style.borderLeftColor = '#059669';
      }
    }
  };
}
