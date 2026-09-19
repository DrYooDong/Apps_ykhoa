import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Calendar,
  Calculator,
  Check,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  ClipboardCopy,
  Filter,
  Heart,
  Pill,
  Printer,
  RotateCcw,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import {
  Benh,
  ClinicalFormState,
  KnowledgeBase,
  LabsState,
  VitalsState,
} from '../types.ts';
import {
  DIAGNOSTIC_CHAIN_DATABASE,
  SeverityGradingItem,
} from '../../data/diagnostic-criteria-database.ts';
import { GROUP_COLORS, GROUP_NAMES } from '../data/seedData.ts';
import {
  findVaultArticlesForDisease,
  getPathwayArticles,
  getToolsForDisease,
  VaultArticle,
} from '../lib/vaultBridge.ts';
import {
  extractRecommendedDrugs,
  getGuidelinesForDisease,
} from '../lib/guidelineBridge.ts';
import { getSimilarSoapCases } from '../lib/crossReferenceEngine.ts';
import { getDailyTreatmentTimeline } from '../lib/dailyTreatmentTimeline.ts';
import { PatientCounselingPanel } from './PatientCounselingPanel.tsx';

// Subcomponents in step3/
import { CollapsibleProtocolSection } from './step3/CollapsibleProtocolSection.tsx';
import { SeverityGradingPanel } from './step3/SeverityGradingPanel.tsx';
import { CustomOrder, ProtocolOrderSheet } from './step3/ProtocolOrderSheet.tsx';
import { DailyTimelineTable } from './step3/DailyTimelineTable.tsx';
import { ComplicationsTriageSection } from './step3/ComplicationsTriageSection.tsx';
import { ClinicalCalculatorsSection } from './step3/ClinicalCalculatorsSection.tsx';
import { MonitoringCautionsSection } from './step3/MonitoringCautionsSection.tsx';
import { EbmGuidelinesSection } from './step3/EbmGuidelinesSection.tsx';
import { SoapCasesSection } from './step3/SoapCasesSection.tsx';

interface Step3Props {
  kb: KnowledgeBase;
  selectedDiseaseId: string | null;
  initialGradeIdx?: number | null;
  initialComplicationId?: string | null;
  onSelectDisease: (id: string) => void;
  onBackToAnalysis: () => void;
  onSaveToPostgres: () => void;
  onPrintReport: () => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
  onOpenPromptBuilder?: (diseaseName?: string) => void;
  onNavigateToSoapCase?: (caseId: string) => void;
  form?: ClinicalFormState;
  vitals?: VitalsState;
  labs?: LabsState;
}

export const Step3Protocol: React.FC<Step3Props> = ({
  kb,
  selectedDiseaseId,
  initialGradeIdx,
  initialComplicationId,
  onSelectDisease,
  onBackToAnalysis,
  onPrintReport,
  onOpenVaultDrawer,
  onOpenPromptBuilder,
  onNavigateToSoapCase,
  form,
  vitals,
  labs,
}) => {
  // Local state for checked orders & custom additions
  const [checkedOrders, setCheckedOrders] = useState<Set<string>>(new Set());
  const [customOrders, setCustomOrders] = useState<CustomOrder[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  // Collapsible sections state: all sections collapsed by default except Severity Staging
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    rx: false,
    procedures: false,
    complications: false,
    calculators: false,
    monitoring: false,
    counseling: false,
    ebm: false,
    soap: false,
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExpandAll = () => {
    setExpandedSections({
      rx: true,
      procedures: true,
      complications: true,
      calculators: true,
      monitoring: true,
      counseling: true,
      ebm: true,
      soap: true,
    });
  };

  const handleCollapseAll = () => {
    setExpandedSections({
      rx: false,
      procedures: false,
      complications: false,
      calculators: false,
      monitoring: false,
      counseling: false,
      ebm: false,
      soap: false,
    });
  };

  // Severity Grade & Active Complication State
  const [selectedGradeIdx, setSelectedGradeIdx] = useState<number>(0);
  const [activeComplicationIndices, setActiveComplicationIndices] = useState<Set<number>>(new Set());

  // Merge kb.benh and all diseases from DIAGNOSTIC_CHAIN_DATABASE
  const allAvailableDiseases = useMemo(() => {
    const list: Benh[] = [...kb.benh];
    const seenIds = new Set(list.map((b) => b.id));
    const seenNames = new Set(list.map((b) => b.ten.toLowerCase().trim()));

    for (const [key, chain] of Object.entries(DIAGNOSTIC_CHAIN_DATABASE)) {
      const normName = chain.diseaseName.toLowerCase().trim();
      if (seenIds.has(key) || seenNames.has(normName)) continue;
      seenIds.add(key);
      seenNames.add(normName);

      const tuyen =
        chain.protocol?.initialManagement && chain.protocol.initialManagement.length > 0
          ? chain.protocol.initialManagement
          : chain.protocol?.targetGoals && chain.protocol.targetGoals.length > 0
          ? chain.protocol.targetGoals
          : [chain.protocol?.title || `Quy trình xử trí chuẩn cho ${chain.diseaseName}`];

      const thuoc: Array<[string, string, string]> = [];
      if (chain.protocol?.firstLineDrugs && chain.protocol.firstLineDrugs.length > 0) {
        chain.protocol.firstLineDrugs.forEach((d) => {
          thuoc.push([
            d.drugName,
            `${d.dosage}${d.route ? ' (' + d.route + ')' : ''}`,
            d.instructions || d.class || 'Khuyến cáo bậc 1',
          ]);
        });
      }
      if (chain.protocol?.secondLineDrugs && chain.protocol.secondLineDrugs.length > 0) {
        chain.protocol.secondLineDrugs.slice(0, 2).forEach((d) => {
          thuoc.push([
            d.drugName,
            `${d.dosage}${d.route ? ' (' + d.route + ')' : ''}`,
            d.instructions || d.class || 'Lựa chọn bậc 2',
          ]);
        });
      }

      const theoDoi =
        chain.monitoringLabs && chain.monitoringLabs.length > 0
          ? chain.monitoringLabs
          : ['Theo dõi sát sinh hiệu, SpO2, mạch, huyết áp mỗi 1-2 giờ', 'Đánh giá đáp ứng lâm sàng sau 24-48 giờ'];

      const luuY = [
        ...(chain.protocol?.supportiveCare || []),
        ...(chain.complications ? chain.complications.slice(0, 2).map((c) => `Cảnh báo: ${c.name} - ${c.warningSigns}`) : []),
      ];

      list.push({
        id: key,
        ten: chain.diseaseName,
        icd: chain.icdCode,
        nhom: chain.specialty || 'Chuyên khoa',
        baoDong: chain.severity === 'emergency',
        ghiChuBaoDong: chain.severity === 'emergency' ? `Cảnh báo cấp cứu khẩn cấp: ${chain.diseaseName}` : '',
        tomTat: chain.summary,
        danSo: { gioiTinh: 'any', tuoiMin: 0, tuoiMax: 120 },
        dd: chain.criteria
          ? chain.criteria.map((c) => [
              c.id,
              c.type === 'mandatory' ? 4.5 : c.type === 'major' ? 3.5 : 2.5,
              c.type === 'exclusion' ? 'loaitru' : 'dt',
            ])
          : [],
        phacDo: {
          tuyen,
          thuoc:
            thuoc.length > 0
              ? thuoc
              : [['Theo dõi và điều trị triệu chứng', 'Theo liều lượng chuẩn EBM', 'Khuyến cáo chuyên khoa']],
          theoDoi,
          luuY: luuY.length > 0 ? luuY : ['Tuân thủ nghiêm ngặt chỉ định và chống chỉ định'],
          nguon: [chain.protocol?.guideline || 'Hướng dẫn chẩn đoán và điều trị Bộ Y tế & EBM'],
        },
      });
    }

    return list;
  }, [kb.benh]);

  // Currently viewed disease
  const currentDisease: Benh = useMemo(() => {
    return allAvailableDiseases.find((b) => b.id === selectedDiseaseId) || allAvailableDiseases[0];
  }, [allAvailableDiseases, selectedDiseaseId]);

  // Active reaction chain
  const activeChain = useMemo(() => {
    if (!currentDisease) return undefined;
    if (DIAGNOSTIC_CHAIN_DATABASE[currentDisease.id]) {
      return DIAGNOSTIC_CHAIN_DATABASE[currentDisease.id];
    }
    const cleanName = currentDisease.ten.toLowerCase().trim();
    for (const [, c] of Object.entries(DIAGNOSTIC_CHAIN_DATABASE)) {
      if (c.diseaseName.toLowerCase().trim() === cleanName) {
        return c;
      }
    }
    return undefined;
  }, [currentDisease]);

  // Knowledge Vault articles & pathways
  const pathway = useMemo(() => {
    return getPathwayArticles(currentDisease?.ten || '');
  }, [currentDisease]);

  const diseaseTools: VaultArticle[] = useMemo(() => {
    if (!currentDisease) return [];
    return getToolsForDisease(currentDisease.ten, currentDisease.icd);
  }, [currentDisease]);

  const matchedGuidelines = useMemo(() => {
    if (!currentDisease) return [];
    return getGuidelinesForDisease(currentDisease);
  }, [currentDisease]);

  const similarSoapCases = useMemo(() => {
    if (!currentDisease) return [];
    return getSimilarSoapCases({
      diseaseName: currentDisease.ten,
      icd10: currentDisease.icd,
      specialty: currentDisease.nhom,
    });
  }, [currentDisease]);

  // Complication Auto-activation
  useEffect(() => {
    if (initialComplicationId && activeChain?.complications) {
      const targetIdx = activeChain.complications.findIndex(
        (c) => c.id === initialComplicationId || c.name.toLowerCase().includes(initialComplicationId.toLowerCase())
      );
      if (targetIdx !== -1) {
        setActiveComplicationIndices((prev) => new Set([...prev, targetIdx]));
        setExpandedSections((prev) => ({ ...prev, complications: true, rx: true }));

        const comp = activeChain.complications[targetIdx];
        if (comp.orderSet && comp.orderSet.length > 0) {
          const newOrders: CustomOrder[] = comp.orderSet.map((item: any, i: number) => ({
            id: `init_comp_${Date.now()}_${i}`,
            drug: `[XỬ TRÍ CẤP CỨU: ${comp.name}] ${item.drug}`,
            dosage: item.dosage,
            note: item.note,
            completed: false,
          }));
          setCustomOrders((prev) => {
            const existingDrugs = new Set(prev.map((p) => p.drug));
            const toAdd = newOrders.filter((n) => !existingDrugs.has(n.drug));
            return toAdd.length > 0 ? [...prev, ...toAdd] : prev;
          });
        }
      }
    }
  }, [initialComplicationId, activeChain]);

  // Available Severity Grades
  const severityGrades: SeverityGradingItem[] = useMemo(() => {
    if (activeChain?.hasSeverityGrading === false || activeChain?.stagingType === 'none') {
      return [];
    }
    if (activeChain?.severityGrading && activeChain.severityGrading.length > 0) {
      return activeChain.severityGrading;
    }
    if (activeChain?.severityGrading && activeChain.severityGrading.length === 0) {
      return [];
    }
    return [
      {
        grade: 'Mức độ 1: Thể Nhẹ / Điều trị Ngoại trú',
        severity: 'mild',
        criteria: 'Triệu chứng khởi phát nhẹ đến vừa, sinh hiệu ổn định, không có dấu hiệu cảnh báo đe dọa sinh mạng.',
        triage: 'Ngoại trú / Trạm y tế / Phòng khám',
        primaryAction: 'Dùng thuốc đường uống, bù nước điện giải, dặn dò các dấu hiệu cảnh báo cần tái khám khẩn.',
        targetVitals: 'Sinh hiệu trong giới hạn bình thường theo tuổi',
      },
      {
        grade: 'Mức độ 2: Thể Trung bình / Theo dõi Nội trú',
        severity: 'moderate',
        criteria: 'Có ít nhất 1 dấu hiệu cảnh báo, triệu chứng tiến triển, hoặc có bệnh lý nền/cơ địa nguy cơ cao.',
        triage: 'Nội trú / Khoa Chuyên môn Bệnh viện Quận - Huyện',
        primaryAction: 'Khởi động điều trị nội trú, theo dõi sát sinh hiệu và cận lâm sàng định kỳ mỗi 4–6 giờ.',
        targetVitals: 'Duy trì tưới máu tạng, lượng nước tiểu ≥ 0.5 mL/kg/h',
      },
      {
        grade: 'Mức độ 3: Thể Nặng / Cấp cứu Hồi sức (ICU)',
        severity: 'critical',
        criteria: 'Rối loạn huyết động (tụt HA, sốc), suy hô hấp, xuất huyết nặng hoặc tổn thương suy đa cơ quan.',
        triage: 'Phòng Hồi sức Cấp cứu / ICU Bệnh viện Tỉnh',
        primaryAction: 'Hồi sức khẩn cấp theo giờ vàng, bù dịch tĩnh mạch/vận mạch, can thiệp chuyên sâu và hội chẩn.',
        targetVitals: 'HATT ≥ 90 mmHg, MAP ≥ 65 mmHg, SpO2 ≥ 95%',
      },
    ];
  }, [activeChain]);

  // Auto-suggest grade index based on vitals/labs
  const autoSuggestedGradeIndex = useMemo(() => {
    if (!vitals) return 0;
    const hatt = parseFloat(vitals.vHATT || '120');
    const hattr = parseFloat(vitals.vHATTr || '80');
    const mach = parseFloat(vitals.vMach || '80');
    const spo2 = parseFloat(vitals.vSpo2 || '98');
    const tc = labs ? parseFloat(labs.lTC || '250') : 250;
    const hct = labs ? parseFloat(labs.lHct || '40') : 40;

    if (
      (hatt > 0 && hatt <= 90) ||
      (hatt > 0 && hattr > 0 && hatt - hattr <= 20) ||
      (spo2 > 0 && spo2 < 92) ||
      (tc > 0 && tc < 50) ||
      (mach > 0 && hatt > 0 && mach / hatt >= 1.0)
    ) {
      return severityGrades.length > 2 ? severityGrades.length - 1 : 1;
    }

    if (
      mach >= 100 ||
      parseFloat(vitals.vNhiet || '37') >= 39.0 ||
      (tc > 0 && tc < 100) ||
      hct >= 44
    ) {
      return severityGrades.length > 1 ? 1 : 0;
    }

    return 0;
  }, [vitals, labs, severityGrades]);

  useEffect(() => {
    if (initialGradeIdx !== undefined && initialGradeIdx !== null) {
      setSelectedGradeIdx(initialGradeIdx);
    } else {
      setSelectedGradeIdx(autoSuggestedGradeIndex);
    }
  }, [initialGradeIdx, currentDisease?.id, autoSuggestedGradeIndex]);

  const activeSeverityGrade = useMemo(() => {
    return severityGrades[selectedGradeIdx] || severityGrades[0];
  }, [severityGrades, selectedGradeIdx]);

  // Phác đồ điều trị phân độ
  const phacDo = useMemo(() => {
    if (activeSeverityGrade?.protocol) {
      const sp = activeSeverityGrade.protocol;
      const tuyen = sp.tuyen || sp.initialManagement || currentDisease?.phacDo?.tuyen || [];
      const thuoc: Array<[string, string, string]> = sp.drugs
        ? sp.drugs
        : sp.firstLineDrugs
        ? sp.firstLineDrugs.map((d) => [
            d.drugName,
            `${d.dosage}${d.route ? ' (' + d.route + ')' : ''}`,
            d.instructions || d.class || 'Khuyến cáo phân độ',
          ])
        : currentDisease?.phacDo?.thuoc || [];
      const theoDoi = sp.monitoring || currentDisease?.phacDo?.theoDoi || [];
      const luuY = sp.cautions || currentDisease?.phacDo?.luuY || [];
      const nguon = [
        sp.title || activeChain?.protocol?.guideline || currentDisease?.phacDo?.nguon?.[0] || 'Hướng dẫn chẩn đoán và điều trị Bộ Y tế',
      ];
      return { tuyen, thuoc, theoDoi, luuY, nguon };
    }

    return (
      currentDisease?.phacDo || {
        tuyen: [
          'Đánh giá ABC: Đảm bảo đường thở thông thoáng, kiểm soát hô hấp và tuần hoàn',
          'Thiết lập đường truyền tĩnh mạch lớn (G18-G20), theo dõi sát mạch và huyết áp',
          'Lấy máu xét nghiệm cấp cứu: Công thức máu, điện giải đồ, chức năng gan thận',
          'Theo dõi monitor sinh hiệu liên tục, chuẩn bị phương tiện cấp cứu',
        ],
        thuoc: [
          ['Natri Clorid 0,9%', '500 ml TTM 30 giọt/phút', 'duy trì đường truyền'],
          ['Paracetamol', '1 g TTM khi sốt >= 38.5°C hoặc đau nhiều', 'cách mỗi 6h'],
        ],
        theoDoi: [
          'Theo dõi tri giác, dấu hiệu sinh tồn (Mạch, HA, SpO2, Nhịp thở) mỗi 15-30 phút',
          'Lượng nước tiểu 24 giờ, mục tiêu >= 0.5 ml/kg/h',
        ],
        luuY: [
          'Thận trọng với bệnh nhân suy tim, suy thận mạn tính hoặc tiền căn dị ứng thuốc',
          'Hội chẩn chuyên khoa nếu diễn tiến lâm sàng không đáp ứng sau 2 giờ đầu',
        ],
        nguon: ['Hướng dẫn chẩn đoán và điều trị Bộ Y tế Việt Nam'],
      }
    );
  }, [activeSeverityGrade, activeChain, currentDisease]);

  // Timeline phases
  const timelinePhases = useMemo(() => {
    if (!currentDisease) return [];
    return getDailyTreatmentTimeline(
      currentDisease.id,
      currentDisease.ten,
      activeSeverityGrade,
      phacDo
    );
  }, [currentDisease, activeSeverityGrade, phacDo]);

  const allPrescribedDrugNames = useMemo(() => {
    const list: string[] = [];
    if (phacDo?.thuoc) {
      phacDo.thuoc.forEach(([d]) => list.push(d));
    }
    customOrders.forEach((co) => list.push(co.drug));
    return list;
  }, [phacDo, customOrders]);

  const activeComplications = useMemo(() => {
    return activeChain?.complications || [];
  }, [activeChain]);

  const handleToggleComplication = (idx: number) => {
    setActiveComplicationIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const handleAddComplicationOrder = (comp: any) => {
    if (comp.orderSet && Array.isArray(comp.orderSet) && comp.orderSet.length > 0) {
      const newOrders: CustomOrder[] = comp.orderSet.map((item: any, i: number) => ({
        id: `comp_${Date.now()}_${i}`,
        drug: `[XỬ TRÍ: ${comp.name}] ${item.drug}`,
        dosage: item.dosage,
        note: item.note,
        completed: false,
      }));
      setCustomOrders((prev) => [...newOrders, ...prev]);
    } else {
      const newOrder: CustomOrder = {
        id: `comp_${Date.now()}`,
        drug: `[XỬ TRÍ KHẨN: ${comp.name}]`,
        dosage: comp.preventiveAction || 'Theo phác đồ xử trí biến chứng',
        note: comp.onCallAlertText || 'Lệnh trực báo động khẩn',
        completed: false,
      };
      setCustomOrders((prev) => [newOrder, ...prev]);
    }
    setExpandedSections((prev) => ({ ...prev, rx: true }));
  };

  const handleAddPreventionOrder = (drug: string, dosage: string, note: string) => {
    const newOrder: CustomOrder = {
      id: `prev_${Date.now()}`,
      drug: `[PHÒNG NGỪA BIẾN CHỨNG] ${drug}`,
      dosage,
      note,
      completed: false,
    };
    setCustomOrders((prev) => [newOrder, ...prev]);
    setExpandedSections((prev) => ({ ...prev, rx: true }));
  };

  const handleApplyGuidelineDrugs = (study: any) => {
    const drugs = extractRecommendedDrugs(study);
    if (!drugs.length) return;
    const newItems: CustomOrder[] = drugs.map((d, i) => ({
      id: `guideline_${study.id}_${Date.now()}_${i}`,
      drug: d.name,
      dosage: 'Theo phác đồ khuyến cáo',
      note: d.note,
      completed: false,
    }));
    setCustomOrders((prev) => [...prev, ...newItems]);
    setExpandedSections((prev) => ({ ...prev, rx: true }));
  };

  // Order actions
  const toggleOrder = (key: string) => {
    setCheckedOrders((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleCustomOrder = (id: string) => {
    setCustomOrders((prev) =>
      prev.map((co) => (co.id === id ? { ...co, completed: !co.completed } : co))
    );
  };

  const addCustomOrder = (order: { drug: string; dosage: string; note: string }) => {
    setCustomOrders((prev) => [
      {
        id: `custom_${Date.now()}`,
        drug: order.drug,
        dosage: order.dosage,
        note: order.note,
        completed: false,
      },
      ...prev,
    ]);
  };

  const removeCustomOrder = (id: string) => {
    setCustomOrders((prev) => prev.filter((co) => co.id !== id));
  };

  const handleCompleteAll = () => {
    if (!currentDisease) return;
    const next = new Set(checkedOrders);
    phacDo.tuyen.forEach((_, idx) => next.add(`tuyen-${currentDisease.id}-g${selectedGradeIdx}-${idx}`));
    phacDo.thuoc.forEach((_, idx) => next.add(`thuoc-${currentDisease.id}-g${selectedGradeIdx}-${idx}`));
    phacDo.theoDoi.forEach((_, idx) => next.add(`theodoi-${currentDisease.id}-g${selectedGradeIdx}-${idx}`));
    setCheckedOrders(next);
    setCustomOrders((prev) => prev.map((co) => ({ ...co, completed: true })));
  };

  const handleResetOrders = () => {
    if (!currentDisease) return;
    setCheckedOrders((prev) => {
      const next = new Set(prev);
      phacDo.tuyen.forEach((_, idx) => next.delete(`tuyen-${currentDisease.id}-g${selectedGradeIdx}-${idx}`));
      phacDo.thuoc.forEach((_, idx) => next.delete(`thuoc-${currentDisease.id}-g${selectedGradeIdx}-${idx}`));
      phacDo.theoDoi.forEach((_, idx) => next.delete(`theodoi-${currentDisease.id}-g${selectedGradeIdx}-${idx}`));
      return next;
    });
    setCustomOrders((prev) => prev.map((co) => ({ ...co, completed: false })));
  };

  // Progress Calculation
  const totalStandardOrders = phacDo.tuyen.length + phacDo.thuoc.length + phacDo.theoDoi.length;
  const totalAllOrders = totalStandardOrders + customOrders.length;
  const currentCheckedCount =
    Array.from(checkedOrders).filter((key) => key.startsWith(`tuyen-${currentDisease.id}-g${selectedGradeIdx}`) ||
      key.startsWith(`thuoc-${currentDisease.id}-g${selectedGradeIdx}`) ||
      key.startsWith(`theodoi-${currentDisease.id}-g${selectedGradeIdx}`)
    ).length + customOrders.filter((co) => co.completed).length;

  const progressPercent = totalAllOrders > 0 ? Math.round((currentCheckedCount / totalAllOrders) * 100) : 0;

  // Copy order sheet HIS
  const handleCopyOrderSheet = async () => {
    if (!currentDisease) return;
    const lines: string[] = [];
    lines.push(`========================================================`);
    lines.push(`BỆNH VIỆN / PHÒNG KHÁM - PHIẾU Y LỆNH & PHÁC ĐỒ ĐIỀU TRỊ`);
    lines.push(`========================================================`);
    lines.push(`Thời gian lập: ${new Date().toLocaleString('vi-VN')}`);
    lines.push(`Bệnh nhân: ${form?.hoTen || 'Chưa định danh'} | Giới tính: ${form?.gioiTinh || '—'} | Tuổi: ${form?.tuoi || '—'}`);
    lines.push(`Chẩn đoán chính: ${currentDisease.ten} (ICD-10: ${currentDisease.icd})`);
    if (activeSeverityGrade) {
      lines.push(`Phân độ / Thể bệnh: ${activeSeverityGrade.grade} (${activeSeverityGrade.severity.toUpperCase()})`);
      lines.push(`Tuyến điều trị: ${activeSeverityGrade.triage}`);
      lines.push(`Mục tiêu sinh hiệu: ${activeSeverityGrade.targetVitals}`);
    }
    lines.push(`--------------------------------------------------------`);
    lines.push(`I. QUY TRÌNH XỬ TRÍ CẤP CỨU & CAN THIỆP:`);
    phacDo.tuyen.forEach((step, idx) => {
      const isDone = checkedOrders.has(`tuyen-${currentDisease.id}-g${selectedGradeIdx}-${idx}`);
      lines.push(`  ${idx + 1}. [${isDone ? 'X' : ' '}] ${step}`);
    });
    lines.push(`\nII. Y LỆNH THUỐC & DƯỢC LÂM SÀNG:`);
    phacDo.thuoc.forEach(([drug, dose, note], idx) => {
      const isDone = checkedOrders.has(`thuoc-${currentDisease.id}-g${selectedGradeIdx}-${idx}`);
      lines.push(`  ${idx + 1}. [${isDone ? 'X' : ' '}] ${drug} - Liều: ${dose} ${note ? `(${note})` : ''}`);
    });
    if (customOrders.length > 0) {
      lines.push(`\nIII. Y LỆNH BỔ SUNG CỦA BÁC SĨ:`);
      customOrders.forEach((co, idx) => {
        lines.push(`  ${idx + 1}. [${co.completed ? 'X' : ' '}] ${co.drug} - ${co.dosage} (${co.note})`);
      });
    }
    lines.push(`\nIV. THEO DÕI & MỤC TIÊU LÂM SÀNG:`);
    phacDo.theoDoi.forEach((m, idx) => {
      const isDone = checkedOrders.has(`theodoi-${currentDisease.id}-g${selectedGradeIdx}-${idx}`);
      lines.push(`  - [${isDone ? 'X' : ' '}] ${m}`);
    });
    lines.push(`--------------------------------------------------------`);
    lines.push(`BÁC SĨ ĐIỀU TRỊ: Đã duyệt y lệnh điện tử`);
    lines.push(`========================================================`);

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    } catch {
      // Fallback
    }
  };

  const specialties = useMemo(() => {
    const set = new Set<string>();
    allAvailableDiseases.forEach((b) => {
      if (b.nhom) set.add(b.nhom);
    });
    return Array.from(set).sort();
  }, [allAvailableDiseases]);

  const filteredDiseases = useMemo(() => {
    return allAvailableDiseases.filter((b) => {
      return selectedSpecialty === 'all' || b.nhom === selectedSpecialty;
    });
  }, [allAvailableDiseases, selectedSpecialty]);

  return (
    <div className="flex flex-col gap-4">
      {/* Top Clinical Navigation Bar & Protocol Switcher */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Left: Back & Title */}
        <div className="flex items-center gap-3">
          <button
            id="btn-back-to-step2"
            onClick={onBackToAnalysis}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            title="Quay lại bảng phân tích và chẩn đoán phân biệt"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quay lại phân tích</span>
            <span className="sm:hidden">Quay lại</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-base sm:text-lg font-bold text-slate-900">
                Phác đồ ĐT & Y lệnh LS
              </h2>
              <span className="px-2 py-0.5 text-[10.5px] font-mono-custom bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md font-semibold">
                Clinical Pathway
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Chuẩn hóa theo Hướng dẫn Bộ Y tế và Hiệp hội Quốc tế (AHA, ESC, ATS, GOLD)
            </p>
          </div>
        </div>

        {/* Right: Quick actions & selector */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Specialty Filter */}
          <div className="flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400 hidden md:inline" />
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs bg-slate-50 focus:outline-none focus:border-blue-500 text-slate-700 font-medium"
            >
              <option value="all">Tất cả chuyên khoa</option>
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {GROUP_NAMES[s] || s}
                </option>
              ))}
            </select>
          </div>

          {/* Disease Selector Dropdown */}
          <select
            id="select-disease-protocol"
            value={currentDisease?.id || ''}
            onChange={(e) => onSelectDisease(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold bg-slate-50 focus:outline-none focus:border-blue-500 text-slate-800 max-w-[240px] truncate"
          >
            {filteredDiseases.map((b) => (
              <option key={b.id} value={b.id}>
                {b.baoDong ? '⚑ ' : ''}
                {b.ten} ({b.icd})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Protocol Presentation Card */}
      {currentDisease && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-xs flex flex-col gap-5">
          {/* Disease Header Banner & Metadata */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex flex-col gap-1.5 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {currentDisease.ten}
                </h3>
                <span className="px-2.5 py-0.5 text-xs font-mono-custom bg-slate-800 text-white rounded-md font-semibold">
                  {currentDisease.icd}
                </span>
                <span
                  className="px-2.5 py-0.5 text-[11px] font-semibold text-white rounded-md"
                  style={{ backgroundColor: GROUP_COLORS[currentDisease.nhom] || '#2563eb' }}
                >
                  {GROUP_NAMES[currentDisease.nhom] || currentDisease.nhom}
                </span>
                {currentDisease.baoDong && (
                  <span className="px-2.5 py-0.5 text-[11px] font-bold bg-red-50 text-red-700 border border-red-200 rounded-md flex items-center gap-1 animate-pulse">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                    <span>CẤP CỨU / NGUY KỊCH</span>
                  </span>
                )}
              </div>

              {currentDisease.baoDong && currentDisease.ghiChuBaoDong && (
                <div className="text-xs text-red-800 bg-red-50/80 p-2 rounded-lg border border-red-200 font-medium">
                  ⚑ <b>Cảnh báo đỏ:</b> {currentDisease.ghiChuBaoDong}
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentDisease.tomTat}
              </p>
            </div>

            {/* Reference Source Tag */}
            <div className="text-right flex flex-col items-end gap-1 font-mono-custom text-xs">
              <span className="text-slate-400 text-[11px]">Nguồn phác đồ:</span>
              <div className="flex flex-col items-end gap-1">
                {phacDo.nguon.map((src, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium text-[11px]"
                  >
                    {src}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* KHỐI 1: ĐÁNH GIÁ PHÂN ĐỘ & BIẾN CHỨNG LÂM SÀNG                             */}
          {/* ========================================================================= */}
          <SeverityGradingPanel
            severityGrades={severityGrades}
            selectedGradeIdx={selectedGradeIdx}
            onSelectGradeIdx={setSelectedGradeIdx}
            autoSuggestedGradeIndex={autoSuggestedGradeIndex}
            activeChain={activeChain}
          />

          {/* Clinical Order Execution Progress Bar & Actions */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-[240px]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                <ClipboardCheck className="w-4 h-4 text-blue-600" />
                <span>Tiến độ thực thi y lệnh:</span>
              </div>
              <div className="flex-1 max-w-xs bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    progressPercent >= 100
                      ? 'bg-emerald-600'
                      : progressPercent >= 50
                      ? 'bg-blue-600'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="font-mono-custom text-xs font-bold text-slate-700">
                {currentCheckedCount}/{totalAllOrders} ({progressPercent}%)
              </span>
            </div>

            {/* Quick Bulk Order Controls & Collapsible Master Toggles */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                id="btn-complete-all-orders"
                onClick={handleCompleteAll}
                className="w-7 h-7 flex items-center justify-center text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors cursor-pointer shadow-2xs"
                title="Đánh dấu tất cả y lệnh trong phác đồ đã hoàn thành"
                aria-label="Hoàn tất tất cả y lệnh"
              >
                <Check className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                id="btn-reset-orders"
                onClick={handleResetOrders}
                className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 rounded-md transition-colors cursor-pointer shadow-2xs"
                title="Bỏ chọn tất cả y lệnh"
                aria-label="Bỏ chọn tất cả y lệnh"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                id="btn-copy-orders"
                onClick={handleCopyOrderSheet}
                className={`w-7 h-7 flex items-center justify-center rounded-md border transition-all cursor-pointer shadow-2xs ${
                  copySuccess
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
                title={copySuccess ? "Đã sao chép EMR!" : "Sao chép toàn bộ y lệnh theo chuẩn EMR/HIS"}
                aria-label="Sao chép y lệnh"
              >
                {copySuccess ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <ClipboardCopy className="w-3.5 h-3.5 text-slate-500" />
                )}
              </button>

              <div className="h-4 w-px bg-slate-300 hidden sm:block mx-0.5" />

              {/* Master Collapsible Controls */}
              <button
                type="button"
                onClick={handleExpandAll}
                className="w-7 h-7 flex items-center justify-center text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-md transition-colors cursor-pointer shadow-2xs"
                title="Bung toàn bộ các phần nội dung phác đồ"
                aria-label="Bung toàn bộ các phần"
              >
                <ChevronDown className="w-3.5 h-3.5 text-blue-600" />
              </button>

              <button
                type="button"
                onClick={handleCollapseAll}
                className="w-7 h-7 flex items-center justify-center text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-md transition-colors cursor-pointer shadow-2xs"
                title="Thu gọn các phần nội dung để màn hình gọn gàng"
                aria-label="Thu gọn các phần"
              >
                <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Section 2: Bảng y lệnh thuốc & Dược lâm sàng (phacDo.thuoc) */}
          <CollapsibleProtocolSection
            id="rx"
            isOpen={expandedSections.rx}
            onToggle={() => toggleSection('rx')}
            icon={
              <div className="w-7 h-7 rounded-md bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Pill className="w-4 h-4" />
              </div>
            }
            title="2. Bảng y lệnh thuốc & Dược LS (Medical Order Sheet - Rx)"
            subtitle="Chỉ định liều lượng, đường dùng, kiểm tra tương tác thuốc (DDI), chỉnh liều eGFR & quy tắc BHYT"
            badgeText={`${phacDo.thuoc.length + customOrders.length} y lệnh`}
            badgeColor="bg-blue-100 text-blue-800 border-blue-200"
          >
            <ProtocolOrderSheet
              diseaseId={currentDisease.id}
              selectedGradeIdx={selectedGradeIdx}
              standardDrugs={phacDo.thuoc}
              customOrders={customOrders}
              checkedOrders={checkedOrders}
              onToggleOrder={toggleOrder}
              onToggleCustomOrder={toggleCustomOrder}
              onAddCustomOrder={addCustomOrder}
              onRemoveCustomOrder={removeCustomOrder}
              allPrescribedDrugNames={allPrescribedDrugNames}
              patientAge={form?.tuoi}
              patientGender={form?.gioiTinh}
              patientCreatinine={labs?.lCre}
              onOpenVaultDrawer={onOpenVaultDrawer}
            />
          </CollapsibleProtocolSection>

          {/* Section 3: Phác đồ điều trị chi tiết từng ngày */}
          <CollapsibleProtocolSection
            id="procedures"
            isOpen={expandedSections.procedures}
            onToggle={() => toggleSection('procedures')}
            icon={
              <div className="w-7 h-7 rounded-md bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
            }
            title="3. Phác đồ ĐT chi tiết từng ngày"
            subtitle="Lộ trình can thiệp lâm sàng phân tầng theo từng giai đoạn ngày bệnh (gom nhóm các ngày có xử trí tương tự)"
            badgeText={`${timelinePhases.length} giai đoạn can thiệp`}
            badgeColor="bg-blue-100 text-blue-800 border-blue-200"
          >
            <DailyTimelineTable timelinePhases={timelinePhases} />
          </CollapsibleProtocolSection>

          {/* Section 4: Sàng Lọc & Xử Trí Biến Chứng Tích Cực */}
          <CollapsibleProtocolSection
            id="complications"
            isOpen={expandedSections.complications}
            onToggle={() => toggleSection('complications')}
            icon={
              <div className="w-7 h-7 rounded-md bg-rose-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <ShieldAlert className="w-4 h-4" />
              </div>
            }
            title="4. Sàng Lọc & Xử Trí Biến Chứng Tích Cực (Complications Sentinel - Kho BC)"
            subtitle="Đánh dấu biểu hiện biến chứng để kích hoạt lệnh trực cấp cứu & phác đồ can thiệp chuyên sâu"
            badgeText={`${activeComplications.length} biến chứng rủi ro`}
            badgeColor="bg-rose-100 text-rose-800 border-rose-200"
            containerClassName="bg-rose-50/40 border border-rose-200 rounded-xl p-4 shadow-2xs"
          >
            <ComplicationsTriageSection
              diseaseId={currentDisease.id}
              diseaseName={currentDisease.ten}
              activeComplications={activeComplications}
              activeComplicationIndices={activeComplicationIndices}
              onToggleComplication={handleToggleComplication}
              onAddComplicationOrder={handleAddComplicationOrder}
              onAddPreventionOrder={handleAddPreventionOrder}
              vitals={vitals}
              labs={labs}
              onOpenVaultDrawer={onOpenVaultDrawer}
            />
          </CollapsibleProtocolSection>

          {/* Section 5: Thang điểm lượng giá nguy cơ & Phân tầng xử trí */}
          <CollapsibleProtocolSection
            id="calculators"
            isOpen={expandedSections.calculators}
            onToggle={() => toggleSection('calculators')}
            icon={
              <div className="w-7 h-7 rounded-md bg-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Calculator className="w-4 h-4" />
              </div>
            }
            title="5. Thang điểm lượng giá nguy cơ & Phân tầng XT"
            subtitle="CURB-65, Killip và các công cụ tính toán lượng giá lâm sàng (Kho Công cụ - CC)"
            badgeText={`${diseaseTools.length} công cụ`}
            badgeColor="bg-indigo-100 text-indigo-800 border-indigo-200"
            containerClassName="bg-slate-50/80 border border-slate-200 rounded-xl p-4 shadow-2xs"
          >
            <ClinicalCalculatorsSection
              diseaseId={currentDisease.id}
              diseaseName={currentDisease.ten}
              diseaseGroup={currentDisease.nhom}
              diseaseTools={diseaseTools}
              onOpenVaultDrawer={onOpenVaultDrawer}
            />
          </CollapsibleProtocolSection>

          {/* Section 6: Chỉ tiêu theo dõi, mục tiêu lâm sàng & Cảnh báo an toàn */}
          <CollapsibleProtocolSection
            id="monitoring"
            isOpen={expandedSections.monitoring}
            onToggle={() => toggleSection('monitoring')}
            icon={
              <div className="w-7 h-7 rounded-md bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0">
                <Activity className="w-4 h-4" />
              </div>
            }
            title="6. Chỉ tiêu theo dõi, mục tiêu LS & Cảnh báo an toàn"
            subtitle="Các mốc sinh hiệu cần giám sát, tiêu chuẩn cải thiện, chống chỉ định và tiêu chuẩn ra viện / chuyển tầng"
            badgeText={`${phacDo.theoDoi.length} chỉ tiêu · ${phacDo.luuY.length} lưu ý`}
            badgeColor="bg-amber-100 text-amber-800 border-amber-200"
            containerClassName="bg-amber-50/30 border border-amber-200/80 rounded-xl p-4 shadow-2xs"
          >
            <MonitoringCautionsSection
              diseaseId={currentDisease.id}
              selectedGradeIdx={selectedGradeIdx}
              monitoringItems={phacDo.theoDoi}
              cautionItems={phacDo.luuY}
              timelinePhases={timelinePhases}
              checkedOrders={checkedOrders}
              onToggleOrder={toggleOrder}
            />
          </CollapsibleProtocolSection>

          {/* Section 7: Tư vấn người bệnh & Tờ rơi dặn dò */}
          <CollapsibleProtocolSection
            id="counseling"
            isOpen={expandedSections.counseling}
            onToggle={() => toggleSection('counseling')}
            icon={
              <div className="w-7 h-7 rounded-md bg-teal-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Heart className="w-4 h-4" />
              </div>
            }
            title="7. Tư vấn người bệnh & Tờ rơi dặn dò (Kho TV)"
            subtitle="Tài liệu giáo dục sức khỏe và hướng dẫn dặn dò người bệnh đối ứng từ Kho Tư Vấn EBM"
            badgeText="Kho TV"
            badgeColor="bg-teal-100 text-teal-800 border-teal-200"
            containerClassName="bg-teal-50/30 border border-teal-200/80 rounded-xl p-4 shadow-2xs"
          >
            <PatientCounselingPanel
              diseaseName={currentDisease.ten}
              icd10={currentDisease.icd}
              patientAge={form?.tuoi}
              patientGender={form?.gioiTinh}
              prescribedDrugs={allPrescribedDrugNames}
              onOpenVaultDrawer={onOpenVaultDrawer}
            />
          </CollapsibleProtocolSection>

          {/* Section 8: Bằng chứng Y học Chứng cứ & Hướng Dẫn Điều Trị EBM */}
          <CollapsibleProtocolSection
            id="ebm"
            isOpen={expandedSections.ebm}
            onToggle={() => toggleSection('ebm')}
            icon={
              <div className="w-7 h-7 rounded-md bg-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
            }
            title="8. Khuyến cáo ĐT EBM & Chuỗi Bệnh Học Đa Chiều (Knowledge Vault)"
            subtitle="Khuyến cáo Bộ Y Tế, Hội chuyên khoa quốc tế (ESC, AHA, IDSA) & chuỗi bài học trong 18 Kho tri thức"
            badgeText={`${matchedGuidelines.length} khuyến cáo EBM`}
            badgeColor="bg-indigo-100 text-indigo-800 border-indigo-200"
            containerClassName="bg-indigo-50/30 border border-indigo-200/80 rounded-xl p-4 shadow-2xs"
          >
            <EbmGuidelinesSection
              diseaseName={currentDisease.ten}
              diseaseIcd={currentDisease.icd}
              pathway={pathway}
              matchedGuidelines={matchedGuidelines}
              onApplyGuidelineDrugs={handleApplyGuidelineDrugs}
              onOpenVaultDrawer={onOpenVaultDrawer}
            />
          </CollapsibleProtocolSection>

          {/* Section 9: Ca Bệnh Lâm Sàng Thực Chiến & Hội Chẩn AI */}
          <CollapsibleProtocolSection
            id="soap"
            isOpen={expandedSections.soap}
            onToggle={() => toggleSection('soap')}
            icon={
              <div className="w-7 h-7 rounded-md bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
            }
            title="9. Ca Bệnh LS Thực Chiến & Hội Chẩn AI (SOAP Cases)"
            subtitle="Tham khảo ca bệnh thực tế tương tự, bẫy chẩn đoán và tạo prompt hội chẩn NotebookLM"
            badgeText={`${similarSoapCases.length} ca bệnh phù hợp`}
            badgeColor="bg-emerald-100 text-emerald-800 border-emerald-200"
            containerClassName="bg-white border border-emerald-200/80 rounded-xl p-4 shadow-2xs"
          >
            <SoapCasesSection
              diseaseName={currentDisease.ten}
              similarSoapCases={similarSoapCases}
              onNavigateToSoapCase={onNavigateToSoapCase}
              onOpenVaultDrawer={onOpenVaultDrawer}
              onOpenPromptBuilder={onOpenPromptBuilder}
            />
          </CollapsibleProtocolSection>

          {/* Bottom Action Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                id="btn-print-protocol-report"
                onClick={onPrintReport}
                className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg cursor-pointer transition-colors shadow-2xs"
                title="In hồ sơ bệnh án & y lệnh"
                aria-label="In hồ sơ bệnh án & y lệnh"
              >
                <Printer className="w-4 h-4 text-blue-600" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-slate-400 font-mono-custom hidden sm:inline">
                MedLens Clinical Decision Support v2.5
              </span>
              <button
                onClick={onBackToAnalysis}
                className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Quay lại chẩn đoán</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
