/**
 * CliniPortal — Bệnh Lý & Phác Đồ Lâm Sàng (Pathology Matrix) Native SPA View (TypeScript)
 * Path: src/content/approaches/pathology/benh-ly-view.ts
 */

import { SPECIALTIES } from './benh-ly';

export function renderBenhLyView(): string {
  return `
    <div class="pathology-container animate-fade-in" style="max-width: 1200px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/approaches" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Phân Hệ Tiếp Cận</a> / Bệnh Lý & Phác Đồ Điều Trị
          </div>
          <h1 style="font-size: 1.75rem; font-weight: 800; color: var(--color-text, #1e293b); margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-disease" style="color: var(--color-primary, #0284c7);"></i> Tiếp Cận Bệnh Lý & Infographic Poster Board
          </h1>
        </div>
        
        <div style="display: flex; gap: 0.5rem;">
          <a href="#/approaches" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Quay lại
          </a>
        </div>
      </div>

      <!-- Specialty Filter Pills -->
      <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.75rem; margin-bottom: 1.25rem;">
        <button class="spec-pill active" onclick="window.filterSpecialty('all')" style="padding: 0.45rem 1rem; border-radius: 20px; border: 1px solid var(--color-primary, #0284c7); background: var(--color-primary, #0284c7); color: white; font-weight: 600; font-size: 0.85rem; cursor: pointer; white-space: nowrap;">
          Tất cả chuyên khoa
        </button>
        ${Object.entries(SPECIALTIES).map(([key, spec]) => `
          <button class="spec-pill" onclick="window.filterSpecialty('${key}')" style="padding: 0.45rem 1rem; border-radius: 20px; border: 1px solid var(--color-border, #cbd5e1); background: var(--color-surface, #fff); color: var(--color-text, #334155); font-weight: 600; font-size: 0.85rem; cursor: pointer; white-space: nowrap;">
            ${spec.name}
          </button>
        `).join('')}
      </div>

      <!-- Search & Controls -->
      <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
        <div style="flex: 1; min-width: 250px; position: relative;">
          <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--color-text-muted, #94a3b8);"></i>
          <input type="text" id="diseaseSearchInput" placeholder="Tìm bệnh lý, mã ICD-10, thuốc điều trị..." oninput="window.searchDiseases(this.value)" style="width: 100%; padding: 0.65rem 1rem 0.65rem 2.5rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; box-sizing: border-box;" />
        </div>
      </div>

      <!-- Disease Cards Grid -->
      <div id="diseaseCardsContainer" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem;">
        <!-- Card 1: DVT -->
        <div class="disease-card" data-specialty="noi-khoa" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem; box-shadow: 0 2px 4px rgba(0,0,0,0.04); transition: transform 0.2s, box-shadow 0.2s;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
            <span style="font-size: 0.75rem; font-weight: 700; background: rgba(2, 132, 199, 0.1); color: #0284c7; padding: 2px 8px; border-radius: 4px;">Nội Tim Mạch</span>
            <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">ICD-10: I82.9</span>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #1e293b); margin: 0 0 0.5rem 0;">
            Huyết Khối Tĩnh Mạch Sâu (DVT)
          </h3>
          <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin: 0 0 1rem 0; line-height: 1.4;">
            Phác đồ chẩn đoán theo Thang điểm Wells, xét nghiệm D-Dimer, Siêu âm Doppler và điều trị kháng đông DOAC (Rivaroxaban, Apixaban).
          </p>
          <div style="display: flex; gap: 0.5rem;">
            <a href="#/calculators/wells-dvt" style="padding: 0.4rem 0.8rem; background: var(--color-bg, #f8fafc); border: 1px solid var(--color-border, #cbd5e1); border-radius: 6px; font-size: 0.8rem; font-weight: 600; color: var(--color-text, #334155); text-decoration: none;">
              <i class="fa-solid fa-calculator"></i> Wells Score
            </a>
            <button onclick="window.viewDiseasePoster('dvt')" style="padding: 0.4rem 0.8rem; background: var(--color-primary, #0284c7); border: none; border-radius: 6px; font-size: 0.8rem; font-weight: 600; color: white; cursor: pointer;">
              <i class="fa-solid fa-chart-pie"></i> Xem Infographic
            </button>
          </div>
        </div>

        <!-- Card 2: STEMI -->
        <div class="disease-card" data-specialty="noi-khoa" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
            <span style="font-size: 0.75rem; font-weight: 700; background: rgba(220, 38, 38, 0.1); color: #dc2626; padding: 2px 8px; border-radius: 4px;">Cấp Cứu Tim Mạch</span>
            <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">ICD-10: I21.0</span>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #1e293b); margin: 0 0 0.5rem 0;">
            Nhồi Máu Cơ Tim ST Chênh Lên (STEMI)
          </h3>
          <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin: 0 0 1rem 0; line-height: 1.4;">
            Thời gian vàng tái tưới máu: Can thiệp ĐMV thì đầu (PPCI < 120 phút) hoặc Tiêu sợi huyết (Fibrinolysis < 30 phút).
          </p>
          <div style="display: flex; gap: 0.5rem;">
            <button onclick="window.viewDiseasePoster('stemi')" style="padding: 0.4rem 0.8rem; background: #dc2626; border: none; border-radius: 6px; font-size: 0.8rem; font-weight: 600; color: white; cursor: pointer;">
              <i class="fa-solid fa-bolt"></i> Phác đồ Door-to-Balloon
            </button>
          </div>
        </div>

        <!-- Card 3: Dengue -->
        <div class="disease-card" data-specialty="truyen-nhiem" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem; box-shadow: 0 2px 4px rgba(0,0,0,0.04);">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
            <span style="font-size: 0.75rem; font-weight: 700; background: rgba(217, 119, 6, 0.1); color: #d97706; padding: 2px 8px; border-radius: 4px;">Truyền Nhiễm</span>
            <span style="font-size: 0.75rem; color: var(--color-text-muted, #64748b);">ICD-10: A97</span>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #1e293b); margin: 0 0 0.5rem 0;">
            Sốt Xuất Huyết Dengue
          </h3>
          <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin: 0 0 1rem 0; line-height: 1.4;">
            Nhận diện giai đoạn nguy hiểm (Ngày 3-7), dấu hiệu cảnh báo (Warning Signs), phác đồ bù dịch chống sốc theo Bộ Y Tế.
          </p>
          <div style="display: flex; gap: 0.5rem;">
            <button onclick="window.viewDiseasePoster('dengue')" style="padding: 0.4rem 0.8rem; background: #d97706; border: none; border-radius: 6px; font-size: 0.8rem; font-weight: 600; color: white; cursor: pointer;">
              <i class="fa-solid fa-droplet"></i> Phác đồ Chống Sốc
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Global Handlers
if (typeof window !== 'undefined') {
  (window as any).filterSpecialty = (specKey: string) => {
    const cards = document.querySelectorAll('.disease-card');
    cards.forEach(card => {
      const cardSpec = card.getAttribute('data-specialty');
      if (specKey === 'all' || cardSpec === specKey) {
        (card as HTMLElement).style.display = 'block';
      } else {
        (card as HTMLElement).style.display = 'none';
      }
    });

    document.querySelectorAll('.spec-pill').forEach(p => {
      (p as HTMLElement).style.background = 'var(--color-surface, #fff)';
      (p as HTMLElement).style.color = 'var(--color-text, #334155)';
      (p as HTMLElement).style.borderColor = 'var(--color-border, #cbd5e1)';
    });
    const cur = event?.target as HTMLElement;
    if (cur) {
      cur.style.background = 'var(--color-primary, #0284c7)';
      cur.style.color = 'white';
      cur.style.borderColor = 'var(--color-primary, #0284c7)';
    }
  };

  (window as any).searchDiseases = (query: string) => {
    const q = query.toLowerCase().trim();
    const cards = document.querySelectorAll('.disease-card');
    cards.forEach(card => {
      const text = card.textContent?.toLowerCase() || '';
      if (!q || text.includes(q)) {
        (card as HTMLElement).style.display = 'block';
      } else {
        (card as HTMLElement).style.display = 'none';
      }
    });
  };

  (window as any).viewDiseasePoster = (id: string) => {
    alert(`Đang mở Infographic Poster Board cho bệnh lý: ${id.toUpperCase()}`);
  };
}
