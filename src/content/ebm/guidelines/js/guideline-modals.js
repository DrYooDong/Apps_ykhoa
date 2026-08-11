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

  function openAddModal() {
    editingStudyId = null;
    const form = document.getElementById('study-form');
    if (form) form.reset();
    
    const titleEl = document.getElementById('study-modal-title');
    if (titleEl) titleEl.textContent = '➕ Thêm Hướng Dẫn / Nghiên Cứu Lâm Sàng Mới';

    const modal = document.getElementById('study-modal');
    if (modal) modal.classList.add('active');
  }

  function openEditModal(id) {
    const study = (window.studies || []).find(s => s.id === id);
    if (!study) return;

    editingStudyId = id;
    const titleEl = document.getElementById('study-modal-title');
    if (titleEl) titleEl.textContent = '✏️ Chỉnh Sửa Hướng Dẫn / Nghiên Cứu Lâm Sàng';

    const form = document.getElementById('study-form');
    if (!form) return;

    // Populate inputs
    setInputValue('form-title', study.title);
    setInputValue('form-author', study.author);
    setInputValue('form-drug', study.drug);
    setInputValue('form-sourceType', study.sourceType);
    setInputValue('form-specialty', study.specialty);
    setInputValue('form-design', study.design);
    setInputValue('form-intervention', study.intervention);
    setInputValue('form-primaryEndpoint', study.primaryEndpoint);
    setInputValue('form-keyResults', study.keyResults);
    setInputValue('form-impact', study.impact);
    setInputValue('form-year', study.year);
    setInputValue('form-organization', study.organization);
    setInputValue('form-sampleSize', study.sampleSize);
    setInputValue('form-population', study.population);
    setInputValue('form-summary', study.summary);
    setInputValue('form-detailedConclusion', study.detailedConclusion);
    setInputValue('form-file', study.file);

    const asianCb = document.getElementById('form-asianData');
    if (asianCb) asianCb.checked = !!study.asianData;

    const modal = document.getElementById('study-modal');
    if (modal) modal.classList.add('active');
  }

  function setInputValue(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  }

  function closeStudyModal() {
    const modal = document.getElementById('study-modal');
    if (modal) modal.classList.remove('active');
    editingStudyId = null;
  }

  function saveStudyForm(event) {
    if (event) event.preventDefault();

    const title = getInputValue('form-title');
    if (!title) {
      alert('⚠️ Vui lòng nhập Tiêu đề Hướng dẫn / Nghiên cứu!');
      return;
    }

    const studyData = {
      id: editingStudyId || (window.generateId ? window.generateId() : 'study_' + Date.now()),
      title: title,
      author: getInputValue('form-author'),
      drug: getInputValue('form-drug') || 'N/A',
      sourceType: getInputValue('form-sourceType') || 'intl-study',
      specialty: getInputValue('form-specialty') || 'cardio',
      design: getInputValue('form-design') || 'rct',
      intervention: getInputValue('form-intervention'),
      primaryEndpoint: getInputValue('form-primaryEndpoint'),
      keyResults: getInputValue('form-keyResults'),
      impact: getInputValue('form-impact') || 'informative',
      year: parseInt(getInputValue('form-year'), 10) || new Date().getFullYear(),
      organization: getInputValue('form-organization') || 'N/A',
      sampleSize: parseInt(getInputValue('form-sampleSize'), 10) || null,
      population: getInputValue('form-population') || 'N/A',
      summary: getInputValue('form-summary') || 'Không có kết luận',
      detailedConclusion: getInputValue('form-detailedConclusion'),
      file: getInputValue('form-file'),
      asianData: document.getElementById('form-asianData')?.checked || false,
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

    closeStudyModal();
    if (window.renderTable) window.renderTable();
    alert(editingStudyId ? '💾 Đã cập nhật thành công!' : '🎉 Đã thêm nghiên cứu mới thành công!');
  }

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
  window.closeStudyModal = closeStudyModal;
  window.saveStudyForm = saveStudyForm;
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
