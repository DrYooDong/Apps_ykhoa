/**
 * CliniPortal 2.0 — Pathophysiology Quick Navigation Component
 * Path: src/content/basic-medical/pathophysiology-cases/components/PathoQuickNav.ts
 */

export function renderPathoQuickNav(): string {
  return `
    <div class="patho-quick-nav my-4 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
      <div class="flex items-center gap-2 font-medium">
        <i class="fa-solid fa-microscope text-emerald-500"></i>
        <span>Cơ Chế Bệnh Sinh & Sinh Lý Bệnh Học (CCBS - SBL)</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">Harrison & Robbins 10th</span>
        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-600 dark:text-sky-400 font-semibold">MDX Native v2.0</span>
      </div>
    </div>
  `;
}
