/**
 * CliniPortal 2.0 — Clinical Urgency Pill Badge Component (TypeScript Native)
 * Path: src/content/basic-medical/approach/components/UrgencyPill.ts
 *
 * Huy hiệu phân tầng mức độ khẩn cấp lâm sàng:
 * - emergent: Tối khẩn / Đe dọa tính mạng (Red/Rose)
 * - urgent: Khẩn cấp / Cần xử trí sớm (Amber)
 * - routine: Thường quy / Ngoại trú có hệ thống (Emerald)
 */

import { ApproachUrgency } from '../types/approach.types';

export function renderUrgencyPill(level: ApproachUrgency = 'urgent', customLabel?: string): string {
  let label = customLabel || 'KHẨN CẤP (URGENT)';
  let bg = 'rgba(245, 158, 11, 0.15)';
  let color = '#d97706';
  let border = 'rgba(245, 158, 11, 0.35)';
  let icon = 'fa-clock';

  if (level === 'emergent') {
    label = customLabel || 'TỐI KHẨN (EMERGENT)';
    bg = 'rgba(225, 29, 72, 0.14)';
    color = '#e11d48';
    border = 'rgba(225, 29, 72, 0.35)';
    icon = 'fa-triangle-exclamation';
  } else if (level === 'routine') {
    label = customLabel || 'THƯỜNG QUY (ROUTINE)';
    bg = 'rgba(16, 185, 129, 0.14)';
    color = '#059669';
    border = 'rgba(16, 185, 129, 0.35)';
    icon = 'fa-circle-check';
  }

  return `<span class="urgency-pill urgency-pill--${level}" style="display: inline-flex; align-items: center; gap: 5px; padding: 2px 9px; border-radius: 999px; background: ${bg}; color: ${color}; border: 1px solid ${border}; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.03em; white-space: nowrap; vertical-align: middle; line-height: 1.4; box-sizing: border-box;"><i class="fa-solid ${icon}"></i><span>${label}</span></span>`;
}
