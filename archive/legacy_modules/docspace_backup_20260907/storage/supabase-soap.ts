/**
 * DocSpace — Supabase Cloud Sync Engine for SOAP Digital
 * Path: src/content/docspace/storage/supabase-soap.ts
 * 
 * Cung cấp API kết nối, kiểm tra đường truyền, đồng bộ 2 chiều (Bidirectional Sync)
 * và phân giải xung đột (Conflict Resolution) cho Sổ tay Bệnh phòng SOAP Digital.
 */

import { SoapPatientRecord } from '../types';
import { redactSoapRecord } from '../ai/phi-redactor';

export interface SoapSupabaseConfig {
  url: string;
  key: string;
  autoSync?: boolean;
  redactPhi?: boolean;
}

export interface SyncResult {
  success: boolean;
  uploadedCount?: number;
  downloadedCount?: number;
  conflictsResolved?: number;
  message?: string;
  error?: string;
}

// ─────────────────────────────────────────────
// CONFIGURATION & CREDENTIAL MANAGEMENT
// ─────────────────────────────────────────────

const SB_URL_KEY = 'dsp_soap_supabase_url';
const SB_ANON_KEY = 'dsp_soap_supabase_key';
const SB_AUTOSYNC_KEY = 'dsp_soap_supabase_autosync';
const SB_REDACT_KEY = 'dsp_soap_supabase_redact_phi';

/**
 * Lấy cấu hình Supabase SOAP từ localStorage
 */
export function getSoapSupabaseConfig(): SoapSupabaseConfig {
  const url = localStorage.getItem(SB_URL_KEY) || localStorage.getItem('dsp_supabase_url') || '';
  const key = localStorage.getItem(SB_ANON_KEY) || localStorage.getItem('dsp_supabase_key') || '';
  const autoSync = localStorage.getItem(SB_AUTOSYNC_KEY) === 'true';
  const redactPhi = localStorage.getItem(SB_REDACT_KEY) !== 'false'; // Default true for security

  return { url: url.trim(), key: key.trim(), autoSync, redactPhi };
}

/**
 * Lưu cấu hình Supabase SOAP vào localStorage
 */
export function saveSoapSupabaseConfig(arg1: string | Partial<SoapSupabaseConfig>, keyArg?: string): void {
  if (typeof arg1 === 'string') {
    localStorage.setItem(SB_URL_KEY, arg1.trim());
    if (keyArg !== undefined) {
      localStorage.setItem(SB_ANON_KEY, keyArg.trim());
    }
  } else if (arg1 && typeof arg1 === 'object') {
    if (arg1.url !== undefined) localStorage.setItem(SB_URL_KEY, arg1.url.trim());
    if (arg1.key !== undefined) localStorage.setItem(SB_ANON_KEY, arg1.key.trim());
    if (arg1.autoSync !== undefined) localStorage.setItem(SB_AUTOSYNC_KEY, String(arg1.autoSync));
    if (arg1.redactPhi !== undefined) localStorage.setItem(SB_REDACT_KEY, String(arg1.redactPhi));
  }
}

// ─────────────────────────────────────────────
// API CLIENT HELPERS
// ─────────────────────────────────────────────

function getHeaders(config: SoapSupabaseConfig, preferMerge: boolean = false): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'apikey': config.key,
    'Authorization': `Bearer ${config.key}`
  };
  if (preferMerge) {
    headers['Prefer'] = 'resolution=merge-duplicates';
  }
  return headers;
}

function formatPatientForSupabase(patient: SoapPatientRecord, doctorId: string, redactPhi: boolean = true): any {
  const target = redactPhi ? redactSoapRecord(patient) : patient;

  return {
    id: target.id,
    doctor_id: doctorId,
    patient_code: target.patientCode || '',
    full_name: target.fullName || 'Bệnh nhân',
    age: target.age || null,
    gender: target.gender || 'khac',
    bed_number: target.bedNumber || '',
    medical_record_no: target.medicalRecordNo || '',
    admission_diagnosis: target.admissionDiagnosis || '',
    current_diagnosis: target.currentDiagnosis || '',
    active_date: target.activeDate || new Date().toISOString().split('T')[0],
    day_of_illness: target.dayOfIllness || 1,
    soap_status: target.soapStatus || 'chua_lam',
    is_emr_entered: Boolean(target.isEmrEntered),
    s_notes: target.sNotes || '',
    o_notes: target.oNotes || '',
    a_assessment: target.aAssessment || '',
    p_plan: target.pPlan || '',
    icd10_code: target.icd10Code || null,
    icd10_label: target.icd10Label || null,
    prescriptions: target.prescriptions || [],
    cls_orders: target.clsOrders || [],
    cls_results: target.clsResults || [],
    daily_logs: target.dailyLogs || [],
    data: target,
    updated_at: target.updatedAt || new Date().toISOString()
  };
}

// ─────────────────────────────────────────────
// CONNECTION TEST & DIAGNOSTICS
// ─────────────────────────────────────────────

/**
 * Kiểm tra kết nối tới Supabase REST endpoint và bảng soap_patients
 */
export async function testSoapSupabaseConnection(customConfig?: SoapSupabaseConfig): Promise<{ success: boolean; latencyMs: number; message: string }> {
  const config = customConfig || getSoapSupabaseConfig();
  if (!config.url || !config.key) {
    return { success: false, latencyMs: 0, message: 'Chưa điền Supabase URL hoặc API Key' };
  }

  const cleanUrl = config.url.replace(/\/+$/, '');
  const endpoint = `${cleanUrl}/rest/v1/soap_patients?select=id&limit=1`;
  const startTime = Date.now();

  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: getHeaders(config)
    });

    const latencyMs = Date.now() - startTime;

    if (res.ok) {
      return { success: true, latencyMs, message: `Kết nối thành công! (Thời gian phản hồi: ${latencyMs}ms)` };
    }

    if (res.status === 404 || res.status === 400) {
      const errTxt = await res.text();
      return {
        success: false,
        latencyMs,
        message: `Đã kết nối được Supabase nhưng chưa tìm thấy bảng soap_patients. Vui lòng chạy file SQL Migration trước! (Chi tiết: ${errTxt})`
      };
    }

    if (res.status === 401 || res.status === 403) {
      return { success: false, latencyMs, message: 'Khóa API Key không hợp lệ hoặc bị chặn bởi quyền truy cập (RLS).' };
    }

    return { success: false, latencyMs, message: `Lỗi máy chủ HTTP ${res.status}` };
  } catch (err: any) {
    return {
      success: false,
      latencyMs: Date.now() - startTime,
      message: `Không thể kết nối tới máy chủ: ${err.message || 'Lỗi mạng hoặc CORS'}`
    };
  }
}

// ─────────────────────────────────────────────
// CLOUD OPERATIONS (CRUD & SYNC)
// ─────────────────────────────────────────────

/**
 * Đẩy 1 ca bệnh SOAP lên Supabase (Upsert)
 */
export async function pushSoapPatient(
  patient: SoapPatientRecord,
  doctorId: string
): Promise<{ success: boolean; error?: string }> {
  const config = getSoapSupabaseConfig();
  if (!config.url || !config.key) return { success: false, error: 'Chưa cấu hình Supabase' };

  try {
    const cleanUrl = config.url.replace(/\/+$/, '');
    const endpoint = `${cleanUrl}/rest/v1/soap_patients`;
    const payload = [formatPatientForSupabase(patient, doctorId, config.redactPhi)];

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: getHeaders(config, true),
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Đẩy danh sách hàng loạt bệnh nhân SOAP lên Supabase
 */
export async function batchPushSoapPatients(
  patients: SoapPatientRecord[],
  doctorId: string
): Promise<{ success: boolean; count: number; error?: string }> {
  if (!patients || patients.length === 0) return { success: true, count: 0 };
  const config = getSoapSupabaseConfig();
  if (!config.url || !config.key) return { success: false, count: 0, error: 'Chưa cấu hình Supabase' };

  try {
    const cleanUrl = config.url.replace(/\/+$/, '');
    const endpoint = `${cleanUrl}/rest/v1/soap_patients`;
    const payloads = patients.map(p => formatPatientForSupabase(p, doctorId, config.redactPhi));

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: getHeaders(config, true),
      body: JSON.stringify(payloads)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }

    return { success: true, count: payloads.length };
  } catch (err: any) {
    return { success: false, count: 0, error: err.message };
  }
}

/**
 * Tải toàn bộ danh sách bệnh nhân SOAP của Bác sĩ từ Supabase Cloud
 */
export async function pullSoapPatients(doctorId: string): Promise<{ success: boolean; data?: SoapPatientRecord[]; error?: string }> {
  const config = getSoapSupabaseConfig();
  if (!config.url || !config.key) return { success: false, error: 'Chưa cấu hình Supabase' };

  try {
    const cleanUrl = config.url.replace(/\/+$/, '');
    const endpoint = `${cleanUrl}/rest/v1/soap_patients?doctor_id=eq.${encodeURIComponent(doctorId)}&deleted_at=is.null&order=updated_at.desc`;

    const res = await fetch(endpoint, {
      method: 'GET',
      headers: getHeaders(config)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }

    const rows = await res.json();
    const records: SoapPatientRecord[] = rows.map((row: any) => {
      // Ưu tiên đọc từ đối tượng data JSONB snapshot nếu có, fallback về cấu trúc cột
      if (row.data && typeof row.data === 'object') {
        return {
          ...row.data,
          id: row.id,
          updatedAt: row.updated_at || row.data.updatedAt
        };
      }
      return {
        id: row.id,
        patientCode: row.patient_code || '',
        fullName: row.full_name,
        age: row.age || 0,
        gender: row.gender || 'nam',
        bedNumber: row.bed_number || '',
        medicalRecordNo: row.medical_record_no || '',
        admissionDiagnosis: row.admission_diagnosis || '',
        currentDiagnosis: row.current_diagnosis || '',
        activeDate: row.active_date,
        dayOfIllness: row.day_of_illness || 1,
        soapStatus: row.soap_status || 'chua_lam',
        isEmrEntered: Boolean(row.is_emr_entered),
        sNotes: row.s_notes || '',
        oNotes: row.o_notes || '',
        aAssessment: row.a_assessment || '',
        pPlan: row.p_plan || '',
        icd10Code: row.icd10_code,
        icd10Label: row.icd10_label,
        prescriptions: row.prescriptions || [],
        clsOrders: row.cls_orders || [],
        clsResults: row.cls_results || [],
        dailyLogs: row.daily_logs || [],
        createdAt: row.created_at,
        updatedAt: row.updated_at
      } as SoapPatientRecord;
    });

    return { success: true, data: records };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Xóa mềm một ca bệnh trên Supabase (Soft Delete)
 */
export async function deleteSoapPatientRemote(patientId: string): Promise<{ success: boolean; error?: string }> {
  const config = getSoapSupabaseConfig();
  if (!config.url || !config.key) return { success: false, error: 'Chưa cấu hình Supabase' };

  try {
    const cleanUrl = config.url.replace(/\/+$/, '');
    const endpoint = `${cleanUrl}/rest/v1/soap_patients?id=eq.${encodeURIComponent(patientId)}`;

    const res = await fetch(endpoint, {
      method: 'PATCH',
      headers: getHeaders(config),
      body: JSON.stringify({
        deleted_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errText}`);
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ─────────────────────────────────────────────
// BIDIRECTIONAL SYNC ENGINE WITH CONFLICT RESOLUTION
// ─────────────────────────────────────────────

/**
 * Thực hiện đồng bộ 2 chiều giữa LocalStorage và Supabase Cloud:
 * 1. Kéo tất cả bản ghi trên Cloud về
 * 2. So sánh từng bản ghi với Local:
 *    - Bản ghi nào mới hơn (updatedAt lớn hơn) sẽ ghi đè bản ghi cũ
 * 3. Đẩy các bản ghi Local mới hơn lên Cloud
 * 4. Trả về thống kê đồng bộ chi tiết
 */
export async function syncSoapBidirectional(
  localPatients: SoapPatientRecord[],
  doctorId: string
): Promise<{ success: boolean; mergedPatients: SoapPatientRecord[]; stats: SyncResult }> {
  const pullRes = await pullSoapPatients(doctorId);
  if (!pullRes.success || !pullRes.data) {
    return {
      success: false,
      mergedPatients: localPatients,
      stats: { success: false, error: pullRes.error || 'Không thể kéo dữ liệu từ Supabase' }
    };
  }

  const remotePatients = pullRes.data;
  const mergedMap = new Map<string, SoapPatientRecord>();
  const toUpload: SoapPatientRecord[] = [];

  let downloadedCount = 0;
  let conflictsResolved = 0;

  // Đưa tất cả local vào Map
  localPatients.forEach(p => mergedMap.set(p.id, p));

  // Hợp nhất với Remote
  remotePatients.forEach(remote => {
    const local = mergedMap.get(remote.id);
    if (!local) {
      // Local chưa có -> Thêm mới từ Cloud
      mergedMap.set(remote.id, remote);
      downloadedCount++;
    } else {
      const localTime = new Date(local.updatedAt || 0).getTime();
      const remoteTime = new Date(remote.updatedAt || 0).getTime();

      if (remoteTime > localTime) {
        // Cloud mới hơn -> Cập nhật Local
        mergedMap.set(remote.id, remote);
        downloadedCount++;
        conflictsResolved++;
      } else if (localTime > remoteTime) {
        // Local mới hơn -> Cần đẩy lên Cloud
        toUpload.push(local);
        conflictsResolved++;
      }
    }
  });

  // Tìm các bản ghi Local chưa có trên Cloud để đẩy lên
  localPatients.forEach(local => {
    const existsOnRemote = remotePatients.some(r => r.id === local.id);
    if (!existsOnRemote && !toUpload.some(u => u.id === local.id)) {
      toUpload.push(local);
    }
  });

  // Đẩy các bản ghi cần upload lên Cloud
  let uploadedCount = 0;
  if (toUpload.length > 0) {
    const pushRes = await batchPushSoapPatients(toUpload, doctorId);
    if (pushRes.success) {
      uploadedCount = pushRes.count;
    }
  }

  const finalMergedList = Array.from(mergedMap.values());

  return {
    success: true,
    mergedPatients: finalMergedList,
    stats: {
      success: true,
      uploadedCount,
      downloadedCount,
      conflictsResolved,
      message: `Đồng bộ hoàn tất: Đã tải lên ${uploadedCount} ca, tải về ${downloadedCount} ca, xử lý ${conflictsResolved} xung đột.`
    }
  };
}
