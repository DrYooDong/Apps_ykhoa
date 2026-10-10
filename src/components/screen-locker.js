/**
 * CliniPortal Screen Locker & Security Controller (screen-locker.js)
 * Standalone Vanilla JS Engine — Hoạt động 100% trên cả file:/// offline, Localhost và GitHub Pages.
 */

(function () {
  'use strict';

  const STORAGE_KEY_LOCKED = 'cliniportal_screen_locked';
  const STORAGE_KEY_PIN = 'cliniportal_lock_pin';
  const DEFAULT_PIN = '123456';

  let currentPinInput = '';
  let isMasked = true;
  let isLocked = false;
  let clockInterval = null;

  function getStoredPin() {
    try {
      return localStorage.getItem(STORAGE_KEY_PIN) || DEFAULT_PIN;
    } catch (e) {
      return DEFAULT_PIN;
    }
  }

  function setStoredPin(newPin) {
    if (!/^\d{6}$/.test(newPin)) return false;
    try {
      localStorage.setItem(STORAGE_KEY_PIN, newPin);
      return true;
    } catch (e) {
      return false;
    }
  }

  function ensureLockerHtml() {
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

  function syncInputsToPinString() {
    const inputs = document.querySelectorAll('.pin-digit-box');
    let str = '';
    inputs.forEach(function (inp) {
      str += inp.value ? inp.value[0] : '';
    });
    currentPinInput = str;
    updateDots();
  }

  function syncPinStringToInputs() {
    const inputs = document.querySelectorAll('.pin-digit-box');
    inputs.forEach(function (inp, idx) {
      inp.value = currentPinInput[idx] || '';
    });
    updateDots();
  }

  function updateDots() {
    const dots = document.querySelectorAll('.pin-dot');
    dots.forEach(function (dot, idx) {
      if (idx < currentPinInput.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled');
      }
    });
  }

  function clearPin() {
    currentPinInput = '';
    const inputs = document.querySelectorAll('.pin-digit-box');
    inputs.forEach(function (inp) {
      inp.value = '';
    });
    updateDots();
    if (window.innerWidth > 768 && inputs[0]) {
      inputs[0].focus();
    }
  }

  function showMessage(msg, type) {
    const feedback = document.getElementById('lockerFeedbackMsg');
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.className = 'locker-feedback-msg';
    if (type === 'error') feedback.classList.add('error');
    if (type === 'success') feedback.classList.add('success');
  }

  function triggerShake() {
    const card = document.getElementById('lockerCard');
    if (card) {
      card.classList.remove('shake-animation');
      void card.offsetWidth;
      card.classList.add('shake-animation');
      setTimeout(function () {
        card.classList.remove('shake-animation');
      }, 450);
    }
  }

  function lock() {
    ensureLockerHtml();
    isLocked = true;
    const locker = document.getElementById('cliniScreenLocker');
    if (locker) {
      locker.classList.add('active');
    }
    document.body.style.overflow = 'hidden';

    try {
      sessionStorage.setItem(STORAGE_KEY_LOCKED, 'true');
    } catch (e) {}

    clearPin();
    showMessage('', 'neutral');

    setTimeout(function () {
      const firstInput = document.querySelector('.pin-digit-box');
      if (firstInput && window.innerWidth > 768) {
        firstInput.focus();
      }
    }, 150);
  }

  function unlock() {
    isLocked = false;
    const locker = document.getElementById('cliniScreenLocker');
    const icon = document.getElementById('lockerIconMain');

    if (icon) {
      icon.className = 'fa-solid fa-lock-open';
    }

    showMessage('✅ Xác thực thành công! Đang vào phiên...', 'success');

    const inputs = document.querySelectorAll('.pin-digit-box');
    inputs.forEach(function (inp) { inp.classList.add('success'); });
    const dots = document.querySelectorAll('.pin-dot');
    dots.forEach(function (dot) { dot.classList.add('success'); });

    try {
      sessionStorage.setItem(STORAGE_KEY_LOCKED, 'false');
    } catch (e) {}

    setTimeout(function () {
      if (locker) {
        locker.classList.remove('active');
      }
      document.body.style.overflow = '';
      if (icon) {
        icon.className = 'fa-solid fa-lock';
      }
      inputs.forEach(function (inp) { inp.classList.remove('success'); });
      dots.forEach(function (dot) { dot.classList.remove('success'); });
      clearPin();
      showMessage('', 'neutral');
    }, 380);
  }

  function verifyPin() {
    if (currentPinInput.length < 6) {
      showMessage('Vui lòng nhập đủ 6 chữ số!', 'error');
      triggerShake();
      return;
    }

    const stored = getStoredPin();
    if (currentPinInput === stored) {
      unlock();
    } else {
      showMessage('❌ Mã PIN không chính xác. Vui lòng thử lại!', 'error');
      triggerShake();

      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([80, 40, 80]);
        } catch (e) {}
      }

      const inputs = document.querySelectorAll('.pin-digit-box');
      inputs.forEach(function (inp) { inp.classList.add('error'); });
      const dots = document.querySelectorAll('.pin-dot');
      dots.forEach(function (dot) { dot.classList.add('error'); });

      setTimeout(function () {
        inputs.forEach(function (inp) { inp.classList.remove('error'); });
        dots.forEach(function (dot) { dot.classList.remove('error'); });
        clearPin();
      }, 600);
    }
  }

  function handleSaveNewPin() {
    const oldInput = document.getElementById('oldPinInput');
    const newInput = document.getElementById('newPinInput');
    const confirmInput = document.getElementById('confirmPinInput');
    const msg = document.getElementById('changePinMsg');

    if (!oldInput || !newInput || !confirmInput || !msg) return;

    const oldVal = oldInput.value.trim();
    const newVal = newInput.value.trim();
    const confirmVal = confirmInput.value.trim();

    const storedPin = getStoredPin();
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

    setStoredPin(newVal);
    msg.textContent = '✅ Đã đổi mã PIN thành công!';
    msg.style.color = '#34d399';

    setTimeout(function () {
      const modal = document.getElementById('lockerChangePinModal');
      if (modal) modal.classList.remove('show');
      msg.textContent = '';
      clearPin();
      showMessage('Đã cập nhật mã PIN mới. Vui lòng nhập để mở khóa.', 'neutral');
    }, 1000);
  }

  function startClock() {
    if (clockInterval) return;

    function update() {
      const now = new Date();
      const timeEl = document.getElementById('lockerClockTime');
      const dateEl = document.getElementById('lockerClockDate');

      if (timeEl) {
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        timeEl.textContent = h + ':' + m + ':' + s;
      }

      if (dateEl) {
        const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
        const dayName = days[now.getDay()];
        const dateStr = dayName + ', ' + String(now.getDate()).padStart(2, '0') + '/' + String(now.getMonth() + 1).padStart(2, '0') + '/' + now.getFullYear();
        dateEl.textContent = dateStr + ' • Ca Trực Bệnh Viện';
      }
    }

    update();
    clockInterval = setInterval(update, 1000);
  }

  function bindEvents() {
    // 1. Click nút Khóa trên Header
    document.addEventListener('click', function (e) {
      const lockBtn = e.target.closest('#headerLockBtn, .trigger-screen-lock, [data-action="lock-screen"]');
      if (lockBtn) {
        e.preventDefault();
        lock();
      }
    });

    // 2. 6 Ô input số cho Laptop
    const inputs = document.querySelectorAll('.pin-digit-box');
    inputs.forEach(function (input, index) {
      input.addEventListener('input', function () {
        const val = input.value.replace(/\D/g, '');
        input.value = val ? val[0] : '';
        syncInputsToPinString();

        if (val && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }

        if (currentPinInput.length === 6) {
          verifyPin();
        }
      });

      input.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace') {
          if (!input.value && index > 0) {
            inputs[index - 1].focus();
            inputs[index - 1].value = '';
            syncInputsToPinString();
          }
        } else if (e.key === 'ArrowLeft' && index > 0) {
          inputs[index - 1].focus();
        } else if (e.key === 'ArrowRight' && index < inputs.length - 1) {
          inputs[index + 1].focus();
        } else if (e.key === 'Enter') {
          verifyPin();
        }
      });

      input.addEventListener('paste', function (e) {
        e.preventDefault();
        const pasted = ((e.clipboardData && e.clipboardData.getData('text')) || '').replace(/\D/g, '').slice(0, 6);
        if (pasted) {
          for (let i = 0; i < 6; i++) {
            if (inputs[i]) inputs[i].value = pasted[i] || '';
          }
          syncInputsToPinString();
          const nextIdx = Math.min(pasted.length, 5);
          if (inputs[nextIdx]) inputs[nextIdx].focus();
          if (pasted.length === 6) verifyPin();
        }
      });
    });

    // 2b. Điều hướng phím Laptop toàn cục
    document.addEventListener('keydown', function (e) {
      if (!isLocked) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (window.innerWidth > 768) {
        const isAlreadyInPinBox = document.activeElement && document.activeElement.classList.contains('pin-digit-box');
        const isInChangePinModal = document.activeElement && document.activeElement.closest('#lockerChangePinModal');

        if (isInChangePinModal) return;

        if (!isAlreadyInPinBox && /^[0-9]$/.test(e.key)) {
          if (currentPinInput.length < 6) {
            currentPinInput += e.key;
            syncPinStringToInputs();
            const nextIdx = Math.min(currentPinInput.length, 5);
            if (inputs[nextIdx]) inputs[nextIdx].focus();
            if (currentPinInput.length === 6) verifyPin();
          }
        } else if (!isAlreadyInPinBox && e.key === 'Backspace') {
          if (currentPinInput.length > 0) {
            currentPinInput = currentPinInput.slice(0, -1);
            syncPinStringToInputs();
            const nextIdx = Math.max(currentPinInput.length, 0);
            if (inputs[nextIdx]) inputs[nextIdx].focus();
          }
        } else if (!isAlreadyInPinBox && e.key === 'Enter') {
          verifyPin();
        }
      }
    });

    // 3. Bàn phím số 9 nút cảm ứng (Keypad) cho Mobile & Tablet
    const keypad = document.getElementById('lockerKeypad');
    if (keypad) {
      keypad.addEventListener('click', function (e) {
        const btn = e.target.closest('.keypad-btn');
        if (!btn) return;

        const key = btn.getAttribute('data-key');
        const action = btn.getAttribute('data-action');

        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate(25);
          } catch (err) {}
        }

        if (key !== null) {
          if (currentPinInput.length < 6) {
            currentPinInput += key;
            syncPinStringToInputs();
            if (currentPinInput.length === 6) {
              verifyPin();
            }
          }
        } else if (action === 'backspace') {
          if (currentPinInput.length > 0) {
            currentPinInput = currentPinInput.slice(0, -1);
            syncPinStringToInputs();
          }
        } else if (action === 'clear') {
          clearPin();
        }
      });
    }

    // 4. Nút Unlock
    const unlockBtn = document.getElementById('lockerUnlockBtn');
    if (unlockBtn) {
      unlockBtn.addEventListener('click', function () {
        verifyPin();
      });
    }

    // 5. Toggle Xem/Ẩn PIN
    const toggleEyeBtn = document.getElementById('pinToggleVisibilityBtn');
    if (toggleEyeBtn) {
      toggleEyeBtn.addEventListener('click', function () {
        isMasked = !isMasked;
        const icon = document.getElementById('pinToggleEyeIcon');
        const text = document.getElementById('pinToggleEyeText');
        inputs.forEach(function (inp) {
          if (isMasked) {
            inp.type = 'password';
            inp.classList.remove('show-text');
          } else {
            inp.type = 'text';
            inp.classList.add('show-text');
          }
        });
        if (icon && text) {
          icon.className = isMasked ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
          text.textContent = isMasked ? 'Hiện mã' : 'Ẩn mã';
        }
      });
    }

    // 6. Modal Đổi mã PIN
    const openChangePinBtn = document.getElementById('lockerOpenChangePinBtn');
    if (openChangePinBtn) {
      openChangePinBtn.addEventListener('click', function () {
        const modal = document.getElementById('lockerChangePinModal');
        if (modal) {
          modal.classList.add('show');
          const oldInput = document.getElementById('oldPinInput');
          if (oldInput) {
            oldInput.value = '';
            oldInput.focus();
          }
        }
      });
    }

    const cancelChangePinBtn = document.getElementById('cancelChangePinBtn');
    if (cancelChangePinBtn) {
      cancelChangePinBtn.addEventListener('click', function () {
        const modal = document.getElementById('lockerChangePinModal');
        if (modal) modal.classList.remove('show');
      });
    }

    const saveNewPinBtn = document.getElementById('saveNewPinBtn');
    if (saveNewPinBtn) {
      saveNewPinBtn.addEventListener('click', function () {
        handleSaveNewPin();
      });
    }
  }

  function init() {
    ensureLockerHtml();
    bindEvents();
    startClock();

    // Tự động khởi động khóa màn hình ngay khi vào web
    lock();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose global methods
  window.CliniScreenLocker = {
    lock: lock,
    unlock: unlock,
    getPin: getStoredPin,
    setPin: setStoredPin,
    isLocked: function () { return isLocked; }
  };
})();

// ES Module Bundler compatibility exports
export const cliniScreenLocker = typeof window !== 'undefined' ? window.CliniScreenLocker : null;
export function initScreenLocker() {
  if (typeof window !== 'undefined' && window.CliniScreenLocker) {
    // Locker is already bound & initialized
  }
}
