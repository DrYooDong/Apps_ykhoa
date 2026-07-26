/**
 * EAST-WEST MEDICINE BRIDGE CONTROLLER - CliniPortal YHCT Module
 * Real-time Search Matrix: TCM Disease ↔ ICD-10 Modern Diagnosis & Herb-Drug Safety
 */

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("bridgeSearchInput");
  const matrixCardsBox = document.getElementById("matrixCardsBox");
  const safetyAlertsBox = document.getElementById("safetyAlertsBox");

  if (!matrixCardsBox || typeof DONG_TAY_Y_DATA === "undefined") return;

  let searchQuery = "";

  // Render Safety Banner
  function renderSafetyBanner() {
    if (!safetyAlertsBox) return;

    safetyAlertsBox.innerHTML = `
      <div class="safety-alert-banner">
        <h4 style="margin:0; font-size:var(--text-sm); font-weight:700; display:flex; align-items:center; gap:0.5rem;">
          <i class="fa-solid fa-triangle-exclamation"></i> CẢNH BÁO TƯƠNG TÁC THUỐC ĐÔNG - TÂY Y NGUY HIỂM (HERB-DRUG INTERACTIONS):
        </h4>

        <div style="display:flex; flex-direction:column; gap:0.4rem;">
          ${DONG_TAY_Y_DATA.safetyAlerts.map(a => `
            <div>• <strong>${a.herbs}:</strong> ${a.alert}</div>
          `).join("")}
        </div>
      </div>
    `;
  }

  // Filter & Render Matrix Cards
  function renderMatrixCards() {
    const list = DONG_TAY_Y_DATA.matrix.filter(m => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return m.tcmName.toLowerCase().includes(q)
        || m.icd10.toLowerCase().includes(q)
        || m.tcmMechanism.toLowerCase().includes(q)
        || m.westMechanism.toLowerCase().includes(q);
    });

    if (list.length === 0) {
      matrixCardsBox.innerHTML = `
        <div style="text-align:center; padding:3rem 1rem; color:var(--color-text-muted);">
          Không tìm thấy bệnh danh hoặc chẩn đoán đối chiếu phù hợp.
        </div>
      `;
      return;
    }

    matrixCardsBox.innerHTML = list.map(m => `
      <div class="matrix-card">
        <!-- Dual Side Header -->
        <div class="matrix-header">
          <div class="matrix-tcm-side">
            <span class="dt-badge" style="background:var(--color-tcm-green-hl); color:var(--color-tcm-green); margin-bottom:0.35rem; display:inline-block;">Y HỌC CỔ TRUYỀN</span>
            <div class="matrix-title tcm">☯️ ${m.tcmName}</div>
            <div style="font-size:var(--text-xs); color:var(--color-text-muted); line-height:1.4;">
              <strong>Y lý Đông y:</strong> ${m.tcmMechanism}
            </div>
          </div>

          <div>
            <span class="dt-badge" style="background:var(--color-surface); color:var(--color-primary); border-color:var(--color-primary); margin-bottom:0.35rem; display:inline-block;">Y HỌC HIỆN ĐẠI (ICD-10)</span>
            <div class="matrix-title west">🩺 ${m.icd10}</div>
            <div style="font-size:var(--text-xs); color:var(--color-text-muted); line-height:1.4;">
              <strong>Sinh lý bệnh Tây y:</strong> ${m.westMechanism}
            </div>
          </div>
        </div>

        <!-- Combined Regimen & Herb Interaction -->
        <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:var(--text-xs);">
          <div style="background:var(--color-surface-offset); padding:0.85rem; border-radius:var(--radius-md); border-left:4px solid var(--color-tcm-green);">
            <strong style="color:var(--color-tcm-green);"><i class="fa-solid fa-handshake"></i> Phác đồ phối hợp Đông - Tây Y an toàn:</strong>
            <p style="margin:0.25rem 0 0 0; color:var(--color-text); line-height:1.5;">${m.combinedRegimen}</p>
          </div>

          <div style="background:var(--color-warning-hl); padding:0.85rem; border-radius:var(--radius-md); border:1px solid rgba(217, 119, 6, 0.3);">
            <strong style="color:var(--color-warning);"><i class="fa-solid fa-shield-halved"></i> Cảnh báo tương tác thuốc & Cấm kỵ:</strong>
            <p style="margin:0.25rem 0 0 0; color:var(--color-text); line-height:1.5;">${m.herbInteraction}</p>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Search Input Listener
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderMatrixCards();
  });

  // Initialize
  renderSafetyBanner();
  renderMatrixCards();
});
