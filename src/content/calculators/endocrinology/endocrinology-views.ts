import { render_insulin_studio_View } from './insulin-studio-view';

export function renderEndocrinologyToolsView(): string {
  setTimeout(() => {
    if (typeof window !== 'undefined' && (window as any).recalcInsulin) {
      (window as any).recalcInsulin();
    }
  }, 50);

  return render_insulin_studio_View();
}

