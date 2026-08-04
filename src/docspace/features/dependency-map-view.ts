import { GRAPH_NODES, DependencyNode, RiskLevel, DomainCategory } from '../data/graphify-dependency-data';

export async function renderDependencyMapView(profileId: string): Promise<string> {
  return `
    <div class="dsp-dep-map-container fade-in">
      <div class="dsp-dep-map-header">
        <div class="dsp-header-title">
          <h2><i class="fa-solid fa-diagram-project"></i> Bản đồ Phụ thuộc (Core & Content)</h2>
          <p>Phân tích rủi ro & định vị kiểm thử (Graphify Risk Assessment)</p>
        </div>
        <div class="dsp-header-actions">
          <button class="dsp-btn dsp-btn-outline" id="depMapModeNet"><i class="fa-solid fa-circle-nodes"></i> Mạng lưới</button>
          <button class="dsp-btn dsp-btn-outline" id="depMapModeMatrix"><i class="fa-solid fa-table-cells-large"></i> Ma trận Rủi ro</button>
          <button class="dsp-btn dsp-btn-outline" id="depMapModeChecklist"><i class="fa-solid fa-list-check"></i> Checklist Kiểm thử</button>
        </div>
      </div>

      <div class="dsp-dep-map-controls">
        <div class="dsp-search-box">
          <i class="fa-solid fa-search"></i>
          <input type="text" id="depMapSearch" placeholder="Tìm kiếm module, file, hoặc function..." />
        </div>
        
        <div class="dsp-filter-group">
          <label>Chuyên khoa (Domain):</label>
          <select id="depMapDomainFilter" class="dsp-input">
            <option value="ALL">Tất cả</option>
            <option value="Bệnh lý">Bệnh lý</option>
            <option value="Triệu chứng">Triệu chứng</option>
            <option value="Công cụ">Công cụ</option>
            <option value="Kỹ năng">Kỹ năng</option>
            <option value="Sinh lý">Sinh lý</option>
            <option value="Dược lý">Dược lý</option>
            <option value="Guidelines">Guidelines</option>
            <option value="DocSpace">DocSpace</option>
            <option value="Core">Core Engine</option>
          </select>
        </div>

        <div class="dsp-filter-group">
          <label>Mức độ Rủi ro:</label>
          <select id="depMapRiskFilter" class="dsp-input">
            <option value="ALL">Tất cả</option>
            <option value="CRITICAL HUB">Critical Hub (>15)</option>
            <option value="HIGH RISK">High Risk (>5)</option>
            <option value="MEDIUM RISK">Medium Risk (>0)</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      <div class="dsp-dep-map-content" id="depMapContent">
        <!-- Content injected via JS based on mode -->
      </div>
      
      <!-- Detail Drawer -->
      <div class="dsp-dep-drawer" id="depDrawer">
        <div class="dsp-drawer-header">
          <h3 id="depDrawerTitle">Module Detail</h3>
          <button class="dsp-btn-ghost" id="depDrawerClose"><i class="fa-solid fa-times"></i></button>
        </div>
        <div class="dsp-drawer-body" id="depDrawerBody">
          <!-- Details injected here -->
        </div>
      </div>
    </div>
  `;
}

export function mountDependencyMapController(profileId: string): void {
  const contentEl = document.getElementById('depMapContent');
  const searchInput = document.getElementById('depMapSearch') as HTMLInputElement;
  const domainFilter = document.getElementById('depMapDomainFilter') as HTMLSelectElement;
  const riskFilter = document.getElementById('depMapRiskFilter') as HTMLSelectElement;
  
  const modeNetBtn = document.getElementById('depMapModeNet');
  const modeMatrixBtn = document.getElementById('depMapModeMatrix');
  const modeChecklistBtn = document.getElementById('depMapModeChecklist');
  
  const drawer = document.getElementById('depDrawer');
  const drawerClose = document.getElementById('depDrawerClose');
  const drawerTitle = document.getElementById('depDrawerTitle');
  const drawerBody = document.getElementById('depDrawerBody');

  let currentMode: 'net' | 'matrix' | 'checklist' = 'matrix';
  let filteredNodes = [...GRAPH_NODES];

  function applyFilters() {
    const term = searchInput.value.toLowerCase();
    const domain = domainFilter.value;
    const risk = riskFilter.value;

    filteredNodes = GRAPH_NODES.filter(n => {
      const matchTerm = term === '' || n.label.toLowerCase().includes(term) || n.id.toLowerCase().includes(term);
      const matchDomain = domain === 'ALL' || n.domain === domain;
      const matchRisk = risk === 'ALL' || n.riskLevel === risk;
      return matchTerm && matchDomain && matchRisk;
    });
    renderCurrentMode();
  }

  function getRiskBadgeClass(risk: RiskLevel) {
    if (risk === 'CRITICAL HUB') return 'dsp-badge-danger';
    if (risk === 'HIGH RISK') return 'dsp-badge-warning';
    if (risk === 'MEDIUM RISK') return 'dsp-badge-info';
    return 'dsp-badge-stable';
  }

  function renderNetwork() {
    // A stylized visual mapping where Core nodes are at center, and domains branch out
    const domains = Array.from(new Set(filteredNodes.map(n => n.domain)));
    
    let html = `<div class="dsp-dep-network-view">`;
    
    // Core hub (if filteredNodes contains core, else just a dummy hub)
    html += `<div class="dsp-dep-core-hub">
      <div class="dsp-dep-node core-node" data-id="CORE">
        <i class="fa-solid fa-microchip"></i>
        <span>Core Engine</span>
      </div>
    </div>`;

    html += `<div class="dsp-dep-domain-branches">`;
    domains.forEach(d => {
      if (d === 'Core') return;
      const nodesInDomain = filteredNodes.filter(n => n.domain === d);
      if (nodesInDomain.length === 0) return;
      
      html += `
        <div class="dsp-dep-domain-branch">
          <div class="dsp-dep-branch-title">${d}</div>
          <div class="dsp-dep-node-list">
            ${nodesInDomain.map(n => `
              <div class="dsp-dep-node interactive-node" data-id="${n.id}">
                <div class="dsp-node-label" title="${n.label}">${n.label}</div>
                <div class="dsp-badge ${getRiskBadgeClass(n.riskLevel)}">${n.riskLevel} (${n.inbound})</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    });
    html += `</div></div>`;
    
    if (contentEl) contentEl.innerHTML = html;
    bindNodeClicks();
  }

  function renderMatrix() {
    if (!contentEl) return;
    
    let html = `<div class="dsp-dep-matrix-view">`;
    
    html += `
      <table class="dsp-report-table">
        <thead>
          <tr>
            <th>Module File</th>
            <th>Chuyên khoa</th>
            <th>Mức độ rủi ro</th>
            <th>Fan-in (Bị gọi)</th>
            <th>Fan-out (Gọi đi)</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
    `;
    
    // Sort by inbound descending
    const sorted = [...filteredNodes].sort((a, b) => b.inbound - a.inbound);
    
    sorted.forEach(n => {
      html += `
        <tr>
          <td style="font-family: monospace; font-size: 0.9em; max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${n.id}">
            <i class="fa-brands fa-js" style="color:#f59e0b; margin-right:4px;"></i> ${n.label}
          </td>
          <td><span class="dsp-badge">${n.domain}</span></td>
          <td><span class="dsp-badge ${getRiskBadgeClass(n.riskLevel)}">${n.riskLevel}</span></td>
          <td><strong>${n.inbound}</strong> modules</td>
          <td>${n.outbound} modules</td>
          <td>
            <button class="dsp-btn-ghost interactive-node" data-id="${n.id}" title="Xem chi tiết"><i class="fa-solid fa-magnifying-glass"></i></button>
          </td>
        </tr>
      `;
    });
    
    html += `</tbody></table></div>`;
    contentEl.innerHTML = html;
    bindNodeClicks();
  }

  function renderChecklist() {
    if (!contentEl) return;
    
    // Checklist groups by domains
    const domains = Array.from(new Set(filteredNodes.map(n => n.domain)));
    let html = `<div class="dsp-dep-checklist-view">`;
    
    html += `<div style="margin-bottom: 20px; padding: 15px; background: rgba(34,197,94,0.1); border: 1px solid var(--color-success); border-radius: 8px;">
      <h4><i class="fa-solid fa-clipboard-check"></i> Checklist Kiểm Thử Hồi Quy Tự Động</h4>
      <p style="margin-top: 5px; opacity: 0.8; font-size: 0.9em;">Các module hiển thị dưới đây có liên kết trực tiếp hoặc gián tiếp với những thay đổi trong Core Engine. Vui lòng kiểm tra (test) để đảm bảo không gãy đổ giao diện hoặc chức năng.</p>
    </div>`;
    
    domains.forEach(d => {
      const nodesInDomain = filteredNodes.filter(n => n.domain === d);
      if (nodesInDomain.length === 0) return;
      
      html += `
        <div class="dsp-check-group" style="margin-bottom: 20px;">
          <h4 style="border-bottom: 1px solid var(--color-border); padding-bottom: 8px; margin-bottom: 10px;"><i class="fa-solid fa-folder-tree"></i> Phân hệ: ${d} (${nodesInDomain.length} files)</h4>
          ${nodesInDomain.map(n => `
            <label class="dsp-check-item" style="display:flex; align-items:center; gap:10px; padding: 8px; border-radius: 6px; cursor: pointer;">
              <input type="checkbox" class="dsp-check-input" />
              <div style="flex:1;">
                <strong>${n.label}</strong>
                <div style="font-size:0.8em; opacity:0.7;">${n.id}</div>
              </div>
              <span class="dsp-badge ${getRiskBadgeClass(n.riskLevel)}">${n.riskLevel}</span>
            </label>
          `).join('')}
        </div>
      `;
    });
    
    html += `</div>`;
    contentEl.innerHTML = html;
  }

  function bindNodeClicks() {
    document.querySelectorAll('.interactive-node').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
        if (id) openDrawer(id);
      });
    });
  }

  function openDrawer(id: string) {
    const node = GRAPH_NODES.find(n => n.id === id);
    if (!node) return;
    
    if (drawerTitle) drawerTitle.innerHTML = `<i class="fa-brands fa-js"></i> ${node.label}`;
    
    if (drawerBody) {
      drawerBody.innerHTML = `
        <div style="margin-bottom:15px;">
          <span class="dsp-badge">${node.domain}</span>
          <span class="dsp-badge ${getRiskBadgeClass(node.riskLevel)}">${node.riskLevel}</span>
        </div>
        
        <div style="font-family: monospace; font-size: 0.85em; background: rgba(0,0,0,0.1); padding: 8px; border-radius: 6px; margin-bottom: 20px; word-break: break-all;">
          ${node.id}
        </div>
        
        <div class="dsp-dep-stats" style="display:flex; gap:15px; margin-bottom: 20px;">
          <div style="flex:1; background: var(--color-surface); border: 1px solid var(--color-border); padding: 10px; border-radius: 8px; text-align:center;">
            <div style="font-size:1.5em; font-weight:bold; color:var(--color-primary);">${node.inbound}</div>
            <div style="font-size:0.8em; opacity:0.8;">Fan-in (Bị gọi)</div>
          </div>
          <div style="flex:1; background: var(--color-surface); border: 1px solid var(--color-border); padding: 10px; border-radius: 8px; text-align:center;">
            <div style="font-size:1.5em; font-weight:bold; color:var(--color-warning);">${node.outbound}</div>
            <div style="font-size:0.8em; opacity:0.8;">Fan-out (Gọi đi)</div>
          </div>
        </div>
        
        <h4 style="margin-bottom: 10px; border-bottom:1px solid var(--color-border); padding-bottom:5px;">Top Callers (Bị gọi bởi)</h4>
        <ul style="padding-left:20px; font-size:0.9em; max-height:200px; overflow-y:auto; margin-bottom:20px;">
          ${node.callers.length === 0 ? '<li>Không có caller</li>' : ''}
          ${node.callers.slice(0, 50).map(c => `<li style="margin-bottom:4px; font-family:monospace;">${c.split('/').pop()}</li>`).join('')}
          ${node.callers.length > 50 ? `<li>...và ${node.callers.length - 50} module khác</li>` : ''}
        </ul>
        
        <h4 style="margin-bottom: 10px; border-bottom:1px solid var(--color-border); padding-bottom:5px;">Top Dependencies (Phụ thuộc vào)</h4>
        <ul style="padding-left:20px; font-size:0.9em; max-height:200px; overflow-y:auto;">
          ${node.dependencies.length === 0 ? '<li>Không có dependencies</li>' : ''}
          ${node.dependencies.map(d => `<li style="margin-bottom:4px; font-family:monospace;">${d.split('/').pop()}</li>`).join('')}
        </ul>
      `;
    }
    
    if (drawer) drawer.classList.add('open');
  }

  function renderCurrentMode() {
    document.querySelectorAll('.dsp-header-actions .dsp-btn').forEach(btn => btn.classList.remove('active'));
    
    if (currentMode === 'net') {
      modeNetBtn?.classList.add('active');
      renderNetwork();
    } else if (currentMode === 'matrix') {
      modeMatrixBtn?.classList.add('active');
      renderMatrix();
    } else if (currentMode === 'checklist') {
      modeChecklistBtn?.classList.add('active');
      renderChecklist();
    }
  }

  // Event Listeners
  searchInput.addEventListener('input', applyFilters);
  domainFilter.addEventListener('change', applyFilters);
  riskFilter.addEventListener('change', applyFilters);

  modeNetBtn?.addEventListener('click', () => { currentMode = 'net'; renderCurrentMode(); });
  modeMatrixBtn?.addEventListener('click', () => { currentMode = 'matrix'; renderCurrentMode(); });
  modeChecklistBtn?.addEventListener('click', () => { currentMode = 'checklist'; renderCurrentMode(); });

  drawerClose?.addEventListener('click', () => {
    if (drawer) drawer.classList.remove('open');
  });

  // Initial render
  renderCurrentMode();
}
