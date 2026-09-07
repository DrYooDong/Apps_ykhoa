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
 * Tính mã băm SHA-256 (Web Crypto API)
 */
async function sha256(str: string): Promise<string> {
  const buffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(str)
  );
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Ký mới một bản ghi (Thêm Audit Trail).
 */
export async function signRecord(record: any, action: 'create' | 'update' | 'lock'): Promise<any> {
  const contentString = serializeRecordForHash(record);
  const hash = await sha256(contentString);
  
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
export async function verifyRecordIntegrity(record: any): Promise<boolean> {
  if (!record.auditLogs || record.auditLogs.length === 0) {
    return true; // Các record cũ chưa có tính năng này
  }
  
  // Lấy hash cuối cùng
  const lastTrail = record.auditLogs[record.auditLogs.length - 1];
  
  // Tính hash hiện tại
  const currentString = serializeRecordForHash(record);
  const currentHash = await sha256(currentString);
  
  return lastTrail.snapshotHash === currentHash;
}
