/**
 * CliniPortal 2.0 — Guidelines Modals & Import/Export (TypeScript)
 * Path: src/content/ebm/guidelines/js/guideline-modals.ts
 */

import { Study, BatchDuplicateItem, ExistingDuplicateConflict } from './guidelines-types';

import './guidelines-types';

let editingStudyId: string | null = null;
let pendingImportBatch: BatchDuplicateItem[] = [];
let existingDupConflicts: ExistingDuplicateConflict[] = [];
let duplicateModalMode: 'import' | 'scan' = 'import';

function getValueFromIds(...ids: string[]): string {
  for (const id of ids) {
    const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
    if (el && el.value !== undefined && el.value !== null) {
      const val = el.value.trim();
      if (val) return val;
    }
  }
  return '';
}

function setValueToIds(val: any, ...ids: string[]): void {
  for (const id of ids) {
    const el = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
    if (el) el.value = val !== undefined && val !== null ? String(val) : '';
  }
}

function getCheckboxFromIds(...ids: string[]): boolean {
  for (const id of ids) {
    const el = document.getElementById(id) as HTMLInputElement | null;
    if (el && el.type === 'checkbox') {
      return el.checked;
    }
  }
  return false;
}

function setCheckboxToIds(val: any, ...ids: string[]): void {
  for (const id of ids) {
    const el = document.getElementById(id) as HTMLInputElement | null;
    if (el && el.type === 'checkbox') el.checked = !!val;
  }
}

export function openAddModal(): void {
  editingStudyId = null;
  const form = (document.getElementById('add-form') || document.getElementById('study-form')) as HTMLFormElement | null;
  if (form) form.reset();
  
  setValueToIds('', 'study-specialty-2');
  setValueToIds('', 'study-condition-key');
  updateConditionDropdownOptions();

  const partsContainer = document.getElementById('summary-parts-container');
  if (partsContainer) partsContainer.innerHTML = '';

  const titleEl = document.getElementById('modal-form-title') || document.getElementById('study-modal-title');
  if (titleEl) titleEl.textContent = '➕ Thêm Hướng Dẫn / Nghiên Cứu Lâm Sàng Mới';

  const modal = document.getElementById('add-modal') || document.getElementById('study-modal');
  if (modal) modal.classList.add('active');
}

export function closeAddModal(): void {
  const modal = document.getElementById('add-modal') || document.getElementById('study-modal');
  if (modal) modal.classList.remove('active');
  editingStudyId = null;
}

export const closeStudyModal = closeAddModal;

export function handleJournalInput(val: string): void {
  const list = document.getElementById('journal-suggestions-list');
  if (!list || !window.JOURNAL_METRICS_DATABASE) return;
  const q = val.trim().toLowerCase();
  if (q.length < 1) { list.style.display = 'none'; list.innerHTML = ''; return; }

  const matches = Object.keys(window.JOURNAL_METRICS_DATABASE)
    .filter(k => k.toLowerCase().includes(q) || window.JOURNAL_METRICS_DATABASE![k].name.toLowerCase().includes(q))
    .slice(0, 7);

  if (matches.length === 0) { list.style.display = 'none'; list.innerHTML = ''; return; }

  list.innerHTML = matches.map(k => {
    const m = window.JOURNAL_METRICS_DATABASE![k];
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

export function selectJournalSuggestion(key: string): void {
  const m = window.JOURNAL_METRICS_DATABASE && window.JOURNAL_METRICS_DATABASE[key];
  if (!m) return;
  const orgInput = document.getElementById('study-organization') as HTMLInputElement | null;
  if (orgInput) orgInput.value = m.journal || key;
  hideJournalSuggestions();
  _fillJournalMetricsFromObj(m);
  showJournalResultCard(m);
}

export function hideJournalSuggestions(): void {
  const list = document.getElementById('journal-suggestions-list');
  if (list) { list.style.display = 'none'; list.innerHTML = ''; }
}

export async function autoLookupJournalMetrics(): Promise<void> {
  const journalInput = getValueFromIds('study-organization', 'form-organization');
  const btn = document.getElementById('journal-lookup-btn') as HTMLButtonElement | null;
  const statusEl = document.getElementById('journal-lookup-status');

  if (!journalInput) {
    if (statusEl) { statusEl.textContent = '⚠️ Nhập tên tạp chí trước'; statusEl.className = 'journal-lookup-status status-warn'; statusEl.style.display = 'inline-flex'; }
    if (btn) btn.classList.add('shake');
    setTimeout(() => { if (btn) btn.classList.remove('shake'); if (statusEl) statusEl.style.display = 'none'; }, 2000);
    return;
  }

  if (btn) {
    const lbl = btn.querySelector('.lookup-label');
    if (lbl) lbl.textContent = 'Đang tìm kiếm...';
    btn.disabled = true;
  }

  let metrics = window.getJournalMetrics ? window.getJournalMetrics(journalInput) : null;
  let sourceUsed = 'CSDL Local';

  if (!metrics && window.searchOpenAlexJournals) {
    if (statusEl) { statusEl.textContent = '🌐 Đang tra cứu OpenAlex API...'; statusEl.className = 'journal-lookup-status status-ok'; statusEl.style.display = 'inline-flex'; }
    try {
      const oaResults = await window.searchOpenAlexJournals(journalInput);
      if (oaResults && oaResults.length > 0) {
        metrics = oaResults[0];
        sourceUsed = 'OpenAlex Live';
      }
    } catch (e) {
      console.warn('[Modal Lookup] OpenAlex fetch error:', e);
    }
  }

  if (metrics) {
    _fillJournalMetricsFromObj(metrics);
    showJournalResultCard(metrics, sourceUsed);
    if (statusEl) {
      statusEl.textContent = `✅ Đã điền (${sourceUsed})`;
      statusEl.className = 'journal-lookup-status status-ok';
      statusEl.style.display = 'inline-flex';
    }
  } else {
    hideJournalResultCard();
    if (statusEl) {
      statusEl.textContent = '⚠️ Không tìm thấy — vui lòng điền thủ công';
      statusEl.className = 'journal-lookup-status status-warn';
      statusEl.style.display = 'inline-flex';
    }
  }

  if (btn) {
    const lbl = btn.querySelector('.lookup-label');
    if (lbl) lbl.textContent = 'Tra cứu tự động';
    btn.disabled = false;
  }
  setTimeout(() => { if (statusEl) statusEl.style.display = 'none'; }, 4500);
}

function _fillJournalMetricsFromObj(metrics: any): void {
  setValueToIds(metrics.if || metrics.impactFactor || '', 'study-impact-factor');
  setValueToIds(metrics.quartile || 'Q1', 'study-quartile');
  setValueToIds(metrics.sjr || '', 'study-sjr');
  setValueToIds(metrics.snip || '', 'study-snip');
  setValueToIds(metrics.hIndex || '', 'study-hindex');
}

function showJournalResultCard(m: any, sourceUsed = 'CSDL Local'): void {
  const card = document.getElementById('journal-result-card');
  if (!card) return;

  const profile = window.getJournalQualityProfile ? window.getJournalQualityProfile(m.name || m.journal, m) : null;
  const ts = profile ? profile.trustScore : { score: 75, grade: 'Chưa xếp hạng', color: '#2563eb' };
  const pAudit = profile ? profile.predatoryAudit : { isPredatory: false, flags: [], summary: '' };

  const qClass = m.quartile === 'Q1' ? 'tag-q1' : m.quartile === 'Q2' ? 'tag-q2' : m.quartile === 'Q3' ? 'tag-q3' : m.quartile === 'Q4' ? 'tag-q4' : 'tag-moh';

  let predatoryHtml = '';
  if (pAudit && pAudit.flags && pAudit.flags.length > 0) {
    predatoryHtml = `
      <div class="predatory-alert-banner" style="margin-top: 0.6rem; padding: 0.65rem 0.85rem; font-size: 0.78rem;">
        <div class="predatory-title-row">
          <span>${pAudit.summary}</span>
        </div>
        <div class="predatory-flag-list">
          ${pAudit.flags.map((f: any) => `<div>• <strong>${f.title}</strong>: ${f.detail}</div>`).join('')}
        </div>
      </div>
    `;
  }

  card.innerHTML = `
    <div class="jrc-header" style="display:flex; align-items:center; justify-content:space-between; gap:10px;">
      <div>
        <div class="jrc-name" style="font-weight:800; font-size:0.9rem;">${m.name || m.journal || '—'}</div>
        <div class="jrc-category" style="font-size:0.75rem; color:var(--text-muted);">${m.publisher || m.category || ''} ${m.issn ? '• ISSN: ' + m.issn : ''}</div>
      </div>
      <div style="text-align:right;">
        <span class="openalex-badge">${sourceUsed === 'OpenAlex Live' ? '🌐 OpenAlex API' : '📚 CSDL Local'}</span>
        <div style="font-size:0.75rem; font-weight:800; color:${ts.color}; margin-top:2px;">Trust Score: ${ts.score}/100</div>
      </div>
    </div>

    <div class="jrc-metrics" style="margin-top:0.5rem;">
      <div class="jrc-metric">
        <div class="jrc-metric-val">${m.if ?? '—'}</div>
        <div class="jrc-metric-key">Impact Factor</div>
      </div>
      <div class="jrc-metric">
        <div class="jrc-metric-val"><span class="journal-metrics-tag ${qClass}" style="font-size:0.85rem;">${m.quartile ?? '—'}</span></div>
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
        <div class="jrc-metric-val">${m.hIndex ? Number(m.hIndex).toLocaleString() : '—'}</div>
        <div class="jrc-metric-key">H-Index</div>
      </div>
    </div>

    ${predatoryHtml}
  `;
  card.style.display = 'block';
  card.classList.remove('jrc-animate');
  void card.offsetWidth;
  card.classList.add('jrc-animate');
}

function hideJournalResultCard(): void {
  const card = document.getElementById('journal-result-card');
  if (card) card.style.display = 'none';
}

export function openEditModal(id: string): void {
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
  const spec2Val = study.specialty2 || (Array.isArray(study.specialties) && study.specialties[1] !== study.specialty ? study.specialties[1] : '');
  setValueToIds(spec2Val, 'study-specialty-2', 'form-specialty-2');
  updateConditionDropdownOptions(study.conditionKey || undefined);
  setValueToIds(study.conditionKey || '', 'study-condition-key', 'form-condition-key');
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
  setValueToIds(study.sourceUrl, 'study-source-url', 'form-sourceUrl');
  setValueToIds(Array.isArray(study.icd10) ? study.icd10.join(', ') : (study.icd10 || ''), 'study-icd10');
  setCheckboxToIds(study.asianData, 'study-asian-data', 'form-asianData');

  const partsContainer = document.getElementById('summary-parts-container');
  if (partsContainer) {
    partsContainer.innerHTML = '';
    let studyParts: any[] = [];
    if (Array.isArray(study.parts)) {
      studyParts = study.parts;
    } else if (typeof study.parts === 'string') {
      try { studyParts = JSON.parse(study.parts); } catch(e) {}
    }
    if (studyParts && studyParts.length > 0) {
      studyParts.forEach(p => {
        if (typeof window.addSummaryPartRow === 'function') {
          window.addSummaryPartRow(p.title || p.label || '', p.file || '');
        }
      });
    }
  }

  const modal = document.getElementById('add-modal') || document.getElementById('study-modal');
  if (modal) modal.classList.add('active');

  requestAnimationFrame(() => {
    updateChartPreview();
    updateSubgroupPreview();
  });
}

export function handleFormSubmit(event?: Event): void {
  if (event) event.preventDefault();

  const title = getValueFromIds('study-title', 'form-title');
  if (!title) {
    alert('⚠️ Vui lòng nhập Tiêu đề Hướng dẫn / Nghiên cứu!');
    return;
  }

  const icdRaw = getValueFromIds('study-icd10');
  const icdList = icdRaw ? icdRaw.split(',').map(s => s.trim().toUpperCase()).filter(Boolean) : undefined;

  const orgVal = getValueFromIds('study-organization', 'form-organization') || 'N/A';
  const ifVal = parseFloat(getValueFromIds('study-impact-factor'));
  const sjrVal = parseFloat(getValueFromIds('study-sjr'));
  const snipVal = parseFloat(getValueFromIds('study-snip'));
  const hIndexVal = parseInt(getValueFromIds('study-hindex'), 10);

  // Thu thập danh sách các phần tóm tắt (Parts)
  const partRows = document.querySelectorAll('#summary-parts-container .summary-part-row');
  const partsList: any[] = [];
  partRows.forEach(row => {
    const titleInput = row.querySelector('.summary-part-title') as HTMLInputElement | null;
    const fileInput = row.querySelector('.summary-part-file') as HTMLInputElement | null;
    const pTitle = titleInput?.value?.trim() || '';
    const pFile = fileInput?.value?.trim() || '';
    if (pFile || pTitle) {
      partsList.push({
        title: pTitle || 'Tóm tắt',
        file: pFile
      });
    }
  });

  const mainFile = getValueFromIds('study-file', 'form-file');
  const finalFile = mainFile || (partsList.length > 0 ? partsList[0].file : undefined);

  const spec1Val = getValueFromIds('study-specialty', 'form-specialty') || 'cardio';
  const spec2Val = getValueFromIds('study-specialty-2', 'form-specialty-2');
  const validSpec2 = (spec2Val && spec2Val !== spec1Val) ? spec2Val : undefined;
  const specList = [spec1Val, validSpec2].filter(Boolean) as string[];
  const condKeyVal = getValueFromIds('study-condition-key', 'form-condition-key') || undefined;

  const studyData: Study = {
    id: editingStudyId || (window.generateId ? window.generateId() : 'study_' + Date.now()),
    title: title,
    author: getValueFromIds('study-author', 'form-author'),
    drug: getValueFromIds('study-drug', 'form-drug') || 'N/A',
    sourceType: getValueFromIds('study-source-type', 'form-sourceType') || 'intl-study',
    specialty: spec1Val,
    specialty2: validSpec2,
    specialties: specList,
    conditionKey: condKeyVal,
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
    sourceUrl: getValueFromIds('study-source-url', 'form-sourceUrl'),
    file: finalFile,
    parts: partsList.length > 0 ? partsList : undefined,
    icd10: icdList,
    asianData: getCheckboxFromIds('study-asian-data', 'form-asianData'),
    bookmarked: editingStudyId ? Boolean((window.studies || []).find(s => s.id === editingStudyId)?.bookmarked) : false,
    isCustom: true,
    createdAt: editingStudyId ? ((window.studies || []).find(s => s.id === editingStudyId)?.createdAt || new Date().toISOString()) : new Date().toISOString()
  };

  if (!editingStudyId && window.detectStudyDuplicate) {
    const dupCheck = window.detectStudyDuplicate(studyData, window.studies);
    if (dupCheck && dupCheck.isDuplicate && dupCheck.matchedStudy) {
      const matched = dupCheck.matchedStudy;
      const confirmMsg = `⚠️ PHÉP KIỂM TRÙNG LẶP DỮ LIỆU:\n` +
        `Hệ thống phát hiện nghiên cứu vừa nhập có nguy cơ trùng với bài đã có trong Kho Dữ Liệu!\n\n` +
        `• Bài đã có: "${matched.title}"\n` +
        `• Năm: ${matched.year} • Nguồn: ${matched.organization || matched.journal || 'N/A'}\n` +
        `• Lý do đối sánh: ${dupCheck.reasons.join(', ')}\n\n` +
        `Bạn có muốn GHI ĐÈ / CẬP NHẬT thông tin lên bài đã có không?\n` +
        `- Nhấn [OK / Đồng ý]: Ghi đè cập nhật bài cũ.\n` +
        `- Nhấn [Cancel / Hủy]: Tạo bài mới độc lập.`;
      
      const shouldOverwrite = confirm(confirmMsg);
      if (shouldOverwrite) {
        studyData.id = matched.id;
        editingStudyId = matched.id;
      }
    }
  }

  if (editingStudyId) {
    const idx = (window.studies || []).findIndex(s => s.id === editingStudyId);
    if (idx !== -1) {
      window.studies[idx] = {
        ...window.studies[idx],
        ...studyData,
        isCustom: true,
        _userModified: true
      };
    }
  } else {
    studyData.isCustom = true;
    (studyData as any)._userCreated = true;
    window.studies.unshift(studyData);
  }

  if (window.saveStudies) window.saveStudies();
  if (window.dbSaveStudy) window.dbSaveStudy(studyData);

  closeAddModal();
  if (window.renderTable) window.renderTable();
  if (window.renderUpdates) window.renderUpdates();
  alert(editingStudyId ? '💾 Đã cập nhật thành công!' : '🎉 Đã thêm nghiên cứu mới thành công!');
}

export const saveStudyForm = handleFormSubmit;

export function openImportModal(): void {
  const modal = document.getElementById('import-modal');
  if (modal) modal.classList.add('active');
}

export function closeImportModal(): void {
  const modal = document.getElementById('import-modal');
  if (modal) modal.classList.remove('active');
}

function cleanJSONString(str?: string): string {
  if (!str) return '';
  let cleaned = str.trim();
  cleaned = cleaned.replace(/^```[a-z]*\s*/i, '').replace(/\s*```$/, '');
  return cleaned;
}

export function processJSONImport(rawText?: string): void {
  const cleaned = cleanJSONString(rawText);
  if (!cleaned) {
    alert('⚠️ Vui lòng dán chuỗi dữ liệu JSON hoặc chọn file JSON!');
    return;
  }

  let parsed: any = null;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    alert('❌ Chuỗi JSON không hợp lệ. Vui lòng kiểm tra định dạng cú pháp dữ liệu!');
    console.error(err);
    return;
  }

  const rawArray = Array.isArray(parsed) ? parsed : [parsed];
  if (rawArray.length === 0) {
    alert('⚠️ Dữ liệu JSON không chứa bản ghi nghiên cứu nào!');
    return;
  }

  // UPGRADE-03: Tự động sao lưu snapshot trước khi nạp dữ liệu ngoại lai
  if (window.backupCustomStudies) {
    window.backupCustomStudies();
  }

  // BUG-07: Schema Validation & Sanitization toàn diện
  const validArray: any[] = [];
  const invalidItems: { index: number; errors: string[] }[] = [];

  rawArray.forEach((item, idx) => {
    const valResult = window.validateStudySchema
      ? window.validateStudySchema(item)
      : { valid: Boolean(item && item.title), errors: ['Thiếu tiêu đề tài liệu'], sanitized: item };

    if (valResult.valid && valResult.sanitized) {
      validArray.push(valResult.sanitized);
    } else {
      invalidItems.push({ index: idx + 1, errors: valResult.errors });
    }
  });

  if (validArray.length === 0) {
    const errDetails = invalidItems.map(i => `• Bản ghi #${i.index}: ${i.errors.join('; ')}`).slice(0, 4).join('\n');
    alert(`❌ Toàn bộ ${rawArray.length} bản ghi trong tệp đều không hợp lệ:\n\n${errDetails}\n\nVui lòng kiểm tra lại cấu trúc dữ liệu!`);
    return;
  }

  if (invalidItems.length > 0) {
    if (window.showMedicalToast) {
      window.showMedicalToast({
        type: 'warning',
        title: 'Bỏ qua bản ghi lỗi',
        message: `Đã loại bỏ ${invalidItems.length} bản ghi lỗi cấu trúc, tiếp tục xử lý ${validArray.length} bản ghi hợp lệ.`
      });
    }
  }

  const checkedBatch: BatchDuplicateItem[] = window.batchCheckDuplicates
    ? window.batchCheckDuplicates(validArray, window.studies)
    : validArray.map(item => ({
        item: window.processStudyFields ? window.processStudyFields(item) : item,
        dupResult: { isDuplicate: false, score: 0, matchedStudy: null, reasons: [], matchLevel: 'none' },
        action: 'new'
      }));

  const duplicates = checkedBatch.filter(b => b.dupResult && b.dupResult.isDuplicate);

  if (duplicates.length === 0) {
    let count = 0;
    checkedBatch.forEach(b => {
      const study = b.item;
      if (study && study.title) {
        study.isCustom = true;
        (study as any)._userCreated = true;
        if (!study.createdAt && !(study as any).created_at) {
          study.createdAt = new Date().toISOString();
        }
        window.studies.unshift(study);
        if (window.dbSaveStudy) window.dbSaveStudy(study);
        count++;
      }
    });

    if (window.saveStudies) window.saveStudies();
    closeImportModal();
    if (window.renderTable) window.renderTable();
    if (window.renderUpdates) window.renderUpdates();
    alert(`📥 Phép kiểm hoàn tất: Đã nạp thành công ${count} nghiên cứu mới! (Không phát hiện trùng lặp)`);
  } else {
    pendingImportBatch = checkedBatch.map(b => ({
      ...b,
      action: b.dupResult.isDuplicate ? (b.dupResult.matchLevel === 'exact' || b.dupResult.score >= 90 ? 'overwrite' : 'skip') : 'new'
    }));

    closeImportModal();
    openDuplicateResolutionModal();
  }
}

export function handleImportJson(): void {
  const textarea = (document.getElementById('json-text') || document.getElementById('import-json-textarea')) as HTMLTextAreaElement | null;
  if (!textarea) return;
  processJSONImport(textarea.value);
}

export const importFromText = handleImportJson;

export function handleFileSelect(event: any): void {
  const file = event && event.target && event.target.files ? event.target.files[0] : null;
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    processJSONImport(e.target?.result as string);
  };
  reader.readAsText(file);
}

export function fillSampleJSON(): void {
  const textarea = (document.getElementById('json-text') || document.getElementById('import-json-textarea')) as HTMLTextAreaElement | null;
  if (!textarea) return;
  textarea.value = `[
  {
    "title": "2026 ESC Guidelines for the Diagnosis and Treatment of Acute and Chronic Heart Failure",
    "year": 2026,
    "organization": "European Society of Cardiology (ESC)",
    "specialty": "cardio",
    "drug": "Empagliflozin / Dapagliflozin + ARNI",
    "design": "guideline",
    "summary": "Khuyến cáo mới cập nhật phác đồ 4 trụ cột trong điều trị suy tim phân suất tống máu giảm (HFrEF)."
  }
]`;
}

export function openDuplicateResolutionModal(): void {
  duplicateModalMode = 'import';
  const modal = document.getElementById('duplicate-resolution-modal');
  if (!modal) return;
  const modalTitle = document.getElementById('dup-modal-title') || modal.querySelector('.modal-header h3');
  if (modalTitle) modalTitle.innerHTML = '🛡️ Phép Kiểm Trùng Lặp Dữ Liệu Nghiên Cứu';
  const confirmBtn = document.getElementById('dup-confirm-btn');
  if (confirmBtn) confirmBtn.textContent = '✅ Xác Nhận Thực Thi Nạp Dữ Liệu';
  modal.classList.add('active');
  renderDuplicateResolutionItems();
}

export function closeDuplicateResolutionModal(): void {
  const modal = document.getElementById('duplicate-resolution-modal');
  if (modal) modal.classList.remove('active');
  pendingImportBatch = [];
  existingDupConflicts = [];
  duplicateModalMode = 'import';
}

export function applyGlobalDupAction(action: string): void {
  if (!pendingImportBatch || pendingImportBatch.length === 0) return;
  pendingImportBatch.forEach(item => {
    if (item.dupResult && item.dupResult.isDuplicate) {
      item.action = action as any;
    }
  });
  renderDuplicateResolutionItems();
}

export function setPerItemDupAction(index: number, action: string): void {
  if (pendingImportBatch && pendingImportBatch[index]) {
    pendingImportBatch[index].action = action as any;
  }
}

export function renderDuplicateResolutionItems(): void {
  const bannerEl = document.getElementById('dup-summary-banner');
  const containerEl = document.getElementById('dup-items-container');
  const actionBar = document.getElementById('dup-action-bar');
  const confirmBtn = document.getElementById('dup-confirm-btn');
  if (!containerEl) return;

  if (actionBar) {
    actionBar.style.display = 'flex';
    actionBar.innerHTML = `
      <div style="font-size: 0.8rem; font-weight: 700; color: var(--text);">⚡ Thao tác nhanh hàng loạt cho các bản ghi trùng:</div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button type="button" class="btn btn-small" onclick="applyGlobalDupAction('skip')" style="font-size: 0.72rem; padding: 4px 10px;">🚫 Bỏ qua tất cả trùng</button>
        <button type="button" class="btn btn-small" onclick="applyGlobalDupAction('overwrite')" style="font-size: 0.72rem; padding: 4px 10px;">🔄 Ghi đè tất cả trùng</button>
        <button type="button" class="btn btn-small" onclick="applyGlobalDupAction('new')" style="font-size: 0.72rem; padding: 4px 10px;">➕ Giữ cả hai (Thêm mới)</button>
      </div>
    `;
  }
  if (confirmBtn) {
    confirmBtn.style.display = '';
    confirmBtn.textContent = '✅ Xác Nhận Thực Thi Nạp Dữ Liệu';
  }

  const total = pendingImportBatch.length;
  const dupCount = pendingImportBatch.filter(b => b.dupResult && b.dupResult.isDuplicate).length;
  const newCount = total - dupCount;

  if (bannerEl) {
    bannerEl.innerHTML = `
      <div>
        <div style="font-size: 0.95rem; font-weight: 800; color: var(--accent);">
          🔍 Phép Kiểm Trùng Lặp: Phát hiện ${dupCount} / ${total} bản ghi có nguy cơ trùng lặp!
        </div>
        <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">
          Hệ thống đã tự động đối sánh theo: Bệnh/Vấn đề, Năm công bố & Nguồn/Tổ chức/Tạp chí. Vui lòng chọn thao tác bên dưới.
        </div>
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <span class="dup-badge dup-badge-new">✨ ${newCount} bài mới</span>
        <span class="dup-badge dup-badge-exact">⚠️ ${dupCount} bài trùng</span>
      </div>
    `;
  }

  let html = '';
  pendingImportBatch.forEach((batch, idx) => {
    const newItem = batch.item;
    const dup = batch.dupResult;
    const isDup = dup && dup.isDuplicate;
    const matched = dup ? dup.matchedStudy : null;

    let badgeClass = 'dup-badge-new';
    let badgeLabel = '✨ Bài mới hoàn toàn';
    if (isDup) {
      if (dup.matchLevel === 'exact') { badgeClass = 'dup-badge-exact'; badgeLabel = '🔴 Trùng khớp 100%'; }
      else if (dup.matchLevel === 'high') { badgeClass = 'dup-badge-high'; badgeLabel = `🟠 Trùng nguy cơ cao (${dup.score}%)`; }
      else { badgeClass = 'dup-badge-moderate'; badgeLabel = `🟡 Trùng nguy cơ vừa (${dup.score}%)`; }
    }

    html += `
      <div class="dup-item-card" style="${isDup ? 'border-left: 4px solid var(--accent);' : 'border-left: 4px solid var(--color-success, #16a34a);'}">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span style="font-weight: 800; font-size: 0.82rem; color: var(--text-muted);">#${idx + 1}</span>
            <span class="dup-badge ${badgeClass}">${badgeLabel}</span>
            ${isDup ? `<span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">Lý do: ${escapeHtml(dup.reasons.join(' • '))}</span>` : ''}
          </div>
          
          <div class="dup-action-selector">
            <span style="font-size: 0.75rem; color: var(--text-muted);">Hành động:</span>
            <label>
              <input type="radio" name="dup_action_${idx}" value="overwrite" ${batch.action === 'overwrite' ? 'checked' : ''} onchange="setPerItemDupAction(${idx}, 'overwrite')">
              <span>🔄 Ghi đè bài cũ</span>
            </label>
            <label>
              <input type="radio" name="dup_action_${idx}" value="skip" ${batch.action === 'skip' ? 'checked' : ''} onchange="setPerItemDupAction(${idx}, 'skip')">
              <span>🚫 Bỏ qua bài này</span>
            </label>
            <label>
              <input type="radio" name="dup_action_${idx}" value="new" ${batch.action === 'new' ? 'checked' : ''} onchange="setPerItemDupAction(${idx}, 'new')">
              <span>➕ Giữ cả hai (Thêm mới)</span>
            </label>
          </div>
        </div>

        <div class="dup-comparison-grid">
          <div class="dup-subcard">
            <div class="dup-subcard-header" style="color: var(--accent);">📥 Dữ Liệu Mới Nạp Mới</div>
            <div class="dup-subcard-title">${escapeHtml(newItem.title || 'Không có tiêu đề')}</div>
            <div class="dup-subcard-meta">
              <span>📅 Năm: <strong>${newItem.year || 'N/A'}</strong></span>
              <span>🏛️ Nguồn: <strong>${escapeHtml(newItem.organization || newItem.journal || 'N/A')}</strong></span>
              <span>💊 Thuốc: <strong>${escapeHtml(newItem.drug || 'N/A')}</strong></span>
            </div>
          </div>

          <div class="dup-subcard" style="${matched ? 'background: var(--surface); border-color: var(--accent-light);' : 'opacity: 0.6;'}">
            <div class="dup-subcard-header" style="color: var(--text-muted);">
              ${matched ? '💾 Dữ Liệu Đang Có Trong Hệ Thống' : '💾 Không Có Bản Ghi Tương Tự'}
            </div>
            ${matched ? `
              <div class="dup-subcard-title">${escapeHtml(matched.title)}</div>
              <div class="dup-subcard-meta">
                <span>📅 Năm: <strong>${matched.year || 'N/A'}</strong></span>
                <span>🏛️ Nguồn: <strong>${escapeHtml(matched.organization || matched.journal || 'N/A')}</strong></span>
                <span>🔑 ID: <code style="font-size: 0.7rem;">${matched.id}</code></span>
              </div>
            ` : `
              <div style="font-size: 0.8rem; color: var(--text-muted); padding: 6px 0;">Sẵn sàng nạp mới trực tiếp.</div>
            `}
          </div>
        </div>
      </div>
    `;
  });

  containerEl.innerHTML = html;
}

export function executeDuplicateImport(): void {
  if (!pendingImportBatch || pendingImportBatch.length === 0) return;

  let addedCount = 0;
  let overwrittenCount = 0;
  let skippedCount = 0;

  pendingImportBatch.forEach(batch => {
    const newItem = batch.item;
    const action = batch.action;
    const dup = batch.dupResult;
    const matched = dup ? dup.matchedStudy : null;

    if (action === 'skip') {
      skippedCount++;
    } else if (action === 'overwrite' && matched) {
      const idx = (window.studies || []).findIndex(s => s.id === matched.id);
      const updated = {
        ...matched,
        ...newItem,
        id: matched.id,
        isCustom: true,
        _userModified: true
      };
      if (idx !== -1) {
        window.studies[idx] = updated;
      } else {
        window.studies.unshift(updated);
      }
      if (window.dbSaveStudy) window.dbSaveStudy(updated);
      overwrittenCount++;
    } else {
      const newStudy = {
        ...newItem,
        id: (matched && matched.id === newItem.id) ? (window.generateId ? window.generateId() : 'study_' + Date.now() + Math.random().toString(36).substr(2, 5)) : (newItem.id || (window.generateId ? window.generateId() : 'study_' + Date.now())),
        isCustom: true,
        _userCreated: true,
        createdAt: newItem.createdAt || (newItem as any).created_at || new Date().toISOString()
      };
      window.studies.unshift(newStudy);
      if (window.dbSaveStudy) window.dbSaveStudy(newStudy);
      addedCount++;
    }
  });

  if (window.saveStudies) window.saveStudies();
  closeDuplicateResolutionModal();
  if (window.renderTable) window.renderTable();
  if (window.renderUpdates) window.renderUpdates();

  if (window.showMedicalToast) {
    window.showMedicalToast({
      type: 'success',
      title: 'Nạp dữ liệu hoàn tất',
      message: `Đã nạp xong: Thêm mới ${addedCount} bài, Cập nhật ${overwrittenCount} bài, Bỏ qua ${skippedCount} bài trùng.`
    });
  } else {
    alert(`🎉 Phép kiểm hoàn tất & đã thực thi nạp dữ liệu!\n• Thêm mới thành công: ${addedCount} bài\n• Ghi đè / Cập nhật: ${overwrittenCount} bài\n• Bỏ qua bài trùng: ${skippedCount} bài.`);
  }
}

// ════════════════════════════════════════════════════════════════
// SMART SCAN & CLEANUP DUPLICATES (LỌC TRÙNG KHO NGHIÊN CỨU)
// ════════════════════════════════════════════════════════════════

// Ngưỡng độ nhạy mặc định: 55 (moderate+), user có thể kéo xuống 38 để xem cả near-similar
let currentScanThreshold = 55;

export function rescanWithThreshold(threshold: number): void {
  currentScanThreshold = Math.max(38, Math.min(100, Math.round(threshold)));
  existingDupConflicts = scanExistingDuplicates(currentScanThreshold);
  renderDuplicateScanItems();
}

export function scanExistingDuplicates(threshold = 55): ExistingDuplicateConflict[] {
  const list = window.studies || [];
  const conflicts: ExistingDuplicateConflict[] = [];
  const seenPairKeys = new Set<string>();

  for (let i = 0; i < list.length; i++) {
    const studyA = list[i];
    if (!studyA || !studyA.id) continue;

    for (let j = i + 1; j < list.length; j++) {
      const studyB = list[j];
      if (!studyB || !studyB.id || studyA.id === studyB.id) continue;

      const pairKey = [studyA.id, studyB.id].sort().join(':::');
      if (seenPairKeys.has(pairKey)) continue;

      // 1. Kiểm tra trỏ cùng file MDX
      const sameFile = !!(studyA.file && studyB.file && studyA.file.trim().toLowerCase() === studyB.file.trim().toLowerCase());

      // 2. Kiểm tra Core Key (viết tắt / tên nghiên cứu)
      const coreA = window.extractCoreKey ? window.extractCoreKey(studyA.title) : '';
      const coreB = window.extractCoreKey ? window.extractCoreKey(studyB.title) : '';
      const sameCore = !!(coreA && coreB && coreA === coreB);

      // 3. Phép kiểm đối sánh đa yếu tố CDSS (v2 với additive scoring, minScore theo threshold)
      let dupResult = window.detectStudyDuplicate ? window.detectStudyDuplicate(studyA, [studyB], threshold) : null;

      let isDup = false;
      let score = 0;
      let level: 'exact' | 'high' | 'moderate' | 'near-similar' = 'moderate';
      let reasons: string[] = [];

      if (sameFile) {
        isDup = true;
        score = 100;
        level = 'exact';
        reasons.push(`Cùng liên kết bài tóm tắt: ${studyA.file}`);
      }

      if (sameCore) {
        isDup = true;
        score = 100;
        level = 'exact';
        reasons.push('Trùng khớp 100% Tiêu đề cốt lõi / Tên viết tắt nghiên cứu');
      }

      if (dupResult && dupResult.isDuplicate) {
        isDup = true;
        score = Math.max(score, dupResult.score);
        if (level !== 'exact' && dupResult.matchLevel && dupResult.matchLevel !== 'none') {
          level = dupResult.matchLevel;
        }
        if (dupResult.reasons && dupResult.reasons.length > 0) {
          dupResult.reasons.forEach(r => {
            if (!reasons.includes(r)) reasons.push(r);
          });
        }
      }

      if (isDup) {
        seenPairKeys.add(pairKey);

        // Đánh giá độ phong phú thông tin để chọn bản ghi chính ưu tiên giữ
        const scoreStudyCompleteness = (s: Study): number => {
          let pts = 0;
          if (s.file) pts += 25;
          if (s.summary && s.summary !== 'Không có kết luận') pts += 20;
          if (s.parts && Array.isArray(s.parts) && s.parts.length > 0) pts += 15;
          if (s.subgroups) pts += 10;
          if (s.keyResults) pts += 10;
          if (s.drug) pts += 5;
          if (s.primaryEndpoint) pts += 5;
          if (s.intervention) pts += 5;
          if ((s as any).journalMetrics) pts += 5;
          if (s.icd10 && (Array.isArray(s.icd10) ? s.icd10.length : 1)) pts += 5;
          return pts;
        };

        const compA = scoreStudyCompleteness(studyA);
        const compB = scoreStudyCompleteness(studyB);

        const primary = compB > compA ? studyB : studyA;
        const duplicate = compB > compA ? studyA : studyB;

        conflicts.push({
          id: `conflict_${conflicts.length + 1}`,
          studyA: primary,
          studyB: duplicate,
          score: Math.min(100, score),
          matchLevel: level,
          reasons: reasons.length > 0 ? reasons : ['Trùng lặp dữ liệu nghiên cứu'],
          action: level === 'near-similar' ? 'keep_both' : 'merge' // near-similar mặc định là "Giữ cả hai" để an toàn
        });
      }
    }
  }

  return conflicts;
}

export function openDuplicateScanModal(): void {
  duplicateModalMode = 'scan';
  const modal = document.getElementById('duplicate-resolution-modal');
  if (!modal) return;

  const modalTitle = document.getElementById('dup-modal-title') || modal.querySelector('.modal-header h3');
  if (modalTitle) {
    modalTitle.innerHTML = '🛡️ Lọc Trùng Nghiên Cứu — Quét Kho Dữ Liệu';
  }

  // Render thanh điều chỉnh độ nhạy phát hiện
  const headerEl = document.getElementById('dup-modal-header-extra') || (() => {
    const header = modal.querySelector('.modal-header');
    if (!header) return null;
    let extra = document.getElementById('dup-modal-header-extra');
    if (!extra) {
      extra = document.createElement('div');
      extra.id = 'dup-modal-header-extra';
      extra.style.cssText = 'padding: 10px 20px 8px; background: var(--surface-2, #f8fafc); border-bottom: 1px solid var(--border-light); display: flex; align-items: center; gap: 12px; flex-wrap: wrap;';
      header.after(extra);
    }
    return extra;
  })();

  if (headerEl) {
    headerEl.innerHTML = `
      <div style="display:flex; align-items:center; gap:10px; flex:1; flex-wrap:wrap;">
        <label style="font-size:0.78rem; font-weight:700; color:var(--text); white-space:nowrap;">
          🎚️ Độ nhạy phát hiện:
        </label>
        <div style="display:flex; align-items:center; gap:8px; flex:1; min-width:200px;">
          <span style="font-size:0.72rem; color:var(--text-muted); white-space:nowrap;">Chặt chẽ</span>
          <input type="range" id="dup-scan-threshold-slider" min="38" max="90" step="1"
            value="${currentScanThreshold}"
            style="flex:1; accent-color: var(--color-primary, #0284c7); cursor:pointer;"
            oninput="document.getElementById('dup-scan-threshold-label').textContent = this.value + '%'; rescanWithThreshold(parseInt(this.value))"
          />
          <span style="font-size:0.72rem; color:var(--text-muted); white-space:nowrap;">Mở rộng</span>
          <span id="dup-scan-threshold-label" style="font-size:0.8rem; font-weight:800; color:var(--color-primary,#0284c7); min-width:36px; text-align:center;">${currentScanThreshold}%</span>
        </div>
        <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
          <span style="font-size:0.7rem; font-weight:600; padding:2px 7px; border-radius:10px; background:#fef2f2; color:#dc2626; border:1px solid #fecaca;">🔴 Chính xác 100%</span>
          <span style="font-size:0.7rem; font-weight:600; padding:2px 7px; border-radius:10px; background:#fff7ed; color:#ea580c; border:1px solid #fed7aa;">🟠 Cao ≥75%</span>
          <span style="font-size:0.7rem; font-weight:600; padding:2px 7px; border-radius:10px; background:#fefce8; color:#ca8a04; border:1px solid #fef08a;">🟡 Vừa ≥55%</span>
          <span style="font-size:0.7rem; font-weight:600; padding:2px 7px; border-radius:10px; background:#eff6ff; color:#2563eb; border:1px solid #bfdbfe;">🔵 Sát giống ≥38%</span>
        </div>
      </div>
    `;
  }

  existingDupConflicts = scanExistingDuplicates(currentScanThreshold);
  modal.classList.add('active');
  renderDuplicateScanItems();
}

export function renderDuplicateScanItems(): void {
  const bannerEl = document.getElementById('dup-summary-banner');
  const containerEl = document.getElementById('dup-items-container');
  const actionBar = document.getElementById('dup-action-bar');
  const confirmBtn = document.getElementById('dup-confirm-btn');
  if (!containerEl) return;

  const totalStudies = (window.studies || []).length;
  const count = existingDupConflicts.length;

  if (count === 0) {
    if (bannerEl) {
      bannerEl.innerHTML = `
        <div style="width: 100%; text-align: center; padding: 1.5rem 0;">
          <div style="font-size: 2.4rem; margin-bottom: 0.6rem;">🎉</div>
          <div style="font-size: 1.1rem; font-weight: 800; color: var(--color-success, #16a34a); margin-bottom: 6px;">
            Kho Dữ Liệu Sạch Sẽ — Không Phát Hiện Nghiên Cứu Trùng Lặp!
          </div>
          <div style="font-size: 0.84rem; color: var(--text-muted); max-width: 540px; margin: 0 auto 1.25rem; line-height: 1.5;">
            Hệ thống đã quét toàn diện toàn bộ <strong>${totalStudies}</strong> hướng dẫn & thử nghiệm lâm sàng hiện có trong kho. Tất cả bản ghi đều độc lập và duy nhất về tiêu đề cốt lõi, năm công bố, mã ICD-10 và nguồn tổ chức.
          </div>
          <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(22, 163, 74, 0.1); color: var(--color-success, #16a34a); border: 1px solid rgba(22, 163, 74, 0.25); padding: 6px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 700;">
            <i class="fa-solid fa-circle-check"></i> 100% Dữ liệu chuẩn hóa (Không có trùng lặp)
          </div>
        </div>
      `;
    }
    if (actionBar) actionBar.style.display = 'none';
    containerEl.innerHTML = '';
    if (confirmBtn) confirmBtn.style.display = 'none';
    return;
  }

  if (confirmBtn) {
    confirmBtn.style.display = '';
    confirmBtn.textContent = '✅ Xác Nhận Lọc Trùng & Làm Sạch';
  }

  if (actionBar) {
    actionBar.style.display = 'flex';
    actionBar.innerHTML = `
      <div style="font-size: 0.8rem; font-weight: 700; color: var(--text);">⚡ Thao tác nhanh hàng loạt cho các cặp trùng:</div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button type="button" class="btn btn-small btn-primary" onclick="applyGlobalScanDupAction('merge')" style="font-size: 0.72rem; padding: 4px 10px;">🔄 Tự động hợp nhất tất cả</button>
        <button type="button" class="btn btn-small" onclick="applyGlobalScanDupAction('delete_b')" style="font-size: 0.72rem; padding: 4px 10px;">🗑️ Xóa tất cả bản sao thừa</button>
        <button type="button" class="btn btn-small" onclick="applyGlobalScanDupAction('keep_both')" style="font-size: 0.72rem; padding: 4px 10px;">⏭️ Giữ cả hai (Bỏ qua)</button>
      </div>
    `;
  }

  if (bannerEl) {
    bannerEl.innerHTML = `
      <div>
        <div style="font-size: 0.95rem; font-weight: 800; color: #dc2626;">
          🔍 Lọc Trùng Kho Dữ Liệu: Phát hiện ${count} cặp nghiên cứu có nguy cơ trùng lặp!
        </div>
        <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">
          Đã đối soát toàn bộ <strong>${totalStudies}</strong> bài trong hệ thống. Vui lòng chọn hành động xử lý cho từng cặp bên dưới:
        </div>
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <span class="dup-badge dup-badge-exact">⚠️ ${count} cặp trùng</span>
        <button type="button" class="btn btn-small" onclick="filterTableByDuplicateIds()" style="font-size: 0.72rem; padding: 4px 10px;" title="Xem các bài trùng trên bảng dữ liệu chính">
          📋 Xem trên bảng
        </button>
      </div>
    `;
  }

  let html = '';
  existingDupConflicts.forEach((conflict, idx) => {
    const sA = conflict.studyA;
    const sB = conflict.studyB;

    let badgeClass = 'dup-badge-new';
    let badgeLabel = '✨ Trùng nguy cơ vừa';
    let cardBorderColor = 'var(--accent, #ea580c)';
    let actionDefault = conflict.action || 'merge';

    if (conflict.matchLevel === 'exact') {
      badgeClass = 'dup-badge-exact';
      badgeLabel = '🔴 Trùng khớp 100%';
      cardBorderColor = '#dc2626';
    } else if (conflict.matchLevel === 'high') {
      badgeClass = 'dup-badge-high';
      badgeLabel = `🟠 Trùng nguy cơ cao (${conflict.score}%)`;
      cardBorderColor = '#ea580c';
    } else if (conflict.matchLevel === 'moderate') {
      badgeClass = 'dup-badge-moderate';
      badgeLabel = `🟡 Trùng nguy cơ vừa (${conflict.score}%)`;
      cardBorderColor = '#ca8a04';
    } else if ((conflict.matchLevel as any) === 'near-similar') {
      badgeClass = 'dup-badge-near';
      badgeLabel = `🔵 Sát giống — kiểm tra kỹ (${conflict.score}%)`;
      cardBorderColor = '#2563eb';
      actionDefault = 'keep_both'; // near-similar mặc định an toàn
    }

    html += `
      <div class="dup-item-card" style="border-left: 4px solid ${cardBorderColor};">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span style="font-weight: 800; font-size: 0.82rem; color: var(--text-muted);">#${idx + 1}</span>
            <span class="dup-badge ${badgeClass}">${badgeLabel}</span>
          </div>
          <details style="width:100%; margin-top:4px;">
            <summary style="font-size:0.73rem; color:var(--text-muted); cursor:pointer; font-weight:600; list-style:none; display:flex; align-items:center; gap:4px;">
              <span>▶ Lý do phát hiện (${conflict.reasons.length} tín hiệu)</span>
            </summary>
            <div style="margin-top:6px; padding:8px 10px; background:var(--surface-2,#f8fafc); border-radius:8px; border:1px solid var(--border-light);">
              ${conflict.reasons.map(r => `<div style="font-size:0.72rem; color:var(--text); padding:2px 0; line-height:1.4;">• ${escapeHtml(r)}</div>`).join('')}
            </div>
          </details>

          <div class="dup-action-selector" style="width:100%;">
            <span style="font-size:0.75rem; color:var(--text-muted);">Hành động:</span>
            <label>
              <input type="radio" name="scan_dup_action_${idx}" value="merge" ${(actionDefault === 'merge') ? 'checked' : ''} onchange="setPerScanItemDupAction(${idx}, 'merge')">
              <span>🔄 Hợp nhất vào Bài 1</span>
            </label>
            <label>
              <input type="radio" name="scan_dup_action_${idx}" value="delete_b" ${(actionDefault === 'delete_b') ? 'checked' : ''} onchange="setPerScanItemDupAction(${idx}, 'delete_b')">
              <span>🗑️ Xóa Bài 2</span>
            </label>
            <label>
              <input type="radio" name="scan_dup_action_${idx}" value="delete_a" ${(actionDefault === 'delete_a') ? 'checked' : ''} onchange="setPerScanItemDupAction(${idx}, 'delete_a')">
              <span>🗑️ Xóa Bài 1</span>
            </label>
            <label>
              <input type="radio" name="scan_dup_action_${idx}" value="keep_both" ${(actionDefault === 'keep_both') ? 'checked' : ''} onchange="setPerScanItemDupAction(${idx}, 'keep_both')">
              <span>⏭️ Giữ cả hai</span>
            </label>
          </div>
        </div>

        <div class="dup-comparison-grid">
          <div class="dup-subcard" style="border-color: var(--accent-light, #fed7aa);">
            <div class="dup-subcard-header" style="color: var(--accent, #ea580c); font-weight: 800;">
              💾 Bản Ghi 1 (Khuyên giữ - Chi tiết hơn)
            </div>
            <div class="dup-subcard-title">${escapeHtml(sA.title || 'Không có tiêu đề')}</div>
            <div class="dup-subcard-meta">
              <span>📅 Năm: <strong>${sA.year || 'N/A'}</strong></span>
              <span>🏛️ Nguồn: <strong>${escapeHtml(sA.organization || sA.journal || 'N/A')}</strong></span>
              <span>💊 Thuốc: <strong>${escapeHtml(sA.drug || sA.intervention || 'N/A')}</strong></span>
              <span>🎯 Endpoint: <strong>${escapeHtml((sA as any).primaryEndpoint || 'N/A')}</strong></span>
              <span>📝 File MDX: <strong>${sA.file ? `<span style="color:#16a34a; font-weight:700;">Có file</span>` : '<span style="color:var(--text-muted);">Không</span>'}</strong></span>
              <span>🔑 ID: <code style="font-size: 0.7rem;">${sA.id}</code></span>
            </div>
          </div>

          <div class="dup-subcard" style="background: var(--surface-2); border-color: var(--border-light);">
            <div class="dup-subcard-header" style="color: #dc2626; font-weight: 800;">
              ⚠️ Bản Ghi 2 (Trùng lặp / Thừa)
            </div>
            <div class="dup-subcard-title">${escapeHtml(sB.title || 'Không có tiêu đề')}</div>
            <div class="dup-subcard-meta">
              <span>📅 Năm: <strong>${sB.year || 'N/A'}</strong></span>
              <span>🏛️ Nguồn: <strong>${escapeHtml(sB.organization || sB.journal || 'N/A')}</strong></span>
              <span>💊 Thuốc: <strong>${escapeHtml(sB.drug || sB.intervention || 'N/A')}</strong></span>
              <span>🎯 Endpoint: <strong>${escapeHtml((sB as any).primaryEndpoint || 'N/A')}</strong></span>
              <span>📝 File MDX: <strong>${sB.file ? `<span style="color:#16a34a; font-weight:700;">Có file</span>` : '<span style="color:var(--text-muted);">Không</span>'}</strong></span>
              <span>🔑 ID: <code style="font-size: 0.7rem;">${sB.id}</code></span>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  containerEl.innerHTML = html;
}

export function applyGlobalScanDupAction(action: 'merge' | 'delete_b' | 'keep_both'): void {
  if (!existingDupConflicts || existingDupConflicts.length === 0) return;
  existingDupConflicts.forEach(c => {
    c.action = action;
  });
  renderDuplicateScanItems();
}

export function setPerScanItemDupAction(index: number, action: string): void {
  if (existingDupConflicts && existingDupConflicts[index]) {
    existingDupConflicts[index].action = action as any;
  }
}

export function executeDuplicateScanCleanup(): void {
  if (!existingDupConflicts || existingDupConflicts.length === 0) {
    closeDuplicateResolutionModal();
    return;
  }

  let mergedCount = 0;
  let deletedCount = 0;
  const idsToRemove = new Set<string>();

  existingDupConflicts.forEach(conflict => {
    const { studyA, studyB, action } = conflict;
    if (action === 'merge') {
      const idxA = (window.studies || []).findIndex(s => s.id === studyA.id);
      if (idxA !== -1) {
        const merged: Study = { ...window.studies[idxA] };
        if (!merged.file && studyB.file) merged.file = studyB.file;
        if ((!merged.summary || merged.summary === 'Không có kết luận') && studyB.summary) merged.summary = studyB.summary;
        if (!merged.parts && studyB.parts) merged.parts = studyB.parts;
        if (!merged.subgroups && studyB.subgroups) merged.subgroups = studyB.subgroups;
        if (!merged.drug && studyB.drug) merged.drug = studyB.drug;
        if (!merged.intervention && studyB.intervention) merged.intervention = studyB.intervention;
        if (!(merged as any).journalMetrics && (studyB as any).journalMetrics) (merged as any).journalMetrics = (studyB as any).journalMetrics;
        if (!merged.icd10 && studyB.icd10) merged.icd10 = studyB.icd10;
        window.studies[idxA] = merged;
      }
      idsToRemove.add(studyB.id);
      mergedCount++;
    } else if (action === 'delete_b') {
      idsToRemove.add(studyB.id);
      deletedCount++;
    } else if (action === 'delete_a') {
      idsToRemove.add(studyA.id);
      deletedCount++;
    }
  });

  if (idsToRemove.size > 0) {
    window.studies = (window.studies || []).filter(s => !idsToRemove.has(s.id));
    idsToRemove.forEach(id => {
      if (window.saveDeletedStudyId) window.saveDeletedStudyId(id);
    });

    try {
      const stored = localStorage.getItem('cliniportal_custom_studies');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter((s: any) => !idsToRemove.has(s.id));
          localStorage.setItem('cliniportal_custom_studies', JSON.stringify(filtered));
        }
      }
    } catch(e) {}
  }

  if (window.saveStudies) window.saveStudies();
  closeDuplicateResolutionModal();

  if (window.renderTable) window.renderTable();
  if (window.renderUpdates) window.renderUpdates();
  if (window.renderTimeline) window.renderTimeline();
  if (typeof (window as any).updateTabCounts === 'function') (window as any).updateTabCounts();

  if (window.showMedicalToast) {
    window.showMedicalToast({
      type: 'success',
      title: 'Lọc trùng hoàn tất',
      message: `🎉 Đã xử lý ${existingDupConflicts.length} cặp trùng lặp (Hợp nhất: ${mergedCount}, Loại bỏ: ${idsToRemove.size} bản ghi thừa)!`
    });
  } else {
    alert(`🎉 Lọc trùng hoàn tất!\n• Hợp nhất: ${mergedCount} bài\n• Loại bỏ: ${idsToRemove.size} bản ghi thừa.`);
  }
}

export function executeDuplicateResolutionAction(): void {
  if (duplicateModalMode === 'scan') {
    executeDuplicateScanCleanup();
  } else {
    executeDuplicateImport();
  }
}

export function filterTableByDuplicateIds(): void {
  if (!existingDupConflicts || existingDupConflicts.length === 0) return;
  const dupIds = new Set<string>();
  existingDupConflicts.forEach(c => {
    dupIds.add(c.studyA.id);
    dupIds.add(c.studyB.id);
  });
  closeDuplicateResolutionModal();
  if (window.switchTab) window.switchTab('list');

  if (!window.selectedIds) window.selectedIds = new Set<string>();
  window.selectedIds.clear();
  dupIds.forEach(id => window.selectedIds.add(id));

  if (window.updateFloatingCompareBar) window.updateFloatingCompareBar();
  if (window.renderTable) window.renderTable();

  const tableEl = document.getElementById('guidelines-table') || document.getElementById('studies-tbody');
  if (tableEl) tableEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (window.showMedicalToast) {
    window.showMedicalToast({
      type: 'info',
      title: 'Đã đánh dấu bài trùng',
      message: `Đã chọn ${dupIds.size} nghiên cứu có liên quan đến các cặp trùng lặp trên bảng dữ liệu.`
    });
  }
}

export function openConditionSettingsModal(): void {
  const modal = document.getElementById('condition-settings-modal');
  if (!modal) return;
  modal.classList.add('active');
  renderConditionManagementTable();
}

export function closeConditionSettingsModal(): void {
  const modal = document.getElementById('condition-settings-modal');
  if (modal) modal.classList.remove('active');
}

export function renderConditionManagementTable(): void {
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

export function openConditionEditModal(key?: string): void {
  const modal = document.getElementById('condition-edit-modal');
  if (!modal) return;

  const titleEl = document.getElementById('cond-form-modal-title');
  const keyInput = document.getElementById('cond-form-key') as HTMLInputElement | null;
  const nameInput = document.getElementById('cond-form-name') as HTMLInputElement | null;
  const icdInput = document.getElementById('cond-form-icd10') as HTMLInputElement | null;
  const colorInput = document.getElementById('cond-form-color') as HTMLInputElement | null;
  const bgInput = document.getElementById('cond-form-bg') as HTMLInputElement | null;
  const specSelect = document.getElementById('cond-form-specialty') as HTMLSelectElement | null;

  if (key && window.CLINICAL_CONDITIONS && window.CLINICAL_CONDITIONS[key]) {
    const cond = window.CLINICAL_CONDITIONS[key];
    if (titleEl) titleEl.textContent = '✏️ Chỉnh Sửa Vấn Đề / Bệnh';
    if (keyInput) keyInput.value = key;
    if (nameInput) nameInput.value = cond.name || '';
    if (icdInput) icdInput.value = Array.isArray(cond.icd10) ? cond.icd10.join(', ') : (cond.icd10 || '');
    if (colorInput) colorInput.value = cond.color || '#dc2626';
    if (bgInput) bgInput.value = cond.bg || '#fef2f2';
    if (specSelect) {
      const mapped = window.CONDITION_SPECIALTY_MAP ? window.CONDITION_SPECIALTY_MAP[key] : null;
      specSelect.value = cond.specialty || (mapped && mapped[0]) || '';
    }
  } else {
    if (titleEl) titleEl.textContent = '➕ Thêm Vấn Đề / Bệnh Mới';
    if (keyInput) keyInput.value = '';
    if (nameInput) nameInput.value = '';
    if (icdInput) icdInput.value = '';
    if (colorInput) colorInput.value = '#dc2626';
    if (bgInput) bgInput.value = '#fef2f2';
    if (specSelect) specSelect.value = '';
  }

  modal.classList.add('active');
}

export function closeConditionEditModal(): void {
  const modal = document.getElementById('condition-edit-modal');
  if (modal) modal.classList.remove('active');
}

export function handleSaveConditionForm(event?: Event): void {
  if (event) event.preventDefault();

  const key = (document.getElementById('cond-form-key') as HTMLInputElement | null)?.value.trim();
  const name = (document.getElementById('cond-form-name') as HTMLInputElement | null)?.value.trim();
  const icdRaw = (document.getElementById('cond-form-icd10') as HTMLInputElement | null)?.value.trim();
  const color = (document.getElementById('cond-form-color') as HTMLInputElement | null)?.value || '#dc2626';
  const bg = (document.getElementById('cond-form-bg') as HTMLInputElement | null)?.value || '#fef2f2';
  const specialty = (document.getElementById('cond-form-specialty') as HTMLSelectElement | null)?.value || undefined;

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
    bg: bg,
    specialty: specialty
  };

  if (specialty) {
    window.CONDITION_SPECIALTY_MAP = window.CONDITION_SPECIALTY_MAP || {};
    window.CONDITION_SPECIALTY_MAP[condKey] = [specialty];
  }

  try {
    localStorage.setItem('cliniportal_custom_conditions', JSON.stringify(window.CLINICAL_CONDITIONS));
  } catch (e) {}

  closeConditionEditModal();
  renderConditionManagementTable();
  if (window.renderFilterPills) window.renderFilterPills();
  alert('💾 Đã lưu cấu hình danh mục bệnh thành công!');
}

export function deleteConditionItem(key: string): void {
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

export function resetConditionRegistryDefault(): void {
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

const CHART_TYPE_LABELS: Record<string, string> = {
  forest : '🌲 Forest Plot',
  col    : '📊 Biểu đồ Cột',
  hbar   : '📉 Biểu đồ Ngang',
  comp   : '⚖️ So sánh 2 Nhóm',
  donut  : '🍩 Vòng Donut',
  text   : '📄 Văn bản thuần'
};

function detectChartType(text: string): string {
  if (!text || !text.trim()) return 'none';
  const t = text.trim();
  if (/^(?:COL|CỘT|BAR_V|COLUMN)\s*:/i.test(t))       return 'col';
  if (/^(?:HBAR|NGANG|BAR_H|HORIZONTAL)\s*:/i.test(t)) return 'hbar';
  if (/\b(HR|OR|RR|aHR|aOR|aRR)\s*[:=]?\s*[\d.]+/i.test(t)) return 'forest';
  if (/[\d.]+\s*%\s*(?:vs\.?|so với|versus)\s*[\d.]+\s*%/i.test(t)) return 'comp';
  if (/[\d.]+\s*%/.test(t)) return 'donut';
  return 'text';
}

export function updateChartPreview(): void {
  const inputEl = document.getElementById('study-key-results') as HTMLInputElement | null;
  const panel   = document.getElementById('chart-preview-panel');
  const body    = document.getElementById('chart-preview-body');
  const badge   = document.getElementById('chart-preview-type-badge');

  if (!inputEl || !panel || !body) return;
  const text = inputEl.value.trim();

  if (!text || !window.renderKeyResultsChart) {
    panel.style.display = 'none';
    return;
  }

  const chartHtml = window.renderKeyResultsChart(text);
  const type      = detectChartType(text);

  if (chartHtml) {
    body.innerHTML = chartHtml;
    if (badge) {
      badge.textContent    = CHART_TYPE_LABELS[type] || '📈 Biểu đồ';
      badge.style.display  = 'inline-block';
    }
  } else {
    body.innerHTML = `<div style="font-size:0.82rem;color:var(--text-muted);padding:4px 0;">
      📄 Hiển thị văn bản thuần — Không phát hiện cú pháp biểu đồ hợp lệ.
    </div>`;
    if (badge) {
      badge.textContent   = CHART_TYPE_LABELS.text;
      badge.style.display = 'inline-block';
    }
  }
  panel.style.display = 'block';
}

export function updateSubgroupPreview(): void {
  const textareaEl = document.getElementById('study-subgroups') as HTMLTextAreaElement | null;
  const panel      = document.getElementById('subgroup-preview-panel');
  const body       = document.getElementById('subgroup-preview-body');

  if (!textareaEl || !panel || !body || !window.renderSubgroupForestPlot) return;
  const raw = textareaEl.value.trim();

  if (!raw) {
    panel.style.display = 'none';
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || Array.isArray(parsed) || !Object.keys(parsed).length) {
      panel.style.display = 'none';
      return;
    }
    const chartHtml = window.renderSubgroupForestPlot(parsed);
    if (chartHtml) {
      body.innerHTML      = chartHtml;
      panel.style.display = 'block';
    } else {
      panel.style.display = 'none';
    }
  } catch (e) {
    panel.style.display = 'none';
  }
}

function escapeHtml(str?: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

if (typeof window !== 'undefined') {
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
  window.importFromText = importFromText;
  window.handleFileSelect = handleFileSelect;
  window.fillSampleJSON = fillSampleJSON;
  window.openDuplicateResolutionModal = openDuplicateResolutionModal;
  window.closeDuplicateResolutionModal = closeDuplicateResolutionModal;
  window.applyGlobalDupAction = applyGlobalDupAction;
  window.setPerItemDupAction = setPerItemDupAction;
  window.executeDuplicateImport = executeDuplicateImport;
  window.openDuplicateScanModal = openDuplicateScanModal;
  window.executeDuplicateScanCleanup = executeDuplicateScanCleanup;
  window.applyGlobalScanDupAction = applyGlobalScanDupAction;
  window.setPerScanItemDupAction = setPerScanItemDupAction;
  window.executeDuplicateResolutionAction = executeDuplicateResolutionAction;
  window.filterTableByDuplicateIds = filterTableByDuplicateIds;
  window.rescanWithThreshold = rescanWithThreshold;
  window.openConditionSettingsModal = openConditionSettingsModal;
  window.closeConditionSettingsModal = closeConditionSettingsModal;
  window.renderConditionManagementTable = renderConditionManagementTable;
  window.openConditionEditModal = openConditionEditModal;
  window.closeConditionEditModal = closeConditionEditModal;
  window.handleSaveConditionForm = handleSaveConditionForm;
  window.deleteConditionItem = deleteConditionItem;
  window.resetConditionRegistryDefault = resetConditionRegistryDefault;
  window.updateChartPreview = updateChartPreview;
  window.updateSubgroupPreview = updateSubgroupPreview;
  window.updateConditionDropdownOptions = updateConditionDropdownOptions;
  window.handleSpecialtySelectChange = handleSpecialtySelectChange;
  window.handleConditionSelectChange = handleConditionSelectChange;
}

export function updateConditionDropdownOptions(preferredConditionKey?: string): void {
  const condSelect = (document.getElementById('study-condition-key') || document.getElementById('form-condition-key')) as HTMLSelectElement | null;
  if (!condSelect) return;

  const spec1 = getValueFromIds('study-specialty', 'form-specialty');
  const spec2 = getValueFromIds('study-specialty-2', 'form-specialty-2');
  const selectedSpecs = [spec1, spec2].filter(Boolean);

  if (!window.CLINICAL_CONDITIONS) {
    condSelect.innerHTML = '<option value="">-- Chọn Vấn đề / Bệnh --</option>';
    return;
  }

  if (selectedSpecs.length === 0) {
    condSelect.innerHTML = '<option value="">-- Vui lòng chọn chuyên khoa trước --</option>';
    return;
  }

  const specMap = window.CONDITION_SPECIALTY_MAP || {};
  const matchingEntries = Object.entries(window.CLINICAL_CONDITIONS).filter(([key, cond]) => {
    const mappedSpecs = specMap[key];
    if (Array.isArray(mappedSpecs)) {
      return mappedSpecs.some((s: string) => selectedSpecs.includes(s));
    }
    if (typeof mappedSpecs === 'string') {
      return selectedSpecs.includes(mappedSpecs);
    }
    if (cond.specialty) {
      return selectedSpecs.includes(cond.specialty);
    }
    return false;
  });

  matchingEntries.sort((a, b) => a[1].name.localeCompare(b[1].name, 'vi'));

  let html = '<option value="">-- Chọn Vấn đề / Bệnh tương ứng --</option>';
  matchingEntries.forEach(([key, cond]) => {
    const isSel = (preferredConditionKey && preferredConditionKey === key) ? 'selected' : '';
    html += `<option value="${key}" ${isSel}>${cond.name}</option>`;
  });

  condSelect.innerHTML = html;

  if (preferredConditionKey) {
    condSelect.value = preferredConditionKey;
  }
}

export function handleSpecialtySelectChange(): void {
  const currentCond = getValueFromIds('study-condition-key', 'form-condition-key');
  updateConditionDropdownOptions(currentCond);
}

export function handleConditionSelectChange(condKey: string): void {
  if (!condKey || !window.CLINICAL_CONDITIONS) return;
  const cond = window.CLINICAL_CONDITIONS[condKey];
  if (cond && cond.icd10) {
    const icdInput = (document.getElementById('study-icd10') || document.getElementById('form-icd10')) as HTMLInputElement | null;
    if (icdInput) {
      const icdStr = Array.isArray(cond.icd10) ? cond.icd10.join(', ') : String(cond.icd10);
      icdInput.value = icdStr;
    }
  }
}

export function updateSyncModalStats(): void {
  const stats = (typeof window.getSyncStats === 'function')
    ? window.getSyncStats()
    : { staticCount: (window.SAMPLE_STUDIES || []).length, customCount: 0, deletedCount: 0, totalCount: (window.studies || []).length, bookmarkedCount: 0 };

  const elStatic = document.getElementById('sync-stat-static');
  const elCustom = document.getElementById('sync-stat-custom');
  const elDeleted = document.getElementById('sync-stat-deleted');
  const elTotal = document.getElementById('sync-stat-total');

  if (elStatic) elStatic.textContent = String(stats.staticCount);
  if (elCustom) elCustom.textContent = String(stats.customCount);
  if (elDeleted) elDeleted.textContent = String(stats.deletedCount);
  if (elTotal) elTotal.textContent = String(stats.totalCount);
}

export function closeSyncManagementModal(): void {
  const modal = document.getElementById('sync-management-modal');
  if (modal) modal.classList.remove('active');
}

export function openSyncManagementModal(): void {
  let modal = document.getElementById('sync-management-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'sync-management-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal" style="max-width: 640px; width: 92%;">
        <div class="modal-header">
          <h3 style="display:flex; align-items:center; gap:8px; margin:0;">
            <i class="fa-solid fa-arrows-rotate" style="color:var(--color-primary, #0284c7);"></i>
            Đồng Bộ &amp; Quản Lý Bộ Nhớ Guidelines
          </h3>
          <button class="modal-close" onclick="closeSyncManagementModal()">&times;</button>
        </div>
        <div class="modal-body" style="padding: 1.25rem;">
          <!-- Status Grid -->
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-bottom: 1.25rem;">
            <div style="background:var(--color-surface-2, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:10px; text-align:center;">
              <div style="font-size:0.75rem; color:var(--color-text-muted, #64748b);">Kho gốc GitHub</div>
              <div style="font-size:1.35rem; font-weight:800; color:var(--color-primary, #0284c7);" id="sync-stat-static">--</div>
            </div>
            <div style="background:var(--color-surface-2, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:10px; text-align:center;">
              <div style="font-size:0.75rem; color:var(--color-text-muted, #64748b);">Bài tự tạo (Custom)</div>
              <div style="font-size:1.35rem; font-weight:800; color:#10b981;" id="sync-stat-custom">--</div>
            </div>
            <div style="background:var(--color-surface-2, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:10px; text-align:center;">
              <div style="font-size:0.75rem; color:var(--color-text-muted, #64748b);">Đã ẩn/xóa cục bộ</div>
              <div style="font-size:1.35rem; font-weight:800; color:#ef4444;" id="sync-stat-deleted">--</div>
            </div>
            <div style="background:var(--color-surface-2, #f8fafc); border:1px solid var(--color-border, #e2e8f0); border-radius:10px; padding:10px; text-align:center;">
              <div style="font-size:0.75rem; color:var(--color-text-muted, #64748b);">Tổng đang nạp</div>
              <div style="font-size:1.35rem; font-weight:800; color:var(--color-text, #0f172a);" id="sync-stat-total">--</div>
            </div>
          </div>

          <!-- Explanation Alert -->
          <div style="background:rgba(2, 132, 199, 0.08); border:1px solid rgba(2, 132, 199, 0.25); border-radius:10px; padding:12px; font-size:0.84rem; line-height:1.55; margin-bottom:1.25rem; color:var(--color-text, #1e293b);">
            <div style="font-weight:700; display:flex; align-items:center; gap:6px; margin-bottom:4px; color:var(--color-primary, #0284c7);">
              <i class="fa-solid fa-circle-question"></i> Vì sao số bài trên Web và Di động có thể khác nhau?
            </div>
            1. <strong>Bộ nhớ đệm (Cache):</strong> Trình duyệt di động lưu file rất lâu. Bấm nút dưới để xóa sạch Service Worker Cache và nhận bản mới nhất từ GitHub.<br>
            2. <strong>Dữ liệu riêng (localStorage):</strong> Bài tự thêm hoặc bấm nút Xóa chỉ lưu trên máy này, máy khác sẽ không có nếu chưa đồng bộ file.
          </div>

          <!-- Action Buttons -->
          <div style="display:flex; flex-direction:column; gap:10px;">
            <button class="btn btn-primary" id="btn-force-github-refresh" style="width:100%; justify-content:center; padding:10px 14px; font-size:0.9rem; font-weight:700; display:flex; align-items:center; gap:8px;">
              <i class="fa-solid fa-cloud-arrow-down"></i>
              <span>Làm Mới &amp; Xóa Sạch Cache Từ GitHub Ngay (1-Chạm)</span>
            </button>
            <div style="font-size:0.75rem; color:var(--color-text-muted, #64748b); text-align:center; margin-top:-4px;">
              Khuyên dùng khi số lượng bài trên di động ít hơn máy tính. Giữ nguyên bookmark của bạn.
            </div>

            <div style="display:flex; gap:10px; margin-top:8px;">
              <button class="btn btn-outline" id="btn-hard-reset-storage" style="flex:1; justify-content:center; font-size:0.82rem; padding:8px 10px; border-color:var(--color-danger, #ef4444); color:var(--color-danger, #ef4444);">
                <i class="fa-solid fa-rotate-left"></i> Khôi phục kho gốc 100%
              </button>
              <button class="btn btn-outline" id="btn-reset-filters-modal" style="flex:1; justify-content:center; font-size:0.82rem; padding:8px 10px;">
                <i class="fa-solid fa-filter-circle-xmark"></i> Đặt lại bộ lọc
              </button>
            </div>
            <div style="font-size:0.75rem; color:var(--color-text-muted, #64748b); text-align:center; margin-top:-4px;">
              "Khôi phục kho gốc 100%" sẽ hủy các bài bạn từng bấm ẩn/xóa cục bộ trên thiết bị này.
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeSyncManagementModal();
    });

    const refreshBtn = modal.querySelector('#btn-force-github-refresh') as HTMLButtonElement | null;
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        refreshBtn.disabled = true;
        refreshBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang dọn cache & tải lại...';
        if (typeof window.forceRefreshFromGitHub === 'function') {
          window.forceRefreshFromGitHub({ resetLocalDelta: false });
        }
      });
    }

    const hardResetBtn = modal.querySelector('#btn-hard-reset-storage') as HTMLButtonElement | null;
    if (hardResetBtn) {
      hardResetBtn.addEventListener('click', () => {
        if (confirm('Bạn có chắc chắn muốn khôi phục kho gốc? Thao tác này sẽ xóa danh sách các bài bạn từng bấm ẩn/xóa trên thiết bị này để hiện đủ 100% tài liệu từ GitHub.')) {
          if (typeof window.resetAllLocalOverrides === 'function') {
            window.resetAllLocalOverrides();
            updateSyncModalStats();
          }
        }
      });
    }

    const resetFiltersBtn = modal.querySelector('#btn-reset-filters-modal') as HTMLButtonElement | null;
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        if (typeof window.resetFilters === 'function') {
          window.resetFilters();
        }
        if (typeof (window as any).switchTab === 'function') {
          (window as any).switchTab('list');
        }
        closeSyncManagementModal();
        if (typeof window.showMedicalToast === 'function') {
          window.showMedicalToast({
            type: 'info',
            title: 'Đã đặt lại bộ lọc',
            message: 'Đã xóa mọi điều kiện lọc và trở về danh sách đầy đủ.'
          });
        }
      });
    }
  }

  updateSyncModalStats();
  modal.classList.add('active');
}

if (typeof window !== 'undefined') {
  window.openSyncManagementModal = openSyncManagementModal;
  window.closeSyncManagementModal = closeSyncManagementModal;
}
