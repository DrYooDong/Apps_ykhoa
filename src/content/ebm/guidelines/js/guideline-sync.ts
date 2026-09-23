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
    // Khi đang trong môi trường SPA router (hash router hoặc pathname không kết thúc bằng guidelines.html)
    if (window.location.hash.startsWith('#/') || !window.location.pathname.endsWith('guidelines.html')) {
      return `#/ebm/kho-guidelines/${cleanSlug}`;
    }
    // Khi mở trực tiếp file guidelines.html độc lập trên trình duyệt/file://
    return `../../../../index.html#/ebm/kho-guidelines/${cleanSlug}`;
  }
  
  return `#/ebm/kho-guidelines/${cleanSlug}`;
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

  const sampleStudies: Study[] = window.SAMPLE_STUDIES || [];
  const validSlugs = new Set(sampleStudies.map(s => s.id));

  let rawList: any[] = [];
  try {
    const storedCustom = localStorage.getItem('cliniportal_custom_studies');
    if (storedCustom) {
      const parsed = JSON.parse(storedCustom);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Chỉ giữ lại các bài hợp lệ có trong danh mục chuẩn 1:1 với .mdx
        rawList = parsed.filter(item => item && item.id && validSlugs.has(item.id) && item.file);
      }
    }
  } catch (e) {}

  const combined = [...rawList, ...sampleStudies];
  window.studies = processAndDeduplicateStudies(combined);
  window.studies.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

  // Tự động đồng bộ dọn sạch rác cũ trong localStorage trên thiết bị
  try {
    localStorage.setItem('cliniportal_custom_studies', JSON.stringify(window.studies));
  } catch (e) {}
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
  window.showMedicalToast = showMedicalToast;
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
