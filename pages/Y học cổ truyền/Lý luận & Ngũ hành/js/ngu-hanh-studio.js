/**
 * NGU HANH STUDIO CONTROLLER - CliniPortal YHCT Module
 * SVG Engine, Node Interactivity, Relation Animation & Clinical Scenario Simulator
 */

document.addEventListener("DOMContentLoaded", function () {
  const svg = document.getElementById("nguhanhSVG");
  const detailPanel = document.getElementById("nguhanhDetailPanel");
  const scenarioSelect = document.getElementById("scenarioSelect");
  const modeBtns = document.querySelectorAll(".mode-btn");

  if (!svg || typeof NGU_HANH_DATA === "undefined") return;

  const width = 500;
  const height = 500;
  const cx = width / 2;
  const cy = height / 2;
  const radius = 170; // Circle radius for 5 nodes

  // Element positions: Fire (Top), Earth (Top-Right), Metal (Bottom-Right), Water (Bottom-Left), Wood (Top-Left/Left)
  // Standard arrangement: Wood (-162deg), Fire (-90deg), Earth (-18deg), Metal (54deg), Water (126deg)
  const nodeOrder = ["wood", "fire", "earth", "metal", "water"];
  const nodePositions = {
    fire:  { angle: -90, x: 0, y: 0 },
    earth: { angle: -18, x: 0, y: 0 },
    metal: { angle: 54,  x: 0, y: 0 },
    water: { angle: 126, x: 0, y: 0 },
    wood:  { angle: 198, x: 0, y: 0 }
  };

  // Compute XY coordinates
  Object.keys(nodePositions).forEach(key => {
    const rad = (nodePositions[key].angle * Math.PI) / 180;
    nodePositions[key].x = cx + radius * Math.cos(rad);
    nodePositions[key].y = cy + radius * Math.sin(rad);
  });

  let activeElement = "wood";
  let activeFilter = "all"; // 'all', 'sheng', 'ke', 'scenario'
  let activeScenarioId = "";

  // Render SVG Elements & Paths
  function renderSVGStage() {
    svg.innerHTML = `
      <defs>
        <!-- Arrowhead Markers -->
        <marker id="arrow-sheng" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981" />
        </marker>
        <marker id="arrow-ke" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
        </marker>
        <marker id="arrow-overact" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#d97706" />
        </marker>
      </defs>
      
      <!-- Outer Decorative Ring -->
      <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="var(--color-divider)" stroke-width="1.5" stroke-dasharray="4 4"/>
      
      <!-- Group for Paths -->
      <g id="pathsGroup"></g>
      
      <!-- Group for Nodes -->
      <g id="nodesGroup"></g>
    `;

    const pathsGroup = svg.querySelector("#pathsGroup");
    const nodesGroup = svg.querySelector("#nodesGroup");

    // 1. Draw Tương Sinh Paths (Curved arcs around outer circle)
    NGU_HANH_DATA.relations.sheng.forEach(rel => {
      const start = nodePositions[rel.from];
      const end = nodePositions[rel.to];
      
      // Arc path
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const d = `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
      path.setAttribute("d", d);
      path.setAttribute("class", "relation-path sheng-path");
      path.setAttribute("id", `path-sheng-${rel.from}-${rel.to}`);
      path.setAttribute("marker-end", "url(#arrow-sheng)");
      
      path.addEventListener("click", () => {
        showRelationInfo(rel);
      });

      pathsGroup.appendChild(path);
    });

    // 2. Draw Tương Khắc Paths (Inner star lines)
    NGU_HANH_DATA.relations.ke.forEach(rel => {
      const start = nodePositions[rel.from];
      const end = nodePositions[rel.to];
      
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const d = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
      path.setAttribute("d", d);
      path.setAttribute("class", "relation-path ke-path");
      path.setAttribute("id", `path-ke-${rel.from}-${rel.to}`);
      path.setAttribute("marker-end", "url(#arrow-ke)");
      
      path.addEventListener("click", () => {
        showRelationInfo(rel);
      });

      pathsGroup.appendChild(path);
    });

    // 3. Draw Nodes
    Object.keys(NGU_HANH_DATA.elements).forEach(key => {
      const data = NGU_HANH_DATA.elements[key];
      const pos = nodePositions[key];

      const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
      g.setAttribute("class", `element-node ${key === activeElement ? "active" : ""}`);
      g.setAttribute("id", `node-${key}`);
      g.setAttribute("transform", `translate(${pos.x}, ${pos.y})`);

      g.innerHTML = `
        <circle class="node-bg" r="34" fill="${data.colorHl}" stroke="${data.color}" />
        <text y="-6" text-anchor="middle" font-size="20" fill="${data.darkColor}">${data.symbol}</text>
        <text y="14" text-anchor="middle" font-size="12" font-weight="700" fill="${data.darkColor}">${data.name}</text>
        <text y="26" text-anchor="middle" font-size="9" font-weight="600" fill="var(--color-text-muted)">(${data.tang})</text>
      `;

      g.addEventListener("click", () => {
        setActiveElement(key);
      });

      nodesGroup.appendChild(g);
    });
  }

  // Set Active Element & Update Panel
  function setActiveElement(key) {
    activeElement = key;
    
    // Update SVG nodes active class
    document.querySelectorAll(".element-node").forEach(node => {
      node.classList.remove("active");
    });
    const activeNode = document.getElementById(`node-${key}`);
    if (activeNode) activeNode.classList.add("active");

    // Render detail panel for this element
    const data = NGU_HANH_DATA.elements[key];
    if (!data) return;

    detailPanel.innerHTML = `
      <div class="panel-header">
        <h3>
          <span>${data.symbol} Hành ${data.name}</span>
        </h3>
        <span class="element-badge-lg" style="background-color: ${data.color}">Tạng ${data.tang} - Phủ ${data.phu}</span>
      </div>

      <p style="font-size: var(--text-xs); color: var(--color-text-muted); margin: 0; line-height: 1.5;">
        ${data.description}
      </p>

      <!-- Attributes Grid -->
      <div class="attributes-grid">
        <div class="attr-item"><strong>Tạng:</strong> <span>${data.tang}</span></div>
        <div class="attr-item"><strong>Phủ:</strong> <span>${data.phu}</span></div>
        <div class="attr-item"><strong>Chủ Thể:</strong> <span>${data.the}</span></div>
        <div class="attr-item"><strong>Khai Khiếu:</strong> <span>${data.khieu}</span></div>
        <div class="attr-item"><strong>Tình Chí:</strong> <span>${data.chi}</span></div>
        <div class="attr-item"><strong>Sắc:</strong> <span>${data.sac}</span></div>
        <div class="attr-item"><strong>Ngũ Vị:</strong> <span>${data.vi}</span></div>
        <div class="attr-item"><strong>Thời Mùa:</strong> <span>${data.mua}</span></div>
        <div class="attr-item"><strong>Hướng:</strong> <span>${data.huong}</span></div>
        <div class="attr-item"><strong>Biến Hóa Khí:</strong> <span>${data.khi}</span></div>
      </div>

      <!-- Ngũ Du Huyệt List -->
      <div class="nguduhuyet-card">
        <h4><i class="fa-solid fa-location-dot" style="color:${data.color}"></i> Ngũ Du Huyệt Kinh ${data.tang}</h4>
        <div class="duhuyet-list">
          ${data.nguDuHuyet.map(h => `
            <div class="duhuyet-item">
              <span class="duhuyet-type">${h.type}</span>
              <span class="duhuyet-name">${h.name}</span>
              <span class="duhuyet-loc">${h.loc}</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  // Show Relation Info popup / panel override
  function showRelationInfo(rel) {
    const fromEl = NGU_HANH_DATA.elements[rel.from];
    const toEl = NGU_HANH_DATA.elements[rel.to];

    detailPanel.innerHTML = `
      <div class="panel-header">
        <h3>
          <i class="fa-solid fa-arrows-spin" style="color:var(--color-primary);"></i>
          <span>${rel.label}</span>
        </h3>
        <span class="element-badge-lg" style="background-color:var(--color-primary)">Quy luật Ngũ Hành</span>
      </div>

      <div class="attributes-grid" style="grid-template-columns: 1fr;">
        <div class="attr-item">
          <strong>Quan hệ:</strong> <span>${fromEl.name} (${fromEl.tang}) ➔ ${toEl.name} (${toEl.tang})</span>
        </div>
        <div class="attr-item">
          <strong>Cơ chế y lý:</strong>
          <p style="margin: 0.25rem 0 0 0; color: var(--color-text-muted); font-size: var(--text-xs); line-height: 1.5;">
            ${rel.desc}
          </p>
        </div>
      </div>
      
      <button class="mode-btn active" onclick="setActiveElement('${rel.from}')" style="margin-top: 1rem; width: 100%; justify-content: center;">
        <i class="fa-solid fa-arrow-left"></i> Quay lại chi tiết Hành ${fromEl.name}
      </button>
    `;
  }

  // Populate Scenario Select
  function initScenarioDropdown() {
    if (!scenarioSelect) return;
    scenarioSelect.innerHTML = `<option value="">-- Chọn thể bệnh mô phỏng --</option>`;
    
    NGU_HANH_DATA.scenarios.forEach(sc => {
      const opt = document.createElement("option");
      opt.value = sc.id;
      opt.textContent = `${sc.title} [${sc.type}]`;
      scenarioSelect.appendChild(opt);
    });

    scenarioSelect.addEventListener("change", (e) => {
      const scId = e.target.value;
      if (!scId) {
        activeScenarioId = "";
        applyFilter(activeFilter);
        setActiveElement(activeElement);
        return;
      }
      activeScenarioId = scId;
      runScenarioSimulation(scId);
    });
  }

  // Run Scenario Simulation
  function runScenarioSimulation(scId) {
    const scenario = NGU_HANH_DATA.scenarios.find(s => s.id === scId);
    if (!scenario) return;

    // Highlight paths & nodes in scenario
    document.querySelectorAll(".relation-path").forEach(p => {
      p.classList.add("faint-path");
      p.classList.remove("active-path");
    });

    // Highlight nodes
    document.querySelectorAll(".element-node").forEach(n => n.classList.remove("active"));
    scenario.affected.forEach(aff => {
      const nodeEl = document.getElementById(`node-${aff}`);
      if (nodeEl) nodeEl.classList.add("active");
    });

    // Find and highlight path
    const targetPathSheng = document.getElementById(`path-sheng-${scenario.primary}-${scenario.target}`);
    const targetPathKe = document.getElementById(`path-ke-${scenario.primary}-${scenario.target}`);
    
    if (targetPathSheng) {
      targetPathSheng.classList.remove("faint-path");
      targetPathSheng.classList.add("active-path");
    }
    if (targetPathKe) {
      targetPathKe.classList.remove("faint-path");
      targetPathKe.classList.add("active-path");
    }

    // Render Scenario Details in Panel
    detailPanel.innerHTML = `
      <div class="panel-header">
        <h3>
          <i class="fa-solid fa-triangle-exclamation" style="color:var(--color-warning);"></i>
          <span>${scenario.title}</span>
        </h3>
        <span class="element-badge-lg" style="background-color:var(--color-warning)">${scenario.type}</span>
      </div>

      <div class="scenario-details-box">
        <div class="scenario-row">
          <strong>Bản chất cơ chế sinh bệnh:</strong>
          <p>${scenario.mechanism}</p>
        </div>
        <div class="scenario-row">
          <strong>Triệu chứng lâm sàng điển hình:</strong>
          <p style="color:var(--color-danger); font-weight: 500;">🤒 ${scenario.symptoms}</p>
        </div>
        <div class="scenario-row">
          <strong>Nguyên tắc & Phác đồ điều trị:</strong>
          <p style="color:var(--color-success); font-weight: 600;">💊 ${scenario.principle}</p>
        </div>
        <div class="scenario-row">
          <strong>Huyệt vị ưu tiên châm cứu:</strong>
          <p style="color:var(--color-tcm-green); font-weight: 600;">📍 ${scenario.points}</p>
        </div>
      </div>
    `;
  }

  // Filter Buttons Handler
  modeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      modeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const mode = btn.getAttribute("data-mode");
      activeFilter = mode;
      
      // Reset scenario dropdown if switching away
      if (mode !== "scenario" && scenarioSelect) {
        scenarioSelect.value = "";
        activeScenarioId = "";
      }

      applyFilter(mode);
    });
  });

  function applyFilter(filter) {
    const shengPaths = document.querySelectorAll(".sheng-path");
    const kePaths = document.querySelectorAll(".ke-path");

    shengPaths.forEach(p => {
      p.classList.remove("faint-path", "active-path");
    });
    kePaths.forEach(p => {
      p.classList.remove("faint-path", "active-path");
    });

    if (filter === "sheng") {
      kePaths.forEach(p => p.classList.add("faint-path"));
    } else if (filter === "ke") {
      shengPaths.forEach(p => p.classList.add("faint-path"));
    }
  }

  // Initialize
  renderSVGStage();
  initScenarioDropdown();
  setActiveElement("wood");

  // Expose function globally for back buttons
  window.setActiveElement = setActiveElement;
});
