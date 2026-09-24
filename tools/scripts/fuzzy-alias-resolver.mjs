/**
 * CliniPortal DocSpace — Fuzzy Symptom & Alias Resolver
 * 
 * Bộ giải quyết bí danh triệu chứng thông minh:
 * 1. Tra cứu và đối chiếu mã triệu chứng hoặc tên triệu chứng mới với kho từ vựng chuẩn.
 * 2. Tự động ánh xạ các biến thể ngữ nghĩa (aliases, keywords, prefix tc_/c_/trieu_chung_)
 *    về mã ID chuẩn (Canonical ID).
 * 3. Chống trùng lặp tuyệt đối (Zero-Duplicate & Zero-Orphan).
 * 4. Nếu là triệu chứng thực sự mới, tự động phân nhóm và ghi vào symptoms/<he>.json
 *    đồng thời kích hoạt bundle-symptoms.mjs để cập nhật cả JSON và Markdown Dictionary.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { bundleSymptoms } from './bundle-symptoms.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');
const VAULT_DATA_DIR = path.join(ROOT_DIR, 'src/content/knowledge-vault/data');
const SYMPTOMS_DIR = path.join(VAULT_DATA_DIR, 'symptoms');

const SYSTEM_MAP = {
  'toàn thân': 'toan-than.json',
  'tim mạch': 'tim-mach.json',
  'hô hấp': 'ho-hap.json',
  'tiêu hóa': 'tieu-hoa.json',
  'thần kinh': 'than-kinh.json',
  'da niêm': 'da-niem.json',
  'cận lâm sàng': 'can-lam-sang.json',
  'tiết niệu': 'tiet-nieu.json',
  'nội tiết': 'noi-tiet.json',
  'huyết học': 'huyet-hoc.json',
  'sản phụ khoa': 'san-phu-khoa.json',
  'tiền căn': 'tien-can.json'
};

function normalizeText(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Khử dấu tiếng Việt để so sánh thô
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Tải toàn bộ triệu chứng hiện tại từ 12 file hệ cơ quan
 */
export function loadAllSymptoms() {
  const allFiles = fs.readdirSync(SYMPTOMS_DIR).filter(f => f.endsWith('.json'));
  const symptoms = [];
  const byFile = {};

  for (const f of allFiles) {
    try {
      const items = JSON.parse(fs.readFileSync(path.join(SYMPTOMS_DIR, f), 'utf8'));
      if (Array.isArray(items)) {
        byFile[f] = items;
        items.forEach(item => symptoms.push({ ...item, _file: f }));
      }
    } catch (e) {
      console.error(`Lỗi đọc ${f}:`, e.message);
    }
  }

  return { symptoms, byFile };
}

/**
 * Xây dựng chỉ mục tra cứu alias
 */
export function buildAliasIndex(symptoms) {
  const idMap = new Map();
  const aliasMap = new Map();

  for (const s of symptoms) {
    idMap.set(s.id, s);

    // Chuẩn hóa chính ID
    aliasMap.set(s.id, s.id);
    aliasMap.set(normalizeText(s.id), s.id);

    // Bỏ prefix tc_, c_, trieu_chung_
    const strippedId = s.id.replace(/^(tc_|c_|trieu_chung_|tt_|cn_)/, '');
    if (strippedId && strippedId !== s.id) {
      aliasMap.set(strippedId, s.id);
      aliasMap.set(normalizeText(strippedId), s.id);
    }

    // Tên triệu chứng
    aliasMap.set(normalizeText(s.ten), s.id);

    // Aliases
    if (Array.isArray(s.aliases)) {
      for (const a of s.aliases) {
        aliasMap.set(a, s.id);
        aliasMap.set(normalizeText(a), s.id);
      }
    }

    // Từ khóa
    if (Array.isArray(s.tuKhoa)) {
      for (const kw of s.tuKhoa) {
        aliasMap.set(kw, s.id);
        aliasMap.set(normalizeText(kw), s.id);
      }
    }
  }

  return { idMap, aliasMap };
}

/**
 * Tra cứu và phân giải một mã ID hoặc tên triệu chứng
 */
export function resolveSymptom(incomingIdOrName, symptoms) {
  if (!incomingIdOrName) return null;
  const currentSymptoms = symptoms || loadAllSymptoms().symptoms;
  const { idMap, aliasMap } = buildAliasIndex(currentSymptoms);

  // 1. Kiểm tra khớp chính xác ID
  if (idMap.has(incomingIdOrName)) {
    return {
      resolvedId: incomingIdOrName,
      canonical: idMap.get(incomingIdOrName),
      matchType: 'EXACT_ID',
      isNew: false
    };
  }

  // 2. Kiểm tra bỏ prefix
  const stripped = incomingIdOrName.replace(/^(tc_|c_|trieu_chung_|tt_|cn_)/, '');
  if (idMap.has(stripped)) {
    return {
      resolvedId: stripped,
      canonical: idMap.get(stripped),
      matchType: 'STRIPPED_PREFIX',
      isNew: false
    };
  }

  // 3. Tra cứu qua Alias / Keyword Map
  const norm = normalizeText(incomingIdOrName);
  if (aliasMap.has(incomingIdOrName)) {
    const resId = aliasMap.get(incomingIdOrName);
    return {
      resolvedId: resId,
      canonical: idMap.get(resId),
      matchType: 'ALIAS_EXACT',
      isNew: false
    };
  }

  if (aliasMap.has(norm)) {
    const resId = aliasMap.get(norm);
    return {
      resolvedId: resId,
      canonical: idMap.get(resId),
      matchType: 'ALIAS_NORMALIZED',
      isNew: false
    };
  }

  // 4. Fuzzy Substring Matching (nếu chứa trọn vẹn cụm từ quan trọng)
  for (const s of currentSymptoms) {
    const sNorm = normalizeText(s.ten);
    if (sNorm && (sNorm.includes(norm) || norm.includes(sNorm)) && norm.length >= 6) {
      return {
        resolvedId: s.id,
        canonical: s,
        matchType: 'FUZZY_NAME_INCLUSION',
        isNew: false
      };
    }
    if (Array.isArray(s.aliases)) {
      for (const a of s.aliases) {
        const aNorm = normalizeText(a);
        if (aNorm && (aNorm.includes(norm) || norm.includes(aNorm)) && norm.length >= 6) {
          return {
            resolvedId: s.id,
            canonical: s,
            matchType: 'FUZZY_ALIAS_INCLUSION',
            isNew: false
          };
        }
      }
    }
  }

  // Không khớp bất kỳ mục nào -> Triệu chứng thực sự mới
  return {
    resolvedId: incomingIdOrName,
    canonical: null,
    matchType: 'NONE',
    isNew: true
  };
}

/**
 * Tự động đăng ký triệu chứng mới vào file chuyên khoa phù hợp
 */
export function registerNewSymptom(symObj) {
  if (!symObj || !symObj.id || !symObj.ten) {
    throw new Error('Dữ liệu triệu chứng mới không hợp lệ: thiếu id hoặc ten');
  }

  const { symptoms, byFile } = loadAllSymptoms();
  const existing = symptoms.find(s => s.id === symObj.id);
  if (existing) {
    console.log(`ℹ️ Triệu chứng [${symObj.id}] đã tồn tại trong ${existing._file}.`);
    return existing;
  }

  // Xác định file đích theo nhóm
  const nhomLower = (symObj.nhom || 'toàn thân').toLowerCase();
  let targetFile = 'toan-than.json';
  for (const [key, f] of Object.entries(SYSTEM_MAP)) {
    if (nhomLower.includes(key)) {
      targetFile = f;
      break;
    }
  }

  // Chuẩn hóa cấu trúc
  const cleanItem = {
    id: symObj.id,
    ten: symObj.ten,
    nhom: symObj.nhom || 'Toàn thân',
    loai: Array.isArray(symObj.loai) ? symObj.loai : ['cn'],
    tuKhoa: Array.isArray(symObj.tuKhoa) && symObj.tuKhoa.length > 0 ? symObj.tuKhoa : [symObj.ten],
    aliases: Array.isArray(symObj.aliases) ? symObj.aliases : [],
    map: symObj.map || null
  };

  const targetPath = path.join(SYMPTOMS_DIR, targetFile);
  const currentList = byFile[targetFile] || [];
  currentList.push(cleanItem);

  fs.writeFileSync(targetPath, JSON.stringify(currentList, null, 2) + '\n', 'utf8');
  console.log(`✨ Đã thêm triệu chứng mới [${cleanItem.id}] vào ${targetFile}`);

  // Đồng bộ lại master bundles
  bundleSymptoms();
  return cleanItem;
}
