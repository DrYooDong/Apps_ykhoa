import { DoctorUser, MedicalRecord, Patient } from '../types.ts';
import { isSupabaseConfigured, supabase } from './supabase.ts';

const TOKEN_KEY = 'medlens_jwt_token';
const LOCAL_USER_KEY = 'medlens_local_user';
const LOCAL_PATIENTS_KEY = 'medlens_local_patients';
const LOCAL_RECORDS_KEY = 'medlens_local_records';

// Default demo doctor
const DEFAULT_DEMO_DOCTOR: DoctorUser = {
  uid: 'dr_demo_01',
  email: 'dr.minh@medlens.vn',
  name: 'BS.CKII Nguyễn Văn Minh',
  role: 'specialist',
  specialty: 'Tim mạch Can thiệp & Cấp cứu',
};

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeStoredToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(LOCAL_USER_KEY);
}

// ----------------------------------------------------
// Local Storage Fallback Helpers
// ----------------------------------------------------
function getLocalPatients(): Patient[] {
  try {
    const raw = localStorage.getItem(LOCAL_PATIENTS_KEY);
    if (!raw) {
      const initial: Patient[] = [
        {
          id: 1,
          patientCode: 'BN-2026-001',
          fullName: 'Trần Văn Hùng',
          gender: 'nam',
          age: 58,
          occupation: 'Tài xế đường dài',
          phoneNumber: '0912345678',
          idCard: '079085001234',
          address: 'Quận 5, TP. Hồ Chí Minh',
          notes: 'Tiền sử tăng huyết áp 5 năm, hút thuốc lá 20 gói/năm',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem(LOCAL_PATIENTS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveLocalPatients(patients: Patient[]): void {
  localStorage.setItem(LOCAL_PATIENTS_KEY, JSON.stringify(patients));
}

function getLocalRecords(): MedicalRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_RECORDS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalRecords(records: MedicalRecord[]): void {
  localStorage.setItem(LOCAL_RECORDS_KEY, JSON.stringify(records));
}

// ----------------------------------------------------
// Auth API (Supabase + Local Fallback)
// ----------------------------------------------------
export async function apiLogin(email: string, password: string): Promise<{ token: string; user: DoctorUser }> {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      // If user not in Supabase yet, attempt fallback or throw
      throw new Error(error.message || 'Lỗi đăng nhập qua Supabase');
    }
    const token = data.session?.access_token || 'supabase_token';
    setStoredToken(token);

    // Fetch doctor profile
    const { data: doc } = await supabase
      .from('doctors')
      .select('*')
      .eq('uid', data.user.id)
      .maybeSingle();

    const user: DoctorUser = {
      uid: data.user.id,
      email: data.user.email || email,
      name: doc?.name || data.user.user_metadata?.name || 'Bác sĩ lâm sàng',
      role: doc?.role || 'doctor',
      specialty: doc?.specialty || 'Nội tổng quát & Cấp cứu',
    };

    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
    return { token, user };
  }

  // Local fallback mode
  const token = 'local_session_' + Date.now();
  setStoredToken(token);
  const user: DoctorUser = {
    ...DEFAULT_DEMO_DOCTOR,
    email: email || DEFAULT_DEMO_DOCTOR.email,
  };
  localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
  return { token, user };
}

export async function apiRegister(
  email: string,
  password: string,
  name: string,
  specialty?: string
): Promise<{ token: string; user: DoctorUser }> {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, specialty: specialty || 'Nội tổng quát' },
      },
    });
    if (error) throw new Error(error.message);

    const uid = data.user?.id || 'doc_' + Date.now();
    const token = data.session?.access_token || 'supabase_token';
    setStoredToken(token);

    const newUser: DoctorUser = {
      uid,
      email,
      name,
      role: 'doctor',
      specialty: specialty || 'Nội tổng quát',
    };

    // Upsert into doctors table
    await supabase.from('doctors').upsert({
      uid,
      email,
      name,
      role: 'doctor',
      specialty: specialty || 'Nội tổng quát',
    });

    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newUser));
    return { token, user: newUser };
  }

  // Local fallback
  const token = 'local_reg_' + Date.now();
  setStoredToken(token);
  const newUser: DoctorUser = {
    uid: 'dr_' + Date.now(),
    email,
    name,
    role: 'doctor',
    specialty: specialty || 'Nội khoa',
  };
  localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newUser));
  return { token, user: newUser };
}

export async function apiGoogleAuthSync(
  uid: string,
  email: string,
  name: string
): Promise<{ token: string; user: DoctorUser }> {
  const token = 'g_token_' + Date.now();
  setStoredToken(token);
  const user: DoctorUser = {
    uid,
    email,
    name,
    role: 'doctor',
    specialty: 'Bác sĩ lâm sàng',
  };
  localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
  return { token, user };
}

export async function apiGetMe(): Promise<DoctorUser | null> {
  const token = getStoredToken();
  if (!token) return null;

  if (isSupabaseConfigured) {
    try {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        const { data: doc } = await supabase
          .from('doctors')
          .select('*')
          .eq('uid', data.user.id)
          .maybeSingle();

        return {
          uid: data.user.id,
          email: data.user.email || '',
          name: doc?.name || data.user.user_metadata?.name || 'Bác sĩ lâm sàng',
          role: doc?.role || 'doctor',
          specialty: doc?.specialty || 'Nội tổng quát & Cấp cứu',
        };
      }
    } catch {
      // Continue to local fallback
    }
  }

  // Fallback to local stored user
  try {
    const raw = localStorage.getItem(LOCAL_USER_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_DEMO_DOCTOR;
  } catch {
    return DEFAULT_DEMO_DOCTOR;
  }
}

// ----------------------------------------------------
// Patients API
// ----------------------------------------------------
export async function apiGetPatients(q?: string): Promise<Patient[]> {
  if (isSupabaseConfigured) {
    try {
      let query = supabase.from('patients').select('*').order('created_at', { ascending: false });
      if (q && q.trim()) {
        query = query.or(`full_name.ilike.%${q}%,patient_code.ilike.%${q}%,phone_number.ilike.%${q}%`);
      }
      const { data, error } = await query;
      if (error) throw error;
      if (data) {
        return data.map((p) => ({
          id: p.id,
          patientCode: p.patient_code,
          fullName: p.full_name,
          gender: p.gender,
          age: p.age,
          occupation: p.occupation,
          phoneNumber: p.phone_number,
          idCard: p.id_card,
          address: p.address,
          notes: p.notes,
          createdAt: p.created_at,
          updatedAt: p.updated_at,
        }));
      }
    } catch (err) {
      console.warn('Supabase patients query failed, falling back to local storage:', err);
    }
  }

  // Local fallback
  const list = getLocalPatients();
  if (!q || !q.trim()) return list;
  const term = q.toLowerCase().trim();
  return list.filter(
    (p) =>
      p.fullName.toLowerCase().includes(term) ||
      p.patientCode.toLowerCase().includes(term) ||
      (p.phoneNumber && p.phoneNumber.includes(term))
  );
}

export async function apiGetPatientById(id: number): Promise<Patient> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('patients').select('*').eq('id', id).single();
      if (error) throw error;
      if (data) {
        return {
          id: data.id,
          patientCode: data.patient_code,
          fullName: data.full_name,
          gender: data.gender,
          age: data.age,
          occupation: data.occupation,
          phoneNumber: data.phone_number,
          idCard: data.id_card,
          address: data.address,
          notes: data.notes,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }
    } catch (err) {
      console.warn('Supabase getPatientById failed, checking local:', err);
    }
  }

  const found = getLocalPatients().find((p) => p.id === id);
  if (!found) throw new Error('Không tìm thấy bệnh nhân');
  return found;
}

export async function apiCreatePatient(data: Partial<Patient>): Promise<Patient> {
  const patientCode = data.patientCode || `BN-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`;
  const newPat: Patient = {
    id: Date.now(),
    patientCode,
    fullName: data.fullName || 'Bệnh nhân mới',
    gender: data.gender || 'nam',
    age: data.age ? Number(data.age) : undefined,
    occupation: data.occupation || '',
    phoneNumber: data.phoneNumber || '',
    idCard: data.idCard || '',
    address: data.address || '',
    notes: data.notes || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    try {
      const { data: created, error } = await supabase
        .from('patients')
        .insert({
          patient_code: newPat.patientCode,
          full_name: newPat.fullName,
          gender: newPat.gender,
          age: newPat.age,
          occupation: newPat.occupation,
          phone_number: newPat.phoneNumber,
          id_card: newPat.idCard,
          address: newPat.address,
          notes: newPat.notes,
        })
        .select()
        .single();

      if (error) throw error;
      if (created) {
        newPat.id = created.id;
        newPat.createdAt = created.created_at;
        newPat.updatedAt = created.updated_at;
      }
    } catch (err) {
      console.warn('Supabase createPatient failed, storing locally:', err);
    }
  }

  // Update local
  const current = getLocalPatients();
  current.unshift(newPat);
  saveLocalPatients(current);
  return newPat;
}

export async function apiUpdatePatient(id: number, data: Partial<Patient>): Promise<Patient> {
  if (isSupabaseConfigured) {
    try {
      const payload: Record<string, any> = {};
      if (data.fullName !== undefined) payload.full_name = data.fullName;
      if (data.gender !== undefined) payload.gender = data.gender;
      if (data.age !== undefined) payload.age = data.age;
      if (data.occupation !== undefined) payload.occupation = data.occupation;
      if (data.phoneNumber !== undefined) payload.phone_number = data.phoneNumber;
      if (data.address !== undefined) payload.address = data.address;
      if (data.notes !== undefined) payload.notes = data.notes;
      payload.updated_at = new Date().toISOString();

      const { data: updated, error } = await supabase
        .from('patients')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (updated) {
        return {
          id: updated.id,
          patientCode: updated.patient_code,
          fullName: updated.full_name,
          gender: updated.gender,
          age: updated.age,
          occupation: updated.occupation,
          phoneNumber: updated.phone_number,
          idCard: updated.id_card,
          address: updated.address,
          notes: updated.notes,
          createdAt: updated.created_at,
          updatedAt: updated.updated_at,
        };
      }
    } catch (err) {
      console.warn('Supabase updatePatient failed, updating locally:', err);
    }
  }

  const current = getLocalPatients();
  const idx = current.findIndex((p) => p.id === id);
  if (idx === -1) throw new Error('Không tìm thấy bệnh nhân');
  current[idx] = { ...current[idx], ...data, updatedAt: new Date().toISOString() };
  saveLocalPatients(current);
  return current[idx];
}

export async function apiDeletePatient(id: number): Promise<{ success: boolean }> {
  if (isSupabaseConfigured) {
    try {
      await supabase.from('patients').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase deletePatient error:', err);
    }
  }
  const current = getLocalPatients().filter((p) => p.id !== id);
  saveLocalPatients(current);
  return { success: true };
}

// ----------------------------------------------------
// Medical Records API
// ----------------------------------------------------
export async function apiGetMedicalRecords(q?: string): Promise<MedicalRecord[]> {
  if (isSupabaseConfigured) {
    try {
      let query = supabase.from('medical_records').select('*').order('created_at', { ascending: false });
      if (q && q.trim()) {
        query = query.or(`patient_name.ilike.%${q}%,record_code.ilike.%${q}%,patient_code.ilike.%${q}%`);
      }
      const { data, error } = await query;
      if (error) throw error;
      if (data) {
        return data.map((r) => ({
          id: r.id,
          recordCode: r.record_code,
          patientId: r.patient_id,
          patientCode: r.patient_code,
          patientName: r.patient_name,
          gender: r.gender,
          age: r.age,
          occupation: r.occupation,
          doctorUid: r.doctor_uid,
          doctorName: r.doctor_name,
          admissionReason: r.admission_reason,
          clinicalSummary: r.clinical_summary,
          vitals: r.vitals,
          labs: r.labs,
          selectedSymptoms: r.selected_symptoms,
          derivedSymptoms: r.derived_symptoms,
          negatedSymptoms: r.negated_symptoms,
          freeTexts: r.free_texts,
          primaryDiagnosis: r.primary_diagnosis,
          differentialDiagnoses: r.differential_diagnoses,
          treatmentProtocol: r.treatment_protocol,
          status: r.status,
          createdAt: r.created_at,
          updatedAt: r.updated_at,
        }));
      }
    } catch (err) {
      console.warn('Supabase records query failed, using local storage:', err);
    }
  }

  const list = getLocalRecords();
  if (!q || !q.trim()) return list;
  const term = q.toLowerCase().trim();
  return list.filter(
    (r) =>
      r.patientName.toLowerCase().includes(term) ||
      r.recordCode.toLowerCase().includes(term) ||
      r.patientCode.toLowerCase().includes(term)
  );
}

export async function apiGetMedicalRecordById(id: number): Promise<MedicalRecord> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('medical_records').select('*').eq('id', id).single();
      if (error) throw error;
      if (data) {
        return {
          id: data.id,
          recordCode: data.record_code,
          patientId: data.patient_id,
          patientCode: data.patient_code,
          patientName: data.patient_name,
          gender: data.gender,
          age: data.age,
          occupation: data.occupation,
          doctorUid: data.doctor_uid,
          doctorName: data.doctor_name,
          admissionReason: data.admission_reason,
          clinicalSummary: data.clinical_summary,
          vitals: data.vitals,
          labs: data.labs,
          selectedSymptoms: data.selected_symptoms,
          derivedSymptoms: data.derived_symptoms,
          negatedSymptoms: data.negated_symptoms,
          freeTexts: data.free_texts,
          primaryDiagnosis: data.primary_diagnosis,
          differentialDiagnoses: data.differential_diagnoses,
          treatmentProtocol: data.treatment_protocol,
          status: data.status,
          createdAt: data.created_at,
          updatedAt: data.updated_at,
        };
      }
    } catch (err) {
      console.warn('Supabase getMedicalRecordById failed:', err);
    }
  }

  const found = getLocalRecords().find((r) => r.id === id);
  if (!found) throw new Error('Không tìm thấy bệnh án');
  return found;
}

export async function apiSaveMedicalRecord(data: any): Promise<MedicalRecord> {
  const recordCode = data.recordCode || `BA-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`;
  const patientCode = data.patientCode || `BN-${String(Date.now()).slice(-4)}`;

  const newRecord: MedicalRecord = {
    id: Date.now(),
    recordCode,
    patientId: data.patientId,
    patientCode,
    patientName: data.patientName || 'Bệnh nhân',
    gender: data.gender || 'nam',
    age: data.age ? Number(data.age) : undefined,
    occupation: data.occupation || '',
    doctorUid: data.doctorUid || 'dr_default',
    doctorName: data.doctorName || 'Bác sĩ lâm sàng',
    admissionReason: data.admissionReason || '',
    clinicalSummary: data.clinicalSummary || '',
    vitals: data.vitals || {},
    labs: data.labs || {},
    selectedSymptoms: data.selectedSymptoms || [],
    derivedSymptoms: data.derivedSymptoms || [],
    negatedSymptoms: data.negatedSymptoms || [],
    freeTexts: data.freeTexts || {},
    primaryDiagnosis: data.primaryDiagnosis || null,
    differentialDiagnoses: data.differentialDiagnoses || [],
    treatmentProtocol: data.treatmentProtocol || null,
    status: data.status || 'hoan_tat',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    try {
      const { data: created, error } = await supabase
        .from('medical_records')
        .insert({
          record_code: newRecord.recordCode,
          patient_id: newRecord.patientId,
          patient_code: newRecord.patientCode,
          patient_name: newRecord.patientName,
          gender: newRecord.gender,
          age: newRecord.age,
          occupation: newRecord.occupation,
          doctor_uid: newRecord.doctorUid,
          doctor_name: newRecord.doctorName,
          admission_reason: newRecord.admissionReason,
          clinical_summary: newRecord.clinicalSummary,
          vitals: newRecord.vitals,
          labs: newRecord.labs,
          selected_symptoms: newRecord.selectedSymptoms,
          derived_symptoms: newRecord.derivedSymptoms,
          negated_symptoms: newRecord.negatedSymptoms,
          free_texts: newRecord.freeTexts,
          primary_diagnosis: newRecord.primaryDiagnosis,
          differential_diagnoses: newRecord.differentialDiagnoses,
          treatment_protocol: newRecord.treatmentProtocol,
          status: newRecord.status,
        })
        .select()
        .single();

      if (error) throw error;
      if (created) {
        newRecord.id = created.id;
        newRecord.createdAt = created.created_at;
        newRecord.updatedAt = created.updated_at;
      }
    } catch (err) {
      console.warn('Supabase saveMedicalRecord failed, saving locally:', err);
    }
  }

  // Update local
  const current = getLocalRecords();
  current.unshift(newRecord);
  saveLocalRecords(current);
  return newRecord;
}

export async function apiDeleteMedicalRecord(id: number): Promise<{ success: boolean }> {
  if (isSupabaseConfigured) {
    try {
      await supabase.from('medical_records').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase deleteMedicalRecord failed:', err);
    }
  }
  const current = getLocalRecords().filter((r) => r.id !== id);
  saveLocalRecords(current);
  return { success: true };
}
