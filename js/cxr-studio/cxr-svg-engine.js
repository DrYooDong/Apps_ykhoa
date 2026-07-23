/**
 * cxr-svg-engine.js — Chest X-Ray Pro Studio
 * Động cơ dựng giải phẫu lồng ngực & Xếp chồng tổn thương bằng SVG Vector Chân Thực (Photorealistic SVG Engine).
 */

class CXRSVGEngine {
  constructor(svgContainerId) {
    this.container = document.getElementById(svgContainerId);
    this.isInverted = false;
    this.contrast = 100;
    this.brightness = 100;
    this.showVasculature = true;
    this.showAnnotations = true;
    this.windowMode = 'normal'; // 'normal', 'lung', 'bone', 'soft'
  }

  setWindowPreset(mode) {
    this.windowMode = mode;
    if (mode === 'lung') {
      this.contrast = 135;
      this.brightness = 90;
    } else if (mode === 'bone') {
      this.contrast = 160;
      this.brightness = 115;
    } else if (mode === 'soft') {
      this.contrast = 90;
      this.brightness = 110;
    } else {
      this.contrast = 100;
      this.brightness = 100;
    }
  }

  render(layers = {}, ctrHeartWidthPct = 0.45) {
    if (!this.container) return;

    // ViewBox Dimensions
    const w = 500;
    const h = 520;

    // Trachea & Mediastinum Shift for Tension Pneumothorax or Massive Effusion
    let tracheaOffsetX = 0;
    if (layers.pneumothoraxR) tracheaOffsetX = -24;
    else if (layers.effusionR) tracheaOffsetX = -16;

    // Heart Width & Position Calculation
    const isBigHeart = layers.cardiomegaly;
    const heartWidth = isBigHeart ? 275 : (w * (ctrHeartWidthPct || 0.45));
    const heartLeftApexX = 250 - (heartWidth * 0.65);
    const heartRightBorderX = 250 + (heartWidth * 0.35);

    // Dynamic Filter Slopes
    const contrastSlope = (this.contrast / 100).toFixed(2);
    const brightnessIntercept = ((this.brightness - 100) / 200).toFixed(2);

    let svgHTML = `
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" style="background:#03050a; border-radius:12px; width:100%; height:100%;">
        <defs>
          <!-- DICOM Contrast / Brightness Adjustment Filter -->
          <filter id="cxrAdjust" x="-10%" y="-10%" width="120%" height="120%">
            <feComponentTransfer>
              <feFuncR type="linear" slope="${contrastSlope}" intercept="${brightnessIntercept}"/>
              <feFuncG type="linear" slope="${contrastSlope}" intercept="${brightnessIntercept}"/>
              <feFuncB type="linear" slope="${contrastSlope}" intercept="${brightnessIntercept}"/>
            </feComponentTransfer>
          </filter>

          <!-- Film Noise Texture Filter -->
          <filter id="filmGrain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" result="noise"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.15   0 0 0 0 0.15   0 0 0 0 0.15  0 0 0 0.08 0" result="coloredNoise"/>
            <feComposite operator="in" in2="SourceGraphic"/>
          </filter>

          <!-- Blur Filters for Soft Lesion Edges -->
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="6"/>
          </filter>
          <filter id="fineBlur">
            <feGaussianBlur stdDeviation="2.5"/>
          </filter>
          <filter id="heavyBlur">
            <feGaussianBlur stdDeviation="12"/>
          </filter>

          <!-- Radiograph Base Film Gradient -->
          <radialGradient id="filmBaseGrad" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stop-color="#141a29"/>
            <stop offset="60%" stop-color="#090d17"/>
            <stop offset="100%" stop-color="#020307"/>
          </radialGradient>

          <!-- Lung Field Density Gradient (Right & Left) -->
          <radialGradient id="lungFieldGradR" cx="60%" cy="45%" r="55%">
            <stop offset="0%" stop-color="#1c2436"/>
            <stop offset="40%" stop-color="#0e1320"/>
            <stop offset="85%" stop-color="#050810"/>
            <stop offset="100%" stop-color="#020306"/>
          </radialGradient>

          <radialGradient id="lungFieldGradL" cx="40%" cy="45%" r="55%">
            <stop offset="0%" stop-color="#1c2436"/>
            <stop offset="40%" stop-color="#0e1320"/>
            <stop offset="85%" stop-color="#050810"/>
            <stop offset="100%" stop-color="#020306"/>
          </radialGradient>

          <!-- Hilar Vascular Shadow Gradient -->
          <radialGradient id="hilumGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#94a3b8" stop-opacity="0.6"/>
            <stop offset="50%" stop-color="#64748b" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#1e293b" stop-opacity="0"/>
          </radialGradient>

          <!-- Soft Tissue Outer Shadow Gradient -->
          <linearGradient id="softTissueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#2d3748" stop-opacity="0.5"/>
            <stop offset="15%" stop-color="#1a202c" stop-opacity="0.2"/>
            <stop offset="85%" stop-color="#1a202c" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#2d3748" stop-opacity="0.5"/>
          </linearGradient>

          <!-- Heart & Mediastinum Radiopacity Gradient -->
          <linearGradient id="heartMediastinumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#cbd5e1" stop-opacity="0.82"/>
            <stop offset="40%" stop-color="#94a3b8" stop-opacity="0.75"/>
            <stop offset="85%" stop-color="#64748b" stop-opacity="0.68"/>
            <stop offset="100%" stop-color="#475569" stop-opacity="0.55"/>
          </linearGradient>

          <!-- Consolidation Dense Opacity Gradient -->
          <radialGradient id="consolidationGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#f8fafc" stop-opacity="0.92"/>
            <stop offset="50%" stop-color="#e2e8f0" stop-opacity="0.75"/>
            <stop offset="80%" stop-color="#cbd5e1" stop-opacity="0.45"/>
            <stop offset="100%" stop-color="#94a3b8" stop-opacity="0"/>
          </radialGradient>

          <!-- Ground Glass Opacity (GGO) Gradient -->
          <radialGradient id="ggoGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#e2e8f0" stop-opacity="0.42"/>
            <stop offset="65%" stop-color="#cbd5e1" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.02"/>
          </radialGradient>

          <!-- Effusion Meniscus Gradient -->
          <linearGradient id="effusionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f8fafc" stop-opacity="0.95"/>
            <stop offset="40%" stop-color="#e2e8f0" stop-opacity="0.88"/>
            <stop offset="100%" stop-color="#cbd5e1" stop-opacity="0.78"/>
          </linearGradient>
        </defs>

        <g filter="url(#cxrAdjust)">

          <!-- 0. BACKGROUND FILM RADIOGRAM & COLLIMATION -->
          <rect width="${w}" height="${h}" fill="url(#filmBaseGrad)"/>

          <!-- Collimation Vignette Shadow -->
          <path d="M 0,0 L ${w},0 L ${w},${h} L 0,${h} Z" fill="none" stroke="#000000" stroke-width="16" opacity="0.6"/>

          <!-- 1. SOFT TISSUE CONTOUR (Neck, Shoulders, Lateral Chest Walls) -->
          <path d="M 110,0 C 120,40 100,70 50,110 C 20,135 15,190 25,280 C 35,370 45,460 50,520 L 450,520 C 455,460 465,370 475,280 C 485,190 480,135 450,110 C 400,70 380,40 390,0 Z" 
                fill="url(#softTissueGrad)"/>

          <!-- Subcutaneous Emphysema Layer -->
          ${layers.emphysema ? `
            <g fill="none" stroke="#000000" stroke-width="1.8" opacity="0.85">
              <!-- Streaky air dissecting soft tissue neck & chest wall -->
              <path d="M 60,80 Q 75,100 65,130 M 70,90 Q 80,110 75,140 M 50,150 Q 65,180 55,220" />
              <path d="M 440,80 Q 425,100 435,130 M 430,90 Q 420,110 425,140 M 450,150 Q 435,180 445,220" />
              <path d="M 80,60 Q 100,65 120,60 M 380,60 Q 400,65 420,60" stroke-width="2.5"/>
            </g>
          ` : ''}

          <!-- 2. LUNG FIELDS (BACKGROUND HYPERLUCENCY & ANATOMICAL BOUNDARIES) -->

          <!-- Right Lung Field -->
          <path id="rightLung" d="${layers.pneumothoraxR ? 
            'M 125,75 C 150,65 210,65 228,75 C 220,140 205,230 185,330 C 145,330 130,250 125,75 Z' : 
            'M 105,65 C 145,48 215,55 232,65 C 235,140 228,300 225,390 C 175,418 90,395 82,390 C 65,280 75,140 105,65 Z'}" 
                fill="${layers.pneumothoraxR ? '#020305' : 'url(#lungFieldGradR)'}" stroke="#1e293b" stroke-width="1"/>

          <!-- Left Lung Field -->
          <path id="leftLung" d="M 395,65 C 355,48 285,55 268,65 C 265,140 272,300 275,390 C 325,422 410,398 418,390 C 435,280 425,140 395,65 Z" 
                fill="url(#lungFieldGradL)" stroke="#1e293b" stroke-width="1"/>

          <!-- Visceral Pleural Line for Pneumothorax -->
          ${layers.pneumothoraxR ? `
            <path d="M 125,75 C 150,65 210,65 228,75 C 220,140 205,230 185,330 C 145,330 130,250 125,75 Z" 
                  stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="4,2" fill="none" opacity="0.95"/>
            <!-- Hyperlucent Pleural Space (No lung markings) -->
            <path d="M 105,65 C 145,48 215,55 232,65 C 235,140 228,300 225,390 C 175,418 90,395 82,390 C 65,280 75,140 105,65 Z" fill="#000000" opacity="0.75"/>
          ` : ''}

          <!-- Hilar Shadows (Rốn Phổi 2 Bên) -->
          <ellipse cx="215" cy="210" rx="22" ry="35" fill="url(#hilumGrad)"/>
          <ellipse cx="285" cy="205" rx="20" ry="32" fill="url(#hilumGrad)"/>

          <!-- 3. PULMONARY VASCULATURE (VÂN MẠCH MÁU PHỔI NÂNG CAO) -->
          ${this.showVasculature ? `
            <g stroke="#cbd5e1" fill="none" opacity="0.28" stroke-linecap="round">
              <!-- Right Vascular Tree -->
              ${!layers.pneumothoraxR ? `
                <path d="M 215,200 Q 180,180 140,160 M 215,200 Q 170,210 120,230 M 215,210 Q 185,250 145,290 M 215,215 Q 195,290 170,350 M 215,190 Q 190,140 165,100" stroke-width="1.8"/>
                <path d="M 180,180 Q 160,150 130,130 M 170,210 Q 140,200 110,210 M 185,250 Q 155,270 125,310 M 195,290 Q 175,330 150,370" stroke-width="1.2"/>
                <path d="M 140,160 Q 120,145 100,135 M 145,290 Q 125,310 105,330" stroke-width="0.8"/>
              ` : ''}

              <!-- Left Vascular Tree -->
              <path d="M 285,195 Q 320,175 360,155 M 285,195 Q 330,205 380,225 M 285,205 Q 315,245 355,285 M 285,210 Q 305,285 330,345 M 285,185 Q 310,135 335,95" stroke-width="1.8"/>
              <path d="M 320,175 Q 340,145 370,125 M 330,205 Q 360,195 390,205 M 315,245 Q 345,265 375,305 M 305,285 Q 325,325 350,365" stroke-width="1.2"/>
              <path d="M 360,155 Q 380,140 400,130 M 355,285 Q 375,305 395,325" stroke-width="0.8"/>
            </g>
          ` : ''}

          <!-- 4. THORACIC SPINE & CLAVICLES & SCAPULAE (XƯƠNG TỦY) -->
          <g fill="none">

            <!-- Thoracic Spine Vertebrae (Đốt Sống Ngực T1-T12) -->
            <g opacity="0.45">
              <!-- Spine Central Column -->
              <line x1="250" y1="10" x2="250" y2="480" stroke="#f8fafc" stroke-width="16" opacity="0.3"/>
              <!-- Intervertebral Disks & Pedicles -->
              ${Array.from({length: 12}).map((_, i) => {
                const y = 35 + i * 34;
                return `
                  <rect x="240" y="${y}" width="20" height="26" rx="4" fill="#94a3b8" stroke="#f8fafc" stroke-width="1.2" opacity="0.5"/>
                  <circle cx="244" cy="${y+13}" r="2" fill="#0f172a"/>
                  <circle cx="256" cy="${y+13}" r="2" fill="#0f172a"/>
                `;
              }).join('')}
            </g>

            <!-- Trachea & Airway Column (Cột Khí Khí Quản) -->
            <g opacity="0.85">
              <!-- Tracheal Air Column (Radiolucent dark strip) -->
              <rect x="${245 + tracheaOffsetX}" y="10" width="10" height="110" rx="3" fill="#000000" stroke="#94a3b8" stroke-width="1" opacity="0.9"/>
              <!-- Carina (Bifurcation T4/T5) -->
              <path d="M ${250 + tracheaOffsetX},120 L ${225 + tracheaOffsetX},145 M ${250 + tracheaOffsetX},120 L ${275 + tracheaOffsetX},145" 
                    stroke="#000000" stroke-width="7" stroke-linecap="round"/>
              <path d="M ${250 + tracheaOffsetX},120 L ${225 + tracheaOffsetX},145 M ${250 + tracheaOffsetX},120 L ${275 + tracheaOffsetX},145" 
                    stroke="#cbd5e1" stroke-width="1.2" stroke-linecap="round"/>
            </g>

            <!-- Scapulae Lateral Borders (Xương Bả Vai) -->
            <g stroke="#94a3b8" stroke-width="2.5" opacity="0.25">
              <path d="M 65,100 C 60,160 70,240 85,280 L 105,200 Z" />
              <path d="M 435,100 C 440,160 430,240 415,280 L 395,200 Z" />
            </g>

            <!-- Clavicles S-Curve (Xương Đòn 2 Bên) -->
            <g stroke="#f8fafc" stroke-width="5" opacity="0.65" stroke-linecap="round">
              <!-- Right Clavicle -->
              <path d="M 238,70 C 180,68 120,92 75,72" stroke-width="6"/>
              <path d="M 238,70 C 180,68 120,92 75,72" stroke="#475569" stroke-width="2.5"/>
              <!-- Left Clavicle -->
              <path d="M 262,70 C 320,68 380,92 425,72" stroke-width="6"/>
              <path d="M 262,70 C 320,68 380,92 425,72" stroke="#475569" stroke-width="2.5"/>
            </g>

            <!-- 10 PAIRS OF RIB ARCS (10 CẶP XƯƠNG SƯỜN GIẢI PHẪU CHÍNH XÁC) -->
            <g opacity="0.5">
              <!-- Posterior & Anterior Ribs Right -->
              ${[
                "M 242,50 Q 170,45 105,80 Q 130,110 200,105",
                "M 242,80 Q 160,75 88,115 Q 125,150 205,135",
                "M 242,110 Q 150,105 75,150 Q 120,190 210,170",
                "M 242,140 Q 140,135 68,185 Q 115,230 215,205",
                "M 242,170 Q 135,165 65,220 Q 110,270 218,240",
                "M 242,205 Q 130,200 64,260 Q 110,310 220,280",
                "M 242,240 Q 125,235 65,300 Q 115,350 222,320",
                "M 242,275 Q 125,270 70,340 Q 120,385 224,355",
                "M 242,310 Q 130,310 80,375 Q 130,415 225,385",
                "M 242,345 Q 140,350 95,410 Q 145,440 225,415"
              ].map((d, idx) => {
                const isFractured = layers.ribFracture && (idx === 3 || idx === 4);
                return `
                  <path d="${d}" stroke="${isFractured ? '#ef4444' : '#f8fafc'}" stroke-width="${isFractured ? '5' : '4'}" stroke-linecap="round" />
                  <path d="${d}" stroke="#334155" stroke-width="1.8" stroke-linecap="round" />
                  ${isFractured ? `<circle cx="85" cy="${185 + idx*35}" r="7" fill="#ef4444" opacity="0.8"/>` : ''}
                `;
              }).join('')}

              <!-- Posterior & Anterior Ribs Left -->
              ${[
                "M 258,50 Q 330,45 395,80 Q 370,110 300,105",
                "M 258,80 Q 340,75 412,115 Q 375,150 295,135",
                "M 258,110 Q 350,105 425,150 Q 380,190 290,170",
                "M 258,140 Q 360,135 432,185 Q 385,230 285,205",
                "M 258,170 Q 365,165 435,220 Q 390,270 282,240",
                "M 258,205 Q 370,200 436,260 Q 390,310 280,280",
                "M 258,240 Q 375,235 435,300 Q 385,350 278,320",
                "M 258,275 Q 375,270 430,340 Q 380,385 276,355",
                "M 258,310 Q 370,310 420,375 Q 370,415 275,385",
                "M 258,345 Q 360,350 405,410 Q 355,440 275,415"
              ].map((d) => `
                <path d="${d}" stroke="#f8fafc" stroke-width="4" stroke-linecap="round" />
                <path d="${d}" stroke="#334155" stroke-width="1.8" stroke-linecap="round" />
              `).join('')}
            </g>

          </g>

          <!-- 5. PATHOLOGY OVERLAYS (CÁC TỔN THƯƠNG PHÂN TÍCH THỰC TẾ) -->

          <!-- A. Lobar Consolidation (Đông Đặc Thùy Dưới Phổi Phải) -->
          ${layers.consolidationR ? `
            <g>
              <path d="M 95,240 C 135,215 210,235 225,290 C 220,385 135,395 85,370 Z" 
                    fill="url(#consolidationGrad)" filter="url(#fineBlur)"/>
              <path d="M 110,260 C 145,240 200,255 215,300 C 210,370 145,380 98,360 Z" 
                    fill="#ffffff" opacity="0.5" filter="url(#fineBlur)"/>
              <!-- Air Bronchograms (Phế quản khí) -->
              <g stroke="#000000" stroke-width="2.2" stroke-linecap="round" opacity="0.85">
                <path d="M 140,255 L 165,305 M 150,265 L 180,320 M 165,275 L 195,335 M 125,280 L 145,330" />
              </g>
            </g>
          ` : ''}

          <!-- B. Ground Glass Opacities (Thâm Nhiễm Kính Mờ 2 Bên - GGO) -->
          ${layers.ggo ? `
            <g filter="url(#softBlur)">
              <path d="M 95,110 C 145,95 215,145 225,280 C 185,375 105,355 90,210 Z" fill="url(#ggoGrad)"/>
              <path d="M 405,110 C 355,95 285,145 275,280 C 315,375 395,355 410,210 Z" fill="url(#ggoGrad)"/>
              <ellipse cx="155" cy="230" rx="45" ry="65" fill="#f8fafc" opacity="0.25"/>
              <ellipse cx="345" cy="230" rx="45" ry="65" fill="#f8fafc" opacity="0.25"/>
            </g>
          ` : ''}

          <!-- C. Pleural Effusion (Tràn Dịch Màng Phổi Phải kèm Đường Cong Damoiseau) -->
          ${layers.effusionR ? `
            <g>
              <!-- Dense fluid opacification obliterating right CP angle with meniscus sign -->
              <path d="M 75,260 C 130,285 225,330 225,392 L 75,392 Z" fill="url(#effusionGrad)"/>
              <path d="M 70,255 C 130,280 225,328 225,392 L 70,392 Z" fill="#ffffff" opacity="0.4" filter="url(#fineBlur)"/>
            </g>
          ` : ''}

          <!-- D. Tuberculous Cavity (Hang Lao Thành Dày Đỉnh Phổi Phải) -->
          ${layers.cavity ? `
            <g>
              <!-- Satellite Infiltration -->
              <circle cx="150" cy="105" r="32" fill="url(#consolidationGrad)" filter="url(#fineBlur)"/>
              <!-- Thick-walled Cavity Ring -->
              <circle cx="150" cy="105" r="22" fill="#020408" stroke="#f8fafc" stroke-width="6.5" opacity="0.92"/>
              <circle cx="150" cy="105" r="22" fill="none" stroke="#64748b" stroke-width="2"/>
              <!-- Inner Radiolucent Center -->
              <circle cx="150" cy="105" r="16" fill="#000000"/>
            </g>
          ` : ''}

          <!-- E. Cardiogenic Pulmonary Edema (Phù Phổi Cấp - Hình Cánh Bướm & Kerley B) -->
          ${layers.pulmonaryEdema ? `
            <g>
              <!-- Batwing / Butterfly Perihilar Infiltrates -->
              <ellipse cx="175" cy="235" rx="55" ry="75" fill="url(#consolidationGrad)" filter="url(#softBlur)"/>
              <ellipse cx="325" cy="235" rx="55" ry="75" fill="url(#consolidationGrad)" filter="url(#softBlur)"/>
              <!-- Kerley B Lines (Short horizontal lines at basal pleura) -->
              <g stroke="#f8fafc" stroke-width="1.8" opacity="0.8">
                <line x1="75" y1="340" x2="95" y2="340" />
                <line x1="73" y1="350" x2="96" y2="350" />
                <line x1="77" y1="360" x2="100" y2="360" />
                <line x1="425" y1="340" x2="405" y2="340" />
                <line x1="427" y1="350" x2="404" y2="350" />
                <line x1="423" y1="360" x2="400" y2="360" />
              </g>
            </g>
          ` : ''}

          <!-- 6. HEART SHADOW & MEDIASTINUM (BÓNG TIM & TRUNG THẤT ANATOMICAL DICOM CRITERIA) -->
          <g id="cardiacMediastinalGroup">

            <!-- Descending Thoracic Aorta (Động Mạch Chủ Ngực Xuống - Run parallel right of spine / patient's left) -->
            <path d="M 264,140 L 266,380" stroke="#cbd5e1" stroke-width="2.5" opacity="0.35" fill="none" stroke-dasharray="6,3"/>

            <!-- Superior Vena Cava (SVC / Right Paratracheal Stripe - Patient's Right / Viewer's Left) -->
            <path d="M 238,70 L 236,165" stroke="#e2e8f0" stroke-width="3" opacity="0.5" fill="none"/>

            <!-- Anatomic Continuous Cardiac Contour Path (Bóng Tim Chuẩn PA View) -->
            <!-- 
              Patient's Right (Viewer's Left): SVC -> Right Atrium curve (raX: 195/175) -> Right Cardiophrenic Angle
              Patient's Left (Viewer's Right): LV Apex (lvX: 362/395) -> LAA -> Pulmonary Trunk -> Aortic Knob (aorticX: 278/292)
            -->
            ${(() => {
              const raX = 250 - (heartWidth * 0.35);    // Patient Right (Viewer Left x < 250) ~ 195px / 175px
              const lvX = 250 + (heartWidth * 0.65);    // Patient Left (Viewer Right x > 250) ~ 362px / 395px
              const aorticX = 250 + (layers.aorticKnob ? 42 : 28); // Aortic Knob on Patient Left (Viewer Right x > 250)
              const paX = 272;
              const laaX = 276;

              return `
                <path d="
                  M 238,110 
                  Q 236,155 234,170 
                  C 225,185 ${raX},215 ${raX},255 
                  C ${raX},295 235,370 248,372 
                  C 275,374 ${lvX - 35},382 ${lvX},355 
                  C ${lvX + 8},315 ${lvX - 25},245 ${laaX},215 
                  C ${laaX + 2},202 ${paX + 2},192 ${paX},180 
                  C ${paX - 2},168 ${aorticX + 10},155 ${aorticX},140 
                  C ${aorticX + 12},128 ${aorticX - 5},110 238,110 
                  Z
                " 
                fill="url(#heartMediastinumGrad)" 
                stroke="#f8fafc" 
                stroke-width="1.6" 
                stroke-linejoin="round"
                opacity="0.88"/>

                <!-- Aortic Knob Highlight (Quai ĐMC lồi đặc trưng ở T4/T5 bên trái bệnh nhân / bên phải màn hình) -->
                <path d="M ${aorticX},140 C ${aorticX + 12},128 ${aorticX - 5},110 238,110" 
                      stroke="#ffffff" stroke-width="2.2" fill="none" opacity="0.9"/>

                <!-- Left Cardiophrenic Fat Pad / Apex Shadow -->
                <path d="M ${lvX - 20},345 Q ${lvX - 5},365 255,372 Z" fill="#94a3b8" opacity="0.35"/>
              `;
            })()}

          </g>

          <!-- 7. DIAPHRAGM & SUBDIAPHRAGMATIC STRUCTURES (CƠ HOÀNH & BÓNG HƠI DẠ DÀY) -->
          <g>
            <!-- Right Hemidiaphragm Dome (Higher by 1.5cm, x: 60-240, apex y: 375) -->
            ${!layers.effusionR ? `
              <path d="M 65,390 Q 150,345 245,372 L 245,520 L 65,520 Z" fill="#cbd5e1" opacity="0.88"/>
              <path d="M 65,390 Q 150,345 245,372" stroke="#f8fafc" stroke-width="2.5" fill="none"/>
            ` : ''}

            <!-- Left Hemidiaphragm Dome (Lower, x: 255-435, apex y: 388) -->
            <path d="M 435,390 Q 345,358 255,385 L 255,520 L 435,520 Z" fill="#cbd5e1" opacity="0.88"/>
            <path d="M 435,390 Q 345,358 255,385" stroke="#f8fafc" stroke-width="2.5" fill="none"/>

            <!-- Gastric Air Bubble under Left Hemidiaphragm (Bóng Hơi Dạ Dày Radiolucent) -->
            <ellipse cx="320" cy="415" rx="24" ry="14" fill="#000000" stroke="#64748b" stroke-width="1.2" opacity="0.85"/>

            <!-- Subdiaphragmatic Abdominal Shadow -->
            <rect x="0" y="400" width="${w}" height="120" fill="#090d16" opacity="0.4"/>
          </g>

          <!-- 8. DICOM ANNOTATIONS & RADIOGRAPHIC MARKERS -->
          ${this.showAnnotations ? `
            <!-- Orientation Right Marker "R" (Bắt buộc góc trên bên phải bệnh nhân) -->
            <g font-family="Plus Jakarta Sans, sans-serif" font-weight="800">
              <text x="35" y="45" fill="#f8fafc" font-size="22" letter-spacing="1">R</text>
              
              <!-- DICOM Metadata Text overlay -->
              <g font-size="9" fill="#94a3b8" opacity="0.85" font-weight="600">
                <text x="35" y="60">PA UPRIGHT</text>
                <text x="35" y="72">120 kVp / 3.2 mAs</text>
                <text x="380" y="40">CLINIPORTAL CXR</text>
                <text x="380" y="52">ID: #CXR-99402</text>
                <text x="380" y="64">SCALE: 1:1</text>
              </g>
            </g>
          ` : ''}

        </g>
      </svg>
    `;

    this.container.innerHTML = svgHTML;
    const wrapper = this.container.closest('.cxr-svg-wrapper');
    if (wrapper) {
      if (this.isInverted) wrapper.classList.add('inverted');
      else wrapper.classList.remove('inverted');
    }
  }

  toggleInvert() {
    this.isInverted = !this.isInverted;
    return this.isInverted;
  }
}
