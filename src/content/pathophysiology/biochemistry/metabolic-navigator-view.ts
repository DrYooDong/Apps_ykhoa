/**
 * CliniPortal 2.0 — Interactive Metabolic Pathway Navigator SPA View
 * Path: src/content/pathophysiology/biochemistry/metabolic-navigator-view.ts
 */

import '../../../../css/components/metabolic-navigator.css';
import { METABOLIC_PATHWAYS, PathwayMap, MetabolicNode } from './metabolic-data';

export function renderMetabolicNavigatorView(activePathwayId: string = 'glycolysis'): string {
  const currentMap = METABOLIC_PATHWAYS[activePathwayId] || METABOLIC_PATHWAYS['glycolysis'];

  return `
    <div class="main-wrapper" style="width: 100%; max-width: 1440px; margin: 0 auto; padding-bottom: 3rem;">
      
      <!-- BREADCRUMB -->
      <div class="breadcrumb" style="font-size: 0.85rem; color: var(--color-text-muted, #64748b); margin-bottom: 1.25rem;">
        <a href="#/" style="color: inherit; text-decoration: none;">🏠 Trang chủ</a> &nbsp;/&nbsp; 
        <a href="#/pathophysiology" style="color: inherit; text-decoration: none;">🧬 Cơ Sở Y Khoa</a> &nbsp;/&nbsp;
        <a href="#/pathophysiology/hoa-sinh" style="color: inherit; text-decoration: none;">🧪 Hóa Sinh Y Học</a> &nbsp;/&nbsp;
        <span style="color: #8b5cf6; font-weight: 600;">Bản Đồ Chuyển Hóa Phân Tử Tương Tác</span>
      </div>

      <!-- HERO HEADER -->
      <div class="meta-canvas-card" style="background: linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(59,130,246,0.02) 100%); margin-bottom: 1.5rem; border-color: rgba(139,92,246,0.25);">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
              <span style="font-size: 0.75rem; font-weight: 800; background: #8b5cf6; color: #fff; padding: 0.2rem 0.65rem; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.05em;">Metabolic Studio Pro</span>
              <span style="font-size: 0.75rem; font-weight: 700; color: #0284c7; background: rgba(2,132,199,0.12); padding: 0.2rem 0.5rem; border-radius: 6px;">8 Chu Trình Phân Tử</span>
            </div>
            <h1 style="margin: 0.2rem 0 0.25rem; font-size: 1.65rem; font-weight: 800; color: var(--color-text, #0f172a);">
              🗺️ BẢN ĐỒ CHUYỂN HÓA & HÓA SINH PHÂN TỬ
            </h1>
            <p style="margin: 0; font-size: 0.9rem; color: var(--color-text-muted, #475569); max-width: 840px;">
              Khám phá các chu trình năng lượng và ngã rẽ chuyển hóa phân tử sinh học. <strong>Click vào bất kỳ Enzyme / Cơ chất nào</strong> để tra cứu ngay: Vitamin & Coenzyme, Điều hòa allosteric, Đích thuốc dược lý, Bệnh chuyển hóa bẩm sinh và Chỉ số xét nghiệm.
            </p>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <a href="#/pathophysiology/hoa-sinh" class="meta-tab-btn" style="text-decoration: none;">
              <i class="fa-solid fa-flask-vial"></i> 31 Bài Hóa Sinh
            </a>
            <a href="#/pathophysiology/simulators" class="meta-tab-btn" style="text-decoration: none;">
              <i class="fa-solid fa-bolt"></i> Mô Phỏng Sinh Lý
            </a>
            <a href="#/docspace/tools" class="meta-tab-btn" style="text-decoration: none; color: #0284c7; background: rgba(2,132,199,0.1); border-color: rgba(2,132,199,0.3);">
              <i class="fa-solid fa-vial-circle-check"></i> Tra Cứu Xét Nghiệm (DocSpace Lab)
            </a>
          </div>
        </div>
      </div>

      <!-- PATHWAY NAVIGATION TABS (8 Chu Trình) -->
      <div class="meta-pathway-tabs" id="metaPathwayTabs" style="margin-bottom: 1rem;">
        ${Object.values(METABOLIC_PATHWAYS).map(p => `
          <button class="meta-tab-btn ${p.id === currentMap.id ? 'active' : ''}" data-pathway="${p.id}">
            <i class="fa-solid ${p.icon}"></i> ${p.title}
          </button>
        `).join('')}
      </div>

      <!-- SEARCH & CATEGORY FILTER RIBBON -->
      <div class="meta-filter-ribbon">
        <div class="meta-search-wrap">
          <i class="fa-solid fa-magnifying-glass meta-search-icon"></i>
          <input type="text" class="meta-search-input" id="metaSearchInput" placeholder="Tìm nhanh Enzyme, Cơ chất, Thuốc, Vitamin (B1, B12...), Bệnh di truyền (DKA, Gout, G6PD, MODY...)...">
        </div>
        <div class="meta-category-pills" id="metaCategoryPills">
          <button class="meta-cat-btn active" data-filter="all">Tất Cả Node</button>
          <button class="meta-cat-btn" data-filter="rate_limiting">⭐ Men Giới Hạn</button>
          <button class="meta-cat-btn" data-filter="pharma">💊 Đích Thuốc</button>
          <button class="meta-cat-btn" data-filter="inborn">⚠️ Bệnh Di Truyền</button>
          <button class="meta-cat-btn" data-filter="vitamins">💊 Coenzyme/Vitamin</button>
          <button class="meta-cat-btn" data-filter="lab">🧪 Xét Nghiệm</button>
        </div>
      </div>

      <!-- 2-COLUMN STUDIO: MAP CANVAS & DETAIL DRAWER -->
      <div style="display: grid; grid-template-columns: 1fr 440px; gap: 1.5rem; align-items: start;" id="metaStudioGrid">
        
        <!-- Interactive Vector Map Board -->
        <div class="meta-canvas-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div>
              <h3 style="margin: 0; font-size: 1.15rem; font-weight: 800; color: var(--color-text, #0f172a);">
                <i class="fa-solid ${currentMap.icon}" style="color: #8b5cf6;"></i> ${currentMap.title}
              </h3>
              <p style="margin: 0.2rem 0 0; font-size: 0.8rem; color: var(--color-text-muted, #64748b);">
                📍 Vị trí: <strong>${currentMap.compartmentLabel || 'Bào tương & Ti thể'}</strong>
              </p>
            </div>
            <span style="font-size: 0.75rem; color: var(--color-text-muted); background: var(--color-bg); padding: 0.25rem 0.6rem; border-radius: 6px; border: 1px solid var(--color-border); font-weight: 600;">
              <i class="fa-solid fa-hand-pointer"></i> Click vào node để tra cứu
            </span>
          </div>

          <div class="meta-svg-board" id="metaSvgContainer">
            ${renderPathwaySvg(currentMap)}

            <!-- Zoom & Pan Controls -->
            <div class="meta-zoom-toolbar">
              <button class="meta-zoom-btn" id="btnZoomIn" title="Phóng to"><i class="fa-solid fa-plus"></i></button>
              <button class="meta-zoom-btn" id="btnZoomOut" title="Thu nhỏ"><i class="fa-solid fa-minus"></i></button>
              <button class="meta-zoom-btn" id="btnZoomReset" title="Đặt lại góc nhìn"><i class="fa-solid fa-arrows-rotate"></i></button>
            </div>
          </div>
        </div>

        <!-- Detail Inspector Drawer -->
        <div class="meta-drawer" id="metaDetailDrawer">
          ${renderDefaultNodeDetail(currentMap.nodes[0])}
        </div>

      </div>

    </div>
  `;
}

function renderPathwaySvg(map: PathwayMap): string {
  return `
    <svg width="100%" height="560" viewBox="${map.viewBox}" id="pathwaySvgElement" style="min-width: 520px; user-select: none; transition: transform 0.2s ease;">
      <!-- Defs & Markers -->
      <defs>
        <marker id="metaArrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6" />
        </marker>
        <marker id="metaArrowBlue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#0284c7" />
        </marker>
      </defs>

      <!-- Connecting Edges -->
      <g class="meta-edges">
        ${map.edges.map(e => {
          const fromNode = map.nodes.find(n => n.id === e.from);
          const toNode = map.nodes.find(n => n.id === e.to);
          if (!fromNode || !toNode) return '';
          
          const isHorizontal = Math.abs(fromNode.y - toNode.y) < 30;
          let x1 = fromNode.x;
          let y1 = fromNode.y + (isHorizontal ? 0 : 22);
          let x2 = toNode.x;
          let y2 = toNode.y - (isHorizontal ? 0 : 22);

          if (isHorizontal) {
            x1 = fromNode.x < toNode.x ? fromNode.x + 150 : fromNode.x - 150;
            x2 = fromNode.x < toNode.x ? toNode.x - 150 : toNode.x + 150;
          }

          return `
            <g>
              <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                stroke="${e.color || 'var(--color-border, #cbd5e1)'}" stroke-width="3" 
                stroke-dasharray="${e.dashed ? '6,6' : 'none'}" marker-end="url(#metaArrow)" opacity="0.85"/>
              
              ${e.energyLoop ? `
                <rect x="${(x1 + x2)/2 - 45}" y="${(y1 + y2)/2 - 10}" width="90" height="20" rx="4" fill="var(--color-surface, #ffffff)" stroke="#f59e0b" stroke-width="1" />
                <text x="${(x1 + x2)/2}" y="${(y1 + y2)/2 + 4}" font-size="10" font-weight="bold" fill="#f59e0b" text-anchor="middle">
                  ⚡ ${e.energyLoop}
                </text>
              ` : ''}
            </g>
          `;
        }).join('')}
      </g>

      <!-- Nodes -->
      <g class="meta-nodes">
        ${map.nodes.map(n => {
          const isEnzyme = n.type === 'enzyme';
          const isRateLimit = n.isRateLimiting;
          const boxWidth = isEnzyme ? 340 : 280;
          const boxHeight = 44;
          const rectX = n.x - (boxWidth / 2);
          const rectY = n.y - (boxHeight / 2);

          return `
            <g class="meta-node" data-node-id="${n.id}" data-pathway-id="${map.id}">
              <rect x="${rectX}" y="${rectY}" width="${boxWidth}" height="${boxHeight}" rx="10"
                fill="var(--color-surface, #ffffff)" stroke="${isRateLimit ? '#ef4444' : n.color || '#8b5cf6'}" stroke-width="${isEnzyme ? '2.5' : '1.5'}" />
              
              <!-- Icon badge -->
              <circle cx="${rectX + 22}" cy="${n.y}" r="12" fill="${isRateLimit ? '#ef4444' : n.color || '#8b5cf6'}" opacity="0.15" />
              <text x="${rectX + 22}" y="${n.y + 4}" font-size="12" text-anchor="middle" fill="${isRateLimit ? '#ef4444' : n.color || '#8b5cf6'}">
                ${isRateLimit ? '⭐' : isEnzyme ? '⚙️' : '🧬'}
              </text>

              <!-- Node Label -->
              <text x="${rectX + 42}" y="${n.y + 5}" font-size="12.5" font-weight="${isEnzyme ? 'bold' : '600'}" fill="var(--color-text, #0f172a)">
                ${n.name}
              </text>

              <!-- Rate limiting badge -->
              ${isRateLimit ? `
                <rect x="${rectX + boxWidth - 36}" y="${rectY + 12}" width="28" height="18" rx="4" fill="#ef4444" opacity="0.15"/>
                <text x="${rectX + boxWidth - 22}" y="${rectY + 25}" font-size="9.5" font-weight="bold" fill="#ef4444" text-anchor="middle">RLE</text>
              ` : ''}
            </g>
          `;
        }).join('')}
      </g>
    </svg>
  `;
}

function renderDefaultNodeDetail(n: MetabolicNode): string {
  if (!n) return `<p style="color: var(--color-text-muted); padding: 1rem;">Chọn một enzyme hoặc cơ chất trên bản đồ để tra cứu chi tiết lâm sàng.</p>`;

  return `
    <div class="meta-drawer-header">
      <div>
        <div style="display: flex; gap: 0.35rem; align-items: center; flex-wrap: wrap;">
          <span class="meta-tag ${n.type === 'enzyme' ? 'meta-tag-purple' : 'meta-tag-blue'}">
            ${n.type === 'enzyme' ? '⚙️ Enzyme Xúc Tác' : '🧬 Cơ Chất / Sản Phẩm'}
          </span>
          ${n.isRateLimiting ? `<span class="meta-tag meta-tag-rose">⭐ Men Giới Hạn Tốc Độ (RLE)</span>` : ''}
          ${n.compartment ? `<span class="meta-tag meta-tag-amber">📍 ${getCompartmentLabel(n.compartment)}</span>` : ''}
        </div>
        <h2 style="margin: 0.4rem 0 0; font-size: 1.25rem; font-weight: 800; color: var(--color-text, #0f172a);">
          ${n.name}
        </h2>
      </div>
    </div>

    <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-muted, #475569); line-height: 1.6;">
      ${n.description}
    </p>

    ${n.energyYield ? `
      <div class="meta-info-block" style="background: rgba(16,185,129,0.08); border-color: rgba(16,185,129,0.25);">
        <div class="meta-info-title" style="color: #10b981;"><i class="fa-solid fa-bolt"></i> Cân Bằng Năng Lượng / Coenzyme</div>
        <p class="meta-info-text" style="font-weight: 700; color: var(--color-text);">${n.energyYield}</p>
      </div>
    ` : ''}

    ${n.cofactors && n.cofactors.length > 0 ? `
      <div class="meta-info-block">
        <div class="meta-info-title"><i class="fa-solid fa-capsules" style="color: #f59e0b;"></i> Coenzyme & Vitamin Thiết Yếu</div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.35rem;">
          ${n.cofactors.map(c => `<span class="meta-tag meta-tag-amber">${c}</span>`).join('')}
        </div>
      </div>
    ` : ''}

    ${n.regulators ? `
      <div class="meta-info-block">
        <div class="meta-info-title"><i class="fa-solid fa-sliders" style="color: #0284c7;"></i> Cơ Chế Điều Hòa Sinh Học</div>
        ${n.regulators.activators ? `
          <div style="font-size: 0.825rem; margin-top: 0.25rem;">
            <strong style="color: #10b981;">➕ Chất Hoạt Hóa:</strong> ${n.regulators.activators.join(', ')}
          </div>
        ` : ''}
        ${n.regulators.inhibitors ? `
          <div style="font-size: 0.825rem; margin-top: 0.25rem;">
            <strong style="color: #ef4444;">➖ Chất Ức Chế:</strong> ${n.regulators.inhibitors.join(', ')}
          </div>
        ` : ''}
      </div>
    ` : ''}

    ${n.clinicalPharmacology ? `
      <div class="meta-info-block" style="border-left: 4px solid #8b5cf6;">
        <div class="meta-info-title"><i class="fa-solid fa-pills" style="color: #8b5cf6;"></i> Đích Tác Dụng Dược Lý &amp; Thuốc Điều Trị</div>
        <p class="meta-info-text">${n.clinicalPharmacology}</p>
        <div style="margin-top: 0.5rem;">
          <a href="#/ebm" style="display: inline-flex; align-items: center; gap: 5px; font-size: 0.775rem; font-weight: 700; color: #7c3aed; text-decoration: none; padding: 4px 8px; border-radius: 4px; background: rgba(139,92,246,0.08);">
            <i class="fa-solid fa-book-bookmark"></i> Tra Cứu Khuyến Cáo EBM &amp; Thử Nghiệm RCTs ➔
          </a>
        </div>
      </div>
    ` : ''}

    ${n.inbornErrors && n.inbornErrors.length > 0 ? `
      <div class="meta-info-block" style="border-left: 4px solid #ef4444;">
        <div class="meta-info-title"><i class="fa-solid fa-triangle-exclamation" style="color: #ef4444;"></i> Bệnh Lý Di Truyền Bẩm Sinh (Inborn Errors)</div>
        ${n.inbornErrors.map(err => `
          <div style="margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px dashed var(--color-border);">
            <strong style="font-size: 0.85rem; color: #ef4444;">${err.disease}</strong>
            ${err.inheritance ? `<span style="font-size: 0.75rem; color: var(--color-text-muted);"> (${err.inheritance})</span>` : ''}
            <p style="margin: 0.2rem 0 0; font-size: 0.825rem; color: var(--color-text-muted); line-height: 1.5;">${err.features}</p>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${n.labMarkers && n.labMarkers.length > 0 ? `
      <div class="meta-info-block">
        <div class="meta-info-title"><i class="fa-solid fa-vial-virus" style="color: #10b981;"></i> Chỉ Số Xét Nghiệm Cận Lâm Sàng</div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.35rem;">
          ${n.labMarkers.map(m => `<span class="meta-tag meta-tag-emerald">${m}</span>`).join('')}
        </div>
        <div style="margin-top: 0.6rem;">
          <a href="#/docspace/tools" style="display: inline-flex; align-items: center; gap: 5px; font-size: 0.775rem; font-weight: 700; color: #0284c7; text-decoration: none; padding: 4px 8px; border-radius: 4px; background: rgba(2,132,199,0.08);">
            <i class="fa-solid fa-flask-vial"></i> Tra cứu trong DocSpace Lab Hub ➔
          </a>
        </div>
      </div>
    ` : ''}
  `;
}

function getCompartmentLabel(c: string): string {
  switch (c) {
    case 'cytosol': return 'Tế bào chất (Cytoplasm)';
    case 'mitochondria_matrix': return 'Chất nền Ti thể (Matrix)';
    case 'inner_mitochondrial_membrane': return 'Màng trong Ti thể';
    case 'er': return 'Lưới nội chất (ER)';
    case 'lysosome': return 'Lysosome';
    default: return 'Tế bào';
  }
}

export function initMetabolicNavigator(): void {
  const tabs = document.querySelectorAll('#metaPathwayTabs .meta-tab-btn');
  const svgContainer = document.getElementById('metaSvgContainer');
  const drawer = document.getElementById('metaDetailDrawer');
  const searchInput = document.getElementById('metaSearchInput') as HTMLInputElement | null;
  const catButtons = document.querySelectorAll('#metaCategoryPills .meta-cat-btn');

  let currentPathwayId = 'glycolysis';
  let currentZoom = 1.0;

  function attachNodeListeners(pathway: PathwayMap) {
    document.querySelectorAll('.meta-node').forEach(el => {
      el.addEventListener('click', () => {
        const nodeId = el.getAttribute('data-node-id');
        const node = pathway.nodes.find(n => n.id === nodeId);
        if (node && drawer) {
          drawer.innerHTML = renderDefaultNodeDetail(node);
          drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });
  }

  function switchPathway(pathwayId: string) {
    currentPathwayId = pathwayId;
    tabs.forEach(t => {
      if (t.getAttribute('data-pathway') === pathwayId) t.classList.add('active');
      else t.classList.remove('active');
    });

    const pathway = METABOLIC_PATHWAYS[pathwayId];
    if (pathway && svgContainer && drawer) {
      svgContainer.innerHTML = `
        ${renderPathwaySvg(pathway)}
        <div class="meta-zoom-toolbar">
          <button class="meta-zoom-btn" id="btnZoomIn" title="Phóng to"><i class="fa-solid fa-plus"></i></button>
          <button class="meta-zoom-btn" id="btnZoomOut" title="Thu nhỏ"><i class="fa-solid fa-minus"></i></button>
          <button class="meta-zoom-btn" id="btnZoomReset" title="Đặt lại góc nhìn"><i class="fa-solid fa-arrows-rotate"></i></button>
        </div>
      `;
      drawer.innerHTML = renderDefaultNodeDetail(pathway.nodes[0]);
      attachNodeListeners(pathway);
      attachZoomListeners();
    }
  }

  function attachZoomListeners() {
    const svg = document.getElementById('pathwaySvgElement');
    const zIn = document.getElementById('btnZoomIn');
    const zOut = document.getElementById('btnZoomOut');
    const zReset = document.getElementById('btnZoomReset');

    zIn?.addEventListener('click', () => {
      currentZoom = Math.min(2.0, currentZoom + 0.15);
      if (svg) svg.style.transform = `scale(${currentZoom})`;
    });

    zOut?.addEventListener('click', () => {
      currentZoom = Math.max(0.6, currentZoom - 0.15);
      if (svg) svg.style.transform = `scale(${currentZoom})`;
    });

    zReset?.addEventListener('click', () => {
      currentZoom = 1.0;
      if (svg) svg.style.transform = `scale(1.0)`;
    });
  }

  // Category Filtering & Search
  function applyFilters() {
    const query = searchInput?.value.toLowerCase().trim() || '';
    const activeCat = document.querySelector('#metaCategoryPills .meta-cat-btn.active')?.getAttribute('data-filter') || 'all';
    const pathway = METABOLIC_PATHWAYS[currentPathwayId];
    if (!pathway) return;

    document.querySelectorAll('.meta-node').forEach(el => {
      const nodeId = el.getAttribute('data-node-id');
      const node = pathway.nodes.find(n => n.id === nodeId);
      if (!node) return;

      let matchQuery = true;
      if (query) {
        const str = JSON.stringify(node).toLowerCase();
        matchQuery = str.includes(query);
      }

      let matchCat = true;
      if (activeCat === 'rate_limiting') matchCat = !!node.isRateLimiting;
      else if (activeCat === 'pharma') matchCat = !!node.clinicalPharmacology;
      else if (activeCat === 'inborn') matchCat = !!(node.inbornErrors && node.inbornErrors.length > 0);
      else if (activeCat === 'vitamins') matchCat = !!(node.cofactors && node.cofactors.length > 0);
      else if (activeCat === 'lab') matchCat = !!(node.labMarkers && node.labMarkers.length > 0);

      if (matchQuery && matchCat) {
        el.classList.remove('dimmed');
        if (query) el.classList.add('highlighted');
        else el.classList.remove('highlighted');
      } else {
        el.classList.add('dimmed');
        el.classList.remove('highlighted');
      }
    });
  }

  searchInput?.addEventListener('input', applyFilters);

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });

  tabs.forEach(t => {
    t.addEventListener('click', () => {
      const pid = t.getAttribute('data-pathway');
      if (pid) switchPathway(pid);
    });
  });

  const initialPathway = METABOLIC_PATHWAYS[currentPathwayId];
  if (initialPathway) {
    attachNodeListeners(initialPathway);
    attachZoomListeners();
  }
}
