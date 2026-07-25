// Logic hiển thị, tìm kiếm và quản lý "Yêu thích" cho Công cụ lâm sàng

document.addEventListener("DOMContentLoaded", () => {
  const lessonsContainer = document.getElementById("lessons-container");
  if (!lessonsContainer) return;

  const searchInput = document.getElementById("lesson-search");
  const clearSearchBtn = document.getElementById("clear-search");
  const emptyState = document.getElementById("empty-search-state");

  const FAVORITES_KEY = "cliniportal_favorite_tools";
  let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");

  // Xóa các section tĩnh cũ đi, ngoại trừ favorites-section và empty state
  const oldSections = lessonsContainer.querySelectorAll("section:not(#favorites-section)");
  oldSections.forEach(sec => sec.remove());

  // Render các section động
  function renderAllTools() {
    let html = "";
    
    // Group tools by part
    const groupedTools = {};
    clinicalToolsData.forEach(tool => {
      if (!groupedTools[tool.part]) groupedTools[tool.part] = [];
      groupedTools[tool.part].push(tool);
    });

    for (const [partId, tools] of Object.entries(groupedTools)) {
      const meta = partMetadata[partId];
      if (!meta) continue;

      html += `
        <section id="${partId}" class="tool-section" aria-labelledby="${meta.id}-heading">
          <div class="physio-group-container">
            <div class="physio-group-header">
              <span class="physio-group-icon"><i class="fa-solid ${meta.icon}"></i></span>
              <h3 id="${meta.id}-heading">${meta.name}</h3>
            </div>
            <div class="specialty-grid">
              ${tools.map(t => createToolCard(t)).join("")}
            </div>
          </div>
        </section>
      `;
    }

    // Insert sau favorites section
    const favSection = document.getElementById("favorites-section");
    favSection.insertAdjacentHTML("afterend", html);
    
    attachFavoriteEvents();
  }

  function createToolCard(tool, isFavoriteView = false) {
    const isFav = favorites.includes(tool.id);
    const starClass = isFav ? "fa-solid fa-star" : "fa-regular fa-star";
    const starColor = isFav ? "var(--color-warning)" : "var(--color-text-muted)";
    
    return `
      <div class="specialty-card tool-card" data-tool-id="${tool.id}" data-tags="${tool.tags.join(" ")}">
        <div class="specialty-card-top">
          <div class="specialty-icon">${tool.icon}</div>
          <div class="specialty-info">
            <h3>${tool.title}</h3>
            <p>${tool.description}</p>
          </div>
          <button class="fav-btn" data-id="${tool.id}" title="${isFav ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}" style="position:absolute; top: 12px; right: 12px; background: transparent; border: none; cursor: pointer; color: ${starColor}; font-size: 1.1rem;">
            <i class="${starClass}"></i>
          </button>
        </div>
        <a href="${encodeURI(tool.link)}" class="specialty-card-action" style="text-decoration:none; display:flex; justify-content:space-between; align-items:center;">
          <span>Mở công cụ</span>
          <i class="fa-solid fa-chevron-right"></i>
        </a>
      </div>
    `;
  }

  function renderFavorites() {
    const favSection = document.getElementById("favorites-section");
    const favGrid = document.getElementById("favorites-grid");
    
    if (favorites.length === 0) {
      favSection.style.display = "none";
      return;
    }

    favSection.style.display = "block";
    const favTools = clinicalToolsData.filter(t => favorites.includes(t.id));
    
    favGrid.innerHTML = favTools.map(t => createToolCard(t, true)).join("");
    attachFavoriteEvents(favGrid);
  }

  function attachFavoriteEvents(container = document) {
    const btns = container.querySelectorAll(".fav-btn");
    btns.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        toggleFavorite(id);
      };
    });
  }

  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      favorites = favorites.filter(fav => fav !== id);
    } else {
      favorites.push(id);
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    
    // Cập nhật lại UI
    renderFavorites();
    
    // Cập nhật trạng thái sao trên danh sách chính
    const allBtns = document.querySelectorAll(`.tool-card[data-tool-id="${id}"] .fav-btn`);
    allBtns.forEach(btn => {
      const isFav = favorites.includes(id);
      btn.innerHTML = `<i class="${isFav ? 'fa-solid fa-star' : 'fa-regular fa-star'}"></i>`;
      btn.style.color = isFav ? "var(--color-warning)" : "var(--color-text-muted)";
      btn.title = isFav ? "Bỏ yêu thích" : "Thêm vào yêu thích";
    });
  }

  function handleSearch(query) {
    query = query.toLowerCase().trim();
    const normalizedQuery = query.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Không dấu
    
    if (query === "") {
      clearSearchBtn.style.display = "none";
      document.querySelectorAll(".tool-section").forEach(sec => sec.style.display = "block");
      document.querySelectorAll(".tool-card").forEach(card => card.style.display = "block");
      emptyState.style.display = "none";
      if (favorites.length > 0) document.getElementById("favorites-section").style.display = "block";
      return;
    }

    clearSearchBtn.style.display = "block";
    document.getElementById("favorites-section").style.display = "none"; // Ẩn fav khi tìm kiếm

    let hasResult = false;
    
    const sections = document.querySelectorAll(".tool-section");
    sections.forEach(sec => {
      let sectionHasResult = false;
      const cards = sec.querySelectorAll(".tool-card");
      
      cards.forEach(card => {
        const id = card.getAttribute("data-tool-id");
        const tool = clinicalToolsData.find(t => t.id === id);
        if (!tool) return;
        
        const title = tool.title.toLowerCase();
        const desc = tool.description.toLowerCase();
        const tags = tool.tags.join(" ");
        const combined = `${title} ${desc} ${tags}`;
        const normalizedCombined = combined.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        if (combined.includes(query) || normalizedCombined.includes(normalizedQuery)) {
          card.style.display = "block";
          sectionHasResult = true;
          hasResult = true;
        } else {
          card.style.display = "none";
        }
      });
      
      sec.style.display = sectionHasResult ? "block" : "none";
    });

    emptyState.style.display = hasResult ? "none" : "flex";
  }

  // Khởi tạo
  renderAllTools();
  renderFavorites();

  // Sự kiện tìm kiếm
  if (searchInput) {
    searchInput.addEventListener("input", (e) => handleSearch(e.target.value));
  }
  
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      handleSearch("");
      searchInput.focus();
    });
  }
});
