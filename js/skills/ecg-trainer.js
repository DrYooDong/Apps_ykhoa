/**
 * ECG Interactive Trainer Engine — CliniPortal
 * Interactive millimeter grid ECG generator, SVG wave renderer, virtual calipers, Bazett QTc calculator, and diagnostic quiz.
 */

(function () {
  'use strict';

  const RHYTHM_BANK = [
    {
      id: 'sinus_normal',
      name: 'Nhịp Xoang Bình Thường',
      category: 'Bình thường',
      hr: '60 - 100 bpm',
      pr: '0.16s (160ms)',
      qrs: '0.08s (80ms)',
      qt: '0.38s (380ms)',
      path: 'M 0,90 L 30,90 L 35,85 L 40,90 L 80,90 L 85,130 L 92,20 L 100,100 L 110,90 L 140,90 L 155,75 L 170,90 L 220,90 L 225,85 L 230,90 L 270,90 L 275,130 L 282,20 L 290,100 L 300,90 L 330,90 L 345,75 L 360,90 L 410,90 L 415,85 L 420,90 L 460,90 L 465,130 L 472,20 L 480,100 L 490,90 L 520,90 L 535,75 L 550,90 L 600,90',
      description: 'Nhịp xoang đều, tần số 60-100 l/phút. Mỗi sóng P đi trước một phức bộ QRS mảnh. Khoảng PR và QT trong giới hạn bình thường.'
    },
    {
      id: 'sinus_brady',
      name: 'Nhịp Chậm Xoang',
      category: 'Rối loạn nhịp',
      hr: '< 60 bpm',
      pr: '0.18s (180ms)',
      qrs: '0.08s (80ms)',
      qt: '0.42s (420ms)',
      path: 'M 0,90 L 50,90 L 55,85 L 60,90 L 130,90 L 135,130 L 142,20 L 150,100 L 160,90 L 210,90 L 225,75 L 240,90 L 340,90 L 345,85 L 350,90 L 420,90 L 425,130 L 432,20 L 440,100 L 450,90 L 500,90 L 515,75 L 530,90 L 600,90',
      description: 'Nhịp xoang đều nhưng tần số < 60 l/phút. Thường gặp ở vận động viên hoặc do dùng thuốc ức chế Beta, suy giáp.'
    },
    {
      id: 'sinus_tachy',
      name: 'Nhịp Nhanh Xoang',
      category: 'Rối loạn nhịp',
      hr: '> 100 bpm',
      pr: '0.14s (140ms)',
      qrs: '0.08s (80ms)',
      qt: '0.32s (320ms)',
      path: 'M 0,90 L 15,85 L 20,90 L 40,90 L 45,130 L 52,20 L 60,100 L 68,90 L 80,75 L 95,90 L 125,85 L 130,90 L 150,90 L 155,130 L 162,20 L 170,100 L 178,90 L 190,75 L 205,90 L 235,85 L 240,90 L 260,90 L 265,130 L 272,20 L 280,100 L 288,90 L 300,75 L 315,90 L 345,85 L 350,90 L 370,90 L 375,130 L 382,20 L 390,100 L 398,90 L 410,75 L 425,90 L 455,85 L 460,90 L 480,90 L 485,130 L 492,20 L 500,100 Q 510,90 600,90',
      description: 'Nhịp xoang đều với tần số > 100 l/phút. Thường do sốt, gắng sức, xúc động, thiếu máu, cường giáp hoặc sốc.'
    },
    {
      id: 'atrial_fib',
      name: 'Rung Nhĩ (Atrial Fibrillation - AF)',
      category: 'Rối loạn nhịp',
      hr: '110 - 160 bpm (Không đều)',
      pr: 'Không thấy',
      qrs: '0.08s (Mảnh)',
      qt: 'Thay đổi',
      path: 'M 0,90 Q 10,88 20,92 T 40,88 T 60,92 L 65,130 L 72,20 L 80,100 L 88,90 Q 100,92 120,88 T 150,92 T 180,88 L 185,130 L 192,20 L 200,100 L 208,90 Q 220,88 240,92 T 260,88 L 265,130 L 272,20 L 280,100 L 288,90 Q 310,92 340,88 T 390,92 L 395,130 L 402,20 L 410,100 Q 430,92 480,88 L 485,130 L 492,20 L 500,100 L 600,90',
      description: 'Mất hoàn toàn sóng P, thay bằng các lăn tăn sóng f. Khoảng cách RR hoàn toàn không đều (Hoàn toàn loạn nhịp).'
    },
    {
      id: 'atrial_flutter',
      name: 'Cuồng Nhĩ (Atrial Flutter)',
      category: 'Rối loạn nhịp',
      hr: '150 bpm (Dẫn truyền 2:1)',
      pr: 'Không có',
      qrs: '0.08s',
      qt: '0.36s',
      path: 'M 0,90 L 15,105 L 30,90 L 45,105 L 60,90 L 65,130 L 72,20 L 80,100 L 95,105 L 110,90 L 125,105 L 140,90 L 145,130 L 152,20 L 160,100 L 175,105 L 190,90 L 205,105 L 220,90 L 225,130 L 232,20 L 240,100 L 255,105 L 270,90 L 285,105 L 300,90 L 305,130 L 312,20 L 320,100 L 600,90',
      description: 'Sóng F dạng răng cưa tần số nhĩ 250-350 l/phút. Thường dẫn truyền Nút AV dạng 2:1 (Tần số thất ~ 150 l/phút).'
    },
    {
      id: 'ventricular_tachy',
      name: 'Nhịp Nhanh Thất (Ventricular Tachycardia - VT)',
      category: 'Cấp cứu',
      hr: '160 - 220 bpm',
      pr: 'Không có',
      qrs: '> 0.14s (Rộng)',
      qt: 'Không đo được',
      path: 'M 0,90 Q 20,20 40,160 Q 60,20 80,160 Q 100,20 120,160 Q 140,20 160,160 Q 180,20 200,160 Q 220,20 240,160 Q 260,20 280,160 Q 300,20 320,160 Q 340,20 360,160 Q 380,20 400,160 Q 420,20 440,160 Q 460,20 480,160 L 600,90',
      description: 'CẤP CỨU! Phức bộ QRS giãn rộng đồng dạng (> 0.12s), tần số rất nhanh (> 100-200 l/phút). Nguy cơ chuyển thành Rung thất.'
    },
    {
      id: 'ventricular_fib',
      name: 'Rung Thất (Ventricular Fibrillation - VF)',
      category: 'Cấp cứu tối khẩn',
      hr: 'Không đếm được',
      pr: 'Không có',
      qrs: 'Mất hoàn toàn',
      qt: 'Không có',
      path: 'M 0,90 Q 15,40 30,140 Q 45,70 60,110 Q 75,20 90,170 Q 110,60 130,130 Q 150,30 170,150 Q 190,80 210,120 Q 230,10 250,180 Q 270,50 290,140 Q 310,20 330,160 Q 350,70 370,130 Q 390,40 410,150 L 600,90',
      description: 'CẤP CỨU TỐI KHẨN! Mất hoàn toàn các sóng P-QRS-T, thay bằng các lượn sóng lăn tăn hỗn loạn. Bệnh nhân ngừng tuần hoàn -> SỐC ĐIỆN NGAY!'
    },
    {
      id: 'stemi_anteroseptal',
      name: 'STEMI Trước Vách (ST Chênh Lên)',
      category: 'Bệnh mạch vành',
      hr: '75 bpm',
      pr: '0.16s',
      qrs: '0.09s',
      qt: '0.40s',
      path: 'M 0,90 L 30,90 L 35,85 L 40,90 L 80,90 L 85,130 L 92,20 L 100,50 L 150,50 L 165,75 L 180,90 L 230,90 L 235,85 L 240,90 L 280,90 L 285,130 L 292,20 L 300,50 L 350,50 L 365,75 L 380,90 L 430,90 L 435,85 L 440,90 L 480,90 L 485,130 L 492,20 L 500,50 L 550,50 L 600,90',
      description: 'Đoạn ST chênh lên vòm cao dạng vòm thương (> 2mm) nối liền sóng T dương nhọn ở các chuyển đạo trước ngực V1-V4.'
    }
  ];

  class ECGTrainer {
    constructor() {
      this.currentRhythm = RHYTHM_BANK[0];
      this.caliper1Pos = 100; // px
      this.caliper2Pos = 300; // px
      this.isDragging = null;

      this.init();
    }

    init() {
      this.renderRhythmButtons();
      this.loadRhythm(this.currentRhythm.id);
      this.bindEvents();
      this.updateCaliperStats();
    }

    renderRhythmButtons() {
      const container = document.getElementById('rhythmGrid');
      if (!container) return;

      container.innerHTML = '';
      RHYTHM_BANK.forEach(item => {
        const btn = document.createElement('button');
        btn.className = `btn-rhythm ${item.id === this.currentRhythm.id ? 'active' : ''}`;
        btn.setAttribute('data-id', item.id);
        btn.innerHTML = `
          <span>${item.name}</span>
          <span class="element-badge" style="font-size:0.7rem;">${item.category}</span>
        `;
        btn.addEventListener('click', () => this.loadRhythm(item.id));
        container.appendChild(btn);
      });
    }

    loadRhythm(id) {
      const rhythm = RHYTHM_BANK.find(r => r.id === id);
      if (!rhythm) return;

      this.currentRhythm = rhythm;

      // Update active button state
      document.querySelectorAll('#rhythmGrid .btn-rhythm').forEach(btn => {
        if (btn.getAttribute('data-id') === id) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      // Update SVG Path
      const svgPath = document.getElementById('ecgWavePath');
      if (svgPath) {
        svgPath.setAttribute('d', rhythm.path);
      }

      // Update Info Panel
      const titleEl = document.getElementById('rhythmTitle');
      const descEl = document.getElementById('rhythmDesc');
      const hrEl = document.getElementById('stdHR');
      const prEl = document.getElementById('stdPR');
      const qrsEl = document.getElementById('stdQRS');
      const qtEl = document.getElementById('stdQT');

      if (titleEl) titleEl.textContent = rhythm.name;
      if (descEl) descEl.textContent = rhythm.description;
      if (hrEl) hrEl.textContent = rhythm.hr;
      if (prEl) prEl.textContent = rhythm.pr;
      if (qrsEl) qrsEl.textContent = rhythm.qrs;
      if (qtEl) qtEl.textContent = rhythm.qt;
    }

    bindEvents() {
      const handle1 = document.getElementById('caliperHandle1');
      const handle2 = document.getElementById('caliperHandle2');
      const grid = document.getElementById('ecgPaperGrid');

      if (handle1) {
        handle1.addEventListener('mousedown', (e) => {
          this.isDragging = 'c1';
          e.preventDefault();
        });
      }

      if (handle2) {
        handle2.addEventListener('mousedown', (e) => {
          this.isDragging = 'c2';
          e.preventDefault();
        });
      }

      window.addEventListener('mousemove', (e) => {
        if (!this.isDragging || !grid) return;
        const rect = grid.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        if (offsetX < 0) offsetX = 0;
        if (offsetX > rect.width) offsetX = rect.width;

        if (this.isDragging === 'c1') {
          this.caliper1Pos = offsetX;
        } else if (this.isDragging === 'c2') {
          this.caliper2Pos = offsetX;
        }

        this.updateCaliperUI();
        this.updateCaliperStats();
      });

      window.addEventListener('mouseup', () => {
        this.isDragging = null;
      });

      // Quiz mode triggers
      document.getElementById('btnStartQuiz')?.addEventListener('click', () => this.startRandomQuiz());
    }

    updateCaliperUI() {
      const line1 = document.getElementById('caliperLine1');
      const handle1 = document.getElementById('caliperHandle1');
      const line2 = document.getElementById('caliperLine2');
      const handle2 = document.getElementById('caliperHandle2');

      if (line1) {
        line1.setAttribute('x1', this.caliper1Pos);
        line1.setAttribute('x2', this.caliper1Pos);
      }
      if (handle1) {
        handle1.setAttribute('cx', this.caliper1Pos);
      }
      if (line2) {
        line2.setAttribute('x1', this.caliper2Pos);
        line2.setAttribute('x2', this.caliper2Pos);
      }
      if (handle2) {
        handle2.setAttribute('cx', this.caliper2Pos);
      }
    }

    updateCaliperStats() {
      // 25mm/s speed -> 1mm = 0.04s = 40ms.
      // In SVG width (600px ~ 120mm), 1px = 0.2mm = 0.008s = 8ms.
      const pxDiff = Math.abs(this.caliper2Pos - this.caliper1Pos);
      const mmDiff = (pxDiff * 0.2).toFixed(1);
      const msDiff = Math.round(pxDiff * 8); // ms
      const secDiff = (msDiff / 1000).toFixed(2);

      let calcHR = '--';
      let calcQTc = '--';

      if (msDiff > 100) {
        const hrVal = Math.round(60000 / msDiff);
        calcHR = `${hrVal} bpm`;

        // Bazett QTc calculation: QTc = QT / sqrt(RR in seconds)
        // Assume msDiff is RR interval or QT interval
        const qtcVal = Math.round(380 / Math.sqrt(parseFloat(secDiff)));
        if (!isNaN(qtcVal) && isFinite(qtcVal)) {
          calcQTc = `${qtcVal} ms`;
        }
      }

      const intervalEl = document.getElementById('caliperInterval');
      const mmEl = document.getElementById('caliperMM');
      const hrEl = document.getElementById('caliperHR');
      const qtcEl = document.getElementById('caliperQTc');

      if (intervalEl) intervalEl.textContent = `${msDiff} ms (${secDiff}s)`;
      if (mmEl) mmEl.textContent = `${mmDiff} mm`;
      if (hrEl) hrEl.textContent = calcHR;
      if (qtcEl) qtcEl.textContent = calcQTc;
    }

    startRandomQuiz() {
      const randomIndex = Math.floor(Math.random() * RHYTHM_BANK.length);
      const quizTarget = RHYTHM_BANK[randomIndex];

      this.loadRhythm(quizTarget.id);

      const quizBox = document.getElementById('quizBox');
      if (!quizBox) return;

      quizBox.style.display = 'block';

      // Pick 4 random options including target
      const options = [quizTarget];
      while (options.length < 4) {
        const item = RHYTHM_BANK[Math.floor(Math.random() * RHYTHM_BANK.length)];
        if (!options.find(o => o.id === item.id)) {
          options.push(item);
        }
      }
      options.sort(() => Math.random() - 0.5);

      const optionsContainer = document.getElementById('quizOptions');
      optionsContainer.innerHTML = '';

      options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.textContent = opt.name;
        btn.addEventListener('click', () => {
          if (opt.id === quizTarget.id) {
            btn.classList.add('correct');
            alert(`🎉 CHÍNH XÁC!\n\nChẩn đoán đúng: ${quizTarget.name}\n${quizTarget.description}`);
          } else {
            btn.classList.add('wrong');
            alert(`❌ CHƯA CHÍNH XÁC!\n\nĐáp án đúng là: ${quizTarget.name}`);
          }
        });
        optionsContainer.appendChild(btn);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    window.ecgTrainer = new ECGTrainer();
  });
})();
