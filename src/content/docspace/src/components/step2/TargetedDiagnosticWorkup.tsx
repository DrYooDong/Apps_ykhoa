import React, { useState, useMemo } from 'react';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Check,
  CheckCircle2,
  CheckSquare,
  Clock,
  Copy,
  FileText,
  Filter,
  Flame,
  FlaskConical,
  HeartPulse,
  Layers,
  Microscope,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Square,
  Stethoscope,
  Target,
} from 'lucide-react';
import {
  AnalysisResult,
  ClinicalFormState,
  EpidemiologyContext,
  LabsState,
  ProblemStatementEntry,
  VitalsState,
} from '../../types.ts';
import {
  DIAGNOSTIC_CHAIN_DATABASE,
  DiseaseReactionChainDefinition,
} from '../../../data/diagnostic-criteria-database.ts';
import {
  shortenClinicalText,
  formatLabThreshold,
} from '../../lib/clinicalTextFormatter.ts';

export interface WorkupTestItem {
  id: string;
  name: string;
  purpose: string;
  category: 'Huyết học' | 'Đông máu' | 'Sinh hóa' | 'Vi sinh' | 'CĐHA' | 'Thăm dò chức năng' | 'Nước tiểu';
  tier: 'tier1' | 'tier2';
  subType: 'confirmatory' | 'differential' | 'complication' | 'routine';
  priority: 'stat' | 'urgent' | 'routine';
  threshold?: string;
  existingResult?: string;
  differentialFor?: string;
  rationale?: string;
}

interface TargetedDiagnosticWorkupProps {
  topResult: AnalysisResult;
  results: AnalysisResult[];
  activeChain?: DiseaseReactionChainDefinition;
  vitals?: VitalsState;
  labs?: LabsState;
  form?: ClinicalFormState;
  problems?: ProblemStatementEntry[];
  epiContext?: EpidemiologyContext;
}

export const TargetedDiagnosticWorkup: React.FC<TargetedDiagnosticWorkupProps> = ({
  topResult,
  results,
  activeChain,
  vitals,
  labs,
  form,
  problems = [],
  epiContext,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'tier1' | 'tier2' | 'emr'>('all');
  const [copiedLabWorkup, setCopiedLabWorkup] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<Set<string>>(new Set());

  // 1. TỔNG HỢP DANH MỤC CẬN LÂM SÀNG 2 TẦNG (CHUẨN ĐHYD TP.HCM)
  const allWorkupItems: WorkupTestItem[] = useMemo(() => {
    if (!topResult) return [];

    const items: WorkupTestItem[] = [];
    const disease = topResult.b;
    const diseaseNameLower = disease.ten.toLowerCase();

    // ==========================================
    // TẦNG 1: CẬN LÂM SÀNG CHẨN ĐOÁN & BIẾN CHỨNG
    // ==========================================

    // 1.1. Xét nghiệm Xác chẩn Chẩn đoán sơ bộ
    if (activeChain?.criteria) {
      activeChain.criteria
        .filter((c) => c.type === 'lab' || c.type === 'imaging')
        .forEach((crit) => {
          items.push({
            id: `crit_${crit.id}`,
            name: shortenClinicalText(crit.label),
            purpose: crit.type === 'lab' ? 'Khẳng định tiêu chuẩn cận lâm sàng vàng' : 'CĐHA đánh giá tổn thương tạng đặc hiệu',
            category: crit.type === 'imaging' ? 'CĐHA' : 'Sinh hóa',
            tier: 'tier1',
            subType: 'confirmatory',
            priority: activeChain.severity === 'emergency' ? 'stat' : 'urgent',
            threshold: formatLabThreshold(crit.labThreshold),
          });
        });
    }

    // Tiêu chuẩn vàng hoặc xét nghiệm đặc hiệu chuyên khoa
    if (diseaseNameLower.includes('dengue') || diseaseNameLower.includes('sốt xuất huyết')) {
      items.push({
        id: 'spec_dengue_ns1',
        name: 'Test nhanh Dengue NS1Ag & Kháng thể Dengue IgM/IgG',
        purpose: 'Xác định căn nguyên nhiễm vi rút Dengue cấp (D1-D5: NS1; D5 trở đi: IgM)',
        category: 'Vi sinh',
        tier: 'tier1',
        subType: 'confirmatory',
        priority: 'stat',
      });
      items.push({
        id: 'spec_dengue_cbc_series',
        name: 'Tổng phân tích tế bào máu (CBC) theo dõi động học mỗi 4-6 giờ',
        purpose: 'Giám sát mức độ cô đặc máu (Hct) và tốc độ giảm tiểu cầu để xử trí bù dịch kịp thời',
        category: 'Huyết học',
        tier: 'tier1',
        subType: 'confirmatory',
        priority: 'stat',
        existingResult: labs?.lTC ? `Tiểu cầu: ${labs.lTC} G/L · Hct: ${labs.lHct || '—'}%` : undefined,
      });
      items.push({
        id: 'spec_dengue_us',
        name: 'Siêu âm ổ bụng & màng phổi tại giường (POCUS)',
        purpose: 'Tầm soát hiện tượng thoát huyết tương (dày thành túi mật, dịch màng bụng, tràn dịch màng phổi)',
        category: 'CĐHA',
        tier: 'tier1',
        subType: 'complication',
        priority: 'stat',
      });
    } else if (diseaseNameLower.includes('mạch vành') || diseaseNameLower.includes('nhồi máu') || diseaseNameLower.includes('đau thắt ngực')) {
      items.push({
        id: 'spec_cardiac_trop',
        name: 'Định lượng Troponin I/T độ nhạy cao (hs-cTn) động học (0h - 1h/3h)',
        purpose: 'Khẳng định hoại tử tế bào cơ tim cấp tính và phân tầng nguy cơ tim mạch',
        category: 'Sinh hóa',
        tier: 'tier1',
        subType: 'confirmatory',
        priority: 'stat',
        threshold: '> 14 ng/L',
        existingResult: labs?.lTrop ? `Troponin: ${labs.lTrop} ng/L` : undefined,
      });
      items.push({
        id: 'spec_cardiac_ecg',
        name: 'Điện tâm đồ 12 chuyển đạo lặp lại (Serial ECG)',
        purpose: 'Theo dõi tiến triển ST chênh lên/chênh xuống và loạn nhịp thất đe dọa tính mạng',
        category: 'Thăm dò chức năng',
        tier: 'tier1',
        subType: 'confirmatory',
        priority: 'stat',
      });
      items.push({
        id: 'spec_cardiac_echo',
        name: 'Siêu âm tim qua thành ngực khẩn tại giường',
        purpose: 'Đánh giá rối loạn vận động vùng thành tim, chức năng tâm thu thất trái (LVEF) và biến chứng cơ học',
        category: 'Thăm dò chức năng',
        tier: 'tier1',
        subType: 'complication',
        priority: 'stat',
      });
      items.push({
        id: 'spec_cardiac_dsa',
        name: 'Chụp mạch vành qua da (Coronary Angiography - DSA)',
        purpose: 'Xác định vị trí tổn thương mạch vành thủ phạm để can thiệp tái tưới máu (PCI)',
        category: 'CĐHA',
        tier: 'tier1',
        subType: 'confirmatory',
        priority: 'urgent',
      });
    } else if (diseaseNameLower.includes('màng não')) {
      items.push({
        id: 'spec_csf_analysis',
        name: 'Chọc dò tủy sống & Khảo sát dịch não tủy (DNT)',
        purpose: 'Xác định hội chứng viêm màng não: tế bào, đạm, đường DNT/máu, soi nhuộm Gram & cấy DNT',
        category: 'Vi sinh',
        tier: 'tier1',
        subType: 'confirmatory',
        priority: 'stat',
      });
      items.push({
        id: 'spec_brain_ct',
        name: 'Chụp CT-Scanner sọ não trước chọc dò DNT',
        purpose: 'Loại trừ khối choán chỗ nội sọ và nguy cơ tụt kẹt não trước khi chọc tủy sống',
        category: 'CĐHA',
        tier: 'tier1',
        subType: 'confirmatory',
        priority: 'stat',
      });
    } else if (diseaseNameLower.includes('viêm gan')) {
      items.push({
        id: 'spec_hbv_dna',
        name: 'Định lượng HBV DNA / HCV RNA bằng kỹ thuật Real-time PCR',
        purpose: 'Đánh giá tải lượng vi rút huyết thanh phục vụ quyết định chỉ định thuốc kháng vi rút (NAs/DAAs)',
        category: 'Vi sinh',
        tier: 'tier1',
        subType: 'confirmatory',
        priority: 'urgent',
      });
      items.push({
        id: 'spec_fibroscan',
        name: 'Đo độ đàn hồi mô gan (FibroScan / ARFI)',
        purpose: 'Xác định giai đoạn xơ hóa gan (F0 - F4) không xâm lấn',
        category: 'Thăm dò chức năng',
        tier: 'tier1',
        subType: 'confirmatory',
        priority: 'routine',
      });
    } else if (diseaseNameLower.includes('xơ gan')) {
      items.push({
        id: 'spec_egd_scope',
        name: 'Nội soi thực quản - dạ dày - tá tràng (EGD)',
        purpose: 'Tầm soát và can thiệp thắt vòng cao su giãn tĩnh mạch thực quản (EVL) dự phòng xuất huyết',
        category: 'Thăm dò chức năng',
        tier: 'tier1',
        subType: 'complication',
        priority: 'urgent',
      });
      items.push({
        id: 'spec_liver_us_doppler',
        name: 'Siêu âm Doppler mạch máu gan & Tầm soát ung thư gan (AFP)',
        purpose: 'Đo đường kính và vận tốc dòng chảy tĩnh mạch cửa, tầm soát sớm u gan HCC',
        category: 'CĐHA',
        tier: 'tier1',
        subType: 'confirmatory',
        priority: 'urgent',
      });
    }

    // Các missing cận lâm sàng từ CSDL CDSS
    topResult.missing
      .filter((m) => m.tc.nhom === 'Cận lâm sàng')
      .forEach((m) => {
        const shortened = shortenClinicalText(m.tc.ten);
        const exists = items.some((it) => it.name.toLowerCase().includes(shortened.toLowerCase()));
        if (!exists) {
          items.push({
            id: `missing_${m.tc.id}`,
            name: shortened,
            purpose: `Bổ sung bằng chứng cận lâm sàng đặc hiệu (+${m.w} điểm CDSS)`,
            category: 'Sinh hóa',
            tier: 'tier1',
            subType: 'confirmatory',
            priority: m.w >= 3 ? 'stat' : 'urgent',
          });
        }
      });

    // 1.2. Đánh giá Mức độ nặng & Biến chứng toàn thân
    const sbp = parseFloat(vitals?.vHATT || '');
    const dbp = parseFloat(vitals?.vHATTr || '');
    const spo2 = parseFloat(vitals?.vSpo2 || '');
    const isShock = (!isNaN(sbp) && sbp <= 90) || (!isNaN(sbp) && !isNaN(dbp) && sbp - dbp <= 20);

    if (isShock || (vitals?.vNhiet && parseFloat(vitals.vNhiet) >= 39) || disease.baoDong) {
      items.push({
        id: 'comp_lactate',
        name: 'Định lượng Lactate máu động mạch / tĩnh mạch',
        purpose: 'Đánh giá mức độ giảm tưới máu mô và tình trạng toan chuyển hóa trong sốc',
        category: 'Sinh hóa',
        tier: 'tier1',
        subType: 'complication',
        priority: 'stat',
        threshold: '> 2.0 mmol/L',
      });
      items.push({
        id: 'comp_abg',
        name: 'Khí máu động mạch (ABG - Arterial Blood Gas)',
        purpose: 'Đánh giá toan kiềm máu, PaO2, PaCO2 và phân tầng suy hô hấp cấp',
        category: 'Sinh hóa',
        tier: 'tier1',
        subType: 'complication',
        priority: 'stat',
      });
    }

    // 1.3. Cận lâm sàng Loại trừ Chẩn đoán Phân biệt (Results 1..3)
    results.slice(1, 4).forEach((diff) => {
      const diffName = diff.b.ten;
      const diffNameLower = diffName.toLowerCase();
      let testName = `Xét nghiệm chuyên biệt loại trừ ${diffName}`;
      let purpose = `Đối chiếu phân biệt lâm sàng (khớp ${diff.pct}%)`;
      let cat: 'Vi sinh' | 'CĐHA' | 'Sinh hóa' = 'Sinh hóa';

      if (diffNameLower.includes('nhiễm trùng huyết') || diffNameLower.includes('sốc nhiễm trùng')) {
        testName = 'Cấy máu 2 chai (hiếu khí + kỵ khí) & Định lượng Procalcitonin máu';
        purpose = 'Loại trừ tình trạng nhiễm khuẩn huyết vi khuẩn Gr(-)/Gr(+) xâm lấn';
        cat = 'Vi sinh';
      } else if (diffNameLower.includes('viêm phổi') || diffNameLower.includes('suy hô hấp')) {
        testName = 'X-quang ngực thẳng & Khí máu động mạch';
        purpose = 'Loại trừ tổn thương thâm nhiễm phế nang và suy hô hấp cấp';
        cat = 'CĐHA';
      } else if (diffNameLower.includes('màng não')) {
        testName = 'Chọc dò tủy sống khảo sát dịch não tủy & CT sọ não';
        purpose = 'Loại trừ viêm màng não mủ và xuất huyết dưới nhện';
        cat = 'Vi sinh';
      } else if (diffNameLower.includes('thuyên tắc phổi')) {
        testName = 'Định lượng D-Dimer & Chụp CT mạch máu phổi (CTPA)';
        purpose = 'Loại trừ thuyên tắc động mạch phổi cấp';
        cat = 'CĐHA';
      } else if (diffNameLower.includes('bóc tách')) {
        testName = 'Chụp CT ngực có cản quang (CTA ngực)';
        purpose = 'Loại trừ phình bóc tách động mạch chủ ngực cấp';
        cat = 'CĐHA';
      } else if (diffNameLower.includes('viêm tụy')) {
        testName = 'Định lượng Amylase & Lipase máu; CT bụng cản quang';
        purpose = 'Loại trừ viêm tụy cấp';
        cat = 'Sinh hóa';
      }

      items.push({
        id: `diff_${diff.b.id}`,
        name: testName,
        purpose,
        category: cat,
        tier: 'tier1',
        subType: 'differential',
        priority: 'urgent',
        differentialFor: diffName,
        rationale: `Bệnh nhân có biểu hiện tương đồng (phù hợp ${diff.pct}%)`,
      });
    });

    // ==========================================
    // TẦNG 2: CẬN LÂM SÀNG THƯỜNG QUY (BẮT BUỘC THEO PGS.TS HOÀNG VĂN SỸ)
    // ==========================================

    // 2.1. Huyết học & Đông máu
    const cbcResult = (labs?.lBC || labs?.lTC || labs?.lHct)
      ? `WBC: ${labs?.lBC || '—'} G/L · PLT: ${labs?.lTC || '—'} G/L · Hct: ${labs?.lHct || '—'}%`
      : undefined;

    items.push({
      id: 'routine_cbc',
      name: 'Tổng phân tích tế bào máu ngoại vi bằng máy đếm laser (CBC 18-24 thông số)',
      purpose: 'Tầm soát thiếu máu, phản ứng bạch cầu trong nhiễm trùng/viêm, và số lượng tiểu cầu',
      category: 'Huyết học',
      tier: 'tier2',
      subType: 'routine',
      priority: 'stat',
      existingResult: cbcResult,
    });

    items.push({
      id: 'routine_blood_group',
      name: 'Định nhóm máu hệ ABO và Rh(D)',
      purpose: 'Xác định nhóm máu chuẩn bị sẵn sàng truyền máu cấp cứu hoặc can thiệp phẫu thuật',
      category: 'Huyết học',
      tier: 'tier2',
      subType: 'routine',
      priority: 'urgent',
    });

    items.push({
      id: 'routine_coagulation',
      name: 'Đông máu cơ bản: Thời gian Prothrombin (PT/INR), aPTT, Fibrinogen',
      purpose: 'Đánh giá con đường đông máu ngoại sinh và nội sinh, tầm soát rối loạn đông máu tiêu thụ',
      category: 'Đông máu',
      tier: 'tier2',
      subType: 'routine',
      priority: 'urgent',
    });

    // 2.2. Sinh hóa chức năng tạng
    items.push({
      id: 'routine_renal',
      name: 'Chức năng thận: Định lượng Ure và Creatinine huyết thanh (kèm tính eGFR)',
      purpose: 'Đánh giá chức năng lọc cầu thận, phát hiện tổn thương thận cấp (AKI) và hiệu chỉnh liều thuốc',
      category: 'Sinh hóa',
      tier: 'tier2',
      subType: 'routine',
      priority: 'urgent',
      existingResult: labs?.lCre ? `Creatinine: ${labs.lCre} µmol/L` : undefined,
    });

    items.push({
      id: 'routine_liver',
      name: 'Chức năng gan: Men gan (AST, ALT) và Bilirubin toàn phần / trực tiếp',
      purpose: 'Đánh giá mức độ hoại tử tế bào gan, ứ mật và chức năng chuyển hóa thuốc qua gan',
      category: 'Sinh hóa',
      tier: 'tier2',
      subType: 'routine',
      priority: 'urgent',
      existingResult: labs?.lAST ? `AST: ${labs.lAST} U/L` : undefined,
    });

    items.push({
      id: 'routine_glucose',
      name: 'Định lượng Glucose máu lúc đói (Fasting Plasma Glucose)',
      purpose: 'Tầm soát đái tháo đường, phát hiện hạ đường huyết hoặc tăng đường huyết phản ứng trong stress cấp',
      category: 'Sinh hóa',
      tier: 'tier2',
      subType: 'routine',
      priority: 'urgent',
      existingResult: labs?.lGlu ? `Glucose: ${labs.lGlu} mmol/L` : undefined,
    });

    items.push({
      id: 'routine_electrolytes',
      name: 'Điện giải đồ huyết thanh 4 thông số: Na⁺, K⁺, Cl⁻, Ca²⁺',
      purpose: 'Phát hiện và điều chỉnh kịp thời các rối loạn điện giải nguy hiểm (tăng/hạ kali, hạ natri máu)',
      category: 'Sinh hóa',
      tier: 'tier2',
      subType: 'routine',
      priority: 'stat',
    });

    // 2.3. Xét nghiệm nước tiểu
    items.push({
      id: 'routine_urinalysis',
      name: 'Tổng phân tích nước tiểu 10 thông số (hoặc soi cặn lắng nước tiểu)',
      purpose: 'Tầm soát protein niệu, hồng cầu niệu, bạch cầu, trụ niệu và nhiễm trùng đường tiết niệu',
      category: 'Nước tiểu',
      tier: 'tier2',
      subType: 'routine',
      priority: 'routine',
    });

    // 2.4. Thăm dò chức năng & Chẩn đoán hình ảnh thường quy
    items.push({
      id: 'routine_ecg',
      name: 'Điện tâm đồ (ECG) 12 chuyển đạo tại giường',
      purpose: 'Tầm soát bệnh cơ tim thiếu máu cục bộ, dày thành tim, rối loạn nhịp hoặc thay đổi do điện giải',
      category: 'Thăm dò chức năng',
      tier: 'tier2',
      subType: 'routine',
      priority: 'stat',
    });

    items.push({
      id: 'routine_cxr',
      name: 'X-quang ngực thẳng (Chest X-Ray / CXR) tại giường',
      purpose: 'Khảo sát chỉ số tim-ngực, quai động mạch chủ, nhu mô phổi, rốn phổi và góc sườn hoành',
      category: 'CĐHA',
      tier: 'tier2',
      subType: 'routine',
      priority: 'urgent',
    });

    return items;
  }, [topResult, results, activeChain, vitals, labs]);

  // Khởi tạo chọn tất cả các xét nghiệm mặc định
  useMemo(() => {
    const ids = new Set(allWorkupItems.map((i) => i.id));
    setSelectedItemIds(ids);
  }, [allWorkupItems]);

  const toggleItem = (id: string) => {
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    setSelectedItemIds(new Set(allWorkupItems.map((i) => i.id)));
  };

  const deselectAll = () => {
    setSelectedItemIds(new Set());
  };

  // Phân đoạn theo Tầng
  const tier1Items = useMemo(() => allWorkupItems.filter((i) => i.tier === 'tier1'), [allWorkupItems]);
  const tier2Items = useMemo(() => allWorkupItems.filter((i) => i.tier === 'tier2'), [allWorkupItems]);

  const confirmatoryItems = useMemo(() => tier1Items.filter((i) => i.subType === 'confirmatory'), [tier1Items]);
  const differentialItems = useMemo(() => tier1Items.filter((i) => i.subType === 'differential'), [tier1Items]);
  const complicationItems = useMemo(() => tier1Items.filter((i) => i.subType === 'complication'), [tier1Items]);

  // Sinh Văn bản Y lệnh Cận lâm sàng EMR
  const generatedWorkupEMR = useMemo(() => {
    const patientGender = form?.gioiTinh === 'nam' ? 'Nam' : form?.gioiTinh === 'nu' ? 'Nữ' : 'BN';
    const patientAge = form?.tuoi ? `${form.tuoi} tuổi` : '';

    let text = `Y LỆNH ĐỀ NGHỊ CẬN LÂM SÀNG (CHUẨN 2 TẦNG ĐHYD TP.HCM)\n`;
    text += `Bệnh nhân: ${patientGender} ${patientAge} | Chẩn đoán sơ bộ: ${topResult.b.ten} (ICD-10: ${topResult.b.icd})\n`;
    text += `Ngày giờ lập y lệnh: ${new Date().toLocaleDateString('vi-VN')} ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}\n\n`;

    // TẦNG 1
    const selectedTier1 = tier1Items.filter((i) => selectedItemIds.has(i.id));
    if (selectedTier1.length > 0) {
      text += `I. CẬN LÂM SÀNG CHẨN ĐOÁN & BIẾN CHỨNG (TẦNG 1):\n`;

      // Xác chẩn
      const selConf = selectedTier1.filter((i) => i.subType === 'confirmatory');
      if (selConf.length > 0) {
        text += `  1. Xét nghiệm Xác chẩn Chẩn đoán Sơ bộ:\n`;
        selConf.forEach((c, idx) => {
          const statTag = c.priority === 'stat' ? '[KHẨN]' : '[THƯỜNG]';
          const resTag = c.existingResult ? ` -> (Đã có KQ: ${c.existingResult})` : '';
          text += `     ${idx + 1}. ${statTag} ${c.name} - Mục đích: ${c.purpose}${resTag}\n`;
        });
      }

      // Biến chứng
      const selComp = selectedTier1.filter((i) => i.subType === 'complication');
      if (selComp.length > 0) {
        text += `  2. Đánh giá Mức độ nặng & Giám sát Biến chứng:\n`;
        selComp.forEach((c, idx) => {
          const statTag = c.priority === 'stat' ? '[KHẨN]' : '[THƯỜNG]';
          text += `     ${idx + 1}. ${statTag} ${c.name} - Mục đích: ${c.purpose}\n`;
        });
      }

      // Loại trừ
      const selDiff = selectedTier1.filter((i) => i.subType === 'differential');
      if (selDiff.length > 0) {
        text += `  3. Xét nghiệm Loại trừ Chẩn đoán Phân biệt:\n`;
        selDiff.forEach((d, idx) => {
          text += `     ${idx + 1}. [ƯU TIÊN] ${d.name} (Nhằm loại trừ: ${d.differentialFor} - ${d.purpose})\n`;
        });
      }
      text += `\n`;
    }

    // TẦNG 2
    const selectedTier2 = tier2Items.filter((i) => selectedItemIds.has(i.id));
    if (selectedTier2.length > 0) {
      text += `II. CẬN LÂM SÀNG THƯỜNG QUY NỀN TẢNG (TẦNG 2):\n`;
      selectedTier2.forEach((r, idx) => {
        const statTag = r.priority === 'stat' ? '[KHẨN]' : '[THƯỜNG]';
        const resTag = r.existingResult ? ` -> (Đã có KQ: ${r.existingResult})` : '';
        text += `  ${idx + 1}. ${statTag} ${r.name}${resTag}\n     Mục đích: ${r.purpose}\n`;
      });
      text += `\n`;
    }

    text += `Bác sĩ điều trị ký tên: ___________________________`;
    return text;
  }, [tier1Items, tier2Items, selectedItemIds, form, topResult]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedWorkupEMR);
    setCopiedLabWorkup(true);
    setTimeout(() => setCopiedLabWorkup(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50/90 px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
            <Microscope className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 leading-none flex items-center gap-1.5">
              <span>Đề nghị CLS 2 Tầng</span>
              <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">
                Chuẩn ĐHYD TP.HCM
              </span>
            </h3>
            <span className="text-[10.5px] text-slate-400 font-medium">
              Tầng 1: CĐ & Biến chứng · Tầng 2: Thường quy nền tảng ({selectedItemIds.size}/{allWorkupItems.length} chỉ định đã chọn)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Tab Switcher */}
          <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-white text-[11px]">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-2 py-1 rounded-md font-medium transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả 2 Tầng
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tier1')}
              className={`px-2 py-1 rounded-md font-medium transition-all cursor-pointer ${
                activeTab === 'tier1'
                  ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tầng 1 ({tier1Items.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tier2')}
              className={`px-2 py-1 rounded-md font-medium transition-all cursor-pointer ${
                activeTab === 'tier2'
                  ? 'bg-emerald-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tầng 2 ({tier2Items.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('emr')}
              className={`px-2 py-1 rounded-md font-medium transition-all cursor-pointer ${
                activeTab === 'emr'
                  ? 'bg-indigo-600 text-white shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Văn bản EMR
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={selectedItemIds.size === allWorkupItems.length ? deselectAll : selectAll}
              className="px-2 py-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-md transition-colors cursor-pointer"
              title="Chọn hoặc bỏ chọn tất cả"
            >
              {selectedItemIds.size === allWorkupItems.length ? 'Bỏ chọn' : 'Chọn hết'}
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer shadow-2xs border ${
                copiedLabWorkup
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-800 border-blue-200'
              }`}
              title="Sao chép toàn bộ Y lệnh CLS 2 Tầng vào bộ nhớ tạm"
            >
              {copiedLabWorkup ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLabWorkup ? 'Đã sao chép EMR!' : 'Sao chép Y lệnh'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5">
        {activeTab === 'emr' ? (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-xs font-mono-custom text-slate-800 whitespace-pre-line leading-relaxed select-all">
            {generatedWorkupEMR}
          </div>
        ) : (
          <div className="space-y-6">
            {/* TẦNG 1: CẬN LÂM SÀNG CHẨN ĐOÁN & BIẾN CHỨNG */}
            {(activeTab === 'all' || activeTab === 'tier1') && (
              <div className="border border-blue-200 bg-blue-50/20 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-blue-200">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                      I
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-blue-950 leading-tight">
                        TẦNG 1: CLS CHẨN ĐOÁN &amp; BIẾN CHỨNG (SPECIFIC WORKUP)
                      </h4>
                      <p className="text-[11px] text-blue-700">
                        Xét nghiệm đặc hiệu nhắm vào bệnh sơ bộ «{topResult.b.ten}», loại trừ bệnh phân biệt và theo dõi biến chứng
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-bold">
                    {tier1Items.length} Chỉ định
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Cột 1.1: Xác chẩn Sơ bộ & Giám sát biến chứng */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <FlaskConical className="w-3.5 h-3.5 text-blue-600" />
                      <span>1.1. Xác chẩn Bệnh Sơ bộ ({confirmatoryItems.length})</span>
                    </div>

                    <div className="space-y-2">
                      {confirmatoryItems.map((item) => {
                        const isChecked = selectedItemIds.has(item.id);
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleItem(item.id)}
                            className={`p-2.5 rounded-lg border text-xs flex flex-col gap-1 transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-white border-blue-300 shadow-2xs'
                                : 'bg-slate-50/70 border-slate-200 opacity-60'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-start gap-2">
                                <div className="mt-0.5 text-blue-600">
                                  {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-400" />}
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span
                                      className={`px-1.5 py-0.2 rounded text-[9.5px] font-bold uppercase ${
                                        item.priority === 'stat'
                                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                                      }`}
                                    >
                                      {item.priority === 'stat' ? '⚡ Khẩn cấp' : 'Ưu tiên'}
                                    </span>
                                    <span className="font-bold text-slate-900 text-xs sm:text-[12.5px]">
                                      {item.name}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                                    <b>Mục đích:</b> {item.purpose}
                                  </p>
                                </div>
                              </div>
                              {item.threshold && (
                                <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-800 border border-purple-200 text-[10.5px] font-mono-custom font-semibold shrink-0">
                                  {item.threshold}
                                </span>
                              )}
                            </div>

                            {item.existingResult && (
                              <div className="mt-1 ml-6 p-1.5 bg-emerald-50 border border-emerald-200 rounded text-[11px] text-emerald-800 font-medium flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>✓ Đã có kết quả: <b>{item.existingResult}</b></span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Biến chứng (nếu có) */}
                    {complicationItems.length > 0 && (
                      <div className="pt-2 space-y-2">
                        <div className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                          <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
                          <span>Đánh giá Mức độ nặng &amp; Biến chứng cấp ({complicationItems.length})</span>
                        </div>
                        {complicationItems.map((item) => {
                          const isChecked = selectedItemIds.has(item.id);
                          return (
                            <div
                              key={item.id}
                              onClick={() => toggleItem(item.id)}
                              className={`p-2.5 rounded-lg border text-xs flex flex-col gap-1 transition-all cursor-pointer ${
                                isChecked
                                  ? 'bg-rose-50/40 border-rose-300 shadow-2xs'
                                  : 'bg-slate-50/70 border-slate-200 opacity-60'
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                <div className="mt-0.5 text-rose-600">
                                  {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-400" />}
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="px-1.5 py-0.2 rounded text-[9.5px] font-bold uppercase bg-rose-100 text-rose-800 border border-rose-300">
                                      ⚡ STAT / Khẩn
                                    </span>
                                    <span className="font-bold text-slate-900 text-xs sm:text-[12.5px]">
                                      {item.name}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                                    <b>Mục đích:</b> {item.purpose}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Cột 1.2: Loại trừ Chẩn đoán Phân biệt */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <Filter className="w-3.5 h-3.5 text-amber-600" />
                      <span>1.2. Loại trừ Chẩn đoán Phân biệt ({differentialItems.length})</span>
                    </div>

                    <div className="space-y-2">
                      {differentialItems.length > 0 ? (
                        differentialItems.map((item) => {
                          const isChecked = selectedItemIds.has(item.id);
                          return (
                            <div
                              key={item.id}
                              onClick={() => toggleItem(item.id)}
                              className={`p-2.5 rounded-lg border text-xs flex flex-col gap-1 transition-all cursor-pointer ${
                                isChecked
                                  ? 'bg-white border-amber-300 shadow-2xs'
                                  : 'bg-slate-50/70 border-slate-200 opacity-60'
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                <div className="mt-0.5 text-amber-600">
                                  {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-400" />}
                                </div>
                                <div className="w-full">
                                  <div className="flex items-center justify-between gap-1 flex-wrap mb-1">
                                    <span className="font-bold text-amber-950 text-xs">
                                      {item.name}
                                    </span>
                                    <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                                      Nhằm loại trừ: {item.differentialFor}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-600 leading-relaxed">
                                    <b>Lý do chỉ định:</b> {item.purpose}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="p-4 text-center text-xs text-slate-500 bg-white rounded-lg border border-slate-200">
                          Chưa ghi nhận bệnh cảnh phân biệt cần chỉ định loại trừ riêng biệt.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TẦNG 2: CẬN LÂM SÀNG THƯỜNG QUY NỀN TẢNG */}
            {(activeTab === 'all' || activeTab === 'tier2') && (
              <div className="border border-emerald-200 bg-emerald-50/20 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-emerald-200">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                      II
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-emerald-950 leading-tight">
                        TẦNG 2: CẬN LÂM SÀNG THƯỜNG QUY NỀN TẢNG (ROUTINE BASELINE WORKUP)
                      </h4>
                      <p className="text-[11px] text-emerald-700">
                        Bộ xét nghiệm bắt buộc của bệnh án Nội khoa (PGS.TS Hoàng Văn Sỹ): Tầm soát bệnh nền, đánh giá gan thận trước khi kê đơn
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">
                    {tier2Items.length} Chỉ định cơ bản
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {tier2Items.map((item) => {
                    const isChecked = selectedItemIds.has(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`p-3 rounded-lg border text-xs flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-white border-emerald-300 shadow-2xs hover:border-emerald-400'
                            : 'bg-slate-50/70 border-slate-200 opacity-60'
                        }`}
                      >
                        <div>
                          <div className="flex items-start gap-2 mb-1">
                            <div className="mt-0.5 text-emerald-600">
                              {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-400" />}
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide block">
                                {item.category}
                              </span>
                              <span className="font-bold text-slate-900 text-xs leading-snug">
                                {item.name}
                              </span>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">
                            {item.purpose}
                          </p>
                        </div>

                        {item.existingResult ? (
                          <div className="ml-6 p-1.5 bg-emerald-50 border border-emerald-200 rounded text-[10.5px] text-emerald-800 font-medium flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>✓ Đã có KQ: <b>{item.existingResult}</b></span>
                          </div>
                        ) : (
                          <div className="ml-6 text-[10px] text-amber-700 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-500" />
                            <span>⏳ Cần chỉ định mới</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
