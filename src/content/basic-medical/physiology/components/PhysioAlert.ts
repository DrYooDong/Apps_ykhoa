/**
 * CliniPortal 2.0 — PhysioAlert MDX Component
 * Path: src/content/basic-medical/physiology/components/PhysioAlert.ts
 */

export type PhysioAlertType = 'pearl' | 'mechanism' | 'danger' | 'formula' | 'info';

export interface PhysioAlertProps {
  type: PhysioAlertType;
  title: string;
  badge?: string;
  children: string;
}

export function renderPhysioAlert(props: PhysioAlertProps): string {
  const { type, title, badge, children } = props;

  const configMap: Record<PhysioAlertType, { icon: string; border: string; bg: string; text: string; defaultBadge: string }> = {
    pearl: {
      icon: 'fa-solid fa-lightbulb',
      border: '#0284c7',
      bg: 'rgba(2, 132, 199, 0.08)',
      text: '#0369a1',
      defaultBadge: 'CLINICAL PEARL'
    },
    mechanism: {
      icon: 'fa-solid fa-dna',
      border: '#8b5cf6',
      bg: 'rgba(139, 92, 246, 0.08)',
      text: '#6d28d9',
      defaultBadge: 'CƠ CHẾ PHÂN TỬ'
    },
    formula: {
      icon: 'fa-solid fa-square-root-variable',
      border: '#0d9488',
      bg: 'rgba(13, 148, 136, 0.08)',
      text: '#0f766e',
      defaultBadge: 'CÔNG THỨC SINH LÝ'
    },
    danger: {
      icon: 'fa-solid fa-triangle-exclamation',
      border: '#ef4444',
      bg: 'rgba(239, 68, 68, 0.08)',
      text: '#b91c1c',
      defaultBadge: 'BỆNH LÝ LIÊN QUAN'
    },
    info: {
      icon: 'fa-solid fa-circle-info',
      border: '#3b82f6',
      bg: 'rgba(59, 130, 246, 0.08)',
      text: '#1d4ed8',
      defaultBadge: 'GHI CHÚ'
    }
  };

  const cfg = configMap[type] || configMap.info;
  const badgeText = badge || cfg.defaultBadge;

  return `
    <div class="physio-alert physio-alert-${type}" style="
      margin: 1.5rem 0;
      padding: 1.25rem 1.5rem;
      border-radius: 12px;
      border-left: 5px solid ${cfg.border};
      background: var(--color-surface, #ffffff);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
      border-top: 1px solid var(--color-border, #e2e8f0);
      border-right: 1px solid var(--color-border, #e2e8f0);
      border-bottom: 1px solid var(--color-border, #e2e8f0);
    ">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <i class="${cfg.icon}" style="color: ${cfg.border}; font-size: 1.1rem;"></i>
          <span style="font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 1rem; color: var(--color-text, #0f172a);">
            ${title}
          </span>
        </div>
        <span style="
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          padding: 0.2rem 0.6rem;
          border-radius: 999px;
          background: ${cfg.bg};
          color: ${cfg.text};
          border: 1px solid ${cfg.border}40;
        ">
          ${badgeText}
        </span>
      </div>
      <div style="font-size: 0.94rem; line-height: 1.7; color: var(--color-text, #334155);">
        ${children}
      </div>
    </div>
  `;
}
