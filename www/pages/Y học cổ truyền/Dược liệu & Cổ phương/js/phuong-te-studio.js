/**
 * PHUONG TE STUDIO CONTROLLER - CliniPortal YHCT Module
 * Quan - Than - Ta - Su Hierarchical Visualizer & Dynamic Formula Modification Engine
 */

document.addEventListener("DOMContentLoaded", function () {
  const formulasListBox = document.getElementById("ptFormulasList");
  const searchInput = document.getElementById("ptSearchInput");
  const detailPanel = document.getElementById("ptDetailPanel");

  if (!formulasListBox || typeof PHUONG_TE_DATA === "undefined") return;

  let activeFormulaId = "luc-vi-dia-hoang-hoan";
  let searchQuery = "";
  let activeModifications = []; // Indices of checked mods

  // Filter & Render Formulas Sidebar List
  function renderFormulasList() {
    const list = PHUONG_TE_DATA.filter(f => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return f.name.toLowerCase().includes(q) || f.pinyin.toLowerCase().includes(q) || f.category.toLowerCase().includes(q);
    });

    if (list.length === 0) {
      formulasListBox.innerHTML = `
        <div style="text-align:center; padding:2rem 1rem; color:var(--color-text-muted); font-size:var(--text-xs);">
          Không tìm thấy bài thuốc phù hợp.
        </div>
      `;
      return;
    }

    formulasListBox.innerHTML = list.map(f => `
      <button class="formula-item-btn ${f.id === activeFormulaId ? 'active' : ''}" data-id="${f.id}">
        <div class="formula-item-name">${f.name}</div>
        <div class="formula-item-cat">${f.category}</div>
        <div style="font-size:10px; color:var(--color-text-muted); font-style:italic;">📖 ${f.origin}</div>
      </button>
    `).join("");

    document.querySelectorAll(".formula-item-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".formula-item-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectFormula(btn.getAttribute("data-id"));
      });
    });
  }

  // Select Formula
  function selectFormula(formulaId) {
    activeFormulaId = formulaId;
    activeModifications = [];
    const f = PHUONG_TE_DATA.find(x => x.id === formulaId);
    if (!f) return;

    renderFormulaDetails(f);
  }

  // Render Formula Hierarchical Details & Modification Engine
  function renderFormulaDetails(formula) {
    if (!detailPanel) return;

    const s = formula.structure;

    detailPanel.innerHTML = `
      <!-- Header -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:2px solid var(--color-surface-offset); padding-bottom:0.75rem;">
        <div>
          <h3 style="margin:0; font-size:var(--text-xl); font-weight:700; color:var(--color-text);">
            📜 ${formula.name}
          </h3>
          <div style="font-size:var(--text-xs); color:var(--color-tcm-green); font-weight:600; margin-top:2px;">
            ${formula.pinyin} • 📖 Trích: ${formula.origin}
          </div>
        </div>
        <span class="element-badge-lg" style="background:var(--color-tcm-green);">${formula.category}</span>
      </div>

      <!-- Indications & Principle -->
      <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:var(--text-xs);">
        <div><strong>🩺 Chủ trị lâm sàng:</strong> <span style="color:var(--color-text-muted);">${formula.indications}</span></div>
        <div><strong>⚖️ Nguyên tắc Phối ngũ (Y lý):</strong> <span style="color:var(--color-tcm-gold); font-weight:600;">${formula.principle}</span></div>
      </div>

      <!-- QUÂN - THẦN - TÁ - SỨ HIERARCHICAL GRID -->
      <div class="hierarchical-grid">
        <h4 style="margin:0; font-size:var(--text-xs); font-weight:700; color:var(--color-text);">
          👑 SƠ ĐỒ PHÂN TÍCH PHỐI NGŨ CẤP BẬC (QUÂN - THẦN - TÁ - SỨ):
        </h4>

        <!-- QUÂN -->
        ${s.quan && s.quan.length > 0 ? `
          <div class="role-group-card role-quan">
            <div class="role-header role-quan">👑 VỊ QUÂN (Chủ trị chính - Liều cao nhất)</div>
            ${s.quan.map(h => `
              <div class="herb-item-row">
                <span class="herb-name-dose">• ${h.name} (${h.dosage})</span>
                <span class="herb-role-desc">${h.role}</span>
              </div>
            `).join("")}
          </div>
        ` : ""}

        <!-- THẦN -->
        ${s.than && s.than.length > 0 ? `
          <div class="role-group-card role-than">
            <div class="role-header role-than">🛡️ VỊ THẦN (Hỗ trợ vị Quân tăng tác dụng)</div>
            ${s.than.map(h => `
              <div class="herb-item-row">
                <span class="herb-name-dose">• ${h.name} (${h.dosage})</span>
                <span class="herb-role-desc">${h.role}</span>
              </div>
            `).join("")}
          </div>
        ` : ""}

        <!-- TÁ -->
        ${s.ta && s.ta.length > 0 ? `
          <div class="role-group-card role-ta">
            <div class="role-header role-ta">🌿 VỊ TÁ (Ức chế độc tính / Trị triệu chứng phụ)</div>
            ${s.ta.map(h => `
              <div class="herb-item-row">
                <span class="herb-name-dose">• ${h.name} (${h.dosage})</span>
                <span class="herb-role-desc">${h.role}</span>
              </div>
            `).join("")}
          </div>
        ` : ""}

        <!-- SỨ -->
        ${s.su && s.su.length > 0 ? `
          <div class="role-group-card role-su">
            <div class="role-header role-su">🕊️ VỊ SỨ (Dẫn thuốc đến kinh bệnh / Điều hòa)</div>
            ${s.su.map(h => `
              <div class="herb-item-row">
                <span class="herb-name-dose">• ${h.name} (${h.dosage})</span>
                <span class="herb-role-desc">${h.role}</span>
              </div>
            `).join("")}
          </div>
        ` : ""}
      </div>

      <!-- DYNAMIC MODIFICATION ENGINE -->
      ${formula.modifications && formula.modifications.length > 0 ? `
        <div class="modification-box">
          <h4 style="margin:0; font-size:var(--text-xs); font-weight:700; color:var(--color-text); display:flex; align-items:center; gap:0.35rem;">
            <i class="fa-solid fa-wand-magic-sparkles" style="color:var(--color-warning);"></i> ĐỘNG CƠ GIA GIẢM BÀI THUỐC LÂM SÀNG:
          </h4>

          ${formula.modifications.map((mod, idx) => `
            <div class="mod-item">
              <label style="display:flex; gap:0.5rem; cursor:pointer; font-weight:600; color:var(--color-text);">
                <input type="checkbox" class="mod-check" value="${idx}" ${activeModifications.includes(idx) ? 'checked' : ''}>
                <span>Nếu bệnh nhân có: ${mod.symptom}</span>
              </label>

              <div style="margin-top:0.35rem; font-size:11px; padding-left:1.5rem;">
                <span style="color:var(--color-success); font-weight:700;">➜ Thêm: ${mod.add.join(", ")}</span>
                <span style="color:var(--color-tcm-green); font-weight:700; margin-left:0.5rem;">➔ Thành bài: ${mod.resultName}</span>
                <div style="color:var(--color-text-muted); margin-top:2px;">Tác dụng: ${mod.desc}</div>
              </div>
            </div>
          `).join("")}
        </div>
      ` : ""}
    `;

    // Attach Mod Checkbox Event
    document.querySelectorAll(".mod-check").forEach(chk => {
      chk.addEventListener("change", (e) => {
        const val = parseInt(e.target.value);
        if (e.target.checked) {
          if (!activeModifications.includes(val)) activeModifications.push(val);
        } else {
          activeModifications = activeModifications.filter(x => x !== val);
        }
      });
    });
  }

  // Search Input Listener
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderFormulasList();
  });

  // Initialize
  renderFormulasList();
  selectFormula("luc-vi-dia-hoang-hoan");
});
