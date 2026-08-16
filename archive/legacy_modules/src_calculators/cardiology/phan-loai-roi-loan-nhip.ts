import { ArrhythmiaEngine } from './arrhythmia-engine';
import { ArrhythmiaCanvasEngine } from './arrhythmia-studio-canvas';
import { ArrhythmiaScenarios } from './arrhythmia-studio-scenarios';

export interface ArrhythmiaActiveParams {
  hr: number;
  qrsWidth: number;
  qtInterval: number;
  prInterval: number;
  pWave: string;
  regularity: string;
  stSegment: string;
  deltaWave: boolean;
  epsilonWave: boolean;
  brugadaStep1: boolean;
  brugadaStep3: boolean;
}

export interface PrimaryDiagnosis {
  id: string;
  label: string;
  ecgCriteria: string;
}

export interface EmergencyProtocol {
  title: string;
  steps: string[];
  drugs: string;
}

export interface ArrhythmiaEvaluationResult {
  primaryDiagnosis: PrimaryDiagnosis;
  confidence: number;
  emergencyProtocol: EmergencyProtocol;
}

export class ArrhythmiaEngineController {
  private currentDiagId: string = 'sinus-bradycardia';
  private currentQuizIdx: number = 0;

  public async initStudio(): Promise<void> {
    await ArrhythmiaEngine.init(
      './arrhythmia-classification-db.v2.json',
      './roi-loan-nhip-flowchart.json'
    );
    ArrhythmiaCanvasEngine.init('ecgWaveformCanvas');
    this.renderScenariosChips();
    this.bindSliders();
    this.updateCDSS();
  }

  public renderScenariosChips(): void {
    const win = window as any;
    const container = document.getElementById('scenariosChipsContainer');
    if (!container || !win.ArrhythmiaScenarios) return;

    const scenarios = win.ArrhythmiaScenarios.getScenarios();
    container.innerHTML = scenarios
      .map(
        (scen: any, idx: number) => `
        <button type="button" class="scenarios-chip ${idx === 0 ? 'active' : ''}" data-scen-id="${scen.id}">
          <i class="fa-solid fa-stethoscope"></i> ${scen.title}
        </button>
      `
      )
      .join('');

    container.querySelectorAll('.scenarios-chip').forEach(btn => {
      btn.addEventListener('click', (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const scenId = target.getAttribute('data-scen-id');
        if (scenId) this.loadScenario(scenId, target);
      });
    });

    if (scenarios.length > 0) {
      this.loadScenario(scenarios[0].id);
    }
  }

  public loadScenario(scenId: string, btnEl?: HTMLElement): void {
    const win = window as any;
    if (btnEl) {
      document.querySelectorAll('.scenarios-chip').forEach(c => c.classList.remove('active'));
      btnEl.classList.add('active');
    }

    if (!win.ArrhythmiaScenarios) return;
    const scen = win.ArrhythmiaScenarios.getScenarioById(scenId);
    if (!scen) return;

    const p = scen.ecgParams;
    this.setSliderVal('slider-hr', 'val-hr', p.hr, 'bpm');
    this.setSliderVal('slider-qrs', 'val-qrs', p.qrsWidth, 'ms');
    this.setSliderVal('slider-qt', 'val-qt', p.qtInterval, 'ms');
    this.setSliderVal('slider-pr', 'val-pr', p.prInterval, 'ms');

    const selPwave = document.getElementById('select-pwave') as HTMLSelectElement | null;
    const selReg = document.getElementById('select-regularity') as HTMLSelectElement | null;
    const selSt = document.getElementById('select-st') as HTMLSelectElement | null;
    const chkDelta = document.getElementById('chk-delta') as HTMLInputElement | null;
    const chkEpsilon = document.getElementById('chk-epsilon') as HTMLInputElement | null;

    if (selPwave) selPwave.value = p.pWave;
    if (selReg) selReg.value = p.regularity;
    if (selSt) selSt.value = p.stSegment;
    if (chkDelta) chkDelta.checked = p.deltaWave;
    if (chkEpsilon) chkEpsilon.checked = p.epsilonWave;

    if (scen.brugadaCriteria) {
      const chkBrug1 = document.getElementById('chk-brugada-step1') as HTMLInputElement | null;
      const chkBrug3 = document.getElementById('chk-brugada-step3') as HTMLInputElement | null;
      if (chkBrug1) chkBrug1.checked = scen.brugadaCriteria.step1;
      if (chkBrug3) chkBrug3.checked = scen.brugadaCriteria.step3;
    }

    if (win.ArrhythmiaCanvasEngine) {
      win.ArrhythmiaCanvasEngine.updateParams(p);
    }

    const titleEl = document.getElementById('scen-patient-title');
    const descEl = document.getElementById('scen-patient-desc');
    const vitalsEl = document.getElementById('scen-patient-vitals');
    if (titleEl) titleEl.textContent = scen.title;
    if (descEl) descEl.textContent = scen.patientInfo;
    if (vitalsEl) vitalsEl.textContent = scen.vitals;

    this.updateCDSS();
  }

  public setSliderVal(id: string, valBadgeId: string, val: number, unit: string): void {
    const slider = document.getElementById(id) as HTMLInputElement | null;
    const badge = document.getElementById(valBadgeId);
    if (slider) slider.value = val.toString();
    if (badge) badge.textContent = `${val} ${unit}`;
  }

  public bindSliders(): void {
    const sliders = [
      { id: 'slider-hr', badge: 'val-hr', unit: 'bpm', key: 'hr' },
      { id: 'slider-qrs', badge: 'val-qrs', unit: 'ms', key: 'qrsWidth' },
      { id: 'slider-qt', badge: 'val-qt', unit: 'ms', key: 'qtInterval' },
      { id: 'slider-pr', badge: 'val-pr', unit: 'ms', key: 'prInterval' }
    ];

    sliders.forEach(s => {
      const el = document.getElementById(s.id) as HTMLInputElement | null;
      const badge = document.getElementById(s.badge);
      if (el) {
        el.addEventListener('input', () => {
          if (badge) badge.textContent = `${el.value} ${s.unit}`;
          this.updateCDSS();
        });
      }
    });

    [
      'select-pwave',
      'select-regularity',
      'select-st',
      'chk-delta',
      'chk-epsilon',
      'chk-brugada-step1',
      'chk-brugada-step3'
    ].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', () => this.updateCDSS());
    });
  }

  public resetSliders(): void {
    this.setSliderVal('slider-hr', 'val-hr', 75, 'bpm');
    this.setSliderVal('slider-qrs', 'val-qrs', 90, 'ms');
    this.setSliderVal('slider-qt', 'val-qt', 400, 'ms');
    this.setSliderVal('slider-pr', 'val-pr', 160, 'ms');

    const selPwave = document.getElementById('select-pwave') as HTMLSelectElement | null;
    const selReg = document.getElementById('select-regularity') as HTMLSelectElement | null;
    const selSt = document.getElementById('select-st') as HTMLSelectElement | null;
    const chkDelta = document.getElementById('chk-delta') as HTMLInputElement | null;
    const chkEpsilon = document.getElementById('chk-epsilon') as HTMLInputElement | null;
    const chkBrug1 = document.getElementById('chk-brugada-step1') as HTMLInputElement | null;
    const chkBrug3 = document.getElementById('chk-brugada-step3') as HTMLInputElement | null;

    if (selPwave) selPwave.value = 'normal';
    if (selReg) selReg.value = 'regular';
    if (selSt) selSt.value = 'normal';
    if (chkDelta) chkDelta.checked = false;
    if (chkEpsilon) chkEpsilon.checked = false;
    if (chkBrug1) chkBrug1.checked = false;
    if (chkBrug3) chkBrug3.checked = false;

    this.updateCDSS();
  }

  public getActiveParams(): ArrhythmiaActiveParams {
    const hr = parseInt((document.getElementById('slider-hr') as HTMLInputElement | null)?.value || '75', 10);
    const qrsWidth = parseInt((document.getElementById('slider-qrs') as HTMLInputElement | null)?.value || '90', 10);
    const qtInterval = parseInt((document.getElementById('slider-qt') as HTMLInputElement | null)?.value || '400', 10);
    const prInterval = parseInt((document.getElementById('slider-pr') as HTMLInputElement | null)?.value || '160', 10);

    const pWave = (document.getElementById('select-pwave') as HTMLSelectElement | null)?.value || 'normal';
    const regularity = (document.getElementById('select-regularity') as HTMLSelectElement | null)?.value || 'regular';
    const stSegment = (document.getElementById('select-st') as HTMLSelectElement | null)?.value || 'normal';

    const deltaWave = (document.getElementById('chk-delta') as HTMLInputElement | null)?.checked || false;
    const epsilonWave = (document.getElementById('chk-epsilon') as HTMLInputElement | null)?.checked || false;
    const brugadaStep1 = (document.getElementById('chk-brugada-step1') as HTMLInputElement | null)?.checked || false;
    const brugadaStep3 = (document.getElementById('chk-brugada-step3') as HTMLInputElement | null)?.checked || false;

    return {
      hr,
      qrsWidth,
      qtInterval,
      prInterval,
      pWave,
      regularity,
      stSegment,
      deltaWave,
      epsilonWave,
      brugadaStep1,
      brugadaStep3
    };
  }

  public updateCDSS(): void {
    const win = window as any;
    const params = this.getActiveParams();

    if (win.ArrhythmiaCanvasEngine) {
      win.ArrhythmiaCanvasEngine.updateParams(params);
    }

    if (!win.ArrhythmiaEngine) return;
    const res: ArrhythmiaEvaluationResult = win.ArrhythmiaEngine.evaluateActiveParams(params);
    if (!res) return;

    this.currentDiagId = res.primaryDiagnosis.id;

    const confBadge = document.getElementById('cdss-confidence-badge');
    const primTitle = document.getElementById('cdss-primary-title');
    const critText = document.getElementById('cdss-criteria-text');

    if (confBadge) confBadge.textContent = `Độ tin cậy: ${res.confidence}%`;
    if (primTitle) primTitle.textContent = res.primaryDiagnosis.label;
    if (critText) critText.textContent = res.primaryDiagnosis.ecgCriteria;

    const proto = res.emergencyProtocol;
    const protoTitle = document.getElementById('proto-title');
    const protoSteps = document.getElementById('proto-steps-list');
    const protoDrugs = document.getElementById('proto-drugs-tag');

    if (protoTitle) protoTitle.innerHTML = `<i class="fa-solid fa-kit-medical"></i> ${proto.title}`;
    if (protoSteps) protoSteps.innerHTML = proto.steps.map((s: string) => `<li>${s}</li>`).join('');
    if (protoDrugs) protoDrugs.innerHTML = `<i class="fa-solid fa-pills"></i> <strong>Thuốc/Liều:</strong> ${proto.drugs}`;

    this.recalcQTc();
  }

  public setTheme(themeKey: string, btnEl?: HTMLElement): void {
    const win = window as any;
    if (btnEl && btnEl.parentElement) {
      btnEl.parentElement.querySelectorAll('.canvas-btn-sm').forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }
    if (win.ArrhythmiaCanvasEngine) {
      win.ArrhythmiaCanvasEngine.setTheme(themeKey);
    }
  }

  public setGain(scale: number, btnEl?: HTMLElement): void {
    const win = window as any;
    if (btnEl && btnEl.parentElement) {
      btnEl.parentElement.querySelectorAll('.canvas-btn-sm').forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }
    if (win.ArrhythmiaCanvasEngine) {
      win.ArrhythmiaCanvasEngine.setGainScale(scale);
    }
  }

  public setSpeed(speed: number, btnEl?: HTMLElement): void {
    const win = window as any;
    if (btnEl && btnEl.parentElement) {
      btnEl.parentElement.querySelectorAll('.canvas-btn-sm').forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }
    if (win.ArrhythmiaCanvasEngine) {
      win.ArrhythmiaCanvasEngine.setPaperSpeed(speed);
    }
  }

  public toggleExpandCanvas(): void {
    const win = window as any;
    if (win.ArrhythmiaCanvasEngine) {
      const isExpanded = win.ArrhythmiaCanvasEngine.toggleExpand();
      const btnText = document.getElementById('expand-btn-text');
      const btnIcon = document.querySelector('#btn-toggle-expand i');
      if (btnText) btnText.textContent = isExpanded ? 'Thu nhỏ' : 'Phóng to';
      if (btnIcon) {
        btnIcon.className = isExpanded ? 'fa-solid fa-compress' : 'fa-solid fa-expand';
      }
    }
  }

  public recalcQTc(): void {
    const win = window as any;
    if (!win.ArrhythmiaEngine) return;

    const qt = parseInt((document.getElementById('slider-qt') as HTMLInputElement | null)?.value || '400', 10);
    const hr = parseInt((document.getElementById('slider-hr') as HTMLInputElement | null)?.value || '75', 10);
    const formula = (document.getElementById('qtc-formula-select') as HTMLSelectElement | null)?.value || 'bazett';

    const qtc = win.ArrhythmiaEngine.calculateQTc(qt, hr, true, formula);
    const risk = win.ArrhythmiaEngine.evaluateQTcRisk(qtc, 'male');

    const disp = document.getElementById('qtc-display-val');
    const badge = document.getElementById('qtc-risk-label');
    if (disp) disp.textContent = `${qtc} ms`;
    if (badge) {
      badge.textContent = risk.label;
      badge.className = `qtc-risk-badge ${risk.colorClass}`;
    }
  }

  public openCurrentDetailModal(): void {
    const win = window as any;
    if (win.ArrhythmiaEngine && this.currentDiagId) {
      win.ArrhythmiaEngine.showEntityModal(this.currentDiagId);
    }
  }

  public exportReport(): void {
    const win = window as any;
    if (!win.ArrhythmiaEngine) return;

    const ent = win.ArrhythmiaEngine.getEntityById(this.currentDiagId);
    const params = this.getActiveParams();
    const qtc = win.ArrhythmiaEngine.calculateQTc(params.qtInterval, params.hr, true, 'bazett');

    const proto = win.ArrhythmiaEngine.generateEmergencyProtocol(this.currentDiagId);
    const reportText = `[CLINIPORTAL ARRHYTHMIA PRO STUDIO REPORT]
==========================================
Chẩn đoán chính: ${ent ? ent.label : 'N/A'}
Tần số tim (HR): ${params.hr} bpm | QRS: ${params.qrsWidth} ms | QTc: ${qtc} ms
Tiêu chuẩn ECG: ${ent ? ent.ecgCriteria : 'N/A'}
==========================================
Y LỆNH XỬ TRÍ CẤP CỨU:
${proto.title}
- ${proto.steps.join('\n- ')}
Thuốc: ${proto.drugs}`;

    navigator.clipboard.writeText(reportText).then(() => {
      alert('Đã sao chép Báo cáo Lâm sàng vào Clipboard thành công!');
    }).catch(() => {
      alert(reportText);
    });
  }

  public toggleQuizArena(): void {
    const box = document.getElementById('quizStudioBox');
    if (!box) return;
    const isOpen = box.style.display !== 'none';
    box.style.display = isOpen ? 'none' : 'block';

    if (!isOpen) {
      this.currentQuizIdx = 0;
      this.renderQuizQuestion();
      box.scrollIntoView({ behavior: 'smooth' });
    }
  }

  public renderQuizQuestion(): void {
    const win = window as any;
    if (!win.ArrhythmiaScenarios) return;
    const qBank = win.ArrhythmiaScenarios.getQuizBank();
    const q = qBank[this.currentQuizIdx];
    if (!q) return;

    const qText = document.getElementById('quizQuestionText');
    const container = document.getElementById('quizOptionsContainer');
    const expBox = document.getElementById('quizExplanationBox');

    if (qText) qText.textContent = `Câu ${this.currentQuizIdx + 1}/${qBank.length}: ${q.question}`;
    if (expBox) expBox.style.display = 'none';

    if (container) {
      container.innerHTML = q.options
        .map(
          (opt: string, idx: number) => `
          <button type="button" class="quiz-option-btn" data-opt-idx="${idx}">${opt}</button>
        `
        )
        .join('');

      container.querySelectorAll('.quiz-option-btn').forEach(btn => {
        btn.addEventListener('click', (e: Event) => {
          const idxStr = (e.currentTarget as HTMLElement).getAttribute('data-opt-idx');
          if (idxStr !== null) this.submitQuizAnswer(parseInt(idxStr, 10));
        });
      });
    }
  }

  public submitQuizAnswer(selectedIdx: number): void {
    const win = window as any;
    if (!win.ArrhythmiaScenarios) return;
    const qBank = win.ArrhythmiaScenarios.getQuizBank();
    const q = qBank[this.currentQuizIdx];
    if (!q) return;

    const btns = document.querySelectorAll('.quiz-option-btn');
    btns.forEach((btn, idx) => {
      (btn as HTMLButtonElement).disabled = true;
      if (idx === q.correctIndex) btn.classList.add('correct');
      if (idx === selectedIdx && idx !== q.correctIndex) btn.classList.add('wrong');
    });

    const expBox = document.getElementById('quizExplanationBox');
    if (expBox) {
      expBox.innerHTML = `<strong>Giải thích đáp án:</strong> ${q.explanation}`;
      expBox.style.display = 'block';
    }
  }

  public nextQuizQuestion(): void {
    const win = window as any;
    if (!win.ArrhythmiaScenarios) return;
    const qBank = win.ArrhythmiaScenarios.getQuizBank();
    this.currentQuizIdx = (this.currentQuizIdx + 1) % qBank.length;
    this.renderQuizQuestion();
  }
}

export const ArrhythmiaApp = new ArrhythmiaEngineController();

// Global export for DOM interactions
if (typeof window !== 'undefined') {
  (window as any).ArrhythmiaApp = ArrhythmiaApp;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ArrhythmiaApp.initStudio());
  } else {
    ArrhythmiaApp.initStudio();
  }
}
