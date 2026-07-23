/**
 * DUOC THAO DATABASE CONTROLLER - CliniPortal YHCT Module
 * Real-time Search, Multi-Facet Filters, Herb Detail Modal & Side-by-Side Comparison Engine
 */

document.addEventListener("DOMContentLoaded", function () {
  const cardsGrid = document.getElementById("dtCardsGrid");
  const searchInput = document.getElementById("dtSearchInput");
  const filterChips = document.querySelectorAll(".dt-chip");
  const resultCount = document.getElementById("dtResultCount");
  const compareBar = document.getElementById("dtCompareBar");
  const compareCountEl = document.getElementById("compareCount");
  const btnOpenCompare = document.getElementById("btnOpenCompare");
  const btnClearCompare = document.getElementById("btnClearCompare");
  const modalContainer = document.getElementById("dtModalContainer");

  if (!cardsGrid || typeof DUOC_THAO_DATA === "undefined") return;

  let activeFilters = {
    nature: [],
    taste: [],
    meridian: [],
    category: []
  };
  let searchQuery = "";
  let selectedForCompare = []; // Array of herb IDs

  // Filter Logic
  function getFilteredHerbs() {
    return DUOC_THAO_DATA.filter(herb => {
      // 1. Text Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = herb.name.toLowerCase().includes(q);
        const matchPinyin = herb.pinyin.toLowerCase().includes(q);
        const matchLatin = herb.latin.toLowerCase().includes(q);
        const matchActions = herb.actions.toLowerCase().includes(q);
        const matchIndications = herb.indications.toLowerCase().includes(q);

        if (!matchName && !matchPinyin && !matchLatin && !matchActions && !matchIndications) {
          return false;
        }
      }

      // 2. Nature Filter
      if (activeFilters.nature.length > 0) {
        if (!activeFilters.nature.includes(herb.nature)) return false;
      }

      // 3. Taste Filter
      if (activeFilters.taste.length > 0) {
        const hasTaste = herb.taste.some(t => activeFilters.taste.includes(t));
        if (!hasTaste) return false;
      }

      // 4. Meridian Filter
      if (activeFilters.meridian.length > 0) {
        const hasMeridian = herb.meridians.some(m => activeFilters.meridian.includes(m));
        if (!hasMeridian) return false;
      }

      // 5. Category Filter
      if (activeFilters.category.length > 0) {
        const hasCat = activeFilters.category.some(c => herb.category.includes(c));
        if (!hasCat) return false;
      }

      return true;
    });
  }

  // Render Herb Cards Grid
  function renderHerbsGrid() {
    const list = getFilteredHerbs();
    resultCount.innerText = `${list.length} dược liệu`;

    if (list.length === 0) {
      cardsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding: 3rem 1rem; color: var(--color-text-muted);">
          <i class="fa-solid fa-seedling" style="font-size: 2.5rem; margin-bottom: 0.5rem; opacity: 0.5;"></i>
          <p>Không tìm thấy dược liệu phù hợp với bộ lọc hiện tại.</p>
        </div>
      `;
      return;
    }

    cardsGrid.innerHTML = list.map(herb => {
      const isChecked = selectedForCompare.includes(herb.id);
      let natureClass = "nature-binh";
      if (herb.nature.includes("Ôn") || herb.nature.includes("Nhiệt")) natureClass = "nature-on";
      if (herb.nature.includes("Hàn") || herb.nature.includes("Lương")) natureClass = "nature-han";

      return `
        <div class="dt-card">
          <div>
            <div class="dt-card-header">
              <div class="dt-card-avatar">${herb.icon}</div>
              <div class="dt-card-title-group">
                <h4>${herb.name}</h4>
                <div class="dt-card-pinyin">${herb.pinyin}</div>
              </div>
            </div>

            <div class="dt-meta-row" style="margin-top: 0.65rem;">
              <span class="dt-badge ${natureClass}">Tính: ${herb.nature}</span>
              ${herb.taste.map(t => `<span class="dt-badge">Vị: ${t}</span>`).join("")}
              <span class="dt-badge" style="background:var(--color-tcm-green-hl); color:var(--color-tcm-green);">Quy: ${herb.meridians.join(", ")}</span>
            </div>

            <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin: 0.65rem 0 0 0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              ${herb.actions}
            </p>
          </div>

          <div class="dt-card-actions">
            <label class="compare-checkbox-label">
              <input type="checkbox" class="dt-compare-check" value="${herb.id}" ${isChecked ? "checked" : ""}>
              <span>So sánh</span>
            </label>
            
            <button class="dt-btn-detail" onclick="openHerbModal('${herb.id}')">
              Chi tiết <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      `;
    }).join("");

    // Attach check events
    document.querySelectorAll(".dt-compare-check").forEach(chk => {
      chk.addEventListener("change", (e) => {
        const id = e.target.value;
        if (e.target.checked) {
          if (selectedForCompare.length >= 3) {
            alert("Bạn chỉ có thể chọn tối đa 3 vị thuốc để so sánh cùng lúc!");
            e.target.checked = false;
            return;
          }
          if (!selectedForCompare.includes(id)) selectedForCompare.push(id);
        } else {
          selectedForCompare = selectedForCompare.filter(x => x !== id);
        }
        updateCompareBar();
      });
    });
  }

  // Update Compare Bar State
  function updateCompareBar() {
    if (selectedForCompare.length > 0) {
      compareBar.style.display = "flex";
      compareCountEl.innerText = selectedForCompare.length;
    } else {
      compareBar.style.display = "none";
    }
  }

  // Open Modal Herb Detail
  window.openHerbModal = function (herbId) {
    const herb = DUOC_THAO_DATA.find(h => h.id === herbId);
    if (!herb) return;

    const hasPhan = herb.interactions && herb.interactions.phan && herb.interactions.phan.length > 0;
    const hasUy = herb.interactions && herb.interactions.uy && herb.interactions.uy.length > 0;

    modalContainer.innerHTML = `
      <div class="dt-modal-overlay" onclick="closeModal(event)">
        <div class="dt-modal-card" onclick="event.stopPropagation()">
          <button class="dt-modal-close" onclick="closeModalDirect()">&times;</button>
          
          <div style="display:flex; gap:1rem; align-items:center; margin-bottom:1rem; border-bottom:2px solid var(--color-surface-offset); padding-bottom:0.75rem;">
            <div style="font-size:2.5rem;">${herb.icon}</div>
            <div>
              <h3 style="margin:0; font-size:var(--text-lg); font-weight:700; color:var(--color-text);">
                ${herb.name} <span style="font-size:var(--text-xs); font-style:italic; color:var(--color-text-muted); font-weight:400;">${herb.latin}</span>
              </h3>
              <div style="font-size:var(--text-xs); color:var(--color-tcm-green); font-weight:600;">${herb.pinyin} • Nhóm: ${herb.category}</div>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; background:var(--color-surface-offset); padding:0.85rem; border-radius:var(--radius-md); font-size:var(--text-xs); margin-bottom:1rem;">
            <div><strong>Tính vị:</strong> ${herb.nature}, Vị ${herb.taste.join(", ")}</div>
            <div><strong>Quy kinh:</strong> ${herb.meridians.join(", ")}</div>
            <div><strong>Liều dùng chuẩn:</strong> ${herb.dosage}</div>
            <div><strong>Nhóm tác dụng:</strong> ${herb.category}</div>
          </div>

          <div style="display:flex; flex-direction:column; gap:0.75rem; font-size:var(--text-xs); line-height:1.5;">
            <div>
              <strong style="color:var(--color-text);">🌿 Công năng cốt lõi:</strong>
              <p style="margin:0.2rem 0 0 0; color:var(--color-text-muted);">${herb.actions}</p>
            </div>

            <div>
              <strong style="color:var(--color-text);">🩺 Chủ trị lâm sàng:</strong>
              <p style="margin:0.2rem 0 0 0; color:var(--color-text-muted);">${herb.indications}</p>
            </div>

            <div>
              <strong style="color:var(--color-warning);">⚠️ Cấm kỵ & Thận trọng:</strong>
              <p style="margin:0.2rem 0 0 0; color:var(--color-warning);">${herb.contraindications}</p>
            </div>

            ${(hasPhan || hasUy) ? `
              <div class="warning-box-dt">
                <strong><i class="fa-solid fa-radiation"></i> CẢNH BÁO TƯƠNG KỴ ĐÔNG Y:</strong>
                ${hasPhan ? `<div>• <strong>Thập Bát Phản:</strong> Phản ${herb.interactions.phan.join(", ")}</div>` : ""}
                ${hasUy ? `<div>• <strong>Thập Cửu Úy:</strong> Úy ${herb.interactions.uy.join(", ")}</div>` : ""}
                <div>• <strong>Kiêng kỵ khi dùng:</strong> ${herb.interactions.kieng}</div>
              </div>
            ` : ""}

            ${herb.commonFormulas ? `
              <div style="margin-top:0.5rem;">
                <strong style="color:var(--color-text);">📜 Bài thuốc cổ phương tiêu biểu chứa ${herb.name}:</strong>
                <div style="display:flex; flex-wrap:wrap; gap:0.35rem; margin-top:0.35rem;">
                  ${herb.commonFormulas.map(f => `<span class="dt-badge" style="background:var(--color-surface-offset); border-color:var(--color-tcm-green); color:var(--color-tcm-green);">${f}</span>`).join("")}
                </div>
              </div>
            ` : ""}
          </div>
        </div>
      </div>
    `;
  };

  // Open Compare Table Modal
  btnOpenCompare.addEventListener("click", () => {
    if (selectedForCompare.length < 2) {
      alert("Vui lòng chọn ít nhất 2 vị thuốc để thực hiện so sánh đối chiếu!");
      return;
    }

    const herbs = selectedForCompare.map(id => DUOC_THAO_DATA.find(h => h.id === id)).filter(Boolean);

    modalContainer.innerHTML = `
      <div class="dt-modal-overlay" onclick="closeModal(event)">
        <div class="dt-modal-card" style="max-width:900px;" onclick="event.stopPropagation()">
          <button class="dt-modal-close" onclick="closeModalDirect()">&times;</button>
          
          <h3 style="margin:0 0 1rem 0; font-size:var(--text-md); font-weight:700; color:var(--color-text); display:flex; align-items:center; gap:0.5rem;">
            <i class="fa-solid fa-code-compare" style="color:var(--color-tcm-green);"></i> BẢNG SO SÁNH ĐỐI CHIẾU DƯỢC LIỆU
          </h3>

          <div style="overflow-x:auto;">
            <table class="dt-compare-table">
              <thead>
                <tr>
                  <th style="width:120px;">Thuộc tính</th>
                  ${herbs.map(h => `
                    <th>
                      <div style="display:flex; align-items:center; gap:0.5rem;">
                        <span style="font-size:1.25rem;">${h.icon}</span>
                        <div>
                          <div>${h.name}</div>
                          <div style="font-size:10px; font-weight:400; color:var(--color-text-muted);">${h.pinyin}</div>
                        </div>
                      </div>
                    </th>
                  `).join("")}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <strong><th>Tính vị</th></strong>
                  ${herbs.map(h => `<td><strong>Tính:</strong> ${h.nature}<br><strong>Vị:</strong> ${h.taste.join(", ")}</td>`).join("")}
                </tr>
                <tr>
                  <strong><th>Quy Kinh</th></strong>
                  ${herbs.map(h => `<td style="color:var(--color-tcm-green); font-weight:600;">${h.meridians.join(", ")}</td>`).join("")}
                </tr>
                <tr>
                  <strong><th>Nhóm Dược Lý</th></strong>
                  ${herbs.map(h => `<td>${h.category}</td>`).join("")}
                </tr>
                <tr>
                  <strong><th>Công năng cốt lõi</th></strong>
                  ${herbs.map(h => `<td>${h.actions}</td>`).join("")}
                </tr>
                <tr>
                  <strong><th>Chủ trị lâm sàng</th></strong>
                  ${herbs.map(h => `<td>${h.indications}</td>`).join("")}
                </tr>
                <tr>
                  <strong><th>Cấm kỵ</th></strong>
                  ${herbs.map(h => `<td style="color:var(--color-warning);">${h.contraindications}</td>`).join("")}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  });

  btnClearCompare.addEventListener("click", () => {
    selectedForCompare = [];
    document.querySelectorAll(".dt-compare-check").forEach(c => c.checked = false);
    updateCompareBar();
  });

  window.closeModal = function (e) {
    if (e.target.classList.contains("dt-modal-overlay")) {
      modalContainer.innerHTML = "";
    }
  };

  window.closeModalDirect = function () {
    modalContainer.innerHTML = "";
  };

  // Search Listener
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderHerbsGrid();
  });

  // Filter Chips Listener
  filterChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const type = chip.getAttribute("data-filter-type");
      const val = chip.getAttribute("data-value");

      chip.classList.toggle("active");

      if (chip.classList.contains("active")) {
        if (!activeFilters[type].includes(val)) activeFilters[type].push(val);
      } else {
        activeFilters[type] = activeFilters[type].filter(x => x !== val);
      }

      renderHerbsGrid();
    });
  });

  // Initial Render
  renderHerbsGrid();
});
