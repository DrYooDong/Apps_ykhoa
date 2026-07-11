    let studies = [];
    let selectedIds = new Set();
    let expandedIds = new Set();
    
    // View state
    let viewMode = 'full'; // 'full' or 'compact'
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
      asianData: false
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

    function resetFilters() {
      filters = {
        search: '',
        sourceType: null,
        specialty: null,
        design: null,
        impact: null,
        period: null,
        asianData: false
      };
      document.getElementById('search-input').value = '';
      document.getElementById('asian-data-filter').checked = false;
      renderFilterPills();
      renderTable();
    }

    // ════════════════════════════
    // TABS MANAGEMENT
    // ════════════════════════════

    function switchTab(tabName) {
      currentTab = tabName;
      
      // Update Tab Triggers visual
      document.querySelectorAll('.tab-trigger').forEach(btn => btn.classList.remove('active'));
      const activeBtn = document.getElementById(`tab-${tabName}`);
      if (activeBtn) activeBtn.classList.add('active');

      // Update Sidebar highlights
      document.getElementById('sidebar-btn-studies').classList.remove('active');
      document.getElementById('sidebar-btn-saved').classList.remove('active');
      if (tabName === 'list') document.getElementById('sidebar-btn-studies').classList.add('active');
      if (tabName === 'saved') document.getElementById('sidebar-btn-saved').classList.add('active');

      // Switch main panel
      const panelStudies = document.getElementById('panel-studies');
      const panelCompare = document.getElementById('panel-compare');
      const pageTitle = document.getElementById('page-panel-title');

      if (tabName === 'compare') {
        panelStudies.classList.remove('active');
        panelCompare.classList.add('active');
        pageTitle.textContent = 'So Sánh Tài Liệu';
        renderCompareView();
      } else {
        panelCompare.classList.remove('active');
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

        // Columns HTML segments
        const sourceTypeCell = columnVisibility.sourceType ? `<td><span class="badge badge-src-${study.sourceType}">${srcTypeConfig.name}</span></td>` : '';
        const specialtyCell = columnVisibility.specialty ? `<td><span class="badge badge-${study.specialty}">${spec.name}</span></td>` : '';
        const designCell = columnVisibility.design ? `<td><span class="badge-source">${designConfig.name}</span></td>` : '';
        const organizationCell = columnVisibility.organization ? `<td><div class="study-summary ${viewMode === 'compact' ? 'clamped' : ''}">${escapeHtml(study.organization || 'N/A')} (${study.year})</div></td>` : '';
        const interventionCell = columnVisibility.intervention ? `<td><div class="study-summary ${viewMode === 'compact' ? 'clamped' : ''}">${escapeHtml(study.intervention || 'N/A')}</div></td>` : '';
        const primaryEndpointCell = columnVisibility.primaryEndpoint ? `<td><div class="study-summary ${viewMode === 'compact' ? 'clamped' : ''}">${escapeHtml(study.primaryEndpoint || 'N/A')}</div></td>` : '';
        const keyResultsCell = columnVisibility.keyResults ? `<td><div class="study-summary ${viewMode === 'compact' ? 'clamped' : ''}">${escapeHtml(study.keyResults || 'N/A')}</div></td>` : '';
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
          <tr class="main-row ${isExpanded ? 'expanded' : ''}" onclick="toggleExpandRow('${study.id}', event)">
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
                <a class="study-title" href="#" onclick="event.preventDefault(); toggleExpandRow('${study.id}', event)">${escapeHtml(study.title)}</a>
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
      document.getElementById('saved-count').textContent = savedCount;
      if (document.getElementById('saved-count-sidebar')) {
        document.getElementById('saved-count-sidebar').textContent = savedCount;
      }
      if (document.getElementById('total-count-sidebar')) {
        document.getElementById('total-count-sidebar').textContent = studies.length;
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

      let savedStudy = null;

      if (studyId) {
        // Edit mode
        const index = studies.findIndex(s => s.id === studyId);
        if (index !== -1) {
          studies[index] = {
            ...studies[index],
            title, author, drug, sourceType, specialty, design, intervention, primaryEndpoint, keyResults,
            impact, organization, year, phase, sampleSize,
            population, summary, detailedConclusion, fdaStatus, sourceUrl, file, asianData
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
          population, summary, detailedConclusion, fdaStatus, sourceUrl, file, asianData,
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

    document.addEventListener('DOMContentLoaded', function() {
      initSupabase();
      loadStudies();
      
      if (supabaseClient) {
        syncStudiesWithSupabase();
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
        }
      });
    });
