/**
 * DocSpace — Clinical Research Studios Hub Coordinator
 * Modular coordinator delegating each specialized research studio to its respective view & controller.
 */

import { bindActionBtns } from './studios/studio-shared';
import { renderAbgPanel, mountAbgController } from './studios/abg-studio-view';
import { renderEcgPanel, mountEcgController } from './studios/ecg-studio-view';
import { renderElectrolytePanel, mountElectrolyteController } from './studios/electrolyte-studio-view';
import { renderRenalPanel, mountRenalController } from './studios/renal-studio-view';
import { renderCardioPanel, mountCardioController } from './studios/cardio-studio-view';
import { renderSepsisPanel, mountSepsisController } from './studios/sepsis-studio-view';
import { renderCirrhosisPanel, mountCirrhosisController } from './studios/cirrhosis-studio-view';

export type StudioTabKey = 'abg' | 'ecg' | 'electrolyte' | 'renal' | 'cardio' | 'sepsis' | 'cirrhosis';

/**
 * Render Master Studios View Shell
 */
export function renderStudiosView(pidOrTab?: string, maybeTab?: StudioTabKey): string {
  let initialTab: StudioTabKey = 'abg';
  if (pidOrTab && ['abg', 'ecg', 'electrolyte', 'renal', 'cardio', 'sepsis', 'cirrhosis'].includes(pidOrTab)) {
    initialTab = pidOrTab as StudioTabKey;
  } else if (maybeTab && ['abg', 'ecg', 'electrolyte', 'renal', 'cardio', 'sepsis', 'cirrhosis'].includes(maybeTab)) {
    initialTab = maybeTab;
  }

  return `
    <div class="dsp-app">
      <!-- Main Content Container -->
      <main class="dsp-main" style="max-width:1440px; margin:0 auto; padding:1.25rem 1.5rem 3rem;">
        
        <!-- Header & Breadcrumbs -->
        <header class="dsp-header" style="margin-bottom:1.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem;">
            <div>
              <div class="dsp-breadcrumb" style="display:flex; align-items:center; gap:0.5rem; font-size:12px; color:var(--color-text-muted); margin-bottom:0.35rem;">
                <a href="#/docspace" style="color:inherit; text-decoration:none;">DocSpace Hub</a>
                <span>/</span>
                <span style="color:var(--color-primary); font-weight:700;">Kho Clinical Research Studios Pro</span>
              </div>
              <h1 class="dsp-title" style="margin:0; font-size:1.6rem; font-weight:900; color:var(--color-text); display:flex; align-items:center; gap:0.6rem;">
                <i class="fa-solid fa-microscope" style="color:var(--color-primary);"></i>
                Trung Tâm Nghiên Cứu &amp; Giả Lập Y Khoa Chuyên Sâu (Research Studios Pro)
              </h1>
              <p class="dsp-subtitle" style="margin:0.35rem 0 0 0; color:var(--color-text-muted); font-size:0.9rem;">
                Không gian làm việc lâm sàng cấp cao ($10,000 Level): Tích hợp giả lập dạng sóng ECG thời gian thực, biểu đồ toan kiềm Davenport SVG, hành lang bù dịch 48h ODS an toàn &amp; phân tích đa biến động.
              </p>
            </div>

            <!-- Quick Access Badges -->
            <div style="display:flex; gap:0.5rem; align-items:center;">
              <span class="dsp-badge dsp-badge--info" style="font-weight:700; padding:6px 12px; font-size:11.5px;">
                <i class="fa-solid fa-shield-halved"></i> Chuẩn EBM 2026
              </span>
              <a href="#/docspace/soap" class="dsp-btn dsp-btn-sm dsp-btn-outline" style="font-size:12px;">
                <i class="fa-solid fa-notes-medical"></i> Sổ Tay SOAP
              </a>
            </div>
          </div>
        </header>

        <!-- Studio Hub Outer Navigation Bar -->
        <nav class="dsp-tabs-nav" aria-label="DocSpace Studios Tabs">
          <button type="button" class="dsp-tab-btn ${initialTab === 'abg' ? 'is-active' : ''} js-studio-tab-btn" data-tab="abg">
            <i class="fa-solid fa-flask-vial" style="color:var(--color-primary);"></i> 1. Khí Máu &amp; Toan Kiềm (ABG Pro)
          </button>
          <button type="button" class="dsp-tab-btn ${initialTab === 'ecg' ? 'is-active' : ''} js-studio-tab-btn" data-tab="ecg">
            <i class="fa-solid fa-heart-pulse" style="color:#dc2626;"></i> 2. Điện Tâm Đồ (ECG Lab Pro)
          </button>
          <button type="button" class="dsp-tab-btn ${initialTab === 'electrolyte' ? 'is-active' : ''} js-studio-tab-btn" data-tab="electrolyte">
            <i class="fa-solid fa-droplet" style="color:#0284c7;"></i> 3. Điện Giải &amp; Hồi Sức Dịch (Electrolyte Pro)
          </button>
          <button type="button" class="dsp-tab-btn ${initialTab === 'renal' ? 'is-active' : ''} js-studio-tab-btn" data-tab="renal">
            <i class="fa-solid fa-dna" style="color:#7c3aed;"></i> 4. Thận &amp; Chỉnh Liều (Renal Pro)
          </button>
          <button type="button" class="dsp-tab-btn ${initialTab === 'cardio' ? 'is-active' : ''} js-studio-tab-btn" data-tab="cardio">
            <i class="fa-solid fa-chart-pie" style="color:#ca8a04;"></i> 5. Tim Mạch &amp; Lipid (SCORE2 Pro)
          </button>
          <button type="button" class="dsp-tab-btn ${initialTab === 'sepsis' ? 'is-active' : ''} js-studio-tab-btn" data-tab="sepsis">
            <i class="fa-solid fa-lungs-virus" style="color:#e11d48;"></i> 6. Sepsis &amp; Viêm Phổi (Sepsis Pro)
          </button>
          <button type="button" class="dsp-tab-btn ${initialTab === 'cirrhosis' ? 'is-active' : ''} js-studio-tab-btn" data-tab="cirrhosis">
            <i class="fa-solid fa-disease" style="color:#b45309;"></i> 7. Gan Mật &amp; Xơ Gan (MELD-Na Pro)
          </button>
        </nav>

        <!-- Studio Panels Container -->
        <div class="dsp-panels-container">
          ${renderAbgPanel(initialTab === 'abg')}
          ${renderEcgPanel(initialTab === 'ecg')}
          ${renderElectrolytePanel(initialTab === 'electrolyte')}
          ${renderRenalPanel(initialTab === 'renal')}
          ${renderCardioPanel(initialTab === 'cardio')}
          ${renderSepsisPanel(initialTab === 'sepsis')}
          ${renderCirrhosisPanel(initialTab === 'cirrhosis')}
        </div>

      </main>
    </div>
  `;
}

/**
 * Mount Interactive Controllers for all Studios
 */
export function mountStudiosController(_pid?: string): void {
  // 1. Outer Tab Switching Engine
  const tabBtns = document.querySelectorAll<HTMLElement>('.js-studio-tab-btn');
  const panels = document.querySelectorAll<HTMLElement>('.js-studio-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const target = btn.getAttribute('data-tab');
      panels.forEach(p => (p.style.display = 'none'));

      const map: Record<string, string> = {
        abg: 'panelStudioAbg',
        ecg: 'panelStudioEcg',
        electrolyte: 'panelStudioElectrolyte',
        renal: 'panelStudioRenal',
        cardio: 'panelStudioCardio',
        sepsis: 'panelStudioSepsis',
        cirrhosis: 'panelStudioCirrhosis',
      };

      if (target && map[target]) {
        const targetPanel = document.getElementById(map[target]);
        if (targetPanel) targetPanel.style.display = 'block';
      }
    });
  });

  // 2. Generic Stepper Buttons (+ / -)
  document.querySelectorAll<HTMLElement>('.js-step-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const step = parseFloat(btn.getAttribute('data-step') || '1');
      if (targetId) {
        const input = document.getElementById(targetId) as HTMLInputElement;
        if (input) {
          const currentVal = parseFloat(input.value) || 0;
          const min = input.min !== '' ? parseFloat(input.min) : -Infinity;
          const max = input.max !== '' ? parseFloat(input.max) : Infinity;
          const precision = step.toString().includes('.') ? step.toString().split('.')[1].length : 0;
          const newVal = Math.min(max, Math.max(min, currentVal + step));
          input.value = newVal.toFixed(precision);
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    });
  });

  // 3. Mount Individual Studio Controllers
  mountAbgController(bindActionBtns);
  mountEcgController(bindActionBtns);
  mountElectrolyteController(bindActionBtns);
  mountRenalController(bindActionBtns);
  mountCardioController(bindActionBtns);
  mountSepsisController(bindActionBtns);
  mountCirrhosisController(bindActionBtns);
}
