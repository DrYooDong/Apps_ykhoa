import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Building2,
  Calendar,
  Calculator,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ClipboardCheck,
  ClipboardCopy,
  Clock,
  Compass,
  Copy,
  Database,
  Droplets,
  ExternalLink,
  FileCheck,
  FileText,
  Filter,
  Heart,
  HeartPulse,
  Info,
  Layers,
  Pill,
  Plus,
  Printer,
  RotateCcw,
  Search,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Syringe,
  Target,
  Trash2,
  Truck,
  User,
  Wind,
  X,
  Zap,
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
  DiseaseReactionChainDefinition,
  SeverityGradingItem,
} from '../../data/diagnostic-criteria-database.ts';
import { GROUP_COLORS, GROUP_NAMES } from '../data/seedData.ts';
import {
  findVaultArticlesForDisease,
  getCdssForCondition,
  getIcd10Guidance,
  getKnowledgeVaultWebUrl,
  getPathwayArticles,
  getToolsForDisease,
  VaultArticle,
} from '../lib/vaultBridge.ts';
import {
  extractRecommendedDrugs,
  getGuidelinesForDisease,
  getGuidelineWebUrl,
  SOURCE_TYPE_LABELS,
} from '../lib/guidelineBridge.ts';
import { getSimilarSoapCases } from '../lib/crossReferenceEngine.ts';
import { SafePrescribingDdiPanel } from './SafePrescribingDdiPanel.tsx';
import { ComplicationSentinelPanel } from './ComplicationSentinelPanel.tsx';
import { PatientCounselingPanel } from './PatientCounselingPanel.tsx';
import { getDailyTreatmentTimeline } from '../lib/dailyTreatmentTimeline.ts';

interface CustomOrder {
  id: string;
  drug: string;
  dosage: string;
  note: string;
  completed: boolean;
}

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

// Helper phân tách dấu hiệu cảnh báo thành các chip lâm sàng tương tác
function parseWarningSignsList(text: string): { label: string; isHighAlert: boolean }[] {
  if (!text) return [];
  const parts = text
    .split(/[,;]\s+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return parts.map((part) => {
    const isHighAlert =
      /(HA=0|M=0|CRT\s*>\s*3|Hct\s*>\s*50%|SpO2\s*<\s*92%|AST.*>=|ALT.*>=|GCS\s*<\s*12|pH\s*<\s*7|toan|ngưng|hôn mê|sốc mất bù|khó thở|co giật)/i.test(
        part
      );
    return { label: part, isHighAlert };
  });
}

// Helper phân tách các bước xử trí lâm sàng tương tác
function parseActionStepsList(text: string): { stepNum: number; actionText: string; category: 'resus' | 'fluid' | 'drug' | 'eval' }[] {
  if (!text) return [];
  const rawSteps = text
    .split(/;\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return rawSteps.map((step, idx) => {
    let category: 'resus' | 'fluid' | 'drug' | 'eval' = 'eval';
    if (/oxy|thở|nội khí quản|CPAP|thông khí/i.test(step)) {
      category = 'resus';
    } else if (/Ringer|dịch|Dextran|cao phân tử|bơm|xả|bù dịch/i.test(step)) {
      category = 'fluid';
    } else if (/tiêm|truyền|liều|thuốc|Paracetamol|Furosemide|Diazepam|Noradrenaline|Lactulose|Vitamin|Albumin|Esomeprazole/i.test(step)) {
      category = 'drug';
    }
    return {
      stepNum: idx + 1,
      actionText: step,
      category,
    };
  });
}

interface CollapsibleProtocolSectionProps {
  id: string;
  isOpen: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  title: string;
  badgeText?: string;
  badgeColor?: string;
  subtitle?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

const CollapsibleProtocolSection: React.FC<CollapsibleProtocolSectionProps> = ({
  isOpen,
  onToggle,
  icon,
  title,
  badgeText,
  badgeColor = 'bg-slate-100 text-slate-700 border-slate-200',
  subtitle,
  containerClassName = 'bg-white border border-slate-200 rounded-xl p-4 shadow-2xs',
  children,
}) => {
  return (
    <div className={`transition-all ${containerClassName}`}>
      <div
        onClick={onToggle}
        className="flex items-center justify-between gap-3 cursor-pointer select-none py-1 group"
      >
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="shrink-0">{icon}</div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-display font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                {title}
              </h4>
              {badgeText && (
                <span className={`px-2 py-0.5 rounded text-[10.5px] font-semibold border ${badgeColor}`}>
                  {badgeText}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer shrink-0 shadow-2xs ${
            isOpen
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
          }`}
        >
          <span>{isOpen ? 'Thu gọn' : 'Bung nội dung'}</span>
          {isOpen ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="mt-3.5 pt-3.5 border-t border-slate-200/80 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
};

export const Step3Protocol: React.FC<Step3Props> = ({
  kb,
  selectedDiseaseId,
  initialGradeIdx,
  initialComplicationId,
  onSelectDisease,
  onBackToAnalysis,
  onSaveToPostgres,
  onPrintReport,
  onOpenVaultDrawer,
  onOpenPromptBuilder,
  onNavigateToSoapCase,
  form,
  vitals,
  labs,
}) => {
  // Local state for checked orders & custom doctor additions
  const [checkedOrders, setCheckedOrders] = useState<Set<string>>(new Set());
  const [customOrders, setCustomOrders] = useState<CustomOrder[]>([]);
  const [newDrug, setNewDrug] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newNote, setNewNote] = useState('');
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [searchDisease, setSearchDisease] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [showCalculator, setShowCalculator] = useState(false);

  // Collapsible sections state: all sections except Staging are collapsed (ẩn) by default
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

  // Quick Clinical Risk Calculator state
  const [curbScores, setCurbScores] = useState({
    c: false, // Confusion
    u: false, // Urea > 7
    r: false, // RR >= 30
    b: false, // BP < 90/60
    age: false, // Age >= 65
  });

  const [killipClass, setKillipClass] = useState<'I' | 'II' | 'III' | 'IV'>('I');

  // Clinical Severity Grading & Complications Triage State
  const [selectedGradeIdx, setSelectedGradeIdx] = useState<number>(0);
  const [activeComplicationIndices, setActiveComplicationIndices] = useState<Set<number>>(new Set());

  // Merge kb.benh and all diseases from DIAGNOSTIC_CHAIN_DATABASE (enriched + kho chẩn đoán)
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

  // Knowledge Vault Clinical Pathway & Related Articles
  const pathway = useMemo(() => {
    return getPathwayArticles(currentDisease?.ten || '');
  }, [currentDisease]);

  const relatedVaultArticles = useMemo(() => {
    return findVaultArticlesForDisease(currentDisease?.icd || '', currentDisease?.ten || '');
  }, [currentDisease]);

  const diseaseTools: VaultArticle[] = useMemo(() => {
    if (!currentDisease) return [];
    return getToolsForDisease(currentDisease.ten, currentDisease.icd);
  }, [currentDisease]);

  const diseaseIcdGuidance: VaultArticle[] = useMemo(() => {
    if (!currentDisease) return [];
    return getIcd10Guidance(currentDisease.icd, currentDisease.ten);
  }, [currentDisease]);

  const diseaseCdss: VaultArticle[] = useMemo(() => {
    if (!currentDisease) return [];
    return getCdssForCondition(currentDisease.ten);
  }, [currentDisease]);

  // EBM Guidelines liên kết động từ src/content/ebm/guidelines
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
  };

  const handleAddPreventionOrder = (drugName: string, dosage: string, note: string) => {
    const newOrder: CustomOrder = {
      id: `prevention_${Date.now()}`,
      drug: drugName,
      dosage: dosage,
      note: note,
      completed: false,
    };
    setCustomOrders((prev) => [...prev, newOrder]);
    setExpandedSections((prev) => ({ ...prev, rx: true }));
  };

  // Match full chain from DIAGNOSTIC_CHAIN_DATABASE
  const activeChain: DiseaseReactionChainDefinition | undefined = useMemo(() => {
    if (!currentDisease) return undefined;
    if (DIAGNOSTIC_CHAIN_DATABASE[currentDisease.id]) {
      return DIAGNOSTIC_CHAIN_DATABASE[currentDisease.id];
    }
    const cleanName = currentDisease.ten.toLowerCase().trim();
    const cleanIcd = currentDisease.icd.toUpperCase().trim();
    for (const [, c] of Object.entries(DIAGNOSTIC_CHAIN_DATABASE)) {
      if (
        c.icdCode === cleanIcd ||
        c.diseaseName.toLowerCase().trim() === cleanName ||
        (c.icdPrefixes && c.icdPrefixes.includes(cleanIcd))
      ) {
        return c;
      }
    }
    return undefined;
  }, [currentDisease]);


  // Sync initialComplicationId: auto-activate and add its orderSet to custom orders
  useEffect(() => {
    if (initialComplicationId && activeChain?.complications) {
      const idx = activeChain.complications.findIndex((c) => c.id === initialComplicationId);
      if (idx >= 0) {
        setActiveComplicationIndices((prev) => new Set(prev).add(idx));
        const comp = activeChain.complications[idx];
        if (comp.orderSet && comp.orderSet.length > 0) {
          const newOrders: CustomOrder[] = comp.orderSet.map((item, oIdx) => ({
            id: `comp_init_${comp.id}_${Date.now()}_${oIdx}`,
            drug: `${item.drugName} ${item.dosage}${item.route ? ' (' + item.route + ')' : ''}`,
            dosage: item.rate || item.timing || 'Cấp cứu',
            note: item.warning ? `⚠️ ${item.warning}` : `Chỉ định cấp cứu cho ${comp.name}`,
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

  // Available Severity Grades for current disease
  const severityGrades: SeverityGradingItem[] = useMemo(() => {
    if (activeChain?.severityGrading && activeChain.severityGrading.length > 0) {
      return activeChain.severityGrading;
    }
    // Universal 3-tier fallback grading
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

  // Auto-detect recommended grade based on vitals and labs
  const autoSuggestedGradeIndex = useMemo(() => {
    if (!vitals) return 0;
    const hatt = parseFloat(vitals.vHATT || '120');
    const hattr = parseFloat(vitals.vHATTr || '80');
    const mach = parseFloat(vitals.vMach || '80');
    const spo2 = parseFloat(vitals.vSpo2 || '98');
    const tc = labs ? parseFloat(labs.lTC || '250') : 250;
    const hct = labs ? parseFloat(labs.lHct || '40') : 40;

    // Critical (Grade 3)
    if (
      (hatt > 0 && hatt <= 90) ||
      (hatt > 0 && hattr > 0 && hatt - hattr <= 20) ||
      (spo2 > 0 && spo2 < 92) ||
      (tc > 0 && tc < 50) ||
      (mach > 0 && hatt > 0 && mach / hatt >= 1.0)
    ) {
      return severityGrades.length > 2 ? severityGrades.length - 1 : 1;
    }

    // Moderate / Warning (Grade 2)
    if (
      (mach >= 100) ||
      (parseFloat(vitals.vNhiet || '37') >= 39.0) ||
      (tc > 0 && tc < 100) ||
      (hct >= 44)
    ) {
      return severityGrades.length > 1 ? 1 : 0;
    }

    return 0;
  }, [vitals, labs, severityGrades]);

  // Ưu tiên phân độ do người dùng chỉ định từ Bước 3 (initialGradeIdx), nếu không có thì dùng phân độ gợi ý tự động
  useEffect(() => {
    if (initialGradeIdx !== undefined && initialGradeIdx !== null) {
      setSelectedGradeIdx(initialGradeIdx);
    } else {
      setSelectedGradeIdx(autoSuggestedGradeIndex);
    }
  }, [initialGradeIdx, currentDisease?.id]);

  // Selected severity grade object
  const activeSeverityGrade = useMemo(() => {
    return severityGrades[selectedGradeIdx] || severityGrades[0];
  }, [severityGrades, selectedGradeIdx]);

  // Robust protocol data: Prioritizes active severity grade's specialized protocol if available
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

  // Lộ trình điều trị chi tiết từng ngày, gom nhóm theo giai đoạn lâm sàng EBM
  const timelinePhases = useMemo(() => {
    if (!currentDisease) return [];
    return getDailyTreatmentTimeline(
      currentDisease.id,
      currentDisease.ten,
      activeSeverityGrade,
      phacDo
    );
  }, [currentDisease, activeSeverityGrade, phacDo]);

  // Combined drug names for DDI & Counseling
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

  // Filtered diseases for selector dropdown / quick search
  const filteredDiseases = useMemo(() => {
    const q = searchDisease.toLowerCase().trim();
    return allAvailableDiseases.filter((b) => {
      const matchSpecialty =
        selectedSpecialty === 'all' || b.nhom === selectedSpecialty;
      const matchQuery =
        !q ||
        b.ten.toLowerCase().includes(q) ||
        b.icd.toLowerCase().includes(q) ||
        b.nhom.toLowerCase().includes(q);
      return matchSpecialty && matchQuery;
    });
  }, [allAvailableDiseases, searchDisease, selectedSpecialty]);

  // All unique organ specialties
  const specialties = useMemo(() => {
    const set = new Set<string>();
    allAvailableDiseases.forEach((b) => {
      if (b.nhom) set.add(b.nhom);
    });
    return Array.from(set).sort();
  }, [allAvailableDiseases]);

  // Toggle order checkbox
  const toggleOrder = (key: string) => {
    setCheckedOrders((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  // Mark all standard protocol orders as completed
  const handleCompleteAll = () => {
    if (!currentDisease) return;
    const next = new Set(checkedOrders);
    phacDo.tuyen.forEach((_, idx) => next.add(`tuyen-${currentDisease.id}-g${selectedGradeIdx}-${idx}`));
    phacDo.thuoc.forEach((_, idx) => next.add(`thuoc-${currentDisease.id}-g${selectedGradeIdx}-${idx}`));
    phacDo.theoDoi.forEach((_, idx) => next.add(`theodoi-${currentDisease.id}-g${selectedGradeIdx}-${idx}`));
    setCheckedOrders(next);
  };

  // Reset checked orders for current disease
  const handleResetOrders = () => {
    if (!currentDisease) return;
    setCheckedOrders((prev) => {
      const next = new Set(prev);
      phacDo.tuyen.forEach((_, idx) => next.delete(`tuyen-${currentDisease.id}-g${selectedGradeIdx}-${idx}`));
      phacDo.thuoc.forEach((_, idx) => next.delete(`thuoc-${currentDisease.id}-g${selectedGradeIdx}-${idx}`));
      phacDo.theoDoi.forEach((_, idx) => next.delete(`theodoi-${currentDisease.id}-g${selectedGradeIdx}-${idx}`));
      return next;
    });
  };

  // Add custom order
  const handleAddCustomOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDrug.trim()) return;
    const newOrder: CustomOrder = {
      id: `custom-${Date.now()}`,
      drug: newDrug.trim(),
      dosage: newDosage.trim() || 'Theo chỉ định bác sĩ',
      note: newNote.trim() || 'Y lệnh bổ sung',
      completed: false,
    };
    setCustomOrders((prev) => [...prev, newOrder]);
    setNewDrug('');
    setNewDosage('');
    setNewNote('');
    setShowAddCustom(false);
  };

  const toggleCustomOrder = (id: string) => {
    setCustomOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, completed: !o.completed } : o))
    );
  };

  const removeCustomOrder = (id: string) => {
    setCustomOrders((prev) => prev.filter((o) => o.id !== id));
  };

  // Execution Progress Calculation
  const totalStandardOrders =
    phacDo.tuyen.length + phacDo.thuoc.length + phacDo.theoDoi.length;
  const currentCheckedCount = useMemo(() => {
    if (!currentDisease) return 0;
    let count = 0;
    phacDo.tuyen.forEach((_, idx) => {
      if (checkedOrders.has(`tuyen-${currentDisease.id}-g${selectedGradeIdx}-${idx}`)) count++;
    });
    phacDo.thuoc.forEach((_, idx) => {
      if (checkedOrders.has(`thuoc-${currentDisease.id}-g${selectedGradeIdx}-${idx}`)) count++;
    });
    phacDo.theoDoi.forEach((_, idx) => {
      if (checkedOrders.has(`theodoi-${currentDisease.id}-g${selectedGradeIdx}-${idx}`)) count++;
    });
    const completedCustom = customOrders.filter((c) => c.completed).length;
    return count + completedCustom;
  }, [currentDisease, phacDo, checkedOrders, customOrders, selectedGradeIdx]);

  const totalAllOrders = totalStandardOrders + customOrders.length;
  const progressPercent = totalAllOrders > 0 ? Math.round((currentCheckedCount / totalAllOrders) * 100) : 0;

  // Copy Formatted Medical Order Sheet to Clipboard (HIS / EMR ready)
  const handleCopyOrderSheet = async () => {
    if (!currentDisease) return;

    const lines: string[] = [];
    lines.push(`========================================================`);
    lines.push(`PHIẾU Y LỆNH ĐIỀU TRỊ CHUYÊN KHOA (EMR FORMAT)`);
    lines.push(`Bệnh viện / Cơ sở y tế: Hệ thống Phân tích MedLens Pro`);
    lines.push(`Thời gian ra y lệnh: ${new Date().toLocaleString('vi-VN')}`);
    lines.push(`--------------------------------------------------------`);
    if (form) {
      lines.push(
        `Người bệnh: ${form.gioiTinh === 'nam' ? 'Nam' : 'Nữ'}, ${form.tuoi || '—'} tuổi | Nghề: ${
          form.ngheNghiep || '—'
        }`
      );
      lines.push(`Lý do vào viện: ${form.lyDo || '—'}`);
    }
    if (vitals) {
      lines.push(
        `Sinh hiệu: T° ${vitals.vNhiet || '—'}°C | Mạch ${vitals.vMach || '—'} l/p | HA ${
          vitals.vHATT || '—'
        }/${vitals.vHATTr || '—'} mmHg | Thở ${vitals.vTho || '—'} l/p | SpO2 ${vitals.vSpo2 || '—'}%`
      );
    }
    lines.push(`--------------------------------------------------------`);
    lines.push(`CHẨN ĐOÁN: ${currentDisease.ten} (ICD-10: ${currentDisease.icd})`);
    const activeGrade = severityGrades[selectedGradeIdx] || severityGrades[0];
    lines.push(`PHÂN ĐỘ LÂM SÀNG: ${activeGrade.grade}`);
    lines.push(`Tuyến điều trị tiếp nhận: ${activeGrade.triage}`);
    lines.push(`Hành động xử trí cốt lõi: ${activeGrade.primaryAction}`);
    if (activeGrade.targetVitals) {
      lines.push(`Mục tiêu sinh hiệu: ${activeGrade.targetVitals}`);
    }
    if (activeComplicationIndices.size > 0) {
      const compNames = Array.from(activeComplicationIndices)
        .map((idx) => activeComplications[idx]?.name)
        .filter(Boolean);
      lines.push(`BIẾN CHỨNG TÍCH CỰC: ${compNames.join('; ')}`);
    } else {
      lines.push(`BIẾN CHỨNG TÍCH CỰC: Chưa ghi nhận biến chứng đe dọa sinh mạng`);
    }
    lines.push(`Phân loại cấp cứu: ${currentDisease.baoDong ? 'CẤP CỨU / NGUY KỊCH' : 'Thường quy / Theo dõi'}`);
    lines.push(`Nguồn phác đồ: ${phacDo.nguon.join('; ')}`);
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

    lines.push(`\nV. CẢNH BÁO AN TOÀN & LƯU Ý:`);
    phacDo.luuY.forEach((ly) => {
      lines.push(`  ! ${ly}`);
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

  // Determine abnormal vitals for patient warning banner
  const abnormalVitalsSummary = useMemo(() => {
    if (!vitals) return [];
    const list: string[] = [];
    const t = parseFloat(vitals.vNhiet);
    const m = parseFloat(vitals.vMach);
    const hatt = parseFloat(vitals.vHATT);
    const hattr = parseFloat(vitals.vHATTr);
    const nt = parseFloat(vitals.vTho);
    const spo2 = parseFloat(vitals.vSpo2);

    if (!isNaN(t) && (t >= 38.0 || t < 36.0)) list.push(`T°: ${t}°C`);
    if (!isNaN(m) && (m > 100 || m < 60)) list.push(`Mạch: ${m} l/p`);
    if (!isNaN(hatt) && (hatt >= 140 || hatt < 90)) list.push(`HATT: ${hatt} mmHg`);
    if (!isNaN(hattr) && hattr >= 90) list.push(`HATTr: ${hattr} mmHg`);
    if (!isNaN(nt) && (nt > 22 || nt < 12)) list.push(`Thở: ${nt} l/p`);
    if (!isNaN(spo2) && spo2 < 94) list.push(`SpO₂: ${spo2}%`);
    return list;
  }, [vitals]);

  // CURB-65 total score
  const curbScoreTotal = useMemo(() => {
    return Object.values(curbScores).filter(Boolean).length;
  }, [curbScores]);

  return (
    <div className="flex flex-col gap-4">
      {/* Top Clinical Navigation Bar & Protocol Switcher */}
      <div className="bg-white border border-slate-200 rounded-lg p-3 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Left: Back & Title */}
        <div className="flex items-center gap-3">
          <button
            id="btn-back-to-step2"
            onClick={onBackToAnalysis}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold rounded-md transition-colors cursor-pointer"
            title="Quay lại bảng phân tích và chẩn đoán phân biệt"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Quay lại phân tích</span>
            <span className="sm:hidden">Quay lại</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-base sm:text-lg font-bold text-slate-800">
                Phác đồ điều trị & Y lệnh lâm sàng
              </h2>
              <span className="px-2 py-0.5 text-[10.5px] font-mono-custom bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-semibold">
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
              className="border border-slate-200 rounded-md px-2 py-1.5 text-xs bg-slate-50 focus:outline-none focus:border-blue-500 text-slate-700 font-medium"
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
            className="border border-slate-200 rounded-md px-2.5 py-1.5 text-xs font-semibold bg-slate-50 focus:outline-none focus:border-blue-500 text-slate-800 max-w-[240px] truncate"
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

      {/* Patient Vital Context Banner (If patient data exists) */}
      {(form || (vitals && Object.values(vitals).some(Boolean))) && (
        <div className="bg-slate-900 text-white rounded-lg p-3 px-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 flex items-center justify-center font-bold text-xs">
                <User className="w-3.5 h-3.5" />
              </span>
              <span className="font-semibold text-slate-200">
                {form?.gioiTinh === 'nam' ? 'Nam' : form?.gioiTinh === 'nu' ? 'Nữ' : 'Bệnh nhân'}{' '}
                {form?.tuoi ? `· ${form.tuoi} tuổi` : ''}
              </span>
              {form?.ngheNghiep && (
                <span className="text-slate-400 hidden sm:inline">({form.ngheNghiep})</span>
              )}
            </div>

            {form?.lyDo && (
              <div className="text-slate-300 hidden md:flex items-center gap-1.5 border-l border-slate-700 pl-3">
                <span className="text-slate-400">Lý do vào viện:</span>
                <span className="font-medium text-white italic">"{form.lyDo}"</span>
              </div>
            )}
          </div>

          {/* Current Vitals Readings */}
          {vitals && (
            <div className="flex items-center gap-3 font-mono-custom text-[11px] text-slate-300 flex-wrap">
              <span className="flex items-center gap-1">
                <span className="text-slate-400">T°:</span>
                <b className={parseFloat(vitals.vNhiet) >= 38 ? 'text-amber-400' : 'text-slate-100'}>
                  {vitals.vNhiet || '—'}°C
                </b>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <span className="text-slate-400">Mạch:</span>
                <b className={parseFloat(vitals.vMach) > 100 ? 'text-rose-400' : 'text-slate-100'}>
                  {vitals.vMach || '—'} l/p
                </b>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <span className="text-slate-400">HA:</span>
                <b className="text-slate-100">
                  {vitals.vHATT || '—'}/{vitals.vHATTr || '—'}
                </b>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <span className="text-slate-400">SpO₂:</span>
                <b className={parseFloat(vitals.vSpo2) < 94 ? 'text-rose-400' : 'text-emerald-400'}>
                  {vitals.vSpo2 || '—'}%
                </b>
              </span>
            </div>
          )}
        </div>
      )}

      {/* Abnormal Signs Quick Warning Alert */}
      {abnormalVitalsSummary.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 px-3.5 flex items-center justify-between text-amber-900 text-xs shadow-2xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <b>Lưu ý sinh hiệu người bệnh:</b> Phát hiện các thông số vượt ngưỡng tham chiếu:{' '}
              <span className="font-semibold">{abnormalVitalsSummary.join(' · ')}</span>. Ưu tiên các
              y lệnh ổn định huyết động và oxy liệu pháp.
            </span>
          </div>
        </div>
      )}

      {/* Main Protocol Presentation Card */}
      {currentDisease && (
        <div className="bg-white border border-slate-200 rounded-lg p-4 sm:p-6 shadow-xs flex flex-col gap-5">
          {/* Disease Header Banner & Metadata */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex flex-col gap-1.5 max-w-3xl">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {currentDisease.ten}
                </h3>
                <span className="px-2 py-0.5 text-xs font-mono-custom bg-slate-800 text-white rounded font-semibold">
                  {currentDisease.icd}
                </span>
                <span
                  className="px-2 py-0.5 text-[11px] font-semibold text-white rounded"
                  style={{ backgroundColor: GROUP_COLORS[currentDisease.nhom] || '#2563eb' }}
                >
                  {GROUP_NAMES[currentDisease.nhom] || currentDisease.nhom}
                </span>
                {currentDisease.baoDong && (
                  <span className="px-2.5 py-0.5 text-[11px] font-bold bg-red-50 text-red-700 border border-red-200 rounded flex items-center gap-1 animate-pulse">
                    <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
                    <span>CẤP CỨU / NGUY KỊCH</span>
                  </span>
                )}
              </div>

              {currentDisease.baoDong && currentDisease.ghiChuBaoDong && (
                <div className="text-xs text-red-800 bg-red-50/80 p-2 rounded border border-red-200 font-medium">
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
          {/* KHỐI TRỌNG TÂM: ĐÁNH GIÁ PHÂN ĐỘ & BIẾN CHỨNG LÂM SÀNG                     */}
          {/* ========================================================================= */}
          <div className="bg-gradient-to-br from-indigo-50/90 via-blue-50/40 to-slate-50 border-2 border-indigo-200/90 rounded-xl p-4 sm:p-5 shadow-xs flex flex-col gap-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-display font-bold text-sm sm:text-base text-indigo-950">
                      Đánh Giá Phân Độ Lâm Sàng & Sàng Lọc Biến Chứng
                    </h4>
                    <span className="px-2 py-0.5 rounded text-[10.5px] font-mono bg-indigo-100 text-indigo-700 font-semibold border border-indigo-200">
                      Quy trình EBM
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Tiêu chuẩn chẩn đoán xác nhận bệnh nhân mắc bệnh; Phân độ & Biến chứng quyết định chính xác phác đồ, tốc độ dịch và tuyến điều trị.
                  </p>
                </div>
              </div>

              {/* Auto-suggest badge */}
              {autoSuggestedGradeIndex > 0 && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Gợi ý tự động từ sinh hiệu/CLS: {severityGrades[autoSuggestedGradeIndex]?.grade.split(':')[0]}</span>
                </div>
              )}
            </div>

            {/* Phần 1: Các nút chọn Phân độ (Severity Staging Grid) */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-indigo-600" />
                  <span>1. Chọn phân độ lâm sàng hiện tại của người bệnh:</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  (Nhấp vào phân độ tương ứng để xem tiêu chuẩn và phác đồ)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                {severityGrades.map((g, idx) => {
                  const isSelected = selectedGradeIdx === idx;
                  const isAutoSuggested = autoSuggestedGradeIndex === idx;
                  const badgeColor =
                    g.severity === 'critical'
                      ? 'border-red-400 bg-red-50/90 text-red-900'
                      : g.severity === 'severe'
                      ? 'border-rose-300 bg-rose-50 text-rose-900'
                      : g.severity === 'moderate'
                      ? 'border-amber-300 bg-amber-50 text-amber-900'
                      : 'border-emerald-300 bg-emerald-50 text-emerald-900';

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedGradeIdx(idx)}
                      className={`p-3 rounded-lg border text-left flex flex-col justify-between gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? `${badgeColor} ring-2 ring-indigo-500 shadow-sm scale-[1.01]`
                          : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <span className="font-bold text-xs leading-snug">{g.grade}</span>
                        {isAutoSuggested && (
                          <span className="px-1.5 py-0.5 rounded text-[9.5px] font-bold bg-amber-500 text-white shrink-0">
                            Gợi ý
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[10.5px] pt-1 border-t border-slate-100">
                        <span className="text-slate-500 font-medium">Tuyến: <b>{g.triage.split('/')[0]}</b></span>
                        <span className={`px-1.5 py-0.2 rounded font-semibold text-[10px] ${
                          g.severity === 'critical' ? 'bg-red-200 text-red-800' : g.severity === 'moderate' ? 'bg-amber-200 text-amber-800' : 'bg-emerald-200 text-emerald-800'
                        }`}>
                          {g.severity.toUpperCase()}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Chi tiết phác đồ xử trí cốt lõi theo phân độ - Bảng Định Hướng & Tuyến Tiếp Nhận */}
              {severityGrades[selectedGradeIdx] && (
                <div className="bg-white border border-indigo-200/90 rounded-lg p-4 text-xs text-slate-800 flex flex-col gap-3.5 shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-2.5">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                      <span className="font-bold text-sm text-indigo-950">
                        Chiến Lược Điều Trị & Phân Tuyến Tiếp Nhận: {severityGrades[selectedGradeIdx].grade}
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded text-[11px] bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                      Mức độ: {severityGrades[selectedGradeIdx].severity.toUpperCase()}
                    </span>
                  </div>

                  {/* 3 Mục chuyển tiếp từ Bước 3 sang: Tuyến tiếp nhận, Định hướng, Mục tiêu */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* 1. Tuyến tiếp nhận */}
                    <div className="bg-blue-50/80 border border-blue-200/90 rounded-lg p-3 flex flex-col justify-between gap-2 shadow-2xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-[11px] text-blue-900 uppercase tracking-wider">
                          <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>Tuyến Tiếp Nhận & Phân Luồng:</span>
                        </div>
                        <p className="text-xs text-slate-900 font-semibold leading-relaxed">
                          {severityGrades[selectedGradeIdx].triage}
                        </p>
                      </div>
                      <span className="text-[10.5px] text-blue-700 font-medium">
                        Cơ sở y tế được chỉ định tiếp nhận theo chuẩn Bộ Y tế
                      </span>
                    </div>

                    {/* 2. Định hướng chiến lược */}
                    <div className="bg-indigo-50/80 border border-indigo-200/90 rounded-lg p-3 flex flex-col justify-between gap-2 shadow-2xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-[11px] text-indigo-900 uppercase tracking-wider">
                          <Compass className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                          <span>Định Hướng Chiến Lược Xử Trí:</span>
                        </div>
                        <p className="text-xs text-slate-900 font-semibold leading-relaxed">
                          {severityGrades[selectedGradeIdx].primaryAction}
                        </p>
                      </div>
                      <span className="text-[10.5px] text-indigo-700 font-medium">
                        Quy trình can thiệp & hồi sức cốt lõi
                      </span>
                    </div>

                    {/* 3. Mục tiêu điều trị */}
                    <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-lg p-3 flex flex-col justify-between gap-2 shadow-2xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 font-bold text-[11px] text-emerald-900 uppercase tracking-wider">
                          <Target className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Mục Tiêu Điều Trị & Sinh Hiệu:</span>
                        </div>
                        <p className="text-xs font-mono-custom text-emerald-950 font-bold leading-relaxed">
                          {severityGrades[selectedGradeIdx].targetVitals || 'Duy trì sinh hiệu ổn định trong giới hạn an toàn.'}
                        </p>
                      </div>
                      <span className="text-[10.5px] text-emerald-700 font-medium">
                        Đích huyết động an toàn & bảo tồn tưới máu tạng
                      </span>
                    </div>
                  </div>

                  {/* Tham chiếu tiêu chí chẩn đoán phân độ (đã phân tích ở Bước 3) */}
                  <details className="text-[11.5px] text-slate-500 pt-0.5 group">
                    <summary className="cursor-pointer hover:text-indigo-700 flex items-center gap-1.5 font-medium select-none text-[11px]">
                      <span>🔍 Nhấp để xem lại tiêu chuẩn xếp độ (đã phân tích ở Bước 3)</span>
                    </summary>
                    <div className="mt-2 p-2.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700 leading-relaxed text-[11px]">
                      <b>Tiêu chuẩn lâm sàng & CLS xác định phân độ:</b> {severityGrades[selectedGradeIdx].criteria}
                    </div>
                  </details>
                </div>
              )}
            </div>
          </div>

          {/* Clinical Order Execution Progress Bar & Actions */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 flex flex-wrap items-center justify-between gap-3">
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
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                id="btn-complete-all-orders"
                onClick={handleCompleteAll}
                className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors cursor-pointer flex items-center gap-1"
                title="Đánh dấu tất cả y lệnh trong phác đồ đã hoàn thành"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Hoàn tất tất cả</span>
              </button>

              <button
                type="button"
                id="btn-reset-orders"
                onClick={handleResetOrders}
                className="px-2 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                title="Bỏ chọn tất cả y lệnh"
              >
                <RotateCcw className="w-3 h-3" />
              </button>

              <button
                type="button"
                id="btn-copy-orders"
                onClick={handleCopyOrderSheet}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-md border transition-all cursor-pointer shadow-2xs ${
                  copySuccess
                    ? 'bg-emerald-600 text-white border-emerald-700'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
                title="Sao chép toàn bộ y lệnh theo chuẩn EMR/HIS để dán vào hồ sơ bệnh viện"
              >
                {copySuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Đã sao chép EMR!</span>
                  </>
                ) : (
                  <>
                    <ClipboardCopy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Sao chép y lệnh (HIS)</span>
                  </>
                )}
              </button>

              <div className="h-4 w-px bg-slate-300 hidden sm:block" />

              {/* Master Collapsible Controls */}
              <button
                type="button"
                onClick={handleExpandAll}
                className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-md transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                title="Bung toàn bộ các phần nội dung phác đồ"
              >
                <ChevronDown className="w-3.5 h-3.5 text-blue-600" />
                <span>Bung tất cả</span>
              </button>

              <button
                type="button"
                onClick={handleCollapseAll}
                className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-md transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                title="Thu gọn các phần nội dung để màn hình gọn gàng"
              >
                <ChevronUp className="w-3.5 h-3.5 text-slate-500" />
                <span>Thu gọn tất cả</span>
              </button>
            </div>
          </div>

          {/* Section 2: Bảng y lệnh thuốc & Dược lâm sàng (phacDo.thuoc) - Collapsible */}
          <CollapsibleProtocolSection
            id="rx"
            isOpen={expandedSections.rx}
            onToggle={() => toggleSection('rx')}
            icon={
              <div className="w-7 h-7 rounded-md bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Pill className="w-4 h-4" />
              </div>
            }
            title="2. Bảng y lệnh thuốc & Dược lâm sàng (Medical Order Sheet - Rx)"
            subtitle="Chỉ định liều lượng, đường dùng, kiểm tra tương tác thuốc (DDI), chỉnh liều eGFR & quy tắc BHYT"
            badgeText={`${phacDo.thuoc.length + customOrders.length} y lệnh`}
            badgeColor="bg-blue-100 text-blue-800 border-blue-200"
            containerClassName="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs"
          >
            <div className="flex justify-end mb-3">
              <button
                type="button"
                onClick={() => setShowAddCustom(!showAddCustom)}
                className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm y lệnh thuốc khác</span>
              </button>
            </div>

            {/* Custom order inline add form */}
            {showAddCustom && (
              <form
                onSubmit={handleAddCustomOrder}
                className="mb-3.5 p-3 bg-blue-50/60 border border-blue-200 rounded-lg flex flex-col sm:flex-row gap-2 items-end animate-fadeIn text-xs"
              >
                <div className="flex-1 w-full">
                  <label className="block font-semibold text-slate-700 mb-1">Tên thuốc / Hoạt chất</label>
                  <input
                    type="text"
                    required
                    value={newDrug}
                    onChange={(e) => setNewDrug(e.target.value)}
                    placeholder="VD: Paracetamol, Pantoprazol, Furosemid..."
                    className="w-full border border-slate-200 rounded p-1.5 bg-white text-xs text-slate-800"
                  />
                </div>
                <div className="flex-1 w-full">
                  <label className="block font-semibold text-slate-700 mb-1">Liều & Đường dùng</label>
                  <input
                    type="text"
                    value={newDosage}
                    onChange={(e) => setNewDosage(e.target.value)}
                    placeholder="VD: 500 mg TTM x 3 lần/ngày..."
                    className="w-full border border-slate-200 rounded p-1.5 bg-white text-xs text-slate-800"
                  />
                </div>
                <div className="flex-1 w-full">
                  <label className="block font-semibold text-slate-700 mb-1">Ghi chú điều kiện</label>
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="VD: Khi sốt >= 38.5°C..."
                    className="w-full border border-slate-200 rounded p-1.5 bg-white text-xs text-slate-800"
                  />
                </div>
                <div className="flex items-center gap-1.5 w-full sm:w-auto">
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-blue-600 text-white font-semibold rounded text-xs hover:bg-blue-700 cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    Thêm y lệnh
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddCustom(false)}
                    className="px-2.5 py-1.5 bg-white border border-slate-200 text-slate-600 rounded text-xs hover:bg-slate-100 cursor-pointer"
                  >
                    Đóng
                  </button>
                </div>
              </form>
            )}

            {/* Medical Order Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
                    <th className="p-2.5 w-10 text-center">Y lệnh</th>
                    <th className="p-2.5">Tên thuốc / Hoạt chất</th>
                    <th className="p-2.5">Liều lượng & Đường dùng</th>
                    <th className="p-2.5">Điều kiện / Ghi chú</th>
                    <th className="p-2.5 w-24 text-center">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {/* Standard Protocol Drugs */}
                  {phacDo.thuoc.map(([drug, dosage, note], idx) => {
                    const key = `thuoc-${currentDisease.id}-g${selectedGradeIdx}-${idx}`;
                    const isChecked = checkedOrders.has(key);
                    const isInjectable =
                      dosage.toLowerCase().includes('tm') ||
                      dosage.toLowerCase().includes('ttm') ||
                      dosage.toLowerCase().includes('tiêm') ||
                      dosage.toLowerCase().includes('tdd');

                    return (
                      <tr
                        key={idx}
                        onClick={() => toggleOrder(key)}
                        className={`cursor-pointer transition-colors ${
                          isChecked ? 'bg-emerald-50/70' : 'hover:bg-slate-50/80'
                        }`}
                      >
                        <td className="p-2.5 text-center">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="rounded text-blue-600 cursor-pointer"
                          />
                        </td>
                        <td className="p-2.5 font-bold text-slate-900">
                          <div className="flex items-center gap-1.5">
                            {isInjectable ? (
                              <Syringe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            ) : (
                              <Pill className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            )}
                            <span className={isChecked ? 'line-through text-slate-500' : ''}>
                              {drug}
                            </span>
                          </div>
                        </td>
                        <td className="p-2.5 font-mono-custom text-slate-800">
                          <span
                            className={`px-2 py-0.5 rounded font-semibold ${
                              isInjectable
                                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                : 'bg-slate-100 text-slate-800 border border-slate-200'
                            }`}
                          >
                            {dosage}
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-600 italic">
                          {note || 'Theo phác đồ chuẩn'}
                        </td>
                        <td className="p-2.5 text-center">
                          {isChecked ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-100 text-emerald-800">
                              <Check className="w-3 h-3" />
                              Đã y lệnh
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10.5px] bg-slate-100 text-slate-500">
                              Chờ duyệt
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}

                  {/* Doctor's Custom Additions */}
                  {customOrders.map((co) => (
                    <tr
                      key={co.id}
                      onClick={() => toggleCustomOrder(co.id)}
                      className={`cursor-pointer transition-colors bg-blue-50/30 ${
                        co.completed ? 'bg-emerald-50/70' : 'hover:bg-blue-50/60'
                      }`}
                    >
                      <td className="p-2.5 text-center">
                        <input
                          type="checkbox"
                          checked={co.completed}
                          onChange={() => {}}
                          className="rounded text-blue-600 cursor-pointer"
                        />
                      </td>
                      <td className="p-2.5 font-bold text-slate-900">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] px-1 bg-blue-600 text-white rounded font-mono-custom font-semibold">
                            BS
                          </span>
                          <span className={co.completed ? 'line-through text-slate-500' : ''}>
                            {co.drug}
                          </span>
                        </div>
                      </td>
                      <td className="p-2.5 font-mono-custom text-slate-800">
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-semibold">
                          {co.dosage}
                        </span>
                      </td>
                      <td className="p-2.5 text-slate-600 italic">
                        <div className="flex items-center justify-between gap-1">
                          <span>{co.note}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCustomOrder(co.id);
                            }}
                            className="text-slate-400 hover:text-red-600 p-1"
                            title="Xóa y lệnh tùy biến này"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                      <td className="p-2.5 text-center">
                        {co.completed ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-100 text-emerald-800">
                            <Check className="w-3 h-3" />
                            Đã y lệnh
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10.5px] bg-slate-100 text-slate-500">
                            Chờ duyệt
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Safe Prescription & Clinical Decision Helpers */}
            <div className="mt-2.5 p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
                <span>Trợ thủ an toàn kê đơn & Quy tắc BHYT:</span>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => onOpenVaultDrawer?.(undefined, 'kháng sinh', 'CDSS')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-[11px] font-semibold transition-colors cursor-pointer"
                  title="Mở Bảng Tính Liều Kháng Sinh Theo eGFR & PK/PD trong Kho CDSS"
                >
                  <span>⚡</span>
                  <span>Tính liều KS eGFR & PK/PD</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenVaultDrawer?.(undefined, 'Cockcroft', 'CC')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-[11px] font-semibold transition-colors cursor-pointer"
                  title="Mở Công thức Cockcroft-Gault và CKD-EPI trong Kho Công cụ"
                >
                  <span>🧮</span>
                  <span>Độ thanh thải Cockcroft-Gault</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenVaultDrawer?.(undefined, 'Insulin', 'CC')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-[11px] font-semibold transition-colors cursor-pointer"
                  title="Mở Phác đồ Insulin Sliding Scale trong Kho Công cụ"
                >
                  <span>💉</span>
                  <span>Insulin Sliding Scale</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenVaultDrawer?.(undefined, 'bẫy lỗi', 'ICD10')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 text-[11px] font-semibold transition-colors cursor-pointer"
                  title="Mở Sổ tay 50+ bẫy lỗi xuất toán BHYT trong Kho ICD-10"
                >
                  <span>🏷️</span>
                  <span>50+ Bẫy lỗi xuất toán BHYT</span>
                </button>
              </div>
            </div>

            {/* Safe Prescribing DDI & eGFR Sentinel Panel (Kho DUOC) */}
            <div className="mt-3">
              <SafePrescribingDdiPanel
                prescribedDrugNames={allPrescribedDrugNames}
                patientAge={form?.tuoi}
                patientGender={form?.gioiTinh}
                patientCreatinine={labs?.lCre}
                onOpenVaultDrawer={onOpenVaultDrawer}
              />
            </div>
          </CollapsibleProtocolSection>

          {/* Section 3: Phác đồ điều trị chi tiết từng ngày - Collapsible */}
          <CollapsibleProtocolSection
            id="procedures"
            isOpen={expandedSections.procedures}
            onToggle={() => toggleSection('procedures')}
            icon={
              <div className="w-7 h-7 rounded-md bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
            }
            title="3. Phác đồ điều trị chi tiết từng ngày"
            subtitle="Lộ trình can thiệp lâm sàng phân tầng theo từng giai đoạn ngày bệnh (gom nhóm các ngày có xử trí tương tự)"
            badgeText={`${timelinePhases.length} giai đoạn can thiệp`}
            badgeColor="bg-blue-100 text-blue-800 border-blue-200"
            containerClassName="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs"
          >
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider text-[11px]">
                    <th className="p-3 w-56 border-r border-slate-200">Giai đoạn & Mục tiêu</th>
                    <th className="p-3 border-r border-slate-200 min-w-[280px]">Y lệnh thuốc & Dịch truyền</th>
                    <th className="p-3 w-72 border-r border-slate-200">Cận lâm sàng & Giám sát</th>
                    <th className="p-3 w-72">Lưu ý & Tiêu chuẩn chuyển tầng / Ra viện</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {timelinePhases.map((phase, pIdx) => (
                    <tr key={phase.id || pIdx} className="hover:bg-slate-50/50 transition-colors align-top">
                      {/* Cột 1: Giai đoạn & Mục tiêu */}
                      <td className="p-3 border-r border-slate-200 bg-slate-50/30">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 rounded text-[11px] font-bold font-mono-custom bg-blue-100 text-blue-800 border border-blue-200">
                              {phase.dayRange}
                            </span>
                          </div>
                          <h5 className="font-bold text-xs text-slate-900 leading-snug">
                            {phase.phaseName}
                          </h5>
                          <div className="mt-1 p-2 bg-white rounded border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                            <span className="font-semibold text-slate-700">Đích lâm sàng: </span>
                            {phase.clinicalGoal}
                          </div>
                        </div>
                      </td>

                      {/* Cột 2: Y lệnh thuốc & Dịch truyền */}
                      <td className="p-3 border-r border-slate-200">
                        <div className="flex flex-col gap-2">
                          {phase.treatments.map((tr, tIdx) => (
                            <div
                              key={tIdx}
                              className={`p-2 rounded-md border text-xs leading-relaxed ${
                                tr.isHighlighted
                                  ? 'bg-amber-50/70 border-amber-300 text-amber-950 font-medium'
                                  : 'bg-white border-slate-200 text-slate-800'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-slate-100 text-slate-700 uppercase tracking-wide">
                                  {tr.category}
                                </span>
                              </div>
                              <div className="text-slate-800">{tr.content}</div>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Cột 3: Cận lâm sàng & Giám sát */}
                      <td className="p-3 border-r border-slate-200">
                        <div className="flex flex-col gap-1.5">
                          {phase.monitoring.map((m, mIdx) => (
                            <div key={mIdx} className="p-2 rounded border border-slate-200 bg-white text-xs">
                              <div className="font-semibold text-slate-800 flex items-center justify-between gap-1">
                                <span>{m.metric}</span>
                                <span className="text-[10px] font-mono-custom px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">
                                  {m.frequency}
                                </span>
                              </div>
                              {m.target && (
                                <div className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1">
                                  <span className="font-medium">🎯 Đích:</span>
                                  <span>{m.target}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Cột 4: Lưu ý & Tiêu chuẩn chuyển tầng / Ra viện */}
                      <td className="p-3">
                        <div className="flex flex-col gap-2">
                          {phase.cautionsAndDischarge.cautions.map((c, cIdx) => (
                            <div
                              key={cIdx}
                              className="p-2 rounded bg-rose-50/70 border border-rose-200 text-rose-900 text-[11px] leading-relaxed flex items-start gap-1.5"
                            >
                              <span className="font-bold text-rose-600 shrink-0">⚠</span>
                              <span>{c}</span>
                            </div>
                          ))}
                          {phase.cautionsAndDischarge.triageOrDischargeCriteria && (
                            <div className="p-2 rounded bg-emerald-50/80 border border-emerald-200 text-emerald-950 text-[11px] leading-relaxed">
                              <div className="font-bold text-emerald-800 uppercase text-[10px] mb-0.5">
                                Tiêu chuẩn ra viện / Chuyển tầng:
                              </div>
                              <div>{phase.cautionsAndDischarge.triageOrDischargeCriteria}</div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CollapsibleProtocolSection>

          {/* Section 4: Sàng Lọc & Xử Trí Biến Chứng Tích Cực (Complications Sentinel - Kho BC) - Collapsible */}
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
            {activeComplications.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeComplications.map((comp, cIdx) => {
                    const isChecked = activeComplicationIndices.has(cIdx);
                    return (
                      <div
                        key={cIdx}
                        className={`p-3.5 rounded-lg border transition-all flex flex-col justify-between ${
                          isChecked
                            ? 'bg-rose-50/80 border-rose-300 text-rose-950 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <label className="flex items-start gap-2 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleComplication(cIdx)}
                                className="mt-0.5 rounded text-rose-600 cursor-pointer"
                              />
                              <span className="font-bold text-xs sm:text-sm">{comp.name}</span>
                            </label>
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-100 text-slate-600 shrink-0 font-semibold">
                              {comp.timeframe === 'acute_24h' ? 'Cấp tính 24h' : 'Bán cấp 7 ngày'}
                            </span>
                          </div>

                          <div className="space-y-2.5 pl-6 text-xs">
                            {/* Dấu hiệu cảnh báo dạng Chips tương tác */}
                            <div>
                              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1 mb-1.5">
                                <AlertTriangle className="w-3 h-3 text-amber-500" />
                                <span>Dấu hiệu cảnh báo nhận diện:</span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {parseWarningSignsList(comp.warningSigns).map((sign, sIdx) => (
                                  <span
                                    key={sIdx}
                                    className={`px-2 py-0.5 rounded text-[11px] transition-all ${
                                      sign.isHighAlert
                                        ? 'bg-rose-100 text-rose-900 border border-rose-300 font-semibold shadow-2xs'
                                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                                    }`}
                                  >
                                    {sign.label}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Quy trình xử trí từng bước tương tác */}
                            <div>
                              <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1 mb-1.5">
                                <Zap className="w-3 h-3 text-blue-500" />
                                <span>Quy trình xử trí từng bước:</span>
                              </div>
                              <div className="space-y-1.5">
                                {parseActionStepsList(comp.preventiveAction).map((step, stIdx) => {
                                  const isFluid = step.category === 'fluid';
                                  const isResus = step.category === 'resus';
                                  const isDrug = step.category === 'drug';

                                  return (
                                    <div
                                      key={stIdx}
                                      className={`p-2 rounded-md border text-[11.5px] leading-relaxed flex items-start gap-2 transition-all ${
                                        isResus
                                          ? 'bg-blue-50/60 border-blue-200 text-blue-950'
                                          : isFluid
                                          ? 'bg-cyan-50/50 border-cyan-200 text-cyan-950'
                                          : isDrug
                                          ? 'bg-purple-50/50 border-purple-200 text-purple-950'
                                          : 'bg-slate-50 border-slate-200 text-slate-800'
                                      }`}
                                    >
                                      <span
                                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                                          isResus
                                            ? 'bg-blue-600 text-white'
                                            : isFluid
                                            ? 'bg-cyan-600 text-white'
                                            : isDrug
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-slate-600 text-white'
                                        }`}
                                      >
                                        {step.stepNum}
                                      </span>
                                      <div className="flex-1">{step.actionText}</div>
                                      {isResus && <Wind className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />}
                                      {isFluid && <Droplets className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />}
                                      {isDrug && <Pill className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>

                        {isChecked && (
                          <div className="mt-2.5 pt-2 border-t border-rose-200/80 flex flex-col gap-2">
                            <div className="bg-red-600 text-white rounded p-2 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
                              <AlertOctagon className="w-4 h-4 shrink-0" />
                              <span>LỆNH TRỰC: {comp.onCallAlertText}</span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleAddComplicationOrder(comp)}
                              className="self-start px-2.5 py-1 bg-white hover:bg-rose-100 text-rose-700 border border-rose-300 rounded text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                            >
                              <Plus className="w-3 h-3" />
                              <span>
                                {comp.orderSet && comp.orderSet.length > 0
                                  ? `⚡ Nạp trọn bộ Y Lệnh Cấp Cứu (${comp.orderSet.length} y lệnh)`
                                  : 'Nạp y lệnh xử trí biến chứng này vào đơn'}
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Tích hợp trực tiếp ComplicationSentinelPanel vào đây để tránh trùng lặp */}
                <div className="mt-3 pt-3 border-t border-rose-200">
                  <ComplicationSentinelPanel
                    diseaseId={currentDisease.id}
                    diseaseName={currentDisease.ten}
                    vitals={vitals}
                    labs={labs}
                    onAddPreventionOrder={handleAddPreventionOrder}
                    onOpenVaultDrawer={onOpenVaultDrawer}
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">Chưa phát hiện biến chứng cấp tính cần can thiệp khẩn.</p>
            )}
          </CollapsibleProtocolSection>

          {/* Section 5: Thang điểm lượng giá nguy cơ & Phân tầng xử trí - Collapsible */}
          <CollapsibleProtocolSection
            id="calculators"
            isOpen={expandedSections.calculators}
            onToggle={() => toggleSection('calculators')}
            icon={
              <div className="w-7 h-7 rounded-md bg-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Calculator className="w-4 h-4" />
              </div>
            }
            title="5. Thang điểm lượng giá nguy cơ & Phân tầng xử trí"
            subtitle="CURB-65, Killip và các công cụ tính toán lượng giá lâm sàng (Kho Công cụ - CC)"
            badgeText={`${diseaseTools.length + ((currentDisease.id.includes('phoi') || currentDisease.id.includes('nhiem_trung') || showCalculator) ? 1 : 0) + ((currentDisease.id.includes('tim') || currentDisease.nhom.includes('tim') || showCalculator) ? 1 : 0)} thang điểm & công cụ`}
            badgeColor="bg-indigo-100 text-indigo-800 border-indigo-200"
            containerClassName="bg-slate-50/80 border border-slate-200 rounded-xl p-4 shadow-2xs"
          >
            {/* CURB-65 Calculator for Pneumonia / Respiratory or General Sepsis */}
            {(currentDisease.id.includes('phoi') || currentDisease.id.includes('nhiem_trung') || showCalculator) && (
              <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs mb-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span>Thang điểm CURB-65 (Viêm phổi mắc phải cộng đồng):</span>
                    <span className="font-mono-custom px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded font-bold">
                      {curbScoreTotal} điểm
                    </span>
                  </span>
                  <span className="font-semibold text-slate-700">
                    Khuyến nghị:{' '}
                    <b
                      className={
                        curbScoreTotal >= 3
                          ? 'text-red-700'
                          : curbScoreTotal === 2
                          ? 'text-amber-700'
                          : 'text-emerald-700'
                      }
                    >
                      {curbScoreTotal >= 3
                        ? 'Nhập viện ICU / Khoa Hồi sức tích cực'
                        : curbScoreTotal === 2
                        ? 'Nhập viện Nội trú theo dõi sát'
                        : 'Điều trị ngoại trú an toàn'}
                    </b>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {[
                    { key: 'c', label: 'C - Rối loạn tri giác (Confusion)' },
                    { key: 'u', label: 'U - Ure > 7 mmol/L (Urea)' },
                    { key: 'r', label: 'R - Nhịp thở >= 30 l/p' },
                    { key: 'b', label: 'B - HA < 90/60 mmHg' },
                    { key: 'age', label: '65 - Tuổi >= 65' },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className={`p-2 rounded border flex items-center gap-2 cursor-pointer transition-colors ${
                        curbScores[item.key as keyof typeof curbScores]
                          ? 'bg-blue-50 border-blue-300 font-semibold text-blue-900'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={curbScores[item.key as keyof typeof curbScores]}
                        onChange={(e) =>
                          setCurbScores((prev) => ({
                            ...prev,
                            [item.key]: e.target.checked,
                          }))
                        }
                        className="rounded text-blue-600"
                      />
                      <span className="text-[11px] leading-tight">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Killip Classification for Acute MI / Cardiac */}
            {(currentDisease.id.includes('tim') || currentDisease.nhom.includes('tim') || showCalculator) && (
              <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span>Phân độ Killip (Suy tim trong Nhồi máu cơ tim cấp):</span>
                    <span className="font-mono-custom px-1.5 py-0.5 bg-rose-100 text-rose-800 rounded font-bold">
                      Độ {killipClass}
                    </span>
                  </span>
                  <span className="text-slate-600">
                    Tử vong 30 ngày ước tính:{' '}
                    <b className="text-rose-700">
                      {killipClass === 'I'
                        ? '6%'
                        : killipClass === 'II'
                        ? '17%'
                        : killipClass === 'III'
                        ? '38% (Phù phổi cấp)'
                        : '67–81% (Sốc tim)'}
                    </b>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { val: 'I', text: 'Độ I: Không có dấu suy tim lâm sàng' },
                    { val: 'II', text: 'Độ II: Ran ẩm < 50% phế trường, T3 gallop' },
                    { val: 'III', text: 'Độ III: Phù phổi cấp nặng, ran > 50%' },
                    { val: 'IV', text: 'Độ IV: Sốc tim (HA tụt, tưới máu kém)' },
                  ].map((k) => (
                    <button
                      key={k.val}
                      type="button"
                      onClick={() => setKillipClass(k.val as any)}
                      className={`p-2 rounded border text-left cursor-pointer transition-colors ${
                        killipClass === k.val
                          ? 'bg-rose-50 border-rose-300 text-rose-900 font-bold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="font-bold font-mono-custom">Killip {k.val}</div>
                      <div className="text-[10px] text-slate-500">{k.text}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specialized Clinical Tools from Kho CC */}
            <div className="mt-3 pt-2.5 border-t border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Thang điểm & Công cụ lâm sàng tương thích (Kho Công cụ - CC):</span>
                </span>
                <button
                  type="button"
                  onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'CC')}
                  className="text-[11px] font-semibold text-blue-600 hover:underline cursor-pointer"
                >
                  Xem tất cả 19 công cụ lâm sàng →
                </button>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {diseaseTools.length > 0 ? (
                  diseaseTools.map((tool) => (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => onOpenVaultDrawer?.(undefined, tool.title, 'CC')}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 text-xs font-semibold transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                      title={tool.snippet}
                    >
                      <span>🧮</span>
                      <span>{tool.title}</span>
                      <span className="text-[10px] text-amber-600 font-mono-custom font-normal">
                        · {tool.readTime}
                      </span>
                    </button>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 italic">
                    Chưa có công cụ riêng trong Kho CC cho bệnh lý này.
                  </span>
                )}
              </div>
            </div>
          </CollapsibleProtocolSection>

          {/* Section 6: Chỉ tiêu theo dõi, mục tiêu lâm sàng & Cảnh báo an toàn - Collapsible */}
          <CollapsibleProtocolSection
            id="monitoring"
            isOpen={expandedSections.monitoring}
            onToggle={() => toggleSection('monitoring')}
            icon={
              <div className="w-7 h-7 rounded-md bg-amber-500 text-white flex items-center justify-center shadow-xs shrink-0">
                <Activity className="w-4 h-4" />
              </div>
            }
            title="6. Chỉ tiêu theo dõi, mục tiêu lâm sàng & Cảnh báo an toàn"
            subtitle="Các mốc sinh hiệu cần giám sát, tiêu chuẩn cải thiện và cảnh báo chống chỉ định quan trọng"
            badgeText={`${phacDo.theoDoi.length} chỉ tiêu · ${phacDo.luuY.length} lưu ý`}
            badgeColor="bg-amber-100 text-amber-800 border-amber-200"
            containerClassName="bg-amber-50/30 border border-amber-200/80 rounded-xl p-4 shadow-2xs"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Theo dõi */}
              <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-3.5">
                <h4 className="font-display font-bold text-xs sm:text-sm text-blue-900 flex items-center gap-2 mb-2.5">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>Chỉ tiêu theo dõi & Mục tiêu lâm sàng</span>
                </h4>
                <div className="flex flex-col gap-1.5 text-xs text-slate-800">
                  {phacDo.theoDoi.map((item, idx) => {
                    const key = `theodoi-${currentDisease.id}-g${selectedGradeIdx}-${idx}`;
                    const isChecked = checkedOrders.has(key);
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleOrder(key)}
                        className={`p-2 rounded-md border flex items-start gap-2.5 cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                            : 'bg-white border-blue-100 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="mt-0.5 rounded text-blue-600 cursor-pointer"
                        />
                        <span className={isChecked ? 'line-through text-slate-400' : ''}>
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Lưu ý & Cảnh báo */}
              <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-3.5">
                <h4 className="font-display font-bold text-xs sm:text-sm text-amber-900 flex items-center gap-2 mb-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>Cảnh báo an toàn, chống chỉ định & Lưu ý đặc biệt</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-800">
                  {phacDo.luuY.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-white/70 p-2 rounded border border-amber-100">
                      <span className="text-amber-600 font-bold shrink-0 mt-0.5">⚠</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CollapsibleProtocolSection>

          {/* Section 7: Tư vấn người bệnh & Tờ rơi dặn dò (Kho TV) - Collapsible */}
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

          {/* Section 8: Bằng chứng Y học Chứng cứ & Hướng Dẫn Điều Trị EBM - Collapsible */}
          <CollapsibleProtocolSection
            id="ebm"
            isOpen={expandedSections.ebm}
            onToggle={() => toggleSection('ebm')}
            icon={
              <div className="w-7 h-7 rounded-md bg-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
            }
            title="8. Khuyến cáo điều trị EBM & Chuỗi Bệnh Học Đa Chiều (Knowledge Vault)"
            subtitle="Khuyến cáo Bộ Y Tế, Hội chuyên khoa quốc tế (ESC, AHA, IDSA) & chuỗi bài học trong 18 Kho tri thức"
            badgeText={`${matchedGuidelines.length} khuyến cáo EBM · 6 phân hệ`}
            badgeColor="bg-indigo-100 text-indigo-800 border-indigo-200"
            containerClassName="bg-indigo-50/30 border border-indigo-200/80 rounded-xl p-4 shadow-2xs"
          >
            <div className="space-y-4">
              {/* Knowledge Vault Pathways Header & Facets */}
              <div className="bg-gradient-to-br from-indigo-50/70 via-blue-50/40 to-slate-50 border border-indigo-200 rounded-lg p-4 sm:p-5 flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-md bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-indigo-950 flex items-center gap-2">
                        <span>Chuỗi Bệnh Học Đa Chiều (Knowledge Vault Facets)</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-100 text-indigo-700 font-semibold border border-indigo-200">
                          2.400+ EBM
                        </span>
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Kết nối trực tiếp bài viết chuyên sâu đối ứng trong 18 Kho tri thức CliniPortal
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenVaultDrawer?.(currentDisease.ten, currentDisease.icd)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-md shadow-xs transition-colors cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Tra cứu trong Vault Drawer</span>
                  </button>
                </div>

                {/* Pathway facets grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
                  {/* 1. GP & Sinh lý */}
                  <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-sky-600 mb-1 flex items-center gap-1">
                        <HeartPulse className="w-3 h-3" />
                        1. GP & Sinh lý
                      </div>
                      <div className="text-xs font-bold text-slate-800 line-clamp-1">
                        {pathway.gpsl?.title || `Giải phẫu sinh lý ${currentDisease.ten}`}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                        {pathway.gpsl?.snippet || 'Cơ sở sinh học, tuần hoàn & cấu trúc giải phẫu liên quan.'}
                      </p>
                    </div>
                    {pathway.gpsl ? (
                      <a
                        href={getKnowledgeVaultWebUrl(pathway.gpsl.id)}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1 self-start"
                      >
                        <span>Đọc bài viết</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <button
                        onClick={() => onOpenVaultDrawer?.(currentDisease.ten, 'GPSL')}
                        className="mt-2 text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 self-start cursor-pointer"
                      >
                        <span>Tìm trong Kho GPSL</span>
                        <Search className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* 2. Sinh lý bệnh */}
                  <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-1 flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        2. Sinh lý bệnh
                      </div>
                      <div className="text-xs font-bold text-slate-800 line-clamp-1">
                        {pathway.slb?.title || `Cơ chế bệnh sinh ${currentDisease.ten}`}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                        {pathway.slb?.snippet || 'Rối loạn tế bào học, phản ứng viêm và tiến triển mô học.'}
                      </p>
                    </div>
                    {pathway.slb ? (
                      <a
                        href={getKnowledgeVaultWebUrl(pathway.slb.id)}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1 self-start"
                      >
                        <span>Đọc bài viết</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <button
                        onClick={() => onOpenVaultDrawer?.(currentDisease.ten, 'SLB')}
                        className="mt-2 text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 self-start cursor-pointer"
                      >
                        <span>Tìm trong Kho SLB</span>
                        <Search className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* 3. Tiêu chuẩn chẩn đoán */}
                  <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-pink-600 mb-1 flex items-center gap-1">
                        <ClipboardCheck className="w-3 h-3" />
                        3. Tiêu chuẩn chẩn đoán
                      </div>
                      <div className="text-xs font-bold text-slate-800 line-clamp-1">
                        {pathway.cd?.title || `Tiêu chuẩn xác định ${currentDisease.ten}`}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                        {pathway.cd?.snippet || 'Bộ tiêu chuẩn chẩn đoán quốc tế xác lập ngưỡng xác chẩn.'}
                      </p>
                    </div>
                    {pathway.cd ? (
                      <a
                        href={getKnowledgeVaultWebUrl(pathway.cd.id)}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1 self-start"
                      >
                        <span>Đọc bài viết</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <button
                        onClick={() => onOpenVaultDrawer?.(currentDisease.ten, 'CD')}
                        className="mt-2 text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 self-start cursor-pointer"
                      >
                        <span>Tìm trong Kho CD</span>
                        <Search className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* 4. Dược lâm sàng */}
                  <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 mb-1 flex items-center gap-1">
                        <Pill className="w-3 h-3" />
                        4. Dược lý & Liều dùng
                      </div>
                      <div className="text-xs font-bold text-slate-800 line-clamp-1">
                        {pathway.duoc?.title || `Dược điều trị ${currentDisease.ten}`}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                        {pathway.duoc?.snippet || 'Cơ chế tác động thuốc, chuyển hóa gan/thận & tương tác.'}
                      </p>
                    </div>
                    {pathway.duoc ? (
                      <a
                        href={getKnowledgeVaultWebUrl(pathway.duoc.id)}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1 self-start"
                      >
                        <span>Đọc bài viết</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <button
                        onClick={() => onOpenVaultDrawer?.(currentDisease.ten, 'DUOC')}
                        className="mt-2 text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 self-start cursor-pointer"
                      >
                        <span>Tìm trong Kho Dược</span>
                        <Search className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* 5. Biến chứng */}
                  <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-rose-600 mb-1 flex items-center gap-1">
                        <AlertOctagon className="w-3 h-3" />
                        5. Biến chứng nguy cơ
                      </div>
                      <div className="text-xs font-bold text-slate-800 line-clamp-1">
                        {pathway.bc?.title || `Biến chứng cấp tính ${currentDisease.ten}`}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                        {pathway.bc?.snippet || 'Dấu hiệu biến chứng 24-48 giờ đầu và phòng ngừa tử vong.'}
                      </p>
                    </div>
                    {pathway.bc ? (
                      <a
                        href={getKnowledgeVaultWebUrl(pathway.bc.id)}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1 self-start"
                      >
                        <span>Đọc bài viết</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <button
                        onClick={() => onOpenVaultDrawer?.(currentDisease.ten, 'BC')}
                        className="mt-2 text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 self-start cursor-pointer"
                      >
                        <span>Tìm trong Kho Biến chứng</span>
                        <Search className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* 6. NCKH & EBM Guidelines */}
                  <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-rose-600 mb-1 flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        6. EBM Guidelines
                      </div>
                      <div className="text-xs font-bold text-slate-800 line-clamp-1">
                        {matchedGuidelines.length > 0
                          ? matchedGuidelines[0].study.title
                          : `Khuyến cáo EBM ${currentDisease.ten}`}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                        {matchedGuidelines.length > 0
                          ? (matchedGuidelines[0].study.keyResults || matchedGuidelines[0].study.summary)
                          : 'Hướng dẫn điều trị chuẩn hóa theo Bộ Y Tế và Hội chuyên khoa quốc tế.'}
                      </p>
                    </div>
                    {matchedGuidelines.length > 0 ? (
                      <div className="mt-2 flex items-center justify-between gap-1 flex-wrap">
                        <a
                          href={getGuidelineWebUrl(matchedGuidelines[0].study)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] font-semibold text-rose-600 hover:underline flex items-center gap-1"
                        >
                          <span>Đọc Guideline</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        {matchedGuidelines.length > 1 && (
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                            +{matchedGuidelines.length - 1} khác
                          </span>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={() => onOpenVaultDrawer?.(currentDisease.ten, 'EBM')}
                        className="mt-2 text-[11px] font-semibold text-indigo-600 hover:underline flex items-center gap-1 self-start cursor-pointer"
                      >
                        <span>Tìm trong Kho Guidelines</span>
                        <Search className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Official Guidelines Cards */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-4 sm:p-5 shadow-sm border border-slate-700/80 flex flex-col gap-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-display font-bold text-sm sm:text-base text-white tracking-tight">
                          Khuyến Cáo & Hướng Dẫn Điều Trị EBM Chính Thức
                        </h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-300 font-bold border border-red-500/30">
                          {matchedGuidelines.length} Khuyến Cáo Khớp
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Chuẩn hóa theo Văn bản Quyết định Bộ Y Tế Việt Nam & Hội Chuyên Khoa Quốc Tế (ESC, AHA, IDSA, KDIGO)
                      </p>
                    </div>
                  </div>

                  <a
                    href="../ebm/guidelines/guidelines.html"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white font-medium text-xs rounded-md transition-colors"
                  >
                    <span>Mở Chuyên Trang Guidelines</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {matchedGuidelines.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-1">
                    {matchedGuidelines.map(({ study, matchReason }) => {
                      return (
                        <div
                          key={study.id}
                          className="bg-slate-800/90 border border-slate-700 rounded-lg p-3.5 flex flex-col justify-between hover:border-slate-600 transition-colors gap-2.5"
                        >
                          <div>
                            {/* Header badges */}
                            <div className="flex flex-wrap items-center gap-1.5 mb-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-red-950/60 text-red-300 border-red-800/60">
                                {study.organization} ({study.year})
                              </span>
                              {study.impact === 'practice-changing' && (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                  Practice-Changing
                                </span>
                              )}
                              <span className="text-[10px] text-slate-400 font-mono">
                                ICD: {study.icd10Codes.join(', ')}
                              </span>
                            </div>

                            {/* Study Title */}
                            <h5 className="font-bold text-xs sm:text-sm text-slate-100 leading-snug line-clamp-2 mb-1.5">
                              {study.title}
                            </h5>

                            {/* Key Results / Landmark Evidence */}
                            <div className="bg-slate-900/60 rounded p-2 text-[11px] text-slate-300 border border-slate-800 mb-2 leading-relaxed">
                              <strong className="text-amber-400 font-semibold block mb-0.5">
                                Kết quả then chốt & Khuyến cáo:
                              </strong>
                              <p className="line-clamp-3">{study.keyResults || study.summary}</p>
                            </div>

                            {/* Recommended Drugs Chips */}
                            {study.drug && (
                              <div className="text-[11px] text-slate-400">
                                <span className="text-slate-400 font-medium">Thuốc khuyến cáo: </span>
                                <span className="text-slate-200 font-mono text-[10.5px]">
                                  {study.drug.split(',').slice(0, 4).join(', ')}
                                  {study.drug.split(',').length > 4 ? '...' : ''}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-700/60 mt-1">
                            <span className="text-[10px] text-slate-400 italic line-clamp-1">
                              {matchReason}
                            </span>
                            <div className="flex items-center gap-2">
                              {study.drug && (
                                <button
                                  type="button"
                                  onClick={() => handleApplyGuidelineDrugs(study)}
                                  className="px-2.5 py-1 text-[11px] font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800/80 rounded transition-colors flex items-center gap-1 cursor-pointer"
                                  title="Thêm các thuốc từ Guideline này vào danh mục y lệnh bệnh án"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>Nạp vào đơn thuốc</span>
                                </button>
                              )}
                              <a
                                href={getGuidelineWebUrl(study)}
                                target="_blank"
                                rel="noreferrer"
                                className="px-2.5 py-1 text-[11px] font-semibold text-blue-300 bg-blue-950/60 hover:bg-blue-900/80 border border-blue-800/80 rounded transition-colors flex items-center gap-1"
                              >
                                <span>Đọc toàn văn</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-3 bg-slate-800/60 rounded-lg text-center text-xs text-slate-400">
                    <span>Chưa có văn bản khuyến cáo đặc thù khớp chính xác cho mặt bệnh này. </span>
                    <a
                      href="../ebm/guidelines/guidelines.html"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:underline font-semibold ml-1"
                    >
                      Tra cứu trong 78+ Guidelines Kho EBM &rarr;
                    </a>
                  </div>
                )}
              </div>
            </div>
          </CollapsibleProtocolSection>

          {/* Section 9: Ca Bệnh Lâm Sàng Thực Chiến & Hội Chẩn AI (SOAP Cases) - Collapsible */}
          <CollapsibleProtocolSection
            id="soap"
            isOpen={expandedSections.soap}
            onToggle={() => toggleSection('soap')}
            icon={
              <div className="w-7 h-7 rounded-md bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
            }
            title="9. Ca Bệnh Lâm Sàng Thực Chiến & Hội Chẩn AI (SOAP Cases)"
            subtitle="Tham khảo ca bệnh thực tế tương tự, bẫy chẩn đoán và tạo prompt hội chẩn NotebookLM"
            badgeText={`${similarSoapCases.length} ca bệnh phù hợp`}
            badgeColor="bg-emerald-100 text-emerald-800 border-emerald-200"
            containerClassName="bg-white border border-emerald-200/80 rounded-xl p-4 shadow-2xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-100 pb-3 mb-3">
              <div>
                <p className="text-[11px] text-slate-500">
                  Tham khảo ca bệnh điển hình, bẫy chẩn đoán và đơn thuốc thực tế liên quan đến {currentDisease.ten}
                </p>
              </div>

              {onOpenPromptBuilder && (
                <button
                  type="button"
                  onClick={() => onOpenPromptBuilder(currentDisease.ten)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 font-medium text-xs rounded-md transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tạo prompt NotebookLM cho bệnh này</span>
                </button>
              )}
            </div>

            {similarSoapCases.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {similarSoapCases.map((sc) => (
                  <div
                    key={sc.id}
                    className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-emerald-300 transition-colors gap-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {sc.specialty}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          ICD-10: {sc.a.icd10}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 leading-snug">
                        {sc.title}
                      </h5>
                      <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">
                        <b>Bối cảnh:</b> {sc.demographicContext}
                      </p>
                      <div className="mt-2 text-[11px] bg-white p-2 rounded-lg border border-slate-200/80 space-y-1">
                        <div className="text-slate-700 line-clamp-1">
                          <b>S (Lý do):</b> {sc.s.chiefComplaint}
                        </div>
                        <div className="text-slate-700 line-clamp-1">
                          <b>P (Xử trí):</b> {sc.p.immediateActions}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                      <span className="text-[10.5px] text-slate-500 italic">
                        Đúc kết: {sc.authorDoctor || 'Hội đồng Khoa học'}
                      </span>
                      {onNavigateToSoapCase ? (
                        <button
                          type="button"
                          onClick={() => onNavigateToSoapCase(sc.id)}
                          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <span>Xem ca bệnh</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onOpenVaultDrawer?.(sc.title, sc.title, 'BA')}
                          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <span>Xem trong Drawer</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 px-4 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 space-y-2">
                <p className="text-xs text-slate-500">
                  Chưa có ca bệnh thực chiến riêng cho <b>{currentDisease.ten}</b> trong Kho Bệnh án (BA).
                </p>
                {onOpenPromptBuilder && (
                  <button
                    type="button"
                    onClick={() => onOpenPromptBuilder(currentDisease.ten)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Dùng Prompt Builder để tạo ca mới từ NotebookLM</span>
                  </button>
                )}
              </div>
            )}
          </CollapsibleProtocolSection>

          {/* Bottom Action Controls & Storage Integration */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 flex-wrap">


              <button
                id="btn-print-protocol-report"
                onClick={onPrintReport}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs rounded-md cursor-pointer transition-colors shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>In hồ sơ bệnh án & y lệnh</span>
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
