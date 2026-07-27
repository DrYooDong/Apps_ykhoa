/**
 * DocSpace Storage Engine
 * Quản lý toàn bộ dữ liệu cá nhân bác sĩ qua localStorage
 * Key pattern: dsp_<profileId>_<store>
 */

import {
  DoctorProfile,
  SBARRecord,
  OnCallShift,
  OnCallPatient,
  CaseRecord,
  PersonalNote,
  DrugJournalEntry,
  PersonalProtocol,
  QuickLink,
  DocSpaceSnapshot,
  PatientFlag,
  DEFAULT_QUICK_LINKS,
  DOCSPACE_VERSION,
} from './types';

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function uuid(): string {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function now(): string {
  return new Date().toISOString();
}

function storageKey(profileId: string, store: string): string {
  return `dsp_${profileId}_${store}`;
}

function load<T>(profileId: string, store: string): T[] {
  try {
    const raw = localStorage.getItem(storageKey(profileId, store));
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function save<T>(profileId: string, store: string, data: T[]): void {
  localStorage.setItem(storageKey(profileId, store), JSON.stringify(data));
}

// ─────────────────────────────────────────────
// PROFILE MANAGEMENT
// ─────────────────────────────────────────────

const PROFILE_LIST_KEY = 'dsp_profiles';
const ACTIVE_PROFILE_KEY = 'dsp_active_profile';

export function getAllProfiles(): DoctorProfile[] {
  try {
    const raw = localStorage.getItem(PROFILE_LIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveProfile(profile: DoctorProfile): void {
  const profiles = getAllProfiles();
  const idx = profiles.findIndex(p => p.id === profile.id);
  if (idx >= 0) {
    profiles[idx] = profile;
  } else {
    profiles.push(profile);
  }
  localStorage.setItem(PROFILE_LIST_KEY, JSON.stringify(profiles));
}

export function createProfile(id: string, displayName: string, specialty?: string): DoctorProfile {
  const profile: DoctorProfile = {
    id: id.trim(),
    displayName: displayName.trim(),
    specialty,
    createdAt: now(),
    lastActiveAt: now(),
    quickLinks: [...DEFAULT_QUICK_LINKS],
  };
  saveProfile(profile);
  setActiveProfile(id);
  return profile;
}

const URL_MIGRATION_MAP: Record<string, string> = {
  '#/calculators/abg-studio': '#/calculators/renal-dg-abg',
  '#/calculators/egfr': '#/calculators/renal-renal-function',
  '#/approaches/soc-nhiem-khuan': '#/ebm/guidelines-kho-guidelines-phac-do-soc-nhiem-khuan-sepsis3',
  '#/approaches/kho-tho-cap': '#/approaches/symptoms-than-phien-ho-hap-tim-mach-tc-khotho',
  '#/approaches/dau-nguc-cap': '#/approaches/symptoms-than-phien-ho-hap-tim-mach-tc-daunguc',
  '#/pharmacology/khang-sinh': '#/pharmacology/tools-tra-cuu-thuoc',
  '#/pharmacology/van-mach': '#/pharmacology/tools-ma-tran-tuong-tac',
  '#/skills/dat-duong-tm-trung-tam': '#/skills/can-lam-sang-doc-ecg-co-ban',
  '#/skills/dat-tm-trung-tam': '#/skills/can-lam-sang-doc-ecg-co-ban',
};

export function getProfile(id: string): DoctorProfile | null {
  const profile = getAllProfiles().find(p => p.id === id) || null;
  if (profile && profile.quickLinks) {
    let modified = false;
    profile.quickLinks = profile.quickLinks.map(link => {
      if (URL_MIGRATION_MAP[link.href]) {
        modified = true;
        return { ...link, href: URL_MIGRATION_MAP[link.href] };
      }
      return link;
    });
    if (modified) {
      saveProfile(profile);
    }
  }
  return profile;
}

export function setActiveProfile(id: string): void {
  localStorage.setItem(ACTIVE_PROFILE_KEY, id);
  // Update lastActiveAt
  const profile = getProfile(id);
  if (profile) {
    profile.lastActiveAt = now();
    saveProfile(profile);
  }
}

export function getActiveProfileId(): string | null {
  return localStorage.getItem(ACTIVE_PROFILE_KEY);
}

export function getActiveProfile(): DoctorProfile | null {
  const id = getActiveProfileId();
  return id ? getProfile(id) : null;
}

export function deleteProfile(id: string): void {
  // Remove all data stores for this profile
  const keys = Object.keys(localStorage).filter(k => k.startsWith(`dsp_${id}_`));
  keys.forEach(k => localStorage.removeItem(k));
  // Remove from profile list
  const profiles = getAllProfiles().filter(p => p.id !== id);
  localStorage.setItem(PROFILE_LIST_KEY, JSON.stringify(profiles));
  // Clear active if it was this profile
  if (getActiveProfileId() === id) {
    localStorage.removeItem(ACTIVE_PROFILE_KEY);
  }
}

export function updateQuickLinks(profileId: string, links: QuickLink[]): void {
  const profile = getProfile(profileId);
  if (!profile) return;
  profile.quickLinks = links;
  saveProfile(profile);
}

// ─────────────────────────────────────────────
// SBAR
// ─────────────────────────────────────────────

export function getAllSBARs(profileId: string): SBARRecord[] {
  return load<SBARRecord>(profileId, 'sbars').sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function saveSBAR(profileId: string, data: Omit<SBARRecord, 'id' | 'doctorId' | 'createdAt' | 'updatedAt'>): SBARRecord {
  const records = load<SBARRecord>(profileId, 'sbars');
  const record: SBARRecord = {
    ...data,
    id: uuid(),
    doctorId: profileId,
    createdAt: now(),
    updatedAt: now(),
  };
  records.unshift(record);
  save(profileId, 'sbars', records);
  return record;
}

export function updateSBAR(profileId: string, id: string, data: Partial<SBARRecord>): void {
  const records = load<SBARRecord>(profileId, 'sbars');
  const idx = records.findIndex(r => r.id === id);
  if (idx >= 0) {
    records[idx] = { ...records[idx], ...data, updatedAt: now() };
    save(profileId, 'sbars', records);
  }
}

export function deleteSBAR(profileId: string, id: string): void {
  const records = load<SBARRecord>(profileId, 'sbars').filter(r => r.id !== id);
  save(profileId, 'sbars', records);
}

export function getSBARById(profileId: string, id: string): SBARRecord | null {
  return load<SBARRecord>(profileId, 'sbars').find(r => r.id === id) || null;
}

// ─────────────────────────────────────────────
// ON-CALL SHIFTS
// ─────────────────────────────────────────────

export function getAllShifts(profileId: string): OnCallShift[] {
  return load<OnCallShift>(profileId, 'shifts').sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function createShift(profileId: string, date: string, unit: string): OnCallShift {
  const shifts = load<OnCallShift>(profileId, 'shifts');
  const shift: OnCallShift = {
    id: uuid(),
    doctorId: profileId,
    date,
    unit,
    patients: [],
    createdAt: now(),
  };
  shifts.unshift(shift);
  save(profileId, 'shifts', shifts);
  return shift;
}

export function getShiftById(profileId: string, shiftId: string): OnCallShift | null {
  return load<OnCallShift>(profileId, 'shifts').find(s => s.id === shiftId) || null;
}

export function addPatientToShift(
  profileId: string,
  shiftId: string,
  data: { bed: string; diagnosis: string; note: string; flag?: PatientFlag }
): OnCallPatient | null {
  const shifts = load<OnCallShift>(profileId, 'shifts');
  const shift = shifts.find(s => s.id === shiftId);
  if (!shift) return null;

  const patient: OnCallPatient = {
    id: uuid(),
    bed: data.bed,
    diagnosis: data.diagnosis,
    note: data.note,
    flag: data.flag,
    addedAt: now(),
    updatedAt: now(),
  };
  shift.patients.push(patient);
  save(profileId, 'shifts', shifts);
  return patient;
}

export function updatePatient(
  profileId: string,
  shiftId: string,
  patientId: string,
  data: Partial<OnCallPatient>
): void {
  const shifts = load<OnCallShift>(profileId, 'shifts');
  const shift = shifts.find(s => s.id === shiftId);
  if (!shift) return;
  const idx = shift.patients.findIndex(p => p.id === patientId);
  if (idx >= 0) {
    shift.patients[idx] = { ...shift.patients[idx], ...data, updatedAt: now() };
    save(profileId, 'shifts', shifts);
  }
}

export function removePatient(profileId: string, shiftId: string, patientId: string): void {
  const shifts = load<OnCallShift>(profileId, 'shifts');
  const shift = shifts.find(s => s.id === shiftId);
  if (!shift) return;
  shift.patients = shift.patients.filter(p => p.id !== patientId);
  save(profileId, 'shifts', shifts);
}

export function closeShift(profileId: string, shiftId: string, notes?: string): void {
  const shifts = load<OnCallShift>(profileId, 'shifts');
  const shift = shifts.find(s => s.id === shiftId);
  if (!shift) return;
  shift.closedAt = now();
  if (notes !== undefined) shift.notes = notes;
  save(profileId, 'shifts', shifts);
}

export function deleteShift(profileId: string, shiftId: string): void {
  const shifts = load<OnCallShift>(profileId, 'shifts').filter(s => s.id !== shiftId);
  save(profileId, 'shifts', shifts);
}

// ─────────────────────────────────────────────
// CASE LOGGER
// ─────────────────────────────────────────────

export function getAllCases(profileId: string): CaseRecord[] {
  return load<CaseRecord>(profileId, 'cases').sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function saveCase(profileId: string, data: Omit<CaseRecord, 'id' | 'doctorId' | 'createdAt'>): CaseRecord {
  const records = load<CaseRecord>(profileId, 'cases');
  const record: CaseRecord = {
    ...data,
    id: uuid(),
    doctorId: profileId,
    createdAt: now(),
  };
  records.unshift(record);
  save(profileId, 'cases', records);
  return record;
}

export function deleteCase(profileId: string, id: string): void {
  const records = load<CaseRecord>(profileId, 'cases').filter(r => r.id !== id);
  save(profileId, 'cases', records);
}

// ─────────────────────────────────────────────
// PERSONAL NOTEPAD (Phase 2)
// ─────────────────────────────────────────────

export function getAllNotes(profileId: string): PersonalNote[] {
  return load<PersonalNote>(profileId, 'notes').sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function getNoteById(profileId: string, id: string): PersonalNote | null {
  return load<PersonalNote>(profileId, 'notes').find(n => n.id === id) || null;
}

export function saveNote(profileId: string, data: Omit<PersonalNote, 'id' | 'doctorId' | 'createdAt' | 'updatedAt'>): PersonalNote {
  const records = load<PersonalNote>(profileId, 'notes');
  const record: PersonalNote = {
    ...data,
    id: uuid(),
    doctorId: profileId,
    createdAt: now(),
    updatedAt: now(),
  };
  records.unshift(record);
  save(profileId, 'notes', records);
  return record;
}

export function updateNote(profileId: string, id: string, data: Partial<PersonalNote>): void {
  const records = load<PersonalNote>(profileId, 'notes');
  const idx = records.findIndex(n => n.id === id);
  if (idx >= 0) {
    records[idx] = { ...records[idx], ...data, updatedAt: now() };
    save(profileId, 'notes', records);
  }
}

export function deleteNote(profileId: string, id: string): void {
  const records = load<PersonalNote>(profileId, 'notes').filter(n => n.id !== id);
  save(profileId, 'notes', records);
}

// ─────────────────────────────────────────────
// DRUG JOURNAL (Phase 2)
// ─────────────────────────────────────────────

export function getAllDrugEntries(profileId: string): DrugJournalEntry[] {
  return load<DrugJournalEntry>(profileId, 'drugs').sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getDrugEntryById(profileId: string, id: string): DrugJournalEntry | null {
  return load<DrugJournalEntry>(profileId, 'drugs').find(d => d.id === id) || null;
}

export function saveDrugEntry(profileId: string, data: Omit<DrugJournalEntry, 'id' | 'doctorId' | 'createdAt'>): DrugJournalEntry {
  const records = load<DrugJournalEntry>(profileId, 'drugs');
  const record: DrugJournalEntry = { ...data, id: uuid(), doctorId: profileId, createdAt: now() };
  records.unshift(record);
  save(profileId, 'drugs', records);
  return record;
}

export function updateDrugEntry(profileId: string, id: string, data: Partial<DrugJournalEntry>): void {
  const records = load<DrugJournalEntry>(profileId, 'drugs');
  const idx = records.findIndex(d => d.id === id);
  if (idx >= 0) {
    records[idx] = { ...records[idx], ...data };
    save(profileId, 'drugs', records);
  }
}

export function deleteDrugEntry(profileId: string, id: string): void {
  const records = load<DrugJournalEntry>(profileId, 'drugs').filter(d => d.id !== id);
  save(profileId, 'drugs', records);
}

// ─────────────────────────────────────────────
// PERSONAL PROTOCOL (Phase 2)
// ─────────────────────────────────────────────

export function getAllProtocols(profileId: string): PersonalProtocol[] {
  return load<PersonalProtocol>(profileId, 'protocols').sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function getProtocolById(profileId: string, id: string): PersonalProtocol | null {
  return load<PersonalProtocol>(profileId, 'protocols').find(p => p.id === id) || null;
}

export function saveProtocol(profileId: string, data: Omit<PersonalProtocol, 'id' | 'doctorId' | 'createdAt' | 'updatedAt'>): PersonalProtocol {
  const records = load<PersonalProtocol>(profileId, 'protocols');
  const record: PersonalProtocol = {
    ...data,
    id: uuid(),
    doctorId: profileId,
    createdAt: now(),
    updatedAt: now(),
  };
  records.unshift(record);
  save(profileId, 'protocols', records);
  return record;
}

export function updateProtocol(profileId: string, id: string, data: Partial<PersonalProtocol>): void {
  const records = load<PersonalProtocol>(profileId, 'protocols');
  const idx = records.findIndex(p => p.id === id);
  if (idx >= 0) {
    records[idx] = { ...records[idx], ...data, updatedAt: now() };
    save(profileId, 'protocols', records);
  }
}

export function deleteProtocol(profileId: string, id: string): void {
  const records = load<PersonalProtocol>(profileId, 'protocols').filter(p => p.id !== id);
  save(profileId, 'protocols', records);
}

// ─────────────────────────────────────────────
// EXPORT / IMPORT
// ─────────────────────────────────────────────

export function exportProfile(profileId: string): void {
  const profile = getProfile(profileId);
  if (!profile) return;

  const snapshot: DocSpaceSnapshot = {
    version: DOCSPACE_VERSION,
    exportedAt: now(),
    profile,
    sbars: getAllSBARs(profileId),
    shifts: getAllShifts(profileId),
    cases: getAllCases(profileId),
    notes: getAllNotes(profileId),
    drugJournal: getAllDrugEntries(profileId),
    protocols: getAllProtocols(profileId),
  };

  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `docspace_${profileId}_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importProfile(file: File): Promise<DoctorProfile> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const snapshot: DocSpaceSnapshot = JSON.parse(e.target?.result as string);

        // Restore profile
        saveProfile(snapshot.profile);

        // Restore all data stores
        const pid = snapshot.profile.id;
        save(pid, 'sbars', snapshot.sbars || []);
        save(pid, 'shifts', snapshot.shifts || []);
        save(pid, 'cases', snapshot.cases || []);
        save(pid, 'notes', snapshot.notes || []);
        save(pid, 'drugs', snapshot.drugJournal || []);
        save(pid, 'protocols', snapshot.protocols || []);

        setActiveProfile(pid);
        resolve(snapshot.profile);
      } catch (err) {
        reject(new Error('File không hợp lệ hoặc bị hỏng.'));
      }
    };
    reader.onerror = () => reject(new Error('Không thể đọc file.'));
    reader.readAsText(file);
  });
}

// ─────────────────────────────────────────────
// STATS HELPER
// ─────────────────────────────────────────────

export interface DocSpaceStats {
  sbarCount: number;
  shiftCount: number;
  caseCount: number;
  noteCount: number;
  drugCount: number;
  protocolCount: number;
  lastBackupDays: number | null;
}

export function getStats(profileId: string): DocSpaceStats {
  return {
    sbarCount: getAllSBARs(profileId).length,
    shiftCount: getAllShifts(profileId).length,
    caseCount: getAllCases(profileId).length,
    noteCount: getAllNotes(profileId).length,
    drugCount: getAllDrugEntries(profileId).length,
    protocolCount: getAllProtocols(profileId).length,
    lastBackupDays: null,
  };
}
