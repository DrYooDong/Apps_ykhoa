/**
 * CliniPortal — Integrative Medicine (Đông - Tây Y Kết Hợp) SPA View (TypeScript)
 * Path: src/content/tcm/dong-tay-y-bridge/integrative-bridge-view.ts
 */

import { INTEGRATIVE_PROTOCOLS_DATA } from '../data';

export function renderIntegrativeBridgeView(): string {
  return `
    <div class="integrative-bridge-container animate-fade-in" style="max-width: 1400px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/tcm" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Y Học Cổ Truyền</a> / Đông Tây Y Kết Hợp
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; color: #0284c7; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-bridge"></i> Cầu Nối Đông - Tây Y Kết Hợp & Phác Đồ Toàn Diện
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Đối chiếu tương đương bệnh danh giữa Y Học Hiện Đại và Y Học Cổ Truyền, phác đồ kết hợp thuốc Tây Y chuẩn mực cùng Châm cứu, Dược liệu YHCT.
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/tcm" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> TCM Hub
          </a>
        </div>
      </div>

      <!-- Protocols Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 1.5rem;">
        ${INTEGRATIVE_PROTOCOLS_DATA.map(p => `
          <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="background: #e0f2fe; color: #0284c7; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 4px; text-transform: uppercase;">
                  Tây Y: ${p.westernDisease}
                </span>
                <span style="font-size: 1.25rem;">🤝</span>
              </div>

              <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--color-text, #0f172a); margin: 0 0 0.25rem 0;">
                Thể bệnh: ${p.tcmPattern}
              </h3>

              <!-- Western Rx -->
              <div style="background: #f8fafc; border-left: 3px solid #0284c7; padding: 0.75rem; border-radius: 0 6px 6px 0; font-size: 0.825rem; color: #334155; margin-bottom: 0.75rem; margin-top: 0.75rem;">
                <strong>🏥 Phác đồ Tây Y:</strong><br>
                ${p.westernTreatment}
              </div>

              <!-- TCM Rx -->
              <div style="background: #f0fdf4; border-left: 3px solid #16a34a; padding: 0.75rem; border-radius: 0 6px 6px 0; font-size: 0.825rem; color: #166534; margin-bottom: 0.75rem;">
                <strong>🌿 Bài thuốc Đông Y:</strong><br>
                ${p.tcmFormula}
              </div>

              <!-- Acupoints -->
              <div style="background: #faf5ff; border-left: 3px solid #7c3aed; padding: 0.75rem; border-radius: 0 6px 6px 0; font-size: 0.825rem; color: #6b21a8; margin-bottom: 0.75rem;">
                <strong>📍 Huyệt vị châm cứu:</strong><br>
                ${p.acupoints.join(', ')}
              </div>

              <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 6px; padding: 0.6rem; font-size: 0.8rem; color: #92400e;">
                💡 <em>${p.evidenceNote}</em>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
