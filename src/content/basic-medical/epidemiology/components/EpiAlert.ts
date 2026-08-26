/**
 * CliniPortal — Epidemiology Callout Box Component (TypeScript)
 * Path: src/content/basic-medical/epidemiology/components/EpiAlert.ts
 * 
 * Khung chú thích ngữ nghĩa dịch tễ học:
 * - danger: Cảnh báo bùng phát dịch, đột biến độc lực, nguy cơ tử vong cao
 * - vector: Động học véc-tơ, ủ bệnh ngoại lai EIP, cơ chế truyền bệnh
 * - pearl: Điểm ngọc lâm sàng, bẫy chẩn đoán dịch tễ
 * - surveillance: Giám sát dịch tễ, can thiệp cộng đồng, tiêm chủng
 */

export type EpiAlertType = 'danger' | 'vector' | 'pearl' | 'surveillance' | 'info';

export interface EpiAlertProps {
  type: EpiAlertType;
  title: string;
  children: string;
  badge?: string;
  icon?: string;
}

export function renderEpiAlert(props: EpiAlertProps): string {
  const { type, title, children, badge } = props;

  const config: Record<EpiAlertType, {
    icon: string;
    badgeText: string;
    border: string;
    bg: string;
    titleColor: string;
    badgeBg: string;
  }> = {
    danger: {
      icon: 'fa-triangle-exclamation',
      badgeText: 'CẢNH BÁO DỊCH TỄ',
      border: '#ef4444',
      bg: 'rgba(239, 68, 68, 0.06)',
      titleColor: '#b91c1c',
      badgeBg: '#ef4444'
    },
    vector: {
      icon: 'fa-mosquito',
      badgeText: 'ĐỘNG HỌC VÉC-TƠ',
      border: '#8b5cf6',
      bg: 'rgba(139, 92, 246, 0.06)',
      titleColor: '#6d28d9',
      badgeBg: '#8b5cf6'
    },
    pearl: {
      icon: 'fa-lightbulb',
      badgeText: 'ĐIỂM NGỌC LÂM SÀNG',
      border: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.06)',
      titleColor: '#b45309',
      badgeBg: '#f59e0b'
    },
    surveillance: {
      icon: 'fa-shield-virus',
      badgeText: 'GIÁM SÁT & Y TẾ CỘNG ĐỒNG',
      border: '#0d9488',
      bg: 'rgba(13, 148, 136, 0.06)',
      titleColor: '#0f766e',
      badgeBg: '#0d9488'
    },
    info: {
      icon: 'fa-circle-info',
      badgeText: 'THÔNG TIN BỔ SUNG',
      border: '#0284c7',
      bg: 'rgba(2, 132, 199, 0.06)',
      titleColor: '#0369a1',
      badgeBg: '#0284c7'
    }
  };

  const current = config[type] || config.info;
  const displayBadge = badge || current.badgeText;
  const iconClass = props.icon || current.icon;

  return `
    <div class="epi-alert-box epi-alert-${type}" style="margin: 1.5rem 0; padding: 1.25rem 1.35rem; border-radius: 14px; border-left: 5px solid ${current.border}; background: var(--color-surface, ${current.bg}); border-top: 1px solid var(--color-border, rgba(0,0,0,0.06)); border-right: 1px solid var(--color-border, rgba(0,0,0,0.06)); border-bottom: 1px solid var(--color-border, rgba(0,0,0,0.06)); box-shadow: 0 2px 10px rgba(0,0,0,0.03);">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.65rem; flex-wrap: wrap; gap: 0.5rem;">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <i class="fa-solid ${iconClass}" style="color: ${current.border}; font-size: 1.15rem;"></i>
          <h4 style="margin: 0; font-size: 1.02rem; font-weight: 800; color: ${current.titleColor}; font-family: 'Plus Jakarta Sans', sans-serif;">
            ${title}
          </h4>
        </div>
        <span class="badge" style="background: ${current.badgeBg}; color: #ffffff; font-size: 0.72rem; font-weight: 800; padding: 0.25rem 0.65rem; border-radius: 999px; letter-spacing: 0.03em;">
          ${displayBadge}
        </span>
      </div>
      <div class="epi-alert-body" style="font-size: 0.94rem; line-height: 1.65; color: var(--color-text, #1e293b);">
        ${children}
      </div>
    </div>
  `;
}
