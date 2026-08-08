    let studies = [];
    let selectedIds = new Set();
    let expandedIds = new Set();
    let isMobileView = window.innerWidth <= 768;
    
    // View state
    let viewMode = 'compact'; // 'full' or 'compact'
    let currentTab = 'list'; // 'list', 'saved', 'compare'
    let showAdvancedFilters = false;

    function resolveStudyFile(filePath) {
      if (!filePath) return '';
      return filePath.replace(/^Kho Guidelines\//i, 'kho-guidelines/');
    }

    // Supabase state
    let supabaseClient = null;
    let supabaseConfig = { url: '', key: '' };
    let dbStatus = 'disconnected'; // 'connected', 'disconnected', 'error'

    // Columns visibility state
    let columnVisibility = {
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
    let filters = {
      search: '',
      sourceType: null,
      specialty: null,
      design: null,
      impact: null,
      period: null,
      asianData: false,
      hasSubgroup: false,
      hasSummary: false,
      icd10: null
    };

    let sortField = 'title';
    let sortAsc = true;

    // Helper tra cứu tên bệnh từ mã ICD-10
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

    // ════════════════════════════
    // SUPABASE CONFIG & SYNC
    // ════════════════════════════

    function initSupabase() {
      const url = localStorage.getItem('supabaseUrl');
      const key = localStorage.getItem('supabaseKey');
      
      if (url && key && window.supabase) {
        supabaseConfig = { url, key };
        try {
          supabaseClient = window.supabase.createClient(url, key);
          updateSupabaseStatus('connected', 'Supabase: Connected');
          return true;
        } catch (err) {
          console.error('Supabase initialization failed:', err);
          updateSupabaseStatus('error', 'Supabase: Conn Error');
          return false;
        }
      } else {
        supabaseClient = null;
        updateSupabaseStatus('disconnected', 'Supabase: Local Mode');
        return false;
      }
    }

    function updateSupabaseStatus(status, text) {
      dbStatus = status;
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
      document.getElementById('sb-url').value = url;
      document.getElementById('sb-key').value = key;
      document.getElementById('supabase-modal').classList.add('active');
    }

    function closeSupabaseModal() {
      document.getElementById('supabase-modal').classList.remove('active');
    }

    function saveSupabaseConfig(event) {
      event.preventDefault();
      const url = document.getElementById('sb-url').value.trim();
      const key = document.getElementById('sb-key').value.trim();
      
      localStorage.setItem('supabaseUrl', url);
      localStorage.setItem('supabaseKey', key);
      
      alert('💾 Đã lưu thông tin cấu hình Supabase!');
      closeSupabaseModal();
      
      if (initSupabase()) {
        syncStudiesWithSupabase();
      }
    }

    function clearSupabaseConfig() {
      if (confirm('☁️ Bạn có chắc chắn muốn xóa cấu hình Supabase? Tất cả dữ liệu nghiên cứu hiện tại sẽ bị xóa khỏi hệ thống.')) {
        localStorage.removeItem('supabaseUrl');
        localStorage.removeItem('supabaseKey');
        localStorage.removeItem('clinicalGuidelines');
        localStorage.removeItem('internalMedicineStudies');
        document.getElementById('sb-url').value = '';
        document.getElementById('sb-key').value = '';
        
        studies = [];
        selectedIds.clear();
        expandedIds.clear();
        saveStudies();
        
        closeSupabaseModal();
        initSupabase();
        renderTable();
        renderUpdates();
        alert('🗑️ Đã xóa cấu hình Supabase và tự động xóa tất cả các nghiên cứu!');
      }
    }

    async function syncStudiesWithSupabase() {
      if (!supabaseClient) return;
      
      updateSupabaseStatus('connected', 'Supabase: Syncing...');
      try {
        const { data, error } = await supabaseClient
          .from('clinical_guidelines')
          .select('*')
          .order('createdAt', { ascending: false });
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Identify local-only studies (added offline or failed to sync before page reload)
          const remoteIds = new Set(data.map(s => s.id));
          const localOnlyStudies = studies.filter(s => !remoteIds.has(s.id));

          const remoteStudies = data.map(s => {
            return {
              ...s, // Preserve rich EBM fields like matrixEndpoints, relatedCalculators, citation, pocketCard, decisionTree, etc.
              id: s.id,
              title: s.title || '',
              author: s.author || '',
              drug: s.drug || 'N/A',
              sourceType: s.sourceType || 'intl-study',
              specialty: s.specialty || 'cardio',
              design: s.design || 'rct',
              intervention: s.intervention || '',
              primaryEndpoint: s.primaryEndpoint || '',
              keyResults: s.keyResults || '',
              impact: s.impact || 'informative',
              year: s.year || new Date().getFullYear(),
              organization: s.organization || 'N/A',
              phase: s.phase || 'N/A',
              sampleSize: s.sampleSize || null,
              population: s.population || 'N/A',
              summary: s.summary || 'Không có kết luận',
              detailedConclusion: s.detailedConclusion || '',
              fdaStatus: s.fdaStatus || 'N/A',
              sourceUrl: s.sourceUrl || '',
              file: s.file || '',
              parts: Array.isArray(s.parts) ? s.parts : (typeof s.parts === 'string' && s.parts ? (() => { try { return JSON.parse(s.parts); } catch(e) { return null; } })() : null),
              asianData: s.asianData !== undefined ? s.asianData : false,
              bookmarked: s.bookmarked !== undefined ? s.bookmarked : false,
              icd10: Array.isArray(s.icd10) ? s.icd10 : (typeof s.icd10 === 'string' && s.icd10 ? (() => { try { return JSON.parse(s.icd10); } catch(e) { return []; } })() : []),
              subgroups: (typeof s.subgroups === 'object' && s.subgroups !== null) ? s.subgroups
                         : (typeof s.subgroups === 'string' && s.subgroups ? (() => { try { return JSON.parse(s.subgroups); } catch(e) { return null; } })() : null),
              createdAt: s.createdAt || new Date().toISOString()
            };
          });
          
          // Merge and sort
          studies = [...localOnlyStudies, ...remoteStudies];
          studies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          
          saveStudies(); // cache local
          renderTable();
          renderUpdates();
          updateSupabaseStatus('connected', `Supabase: Đã nạp ${remoteStudies.length} bài`);

          // Sync any local-only studies to Supabase
          if (localOnlyStudies.length > 0) {
            localOnlyStudies.forEach(study => dbSaveStudy(study));
          }
        } else {
          // Upload local data to seed Supabase
          if (studies.length > 0) {
            const { error: insertError } = await supabaseClient
              .from('clinical_guidelines')
              .insert(studies.map(s => ({
                id: s.id,
                title: s.title,
                author: s.author,
                drug: s.drug,
                sourceType: s.sourceType,
                specialty: s.specialty,
                design: s.design,
                intervention: s.intervention || '',
                primaryEndpoint: s.primaryEndpoint || '',
                keyResults: s.keyResults || '',
                impact: s.impact,
                year: s.year,
                organization: s.organization,
                phase: s.phase,
                sampleSize: s.sampleSize,
                population: s.population,
                summary: s.summary,
                detailedConclusion: s.detailedConclusion,
                fdaStatus: s.fdaStatus,
                sourceUrl: s.sourceUrl,
                file: s.file,
                asianData: s.asianData,
                bookmarked: s.bookmarked,
                icd10: s.icd10 ? JSON.stringify(s.icd10) : null,
                subgroups: s.subgroups ? JSON.stringify(s.subgroups) : null,
                createdAt: s.createdAt
              })));
              
            if (insertError) throw insertError;
            updateSupabaseStatus('connected', 'Supabase: Seeded');
          }
        }
      } catch (err) {
        console.error('Supabase Sync failed:', err);
        updateSupabaseStatus('error', 'Supabase: Sync Failed');
      }
    }

    async function dbSaveStudy(study) {
      if (!supabaseClient) return;
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
          icd10: study.icd10 ? JSON.stringify(study.icd10) : null,
          subgroups: study.subgroups ? JSON.stringify(study.subgroups) : null,
          createdAt: study.createdAt
        };

        const { error } = await supabaseClient
          .from('clinical_guidelines')
          .upsert(payload, { onConflict: 'id' });

        if (error) throw error;
        console.log('Saved to Supabase successfully');
      } catch (err) {
        console.error('Failed to save to Supabase:', err);
        // Hiển thị chi tiết lỗi lên UI để dễ chẩn đoán
        updateSupabaseStatus('error', 'Lỗi: ' + (err.message || err.details || 'Save Failed'));
      }
    }

    async function dbDeleteStudy(id) {
      if (!supabaseClient) return;
      try {
        const { error } = await supabaseClient
          .from('clinical_guidelines')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
        console.log('Deleted from Supabase successfully');
      } catch (err) {
        console.error('Failed to delete from Supabase:', err);
        updateSupabaseStatus('error', 'Supabase: Delete Failed');
      }
    }

    // ════════════════════════════
    // DATA MIGRATION & LOCAL STORAGE
    // ════════════════════════════
    
    function loadStudies() {
      let saved = localStorage.getItem('clinicalGuidelines');
      if (!saved) {
        // Fallback for older version
        saved = localStorage.getItem('internalMedicineStudies');
      }
      if (saved) {
        try {
          studies = JSON.parse(saved);
          
          // Data structure migration
          studies = studies.map(s => {
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
              ...s, // Preserve rich EBM fields like matrixEndpoints, relatedCalculators, etc.
              id: s.id || generateId(),
              title: s.title || '',
              author: s.author || '',
              drug: s.drug || 'N/A',
              sourceType: defaultSourceType,
              specialty: s.specialty || 'cardio',
              design: defaultDesign,
              intervention: s.intervention || '',
              primaryEndpoint: s.primaryEndpoint || '',
              keyResults: s.keyResults || '',
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
                if (typeof SAMPLE_STUDIES !== 'undefined') {
                  const match = SAMPLE_STUDIES.find(sm => sm.id === s.id || sm.title === s.title);
                  if (match && match.parts) return match.parts;
                }
                return null;
              })(),
              asianData: s.asianData !== undefined ? s.asianData : false,
              bookmarked: s.bookmarked !== undefined ? s.bookmarked : false,
              icd10: (() => {
                let parsed = Array.isArray(s.icd10) && s.icd10.length > 0 
                  ? s.icd10 
                  : (typeof s.icd10 === 'string' && s.icd10 ? (() => { try { return JSON.parse(s.icd10); } catch(e) { return []; } })() : []);
                if ((!parsed || parsed.length === 0) && typeof SAMPLE_STUDIES !== 'undefined') {
                  const match = SAMPLE_STUDIES.find(sm => sm.id === s.id || sm.title === s.title);
                  if (match && match.icd10) parsed = match.icd10;
                }
                if (!parsed || parsed.length === 0) {
                  const spec = s.specialty || 'cardio';
                  if (spec === 'cardio') parsed = ['I50', 'I10'];
                  else if (spec === 'pulmo') parsed = ['J44'];
                  else if (spec === 'endo') parsed = ['E11'];
                  else if (spec === 'renal') parsed = ['N18'];
                  else if (spec === 'infect' || spec === 'icu') parsed = ['A41'];
                }
                return parsed;
              })(),
              subgroups: (s.subgroups && typeof s.subgroups === 'object' && !Array.isArray(s.subgroups)) ? s.subgroups
                         : (typeof s.subgroups === 'string' && s.subgroups ? (() => { try { return JSON.parse(s.subgroups); } catch(e) { return null; } })() : null),
              createdAt: s.createdAt || new Date().toISOString()
            };
          });
          saveStudies();
        } catch (e) {
          console.error('Lỗi khi phân tích cú pháp nghiên cứu đã lưu, sử dụng dữ liệu mẫu:', e);
          studies = [...SAMPLE_STUDIES];
        }
      } else {
        studies = [...SAMPLE_STUDIES];
        saveStudies();
      }
    }

    function saveStudies() {
      localStorage.setItem('clinicalGuidelines', JSON.stringify(studies));
    }

    function generateId() {
      return 'study_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // ════════════════════════════
    // RENDER FUNCTIONS: FILTER PILLS
    // ════════════════════════════

    function renderFilterPills() {
      // 1. Source Type pills
      const sourceContainer = document.getElementById('source-type-pills');
      if (sourceContainer) {
        let sourceHtml = `<button class="filter-pill ${filters.sourceType === null ? 'active' : ''}" onclick="setFilter('sourceType', null)">Tất cả</button>`;
        Object.entries(SOURCE_TYPES).forEach(([key, src]) => {
          sourceHtml += `<button class="filter-pill ${filters.sourceType === key ? 'active' : ''}" onclick="setFilter('sourceType', '${key}')">${src.name}</button>`;
        });
        sourceContainer.innerHTML = sourceHtml;
      }

      // 2. Specialty pills
      const specContainer = document.getElementById('specialty-pills');
      if (specContainer) {
        let specHtml = `<button class="filter-pill ${filters.specialty === null ? 'active' : ''}" onclick="setFilter('specialty', null)">Tất cả</button>`;
        Object.entries(SPECIALTIES).forEach(([key, spec]) => {
          specHtml += `<button class="filter-pill ${filters.specialty === key ? 'active' : ''}" onclick="setFilter('specialty', '${key}')">${spec.name}</button>`;
        });
        specContainer.innerHTML = specHtml;
      }

      // 3. Design pills
      const designContainer = document.getElementById('design-pills');
      if (designContainer) {
        let designHtml = `<button class="filter-pill ${filters.design === null ? 'active' : ''}" onclick="setFilter('design', null)">Tất cả</button>`;
        Object.entries(DESIGNS).forEach(([key, des]) => {
          designHtml += `<button class="filter-pill ${filters.design === key ? 'active' : ''}" onclick="setFilter('design', '${key}')">${des.name}</button>`;
        });
        designContainer.innerHTML = designHtml;
      }

      // 4. Impact pills
      const impactContainer = document.getElementById('impact-pills');
      if (impactContainer) {
        let impactHtml = `<button class="filter-pill ${filters.impact === null ? 'active' : ''}" onclick="setFilter('impact', null)">Tất cả</button>`;
        Object.entries(IMPACTS).forEach(([key, imp]) => {
          impactHtml += `<button class="filter-pill ${filters.impact === key ? 'active' : ''}" onclick="setFilter('impact', '${key}')">${imp.name}</button>`;
        });
        impactContainer.innerHTML = impactHtml;
      }

      // 5. Period pills
      const periodContainer = document.getElementById('period-pills');
      if (periodContainer) {
        const periods = [
          { key: null, name: 'Tất cả' },
          { key: '2weeks', name: '2 tuần qua' },
          { key: '1month', name: 'Tháng qua' },
          { key: '1year', name: 'Năm qua' }
        ];
        let periodHtml = '';
        periods.forEach(p => {
          periodHtml += `<button class="filter-pill ${filters.period === p.key ? 'active' : ''}" onclick="setFilter('period', ${p.key ? `'${p.key}'` : 'null'})">${p.name}</button>`;
        });
        periodContainer.innerHTML = periodHtml;
      }

      const leftNavSpecList = document.getElementById('spec-filter-list');
      if (leftNavSpecList) {
        let specHtml = `
          <button class="spec-filter-item ${filters.specialty === null ? 'active' : ''}" onclick="setFilter('specialty', null)" title="Tất cả chuyên khoa">
            <span class="spec-filter-dot" style="background: var(--text-faint);"></span>
            <span class="left-nav-text">Tất cả</span>
          </button>
        `;
        Object.entries(SPECIALTIES).forEach(([key, spec]) => {
          specHtml += `
            <button class="spec-filter-item ${filters.specialty === key ? 'active' : ''}" onclick="setFilter('specialty', '${key}')" title="${spec.name}">
              <span class="spec-filter-dot" style="background: ${spec.color};"></span>
              <span class="left-nav-text">${spec.name}</span>
            </button>
          `;
        });
        leftNavSpecList.innerHTML = specHtml;
      }
    }

    // Helper for period validation
    function isWithinPeriod(study, period) {
      if (!period) return true;
      const now = new Date();
      const createdDate = study.createdAt ? new Date(study.createdAt) : new Date(study.year, 0, 1);
      const diffTime = Math.abs(now - createdDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (period === '2weeks') return diffDays <= 14;
      if (period === '1month') return diffDays <= 30;
      if (period === '1year') return diffDays <= 365;
      return true;
    }

    // ════════════════════════════
    // FILTER & SORT & VIEW LOGIC
    // ════════════════════════════

    function getFilteredStudies() {
      const searchLower = filters.search ? filters.search.toLowerCase().trim() : '';

      let result = studies.filter(s => {
        if (currentTab === 'saved' && !s.bookmarked) return false;
        if (filters.sourceType && s.sourceType !== filters.sourceType) return false;
        if (filters.specialty && s.specialty !== filters.specialty) return false;
        if (filters.design && s.design !== filters.design) return false;
        if (filters.impact && s.impact !== filters.impact) return false;
        if (filters.period && !isWithinPeriod(s, filters.period)) return false;
        if (filters.asianData && !s.asianData) return false;
        if (filters.hasSubgroup && (!s.subgroups || typeof s.subgroups !== 'object' || Object.keys(s.subgroups).length === 0)) return false;
        if (filters.hasSummary && (!s.file || s.file.trim() === '')) return false;
        if (filters.icd10 && (!Array.isArray(s.icd10) || !s.icd10.some(code => code.startsWith(filters.icd10) || filters.icd10.startsWith(code)))) return false;
        
        if (searchLower) {
          const tTitle = s.title && s.title.toLowerCase().includes(searchLower);
          const tDrug = s.drug && s.drug.toLowerCase().includes(searchLower);
          const tOrg = s.organization && s.organization.toLowerCase().includes(searchLower);
          const tSum = s.summary && s.summary.toLowerCase().includes(searchLower);
          const tDetail = s.detailedConclusion && s.detailedConclusion.toLowerCase().includes(searchLower);
          const tPop = s.population && s.population.toLowerCase().includes(searchLower);
          const tInterv = s.intervention && s.intervention.toLowerCase().includes(searchLower);
          const tEnd = s.primaryEndpoint && s.primaryEndpoint.toLowerCase().includes(searchLower);
          const tRes = s.keyResults && s.keyResults.toLowerCase().includes(searchLower);
          if (!tTitle && !tDrug && !tOrg && !tSum && !tDetail && !tPop && !tInterv && !tEnd && !tRes) return false;
        }
        return true;
      });

      // Sort logic
      if (sortField) {
        result.sort((a, b) => {
          let aVal = a[sortField] || '';
          let bVal = b[sortField] || '';

          if (typeof aVal === 'string') aVal = aVal.toLowerCase();
          if (typeof bVal === 'string') bVal = bVal.toLowerCase();

          // Numbers comparison
          if (typeof aVal === 'number' && typeof bVal === 'number') {
            return sortAsc ? aVal - bVal : bVal - aVal;
          }

          if (aVal < bVal) return sortAsc ? -1 : 1;
          if (aVal > bVal) return sortAsc ? 1 : -1;
          return 0;
        });
      }

      return result;
    }

    function setFilter(type, value) {
      filters[type] = value;
      renderFilterPills();
      renderTable();
    }

    function handleAsianFilterChange() {
      filters.asianData = document.getElementById('asian-data-filter').checked;
      renderTable();
    }

    let searchDebounceTimer = null;
    function handleSearch() {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        filters.search = document.getElementById('search-input').value;
        updateUrlState();
        renderTable();
      }, 150);
    }

    // ════════════════════════════
    // ICD-10 FILTER LOGIC
    // ════════════════════════════
    let icdDebounceTimer = null;
    
    function openIcdFilterModal() {
      document.getElementById('icd10-modal').classList.add('active');
      const input = document.getElementById('icd-search-input');
      input.value = '';
      input.focus();
      
      const resultsContainer = document.getElementById('icd-results-container');
      resultsContainer.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--text-muted);">Nhập từ khóa để tìm mã ICD-10</div>';
      
      input.removeEventListener('input', handleIcdSearchInput);
      input.addEventListener('input', handleIcdSearchInput);
    }
    
    function closeIcdFilterModal() {
      document.getElementById('icd10-modal').classList.remove('active');
    }
    
    function handleIcdSearchInput(e) {
      if (icdDebounceTimer) clearTimeout(icdDebounceTimer);
      icdDebounceTimer = setTimeout(() => {
        searchIcd10(e.target.value);
      }, 300);
    }
    
    function searchIcd10(query) {
      const container = document.getElementById('icd-results-container');
      const lowerQuery = query.trim().toLowerCase();
      
      if (lowerQuery.length < 2) {
        container.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--text-muted);">Nhập ít nhất 2 ký tự để tìm kiếm.</div>';
        return;
      }
      
      if (!window.ICD10_DATA) {
        container.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--text-muted);">Đang tải dữ liệu ICD-10...</div>';
        return;
      }
      
      const results = window.ICD10_DATA.filter(item => 
        item.code.toLowerCase().includes(lowerQuery) || 
        (item.name && item.name.toLowerCase().includes(lowerQuery)) ||
        (item.nameEn && item.nameEn.toLowerCase().includes(lowerQuery))
      ).slice(0, 30);
      
      if (results.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--text-muted);">Không tìm thấy mã bệnh phù hợp.</div>';
        return;
      }
      
      let html = '<div style="display:flex; flex-direction:column;">';
      results.forEach(r => {
        html += `
          <div onclick="selectIcd10Filter('${r.code}', '${r.name.replace(/'/g, "\\'")}')" style="padding:12px 16px; border-bottom:1px solid var(--border-light); cursor:pointer; display:flex; align-items:flex-start; gap:12px;" onmouseover="this.style.background='var(--bg-color)'" onmouseout="this.style.background=''">
            <span style="font-size:13px; font-weight:700; color:#4338ca; background:#e0e7ff; padding:2px 8px; border-radius:4px; white-space:nowrap;">${r.code}</span>
            <div style="display:flex; flex-direction:column; gap:2px;">
              <span style="font-size:14px; color:var(--text-color); font-weight:500;">${r.name}</span>
              ${r.nameEn ? `<span style="font-size:12px; color:var(--text-muted);">${r.nameEn}</span>` : ''}
            </div>
          </div>
        `;
      });
      html += '</div>';
      
      container.innerHTML = html;
    }
    
    function selectIcd10Filter(code, name) {
      filters.icd10 = code;
      const btn = document.getElementById('filter-icd-btn');
      btn.innerHTML = `Mã ICD-10: ${code} <span onclick="event.stopPropagation(); clearIcdFilter()" style="margin-left:8px; cursor:pointer; color:var(--danger);">&times;</span>`;
      btn.classList.add('active');
      btn.style.background = '#e0e7ff';
      btn.style.borderColor = '#4338ca';
      btn.style.color = '#4338ca';
      closeIcdFilterModal();
      renderTable();
    }
    
    function clearIcdFilter() {
      filters.icd10 = null;
      const btn = document.getElementById('filter-icd-btn');
      btn.innerHTML = '🔍 Lọc ICD-10';
      btn.classList.remove('active');
      btn.style.background = '';
      btn.style.borderColor = '';
      btn.style.color = '';
      renderTable();
    }

    function handleSort(field) {
      if (sortField === field) {
        sortAsc = !sortAsc;
      } else {
        sortField = field;
        sortAsc = true;
      }
      renderTable();
    }

    function toggleHasSummaryFilter() {
      filters.hasSummary = !filters.hasSummary;
      const btn = document.getElementById('filter-summary-btn');
      const sideBtn = document.getElementById('sidebar-btn-summary');
      if (btn) btn.classList.toggle('active', filters.hasSummary);
      if (sideBtn) sideBtn.classList.toggle('active', filters.hasSummary);
      renderTable();
    }

    function filterByHasSummary() {
      document.querySelectorAll('.left-nav-link').forEach(l => l.classList.remove('active'));
      const sideBtn = document.getElementById('sidebar-btn-summary');
      if (sideBtn) sideBtn.classList.add('active');
      filters.hasSummary = !filters.hasSummary;
      const btn = document.getElementById('filter-summary-btn');
      if (btn) btn.classList.toggle('active', filters.hasSummary);
      renderTable();
    }

    function resetFilters() {
      filters = {
        search: '',
        sourceType: null,
        specialty: null,
        design: null,
        impact: null,
        period: null,
        asianData: false,
        hasSubgroup: false,
        hasSummary: false
      };
      document.getElementById('search-input').value = '';
      document.getElementById('asian-data-filter').checked = false;
      const btn = document.getElementById('filter-summary-btn');
      const sideBtn = document.getElementById('sidebar-btn-summary');
      if (btn) btn.classList.remove('active');
      if (sideBtn) sideBtn.classList.remove('active');
      renderFilterPills();
      renderTable();
    }

    // ════════════════════════════
    // TABS MANAGEMENT
    // ════════════════════════════

    function switchTab(tabName) {
      currentTab = tabName;

      document.querySelectorAll('.tab-trigger').forEach(btn => btn.classList.remove('active'));
      const activeBtn = document.getElementById(`tab-${tabName}`);
      if (activeBtn) activeBtn.classList.add('active');

      document.getElementById('sidebar-btn-studies').classList.remove('active');
      document.getElementById('sidebar-btn-saved').classList.remove('active');
      if (tabName === 'list') {
        document.getElementById('sidebar-btn-studies').classList.add('active');
        filters.hasSubgroup = false;
        filters.asianData = false;
        const asianCheckbox = document.getElementById('asian-data-filter');
        if (asianCheckbox) asianCheckbox.checked = false;
      }
      if (tabName === 'saved') {
        document.getElementById('sidebar-btn-saved').classList.add('active');
      }

      const panelStudies   = document.getElementById('panel-studies');
      const panelCompare   = document.getElementById('panel-compare');
      const panelAnalytics = document.getElementById('panel-analytics');
      const panelTimeline  = document.getElementById('panel-timeline');
      const pageTitle      = document.getElementById('page-panel-title');

      [panelStudies, panelCompare, panelAnalytics, panelTimeline]
        .filter(Boolean)
        .forEach(p => p.classList.remove('active'));

      if (tabName === 'compare') {
        panelCompare.classList.add('active');
        pageTitle.textContent = 'So Sánh Tài Liệu';
        if (typeof compareMode !== 'undefined' && compareMode === 'matrix') {
          renderCompareMatrix();
        } else {
          renderCompareView();
        }
      } else if (tabName === 'analytics') {
        panelAnalytics.classList.add('active');
        pageTitle.textContent = 'Thống Kê & Phân Tích';
        renderAnalytics();
      } else if (tabName === 'timeline') {
        panelTimeline.classList.add('active');
        pageTitle.textContent = 'Timeline Hướng Dẫn';
        renderTimeline();
      } else {
        panelStudies.classList.add('active');
        pageTitle.textContent = tabName === 'saved' ? 'Tài Liệu Đã Lưu' : 'Hướng Dẫn & Nghiên Cứu Lâm Sàng';
        renderTable();
      }
    }

    function setViewMode(mode) {
      viewMode = mode;
      document.getElementById('view-mode-full').classList.toggle('active', mode === 'full');
      document.getElementById('view-mode-compact').classList.toggle('active', mode === 'compact');
      renderTable();
    }

    function toggleAdvancedFilters() {
      showAdvancedFilters = !showAdvancedFilters;
      document.getElementById('filter-row-specialty').style.display = showAdvancedFilters ? 'flex' : 'none';
      document.getElementById('filter-row-design').style.display = showAdvancedFilters ? 'flex' : 'none';
      document.getElementById('filter-row-period').style.display = showAdvancedFilters ? 'flex' : 'none';
      document.getElementById('advanced-filters-btn').classList.toggle('active', showAdvancedFilters);
    }

    function toggleColumnsDropdown(event) {
      event.stopPropagation();
      document.getElementById('columns-dropdown-menu').classList.toggle('active');
    }

    function toggleColumnVisibility(colName, isVisible) {
      columnVisibility[colName] = isVisible;
      
      // Toggle the headers in table DOM directly
      const table = document.getElementById('studies-table-element');
      const th = table.querySelector(`thead th[data-col="${colName}"]`);
      if (th) {
        th.style.display = isVisible ? '' : 'none';
      }
      
      renderTable();
    }

    // ════════════════════════════
    // MULTI-PART SUMMARY HELPER
    // ════════════════════════════

    function renderSummaryButton(study, variant = 'badge') {
      const parts = (study.parts && Array.isArray(study.parts) && study.parts.length > 0)
        ? study.parts
        : (study.file ? [{ label: 'Tóm tắt', file: study.file }] : []);

      if (!parts || parts.length === 0) return '';

      const isMulti = parts.length > 1;

      if (!isMulti) {
        const fileUrl = resolveStudyFile(parts[0].file);
        if (variant === 'btn-primary' || variant === 'btn-primary-compare') {
          return `<a href="${fileUrl}" class="btn btn-small btn-primary" onclick="event.stopPropagation()">📝 Tóm tắt</a>`;
        } else if (variant === 'btn') {
          return `<a href="${fileUrl}" class="btn btn-small" onclick="event.stopPropagation()">📝 Tóm tắt</a>`;
        } else if (variant === 'badge-mobile') {
          return `<a href="${fileUrl}" class="badge-summary-inline" onclick="event.stopPropagation()" title="Mở bài viết tóm tắt chi tiết" style="margin-left: auto; font-size:0.7rem; padding: 2px 6px;">📝 Tóm tắt</a>`;
        } else {
          return `<a href="${fileUrl}" class="badge-summary-inline" onclick="event.stopPropagation()" title="Mở bài viết tóm tắt chi tiết">📝 Tóm tắt</a>`;
        }
      }

      // Multi-part dropdown button
      const menuId = 'summary-parts-menu-' + study.id + '-' + variant + '-' + Math.floor(Math.random() * 10000);
      const itemsHtml = parts.map((p, idx) => `
        <a href="${resolveStudyFile(p.file)}" class="summary-parts-item" onclick="event.stopPropagation()">
          <i class="fa-solid fa-file-lines" style="color: var(--accent); margin-right: 6px;"></i>
          <span>${escapeHtml(p.label || ('Phần ' + (idx + 1)))}</span>
        </a>
      `).join('');

      let btnClass = 'badge-summary-inline';
      let btnStyle = '';
      if (variant === 'btn-primary' || variant === 'btn-primary-compare') {
        btnClass = 'btn btn-small btn-primary';
      } else if (variant === 'btn') {
        btnClass = 'btn btn-small';
      } else if (variant === 'badge-mobile') {
        btnStyle = 'margin-left: auto; font-size:0.7rem; padding: 2px 6px;';
      }

      return `
        <div class="summary-parts-dropdown" style="position:relative; display:inline-block;">
          <button type="button" class="${btnClass}" style="${btnStyle}" onclick="event.stopPropagation(); toggleSummaryPartsMenu('${menuId}', event)" title="Chọn phần tóm tắt">
            📝 Tóm tắt (${parts.length} Phần) <span style="font-size:9px; margin-left:3px;">▼</span>
          </button>
          <div id="${menuId}" class="summary-parts-menu" onclick="event.stopPropagation()">
            ${itemsHtml}
          </div>
        </div>
      `;
    }

    function toggleSummaryPartsMenu(menuId, event) {
      if (event) event.stopPropagation();
      const menu = document.getElementById(menuId);
      if (!menu) return;
      const isAlreadyActive = menu.classList.contains('active');
      document.querySelectorAll('.summary-parts-menu.active').forEach(m => m.classList.remove('active'));
      if (!isAlreadyActive) {
        menu.classList.add('active');
      }
    }

    window.toggleSummaryPartsMenu = toggleSummaryPartsMenu;

    window.openForestPlot = function(studyId) {
      const study = studies.find(s => s.id === studyId);
      if (study && study.statistics) {
        sessionStorage.setItem('forestPlotData', JSON.stringify({
          studyId: study.id,
          title: study.title,
          intervention: study.pico ? study.pico.intervention : study.intervention,
          comparator: study.pico ? study.pico.comparator : 'Control',
          outcome: study.pico ? study.pico.outcome : study.primaryEndpoint,
          statistics: study.statistics
        }));
        window.open('../ebm-lab/forest-plot.html', '_blank');
      } else {
        alert("Nghiên cứu này không có đủ dữ liệu thống kê để vẽ Forest Plot.");
      }
    };

    document.addEventListener('click', () => {
      document.querySelectorAll('.summary-parts-menu.active').forEach(m => m.classList.remove('active'));
    });

    // ════════════════════════════
    // TABLE GENERATOR
    // ════════════════════════════

    function renderTable() {
      // Detect mobile and delegate
      isMobileView = window.innerWidth <= 768;
      if (isMobileView && (currentTab === 'list' || currentTab === 'saved')) {
        const filtered = getFilteredStudies();
        // Show table element for saved/list tab if desktop, else handle mobile
        const tableEl = document.getElementById('studies-table-element');
        if (tableEl) tableEl.style.display = 'none';
        const oldCards = document.getElementById('mobile-cards-container');
        if (oldCards) oldCards.remove();
        const emptyState = document.getElementById('empty-state');
        const displayCount = document.getElementById('display-count');
        displayCount.textContent = filtered.length;
        updateBadges();
        if (filtered.length === 0) {
          emptyState.style.display = 'block';
          if (currentTab === 'saved') {
            document.getElementById('empty-state-message').textContent = 'Chưa có tài liệu nào được lưu trữ.';
          } else {
            document.getElementById('empty-state-message').textContent = 'Không tìm thấy tài liệu nào khớp với bộ lọc.';
          }
          return;
        }
        emptyState.style.display = 'none';
        renderMobileCards(filtered);
        return;
      }
      // Desktop: ensure table is visible, remove any leftover mobile cards
      const tableEl = document.getElementById('studies-table-element');
      if (tableEl) tableEl.style.display = '';
      const oldCards = document.getElementById('mobile-cards-container');
      if (oldCards) oldCards.remove();

      const tbody = document.getElementById('table-body');
      const emptyState = document.getElementById('empty-state');
      const displayCount = document.getElementById('display-count');
      
      const filtered = getFilteredStudies();
      displayCount.textContent = filtered.length;
      updateBadges();

      if (filtered.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = 'block';
        if (currentTab === 'saved') {
          document.getElementById('empty-state-message').textContent = 'Chưa có tài liệu nào được lưu trữ. Hãy nhấn ngôi sao ở bảng danh sách để lưu.';
        } else {
          document.getElementById('empty-state-message').textContent = 'Không tìm thấy tài liệu nào khớp với bộ lọc.';
        }
        return;
      }

      emptyState.style.display = 'none';

      let rowsHtml = '';
      filtered.forEach(study => {
        const isExpanded = expandedIds.has(study.id);
        const isSelected = selectedIds.has(study.id);
        const isBookmarked = study.bookmarked;

        const spec = SPECIALTIES[study.specialty] || { name: study.specialty, color: '#666', bg: '#f0f0f0' };
        const impactConfig = IMPACTS[study.impact] || { name: study.impact || 'N/A', color: '#6b7280', bg: '#f3f4f6' };
        const srcTypeConfig = SOURCE_TYPES[study.sourceType] || { name: study.sourceType || 'N/A', color: '#6b7280', bg: '#f3f4f6' };
        const designConfig = DESIGNS[study.design] || { name: study.design || 'N/A' };

        // Stale alert badge
        const staleBadge = getStaleAlertBadge(study);

        // Forest Plot parsing
        const forestData = parseForestData(study.keyResults);
        const forestPlotHtml = forestData ? `<div class="forest-plot-inline">${renderForestPlotSVG(forestData)}</div>` : '';

        // Subgroup Count & inline button
        const sgCount = (study.subgroups && typeof study.subgroups === 'object') ? Object.keys(study.subgroups).length : 0;
        const sgInlineBtn = sgCount > 0 ? `<button type="button" class="badge-subgroup-inline" onclick="event.stopPropagation(); openSubgroupModal('${study.id}', event)" title="Xem phân tích ${sgCount} phân nhóm">🧬 Subgroup (${sgCount})</button>` : '';

        // ICD-10 Tags (Chỉ hiển thị mã số ICD-10)
        const icd10Tags = (study.icd10 && Array.isArray(study.icd10) && study.icd10.length > 0)
          ? study.icd10.map(code => {
              const name = getIcd10Name(code);
              return `<span class="badge" style="background:#e0e7ff; color:#3730a3; border:1px solid #c7d2fe; padding:3px 8px; font-size:12px; font-weight:700; border-radius:4px; margin-right:4px; display:inline-block;" title="${name ? escapeHtml(name) : 'Mã ICD-10'}">${escapeHtml(code)}</span>`;
            }).join('')
          : '<span style="color:var(--text-muted); font-size:12px;">Chưa dán nhãn</span>';

        // Drug Interaction Linker Badge
        const drugInterBadge = (window.CliniPortalDrugLinker && typeof window.CliniPortalDrugLinker.renderDrugInteractionBadge === 'function')
          ? window.CliniPortalDrugLinker.renderDrugInteractionBadge(study)
          : '';

        // Columns HTML segments
        const sourceTypeCell = columnVisibility.sourceType ? `<td><span class="badge badge-src-${study.sourceType}">${srcTypeConfig.name}</span></td>` : '';
        const specialtyCell = columnVisibility.specialty ? `<td><span class="badge badge-${study.specialty}">${spec.name}</span></td>` : '';
        const designCell = columnVisibility.design ? `<td><span class="badge-source">${designConfig.name}</span></td>` : '';
        const organizationCell = columnVisibility.organization ? `<td><div class="study-summary ${viewMode === 'compact' ? 'clamped' : ''}">${escapeHtml(study.organization || 'N/A')} (${study.year})</div></td>` : '';
        // Generate new schema HTML safely fallback to old schema
        const interventionText = study.pico ? `<strong>P:</strong> ${escapeHtml(study.pico.population || 'N/A')}<br/><strong>I:</strong> ${escapeHtml(study.pico.intervention || 'N/A')}<br/><strong>C:</strong> ${escapeHtml(study.pico.comparator || 'N/A')}` : escapeHtml(study.intervention || 'N/A');
        const outcomeText = study.pico ? escapeHtml(study.pico.outcome || 'N/A') : escapeHtml(study.primaryEndpoint || 'N/A');
        const statsText = study.statistics ? `<strong>${study.statistics.type}</strong> ${study.statistics.value} (95% CI ${study.statistics.ciLower}-${study.statistics.ciUpper}); p=${study.statistics.pValue}` : escapeHtml(study.oldKeyResults || study.keyResults || 'N/A');

        const interventionCell = columnVisibility.intervention ? `<td><div class="study-summary ${viewMode === 'compact' ? 'clamped' : ''}">${interventionText}</div></td>` : '';
        const primaryEndpointCell = columnVisibility.primaryEndpoint ? `<td><div class="study-summary ${viewMode === 'compact' ? 'clamped' : ''}">${outcomeText}</div></td>` : '';
        const keyResultsCell = columnVisibility.keyResults ? `<td><div class="study-summary ${viewMode === 'compact' ? 'clamped' : ''}">${statsText}</div></td>` : '';
        
        // Cột bệnh ICD-10
        const icd10Cell = columnVisibility.icd10 ? `
          <td>
            <div style="display:flex; flex-wrap:wrap; gap:4px;">
              ${icd10Tags}
            </div>
          </td>
        ` : '';
        
        // Build stale badge inline for title column
        const staleInline = staleBadge ? `${staleBadge}` : '';
        const impactCell = columnVisibility.impact ? `
          <td>
            <span class="impact-badge impact-${study.impact}">
              <span class="impact-dot"></span>
              ${impactConfig.name}
            </span>
          </td>
        ` : '';
        
        const conclusionCell = columnVisibility.conclusion ? `
          <td>
            <div class="study-summary ${viewMode === 'compact' ? 'clamped' : ''}">
              ${escapeHtml(study.summary)}
            </div>
          </td>
        ` : '';

        const sampleSizeCell = columnVisibility.sampleSize ? `<td>${study.sampleSize ? 'n=' + formatNumber(study.sampleSize) : 'N/A'}</td>` : '';
        const populationCell = columnVisibility.population ? `<td><div class="study-summary ${viewMode === 'compact' ? 'clamped' : ''}">${escapeHtml(study.population || 'N/A')}</div></td>` : '';

        // Build GRADE badge and Forest Plot button
        let gradeBadge = '';
        if (study.grade) {
          let strengthIcon = study.grade.strength.includes('against') ? '🔴' : '🟢';
          let certaintyIcon = study.grade.certainty === 'high' ? '🟢' : (study.grade.certainty === 'moderate' ? '🟡' : '🟠');
          gradeBadge = `<span class="badge" style="background:#f0fdf4; color:#166534; border:1px solid #bbf7d0; padding:2px 6px; font-size:0.7rem; font-weight:600; border-radius:4px; margin-right:4px;" title="Strength: ${study.grade.strength}, Certainty: ${study.grade.certainty}">GRADE ${strengthIcon} ${certaintyIcon}</span>`;
        }
        const forestBtn = study.statistics ? `<button type="button" class="badge" style="background:#eff6ff; color:#1e40af; border:1px solid #bfdbfe; padding:2px 6px; font-size:0.7rem; font-weight:600; border-radius:4px; margin-right:4px; cursor:pointer;" onclick="event.stopPropagation(); window.openForestPlot('${study.id}')" title="Trực quan hóa Forest Plot">📊 Forest Plot</button>` : '';

        rowsHtml += `
          <tr id="tr-${study.id}" class="main-row ${isExpanded ? 'expanded' : ''}" onclick="toggleExpandRow('${study.id}', event)">
            <td class="cell-center" onclick="event.stopPropagation()">
              <input type="checkbox" class="row-selector" ${isSelected ? 'checked' : ''} onchange="toggleSelectRow('${study.id}', this.checked, event)">
            </td>
            <td class="cell-center" onclick="event.stopPropagation()">
              <button class="btn-star ${isBookmarked ? 'active' : ''}" onclick="toggleBookmark('${study.id}', event)">★</button>
            </td>
            <td class="cell-center">
              <button class="btn-expand ${isExpanded ? 'expanded' : ''}">▶</button>
            </td>
            <td>
              <div class="study-title-wrapper">
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                  <a class="study-title" href="#" onclick="event.preventDefault(); toggleExpandRow('${study.id}', event)">${escapeHtml(study.title)}</a>
                  ${staleInline}
                  ${gradeBadge}
                  ${forestBtn}
                  ${renderSummaryButton(study, 'badge')}
                  ${sgInlineBtn}
                </div>
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:2px;">
                  <span class="study-drug">${escapeHtml(study.drug || 'N/A')} • ${escapeHtml(study.organization || 'N/A')} (${study.year})</span>
                  ${drugInterBadge}
                </div>
              </div>
            </td>
            ${sourceTypeCell}
            ${specialtyCell}
            ${designCell}
            ${organizationCell}
            ${interventionCell}
            ${primaryEndpointCell}
            ${keyResultsCell}
            ${impactCell}
            ${conclusionCell}
            ${sampleSizeCell}
            ${populationCell}
            ${icd10Cell}
          </tr>
        `;

        if (isExpanded) {
          // Calculate visible columns inside expansion
          let visibleColsCount = 4; // Checkbox, Star, Expand, Title
          Object.values(columnVisibility).forEach(v => { if (v) visibleColsCount++; });

          rowsHtml += `
            <tr class="detail-row">
              <td colspan="${visibleColsCount}">
                <div class="detail-wrapper">
                  <div class="detail-main">
                    ${study.author ? `
                    <div class="detail-item">
                      <span class="detail-section-title">Tên tác giả</span>
                      <p class="detail-conclusion-text" style="font-weight: 600;">${escapeHtml(study.author)}</p>
                    </div>
                    ` : ''}
                    <div class="detail-item">
                      <span class="detail-section-title">Kết luận lâm sàng</span>
                      <p class="detail-conclusion-text">${escapeHtml(study.summary)}</p>
                    </div>
                    ${study.detailedConclusion ? `
                      <div class="detail-item" style="margin-top: 0.5rem;">
                        <span class="detail-section-title">Chi tiết bổ sung</span>
                        <p style="font-size: 0.8rem; color: var(--text-muted); white-space: pre-line;">${escapeHtml(study.detailedConclusion)}</p>
                      </div>
                    ` : ''}
                    
                    <div class="detail-grid" style="margin-top: 0.75rem;">
                      <div class="detail-item">
                        <span class="detail-label">Can thiệp / Đối chứng</span>
                        <span class="detail-val" style="font-weight:600; color:var(--text);">${escapeHtml(study.intervention || 'N/A')}</span>
                      </div>
                      <div class="detail-item">
                        <span class="detail-label">Tiêu chí đánh giá chính</span>
                        <span class="detail-val" style="font-weight:600; color:var(--text);">${escapeHtml(study.primaryEndpoint || 'N/A')}</span>
                      </div>
                      <div class="detail-item">
                        <span class="detail-label">Kết quả / Chỉ số</span>
                        <span class="detail-val" style="font-family: monospace; color: var(--accent); font-weight:700;">${escapeHtml(study.keyResults || 'N/A')}</span>
                        ${forestPlotHtml}
                      </div>
                      <div class="detail-item">
                        <span class="detail-label">Đối tượng nghiên cứu</span>
                        <span class="detail-val">${escapeHtml(study.population || 'N/A')}</span>
                      </div>
                      <div class="detail-item">
                        <span class="detail-label">Cỡ mẫu</span>
                        <span class="detail-val">${study.sampleSize ? 'n=' + formatNumber(study.sampleSize) : 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="detail-sidebar">
                    <div class="detail-meta-list">
                      <div class="detail-item">
                        <span class="detail-label">Phân loại & Thiết kế</span>
                        <span class="detail-val" style="color: var(--accent); font-weight: 700;">${srcTypeConfig.name} • ${designConfig.name} ${study.phase ? `(${study.phase})` : ''}</span>
                      </div>
                      <div class="detail-item">
                        <span class="detail-label">Khuyến cáo / FDA</span>
                        <span class="detail-val">${escapeHtml(study.fdaStatus || 'N/A')}</span>
                      </div>
                      <div class="detail-item">
                        <span class="detail-label">Tạp chí / Tổ chức</span>
                        <span class="detail-val">${escapeHtml(study.organization || 'N/A')} (${study.year})</span>
                      </div>
                      <div class="detail-item">
                        <span class="detail-label">Dữ liệu Châu Á</span>
                        <span class="detail-val">${study.asianData ? 'Có dữ liệu Châu Á' : 'Không có dữ liệu Châu Á'}</span>
                      </div>
                    </div>
                    
                    <div class="detail-actions">
                      ${study.sourceUrl ? `<a href="${study.sourceUrl}" target="_blank" class="btn btn-small">📄 Báo cáo gốc</a>` : ''}
                      ${renderSummaryButton(study, 'btn-primary')}
                      
                      <!-- Nút Nâng cao Dropdown -->
                      <div class="actions-dropdown" id="dropdown-advanced-${study.id}">
                        <button class="btn btn-small" style="color:#0284c7;border-color:rgba(2,132,199,0.4);" onclick="event.stopPropagation();toggleActionsDropdown('dropdown-advanced-${study.id}', event)">⚡ Nâng cao ▾</button>
                        <div class="actions-dropdown-menu">
                          <button class="actions-dropdown-item" onclick="event.stopPropagation();closeAllActionsDropdowns();openNntModal('${study.id}')">🧮 Tính NNT</button>
                          ${sgCount > 0 ? `<button class="actions-dropdown-item" onclick="event.stopPropagation();closeAllActionsDropdowns();openSubgroupModal('${study.id}',event)">🧬 Subgroup (${sgCount})</button>` : ''}
                          <button class="actions-dropdown-item" onclick="event.stopPropagation();closeAllActionsDropdowns();window.CliniPortalDrugLinker.openModal('${study.id}')">💊 Tương tác thuốc</button>
                          ${study.relatedCalculators && study.relatedCalculators.length > 0 ? `<a href="../../../../${study.relatedCalculators[0].path}" target="_blank" class="actions-dropdown-item">🧮 ${escapeHtml(study.relatedCalculators[0].name)}</a>` : ''}
                          ${study.relatedFlowcharts && study.relatedFlowcharts.length > 0 ? `<a href="../../../../${study.relatedFlowcharts[0].path}" target="_blank" class="actions-dropdown-item">🧩 ${escapeHtml(study.relatedFlowcharts[0].name)}</a>` : ''}
                          ${study.radarUrl ? `<a href="${study.radarUrl}" target="_blank" class="actions-dropdown-item">📡 Radar diff</a>` : ''}
                        </div>
                      </div>

                      <!-- Nút Điều chỉnh Dropdown -->
                      <div class="actions-dropdown" id="dropdown-manage-${study.id}">
                        <button class="btn btn-small" style="color:var(--text-muted);border-color:var(--border-light);" onclick="event.stopPropagation();toggleActionsDropdown('dropdown-manage-${study.id}', event)">⚙️ Điều chỉnh ▾</button>
                        <div class="actions-dropdown-menu">
                          <button class="actions-dropdown-item" onclick="event.stopPropagation();closeAllActionsDropdowns();openEditModal('${study.id}', event)">✏️ Sửa thông tin</button>
                          <button class="actions-dropdown-item danger" onclick="event.stopPropagation();closeAllActionsDropdowns();deleteStudy('${study.id}', event)">🗑️ Xóa nghiên cứu</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          `;
        }
      });

      tbody.innerHTML = rowsHtml;
      updateSelectAllCheckbox();
      updateSubgroupSidebarCount();
    }

    function renderUpdates() {
      const container = document.getElementById('updates-list');
      if (!container) return;

      const latest = [...studies].sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(a.year, 0, 1);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(b.year, 0, 1);
        return dateB - dateA;
      }).slice(0, 3);

      if (latest.length === 0) {
        container.innerHTML = `
          <div class="update-item" style="cursor: default;">
            <div class="update-content">
              <div class="update-title">Chưa có cập nhật mới</div>
              <div class="update-meta">Hãy thêm tài liệu hoặc nghiên cứu lâm sàng để thấy ở đây.</div>
            </div>
          </div>
        `;
        return;
      }

      container.innerHTML = latest.map(study => {
        const spec = SPECIALTIES[study.specialty] || { name: study.specialty, color: '#666', bg: '#f0f0f0' };
        return `
          <div class="update-item" onclick="toggleExpandRow('${study.id}', event)">
            <span class="update-dot" style="background: ${spec.color};"></span>
            <div class="update-content">
              <div class="update-title">${escapeHtml(study.title)} (${escapeHtml(study.drug)})</div>
              <div class="update-meta">
                <span class="update-tag" style="background: ${spec.bg}; color: ${spec.color};">${spec.name}</span>
                <span>${escapeHtml(study.organization || 'N/A')}</span>
                <span>• ${study.year || 'N/A'}</span>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Restore collapsed state preference
      if (localStorage.getItem('guidelines_updates_collapsed') === 'true') {
        const container = document.getElementById('updates-list');
        const label = document.getElementById('recent-updates-toggle-label');
        const icon = document.getElementById('recent-updates-toggle-icon');
        if (container) {
          container.style.display = 'none';
          if (label) label.textContent = 'Mở rộng';
          if (icon) icon.textContent = '▼';
        }
      }
    }

    window.toggleRecentUpdatesSec = function () {
      const container = document.getElementById('updates-list');
      const label = document.getElementById('recent-updates-toggle-label');
      const icon = document.getElementById('recent-updates-toggle-icon');
      if (!container) return;

      const isHidden = container.style.display === 'none';
      if (isHidden) {
        container.style.display = 'grid';
        if (label) label.textContent = 'Thu gọn';
        if (icon) icon.textContent = '▲';
        localStorage.setItem('guidelines_updates_collapsed', 'false');
      } else {
        container.style.display = 'none';
        if (label) label.textContent = 'Mở rộng';
        if (icon) icon.textContent = '▼';
        localStorage.setItem('guidelines_updates_collapsed', 'true');
      }
    };

    // ════════════════════════════
    // INTERACTIVE ACTIONS
    // ════════════════════════════

    function toggleBookmark(id, event) {
      if (event) event.stopPropagation();
      const study = studies.find(s => s.id === id);
      if (study) {
        study.bookmarked = !study.bookmarked;
        saveStudies();
        renderTable();
        renderUpdates();
        updateBadges();
        
        if (supabaseClient) {
          dbSaveStudy(study);
        }
      }
    }

    function toggleSelectRow(id, isChecked, event) {
      if (event) event.stopPropagation();
      if (isChecked) {
        selectedIds.add(id);
      } else {
        selectedIds.delete(id);
      }
      updateCompareBadge();
      updateSelectAllCheckbox();
    }

    function toggleSelectAllRows(isChecked) {
      const filtered = getFilteredStudies();
      filtered.forEach(study => {
        if (isChecked) {
          selectedIds.add(study.id);
        } else {
          selectedIds.delete(study.id);
        }
      });
      renderTable();
      updateCompareBadge();
    }

    function updateSelectAllCheckbox() {
      const selectAll = document.getElementById('select-all-checkboxes');
      const filtered = getFilteredStudies();
      
      if (filtered.length === 0) {
        selectAll.checked = false;
        selectAll.disabled = true;
        return;
      }
      
      selectAll.disabled = false;
      const allSelected = filtered.every(s => selectedIds.has(s.id));
      selectAll.checked = allSelected;
    }

    function toggleExpandRow(id, event) {
      if (event) event.stopPropagation();
      if (expandedIds.has(id)) {
        expandedIds.delete(id);
      } else {
        expandedIds.add(id);
      }
      renderTable();
    }

    function updateBadges() {
      const savedCount = studies.filter(s => s.bookmarked).length;
      const summaryCount = studies.filter(s => s.file && s.file.trim() !== '').length;
      if (document.getElementById('saved-count')) document.getElementById('saved-count').textContent = savedCount;
      if (document.getElementById('saved-count-sidebar')) {
        document.getElementById('saved-count-sidebar').textContent = savedCount;
      }
      if (document.getElementById('total-count-sidebar')) {
        document.getElementById('total-count-sidebar').textContent = studies.length;
      }
      if (document.getElementById('summary-count-sidebar')) {
        document.getElementById('summary-count-sidebar').textContent = summaryCount;
      }
      if (typeof updateSubgroupSidebarCount === 'function') {
        updateSubgroupSidebarCount();
      }
    }

    function updateCompareBadge() {
      const compareCount = selectedIds.size;
      document.getElementById('compare-count').textContent = compareCount;
      if (document.getElementById('compare-selected-count')) {
        document.getElementById('compare-selected-count').textContent = compareCount;
      }
    }

    // ════════════════════════════
    // COMPARE TAB VIEW
    // ════════════════════════════

    function renderCompareView() {
      const container = document.getElementById('compare-grid-container');
      const emptyState = document.getElementById('compare-empty-state');
      
      if (selectedIds.size === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
      }

      emptyState.style.display = 'none';
      const comparedStudies = studies.filter(s => selectedIds.has(s.id));

      container.innerHTML = comparedStudies.map(study => {
        const spec = SPECIALTIES[study.specialty] || { name: study.specialty, color: '#666', bg: '#f0f0f0' };
        const impactConfig = IMPACTS[study.impact] || { name: study.impact || 'N/A', color: '#6b7280', bg: '#f3f4f6' };
        const srcTypeConfig = SOURCE_TYPES[study.sourceType] || { name: study.sourceType || 'N/A', color: '#6b7280', bg: '#f3f4f6' };
        const designConfig = DESIGNS[study.design] || { name: study.design || 'N/A' };

        return `
          <div class="compare-card">
            <button class="compare-remove" onclick="removeCompare('${study.id}')">&times;</button>
            
            <div class="compare-row">
              <span class="detail-label">Tài liệu & Nghiên cứu / Hoạt chất</span>
              <h4 style="font-size: 1rem; font-weight: 800; color: var(--text);">${escapeHtml(study.title)}</h4>
              <p style="font-size: 0.82rem; font-weight: 600; color: var(--text-muted);">${escapeHtml(study.drug)}</p>
            </div>

            <div class="compare-row" style="display: flex; flex-wrap: wrap; gap: 6px;">
              <span class="badge badge-src-${study.sourceType}">${srcTypeConfig.name}</span>
              <span class="badge badge-${study.specialty}">${spec.name}</span>
              <span class="impact-badge impact-${study.impact}">
                <span class="impact-dot"></span>
                ${impactConfig.name}
              </span>
              ${study.grade ? `<span class="badge" style="background:#f0fdf4; color:#166534; border:1px solid #bbf7d0; font-size:0.7rem;">GRADE: ${study.grade.strength} / ${study.grade.certainty}</span>` : ''}
            </div>

            <div class="compare-row">
              <span class="detail-label">PICO: Đối tượng / Can thiệp / Đối chứng</span>
              <p style="font-size: 0.78rem; font-weight: 600; color: var(--text);">
                ${study.pico ? `<strong>P:</strong> ${escapeHtml(study.pico.population)}<br><strong>I:</strong> ${escapeHtml(study.pico.intervention)}<br><strong>C:</strong> ${escapeHtml(study.pico.comparator)}` : escapeHtml(study.intervention || 'N/A')}
              </p>
            </div>

            <div class="compare-row">
              <span class="detail-label">Tiêu chí đánh giá (Outcome)</span>
              <p style="font-size: 0.78rem; font-weight: 600; color: var(--text);">${study.pico ? escapeHtml(study.pico.outcome) : escapeHtml(study.primaryEndpoint || 'N/A')}</p>
            </div>

            <div class="compare-row">
              <span class="detail-label" style="display:flex; justify-content:space-between;">
                Kết quả / Chỉ số
                ${study.statistics ? `<button type="button" class="badge" style="background:#eff6ff; color:#1e40af; border:1px solid #bfdbfe; font-size:0.65rem; cursor:pointer;" onclick="event.stopPropagation(); window.openForestPlot('${study.id}')">📊 Forest Plot</button>` : ''}
              </span>
              <p style="font-size: 0.78rem; font-weight: 700; font-family: monospace; color: var(--accent);">
                ${study.statistics ? `${study.statistics.type} ${study.statistics.value} (95% CI ${study.statistics.ciLower}-${study.statistics.ciUpper}); p=${study.statistics.pValue}` : escapeHtml(study.oldKeyResults || study.keyResults || 'N/A')}
              </p>
            </div>

            <div class="compare-row">
              <span class="detail-label">Kết luận cốt lõi</span>
              <p style="font-size: 0.8rem; font-weight: 500; color: var(--text);">${escapeHtml(study.summary)}</p>
            </div>

            <div class="compare-row">
              <span class="detail-label">Đối tượng nghiên cứu</span>
              <p style="font-size: 0.78rem; color: var(--text-muted);">${escapeHtml(study.population || 'N/A')}</p>
            </div>

            <div class="compare-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <div>
                <span class="detail-label">Thiết kế / Giai đoạn</span>
                <p style="font-size: 0.78rem; font-weight: 600;">${designConfig.name} ${study.phase ? `(${study.phase})` : ''}</p>
              </div>
              <div>
                <span class="detail-label">Cỡ mẫu</span>
                <p style="font-size: 0.78rem; font-weight: 600;">${study.sampleSize ? 'n=' + formatNumber(study.sampleSize) : 'N/A'}</p>
              </div>
            </div>

            <div class="compare-row">
              <span class="detail-label">Phê duyệt FDA / Khuyến cáo</span>
              <p style="font-size: 0.78rem; font-weight: 600; color: var(--accent);">${escapeHtml(study.fdaStatus || 'N/A')}</p>
            </div>

            <div class="compare-row">
              <span class="detail-label">Ấn bản</span>
              <p style="font-size: 0.75rem; color: var(--text-faint);">${escapeHtml(study.organization || 'N/A')} (${study.year})</p>
            </div>

            <div class="compare-row" style="display: flex; gap: 8px; border-bottom: none; margin-top: auto; padding-top: 0.5rem;">
              ${study.sourceUrl ? `<a href="${study.sourceUrl}" target="_blank" class="btn btn-small" style="flex: 1; text-align: center; justify-content: center;">📄 Nguồn</a>` : ''}
              ${renderSummaryButton(study, 'btn-primary-compare')}
            </div>
          </div>
        `;
      }).join('');
    }

    function removeCompare(id) {
      selectedIds.delete(id);
      updateCompareBadge();
      if (typeof compareMode !== 'undefined' && compareMode === 'matrix') renderCompareMatrix();
      else renderCompareView();
    }

    function clearComparison() {
      selectedIds.clear();
      updateCompareBadge();
      if (typeof compareMode !== 'undefined' && compareMode === 'matrix') renderCompareMatrix();
      else renderCompareView();
    }

    let compareMode = 'grid';

    function setCompareMode(mode) {
      compareMode = mode;
      const gridBtn = document.getElementById('compare-mode-grid-btn');
      const matrixBtn = document.getElementById('compare-mode-matrix-btn');
      const gridContainer = document.getElementById('compare-grid-container');
      const matrixContainer = document.getElementById('compare-matrix-container');

      if (gridBtn) gridBtn.classList.toggle('active', mode === 'grid');
      if (matrixBtn) matrixBtn.classList.toggle('active', mode === 'matrix');

      if (gridContainer) gridContainer.style.display = mode === 'grid' ? 'grid' : 'none';
      if (matrixContainer) matrixContainer.style.display = mode === 'matrix' ? 'block' : 'none';

      if (mode === 'matrix') {
        renderCompareMatrix();
      } else {
        renderCompareView();
      }
    }

    function renderCompareMatrix() {
      const matrixContainer = document.getElementById('compare-matrix-container');
      const emptyState = document.getElementById('compare-empty-state');
      if (!matrixContainer) return;

      if (selectedIds.size === 0) {
        matrixContainer.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
      }
      if (emptyState) emptyState.style.display = 'none';

      const comparedStudies = studies.filter(s => selectedIds.has(s.id));
      
      const endpointLabels = [
        { key: 'mace', label: '🫀 Biến cố tim mạch (MACE)' },
        { key: 'cvDeath', label: '💔 Tử vong đặc hiệu (CV Death/HCC)' },
        { key: 'allCauseDeath', label: '⚰️ Tử vong mọi nguyên nhân' },
        { key: 'hhf', label: '🫁 Suy tim / Biến chứng tim' },
        { key: 'renal', label: '🧪 Chức năng thận / Thận trọng' },
        { key: 'adverse', label: '⚠️ Tác dụng phụ & Độc tính' }
      ];

      const headersHtml = comparedStudies.map(study => `
        <th>
          <div class="matrix-study-header">${escapeHtml(study.title)}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: normal; margin-top: 2px;">
            ${escapeHtml(study.drug || 'N/A')} <span style="display:inline-block; margin-left: 4px; padding: 1px 4px; border-radius: 4px; background: #e2e8f0;">${study.year}</span>
          </div>
          <button class="btn btn-small" onclick="removeCompare('${study.id}')" style="margin-top: 8px; font-size: 0.7rem; padding: 2px 6px;">&times; Xóa</button>
        </th>
      `).join('');

      const rowsHtml = endpointLabels.map(ep => {
        const cellsHtml = comparedStudies.map(study => {
          const m = study.matrixEndpoints && study.matrixEndpoints[ep.key];
          if (!m) {
            return `<td><span style="color: var(--text-faint); font-style: italic;">Chưa có dữ liệu</span></td>`;
          }
          let badgeClass = 'matrix-cell-neutral';
          if (m.verdict === 'benefit') badgeClass = 'matrix-cell-benefit';
          else if (m.verdict === 'adverse') badgeClass = 'matrix-cell-adverse';

          return `
            <td>
              <div class="${badgeClass}">
                <div style="font-size: 0.82rem; font-weight: 700; margin-bottom: 3px;">${escapeHtml(m.label || '')}</div>
                ${m.hr ? `<div style="font-size: 0.75rem;">HR/OR: <b>${escapeHtml(m.hr)}</b> (95% CI ${escapeHtml(m.ci || '-')})</div>` : ''}
                ${m.p ? `<span class="matrix-p-val">p = ${escapeHtml(m.p)}</span>` : ''}
              </div>
            </td>
          `;
        }).join('');
        return `<tr><td style="font-weight: 700; background: var(--surface-2); font-size: 0.85rem; vertical-align: middle;">${ep.label}</td>${cellsHtml}</tr>`;
      }).join('');

      matrixContainer.innerHTML = `
        <div style="margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-light);">
          <div>
            <h3 style="font-size: 1.1rem; font-weight: 800; color: var(--text); margin-bottom: 4px;">📊 Ma Trận Đối Chiếu Tín Hiệu Lâm Sàng (EBM Heatmap)</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">Màu xanh: Lợi ích rõ rệt · Màu vàng: Trung tính · Màu đỏ: Tăng nguy cơ / Cảnh báo</p>
          </div>
          <button class="btn btn-small" onclick="window.print()"><i class="fa-solid fa-print"></i> Tải báo cáo</button>
        </div>
        <div style="overflow-x: auto; padding-bottom: 1rem;">
          <table class="matrix-table" style="min-width: 800px; width: 100%; border-collapse: separate; border-spacing: 0;">
            <thead>
              <tr>
                <th style="width: 220px; background: var(--surface-3);">Tiêu chí / Nghiên cứu</th>
                ${headersHtml}
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      `;
    }

    // Export Compare functions to global window for HTML onclicks
    window.setCompareMode = setCompareMode;
    window.renderCompareMatrix = renderCompareMatrix;
    window.removeCompare = removeCompare;
    window.clearComparison = clearComparison;

    // ════════════════════════════
    // NNT / NNH CALCULATOR LOGIC
    // ════════════════════════════

    function copyCitationText(text) {
      if (!text) return;
      navigator.clipboard.writeText(text).then(() => {
        alert('📋 Đã sao chép trích dẫn vào bộ nhớ tạm!');
      }).catch(err => {
        alert('❌ Không thể sao chép: ' + err);
      });
    }

    function printStudySummary(studyId) {
      if (!studyId || typeof studies === 'undefined') return;
      const study = studies.find(s => s.id === studyId);
      if (!study) return;

      if (study.file) {
        window.open(resolveStudyFile(study.file), '_blank');
      } else {
        const printWin = window.open('', '_blank');
        if (!printWin) return;
        printWin.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>${escapeHtml(study.title)} - CliniPortal EBM</title>
            <style>
              body { font-family: sans-serif; padding: 2rem; color: #1e293b; line-height: 1.6; }
              h1 { font-size: 1.4rem; color: #0f172a; margin-bottom: 0.5rem; }
              .meta { font-size: 0.9rem; color: #64748b; margin-bottom: 1.5rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem; }
              .section { margin-bottom: 1rem; }
              .label { font-weight: bold; color: #334155; font-size: 0.85rem; text-transform: uppercase; }
              .box { background: #f8fafc; border-left: 4px solid #6366f1; padding: 0.8rem 1rem; border-radius: 4px; margin-top: 0.4rem; }
            </style>
          </head>
          <body>
            <h1>${escapeHtml(study.title)}</h1>
            <div class="meta">Hoạt chất: ${escapeHtml(study.drug)} | Tổ chức: ${escapeHtml(study.organization || 'N/A')} (${study.year})</div>
            <div class="section"><div class="label">Can thiệp / Phác đồ</div><div>${escapeHtml(study.intervention || 'N/A')}</div></div>
            <div class="section"><div class="label">Tiêu chí đánh giá chính</div><div>${escapeHtml(study.primaryEndpoint || 'N/A')}</div></div>
            <div class="section"><div class="label">Kết quả cốt lõi</div><div class="box"><b>${escapeHtml(study.keyResults || 'N/A')}</b></div></div>
            <div class="section"><div class="label">Kết luận</div><div>${escapeHtml(study.summary || 'N/A')}</div></div>
            <script>window.onload = function() { window.print(); };</script>
          </body>
          </html>
        `);
        printWin.document.close();
      }
    }

    function openNntModal(studyId) {
      const modal = document.getElementById('nnt-calculator-modal');
      if (!modal) return;
      
      const cerInput = document.getElementById('nnt-cer-input');
      const eerInput = document.getElementById('nnt-eer-input');
      const hrInput = document.getElementById('nnt-hr-input');
      const resultsCard = document.getElementById('nnt-results-card');

      if (cerInput) cerInput.value = '';
      if (eerInput) eerInput.value = '';
      if (hrInput) hrInput.value = '';
      if (resultsCard) resultsCard.style.display = 'none';

      if (studyId && typeof studies !== 'undefined') {
        const study = studies.find(s => s.id === studyId);
        if (study && study.matrixEndpoints && study.matrixEndpoints.mace && study.matrixEndpoints.mace.hr) {
          const hrVal = parseFloat(study.matrixEndpoints.mace.hr);
          if (!isNaN(hrVal) && hrInput) hrInput.value = hrVal;
        }
      }

      modal.classList.add('active');
    }

    function closeNntModal() {
      const modal = document.getElementById('nnt-calculator-modal');
      if (modal) modal.classList.remove('active');
    }

    function calculateNNT() {
      const cerInput = document.getElementById('nnt-cer-input');
      const eerInput = document.getElementById('nnt-eer-input');
      const resultsCard = document.getElementById('nnt-results-card');
      if (!cerInput || !eerInput || !resultsCard) return;

      const cer = parseFloat(cerInput.value);
      const eer = parseFloat(eerInput.value);

      if (isNaN(cer) || isNaN(eer)) {
        resultsCard.style.display = 'none';
        return;
      }

      const arr = Math.abs(cer - eer);
      const arrDecimal = arr / 100;
      if (arrDecimal === 0) {
        resultsCard.innerHTML = `<p style="color: var(--text-muted); font-size: 0.85rem;">Không có sự khác biệt về tỷ lệ biến cố giữa 2 nhóm (ARR = 0%).</p>`;
        resultsCard.style.display = 'block';
        return;
      }

      const nnt = Math.ceil(1 / arrDecimal);
      const isBenefit = eer < cer;

      resultsCard.innerHTML = `
        <div style="font-weight: 800; font-size: 1rem; color: ${isBenefit ? '#047857' : '#b91c1c'}; margin-bottom: 6px;">
          ${isBenefit ? '✅ Tác động Lợi ích (Benefit)' : '⚠️ Tác động Bất lợi (Harm)'}
        </div>
        <div style="font-size: 0.9rem; margin-bottom: 6px; color: var(--text);">
          Giảm nguy cơ tuyệt đối (ARR): <b>${arr.toFixed(2)}%</b>
        </div>
        <div style="font-weight: 800; font-size: 1.1rem; color: var(--text); margin-bottom: 8px;">
          ${isBenefit ? 'NNT (Number Needed to Treat)' : 'NNH (Number Needed to Harm)'}: <span style="font-size: 1.4rem; color: var(--accent);">${nnt}</span> người
        </div>
        <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin: 0;">
          ${isBenefit 
            ? `Cần điều trị <b>${nnt}</b> bệnh nhân bằng phác đồ can thiệp trong thời gian nghiên cứu để ngăn ngừa thêm <b>1</b> biến cố xấu.`
            : `Cứ <b>${nnt}</b> bệnh nhân nhận phác đồ can thiệp sẽ xuất hiện thêm <b>1</b> biến cố có hại.`}
        </p>
      `;
      resultsCard.style.display = 'block';
    }

    function calculateNNTFromHR() {
      const cerInput = document.getElementById('nnt-cer-input');
      const hrInput = document.getElementById('nnt-hr-input');
      if (!cerInput || !hrInput) return;

      let cer = parseFloat(cerInput.value);
      const hr = parseFloat(hrInput.value);

      if (isNaN(cer)) cer = 10;
      cerInput.value = cer;

      if (!isNaN(hr)) {
        const eer = cer * hr;
        document.getElementById('nnt-eer-input').value = eer.toFixed(2);
        calculateNNT();
      }
    }

    // ════════════════════════════
    // URL DEEP-LINKING LOGIC
    // ════════════════════════════

    function parseUrlState() {
      try {
        const params = new URLSearchParams(window.location.search);
        if (params.has('spec')) filters.specialty = params.get('spec');
        if (params.has('source')) filters.sourceType = params.get('source');
        if (params.has('impact')) filters.impact = params.get('impact');
        if (params.has('search')) filters.search = params.get('search');
        if (params.has('asian')) filters.asianData = params.get('asian') === 'true';
        if (params.has('tab')) currentTab = params.get('tab');
        if (params.has('compare')) {
          const comp = params.get('compare').split(',');
          comp.forEach(id => { if (id.trim()) selectedIds.add(id.trim()); });
          updateCompareBadge();
        }
      } catch (e) {
        console.warn('Could not parse URL state:', e);
      }
    }

    function updateUrlState() {
      try {
        const params = new URLSearchParams();
        if (filters.specialty) params.set('spec', filters.specialty);
        if (filters.sourceType) params.set('source', filters.sourceType);
        if (filters.impact) params.set('impact', filters.impact);
        if (filters.search) params.set('search', filters.search);
        if (filters.asianData) params.set('asian', 'true');
        if (currentTab !== 'list') params.set('tab', currentTab);
        if (selectedIds.size > 0) params.set('compare', Array.from(selectedIds).join(','));

        const newSearch = params.toString();
        const newUrl = window.location.pathname + (newSearch ? '?' + newSearch : '');
        window.history.replaceState({}, '', newUrl);
      } catch (e) {
        // Fallback
      }
    }

    // Export all handlers to global window
    window.switchTab = switchTab;
    window.setFilter = setFilter;
    window.setViewMode = setViewMode;
    window.resetFilters = resetFilters;
    window.openAddModal = openAddModal;
    window.closeAddModal = closeAddModal;
    window.openImportModal = openImportModal;
    window.closeImportModal = closeImportModal;
    window.openSupabaseModal = openSupabaseModal;
    window.closeSupabaseModal = closeSupabaseModal;
    window.saveSupabaseConfig = saveSupabaseConfig;
    window.clearSupabaseConfig = clearSupabaseConfig;
    window.openIcdFilterModal = openIcdFilterModal;
    window.closeIcdFilterModal = closeIcdFilterModal;
    window.printStudySummary = printStudySummary;
    window.copyCitationText = copyCitationText;
    window.openNntModal = openNntModal;
    window.closeNntModal = closeNntModal;
    window.calculateNNTFromHR = calculateNNTFromHR;

    // ════════════════════════════
    // DYNAMIC SUMMARY PARTS CONTROLLER
    // ════════════════════════════

    function addSummaryPartRow(label = '', file = '') {
      const container = document.getElementById('summary-parts-container');
      if (!container) return;
      const count = container.children.length + 1;
      const defaultLabel = label || (`Phần ${count}`);
      
      const rowDiv = document.createElement('div');
      rowDiv.className = 'summary-part-row';
      rowDiv.style.cssText = 'display:flex; gap:8px; align-items:center; background:var(--surface-2); padding:6px 10px; border-radius:8px; border:1px solid var(--border-light);';
      rowDiv.innerHTML = `
        <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted); min-width:22px;">#${count}</span>
        <input type="text" class="part-label-input" value="${escapeHtml(defaultLabel)}" placeholder="Tên phần (VD: Phần 1: Chẩn đoán)" style="flex:1; font-size:0.8rem; padding:5px 8px; border:1px solid var(--border); border-radius:6px; background:var(--surface); color:var(--text);">
        <input type="text" class="part-file-input" value="${escapeHtml(file)}" placeholder="File HTML (VD: kho-guidelines/byt-lao-2024-p1.html)" style="flex:1.4; font-size:0.8rem; padding:5px 8px; border:1px solid var(--border); border-radius:6px; background:var(--surface); color:var(--text);">
        <button type="button" onclick="removeSummaryPartRow(this)" style="background:none; border:none; color:var(--red); cursor:pointer; font-size:18px; font-weight:bold; padding:2px 6px;" title="Xóa phần này">&times;</button>
      `;
      container.appendChild(rowDiv);
    }

    function removeSummaryPartRow(btn) {
      const row = btn.closest('.summary-part-row');
      if (row) row.remove();
      const container = document.getElementById('summary-parts-container');
      if (container) {
        Array.from(container.children).forEach((r, idx) => {
          const numSpan = r.querySelector('span');
          if (numSpan) numSpan.textContent = `#${idx + 1}`;
        });
      }
    }

    window.addSummaryPartRow = addSummaryPartRow;
    window.removeSummaryPartRow = removeSummaryPartRow;

    // ════════════════════════════
    // ADD & EDIT FORM CONTROLLERS
    // ════════════════════════════

    function handleFormSubmit(event) {
      event.preventDefault();
      
      const studyId = document.getElementById('study-id').value;
      const title = document.getElementById('study-title').value.trim();
      const author = document.getElementById('study-author') ? document.getElementById('study-author').value.trim() : '';
      const drug = document.getElementById('study-drug').value.trim();
      const sourceType = document.getElementById('study-source-type').value;
      const specialty = document.getElementById('study-specialty').value;
      const design = document.getElementById('study-design').value;
      const intervention = document.getElementById('study-intervention').value.trim();
      const primaryEndpoint = document.getElementById('study-primary-endpoint').value.trim();
      const oldRegimen = document.getElementById('study-old-regimen') ? document.getElementById('study-old-regimen').value.trim() : '';
      const newRegimen = document.getElementById('study-new-regimen') ? document.getElementById('study-new-regimen').value.trim() : '';
      const keyResults = document.getElementById('study-key-results').value.trim();
      const impact = document.getElementById('study-impact').value;
      const organization = document.getElementById('study-organization').value.trim();
      const year = parseInt(document.getElementById('study-year').value);
      const phase = document.getElementById('study-phase').value.trim();
      const sampleSize = document.getElementById('study-sample-size').value ? parseInt(document.getElementById('study-sample-size').value) : null;
      const population = document.getElementById('study-population').value.trim();
      const summary = document.getElementById('study-summary').value.trim();
      const detailedConclusion = document.getElementById('study-detailed-conclusion').value.trim();
      const fdaStatus = document.getElementById('study-fda-status').value.trim();
      const sourceUrl = document.getElementById('study-source-url').value.trim();
      const file = document.getElementById('study-file').value.trim();
      const asianData = document.getElementById('study-asian-data').checked;
      let subgroups = null;
      const subgroupsRaw = (document.getElementById('study-subgroups') || {}).value || '';
      if (subgroupsRaw.trim()) {
        try { subgroups = JSON.parse(subgroupsRaw.trim()); } catch(e) {
          alert('⚠️ Dữ liệu Subgroup không hợp lệ JSON. Vui lòng kiểm tra định dạng.'); return;
        }
      }

      // Collect summary parts from dynamic GUI rows
      const partsArray = [];
      const container = document.getElementById('summary-parts-container');
      if (container) {
        const rows = container.querySelectorAll('.summary-part-row');
        rows.forEach(row => {
          const lbl = row.querySelector('.part-label-input') ? row.querySelector('.part-label-input').value.trim() : '';
          const fl = row.querySelector('.part-file-input') ? row.querySelector('.part-file-input').value.trim() : '';
          if (fl) {
            partsArray.push({ label: lbl || 'Tóm tắt', file: fl });
          }
        });
      }
      const parts = partsArray.length > 0 ? partsArray : null;

      const icd10Raw = document.getElementById('study-icd10') ? document.getElementById('study-icd10').value.trim() : '';
      const icd10 = icd10Raw ? icd10Raw.split(',').map(s => s.trim().toUpperCase()).filter(s => s) : [];

      let savedStudy = null;

      if (studyId) {
        // Edit mode
        const index = studies.findIndex(s => s.id === studyId);
          if (index !== -1) {
          studies[index] = {
            ...studies[index],
            title, author, drug, sourceType, specialty, design, intervention, primaryEndpoint, oldRegimen, newRegimen, keyResults,
            impact, organization, year, phase, sampleSize,
            population, summary, detailedConclusion, fdaStatus, sourceUrl, file, parts, asianData, subgroups, icd10
          };
          savedStudy = studies[index];
          alert('✅ Đã cập nhật tài liệu thành công!');
        }
      } else {
        // Add mode
        const newStudy = {
          id: generateId(),
          title, author, drug, sourceType, specialty, design, intervention, primaryEndpoint, oldRegimen, newRegimen, keyResults,
          impact, organization, year, phase, sampleSize,
          population, summary, detailedConclusion, fdaStatus, sourceUrl, file, parts, asianData, subgroups, icd10,
          bookmarked: false,
          createdAt: new Date().toISOString()
        };
        studies.unshift(newStudy);
        savedStudy = newStudy;
        alert('✅ Đã thêm tài liệu mới thành công!');
      }

      saveStudies();
      closeAddModal();
      
      renderTable();
      renderUpdates();

      if (savedStudy && supabaseClient) {
        dbSaveStudy(savedStudy);
      }
    }

    function openAddModal() {
      document.getElementById('add-form').reset();
      document.getElementById('study-id').value = '';
      if (document.getElementById('study-icd10')) document.getElementById('study-icd10').value = '';
      const container = document.getElementById('summary-parts-container');
      if (container) container.innerHTML = '';
      document.getElementById('modal-form-title').textContent = '➕ Thêm Tài Liệu / Nghiên Cứu Mới';
      document.getElementById('btn-save-study').textContent = 'Lưu tài liệu';
      document.getElementById('add-modal').classList.add('active');
    }

    function openEditModal(id, event) {
      if (event) event.stopPropagation();
      const study = studies.find(s => s.id === id);
      if (!study) return;

      document.getElementById('study-id').value = study.id;
      document.getElementById('study-title').value = study.title;
      if(document.getElementById('study-author')) document.getElementById('study-author').value = study.author || '';
      document.getElementById('study-drug').value = study.drug || '';
      document.getElementById('study-source-type').value = study.sourceType || 'intl-study';
      document.getElementById('study-specialty').value = study.specialty;
      document.getElementById('study-design').value = study.design || 'rct';
      document.getElementById('study-intervention').value = study.intervention || '';
      document.getElementById('study-primary-endpoint').value = study.primaryEndpoint || '';
      document.getElementById('study-key-results').value = study.keyResults || '';
      document.getElementById('study-impact').value = study.impact || '';
      document.getElementById('study-organization').value = study.organization || '';
      document.getElementById('study-year').value = study.year;
      document.getElementById('study-phase').value = study.phase || '';
      document.getElementById('study-sample-size').value = study.sampleSize || '';
      document.getElementById('study-population').value = study.population || '';
      document.getElementById('study-summary').value = study.summary || '';
      document.getElementById('study-detailed-conclusion').value = study.detailedConclusion || '';
      document.getElementById('study-fda-status').value = study.fdaStatus || '';
      document.getElementById('study-source-url').value = study.sourceUrl || '';
      document.getElementById('study-file').value = study.file || '';
      document.getElementById('study-asian-data').checked = study.asianData || false;
      
      const container = document.getElementById('summary-parts-container');
      if (container) {
        container.innerHTML = '';
        if (study.parts && Array.isArray(study.parts) && study.parts.length > 0) {
          study.parts.forEach(p => addSummaryPartRow(p.label, p.file));
        }
      }
      
      const sgEl = document.getElementById('study-subgroups');
      if (sgEl) sgEl.value = (study.subgroups && typeof study.subgroups === 'object') ? JSON.stringify(study.subgroups, null, 2) : '';
      if (document.getElementById('study-icd10')) document.getElementById('study-icd10').value = (study.icd10 && Array.isArray(study.icd10)) ? study.icd10.join(', ') : '';

      document.getElementById('modal-form-title').textContent = '✏️ Chỉnh Sửa Tài Liệu / Nghiên Cứu';
      document.getElementById('btn-save-study').textContent = 'Cập nhật tài liệu';
      document.getElementById('add-modal').classList.add('active');
    }

    function closeAddModal() {
      document.getElementById('add-modal').classList.remove('active');
    }

    function deleteStudy(id, event) {
      if (event) event.stopPropagation();
      if (confirm('🗑️ Bạn có chắc chắn muốn xóa tài liệu / nghiên cứu này không?')) {
        studies = studies.filter(s => s.id !== id);
        selectedIds.delete(id);
        expandedIds.delete(id);
        saveStudies();
        renderTable();
        renderUpdates();
        updateCompareBadge();
        
        if (supabaseClient) {
          dbDeleteStudy(id);
        }
      }
    }

    // ════════════════════════════
    // IMPORT & EXPORT CONTROLLERS
    // ════════════════════════════

    function openImportModal() {
      document.getElementById('import-modal').classList.add('active');
    }

    function closeImportModal() {
      document.getElementById('import-modal').classList.remove('active');
    }

    function handleFileSelect(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const data = JSON.parse(e.target.result);
          importData(data);
        } catch (err) {
          alert('❌ Lỗi: File JSON không hợp lệ! ' + err.message);
        }
      };
      reader.readAsText(file);
    }

    function importFromText() {
      const text = document.getElementById('json-text').value.trim();
      if (!text) {
        alert('❌ Vui lòng nhập hoặc dán dữ liệu JSON!');
        return;
      }
      
      try {
        const data = JSON.parse(text);
        importData(data);
      } catch (err) {
        alert('❌ Lỗi: JSON không hợp lệ! ' + err.message);
      }
    }

    function importData(data) {
      const dataArr = Array.isArray(data) ? data : [data];
      let imported = 0;

      dataArr.forEach(item => {
        if (item.title) {
          const study = {
            id: item.id || generateId(),
            title: item.title,
            author: item.author || '',
            drug: item.drug || 'N/A',
            sourceType: item.sourceType || 'intl-study',
            specialty: item.specialty || 'cardio',
            design: item.design || 'rct',
            intervention: item.intervention || '',
            primaryEndpoint: item.primaryEndpoint || '',
            keyResults: item.keyResults || '',
            impact: item.impact || 'informative',
            year: item.year || new Date().getFullYear(),
            organization: item.organization || item.source || 'N/A',
            phase: item.phase || 'N/A',
            sampleSize: item.sampleSize || null,
            population: item.population || 'N/A',
            summary: item.summary || item.conclusion || 'Không có kết luận',
            detailedConclusion: item.detailedConclusion || '',
            fdaStatus: item.fdaStatus || 'N/A',
            sourceUrl: item.sourceUrl || '',
            file: item.file || '',
            parts: Array.isArray(item.parts) ? item.parts : (typeof item.parts === 'string' && item.parts ? (() => { try { return JSON.parse(item.parts); } catch(e) { return null; } })() : null),
            asianData: item.asianData || false,
            bookmarked: item.bookmarked || false,
            icd10: Array.isArray(item.icd10) ? item.icd10 : (typeof item.icd10 === 'string' && item.icd10 ? (() => { try { return JSON.parse(item.icd10); } catch(e) { return []; } })() : []),
            subgroups: (item.subgroups && typeof item.subgroups === 'object' && !Array.isArray(item.subgroups)) ? item.subgroups
                       : (typeof item.subgroups === 'string' && item.subgroups ? (() => { try { return JSON.parse(item.subgroups); } catch(e) { return null; } })() : null),
            matrixEndpoints: (item.matrixEndpoints && typeof item.matrixEndpoints === 'object') ? item.matrixEndpoints
                       : (typeof item.matrixEndpoints === 'string' && item.matrixEndpoints ? (() => { try { return JSON.parse(item.matrixEndpoints); } catch(e) { return null; } })() : null),
            createdAt: item.createdAt || new Date().toISOString()
          };
          studies.push(study);
          imported++;

          if (supabaseClient) {
            dbSaveStudy(study);
          }
        }
      });

      if (imported > 0) {
        saveStudies();
        renderFilterPills();
        renderTable();
        renderUpdates();
        closeImportModal();
        document.getElementById('json-text').value = '';
        alert(`✅ Đã nhập ${imported} tài liệu thành công!`);
      } else {
        alert('⚠️ Không tìm thấy tài liệu hợp lệ nào.');
      }
    }

    function fillSampleJSON() {
      const sample = [
        {
          "title": "Thử nghiệm DAPA-CKD (Dapagliflozin trên Bệnh Thận Mạn)",
          "author": "Heerspink HJL et al.",
          "drug": "Dapagliflozin 10mg QD",
          "sourceType": "intl-study",
          "specialty": "renal",
          "design": "rct",
          "intervention": "Dapagliflozin 10mg QD vs Placebo",
          "primaryEndpoint": "Tiêu chí gộp: Giảm ≥50% eGFR, suy thận giai đoạn cuối, tử vong tim mạch/thận",
          "keyResults": "HR 0.61 (95% CI 0.51-0.72, p < 0.001)",
          "impact": "practice-changing",
          "year": 2020,
          "organization": "NEJM / AstraZeneca",
          "sampleSize": 4304,
          "population": "Bệnh nhân bệnh thận mạn (eGFR 25-75 mL/min/1.73m²)",
          "summary": "Dapagliflozin giảm 39% nguy cơ suy thận tiến triển hoặc tử vong ở bệnh nhân CKD bất kể có bị ĐTĐ hay không.",
          "subgroups": {
            "Có Đái tháo đường": "HR 0.64 (95% CI 0.52-0.79, p<0.001)",
            "Không Đái tháo đường": "HR 0.50 (95% CI 0.35-0.72, p<0.001)",
            "Châu Á": "HR 0.60 (95% CI 0.43-0.82, p=0.002)",
            "eGFR < 45 mL/min": "OR 0.63 (95% CI 0.51-0.78, p=0.001)"
          },
          "asianData": true
        }
      ];
      const el = document.getElementById('json-text');
      if (el) {
        el.value = JSON.stringify(sample, null, 2);
        el.focus();
      }
    }

    // Helper functions
    function formatNumber(num) {
      if (!num) return '0';
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    function escapeHtml(text) {
      if (!text) return '';
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    // ════════════════════════════
    // EBM CHART PARSER & SVG RENDERERS (Forest, Column, Horizontal Bar)
    // ════════════════════════════

    function parseChartData(keyResults) {
      if (!keyResults) return null;

      let jsonObj = null;
      if (typeof keyResults === 'object') {
        jsonObj = keyResults;
      } else if (typeof keyResults === 'string' && keyResults.trim().startsWith('{')) {
        try { jsonObj = JSON.parse(keyResults.trim()); } catch(e) {}
      }

      if (jsonObj) {
        const chartType = String(jsonObj.type || jsonObj.chartType || '').toLowerCase();
        if (['column', 'vertical-bar', 'bar-v', 'cot', 'cột'].includes(chartType)) {
          return {
            type: 'column',
            title: jsonObj.title || '',
            unit: jsonObj.unit || '%',
            data: Array.isArray(jsonObj.data) ? jsonObj.data : []
          };
        }
        if (['horizontal-bar', 'bar-h', 'hbar', 'ngang'].includes(chartType)) {
          return {
            type: 'horizontal-bar',
            title: jsonObj.title || '',
            unit: jsonObj.unit || '%',
            data: Array.isArray(jsonObj.data) ? jsonObj.data : []
          };
        }
      }

      if (typeof keyResults === 'string') {
        const colMatch = keyResults.match(/^(?:COL|CỘT|BAR_V|COLUMN)\s*:\s*(.+)$/i);
        if (colMatch) {
          const itemsRaw = colMatch[1].split('|');
          const data = [];
          const colors = ['#16a34a', '#dc2626', '#2563eb', '#d97706', '#7c3aed', '#0d9488'];
          itemsRaw.forEach((itemStr, idx) => {
            const parts = itemStr.split(/[:=]/);
            if (parts.length >= 2) {
              const label = parts[0].trim();
              const valNum = parseFloat(parts[1].replace(/[^\d.-]/g, ''));
              if (!isNaN(valNum)) {
                data.push({ label, value: valNum, color: colors[idx % colors.length] });
              }
            }
          });
          if (data.length > 0) return { type: 'column', title: '', unit: '%', data };
        }

        const hbarMatch = keyResults.match(/^(?:HBAR|NGANG|BAR_H|HORIZONTAL)\s*:\s*(.+)$/i);
        if (hbarMatch) {
          const itemsRaw = hbarMatch[1].split('|');
          const data = [];
          const colors = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#7c3aed', '#0d9488'];
          itemsRaw.forEach((itemStr, idx) => {
            const parts = itemStr.split(/[:=]/);
            if (parts.length >= 2) {
              const label = parts[0].trim();
              const valNum = parseFloat(parts[1].replace(/[^\d.-]/g, ''));
              if (!isNaN(valNum)) {
                data.push({ label, value: valNum, color: colors[idx % colors.length] });
              }
            }
          });
          if (data.length > 0) return { type: 'horizontal-bar', title: '', unit: '%', data };
        }
      }

      const forestRes = parseForestDataRaw(keyResults);
      if (forestRes) {
        forestRes.type = 'forest';
        return forestRes;
      }

      return null;
    }

    function parseForestData(keyResults) {
      return parseChartData(keyResults);
    }

    function parseForestDataRaw(keyResults) {
      if (!keyResults) return null;

      let label = '', estimate = NaN, lower = NaN, upper = NaN, pValue = null;

      let jsonObj = null;
      if (typeof keyResults === 'object') {
        jsonObj = keyResults;
      } else if (typeof keyResults === 'string' && keyResults.trim().startsWith('{')) {
        try { jsonObj = JSON.parse(keyResults.trim()); } catch(e) {}
      }

      if (jsonObj) {
        label = (jsonObj.label || jsonObj.type || jsonObj.metric || 'OR').toUpperCase();
        estimate = parseFloat(jsonObj.estimate ?? jsonObj.val ?? jsonObj.value ?? jsonObj.or ?? jsonObj.rr ?? jsonObj.hr);
        lower = parseFloat(jsonObj.lower ?? (Array.isArray(jsonObj.ci) ? jsonObj.ci[0] : jsonObj.ciLower));
        upper = parseFloat(jsonObj.upper ?? (Array.isArray(jsonObj.ci) ? jsonObj.ci[1] : jsonObj.ciUpper));
        if (jsonObj.p !== undefined || jsonObj.pValue !== undefined) {
          const rawP = jsonObj.p ?? jsonObj.pValue;
          pValue = typeof rawP === 'number' ? (rawP < 0.001 ? '<0.001' : rawP.toString()) : String(rawP);
        }
      } else if (typeof keyResults === 'string') {
        const pMatch = keyResults.match(/\bp\s*([<>=]=?)\s*([\d.]+)/i);
        if (pMatch) {
          const op = pMatch[1].replace('=', '');
          pValue = op ? `${op}${pMatch[2]}` : pMatch[2];
        }

        const sep = '(?:đến|dến|dên|to|[-\u2013\u2014,])';
        const unit = '(?:\\s+[a-zA-Z%°µμ/-]+)?';
        const metric = '(aHR|aOR|HR|OR|RR|RD|ARR|NNT|NNH|RRR|SMD|MD|WMD|IRR|PR|ORR|CR)';

        const patterns = [
          new RegExp(`\\b${metric}\\s*[=:]?\\s*(-?[\\d.]+${unit})\\s*\\([^)]*?CI[^\\d-]*(-?[\\d.]+)\\s*${sep}\\s*(-?[\\d.]+)[^)]*\\)`, 'i'),
          new RegExp(`\\b${metric}\\s*[=:]?\\s*(-?[\\d.]+${unit})\\s*\\([^)]*?CI[^\\d-]*(-?[\\d.]+)\\s+to\\s+(-?[\\d.]+)[^)]*\\)`, 'i'),
          new RegExp(`\\b${metric}\\s*[=:]?\\s*(-?[\\d.]+${unit})\\s*\\(\\s*(-?[\\d.]+)\\s*${sep}\\s*(-?[\\d.]+)[^)]*\\)`, 'i'),
          new RegExp(`\\b${metric}\\s*[=:]?\\s*(-?[\\d.]+${unit})\\s*\\[[^\\]]*?CI[^\\d\\]]*(-?[\\d.]+)\\s*${sep}\\s*(-?[\\d.]+)[^\\]]*\\]`, 'i'),
          new RegExp(`\\b${metric}\\s*[=:]?\\s*(-?[\\d.]+${unit})\\s*[,;]\\s*(?:95%\\s*)?CI\\s*[=:]?\\s*(-?[\\d.]+)\\s*${sep}\\s*(-?[\\d.]+)`, 'i'),
          new RegExp(`\\b${metric}\\s*[=:]?\\s*(-?[\\d.]+${unit})\\s+(?:95%\\s*)?CI\\s*[=:]?\\s*\\[?\\s*(-?[\\d.]+)\\s*${sep}\\s*(-?[\\d.]+)\\]?`, 'i'),
          new RegExp(`\\b${metric}\\s*=\\s*(-?[\\d.]+${unit})[\\s;,]+(?:95%\\s*)?CI\\s*\\[?\\s*(-?[\\d.]+)\\s*(?:${sep}|to)\\s*(-?[\\d.]+)\\]?`, 'i'),
          new RegExp(`(?:pooled|combined)?\\s*${metric}\\s*=?\\s*(-?[\\d.]+${unit})\\s*\\(\\s*(-?[\\d.]+)\\s*${sep}\\s*(-?[\\d.]+)[^)]*\\)`, 'i')
        ];

        for (const pattern of patterns) {
          const match = keyResults.match(pattern);
          if (!match) continue;
          label    = (match[1] || '').toUpperCase();
          const rawEst = match[2].trim().split(/\s+/)[0];
          estimate = parseFloat(rawEst);
          lower    = parseFloat(match[3]);
          upper    = parseFloat(match[4]);
          if (!isNaN(estimate) && !isNaN(lower) && !isNaN(upper)) break;
        }
      }

      if (isNaN(estimate) || isNaN(lower) || isNaN(upper)) return null;
      if (lower > estimate || estimate > upper) return null;
      if (Math.abs(upper - lower) > 500) return null;

      const allowNeg = ['MD', 'SMD', 'WMD', 'RD', 'ARR'].includes(label);
      if (!allowNeg && lower < 0) return null;
      if (!allowNeg && estimate === 0) return null;

      let isSig = false;
      if (pValue) {
        const numP = parseFloat(pValue.replace(/[^\d.]/g, ''));
        if (!isNaN(numP)) {
          isSig = numP < 0.05 || pValue.includes('<');
        }
      }

      return { type: 'forest', label, estimate, lower, upper, pValue, isSig };
    }

    function renderVerticalBarChartSVG(chartData) {
      if (!chartData || !Array.isArray(chartData.data) || chartData.data.length === 0) return '';
      const items = chartData.data;
      const unit = chartData.unit || '%';
      const W = 270, H = 82;
      const PAD_L = 28, PAD_R = 12, PAD_T = 16, PAD_B = 22;
      const plotW = W - PAD_L - PAD_R;
      const plotH = H - PAD_T - PAD_B;

      const maxVal = Math.max(...items.map(d => d.value), 0.1) * 1.18;
      const palette = ['#16a34a', '#dc2626', '#2563eb', '#d97706', '#7c3aed', '#0d9488', '#e11d48'];

      const barGap = 10;
      const barW = Math.min(42, Math.max(14, (plotW - (items.length - 1) * barGap) / items.length));
      const totalBarsWidth = items.length * barW + (items.length - 1) * barGap;
      const startX = PAD_L + (plotW - totalBarsWidth) / 2;

      const baseY = PAD_T + plotH;
      let svg = `<svg class="chart-svg chart-col-svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Biểu đồ cột">`;

      svg += `<line x1="${PAD_L}" y1="${baseY}" x2="${W - PAD_R}" y2="${baseY}" stroke="#cbd5e1" stroke-width="1"/>`;
      svg += `<line x1="${PAD_L}" y1="${PAD_T}" x2="${W - PAD_R}" y2="${PAD_T}" stroke="#e2e8f0" stroke-dasharray="2,2" stroke-width="1"/>`;

      svg += `<text x="${PAD_L - 4}" y="${baseY + 3}" font-family="monospace" font-size="7.5" fill="#94a3b8" text-anchor="end">0</text>`;
      svg += `<text x="${PAD_L - 4}" y="${PAD_T + 3}" font-family="monospace" font-size="7.5" fill="#94a3b8" text-anchor="end">${maxVal.toFixed(maxVal < 10 ? 1 : 0)}${unit}</text>`;

      items.forEach((item, idx) => {
        const x = startX + idx * (barW + barGap);
        const barH = (item.value / maxVal) * plotH;
        const y = baseY - barH;
        const color = item.color || palette[idx % palette.length];

        svg += `<rect x="${x}" y="${y}" width="${barW}" height="${Math.max(2, barH)}" rx="3" fill="${color}" opacity="0.9"/>`;
        svg += `<text x="${x + barW / 2}" y="${Math.max(PAD_T - 2, y - 3)}" text-anchor="middle" font-family="monospace" font-size="8" fill="${color}" font-weight="700">${item.value}${unit}</text>`;
        const labelText = item.label.length > 11 ? item.label.substring(0, 10) + '…' : item.label;
        svg += `<text x="${x + barW / 2}" y="${baseY + 12}" text-anchor="middle" font-family="sans-serif" font-size="7.5" fill="#475569" font-weight="600">${escapeHtml(labelText)}</text>`;
      });

      svg += `</svg>`;
      return svg;
    }

    function renderHorizontalBarChartSVG(chartData) {
      if (!chartData || !Array.isArray(chartData.data) || chartData.data.length === 0) return '';
      const items = chartData.data;
      const unit = chartData.unit || '%';
      const rowHeight = 18;
      const PAD_L = 90, PAD_R = 40, PAD_T = 6, PAD_B = 6;
      const W = 270;
      const H = PAD_T + PAD_B + items.length * rowHeight;
      const plotW = W - PAD_L - PAD_R;

      const maxVal = Math.max(...items.map(d => d.value), 0.1) * 1.15;
      const palette = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#7c3aed', '#0d9488'];

      let svg = `<svg class="chart-svg chart-hbar-svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Biểu đồ ngang">`;

      svg += `<line x1="${PAD_L}" y1="${PAD_T}" x2="${PAD_L}" y2="${H - PAD_B}" stroke="#cbd5e1" stroke-width="1"/>`;

      items.forEach((item, idx) => {
        const cy = PAD_T + idx * rowHeight + rowHeight / 2;
        const barW = Math.max(3, (item.value / maxVal) * plotW);
        const y = cy - 5;
        const color = item.color || palette[idx % palette.length];

        const labelText = item.label.length > 15 ? item.label.substring(0, 14) + '…' : item.label;
        svg += `<text x="${PAD_L - 5}" y="${cy + 3}" text-anchor="end" font-family="sans-serif" font-size="7.5" fill="#475569" font-weight="600">${escapeHtml(labelText)}</text>`;

        svg += `<rect x="${PAD_L}" y="${y}" width="${barW}" height="10" rx="2.5" fill="${color}" opacity="0.88"/>`;

        svg += `<text x="${PAD_L + barW + 4}" y="${cy + 3}" font-family="monospace" font-size="8" fill="${color}" font-weight="700">${item.value}${unit}</text>`;
      });

      svg += `</svg>`;
      return svg;
    }

    function renderChartSVG(chartData) {
      if (!chartData) return '';
      if (chartData.type === 'column') {
        return renderVerticalBarChartSVG(chartData);
      }
      if (chartData.type === 'horizontal-bar') {
        return renderHorizontalBarChartSVG(chartData);
      }
      return renderForestPlotSVG(chartData);
    }

    function renderForestPlotSVG(forestData) {
      if (!forestData) return '';
      
      const { label, estimate, lower, upper, pValue } = forestData;

      const W = 270, H = 46;
      const PAD_L = 10, PAD_R = 10;
      const plotW = W - PAD_L - PAD_R;
      const cy = (H / 2) - 2;

      const isDiff = ['MD', 'SMD', 'WMD', 'RD', 'ARR'].includes(label);
      const nullVal = isDiff ? 0.0 : 1.0;

      const maxDist = Math.max(Math.abs(upper - nullVal), Math.abs(nullVal - lower)) * 1.3 + 0.15;
      const axisMin = isDiff ? (nullVal - maxDist) : Math.max(0.05, nullVal - maxDist);
      const axisMax = nullVal + maxDist;

      function toX(val) {
        return PAD_L + ((val - axisMin) / (axisMax - axisMin)) * plotW;
      }

      const x0 = toX(nullVal);
      const xE = toX(estimate);
      const xL = toX(lower);
      const xU = toX(upper);

      const isGreen = isDiff ? estimate < 0.0 : estimate < 1.0;
      const isHarm  = isDiff ? estimate > 0.0 : estimate > 1.0;
      const dotColor = isGreen ? '#16a34a' : isHarm ? '#dc2626' : '#6b7280';
      const ciColor  = isGreen ? '#86efac' : isHarm ? '#fca5a5' : '#cbd5e1';

      const pStr = pValue ? ` (p${pValue.startsWith('<') || pValue.startsWith('>') ? '' : '='}${pValue})` : '';
      const labelText = `${label} ${estimate.toFixed(2)} [${lower.toFixed(2)}–${upper.toFixed(2)}]${pStr}`;

      return `
        <svg class="forest-plot-svg chart-svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"
             xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Forest plot: ${labelText}">
          <line x1="${PAD_L}" y1="${cy}" x2="${W - PAD_R}" y2="${cy}" stroke="#cbd5e1" stroke-width="1"/>
          <line x1="${x0}" y1="${cy - 12}" x2="${x0}" y2="${cy + 12}" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,2"/>
          <!-- CI whiskers -->
          <line x1="${xL}" y1="${cy}" x2="${xU}" y2="${cy}" stroke="${ciColor}" stroke-width="4" stroke-linecap="round"/>
          <!-- Tails -->
          <line x1="${xL}" y1="${cy - 4}" x2="${xL}" y2="${cy + 4}" stroke="${dotColor}" stroke-width="2"/>
          <line x1="${xU}" y1="${cy - 4}" x2="${xU}" y2="${cy + 4}" stroke="${dotColor}" stroke-width="2"/>
          <!-- Estimate diamond -->
          <polygon points="${xE},${cy - 6} ${xE + 6},${cy} ${xE},${cy + 6} ${xE - 6},${cy}"
                   fill="${dotColor}" opacity="0.95"/>
          <!-- Label text -->
          <text x="${W / 2}" y="${H - 2}" text-anchor="middle"
                font-family="monospace" font-size="9" fill="${dotColor}" font-weight="700">${labelText}</text>
          <!-- Axis ticks labels -->
          <text x="${PAD_L}" y="${cy - 6}" font-family="monospace" font-size="7.5" fill="#94a3b8">${axisMin.toFixed(2)}</text>
          <text x="${x0}" y="${cy - 6}" text-anchor="middle" font-family="monospace" font-size="7.5" fill="#94a3b8">${nullVal.toFixed(1)}</text>
          <text x="${W - PAD_R}" y="${cy - 6}" text-anchor="end" font-family="monospace" font-size="7.5" fill="#94a3b8">${axisMax.toFixed(2)}</text>
        </svg>
      `;
    }

    // ════════════════════════════
    // GUIDELINE STALE ALERT
    // ════════════════════════════

    /**
     * Trả về badge HTML nếu tài liệu là guideline/khuyến cáo và đã > 3 năm.
     * Tài liệu RCT/nghiên cứu cũ thì chỉ hiển thị badge nhỏ "Nghiên cứu lâu đời".
     */
    function getStaleAlertBadge(study) {
      const currentYear = new Date().getFullYear();
      const ageYears = currentYear - (study.year || currentYear);

      if (ageYears < 0) return ''; // future-dated, skip

      const isGuideline = study.design === 'guideline' ||
                          study.sourceType === 'vn-moh' ||
                          study.sourceType === 'vn-doh' ||
                          study.sourceType === 'vn-association' ||
                          study.sourceType === 'intl-guideline';

      if (isGuideline && ageYears >= 3) {
        const urgency = ageYears >= 5 ? 'stale-critical' : 'stale-warning';
        const icon = ageYears >= 5 ? '🔴' : '🟡';
        const tip = ageYears >= 5
          ? `Guideline đã ${ageYears} năm — khả năng cao đã có bản cập nhật!`
          : `Guideline đã ${ageYears} năm — nên kiểm tra bản mới nhất.`;
        return `<span class="stale-badge ${urgency}" title="${tip}">${icon} ${ageYears}yr</span>`;
      }

      // Nghiên cứu RCT/quan sát cũ hơn 10 năm — landmark badge
      if (!isGuideline && ageYears >= 10) {
        return `<span class="stale-badge stale-landmark" title="Nghiên cứu landmark (${ageYears} năm trước)">🏛️ Landmark</span>`;
      }

      return '';
    }

    // ════════════════════════════
    // MOBILE CARD VIEW
    // ════════════════════════════

    function renderMobileCards(filtered) {
      const tbody = document.getElementById('table-body');
      const emptyState = document.getElementById('empty-state');
      const displayCount = document.getElementById('display-count');
      const tableEl = document.getElementById('studies-table-element');

      displayCount.textContent = filtered.length;
      updateBadges();

      if (filtered.length === 0) {
        if (tableEl) tableEl.style.display = 'none';
        const cardsContainer = document.getElementById('mobile-cards-container');
        if (cardsContainer) cardsContainer.remove();
        emptyState.style.display = 'block';
        return;
      }

      emptyState.style.display = 'none';

      // Hide the data table, show cards container instead
      if (tableEl) tableEl.style.display = 'none';
      let cardsContainer = document.getElementById('mobile-cards-container');
      if (!cardsContainer) {
        cardsContainer = document.createElement('div');
        cardsContainer.id = 'mobile-cards-container';
        cardsContainer.className = 'mobile-cards-container';
        tableEl.parentNode.insertBefore(cardsContainer, tableEl.nextSibling);
      }

      cardsContainer.innerHTML = filtered.map(study => {
        const spec = SPECIALTIES[study.specialty] || { name: study.specialty, color: '#666', bg: '#f0f0f0' };
        const impactConfig = IMPACTS[study.impact] || { name: study.impact || 'N/A', color: '#6b7280', bg: '#f3f4f6' };
        const srcTypeConfig = SOURCE_TYPES[study.sourceType] || { name: study.sourceType || 'N/A', color: '#6b7280', bg: '#f3f4f6' };
        const isBookmarked = study.bookmarked;
        const isSelected = selectedIds.has(study.id);
        const isExpanded = expandedIds.has(study.id);
        const staleBadge = getStaleAlertBadge(study);
        const forestData = parseForestData(study.keyResults);

        const sgCount = (study.subgroups && typeof study.subgroups === 'object') ? Object.keys(study.subgroups).length : 0;
        const sgInlineBadge = sgCount > 0 ? `<button type="button" class="badge-subgroup-inline" onclick="event.stopPropagation(); openSubgroupModal('${study.id}', event)" title="Xem phân tích ${sgCount} phân nhóm" style="margin-left:4px; font-size:0.7rem; padding: 2px 6px;">🧬 Subgroup</button>` : '';
        const summaryBadge = renderSummaryButton(study, 'badge-mobile');

        return `
          <div class="mobile-card ${isExpanded ? 'expanded' : ''}" id="mc-${study.id}">
            <!-- Card Header -->
            <div class="mc-header" onclick="toggleExpandRow('${study.id}', event)">
              <div class="mc-header-left">
                <div class="mc-title-row">
                  <span class="mc-title">${escapeHtml(study.title)}</span>
                  ${staleBadge}
                </div>
                <div class="mc-meta">
                  <span class="badge badge-src-${study.sourceType}" style="font-size:0.65rem;">${srcTypeConfig.name}</span>
                  <span class="badge badge-${study.specialty}" style="font-size:0.65rem;">${spec.name}</span>
                  <span style="color: var(--text-faint); font-size: 0.72rem;">${escapeHtml(study.organization || '')} (${study.year})</span>
                </div>
              </div>
              <div class="mc-header-right">
                <button class="btn-star ${isBookmarked ? 'active' : ''}" onclick="toggleBookmark('${study.id}', event)" style="margin-right:4px;">★</button>
                <input type="checkbox" class="row-selector" ${isSelected ? 'checked' : ''}
                  onchange="toggleSelectRow('${study.id}', this.checked, event)"
                  onclick="event.stopPropagation()"
                  style="width:16px;height:16px;accent-color:var(--accent);">
              </div>
            </div>

            <!-- Card Impact Bar -->
            <div class="mc-impact-bar">
              <span class="impact-badge impact-${study.impact}">
                <span class="impact-dot"></span>
                ${impactConfig.name}
              </span>
              ${study.sampleSize ? `<span class="mc-sample">n=${formatNumber(study.sampleSize)}</span>` : ''}
              ${study.asianData ? `<span class="mc-asia-badge">🌏 Châu Á</span>` : ''}
              ${summaryBadge}
              ${sgInlineBadge}
            </div>

            <!-- Key Results + Forest Plot -->
            ${study.keyResults ? `
            <div class="mc-results" onclick="toggleExpandRow('${study.id}', event)">
              <span class="mc-results-label">Kết quả chính:</span>
              <span class="mc-results-val">${escapeHtml(study.keyResults)}</span>
              ${forestData ? `<div class="mc-forest-wrap">${renderForestPlotSVG(forestData)}</div>` : ''}
            </div>` : ''}

            <!-- Summary (always visible) -->
            <p class="mc-summary ${isExpanded ? '' : 'clamped'}" onclick="toggleExpandRow('${study.id}', event)">${escapeHtml(study.summary)}</p>

            <!-- Expanded Detail -->
            ${isExpanded ? `
            <div class="mc-detail">
              ${study.intervention ? `<div class="mc-detail-row"><span class="mc-detail-label">Can thiệp:</span> <span>${escapeHtml(study.intervention)}</span></div>` : ''}
              ${study.primaryEndpoint ? `<div class="mc-detail-row"><span class="mc-detail-label">Tiêu chí chính:</span> <span>${escapeHtml(study.primaryEndpoint)}</span></div>` : ''}
              ${study.population ? `<div class="mc-detail-row"><span class="mc-detail-label">Đối tượng:</span> <span>${escapeHtml(study.population)}</span></div>` : ''}
              ${study.fdaStatus ? `<div class="mc-detail-row"><span class="mc-detail-label">FDA/Khuyến cáo:</span> <span>${escapeHtml(study.fdaStatus)}</span></div>` : ''}
              ${study.detailedConclusion ? `<div class="mc-detail-row"><span class="mc-detail-label">Chi tiết:</span> <span style="font-size:0.78rem; color:var(--text-muted);">${escapeHtml(study.detailedConclusion)}</span></div>` : ''}
              <div class="mc-actions">
                ${renderSummaryButton(study, 'btn-primary')}
                ${study.relatedCalculators && study.relatedCalculators.length > 0 ? `<a href="../../../../${study.relatedCalculators[0].path}" target="_blank" class="btn btn-small" style="color:#059669;border-color:rgba(5,150,105,0.4);">🧮 ${escapeHtml(study.relatedCalculators[0].name)}</a>` : ''}
                ${study.relatedFlowcharts && study.relatedFlowcharts.length > 0 ? `<a href="../../../../${study.relatedFlowcharts[0].path}" target="_blank" class="btn btn-small" style="color:#2563eb;border-color:rgba(37,99,235,0.4);">🧩 ${escapeHtml(study.relatedFlowcharts[0].name)}</a>` : ''}
                ${study.radarUrl ? `<a href="${study.radarUrl}" class="btn btn-small" style="color:#d97706;border-color:rgba(217,119,6,0.4);">📡 Radar diff</a>` : ''}
                ${sgCount > 0 ? `<button type="button" class="btn btn-small" onclick="openSubgroupModal('${study.id}', event)" style="color:var(--purple); border-color:var(--purple-light); background:var(--purple-bg);">🧬 Subgroup</button>` : ''}
                ${study.sourceUrl ? `<a href="${study.sourceUrl}" target="_blank" class="btn btn-small">📄 Nguồn</a>` : ''}
                <button class="btn btn-small" onclick="openEditModal('${study.id}', event)">✏️ Sửa</button>
                <button class="btn btn-small" style="color:var(--red);border-color:rgba(220,38,38,0.3);" onclick="deleteStudy('${study.id}', event)">🗑️ Xóa</button>
              </div>
            </div>` : ''}

            <!-- Expand toggle -->
            <button class="mc-expand-btn" onclick="toggleExpandRow('${study.id}', event)">
              ${isExpanded ? '▲ Thu gọn' : '▼ Xem thêm'}
            </button>
          </div>
        `;
      }).join('');
    }

    // ════════════════════════════════
    // ANALYTICS DASHBOARD
    // ════════════════════════════════

    function renderAnalytics() {
      const panel = document.getElementById('panel-analytics');
      if (!panel) return;
      
      // Tối ưu: Dùng tập hợp tài liệu đang được lọc (nếu có lọc), hoặc toàn bộ studies nếu không lọc
      const targetStudies = (typeof getFilteredStudies === 'function') ? getFilteredStudies() : studies;
      const total = targetStudies.length;
      if (total === 0) {
        panel.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📊</div><p>Không có dữ liệu phù hợp với bộ lọc hiện tại để thống kê. Hãy điều chỉnh bộ lọc.</p></div>`;
        return;
      }
      const vnCount    = targetStudies.filter(s => s.sourceType && s.sourceType.startsWith('vn-')).length;
      const rctCount   = targetStudies.filter(s => s.design === 'rct').length;
      const bookmarked = targetStudies.filter(s => s.bookmarked).length;
      const pcCount    = targetStudies.filter(s => s.impact === 'practice-changing').length;
      const asianCount = targetStudies.filter(s => s.asianData).length;

      const specCounts = {}; Object.keys(SPECIALTIES).forEach(k => { specCounts[k] = 0; });
      targetStudies.forEach(s => { if (SPECIALTIES[s.specialty]) specCounts[s.specialty]++; });
      const impactCounts = {}; Object.keys(IMPACTS).forEach(k => { impactCounts[k] = 0; });
      targetStudies.forEach(s => { if (IMPACTS[s.impact]) impactCounts[s.impact]++; });
      const srcCounts = {}; Object.keys(SOURCE_TYPES).forEach(k => { srcCounts[k] = 0; });
      targetStudies.forEach(s => { if (SOURCE_TYPES[s.sourceType]) srcCounts[s.sourceType]++; });
      const yearCounts = {};
      targetStudies.forEach(s => { if (s.year) yearCounts[s.year] = (yearCounts[s.year] || 0) + 1; });
      const years = Object.keys(yearCounts).sort();
      const maxYearCount = years.length > 0 ? Math.max(...Object.values(yearCounts)) : 1;

      const specDD = Object.entries(specCounts).filter(([,v]) => v > 0)
        .map(([k,v]) => ({ name: SPECIALTIES[k].name, color: SPECIALTIES[k].color, count: v }));
      const impDD  = Object.entries(impactCounts).filter(([,v]) => v > 0)
        .map(([k,v]) => ({ name: IMPACTS[k].name, color: IMPACTS[k].color, count: v }));

      const statCards = [
        { icon: '📚', value: total,       label: 'Tổng tài liệu',     color: 'var(--accent)' },
        { icon: '🆻🇳', value: vnCount,    label: 'Tài liệu VN',       color: '#dc2626' },
        { icon: '🔬', value: rctCount,     label: 'RCT quốc tế',      color: '#6366f1' },
        { icon: '🏆', value: pcCount,      label: 'Practice-Changing', color: '#dc2626' },
        { icon: '🌏', value: asianCount,   label: 'Dữ liệu Châu Á',   color: '#0d9488' },
        { icon: '⭐', value: bookmarked,   label: 'Đã lưu trữ',       color: '#f59e0b' },
      ];

      panel.innerHTML = `
        <div class="analytics-wrapper">
          <div class="analytics-stats-row">
            ${statCards.map(c => `
              <div class="stat-card">
                <div class="stat-icon">${c.icon}</div>
                <div class="stat-number" style="color:${c.color};">${c.value}</div>
                <div class="stat-label">${c.label}</div>
              </div>`).join('')}
          </div>

          <div class="analytics-charts-row">
            <div class="analytics-chart-card">
              <h3 class="analytics-chart-title">🏥 Phân bố Chuyên khoa</h3>
              ${specDD.length ? `
              <div class="donut-chart-wrapper">
                <div class="donut-svg-container">
                  <svg viewBox="0 0 240 240" class="donut-svg">
                    ${renderDonutSVG(specDD, total, 120, 120, 95, 56)}
                    <text x="120" y="116" text-anchor="middle" font-size="24" font-weight="800" fill="var(--text)" font-family="Plus Jakarta Sans,sans-serif">${total}</text>
                    <text x="120" y="133" text-anchor="middle" font-size="10" fill="var(--text-faint)" font-family="Inter,sans-serif">tài liệu</text>
                  </svg>
                </div>
                <div class="donut-legend">
                  ${specDD.sort((a,b)=>b.count-a.count).map(item => `
                    <div class="legend-item">
                      <span class="legend-dot" style="background:${item.color};"></span>
                      <span class="legend-name">${item.name}</span>
                      <span class="legend-count">${item.count}</span>
                    </div>`).join('')}
                </div>
              </div>` : '<p class="no-data-msg">Chưa có dữ liệu.</p>'}
            </div>

            <div class="analytics-chart-card">
              <h3 class="analytics-chart-title">⚡ Mức ảnh hưởng</h3>
              ${impDD.length ? `
              <div class="donut-chart-wrapper">
                <div class="donut-svg-container">
                  <svg viewBox="0 0 240 240" class="donut-svg">
                    ${renderDonutSVG(impDD, total, 120, 120, 95, 56)}
                    <text x="120" y="112" text-anchor="middle" font-size="22" font-weight="800" fill="#dc2626">${pcCount}</text>
                    <text x="120" y="127" text-anchor="middle" font-size="8.5" fill="var(--text-faint)">Practice</text>
                    <text x="120" y="139" text-anchor="middle" font-size="8.5" fill="var(--text-faint)">Changing</text>
                  </svg>
                </div>
                <div class="donut-legend">
                  ${impDD.sort((a,b)=>b.count-a.count).map(item => `
                    <div class="legend-item">
                      <span class="legend-dot" style="background:${item.color};"></span>
                      <span class="legend-name">${item.name}</span>
                      <span class="legend-count">${item.count}</span>
                    </div>`).join('')}
                </div>
              </div>` : '<p class="no-data-msg">Chưa có dữ liệu.</p>'}
            </div>
          </div>

          <div class="analytics-chart-card" style="margin-top:1rem;">
            <h3 class="analytics-chart-title">📈 Phân bố theo Năm công bố</h3>
            ${renderYearBarChart(yearCounts, years, maxYearCount)}
          </div>

          <div class="analytics-chart-card" style="margin-top:1rem;">
            <h3 class="analytics-chart-title">🌐 Phân bố Nguồn tài liệu</h3>
            <div class="source-bars">
              ${Object.entries(srcCounts).filter(([,v])=>v>0).sort(([,a],[,b])=>b-a).map(([k,v])=>{
                const src=SOURCE_TYPES[k];
                const pct=Math.round(v/total*100);
                return `<div class="source-bar-item">
                  <div class="source-bar-label">
                    <span class="badge badge-src-${k}">${src.name}</span>
                    <span class="source-bar-pct">${pct}%&nbsp;<strong>(${v})</strong></span>
                  </div>
                  <div class="source-bar-track">
                    <div class="source-bar-fill" style="width:${pct}%;background:${src.color};"></div>
                  </div>
                </div>`;
              }).join('')}
            </div>
          </div>

          <!-- DYNAMIC CLINICAL VISUALIZATIONS -->
          <div id="analytics-bubble-chart-container" style="margin-top: 1.25rem;"></div>
          <div id="analytics-heatmap-container" style="margin-top: 1.25rem;"></div>
          
          ${window.renderEvidenceGapMap ? window.renderEvidenceGapMap(targetStudies) : ''}
        </div>
      `;

      // Render SVG Evidence Map & Heatmap Matrix if module loaded
      if (window.GuidelineVisualizations) {
        if (typeof window.GuidelineVisualizations.renderEvidenceBubbleChart === 'function') {
          window.GuidelineVisualizations.renderEvidenceBubbleChart(targetStudies, 'analytics-bubble-chart-container', function(studyId) {
            if (window.filterByStudyId) window.filterByStudyId(studyId);
          });
        }
        if (typeof window.GuidelineVisualizations.renderHeatmapMatrix === 'function') {
          window.GuidelineVisualizations.renderHeatmapMatrix(targetStudies, 'analytics-heatmap-container', function(specialty, year) {
            if (window.filterBySpecialtyAndYear) window.filterBySpecialtyAndYear(specialty, year);
          });
        }
      }
    }

    function renderDonutSVG(data, total, cx, cy, r, innerR) {
      if (!data || data.length === 0) return '';
      if (data.length === 1) return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${data[0].color}" opacity="0.9"/><circle cx="${cx}" cy="${cy}" r="${innerR}" fill="var(--surface)"/>`;
      const paths = []; let angle = -Math.PI / 2; const GAP = 0.025;
      data.forEach(item => {
        const sweep = Math.max((item.count/total)*2*Math.PI - GAP, 0.02);
        const end = angle + sweep;
        const [x1,y1]=[cx+r*Math.cos(angle),cy+r*Math.sin(angle)];
        const [x2,y2]=[cx+r*Math.cos(end),cy+r*Math.sin(end)];
        const [ix1,iy1]=[cx+innerR*Math.cos(end),cy+innerR*Math.sin(end)];
        const [ix2,iy2]=[cx+innerR*Math.cos(angle),cy+innerR*Math.sin(angle)];
        const lg=sweep>Math.PI?1:0;
        const d=`M${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 ${lg} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} L${ix1.toFixed(2)} ${iy1.toFixed(2)} A${innerR} ${innerR} 0 ${lg} 0 ${ix2.toFixed(2)} ${iy2.toFixed(2)}Z`;
        paths.push(`<path d="${d}" fill="${item.color}" opacity="0.9" class="donut-sector"><title>${item.name}: ${item.count}</title></path>`);
        angle = end + GAP;
      });
      return paths.join('');
    }

    function renderYearBarChart(yearCounts, years, maxCount) {
      if (!years || years.length === 0) return '<p class="no-data-msg">Không có dữ liệu năm.</p>';
      const W=520,H=150,PL=30,PB=36,PT=18,PR=12;
      const plotW=W-PL-PR,plotH=H-PB-PT,slotW=plotW/years.length,barW=Math.min(slotW*0.62,42);
      const cyear=new Date().getFullYear();
      const bars=years.map((yr,i)=>{
        const cnt=yearCounts[yr],bh=(cnt/maxCount)*plotH;
        const x=PL+i*slotW+(slotW-barW)/2,y=PT+plotH-bh;
        const op=Math.max(0.35,1-(cyear-parseInt(yr))*0.055);
        return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${bh.toFixed(1)}" rx="4" fill="var(--accent)" opacity="${op.toFixed(2)}"/>
        <text x="${(x+barW/2).toFixed(1)}" y="${(H-PB+14).toFixed(1)}" text-anchor="middle" font-size="9" fill="var(--text-faint)">${yr}</text>
        ${cnt>0?`<text x="${(x+barW/2).toFixed(1)}" y="${(y-5).toFixed(1)}" text-anchor="middle" font-size="10" font-weight="700" fill="var(--accent)">${cnt}</text>`:''}`;}).join('');
      const guides=[0,Math.ceil(maxCount/2),maxCount].map(v=>{
        const gy=PT+plotH-(v/maxCount)*plotH;
        return `<line x1="${PL}" y1="${gy.toFixed(1)}" x2="${W-PR}" y2="${gy.toFixed(1)}" stroke="var(--border-light)" stroke-width="1" ${v>0?'stroke-dasharray="3,3"':''}/>
        <text x="${(PL-5).toFixed(1)}" y="${(gy+4).toFixed(1)}" text-anchor="end" font-size="9" fill="var(--text-faint)">${v}</text>`;}).join('');
      return `<div style="overflow-x:auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;min-width:260px;height:${H}px;display:block;">${guides}${bars}<line x1="${PL}" y1="${PT+plotH}" x2="${W-PR}" y2="${PT+plotH}" stroke="var(--border)" stroke-width="1.5"/></svg></div>`;
    }

    // ════════════════════════════════
    // GUIDELINE TIMELINE
    // ════════════════════════════════

    let _tlFilter = null;

    function renderTimeline() {
      const panel = document.getElementById('panel-timeline');
      if (!panel) return;
      if (studies.length === 0) {
        panel.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📅</div><p>Chưa có dữ liệu để hiển thị timeline.</p></div>`;
        return;
      }
      _tlFilter = null;
      const validYears = studies.map(s => s.year).filter(y => y && !isNaN(y));
      const minY = validYears.length ? Math.min(...validYears) : new Date().getFullYear();
      const maxY = validYears.length ? Math.max(...validYears) : new Date().getFullYear();
      const specInUse = [...new Set(studies.map(s => s.specialty))].filter(k => SPECIALTIES[k]);
      panel.innerHTML = `
        <div class="tl-wrapper">
          <div class="tl-top-bar">
            <h2 class="tl-page-title">📅 Timeline Hướng Dẫn &amp; Nghiên Cứu Lâm Sàng</h2>
            <p class="tl-page-subtitle">${studies.length} tài liệu${validYears.length>1?` · Từ ${minY} đến ${maxY}`:''}</p>
            <div class="tl-filter-bar">
              <button class="filter-pill active" onclick="filterTimeline(null,this)">Đầu tiên</button>
              ${specInUse.map(k=>`
                <button class="filter-pill" onclick="filterTimeline('${k}',this)">
                  <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${SPECIALTIES[k].color};margin-right:3px;vertical-align:middle;"></span>
                  ${SPECIALTIES[k].name}
                </button>`).join('')}
            </div>
          </div>
          <div class="tl-body" id="tl-body">${buildTimelineHTML(null)}</div>
        </div>
      `;
    }

    function buildTimelineHTML(fSpec) {
      const sorted = [...studies].sort((a,b) => (b.year||0)-(a.year||0));
      const byYear = {};
      sorted.forEach(s => { const y=s.year||'N/A'; if(!byYear[y]) byYear[y]=[]; byYear[y].push(s); });
      const groups = Object.entries(byYear).sort(([a],[b])=>{
        const na=parseInt(a),nb=parseInt(b); return isNaN(na)?1:isNaN(nb)?-1:nb-na;
      });
      return groups.map(([year,sts]) => {
        const vis = fSpec ? sts.filter(s=>s.specialty===fSpec) : sts;
        if (!vis.length) return '';
        return `
          <div class="tl-year-group">
            <div class="tl-year-pin">
              <div class="tl-year-badge">${year}</div>
              <div class="tl-year-line"></div>
            </div>
            <div class="tl-items">
              ${vis.map(study => {
                const spec = SPECIALTIES[study.specialty]||{name:study.specialty,color:'#666'};
                const imp  = IMPACTS[study.impact]||{name:study.impact||'N/A',color:'#6b7280'};
                const src  = SOURCE_TYPES[study.sourceType]||{name:study.sourceType||'',color:'#6b7280'};
                const stale = getStaleAlertBadge(study);
                const fd = parseForestData(study.keyResults);
                const detailLink = study.file ? `<a href="${study.file}" target="_blank" class="btn btn-small" style="font-size:0.7rem;padding:0.2rem 0.5rem;" onclick="event.stopPropagation()">📄 Chi tiết</a>` : '';
                return `
                  <div class="tl-item" style="--tl-color:${spec.color};" onclick="jumpToStudy('${study.id}')">
                    <div class="tl-item-dot"></div>
                    <div class="tl-item-body">
                      <div class="tl-item-header">
                        <span class="tl-item-title">${escapeHtml(study.title)}</span>
                        ${stale}
                      </div>
                      <div class="tl-item-badges">
                        <span class="badge badge-src-${study.sourceType}" style="font-size:0.62rem;">${src.name}</span>
                        <span class="badge badge-${study.specialty}" style="font-size:0.62rem;">${spec.name}</span>
                        <span class="impact-badge impact-${study.impact}" style="font-size:0.62rem;"><span class="impact-dot"></span>${imp.name}</span>
                        ${study.sampleSize?`<span class="tl-n-badge">n=${formatNumber(study.sampleSize)}</span>`:''}
                      </div>
                      <p class="tl-item-summary">${escapeHtml(study.summary)}</p>
                      ${study.keyResults?`
                      <div class="tl-results-row">
                        <code class="tl-results-code">${escapeHtml(study.keyResults)}</code>
                        ${fd?`<div class="tl-forest">${renderForestPlotSVG(fd)}</div>`:''}
                      </div>`:''}  
                      <div class="tl-item-footer">
                        <span>${escapeHtml(study.drug||'')}${study.drug&&study.organization?' · ':''}${escapeHtml(study.organization||'')} (${study.year||''})</span>
                        <div style="display:flex;gap:4px;">
                          ${detailLink}
                          <button class="btn btn-small" style="font-size:0.7rem;padding:0.2rem 0.5rem;" onclick="event.stopPropagation();jumpToStudy('${study.id}')">↑ Xem trong bảng</button>
                        </div>
                      </div>
                    </div>
                  </div>`;
              }).join('')}
            </div>
          </div>`;
      }).join('');
    }

    function filterTimeline(spec, btn) {
      _tlFilter = spec;
      document.querySelectorAll('.tl-filter-bar .filter-pill').forEach(p => p.classList.remove('active'));
      if (btn) btn.classList.add('active');
      const body = document.getElementById('tl-body');
      if (body) body.innerHTML = buildTimelineHTML(spec);
    }

    function jumpToStudy(id) {
      switchTab('list');
      setTimeout(() => {
        expandedIds.add(id);
        renderTable();
        setTimeout(() => {
          const el = document.getElementById(`tr-${id}`);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }, 150);
    }

    // ════════════════════════════════
    // SUBGROUP EXPLORER
    // ════════════════════════════════

    function renderSubgroupPanel(study) {
      let sg = study ? study.subgroups : null;
      if (typeof sg === 'string' && sg.trim()) {
        try { sg = JSON.parse(sg.trim()); } catch(e) { sg = null; }
      }
      if (!sg || typeof sg !== 'object' || Object.keys(sg).length === 0) {
        return `
          <div style="padding: 2.5rem 1.5rem; text-align: center; color: var(--text-muted);">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🧬</div>
            <div style="font-weight: 700; font-size: 1rem; color: var(--text); margin-bottom: 0.25rem;">Chưa có dữ liệu phân tích Subgroup</div>
            <div style="font-size: 0.8rem; color: var(--text-faint);">Bấm "Sửa" tài liệu này để bổ sung dữ liệu phân nhóm JSON key-value.</div>
          </div>
        `;
      }
      const entries = Object.entries(sg);
      const overall = parseForestData(study.keyResults);

      const cards = entries.map(([name, result]) => {
        const fd = parseForestData(result);
        const hasAsia = /ch.u.+./i.test(name) || /asia/i.test(name);
        const asiaBadge = hasAsia ? '<span class="sg-badge sg-badge-asia">🌏 Châu Á</span>' : '';

        const isDiff = fd && ['MD', 'SMD', 'WMD', 'RD', 'ARR'].includes(fd.label);
        let verdictBadge = '';
        let cardStatusClass = '';
        if (fd) {
          const isBenefit = isDiff ? fd.estimate < 0.0 : fd.estimate < 1.0;
          const isHarm = isDiff ? fd.estimate > 0.0 : fd.estimate > 1.0;
          
          if (isBenefit) {
            const val = isDiff ? Math.abs(fd.estimate).toFixed(2) : Math.round((1.0 - fd.estimate) * 100) + '%';
            verdictBadge = `<span class="sg-tag sg-tag-benefit">🟢 Lợi ích ${isDiff ? '' : '-'}${val}</span>`;
            cardStatusClass = 'card-benefit';
          } else if (isHarm) {
            const val = isDiff ? fd.estimate.toFixed(2) : Math.round((fd.estimate - 1.0) * 100) + '%';
            verdictBadge = `<span class="sg-tag sg-tag-harm">🔴 Nguy cơ ${isDiff ? '+' : ''}${val}</span>`;
            cardStatusClass = 'card-harm';
          } else {
            verdictBadge = `<span class="sg-tag sg-tag-neutral">⚪ Trung tính</span>`;
            cardStatusClass = 'card-neutral';
          }
        }

        const pBadge = (fd && fd.pValue) ? `<span class="sg-p-badge ${fd.isSig ? 'sig' : 'ns'}">p${fd.pValue.startsWith('<')||fd.pValue.startsWith('>')?'':'='}${fd.pValue}</span>` : '';

        return `
          <div class="sg-card ${cardStatusClass}">
            <div class="sg-card-top">
              <div class="sg-card-title">
                ${asiaBadge}
                <span>${escapeHtml(name)}</span>
              </div>
              ${verdictBadge}
            </div>

            <div class="sg-card-middle">
              <div class="sg-card-code-wrap">
                <code class="sg-card-code">${escapeHtml(result)}</code>
                ${pBadge}
              </div>
            </div>

            <div class="sg-card-bottom">
              ${fd ? renderSubgroupForestRow(fd, overall) : '<span class="sg-no-data">Không có thông số sơ đồ</span>'}
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="sg-panel">
          <div class="sg-panel-header">
            <div class="sg-panel-title-group" style="display:flex;align-items:center;gap:6px;">
              <span class="sg-panel-icon">🧬</span>
              <span class="sg-panel-title">Phân tích Subgroup (${entries.length} phân nhóm)</span>
            </div>
            <div class="sg-legend">
              <span class="sg-legend-item"><span class="sg-dot sg-dot-green"></span>Lợi ích</span>
              <span class="sg-legend-item"><span class="sg-dot sg-dot-red"></span>Nguy cơ</span>
              <span class="sg-legend-item"><span class="sg-dot sg-dot-grey"></span>Tổng thể (vạch nét đứt)</span>
            </div>
          </div>

          <div class="sg-grid-container">
            ${cards}
          </div>
        </div>
      `;
    }

    function renderSubgroupForestRow(fd, overall) {
      if (!fd) return '';
      if (fd.type === 'column' || fd.type === 'horizontal-bar') {
        return renderChartSVG(fd);
      }
      const W = 280, H = 34, PL = 12, PR = 12;
      const cy = (H / 2) - 2;
      const plotW = W - PL - PR;

      const isGreen = fd.estimate < 1.0;
      const dotColor = isGreen ? '#16a34a' : (fd.estimate > 1.0 ? '#dc2626' : '#6b7280');
      const ciColor  = isGreen ? '#86efac' : (fd.estimate > 1.0 ? '#fca5a5' : '#cbd5e1');

      const allVals = [fd.ciLow || fd.lower || fd.estimate, fd.estimate, fd.ciHigh || fd.upper || fd.estimate];
      if (overall && overall.estimate) allVals.push(overall.estimate);
      const axisMin = Math.max(0.05, Math.min(...allVals) * 0.75);
      const axisMax = Math.max(...allVals) * 1.25;
      const axisRange = axisMax - axisMin || 1;

      const toX = v => PL + ((Math.max(axisMin, Math.min(axisMax, v)) - axisMin) / axisRange) * plotW;
      const x1 = toX(1.0);
      const xE = toX(fd.estimate);
      const xL = toX(fd.ciLow || fd.lower || fd.estimate);
      const xU = toX(fd.ciHigh || fd.upper || fd.estimate);

      const overallLine = (overall && overall.estimate)
        ? `<line x1="${toX(overall.estimate).toFixed(1)}" y1="${cy-10}" x2="${toX(overall.estimate).toFixed(1)}" y2="${cy+10}" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,2"/>`
        : '';

      return `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" class="sg-forest-svg" style="display:block;overflow:visible;">
          <line x1="${PL}" y1="${cy}" x2="${W-PR}" y2="${cy}" stroke="#cbd5e1" stroke-width="1"/>
          <line x1="${x1.toFixed(1)}" y1="${cy-10}" x2="${x1.toFixed(1)}" y2="${cy+10}" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4,2"/>
          ${overallLine}
          <line x1="${xL.toFixed(1)}" y1="${cy}" x2="${xU.toFixed(1)}" y2="${cy}" stroke="${ciColor}" stroke-width="4" stroke-linecap="round"/>
          <line x1="${xL.toFixed(1)}" y1="${cy-4}" x2="${xL.toFixed(1)}" y2="${cy+4}" stroke="${dotColor}" stroke-width="1.5"/>
          <line x1="${xU.toFixed(1)}" y1="${cy-4}" x2="${xU.toFixed(1)}" y2="${cy+4}" stroke="${dotColor}" stroke-width="1.5"/>
          <polygon points="${xE.toFixed(1)},${(cy-6).toFixed(1)} ${(xE+6).toFixed(1)},${cy} ${xE.toFixed(1)},${(cy+6).toFixed(1)} ${(xE-6).toFixed(1)},${cy}" fill="${dotColor}" opacity="0.95"/>
          <text x="${PL}" y="${H-2}" font-size="7.5" fill="#94a3b8" font-family="monospace">${axisMin.toFixed(2)}</text>
          <text x="${x1.toFixed(1)}" y="${H-2}" text-anchor="middle" font-size="7.5" fill="#94a3b8" font-family="monospace">1.0</text>
          <text x="${W-PR}" y="${H-2}" text-anchor="end" font-size="7.5" fill="#94a3b8" font-family="monospace">${axisMax.toFixed(2)}</text>
        </svg>`;
    }

    function openSubgroupModal(id, event) {
      if (event && event.stopPropagation) event.stopPropagation();
      let study = studies.find(s => s.id === id);
      if (!study && typeof SAMPLE_STUDIES !== 'undefined') {
        study = SAMPLE_STUDIES.find(s => s.id === id);
      }
      if (!study) {
        console.warn('[SubgroupModal] Study not found:', id);
        return;
      }

      const titleEl = document.getElementById('subgroup-modal-title');
      const bodyEl = document.getElementById('subgroup-modal-body');

      if (titleEl) titleEl.innerHTML = `🧬 Phân Tích Subgroup: <span style="color:var(--accent);">${escapeHtml(study.title)}</span>`;
      try {
        if (bodyEl) bodyEl.innerHTML = renderSubgroupPanel(study);
      } catch (err) {
        console.error('[SubgroupModal] Error rendering subgroup panel:', err);
        if (bodyEl) bodyEl.innerHTML = `<div style="padding:2rem;color:var(--color-danger);text-align:center;">Lỗi hiển thị dữ liệu Subgroup: ${err.message}</div>`;
      }

      const modal = document.getElementById('subgroup-modal');
      if (modal) {
        modal.classList.add('active');
        modal.style.display = 'flex';
      }
    }

    function closeSubgroupModal() {
      const modal = document.getElementById('subgroup-modal');
      if (modal) {
        modal.classList.remove('active');
        modal.style.display = '';
      }
    }

    // Explicitly attach subgroup functions to global window object
    window.openSubgroupModal = openSubgroupModal;
    window.closeSubgroupModal = closeSubgroupModal;

    function filterBySubgroupData() {
      document.querySelectorAll('.left-nav-link').forEach(l => l.classList.remove('active'));
      const btn = document.getElementById('sidebar-btn-subgroup');
      if (btn) btn.classList.add('active');
      filters.hasSubgroup = true;
      filters.asianData  = false;
      renderTable();
    }

    function filterByAsianData() {
      document.querySelectorAll('.left-nav-link').forEach(l => l.classList.remove('active'));
      const btn = document.getElementById('sidebar-btn-asian');
      if (btn) btn.classList.add('active');
      filters.asianData   = true;
      filters.hasSubgroup = false;
      renderTable();
    }

    function updateSubgroupSidebarCount() {
      const count = studies.filter(s => s.subgroups && typeof s.subgroups === 'object' && Object.keys(s.subgroups).length > 0).length;
      const el = document.getElementById('subgroup-count-sidebar');
      if (el) el.textContent = count;
    }

    // Setup table header sorting
    function setupTableSorting() {
      document.querySelectorAll('.study-table th.sortable').forEach(th => {
        th.addEventListener('click', () => {
          handleSort(th.dataset.sort);
        });
      });
    }

    // Drag and drop for file import
    function setupDragDrop() {
      const dropZone = document.getElementById('drop-zone');
      if (dropZone) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
          dropZone.addEventListener(eventName, e => {
            e.preventDefault();
            e.stopPropagation();
          }, false);
        });
        
        ['dragenter', 'dragover'].forEach(eventName => {
          dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('dragover');
          }, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
          dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('dragover');
          }, false);
        });
        
        dropZone.addEventListener('drop', (e) => {
          const dt = e.dataTransfer;
          const files = dt.files;
          
          if (files.length > 0) {
            const input = document.getElementById('file-input');
            input.files = files;
            handleFileSelect({ target: input });
          }
        }, false);
      }
    }

    // ════════════════════════════
    // ════════════════════════════
    // SIDEBAR TOGGLE & STATE LOGIC
    // ════════════════════════════
    function toggleSidebar() {
      const leftNav = document.getElementById('left-nav');
      const appShell = document.querySelector('.app-shell');
      const backdrop = document.getElementById('sidebar-backdrop');
      if (!leftNav) return;

      const isMobile = window.innerWidth <= 1024;
      if (isMobile) {
        // Mobile drawer mode: slide overlay in/out
        const isOpen = leftNav.classList.toggle('mobile-open');
        if (backdrop) backdrop.classList.toggle('active', isOpen);
      } else {
        // Desktop collapse mode: icon-rail (68px) vs expanded (280px)
        const isCollapsed = leftNav.classList.toggle('collapsed');
        if (appShell) appShell.classList.toggle('sidebar-collapsed', isCollapsed);
        localStorage.setItem('guidelines_sidebar_collapsed', isCollapsed ? 'true' : 'false');
      }
    }

    function initSidebarState() {
      const isMobile = window.innerWidth <= 1024;
      const leftNav = document.getElementById('left-nav');
      const appShell = document.querySelector('.app-shell');
      
      if (!isMobile && leftNav) {
        const isCollapsed = localStorage.getItem('guidelines_sidebar_collapsed') === 'true';
        if (isCollapsed) {
          leftNav.classList.add('collapsed');
          if (appShell) appShell.classList.add('sidebar-collapsed');
        }
      }
    }

    // ════════════════════════════
    // INITIALIZATION
    // ════════════════════════════

    // Resize listener: switch between table and card view
    window.addEventListener('resize', () => {
      const newMobile = window.innerWidth <= 768;
      if (newMobile !== isMobileView) {
        isMobileView = newMobile;
        if (currentTab !== 'compare') renderTable();
      }
    });

    document.addEventListener('DOMContentLoaded', function() {
      initSidebarState();
      initSupabase();
      loadStudies();
      parseUrlState();
      
      if (supabaseClient) {
        syncStudiesWithSupabase();
      }

      // Add NNT inputs listeners
      const nntCer = document.getElementById('nnt-cer-input');
      const nntEer = document.getElementById('nnt-eer-input');
      if (nntCer) nntCer.addEventListener('input', calculateNNT);
      if (nntEer) nntEer.addEventListener('input', calculateNNT);
      
      // Parse URL parameters for specialty and search
      const urlParams = new URLSearchParams(window.location.search);
      const specialtyParam = urlParams.get('specialty');
      const searchParam = urlParams.get('search');
      
      if (specialtyParam && SPECIALTIES[specialtyParam]) {
        filters.specialty = specialtyParam;
        showAdvancedFilters = true;
        const filterRowSpecialty = document.getElementById('filter-row-specialty');
        const filterRowDesign = document.getElementById('filter-row-design');
        const filterRowPeriod = document.getElementById('filter-row-period');
        const advBtn = document.getElementById('advanced-filters-btn');
        
        if (filterRowSpecialty) filterRowSpecialty.style.display = 'flex';
        if (filterRowDesign) filterRowDesign.style.display = 'flex';
        if (filterRowPeriod) filterRowPeriod.style.display = 'flex';
        if (advBtn) advBtn.classList.add('active');
      }
      
      if (searchParam) {
        filters.search = searchParam;
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.value = searchParam;
      }
      
      renderFilterPills();
      renderTable();
      renderUpdates();
      setupTableSorting();
      setupDragDrop();
      
      // Search listener
      const searchInput = document.getElementById('search-input');
      if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
      }
      
      // Close popups on click outside
      document.addEventListener('click', (e) => {
        const colMenu = document.getElementById('columns-dropdown-menu');
        const colBtn = document.getElementById('columns-toggle-btn');
        if (colMenu && colMenu.classList.contains('active') && !colMenu.contains(e.target) && e.target !== colBtn) {
          colMenu.classList.remove('active');
        }
        if (!e.target.closest('.actions-dropdown')) {
          closeAllActionsDropdowns();
        }
      });
      
      // Close modals on overlay click
      document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) {
            overlay.classList.remove('active');
          }
        });
      });
      
      // Keyboard shortcuts listener: Escape & Alt+S
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeAddModal();
          closeImportModal();
          closeSupabaseModal();
          closeSubgroupModal();
          closeNntModal();
          const icdModal = document.getElementById('icd10-modal');
          if (icdModal) icdModal.classList.remove('active');
          const drugModal = document.getElementById('drug-interaction-modal');
          if (drugModal) drugModal.classList.remove('active');
        }
        if (e.altKey && (e.key === 's' || e.key === 'S')) {
          e.preventDefault();
          toggleSidebar();
        }
      });
    });

    function closeAllActionsDropdowns() {
      document.querySelectorAll('.actions-dropdown').forEach(el => el.classList.remove('active'));
    }

    function toggleActionsDropdown(dropdownId, event) {
      if (event) event.stopPropagation();
      const targetEl = document.getElementById(dropdownId);
      const isAlreadyActive = targetEl && targetEl.classList.contains('active');
      closeAllActionsDropdowns();
      if (targetEl && !isAlreadyActive) {
        targetEl.classList.add('active');
      }
    }

    window.toggleActionsDropdown = toggleActionsDropdown;
    window.closeAllActionsDropdowns = closeAllActionsDropdowns;

    // Helper Filter Window Callbacks for Visualizations
    window.filterBySourceType = function(sourceTypeKey) {
      filters.sourceType = sourceTypeKey;
      renderFilterPills();
      renderTable();
      switchTab('list');
    };

    window.filterByAsianData = function() {
      filters.asianData = true;
      const cb = document.getElementById('asian-data-filter');
      if (cb) cb.checked = true;
      renderTable();
      switchTab('list');
    };

    window.filterByStudyId = function(studyId) {
      const study = studies.find(s => s.id === studyId);
      if (study) {
        filters.search = study.title;
        const searchInp = document.getElementById('search-input');
        if (searchInp) searchInp.value = study.title;
        renderFilterPills();
        renderTable();
        switchTab('list');
        if (typeof toggleExpandRow === 'function') {
          toggleExpandRow(studyId);
        }
      }
    };

    window.filterBySpecialtyAndYear = function(specialty, year) {
      filters.specialty = specialty;
      filters.period = null;
      filters.search = String(year);
      const searchInp = document.getElementById('search-input');
      if (searchInp) searchInp.value = String(year);
      renderFilterPills();
      renderTable();
      switchTab('list');
    };

    // ════════════════════════════════════════════════════
    // PWA OFFLINE SYNC LOGIC
    // ════════════════════════════════════════════════════
    window.syncCurrentSpecialtyOffline = function() {
      const btn = document.getElementById('btn-offline-sync');
      const icon = document.getElementById('offline-sync-icon');
      const text = document.getElementById('offline-sync-text');
      
      if (!('serviceWorker' in navigator)) {
        alert('Trình duyệt của bạn không hỗ trợ Service Worker. Vui lòng dùng Chrome hoặc Safari bản mới nhất.');
        return;
      }
      
      if (!navigator.serviceWorker.controller) {
        alert('Service Worker chưa được kích hoạt. Hãy reload lại trang một lần rồi thử lại.');
        return;
      }

      // Xác định danh sách cần tải (Lấy từ bộ lọc hiện tại)
      const targetStudies = (typeof getFilteredStudies === 'function') ? getFilteredStudies() : studies;
      
      if (!targetStudies || targetStudies.length === 0) {
        alert('Không có tài liệu nào trong danh sách bộ lọc hiện tại để tải.');
        return;
      }
      
      const specialtyName = filters.specialty ? (SPECIALTIES[filters.specialty]?.name || filters.specialty) : 'Tất cả chuyên khoa';
      const confirmMsg = `Bạn chuẩn bị tải offline ${targetStudies.length} tài liệu của "${specialtyName}" (Bao gồm cả tóm tắt HTML và bản gốc PDF).\n\nQuá trình này có thể tốn vài chục MB và cần chút thời gian. Bạn có chắc chắn muốn tải?`;
      
      if (!confirm(confirmMsg)) return;

      // Đổi UI sang trạng thái Đang tải
      if (btn) {
        btn.style.background = '#fef3c7';
        btn.style.color = '#d97706';
        btn.style.borderColor = '#fcd34d';
        btn.style.pointerEvents = 'none';
      }
      if (icon) icon.className = 'fa-solid fa-spinner fa-spin';
      if (text) text.innerText = 'Đang tải...';

      // Trích xuất URLs (HTML và PDF)
      const urlsToCache = [];
      targetStudies.forEach(study => {
        if (study.file) {
          urlsToCache.push(resolveStudyFile(study.file));
        }
        if (study.pdfUrl) {
          // Chỉ thêm pdfUrl nếu hợp lệ và là internal path
          const pdfUrl = resolveStudyFile(study.pdfUrl);
          if (pdfUrl && !pdfUrl.startsWith('http')) {
             urlsToCache.push(pdfUrl);
          }
        }
      });

      // Lọc trùng lặp
      const uniqueUrls = [...new Set(urlsToCache)];

      // Gửi Message Channel tới Service Worker
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = function(event) {
        if (event.data.status === 'success') {
          // Hoàn tất
          if (btn) {
            btn.style.background = '#f0fdf4';
            btn.style.color = '#16a34a';
            btn.style.borderColor = '#bbf7d0';
            btn.style.pointerEvents = 'auto';
            btn.onclick = () => alert('Các tài liệu này đã nằm trong máy của bạn! Bạn có thể tắt mạng và xem thử.');
          }
          if (icon) icon.className = 'fa-solid fa-check-circle';
          if (text) text.innerText = 'Đã lưu Offline';
        }
      };

      navigator.serviceWorker.controller.postMessage({
        action: 'CACHE_URLS',
        urls: uniqueUrls
      }, [messageChannel.port2]);
    };

