import { SoapClinicalExperience } from '../types.ts';
import { SAMPLE_SOAP_EXPERIENCES } from '../data/soapSeedData.ts';
import { isSupabaseConfigured, supabase } from './supabase.ts';

const SOAP_STORAGE_KEY = 'cliniportal_soap_experiences_v1';

// ----------------------------------------------------------------------
// Local Storage Helper Functions
// ----------------------------------------------------------------------
export function getLocalSoapExperiences(): SoapClinicalExperience[] {
  try {
    const raw = localStorage.getItem(SOAP_STORAGE_KEY);
    if (!raw) {
      // Initialize with sample experiences
      localStorage.setItem(SOAP_STORAGE_KEY, JSON.stringify(SAMPLE_SOAP_EXPERIENCES));
      return SAMPLE_SOAP_EXPERIENCES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return SAMPLE_SOAP_EXPERIENCES;
  } catch (err) {
    console.error('Error reading soap experiences from localStorage:', err);
    return SAMPLE_SOAP_EXPERIENCES;
  }
}

export function saveLocalSoapExperiences(items: SoapClinicalExperience[]): void {
  try {
    localStorage.setItem(SOAP_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Error saving soap experiences to localStorage:', err);
  }
}

// ----------------------------------------------------------------------
// Database Mapping Helpers (camelCase <-> snake_case)
// ----------------------------------------------------------------------
export interface SoapDbRow {
  id: string;
  title: string;
  specialty: string;
  experience_level: string;
  tags: any;
  demographic_context: string | null;
  author_doctor: string | null;
  is_favorite: boolean;
  view_count: number;
  source_reference: string | null;
  clinical_context: string | null;
  difficulty_rating: number;
  outcome_notes: string | null;
  s: any;
  o: any;
  a: any;
  p: any;
  created_at: string;
  updated_at: string;
}

function mapRowToExperience(row: SoapDbRow): SoapClinicalExperience {
  return {
    id: row.id,
    title: row.title,
    specialty: row.specialty,
    experienceLevel: (row.experience_level as any) || 'essential',
    tags: Array.isArray(row.tags) ? row.tags : [],
    demographicContext: row.demographic_context || '',
    authorDoctor: row.author_doctor || 'Bác sĩ lâm sàng',
    isFavorite: Boolean(row.is_favorite),
    syncStatus: 'synced',
    viewCount: row.view_count || 0,
    sourceReference: row.source_reference || undefined,
    clinicalContext: row.clinical_context || undefined,
    difficultyRating: (row.difficulty_rating as any) || 3,
    outcomeNotes: row.outcome_notes || undefined,
    createdAt: row.created_at ? row.created_at.slice(0, 10) : new Date().toISOString().slice(0, 10),
    updatedAt: row.updated_at || new Date().toISOString(),
    s: row.s || {},
    o: row.o || {},
    a: row.a || {},
    p: row.p || {},
  };
}

function mapExperienceToRow(item: SoapClinicalExperience): SoapDbRow {
  const now = new Date().toISOString();
  return {
    id: item.id,
    title: item.title,
    specialty: item.specialty,
    experience_level: item.experienceLevel,
    tags: item.tags || [],
    demographic_context: item.demographicContext || null,
    author_doctor: item.authorDoctor || 'Bác sĩ lâm sàng',
    is_favorite: Boolean(item.isFavorite),
    view_count: item.viewCount || 0,
    source_reference: item.sourceReference || null,
    clinical_context: item.clinicalContext || null,
    difficulty_rating: item.difficultyRating || 3,
    outcome_notes: item.outcomeNotes || null,
    s: item.s,
    o: item.o,
    a: item.a,
    p: item.p,
    created_at: item.createdAt.includes('T') ? item.createdAt : `${item.createdAt}T00:00:00Z`,
    updated_at: item.updatedAt || now,
  };
}

// ----------------------------------------------------------------------
// CRUD API Operations (Offline-First with Supabase Persistence)
// ----------------------------------------------------------------------

export interface SoapFilterOptions {
  specialty?: string;
  level?: string;
  query?: string;
  favoriteOnly?: boolean;
  syncStatus?: 'all' | 'local' | 'synced' | 'conflict';
  difficulty?: number;
  sortBy?: 'newest' | 'oldest' | 'views' | 'favorite';
}

export async function soapGetAll(filters?: SoapFilterOptions): Promise<SoapClinicalExperience[]> {
  let list = getLocalSoapExperiences();

  if (filters) {
    if (filters.specialty && filters.specialty !== 'Tất cả chuyên khoa') {
      list = list.filter((c) => c.specialty === filters.specialty);
    }
    if (filters.level && filters.level !== 'all') {
      list = list.filter((c) => c.experienceLevel === filters.level);
    }
    if (filters.favoriteOnly) {
      list = list.filter((c) => c.isFavorite);
    }
    if (filters.syncStatus && filters.syncStatus !== 'all') {
      list = list.filter((c) => (c.syncStatus || 'local') === filters.syncStatus);
    }
    if (filters.difficulty && filters.difficulty > 0) {
      list = list.filter((c) => (c.difficultyRating || 3) === filters.difficulty);
    }
    if (filters.query && filters.query.trim()) {
      const q = filters.query.trim().toLowerCase();
      list = list.filter((c) => {
        return (
          c.title.toLowerCase().includes(q) ||
          c.a.icd10.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q)) ||
          c.demographicContext.toLowerCase().includes(q) ||
          c.s.chiefComplaint.toLowerCase().includes(q) ||
          (c.clinicalContext && c.clinicalContext.toLowerCase().includes(q))
        );
      });
    }

    // Sorting
    if (filters.sortBy === 'views') {
      list.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
    } else if (filters.sortBy === 'oldest') {
      list.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    } else if (filters.sortBy === 'favorite') {
      list.sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));
    } else {
      // Default: newest first
      list.sort((a, b) => (b.updatedAt || b.createdAt).localeCompare(a.updatedAt || a.createdAt));
    }
  }

  return list;
}

export async function soapGetById(id: string): Promise<SoapClinicalExperience | null> {
  const list = getLocalSoapExperiences();
  const found = list.find((c) => c.id === id);
  return found || null;
}

export async function soapCreate(
  itemData: Omit<SoapClinicalExperience, 'id' | 'createdAt' | 'updatedAt' | 'syncStatus'> & {
    id?: string;
    createdAt?: string;
  }
): Promise<SoapClinicalExperience> {
  const list = getLocalSoapExperiences();
  const now = new Date().toISOString();
  const newId = itemData.id || `soap-${Date.now()}`;

  const newEntry: SoapClinicalExperience = {
    ...itemData,
    id: newId,
    createdAt: itemData.createdAt || now.slice(0, 10),
    updatedAt: now,
    syncStatus: 'local',
    viewCount: itemData.viewCount || 0,
    difficultyRating: itemData.difficultyRating || 3,
  };

  const updatedList = [newEntry, ...list.filter((x) => x.id !== newId)];
  saveLocalSoapExperiences(updatedList);

  // Proactively attempt push to Supabase if connected
  if (isSupabaseConfigured && supabase) {
    try {
      const row = mapExperienceToRow(newEntry);
      const { error } = await supabase.from('soap_clinical_experiences').upsert(row);
      if (!error) {
        newEntry.syncStatus = 'synced';
        const syncedList = updatedList.map((x) => (x.id === newId ? { ...x, syncStatus: 'synced' as const } : x));
        saveLocalSoapExperiences(syncedList);
      }
    } catch (e) {
      console.warn('Silent fallback: Supabase write failed, kept in local', e);
    }
  }

  return newEntry;
}

export async function soapUpdate(
  id: string,
  updates: Partial<SoapClinicalExperience>
): Promise<SoapClinicalExperience> {
  const list = getLocalSoapExperiences();
  const idx = list.findIndex((c) => c.id === id);
  if (idx === -1) {
    throw new Error(`Ca lâm sàng có mã "${id}" không tồn tại.`);
  }

  const now = new Date().toISOString();
  const updatedItem: SoapClinicalExperience = {
    ...list[idx],
    ...updates,
    id, // Immutable ID
    updatedAt: now,
    syncStatus: 'local', // Set to local until synced
  };

  list[idx] = updatedItem;
  saveLocalSoapExperiences([...list]);

  // Attempt sync to Supabase
  if (isSupabaseConfigured && supabase) {
    try {
      const row = mapExperienceToRow(updatedItem);
      const { error } = await supabase.from('soap_clinical_experiences').upsert(row);
      if (!error) {
        updatedItem.syncStatus = 'synced';
        list[idx] = { ...updatedItem };
        saveLocalSoapExperiences([...list]);
      }
    } catch (e) {
      console.warn('Silent fallback: Supabase update failed, saved locally', e);
    }
  }

  return updatedItem;
}

export async function soapDelete(id: string): Promise<boolean> {
  const list = getLocalSoapExperiences();
  const nextList = list.filter((c) => c.id !== id);
  saveLocalSoapExperiences(nextList);

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('soap_clinical_experiences').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase delete warning:', e);
    }
  }

  return true;
}

export async function soapToggleFavorite(id: string): Promise<SoapClinicalExperience> {
  const list = getLocalSoapExperiences();
  const target = list.find((c) => c.id === id);
  if (!target) throw new Error('Ca lâm sàng không tìm thấy.');
  return soapUpdate(id, { isFavorite: !target.isFavorite });
}

export async function soapIncrementViewCount(id: string): Promise<SoapClinicalExperience> {
  const list = getLocalSoapExperiences();
  const target = list.find((c) => c.id === id);
  if (!target) throw new Error('Ca lâm sàng không tìm thấy.');
  const newCount = (target.viewCount || 0) + 1;
  return soapUpdate(id, { viewCount: newCount });
}

export async function soapImportBulk(items: SoapClinicalExperience[]): Promise<SoapClinicalExperience[]> {
  if (!Array.isArray(items) || items.length === 0) return [];
  const current = getLocalSoapExperiences();
  const currentMap = new Map(current.map((c) => [c.id, c]));

  items.forEach((item) => {
    currentMap.set(item.id, {
      ...item,
      updatedAt: item.updatedAt || new Date().toISOString(),
      syncStatus: item.syncStatus || 'local',
    });
  });

  const merged = Array.from(currentMap.values());
  saveLocalSoapExperiences(merged);
  return merged;
}

export async function soapExportAll(): Promise<SoapClinicalExperience[]> {
  return getLocalSoapExperiences();
}

// ----------------------------------------------------------------------
// Supabase Sync Operations (Cloud <-> Local Offline First)
// ----------------------------------------------------------------------

export async function soapSyncToSupabase(): Promise<{
  synced: number;
  failed: number;
  message: string;
}> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      synced: 0,
      failed: 0,
      message: 'Chưa cấu hình Supabase URL & Key. Dữ liệu đang được lưu an toàn tại LocalStorage.',
    };
  }

  const list = getLocalSoapExperiences();
  const unsynced = list.filter((c) => c.syncStatus !== 'synced');

  if (unsynced.length === 0) {
    return {
      synced: 0,
      failed: 0,
      message: 'Tất cả các ca lâm sàng đều đã được đồng bộ với Supabase.',
    };
  }

  let syncedCount = 0;
  let failedCount = 0;

  for (const item of unsynced) {
    try {
      const row = mapExperienceToRow(item);
      const { error } = await supabase.from('soap_clinical_experiences').upsert(row);
      if (error) {
        failedCount++;
      } else {
        item.syncStatus = 'synced';
        syncedCount++;
      }
    } catch {
      failedCount++;
    }
  }

  saveLocalSoapExperiences([...list]);

  return {
    synced: syncedCount,
    failed: failedCount,
    message: `Đã đồng bộ thành công ${syncedCount} ca lên Supabase.${failedCount > 0 ? ` Có ${failedCount} ca gặp lỗi.` : ''}`,
  };
}

export async function soapPullFromSupabase(): Promise<{
  pulled: number;
  conflicts: number;
  message: string;
}> {
  if (!isSupabaseConfigured || !supabase) {
    return {
      pulled: 0,
      conflicts: 0,
      message: 'Chưa cấu hình Supabase. Vui lòng kiểm tra file cấu hình .env hoặc biến môi trường.',
    };
  }

  try {
    const { data, error } = await supabase
      .from('soap_clinical_experiences')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) {
      return { pulled: 0, conflicts: 0, message: 'Kho lưu trữ trên Supabase hiện chưa có dữ liệu nào.' };
    }

    const localList = getLocalSoapExperiences();
    const localMap = new Map(localList.map((c) => [c.id, c]));
    let pulledCount = 0;
    let conflictCount = 0;

    data.forEach((row: SoapDbRow) => {
      const remoteExp = mapRowToExperience(row);
      const localExp = localMap.get(remoteExp.id);

      if (!localExp) {
        // New item from remote
        localMap.set(remoteExp.id, remoteExp);
        pulledCount++;
      } else {
        // Conflict resolution: Last-Write-Wins based on updatedAt
        const localTime = new Date(localExp.updatedAt || localExp.createdAt).getTime();
        const remoteTime = new Date(remoteExp.updatedAt || remoteExp.createdAt).getTime();

        if (remoteTime > localTime) {
          localMap.set(remoteExp.id, remoteExp);
          pulledCount++;
        } else if (remoteTime < localTime && localExp.syncStatus !== 'synced') {
          // Local is newer but not synced
          conflictCount++;
        }
      }
    });

    const merged = Array.from(localMap.values());
    saveLocalSoapExperiences(merged);

    return {
      pulled: pulledCount,
      conflicts: conflictCount,
      message: `Đã cập nhật ${pulledCount} ca từ Supabase.${conflictCount > 0 ? ` Có ${conflictCount} ca local mới hơn chưa đẩy lên cloud.` : ''}`,
    };
  } catch (err: any) {
    console.error('Error pulling from Supabase:', err);
    return {
      pulled: 0,
      conflicts: 0,
      message: `Lỗi kết nối Supabase: ${err.message || 'Không thể kéo dữ liệu'}`,
    };
  }
}

export function getSoapSyncStats(): {
  total: number;
  synced: number;
  localOnly: number;
  favorites: number;
} {
  const list = getLocalSoapExperiences();
  const total = list.length;
  const synced = list.filter((c) => c.syncStatus === 'synced').length;
  const localOnly = list.filter((c) => c.syncStatus !== 'synced').length;
  const favorites = list.filter((c) => c.isFavorite).length;

  return { total, synced, localOnly, favorites };
}
