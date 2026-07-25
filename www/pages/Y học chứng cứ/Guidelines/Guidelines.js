    let studies = [];
    let selectedIds = new Set();
    let expandedIds = new Set();
    let isMobileView = window.innerWidth <= 768;
    
    // View state
    let viewMode = 'compact'; // 'full' or 'compact'
    let currentTab = 'list'; // 'list', 'saved', 'compare'
    let showAdvancedFilters = false;

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
      population: true
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
      hasSummary: false
    };

    let sortField = 'title';
    let sortAsc = true;

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
      if (confirm('☁️ Bạn có chắc chắn muốn xóa cấu hình Supabase? Hệ thống sẽ quay lại sử dụng LocalStorage.')) {
        localStorage.removeItem('supabaseUrl');
        localStorage.removeItem('supabaseKey');
        document.getElementById('sb-url').value = '';
        document.getElementById('sb-key').value = '';
        closeSupabaseModal();
        initSupabase();
        loadStudies(); // reload local data
        renderTable();
        renderUpdates();
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

          const remoteStudies = data.map(s => ({
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
            asianData: s.asianData !== undefined ? s.asianData : false,
            bookmarked: s.bookmarked !== undefined ? s.bookmarked : false,
            subgroups: (typeof s.subgroups === 'object' && s.subgroups !== null) ? s.subgroups
                       : (typeof s.subgroups === 'string' && s.subgroups ? (() => { try { return JSON.parse(s.subgroups); } catch(e) { return null; } })() : null),
            createdAt: s.createdAt || new Date().toISOString()
          }));
          
          // Merge and sort
          studies = [...localOnlyStudies, ...remoteStudies];
          studies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          
          saveStudies(); // cache local
          renderTable();
          renderUpdates();
          updateSupabaseStatus('connected', 'Supabase: Synced');

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
        const { error } = await supabaseClient
          .from('clinical_guidelines')
          .upsert({
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
            subgroups: study.subgroups ? JSON.stringify(study.subgroups) : null,
            createdAt: study.createdAt
          }, { onConflict: 'id' });
          
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
      const saved = localStorage.getItem('internalMedicineStudies');
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
              asianData: s.asianData !== undefined ? s.asianData : false,
              bookmarked: s.bookmarked !== undefined ? s.bookmarked : false,
              subgroups: (s.subgroups && typeof s.subgroups === 'object' && !Array.isArray(s.subgroups)) ? s.subgroups
                         : (typeof s.subgroups === 'string' && s.subgroups ? (() => { try { return JSON.parse(s.subgroups); } catch(e) { return null; } })() : null),
              createdAt: s.createdAt || new Date().toISOString()
            };
          });
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
      localStorage.setItem('internalMedicineStudies', JSON.stringify(studies));
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

      // Left Nav specialty filter
      const leftNavSpecList = document.getElementById('spec-filter-list');
      if (leftNavSpecList) {
        leftNavSpecList.innerHTML = `
          <button class="spec-filter-item ${filters.specialty === null ? 'active' : ''}" onclick="setFilter('specialty', null)">
            <span class="spec-filter-dot" style="background: var(--text-faint);"></span>
            Tất cả
          </button>
        `;
        Object.entries(SPECIALTIES).forEach(([key, spec]) => {
          leftNavSpecList.innerHTML += `
            <button class="spec-filter-item ${filters.specialty === key ? 'active' : ''}" onclick="setFilter('specialty', '${key}')">
              <span class="spec-filter-dot" style="background: ${spec.color};"></span>
              ${spec.name}
            </button>
          `;
        });
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
      let result = [...studies];

      // Tab constraint
      if (currentTab === 'saved') {
        result = result.filter(s => s.bookmarked);
      }

      // Source Type filter
      if (filters.sourceType) {
        result = result.filter(s => s.sourceType === filters.sourceType);
      }

      // Specialty filter
      if (filters.specialty) {
        result = result.filter(s => s.specialty === filters.specialty);
      }

      // Design filter
      if (filters.design) {
        result = result.filter(s => s.design === filters.design);
      }

      // Impact filter
      if (filters.impact) {
        result = result.filter(s => s.impact === filters.impact);
      }

      // Period filter
      if (filters.period) {
        result = result.filter(s => isWithinPeriod(s, filters.period));
      }

      // Asian data filter
      if (filters.asianData) {
        result = result.filter(s => s.asianData);
      }

      // Subgroup data filter (from sidebar quick filter)
      if (filters.hasSubgroup) {
        result = result.filter(s => s.subgroups && typeof s.subgroups === 'object' && Object.keys(s.subgroups).length > 0);
      }

      // Has summary filter
      if (filters.hasSummary) {
        result = result.filter(s => s.file && s.file.trim() !== '');
      }

      // Search filter
      if (filters.search) {
        const query = filters.search.toLowerCase().trim();
        result = result.filter(s => 
          s.title.toLowerCase().includes(query) ||
          s.drug.toLowerCase().includes(query) ||
          s.organization.toLowerCase().includes(query) ||
          (s.summary && s.summary.toLowerCase().includes(query)) ||
          (s.detailedConclusion && s.detailedConclusion.toLowerCase().includes(query)) ||
          (s.population && s.population.toLowerCase().includes(query)) ||
          (s.intervention && s.intervention.toLowerCase().includes(query)) ||
          (s.primaryEndpoint && s.primaryEndpoint.toLowerCase().includes(query)) ||
          (s.keyResults && s.keyResults.toLowerCase().includes(query))
        );
      }

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

    function handleSearch() {
      filters.search = document.getElementById('search-input').value;
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
      if (tabName === 'list') document.getElementById('sidebar-btn-studies').classList.add('active');
      if (tabName === 'saved') document.getElementById('sidebar-btn-saved').classList.add('active');

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
        renderCompareView();
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

        // Columns HTML segments
        const sourceTypeCell = columnVisibility.sourceType ? `<td><span class="badge badge-src-${study.sourceType}">${srcTypeConfig.name}</span></td>` : '';
        const specialtyCell = columnVisibility.specialty ? `<td><span class="badge badge-${study.specialty}">${spec.name}</span></td>` : '';
        const designCell = columnVisibility.design ? `<td><span class="badge-source">${designConfig.name}</span></td>` : '';
        const organizationCell = columnVisibility.organization ? `<td><div class="study-summary ${viewMode === 'compact' ? 'clamped' : ''}">${escapeHtml(study.organization || 'N/A')} (${study.year})</div></td>` : '';
        const interventionCell = columnVisibility.intervention ? `<td><div class="study-summary ${viewMode === 'compact' ? 'clamped' : ''}">${escapeHtml(study.intervention || 'N/A')}</div></td>` : '';
        const primaryEndpointCell = columnVisibility.primaryEndpoint ? `<td><div class="study-summary ${viewMode === 'compact' ? 'clamped' : ''}">${escapeHtml(study.primaryEndpoint || 'N/A')}</div></td>` : '';
        const keyResultsCell = columnVisibility.keyResults ? `<td><div class="study-summary ${viewMode === 'compact' ? 'clamped' : ''}">${escapeHtml(study.keyResults || 'N/A')}</div></td>` : '';
        
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
                  ${study.file ? `<a href="${study.file}" class="badge-summary-inline" onclick="event.stopPropagation()" title="Mở bài viết tóm tắt chi tiết">📝 Tóm tắt</a>` : ''}
                  ${sgInlineBtn}
                </div>
                <span class="study-drug">${escapeHtml(study.drug || 'N/A')} • ${escapeHtml(study.organization || 'N/A')} (${study.year})</span>
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
                      ${study.sourceUrl ? `<a href="${study.sourceUrl}" target="_blank" class="btn btn-small">📄 Bài báo gốc</a>` : ''}
                      ${study.file ? `<a href="${study.file}" class="btn btn-small btn-primary">📝 Tóm tắt</a>` : ''}
                      ${sgCount > 0 ? `<button class="btn btn-small" style="color:#0891b2;border-color:rgba(8,145,178,0.4);" onclick="event.stopPropagation();openSubgroupModal('${study.id}',event)">🧬 Subgroup (${sgCount})</button>` : ''}
                      <button class="btn btn-small" onclick="openEditModal('${study.id}', event)">✏️ Sửa</button>
                      <button class="btn btn-small" style="color: var(--color-practice-changing); border-color: rgba(220,38,38,0.3);" onclick="deleteStudy('${study.id}', event)">🗑️ Xóa</button>
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
    }

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
            </div>

            <div class="compare-row">
              <span class="detail-label">Can thiệp / Đối chứng</span>
              <p style="font-size: 0.78rem; font-weight: 600; color: var(--text);">${escapeHtml(study.intervention || 'N/A')}</p>
            </div>

            <div class="compare-row">
              <span class="detail-label">Tiêu chí đánh giá chính</span>
              <p style="font-size: 0.78rem; font-weight: 600; color: var(--text);">${escapeHtml(study.primaryEndpoint || 'N/A')}</p>
            </div>

            <div class="compare-row">
              <span class="detail-label">Kết quả / Chỉ số</span>
              <p style="font-size: 0.78rem; font-weight: 700; font-family: monospace; color: var(--accent);">${escapeHtml(study.keyResults || 'N/A')}</p>
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
              ${study.file ? `<a href="${study.file}" class="btn btn-small btn-primary" style="flex: 1; text-align: center; justify-content: center;">📝 Tóm tắt</a>` : ''}
            </div>
          </div>
        `;
      }).join('');
    }

    function removeCompare(id) {
      selectedIds.delete(id);
      updateCompareBadge();
      renderCompareView();
    }

    function clearComparison() {
      selectedIds.clear();
      updateCompareBadge();
      renderCompareView();
    }

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

      let savedStudy = null;

      if (studyId) {
        // Edit mode
        const index = studies.findIndex(s => s.id === studyId);
        if (index !== -1) {
          studies[index] = {
            ...studies[index],
            title, author, drug, sourceType, specialty, design, intervention, primaryEndpoint, keyResults,
            impact, organization, year, phase, sampleSize,
            population, summary, detailedConclusion, fdaStatus, sourceUrl, file, asianData, subgroups
          };
          savedStudy = studies[index];
          alert('✅ Đã cập nhật tài liệu thành công!');
        }
      } else {
        // Add mode
        const newStudy = {
          id: generateId(),
          title, author, drug, sourceType, specialty, design, intervention, primaryEndpoint, keyResults,
          impact, organization, year, phase, sampleSize,
          population, summary, detailedConclusion, fdaStatus, sourceUrl, file, asianData, subgroups,
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
      const sgEl = document.getElementById('study-subgroups');
      if (sgEl) sgEl.value = (study.subgroups && typeof study.subgroups === 'object') ? JSON.stringify(study.subgroups, null, 2) : '';

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
            asianData: item.asianData || false,
            bookmarked: item.bookmarked || false,
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
    // FOREST PLOT MINI
    // ════════════════════════════

    /**
     * Parse HR/OR/RR + 95% CI từ chuỗi keyResults.
     * Hỗ trợ format: HR 0.86 (95% CI 0.74-0.99) hoặc OR 0.75 [0.65, 0.86]
     * @returns { estimate, lower, upper, label } hoặc null nếu không parse được
     */
    /**
     * Parse HR/OR/RR/aHR/aOR/RD/ARR/MD/SMD/p-value + 95% CI
     * Hỗ trợ cả dạng chuỗi (ví dụ: "OR 0.75 (95% CI 0.65-0.86, p=0.002)")
     * lẫn dạng JSON Object trực tiếp (ví dụ: {"label":"OR", "estimate":0.75, "lower":0.65, "upper":0.86, "p":"0.002"})
     * @returns { label, estimate, lower, upper, pValue, isSig } hoặc null
     */
    function parseForestData(keyResults) {
      if (!keyResults) return null;

      let label = '', estimate = NaN, lower = NaN, upper = NaN, pValue = null;

      // 1. Nếu keyResults là JSON object hoặc chuỗi JSON
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
        // Tách p-value trước nếu có trong chuỗi (ví dụ: p=0.04, p < 0.001, p=0.002, p < 0.05)
        const pMatch = keyResults.match(/\bp\s*([<>=]=?)\s*([\d.]+)/i);
        if (pMatch) {
          const op = pMatch[1].replace('=', '');
          pValue = op ? `${op}${pMatch[2]}` : pMatch[2];
        }

        // List các regex pattern hỗ trợ mở rộng cho OR, RR, HR, aOR, aHR, RD, ARR...
        const patterns = [
          // 1a. "HR 0.86 (95% CI 0.74-0.99)" hoặc "HR 0.64 (95% CI 0.52-0.79, p<0.001)"
          /\b(aHR|aOR|HR|OR|RR|RD|ARR|NNT|NNH|RRR|SMD|MD|WMD|IRR|PR|ORR|CR)\s*[=:]?\s*(-?[\d.]+)\s*\([^)]{0,35}CI[^\d)]{0,6}(-?[\d.]+)\s*[-\u2013\u2014,]\s*(-?[\d.]+)[^)]*\)/i,
          // 1b. "OR 1.23 (95% CI: 1.05 to 1.44)"
          /\b(aHR|aOR|HR|OR|RR|RD|ARR|NNT|NNH|RRR|SMD|MD|WMD|IRR|PR|ORR|CR)\s*[=:]?\s*(-?[\d.]+)\s*\([^)]{0,35}CI[^\d)]{0,6}(-?[\d.]+)\s+to\s+(-?[\d.]+)[^)]*\)/i,
          // 2. "HR 0.86 (0.74-0.99)" — ngoặc tròn thuần túy
          /\b(aHR|aOR|HR|OR|RR|RD|ARR|NNT|NNH|RRR|SMD|MD|WMD|IRR|PR|ORR|CR)\s*[=:]?\s*(-?[\d.]+)\s*\(\s*(-?[\d.]+)\s*[-\u2013\u2014,]\s*(-?[\d.]+)[^)]*\)/i,
          // 3. "HR 0.62 [0.49-0.77]" hoặc "[95% CI: 1.05, 1.44]"
          /\b(aHR|aOR|HR|OR|RR|RD|ARR|NNT|NNH|RRR|SMD|MD|WMD|IRR|PR|ORR|CR)\s*[=:]?\s*(-?[\d.]+)\s*\[\s*(?:[^\]]{0,25}?CI[^\d\]]{0,6})?(-?[\d.]+)\s*[-\u2013\u2014,]\s*(-?[\d.]+)[^\]]*\]/i,
          // 4. "RR 1.51, 95% CI 1.05-2.18" hoặc "RR 0.91; 95% CI 0.84-0.99"
          /\b(aHR|aOR|HR|OR|RR|RD|ARR|NNT|NNH|RRR|SMD|MD|WMD|IRR|PR|ORR|CR)\s*[=:]?\s*(-?[\d.]+)\s*[,;]\s*(?:95%\s*)?CI\s*[=:]?\s*(-?[\d.]+)\s*[-\u2013\u2014,]\s*(-?[\d.]+)/i,
          // 5. "RR 0.91; 95% CI (0.84-0.99)"
          /\b(aHR|aOR|HR|OR|RR|RD|ARR|NNT|NNH|RRR|SMD|MD|WMD|IRR|PR|ORR|CR)\s*[=:]?\s*(-?[\d.]+)\s*[,;]\s*(?:95%\s*)?CI\s*\(?\s*(-?[\d.]+)\s*[-\u2013\u2014]\s*(-?[\d.]+)\s*\)?/i,
          // 6. "HR 0.86 95% CI 0.74-0.99" — phân cách khoảng trắng
          /\b(aHR|aOR|HR|OR|RR|RD|ARR|NNT|NNH|RRR|SMD|MD|WMD|IRR|PR|ORR|CR)\s*[=:]?\s*(-?[\d.]+)\s+(?:95%\s*)?CI\s*[=:]?\s*\[?\s*(-?[\d.]+)\s*[-\u2013\u2014]\s*(-?[\d.]+)\]?/i,
          // 7. "HR=0.86; 95% CI [0.74-0.99]" hoặc "... to ..."
          /\b(aHR|aOR|HR|OR|RR|RD|ARR|NNT|NNH|RRR|SMD|MD|WMD|IRR|PR|ORR|CR)\s*=\s*(-?[\d.]+)[\s;,]+(?:95%\s*)?CI\s*\[?\s*(-?[\d.]+)\s*(?:[-\u2013\u2014]|to)\s*(-?[\d.]+)\]?/i,
          // 8. "pooled RR = 0.91 (0.84-0.99)"
          /(?:pooled|combined)?\s*(aHR|aOR|HR|OR|RR|RD|ARR|NNT|NNH|RRR|SMD|MD|WMD|IRR|PR|ORR|CR)\s*=?\s*(-?[\d.]+)\s*\(\s*(-?[\d.]+)\s*[-\u2013\u2014]\s*(-?[\d.]+)[^)]*\)/i,
        ];

        for (const pattern of patterns) {
          const match = keyResults.match(pattern);
          if (!match) continue;
          label    = (match[1] || '').toUpperCase();
          estimate = parseFloat(match[2]);
          lower    = parseFloat(match[3]);
          upper    = parseFloat(match[4]);
          if (!isNaN(estimate) && !isNaN(lower) && !isNaN(upper)) break;
        }
      }

      if (isNaN(estimate) || isNaN(lower) || isNaN(upper)) return null;
      if (lower > estimate || estimate > upper) return null;
      if ((upper - lower) > 25) return null;

      const allowNeg = ['MD', 'SMD', 'WMD', 'RD'].includes(label);
      if (!allowNeg && lower < 0) return null;
      if (!allowNeg && estimate === 0) return null;

      let isSig = false;
      if (pValue) {
        const numP = parseFloat(pValue.replace(/[^\d.]/g, ''));
        if (!isNaN(numP)) {
          isSig = numP < 0.05 || pValue.includes('<');
        }
      }

      return { label, estimate, lower, upper, pValue, isSig };
    }

    /**
     * Render SVG Forest Plot mini (width=270px, height=46px)
     */
    function renderForestPlotSVG(forestData) {
      if (!forestData) return '';
      const { label, estimate, lower, upper, pValue, isSig } = forestData;

      const W = 270, H = 46;
      const PAD_L = 10, PAD_R = 10;
      const plotW = W - PAD_L - PAD_R;
      const cy = (H / 2) - 2;

      const maxDist = Math.max(Math.abs(upper - 1.0), Math.abs(1.0 - lower)) * 1.3 + 0.15;
      const axisMin = Math.max(0.05, 1.0 - maxDist);
      const axisMax = 1.0 + maxDist;

      function toX(val) {
        return PAD_L + ((val - axisMin) / (axisMax - axisMin)) * plotW;
      }

      const x0 = toX(1.0);
      const xE = toX(estimate);
      const xL = toX(lower);
      const xU = toX(upper);

      const isGreen = estimate < 1.0;
      const dotColor = isGreen ? '#16a34a' : estimate > 1.0 ? '#dc2626' : '#6b7280';
      const ciColor  = isGreen ? '#86efac' : estimate > 1.0 ? '#fca5a5' : '#cbd5e1';

      const pStr = pValue ? ` (p${pValue.startsWith('<') || pValue.startsWith('>') ? '' : '='}${pValue})` : '';
      const labelText = `${label} ${estimate.toFixed(2)} [${lower.toFixed(2)}–${upper.toFixed(2)}]${pStr}`;

      return `
        <svg class="forest-plot-svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"
             xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Forest plot: ${labelText}">
          <!-- Axis line -->
          <line x1="${PAD_L}" y1="${cy}" x2="${W - PAD_R}" y2="${cy}" stroke="#cbd5e1" stroke-width="1"/>
          <!-- Null line at 1.0 -->
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
          <text x="${x0}" y="${cy - 6}" text-anchor="middle" font-family="monospace" font-size="7.5" fill="#94a3b8">1.0</text>
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
            </div>

            <!-- Key Results + Forest Plot -->
            ${study.keyResults ? `
            <div class="mc-results">
              <span class="mc-results-label">Kết quả chính:</span>
              <span class="mc-results-val">${escapeHtml(study.keyResults)}</span>
              ${forestData ? `<div class="mc-forest-wrap">${renderForestPlotSVG(forestData)}</div>` : ''}
            </div>` : ''}

            <!-- Summary (always visible) -->
            <p class="mc-summary ${isExpanded ? '' : 'clamped'}">${escapeHtml(study.summary)}</p>

            <!-- Expanded Detail -->
            ${isExpanded ? `
            <div class="mc-detail">
              ${study.intervention ? `<div class="mc-detail-row"><span class="mc-detail-label">Can thiệp:</span> <span>${escapeHtml(study.intervention)}</span></div>` : ''}
              ${study.primaryEndpoint ? `<div class="mc-detail-row"><span class="mc-detail-label">Tiêu chí chính:</span> <span>${escapeHtml(study.primaryEndpoint)}</span></div>` : ''}
              ${study.population ? `<div class="mc-detail-row"><span class="mc-detail-label">Đối tượng:</span> <span>${escapeHtml(study.population)}</span></div>` : ''}
              ${study.fdaStatus ? `<div class="mc-detail-row"><span class="mc-detail-label">FDA/Khuyến cáo:</span> <span>${escapeHtml(study.fdaStatus)}</span></div>` : ''}
              ${study.detailedConclusion ? `<div class="mc-detail-row"><span class="mc-detail-label">Chi tiết:</span> <span style="font-size:0.78rem; color:var(--text-muted);">${escapeHtml(study.detailedConclusion)}</span></div>` : ''}
              <div class="mc-actions">
                ${study.sourceUrl ? `<a href="${study.sourceUrl}" target="_blank" class="btn btn-small">📄 Nguồn</a>` : ''}
                <button class="btn btn-small" onclick="openEditModal('${study.id}', event)">✏️ Sửa</button>
                <button class="btn btn-small" style="color:var(--color-practice-changing);border-color:rgba(220,38,38,0.3);" onclick="deleteStudy('${study.id}', event)">🗑️ Xóa</button>
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
      const total = studies.length;
      if (total === 0) {
        panel.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📊</div><p>Chưa có dữ liệu để thống kê. Hãy thêm tài liệu trước.</p></div>`;
        return;
      }
      const vnCount    = studies.filter(s => s.sourceType && s.sourceType.startsWith('vn-')).length;
      const rctCount   = studies.filter(s => s.design === 'rct').length;
      const bookmarked = studies.filter(s => s.bookmarked).length;
      const pcCount    = studies.filter(s => s.impact === 'practice-changing').length;
      const asianCount = studies.filter(s => s.asianData).length;

      const specCounts = {}; Object.keys(SPECIALTIES).forEach(k => { specCounts[k] = 0; });
      studies.forEach(s => { if (SPECIALTIES[s.specialty]) specCounts[s.specialty]++; });
      const impactCounts = {}; Object.keys(IMPACTS).forEach(k => { impactCounts[k] = 0; });
      studies.forEach(s => { if (IMPACTS[s.impact]) impactCounts[s.impact]++; });
      const srcCounts = {}; Object.keys(SOURCE_TYPES).forEach(k => { srcCounts[k] = 0; });
      studies.forEach(s => { if (SOURCE_TYPES[s.sourceType]) srcCounts[s.sourceType]++; });
      const yearCounts = {};
      studies.forEach(s => { if (s.year) yearCounts[s.year] = (yearCounts[s.year] || 0) + 1; });
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
        </div>
      `;
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
      const sg = study.subgroups;
      if (!sg || typeof sg !== 'object' || Object.keys(sg).length === 0) return '';
      const entries = Object.entries(sg);
      const overall = parseForestData(study.keyResults);

      const cards = entries.map(([name, result]) => {
        const fd = parseForestData(result);
        const hasAsia = /ch.u.+./i.test(name) || /asia/i.test(name);
        const asiaBadge = hasAsia ? '<span class="sg-badge sg-badge-asia">🌏 Châu Á</span>' : '';

        let verdictBadge = '';
        let cardStatusClass = '';
        if (fd) {
          if (fd.estimate < 1.0) {
            const pct = Math.round((1.0 - fd.estimate) * 100);
            verdictBadge = `<span class="sg-tag sg-tag-benefit">🟢 Lợi ích -${pct}%</span>`;
            cardStatusClass = 'card-benefit';
          } else if (fd.estimate > 1.0) {
            const pct = Math.round((fd.estimate - 1.0) * 100);
            verdictBadge = `<span class="sg-tag sg-tag-harm">🔴 Nguy cơ +${pct}%</span>`;
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
              <span class="sg-legend-item"><span class="sg-dot sg-dot-green"></span>Lợi ích (<1.0)</span>
              <span class="sg-legend-item"><span class="sg-dot sg-dot-red"></span>Nguy cơ (>1.0)</span>
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
      const W = 280, H = 38, PL = 8, PR = 8, cy = (H / 2) - 2, plotW = W - PL - PR;
      const allVals = [fd.lower, fd.estimate, fd.upper];
      if (overall) allVals.push(overall.lower, overall.estimate, overall.upper);
      const axisMin = Math.max(0.05, Math.min(...allVals) * 0.75);
      const axisMax = Math.max(...allVals) * 1.25;
      const axisRange = axisMax - axisMin || 1;
      const toX = v => PL + ((v - axisMin) / axisRange) * plotW;
      const x1 = toX(1.0), xE = toX(fd.estimate), xL = toX(fd.lower), xU = toX(fd.upper);
      const isGreen = fd.estimate < 1.0;
      const dotColor = isGreen ? '#16a34a' : fd.estimate > 1.0 ? '#dc2626' : '#6b7280';
      const ciColor  = isGreen ? '#86efac' : fd.estimate > 1.0 ? '#fca5a5' : '#cbd5e1';
      const overallLine = overall
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
      if (event) event.stopPropagation();
      const study = studies.find(s => s.id === id);
      if (!study) return;

      const titleEl = document.getElementById('subgroup-modal-title');
      const bodyEl = document.getElementById('subgroup-modal-body');
      
      if (titleEl) titleEl.innerHTML = `🧬 Phân Tích Subgroup: <span style="color:var(--accent);">${escapeHtml(study.title)}</span>`;
      if (bodyEl) bodyEl.innerHTML = renderSubgroupPanel(study);
      
      const modal = document.getElementById('subgroup-modal');
      if (modal) modal.classList.add('active');
    }

    function closeSubgroupModal() {
      const modal = document.getElementById('subgroup-modal');
      if (modal) modal.classList.remove('active');
    }

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
      initSupabase();
      loadStudies();
      
      if (supabaseClient) {
        syncStudiesWithSupabase();
      }
      
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
      document.getElementById('search-input').addEventListener('input', handleSearch);
      
      // Close popups on click outside
      document.addEventListener('click', (e) => {
        const colMenu = document.getElementById('columns-dropdown-menu');
        const colBtn = document.getElementById('columns-toggle-btn');
        if (colMenu && colMenu.classList.contains('active') && !colMenu.contains(e.target) && e.target !== colBtn) {
          colMenu.classList.remove('active');
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
      
      // Escape key to close modals
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeAddModal();
          closeImportModal();
          closeSupabaseModal();
          closeSubgroupModal();
        }
      });
    });
