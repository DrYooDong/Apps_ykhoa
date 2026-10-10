/**
 * CliniPortal Screen Locker & Security Controller (screen-locker.ts)
 * Path: src/components/screen-locker.ts
 * 
 * Chức năng:
 * 1. Khóa giao diện bảo mật phiên làm việc y tế tự động khởi động ngay khi người dùng vào web.
 * 2. Thích ứng theo thiết bị:
 *    - Chế độ Laptop (> 768px): Chỉ nhận mã PIN từ bàn phím vật lý (6 ô input số auto-focus, ẩn hoàn toàn bàn phím ảo).
 *    - Chế độ Tablet & Mobile (<= 768px): Sử dụng bàn phím cảm ứng 9 nút số (Keypad 1-9, 0, Xóa, Xóa hết) kết hợp 6 chấm tròn đèn LED (ẩn ô text input để tránh bật bàn phím ảo của OS).
 * 3. Tuyệt đối không hiển thị gợi ý mật khẩu cho người dùng.
 * 4. Tích hợp đồng hồ trực ca ICU thời gian thực, rung haptic phản hồi cảm ứng, và modal đổi mã PIN bảo mật.
 */

const STORAGE_KEY_LOCKED = 'cliniportal_screen_locked';
const STORAGE_KEY_PIN = 'cliniportal_lock_pin';
const DEFAULT_PIN = '123456';

export class ScreenLockerController {
  private static instance: ScreenLockerController;
  private isLocked: boolean = false;
  private clockInterval: number | null = null;
  private currentPinInput: string = '';
  private isMasked: boolean = true;

  private constructor() {}

  public static getInstance(): ScreenLockerController {
    if (!ScreenLockerController.instance) {
      ScreenLockerController.instance = new ScreenLockerController();
    }
    return ScreenLockerController.instance;
  }

  /**
   * Lấy mã PIN hiện tại (mặc định 123456 nếu chưa đổi)
   */
  public getStoredPin(): string {
    try {
      return localStorage.getItem(STORAGE_KEY_PIN) || DEFAULT_PIN;
    } catch {
      return DEFAULT_PIN;
    }
  }

  /**
   * Lưu mã PIN mới vào localStorage
   */
  public setStoredPin(newPin: string): boolean {
    if (!/^\d{6}$/.test(newPin)) {
      return false;
    }
    try {
      localStorage.setItem(STORAGE_KEY_PIN, newPin);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Khởi tạo component màn hình khóa
   * Khởi động khóa ngay khi người dùng vào web theo yêu cầu!
   */
  public init(): void {
    this.ensureLockerHtml();
    this.attachHeaderButton();
    this.bindEvents();
    this.startClock();

    // Khởi động tính năng khóa ngay khi vào web
    this.lock();
  }

  /**
   * Tạo cấu trúc HTML Màn hình Khóa nếu chưa có
   */
  private ensureLockerHtml(): void {
    if (document.getElementById('cliniScreenLocker')) return;

    const lockerHtml = `
      <div class="clini-screen-locker" id="cliniScreenLocker" role="dialog" aria-modal="true" aria-labelledby="lockerTitle">
        <div class="locker-backdrop-mesh" aria-hidden="true"></div>
        <div class="locker-card" id="lockerCard">
          
          <!-- Thanh ánh sáng gradient chạy trên đỉnh thẻ -->
          <div class="locker-card-glow-bar"></div>

          <!-- Phần đỉnh: Icon khóa & Trạng thái hệ thống -->
          <div class="locker-header-zone">
            <div class="locker-icon-wrapper" id="lockerIconWrapper">
              <div class="locker-icon-pulse"></div>
              <div class="locker-icon-inner">
                <i class="fa-solid fa-lock" id="lockerIconMain"></i>
              </div>
            </div>
            <div class="locker-system-tag">
              <i class="fa-solid fa-shield-heart"></i>
              <span>CLINIPORTAL • WORKSTATION SECURITY</span>
            </div>
          </div>

          <!-- Đồng hồ trực ca thời gian thực ICU style -->
          <div class="locker-clock-box">
            <div class="locker-time" id="lockerClockTime">--:--:--</div>
            <div class="locker-date" id="lockerClockDate">Đang cập nhật ca trực...</div>
          </div>

          <!-- Huy hiệu Bảo Mật Phiên Trực Lâm Sàng -->
          <div class="locker-doctor-chip">
            <i class="fa-solid fa-user-doctor" style="color: #38bdf8;"></i>
            <span class="locker-doctor-name">Phiên Trực Bác Sĩ • Đã Khóa Bảo Mật</span>
            <span class="locker-doctor-status-dot"></span>
          </div>

          <!-- Container Nhập PIN 6 số -->
          <div class="locker-pin-container">
            <div class="locker-pin-title" id="lockerTitle">
              <span class="title-laptop">Nhập mã PIN 6 số từ bàn phím</span>
              <span class="title-mobile">Chạm các nút số để mở khóa</span>
            </div>

            <!-- 6 Chấm tròn trạng thái đèn LED (Dành cho Mobile & Tablet) -->
            <div class="locker-pin-dots" id="lockerPinDots" aria-hidden="true">
              <span class="pin-dot" data-dot="0"><span class="pin-dot-glow"></span></span>
              <span class="pin-dot" data-dot="1"><span class="pin-dot-glow"></span></span>
              <span class="pin-dot" data-dot="2"><span class="pin-dot-glow"></span></span>
              <span class="pin-dot" data-dot="3"><span class="pin-dot-glow"></span></span>
              <span class="pin-dot" data-dot="4"><span class="pin-dot-glow"></span></span>
              <span class="pin-dot" data-dot="5"><span class="pin-dot-glow"></span></span>
            </div>

            <!-- 6 Ô Input số (Dành cho Laptop / Bàn phím vật lý) -->
            <div class="locker-pin-inputs" id="lockerPinInputs">
              <input type="password" inputmode="numeric" pattern="[0-9]*" maxlength="1" class="pin-digit-box" data-index="0" aria-label="Số thứ 1" autocomplete="off" />
              <input type="password" inputmode="numeric" pattern="[0-9]*" maxlength="1" class="pin-digit-box" data-index="1" aria-label="Số thứ 2" autocomplete="off" />
              <input type="password" inputmode="numeric" pattern="[0-9]*" maxlength="1" class="pin-digit-box" data-index="2" aria-label="Số thứ 3" autocomplete="off" />
              <input type="password" inputmode="numeric" pattern="[0-9]*" maxlength="1" class="pin-digit-box" data-index="3" aria-label="Số thứ 4" autocomplete="off" />
              <input type="password" inputmode="numeric" pattern="[0-9]*" maxlength="1" class="pin-digit-box" data-index="4" aria-label="Số thứ 5" autocomplete="off" />
              <input type="password" inputmode="numeric" pattern="[0-9]*" maxlength="1" class="pin-digit-box" data-index="5" aria-label="Số thứ 6" autocomplete="off" />
            </div>

            <!-- Thanh công cụ phụ (Nút Ẩn/Hiện mã PIN) -->
            <div class="locker-pin-toolbar">
              <button type="button" class="pin-toggle-visibility-btn" id="pinToggleVisibilityBtn" title="Hiện hoặc ẩn mã PIN" aria-label="Hiện hoặc ẩn mã PIN">
                <i class="fa-solid fa-eye" id="pinToggleEyeIcon"></i>
                <span id="pinToggleEyeText">Hiện mã</span>
              </button>
            </div>

            <!-- Thông báo phản hồi trạng thái -->
            <div class="locker-feedback-msg" id="lockerFeedbackMsg" role="status" aria-live="polite"></div>
          </div>

          <!-- BÀN PHÍM CẢM ỨNG 9 NÚT SỐ (Chỉ hiển thị trên Mobile & Tablet, ẨN trên Laptop) -->
          <div class="locker-keypad" id="lockerKeypad" aria-label="Bàn phím số cảm ứng">
            <button type="button" class="keypad-btn" data-key="1" aria-label="Số 1">
              <span class="keypad-num">1</span>
              <span class="keypad-sub"></span>
            </button>
            <button type="button" class="keypad-btn" data-key="2" aria-label="Số 2 ABC">
              <span class="keypad-num">2</span>
              <span class="keypad-sub">ABC</span>
            </button>
            <button type="button" class="keypad-btn" data-key="3" aria-label="Số 3 DEF">
              <span class="keypad-num">3</span>
              <span class="keypad-sub">DEF</span>
            </button>

            <button type="button" class="keypad-btn" data-key="4" aria-label="Số 4 GHI">
              <span class="keypad-num">4</span>
              <span class="keypad-sub">GHI</span>
            </button>
            <button type="button" class="keypad-btn" data-key="5" aria-label="Số 5 JKL">
              <span class="keypad-num">5</span>
              <span class="keypad-sub">JKL</span>
            </button>
            <button type="button" class="keypad-btn" data-key="6" aria-label="Số 6 MNO">
              <span class="keypad-num">6</span>
              <span class="keypad-sub">MNO</span>
            </button>

            <button type="button" class="keypad-btn" data-key="7" aria-label="Số 7 PQRS">
              <span class="keypad-num">7</span>
              <span class="keypad-sub">PQRS</span>
            </button>
            <button type="button" class="keypad-btn" data-key="8" aria-label="Số 8 TUV">
              <span class="keypad-num">8</span>
              <span class="keypad-sub">TUV</span>
            </button>
            <button type="button" class="keypad-btn" data-key="9" aria-label="Số 9 WXYZ">
              <span class="keypad-num">9</span>
              <span class="keypad-sub">WXYZ</span>
            </button>

            <!-- Hàng chức năng thứ 4 -->
            <button type="button" class="keypad-btn keypad-fn keypad-clear" data-action="clear" aria-label="Xóa toàn bộ mã">
              <span class="keypad-num"><i class="fa-solid fa-rotate-left"></i></span>
              <span class="keypad-sub">XÓA HẾT</span>
            </button>
            <button type="button" class="keypad-btn" data-key="0" aria-label="Số 0">
              <span class="keypad-num">0</span>
              <span class="keypad-sub">+</span>
            </button>
            <button type="button" class="keypad-btn keypad-fn keypad-backspace" data-action="backspace" aria-label="Xóa lùi một số">
              <span class="keypad-num"><i class="fa-solid fa-delete-left"></i></span>
              <span class="keypad-sub">XÓA</span>
            </button>
          </div>

          <!-- Các nút hành động & Trợ giúp (TUYỆT ĐỐI KHÔNG HIỆN GỢI Ý MÃ MẬT KHẨU) -->
          <div class="locker-actions">
            <button type="button" class="locker-unlock-btn" id="lockerUnlockBtn">
              <i class="fa-solid fa-lock-open"></i>
              <span>Mở khóa ca trực</span>
            </button>

            <div class="locker-helpers">
              <div class="locker-security-hint">
                <i class="fa-solid fa-fingerprint"></i>
                <span>Bảo mật thiết bị lâm sàng</span>
              </div>
              <button type="button" class="locker-link-btn" id="lockerOpenChangePinBtn">
                <i class="fa-solid fa-key"></i>
                <span>Đổi mã PIN</span>
              </button>
            </div>
          </div>

          <!-- Modal con Đổi mã PIN Bảo Mật -->
          <div class="locker-change-pin-modal" id="lockerChangePinModal" role="dialog" aria-modal="true" aria-labelledby="changePinTitle">
            <div class="change-pin-card">
              <div class="change-pin-header">
                <div class="change-pin-icon"><i class="fa-solid fa-shield-halved"></i></div>
                <h3 class="change-pin-title" id="changePinTitle">Đổi Mã PIN Bảo Mật</h3>
                <p class="change-pin-desc">Mã PIN gồm chính xác 6 chữ số (0-9) dùng để mở khóa nhanh giao diện ca trực.</p>
              </div>

              <div class="change-pin-body">
                <div class="change-pin-group">
                  <label class="change-pin-label" for="oldPinInput">
                    <i class="fa-solid fa-lock"></i> Mã PIN hiện tại
                  </label>
                  <input type="password" maxlength="6" inputmode="numeric" class="change-pin-input" id="oldPinInput" placeholder="Nhập mã hiện tại" autocomplete="off" />
                </div>

                <div class="change-pin-group">
                  <label class="change-pin-label" for="newPinInput">
                    <i class="fa-solid fa-key"></i> Mã PIN mới (6 số)
                  </label>
                  <input type="password" maxlength="6" inputmode="numeric" class="change-pin-input" id="newPinInput" placeholder="Nhập 6 số mới" autocomplete="off" />
                </div>

                <div class="change-pin-group">
                  <label class="change-pin-label" for="confirmPinInput">
                    <i class="fa-solid fa-circle-check"></i> Xác nhận mã PIN mới
                  </label>
                  <input type="password" maxlength="6" inputmode="numeric" class="change-pin-input" id="confirmPinInput" placeholder="Nhập lại 6 số mới" autocomplete="off" />
                </div>

                <div class="locker-feedback-msg" id="changePinMsg"></div>
              </div>

              <div class="change-pin-btn-row">
                <button type="button" class="change-pin-cancel-btn" id="cancelChangePinBtn">
                  <i class="fa-solid fa-xmark"></i> Hủy
                </button>
                <button type="button" class="change-pin-save-btn" id="saveNewPinBtn">
                  <i class="fa-solid fa-check"></i> Lưu mã PIN
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', lockerHtml);
  }

  /**
   * Gắn sự kiện vào nút Khóa trên Header và các nút gọi mở màn hình khóa
   */
  private attachHeaderButton(): void {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const lockBtn = target.closest('#headerLockBtn, .trigger-screen-lock, [data-action="lock-screen"]');
      if (lockBtn) {
        e.preventDefault();
        this.lock();
      }
    });
  }

  /**
   * Gắn các sự kiện nhập liệu trên Locker
   */
  private bindEvents(): void {
    const inputs = document.querySelectorAll<HTMLInputElement>('.pin-digit-box');
    const keypad = document.getElementById('lockerKeypad');
    const unlockBtn = document.getElementById('lockerUnlockBtn');
    const toggleEyeBtn = document.getElementById('pinToggleVisibilityBtn');
    const openChangePinBtn = document.getElementById('lockerOpenChangePinBtn');
    const cancelChangePinBtn = document.getElementById('cancelChangePinBtn');
    const saveNewPinBtn = document.getElementById('saveNewPinBtn');

    // 1. Sự kiện trên 6 ô input số (Laptop / Bàn phím vật lý)
    inputs.forEach((input, index) => {
      input.addEventListener('input', () => {
        const val = input.value.replace(/\D/g, '');
        input.value = val ? val[0] : '';
        this.syncInputsToPinString();

        if (val && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }

        if (this.currentPinInput.length === 6) {
          this.verifyPin();
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          if (!input.value && index > 0) {
            inputs[index - 1].focus();
            inputs[index - 1].value = '';
            this.syncInputsToPinString();
          }
        } else if (e.key === 'ArrowLeft' && index > 0) {
          inputs[index - 1].focus();
        } else if (e.key === 'ArrowRight' && index < inputs.length - 1) {
          inputs[index + 1].focus();
        } else if (e.key === 'Enter') {
          this.verifyPin();
        }
      });

      input.addEventListener('paste', (e: ClipboardEvent) => {
        e.preventDefault();
        const pastedData = (e.clipboardData?.getData('text') || '').replace(/\D/g, '').slice(0, 6);
        if (pastedData) {
          for (let i = 0; i < 6; i++) {
            if (inputs[i]) {
              inputs[i].value = pastedData[i] || '';
            }
          }
          this.syncInputsToPinString();
          const nextIndex = Math.min(pastedData.length, 5);
          inputs[nextIndex]?.focus();
          if (pastedData.length === 6) {
            this.verifyPin();
          }
        }
      });
    });

    // 1b. Hỗ trợ gõ trực tiếp từ bàn phím Laptop ngay cả khi chưa click vào ô
    document.addEventListener('keydown', (e) => {
      if (!this.isLocked) return;

      // Chặn phím Escape không cho thoát màn hình khóa
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Chỉ áp dụng điều hướng phím gõ nhanh trên Laptop (> 768px)
      if (window.innerWidth > 768) {
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        const isAlreadyInPinBox = document.activeElement?.classList.contains('pin-digit-box');
        const isInChangePinModal = document.activeElement?.closest('#lockerChangePinModal');

        if (isInChangePinModal) return;

        if (!isAlreadyInPinBox && /^[0-9]$/.test(e.key)) {
          // Người dùng đang bấm phím số khi chưa focus vào ô
          if (this.currentPinInput.length < 6) {
            this.currentPinInput += e.key;
            this.syncPinStringToInputs();
            const nextIdx = Math.min(this.currentPinInput.length, 5);
            inputs[nextIdx]?.focus();

            if (this.currentPinInput.length === 6) {
              this.verifyPin();
            }
          }
        } else if (!isAlreadyInPinBox && e.key === 'Backspace') {
          if (this.currentPinInput.length > 0) {
            this.currentPinInput = this.currentPinInput.slice(0, -1);
            this.syncPinStringToInputs();
            const nextIdx = Math.max(this.currentPinInput.length, 0);
            inputs[nextIdx]?.focus();
          }
        } else if (!isAlreadyInPinBox && e.key === 'Enter') {
          this.verifyPin();
        }
      }
    });

    // 2. Sự kiện Bàn phím 9 nút số cảm ứng (Keypad — Cho Mobile & Tablet)
    if (keypad) {
      keypad.addEventListener('click', (e) => {
        const btn = (e.target as HTMLElement).closest('.keypad-btn') as HTMLElement;
        if (!btn) return;

        const key = btn.getAttribute('data-key');
        const action = btn.getAttribute('data-action');

        // Phản hồi xúc giác rung nhẹ trên di động (Haptic feedback)
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate(25);
          } catch {}
        }

        if (key !== null) {
          if (this.currentPinInput.length < 6) {
            this.currentPinInput += key;
            this.syncPinStringToInputs();
            if (this.currentPinInput.length === 6) {
              this.verifyPin();
            }
          }
        } else if (action === 'backspace') {
          if (this.currentPinInput.length > 0) {
            this.currentPinInput = this.currentPinInput.slice(0, -1);
            this.syncPinStringToInputs();
          }
        } else if (action === 'clear') {
          this.clearPin();
        }
      });
    }

    // 3. Nút Unlock
    if (unlockBtn) {
      unlockBtn.addEventListener('click', () => {
        this.verifyPin();
      });
    }

    // 4. Toggle hiện/ẩn PIN
    if (toggleEyeBtn) {
      toggleEyeBtn.addEventListener('click', () => {
        this.isMasked = !this.isMasked;
        const icon = document.getElementById('pinToggleEyeIcon');
        const text = document.getElementById('pinToggleEyeText');
        inputs.forEach((input) => {
          if (this.isMasked) {
            input.type = 'password';
            input.classList.remove('show-text');
          } else {
            input.type = 'text';
            input.classList.add('show-text');
          }
        });
        if (icon && text) {
          icon.className = this.isMasked ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
          text.textContent = this.isMasked ? 'Hiện mã' : 'Ẩn mã';
        }
      });
    }

    // 5. Đổi mã PIN Modal
    if (openChangePinBtn) {
      openChangePinBtn.addEventListener('click', () => {
        const modal = document.getElementById('lockerChangePinModal');
        if (modal) {
          modal.classList.add('show');
          const oldInput = document.getElementById('oldPinInput') as HTMLInputElement;
          if (oldInput) {
            oldInput.value = '';
            oldInput.focus();
          }
        }
      });
    }

    if (cancelChangePinBtn) {
      cancelChangePinBtn.addEventListener('click', () => {
        document.getElementById('lockerChangePinModal')?.classList.remove('show');
      });
    }

    if (saveNewPinBtn) {
      saveNewPinBtn.addEventListener('click', () => {
        this.handleSaveNewPin();
      });
    }
  }

  /**
   * Đồng bộ chuỗi PIN từ các ô input
   */
  private syncInputsToPinString(): void {
    const inputs = document.querySelectorAll<HTMLInputElement>('.pin-digit-box');
    let str = '';
    inputs.forEach((inp) => {
      str += inp.value ? inp.value[0] : '';
    });
    this.currentPinInput = str;
    this.updateDots();
  }

  /**
   * Đồng bộ chuỗi PIN ngược lại vào các ô input và dots
   */
  private syncPinStringToInputs(): void {
    const inputs = document.querySelectorAll<HTMLInputElement>('.pin-digit-box');
    inputs.forEach((inp, idx) => {
      inp.value = this.currentPinInput[idx] || '';
    });
    this.updateDots();
  }

  /**
   * Cập nhật 6 chấm tròn trạng thái (Dots)
   */
  private updateDots(): void {
    const dots = document.querySelectorAll('.pin-dot');
    dots.forEach((dot, idx) => {
      if (idx < this.currentPinInput.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled');
      }
    });
  }

  /**
   * Xóa toàn bộ ký tự PIN đã nhập
   */
  private clearPin(): void {
    this.currentPinInput = '';
    const inputs = document.querySelectorAll<HTMLInputElement>('.pin-digit-box');
    inputs.forEach((inp) => (inp.value = ''));
    this.updateDots();
    if (window.innerWidth > 768) {
      inputs[0]?.focus();
    }
  }

  /**
   * Khóa màn hình
   */
  public lock(): void {
    this.ensureLockerHtml();
    this.isLocked = true;
    const locker = document.getElementById('cliniScreenLocker');
    if (locker) {
      locker.classList.add('active');
    }
    document.body.style.overflow = 'hidden';

    try {
      sessionStorage.setItem(STORAGE_KEY_LOCKED, 'true');
    } catch {}

    this.clearPin();
    this.showMessage('', 'neutral');

    // Tự động focus vào ô đầu tiên trên Laptop
    setTimeout(() => {
      const firstInput = document.querySelector<HTMLInputElement>('.pin-digit-box');
      if (firstInput && window.innerWidth > 768) {
        firstInput.focus();
      }
    }, 150);
  }

  /**
   * Mở khóa màn hình
   */
  public unlock(): void {
    this.isLocked = false;
    const locker = document.getElementById('cliniScreenLocker');
    const icon = document.getElementById('lockerIconMain');

    if (icon) {
      icon.className = 'fa-solid fa-lock-open';
    }

    this.showMessage('✅ Xác thực thành công! Đang vào phiên...', 'success');

    // Đổi màu thành công cho dots và input
    const inputs = document.querySelectorAll<HTMLInputElement>('.pin-digit-box');
    inputs.forEach((inp) => inp.classList.add('success'));
    const dots = document.querySelectorAll('.pin-dot');
    dots.forEach((dot) => dot.classList.add('success'));

    try {
      sessionStorage.setItem(STORAGE_KEY_LOCKED, 'false');
    } catch {}

    setTimeout(() => {
      if (locker) {
        locker.classList.remove('active');
      }
      document.body.style.overflow = '';
      if (icon) {
        icon.className = 'fa-solid fa-lock';
      }
      inputs.forEach((inp) => inp.classList.remove('success'));
      dots.forEach((dot) => dot.classList.remove('success'));
      this.clearPin();
      this.showMessage('', 'neutral');
    }, 380);
  }

  /**
   * Kiểm tra mã PIN đã nhập
   */
  private verifyPin(): void {
    if (this.currentPinInput.length < 6) {
      this.showMessage('Vui lòng nhập đủ 6 chữ số!', 'error');
      this.triggerShake();
      return;
    }

    const storedPin = this.getStoredPin();
    if (this.currentPinInput === storedPin) {
      this.unlock();
    } else {
      this.showMessage('❌ Mã PIN không chính xác. Vui lòng thử lại!', 'error');
      this.triggerShake();

      // Rung phản hồi lỗi trên thiết bị cảm ứng
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([80, 40, 80]);
        } catch {}
      }

      // Đổi màu viền lỗi tạm thời
      const inputs = document.querySelectorAll<HTMLInputElement>('.pin-digit-box');
      inputs.forEach((inp) => inp.classList.add('error'));
      const dots = document.querySelectorAll('.pin-dot');
      dots.forEach((dot) => dot.classList.add('error'));

      setTimeout(() => {
        inputs.forEach((inp) => inp.classList.remove('error'));
        dots.forEach((dot) => dot.classList.remove('error'));
        this.clearPin();
      }, 600);
    }
  }

  /**
   * Hiệu ứng rung lắc khi sai mã
   */
  private triggerShake(): void {
    const card = document.getElementById('lockerCard');
    if (card) {
      card.classList.remove('shake-animation');
      void card.offsetWidth; // Force reflow
      card.classList.add('shake-animation');
      setTimeout(() => {
        card.classList.remove('shake-animation');
      }, 450);
    }
  }

  /**
   * Hiển thị thông báo phản hồi
   */
  private showMessage(msg: string, type: 'error' | 'success' | 'neutral'): void {
    const feedback = document.getElementById('lockerFeedbackMsg');
    if (!feedback) return;

    feedback.textContent = msg;
    feedback.className = 'locker-feedback-msg';
    if (type === 'error') feedback.classList.add('error');
    if (type === 'success') feedback.classList.add('success');
  }

  /**
   * Xử lý Đổi mã PIN mới trong Modal
   */
  private handleSaveNewPin(): void {
    const oldInput = document.getElementById('oldPinInput') as HTMLInputElement;
    const newInput = document.getElementById('newPinInput') as HTMLInputElement;
    const confirmInput = document.getElementById('confirmPinInput') as HTMLInputElement;
    const msg = document.getElementById('changePinMsg');

    if (!oldInput || !newInput || !confirmInput || !msg) return;

    const oldVal = oldInput.value.trim();
    const newVal = newInput.value.trim();
    const confirmVal = confirmInput.value.trim();

    const storedPin = this.getStoredPin();
    if (oldVal !== storedPin) {
      msg.textContent = '❌ Mã PIN hiện tại không đúng!';
      msg.style.color = '#f87171';
      return;
    }

    if (!/^\d{6}$/.test(newVal)) {
      msg.textContent = '❌ Mã PIN mới phải gồm đúng 6 chữ số (0-9)!';
      msg.style.color = '#f87171';
      return;
    }

    if (newVal !== confirmVal) {
      msg.textContent = '❌ Xác nhận mã PIN mới không khớp!';
      msg.style.color = '#f87171';
      return;
    }

    this.setStoredPin(newVal);
    msg.textContent = '✅ Đã đổi mã PIN thành công!';
    msg.style.color = '#34d399';

    setTimeout(() => {
      document.getElementById('lockerChangePinModal')?.classList.remove('show');
      msg.textContent = '';
      this.clearPin();
      this.showMessage('Đã cập nhật mã PIN mới. Vui lòng nhập để mở khóa.', 'neutral');
    }, 1000);
  }

  /**
   * Khởi động đồng hồ thời gian thực
   */
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
        const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
        const dayName = days[now.getDay()];
        const dateStr = `${dayName}, ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
        dateEl.textContent = `${dateStr} • Ca Trực Bệnh Viện`;
      }
    };

    update();
    this.clockInterval = window.setInterval(update, 1000);
  }
}

// Khởi tạo Singleton
export const cliniScreenLocker = ScreenLockerController.getInstance();

export function initScreenLocker(): void {
  cliniScreenLocker.init();
}

// Gắn vào window để gọi từ các module bên ngoài hoặc console
if (typeof window !== 'undefined') {
  (window as any).CliniScreenLocker = cliniScreenLocker;
  (window as any).lockCliniPortal = () => cliniScreenLocker.lock();
  (window as any).unlockCliniPortal = () => cliniScreenLocker.unlock();
}
