/**
 * CliniPortal MedLens — Knowledge Vault SOAP Service
 * Đọc ca lâm sàng trực tiếp từ Knowledge Vault (vault-catalog.json, khoCode: 'BA')
 * Hoàn toàn không phụ thuộc Supabase hay LocalStorage.
 */

import { SoapClinicalExperience, SoapProblemItem } from '../types.ts';
import { VAULT_CATALOG } from './vaultBridge.ts';
import { VaultArticle } from './vaultConstants.ts';

/**
 * Tự động phân tầng Đặt Vấn Đề (Problem List) 3 Tầng cho ca bệnh Vault nếu chưa có sẵn trong dữ liệu
 * Tuân thủ phương pháp luận PGS.TS Hoàng Văn Sĩ (Tầng 1: Khẩn cấp -> Tầng 2: Cấp tính -> Tầng 3: Mạn tính)
 */
function generateFallbackProblemList(
  art: VaultArticle,
  s: any,
  o: any,
  a: any,
  p: any
): SoapProblemItem[] {
  const problems: SoapProblemItem[] = [];
  const vitals = o.vitals || {};
  let order = 1;

  // 1. TẦNG 1: ĐE DỌA SINH HIỆU / HỒI SỨC NGAY
  // Kiểm tra tụt huyết áp
  if (vitals.bp) {
    const bpMatch = String(vitals.bp).match(/(\d{2,3})\s*\/\s*(\d{2,3})/);
    if (bpMatch) {
      const sbp = parseInt(bpMatch[1], 10);
      const dbp = parseInt(bpMatch[2], 10);
      const map = (sbp + 2 * dbp) / 3;
      if (sbp < 90 || map < 65) {
        problems.push({
          order: order++,
          priority: 'life-threatening',
          problemName: `Tụt huyết áp / Dọa sốc (${vitals.bp} mmHg, MAP ~${Math.round(map)} mmHg)`,
          diagnosticOrientation: 'Khí máu động mạch, Định lượng Lactate máu, Cấy máu 2 bộ',
          immediateManagement: 'Hồi sức dịch tinh thể 30 mL/kg, sẵn sàng Noradrenaline nâng MAP >= 65 mmHg',
        });
      }
    }
  }

  // Kiểm tra SpO2 tụt / Suy hô hấp
  if (vitals.spo2) {
    const spo2Val = parseInt(String(vitals.spo2).replace(/\D/g, ''), 10);
    if (spo2Val > 0 && spo2Val < 92) {
      problems.push({
        order: order++,
        priority: 'life-threatening',
        problemName: `Suy hô hấp cấp giảm oxy máu (SpO₂ ${vitals.spo2})`,
        diagnosticOrientation: 'Khí máu động mạch (PaO2, PaCO2, AaDO2), X-quang phổi tại giường',
        immediateManagement: 'Thở oxy qua mask có túi dự trữ 10-15 L/phút, mục tiêu SpO₂ >= 92-95%',
      });
    }
  }

  // Kiểm tra rối loạn tri giác hoặc dọa tụt kẹt não
  const sText = `${s.chiefComplaint || ''} ${s.historyOfPresentIllness || ''} ${o.physicalExam || ''}`.toLowerCase();
  if (
    sText.includes('hôn mê') ||
    sText.includes('lơ mơ') ||
    sText.includes('tụt kẹt') ||
    sText.includes('cushing') ||
    sText.includes('co giật')
  ) {
    problems.push({
      order: order++,
      priority: 'life-threatening',
      problemName: 'Rối loạn tri giác cấp / Nghi ngờ tăng áp lực nội sọ đe dọa tụt kẹt',
      diagnosticOrientation: 'CT-Scanner sọ não khẩn trước khi chọc dò DNT, Đường huyết mao mạch tại giường',
      immediateManagement:
        'Kê đầu cao 30°, thở oxy, Mannitol 20% hoặc NaCl 3% khẩn, chống chỉ định chọc dò tủy sống khi chưa loại trừ tụt kẹt',
    });
  }

  // 2. TẦNG 2: VẤN ĐỀ CẤP TÍNH & HỘI CHỨNG
  const primaryName = a.primaryDiagnosis || art.title || s.chiefComplaint || 'Hội chứng bệnh cấp tính';
  problems.push({
    order: order++,
    priority: 'acute',
    problemName: primaryName,
    diagnosticOrientation:
      o.labsAndImaging && typeof o.labsAndImaging === 'string' && o.labsAndImaging.length > 20
        ? o.labsAndImaging.slice(0, 120) + '...'
        : 'Cận lâm sàng xác định nguyên nhân theo hướng dẫn Bộ Y tế',
    immediateManagement: p.immediateActions || 'Kháng sinh / Phác đồ xử trí đặc hiệu theo phân độ',
  });

  // 3. TẦNG 3: BỆNH NỀN MẠN TÍNH & TƯƠNG TÁC
  const pmh = String(s.pastMedicalHistory || art.pastMedicalHistory || '');
  if (pmh && !pmh.toLowerCase().includes('chưa ghi nhận') && !pmh.toLowerCase().includes('khỏe mạnh')) {
    const rawItems = pmh
      .split(/[,;\n•-]+/)
      .map((t) => t.trim())
      .filter((t) => t.length > 2);
    for (const item of rawItems) {
      const lower = item.toLowerCase();
      let diagGuide = 'Theo dõi chỉ số sinh học định kỳ';
      let rxGuide = 'Duy trì thuốc nền, cân nhắc chỉnh liều theo chức năng thận';

      if (lower.includes('huyết áp') || lower.includes('tha')) {
        rxGuide = 'Tạm hoãn hạ áp nếu đang tụt huyết áp/sốc; duy trì khi huyết động ổn định';
        diagGuide = 'Điện tâm đồ, Men tim, Siêu âm tim';
      } else if (lower.includes('copd') || lower.includes('hen') || lower.includes('phế quản')) {
        rxGuide = 'Khí dung Berodual/Combivent; mục tiêu SpO₂ 88-92% để tránh ức chế trung tâm hô hấp';
        diagGuide = 'Khí máu động mạch kiểm tra PaCO2, X-quang ngực';
      } else if (lower.includes('đái tháo đường') || lower.includes('tiểu đường') || lower.includes('đtđ')) {
        rxGuide = 'Theo dõi đường huyết mao mạch; tạm ngưng Metformin/SGLT2i nếu có suy thận cấp hoặc nhiễm toan';
        diagGuide = 'Đường huyết đói, HbA1c, Ceton máu';
      } else if (lower.includes('thận') || lower.includes('ckd')) {
        rxGuide = 'Chỉnh liều kháng sinh theo độ thanh thải Creatinine; chống chỉ định NSAID và hạn chế thuốc cản quang';
        diagGuide = 'Ure, Creatinine máu, Điện giải đồ, Tổng phân tích nước tiểu';
      } else if (lower.includes('dạ dày') || lower.includes('loét')) {
        rxGuide = 'Thận trọng với thuốc kháng đông, NSAID và Corticoid; dự phòng PPI';
        diagGuide = 'Nội soi dạ dày khi huyết động ổn định nếu nghi ngờ xuất huyết';
      }

      problems.push({
        order: order++,
        priority: 'chronic',
        problemName: item,
        diagnosticOrientation: diagGuide,
        immediateManagement: rxGuide,
      });

      // Tối đa 3 bệnh nền để giao diện gọn gàng
      if (problems.filter((p) => p.priority === 'chronic').length >= 3) break;
    }
  }

  return problems;
}

/**
 * Chuyển đổi một VaultArticle (khoCode === 'BA') thành đối tượng SoapClinicalExperience
 */
export function mapVaultArticleToSoapExperience(art: VaultArticle): SoapClinicalExperience {
  // Nếu có chuỗi JSON lưu trong context
  let parsedContent: Record<string, any> = {};
  if (art.context) {
    try {
      parsedContent = typeof art.context === 'string' 
        ? JSON.parse(art.context) 
        : art.context;
    } catch {
      parsedContent = {};
    }
  }

  const s = parsedContent.s || {
    chiefComplaint: art.snippet || 'Chưa ghi nhận lý do nhập viện',
    historyOfPresentIllness: art.historyOfPresentIllness || art.snippet || '',
    pastMedicalHistory: art.pastMedicalHistory || 'Chưa ghi nhận tiền căn đặc biệt',
    symptomsList: art.keywords || [],
    historyPearls: art.historyPearls || '',
  };

  const o = parsedContent.o || {
    vitals: art.vitals || {},
    physicalExam: art.physicalExam || 'Khám thực thể chưa ghi nhận bất thường',
    labsAndImaging: art.labsAndImaging || 'Chưa có kết quả cận lâm sàng',
    objectivePitfalls: art.objectivePitfalls || '',
  };

  const p = parsedContent.p || {
    immediateActions: art.immediateActions || 'Nghỉ ngơi, theo dõi sinh hiệu',
    medications: art.medications || [],
    monitoringAndTargets: art.monitoringAndTargets || 'Theo dõi sinh hiệu định kỳ',
    consultationOrReferral: art.consultationOrReferral || '',
    takeawayLessons: art.takeawayLessons || '',
  };

  const a = parsedContent.a || {
    primaryDiagnosis: art.title,
    icd10: Array.isArray(art.icd10) ? art.icd10.join(' · ') : (art.icd10 || ''),
    differentials: art.differentials || [],
    riskStratification: art.riskStratification || 'Đang cập nhật',
    diagnosticPearls: art.diagnosticPearls || '',
  };

  // Tự động đảm bảo 100% ca bệnh đều có Bảng Đặt Vấn Đề 3 Tầng
  const problemList =
    (parsedContent.a && Array.isArray(parsedContent.a.problemList) && parsedContent.a.problemList.length > 0)
      ? parsedContent.a.problemList
      : (Array.isArray(art.problemList) && art.problemList.length > 0)
      ? art.problemList
      : generateFallbackProblemList(art, s, o, a, p);

  a.problemList = problemList;

  return {
    id: art.caseId || art.id,
    title: art.title,
    specialty: art.specialty || 'Tổng quát',
    experienceLevel: (art.experienceLevel as any) || 'essential',
    tags: art.tags || [],
    demographicContext: art.demographicContext || art.snippet || '',
    createdAt: art.updated || art.createdAt || '2026-03-01',
    updatedAt: art.updatedAt || new Date().toISOString(),
    authorDoctor: art.authorDoctor || 'Hội đồng Khoa học Knowledge Vault',
    isFavorite: false,
    viewCount: art.viewCount || 0,
    sourceReference: art.sourceReference || `${art.khoName} · Knowledge Vault`,
    clinicalContext: art.clinicalContext || 'Khoa Lâm sàng',
    difficultyRating: (art.difficultyRating as any) || 3,
    outcomeNotes: art.outcomeNotes || '',
    s,
    o,
    a,
    p,
  };
}

/**
 * Lấy toàn bộ ca lâm sàng từ Knowledge Vault (khoCode: 'BA')
 */
export function getVaultSoapExperiences(): SoapClinicalExperience[] {
  const baArticles = VAULT_CATALOG.filter((a) => a.khoCode === 'BA');
  return baArticles.map(mapVaultArticleToSoapExperience);
}

// Alias tương thích ngược để không làm hỏng các component
export function getLocalSoapExperiences(): SoapClinicalExperience[] {
  return getVaultSoapExperiences();
}

/**
 * Lấy chi tiết một ca lâm sàng theo ID từ Knowledge Vault
 */
export function getSoapCaseById(id: string): SoapClinicalExperience | undefined {
  const all = getVaultSoapExperiences();
  return all.find((c) => c.id === id);
}

/**
 * Thống kê ca lâm sàng trong Vault
 */
export function getSoapSyncStats() {
  const all = getVaultSoapExperiences();
  return {
    total: all.length,
    localOnly: 0,
    synced: all.length,
    unsynced: 0,
  };
}

/**
 * Xuất toàn bộ ca lâm sàng dưới dạng chuỗi JSON
 */
export function soapExportAll(): string {
  return JSON.stringify(getVaultSoapExperiences(), null, 2);
}
