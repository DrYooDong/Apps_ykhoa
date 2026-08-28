/**
 * CliniPortal — Epidemiology Vector Comparison Table (TypeScript)
 * Path: src/content/basic-medical/epidemiology/components/EpiVectorTable.ts
 */

export interface VectorComparisonRow {
  characteristic: string;
  primaryVector: string;
  secondaryVector?: string;
  significance?: string;
}

export interface EpiVectorTableProps {
  title: string;
  primaryName: string;
  secondaryName?: string;
  rows: VectorComparisonRow[];
}

export function renderEpiVectorTable(props: EpiVectorTableProps): string {
  const { title, primaryName, secondaryName, rows } = props;

  return `
    <div class="epi-table-wrapper" style="margin: 2rem 0; overflow-x: auto; border-radius: 16px; border: 1.5px solid var(--color-border, #cbd5e1); box-shadow: 0 4px 20px -2px rgba(0,0,0,0.05); background: var(--color-surface, #ffffff);">
      <div style="padding: 1rem 1.25rem; background: var(--color-surface-offset, #f8fafc); border-bottom: 1px solid var(--color-border, #e2e8f0); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
        <span style="font-size: 0.88rem; font-weight: 800; color: var(--color-text, #0f172a); font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif); display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-table-columns" style="color: #0d9488;"></i> ${title}
        </span>
        <span class="badge" style="background: rgba(13, 148, 136, 0.1); color: #0d9488; font-size: 0.72rem; font-weight: 700; border-radius: 999px; padding: 0.25rem 0.65rem;">
          Đối Sánh Sinh Học Véc-tơ
        </span>
      </div>

      <table class="epi-table" style="width: 100%; border-collapse: collapse; font-size: 0.9rem; text-align: left;">
        <thead>
          <tr style="background: var(--color-surface-2, #f1f5f9); border-bottom: 2px solid var(--color-border, #cbd5e1);">
            <th style="padding: 0.9rem 1.15rem; font-weight: 800; color: var(--color-text, #0f172a); width: 25%;">
              Đặc Tính Sinh Học
            </th>
            <th style="padding: 0.9rem 1.15rem; font-weight: 800; color: #0d9488; width: 28%;">
              <span style="display: inline-flex; align-items: center; gap: 0.35rem; background: rgba(13, 148, 136, 0.12); padding: 0.2rem 0.6rem; border-radius: 6px;">
                <i class="fa-solid fa-mosquito"></i> ${primaryName} (Chính)
              </span>
            </th>
            ${secondaryName ? `
              <th style="padding: 0.9rem 1.15rem; font-weight: 800; color: #3b82f6; width: 25%;">
                <span style="display: inline-flex; align-items: center; gap: 0.35rem; background: rgba(59, 130, 246, 0.12); padding: 0.2rem 0.6rem; border-radius: 6px;">
                  <i class="fa-solid fa-mosquito"></i> ${secondaryName} (Phụ)
                </span>
              </th>
            ` : ''}
            <th style="padding: 0.9rem 1.15rem; font-weight: 800; color: #d97706;">
              Ý Nghĩa Dịch Tễ & Can Thiệp
            </th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row, idx) => `
            <tr style="border-bottom: 1px solid var(--color-border, #e2e8f0); background: ${idx % 2 === 0 ? 'transparent' : 'var(--color-surface-offset, rgba(0,0,0,0.015))'}; transition: background 0.15s ease;">
              <td style="padding: 0.9rem 1.15rem; font-weight: 750; color: var(--color-text, #0f172a); vertical-align: top;">
                ${row.characteristic}
              </td>
              <td style="padding: 0.9rem 1.15rem; color: var(--color-text, #1e293b); vertical-align: top; line-height: 1.5;">
                ${row.primaryVector}
              </td>
              ${secondaryName ? `
                <td style="padding: 0.9rem 1.15rem; color: var(--color-text, #1e293b); vertical-align: top; line-height: 1.5;">
                  ${row.secondaryVector || '—'}
                </td>
              ` : ''}
              <td style="padding: 0.9rem 1.15rem; font-size: 0.86rem; color: var(--color-text-muted, #475569); vertical-align: top; line-height: 1.5;">
                ${row.significance || '—'}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

