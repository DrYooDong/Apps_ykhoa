/**
 * guideline-modals.js
 * Quản lý Modals Thêm/Sửa Bệnh Án, Import/Export & Kho Bệnh ICD-10 Engine
 * Pure HTML5 / Vanilla CSS3 / ES6+ JavaScript
 */

(function () {
  'use strict';

  // ════════════════════════════════════════════════════════════════
  // 1. ADD / EDIT STUDY MODAL HANDLERS
  // ════════════════════════════════════════════════════════════════

  let editingStudyId = null;

  function getValueFromIds(...ids) {
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.value !== undefined && el.value !== null) {
        const val = el.value.trim();
        if (val) return val;
      }
    }
    return '';
  }

  function setValueToIds(val, ...ids) {
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    }
  }

  function getCheckboxFromIds(...ids) {
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.type === 'checkbox') {
        return el.checked;
      }
    }
    return false;
  }

  function setCheckboxToIds(val, ...ids) {
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el && el.type === 'checkbox') el.checked = !!val;
    }
  }

  function openAddModal() {
    editingStudyId = null;
    const form = document.getElementById('add-form') || document.getElementById('study-form');
    if (form) form.reset();
    
    const titleEl = document.getElementById('modal-form-title') || document.getElementById('study-modal-title');
    if (titleEl) titleEl.textContent = '➕ Thêm Hướng Dẫn / Nghiên Cứu Lâm Sàng Mới';

    const modal = document.getElementById('add-modal') || document.getElementById('study-modal');
    if (modal) modal.classList.add('active');
  }

  function closeAddModal() {
    const modal = document.getElementById('add-modal') || document.getElementById('study-modal');
    if (modal) modal.classList.remove('active');
    editingStudyId = null;
  }
  const closeStudyModal = closeAddModal;

  // ── JOURNAL AUTOCOMPLETE & LOOKUP ──────────────────────────────
  function handleJournalInput(val) {
    const list = document.getElementById('journal-suggestions-list');
    if (!list || !window.JOURNAL_METRICS_DATABASE) return;
    const q = val.trim().toLowerCase();
    if (q.length < 1) { list.style.display = 'none'; list.innerHTML = ''; return; }

    const matches = Object.keys(window.JOURNAL_METRICS_DATABASE)
      .filter(k => k.toLowerCase().includes(q) || window.JOURNAL_METRICS_DATABASE[k].name.toLowerCase().includes(q))
      .slice(0, 7);

    if (matches.length === 0) { list.style.display = 'none'; list.innerHTML = ''; return; }

    list.innerHTML = matches.map(k => {
      const m = window.JOURNAL_METRICS_DATABASE[k];
      const qColor = m.quartile === 'Q1' ? '#16a34a' : m.quartile === 'Q2' ? '#2563eb' : '#ea580c';
      return `<div class="journal-suggestion-item" onmousedown="selectJournalSuggestion('${k}')">
        <span class="sug-name">${m.name}</span>
        <span class="sug-badges">
          <span style="color:${qColor}; font-weight:800;">${m.quartile}</span>
          <span>IF ${m.if}</span>
        </span>
      </div>`;
    }).join('');
    list.style.display = 'block';
  }

  function selectJournalSuggestion(key) {
    const m = window.JOURNAL_METRICS_DATABASE && window.JOURNAL_METRICS_DATABASE[key];
    if (!m) return;
    const orgInput = document.getElementById('study-organization');
    if (orgInput) orgInput.value = m.journal || key;
    hideJournalSuggestions();
    _fillJournalMetricsFromObj(m);
    showJournalResultCard(m);
  }

  function hideJournalSuggestions() {
    const list = document.getElementById('journal-suggestions-list');
    if (list) { list.style.display = 'none'; list.innerHTML = ''; }
  }

  function autoLookupJournalMetrics() {
    const journalInput = getValueFromIds('study-organization', 'form-organization');
    const btn = document.getElementById('journal-lookup-btn');
    const statusEl = document.getElementById('journal-lookup-status');

    if (!journalInput) {
      if (statusEl) { statusEl.textContent = '⚠️ Nhập tên tạp chí trước'; statusEl.className = 'journal-lookup-status status-warn'; statusEl.style.display = 'inline-flex'; }
      if (btn) btn.classList.add('shake');
      setTimeout(() => { if (btn) btn.classList.remove('shake'); if (statusEl) statusEl.style.display = 'none'; }, 2000);
      return;
    }

    // Loading state
    if (btn) { btn.querySelector('.lookup-label').textContent = 'Đang tra cứu...'; btn.disabled = true; }

    setTimeout(() => {
      if (window.getJournalMetrics) {
        const metrics = window.getJournalMetrics(journalInput);
        if (metrics) {
          _fillJournalMetricsFromObj(metrics);
          showJournalResultCard(metrics);
          if (statusEl) { statusEl.textContent = '✅ Đã điền tự động'; statusEl.className = 'journal-lookup-status status-ok'; statusEl.style.display = 'inline-flex'; }
        } else {
          hideJournalResultCard();
          if (statusEl) { statusEl.textContent = '⚠️ Không tìm thấy trong CSDL — vui lòng điền thủ công'; statusEl.className = 'journal-lookup-status status-warn'; statusEl.style.display = 'inline-flex'; }
        }
      }
      if (btn) { btn.querySelector('.lookup-label').textContent = 'Tra cứu tự động'; btn.disabled = false; }
      setTimeout(() => { if (statusEl) statusEl.style.display = 'none'; }, 4000);
    }, 350); // brief delay for UX feel
  }

  function _fillJournalMetricsFromObj(metrics) {
    setValueToIds(metrics.if || '', 'study-impact-factor');
    setValueToIds(metrics.quartile || 'Q1', 'study-quartile');
    setValueToIds(metrics.sjr || '', 'study-sjr');
    setValueToIds(metrics.snip || '', 'study-snip');
    setValueToIds(metrics.hIndex || '', 'study-hindex');
  }

  function showJournalResultCard(m) {
    const card = document.getElementById('journal-result-card');
    if (!card) return;
    const qClass = m.quartile === 'Q1' ? 'tag-q1' : m.quartile === 'Q2' ? 'tag-q2' : m.quartile === 'Q3' ? 'tag-q3' : 'tag-q4';
    card.innerHTML = `
      <div class="jrc-header">
        <div class="jrc-name">${m.name || m.journal || '—'}</div>
        <div class="jrc-category">${m.category || ''}</div>
      </div>
      <div class="jrc-metrics">
        <div class="jrc-metric">
          <div class="jrc-metric-val">${m.if ?? '—'}</div>
          <div class="jrc-metric-key">Impact Factor</div>
        </div>
        <div class="jrc-metric">
          <div class="jrc-metric-val"><span class="journal-metrics-tag ${qClass}" style="font-size:0.9rem;">${m.quartile ?? '—'}</span></div>
          <div class="jrc-metric-key">Quartile</div>
        </div>
        <div class="jrc-metric">
          <div class="jrc-metric-val">${m.sjr ?? '—'}</div>
          <div class="jrc-metric-key">SJR</div>
        </div>
        <div class="jrc-metric">
          <div class="jrc-metric-val">${m.snip ?? '—'}</div>
          <div class="jrc-metric-key">SNIP</div>
        </div>
        <div class="jrc-metric">
          <div class="jrc-metric-val">${m.hIndex ? m.hIndex.toLocaleString() : '—'}</div>
          <div class="jrc-metric-key">H-Index</div>
        </div>
      </div>
    `;
    card.style.display = 'block';
    card.classList.remove('jrc-animate');
    void card.offsetWidth; // reflow
    card.classList.add('jrc-animate');
  }

  function hideJournalResultCard() {
    const card = document.getElementById('journal-result-card');
    if (card) card.style.display = 'none';
  }



  function openEditModal(id) {
    const study = (window.studies || []).find(s => s.id === id);
    if (!study) return;

    editingStudyId = id;
    const titleEl = document.getElementById('modal-form-title') || document.getElementById('study-modal-title');
    if (titleEl) titleEl.textContent = '✏️ Chỉnh Sửa Hướng Dẫn / Nghiên Cứu Lâm Sàng';

    setValueToIds(study.id, 'study-id', 'form-id');
    setValueToIds(study.title, 'study-title', 'form-title');
    setValueToIds(study.author, 'study-author', 'form-author');
    setValueToIds(study.drug, 'study-drug', 'form-drug');
    setValueToIds(study.sourceType, 'study-source-type', 'form-sourceType');
    setValueToIds(study.specialty, 'study-specialty', 'form-specialty');
    setValueToIds(study.design, 'study-design', 'form-design');
    setValueToIds(study.intervention, 'study-intervention', 'form-intervention');
    setValueToIds(study.primaryEndpoint, 'study-primary-endpoint', 'form-primaryEndpoint');
    setValueToIds(study.keyResults, 'study-key-results', 'form-keyResults');
    setValueToIds(study.impact, 'study-impact', 'form-impact');
    setValueToIds(study.year, 'study-year', 'form-year');
    setValueToIds(study.journal || study.organization, 'study-organization', 'form-organization');
    setValueToIds(study.impactFactor || study.if || '', 'study-impact-factor');
    setValueToIds(study.quartile || 'Q1', 'study-quartile');
    setValueToIds(study.sjr || '', 'study-sjr');
    setValueToIds(study.snip || '', 'study-snip');
    setValueToIds(study.hIndex || '', 'study-hindex');
    setValueToIds(study.sampleSize, 'study-sample-size', 'form-sampleSize');
    setValueToIds(study.population, 'study-population', 'form-population');
    setValueToIds(study.summary, 'study-summary', 'form-summary');
    setValueToIds(study.detailedConclusion, 'study-detailed-conclusion', 'form-detailedConclusion');
    setValueToIds(study.file, 'study-file', 'form-file');
    setValueToIds(Array.isArray(study.icd10) ? study.icd10.join(', ') : (study.icd10 || ''), 'study-icd10');
    setCheckboxToIds(study.asianData, 'study-asian-data', 'form-asianData');

    const modal = document.getElementById('add-modal') || document.getElementById('study-modal');
    if (modal) modal.classList.add('active');
  }

  function handleFormSubmit(event) {
    if (event) event.preventDefault();

    const title = getValueFromIds('study-title', 'form-title');
    if (!title) {
      alert('⚠️ Vui lòng nhập Tiêu đề Hướng dẫn / Nghiên cứu!');
      return;
    }

    const icdRaw = getValueFromIds('study-icd10');
    const icdList = icdRaw ? icdRaw.split(',').map(s => s.trim().toUpperCase()).filter(Boolean) : null;

    const orgVal = getValueFromIds('study-organization', 'form-organization') || 'N/A';
    const ifVal = parseFloat(getValueFromIds('study-impact-factor'));
    const sjrVal = parseFloat(getValueFromIds('study-sjr'));
    const snipVal = parseFloat(getValueFromIds('study-snip'));
    const hIndexVal = parseInt(getValueFromIds('study-hindex'), 10);

    const studyData = {
      id: editingStudyId || (window.generateId ? window.generateId() : 'study_' + Date.now()),
      title: title,
      author: getValueFromIds('study-author', 'form-author'),
      drug: getValueFromIds('study-drug', 'form-drug') || 'N/A',
      sourceType: getValueFromIds('study-source-type', 'form-sourceType') || 'intl-study',
      specialty: getValueFromIds('study-specialty', 'form-specialty') || 'cardio',
      design: getValueFromIds('study-design', 'form-design') || 'rct',
      intervention: getValueFromIds('study-intervention', 'form-intervention'),
      primaryEndpoint: getValueFromIds('study-primary-endpoint', 'form-primaryEndpoint'),
      keyResults: getValueFromIds('study-key-results', 'form-keyResults'),
      impact: getValueFromIds('study-impact', 'form-impact') || 'informative',
      year: parseInt(getValueFromIds('study-year', 'form-year'), 10) || new Date().getFullYear(),
      organization: orgVal,
      journal: orgVal,
      impactFactor: isNaN(ifVal) ? null : ifVal,
      quartile: getValueFromIds('study-quartile') || 'Q1',
      sjr: isNaN(sjrVal) ? null : sjrVal,
      snip: isNaN(snipVal) ? null : snipVal,
      hIndex: isNaN(hIndexVal) ? null : hIndexVal,
      sampleSize: parseInt(getValueFromIds('study-sample-size', 'form-sampleSize'), 10) || null,
      population: getValueFromIds('study-population', 'form-population') || 'N/A',
      summary: getValueFromIds('study-summary', 'form-summary') || 'Không có kết luận',
      detailedConclusion: getValueFromIds('study-detailed-conclusion', 'form-detailedConclusion'),
      file: getValueFromIds('study-file', 'form-file'),
      icd10: icdList,
      asianData: getCheckboxFromIds('study-asian-data', 'form-asianData'),
      bookmarked: false,
      createdAt: new Date().toISOString()
    };

    if (editingStudyId) {
      const idx = (window.studies || []).findIndex(s => s.id === editingStudyId);
      if (idx !== -1) {
        window.studies[idx] = { ...window.studies[idx], ...studyData };
      }
    } else {
      window.studies.unshift(studyData);
    }

    if (window.saveStudies) window.saveStudies();
    if (window.dbSaveStudy) window.dbSaveStudy(studyData);

    closeAddModal();
    if (window.renderTable) window.renderTable();
    if (window.renderUpdates) window.renderUpdates();
    alert(editingStudyId ? '💾 Đã cập nhật thành công!' : '🎉 Đã thêm nghiên cứu mới thành công!');
  }
  const saveStudyForm = handleFormSubmit;


  function getInputValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  // ════════════════════════════════════════════════════════════════
  // 2. IMPORT / EXPORT JSON HANDLERS
  // ════════════════════════════════════════════════════════════════

  function openImportModal() {
    const modal = document.getElementById('import-modal');
    if (modal) modal.classList.add('active');
  }

  function closeImportModal() {
    const modal = document.getElementById('import-modal');
    if (modal) modal.classList.remove('active');
  }

  function handleImportJson() {
    const textarea = document.getElementById('import-json-textarea');
    if (!textarea) return;
    const raw = textarea.value.trim();

    if (!raw) {
      alert('⚠️ Vui lòng dán chuỗi dữ liệu JSON vào ô!');
      return;
    }

    try {
      const parsed = JSON.parse(raw);
      const items = Array.isArray(parsed) ? parsed : [parsed];

      let count = 0;
      items.forEach(item => {
        if (item && item.title) {
          const processed = window.processStudyFields ? window.processStudyFields(item) : item;
          const idx = (window.studies || []).findIndex(s => s.id === processed.id);
          if (idx !== -1) {
            window.studies[idx] = processed;
          } else {
            window.studies.push(processed);
          }
          if (window.dbSaveStudy) window.dbSaveStudy(processed);
          count++;
        }
      });

      if (window.saveStudies) window.saveStudies();
      closeImportModal();
      if (window.renderTable) window.renderTable();
      alert(`📥 Nhập thành công ${count} tài liệu vào hệ thống!`);
    } catch (err) {
      alert('❌ Chuỗi JSON không hợp lệ. Vui lòng kiểm tra lại định dạng!');
      console.error(err);
    }
  }

  // ════════════════════════════════════════════════════════════════
  // 3. ICD-10 CONDITION REGISTRY SETTINGS MODAL
  // ════════════════════════════════════════════════════════════════

  function openConditionSettingsModal() {
    const modal = document.getElementById('condition-settings-modal');
    if (!modal) return;
    modal.classList.add('active');
    renderConditionManagementTable();
  }

  function closeConditionSettingsModal() {
    const modal = document.getElementById('condition-settings-modal');
    if (modal) modal.classList.remove('active');
  }

  function renderConditionManagementTable() {
    const tbody = document.getElementById('cond-mgmt-tbody');
    if (!tbody || !window.CLINICAL_CONDITIONS) return;

    let html = '';
    Object.entries(window.CLINICAL_CONDITIONS).forEach(([key, cond]) => {
      const icdList = Array.isArray(cond.icd10) ? cond.icd10.join(', ') : (cond.icd10 || '');
      html += `
        <tr style="border-bottom: 1px solid var(--border-light);">
          <td style="padding: 10px; font-weight: 700; color: ${cond.color || 'var(--text)'};">
            <span style="display:inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${cond.color || '#0284c7'}; margin-right: 6px;"></span>
            ${escapeHtml(cond.name)}
          </td>
          <td style="padding: 10px; font-family: monospace; font-weight: 700;">${escapeHtml(icdList)}</td>
          <td style="padding: 10px; text-align: center;">
            <button class="btn btn-small" onclick="openConditionEditModal('${key}')" title="Sửa">✏️</button>
            <button class="btn btn-small" onclick="deleteConditionItem('${key}')" title="Xóa" style="color:#dc2626;">🗑️</button>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  }

  function openConditionEditModal(key) {
    const modal = document.getElementById('condition-edit-modal');
    if (!modal) return;

    const titleEl = document.getElementById('cond-form-modal-title');
    const keyInput = document.getElementById('cond-form-key');
    const nameInput = document.getElementById('cond-form-name');
    const icdInput = document.getElementById('cond-form-icd10');
    const colorInput = document.getElementById('cond-form-color');
    const bgInput = document.getElementById('cond-form-bg');

    if (key && window.CLINICAL_CONDITIONS && window.CLINICAL_CONDITIONS[key]) {
      const cond = window.CLINICAL_CONDITIONS[key];
      if (titleEl) titleEl.textContent = '✏️ Chỉnh Sửa Vấn Đề / Bệnh';
      if (keyInput) keyInput.value = key;
      if (nameInput) nameInput.value = cond.name || '';
      if (icdInput) icdInput.value = Array.isArray(cond.icd10) ? cond.icd10.join(', ') : (cond.icd10 || '');
      if (colorInput) colorInput.value = cond.color || '#dc2626';
      if (bgInput) bgInput.value = cond.bg || '#fef2f2';
    } else {
      if (titleEl) titleEl.textContent = '➕ Thêm Vấn Đề / Bệnh Mới';
      if (keyInput) keyInput.value = '';
      if (nameInput) nameInput.value = '';
      if (icdInput) icdInput.value = '';
      if (colorInput) colorInput.value = '#dc2626';
      if (bgInput) bgInput.value = '#fef2f2';
    }

    modal.classList.add('active');
  }

  function closeConditionEditModal() {
    const modal = document.getElementById('condition-edit-modal');
    if (modal) modal.classList.remove('active');
  }

  function handleSaveConditionForm(event) {
    if (event) event.preventDefault();

    const key = document.getElementById('cond-form-key')?.value.trim();
    const name = document.getElementById('cond-form-name')?.value.trim();
    const icdRaw = document.getElementById('cond-form-icd10')?.value.trim();
    const color = document.getElementById('cond-form-color')?.value || '#dc2626';
    const bg = document.getElementById('cond-form-bg')?.value || '#fef2f2';

    if (!name || !icdRaw) {
      alert('⚠️ Vui lòng nhập Tên bệnh và ít nhất 1 mã ICD-10!');
      return;
    }

    const icdList = icdRaw.split(/[\s,;]+/).map(s => s.trim().toUpperCase()).filter(Boolean);
    const condKey = key || 'custom_' + Date.now();

    window.CLINICAL_CONDITIONS = window.CLINICAL_CONDITIONS || {};
    window.CLINICAL_CONDITIONS[condKey] = {
      id: condKey,
      name: name,
      icd10: icdList,
      color: color,
      bg: bg
    };

    try {
      localStorage.setItem('cliniportal_custom_conditions', JSON.stringify(window.CLINICAL_CONDITIONS));
    } catch (e) {}

    closeConditionEditModal();
    renderConditionManagementTable();
    if (window.renderFilterPills) window.renderFilterPills();
    alert('💾 Đã lưu cấu hình danh mục bệnh thành công!');
  }

  function deleteConditionItem(key) {
    if (!key || !window.CLINICAL_CONDITIONS || !window.CLINICAL_CONDITIONS[key]) return;
    if (confirm(`🗑️ Bạn có chắc muốn xóa bệnh "${window.CLINICAL_CONDITIONS[key].name}" khỏi danh mục?`)) {
      delete window.CLINICAL_CONDITIONS[key];
      try {
        localStorage.setItem('cliniportal_custom_conditions', JSON.stringify(window.CLINICAL_CONDITIONS));
      } catch (e) {}
      renderConditionManagementTable();
      if (window.renderFilterPills) window.renderFilterPills();
    }
  }

  function resetConditionRegistryDefault() {
    if (confirm('🔄 Bạn có chắc muốn khôi phục danh mục ICD-10 về trạng thái mặc định của hệ thống?')) {
      if (window.DEFAULT_CLINICAL_CONDITIONS) {
        window.CLINICAL_CONDITIONS = JSON.parse(JSON.stringify(window.DEFAULT_CLINICAL_CONDITIONS));
        localStorage.removeItem('cliniportal_custom_conditions');
        renderConditionManagementTable();
        if (window.renderFilterPills) window.renderFilterPills();
        alert('🔄 Đã khôi phục danh mục ICD-10 mặc định!');
      }
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Export Modals APIs to window
  window.openAddModal = openAddModal;
  window.openEditModal = openEditModal;
  window.closeAddModal = closeAddModal;
  window.autoLookupJournalMetrics = autoLookupJournalMetrics;
  window.handleJournalInput = handleJournalInput;
  window.selectJournalSuggestion = selectJournalSuggestion;
  window.hideJournalSuggestions = hideJournalSuggestions;
  window.closeStudyModal = closeStudyModal;
  window.saveStudyForm = saveStudyForm;
  window.handleFormSubmit = handleFormSubmit;
  window.openImportModal = openImportModal;
  window.closeImportModal = closeImportModal;
  window.handleImportJson = handleImportJson;
  window.openConditionSettingsModal = openConditionSettingsModal;
  window.closeConditionSettingsModal = closeConditionSettingsModal;
  window.renderConditionManagementTable = renderConditionManagementTable;
  window.openConditionEditModal = openConditionEditModal;
  window.closeConditionEditModal = closeConditionEditModal;
  window.handleSaveConditionForm = handleSaveConditionForm;
  window.deleteConditionItem = deleteConditionItem;
  window.resetConditionRegistryDefault = resetConditionRegistryDefault;

})();
