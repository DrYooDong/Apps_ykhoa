/**
 * Pathology Hub / Benh Ly Dashboard (CliniPortal)
 * js/benh-ly.js
 */

const SPECIALTIES = {
    'noi-khoa': { name: 'Nội khoa', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.1)' },
    'ngoai-khoa': { name: 'Ngoại khoa', color: '#16a34a', bg: 'rgba(22, 163, 74, 0.1)' },
    'truyen-nhiem': { name: 'Truyền nhiễm', color: '#d97706', bg: 'rgba(217, 119, 6, 0.1)' },
    'huyet-hoc': { name: 'Huyết học - Ung thư', color: '#dc2626', bg: 'rgba(220, 38, 38, 0.1)' },
    'tmh-rhm': { name: 'Mắt - TMH - RHM', color: '#7c3aed', bg: 'rgba(124, 58, 237, 0.1)' },
    'da-lieu': { name: 'Da liễu - Cơ xương khớp', color: '#db2777', bg: 'rgba(219, 39, 119, 0.1)' },
    'san-phu': { name: 'Sản phụ khoa', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)' },
    'nhi-khoa': { name: 'Nhi khoa', color: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.1)' },
    'cap-cuu': { name: 'Cấp cứu - Hồi sức', color: '#e11d48', bg: 'rgba(225, 29, 72, 0.1)' }
};

let diseases = [];
let currentTab = 'all'; // 'all', 'saved', 'has-flow'
let currentCategory = 'all'; // 'all', 'chan-doan', 'dieu-tri'
let currentSpecialty = 'all';
let searchQuery = '';
let engine = null;
let currentEditingDiseaseId = null;

// Supabase State
let supabaseClient = null;

document.addEventListener('DOMContentLoaded', () => {
    initSupabase();
    renderSpecialtyPills();
    initSpecialtySelect();
    loadDiseases();
    
    // Quick search shortcut '/'
    document.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            e.preventDefault();
            const searchInput = document.getElementById('search-input');
            if (searchInput) searchInput.focus();
        }
    });
});

// ════════════════════════════
// SUPABASE CONFIG & SYNC
// ════════════════════════════

function initSupabase() {
    const url = localStorage.getItem('supabaseUrl_pathology');
    const key = localStorage.getItem('supabaseKey_pathology');
    
    if (url && key && window.supabase) {
        try {
            supabaseClient = window.supabase.createClient(url, key);
            updateSupabaseStatus('connected', 'Supabase: Online');
            syncDiseasesWithSupabase();
            return true;
        } catch (err) {
            console.error('Supabase init failed:', err);
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
    const dot = document.getElementById('supabase-status-dot');
    const txt = document.getElementById('supabase-status-text');
    const syncVal = document.getElementById('cloudSyncStatus');
    
    if (dot && txt) {
        txt.textContent = text;
        if (status === 'connected') {
            dot.style.background = '#22c55e';
            if (syncVal) syncVal.textContent = 'Đã kết nối';
        } else if (status === 'error') {
            dot.style.background = '#ef4444';
            if (syncVal) syncVal.textContent = 'Lỗi kết nối';
        } else {
            dot.style.background = '#94a3b8';
            if (syncVal) syncVal.textContent = 'Local Mode';
        }
    }
}

function openSupabaseModal() {
    const url = localStorage.getItem('supabaseUrl_pathology') || '';
    const key = localStorage.getItem('supabaseKey_pathology') || '';
    document.getElementById('sb-url').value = url;
    document.getElementById('sb-key').value = key;
    document.getElementById('supabase-modal').classList.add('active');
}

function closeSupabaseModal() {
    document.getElementById('supabase-modal').classList.remove('active');
}

function saveSupabaseConfig(e) {
    e.preventDefault();
    localStorage.setItem('supabaseUrl_pathology', document.getElementById('sb-url').value.trim());
    localStorage.setItem('supabaseKey_pathology', document.getElementById('sb-key').value.trim());
    alert('💾 Đã lưu cấu hình Supabase!');
    closeSupabaseModal();
    if (initSupabase()) {
        syncDiseasesWithSupabase();
    }
}

function clearSupabaseConfig() {
    if (confirm('☁️ Xóa cấu hình Supabase? Hệ thống sẽ quay về LocalStorage.')) {
        localStorage.removeItem('supabaseUrl_pathology');
        localStorage.removeItem('supabaseKey_pathology');
        closeSupabaseModal();
        initSupabase();
    }
}

async function syncDiseasesWithSupabase() {
    if (!supabaseClient) return;
    
    updateSupabaseStatus('connected', 'Supabase: Syncing...');
    try {
        const { data, error } = await supabaseClient
            .from('clinical_pathology')
            .select('*')
            .order('createdAt', { ascending: false });
            
        if (error) throw error;
        
        if (data && data.length > 0) {
            const remoteIds = new Set(data.map(d => d.id));
            const localOnly = diseases.filter(d => !remoteIds.has(d.id));

            const remoteData = data.map(d => ({
                id: d.id,
                name: d.name,
                icd: d.icd || '',
                specialty: d.specialty || 'noi-khoa',
                category: d.category || 'ca-hai',
                description: d.description || '',
                bookmarked: d.bookmarked || false,
                flowchart: d.flowchart || null,
                createdAt: d.createdAt
            }));
            
            diseases = [...localOnly, ...remoteData];
            diseases.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            saveLocalDiseases();
            renderCards();
            updateSupabaseStatus('connected', 'Supabase: Synced');

            if (localOnly.length > 0) {
                localOnly.forEach(d => dbSaveDisease(d));
            }
        }
    } catch (err) {
        console.error('Sync error:', err);
        updateSupabaseStatus('error', 'Supabase: Sync Failed');
    }
}

async function dbSaveDisease(disease) {
    if (!supabaseClient) return;
    try {
        const { error } = await supabaseClient
            .from('clinical_pathology')
            .upsert({
                id: disease.id,
                name: disease.name,
                icd: disease.icd,
                specialty: disease.specialty,
                category: disease.category || 'ca-hai',
                description: disease.description,
                bookmarked: disease.bookmarked,
                flowchart: disease.flowchart,
                createdAt: disease.createdAt
            }, { onConflict: 'id' });
        if (error) throw error;
    } catch (err) {
        console.error('Save to SB failed:', err);
    }
}

async function dbDeleteDisease(id) {
    if (!supabaseClient) return;
    try {
        const { error } = await supabaseClient
            .from('clinical_pathology')
            .delete()
            .eq('id', id);
        if (error) throw error;
    } catch (err) {
        console.error('Delete from SB failed:', err);
    }
}

// ════════════════════════════
// LOCAL DATA MANAGEMENT
// ════════════════════════════

function loadDiseases() {
    const saved = localStorage.getItem('pathologyDiseases');
    if (saved) {
        try {
            diseases = JSON.parse(saved);
        } catch (e) {
            diseases = [];
        }
    }
    
    // Default sample data if empty
    if (diseases.length === 0) {
        diseases = [
            {
                id: 'path_dvt_poster',
                name: 'Phác Đồ Tiếp Cận DVT Chi Dưới',
                subtitle: 'Cập nhật thực hành 2026 — áp dụng cho người lớn nghi DVT',
                icd: 'I80.2',
                specialty: 'cap-cuu',
                category: 'ca-hai',
                description: 'Lưu đồ chẩn đoán, phân loại vị trí huyết khối tĩnh mạch sâu và phác đồ liều dùng chống đông (NICE/ASH/CHEST).',
                bookmarked: true,
                guidelines: ['NICE NG158 (2023)', 'ASH Diagnosis (2018)', 'CHEST 2021', 'ESC 2022'],
                urgentAlert: {
                    step: 1,
                    title: 'ĐÁNH GIÁ NGAY TÌNH TRẠNG CẦN XỬ TRÍ KHẨN',
                    items: [
                        'Khó thở, đau ngực, ngất, giảm SpO2, tụt huyết áp → nghi PE kèm theo',
                        'Chân sưng căng toàn bộ, tím tái, đau dữ dội → nghi Phlegmasia',
                        'Chảy máu đang hoạt động / nguy cơ chảy máu rất cao → cá thể hóa chống đông'
                    ],
                    actionText: 'NẾU CÓ DẤU HIỆU TRÊN: XỬ TRÍ CẤP CỨU / HỘI CHẨN NGAY'
                },
                flowchart: {
                    title: 'LƯU ĐỒ CHẨN ĐOÁN CHÍNH DVT CHI DƯỚI',
                    width: 750,
                    height: 480,
                    nodes: [
                        { id: 'fn1', type: 'start', title: 'NGHI NGỜ DVT CHI DƯỚI', subtitle: 'TÍNH WELLS DVT 2 MỨC', icon: 'fa-vial', shape: 'rectangle', toolUrl: '../../Công cụ/Tim mạch & huyết khối/Danhgia_Nguyco_VTE.html', toolTitle: 'Tính Thang Điểm Wells DVT', badge: 'BƯỚC 1', x: 260, y: 30, width: 260 },
                        { id: 'fn2', type: 'question', title: 'WELLS ≤ 1 (Ít khả năng)', subtitle: 'Thực hiện xét nghiệm D-dimer', icon: 'fa-stethoscope', shape: 'diamond', x: 80, y: 160, width: 220, targetCardId: 'dose-table-card-section' },
                        { id: 'fn3', type: 'question', title: 'WELLS ≥ 2 (Có khả năng)', subtitle: 'Siêu âm ép tĩnh mạch trong 4h', icon: 'fa-vial', shape: 'diamond', x: 440, y: 160, width: 220, targetCardId: 'dose-table-card-section' },
                        { id: 'fn4', type: 'success', title: 'LOẠI TRỪ DVT', subtitle: 'D-dimer âm tính', icon: 'fa-shield-halved', shape: 'pill', badge: 'ỔN ĐỊNH', x: 80, y: 320, width: 200 },
                        { id: 'fn5', type: 'danger', title: 'XÁC ĐỊNH DVT', subtitle: 'Siêu âm dương tính / D-dimer (+)', icon: 'fa-truck-medical', shape: 'octagon', badge: 'KHẨN', x: 440, y: 320, width: 220, targetCardId: 'comparison-card-section' }
                    ],
                    edges: [
                        { id: 'fe1', source: 'fn1', target: 'fn2', label: 'Wells ≤ 1', type: 'normal' },
                        { id: 'fe2', source: 'fn1', target: 'fn3', label: 'Wells ≥ 2', type: 'danger' },
                        { id: 'fe3', source: 'fn2', target: 'fn4', label: 'D-dimer (-)', type: 'success' },
                        { id: 'fe4', source: 'fn3', target: 'fn5', label: 'Siêu âm (+)', type: 'danger' }
                    ]
                },
                comparisonSection: {
                    step: 3,
                    title: 'ĐÃ XÁC ĐỊNH DVT → PHÂN LOẠI VỊ TRÍ HUYẾT KHỐI',
                    columns: [
                        {
                            title: 'DVT ĐOẠN GẦN (khoeo trở lên)',
                            theme: 'navy',
                            icon: 'fa-bone',
                            bullets: [
                                'Chống đông ít nhất 3 tháng',
                                'Ưu tiên điều trị ngoại trú nếu bệnh nhân ổn định',
                                'Đánh giá nguy cơ chảy máu, chức năng thận, tương tác thuốc'
                            ]
                        },
                        {
                            title: 'DVT ĐOẠN XA ĐƠN ĐỘC',
                            theme: 'teal',
                            icon: 'fa-shoe-prints',
                            subColumns: [
                                { subtitle: 'A. "Chống đông" khi:', bullets: ['Triệu chứng nặng', "Huyết khối gần khoeo / lan rộng", 'Ung thư hoạt động', 'Tiền sử VTE'] },
                                { subtitle: 'B. "Theo dõi siêu âm 2 tuần" khi:', bullets: ['Triệu chứng nhẹ', 'Nguy cơ lan rộng thấp', 'Có thể tái khám đầy đủ'] }
                            ]
                        }
                    ]
                },
                dosingSection: {
                    step: 4,
                    title: '4. LỰA CHỌN CHỐNG ĐÔNG & LIỀU DÙNG',
                    drugs: [
                        { name: 'Apixaban (DOAC)', dose: '10 mg x 2 lần/ngày x 7 ngày → 5 mg x 2 lần/ngày' },
                        { name: 'Rivaroxaban (DOAC)', dose: '15 mg x 2 lần/ngày x 21 ngày → 20 mg/ngày cùng thức ăn' },
                        { name: 'Dabigatran / Edoxaban', dose: 'Dùng sau 5–10 ngày chống đông đường tiêm' },
                        { name: 'Warfarin + LMWH/UFH', dose: 'Chỉ định khi có chống chỉ định DOAC' }
                    ],
                    specialNotices: [
                        'Thai kỳ: Dùng phác đồ riêng, thường ưu tiên LMWH',
                        'APS nguy cơ cao hoặc suy thận rất nặng: Cân nhắc Heparin / VKA theo chuyên khoa'
                    ]
                },
                processRibbon: [
                    { icon: 'fa-user-doctor', label: '1. Xác suất LS', targetId: 'urgent-alert-card' },
                    { icon: 'fa-vial', label: '2. D-dimer / SA', targetId: 'poster-draw-canvas-container' },
                    { icon: 'fa-map-pin', label: '3. Vị trí DVT', targetId: 'comparison-card-section' },
                    { icon: 'fa-shield-halved', label: '4. Nguy cơ chảy máu', targetId: 'dose-table-card-section' },
                    { icon: 'fa-pills', label: '5. Chọn thuốc', targetId: 'dose-table-card-section' },
                    { icon: 'fa-calendar-check', label: '6. Thời gian ĐT', targetId: 'dose-table-card-section' }
                ],
                takeaway: {
                    title: 'THÔNG ĐỆP THỰC HÀNH',
                    content: 'Không chẩn đoán DVT chỉ vì D-dimer tăng. Không chống đông mọi DVT đoạn xa một cách máy móc. Đánh giá kỹ nguy cơ chảy máu trước khi kê đơn.'
                },
                createdAt: new Date().toISOString()
            },
            {
                id: 'path_soc_phan_ve',
                name: 'Sốc Phản Vệ (Anaphylaxis)',
                icd: 'T78.2',
                specialty: 'cap-cuu',
                category: 'ca-hai',
                description: 'Phản ứng dị ứng cấp tính nghiêm trọng đe dọa tính mạng với sự tham gia của nhiều cơ quan.',
                bookmarked: true,
                flowchart: {
                    nodes: [
                        { id: 'n1', type: 'start', title: 'Chẩn đoán Sốc Phản Vệ', subtitle: 'Biểu hiện hô hấp/tuần hoàn cấp tính', x: 250, y: 50 },
                        { id: 'n2', type: 'danger', title: 'Adrenaline (Epinephrine)', subtitle: 'Tiêm bắp ngay lập tức 0.5mg (1:1000)', badge: 'Cấp cứu 1', x: 250, y: 180 },
                        { id: 'n3', type: 'action', title: 'Tư thế nằm ngửa + Thở Oxy', subtitle: 'Nâng cao chân, Oxy liều cao 10-15L/p', x: 250, y: 300 }
                    ],
                    edges: [
                        { id: 'e1', source: 'n1', target: 'n2', label: 'Cấp cứu', type: 'danger' },
                        { id: 'e2', source: 'n2', target: 'n3', label: 'Xử trí tiếp', type: 'normal' }
                    ]
                },
                createdAt: new Date().toISOString()
            }
        ];
        saveLocalDiseases();
    }

    renderCards();
}

function saveLocalDiseases() {
    localStorage.setItem('pathologyDiseases', JSON.stringify(diseases));
}

function generateId() {
    return 'pathology_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ════════════════════════════
// UI & RENDERING
// ════════════════════════════

function renderSpecialtyPills() {
    const container = document.getElementById('specialty-pills-container');
    if (!container) return;

    let html = `
        <button class="spec-pill-btn ${currentSpecialty === 'all' ? 'active' : ''}" onclick="filterSpecialty('all')">
            <span class="spec-pill-dot" style="background: var(--color-primary);"></span> Tất cả chuyên khoa
        </button>
    `;

    Object.entries(SPECIALTIES).forEach(([key, spec]) => {
        html += `
            <button class="spec-pill-btn ${currentSpecialty === key ? 'active' : ''}" onclick="filterSpecialty('${key}')">
                <span class="spec-pill-dot" style="background: ${spec.color};"></span> ${spec.name}
            </button>
        `;
    });

    container.innerHTML = html;
}

function initSpecialtySelect() {
    const select = document.getElementById('disease-specialty');
    if (!select) return;
    select.innerHTML = '<option value="">-- Chọn chuyên khoa --</option>';
    Object.entries(SPECIALTIES).forEach(([key, spec]) => {
        select.innerHTML += `<option value="${key}">${spec.name}</option>`;
    });
}

function filterSpecialty(key) {
    currentSpecialty = key;
    renderSpecialtyPills();
    renderCards();
}

function filterCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.path-cat-btn').forEach(btn => btn.classList.remove('active'));
    const targetBtn = document.getElementById(`cat-btn-${cat}`);
    if (targetBtn) targetBtn.classList.add('active');
    renderCards();
}

function switchMainTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.path-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`tab-btn-${tab}`).classList.add('active');
    renderCards();
}

let searchDebounceTimer = null;
function handleSearch() {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
        const inputEl = document.getElementById('search-input');
        if (inputEl) {
            searchQuery = inputEl.value.toLowerCase().trim();
            renderCards();
        }
    }, 180);
}

function toggleBookmark(id, e) {
    e.stopPropagation();
    const disease = diseases.find(d => d.id === id);
    if (disease) {
        disease.bookmarked = !disease.bookmarked;
        saveLocalDiseases();
        dbSaveDisease(disease);
        renderCards();
    }
}

function deleteDisease(id, e) {
    e.stopPropagation();
    if (confirm('🗑️ Bạn có chắc chắn muốn xóa bệnh lý này cùng toàn bộ lưu đồ?')) {
        diseases = diseases.filter(d => d.id !== id);
        saveLocalDiseases();
        dbDeleteDisease(id);
        renderCards();
    }
}

function renderCards() {
    let filtered = [...diseases];

    // Filter by Tab
    if (currentTab === 'saved') {
        filtered = filtered.filter(d => d.bookmarked);
    } else if (currentTab === 'has-flow') {
        filtered = filtered.filter(d => d.flowchart && d.flowchart.nodes && d.flowchart.nodes.length > 0);
    }

    // Filter by Category (Chẩn đoán / Điều trị)
    if (currentCategory !== 'all') {
        filtered = filtered.filter(d => {
            const cat = d.category || 'ca-hai';
            return cat === currentCategory || cat === 'ca-hai';
        });
    }

    // Filter by Specialty
    if (currentSpecialty !== 'all') {
        filtered = filtered.filter(d => d.specialty === currentSpecialty);
    }

    // Filter by Search Query
    if (searchQuery) {
        filtered = filtered.filter(d =>
            d.name.toLowerCase().includes(searchQuery) ||
            (d.icd && d.icd.toLowerCase().includes(searchQuery)) ||
            (d.description && d.description.toLowerCase().includes(searchQuery))
        );
    }

    // Update Stats Strip & Badges
    document.getElementById('totalDiseasesCount').textContent = diseases.length;
    document.getElementById('flowchartsCount').textContent = diseases.filter(d => d.flowchart && d.flowchart.nodes && d.flowchart.nodes.length > 0).length;
    document.getElementById('savedDiseasesCount').textContent = diseases.filter(d => d.bookmarked).length;
    document.getElementById('display-count').textContent = filtered.length;

    const container = document.getElementById('disease-cards');
    const emptyState = document.getElementById('empty-state');

    if (filtered.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    let html = '';

    filtered.forEach(d => {
        const spec = SPECIALTIES[d.specialty] || SPECIALTIES['noi-khoa'];
        const nodeCount = (d.flowchart && d.flowchart.nodes) ? d.flowchart.nodes.length : 0;
        
        const catVal = d.category || 'ca-hai';
        let catBadgeHtml = '';
        if (catVal === 'chan-doan') {
            catBadgeHtml = `<span class="cat-tag chan-doan"><i class="fa-solid fa-stethoscope"></i> Chẩn đoán</span>`;
        } else if (catVal === 'dieu-tri') {
            catBadgeHtml = `<span class="cat-tag dieu-tri"><i class="fa-solid fa-pills"></i> Điều trị</span>`;
        } else {
            catBadgeHtml = `<span class="cat-tag ca-hai"><i class="fa-solid fa-notes-medical"></i> Chẩn đoán & Điều trị</span>`;
        }

        const flowPillHtml = nodeCount > 0 
            ? `<span class="flow-step-pill has-flow"><i class="fa-solid fa-bolt"></i> ${nodeCount} bước lưu đồ</span>`
            : `<span class="flow-step-pill no-flow"><i class="fa-solid fa-pen-to-square"></i> Chưa tạo sơ đồ</span>`;

        html += `
            <div class="path-card" onclick="openStudio('${d.id}')">
                <div class="path-card-top">
                    <div class="path-card-tags">
                        ${d.icd ? `<span class="icd-tag">${d.icd}</span>` : ''}
                        <span class="spec-tag" style="color:${spec.color}; background:${spec.bg};">${spec.name}</span>
                        ${catBadgeHtml}
                    </div>
                    <button class="star-bookmark-btn ${d.bookmarked ? 'active' : ''}" onclick="toggleBookmark('${d.id}', event)" title="Lưu trữ">
                        <i class="fa-solid fa-star"></i>
                    </button>
                </div>

                <h3 class="path-card-title">${d.name}</h3>
                <div class="path-card-desc">${d.description || 'Chưa có mô tả chi tiết cho bệnh lý này.'}</div>

                <div class="path-card-flow-info">
                    ${flowPillHtml}
                </div>

                <div class="path-card-footer">
                    <button class="btn-open-studio" onclick="event.stopPropagation(); openStudio('${d.id}')">
                        <i class="fa-solid fa-diagram-project"></i> Studio
                    </button>
                    <button class="btn-open-studio secondary-poster-btn" onclick="event.stopPropagation(); openPosterOverlay('${d.id}')" style="background: rgba(2, 132, 199, 0.1); color: var(--color-primary); border: 1px solid var(--color-primary);">
                        <i class="fa-solid fa-eye"></i> Xem Poster
                    </button>
                    <div class="path-card-mgmt-btns">
                        <button class="icon-mgmt-btn" onclick="event.stopPropagation(); openDiseaseModal('${d.id}')" title="Sửa thông tin">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                        <button class="icon-mgmt-btn danger" onclick="deleteDisease('${d.id}', event)" title="Xóa">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ════════════════════════════
// DISEASE META MODAL
// ════════════════════════════

function openDiseaseModal(id = null) {
    const modal = document.getElementById('disease-meta-modal');
    const form = document.getElementById('disease-form');

    if (id) {
        const d = diseases.find(x => x.id === id);
        if (d) {
            document.getElementById('disease-modal-title').innerHTML = '✏️ Sửa Thông tin Bệnh Lý';
            document.getElementById('disease-id').value = d.id;
            document.getElementById('disease-name').value = d.name;
            document.getElementById('disease-icd').value = d.icd || '';
            document.getElementById('disease-specialty').value = d.specialty || 'noi-khoa';
            const catSel = document.getElementById('disease-category');
            if (catSel) catSel.value = d.category || 'ca-hai';
            document.getElementById('disease-desc').value = d.description || '';
        }
    } else {
        document.getElementById('disease-modal-title').innerHTML = '➕ Thêm Bệnh Lý Mới';
        form.reset();
        document.getElementById('disease-id').value = '';
        const catSel = document.getElementById('disease-category');
        if (catSel) catSel.value = 'ca-hai';
    }

    modal.classList.add('active');
}

function closeDiseaseModal() {
    document.getElementById('disease-meta-modal').classList.remove('active');
}

function handleDiseaseSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('disease-id').value || generateId();
    const isNew = !document.getElementById('disease-id').value;

    const diseaseData = {
        id: id,
        name: document.getElementById('disease-name').value,
        icd: document.getElementById('disease-icd').value,
        specialty: document.getElementById('disease-specialty').value,
        category: document.getElementById('disease-category') ? document.getElementById('disease-category').value : 'ca-hai',
        description: document.getElementById('disease-desc').value,
        createdAt: isNew ? new Date().toISOString() : diseases.find(x => x.id === id).createdAt
    };

    if (isNew) {
        diseaseData.bookmarked = false;
        diseaseData.flowchart = null;
        diseases.unshift(diseaseData);
    } else {
        const index = diseases.findIndex(x => x.id === id);
        if (index > -1) {
            diseaseData.bookmarked = diseases[index].bookmarked;
            diseaseData.flowchart = diseases[index].flowchart;
            diseases[index] = diseaseData;
        }
    }

    saveLocalDiseases();
    dbSaveDisease(diseaseData);
    closeDiseaseModal();
    renderCards();

    if (isNew) {
        openStudio(id); // Open Studio overlay immediately
    }
}

// ════════════════════════════
// FULLSCREEN STUDIO OVERLAY
// ════════════════════════════

function openStudio(id) {
    const disease = diseases.find(d => d.id === id);
    if (!disease) return;

    currentEditingDiseaseId = id;

    const overlay = document.getElementById('studioOverlay');
    overlay.classList.add('active');

    document.getElementById('studio-disease-title').textContent = disease.name;
    document.getElementById('studio-disease-icd').textContent = disease.icd ? disease.icd : 'ICD-10';
    
    const spec = SPECIALTIES[disease.specialty] || SPECIALTIES['noi-khoa'];
    const specBadge = document.getElementById('studio-disease-spec');
    specBadge.textContent = spec.name;

    initDrawEngine(disease.flowchart);
}

function closeStudio() {
    const overlay = document.getElementById('studioOverlay');
    overlay.classList.remove('active');
    renderCards(); // Refresh counts
}

function initDrawEngine(flowchartData) {
    if (!engine) {
        engine = new MedicalDrawEngine({
            container: '#drawEngineViewport',
            width: 2400,
            height: 1800,
            onNodeSelect: showNodeInspector,
            onEdgeSelect: showEdgeInspector,
            onChange: updateEdgeOptions
        });

        setupStudioEvents();
    }

    if (flowchartData) {
        engine.loadDiagram(flowchartData);
    } else {
        engine.loadDiagram({
            nodes: [
                { id: `node-${Date.now()}`, type: 'start', title: 'Tiếp cận ban đầu', subtitle: 'Khởi đầu lưu đồ chẩn đoán', x: 300, y: 100, width: 240 }
            ],
            edges: []
        });
    }

    hideInspectors();
}

function saveCurrentDisease() {
    if (!engine || !currentEditingDiseaseId) return;

    const disease = diseases.find(d => d.id === currentEditingDiseaseId);
    if (disease) {
        disease.flowchart = engine.exportJSON();
        saveLocalDiseases();
        dbSaveDisease(disease);
        alert('💾 Đã lưu lưu đồ thành công!');
    }
}

// ════════════════════════════
// STUDIO TOOLBAR & INSPECTOR EVENTS
// ════════════════════════════

function setupStudioEvents() {
    // Zoom Controls
    document.getElementById('btnZoomIn').addEventListener('click', () => engine.zoomIn());
    document.getElementById('btnZoomOut').addEventListener('click', () => engine.zoomOut());
    document.getElementById('btnZoomReset').addEventListener('click', () => engine.resetView());

    // Undo / Redo & Copy / Paste Controls
    const btnUndo = document.getElementById('btnUndo');
    const btnRedo = document.getElementById('btnRedo');
    const btnCopy = document.getElementById('btnCopy');
    const btnPaste = document.getElementById('btnPaste');

    if (btnUndo) btnUndo.addEventListener('click', () => engine.undo());
    if (btnRedo) btnRedo.addEventListener('click', () => engine.redo());
    if (btnCopy) btnCopy.addEventListener('click', () => {
        if (!engine.copy()) {
            alert('Vui lòng chọn một Node để sao chép!');
        }
    });
    if (btnPaste) btnPaste.addEventListener('click', () => {
        if (!engine.paste()) {
            alert('Bộ nhớ tạm rỗng! Vui lòng Copy 1 Node trước.');
        }
    });

    // Export Controls
    document.getElementById('btnExportSVG').addEventListener('click', () => engine.exportSVG());
    document.getElementById('btnExportPNG').addEventListener('click', () => engine.exportPNG());
    document.getElementById('btnExportJSON').addEventListener('click', () => {
        const data = JSON.stringify(engine.exportJSON(), null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `LuuDo_${currentEditingDiseaseId}.json`;
        a.click();
    });

    // Palette Add Node
    document.querySelectorAll('.med-palette-item').forEach(item => {
        item.addEventListener('click', () => {
            const type = item.dataset.type;
            engine.addNode({
                type,
                title: `Node ${type.toUpperCase()}`,
                subtitle: 'Nhấp để sửa thông tin',
                x: 300 + Math.random() * 40,
                y: 150 + Math.random() * 40
            });
        });
    });

    document.getElementById('btnAddNode').addEventListener('click', () => {
        engine.addNode({ type: 'action', title: 'Xử trí mới', x: 350, y: 200 });
    });

    document.getElementById('btnAddEdge').addEventListener('click', () => {
        if (engine.nodes.length < 2) {
            alert('Cần ít nhất 2 node để nối mũi tên!');
            return;
        }
        engine.addEdge({
            source: engine.nodes[0].id,
            target: engine.nodes[1].id,
            label: 'Nhãn mũi tên',
            type: 'normal'
        });
    });

    document.getElementById('btnDeleteSelected').addEventListener('click', () => {
        if (engine.selectedNodeId) {
            engine.deleteNode(engine.selectedNodeId);
            hideInspectors();
        } else if (engine.selectedEdgeId) {
            engine.deleteEdge(engine.selectedEdgeId);
            hideInspectors();
        } else {
            alert('Vui lòng chọn Node hoặc Mũi tên cần xóa!');
        }
    });

    // Real-time Node Form Binding
    document.getElementById('propNodeType').addEventListener('change', (e) => {
        if (engine.selectedNodeId) engine.updateNode(engine.selectedNodeId, { type: e.target.value });
    });
    document.getElementById('propNodeShape').addEventListener('change', (e) => {
        if (engine.selectedNodeId) engine.updateNode(engine.selectedNodeId, { shape: e.target.value });
    });
    document.getElementById('propNodeIcon').addEventListener('change', (e) => {
        if (engine.selectedNodeId) engine.updateNode(engine.selectedNodeId, { icon: e.target.value });
    });
    document.getElementById('propNodeToolUrl').addEventListener('change', (e) => {
        if (engine.selectedNodeId) {
            const sel = e.target;
            const toolTitle = sel.options[sel.selectedIndex].text;
            engine.updateNode(engine.selectedNodeId, { toolUrl: sel.value, toolTitle: sel.value ? toolTitle : '' });
        }
    });
    document.getElementById('propNodeTitle').addEventListener('input', (e) => {
        if (engine.selectedNodeId) engine.updateNode(engine.selectedNodeId, { title: e.target.value });
    });
    document.getElementById('propNodeSubtitle').addEventListener('input', (e) => {
        if (engine.selectedNodeId) engine.updateNode(engine.selectedNodeId, { subtitle: e.target.value });
    });
    document.getElementById('propNodeBadge').addEventListener('input', (e) => {
        if (engine.selectedNodeId) engine.updateNode(engine.selectedNodeId, { badge: e.target.value });
    });
    document.getElementById('propNodeWidth').addEventListener('input', (e) => {
        if (engine.selectedNodeId) {
            const w = parseInt(e.target.value) || 240;
            engine.updateNode(engine.selectedNodeId, { width: w });
        }
    });
    document.getElementById('propNodeDetails').addEventListener('input', (e) => {
        if (engine.selectedNodeId) engine.updateNode(engine.selectedNodeId, { details: e.target.value });
    });

    // Auto-layout, AI Generator & Embed Code Toolbar Events
    const btnAutoLayout = document.getElementById('studioBtnAutoLayout');
    if (btnAutoLayout) {
        btnAutoLayout.addEventListener('click', () => engine.autoLayout());
    }

    const btnAiGenerate = document.getElementById('studioBtnAiGenerate');
    if (btnAiGenerate) {
        btnAiGenerate.addEventListener('click', () => {
            document.getElementById('ai-gen-text').value = '';
            document.getElementById('ai-gen-modal').classList.add('active');
        });
    }

    const btnEmbedCode = document.getElementById('studioBtnEmbedCode');
    if (btnEmbedCode) {
        btnEmbedCode.addEventListener('click', () => {
            const embedSnippet = `<iframe src="${window.location.origin}/pages/clinical-flow-studio.html" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`;
            document.getElementById('embed-code-text').value = embedSnippet;
            document.getElementById('embed-modal').classList.add('active');
        });
    }

    // Real-time Edge Form Binding
    document.getElementById('propEdgeLabel').addEventListener('input', (e) => {
        if (engine.selectedEdgeId) {
            const idx = engine.edges.findIndex(eg => eg.id === engine.selectedEdgeId);
            if (idx !== -1) {
                engine.edges[idx].label = e.target.value;
                engine.render();
            }
        }
    });
    document.getElementById('propEdgeType').addEventListener('change', (e) => {
        if (engine.selectedEdgeId) {
            const idx = engine.edges.findIndex(eg => eg.id === engine.selectedEdgeId);
            if (idx !== -1) {
                engine.edges[idx].type = e.target.value;
                engine.render();
            }
        }
    });
    document.getElementById('propEdgeStyle').addEventListener('change', (e) => {
        if (engine.selectedEdgeId) {
            const idx = engine.edges.findIndex(eg => eg.id === engine.selectedEdgeId);
            if (idx !== -1) {
                engine.edges[idx].style = e.target.value;
                engine.render();
            }
        }
    });
    document.getElementById('propEdgeSource').addEventListener('change', (e) => {
        if (engine.selectedEdgeId) {
            const idx = engine.edges.findIndex(eg => eg.id === engine.selectedEdgeId);
            if (idx !== -1) {
                engine.edges[idx].source = e.target.value;
                engine.render();
            }
        }
    });
    document.getElementById('propEdgeTarget').addEventListener('change', (e) => {
        if (engine.selectedEdgeId) {
            const idx = engine.edges.findIndex(eg => eg.id === engine.selectedEdgeId);
            if (idx !== -1) {
                engine.edges[idx].target = e.target.value;
                engine.render();
            }
        }
    });
}

function hideInspectors() {
    document.getElementById('noSelectionMessage').style.display = 'block';
    document.getElementById('nodeInspectorForm').style.display = 'none';
    document.getElementById('edgeInspectorForm').style.display = 'none';
}

function showNodeInspector(node) {
    document.getElementById('noSelectionMessage').style.display = 'none';
    document.getElementById('edgeInspectorForm').style.display = 'none';
    const form = document.getElementById('nodeInspectorForm');
    form.style.display = 'flex';

    document.getElementById('propNodeType').value = node.type || 'action';
    document.getElementById('propNodeShape').value = node.shape || 'rectangle';
    document.getElementById('propNodeIcon').value = node.icon || '';
    document.getElementById('propNodeToolUrl').value = node.toolUrl || '';
    document.getElementById('propNodeTitle').value = node.title || '';
    document.getElementById('propNodeSubtitle').value = node.subtitle || '';
    document.getElementById('propNodeBadge').value = node.badge || '';
    document.getElementById('propNodeWidth').value = node.width || 240;
    document.getElementById('propNodeDetails').value = node.details || '';
}

function showEdgeInspector(edge) {
    document.getElementById('noSelectionMessage').style.display = 'none';
    document.getElementById('nodeInspectorForm').style.display = 'none';
    const form = document.getElementById('edgeInspectorForm');
    form.style.display = 'flex';

    updateEdgeOptions();
    document.getElementById('propEdgeLabel').value = edge.label || '';
    document.getElementById('propEdgeSource').value = edge.source;
    document.getElementById('propEdgeTarget').value = edge.target;
    document.getElementById('propEdgeType').value = edge.type || 'normal';
    document.getElementById('propEdgeStyle').value = edge.style || 'orthogonal';
}

function updateEdgeOptions() {
    if (!engine) return;
    const srcSel = document.getElementById('propEdgeSource');
    const tgtSel = document.getElementById('propEdgeTarget');
    if (!srcSel || !tgtSel) return;

    const currentSrc = srcSel.value;
    const currentTgt = tgtSel.value;

    srcSel.innerHTML = '';
    tgtSel.innerHTML = '';

    engine.nodes.forEach(n => {
        srcSel.innerHTML += `<option value="${n.id}">${n.title}</option>`;
        tgtSel.innerHTML += `<option value="${n.id}">${n.title}</option>`;
    });

    if (currentSrc) srcSel.value = currentSrc;
    if (currentTgt) tgtSel.value = currentTgt;
}

// ════════════════════════════
// IMPORT MODAL
// ════════════════════════════

function openImportModal() {
    document.getElementById('json-import-text').value = '';
    document.getElementById('import-modal').classList.add('active');
}

function closeImportModal() {
    document.getElementById('import-modal').classList.remove('active');
}

function importDiseaseJSON() {
    try {
        const text = document.getElementById('json-import-text').value;
        const parsed = JSON.parse(text);

        let toImport = Array.isArray(parsed) ? parsed : [parsed];

        toImport.forEach(d => {
            if (!d.id) d.id = generateId();
            if (!d.createdAt) d.createdAt = new Date().toISOString();

            const existingIndex = diseases.findIndex(x => x.id === d.id);
            if (existingIndex > -1) {
                diseases[existingIndex] = d;
            } else {
                diseases.unshift(d);
            }
            dbSaveDisease(d);
        });

        saveLocalDiseases();
        renderCards();
        closeImportModal();
        alert(`📥 Đã nhập thành công ${toImport.length} bệnh lý!`);
    } catch (e) {
        alert('❌ Lỗi: Cú pháp JSON không hợp lệ.');
    }
}

// ════════════════════════════
// CLINICAL INFOGRAPHIC POSTER OVERLAY
// ════════════════════════════

let currentPosterDiseaseId = null;

function openPosterOverlay(id) {
    const disease = diseases.find(d => d.id === id);
    if (!disease) return;

    currentPosterDiseaseId = id;
    document.getElementById('poster-disease-title').textContent = disease.name;

    const container = document.getElementById('posterRenderContainer');
    if (container && window.ClinicalInfographicRenderer) {
        new ClinicalInfographicRenderer(container, disease);
    }

    document.getElementById('posterOverlay').classList.add('active');
}

function closePosterOverlay() {
    document.getElementById('posterOverlay').classList.remove('active');
    currentPosterDiseaseId = null;
}

function switchToStudioFromPoster() {
    const id = currentPosterDiseaseId;
    closePosterOverlay();
    if (id) {
        openStudio(id);
    }
}

// ════════════════════════════
// AI GENERATOR & EMBED CODE MODALS
// ════════════════════════════

function closeAiModal() {
    const modal = document.getElementById('ai-gen-modal');
    if (modal) modal.classList.remove('active');
}

function generateAiDiagram() {
    const raw = document.getElementById('ai-gen-text').value.trim();
    if (!raw || !engine) return;

    const lines = raw.split(/\n|->/).map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return;

    const newNodes = [];
    const newEdges = [];

    lines.forEach((line, index) => {
        let type = 'action';
        let shape = 'rectangle';
        let icon = '';
        const lower = line.toLowerCase();

        if (index === 0 || lower.includes('khởi đầu') || lower.includes('nghi ngờ')) {
            type = 'start';
            icon = 'fa-stethoscope';
        } else if (lower.includes('?') || lower.includes('nếu') || lower.includes('đánh giá') || lower.includes('kiểm tra')) {
            type = 'question';
            shape = 'diamond';
            icon = 'fa-stethoscope';
        } else if (lower.includes('cấp cứu') || lower.includes('nguy hiểm') || lower.includes('khẩn')) {
            type = 'danger';
            shape = 'octagon';
            icon = 'fa-triangle-exclamation';
        } else if (lower.includes('ổn định') || lower.includes('xuất viện')) {
            type = 'success';
            shape = 'pill';
            icon = 'fa-shield-halved';
        } else if (lower.includes('mg') || lower.includes('ml') || lower.includes('liều')) {
            type = 'dose';
            icon = 'fa-pills';
        }

        const nodeId = `ai-node-${Date.now()}-${index}`;
        newNodes.push({
            id: nodeId,
            type,
            shape,
            icon,
            title: line.length > 30 ? line.substring(0, 30) + '...' : line,
            subtitle: line,
            width: 240,
            x: 100,
            y: 100 + index * 120
        });

        if (index > 0) {
            newEdges.push({
                id: `ai-edge-${Date.now()}-${index}`,
                source: newNodes[index - 1].id,
                target: nodeId,
                type: 'normal'
            });
        }
    });

    engine.loadDiagram({ nodes: newNodes, edges: newEdges });
    engine.autoLayout();
    closeAiModal();
}

function closeEmbedModal() {
    const modal = document.getElementById('embed-modal');
    if (modal) modal.classList.remove('active');
}

function copyEmbedCode() {
    const text = document.getElementById('embed-code-text');
    if (!text) return;
    text.select();
    navigator.clipboard.writeText(text.value);
    alert('📋 Đã sao chép mã nhúng embed code vào Clipboard!');
    closeEmbedModal();
}

// ════════════════════════════
// PRESET LIBRARY & FILE HANDLERS (.JSON, .CSV, .MD, .TXT)
// ════════════════════════════

function openPresetLibraryModal() {
    const modal = document.getElementById('preset-library-modal');
    if (modal) modal.classList.add('active');
}

function closePresetLibraryModal() {
    const modal = document.getElementById('preset-library-modal');
    if (modal) modal.classList.remove('active');
}

async function loadPresetFile(filePath) {
    try {
        const resp = await fetch(filePath);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();

        const idx = diseases.findIndex(d => d.id === data.id);
        if (idx > -1) {
            diseases[idx] = { ...diseases[idx], ...data };
        } else {
            diseases.unshift(data);
        }

        saveLocalDiseases();
        dbSaveDisease(data);
        renderCards();
        closePresetLibraryModal();

        alert(`✅ Đã nạp phác đồ "${data.name}" thành công!`);
        openPosterOverlay(data.id);
    } catch (err) {
        alert(`❌ Lỗi nạp file preset: ${err.message}`);
    }
}

function launchCurrentSimulation() {
    if (!currentPosterDiseaseId) return;
    const disease = diseases.find(d => d.id === currentPosterDiseaseId);
    if (!disease || !disease.simulationScenario) {
        alert('⚠️ Phác đồ này chưa được cấu hình kịch bản mô phỏng ca bệnh!');
        return;
    }
    if (window.pathologySim) {
        window.pathologySim.startScenario(disease.simulationScenario);
    }
}

let lastParsedCSVData = null;

async function viewCurrentCSV() {
    if (!currentPosterDiseaseId) return;
    const disease = diseases.find(d => d.id === currentPosterDiseaseId);
    const csvFile = disease ? (disease.csvMatrixFile || disease.differentialCsvFile) : null;

    if (!csvFile) {
        alert('⚠️ Phác đồ này chưa đính kèm file tra cứu CSV!');
        return;
    }

    const modal = document.getElementById('csv-view-modal');
    const container = document.getElementById('csv-modal-content');
    if (modal && container && window.PathologyCSVEngine) {
        modal.classList.add('active');
        lastParsedCSVData = await window.PathologyCSVEngine.fetchAndRenderCSV(csvFile, container);
    }
}

function closeCSVModal() {
    const modal = document.getElementById('csv-view-modal');
    if (modal) modal.classList.remove('active');
}

function exportCurrentCSVFile() {
    if (lastParsedCSVData && window.PathologyCSVEngine) {
        window.PathologyCSVEngine.exportToCSV(lastParsedCSVData, 'dvt_dosing_matrix.csv');
    }
}

function viewCurrentMarkdown() {
    if (!currentPosterDiseaseId) return;
    const disease = diseases.find(d => d.id === currentPosterDiseaseId);
    const mdFile = disease ? disease.markdownDocFile : null;

    if (!mdFile) {
        alert('⚠️ Phác đồ này chưa đính kèm tài liệu Guideline Markdown (.md)!');
        return;
    }

    if (window.PathologyMarkdownViewer) {
        window.PathologyMarkdownViewer.fetchAndShowMarkdown(mdFile, `Tài Liệu YHC: ${disease.name}`);
    }
}

function togglePocketCardMode() {
    const posterOverlay = document.getElementById('posterOverlay');
    if (posterOverlay) {
        posterOverlay.classList.toggle('pocket-card-mode');
        const isPocket = posterOverlay.classList.contains('pocket-card-mode');
        alert(isPocket ? '🎴 Đã bật chế độ "Thẻ Bỏ Túi" (Pocket Card View)' : '🖼️ Đã quay về chế độ Poster Đầy Đủ');
    }
}

function printPoster() {
    window.print();
}

