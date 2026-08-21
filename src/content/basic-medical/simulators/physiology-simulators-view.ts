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
  AcidBaseParams,
  O2HbParams,
  CardiacAPParams
} from './physiology-simulators-engine';

export function renderPhysiologySimulatorsView(activeModel: string = 'nernst'): string {
  return `
    <div class="main-wrapper" style="width: 100%; max-width: 1400px; margin: 0 auto; padding-bottom: 3rem;">
      
      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <a href="#/basic-medical" style="color: inherit; text-decoration: none;">🧬 Cơ Sở Y Khoa</a> &nbsp;/&nbsp;
        <span style="color: var(--color-primary, #0284c7); font-weight: 600;">Phòng Thí Nghiệm Sinh Lý Động</span>
      </div>

      <!-- HERO HEADER -->
      <div class="sim-card" style="background: linear-gradient(135deg, rgba(2,132,199,0.08) 0%, rgba(139,92,246,0.03) 100%); margin-bottom: 1.5rem; border-color: rgba(2,132,199,0.25);">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
              <span style="font-size: 0.75rem; font-weight: 800; background: var(--color-primary, #0284c7); color: #fff; padding: 0.2rem 0.65rem; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.05em;">Real-Time Simulation Suite</span>
              <span style="font-size: 0.75rem; font-weight: 700; color: #8b5cf6; background: rgba(139,92,246,0.12); padding: 0.2rem 0.5rem; border-radius: 6px;">6 Mô Hình Định Lượng</span>
            </div>
            <h1 style="margin: 0.2rem 0 0.25rem; font-size: 1.65rem; font-weight: 800; color: var(--color-text, #0f172a);">
              ⚡ PHÒNG THÍ NGHIỆM MÔ PHỎNG SINH LÝ ĐỘNG
            </h1>
            <p style="margin: 0; font-size: 0.9rem; color: var(--color-text-muted, #475569); max-width: 840px;">
              Khám phá các mô hình toán học sinh lý định lượng tương tác thời gian thực: Điện thế màng Nernst/GHK, Lực lọc mao mạch Starling, Đường cong Frank-Starling & Vòng PV Loop, Đồ thị toan kiềm Davenport 2D, Đường cong phân ly $O_2-Hb$ & Điện thế hoạt động cơ tim.
            </p>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <a href="#/basic-medical/formula-vault" class="sim-pill-btn" style="text-decoration: none;">
              <i class="fa-solid fa-calculator"></i> Kho Công Thức
            </a>
            <a href="#/basic-medical/metabolic-map" class="sim-pill-btn" style="text-decoration: none;">
              <i class="fa-solid fa-diagram-project"></i> Bản Đồ Chuyển Hóa
            </a>
            <a href="#/docspace/tools" class="sim-pill-btn" style="text-decoration: none; color: #0284c7; background: rgba(2,132,199,0.08); border-color: rgba(2,132,199,0.3);">
              <i class="fa-solid fa-stethoscope"></i> Máy Tính DocSpace
            </a>
            <a href="#/ebm/kho-guidelines/phac-do-soc-nhiem-khuan-sepsis3" class="sim-pill-btn" style="text-decoration: none; color: #d97706; background: rgba(245,158,11,0.08); border-color: rgba(245,158,11,0.3);" title="Xem Phác Đồ Hồi Sức Sốc Nhiễm Khuẩn Chuẩn EBM">
              <i class="fa-solid fa-book-bookmark"></i> Phác Đồ Hồi Sức EBM
            </a>
          </div>
        </div>
      </div>

      <!-- SIMULATOR NAVIGATION TABS -->
      <div class="sim-nav-pills" id="simNavPills" style="margin-bottom: 1.5rem;">
        <button class="sim-pill-btn ${activeModel === 'nernst' ? 'active' : ''}" data-model="nernst">
          <i class="fa-solid fa-bolt"></i> 1. Nernst & GHK
        </button>
        <button class="sim-pill-btn ${activeModel === 'starling' ? 'active' : ''}" data-model="starling">
          <i class="fa-solid fa-droplet"></i> 2. Lực Starling & Phù
        </button>
        <button class="sim-pill-btn ${activeModel === 'frank-starling' ? 'active' : ''}" data-model="frank-starling">
          <i class="fa-solid fa-heart-pulse"></i> 3. Frank-Starling & PV Loop
        </button>
        <button class="sim-pill-btn ${activeModel === 'acid-base' ? 'active' : ''}" data-model="acid-base">
          <i class="fa-solid fa-lungs"></i> 4. Toan Kiềm Davenport
        </button>
        <button class="sim-pill-btn ${activeModel === 'o2-hb' ? 'active' : ''}" data-model="o2-hb">
          <i class="fa-solid fa-circle-nodes"></i> 5. Đường Cong O₂-Hb
        </button>
        <button class="sim-pill-btn ${activeModel === 'cardiac-ap' ? 'active' : ''}" data-model="cardiac-ap">
          <i class="fa-solid fa-wave-square"></i> 6. Điện Thế Hoạt Động Cơ Tim
        </button>
      </div>

      <!-- SIMULATOR CONTAINER -->
      <div id="simModelContainer">
        <!-- Rendered dynamically -->
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
  pcArt: 35,
  pcVen: 15,
  pcAvg: 25,
  pif: -1,
  albumin: 4.0,
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
  hr: 75,
  compliance: 1.0
};

const currentAcidBase: AcidBaseParams = {
  hco3: 24,
  pco2: 40,
  na: 140,
  cl: 102,
  albumin: 4.0
};

const currentO2Hb: O2HbParams = {
  po2: 95,
  ph: 7.40,
  pco2: 40,
  tempC: 37,
  dpgFactor: 1.0,
  coHbPercent: 0
};

const currentCardiacAP: CardiacAPParams = {
  phase: 0,
  drugClass: 'none',
  heartRate: 75,
  extracellularK: 4.5
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

    if (activeModel === 'nernst') renderNernstSimulator(container!);
    else if (activeModel === 'starling') renderStarlingSimulator(container!);
    else if (activeModel === 'frank-starling') renderFrankStarlingSimulator(container!);
    else if (activeModel === 'acid-base') renderAcidBaseSimulator(container!);
    else if (activeModel === 'o2-hb') renderO2HbSimulator(container!);
    else if (activeModel === 'cardiac-ap') renderCardiacAPSimulator(container!);
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
 * =========================================================================
 * 1. NERNST & GHK MEMBRANE POTENTIAL SIMULATOR
 * =========================================================================
 */
function renderNernstSimulator(container: HTMLElement): void {
  const res = PhysiologySimEngine.calculateNernstGHK(currentNernst);

  container.innerHTML = `
    <div class="sim-grid">
      <!-- Controls -->
      <div class="sim-card">
        <div class="sim-card-header">
          <h3 class="sim-card-title"><i class="fa-solid fa-sliders" style="color: var(--color-primary);"></i> Thông Số Nồng Độ Ion & Hệ Số Thấm</h3>
          <span style="font-size: 0.8rem; color: var(--color-text-muted); font-weight: 700;">T = 37°C</span>
        </div>

        <div style="font-size: 0.775rem; font-weight: 800; color: var(--color-text-muted); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">TÌNH HUỐNG LÂM SÀNG:</div>
        <div class="sim-preset-group">
          <button class="sim-preset-btn" id="preNernstNorm">Bình thường (K 4.5)</button>
          <button class="sim-preset-btn" id="preNernstHyperK">Tăng K+ Nặng (7.5)</button>
          <button class="sim-preset-btn" id="preNernstHypoK">Hạ K+ Nặng (2.2)</button>
          <button class="sim-preset-btn" id="preNernstHypoNa">Hạ Na+ Nặng (115)</button>
          <button class="sim-preset-btn" id="preNernstDepol">Khử cực màng (P_Na ↑)</button>
        </div>

        <div class="sim-control-group">
          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>[K⁺] Ngoại bào (mmol/L)</span>
              <span class="sim-value-badge" id="lblKOut">${currentNernst.kOut.toFixed(1)}</span>
            </div>
            <input type="range" class="sim-slider" id="slKOut" min="1.5" max="9.5" step="0.1" value="${currentNernst.kOut}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>[K⁺] Nội bào (mmol/L)</span>
              <span class="sim-value-badge" id="lblKIn">${currentNernst.kIn.toFixed(0)}</span>
            </div>
            <input type="range" class="sim-slider" id="slKIn" min="90" max="180" step="1" value="${currentNernst.kIn}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>[Na⁺] Ngoại bào (mmol/L)</span>
              <span class="sim-value-badge" id="lblNaOut">${currentNernst.naOut.toFixed(0)}</span>
            </div>
            <input type="range" class="sim-slider" id="slNaOut" min="100" max="165" step="1" value="${currentNernst.naOut}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>[Na⁺] Nội bào (mmol/L)</span>
              <span class="sim-value-badge" id="lblNaIn">${currentNernst.naIn.toFixed(0)}</span>
            </div>
            <input type="range" class="sim-slider" id="slNaIn" min="5" max="35" step="1" value="${currentNernst.naIn}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Hệ số thấm P_Na / P_K (Kênh Na+)</span>
              <span class="sim-value-badge" id="lblPNa">${currentNernst.pNa.toFixed(2)}</span>
            </div>
            <input type="range" class="sim-slider" id="slPNa" min="0.01" max="0.50" step="0.01" value="${currentNernst.pNa}">
          </div>
        </div>
      </div>

      <!-- Visualization & Results -->
      <div class="sim-card">
        <div class="sim-card-header">
          <h3 class="sim-card-title"><i class="fa-solid fa-chart-simple" style="color: #10b981;"></i> Cân Bằng Nernst & Điện Thế Nghỉ Màng GHK</h3>
          <span style="font-size: 0.8rem; font-weight: 700; color: #ef4444;" id="lblVmStatus">V_m = ${res.vm} mV</span>
        </div>

        <div class="sim-viz-wrapper" id="nernstSvgWrap">
          ${renderNernstSvg(res)}
        </div>

        <div class="sim-readout-grid">
          <div class="sim-readout-box">
            <div class="sim-readout-label">Điện Thế Nghỉ (Vm)</div>
            <div class="sim-readout-val" style="color: #ef4444;" id="valVm">${res.vm} mV</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Cân Bằng E(K⁺)</div>
            <div class="sim-readout-val" style="color: #3b82f6;" id="valEK">${res.eK} mV</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Cân Bằng E(Na⁺)</div>
            <div class="sim-readout-val" style="color: #10b981;" id="valENa">+${res.eNa} mV</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Ngưỡng Kích Thích</div>
            <div class="sim-readout-val" style="color: #f59e0b;">-55 mV</div>
          </div>
        </div>

        <div class="sim-clinical-box ${res.alertType}" id="nernstAlertBox">
          <div class="sim-clinical-title"><i class="fa-solid fa-stethoscope"></i> Ý Nghĩa Sinh Lý Bệnh & Điện Tim Học</div>
          <p class="sim-clinical-desc" id="nernstAlertText">${res.risk}</p>
        </div>
      </div>
    </div>
  `;

  // Reactive Handlers
  const slKOut = document.getElementById('slKOut') as HTMLInputElement;
  const slKIn = document.getElementById('slKIn') as HTMLInputElement;
  const slNaOut = document.getElementById('slNaOut') as HTMLInputElement;
  const slNaIn = document.getElementById('slNaIn') as HTMLInputElement;
  const slPNa = document.getElementById('slPNa') as HTMLInputElement;

  function update() {
    currentNernst.kOut = parseFloat(slKOut.value);
    currentNernst.kIn = parseFloat(slKIn.value);
    currentNernst.naOut = parseFloat(slNaOut.value);
    currentNernst.naIn = parseFloat(slNaIn.value);
    currentNernst.pNa = parseFloat(slPNa.value);

    document.getElementById('lblKOut')!.textContent = currentNernst.kOut.toFixed(1);
    document.getElementById('lblKIn')!.textContent = currentNernst.kIn.toFixed(0);
    document.getElementById('lblNaOut')!.textContent = currentNernst.naOut.toFixed(0);
    document.getElementById('lblNaIn')!.textContent = currentNernst.naIn.toFixed(0);
    document.getElementById('lblPNa')!.textContent = currentNernst.pNa.toFixed(2);

    const r = PhysiologySimEngine.calculateNernstGHK(currentNernst);
    document.getElementById('lblVmStatus')!.textContent = `V_m = ${r.vm} mV`;
    document.getElementById('valVm')!.textContent = `${r.vm} mV`;
    document.getElementById('valEK')!.textContent = `${r.eK} mV`;
    document.getElementById('valENa')!.textContent = `+${r.eNa} mV`;

    const svgWrap = document.getElementById('nernstSvgWrap');
    if (svgWrap) svgWrap.innerHTML = renderNernstSvg(r);

    const alertBox = document.getElementById('nernstAlertBox');
    const alertText = document.getElementById('nernstAlertText');
    if (alertBox && alertText) {
      alertBox.className = `sim-clinical-box ${r.alertType}`;
      alertText.textContent = r.risk;
    }
  }

  slKOut?.addEventListener('input', update);
  slKIn?.addEventListener('input', update);
  slNaOut?.addEventListener('input', update);
  slNaIn?.addEventListener('input', update);
  slPNa?.addEventListener('input', update);

  document.getElementById('preNernstNorm')?.addEventListener('click', () => {
    slKOut.value = '4.5'; slNaOut.value = '142'; slPNa.value = '0.04'; update();
  });
  document.getElementById('preNernstHyperK')?.addEventListener('click', () => {
    slKOut.value = '7.5'; slPNa.value = '0.04'; update();
  });
  document.getElementById('preNernstHypoK')?.addEventListener('click', () => {
    slKOut.value = '2.2'; slPNa.value = '0.04'; update();
  });
  document.getElementById('preNernstHypoNa')?.addEventListener('click', () => {
    slNaOut.value = '115'; update();
  });
  document.getElementById('preNernstDepol')?.addEventListener('click', () => {
    slPNa.value = '0.35'; update();
  });
}

function renderNernstSvg(res: ReturnType<typeof PhysiologySimEngine.calculateNernstGHK>): string {
  const y0 = 110;
  const yEK = Math.min(220, Math.max(20, y0 - (res.eK * 1.1)));
  const yENa = Math.min(220, Math.max(20, y0 - (res.eNa * 1.1)));
  const yVm = Math.min(220, Math.max(20, y0 - (res.vm * 1.1)));
  const yThresh = y0 - (-55 * 1.1);

  return `
    <svg width="100%" height="250" viewBox="0 0 600 250" style="max-width: 600px; user-select: none;">
      <!-- Grid lines -->
      <line x1="60" y1="20" x2="560" y2="20" stroke="var(--color-border)" stroke-dasharray="3,3" opacity="0.6"/>
      <line x1="60" y1="65" x2="560" y2="65" stroke="var(--color-border)" stroke-dasharray="3,3" opacity="0.6"/>
      <line x1="60" y1="110" x2="560" y2="110" stroke="var(--color-border)" stroke-width="1.5"/>
      <line x1="60" y1="170" x2="560" y2="170" stroke="var(--color-border)" stroke-dasharray="3,3" opacity="0.6"/>
      <line x1="60" y1="220" x2="560" y2="220" stroke="var(--color-border)" stroke-dasharray="3,3" opacity="0.6"/>

      <!-- Threshold Line (-55 mV) -->
      <line x1="60" y1="${yThresh}" x2="560" y2="${yThresh}" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="5,4"/>
      <text x="560" y="${yThresh - 4}" fill="#f59e0b" font-size="10" font-weight="bold" text-anchor="end">Ngưỡng điện thế (-55 mV)</text>

      <!-- Y Axis -->
      <line x1="60" y1="15" x2="60" y2="230" stroke="var(--color-text-muted)" stroke-width="1.5"/>
      <text x="50" y="24" fill="var(--color-text-muted)" font-size="10" text-anchor="end">+80 mV</text>
      <text x="50" y="69" fill="var(--color-text-muted)" font-size="10" text-anchor="end">+40 mV</text>
      <text x="50" y="114" fill="var(--color-text-muted)" font-size="10" text-anchor="end">0 mV</text>
      <text x="50" y="174" fill="var(--color-text-muted)" font-size="10" text-anchor="end">-55 mV</text>
      <text x="50" y="224" fill="var(--color-text-muted)" font-size="10" text-anchor="end">-100 mV</text>

      <!-- Bar E_K -->
      <rect x="110" y="${Math.min(y0, yEK)}" width="55" height="${Math.abs(y0 - yEK)}" fill="#3b82f6" rx="4" opacity="0.85"/>
      <text x="137" y="${yEK < y0 ? yEK - 6 : yEK + 14}" fill="#3b82f6" font-size="11" font-weight="bold" text-anchor="middle">${res.eK} mV</text>
      <text x="137" y="240" fill="var(--color-text)" font-size="11" font-weight="700" text-anchor="middle">Ion K⁺</text>

      <!-- Bar E_Na -->
      <rect x="220" y="${Math.min(y0, yENa)}" width="55" height="${Math.abs(y0 - yENa)}" fill="#10b981" rx="4" opacity="0.85"/>
      <text x="247" y="${yENa < y0 ? yENa - 6 : yENa + 14}" fill="#10b981" font-size="11" font-weight="bold" text-anchor="middle">+${res.eNa} mV</text>
      <text x="247" y="240" fill="var(--color-text)" font-size="11" font-weight="700" text-anchor="middle">Ion Na⁺</text>

      <!-- Active Membrane Potential Vm Needle -->
      <g transform="translate(350, 0)">
        <rect x="0" y="${Math.min(y0, yVm)}" width="170" height="${Math.abs(y0 - yVm)}" fill="rgba(239,68,68,0.15)" stroke="#ef4444" stroke-width="2" rx="6"/>
        <line x1="-15" y1="${yVm}" x2="185" y2="${yVm}" stroke="#ef4444" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="85" cy="${yVm}" r="6" fill="#ef4444" stroke="#ffffff" stroke-width="1.5"/>
        <text x="85" y="${yVm < y0 ? yVm - 10 : yVm + 18}" fill="#ef4444" font-size="13" font-weight="800" text-anchor="middle">V_m = ${res.vm} mV (GHK)</text>
        <text x="85" y="240" fill="#ef4444" font-size="11" font-weight="800" text-anchor="middle">ĐIỆN THẾ MÀNG (Vm)</text>
      </g>
    </svg>
  `;
}

/**
 * =========================================================================
 * 2. STARLING MICROVASCULAR FORCES & EDEMA SIMULATOR
 * =========================================================================
 */
function renderStarlingSimulator(container: HTMLElement): void {
  const res = PhysiologySimEngine.calculateStarling(currentStarling);

  container.innerHTML = `
    <div class="sim-grid">
      <!-- Controls -->
      <div class="sim-card">
        <div class="sim-card-header">
          <h3 class="sim-card-title"><i class="fa-solid fa-sliders" style="color: var(--color-primary);"></i> Thông Số Lực Lọc Mao Mạch</h3>
        </div>

        <div style="font-size: 0.775rem; font-weight: 800; color: var(--color-text-muted); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">TÌNH HUỐNG LÂM SÀNG MẪU:</div>
        <div class="sim-preset-group">
          <button class="sim-preset-btn" id="preStNorm">Khỏe mạnh</button>
          <button class="sim-preset-btn" id="preStCHF">Suy Tim Sung Huyết (Pc ↑)</button>
          <button class="sim-preset-btn" id="preStNephrotic">HC Thận Hư / Xơ Gan (Alb ↓)</button>
          <button class="sim-preset-btn" id="preStSepsis">Sepsis / Bỏng / Dị ứng (Kf ↑, σ ↓)</button>
          <button class="sim-preset-btn" id="preStLymph">Tắc Mạch Bạch Huyết</button>
        </div>

        <div class="sim-control-group">
          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Áp suất Thủy tĩnh Động mạch (P_c Art)</span>
              <span class="sim-value-badge" id="lblPcArt">${currentStarling.pcArt} mmHg</span>
            </div>
            <input type="range" class="sim-slider" id="slPcArt" min="20" max="55" step="1" value="${currentStarling.pcArt}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Áp suất Thủy tĩnh Tĩnh mạch (P_c Ven)</span>
              <span class="sim-value-badge" id="lblPcVen">${currentStarling.pcVen} mmHg</span>
            </div>
            <input type="range" class="sim-slider" id="slPcVen" min="8" max="35" step="1" value="${currentStarling.pcVen}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Nồng độ Albumin Huyết thanh</span>
              <span class="sim-value-badge" id="lblAlb">${currentStarling.albumin.toFixed(1)} g/dL</span>
            </div>
            <input type="range" class="sim-slider" id="slAlb" min="1.0" max="5.5" step="0.1" value="${currentStarling.albumin}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Hệ số Thấm Thành Mạch (K_f)</span>
              <span class="sim-value-badge" id="lblKf">${currentStarling.kf.toFixed(1)}</span>
            </div>
            <input type="range" class="sim-slider" id="slKf" min="0.1" max="2.5" step="0.1" value="${currentStarling.kf}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Hệ số Phản xạ Protein (σ)</span>
              <span class="sim-value-badge" id="lblSigma">${currentStarling.sigma.toFixed(2)}</span>
            </div>
            <input type="range" class="sim-slider" id="slSigma" min="0.2" max="1.0" step="0.05" value="${currentStarling.sigma}">
          </div>
        </div>
      </div>

      <!-- Visualization & Results -->
      <div class="sim-card">
        <div class="sim-card-header">
          <h3 class="sim-card-title"><i class="fa-solid fa-droplet" style="color: #0284c7;"></i> Động Học Dịch Mao Mạch & Bạch Huyết</h3>
          <span style="font-size: 0.8rem; font-weight: 700; color: #0284c7;" id="lblStGrade">${res.edemaGrade}</span>
        </div>

        <div class="sim-viz-wrapper" id="starlingSvgWrap">
          ${renderStarlingSvg(res)}
        </div>

        <div class="sim-readout-grid">
          <div class="sim-readout-box">
            <div class="sim-readout-label">Áp Lực Keo (π_c)</div>
            <div class="sim-readout-val" style="color: #8b5cf6;" id="valPiC">${res.effectivePiC} mmHg</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Lọc Động Mạch</div>
            <div class="sim-readout-val" style="color: #0284c7;" id="valNfpArt">+${res.nfpArt} mmHg</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Lưu Lượng Lọc (J_v)</div>
            <div class="sim-readout-val" style="color: ${res.jv > 3 ? '#ef4444' : '#0284c7'};" id="valJv">+${res.jv} mL/min</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Tích Tụ Mô Kẽ</div>
            <div class="sim-readout-val" style="color: ${res.accumulation > 0 ? '#ef4444' : '#10b981'};" id="valAccum">${res.accumulation} mL/min</div>
          </div>
        </div>

        <div class="sim-clinical-box ${res.alertType}" id="starlingAlertBox">
          <div class="sim-clinical-title"><i class="fa-solid fa-stethoscope"></i> Phân Tích Cơ Chế Bệnh Sinh Phù</div>
          <p class="sim-clinical-desc" id="starlingAlertText">${res.edemaState}</p>
        </div>
      </div>
    </div>
  `;

  const slPcArt = document.getElementById('slPcArt') as HTMLInputElement;
  const slPcVen = document.getElementById('slPcVen') as HTMLInputElement;
  const slAlb = document.getElementById('slAlb') as HTMLInputElement;
  const slKf = document.getElementById('slKf') as HTMLInputElement;
  const slSigma = document.getElementById('slSigma') as HTMLInputElement;

  function update() {
    currentStarling.pcArt = parseFloat(slPcArt.value);
    currentStarling.pcVen = parseFloat(slPcVen.value);
    currentStarling.pcAvg = (currentStarling.pcArt + currentStarling.pcVen) / 2;
    currentStarling.albumin = parseFloat(slAlb.value);
    currentStarling.kf = parseFloat(slKf.value);
    currentStarling.sigma = parseFloat(slSigma.value);

    document.getElementById('lblPcArt')!.textContent = `${currentStarling.pcArt} mmHg`;
    document.getElementById('lblPcVen')!.textContent = `${currentStarling.pcVen} mmHg`;
    document.getElementById('lblAlb')!.textContent = `${currentStarling.albumin.toFixed(1)} g/dL`;
    document.getElementById('lblKf')!.textContent = currentStarling.kf.toFixed(1);
    document.getElementById('lblSigma')!.textContent = currentStarling.sigma.toFixed(2);

    const r = PhysiologySimEngine.calculateStarling(currentStarling);
    document.getElementById('lblStGrade')!.textContent = r.edemaGrade;
    document.getElementById('valPiC')!.textContent = `${r.effectivePiC} mmHg`;
    document.getElementById('valNfpArt')!.textContent = `+${r.nfpArt} mmHg`;
    document.getElementById('valJv')!.textContent = `${r.jv > 0 ? '+' : ''}${r.jv} mL/min`;
    document.getElementById('valAccum')!.textContent = `${r.accumulation} mL/min`;

    const svgWrap = document.getElementById('starlingSvgWrap');
    if (svgWrap) svgWrap.innerHTML = renderStarlingSvg(r);

    const alertBox = document.getElementById('starlingAlertBox');
    const alertText = document.getElementById('starlingAlertText');
    if (alertBox && alertText) {
      alertBox.className = `sim-clinical-box ${r.alertType}`;
      alertText.textContent = r.edemaState;
    }
  }

  slPcArt?.addEventListener('input', update);
  slPcVen?.addEventListener('input', update);
  slAlb?.addEventListener('input', update);
  slKf?.addEventListener('input', update);
  slSigma?.addEventListener('input', update);

  document.getElementById('preStNorm')?.addEventListener('click', () => {
    slPcArt.value = '35'; slPcVen.value = '15'; slAlb.value = '4.0'; slKf.value = '0.5'; slSigma.value = '0.9'; update();
  });
  document.getElementById('preStCHF')?.addEventListener('click', () => {
    slPcArt.value = '45'; slPcVen.value = '30'; update();
  });
  document.getElementById('preStNephrotic')?.addEventListener('click', () => {
    slAlb.value = '1.8'; update();
  });
  document.getElementById('preStSepsis')?.addEventListener('click', () => {
    slKf.value = '1.8'; slSigma.value = '0.4'; update();
  });
  document.getElementById('preStLymph')?.addEventListener('click', () => {
    currentStarling.lymphFlow = 0.2; update();
  });
}

function renderStarlingSvg(res: ReturnType<typeof PhysiologySimEngine.calculateStarling>): string {
  const isEdema = res.accumulation > 0.5;

  return `
    <svg width="100%" height="250" viewBox="0 0 600 250" style="max-width: 600px; user-select: none;">
      <!-- Capillary Tube -->
      <defs>
        <linearGradient id="capGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#ef4444" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.25"/>
        </linearGradient>
      </defs>

      <!-- Interstitial Fluid Background -->
      <rect x="40" y="20" width="520" height="210" rx="12" fill="${isEdema ? 'rgba(2,132,199,0.12)' : 'rgba(2,132,199,0.04)'}" stroke="var(--color-border)" stroke-dasharray="4,4"/>
      <text x="50" y="38" fill="var(--color-text-muted)" font-size="11" font-weight="700">KHOANG KẼ MÔ (Interstitial Space)</text>

      <!-- Capillary Vessel -->
      <rect x="50" y="70" width="500" height="70" rx="10" fill="url(#capGrad)" stroke="#ef4444" stroke-width="2"/>
      <line x1="50" y1="70" x2="550" y2="70" stroke="#ef4444" stroke-width="2"/>
      <line x1="50" y1="140" x2="550" y2="140" stroke="#3b82f6" stroke-width="2"/>

      <!-- Labels on Capillary -->
      <text x="65" y="100" fill="#ef4444" font-size="12" font-weight="800">ĐẦU ĐỘNG MẠCH</text>
      <text x="65" y="118" fill="#ef4444" font-size="10">Pc = ${currentStarling.pcArt} mmHg</text>

      <text x="300" y="95" fill="var(--color-text)" font-size="12" font-weight="bold" text-anchor="middle">LÒNG MAO MẠCH (πc = ${res.effectivePiC} mmHg)</text>
      <text x="300" y="115" fill="var(--color-text-muted)" font-size="10" text-anchor="middle">Lọc ròng: J_v = ${res.jv > 0 ? '+' : ''}${res.jv} mL/min</text>

      <text x="535" y="100" fill="#3b82f6" font-size="12" font-weight="800" text-anchor="end">ĐẦU TĨNH MẠCH</text>
      <text x="535" y="118" fill="#3b82f6" font-size="10" text-anchor="end">Pc = ${currentStarling.pcVen} mmHg</text>

      <!-- Filtration Vectors -->
      <!-- Arterial End: Outward filtration -->
      <line x1="120" y1="140" x2="120" y2="175" stroke="#ef4444" stroke-width="3.5" marker-end="url(#metaArrow)"/>
      <text x="125" y="185" fill="#ef4444" font-size="10" font-weight="bold">Lọc (+${res.nfpArt})</text>

      <!-- Venous End -->
      <line x1="480" y1="${res.nfpVen > 0 ? 140 : 175}" x2="480" y2="${res.nfpVen > 0 ? 175 : 140}" stroke="${res.nfpVen > 0 ? '#ef4444' : '#3b82f6'}" stroke-width="3" />
      <text x="480" y="195" fill="${res.nfpVen > 0 ? '#ef4444' : '#3b82f6'}" font-size="10" font-weight="bold" text-anchor="middle">
        ${res.nfpVen > 0 ? `Lọc (+${res.nfpVen})` : `Tái hấp thu (${res.nfpVen})`}
      </text>

      <!-- Lymphatic Drainage Channel -->
      <g transform="translate(200, 195)">
        <rect x="0" y="0" width="200" height="26" rx="6" fill="rgba(16,185,129,0.15)" stroke="#10b981" stroke-width="1.5"/>
        <text x="100" y="17" fill="#10b981" font-size="11" font-weight="800" text-anchor="middle">
          🌿 MẠCH BẠCH HUYẾT (${currentStarling.lymphFlow} mL/min)
        </text>
      </g>
    </svg>
  `;
}

/**
 * =========================================================================
 * 3. FRANK-STARLING & PV LOOP SIMULATOR
 * =========================================================================
 */
function renderFrankStarlingSimulator(container: HTMLElement): void {
  const res = PhysiologySimEngine.calculateFrankStarling(currentFrankStarling);

  container.innerHTML = `
    <div class="sim-grid">
      <!-- Controls -->
      <div class="sim-card">
        <div class="sim-card-header">
          <h3 class="sim-card-title"><i class="fa-solid fa-sliders" style="color: var(--color-primary);"></i> Thông Số Huyết Động & Co Bóp Tim</h3>
        </div>

        <div style="font-size: 0.775rem; font-weight: 800; color: var(--color-text-muted); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">TÌNH HUỐNG LÂM SÀNG MẪU:</div>
        <div class="sim-preset-group">
          <button class="sim-preset-btn" id="preFsNorm">Bình thường (EF 60%)</button>
          <button class="sim-preset-btn" id="preFsHFrEF">Suy Tim Tâm Thu HFrEF (EF 25%)</button>
          <button class="sim-preset-btn" id="preFsInotrope">Dobutamine Inotrope (+50%)</button>
          <button class="sim-preset-btn" id="preFsHypovolemia">Sốc Giảm Thể Tích (EDV 60)</button>
          <button class="sim-preset-btn" id="preFsHypertension">Tăng Huyết Áp Nặng (MAP 130)</button>
        </div>

        <div class="sim-control-group">
          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Tiền tải: Cuối Tâm Trương (EDV)</span>
              <span class="sim-value-badge" id="lblEdv">${currentFrankStarling.edv} mL</span>
            </div>
            <input type="range" class="sim-slider" id="slEdv" min="40" max="230" step="5" value="${currentFrankStarling.edv}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Sức Co Bóp Cơ Tim (Inotropy Index)</span>
              <span class="sim-value-badge" id="lblIno">${currentFrankStarling.inotropy.toFixed(2)}x</span>
            </div>
            <input type="range" class="sim-slider" id="slIno" min="0.4" max="2.0" step="0.05" value="${currentFrankStarling.inotropy}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Hậu tải: Huyết Áp ĐM Trung Bình (MAP)</span>
              <span class="sim-value-badge" id="lblMap">${currentFrankStarling.map} mmHg</span>
            </div>
            <input type="range" class="sim-slider" id="slMap" min="50" max="150" step="5" value="${currentFrankStarling.map}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Tần Số Tim (Heart Rate)</span>
              <span class="sim-value-badge" id="lblHr">${currentFrankStarling.hr} bpm</span>
            </div>
            <input type="range" class="sim-slider" id="slHr" min="40" max="160" step="2" value="${currentFrankStarling.hr}">
          </div>
        </div>
      </div>

      <!-- Visualization & Results -->
      <div class="sim-card">
        <div class="sim-card-header">
          <h3 class="sim-card-title"><i class="fa-solid fa-heart" style="color: #ef4444;"></i> Đường Cong Frank-Starling & Vòng PV-Loop Thất Trái</h3>
          <span style="font-size: 0.8rem; font-weight: 800; color: #ef4444;" id="lblEfStatus">EF = ${res.ef}%</span>
        </div>

        <div class="sim-viz-wrapper" id="fsSvgWrap">
          ${renderFrankStarlingSvg(res)}
        </div>

        <div class="sim-readout-grid">
          <div class="sim-readout-box">
            <div class="sim-readout-label">Thể Tích Nhát Bóp (SV)</div>
            <div class="sim-readout-val" style="color: #ef4444;" id="valSv">${res.sv} mL</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Cung Lượng Tim (CO)</div>
            <div class="sim-readout-val" style="color: #0284c7;" id="valCo">${res.co} L/min</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Chỉ Số Tim (CI)</div>
            <div class="sim-readout-val" style="color: #10b981;" id="valCi">${res.ci} L/min/m²</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Áp Lực Cuối Trương (EDP)</div>
            <div class="sim-readout-val" style="color: #f59e0b;" id="valEdp">${res.edp} mmHg</div>
          </div>
        </div>

        <div class="sim-clinical-box ${res.alertType}" id="fsAlertBox">
          <div class="sim-clinical-title"><i class="fa-solid fa-stethoscope"></i> Đánh Giá Huyết Động & Suy Tim</div>
          <p class="sim-clinical-desc" id="fsAlertText">${res.clinicalInsight}</p>
        </div>
      </div>
    </div>
  `;

  const slEdv = document.getElementById('slEdv') as HTMLInputElement;
  const slIno = document.getElementById('slIno') as HTMLInputElement;
  const slMap = document.getElementById('slMap') as HTMLInputElement;
  const slHr = document.getElementById('slHr') as HTMLInputElement;

  function update() {
    currentFrankStarling.edv = parseFloat(slEdv.value);
    currentFrankStarling.inotropy = parseFloat(slIno.value);
    currentFrankStarling.map = parseFloat(slMap.value);
    currentFrankStarling.hr = parseFloat(slHr.value);

    document.getElementById('lblEdv')!.textContent = `${currentFrankStarling.edv} mL`;
    document.getElementById('lblIno')!.textContent = `${currentFrankStarling.inotropy.toFixed(2)}x`;
    document.getElementById('lblMap')!.textContent = `${currentFrankStarling.map} mmHg`;
    document.getElementById('lblHr')!.textContent = `${currentFrankStarling.hr} bpm`;

    const r = PhysiologySimEngine.calculateFrankStarling(currentFrankStarling);
    document.getElementById('lblEfStatus')!.textContent = `EF = ${r.ef}%`;
    document.getElementById('valSv')!.textContent = `${r.sv} mL`;
    document.getElementById('valCo')!.textContent = `${r.co} L/min`;
    document.getElementById('valCi')!.textContent = `${r.ci} L/min/m²`;
    document.getElementById('valEdp')!.textContent = `${r.edp} mmHg`;

    const svgWrap = document.getElementById('fsSvgWrap');
    if (svgWrap) svgWrap.innerHTML = renderFrankStarlingSvg(r);

    const alertBox = document.getElementById('fsAlertBox');
    const alertText = document.getElementById('fsAlertText');
    if (alertBox && alertText) {
      alertBox.className = `sim-clinical-box ${r.alertType}`;
      alertText.textContent = r.clinicalInsight;
    }
  }

  slEdv?.addEventListener('input', update);
  slIno?.addEventListener('input', update);
  slMap?.addEventListener('input', update);
  slHr?.addEventListener('input', update);

  document.getElementById('preFsNorm')?.addEventListener('click', () => {
    slEdv.value = '120'; slIno.value = '1.0'; slMap.value = '90'; slHr.value = '75'; update();
  });
  document.getElementById('preFsHFrEF')?.addEventListener('click', () => {
    slEdv.value = '180'; slIno.value = '0.50'; update();
  });
  document.getElementById('preFsInotrope')?.addEventListener('click', () => {
    slIno.value = '1.60'; update();
  });
  document.getElementById('preFsHypovolemia')?.addEventListener('click', () => {
    slEdv.value = '60'; update();
  });
  document.getElementById('preFsHypertension')?.addEventListener('click', () => {
    slMap.value = '135'; update();
  });
}

function renderFrankStarlingSvg(res: ReturnType<typeof PhysiologySimEngine.calculateFrankStarling>): string {
  // Mapping EDV (40->230 mL to x: 60->270)
  // Mapping SV (0->140 mL to y: 210->30)
  const xPt = 60 + ((currentFrankStarling.edv - 40) / 190) * 210;
  const yPt = 210 - (res.sv * 1.25);

  // PV Loop coordinates (Right side: x from 340 to 560, y from 210 to 30)
  // ESV -> xEsv, EDV -> xEdv
  const xEsv = 340 + (res.esv / 230) * 210;
  const xEdv = 340 + (currentFrankStarling.edv / 230) * 210;
  const ySys = 210 - (res.peakLvPress * 1.05);
  const yDia = 210 - (res.edp * 1.05);

  return `
    <svg width="100%" height="250" viewBox="0 0 600 250" style="max-width: 600px; user-select: none;">
      <!-- PANEL 1: Frank-Starling Curve (Left) -->
      <g>
        <line x1="50" y1="210" x2="280" y2="210" stroke="var(--color-text-muted)" stroke-width="1.5"/>
        <line x1="50" y1="25" x2="50" y2="210" stroke="var(--color-text-muted)" stroke-width="1.5"/>
        <text x="45" y="30" fill="var(--color-text-muted)" font-size="10" text-anchor="end">SV (mL)</text>
        <text x="280" y="225" fill="var(--color-text-muted)" font-size="10" text-anchor="end">EDV (mL)</text>

        <!-- Baseline Normal Curve (Dotted) -->
        <path d="M 50 210 Q 140 70, 280 65" stroke="var(--color-border)" stroke-width="2" stroke-dasharray="3,3" fill="none"/>

        <!-- Dynamic Curve -->
        <path d="M 50 210 Q 140 ${210 - (145 * currentFrankStarling.inotropy)}, 280 ${210 - (155 * currentFrankStarling.inotropy)}" stroke="#0284c7" stroke-width="3" fill="none"/>

        <!-- Operating Point -->
        <circle cx="${xPt}" cy="${yPt}" r="7" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
        <text x="${xPt}" y="${yPt - 12}" fill="#ef4444" font-size="11" font-weight="800" text-anchor="middle">SV: ${res.sv} mL</text>
        <text x="165" y="240" fill="var(--color-text)" font-size="11" font-weight="700" text-anchor="middle">Đường Cong Frank-Starling</text>
      </g>

      <!-- Vertical Divider -->
      <line x1="310" y1="20" x2="310" y2="230" stroke="var(--color-border)" stroke-dasharray="2,2"/>

      <!-- PANEL 2: LV Pressure-Volume Loop (Right) -->
      <g>
        <line x1="340" y1="210" x2="570" y2="210" stroke="var(--color-text-muted)" stroke-width="1.5"/>
        <line x1="340" y1="25" x2="340" y2="210" stroke="var(--color-text-muted)" stroke-width="1.5"/>
        <text x="335" y="30" fill="var(--color-text-muted)" font-size="10" text-anchor="end">LV Press (mmHg)</text>
        <text x="570" y="225" fill="var(--color-text-muted)" font-size="10" text-anchor="end">Volume (mL)</text>

        <!-- ESPVR Line (Slope Ees) -->
        <line x1="340" y1="210" x2="${xEsv}" y2="${ySys}" stroke="#8b5cf6" stroke-width="1.5" stroke-dasharray="4,3"/>
        <text x="${xEsv - 5}" y="${ySys - 8}" fill="#8b5cf6" font-size="9" font-weight="bold">ESPVR</text>

        <!-- PV Loop Box -->
        <path d="M ${xEdv} ${yDia} L ${xEdv} ${ySys + 15} Q ${xEdv - 15} ${ySys}, ${xEsv} ${ySys} L ${xEsv} 205 Q ${(xEsv+xEdv)/2} 208, ${xEdv} ${yDia} Z" 
          fill="rgba(239,68,68,0.12)" stroke="#ef4444" stroke-width="2.5"/>

        <text x="${(xEsv + xEdv) / 2}" y="${(ySys + 210) / 2}" fill="#ef4444" font-size="11" font-weight="bold" text-anchor="middle">PV Loop</text>
        <text x="455" y="240" fill="var(--color-text)" font-size="11" font-weight="700" text-anchor="middle">Vòng Áp Suất - Thể Tích (PV Loop)</text>
      </g>
    </svg>
  `;
}

/**
 * =========================================================================
 * 4. ACID-BASE DAVENPORT & BOSTON NOMOGRAM SIMULATOR
 * =========================================================================
 */
function renderAcidBaseSimulator(container: HTMLElement): void {
  const res = PhysiologySimEngine.calculateAcidBase(currentAcidBase);

  container.innerHTML = `
    <div class="sim-grid">
      <!-- Controls -->
      <div class="sim-card">
        <div class="sim-card-header">
          <h3 class="sim-card-title"><i class="fa-solid fa-sliders" style="color: var(--color-primary);"></i> Thông Số Khí Máu Động Mạch & Điện Giải</h3>
        </div>

        <div style="font-size: 0.775rem; font-weight: 800; color: var(--color-text-muted); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">CA LÂM SÀNG ĐIỂN HÌNH:</div>
        <div class="sim-preset-group">
          <button class="sim-preset-btn" id="preAbNorm">Bình thường (pH 7.40)</button>
          <button class="sim-preset-btn" id="preAbDKA">Toan Ceton ĐTĐ (DKA)</button>
          <button class="sim-preset-btn" id="preAbCOPD">Đợt Cấp COPD (Ứ CO2)</button>
          <button class="sim-preset-btn" id="preAbVomit">Nôn Mất Dịch (Kiềm CH)</button>
          <button class="sim-preset-btn" id="preAbSalicylate">Ngộ Độc Salicylate (Hỗn hợp)</button>
        </div>

        <div class="sim-control-group">
          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Bicarbonate [HCO₃⁻] (mEq/L)</span>
              <span class="sim-value-badge" id="lblHco3">${currentAcidBase.hco3} mEq/L</span>
            </div>
            <input type="range" class="sim-slider" id="slHco3" min="6" max="45" step="1" value="${currentAcidBase.hco3}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Áp Suất Riêng Phần pCO₂ (mmHg)</span>
              <span class="sim-value-badge" id="lblPco2">${currentAcidBase.pco2} mmHg</span>
            </div>
            <input type="range" class="sim-slider" id="slPco2" min="15" max="85" step="1" value="${currentAcidBase.pco2}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Natri [Na⁺] (mEq/L)</span>
              <span class="sim-value-badge" id="lblNa">${currentAcidBase.na} mEq/L</span>
            </div>
            <input type="range" class="sim-slider" id="slNa" min="120" max="160" step="1" value="${currentAcidBase.na}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Chloride [Cl⁻] (mEq/L)</span>
              <span class="sim-value-badge" id="lblCl">${currentAcidBase.cl} mEq/L</span>
            </div>
            <input type="range" class="sim-slider" id="slCl" min="70" max="125" step="1" value="${currentAcidBase.cl}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Albumin Huyết Thanh (g/dL)</span>
              <span class="sim-value-badge" id="lblAbAlb">${currentAcidBase.albumin.toFixed(1)} g/dL</span>
            </div>
            <input type="range" class="sim-slider" id="slAbAlb" min="1.0" max="5.0" step="0.2" value="${currentAcidBase.albumin}">
          </div>
        </div>
      </div>

      <!-- Visualization & Results -->
      <div class="sim-card">
        <div class="sim-card-header">
          <h3 class="sim-card-title"><i class="fa-solid fa-chart-line" style="color: #8b5cf6;"></i> Đồ Thị Toan Kiềm Davenport & Boston Nomogram</h3>
          <span style="font-size: 0.8rem; font-weight: 800; color: ${res.ph < 7.35 ? '#ef4444' : res.ph > 7.45 ? '#8b5cf6' : '#10b981'};" id="lblPhStatus">pH = ${res.ph}</span>
        </div>

        <div class="sim-viz-wrapper" id="acidBaseSvgWrap">
          ${renderAcidBaseSvg(res)}
        </div>

        <div class="sim-readout-grid">
          <div class="sim-readout-box">
            <div class="sim-readout-label">pH Máu ĐM</div>
            <div class="sim-readout-val" style="color: ${res.ph < 7.35 ? '#ef4444' : res.ph > 7.45 ? '#8b5cf6' : '#10b981'};" id="valPh">${res.ph}</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Anion Gap Hiệu Chỉnh</div>
            <div class="sim-readout-val" style="color: ${res.correctedAg > 14 ? '#ef4444' : '#0284c7'};" id="valAg">${res.correctedAg}</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Delta Ratio</div>
            <div class="sim-readout-val" style="color: #f59e0b;" id="valDelta">${res.deltaRatio !== null ? res.deltaRatio : '—'}</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">pCO₂ Bù Trừ Winter</div>
            <div class="sim-readout-val" style="color: #0284c7;" id="valWinter">${res.expectedWinterPco2} mmHg</div>
          </div>
        </div>

        <div class="sim-clinical-box ${res.alertType}" id="abAlertBox">
          <div class="sim-clinical-title"><i class="fa-solid fa-stethoscope"></i> Chẩn Đoán & Đáp Ứng Bù Trừ</div>
          <p class="sim-clinical-desc" id="abPrimaryText"><strong>${res.primaryDisorder}</strong></p>
          <p class="sim-clinical-desc" style="margin-top: 0.3rem;" id="abCompText">${res.compensation}</p>
        </div>
      </div>
    </div>
  `;

  const slHco3 = document.getElementById('slHco3') as HTMLInputElement;
  const slPco2 = document.getElementById('slPco2') as HTMLInputElement;
  const slNa = document.getElementById('slNa') as HTMLInputElement;
  const slCl = document.getElementById('slCl') as HTMLInputElement;
  const slAbAlb = document.getElementById('slAbAlb') as HTMLInputElement;

  function update() {
    currentAcidBase.hco3 = parseFloat(slHco3.value);
    currentAcidBase.pco2 = parseFloat(slPco2.value);
    currentAcidBase.na = parseFloat(slNa.value);
    currentAcidBase.cl = parseFloat(slCl.value);
    currentAcidBase.albumin = parseFloat(slAbAlb.value);

    document.getElementById('lblHco3')!.textContent = `${currentAcidBase.hco3} mEq/L`;
    document.getElementById('lblPco2')!.textContent = `${currentAcidBase.pco2} mmHg`;
    document.getElementById('lblNa')!.textContent = `${currentAcidBase.na} mEq/L`;
    document.getElementById('lblCl')!.textContent = `${currentAcidBase.cl} mEq/L`;
    document.getElementById('lblAbAlb')!.textContent = `${currentAcidBase.albumin.toFixed(1)} g/dL`;

    const r = PhysiologySimEngine.calculateAcidBase(currentAcidBase);
    document.getElementById('lblPhStatus')!.textContent = `pH = ${r.ph}`;
    document.getElementById('valPh')!.textContent = `${r.ph}`;
    document.getElementById('valAg')!.textContent = `${r.correctedAg}`;
    document.getElementById('valDelta')!.textContent = r.deltaRatio !== null ? `${r.deltaRatio}` : '—';
    document.getElementById('valWinter')!.textContent = `${r.expectedWinterPco2} mmHg`;

    const svgWrap = document.getElementById('acidBaseSvgWrap');
    if (svgWrap) svgWrap.innerHTML = renderAcidBaseSvg(r);

    const alertBox = document.getElementById('abAlertBox');
    const primaryText = document.getElementById('abPrimaryText');
    const compText = document.getElementById('abCompText');
    if (alertBox && primaryText && compText) {
      alertBox.className = `sim-clinical-box ${r.alertType}`;
      primaryText.innerHTML = `<strong>${r.primaryDisorder}</strong>`;
      compText.textContent = r.compensation;
    }
  }

  slHco3?.addEventListener('input', update);
  slPco2?.addEventListener('input', update);
  slNa?.addEventListener('input', update);
  slCl?.addEventListener('input', update);
  slAbAlb?.addEventListener('input', update);

  document.getElementById('preAbNorm')?.addEventListener('click', () => {
    slHco3.value = '24'; slPco2.value = '40'; slNa.value = '140'; slCl.value = '102'; update();
  });
  document.getElementById('preAbDKA')?.addEventListener('click', () => {
    slHco3.value = '10'; slPco2.value = '23'; slNa.value = '136'; slCl.value = '98'; update();
  });
  document.getElementById('preAbCOPD')?.addEventListener('click', () => {
    slHco3.value = '34'; slPco2.value = '65'; update();
  });
  document.getElementById('preAbVomit')?.addEventListener('click', () => {
    slHco3.value = '38'; slPco2.value = '48'; slCl.value = '85'; update();
  });
  document.getElementById('preAbSalicylate')?.addEventListener('click', () => {
    slHco3.value = '14'; slPco2.value = '20'; update();
  });
}

function renderAcidBaseSvg(res: ReturnType<typeof PhysiologySimEngine.calculateAcidBase>): string {
  // 2D Davenport Coordinate mapping:
  // pH (7.00 -> 7.70 mapped to x: 70 -> 530)
  // HCO3 (5 -> 45 mapped to y: 210 -> 25)
  const x = 70 + ((res.ph - 7.00) / 0.70) * 460;
  const y = 210 - ((currentAcidBase.hco3 - 5) / 40) * 185;
  const clampedX = Math.min(540, Math.max(65, x));
  const clampedY = Math.min(220, Math.max(20, y));

  return `
    <svg width="100%" height="250" viewBox="0 0 600 250" style="max-width: 600px; user-select: none;">
      <!-- Diagnostic colored zones -->
      <!-- Metabolic Acidosis (Bottom Left) -->
      <rect x="70" y="115" width="200" height="95" fill="rgba(239,68,68,0.08)" rx="6"/>
      <text x="170" y="170" fill="#ef4444" font-size="10" font-weight="700" text-anchor="middle" opacity="0.6">TOAN CHUYỂN HÓA</text>

      <!-- Metabolic Alkalosis (Top Right) -->
      <rect x="330" y="25" width="200" height="95" fill="rgba(139,92,246,0.08)" rx="6"/>
      <text x="430" y="70" fill="#8b5cf6" font-size="10" font-weight="700" text-anchor="middle" opacity="0.6">KIỀM CHUYỂN HÓA</text>

      <!-- Respiratory Acidosis (Top Left) -->
      <rect x="70" y="25" width="200" height="90" fill="rgba(245,158,11,0.08)" rx="6"/>
      <text x="170" y="60" fill="#f59e0b" font-size="10" font-weight="700" text-anchor="middle" opacity="0.6">TOAN HÔ HẤP</text>

      <!-- Respiratory Alkalosis (Bottom Right) -->
      <rect x="330" y="120" width="200" height="90" fill="rgba(16,185,129,0.08)" rx="6"/>
      <text x="430" y="170" fill="#10b981" font-size="10" font-weight="700" text-anchor="middle" opacity="0.6">KIỀM HÔ HẤP</text>

      <!-- Normal Ellipse Zone -->
      <ellipse cx="${70 + ((7.40 - 7.00)/0.70)*460}" cy="${210 - ((24 - 5)/40)*185}" rx="32" ry="16" fill="rgba(16,185,129,0.25)" stroke="#10b981" stroke-width="1.5"/>
      <text x="${70 + ((7.40 - 7.00)/0.70)*460}" y="${210 - ((24 - 5)/40)*185 + 4}" fill="#10b981" font-size="9" font-weight="bold" text-anchor="middle">CHUẨN</text>

      <!-- Axes -->
      <line x1="70" y1="210" x2="550" y2="210" stroke="var(--color-text-muted)" stroke-width="1.5"/>
      <line x1="70" y1="20" x2="70" y2="210" stroke="var(--color-text-muted)" stroke-width="1.5"/>

      <!-- Axis Ticks & Labels -->
      <text x="65" y="25" fill="var(--color-text-muted)" font-size="10" text-anchor="end">45 [HCO₃⁻]</text>
      <text x="65" y="122" fill="var(--color-text-muted)" font-size="10" text-anchor="end">24</text>
      <text x="65" y="210" fill="var(--color-text-muted)" font-size="10" text-anchor="end">5</text>

      <text x="70" y="225" fill="var(--color-text-muted)" font-size="10" text-anchor="middle">7.00 (pH)</text>
      <text x="${70 + ((7.35 - 7.00)/0.70)*460}" y="225" fill="#ef4444" font-size="10" font-weight="bold" text-anchor="middle">7.35</text>
      <text x="${70 + ((7.45 - 7.00)/0.70)*460}" y="225" fill="#8b5cf6" font-size="10" font-weight="bold" text-anchor="middle">7.45</text>
      <text x="530" y="225" fill="var(--color-text-muted)" font-size="10" text-anchor="middle">7.70</text>

      <!-- Active Coordinate Point -->
      <line x1="${clampedX}" y1="20" x2="${clampedX}" y2="210" stroke="#ef4444" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>
      <line x1="70" y1="${clampedY}" x2="550" y2="${clampedY}" stroke="#ef4444" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>

      <circle cx="${clampedX}" cy="${clampedY}" r="8" fill="#ef4444" stroke="#ffffff" stroke-width="2.5"/>
      <text x="${clampedX}" y="${clampedY - 12}" fill="#ef4444" font-size="12" font-weight="800" text-anchor="middle">
        pH ${res.ph} | HCO₃⁻ ${currentAcidBase.hco3}
      </text>
    </svg>
  `;
}

/**
 * =========================================================================
 * 5. OXYGEN-HEMOGLOBIN DISSOCIATION CURVE & BOHR EFFECT SIMULATOR
 * =========================================================================
 */
function renderO2HbSimulator(container: HTMLElement): void {
  const res = PhysiologySimEngine.calculateO2HbCurve(currentO2Hb);

  container.innerHTML = `
    <div class="sim-grid">
      <!-- Controls -->
      <div class="sim-card">
        <div class="sim-card-header">
          <h3 class="sim-card-title"><i class="fa-solid fa-sliders" style="color: var(--color-primary);"></i> Yếu Tố Điều Hòa Ái Lực Oxy (Bohr Effect)</h3>
        </div>

        <div style="font-size: 0.775rem; font-weight: 800; color: var(--color-text-muted); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">TÌNH HUỐNG LÂM SÀNG:</div>
        <div class="sim-preset-group">
          <button class="sim-preset-btn" id="preO2Norm">Khí phòng chuẩn (SaO2 98%)</button>
          <button class="sim-preset-btn" id="preO2Exercise">Gắng sức / Sốt cao (Lệch Phải)</button>
          <button class="sim-preset-btn" id="preO2HypoThermia">Hạ thân nhiệt / Kiềm máu (Lệch Trái)</button>
          <button class="sim-preset-btn" id="preO2CO">Ngộ độc Khí CO (CO-Hb 30%)</button>
          <button class="sim-preset-btn" id="preO2Hypoxemia">Thiếu Oxy Nặng (PaO2 45)</button>
        </div>

        <div class="sim-control-group">
          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Phân Áp Oxy Động Mạch (PaO₂) (mmHg)</span>
              <span class="sim-value-badge" id="lblPo2">${currentO2Hb.po2} mmHg</span>
            </div>
            <input type="range" class="sim-slider" id="slPo2" min="15" max="150" step="1" value="${currentO2Hb.po2}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Độ Toan Máu (pH)</span>
              <span class="sim-value-badge" id="lblO2Ph">${currentO2Hb.ph.toFixed(2)}</span>
            </div>
            <input type="range" class="sim-slider" id="slO2Ph" min="7.00" max="7.70" step="0.02" value="${currentO2Hb.ph}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Phân Áp CO₂ (PaCO₂) (mmHg)</span>
              <span class="sim-value-badge" id="lblO2Pco2">${currentO2Hb.pco2} mmHg</span>
            </div>
            <input type="range" class="sim-slider" id="slO2Pco2" min="20" max="80" step="2" value="${currentO2Hb.pco2}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Thân Nhiệt Cơ Thể (°C)</span>
              <span class="sim-value-badge" id="lblTemp">${currentO2Hb.tempC.toFixed(1)} °C</span>
            </div>
            <input type="range" class="sim-slider" id="slTemp" min="32" max="42" step="0.5" value="${currentO2Hb.tempC}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Nồng độ 2,3-DPG (Tỷ lệ so với chuẩn)</span>
              <span class="sim-value-badge" id="lblDpg">${currentO2Hb.dpgFactor.toFixed(1)}x</span>
            </div>
            <input type="range" class="sim-slider" id="slDpg" min="0.5" max="2.0" step="0.1" value="${currentO2Hb.dpgFactor}">
          </div>
        </div>
      </div>

      <!-- Visualization & Results -->
      <div class="sim-card">
        <div class="sim-card-header">
          <h3 class="sim-card-title"><i class="fa-solid fa-lungs" style="color: #ef4444;"></i> Đường Cong Phân Ly Chữ S (Sigmoid) & Chỉ Số P₅₀</h3>
          <span style="font-size: 0.8rem; font-weight: 800; color: #ef4444;" id="lblSaO2Status">SaO₂ = ${res.saO2}%</span>
        </div>

        <div class="sim-viz-wrapper" id="o2HbSvgWrap">
          ${renderO2HbSvg(res)}
        </div>

        <div class="sim-readout-grid">
          <div class="sim-readout-box">
            <div class="sim-readout-label">Độ Bão Hòa (SaO₂)</div>
            <div class="sim-readout-val" style="color: ${res.saO2 < 90 ? '#ef4444' : '#0284c7'};" id="valSaO2">${res.saO2}%</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Chỉ Số P₅₀ Hiệu Dụng</div>
            <div class="sim-readout-val" style="color: #8b5cf6;" id="valP50">${res.effectiveP50} mmHg</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Hướng Dịch Chuyển</div>
            <div class="sim-readout-val" style="color: ${res.shiftDirection === 'right' ? '#10b981' : res.shiftDirection === 'left' ? '#f59e0b' : '#0284c7'};" id="valShift">
              ${res.shiftDirection === 'right' ? 'LỆCH PHẢI (CADET)' : res.shiftDirection === 'left' ? 'LỆCH TRÁI' : 'CHUẨN'}
            </div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Mức Nhả Oxy Mô</div>
            <div class="sim-readout-val" style="color: #10b981;" id="valO2Delivery">${res.shiftDirection === 'right' ? 'TĂNG CAO' : res.shiftDirection === 'left' ? 'GIẢM (GIỮ O2)' : 'BÌNH THƯỜNG'}</div>
          </div>
        </div>

        <div class="sim-clinical-box ${res.alertType}" id="o2AlertBox">
          <div class="sim-clinical-title"><i class="fa-solid fa-stethoscope"></i> Ý Nghĩa Sinh Lý Bệnh Trao Đổi Khí</div>
          <p class="sim-clinical-desc" id="o2AlertText">${res.shiftReason}</p>
        </div>
      </div>
    </div>
  `;

  const slPo2 = document.getElementById('slPo2') as HTMLInputElement;
  const slO2Ph = document.getElementById('slO2Ph') as HTMLInputElement;
  const slO2Pco2 = document.getElementById('slO2Pco2') as HTMLInputElement;
  const slTemp = document.getElementById('slTemp') as HTMLInputElement;
  const slDpg = document.getElementById('slDpg') as HTMLInputElement;

  function update() {
    currentO2Hb.po2 = parseFloat(slPo2.value);
    currentO2Hb.ph = parseFloat(slO2Ph.value);
    currentO2Hb.pco2 = parseFloat(slO2Pco2.value);
    currentO2Hb.tempC = parseFloat(slTemp.value);
    currentO2Hb.dpgFactor = parseFloat(slDpg.value);

    document.getElementById('lblPo2')!.textContent = `${currentO2Hb.po2} mmHg`;
    document.getElementById('lblO2Ph')!.textContent = currentO2Hb.ph.toFixed(2);
    document.getElementById('lblO2Pco2')!.textContent = `${currentO2Hb.pco2} mmHg`;
    document.getElementById('lblTemp')!.textContent = `${currentO2Hb.tempC.toFixed(1)} °C`;
    document.getElementById('lblDpg')!.textContent = `${currentO2Hb.dpgFactor.toFixed(1)}x`;

    const r = PhysiologySimEngine.calculateO2HbCurve(currentO2Hb);
    document.getElementById('lblSaO2Status')!.textContent = `SaO₂ = ${r.saO2}%`;
    document.getElementById('valSaO2')!.textContent = `${r.saO2}%`;
    document.getElementById('valP50')!.textContent = `${r.effectiveP50} mmHg`;
    document.getElementById('valShift')!.textContent = r.shiftDirection === 'right' ? 'LỆCH PHẢI (CADET)' : r.shiftDirection === 'left' ? 'LỆCH TRÁI' : 'CHUẨN';
    document.getElementById('valO2Delivery')!.textContent = r.shiftDirection === 'right' ? 'TĂNG CAO' : r.shiftDirection === 'left' ? 'GIẢM (GIỮ O2)' : 'BÌNH THƯỜNG';

    const svgWrap = document.getElementById('o2HbSvgWrap');
    if (svgWrap) svgWrap.innerHTML = renderO2HbSvg(r);

    const alertBox = document.getElementById('o2AlertBox');
    const alertText = document.getElementById('o2AlertText');
    if (alertBox && alertText) {
      alertBox.className = `sim-clinical-box ${r.alertType}`;
      alertText.textContent = r.shiftReason;
    }
  }

  slPo2?.addEventListener('input', update);
  slO2Ph?.addEventListener('input', update);
  slO2Pco2?.addEventListener('input', update);
  slTemp?.addEventListener('input', update);
  slDpg?.addEventListener('input', update);

  document.getElementById('preO2Norm')?.addEventListener('click', () => {
    slPo2.value = '95'; slO2Ph.value = '7.40'; slO2Pco2.value = '40'; slTemp.value = '37'; slDpg.value = '1.0'; currentO2Hb.coHbPercent = 0; update();
  });
  document.getElementById('preO2Exercise')?.addEventListener('click', () => {
    slO2Ph.value = '7.24'; slO2Pco2.value = '55'; slTemp.value = '39.5'; slDpg.value = '1.5'; currentO2Hb.coHbPercent = 0; update();
  });
  document.getElementById('preO2HypoThermia')?.addEventListener('click', () => {
    slO2Ph.value = '7.55'; slO2Pco2.value = '25'; slTemp.value = '33'; slDpg.value = '0.6'; currentO2Hb.coHbPercent = 0; update();
  });
  document.getElementById('preO2CO')?.addEventListener('click', () => {
    currentO2Hb.coHbPercent = 30; slO2Ph.value = '7.40'; update();
  });
  document.getElementById('preO2Hypoxemia')?.addEventListener('click', () => {
    slPo2.value = '45'; update();
  });
}

function renderO2HbSvg(res: ReturnType<typeof PhysiologySimEngine.calculateO2HbCurve>): string {
  // PO2 range: 0 -> 120 mmHg mapped to x: 60 -> 540
  // SaO2 range: 0 -> 100% mapped to y: 210 -> 25
  const xPt = 60 + (Math.min(120, currentO2Hb.po2) / 120) * 480;
  const yPt = 210 - (res.saO2 / 100) * 185;

  // Generate SVG path for dynamic Sigmoid curve
  let dCurve = 'M 60 210';
  for (let po2 = 2; po2 <= 120; po2 += 4) {
    const tempP = { ...currentO2Hb, po2 };
    const r = PhysiologySimEngine.calculateO2HbCurve(tempP);
    const px = 60 + (po2 / 120) * 480;
    const py = 210 - (r.saO2 / 100) * 185;
    dCurve += ` L ${px.toFixed(1)} ${py.toFixed(1)}`;
  }

  // Baseline standard curve (P50 = 26.8)
  let dBase = 'M 60 210';
  for (let po2 = 2; po2 <= 120; po2 += 5) {
    const n = 2.7;
    const s = (Math.pow(po2, n) / (Math.pow(26.8, n) + Math.pow(po2, n))) * 100;
    const px = 60 + (po2 / 120) * 480;
    const py = 210 - (s / 100) * 185;
    dBase += ` L ${px.toFixed(1)} ${py.toFixed(1)}`;
  }

  return `
    <svg width="100%" height="250" viewBox="0 0 600 250" style="max-width: 600px; user-select: none;">
      <!-- Danger Zone SaO2 < 90% (PaO2 < 60) -->
      <rect x="60" y="${210 - (90/100)*185}" width="480" height="${(90/100)*185}" fill="rgba(239,68,68,0.05)"/>
      <line x1="60" y1="${210 - (90/100)*185}" x2="540" y2="${210 - (90/100)*185}" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4,4"/>
      <text x="535" y="${210 - (90/100)*185 - 4}" fill="#ef4444" font-size="10" font-weight="bold" text-anchor="end">Ngưỡng suy hô hấp (SaO₂ 90% ~ PaO₂ 60)</text>

      <!-- Axes -->
      <line x1="60" y1="210" x2="550" y2="210" stroke="var(--color-text-muted)" stroke-width="1.5"/>
      <line x1="60" y1="20" x2="60" y2="210" stroke="var(--color-text-muted)" stroke-width="1.5"/>

      <!-- Labels -->
      <text x="55" y="28" fill="var(--color-text-muted)" font-size="10" text-anchor="end">100%</text>
      <text x="55" y="${210 - (50/100)*185}" fill="var(--color-text-muted)" font-size="10" text-anchor="end">50%</text>
      <text x="55" y="210" fill="var(--color-text-muted)" font-size="10" text-anchor="end">0%</text>

      <text x="60" y="225" fill="var(--color-text-muted)" font-size="10" text-anchor="middle">0</text>
      <text x="${60 + (26.8/120)*480}" y="225" fill="var(--color-text-muted)" font-size="10" text-anchor="middle">P₅₀ (26.8)</text>
      <text x="${60 + (60/120)*480}" y="225" fill="#ef4444" font-size="10" font-weight="bold" text-anchor="middle">60</text>
      <text x="${60 + (100/120)*480}" y="225" fill="var(--color-text-muted)" font-size="10" text-anchor="middle">100</text>
      <text x="550" y="225" fill="var(--color-text-muted)" font-size="10" text-anchor="end">PaO₂ (mmHg)</text>

      <!-- Standard Baseline Curve (Dotted Gray) -->
      <path d="${dBase}" stroke="var(--color-border)" stroke-width="2" stroke-dasharray="3,3" fill="none"/>

      <!-- Active Dynamic Curve -->
      <path d="${dCurve}" stroke="${res.shiftDirection === 'right' ? '#10b981' : res.shiftDirection === 'left' ? '#f59e0b' : '#0284c7'}" stroke-width="3.5" fill="none"/>

      <!-- Active Point -->
      <line x1="${xPt}" y1="${yPt}" x2="${xPt}" y2="210" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,3"/>
      <line x1="60" y1="${yPt}" x2="${xPt}" y2="${yPt}" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="3,3"/>

      <circle cx="${xPt}" cy="${yPt}" r="8" fill="#ef4444" stroke="#ffffff" stroke-width="2.5"/>
      <text x="${xPt}" y="${yPt - 12}" fill="#ef4444" font-size="12" font-weight="800" text-anchor="middle">
        PaO₂: ${currentO2Hb.po2} ➔ SaO₂: ${res.saO2}%
      </text>
    </svg>
  `;
}

/**
 * =========================================================================
 * 6. CARDIAC ACTION POTENTIAL & ANTIARRHYTHMIC PHARMACOLOGY SIMULATOR
 * =========================================================================
 */
function renderCardiacAPSimulator(container: HTMLElement): void {
  const res = PhysiologySimEngine.calculateCardiacAP(currentCardiacAP);

  container.innerHTML = `
    <div class="sim-grid">
      <!-- Controls -->
      <div class="sim-card">
        <div class="sim-card-header">
          <h3 class="sim-card-title"><i class="fa-solid fa-sliders" style="color: var(--color-primary);"></i> Thuốc Chống Loạn Nhịp & Dòng Ion</h3>
        </div>

        <div style="font-size: 0.775rem; font-weight: 800; color: var(--color-text-muted); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;">PHÂN LOẠI VAUGHAN WILLIAMS:</div>
        <div class="sim-radio-group" id="apDrugPills" style="margin-bottom: 1.25rem;">
          <button class="sim-radio-btn ${currentCardiacAP.drugClass === 'none' ? 'active' : ''}" data-drug="none">Không Dùng Thuốc</button>
          <button class="sim-radio-btn ${currentCardiacAP.drugClass === 'ia' ? 'active' : ''}" data-drug="ia">Class IA (Quinidine)</button>
          <button class="sim-radio-btn ${currentCardiacAP.drugClass === 'ib' ? 'active' : ''}" data-drug="ib">Class IB (Lidocaine)</button>
          <button class="sim-radio-btn ${currentCardiacAP.drugClass === 'ic' ? 'active' : ''}" data-drug="ic">Class IC (Flecainide)</button>
          <button class="sim-radio-btn ${currentCardiacAP.drugClass === 'ii' ? 'active' : ''}" data-drug="ii">Class II (Beta-Blocker)</button>
          <button class="sim-radio-btn ${currentCardiacAP.drugClass === 'iii' ? 'active' : ''}" data-drug="iii">Class III (Amiodarone)</button>
          <button class="sim-radio-btn ${currentCardiacAP.drugClass === 'iv' ? 'active' : ''}" data-drug="iv">Class IV (Verapamil)</button>
        </div>

        <div class="sim-control-group">
          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Tần Số Tim (Heart Rate)</span>
              <span class="sim-value-badge" id="lblApHr">${currentCardiacAP.heartRate} bpm</span>
            </div>
            <input type="range" class="sim-slider" id="slApHr" min="45" max="150" step="5" value="${currentCardiacAP.heartRate}">
          </div>

          <div class="sim-control-row">
            <div class="sim-control-label">
              <span>Kali Ngoại Bào [K⁺] (mmol/L)</span>
              <span class="sim-value-badge" id="lblApK">${currentCardiacAP.extracellularK.toFixed(1)} mmol/L</span>
            </div>
            <input type="range" class="sim-slider" id="slApK" min="2.5" max="7.5" step="0.1" value="${currentCardiacAP.extracellularK}">
          </div>
        </div>

        <div style="margin-top: 1.25rem; padding: 0.75rem; border-radius: 8px; background: rgba(139,92,246,0.08); font-size: 0.8rem; line-height: 1.5; color: var(--color-text-muted);">
          <strong style="color: #8b5cf6;">5 Pha Điện Thế Hoạt Động Thất:</strong><br>
          • <strong>Pha 0</strong>: Dòng $Na^+$ nhanh ($I_{Na}$) mở ồ ạt ➔ Khử cực nhanh.<br>
          • <strong>Pha 1</strong>: Kênh $K^+$ thoáng qua ($I_{to}$) ➔ Tái cực sớm.<br>
          • <strong>Pha 2</strong>: Cao nguyên $Ca^{2+}$ L-type ($I_{Ca,L}$) cân bằng dòng $K^+$.<br>
          • <strong>Pha 3</strong>: Kênh $K^+$ chậm ($I_{Kr}, I_{Ks}$) ➔ Tái cực nhanh.<br>
          • <strong>Pha 4</strong>: Kênh rò $K1$ ($I_{K1}$) ➔ Duy trì điện thế nghỉ $-90$ mV.
        </div>
      </div>

      <!-- Visualization & Results -->
      <div class="sim-card">
        <div class="sim-card-header">
          <h3 class="sim-card-title"><i class="fa-solid fa-wave-square" style="color: #8b5cf6;"></i> Đường Cong Điện Thế Hoạt Động Cơ Tim Thất</h3>
          <span style="font-size: 0.8rem; font-weight: 800; color: #8b5cf6;" id="lblApdStatus">APD ≈ ${res.apd} ms</span>
        </div>

        <div class="sim-viz-wrapper" id="cardiacApSvgWrap">
          ${renderCardiacApSvg(res)}
        </div>

        <div class="sim-readout-grid">
          <div class="sim-readout-box">
            <div class="sim-readout-label">Thời Gian ĐTHĐ (APD)</div>
            <div class="sim-readout-val" style="color: #8b5cf6;" id="valApd">${res.apd} ms</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Thời Kỳ Trơ (ERP)</div>
            <div class="sim-readout-val" style="color: #0284c7;" id="valErp">${res.erp} ms</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Tốc Độ Pha 0 (dV/dt)</div>
            <div class="sim-readout-val" style="color: ${res.phase0Slope < 0.8 ? '#ef4444' : '#10b981'};" id="valPhase0">${res.phase0Slope}x</div>
          </div>
          <div class="sim-readout-box">
            <div class="sim-readout-label">Ảnh Hưởng ECG</div>
            <div class="sim-readout-val" style="font-size: 0.95rem; color: #f59e0b;" id="valEkg">${res.ekgFinding.split('➔')[0]}</div>
          </div>
        </div>

        <div class="sim-clinical-box ${res.alertType}" id="apAlertBox">
          <div class="sim-clinical-title"><i class="fa-solid fa-pills"></i> Tác Dụng Dược Lý & Nguy Cơ Loạn Nhịp</div>
          <p class="sim-clinical-desc" id="apAlertText"><strong>${res.drugEffectSummary}</strong></p>
          <p class="sim-clinical-desc" style="margin-top: 0.3rem;" id="apEkgText">${res.ekgFinding}</p>
        </div>
      </div>
    </div>
  `;

  const slApHr = document.getElementById('slApHr') as HTMLInputElement;
  const slApK = document.getElementById('slApK') as HTMLInputElement;
  const drugButtons = document.querySelectorAll('#apDrugPills .sim-radio-btn');

  function update() {
    currentCardiacAP.heartRate = parseFloat(slApHr.value);
    currentCardiacAP.extracellularK = parseFloat(slApK.value);

    document.getElementById('lblApHr')!.textContent = `${currentCardiacAP.heartRate} bpm`;
    document.getElementById('lblApK')!.textContent = `${currentCardiacAP.extracellularK.toFixed(1)} mmol/L`;

    const r = PhysiologySimEngine.calculateCardiacAP(currentCardiacAP);
    document.getElementById('lblApdStatus')!.textContent = `APD ≈ ${r.apd} ms`;
    document.getElementById('valApd')!.textContent = `${r.apd} ms`;
    document.getElementById('valErp')!.textContent = `${r.erp} ms`;
    document.getElementById('valPhase0')!.textContent = `${r.phase0Slope}x`;
    document.getElementById('valEkg')!.textContent = r.ekgFinding.split('➔')[0];

    const svgWrap = document.getElementById('cardiacApSvgWrap');
    if (svgWrap) svgWrap.innerHTML = renderCardiacApSvg(r);

    const alertBox = document.getElementById('apAlertBox');
    const alertText = document.getElementById('apAlertText');
    const ekgText = document.getElementById('apEkgText');
    if (alertBox && alertText && ekgText) {
      alertBox.className = `sim-clinical-box ${r.alertType}`;
      alertText.innerHTML = `<strong>${r.drugEffectSummary}</strong>`;
      ekgText.textContent = r.ekgFinding;
    }
  }

  slApHr?.addEventListener('input', update);
  slApK?.addEventListener('input', update);

  drugButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      drugButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCardiacAP.drugClass = (btn.getAttribute('data-drug') || 'none') as any;
      update();
    });
  });
}

function renderCardiacApSvg(res: ReturnType<typeof PhysiologySimEngine.calculateCardiacAP>): string {
  // Mapping time 0 -> 400ms (x: 60 -> 540)
  // Voltage -90mV to +30mV (y: 210 -> 35)
  // Phase 0: x0 = 100, x1 = 100 + 40 / res.phase0Slope (slower slope = wider dx)
  const xStart = 90;
  const xPeak = xStart + (18 / res.phase0Slope);
  const xPlateauEnd = xPeak + (120 * (res.apd / 300));
  const xRepolEnd = xStart + (320 * (res.apd / 300));
  const yPlateau = 75 + (20 * (1 - res.phase2Height));

  return `
    <svg width="100%" height="250" viewBox="0 0 600 250" style="max-width: 600px; user-select: none;">
      <!-- Grid Lines -->
      <line x1="60" y1="35" x2="550" y2="35" stroke="var(--color-border)" stroke-dasharray="3,3" opacity="0.6"/>
      <line x1="60" y1="95" x2="550" y2="95" stroke="var(--color-border)" stroke-dasharray="3,3" opacity="0.6"/>
      <line x1="60" y1="155" x2="550" y2="155" stroke="var(--color-border)" stroke-dasharray="3,3" opacity="0.6"/>
      <line x1="60" y1="210" x2="550" y2="210" stroke="var(--color-border)" stroke-width="1.5"/>

      <!-- Axes -->
      <line x1="60" y1="20" x2="60" y2="210" stroke="var(--color-text-muted)" stroke-width="1.5"/>
      <text x="55" y="40" fill="var(--color-text-muted)" font-size="10" text-anchor="end">+20 mV</text>
      <text x="55" y="100" fill="var(--color-text-muted)" font-size="10" text-anchor="end">0 mV</text>
      <text x="55" y="160" fill="var(--color-text-muted)" font-size="10" text-anchor="end">-55 mV</text>
      <text x="55" y="214" fill="var(--color-text-muted)" font-size="10" text-anchor="end">-90 mV</text>

      <!-- Baseline Normal AP (Dotted) -->
      <path d="M 60 210 L 90 210 L 105 35 L 125 55 L 230 75 Q 280 85, 330 210 L 550 210" 
        stroke="var(--color-border)" stroke-width="2" stroke-dasharray="3,3" fill="none"/>

      <!-- Active Dynamic AP Curve -->
      <path d="M 60 210 L ${xStart} 210 L ${xPeak} 35 L ${xPeak + 18} 55 L ${xPlateauEnd} ${yPlateau} Q ${(xPlateauEnd + xRepolEnd)/2} ${yPlateau + 25}, ${xRepolEnd} 210 L 550 210" 
        stroke="#8b5cf6" stroke-width="3.5" fill="none"/>

      <!-- Phase Annotations -->
      <text x="${(xStart + xPeak)/2}" y="125" fill="#ef4444" font-size="11" font-weight="bold">Pha 0 (Na⁺)</text>
      <text x="${xPeak + 20}" y="45" fill="#f59e0b" font-size="10" font-weight="bold">Pha 1</text>
      <text x="${(xPeak + xPlateauEnd)/2}" y="${yPlateau - 10}" fill="#10b981" font-size="11" font-weight="bold">Pha 2 Cao nguyên (Ca²⁺)</text>
      <text x="${(xPlateauEnd + xRepolEnd)/2 + 10}" y="140" fill="#3b82f6" font-size="11" font-weight="bold">Pha 3 Tái cực (K⁺)</text>
      <text x="450" y="200" fill="var(--color-text-muted)" font-size="10" font-weight="bold">Pha 4 Điện thế nghỉ</text>

      <!-- Effective Refractory Period (ERP) Bracket -->
      <rect x="${xStart}" y="222" width="${(res.erp / 300) * 320}" height="8" fill="rgba(2,132,199,0.3)" rx="4"/>
      <text x="${xStart + ((res.erp / 300) * 320)/2}" y="242" fill="#0284c7" font-size="10" font-weight="bold" text-anchor="middle">
        Thời Kỳ Trơ Hữu Hiệu (ERP ≈ ${res.erp} ms)
      </text>
    </svg>
  `;
}
