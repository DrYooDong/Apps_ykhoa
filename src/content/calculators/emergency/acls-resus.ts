/**
 * CliniPortal — Advanced Cardiac Life Support (ACLS) & Resuscitation Studio (TypeScript Module)
 * AHA/ERC 2025 Guidelines: 2-minute CPR Cycle Engine, 110 BPM Metronome Synth, Defibrillation Manager, Adrenaline/Amiodarone Tracker, ETCO2 Capnography, 5H5T Checklist & Post-ROSC Protocol
 */

export class ACLSStudioEngine {
  private timerInterval: any = null;
  private adrenInterval: any = null;
  private metronomeInterval: any = null;
  private secondsLeft: number = 120;
  private isRunning: boolean = false;
  private cycleCount: number = 1;
  private shockCount: number = 0;
  private adrenSecondsLeft: number = 0;
  private adrenCount: number = 0;
  private amioCount: number = 0;
  private isAudioOn: boolean = false;
  private audioCtx: AudioContext | null = null;

  public init(): void {
    const btnStartCPR = document.getElementById('btnStartCPR');
    const btnPauseCPR = document.getElementById('btnPauseCPR');
    const btnResetCPR = document.getElementById('btnResetCPR');
    const btnToggleAudio = document.getElementById('btnToggleAudio');
    const btnDeliverShock = document.getElementById('btnDeliverShock');
    const btnGiveAdren = document.getElementById('btnGiveAdren');
    const btnGiveAmio = document.getElementById('btnGiveAmio');
    const sliderEtco2 = document.getElementById('sliderEtco2') as HTMLInputElement | null;
    const btnROSC = document.getElementById('btnROSC');

    if (btnStartCPR) btnStartCPR.addEventListener('click', () => this.startCPR());
    if (btnPauseCPR) btnPauseCPR.addEventListener('click', () => this.pauseCPR());
    if (btnResetCPR) btnResetCPR.addEventListener('click', () => this.resetCPR());
    if (btnToggleAudio) btnToggleAudio.addEventListener('click', () => this.toggleAudio());
    if (btnDeliverShock) btnDeliverShock.addEventListener('click', () => this.deliverShock());
    if (btnGiveAdren) btnGiveAdren.addEventListener('click', () => this.giveAdrenaline());
    if (btnGiveAmio) btnGiveAmio.addEventListener('click', () => this.giveAmiodarone());

    // Secondary drugs
    document.getElementById('btnGiveLido')?.addEventListener('click', () => this.logAction(`💊 Tiêm Lidocaine 1.5 mg/kg IV/IO.`));
    document.getElementById('btnGiveMg')?.addEventListener('click', () => this.logAction(`💊 Truyền Magnesi Sulfate 2g IV (Torsades de Pointes).`));
    document.getElementById('btnGiveBicarb')?.addEventListener('click', () => this.logAction(`💊 Truyền Natri Bicarbonate 8.4% 50mL (Toan máu/Tăng K+).`));
    document.getElementById('btnGiveCaCl')?.addEventListener('click', () => this.logAction(`💊 Tiêm Canxi Chloride 10% 1g IV qua CVC.`));

    if (sliderEtco2) {
      sliderEtco2.addEventListener('input', (e: Event) => this.handleEtco2Change(e));
    }

    if (btnROSC) btnROSC.addEventListener('click', () => this.handleROSC());

    // Initialize Clinical Bridge Action Chips
    const win = window as any;
    if (win.ClinicalBridge) {
      win.ClinicalBridge.renderActionChips('actionChipsContainer', [
        { label: 'Hồi Sức Vận Mạch (VIS Score)', icon: '🩸', url: 'ql-van-mach-studio.html' },
        { label: 'Cài Đặt Máy Thở & ARDS', icon: '🫁', url: 'ql-may-tho.html' },
        { label: 'Điện Giải & Toan Kiềm Crisis', icon: '🧪', url: 'metabolic-crisis-studio.html' }
      ]);
    }
  }

  private playBeep(): void {
    if (!this.isAudioOn) return;
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        this.audioCtx = new AudioContextClass();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.05);
    } catch (e) {
      console.warn('Audio Context Error', e);
    }
  }

  public formatMMSS(sec: number): string {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  public logAction(msg: string): void {
    const resusLogBox = document.getElementById('resusLogBox');
    if (!resusLogBox) return;

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const div = document.createElement('div');
    div.className = 'log-entry';
    div.innerHTML = `<span class="log-time">[${timeStr}]</span> ${msg}`;
    resusLogBox.appendChild(div);
    resusLogBox.scrollTop = resusLogBox.scrollHeight;
  }

  public startCPR(): void {
    if (this.isRunning) return;
    this.isRunning = true;

    const btnStartCPR = document.getElementById('btnStartCPR');
    const btnPauseCPR = document.getElementById('btnPauseCPR');
    const aclsStatusPill = document.getElementById('aclsStatusPill');
    const beatIndicator = document.getElementById('beatIndicator');
    const cprTimerVal = document.getElementById('cprTimerVal');
    const timerProgress = document.getElementById('timerProgress') as unknown as SVGCircleElement | null;

    if (btnStartCPR) btnStartCPR.style.display = 'none';
    if (btnPauseCPR) btnPauseCPR.style.display = 'inline-flex';
    if (aclsStatusPill) {
      aclsStatusPill.innerHTML = `<i class="fa-solid fa-heart-pulse"></i> ĐANG ÉP TIM CHU KỲ ${this.cycleCount}`;
      aclsStatusPill.style.background = 'rgba(239, 68, 68, 0.3)';
      aclsStatusPill.style.color = '#ffffff';
    }

    this.logAction(`⚡ Bắt đầu chu kỳ ép tim CPR #${this.cycleCount}`);

    this.metronomeInterval = setInterval(() => {
      if (beatIndicator) beatIndicator.classList.toggle('active');
      this.playBeep();
    }, 545);

    this.timerInterval = setInterval(() => {
      if (this.secondsLeft > 0) {
        this.secondsLeft--;
        if (cprTimerVal) cprTimerVal.textContent = this.formatMMSS(this.secondsLeft);
        if (timerProgress) {
          const offset = 565.48 * (1 - this.secondsLeft / 120);
          timerProgress.style.strokeDashoffset = offset.toString();
        }
      } else {
        this.pauseCPR();
        this.logAction(`🔔 HẾT 2 PHÚT CPR CHU KỲ #${this.cycleCount}! TẠM DỪNG ÉP TIM ĐỂ ĐÁNH GIÁ NHỊP!`);
        alert(`🚨 HẾT 2 PHÚT CPR CHU KỲ #${this.cycleCount}!\n\nTạm dừng ép tim ngay -> Kiểm tra mạch bẹn/cảnh -> Đánh giá nhịp tim trên monitor!`);
        this.cycleCount++;
        const cycleBadge = document.getElementById('cprCycleBadge');
        if (cycleBadge) cycleBadge.textContent = `CHU KỲ: ${this.cycleCount}`;
        this.secondsLeft = 120;
        if (cprTimerVal) cprTimerVal.textContent = '02:00';
        if (timerProgress) timerProgress.style.strokeDashoffset = '0';
      }
    }, 1000);
  }

  public pauseCPR(): void {
    this.isRunning = false;
    clearInterval(this.timerInterval);
    clearInterval(this.metronomeInterval);

    const btnStartCPR = document.getElementById('btnStartCPR');
    const btnPauseCPR = document.getElementById('btnPauseCPR');
    const beatIndicator = document.getElementById('beatIndicator');

    if (btnStartCPR) btnStartCPR.style.display = 'inline-flex';
    if (btnPauseCPR) btnPauseCPR.style.display = 'none';
    if (beatIndicator) beatIndicator.classList.remove('active');
  }

  public resetCPR(): void {
    this.pauseCPR();
    this.secondsLeft = 120;
    this.cycleCount = 1;

    const cprTimerVal = document.getElementById('cprTimerVal');
    const timerProgress = document.getElementById('timerProgress') as unknown as SVGCircleElement | null;
    const cycleBadge = document.getElementById('cprCycleBadge');

    if (cprTimerVal) cprTimerVal.textContent = '02:00';
    if (timerProgress) timerProgress.style.strokeDashoffset = '0';
    if (cycleBadge) cycleBadge.textContent = `CHU KỲ: 1`;
    this.logAction(`🔄 Đã reset chu kỳ CPR về 02:00.`);
  }

  public toggleAudio(): void {
    this.isAudioOn = !this.isAudioOn;
    const btn = document.getElementById('btnToggleAudio');
    if (btn) {
      btn.innerHTML = this.isAudioOn
        ? `<i class="fa-solid fa-volume-high"></i> Âm Bật`
        : `<i class="fa-solid fa-volume-xmark"></i> Âm Tắt`;
    }
  }

  public deliverShock(): void {
    this.shockCount++;
    const shockCountVal = document.getElementById('shockCountVal');
    if (shockCountVal) shockCountVal.textContent = `${this.shockCount} LẦN`;
    this.logAction(`💥 PHÁT SỐC ĐIỆN LẦN #${this.shockCount} (200J Biphasic). Lập tức tiếp tục ép tim 2 phút!`);
    this.resetCPR();
    this.startCPR();
  }

  public startAdrenTimer(): void {
    this.adrenSecondsLeft = 240;
    const adrenRow = document.getElementById('adrenRow');
    const adrenTimerText = document.getElementById('adrenTimerText');
    if (adrenRow) adrenRow.classList.remove('due-warning');

    clearInterval(this.adrenInterval);
    this.adrenInterval = setInterval(() => {
      if (this.adrenSecondsLeft > 0) {
        this.adrenSecondsLeft--;
        if (adrenTimerText) {
          adrenTimerText.textContent = `Đã tiêm #${this.adrenCount}. Lần tiếp theo sau: ${this.formatMMSS(this.adrenSecondsLeft)}`;
        }
      } else {
        if (adrenTimerText) {
          adrenTimerText.textContent = `🚨 ĐÃ ĐẾN HẠN TIÊM ADRENALINE TIẾP THEO (4 PHÚT)!`;
        }
        if (adrenRow) adrenRow.classList.add('due-warning');
      }
    }, 1000);
  }

  public giveAdrenaline(): void {
    this.adrenCount++;
    this.logAction(`💉 Tiêm Adrenaline 1mg IV/IO (Lần #${this.adrenCount}).`);
    this.startAdrenTimer();
  }

  public giveAmiodarone(): void {
    this.amioCount++;
    const amioStatusText = document.getElementById('amioStatusText');
    const btnGiveAmio = document.getElementById('btnGiveAmio') as HTMLButtonElement | null;

    if (this.amioCount === 1) {
      this.logAction(`💊 Tiêm Amiodarone Liều 1: 300mg IV Bolus.`);
      if (amioStatusText) amioStatusText.textContent = `Đã dùng Liều 1 (300mg). Liều 2 tiếp theo: 150mg`;
    } else if (this.amioCount === 2) {
      this.logAction(`💊 Tiêm Amiodarone Liều 2: 150mg IV Bolus (Đạt tổng liều 450mg).`);
      if (amioStatusText) amioStatusText.textContent = `Đã dùng đủ 2 liều Amiodarone (Tối đa 450mg).`;
      if (btnGiveAmio) {
        btnGiveAmio.disabled = true;
        btnGiveAmio.style.opacity = '0.5';
      }
    }
  }

  public handleEtco2Change(e: Event): void {
    const target = e.target as HTMLInputElement;
    const val = parseInt(target.value, 10);
    const etco2ValDisplay = document.getElementById('etco2ValDisplay');
    const etco2FeedbackText = document.getElementById('etco2FeedbackText');

    if (etco2ValDisplay) etco2ValDisplay.textContent = `${val} mmHg`;
    if (etco2FeedbackText) {
      if (val < 10) {
        etco2FeedbackText.textContent = `⚠️ ETCO2 < 10 mmHg: Ép tim chưa đủ lực/chất lượng kém! Thay người ép tim ngay!`;
        etco2FeedbackText.style.color = '#ef4444';
      } else if (val >= 40) {
        etco2FeedbackText.textContent = `🎉 ETCO2 TĂNG ĐỘT BIẾN 📈 (≥ 40 mmHg): DẤU HIỆU CÓ THỂ ĐÃ KHÔI PHỤC TUẦN HOÀN TỰ NHIÊN (ROSC)!`;
        etco2FeedbackText.style.color = '#10b981';
      } else {
        etco2FeedbackText.textContent = `✓ ETCO2 10-39 mmHg: Chất lượng ép tim chấp nhận được.`;
        etco2FeedbackText.style.color = '#0d9488';
      }
    }
  }

  public handleROSC(): void {
    this.pauseCPR();
    const aclsStatusPill = document.getElementById('aclsStatusPill');
    if (aclsStatusPill) {
      aclsStatusPill.innerHTML = `<i class="fa-solid fa-heart-circle-check"></i> ROSC ACHIEVED - KHÔI PHỤC TUẦN HOÀN!`;
      aclsStatusPill.style.background = 'rgba(16, 185, 129, 0.3)';
      aclsStatusPill.style.color = '#34d399';
    }
    this.logAction(`🏆 CẤP CỨU THÀNH CÔNG! KHÔI PHỤC TUẦN HOÀN TỰ NHIÊN (ROSC). Chuyển sang Giao thức Chăm sóc Sau Ngừng Tim!`);
    alert(`🎉 KHÔI PHỤC TUẦN HOÀN TỰ NHIÊN (ROSC ACHIEVED)!\n\n1. Kiểm soát đường thở (SpO2 92-98%, PaCO2 35-45mmHg)\n2. Kiểm soát Huyết áp (Duy trì MAP ≥ 65 mmHg với Norepinephrine)\n3. Đo ECG 12 chuyển đạo ngay (Chỉ định PCI cấp cứu nếu STEMI)\n4. Kiểm soát nhiệt độ mục tiêu TTM (32 - 36°C trong 24 giờ).`);
  }
}

export const aclsStudio = new ACLSStudioEngine();

if (typeof window !== 'undefined') {
  (window as any).aclsStudio = aclsStudio;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => aclsStudio.init());
  } else {
    aclsStudio.init();
  }
}
