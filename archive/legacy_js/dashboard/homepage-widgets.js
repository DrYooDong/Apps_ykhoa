/**
 * CliniPortal 2.0 — Homepage Glassmorphism Widgets Engine
 * File: js/dashboard/homepage-widgets.js
 */
(function () {
  'use strict';

  // ============================================================
  // DATABASE: CLINICAL PEARLS REPOSITORY
  // ============================================================
  const CLINICAL_PEARLS = [
    {
      id: 1,
      spec: "Hồi Sức / Truyền Nhiễm",
      title: "Sốc Nhiễm Khuẩn: Dược Động Học Kháng Sinh ICU",
      body: "Sốc nhiễm khuẩn gây tăng thể tích phân bố (Vd) và tăng thanh thải thận (ARC). Luôn dùng LIỀU NẠP đầy đủ và ưu tiên TRUYỀN KÉO DÀI Beta-lactam để tối ưu fT > MIC.",
      source: "Critical Care Clinics / Surviving Sepsis Campaign 2026"
    },
    {
      id: 2,
      spec: "Đái Tháo Đường / Cấp Cứu",
      title: "Cấp Cứu DKA: Bù Kali Trước Khi Truyền Insulin",
      body: "Trong toan ceton đái tháo đường (DKA), nếu K+ < 3.3 mEq/L bắt buộc phải bù Kali trước. Truyền insulin ngay sẽ kéo Kali vào tế bào gây hạ Kali trầm trọng dẫn tới loạn nhịp tử vong.",
      source: "ADA Guidelines 2026 / UpToDate"
    },
    {
      id: 3,
      spec: "Tim Mạch / Cấp Cứu",
      title: "ACS & Door-to-ECG Thời Gian Vàng",
      body: "Bệnh nhân đau ngực cấp nghi ngờ ACS cần được hoàn thành đo và đọc Điện tâm đồ (ECG) 12 chuyển đạo trong vòng DƯỚI 10 PHÚT từ lúc tiếp cận y tế.",
      source: "ESC / AHA STEMI Guidelines"
    },
    {
      id: 4,
      spec: "Hô Hấp / ICU",
      title: "COPD Đợt Cấp: Đích SpO2 88 - 92%",
      body: "Ở bệnh nhân COPD có nguy cơ ứ CO2, duy trì SpO2 ở mức 88–92%. Thở oxy liều quá cao làm mất kích thích thông khí giảm oxy (Hypoxic Drive), làm toan hô hấp nặng hơn.",
      source: "GOLD Guidelines 2026"
    },
    {
      id: 5,
      spec: "Thận - Điện Giải",
      title: "Hạ Natri Máu Mạn: Giới Hạn Tốc Độ Nâng",
      body: "Nâng Natri an toàn không quá 8–10 mmol/L trong 24 giờ đầu (khoảng 0.5 mmol/L/giờ) để ngăn ngừa Hội chứng hủy myelin cầu não thẩm thấu (ODS) không hồi phục.",
      source: "European Society of Endocrinology Guidelines"
    },
    {
      id: 6,
      spec: "Tiêu Hóa / Gan Mật",
      title: "Chọc Tháo Cổ Trướng Lớn (> 5L) & Bù Albumin",
      body: "Khi chọc tháo dịch báng > 5 lít ở bệnh nhân xơ gan, cần bù 8g Albumin ưu trương (20%) cho MỖI LÍT DỊCH tháo ra để phòng ngừa suy thận cấp và tụt HA sau chọc (PICD).",
      source: "EASL Guidelines on Ascites"
    }
  ];

  // ============================================================
  // DATABASE: DEFAULT APPS FOR SMART LAUNCHER
  // ============================================================
  const DEFAULT_LAUNCHER_APPS = [
    { id: "icd10", title: "Tra cứu ICD-10", category: "Công cụ", url: "#/calculators/tracuu-ma-icd10", icon: "🔍", count: 28 },
    { id: "ecg", title: "Đọc ECG cơ bản", category: "Kỹ năng", url: "#/skills/doc-ecg-co-ban", icon: "📈", count: 24 },
    { id: "cbc", title: "Phân tích CBC", category: "Kỹ năng", url: "#/skills/doc-tpttb-mau", icon: "🩸", count: 20 },
    { id: "renal", title: "Chức năng Thận eGFR", category: "Công cụ", url: "#/skills/doc-sh-than", icon: "🧪", count: 18 },
    { id: "abg", title: "Khí máu ĐM (ABG)", category: "Công cụ", url: "#/calculators/dg-abg-studio", icon: "🫁", count: 16 },
    { id: "sepsis", title: "Kháng sinh kinh nghiệm", category: "Dược lý", url: "#/skills/luachon-khangsinh", icon: "💊", count: 15 },
    { id: "dengue", title: "Xử trí SXH Dengue", category: "Cấp cứu", url: "#/calculators/ql-bu-dich-studio", icon: "🦟", count: 12 },
    { id: "stroke", title: "Đột quỵ & NIHSS", category: "Cấp cứu", url: "#/calculators/stroke-pro-studio", icon: "🧠", count: 10 }
  ];

  // ============================================================
  // 1. STATUS BAR: CLOCK, SHIFT TRACKER & ENERGY
  // ============================================================
  function initStatusBar() {
    const timeEl = document.getElementById('statusClockTime');
    const dateEl = document.getElementById('statusClockDate');
    const greetingEl = document.getElementById('statusGreetingText');
    const shiftPill = document.getElementById('statusShiftPill');
    const shiftText = document.getElementById('statusShiftText');
    const energyText = document.getElementById('statusEnergyText');

    function updateClock() {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      const s = now.getSeconds();

      if (timeEl) {
        timeEl.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      }

      if (dateEl) {
        const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
        dateEl.textContent = `${days[now.getDay()]}, ${now.getDate()}/${now.getMonth() + 1}`;
      }

      if (greetingEl) {
        if (h >= 5 && h < 12) greetingEl.textContent = 'Chào buổi sáng, Bác sĩ!';
        else if (h >= 12 && h < 18) greetingEl.textContent = 'Chào buổi chiều, Bác sĩ!';
        else greetingEl.textContent = 'Chào buổi tối, Bác sĩ!';
      }

      // Shift calculation
      if (shiftText) {
        let shiftName = '';
        let endH = 0;
        if (h >= 7 && h < 13) {
          shiftName = 'Ca Sáng';
          endH = 13;
        } else if (h >= 13 && h < 21) {
          shiftName = 'Ca Chiều';
          endH = 21;
        } else {
          shiftName = 'Ca Đêm';
          endH = (h >= 21) ? 31 : 7; // relative to midnight
        }

        const currentMins = (h < 7 && endH === 7) ? (h + 24) * 60 + m : h * 60 + m;
        const targetMins = endH * 60;
        const diffMins = Math.max(0, targetMins - currentMins);
        const remH = Math.floor(diffMins / 60);
        const remM = diffMins % 60;
        shiftText.textContent = `${shiftName} (còn ${remH}h${remM}p)`;
      }

      // Energy Circadian calculation
      if (energyText) {
        let energyPercent = 85;
        if (h >= 8 && h <= 11) energyPercent = 95;
        else if (h >= 13 && h <= 15) energyPercent = 70;
        else if (h >= 16 && h <= 19) energyPercent = 88;
        else if (h >= 22 || h <= 4) energyPercent = 55;
        energyText.textContent = `${energyPercent}% Năng lượng`;
      }
    }

    updateClock();
    setInterval(updateClock, 1000);
  }

  // ============================================================
  // 2. CLINICAL PEARL COMPACT WIDGET
  // ============================================================
  let currentPearlIdx = 0;

  function renderPearl(idx) {
    const pearl = CLINICAL_PEARLS[idx % CLINICAL_PEARLS.length];
    const specEl = document.getElementById('glassPearlSpec');
    const bodyEl = document.getElementById('glassPearlBody');
    const sourceEl = document.getElementById('glassPearlSource');

    if (!bodyEl) return;

    bodyEl.style.opacity = '0';
    setTimeout(() => {
      if (specEl) specEl.textContent = pearl.spec;
      if (bodyEl) bodyEl.textContent = pearl.body;
      if (sourceEl) sourceEl.textContent = pearl.source;
      bodyEl.style.opacity = '1';
    }, 150);
  }

  function initClinicalPearl() {
    renderPearl(currentPearlIdx);

    const nextBtn = document.getElementById('btnNextPearl');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentPearlIdx = (currentPearlIdx + 1) % CLINICAL_PEARLS.length;
        renderPearl(currentPearlIdx);
      });
    }

    const doneBtn = document.getElementById('btnPearlDone');
    if (doneBtn) {
      doneBtn.addEventListener('click', () => {
        doneBtn.innerHTML = '<i class="fa-solid fa-check"></i> Đã ghi nhớ!';
        doneBtn.style.color = '#10b981';
        setTimeout(() => {
          doneBtn.innerHTML = '<i class="fa-regular fa-circle-check"></i> Ghi nhớ';
          doneBtn.style.color = '';
        }, 2000);
      });
    }
  }

  // ============================================================
  // 3. SMART APP LAUNCHER & FREQUENCY TRACKER
  // ============================================================
  function getAppUsageData() {
    try {
      const raw = localStorage.getItem('cliniportal_app_usage');
      return raw ? JSON.parse(raw) : DEFAULT_LAUNCHER_APPS;
    } catch (e) {
      return DEFAULT_LAUNCHER_APPS;
    }
  }

  function saveAppUsageData(data) {
    try {
      localStorage.setItem('cliniportal_app_usage', JSON.stringify(data));
    } catch (e) {}
  }

  function getPinnedApps() {
    try {
      const raw = localStorage.getItem('cliniportal_pinned_apps');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function savePinnedApps(pins) {
    try {
      localStorage.setItem('cliniportal_pinned_apps', JSON.stringify(pins));
    } catch (e) {}
  }

  function recordAppLaunch(appId) {
    const apps = getAppUsageData();
    const app = apps.find(a => a.id === appId);
    if (app) {
      app.count = (app.count || 0) + 1;
      saveAppUsageData(apps);
    }
    recordRecentlyUsed(appId);
  }

  function renderLauncher(filterText = '') {
    const grid = document.getElementById('launcherGrid');
    if (!grid) return;

    let apps = getAppUsageData();
    const pinned = getPinnedApps();

    // Sort: Pinned first, then by frequency count desc
    apps.sort((a, b) => {
      const aPinned = pinned.includes(a.id);
      const bPinned = pinned.includes(b.id);
      if (aPinned && !bPinned) return -1;
      if (!aPinned && bPinned) return 1;
      return (b.count || 0) - (a.count || 0);
    });

    if (filterText) {
      const q = filterText.toLowerCase();
      apps = apps.filter(a => a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
    }

    grid.innerHTML = apps.map(app => {
      const isPinned = pinned.includes(app.id);
      return `
        <a href="${app.url}" class="launcher-item" data-id="${app.id}">
          <div class="launcher-icon-box">${app.icon}</div>
          <div class="launcher-text-box">
            <span class="launcher-name">${app.title}</span>
            <span class="launcher-cat">${app.category}</span>
          </div>
          <button class="launcher-pin-btn ${isPinned ? 'pinned' : ''}" data-pin-id="${app.id}" title="${isPinned ? 'Bỏ ghim' : 'Ghim lên đầu'}">
            <i class="${isPinned ? 'fa-solid' : 'fa-regular'} fa-star"></i>
          </button>
        </a>
      `;
    }).join('');

    // Event listeners
    grid.querySelectorAll('.launcher-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const pinBtn = e.target.closest('.launcher-pin-btn');
        if (pinBtn) {
          e.preventDefault();
          e.stopPropagation();
          const pinId = pinBtn.getAttribute('data-pin-id');
          let currentPins = getPinnedApps();
          if (currentPins.includes(pinId)) {
            currentPins = currentPins.filter(id => id !== pinId);
          } else {
            currentPins.push(pinId);
          }
          savePinnedApps(currentPins);
          renderLauncher(filterText);
          return;
        }
        const id = item.getAttribute('data-id');
        if (id) recordAppLaunch(id);
      });
    });
  }

  function initAppLauncher() {
    renderLauncher();

    const searchInput = document.getElementById('launcherSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderLauncher(e.target.value.trim());
      });
    }
  }

  // ============================================================
  // 4. RECENTLY USED TRACKER
  // ============================================================
  function getRecentlyUsed() {
    try {
      const raw = localStorage.getItem('cliniportal_recent_chips');
      return raw ? JSON.parse(raw) : [
        { id: "icd10", title: "ICD-10", icon: "🔍", url: "#/calculators/tracuu-ma-icd10" },
        { id: "ecg", title: "Đọc ECG", icon: "📈", url: "#/skills/doc-ecg-co-ban" },
        { id: "abg", title: "Khí Máu", icon: "🫁", url: "#/calculators/dg-abg-studio" },
        { id: "cbc", title: "Tế Bào Máu", icon: "🩸", url: "#/skills/doc-tpttb-mau" }
      ];
    } catch (e) {
      return [];
    }
  }

  function recordRecentlyUsed(appId) {
    const apps = getAppUsageData();
    const app = apps.find(a => a.id === appId);
    if (!app) return;

    let recents = getRecentlyUsed().filter(r => r.id !== appId);
    recents.unshift({ id: app.id, title: app.title.split(' ')[0] + ' ' + (app.title.split(' ')[1] || ''), icon: app.icon, url: app.url });
    recents = recents.slice(0, 5);

    try {
      localStorage.setItem('cliniportal_recent_chips', JSON.stringify(recents));
    } catch (e) {}

    renderRecentlyUsed();
  }

  function renderRecentlyUsed() {
    const container = document.getElementById('recentlyUsedRow');
    if (!container) return;

    const recents = getRecentlyUsed();
    if (!recents.length) {
      container.innerHTML = '<span style="font-size:0.75rem; color:var(--color-text-muted);">Chưa có mục gần đây</span>';
      return;
    }

    container.innerHTML = recents.map(r => `
      <a href="${r.url}" class="recent-chip">
        <span class="recent-chip-icon">${r.icon}</span>
        <span>${r.title}</span>
      </a>
    `).join('');
  }

  // ============================================================
  // 5. FLOATING NOTEPAD FAB & DRAWER
  // ============================================================
  function initFloatingNotepad() {
    const fab = document.getElementById('notepadFab');
    const drawer = document.getElementById('notepadDrawer');
    const closeBtn = document.getElementById('notepadCloseBtn');
    const textarea = document.getElementById('notepadTextarea');
    const copyBtn = document.getElementById('notepadCopyBtn');
    const clearBtn = document.getElementById('notepadClearBtn');

    if (!fab || !drawer || !textarea) return;

    // Load saved notes
    try {
      textarea.value = localStorage.getItem('cliniportal_quick_notes') || '';
    } catch (e) {}

    // Save notes on input
    textarea.addEventListener('input', () => {
      try {
        localStorage.setItem('cliniportal_quick_notes', textarea.value);
      } catch (e) {}
    });

    // Toggle drawer
    fab.addEventListener('click', () => {
      drawer.classList.toggle('open');
      if (drawer.classList.contains('open')) {
        textarea.focus();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        if (!textarea.value) return;
        navigator.clipboard.writeText(textarea.value).then(() => {
          copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Đã chép';
          setTimeout(() => {
            copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Chép';
          }, 1800);
        });
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        textarea.value = '';
        try {
          localStorage.removeItem('cliniportal_quick_notes');
        } catch (e) {}
      });
    }
  }

  // ============================================================
  // MASTER INITIALIZATION
  // ============================================================
  document.addEventListener('DOMContentLoaded', () => {
    initStatusBar();
    initClinicalPearl();
    initAppLauncher();
    renderRecentlyUsed();
    initFloatingNotepad();
  });

})();
