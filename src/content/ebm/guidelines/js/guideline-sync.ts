/**
 * CliniPortal 2.0 — Guidelines Sync & Store Engine (TypeScript)
 * Path: src/content/ebm/guidelines/js/guideline-sync.ts
 */

import {
  Study,
  ColumnVisibilityState,
  FilterState,
  DuplicateCheckResult,
  BatchDuplicateItem
} from './guidelines-types';

import './guidelines-types';
import { SAMPLE_STUDIES } from './guidelinesdata';

export type SyncStatusState = 'synced' | 'saving' | 'offline' | 'error';
export interface SyncStatusInfo {
  status: SyncStatusState;
  timestamp: number;
  customCount: number;
  bookmarkedCount: number;
  storageBytesUsed?: number;
  message?: string;
}

// Global State Stores
window.studies = window.studies || [];
window.selectedIds = window.selectedIds || new Set<string>();
window.expandedIds = window.expandedIds || new Set<string>();
window.isMobileView = window.innerWidth <= 768;

// View state
window.viewMode = window.viewMode || 'compact';
window.currentTab = window.currentTab || 'list';
window.showAdvancedFilters = window.showAdvancedFilters || false;

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
  const normalized = filePath.replace(/^(?:kho-guidelines|Kho Guidelines)\//i, '');
  const cleanSlug = normalized.replace(/\.(?:html|mdx)$/i, '');
  
  if (typeof window !== 'undefined' && window.location) {
    if (window.location.pathname.includes('guidelines.html')) {
      return `#/reader/${cleanSlug}`;
    }
    return `index.html#/reader/${cleanSlug}`;
  }
  
  return `#/reader/${cleanSlug}`;
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
// MEDICAL TOAST NOTIFICATION SYSTEM (Zero-dependency, Non-intrusive)
// ════════════════════════════════════════════════════════════════

export interface ToastOptions {
  type?: 'success' | 'info' | 'warning' | 'error' | 'sync';
  title?: string;
  message: string;
  duration?: number;
}

export function showMedicalToast(options: ToastOptions | string): void {
  if (typeof document === 'undefined') return;
  const opts: ToastOptions = typeof options === 'string' ? { message: options, type: 'info' } : options;
  const type = opts.type || 'info';
  const duration = opts.duration !== undefined ? opts.duration : (type === 'error' ? 6000 : 4000);

  let container = document.getElementById('clini-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'clini-toast-container';
    container.className = 'clini-toast-container';
    document.body.appendChild(container);
  }

  const icons: Record<string, string> = {
    success: '<i class="fa-solid fa-circle-check"></i>',
    error: '<i class="fa-solid fa-triangle-exclamation"></i>',
    warning: '<i class="fa-solid fa-circle-exclamation"></i>',
    info: '<i class="fa-solid fa-circle-info"></i>',
    sync: '<i class="fa-solid fa-rotate"></i>'
  };

  const defaultTitles: Record<string, string> = {
    success: 'Thành công',
    error: 'Đã xảy ra lỗi',
    warning: 'Cảnh báo',
    info: 'Thông báo',
    sync: 'Đang đồng bộ'
  };

  const toast = document.createElement('div');
  toast.className = `clini-toast clini-toast-${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');

  const escapeHtmlToast = (str?: string) => {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };

  toast.innerHTML = `
    <div class="clini-toast-icon">${icons[type] || icons.info}</div>
    <div class="clini-toast-content">
      <div class="clini-toast-title">${escapeHtmlToast(opts.title || defaultTitles[type] || 'Thông báo')}</div>
      <div class="clini-toast-message">${escapeHtmlToast(opts.message)}</div>
    </div>
    <button type="button" class="clini-toast-close" aria-label="Đóng">&times;</button>
    ${duration > 0 ? `<div class="clini-toast-progress" style="animation-duration: ${duration}ms;"></div>` : ''}
  `;

  container.appendChild(toast);

  // Animation trigger
  requestAnimationFrame(() => {
    toast.classList.add('toast-show');
  });

  const dismiss = () => {
    toast.classList.remove('toast-show');
    toast.classList.add('toast-hide');
    setTimeout(() => {
      if (toast.parentElement) toast.parentElement.removeChild(toast);
    }, 300);
  };

  const closeBtn = toast.querySelector('.clini-toast-close');
  if (closeBtn) closeBtn.addEventListener('click', dismiss);

  if (duration > 0) {
    setTimeout(dismiss, duration);
  }
}

// ════════════════════════════════════════════════════════════════
// LOCAL DATA PERSISTENCE HELPERS
// ════════════════════════════════════════════════════════════════

export function dbSaveStudy(study: Study, silent = false): void {
  if (window.saveStudies) window.saveStudies();
  if (!silent) {
    showMedicalToast({
      type: 'success',
      title: 'Đã lưu cục bộ',
      message: 'Đã lưu bản ghi "' + (study.title || '').substring(0, 35) + '..." vào kho dữ liệu.'
    });
  }
}

export function dbDeleteStudy(id: string): void {
  if (!id) return;
  saveDeletedStudyId(id);
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

export function isPartVariation(idA?: string, idB?: string, titleA?: string, titleB?: string): boolean {
  const matchIdA = (idA || '').match(/[-_](p\d+|part\d+)$/i);
  const matchIdB = (idB || '').match(/[-_](p\d+|part\d+)$/i);
  if (matchIdA && matchIdB) {
    if (matchIdA[1].toLowerCase() !== matchIdB[1].toLowerCase()) return true;
  } else if (matchIdA || matchIdB) {
    return true;
  }
  const normA = (titleA || '').toLowerCase();
  const normB = (titleB || '').toLowerCase();
  const matchTitleA = normA.match(/\b(phan|part)\s*(\d+)/i);
  const matchTitleB = normB.match(/\b(phan|part)\s*(\d+)/i);
  if (matchTitleA && matchTitleB) {
    if (matchTitleA[2] !== matchTitleB[2]) return true;
  } else if (matchTitleA || matchTitleB) {
    return true;
  }
  return false;
}

export function extractCoreKey(title?: string): string {
  if (!title) return '';
  const parenMatch = title.match(/\(([^)]+)\)/);
  if (parenMatch) {
    const inside = parenMatch[1].trim();
    // Bỏ qua các chuỗi phụ chú thông thường không đại diện cho tên thử nghiệm riêng biệt
    const genericNoise = /^(p\d+|part\d+|phan\s*\d+|tg\d+|ssti|sepsis[-_]?\d*|cap nhat|update|khuyen cao|huong dan|guideline|dong thuan|consensus|review|rct|meta)$/i;
    const normInside = inside.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (inside.length >= 4 && !genericNoise.test(normInside)) {
      return normalizeMedicalTitle(inside);
    }
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
    bookmarked: parseBool(s.bookmarked),
    parts: (() => {
      if (Array.isArray(s.parts)) return s.parts;
      if (typeof s.parts === 'string' && s.parts.trim().startsWith('[')) {
        try { return JSON.parse(s.parts); } catch(e) {}
      }
      return undefined;
    })(),
    icd10: (() => {
      if (Array.isArray(s.icd10)) {
        const flat: string[] = [];
        s.icd10.forEach((item: any) => {
          if (typeof item === 'string') {
            const trimmed = item.trim();
            if (trimmed.startsWith('[')) {
              try {
                let p = JSON.parse(trimmed);
                while (typeof p === 'string' && p.trim().startsWith('[')) p = JSON.parse(p);
                if (Array.isArray(p)) flat.push(...p.map(x => String(x).trim()));
                else if (p) flat.push(String(p).trim());
              } catch(e) {
                flat.push(trimmed.replace(/[\[\]"']/g, '').trim());
              }
            } else {
              flat.push(trimmed.replace(/[\[\]"']/g, '').trim());
            }
          } else if (item) {
            flat.push(String(item).trim());
          }
        });
        return flat.filter(Boolean);
      }
      if (typeof s.icd10 === 'string' && s.icd10.trim()) {
        const trimmed = s.icd10.trim();
        if (trimmed.startsWith('[')) {
          try {
            let p = JSON.parse(trimmed);
            while (typeof p === 'string' && p.trim().startsWith('[')) p = JSON.parse(p);
            if (Array.isArray(p)) return p.map((x: any) => String(x).trim()).filter(Boolean);
          } catch(e) {}
        }
        return trimmed.replace(/[\[\]"']/g, '').split(/[,;\s]+/).map((x: string) => x.trim()).filter(Boolean);
      }
      return [];
    })(),
    createdAt: s.createdAt || s.created_at || (typeof s.id === 'string' && s.id.startsWith('study_') ? (() => {
      const m = s.id.match(/study_(\d{10,13})/);
      return m ? new Date(parseInt(m[1], 10)).toISOString() : undefined;
    })() : undefined)
  };
}

export function processAndDeduplicateStudies(list: any[]): Study[] {
  if (!Array.isArray(list)) return [];
  const deletedList = getDeletedStudyIds();
  const seenIds = new Set<string>();
  const seenFiles = new Map<string, Study>();
  const seenNormTitles = new Map<string, Study>();
  const uniqueStudies: Study[] = [];

  for (const rawItem of list) {
    if (!rawItem) continue;
    const s = processStudyFields(rawItem);
    if (!s || !s.id) continue;
    if (isStudyDeleted(s, deletedList)) continue;
    if (seenIds.has(s.id)) continue;

    // Deduplicate theo file MDX nếu có:
    if (s.file && seenFiles.has(s.file)) {
      const existing = seenFiles.get(s.file)!;
      // Nếu một bản ghi là custom ID study_... và bản ghi kia là slug chuẩn, bỏ qua bản study_
      if (s.id.startsWith('study_') && !existing.id.startsWith('study_')) {
        continue;
      }
    }

    // Deduplicate theo Title + Year chuẩn hóa:
    const normTitle = normalizeMedicalTitle(s.title);
    const titleKey = normTitle + (s.year ? '_' + s.year : '');
    if (titleKey && seenNormTitles.has(titleKey)) {
      const existing = seenNormTitles.get(titleKey)!;
      // Chỉ gộp nếu không phải là các phần khác nhau
      if (!isPartVariation(s.id, existing.id, s.title, existing.title)) {
        if (s.id.startsWith('study_') || existing.id.startsWith('study_') || s.id === existing.id) {
          if (!existing.file && s.file) existing.file = s.file;
          if ((!existing.summary || existing.summary === 'Không có kết luận') && s.summary) existing.summary = s.summary;
          continue;
        }
      }
    }

    seenIds.add(s.id);
    if (s.file) seenFiles.set(s.file, s);
    if (titleKey) seenNormTitles.set(titleKey, s);
    uniqueStudies.push(s);
  }

  return uniqueStudies;
}

export function dispatchSyncStatus(info: SyncStatusInfo): void {
  if (typeof window === 'undefined') return;
  (window as any).__cliniportalSyncStatus = info;
  try {
    const event = new CustomEvent('cliniportal:sync-status', { detail: info });
    window.dispatchEvent(event);
  } catch (e) {}
}

export function backupCustomStudies(): boolean {
  try {
    const custom = localStorage.getItem('cliniportal_custom_studies') || '[]';
    const bms = localStorage.getItem('cliniportal_bookmarked_ids') || '[]';
    const deleted = localStorage.getItem('cliniportal_deleted_study_ids') || '[]';
    const backupData = {
      timestamp: new Date().toISOString(),
      customStudies: JSON.parse(custom),
      bookmarkedIds: JSON.parse(bms),
      deletedIds: JSON.parse(deleted)
    };
    localStorage.setItem('cliniportal_backup_snapshot', JSON.stringify(backupData));
    return true;
  } catch (e) {
    console.error('Failed to create backup:', e);
    return false;
  }
}

export function restoreCustomStudiesBackup(): boolean {
  try {
    const raw = localStorage.getItem('cliniportal_backup_snapshot');
    if (!raw) return false;
    const backupData = JSON.parse(raw);
    if (backupData.customStudies) {
      localStorage.setItem('cliniportal_custom_studies', JSON.stringify(backupData.customStudies));
    }
    if (backupData.bookmarkedIds) {
      localStorage.setItem('cliniportal_bookmarked_ids', JSON.stringify(backupData.bookmarkedIds));
    }
    if (backupData.deletedIds) {
      localStorage.setItem('cliniportal_deleted_study_ids', JSON.stringify(backupData.deletedIds));
    }
    loadStudies();
    if (window.renderTable) window.renderTable();
    showMedicalToast({
      type: 'success',
      title: 'Đã phục hồi dữ liệu',
      message: 'Khôi phục thành công từ bản sao lưu gần nhất.'
    });
    return true;
  } catch (e) {
    console.error('Failed to restore backup:', e);
    showMedicalToast({
      type: 'error',
      title: 'Lỗi phục hồi',
      message: 'Không thể khôi phục bản sao lưu.'
    });
    return false;
  }
}

export function validateStudySchema(raw: any): { valid: boolean; errors: string[]; sanitized: Study | null } {
  const errors: string[] = [];
  if (!raw || typeof raw !== 'object') {
    return { valid: false, errors: ['Bản ghi phải là một đối tượng JSON hợp lệ'], sanitized: null };
  }
  if (!raw.title || typeof raw.title !== 'string' || raw.title.trim().length < 3) {
    errors.push('Tiêu đề tài liệu (title) bắt buộc và phải có ít nhất 3 ký tự');
  }

  let validYear = new Date().getFullYear();
  if (raw.year !== undefined && raw.year !== null && raw.year !== '') {
    const y = parseInt(String(raw.year), 10);
    if (isNaN(y) || y < 1900 || y > 2100) {
      errors.push('Năm xuất bản (year) không hợp lệ (phải từ 1900 đến 2100)');
    } else {
      validYear = y;
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors, sanitized: null };
  }

  const processed = processStudyFields(raw);
  processed.isCustom = true;
  (processed as any)._userCreated = true;
  return {
    valid: true,
    errors: [],
    sanitized: processed
  };
}

export function loadStudies(): void {
  try {
    localStorage.removeItem('clinicalGuidelines');
    localStorage.removeItem('internalMedicineStudies');
  } catch (e) {}

  // BUG-06: Guard check an toàn, ưu tiên window.SAMPLE_STUDIES, fallback module SAMPLE_STUDIES
  const sampleStudies: Study[] = (window.SAMPLE_STUDIES && window.SAMPLE_STUDIES.length > 0)
    ? window.SAMPLE_STUDIES
    : (SAMPLE_STUDIES && SAMPLE_STUDIES.length > 0 ? SAMPLE_STUDIES : []);
  
  const validSlugs = new Set(sampleStudies.map(s => s.id));

  // Đọc danh sách ID bài đã bookmark (nếu có riêng)
  const bookmarkedIdsSet = new Set<string>();
  try {
    const rawBookmarks = localStorage.getItem('cliniportal_bookmarked_ids');
    if (rawBookmarks) {
      const parsedBm = JSON.parse(rawBookmarks);
      if (Array.isArray(parsedBm)) {
        parsedBm.forEach(id => { if (typeof id === 'string') bookmarkedIdsSet.add(id); });
      }
    }
  } catch (e) {}

  let rawCustomList: any[] = [];
  try {
    const storedCustom = localStorage.getItem('cliniportal_custom_studies');
    if (storedCustom) {
      const parsed = JSON.parse(storedCustom);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // BUG-03: Giữ lại tất cả các bản ghi hợp lệ:
        // - Bài custom người dùng tạo/import (!validSlugs.has(item.id))
        // - HOẶC bài static mà người dùng đã sửa đổi (isCustom hoặc _userModified)
        // - Tự động prune các bản static cũ chưa sửa đổi để chuyển sang Delta Sync (BUG-05)
        rawCustomList = parsed.filter(item => {
          if (!item || !item.id || isStudyDeleted(item)) return false;
          // Nếu bài có bookmark trong storage cũ -> đồng bộ sang bookmarkedIdsSet
          if (item.bookmarked) bookmarkedIdsSet.add(item.id);
          // Nếu bài không nằm trong static registry -> đây là bài người dùng tạo hoặc import
          if (!validSlugs.has(item.id)) return true;
          // Nếu bài nằm trong static nhưng có cờ sửa đổi của user -> giữ lại
          if (item.isCustom || item._userModified) return true;
          // Các bản ghi static nguyên bản còn lại không cần giữ trong rawCustomList
          return false;
        });
      }
    }
  } catch (e) {}

  // Trộn: bài custom của người dùng + kho static chuẩn mới nhất
  const combined = [...rawCustomList, ...sampleStudies];
  const processed = processAndDeduplicateStudies(combined);

  // Áp dụng trạng thái bookmark từ bookmarkedIdsSet
  processed.forEach(s => {
    if (bookmarkedIdsSet.has(s.id)) {
      s.bookmarked = true;
    }
  });

  window.studies = processed;
  window.studies.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

  // Lưu lại Delta Sync sạch sẽ (giảm dung lượng lưu trữ từ ~390KB về < 2KB)
  saveStudies(true);
}

export function saveStudies(silent = false): void {
  try {
    const sampleStudies: Study[] = (window.SAMPLE_STUDIES && window.SAMPLE_STUDIES.length > 0)
      ? window.SAMPLE_STUDIES
      : (SAMPLE_STUDIES && SAMPLE_STUDIES.length > 0 ? SAMPLE_STUDIES : []);
    const validSlugs = new Set(sampleStudies.map(s => s.id));

    // 1. Lưu danh sách Bookmarks (siêu nhẹ, chỉ vài chục byte)
    const bookmarkedIds = (window.studies || []).filter(s => s && s.bookmarked).map(s => s.id);
    localStorage.setItem('cliniportal_bookmarked_ids', JSON.stringify(bookmarkedIds));

    // 2. Lưu Delta: CHỈ lưu các bài custom hoặc các bài static do người dùng chỉnh sửa (BUG-05 + UPGRADE-01)
    const deltaCustom = (window.studies || []).filter(s => {
      if (!s || !s.id) return false;
      if (!validSlugs.has(s.id)) return true; // Bài tự thêm hoặc import
      if (s.isCustom || (s as any)._userModified) return true; // Bài static đã chỉnh sửa
      return false;
    });

    const jsonStr = JSON.stringify(deltaCustom);
    localStorage.setItem('cliniportal_custom_studies', jsonStr);

    dispatchSyncStatus({
      status: 'synced',
      timestamp: Date.now(),
      customCount: deltaCustom.length,
      bookmarkedCount: bookmarkedIds.length,
      storageBytesUsed: jsonStr.length * 2
    });
  } catch (err: any) {
    console.error('Lỗi khi lưu dữ liệu vào localStorage:', err);
    dispatchSyncStatus({
      status: 'error',
      timestamp: Date.now(),
      customCount: 0,
      bookmarkedCount: 0,
      message: err?.message || 'Không thể lưu trữ do vượt dung lượng localStorage'
    });
    if (!silent) {
      showMedicalToast({
        type: 'error',
        title: 'Lỗi lưu trữ',
        message: 'Bộ nhớ trình duyệt có thể đã đầy (QuotaExceeded). Vui lòng dọn bớt dữ liệu!'
      });
    }
  }

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

// Bigram character-level similarity — bắt được viết tắt, tên nghiên cứu khác nhau về surface
export function getBigramSet(str?: string): Set<string> {
  if (!str || str.length < 2) return new Set();
  const clean = str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'd')
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ').trim();
  const bigrams = new Set<string>();
  // Word-level bigrams (pairs of consecutive words)
  const words = clean.split(' ').filter(w => w.length >= 2);
  for (let i = 0; i < words.length - 1; i++) {
    bigrams.add(words[i] + '_' + words[i + 1]);
  }
  // Char-level bigrams on first 80 chars (for abbreviation matching)
  const chars = clean.replace(/\s/g, '').substring(0, 80);
  for (let i = 0; i < chars.length - 1; i++) {
    bigrams.add('c_' + chars[i] + chars[i + 1]);
  }
  return bigrams;
}

function calculateBigramSimilarity(a?: string, b?: string): number {
  if (!a || !b) return 0;
  const bA = getBigramSet(a);
  const bB = getBigramSet(b);
  return calculateSetJaccard(bA, bB);
}

// Tính điểm cross-field (primaryEndpoint, population, intervention)
function crossFieldScore(cand: Study, ex: Study): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // primaryEndpoint similarity
  const epA = (cand.primaryEndpoint || '').trim();
  const epB = (ex.primaryEndpoint || '').trim();
  if (epA && epB && epA !== 'N/A' && epB !== 'N/A') {
    const epSim = calculateBigramSimilarity(epA, epB);
    if (epSim >= 0.35) {
      const bonus = Math.min(10, Math.round(epSim * 12));
      score += bonus;
      reasons.push(`Kết điểm chính tương đồng (+${bonus}%)`);
    }
  }

  // population similarity (bigram on short text)
  const popA = (cand.population || cand.sampleSize || '').toString().toLowerCase();
  const popB = (ex.population || ex.sampleSize || '').toString().toLowerCase();
  if (popA.length >= 4 && popB.length >= 4) {
    const popSim = calculateBigramSimilarity(popA, popB);
    if (popSim >= 0.4) {
      score += 5;
      reasons.push('Dân số nghiên cứu tương đồng (+5%)');
    }
  }

  // design match — same type of study (RCT vs RCT, meta vs meta)
  const designA = (cand.design || '').toLowerCase();
  const designB = (ex.design || '').toLowerCase();
  if (designA && designB && designA === designB) {
    score += 5;
    reasons.push(`Cùng loại thiết kế nghiên cứu: ${designA} (+5%)`);
  }

  return { score, reasons };
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

/**
 * detectStudyDuplicate v2 — Additive scoring engine (không còn hard gates)
 *
 * Thang điểm mới (tổng tối đa ~135, capped tại 100):
 *  CoreKey exact            → 100 (exact, trả về ngay)
 *  Same disease/condition   → +25
 *  Year within ±2           → +15
 *  Same org/journal         → +15
 *  Title token Jaccard ≥0.2 → +0-20
 *  Title bigram sim ≥0.3    → +0-15
 *  Drug/intervention match  → +15
 *  crossField (endpoint,
 *    population, design)    → +0-20
 *  Summary Jaccard ≥0.2     → +0-10
 *
 * Mức phát hiện:
 *  exact       : 100
 *  high        : ≥75
 *  moderate    : ≥55
 *  near-similar: ≥38 (mức mới — "sát giống")
 *  none        : <38
 */
export function detectStudyDuplicate(
  candidate: Study,
  existingList?: Study[],
  minScore = 38
): DuplicateCheckResult {
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
  const candDrug = (candidate.drug || candidate.intervention || '').toLowerCase().trim();
  const candCond = extractConditionFromStudy(candidate);

  const candTitleFull = ((candidate.title || '') + ' ' + (candidate.titleEn || '')).trim();
  const candTitleTokens = getTitleTokenSet(candTitleFull);

  for (const existing of targetList) {
    if (!existing || existing.id === candidate.id) continue;

    // Không bao giờ coi các phần khác nhau của cùng tài liệu là duplicate
    if (isPartVariation(candidate.id, existing.id, candidate.title, existing.title)) {
      continue;
    }

    // ── Mức EXACT: CoreKey match (bất kể điều kiện phụ) ──
    const exCoreKey = extractCoreKey(existing.title);
    if (candCoreKey && exCoreKey && candCoreKey === exCoreKey) {
      // Chỉ trả exact khi cùng chuyên khoa hoặc title Jaccard cao
      const exTitleTokensFast = getTitleTokenSet((existing.title || '') + ' ' + (existing.titleEn || ''));
      const fastJaccard = calculateSetJaccard(candTitleTokens, exTitleTokensFast);
      if (
        candidate.specialty === existing.specialty ||
        fastJaccard >= 0.4 ||
        candCond.key === extractConditionFromStudy(existing).key
      ) {
        return {
          isDuplicate: true,
          score: 100,
          matchedStudy: existing,
          reasons: ['Trùng khớp 100% Tiêu đề cốt lõi / Tên viết tắt nghiên cứu'],
          matchLevel: 'exact'
        };
      }
    }

    // ── Additive scoring (không có hard gate) ──
    let score = 0;
    const reasons: string[] = [];

    // 1. Cùng bệnh / điều kiện lâm sàng (+25)
    const exCond = extractConditionFromStudy(existing);
    if (candCond.key && exCond.key && candCond.key === exCond.key) {
      score += 25;
      reasons.push(`Cùng Bệnh/Vấn đề: ${candCond.label} (+25%)`);
    } else if (candidate.specialty && existing.specialty && candidate.specialty === existing.specialty) {
      // Cùng chuyên khoa nhưng khác condition → điểm thấp hơn
      score += 8;
      reasons.push(`Cùng chuyên khoa: ${candidate.specialty} (+8%)`);
    }

    // 2. Năm công bố trong vòng ±2 (+15)
    const exYear = existing.year ? parseInt(String(existing.year), 10) : null;
    if (candYear && exYear) {
      const yearDiff = Math.abs(candYear - exYear);
      if (yearDiff === 0) {
        score += 15;
        reasons.push(`Cùng năm công bố: ${candYear} (+15%)`);
      } else if (yearDiff <= 2) {
        score += 8;
        reasons.push(`Năm công bố gần nhau (±${yearDiff}): ${candYear}↔${exYear} (+8%)`);
      }
    }

    // 3. Cùng tổ chức / tạp chí (+15)
    const exOrg = normalizeOrgName(existing.organization || existing.journal);
    if (candOrg && exOrg) {
      if (candOrg === exOrg || candOrg.includes(exOrg) || exOrg.includes(candOrg)) {
        score += 15;
        reasons.push(`Cùng Nguồn: ${existing.organization || existing.journal || 'N/A'} (+15%)`);
      }
    }

    // 4. Title token Jaccard (0-20)
    const exTitleFull = ((existing.title || '') + ' ' + (existing.titleEn || '')).trim();
    const exTitleTokens = getTitleTokenSet(exTitleFull);
    const tokenJaccard = calculateSetJaccard(candTitleTokens, exTitleTokens);
    if (tokenJaccard >= 0.2) {
      const titleBonus = Math.min(20, Math.round(tokenJaccard * 22));
      score += titleBonus;
      reasons.push(`Nội dung tiêu đề trùng khớp (Jaccard ${(tokenJaccard * 100).toFixed(0)}%, +${titleBonus}%)`);
    }

    // 5. Bigram similarity — bắt tên viết tắt và biến thể bề mặt (0-15)
    const bigramSim = calculateBigramSimilarity(candTitleFull, exTitleFull);
    if (bigramSim >= 0.28 && tokenJaccard < 0.2) {
      // Chỉ cộng bigram nếu token Jaccard thấp (tránh double-count)
      const bigramBonus = Math.min(15, Math.round(bigramSim * 18));
      score += bigramBonus;
      reasons.push(`Cấu trúc tên nghiên cứu tương đồng (Bigram ${(bigramSim * 100).toFixed(0)}%, +${bigramBonus}%)`);
    }

    // 6. Thuốc / Can thiệp (+15)
    const exDrug = (existing.drug || existing.intervention || '').toLowerCase().trim();
    if (candDrug && exDrug && candDrug !== 'n/a' && exDrug !== 'n/a') {
      if (candDrug === exDrug || candDrug.includes(exDrug) || exDrug.includes(candDrug)) {
        score += 15;
        reasons.push(`Trùng Thuốc/Can thiệp: ${exDrug} (+15%)`);
      } else {
        // Fuzzy drug match
        const drugSim = calculateBigramSimilarity(candDrug, exDrug);
        if (drugSim >= 0.5) {
          score += 8;
          reasons.push(`Thuốc/Can thiệp tương đồng (${(drugSim*100).toFixed(0)}%, +8%)`);
        }
      }
    }

    // 7. Cross-field: primaryEndpoint, population, design (+0-20)
    const cf = crossFieldScore(candidate, existing);
    if (cf.score > 0) {
      score += cf.score;
      cf.reasons.forEach(r => reasons.push(r));
    }

    // 8. Summary / keyResults Jaccard (0-10)
    const candSumTokens = getTitleTokenSet(candidate.summary || candidate.keyResults || '');
    const exSumTokens = getTitleTokenSet(existing.summary || existing.keyResults || '');
    const summaryJaccard = calculateSetJaccard(candSumTokens, exSumTokens);
    if (summaryJaccard >= 0.2) {
      const summaryBonus = Math.min(10, Math.round(summaryJaccard * 12));
      score += summaryBonus;
      reasons.push(`Tóm tắt/Kết quả tương đồng (Jaccard ${(summaryJaccard*100).toFixed(0)}%, +${summaryBonus}%)`);
    }

    // Chuẩn hóa về 100
    score = Math.min(100, Math.round(score));

    if (score > highestScore) {
      highestScore = score;
      bestMatch = existing;
      bestReasons = reasons;
    }
  }

  const isDup = highestScore >= minScore;
  let level: 'none' | 'near-similar' | 'moderate' | 'high' | 'exact' = 'none';
  if (highestScore >= 95) level = 'exact';
  else if (highestScore >= 75) level = 'high';
  else if (highestScore >= 55) level = 'moderate';
  else if (highestScore >= 38) level = 'near-similar';

  return {
    isDuplicate: isDup,
    score: highestScore,
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

export function getSyncStats(): {
  staticCount: number;
  customCount: number;
  deletedCount: number;
  totalCount: number;
  bookmarkedCount: number;
} {
  const sampleStudies: Study[] = (window.SAMPLE_STUDIES && window.SAMPLE_STUDIES.length > 0)
    ? window.SAMPLE_STUDIES
    : (SAMPLE_STUDIES && SAMPLE_STUDIES.length > 0 ? SAMPLE_STUDIES : []);

  let customCount = 0;
  try {
    const rawCustom = localStorage.getItem('cliniportal_custom_studies');
    if (rawCustom) {
      const parsed = JSON.parse(rawCustom);
      if (Array.isArray(parsed)) customCount = parsed.length;
    }
  } catch (e) {}

  let deletedCount = 0;
  try {
    const rawDel = localStorage.getItem('cliniportal_deleted_study_ids');
    if (rawDel) {
      const parsed = JSON.parse(rawDel);
      if (Array.isArray(parsed)) deletedCount = parsed.length;
    }
  } catch (e) {}

  const currentTotal = (window.studies || []).length;
  const bookmarked = (window.studies || []).filter(s => s.bookmarked).length;

  return {
    staticCount: sampleStudies.length,
    customCount,
    deletedCount,
    totalCount: currentTotal,
    bookmarkedCount: bookmarked
  };
}

export async function forceRefreshFromGitHub(options?: { resetLocalDelta?: boolean }): Promise<void> {
  if (typeof window.showMedicalToast === 'function') {
    window.showMedicalToast({
      type: 'info',
      title: 'Đang làm mới dữ liệu từ GitHub',
      message: 'Đang dọn sạch Cache và nạp kho tài liệu mới nhất từ GitHub...'
    });
  }

  // 1. Clear Service Worker caches
  if ('caches' in window) {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
      console.log('[Sync] Đã xóa Service Worker cache:', keys);
    } catch (e) {
      console.warn('[Sync] Không thể xóa caches:', e);
    }
  }

  // 2. Clear & update service worker registrations
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        if (reg.active) {
          reg.active.postMessage({ action: 'CLEAR_CACHE' });
          reg.active.postMessage({ action: 'SKIP_WAITING' });
        }
        await reg.update();
      }
    } catch (e) {}
  }

  // 3. Xóa dữ liệu cục bộ nếu được yêu cầu (hard reset)
  if (options?.resetLocalDelta) {
    try {
      localStorage.removeItem('cliniportal_deleted_study_ids');
      localStorage.removeItem('cliniportal_custom_studies');
      localStorage.removeItem('clinicalGuidelines');
      localStorage.removeItem('internalMedicineStudies');
    } catch (e) {}
  }

  // 4. Force reload với tham số _sync để phá vỡ mọi tầng browser cache
  setTimeout(() => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('_sync', Date.now().toString());
    window.location.href = currentUrl.toString();
  }, 400);
}

export function resetAllLocalOverrides(): void {
  try {
    localStorage.removeItem('cliniportal_deleted_study_ids');
    localStorage.removeItem('cliniportal_custom_studies');
    localStorage.removeItem('clinicalGuidelines');
    localStorage.removeItem('internalMedicineStudies');
    loadStudies();
    if (typeof (window as any).renderTable === 'function') {
      (window as any).renderTable();
    }
    if (typeof window.showMedicalToast === 'function') {
      window.showMedicalToast({
        type: 'success',
        title: 'Khôi phục kho gốc thành công',
        message: 'Đã xóa toàn bộ bài ẩn/xóa cục bộ. Kho tài liệu đã trở về nguyên bản 100% từ GitHub!'
      });
    }
  } catch (e) {
    console.error('[Sync] Lỗi khi reset local storage:', e);
  }
}

// Gắn toàn bộ APIs lên window để đảm bảo tương thích 100%
if (typeof window !== 'undefined') {
  window.resolveStudyFile = resolveStudyFile;
  window.getIcd10Name = getIcd10Name;
  window.showMedicalToast = showMedicalToast;
  window.dbSaveStudy = dbSaveStudy;
  window.dbDeleteStudy = dbDeleteStudy;
  window.normalizeMedicalTitle = normalizeMedicalTitle;
  window.normalizeOrgName = normalizeOrgName;
  window.detectStudyDuplicate = detectStudyDuplicate;
  window.batchCheckDuplicates = batchCheckDuplicates;
  window.getBigramSet = getBigramSet;
  window.getDeletedStudyIds = getDeletedStudyIds;
  window.saveDeletedStudyId = saveDeletedStudyId;
  window.removeDeletedStudyId = removeDeletedStudyId;
  window.isStudyDeleted = isStudyDeleted;
  window.extractCoreKey = extractCoreKey;
  window.isPartVariation = isPartVariation;
  window.processStudyFields = processStudyFields;
  window.processAndDeduplicateStudies = processAndDeduplicateStudies;
  window.loadStudies = loadStudies;
  window.saveStudies = saveStudies;
  window.generateId = generateId;
  window.dispatchSyncStatus = dispatchSyncStatus;
  window.backupCustomStudies = backupCustomStudies;
  window.restoreCustomStudiesBackup = restoreCustomStudiesBackup;
  window.validateStudySchema = validateStudySchema;
  window.getSyncStats = getSyncStats;
  window.forceRefreshFromGitHub = forceRefreshFromGitHub;
  window.resetAllLocalOverrides = resetAllLocalOverrides;
}
