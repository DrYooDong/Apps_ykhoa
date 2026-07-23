/**
 * cxr-svg-engine.js — Chest X-Ray Pro Studio
 * Động cơ dựng giải phẫu lồng ngực & Xếp chồng tổn thương bằng SVG Vector.
 */

class CXRSVGEngine {
  constructor(svgContainerId) {
    this.container = document.getElementById(svgContainerId);
    this.isInverted = false;
    this.contrast = 100;
    this.brightness = 100;
  }

  render(layers, ctrHeartWidthPct = 0.45) {
    if (!this.container) return;

    // Dimensions
    const w = 500;
    const h = 480;

    // Trachea shift
    const tracheaOffsetX = layers.pneumothoraxR ? -20 : (layers.effusionR ? -15 : 0);
    // Heart width ratio
    const heartWidth = layers.cardiomegaly ? 260 : (w * (ctrHeartWidthPct || 0.45));

    let svgHTML = `
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" style="background:#050814; border-radius:12px;">
        <defs>
          <filter id="cxrAdjust">
            <feComponentTransfer>
              <feFuncR type="linear" slope="${this.contrast / 100}" intercept="${(this.brightness - 100) / 200}"/>
              <feFuncG type="linear" slope="${this.contrast / 100}" intercept="${(this.brightness - 100) / 200}"/>
              <feFuncB type="linear" slope="${this.contrast / 100}" intercept="${(this.brightness - 100) / 200}"/>
            </feComponentTransfer>
          </filter>

          <!-- Radiograph Lung Field Gradient -->
          <radialGradient id="lungGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#0a0f1d"/>
            <stop offset="100%" stop-color="#02040a"/>
          </radialGradient>

          <!-- Consolidation Opacity Pattern -->
          <radialGradient id="consolidationGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#e2e8f0" stop-opacity="0.85"/>
            <stop offset="70%" stop-color="#cbd5e1" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#94a3b8" stop-opacity="0.1"/>
          </radialGradient>

          <!-- Ground Glass Pattern -->
          <radialGradient id="ggoGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#f8fafc" stop-opacity="0.45"/>
            <stop offset="100%" stop-color="#cbd5e1" stop-opacity="0.05"/>
          </radialGradient>
        </defs>

        <g filter="url(#cxrAdjust)">
          <!-- 1. SOFT TISSUE & BODY CONTOUR -->
          <path d="M 60,480 C 60,280 80,100 130,40 C 180,10 320,10 370,40 C 420,100 440,280 440,480 Z" fill="#1e293b" opacity="0.3"/>

          <!-- Subcutaneous Emphysema Layer -->
          ${layers.emphysema ? `
            <g fill="#000" opacity="0.6">
              <ellipse cx="75" cy="180" rx="15" ry="30" />
              <ellipse cx="85" cy="230" rx="10" ry="25" />
              <ellipse cx="70" cy="280" rx="12" ry="20" />
            </g>
          ` : ''}

          <!-- 2. LUNG FIELDS (BACKGROUND HYPERLUCENCY) -->
          <!-- Right Lung -->
          <path id="rightLung" d="${layers.pneumothoraxR ? 'M 100,80 C 120,70 210,70 230,80 C 220,150 200,240 180,320 C 130,320 110,240 100,80 Z' : 'M 90,70 C 130,50 220,60 235,70 C 235,160 225,320 220,380 C 160,410 90,380 90,380 C 70,260 70,140 90,70 Z'}" 
                fill="${layers.pneumothoraxR ? '#000000' : 'url(#lungGradient)'}" stroke="#334155" stroke-width="1"/>

          <!-- Left Lung -->
          <path id="leftLung" d="M 410,70 C 370,50 280,60 265,70 C 265,160 275,320 280,380 C 340,410 410,380 410,380 C 430,260 430,140 410,70 Z" 
                fill="url(#lungGradient)" stroke="#334155" stroke-width="1"/>

          <!-- Visceral Pleural Line for Pneumothorax -->
          ${layers.pneumothoraxR ? `
            <path d="M 120,90 C 130,120 180,180 180,320" stroke="#f8fafc" stroke-width="1.5" stroke-dasharray="3,3" fill="none" opacity="0.9"/>
          ` : ''}

          <!-- 3. RIB CAGE & BONES -->
          <g stroke="#94a3b8" stroke-width="3" fill="none" opacity="0.45" stroke-linecap="round">
            <!-- Spine -->
            <line x1="250" y1="20" x2="250" y2="460" stroke-width="18" stroke="#64748b" opacity="0.4"/>

            <!-- Clavicles -->
            <path d="M 100,75 Q 175,95 240,75" stroke-width="6"/>
            <path d="M 400,75 Q 325,95 260,75" stroke-width="6"/>

            <!-- Ribs Right -->
            <path d="M 245,100 C 180,90 100,130 95,160 C 100,190 180,180 245,160" />
            <path d="M 245,140 C 170,130 90,170 85,210 C 90,240 170,230 245,210" />
            <path d="M 245,180 C 160,170 80,210 ${layers.ribFractures ? '75,250' : '80,250'} C 85,280 160,270 245,250" stroke="${layers.ribFractures ? '#ef4444' : '#94a3b8'}" stroke-width="${layers.ribFractures ? '4' : '3'}"/>
            <path d="M 245,220 C 150,210 75,250 ${layers.ribFractures ? '70,290' : '75,290'} C 80,320 150,310 245,290" stroke="${layers.ribFractures ? '#ef4444' : '#94a3b8'}" stroke-width="${layers.ribFractures ? '4' : '3'}"/>

            <!-- Ribs Left -->
            <path d="M 255,100 C 320,90 400,130 405,160 C 400,190 320,180 255,160" />
            <path d="M 255,140 C 330,130 410,170 415,210 C 410,240 330,230 255,210" />
            <path d="M 255,180 C 340,170 420,210 420,250 C 415,280 340,270 255,250" />
          </g>

          <!-- 4. AIRWAYS & TRACHEA -->
          <g stroke="#0f172a" stroke-width="8" fill="none" opacity="0.8">
            <line x1="${250 + tracheaOffsetX}" y1="20" x2="${250 + tracheaOffsetX}" y2="120" stroke="#000" stroke-width="10"/>
            <path d="M ${250 + tracheaOffsetX},120 L ${210 + tracheaOffsetX},150" stroke="#000" stroke-width="6"/>
            <path d="M ${250 + tracheaOffsetX},120 L ${290 + tracheaOffsetX},150" stroke="#000" stroke-width="6"/>
          </g>

          <!-- 5. ABNORMALITY OVERLAYS -->
          
          <!-- Lobar Consolidation Right Lower Lobe -->
          ${layers.consolidationR ? `
            <path d="M 100,240 C 140,220 220,250 230,300 C 220,380 140,390 100,360 Z" fill="url(#consolidationGrad)" />
            <!-- Air Bronchograms -->
            <path d="M 140,260 L 170,310 M 160,270 L 190,330" stroke="#000000" stroke-width="2" opacity="0.7"/>
          ` : ''}

          <!-- Ground Glass Opacities (GGO) -->
          ${layers.ggo ? `
            <path d="M 100,120 C 150,110 210,160 220,280 C 180,360 110,340 100,220 Z" fill="url(#ggoGrad)" />
            <path d="M 400,120 C 350,110 290,160 280,280 C 320,360 390,340 400,220 Z" fill="url(#ggoGrad)" />
          ` : ''}

          <!-- Pleural Effusion Right -->
          ${layers.effusionR ? `
            <path d="M 80,280 C 140,260 225,320 225,390 L 80,390 Z" fill="#f8fafc" opacity="0.85" />
          ` : ''}

          <!-- Tuberculous Cavity Right Apex -->
          ${layers.cavity ? `
            <circle cx="150" cy="110" r="22" fill="#000000" stroke="#e2e8f0" stroke-width="5" opacity="0.9"/>
          ` : ''}

          <!-- Cardiogenic Pulmonary Edema (Butterfly / Batwing) -->
          ${layers.pulmonaryEdema ? `
            <ellipse cx="190" cy="240" rx="45" ry="60" fill="url(#consolidationGrad)" />
            <ellipse cx="310" cy="240" rx="45" ry="60" fill="url(#consolidationGrad)" />
          ` : ''}

          <!-- 6. HEART SHADOW & MEDIASTINUM -->
          <g>
            <!-- Aortic Knob -->
            <ellipse cx="${265 + (layers.aorticKnob ? 10 : 0)}" cy="140" rx="${layers.aorticKnob ? 22 : 16}" ry="16" fill="#e2e8f0" opacity="0.6"/>

            <!-- Heart Shadow -->
            <path d="M 240,150 C ${250 - heartWidth/2},180 ${250 - heartWidth/2},340 240,360 C 280,370 ${250 + heartWidth/2},350 ${250 + heartWidth/2},240 C 300,180 260,150 240,150 Z" 
                  fill="#f1f5f9" opacity="0.75" stroke="#cbd5e1" stroke-width="2"/>
          </g>

          <!-- 7. DIAPHRAGM -->
          <!-- Right Hemidiaphragm -->
          <path d="M 70,380 Q 150,340 240,370 L 240,480 L 70,480 Z" fill="#e2e8f0" opacity="0.8"/>

          <!-- Left Hemidiaphragm -->
          <path d="M 430,380 Q 350,350 250,380 L 250,480 L 430,480 Z" fill="#e2e8f0" opacity="0.8"/>

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
