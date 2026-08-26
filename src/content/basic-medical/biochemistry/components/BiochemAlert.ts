/**
 * CliniPortal 2.0 — Biochemistry Alert Component
 * Path: src/content/basic-medical/biochemistry/components/BiochemAlert.ts
 */

export interface BiochemAlertProps {
  type: 'pearl' | 'danger' | 'reaction' | 'pathway' | 'info';
  title?: string;
  children: string;
}

export function renderBiochemAlert(props: BiochemAlertProps): string {
  const { type = 'info', title, children } = props;
  
  const iconMap: Record<string, string> = {
    pearl: 'fa-solid fa-gem text-amber-500',
    danger: 'fa-solid fa-triangle-exclamation text-rose-500',
    reaction: 'fa-solid fa-flask-vial text-emerald-500',
    pathway: 'fa-solid fa-arrows-split-up-and-left text-sky-500',
    info: 'fa-solid fa-circle-info text-blue-500'
  };

  const borderMap: Record<string, string> = {
    pearl: 'border-amber-400 bg-amber-500/5',
    danger: 'border-rose-400 bg-rose-500/5',
    reaction: 'border-emerald-400 bg-emerald-500/5',
    pathway: 'border-sky-400 bg-sky-500/5',
    info: 'border-blue-400 bg-blue-500/5'
  };

  const icon = iconMap[type] || iconMap.info;
  const borderClass = borderMap[type] || borderMap.info;

  return `
    <div class="biochem-alert my-6 p-4 rounded-xl border-l-4 shadow-xs transition-all ${borderClass}" data-alert-type="${type}">
      ${title ? `
        <div class="flex items-center gap-2 mb-2 font-semibold text-slate-800 dark:text-slate-100">
          <i class="${icon}"></i>
          <span>${title}</span>
        </div>
      ` : ''}
      <div class="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        ${children}
      </div>
    </div>
  `;
}
