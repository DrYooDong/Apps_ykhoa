/**
 * CliniPortal — 2D Drug Interaction Matrix SPA View (TypeScript)
 * Path: src/content/pharmacology/tools/interaction-matrix-view.ts
 */

import { DRUG_INTERACTIONS_DATA } from '../data';
import { showInteractionDetail } from './interaction-matrix';

export function renderInteractionMatrixView(): string {
  return `
    <div class="interaction-matrix-container animate-fade-in" style="max-width: 1440px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/pharmacology" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Dược Lý Lâm Sàng</a> / Ma Trận Tương Tác Thuốc
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; color: #dc2626; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-table-cells"></i> Ma Trận Tương Tác Thuốc 2D & Tra Cứu Nguy Cơ
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Phát hiện sớm các tương tác chuyển hóa qua CYP450, kéo dài khoảng QT gây xoắn đỉnh, tăng nguy cơ xuất huyết và suy thận cấp.
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/pharmacology/tra-cuu-thuoc" class="btn btn-outline" style="padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-magnifying-glass" style="color: #db2777;"></i> Tra Cứu Thuốc
          </a>
          <a href="#/pharmacology/dose-optimizer" class="btn btn-outline" style="padding: 0.6rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
            <i class="fa-solid fa-calculator" style="color: #0284c7;"></i> Tối Ưu Hóa Liều
          </a>
        </div>
      </div>

      <!-- Severity Legend -->
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
        <span style="background: #fee2e2; color: #dc2626; padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.825rem; font-weight: 700; border: 1px solid #fca5a5;">
          🔴 Chống chỉ định (Contraindicated)
        </span>
        <span style="background: #ffedd5; color: #ea580c; padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.825rem; font-weight: 700; border: 1px solid #fdba74;">
          🟠 Nghiêm trọng (Major - Tránh phối hợp)
        </span>
        <span style="background: #fef9c3; color: #ca8a04; padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.825rem; font-weight: 700; border: 1px solid #fde047;">
          🟡 Trung bình (Moderate - Cần theo dõi)
        </span>
        <span style="background: #dcfce7; color: #16a34a; padding: 0.35rem 0.75rem; border-radius: 6px; font-size: 0.825rem; font-weight: 700; border: 1px solid #86efac;">
          🟢 Hiệp đồng có lợi (Synergistic)
        </span>
      </div>

      <!-- Interactions List -->
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 1.25rem;">
        ${DRUG_INTERACTIONS_DATA.map(item => {
          const isContra = item.severity === 'contraindicated';
          const isMajor = item.severity === 'major';
          const color = isContra ? '#dc2626' : isMajor ? '#ea580c' : '#ca8a04';
          const bg = isContra ? '#fee2e2' : isMajor ? '#ffedd5' : '#fef9c3';

          return `
            <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.25rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                  <span style="background: ${bg}; color: ${color}; font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid ${color}30;">
                    ${item.severityLabel}
                  </span>
                  <span style="font-size: 0.75rem; color: #94a3b8;"><i class="fa-solid fa-code-compare"></i> Tương tác</span>
                </div>

                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                  <span style="font-weight: 700; color: var(--color-text, #0f172a); font-size: 1rem;">${item.drug1}</span>
                  <i class="fa-solid fa-arrows-left-right" style="color: ${color}; font-size: 0.8rem;"></i>
                  <span style="font-weight: 700; color: var(--color-text, #0f172a); font-size: 1rem;">${item.drug2}</span>
                </div>

                <h4 style="font-size: 0.95rem; font-weight: 700; color: ${color}; margin: 0 0 0.5rem 0; line-height: 1.4;">
                  ${item.summary}
                </h4>

                <p style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); line-height: 1.5; margin: 0 0 1rem 0;">
                  ${item.mechanism}
                </p>
              </div>

              <div style="background: #f8fafc; border-left: 3px solid ${color}; padding: 0.6rem 0.75rem; border-radius: 0 6px 6px 0; font-size: 0.8rem; color: #334155;">
                <strong>Xử trí:</strong> ${item.clinicalManagement}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}
