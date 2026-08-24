/**
 * DocSpace — Hospital Web Audio Engine
 * Bộ tổng hợp âm thanh còi báo động y tế IEC 60601-1-8 & Nhịp tim Monitor
 * Sử dụng thuần Web Audio API (Không tải file MP3 ngoài, hoạt động Offline 100%)
 */

export class HospitalAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {}

  private initContext(): void {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Phát tiếng bíp nhịp tim monitor giường bệnh (Pulse Oximeter Beep)
   */
  public playPulseBeep(frequency: number = 880): void {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = frequency;
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio context might be restricted before user gesture
    }
  }

  /**
   * Chuẩn còi báo động khẩn cấp mức cao IEC 60601-1-8 (High Priority Alarm)
   */
  public playEmergencyAlarm(): void {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [0, 0.15, 0.3].forEach((delay, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'square';
        osc.frequency.value = idx === 1 ? 1046.5 : 987.77; // C6 / B5
        gain.gain.setValueAtTime(0.06, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.1);
      });
    } catch {
      // Suppress audio context restrictions
    }
  }

  /**
   * Còi báo động ngừng tuần hoàn / Báo động đỏ (Code Blue)
   */
  public playCodeBlueAlarm(): void {
    this.playEmergencyAlarm();
  }
}

export const hospitalAudio = new HospitalAudioEngine();
