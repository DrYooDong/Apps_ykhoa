/**
 * Guideline Command Palette & Quick Search (guideline-cmd-palette.ts)
 * Path: src/content/ebm/guidelines/js/guideline-cmd-palette.ts
 * Phân hệ Y học chứng cứ (EBM) | CliniPortal
 */

export interface CmdItem {
  id: string;
  type: 'system' | 'study' | 'icd';
  icon: string;
  title: string;
  sub?: string;
  action: () => void;
}

export class GuidelineCmdPalette {
  private static selectedIdx = 0;
  private static currentResults: CmdItem[] = [];

  public static toggle(): void {
    const modal = document.getElementById('command-palette-modal');
    if (!modal) return;
    if (modal.classList.contains('active')) {
      this.close();
    } else {
      this.open();
    }
  }

  public static open(): void {
    const modal = document.getElementById('command-palette-modal');
    const input = document.getElementById('cmd-palette-input') as HTMLInputElement | null;
    if (!modal || !input) return;

    modal.classList.add('active');
    input.value = '';
    this.selectedIdx = 0;
    this.renderResults('');

    setTimeout(() => input.focus(), 50);
  }

  public static close(): void {
    const modal = document.getElementById('command-palette-modal');
    if (modal) modal.classList.remove('active');
  }

  public static renderResults(query: string): void {
    const container = document.getElementById('cmd-palette-results');
    if (!container) return;

    const trimmed = query.trim().toLowerCase();
    const results: CmdItem[] = [];

    // System commands
    results.push({
      id: 'cmd_ebm_lab',
      type: 'system',
      icon: '🧪',
      title: 'Mở EBM Practice Lab (NNT/Forest/Funnel Plot)',
      action: () => { window.location.href = '../ebm-lab/ebm-lab.html'; }
    });

    results.push({
      id: 'cmd_radar',
      type: 'system',
      icon: '📡',
      title: 'Mở Guideline Radar Feed',
      action: () => { window.location.href = '../guideline-radar/radar.html'; }
    });

    this.currentResults = results;
    container.innerHTML = results.map((item, idx) => `
      <div class="cmd-item ${idx === 0 ? 'active' : ''}" style="padding: 10px 14px; display: flex; align-items: center; gap: 10px; cursor: pointer; border-bottom: 1px solid var(--color-divider);" data-idx="${idx}">
        <span style="font-size: 1.2rem;">${item.icon}</span>
        <div style="flex: 1;">
          <div style="font-weight: 700; font-size: 0.9rem; color: var(--color-text);">${item.title}</div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.cmd-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt((el as HTMLElement).dataset.idx || '0', 10);
        this.currentResults[idx]?.action();
        this.close();
      });
    });
  }

  public static init(): void {
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
      }
    });

    const input = document.getElementById('cmd-palette-input');
    input?.addEventListener('input', (e) => {
      this.renderResults((e.target as HTMLInputElement).value);
    });
  }
}

if (typeof window !== 'undefined') {
  (window as any).GuidelineCmdPalette = GuidelineCmdPalette;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => GuidelineCmdPalette.init());
  } else {
    GuidelineCmdPalette.init();
  }
}
