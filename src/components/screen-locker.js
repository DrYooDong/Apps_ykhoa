/**
 * CliniPortal Screen Locker & Clinical Auth Controller (screen-locker.js)
 * Path: src/components/screen-locker.js
 * Phiên bản: 4.0 (ES6+ Mirror of screen-locker.ts — Hoạt động trên file:///, Localhost và GitHub Pages)
 */

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
const DEFAULT_IDLE_MINUTES = 15;
const SHIFT_SESSION_MS = 8 * 60 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;
const COOLDOWN_DURATION_MS = 30 * 1000;

const INTERMEDIATE_MAP = {
  '1-3': 2, '3-1': 2,
  '4-6': 5, '6-4': 5,
  '7-9': 8, '9-7': 8,
  '1-7': 4, '7-1': 4,
  '2-8': 5, '8-2': 5,
  '3-9': 6, '9-3': 6,
  '1-9': 5, '9-1': 5,
  '3-7': 5, '7-3': 5
};

function safeStorageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function safeStorageRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Ignore storage access errors
  }
}

export class PatternLockWidget {
  constructor(options) {
    this.container = options.container;
    this.size = options.size || 248;
    this.onComplete = options.onComplete;
    this.onChange = options.onChange;

    this.wrapperEl = null;
    this.svgEl = null;
    this.linesGroup = null;
    this.trackerLine = null;
    this.nodeEls = [];

    this.pattern = [];
    this.isDrawing = false;
    this.isBusy = false;
    this.isDisabled = false;

    this.handlePointerDown = (e) => {
      if (this.isBusy || this.isDisabled) return;
      e.preventDefault();
      try {
        this.wrapperEl && this.wrapperEl.setPointerCapture(e.pointerId);
      } catch {}

      this.isDrawing = true;
      this.clear();

      const hit = this.checkHit(e.clientX, e.clientY);
      if (hit !== null) {
        this.addNode(hit);
      }
    };

    this.handlePointerMove = (e) => {
      if (!this.isDrawing || this.isBusy || this.isDisabled) return;
      e.preventDefault();

      const hit = this.checkHit(e.clientX, e.clientY);
      if (hit !== null) {
        this.addNode(hit);
      }

      this.updateTracker(e.clientX, e.clientY);
    };

    this.handlePointerUp = (e) => {
      if (!this.isDrawing) return;
      this.isDrawing = false;

      if (this.trackerLine) {
        this.trackerLine.style.display = 'none';
      }

      try {
        this.wrapperEl && this.wrapperEl.releasePointerCapture(e.pointerId);
      } catch {}

      if (this.pattern.length === 1) {
        this.clear();
        return;
      }

      if (this.pattern.length > 1) {
        this.onComplete([...this.pattern], this.pattern.join('-'));
      }
    };

    this.mount();
    this.bindEvents();
  }

  mount() {
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

  bindEvents() {
    if (!this.wrapperEl) return;
    this.wrapperEl.addEventListener('pointerdown', this.handlePointerDown);
    this.wrapperEl.addEventListener('pointermove', this.handlePointerMove);
    this.wrapperEl.addEventListener('pointerup', this.handlePointerUp);
    this.wrapperEl.addEventListener('pointercancel', this.handlePointerUp);
  }

  checkHit(clientX, clientY) {
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

  addNode(idx) {
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
        if (this.onChange) this.onChange([...this.pattern]);
        return;
      }

      this.drawLine(prev, idx);
    }

    this.pattern.push(idx);
    this.activateNode(idx);
    this.triggerHaptic();
    if (this.onChange) this.onChange([...this.pattern]);
  }

  activateNode(idx) {
    if (this.nodeEls[idx - 1]) {
      this.nodeEls[idx - 1].classList.add('active');
    }
  }

  getNodeCenter(idx) {
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

  drawLine(fromIdx, toIdx) {
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

  updateTracker(clientX, clientY) {
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

  triggerHaptic(pattern = 16) {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {}
    }
  }

  showError() {
    this.isBusy = true;
    if (this.trackerLine) this.trackerLine.style.display = 'none';
    if (this.wrapperEl) this.wrapperEl.classList.add('error');
    this.nodeEls.forEach((n) => {
      if (n.classList.contains('active')) n.classList.add('error');
    });
    if (this.linesGroup) {
      this.linesGroup.querySelectorAll('.pattern-line').forEach((l) => l.classList.add('error'));
    }
    this.triggerHaptic([65, 35, 65]);

    window.setTimeout(() => {
      this.clear();
      this.isBusy = false;
    }, 620);
  }

  showSuccess() {
    this.isBusy = true;
    if (this.trackerLine) this.trackerLine.style.display = 'none';
    if (this.wrapperEl) this.wrapperEl.classList.add('success');
    this.nodeEls.forEach((n) => {
      if (n.classList.contains('active')) n.classList.add('success');
    });
    if (this.linesGroup) {
      this.linesGroup.querySelectorAll('.pattern-line').forEach((l) => l.classList.add('success'));
    }
    this.triggerHaptic([20, 25, 40]);

    window.setTimeout(() => {
      this.isBusy = false;
    }, 380);
  }

  clear() {
    this.pattern = [];
    if (this.linesGroup) this.linesGroup.innerHTML = '';
    if (this.trackerLine) this.trackerLine.style.display = 'none';
    if (this.wrapperEl) this.wrapperEl.classList.remove('error', 'success');
    this.nodeEls.forEach((n) => n.classList.remove('active', 'error', 'success'));
    if (this.onChange) this.onChange([]);
  }

  setDisabled(disabled) {
    this.isDisabled = disabled;
    if (disabled) {
      this.isDrawing = false;
      this.clear();
    }
  }

  addNodeByKey(idx) {
    if (idx >= 1 && idx <= 9) {
      this.addNode(idx);
    }
  }

  removeLastNode() {
    if (this.pattern.length === 0 || this.isBusy || this.isDisabled) return;
    this.pattern.pop();
    const activeList = [...this.pattern];
    this.clear();
    activeList.forEach((idx) => this.addNode(idx));
  }

  getPattern() {
    return [...this.pattern];
  }

  destroy() {
    if (this.wrapperEl) {
      this.wrapperEl.removeEventListener('pointerdown', this.handlePointerDown);
      this.wrapperEl.removeEventListener('pointermove', this.handlePointerMove);
      this.wrapperEl.removeEventListener('pointerup', this.handlePointerUp);
      this.wrapperEl.removeEventListener('pointercancel', this.handlePointerUp);
    }
  }
}

export class PinLockWidget {
  constructor(options) {
    this.container = options.container;
    this.onComplete = options.onComplete;
    this.onChange = options.onChange;

    this.slots = [];
    this.keyBtns = [];
    this.eyeBtn = null;
    this.eyeIcon = null;

    this.pin = '';
    this.isRevealed = false;
    this.isBusy = false;
    this.isDisabled = false;

    this.mount();
    this.bindEvents();
  }

  mount() {
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

  bindEvents() {
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

    if (this.eyeBtn) {
      this.eyeBtn.addEventListener('click', () => {
        this.toggleVisibility();
      });
    }
  }

  renderSlots() {
    this.slots.forEach((slot, idx) => {
      const char = this.pin[idx] || '';
      slot.classList.toggle('filled', char !== '');
      slot.classList.toggle('revealed', this.isRevealed);
      slot.textContent = this.isRevealed ? char : '';
    });
  }

  triggerHaptic(pattern = 14) {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {}
    }
  }

  toggleVisibility() {
    this.isRevealed = !this.isRevealed;
    if (this.eyeIcon) {
      this.eyeIcon.className = this.isRevealed ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
    }
    this.renderSlots();
  }

  appendDigit(digit) {
    if (this.isBusy || this.isDisabled || !/^\d$/.test(digit) || this.pin.length >= 6) return;
    this.pin += digit;
    this.triggerHaptic(14);
    this.renderSlots();
    if (this.onChange) this.onChange(this.pin);

    if (this.pin.length === 6) {
      this.isBusy = true;
      const submitted = this.pin;
      window.setTimeout(() => {
        this.isBusy = false;
        this.onComplete(submitted);
      }, 85);
    }
  }

  setValue(digits) {
    if (this.isBusy || this.isDisabled) return;
    const clean = String(digits || '').replace(/\D/g, '').slice(0, 6);
    if (!clean) return;
    this.pin = clean;
    this.renderSlots();
    if (this.onChange) this.onChange(this.pin);

    if (this.pin.length === 6) {
      this.isBusy = true;
      const submitted = this.pin;
      window.setTimeout(() => {
        this.isBusy = false;
        this.onComplete(submitted);
      }, 85);
    }
  }

  backspace() {
    if (this.isBusy || this.isDisabled || this.pin.length === 0) return;
    this.pin = this.pin.slice(0, -1);
    this.triggerHaptic(10);
    this.renderSlots();
    if (this.onChange) this.onChange(this.pin);
  }

  submit() {
    if (this.isBusy || this.isDisabled || this.pin.length === 0) return;
    this.onComplete(this.pin);
  }

  showError() {
    this.isBusy = true;
    this.slots.forEach((s) => s.classList.add('error'));
    this.triggerHaptic([65, 35, 65]);

    window.setTimeout(() => {
      this.clear();
      this.isBusy = false;
    }, 620);
  }

  showSuccess() {
    this.isBusy = true;
    this.slots.forEach((s) => s.classList.add('success'));
    this.triggerHaptic([20, 25, 40]);

    window.setTimeout(() => {
      this.isBusy = false;
    }, 380);
  }

  clear() {
    this.pin = '';
    this.slots.forEach((s) => s.classList.remove('filled', 'error', 'success'));
    this.renderSlots();
    if (this.onChange) this.onChange('');
  }

  setDisabled(disabled) {
    this.isDisabled = disabled;
    this.keyBtns.forEach((btn) => {
      btn.disabled = disabled;
    });
    if (disabled) this.clear();
  }

  getPin() {
    return this.pin;
  }
}

export class ScreenLockerController {
  static getInstance() {
    if (!ScreenLockerController._instance) {
      ScreenLockerController._instance = new ScreenLockerController();
    }
    return ScreenLockerController._instance;
  }

  constructor() {
    this.isLocked = false;
    this.isChangeModalOpen = false;
    this.openedChangeFromUnlocked = false;
    this.initialized = false;

    this.currentAuthMethod = 'pattern';
    this.changeTargetMethod = 'pattern';
    this.changeStep = 1;
    this.tempNewCode = '';

    this.clockInterval = null;
    this.idleCheckInterval = null;
    this.cooldownInterval = null;
    this.lastActivityWriteTs = 0;

    this.mainPatternWidget = null;
    this.mainPinWidget = null;
    this.modalPatternWidget = null;
    this.modalPinWidget = null;
  }

  getStoredPattern() {
    return safeStorageGet(STORAGE_KEY_PATTERN) || DEFAULT_PATTERN;
  }

  setStoredPattern(newPattern) {
    if (!newPattern || newPattern.split('-').length < 4) return false;
    return safeStorageSet(STORAGE_KEY_PATTERN, newPattern);
  }

  getStoredPin() {
    const val = safeStorageGet(STORAGE_KEY_PIN);
    return val && /^\d{6}$/.test(val) ? val : DEFAULT_PIN;
  }

  setStoredPin(newPin) {
    if (!/^\d{6}$/.test(newPin)) return false;
    return safeStorageSet(STORAGE_KEY_PIN, newPin);
  }

  getPin() {
    return this.getStoredPin();
  }

  setPin(newPin) {
    return this.setStoredPin(newPin);
  }

  isScreenLocked() {
    return this.isLocked;
  }

  getAuthMethod() {
    const saved = safeStorageGet(STORAGE_KEY_AUTH_METHOD);
    return saved === 'pin' ? 'pin' : 'pattern';
  }

  setAuthMethod(method) {
    this.currentAuthMethod = method === 'pin' ? 'pin' : 'pattern';
    safeStorageSet(STORAGE_KEY_AUTH_METHOD, this.currentAuthMethod);
    this.syncMainAuthTabsUI();
  }

  getIdleTimeoutMinutes() {
    const raw = safeStorageGet(STORAGE_KEY_IDLE_MINUTES);
    if (raw === '0' || raw === '5' || raw === '15' || raw === '30') {
      return Number(raw);
    }
    return DEFAULT_IDLE_MINUTES;
  }

  setIdleTimeoutMinutes(minutes) {
    const valid = minutes === 0 || minutes === 5 || minutes === 30 ? minutes : 15;
    safeStorageSet(STORAGE_KEY_IDLE_MINUTES, String(valid));
    this.updateIdleBadgeUI();
    this.recordActivity(true);
    this.startIdleChecker();
    window.dispatchEvent(new CustomEvent('cliniportal-security-change', { detail: { idleMinutes: valid } }));
  }

  isPatternValid(patternStr) {
    const stored = this.getStoredPattern();
    if (patternStr === stored) return true;
    if (stored === DEFAULT_PATTERN && patternStr === DEFAULT_PATTERN_REVERSE) return true;
    return false;
  }

  isPinValid(pinStr) {
    return pinStr === this.getStoredPin();
  }

  getFailedAttempts() {
    const n = Number(safeStorageGet(STORAGE_KEY_FAILED_ATTEMPTS) || '0');
    return Number.isFinite(n) && n > 0 ? n : 0;
  }

  setFailedAttempts(count) {
    safeStorageSet(STORAGE_KEY_FAILED_ATTEMPTS, String(Math.max(0, count)));
  }

  getCooldownRemainingSeconds() {
    const until = Number(safeStorageGet(STORAGE_KEY_COOLDOWN_UNTIL) || '0');
    if (!Number.isFinite(until) || until <= Date.now()) return 0;
    return Math.ceil((until - Date.now()) / 1000);
  }

  isInCooldown() {
    return this.getCooldownRemainingSeconds() > 0;
  }

  hasValidShiftSession() {
    if (safeStorageGet(STORAGE_KEY_LOCKED) === 'true') return false;
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

  init() {
    if (this.initialized) return;
    this.initialized = true;

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

  ensureLockerHtml() {
    if (document.getElementById('cliniScreenLocker')) return;

    const lockerHtml = `
      <div class="clini-screen-locker" id="cliniScreenLocker" role="dialog" aria-modal="true" aria-labelledby="lockerTitle">
        <div class="locker-backdrop-mesh" aria-hidden="true"></div>
        <div class="locker-card" id="lockerCard">
          <div class="locker-card-glow-bar" aria-hidden="true"></div>

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

          <div class="locker-feedback-msg" id="lockerFeedbackMsg" role="status" aria-live="polite"></div>

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

  initWidgets() {
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

  syncMainAuthTabsUI() {
    const tabPattern = document.getElementById('authTabPattern');
    const tabPin = document.getElementById('authTabPin');
    const panelPattern = document.getElementById('lockerPatternPanel');
    const panelPin = document.getElementById('lockerPinPanel');

    const isPattern = this.currentAuthMethod === 'pattern';
    if (tabPattern) {
      tabPattern.classList.toggle('active', isPattern);
      tabPattern.setAttribute('aria-selected', String(isPattern));
    }
    if (tabPin) {
      tabPin.classList.toggle('active', !isPattern);
      tabPin.setAttribute('aria-selected', String(!isPattern));
    }

    if (panelPattern) panelPattern.hidden = !isPattern;
    if (panelPin) panelPin.hidden = isPattern;
  }

  syncThemeButtonUI() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const icon = document.getElementById('lockerThemeIcon');
    if (icon) {
      icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  }

  updateIdleBadgeUI() {
    const el = document.getElementById('lockerIdleBadgeText');
    if (!el) return;
    const mins = this.getIdleTimeoutMinutes();
    el.textContent = mins > 0 ? `Tự khóa: ${mins}p • Phiên 8h` : 'Tự khóa: Tắt • Phiên 8h';
  }

  attachHeaderButton() {
    document.addEventListener('click', (e) => {
      const lockBtn = e.target && e.target.closest('#headerLockBtn, .trigger-screen-lock, [data-action="lock-screen"]');
      if (lockBtn) {
        e.preventDefault();
        this.lock('Đã khóa trạm làm việc lâm sàng');
      }
    });
  }

  bindEvents() {
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

    document.getElementById('lockerThemeToggleBtn')?.addEventListener('click', () => {
      if (window.CliniPortalTheme?.toggleTheme) {
        window.CliniPortalTheme.toggleTheme();
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

    document.getElementById('mainClearAuthBtn')?.addEventListener('click', () => {
      if (this.isInCooldown()) return;
      this.mainPatternWidget?.clear();
      this.mainPinWidget?.clear();
      this.showMessage('', 'neutral');
    });

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

    document.getElementById('cliniScreenLocker')?.addEventListener('paste', (e) => {
      if (!this.isLocked && !this.isChangeModalOpen) return;
      if (this.isInCooldown()) return;

      const activeMethod = this.isChangeModalOpen ? this.changeTargetMethod : this.currentAuthMethod;
      if (activeMethod !== 'pin') return;

      const text = (e.clipboardData && e.clipboardData.getData('text')) || '';
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

    document.addEventListener('keydown', (e) => {
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

  verifyMainPattern(pattern, patternStr) {
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

  verifyMainPin(pin) {
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

  handleFailedAttempt() {
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

  startCooldownCountdown() {
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

    if (this.cooldownInterval) window.clearInterval(this.cooldownInterval);
    updateTick();
    this.cooldownInterval = window.setInterval(updateTick, 1000);
  }

  handleModalCodeComplete(codeStr, length) {
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

  updateChangeModalUI() {
    const tabPattern = document.getElementById('changeTargetPatternTab');
    const tabPin = document.getElementById('changeTargetPinTab');
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
      resetBtn.hidden = this.changeStep < 2 && !this.openedChangeFromUnlocked;
    }
  }

  openChangeCredentialsModal(fromAuthenticatedContext = false) {
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

  closeChangeCredentialsModal() {
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

  lock(reason) {
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

  unlock() {
    this.isLocked = false;
    this.setFailedAttempts(0);
    safeStorageRemove(STORAGE_KEY_COOLDOWN_UNTIL);
    safeStorageSet(STORAGE_KEY_SESSION_UNTIL, String(Date.now() + SHIFT_SESSION_MS));
    this.recordActivity(true);
    safeStorageSet(STORAGE_KEY_LOCKED, 'false');
    this.startIdleChecker();
    this.playUnlockTransition();
  }

  playUnlockTransition() {
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

  recordActivity(force = false) {
    if (this.isLocked) return;
    const now = Date.now();
    if (!force && now - this.lastActivityWriteTs < 3000) return;
    this.lastActivityWriteTs = now;
    safeStorageSet(STORAGE_KEY_LAST_ACTIVITY, String(now));
  }

  bindActivityMonitor() {
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
      if (document.visibilityState === 'visible') checkWakeIdle();
    });
    window.addEventListener('focus', checkWakeIdle);
  }

  startIdleChecker() {
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

  stopIdleChecker() {
    if (this.idleCheckInterval) {
      window.clearInterval(this.idleCheckInterval);
      this.idleCheckInterval = null;
    }
  }

  bindStorageSync() {
    window.addEventListener('storage', (e) => {
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

  triggerShake() {
    const card = document.getElementById('lockerCard');
    if (!card) return;
    card.classList.remove('shake-animation');
    void card.offsetWidth;
    card.classList.add('shake-animation');
    window.setTimeout(() => {
      card.classList.remove('shake-animation');
    }, 420);
  }

  showMessage(msg, type) {
    const feedback = document.getElementById('lockerFeedbackMsg');
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.className = 'locker-feedback-msg';
    if (type && type !== 'neutral') feedback.classList.add(type);
  }

  setModalMessage(msg, type) {
    const feedback = document.getElementById('changePatternMsg');
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.className = 'locker-feedback-msg';
    if (type && type !== 'neutral') feedback.classList.add(type);
  }

  startClock() {
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

export function initScreenLocker() {
  cliniScreenLocker.init();
}

if (typeof window !== 'undefined') {
  window.CliniScreenLocker = cliniScreenLocker;
  window.lockCliniPortal = () => cliniScreenLocker.lock();
  window.unlockCliniPortal = () => cliniScreenLocker.unlock();

  if (typeof document !== 'undefined') {
    const boot = () => {
      if (!window.__cliniScreenLockerBooted) {
        window.__cliniScreenLockerBooted = true;
        cliniScreenLocker.init();
      }
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', boot);
    } else {
      boot();
    }
  }
}
