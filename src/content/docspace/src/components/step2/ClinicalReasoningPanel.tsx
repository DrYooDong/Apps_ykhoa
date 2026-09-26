import React, { useState, useMemo } from 'react';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Compass,
  Copy,
  Edit3,
  ExternalLink,
  FileText,
  Flame,
  GitCompare,
  HeartPulse,
  Info,
  Layers,
  Microscope,
  Printer,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
} from 'lucide-react';
import {
  AnalysisResult,
  ClinicalFormState,
  EpidemiologyContext,
  KnowledgeBase,
  LabsState,
  ProblemStatementEntry,
  TrieuChung,
  VitalsState,
} from '../../types.ts';
import {
  DIAGNOSTIC_CHAIN_DATABASE,
  DiseaseReactionChainDefinition,
} from '../../../data/diagnostic-criteria-database.ts';

interface ClinicalReasoningPanelProps {
  topResult: AnalysisResult | null;
  results: AnalysisResult[];
  kb: KnowledgeBase;
  form: ClinicalFormState;
  vitals: VitalsState;
  labs: LabsState;
  selectedSymptoms: TrieuChung[];
  negatedSymptoms: TrieuChung[];
  problems: ProblemStatementEntry[];
  epiContext?: EpidemiologyContext;
  onGoToStep?: (stepId: 't1' | 't2' | 't3' | 't4') => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
  onGoToProtocol?: (diseaseId: string, options?: { gradeIdx?: number; complicationId?: string }) => void;
  onPrintReport?: () => void;
}

export const ClinicalReasoningPanel: React.FC<ClinicalReasoningPanelProps> = ({
  topResult,
  results,
  kb,
  form,
  vitals,
  labs,
  selectedSymptoms,
  negatedSymptoms,
  problems,
  epiContext,
  onGoToStep,
  onOpenVaultDrawer,
  onGoToProtocol,
  onPrintReport,
}) => {
  const [viewMode, setViewMode] = useState<'structured' | 'emr'>('structured');
  const [editing, setEditing] = useState(false);
  const [customText, setCustomText] = useState('');
  const [copied, setCopied] = useState(false);

  // 1. Xác định Vấn đề chính được chọn để biện luận
  const primaryProblem = useMemo(() => {
    const primary = problems.find((p) => p.isPrimary) || problems.find((p) => p.priorityLevel === 'acute') || problems[0];
    if (primary) return primary.label;
    if (form.lyDo && form.lyDo.trim()) return form.lyDo.trim();
    return 'Triệu chứng cấp tính lúc vào viện';
  }, [problems, form.lyDo]);

  // 2. Phân tích Chẩn đoán Sơ bộ (Bệnh nghĩ nhiều nhất)
  const leadDiagnosis = topResult ? topResult.b : null;
  const leadMatchPct = topResult ? topResult.pct : 0;

  // Tra cứu chuỗi phản ứng & tiêu chuẩn chẩn đoán enriched
  const activeChain: DiseaseReactionChainDefinition | undefined = useMemo(() => {
    if (!leadDiagnosis) return undefined;
    if (DIAGNOSTIC_CHAIN_DATABASE[leadDiagnosis.id]) {
      return DIAGNOSTIC_CHAIN_DATABASE[leadDiagnosis.id];
    }
    const cleanName = leadDiagnosis.ten.toLowerCase().trim();
    const cleanIcd = leadDiagnosis.icd.toUpperCase().trim();
    for (const [, c] of Object.entries(DIAGNOSTIC_CHAIN_DATABASE)) {
      if (!c || !c.diseaseName) continue;
      if (
        c.diseaseName.toLowerCase().trim() === cleanName ||
        (c.icdCode && c.icdCode.toUpperCase().trim() === cleanIcd) ||
        (c.icdPrefixes && c.icdPrefixes.some((p) => cleanIcd.startsWith(p.toUpperCase())))
      ) {
        return c;
      }
    }
    return undefined;
  }, [leadDiagnosis]);

  // Triệu chứng chính và phụ của bệnh sơ bộ + phân loại cận lâm sàng ban đầu
  const { mainSymptoms, minorSymptoms, supportiveLabs } = useMemo(() => {
    if (!topResult) return { mainSymptoms: [], minorSymptoms: [], supportiveLabs: [] };

    const matchedNames = topResult.matched.map((m) => m.tc.ten);
    const main: string[] = [];
    const minor: string[] = [];

    topResult.matched.forEach((m) => {
      if (m.tc.vaiTro === 'bb' || m.tc.loai.includes('tt') || m.weight >= 3) {
        main.push(m.tc.ten);
      } else {
        minor.push(m.tc.ten);
      }
    });

    // Dữ kiện cận lâm sàng bất thường ủng hộ kèm phân loại lâm sàng
    const labsFound: {
      raw: string;
      label: string;
      value: string;
      severity: 'critical' | 'warning' | 'abnormal';
      meaning: string;
    }[] = [];

    if (labs.lBC) {
      const bc = parseFloat(labs.lBC);
      if (!isNaN(bc)) {
        if (bc < 4.0) {
          labsFound.push({
            raw: `WBC ${labs.lBC} G/L`,
            label: 'WBC',
            value: `${labs.lBC} G/L (Giảm)`,
            severity: 'warning',
            meaning: 'Bạch cầu giảm do ức chế sinh tủy thoáng qua bởi vi rút',
          });
        } else if (bc > 10.0) {
          labsFound.push({
            raw: `WBC ${labs.lBC} G/L`,
            label: 'WBC',
            value: `${labs.lBC} G/L (Tăng)`,
            severity: 'warning',
            meaning: 'Bạch cầu tăng, phản ứng viêm hệ thống hoặc bội nhiễm vi khuẩn',
          });
        }
      }
    }

    if (labs.lTC) {
      const tc = parseFloat(labs.lTC);
      if (!isNaN(tc)) {
        if (tc < 50) {
          labsFound.push({
            raw: `PLT giảm ${labs.lTC} G/L`,
            label: 'PLT (Tiểu cầu)',
            value: `${labs.lTC} G/L (Giảm nặng)`,
            severity: 'critical',
            meaning: 'Giảm tiểu cầu nghiêm trọng (< 50 G/L) — Nguy cơ xuất huyết nội tạng cao',
          });
        } else if (tc < 100) {
          labsFound.push({
            raw: `PLT giảm ${labs.lTC} G/L`,
            label: 'PLT (Tiểu cầu)',
            value: `${labs.lTC} G/L (Giảm)`,
            severity: 'warning',
            meaning: 'Tiểu cầu giảm nhanh do ức chế tủy xương và tiêu thụ ngoại vi',
          });
        }
      }
    }

    if (labs.lHct) {
      const hct = parseFloat(labs.lHct);
      if (!isNaN(hct)) {
        if (hct > 46) {
          labsFound.push({
            raw: `Hct tăng ${labs.lHct}%`,
            label: 'Hct (Hematocrit)',
            value: `${labs.lHct}% (Cô đặc máu nặng)`,
            severity: 'critical',
            meaning: 'Cô đặc máu rõ rệt phản ánh mức độ thoát huyết tương nghiêm trọng',
          });
        } else if (hct > 44) {
          labsFound.push({
            raw: `Hct tăng ${labs.lHct}%`,
            label: 'Hct (Hematocrit)',
            value: `${labs.lHct}% (Tăng)`,
            severity: 'warning',
            meaning: 'Dấu hiệu thoát huyết tương vào khoang thứ ba (màng bụng, màng phổi)',
          });
        }
      }
    }

    if (labs.lTrop) {
      const trop = parseFloat(labs.lTrop);
      if (!isNaN(trop) && trop > 14) {
        labsFound.push({
          raw: `Troponin tăng ${labs.lTrop} ng/L`,
          label: 'Troponin siêu nhạy',
          value: `${labs.lTrop} ng/L (Dương tính)`,
          severity: 'critical',
          meaning: 'Hoại tử tế bào cơ tim cấp tính, cảnh báo biến cố mạch vành hoặc viêm cơ tim',
        });
      }
    }

    if (labs.lGlu) {
      const glu = parseFloat(labs.lGlu);
      if (!isNaN(glu) && glu > 11.1) {
        labsFound.push({
          raw: `Đường huyết tăng ${labs.lGlu} mmol/L`,
          label: 'Glucose máu',
          value: `${labs.lGlu} mmol/L (Tăng)`,
          severity: 'warning',
          meaning: 'Tăng đường huyết phản ứng stress cấp hoặc đợt mất bù chuyển hóa',
        });
      }
    }

    return {
      mainSymptoms: main.length > 0 ? main : matchedNames.slice(0, 3),
      minorSymptoms: minor.length > 0 ? minor : matchedNames.slice(3),
      supportiveLabs: labsFound,
    };
  }, [topResult, labs]);

  // Đề nghị Cận lâm sàng XÁC CHẨN cho bệnh sơ bộ (Nâng cấp tiêu chuẩn vàng & thời điểm)
  const confirmatoryTests = useMemo(() => {
    if (!leadDiagnosis) return [];
    const tests: {
      name: string;
      purpose: string;
      category: 'gold' | 'dynamic' | 'bedside' | 'specialized';
      timing: string;
    }[] = [];
    const diseaseNameLower = leadDiagnosis.ten.toLowerCase();

    if (diseaseNameLower.includes('dengue') || diseaseNameLower.includes('sốt xuất huyết')) {
      tests.push({
        name: 'Test nhanh Dengue NS1Ag & Kháng thể Dengue IgM/IgG',
        purpose: 'Xác định chính xác căn nguyên nhiễm vi rút DENV (NS1Ag từ N1-N5; IgM/IgG từ N5 trở đi)',
        category: 'gold',
        timing: 'Chỉ định ngay lúc tiếp nhận (N1 - N5)',
      });
      tests.push({
        name: 'Tổng phân tích tế bào máu ngoại vi (CBC) theo dõi mỗi 4-6 giờ',
        purpose: 'Theo dõi sát động học cô đặc máu (tăng Hct) song hành cùng tốc độ sụt giảm tiểu cầu (PLT)',
        category: 'dynamic',
        timing: 'Mỗi 4 - 6 giờ trong giai đoạn nguy hiểm (N4 - N7)',
      });
      tests.push({
        name: 'Siêu âm ổ bụng & màng phổi tại giường (Point-of-Care Ultrasound)',
        purpose: 'Phát hiện sớm thoát huyết tương: tràn dịch màng phổi, dịch ổ bụng, dày thành túi mật (> 4mm)',
        category: 'bedside',
        timing: 'Ngay khi Hct tăng hoặc có dấu hiệu cảnh báo',
      });
    } else if (diseaseNameLower.includes('mạch vành') || diseaseNameLower.includes('nhồi máu') || diseaseNameLower.includes('đau thắt ngực')) {
      tests.push({
        name: 'Định lượng Troponin I/T độ nhạy cao (hs-cTn) động học (0h - 1h/3h)',
        purpose: 'Xác định hoại tử cơ tim cấp tính theo phác đồ động học ESC 0/1h hoặc 0/3h',
        category: 'gold',
        timing: 'Ngay lúc vào viện (0h) và lặp lại sau 1-3 giờ',
      });
      tests.push({
        name: 'Điện tâm đồ (ECG) 12 chuyển đạo lặp lại',
        purpose: 'Định vị vùng thiếu máu / nhồi máu, phát hiện đoạn ST chênh lên hoặc sóng T âm đối xứng',
        category: 'dynamic',
        timing: 'Trong vòng 10 phút đầu khi vào viện và lặp lại mỗi 15-30 phút nếu đau ngực tái phát',
      });
      tests.push({
        name: 'Siêu âm tim qua thành ngực (TTE)',
        purpose: 'Đánh giá rối loạn vận động vùng tương ứng nhánh vành và đo phân suất tống máu thất trái (LVEF)',
        category: 'bedside',
        timing: 'Trong 24 giờ đầu hoặc ngay tại giường nếu có suy tim/tụt HA',
      });
      tests.push({
        name: 'Chụp mạch vành qua da (Coronary Angiography - DSA)',
        purpose: 'Xác định vị trí tắc/hẹp động mạch vành và tiến hành can thiệp tái tưới máu (PCI) khẩn cấp',
        category: 'specialized',
        timing: 'Can thiệp thì đầu < 120 phút (với STEMI) hoặc < 24h (với NSTEMI nguy cơ cao)',
      });
    } else if (diseaseNameLower.includes('màng não')) {
      tests.push({
        name: 'Chọc dò tủy sống khảo sát dịch não tủy (DNT)',
        purpose: 'Phân tích tế bào (bạch cầu đa nhân thoái hóa), sinh hóa (đạm tăng, đường DNT/máu < 0.4), soi nhuộm Gram & cấy DNT',
        category: 'gold',
        timing: 'Càng sớm càng tốt trước liều kháng sinh đầu tiên (nếu không có chống chỉ định)',
      });
      tests.push({
        name: 'Chụp CT-Scanner sọ não trước chọc dò',
        purpose: 'Loại trừ nguy cơ tăng áp lực nội sọ và dọa tụt kẹt não trước khi can thiệp thủ thuật',
        category: 'specialized',
        timing: 'Cần làm trước chọc dò nếu có dấu thần kinh định vị hoặc hôn mê sâu',
      });
      tests.push({
        name: 'Cấy máu 2 vị trí & Đo Procalcitonin / CRP',
        purpose: 'Tìm vi khuẩn gây nhiễm khuẩn huyết kèm theo và theo dõi đáp ứng điều trị kháng sinh',
        category: 'dynamic',
        timing: 'Lấy mẫu ngay trước khi bắt đầu dùng kháng sinh phổ rộng',
      });
    } else if (diseaseNameLower.includes('viêm gan')) {
      tests.push({
        name: 'HBV DNA định lượng / HCV RNA định lượng bằng Real-time PCR',
        purpose: 'Xác định tải lượng vi rút nhân lên để quyết định khởi động thuốc kháng vi rút trực tiếp',
        category: 'gold',
        timing: 'Lúc chẩn đoán ban đầu và định kỳ mỗi 3-6 tháng',
      });
      tests.push({
        name: 'Bộ dấu ấn huyết thanh học (HBsAg, HBeAg, Anti-HBe, Anti-HCV, Anti-HDV)',
        purpose: 'Xác định giai đoạn bệnh sinh học, khả năng lây nhiễm và thể đột biến tiền nhân (pre-core)',
        category: 'specialized',
        timing: 'Lần khám đầu tiên',
      });
      tests.push({
        name: 'Đo độ đàn hồi mô gan (FibroScan / Shear Wave Elastography)',
        purpose: 'Đánh giá mức độ xơ hóa nhu mô gan (F0 - F4) và phát hiện sớm tình trạng xơ gan',
        category: 'specialized',
        timing: 'Khảo sát định kỳ ngoại trú',
      });
    } else if (diseaseNameLower.includes('xơ gan')) {
      tests.push({
        name: 'Nội soi thực quản - dạ dày - tá tràng (EGD)',
        purpose: 'Tầm soát mức độ giãn tĩnh mạch thực quản (F1-F3) và nguy cơ xuất huyết tiêu hóa do tăng áp cửa',
        category: 'specialized',
        timing: 'Thực hiện thường quy khi chẩn đoán xơ gan lần đầu',
      });
      tests.push({
        name: 'Siêu âm Doppler hệ tĩnh mạch cửa & Định lượng AFP',
        purpose: 'Đo tốc độ dòng chảy tĩnh mạch cửa, phát hiện huyết khối và tầm soát ung thư biểu mô tế bào gan (HCC)',
        category: 'bedside',
        timing: 'Mỗi 3 - 6 tháng định kỳ',
      });
      tests.push({
        name: 'Chọc tháo dịch màng bụng làm xét nghiệm SAAG và đếm tế bào',
        purpose: 'Khẳng định cổ trướng do tăng áp lực tĩnh mạch cửa (SAAG >= 1.1 g/dL) và loại trừ viêm phúc mạc tiên phát (SBP)',
        category: 'gold',
        timing: 'Khi có cổ trướng mới xuất hiện hoặc nhập viện vì sốt, đau bụng',
      });
    } else {
      tests.push({
        name: 'Xét nghiệm vi sinh / Sinh học phân tử đặc hiệu (PCR / Kháng thể chuyên sâu)',
        purpose: 'Xác định chính xác căn nguyên gây bệnh theo khuyến cáo của Hội chuyên khoa',
        category: 'gold',
        timing: 'Càng sớm càng tốt trong đợt cấp',
      });
      tests.push({
        name: 'Thăm dò hình ảnh học chuyên sâu (Siêu âm Doppler / CT-Scanner / MRI)',
        purpose: 'Đánh giá giải phẫu học, mức độ tổn thương thực thể và các biến chứng liên quan',
        category: 'bedside',
        timing: 'Theo chỉ định lâm sàng cấp bách',
      });
    }

    return tests;
  }, [leadDiagnosis]);

  // 3. Phân tích Chẩn đoán Phân biệt (CĐPB — Tinh chỉnh xử lý chuỗi, tránh lỗi "Chưa có ..")
  const differentialDiagnoses = useMemo(() => {
    if (results.length <= 1) return [];

    return results.slice(1, 4).map((res) => {
      const diffDisease = res.b;
      const commonSymptoms = res.matched
        .map((m) => m.tc.ten.trim())
        .filter((t) => t && t.length > 2);

      // Làm sạch và chuẩn hóa danh sách triệu chứng phủ định và còn thiếu
      const cleanNegated = negatedSymptoms
        .filter((n) => diffDisease.trieuChung?.some((tcId) => tcId === n.id))
        .map((n) => n.ten.trim().replace(/^[\s\.\,\-]+|[\s\.\,\-]+$/g, ''))
        .filter((name) => name.length >= 2);

      const cleanMissing = res.missing
        .map((s) => s.tc.ten.trim().replace(/^[\s\.\,\-]+|[\s\.\,\-]+$/g, ''))
        .filter((name) => name.length >= 2 && !name.includes('..'));

      // Đề xuất CLS loại trừ chuyên biệt
      let exclusionTest = {
        name: `Xét nghiệm chuyên biệt tầm soát ${diffDisease.ten}`,
        purpose: `Loại trừ chẩn đoán ${diffDisease.ten}`,
        badge: 'Tầm soát',
      };
      const diffNameLower = diffDisease.ten.toLowerCase();

      if (diffNameLower.includes('nhiễm trùng huyết') || diffNameLower.includes('sốc nhiễm trùng')) {
        exclusionTest = {
          name: 'Cấy máu 2 chai (hiếu khí & kỵ khí) & Định lượng Procalcitonin máu',
          purpose: 'Loại trừ nhiễm khuẩn huyết do vi khuẩn Gram âm / Gram dương',
          badge: 'Cần làm ngay',
        };
      } else if (diffNameLower.includes('viêm phổi') || diffNameLower.includes('suy hô hấp')) {
        exclusionTest = {
          name: 'X-quang ngực thẳng & Khí máu động mạch (ABG)',
          purpose: 'Đánh giá đông đặc phế nang và mức độ giảm oxy hóa máu PaO2/FiO2',
          badge: 'Cần làm ngay',
        };
      } else if (diffNameLower.includes('sỏi mật') || diffNameLower.includes('viêm túi mật')) {
        exclusionTest = {
          name: 'Siêu âm gan mật cản quang / MSCT bụng & Bilirubin toàn phần, Bilirubin trực tiếp, GGT, ALP',
          purpose: 'Đánh giá tình trạng giãn đường mật, sỏi kẹt cổ túi mật và thành túi mật dày > 4mm',
          badge: 'Ưu tiên',
        };
      } else if (diffNameLower.includes('bão giáp') || diffNameLower.includes('nhiễm độc giáp')) {
        exclusionTest = {
          name: 'Định lượng FT3, FT4, TSH siêu nhạy & Thang điểm Burch-Wartofsky',
          purpose: 'Xác định bão giáp cấp hoặc nhiễm độc giáp (TSH ức chế sâu, FT4 tăng vọt)',
          badge: 'Khẩn cấp',
        };
      } else if (diffNameLower.includes('hạ natri') || diffNameLower.includes('điện giải')) {
        exclusionTest = {
          name: 'Điện giải đồ máu (Na+, K+, Cl-), Áp lực thẩm thấu máu & Natri niệu',
          purpose: 'Xác định hạ Natri máu thực sự và phân loại nguyên nhân theo thể tích dịch ngoại bào',
          badge: 'Ưu tiên',
        };
      } else if (diffNameLower.includes('màng não')) {
        exclusionTest = {
          name: 'Chọc dò dịch não tủy (DNT) & CT sọ não loại trừ tăng ALNS',
          purpose: 'Loại trừ viêm màng não mủ hoặc xuất huyết khoang dưới nhện',
          badge: 'Khẩn cấp',
        };
      } else if (diffNameLower.includes('viêm tụy')) {
        exclusionTest = {
          name: 'Định lượng Lipase / Amylase máu & Chụp CT bụng có cản quang',
          purpose: 'Loại trừ viêm tụy cấp (tiêu chuẩn Lipase tăng > 3 lần giới hạn trên)',
          badge: 'Khẩn cấp',
        };
      } else if (diffNameLower.includes('thuyên tắc phổi')) {
        exclusionTest = {
          name: 'Định lượng D-Dimer độ nhạy cao & Chụp CT mạch máu phổi (CTPA)',
          purpose: 'Loại trừ thuyên tắc động mạch phổi cấp (PE) theo thang điểm Wells',
          badge: 'Khẩn cấp',
        };
      } else if (diffNameLower.includes('bóc tách')) {
        exclusionTest = {
          name: 'Chụp MSCT ngực có cản quang (CTA ngực)',
          purpose: 'Loại trừ phình bóc tách động mạch chủ ngực cấp (Stanford A/B)',
          badge: 'Cấp cứu tối khẩn',
        };
      }

      return {
        disease: diffDisease,
        pct: res.pct,
        commonSymptoms,
        cleanNegated,
        cleanMissing,
        exclusionTest,
      };
    });
  }, [results, negatedSymptoms]);

  // 4. Đánh giá Toàn diện (Mức độ, Căn nguyên, Biến chứng)
  const comprehensiveAssessment = useMemo(() => {
    let severity = 'Mức độ trung bình, cần theo dõi sát tại khoa điều trị';
    let severityLevel: 'critical' | 'severe' | 'moderate' = 'moderate';
    const sbp = parseFloat(vitals.vHATT);
    const dbp = parseFloat(vitals.vHATTr);
    const pulse = parseFloat(vitals.vMach);
    const spo2 = parseFloat(vitals.vSpo2);
    const hasShock = (!isNaN(sbp) && sbp <= 90) || (!isNaN(sbp) && !isNaN(dbp) && sbp - dbp <= 20);
    const hasHypoxia = !isNaN(spo2) && spo2 < 94;

    if (hasShock || hasHypoxia || (leadDiagnosis && leadDiagnosis.baoDong)) {
      severity = 'Mức độ NẶNG / CẤP CỨU NGUY KỊCH (có dấu hiệu rối loạn huyết động hoặc suy hô hấp, chỉ định theo dõi sát tại Phòng Cấp cứu / Hồi sức ICU)';
      severityLevel = 'critical';
    } else if (problems.some((p) => p.priorityLevel === 'acute')) {
      severity = 'Mức độ CẤP TÍNH có dấu hiệu cảnh báo, cần nhập viện theo dõi sát các chỉ số sinh hiệu và động học xét nghiệm';
      severityLevel = 'severe';
    }

    // Căn nguyên bệnh sinh
    let etiology = 'Chưa xác định căn nguyên vi sinh / giải phẫu học đặc hiệu, đang chờ kết quả xét nghiệm chuyên sâu';
    if (leadDiagnosis) {
      const name = leadDiagnosis.ten.toLowerCase();
      if (name.includes('dengue')) etiology = 'Nhiễm vi rút Dengue (DENV-1, 2, 3 hoặc 4) truyền qua véc tơ muỗi vằn Aedes aegypti gây tăng tính thấm thành mạch và thoát huyết tương';
      else if (name.includes('viêm gan b')) etiology = 'Nhiễm vi rút viêm gan B (HBV) mạn tính gây tổn thương hoại tử nhu mô gan tiến triển';
      else if (name.includes('viêm gan c')) etiology = 'Nhiễm vi rút viêm gan C (HCV) mạn tính';
      else if (name.includes('mạch vành') || name.includes('nhồi máu')) etiology = 'Xơ vữa động mạch vành tiến triển, nứt vỡ mảng xơ vữa dẫn đến hình thành huyết khối cấp gây tắc nghẽn lòng mạch';
      else if (name.includes('não mô cầu')) etiology = 'Nhiễm vi khuẩn Neisseria meningitidis lây truyền qua đường giọt bắn hầu họng';
      else if (name.includes('leptospira')) etiology = 'Nhiễm xoắn khuẩn Leptospira interrogans phơi nhiễm qua vết trầy xước tiếp xúc nước ngập lụt';
    }

    // Biến chứng nguy cơ
    const complications: string[] = [];
    if (hasShock) complications.push('Sốc giảm thể tích do thoát huyết tương ồ ạt / tụt huyết áp');
    if (hasHypoxia) complications.push('Suy hô hấp cấp giảm oxy máu do tràn dịch màng phổi');
    if (labs.lTC && parseFloat(labs.lTC) < 50) complications.push(`Giảm tiểu cầu nặng (${labs.lTC} G/L) có nguy cơ xuất huyết phủ tạng tự phát`);
    if (labs.lHct && parseFloat(labs.lHct) > 46) complications.push(`Cô đặc máu nghiêm trọng (Hct ${labs.lHct}%) do thoát dịch thể`);

    if (activeChain?.complications && activeChain.complications.length > 0) {
      activeChain.complications.slice(0, 2).forEach((c) => {
        if (!complications.some((ex) => ex.toLowerCase().includes(c.name.toLowerCase()))) {
          complications.push(`${c.name} (${c.warningSigns})`);
        }
      });
    }

    const complicationStr = complications.length > 0
      ? complications.join('; ')
      : 'Hiện chưa ghi nhận biến chứng suy cơ quan đe dọa tính mạng tại thời điểm thăm khám.';

    return {
      severity,
      severityLevel,
      etiology,
      complicationStr,
    };
  }, [vitals, labs, problems, leadDiagnosis, activeChain]);

  // 4b. Hệ thống Phân loại 6 Trục & Định tuyến Phác đồ Tự động (Diagnostic Routing Engine)
  const diagnosticRouting = useMemo(() => {
    if (!leadDiagnosis) return null;

    const branching = activeChain?.branching;
    const branches = branching?.branches || [];
    const severityGrades = activeChain?.severityGrading || [];

    const sbp = parseFloat(vitals.vHATT || '');
    const dbp = parseFloat(vitals.vHATTr || '');
    const pulse = parseFloat(vitals.vMach || '');
    const spo2 = parseFloat(vitals.vSpo2 || '');
    const temp = parseFloat(vitals.vNhiet || '');
    const plt = parseFloat(labs.lTC || '');
    const hct = parseFloat(labs.lHct || '');
    const ast = parseFloat(labs.lAST || '');
    const alt = parseFloat(labs.lALT || '');

    const selectedIds = new Set(selectedSymptoms.map((s) => s.id));

    // Cờ lâm sàng
    const hasShock =
      (!isNaN(sbp) && sbp > 0 && sbp <= 90) ||
      (!isNaN(sbp) && !isNaN(dbp) && sbp - dbp <= 20) ||
      (!isNaN(pulse) && !isNaN(sbp) && sbp > 0 && pulse / sbp >= 1.0) ||
      selectedIds.has('tc_soc_mach_nhanh_ha_kep_hoac_tut') ||
      selectedIds.has('soc_mach_nhanh_ha_kep_hoac_tut');

    const hasCriticalOrganFailure =
      (!isNaN(spo2) && spo2 > 0 && spo2 < 92) ||
      (!isNaN(plt) && plt > 0 && plt < 50) ||
      (!isNaN(ast) && ast >= 1000) ||
      (!isNaN(alt) && alt >= 1000) ||
      selectedIds.has('suy_ho_hap_tran_dich_mang_phoi');

    const hasWarningSigns =
      (!isNaN(hct) && hct >= 44) ||
      (!isNaN(plt) && plt > 0 && plt < 100) ||
      (!isNaN(pulse) && pulse >= 100) ||
      (!isNaN(temp) && temp >= 39.0) ||
      (!isNaN(ast) && ast >= 400) ||
      (!isNaN(alt) && alt >= 400) ||
      selectedIds.has('tc_dau_hieu_canh_bao_dau_bung_gan_non_oi') ||
      selectedIds.has('dau_hieu_canh_bao_dau_bung_gan_non_oi') ||
      selectedIds.has('tc_co_dac_mau_hct_tang_tren_20_phan_tram') ||
      selectedIds.has('tc_giam_tieu_cau_duoi_100_g_l') ||
      selectedIds.has('gan_to_dau') ||
      selectedIds.has('non_ra_mau_phan_den') ||
      problems.some((p) => p.priorityLevel === 'acute');

    let targetIndex = 0;
    const matchedReasons: string[] = [];

    if (hasShock || hasCriticalOrganFailure) {
      targetIndex = branches.length > 2 ? 2 : (branches.length > 1 ? 1 : 0);
      if (hasShock) matchedReasons.push('Rối loạn huyết động / Dấu hiệu sốc (HA tụt hoặc kẹp ≤ 20 mmHg)');
      if (!isNaN(spo2) && spo2 < 92) matchedReasons.push(`Giảm oxy máu (SpO2 ${spo2}%)`);
      if (!isNaN(plt) && plt < 50) matchedReasons.push(`Tiểu cầu giảm nặng < 50 G/L (${plt} G/L)`);
      if (selectedIds.has('tc_soc_mach_nhanh_ha_kep_hoac_tut')) matchedReasons.push('Triệu chứng sốc thoát dịch');
    } else if (hasWarningSigns) {
      targetIndex = branches.length > 1 ? 1 : 0;
      if (!isNaN(hct) && hct >= 44) matchedReasons.push(`Cô đặc máu (Hct ${hct}%)`);
      if (!isNaN(plt) && plt < 100) matchedReasons.push(`Tiểu cầu giảm < 100 G/L (${plt} G/L)`);
      if (selectedIds.has('tc_dau_hieu_canh_bao_dau_bung_gan_non_oi')) matchedReasons.push('Dấu hiệu cảnh báo lâm sàng (đau bụng vùng gan / nôn ói)');
      if (!isNaN(ast) && ast >= 400) matchedReasons.push(`Tổn thương tế bào gan (AST ${ast} U/L)`);
    } else {
      targetIndex = 0;
      matchedReasons.push('Sinh hiệu trong ngưỡng ổn định, không có dấu hiệu cảnh báo đe dọa sinh mạng');
    }

    const assignedBranch = branches[targetIndex] || null;
    const assignedGrade = severityGrades[targetIndex] || null;

    const branchName =
      assignedBranch?.name ||
      assignedGrade?.grade ||
      (targetIndex === 2
        ? 'Mức độ Nặng / ICU'
        : targetIndex === 1
        ? 'Mức độ Có cảnh báo / Nội trú'
        : 'Mức độ Nhẹ / Ngoại trú');

    const triageTarget =
      assignedBranch?.triage ||
      assignedGrade?.triage ||
      (targetIndex === 2
        ? 'Khoa Hồi sức Cấp cứu (ICU) / Tuyến cuối'
        : targetIndex === 1
        ? 'Khoa Nội / Truyền nhiễm Bệnh viện'
        : 'Điều trị Ngoại trú / Trạm Y tế');

    const badgeText =
      assignedBranch?.badgeText ||
      (targetIndex === 2 ? 'Hồi sức ICU' : targetIndex === 1 ? 'Nội trú 100%' : 'Ngoại trú');

    const badgeColor: 'rose' | 'amber' | 'emerald' | 'blue' =
      targetIndex === 2 ? 'rose' : targetIndex === 1 ? 'amber' : 'emerald';

    return {
      axisName: branching?.axisName || 'Phân loại theo Mức độ Lâm sàng & Phân tầng Nguy cơ',
      axisType: branching?.axisType || 'severity',
      axisDescription:
        branching?.description ||
        'Phân tầng người bệnh vào nhánh phác đồ phù hợp dựa trên sinh hiệu, cận lâm sàng và dấu hiệu cảnh báo.',
      targetIndex,
      branchName,
      triageTarget,
      badgeText,
      badgeColor,
      matchedReasons,
      escalationCriteria: assignedBranch?.escalationCriteria || (assignedGrade as any)?.escalationCriteria,
      dischargeCriteria: assignedBranch?.dischargeCriteria || (assignedGrade as any)?.dischargeCriteria,
      branchesCount: branches.length || severityGrades.length || 3,
    };
  }, [leadDiagnosis, activeChain, vitals, labs, selectedSymptoms, problems]);

  // 5. Sinh Văn bản Biện luận Lâm sàng EMR hoàn chỉnh
  const generatedReasoningText = useMemo(() => {
    if (!leadDiagnosis) {
      return 'Chưa đủ dữ kiện để xây dựng văn bản biện luận lâm sàng.';
    }

    const lines: string[] = [];

    lines.push('=== BIỆN LUẬN LS (CLINICAL REASONING RECORD) ===');
    lines.push(`(Theo phương pháp Biện luận Phân tích & Tổng hợp · Chuẩn ĐHYD TP.HCM)\n`);

    // A. Chọn vấn đề biện luận
    lines.push(`A. VẤN ĐỀ CHỌN ĐỂ BIỆN LUẬN LS:`);
    lines.push(`BN vào viện vì lý do "${primaryProblem}" nên vấn đề "${primaryProblem}" được lựa chọn làm trục chính để biện luận chẩn đoán.\n`);

    // B. Biện luận Chẩn đoán sơ bộ
    lines.push(`B. BIỆN LUẬN CHẨN ĐOÁN SƠ BỘ (CĐSB):`);
    lines.push(`Từ vấn đề trên, nghĩ nhiều nhất đến: ${leadDiagnosis.ten.toUpperCase()} (ICD-10: ${leadDiagnosis.icd}), với độ phù hợp LS ${leadMatchPct}%.`);
    lines.push(`Lý do nghĩ đến:`);
    if (mainSymptoms.length > 0) {
      lines.push(`- Triệu chứng chính: BN có các biểu hiện đặc thù phù hợp nhất với bệnh cảnh: ${mainSymptoms.join(', ')}.`);
    }
    if (minorSymptoms.length > 0) {
      lines.push(`- Triệu chứng phụ củng cố: Kèm theo ${minorSymptoms.join(', ')}.`);
    }
    if (epiContext && (epiContext.endemicArea || epiContext.outbreakAlert || epiContext.vectorExposure)) {
      const epiDetails = [epiContext.endemicArea, epiContext.outbreakAlert, epiContext.vectorExposure].filter(Boolean).join('; ');
      lines.push(`- Dịch tễ học & Bối cảnh phơi nhiễm: ${epiDetails}.`);
    }
    if (supportiveLabs.length > 0) {
      lines.push(`- Dữ kiện CLS bước đầu ủng hộ: ${supportiveLabs.map((l) => l.raw).join(' · ')}.`);
    }
    lines.push(`\n-> ĐỀ NGHỊ CLS XÁC CHẨN (CĐXĐ):`);
    confirmatoryTests.forEach((t, i) => {
      lines.push(`  ${i + 1}. ${t.name}: Nhằm ${t.purpose.toLowerCase()} (${t.timing}).`);
    });
    lines.push('');

    // C. Biện luận Chẩn đoán phân biệt
    if (differentialDiagnoses.length > 0) {
      lines.push(`C. BIỆN LUẬN CHẨN ĐOÁN PHÂN BIỆT (CĐPB):`);
      lines.push(`Tuy nhiên, cần đặt ra các CĐPB sau nhằm tránh bỏ sót bệnh lý nguy hiểm:`);
      differentialDiagnoses.forEach((d, idx) => {
        lines.push(`\n${idx + 1}. Phân biệt với: ${d.disease.ten.toUpperCase()} (Độ phù hợp: ${d.pct}%):`);
        if (d.commonSymptoms.length > 0) {
          lines.push(`   + Nghĩ đến vì: BN cũng có các triệu chứng tương đồng như ${d.commonSymptoms.slice(0, 3).join(', ')}.`);
        }
        const reasonsLessLikely: string[] = [];
        if (d.cleanNegated.length > 0) {
          reasonsLessLikely.push(`BN không có triệu chứng ${d.cleanNegated.join(', ')}`);
        }
        if (d.cleanMissing.length > 0) {
          reasonsLessLikely.push(`chưa ghi nhận dấu chứng kinh điển như ${d.cleanMissing.slice(0, 2).join(', ')}`);
        }
        if (reasonsLessLikely.length > 0) {
          lines.push(`   + Ít nghĩ hơn vì: ${reasonsLessLikely.join('; ')}.`);
        } else {
          lines.push(`   + Ít nghĩ hơn vì: Bệnh cảnh hiện tại chưa có bằng chứng cận lâm sàng đặc hiệu xác nhận.`);
        }
        lines.push(`   -> Đề nghị CLS để loại trừ: ${d.exclusionTest.name} (nhằm ${d.exclusionTest.purpose.toLowerCase()}).`);
      });
      lines.push('');
    }

    // D. Đánh giá toàn diện
    lines.push(`D. ĐÁNH GIÁ TOÀN DIỆN & PHÂN NHÁNH PHÁC ĐỒ (6 TRỤC LÂM SÀNG):`);
    if (diagnosticRouting) {
      lines.push(`- Trục phân loại: ${diagnosticRouting.axisName} (Mã: ${diagnosticRouting.axisType.toUpperCase()}).`);
      lines.push(`- Nhánh chỉ định: ${diagnosticRouting.branchName} [Tuyến: ${diagnosticRouting.triageTarget}].`);
      lines.push(`- Căn cứ xếp nhánh: ${diagnosticRouting.matchedReasons.join('; ')}.`);
      if (diagnosticRouting.escalationCriteria) {
        lines.push(`- Cảnh báo leo thang: ${diagnosticRouting.escalationCriteria}.`);
      }
    }
    lines.push(`1. Mức độ nặng: ${comprehensiveAssessment.severity}.`);
    lines.push(`2. Nguyên nhân / Căn nguyên: ${comprehensiveAssessment.etiology}.`);
    lines.push(`3. Biến chứng: ${comprehensiveAssessment.complicationStr}.`);

    return lines.join('\n');
  }, [
    leadDiagnosis,
    primaryProblem,
    leadMatchPct,
    mainSymptoms,
    minorSymptoms,
    supportiveLabs,
    epiContext,
    confirmatoryTests,
    differentialDiagnoses,
    comprehensiveAssessment,
    diagnosticRouting,
  ]);

  const handleCopyReasoning = () => {
    const text = customText || generatedReasoningText;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 via-indigo-50/25 to-slate-50 px-4 sm:px-6 py-3.5 border-b border-slate-200 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
              III. Biện luận Lâm sàng & Đề nghị Cận lâm sàng (Clinical Reasoning Engine)
            </h2>
            <span className="text-[11px] text-slate-500 font-medium">
              Phương pháp Biện luận Phân tích & Đánh giá toàn diện · Chuẩn ĐHYD TP.HCM
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Switcher Trực quan / EMR */}
          <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-white text-xs shadow-2xs">
            <button
              type="button"
              onClick={() => {
                setViewMode('structured');
                setEditing(false);
              }}
              className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                viewMode === 'structured' && !editing
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Trực quan
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode('emr');
                setEditing(false);
              }}
              className={`px-3 py-1 rounded-md font-medium transition-all cursor-pointer ${
                viewMode === 'emr' && !editing
                  ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Văn bản EMR
            </button>
            <button
              type="button"
              onClick={() => {
                if (!customText) setCustomText(generatedReasoningText);
                setEditing((prev) => !prev);
              }}
              className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                editing
                  ? 'bg-amber-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-amber-700'
              }`}
            >
              {editing ? 'Đang tự sửa' : 'Tự chỉnh sửa'}
            </button>
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopyReasoning}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all cursor-pointer text-xs font-semibold shadow-2xs ${
              copied
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200'
            }`}
            title={copied ? 'Đã sao chép văn bản biện luận EMR!' : 'Sao chép toàn bộ văn bản biện luận LS'}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Đã chép' : 'Sao chép EMR'}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {editing ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-amber-800 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                Chế độ tự chỉnh sửa văn bản biện luận lâm sàng:
              </span>
              <button
                type="button"
                onClick={() => setCustomText(generatedReasoningText)}
                className="text-xs text-indigo-600 hover:underline cursor-pointer flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Khôi phục bản tự động sinh
              </button>
            </div>
            <textarea
              value={customText || generatedReasoningText}
              onChange={(e) => setCustomText(e.target.value)}
              rows={18}
              className="w-full text-xs font-mono-custom p-4 border border-amber-300 rounded-xl bg-amber-50/20 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
            />
          </div>
        ) : viewMode === 'emr' ? (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs font-mono-custom text-slate-800 whitespace-pre-line leading-relaxed select-all">
            {customText || generatedReasoningText}
          </div>
        ) : (
          /* Structured Visual View (HÌNH 1 NÂNG CẤP TOÀN DIỆN) */
          <div className="flex flex-col gap-5">
            {/* Section A: Vấn đề chính chọn để biện luận */}
            <div className="p-3.5 bg-gradient-to-r from-blue-50 via-indigo-50/50 to-blue-50/30 border border-blue-200/90 rounded-xl flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-700">
                  <span className="text-slate-500 font-medium">Trục vấn đề được chọn để biện luận:</span>{' '}
                  <b className="text-blue-950 font-bold text-sm">"{primaryProblem}"</b>
                </div>
              </div>
              <span className="text-[11px] text-blue-800 font-semibold bg-blue-100/90 border border-blue-200 px-2.5 py-1 rounded-md">
                Lý do vào viện chính · Vấn đề ưu tiên #1
              </span>
            </div>

            {/* Section B: Biện luận Chẩn đoán Sơ bộ (CĐSB) */}
            {leadDiagnosis && (
              <div className="border border-indigo-200 rounded-2xl bg-gradient-to-b from-indigo-50/20 via-white to-white overflow-hidden shadow-xs">
                {/* Header CĐSB */}
                <div className="p-4 bg-gradient-to-r from-indigo-100/80 via-indigo-50/70 to-indigo-100/60 border-b border-indigo-200 flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                      B
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-indigo-950 uppercase tracking-wide">
                          Chẩn đoán Sơ bộ (CĐSB nghĩ nhiều nhất):
                        </span>
                        <span className="text-sm sm:text-base font-extrabold text-blue-950">
                          {leadDiagnosis.ten}
                        </span>
                        <span className="text-xs font-mono-custom text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-200 font-semibold">
                          ICD-10: {leadDiagnosis.icd}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-indigo-600 text-white shadow-xs font-mono-custom flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>{leadMatchPct}% Trùng khớp</span>
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 space-y-4">
                  {/* 1. Các dữ kiện chứng minh lâm sàng */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                        1. Dữ kiện lâm sàng & Dịch tễ học ủng hộ:
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {/* Triệu chứng chính */}
                      <div className="p-3 bg-white border border-blue-200/90 rounded-xl shadow-2xs">
                        <span className="font-bold text-blue-900 block mb-2 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>Triệu chứng chính phù hợp nhất ({mainSymptoms.length}):</span>
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {mainSymptoms.map((m, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded-md bg-blue-50 text-blue-900 border border-blue-200 text-xs font-medium"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Triệu chứng phụ củng cố */}
                      <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs">
                        <span className="font-bold text-slate-800 block mb-2 flex items-center gap-1.5">
                          <Check className="w-4 h-4 text-slate-500 shrink-0" />
                          <span>Triệu chứng phụ củng cố ({minorSymptoms.length}):</span>
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {minorSymptoms.length > 0 ? (
                            minorSymptoms.map((m, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 rounded-md bg-slate-50 text-slate-700 border border-slate-200 text-xs"
                              >
                                {m}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-400 italic text-xs">Không ghi nhận thêm triệu chứng phụ đặc biệt</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Dịch tễ học nếu có */}
                    {epiContext && (epiContext.endemicArea || epiContext.outbreakAlert || epiContext.vectorExposure) && (
                      <div className="mt-2.5 p-2.5 bg-teal-50/70 border border-teal-200 rounded-lg flex items-center gap-2 text-xs text-teal-900">
                        <Info className="w-4 h-4 text-teal-600 shrink-0" />
                        <div>
                          <span className="font-bold">Bối cảnh Dịch tễ học & Véc tơ:</span>{' '}
                          {[epiContext.endemicArea, epiContext.outbreakAlert, epiContext.vectorExposure].filter(Boolean).join(' · ')}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 2. Box Tím: CLS bước đầu ủng hộ chẩn đoán (NÂNG CẤP ĐẲNG CẤP LÂM SÀNG) */}
                  {supportiveLabs.length > 0 && (
                    <div className="p-3.5 sm:p-4 bg-gradient-to-r from-purple-50/80 via-purple-50/50 to-indigo-50/30 border border-purple-200/90 rounded-xl text-xs shadow-2xs space-y-2.5">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="font-bold text-purple-950 flex items-center gap-1.5 text-xs sm:text-sm">
                          <Microscope className="w-4 h-4 text-purple-700 shrink-0" />
                          <span>CLS bước đầu ủng hộ chẩn đoán:</span>
                        </span>
                        <span className="text-[11px] text-purple-800 font-semibold bg-purple-100/90 border border-purple-200 px-2.5 py-0.5 rounded-full">
                          Động học bất thường ban đầu
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                        {supportiveLabs.map((lab, idx) => (
                          <div
                            key={idx}
                            className={`p-2.5 rounded-lg border text-xs flex flex-col justify-between ${
                              lab.severity === 'critical'
                                ? 'bg-rose-50/70 border-rose-200 text-rose-950'
                                : 'bg-purple-100/60 border-purple-200/90 text-purple-950'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="font-bold text-xs flex items-center gap-1">
                                {lab.severity === 'critical' ? (
                                  <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                                ) : (
                                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                                )}
                                <span>{lab.label}</span>
                              </span>
                              <span
                                className={`px-1.5 py-0.5 rounded font-mono-custom font-bold text-[11px] ${
                                  lab.severity === 'critical'
                                    ? 'bg-rose-600 text-white'
                                    : 'bg-purple-700 text-white'
                                }`}
                              >
                                {lab.value}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 mt-1 leading-normal italic">
                              {lab.meaning}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. Box Xanh Lá: Mục tiêu CLS để XÁC CHẨN (CĐXĐ) (NÂNG CẤP TOÀN DIỆN) */}
                  <div className="p-3.5 sm:p-4 bg-gradient-to-r from-emerald-50/90 via-teal-50/50 to-emerald-50/40 border border-emerald-300/80 rounded-xl text-xs shadow-2xs space-y-3">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="font-bold text-emerald-950 flex items-center gap-2 text-xs sm:text-sm">
                        <Target className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>Mục tiêu CLS để XÁC CHẨN (CĐXĐ):</span>
                      </span>
                      {activeChain?.goldStandard && (
                        <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-emerald-600" />
                          <span>Chuẩn EBM Bộ Y Tế</span>
                        </span>
                      )}
                    </div>

                    {activeChain?.goldStandard && (
                      <div className="p-2.5 bg-white/90 border border-emerald-200 rounded-lg text-xs text-emerald-950 font-medium leading-relaxed">
                        <b className="text-emerald-800">Tiêu chuẩn vàng (Gold Standard):</b> {activeChain.goldStandard}
                      </div>
                    )}

                    <div className="space-y-2">
                      {confirmatoryTests.map((t, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-white/95 border border-emerald-200/90 rounded-lg flex items-start gap-2.5 hover:border-emerald-400 transition-colors"
                        >
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span className="font-bold text-slate-900 text-xs sm:text-[13px]">
                                {t.name}
                              </span>
                              <span className="text-[10.5px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                {t.timing}
                              </span>
                            </div>
                            <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                              {t.purpose}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Section C: BIỆN LUẬN CHẨN ĐOÁN PHÂN BIỆT (CĐPB) (HÌNH 1 NÂNG CẤP - TRÁNH LỖI "Chưa có ..") */}
            {differentialDiagnoses.length > 0 && (
              <div className="border border-amber-200 rounded-2xl bg-gradient-to-b from-amber-50/30 via-white to-white overflow-hidden shadow-xs">
                <div className="p-4 bg-gradient-to-r from-amber-100/80 via-amber-50/60 to-amber-100/60 border-b border-amber-200 flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                      C
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-amber-950">
                      BIỆN LUẬN CHẨN ĐOÁN PHÂN BIỆT (CĐPB — {differentialDiagnoses.length} bệnh lý cần loại trừ)
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-800 font-semibold bg-amber-100/90 border border-amber-200 px-2.5 py-0.5 rounded-full">
                    Tránh bỏ sót bệnh lý cấp tính & trùng lắp
                  </span>
                </div>

                <div className="p-4 sm:p-5 space-y-3.5">
                  {differentialDiagnoses.map((diff, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 sm:p-4 bg-white border border-amber-200/90 hover:border-amber-400 rounded-xl space-y-3 text-xs shadow-2xs transition-all"
                    >
                      {/* Tiêu đề chẩn đoán phân biệt */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs">
                            {idx + 1}
                          </span>
                          <span>Phân biệt với:</span>{' '}
                          <span className="text-amber-950 font-bold text-sm">
                            {diff.disease.ten}
                          </span>
                          <span className="text-[11px] font-mono-custom text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                            ICD: {diff.disease.icd}
                          </span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 font-mono-custom text-xs font-bold">
                            {diff.pct}% phù hợp
                          </span>
                          {onGoToProtocol && (
                            <button
                              type="button"
                              onClick={() => onGoToProtocol(diff.disease.id)}
                              className="px-2 py-0.5 rounded text-[11px] font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors flex items-center gap-1 cursor-pointer"
                              title={`Chọn ${diff.disease.ten} làm chẩn đoán chính và chuyển sang lập phác đồ`}
                            >
                              <ArrowRight className="w-3 h-3 text-blue-600" />
                              <span>Xem phác đồ</span>
                            </button>
                          )}
                          {onOpenVaultDrawer && (
                            <button
                              type="button"
                              onClick={() => onOpenVaultDrawer(diff.disease.ten, diff.disease.icd, 'CD')}
                              className="px-2 py-0.5 rounded text-[11px] font-medium text-amber-800 hover:text-amber-950 hover:bg-amber-100/80 transition-colors flex items-center gap-1 cursor-pointer"
                              title="Tra cứu bài viết chuyên khảo trong Kho Chẩn Đoán"
                            >
                              <BookOpen className="w-3 h-3 text-amber-600" />
                              <span>Tra cứu</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* 2 Cột đối sánh: Nghĩ đến vì vs Ít nghĩ hơn vì */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-1 sm:pl-7">
                        {/* Cột Nghĩ đến vì */}
                        <div className="p-2.5 bg-blue-50/50 border border-blue-200/70 rounded-lg">
                          <span className="text-[11px] font-bold text-blue-900 block mb-1 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-blue-600" />
                            <span>Nghĩ đến vì (Điểm tương đồng):</span>
                          </span>
                          <span className="text-xs text-slate-800 leading-relaxed block">
                            {diff.commonSymptoms.length > 0
                              ? diff.commonSymptoms.slice(0, 4).join(', ')
                              : 'Có các triệu chứng toàn thân cấp tính tương đồng'}
                          </span>
                        </div>

                        {/* Cột Ít nghĩ hơn vì (ĐÃ KHẮC PHỤC TRIỆT ĐỂ LỖI "Chưa có ..") */}
                        <div className="p-2.5 bg-rose-50/50 border border-rose-200/70 rounded-lg">
                          <span className="text-[11px] font-bold text-rose-900 block mb-1 flex items-center gap-1">
                            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
                            <span>Ít nghĩ hơn vì (Dấu hiệu loại trừ):</span>
                          </span>
                          <span className="text-xs text-rose-950 leading-relaxed block">
                            {diff.cleanNegated.length > 0 ? (
                              `Bệnh nhân không có biểu hiện: ${diff.cleanNegated.join(', ')}.`
                            ) : diff.cleanMissing.length > 0 ? (
                              `Chưa ghi nhận các dấu chứng kinh điển: ${diff.cleanMissing.slice(0, 2).join(', ')}.`
                            ) : (
                              'Chưa có bằng chứng cận lâm sàng hoặc hình ảnh học đặc hiệu xác nhận chẩn đoán này.'
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Đề xuất CLS loại trừ */}
                      <div className="pl-1 sm:pl-7 pt-2 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap text-xs">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-1.5 py-0.5 rounded text-[10.5px] font-bold uppercase bg-rose-100 text-rose-800 border border-rose-300">
                            {diff.exclusionTest.badge}
                          </span>
                          <span className="text-slate-600 font-medium">CLS để loại trừ:</span>
                          <span className="text-slate-900 font-bold">
                            {diff.exclusionTest.name}
                          </span>
                          <span className="text-slate-500 italic">
                            ({diff.exclusionTest.purpose.toLowerCase()})
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section D: Phân Loại 6 Trục Lâm Sàng & Định Tuyến Phác Đồ (Diagnostic Routing) */}
            <div className="border border-indigo-200 rounded-2xl bg-white p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between gap-2 flex-wrap border-b border-indigo-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                    D
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
                      <span>D. Phân Loại 6 Trục Lâm Sàng & Định Tuyến Phác Đồ</span>
                    </span>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Tự động phân tầng người bệnh theo trục phân loại EBM để kích hoạt nhánh phác đồ phù hợp ở Bước 4
                    </p>
                  </div>
                </div>
                {diagnosticRouting && (
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono-custom font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Trục: {diagnosticRouting.axisType.toUpperCase()}
                  </span>
                )}
              </div>

              {/* CARD ĐỊNH TUYẾN PHÁC ĐỒ NỔI BẬT */}
              {diagnosticRouting && (
                <div
                  className={`p-4 rounded-xl border flex flex-col gap-3 transition-all ${
                    diagnosticRouting.badgeColor === 'rose'
                      ? 'bg-gradient-to-r from-rose-50/90 via-rose-50/40 to-white border-rose-300'
                      : diagnosticRouting.badgeColor === 'amber'
                      ? 'bg-gradient-to-r from-amber-50/90 via-amber-50/40 to-white border-amber-300'
                      : 'bg-gradient-to-r from-emerald-50/90 via-emerald-50/40 to-white border-emerald-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">Trục phân loại:</span>
                      <span className="text-xs font-bold text-slate-800">
                        {diagnosticRouting.axisName}
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        diagnosticRouting.badgeColor === 'rose'
                          ? 'bg-rose-600 text-white shadow-2xs'
                          : diagnosticRouting.badgeColor === 'amber'
                          ? 'bg-amber-600 text-white shadow-2xs'
                          : 'bg-emerald-600 text-white shadow-2xs'
                      }`}
                    >
                      {diagnosticRouting.badgeText}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-200/60">
                    <div>
                      <div className="text-[11px] text-slate-500 uppercase font-semibold">Nhánh phác đồ chỉ định:</div>
                      <div className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                        <Sparkles
                          className={`w-4 h-4 ${
                            diagnosticRouting.badgeColor === 'rose'
                              ? 'text-rose-600'
                              : diagnosticRouting.badgeColor === 'amber'
                              ? 'text-amber-600'
                              : 'text-emerald-600'
                          }`}
                        />
                        <span>{diagnosticRouting.branchName}</span>
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        <span className="font-semibold text-slate-700">Tuyến tiếp nhận:</span>{' '}
                        <span>{diagnosticRouting.triageTarget}</span>
                      </div>
                    </div>

                    {onGoToProtocol && (
                      <button
                        type="button"
                        onClick={() =>
                          onGoToProtocol(leadDiagnosis.id, { gradeIdx: diagnosticRouting.targetIndex })
                        }
                        className={`px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-center hover:translate-x-0.5 ${
                          diagnosticRouting.badgeColor === 'rose'
                            ? 'bg-rose-600 hover:bg-rose-500'
                            : diagnosticRouting.badgeColor === 'amber'
                            ? 'bg-amber-600 hover:bg-amber-500'
                            : 'bg-emerald-600 hover:bg-emerald-500'
                        }`}
                        title="Chuyển thẳng sang Bước 4 và tự động chọn nhánh phác đồ này"
                      >
                        <span>Áp dụng nhánh này (Bước 4)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Căn cứ phân loại tự động */}
                  <div className="pt-2 border-t border-slate-200/50">
                    <span className="text-[11px] font-bold text-slate-700 block mb-1.5 flex items-center gap-1">
                      <Target className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Căn cứ lâm sàng & CLS thỏa mãn:</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {diagnosticRouting.matchedReasons.map((reason, rIdx) => (
                        <span
                          key={rIdx}
                          className="px-2 py-0.5 rounded-md bg-white/90 border border-slate-200 text-[11px] text-slate-800 font-medium shadow-2xs"
                        >
                          &bull; {reason}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tiêu chuẩn leo thang nếu có */}
                  {diagnosticRouting.escalationCriteria && (
                    <div className="p-2.5 rounded-lg bg-amber-100/70 border border-amber-300 text-amber-950 text-xs flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-amber-900 uppercase">Cảnh báo leo thang: </span>
                        <span>{diagnosticRouting.escalationCriteria}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 3 Cột đánh giá: Mức độ - Căn nguyên - Biến chứng */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {/* 1. Mức độ nặng */}
                <div
                  className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                    comprehensiveAssessment.severityLevel === 'critical'
                      ? 'bg-rose-50/80 border-rose-200'
                      : comprehensiveAssessment.severityLevel === 'severe'
                      ? 'bg-amber-50/80 border-amber-200'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div>
                    <span className="font-bold text-slate-700 block mb-1.5 text-[11px] uppercase tracking-wider flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-600" />
                      <span>1. Mức độ nặng tổng thể:</span>
                    </span>
                    <p className="text-slate-800 leading-relaxed font-semibold">
                      {comprehensiveAssessment.severity}
                    </p>
                  </div>
                </div>

                {/* 2. Nguyên nhân / Căn nguyên */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="font-bold text-slate-700 block mb-1.5 text-[11px] uppercase tracking-wider flex items-center gap-1">
                      <Microscope className="w-3.5 h-3.5 text-blue-600" />
                      <span>2. Căn nguyên bệnh sinh:</span>
                    </span>
                    <p className="text-slate-800 leading-relaxed">
                      {comprehensiveAssessment.etiology}
                    </p>
                  </div>
                </div>

                {/* 3. Biến chứng */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="font-bold text-slate-700 block mb-1.5 text-[11px] uppercase tracking-wider flex items-center gap-1">
                      <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
                      <span>3. Dự báo biến chứng:</span>
                    </span>
                    <p className="text-slate-800 leading-relaxed font-medium text-rose-950">
                      {comprehensiveAssessment.complicationStr}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM STRATEGIC ACTION BAR (NÂNG CẤP TÍCH HỢP ĐIỀU HƯỚNG LIỀN MẠCH SANG BƯỚC 4) */}
            {leadDiagnosis && (
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center justify-center shrink-0">
                    <ClipboardCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs sm:text-sm text-white">
                      Hoàn tất biện luận lâm sàng cho: <span className="text-blue-300 font-extrabold">{leadDiagnosis.ten}</span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      {diagnosticRouting
                        ? `Tự động định tuyến vào ${diagnosticRouting.branchName} · Chuyển Bước 4 để lập y lệnh.`
                        : 'Chuyển sang Bước 4 để xác lập phác đồ phân tầng, y lệnh thuốc & theo dõi điều trị chi tiết.'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  {onGoToProtocol && (
                    <button
                      id="btn-goto-protocol-integrated"
                      type="button"
                      onClick={() =>
                        onGoToProtocol(leadDiagnosis.id, {
                          gradeIdx: diagnosticRouting ? diagnosticRouting.targetIndex : 0,
                        })
                      }
                      className="flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs cursor-pointer transition-all hover:translate-x-0.5"
                    >
                      <span>
                        {diagnosticRouting
                          ? `Lập phác đồ: ${diagnosticRouting.branchName.split(':')[0]} (Bước 4)`
                          : 'Tiến hành lập phác đồ điều trị (Bước 4)'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  {onOpenVaultDrawer && (
                    <button
                      type="button"
                      onClick={() => onOpenVaultDrawer(leadDiagnosis.ten, leadDiagnosis.icd, 'PDDT')}
                      className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/20 font-medium text-xs rounded-xl cursor-pointer transition-colors"
                      title="Tra cứu phác đồ điều trị & nghiên cứu y học chứng cứ tương ứng"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-blue-300" />
                      <span>Tra cứu Vault EBM</span>
                    </button>
                  )}

                  {onPrintReport && (
                    <button
                      type="button"
                      onClick={onPrintReport}
                      className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/20 font-medium text-xs rounded-xl cursor-pointer transition-colors"
                      title="In báo cáo bệnh án hoặc xuất bản PDF"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>In báo cáo / PDF</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
