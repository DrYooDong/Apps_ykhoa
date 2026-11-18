/**
 * CliniPortal Screen Locker & Clinical Auth Controller (screen-locker.ts)
 * Path: src/components/screen-locker.ts
 * Phiên bản: 4.0 (Dual-Auth Pattern 3x3 + PIN 6 Số • Shift Session 8h • Idle Auto-Lock • Brute-Force Cooldown)
 *
 * Tính năng cốt lõi:
 * 1. Xác thực song song: Mẫu hình 9 nút (Pattern 3x3) + Mã PIN 6 số (chuyển tab linh hoạt).
 * 2. Duy trì phiên ca trực 8 giờ: Mở khóa 1 lần, F5/chuyển trang không bị khóa lại.
 * 3. Tự động khóa khi treo máy (Idle Auto-Lock: 5 / 15 / 30 phút / Tắt) + Khóa nhanh Alt+L + Nút Header.
 * 4. Chống dò mã (Brute-Force Protection): Tạm khóa 30 giây sau 5 lần nhập sai liên tiếp (lưu bền qua F5).
 * 5. Đổi mật khẩu 3 bước cho cả Pattern 3x3 và PIN 6 số. Tuyệt đối không gợi ý để lộ mật khẩu.
 */

export type AuthMethod = 'pattern' | 'pin';
export type IdleLockMinutes = 0 | 5 | 15 | 30;

const STORAGE_KEY_LOCKED = 'cliniportal_screen_locked';
const STORAGE_KEY_PATTERN = 'cliniportal_lock_pattern';
const STORAGE_KEY_PIN = 'cliniportal_lock_pin';
const STORAGE_KEY_AUTH_METHOD = 'cliniportal_auth_method';
const STORAGE_KEY_SESSION_UNTIL = 'cliniportal_auth_session_until';
const STORAGE_KEY_IDLE_MINUTES = 'cliniportal_idle_lock_minutes';
const STORAGE_KEY_LAST_ACTIVITY = 'cliniportal_last_activity_ts';
const STORAGE_KEY_FAILED_ATTEMPTS = 'cliniportal_auth_failed_attempts';
const STORAGE_KEY_COOLDOWN_UNTIL = 'cliniportal_auth_cooldown_until';

const DEFAULT_PATTERN = '1-2-3-5-7-8-9';
const DEFAULT_PATTERN_REVERSE = '9-8-7-5-3-2-1';
const DEFAULT_PIN = '123456';
const DEFAULT_IDLE_MINUTES: IdleLockMinutes = 15;
const SHIFT_SESSION_MS = 8 * 60 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;
const COOLDOWN_DURATION_MS = 30 * 1000;

const INTERMEDIATE_MAP: Record<string, number> = {
  '1-3': 2, '3-1': 2,
  '4-6': 5, '6-4': 5,
  '7-9': 8, '9-7': 8,
  '1-7': 4, '7-1': 4,
  '2-8': 5, '8-2': 5,
  '3-9': 6, '9-3': 6,
  '1-9': 5, '9-1': 5,
  '3-7': 5, '7-3': 5
};

function safeStorageGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function safeStorageRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage access errors in restricted modes
  }
}

/**
 * Widget Mẫu Hình 9 Nút (3x3 Pattern Lock)
 */
export class PatternLockWidget {
  private container: HTMLElement;
  private size: number;
  private onComplete: (pattern: number[], patternStr: string) => void;
  private onChange?: (pattern: number[]) => void;

  private wrapperEl: HTMLElement | null = null;
  private svgEl: SVGSVGElement | null = null;
  private linesGroup: SVGGElement | null = null;
  private trackerLine: SVGLineElement | null = null;
  private nodeEls: HTMLElement[] = [];

  private pattern: number[] = [];
  private isDrawing: boolean = false;
  private isBusy: boolean = false;
  private isDisabled: boolean = false;

  constructor(options: {
    container: HTMLElement;
    size?: number;
    onComplete: (pattern: number[], patternStr: string) => void;
    onChange?: (pattern: number[]) => void;
  }) {
    this.container = options.container;
    this.size = options.size || 248;
    this.onComplete = options.onComplete;
    this.onChange = options.onChange;

    this.mount();
    this.bindEvents();
  }

  private mount(): void {
    this.container.innerHTML = `
      <div class="pattern-lock-wrapper">
        <svg class="pattern-lock-svg" viewBox="0 0 ${this.size} ${this.size}" preserveAspectRatio="none">
          <g class="pattern-lines-group"></g>
          <line class="pattern-tracker-line" x1="0" y1="0" x2="0" y2="0" style="display: none;"></line>
        </svg>
        <div class="pattern-nodes-grid" role="group" aria-label="Lưới 9 nút mở khóa">
          ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => `
            <button type="button" class="pattern-node" data-index="${i}" aria-label="Nút ${i}">
              <span class="pattern-ring"></span>
              <span class="pattern-dot"></span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    this.wrapperEl = this.container.querySelector('.pattern-lock-wrapper');
    this.svgEl = this.container.querySelector('.pattern-lock-svg');
    this.linesGroup = this.container.querySelector('.pattern-lines-group');
    this.trackerLine = this.container.querySelector('.pattern-tracker-line');
    this.nodeEls = Array.from(this.container.querySelectorAll('.pattern-node'));
  }

  private bindEvents(): void {
    if (!this.wrapperEl) return;

    this.wrapperEl.addEventListener('pointerdown', this.handlePointerDown);
    this.wrapperEl.addEventListener('pointermove', this.handlePointerMove);
    this.wrapperEl.addEventListener('pointerup', this.handlePointerUp);
    this.wrapperEl.addEventListener('pointercancel', this.handlePointerUp);
  }

  private handlePointerDown = (e: PointerEvent): void => {
    if (this.isBusy || this.isDisabled) return;
    e.preventDefault();
    try {
      this.wrapperEl?.setPointerCapture(e.pointerId);
    } catch {
      // Ignore capture errors
    }

    this.isDrawing = true;
    this.clear();

    const hit = this.checkHit(e.clientX, e.clientY);
    if (hit !== null) {
      this.addNode(hit);
    }
  };

  private handlePointerMove = (e: PointerEvent): void => {
    if (!this.isDrawing || this.isBusy || this.isDisabled) return;
    e.preventDefault();

    const hit = this.checkHit(e.clientX, e.clientY);
    if (hit !== null) {
      this.addNode(hit);
    }

    this.updateTracker(e.clientX, e.clientY);
  };

  private handlePointerUp = (e: PointerEvent): void => {
    if (!this.isDrawing) return;
    this.isDrawing = false;

    if (this.trackerLine) {
      this.trackerLine.style.display = 'none';
    }

    try {
      this.wrapperEl?.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore release errors
    }

    if (this.pattern.length === 1) {
      // Bỏ qua chạm đơn vô ý để không tính là lần nhập sai
      this.clear();
      return;
    }

    if (this.pattern.length > 1) {
      this.onComplete([...this.pattern], this.pattern.join('-'));
    }
  };

  private checkHit(clientX: number, clientY: number): number | null {
    for (let i = 0; i < this.nodeEls.length; i++) {
      const node = this.nodeEls[i];
      const idx = i + 1;
      if (this.pattern.includes(idx)) continue;

      const rect = node.getBoundingClientRect();
      if (rect.width === 0) continue;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(clientX - cx, clientY - cy);
      const hitRadius = Math.max(rect.width * 0.45, 24);

      if (dist <= hitRadius) {
        return idx;
      }
    }
    return null;
  }

  public addNode(idx: number): void {
    if (this.isDisabled || this.isBusy || this.pattern.includes(idx)) return;

    if (this.pattern.length > 0) {
      const prev = this.pattern[this.pattern.length - 1];
      const mid = INTERMEDIATE_MAP[`${prev}-${idx}`];

      if (mid && !this.pattern.includes(mid)) {
        this.pattern.push(mid);
        this.activateNode(mid);
        this.drawLine(prev, mid);

        this.pattern.push(idx);
        this.activateNode(idx);
        this.drawLine(mid, idx);
        this.triggerHaptic();
        this.onChange?.([...this.pattern]);
        return;
      }

      this.drawLine(prev, idx);
    }

    this.pattern.push(idx);
    this.activateNode(idx);
    this.triggerHaptic();
    this.onChange?.([...this.pattern]);
  }

  private activateNode(idx: number): void {
    this.nodeEls[idx - 1]?.classList.add('active');
  }

  private getNodeCenter(idx: number): { x: number; y: number } {
    const node = this.nodeEls[idx - 1];
    if (!node || !this.svgEl) return { x: 0, y: 0 };

    const nodeRect = node.getBoundingClientRect();
    const svgRect = this.svgEl.getBoundingClientRect();
    const scaleX = this.size / (svgRect.width || this.size);
    const scaleY = this.size / (svgRect.height || this.size);

    return {
      x: (nodeRect.left + nodeRect.width / 2 - svgRect.left) * scaleX,
      y: (nodeRect.top + nodeRect.height / 2 - svgRect.top) * scaleY
    };
  }

  private drawLine(fromIdx: number, toIdx: number): void {
    if (!this.linesGroup) return;

    const p1 = this.getNodeCenter(fromIdx);
    const p2 = this.getNodeCenter(toIdx);

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', String(p1.x));
    line.setAttribute('y1', String(p1.y));
    line.setAttribute('x2', String(p2.x));
    line.setAttribute('y2', String(p2.y));
    line.setAttribute('class', 'pattern-line');

    this.linesGroup.appendChild(line);
  }

  private updateTracker(clientX: number, clientY: number): void {
    if (!this.trackerLine || !this.svgEl || this.pattern.length === 0) return;

    const lastIdx = this.pattern[this.pattern.length - 1];
    const lastCenter = this.getNodeCenter(lastIdx);
    const svgRect = this.svgEl.getBoundingClientRect();
    const scaleX = this.size / (svgRect.width || this.size);
    const scaleY = this.size / (svgRect.height || this.size);

    const curX = (clientX - svgRect.left) * scaleX;
    const curY = (clientY - svgRect.top) * scaleY;

    this.trackerLine.setAttribute('x1', String(lastCenter.x));
    this.trackerLine.setAttribute('y1', String(lastCenter.y));
    this.trackerLine.setAttribute('x2', String(curX));
    this.trackerLine.setAttribute('y2', String(curY));
    this.trackerLine.style.display = 'block';
  }

  private triggerHaptic(pattern: number | number[] = 16): void {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Ignore vibrate failure
      }
    }
  }

  public showError(): void {
    this.isBusy = true;
    if (this.trackerLine) this.trackerLine.style.display = 'none';

    this.wrapperEl?.classList.add('error');
    this.nodeEls.forEach((n) => {
      if (n.classList.contains('active')) n.classList.add('error');
    });
    this.linesGroup?.querySelectorAll('.pattern-line').forEach((l) => l.classList.add('error'));
    this.triggerHaptic([65, 35, 65]);

    window.setTimeout(() => {
      this.clear();
      this.isBusy = false;
    }, 620);
  }

  public showSuccess(): void {
    this.isBusy = true;
    if (this.trackerLine) this.trackerLine.style.display = 'none';

    this.wrapperEl?.classList.add('success');
    this.nodeEls.forEach((n) => {
      if (n.classList.contains('active')) n.classList.add('success');
    });
    this.linesGroup?.querySelectorAll('.pattern-line').forEach((l) => l.classList.add('success'));
    this.triggerHaptic([20, 25, 40]);

    window.setTimeout(() => {
      this.isBusy = false;
    }, 380);
  }

  public clear(): void {
    this.pattern = [];
    if (this.linesGroup) this.linesGroup.innerHTML = '';
    if (this.trackerLine) this.trackerLine.style.display = 'none';
    this.wrapperEl?.classList.remove('error', 'success');
    this.nodeEls.forEach((n) => n.classList.remove('active', 'error', 'success'));
    this.onChange?.([]);
  }

  public setDisabled(disabled: boolean): void {
    this.isDisabled = disabled;
    if (disabled) {
      this.isDrawing = false;
      this.clear();
    }
  }

  public addNodeByKey(idx: number): void {
    if (idx >= 1 && idx <= 9) {
      this.addNode(idx);
    }
  }

  public removeLastNode(): void {
    if (this.pattern.length === 0 || this.isBusy || this.isDisabled) return;
    this.pattern.pop();
    const activeList = [...this.pattern];
    this.clear();
    activeList.forEach((idx) => this.addNode(idx));
  }

  public getPattern(): number[] {
    return [...this.pattern];
  }

  public destroy(): void {
    if (this.wrapperEl) {
      this.wrapperEl.removeEventListener('pointerdown', this.handlePointerDown);
      this.wrapperEl.removeEventListener('pointermove', this.handlePointerMove);
      this.wrapperEl.removeEventListener('pointerup', this.handlePointerUp);
      this.wrapperEl.removeEventListener('pointercancel', this.handlePointerUp);
    }
  }
}

/**
 * Widget Mã PIN 6 Số Công Thái Học (6-Digit PIN & Ergonomic Numpad)
 */
export class PinLockWidget {
  private container: HTMLElement;
  private onComplete: (pin: string) => void;
  private onChange?: (pin: string) => void;

  private slots: HTMLElement[] = [];
  private keyBtns: HTMLButtonElement[] = [];
  private eyeBtn: HTMLButtonElement | null = null;
  private eyeIcon: HTMLElement | null = null;

  private pin: string = '';
  private isRevealed: boolean = false;
  private isBusy: boolean = false;
  private isDisabled: boolean = false;

  constructor(options: {
    container: HTMLElement;
    onComplete: (pin: string) => void;
    onChange?: (pin: string) => void;
  }) {
    this.container = options.container;
    this.onComplete = options.onComplete;
    this.onChange = options.onChange;

    this.mount();
    this.bindEvents();
  }

  private mount(): void {
    this.container.innerHTML = `
      <div class="pin-widget-root">
        <div class="pin-display-row">
          <div class="pin-dots-track" aria-label="Tiến trình nhập mã PIN 6 số">
            ${[0, 1, 2, 3, 4, 5].map((i) => `<span class="pin-slot" data-slot="${i}"></span>`).join('')}
          </div>
          <button type="button" class="pin-eye-btn" title="Hiện hoặc ẩn mã PIN" aria-label="Hiện hoặc ẩn mã PIN">
            <i class="fa-solid fa-eye"></i>
          </button>
        </div>

        <div class="pin-numpad-grid" aria-label="Bàn phím số mở khóa">
          <button type="button" class="pin-key" data-digit="1" aria-label="Số 1">1</button>
          <button type="button" class="pin-key" data-digit="2" aria-label="Số 2">2</button>
          <button type="button" class="pin-key" data-digit="3" aria-label="Số 3">3</button>
          <button type="button" class="pin-key" data-digit="4" aria-label="Số 4">4</button>
          <button type="button" class="pin-key" data-digit="5" aria-label="Số 5">5</button>
          <button type="button" class="pin-key" data-digit="6" aria-label="Số 6">6</button>
          <button type="button" class="pin-key" data-digit="7" aria-label="Số 7">7</button>
          <button type="button" class="pin-key" data-digit="8" aria-label="Số 8">8</button>
          <button type="button" class="pin-key" data-digit="9" aria-label="Số 9">9</button>
          <button type="button" class="pin-key pin-key-fn" data-action="clear" title="Xóa hết" aria-label="Xóa toàn bộ mã PIN">
            <i class="fa-solid fa-rotate-left"></i>
          </button>
          <button type="button" class="pin-key" data-digit="0" aria-label="Số 0">0</button>
          <button type="button" class="pin-key pin-key-fn" data-action="backspace" title="Xóa lùi" aria-label="Xóa một chữ số">
            <i class="fa-solid fa-delete-left"></i>
          </button>
        </div>
      </div>
    `;

    this.slots = Array.from(this.container.querySelectorAll('.pin-slot'));
    this.keyBtns = Array.from(this.container.querySelectorAll('.pin-key'));
    this.eyeBtn = this.container.querySelector('.pin-eye-btn');
    this.eyeIcon = this.container.querySelector('.pin-eye-btn i');
  }

  private bindEvents(): void {
    this.keyBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (this.isBusy || this.isDisabled) return;
        const digit = btn.getAttribute('data-digit');
        const action = btn.getAttribute('data-action');

        if (digit !== null) {
          this.appendDigit(digit);
        } else if (action === 'backspace') {
          this.backspace();
        } else if (action === 'clear') {
          this.clear();
        }
      });
    });

    this.eyeBtn?.addEventListener('click', () => {
      this.toggleVisibility();
    });
  }

  private renderSlots(): void {
    this.slots.forEach((slot, idx) => {
      const char = this.pin[idx] || '';
      slot.classList.toggle('filled', char !== '');
      slot.classList.toggle('revealed', this.isRevealed);
      slot.textContent = this.isRevealed ? char : '';
    });
  }

  private triggerHaptic(pattern: number | number[] = 14): void {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Ignore vibrate failure
      }
    }
  }

  public toggleVisibility(): void {
    this.isRevealed = !this.isRevealed;
    if (this.eyeIcon) {
      this.eyeIcon.className = this.isRevealed ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
    }
    this.renderSlots();
  }

  public appendDigit(digit: string): void {
    if (this.isBusy || this.isDisabled || !/^\d$/.test(digit) || this.pin.length >= 6) return;
    this.pin += digit;
    this.triggerHaptic(14);
    this.renderSlots();
    this.onChange?.(this.pin);

    if (this.pin.length === 6) {
      this.isBusy = true;
      const submitted = this.pin;
      window.setTimeout(() => {
        this.isBusy = false;
        this.onComplete(submitted);
      }, 85);
    }
  }

  public setValue(digits: string): void {
    if (this.isBusy || this.isDisabled) return;
    const clean = digits.replace(/\D/g, '').slice(0, 6);
    if (!clean) return;
    this.pin = clean;
    this.renderSlots();
    this.onChange?.(this.pin);

    if (this.pin.length === 6) {
      this.isBusy = true;
      const submitted = this.pin;
      window.setTimeout(() => {
        this.isBusy = false;
        this.onComplete(submitted);
      }, 85);
    }
  }

  public backspace(): void {
    if (this.isBusy || this.isDisabled || this.pin.length === 0) return;
    this.pin = this.pin.slice(0, -1);
    this.triggerHaptic(10);
    this.renderSlots();
    this.onChange?.(this.pin);
  }

  public submit(): void {
    if (this.isBusy || this.isDisabled || this.pin.length === 0) return;
    this.onComplete(this.pin);
  }

  public showError(): void {
    this.isBusy = true;
    this.slots.forEach((s) => s.classList.add('error'));
    this.triggerHaptic([65, 35, 65]);

    window.setTimeout(() => {
      this.clear();
      this.isBusy = false;
    }, 620);
  }

  public showSuccess(): void {
    this.isBusy = true;
    this.slots.forEach((s) => s.classList.add('success'));
    this.triggerHaptic([20, 25, 40]);

    window.setTimeout(() => {
      this.isBusy = false;
    }, 380);
  }

  public clear(): void {
    this.pin = '';
    this.slots.forEach((s) => s.classList.remove('filled', 'error', 'success'));
    this.renderSlots();
    this.onChange?.('');
  }

  public setDisabled(disabled: boolean): void {
    this.isDisabled = disabled;
    this.keyBtns.forEach((btn) => {
      btn.disabled = disabled;
    });
    if (disabled) {
      this.clear();
    }
  }

  public getPin(): string {
    return this.pin;
  }
}

/**
 * Controller Quản Lý Màn Hình Khóa & Phiên Trực Lâm Sàng (v4.0)
 */
export class ScreenLockerController {
  private static instance: ScreenLockerController;

  private isLocked: boolean = false;
  private isChangeModalOpen: boolean = false;
  private openedChangeFromUnlocked: boolean = false;

  private currentAuthMethod: AuthMethod = 'pattern';
  private changeTargetMethod: AuthMethod = 'pattern';
  private changeStep: 1 | 2 | 3 = 1;
  private tempNewCode: string = '';

  private clockInterval: number | null = null;
  private idleCheckInterval: number | null = null;
  private cooldownInterval: number | null = null;
  private lastActivityWriteTs: number = 0;

  private mainPatternWidget: PatternLockWidget | null = null;
  private mainPinWidget: PinLockWidget | null = null;
  private modalPatternWidget: PatternLockWidget | null = null;
  private modalPinWidget: PinLockWidget | null = null;

  private constructor() {}

  public static getInstance(): ScreenLockerController {
    if (!ScreenLockerController.instance) {
      ScreenLockerController.instance = new ScreenLockerController();
    }
    return ScreenLockerController.instance;
  }

  public getStoredPattern(): string {
    return safeStorageGet(STORAGE_KEY_PATTERN) || DEFAULT_PATTERN;
  }

  public setStoredPattern(newPattern: string): boolean {
    if (!newPattern || newPattern.split('-').length < 4) return false;
    return safeStorageSet(STORAGE_KEY_PATTERN, newPattern);
  }

  public getStoredPin(): string {
    const val = safeStorageGet(STORAGE_KEY_PIN);
    return val && /^\d{6}$/.test(val) ? val : DEFAULT_PIN;
  }

  public setStoredPin(newPin: string): boolean {
    if (!/^\d{6}$/.test(newPin)) return false;
    return safeStorageSet(STORAGE_KEY_PIN, newPin);
  }

  // Backward-compatible aliases
  public getPin(): string {
    return this.getStoredPin();
  }

  public setPin(newPin: string): boolean {
    return this.setStoredPin(newPin);
  }

  public isScreenLocked(): boolean {
    return this.isLocked;
  }

  public getAuthMethod(): AuthMethod {
    const saved = safeStorageGet(STORAGE_KEY_AUTH_METHOD);
    return saved === 'pin' ? 'pin' : 'pattern';
  }

  public setAuthMethod(method: AuthMethod): void {
    this.currentAuthMethod = method;
    safeStorageSet(STORAGE_KEY_AUTH_METHOD, method);
    this.syncMainAuthTabsUI();
  }

  public getIdleTimeoutMinutes(): IdleLockMinutes {
    const raw = safeStorageGet(STORAGE_KEY_IDLE_MINUTES);
    if (raw === '0' || raw === '5' || raw === '15' || raw === '30') {
      return Number(raw) as IdleLockMinutes;
    }
    return DEFAULT_IDLE_MINUTES;
  }

  public setIdleTimeoutMinutes(minutes: number): void {
    const valid: IdleLockMinutes = minutes === 0 || minutes === 5 || minutes === 30 ? minutes : 15;
    safeStorageSet(STORAGE_KEY_IDLE_MINUTES, String(valid));
    this.updateIdleBadgeUI();
    this.recordActivity(true);
    this.startIdleChecker();
    window.dispatchEvent(new CustomEvent('cliniportal-security-change', { detail: { idleMinutes: valid } }));
  }

  public isPatternValid(patternStr: string): boolean {
    const stored = this.getStoredPattern();
    if (patternStr === stored) return true;
    if (stored === DEFAULT_PATTERN && patternStr === DEFAULT_PATTERN_REVERSE) return true;
    return false;
  }

  public isPinValid(pinStr: string): boolean {
    return pinStr === this.getStoredPin();
  }

  private getFailedAttempts(): number {
    const n = Number(safeStorageGet(STORAGE_KEY_FAILED_ATTEMPTS) || '0');
    return Number.isFinite(n) && n > 0 ? n : 0;
  }

  private setFailedAttempts(count: number): void {
    safeStorageSet(STORAGE_KEY_FAILED_ATTEMPTS, String(Math.max(0, count)));
  }

  private getCooldownRemainingSeconds(): number {
    const until = Number(safeStorageGet(STORAGE_KEY_COOLDOWN_UNTIL) || '0');
    if (!Number.isFinite(until) || until <= Date.now()) return 0;
    return Math.ceil((until - Date.now()) / 1000);
  }

  private isInCooldown(): boolean {
    return this.getCooldownRemainingSeconds() > 0;
  }

  private hasValidShiftSession(): boolean {
    const explicitLocked = safeStorageGet(STORAGE_KEY_LOCKED) === 'true';
    if (explicitLocked) return false;

    if (this.isInCooldown()) return false;

    const sessionUntil = Number(safeStorageGet(STORAGE_KEY_SESSION_UNTIL) || '0');
    if (!Number.isFinite(sessionUntil) || sessionUntil <= Date.now()) return false;

    const idleMs = this.getIdleTimeoutMinutes() * 60 * 1000;
    if (idleMs > 0) {
      const lastActivity = Number(safeStorageGet(STORAGE_KEY_LAST_ACTIVITY) || '0');
      if (lastActivity > 0 && Date.now() - lastActivity >= idleMs) {
        return false;
      }
    }

    return true;
  }

  public init(): void {
    this.currentAuthMethod = this.getAuthMethod();
    this.ensureLockerHtml();
    this.initWidgets();
    this.syncMainAuthTabsUI();
    this.syncThemeButtonUI();
    this.updateIdleBadgeUI();
    this.attachHeaderButton();
    this.bindEvents();
    this.startClock();
    this.bindActivityMonitor();
    this.bindStorageSync();

    if (this.hasValidShiftSession()) {
      this.isLocked = false;
      this.recordActivity(true);
      this.startIdleChecker();
    } else {
      const idleMs = this.getIdleTimeoutMinutes() * 60 * 1000;
      const lastActivity = Number(safeStorageGet(STORAGE_KEY_LAST_ACTIVITY) || '0');
      const wasUnlockedBefore = safeStorageGet(STORAGE_KEY_LOCKED) === 'false';
      const timedOutByIdle =
        wasUnlockedBefore && idleMs > 0 && lastActivity > 0 && Date.now() - lastActivity >= idleMs;

      this.lock(timedOutByIdle ? 'Phiên tự động khóa sau thời gian không thao tác' : undefined);
    }
  }

  private ensureLockerHtml(): void {
    if (document.getElementById('cliniScreenLocker')) return;

    const lockerHtml = `
      <div class="clini-screen-locker" id="cliniScreenLocker" role="dialog" aria-modal="true" aria-labelledby="lockerTitle">
        <div class="locker-backdrop-mesh" aria-hidden="true"></div>
        <div class="locker-card" id="lockerCard">
          <div class="locker-card-glow-bar" aria-hidden="true"></div>

          <!-- 1. Compact Top Status Bar -->
          <div class="locker-top-bar">
            <div class="locker-brand-group">
              <div class="locker-icon-wrapper" id="lockerIconWrapper">
                <div class="locker-icon-pulse" aria-hidden="true"></div>
                <i class="fa-solid fa-lock" id="lockerIconMain"></i>
              </div>
              <div class="locker-brand-meta">
                <span class="locker-brand-title" id="lockerTitle">CliniPortal Lock</span>
                <span class="locker-shift-date" id="lockerClockDate">Ca trực lâm sàng</span>
              </div>
            </div>

            <div class="locker-top-right">
              <div class="locker-clock-pill" aria-label="Đồng hồ ca trực">
                <span class="locker-live-dot" aria-hidden="true"></span>
                <span class="locker-time" id="lockerClockTime">--:--:--</span>
              </div>
              <button type="button" class="locker-theme-btn" id="lockerThemeToggleBtn" title="Chuyển giao diện Sáng / Tối" aria-label="Chuyển giao diện Sáng hoặc Tối">
                <i class="fa-solid fa-moon" id="lockerThemeIcon"></i>
              </button>
            </div>
          </div>

          <!-- 2. Segmented Tab Switcher (Pattern 3x3 vs PIN 6 Số) -->
          <div class="locker-auth-tabs" role="tablist" aria-label="Chọn phương thức mở khóa">
            <button type="button" class="locker-auth-tab active" id="authTabPattern" role="tab" aria-selected="true" data-auth-mode="pattern">
              <i class="fa-solid fa-circle-nodes"></i>
              <span>Mẫu hình 9 nút</span>
            </button>
            <button type="button" class="locker-auth-tab" id="authTabPin" role="tab" aria-selected="false" data-auth-mode="pin">
              <i class="fa-solid fa-table-cells"></i>
              <span>Mã PIN 6 số</span>
            </button>
          </div>

          <!-- 3. Interactive Auth Stage -->
          <div class="locker-stage">
            <div class="locker-panel" id="lockerPatternPanel" role="tabpanel" aria-labelledby="authTabPattern">
              <p class="locker-instruction">Vẽ nối các điểm hoặc bấm phím số 1–9</p>
              <div id="mainPatternContainer" class="main-pattern-mount"></div>
            </div>

            <div class="locker-panel" id="lockerPinPanel" role="tabpanel" aria-labelledby="authTabPin" hidden>
              <p class="locker-instruction">Nhập mã PIN 6 số từ bàn phím hoặc chạm số</p>
              <div id="mainPinContainer" class="main-pin-mount"></div>
            </div>

            <div class="locker-cooldown-overlay" id="lockerCooldownOverlay" hidden aria-live="assertive">
              <div class="cooldown-ring">
                <i class="fa-solid fa-hourglass-half"></i>
              </div>
              <div class="cooldown-title">Tạm khóa bảo mật</div>
              <div class="cooldown-desc">Nhập sai 5 lần liên tiếp. Vui lòng thử lại sau:</div>
              <div class="cooldown-timer" id="lockerCooldownSeconds">30s</div>
            </div>
          </div>

          <!-- 4. Feedback Strip -->
          <div class="locker-feedback-msg" id="lockerFeedbackMsg" role="status" aria-live="polite"></div>

          <!-- 5. Compact Utility Footer -->
          <div class="locker-footer">
            <div class="locker-idle-badge" id="lockerIdleBadge" title="Tùy chỉnh thời gian tự khóa trong phần Cài đặt">
              <i class="fa-solid fa-clock"></i>
              <span id="lockerIdleBadgeText">Tự khóa: 15p • Phiên 8h</span>
            </div>
            <div class="locker-footer-actions">
              <button type="button" class="locker-link-btn" id="mainClearAuthBtn" title="Xóa thao tác đang nhập">
                <i class="fa-solid fa-rotate-left"></i>
                <span>Nhập lại</span>
              </button>
              <button type="button" class="locker-link-btn locker-link-primary" id="lockerOpenChangeCodeBtn">
                <i class="fa-solid fa-key"></i>
                <span>Đổi mã</span>
              </button>
            </div>
          </div>

          <!-- Modal Đổi Mã Bảo Mật 3 Bước (Pattern 3x3 & PIN 6 Số) -->
          <div class="locker-change-modal" id="lockerChangePatternModal" role="dialog" aria-modal="true" aria-labelledby="changePatternTitle">
            <div class="change-modal-top">
              <h3 class="change-modal-heading" id="changePatternTitle">
                <i class="fa-solid fa-shield-halved"></i>
                <span>Đổi Mã Bảo Mật</span>
              </h3>
              <button type="button" class="change-modal-close" id="closeChangeModalTopBtn" aria-label="Đóng">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div class="change-target-tabs" role="tablist" aria-label="Chọn loại mã muốn đổi">
              <button type="button" class="change-target-tab active" id="changeTargetPatternTab" data-target="pattern">Mẫu hình 9 nút</button>
              <button type="button" class="change-target-tab" id="changeTargetPinTab" data-target="pin">Mã PIN 6 số</button>
            </div>

            <div class="change-pattern-steps">
              <span class="change-step-pill active" id="stepPill1">1. Hiện tại</span>
              <span class="change-step-pill" id="stepPill2">2. Mã mới</span>
              <span class="change-step-pill" id="stepPill3">3. Xác nhận</span>
            </div>

            <div class="change-pattern-guide" id="changePatternGuide">
              Vẽ mẫu hình hiện tại để xác thực
            </div>

            <div class="modal-auth-stage">
              <div class="modal-pattern-container" id="modalPatternStage">
                <div id="modalPatternContainer" class="modal-pattern-mount"></div>
              </div>
              <div class="modal-pin-container" id="modalPinStage" hidden>
                <div id="modalPinContainer" class="modal-pin-mount"></div>
              </div>
            </div>

            <div class="locker-feedback-msg" id="changePatternMsg" role="status" aria-live="polite"></div>

            <div class="change-pattern-actions">
              <button type="button" class="change-btn-cancel" id="cancelChangePatternBtn">
                <i class="fa-solid fa-xmark"></i> Hủy
              </button>
              <button type="button" class="change-btn-retry" id="modalClearPatternBtn">
                <i class="fa-solid fa-rotate-left"></i> Nhập lại
              </button>
            </div>

            <button type="button" class="change-pattern-reset-link" id="modalResetDefaultPatternBtn" hidden>
              Đặt lại về mã mặc định
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', lockerHtml);
  }

  private initWidgets(): void {
    const mainPatternContainer = document.getElementById('mainPatternContainer');
    if (mainPatternContainer) {
      const size = window.innerWidth <= 375 ? 214 : (window.innerWidth <= 420 ? 232 : 248);
      this.mainPatternWidget = new PatternLockWidget({
        container: mainPatternContainer,
        size,
        onComplete: (pattern, patternStr) => {
          this.verifyMainPattern(pattern, patternStr);
        }
      });
    }

    const mainPinContainer = document.getElementById('mainPinContainer');
    if (mainPinContainer) {
      this.mainPinWidget = new PinLockWidget({
        container: mainPinContainer,
        onComplete: (pin) => {
          this.verifyMainPin(pin);
        }
      });
    }

    const modalPatternContainer = document.getElementById('modalPatternContainer');
    if (modalPatternContainer) {
      const modalSize = window.innerWidth <= 375 ? 180 : 196;
      this.modalPatternWidget = new PatternLockWidget({
        container: modalPatternContainer,
        size: modalSize,
        onComplete: (pattern, patternStr) => {
          this.handleModalCodeComplete(patternStr, pattern.length);
        }
      });
    }

    const modalPinContainer = document.getElementById('modalPinContainer');
    if (modalPinContainer) {
      this.modalPinWidget = new PinLockWidget({
        container: modalPinContainer,
        onComplete: (pin) => {
          this.handleModalCodeComplete(pin, pin.length);
        }
      });
    }
  }

  private syncMainAuthTabsUI(): void {
    const tabPattern = document.getElementById('authTabPattern');
    const tabPin = document.getElementById('authTabPin');
    const panelPattern = document.getElementById('lockerPatternPanel');
    const panelPin = document.getElementById('lockerPinPanel');

    const isPattern = this.currentAuthMethod === 'pattern';
    tabPattern?.classList.toggle('active', isPattern);
    tabPattern?.setAttribute('aria-selected', String(isPattern));
    tabPin?.classList.toggle('active', !isPattern);
    tabPin?.setAttribute('aria-selected', String(!isPattern));

    if (panelPattern) panelPattern.hidden = !isPattern;
    if (panelPin) panelPin.hidden = isPattern;
  }

  private syncThemeButtonUI(): void {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const icon = document.getElementById('lockerThemeIcon');
    if (icon) {
      icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }

  private updateIdleBadgeUI(): void {
    const el = document.getElementById('lockerIdleBadgeText');
    if (!el) return;
    const mins = this.getIdleTimeoutMinutes();
    el.textContent = mins > 0 ? `Tự khóa: ${mins}p • Phiên 8h` : 'Tự khóa: Tắt • Phiên 8h';
  }

  private attachHeaderButton(): void {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement | null;
      const lockBtn = target?.closest('#headerLockBtn, .trigger-screen-lock, [data-action="lock-screen"]');
      if (lockBtn) {
        e.preventDefault();
        this.lock('Đã khóa trạm làm việc lâm sàng');
      }
    });
  }

  private bindEvents(): void {
    // 1. Chuyển tab Pattern / PIN trên màn hình khóa chính
    document.getElementById('authTabPattern')?.addEventListener('click', () => {
      this.setAuthMethod('pattern');
      this.mainPinWidget?.clear();
      if (!this.isInCooldown()) this.showMessage('', 'neutral');
    });

    document.getElementById('authTabPin')?.addEventListener('click', () => {
      this.setAuthMethod('pin');
      this.mainPatternWidget?.clear();
      if (!this.isInCooldown()) this.showMessage('', 'neutral');
    });

    // 2. Toggle Sáng / Tối trực tiếp trên Lock Card
    document.getElementById('lockerThemeToggleBtn')?.addEventListener('click', () => {
      const themeApi = (window as unknown as { CliniPortalTheme?: { toggleTheme?: () => void } }).CliniPortalTheme;
      if (themeApi?.toggleTheme) {
        themeApi.toggleTheme();
      } else {
        const cur = document.documentElement.getAttribute('data-theme') || 'light';
        const next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        safeStorageSet('cliniportal_theme', next);
      }
      this.syncThemeButtonUI();
    });

    window.addEventListener('cliniportal-theme-change', () => {
      this.syncThemeButtonUI();
    });

    // 3. Nút nhập lại
    document.getElementById('mainClearAuthBtn')?.addEventListener('click', () => {
      if (this.isInCooldown()) return;
      this.mainPatternWidget?.clear();
      this.mainPinWidget?.clear();
      this.showMessage('', 'neutral');
    });

    // 4. Mở / Đóng Modal Đổi Mã
    document.getElementById('lockerOpenChangeCodeBtn')?.addEventListener('click', () => {
      if (this.isInCooldown()) return;
      this.openChangeCredentialsModal(false);
    });

    document.getElementById('cancelChangePatternBtn')?.addEventListener('click', () => {
      this.closeChangeCredentialsModal();
    });

    document.getElementById('closeChangeModalTopBtn')?.addEventListener('click', () => {
      this.closeChangeCredentialsModal();
    });

    document.getElementById('modalClearPatternBtn')?.addEventListener('click', () => {
      this.modalPatternWidget?.clear();
      this.modalPinWidget?.clear();
      this.setModalMessage('', 'neutral');
    });

    // 5. Chọn loại mã cần đổi trong Modal (chỉ ở Bước 1)
    document.getElementById('changeTargetPatternTab')?.addEventListener('click', () => {
      if (this.changeStep !== 1) return;
      this.changeTargetMethod = 'pattern';
      this.updateChangeModalUI();
    });

    document.getElementById('changeTargetPinTab')?.addEventListener('click', () => {
      if (this.changeStep !== 1) return;
      this.changeTargetMethod = 'pin';
      this.updateChangeModalUI();
    });

    // 6. Đặt lại mặc định (chỉ khả dụng khi đã xác thực Bước 1 hoặc mở từ phiên đã đăng nhập)
    document.getElementById('modalResetDefaultPatternBtn')?.addEventListener('click', () => {
      if (this.changeStep < 2 && !this.openedChangeFromUnlocked) return;
      const label = this.changeTargetMethod === 'pattern' ? 'Mẫu hình 9 nút' : 'Mã PIN 6 số';
      if (!window.confirm(`Bạn có chắc muốn đặt lại ${label} về mặc định không?`)) return;

      if (this.changeTargetMethod === 'pattern') {
        this.setStoredPattern(DEFAULT_PATTERN);
      } else {
        this.setStoredPin(DEFAULT_PIN);
      }

      this.setModalMessage(`✅ Đã đặt lại ${label} về mặc định thành công!`, 'success');
      window.setTimeout(() => {
        const wasFromUnlocked = this.openedChangeFromUnlocked;
        this.closeChangeCredentialsModal();
        if (!wasFromUnlocked) {
          this.showMessage(`Đã đặt lại ${label} về mặc định.`, 'neutral');
        }
      }, 850);
    });

    // 7. Paste PIN từ clipboard vào màn hình khóa
    document.getElementById('cliniScreenLocker')?.addEventListener('paste', (e: ClipboardEvent) => {
      if (!this.isLocked && !this.isChangeModalOpen) return;
      if (this.isInCooldown()) return;

      const activeMethod = this.isChangeModalOpen ? this.changeTargetMethod : this.currentAuthMethod;
      if (activeMethod !== 'pin') return;

      const text = e.clipboardData?.getData('text') || '';
      const digits = text.replace(/\D/g, '').slice(0, 6);
      if (digits) {
        e.preventDefault();
        if (this.isChangeModalOpen) {
          this.modalPinWidget?.setValue(digits);
        } else {
          this.mainPinWidget?.setValue(digits);
        }
      }
    });

    // 8. Phím tắt toàn cục: Alt+L (Khóa nhanh) & Điều khiển bàn phím khi đang khóa
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      // Phím tắt Alt + L để khóa nhanh khi đang ở trong phiên làm việc
      if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey && e.key.toLowerCase() === 'l') {
        if (!this.isLocked && !this.isChangeModalOpen) {
          e.preventDefault();
          this.lock('Đã khóa nhanh bằng phím tắt Alt+L');
        }
        return;
      }

      if (!this.isLocked && !this.isChangeModalOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        if (this.isChangeModalOpen) {
          this.closeChangeCredentialsModal();
        } else if (!this.isInCooldown()) {
          this.mainPatternWidget?.clear();
          this.mainPinWidget?.clear();
          this.showMessage('', 'neutral');
        }
        return;
      }

      if (this.isInCooldown()) return;

      const activeMethod = this.isChangeModalOpen ? this.changeTargetMethod : this.currentAuthMethod;
      const patternWidget = this.isChangeModalOpen ? this.modalPatternWidget : this.mainPatternWidget;
      const pinWidget = this.isChangeModalOpen ? this.modalPinWidget : this.mainPinWidget;

      if (activeMethod === 'pattern') {
        if (/^[1-9]$/.test(e.key)) {
          e.preventDefault();
          patternWidget?.addNodeByKey(parseInt(e.key, 10));
        } else if (e.key === 'Backspace') {
          e.preventDefault();
          patternWidget?.removeLastNode();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const pat = patternWidget?.getPattern() || [];
          if (pat.length >= 2) {
            if (this.isChangeModalOpen) {
              this.handleModalCodeComplete(pat.join('-'), pat.length);
            } else {
              this.verifyMainPattern(pat, pat.join('-'));
            }
          }
        }
      } else {
        if (/^[0-9]$/.test(e.key)) {
          e.preventDefault();
          pinWidget?.appendDigit(e.key);
        } else if (e.key === 'Backspace') {
          e.preventDefault();
          pinWidget?.backspace();
        } else if (e.key === 'Enter') {
          e.preventDefault();
          pinWidget?.submit();
        }
      }
    });
  }

  private verifyMainPattern(pattern: number[], patternStr: string): void {
    if (this.isInCooldown()) return;

    if (pattern.length < 4) {
      this.mainPatternWidget?.showError();
      this.showMessage('⚠️ Cần nối ít nhất 4 điểm để mở khóa.', 'warning');
      return;
    }

    if (this.isPatternValid(patternStr)) {
      this.mainPatternWidget?.showSuccess();
      this.unlock();
    } else {
      this.mainPatternWidget?.showError();
      this.handleFailedAttempt();
    }
  }

  private verifyMainPin(pin: string): void {
    if (this.isInCooldown()) return;

    if (pin.length < 6) {
      this.mainPinWidget?.showError();
      this.showMessage('⚠️ Vui lòng nhập đủ 6 chữ số.', 'warning');
      return;
    }

    if (this.isPinValid(pin)) {
      this.mainPinWidget?.showSuccess();
      this.unlock();
    } else {
      this.mainPinWidget?.showError();
      this.handleFailedAttempt();
    }
  }

  private handleFailedAttempt(): void {
    const nextCount = this.getFailedAttempts() + 1;
    this.triggerShake();

    if (nextCount >= MAX_FAILED_ATTEMPTS) {
      this.setFailedAttempts(0);
      safeStorageSet(STORAGE_KEY_COOLDOWN_UNTIL, String(Date.now() + COOLDOWN_DURATION_MS));
      this.startCooldownCountdown();
    } else {
      this.setFailedAttempts(nextCount);
      const remaining = MAX_FAILED_ATTEMPTS - nextCount;
      this.showMessage(`❌ Mã xác thực không đúng (còn ${remaining} lần thử).`, 'error');
    }
  }

  private startCooldownCountdown(): void {
    const overlay = document.getElementById('lockerCooldownOverlay');
    const secEl = document.getElementById('lockerCooldownSeconds');

    this.mainPatternWidget?.setDisabled(true);
    this.mainPinWidget?.setDisabled(true);

    if (overlay) overlay.hidden = false;

    const updateTick = () => {
      const rem = this.getCooldownRemainingSeconds();
      if (rem <= 0) {
        if (this.cooldownInterval) {
          window.clearInterval(this.cooldownInterval);
          this.cooldownInterval = null;
        }
        safeStorageRemove(STORAGE_KEY_COOLDOWN_UNTIL);
        this.setFailedAttempts(0);
        if (overlay) overlay.hidden = true;
        this.mainPatternWidget?.setDisabled(false);
        this.mainPinWidget?.setDisabled(false);
        this.showMessage('Đã hết thời gian tạm khóa. Vui lòng thử lại.', 'neutral');
        return;
      }

      if (secEl) secEl.textContent = `${rem}s`;
      this.showMessage(`⏳ Tạm khóa bảo mật trong ${rem} giây...`, 'error');
    };

    if (this.cooldownInterval) {
      window.clearInterval(this.cooldownInterval);
    }
    updateTick();
    this.cooldownInterval = window.setInterval(updateTick, 1000);
  }

  private handleModalCodeComplete(codeStr: string, length: number): void {
    const isPattern = this.changeTargetMethod === 'pattern';
    const activeWidget = isPattern ? this.modalPatternWidget : this.modalPinWidget;

    if (this.changeStep === 1) {
      const isValid = isPattern ? this.isPatternValid(codeStr) : this.isPinValid(codeStr);

      if (isValid) {
        activeWidget?.showSuccess();
        this.setModalMessage('✅ Xác thực thành công! Hãy nhập mã mới.', 'success');

        window.setTimeout(() => {
          this.changeStep = 2;
          this.updateChangeModalUI();
          activeWidget?.clear();
          this.setModalMessage('', 'neutral');
        }, 440);
      } else {
        activeWidget?.showError();
        if (!this.openedChangeFromUnlocked) {
          const nextCount = this.getFailedAttempts() + 1;
          if (nextCount >= MAX_FAILED_ATTEMPTS) {
            this.setFailedAttempts(0);
            safeStorageSet(STORAGE_KEY_COOLDOWN_UNTIL, String(Date.now() + COOLDOWN_DURATION_MS));
            this.closeChangeCredentialsModal();
            this.startCooldownCountdown();
            return;
          }
          this.setFailedAttempts(nextCount);
          this.setModalMessage(`❌ Mã hiện tại không đúng (còn ${MAX_FAILED_ATTEMPTS - nextCount} lần thử).`, 'error');
        } else {
          this.setModalMessage('❌ Mã hiện tại không đúng. Vui lòng thử lại!', 'error');
        }
      }
      return;
    }

    if (this.changeStep === 2) {
      if (isPattern && length < 4) {
        activeWidget?.showError();
        this.setModalMessage('⚠️ Mẫu hình mới phải nối ít nhất 4 điểm.', 'warning');
        return;
      }
      if (!isPattern && length < 6) {
        activeWidget?.showError();
        this.setModalMessage('⚠️ Mã PIN phải gồm đúng 6 chữ số.', 'warning');
        return;
      }

      this.tempNewCode = codeStr;
      activeWidget?.showSuccess();
      this.setModalMessage('✅ Mã hợp lệ. Hãy nhập lại để xác nhận.', 'success');

      window.setTimeout(() => {
        this.changeStep = 3;
        this.updateChangeModalUI();
        activeWidget?.clear();
        this.setModalMessage('', 'neutral');
      }, 440);
      return;
    }

    if (this.changeStep === 3) {
      if (codeStr === this.tempNewCode) {
        activeWidget?.showSuccess();
        if (isPattern) {
          this.setStoredPattern(this.tempNewCode);
        } else {
          this.setStoredPin(this.tempNewCode);
        }

        const label = isPattern ? 'Mẫu hình 9 nút' : 'Mã PIN 6 số';
        this.setModalMessage(`🎉 Đã lưu ${label} mới thành công!`, 'success');

        window.setTimeout(() => {
          const wasFromUnlocked = this.openedChangeFromUnlocked;
          this.closeChangeCredentialsModal();
          if (!wasFromUnlocked) {
            this.setAuthMethod(this.changeTargetMethod);
            this.showMessage(`Đã cập nhật ${label} mới. Vui lòng mở khóa.`, 'success');
          }
        }, 850);
      } else {
        activeWidget?.showError();
        this.setModalMessage('❌ Mã xác nhận không khớp! Quay lại nhập mã mới...', 'error');

        window.setTimeout(() => {
          this.changeStep = 2;
          this.updateChangeModalUI();
          activeWidget?.clear();
          this.setModalMessage('', 'neutral');
        }, 800);
      }
    }
  }

  private updateChangeModalUI(): void {
    const tabPattern = document.getElementById('changeTargetPatternTab') as HTMLButtonElement | null;
    const tabPin = document.getElementById('changeTargetPinTab') as HTMLButtonElement | null;
    const patternStage = document.getElementById('modalPatternStage');
    const pinStage = document.getElementById('modalPinStage');
    const pill1 = document.getElementById('stepPill1');
    const pill2 = document.getElementById('stepPill2');
    const pill3 = document.getElementById('stepPill3');
    const guide = document.getElementById('changePatternGuide');
    const resetBtn = document.getElementById('modalResetDefaultPatternBtn');

    const isPattern = this.changeTargetMethod === 'pattern';
    if (tabPattern) {
      tabPattern.classList.toggle('active', isPattern);
      tabPattern.disabled = this.changeStep !== 1;
    }
    if (tabPin) {
      tabPin.classList.toggle('active', !isPattern);
      tabPin.disabled = this.changeStep !== 1;
    }

    if (patternStage) patternStage.hidden = !isPattern;
    if (pinStage) pinStage.hidden = isPattern;

    this.modalPatternWidget?.clear();
    this.modalPinWidget?.clear();

    if (pill1 && pill2 && pill3 && guide) {
      pill1.className = 'change-step-pill';
      pill2.className = 'change-step-pill';
      pill3.className = 'change-step-pill';

      if (this.changeStep === 1) {
        pill1.classList.add('active');
        guide.textContent = isPattern
          ? 'Vẽ mẫu hình hiện tại để xác thực'
          : 'Nhập mã PIN 6 số hiện tại để xác thực';
      } else if (this.changeStep === 2) {
        pill1.classList.add('completed');
        pill2.classList.add('active');
        guide.textContent = isPattern
          ? 'Vẽ mẫu hình mới (nối ít nhất 4 điểm)'
          : 'Nhập mã PIN mới gồm 6 chữ số';
      } else {
        pill1.classList.add('completed');
        pill2.classList.add('completed');
        pill3.classList.add('active');
        guide.textContent = isPattern
          ? 'Vẽ lại mẫu hình mới để xác nhận'
          : 'Nhập lại mã PIN mới để xác nhận';
      }
    }

    if (resetBtn) {
      // Bảo mật: chỉ cho phép khôi phục mặc định sau khi đã xác thực Bước 1 hoặc đang ở phiên đã đăng nhập
      resetBtn.hidden = this.changeStep < 2 && !this.openedChangeFromUnlocked;
    }
  }

  public openChangeCredentialsModal(fromAuthenticatedContext: boolean = false): void {
    this.ensureLockerHtml();
    const locker = document.getElementById('cliniScreenLocker');
    const modal = document.getElementById('lockerChangePatternModal');
    if (!modal || !locker) return;

    this.openedChangeFromUnlocked = fromAuthenticatedContext;
    this.isChangeModalOpen = true;
    this.changeTargetMethod = this.currentAuthMethod;
    this.changeStep = 1;
    this.tempNewCode = '';

    if (fromAuthenticatedContext && !this.isLocked) {
      locker.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    this.updateChangeModalUI();
    this.setModalMessage('', 'neutral');
    modal.classList.add('show');
  }

  public closeChangeCredentialsModal(): void {
    const modal = document.getElementById('lockerChangePatternModal');
    const locker = document.getElementById('cliniScreenLocker');

    modal?.classList.remove('show');
    this.isChangeModalOpen = false;
    this.changeStep = 1;
    this.tempNewCode = '';
    this.modalPatternWidget?.clear();
    this.modalPinWidget?.clear();
    this.setModalMessage('', 'neutral');

    if (this.openedChangeFromUnlocked && !this.isLocked) {
      locker?.classList.remove('active');
      document.body.style.overflow = '';
    }
    this.openedChangeFromUnlocked = false;
  }

  public lock(reason?: string): void {
    this.ensureLockerHtml();
    if (this.isChangeModalOpen) {
      this.closeChangeCredentialsModal();
    }

    this.isLocked = true;
    this.stopIdleChecker();

    safeStorageSet(STORAGE_KEY_LOCKED, 'true');
    safeStorageRemove(STORAGE_KEY_SESSION_UNTIL);

    const locker = document.getElementById('cliniScreenLocker');
    if (locker) locker.classList.add('active');
    document.body.style.overflow = 'hidden';

    this.syncThemeButtonUI();
    this.updateIdleBadgeUI();
    this.mainPatternWidget?.clear();
    this.mainPinWidget?.clear();

    if (this.isInCooldown()) {
      this.startCooldownCountdown();
    } else {
      this.showMessage(reason || '', 'neutral');
    }
  }

  public unlock(): void {
    this.isLocked = false;
    this.setFailedAttempts(0);
    safeStorageRemove(STORAGE_KEY_COOLDOWN_UNTIL);
    safeStorageSet(STORAGE_KEY_SESSION_UNTIL, String(Date.now() + SHIFT_SESSION_MS));
    this.recordActivity(true);
    safeStorageSet(STORAGE_KEY_LOCKED, 'false');
    this.startIdleChecker();
    this.playUnlockTransition();
  }

  private playUnlockTransition(): void {
    const locker = document.getElementById('cliniScreenLocker');
    const icon = document.getElementById('lockerIconMain');
    if (icon) icon.className = 'fa-solid fa-lock-open';

    this.showMessage('✅ Xác thực thành công! Đang vào ca trực...', 'success');

    window.setTimeout(() => {
      locker?.classList.remove('active');
      document.body.style.overflow = '';
      if (icon) icon.className = 'fa-solid fa-lock';
      this.mainPatternWidget?.clear();
      this.mainPinWidget?.clear();
      this.showMessage('', 'neutral');
    }, 360);
  }

  private recordActivity(force: boolean = false): void {
    if (this.isLocked) return;
    const now = Date.now();
    if (!force && now - this.lastActivityWriteTs < 3000) return;
    this.lastActivityWriteTs = now;
    safeStorageSet(STORAGE_KEY_LAST_ACTIVITY, String(now));
  }

  private bindActivityMonitor(): void {
    const onActive = () => this.recordActivity(false);
    document.addEventListener('pointerdown', onActive, { passive: true });
    document.addEventListener('keydown', onActive, { passive: true });
    window.addEventListener('scroll', onActive, { passive: true });
    document.addEventListener('touchstart', onActive, { passive: true });

    const checkWakeIdle = () => {
      if (this.isLocked) return;
      const idleMs = this.getIdleTimeoutMinutes() * 60 * 1000;
      if (idleMs <= 0) return;
      const last = Number(safeStorageGet(STORAGE_KEY_LAST_ACTIVITY) || '0');
      if (last > 0 && Date.now() - last >= idleMs) {
        this.lock('Phiên tự động khóa do không thao tác');
      }
    };

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        checkWakeIdle();
      }
    });
    window.addEventListener('focus', checkWakeIdle);
  }

  private startIdleChecker(): void {
    this.stopIdleChecker();
    const idleMs = this.getIdleTimeoutMinutes() * 60 * 1000;
    if (idleMs <= 0) return;

    this.idleCheckInterval = window.setInterval(() => {
      if (this.isLocked) return;
      const last = Number(safeStorageGet(STORAGE_KEY_LAST_ACTIVITY) || '0');
      if (last > 0 && Date.now() - last >= idleMs) {
        this.lock('Phiên tự động khóa do không thao tác');
      }
    }, 10000);
  }

  private stopIdleChecker(): void {
    if (this.idleCheckInterval) {
      window.clearInterval(this.idleCheckInterval);
      this.idleCheckInterval = null;
    }
  }

  private bindStorageSync(): void {
    window.addEventListener('storage', (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_LOCKED) {
        if (e.newValue === 'true' && !this.isLocked) {
          this.lock('Đã đồng bộ khóa phiên từ cửa sổ khác');
        } else if (e.newValue === 'false' && this.isLocked && this.hasValidShiftSession()) {
          this.isLocked = false;
          this.startIdleChecker();
          this.playUnlockTransition();
        }
      } else if (e.key === STORAGE_KEY_IDLE_MINUTES) {
        this.updateIdleBadgeUI();
        if (!this.isLocked) this.startIdleChecker();
      }
    });
  }

  private triggerShake(): void {
    const card = document.getElementById('lockerCard');
    if (!card) return;
    card.classList.remove('shake-animation');
    void card.offsetWidth;
    card.classList.add('shake-animation');
    window.setTimeout(() => {
      card.classList.remove('shake-animation');
    }, 420);
  }

  private showMessage(msg: string, type: 'error' | 'success' | 'warning' | 'neutral'): void {
    const feedback = document.getElementById('lockerFeedbackMsg');
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.className = 'locker-feedback-msg';
    if (type !== 'neutral') feedback.classList.add(type);
  }

  private setModalMessage(msg: string, type: 'error' | 'success' | 'warning' | 'neutral'): void {
    const feedback = document.getElementById('changePatternMsg');
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.className = 'locker-feedback-msg';
    if (type !== 'neutral') feedback.classList.add(type);
  }

  private startClock(): void {
    if (this.clockInterval) return;

    const update = () => {
      const now = new Date();
      const timeEl = document.getElementById('lockerClockTime');
      const dateEl = document.getElementById('lockerClockDate');

      if (timeEl) {
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        timeEl.textContent = `${h}:${m}:${s}`;
      }

      if (dateEl) {
        const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        const dayName = days[now.getDay()];
        const dateStr = `${dayName}, ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
        dateEl.textContent = `${dateStr} • Phiên trực`;
      }
    };

    update();
    this.clockInterval = window.setInterval(update, 1000);
  }
}

export const cliniScreenLocker = ScreenLockerController.getInstance();

export function initScreenLocker(): void {
  cliniScreenLocker.init();
}

if (typeof window !== 'undefined') {
  const win = window as unknown as Record<string, unknown>;
  win.CliniScreenLocker = cliniScreenLocker;
  win.lockCliniPortal = () => cliniScreenLocker.lock();
  win.unlockCliniPortal = () => cliniScreenLocker.unlock();
}
