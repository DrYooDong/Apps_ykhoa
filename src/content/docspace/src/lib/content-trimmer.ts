/**
 * Content Trimmer Engine for CliniPortal DocSpace
 * Loại bỏ các mẫu văn bản thừa, rườm rà tại lớp render giao diện (React UI).
 * Không sửa đổi dữ liệu gốc trong CSDL JSON/TS.
 */

import { abbreviate, abbrevMetric } from './abbreviation.ts';

export type TrimContext =
  | 'monitoringMetric' // "Hematocrit (Hct), Tiểu cầu, Men gan (AST/ALT)"
  | 'branchName'       // "Nhánh 1: SXH Dengue không có dấu hiệu cảnh báo (A97.0)"
  | 'drugName'         // "Dung dịch bù điện giải đường uống (Oresol / ORS)"
  | 'criteriaLabel'    // "Men gan ALT > ULN (hoặc kéo dài 6-12 tháng)"
  | 'categoryLabel'    // "Điều trị đặc hiệu" -> "ĐT Đặc hiệu"
  | 'symptomChip'      // Triệu chứng trong Chip/Tag nhỏ
  | 'auto';

const CATEGORY_SHORT_MAP: Record<string, string> = {
  'điều trị đặc hiệu': 'ĐT Đặc hiệu',
  'điều trị triệu chứng': 'ĐT Triệu chứng',
  'điều trị hỗ trợ': 'ĐT Hỗ trợ',
  'điều trị ngoại trú': 'ĐT Ngoại trú',
  'điều trị nội trú': 'ĐT Nội trú',
  'hồi sức tích cực': 'ICU / Hồi sức',
  'theo dõi lâm sàng': 'Theo dõi LS',
  'theo dõi cận lâm sàng': 'Theo dõi CLS',
  'chăm sóc điều dưỡng': 'Điều dưỡng',
  'chế độ dinh dưỡng': 'Dinh dưỡng',
};

/**
 * Pattern 1: Mô tả cha bọc con trong ngoặc đơn
 * VD: "Men gan (AST/ALT)" -> "AST/ALT"
 * VD: "Hematocrit (Hct)" -> "Hct"
 * VD: "Dung dịch bù điện giải đường uống (Oresol / ORS)" -> "Oresol / ORS"
 */
function trimParentheticalWrapper(text: string): string {
  // Tìm dạng: "Tên dài (Tên_ngắn_viết_tắt)"
  // Ngoặc chứa chữ in hoa hoặc ký tự ngắn không quá 25 ký tự
  const match = text.match(/^([^(]+?)\s*\(([^)]{1,25})\)\s*$/);
  if (match) {
    const parent = match[1].trim();
    const inside = match[2].trim();

    // Nếu phần trong ngoặc chứa chữ viết tắt (có chữ hoa, số hoặc gạch chéo)
    // và ngắn hơn đáng kể so với phần cha
    if (/[A-Z0-9]/.test(inside) && inside.length <= parent.length) {
      // Trường hợp như "Men gan (AST/ALT)" -> "AST/ALT"
      if (/men gan|hematocrit|tiểu cầu|bạch cầu|huyết sắc tố/i.test(parent)) {
        return inside;
      }
      // Trường hợp "Oresol / ORS"
      if (/oresol|ors/i.test(inside)) {
        return inside;
      }
      // Trường hợp "Acute-on-Chronic Liver Failure - ACLF"
      if (/^[A-Z0-9\s/-]+$/.test(inside)) {
        return inside;
      }
    }
  }
  return text;
}

/**
 * Pattern 3: Rút gọn tên nhánh điều trị
 * VD: "Nhánh 1: SXH Dengue không có dấu hiệu cảnh báo (A97.0)"
 *  -> "Nhánh 1 — Không DHCB (A97.0)"
 * VD: "Nhánh 2: SXH Dengue có dấu hiệu cảnh báo (A97.1)"
 *  -> "Nhánh 2 — Có DHCB (A97.1)"
 */
export function trimBranchName(name: string): string {
  if (!name || typeof name !== 'string') return name || '';
  let res = name.trim();

  // 1. Chuẩn hóa format: "Nhánh X: ..." hoặc "Mức độ X: ..."
  const branchMatch = res.match(/^(Nhánh\s+\d+|Mức\s+độ\s+\d+|Bậc\s+\d+)\s*[:—–-]\s*(.+)$/i);
  if (branchMatch) {
    const prefix = branchMatch[1];
    let body = branchMatch[2].trim();

    // Lấy mã ICD cuối chuỗi nếu có: (A97.0)
    let icd = '';
    const icdMatch = body.match(/\(([A-Z]\d+(?:\.\d+)?)\)$/);
    if (icdMatch) {
      icd = ` (${icdMatch[1]})`;
      body = body.replace(/\(([A-Z]\d+(?:\.\d+)?)\)$/, '').trim();
    }

    // Rút gọn các cụm từ phổ biến trong nhánh
    body = body
      .replace(/Sốt xuất huyết Dengue/gi, '')
      .replace(/SXH Dengue/gi, '')
      .replace(/không có dấu hiệu cảnh báo/gi, 'Không DHCB')
      .replace(/có dấu hiệu cảnh báo/gi, 'Có DHCB')
      .replace(/dấu hiệu cảnh báo/gi, 'DHCB')
      .replace(/nặng/gi, 'Nặng')
      .replace(/^[-—–:\s]+|[-—–:\s]+$/g, '')
      .trim();

    return `${prefix} — ${body}${icd}`;
  }

  // 2. Rút gọn trực tiếp
  res = res
    .replace(/không có dấu hiệu cảnh báo/gi, 'Không DHCB')
    .replace(/có dấu hiệu cảnh báo/gi, 'Có DHCB')
    .replace(/dấu hiệu cảnh báo/gi, 'DHCB');

  return abbreviate(res, 'diseases', 45);
}

/**
 * Pattern 4: Rút gọn danh sách chỉ số theo dõi (monitoring metric list)
 * VD: "Hematocrit (Hct), Tiểu cầu, Men gan (AST/ALT), Siêu âm ổ bụng"
 *  -> ["Hct", "TC", "AST/ALT", "SA ổ bụng"]
 */
export function trimMetricList(metricStr: string, maxItems = 4): string[] {
  if (!metricStr || typeof metricStr !== 'string') return [];
  
  // Tách theo dấu phẩy hoặc dấu chấm phẩy
  const rawItems = metricStr
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);

  const trimmedItems = rawItems.map((item) => {
    let clean = trimParentheticalWrapper(item);
    clean = abbrevMetric(clean, 25);
    return clean;
  });

  if (trimmedItems.length <= maxItems) {
    return trimmedItems;
  }

  const result = trimmedItems.slice(0, maxItems);
  const remaining = trimmedItems.length - maxItems;
  result.push(`+${remaining} khác`);
  return result;
}

/**
 * Lọc bớt nội dung thừa theo ngữ cảnh
 */
export function trimContent(text: string, ctx: TrimContext = 'auto', maxLen = 0): string {
  if (!text || typeof text !== 'string') return text || '';
  let result = text.trim();

  switch (ctx) {
    case 'categoryLabel': {
      const lower = result.toLowerCase();
      if (CATEGORY_SHORT_MAP[lower]) {
        return CATEGORY_SHORT_MAP[lower];
      }
      break;
    }

    case 'branchName':
      return trimBranchName(result);

    case 'monitoringMetric':
      return trimMetricList(result, 5).join(' | ');

    case 'drugName': {
      result = trimParentheticalWrapper(result);
      result = abbreviate(result, 'drugs', maxLen || 30);
      return result;
    }

    case 'criteriaLabel': {
      // Men gan ALT > ULN (hoặc kéo dài 6-12 tháng) -> ALT > ULN
      result = result
        .replace(/^Men gan\s+/i, '')
        .replace(/\s*\(hoặc kéo dài[^)]*\)/i, '')
        .replace(/\s*\(hoặc tăng[^)]*\)/i, '');
      break;
    }

    case 'symptomChip': {
      // Cắt bớt phần sau dấu hai chấm nếu quá dài: "Xuất huyết tiêu hóa: Nôn ra máu / Đi cầu phân đen" -> "Xuất huyết tiêu hóa"
      const colonIdx = result.indexOf(':');
      if (colonIdx > 5 && result.length > 25) {
        result = result.slice(0, colonIdx).trim();
      }
      result = abbreviate(result, 'clinicalTerms', maxLen || 25);
      return result;
    }

    case 'auto':
    default: {
      result = trimParentheticalWrapper(result);
      break;
    }
  }

  if (maxLen > 0 && result.length > maxLen) {
    result = result.slice(0, Math.max(1, maxLen - 1)).trimEnd() + '…';
  }

  return result;
}

/**
 * Pipeline kết hợp hoàn chỉnh: Trim trước, Viết tắt sau.
 * Khuyến nghị sử dụng hàm này trong các React Components.
 */
export function compactText(text: string, ctx: TrimContext = 'auto', maxLen = 0): string {
  if (!text) return '';
  const trimmed = trimContent(text, ctx);
  return abbreviate(trimmed, ctx === 'auto' ? 'auto' : (ctx as any), maxLen);
}
