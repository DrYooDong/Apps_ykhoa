/**
 * micro-svg-engine.js — Microbiology Pro Studio
 * Động cơ dựng kính hiển vi ảo (SVG Microscopy) & Đĩa cấy thạch (Culture Plate) bằng SVG Vector.
 */

class MicroSVGEngine {
  constructor(microContainerId, plateContainerId) {
    this.microContainer = document.getElementById(microContainerId);
    this.plateContainer = document.getElementById(plateContainerId);
  }

  renderMicroscopy(microData) {
    if (!this.microContainer) return;

    const w = 500;
    const h = 360;
    const cx = w / 2;
    const cy = h / 2;

    // Background color according to stain type
    let bgColor = "#120a16"; // Dark Gram background
    let bgStroke = "#334155";
    if (microData.stainType === "ziehl_neelsen") {
      bgColor = "#032b43"; // Methylene blue background for ZN AFB
    }

    let svgHTML = `
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" style="background:#020617; border-radius:12px;">
        <defs>
          <clipPath id="lensClip">
            <circle cx="${cx}" cy="${cy}" r="160" />
          </clipPath>

          <radialGradient id="lensShading" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stop-color="#000000" stop-opacity="0"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0.8"/>
          </radialGradient>
        </defs>

        <!-- Outer Viewport Circle -->
        <circle cx="${cx}" cy="${cy}" r="162" fill="${bgColor}" stroke="${bgStroke}" stroke-width="4"/>

        <g clip-path="url(#lensClip)">
          <!-- Background Specimen Matrix / Debris -->
          <rect x="0" y="0" width="${w}" height="${h}" fill="${bgColor}" />
          
          <!-- PMN Neutrophils -->
          ${microData.pmn === 'high' || microData.pmn === 'moderate' ? `
            <!-- PMN 1 -->
            <g opacity="0.85">
              <path d="M ${cx - 70},${cy - 40} C ${cx - 100},${cy - 70} ${cx - 30},${cy - 90} ${cx - 40},${cy - 30} Z" fill="#e2e8f0" opacity="0.3"/>
              <!-- Multi-lobed Nucleus (Pinkish Purple) -->
              <circle cx="${cx - 75}" cy="${cy - 50}" r="10" fill="#8b5cf6" opacity="0.9"/>
              <circle cx="${cx - 55}" cy="${cy - 55}" r="8" fill="#8b5cf6" opacity="0.9"/>
              <circle cx="${cx - 65}" cy="${cy - 35}" r="9" fill="#8b5cf6" opacity="0.9"/>
              <path d="M ${cx - 75},${cy - 50} Q ${cx - 65},${cy - 40} ${cx - 55},${cy - 55}" stroke="#8b5cf6" stroke-width="3" fill="none"/>
            </g>

            <!-- PMN 2 -->
            <g opacity="0.85">
              <path d="M ${cx + 50},${cy + 40} C ${cx + 20},${cy + 70} ${cx + 80},${cy + 90} ${cx + 70},${cy + 30} Z" fill="#e2e8f0" opacity="0.3"/>
              <circle cx="${cx + 45}" cy="${cy + 50}" r="11" fill="#8b5cf6" opacity="0.9"/>
              <circle cx="${cx + 65}" cy="${cy + 55}" r="9" fill="#8b5cf6" opacity="0.9"/>
              <circle cx="${cx + 55}" cy="${cy + 35}" r="8" fill="#8b5cf6" opacity="0.9"/>
            </g>
          ` : ''}

          <!-- ORGANISM SVG DRAWINGS -->
          <g>
            ${this.renderOrganismSVG(microData.gram, cx, cy)}
          </g>

          <!-- Lens Radial Shading Overlay -->
          <circle cx="${cx}" cy="${cy}" r="160" fill="url(#lensShading)" />
        </g>

        <!-- Reticle Grid Crosshair lines -->
        <line x1="${cx}" y1="${cy - 160}" x2="${cx}" y2="${cy + 160}" stroke="#0ea5e9" stroke-width="0.7" stroke-dasharray="3,3" opacity="0.4"/>
        <line x1="${cx - 160}" y1="${cy}" x2="${cx + 160}" y2="${cy}" stroke="#0ea5e9" stroke-width="0.7" stroke-dasharray="3,3" opacity="0.4"/>

        <!-- Scale & Objective Badge -->
        <rect x="20" y="20" width="110" height="26" rx="6" fill="rgba(15, 23, 42, 0.85)" stroke="#334155" />
        <text x="75" y="37" fill="#38bdf8" font-size="11" font-weight="700" text-anchor="middle">100x Oil Immersion</text>
      </svg>
    `;

    this.microContainer.innerHTML = svgHTML;
    this.renderCulturePlate(microData.culturePlate);
  }

  renderOrganismSVG(gramType, cx, cy) {
    switch (gramType) {
      case "gram_pos_cocci_clusters":
        // Staphylococcus aureus - Purple clusters
        return `
          <g fill="#9333ea" stroke="#581c87" stroke-width="1.5">
            <circle cx="${cx}" cy="${cy}" r="8"/>
            <circle cx="${cx + 12}" cy="${cy - 4}" r="8"/>
            <circle cx="${cx - 10}" cy="${cy + 8}" r="8"/>
            <circle cx="${cx + 6}" cy="${cy + 12}" r="8"/>
            <circle cx="${cx - 12}" cy="${cy - 10}" r="8"/>
            <circle cx="${cx + 4}" cy="${cy - 14}" r="8"/>
            <circle cx="${cx + 18}" cy="${cy + 8}" r="8"/>
            <circle cx="${cx - 6}" cy="${cy - 18}" r="8"/>

            <!-- Cluster 2 -->
            <circle cx="${cx + 60}" cy="${cy - 40}" r="8"/>
            <circle cx="${cx + 72}" cy="${cy - 44}" r="8"/>
            <circle cx="${cx + 50}" cy="${cy - 32}" r="8"/>
            <circle cx="${cx + 66}" cy="${cy - 28}" r="8"/>

            <!-- Cluster 3 -->
            <circle cx="${cx - 60}" cy="${cy + 30}" r="8"/>
            <circle cx="${cx - 48}" cy="${cy + 26}" r="8"/>
            <circle cx="${cx - 70}" cy="${cy + 42}" r="8"/>
            <circle cx="${cx - 54}" cy="${cy + 46}" r="8"/>
          </g>
        `;

      case "gram_pos_diplococci_lancet":
        // Streptococcus pneumoniae - Lancet diplococci with halo
        return `
          <g>
            <!-- Diplococci Pair 1 -->
            <g fill="#9333ea" stroke="#e879f9" stroke-width="2">
              <!-- Halo -->
              <ellipse cx="${cx - 20}" cy="${cy - 10}" rx="22" ry="14" fill="rgba(240, 171, 252, 0.25)" stroke="none"/>
              <ellipse cx="${cx - 27}" cy="${cy - 10}" rx="7" ry="9"/>
              <ellipse cx="${cx - 13}" cy="${cy - 10}" rx="7" ry="9"/>
            </g>

            <!-- Diplococci Pair 2 -->
            <g fill="#9333ea" stroke="#e879f9" stroke-width="2">
              <ellipse cx="${cx + 35}" cy="${cy + 20}" rx="22" ry="14" fill="rgba(240, 171, 252, 0.25)" stroke="none"/>
              <ellipse cx="${cx + 28}" cy="${cy + 20}" rx="7" ry="9"/>
              <ellipse cx="${cx + 42}" cy="${cy + 20}" rx="7" ry="9"/>
            </g>
          </g>
        `;

      case "gram_neg_rods":
        // E. coli / Pseudomonas - Pink/Red Rods
        return `
          <g fill="#ef4444" stroke="#991b1b" stroke-width="1.5">
            <rect x="${cx - 40}" y="${cy - 20}" width="28" height="10" rx="5" transform="rotate(-15 ${cx - 40} ${cy - 20})"/>
            <rect x="${cx + 20}" y="${cy - 50}" width="30" height="11" rx="5.5" transform="rotate(30 ${cx + 20} ${cy - 50})"/>
            <rect x="${cx - 60}" y="${cy + 40}" width="26" height="10" rx="5" transform="rotate(45 ${cx - 60} ${cy + 40})"/>
            <rect x="${cx + 40}" y="${cy + 30}" width="32" height="11" rx="5.5" transform="rotate(-40 ${cx + 40} ${cy + 30})"/>
            <rect x="${cx}" y="${cy}" width="28" height="10" rx="5" transform="rotate(10 ${cx} ${cy})"/>
          </g>
        `;

      case "gram_neg_diplococci_intracellular":
        // Neisseria - Coffee bean diplococci inside PMN
        return `
          <g fill="#ef4444" stroke="#7f1d1d" stroke-width="1.5">
            <!-- Intracellular pairs -->
            <path d="M ${cx - 70},${cy - 50} A 5 7 0 0 1 ${cx - 70},${cy - 38} Z" />
            <path d="M ${cx - 68},${cy - 50} A 5 7 0 0 0 ${cx - 68},${cy - 38} Z" />

            <path d="M ${cx - 60},${cy - 40} A 5 7 0 0 1 ${cx - 60},${cy - 28} Z" />
            <path d="M ${cx - 58},${cy - 40} A 5 7 0 0 0 ${cx - 58},${cy - 28} Z" />

            <!-- Extracellular pairs -->
            <path d="M ${cx + 10},${cy - 10} A 6 8 0 0 1 ${cx + 10},${cy + 4} Z" />
            <path d="M ${cx + 12},${cy - 10} A 6 8 0 0 0 ${cx + 12},${cy + 4} Z" />
          </g>
        `;

      case "afb_red_rods":
        // Mycobacterium tuberculosis - Red AFB rods on Blue background
        return `
          <g fill="#f43f5e" stroke="#881337" stroke-width="1.5">
            <rect x="${cx - 30}" y="${cy - 30}" width="32" height="7" rx="3.5" transform="rotate(-20 ${cx - 30} ${cy - 30})"/>
            <rect x="${cx + 10}" y="${cy - 10}" width="36" height="8" rx="4" transform="rotate(15 ${cx + 10} ${cy - 10})"/>
            <rect x="${cx - 50}" y="${cy + 20}" width="30" height="7" rx="3.5" transform="rotate(60 ${cx - 50} ${cy + 20})"/>
            <rect x="${cx + 40}" y="${cy + 40}" width="34" height="7.5" rx="3.7" transform="rotate(-35 ${cx + 40} ${cy + 40})"/>
          </g>
        `;

      case "gram_pos_cocci_chains":
        // Streptococcus pyogenes - Long purple chains
        return `
          <g fill="#9333ea" stroke="#581c87" stroke-width="1.5">
            <circle cx="${cx - 60}" cy="${cy - 30}" r="7"/>
            <circle cx="${cx - 48}" cy="${cy - 28}" r="7"/>
            <circle cx="${cx - 36}" cy="${cy - 24}" r="7"/>
            <circle cx="${cx - 24}" cy="${cy - 18}" r="7"/>
            <circle cx="${cx - 14}" cy="${cy - 10}" r="7"/>
            <circle cx="${cx - 6}" cy="${cy}" r="7"/>
            <circle cx="${cx}" cy="${cy + 10}" r="7"/>
            <circle cx="${cx + 8}" cy="${cy + 20}" r="7"/>
            <circle cx="${cx + 18}" cy="${cy + 28}" r="7"/>

            <!-- Chain 2 -->
            <circle cx="${cx + 30}" cy="${cy - 40}" r="7"/>
            <circle cx="${cx + 42}" cy="${cy - 38}" r="7"/>
            <circle cx="${cx + 54}" cy="${cy - 32}" r="7"/>
            <circle cx="${cx + 64}" cy="${cy - 24}" r="7"/>
          </g>
        `;

      case "gram_pos_spore_rods":
        // Clostridium / Bacillus - Large purple rods with terminal/subterminal oval spores
        return `
          <g fill="#9333ea" stroke="#581c87" stroke-width="1.5">
            <!-- Rod 1 with terminal spore (Drumstick) -->
            <rect x="${cx - 40}" y="${cy - 20}" width="36" height="12" rx="6" transform="rotate(-15 ${cx - 40} ${cy - 20})"/>
            <circle cx="${cx - 42}" cy="${cy - 12}" r="8" fill="#e2e8f0" stroke="#9333ea" stroke-width="2"/>

            <!-- Rod 2 -->
            <rect x="${cx + 20}" y="${cy + 10}" width="38" height="13" rx="6.5" transform="rotate(25 ${cx + 20} ${cy + 10})"/>
            <circle cx="${cx + 55}" cy="${cy + 30}" r="8" fill="#e2e8f0" stroke="#9333ea" stroke-width="2"/>
          </g>
        `;

      case "gram_neg_vibrio_comma":
        // Vibrio cholerae - Curved Gram-negative comma-shaped rods
        return `
          <g fill="none" stroke="#ef4444" stroke-width="4.5" stroke-linecap="round">
            <path d="M ${cx - 40},${cy - 30} Q ${cx - 25},${cy - 40} ${cx - 15},${cy - 20}" />
            <path d="M ${cx + 10},${cy - 10} Q ${cx + 25},${cy - 20} ${cx + 35},${cy}" />
            <path d="M ${cx - 50},${cy + 20} Q ${cx - 35},${cy + 10} ${cx - 25},${cy + 30}" />
            <path d="M ${cx + 30},${cy + 40} Q ${cx + 45},${cy + 30} ${cx + 55},${cy + 50}" />
          </g>
        `;

      case "gram_neg_coccobacilli":
        // Haemophilus / Acinetobacter - Tiny Gram-negative coccobacilli
        return `
          <g fill="#ef4444" stroke="#991b1b" stroke-width="1.2">
            <ellipse cx="${cx - 40}" cy="${cy - 30}" rx="9" ry="6" transform="rotate(15 ${cx - 40} ${cy - 30})"/>
            <ellipse cx="${cx - 24}" cy="${cy - 30}" rx="9" ry="6" transform="rotate(15 ${cx - 24} ${cy - 30})"/>
            <ellipse cx="${cx + 30}" cy="${cy - 10}" rx="9" ry="6" transform="rotate(-20 ${cx + 30} ${cy - 10})"/>
            <ellipse cx="${cx - 50}" cy="${cy + 25}" rx="9" ry="6" transform="rotate(45 ${cx - 50} ${cy + 25})"/>
            <ellipse cx="${cx + 40}" cy="${cy + 40}" rx="9" ry="6" transform="rotate(-10 ${cx + 40} ${cy + 40})"/>
          </g>
        `;

      case "gram_pos_bamboo_rods":
        // Bacillus anthracis - Large square-ended Gram-positive rods in bamboo chains
        return `
          <g fill="#9333ea" stroke="#581c87" stroke-width="1.8">
            <!-- Bamboo Rod Chain -->
            <rect x="${cx - 80}" y="${cy - 10}" width="40" height="14" rx="2" stroke-width="2"/>
            <rect x="${cx - 38}" y="${cy - 10}" width="40" height="14" rx="2" stroke-width="2"/>
            <rect x="${cx + 4}" y="${cy - 10}" width="40" height="14" rx="2" stroke-width="2"/>
            <rect x="${cx + 46}" y="${cy - 10}" width="40" height="14" rx="2" stroke-width="2"/>
            <!-- Central Oval Spores -->
            <ellipse cx="${cx - 60}" cy="${cy - 3}" rx="6" ry="4" fill="#e2e8f0"/>
            <ellipse cx="${cx + 24}" cy="${cy - 3}" rx="6" ry="4" fill="#e2e8f0"/>
          </g>
        `;

      case "aspergillus_hyphae_45":
        // Aspergillus fumigatus - Dichotomous 45° branching septate hyphae
        return `
          <g fill="none" stroke="#10b981" stroke-width="6" stroke-linecap="round">
            <!-- Main Hypha trunk -->
            <path d="M ${cx - 70},${cy + 70} L ${cx - 10},${cy + 10}" />
            <!-- 45 Degree Branch 1 -->
            <path d="M ${cx - 10},${cy + 10} L ${cx + 50},${cy - 50}" />
            <!-- 45 Degree Branch 2 -->
            <path d="M ${cx - 10},${cy + 10} L ${cx + 40},${cy + 60}" />
            <!-- Septa lines -->
            <line x1="${cx - 45}" y1="${cy + 45}" x2="${cx - 35}" y2="${cy + 35}" stroke="#047857" stroke-width="2"/>
            <line x1="${cx + 15}" y1="${cy - 15}" x2="${cx + 25}" y2="${cy - 25}" stroke="#047857" stroke-width="2"/>
          </g>
        `;

      case "india_ink_cryptococcus":
        // Cryptococcus neoformans - India Ink background halo
        return `
          <g>
            <rect x="0" y="0" width="500" height="360" fill="#000000" opacity="0.85"/>
            <!-- Encapsulated Yeast 1 -->
            <circle cx="${cx - 20}" cy="${cy - 10}" r="32" fill="rgba(255, 255, 255, 0.25)" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2,2"/>
            <circle cx="${cx - 20}" cy="${cy - 10}" r="14" fill="#a855f7" />

            <!-- Encapsulated Yeast 2 -->
            <circle cx="${cx + 40}" cy="${cy + 30}" r="28" fill="rgba(255, 255, 255, 0.25)" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="2,2"/>
            <circle cx="${cx + 40}" cy="${cy + 30}" r="12" fill="#a855f7" />
          </g>
        `;

      case "yeast_budding":
        // Candida albicans - Large purple budding yeast + pseudohyphae
        return `
          <g fill="#7e22ce" stroke="#3b0764" stroke-width="2">
            <!-- Parent Yeast + Bud -->
            <circle cx="${cx - 20}" cy="${cy}" r="16"/>
            <circle cx="${cx - 34}" cy="${cy - 12}" r="9"/>

            <circle cx="${cx + 40}" cy="${cy - 30}" r="15"/>
            <circle cx="${cx + 52}" cy="${cy - 20}" r="8"/>

            <!-- Pseudohyphae -->
            <path d="M ${cx - 10},${cy + 30} C ${cx + 10},${cy + 60} ${cx + 30},${cy + 70} ${cx + 60},${cy + 80}" stroke="#7e22ce" stroke-width="10" stroke-linecap="round" fill="none"/>
          </g>
        `;

      default:
        return `<circle cx="${cx}" cy="${cy}" r="10" fill="#9333ea"/>`;
    }
  }

  renderCulturePlate(plateType) {
    if (!this.plateContainer) return;

    let plateHTML = "";
    if (plateType.includes("blood_agar")) {
      const isBeta = plateType.includes("beta");
      plateHTML = `
        <div class="plate-box">
          <div class="plate-title">Thạch Máu (Blood Agar)</div>
          <svg viewBox="0 0 100 100" width="80" height="80">
            <circle cx="50" cy="50" r="45" fill="#991b1b" stroke="#7f1d1d" stroke-width="3"/>
            <!-- Colonies -->
            <circle cx="45" cy="45" r="5" fill="#fef08a" />
            <circle cx="${isBeta ? 45 : 0}" cy="${isBeta ? 45 : 0}" r="${isBeta ? 12 : 0}" fill="rgba(254, 240, 138, 0.35)" />

            <circle cx="65" cy="55" r="4" fill="#fef08a" />
            <circle cx="35" cy="65" r="4" fill="#fef08a" />
          </svg>
          <div style="font-size:0.7rem; color:${isBeta ? '#ef4444' : '#10b981'}; font-weight:700;">${isBeta ? 'Tan máu β (Beta)' : 'Tan máu α (Alpha)'}</div>
        </div>
      `;
    } else if (plateType.includes("macconkey")) {
      const isLacPos = plateType.includes("lactose_pos");
      plateHTML = `
        <div class="plate-box">
          <div class="plate-title">MacConkey Agar</div>
          <svg viewBox="0 0 100 100" width="80" height="80">
            <circle cx="50" cy="50" r="45" fill="#831843" stroke="#701a75" stroke-width="3"/>
            <circle cx="45" cy="45" r="6" fill="${isLacPos ? '#f43f5e' : '#cbd5e1'}" />
            <circle cx="60" cy="55" r="5" fill="${isLacPos ? '#f43f5e' : '#cbd5e1'}" />
            <circle cx="35" cy="60" r="5" fill="${isLacPos ? '#f43f5e' : '#cbd5e1'}" />
          </svg>
          <div style="font-size:0.7rem; color:${isLacPos ? '#ec4899' : '#94a3b8'}; font-weight:700;">${isLacPos ? 'Lactose (+) Hồng' : 'Lactose (−) Không màu'}</div>
        </div>
      `;
    } else {
      plateHTML = `
        <div class="plate-box">
          <div class="plate-title">Chocolate Agar</div>
          <svg viewBox="0 0 100 100" width="80" height="80">
            <circle cx="50" cy="50" r="45" fill="#451a03" stroke="#292524" stroke-width="3"/>
            <circle cx="45" cy="45" r="5" fill="#e7e5e4" opacity="0.8"/>
            <circle cx="60" cy="55" r="4" fill="#e7e5e4" opacity="0.8"/>
          </svg>
          <div style="font-size:0.7rem; color:#d6d3d1; font-weight:700;">Khuẩn lạc mọc CO2</div>
        </div>
      `;
    }

    this.plateContainer.innerHTML = plateHTML;
  }
}
