/**
 * Medical Abbreviation Engine for CliniPortal DocSpace
 * Cung cấp hàm rút gọn thuật ngữ y khoa hiển thị runtime trên giao diện.
 * Không thay đổi dữ liệu gốc trong CSDL JSON/TS.
 */

import abbrevData from '../data/medical-abbreviation-map.json';

export type AbbrevCategory = 'diseases' | 'labs' | 'clinicalTerms' | 'drugs' | 'specialties';
export type AbbrevContext = AbbrevCategory | 'auto';

interface AbbrevItem {
  full: string;
  abbr: string;
  also?: string[];
}

const CATEGORIES: Record<string, AbbrevItem[]> = (abbrevData as any).categories || {};

// Tạo lookup maps sẵn trong memory để tăng tốc độ lookup O(1)
const FULL_TO_ABBR_FAST_MAP: Map<string, string> = new Map();
const ABBR_TO_FULL_FAST_MAP: Map<string, string> = new Map();

for (const cat of Object.keys(CATEGORIES)) {
  for (const item of CATEGORIES[cat]) {
    const fullLower = item.full.trim().toLowerCase();
    FULL_TO_ABBR_FAST_MAP.set(fullLower, item.abbr);
    ABBR_TO_FULL_FAST_MAP.set(item.abbr.trim().toUpperCase(), item.full);

    if (Array.isArray(item.also)) {
      for (const alt of item.also) {
        FULL_TO_ABBR_FAST_MAP.set(alt.trim().toLowerCase(), item.abbr);
      }
    }
  }
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Rút gọn văn bản y khoa theo từ điển viết tắt chuẩn.
 * 
 * @param text   - Chuỗi văn bản gốc
 * @param ctx    - Ngữ cảnh (để ưu tiên category cụ thể trước: 'diseases', 'labs', etc.)
 * @param maxLen - Cắt bớt nếu chuỗi sau khi thay thế vẫn vượt quá số ký tự này
 */
export function abbreviate(text: string, ctx: AbbrevContext = 'auto', maxLen = 0): string {
  if (!text || typeof text !== 'string') return text || '';
  let result = text.trim();

  // Kiểm tra exact match nhanh
  const exactMatch = FULL_TO_ABBR_FAST_MAP.get(result.toLowerCase());
  if (exactMatch) {
    result = exactMatch;
  } else {
    // Sắp xếp thứ tự categories: nếu có ctx xác định thì duyệt ctx trước
    const catKeys = Object.keys(CATEGORIES);
    const orderedCats = ctx !== 'auto' && CATEGORIES[ctx]
      ? [ctx, ...catKeys.filter((k) => k !== ctx)]
      : catKeys;

    for (const cat of orderedCats) {
      const items = CATEGORIES[cat] || [];
      // Sắp xếp các cụm từ theo độ dài giảm dần để ưu tiên match cụm dài trước
      const sortedItems = [...items].sort((a, b) => b.full.length - a.full.length);

      for (const item of sortedItems) {
        if (!item.full || item.full.length < 2) continue;
        
        // Match boundary hoặc dấu gạch/ngoặc
        const escaped = escapeRegex(item.full);
        const regex = new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}(?=[^\\p{L}\\p{N}]|$)`, 'giu');
        
        if (regex.test(result)) {
          result = result.replace(regex, `$1${item.abbr}`);
        }
      }
    }
  }

  // Cắt ngắn nếu vượt giới hạn maxLen
  if (maxLen > 0 && result.length > maxLen) {
    result = result.slice(0, Math.max(1, maxLen - 1)).trimEnd() + '…';
  }

  return result;
}

/**
 * Rút gọn tên bệnh chuyên biệt cho Badge, Tab, Card
 */
export function abbrevDisease(name: string, maxLen = 35): string {
  return abbreviate(name, 'diseases', maxLen);
}

/**
 * Rút gọn nhãn triệu chứng cho Tag / Chip
 */
export function abbrevSymptom(label: string, maxLen = 40): string {
  return abbreviate(label, 'clinicalTerms', maxLen);
}

/**
 * Rút gọn chỉ số xét nghiệm / Cận lâm sàng
 */
export function abbrevMetric(metric: string, maxLen = 50): string {
  return abbreviate(metric, 'labs', maxLen);
}

/**
 * Rút gọn tên thuốc cho danh mục thuốc
 */
export function abbrevDrug(drug: string, maxLen = 35): string {
  return abbreviate(drug, 'drugs', maxLen);
}

/**
 * Tra cứu nghĩa đầy đủ từ chữ viết tắt (dùng cho Tooltip / ARIA / Accessibility)
 */
export function getAbbrExpansion(abbr: string): string | null {
  if (!abbr) return null;
  return ABBR_TO_FULL_FAST_MAP.get(abbr.trim().toUpperCase()) || null;
}

/**
 * Tra cứu chữ viết tắt từ tên đầy đủ
 */
export function getAbbreviation(fullText: string): string | null {
  if (!fullText) return null;
  return FULL_TO_ABBR_FAST_MAP.get(fullText.trim().toLowerCase()) || null;
}
