/**
 * CliniPortal 2.0 — WHO AWaRe Pill Badge Component (TypeScript Native)
 * Path: src/content/basic-medical/antibiotics/components/AWaRePill.ts
 */

import { AWaReTier } from '../types/antibiotics.types';

export function renderAWaRePill(tier: AWaReTier = 'access'): string {
  let label = 'ACCESS (TIẾP CẬN)';
  let bg = 'rgba(16, 185, 129, 0.15)';
  let color = '#10b981';
  let icon = 'fa-circle-check';

  if (tier === 'watch') {
    label = 'WATCH (GIÁM SÁT)';
    bg = 'rgba(245, 158, 11, 0.15)';
    color = '#f59e0b';
    icon = 'fa-triangle-exclamation';
  } else if (tier === 'reserve') {
    label = 'RESERVE (DỰ TRỮ)';
    bg = 'rgba(239, 68, 68, 0.15)';
    color = '#ef4444';
    icon = 'fa-shield-halved';
  } else if (tier === 'discouraged') {
    label = 'DISCOURAGED (KHÔNG KHUYẾN CÁO)';
    bg = 'rgba(100, 116, 139, 0.15)';
    color = '#64748b';
    icon = 'fa-ban';
  }

  return `
    <span class="aware-pill aware-pill--${tier}" style="
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 9px;
      border-radius: 999px;
      background: ${bg};
      color: ${color};
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 0.03em;
      white-space: nowrap;
    ">
      <i class="fa-solid ${icon}"></i>
      <span>${label}</span>
    </span>
  `;
}

