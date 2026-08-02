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
  AISettings,
} from './types';
import { signRecord, verifyRecordIntegrity } from './features/audit-shield';

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
  // Thực tế có thể nên dùng soft delete hoặc confirm dialog từ UI.
  // Xóa cứng theo yêu cầu gốc, nhưng trong Phase 0 UI sẽ có window.confirm.
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

export function updateAISettings(profileId: string, settings: AISettings): void {
  const profile = getProfile(profileId);
  if (!profile) return;
  profile.aiSettings = settings;
  saveProfile(profile);
}

// ─────────────────────────────────────────────
// SBAR
// ─────────────────────────────────────────────

export async function getAllSBARs(profileId: string, includeDeleted = false): Promise<SBARRecord[]> {
  const records = load<SBARRecord>(profileId, 'sbars')
    .filter(r => includeDeleted || !r.deletedAt)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  
  const results = [];
  for (const r of records) {
    results.push({ ...r, isTampered: !(await verifyRecordIntegrity(r)) });
  }
  return results;
}

export async function saveSBAR(profileId: string, data: Omit<SBARRecord, 'id' | 'doctorId' | 'createdAt' | 'updatedAt' | 'auditLogs' | 'isLocked' | 'isTampered' | 'deletedAt'>): Promise<SBARRecord> {
  const records = load<SBARRecord>(profileId, 'sbars');
  const record: SBARRecord = await signRecord({
    ...data,
    id: uuid(),
    doctorId: profileId,
    createdAt: now(),
    updatedAt: now(),
    isLocked: false,
  }, 'create');
  records.unshift(record);
  save(profileId, 'sbars', records);
  return record;
}

export async function updateSBAR(profileId: string, id: string, data: Partial<SBARRecord>, isLockAction = false): Promise<void> {
  const records = load<SBARRecord>(profileId, 'sbars');
  const idx = records.findIndex(r => r.id === id);
  if (idx >= 0) {
    if (records[idx].isLocked) return; // Prevent modifying locked records
    let updatedRecord = { ...records[idx], ...data, updatedAt: now() };
    updatedRecord = await signRecord(updatedRecord, isLockAction ? 'lock' : 'update');
    records[idx] = updatedRecord;
    save(profileId, 'sbars', records);
  }
}

export function deleteSBAR(profileId: string, id: string): void {
  // Soft delete
  const records = load<SBARRecord>(profileId, 'sbars');
  const idx = records.findIndex(r => r.id === id);
  if (idx >= 0) {
    records[idx].deletedAt = now();
    save(profileId, 'sbars', records);
  }
}

export async function getSBARById(profileId: string, id: string): Promise<SBARRecord | null> {
  const record = load<SBARRecord>(profileId, 'sbars').find(r => r.id === id) || null;
  if (record) {
    record.isTampered = !(await verifyRecordIntegrity(record));
  }
  return record;
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

export async function getAllCases(profileId: string, includeDeleted = false): Promise<CaseRecord[]> {
  const records = load<CaseRecord>(profileId, 'cases')
    .filter(r => includeDeleted || !r.deletedAt)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
  const results = [];
  for (const r of records) {
    results.push({ ...r, isTampered: !(await verifyRecordIntegrity(r)) });
  }
  return results;
}

export async function saveCase(profileId: string, data: Omit<CaseRecord, 'id' | 'doctorId' | 'createdAt' | 'auditLogs' | 'isLocked' | 'isTampered' | 'deletedAt'>): Promise<CaseRecord> {
  const records = load<CaseRecord>(profileId, 'cases');
  const record: CaseRecord = await signRecord({
    ...data,
    id: uuid(),
    doctorId: profileId,
    createdAt: now(),
    isLocked: false,
  }, 'create');
  records.unshift(record);
  save(profileId, 'cases', records);
  return record;
}

export function deleteCase(profileId: string, id: string): void {
  // Soft delete
  const records = load<CaseRecord>(profileId, 'cases');
  const idx = records.findIndex(r => r.id === id);
  if (idx >= 0) {
    records[idx].deletedAt = now();
    save(profileId, 'cases', records);
  }
}

// ─────────────────────────────────────────────
// PERSONAL NOTEPAD (Phase 2)
// ─────────────────────────────────────────────

export function getAllNotes(profileId: string, includeDeleted = false): PersonalNote[] {
  return load<PersonalNote>(profileId, 'notes')
    .filter(r => includeDeleted || !r.deletedAt)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function getNoteById(profileId: string, id: string): PersonalNote | null {
  return load<PersonalNote>(profileId, 'notes').find(n => n.id === id && !n.deletedAt) || null;
}

export function saveNote(profileId: string, data: Omit<PersonalNote, 'id' | 'doctorId' | 'createdAt' | 'updatedAt' | 'deletedAt'>): PersonalNote {
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
  const records = load<PersonalNote>(profileId, 'notes');
  const idx = records.findIndex(r => r.id === id);
  if (idx >= 0) {
    records[idx].deletedAt = now();
    save(profileId, 'notes', records);
  }
}

// ─────────────────────────────────────────────
// DRUG JOURNAL (Phase 2)
// ─────────────────────────────────────────────

export function getAllDrugEntries(profileId: string, includeDeleted = false): DrugJournalEntry[] {
  return load<DrugJournalEntry>(profileId, 'drugs')
    .filter(r => includeDeleted || !r.deletedAt)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getDrugEntryById(profileId: string, id: string): DrugJournalEntry | null {
  return load<DrugJournalEntry>(profileId, 'drugs').find(d => d.id === id && !d.deletedAt) || null;
}

export function saveDrugEntry(profileId: string, data: Omit<DrugJournalEntry, 'id' | 'doctorId' | 'createdAt' | 'deletedAt'>): DrugJournalEntry {
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
  const records = load<DrugJournalEntry>(profileId, 'drugs');
  const idx = records.findIndex(r => r.id === id);
  if (idx >= 0) {
    records[idx].deletedAt = now();
    save(profileId, 'drugs', records);
  }
}

// ─────────────────────────────────────────────
// PERSONAL PROTOCOL (Phase 2)
// ─────────────────────────────────────────────

export function getAllProtocols(profileId: string, includeDeleted = false): PersonalProtocol[] {
  return load<PersonalProtocol>(profileId, 'protocols')
    .filter(r => includeDeleted || !r.deletedAt)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function getProtocolById(profileId: string, id: string): PersonalProtocol | null {
  return load<PersonalProtocol>(profileId, 'protocols').find(p => p.id === id && !p.deletedAt) || null;
}

export function saveProtocol(profileId: string, data: Omit<PersonalProtocol, 'id' | 'doctorId' | 'createdAt' | 'updatedAt' | 'deletedAt'>): PersonalProtocol {
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
  const records = load<PersonalProtocol>(profileId, 'protocols');
  const idx = records.findIndex(r => r.id === id);
  if (idx >= 0) {
    records[idx].deletedAt = now();
    save(profileId, 'protocols', records);
  }
}

// ─────────────────────────────────────────────
// SOAP DIGITAL WARD NOTEBOOK
// ─────────────────────────────────────────────

export function getAllSoapPatients(profileId: string, includeDeleted = false): SoapPatientRecord[] {
  const patients = load<SoapPatientRecord>(profileId, 'soaps')
    .filter(r => includeDeleted || !r.deletedAt)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  if (patients.length === 0 && !includeDeleted) {
    const today = new Date().toISOString().split('T')[0];
    // Seed initial mock patient if empty
    const mock: SoapPatientRecord = {
      id: 'mock-1',
      patientCode: 'G01',
      fullName: 'Nguyễn Văn A',
      age: 65,
      gender: 'nam',
      bedNumber: '12',
      medicalRecordNo: 'HS-10293',
      admissionDiagnosis: 'Viêm phổi thùy',
      currentDiagnosis: 'Viêm phổi thùy N4',
      isEmrEntered: true,
      soapStatus: 'da_lam',
      dayOfIllness: 4,
      sNotes: 'Hết sốt, còn ho húng hắng.',
      oNotes: 'Phổi giảm rấy ẩm 2 đáy. SpO2 97% (Khí trời).',
      aAssessment: 'Viêm phổi thùy N4 (Đáp ứng ĐT tốt).\nBiện luận: Hạ Kali máu mức độ trung bình.',
      pPlan: '1. Ceftriaxone 2g (IV) N4\n2. Bù Kaliclorua 0.5g x 2 viên (Uống)\n3. Tìm nguyên nhân hạ K+',
      clsOrders: [
        { id: '1', name: 'Công thức máu', isDone: true },
        { id: '2', name: 'Điện giải đồ', isDone: true }
      ],
      clsResults: [
        { id: 'r1', text: 'WBC 8.5, Neu 65%', alertLevel: 'normal' },
        { id: 'r2', text: 'K+ 2.8 mEq/L (Tụt)', alertLevel: 'high' }
      ],
      activeDate: today,
      dailyLogs: [
        {
          id: 'log-1',
          date: today,
          dayOfIllness: 4,
          sNotes: 'Hết sốt, còn ho húng hắng.',
          oNotes: 'Phổi giảm rấy ẩm 2 đáy. SpO2 97% (Khí trời).',
          aAssessment: 'Viêm phổi thùy N4 (Đáp ứng ĐT tốt).\nBiện luận: Hạ Kali máu mức độ trung bình.',
          pPlan: '1. Ceftriaxone 2g (IV) N4\n2. Bù Kaliclorua 0.5g x 2 viên (Uống)\n3. Tìm nguyên nhân hạ K+',
          clsOrders: [
            { id: '1', name: 'Công thức máu', isDone: true },
            { id: '2', name: 'Điện giải đồ', isDone: true }
          ],
          clsResults: [
            { id: 'r1', text: 'WBC 8.5, Neu 65%', alertLevel: 'normal' },
            { id: 'r2', text: 'K+ 2.8 mEq/L (Tụt)', alertLevel: 'high' }
          ],
          isEmrEntered: true,
          soapStatus: 'da_lam',
          createdAt: now(),
          updatedAt: now()
        }
      ],
      createdAt: now(),
      updatedAt: now(),
    };
    save(profileId, 'soaps', [mock]);
    return [mock];
  }

  // Auto ensure dailyLogs array exists
  patients.forEach(p => {
    if (!p.dailyLogs || p.dailyLogs.length === 0) {
      const pDate = p.createdAt ? p.createdAt.split('T')[0] : new Date().toISOString().split('T')[0];
      p.dailyLogs = [{
        id: `log-${p.id}`,
        date: pDate,
        dayOfIllness: p.dayOfIllness || 1,
        sNotes: p.sNotes || '',
        oNotes: p.oNotes || '',
        aAssessment: p.aAssessment || '',
        pPlan: p.pPlan || '',
        clsOrders: p.clsOrders || [],
        clsResults: p.clsResults || [],
        isEmrEntered: p.isEmrEntered || false,
        soapStatus: p.soapStatus || 'chua_lam',
        createdAt: p.createdAt || now(),
        updatedAt: p.updatedAt || now(),
      }];
      p.activeDate = pDate;
    }
  });

  return patients;
}

export function getSoapPatientById(profileId: string, id: string): SoapPatientRecord | null {
  return getAllSoapPatients(profileId).find(p => p.id === id) || null;
}

export function saveSoapPatient(profileId: string, data: Omit<SoapPatientRecord, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): SoapPatientRecord {
  const records = load<SoapPatientRecord>(profileId, 'soaps');
  const today = new Date().toISOString().split('T')[0];
  
  const initialLog = {
    id: uuid(),
    date: today,
    dayOfIllness: data.dayOfIllness || 1,
    sNotes: data.sNotes || '',
    oNotes: data.oNotes || '',
    aAssessment: data.aAssessment || '',
    pPlan: data.pPlan || '',
    clsOrders: data.clsOrders || [],
    clsResults: data.clsResults || [],
    isEmrEntered: data.isEmrEntered || false,
    soapStatus: data.soapStatus || 'chua_lam',
    createdAt: now(),
    updatedAt: now()
  };

  const record: SoapPatientRecord = {
    ...data,
    id: uuid(),
    activeDate: today,
    dailyLogs: [initialLog],
    createdAt: now(),
    updatedAt: now(),
  };
  records.unshift(record);
  save(profileId, 'soaps', records);
  
  // Async Sync to Supabase if configured
  syncSoapToSupabase(record);
  return record;
}

export function updateSoapPatient(profileId: string, id: string, data: Partial<SoapPatientRecord>): void {
  const records = load<SoapPatientRecord>(profileId, 'soaps');
  const idx = records.findIndex(p => p.id === id);
  if (idx >= 0) {
    const existing = records[idx];
    const updated = { ...existing, ...data, updatedAt: now() };
    
    // Sync current active date log
    if (updated.dailyLogs && updated.activeDate) {
      const logIdx = updated.dailyLogs.findIndex(l => l.date === updated.activeDate);
      if (logIdx >= 0) {
        updated.dailyLogs[logIdx] = {
          ...updated.dailyLogs[logIdx],
          dayOfIllness: updated.dayOfIllness,
          sNotes: updated.sNotes,
          oNotes: updated.oNotes,
          aAssessment: updated.aAssessment,
          pPlan: updated.pPlan,
          clsOrders: updated.clsOrders,
          clsResults: updated.clsResults,
          isEmrEntered: updated.isEmrEntered,
          soapStatus: updated.soapStatus,
          updatedAt: now()
        };
      }
    }

    records[idx] = updated;
    save(profileId, 'soaps', records);
    
    // Async Sync to Supabase if configured
    syncSoapToSupabase(updated);
  }
}

export function addSoapDailyLog(profileId: string, id: string, newDate: string): SoapPatientRecord | null {
  const records = load<SoapPatientRecord>(profileId, 'soaps');
  const idx = records.findIndex(p => p.id === id);
  if (idx < 0) return null;

  const patient = records[idx];
  patient.dailyLogs = patient.dailyLogs || [];

  // Check if date already exists
  const existingLog = patient.dailyLogs.find(l => l.date === newDate);
  if (existingLog) {
    patient.activeDate = newDate;
    patient.dayOfIllness = existingLog.dayOfIllness;
    patient.sNotes = existingLog.sNotes;
    patient.oNotes = existingLog.oNotes;
    patient.aAssessment = existingLog.aAssessment;
    patient.pPlan = existingLog.pPlan;
    patient.clsOrders = existingLog.clsOrders;
    patient.clsResults = existingLog.clsResults;
    patient.isEmrEntered = existingLog.isEmrEntered;
    patient.soapStatus = existingLog.soapStatus;
  } else {
    // Create new log for this new date
    const lastLog = patient.dailyLogs[patient.dailyLogs.length - 1];
    const newDayN = lastLog ? lastLog.dayOfIllness + 1 : (patient.dayOfIllness + 1);
    
    const newLog = {
      id: uuid(),
      date: newDate,
      dayOfIllness: newDayN,
      sNotes: '',
      oNotes: '',
      aAssessment: lastLog ? lastLog.aAssessment : patient.aAssessment,
      pPlan: lastLog ? lastLog.pPlan : patient.pPlan,
      clsOrders: [],
      clsResults: [],
      isEmrEntered: false,
      soapStatus: 'chua_lam' as const,
      createdAt: now(),
      updatedAt: now()
    };

    patient.dailyLogs.push(newLog);
    patient.activeDate = newDate;
    patient.dayOfIllness = newDayN;
    patient.sNotes = '';
    patient.oNotes = '';
    patient.aAssessment = newLog.aAssessment;
    patient.pPlan = newLog.pPlan;
    patient.clsOrders = [];
    patient.clsResults = [];
    patient.isEmrEntered = false;
    patient.soapStatus = 'chua_lam';
  }

  patient.updatedAt = now();
  records[idx] = patient;
  save(profileId, 'soaps', records);
  syncSoapToSupabase(patient);
  return patient;
}

export function switchSoapPatientDate(profileId: string, id: string, targetDate: string): SoapPatientRecord | null {
  const records = load<SoapPatientRecord>(profileId, 'soaps');
  const idx = records.findIndex(p => p.id === id);
  if (idx < 0) return null;

  const patient = records[idx];
  const targetLog = (patient.dailyLogs || []).find(l => l.date === targetDate);

  if (targetLog) {
    patient.activeDate = targetDate;
    patient.dayOfIllness = targetLog.dayOfIllness;
    patient.sNotes = targetLog.sNotes;
    patient.oNotes = targetLog.oNotes;
    patient.aAssessment = targetLog.aAssessment;
    patient.pPlan = targetLog.pPlan;
    patient.clsOrders = targetLog.clsOrders;
    patient.clsResults = targetLog.clsResults;
    patient.isEmrEntered = targetLog.isEmrEntered;
    patient.soapStatus = targetLog.soapStatus;

    records[idx] = patient;
    save(profileId, 'soaps', records);
  }
  return patient;
}

export function deleteSoapPatient(profileId: string, id: string): void {
  const records = load<SoapPatientRecord>(profileId, 'soaps');
  const idx = records.findIndex(r => r.id === id);
  if (idx >= 0) {
    records[idx].deletedAt = now();
    save(profileId, 'soaps', records);
  }
}

// ─────────────────────────────────────────────
// SUPABASE SYNC FOR SOAP DIGITAL
// ─────────────────────────────────────────────

export interface SupabaseConfig {
  url: string;
  key: string;
}

export function getSoapSupabaseConfig(): SupabaseConfig {
  return {
    url: localStorage.getItem('dsp_supabase_url') || '',
    key: localStorage.getItem('dsp_supabase_key') || ''
  };
}

export function saveSoapSupabaseConfig(url: string, key: string): void {
  localStorage.setItem('dsp_supabase_url', url.trim());
  localStorage.setItem('dsp_supabase_key', key.trim());
}

export async function syncSoapToSupabase(patient: SoapPatientRecord): Promise<{ success: boolean; error?: string }> {
  const config = getSoapSupabaseConfig();
  if (!config.url || !config.key) return { success: false, error: 'Chưa cấu hình Supabase' };

  try {
    const endpoint = `${config.url.replace(/\/$/, '')}/rest/v1/soap_patients`;
    const body = [{
      id: patient.id,
      doctor_id: getActiveProfileId() || 'default',
      patient_code: patient.patientCode,
      full_name: patient.fullName,
      data: patient,
      updated_at: new Date().toISOString()
    }];

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': config.key,
        'Authorization': `Bearer ${config.key}`,
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }
    return { success: true };
  } catch (err: any) {
    console.warn('[Supabase Sync Error]', err);
    return { success: false, error: err.message };
  }
}

export async function fetchAllSoapFromSupabase(profileId: string): Promise<{ success: boolean; count?: number; error?: string }> {
  const config = getSoapSupabaseConfig();
  if (!config.url || !config.key) return { success: false, error: 'Chưa kết nối Supabase' };

  try {
    const endpoint = `${config.url.replace(/\/$/, '')}/rest/v1/soap_patients?select=*&order=updated_at.desc`;
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'apikey': config.key,
        'Authorization': `Bearer ${config.key}`
      }
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }
    const rows = await res.json();
    const remotePatients: SoapPatientRecord[] = rows.map((r: any) => r.data).filter(Boolean);

    if (remotePatients.length > 0) {
      const localPatients = load<SoapPatientRecord>(profileId, 'soaps');
      const mergedMap = new Map<string, SoapPatientRecord>();
      
      localPatients.forEach(p => mergedMap.set(p.id, p));
      remotePatients.forEach(p => {
        const local = mergedMap.get(p.id);
        if (!local || new Date(p.updatedAt).getTime() > new Date(local.updatedAt).getTime()) {
          mergedMap.set(p.id, p);
        }
      });

      const mergedList = Array.from(mergedMap.values());
      save(profileId, 'soaps', mergedList);
      return { success: true, count: remotePatients.length };
    }
    return { success: true, count: 0 };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─────────────────────────────────────────────
// EXPORT / IMPORT
// ─────────────────────────────────────────────

export async function exportProfile(profileId: string): Promise<void> {
  const profile = getProfile(profileId);
  if (!profile) return;
  
  // Create a safe copy of profile to exclude apiKey
  const safeProfile = { ...profile };
  if (safeProfile.aiSettings) {
    safeProfile.aiSettings = { ...safeProfile.aiSettings, apiKey: '' };
  }

  const snapshot: DocSpaceSnapshot = {
    version: DOCSPACE_VERSION,
    exportedAt: now(),
    profile: safeProfile,
    sbars: await getAllSBARs(profileId, true), // export cả bản xóa mềm để backup
    shifts: getAllShifts(profileId),
    cases: await getAllCases(profileId, true),
    notes: getAllNotes(profileId, true),
    drugJournal: getAllDrugEntries(profileId, true),
    protocols: getAllProtocols(profileId, true),
  };

  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `docspace_${profileId}_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  
  // Record export time
  localStorage.setItem(`dsp_last_export_${profileId}`, now());
}

function validateSnapshot(data: any): boolean {
  if (!data || typeof data !== 'object') return false;
  if (!data.version || !data.profile?.id || !data.profile?.displayName) return false;
  if (!Array.isArray(data.sbars) || !Array.isArray(data.cases) || !Array.isArray(data.shifts)) return false;
  return true;
}

export function importProfile(file: File): Promise<DoctorProfile> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const snapshot: DocSpaceSnapshot = JSON.parse(e.target?.result as string);
        if (!validateSnapshot(snapshot)) {
          reject(new Error('File không đúng định dạng DocSpace Snapshot.'));
          return;
        }

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

export async function getStats(profileId: string): Promise<DocSpaceStats> {
  const lastExport = localStorage.getItem(`dsp_last_export_${profileId}`);
  let daysSince = null;
  if (lastExport) {
    daysSince = Math.floor((Date.now() - new Date(lastExport).getTime()) / (1000 * 60 * 60 * 24));
  }

  return {
    sbarCount: (await getAllSBARs(profileId)).length,
    shiftCount: getAllShifts(profileId).length,
    caseCount: (await getAllCases(profileId)).length,
    noteCount: getAllNotes(profileId).length,
    drugCount: getAllDrugEntries(profileId).length,
    protocolCount: getAllProtocols(profileId).length,
    lastBackupDays: daysSince,
  };
}
