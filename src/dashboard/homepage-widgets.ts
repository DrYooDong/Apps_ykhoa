/**
 * Homepage Widgets & Live Clinical Search Engine (homepage-widgets.ts)
 * Path: src/dashboard/homepage-widgets.ts
 */

export interface ClinicalPearlItem {
  id: number;
  spec: string;
  title: string;
  body: string;
  source: string;
}

export interface LauncherAppItem {
  id: string;
  title: string;
  category: string;
  url: string;
  icon: string;
  count: number;
}

export interface RecentChipItem {
  id: string;
  title: string;
  icon: string;
  url: string;
}

// ── 1. DATABASE: CLINICAL PEARLS ──
export const CLINICAL_PEARLS: ClinicalPearlItem[] = [
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

// ── 2. DATABASE: DOCSPACE CDSS APPS (STANDALONE ARCHITECTURE) ──
export const CANONICAL_CDSS_URLS: Record<string, string> = {
  'cdss-dengue': './src/content/docspace/public/cdss/dengue/index.html',
  'cdss-ecg': './src/content/docspace/public/cdss/ecg/index.html',
  'cdss-abg': './src/content/docspace/public/cdss/abg/index.html',
  'cdss-xray': './src/content/docspace/public/cdss/xray/index.html',
  'cdss-hepa': './src/content/docspace/public/cdss/hepa/index.html',
  'cdss-neuro': './src/content/docspace/public/cdss/neuro/index.html',
  'cdss-microbio': './src/content/docspace/public/cdss/microbio/index.html',
  'cdss-antibiotic': './src/content/docspace/public/cdss/antibiotic/index.html',
  'cdss-vancomycin': './src/content/docspace/public/cdss/vancomycin/index.html',
  'cdss-sepsis': './src/content/docspace/public/cdss/sepsis/index.html',
  'cdss-hub': './src/content/docspace/public/cdss/index.html'
};

export const DEFAULT_LAUNCHER_APPS: LauncherAppItem[] = [
  { id: "cdss-dengue", title: "Dịch Truyền SXHD Dengue", category: "Truyền Nhiễm • BYT 2023", url: "./src/content/docspace/public/cdss/dengue/index.html", icon: "💧", count: 35 },
  { id: "cdss-ecg", title: "Phân Tích ECG 12 Cần", category: "Tim Mạch • 21 Ca & Caliper", url: "./src/content/docspace/public/cdss/ecg/index.html", icon: "📈", count: 32 },
  { id: "cdss-abg", title: "Khí Máu Động Mạch (ABG Pro)", category: "Hô Hấp • 24 Ca & Nomogram", url: "./src/content/docspace/public/cdss/abg/index.html", icon: "🫁", count: 28 },
  { id: "cdss-xray", title: "X-Quang Thông Minh (RadAI)", category: "CĐHA • Trạm Đọc PACS", url: "./src/content/docspace/public/cdss/xray/index.html", icon: "🩻", count: 25 },
  { id: "cdss-hepa", title: "Sinh Hóa Gan (HepaCDSS)", category: "Tiêu Hóa • ACG & WHO", url: "./src/content/docspace/public/cdss/hepa/index.html", icon: "🧪", count: 22 },
  { id: "cdss-neuro", title: "Khám Thần Kinh (NeuroExam)", category: "Thần Kinh • Mô Phỏng 3D", url: "./src/content/docspace/public/cdss/neuro/index.html", icon: "🧠", count: 20 },
  { id: "cdss-microbio", title: "Vi Sinh & KSĐ (Mahon)", category: "Vi Sinh • CLSI M100", url: "./src/content/docspace/public/cdss/microbio/index.html", icon: "🦠", count: 18 },
  { id: "cdss-antibiotic", title: "Liều Kháng Sinh & Suy Thận", category: "Dược Lý • WHO AWaRe", url: "./src/content/docspace/public/cdss/antibiotic/index.html", icon: "💊", count: 16 },
  { id: "cdss-vancomycin", title: "Dược Động Học Vancomycin", category: "Dược Lâm Sàng • ASHP 2020", url: "./src/content/docspace/public/cdss/vancomycin/index.html", icon: "💉", count: 14 },
  { id: "cdss-sepsis", title: "Phân Tầng Nguy Cơ Sepsis", category: "Hồi Sức • NICE & SSC 2024", url: "./src/content/docspace/public/cdss/sepsis/index.html", icon: "☣️", count: 13 },
  { id: "cdss-hub", title: "Trung Tâm CDSS Hub", category: "DocSpace • Điều Phối CDSS", url: "./src/content/docspace/public/cdss/index.html", icon: "🧬", count: 12 }
];

let currentPearlIdx = 0;

// ── 3. CLINICAL PEARL CONTROLLER ──
export function renderPearl(idx: number): void {
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
  }, 120);
}

export function initClinicalPearl(): void {
  renderPearl(currentPearlIdx);

  const nextBtn = document.getElementById('btnNextPearl');
  if (nextBtn) {
    nextBtn.onclick = () => {
      currentPearlIdx = (currentPearlIdx + 1) % CLINICAL_PEARLS.length;
      renderPearl(currentPearlIdx);
    };
  }

  const doneBtn = document.getElementById('btnPearlDone');
  if (doneBtn) {
    doneBtn.onclick = () => {
      doneBtn.innerHTML = '<i class="fa-solid fa-check"></i> Đã ghi nhớ!';
      (doneBtn as HTMLElement).style.color = '#10b981';
      setTimeout(() => {
        doneBtn.innerHTML = '<i class="fa-regular fa-circle-check"></i> Ghi nhớ';
        (doneBtn as HTMLElement).style.color = '';
      }, 2000);
    };
  }
}

// ── 4. SMART APP LAUNCHER CONTROLLER ──
export function getAppUsageData(): LauncherAppItem[] {
  try {
    const raw = localStorage.getItem('cliniportal_cdss_usage_v2') || localStorage.getItem('cliniportal_app_usage');
    if (!raw) {
      saveAppUsageData(DEFAULT_LAUNCHER_APPS);
      return DEFAULT_LAUNCHER_APPS;
    }
    let parsed: LauncherAppItem[] = JSON.parse(raw);
    const hasCdss = Array.isArray(parsed) && parsed.some(item => item.id && item.id.startsWith('cdss-'));
    if (!hasCdss) {
      saveAppUsageData(DEFAULT_LAUNCHER_APPS);
      return DEFAULT_LAUNCHER_APPS;
    }

    // Đồng bộ sang canonical URL standalone (đảm bảo mở file .html riêng biệt)
    let needsUpdate = false;
    parsed = parsed.map(item => {
      const canonical = CANONICAL_CDSS_URLS[item.id];
      if (canonical && item.url !== canonical) {
        needsUpdate = true;
        return { ...item, url: canonical };
      }
      return item;
    });

    // Bổ sung các CDSS app mới nếu người dùng lưu phiên cũ
    DEFAULT_LAUNCHER_APPS.forEach(defApp => {
      if (!parsed.some(p => p.id === defApp.id)) {
        parsed.push({ ...defApp });
        needsUpdate = true;
      }
    });

    if (needsUpdate) {
      saveAppUsageData(parsed);
    }
    return parsed;
  } catch (e) {
    return DEFAULT_LAUNCHER_APPS;
  }
}

export function saveAppUsageData(data: LauncherAppItem[]): void {
  try {
    localStorage.setItem('cliniportal_cdss_usage_v2', JSON.stringify(data));
    localStorage.setItem('cliniportal_app_usage', JSON.stringify(data));
  } catch (e) {}
}

export function getPinnedApps(): string[] {
  try {
    const raw = localStorage.getItem('cliniportal_pinned_apps');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function savePinnedApps(pins: string[]): void {
  try {
    localStorage.setItem('cliniportal_pinned_apps', JSON.stringify(pins));
  } catch (e) {}
}

export function recordAppLaunch(appId: string): void {
  const apps = getAppUsageData();
  const app = apps.find(a => a.id === appId);
  if (app) {
    app.count = (app.count || 0) + 1;
    saveAppUsageData(apps);
  }
  recordRecentlyUsed(appId);
}

export function renderLauncher(filterText: string = ''): void {
  const grid = document.getElementById('launcherGrid');
  if (!grid) return;

  let apps = [...getAppUsageData()];
  const pinned = getPinnedApps();

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
    const targetUrl = CANONICAL_CDSS_URLS[app.id] || app.url;
    return `
      <a href="${targetUrl}" target="_blank" rel="noopener noreferrer" class="launcher-item" data-id="${app.id}" title="${app.title} (Mở tab riêng)">
        <div class="launcher-icon-box">${app.icon}</div>
        <div class="launcher-text-box">
          <span class="launcher-name">${app.title}</span>
          <span class="launcher-cat">${app.category}</span>
        </div>
        <div class="launcher-item-actions">
          <button type="button" class="launcher-pin-btn ${isPinned ? 'pinned' : ''}" data-pin-id="${app.id}" title="${isPinned ? 'Bỏ ghim' : 'Ghim lên đầu'}">
            <i class="${isPinned ? 'fa-solid' : 'fa-regular'} fa-star"></i>
          </button>
          <span class="launcher-ext-icon" title="Mở trong tab riêng"><i class="fa-solid fa-arrow-up-right-from-square"></i></span>
        </div>
      </a>
    `;
  }).join('');

  grid.querySelectorAll('.launcher-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const pinBtn = (e.target as HTMLElement).closest('.launcher-pin-btn');
      if (pinBtn) {
        e.preventDefault();
        e.stopPropagation();
        const pinId = pinBtn.getAttribute('data-pin-id');
        if (pinId) {
          let currentPins = getPinnedApps();
          if (currentPins.includes(pinId)) {
            currentPins = currentPins.filter(id => id !== pinId);
          } else {
            currentPins.push(pinId);
          }
          savePinnedApps(currentPins);
          renderLauncher(filterText);
        }
        return;
      }
      const id = item.getAttribute('data-id');
      if (id) recordAppLaunch(id);
    });
  });
}

export function initAppLauncher(): void {
  renderLauncher();

  const searchInput = document.getElementById('launcherSearchInput') as HTMLInputElement | null;
  if (searchInput) {
    searchInput.oninput = (e) => {
      renderLauncher((e.target as HTMLInputElement).value.trim());
    };
  }
}

// ── 5. RECENTLY USED CONTROLLER ──
export function getRecentlyUsed(): RecentChipItem[] {
  try {
    const raw = localStorage.getItem('cliniportal_recent_chips');
    if (raw) {
      let parsed: RecentChipItem[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.some(item => item.id && item.id.startsWith('cdss-'))) {
        parsed = parsed.map(item => ({
          ...item,
          url: CANONICAL_CDSS_URLS[item.id] || item.url
        }));
        return parsed;
      }
    }
    return [
      { id: "cdss-dengue", title: "Dịch Truyền SXHD", icon: "💧", url: "./src/content/docspace/public/cdss/dengue/index.html" },
      { id: "cdss-ecg", title: "Phân Tích ECG 12 Cần", icon: "📈", url: "./src/content/docspace/public/cdss/ecg/index.html" },
      { id: "cdss-abg", title: "Khí Máu ABG", icon: "🫁", url: "./src/content/docspace/public/cdss/abg/index.html" },
      { id: "cdss-xray", title: "RadAI X-Quang", icon: "🩻", url: "./src/content/docspace/public/cdss/xray/index.html" },
      { id: "cdss-antibiotic", title: "Liều Kháng Sinh", icon: "💊", url: "./src/content/docspace/public/cdss/antibiotic/index.html" }
    ];
  } catch (e) {
    return [];
  }
}

export function recordRecentlyUsed(appId: string): void {
  const apps = getAppUsageData();
  const app = apps.find(a => a.id === appId);
  if (!app) return;

  const targetUrl = CANONICAL_CDSS_URLS[app.id] || app.url;
  let recents = getRecentlyUsed().filter(r => r.id !== appId);
  recents.unshift({ id: app.id, title: app.title, icon: app.icon, url: targetUrl });
  recents = recents.slice(0, 5);

  try {
    localStorage.setItem('cliniportal_recent_chips', JSON.stringify(recents));
  } catch (e) {}

  renderRecentlyUsed();
}

export function renderRecentlyUsed(): void {
  const container = document.getElementById('recentlyUsedRow');
  if (!container) return;

  const recents = getRecentlyUsed();
  if (!recents.length) {
    container.innerHTML = '<span style="font-size:0.75rem; color:var(--color-text-muted);">Chưa có mục gần đây</span>';
    return;
  }

  container.innerHTML = recents.map(r => `
    <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="recent-chip" title="${r.title} (Mở tab riêng)">
      <span class="recent-chip-icon">${r.icon}</span>
      <span>${r.title}</span>
      <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.65rem; opacity: 0.45; margin-left: 0.25rem;"></i>
    </a>
  `).join('');
}

// ── 6. FLOATING NOTEPAD CONTROLLER ──
export function initFloatingNotepad(): void {
  const fab = document.getElementById('notepadFab');
  const drawer = document.getElementById('notepadDrawer');
  const closeBtn = document.getElementById('notepadCloseBtn');
  const textarea = document.getElementById('notepadTextarea') as HTMLTextAreaElement | null;
  const copyBtn = document.getElementById('notepadCopyBtn');
  const clearBtn = document.getElementById('notepadClearBtn');

  if (!fab || !drawer || !textarea) return;

  try {
    textarea.value = localStorage.getItem('cliniportal_quick_notes') || '';
  } catch (e) {}

  textarea.oninput = () => {
    try {
      localStorage.setItem('cliniportal_quick_notes', textarea.value);
    } catch (e) {}
  };

  fab.onclick = () => {
    drawer.classList.toggle('open');
    if (drawer.classList.contains('open')) {
      textarea.focus();
    }
  };

  if (closeBtn) {
    closeBtn.onclick = () => drawer.classList.remove('open');
  }

  if (copyBtn) {
    copyBtn.onclick = () => {
      if (!textarea.value) return;
      navigator.clipboard.writeText(textarea.value).then(() => {
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Đã chép';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Chép';
        }, 1800);
      });
    };
  }

  if (clearBtn) {
    clearBtn.onclick = () => {
      textarea.value = '';
      try {
        localStorage.removeItem('cliniportal_quick_notes');
      } catch (e) {}
    };
  }
}

// ── MASTER INITIALIZATION ──
export function initHomepageWidgets(): void {
  initClinicalPearl();
  initAppLauncher();
  renderRecentlyUsed();
  initFloatingNotepad();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHomepageWidgets);
  } else {
    initHomepageWidgets();
  }
}
