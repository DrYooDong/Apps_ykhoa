/**
 * ════════════════════════════════════════════════════════════════════════════
 *  CLINICAL STEP PLAYER & TIMELINE SIMULATION ENGINE — CLINI-PORTAL (TypeScript)
 *  Hỗ trợ: Play/Pause/Scrubbing Timeline, Tốc độ 0.5x - 10x, Chu kỳ CPR 2 phút,
 *  Đồng bộ Action Checklist & Kích hoạt Node tương ứng trên Flow Engine.
 * ════════════════════════════════════════════════════════════════════════════
 */

import { ClinicalFlowEngine } from '../components/clinical-flow-engine';

export interface ScenarioStep {
  time: number; // Giây
  actionTitle: string;
  actionDesc: string;
  cprStatus?: 'normal' | 'shock' | 'drug' | string;
  nodeId?: string;
  alert?: string;
}

export interface ScenarioData {
  title: string;
  totalDurationSeconds?: number;
  steps: ScenarioStep[];
}

export interface StepPlayerOptions {
  container?: HTMLElement | string;
  logContainer?: HTMLElement | string;
  flowEngine?: ClinicalFlowEngine | null;
  onStepChange?: (step: ScenarioStep, currentTime: number) => void;
  onTimeUpdate?: (currentTime: number) => void;
}

export class ClinicalStepPlayer {
  public container: HTMLElement | null = null;
  public logContainer: HTMLElement | null = null;
  public flowEngine: ClinicalFlowEngine | null = null;
  public scenario: ScenarioData | null = null;

  public isPlaying: boolean = false;
  public currentTime: number = 0;
  public totalDuration: number = 0;
  public speed: number = 1.0;
  private timerInterval: number | null = null;
  private lastTimestamp: number | null = null;

  public cprCycleDuration: number = 120; // 120 giây = 2 phút CPR

  public onStepChange?: (step: ScenarioStep, currentTime: number) => void;
  public onTimeUpdate?: (currentTime: number) => void;

  constructor(options: StepPlayerOptions = {}) {
    if (typeof options.container === 'string') {
      this.container = document.querySelector(options.container);
    } else if (options.container) {
      this.container = options.container;
    }

    if (typeof options.logContainer === 'string') {
      this.logContainer = document.querySelector(options.logContainer);
    } else if (options.logContainer) {
      this.logContainer = options.logContainer;
    }

    this.flowEngine = options.flowEngine || null;
    this.onStepChange = options.onStepChange;
    this.onTimeUpdate = options.onTimeUpdate;

    if (this.container) {
      this.initUI();
    }
  }

  public initUI(): void {
    if (!this.container) return;
    this.container.classList.add('clinical-player-wrapper');
    this.container.innerHTML = `
      <div class="player-main-card">
          <div class="player-header">
              <div class="player-scenario-info">
                  <span class="player-badge"><i class="fa-solid fa-stopwatch"></i> CẤP CỨU THEO THỜI GIAN</span>
                  <h4 class="player-title" id="playerScenarioTitle">Chưa chọn kịch bản</h4>
              </div>
              <div class="player-timer-group">
                  <div class="timer-box main-time">
                      <span class="timer-label">THỜI GIAN</span>
                      <span class="timer-val" id="dispCurrentTime">00:00</span>
                  </div>
                  <div class="timer-box cpr-cycle-box" id="cprCycleBox">
                      <span class="timer-label">CHU KỲ CPR (2P)</span>
                      <span class="timer-val cpr-val" id="dispCprTime">02:00</span>
                  </div>
              </div>
          </div>

          <div class="player-timeline-area">
              <div class="timeline-track-container" id="timelineTrackContainer">
                  <div class="timeline-progress-bar" id="timelineProgressBar"></div>
                  <div class="timeline-markers-layer" id="timelineMarkersLayer"></div>
                  <input type="range" class="timeline-scrubber-input" id="timelineScrubber" min="0" max="100" value="0" step="1">
              </div>
              <div class="timeline-time-labels">
                  <span id="dispTimelineStart">00:00</span>
                  <span id="dispTimelineTotal">00:00</span>
              </div>
          </div>

          <div class="player-controls-bar">
              <div class="player-ctrls-left">
                  <button class="btn-player-ctrl" id="btnPlayerPrev" title="Bước trước đó">
                      <i class="fa-solid fa-backward-step"></i>
                  </button>
                  <button class="btn-player-play" id="btnPlayerPlay" title="Phát / Tạm dừng">
                      <i class="fa-solid fa-play" id="iconPlayPause"></i>
                  </button>
                  <button class="btn-player-ctrl" id="btnPlayerNext" title="Bước tiếp theo">
                      <i class="fa-solid fa-forward-step"></i>
                  </button>
                  <button class="btn-player-ctrl" id="btnPlayerReset" title="Đặt lại từ đầu">
                      <i class="fa-solid fa-arrow-rotate-left"></i>
                  </button>
              </div>

              <div class="player-ctrls-right">
                  <span class="speed-label"><i class="fa-solid fa-gauge-high"></i> Tốc độ:</span>
                  <div class="speed-btn-group">
                      <button class="btn-speed" data-speed="0.5">0.5x</button>
                      <button class="btn-speed active" data-speed="1.0">1x</button>
                      <button class="btn-speed" data-speed="2.0">2x</button>
                      <button class="btn-speed" data-speed="5.0">5x</button>
                      <button class="btn-speed" data-speed="10.0">10x</button>
                  </div>
              </div>
          </div>
      </div>
    `;

    this.setupEvents();
  }

  private setupEvents(): void {
    if (!this.container) return;
    const btnPlay = this.container.querySelector('#btnPlayerPlay');
    const btnPrev = this.container.querySelector('#btnPlayerPrev');
    const btnNext = this.container.querySelector('#btnPlayerNext');
    const btnReset = this.container.querySelector('#btnPlayerReset');
    const scrubber = this.container.querySelector<HTMLInputElement>('#timelineScrubber');
    const speedBtns = this.container.querySelectorAll<HTMLButtonElement>('.btn-speed');

    if (btnPlay) btnPlay.addEventListener('click', () => this.togglePlay());
    if (btnPrev) btnPrev.addEventListener('click', () => this.stepBackward());
    if (btnNext) btnNext.addEventListener('click', () => this.stepForward());
    if (btnReset) btnReset.addEventListener('click', () => this.seek(0));

    if (scrubber) {
      scrubber.addEventListener('input', (e) => {
        this.seek(parseFloat((e.target as HTMLInputElement).value));
      });
    }

    speedBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const spd = parseFloat(target.dataset.speed || '1.0');
        this.setSpeed(spd);
        speedBtns.forEach(b => b.classList.remove('active'));
        target.classList.add('active');
      });
    });
  }

  public loadScenario(scenarioData: ScenarioData): void {
    if (!scenarioData || !scenarioData.steps) return;
    this.pause();
    this.scenario = JSON.parse(JSON.stringify(scenarioData));
    this.totalDuration = this.scenario!.totalDurationSeconds || 300;
    this.currentTime = 0;

    const titleEl = this.container?.querySelector('#playerScenarioTitle');
    if (titleEl) titleEl.textContent = this.scenario!.title;

    const scrubber = this.container?.querySelector<HTMLInputElement>('#timelineScrubber');
    if (scrubber) {
      scrubber.min = '0';
      scrubber.max = String(this.totalDuration);
      scrubber.value = '0';
    }

    const dispTotal = this.container?.querySelector('#dispTimelineTotal');
    if (dispTotal) dispTotal.textContent = this.formatTime(this.totalDuration);

    this.renderTimelineMarkers();
    this.seek(0);
  }

  public renderTimelineMarkers(): void {
    const layer = this.container?.querySelector('#timelineMarkersLayer');
    if (!layer || !this.scenario) return;

    layer.innerHTML = '';
    this.scenario.steps.forEach((step) => {
      const pct = (step.time / this.totalDuration) * 100;
      const marker = document.createElement('div');
      marker.className = `timeline-marker ${step.cprStatus || 'normal'}`;
      marker.style.left = `${pct}%`;
      marker.title = `T+${this.formatTime(step.time)}: ${step.actionTitle}`;

      marker.addEventListener('click', (e) => {
        e.stopPropagation();
        this.seek(step.time);
      });

      layer.appendChild(marker);
    });
  }

  public togglePlay(): void {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public play(): void {
    if (this.isPlaying || !this.scenario) return;
    if (this.currentTime >= this.totalDuration) {
      this.currentTime = 0;
    }
    this.isPlaying = true;
    this.lastTimestamp = performance.now();
    this.updatePlayBtnIcon();

    this.timerInterval = requestAnimationFrame((ts) => this.onAnimationFrame(ts));
  }

  public pause(): void {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    this.updatePlayBtnIcon();
    if (this.timerInterval) {
      cancelAnimationFrame(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private updatePlayBtnIcon(): void {
    const icon = this.container?.querySelector('#iconPlayPause');
    const btn = this.container?.querySelector('#btnPlayerPlay');
    if (icon && btn) {
      if (this.isPlaying) {
        icon.className = 'fa-solid fa-pause';
        btn.classList.add('playing');
      } else {
        icon.className = 'fa-solid fa-play';
        btn.classList.remove('playing');
      }
    }
  }

  private onAnimationFrame(timestamp: number): void {
    if (!this.isPlaying) return;

    const deltaMs = timestamp - (this.lastTimestamp || timestamp);
    this.lastTimestamp = timestamp;

    const deltaSec = (deltaMs / 1000) * this.speed;
    this.currentTime = Math.min(this.currentTime + deltaSec, this.totalDuration);

    this.updateUI();

    if (this.currentTime >= this.totalDuration) {
      this.pause();
    } else {
      this.timerInterval = requestAnimationFrame((ts) => this.onAnimationFrame(ts));
    }
  }

  public setSpeed(speedVal: number): void {
    this.speed = speedVal;
  }

  public seek(targetSeconds: number): void {
    this.currentTime = Math.max(0, Math.min(targetSeconds, this.totalDuration));
    this.updateUI();
  }

  public stepForward(): void {
    if (!this.scenario) return;
    const nextStep = this.scenario.steps.find(s => s.time > this.currentTime + 0.5);
    if (nextStep) {
      this.seek(nextStep.time);
    } else {
      this.seek(this.totalDuration);
    }
  }

  public stepBackward(): void {
    if (!this.scenario) return;
    const prevSteps = this.scenario.steps.filter(s => s.time < this.currentTime - 0.5);
    if (prevSteps.length > 0) {
      const lastStep = prevSteps[prevSteps.length - 1]!;
      this.seek(lastStep.time);
    } else {
      this.seek(0);
    }
  }

  public updateUI(): void {
    if (!this.container) return;

    const dispCurrent = this.container.querySelector('#dispCurrentTime');
    if (dispCurrent) dispCurrent.textContent = this.formatTime(Math.floor(this.currentTime));

    const dispCpr = this.container.querySelector('#dispCprTime');
    const cprBox = this.container.querySelector('#cprCycleBox');
    if (dispCpr) {
      const secInCycle = Math.floor(this.currentTime) % this.cprCycleDuration;
      const remainingCpr = this.cprCycleDuration - secInCycle;
      dispCpr.textContent = this.formatTime(remainingCpr);

      if (cprBox) {
        if (remainingCpr <= 10 && remainingCpr > 0) {
          cprBox.classList.add('cpr-warning');
        } else if (remainingCpr === this.cprCycleDuration || remainingCpr === 0) {
          cprBox.classList.add('cpr-check-now');
        } else {
          cprBox.classList.remove('cpr-warning', 'cpr-check-now');
        }
      }
    }

    const pct = (this.currentTime / Math.max(this.totalDuration, 1)) * 100;
    const bar = this.container.querySelector<HTMLElement>('#timelineProgressBar');
    const scrubber = this.container.querySelector<HTMLInputElement>('#timelineScrubber');
    if (bar) bar.style.width = `${pct}%`;
    if (scrubber) scrubber.value = String(this.currentTime);

    if (this.scenario && this.scenario.steps) {
      const activeSteps = this.scenario.steps.filter(s => s.time <= this.currentTime);
      const currentStep = activeSteps.length > 0 ? activeSteps[activeSteps.length - 1]! : this.scenario.steps[0]!;

      if (this.flowEngine && currentStep && currentStep.nodeId) {
        const targetNode = (this.flowEngine.data?.nodes || []).find(n => n.id === currentStep.nodeId);
        if (targetNode) {
          this.flowEngine.currentNodeId = targetNode.id;
          this.flowEngine.activePathNodes.add(targetNode.id);
          this.flowEngine.render();
          this.flowEngine.updateInspector(targetNode);
        }
      }

      this.renderActionLog(activeSteps, currentStep);

      if (this.onStepChange) this.onStepChange(currentStep, this.currentTime);
    }

    if (this.onTimeUpdate) this.onTimeUpdate(this.currentTime);
  }

  public renderActionLog(activeSteps: ScenarioStep[], currentStep: ScenarioStep): void {
    if (!this.logContainer || !this.scenario) return;

    const logItemsHtml = (this.scenario.steps || []).map((step) => {
      const isDone = step.time <= this.currentTime;
      const isCurrent = currentStep && step === currentStep;

      const iconClass = step.cprStatus === 'shock' ? 'fa-bolt text-danger'
        : step.cprStatus === 'drug' ? 'fa-pills text-purple'
        : isDone ? 'fa-check text-success' : 'fa-circle-dot text-muted';

      return `
        <div class="action-log-item ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}" data-step-time="${step.time}">
            <div class="log-time-badge">T+${this.formatTime(step.time)}</div>
            <div class="log-content">
                <div class="log-title"><i class="fa-solid ${iconClass}"></i> ${step.actionTitle}</div>
                <div class="log-desc">${step.actionDesc}</div>
                ${step.alert ? `<div class="log-alert"><i class="fa-solid fa-triangle-exclamation"></i> ${step.alert}</div>` : ''}
            </div>
        </div>
      `;
    }).join('');

    this.logContainer.innerHTML = `
      <div class="action-log-card">
          <div class="action-log-header">
              <span class="log-header-badge"><i class="fa-solid fa-list-check"></i> TIẾN TRÌNH XỬ TRÍ</span>
              <h4>Nhật Ký Hành Động Khẩn</h4>
          </div>
          <div class="action-log-body">
              ${logItemsHtml}
          </div>
      </div>
    `;

    this.logContainer.querySelectorAll<HTMLElement>('[data-step-time]').forEach(item => {
      item.addEventListener('click', () => {
        const time = parseFloat(item.getAttribute('data-step-time') || '0');
        this.seek(time);
      });
    });
  }

  public formatTime(sec: number): string {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
}

if (typeof window !== 'undefined') {
  (window as any).ClinicalStepPlayer = ClinicalStepPlayer;
}
