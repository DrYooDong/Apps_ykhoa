/**
 * CliniPortal Screen Locker & Security Controller (screen-locker.ts)
 * Path: src/components/screen-locker.ts
 * 
 * Chức năng:
 * 1. Khóa giao diện bảo mật phiên làm việc y tế tự động khởi động ngay khi người dùng vào web.
 * 2. Mở khóa bằng hình vẽ 9 nút (3x3 Pattern Lock):
 *    - Hỗ trợ mượt mà cả Desktop (kéo chuột, phím số 1-9) và Tablet/Mobile (vuốt cảm ứng chạm).
 *    - Tự động bắt điểm trung gian khi kéo thẳng qua (vd: 1->3 qua 2, 3->7 qua 5, 7->9 qua 8).
 *    - Mặc định: Chữ Z (1-2-3-5-7-8-9). Chấp nhận cả chiều ngược lại khi dùng hình mặc định.
 * 3. Tuyệt đối không hiển thị bất kỳ gợi ý nào làm để lộ mật khẩu.
 * 4. Hỗ trợ Đổi và Lưu Mẫu Hình Mới vào localStorage với quy trình xác thực 3 bước (Hiện tại -> Mới -> Xác nhận).
 * 5. Tích hợp đồng hồ ca trực ICU thời gian thực, phản hồi xúc giác Haptics và hoạt ảnh neon hiện đại.
 */

const STORAGE_KEY_LOCKED = 'cliniportal_screen_locked';
const STORAGE_KEY_PATTERN = 'cliniportal_lock_pattern';
const DEFAULT_PATTERN = '1-2-3-5-7-8-9'; // Mẫu hình chữ Z chuẩn 3x3

/**
 * Bảng tra cứu các điểm trung gian nằm giữa 2 điểm khi vẽ đường thẳng qua
 */
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

/**
 * Component Widget Pattern Lock 9 Nút (Dùng chung cho Màn hình chính & Modal đổi hình)
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

  constructor(options: {
    container: HTMLElement;
    size?: number;
    onComplete: (pattern: number[], patternStr: string) => void;
    onChange?: (pattern: number[]) => void;
  }) {
    this.container = options.container;
    this.size = options.size || 280;
    this.onComplete = options.onComplete;
    this.onChange = options.onChange;

    this.mount();
    this.bindEvents();
  }

  /**
   * Khởi tạo giao diện DOM và SVG của 9 nút
   */
  private mount(): void {
    this.container.innerHTML = `
      <div class="pattern-lock-wrapper" style="width: ${this.size}px; height: ${this.size}px;">
        <svg class="pattern-lock-svg" viewBox="0 0 ${this.size} ${this.size}" preserveAspectRatio="none">
          <g class="pattern-lines-group"></g>
          <line class="pattern-tracker-line" x1="0" y1="0" x2="0" y2="0" style="display: none;"></line>
        </svg>
        <div class="pattern-nodes-grid" role="group" aria-label="Lưới 9 nút mở khóa">
          ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => `
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

  /**
   * Gắn sự kiện Pointer Events (hỗ trợ cả Chuột và Cảm ứng mượt mà)
   */
  private bindEvents(): void {
    if (!this.wrapperEl) return;

    this.wrapperEl.addEventListener('pointerdown', this.handlePointerDown);
    this.wrapperEl.addEventListener('pointermove', this.handlePointerMove);
    this.wrapperEl.addEventListener('pointerup', this.handlePointerUp);
    this.wrapperEl.addEventListener('pointercancel', this.handlePointerUp);
  }

  private handlePointerDown = (e: PointerEvent): void => {
    if (this.isBusy) return;
    e.preventDefault();
    try {
      this.wrapperEl?.setPointerCapture(e.pointerId);
    } catch {}

    this.isDrawing = true;
    this.clear();

    const hit = this.checkHit(e.clientX, e.clientY);
    if (hit !== null) {
      this.addNode(hit);
    }
  };

  private handlePointerMove = (e: PointerEvent): void => {
    if (!this.isDrawing || this.isBusy) return;
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
    } catch {}

    if (this.pattern.length > 0) {
      this.onComplete([...this.pattern], this.pattern.join('-'));
    }
  };

  /**
   * Tính toán va chạm nút theo khoảng cách hình học từ tâm
   */
  private checkHit(clientX: number, clientY: number): number | null {
    for (let i = 0; i < this.nodeEls.length; i++) {
      const node = this.nodeEls[i];
      const idx = i + 1;
      if (this.pattern.includes(idx)) continue;

      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(clientX - cx, clientY - cy);
      const hitRadius = Math.max(rect.width * 0.46, 26);

      if (dist <= hitRadius) {
        return idx;
      }
    }
    return null;
  }

  /**
   * Thêm điểm vào chuỗi mẫu hình (tự động chèn điểm trung gian nếu có)
   */
  public addNode(idx: number): void {
    if (this.pattern.includes(idx)) return;

    if (this.pattern.length > 0) {
      const prev = this.pattern[this.pattern.length - 1];
      const midKey = `${prev}-${idx}`;
      const mid = INTERMEDIATE_MAP[midKey];

      // Nếu kéo qua điểm giữa chưa được kích hoạt, tự động thêm điểm giữa vào
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

  /**
   * Đổi trạng thái hiển thị của nút sang active
   */
  private activateNode(idx: number): void {
    const node = this.nodeEls[idx - 1];
    if (node) {
      node.classList.add('active');
    }
  }

  /**
   * Lấy tọa độ tâm của nút trong không gian tọa độ SVG
   */
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

  /**
   * Vẽ đường thẳng nối giữa 2 điểm
   */
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

  /**
   * Cập nhật đường theo dõi vị trí ngón tay / con trỏ chuột
   */
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

  /**
   * Rung nhẹ phản hồi cảm ứng
   */
  private triggerHaptic(): void {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(18);
      } catch {}
    }
  }

  /**
   * Hiển thị trạng thái lỗi (màu đỏ rose, rung lắc)
   */
  public showError(): void {
    this.isBusy = true;
    if (this.trackerLine) this.trackerLine.style.display = 'none';

    this.wrapperEl?.classList.add('error');
    this.nodeEls.forEach(n => {
      if (n.classList.contains('active')) {
        n.classList.add('error');
      }
    });

    const lines = this.linesGroup?.querySelectorAll('.pattern-line');
    lines?.forEach(l => l.classList.add('error'));

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([70, 40, 70]);
      } catch {}
    }

    setTimeout(() => {
      this.clear();
      this.isBusy = false;
    }, 650);
  }

  /**
   * Hiển thị trạng thái thành công (màu xanh ngọc emerald)
   */
  public showSuccess(): void {
    this.isBusy = true;
    if (this.trackerLine) this.trackerLine.style.display = 'none';

    this.wrapperEl?.classList.add('success');
    this.nodeEls.forEach(n => {
      if (n.classList.contains('active')) {
        n.classList.add('success');
      }
    });

    const lines = this.linesGroup?.querySelectorAll('.pattern-line');
    lines?.forEach(l => l.classList.add('success'));

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([25, 25, 45]);
      } catch {}
    }
  }

  /**
   * Xóa toàn bộ nét vẽ hiện tại
   */
  public clear(): void {
    this.pattern = [];
    if (this.linesGroup) {
      this.linesGroup.innerHTML = '';
    }
    if (this.trackerLine) {
      this.trackerLine.style.display = 'none';
    }
    this.wrapperEl?.classList.remove('error', 'success');
    this.nodeEls.forEach(n => {
      n.classList.remove('active', 'error', 'success');
    });
    this.onChange?.([]);
  }

  /**
   * Hỗ trợ gõ phím từ bàn phím (1-9)
   */
  public addNodeByKey(idx: number): void {
    if (idx >= 1 && idx <= 9) {
      this.addNode(idx);
    }
  }

  /**
   * Xóa điểm cuối cùng vừa nhập
   */
  public removeLastNode(): void {
    if (this.pattern.length === 0) return;
    this.pattern.pop();
    const activeList = [...this.pattern];
    this.clear();
    activeList.forEach(idx => this.addNode(idx));
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
 * Controller Quản Lý Màn Hình Khóa Toàn Hệ Thống
 */
export class ScreenLockerController {
  private static instance: ScreenLockerController;
  private isLocked: boolean = false;
  private clockInterval: number | null = null;

  private mainPatternWidget: PatternLockWidget | null = null;
  private modalPatternWidget: PatternLockWidget | null = null;

  // Trạng thái modal đổi hình: 1 = Nhập hiện tại, 2 = Nhập mới, 3 = Xác nhận
  private changeStep: 1 | 2 | 3 = 1;
  private tempNewPattern: string = '';

  private constructor() {}

  public static getInstance(): ScreenLockerController {
    if (!ScreenLockerController.instance) {
      ScreenLockerController.instance = new ScreenLockerController();
    }
    return ScreenLockerController.instance;
  }

  /**
   * Lấy mã mẫu hình đã lưu trong localStorage (Mặc định: Chữ Z '1-2-3-5-7-8-9')
   */
  public getStoredPattern(): string {
    try {
      return localStorage.getItem(STORAGE_KEY_PATTERN) || DEFAULT_PATTERN;
    } catch {
      return DEFAULT_PATTERN;
    }
  }

  /**
   * Lưu mã mẫu hình mới vào localStorage
   */
  public setStoredPattern(newPattern: string): boolean {
    if (!newPattern || newPattern.length < 3) return false;
    try {
      localStorage.setItem(STORAGE_KEY_PATTERN, newPattern);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Kiểm tra mẫu hình nhập vào có khớp với mẫu hình lưu trữ hay không.
   * Nếu dùng mẫu mặc định chữ Z, chấp nhận cả chiều xuôi và chiều ngược.
   */
  public isPatternValid(patternStr: string): boolean {
    const stored = this.getStoredPattern();
    if (patternStr === stored) return true;

    // Nếu mật khẩu hiện tại là chữ Z mặc định, chấp nhận vẽ ngược từ dưới lên (9-8-7-5-3-2-1)
    if (stored === DEFAULT_PATTERN && patternStr === '9-8-7-5-3-2-1') {
      return true;
    }

    return false;
  }

  /**
   * Khởi tạo component màn hình khóa
   * Khởi động khóa ngay khi vào web theo yêu cầu!
   */
  public init(): void {
    this.ensureLockerHtml();
    this.initPatternWidgets();
    this.attachHeaderButton();
    this.bindEvents();
    this.startClock();

    // Khởi động tính năng khóa ngay khi vào web
    this.lock();
  }

  /**
   * Tạo cấu trúc HTML Màn hình Khóa nếu chưa có
   * Tuyệt đối không có bất kỳ dòng text hay hình ảnh nào để lộ mật khẩu!
   */
  private ensureLockerHtml(): void {
    if (document.getElementById('cliniScreenLocker')) return;

    const lockerHtml = `
      <div class="clini-screen-locker" id="cliniScreenLocker" role="dialog" aria-modal="true" aria-labelledby="lockerPatternTitle">
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

          <!-- Khu vực Mở Khóa Mẫu Hình 9 Nút -->
          <div class="locker-pattern-section">
            <div class="locker-pattern-title" id="lockerPatternTitle">
              <i class="fa-solid fa-circle-nodes" style="color: #38bdf8;"></i>
              <span>Vẽ mẫu hình 9 nút để mở khóa</span>
            </div>
            <div class="locker-pattern-subtitle">
              Chạm hoặc kéo chuột để nối các điểm
            </div>

            <!-- Khung chứa Widget Pattern Lock chính -->
            <div id="mainPatternContainer" class="main-pattern-mount"></div>

            <!-- Thông báo phản hồi trạng thái -->
            <div class="locker-feedback-msg" id="lockerFeedbackMsg" role="status" aria-live="polite"></div>
          </div>

          <!-- Các nút hành động & Trợ giúp (TUYỆT ĐỐI KHÔNG HIỆN GỢI Ý MẬT KHẨU) -->
          <div class="locker-actions">
            <div class="locker-quick-btns">
              <button type="button" class="locker-clear-btn" id="mainClearPatternBtn">
                <i class="fa-solid fa-rotate-left"></i>
                <span>Xóa vẽ lại</span>
              </button>
            </div>

            <div class="locker-helpers">
              <div class="locker-security-hint">
                <i class="fa-solid fa-fingerprint"></i>
                <span>Bảo mật thiết bị lâm sàng</span>
              </div>
              <button type="button" class="locker-link-btn" id="lockerOpenChangePatternBtn">
                <i class="fa-solid fa-key"></i>
                <span>Đổi hình vẽ mở khóa</span>
              </button>
            </div>
          </div>

          <!-- Modal con Đổi Mẫu Hình 9 Nút Bảo Mật (3 Bước Chuẩn) -->
          <div class="locker-change-modal" id="lockerChangePatternModal" role="dialog" aria-modal="true" aria-labelledby="changePatternTitle">
            <div class="change-pattern-card">
              <div class="change-pattern-header">
                <div class="change-pattern-icon"><i class="fa-solid fa-shield-halved"></i></div>
                <h3 class="change-pattern-title" id="changePatternTitle">Đổi Mẫu Hình 9 Nút</h3>
                
                <!-- Thanh tiến trình 3 bước -->
                <div class="change-pattern-steps">
                  <span class="change-step-pill active" id="stepPill1">1. Hiện tại</span>
                  <span class="change-step-pill" id="stepPill2">2. Hình mới</span>
                  <span class="change-step-pill" id="stepPill3">3. Xác nhận</span>
                </div>

                <!-- Hướng dẫn từng bước -->
                <div class="change-pattern-guide" id="changePatternGuide">
                  Vẽ mẫu hình hiện tại để xác thực
                </div>
              </div>

              <!-- Lưới Pattern Lock nhỏ trong Modal -->
              <div class="modal-pattern-container">
                <div id="modalPatternContainer" class="modal-pattern-mount"></div>
              </div>

              <div class="locker-feedback-msg" id="changePatternMsg" role="status" aria-live="polite"></div>

              <div class="change-pattern-actions">
                <button type="button" class="change-btn-cancel" id="cancelChangePatternBtn">
                  <i class="fa-solid fa-xmark"></i> Hủy
                </button>
                <button type="button" class="change-btn-retry" id="modalClearPatternBtn">
                  <i class="fa-solid fa-rotate-left"></i> Vẽ lại bước này
                </button>
              </div>

              <button type="button" class="change-pattern-reset-link" id="modalResetDefaultPatternBtn">
                Đặt lại về mẫu hình mặc định
              </button>
            </div>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', lockerHtml);
  }

  /**
   * Khởi tạo các instance PatternLockWidget
   */
  private initPatternWidgets(): void {
    const mainContainer = document.getElementById('mainPatternContainer');
    if (mainContainer) {
      const widgetSize = window.innerWidth <= 380 ? 236 : (window.innerWidth <= 768 ? 270 : 280);
      this.mainPatternWidget = new PatternLockWidget({
        container: mainContainer,
        size: widgetSize,
        onComplete: (_pattern, patternStr) => {
          this.verifyMainPattern(patternStr);
        }
      });
    }

    const modalContainer = document.getElementById('modalPatternContainer');
    if (modalContainer) {
      const modalWidgetSize = window.innerWidth <= 380 ? 190 : 220;
      this.modalPatternWidget = new PatternLockWidget({
        container: modalContainer,
        size: modalWidgetSize,
        onComplete: (pattern, patternStr) => {
          this.handleModalPatternComplete(pattern, patternStr);
        }
      });
    }
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
   * Gắn các sự kiện điều khiển màn hình khóa và modal
   */
  private bindEvents(): void {
    // 1. Nút Xóa vẽ lại trên màn hình chính
    const mainClearBtn = document.getElementById('mainClearPatternBtn');
    if (mainClearBtn) {
      mainClearBtn.addEventListener('click', () => {
        this.mainPatternWidget?.clear();
        this.showMessage('', 'neutral');
      });
    }

    // 2. Mở Modal Đổi mẫu hình
    const openChangeModalBtn = document.getElementById('lockerOpenChangePatternBtn');
    if (openChangeModalBtn) {
      openChangeModalBtn.addEventListener('click', () => {
        this.openChangePatternModal();
      });
    }

    // 3. Đóng Modal
    const cancelChangeModalBtn = document.getElementById('cancelChangePatternBtn');
    if (cancelChangeModalBtn) {
      cancelChangeModalBtn.addEventListener('click', () => {
        this.closeChangePatternModal();
      });
    }

    // 4. Vẽ lại bước hiện tại trong modal
    const modalClearBtn = document.getElementById('modalClearPatternBtn');
    if (modalClearBtn) {
      modalClearBtn.addEventListener('click', () => {
        this.modalPatternWidget?.clear();
        const msg = document.getElementById('changePatternMsg');
        if (msg) msg.textContent = '';
      });
    }

    // 5. Đặt lại về mặc định
    const resetDefaultBtn = document.getElementById('modalResetDefaultPatternBtn');
    if (resetDefaultBtn) {
      resetDefaultBtn.addEventListener('click', () => {
        if (window.confirm('Bạn có chắc muốn đặt lại mẫu hình mở khóa về mặc định không?')) {
          this.setStoredPattern(DEFAULT_PATTERN);
          const msg = document.getElementById('changePatternMsg');
          if (msg) {
            msg.textContent = '✅ Đã đặt lại về mẫu hình mặc định thành công!';
            msg.style.color = '#34d399';
          }
          setTimeout(() => {
            this.closeChangePatternModal();
            this.showMessage('Đã đặt lại về mẫu hình mặc định.', 'neutral');
          }, 800);
        }
      });
    }

    // 6. Hỗ trợ phím số 1-9 và Enter trên bàn phím Laptop
    document.addEventListener('keydown', (e) => {
      if (!this.isLocked) return;

      // Chặn Escape không cho đóng màn hình khóa chính
      if (e.key === 'Escape') {
        const modal = document.getElementById('lockerChangePatternModal');
        if (modal?.classList.contains('show')) {
          this.closeChangePatternModal();
        }
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const modal = document.getElementById('lockerChangePatternModal');
      const isModalOpen = modal?.classList.contains('show');

      // Nhập phím số 1-9
      if (/^[1-9]$/.test(e.key)) {
        const num = parseInt(e.key, 10);
        if (isModalOpen) {
          this.modalPatternWidget?.addNodeByKey(num);
        } else {
          this.mainPatternWidget?.addNodeByKey(num);
        }
      } else if (e.key === 'Enter') {
        if (isModalOpen) {
          const pat = this.modalPatternWidget?.getPattern() || [];
          if (pat.length > 0) {
            this.handleModalPatternComplete(pat, pat.join('-'));
          }
        } else {
          const pat = this.mainPatternWidget?.getPattern() || [];
          if (pat.length > 0) {
            this.verifyMainPattern(pat.join('-'));
          }
        }
      } else if (e.key === 'Backspace') {
        if (isModalOpen) {
          this.modalPatternWidget?.removeLastNode();
        } else {
          this.mainPatternWidget?.removeLastNode();
        }
      }
    });

    // Tự động điều chỉnh kích thước khi xoay màn hình hoặc resize
    window.addEventListener('resize', () => {
      if (!this.isLocked) return;
      // Tránh tái khởi tạo liên tục, widget tự co dãn theo CSS aspect-ratio
    });
  }

  /**
   * Xác thực mẫu hình mở khóa trên Màn hình chính
   */
  private verifyMainPattern(patternStr: string): void {
    if (this.isPatternValid(patternStr)) {
      this.mainPatternWidget?.showSuccess();
      this.unlock();
    } else {
      this.mainPatternWidget?.showError();
      this.triggerShake();
      this.showMessage('❌ Mẫu hình không chính xác. Vui lòng vẽ lại!', 'error');
    }
  }

  /**
   * Xử lý quy trình đổi mẫu hình 3 bước trong Modal
   */
  private handleModalPatternComplete(pattern: number[], patternStr: string): void {
    const msg = document.getElementById('changePatternMsg');
    const guide = document.getElementById('changePatternGuide');

    if (this.changeStep === 1) {
      // BƯỚC 1: Xác nhận mẫu hình hiện tại
      if (this.isPatternValid(patternStr)) {
        this.modalPatternWidget?.showSuccess();
        if (msg) {
          msg.textContent = '✅ Xác thực thành công! Hãy vẽ hình mới.';
          msg.style.color = '#34d399';
        }

        setTimeout(() => {
          this.changeStep = 2;
          this.updateChangeStepUI();
          this.modalPatternWidget?.clear();
          if (msg) msg.textContent = '';
        }, 450);
      } else {
        this.modalPatternWidget?.showError();
        if (msg) {
          msg.textContent = '❌ Mẫu hình hiện tại không đúng. Vui lòng vẽ lại!';
          msg.style.color = '#f87171';
        }
      }
    } else if (this.changeStep === 2) {
      // BƯỚC 2: Vẽ mẫu hình mới (tối thiểu 4 điểm)
      if (pattern.length < 4) {
        this.modalPatternWidget?.showError();
        if (msg) {
          msg.textContent = '⚠️ Mẫu hình quá ngắn! Vui lòng nối ít nhất 4 điểm.';
          msg.style.color = '#fbbf24';
        }
        return;
      }

      this.tempNewPattern = patternStr;
      this.modalPatternWidget?.showSuccess();
      if (msg) {
        msg.textContent = '✅ Mẫu hình hợp lệ. Hãy vẽ lại để xác nhận.';
        msg.style.color = '#34d399';
      }

      setTimeout(() => {
        this.changeStep = 3;
        this.updateChangeStepUI();
        this.modalPatternWidget?.clear();
        if (msg) msg.textContent = '';
      }, 450);
    } else if (this.changeStep === 3) {
      // BƯỚC 3: Vẽ lại để xác nhận
      if (patternStr === this.tempNewPattern) {
        this.modalPatternWidget?.showSuccess();
        this.setStoredPattern(this.tempNewPattern);

        if (msg) {
          msg.textContent = '🎉 Đã lưu thay đổi mẫu hình 9 nút thành công!';
          msg.style.color = '#34d399';
        }

        setTimeout(() => {
          this.closeChangePatternModal();
          this.showMessage('Đã lưu mẫu hình mới. Hãy vẽ để mở khóa.', 'neutral');
        }, 900);
      } else {
        this.modalPatternWidget?.showError();
        if (msg) {
          msg.textContent = '❌ Mẫu hình xác nhận không khớp! Quay lại vẽ hình mới...';
          msg.style.color = '#f87171';
        }

        setTimeout(() => {
          this.changeStep = 2;
          this.updateChangeStepUI();
          this.modalPatternWidget?.clear();
          if (msg) msg.textContent = '';
        }, 850);
      }
    }
  }

  /**
   * Cập nhật UI hướng dẫn và pills trạng thái của Modal
   */
  private updateChangeStepUI(): void {
    const pill1 = document.getElementById('stepPill1');
    const pill2 = document.getElementById('stepPill2');
    const pill3 = document.getElementById('stepPill3');
    const guide = document.getElementById('changePatternGuide');

    if (!pill1 || !pill2 || !pill3 || !guide) return;

    pill1.className = 'change-step-pill';
    pill2.className = 'change-step-pill';
    pill3.className = 'change-step-pill';

    if (this.changeStep === 1) {
      pill1.classList.add('active');
      guide.textContent = 'Vẽ mẫu hình hiện tại để xác thực';
    } else if (this.changeStep === 2) {
      pill1.classList.add('completed');
      pill2.classList.add('active');
      guide.textContent = 'Vẽ mẫu hình mới (nối ít nhất 4 điểm)';
    } else if (this.changeStep === 3) {
      pill1.classList.add('completed');
      pill2.classList.add('completed');
      pill3.classList.add('active');
      guide.textContent = 'Vẽ lại mẫu hình mới để xác nhận';
    }
  }

  /**
   * Mở Modal Đổi mẫu hình
   */
  private openChangePatternModal(): void {
    const modal = document.getElementById('lockerChangePatternModal');
    if (!modal) return;

    this.changeStep = 1;
    this.tempNewPattern = '';
    this.updateChangeStepUI();
    this.modalPatternWidget?.clear();

    const msg = document.getElementById('changePatternMsg');
    if (msg) msg.textContent = '';

    modal.classList.add('show');
  }

  /**
   * Đóng Modal Đổi mẫu hình
   */
  private closeChangePatternModal(): void {
    const modal = document.getElementById('lockerChangePatternModal');
    if (modal) {
      modal.classList.remove('show');
    }
    this.changeStep = 1;
    this.tempNewPattern = '';
    this.modalPatternWidget?.clear();
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

    this.mainPatternWidget?.clear();
    this.showMessage('', 'neutral');
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
      this.mainPatternWidget?.clear();
      this.showMessage('', 'neutral');
    }, 380);
  }

  /**
   * Hiệu ứng rung lắc khi sai hình
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
