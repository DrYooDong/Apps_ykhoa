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
    <div class="epi-table-wrapper" style="margin: 1.5rem 0; overflow-x: auto; border-radius: 12px; border: 1px solid var(--color-border, #e2e8f0); box-shadow: 0 2px 12px rgba(0,0,0,0.03);">
      <table class="epi-table" style="width: 100%; border-collapse: collapse; font-size: 0.92rem; background: var(--color-surface, #ffffff);">
        <thead>
          <tr style="background: var(--color-surface-offset, #f8fafc); border-bottom: 2px solid var(--color-border, #cbd5e1);">
            <th style="padding: 0.85rem 1rem; text-align: left; font-weight: 800; color: var(--color-text, #0f172a); width: 28%;">
              ${title}
            </th>
            <th style="padding: 0.85rem 1rem; text-align: left; font-weight: 800; color: #0d9488;">
              <i class="fa-solid fa-mosquito"></i> ${primaryName} (Chính)
            </th>
            ${secondaryName ? `
              <th style="padding: 0.85rem 1rem; text-align: left; font-weight: 800; color: #3b82f6;">
                <i class="fa-solid fa-mosquito"></i> ${secondaryName} (Phụ)
              </th>
            ` : ''}
            <th style="padding: 0.85rem 1rem; text-align: left; font-weight: 800; color: var(--color-text-muted, #64748b);">
              Ý Nghĩa Dịch Tễ Học
            </th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row, idx) => `
            <tr style="border-bottom: 1px solid var(--color-border, #e2e8f0); background: ${idx % 2 === 0 ? 'transparent' : 'var(--color-surface-offset, rgba(0,0,0,0.015))'};">
              <td style="padding: 0.85rem 1rem; font-weight: 700; color: var(--color-text, #0f172a);">
                ${row.characteristic}
              </td>
              <td style="padding: 0.85rem 1rem; color: var(--color-text, #1e293b);">
                ${row.primaryVector}
              </td>
              ${secondaryName ? `
                <td style="padding: 0.85rem 1rem; color: var(--color-text, #1e293b);">
                  ${row.secondaryVector || '—'}
                </td>
              ` : ''}
              <td style="padding: 0.85rem 1rem; font-size: 0.88rem; color: var(--color-text-muted, #475569);">
                ${row.significance || '—'}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}
