/**
 * ECG Pro Studio — Main Studio Controller
 * Coordinates 12-lead grid rendering, abnormality mixer UI, clinical scenarios, virtual calipers, 10-step systematic checklist, and lead zoom modal.
 */

(function () {
  'use strict';

  class ECGStudio {
    constructor() {
      this.selectedModifiers = new Set(['sinus_normal']);
      this.currentScenario = null;
      this.activeLeadEngines = {};
      this.rhythmEngine = null;
      this.zoomEngine = null;
      this.activeCategoryFilter = 'ALL';
      this.searchQuery = '';

      // Paper Grid Controls
      this.paperSpeed = 25; // 12.5, 25, 50 mm/s
      this.paperGain = 10;   // 5, 10, 20 mm/mV
      this.gridLayout = '4x3'; // 4x3, 2x6, 1x12

      // Caliper state
      this.caliper1Pos = 120; // px
      this.caliper2Pos = 360; // px
      this.isDraggingCaliper = null;

      this.init();
    }

    init() {
      this.renderAbnormalityMixer();
      this.renderScenarioButtons();
      this.initCanvases();
      this.bindEvents();
      this.updateStudio();
    }

    renderAbnormalityMixer() {
      const container = document.getElementById('abnormalityMixerGrid');
      if (!container) return;

      container.innerHTML = '';
      const modifiers = window.ECGModifiers.MODIFIERS;

      // Group by category
      const categories = {};
      Object.values(modifiers).forEach(mod => {
        const cat = mod.category || 'Khác';
        if (!categories[cat]) categories[cat] = [];

        // Apply Search & Category Filters
        const matchesCategory = this.activeCategoryFilter === 'ALL' || cat === this.activeCategoryFilter;
        const query = this.searchQuery.toLowerCase().trim();
        const matchesSearch = !query || mod.name.toLowerCase().includes(query) || (mod.description && mod.description.toLowerCase().includes(query));

        if (matchesCategory && matchesSearch) {
          categories[cat].push(mod);
        }
      });

      let hasResults = false;
      Object.keys(categories).forEach(catName => {
        if (categories[catName].length === 0) return;
        hasResults = true;

        const groupEl = document.createElement('div');
        groupEl.className = 'mixer-category-group';
        groupEl.innerHTML = `<h4 class="mixer-cat-title">${catName}</h4>`;

        const itemsGrid = document.createElement('div');
        itemsGrid.className = 'mixer-items-grid';

        categories[catName].forEach(mod => {
          const label = document.createElement('label');
          label.className = `mixer-checkbox-item ${this.selectedModifiers.has(mod.id) ? 'selected' : ''}`;
          const checked = this.selectedModifiers.has(mod.id) ? 'checked' : '';
          label.innerHTML = `
            <input type="checkbox" value="${mod.id}" ${checked}>
            <span>${mod.name}</span>
          `;
          label.querySelector('input').addEventListener('change', (e) => {
            if (e.target.checked) {
              this.selectedModifiers.add(mod.id);
            } else {
              this.selectedModifiers.delete(mod.id);
            }
            this.updateStudio();
            this.renderAbnormalityMixer();
          });
          itemsGrid.appendChild(label);
        });

        groupEl.appendChild(itemsGrid);
        container.appendChild(groupEl);
      });

      if (!hasResults) {
        container.innerHTML = `
          <div style="text-align:center; padding:1.5rem; color:var(--color-text-muted); font-size:0.88rem;">
            <i class="fa-solid fa-magnifying-glass" style="font-size:1.5rem; margin-bottom:0.5rem; display:block;"></i>
            Không tìm thấy bất thường phù hợp với từ khóa "${this.searchQuery}"
          </div>
        `;
      }
    }

    renderActiveChips() {
      const container = document.getElementById('activeModifiersChips');
      if (!container) return;

      container.innerHTML = '';
      if (this.selectedModifiers.size === 0) {
        container.innerHTML = `<span style="font-size:0.8rem; color:var(--color-text-muted); font-style:italic;">Chưa chọn tổn thương (Mặc định: Nhịp xoang bình thường)</span>`;
        return;
      }

      this.selectedModifiers.forEach(id => {
        const mod = window.ECGModifiers.MODIFIERS[id];
        if (!mod) return;

        const chip = document.createElement('div');
        chip.className = 'active-mod-chip';
        chip.innerHTML = `
          <span>${mod.name}</span>
          <button title="Bỏ chọn">&times;</button>
        `;
        chip.querySelector('button').addEventListener('click', () => {
          this.selectedModifiers.delete(id);
          this.updateStudio();
          this.renderAbnormalityMixer();
        });
        container.appendChild(chip);
      });
    }

    renderScenarioButtons() {
      const container = document.getElementById('scenarioListGrid');
      if (!container) return;

      container.innerHTML = '';
      const scenarios = window.ECGScenarios.SCENARIOS;

      scenarios.forEach(sc => {
        const card = document.createElement('div');
        card.className = `scenario-card ${this.currentScenario && this.currentScenario.id === sc.id ? 'active' : ''}`;
        card.setAttribute('data-id', sc.id);
        card.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
            <span class="element-badge" style="background:var(--color-primary); font-size:0.75rem;">${sc.category}</span>
            <span class="scenario-diff-badge">${sc.difficulty}</span>
          </div>
          <h4 style="font-size:0.95rem; font-weight:700; color:var(--color-text); margin-bottom:0.25rem;">${sc.title}</h4>
          <p style="font-size:0.8rem; color:var(--color-text-muted); line-height:1.4;">${sc.patient.sex}, ${sc.patient.age} tuổi | ${sc.symptoms[0]}</p>
        `;
        card.addEventListener('click', () => this.loadScenario(sc.id));
        container.appendChild(card);
      });
    }

    loadScenario(id) {
      const sc = window.ECGScenarios.getScenarioById(id);
      if (!sc) return;

      this.currentScenario = sc;
      this.selectedModifiers = new Set(sc.modifiers);

      // Update Scenario card active state
      document.querySelectorAll('#scenarioListGrid .scenario-card').forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-id') === id);
      });

      // Update Patient Context UI
      const patPanel = document.getElementById('patientContextPanel');
      if (patPanel) {
        patPanel.style.display = 'block';
        document.getElementById('patDemographics').textContent = `${sc.patient.sex}, ${sc.patient.age} tuổi, nặng ${sc.patient.weight}kg (${sc.patient.occupation})`;
        document.getElementById('patHR').textContent = `${sc.vitals.hr} bpm`;
        document.getElementById('patBP').textContent = `${sc.vitals.sbp}/${sc.vitals.dbp} mmHg`;
        document.getElementById('patSpO2').textContent = `${sc.vitals.spo2}%`;
        document.getElementById('patTemp').textContent = `${sc.vitals.temp}°C`;
        document.getElementById('patContextDesc').textContent = sc.context;

        const sympList = document.getElementById('patSymptomsList');
        if (sympList) {
          sympList.innerHTML = sc.symptoms.map(s => `<li><i class="fa-solid fa-angle-right" style="color:var(--color-primary);"></i> ${s}</li>`).join('');
        }
      }

      // Hide Quiz Box initially when loading new scenario
      const quizBox = document.getElementById('quizStudioBox');
      if (quizBox) quizBox.style.display = 'none';

      this.renderAbnormalityMixer();
      this.updateStudio();
    }

    initCanvases() {
      const leads = ['I', 'aVR', 'V1', 'V4', 'II', 'aVL', 'V2', 'V5', 'III', 'aVF', 'V3', 'V6'];
      leads.forEach(lead => {
        const canvas = document.getElementById(`canvas_${lead}`);
        if (canvas) {
          this.activeLeadEngines[lead] = new window.ECGWaveEngine(canvas, {
            lead,
            isRhythmStrip: false,
            speed: this.paperSpeed,
            gain: this.paperGain
          });

          // Click on canvas box opens Lead Zoom Modal
          const box = canvas.parentElement;
          if (box) {
            box.addEventListener('click', () => this.openLeadZoomModal(lead));
          }
        }
      });

      const rhythmCanvas = document.getElementById('canvas_rhythm');
      if (rhythmCanvas) {
        this.rhythmEngine = new window.ECGWaveEngine(rhythmCanvas, {
          lead: 'II',
          isRhythmStrip: true,
          speed: this.paperSpeed,
          gain: this.paperGain
        });
      }

      const zoomCanvas = document.getElementById('canvas_lead_zoom');
      if (zoomCanvas) {
        this.zoomEngine = new window.ECGWaveEngine(zoomCanvas, {
          lead: 'V2',
          isRhythmStrip: true,
          speed: this.paperSpeed,
          gain: this.paperGain
        });
      }
    }

    updateStudio() {
      if (this.selectedModifiers.size === 0) {
        this.selectedModifiers.add('sinus_normal');
      }

      const combined = window.ECGModifiers.combineModifiers(Array.from(this.selectedModifiers));

      // Render 12-lead grid
      Object.keys(this.activeLeadEngines).forEach(lead => {
        const engine = this.activeLeadEngines[lead];
        engine.setParams(combined);
        engine.setSpeed(this.paperSpeed);
        engine.setGain(this.paperGain);
        engine.render();
      });

      // Render rhythm strip
      if (this.rhythmEngine) {
        this.rhythmEngine.setParams(combined);
        this.rhythmEngine.setSpeed(this.paperSpeed);
        this.rhythmEngine.setGain(this.paperGain);
        this.rhythmEngine.render();
      }

      // Update parameter numeric badges
      document.getElementById('dispHR').textContent = `${combined.hr} bpm`;
      document.getElementById('dispPR').textContent = `${combined.pr} ms`;
      document.getElementById('dispQRS').textContent = `${combined.qrsWidth} ms`;
      document.getElementById('dispQT').textContent = `${combined.qt} ms`;
      document.getElementById('dispAxis').textContent = `${combined.axis}°`;

      this.renderActiveChips();
      this.updateCaliperStats(combined);
      this.updateSystematicChecklist(combined);
      this.updateDiagnosticCriteria();
    }

    bindEvents() {
      // Tab Switching for Left Sidebar Panel
      const tabBtns = document.querySelectorAll('.sidebar-tab-btn');
      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const targetTab = btn.getAttribute('data-tab');
          tabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          document.querySelectorAll('.sidebar-tab-content').forEach(content => {
            content.style.display = content.id === targetTab ? 'block' : 'none';
          });
        });
      });

      // Mixer Category Pills Filter
      const pillBtns = document.querySelectorAll('.cat-pill-btn');
      pillBtns.forEach(pill => {
        pill.addEventListener('click', () => {
          pillBtns.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          this.activeCategoryFilter = pill.getAttribute('data-cat');
          this.renderAbnormalityMixer();
        });
      });

      // Mixer Search Input Filter
      const searchInput = document.getElementById('mixerSearchInput');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          this.searchQuery = e.target.value;
          this.renderAbnormalityMixer();
        });
      }

      // Paper Speed Select
      const selectSpeed = document.getElementById('selectPaperSpeed');
      if (selectSpeed) {
        selectSpeed.addEventListener('change', (e) => {
          this.paperSpeed = parseFloat(e.target.value) || 25;
          this.updateStudio();
        });
      }

      // Paper Gain Select
      const selectGain = document.getElementById('selectPaperGain');
      if (selectGain) {
        selectGain.addEventListener('change', (e) => {
          this.paperGain = parseFloat(e.target.value) || 10;
          this.updateStudio();
        });
      }

      // Grid Layout Select (4x3, 2x6, 1x12)
      const selectLayout = document.getElementById('selectGridLayout');
      if (selectLayout) {
        selectLayout.addEventListener('change', (e) => {
          this.gridLayout = e.target.value;
          const gridEl = document.getElementById('leads12Grid');
          if (gridEl) {
            gridEl.className = `leads-12-grid layout-${this.gridLayout}`;
          }
          this.updateStudio();
        });
      }

      // Lead Zoom Modal Close Events
      document.getElementById('btnCloseZoomModal')?.addEventListener('click', () => {
        const modal = document.getElementById('leadZoomModal');
        if (modal) modal.style.display = 'none';
      });

      document.getElementById('leadZoomModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'leadZoomModal') {
          e.target.style.display = 'none';
        }
      });

      // Caliper Handle Events
      const handle1 = document.getElementById('caliperHandle1');
      const handle2 = document.getElementById('caliperHandle2');
      const grid = document.getElementById('rhythmGridContainer');

      if (handle1) {
        handle1.addEventListener('mousedown', (e) => {
          this.isDraggingCaliper = 'c1';
          e.preventDefault();
        });
      }

      if (handle2) {
        handle2.addEventListener('mousedown', (e) => {
          this.isDraggingCaliper = 'c2';
          e.preventDefault();
        });
      }

      window.addEventListener('mousemove', (e) => {
        if (!this.isDraggingCaliper || !grid) return;
        const rect = grid.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        if (offsetX < 0) offsetX = 0;
        if (offsetX > rect.width) offsetX = rect.width;

        if (this.isDraggingCaliper === 'c1') this.caliper1Pos = offsetX;
        else if (this.isDraggingCaliper === 'c2') this.caliper2Pos = offsetX;

        this.updateCaliperUI();
        const combined = window.ECGModifiers.combineModifiers(Array.from(this.selectedModifiers));
        this.updateCaliperStats(combined);
      });

      window.addEventListener('mouseup', () => {
        this.isDraggingCaliper = null;
      });

      // Window resize re-render
      window.addEventListener('resize', () => {
        this.updateStudio();
      });

      // Reset All button
      document.getElementById('btnResetStudio')?.addEventListener('click', () => {
        this.selectedModifiers = new Set(['sinus_normal']);
        this.currentScenario = null;
        this.paperSpeed = 25;
        this.paperGain = 10;
        this.gridLayout = '4x3';
        if (selectSpeed) selectSpeed.value = '25';
        if (selectGain) selectGain.value = '10';
        if (selectLayout) selectLayout.value = '4x3';
        const gridEl = document.getElementById('leads12Grid');
        if (gridEl) gridEl.className = 'leads-12-grid layout-4x3';

        document.querySelectorAll('#scenarioListGrid .scenario-card').forEach(c => c.classList.remove('active'));
        document.getElementById('patientContextPanel').style.display = 'none';
        document.getElementById('quizStudioBox').style.display = 'none';
        this.activeCategoryFilter = 'ALL';
        this.searchQuery = '';
        if (searchInput) searchInput.value = '';
        document.querySelectorAll('.cat-pill-btn').forEach(p => p.classList.toggle('active', p.getAttribute('data-cat') === 'ALL'));
        this.renderAbnormalityMixer();
        this.updateStudio();
      });

      // Start Quiz button
      document.getElementById('btnStartStudioQuiz')?.addEventListener('click', () => this.startQuizMode());
    }

    openLeadZoomModal(lead) {
      const modal = document.getElementById('leadZoomModal');
      if (!modal) return;

      modal.style.display = 'flex';
      document.getElementById('zoomLeadTitle').textContent = `Chi Tiết Chuyển Đạo Phóng Đại: ${lead}`;

      const combined = window.ECGModifiers.combineModifiers(Array.from(this.selectedModifiers));
      if (this.zoomEngine) {
        this.zoomEngine.setLead(lead);
        this.zoomEngine.setParams(combined);
        this.zoomEngine.setSpeed(this.paperSpeed);
        this.zoomEngine.setGain(this.paperGain);
        this.zoomEngine.render();
      }
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
      if (handle1) handle1.setAttribute('cx', this.caliper1Pos);

      if (line2) {
        line2.setAttribute('x1', this.caliper2Pos);
        line2.setAttribute('x2', this.caliper2Pos);
      }
      if (handle2) handle2.setAttribute('cx', this.caliper2Pos);
    }

    updateCaliperStats(combined) {
      const pxDiff = Math.abs(this.caliper2Pos - this.caliper1Pos);
      const mmDiff = (pxDiff * 0.2).toFixed(1);
      // ms depends on speed scaling! at 25mm/s 1px = 4ms. at 50mm/s 1px = 2ms.
      const msPerPx = 4 * (25 / this.paperSpeed);
      const msDiff = Math.round(pxDiff * msPerPx);
      const secDiff = (msDiff / 1000).toFixed(2);

      let calcHR = '--';
      let calcQTc = '--';

      if (msDiff > 80) {
        const hrVal = Math.round(60000 / msDiff);
        calcHR = `${hrVal} bpm`;

        const qtcVal = Math.round(combined.qt / Math.sqrt(parseFloat(secDiff) || 0.8));
        if (!isNaN(qtcVal) && isFinite(qtcVal)) {
          calcQTc = `${qtcVal} ms`;
        }
      }

      document.getElementById('caliperIntervalDisp').textContent = `${msDiff} ms (${secDiff}s)`;
      document.getElementById('caliperMMDisp').textContent = `${mmDiff} mm`;
      document.getElementById('caliperHRDisp').textContent = calcHR;
      document.getElementById('caliperQTcDisp').textContent = calcQTc;
    }

    updateSystematicChecklist(combined) {
      const checklistContainer = document.getElementById('systematicChecklist');
      if (!checklistContainer) return;

      const items = [
        {
          num: 1,
          title: 'Tần Số Tim (Rate)',
          val: `${combined.hr} bpm`,
          status: combined.hr >= 60 && combined.hr <= 100 ? 'normal' : (combined.hr > 100 ? 'tachy' : 'brady'),
          note: combined.hr > 100 ? 'Nhịp nhanh (>100 bpm)' : (combined.hr < 60 ? 'Nhịp chậm (<60 bpm)' : 'Trong giới hạn chuẩn (60-100 bpm)')
        },
        {
          num: 2,
          title: 'Nhịp Tim (Rhythm)',
          val: combined.noP ? 'Mất nhịp xoang' : (combined.irregularRR ? 'Loạn nhịp hoàn toàn' : 'Nhịp xoang đều'),
          status: combined.noP || combined.irregularRR ? 'abnormal' : 'normal',
          note: combined.fWaves ? 'Rung nhĩ (Mất P, sóng f)' : (combined.flutterWaves ? 'Cuồng nhĩ (Sóng F răng cưa)' : 'Đều đặn có P đi trước')
        },
        {
          num: 3,
          title: 'Trục Điện Tim (Axis)',
          val: `${combined.axis}°`,
          status: combined.axis >= -30 && combined.axis <= 90 ? 'normal' : 'abnormal',
          note: combined.axis < -30 ? 'Lệch Trái (<-30°)' : (combined.axis > 90 ? 'Lệch Phải (>+90°)' : 'Trục trung gian chuẩn (-30° đến +90°)')
        },
        {
          num: 4,
          title: 'Sóng P (P Wave)',
          val: combined.noP ? 'Không thấy' : (combined.pNotched ? 'P hai lá' : 'Bình thường'),
          status: combined.noP || combined.pNotched ? 'abnormal' : 'normal',
          note: combined.pNotched ? 'Lớn nhĩ trái' : (combined.amplifiers.P_DII ? 'P phế (Lớn nhĩ phải)' : 'Đồng dạng, dương ở DII')
        },
        {
          num: 5,
          title: 'Khoảng PR/PQ',
          val: `${combined.pr} ms`,
          status: combined.pr >= 120 && combined.pr <= 200 ? 'normal' : 'abnormal',
          note: combined.pr > 200 ? 'PR kéo dài (Block AV độ I)' : (combined.pr < 120 ? 'PR ngắn (Hội chứng WPW)' : 'Chuẩn (120-200ms)')
        },
        {
          num: 6,
          title: 'Phức Bộ QRS',
          val: `${combined.qrsWidth} ms`,
          status: combined.qrsWidth <= 110 ? 'normal' : 'abnormal',
          note: combined.qrsWidth > 120 ? 'QRS giãn rộng >0.12s (Block nhánh / Nhịp thất)' : 'QRS mảnh (<0.11s)'
        },
        {
          num: 7,
          title: 'Đoạn ST & Sóng T',
          val: Object.keys(combined.leadStElevations).length > 0 ? 'ST chênh lên' : (Object.keys(combined.leadStDepressions).length > 0 ? 'ST chênh xuống' : 'Đẳng điện'),
          status: Object.keys(combined.leadStElevations).length > 0 || Object.keys(combined.leadStDepressions).length > 0 ? 'critical' : 'normal',
          note: Object.keys(combined.leadStElevations).length > 0 ? `Chênh lên ở: ${Object.keys(combined.leadStElevations).join(', ')}` : 'Đoạn ST nằm trên đường đẳng điện'
        },
        {
          num: 8,
          title: 'Khoảng QT & QTc',
          val: `${combined.qt} ms`,
          status: combined.qt <= 440 ? 'normal' : 'warning',
          note: combined.qt > 460 ? 'QTc kéo dài (Nguy cơ xoắn đỉnh)' : (combined.qt < 340 ? 'QTc ngắn' : 'Bình thường (<440ms)')
        },
        {
          num: 9,
          title: 'Sóng U & Sóng Dị Dạng',
          val: combined.uWaves ? 'Sóng U dương cao' : (combined.osbornNotch ? 'Sóng Osborn' : 'Không có'),
          status: combined.uWaves || combined.osbornNotch ? 'warning' : 'normal',
          note: combined.uWaves ? 'Hạ Kali máu nghi ngờ' : (combined.osbornNotch ? 'Hạ thân nhiệt' : 'Bình thường')
        },
        {
          num: 10,
          title: 'Tổng Hợp Chẩn Đoán',
          val: Array.from(this.selectedModifiers).map(id => window.ECGModifiers.MODIFIERS[id]?.name).join(' + '),
          status: 'info',
          note: 'Phối hợp các tổn thương trên ECG 12 chuyển đạo'
        }
      ];

      checklistContainer.innerHTML = items.map(item => `
        <div class="chk-item status-${item.status}">
          <div class="chk-header">
            <span class="chk-num">${item.num}. ${item.title}</span>
            <span class="chk-val">${item.val}</span>
          </div>
          <p class="chk-note">${item.note}</p>
        </div>
      `).join('');
    }

    updateDiagnosticCriteria() {
      const box = document.getElementById('diagnosticCriteriaBox');
      if (!box) return;

      if (this.selectedModifiers.size === 0) {
        box.innerHTML = '<p style="color: var(--color-text-muted); font-style: italic; font-size: 0.85rem;">Chọn một bất thường để xem tiêu chuẩn chẩn đoán.</p>';
        return;
      }

      let html = '';
      this.selectedModifiers.forEach(id => {
        const mod = window.ECGModifiers.MODIFIERS[id];
        const criteriaList = window.ECGCriteria && window.ECGCriteria[id] ? window.ECGCriteria[id] : [];
        
        if (mod && criteriaList.length > 0) {
          html += `
            <div style="margin-bottom: 1rem; border-bottom: 1px dashed var(--color-border); padding-bottom: 0.75rem;">
              <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--color-primary); margin-bottom: 0.5rem;"><i class="fa-solid fa-stethoscope"></i> ${mod.name}</h4>
              <ul style="padding-left: 1.25rem; margin: 0; font-size: 0.85rem; color: var(--color-text); line-height: 1.5;">
                ${criteriaList.map(item => `<li style="margin-bottom: 0.3rem;">${item}</li>`).join('')}
              </ul>
            </div>
          `;
        }
      });

      if (html === '') {
        box.innerHTML = '<p style="color: var(--color-text-muted); font-style: italic; font-size: 0.85rem;">Không có dữ liệu tiêu chuẩn chẩn đoán chi tiết cho các mục đã chọn.</p>';
      } else {
        box.innerHTML = html;
      }
    }

    startQuizMode() {
      const quizBox = document.getElementById('quizStudioBox');
      if (!quizBox) return;

      quizBox.style.display = 'block';
      quizBox.scrollIntoView({ behavior: 'smooth' });

      let targetName = '';
      let targetDesc = '';
      let options = [];

      if (this.currentScenario) {
        targetName = this.currentScenario.goldAnswer;
        targetDesc = this.currentScenario.teachingPoints.join('\n');
        options.push(targetName);
        options.push('Nhồi máu cơ tim thành Dưới cũ + Rung nhĩ');
        options.push('Viêm màng ngoài tim cấp / Tái cực sớm lành tính');
        options.push('Cơn Nhịp Nhanh Trên Thất (SVT) / Block Nhánh Phải');
      } else {
        const currentModId = Array.from(this.selectedModifiers)[0];
        const targetMod = window.ECGModifiers.MODIFIERS[currentModId] || window.ECGModifiers.MODIFIERS.stemi_anterior;
        targetName = targetMod.name;
        targetDesc = targetMod.description;

        options.push(targetName);
        const allMods = Object.values(window.ECGModifiers.MODIFIERS);
        while (options.length < 4) {
          const rand = allMods[Math.floor(Math.random() * allMods.length)].name;
          if (!options.includes(rand)) options.push(rand);
        }
      }

      options.sort(() => Math.random() - 0.5);

      const optionsContainer = document.getElementById('quizStudioOptions');
      if (!optionsContainer) return;

      optionsContainer.innerHTML = '';
      options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.textContent = opt;
        btn.addEventListener('click', () => {
          if (opt === targetName) {
            btn.classList.add('correct');
            alert(`🎉 CHÍNH XÁC!\n\nChẩn đoán đúng: ${targetName}\n\n💡 ĐIỂM GIẢNG DẠY LÂM SÀNG:\n${targetDesc}`);
          } else {
            btn.classList.add('wrong');
            alert(`❌ CHƯA CHÍNH XÁC!\n\nĐáp án đúng là: ${targetName}\n\n💡 ĐIỂM GIẢNG DẠY:\n${targetDesc}`);
          }
        });
        optionsContainer.appendChild(btn);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    window.ecgStudio = new ECGStudio();
  });
})();
