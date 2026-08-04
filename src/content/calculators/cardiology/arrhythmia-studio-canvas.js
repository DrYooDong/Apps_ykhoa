/**
 * Arrhythmia Pro Studio - High-Precision Gaussian Waveform ECG Engine
 * CliniPortal Cardiology Module
 * Động cơ tổng hợp dạng sóng ECG y khoa siêu mượt bằng hàm Gaussian & Splines,
 * hỗ trợ 3 chế độ giao diện: Giấy in Hồng Y tế, Monitor Cấp cứu ICU Neon, và Đen trắng.
 */

const ArrhythmiaCanvasEngine = (function() {
  'use strict';

  let canvas = null;
  let ctx = null;
  let animationFrameId = null;
  let isRunning = false;
  let xPos = 0;
  let isExpanded = false;

  // Cấu hình giao diện (Theme)
  const THEMES = {
    'paper-pink': {
      bg: '#fff1f2',
      gridSmall: 'rgba(244, 63, 94, 0.14)',
      gridBig: 'rgba(244, 63, 94, 0.32)',
      trace: '#e11d48',
      text: '#9f1239'
    },
    'icu-neon': {
      bg: '#020617',
      gridSmall: 'rgba(16, 185, 129, 0.12)',
      gridBig: 'rgba(16, 185, 129, 0.28)',
      trace: '#10b981',
      text: '#34d399'
    },
    'paper-white': {
      bg: '#fcfcfc',
      gridSmall: 'rgba(2, 132, 199, 0.12)',
      gridBig: 'rgba(2, 132, 199, 0.30)',
      trace: '#0284c7',
      text: '#0369a1'
    }
  };

  let currentThemeKey = 'paper-pink';

  // Cấu hình giấy ECG
  const CONFIG = {
    paperSpeed: 25, // mm/s
    gainScale: 1.0, // N = 10mm/mV
    smallGridPx: 10,
    bigGridPx: 50,
    ecgLineWidth: 2.2
  };

  // Tham số ECG
  let currentParams = {
    hr: 75,
    qrsWidth: 90,
    pWave: 'normal',
    prInterval: 160,
    regularity: 'regular',
    qtInterval: 400,
    stSegment: 'normal',
    deltaWave: false,
    epsilonWave: false
  };

  function init(canvasId) {
    canvas = document.getElementById(canvasId);
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
    start();
  }

  function resizeCanvas() {
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth || 800;
      canvas.height = isExpanded ? 460 : 320;
    }
    drawBackgroundGrid();
  }

  function setTheme(themeKey) {
    if (THEMES[themeKey]) {
      currentThemeKey = themeKey;
      drawBackgroundGrid();
    }
  }

  function setGainScale(scale) {
    CONFIG.gainScale = parseFloat(scale) || 1.0;
    drawBackgroundGrid();
  }

  function setPaperSpeed(speed) {
    CONFIG.paperSpeed = parseInt(speed) || 25;
  }

  function toggleExpand() {
    isExpanded = !isExpanded;
    const container = canvas ? canvas.parentElement : null;
    if (container) {
      container.classList.toggle('canvas-expanded', isExpanded);
    }
    resizeCanvas();
    return isExpanded;
  }

  /**
   * Hàm Gaussian mịn: amp * exp(-((x - mu)^2) / (2 * sigma^2))
   */
  function gaussian(x, mu, sigma, amp) {
    if (sigma <= 0) return 0;
    return amp * Math.exp(-Math.pow(x - mu, 2) / (2 * sigma * sigma));
  }

  /**
   * Vẽ lưới giấy ECG theo Theme được chọn
   */
  function drawBackgroundGrid() {
    if (!ctx || !canvas) return;

    const theme = THEMES[currentThemeKey] || THEMES['paper-pink'];
    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = theme.bg;
    ctx.fillRect(0, 0, width, height);

    // 1. Lưới nhỏ 1mm
    ctx.beginPath();
    ctx.strokeStyle = theme.gridSmall;
    ctx.lineWidth = 0.75;
    for (let x = 0; x < width; x += CONFIG.smallGridPx) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += CONFIG.smallGridPx) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // 2. Lưới lớn 5mm
    ctx.beginPath();
    ctx.strokeStyle = theme.gridBig;
    ctx.lineWidth = 1.25;
    for (let x = 0; x < width; x += CONFIG.bigGridPx) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += CONFIG.bigGridPx) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    ctx.stroke();

    // 3. Nhãn thông số y khoa
    const gainText = CONFIG.gainScale === 0.5 ? '5 mm/mV (N/2)' : (CONFIG.gainScale === 2.0 ? '20 mm/mV (2N)' : '10 mm/mV (N)');
    ctx.fillStyle = theme.text;
    ctx.font = '700 11px Inter, sans-serif';
    ctx.fillText('LEAD II (Thực thời)', 12, 22);
    ctx.fillText(`${CONFIG.paperSpeed} mm/s | ${gainText}`, width - 150, 22);
  }

  function updateParams(newParams) {
    currentParams = { ...currentParams, ...newParams };
  }

  /**
   * Tính toán điện thế Y (mV) mịn màng y khoa bằng tổng hợp Gaussian Curves
   */
  function getWaveformVoltage(tInBeat, beatDuration) {
    const p = currentParams;
    let voltage = 0;

    const qrsMs = p.qrsWidth || 90;
    const prMs = p.prInterval || 160;
    const qtcMs = p.qtInterval || 400;

    // Vị trí mốc chuẩn (ms)
    const pCenter = 60;
    const qrsStart = Math.max(110, prMs);
    const qrsCenter = qrsStart + (qrsMs * 0.4);
    const tCenter = qrsStart + (qtcMs * 0.68);

    // 1. SÓNG P / F / f (Gaussian mượt)
    if (p.pWave === 'normal') {
      voltage += gaussian(tInBeat, pCenter, 14, 0.16);
    } else if (p.pWave === 'sawtooth') {
      // Sóng F cuồng nhĩ nhấp nhô liên tục
      voltage += 0.18 * Math.sin((tInBeat / 160) * 2 * Math.PI);
    } else if (p.pWave === 'chaotic') {
      // Sóng f rung nhĩ hỗn loạn
      voltage += gaussian(tInBeat, 40, 8, 0.05) - gaussian(tInBeat, 90, 10, 0.04) + 0.05 * Math.sin(tInBeat / 25);
    } else if (p.pWave === 'retrograde') {
      // P ngược âm
      voltage -= gaussian(tInBeat, qrsStart - 25, 10, 0.14);
    }

    // 2. PHỨC BỘ QRS (Tổng hợp các đỉnh Gaussian nhọn)
    // Sóng Delta (WPW)
    if (p.deltaWave) {
      voltage += gaussian(tInBeat, qrsStart - 8, 12, 0.32);
    }

    // Sóng Q (Âm nhỏ)
    voltage -= gaussian(tInBeat, qrsCenter - (qrsMs * 0.25), qrsMs * 0.08, 0.12);

    // Sóng R (Dương cao nhọn)
    const rSigma = Math.max(3.5, qrsMs * 0.09);
    voltage += gaussian(tInBeat, qrsCenter, rSigma, 0.95);

    // Sóng S (Âm sau R)
    voltage -= gaussian(tInBeat, qrsCenter + (qrsMs * 0.25), qrsMs * 0.12, 0.28);

    // Sóng Epsilon (ARVC)
    if (p.epsilonWave) {
      voltage += gaussian(tInBeat, qrsCenter + (qrsMs * 0.45), 6, 0.22);
    }

    // 3. ĐOẠN ST & SÓNG T (Gaussian mượt)
    if (p.stSegment === 'brugada-coved') {
      // ST chênh vòm Type 1 Brugada
      const brugadaPeak = qrsCenter + (qrsMs * 0.3);
      voltage += gaussian(tInBeat, brugadaPeak, 20, 0.42);
      voltage -= gaussian(tInBeat, tCenter, 28, 0.22); // T âm sau ST vòm
    } else if (p.stSegment === 'elevation') {
      voltage += gaussian(tInBeat, qrsCenter + 35, 30, 0.30);
      voltage += gaussian(tInBeat, tCenter, 22, 0.25);
    } else if (p.stSegment === 'depression') {
      voltage -= gaussian(tInBeat, qrsCenter + 35, 30, 0.22);
      voltage += gaussian(tInBeat, tCenter, 22, 0.25);
    } else {
      // T bình thường
      voltage += gaussian(tInBeat, tCenter, 26, 0.28);
    }

    return voltage;
  }

  function renderLoop() {
    if (!isRunning || !ctx || !canvas) return;

    const theme = THEMES[currentThemeKey] || THEMES['paper-pink'];
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2 + 10;

    const speed = (CONFIG.paperSpeed / 25) * 2.2;
    const beatDurationMs = 60000 / Math.max(20, Math.min(250, currentParams.hr));

    const tInBeat = (xPos * (beatDurationMs / (width * 0.35))) % beatDurationMs;
    const voltage = getWaveformVoltage(tInBeat, beatDurationMs);

    const yPos = centerY - (voltage * 100 * CONFIG.gainScale);

    ctx.strokeStyle = theme.trace;
    ctx.lineWidth = CONFIG.ecgLineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (xPos === 0) {
      ctx.beginPath();
      ctx.moveTo(0, yPos);
    } else {
      const clearWidth = 25;
      ctx.fillStyle = theme.bg;
      ctx.fillRect(xPos, 0, clearWidth, height);

      redrawGridRegion(xPos, clearWidth, height, theme);

      ctx.lineTo(xPos, yPos);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(xPos, yPos);
    }

    xPos += speed;
    if (xPos >= width) {
      xPos = 0;
    }

    animationFrameId = requestAnimationFrame(renderLoop);
  }

  function redrawGridRegion(startX, clearW, height, theme) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(startX, 0, clearW, height);
    ctx.clip();

    ctx.strokeStyle = theme.gridSmall;
    ctx.lineWidth = 0.75;
    ctx.beginPath();
    const startGridX = Math.floor(startX / CONFIG.smallGridPx) * CONFIG.smallGridPx;
    for (let x = startGridX; x <= startX + clearW; x += CONFIG.smallGridPx) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += CONFIG.smallGridPx) {
      ctx.moveTo(startX, y);
      ctx.lineTo(startX + clearW, y);
    }
    ctx.stroke();

    ctx.strokeStyle = theme.gridBig;
    ctx.lineWidth = 1.25;
    ctx.beginPath();
    const startBigX = Math.floor(startX / CONFIG.bigGridPx) * CONFIG.bigGridPx;
    for (let x = startBigX; x <= startX + clearW; x += CONFIG.bigGridPx) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += CONFIG.bigGridPx) {
      ctx.moveTo(startX, y);
      ctx.lineTo(startX + clearW, y);
    }
    ctx.stroke();

    ctx.restore();
  }

  function start() {
    if (isRunning) return;
    isRunning = true;
    xPos = 0;
    drawBackgroundGrid();
    renderLoop();
  }

  function stop() {
    isRunning = false;
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  }

  return {
    init,
    updateParams,
    setTheme,
    setGainScale,
    setPaperSpeed,
    toggleExpand,
    start,
    stop,
    resizeCanvas
  };
})();

window.ArrhythmiaCanvasEngine = ArrhythmiaCanvasEngine;
