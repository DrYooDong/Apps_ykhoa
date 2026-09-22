import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  GraduationCap,
  Heart,
  Layers,
  Printer,
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
import { ENRICHED_DISEASES } from '../../data/enriched/index.ts';
import {
  getPathwayArticles,
  VaultArticle,
  CdssToolSlug,
} from '../lib/vaultBridge.ts';
import {
  extractRecommendedDrugs,
  getGuidelinesForDisease,
} from '../lib/guidelineBridge.ts';
import { getSimilarSoapCases } from '../lib/crossReferenceEngine.ts';
import { getDailyTreatmentTimeline } from '../lib/dailyTreatmentTimeline.ts';
import { resolvePatientPhenotype } from '../lib/patientPhenotypeEngine.ts';

// 6 Subcomponents in step3/
import { ProtocolTopNav } from './step3/ProtocolTopNav.tsx';
import { ProtocolDiseaseHeader } from './step3/ProtocolDiseaseHeader.tsx';
import { CollapsibleProtocolSection } from './step3/CollapsibleProtocolSection.tsx';
import { ProtocolClassificationSection } from './step3/ProtocolClassificationSection.tsx';
import { DetailedTreatmentTable } from './step3/DetailedTreatmentTable.tsx';
import { ClinicalCautionsSection } from './step3/ClinicalCautionsSection.tsx';
import { PatientCounselingPanel } from './PatientCounselingPanel.tsx';
import { HealthcareWorkerKnowledgeSection } from './step3/HealthcareWorkerKnowledgeSection.tsx';
import { SoapCasesSection } from './step3/SoapCasesSection.tsx';
import { CustomOrder } from './step3/ProtocolOrderSheet.tsx';

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
  onOpenCdssModal?: (tool: CdssToolSlug) => void;
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
  onOpenCdssModal,
}) => {
  // Local state for checked orders & custom additions
  const [checkedOrders, setCheckedOrders] = useState<Set<string>>(new Set());
  const [customOrders, setCustomOrders] = useState<CustomOrder[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  // 6 Collapsible sections state: Headings 1 & 2 open by default, 3-6 collapsed
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    classification: true, // 1. Phân loại (cá thể hoá)
    protocol: true,       // 2. Phác đồ điều trị chi tiết (Bảng 4 cột)
    cautions: false,      // 3. Lưu ý lâm sàng
    counseling: false,    // 4. Vấn đề người bệnh quan tâm
    knowledge: false,     // 5. Kiến thức cho nhân viên y tế
    soap: false,          // 6. Các ca bệnh liên quan
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExpandAll = () => {
    setExpandedSections({
      classification: true,
      protocol: true,
      cautions: true,
      counseling: true,
      knowledge: true,
      soap: true,
    });
  };

  const handleCollapseAll = () => {
    setExpandedSections({
      classification: false,
      protocol: false,
      cautions: false,
      counseling: false,
      knowledge: false,
      soap: false,
    });
  };

  // Severity Grade & Active Complication State
  const [selectedGradeIdx, setSelectedGradeIdx] = useState<number>(0);
  const [activeComplicationIndices, setActiveComplicationIndices] = useState<Set<number>>(new Set());

  // Lọc chỉ giữ lại các phác đồ điều trị cốt lõi được gắn cờ (baoDong === true)
  const allAvailableDiseases = useMemo(() => {
    const list: Benh[] = Array.isArray(kb?.benh)
      ? kb.benh.filter((b) => Boolean(b && b.baoDong))
      : [];

    const findExistingIdx = (key: string, chain: any) => {
      return list.findIndex((b) => {
        if (!b) return false;
        if (b.id === key) return true;
        if (
          (key === 'aclf' && (b.id === 'suy_gan_cap_tren_nen_man_aclf' || b.id === 'suy-gan-cap-tren-nen-man-aclf')) ||
          (b.id === 'aclf' && (key === 'suy_gan_cap_tren_nen_man_aclf' || key === 'suy-gan-cap-tren-nen-man-aclf'))
        ) {
          return true;
        }
        // So khớp ICD và tương đồng tên bệnh để chống duplicate hoàn toàn
        if (b.icd && chain.icdCode && b.icd.trim().toUpperCase() === chain.icdCode.trim().toUpperCase()) {
          const n1 = (b.ten || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          const n2 = (chain.diseaseName || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          if (n1.includes(n2) || n2.includes(n1)) return true;
        }
        return false;
      });
    };

    Object.entries(ENRICHED_DISEASES).forEach(([key, chain]) => {
      if (!chain || !chain.diseaseName) return;
      const existingIdx = findExistingIdx(key, chain);

      const enrichedBenh: Benh = {
        id: key,
        ten: chain.diseaseName,
        icd: chain.icdCode || (existingIdx !== -1 ? list[existingIdx].icd : ''),
        nhom: chain.specialty || (existingIdx !== -1 ? list[existingIdx].nhom : 'Nội khoa'),
        baoDong: true,
        ghiChuBaoDong: 'Phác đồ điều trị chuyên sâu EBM',
        tomTat: chain.summary || (existingIdx !== -1 ? list[existingIdx].tomTat : ''),
        danSo: { gioiTinh: 'any' },
        dd: existingIdx !== -1 ? list[existingIdx].dd : [],
        phacDo: {
          tuyen: chain.protocol?.initialManagement || (existingIdx !== -1 ? list[existingIdx].phacDo?.tuyen || [] : []),
          thuoc: chain.protocol?.firstLineDrugs
            ? chain.protocol.firstLineDrugs.map((d) => [
                d.drugName,
                `${d.dosage}${d.route ? ' (' + d.route + ')' : ''}`,
                d.instructions || d.class || 'Khuyến cáo bậc 1',
              ])
            : existingIdx !== -1 ? list[existingIdx].phacDo?.thuoc || [] : [],
          theoDoi: chain.monitoringLabs || (existingIdx !== -1 ? list[existingIdx].phacDo?.theoDoi || [] : []),
          luuY: [
            'Theo dõi sát phản ứng thuốc & nguy cơ tương tác',
            ...(chain.protocol?.supportiveCare || []),
          ],
          nguon: [chain.protocol?.guideline || 'Hướng dẫn chẩn đoán và điều trị Bộ Y tế'],
        },
      };

      if (existingIdx !== -1) {
        // Cập nhật/ghi đè bản ghi cũ bằng bản ghi enriched chuẩn hoá để tránh trùng lặp
        list[existingIdx] = enrichedBenh;
      } else {
        list.push(enrichedBenh);
      }
    });

    return list
      .filter((b) => Boolean(b && b.baoDong))
      .sort((a, b) => (a.ten || '').localeCompare(b.ten || '', 'vi'));
  }, [kb.benh]);

  const currentDisease = useMemo(() => {
    if (!selectedDiseaseId) return allAvailableDiseases[0] || null;
    return (
      allAvailableDiseases.find((b) => b.id === selectedDiseaseId) ||
      (selectedDiseaseId === 'suy_gan_cap_tren_nen_man_aclf'
        ? allAvailableDiseases.find((b) => b.id === 'aclf')
        : null) ||
      (selectedDiseaseId === 'aclf'
        ? allAvailableDiseases.find((b) => b.id === 'suy_gan_cap_tren_nen_man_aclf')
        : null) ||
      allAvailableDiseases.find((b) => b.icd === selectedDiseaseId) ||
      allAvailableDiseases[0] ||
      null
    );
  }, [allAvailableDiseases, selectedDiseaseId]);

  // Active Reaction Chain
  const activeChain = useMemo(() => {
    if (!currentDisease) return undefined;
    if (DIAGNOSTIC_CHAIN_DATABASE[currentDisease.id]) {
      return DIAGNOSTIC_CHAIN_DATABASE[currentDisease.id];
    }
    const found = Object.values(DIAGNOSTIC_CHAIN_DATABASE).find(
      (c) =>
        c &&
        c.icdCode && (
          c.icdCode.toUpperCase() === (currentDisease.icd || '').toUpperCase() ||
          (c.icdPrefixes && c.icdPrefixes.some((p) => (currentDisease.icd || '').toUpperCase().startsWith(p.toUpperCase())))
        )
    );
    if (found) return found;

    const normName = (currentDisease.ten || '').toLowerCase();
    const foundByName = Object.values(DIAGNOSTIC_CHAIN_DATABASE).find((c) =>
      c && c.diseaseName && (normName.includes(c.diseaseName.toLowerCase()) || c.diseaseName.toLowerCase().includes(normName))
    );
    if (foundByName) return foundByName;

    return undefined;
  }, [currentDisease]);

  // Knowledge Vault articles & pathways
  const pathway = useMemo(() => {
    return getPathwayArticles(currentDisease?.ten || '');
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
      } else {
        const matchingIndices: number[] = [];
        activeChain.complications.forEach((c, idx) => {
          if (
            c.name.toLowerCase().includes(initialComplicationId.toLowerCase()) ||
            initialComplicationId.toLowerCase().includes(c.name.toLowerCase())
          ) {
            matchingIndices.push(idx);
          }
        });
        if (matchingIndices.length > 0) {
          setActiveComplicationIndices((prev) => {
            const next = new Set(prev);
            matchingIndices.forEach((i) => next.add(i));
            return next;
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

  // Kiểm tra phân tầng theo thể lâm sàng hay theo bậc phân độ nặng nhẹ
  const isPhenotypeStaging = useMemo(() => {
    return (
      activeChain?.stagingType === 'phenotype' ||
      severityGrades.some((g) => g.grade.toLowerCase().includes('thể ') || g.severity === 'phenotype')
    );
  }, [activeChain?.stagingType, severityGrades]);

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

  // Timeline phases - Cơ chế phân giải đa tầng: Phân độ riêng -> Protocol của Chain -> Root Chain -> phacDo -> Thư viện timeline
  const timelinePhases = useMemo(() => {
    if (!currentDisease) return [];
    // 1. Phân độ cụ thể đang chọn có timelinePhases riêng
    if (
      activeSeverityGrade?.protocol?.timelinePhases &&
      Array.isArray(activeSeverityGrade.protocol.timelinePhases) &&
      activeSeverityGrade.protocol.timelinePhases.length > 0
    ) {
      return activeSeverityGrade.protocol.timelinePhases;
    }
    // 2. Protocol trong Enriched Chain (chuẩn Prompt 05/06/07)
    if (
      (activeChain as any)?.protocol?.timelinePhases &&
      Array.isArray((activeChain as any).protocol.timelinePhases) &&
      (activeChain as any).protocol.timelinePhases.length > 0
    ) {
      return (activeChain as any).protocol.timelinePhases;
    }
    // 3. Root của Enriched Chain
    if (
      (activeChain as any)?.timelinePhases &&
      Array.isArray((activeChain as any).timelinePhases) &&
      (activeChain as any).timelinePhases.length > 0
    ) {
      return (activeChain as any).timelinePhases;
    }
    // 4. Trong phacDo
    if (
      (phacDo as any)?.timelinePhases &&
      Array.isArray((phacDo as any).timelinePhases) &&
      (phacDo as any).timelinePhases.length > 0
    ) {
      return (phacDo as any).timelinePhases;
    }
    // 5. Thư viện timeline tự động
    return getDailyTreatmentTimeline(
      currentDisease.id,
      currentDisease.ten,
      activeSeverityGrade,
      phacDo
    );
  }, [currentDisease, activeSeverityGrade, phacDo, activeChain]);

  const allPrescribedDrugNames = useMemo(() => {
    const list: string[] = [];
    if (phacDo?.thuoc) {
      phacDo.thuoc.forEach(([d]) => list.push(d));
    }
    customOrders.forEach((co) => list.push(co.drug));
    return list;
  }, [phacDo, customOrders]);

  const activeComplications = useMemo(() => {
    return (
      activeChain?.complications ||
      (activeChain as any)?.protocol?.complications ||
      (activeChain as any)?.protocol?.complicationsManagement ||
      []
    );
  }, [activeChain]);

  // Personalized Clinical Stratification Engine (PCSE) State & Memos
  const [isRenalAdjustmentApplied, setIsRenalAdjustmentApplied] = useState<boolean>(false);

  const patientPhenotype = useMemo(() => {
    return resolvePatientPhenotype(
      form,
      vitals,
      labs,
      selectedGradeIdx,
      severityGrades[selectedGradeIdx]?.grade,
      activeComplicationIndices.size
    );
  }, [form, vitals, labs, selectedGradeIdx, severityGrades, activeComplicationIndices.size]);

  // Tự động kích hoạt cờ hiệu chỉnh thận khi phát hiện nguy cơ thận rõ
  useEffect(() => {
    if (patientPhenotype.hasRenalRisk) {
      setIsRenalAdjustmentApplied(true);
    }
  }, [patientPhenotype.hasRenalRisk]);

  // Danh sách biến chứng cấp được kích hoạt chuyển giao sang Bảng 3 cột (Mục 2)
  const appliedComplications = useMemo(() => {
    const list: Array<{ id: string; name: string; orders: string[]; monitoring?: string; urgency?: string }> = [];
    activeComplicationIndices.forEach((idx) => {
      const comp = activeComplications[idx];
      if (comp) {
        const orders: string[] = [];
        if (comp.orderSet && Array.isArray(comp.orderSet)) {
          comp.orderSet.forEach((o: any) => orders.push(`${o.drug}: ${o.dosage}${o.note ? ' (' + o.note + ')' : ''}`));
        } else if (comp.preventiveAction) {
          orders.push(comp.preventiveAction);
        }
        if (comp.onCallAlertText) {
          orders.push(`Lệnh trực: ${comp.onCallAlertText}`);
        }
        list.push({
          id: comp.id || `comp_${idx}`,
          name: comp.name,
          orders: orders.length > 0 ? orders : ['Theo dõi sát và xử trí triệu chứng khẩn cấp'],
          monitoring: comp.warningSigns ? `Dấu hiệu báo động: ${comp.warningSigns.join(', ')}` : undefined,
          urgency: 'urgent',
        });
      }
    });
    return list;
  }, [activeComplications, activeComplicationIndices]);

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
    setExpandedSections((prev) => ({ ...prev, protocol: true }));
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
    setExpandedSections((prev) => ({ ...prev, protocol: true }));
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
    setExpandedSections((prev) => ({ ...prev, protocol: true }));
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
    timelinePhases.forEach((phase) => {
      if (Array.isArray(phase?.treatments)) {
        phase.treatments.forEach((_, tIdx) => next.add(`phase-${phase.id}-${tIdx}`));
      }
    });
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
      timelinePhases.forEach((phase) => {
        if (Array.isArray(phase?.treatments)) {
          phase.treatments.forEach((_, tIdx) => next.delete(`phase-${phase.id}-${tIdx}`));
        }
      });
      return next;
    });
    setCustomOrders((prev) => prev.map((co) => ({ ...co, completed: false })));
  };

  // Progress Calculation
  const totalStandardOrders = phacDo.tuyen.length + phacDo.thuoc.length + phacDo.theoDoi.length;
  const totalAllOrders = totalStandardOrders + customOrders.length;
  const currentCheckedCount =
    Array.from(checkedOrders).filter(
      (key) =>
        key.startsWith(`tuyen-${currentDisease?.id}-g${selectedGradeIdx}`) ||
        key.startsWith(`thuoc-${currentDisease?.id}-g${selectedGradeIdx}`) ||
        key.startsWith(`theodoi-${currentDisease?.id}-g${selectedGradeIdx}`) ||
        key.startsWith('phase-')
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
    lines.push(`Bệnh nhân: ${form?.lyDo || 'Chưa định danh'} | Giới tính: ${form?.gioiTinh || '—'} | Tuổi: ${form?.tuoi || '—'}`);
    lines.push(`Chẩn đoán chính: ${currentDisease.ten} (ICD-10: ${currentDisease.icd})`);
    if (patientPhenotype) {
      lines.push(`Kiểu hình cá thể hóa (PCSE): ${patientPhenotype.ageLabel} | Giới tính: ${patientPhenotype.gender === 'nam' ? 'Nam' : 'Nữ'}${patientPhenotype.eGfr ? ` | eGFR: ${patientPhenotype.eGfr} mL/ph (${patientPhenotype.ckdStage || 'CKD'})` : ''}`);
      if (isRenalAdjustmentApplied) {
        lines.push(`⚡ Hiệu chỉnh y lệnh: ĐÃ ÁP DỤNG HIỆU CHỈNH LIỀU THẬN HỌC`);
      }
      if (appliedComplications.length > 0) {
        lines.push(`🚨 Biến chứng cấp kích hoạt: ${appliedComplications.map((c) => c.name).join('; ')}`);
      }
    }
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
      {/* 1. Thanh điều hướng trên cùng tinh gọn */}
      <ProtocolTopNav
        onBackToAnalysis={onBackToAnalysis}
        selectedSpecialty={selectedSpecialty}
        onSelectSpecialty={setSelectedSpecialty}
        specialties={specialties}
        selectedDiseaseId={currentDisease?.id || ''}
        onSelectDisease={onSelectDisease}
        filteredDiseases={filteredDiseases}
      />

      {/* Khối trình bày phác đồ chính */}
      {currentDisease && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-xs flex flex-col gap-5">
          {/* 2. Thanh hiển thị tên bệnh tinh gọn */}
          <ProtocolDiseaseHeader
            diseaseName={currentDisease.ten}
            diseaseIcd={currentDisease.icd}
            specialtyGroup={currentDisease.nhom}
            sources={phacDo.nguon}
          />

          {/* Master Collapsible Controls Toolbar */}
          <div className="flex items-center justify-between gap-3 p-2 bg-slate-50/90 rounded-lg border border-slate-200 text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Bố cục 6 đầu mục lâm sàng chuẩn hoá</span>
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleExpandAll}
                className="flex items-center gap-1 px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
                title="Bung toàn bộ 6 phần nội dung"
              >
                <ChevronDown className="w-3 h-3 text-blue-600" />
                <span>Bung tất cả</span>
              </button>

              <button
                type="button"
                onClick={handleCollapseAll}
                className="flex items-center gap-1 px-2 py-1 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
                title="Thu gọn các phần để màn hình gọn gàng"
              >
                <ChevronUp className="w-3 h-3 text-slate-500" />
                <span>Thu gọn</span>
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ĐẦU MỤC 1: PHÂN LOẠI (CÁ THỂ HOÁ)                                         */}
          {/* 1a. Phân độ nặng nhẹ | 1b. Phân độ biến chứng | 1c. Đối tượng đặc biệt    */}
          {/* ========================================================================= */}
          <CollapsibleProtocolSection
            id="classification"
            isOpen={expandedSections.classification}
            onToggle={() => toggleSection('classification')}
            icon={
              <div className="w-7 h-7 rounded-md bg-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Layers className="w-4 h-4" />
              </div>
            }
            title="1. Phân loại (cá thể hoá)"
            subtitle={`${isPhenotypeStaging ? '1a. Thể lâm sàng' : '1a. Phân độ nặng nhẹ'} • 1b. Phân độ biến chứng • 1c. Các đối tượng đặc biệt`}
            badgeText={
              severityGrades.length === 0
                ? 'Tiếp cận toàn diện'
                : `${severityGrades.length} ${isPhenotypeStaging ? 'thể bệnh' : 'phân độ'}`
            }
            badgeColor="bg-indigo-100 text-indigo-800 border-indigo-200"
          >
            <ProtocolClassificationSection
              severityGrades={severityGrades}
              selectedGradeIdx={selectedGradeIdx}
              onSelectGradeIdx={setSelectedGradeIdx}
              autoSuggestedGradeIndex={autoSuggestedGradeIndex}
              activeChain={activeChain}
              diseaseId={currentDisease.id}
              diseaseName={currentDisease.ten}
              activeComplications={activeComplications}
              activeComplicationIndices={activeComplicationIndices}
              onToggleComplication={handleToggleComplication}
              onAddComplicationOrder={handleAddComplicationOrder}
              onAddPreventionOrder={handleAddPreventionOrder}
              vitals={vitals}
              labs={labs}
              patientAge={form?.tuoi}
              patientGender={form?.gioiTinh}
              form={form}
              patientPhenotype={patientPhenotype}
              isRenalAdjustmentApplied={isRenalAdjustmentApplied}
              onToggleRenalAdjustment={setIsRenalAdjustmentApplied}
              onOpenVaultDrawer={onOpenVaultDrawer}
            />
          </CollapsibleProtocolSection>

          {/* ========================================================================= */}
          {/* ĐẦU MỤC 2: PHÁC ĐỒ ĐIỀU TRỊ CHI TIẾT (ĐỊNH HƯỚNG VẤN ĐỀ - 3 CỘT)          */}
          {/* 1. Vấn đề | 2. Phác đồ & Y lệnh | 3. Theo dõi                              */}
          {/* ========================================================================= */}
          <CollapsibleProtocolSection
            id="protocol"
            isOpen={expandedSections.protocol}
            onToggle={() => toggleSection('protocol')}
            icon={
              <div className="w-7 h-7 rounded-md bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <ClipboardCheck className="w-4 h-4" />
              </div>
            }
            title="2. Phác đồ điều trị chi tiết"
            subtitle="1. Vấn đề &bull; 2. Phác đồ &amp; y lệnh &bull; 3. Theo dõi (Lâm sàng &amp; Cận lâm sàng)"
            badgeText={`${currentCheckedCount}/${totalAllOrders} y lệnh (${progressPercent}%)`}
            badgeColor="bg-blue-100 text-blue-800 border-blue-200"
          >
            <DetailedTreatmentTable
              diseaseId={currentDisease.id}
              diseaseName={currentDisease.ten}
              selectedGradeIdx={selectedGradeIdx}
              onSelectGradeIdx={setSelectedGradeIdx}
              severityGrades={severityGrades}
              activeSeverityGrade={activeSeverityGrade}
              phacDo={phacDo}
              timelinePhases={timelinePhases}
              customOrders={customOrders}
              checkedOrders={checkedOrders}
              onToggleOrder={toggleOrder}
              onToggleCustomOrder={toggleCustomOrder}
              onAddCustomOrder={addCustomOrder}
              onRemoveCustomOrder={removeCustomOrder}
              onCompleteAll={handleCompleteAll}
              onResetOrders={handleResetOrders}
              onCopyOrderSheet={handleCopyOrderSheet}
              copySuccess={copySuccess}
              currentCheckedCount={currentCheckedCount}
              totalAllOrders={totalAllOrders}
              progressPercent={progressPercent}
              allPrescribedDrugNames={allPrescribedDrugNames}
              patientAge={form?.tuoi}
              patientGender={form?.gioiTinh}
              patientCreatinine={labs?.lCre}
              appliedComplications={appliedComplications}
              isRenalAdjustmentApplied={isRenalAdjustmentApplied}
              renalEgfr={patientPhenotype.eGfr}
              renalStage={patientPhenotype.ckdStage}
              onOpenVaultDrawer={onOpenVaultDrawer}
              onOpenCdssModal={onOpenCdssModal}
            />
          </CollapsibleProtocolSection>

          {/* ========================================================================= */}
          {/* ĐẦU MỤC 3: LƯU Ý LÂM SÀNG                                                 */}
          {/* [1] Cảnh báo quan trọng | [2] Chống chỉ định | [3] Tiêu chuẩn xuất viện  */}
          {/* ========================================================================= */}
          <CollapsibleProtocolSection
            id="cautions"
            isOpen={expandedSections.cautions}
            onToggle={() => toggleSection('cautions')}
            icon={
              <div className="w-7 h-7 rounded-md bg-amber-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
            }
            title="3. Lưu ý lâm sàng"
            subtitle="[1] Lưu ý, cảnh báo quan trọng &bull; [2] Chống chỉ định &bull; [3] Tiêu chuẩn xuất viện hoặc chuyển tuyến"
            badgeText={`${phacDo.luuY.length} lưu ý & CCĐ`}
            badgeColor="bg-amber-100 text-amber-800 border-amber-200"
            containerClassName="bg-amber-50/20 border border-amber-200/80 rounded-xl p-4 shadow-2xs"
          >
            <ClinicalCautionsSection
              cautionItems={phacDo.luuY}
              timelinePhases={timelinePhases}
              activeSeverityGrade={activeSeverityGrade}
              patientPhenotype={patientPhenotype}
              specificTreatmentNotice={(() => {
                const normName = (currentDisease?.ten || '').toLowerCase();
                const idLower = (currentDisease?.id || '').toLowerCase();
                if (idLower.includes('dengue') || normName.includes('dengue') || normName.includes('sốt xuất huyết')) {
                  return 'Bệnh Sốt xuất huyết Dengue hiện CHƯA CÓ THUỐC ĐIỀU TRỊ ĐẶC HIỆU (chống virus). Tuyệt đối không dùng Corticoid, Kháng sinh hoặc thuốc kháng virus bừa bãi khi chưa có bằng chứng đồng nhiễm khuẩn. Bù dịch nấc thang đúng phác đồ và phát hiện sớm dấu hiệu cảnh báo là biện pháp cứu mạng chính yếu.';
                }
                return undefined;
              })()}
              structuredCautions={(() => {
                const raw =
                  (activeChain as any)?.protocol?.cautionsAndDischarge ||
                  (activeChain as any)?.cautionsAndDischarge ||
                  (activeChain as any)?.clinicalCautions ||
                  (activeChain as any)?.protocol?.clinicalCautions;
                if (!raw) return undefined;
                return {
                  cautions: raw.cautions || raw.warnings || [],
                  contraindications: raw.contraindications || [],
                  dischargeCriteria: raw.dischargeCriteria || [],
                };
              })()}
            />
          </CollapsibleProtocolSection>

          {/* ========================================================================= */}
          {/* ĐẦU MỤC 4: VẤN ĐỀ NGƯỜI BỆNH QUAN TÂM                                     */}
          {/* Tư vấn & giải thích bệnh cho người bệnh (Kho TV)                          */}
          {/* ========================================================================= */}
          <CollapsibleProtocolSection
            id="counseling"
            isOpen={expandedSections.counseling}
            onToggle={() => toggleSection('counseling')}
            icon={
              <div className="w-7 h-7 rounded-md bg-teal-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Heart className="w-4 h-4" />
              </div>
            }
            title="4. Vấn đề người bệnh quan tâm"
            subtitle="Tư vấn & giải thích bệnh cho người bệnh (Kho TV)"
            badgeText="Kho TV"
            badgeColor="bg-teal-100 text-teal-800 border-teal-200"
            containerClassName="bg-teal-50/20 border border-teal-200/80 rounded-xl p-4 shadow-2xs"
          >
            <PatientCounselingPanel
              diseaseName={currentDisease.ten}
              icd10={currentDisease.icd}
              patientAge={form?.tuoi}
              patientGender={form?.gioiTinh}
              prescribedDrugs={allPrescribedDrugNames}
              patientPhenotype={patientPhenotype}
              onOpenVaultDrawer={onOpenVaultDrawer}
            />
          </CollapsibleProtocolSection>

          {/* ========================================================================= */}
          {/* ĐẦU MỤC 5: KIẾN THỨC CHO NHÂN VIÊN Y TẾ                                   */}
          {/* 5a. Cơ sở (GPSL/SLB) | 5b. Lâm sàng (DTH/CD/BC/Dược) | 5c. Guidelines     */}
          {/* ========================================================================= */}
          <CollapsibleProtocolSection
            id="knowledge"
            isOpen={expandedSections.knowledge}
            onToggle={() => toggleSection('knowledge')}
            icon={
              <div className="w-7 h-7 rounded-md bg-purple-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <GraduationCap className="w-4 h-4" />
              </div>
            }
            title="5. Kiến thức cho nhân viên y tế"
            subtitle="5a. Cơ sở (GPSL / SLB) &bull; 5b. Lâm sàng (DTH / CĐ / BC / Dược) &bull; 5c. Guidelines - EBM"
            badgeText={`${matchedGuidelines.length} khuyến cáo EBM`}
            badgeColor="bg-purple-100 text-purple-800 border-purple-200"
            containerClassName="bg-purple-50/20 border border-purple-200/80 rounded-xl p-4 shadow-2xs"
          >
            <HealthcareWorkerKnowledgeSection
              diseaseName={currentDisease.ten}
              diseaseIcd={currentDisease.icd}
              pathway={pathway}
              matchedGuidelines={matchedGuidelines}
              onApplyGuidelineDrugs={handleApplyGuidelineDrugs}
              onOpenVaultDrawer={onOpenVaultDrawer}
            />
          </CollapsibleProtocolSection>

          {/* ========================================================================= */}
          {/* ĐẦU MỤC 6: CÁC CA BỆNH LIÊN QUAN (SOAP)                                   */}
          {/* Ca bệnh thực tế, bẫy chẩn đoán, hội chẩn NotebookLM                       */}
          {/* ========================================================================= */}
          <CollapsibleProtocolSection
            id="soap"
            isOpen={expandedSections.soap}
            onToggle={() => toggleSection('soap')}
            icon={
              <div className="w-7 h-7 rounded-md bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
            }
            title="6. Các ca bệnh liên quan (SOAP)"
            subtitle="Tham khảo ca bệnh thực tế tương tự, bẫy chẩn đoán và tạo prompt hội chẩn NotebookLM"
            badgeText={`${similarSoapCases.length} ca bệnh`}
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
