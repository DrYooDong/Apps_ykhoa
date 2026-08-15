/**
 * CliniPortal 2.0 — Guidelines Sync & Store Engine (TypeScript)
 * Path: src/content/ebm/guidelines/js/guideline-sync.ts
 */

import {
  Study,
  SupabaseConfig,
  DbStatus,
  ColumnVisibilityState,
  FilterState,
  DuplicateCheckResult,
  BatchDuplicateItem
} from '../guidelines-types';

import '../guidelines-types';

// Global State Stores
window.studies = window.studies || [];
window.selectedIds = window.selectedIds || new Set<string>();
window.expandedIds = window.expandedIds || new Set<string>();
window.isMobileView = window.innerWidth <= 768;

// View state
window.viewMode = window.viewMode || 'compact';
window.currentTab = window.currentTab || 'list';
window.showAdvancedFilters = window.showAdvancedFilters || false;

// Supabase state
window.supabaseClient = window.supabaseClient || null;
window.supabaseConfig = window.supabaseConfig || { url: '', key: '' };
window.dbStatus = window.dbStatus || 'disconnected';

// Columns visibility state
window.columnVisibility = window.columnVisibility || {
  sourceType: true,
  specialty: true,
  design: true,
  organization: true,
  journalMetrics: true,
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

export function resolveStudyFile(filePath?: string): string {
  if (!filePath) return '';
  const normalized = filePath.replace(/^Kho Guidelines\//i, 'kho-guidelines/');
  const cleanSlug = normalized.replace(/^kho-guidelines\//i, '').replace(/\.html$/i, '');
  
  if (typeof window !== 'undefined' && window.location && (window.location.hash.startsWith('#/') || !window.location.pathname.endsWith('.html'))) {
    return `#/ebm/kho-guidelines/${cleanSlug}`;
  }
  
  return normalized.startsWith('kho-guidelines/') ? normalized : `kho-guidelines/${normalized}`;
}

export function getIcd10Name(code?: string): string {
  if (!code) return '';
  const cleanCode = code.trim().toUpperCase();
  if (!window.ICD10_MAP && window.ICD10_DATA && Array.isArray(window.ICD10_DATA)) {
    window.ICD10_MAP = new Map<string, string>();
    window.ICD10_DATA.forEach(item => {
      if (item.code) window.ICD10_MAP!.set(item.code.trim().toUpperCase(), item.name);
    });
  }
  if (window.ICD10_MAP && window.ICD10_MAP.has(cleanCode)) {
    return window.ICD10_MAP.get(cleanCode) || '';
  }
  return '';
}

// ════════════════════════════════════════════════════════════════
// SUPABASE CONFIG & SYNC (Account Isolation & Data Privacy)
// ════════════════════════════════════════════════════════════════

export function initSupabase(): boolean {
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

export function updateSupabaseStatus(status: DbStatus, text: string): void {
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

export function openSupabaseModal(): void {
  const url = localStorage.getItem('supabaseUrl') || '';
  const key = localStorage.getItem('supabaseKey') || '';
  const urlInput = document.getElementById('sb-url') as HTMLInputElement | null;
  const keyInput = document.getElementById('sb-key') as HTMLInputElement | null;
  if (urlInput) urlInput.value = url;
  if (keyInput) keyInput.value = key;
  const modal = document.getElementById('supabase-modal');
  if (modal) modal.classList.add('active');

  const testResultEl = document.getElementById('sb-test-result');
  if (testResultEl) testResultEl.style.display = 'none';
}

export function closeSupabaseModal(): void {
  const modal = document.getElementById('supabase-modal');
  if (modal) modal.classList.remove('active');
}

export async function testSupabaseConnection(): Promise<void> {
  const urlInput = document.getElementById('sb-url') as HTMLInputElement | null;
  const keyInput = document.getElementById('sb-key') as HTMLInputElement | null;
  const testResultEl = document.getElementById('sb-test-result');

  const url = urlInput ? urlInput.value.trim() : (localStorage.getItem('supabaseUrl') || '');
  const key = keyInput ? keyInput.value.trim() : (localStorage.getItem('supabaseKey') || '');

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

    const { error } = await client
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
      window._warmSupabaseClient = { client, url, key };
      testResultEl.style.background = '#f0fdf4';
      testResultEl.style.color = '#15803d';
      testResultEl.style.border = '1px solid #86efac';
      testResultEl.innerHTML = `✅ Kết nối thành công tới Supabase! (${elapsed}ms)<br>Bảng <code>clinical_guidelines</code> đã sẵn sàng đồng bộ.<br><small style="opacity:0.8">💡 Bấm <strong>Lưu & Kết nối</strong> ngay để tránh cold-start lần 2.</small>`;
    }
  } catch (err: any) {
    window._warmSupabaseClient = null;
    testResultEl.style.background = '#fef2f2';
    testResultEl.style.color = '#dc2626';
    testResultEl.style.border = '1px solid #fca5a5';
    testResultEl.innerHTML = `❌ Không thể kết nối tới URL:<br><code>${url}</code><br>Lỗi: ${err?.message || 'Sai định dạng URL hoặc lỗi mạng/CORS'}`;
  }
}

export function saveSupabaseConfig(event?: Event): void {
  if (event) event.preventDefault();
  const urlInput = document.getElementById('sb-url') as HTMLInputElement | null;
  const keyInput = document.getElementById('sb-key') as HTMLInputElement | null;
  const url = urlInput ? urlInput.value.trim() : '';
  const key = keyInput ? keyInput.value.trim() : '';
  
  if (!url || !key) {
    alert('⚠️ Vui lòng nhập đầy đủ Supabase URL và Anon Key!');
    return;
  }

  localStorage.setItem('supabaseUrl', url);
  localStorage.setItem('supabaseKey', key);
  
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

export function clearSupabaseConfig(): void {
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

    const urlInput = document.getElementById('sb-url') as HTMLInputElement | null;
    const keyInput = document.getElementById('sb-key') as HTMLInputElement | null;
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

export async function fetchSupabaseDataWithTimeout(timeoutMs = 15000): Promise<any[]> {
  const url = localStorage.getItem('supabaseUrl') || (window.supabaseConfig && window.supabaseConfig.url);
  const key = localStorage.getItem('supabaseKey') || (window.supabaseConfig && window.supabaseConfig.key);

  if (!url || !key) throw new Error('Chưa kết nối Supabase Client');

  const cleanUrl = url.replace(/\/+$/, '');
  const endpoint = `${cleanUrl}/rest/v1/clinical_guidelines?select=*`;

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
  } catch (fetchErr: any) {
    if (fetchErr.name === 'AbortError') {
      throw new Error('Timeout 15s — Supabase Cloud phản hồi quá chậm (Hãy bấm Test kết nối để chẩn đoán)');
    }
    if (fetchErr.message && (fetchErr.message.includes('bảng') || fetchErr.message.includes('Key') || fetchErr.message.includes('RLS') || fetchErr.message.includes('REST Error'))) {
      throw fetchErr;
    }
    console.warn('Native fetch failed, trying SDK fallback:', fetchErr);
  }

  if (!window.supabaseClient) throw new Error('Chưa kết nối Supabase Client');
  const { data, error } = await window.supabaseClient
    .from('clinical_guidelines')
    .select('*');
  if (error) throw error;
  return Array.isArray(data) ? data : [];
}

export async function syncStudiesWithSupabase(): Promise<void> {
  loadStudies();
  if (window.renderTable) window.renderTable();
  if (window.renderUpdates) window.renderUpdates();

  const url = localStorage.getItem('supabaseUrl');
  const key = localStorage.getItem('supabaseKey');
  if (!url || !key) {
    updateSupabaseStatus('disconnected', 'Supabase: Local Mode');
    return;
  }
  
  updateSupabaseStatus('connected', 'Supabase: Đang đồng bộ dữ liệu...');
  try {
    const data = await fetchSupabaseDataWithTimeout(15000);

    if (Array.isArray(data)) {
      const deletedList = getDeletedStudyIds();

      const staleOnCloud = data.filter(s => s && s.id && isStudyDeleted(s, deletedList));
      if (staleOnCloud.length > 0) {
        console.log(`[Supabase Sync] Đang xóa ${staleOnCloud.length} bài đã bị hủy khỏi Supabase Cloud...`);
        for (const s of staleOnCloud) {
          await dbDeleteStudy(s.id);
        }
      }

      const validRemoteData = data.filter(s => s && s.id && !isStudyDeleted(s, deletedList));
      const cloudIdSet = new Set(validRemoteData.map(s => s.id));

      let customLocal: any[] = [];
      try {
        const storedCustom = localStorage.getItem('cliniportal_custom_studies');
        if (storedCustom) {
          const parsed = JSON.parse(storedCustom);
          if (Array.isArray(parsed)) {
            customLocal = parsed.filter(s => s && s.id && !isStudyDeleted(s, deletedList));
          }
        }
      } catch(e) {}

      const remoteStudies = validRemoteData.map(s => processStudyFields(s));
      const combined = [...remoteStudies, ...customLocal, ...(window.SAMPLE_STUDIES || [])];
      const newStudies = processAndDeduplicateStudies(combined);
      newStudies.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

      const isChanged = JSON.stringify(newStudies.map(s => s.id)) !== JSON.stringify((window.studies || []).map(s => s.id));
      window.studies = newStudies;
      
      saveStudies();
      if (isChanged && window.renderTable) window.renderTable();
      if (isChanged && window.renderUpdates) window.renderUpdates();
      
      const missingOnCloud = newStudies.filter(s => s && s.id && !cloudIdSet.has(s.id));
      if (missingOnCloud.length > 0) {
        console.log(`[Supabase Auto-Sync] Đang tự động đẩy ${missingOnCloud.length} bài nghiên cứu mới lên Supabase Cloud...`);
        for (const study of missingOnCloud) {
          try {
            await dbSaveStudy(study, true);
          } catch (e) {
            console.warn('Lỗi auto-sync bài mới lên Supabase:', study.title, e);
          }
        }
      }

      const finalCount = newStudies.length;
      const countMsg = finalCount > 0 
        ? `Supabase: Đã nạp ${finalCount} bài từ Đám mây`
        : `Supabase: Đã kết nối (Cơ sở dữ liệu trống)`;
      updateSupabaseStatus('connected', countMsg);
    }
  } catch (err: any) {
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

export async function syncAllLocalToSupabase(): Promise<void> {
  const url = localStorage.getItem('supabaseUrl') || (window.supabaseConfig && window.supabaseConfig.url);
  const key = localStorage.getItem('supabaseKey') || (window.supabaseConfig && window.supabaseConfig.key);

  if (!url || !key) {
    alert('⚠️ Chưa cấu hình Supabase! Vui lòng nhập URL và Anon Key trong phần Cài đặt.');
    return;
  }

  if (!window.studies || window.studies.length === 0) {
    alert('⚠️ Không có nghiên cứu nào trong bộ nhớ để đồng bộ!');
    return;
  }

  const total = window.studies.length;
  updateSupabaseStatus('connected', `Supabase: Đang đẩy ${total} bài lên Cloud...`);

  let successCount = 0;
  let failCount = 0;

  for (const study of window.studies) {
    try {
      await dbSaveStudy(study, true);
      successCount++;
    } catch (e) {
      failCount++;
    }
  }

  updateSupabaseStatus('connected', `Supabase: Đã nạp ${successCount} bài từ Đám mây`);
  if (failCount === 0) {
    alert(`🎉 Đã đồng bộ thành công toàn bộ ${successCount} nghiên cứu lên Supabase Cloud!`);
  } else {
    alert(`⚠️ Đồng bộ hoàn tất: ${successCount} thành công, ${failCount} thất bại. Vui lòng kiểm tra lại kết nối và quyền RLS!`);
  }
}

export async function dbSaveStudy(study: Study, silent = false): Promise<void> {
  if (!study || !study.id) return;
  
  removeDeletedStudyId(study.id);

  const url = localStorage.getItem('supabaseUrl') || (window.supabaseConfig && window.supabaseConfig.url);
  const key = localStorage.getItem('supabaseKey') || (window.supabaseConfig && window.supabaseConfig.key);

  if (!url || !key) return;

  const payload: any = {
    id: study.id,
    title: study.title,
    author: study.author || '',
    drug: study.drug || '',
    sourceType: study.sourceType || 'intl-study',
    specialty: study.specialty || 'cardio',
    design: study.design || 'rct',
    intervention: study.intervention || '',
    primaryEndpoint: study.primaryEndpoint || '',
    keyResults: study.keyResults || '',
    impact: study.impact || 'informative',
    year: typeof study.year === 'number' ? study.year : (parseInt(String(study.year), 10) || new Date().getFullYear()),
    organization: study.organization || '',
    phase: study.phase || '',
    sampleSize: typeof study.sampleSize === 'number' ? study.sampleSize : (parseInt(String(study.sampleSize), 10) || null),
    population: study.population || '',
    summary: study.summary || '',
    detailedConclusion: study.detailedConclusion || '',
    fdaStatus: study.fdaStatus || '',
    sourceUrl: study.sourceUrl || '',
    file: study.file || '',
    asianData: !!study.asianData,
    bookmarked: !!study.bookmarked,
    parts: study.parts ? (typeof study.parts === 'string' ? study.parts : JSON.stringify(study.parts)) : null,
    icd10: study.icd10 ? (typeof study.icd10 === 'string' ? study.icd10 : JSON.stringify(study.icd10)) : null,
    subgroups: study.subgroups ? (typeof study.subgroups === 'object' ? JSON.stringify(study.subgroups) : study.subgroups) : null,
    conditionKey: study.conditionKey || null,
    createdAt: study.createdAt || new Date().toISOString()
  };

  try {
    if (window.supabaseClient) {
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
    } else {
      const cleanUrl = url.replace(/\/+$/, '');
      const res = await fetch(`${cleanUrl}/rest/v1/clinical_guidelines`, {
        method: 'POST',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`REST Upsert Error (${res.status}): ${errText}`);
      }
    }

    console.log(`[Supabase] Đã lưu nghiên cứu "${study.title}" (${study.id}) thành công.`);
    const totalCount = (window.studies || []).length;
    if (!silent) {
      updateSupabaseStatus('connected', `Supabase: Đã nạp ${totalCount} bài từ Đám mây`);
    }
  } catch (err: any) {
    console.error('Failed to save to Supabase:', err);
    if (!silent) {
      updateSupabaseStatus('error', 'Lỗi Supabase: ' + (err?.message || 'Save Failed'));
      alert('⚠️ Không thể lưu lên Supabase: ' + (err?.message || 'Kiểm tra lại quyền truy cập hoặc kết nối!'));
    }
    throw err;
  }
}

export async function dbDeleteStudy(id: string): Promise<void> {
  if (!id) return;
  saveDeletedStudyId(id);

  const url = localStorage.getItem('supabaseUrl') || (window.supabaseConfig && window.supabaseConfig.url);
  const key = localStorage.getItem('supabaseKey') || (window.supabaseConfig && window.supabaseConfig.key);

  if (!url || !key) return;

  try {
    if (window.supabaseClient) {
      const { error } = await window.supabaseClient
        .from('clinical_guidelines')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } else {
      const cleanUrl = url.replace(/\/+$/, '');
      const res = await fetch(`${cleanUrl}/rest/v1/clinical_guidelines?id=eq.${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`
        }
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`REST Delete Error (${res.status}): ${errText}`);
      }
    }

    console.log(`[Supabase] Đã xóa nghiên cứu ID "${id}" thành công khỏi Supabase.`);
    const totalCount = (window.studies || []).length;
    updateSupabaseStatus('connected', `Supabase: Đã nạp ${totalCount} bài từ Đám mây`);
  } catch (err: any) {
    console.error('Failed to delete from Supabase:', err);
    updateSupabaseStatus('error', 'Supabase: Xóa thất bại (' + (err?.message || 'Error') + ')');
  }
}

// ════════════════════════════════════════════════════════════════
// DATA MIGRATION & LOCAL STORAGE
// ════════════════════════════════════════════════════════════════

export function normalizeMedicalTitle(str?: string): string {
  if (!str) return '';
  const yearMatch = str.match(/\b(19\d{2}|20\d{2})\b/);
  const yearStr = yearMatch ? yearMatch[1] : '';

  const base = str.replace(/\([^)]*\)/g, ' ').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'd')
    .replace(/\b(ve|va|o|cho|truoc|sau|tren|duoi)\b/g, ' ')
    .replace(/[^a-z0-9]/g, '');

  return base + (yearStr ? '_' + yearStr : '');
}

export function getDeletedStudyIds(): string[] {
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

export function saveDeletedStudyId(id: string): void {
  if (!id) return;
  const list = getDeletedStudyIds();
  if (!list.includes(id)) list.push(id);
  localStorage.setItem('cliniportal_deleted_study_ids', JSON.stringify(list));
}

export function removeDeletedStudyId(id: string): void {
  if (!id) return;
  const list = getDeletedStudyIds().filter(item => item !== id);
  localStorage.setItem('cliniportal_deleted_study_ids', JSON.stringify(list));
}

export function isStudyDeleted(study: Study, deletedList?: string[]): boolean {
  if (!study || !study.id) return false;
  const list = deletedList || getDeletedStudyIds();
  if (!list || list.length === 0) return false;
  return list.includes(study.id);
}

export function extractCoreKey(title?: string): string {
  if (!title) return '';
  const parenMatch = title.match(/\(([^)]+)\)/);
  if (parenMatch) {
    const inside = parenMatch[1].trim();
    if (inside.length >= 4) return normalizeMedicalTitle(inside);
  }
  return normalizeMedicalTitle(title);
}

export function processStudyFields(s: any): Study {
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

  const parseBool = (val: any): boolean => {
    if (typeof val === 'boolean') return val;
    if (typeof val === 'string') return val.toLowerCase() === 'true';
    return false;
  };

  return {
    ...s,
    id: s.id || generateId(),
    sourceType: defaultSourceType,
    specialty: defaultSpecialty,
    design: defaultDesign,
    impact: s.impact || 'informative',
    year: typeof s.year === 'number' ? s.year : (parseInt(s.year, 10) || new Date().getFullYear()),
    asianData: parseBool(s.asianData),
    bookmarked: parseBool(s.bookmarked)
  };
}

export function processAndDeduplicateStudies(list: any[]): Study[] {
  if (!Array.isArray(list)) return [];
  const deletedList = getDeletedStudyIds();
  const seenIds = new Set<string>();
  const seenCoreKeys = new Map<string, Study>();
  const uniqueStudies: Study[] = [];

  for (const rawItem of list) {
    if (!rawItem) continue;
    const s = processStudyFields(rawItem);
    if (!s || !s.id) continue;
    if (isStudyDeleted(s, deletedList)) continue;
    if (seenIds.has(s.id)) continue;

    const coreKey = extractCoreKey(s.title);
    if (coreKey && seenCoreKeys.has(coreKey)) {
      const existing = seenCoreKeys.get(coreKey)!;
      if (!existing.file && s.file) existing.file = s.file;
      if ((!existing.summary || existing.summary === 'Không có kết luận') && s.summary) existing.summary = s.summary;
      continue;
    }

    seenIds.add(s.id);
    if (coreKey) seenCoreKeys.set(coreKey, s);
    uniqueStudies.push(s);
  }

  return uniqueStudies;
}

export function loadStudies(): void {
  try {
    localStorage.removeItem('clinicalGuidelines');
    localStorage.removeItem('internalMedicineStudies');
  } catch (e) {}

  let rawList: any[] = [];
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
  window.studies.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
}

export function saveStudies(): void {
  try {
    const validStudies = (window.studies || []).filter(s => s && s.id);
    localStorage.setItem('cliniportal_custom_studies', JSON.stringify(validStudies));
  } catch (e) {}

  if (typeof window.CliniPortalSync !== 'undefined' && typeof window.CliniPortalSync.notifyUpdate === 'function') {
    window.CliniPortalSync.notifyUpdate();
  }
}

export function generateId(): string {
  return 'study_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
}

// ════════════════════════════════════════════════════════════════
// SMART DUPLICATE DETECTOR (Phép kiểm trùng lặp dữ liệu)
// ════════════════════════════════════════════════════════════════

export function normalizeOrgName(str?: string): string {
  if (!str) return '';
  const s = String(str).toLowerCase().trim()
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

function getTitleTokenSet(str?: string): Set<string> {
  if (!str) return new Set();
  const clean = str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, ' ');
  
  const stopwords = new Set([
    'va', 've', 'o', 'cho', 'trong', 'tren', 'duoi', 'voi', 'khi', 'la', 'cac', 'nhung', 'mot', 'nhieu',
    'huong', 'dan', 'khuyen', 'cao', 'dieu', 'tri', 'chan', 'doan', 'nghien', 'cuu', 'thu', 'nghiem',
    'and', 'or', 'the', 'of', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'from', 'about', 'trial', 'study', 'guideline', 'guidelines'
  ]);
  
  const tokens = clean.split(/\s+/).filter(t => t.length >= 3 && !stopwords.has(t));
  return new Set(tokens);
}

function calculateSetJaccard(setA: Set<string>, setB: Set<string>): number {
  if (!setA.size || !setB.size) return 0;
  let intersection = 0;
  setA.forEach(item => {
    if (setB.has(item)) intersection++;
  });
  const union = setA.size + setB.size - intersection;
  return union > 0 ? intersection / union : 0;
}

function extractConditionFromStudy(study: Study): { key: string; label: string } {
  if (study.conditionKey) {
    return { key: study.conditionKey, label: study.conditionKey };
  }

  let icdCodes: string[] = [];
  if (Array.isArray(study.icd10)) {
    icdCodes = study.icd10;
  } else if (typeof study.icd10 === 'string') {
    try {
      const parsed = JSON.parse(study.icd10);
      if (Array.isArray(parsed)) icdCodes = parsed;
      else icdCodes = study.icd10.split(/[,;\s]+/).filter(Boolean);
    } catch(e) {
      icdCodes = study.icd10.split(/[,;\s]+/).filter(Boolean);
    }
  }

  const conditions = (window.CLINICAL_CONDITIONS || {}) as Record<string, any>;
  for (const [condKey, condObj] of Object.entries(conditions)) {
    if (condObj.icd10 && Array.isArray(condObj.icd10)) {
      for (const code of icdCodes) {
        const cleanCode = code.trim().toUpperCase();
        if (condObj.icd10.some((icd: string) => cleanCode.startsWith(icd) || icd.startsWith(cleanCode))) {
          return { key: condKey, label: condObj.name || condKey };
        }
      }
    }
  }

  const textToScan = ((study.title || '') + ' ' + (study.summary || '')).toLowerCase();
  for (const [condKey, condObj] of Object.entries(conditions)) {
    const nameLower = (condObj.name || '').toLowerCase();
    if (nameLower && textToScan.includes(nameLower)) {
      return { key: condKey, label: condObj.name };
    }
  }

  return { key: study.specialty || 'other', label: study.specialty || 'Chuyên khoa chung' };
}

export function detectStudyDuplicate(candidate: Study, existingList?: Study[]): DuplicateCheckResult {
  if (!candidate) {
    return { isDuplicate: false, score: 0, matchedStudy: null, reasons: [], matchLevel: 'none' };
  }

  const targetList = Array.isArray(existingList) ? existingList : (window.studies || []);
  let highestScore = 0;
  let bestMatch: Study | null = null;
  let bestReasons: string[] = [];

  const candCoreKey = extractCoreKey(candidate.title);
  const candYear = candidate.year ? parseInt(String(candidate.year), 10) : null;
  const candOrg = normalizeOrgName(candidate.organization || candidate.journal);
  const candDrug = (candidate.drug || '').toLowerCase().trim();
  const candCond = extractConditionFromStudy(candidate);

  for (const existing of targetList) {
    if (!existing || existing.id === candidate.id) continue;

    const exCoreKey = extractCoreKey(existing.title);
    if (candCoreKey && exCoreKey && candCoreKey === exCoreKey) {
      return {
        isDuplicate: true,
        score: 100,
        matchedStudy: existing,
        reasons: ['Trùng khớp 100% Tiêu đề cốt lõi / Tên viết tắt nghiên cứu'],
        matchLevel: 'exact'
      };
    }

    const exCond = extractConditionFromStudy(existing);
    const isSameDisease = (candCond.key && exCond.key && candCond.key === exCond.key);
    if (!isSameDisease) continue;

    const exYear = existing.year ? parseInt(String(existing.year), 10) : null;
    const isSameYear = (candYear && exYear && Math.abs(candYear - exYear) <= 0);
    if (!isSameYear) continue;

    const exOrg = normalizeOrgName(existing.organization || existing.journal);
    const isSameOrg = (candOrg && exOrg && (candOrg === exOrg || candOrg.includes(exOrg) || exOrg.includes(candOrg)));
    if (!isSameOrg) continue;

    let score = 60;
    const reasons = [
      `Cùng Bệnh/Vấn đề (${candCond.label})`,
      `Cùng Năm công bố: ${candYear || exYear || 'N/A'}`,
      `Cùng Nguồn/Tổ chức: ${existing.organization || existing.journal || 'N/A'}`
    ];

    const candTitleTokens = getTitleTokenSet((candidate.title || '') + ' ' + (candidate.titleEn || ''));
    const exTitleTokens = getTitleTokenSet((existing.title || '') + ' ' + (existing.titleEn || ''));
    const tokenJaccard = calculateSetJaccard(candTitleTokens, exTitleTokens);
    if (tokenJaccard >= 0.3) {
      const titleBonus = Math.min(15, Math.round(tokenJaccard * 15));
      score += titleBonus;
      reasons.push(`Nội dung Tiêu đề trùng khớp (+${titleBonus}%)`);
    }

    const exDrug = (existing.drug || '').toLowerCase().trim();
    if (candDrug && exDrug && candDrug !== 'n/a' && exDrug !== 'n/a') {
      if (candDrug === exDrug || candDrug.includes(exDrug) || exDrug.includes(candDrug)) {
        score += 15;
        reasons.push(`Trùng Thuốc/Can thiệp (+15%)`);
      }
    }

    const candSummaryTokens = getTitleTokenSet(candidate.summary || candidate.keyResults || '');
    const exSummaryTokens = getTitleTokenSet(existing.summary || existing.keyResults || '');
    const summaryJaccard = calculateSetJaccard(candSummaryTokens, exSummaryTokens);
    if (summaryJaccard >= 0.25) {
      const summaryBonus = Math.min(10, Math.round(summaryJaccard * 10));
      score += summaryBonus;
      reasons.push(`Tóm tắt/Kết quả tương đồng (+${summaryBonus}%)`);
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = existing;
      bestReasons = reasons;
    }
  }

  const isDup = highestScore >= 60;
  let level: 'none' | 'moderate' | 'high' | 'exact' = 'none';
  if (highestScore >= 90) level = 'exact';
  else if (highestScore >= 75) level = 'high';
  else if (highestScore >= 60) level = 'moderate';

  return {
    isDuplicate: isDup,
    score: Math.min(100, highestScore),
    matchedStudy: bestMatch,
    reasons: bestReasons,
    matchLevel: level
  };
}

export function batchCheckDuplicates(incomingList: any[], existingList?: Study[]): BatchDuplicateItem[] {
  if (!Array.isArray(incomingList)) return [];
  const currentList = Array.isArray(existingList) ? [...existingList] : [...(window.studies || [])];
  
  return incomingList.map(item => {
    const processed = processStudyFields(item);
    const dupResult = detectStudyDuplicate(processed, currentList);
    return {
      item: processed,
      raw: item,
      dupResult: dupResult
    };
  });
}

// Gắn toàn bộ APIs lên window để đảm bảo tương thích 100%
if (typeof window !== 'undefined') {
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
  window.syncAllLocalToSupabase = syncAllLocalToSupabase;

  window.dbSaveStudy = dbSaveStudy;
  window.dbDeleteStudy = dbDeleteStudy;
  window.normalizeMedicalTitle = normalizeMedicalTitle;
  window.normalizeOrgName = normalizeOrgName;
  window.detectStudyDuplicate = detectStudyDuplicate;
  window.batchCheckDuplicates = batchCheckDuplicates;
  window.getDeletedStudyIds = getDeletedStudyIds;
  window.saveDeletedStudyId = saveDeletedStudyId;
  window.removeDeletedStudyId = removeDeletedStudyId;
  window.isStudyDeleted = isStudyDeleted;
  window.extractCoreKey = extractCoreKey;
  window.processStudyFields = processStudyFields;
  window.processAndDeduplicateStudies = processAndDeduplicateStudies;
  window.loadStudies = loadStudies;
  window.saveStudies = saveStudies;
  window.generateId = generateId;
}
