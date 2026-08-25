// ════════════════════════════════════════════════════════════════
//  CLINIPORTAL - SMART DRUG PASSPORT ENGINE
//  Hồ sơ bệnh nhân cá thể hóa toàn cục lưu trong localStorage
// ════════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const STORAGE_KEY = 'cliniportal_drug_passport_v1';

  // Default Patient Profile Schema
  const DEFAULT_PROFILE = {
    age: 65,
    gender: 'male',
    weight: 60,
    egfr: 'normal',       // 'normal', 'ckd_mod' (30-49), 'ckd_severe' (<30)
    childPugh: 'normal',  // 'normal', 'dysfunction' (Child B/C)
    bleedingRisk: 'no',   // 'no', 'yes' (history of GI bleed)
    asthma: 'no',         // 'no', 'yes' (COPD / Asthma)
    currentDrugs: []      // List of drug keys patient is currently taking
  };

  /**
   * Get current profile from localStorage or default
   */
  function getProfile() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PROFILE, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('[DrugPassport] Error reading localStorage:', e);
    }
    return { ...DEFAULT_PROFILE };
  }

  /**
   * Save profile to localStorage and sync across page
   */
  function saveProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      syncFormFields(profile);
      triggerDdiEngineUpdate();
      updateFabBadge(profile);
    } catch (e) {
      console.warn('[DrugPassport] Error writing localStorage:', e);
    }
  }

  /**
   * Sync existing form select inputs on page (e.g. DL_Timmach.html)
   */
  function syncFormFields(profile) {
    const egfrEl = document.getElementById('patient-egfr');
    if (egfrEl && egfrEl.value !== profile.egfr) egfrEl.value = profile.egfr;

    const bleedEl = document.getElementById('patient-bleed');
    if (bleedEl && bleedEl.value !== profile.bleedingRisk) bleedEl.value = profile.bleedingRisk;

    const asthmaEl = document.getElementById('patient-asthma');
    if (asthmaEl && asthmaEl.value !== profile.asthma) asthmaEl.value = profile.asthma;

    const liverEl = document.getElementById('patient-liver');
    if (liverEl && liverEl.value !== profile.childPugh) liverEl.value = profile.childPugh;
  }

  /**
   * Trigger DDI engine on pages that support it
   */
  function triggerDdiEngineUpdate() {
    if (typeof window.executeDdiMatrixEngine === 'function') {
      window.executeDdiMatrixEngine();
    }
  }

  /**
   * Update FAB badge status text
   */
  function updateFabBadge(profile) {
    const badgeEl = document.getElementById('passport-status-text');
    if (badgeEl) {
      const risks = [];
      if (profile.egfr !== 'normal') risks.push('eGFR ⬇');
      if (profile.childPugh !== 'normal') risks.push('Gan ⬇');
      if (profile.bleedingRisk === 'yes') risks.push('XHTH ⚠️');
      if (profile.asthma === 'yes') risks.push('Hen/COPD 🫁');

      badgeEl.textContent = risks.length > 0 ? risks.join(' • ') : 'Bình thường';
    }
  }

  /**
   * Create Floating FAB Container if not existing
   */
  function ensureFabContainer() {
    let container = document.getElementById('pharma-fab-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'pharma-fab-container';
      container.className = 'pharma-fab-container';
      document.body.appendChild(container);
    }
    return container;
  }

  /**
   * Render Floating Passport FAB button
   */
  function renderPassportFab() {
    const container = ensureFabContainer();
    if (document.getElementById('pharma-fab-passport-btn')) return;

    const btn = document.createElement('button');
    btn.id = 'pharma-fab-passport-btn';
    btn.className = 'pharma-fab-btn pharma-fab-passport';
    btn.setAttribute('title', 'Hồ sơ bệnh nhân cá thể hóa (Smart Drug Passport)');
    btn.innerHTML = `
      <span class="passport-status-dot"></span>
      <span>🧬 Hồ sơ BN:</span>
      <span id="passport-status-text">Bình thường</span>
    `;

    btn.addEventListener('click', openPassportModal);
    container.appendChild(btn);

    // Initial badge update
    updateFabBadge(getProfile());
  }

  /**
   * Render Passport Drawer / Modal
   */
  function renderPassportModal() {
    if (document.getElementById('passport-modal-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'passport-modal-overlay';
    overlay.className = 'pharma-modal-overlay';

    overlay.innerHTML = `
      <div class="pharma-modal-card">
        <div class="pharma-modal-header">
          <h3 class="pharma-modal-title">
            <i class="fa-solid fa-id-card-clip" style="color: var(--color-primary);"></i>
            Smart Drug Passport — Hồ Sơ Bệnh Nhân Cá Thể Hóa
          </h3>
          <button class="pharma-modal-close" id="passport-modal-close-btn">&times;</button>
        </div>
        <div class="pharma-modal-body">
          <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin-bottom: 1.25rem; line-height: 1.5;">
            Hồ sơ này tự động đồng bộ và lưu trữ trong thiết bị của bạn. Mọi trang Dược lý sẽ căn cứ theo bối cảnh bệnh nhân này để tự động đưa ra cảnh báo chống chỉ định & tương tác thuốc thích ứng.
          </p>
          
          <form id="passport-form">
            <div class="passport-grid">
              <div class="passport-field">
                <label><i class="fa-solid fa-calculator"></i> Chức năng thận (eGFR)</label>
                <select id="pp-egfr">
                  <option value="normal">Bình thường (eGFR ≥ 60 ml/phút)</option>
                  <option value="ckd_mod">Suy thận vừa (eGFR 30 - 49 ml/phút)</option>
                  <option value="ckd_severe">Suy thận nặng (eGFR < 30 ml/phút)</option>
                </select>
              </div>

              <div class="passport-field">
                <label><i class="fa-solid fa-hospital-user"></i> Chức năng gan (Child-Pugh)</label>
                <select id="pp-childPugh">
                  <option value="normal">Bình thường (Child-Pugh A)</option>
                  <option value="dysfunction">Suy gan vừa/nặng (Child-Pugh B/C)</option>
                </select>
              </div>

              <div class="passport-field">
                <label><i class="fa-solid fa-droplet"></i> Tiền sử Xuất huyết tiêu hóa</label>
                <select id="pp-bleedingRisk">
                  <option value="no">Không có nguy cơ cao</option>
                  <option value="yes">Có tiền sử XHTH / Loét dạ dày tiến triển</option>
                </select>
              </div>

              <div class="passport-field">
                <label><i class="fa-solid fa-lungs"></i> Co thắt phế quản (Hen/COPD)</label>
                <select id="pp-asthma">
                  <option value="no">Không có co thắt phế quản</option>
                  <option value="yes">Tiền sử Hen phế quản / COPD nặng</option>
                </select>
              </div>
            </div>

            <button type="submit" class="passport-save-btn">
              <i class="fa-solid fa-floppy-disk"></i> Lưu & Đồng Bộ Hồ Sơ Toàn Cục
            </button>
          </form>

          <div class="passport-alert-summary">
            <h4 style="font-size: var(--text-xs); font-weight: 700; color: var(--color-primary); margin-bottom: 0.5rem; text-transform: uppercase;">
              💡 Tự động điều chỉnh hiệu lực Dược Lý
            </h4>
            <ul style="font-size: var(--text-xs); color: var(--color-text); padding-left: 1.2rem; margin: 0; line-height: 1.6;">
              <li>Tự động đánh dấu đỏ thuốc chống chỉ định khi tra cứu chuyên khoa.</li>
              <li>Gắn nhãn cảnh báo hiệu chỉnh liều khi eGFR hoặc chức năng gan giảm.</li>
              <li>Hỗ trợ lưu trữ offline an toàn trên trình duyệt cá nhân.</li>
            </ul>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Event handlers
    document.getElementById('passport-modal-close-btn').addEventListener('click', closePassportModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closePassportModal();
    });

    document.getElementById('passport-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const current = getProfile();
      const updated = {
        ...current,
        egfr: document.getElementById('pp-egfr').value,
        childPugh: document.getElementById('pp-childPugh').value,
        bleedingRisk: document.getElementById('pp-bleedingRisk').value,
        asthma: document.getElementById('pp-asthma').value
      };
      saveProfile(updated);
      closePassportModal();
    });
  }

  function openPassportModal() {
    renderPassportModal();
    const profile = getProfile();

    document.getElementById('pp-egfr').value = profile.egfr;
    document.getElementById('pp-childPugh').value = profile.childPugh;
    document.getElementById('pp-bleedingRisk').value = profile.bleedingRisk;
    document.getElementById('pp-asthma').value = profile.asthma;

    document.getElementById('passport-modal-overlay').classList.add('active');
  }

  function closePassportModal() {
    const overlay = document.getElementById('passport-modal-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  // Listen to form change on page if user modifies page selects directly
  function setupPageSelectListeners() {
    ['patient-egfr', 'patient-bleed', 'patient-asthma', 'patient-liver'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('change', () => {
          const profile = getProfile();
          if (id === 'patient-egfr') profile.egfr = el.value;
          if (id === 'patient-bleed') profile.bleedingRisk = el.value;
          if (id === 'patient-asthma') profile.asthma = el.value;
          if (id === 'patient-liver') profile.childPugh = el.value;
          saveProfile(profile);
        });
      }
    });
  }

  // Global API export
  window.DrugPassport = {
    getProfile,
    saveProfile,
    openModal: openPassportModal
  };

  // Init on DOM Content Loaded
  document.addEventListener('DOMContentLoaded', () => {
    renderPassportFab();
    syncFormFields(getProfile());
    setupPageSelectListeners();
  });
})();
