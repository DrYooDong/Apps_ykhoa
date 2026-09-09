/**
 * CliniPortal MedLens — Shared Text & Code Normalization Utilities
 * Dùng chung cho toàn bộ các engine tìm kiếm, guideline matcher và parser.
 */

/**
 * Chuẩn hóa chuỗi văn bản phục vụ tìm kiếm tiếng Việt không dấu,
 * loại bỏ toàn bộ dấu thanh và chuyển 'đ' -> 'd'.
 */
export function normalizeText(s: string | null | undefined): string {
  return String(s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .trim();
}

/**
 * Trích xuất danh sách mã ICD sạch từ chuỗi phân cách dấu phẩy, gạch chéo hoặc chấm phẩy
 */
export function parseIcdList(icdStr: string | null | undefined): string[] {
  if (!icdStr) return [];
  return icdStr
    .split(/[\/,;]/)
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);
}
