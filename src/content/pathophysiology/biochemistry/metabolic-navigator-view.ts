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
        <span style="color: #8b5cf6; font-weight: 600;">Bản Đồ Chuyển Hóa Tương Tác</span>
      </div>

      <!-- HERO HEADER -->
      <div class="meta-canvas-card" style="background: linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(59,130,246,0.02) 100%); margin-bottom: 1.5rem; border-color: rgba(139,92,246,0.2);">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
          <div>
            <span style="font-size: 0.75rem; font-weight: 700; background: #8b5cf6; color: #fff; padding: 0.2rem 0.6rem; border-radius: 4px; text-transform: uppercase;">Interactive Metabolic Studio</span>
            <h1 style="margin: 0.4rem 0 0.25rem; font-size: 1.6rem; font-weight: 800; color: var(--color-text, #0f172a);">
              🗺️ BẢN ĐỒ CHUYỂN HÓA & HÓA SINH TƯƠNG TÁC
            </h1>
            <p style="margin: 0; font-size: 0.9rem; color: var(--color-text-muted, #475569); max-width: 820px;">
              Khám phá các ngã rẽ chuyển hóa phân tử sinh học. <strong>Click vào bất kỳ Enzyme / Phân tử nào</strong> để tra cứu tức thì: Vitamin & Coenzyme, Điều hòa allosteric, Thuốc ức chế/kích thích, Bệnh lý di truyền bẩm sinh và Xét nghiệm cận lâm sàng.
            </p>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <a href="#/pathophysiology/hoa-sinh" class="meta-tab-btn" style="text-decoration: none;">
              <i class="fa-solid fa-flask-vial"></i> 31 Bài Hóa Sinh
            </a>
            <a href="#/pathophysiology/simulators" class="meta-tab-btn" style="text-decoration: none;">
              <i class="fa-solid fa-bolt"></i> Mô Phỏng Sinh Lý
            </a>
          </div>
        </div>
      </div>

      <!-- PATHWAY NAVIGATION TABS -->
      <div class="meta-pathway-tabs" id="metaPathwayTabs" style="margin-bottom: 1.5rem;">
        ${Object.values(METABOLIC_PATHWAYS).map(p => `
          <button class="meta-tab-btn ${p.id === currentMap.id ? 'active' : ''}" data-pathway="${p.id}">
            <i class="fa-solid ${p.icon}"></i> ${p.title}
          </button>
        `).join('')}
      </div>

      <!-- 2-COLUMN STUDIO: MAP CANVAS & DETAIL DRAWER -->
      <div style="display: grid; grid-template-columns: 1fr 420px; gap: 1.5rem; align-items: start;" id="metaStudioGrid">
        
        <!-- Interactive Vector Map Board -->
        <div class="meta-canvas-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div>
              <h3 style="margin: 0; font-size: 1.15rem; font-weight: 700; color: var(--color-text, #0f172a);">
                <i class="fa-solid ${currentMap.icon}" style="color: #8b5cf6;"></i> ${currentMap.title}
              </h3>
              <p style="margin: 0.2rem 0 0; font-size: 0.8rem; color: var(--color-text-muted, #64748b);">${currentMap.subtitle}</p>
            </div>
            <span style="font-size: 0.75rem; color: var(--color-text-muted); background: var(--color-bg); padding: 0.2rem 0.5rem; border-radius: 4px; border: 1px solid var(--color-border);">
              <i class="fa-solid fa-hand-pointer"></i> Chạm / Click vào node để xem
            </span>
          </div>

          <div class="meta-svg-board" id="metaSvgContainer">
            ${renderPathwaySvg(currentMap)}
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
    <svg width="100%" height="520" viewBox="${map.viewBox}" style="min-width: 500px; user-select: none;">
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
          return `
            <line x1="${fromNode.x}" y1="${fromNode.y + 20}" x2="${toNode.x}" y2="${toNode.y - 20}" 
              stroke="${e.color || 'var(--color-border, #cbd5e1)'}" stroke-width="3" 
              stroke-dasharray="${e.dashed ? '6,6' : 'none'}" marker-end="url(#metaArrow)" opacity="0.85"/>
          `;
        }).join('')}
      </g>

      <!-- Nodes -->
      <g class="meta-nodes">
        ${map.nodes.map(n => {
          const isEnzyme = n.type === 'enzyme';
          const isSubstrate = n.type === 'substrate';
          const boxWidth = isEnzyme ? 320 : 260;
          const boxHeight = 44;
          const rectX = n.x - (boxWidth / 2);
          const rectY = n.y - (boxHeight / 2);

          return `
            <g class="meta-node" data-node-id="${n.id}" data-pathway-id="${map.id}">
              <rect x="${rectX}" y="${rectY}" width="${boxWidth}" height="${boxHeight}" rx="10"
                fill="var(--color-surface, #ffffff)" stroke="${n.color || '#8b5cf6'}" stroke-width="${isEnzyme ? '2.5' : '1.5'}" />
              
              <!-- Icon badge -->
              <circle cx="${rectX + 22}" cy="${n.y}" r="12" fill="${n.color || '#8b5cf6'}" opacity="0.15" />
              <text x="${rectX + 22}" y="${n.y + 4}" font-size="12" text-anchor="middle" fill="${n.color || '#8b5cf6'}">
                ${isEnzyme ? '⚙️' : '🧬'}
              </text>

              <!-- Node Label -->
              <text x="${rectX + 42}" y="${n.y + 5}" font-size="13" font-weight="${isEnzyme ? 'bold' : '600'}" fill="var(--color-text, #0f172a)">
                ${n.name}
              </text>
            </g>
          `;
        }).join('')}
      </g>
    </svg>
  `;
}

function renderDefaultNodeDetail(n: MetabolicNode): string {
  if (!n) return `<p style="color: var(--color-text-muted);">Chọn một enzyme trên bản đồ để tra cứu chi tiết.</p>`;

  return `
    <div class="meta-drawer-header">
      <div>
        <span class="meta-tag ${n.type === 'enzyme' ? 'meta-tag-purple' : 'meta-tag-blue'}">
          ${n.type === 'enzyme' ? '⚙️ Enzyme Xúc Tác' : '🧬 Cơ Chất / Sản Phẩm'}
        </span>
        <h2 style="margin: 0.35rem 0 0; font-size: 1.3rem; font-weight: 800; color: var(--color-text, #0f172a);">
          ${n.name}
        </h2>
      </div>
    </div>

    <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-muted, #475569); line-height: 1.6;">
      ${n.description}
    </p>

    ${n.cofactors && n.cofactors.length > 0 ? `
      <div class="meta-info-block">
        <div class="meta-info-title"><i class="fa-solid fa-capsules" style="color: #f59e0b;"></i> Coenzyme & Vitamin Cần Thiết</div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-top: 0.35rem;">
          ${n.cofactors.map(c => `<span class="meta-tag meta-tag-amber">${c}</span>`).join('')}
        </div>
      </div>
    ` : ''}

    ${n.regulators ? `
      <div class="meta-info-block">
        <div class="meta-info-title"><i class="fa-solid fa-sliders" style="color: #0284c7;"></i> Cơ Chế Điều Hòa Sinh Học</div>
        ${n.regulators.activators ? `
          <div style="font-size: 0.8rem; margin-top: 0.25rem;">
            <strong style="color: #10b981;">➕ Chất Hoạt Hóa:</strong> ${n.regulators.activators.join(', ')}
          </div>
        ` : ''}
        ${n.regulators.inhibitors ? `
          <div style="font-size: 0.8rem; margin-top: 0.25rem;">
            <strong style="color: #ef4444;">➖ Chất Ức Chế:</strong> ${n.regulators.inhibitors.join(', ')}
          </div>
        ` : ''}
      </div>
    ` : ''}

    ${n.clinicalPharmacology ? `
      <div class="meta-info-block" style="border-left: 4px solid #8b5cf6;">
        <div class="meta-info-title"><i class="fa-solid fa-pills" style="color: #8b5cf6;"></i> Liên Hệ Dược Lý Lâm Sàng</div>
        <p class="meta-info-text">${n.clinicalPharmacology}</p>
      </div>
    ` : ''}

    ${n.inbornErrors && n.inbornErrors.length > 0 ? `
      <div class="meta-info-block" style="border-left: 4px solid #ef4444;">
        <div class="meta-info-title"><i class="fa-solid fa-triangle-exclamation" style="color: #ef4444;"></i> Bệnh Lý Di Truyền Bẩm Sinh (Inborn Errors)</div>
        ${n.inbornErrors.map(err => `
          <div style="margin-top: 0.4rem; padding-top: 0.4rem; border-top: 1px dashed var(--color-border);">
            <strong style="font-size: 0.85rem; color: #ef4444;">${err.disease}</strong>
            ${err.inheritance ? `<span style="font-size: 0.75rem; color: var(--color-text-muted);"> (${err.inheritance})</span>` : ''}
            <p style="margin: 0.2rem 0 0; font-size: 0.825rem; color: var(--color-text-muted);">${err.features}</p>
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
      </div>
    ` : ''}
  `;
}

export function initMetabolicNavigator(): void {
  const tabs = document.querySelectorAll('#metaPathwayTabs .meta-tab-btn');
  const svgContainer = document.getElementById('metaSvgContainer');
  const drawer = document.getElementById('metaDetailDrawer');
  let currentPathwayId = 'glycolysis';

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
      svgContainer.innerHTML = renderPathwaySvg(pathway);
      drawer.innerHTML = renderDefaultNodeDetail(pathway.nodes[0]);
      attachNodeListeners(pathway);
    }
  }

  tabs.forEach(t => {
    t.addEventListener('click', () => {
      const pid = t.getAttribute('data-pathway');
      if (pid) switchPathway(pid);
    });
  });

  const initialPathway = METABOLIC_PATHWAYS[currentPathwayId];
  if (initialPathway) attachNodeListeners(initialPathway);
}
