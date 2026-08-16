/**
 * CliniPortal 2.0 — Interactive Physiology Simulators SPA View
 * Path: src/content/pathophysiology/simulators/physiology-simulators-view.ts
 */

import '../../../../css/components/physiology-simulators.css';
import { 
  PhysiologySimEngine, 
  NernstParams, 
  StarlingParams, 
  FrankStarlingParams, 
  AcidBaseParams 
} from './physiology-simulators-engine';

export function renderPhysiologySimulatorsView(activeModel: string = 'nernst'): string {
  return `
    <div class="main-wrapper" style="width: 100%; max-width: 1400px; margin: 0 auto; padding-bottom: 3rem;">
      
      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <a href="#/pathophysiology" style="color: inherit; text-decoration: none;">🧬 Cơ Sở Y Khoa</a> &nbsp;/&nbsp;
        <span style="color: var(--color-primary, #0284c7); font-weight: 600;">Mô Phỏng Sinh Lý Tương Tác</span>
      </div>

      <!-- HERO HEADER -->
      <div class="sim-card" style="background: linear-gradient(135deg, rgba(2,132,199,0.08) 0%, rgba(14,165,233,0.02) 100%); margin-bottom: 1.5rem; border-color: rgba(2,132,199,0.2);">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
          <div>
            <span style="font-size: 0.75rem; font-weight: 700; background: var(--color-primary, #0284c7); color: #fff; padding: 0.2rem 0.6rem; border-radius: 4px; text-transform: uppercase;">Real-Time Simulation Lab</span>
            <h1 style="margin: 0.4rem 0 0.25rem; font-size: 1.6rem; font-weight: 800; color: var(--color-text, #0f172a);">
              ⚡ PHÒNG THÍ NGHIỆM MÔ PHỎNG SINH LÝ ĐỘNG
            </h1>
            <p style="margin: 0; font-size: 0.9rem; color: var(--color-text-muted, #475569); max-width: 800px;">
              Khám phá các mô hình toán học sinh lý định lượng tương tác thời gian thực: Điện thế màng Nernst/GHK, Lực lọc mao mạch Starling & Cơ chế phù, Đường cong Frank-Starling tim mạch và Thăng bằng Toan kiềm Davenport.
            </p>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <a href="#/pathophysiology/formula-vault" class="sim-pill-btn" style="text-decoration: none;">
              <i class="fa-solid fa-calculator"></i> Kho Công Thức
            </a>
            <a href="#/pathophysiology/metabolic-map" class="sim-pill-btn" style="text-decoration: none;">
              <i class="fa-solid fa-diagram-project"></i> Bản Đồ Chuyển Hóa
            </a>
          </div>
        </div>
      </div>

      <!-- SIMULATOR NAVIGATION TABS -->
      <div class="sim-nav-pills" id="simNavPills" style="margin-bottom: 1.5rem;">
        <button class="sim-pill-btn ${activeModel === 'nernst' ? 'active' : ''}" data-model="nernst">
          <i class="fa-solid fa-bolt"></i> 1. Điện Thế Màng Nernst & GHK
        </button>
        <button class="sim-pill-btn ${activeModel === 'starling' ? 'active' : ''}" data-model="starling">
          <i class="fa-solid fa-droplet"></i> 2. Lực Starling & Cơ Chế Phù
        </button>
        <button class="sim-pill-btn ${activeModel === 'frank-starling' ? 'active' : ''}" data-model="frank-starling">
          <i class="fa-solid fa-heart-pulse"></i> 3. Đường Cong Frank-Starling
        </button>
        <button class="sim-pill-btn ${activeModel === 'acid-base' ? 'active' : ''}" data-model="acid-base">
          <i class="fa-solid fa-lungs"></i> 4. Toan Kiềm & Henderson-Hasselbalch
        </button>
      </div>

      <!-- SIMULATOR CONTAINER -->
      <div id="simModelContainer">
        <!-- Rendered dynamically by initPhysiologySimulators -->
      </div>
    </div>
  `;
}

// Global active simulation parameters
const currentNernst: NernstParams = {
  tempC: 37,
  kOut: 4.5,
  kIn: 140,
  naOut: 142,
  naIn: 14,
  clOut: 105,
  clIn: 10,
  caOut: 2.4,
  caIn: 0.0001,
  pK: 1.0,
  pNa: 0.04,
  pCl: 0.45
};

const currentStarling: StarlingParams = {
  pc: 25,
  pif: -1,
  piC: 26,
  piIf: 3,
  kf: 0.5,
  sigma: 0.9,
  lymphFlow: 2.0
};

const currentFrankStarling: FrankStarlingParams = {
  edv: 120,
  inotropy: 1.0,
  map: 90,
  hr: 75
};

const currentAcidBase: AcidBaseParams = {
  hco3: 24,
  pco2: 40,
  na: 140,
  cl: 102,
  albumin: 4.0
};

export function initPhysiologySimulators(): void {
  const container = document.getElementById('simModelContainer');
  if (!container) return;

  const navPills = document.querySelectorAll('#simNavPills .sim-pill-btn');
  let activeModel = 'nernst';

  function renderCurrentModel() {
    navPills.forEach(btn => {
      if (btn.getAttribute('data-model') === activeModel) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (activeModel === 'nernst') {
      renderNernstSimulator(container!);
    } else if (activeModel === 'starling') {
      renderStarlingSimulator(container!);
    } else if (activeModel === 'frank-starling') {
      renderFrankStarlingSimulator(container!);
    } else if (activeModel === 'acid-base') {
      renderAcidBaseSimulator(container!);
    }
  }

  navPills.forEach(btn => {
    btn.addEventListener('click', () => {
      activeModel = btn.getAttribute('data-model') || 'nernst';
      renderCurrentModel();
    });
  });

  renderCurrentModel();
}

/**
 * 1. NERNST & GHK RENDERER
 */
function renderNernstSimulator(container: HTMLElement): void {
  const result = PhysiologySimEngine.calculateNernstGHK(currentNernst);

  container.innerHTML = `
    <div class="sim-grid">
      <!-- Controls -->
      <div class="sim-card">
        <div class="sim-card-header">
          <h3 class="sim-card-title"><i class="fa-solid fa-sliders" style="color: var(--color-primary);"></i> Thông Số Ion</h3>
          <span style="font-size: 0.8rem; color: var(--color-text-muted);">$T = 37^\\circ\\text{C}$</span>
        </div>

        <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted); margin-bottom: 0.5rem;">LÂM SÀNG MẪU:</div>
        <div class="sim-preset-group">
          <button class="sim-preset-btn" id="presetNernstNorm">Bình thường</button>
          <button class="sim-preset-btn" id="presetNernstHyperK">Tăng K+ Nặng (7.2)</button>
          <button class="sim-preset-btn" id="presetNernstHypoK">Hạ K+ (2.4)</button>
          <button class="sim-preset-btn" id="presetNernstHypoNa">Hạ Na+ Nặng (118)</button>
        </div>

        <div class="sim-control-group">
          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>$[K^+]_o$ Ngoại bào (mmol/L)</span>
              <span class="sim-value-badge" id="valKOut">${currentNernst.kOut.toFixed(1)}</span>
            </div>
            <input type="range" class="sim-slider" id="sliderKOut" min="1.5" max="9.0" step="0.1" value="${currentNernst.kOut}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>$[K^+]_i$ Nội bào (mmol/L)</span>
              <span class="sim-value-badge" id="valKIn">${currentNernst.kIn.toFixed(0)}</span>
            </div>
            <input type="range" class="sim-slider" id="sliderKIn" min="100" max="180" step="1" value="${currentNernst.kIn}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>$[Na^+]_o$ Ngoại bào (mmol/L)</span>
              <span class="sim-value-badge" id="valNaOut">${currentNernst.naOut.toFixed(0)}</span>
            </div>
            <input type="range" class="sim-slider" id="sliderNaOut" min="110" max="165" step="1" value="${currentNernst.naOut}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>$[Na^+]_i$ Nội bào (mmol/L)</span>
              <span class="sim-value-badge" id="valNaIn">${currentNernst.naIn.toFixed(0)}</span>
            </div>
            <input type="range" class="sim-slider" id="sliderNaIn" min="5" max="30" step="1" value="${currentNernst.naIn}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Hệ số thấm $P_{Na} / P_K$</span>
              <span class="sim-value-badge" id="valPNa">${currentNernst.pNa.toFixed(2)}</span>
            </div>
            <input type="range" class="sim-slider" id="sliderPNa" min="0.01" max="0.5" step="0.01" value="${currentNernst.pNa}">
          </div>
        </div>
      </div>

      <!-- Visualization & Results -->
      <div class="sim-card">
        <div class="sim-card-header">
          <h3 class="sim-card-title"><i class="fa-solid fa-chart-line" style="color: #10b981;"></i> Điện Thế Nghỉ Màng & Cân Bằng Nernst</h3>
        </div>

        <div class="sim-viz-wrapper" id="nernstCanvasWrapper">
          <svg width="100%" height="240" viewBox="0 0 600 240" style="max-width: 600px;">
            <!-- Background grid -->
            <line x1="60" y1="20" x2="560" y2="20" stroke="var(--color-border)" stroke-dasharray="3,3"/>
            <line x1="60" y1="80" x2="560" y2="80" stroke="var(--color-border)" stroke-dasharray="3,3"/>
            <line x1="60" y1="140" x2="560" y2="140" stroke="var(--color-border)" stroke-dasharray="3,3"/>
            <line x1="60" y1="200" x2="560" y2="200" stroke="var(--color-border)" stroke-dasharray="3,3"/>

            <!-- Y Axis scale (-100 to +80 mV) -->
            <!-- 0 mV is at y = 110 -->
            <line x1="60" y1="10" x2="60" y2="220" stroke="var(--color-text-muted)" stroke-width="1.5"/>
            <text x="50" y="35" fill="var(--color-text-muted)" font-size="11" text-anchor="end">+60 mV</text>
            <text x="50" y="114" fill="var(--color-text-muted)" font-size="11" text-anchor="end">0 mV</text>
            <text x="50" y="185" fill="var(--color-text-muted)" font-size="11" text-anchor="end">-70 mV</text>
            <text x="50" y="215" fill="var(--color-text-muted)" font-size="11" text-anchor="end">-90 mV</text>

            <!-- Zero line -->
            <line x1="60" y1="110" x2="560" y2="110" stroke="var(--color-border)" stroke-width="1.5"/>

            <!-- Bars for potentials -->
            <!-- E_K -->
            <rect x="100" y="${getNernstY(result.eK)}" width="60" height="${Math.abs(110 - getNernstY(result.eK))}" fill="#3b82f6" rx="4" opacity="0.8"/>
            <text x="130" y="${getNernstY(result.eK) - 8}" fill="#3b82f6" font-size="12" font-weight="bold" text-anchor="middle">E_K: ${result.eK} mV</text>
            <text x="130" y="235" fill="var(--color-text)" font-size="12" font-weight="600" text-anchor="middle">Ion K+</text>

            <!-- E_Na -->
            <rect x="200" y="${getNernstY(result.eNa)}" width="60" height="${Math.abs(110 - getNernstY(result.eNa))}" fill="#10b981" rx="4" opacity="0.8"/>
            <text x="230" y="${getNernstY(result.eNa) - 8}" fill="#10b981" font-size="12" font-weight="bold" text-anchor="middle">E_Na: +${result.eNa} mV</text>
            <text x="230" y="235" fill="var(--color-text)" font-size="12" font-weight="600" text-anchor="middle">Ion Na+</text>

            <!-- E_Cl -->
            <rect x="300" y="${getNernstY(result.eCl)}" width="60" height="${Math.abs(110 - getNernstY(result.eCl))}" fill="#f59e0b" rx="4" opacity="0.8"/>
            <text x="330" y="${getNernstY(result.eCl) - 8}" fill="#f59e0b" font-size="12" font-weight="bold" text-anchor="middle">E_Cl: ${result.eCl} mV</text>
            <text x="330" y="235" fill="var(--color-text)" font-size="12" font-weight="600" text-anchor="middle">Ion Cl-</text>

            <!-- V_m GHK resting potential line -->
            <line x1="390" y1="${getNernstY(result.vm)}" x2="550" y2="${getNernstY(result.vm)}" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
            <circle cx="470" cy="${getNernstY(result.vm)}" r="6" fill="#ef4444"/>
            <text x="470" y="${getNernstY(result.vm) - 10}" fill="#ef4444" font-size="13" font-weight="bold" text-anchor="middle">V_m: ${result.vm} mV (GHK)</text>
            <text x="470" y="235" fill="#ef4444" font-size="12" font-weight="700" text-anchor="middle">Điện thế Nghỉ V_m</text>
          </svg>
        </div>

        <div class="sim-readout-grid">
          <div class="sim-readout-box">
            <div class="sim-readout-label">Điện thế Nghỉ (Vm)</div>
            <div class="sim-readout-val" style="color: #ef4444;" id="boxVm">${result.vm} mV</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Cân Bằng E(K+)</div>
            <div class="sim-readout-val" style="color: #3b82f6;" id="boxEK">${result.eK} mV</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Cân Bằng E(Na+)</div>
            <div class="sim-readout-val" style="color: #10b981;" id="boxENa">+${result.eNa} mV</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Cân Bằng E(Cl-)</div>
            <div class="sim-readout-val" style="color: #f59e0b;" id="boxECl">${result.eCl} mV</div>
          </div>
        </div>

        <div class="sim-clinical-box ${result.alertType}" id="nernstClinicalAlert">
          <div class="sim-clinical-title"><i class="fa-solid fa-stethoscope"></i> Ý Nghĩa Sinh Lý Bệnh Lâm Sàng</div>
          <p class="sim-clinical-desc" id="nernstClinicalDesc">${result.risk}</p>
        </div>
      </div>
    </div>
  `;

  // Attach event listeners
  const sKOut = document.getElementById('sliderKOut') as HTMLInputElement;
  const sKIn = document.getElementById('sliderKIn') as HTMLInputElement;
  const sNaOut = document.getElementById('sliderNaOut') as HTMLInputElement;
  const sNaIn = document.getElementById('sliderNaIn') as HTMLInputElement;
  const sPNa = document.getElementById('sliderPNa') as HTMLInputElement;

  function update() {
    currentNernst.kOut = parseFloat(sKOut.value);
    currentNernst.kIn = parseFloat(sKIn.value);
    currentNernst.naOut = parseFloat(sNaOut.value);
    currentNernst.naIn = parseFloat(sNaIn.value);
    currentNernst.pNa = parseFloat(sPNa.value);
    renderNernstSimulator(container);
  }

  sKOut?.addEventListener('input', update);
  sKIn?.addEventListener('input', update);
  sNaOut?.addEventListener('input', update);
  sNaIn?.addEventListener('input', update);
  sPNa?.addEventListener('input', update);

  document.getElementById('presetNernstNorm')?.addEventListener('click', () => {
    currentNernst.kOut = 4.5;
    currentNernst.naOut = 142;
    renderNernstSimulator(container);
  });
  document.getElementById('presetNernstHyperK')?.addEventListener('click', () => {
    currentNernst.kOut = 7.2;
    renderNernstSimulator(container);
  });
  document.getElementById('presetNernstHypoK')?.addEventListener('click', () => {
    currentNernst.kOut = 2.4;
    renderNernstSimulator(container);
  });
  document.getElementById('presetNernstHypoNa')?.addEventListener('click', () => {
    currentNernst.naOut = 118;
    renderNernstSimulator(container);
  });
}

function getNernstY(mv: number): number {
  // Mapping +80 mV -> 20px, 0 mV -> 110px, -100 mV -> 220px
  // y = 110 - (mv * 1.1)
  const y = 110 - (mv * 1.1);
  return Math.min(220, Math.max(15, y));
}

/**
 * 2. STARLING & EDEMA RENDERER
 */
function renderStarlingSimulator(container: HTMLElement): void {
  const result = PhysiologySimEngine.calculateStarling(currentStarling);

  container.innerHTML = `
    <div class="sim-grid">
      <!-- Controls -->
      <div class="sim-card">
        <div class="sim-card-header">
          <h3 class="sim-card-title"><i class="fa-solid fa-sliders" style="color: var(--color-primary);"></i> Thông Số Lực Starling</h3>
        </div>

        <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted); margin-bottom: 0.5rem;">TÌNH HUỐNG LÂM SÀNG:</div>
        <div class="sim-preset-group">
          <button class="sim-preset-btn" id="presetStarlingNorm">Khỏe mạnh</button>
          <button class="sim-preset-btn" id="presetStarlingHF">Suy Tim Ứ Huyết (Pc 36)</button>
          <button class="sim-preset-btn" id="presetStarlingNephrotic">HC Thận Hư (πc 14)</button>
          <button class="sim-preset-btn" id="presetStarlingSepsis">Sepsis/Bỏng (Kf 1.5, σ 0.4)</button>
        </div>

        <div class="sim-control-group">
          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Áp suất Thủy tĩnh Mao mạch ($P_c$)</span>
              <span class="sim-value-badge">${currentStarling.pc} mmHg</span>
            </div>
            <input type="range" class="sim-slider" id="sliderPc" min="10" max="45" step="1" value="${currentStarling.pc}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Áp suất Keo Huyết tương ($\\pi_c$ - Albumin)</span>
              <span class="sim-value-badge">${currentStarling.piC} mmHg</span>
            </div>
            <input type="range" class="sim-slider" id="sliderPiC" min="10" max="35" step="1" value="${currentStarling.piC}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Hệ số Lọc Mao mạch ($K_f$)</span>
              <span class="sim-value-badge">${currentStarling.kf.toFixed(1)}</span>
            </div>
            <input type="range" class="sim-slider" id="sliderKf" min="0.1" max="2.0" step="0.1" value="${currentStarling.kf}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Hệ số Phản xạ Protein ($\\sigma$)</span>
              <span class="sim-value-badge">${currentStarling.sigma.toFixed(2)}</span>
            </div>
            <input type="range" class="sim-slider" id="sliderSigma" min="0.2" max="1.0" step="0.05" value="${currentStarling.sigma}">
          </div>
        </div>
      </div>

      <!-- Visualization & Results -->
      <div class="sim-card">
        <div class="sim-card-header">
          <h3 class="sim-card-title"><i class="fa-solid fa-water" style="color: #0284c7;"></i> Động Học Dịch Qua Thành Mao Mạch</h3>
        </div>

        <div class="sim-viz-wrapper">
          <svg width="100%" height="240" viewBox="0 0 600 240" style="max-width: 600px;">
            <!-- Capillary Tube -->
            <rect x="50" y="60" width="500" height="70" fill="rgba(239,68,68,0.15)" stroke="#ef4444" stroke-width="2" rx="8"/>
            <text x="70" y="100" fill="#ef4444" font-size="14" font-weight="bold">LÒNG MAO MẠCH (Pc: ${currentStarling.pc} mmHg | πc: ${currentStarling.piC} mmHg)</text>

            <!-- Interstitial Space -->
            <rect x="50" y="150" width="500" height="70" fill="rgba(2,132,199,0.08)" stroke="#0284c7" stroke-width="2" stroke-dasharray="4,4" rx="8"/>
            <text x="70" y="190" fill="#0284c7" font-size="14" font-weight="bold">KHOANG KẼ MÔ (Pif: ${currentStarling.pif} | πif: ${currentStarling.piIf} mmHg)</text>

            <!-- Filtration Arrow Vector -->
            <g transform="translate(300, 130)">
              <line x1="0" y1="0" x2="0" y2="18" stroke="${result.jv > 0 ? '#ef4444' : '#10b981'}" stroke-width="4" marker-end="url(#arrow)"/>
              <text x="15" y="12" fill="${result.jv > 0 ? '#ef4444' : '#10b981'}" font-size="13" font-weight="bold">
                J_v = ${result.jv > 0 ? '+' : ''}${result.jv} mL/min
              </text>
            </g>
          </svg>
        </div>

        <div class="sim-readout-grid">
          <div class="sim-readout-box">
            <div class="sim-readout-label">Áp Lực Lọc Ròng (NFP)</div>
            <div class="sim-readout-val" style="color: #0284c7;">${result.nfp > 0 ? '+' : ''}${result.nfp} mmHg</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Lưu Lượng Lọc (Jv)</div>
            <div class="sim-readout-val" style="color: ${result.jv > 3 ? '#ef4444' : '#0284c7'};">${result.jv > 0 ? '+' : ''}${result.jv} mL/min</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Tích Tụ Mô Kẽ</div>
            <div class="sim-readout-val" style="color: ${result.accumulation > 0 ? '#f59e0b' : '#10b981'};">${result.accumulation} mL/min</div>
          </div>
        </div>

        <div class="sim-clinical-box ${result.alertType}">
          <div class="sim-clinical-title"><i class="fa-solid fa-stethoscope"></i> Nhận Định Cơ Chế Bệnh Sinh</div>
          <p class="sim-clinical-desc">${result.edemaState}</p>
        </div>
      </div>
    </div>
  `;

  const sPc = document.getElementById('sliderPc') as HTMLInputElement;
  const sPiC = document.getElementById('sliderPiC') as HTMLInputElement;
  const sKf = document.getElementById('sliderKf') as HTMLInputElement;
  const sSigma = document.getElementById('sliderSigma') as HTMLInputElement;

  function update() {
    currentStarling.pc = parseFloat(sPc.value);
    currentStarling.piC = parseFloat(sPiC.value);
    currentStarling.kf = parseFloat(sKf.value);
    currentStarling.sigma = parseFloat(sSigma.value);
    renderStarlingSimulator(container);
  }

  sPc?.addEventListener('input', update);
  sPiC?.addEventListener('input', update);
  sKf?.addEventListener('input', update);
  sSigma?.addEventListener('input', update);

  document.getElementById('presetStarlingNorm')?.addEventListener('click', () => {
    currentStarling.pc = 25;
    currentStarling.piC = 26;
    currentStarling.kf = 0.5;
    currentStarling.sigma = 0.9;
    renderStarlingSimulator(container);
  });
  document.getElementById('presetStarlingHF')?.addEventListener('click', () => {
    currentStarling.pc = 36;
    renderStarlingSimulator(container);
  });
  document.getElementById('presetStarlingNephrotic')?.addEventListener('click', () => {
    currentStarling.piC = 14;
    renderStarlingSimulator(container);
  });
  document.getElementById('presetStarlingSepsis')?.addEventListener('click', () => {
    currentStarling.kf = 1.5;
    currentStarling.sigma = 0.4;
    renderStarlingSimulator(container);
  });
}

/**
 * 3. FRANK-STARLING RENDERER
 */
function renderFrankStarlingSimulator(container: HTMLElement): void {
  const result = PhysiologySimEngine.calculateFrankStarling(currentFrankStarling);

  container.innerHTML = `
    <div class="sim-grid">
      <!-- Controls -->
      <div class="sim-card">
        <div class="sim-card-header">
          <h3 class="sim-card-title"><i class="fa-solid fa-sliders" style="color: var(--color-primary);"></i> Thông Số Huyết Động</h3>
        </div>

        <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted); margin-bottom: 0.5rem;">TÌNH HUỐNG LÂM SÀNG:</div>
        <div class="sim-preset-group">
          <button class="sim-preset-btn" id="presetFsNorm">Tim bình thường</button>
          <button class="sim-preset-btn" id="presetFsHF">Suy Tim Tâm Thu (Inotropy 0.55)</button>
          <button class="sim-preset-btn" id="presetFsDobutamine">Dobutamine Inotrope (1.5)</button>
          <button class="sim-preset-btn" id="presetFsHypovolemia">Sốc Giảm Thể Tích (EDV 60)</button>
        </div>

        <div class="sim-control-group">
          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Tiền tải: Thể tích Cuối Tâm Trương (EDV)</span>
              <span class="sim-value-badge">${currentFrankStarling.edv} mL</span>
            </div>
            <input type="range" class="sim-slider" id="sliderEdv" min="40" max="220" step="5" value="${currentFrankStarling.edv}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Sức Co Bóp Cơ Tim (Inotropy Index)</span>
              <span class="sim-value-badge">${currentFrankStarling.inotropy.toFixed(2)}x</span>
            </div>
            <input type="range" class="sim-slider" id="sliderInotropy" min="0.4" max="2.0" step="0.05" value="${currentFrankStarling.inotropy}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Hậu tải: Huyết Áp Động Mạch Trung Bình (MAP)</span>
              <span class="sim-value-badge">${currentFrankStarling.map} mmHg</span>
            </div>
            <input type="range" class="sim-slider" id="sliderMap" min="50" max="150" step="5" value="${currentFrankStarling.map}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Tần Số Tim (Heart Rate)</span>
              <span class="sim-value-badge">${currentFrankStarling.hr} bpm</span>
            </div>
            <input type="range" class="sim-slider" id="sliderHr" min="45" max="150" step="1" value="${currentFrankStarling.hr}">
          </div>
        </div>
      </div>

      <!-- Visualization & Results -->
      <div class="sim-card">
        <div class="sim-card-header">
          <h3 class="sim-card-title"><i class="fa-solid fa-heart" style="color: #ef4444;"></i> Đường Cong Frank-Starling Thất Trái</h3>
        </div>

        <div class="sim-viz-wrapper">
          <svg width="100%" height="240" viewBox="0 0 600 240" style="max-width: 600px;">
            <!-- Axes -->
            <line x1="60" y1="210" x2="560" y2="210" stroke="var(--color-text-muted)" stroke-width="1.5"/>
            <line x1="60" y1="20" x2="60" y2="210" stroke="var(--color-text-muted)" stroke-width="1.5"/>

            <text x="50" y="30" fill="var(--color-text-muted)" font-size="11" text-anchor="end">SV (mL)</text>
            <text x="560" y="230" fill="var(--color-text-muted)" font-size="11" text-anchor="end">EDV (mL - Tiền tải)</text>

            <!-- Baseline Normal Curve (Dotted) -->
            <path d="M 60 210 Q 180 80, 500 70" stroke="var(--color-border)" stroke-width="2" stroke-dasharray="4,4" fill="none"/>

            <!-- Current Dynamic Curve -->
            <path d="M 60 210 Q 180 ${210 - (150 * currentFrankStarling.inotropy)}, 500 ${210 - (160 * currentFrankStarling.inotropy)}" stroke="#38bdf8" stroke-width="3" fill="none"/>

            <!-- Operating Point -->
            <!-- x: EDV (40->220 mapped to 60->500) -->
            <!-- y: SV (0->140 mapped to 210->30) -->
            <circle cx="${60 + ((currentFrankStarling.edv - 40) / 180) * 440}" cy="${210 - (result.sv * 1.25)}" r="8" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
            <text x="${60 + ((currentFrankStarling.edv - 40) / 180) * 440}" y="${210 - (result.sv * 1.25) - 14}" fill="#ef4444" font-size="13" font-weight="bold" text-anchor="middle">
              SV: ${result.sv} mL (EF: ${result.ef}%)
            </text>
          </svg>
        </div>

        <div class="sim-readout-grid">
          <div class="sim-readout-box">
            <div class="sim-readout-label">Thể Tích Nhát Bóp (SV)</div>
            <div class="sim-readout-val" style="color: #ef4444;">${result.sv} mL</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Cung Lượng Tim (CO)</div>
            <div class="sim-readout-val" style="color: #0284c7;">${result.co} L/min</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Chỉ Số Tim (CI)</div>
            <div class="sim-readout-val" style="color: #10b981;">${result.ci} L/min/m²</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Phân Suất Tống Máu (EF)</div>
            <div class="sim-readout-val" style="color: ${result.ef < 40 ? '#ef4444' : '#0284c7'};">${result.ef}%</div>
          </div>
        </div>

        <div class="sim-clinical-box ${result.alertType}">
          <div class="sim-clinical-title"><i class="fa-solid fa-stethoscope"></i> Phân Tích Chức Năng Bơm Máu</div>
          <p class="sim-clinical-desc">${result.clinicalInsight}</p>
        </div>
      </div>
    </div>
  `;

  const sEdv = document.getElementById('sliderEdv') as HTMLInputElement;
  const sIno = document.getElementById('sliderInotropy') as HTMLInputElement;
  const sMap = document.getElementById('sliderMap') as HTMLInputElement;
  const sHr = document.getElementById('sliderHr') as HTMLInputElement;

  function update() {
    currentFrankStarling.edv = parseFloat(sEdv.value);
    currentFrankStarling.inotropy = parseFloat(sIno.value);
    currentFrankStarling.map = parseFloat(sMap.value);
    currentFrankStarling.hr = parseFloat(sHr.value);
    renderFrankStarlingSimulator(container);
  }

  sEdv?.addEventListener('input', update);
  sIno?.addEventListener('input', update);
  sMap?.addEventListener('input', update);
  sHr?.addEventListener('input', update);

  document.getElementById('presetFsNorm')?.addEventListener('click', () => {
    currentFrankStarling.edv = 120;
    currentFrankStarling.inotropy = 1.0;
    currentFrankStarling.map = 90;
    renderFrankStarlingSimulator(container);
  });
  document.getElementById('presetFsHF')?.addEventListener('click', () => {
    currentFrankStarling.edv = 160;
    currentFrankStarling.inotropy = 0.55;
    renderFrankStarlingSimulator(container);
  });
  document.getElementById('presetFsDobutamine')?.addEventListener('click', () => {
    currentFrankStarling.inotropy = 1.5;
    renderFrankStarlingSimulator(container);
  });
  document.getElementById('presetFsHypovolemia')?.addEventListener('click', () => {
    currentFrankStarling.edv = 60;
    renderFrankStarlingSimulator(container);
  });
}

/**
 * 4. ACID-BASE & DAVENPORT RENDERER
 */
function renderAcidBaseSimulator(container: HTMLElement): void {
  const result = PhysiologySimEngine.calculateAcidBase(currentAcidBase);

  container.innerHTML = `
    <div class="sim-grid">
      <!-- Controls -->
      <div class="sim-card">
        <div class="sim-card-header">
          <h3 class="sim-card-title"><i class="fa-solid fa-sliders" style="color: var(--color-primary);"></i> Thông Số Khí Máu & Điện Giải</h3>
        </div>

        <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted); margin-bottom: 0.5rem;">CA BỆNH KINH ĐIỂN:</div>
        <div class="sim-preset-group">
          <button class="sim-preset-btn" id="presetAbNorm">Bình thường</button>
          <button class="sim-preset-btn" id="presetAbDKA">Toan Ceton ĐTĐ (DKA)</button>
          <button class="sim-preset-btn" id="presetAbCOPD">Đợt Cấp COPD</button>
          <button class="sim-preset-btn" id="presetAbVomiting">Nôn Ói Mất Dịch</button>
        </div>

        <div class="sim-control-group">
          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Bicarbonate ($[HCO_3^-]$) (mEq/L)</span>
              <span class="sim-value-badge">${currentAcidBase.hco3} mEq/L</span>
            </div>
            <input type="range" class="sim-slider" id="sliderHco3" min="6" max="45" step="1" value="${currentAcidBase.hco3}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Áp Suất Riêng Phần $pCO_2$ (mmHg)</span>
              <span class="sim-value-badge">${currentAcidBase.pco2} mmHg</span>
            </div>
            <input type="range" class="sim-slider" id="sliderPco2" min="15" max="85" step="1" value="${currentAcidBase.pco2}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Natri ($Na^+$) (mEq/L)</span>
              <span class="sim-value-badge">${currentAcidBase.na} mEq/L</span>
            </div>
            <input type="range" class="sim-slider" id="sliderNa" min="120" max="160" step="1" value="${currentAcidBase.na}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Chloride ($Cl^-$) (mEq/L)</span>
              <span class="sim-value-badge">${currentAcidBase.cl} mEq/L</span>
            </div>
            <input type="range" class="sim-slider" id="sliderCl" min="70" max="125" step="1" value="${currentAcidBase.cl}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Albumin Huyết Thanh (g/dL)</span>
              <span class="sim-value-badge">${currentAcidBase.albumin.toFixed(1)} g/dL</span>
            </div>
            <input type="range" class="sim-slider" id="sliderAlb" min="1.0" max="5.0" step="0.2" value="${currentAcidBase.albumin}">
          </div>
        </div>
      </div>

      <!-- Visualization & Results -->
      <div class="sim-card">
        <div class="sim-card-header">
          <h3 class="sim-card-title"><i class="fa-solid fa-vial" style="color: #8b5cf6;"></i> Đồ Thị Toan Kiềm & Đánh Giá Bù Trừ</h3>
        </div>

        <div class="sim-viz-wrapper">
          <svg width="100%" height="240" viewBox="0 0 600 240" style="max-width: 600px;">
            <!-- pH Gradient Bar -->
            <defs>
              <linearGradient id="phGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#ef4444" />
                <stop offset="35%" stop-color="#f59e0b" />
                <stop offset="50%" stop-color="#10b981" />
                <stop offset="65%" stop-color="#38bdf8" />
                <stop offset="100%" stop-color="#8b5cf6" />
              </linearGradient>
            </defs>

            <rect x="60" y="80" width="480" height="30" fill="url(#phGrad)" rx="6"/>
            <!-- Markers -->
            <text x="60" y="130" fill="var(--color-text-muted)" font-size="11">6.8 (Toan nặng)</text>
            <text x="240" y="130" fill="#10b981" font-size="11" font-weight="bold">7.35 - 7.45 (Bình thường)</text>
            <text x="540" y="130" fill="var(--color-text-muted)" font-size="11" text-anchor="end">7.8 (Kiềm nặng)</text>

            <!-- Pointer -->
            <!-- pH 6.8 -> 60px, pH 7.8 -> 540px. x = 60 + ((pH - 6.8) / 1.0) * 480 -->
            <polygon points="${Math.min(540, Math.max(60, 60 + ((result.ph - 6.8) / 1.0) * 480))},75 ${Math.min(540, Math.max(60, 60 + ((result.ph - 6.8) / 1.0) * 480)) - 8},60 ${Math.min(540, Math.max(60, 60 + ((result.ph - 6.8) / 1.0) * 480)) + 8},60" fill="var(--color-text)" />
            <text x="${Math.min(520, Math.max(80, 60 + ((result.ph - 6.8) / 1.0) * 480))}" y="50" fill="var(--color-text)" font-size="14" font-weight="bold" text-anchor="middle">
              pH = ${result.ph}
            </text>
          </svg>
        </div>

        <div class="sim-readout-grid">
          <div class="sim-readout-box">
            <div class="sim-readout-label">Chỉ số pH Máu</div>
            <div class="sim-readout-val" style="color: ${result.ph < 7.35 ? '#ef4444' : result.ph > 7.45 ? '#8b5cf6' : '#10b981'};">${result.ph}</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Anion Gap Hiệu Chỉnh</div>
            <div class="sim-readout-val" style="color: ${result.correctedAg > 14 ? '#ef4444' : '#0284c7'};">${result.correctedAg}</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Delta Ratio</div>
            <div class="sim-readout-val" style="color: #f59e0b;">${result.deltaRatio !== null ? result.deltaRatio : '—'}</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">pCO2 Bù Trừ Winter</div>
            <div class="sim-readout-val" style="color: #0284c7;">${result.expectedWinterPco2} mmHg</div>
          </div>
        </div>

        <div class="sim-clinical-box ${result.alertType}">
          <div class="sim-clinical-title"><i class="fa-solid fa-stethoscope"></i> Chẩn Đoán Toan Kiềm & Đáp Ứng Bù Trừ</div>
          <p class="sim-clinical-desc"><strong>${result.primaryDisorder}</strong></p>
          <p class="sim-clinical-desc" style="margin-top: 0.3rem;">${result.compensation}</p>
        </div>
      </div>
    </div>
  `;

  const sHco3 = document.getElementById('sliderHco3') as HTMLInputElement;
  const sPco2 = document.getElementById('sliderPco2') as HTMLInputElement;
  const sNa = document.getElementById('sliderNa') as HTMLInputElement;
  const sCl = document.getElementById('sliderCl') as HTMLInputElement;
  const sAlb = document.getElementById('sliderAlb') as HTMLInputElement;

  function update() {
    currentAcidBase.hco3 = parseFloat(sHco3.value);
    currentAcidBase.pco2 = parseFloat(sPco2.value);
    currentAcidBase.na = parseFloat(sNa.value);
    currentAcidBase.cl = parseFloat(sCl.value);
    currentAcidBase.albumin = parseFloat(sAlb.value);
    renderAcidBaseSimulator(container);
  }

  sHco3?.addEventListener('input', update);
  sPco2?.addEventListener('input', update);
  sNa?.addEventListener('input', update);
  sCl?.addEventListener('input', update);
  sAlb?.addEventListener('input', update);

  document.getElementById('presetAbNorm')?.addEventListener('click', () => {
    currentAcidBase.hco3 = 24;
    currentAcidBase.pco2 = 40;
    currentAcidBase.na = 140;
    currentAcidBase.cl = 102;
    renderAcidBaseSimulator(container);
  });
  document.getElementById('presetAbDKA')?.addEventListener('click', () => {
    currentAcidBase.hco3 = 10;
    currentAcidBase.pco2 = 23;
    currentAcidBase.na = 136;
    currentAcidBase.cl = 98;
    renderAcidBaseSimulator(container);
  });
  document.getElementById('presetAbCOPD')?.addEventListener('click', () => {
    currentAcidBase.hco3 = 34;
    currentAcidBase.pco2 = 65;
    renderAcidBaseSimulator(container);
  });
  document.getElementById('presetAbVomiting')?.addEventListener('click', () => {
    currentAcidBase.hco3 = 38;
    currentAcidBase.pco2 = 48;
    currentAcidBase.cl = 85;
    renderAcidBaseSimulator(container);
  });
}
