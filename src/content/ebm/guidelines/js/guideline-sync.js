/**
 * guideline-sync.js
 * Quản lý Data Store, Trạng thái Supabase & LocalStorage Sync
 * Pure HTML5 / Vanilla CSS3 / ES6+ JavaScript
 */

(function () {
  'use strict';

  // Global State Stores
  window.studies = window.studies || [];
  window.selectedIds = window.selectedIds || new Set();
  window.expandedIds = window.expandedIds || new Set();
  window.isMobileView = window.innerWidth <= 768;

  // View state
  window.viewMode = window.viewMode || 'compact'; // 'full' or 'compact'
  window.currentTab = window.currentTab || 'list'; // 'list', 'saved', 'compare', 'analytics', 'timeline'
  window.showAdvancedFilters = window.showAdvancedFilters || false;

  // Supabase state
  window.supabaseClient = window.supabaseClient || null;
  window.supabaseConfig = window.supabaseConfig || { url: '', key: '' };
  window.dbStatus = window.dbStatus || 'disconnected'; // 'connected', 'disconnected', 'error'

  // Columns visibility state
  window.columnVisibility = window.columnVisibility || {
    sourceType: true,
    specialty: true,
    design: true,
    organization: true,
    intervention: true,
    primaryEndpoint: true,
    keyResults: true,
    impact: true,
    conclusion: true,
    sampleSize: true,
    population: true,
    icd10: true
  };

  // Filter values
  window.filters = window.filters || {
    search: '',
    sourceType: null,
    specialty: null,
    condition: null,
    design: null,
    impact: null,
    period: null,
    asianData: false,
    hasSubgroup: false,
    hasSummary: false,
    icd10: null
  };

  window.sortField = window.sortField || 'title';
  window.sortAsc = window.sortAsc !== undefined ? window.sortAsc : true;

  function resolveStudyFile(filePath) {
    if (!filePath) return '';
    return filePath.replace(/^Kho Guidelines\//i, 'kho-guidelines/');
  }

  function getIcd10Name(code) {
    if (!code) return '';
    const cleanCode = code.trim().toUpperCase();
    if (!window.ICD10_MAP && window.ICD10_DATA && Array.isArray(window.ICD10_DATA)) {
      window.ICD10_MAP = new Map();
      window.ICD10_DATA.forEach(item => {
        if (item.code) window.ICD10_MAP.set(item.code.trim().toUpperCase(), item.name);
      });
    }
    if (window.ICD10_MAP && window.ICD10_MAP.has(cleanCode)) {
      return window.ICD10_MAP.get(cleanCode);
    }
    return '';
  }

  // ════════════════════════════════════════════════════════════════
  // SUPABASE CONFIG & SYNC (Account Isolation & Data Privacy)
  // ════════════════════════════════════════════════════════════════

  function initSupabase() {
    const url = localStorage.getItem('supabaseUrl');
    const key = localStorage.getItem('supabaseKey');
    
    if (url && key && window.supabase) {
      window.supabaseConfig = { url, key };
      try {
        window.supabaseClient = window.supabase.createClient(url, key);
        updateSupabaseStatus('connected', 'Supabase: Connected');
        return true;
      } catch (err) {
        console.error('Supabase initialization failed:', err);
        updateSupabaseStatus('error', 'Supabase: Conn Error');
        return false;
      }
    } else {
      window.supabaseClient = null;
      updateSupabaseStatus('disconnected', 'Supabase: Ngoại tuyến (Chưa đăng nhập)');
      return false;
    }
  }

  function updateSupabaseStatus(status, text) {
    window.dbStatus = status;
    const dot = document.getElementById('supabase-status-dot');
    const txt = document.getElementById('supabase-status-text');
    if (dot && txt) {
      txt.textContent = text;
      if (status === 'connected') {
        dot.style.background = '#22c55e'; // Green
      } else if (status === 'error') {
        dot.style.background = '#ef4444'; // Red
      } else {
        dot.style.background = '#94a3b8'; // Gray
      }
    }
  }

  function openSupabaseModal() {
    const url = localStorage.getItem('supabaseUrl') || '';
    const key = localStorage.getItem('supabaseKey') || '';
    const urlInput = document.getElementById('sb-url');
    const keyInput = document.getElementById('sb-key');
    if (urlInput) urlInput.value = url;
    if (keyInput) keyInput.value = key;
    const modal = document.getElementById('supabase-modal');
    if (modal) modal.classList.add('active');
  }

  function closeSupabaseModal() {
    const modal = document.getElementById('supabase-modal');
    if (modal) modal.classList.remove('active');
  }

  function saveSupabaseConfig(event) {
    if (event) event.preventDefault();
    const urlInput = document.getElementById('sb-url');
    const keyInput = document.getElementById('sb-key');
    const url = urlInput ? urlInput.value.trim() : '';
    const key = keyInput ? keyInput.value.trim() : '';
    
    if (!url || !key) {
      alert('⚠️ Vui lòng nhập đầy đủ Supabase URL và Anon Key!');
      return;
    }

    localStorage.setItem('supabaseUrl', url);
    localStorage.setItem('supabaseKey', key);
    
    alert('🔑 Đã lưu cấu hình và kết nối tài khoản Supabase thành công!');
    closeSupabaseModal();
    
    if (initSupabase()) {
      syncStudiesWithSupabase();
    }
  }

  function clearSupabaseConfig() {
    if (confirm('🔒 Bạn có chắc chắn muốn đăng xuất tài khoản Supabase? Tất cả dữ liệu nghiên cứu thuộc tài khoản này sẽ tự động xóa khỏi thiết bị hiện tại.')) {
      localStorage.removeItem('supabaseUrl');
      localStorage.removeItem('supabaseKey');
      localStorage.removeItem('clinicalGuidelines');
      localStorage.removeItem('internalMedicineStudies');
      localStorage.removeItem('cliniportal_custom_studies');
      localStorage.removeItem('cliniportal_deleted_study_ids');
      localStorage.removeItem('cliniportal_custom_conditions');
      
      if (window.DEFAULT_CLINICAL_CONDITIONS) {
        window.CLINICAL_CONDITIONS = JSON.parse(JSON.stringify(window.DEFAULT_CLINICAL_CONDITIONS));
      } else {
        window.CLINICAL_CONDITIONS = {};
      }

      const urlInput = document.getElementById('sb-url');
      const keyInput = document.getElementById('sb-key');
      if (urlInput) urlInput.value = '';
      if (keyInput) keyInput.value = '';
      
      window.supabaseClient = null;
      window.supabaseConfig = { url: '', key: '' };
      
      window.selectedIds.clear();
      window.expandedIds.clear();
      loadStudies();
      
      closeSupabaseModal();
      updateSupabaseStatus('disconnected', 'Supabase: Ngoại tuyến (Chưa đăng nhập)');
      if (window.renderFilterPills) window.renderFilterPills();
      if (window.renderTimeline) window.renderTimeline();
      if (window.renderTable) window.renderTable();
      if (window.renderUpdates) window.renderUpdates();
      alert('🔒 Đã đăng xuất thành công! Dữ liệu nghiên cứu và danh mục bệnh cá nhân đã được xóa sạch khỏi thiết bị hiện tại.');
    }
  }

  async function syncStudiesWithSupabase() {
    if (!window.supabaseClient) {
      loadStudies();
      if (window.renderTable) window.renderTable();
      if (window.renderUpdates) window.renderUpdates();
      return;
    }
    
    updateSupabaseStatus('connected', 'Supabase: Đang tải...');
    try {
      const { data, error } = await window.supabaseClient
        .from('clinical_guidelines')
        .select('*')
        .order('createdAt', { ascending: false });
        
      if (error) throw error;
      
      if (data) {
        const remoteStudies = data.map(s => processStudyFields(s));
        const combined = [...remoteStudies, ...(window.SAMPLE_STUDIES || [])];
        window.studies = processAndDeduplicateStudies(combined);
        window.studies.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        
        saveStudies();
        if (window.renderTable) window.renderTable();
        if (window.renderUpdates) window.renderUpdates();
        updateSupabaseStatus('connected', `Supabase: Đã nạp ${window.studies.length} bài`);
      }
    } catch (err) {
      console.error('Supabase Sync failed:', err);
      loadStudies();
      if (window.renderTable) window.renderTable();
      if (window.renderUpdates) window.renderUpdates();
      updateSupabaseStatus('error', 'Supabase: Conn Error');
    }
  }

  async function dbSaveStudy(study) {
    if (!window.supabaseClient) return;
    try {
      const payload = {
        id: study.id,
        title: study.title,
        author: study.author,
        drug: study.drug,
        sourceType: study.sourceType,
        specialty: study.specialty,
        design: study.design,
        intervention: study.intervention || '',
        primaryEndpoint: study.primaryEndpoint || '',
        keyResults: study.keyResults || '',
        impact: study.impact,
        year: study.year,
        organization: study.organization,
        phase: study.phase,
        sampleSize: study.sampleSize,
        population: study.population,
        summary: study.summary,
        detailedConclusion: study.detailedConclusion,
        fdaStatus: study.fdaStatus,
        sourceUrl: study.sourceUrl,
        file: study.file,
        asianData: study.asianData,
        bookmarked: study.bookmarked,
        parts: study.parts ? (typeof study.parts === 'string' ? study.parts : JSON.stringify(study.parts)) : null,
        icd10: study.icd10 ? (typeof study.icd10 === 'string' ? study.icd10 : JSON.stringify(study.icd10)) : null,
        subgroups: study.subgroups ? (typeof study.subgroups === 'object' ? JSON.stringify(study.subgroups) : study.subgroups) : null,
        createdAt: study.createdAt || new Date().toISOString()
      };

      let { error } = await window.supabaseClient
        .from('clinical_guidelines')
        .upsert(payload, { onConflict: 'id' });

      if (error && (error.code === 'PGRST204' || (error.message && error.message.toLowerCase().includes('column')))) {
        console.warn('Supabase schema missing optional columns, retrying with core payload:', error);
        const corePayload = { ...payload };
        delete corePayload.parts;
        delete corePayload.icd10;
        delete corePayload.subgroups;
        const retryRes = await window.supabaseClient
          .from('clinical_guidelines')
          .upsert(corePayload, { onConflict: 'id' });
        error = retryRes.error;
      }

      if (error) throw error;
      console.log('Saved to Supabase successfully');
      updateSupabaseStatus('connected', `Supabase: Đã lưu bài thành công`);
    } catch (err) {
      console.error('Failed to save to Supabase:', err);
      updateSupabaseStatus('error', 'Lỗi Supabase: ' + (err.message || err.details || 'Save Failed'));
      alert('⚠️ Không thể lưu lên Supabase: ' + (err.message || 'Kiểm tra lại quyền truy cập hoặc kết nối!'));
    }
  }

  async function dbDeleteStudy(id) {
    if (!window.supabaseClient || !id) return;
    try {
      await window.supabaseClient
        .from('clinical_guidelines')
        .delete()
        .eq('id', id);
      console.log('Deleted from Supabase successfully');
    } catch (err) {
      console.error('Failed to delete from Supabase:', err);
      updateSupabaseStatus('error', 'Supabase: Delete Failed');
    }
  }

  // ════════════════════════════════════════════════════════════════
  // DATA MIGRATION & LOCAL STORAGE
  // ════════════════════════════════════════════════════════════════

  function normalizeMedicalTitle(str) {
    if (!str) return '';
    const yearMatch = str.match(/\b(19\d{2}|20\d{2})\b/);
    const yearStr = yearMatch ? yearMatch[1] : '';

    let base = str.replace(/\([^)]*\)/g, ' ').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'd')
      .replace(/\b(ve|va|o|cho|truoc|sau|tren|duoi)\b/g, ' ')
      .replace(/[^a-z0-9]/g, '');

    return base + (yearStr ? '_' + yearStr : '');
  }

  function getDeletedStudyIds() {
    try {
      const raw = localStorage.getItem('cliniportal_deleted_study_ids');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed.filter(item => typeof item === 'string');
        }
      }
    } catch (e) {}
    return [];
  }

  function saveDeletedStudyId(id) {
    if (!id) return;
    const list = getDeletedStudyIds();
    if (!list.includes(id)) list.push(id);
    localStorage.setItem('cliniportal_deleted_study_ids', JSON.stringify(list));
  }

  function isStudyDeleted(study, deletedList) {
    if (!study || !study.id) return false;
    const list = deletedList || getDeletedStudyIds();
    if (!list || list.length === 0) return false;
    return list.includes(study.id);
  }

  function extractCoreKey(title) {
    if (!title) return '';
    const parenMatch = title.match(/\(([^)]+)\)/);
    if (parenMatch) {
      const inside = parenMatch[1].trim();
      if (inside.length >= 4) return normalizeMedicalTitle(inside);
    }
    return normalizeMedicalTitle(title);
  }

  function processStudyFields(s) {
    if (!s) return s;
    let defaultSourceType = s.sourceType || 'intl-study';
    let defaultDesign = s.design || 'rct';
    
    if (!s.sourceType) {
      if (s.organization && (s.organization.toLowerCase().includes('byt') || s.organization.toLowerCase().includes('bộ y tế'))) {
        defaultSourceType = 'vn-moh';
        defaultDesign = 'guideline';
      } else if (s.organization && (s.organization.toLowerCase().includes('sở y tế') || s.organization.toLowerCase().includes('syt'))) {
        defaultSourceType = 'vn-doh';
        defaultDesign = 'guideline';
      } else if (s.organization && (s.organization.toLowerCase().includes('vnha') || s.organization.toLowerCase().includes('hội'))) {
        defaultSourceType = 'vn-association';
        defaultDesign = 'guideline';
      } else if (s.phase && s.phase.toLowerCase().includes('guideline')) {
        defaultSourceType = 'intl-guideline';
        defaultDesign = 'guideline';
      }
    }

    return {
      ...s,
      id: s.id || generateId(),
      title: s.title || '',
      author: s.author || '',
      drug: s.drug || 'N/A',
      sourceType: defaultSourceType,
      specialty: s.specialty || 'cardio',
      design: defaultDesign,
      intervention: s.intervention || '',
      primaryEndpoint: s.primaryEndpoint || '',
      keyResults: s.keyResults || s.key_results || '',
      impact: s.impact || 'informative',
      year: s.year || new Date().getFullYear(),
      organization: s.organization || s.source || 'N/A',
      phase: s.phase || 'N/A',
      sampleSize: s.sampleSize || null,
      population: s.population || 'N/A',
      summary: s.summary || s.conclusion || 'Không có kết luận',
      detailedConclusion: s.detailedConclusion || '',
      fdaStatus: s.fdaStatus || 'N/A',
      sourceUrl: s.sourceUrl || '',
      file: s.file || '',
      parts: (() => {
        if (Array.isArray(s.parts) && s.parts.length > 0) return s.parts;
        if (typeof s.parts === 'string' && s.parts) { try { return JSON.parse(s.parts); } catch(e) {} }
        return null;
      })(),
      asianData: s.asianData !== undefined ? s.asianData : false,
      bookmarked: s.bookmarked !== undefined ? s.bookmarked : false,
      icd10: (() => {
        let parsed = Array.isArray(s.icd10) && s.icd10.length > 0 
          ? s.icd10 
          : (typeof s.icd10 === 'string' && s.icd10 ? (() => { try { return JSON.parse(s.icd10); } catch(e) { return []; } })() : []);
        if (!parsed || parsed.length === 0) {
          const spec = s.specialty || 'cardio';
          if (spec === 'cardio') parsed = ['I50', 'I10'];
          else if (spec === 'pulmo') parsed = ['J44'];
          else if (spec === 'endo') parsed = ['E11'];
          else if (spec === 'renal') parsed = ['N18'];
          else if (spec === 'infect' || spec === 'icu') parsed = ['A41'];
          else if (spec === 'nutri') parsed = ['E66', 'E46'];
        }
        return parsed;
      })(),
      subgroups: (s.subgroups && typeof s.subgroups === 'object' && !Array.isArray(s.subgroups)) ? s.subgroups
                 : (typeof s.subgroups === 'string' && s.subgroups ? (() => { try { return JSON.parse(s.subgroups); } catch(e) { return null; } })() : null),
      conditionKey: (() => {
        if (s.conditionKey) return s.conditionKey;
        const fullTxt = `${s.title || ''} ${s.summary || ''} ${s.tags ? s.tags.join(' ') : ''}`.toLowerCase();
        const icdList = Array.isArray(s.icd10) ? s.icd10 : [];
        if (icdList.some(c => c.startsWith('I50')) || /suy tim|heart failure/i.test(fullTxt)) return 'heart-failure';
        if (icdList.some(c => c.startsWith('E11')) || /đái tháo đường|diabetes|t2d/i.test(fullTxt)) return 'diabetes-t2d';
        if (icdList.some(c => c.startsWith('I10') || c.startsWith('I11')) || /tăng huyết áp|hypertension/i.test(fullTxt)) return 'hypertension';
        if (icdList.some(c => c.startsWith('N18')) || /bệnh thận mạn|ckd/i.test(fullTxt)) return 'ckd';
        if (icdList.some(c => c.startsWith('I48')) || /rung nhĩ|atrial fibrillation/i.test(fullTxt)) return 'af';
        if (icdList.some(c => c.startsWith('B18.0') || c.startsWith('B18.1')) || /viêm gan b|hbv/i.test(fullTxt)) return 'hepatitis-b';
        if (icdList.some(c => c.startsWith('B18.2')) || /viêm gan c|hcv/i.test(fullTxt)) return 'hepatitis-c';
        if (icdList.some(c => c.startsWith('B05')) || /sởi|measles/i.test(fullTxt)) return 'measles';
        if (icdList.some(c => c.startsWith('J09') || c.startsWith('J10') || c.startsWith('J11')) || /cúm|influenza/i.test(fullTxt)) return 'flu';
        if (icdList.some(c => c.startsWith('U07')) || /covid/i.test(fullTxt)) return 'covid19';
        if (icdList.some(c => c.startsWith('A98')) || /marburg|ebola|nipah/i.test(fullTxt)) return 'hemorrhagic-fever';
        if (icdList.some(c => c.startsWith('A41')) || /hồi sức|icu|nhiễm trùng huyết/i.test(fullTxt)) return 'icu';
        return 'other';
      })(),
      createdAt: s.createdAt || new Date().toISOString()
    };
  }

  function processAndDeduplicateStudies(rawArray) {
    if (!Array.isArray(rawArray)) rawArray = [];
    const deletedList = getDeletedStudyIds();

    const uniqueStudies = [];
    const seenIds = new Set();
    const seenNormTitles = new Set();

    rawArray.forEach(s => {
      if (!s || !s.title || isStudyDeleted(s, deletedList)) return;
      const sId = s.id;
      const sNormTitle = normalizeMedicalTitle(s.title);

      if (sId && seenIds.has(sId)) return;
      if (sNormTitle && seenNormTitles.has(sNormTitle)) return;

      if (sId) seenIds.add(sId);
      if (sNormTitle) seenNormTitles.add(sNormTitle);
      uniqueStudies.push(s);
    });

    return uniqueStudies;
  }

  function loadStudies() {
    try {
      localStorage.removeItem('clinicalGuidelines');
      localStorage.removeItem('internalMedicineStudies');
    } catch (e) {}

    let rawList = [];
    try {
      const storedCustom = localStorage.getItem('cliniportal_custom_studies');
      if (storedCustom) {
        const parsed = JSON.parse(storedCustom);
        if (Array.isArray(parsed) && parsed.length > 0) {
          rawList = parsed;
        }
      }
    } catch (e) {}

    const combined = [...rawList, ...(window.SAMPLE_STUDIES || [])];
    window.studies = processAndDeduplicateStudies(combined);
    window.studies.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }

  function saveStudies() {
    try {
      const validStudies = window.studies.filter(s => s && s.id);
      localStorage.setItem('cliniportal_custom_studies', JSON.stringify(validStudies));
    } catch (e) {}

    if (typeof window.CliniPortalSync !== 'undefined' && typeof window.CliniPortalSync.notifyUpdate === 'function') {
      window.CliniPortalSync.notifyUpdate();
    }
  }

  function generateId() {
    return 'study_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Export Sync & Store APIs to window
  window.resolveStudyFile = resolveStudyFile;
  window.getIcd10Name = getIcd10Name;
  window.initSupabase = initSupabase;
  window.updateSupabaseStatus = updateSupabaseStatus;
  window.openSupabaseModal = openSupabaseModal;
  window.closeSupabaseModal = closeSupabaseModal;
  window.saveSupabaseConfig = saveSupabaseConfig;
  window.clearSupabaseConfig = clearSupabaseConfig;
  window.syncStudiesWithSupabase = syncStudiesWithSupabase;
  window.dbSaveStudy = dbSaveStudy;
  window.dbDeleteStudy = dbDeleteStudy;
  window.normalizeMedicalTitle = normalizeMedicalTitle;
  window.getDeletedStudyIds = getDeletedStudyIds;
  window.saveDeletedStudyId = saveDeletedStudyId;
  window.isStudyDeleted = isStudyDeleted;
  window.extractCoreKey = extractCoreKey;
  window.processStudyFields = processStudyFields;
  window.processAndDeduplicateStudies = processAndDeduplicateStudies;
  window.loadStudies = loadStudies;
  window.saveStudies = saveStudies;
  window.generateId = generateId;

})();
