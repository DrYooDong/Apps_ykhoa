/**
 * Protocol Registry & Knowledge Engine — MedLens DocSpace
 * Quản lý danh mục phác đồ điều trị mở rộng, cho phép nạp, tra cứu, chỉnh sửa
 * và bổ sung phác đồ mới (Custom Protocols) có lưu trữ cục bộ (LocalStorage).
 * Phục vụ kho phác đồ lớn chuẩn Bộ Y Tế, WHO, Surviving Sepsis, GINA, GOLD.
 */

import { DailyTimelinePhase, TreatmentProblemRow } from './dailyTreatmentTimeline.ts';
import { SeverityGradingItem } from '../../data/diagnostic-criteria-database.ts';

export interface EditableProtocolItem {
  id: string;
  diseaseId: string;
  diseaseName: string;
  icd10: string;
  specialty: string;
  triageLevel: 'outpatient' | 'inpatient' | 'icu';
  organization: string; // "Bộ Y Tế", "WHO", "Surviving Sepsis", "GINA", "GOLD", "Chuyên khoa"
  versionYear: number;
  lastUpdated: string;
  description: string;
  severityGrades?: SeverityGradingItem[];
  timelinePhases: DailyTimelinePhase[];
  cautions: string[];
  contraindications: string[];
  dischargeCriteria: string[];
  isCustom?: boolean; // Phác đồ do người dùng/bác sĩ tự thêm/sửa
}

const CUSTOM_PROTOCOLS_STORAGE_KEY = 'docspace_custom_protocols_v1';

/**
 * Danh mục chuyên khoa chuẩn y khoa
 */
export const CLINICAL_SPECIALTIES = [
  { id: 'all', name: 'Tất cả chuyên khoa' },
  { id: 'nhiem', name: 'Truyền nhiễm & Nhiệt đới' },
  { id: 'icu', name: 'Hồi sức Cấp cứu (ICU/HDU)' },
  { id: 'tieu_hoa', name: 'Tiêu hóa - Gan mật' },
  { id: 'ho_hap', name: 'Hô hấp & Phổi' },
  { id: 'tim_mach', name: 'Tim mạch' },
  { id: 'than_tiet_nieu', name: 'Thận - Lọc máu' },
  { id: 'than_kinh', name: 'Thần kinh' },
  { id: 'noi_tiet', name: 'Nội tiết & Chuyển hóa' },
] as const;

/**
 * Các phác đồ cấp cứu & nội khoa mẫu được thiết kế sẵn theo chuẩn Bộ Y Tế & Quốc tế
 * (Đã clean slate để sẵn sàng tiếp nhận phác đồ mới từ Prompts NotebookLM)
 */
export const BUILT_IN_STANDARD_PROTOCOLS: EditableProtocolItem[] = [];

/**
 * Lấy danh sách phác đồ tùy chỉnh do người dùng thêm/sửa từ LocalStorage
 */
export function getCustomProtocols(): EditableProtocolItem[] {
  try {
    const raw = localStorage.getItem(CUSTOM_PROTOCOLS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Error loading custom protocols:', e);
    return [];
  }
}

/**
 * Lấy toàn bộ phác đồ tổng hợp (Built-in Standards + Custom Protocols)
 */
export function getAllRegisteredProtocols(): EditableProtocolItem[] {
  const custom = getCustomProtocols();
  const map = new Map<string, EditableProtocolItem>();

  // 1. Nạp built-in standard protocols
  BUILT_IN_STANDARD_PROTOCOLS.forEach((p) => {
    map.set(p.diseaseId, p);
  });

  // 2. Ghi đè hoặc thêm mới bằng custom protocols
  custom.forEach((p) => {
    map.set(p.diseaseId, p);
  });

  return Array.from(map.values());
}

/**
 * Tìm phác đồ theo diseaseId
 */
export function getRegisteredProtocolById(diseaseId: string): EditableProtocolItem | undefined {
  const all = getAllRegisteredProtocols();
  return all.find(
    (p) =>
      p.diseaseId.toLowerCase() === diseaseId.toLowerCase() ||
      p.id.toLowerCase() === diseaseId.toLowerCase() ||
      p.icd10.toLowerCase().includes(diseaseId.toLowerCase())
  );
}

/**
 * Lưu phác đồ tùy chỉnh vào LocalStorage
 */
export function saveCustomProtocol(protocol: EditableProtocolItem): void {
  try {
    const list = getCustomProtocols();
    const existingIdx = list.findIndex((p) => p.diseaseId === protocol.diseaseId);
    if (existingIdx >= 0) {
      list[existingIdx] = { ...protocol, isCustom: true, lastUpdated: new Date().toISOString() };
    } else {
      list.push({ ...protocol, isCustom: true, lastUpdated: new Date().toISOString() });
    }
    localStorage.setItem(CUSTOM_PROTOCOLS_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving custom protocol:', e);
  }
}

/**
 * Xóa phác đồ tùy chỉnh
 */
export function deleteCustomProtocol(diseaseId: string): void {
  try {
    const list = getCustomProtocols().filter((p) => p.diseaseId !== diseaseId);
    localStorage.setItem(CUSTOM_PROTOCOLS_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error deleting custom protocol:', e);
  }
}

/**
 * Khôi phục về phác đồ mặc định (xóa mọi tùy chỉnh)
 */
export function resetToDefaultProtocols(): void {
  try {
    localStorage.removeItem(CUSTOM_PROTOCOLS_STORAGE_KEY);
  } catch (e) {
    console.error('Error resetting protocols:', e);
  }
}

/**
 * Xuất toàn bộ phác đồ tùy chỉnh ra file JSON
 */
export function exportProtocolsToJson(): string {
  const custom = getCustomProtocols();
  return JSON.stringify(custom, null, 2);
}

/**
 * Nhập phác đồ từ chuỗi JSON
 */
export function importProtocolsFromJson(jsonStr: string): { success: boolean; count: number; error?: string } {
  try {
    const parsed = JSON.parse(jsonStr);
    const items: EditableProtocolItem[] = Array.isArray(parsed) ? parsed : [parsed];
    const validItems = items.filter((item) => item && item.diseaseId && item.diseaseName);
    if (validItems.length === 0) {
      return { success: false, count: 0, error: 'Dữ liệu JSON không đúng định dạng phác đồ điều trị' };
    }
    validItems.forEach((p) => saveCustomProtocol(p));
    return { success: true, count: validItems.length };
  } catch (e: any) {
    return { success: false, count: 0, error: e?.message || 'Lỗi cú pháp JSON' };
  }
}
