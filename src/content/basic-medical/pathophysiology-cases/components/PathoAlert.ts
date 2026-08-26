/**
 * CliniPortal 2.0 — Pathophysiology Alert Component
 * Path: src/content/basic-medical/pathophysiology-cases/components/PathoAlert.ts
 */

export interface PathoAlertProps {
  type: 'pearl' | 'danger' | 'cascade' | 'mechanism' | 'info';
  title?: string;
  children: string;
}

export function renderPathoAlert(props: PathoAlertProps): string {
  const { type = 'info', title, children } = props;

  const iconMap: Record<string, string> = {
    pearl: 'fa-solid fa-gem text-amber-500',
    danger: 'fa-solid fa-triangle-exclamation text-rose-500',
    cascade: 'fa-solid fa-code-merge text-emerald-500',
    mechanism: 'fa-solid fa-microscope text-purple-500',
    info: 'fa-solid fa-circle-info text-sky-500'
  };

  const borderMap: Record<string, string> = {
    pearl: 'border-amber-400 bg-amber-500/5',
    danger: 'border-rose-400 bg-rose-500/5',
    cascade: 'border-emerald-400 bg-emerald-500/5',
    mechanism: 'border-purple-400 bg-purple-500/5',
    info: 'border-sky-400 bg-sky-500/5'
  };

  const icon = iconMap[type] || iconMap.info;
  const borderClass = borderMap[type] || borderMap.info;

  return `
    <div class="patho-alert my-6 p-4 rounded-xl border-l-4 shadow-xs transition-all ${borderClass}" data-alert-type="${type}">
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
