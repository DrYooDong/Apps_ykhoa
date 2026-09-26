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
  CombinedProtocol,
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
import { ProtocolTableOfContents } from './step3/ProtocolTableOfContents.tsx';

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

  const toggleSection = (key: string, forceOpen?: boolean) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: forceOpen !== undefined ? forceOpen : !prev[key],
    }));
  };

  // Trạng thái theo dõi vị trí cuộn cho TOC & Scrollspy
  const [activeSection, setActiveSection] = useState<string>('classification');
  const [targetClassificationTab, setTargetClassificationTab] = useState<string>('1a');
  const [targetKnowledgeTab, setTargetKnowledgeTab] = useState<'5a' | '5b' | '5c'>('5a');

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['classification', 'protocol', 'cautions', 'counseling', 'knowledge', 'soap'];
      const scrollPosition = 140; // Điểm kiểm tra dưới thanh sticky header

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(`protocol-section-${id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= scrollPosition) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJumpToSection = (sectionId: string, subId?: string) => {
    // 1. Kiểm tra xem section mục tiêu có đang bị thu gọn không
    const wasClosed = expandedSections[sectionId] === false;

    // Luôn mở section tương ứng
    setExpandedSections((prev) => ({ ...prev, [sectionId]: true }));

    // 2. Chuyển tab con của mục 1 nếu được yêu cầu (Hỗ trợ sub-1a, sub-1b, sub-1c, sub-1d, v.v...)
    if (subId?.startsWith('sub-1') || subId?.startsWith('sub-axis-')) {
      setTargetClassificationTab(subId.replace(/^sub-/, ''));
    }

    // 3. Chuyển tab con của mục 5 nếu được yêu cầu
    if (subId === 'sub-basic') setTargetKnowledgeTab('5a');
    if (subId === 'sub-guidelines') setTargetKnowledgeTab('5c');

    // 4. Hàm thực hiện cuộn chính xác với offset bù trừ thanh sticky header
    const performScroll = (isRetry = false) => {
      let targetEl: HTMLElement | null = null;
      if (subId) {
        targetEl = document.getElementById(subId);
      }
      if (!targetEl) {
        targetEl = document.getElementById(`protocol-section-${sectionId}`);
      }

      if (targetEl) {
        const STICKY_HEADER_OFFSET = 80; // Bù trừ sticky header (~56px) + đệm thở 24px
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - STICKY_HEADER_OFFSET;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });

        // Hiệu ứng highlight trực quan khi nhảy tới đích
        if (!isRetry) {
          targetEl.style.transition = 'outline 0.3s ease, outline-offset 0.3s ease';
          targetEl.style.outline = '2px solid #2563eb';
          targetEl.style.outlineOffset = '4px';
          setTimeout(() => {
            if (targetEl) {
              targetEl.style.outline = 'none';
            }
          }, 1800);
        }

        // Nếu section vừa được mở ra từ trạng thái đóng, layout DOM cần thời gian reflow
        // Tự động kiểm tra và vi chỉnh lần 2 sau 220ms để vị trí đáp hoàn toàn chính xác
        if (wasClosed && !isRetry) {
          setTimeout(() => {
            performScroll(true);
          }, 220);
        }
      }
    };

    // Nếu section đang đóng, chờ React mount DOM rồi mới tính toán tọa độ cuộn
    const delay = wasClosed ? 100 : 40;
    setTimeout(() => {
      performScroll(false);
    }, delay);
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

  // Trạng thái lựa chọn nhánh Đa trục (Multi-Axis Branching v4.0)
  const [selectedAxes, setSelectedAxes] = useState<Record<string, string>>({});

  // Bảng mapping từ ID phân độ con sang bệnh mẹ và phân độ mặc định
  const SUB_DISEASE_TO_PARENT_MAP: Record<string, { parentId: string; gradeIdx: number }> = useMemo(() => ({
    'sot_xuat_huyet_dengue_co_dau_hieu_canh_bao': { parentId: 'sot_xuat_huyet_dengue', gradeIdx: 1 },
    'sot_xuat_huyet_dengue_the_soc': { parentId: 'sot_xuat_huyet_dengue', gradeIdx: 2 },
    'A97.1': { parentId: 'sot_xuat_huyet_dengue', gradeIdx: 1 },
    'A97.2': { parentId: 'sot_xuat_huyet_dengue', gradeIdx: 2 },
  }), []);

  // Lọc và chuẩn hóa danh sách bệnh lý cốt lõi (Gom cụm phân độ con vào 1 Disease Card mẹ)
  const allAvailableDiseases = useMemo(() => {
    let list: Benh[] = Array.isArray(kb?.benh)
      ? kb.benh.filter((b) => Boolean(b && b.baoDong))
      : [];

    const isMatchingOrSubVariant = (b: Benh, key: string, chain: any): boolean => {
      if (!b) return false;
      if (b.id === key) return true;
      if (
        (key === 'aclf' && (b.id === 'suy_gan_cap_tren_nen_man_aclf' || b.id === 'suy-gan-cap-tren-nen-man-aclf')) ||
        (b.id === 'aclf' && (key === 'suy_gan_cap_tren_nen_man_aclf' || key === 'suy-gan-cap-tren-nen-man-aclf'))
      ) {
        return true;
      }
      if (
        key === 'sot_xuat_huyet_dengue' &&
        (b.id === 'sot_xuat_huyet_dengue_co_dau_hieu_canh_bao' ||
         b.id === 'sot_xuat_huyet_dengue_the_soc' ||
         b.id.toLowerCase().includes('dengue'))
      ) {
        return true;
      }
      // So khớp tiền tố ICD hoặc danh sách mã phân độ con (icdPrefixes)
      if (chain.icdPrefixes && Array.isArray(chain.icdPrefixes)) {
        if (chain.icdPrefixes.some((p: string) => p.toUpperCase() === (b.icd || '').trim().toUpperCase())) {
          return true;
        }
      }
      if (b.icd && chain.icdCode) {
        const bIcd = b.icd.trim().toUpperCase();
        const cIcd = chain.icdCode.trim().toUpperCase();
        if (bIcd === cIcd || bIcd.startsWith(cIcd + '.')) {
          const n1 = (b.ten || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          const n2 = (chain.diseaseName || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          if (n1.includes(n2) || n2.includes(n1)) return true;
        }
      }
      return false;
    };

    Object.entries(ENRICHED_DISEASES).forEach(([key, chain]) => {
      if (!chain || !chain.diseaseName) return;

      // Tìm tất cả các biến thể/phân độ con của bệnh này trong danh sách hiện tại
      const matchingIndices: number[] = [];
      list.forEach((b, idx) => {
        if (isMatchingOrSubVariant(b, key, chain)) {
          matchingIndices.push(idx);
        }
      });

      const firstIdx = matchingIndices.length > 0 ? matchingIndices[0] : -1;

      const enrichedBenh: Benh = {
        id: key,
        ten: chain.diseaseName,
        icd: chain.icdCode || (firstIdx !== -1 ? list[firstIdx].icd : ''),
        nhom: chain.specialty || (firstIdx !== -1 ? list[firstIdx].nhom : 'Nội khoa'),
        baoDong: true,
        ghiChuBaoDong: 'Phác đồ điều trị chuyên sâu EBM (Tích hợp đa phân độ)',
        tomTat: chain.summary || (firstIdx !== -1 ? list[firstIdx].tomTat : ''),
        danSo: { gioiTinh: 'any' },
        dd: firstIdx !== -1 ? list[firstIdx].dd : [],
        phacDo: {
          tuyen: chain.protocol?.initialManagement || (firstIdx !== -1 ? list[firstIdx].phacDo?.tuyen || [] : []),
          thuoc: chain.protocol?.firstLineDrugs
            ? chain.protocol.firstLineDrugs.map((d) => [
                d.drugName,
                `${d.dosage}${d.route ? ' (' + d.route + ')' : ''}`,
                d.instructions || d.class || 'Khuyến cáo bậc 1',
              ])
            : firstIdx !== -1 ? list[firstIdx].phacDo?.thuoc || [] : [],
          theoDoi: chain.monitoringLabs || (firstIdx !== -1 ? list[firstIdx].phacDo?.theoDoi || [] : []),
          luuY: [
            'Theo dõi sát phản ứng thuốc & nguy cơ tương tác',
            ...(chain.protocol?.supportiveCare || []),
          ],
          nguon: [chain.protocol?.guideline || 'Hướng dẫn chẩn đoán và điều trị Bộ Y tế'],
        },
      };

      if (matchingIndices.length > 0) {
        // Thay thế phần tử đầu tiên bằng bệnh mẹ enriched
        list[firstIdx] = enrichedBenh;
        // Loại bỏ triệt để các phần tử phân độ con trùng lặp khác
        const duplicateIndices = new Set(matchingIndices.slice(1));
        list = list.filter((_, idx) => !duplicateIndices.has(idx));
      } else {
        list.push(enrichedBenh);
      }
    });

    return list
      .filter((b) => Boolean(b && b.baoDong))
      .sort((a, b) => (a.ten || '').localeCompare(b.ten || '', 'vi'));
  }, [kb.benh]);

  const currentDisease = useMemo(() => {
    let effectiveId = selectedDiseaseId;
    if (effectiveId && SUB_DISEASE_TO_PARENT_MAP[effectiveId]) {
      effectiveId = SUB_DISEASE_TO_PARENT_MAP[effectiveId].parentId;
    }
    if (!effectiveId) return allAvailableDiseases[0] || null;
    return (
      allAvailableDiseases.find((b) => b.id === effectiveId) ||
      (effectiveId === 'suy_gan_cap_tren_nen_man_aclf'
        ? allAvailableDiseases.find((b) => b.id === 'aclf')
        : null) ||
      (effectiveId === 'aclf'
        ? allAvailableDiseases.find((b) => b.id === 'suy_gan_cap_tren_nen_man_aclf')
        : null) ||
      allAvailableDiseases.find((b) => b.icd === effectiveId) ||
      allAvailableDiseases[0] ||
      null
    );
  }, [allAvailableDiseases, selectedDiseaseId, SUB_DISEASE_TO_PARENT_MAP]);

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

  // Khởi tạo mặc định các trục khi bệnh lý có chế độ Multi-Axis
  useEffect(() => {
    if (activeChain?.branching?.mode === 'multi' && activeChain?.branching?.axes) {
      const initialAxes: Record<string, string> = {};
      activeChain.branching.axes.forEach((axis) => {
        initialAxes[axis.axisId] = axis.branches[0]?.id || '';
      });
      setSelectedAxes(initialAxes);
    } else {
      setSelectedAxes({});
    }
  }, [activeChain?.diseaseName, activeChain?.icdCode]);

  const handleSelectAxisBranch = (axisId: string, branchId: string) => {
    setSelectedAxes((prev) => ({
      ...prev,
      [axisId]: branchId,
    }));
  };

  // Tìm kiếm phác đồ phối hợp (Combined Protocol) khớp với các lựa chọn trục hiện tại
  const activeCombinedProtocol = useMemo<CombinedProtocol | null>(() => {
    if (activeChain?.branching?.mode !== 'multi' || !activeChain?.branching?.combinedProtocols) {
      return null;
    }
    return (
      activeChain.branching.combinedProtocols.find((cp) => {
        return Object.entries(cp.axisSelections).every(([aId, bId]) => selectedAxes[aId] === bId);
      }) || null
    );
  }, [activeChain, selectedAxes]);

  // Danh sách các đối tượng nhánh đang được chọn trên từng trục
  const activeSelectedBranches = useMemo(() => {
    if (activeChain?.branching?.mode !== 'multi' || !activeChain?.branching?.axes) {
      return [];
    }
    return activeChain.branching.axes
      .map((axis) => {
        const bId = selectedAxes[axis.axisId] || axis.branches[0]?.id;
        return axis.branches.find((b) => b.id === bId) || axis.branches[0];
      })
      .filter(Boolean);
  }, [activeChain, selectedAxes]);

  // Available Severity Grades / Dynamic Clinical Branches
  const severityGrades: SeverityGradingItem[] = useMemo(() => {
    if (activeChain?.hasSeverityGrading === false || activeChain?.stagingType === 'none') {
      return [];
    }
    // 0. HỆ THỐNG ĐA TRỤC PHÂN NHÁNH (MULTI-AXIS BRANCHING v4.0):
    // Ánh xạ các nhánh của trục giai đoạn/mức độ (stage hoặc severity) làm danh sách đại diện
    if (activeChain?.branching?.mode === 'multi' && activeChain.branching.axes && activeChain.branching.axes.length > 0) {
      const mainAxis =
        activeChain.branching.axes.find((a) => a.axisType === 'stage' || a.axisType === 'severity') ||
        activeChain.branching.axes[0];
      return mainAxis.branches.map((b) => ({
        grade: b.name,
        severity: (b.color === 'rose' || b.color === 'red'
          ? 'critical'
          : b.color === 'amber'
          ? 'moderate'
          : b.color === 'emerald'
          ? 'mild'
          : 'moderate') as any,
        criteria: b.criteria,
        triage: b.triage || 'Theo dõi lâm sàng',
        primaryAction: b.targetVitals || '',
        targetVitals: b.targetVitals || '',
        escalationCriteria: b.escalationCriteria,
        dischargeCriteria: b.dischargeCriteria,
        protocol: {
          title: b.name,
          tuyen: b.triage ? [b.triage] : [],
          drugs: b.drugs,
          firstLineDrugs: b.firstLineDrugs,
          timelinePhases: b.timelinePhases,
          monitoring: b.monitoring,
          cautions: b.cautions,
          escalationCriteria: b.escalationCriteria,
          dischargeCriteria: b.dischargeCriteria,
          patientCounseling: b.patientCounseling,
        },
      }));
    }
    // 1. Ưu tiên cao nhất: Hệ thống 6 Trục Phân Nhánh Lâm Sàng v3.0 (branching.branches)
    if (activeChain?.branching?.branches && activeChain.branching.branches.length > 0) {
      return activeChain.branching.branches.map((b) => ({
        grade: b.name,
        severity: (b.color === 'rose' || b.color === 'red'
          ? 'critical'
          : b.color === 'amber'
          ? 'moderate'
          : b.color === 'emerald'
          ? 'mild'
          : 'moderate') as any,
        criteria: b.criteria,
        triage: b.triage || 'Theo dõi lâm sàng',
        primaryAction: b.targetVitals || '',
        targetVitals: b.targetVitals || '',
        escalationCriteria: b.escalationCriteria,
        dischargeCriteria: b.dischargeCriteria,
        protocol: {
          title: b.name,
          tuyen: b.triage ? [b.triage] : [],
          drugs: b.drugs,
          firstLineDrugs: b.firstLineDrugs,
          timelinePhases: b.timelinePhases,
          monitoring: b.monitoring,
          cautions: b.cautions,
          escalationCriteria: b.escalationCriteria,
          dischargeCriteria: b.dischargeCriteria,
          patientCounseling: b.patientCounseling,
        },
      }));
    }
    // 2. Tiếp theo: Lấy từ severityGrading cấu hình sẵn
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

  // Danh sách các mục con của Mục 1 (Phân loại) cho thanh TOC (Hỗ trợ đa trục động hoặc 1a/1b/1c)
  const classificationSubItems = useMemo(() => {
    if (activeChain?.branching?.mode === 'multi' && activeChain.branching.axes && activeChain.branching.axes.length > 0) {
      const axes = activeChain.branching.axes;
      const list: Array<{ id: string; label: string; alertCount?: number }> = [];

      axes.forEach((axis, idx) => {
        const letter = String.fromCharCode(97 + idx); // a, b, c...
        const tabCode = `1${letter}`;
        const short =
          axis.axisLabelShort ||
          axis.axisName
            .replace(/^Phân loại theo\s+/i, '')
            .replace(/^Phân tầng\s+/i, '')
            .trim();
        list.push({
          id: `sub-${tabCode}`,
          label: `${tabCode}. ${short}`,
        });
      });

      // Tab Biến chứng
      const compLetter = String.fromCharCode(97 + axes.length);
      const compCode = `1${compLetter}`;
      list.push({
        id: `sub-${compCode}`,
        label: `${compCode}. Tầm soát biến chứng`,
        alertCount: activeComplicationIndices.size > 0 ? activeComplicationIndices.size : undefined,
      });

      // Tab Đối tượng đặc biệt
      const specLetter = String.fromCharCode(97 + axes.length + 1);
      const specCode = `1${specLetter}`;
      list.push({
        id: `sub-${specCode}`,
        label: `${specCode}. Cơ địa & Chỉnh liều eGFR`,
      });

      return list;
    }

    return [
      { id: 'sub-1a', label: isPhenotypeStaging ? '1a. Thể lâm sàng' : '1a. Phân độ nặng nhẹ' },
      {
        id: 'sub-1b',
        label: '1b. Tầm soát biến chứng',
        alertCount: activeComplicationIndices.size > 0 ? activeComplicationIndices.size : undefined,
      },
      { id: 'sub-1c', label: '1c. Cơ địa & Chỉnh liều eGFR' },
    ];
  }, [activeChain, isPhenotypeStaging, activeComplicationIndices.size]);

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
    } else if (selectedDiseaseId && SUB_DISEASE_TO_PARENT_MAP[selectedDiseaseId]) {
      setSelectedGradeIdx(SUB_DISEASE_TO_PARENT_MAP[selectedDiseaseId].gradeIdx);
    } else {
      setSelectedGradeIdx(autoSuggestedGradeIndex);
    }
  }, [initialGradeIdx, currentDisease?.id, selectedDiseaseId, autoSuggestedGradeIndex, SUB_DISEASE_TO_PARENT_MAP]);

  const activeSeverityGrade = useMemo(() => {
    return severityGrades[selectedGradeIdx] || severityGrades[0];
  }, [severityGrades, selectedGradeIdx]);

  // Phác đồ điều trị phân độ (Hỗ trợ cả Single-Axis và Multi-Axis)
  const phacDo = useMemo(() => {
    // 0. Nếu là Multi-Axis có CombinedProtocol hoặc các nhánh đang chọn
    if (activeChain?.branching?.mode === 'multi') {
      if (activeCombinedProtocol) {
        const tuyen = activeCombinedProtocol.triage
          ? [activeCombinedProtocol.triage]
          : activeSeverityGrade?.protocol?.tuyen || currentDisease?.phacDo?.tuyen || [];

        // Thuốc: lấy từ combinedProtocol hoặc gộp từ các nhánh đang chọn
        let thuoc: Array<[string, string, string]> = [];
        if (activeCombinedProtocol.drugs && activeCombinedProtocol.drugs.length > 0) {
          thuoc = activeCombinedProtocol.drugs;
        } else {
          // Gộp thuốc từ tất cả nhánh đang chọn
          const drugSet = new Set<string>();
          activeSelectedBranches.forEach((branch) => {
            if (branch.drugs) {
              branch.drugs.forEach((d) => {
                const key = `${d[0]}|${d[1]}`;
                if (!drugSet.has(key)) {
                  drugSet.add(key);
                  thuoc.push(d);
                }
              });
            }
          });
          if (thuoc.length === 0 && currentDisease?.phacDo?.thuoc) {
            thuoc = currentDisease.phacDo.thuoc;
          }
        }

        const theoDoi = [
          ...(activeCombinedProtocol.monitoring || []),
          ...activeSelectedBranches.flatMap((b) => b.monitoring || []),
        ];

        const luuY = [
          ...(activeCombinedProtocol.keyWarnings || []),
          ...(activeCombinedProtocol.cautions || []),
          ...activeSelectedBranches.flatMap((b) => b.cautions || []),
        ];

        const nguon = [
          activeCombinedProtocol.combinedName ||
            activeChain?.protocol?.guideline ||
            currentDisease?.phacDo?.nguon?.[0] ||
            'Hướng dẫn chẩn đoán và điều trị Bộ Y tế',
        ];

        return {
          tuyen,
          thuoc: thuoc.length > 0 ? thuoc : currentDisease?.phacDo?.thuoc || [],
          theoDoi: theoDoi.length > 0 ? theoDoi : currentDisease?.phacDo?.theoDoi || [],
          luuY: luuY.length > 0 ? luuY : currentDisease?.phacDo?.luuY || [],
          nguon,
        };
      }
    }

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
  }, [activeSeverityGrade, activeChain, currentDisease, activeCombinedProtocol, activeSelectedBranches]);

  // Timeline phases - Cơ chế phân giải đa tầng: Phân độ riêng -> Protocol của Chain -> Root Chain -> phacDo -> Thư viện timeline
  const timelinePhases = useMemo(() => {
    if (!currentDisease) return [];
    // 0. Nếu là Multi-Axis và có CombinedProtocol có timelinePhases
    if (activeChain?.branching?.mode === 'multi') {
      if (
        activeCombinedProtocol?.timelinePhases &&
        Array.isArray(activeCombinedProtocol.timelinePhases) &&
        activeCombinedProtocol.timelinePhases.length > 0
      ) {
        return activeCombinedProtocol.timelinePhases;
      }
      // Hoặc tìm timelinePhases từ nhánh giai đoạn/mức độ đang chọn
      for (const branch of activeSelectedBranches) {
        if (branch.timelinePhases && Array.isArray(branch.timelinePhases) && branch.timelinePhases.length > 0) {
          return branch.timelinePhases;
        }
      }
    }
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
  }, [
    currentDisease,
    activeSeverityGrade,
    phacDo,
    activeChain,
    activeCombinedProtocol,
    activeSelectedBranches,
  ]);

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
        <div className="flex flex-col lg:flex-row gap-5 items-start relative w-full">
          {/* Cột chính: Bố cục 6 đầu mục lâm sàng */}
          <div className="flex-1 min-w-0 bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-xs flex flex-col gap-5 w-full">
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
            subtitle={`${activeChain?.branching?.axisLabelShort ? `1a. ${activeChain.branching.axisLabelShort}` : (isPhenotypeStaging ? '1a. Thể lâm sàng' : '1a. Phân độ nặng nhẹ')} • 1b. Phân độ biến chứng • 1c. Các đối tượng đặc biệt`}
            badgeText={
              severityGrades.length === 0
                ? 'Tiếp cận toàn diện'
                : `${severityGrades.length} ${activeChain?.branching?.axisType === 'stage' ? 'giai đoạn' : (isPhenotypeStaging ? 'thể bệnh' : 'phân độ')}`
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
              targetTab={targetClassificationTab}
              selectedAxes={selectedAxes}
              onSelectAxisBranch={handleSelectAxisBranch}
              activeCombinedProtocol={activeCombinedProtocol}
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
              activeCombinedProtocol={activeCombinedProtocol}
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
            subtitle="[1] Chỉ định can thiệp &amp; Y lệnh &bull; [2] Cảnh báo quan trọng &bull; [3] Chống chỉ định &bull; [4] Tiêu chuẩn xuất viện"
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
                  (activeChain as any)?.clinicalCautions ||
                  (activeChain as any)?.protocol?.clinicalCautions ||
                  (activeChain as any)?.protocol?.cautionsAndDischarge ||
                  (activeChain as any)?.cautionsAndDischarge;
                if (!raw) return undefined;
                return {
                  cautions: raw.criticalWarnings || raw.cautions || raw.warnings || [],
                  contraindications: raw.contraindications || [],
                  dischargeCriteria: raw.dischargeCriteria || [],
                  clinicalIndications: raw.clinicalIndications || raw.treatmentIndications || raw.indications || [],
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
              targetTab={targetKnowledgeTab}
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

          {/* Cột bên: Thanh Mục Lục (TOC) Sticky & Mobile FAB */}
          <ProtocolTableOfContents
            activeSection={activeSection}
            expandedSections={expandedSections}
            onToggleSection={toggleSection}
            onJumpTo={handleJumpToSection}
            severityGradesCount={severityGrades.length}
            isPhenotypeStaging={isPhenotypeStaging}
            activeSeverityGradeName={activeSeverityGrade?.grade}
            activeComplicationsCount={activeComplicationIndices.size}
            totalOrders={totalAllOrders}
            checkedOrdersCount={currentCheckedCount}
            progressPercent={progressPercent}
            cautionsCount={phacDo.luuY.length}
            guidelinesCount={matchedGuidelines.length}
            soapCasesCount={similarSoapCases.length}
            classificationSubItems={classificationSubItems}
            onExpandAll={handleExpandAll}
            onCollapseAll={handleCollapseAll}
          />
        </div>
      )}
    </div>
  );
};
