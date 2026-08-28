/**
 * CliniPortal 2.0 — Guidelines Modals & Import/Export (TypeScript)
 * Path: src/content/ebm/guidelines/js/guideline-modals.ts
 */

import { Study, BatchDuplicateItem } from './guidelines-types';

import './guidelines-types';

let editingStudyId: string | null = null;
let pendingImportBatch: BatchDuplicateItem[] = [];

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

  const studyData: Study = {
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
    sourceUrl: getValueFromIds('study-source-url', 'form-sourceUrl'),
    file: finalFile,
    parts: partsList.length > 0 ? partsList : undefined,
    icd10: icdList,
    asianData: getCheckboxFromIds('study-asian-data', 'form-asianData'),
    bookmarked: false,
    createdAt: new Date().toISOString()
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

  const checkedBatch: BatchDuplicateItem[] = window.batchCheckDuplicates ? window.batchCheckDuplicates(rawArray, window.studies) : rawArray.map(item => ({
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
  const modal = document.getElementById('duplicate-resolution-modal');
  if (!modal) return;
  modal.classList.add('active');
  renderDuplicateResolutionItems();
}

export function closeDuplicateResolutionModal(): void {
  const modal = document.getElementById('duplicate-resolution-modal');
  if (modal) modal.classList.remove('active');
  pendingImportBatch = [];
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
  if (!containerEl) return;

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
        id: matched.id
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

  alert(`🎉 Phép kiểm hoàn tất & đã thực thi nạp dữ liệu!\n• Thêm mới thành công: ${addedCount} bài\n• Ghi đè / Cập nhật: ${overwrittenCount} bài\n• Bỏ qua bài trùng: ${skippedCount} bài.`);
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
}
