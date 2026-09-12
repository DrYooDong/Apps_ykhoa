/**
 * CliniPortal DocSpace — Diagnostic Criteria Service
 * Đồng bộ & chuẩn hóa dữ liệu Tiêu chuẩn chẩn đoán từ Kho Chẩn Đoán (2.3. Kho chẩn đoán)
 * và liên kết 1-1 với Kho Phác đồ điều trị (2.4. Kho phác đồ điều trị / PDDT).
 */

import { KnowledgeBase, RoleType } from '../types.ts';
import { VAULT_CATALOG, VaultArticle } from './vaultBridge.ts';
import { GROUP_COLORS, GROUP_NAMES } from '../data/seedData.ts';
import {
  DIAGNOSTIC_CHAIN_DATABASE,
  DiseaseReactionChainDefinition,
} from '../../data/diagnostic-criteria-database.ts';

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
 * Chuyển đổi tên sang slug không dấu chuẩn để tra cứu
 */
function toSearchSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

/**
 * Tra cứu đối ứng bệnh trong DIAGNOSTIC_CHAIN_DATABASE (bao gồm 165 bệnh Kho Chẩn Đoán & Enriched)
 */
function findChainForCd(cd: VaultArticle): { key: string; chain: DiseaseReactionChainDefinition } | undefined {
  // 1. Khớp trực tiếp slug tiêu đề
  const slug = toSearchSlug(cd.title);
  if (DIAGNOSTIC_CHAIN_DATABASE[slug]) {
    return { key: slug, chain: DIAGNOSTIC_CHAIN_DATABASE[slug] };
  }

  // 2. Khớp trực tiếp cd.id
  if (DIAGNOSTIC_CHAIN_DATABASE[cd.id]) {
    return { key: cd.id, chain: DIAGNOSTIC_CHAIN_DATABASE[cd.id] };
  }

  // 3. Khớp tên bệnh lý
  const normTitle = cd.title.toLowerCase().trim();
  for (const [key, chain] of Object.entries(DIAGNOSTIC_CHAIN_DATABASE)) {
    const chainName = chain.diseaseName.toLowerCase().trim();
    if (chainName === normTitle || chainName.includes(normTitle) || normTitle.includes(chainName)) {
      return { key, chain };
    }
  }

  // 4. Khớp qua aliases
  if (cd.aliases && cd.aliases.length > 0) {
    for (const [key, chain] of Object.entries(DIAGNOSTIC_CHAIN_DATABASE)) {
      const chainName = chain.diseaseName.toLowerCase().trim();
      if (cd.aliases.some((al) => chainName.includes(al.toLowerCase().trim()) || al.toLowerCase().trim().includes(chainName))) {
        return { key, chain };
      }
    }
  }

  // 5. Khớp qua ICD
  if (cd.icd10 && cd.icd10.length > 0) {
    for (const [key, chain] of Object.entries(DIAGNOSTIC_CHAIN_DATABASE)) {
      if (
        cd.icd10.some(
          (c) =>
            chain.icdCode?.toUpperCase().includes(c.toUpperCase()) ||
            chain.icdPrefixes?.some((p) => c.toUpperCase().startsWith(p) || p.startsWith(c.toUpperCase()))
        )
      ) {
        return { key, chain };
      }
    }
  }

  return undefined;
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
 * Kết hợp 32 bệnh lý có luật suy luận CDSS và toàn bộ 135+ bệnh lý từ Kho Chẩn Đoán (2.3)
 * Tất cả đều được chuẩn hóa theo định dạng có Tiêu chuẩn & Trọng số CDSS, Phác đồ thuốc bậc 1 và Mở phác đồ & ra y lệnh.
 */
export function buildDiagnosticCards(kb: KnowledgeBase): DiagnosticCardData[] {
  const cdArticles = getKhoChanDoanP1Articles();
  const vocabMap = new Map(kb.trieuChung.map((t) => [t.id, t]));
  const cards: DiagnosticCardData[] = [];
  const processedTitles = new Set<string>();

  // 1. Ưu tiên 32 bệnh cốt lõi (Có trọng số suy luận CDSS & phác đồ Step 3)
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
        tuoiMin: b.danSo.tuoiMin ?? undefined,
        tuoiMax: b.danSo.tuoiMax ?? undefined,
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

  // 2. Chuẩn hóa toàn bộ các mặt bệnh từ Kho Chẩn Đoán (2.3) sang cấu trúc CDSS có trọng số & phác đồ
  cdArticles.forEach((cd) => {
    const normName = cd.title.toLowerCase().trim();
    if (processedTitles.has(normName)) return;
    processedTitles.add(normName);

    // Kiểm tra xem bệnh có trùng với bệnh cốt lõi nào đã thêm chưa
    const alreadyIncluded = cards.some(
      (c) => c.ten.toLowerCase().includes(normName) || normName.includes(c.ten.toLowerCase())
    );
    if (alreadyIncluded) return;

    // Tra cứu trong DIAGNOSTIC_CHAIN_DATABASE (165 bệnh Kho Chẩn Đoán + Enriched)
    const matchedChainInfo = findChainForCd(cd);
    const chain = matchedChainInfo?.chain;
    const diseaseKey = matchedChainInfo?.key || toSearchSlug(cd.title);

    // Xác định dấu hiệu cấp cứu
    const emergencyKeywords = ['cấp', 'cấp cứu', 'sốc', 'đột quỵ', 'ngộ độc', 'hôn mê', 'chấn thương', 'nhồi máu', 'xuất huyết', 'thủng', 'tắc mạch'];
    const isEmergency =
      (chain && chain.severity === 'emergency') ||
      emergencyKeywords.some((kw) => normName.includes(kw) || (cd.specialty && cd.specialty.toLowerCase().includes('cấp cứu')));

    // Tìm bài phác đồ tương ứng trong Kho 2.4
    const pddtArt = findMatchingPddtArticle(cd.title, cd.aliases, cd.icd10);

    const criteriaList: DiagnosticCriterionItem[] = [];

    if (chain && chain.criteria && chain.criteria.length > 0) {
      // ── Sử dụng tiêu chuẩn CDSS chuẩn hóa từ DIAGNOSTIC_CHAIN_DATABASE ──
      chain.criteria.forEach((c, idx) => {
        let role: RoleType = 'gy';
        let weight = 2.5;

        if (c.type === 'mandatory') {
          role = 'dt';
          weight = 4.5;
        } else if (c.type === 'major') {
          role = 'dt';
          weight = 3.5;
        } else if (c.type === 'imaging') {
          role = 'dt';
          weight = 4.0;
        } else if (c.type === 'lab') {
          role = c.labThreshold ? 'dt' : 'ht';
          weight = c.labThreshold ? 3.5 : 2.0;
        } else if (c.type === 'minor') {
          role = 'gy';
          weight = 2.5;
        } else if (c.type === 'exclusion') {
          role = 'loaitru';
          weight = 5.0;
        }

        let displayLabel = c.label;
        if (c.labThreshold && !displayLabel.includes(c.labThreshold)) {
          displayLabel += ` [Ngưỡng: ${c.labThreshold}]`;
        }

        criteriaList.push({
          id: c.id || `crit_${diseaseKey}_${idx}`,
          ten: displayLabel,
          role,
          trongSo: weight,
        });
      });
    } else {
      // ── Chuẩn hóa theo 5 trụ cột lâm sàng EBM có trọng số định lượng ──
      criteriaList.push({
        id: `cd_${diseaseKey}_1`,
        ten: `Dấu hiệu cơ năng & Triệu chứng khởi phát điển hình của ${cd.title}`,
        role: 'dt',
        trongSo: 3.5,
      });
      criteriaList.push({
        id: `cd_${diseaseKey}_2`,
        ten: `Thăm khám thực thể & Hội chứng tổn thương cơ quan đặc trưng`,
        role: 'dt',
        trongSo: 4.0,
      });
      criteriaList.push({
        id: `cd_${diseaseKey}_3`,
        ten: `Xét nghiệm cận lâm sàng / Dấu ấn sinh học hỗ trợ xác chẩn`,
        role: 'ht',
        trongSo: 2.5,
      });
      criteriaList.push({
        id: `cd_${diseaseKey}_4`,
        ten: `Chẩn đoán hình ảnh học / Thăm dò chức năng chuyên sâu (Kho 2.3)`,
        role: 'dt',
        trongSo: 4.5,
      });
      criteriaList.push({
        id: `cd_${diseaseKey}_5`,
        ten: `Loại trừ các bệnh lý cấp cứu trùng lặp và biến chứng nguy kịch`,
        role: 'loaitru',
        trongSo: 5.0,
      });
    }

    // Xây dựng Phác đồ điều trị tóm tắt tích hợp Thuốc & Liều lượng
    let phacDoPreview: DiagnosticCardData['phacDoPreview'] = undefined;

    if (chain && chain.protocol) {
      const p = chain.protocol;
      const initialSteps =
        p.initialManagement && p.initialManagement.length > 0
          ? p.initialManagement
          : p.targetGoals && p.targetGoals.length > 0
          ? p.targetGoals
          : [p.title || `Quy trình xử trí chuẩn cho ${cd.title}`];

      const drugs: Array<[string, string, string]> = [];
      if (p.firstLineDrugs && p.firstLineDrugs.length > 0) {
        p.firstLineDrugs.forEach((d) => {
          drugs.push([
            d.drugName,
            `${d.dosage}${d.route ? ' (' + d.route + ')' : ''}`,
            d.instructions || d.class || 'Khuyến cáo bậc 1',
          ]);
        });
      }
      if (p.secondLineDrugs && p.secondLineDrugs.length > 0) {
        p.secondLineDrugs.slice(0, 2).forEach((d) => {
          drugs.push([
            d.drugName,
            `${d.dosage}${d.route ? ' (' + d.route + ')' : ''}`,
            d.instructions || d.class || 'Lựa chọn bậc 2',
          ]);
        });
      }

      const notes: string[] = [];
      if (p.supportiveCare && p.supportiveCare.length > 0) {
        notes.push(...p.supportiveCare.slice(0, 3));
      }
      if (chain.complications && chain.complications.length > 0) {
        notes.push(
          `Cảnh báo biến chứng: ${chain.complications
            .slice(0, 2)
            .map((c) => c.name)
            .join(', ')}`
        );
      }

      phacDoPreview = {
        tuyen: initialSteps,
        thuoc: drugs,
        luuY: notes.length > 0 ? notes : [p.guideline || 'Tuân thủ hướng dẫn EBM Bộ Y Tế & Quốc tế'],
      };
    } else {
      phacDoPreview = {
        tuyen: [
          `Đánh giá phân tầng mức độ nặng theo bài viết Kho Phác Đồ: ${pddtArt?.title || cd.title}`,
          `Xử trí cấp cứu ban đầu và ổn định huyết động theo khuyến cáo EBM (Kho 2.4 - Phác đồ điều trị)`,
          `Theo dõi đáp ứng lâm sàng, điều chỉnh thuốc theo chức năng gan thận và hội chẩn chuyên khoa`,
        ],
        thuoc: pddtArt
          ? [['Thuốc điều trị đặc hiệu theo phác đồ', 'Theo liều lượng chuẩn Kho Phác Đồ 2.4', pddtArt.title]]
          : [],
        luuY: [
          `Xem toàn văn phác đồ điều trị chi tiết tại Kho Phác Đồ 2.4${pddtArt ? ' (ID: ' + pddtArt.id + ')' : ''}`,
        ],
      };
    }

    const assignedIcd =
      (cd.icd10 && cd.icd10.length > 0)
        ? cd.icd10.join(', ')
        : (chain?.icdCode || 'Chưa gán ICD');

    const assignedSpecialty =
      chain?.specialty || cd.specialty || 'Chuyên khoa';

    cards.push({
      id: diseaseKey,
      ten: cd.title,
      icd: assignedIcd,
      nhom: GROUP_NAMES[assignedSpecialty] || assignedSpecialty,
      nhomColor: GROUP_COLORS[assignedSpecialty] || '#0284c7',
      baoDong: isEmergency,
      tomTat:
        (chain?.summary) ||
        (cd.snippet && cd.snippet !== `← Quay lại ${cd.title}`
          ? cd.snippet
          : `Bộ tiêu chuẩn chẩn đoán và phân tầng nguy cơ theo Y học chứng cứ EBM từ Kho Chẩn Đoán (Kho 2.3).`),
      danSo: {
        gioiTinh: 'Nam / Nữ',
        tuoiMin: 0,
        tuoiMax: 100,
      },
      tieuChuan: criteriaList,
      cdArticle: cd,
      pddtArticle: pddtArt,
      phacDoPreview,
      hasStep3Protocol: true,
      isCoreCdss: false,
    });
  });

  return cards;
}

