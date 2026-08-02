/* ============================================================
   ICD-10 LOOKUP & BHYT AUDIT – Core JavaScript Logic
   CliniPortal Module: Công cụ / Tra cứu mã ICD-10
============================================================ */

(function () {
    'use strict';

    // --- Configuration ---
    const SEARCH_DEBOUNCE_MS = 300;

    // --- State ---
    let searchTimeout = null;
    let currentFilter = 'all';
    let currentMode = 'icd'; // 'icd' | 'bhyt'
    let allResults = [];
    let caseItems = []; // {code, nameVi, role: 'primary'|'secondary'}
    let currentSearchQuery = '';
    let currentUiLang = 'vi'; // 'vi' | 'en'

    const I18N_DICT = {
        vi: {
            'i18n-hero-title': 'Tra cứu mã ICD-10 & Thẩm định BHYT',
            'i18n-hero-desc': 'Tra cứu mã bệnh, kiểm tra điều kiện xuất toán BHYT, sao chép định dạng phần mềm HIS và quản lý quy tắc chỉ định lâm sàng.',
            'i18n-btn-add-rule': 'Thêm Quy tắc BHYT Custom',
            'i18n-tab-icd': 'Tra cứu mã ICD-10',
            'i18n-tab-bhyt': 'Tra cứu Lọc Chỉ định BHYT (CLS & Thuốc)',
            'i18n-filter-all': 'Tất cả',
            'i18n-filter-primary': 'Dùng được bệnh chính',
            'i18n-filter-not-primary': 'Không dùng BC',
            'i18n-filter-gender': 'Theo giới tính',
            'i18n-chapter-browser': 'Duyệt theo phân loại',
            'i18n-search-results': 'Kết quả tìm kiếm',
            'i18n-case-title': 'Ca bệnh',
            'i18n-btn-clear': 'Xóa',
            'langToggleText': 'English UI',
            'placeholder-icd': 'Nhập tên bệnh, triệu chứng hoặc mã: đái tháo đường, tăng huyết áp, E11.9…',
            'placeholder-bhyt': 'Nhập tên Cận lâm sàng, Thuốc hoặc mã ICD: HbA1c, PET/CT, CT 64 dãy, Insulin, Stent, E11, C34…',
            'hint-icd': 'Gõ từ khóa hoặc chọn chương bên dưới để tra cứu. Nhấn <kbd style="background:var(--color-surface-offset);border:1px solid var(--color-divider);padding:0.1rem 0.3rem;border-radius:3px;font-size:11px;font-family:var(--font-body)">/</kbd> để focus ô tìm kiếm.',
            'hint-bhyt': 'Tra cứu điều kiện thanh toán BHYT theo tên xét nghiệm/thuốc hoặc mã ICD-10 tương ứng.'
        },
        en: {
            'i18n-hero-title': 'ICD-10 Search & Insurance Validation',
            'i18n-hero-desc': 'Search disease codes, check health insurance rules, copy HIS software formats, and manage clinical indication rules.',
            'i18n-btn-add-rule': 'Add Custom Rule',
            'i18n-tab-icd': 'ICD-10 Code Lookup',
            'i18n-tab-bhyt': 'Insurance Rules (Labs & Drugs)',
            'i18n-filter-all': 'All',
            'i18n-filter-primary': 'Primary Code OK',
            'i18n-filter-not-primary': 'Not Primary',
            'i18n-filter-gender': 'Gender Specific',
            'i18n-chapter-browser': 'Browse by Chapter',
            'i18n-search-results': 'Search Results',
            'i18n-case-title': 'Patient Case',
            'i18n-btn-clear': 'Clear',
            'langToggleText': 'Tiếng Việt',
            'placeholder-icd': 'Enter disease name, symptom, or code: diabetes, hypertension, E11.9...',
            'placeholder-bhyt': 'Enter lab test, drug, or ICD code: HbA1c, PET/CT, Insulin, Stent, E11, C34...',
            'hint-icd': 'Type keywords or select a chapter below to search. Press <kbd style="background:var(--color-surface-offset);border:1px solid var(--color-divider);padding:0.1rem 0.3rem;border-radius:3px;font-size:11px;font-family:var(--font-body)">/</kbd> to focus the search box.',
            'hint-bhyt': 'Search insurance payment conditions by test/drug name or corresponding ICD-10 code.'
        }
    };

    // --- ICD-10 Chapters Data ---
    const ICD_CHAPTERS = [
        { no: 'I', range: 'A00-B99', name: 'Bệnh truyền nhiễm và ký sinh trùng', prefix: 'A' },
        { no: 'II', range: 'C00-D48', name: 'U tân sinh', prefix: 'C' },
        { no: 'III', range: 'D50-D89', name: 'Bệnh máu, cơ quan tạo máu và rối loạn liên quan cơ chế miễn dịch', prefix: 'D5' },
        { no: 'IV', range: 'E00-E90', name: 'Bệnh nội tiết, dinh dưỡng và chuyển hóa', prefix: 'E' },
        { no: 'V', range: 'F00-F99', name: 'Rối loạn tâm thần và hành vi', prefix: 'F' },
        { no: 'VI', range: 'G00-G99', name: 'Bệnh hệ thần kinh', prefix: 'G' },
        { no: 'VII', range: 'H00-H59', name: 'Bệnh của mắt và cấu trúc phụ cận', prefix: 'H0' },
        { no: 'VIII', range: 'H60-H95', name: 'Bệnh của tai và xương chũm', prefix: 'H6' },
        { no: 'IX', range: 'I00-I99', name: 'Bệnh hệ tuần hoàn', prefix: 'I' },
        { no: 'X', range: 'J00-J99', name: 'Bệnh hệ hô hấp', prefix: 'J' },
        { no: 'XI', range: 'K00-K93', name: 'Bệnh hệ tiêu hóa', prefix: 'K' },
        { no: 'XII', range: 'L00-L99', name: 'Bệnh của da và mô dưới da', prefix: 'L' },
        { no: 'XIII', range: 'M00-M99', name: 'Bệnh hệ cơ xương khớp và mô liên kết', prefix: 'M' },
        { no: 'XIV', range: 'N00-N99', name: 'Bệnh hệ sinh dục, tiết niệu', prefix: 'N' },
        { no: 'XV', range: 'O00-O99', name: 'Thai kỳ, sinh đẻ và thời kỳ sau đẻ', prefix: 'O' },
        { no: 'XVI', range: 'P00-P96', name: 'Một số bệnh lý xuất phát trong thời kỳ chu sinh', prefix: 'P' },
        { no: 'XVII', range: 'Q00-Q99', name: 'Dị tật, biến dạng và bất thường NST bẩm sinh', prefix: 'Q' },
        { no: 'XVIII', range: 'R00-R99', name: 'Triệu chứng, dấu hiệu và bất thường LS/CLS', prefix: 'R' },
        { no: 'XIX', range: 'S00-T98', name: 'Tổn thương, ngộ độc và hậu quả do nguyên nhân bên ngoài', prefix: 'S' },
        { no: 'XX', range: 'V01-Y98', name: 'Nguyên nhân từ bên ngoài của bệnh tật và tử vong', prefix: 'V' },
        { no: 'XXI', range: 'Z00-Z99', name: 'Yếu tố liên quan tình trạng sức khỏe và tiếp cận dịch vụ y tế', prefix: 'Z' },
        { no: 'XXII', range: 'U00-U85', name: 'Mã phục vụ mục đích đặc biệt', prefix: 'U' }
    ];

    // --- DOM References ---
    const searchInput = document.getElementById('icdSearchInput');
    const chapterBrowser = document.getElementById('chapterBrowser');
    const searchResults = document.getElementById('searchResults');
    const resultsList = document.getElementById('resultsList');
    const resultsCount = document.getElementById('resultsCount');
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const chapterList = document.getElementById('chapterList');
    const caseListEl = document.getElementById('caseList');
    const caseEmptyEl = document.getElementById('caseEmpty');
    const btnClearCase = document.getElementById('btnClearCase');
    const btnValidate = document.getElementById('btnValidate');
    const validateResultsEl = document.getElementById('validateResults');
    const filterChipsEl = document.getElementById('filterChips');
    const searchHintEl = document.getElementById('searchHint');

    // --- Initialization ---
    document.addEventListener('DOMContentLoaded', () => {
        renderChapterTree();
        setupEventListeners();
    });

    // --- Event Listeners ---
    function setupEventListeners() {
        // Mode Tabs Switcher
        document.querySelectorAll('.mode-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentMode = tab.dataset.mode;

                if (currentMode === 'bhyt') {
                    if (filterChipsEl) filterChipsEl.style.display = 'none';
                    if (searchInput) searchInput.placeholder = I18N_DICT[currentUiLang]['placeholder-bhyt'];
                    if (searchHintEl) searchHintEl.innerHTML = I18N_DICT[currentUiLang]['hint-bhyt'];
                    performSearchBHYT(searchInput ? searchInput.value.trim() : '');
                } else {
                    if (filterChipsEl) filterChipsEl.style.display = '';
                    if (searchInput) searchInput.placeholder = I18N_DICT[currentUiLang]['placeholder-icd'];
                    if (searchHintEl) searchHintEl.innerHTML = I18N_DICT[currentUiLang]['hint-icd'];
                    const q = searchInput ? searchInput.value.trim() : '';
                    if (q) performSearch(q); else showChapterBrowser();
                }
            });
        });

        // Search input
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                const q = e.target.value.trim();
                currentSearchQuery = q;

                if (currentMode === 'bhyt') {
                    searchTimeout = setTimeout(() => performSearchBHYT(q), SEARCH_DEBOUNCE_MS);
                } else {
                    if (!q) {
                        showChapterBrowser();
                        return;
                    }
                    searchTimeout = setTimeout(() => performSearch(q), SEARCH_DEBOUNCE_MS);
                }
            });
        }

        // Keyboard shortcut
        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && document.activeElement !== searchInput) {
                e.preventDefault();
                if (searchInput) searchInput.focus();
            }
            if (e.key === 'Escape' && document.activeElement === searchInput) {
                searchInput.blur();
            }
        });

        // Filter chips
        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                currentFilter = chip.dataset.filter;
                renderResults(allResults);
            });
        });
    }

    // --- BHYT Search Engine ---
    function performSearchBHYT(query) {
        currentSearchQuery = (query || '').trim();
        const mappings = window.BHYT_MAPPINGS || [];

        let matches = mappings;
        if (currentSearchQuery) {
            const q = currentSearchQuery.toLowerCase();
            matches = mappings.filter(m => {
                return m.name.toLowerCase().includes(q) ||
                       m.category.toLowerCase().includes(q) ||
                       m.condition.toLowerCase().includes(q) ||
                       m.icdCodes.some(c => c.toLowerCase().includes(q));
            });
        }

        showSearchResults();
        const resHeader = document.querySelector('.results-header');
        if (resHeader) {
            resHeader.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M19 11H5m14 0a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2m14 0V9a2 2 0 0 0-2-2M5 11V9a2 2 0 0 1 2-2m0 0V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M7 7h10"></path></svg>
                ${currentSearchQuery ? `Chỉ định BHYT phù hợp cho "${escHtml(currentSearchQuery)}"` : 'Danh mục Chỉ định BHYT tiêu chuẩn'}
                <span class="results-count-badge" id="resultsCount">${matches.length}</span>
            `;
        }
        renderBHYTResults(matches);
    }

    function renderBHYTResults(mappings) {
        if (!resultsList) return;
        if (mappings.length === 0) {
            resultsList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🩺</div>
                    <h3>Không tìm thấy chỉ định BHYT phù hợp</h3>
                    <p>Thử tìm bằng tên kỹ thuật hoặc thuốc (VD: HbA1c, PET/CT, CT 64 dãy, Insulin, Stent, Tiêm khớp...)</p>
                </div>
            `;
            return;
        }

        resultsList.innerHTML = mappings.map((m) => {
            const badgeClass = m.category === 'CLS' ? 'bhyt-badge-cls' : (m.category === 'Thuốc' ? 'bhyt-badge-thuoc' : 'bhyt-badge-canthiep');
            const icdBadges = m.icdCodes.map(code => `
                <span class="bhyt-icd-tag">
                    <strong>${escHtml(code)}</strong>
                    <button class="btn-add-case-tiny" onclick="event.stopPropagation(); window._icd.addToCase('${escAttr(code)}', 'Mã ${escAttr(code)} (${escAttr(m.name)})', 'primary')" title="Thêm làm Bệnh chính">＋BC</button>
                    <button class="btn-add-case-tiny" onclick="event.stopPropagation(); window._icd.addToCase('${escAttr(code)}', 'Mã ${escAttr(code)} (${escAttr(m.name)})', 'secondary')" title="Thêm làm Bệnh kèm">＋BK</button>
                </span>
            `).join('');

            return `
                <div class="bhyt-card">
                    <div class="bhyt-card-header">
                        <span class="bhyt-card-title">${escHtml(m.name)}</span>
                        <span class="bhyt-badge ${badgeClass}">${escHtml(m.category)}</span>
                    </div>
                    <div class="bhyt-condition">
                        <i class="fa-solid fa-shield-halved" style="color:var(--color-primary)"></i> <strong>Điều kiện BHYT:</strong> ${escHtml(m.condition)}
                        ${m.note ? `<div style="font-size:10.5px;color:var(--color-text-muted);margin-top:3px">📌 Căn cứ: ${escHtml(m.note)}</div>` : ''}
                    </div>
                    <div style="font-size:11px;font-weight:700;color:var(--color-text-muted);margin-bottom:0.35rem">Mã ICD-10 được hưởng BHYT:</div>
                    <div class="bhyt-icd-tags">
                        ${icdBadges}
                    </div>
                </div>
            `;
        }).join('');
    }

    // --- Local Data Search Engine ---
    function performSearch(query) {
        currentSearchQuery = query.trim();
        if (!currentSearchQuery) {
            showChapterBrowser();
            return;
        }
        showLoading();

        setTimeout(() => {
            const q = currentSearchQuery.toLowerCase();
            const qNoDot = q.replace(/\./g, '');
            const dataset = window.ICD10_DATA || [];

            const matches = dataset.filter(item => {
                const codeLower = (item.code || '').toLowerCase();
                const codeNoDot = codeLower.replace(/\./g, '');
                const nameLower = (item.name || '').toLowerCase();

                return codeLower.includes(q) || codeNoDot.includes(qNoDot) || nameLower.includes(q);
            });

            allResults = matches.map(item => ({
                code: item.code,
                nameVi: item.name,
                nameEn: item.nameEn || '',
                chapterNo: item.chapter || '',
                chapterVi: '',
                group3Code: item.block || '',
                group3Vi: '',
                notPrimary: item.no_primary === 1,
                femaleOnly: item.female_only === 1,
                maleOnly: item.male_only === 1
            }));

            showSearchResults();
            const resHeader = document.querySelector('.results-header');
            if (resHeader) {
                resHeader.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z"></path></svg>
                    Kết quả tìm kiếm cho "${escHtml(currentSearchQuery)}"
                    <span class="results-count-badge" id="resultsCount">${allResults.length}</span>
                `;
            }
            renderResults(allResults);
        }, 30);
    }

    function searchByChapter(prefix, chapterNo) {
        currentSearchQuery = '';
        if (searchInput) searchInput.value = '';
        showLoading();

        setTimeout(() => {
            const pref = prefix.toLowerCase();
            const dataset = window.ICD10_DATA || [];

            const matches = dataset.filter(item => {
                const codeLower = (item.code || '').toLowerCase();
                return codeLower.startsWith(pref) || (item.block && item.block.toLowerCase().includes(pref));
            });

            allResults = matches.map(item => ({
                code: item.code,
                nameVi: item.name,
                nameEn: item.nameEn || '',
                chapterNo: item.chapter || chapterNo,
                chapterVi: '',
                group3Code: item.block || '',
                group3Vi: '',
                notPrimary: item.no_primary === 1,
                femaleOnly: item.female_only === 1,
                maleOnly: item.male_only === 1
            }));

            showSearchResults();
            const resHeader = document.querySelector('.results-header');
            if (resHeader) {
                resHeader.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M3 12h18M3 6h18M3 18h18"></path></svg>
                    Chương ${chapterNo}
                    <span class="results-count-badge">${allResults.length}</span>
                `;
            }
            renderResults(allResults);
        }, 30);
    }

    // --- Rendering ---
    function renderChapterTree() {
        if (!chapterList) return;
        chapterList.innerHTML = ICD_CHAPTERS.map(ch => `
        <li class="chapter-item" onclick="window._icd.searchByChapter('${ch.prefix}', '${ch.no}')" title="${ch.name}">
            <svg class="ch-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"></path></svg>
            <span class="chapter-no">${ch.no}</span>
            <span class="chapter-name">${ch.name}</span>
            <span class="chapter-range">${ch.range}</span>
        </li>
    `).join('');
    }

    function renderResults(docs) {
        if (!resultsList) return;
        const filtered = filterDocs(docs);
        if (resultsCount) resultsCount.textContent = filtered.length;

        if (filtered.length === 0) {
            resultsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h3>Không tìm thấy kết quả</h3>
                <p>Thử tìm kiếm bằng từ khóa khác hoặc mã ICD trực tiếp (VD: E11, I10, J18).</p>
            </div>
        `;
            return;
        }

        resultsList.innerHTML = filtered.map((doc, idx) => {
            const badges = getBadges(doc);
            const displayName = currentUiLang === 'en' && doc.nameEn ? doc.nameEn : doc.nameVi;
            return `
        <div class="icd-result-item" id="result-${idx}" onclick="window._icd.toggleDetail(${idx})">
            <div class="result-main">
                <span class="result-code">${escHtml(doc.code)}</span>
                <div class="result-info">
                    <p class="result-name-vi">${escHtml(displayName)}</p>
                    <div class="result-badges">${badges}</div>
                </div>
            </div>
            <div class="result-detail-panel">
                ${renderDetailPanel(doc, displayName)}
            </div>
        </div>
        `;
        }).join('');
    }

    function getBadges(doc) {
        let html = '';
        if (doc.notPrimary) {
            html += '<span class="code-badge badge-warn">Không BC</span>';
        } else {
            html += '<span class="code-badge badge-ok">BC ✓</span>';
        }
        if (doc.femaleOnly) {
            html += '<span class="code-badge badge-gender">♀ Nữ</span>';
        }
        if (doc.maleOnly) {
            html += '<span class="code-badge badge-gender">♂ Nam</span>';
        }
        return html;
    }

    function renderDetailPanel(doc, displayName) {
        const codeBase = (doc.code || '').split('.')[0];
        const mappings = (window.BHYT_MAPPINGS || []).filter(m => 
            m.icdCodes.includes(doc.code) || m.icdCodes.includes(codeBase)
        );

        let bhytHtml = '';
        if (mappings.length > 0) {
            bhytHtml = `
                <div style="margin-top:0.75rem;padding-top:0.75rem;border-top:1px dashed var(--color-divider)">
                    <div style="font-size:var(--text-xs);font-weight:700;color:var(--color-primary);margin-bottom:0.4rem;display:flex;align-items:center;gap:0.35rem">
                        <i class="fa-solid fa-shield-halved"></i> ${currentUiLang === 'en' ? 'Related BHYT Indications' : 'Chỉ định BHYT liên quan'} (${mappings.length})
                    </div>
                    <div style="display:flex;flex-direction:column;gap:0.4rem">
                        ${mappings.map(m => `
                            <div style="font-size:11px;background:var(--color-bg);padding:0.45rem 0.65rem;border-radius:var(--radius-sm);border:1px solid var(--color-divider)">
                                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:2px">
                                    <strong style="color:var(--color-text)">${escHtml(m.name)}</strong>
                                    <span class="bhyt-badge ${m.category === 'CLS' ? 'bhyt-badge-cls' : (m.category === 'Thuốc' ? 'bhyt-badge-thuoc' : 'bhyt-badge-canthiep')}" style="font-size:9px;padding:0.1rem 0.35rem">${escHtml(m.category)}</span>
                                </div>
                                <div style="color:var(--color-text-muted);line-height:1.4">${escHtml(m.condition)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        return `
        <div class="detail-grid">
            <div class="detail-field">
                <span class="detail-label">${currentUiLang === 'en' ? 'Chapter' : 'Chương'}</span>
                <span class="detail-value">${escHtml(doc.chapterNo || '')} — ${escHtml(doc.chapterVi || '')}</span>
            </div>
            <div class="detail-field">
                <span class="detail-label">${currentUiLang === 'en' ? 'Block' : 'Nhóm'}</span>
                <span class="detail-value">${escHtml(doc.group3Code || '')}</span>
            </div>
        </div>
        ${bhytHtml}
        <div class="detail-actions">
            <button class="btn-copy" onclick="event.stopPropagation(); window._icd.copyCode('${escAttr(doc.code)}')">
                <i class="fa-regular fa-copy"></i> ${currentUiLang === 'en' ? 'Copy Code' : 'Sao chép mã'}
            </button>
            <button class="btn-add-case" onclick="event.stopPropagation(); window._icd.addToCase('${escAttr(doc.code)}', '${escAttr(displayName)}', 'primary')">
                ＋ ${currentUiLang === 'en' ? 'Primary' : 'Bệnh chính'}
            </button>
            <button class="btn-add-case" onclick="event.stopPropagation(); window._icd.addToCase('${escAttr(doc.code)}', '${escAttr(displayName)}', 'secondary')">
                ＋ ${currentUiLang === 'en' ? 'Secondary' : 'Bệnh kèm'}
            </button>
        </div>
    `;
    }

    function filterDocs(docs) {
        if (currentFilter === 'all') return docs;
        return docs.filter(doc => {
            switch (currentFilter) {
                case 'primary-ok': return !doc.notPrimary;
                case 'not-primary': return doc.notPrimary;
                case 'gender': return doc.femaleOnly || doc.maleOnly;
                default: return true;
            }
        });
    }

    // --- UI State Management ---
    function showChapterBrowser() {
        if (chapterBrowser) chapterBrowser.style.display = '';
        if (searchResults) searchResults.style.display = 'none';
        if (loadingState) loadingState.style.display = 'none';
        if (errorState) errorState.style.display = 'none';
        allResults = [];
    }

    function showSearchResults() {
        if (chapterBrowser) chapterBrowser.style.display = 'none';
        if (searchResults) searchResults.style.display = '';
        if (loadingState) loadingState.style.display = 'none';
        if (errorState) errorState.style.display = 'none';
    }

    function showLoading() {
        if (chapterBrowser) chapterBrowser.style.display = 'none';
        if (searchResults) searchResults.style.display = 'none';
        if (loadingState) loadingState.style.display = '';
        if (errorState) errorState.style.display = 'none';
    }

    function toggleDetail(idx) {
        const el = document.getElementById('result-' + idx);
        if (!el) return;
        el.classList.toggle('expanded');
    }

    function copyCode(code) {
        navigator.clipboard.writeText(code).then(() => {
            showToast('Đã sao chép mã ' + code);
        }).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = code;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast('Đã sao chép mã ' + code);
        });
    }

    // --- Case Management ---
    function addToCase(code, nameVi, role) {
        if (role === 'primary') {
            caseItems = caseItems.filter(c => c.role !== 'primary');
        }
        if (caseItems.find(c => c.code === code && c.role === role)) {
            showToast('Mã ' + code + ' đã có trong danh sách');
            return;
        }
        caseItems.push({ code, nameVi, role });
        renderCase();
        showToast((role === 'primary' ? 'Bệnh chính: ' : 'Bệnh kèm: ') + code);
    }

    function removeFromCase(idx) {
        caseItems.splice(idx, 1);
        renderCase();
    }

    function clearCase() {
        caseItems = [];
        if (validateResultsEl) validateResultsEl.innerHTML = '';
        renderCase();
    }

    function renderCase() {
        const hisCopyActions = document.getElementById('hisCopyActions');
        if (caseItems.length === 0) {
            if (caseListEl) caseListEl.innerHTML = '';
            if (caseEmptyEl) caseEmptyEl.style.display = '';
            if (btnClearCase) btnClearCase.style.display = 'none';
            if (btnValidate) btnValidate.style.display = 'none';
            if (hisCopyActions) hisCopyActions.style.display = 'none';
            if (validateResultsEl) validateResultsEl.innerHTML = '';
            return;
        }
        if (caseEmptyEl) caseEmptyEl.style.display = 'none';
        if (btnClearCase) btnClearCase.style.display = '';
        if (btnValidate) btnValidate.style.display = caseItems.some(c => c.role === 'primary') ? '' : 'none';
        if (hisCopyActions) hisCopyActions.style.display = '';

        if (caseListEl) {
            caseListEl.innerHTML = caseItems.map((item, idx) => `
            <div class="case-item">
                <span class="case-role ${item.role === 'primary' ? 'case-role-primary' : 'case-role-secondary'}">
                    ${item.role === 'primary' ? 'BC' : 'BK'}
                </span>
                <span class="case-code">${escHtml(item.code)}</span>
                <span class="case-name">${escHtml(item.nameVi)}</span>
                <button class="case-remove" onclick="window._icd.removeFromCase(${idx})" title="Xóa">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"></path></svg>
                </button>
            </div>
        `).join('');
        }
    }

    // --- Local Offline Validation ---
    function validateCase() {
        const primary = caseItems.find(c => c.role === 'primary');
        if (!primary) return;

        const dataset = window.ICD10_DATA || [];
        const primaryItem = dataset.find(item => item.code === primary.code);

        const results = [];
        let isValid = true;

        if (primaryItem && primaryItem.no_primary === 1) {
            isValid = false;
            results.push({
                title: 'Mã bệnh chính không hợp lệ (TT 06/2026/TT-BYT)',
                message: `Mã ${primary.code} thuộc danh mục KHÔNG ĐƯỢC DÙNG LÀM BỆNH CHÍNH. Vui lòng chọn mã bệnh khác.`,
                status: 'fail'
            });
        } else {
            results.push({
                title: 'Kiểm tra Mã bệnh chính',
                message: `Mã bệnh chính ${primary.code} hợp lệ để thanh toán.`,
                status: 'pass'
            });
        }

        if (primaryItem && primaryItem.female_only === 1) {
            results.push({
                title: 'Cảnh báo Giới tính',
                message: `Mã ${primary.code} chỉ áp dụng cho Nữ giới. Vui lòng đối chiếu giới tính bệnh nhân.`,
                status: 'pass'
            });
        } else if (primaryItem && primaryItem.male_only === 1) {
            results.push({
                title: 'Cảnh báo Giới tính',
                message: `Mã ${primary.code} chỉ áp dụng cho Nam giới. Vui lòng đối chiếu giới tính bệnh nhân.`,
                status: 'pass'
            });
        }

        const secondaries = caseItems.filter(c => c.role === 'secondary');
        secondaries.forEach(sec => {
            if (sec.code === primary.code) {
                isValid = false;
                results.push({
                    title: 'Mã trùng lặp',
                    message: `Mã bệnh kèm ${sec.code} trùng hoàn toàn với Mã bệnh chính.`,
                    status: 'fail'
                });
            }
        });

        if (secondaries.length > 0 && isValid) {
            results.push({
                title: 'Kiểm tra Mã bệnh kèm theo',
                message: `Đã xác minh ${secondaries.length} mã bệnh kèm theo. Không phát hiện xung đột.`,
                status: 'pass'
            });
        }

        renderValidationResults({
            verdict: isValid ? 'valid' : 'invalid',
            results: results
        });
    }

    function renderValidationResults(data) {
        if (!validateResultsEl || !data || !data.results) return;

        const verdictColor = data.verdict === 'valid' ? 'var(--color-success)' : 'var(--color-rose)';
        const verdictIcon = data.verdict === 'valid' ? 'fa-circle-check' : 'fa-circle-xmark';
        const verdictText = data.verdict === 'valid' ? 'Hồ sơ hợp lệ' : 'Có lỗi mã hóa';

        let html = `
        <div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.5rem;font-size:var(--text-sm);font-weight:700;color:${verdictColor}">
            <i class="fa-solid ${verdictIcon}"></i> ${verdictText}
        </div>
    `;

        html += data.results.map(r => {
            let statusClass = 'rule-skip';
            let statusIcon = '—';
            if (r.status === 'pass') { statusClass = 'rule-pass'; statusIcon = '✓'; }
            else if (r.status === 'fail') { statusClass = 'rule-fail'; statusIcon = '✗'; }

            return `
            <div class="validate-rule">
                <span class="rule-status-icon ${statusClass}">${statusIcon}</span>
                <div class="rule-info">
                    <div class="rule-title">${escHtml(r.title)}</div>
                    <div class="rule-msg">${escHtml(r.message)}</div>
                </div>
            </div>
        `;
        }).join('');

        validateResultsEl.innerHTML = html;
    }

    // --- Custom Rules & LocalStorage Sync ---
    function loadCustomRules() {
        try {
            const saved = localStorage.getItem('CLINIPORTAL_CUSTOM_BHYT_RULES');
            if (saved) {
                const customRules = JSON.parse(saved);
                if (Array.isArray(customRules)) {
                    window.BHYT_MAPPINGS = [...customRules, ...(window.BHYT_MAPPINGS || [])];
                }
            }
        } catch(e) {}
    }

    function openAddRuleModal() {
        const modal = document.getElementById('addRuleModal');
        const input = document.getElementById('ruleNameInput');
        if (modal) modal.style.display = 'flex';
        if (input) input.focus();
    }

    function closeAddRuleModal() {
        const modal = document.getElementById('addRuleModal');
        if (modal) modal.style.display = 'none';
    }

    function saveCustomRule() {
        const nameEl = document.getElementById('ruleNameInput');
        const catEl = document.getElementById('ruleCategorySelect');
        const icdEl = document.getElementById('ruleIcdInput');
        const condEl = document.getElementById('ruleConditionInput');

        const name = nameEl ? nameEl.value.trim() : '';
        const category = catEl ? catEl.value : 'CLS';
        const icdRaw = icdEl ? icdEl.value.trim() : '';
        const condition = condEl ? condEl.value.trim() : '';

        if (!name || !icdRaw) {
            showToast('Vui lòng nhập tên CLS/Thuốc và mã ICD bắt buộc!');
            return;
        }

        const icdCodes = icdRaw.split(/[,;\s]+/).map(c => c.toUpperCase()).filter(c => c);
        const newRule = {
            id: 'custom-' + Date.now(),
            category: category,
            name: name,
            condition: condition || 'Quy tắc bổ sung do người dùng cấu hình.',
            icdCodes: icdCodes,
            note: 'Quy tắc Custom (localStorage)'
        };

        try {
            const saved = localStorage.getItem('CLINIPORTAL_CUSTOM_BHYT_RULES');
            let list = saved ? JSON.parse(saved) : [];
            list.unshift(newRule);
            localStorage.setItem('CLINIPORTAL_CUSTOM_BHYT_RULES', JSON.stringify(list));
        } catch(e) {}

        window.BHYT_MAPPINGS.unshift(newRule);
        closeAddRuleModal();
        showToast('Đã lưu quy tắc BHYT mới!');

        if (currentMode === 'bhyt') {
            performSearchBHYT(searchInput ? searchInput.value.trim() : '');
        }
    }

    // --- CSV Export Functions ---
    function exportICDCsv() {
        const dataset = window.ICD10_DATA || [];
        let csv = '\uFEFFSTT,Mã ICD-10,Tên bệnh (Tiếng Việt),Chương,Khối mã,Không làm bệnh chính,Chỉ Nữ,Chỉ Nam\n';
        dataset.forEach(item => {
            const name = `"${(item.name || '').replace(/"/g, '""')}"`;
            csv += `${item.stt || ''},${item.code || ''},${name},${item.chapter || ''},${item.block || ''},${item.no_primary || 0},${item.female_only || 0},${item.male_only || 0}\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'icd10_danhmuc_tt06_2026.csv';
        link.click();
        showToast('Đã xuất thành công file icd10_danhmuc_tt06_2026.csv');
    }

    function exportBHYTCsv() {
        const mappings = window.BHYT_MAPPINGS || [];
        let csv = '\uFEFFPhân loại,Tên Thuốc / Xét nghiệm / CLS,Điều kiện thanh toán BHYT,Mã ICD bắt buộc có,Căn cứ\n';
        mappings.forEach(m => {
            const name = `"${(m.name || '').replace(/"/g, '""')}"`;
            const cond = `"${(m.condition || '').replace(/"/g, '""')}"`;
            const icds = `"${(m.icdCodes || []).join(', ')}"`;
            const note = `"${(m.note || '').replace(/"/g, '""')}"`;
            csv += `${m.category || ''},${name},${cond},${icds},${note}\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'bhyt_quytac_chi_dinh.csv';
        link.click();
        showToast('Đã xuất thành công file bhyt_quytac_chi_dinh.csv');
    }

    // --- Preset Templates Engine ---
    const PRESETS = {
        'preset-1': [
            { code: 'E11.9', nameVi: 'Bệnh đái tháo đường typ 2', role: 'primary' },
            { code: 'I10', nameVi: 'Bệnh tăng huyết áp vô căn', role: 'secondary' },
            { code: 'N18.3', nameVi: 'Bệnh thận mạn giai đoạn 3', role: 'secondary' }
        ],
        'preset-2': [
            { code: 'I21.9', nameVi: 'Nhồi máu cơ tim cấp', role: 'primary' },
            { code: 'I10', nameVi: 'Bệnh tăng huyết áp vô căn', role: 'secondary' },
            { code: 'I25.1', nameVi: 'Bệnh tim do xơ vữa động mạch', role: 'secondary' }
        ],
        'preset-3': [
            { code: 'I50.9', nameVi: 'Suy tim không xác định', role: 'primary' },
            { code: 'I48', nameVi: 'Rung nhĩ và cuồng nhĩ', role: 'secondary' },
            { code: 'I10', nameVi: 'Bệnh tăng huyết áp vô căn', role: 'secondary' }
        ],
        'preset-4': [
            { code: 'J18.9', nameVi: 'Viêm phổi không xác định', role: 'primary' },
            { code: 'J44.1', nameVi: 'Bệnh phổi tắc nghẽn mạn tính có đợt cấp', role: 'secondary' }
        ],
        'preset-5': [
            { code: 'J45.9', nameVi: 'Hen phế quản không xác định', role: 'primary' },
            { code: 'J20.9', nameVi: 'Viêm phế quản cấp không xác định', role: 'secondary' }
        ],
        'preset-6': [
            { code: 'K25.4', nameVi: 'Loét dạ dày cấp có xuất huyết', role: 'primary' },
            { code: 'K70.3', nameVi: 'Xơ gan do rượu', role: 'secondary' }
        ],
        'preset-7': [
            { code: 'N20.0', nameVi: 'Sỏi thận', role: 'primary' },
            { code: 'N39.0', nameVi: 'Nhiễm trùng đường tiết niệu', role: 'secondary' }
        ]
    };

    function loadPreset(presetKey) {
        if (!presetKey || !PRESETS[presetKey]) return;
        caseItems = JSON.parse(JSON.stringify(PRESETS[presetKey]));
        renderCase();
        validateCase();
        showToast('Đã nạp Ca bệnh mẫu!');
    }

    // --- HIS Copy Actions ---
    function copyHISFormat(delimiterType) {
        if (caseItems.length === 0) return;

        const primary = caseItems.find(c => c.role === 'primary');
        const secondaries = caseItems.filter(c => c.role === 'secondary');

        let codes = [];
        if (primary) codes.push(primary.code);
        secondaries.forEach(c => codes.push(c.code));

        const sep = delimiterType === 'semicolon' ? ';' : ', ';
        const resultText = codes.join(sep);

        navigator.clipboard.writeText(resultText).then(() => {
            showToast('Đã sao chép mã HIS: ' + resultText);
        }).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = resultText;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast('Đã sao chép mã HIS: ' + resultText);
        });
    }

    function copyFullTextDiagnosis() {
        if (caseItems.length === 0) return;

        const primary = caseItems.find(c => c.role === 'primary');
        const secondaries = caseItems.filter(c => c.role === 'secondary');

        let textParts = [];
        if (primary) {
            textParts.push(`Bệnh chính: ${primary.code} - ${primary.nameVi}`);
        }
        if (secondaries.length > 0) {
            const secStr = secondaries.map(s => `${s.code} - ${s.nameVi}`).join('; ');
            textParts.push(`Bệnh kèm: ${secStr}`);
        }

        const resultText = textParts.join('\n');

        navigator.clipboard.writeText(resultText).then(() => {
            showToast('Đã sao chép chẩn đoán Tiếng Việt!');
        }).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = resultText;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast('Đã sao chép chẩn đoán Tiếng Việt!');
        });
    }

    // --- Toast Notification ---
    function showToast(msg) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
    }

    // --- Localization ---
    function toggleLanguage() {
        currentUiLang = currentUiLang === 'vi' ? 'en' : 'vi';
        
        // Update static text elements
        const dict = I18N_DICT[currentUiLang];
        for (const [id, text] of Object.entries(dict)) {
            const el = document.getElementById(id);
            if (el) {
                if (id === 'hint-icd' || id === 'hint-bhyt') continue; // Handled separately
                el.textContent = text;
            }
        }
        
        // Update placeholders and hints based on current mode
        if (currentMode === 'bhyt') {
            if (searchInput) searchInput.placeholder = dict['placeholder-bhyt'];
            if (searchHintEl) searchHintEl.innerHTML = dict['hint-bhyt'];
        } else {
            if (searchInput) searchInput.placeholder = dict['placeholder-icd'];
            if (searchHintEl) searchHintEl.innerHTML = dict['hint-icd'];
        }

        // Re-render results if any
        if (allResults && allResults.length > 0) {
            renderResults(allResults);
        }
    }

    // --- Helpers ---
    function escHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function escAttr(str) {
        if (!str) return '';
        return str.replace(/'/g, "\\'").replace(/"/g, '\\"');
    }

    // Initialize custom rules on load
    loadCustomRules();

    // --- Expose public API ---
    window._icd = {
        searchByChapter,
        toggleDetail,
        copyCode,
        addToCase,
        removeFromCase,
        clearCase: clearCase,
        validateCase: validateCase,
        exportICDCsv,
        exportBHYTCsv,
        openAddRuleModal,
        closeAddRuleModal,
        saveCustomRule,
        loadPreset,
        copyHISFormat,
        copyFullTextDiagnosis,
        toggleLanguage
    };

})();
