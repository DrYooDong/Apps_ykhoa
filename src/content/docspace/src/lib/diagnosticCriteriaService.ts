/**
 * CliniPortal DocSpace — Diagnostic Criteria Service
 * Đồng bộ & chuẩn hóa dữ liệu Tiêu chuẩn chẩn đoán từ Kho Chẩn Đoán (2.3. Kho chẩn đoán)
 * và liên kết 1-1 với Kho Phác đồ điều trị (2.4. Kho phác đồ điều trị / PDDT).
 */

import { KnowledgeBase, RoleType } from '../types.ts';
import { VAULT_CATALOG, VaultArticle } from './vaultBridge.ts';
import { GROUP_COLORS, GROUP_NAMES } from '../data/seedData.ts';

export interface DiagnosticCriterionItem {
  id: string;
  ten: string;
  role: RoleType;
  trongSo: number;
}

export interface DiagnosticCardData {
  id: string;
  ten: string;
  icd: string;
  nhom: string;
  nhomColor: string;
  baoDong: boolean;
  tomTat: string;
  danSo?: {
    gioiTinh: string;
    tuoiMin?: number;
    tuoiMax?: number;
  };
  tieuChuan: DiagnosticCriterionItem[];
  // Kho Chẩn Đoán (2.3) metadata
  cdArticle?: VaultArticle;
  // Kho Phác Đồ (2.4) metadata
  pddtArticle?: VaultArticle;
  // Phác đồ tóm tắt
  phacDoPreview?: {
    tuyen: string[];
    thuoc: Array<[string, string, string]>;
    luuY: string[];
  };
  hasStep3Protocol: boolean;
  isCoreCdss: boolean;
}

/**
 * Lấy danh sách bài viết Part 1 từ Kho Chẩn Đoán (2.3)
 */
export function getKhoChanDoanP1Articles(): VaultArticle[] {
  return VAULT_CATALOG.filter((art) => art.khoCode === 'CD' && (art.part === 'P1' || !art.part));
}

/**
 * Lấy danh sách bài viết Part 1 từ Kho Phác Đồ (2.4)
 */
export function getKhoPhacDoP1Articles(): VaultArticle[] {
  return VAULT_CATALOG.filter((art) => art.khoCode === 'PDDT' && (art.part === 'P1' || !art.part));
}

/**
 * Tìm bài viết Phác đồ (PDDT) tương ứng với bài Chẩn đoán (CD)
 */
export function findMatchingPddtArticle(cdTitle: string, aliases: string[] = [], icd: string[] = []): VaultArticle | undefined {
  const pddtList = getKhoPhacDoP1Articles();
  const normTitle = cdTitle.toLowerCase().trim();

  // 1. Exact title match
  let match = pddtList.find((p) => p.title.toLowerCase().trim() === normTitle);
  if (match) return match;

  // 2. Title includes
  match = pddtList.find((p) => {
    const pTitle = p.title.toLowerCase().trim();
    return pTitle.includes(normTitle) || normTitle.includes(pTitle);
  });
  if (match) return match;

  // 3. Match via aliases
  if (aliases.length > 0) {
    match = pddtList.find((p) => {
      const pTitle = p.title.toLowerCase().trim();
      return aliases.some((al) => {
        const normAl = al.toLowerCase().trim();
        return pTitle === normAl || pTitle.includes(normAl) || normAl.includes(pTitle);
      });
    });
    if (match) return match;
  }

  // 4. Match via ICD
  if (icd.length > 0) {
    match = pddtList.find((p) => {
      if (!p.icd10 || p.icd10.length === 0) return false;
      return icd.some((c) => p.icd10!.some((pc) => pc.toUpperCase().includes(c.toUpperCase()) || c.toUpperCase().includes(pc.toUpperCase())));
    });
    if (match) return match;
  }

  return undefined;
}

/**
 * Xây dựng danh sách thẻ Tiêu chuẩn chẩn đoán chuẩn hóa
 * Kết hợp 14 bệnh lý có luật suy luận CDSS và toàn bộ bệnh lý từ Kho Chẩn Đoán (2.3)
 */
export function buildDiagnosticCards(kb: KnowledgeBase): DiagnosticCardData[] {
  const cdArticles = getKhoChanDoanP1Articles();
  const vocabMap = new Map(kb.trieuChung.map((t) => [t.id, t]));
  const cards: DiagnosticCardData[] = [];
  const processedTitles = new Set<string>();

  // 1. Ưu tiên 14 bệnh cốt lõi (Có trọng số suy luận CDSS & phác đồ Step 3)
  kb.benh.forEach((b) => {
    const normName = b.ten.toLowerCase().trim();
    processedTitles.add(normName);

    // Tìm bài viết tương ứng trong Kho Chẩn Đoán (2.3)
    const cdArt = cdArticles.find((art) => {
      const artName = art.title.toLowerCase().trim();
      const matchName = artName.includes(normName) || normName.includes(artName);
      const matchIcd = b.icd && art.icd10 && art.icd10.some((c) => b.icd.includes(c) || c.includes(b.icd));
      const matchAlias = art.aliases && art.aliases.some((al) => normName.includes(al.toLowerCase()) || al.toLowerCase().includes(normName));
      return matchName || matchIcd || matchAlias;
    });

    // Tìm bài viết tương ứng trong Kho Phác Đồ (2.4)
    const pddtArt = cdArt
      ? findMatchingPddtArticle(cdArt.title, cdArt.aliases, cdArt.icd10)
      : findMatchingPddtArticle(b.ten, [], [b.icd]);

    // Chuẩn hóa tiêu chuẩn & trọng số từ kb.benh.dd
    const tieuChuan: DiagnosticCriterionItem[] = b.dd.map(([tcId, w, role]) => {
      const tc = vocabMap.get(tcId);
      return {
        id: tcId,
        ten: tc?.ten || tcId,
        role: role as RoleType,
        trongSo: w,
      };
    });

    cards.push({
      id: b.id,
      ten: b.ten,
      icd: b.icd,
      nhom: GROUP_NAMES[b.nhom] || b.nhom,
      nhomColor: GROUP_COLORS[b.nhom] || '#2563eb',
      baoDong: !!b.baoDong,
      tomTat: b.tomTat,
      danSo: b.danSo ? {
        gioiTinh: b.danSo.gioiTinh === 'any' ? 'Nam / Nữ' : b.danSo.gioiTinh,
        tuoiMin: b.danSo.tuoiMin,
        tuoiMax: b.danSo.tuoiMax,
      } : undefined,
      tieuChuan,
      cdArticle: cdArt,
      pddtArticle: pddtArt,
      phacDoPreview: b.phacDo ? {
        tuyen: b.phacDo.tuyen,
        thuoc: b.phacDo.thuoc,
        luuY: b.phacDo.luuY,
      } : undefined,
      hasStep3Protocol: true,
      isCoreCdss: true,
    });
  });

  // 2. Bổ sung các mặt bệnh còn lại từ Kho Chẩn Đoán (2.3)
  cdArticles.forEach((cd) => {
    const normName = cd.title.toLowerCase().trim();
    if (processedTitles.has(normName)) return;
    processedTitles.add(normName);

    // Kiểm tra xem bệnh có trùng với bệnh cốt lõi nào đã thêm chưa
    const alreadyIncluded = cards.some(
      (c) => c.ten.toLowerCase().includes(normName) || normName.includes(c.ten.toLowerCase())
    );
    if (alreadyIncluded) return;

    // Xác định dấu hiệu cấp cứu
    const emergencyKeywords = ['cấp', 'cấp cứu', 'sốc', 'đột quỵ', 'ngộ độc', 'hôn mê', 'chấn thương', 'nhồi máu', 'xuất huyết', 'thủng', 'tắc mạch'];
    const isEmergency = emergencyKeywords.some(
      (kw) => normName.includes(kw) || (cd.specialty && cd.specialty.toLowerCase().includes('cấp cứu'))
    );

    // Tìm bài phác đồ tương ứng trong Kho 2.4
    const pddtArt = findMatchingPddtArticle(cd.title, cd.aliases, cd.icd10);

    // Trích xuất tiêu chuẩn chẩn đoán từ từ khóa và alias của Kho Chẩn Đoán
    const criteriaList: DiagnosticCriterionItem[] = [];
    const seenCriteria = new Set<string>();

    if (cd.keywords && cd.keywords.length > 0) {
      cd.keywords.forEach((kw, idx) => {
        const clean = kw.trim();
        if (clean.length < 3 || clean.toLowerCase() === normName) return;
        if (seenCriteria.has(clean.toLowerCase())) return;
        seenCriteria.add(clean.toLowerCase());

        // Gán trọng số & phân loại vai trò
        const isSpec = idx < 2 || clean.includes('score') || clean.includes('tiêu chuẩn') || clean.includes('dấu') || clean.includes('x-quang') || clean.includes('ct');
        const role: RoleType = isSpec ? 'dt' : idx < 5 ? 'gy' : 'ht';
        const weight = isSpec ? 4 : role === 'gy' ? 3 : 2;

        // Viết hoa chữ cái đầu
        const displayCriterion = clean.charAt(0).toUpperCase() + clean.slice(1);

        criteriaList.push({
          id: `cd_${cd.id}_${idx}`,
          ten: displayCriterion,
          role,
          trongSo: weight,
        });
      });
    }

    // Nếu không có keyword, tạo tiêu chuẩn mặc định dựa theo tiêu đề
    if (criteriaList.length === 0) {
      criteriaList.push({
        id: `cd_${cd.id}_0`,
        ten: `Biểu hiện lâm sàng điển hình của ${cd.title}`,
        role: 'dt',
        trongSo: 4,
      });
      criteriaList.push({
        id: `cd_${cd.id}_1`,
        ten: `Cận lâm sàng & Hình ảnh học xác chẩn (Kho 2.3)`,
        role: 'gy',
        trongSo: 3,
      });
    }

    cards.push({
      id: cd.id,
      ten: cd.title,
      icd: (cd.icd10 && cd.icd10.length > 0) ? cd.icd10.join(', ') : 'Chưa gán ICD',
      nhom: cd.specialty || 'Chuyên khoa tổng quát',
      nhomColor: '#0284c7',
      baoDong: isEmergency,
      tomTat: cd.snippet && cd.snippet !== `← Quay lại ${cd.title}`
        ? cd.snippet
        : `Bộ tiêu chuẩn chẩn đoán và phân tầng nguy cơ theo Y học chứng cứ EBM từ Kho Chẩn Đoán (Kho 2.3).`,
      danSo: {
        gioiTinh: 'Nam / Nữ',
        tuoiMin: 0,
        tuoiMax: 100,
      },
      tieuChuan: criteriaList,
      cdArticle: cd,
      pddtArticle: pddtArt,
      phacDoPreview: pddtArt ? {
        tuyen: [
          `Đánh giá phân tầng mức độ nặng theo bài viết Kho Phác Đồ: ${pddtArt.title}`,
          `Xử trí cấp cứu ban đầu theo khuyến cáo EBM (Kho 2.4 - Phác đồ điều trị)`,
          `Theo dõi đáp ứng lâm sàng và hội chẩn chuyên khoa`,
        ],
        thuoc: [],
        luuY: [
          `Xem toàn văn phác đồ điều trị chi tiết tại Kho Phác Đồ 2.4 (ID: ${pddtArt.id})`,
        ],
      } : undefined,
      hasStep3Protocol: false,
      isCoreCdss: false,
    });
  });

  return cards;
}
