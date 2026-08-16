import { render_dg_xo_gan_studio_View } from './dg-xo-gan-studio-view';
import { render_dg_dinh_duong_noi_tru_View } from './dg-dinh-duong-noi-tru-view';
import { render_ascites_studio_View } from './ascites-studio-view';
import { render_dg_xhth_View } from './dg-xhth-view';
import { render_dg_ptnc_hcc_View } from './dg-ptnc-hcc-view';

export type GastroToolTab = 'xo-gan' | 'dinh-duong' | 'ascites' | 'ptnc-hcc' | 'xhth';

export function renderGastroToolsView(activeTab: GastroToolTab = 'xo-gan'): string {
  setTimeout(() => {
    const w = typeof window !== 'undefined' ? (window as any) : {};
    if (activeTab === 'xo-gan' && w.recalcCirrhosis) w.recalcCirrhosis();
    if (activeTab === 'dinh-duong' && (w.recalcNutrition || w.recalcNutri)) (w.recalcNutrition || w.recalcNutri)();
    if (activeTab === 'ascites' && w.recalcAscites) w.recalcAscites();
    if (activeTab === 'xhth' && w.recalcGbs) w.recalcGbs();
  }, 50);

  return `
    <div class="gastro-tools-container animate-fade-in" style="max-width: 1440px; margin: 0 auto; padding: 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/calculators" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Công Cụ & Thang Điểm</a> / Tiêu Hóa & Gan Mật
          </div>
          <h1 style="font-size: 1.75rem; font-weight: 800; color: #d97706; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-apple-whole"></i> Công Cụ Tiêu Hóa, Gan Mật & Đánh Giá Dinh Dưỡng
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
        <button class="gastro-tab-btn ${activeTab === 'xo-gan' ? 'active' : ''}" onclick="window.switchGastroTab('xo-gan')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'xo-gan' ? '#d97706' : 'transparent'}; color: ${activeTab === 'xo-gan' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-droplet"></i> Xơ Gan (Child-Pugh & MELD 3.0)
        </button>
        <button class="gastro-tab-btn ${activeTab === 'dinh-duong' ? 'active' : ''}" onclick="window.switchGastroTab('dinh-duong')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'dinh-duong' ? '#d97706' : 'transparent'}; color: ${activeTab === 'dinh-duong' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-utensils"></i> Dinh Dưỡng Nội Viện
        </button>
        <button class="gastro-tab-btn ${activeTab === 'ascites' ? 'active' : ''}" onclick="window.switchGastroTab('ascites')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'ascites' ? '#d97706' : 'transparent'}; color: ${activeTab === 'ascites' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-water"></i> Phân Tích Dịch Báng (SAAG)
        </button>
        <button class="gastro-tab-btn ${activeTab === 'xhth' ? 'active' : ''}" onclick="window.switchGastroTab('xhth')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'xhth' ? '#d97706' : 'transparent'}; color: ${activeTab === 'xhth' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-heart-crack"></i> Xuất Huyết Tiêu Hóa (GBS)
        </button>
        <button class="gastro-tab-btn ${activeTab === 'ptnc-hcc' ? 'active' : ''}" onclick="window.switchGastroTab('ptnc-hcc')" style="padding: 0.6rem 1.2rem; border: none; background: ${activeTab === 'ptnc-hcc' ? '#d97706' : 'transparent'}; color: ${activeTab === 'ptnc-hcc' ? '#fff' : 'var(--color-text, #334155)'}; border-radius: 8px; font-weight: 700; font-size: 0.875rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
          <i class="fa-solid fa-shield-virus"></i> Nguy Cơ HCC (AGA)
        </button>
      </div>

      <!-- Tab Content Area -->
      <div id="gastroContentArea">
        ${renderActiveGastroTab(activeTab)}
      </div>
    </div>
  `;
}

function renderActiveGastroTab(tab: GastroToolTab): string {
  switch (tab) {
    case 'xo-gan':
      return render_dg_xo_gan_studio_View();
    case 'dinh-duong':
      return render_dg_dinh_duong_noi_tru_View();
    case 'ascites':
      return render_ascites_studio_View();
    case 'xhth':
      return render_dg_xhth_View();
    case 'ptnc-hcc':
      return render_dg_ptnc_hcc_View();
    default:
      return render_dg_xo_gan_studio_View();
  }
}

// 1. CHILD-PUGH & MELD
export function renderXoGanContent(): string {
  return `
    <div style="display: grid; grid-template-columns: 1.1fr 1fr; gap: 1.5rem;">
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1rem;">
          <i class="fa-solid fa-sliders" style="color: #d97706;"></i> 5 Tiêu Chí Điểm Child-Pugh
        </h3>

        <div style="margin-bottom: 0.75rem;">
          <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Bilirubin toàn phần (μmol/L):</label>
          <select id="cp-bili" style="width: 100%; padding: 0.55rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px;" onchange="window.recalcChildPugh()">
            <option value="1">&lt; 34 μmol/L (&lt; 2 mg/dL) (+1 điểm)</option>
            <option value="2">34 - 51 μmol/L (2 - 3 mg/dL) (+2 điểm)</option>
            <option value="3">&gt; 51 μmol/L (&gt; 3 mg/dL) (+3 điểm)</option>
          </select>
        </div>

        <div style="margin-bottom: 0.75rem;">
          <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Albumin huyết thanh (g/L):</label>
          <select id="cp-alb" style="width: 100%; padding: 0.55rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px;" onchange="window.recalcChildPugh()">
            <option value="1">&gt; 35 g/L (+1 điểm)</option>
            <option value="2">28 - 35 g/L (+2 điểm)</option>
            <option value="3">&lt; 28 g/L (+3 điểm)</option>
          </select>
        </div>

        <div style="margin-bottom: 0.75rem;">
          <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Chỉ số INR (Đông máu):</label>
          <select id="cp-inr" style="width: 100%; padding: 0.55rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px;" onchange="window.recalcChildPugh()">
            <option value="1">&lt; 1.7 (+1 điểm)</option>
            <option value="2">1.7 - 2.3 (+2 điểm)</option>
            <option value="3">&gt; 2.3 (+3 điểm)</option>
          </select>
        </div>

        <div style="margin-bottom: 0.75rem;">
          <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Cổ trướng (Báng bụng):</label>
          <select id="cp-ascites" style="width: 100%; padding: 0.55rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px;" onchange="window.recalcChildPugh()">
            <option value="1">Không có (+1 điểm)</option>
            <option value="2">Ít / Vừa (đáp ứng lợi tiểu) (+2 điểm)</option>
            <option value="3">Nhiều / Kháng trị (+3 điểm)</option>
          </select>
        </div>

        <div>
          <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Bệnh não gan (Hepatic Encephalopathy):</label>
          <select id="cp-he" style="width: 100%; padding: 0.55rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px;" onchange="window.recalcChildPugh()">
            <option value="1">Không có (+1 điểm)</option>
            <option value="2">Độ 1 - 2 (Lơ mơ, rối loạn giấc ngủ) (+2 điểm)</option>
            <option value="3">Độ 3 - 4 (Hôn mê gan) (+3 điểm)</option>
          </select>
        </div>
      </div>

      <!-- KẾT QUẢ CHILD-PUGH -->
      <div style="background: linear-gradient(135deg, rgba(217,119,6,0.06) 0%, rgba(2,132,199,0.02) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #d97706; background: #fef3c7; padding: 0.25rem 0.6rem; border-radius: 6px;">Phân Lớp Xơ Gan Child-Pugh</span>
          
          <div style="text-align: center; padding: 1.5rem 0;">
            <div style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">Tổng điểm:</div>
            <div id="cp-score-val" style="font-size: 3.5rem; font-weight: 800; color: #059669;">5</div>
            <div id="cp-class-text" style="font-size: 1.35rem; font-weight: 700; color: #059669; margin-top: 0.25rem;">Child-Pugh Lớp A (Bù trừ tốt)</div>
            <div id="cp-survival-text" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-top: 0.25rem;">Tỷ lệ sống còn 1 năm: 100% | 2 năm: 85%</div>
          </div>
        </div>

        <div style="background: #f8fafc; border-left: 4px solid #d97706; padding: 0.85rem 1rem; border-radius: 0 8px 8px 0; font-size: 0.825rem; color: var(--color-text, #334155);">
          📋 <strong>Quy tắc lâm sàng:</strong><br>
          - Child-Pugh A (5-6đ): Bù trừ tốt, nguy cơ phẫu thuật thấp.<br>
          - Child-Pugh B (7-9đ): Mất bù nhẹ, cân nhắc ghép gan.<br>
          - Child-Pugh C (10-15đ): Mất bù nặng, chống chỉ định mổ phiên.
        </div>
      </div>
    </div>
  `;
}

// 2. DINH DƯỠNG NỘI VIỆN
export function renderDinhDuongContent(): string {
  return `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1rem;">
          <i class="fa-solid fa-calculator" style="color: #059669;"></i> Tính Nhu Cầu Năng Lượng & Protein Nội Trú
        </h3>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Cân nặng (kg):</label>
            <input type="number" id="nutri-weight" value="55" min="30" max="150" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px;" oninput="window.recalcNutri()" />
          </div>
          <div>
            <label style="font-size: 0.85rem; font-weight: 600; color: var(--color-text, #334155);">Mức độ bệnh cảnh:</label>
            <select id="nutri-stress" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px;" onchange="window.recalcNutri()">
              <option value="25">Nội trú thông thường (25-30 kcal/kg)</option>
              <option value="30" selected>Nhiễm khuẩn / Sau mổ (30-35 kcal/kg)</option>
              <option value="35">Bỏng nặng / Hồi sức ICU (35-40 kcal/kg)</option>
            </select>
          </div>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, rgba(5,150,105,0.06) 0%, rgba(2,132,199,0.02) 100%), var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <span style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: #059669; background: #d1fae5; padding: 0.25rem 0.6rem; border-radius: 6px;">Nhu Cầu Mục Tiêu Mỗi Ngày</span>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; text-align: center; padding: 1.5rem 0;">
            <div style="background: #f8fafc; border-radius: 8px; padding: 1rem;">
              <div style="font-size: 0.8rem; color: var(--color-text-muted, #64748b);">Tổng Năng Lượng:</div>
              <div id="nutri-kcal-val" style="font-size: 2.25rem; font-weight: 800; color: #059669;">1650</div>
              <div style="font-size: 0.85rem; font-weight: 600; color: #334155;">kcal / ngày</div>
            </div>
            <div style="background: #f8fafc; border-radius: 8px; padding: 1rem;">
              <div style="font-size: 0.8rem; color: var(--color-text-muted, #64748b);">Đạm (Protein):</div>
              <div id="nutri-prot-val" style="font-size: 2.25rem; font-weight: 800; color: #0284c7;">66 - 82</div>
              <div style="font-size: 0.85rem; font-weight: 600; color: #334155;">g / ngày (1.2 - 1.5 g/kg)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 3. PHÂN TÍCH DỊCH BÁNG (SAAG)
export function renderAscitesContent(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #0284c7; margin-bottom: 0.75rem;">
        <i class="fa-solid fa-water"></i> Ascites Pro Studio — SAAG & Viêm Phúc Mạc Nhiễm Khuẩn (SBP)
      </h3>
      <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">
        Độ chênh Albumin Huyết thanh - Dịch màng bụng (SAAG = Albumin_máu - Albumin_dịch):<br>
        - <strong>SAAG ≥ 11 g/L (1.1 g/dL):</strong> Tăng áp lực tĩnh mạch cửa (Xơ gan, Suy tim, Hội chứng Budd-Chiari).<br>
        - <strong>SAAG &lt; 11 g/L (&lt; 1.1 g/dL):</strong> Không tăng áp cửa (Lao màng bụng, Ung thư di căn phúc mạc, Hội chứng thận hư).
      </p>
    </div>
  `;
}

// 4. XUẤT HUYẾT TIÊU HÓA (GBS)
export function renderXhthContent(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #dc2626; margin-bottom: 0.75rem;">
        <i class="fa-solid fa-heart-crack"></i> Thang Điểm Glasgow-Blatchford (GBS) — Xuất Huyết Tiêu Hóa Trên
      </h3>
      <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">
        Sàng lọc bệnh nhân xuất huyết tiêu hóa trên nguy cơ thấp có thể xuất viện theo dõi ngoại trú (GBS = 0 hoặc 1) vs bệnh nhân cần can thiệp nội soi khẩn cấp & truyền máu (GBS ≥ 6).
      </p>
    </div>
  `;
}

// 5. NGUY CƠ HCC
export function renderHccContent(): string {
  return `
    <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #d97706; margin-bottom: 0.75rem;">
        <i class="fa-solid fa-shield-virus"></i> Phân Tầng Nguy Cơ HCC Theo Hướng Dẫn AGA 2026
      </h3>
      <p style="font-size: 0.9rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.5rem;">
        Tầm soát định kỳ Ung thư biểu mô tế bào gan (HCC) mỗi 6 tháng bằng Siêu âm bụng + AFP cho tất cả bệnh nhân xơ gan hoặc viêm gan B mạn tính có yếu tố nguy cơ.
      </p>
    </div>
  `;
}

// Global Window Bindings
declare global {
  interface Window {
    switchGastroTab: (tab: GastroToolTab) => void;
    recalcChildPugh: () => void;
    recalcNutri: () => void;
  }
}

if (typeof window !== 'undefined') {
  window.switchGastroTab = (tab: GastroToolTab) => {
    const container = document.getElementById('app');
    if (container) {
      container.innerHTML = renderGastroToolsView(tab);
    }
  };

  window.recalcChildPugh = () => {
    const b = parseInt((document.getElementById('cp-bili') as HTMLSelectElement)?.value || '1', 10);
    const a = parseInt((document.getElementById('cp-alb') as HTMLSelectElement)?.value || '1', 10);
    const i = parseInt((document.getElementById('cp-inr') as HTMLSelectElement)?.value || '1', 10);
    const asc = parseInt((document.getElementById('cp-ascites') as HTMLSelectElement)?.value || '1', 10);
    const he = parseInt((document.getElementById('cp-he') as HTMLSelectElement)?.value || '1', 10);

    const total = b + a + i + asc + he;
    const scoreValEl = document.getElementById('cp-score-val');
    const classTextEl = document.getElementById('cp-class-text');
    const survTextEl = document.getElementById('cp-survival-text');

    if (scoreValEl && classTextEl && survTextEl) {
      scoreValEl.textContent = `${total}`;
      if (total <= 6) {
        classTextEl.textContent = 'Child-Pugh Lớp A (Bù trừ tốt)';
        classTextEl.style.color = '#059669';
        scoreValEl.style.color = '#059669';
        survTextEl.textContent = 'Tỷ lệ sống còn 1 năm: 100% | 2 năm: 85%';
      } else if (total <= 9) {
        classTextEl.textContent = 'Child-Pugh Lớp B (Mất bù vừa)';
        classTextEl.style.color = '#d97706';
        scoreValEl.style.color = '#d97706';
        survTextEl.textContent = 'Tỷ lệ sống còn 1 năm: 80% | 2 năm: 60%';
      } else {
        classTextEl.textContent = 'Child-Pugh Lớp C (Mất bù nặng)';
        classTextEl.style.color = '#dc2626';
        scoreValEl.style.color = '#dc2626';
        survTextEl.textContent = 'Tỷ lệ sống còn 1 năm: 45% | 2 năm: 35%';
      }
    }
  };

  window.recalcNutri = () => {
    const w = parseFloat((document.getElementById('nutri-weight') as HTMLInputElement)?.value || '55');
    const stress = parseFloat((document.getElementById('nutri-stress') as HTMLSelectElement)?.value || '30');

    const kcal = Math.round(w * stress);
    const protMin = Math.round(w * 1.2);
    const protMax = Math.round(w * 1.5);

    const kcalEl = document.getElementById('nutri-kcal-val');
    const protEl = document.getElementById('nutri-prot-val');

    if (kcalEl && protEl) {
      kcalEl.textContent = `${kcal}`;
      protEl.textContent = `${protMin} - ${protMax}`;
    }
  };
}
