/**
 * CLINIPORTAL — MEDICAL BENTO COMPONENT SYSTEM JS
 * File: js/components/bento-components.js
 * Interactive scripts for Gauge Meter, Live IoT Node updates, and Matrix Filters
 */

document.addEventListener('DOMContentLoaded', () => {
  initMedicalGauges();
  initNodeStatusSimulation();
  initMatrixFilters();
});

/**
 * 1. CLINICAL SAFETY & PRIVACY GAUGE SYSTEM
 */
function initMedicalGauges() {
  const gauges = document.querySelectorAll('.bento-gauge-svg');
  gauges.forEach(gauge => {
    const value = parseFloat(gauge.getAttribute('data-value') || '85');
    setGaugeValue(gauge, value);
  });

  // Range Slider Sync
  const rangeInputs = document.querySelectorAll('.bento-range-input');
  rangeInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      const targetId = input.getAttribute('data-target-gauge');
      const targetGauge = document.getElementById(targetId);
      if (targetGauge) {
        setGaugeValue(targetGauge, parseFloat(e.target.value));
      }
    });
  });
}

function setGaugeValue(gaugeSvg, val) {
  const valueArc = gaugeSvg.querySelector('.gauge-value-arc');
  const valNumText = gaugeSvg.querySelector('.gauge-val-num');
  
  if (!valueArc || !valNumText) return;

  // Gauge Arc Math: Circle circumference = 2 * PI * R
  // Radius R = 70 => Circumference ~ 439.8
  // Semi-circle arc length ~ 220
  const maxArcLength = 220;
  const clampedVal = Math.max(0, Math.min(100, val));
  const offset = maxArcLength - (clampedVal / 100) * maxArcLength;

  valueArc.style.strokeDasharray = `${maxArcLength}`;
  valueArc.style.strokeDashoffset = `${offset}`;

  // Update text
  valNumText.textContent = `${Math.round(clampedVal)}%`;

  // Dynamic Color according to threshold
  if (clampedVal >= 80) {
    valueArc.style.stroke = 'var(--color-success, #10b981)';
  } else if (clampedVal >= 50) {
    valueArc.style.stroke = 'var(--color-warning, #f59e0b)';
  } else {
    valueArc.style.stroke = 'var(--color-danger, #ef4444)';
  }
}

/**
 * 2. LIVE IoT / HOSPITAL NODE NETWORK SIMULATION
 */
function initNodeStatusSimulation() {
  const nodeCards = document.querySelectorAll('.bento-node-card');
  if (nodeCards.length === 0) return;

  // Periodically fluctuate minor vitals/status for demonstration
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * nodeCards.length);
    const targetCard = nodeCards[randomIndex];
    const subText = targetCard.querySelector('.bento-node-sub');
    
    if (subText && subText.getAttribute('data-type') === 'vitals') {
      const currentBpm = Math.floor(68 + Math.random() * 25);
      subText.textContent = `HR: ${currentBpm} bpm`;
    }
  }, 3500);
}

/**
 * 3. COMPARISON MATRIX FILTERS
 */
function initMatrixFilters() {
  const filterBtns = document.querySelectorAll('.bento-matrix-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      const rows = document.querySelectorAll('.bento-comparison-table tbody tr');

      rows.forEach(row => {
        if (filter === 'all') {
          row.style.display = '';
        } else if (filter === 'personalized') {
          row.style.display = row.getAttribute('data-personalized') === 'true' ? '' : 'none';
        } else if (filter === 'privacy') {
          row.style.display = row.getAttribute('data-dp') === 'true' ? '' : 'none';
        }
      });
    });
  });
}
