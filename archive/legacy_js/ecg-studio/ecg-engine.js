/**
 * ECG Pro Studio — Wave Synthesis Engine
 * Math-driven Canvas generator using Gaussian & Spline curves to render realistic 12-lead & rhythm strip ECGs.
 */

(function () {
  'use strict';

  class ECGWaveEngine {
    constructor(canvas, options = {}) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.lead = options.lead || 'II';
      this.speed = options.speed || 25; // 12.5, 25, 50 mm/s
      this.gain = options.gain || 10;   // 5 (N/2), 10 (N), 20 (2N) mm/mV
      this.combinedParams = options.combinedParams || window.ECGModifiers.combineModifiers(['sinus_normal']);
      this.isRhythmStrip = options.isRhythmStrip || false;
      this.paperGrid = options.paperGrid !== undefined ? options.paperGrid : true;
    }

    setParams(combinedParams) {
      this.combinedParams = combinedParams;
    }

    setLead(lead) {
      this.lead = lead;
    }

    setSpeed(speed) {
      this.speed = parseFloat(speed) || 25;
    }

    setGain(gain) {
      this.gain = parseFloat(gain) || 10;
    }

    /**
     * Gaussian function for smooth P and T waves: amplitude * exp(-((x-center)^2)/(2*sigma^2))
     */
    gaussian(x, center, sigma, amplitude) {
      return amplitude * Math.exp(-Math.pow(x - center, 2) / (2 * sigma * sigma));
    }

    /**
     * Main render method for a single lead canvas strip
     */
    render() {
      if (!this.canvas) return;

      const parent = this.canvas.parentElement;
      const width = this.canvas.width = parent ? parent.clientWidth : 600;
      const defaultHeight = this.isRhythmStrip ? 180 : (parent ? parent.clientHeight || 130 : 130);
      const height = this.canvas.height = defaultHeight;
      const ctx = this.ctx;

      ctx.clearRect(0, 0, width, height);

      // Draw Millimeter Paper Grid if enabled
      if (this.paperGrid) {
        this.drawPaperGrid(width, height);
      }

      // Generate signal points
      const points = this.generateLeadSignal(width, height);

      // Draw ECG wave path
      ctx.beginPath();
      ctx.lineWidth = 2.0;
      ctx.strokeStyle = document.documentElement.getAttribute('data-theme') === 'dark' ? '#f87171' : '#dc2626';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let i = 0; i < points.length; i++) {
        if (i === 0) {
          ctx.moveTo(points[i].x, points[i].y);
        } else {
          ctx.lineTo(points[i].x, points[i].y);
        }
      }
      ctx.stroke();

      // Render lead label overlay + calibration mark badge
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillStyle = document.documentElement.getAttribute('data-theme') === 'dark' ? '#94a3b8' : '#475569';
      ctx.fillText(this.lead, 10, 18);
    }

    drawPaperGrid(width, height) {
      const ctx = this.ctx;
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      // Grid background
      ctx.fillStyle = isDark ? '#1c0a0a' : '#fff1f2';
      ctx.fillRect(0, 0, width, height);

      // 1mm small box = 5px, 5mm big box = 25px
      const smallGrid = 5;
      const bigGrid = 25;

      // Small grid lines (1mm)
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = isDark ? 'rgba(239, 68, 68, 0.18)' : 'rgba(239, 68, 68, 0.15)';
      for (let x = 0; x < width; x += smallGrid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += smallGrid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Big grid lines (5mm)
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = isDark ? 'rgba(239, 68, 68, 0.45)' : 'rgba(239, 68, 68, 0.35)';
      for (let x = 0; x < width; x += bigGrid) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += bigGrid) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    /**
     * Generates a continuous array of {x, y} signal points across canvas width
     */
    generateLeadSignal(width, height) {
      const points = [];
      const leadInfo = window.ECGLeadSynthesizer.getLeadSpecificParams(this.lead, this.combinedParams);
      const params = leadInfo.leadParams;

      const baselineY = height / 2;
      
      // Dynamic Gain: Gain 10 (N) -> 1mV = 10mm = 50px. Gain 5 (N/2) -> 25px. Gain 20 (2N) -> 100px.
      const pxPerMv = (this.gain / 10) * 50;

      // Dynamic Speed: Speed 25mm/s -> 1px = 4ms (0.25px/ms). Speed 50mm/s -> 0.5px/ms. Speed 12.5mm/s -> 0.125px/ms.
      const pxPerMs = (this.speed / 25) * 0.25;

      const beatDurationMs = params.hr > 0 ? (60000 / params.hr) : 1000;
      let currentX = 0;
      let beatIndex = 0;

      // Handle extreme emergency rhythms first: VFib & Sine wave
      if (params.vfib) {
        for (let x = 0; x < width; x += 2) {
          const t = x * 0.05 * (this.speed / 25);
          const y = baselineY + (Math.sin(t * 1.5) * 30 + Math.cos(t * 3.7) * 20 + (Math.random() - 0.5) * 15) * (this.gain / 10);
          points.push({ x, y });
        }
        return points;
      }

      if (params.sineWave) {
        for (let x = 0; x < width; x += 2) {
          const freq = (2 * Math.PI) / (beatDurationMs * pxPerMs);
          const y = baselineY + Math.sin(x * freq) * 45 * (this.gain / 10);
          points.push({ x, y });
        }
        return points;
      }

      // Wenckebach PR progressive lengthening state
      let wenckebachCycle = 0;

      while (currentX < width) {
        let currentBeatMs = beatDurationMs;
        let currentPR = params.pr;

        // Irregular RR (AFib / Sinus Arrhythmia)
        if (params.irregularRR) {
          const variation = (Math.random() - 0.5) * 2 * params.irregularRR * beatDurationMs;
          currentBeatMs = Math.max(300, beatDurationMs + variation);
        }

        // Wenckebach (Mobitz I)
        if (params.mobitz1) {
          wenckebachCycle = (beatIndex % 4);
          if (wenckebachCycle === 3) {
            currentPR = 0; // Drop QRS
          } else {
            currentPR = params.pr + (wenckebachCycle * 50);
          }
        }

        // Mobitz II (Drop every 2nd or 3rd beat)
        let dropBeat = false;
        if (params.mobitz2 && (beatIndex % (params.mobitzRatio || 2) === 1)) {
          dropBeat = true;
        }

        // Generate PVC (Premature Ventricular Contraction)
        let isPVC = false;
        if (params.pvcBigeminy && beatIndex % 2 === 1) isPVC = true;
        else if (params.pvcFrequency > 0 && Math.random() < params.pvcFrequency) isPVC = true;

        const beatPx = currentBeatMs * pxPerMs;

        // Render one beat slice into points
        for (let relX = 0; relX < beatPx; relX += 1.5) {
          const absX = currentX + relX;
          if (absX > width) break;

          const relMs = relX / pxPerMs;
          let deltaMv = 0;

          if (isPVC) {
            const centerQRS = 150;
            const qrsSigma = (params.pvcQrsWidth || 150) / 4;
            deltaMv = this.gaussian(relMs, centerQRS, qrsSigma, -1.8) +
                      this.gaussian(relMs, centerQRS + 160, 45, 0.7);
          } else if (dropBeat || (params.mobitz1 && wenckebachCycle === 3)) {
            deltaMv = this.gaussian(relMs, 80, 20, leadInfo.pAmp);
          } else {
            deltaMv = this.calculateBeatMv(relMs, currentPR, params, leadInfo);
          }

          // Add subtle realistic baseline noise
          const noise = (Math.random() - 0.5) * 0.02;
          const y = baselineY - (deltaMv + noise) * pxPerMv;

          points.push({ x: absX, y });
        }

        currentX += beatPx;
        beatIndex++;
      }

      return points;
    }

    calculateBeatMv(ms, pr, params, leadInfo) {
      let mv = 0;

      // 1. P WAVE
      if (!params.noP) {
        if (params.flutterWaves) {
          const fPhase = (ms % 200) / 200;
          mv += (fPhase - 0.5) * 0.35;
        } else if (params.fWaves) {
          mv += Math.sin(ms * 0.08) * 0.08 + Math.cos(ms * 0.15) * 0.05;
        } else {
          const pCenter = 80;
          if (params.pNotched) {
            mv += this.gaussian(ms, pCenter - 15, 12, leadInfo.pAmp * 0.7) +
                  this.gaussian(ms, pCenter + 15, 12, leadInfo.pAmp * 0.7);
          } else {
            mv += this.gaussian(ms, pCenter, 18, leadInfo.pAmp);
          }
        }
      }

      // 2. PR Shift
      if (params.prShift) {
        if (ms >= 60 && ms <= 120) mv += params.prShift * 0.1;
      }

      // 3. QRS COMPLEX
      const qrsStart = 80 + pr;
      const qrsCenter = qrsStart + (params.qrsWidth / 2);
      const qrsWidth = params.qrsWidth;

      if (ms >= qrsStart - 10 && ms <= qrsStart + qrsWidth + 15) {
        const qrsRel = ms - qrsStart;

        if (params.vtMono) {
          mv += this.gaussian(ms, qrsCenter, qrsWidth / 3, 2.2 * leadInfo.polarity);
        } else if (params.torsade) {
          const modulatedAmp = Math.sin(ms * 0.01) * 2.5;
          mv += this.gaussian(ms, qrsCenter, qrsWidth / 3, modulatedAmp);
        } else if (params.rbbbPattern && (this.lead === 'V1' || this.lead === 'V2')) {
          mv += this.gaussian(qrsRel, 15, 8, 0.4) -
                this.gaussian(qrsRel, 30, 8, 0.3) +
                this.gaussian(qrsRel, qrsWidth - 15, 12, 1.6);
        } else if (params.lbbbPattern && (this.lead === 'V1' || this.lead === 'V2')) {
          mv -= this.gaussian(qrsRel, qrsWidth / 2, qrsWidth / 3.5, 1.8);
        } else if (params.lbbbPattern && (this.lead === 'V5' || this.lead === 'V6' || this.lead === 'DI')) {
          mv += this.gaussian(qrsRel, 25, 12, 1.4) +
                this.gaussian(qrsRel, qrsWidth - 20, 12, 1.5);
        } else if (params.deltaWave) {
          mv += this.gaussian(qrsRel, 10, 15, 0.5) +
                this.gaussian(qrsRel, qrsWidth / 2, qrsWidth / 4, leadInfo.qrsR);
        } else {
          const qCenter = qrsStart + 10;
          const rCenter = qrsStart + (qrsWidth / 2);
          const sCenter = qrsStart + qrsWidth - 10;

          if (leadInfo.qrsQ > 0.2) {
            mv -= this.gaussian(ms, qCenter, 10, leadInfo.qrsQ * 1.5);
          }
          mv += this.gaussian(ms, rCenter, qrsWidth / 4.5, leadInfo.qrsR * leadInfo.polarity);
          mv -= this.gaussian(ms, sCenter, 8, leadInfo.qrsS);
        }
      }

      // 4. ST SEGMENT & T WAVE
      const stStart = qrsStart + qrsWidth;
      const tCenter = stStart + 140;

      if (ms >= stStart && ms <= stStart + 100) {
        mv += (leadInfo.stShift * 0.1);
      }

      if (params.scoopedST && ms >= stStart && ms <= tCenter) {
        mv -= 0.15 * Math.sin(((ms - stStart) / 140) * Math.PI);
      }

      if (ms >= stStart + 30 && ms <= stStart + 260) {
        if (params.wellensPattern && (this.lead === 'V2' || this.lead === 'V3')) {
          mv += this.gaussian(ms, tCenter - 30, 20, 0.4) -
                this.gaussian(ms, tCenter + 30, 20, 0.6);
        } else if (params.flatT) {
          mv += leadInfo.tAmp * 0.1;
        } else {
          mv += this.gaussian(ms, tCenter, 35, leadInfo.tAmp);
        }
      }

      // 5. U WAVE
      if (params.uWaves && ms >= tCenter + 120 && ms <= tCenter + 260) {
        mv += this.gaussian(ms, tCenter + 180, 30, 0.35);
      }

      // 6. OSBORN WAVE
      if (params.osbornNotch && Math.abs(ms - stStart) < 15) {
        mv += 0.6;
      }

      return mv;
    }
  }

  window.ECGWaveEngine = ECGWaveEngine;
})();
