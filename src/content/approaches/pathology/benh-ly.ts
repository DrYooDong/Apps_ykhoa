/**
 * Pathology Hub / Benh Ly Dashboard (CliniPortal) [TypeScript Module]
 * src/content/approaches/pathology/benh-ly.ts
 */

import { PathologyCSVEngine } from './benh-ly-csv-engine';
import { PathologyMarkdownViewer } from './benh-ly-markdown';
import './benh-ly-simulator';

export interface SpecialtyMeta {
  name: string;
  color: string;
  bg: string;
}

export interface DiseaseItem {
  id: string;
  name: string;
  subtitle?: string;
  icd?: string;
  specialty: string;
  category?: string;
  description?: string;
  bookmarked?: boolean;
  guidelines?: string[];
  urgentAlert?: any;
  flowchart?: any;
  comparisonSection?: any;
  dosingSection?: any;
  processRibbon?: any[];
  takeaway?: any;
  simulationScenario?: any;
  csvMatrixFile?: string;
  differentialCsvFile?: string;
  markdownDocFile?: string;
  createdAt: string;
}

export const SPECIALTIES: Record<string, SpecialtyMeta> = {
  'noi-khoa': { name: 'Nội khoa', color: '#0284c7', bg: 'rgba(2, 132, 199, 0.1)' },
  'ngoai-khoa': { name: 'Ngoại khoa', color: '#16a34a', bg: 'rgba(22, 163, 74, 0.1)' },
  'truyen-nhiem': { name: 'Truyền nhiễm', color: '#d97706', bg: 'rgba(217, 119, 6, 0.1)' },
  'huyet-hoc': { name: 'Huyết học - Ung thư', color: '#dc2626', bg: 'rgba(220, 38, 38, 0.1)' },
  'tmh-rhm': { name: 'Mắt - TMH - RHM', color: '#7c3aed', bg: 'rgba(124, 58, 237, 0.1)' },
  'da-lieu': { name: 'Da liễu - Cơ xương khớp', color: '#db2777', bg: 'rgba(219, 39, 119, 0.1)' },
  'san-phu': { name: 'Sản phụ khoa', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)' },
  'nhi-khoa': { name: 'Nhi khoa', color: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.1)' },
  'cap-cuu': { name: 'Cấp cứu - Hồi sức', color: '#e11d48', bg: 'rgba(225, 29, 72, 0.1)' },
  'dinh-duong': { name: 'Dinh dưỡng', color: '#65a30d', bg: 'rgba(101, 163, 13, 0.1)' }
};

let diseases: DiseaseItem[] = [];
let currentTab: string = 'all'; // 'all', 'saved', 'has-flow'
let currentCategory: string = 'all'; // 'all', 'chan-doan', 'dieu-tri'
let currentSpecialty: string = 'all';
let searchQuery: string = '';
let sortMode: string = 'newest'; // 'newest', 'name-az', 'specialty'
let viewMode: string = 'grid'; // 'grid', 'list'
let engine: any = null;
let currentEditingDiseaseId: string | null = null;
let currentPosterDiseaseId: string | null = null;
let lastParsedCSVData: any = null;

// Supabase State
let supabaseClient: any = null;

export function initSupabase(): boolean {
  const url = localStorage.getItem('supabaseUrl_pathology');
  const key = localStorage.getItem('supabaseKey_pathology');
  const win = window as any;

  if (url && key && win.supabase) {
    try {
      supabaseClient = win.supabase.createClient(url, key);
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

export function updateSupabaseStatus(status: string, text: string): void {
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

export async function syncDiseasesWithSupabase(): Promise<void> {
  if (!supabaseClient) return;

  updateSupabaseStatus('connected', 'Supabase: Syncing...');
  try {
    const { data, error } = await supabaseClient
      .from('clinical_pathology')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;

    if (data && data.length > 0) {
      const remoteIds = new Set(data.map((d: any) => d.id));
      const localOnly = diseases.filter(d => !remoteIds.has(d.id));

      const remoteData: DiseaseItem[] = data.map((d: any) => ({
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
      diseases.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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

export async function dbSaveDisease(disease: DiseaseItem): Promise<void> {
  if (!supabaseClient) return;
  try {
    const { error } = await supabaseClient.from('clinical_pathology').upsert(
      {
        id: disease.id,
        name: disease.name,
        icd: disease.icd,
        specialty: disease.specialty,
        category: disease.category || 'ca-hai',
        description: disease.description,
        bookmarked: disease.bookmarked,
        flowchart: disease.flowchart,
        createdAt: disease.createdAt
      },
      { onConflict: 'id' }
    );
    if (error) throw error;
  } catch (err) {
    console.error('Save to SB failed:', err);
  }
}

export async function dbDeleteDisease(id: string): Promise<void> {
  if (!supabaseClient) return;
  try {
    const { error } = await supabaseClient.from('clinical_pathology').delete().eq('id', id);
    if (error) throw error;
  } catch (err) {
    console.error('Delete from SB failed:', err);
  }
}

export function loadDiseases(): void {
  const saved = localStorage.getItem('pathologyDiseases');
  if (saved) {
    try {
      diseases = JSON.parse(saved);
    } catch {
      diseases = [];
    }
  }

  if (diseases.length === 0) {
    diseases = [
      {
        id: 'path_dvt_poster',
        name: 'Phác Đồ Tiếp Cận DVT Chi Dưới',
        subtitle: 'Cập nhật thực hành 2026 — áp dụng cho người lớn nghi DVT',
        icd: 'I80.2',
        specialty: 'cap-cuu',
        category: 'ca-hai',
        description:
          'Lưu đồ chẩn đoán, phân loại vị trí huyết khối tĩnh mạch sâu và phác đồ liều dùng chống đông (NICE/ASH/CHEST).',
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
            {
              id: 'fn1',
              type: 'start',
              title: 'NGHI NGỜ DVT CHI DƯỚI',
              subtitle: 'TÍNH WELLS DVT 2 MỨC',
              icon: 'fa-vial',
              shape: 'rectangle',
              toolUrl: '../../Công cụ/Tim mạch & huyết khối/Danhgia_Nguyco_VTE.html',
              toolTitle: 'Tính Thang Điểm Wells DVT',
              badge: 'BƯỚC 1',
              x: 260,
              y: 30,
              width: 260
            },
            {
              id: 'fn2',
              type: 'question',
              title: 'WELLS ≤ 1 (Ít khả năng)',
              subtitle: 'Thực hiện xét nghiệm D-dimer',
              icon: 'fa-stethoscope',
              shape: 'diamond',
              x: 80,
              y: 160,
              width: 220,
              targetCardId: 'dose-table-card-section'
            },
            {
              id: 'fn3',
              type: 'question',
              title: 'WELLS ≥ 2 (Có khả năng)',
              subtitle: 'Siêu âm ép tĩnh mạch trong 4h',
              icon: 'fa-vial',
              shape: 'diamond',
              x: 440,
              y: 160,
              width: 220,
              targetCardId: 'dose-table-card-section'
            },
            {
              id: 'fn4',
              type: 'success',
              title: 'LOẠI TRỪ DVT',
              subtitle: 'D-dimer âm tính',
              icon: 'fa-shield-halved',
              shape: 'pill',
              badge: 'ỔN ĐỊNH',
              x: 80,
              y: 320,
              width: 200
            },
            {
              id: 'fn5',
              type: 'danger',
              title: 'XÁC ĐỊNH DVT',
              subtitle: 'Siêu âm dương tính / D-dimer (+)',
              icon: 'fa-truck-medical',
              shape: 'octagon',
              badge: 'KHẨN',
              x: 440,
              y: 320,
              width: 220,
              targetCardId: 'comparison-card-section'
            }
          ],
          edges: [
            { id: 'fe1', source: 'fn1', target: 'fn2', label: 'Wells ≤ 1', type: 'normal' },
            { id: 'fe2', source: 'fn1', target: 'fn3', label: 'Wells ≥ 2', type: 'danger' },
            { id: 'fe3', source: 'fn2', target: 'fn4', label: 'D-dimer (-)', type: 'success' },
            { id: 'fe4', source: 'fn3', target: 'fn5', label: 'Siêu âm (+)', type: 'danger' }
          ]
        },
        createdAt: new Date().toISOString()
      }
    ];
    saveLocalDiseases();
  }

  renderCards();
}

export function saveLocalDiseases(): void {
  localStorage.setItem('pathologyDiseases', JSON.stringify(diseases));
}

export function renderSpecialtyPills(): void {
  const container = document.getElementById('specialty-pills-container');
  if (!container) return;

  let html = `
    <button class="spec-pill-btn ${currentSpecialty === 'all' ? 'active' : ''}" onclick="filterSpecialty('all')">
      <span class="spec-pill-dot" style="background: var(--color-primary);"></span> Tất cả
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

export function initSpecialtySelect(): void {
  const select = document.getElementById('disease-specialty') as HTMLSelectElement | null;
  if (!select) return;
  select.innerHTML = '<option value="">-- Chọn chuyên khoa --</option>';
  Object.entries(SPECIALTIES).forEach(([key, spec]) => {
    select.innerHTML += `<option value="${key}">${spec.name}</option>`;
  });
}

export function filterSpecialty(key: string): void {
  currentSpecialty = key;
  renderSpecialtyPills();
  renderCards();
}

export function applyFilter(type: string, value: string): void {
  document.querySelectorAll('.pm-seg-btn').forEach(btn => btn.classList.remove('active'));

  if (type === 'all') {
    currentTab = 'all';
    currentCategory = 'all';
    document.getElementById('filter-all')?.classList.add('active');
  } else if (type === 'cat') {
    currentTab = 'all';
    currentCategory = value;
    document.getElementById(`filter-${value}`)?.classList.add('active');
  } else if (type === 'saved') {
    currentTab = 'saved';
    currentCategory = 'all';
    document.getElementById('filter-saved')?.classList.add('active');
  } else if (type === 'has-flow') {
    currentTab = 'has-flow';
    currentCategory = 'all';
    document.getElementById('filter-has-flow')?.classList.add('active');
  }
  renderCards();
}

export function renderCards(): void {
  let filtered = [...diseases];

  if (currentTab === 'saved') {
    filtered = filtered.filter(d => d.bookmarked);
  } else if (currentTab === 'has-flow') {
    filtered = filtered.filter(d => d.flowchart && d.flowchart.nodes && d.flowchart.nodes.length > 0);
  }

  if (currentCategory !== 'all') {
    filtered = filtered.filter(d => {
      const cat = d.category || 'ca-hai';
      return cat === currentCategory || cat === 'ca-hai';
    });
  }

  if (currentSpecialty !== 'all') {
    filtered = filtered.filter(d => d.specialty === currentSpecialty);
  }

  if (searchQuery) {
    filtered = filtered.filter(
      d =>
        d.name.toLowerCase().includes(searchQuery) ||
        (d.icd && d.icd.toLowerCase().includes(searchQuery)) ||
        (d.description && d.description.toLowerCase().includes(searchQuery))
    );
  }

  if (sortMode === 'name-az') {
    filtered.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
  } else if (sortMode === 'specialty') {
    filtered.sort((a, b) => (a.specialty || '').localeCompare(b.specialty || '', 'vi'));
  } else {
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  const totalCountEl = document.getElementById('totalDiseasesCount');
  const flowCountEl = document.getElementById('flowchartsCount');
  const savedCountEl = document.getElementById('savedDiseasesCount');
  const displayCountEl = document.getElementById('display-count');

  if (totalCountEl) totalCountEl.textContent = diseases.length.toString();
  if (flowCountEl) {
    flowCountEl.textContent = diseases
      .filter(d => d.flowchart && d.flowchart.nodes && d.flowchart.nodes.length > 0)
      .length.toString();
  }
  if (savedCountEl) savedCountEl.textContent = diseases.filter(d => d.bookmarked).length.toString();
  if (displayCountEl) displayCountEl.textContent = filtered.length.toString();

  const container = document.getElementById('disease-cards');
  const emptyState = document.getElementById('empty-state');
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  let html = '';
  filtered.forEach(d => {
    const spec = SPECIALTIES[d.specialty] || SPECIALTIES['noi-khoa']!;
    const nodeCount = d.flowchart && d.flowchart.nodes ? d.flowchart.nodes.length : 0;
    const catVal = d.category || 'ca-hai';
    let catBadgeHtml = '';

    if (catVal === 'chan-doan') {
      catBadgeHtml = `<span class="pm-cat-badge chan-doan"><i class="fa-solid fa-stethoscope"></i> Chẩn đoán</span>`;
    } else if (catVal === 'dieu-tri') {
      catBadgeHtml = `<span class="pm-cat-badge dieu-tri"><i class="fa-solid fa-pills"></i> Điều trị</span>`;
    } else {
      catBadgeHtml = `<span class="pm-cat-badge ca-hai"><i class="fa-solid fa-notes-medical"></i> Chẩn đoán & Điều trị</span>`;
    }

    html += `
      <div class="pm-card" onclick="openPosterOverlay('${d.id}')">
        <div class="pm-card-top">
          <span class="pm-spec-tag" style="background: ${spec.bg}; color: ${spec.color};">
            <span style="width:6px; height:6px; border-radius:50%; background:${spec.color}; display:inline-block;"></span>
            ${spec.name}
          </span>
          <button class="pm-star-btn ${d.bookmarked ? 'active' : ''}" onclick="toggleBookmark('${d.id}', event)">
            <i class="fa-${d.bookmarked ? 'solid' : 'regular'} fa-star"></i>
          </button>
        </div>
        <h3 class="pm-card-title">${d.name}</h3>
        ${d.icd ? `<div class="pm-card-icd"><i class="fa-solid fa-barcode"></i> ICD-10: <strong>${d.icd}</strong></div>` : ''}
        <p class="pm-card-desc">${d.description || 'Chưa có mô tả chi tiết'}</p>
        <div class="pm-card-footer">
          ${catBadgeHtml}
          <span class="pm-flow-badge ${nodeCount > 0 ? 'has-flow' : ''}">
            <i class="fa-solid fa-diagram-project"></i> ${nodeCount > 0 ? `${nodeCount} nút` : 'Chưa có lưu đồ'}
          </span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

export function openPosterOverlay(diseaseId: string): void {
  currentPosterDiseaseId = diseaseId;
  const disease = diseases.find(d => d.id === diseaseId);
  if (!disease) return;

  const container = document.getElementById('posterContainer');
  const win = window as any;
  if (container && win.ClinicalInfographicRenderer) {
    new win.ClinicalInfographicRenderer(container, disease);
  }

  const posterOverlay = document.getElementById('posterOverlay');
  if (posterOverlay) posterOverlay.classList.add('active');
}

export function closePosterOverlay(): void {
  const posterOverlay = document.getElementById('posterOverlay');
  if (posterOverlay) posterOverlay.classList.remove('active');
  currentPosterDiseaseId = null;
}

export function toggleBookmark(id: string, e: Event): void {
  e.stopPropagation();
  const disease = diseases.find(d => d.id === id);
  if (disease) {
    disease.bookmarked = !disease.bookmarked;
    saveLocalDiseases();
    dbSaveDisease(disease);
    renderCards();
  }
}

export function initPathologyDashboard(): void {
  initSupabase();
  renderSpecialtyPills();
  initSpecialtySelect();
  loadDiseases();

  const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.toLowerCase().trim();
      renderCards();
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
      e.preventDefault();
      if (searchInput) searchInput.focus();
    }
  });
}

// Global binding
if (typeof window !== 'undefined') {
  const win = window as any;
  win.applyFilter = applyFilter;
  win.filterSpecialty = filterSpecialty;
  win.openPosterOverlay = openPosterOverlay;
  win.closePosterOverlay = closePosterOverlay;
  win.toggleBookmark = toggleBookmark;
  win.PathologyCSVEngine = PathologyCSVEngine;
  win.PathologyMarkdownViewer = PathologyMarkdownViewer;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPathologyDashboard);
  } else {
    initPathologyDashboard();
  }
}
