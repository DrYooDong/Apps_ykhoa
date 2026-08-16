/**
 * MACH CHAN SIMULATOR CONTROLLER - CliniPortal YHCT Module
 * Real-time SVG Pulse Waveform Engine, Pressure Depth Control & East-West Correlation
 */

document.addEventListener("DOMContentLoaded", function () {
  const svg = document.getElementById("pulseWaveformSVG");
  const detailPanel = document.getElementById("mcDetailPanel");
  const pulsesGrid = document.getElementById("mcPulsesGrid");
  const pressureBtns = document.querySelectorAll(".btn-pressure");
  const bpmDisplay = document.getElementById("pulseBpmDisplay");
  const statusDisplay = document.getElementById("pulseStatusDisplay");

  if (!svg || typeof MACH_CHAN_DATA === "undefined") return;

  let activePulseId = "phu";
  let activePressure = "phu"; // 'phu', 'trung', 'tram'
  let animFrameId = null;
  let offsetX = 0;

  // Waveform Math Constants
  const svgWidth = 600;
  const svgHeight = 180;
  const midY = svgHeight / 2;

  // Render Pulses List Buttons
  function renderPulsesList() {
    if (!pulsesGrid) return;

    pulsesGrid.innerHTML = MACH_CHAN_DATA.pulses.map(p => `
      <button class="btn-pulse-item ${p.id === activePulseId ? 'active' : ''}" data-id="${p.id}">
        <div>${p.name}</div>
        <div style="font-size:10px; font-weight:400; opacity:0.8;">${p.group}</div>
      </button>
    `).join("");

    document.querySelectorAll(".btn-pulse-item").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".btn-pulse-item").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectPulse(btn.getAttribute("data-id"));
      });
    });
  }

  // Select Active Pulse
  function selectPulse(pulseId) {
    activePulseId = pulseId;
    const pulse = MACH_CHAN_DATA.pulses.find(p => p.id === pulseId);
    if (!pulse) return;

    if (bpmDisplay) bpmDisplay.innerText = `${pulse.speedBpm} BPM`;
    if (statusDisplay) statusDisplay.innerText = `${pulse.name} (${pulse.pinyin})`;

    renderPulseDetails(pulse);
  }

  // Render Pulse Details Panel
  function renderPulseDetails(pulse) {
    if (!detailPanel) return;

    const pressData = MACH_CHAN_DATA.pressures[activePressure];
    const isDepthMatch = pulse.depth === activePressure || (pulse.depth === "trung" && activePressure === "trung");

    detailPanel.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid var(--color-surface-offset); padding-bottom:0.75rem;">
        <h3 style="margin:0; font-size:var(--text-lg); font-weight:700; color:var(--color-text);">
          <i class="fa-solid fa-heart-pulse" style="color:var(--color-tcm-green);"></i> ${pulse.name}
        </h3>
        <span class="element-badge-lg" style="background:var(--color-tcm-green);">${pulse.pinyin}</span>
      </div>

      <div style="background:var(--color-surface-offset); border:1px solid var(--color-divider); border-radius:var(--radius-md); padding:0.85rem; font-size:var(--text-xs); display:flex; flex-direction:column; gap:0.4rem;">
        <div><strong>Nhóm Mạch:</strong> ${pulse.group}</div>
        <div><strong>Độ Sâu Cảm Nhận Chuẩn:</strong> <span style="color:var(--color-warning); font-weight:700;">${MACH_CHAN_DATA.pressures[pulse.depth].label}</span></div>
        <div><strong>Trạng Thái Ngón Tay Hiện Tại (${pressData.label}):</strong> 
          <span style="font-weight:700; color:${isDepthMatch ? 'var(--color-success)' : 'var(--color-danger)'};">
            ${isDepthMatch ? '✅ Cảm nhận rõ ràng nhịp sóng' : '⚠️ Áp lực ngón tay chưa đúng độ sâu (Cần điều chỉnh lực ấn)'}
          </span>
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:0.75rem; font-size:var(--text-xs); line-height:1.5;">
        <div>
          <strong style="color:var(--color-text);">🖐️ Cảm giác ngón tay (Cảm nhận xúc giác):</strong>
          <p style="margin:0.2rem 0 0 0; color:var(--color-text-muted);">${pulse.desc}</p>
        </div>

        <div>
          <strong style="color:var(--color-tcm-green);">☯️ Ý nghĩa Y Lý & Thể Bệnh Đông Y:</strong>
          <p style="margin:0.2rem 0 0 0; color:var(--color-text-muted); font-weight:500;">${pulse.syndromes}</p>
        </div>

        <div style="background:var(--color-surface-2); border:1px solid var(--color-divider); padding:0.75rem; border-radius:var(--radius-md);">
          <strong style="color:var(--color-primary);"><i class="fa-solid fa-stetho"></i> Đối Chiếu Sinh Lý Bệnh Y Học Hiện Đại (Tây Y):</strong>
          <p style="margin:0.25rem 0 0 0; color:var(--color-text-muted);">${pulse.westCorr}</p>
        </div>
      </div>
    `;
  }

  // Animation Waveform Loop
  function startWaveformAnimation() {
    if (animFrameId) cancelAnimationFrame(animFrameId);

    function animate() {
      const pulse = MACH_CHAN_DATA.pulses.find(p => p.id === activePulseId) || MACH_CHAN_DATA.pulses[0];
      
      // Speed multiplier
      const speed = (pulse.speedBpm / 60) * 2.2;
      offsetX += speed;
      if (offsetX > svgWidth) offsetX = 0;

      // Check depth match for amplitude modulation
      const isMatch = pulse.depth === activePressure;
      const ampMod = isMatch ? 1.0 : (activePressure === "trung" ? 0.6 : 0.25);

      // Generate Waveform Path Points
      let pathD = `M 0 ${midY}`;
      const pointsCount = 300;
      const step = svgWidth / pointsCount;

      for (let i = 0; i <= pointsCount; i++) {
        const x = i * step;
        const waveX = (x + offsetX) % 180;

        // Mathematical Pulse Waveform (Systolic peak + Dicrotic notch)
        let y = midY;
        const amp = 45 * pulse.amplitude * ampMod;

        if (waveX < 40) {
          // Primary Anacrotic rise & Systolic Peak
          const t = waveX / 40;
          y = midY - amp * Math.sin(t * Math.PI) * pulse.sharpness;
        } else if (waveX < 70) {
          // Dicrotic notch
          const t = (waveX - 40) / 30;
          y = midY - (amp * 0.3) * Math.cos(t * Math.PI);
        } else if (waveX < 110) {
          // Secondary Dicrotic wave peak
          const t = (waveX - 70) / 40;
          y = midY - (amp * 0.2) * Math.sin(t * Math.PI);
        } else {
          // Diastolic baseline
          y = midY;
        }

        pathD += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
      }

      svg.innerHTML = `
        <defs>
          <linearGradient id="pulseGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#0d9488" stop-opacity="0.2"/>
            <stop offset="50%" stop-color="#2dd4bf" stop-opacity="1"/>
            <stop offset="100%" stop-color="#0d9488" stop-opacity="0.2"/>
          </linearGradient>
        </defs>

        <!-- Grid Lines -->
        <line x1="0" y1="${midY}" x2="${svgWidth}" y2="${midY}" stroke="#334155" stroke-width="1" stroke-dasharray="4 4"/>
        <line x1="0" y1="${midY - 40}" x2="${svgWidth}" y2="${midY - 40}" stroke="#1e293b" stroke-width="1"/>
        <line x1="0" y1="${midY + 40}" x2="${svgWidth}" y2="${midY + 40}" stroke="#1e293b" stroke-width="1"/>

        <!-- Active Waveform Path -->
        <path d="${pathD}" fill="none" stroke="url(#pulseGlow)" stroke-width="${isMatch ? 3.5 : 2}" stroke-linecap="round" stroke-linejoin="round"/>
      `;

      animFrameId = requestAnimationFrame(animate);
    }

    animate();
  }

  // Pressure Buttons Listener
  pressureBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      pressureBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activePressure = btn.getAttribute("data-pressure");
      const pulse = MACH_CHAN_DATA.pulses.find(p => p.id === activePulseId);
      if (pulse) renderPulseDetails(pulse);
    });
  });

  // Initialize
  renderPulsesList();
  selectPulse("phu");
  startWaveformAnimation();
});
