/**
 * CliniPortal — Respiratory Calculators & Pneumonia SPA Views (TypeScript)
 * Path: src/content/calculators/respiratory/respiratory-views.ts
 */

export type RespToolTab = 'pneumonia' | 'cxr' | 'pleural';

export function renderRespiratoryToolsView(activeTab: RespToolTab = 'pneumonia'): string {
  return `
    <div class="resp-tools-container animate-fade-in" style="max-width: 1300px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/calculators" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Công Cụ & Thang Điểm</a> / Hô Hấp & Phổi
          </div>
          <h1 style="font-size: 1.75rem; font-weight: 800; color: #0284c7; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-lungs"></i> Công Cụ Hô Hấp, Viêm Phổi, X-quang Ngực & Màng Phổi
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
        <button class="resp-tab-btn ${activeTab === 'pneumonia' ? 'active' : ''}" onclick="window.switchRespTab('pneumonia')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'pneumonia' ? '#0284c7' : 'transparent'}; color: ${activeTab === 'pneumonia' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-virus"></i> Pneumonia Studio (CURB-65 & PSI)
        </button>
        <button class="resp-tab-btn ${activeTab === 'cxr' ? 'active' : ''}" onclick="window.switchRespTab('cxr')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'cxr' ? '#0284c7' : 'transparent'}; color: ${activeTab === 'cxr' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-x-ray"></i> CXR Pro Studio & CTR
        </button>
        <button class="resp-tab-btn ${activeTab === 'pleural' ? 'active' : ''}" onclick="window.switchRespTab('pleural')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'pleural' ? '#0284c7' : 'transparent'}; color: ${activeTab === 'pleural' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-water"></i> Dịch Màng Phổi (Tiêu Chuẩn Light)
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="respContentArea">
        ${renderActiveRespTab(activeTab)}
      </div>
    </div>
  `;
}

function renderActiveRespTab(tab: RespToolTab): string {
  switch (tab) {
    case 'pneumonia':
      return renderPneumoniaContent();
    case 'cxr':
      return renderCxrContent();
    case 'pleural':
      return renderPleuralContent();
    default:
      return renderPneumoniaContent();
  }
}

// 1. CURB-65 PNEUMONIA
export function renderPneumoniaContent(): string {
  return `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1rem;">
          <i class="fa-solid fa-square-check" style="color: #0284c7;"></i> 5 Tiêu Chí Thang Điểm CURB-65
        </h3>

        <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.875rem;">
          <label style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" class="curb-chk" value="1" onchange="window.recalcCurb65()" /> <strong>C (Confusion):</strong> Lú lẫn, suy giảm tri giác (AMTS ≤ 8)</label>
          <label style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" class="curb-chk" value="1" onchange="window.recalcCurb65()" /> <strong>U (Urea):</strong> Ure máu &gt; 7.0 mmol/L (BUN &gt; 19 mg/dL)</label>
          <label style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" class="curb-chk" value="1" onchange="window.recalcCurb65()" /> <strong>R (Respiratory rate):</strong> Tần số thở ≥ 30 lần/phút</label>
          <label style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" class="curb-chk" value="1" onchange="window.recalcCurb65()" /> <strong>B (Blood pressure):</strong> Huyết áp thấp (HA tâm thu &lt; 90 hoặc HA tâm trương ≤ 60 mmHg)</label>
          <label style="display: flex; align-items: center; gap: 0.5rem;"><input type="checkbox" class="curb-chk" value="1" onchange="window.recalcCurb65()" /> <strong>65 (Age ≥ 65):</strong> Tuổi từ 65 trở lên</label>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, rgba(2,132,199,0.06) 0%, rgba(220,38,38,0.02) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #0284c7; background: #e0f2fe; padding: 0.25rem 0.6rem; border-radius: 6px;">Phân Tầng Nguy Cơ CURB-65</span>
          
          <div style="text-align: center; padding: 1.5rem 0;">
            <div style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">Tổng điểm:</div>
            <div id="curb-score-val" style="font-size: 3.5rem; font-weight: 800; color: #059669;">0 / 5</div>
            <div id="curb-tier-text" style="font-size: 1.15rem; font-weight: 700; color: #059669; margin-top: 0.25rem;">Nhóm 1: Nguy cơ Thấp (Tử vong &lt; 1%)</div>
          </div>
        </div>

        <div id="curb-action-box" style="background: #f8fafc; border-left: 4px solid #059669; padding: 0.85rem 1rem; border-radius: 0 8px 8px 0; font-size: 0.825rem; color: var(--color-text, #334155);">
          🏠 <strong>Khuyến cáo nơi điều trị:</strong> Điều trị ngoại trú an toàn bằng kháng sinh đường uống (Amoxicillin/Clavulanate hoặc Macrolide/Doxycycline).
        </div>
      </div>
    </div>
  `;
}

// 2. CXR STUDIO
export function renderCxrContent(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #0284c7; margin-bottom: 0.75rem;">
        <i class="fa-solid fa-x-ray"></i> CXR Pro Studio — Đọc Phim X-quang Ngực 12 Bước & Chỉ Số Tim-Ngực (CTR)
      </h3>
      <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">
        Quy trình chuẩn hóa đọc X-quang ngực thẳng: Kiểm tra hành chính & kỹ thuật chụp (Hít đủ sâu ≥ 8-10 cung sườn sau, tư thế PA vs AP, độ xuyên thấu) → Đọc có hệ thống theo giải phẫu (Khí đạo Airway, Xương Bones, Bóng tim Cardiac CTR &gt; 0.5, Vòm hoành Diaphragm, Nhu mô phổi Lung fields, Dịch màng phổi Effusion, Dụng cụ hồi sức Tubes/Lines).
      </p>
    </div>
  `;
}

// 3. TIÊU CHUẨN LIGHT (DỊCH MÀNG PHỔI)
export function renderPleuralContent(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #0284c7; margin-bottom: 0.75rem;">
        <i class="fa-solid fa-water"></i> Tiêu Chuẩn Light — Phân Biệt Dịch Thấm vs Dịch Tiết Màng Phổi
      </h3>
      <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1rem;">
        Chẩn đoán <strong>DỊCH TIẾT (Exudate)</strong> khi thỏa mãn ít nhất 1 trong 3 tiêu chuẩn Light:<br>
        1. Tỷ lệ Protein dịch màng phổi / Protein huyết thanh &gt; 0.5<br>
        2. Tỷ lệ LDH dịch màng phổi / LDH huyết thanh &gt; 0.6<br>
        3. LDH dịch màng phổi &gt; 2/3 giới hạn trên bình thường của LDH huyết thanh (hoặc &gt; 200 U/L)
      </p>
    </div>
  `;
}

// Global Window Bindings
declare global {
  interface Window {
    switchRespTab: (tab: RespToolTab) => void;
    recalcCurb65: () => void;
  }
}

if (typeof window !== 'undefined') {
  window.switchRespTab = (tab: RespToolTab) => {
    const container = document.getElementById('app');
    if (container) {
      container.innerHTML = renderRespiratoryToolsView(tab);
    }
  };

  window.recalcCurb65 = () => {
    let score = 0;
    document.querySelectorAll<HTMLInputElement>('.curb-chk:checked').forEach(c => {
      score += parseInt(c.value, 10);
    });

    const valEl = document.getElementById('curb-score-val');
    const tierEl = document.getElementById('curb-tier-text');
    const actEl = document.getElementById('curb-action-box');

    if (valEl && tierEl && actEl) {
      valEl.textContent = `${score} / 5`;
      if (score >= 3) {
        valEl.style.color = '#dc2626';
        tierEl.textContent = 'Nhóm 3: Nguy cơ RẤT CAO (Tử vong 15 - 40%)';
        tierEl.style.color = '#dc2626';
        actEl.innerHTML = `🚨 <strong>Khuyến cáo:</strong> Nhập viện cấp cứu khẩn cấp, xem xét nằm khoa Hồi sức tích cực (ICU) nếu CURB-65 = 4-5 điểm hoặc suy hô hấp cần thở máy / sốc nhiễm khuẩn.`;
        actEl.style.borderLeftColor = '#dc2626';
      } else if (score === 2) {
        valEl.style.color = '#d97706';
        tierEl.textContent = 'Nhóm 2: Nguy cơ TRUNG BÌNH (Tử vong ~9%)';
        tierEl.style.color = '#d97706';
        actEl.innerHTML = `🏥 <strong>Khuyến cáo:</strong> Nhập viện điều trị nội trú tại khoa Nội Hô hấp hoặc theo dõi sát tại phòng lưu bệnh cấp cứu.`;
        actEl.style.borderLeftColor = '#d97706';
      } else {
        valEl.style.color = '#059669';
        tierEl.textContent = 'Nhóm 1: Nguy cơ THẤP (Tử vong &lt; 1%)';
        tierEl.style.color = '#059669';
        actEl.innerHTML = `🏠 <strong>Khuyến cáo:</strong> Điều trị ngoại trú an toàn bằng kháng sinh đường uống.`;
        actEl.style.borderLeftColor = '#059669';
      }
    }
  };
}
