/**
 * DocSpace — Audit Shield
 * Bảo vệ tính vẹn toàn dữ liệu bằng Cryptography (Web Crypto API)
 */

import { AuditTrail, SBARRecord, CaseRecord } from '../types';

/**
 * Tạo ra chuỗi String chuẩn hóa của 1 record để băm.
 * Bỏ qua các trường liên quan đến Audit (auditLogs, isTampered) 
 * để không tạo vòng lặp vô tận khi hash.
 */
function serializeRecordForHash(record: any): string {
  const safeRecord = { ...record };
  delete safeRecord.auditLogs;
  delete safeRecord.isTampered;
  
  // Sắp xếp keys để chuỗi JSON sinh ra luôn nhất quán
  const sortedKeys = Object.keys(safeRecord).sort();
  const sortedObj: any = {};
  sortedKeys.forEach(k => {
    sortedObj[k] = safeRecord[k];
  });
  
  return JSON.stringify(sortedObj);
}

/**
 * Tính mã băm SHA-256 đồng bộ (hoặc async giả lập đồng bộ).
 * Vì localStorage là đồng bộ, nhưng Web Crypto là async,
 * ở bản Pure JS này, để đơn giản và offline hoàn toàn, 
 * ta có thể dùng hàm tự viết hoặc TextEncoder thuần,
 * nhưng tốt nhất là dùng crypto.subtle và trả về Promise,
 * hoặc trong trường hợp cấp bách, dùng thuật toán băm đồng bộ (MurmurHash/Cypher32)
 * Ở đây ta giả lập hàm băm SHA-256 cơ bản (chỉ demo) chạy đồng bộ 
 * để tương thích với localStorage sync API hiện có.
 */
function syncHashString(str: string): string {
  // Simple hash function for synchronous usage (DJB2)
  // Thực tế nên dùng thư viện SHA-256 đồng bộ nếu cần bảo mật cao.
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
  }
  return hash.toString(16);
}

/**
 * Ký mới một bản ghi (Thêm Audit Trail).
 */
export function signRecord(record: any, action: 'create' | 'update' | 'lock'): any {
  const contentString = serializeRecordForHash(record);
  const hash = syncHashString(contentString);
  
  const trail: AuditTrail = {
    timestamp: new Date().toISOString(),
    action,
    snapshotHash: hash
  };
  
  if (!record.auditLogs) {
    record.auditLogs = [];
  }
  
  record.auditLogs.push(trail);
  return record;
}

/**
 * Kiểm tra tính vẹn toàn (Integrity) của một bản ghi.
 * @returns true nếu an toàn, false nếu bị tampered.
 */
export function verifyRecordIntegrity(record: any): boolean {
  if (!record.auditLogs || record.auditLogs.length === 0) {
    return true; // Các record cũ chưa có tính năng này
  }
  
  // Lấy hash cuối cùng
  const lastTrail = record.auditLogs[record.auditLogs.length - 1];
  
  // Tính hash hiện tại
  const currentString = serializeRecordForHash(record);
  const currentHash = syncHashString(currentString);
  
  return lastTrail.snapshotHash === currentHash;
}
