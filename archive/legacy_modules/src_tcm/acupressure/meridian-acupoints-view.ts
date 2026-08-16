/**
 * CliniPortal — Meridian & Acupoints SPA View (TypeScript)
 * Path: src/content/tcm/acupressure/meridian-acupoints-view.ts
 */

import { ACUPOINTS_DATA } from '../data';

export function renderMeridianAcupointsView(): string {
  const acupointsList = Object.entries(ACUPOINTS_DATA).map(([id, data]) => ({ id, ...data }));

  return `
    <div class="acupoints-container animate-fade-in" style="max-width: 1440px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/tcm" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Y Học Cổ Truyền</a> / Bản Đồ Huyệt Vị
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; color: #0d9488; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-person-dots-from-line"></i> Bản Đồ 14 Đường Kinh Lạc & Tra Cứu Huyệt Vị
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Vị trí giải phẫu, phương pháp xác định thốn (đồng thân thốn), chỉ định điều trị và kỹ thuật châm cứu - day bấm huyệt an toàn.
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/tcm/duoc-lieu" class="btn btn-outline" style="padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-leaf" style="color: #16a34a;"></i> Dược Liệu & Phương Tễ
          </a>
          <a href="#/tcm/ngu-hanh" class="btn btn-outline" style="padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-circle-nodes" style="color: #ea580c;"></i> Ngũ Hành Studio
          </a>
        </div>
      </div>

      <!-- Quick Search -->
      <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem; margin-bottom: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
        <div style="display: grid; grid-template-columns: 2fr 1fr auto; gap: 1rem; align-items: center;">
          <div style="position: relative;">
            <i class="fa-solid fa-magnifying-glass" style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #94a3b8;"></i>
            <input type="text" id="acupoint-search" placeholder="Tìm tên huyệt vị, kinh lạc, chỉ định (VD: Hợp Cốc, Túc Tam Lý, Đau đầu, Mất ngủ...)..." 
              style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; font-size: 0.95rem;" oninput="window.filterAcupoints()" />
          </div>

          <div>
            <select id="acupoint-meridian-filter" style="width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--color-border, #cbd5e1); border-radius: 8px; font-size: 0.9rem;" onchange="window.filterAcupoints()">
              <option value="all">Tất cả đường kinh lạc</option>
              <option value="Đại Trường">Kinh Thủ Dương Minh Đại Trường (LI)</option>
              <option value="Vị">Kinh Túc Dương Minh Vị (ST)</option>
              <option value="Tâm Bào">Kinh Thủ Quyết Âm Tâm Bào (PC)</option>
              <option value="Tỳ">Kinh Túc Thái Âm Tỳ (SP)</option>
              <option value="Thận">Kinh Túc Thiếu Âm Thận (KI)</option>
              <option value="Can">Kinh Túc Quyết Âm Can (LR)</option>
            </select>
          </div>

          <div>
            <span id="acupoint-count" style="font-size: 0.85rem; font-weight: 700; color: #0d9488; background: #ccfbf1; padding: 0.75rem 1rem; border-radius: 8px; white-space: nowrap; display: inline-block;">
              ${acupointsList.length} Huyệt Vị
            </span>
          </div>
        </div>
      </div>

      <!-- Acupoints Cards Grid -->
      <div id="acupoints-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 1.25rem;">
        ${acupointsList.map(pt => `
          <div class="acupoint-card" data-meridian="${pt.meridian}" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                <span style="background: #ccfbf1; color: #0d9488; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 4px; text-transform: uppercase;">
                  ${pt.code} • ${pt.meridian}
                </span>
                <span style="font-size: 1.25rem;">📍</span>
              </div>

              <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a); margin: 0 0 0.5rem 0;">
                ${pt.name} (${pt.pinyin})
              </h3>

              <div style="font-size: 0.85rem; color: #334155; line-height: 1.5; margin-bottom: 0.75rem;">
                <strong>Vị trí:</strong> ${pt.location}
              </div>

              <div style="background: #f8fafc; border-radius: 6px; padding: 0.75rem; font-size: 0.825rem; color: #475569; margin-bottom: 0.75rem;">
                <strong>Chỉ định:</strong> ${pt.indications}
              </div>
            </div>

            <div style="border-top: 1px dashed #e2e8f0; padding-top: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.75rem; color: #dc2626; font-weight: 600;">
                ${(pt as any).contra ? '⚠️ ' + (pt as any).contra : 'Day bấm 1-3 phút'}
              </span>
              <button onclick="alert('Đang xem đồ họa 3D huyệt vị: ${pt.name}')" style="background: #0d9488; color: #fff; border: none; padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer;">
                Chi tiết <i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Global Window Bindings
declare global {
  interface Window {
    filterAcupoints: () => void;
  }
}

if (typeof window !== 'undefined') {
  window.filterAcupoints = () => {
    const q = (document.getElementById('acupoint-search') as HTMLInputElement)?.value.toLowerCase().trim() || '';
    const meridian = (document.getElementById('acupoint-meridian-filter') as HTMLSelectElement)?.value || 'all';

    document.querySelectorAll('.acupoint-card').forEach(card => {
      const text = card.textContent?.toLowerCase() || '';
      const cardMeridian = (card as HTMLElement).dataset.meridian || '';

      const matchQ = !q || text.includes(q);
      const matchMeridian = (meridian === 'all' || cardMeridian.includes(meridian));

      if (matchQ && matchMeridian) {
        (card as HTMLElement).style.display = 'flex';
      } else {
        (card as HTMLElement).style.display = 'none';
      }
    });
  };
}
