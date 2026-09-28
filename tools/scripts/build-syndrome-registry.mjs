import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SYNDROMES_DIR = path.resolve(__dirname, '../../src/content/docspace/data/syndromes');
const ENRICHED_DIR = path.resolve(__dirname, '../../src/content/docspace/data/enriched');
const INDEX_FILE = path.join(SYNDROMES_DIR, 'index.ts');

console.log('🔍 Đang quét các file JSON hội chứng lâm sàng trong:', SYNDROMES_DIR);

function getAllJsonFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllJsonFiles(fullPath, fileList);
    } else if (file.endsWith('.json')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const jsonFiles = getAllJsonFiles(SYNDROMES_DIR);
console.log(`📋 Tìm thấy ${jsonFiles.length} file JSON hội chứng.`);

// Đọc danh sách bệnh lý có sẵn trong enriched/
const availableDiseases = new Set();
if (fs.existsSync(ENRICHED_DIR)) {
  const diseaseFiles = fs.readdirSync(ENRICHED_DIR).filter(f => f.endsWith('.json'));
  for (const df of diseaseFiles) {
    availableDiseases.add(df.replace('.json', ''));
  }
}

const validSyndromes = [];
const importStatements = [];
const arrayEntries = [];

for (const filePath of jsonFiles) {
  const relativePath = path.relative(SYNDROMES_DIR, filePath).replace(/\\/g, '/');
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);

    if (!data.id || !data.ten || !data.trieuChung || !data.nguong) {
      console.warn(`⚠️ Bỏ qua [${relativePath}]: Thiếu các trường bắt buộc (id, ten, trieuChung, nguong).`);
      continue;
    }

    // Kiểm tra liên kết bệnh
    if (Array.isArray(data.benhLienQuan)) {
      for (const link of data.benhLienQuan) {
        if (!availableDiseases.has(link.benhSlug)) {
          console.warn(`   ℹ️ [${data.id}]: Bệnh liên quan '${link.benhSlug}' chưa có file enriched tương ứng.`);
        }
      }
    }

    // Đặt tên biến import an toàn
    const varName = data.id.replace(/[^a-zA-Z0-9_]/g, '_');
    importStatements.push(`import ${varName} from './${relativePath}';`);
    arrayEntries.push(`  ${varName} as unknown as SyndromeDefinition,`);

    validSyndromes.push(data);
    console.log(`✅ Nạp thành công: ${data.id} -> "${data.ten}" (${data.chuyenKhoa || 'Chung'}) [${data.trieuChung.length} triệu chứng, liên kết ${data.benhLienQuan?.length || 0} bệnh]`);
  } catch (err) {
    console.error(`❌ Lỗi phân tích cú pháp JSON trong file [${relativePath}]:`, err.message);
  }
}

// Tạo nội dung index.ts
const indexContent = `import { SyndromeDefinition, SyndromeMatchResult } from '../../src/types';

// ==============================================================================
// 🧠 TỰ ĐỘNG TẠO BỞI build-syndrome-registry.mjs — KHÔNG SỬA THỦ CÔNG
// ==============================================================================

${importStatements.join('\n')}

/**
 * 🏛️ DANH SÁCH TOÀN BỘ HỘI CHỨNG LÂM SÀNG TRONG KHO TRI THỨC DOCSPACE
 */
export const ALL_SYNDROMES: SyndromeDefinition[] = [
${arrayEntries.join('\n')}
];

/**
 * 🗺️ Bản đồ tra cứu nhanh theo ID hội chứng
 */
export const SYNDROME_MAP: Map<string, SyndromeDefinition> = new Map(
  ALL_SYNDROMES.map((hc) => [hc.id, hc])
);

/**
 * Tra cứu Hội chứng theo ID
 */
export function getSyndromeById(id: string): SyndromeDefinition | undefined {
  return SYNDROME_MAP.get(id);
}

/**
 * Lấy danh sách các Hội chứng liên quan đến một Bệnh lý cụ thể
 * @param diseaseSlug Mã slug của bệnh lý (VD: 'xo_gan', 'sot_xuat_huyet_dengue')
 */
export function getSyndromesByDisease(diseaseSlug: string): SyndromeDefinition[] {
  if (!diseaseSlug) return [];
  const normalizedSlug = diseaseSlug.toLowerCase().trim();
  return ALL_SYNDROMES.filter((hc) =>
    hc.benhLienQuan?.some(
      (link) => link.benhSlug.toLowerCase().trim() === normalizedSlug
    )
  );
}

/**
 * Lọc danh sách Hội chứng theo Chuyên khoa
 */
export function getSyndromesByChuyenKhoa(chuyenKhoa: string): SyndromeDefinition[] {
  if (!chuyenKhoa) return ALL_SYNDROMES;
  const kw = chuyenKhoa.toLowerCase().trim();
  return ALL_SYNDROMES.filter(
    (hc) => hc.chuyenKhoa && hc.chuyenKhoa.toLowerCase().includes(kw)
  );
}

/**
 * Đánh giá đối sánh các Hội chứng dựa trên danh sách triệu chứng người dùng đã chọn/nhập
 * @param selectedSymptomIds Danh sách ID các triệu chứng hiện diện
 * @returns Danh sách các hội chứng kèm kết quả đối sánh (đạt ngưỡng / chưa đạt ngưỡng)
 */
export function evaluateSyndromeMatches(
  selectedSymptomIds: string[]
): SyndromeMatchResult[] {
  if (!selectedSymptomIds || selectedSymptomIds.length === 0) return [];
  const selectedSet = new Set(selectedSymptomIds);

  const results: SyndromeMatchResult[] = [];

  for (const hc of ALL_SYNDROMES) {
    const matchedSymptoms: Array<{ id: string; ten: string }> = [];
    const missingSymptoms: Array<{ id: string; ten: string }> = [];

    for (const symId of hc.trieuChung) {
      if (selectedSet.has(symId)) {
        matchedSymptoms.push({ id: symId, ten: symId });
      } else {
        missingSymptoms.push({ id: symId, ten: symId });
      }
    }

    const matchedCount = matchedSymptoms.length;
    const totalCount = hc.trieuChung.length;
    const threshold = hc.nguong.n;

    // Kiểm tra triệu chứng bắt buộc (nếu có)
    let mandatoryMet = true;
    if (hc.trieuChungBatBuoc && hc.trieuChungBatBuoc.length > 0) {
      mandatoryMet = hc.trieuChungBatBuoc.every((mId) => selectedSet.has(mId));
    }

    const isMet = matchedCount >= threshold && mandatoryMet;

    if (matchedCount > 0) {
      results.push({
        syndromeId: hc.id,
        ten: hc.ten,
        matchedCount,
        totalCount,
        threshold,
        isMet,
        ratioText: \`\${matchedCount}/\${totalCount}\`,
        matchedSymptoms,
        missingSymptoms,
        summaryText: isMet
          ? \`Đạt \${matchedCount}/\${totalCount} triệu chứng (Ngưỡng: ≥ \${threshold})\`
          : \`Gợi ý \${matchedCount}/\${totalCount} triệu chứng (Cần thêm \${Math.max(0, threshold - matchedCount)} để đủ ngưỡng)\`,
      });
    }
  }

  // Sắp xếp ưu tiên: Các hội chứng ĐÃ ĐẠT lên trước, sau đó sắp xếp theo số triệu chứng khớp giảm dần
  return results.sort((a, b) => {
    if (a.isMet && !b.isMet) return -1;
    if (!a.isMet && b.isMet) return 1;
    return b.matchedCount - a.matchedCount;
  });
}
`;

fs.writeFileSync(INDEX_FILE, indexContent, 'utf8');
console.log(`\n💾 Đã cập nhật file: ${INDEX_FILE}`);
console.log(`🎉 Hoàn tất nạp ${validSyndromes.length} hội chứng lâm sàng vào hệ thống DocSpace!`);
