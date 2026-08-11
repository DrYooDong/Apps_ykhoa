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

    const testResultEl = document.getElementById('sb-test-result');
    if (testResultEl) testResultEl.style.display = 'none';
  }

  function closeSupabaseModal() {
    const modal = document.getElementById('supabase-modal');
    if (modal) modal.classList.remove('active');
  }

  async function testSupabaseConnection() {
    const urlInput = document.getElementById('sb-url');
    const keyInput = document.getElementById('sb-key');
    const testResultEl = document.getElementById('sb-test-result');

    const url = urlInput ? urlInput.value.trim() : localStorage.getItem('supabaseUrl');
    const key = keyInput ? keyInput.value.trim() : localStorage.getItem('supabaseKey');

    if (!testResultEl) return;

    if (!url || !key) {
      testResultEl.style.display = 'block';
      testResultEl.style.background = '#fef2f2';
      testResultEl.style.color = '#dc2626';
      testResultEl.style.border = '1px solid #fca5a5';
      testResultEl.innerHTML = '⚠️ Vui lòng nhập đầy đủ Supabase URL và Anon Key!';
      return;
    }

    testResultEl.style.display = 'block';
    testResultEl.style.background = '#eff6ff';
    testResultEl.style.color = '#2563eb';
    testResultEl.style.border = '1px solid #bfdbfe';
    testResultEl.innerHTML = '⏳ Đang kiểm tra kết nối tới Supabase Cloud...';

    if (!window.supabase || typeof window.supabase.createClient !== 'function') {
      testResultEl.style.background = '#fef2f2';
      testResultEl.style.color = '#dc2626';
      testResultEl.style.border = '1px solid #fca5a5';
      testResultEl.innerHTML = '❌ Thư viện Supabase JS SDK chưa sẵn sàng. Kiểm tra lại kết nối Internet!';
      return;
    }

    try {
      const client = window.supabase.createClient(url, key);
      const startTime = Date.now();

      const { data, error } = await client
        .from('clinical_guidelines')
        .select('id')
        .limit(1);

      const elapsed = Date.now() - startTime;

      if (error) {
        let hint = '';
        if (error.code === '42P01' || (error.message && error.message.includes('relation "clinical_guidelines" does not exist'))) {
          hint = 'Bảng <code>clinical_guidelines</code> chưa được tạo trên Supabase. Vui lòng mở SQL Editor và chạy câu lệnh SQL mẫu bên dưới!';
        } else if (error.code === 'PGRST301' || error.status === 401 || (error.message && error.message.includes('JWT'))) {
          hint = 'Mã Anon Key không hợp lệ hoặc đã hết hạn. Hãy copy đúng khóa <code>anon / public</code> trong Settings -> API.';
        } else if (error.code === '42501' || (error.message && error.message.includes('permission'))) {
          hint = 'Bảng đã có nhưng chưa phân quyền RLS cho truy cập <code>anon</code>. Hãy chạy các câu lệnh <code>CREATE POLICY</code> bên dưới SQL Editor!';
        } else {
          hint = error.message || 'Lỗi truy vấn dữ liệu';
        }

        window._warmSupabaseClient = null;
        testResultEl.style.background = '#fef2f2';
        testResultEl.style.color = '#dc2626';
        testResultEl.style.border = '1px solid #fca5a5';
        testResultEl.innerHTML = `❌ Lỗi kết nối Supabase (${elapsed}ms):<br><strong>${hint}</strong>`;
      } else {
        // Lưu warm client & credentials để saveSupabaseConfig reuse, tránh cold start lần 2
        window._warmSupabaseClient = { client, url, key };
        testResultEl.style.background = '#f0fdf4';
        testResultEl.style.color = '#15803d';
        testResultEl.style.border = '1px solid #86efac';
        testResultEl.innerHTML = `✅ Kết nối thành công tới Supabase! (${elapsed}ms)<br>Bảng <code>clinical_guidelines</code> đã sẵn sàng đồng bộ.<br><small style="opacity:0.8">💡 Bấm <strong>Lưu & Kết nối</strong> ngay để tránh cold-start lần 2.</small>`;
      }
    } catch (err) {
      window._warmSupabaseClient = null;
      testResultEl.style.background = '#fef2f2';
      testResultEl.style.color = '#dc2626';
      testResultEl.style.border = '1px solid #fca5a5';
      testResultEl.innerHTML = `❌ Không thể kết nối tới URL:<br><code>${url}</code><br>Lỗi: ${escapeHtml(err.message || 'Sai định dạng URL hoặc lỗi mạng/CORS')}`;
    }
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
    
    // Reuse warm client từ testSupabaseConnection nếu URL/Key khớp (tránh cold start lần 2)
    if (window._warmSupabaseClient && window._warmSupabaseClient.url === url && window._warmSupabaseClient.key === key) {
      window.supabaseClient = window._warmSupabaseClient.client;
      window.supabaseConfig = { url, key };
      updateSupabaseStatus('connected', 'Supabase: Connected');
      window._warmSupabaseClient = null;
    } else {
      initSupabase();
    }

    closeSupabaseModal();
    syncStudiesWithSupabase();
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

  async function fetchSupabaseDataWithTimeout(timeoutMs = 15000) {
    const url = localStorage.getItem('supabaseUrl') || (window.supabaseConfig && window.supabaseConfig.url);
    const key = localStorage.getItem('supabaseKey') || (window.supabaseConfig && window.supabaseConfig.key);

    if (!url || !key) throw new Error('Chưa kết nối Supabase Client');

    const cleanUrl = url.replace(/\/+$/, '');
    const endpoint = `${cleanUrl}/rest/v1/clinical_guidelines?select=*`;

    // 1. Thử dùng Native HTTP Fetch trước (Siêu nhanh, không bị treo SDK internal queue)
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });

      clearTimeout(timer);

      if (response.ok) {
        const data = await response.json();
        return Array.isArray(data) ? data : [];
      } else if (response.status === 404) {
        throw new Error('Bảng clinical_guidelines chưa được tạo trên Supabase');
      } else if (response.status === 401) {
        throw new Error('Mã Anon Key không hợp lệ hoặc đã hết hạn');
      } else if (response.status === 403) {
        throw new Error('Thiếu quyền RLS (Hãy bật Policy Allow anon select)');
      } else {
        const errText = await response.text();
        throw new Error(`Supabase REST Error (${response.status}): ${errText}`);
      }
    } catch (fetchErr) {
      if (fetchErr.name === 'AbortError') {
        throw new Error('Timeout 15s — Supabase Cloud phản hồi quá chậm (Hãy bấm Test kết nối để chẩn đoán)');
      }
      if (fetchErr.message && (fetchErr.message.includes('bảng') || fetchErr.message.includes('Key') || fetchErr.message.includes('RLS') || fetchErr.message.includes('REST Error'))) {
        throw fetchErr;
      }
      console.warn('Native fetch failed, trying SDK fallback:', fetchErr);
    }

    // 2. SDK Fallback
    if (!window.supabaseClient) throw new Error('Chưa kết nối Supabase Client');
    const { data, error } = await window.supabaseClient
      .from('clinical_guidelines')
      .select('*');
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  }

  async function syncStudiesWithSupabase() {
    // 1. RENDERING TỨC THÌ (0ms delay): Đọc cache từ LocalStorage/SAMPLE_STUDIES và render UI lập tức
    loadStudies();
    if (window.renderTable) window.renderTable();
    if (window.renderUpdates) window.renderUpdates();

    const url = localStorage.getItem('supabaseUrl');
    const key = localStorage.getItem('supabaseKey');
    if (!url || !key) {
      updateSupabaseStatus('disconnected', 'Supabase: Local Mode');
      return;
    }
    
    // 2. CHẠY ĐỒNG BỘ NGẦM (Background Revalidation)
    updateSupabaseStatus('connected', 'Supabase: Đang đồng bộ dữ liệu...');
    try {
      const data = await fetchSupabaseDataWithTimeout(15000);

      if (Array.isArray(data)) {
        let customLocal = [];
        try {
          const storedCustom = localStorage.getItem('cliniportal_custom_studies');
          if (storedCustom) {
            const parsed = JSON.parse(storedCustom);
            if (Array.isArray(parsed)) customLocal = parsed;
          }
        } catch(e) {}

        const remoteStudies = data.map(s => processStudyFields(s));
        const combined = [...remoteStudies, ...customLocal, ...(window.SAMPLE_STUDIES || [])];
        const newStudies = processAndDeduplicateStudies(combined);
        newStudies.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

        // Kiểm tra xem dữ liệu có thay đổi so với cache local không
        const isChanged = JSON.stringify(newStudies.map(s => s.id)) !== JSON.stringify((window.studies || []).map(s => s.id));
        window.studies = newStudies;
        
        saveStudies();
        if (isChanged && window.renderTable) window.renderTable();
        if (isChanged && window.renderUpdates) window.renderUpdates();
        
        const countMsg = data.length > 0 
          ? `Supabase: Đã nạp ${data.length} bài từ Đám mây`
          : `Supabase: Đã kết nối (Cơ sở dữ liệu trống)`;
        updateSupabaseStatus('connected', countMsg);

        // Tự động đẩy bài local lên Supabase nếu trên Cloud chưa có bài nào mà local lại có bài custom
        if (data.length === 0 && customLocal.length > 0 && window.dbSaveStudy) {
          console.log('Pushing local custom studies to empty Supabase database...');
          customLocal.forEach(study => window.dbSaveStudy(study));
        }
      }
    } catch (err) {
      console.warn('Supabase Sync failed or timed out:', err);
      let errDetail = 'Offline (Lỗi kết nối)';
      const msg = (err && err.message) ? err.message : '';
      const code = (err && err.code) ? err.code : '';

      if (msg.includes('Timeout')) {
        errDetail = 'Timeout (Ấn "Test kết nối" trong Cài đặt)';
      } else if (code === '42P01' || msg.includes('bảng') || msg.includes('does not exist')) {
        errDetail = 'Bảng chưa tạo (Mở Cài đặt xem SQL)';
      } else if (code === '42501' || msg.includes('RLS') || msg.includes('permission')) {
        errDetail = 'Thiếu quyền RLS (Mở Cài đặt xem SQL)';
      } else if (code === 'PGRST301' || err.status === 401 || msg.includes('Key') || msg.includes('JWT')) {
        errDetail = 'Sai Anon Key (Mở Cài đặt nhập lại Key)';
      } else if (msg) {
        errDetail = msg.substring(0, 50);
      }

      updateSupabaseStatus('error', `Supabase: ${errDetail}`);
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
        conditionKey: study.conditionKey || null,
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
        delete corePayload.conditionKey;
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
    if (defaultSourceType === 'national-guideline') defaultSourceType = 'vn-moh';
    if (defaultSourceType === 'international-study') defaultSourceType = 'intl-study';
    if (defaultSourceType === 'international-guideline') defaultSourceType = 'intl-guideline';

    let defaultDesign = s.design || 'rct';
    let defaultSpecialty = s.specialty || 'cardio';
    if (defaultSpecialty === 'resp' || defaultSpecialty === 'pulmonology') defaultSpecialty = 'pulmo';
    if (defaultSpecialty === 'cardiology') defaultSpecialty = 'cardio';
    if (defaultSpecialty === 'endocrinology') defaultSpecialty = 'endo';
    if (defaultSpecialty === 'nephrology') defaultSpecialty = 'renal';
    if (defaultSpecialty === 'infectious') defaultSpecialty = 'infect';
    
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

    const parseBool = (val) => {
      if (typeof val === 'boolean') return val;
      if (typeof val === 'string') return val.toLowerCase() === 'true';
      return false;
    };

    return {
      ...s,
      id: s.id || generateId(),
      title: s.title || '',
      author: s.author || '',
      drug: s.drug || 'N/A',
      sourceType: defaultSourceType,
      specialty: defaultSpecialty,
      design: defaultDesign,
      intervention: s.intervention || '',
      primaryEndpoint: s.primaryEndpoint || '',
      keyResults: s.keyResults || s.key_results || '',
      impact: s.impact || 'informative',
      year: parseInt(s.year, 10) || new Date().getFullYear(),
      organization: s.organization || s.source || 'N/A',
      phase: s.phase || 'N/A',
      sampleSize: (s.sampleSize !== null && s.sampleSize !== undefined && s.sampleSize !== '') ? parseInt(s.sampleSize, 10) : null,
      population: s.population || 'N/A',
      summary: s.summary || s.conclusion || 'Không có kết luận',
      detailedConclusion: s.detailedConclusion || '',
      fdaStatus: s.fdaStatus || 'N/A',
      sourceUrl: s.sourceUrl || '',
      file: s.file || '',
      parts: (() => {
        if (Array.isArray(s.parts) && s.parts.length > 0) return s.parts;
        if (typeof s.parts === 'string' && s.parts && s.parts !== 'N/A') { try { return JSON.parse(s.parts); } catch(e) {} }
        return null;
      })(),
      asianData: s.asianData !== undefined ? parseBool(s.asianData) : false,
      bookmarked: s.bookmarked !== undefined ? parseBool(s.bookmarked) : false,
      icd10: (() => {
        let parsed = Array.isArray(s.icd10) && s.icd10.length > 0 
          ? s.icd10 
          : (typeof s.icd10 === 'string' && s.icd10 && s.icd10 !== 'N/A' ? (() => { try { return JSON.parse(s.icd10); } catch(e) { return []; } })() : []);
        if (!parsed || parsed.length === 0) {
          const spec = defaultSpecialty;
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
                 : (typeof s.subgroups === 'string' && s.subgroups && s.subgroups !== 'N/A' ? (() => { try { return JSON.parse(s.subgroups); } catch(e) { return null; } })() : null),
      conditionKey: (() => {
        if (s.conditionKey && s.conditionKey !== 'N/A' && s.conditionKey !== 'null') return s.conditionKey;
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

  // ════════════════════════════════════════════════════════════════
  // SMART DUPLICATE DETECTOR (Phép kiểm trùng lặp dữ liệu)
  // ════════════════════════════════════════════════════════════════

  function normalizeOrgName(str) {
    if (!str) return '';
    let s = String(str).toLowerCase().trim()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'd');
    
    if (s.includes('esc') || s.includes('european society of cardiology')) return 'esc';
    if (s.includes('acc') || s.includes('american college of cardiology')) return 'acc';
    if (s.includes('aha') || s.includes('american heart association')) return 'aha';
    if (s.includes('ada') || s.includes('american diabetes association')) return 'ada';
    if (s.includes('kdigo')) return 'kdigo';
    if (s.includes('gold') || s.includes('global initiative for chronic obstructive lung disease')) return 'gold';
    if (s.includes('gina') || s.includes('global initiative for asthma')) return 'gina';
    if (s.includes('nejm') || s.includes('new england journal of medicine')) return 'nejm';
    if (s.includes('lancet')) return 'lancet';
    if (s.includes('jama')) return 'jama';
    if (s.includes('bmj') || s.includes('british medical journal')) return 'bmj';
    if (s.includes('byt') || s.includes('bo y te')) return 'byt';
    if (s.includes('vnha') || s.includes('hoi tim mach viet nam')) return 'vnha';
    
    return s.replace(/[^a-z0-9]/g, '');
  }

  function getTitleTokenSet(str) {
    if (!str) return new Set();
    const clean = str.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'd')
      .replace(/[^a-z0-9\s]/g, ' ');
    const stopWords = new Set(['va', 've', 'o', 'cho', 'truoc', 'sau', 'tren', 'duoi', 'trong', 'theo', 'guideline', 'guidelines', 'huong', 'dan', 'nghien', 'cuu', 'thu', 'nghiem', 'danh', 'gia']);
    const tokens = clean.split(/\s+/).filter(w => w.length >= 2 && !stopWords.has(w));
    return new Set(tokens);
  }

  function calculateSetJaccard(setA, setB) {
    if (!setA.size || !setB.size) return 0;
    let intersection = 0;
    setA.forEach(item => {
      if (setB.has(item)) intersection++;
    });
    const union = setA.size + setB.size - intersection;
    return union > 0 ? intersection / union : 0;
  }

  /**
   * detectStudyDuplicate
   * Compares a candidate study with an existing DB array.
   * Returns { isDuplicate, score, matchedStudy, reasons, matchLevel }
   */
  function detectStudyDuplicate(candidate, existingList) {
    if (!candidate || !Array.isArray(existingList) || existingList.length === 0) {
      return { isDuplicate: false, score: 0, matchedStudy: null, reasons: [], matchLevel: 'none' };
    }

    const candId = candidate.id ? String(candidate.id).trim().toLowerCase() : '';
    const candNormTitle = normalizeMedicalTitle(candidate.title || '');
    const candTitleTokens = getTitleTokenSet((candidate.title || '') + ' ' + (candidate.titleEn || ''));
    const candYear = parseInt(candidate.year, 10) || null;
    const candOrgNorm = normalizeOrgName(candidate.organization || candidate.journal || candidate.authors);
    const candCondKey = candidate.conditionKey || 'other';
    const candDrug = (candidate.drug || '').toLowerCase().trim();
    const candIcd = Array.isArray(candidate.icd10) ? candidate.icd10.map(i => i.trim().toUpperCase()) : [];

    let bestMatch = null;
    let highestScore = 0;
    let bestReasons = [];

    for (const existing of existingList) {
      if (!existing) continue;
      
      const exId = existing.id ? String(existing.id).trim().toLowerCase() : '';
      const exNormTitle = normalizeMedicalTitle(existing.title || '');
      
      // 1. Check Exact ID Match
      if (candId && exId && candId === exId) {
        return {
          isDuplicate: true,
          score: 100,
          matchedStudy: existing,
          reasons: ['Trùng Mã định danh ID hệ thống'],
          matchLevel: 'exact'
        };
      }

      // 2. Check Exact Title Match
      if (candNormTitle && exNormTitle && candNormTitle === exNormTitle) {
        return {
          isDuplicate: true,
          score: 100,
          matchedStudy: existing,
          reasons: ['Trùng Tiêu đề nghiên cứu chuẩn hóa'],
          matchLevel: 'exact'
        };
      }

      // 3. Multi-Factor Similarity Assessment
      let score = 0;
      const reasons = [];

      // A. Disease / Topic / Drug Similarity (Max 45 pts)
      const exCondKey = existing.conditionKey || 'other';
      const exDrug = (existing.drug || '').toLowerCase().trim();
      const exIcd = Array.isArray(existing.icd10) ? existing.icd10.map(i => i.trim().toUpperCase()) : [];
      const exTitleTokens = getTitleTokenSet((existing.title || '') + ' ' + (existing.titleEn || ''));

      if (candCondKey !== 'other' && exCondKey !== 'other' && candCondKey === exCondKey) {
        score += 20;
        reasons.push(`Cùng Bệnh/Vấn đề: ${candCondKey}`);
      }

      if (candDrug && exDrug && candDrug !== 'n/a' && exDrug !== 'n/a' && (candDrug.includes(exDrug) || exDrug.includes(candDrug))) {
        score += 15;
        reasons.push(`Cùng Thuốc can thiệp: ${existing.drug}`);
      }

      const icdOverlap = candIcd.filter(c => exIcd.includes(c));
      if (icdOverlap.length > 0) {
        score += 10;
        reasons.push(`Mã ICD-10 trùng khớp: ${icdOverlap.join(', ')}`);
      }

      const tokenJaccard = calculateSetJaccard(candTitleTokens, exTitleTokens);
      if (tokenJaccard >= 0.4) {
        const titleScore = Math.min(25, Math.round(tokenJaccard * 30));
        score += titleScore;
        reasons.push(`Từ khóa tiêu đề trùng khớp (${Math.round(tokenJaccard * 100)}%)`);
      }

      // B. Publication Year Similarity (Max 30 pts)
      const exYear = parseInt(existing.year, 10) || null;
      if (candYear && exYear) {
        if (candYear === exYear) {
          score += 30;
          reasons.push(`Cùng Năm công bố: ${candYear}`);
        } else if (Math.abs(candYear - exYear) <= 1) {
          score += 15;
          reasons.push(`Năm công bố cận kề: ${candYear} vs ${exYear}`);
        }
      }

      // C. Source / Organization / Journal (Max 25 pts)
      const exOrgNorm = normalizeOrgName(existing.organization || existing.journal || existing.authors);
      if (candOrgNorm && exOrgNorm && (candOrgNorm === exOrgNorm || candOrgNorm.includes(exOrgNorm) || exOrgNorm.includes(candOrgNorm))) {
        score += 25;
        reasons.push(`Cùng Nguồn/Tổ chức: ${existing.organization || existing.journal || 'N/A'}`);
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = existing;
        bestReasons = reasons;
      }
    }

    const isDup = highestScore >= 70;
    let level = 'none';
    if (highestScore >= 90) level = 'high';
    else if (highestScore >= 70) level = 'moderate';
    else if (highestScore >= 50) level = 'possible';

    return {
      isDuplicate: isDup,
      score: Math.min(100, highestScore),
      matchedStudy: bestMatch,
      reasons: bestReasons,
      matchLevel: level
    };
  }

  function batchCheckDuplicates(incomingList, existingList) {
    if (!Array.isArray(incomingList)) return [];
    const currentList = Array.isArray(existingList) ? [...existingList] : [...(window.studies || [])];
    
    return incomingList.map(item => {
      const processed = window.processStudyFields ? window.processStudyFields(item) : item;
      const dupResult = detectStudyDuplicate(processed, currentList);
      return {
        item: processed,
        raw: item,
        dupResult: dupResult
      };
    });
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
  window.testSupabaseConnection = testSupabaseConnection;
  window.syncStudiesWithSupabase = syncStudiesWithSupabase;

  window.dbSaveStudy = dbSaveStudy;
  window.dbDeleteStudy = dbDeleteStudy;
  window.normalizeMedicalTitle = normalizeMedicalTitle;
  window.normalizeOrgName = normalizeOrgName;
  window.detectStudyDuplicate = detectStudyDuplicate;
  window.batchCheckDuplicates = batchCheckDuplicates;
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

