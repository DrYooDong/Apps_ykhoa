import { SimulationSession } from '../types';

export function renderSimulationView(profileId: string, sessionId?: string): string {
  return `
    <div class="dsp-view-container animate-fade-in">
      <header class="dsp-header dsp-flex dsp-justify-between dsp-items-center">
        <div>
          <h2 class="dsp-text-2xl dsp-font-bold dsp-text-primary">
            <i class="fa-solid fa-flask dsp-mr-2"></i> Simulation Sandbox
          </h2>
          <p class="dsp-text-muted">Mô phỏng điều trị & Tương tác thuốc (Phase 3)</p>
        </div>
        <button id="dspNewSimulationBtn" class="dsp-btn dsp-btn-primary">
          <i class="fa-solid fa-play dsp-mr-2"></i> Chạy Kịch bản mới
        </button>
      </header>
      <div class="dsp-content dsp-mt-6">
        <p>Tính năng đang được phát triển.</p>
      </div>
    </div>
  `;
}

export function mountSimulationController(profileId: string): void {
  const createBtn = document.getElementById('dspNewSimulationBtn');
  if (createBtn) {
    createBtn.addEventListener('click', () => {
      alert('Chạy kịch bản đang được xây dựng.');
    });
  }
}
