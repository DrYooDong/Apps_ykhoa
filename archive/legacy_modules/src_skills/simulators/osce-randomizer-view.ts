/**
 * CliniPortal — OSCE Randomizer & Station Simulator SPA View (TypeScript)
 * Path: src/content/skills/simulators/osce-randomizer-view.ts
 */

export function renderOsceRandomizerView(): string {
  return `
    <div class="osce-randomizer-container animate-fade-in" style="max-width: 1200px; margin: 0 auto; padding: 1.5rem 1rem;">
      <!-- Breadcrumb & Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
        <div>
          <div style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 0.25rem;">
            <a href="#/skills" style="color: var(--color-primary, #0284c7); text-decoration: none;"><i class="fa-solid fa-chevron-left"></i> Kỹ Năng Lâm Sàng</a> / OSCE Randomizer
          </div>
          <h1 style="font-size: 2rem; font-weight: 800; color: #7c3aed; margin: 0; display: flex; align-items: center; gap: 0.75rem;">
            <i class="fa-solid fa-dice"></i> OSCE Station Randomizer & Countdown Timer
          </h1>
          <p style="font-size: 0.95rem; color: var(--color-text-muted, #64748b); margin: 0.25rem 0 0 0;">
            Trình bốc thăm trạm thi OSCE ngẫu nhiên theo chuyên khoa, đếm ngược thời gian thi 5-7 phút chuẩn hóa và bảng kiểm đánh giá năng lực.
          </p>
        </div>
        
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <a href="#/skills/benh-nhan-ao" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-user-doctor"></i> Bệnh Nhân Ảo
          </a>
          <a href="#/skills" class="btn btn-outline" style="padding: 0.5rem 1rem; border-radius: 8px; border: 1px solid var(--color-border, #e2e8f0); color: var(--color-text, #334155); text-decoration: none; font-size: 0.875rem; font-weight: 600;">
            <i class="fa-solid fa-arrow-left"></i> Skills Hub
          </a>
        </div>
      </div>

      <!-- Controls & Station Card Grid -->
      <div style="display: grid; grid-template-columns: 340px 1fr; gap: 1.5rem;">
        
        <!-- Controls & Timer -->
        <div style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--color-text, #0f172a); margin-bottom: 1rem;">
              <i class="fa-solid fa-sliders" style="color: #7c3aed;"></i> Tùy Chọn Trạm Thi
            </h3>

            <div style="margin-bottom: 1rem;">
              <label style="font-size: 0.85rem; font-weight: 600; color: #334155; display: block; margin-bottom: 0.4rem;">Chuyên khoa thi:</label>
              <select id="osce-specialty-select" style="width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 8px;">
                <option value="all">Tất cả chuyên khoa</option>
                <option value="noi">Nội Khoa (Tim mạch, Hô hấp, Tiêu hóa, Thần kinh)</option>
                <option value="cc">Hồi Sức Cấp Cứu & Thủ Thuật</option>
                <option value="cls">Đọc Kết Quả Cận Lâm Sàng</option>
              </select>
            </div>

            <button onclick="window.drawRandomOsceStation()" style="width: 100%; padding: 0.85rem; background: #7c3aed; color: #fff; border: none; border-radius: 8px; font-weight: 700; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 1.5rem; box-shadow: 0 4px 12px rgba(124,58,237,0.25);">
              <i class="fa-solid fa-shuffle"></i> BỐC THĂM TRẠM THI
            </button>

            <!-- Countdown Timer -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; text-align: center;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Đồng Hồ Đếm Ngược OSCE</div>
              <div id="osce-timer-display" style="font-size: 2.75rem; font-weight: 800; color: #0284c7; margin: 0.5rem 0;">05:00</div>
              <div style="display: flex; gap: 0.5rem; justify-content: center;">
                <button id="osce-timer-btn" onclick="window.toggleOsceTimer()" style="padding: 0.4rem 0.85rem; background: #0284c7; color: #fff; border: none; border-radius: 6px; font-weight: 600; font-size: 0.85rem; cursor: pointer;">
                  <i class="fa-solid fa-play"></i> Bắt đầu
                </button>
                <button onclick="window.resetOsceTimer()" style="padding: 0.4rem 0.85rem; background: #e2e8f0; color: #475569; border: none; border-radius: 6px; font-weight: 600; font-size: 0.85rem; cursor: pointer;">
                  <i class="fa-solid fa-rotate-left"></i> Đặt lại
                </button>
              </div>
            </div>
          </div>

          <div style="background: #fdf4ff; border-left: 3px solid #7c3aed; padding: 0.75rem; border-radius: 0 6px 6px 0; font-size: 0.8rem; color: #334155; margin-top: 1rem;">
            💡 <strong>Quy tắc thi OSCE:</strong> Mỗi trạm thi kéo dài 5 phút (chuông 1 báo chuẩn bị, chuông 2 vào thi, chuông 3 kết thúc chuyển trạm).
          </div>
        </div>

        <!-- Station Details Box -->
        <div id="osce-station-content" style="background: var(--color-surface, #fff); border: 1px solid var(--color-border, #e2e8f0); border-radius: 12px; padding: 1.75rem; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
              <span id="station-badge" style="background: #ede9fe; color: #7c3aed; font-size: 0.8rem; font-weight: 700; padding: 0.25rem 0.65rem; border-radius: 6px; text-transform: uppercase;">
                Trạm Khám Tim Mạch
              </span>
              <span style="font-size: 0.85rem; color: #64748b; font-weight: 600;">Thời gian: 5 phút / Thang điểm: 100</span>
            </div>

            <h2 id="station-title" style="font-size: 1.4rem; font-weight: 800; color: var(--color-text, #0f172a); margin: 0 0 0.5rem 0; line-height: 1.3;">
              Khám Thực Thể Tim Mạch & Đánh Giá Tiếng Thổi Tâm Thu
            </h2>

            <div style="background: #f8fafc; border-radius: 8px; padding: 1rem; margin-bottom: 1.25rem;">
              <h4 style="font-size: 0.85rem; font-weight: 700; color: #0284c7; margin: 0 0 0.25rem 0; text-transform: uppercase;">Tình huống lâm sàng:</h4>
              <p id="station-scenario" style="font-size: 0.9rem; color: #334155; margin: 0; line-height: 1.5;">
                Bệnh nhân nam 58 tuổi, vào viện vì khó thở khi gắng sức kèm hồi hộp đánh trống ngực. Thí sinh hãy tiến hành khám tim có hệ thống theo 4 bước Nhìn - Sờ - Gõ - Nghe và biện luận kết quả cho giám khảo.
              </p>
            </div>

            <div>
              <h4 style="font-size: 0.9rem; font-weight: 700; color: #334155; margin: 0 0 0.5rem 0;">📋 Bảng Kiểm Đánh Giá Kỹ Năng (OSCE Checklist):</h4>
              <ul id="station-checklist" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem;">
                <li style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #334155;">
                  <input type="checkbox" style="width: 16px; height: 16px;" /> 1. Chào hỏi bệnh nhân, giải thích mục đích và bộc lộ lồng ngực đúng cách (10đ)
                </li>
                <li style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #334155;">
                  <input type="checkbox" style="width: 16px; height: 16px;" /> 2. Nhìn lồng ngực: Biến dạng lồng ngực, tuần hoàn bàng hệ, sẹo mổ tim, mỏm tim đập (15đ)
                </li>
                <li style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #334155;">
                  <input type="checkbox" style="width: 16px; height: 16px;" /> 3. Sờ mỏm tim (vị trí, diện đập), dấu hiệu Harzer, dấu hiệu nảy của thất phải, rung miêu (25đ)
                </li>
                <li style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #334155;">
                  <input type="checkbox" style="width: 16px; height: 16px;" /> 4. Nghe đủ 5 ổ van tim chuẩn (Mỏm, KLS IV-V bờ T, KLS III bờ T Erb, KLS II bờ T, KLS II bờ P) (35đ)
                </li>
                <li style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #334155;">
                  <input type="checkbox" style="width: 16px; height: 16px;" /> 5. Báo cáo kết quả rõ ràng, kết luận chính xác tiếng thổi & thái độ ân cần với người bệnh (15đ)
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;
}

// Global Window Bindings
declare global {
  interface Window {
    drawRandomOsceStation: () => void;
    toggleOsceTimer: () => void;
    resetOsceTimer: () => void;
  }
}

let osceSeconds = 300;
let osceTimerInterval: any = null;
let isOsceRunning = false;

if (typeof window !== 'undefined') {
  const STATIONS = [
    {
      badge: 'Trạm Khám Tim Mạch',
      title: 'Khám Thực Thể Tim Mạch & Đánh Giá Tiếng Thổi Tâm Thu',
      scenario: 'Bệnh nhân nam 58 tuổi, vào viện vì khó thở khi gắng sức kèm hồi hộp đánh trống ngực. Thí sinh hãy tiến hành khám tim có hệ thống theo 4 bước Nhìn - Sờ - Gõ - Nghe và biện luận kết quả cho giám khảo.',
      checks: [
        '1. Chào hỏi bệnh nhân, giải thích mục đích và bộc lộ lồng ngực đúng cách (10đ)',
        '2. Nhìn lồng ngực: Biến dạng lồng ngực, tuần hoàn bàng hệ, sẹo mổ tim, mỏm tim đập (15đ)',
        '3. Sờ mỏm tim (vị trí, diện đập), dấu hiệu Harzer, dấu hiệu nảy của thất phải, rung miêu (25đ)',
        '4. Nghe đủ 5 ổ van tim chuẩn (Mỏm, KLS IV-V bờ T, KLS III bờ T Erb, KLS II bờ T, KLS II bờ P) (35đ)',
        '5. Báo cáo kết quả rõ ràng, kết luận chính xác tiếng thổi & thái độ ân cần với người bệnh (15đ)'
      ]
    },
    {
      badge: 'Trạm Hồi Sức Cấp Cứu',
      title: 'Cấp Cứu Sốc Phản Vệ Nguy Kịch & Tiêm Adrenaline Bắp',
      scenario: 'Bệnh nhân nữ 24 tuổi xuất hiện khó thở thanh quản dữ dội, SpO2 84%, huyết áp tụt 70/40 mmHg ngay sau khi tiêm kháng sinh Ceftriaxone. Thí sinh hãy xử trí cấp cứu ngay.',
      checks: [
        '1. Nhận định ngay sốc phản vệ Độ 3 - Nguy kịch (Ngừng ngay đường truyền dị nguyên) (20đ)',
        '2. Chỉ định tiêm Adrenaline 1mg/1ml (1:1000) 0.5ml (1/2 ống) tiêm bắp mặt trước ngoài đùi ngay lập tức (30đ)',
        '3. Đặt bệnh nhân nằm đầu bằng, kê cao chân, thở oxy lưu lượng cao qua mask có túi 10-15 L/phút (20đ)',
        '4. Thiết lập 2 đường truyền tĩnh mạch lớn ngoại vi, xả dịch tinh thể NaCl 0.9% nhanh (20đ)',
        '5. Chuẩn bị Adrenaline liều 2 sau 3-5 phút nếu huyết áp chưa cải thiện (10đ)'
      ]
    },
    {
      badge: 'Trạm Đọc Cận Lâm Sàng',
      title: 'Phân Tích Khí Máu Động Mạch & Bù Trừ Toan Kiềm (ABG)',
      scenario: 'Kết quả ABG bệnh nhân ĐTĐ nhập viện vì sốt và lơ mơ: pH 7.15, PaCO2 20 mmHg, HCO3- 7 mmol/L, Na+ 135 mmol/L, Cl- 95 mmol/L. Thí sinh hãy phân tích rối loạn toan kiềm.',
      checks: [
        '1. Đánh giá pH: Toan máu nặng (pH 7.15 < 7.35) (15đ)',
        '2. Xác định rối loạn nguyên phát: Toan chuyển hóa (HCO3- 7 < 22 mmol/L) (20đ)',
        '3. Tính Anion Gap: AG = 135 - (95 + 7) = 33 mmol/L (> 12: Toan chuyển hóa tăng AG) (25đ)',
        '4. Kiểm tra bù trừ hô hấp theo công thức Winters: PaCO2 dự đoán = 1.5 * 7 + 8 = 18.5 ± 2 mmHg (Phù hợp) (25đ)',
        '5. Kết luận lâm sàng: Toan chuyển hóa tăng khoảng trống Anion Gap nghĩ do ĐTĐ nhiễm toan Ceton (DKA) (15đ)'
      ]
    }
  ];

  window.drawRandomOsceStation = () => {
    const randomIndex = Math.floor(Math.random() * STATIONS.length);
    const station = STATIONS[randomIndex];

    const badgeEl = document.getElementById('station-badge');
    const titleEl = document.getElementById('station-title');
    const scenarioEl = document.getElementById('station-scenario');
    const listEl = document.getElementById('station-checklist');

    if (badgeEl) badgeEl.textContent = station.badge;
    if (titleEl) titleEl.textContent = station.title;
    if (scenarioEl) scenarioEl.textContent = station.scenario;
    if (listEl) {
      listEl.innerHTML = station.checks.map(c => `
        <li style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #334155;">
          <input type="checkbox" style="width: 16px; height: 16px;" /> ${c}
        </li>
      `).join('');
    }

    window.resetOsceTimer();
  };

  window.toggleOsceTimer = () => {
    const btn = document.getElementById('osce-timer-btn');
    if (isOsceRunning) {
      clearInterval(osceTimerInterval);
      isOsceRunning = false;
      if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i> Tiếp tục';
    } else {
      isOsceRunning = true;
      if (btn) btn.innerHTML = '<i class="fa-solid fa-pause"></i> Tạm dừng';
      osceTimerInterval = setInterval(() => {
        if (osceSeconds > 0) {
          osceSeconds--;
          updateTimerUI();
        } else {
          clearInterval(osceTimerInterval);
          isOsceRunning = false;
          alert('⏰ HẾT GIỜ THI TRẠM OSCE!');
          if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i> Bắt đầu';
        }
      }, 1000);
    }
  };

  window.resetOsceTimer = () => {
    clearInterval(osceTimerInterval);
    isOsceRunning = false;
    osceSeconds = 300;
    updateTimerUI();
    const btn = document.getElementById('osce-timer-btn');
    if (btn) btn.innerHTML = '<i class="fa-solid fa-play"></i> Bắt đầu';
  };

  function updateTimerUI() {
    const min = Math.floor(osceSeconds / 60);
    const sec = osceSeconds % 60;
    const str = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    const display = document.getElementById('osce-timer-display');
    if (display) {
      display.textContent = str;
      if (osceSeconds <= 60) {
        display.style.color = '#dc2626';
      } else {
        display.style.color = '#0284c7';
      }
    }
  }
}
