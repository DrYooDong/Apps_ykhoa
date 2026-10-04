/**
 * utils.mjs - Deduplication Engine Helper Utilities
 * Cung cấp các thuật toán đo độ tương đồng, chuẩn hóa chuỗi y khoa và hash
 */

import crypto from 'crypto';

/**
 * Chuẩn hóa chuỗi văn bản y khoa:
 * - Chuyển chữ thường
 * - Khử dấu tiếng Việt
 * - Bỏ ký tự đặc biệt không cần thiết
 * - Chuẩn hóa khoảng trắng
 */
export function normalizeText(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Tính toán độ tương đồng Jaccard giữa hai mảng hoặc Set:
 * Jaccard = |A ∩ B| / |A ∪ B|
 * Giá trị từ 0.0 (hoàn toàn khác) đến 1.0 (hoàn toàn trùng)
 */
export function jaccardSimilarity(arrA, arrB) {
  if (!arrA || !arrB) return 0;
  const setA = new Set(arrA);
  const setB = new Set(arrB);
  if (setA.size === 0 || setB.size === 0) return 0;

  let intersection = 0;
  for (const item of setA) {
    if (setB.has(item)) {
      intersection++;
    }
  }

  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : Number((intersection / union).toFixed(3));
}

/**
 * Tính khoảng cách Levenshtein (Edit Distance) giữa 2 chuỗi
 */
export function levenshteinDistance(a, b) {
  if (!a || !b) return (a || b || '').length;
  const m = a.length;
  const n = b.length;
  const d = [];

  for (let i = 0; i <= m; i++) d[i] = [i];
  for (let j = 0; j <= n; j++) d[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,      // deletion
        d[i][j - 1] + 1,      // insertion
        d[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return d[m][n];
}

/**
 * Đo độ tương đồng chuỗi dựa trên Levenshtein (0.0 đến 1.0)
 */
export function stringSimilarity(strA, strB) {
  const normA = normalizeText(strA);
  const normB = normalizeText(strB);
  if (!normA && !normB) return 1.0;
  if (!normA || !normB) return 0.0;
  if (normA === normB) return 1.0;

  const maxLen = Math.max(normA.length, normB.length);
  const dist = levenshteinDistance(normA, normB);
  return Number((1 - dist / maxLen).toFixed(3));
}

/**
 * Sinh SHA-256 fingerprint ngắn cho đối tượng dữ liệu
 */
export function hashFingerprint(data) {
  const jsonStr = typeof data === 'string' ? data : JSON.stringify(data);
  return crypto.createHash('sha256').update(jsonStr).digest('hex').substring(0, 16);
}

/**
 * Lấy các phần tử giao nhau giữa hai mảng
 */
export function getIntersection(arrA, arrB) {
  const setB = new Set(arrB);
  return (arrA || []).filter(item => setB.has(item));
}
