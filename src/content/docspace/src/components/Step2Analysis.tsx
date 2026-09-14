import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  Award,
  Baby,
  BookOpen,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  ClipboardCopy,
  Clock,
  Columns3,
  FileCheck,
  Filter,
  Flame,
  FlaskConical,
  HeartPulse,
  Layers,
  ListTree,
  MapPin,
  Pill,
  Printer,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  Zap,
} from 'lucide-react';
import {
  AnalysisResult,
  ClinicalFormState,
  EpidemiologyContext,
  KnowledgeBase,
  LabsState,
  ProblemStatementEntry,
  VitalsState,
} from '../types.ts';
import { ROLE_LABELS } from '../data/seedData.ts';
import {
  calculateClinicalRiskScore,
  ClinicalRiskScore,
  calculatePewsScore,
  PewsScoreResult,
  calculateEsiTriage,
  EsiScoreResult,
} from '../lib/riskScore.ts';
import {
  getCdssForCondition,
  getIcd10Guidance,
  getKnowledgeVaultWebUrl,
  getToolsForDisease,
  VaultArticle,
} from '../lib/vaultBridge.ts';
import {
  DIAGNOSTIC_CHAIN_DATABASE,
  DiseaseReactionChainDefinition,
  SeverityGradingItem,
  DiseaseComplicationItem,
  DiagnosticCriterionItem,
} from '../../data/diagnostic-criteria-database.ts';

interface Step2Props {
  kb: KnowledgeBase;
  results: AnalysisResult[];
  selectedCount: number;
  derivedCount: number;
  negatedCount: number;
  onGoToProtocol: (diseaseId: string, options?: { gradeIdx?: number; complicationId?: string }) => void;
  onSaveToPostgres: () => void;
  onPrintReport: () => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
  vitals?: VitalsState;
  labs?: LabsState;
  form?: ClinicalFormState;
  primaryProblem?: ProblemStatementEntry;
  problems?: ProblemStatementEntry[];
  epiContext?: EpidemiologyContext;
}

interface ParsedCriterionItem {
  num?: string;
  label?: string;
  title?: string;
  text: string;
  subItems?: string[];
  type?: 'clinical' | 'lab' | 'safety' | 'care' | 'warning' | 'risk' | 'danger' | 'general';
}

interface ParsedCriteriaResult {
  intro: string;
  items: ParsedCriterionItem[];
  note: string;
}

function splitRespectingParens(str: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = '';
  let depth = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (char === '(' || char === '[' || char === '{') depth++;
    else if (char === ')' || char === ']' || char === '}') depth--;
    if (char === delimiter && depth === 0) {
      if (current.trim()) result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim()) result.push(current.trim());
  return result;
}

function parseSeverityCriteria(criteriaText: string, severity: string = 'mild'): ParsedCriteriaResult {
  if (!criteriaText) return { intro: '', items: [], note: '' };

  // 1. Phân tích cú pháp dạng các khối ngoặc vuông [Phân mục]: Nội dung (chuẩn Enriched CDSS Vault)
  if (criteriaText.includes('[') && criteriaText.includes(']:')) {
    const firstBracketIdx = criteriaText.indexOf('[');
    let intro = firstBracketIdx > 0 ? criteriaText.slice(0, firstBracketIdx).trim() : '';
    if (!intro) {
      if (severity === 'critical' || severity === 'severe') {
        intro = 'Bệnh nhân có ít nhất 1 biểu hiện tổn thương đa tạng hoặc đe dọa sinh mạng:';
      } else if (severity === 'moderate') {
        intro = 'Bệnh nhân xuất hiện ít nhất 1 biểu hiện lâm sàng, cận lâm sàng hoặc dấu hiệu cảnh báo:';
      } else {
        intro = 'Thỏa mãn đồng thời các tiêu chí lâm sàng, cận lâm sàng & loại trừ nguy cơ:';
      }
    }

    const bracketRegex = /\[([^\]]+)\]:\s*([\s\S]*?)(?=\s*\[[^\]]+\]:|$)/g;
    const items: ParsedCriterionItem[] = [];
    let note = '';
    let match: RegExpExecArray | null;

    while ((match = bracketRegex.exec(criteriaText)) !== null) {
      const tag = match[1].trim();
      const content = match[2].trim().replace(/;$/, '');
      const lowerTag = tag.toLowerCase();

      let type: ParsedCriterionItem['type'] = 'general';
      if (
        lowerTag.includes('đe dọa') ||
        lowerTag.includes('tối cấp') ||
        lowerTag.includes('tử vong') ||
        lowerTag.includes('nguy kịch')
      ) {
        type = 'danger';
      } else if (
        lowerTag.includes('cảnh báo') ||
        lowerTag.includes('nguy cơ') ||
        lowerTag.includes('tiên lượng')
      ) {
        type = 'warning';
      } else if (
        lowerTag.includes('an toàn') ||
        lowerTag.includes('loại trừ') ||
        lowerTag.includes('ngoại trú an toàn')
      ) {
        type = 'safety';
      } else if (
        lowerTag.includes('ngoại trú') ||
        lowerTag.includes('chăm sóc') ||
        lowerTag.includes('điều kiện')
      ) {
        type = 'care';
      } else if (
        lowerTag.includes('cận lâm sàng') ||
        lowerTag.includes('xét nghiệm') ||
        lowerTag.includes('dnt') ||
        lowerTag.includes('sinh hóa') ||
        lowerTag.includes('hình ảnh')
      ) {
        type = 'lab';
      } else if (lowerTag.includes('lâm sàng') || lowerTag.includes('triệu chứng')) {
        type = severity === 'critical' || severity === 'severe' ? 'danger' : 'clinical';
      }

      // Kiểm tra xem trong nội dung có chia nhỏ các vấn đề (tiêu chí con) không
      let title = '';
      let subItems: string[] | undefined = undefined;
      const colonMatch = content.match(/^([^:()]{4,40}):\s*(.+)$/);
      if (colonMatch && (colonMatch[2].includes(',') || colonMatch[2].includes(';'))) {
        const potentialSub = splitRespectingParens(colonMatch[2], colonMatch[2].includes(';') ? ';' : ',');
        if (potentialSub.length >= 2) {
          title = colonMatch[1].trim();
          subItems = potentialSub.map((s) => s.trim().replace(/^;\s*/, ''));
        }
      } else if (content.includes('; HOẶC ') || content.includes('; hoặc ')) {
        const potentialSub = splitRespectingParens(content, ';');
        if (potentialSub.length >= 2) {
          subItems = potentialSub.map((s) => s.trim());
        }
      }

      items.push({
        label: tag,
        title,
        text: subItems ? '' : content,
        subItems,
        type,
      });
    }

    return { intro, items, note };
  }

  // 2. Kiểm tra mẫu có đánh số (1), (2), (3)... (như Dấu hiệu cảnh báo hoặc Biểu hiện nặng SXHD)
  if (criteriaText.includes('(1)')) {
    const introMatch = criteriaText.match(/^(.*?):\s*(?=\(1\))/);
    const intro = introMatch ? introMatch[1].trim() : 'Tiêu chuẩn phân độ lâm sàng:';
    const body = introMatch ? criteriaText.slice(introMatch[0].length) : criteriaText;

    const parts = body.split(/(?=\(\d+\))/).map((s) => s.trim()).filter(Boolean);
    let note = '';
    const cleanItems: ParsedCriterionItem[] = [];

    parts.forEach((part) => {
      const numMatch = part.match(/^\((\d+)\)\s*(.*)$/s);
      if (numMatch) {
        const num = numMatch[1];
        const content = numMatch[2].trim().replace(/;$/, '');
        if (content.includes('; hoặc ') || content.includes('hoặc có cơ địa')) {
          const splitNote = content.split(/;\s*(?=hoặc\b)|(?=hoặc có cơ địa)/i);
          cleanItems.push({ num, text: splitNote[0].trim(), type: 'general' });
          if (splitNote[1]) note = splitNote[1].trim().replace(/;$/, '');
        } else {
          cleanItems.push({ num, text: content, type: 'general' });
        }
      } else if (part.startsWith('hoặc') || part.startsWith('; hoặc')) {
        note = part.replace(/^;\s*/, '').trim();
      }
    });

    return { intro, items: cleanItems, note };
  }

  // 3. Kiểm tra mẫu thể nhẹ SXHD hoặc các thể nhẹ không cảnh báo
  if (criteriaText.toLowerCase().includes('không có dấu hiệu cảnh báo')) {
    return {
      intro: 'Thỏa mãn đồng thời các tiêu chí lâm sàng, cận lâm sàng & loại trừ cảnh báo:',
      items: [
        {
          label: 'Lâm sàng',
          text: 'Sốt cao đột ngột ≤ 7 ngày kèm ít nhất 2 triệu chứng nhẹ (nhức đầu, đau hố mắt, đau cơ khớp, phát ban, Lacet (+))',
          type: 'clinical',
        },
        {
          label: 'Cận lâm sàng',
          text: 'Hematocrit (Hct) bình thường hoặc tăng nhẹ; Tiểu cầu ≥ 100 G/L',
          type: 'lab',
        },
        {
          label: 'Tiêu chuẩn an toàn',
          text: 'KHÔNG có dấu hiệu cảnh báo; KHÔNG có tụt HA, sốc hay thoát dịch',
          type: 'safety',
        },
        {
          label: 'Điều kiện ngoại trú',
          text: 'Người bệnh uống được nhiều nước, tự chăm sóc được tại nhà',
          type: 'care',
        },
      ],
      note: '',
    };
  }

  // 4. Fallback cho các phân độ khác: tách theo dấu chấm phẩy hoặc dấu chấm câu
  const rawParts = criteriaText
    .split(/;\s*|\.\s+(?=[A-ZÀ-Ỹ0-9])/)
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    intro: 'Tiêu chuẩn đối chiếu lâm sàng & cận lâm sàng:',
    items: rawParts.map((t, i) => ({
      num: String(i + 1),
      text: t,
      type: 'general',
    })),
    note: '',
  };
}

interface CleanAuthorityBadge {
  name: string;
  badge: string;
  org: string;
  year?: string;
}

function extractCleanAuthorities(criteria: DiagnosticCriterionItem[] = []): CleanAuthorityBadge[] {
  const result: CleanAuthorityBadge[] = [];
  const seen = new Set<string>();

  criteria.forEach((c) => {
    if (!c.sourceGuideline) return;
    const parts = c.sourceGuideline.split(/[\/&;]\s*/);
    parts.forEach((part) => {
      const p = part.trim();
      if (!p || /pdf|fmicb|pntd|GRADE|Strong|Review|Journal|Hướng dẫn chẩn đoán$/i.test(p)) return;

      const yearMatch = p.match(/\b(20\d\d|19\d\d)\b/);
      const year = yearMatch ? yearMatch[1] : '';

      let org = '';
      let badge = '';

      if (/WHO|World Health/i.test(p)) {
        org = 'WHO';
        badge = `WHO (${year || 'Toàn cầu'})`;
      } else if (/Bộ Y Tế|QĐ-BYT|Quyết định/i.test(p)) {
        org = 'Bộ Y Tế';
        badge = `Bộ Y Tế Việt Nam (${year || 'CPG'})`;
      } else if (/CDC|ACIP/i.test(p)) {
        org = 'CDC';
        badge = `CDC Hoa Kỳ (${year || 'CPG'})`;
      } else if (/EASL/i.test(p)) {
        org = 'EASL';
        badge = `EASL Châu Âu (${year || '2025'})`;
      } else if (/AASLD/i.test(p)) {
        org = 'AASLD';
        badge = `AASLD Hoa Kỳ (${year || '2025'})`;
      } else if (/APASL/i.test(p)) {
        org = 'APASL';
        badge = `APASL Châu Á (${year || '2026'})`;
      } else if (/NICE/i.test(p)) {
        org = 'NICE';
        badge = `NICE Anh Quốc (${year || '2024'})`;
      } else if (/IDSA/i.test(p)) {
        org = 'IDSA';
        badge = `IDSA Hoa Kỳ (${year || 'CPG'})`;
      } else if (/UKHSA/i.test(p)) {
        org = 'UKHSA';
        badge = `UKHSA Anh Quốc (${year || '2024'})`;
      } else if (/NCDC/i.test(p)) {
        org = 'NCDC';
        badge = `NCDC (${year || '2015'})`;
      } else if (/PIDSP|PPS/i.test(p)) {
        org = 'PPS-PIDSP';
        badge = `PPS-PIDSP (${year || '2019'})`;
      } else if (/ESCMID/i.test(p)) {
        org = 'ESCMID';
        badge = `ESCMID Châu Âu (${year || '2016'})`;
      } else if (year) {
        org = p.replace(/\s*\(?\b(20\d\d|19\d\d)\b\)?/, '').trim();
        badge = p;
      }

      if (badge && !seen.has(badge)) {
        seen.add(badge);
        result.push({
          name: org || badge,
          badge,
          org: org || badge,
          year,
        });
      }
    });
  });

  const hasSpecificYear = new Set(result.filter((r) => r.year).map((r) => r.org));
  return result.filter((r) => !(r.badge.includes('(CPG)') && hasSpecificYear.has(r.org)));
}

function formatGuidelineCitation(source?: string): string {
  if (!source) return '';
  let clean = source
    .replace(/tải xuống\.pdf Systematic Review\s*&?/i, '')
    .replace(/fmicb-[^\s&/]+/i, '')
    .replace(/pntd\.[^\s&/]+/i, '')
    .replace(/\(GRADE Very Low\/Strong\)/i, '')
    .trim();
  clean = clean.replace(/^[&/]\s*|\s*[&/]$/, '').trim();
  return clean;
}

export const Step2Analysis: React.FC<Step2Props> = ({
  kb,
  results,
  selectedCount,
  derivedCount,
  negatedCount,
  onGoToProtocol,
  onSaveToPostgres,
  onPrintReport,
  onOpenVaultDrawer,
  vitals,
  labs,
  form,
  primaryProblem,
  problems = [],
  epiContext,
}) => {
  const [expandedDiffs, setExpandedDiffs] = useState<Record<string, boolean>>({});
  const [diffFilter, setDiffFilter] = useState<'all' | 'alert' | 'high'>('all');
  const [searchDiff, setSearchDiff] = useState('');
  const [showMatrix, setShowMatrix] = useState(false);
  const [showScoreBreakdown, setShowScoreBreakdown] = useState(false);
  const [copiedReasoning, setCopiedReasoning] = useState(false);
  const [isProblemsBoardExpanded, setIsProblemsBoardExpanded] = useState(true);

  // Phân tầng 3 mức độ ưu tiên theo chuẩn phương pháp luận PGS.TS Hoàng Văn Sĩ
  const tier1Problems = useMemo(
    () => problems.filter((p) => p.priorityLevel === 'life-threatening'),
    [problems]
  );
  const tier2Problems = useMemo(
    () =>
      problems.filter(
        (p) => p.priorityLevel === 'acute' || (!p.priorityLevel && p.isPrimary)
      ),
    [problems]
  );
  const tier3Problems = useMemo(
    () => problems.filter((p) => p.priorityLevel === 'chronic'),
    [problems]
  );
  const conflictList = useMemo(
    () =>
      problems.filter((p) => p.conflictNotes && p.conflictNotes.trim().length > 0),
    [problems]
  );

  const toggleExpand = (id: string) => {
    setExpandedDiffs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const top = results && results.length > 0 ? results[0] : null;

  // Match full chain from DIAGNOSTIC_CHAIN_DATABASE (Enriched CDSS + Kho Chẩn Đoán)
  const activeChain: DiseaseReactionChainDefinition | undefined = useMemo(() => {
    if (!top) return undefined;
    if (DIAGNOSTIC_CHAIN_DATABASE[top.b.id]) {
      return DIAGNOSTIC_CHAIN_DATABASE[top.b.id];
    }
    const cleanName = top.b.ten.toLowerCase().trim();
    const cleanIcd = top.b.icd.toUpperCase().trim();
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
  }, [top]);

  // Danh sách các tổ chức & năm ban hành tiêu chuẩn chuẩn hóa (WHO, Bộ Y Tế, CDC, EASL...)
  const authorities = useMemo(() => {
    return extractCleanAuthorities(activeChain?.criteria || []);
  }, [activeChain]);

  // Đánh giá mức độ thỏa mãn bộ tiêu chuẩn chẩn đoán theo thời gian thực
  const criteriaFulfillment = useMemo(() => {
    if (!activeChain?.criteria || !top) return null;

    const mandatoryCriteria = activeChain.criteria.filter((c) => c.type === 'mandatory');
    const majorCriteria = activeChain.criteria.filter((c) => c.type === 'major');
    const labCriteria = activeChain.criteria.filter((c) => c.type === 'lab' || c.type === 'imaging');

    const isItemMatched = (crit: DiagnosticCriterionItem) => {
      return (
        top.matched.some(
          (m) =>
            m.tc.id === crit.id ||
            crit.label.toLowerCase().includes(m.tc.ten.toLowerCase()) ||
            m.tc.ten.toLowerCase().includes(crit.label.toLowerCase())
        ) || (crit.type === 'mandatory' && top.pct >= 50)
      );
    };

    const matchedMandatoryCount = mandatoryCriteria.filter(isItemMatched).length;
    const matchedMajorCount = majorCriteria.filter(isItemMatched).length;
    const matchedLabCount = labCriteria.filter(isItemMatched).length;

    const requiredMajorCount = activeChain.criteriaRule?.minMajorRequired || 1;
    const requiredLabCount = activeChain.criteriaRule?.minMinorRequired || 1;

    const mandatoryFulfilled =
      mandatoryCriteria.length === 0 || matchedMandatoryCount >= mandatoryCriteria.length;
    const majorFulfilled = matchedMajorCount >= requiredMajorCount;
    const labFulfilled = matchedLabCount >= requiredLabCount;

    const isConfirmed = mandatoryFulfilled && majorFulfilled && labFulfilled;
    const isSuspected = mandatoryFulfilled && (matchedMajorCount >= 1 || matchedLabCount >= 1);

    return {
      mandatoryCriteria,
      majorCriteria,
      labCriteria,
      matchedMandatoryCount,
      totalMandatoryCount: mandatoryCriteria.length,
      matchedMajorCount,
      requiredMajorCount,
      matchedLabCount,
      requiredLabCount,
      mandatoryFulfilled,
      majorFulfilled,
      labFulfilled,
      isConfirmed,
      isSuspected,
      isItemMatched,
    };
  }, [activeChain, top]);

  // Độ tuổi và phân loại bệnh nhi
  const ageYears = form?.tuoi ? parseInt(form.tuoi, 10) : NaN;
  const isPediatric = !isNaN(ageYears) && ageYears < 16 && ageYears >= 0;

  // Hệ thống thang điểm được chọn: NEWS2 (Người lớn) | ESI (Cấp cứu 5 cấp độ) | PEWS (Nhi khoa)
  const [activeScoreSystem, setActiveScoreSystem] = useState<'news2' | 'esi' | 'pews'>(
    isPediatric ? 'pews' : 'news2'
  );

  // Tự động chuyển sang PEWS nếu bệnh nhân là trẻ em
  React.useEffect(() => {
    if (isPediatric) {
      setActiveScoreSystem('pews');
    }
  }, [isPediatric]);

  // Set các triệu chứng đã khớp để tính điểm
  const matchedSymptomIds = useMemo(() => {
    if (!top || !top.matched) return new Set<string>();
    return new Set<string>(top.matched.map((m) => m.tc.id));
  }, [top]);

  // 1. Thang điểm NEWS2 (Cảnh báo sớm Quốc gia)
  const riskScore: ClinicalRiskScore = useMemo(() => {
    return calculateClinicalRiskScore(vitals, labs, results, form);
  }, [vitals, labs, results, form]);

  // 2. Thang điểm PEWS (Cảnh báo sớm Nhi khoa)
  const pewsScore: PewsScoreResult = useMemo(() => {
    return calculatePewsScore(vitals, labs, form, matchedSymptomIds);
  }, [vitals, labs, form, matchedSymptomIds]);

  // 3. Thang điểm ESI (Phân tầng Cấp cứu 5 cấp độ)
  const esiScore: EsiScoreResult = useMemo(() => {
    return calculateEsiTriage(vitals, labs, results, form, matchedSymptomIds);
  }, [vitals, labs, results, form, matchedSymptomIds]);

  // Integrated clinical resources from Kho CC, Kho ICD-10, Kho CDSS
  const matchedTools: VaultArticle[] = useMemo(() => {
    if (!top) return [];
    return getToolsForDisease(top.b.ten, top.b.icd);
  }, [top]);

  const icd10Guides: VaultArticle[] = useMemo(() => {
    if (!top) return [];
    return getIcd10Guidance(top.b.icd, top.b.ten);
  }, [top]);

  const cdssAlerts: VaultArticle[] = useMemo(() => {
    if (!top) return [];
    return getCdssForCondition(top.b.ten);
  }, [top]);

  // Filtered differentials
  const differentials = useMemo(() => {
    if (!results || results.length <= 1) return [];
    let list = results.slice(1);

    if (diffFilter === 'alert') {
      list = list.filter((r) => r.b.baoDong);
    } else if (diffFilter === 'high') {
      list = list.filter((r) => r.pct >= 20);
    }

    if (searchDiff.trim()) {
      const q = searchDiff.toLowerCase().trim();
      list = list.filter(
        (r) =>
          r.b.ten.toLowerCase().includes(q) ||
          r.b.icd.toLowerCase().includes(q) ||
          r.b.nhom.toLowerCase().includes(q)
      );
    }

    return list;
  }, [results, diffFilter, searchDiff]);

  // Generate Medical Clinical Reasoning for EMR
  const handleCopyReasoning = async () => {
    if (!top) return;

    const lines: string[] = [];
    lines.push(`TÓM TẮT BIỆN LUẬN LÂM SÀNG (CLINICAL REASONING SUMMARY)`);
    lines.push(`Thời gian: ${new Date().toLocaleString('vi-VN')}`);
    lines.push(`Dữ kiện đối chiếu: ${selectedCount} chọn + ${derivedCount} tự suy (⚙) + ${negatedCount} phủ định.`);

    if (activeScoreSystem === 'esi') {
      lines.push(`Phân tầng cấp cứu ESI: ${esiScore.levelName} (${esiScore.triageCategory})`);
      lines.push(`Thời gian tiếp cận mục tiêu: ${esiScore.timeToPhysician} | Khu vực: ${esiScore.targetArea}`);
      lines.push(`Tài nguyên dự kiến: ${esiScore.predictedResources.count} nhóm (${esiScore.predictedResources.resourceList.join(', ')})`);
    } else if (activeScoreSystem === 'pews') {
      lines.push(`Thang điểm cảnh báo sớm Nhi khoa PEWS: ${pewsScore.totalScore} điểm (${pewsScore.levelName})`);
      lines.push(`Mức độ: ${pewsScore.urgencyText} | Theo dõi: ${pewsScore.monitoringFrequency}`);
      lines.push(`Leo thang: ${pewsScore.escalationProtocol}`);
    } else {
      lines.push(`Phân tầng nguy cơ NEWS2: ${riskScore.levelName} (${riskScore.totalScore} điểm) - ${riskScore.urgencyText}`);
      lines.push(`Khuyến nghị theo dõi: ${riskScore.monitoringFrequency}`);
    }

    lines.push(``);
    lines.push(`1. CHẨN ĐOÁN SƠ BỘ (Nghĩ nhiều nhất):`);
    lines.push(`- Bệnh lý: ${top.b.ten} (ICD-10: ${top.b.icd}) - Độ phù hợp: ${top.pct}%.`);
    lines.push(
      `- Bằng chứng ủng hộ: ${top.matched.map((m) => `${m.tc.ten} (+${m.w})`).join(', ')}.`
    );
    if (top.missing.length > 0) {
      lines.push(
        `- Cần bổ sung để khẳng định: ${top.missing
          .slice(0, 4)
          .map((m) => `${m.tc.ten} (+${m.w})`)
          .join(', ')}.`
      );
    }
    if (top.notes.length > 0) {
      lines.push(`- Yếu tố dịch tễ / dân số: ${top.notes.join('; ')}.`);
    }

    const diffCandidates = results.slice(1, 4);
    if (diffCandidates.length > 0) {
      lines.push(``);
      lines.push(`2. CHẨN ĐOÁN PHÂN BIỆT CẦN LOẠI TRỪ:`);
      diffCandidates.forEach((d, idx) => {
        lines.push(
          `- [${idx + 1}] ${d.b.ten} (${d.b.icd}) - ${d.pct}%: Có ${d.matched
            .slice(0, 3)
            .map((m) => m.tc.ten)
            .join(', ')}. Cần làm thêm: ${d.missing
            .slice(0, 3)
            .map((m) => m.tc.ten)
            .join(', ')} để phân biệt.`
        );
      });
    }

    lines.push(``);
    lines.push(`3. HƯỚNG XỬ TRÍ TIẾP THEO:`);
    if (activeScoreSystem === 'esi') {
      lines.push(`- ${esiScore.clinicalAction}`);
    } else if (activeScoreSystem === 'pews') {
      lines.push(`- ${pewsScore.clinicalAction}`);
    } else {
      lines.push(`- ${riskScore.clinicalAction}`);
    }
    lines.push(`- Khởi động phác đồ điều trị chuẩn và làm xét nghiệm xác chẩn.`);

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopiedReasoning(true);
      setTimeout(() => setCopiedReasoning(false), 2500);
    } catch {
      // Fallback
    }
  };

  if (!results || results.length === 0 || !top) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-12 text-center shadow-xs">
        <div className="text-4xl font-display font-light text-slate-400 mb-2">∅</div>
        <h3 className="font-display font-bold text-base text-slate-800 mb-1">
          Chưa có chẩn đoán nào khớp dữ kiện
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Vui lòng quay lại Bước 1 để chọn thêm triệu chứng, nhập sinh hiệu, kết quả xét nghiệm, hoặc
          thử nạp một bệnh án mẫu để xem quy trình phân tích.
        </p>
      </div>
    );
  }

  // Circular gauge calculations (r=52, circumference = 2 * PI * 52 ≈ 326.7)
  const CIRCUMFERENCE = 326.7;
  const strokeOffset = CIRCUMFERENCE * (1 - top.pct / 100);

  return (
    <div className="flex flex-col gap-4">
      {/* Stat banner & Evidence telemetry */}
      <div className="bg-white border border-slate-200 rounded-md px-4 py-2.5 text-xs font-mono-custom text-slate-600 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-blue-600 font-bold">⚙</span>
          <span>
            Đã đối chiếu <b>{selectedCount}</b> dữ kiện chọn + <b>{derivedCount}</b> tự suy (⚙) +{' '}
            <b>{negatedCount}</b> phủ định với <b>{kb.benh.length}</b> bệnh trong Kho tri thức.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-700 font-semibold">
            {results.length} chẩn đoán có bằng chứng
          </span>
          <button
            type="button"
            onClick={handleCopyReasoning}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded border text-[11px] font-sans font-semibold transition-all cursor-pointer ${
              copiedReasoning
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
            title="Sao chép tóm tắt biện luận lâm sàng để dán vào hồ sơ EMR"
          >
            {copiedReasoning ? (
              <>
                <Check className="w-3 h-3" />
                <span>Đã sao chép EMR</span>
              </>
            ) : (
              <>
                <ClipboardCopy className="w-3 h-3 text-slate-500" />
                <span>Copy biện luận EMR</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Trục Biện Luận Theo Vấn Đề Chính & Tam Giác Chẩn Đoán Truyền Nhiễm */}
      {primaryProblem && (
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-xl p-4 shadow-sm border border-blue-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-amber-950">
                <Sparkles className="w-3 h-3" />
                Trục Biện Luận Chính
              </span>
              <span className="text-xs text-blue-200">
                Theo phương pháp luận PGS.TS Hoàng Văn Sĩ & BSCKI Trần Thanh Tuấn
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>Vấn đề chính:</span>
              <span className="text-amber-300">"{primaryProblem.label}"</span>
            </h3>
            <p className="text-xs text-blue-100/80 leading-relaxed">
              Toàn bộ chẩn đoán sơ bộ và phân biệt bên dưới được máy tính xếp hạng dựa trên khả năng giải thích vấn đề chính này kết hợp với <strong>Tam giác Dịch tễ — Lâm sàng — Cận lâm sàng</strong>.
            </p>
          </div>

          {epiContext && (epiContext.outbreakAlert || epiContext.vectorExposure || epiContext.endemicArea) && (
            <div className="bg-emerald-950/80 border border-emerald-500/40 rounded-lg p-3 text-xs text-emerald-100 space-y-1 shrink-0 max-w-sm">
              <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Yếu tố Dịch tễ tác động điểm số:</span>
              </div>
              <div className="text-[11px] text-emerald-200 leading-snug">
                {epiContext.outbreakAlert && <div>• Ổ dịch: {epiContext.outbreakAlert}</div>}
                {epiContext.vectorExposure && <div>• Vector: {epiContext.vectorExposure}</div>}
                {epiContext.endemicArea && <div>• Vùng: {epiContext.endemicArea}</div>}
              </div>
            </div>
          )}
        </div>
      )}

      {/* MA TRẬN QUYẾT ĐỊNH LÂM SÀNG 3 TẦNG (PARALLEL CLINICAL ACTION BOARD) */}
      {problems && problems.length > 0 && (
        <div className="bg-slate-900 border border-slate-700/80 rounded-xl p-4 sm:p-5 text-white shadow-md transition-all">
          {/* Top Bar: Title, Badges & Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/40">
                <ListTree className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-100 flex items-center gap-2">
                    <span>Ma Trận Quyết Định Lâm Sàng 3 Tầng</span>
                    <span className="text-[11px] font-mono font-normal text-slate-400">
                      (Bản nâng cấp tóm tắt bệnh án)
                    </span>
                  </h3>
                </div>
                <p className="text-[11px] text-slate-400">
                  Phối hợp song hành: Chiến lược chẩn đoán (CLS đề nghị) &amp; Chiến lược điều trị (Y lệnh tức thời)
                </p>
              </div>
            </div>

            {/* Quick Badges & Expand Toggle */}
            <div className="flex items-center gap-2 flex-wrap self-end sm:self-center">
              {tier1Problems.length > 0 && (
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/50 flex items-center gap-1 animate-pulse">
                  <AlertOctagon className="w-3 h-3 text-rose-400" />
                  <span>{tier1Problems.length} Cấp cứu Tầng 1</span>
                </span>
              )}
              <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                {tier2Problems.length} Cấp tính Tầng 2
              </span>
              {tier3Problems.length > 0 && (
                <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  {tier3Problems.length} Mạn tính Tầng 3
                </span>
              )}

              <button
                type="button"
                onClick={() => setIsProblemsBoardExpanded(!isProblemsBoardExpanded)}
                className="ml-1 p-1 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors flex items-center gap-1 text-xs px-2 cursor-pointer"
                title="Đóng / Mở ma trận 3 tầng"
              >
                {isProblemsBoardExpanded ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Thu gọn</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Xem chi tiết ({problems.length} vấn đề)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* CẢNH BÁO XUNG ĐỘT ĐIỀU TRỊ (NẾU CÓ) */}
          {conflictList.length > 0 && (
            <div className="mt-3 p-3 bg-amber-950/80 border-2 border-amber-500/60 rounded-lg text-amber-200 text-xs space-y-1.5 shadow-sm">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>CẢNH BÁO MÂU THUẪN / XUNG ĐỘT XỬ TRÍ GIỮA CÁC VẤN ĐỀ:</span>
              </div>
              <div className="space-y-1 pl-6 text-[11px] text-amber-100">
                {conflictList.map((c, idx) => (
                  <div key={idx} className="leading-relaxed">
                    • <strong>{c.label}:</strong> {c.conflictNotes}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NỘI DUNG 3 CỘT MA TRẬN KHI MỞ RỘNG */}
          {isProblemsBoardExpanded && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 mt-3.5 pt-1">
              {/* CỘT TẦNG 1: ĐE DỌA SINH HIỆU */}
              <div className="bg-rose-950/20 border border-rose-800/60 rounded-xl p-3 flex flex-col gap-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-rose-800/40">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300 uppercase tracking-wide">
                    <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                    <span>Tầng 1: Đe Dọa Sinh Hiệu</span>
                  </div>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    Hồi sức ngay
                  </span>
                </div>

                {tier1Problems.length === 0 ? (
                  <div className="p-3 text-center text-xs text-slate-400 italic bg-slate-800/30 rounded-lg border border-dashed border-slate-700">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1 opacity-80" />
                    Không phát hiện đe dọa sinh hiệu cấp bách
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {tier1Problems.map((prob) => (
                      <div
                        key={prob.id}
                        className="p-2.5 bg-rose-900/40 border border-rose-700/60 rounded-lg space-y-2 text-xs"
                      >
                        <div className="font-bold text-rose-100 flex items-center justify-between">
                          <span>{prob.label}</span>
                          {prob.isPrimary && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-400 text-amber-950 font-extrabold uppercase">
                              Trọng tâm
                            </span>
                          )}
                        </div>

                        {/* CLS Đề nghị */}
                        {prob.diagnosticPlan && (
                          <div className="bg-slate-900/80 rounded p-1.5 text-[11px] border border-slate-700/60">
                            <span className="font-semibold text-rose-300 flex items-center gap-1">
                              <FlaskConical className="w-3 h-3 text-rose-400" />
                              CLS khẩn:
                            </span>
                            <div className="text-slate-200 mt-0.5 leading-relaxed">{prob.diagnosticPlan}</div>
                          </div>
                        )}

                        {/* Y lệnh tức thời */}
                        {prob.therapeuticPlan && (
                          <div className="bg-rose-950/80 rounded p-1.5 text-[11px] border border-rose-700/50">
                            <span className="font-semibold text-amber-300 flex items-center gap-1">
                              <Zap className="w-3 h-3 text-amber-400" />
                              Y lệnh hồi sức tức thì:
                            </span>
                            <div className="text-rose-100 font-medium mt-0.5 leading-relaxed">
                              {prob.therapeuticPlan}
                            </div>
                          </div>
                        )}

                        {prob.conflictNotes && (
                          <div className="text-[10px] text-amber-300 bg-amber-950/60 border border-amber-500/40 rounded p-1">
                            ⚠️ {prob.conflictNotes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CỘT TẦNG 2: CẤP TÍNH & HỘI CHỨNG */}
              <div className="bg-blue-950/20 border border-blue-800/60 rounded-xl p-3 flex flex-col gap-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-blue-800/40">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-300 uppercase tracking-wide">
                    <Stethoscope className="w-3.5 h-3.5 text-blue-400" />
                    <span>Tầng 2: Cấp Tính &amp; Hội Chứng</span>
                  </div>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
                    Tìm nguyên nhân
                  </span>
                </div>

                {tier2Problems.length === 0 ? (
                  <div className="p-3 text-center text-xs text-slate-400 italic bg-slate-800/30 rounded-lg border border-dashed border-slate-700">
                    Chưa phân loại vấn đề cấp tính
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {tier2Problems.map((prob) => (
                      <div
                        key={prob.id}
                        className={`p-2.5 rounded-lg space-y-2 text-xs border ${
                          prob.isPrimary
                            ? 'bg-blue-900/50 border-blue-500 ring-1 ring-blue-400/40'
                            : 'bg-slate-800/60 border-slate-700/80'
                        }`}
                      >
                        <div className="font-bold text-slate-100 flex items-center justify-between">
                          <span>{prob.label}</span>
                          {prob.isPrimary && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-400 text-amber-950 font-extrabold uppercase">
                              Trọng tâm biện luận
                            </span>
                          )}
                        </div>

                        {/* CLS Đề nghị */}
                        {prob.diagnosticPlan && (
                          <div className="bg-slate-900/80 rounded p-1.5 text-[11px] border border-slate-700/60">
                            <span className="font-semibold text-cyan-300 flex items-center gap-1">
                              <FlaskConical className="w-3 h-3 text-cyan-400" />
                              CLS xác định nguyên nhân:
                            </span>
                            <div className="text-slate-200 mt-0.5 leading-relaxed">{prob.diagnosticPlan}</div>
                          </div>
                        )}

                        {/* Hướng điều trị */}
                        {prob.therapeuticPlan && (
                          <div className="bg-slate-900/80 rounded p-1.5 text-[11px] border border-slate-700/60">
                            <span className="font-semibold text-emerald-300 flex items-center gap-1">
                              <Pill className="w-3 h-3 text-emerald-400" />
                              Kế hoạch điều trị &amp; theo dõi:
                            </span>
                            <div className="text-slate-200 mt-0.5 leading-relaxed">{prob.therapeuticPlan}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CỘT TẦNG 3: MẠN TÍNH & BỆNH NỀN ĐỒNG MẮC */}
              <div className="bg-purple-950/20 border border-purple-800/60 rounded-xl p-3 flex flex-col gap-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-purple-800/40">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 uppercase tracking-wide">
                    <Activity className="w-3.5 h-3.5 text-purple-400" />
                    <span>Tầng 3: Bệnh Nền Đồng Mắc</span>
                  </div>
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
                    Kiểm soát &amp; Tương tác
                  </span>
                </div>

                {tier3Problems.length === 0 ? (
                  <div className="p-3 text-center text-xs text-slate-400 italic bg-slate-800/30 rounded-lg border border-dashed border-slate-700">
                    Không ghi nhận tiền căn mạn tính
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {tier3Problems.map((prob) => (
                      <div
                        key={prob.id}
                        className="p-2.5 bg-purple-900/30 border border-purple-700/50 rounded-lg space-y-2 text-xs"
                      >
                        <div className="font-bold text-purple-100 flex items-center justify-between">
                          <span>{prob.label}</span>
                        </div>

                        {/* Kế hoạch duy trì / Tương tác */}
                        {prob.therapeuticPlan && (
                          <div className="bg-slate-900/80 rounded p-1.5 text-[11px] border border-slate-700/60">
                            <span className="font-semibold text-purple-300 flex items-center gap-1">
                              <Pill className="w-3 h-3 text-purple-400" />
                              Duy trì thuốc &amp; Cân nhắc liều:
                            </span>
                            <div className="text-slate-200 mt-0.5 leading-relaxed">{prob.therapeuticPlan}</div>
                          </div>
                        )}

                        {prob.diagnosticPlan && (
                          <div className="bg-slate-900/80 rounded p-1.5 text-[11px] border border-slate-700/60">
                            <span className="font-semibold text-slate-300 flex items-center gap-1">
                              <FlaskConical className="w-3 h-3 text-slate-400" />
                              Tầm soát tổn thương cơ quan đích:
                            </span>
                            <div className="text-slate-300 mt-0.5 leading-relaxed">{prob.diagnosticPlan}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* MULTI-SYSTEM CLINICAL TRIAGE & RISK SCORE CARD: NEWS2, ESI & PEWS */}
      {(() => {
        const currentScoreColor =
          activeScoreSystem === 'esi'
            ? esiScore.color
            : activeScoreSystem === 'pews'
            ? pewsScore.color
            : riskScore.color;

        return (
          <div
            id="clinical-risk-score-card"
            className={`bg-white border ${currentScoreColor.border} rounded-xl p-4 sm:p-5 shadow-xs transition-all`}
            style={{
              borderLeftWidth: '6px',
              borderLeftColor: currentScoreColor.hex,
            }}
          >
            {/* Top Bar: Segmented System Switcher & Patient Population Tag */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-100">
              {/* Segmented Switcher Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-lg border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => setActiveScoreSystem('news2')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeScoreSystem === 'news2'
                      ? 'bg-white text-blue-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-blue-600" />
                  <span>NEWS2 (Người lớn)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveScoreSystem('esi')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeScoreSystem === 'esi'
                      ? 'bg-white text-orange-950 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-orange-600" />
                  <span>ESI (Cấp cứu 5 mức độ)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveScoreSystem('pews')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeScoreSystem === 'pews'
                      ? 'bg-white text-rose-950 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Baby className="w-3.5 h-3.5 text-rose-600" />
                  <span>PEWS (Nhi khoa)</span>
                </button>
              </div>

              {/* Population Indicator Badge */}
              <div className="flex items-center gap-2">
                {isPediatric ? (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-pink-50 text-pink-800 border border-pink-200 flex items-center gap-1">
                    <Baby className="w-3.5 h-3.5 text-pink-600" />
                    <span>Bệnh nhi ({form?.tuoi} tuổi) · Khuyến nghị dùng PEWS</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>Người lớn ({form?.tuoi || 'Trưởng thành'} tuổi) · Chuẩn ESI & NEWS2</span>
                  </span>
                )}
              </div>
            </div>

            {/* TAB CONTENT: 1. ESI (EMERGENCY SEVERITY INDEX) */}
            {activeScoreSystem === 'esi' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-[260px]">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase ${esiScore.color.badgeBg} ${esiScore.color.badgeText} shadow-2xs flex items-center gap-1`}
                      >
                        <Flame className="w-3.5 h-3.5" />
                        <span>{esiScore.badgeLabel}</span>
                      </span>

                      <span className="text-xs font-mono-custom text-slate-500">
                        Thang phân loại cấp cứu Emergency Severity Index (ESI v4)
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-1 flex items-center gap-2">
                      <span>{esiScore.levelName}</span>
                      <span className="text-xs sm:text-sm font-normal text-slate-500 font-mono-custom">
                        — {esiScore.triageCategory}
                      </span>
                    </h3>

                    {/* Quick Stat Blocks: Time to MD, Target Area, Resource estimation */}
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                        <Clock className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-700 block text-[10px] uppercase">
                            Thời gian BS tiếp cận:
                          </span>
                          <span className="text-slate-900 font-bold">{esiScore.timeToPhysician}</span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-700 block text-[10px] uppercase">
                            Khu vực phân buồng:
                          </span>
                          <span className="text-slate-900 font-semibold">{esiScore.targetArea}</span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                        <Layers className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-700 block text-[10px] uppercase">
                            Dự kiến tài nguyên:
                          </span>
                          <span className="text-slate-900 font-semibold">{esiScore.predictedResources.count} nhóm can thiệp</span>
                        </div>
                      </div>
                    </div>

                    {/* Clinical Action Recommendation */}
                    <div className="mt-2.5 p-2.5 bg-slate-50/80 rounded-lg border border-slate-200 text-xs">
                      <span className="font-bold text-slate-800 block text-[11px] uppercase mb-0.5">
                        Khuyến nghị xử trí cấp cứu:
                      </span>
                      <p className="text-slate-700 leading-relaxed">{esiScore.clinicalAction}</p>
                    </div>
                  </div>

                  {/* Right: Big ESI Level Display & 5-tier Gauge */}
                  <div className="flex flex-col items-center sm:items-end justify-center shrink-0">
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className="font-display font-black text-4xl sm:text-5xl tracking-tight"
                        style={{ color: esiScore.color.hex }}
                      >
                        MỨC {esiScore.level}
                      </span>
                    </div>
                    <span className="font-mono-custom text-[11px] text-slate-500 font-bold uppercase mt-0.5">
                      Cấp độ phân loại ED
                    </span>

                    {/* 5-tier ESI Spectrum Gauge */}
                    <div className="mt-2.5 w-48 sm:w-60 flex flex-col gap-1">
                      <div className="flex h-2.5 w-full rounded-full overflow-hidden gap-1 bg-slate-100 p-0.5 border border-slate-200">
                        <div
                          className={`flex-1 rounded-full transition-all ${
                            esiScore.level === 1 ? 'bg-rose-600 ring-2 ring-rose-400' : 'bg-slate-200'
                          }`}
                          title="ESI 1: Hồi sức (Ngay lập tức)"
                        />
                        <div
                          className={`flex-1 rounded-full transition-all ${
                            esiScore.level === 2 ? 'bg-orange-500 ring-2 ring-orange-400' : 'bg-slate-200'
                          }`}
                          title="ESI 2: Cấp cứu khẩn (10-15 phút)"
                        />
                        <div
                          className={`flex-1 rounded-full transition-all ${
                            esiScore.level === 3 ? 'bg-amber-500 ring-2 ring-amber-400' : 'bg-slate-200'
                          }`}
                          title="ESI 3: Khẩn cấp (30-60 phút)"
                        />
                        <div
                          className={`flex-1 rounded-full transition-all ${
                            esiScore.level === 4 ? 'bg-blue-500 ring-2 ring-blue-400' : 'bg-slate-200'
                          }`}
                          title="ESI 4: Bán khẩn (60-120 phút)"
                        />
                        <div
                          className={`flex-1 rounded-full transition-all ${
                            esiScore.level === 5 ? 'bg-slate-500 ring-2 ring-slate-400' : 'bg-slate-200'
                          }`}
                          title="ESI 5: Không khẩn (120-240 phút)"
                        />
                      </div>

                      <div className="flex justify-between text-[9px] font-mono-custom text-slate-500 px-0.5">
                        <span className={esiScore.level === 1 ? 'font-bold text-rose-700' : ''}>1: Hồi sức</span>
                        <span className={esiScore.level === 2 ? 'font-bold text-orange-700' : ''}>2: Cấp cứu</span>
                        <span className={esiScore.level === 3 ? 'font-bold text-amber-700' : ''}>3: Khẩn</span>
                        <span className={esiScore.level === 4 ? 'font-bold text-blue-700' : ''}>4: Bán khẩn</span>
                        <span className={esiScore.level === 5 ? 'font-bold text-slate-700' : ''}>5: Thường</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ESI Details Table Toggle */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <button
                    type="button"
                    onClick={() => setShowScoreBreakdown(!showScoreBreakdown)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                  >
                    <span>
                      {showScoreBreakdown
                        ? 'Thu gọn phân tích tiêu chuẩn ESI'
                        : `Xem chi tiết tiêu chuẩn ESI (${esiScore.criteriaMet.length} tiêu chuẩn · ${esiScore.predictedResources.resourceList.length} tài nguyên)`}
                    </span>
                    {showScoreBreakdown ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {showScoreBreakdown && (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs space-y-3 animate-fadeIn">
                      <div>
                        <span className="font-bold text-slate-800 block mb-1">Tiêu chí phân loại ESI thỏa mãn:</span>
                        {esiScore.criteriaMet.length > 0 ? (
                          <ul className="list-disc pl-4 space-y-1 text-slate-700">
                            {esiScore.criteriaMet.map((c, i) => (
                              <li key={i}>{c}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-slate-500 italic">Không có dấu hiệu nguy kịch hay nguy cơ cao đơn độc.</span>
                        )}
                      </div>

                      {esiScore.dangerVitals.length > 0 && (
                        <div>
                          <span className="font-bold text-rose-800 block mb-1">Sinh hiệu rơi vào ngưỡng nguy hiểm:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {esiScore.dangerVitals.map((v, i) => (
                              <span key={i} className="px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 font-mono-custom text-[11px]">
                                {v}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <span className="font-bold text-slate-800 block mb-1">
                          Tài nguyên y tế dự kiến sử dụng ({esiScore.predictedResources.count} nhóm):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {esiScore.predictedResources.resourceList.map((res, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-300 font-medium text-[11px]">
                              ✓ {res}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: 2. PEWS (PEDIATRIC EARLY WARNING SCORE) */}
            {activeScoreSystem === 'pews' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-[260px]">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase ${pewsScore.color.badgeBg} ${pewsScore.color.badgeText} shadow-2xs flex items-center gap-1`}
                      >
                        <Baby className="w-3.5 h-3.5" />
                        <span>{pewsScore.badgeLabel}</span>
                      </span>

                      <span className="text-xs font-mono-custom text-slate-500">
                        Thang điểm Cảnh Báo Sớm Nhi Khoa (Pediatric Early Warning Score - PEWS)
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-1 flex items-center gap-2">
                      <span>{pewsScore.levelName}</span>
                      <span className="text-xs sm:text-sm font-normal text-slate-500 font-mono-custom">
                        — {pewsScore.urgencyText}
                      </span>
                    </h3>

                    {/* Quick Monitoring & Escalation Protocols */}
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                        <Clock className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-700 block text-[10px] uppercase">
                            Tần suất theo dõi sinh hiệu:
                          </span>
                          <span className="text-slate-900 font-semibold">{pewsScore.monitoringFrequency}</span>
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                        <ShieldAlert className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-700 block text-[10px] uppercase">
                            Phác đồ leo thang cấp cứu Nhi:
                          </span>
                          <span className="text-slate-900 font-medium">{pewsScore.escalationProtocol}</span>
                        </div>
                      </div>
                    </div>

                    {/* Clinical Action Recommendation */}
                    <div className="mt-2.5 p-2.5 bg-slate-50/80 rounded-lg border border-slate-200 text-xs">
                      <span className="font-bold text-slate-800 block text-[11px] uppercase mb-0.5">
                        Khuyến nghị xử trí:
                      </span>
                      <p className="text-slate-700 leading-relaxed">{pewsScore.clinicalAction}</p>
                    </div>
                  </div>

                  {/* Right: Big Numeric Score & PEWS Meter */}
                  <div className="flex flex-col items-center sm:items-end justify-center shrink-0">
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className="font-display font-black text-4xl sm:text-5xl tracking-tight"
                        style={{ color: pewsScore.color.hex }}
                      >
                        {pewsScore.totalScore}
                      </span>
                      <span className="font-mono-custom text-xs text-slate-400 font-semibold uppercase">
                        điểm PEWS
                      </span>
                    </div>

                    {/* 4-tier PEWS Urgency Meter */}
                    <div className="mt-2.5 w-48 sm:w-56 flex flex-col gap-1">
                      <div className="flex h-2 w-full rounded-full overflow-hidden gap-1 bg-slate-100 p-0.5 border border-slate-200">
                        <div
                          className={`flex-1 rounded-full transition-all ${
                            pewsScore.level >= 1 ? 'bg-emerald-500' : 'bg-slate-200'
                          }`}
                          title="Mức 1: Thấp (0-2 điểm)"
                        />
                        <div
                          className={`flex-1 rounded-full transition-all ${
                            pewsScore.level >= 2 ? 'bg-amber-500' : 'bg-slate-200'
                          }`}
                          title="Mức 2: Vừa (3-4 điểm)"
                        />
                        <div
                          className={`flex-1 rounded-full transition-all ${
                            pewsScore.level >= 3 ? 'bg-orange-500' : 'bg-slate-200'
                          }`}
                          title="Mức 3: Cao (5-6 điểm)"
                        />
                        <div
                          className={`flex-1 rounded-full transition-all ${
                            pewsScore.level >= 4 ? 'bg-rose-600 animate-pulse' : 'bg-slate-200'
                          }`}
                          title="Mức 4: Nguy kịch (≥7 điểm)"
                        />
                      </div>

                      <div className="flex justify-between text-[10px] font-mono-custom text-slate-500 px-0.5">
                        <span className={pewsScore.level === 1 ? 'font-bold text-emerald-700' : ''}>Thấp (0-2)</span>
                        <span className={pewsScore.level === 2 ? 'font-bold text-amber-700' : ''}>Vừa (3-4)</span>
                        <span className={pewsScore.level === 3 ? 'font-bold text-orange-700' : ''}>Cao (5-6)</span>
                        <span className={pewsScore.level === 4 ? 'font-bold text-rose-700' : ''}>Nguy kịch (≥7)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 PEWS Physiological Domains */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100 text-xs">
                  {pewsScore.domains.map((dom, i) => (
                    <div
                      key={i}
                      className={`p-2.5 rounded-lg border flex flex-col justify-between ${
                        dom.points >= 2
                          ? 'bg-rose-50/70 border-rose-200'
                          : dom.points === 1
                          ? 'bg-amber-50/70 border-amber-200'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-800">{dom.title}</span>
                          <span
                            className={`px-1.5 py-0.5 rounded font-mono-custom font-bold text-[10px] ${
                              dom.points >= 2
                                ? 'bg-rose-200 text-rose-900'
                                : dom.points === 1
                                ? 'bg-amber-200 text-amber-900'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {dom.points} điểm
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-700 leading-snug">{dom.finding}</p>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono-custom mt-1.5 italic">
                        {dom.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: 3. NEWS2 (NATIONAL EARLY WARNING SCORE) */}
            {activeScoreSystem === 'news2' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1 min-w-[260px]">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase ${riskScore.color.badgeBg} ${riskScore.color.badgeText} shadow-2xs flex items-center gap-1`}
                      >
                        {riskScore.level === 4 ? (
                          <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
                        ) : riskScore.level === 3 ? (
                          <AlertTriangle className="w-3.5 h-3.5" />
                        ) : (
                          <Activity className="w-3.5 h-3.5" />
                        )}
                        <span>{riskScore.badgeLabel}</span>
                      </span>

                      <span className="text-xs font-mono-custom text-slate-500">
                        Thang điểm cảnh báo sớm Quốc gia NEWS2 (Người lớn)
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-1 flex items-center gap-2">
                      <span>{riskScore.levelName}</span>
                      <span className="text-sm font-normal text-slate-500 font-mono-custom">
                        — {riskScore.urgencyText}
                      </span>
                    </h3>

                    {/* Monitoring & Clinical Action Protocols */}
                    <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2 bg-slate-50 rounded border border-slate-200 flex items-start gap-2">
                        <Clock className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-700 block text-[11px] uppercase">
                            Tần suất theo dõi:
                          </span>
                          <span className="text-slate-800 font-medium">{riskScore.monitoringFrequency}</span>
                        </div>
                      </div>

                      <div className="p-2 bg-slate-50 rounded border border-slate-200 flex items-start gap-2">
                        <Stethoscope className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-700 block text-[11px] uppercase">
                            Khuyến nghị xử trí:
                          </span>
                          <span className="text-slate-800 font-medium">{riskScore.clinicalAction}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Big Numeric Score & Gauge Bar */}
                  <div className="flex flex-col items-center sm:items-end justify-center shrink-0">
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className="font-display font-black text-4xl sm:text-5xl tracking-tight"
                        style={{ color: riskScore.color.hex }}
                      >
                        {riskScore.totalScore}
                      </span>
                      <span className="font-mono-custom text-xs text-slate-400 font-semibold uppercase">
                        điểm nguy cơ
                      </span>
                    </div>

                    {/* Visual Color-Coded Urgency Meter (4 Spectrum Bars) */}
                    <div className="mt-2 w-48 sm:w-56 flex flex-col gap-1">
                      <div className="flex h-2 w-full rounded-full overflow-hidden gap-1 bg-slate-100 p-0.5 border border-slate-200">
                        <div
                          className={`flex-1 rounded-full transition-all ${
                            riskScore.level >= 1 ? 'bg-emerald-500' : 'bg-slate-200'
                          }`}
                          title="Mức 1: Thấp (0-2 điểm)"
                        />
                        <div
                          className={`flex-1 rounded-full transition-all ${
                            riskScore.level >= 2 ? 'bg-amber-500' : 'bg-slate-200'
                          }`}
                          title="Mức 2: Trung bình (3-4 điểm)"
                        />
                        <div
                          className={`flex-1 rounded-full transition-all ${
                            riskScore.level >= 3 ? 'bg-orange-500' : 'bg-slate-200'
                          }`}
                          title="Mức 3: Cao (5-6 điểm)"
                        />
                        <div
                          className={`flex-1 rounded-full transition-all ${
                            riskScore.level >= 4 ? 'bg-rose-600 animate-pulse' : 'bg-slate-200'
                          }`}
                          title="Mức 4: Nguy kịch (≥7 điểm)"
                        />
                      </div>

                      <div className="flex justify-between text-[10px] font-mono-custom text-slate-500 px-0.5">
                        <span className={riskScore.level === 1 ? 'font-bold text-emerald-700' : ''}>Thấp (0-2)</span>
                        <span className={riskScore.level === 2 ? 'font-bold text-amber-700' : ''}>Vừa (3-4)</span>
                        <span className={riskScore.level === 3 ? 'font-bold text-orange-700' : ''}>Cao (5-6)</span>
                        <span className={riskScore.level === 4 ? 'font-bold text-rose-700' : ''}>Nguy kịch (≥7)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Breakdown Toggle & Detail Table */}
                <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setShowScoreBreakdown(!showScoreBreakdown)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline cursor-pointer self-start"
                  >
                    <span>
                      {showScoreBreakdown
                        ? 'Thu gọn bảng phân tích điểm NEWS2'
                        : `Xem chi tiết đóng góp điểm NEWS2 (${riskScore.breakdown.length} tiêu chuẩn)`}
                    </span>
                    {showScoreBreakdown ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {showScoreBreakdown && (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs animate-fadeIn">
                      {riskScore.breakdown.length === 0 ? (
                        <div className="text-slate-500 italic py-1">
                          Chưa có thông số sinh hiệu hoặc cận lâm sàng nào vượt ngưỡng báo động (Tất cả trong giới hạn bình thường).
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {riskScore.breakdown.map((item, idx) => (
                              <div
                                key={idx}
                                className="p-2 bg-white border border-slate-200 rounded flex items-start justify-between gap-2 shadow-2xs"
                              >
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-slate-800">{item.parameter}</span>
                                    <span className="font-mono-custom text-[11px] text-slate-500">
                                      ({item.value})
                                    </span>
                                  </div>
                                  <div className="text-[11px] text-slate-600 mt-0.5">{item.reason}</div>
                                </div>

                                <span
                                  className={`font-mono-custom font-bold px-1.5 py-0.5 rounded text-[11px] shrink-0 ${
                                    item.points >= 3
                                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                      : item.points === 2
                                      ? 'bg-orange-100 text-orange-800 border border-orange-200'
                                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                                  }`}
                                >
                                  +{item.points}đ
                                </span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-2 pt-2 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-500 font-mono-custom">
                            <span>Điểm sinh hiệu: {riskScore.vitalScore}đ · Điểm cận lâm sàng & cảnh báo: {riskScore.clinicalScore}đ</span>
                            <span className="font-bold text-slate-800">Tổng cộng: {riskScore.totalScore}đ</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* Low confidence warning if below 25% */}
      {top.pct < 25 && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 shrink-0 text-red-600" />
          <span>
            <b>Cảnh báo:</b> Độ phù hợp của chẩn đoán sơ bộ dưới 25% — dữ kiện hiện tại chưa đủ đặc
            hiệu. Khuyến nghị bổ sung triệu chứng cơ năng, khám thực thể hoặc cận lâm sàng.
          </span>
        </div>
      )}

      {/* Lead Diagnosis (Chẩn đoán sơ bộ) Card */}
      <div className="relative bg-white border border-slate-200 rounded-lg p-5 sm:p-6 shadow-xs overflow-hidden">
        {/* Watermark stamp */}
        <div className="absolute top-3 right-4 pointer-events-none select-none border-2 border-blue-600/20 text-blue-600/25 font-display font-black text-xs px-3 py-1 rounded rotate-6 tracking-widest uppercase">
          CHẨN ĐOÁN SƠ BỘ
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Gauge Chart */}
          <div className="md:col-span-4 flex flex-col items-center justify-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-36 h-36 -rotate-90" viewBox="0 0 140 140">
                <circle
                  cx="70"
                  cy="70"
                  r="52"
                  className="fill-none stroke-slate-200"
                  strokeWidth="10"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="52"
                  className="fill-none stroke-blue-600 transition-all duration-1000 ease-out"
                  strokeWidth="10"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="font-display font-bold text-3xl sm:text-4xl text-blue-600">
                  {top.pct}%
                </span>
                <span className="font-mono-custom text-[11px] text-slate-500 uppercase tracking-wider">
                  phù hợp
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-8 flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-blue-50 text-blue-700 border border-blue-200">
                NGHĨ NHIỀU NHẤT
              </span>
              {top.b.baoDong && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-red-50 text-red-700 border border-red-200 flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" />
                  <span>KHÔNG THỂ BỎ QUA</span>
                </span>
              )}
              <span className="px-2 py-0.5 rounded text-[11px] font-mono-custom font-semibold bg-slate-800 text-white">
                {top.b.icd || '—'}
              </span>
              {top.epiBoost?.boosted && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>+{top.epiBoost.points}% Tam giác DTH: {top.epiBoost.reason}</span>
                </span>
              )}
            </div>

            {/* Title - Clean Disease Name Only */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              {top.b.ten}
            </h3>

            {/* Compact Clinical Overview Card - Không chiếm dụng diện tích */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
              <div className="p-1 rounded bg-blue-100 text-blue-700 shrink-0 mt-0.5">
                <Stethoscope className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wide mb-0.5">
                  Tổng quan lâm sàng & Căn nguyên:
                </span>
                <span>{top.b.tomTat}</span>
              </div>
            </div>

            {/* Notes / Demographic adjustments */}
            {top.notes.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-0.5">
                {top.notes.map((note, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[11px] rounded bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1"
                  >
                    <span>◈</span> {note}
                  </span>
                ))}
              </div>
            )}

            {/* KHỐI 1: 🔬 TIÊU CHUẨN CHẨN ĐOÁN XÁC ĐỊNH (DIAGNOSTIC CRITERIA) */}
            <div className="mt-2 p-4 rounded-xl bg-white border border-slate-200/90 flex flex-col gap-3.5 shadow-2xs">
              {/* Header Khối 1: Tên khối & Huy hiệu Tổ chức ban hành kèm Năm */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-600 text-white shadow-2xs">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-900 block">
                      1. Tiêu Chuẩn Chẩn Đoán Xác Định (Diagnostic Criteria)
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Khung tiêu chuẩn y học chứng cứ đối chiếu trực tiếp trên ca bệnh
                    </span>
                  </div>
                </div>

                {/* Tổ chức & Năm ban hành tiêu chuẩn (WHO, Bộ Y Tế, CDC...) */}
                {authorities.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
                    <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Tổ chức & Năm ban hành:</span>
                    </span>
                    <div className="flex flex-wrap items-center gap-1">
                      {authorities.map((auth, aIdx) => (
                        <span
                          key={aIdx}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10.5px] font-bold bg-blue-50 text-blue-900 border border-blue-200 shadow-2xs"
                        >
                          <Award className="w-3 h-3 text-blue-600 shrink-0" />
                          <span>{auth.badge}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* KHUNG QUY TẮC & CÔNG THỨC CHẨN ĐOÁN CỐT LÕI (DIAGNOSTIC ALGORITHM & FORMULA) */}
              {activeChain?.criteriaRule && (
                <div className="p-3.5 rounded-lg bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-slate-50 border border-blue-200 flex flex-col gap-2.5 shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="p-1 rounded bg-blue-600 text-white shadow-2xs">
                        <ClipboardCheck className="w-3.5 h-3.5" />
                      </span>
                      <span className="font-bold text-xs uppercase tracking-wider text-blue-900">
                        Quy tắc chẩn đoán (Diagnostic Algorithm)
                      </span>
                    </div>

                    {/* Formula Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold">
                      <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300">
                        Tiêu chuẩn Bắt buộc
                      </span>
                      <span className="text-slate-400 font-bold">+</span>
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-300">
                        ≥ {activeChain.criteriaRule.minMajorRequired || 1} Lâm sàng chính
                      </span>
                      <span className="text-slate-400 font-bold">+</span>
                      <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-300">
                        ≥ {activeChain.criteriaRule.minMinorRequired || 1} Cận lâm sàng
                      </span>
                    </div>
                  </div>

                  {/* Toàn văn quy tắc - Hiển thị đầy đủ không bị cắt ngắn */}
                  <p className="text-xs text-slate-800 font-medium leading-relaxed bg-white/95 p-2.5 rounded border border-blue-100">
                    <b className="text-blue-900 font-bold">Khuyến cáo chẩn đoán:</b> {activeChain.criteriaRule.ruleDescription}
                  </p>

                  {/* Thanh đo mức độ thỏa mãn tiêu chuẩn theo thời gian thực */}
                  {criteriaFulfillment && (
                    <div className="space-y-2 pt-1">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div
                          className={`p-2 rounded border text-xs flex items-center justify-between ${
                            criteriaFulfillment.mandatoryFulfilled
                              ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 font-semibold'
                              : 'bg-rose-50/90 border-rose-200 text-rose-950'
                          }`}
                        >
                          <span className="font-medium text-slate-700">1. Tiêu chuẩn Bắt buộc:</span>
                          <span className="font-bold flex items-center gap-1">
                            {criteriaFulfillment.mandatoryFulfilled ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                            )}
                            {criteriaFulfillment.matchedMandatoryCount}/{criteriaFulfillment.totalMandatoryCount} Đạt
                          </span>
                        </div>

                        <div
                          className={`p-2 rounded border text-xs flex items-center justify-between ${
                            criteriaFulfillment.majorFulfilled
                              ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 font-semibold'
                              : 'bg-amber-50/90 border-amber-200 text-amber-950'
                          }`}
                        >
                          <span className="font-medium text-slate-700">2. Lâm sàng Chính:</span>
                          <span className="font-bold flex items-center gap-1">
                            {criteriaFulfillment.majorFulfilled ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                            )}
                            {criteriaFulfillment.matchedMajorCount}/{criteriaFulfillment.requiredMajorCount} Đạt
                          </span>
                        </div>

                        <div
                          className={`p-2 rounded border text-xs flex items-center justify-between ${
                            criteriaFulfillment.labFulfilled
                              ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950 font-semibold'
                              : 'bg-purple-50/90 border-purple-200 text-purple-950'
                          }`}
                        >
                          <span className="font-medium text-slate-700">3. Cận lâm sàng:</span>
                          <span className="font-bold flex items-center gap-1">
                            {criteriaFulfillment.labFulfilled ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <AlertTriangle className="w-3.5 h-3.5 text-purple-600" />
                            )}
                            {criteriaFulfillment.matchedLabCount}/{criteriaFulfillment.requiredLabCount} Đạt
                          </span>
                        </div>
                      </div>

                      {/* Đánh giá kết luận đối chiếu */}
                      <div
                        className={`p-2.5 rounded-md border text-xs flex items-center gap-2 font-medium ${
                          criteriaFulfillment.isConfirmed
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : criteriaFulfillment.isSuspected
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : 'bg-blue-100 text-blue-900 border-blue-300'
                        }`}
                      >
                        {criteriaFulfillment.isConfirmed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                        )}
                        <span>
                          <b>Đánh giá trên ca bệnh hiện tại:</b>{' '}
                          {criteriaFulfillment.isConfirmed
                            ? `Đủ điều kiện chẩn đoán xác định theo bộ tiêu chuẩn của ${authorities.map((a) => a.badge).slice(0, 2).join(' & ')}.`
                            : criteriaFulfillment.isSuspected
                            ? `Ca bệnh nghi ngờ cao trên lâm sàng — Cần bổ sung xét nghiệm cận lâm sàng chuyên biệt để khẳng định theo hướng dẫn.`
                            : `Chưa thỏa mãn đủ tiêu chuẩn lâm sàng/dịch tễ — Cần tiếp tục theo dõi sát diễn biến hoặc rà soát chẩn đoán phân biệt.`}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tiêu chuẩn vàng (Gold Standard) */}
              {activeChain?.goldStandard && (
                <div className="p-3 rounded-lg bg-blue-50/80 border border-blue-200 text-xs text-blue-950 flex items-start gap-2.5">
                  <span className="font-bold text-[11px] uppercase tracking-wide text-blue-800 shrink-0 mt-0.5 px-2 py-0.5 bg-blue-100 border border-blue-300 rounded">
                    ★ Tiêu chuẩn vàng:
                  </span>
                  <span className="leading-relaxed font-normal">{activeChain.goldStandard}</span>
                </div>
              )}

              {/* Lưới thẻ tiêu chuẩn chi tiết - Trọng tâm, có ngưỡng định lượng và nguồn Guideline */}
              {activeChain?.criteria && activeChain.criteria.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeChain.criteria.map((crit) => {
                    const isMatched = criteriaFulfillment
                      ? criteriaFulfillment.isItemMatched(crit)
                      : crit.type === 'mandatory' && top.pct >= 50;

                    return (
                      <div
                        key={crit.id}
                        className={`p-3 rounded-lg border text-xs flex flex-col justify-between gap-2 transition-all ${
                          isMatched
                            ? 'bg-emerald-50/50 border-emerald-300/80 text-slate-800 shadow-2xs'
                            : 'bg-white border-slate-200/90 text-slate-700'
                        }`}
                      >
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide shrink-0 ${
                                crit.type === 'mandatory'
                                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                  : crit.type === 'major'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                  : crit.type === 'lab'
                                  ? 'bg-purple-100 text-purple-800 border border-purple-300'
                                  : 'bg-slate-100 text-slate-700 border border-slate-300'
                              }`}
                            >
                              {crit.type === 'mandatory'
                                ? 'Bắt buộc'
                                : crit.type === 'major'
                                ? 'Lâm sàng chính'
                                : crit.type === 'lab'
                                ? 'Cận lâm sàng'
                                : 'Tiêu chuẩn phụ'}
                            </span>

                            {isMatched ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10.5px] shrink-0 flex items-center gap-1 border border-emerald-300">
                                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                                <span>Đã khớp</span>
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 font-medium text-[10.5px] shrink-0 border border-slate-200">
                                Cần tìm thêm
                              </span>
                            )}
                          </div>

                          <h5 className="font-bold text-slate-900 text-xs sm:text-[13px] leading-snug">
                            {crit.label}
                          </h5>

                          {/* Ngưỡng định lượng cận lâm sàng nổi bật */}
                          {crit.labThreshold && (
                            <div className="p-1.5 rounded bg-purple-50 border border-purple-200 text-[11px] font-mono-custom text-purple-900 font-semibold flex items-center gap-1.5">
                              <FlaskConical className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                              <span>Ngưỡng xác định: {crit.labThreshold}</span>
                            </div>
                          )}

                          {/* Mô tả triệu chứng lâm sàng cốt lõi */}
                          {crit.description && (
                            <div className="text-[11.5px] text-slate-600 leading-relaxed font-normal">
                              {crit.description}
                            </div>
                          )}
                        </div>

                        {/* Nguồn Tổ chức ban hành & Năm công bố trên từng thẻ */}
                        {crit.sourceGuideline && (
                          <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[10.5px] text-slate-500 font-medium">
                            <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span className="truncate">
                              Nguồn: <b className="text-slate-700 font-semibold">{formatGuidelineCitation(crit.sourceGuideline)}</b>
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Fallback to simple matched list if no activeChain criteria */
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {top.matched.map((m, idx) => {
                    const roleConfig = ROLE_LABELS[m.role];
                    return (
                      <li
                        key={idx}
                        className="p-2 bg-white border border-slate-200 rounded-md text-xs flex items-center justify-between gap-2 shadow-2xs"
                      >
                        <span className="font-medium text-slate-800">{m.tc.ten}</span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${roleConfig.color}`}
                        >
                          {roleConfig.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Missing criteria to confirm */}
              {top.missing.length > 0 && (
                <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-md text-xs text-slate-800">
                  <b className="text-amber-800">Để củng cố chẩn đoán, ưu tiên tìm thêm: </b>
                  <span className="text-slate-700">
                    {top.missing
                      .sort((a, b) => b.w - a.w)
                      .slice(0, 4)
                      .map((m, idx) => (
                        <span key={idx} className="inline-block mr-2">
                          {m.tc.ten}{' '}
                          <span className="font-mono-custom text-slate-500">(+{m.w})</span>
                          {m.tc.loai.includes('cls') && (
                            <span className="ml-0.5 text-[9px] px-1 bg-slate-200 text-slate-700 rounded font-mono-custom">
                              CLS
                            </span>
                          )}
                          {idx < 3 ? ' · ' : ''}
                        </span>
                      ))}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* KHỐI 2: 📊 TIÊU CHUẨN PHÂN ĐỘ LÂM SÀNG (SEVERITY STAGING CRITERIA) */}
        <div className="mt-5 p-4 rounded-lg bg-slate-50/90 border border-slate-200">
          <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-200">
            <div>
              <span className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>2. Tiêu Chuẩn Phân Độ Lâm Sàng (Severity Staging Criteria)</span>
              </span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Đối chiếu triệu chứng lâm sàng và cận lâm sàng để xác định mức độ nặng của người bệnh theo chuẩn Bộ Y tế / WHO. (Tuyến tiếp nhận, định hướng xử trí & mục tiêu điều trị được quy hoạch chi tiết ở Bước 4).
              </p>
            </div>
            <span className="text-[11px] text-indigo-700 font-semibold bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200 hidden sm:inline">
              Nhấp xem Phác đồ điều trị & Mục tiêu xử trí ở Bước 4 →
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(activeChain?.severityGrading && activeChain.severityGrading.length > 0
              ? activeChain.severityGrading
              : [
                  {
                    grade: 'Mức độ 1: Thể Nhẹ / Ngoại trú',
                    severity: 'mild' as const,
                    criteria: 'Triệu chứng khởi phát nhẹ đến vừa, sinh hiệu ổn định, không có dấu hiệu cảnh báo đe dọa sinh mạng.',
                    triage: 'Tuyến 1: Ngoại trú / Trạm Y tế',
                    primaryAction: 'Dùng thuốc đường uống, bù nước điện giải Oresol, theo dõi sát.',
                    targetVitals: 'Sinh hiệu trong giới hạn bình thường',
                  },
                  {
                    grade: 'Mức độ 2: Thể Trung bình / Nội trú',
                    severity: 'moderate' as const,
                    criteria: 'Có ít nhất 1 dấu hiệu cảnh báo hoặc có cơ địa nguy cơ cao, triệu chứng tiến triển nhanh.',
                    triage: 'Tuyến 2: Nội trú / Bệnh viện Quận-Huyện',
                    primaryAction: 'Nhập viện theo dõi, bù dịch tĩnh mạch và xét nghiệm định kỳ.',
                    targetVitals: 'Duy trì tưới máu tạng an toàn',
                  },
                  {
                    grade: 'Mức độ 3: Thể Nặng / Cấp cứu ICU',
                    severity: 'critical' as const,
                    criteria: 'Sốc giảm thể tích (tụt HA, HA kẹp), suy hô hấp, xuất huyết nặng hoặc tổn thương suy đa tạng.',
                    triage: 'Tuyến 3: Khoa Hồi sức tích cực (ICU)',
                    primaryAction: 'Hồi sức sốc khẩn cấp, thở oxy, bù dịch nhanh và vận mạch.',
                    targetVitals: 'HATT ≥ 90 mmHg, MAP ≥ 65 mmHg',
                  },
                ]
            ).map((gradeItem, gIdx) => {
              const isCritical = gradeItem.severity === 'critical' || gradeItem.severity === 'severe';
              const isModerate = gradeItem.severity === 'moderate';

              // Kiểm tra xem dữ kiện bệnh nhân hiện tại có phù hợp với phân độ này
              const sbp = parseFloat(vitals?.vHATT || '120');
              const dbp = parseFloat(vitals?.vHATTr || '80');
              const plt = parseFloat(labs?.lTC || '250');
              const hct = parseFloat(labs?.lHct || '40');

              const isMatchedCurrent =
                isCritical
                  ? (sbp <= 90 || (sbp > 0 && dbp > 0 && sbp - dbp <= 20) || plt < 50)
                  : isModerate
                  ? (!((sbp <= 90 || (sbp > 0 && dbp > 0 && sbp - dbp <= 20) || plt < 50)) && (plt < 100 || hct >= 44 || activeChain?.diseaseName?.toLowerCase().includes('dengue')))
                  : false;

              const parsed = parseSeverityCriteria(gradeItem.criteria, gradeItem.severity);

              return (
                <div
                  key={gIdx}
                  className={`p-4 rounded-lg border flex flex-col justify-between transition-all ${
                    isCritical
                      ? 'bg-rose-50/40 border-rose-200 hover:border-rose-400'
                      : isModerate
                      ? 'bg-amber-50/40 border-amber-200 hover:border-amber-400'
                      : 'bg-white border-slate-200 hover:border-blue-300'
                  } shadow-2xs`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          isCritical
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : isModerate
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}
                      >
                        {gradeItem.severity}
                      </span>
                      {isMatchedCurrent && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white shadow-2xs animate-pulse">
                          ★ Phù hợp ca bệnh
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                      {gradeItem.grade}
                    </h4>

                    {/* Tiêu chuẩn xác định phân độ - Thiết kế cấu trúc phân tầng rõ ràng */}
                    <div className="bg-white/95 border border-slate-200/90 rounded-lg p-3 text-xs flex flex-col gap-2.5 shadow-2xs">
                      <div className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-wider pb-1.5 border-b border-slate-100 text-slate-700">
                        <FileCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Tiêu chuẩn xác định phân độ:</span>
                      </div>

                      {parsed.intro && (
                        <div
                          className={`p-2 rounded text-[11px] font-medium leading-snug flex items-start gap-1.5 ${
                            isCritical
                              ? 'bg-rose-50 text-rose-900 border border-rose-200'
                              : isModerate
                              ? 'bg-amber-50 text-amber-900 border border-amber-200'
                              : 'bg-blue-50 text-blue-900 border border-blue-200'
                          }`}
                        >
                          {isCritical ? (
                            <AlertOctagon className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                          ) : isModerate ? (
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          ) : (
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          )}
                          <span>{parsed.intro}</span>
                        </div>
                      )}

                      <div className="space-y-2">
                        {parsed.items.map((item, iIdx) => {
                          const isDanger = item.type === 'danger';
                          const isWarning = item.type === 'warning' || item.type === 'risk';
                          const isSafety = item.type === 'safety';
                          const isLab = item.type === 'lab';
                          const isClinical = item.type === 'clinical';
                          const isCare = item.type === 'care';

                          return (
                            <div
                              key={iIdx}
                              className={`p-2.5 rounded-md border text-[11.5px] leading-relaxed transition-colors ${
                                isDanger
                                  ? 'bg-rose-50/70 border-rose-200/80 text-rose-950'
                                  : isWarning
                                  ? 'bg-amber-50/70 border-amber-200/80 text-amber-950'
                                  : isSafety
                                  ? 'bg-emerald-50/50 border-emerald-200/70 text-emerald-950'
                                  : isLab
                                  ? 'bg-purple-50/40 border-purple-200/70 text-purple-950'
                                  : isClinical
                                  ? 'bg-blue-50/40 border-blue-200/70 text-slate-900'
                                  : 'bg-slate-50/90 border-slate-200/70 text-slate-800'
                              }`}
                            >
                              <div className="flex items-start gap-2">
                                {item.label ? (
                                  <span
                                    className={`px-1.5 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wide shrink-0 ${
                                      isDanger
                                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                        : isWarning
                                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                        : isSafety
                                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                        : isLab
                                        ? 'bg-purple-100 text-purple-800 border border-purple-300'
                                        : isClinical
                                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                        : isCare
                                        ? 'bg-slate-200 text-slate-800 border border-slate-300'
                                        : 'bg-slate-200 text-slate-700'
                                    }`}
                                  >
                                    {item.label}
                                  </span>
                                ) : (
                                  <span
                                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                                      isCritical
                                        ? 'bg-rose-600 text-white'
                                        : isModerate
                                        ? 'bg-amber-500 text-white'
                                        : 'bg-blue-600 text-white'
                                    }`}
                                  >
                                    {item.num || iIdx + 1}
                                  </span>
                                )}

                                <div className="flex-1 space-y-1">
                                  {item.title && (
                                    <div className="font-bold text-slate-900">
                                      {item.title}:
                                    </div>
                                  )}

                                  {item.text && (
                                    <div className="font-normal">{item.text}</div>
                                  )}

                                  {item.subItems && item.subItems.length > 0 && (
                                    <ul className="space-y-1 mt-1 pl-0.5">
                                      {item.subItems.map((sub, sIdx) => (
                                        <li key={sIdx} className="flex items-start gap-1.5 text-slate-800">
                                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                                          <span className="font-normal">{sub}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {parsed.note && (
                        <div className="mt-1 p-2 rounded bg-amber-50/90 border border-amber-200 text-amber-900 text-[11px] font-medium leading-relaxed flex items-start gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>
                            <b>Lưu ý nguy cơ:</b> {parsed.note}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80">
                    <button
                      type="button"
                      onClick={() => onGoToProtocol(top.b.id, { gradeIdx: gIdx })}
                      className={`w-full py-2.5 px-3 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                        isCritical
                          ? 'bg-rose-600 hover:bg-rose-700 text-white'
                          : isModerate
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      <span>Xem Phác Đồ & Mục Tiêu Ở Bước 4</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* KHỐI 3: ⚠️ TIÊU CHUẨN BIẾN CHỨNG ĐE DỌA SINH MẠNG & Y LỆNH CẤP CỨU */}
        {activeChain?.complications && activeChain.complications.length > 0 && (
          <div className="mt-5 p-4 rounded-lg bg-rose-50/40 border border-rose-200">
            <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-rose-200/80">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" />
                <span className="font-bold text-xs uppercase tracking-wider text-rose-900">
                  3. Tiêu Chuẩn Biến Chứng Đe Dọa Sinh Mạng & Y Lệnh Cấp Cứu ({activeChain.complications.length} Biến chứng)
                </span>
              </div>
              <span className="text-[11px] font-semibold text-rose-700 hidden sm:inline">
                Bấm để nạp trọn bộ Y Lệnh Cấp Cứu vào Bước 4
              </span>
            </div>

            <div className="space-y-2.5">
              {activeChain.complications.map((comp) => (
                <div
                  key={comp.id}
                  className="p-3 bg-white rounded-lg border border-rose-200 hover:border-rose-400 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-bold text-xs sm:text-sm text-slate-900">
                        {comp.name}
                      </span>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-bold uppercase ${
                          comp.severity === 'critical'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : 'bg-orange-100 text-orange-800 border border-orange-200'
                        }`}
                      >
                        {comp.severity === 'critical' ? 'Nguy kịch' : 'Cấp cứu'}
                      </span>
                      {comp.orderSet && comp.orderSet.length > 0 && (
                        <span className="px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-semibold">
                          ⚡ {comp.orderSet.length} Y lệnh khẩn
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-600 space-y-0.5">
                      <div>
                        <b className="text-rose-800 text-[11px]">Dấu hiệu kích hoạt: </b>
                        <span className="text-[11.5px]">{comp.triggerCriteria}</span>
                      </div>
                      <div>
                        <b className="text-slate-800 text-[11px]">Xử trí giờ vàng: </b>
                        <span className="text-[11.5px] text-slate-700">{comp.actionSummary}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      onGoToProtocol(top.b.id, {
                        gradeIdx: activeChain.severityGrading?.length ? activeChain.severityGrading.length - 1 : 0,
                        complicationId: comp.id,
                      })
                    }
                    className="px-3 py-1.5 rounded-md text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all shrink-0 self-stretch sm:self-center"
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>Xem Phác Đồ Cấp Cứu ⚡</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3-Vault Companion Widget: Kho Công cụ (CC), Kho ICD-10 & Kho CDSS */}
        <div className="mt-5 p-3.5 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 border border-slate-200 rounded-lg flex flex-col gap-2.5 text-xs shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-1.5">
            <span className="font-bold text-slate-800 flex items-center gap-1.5 text-[11.5px]">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Trợ thủ Lâm sàng & Pháp lý BHYT Đồng hành</span>
            </span>
            <span className="text-[10.5px] font-mono-custom text-slate-500">
              Chuẩn hóa theo mã {top.b.icd}
            </span>
          </div>

          {/* Row 1: Matched Clinical Tools (Kho CC) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
            <span className="text-[11px] font-bold text-amber-800 shrink-0 flex items-center gap-1 min-w-[155px]">
              <span>🧮 Thang điểm lượng giá:</span>
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {matchedTools.length > 0 ? (
                matchedTools.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => onOpenVaultDrawer?.(undefined, t.title, 'CC')}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white hover:bg-amber-50 text-amber-900 border border-amber-300/80 text-[11px] font-semibold transition-colors cursor-pointer shadow-2xs"
                    title={t.snippet}
                  >
                    <span className="text-amber-600">◈</span>
                    <span className="truncate max-w-[220px]">{t.title}</span>
                  </button>
                ))
              ) : (
                <button
                  type="button"
                  onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'CC')}
                  className="text-[11px] text-slate-500 hover:text-blue-600 italic cursor-pointer"
                >
                  Duyệt tất cả 19 công cụ lâm sàng →
                </button>
              )}
            </div>
          </div>

          {/* Row 2: ICD-10 & BHYT Auditing (Kho ICD-10) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
            <span className="text-[11px] font-bold text-sky-800 shrink-0 flex items-center gap-1 min-w-[155px]">
              <span>🏷️ Mã hóa & Hồ sơ BHYT:</span>
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {icd10Guides.slice(0, 3).map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => onOpenVaultDrawer?.(undefined, g.title, 'ICD10')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white hover:bg-sky-50 text-sky-900 border border-sky-300/80 text-[11px] font-semibold transition-colors cursor-pointer shadow-2xs"
                  title={g.snippet}
                >
                  <span className="text-sky-600">✓</span>
                  <span className="truncate max-w-[220px]">{g.title}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => onOpenVaultDrawer?.(undefined, '50 bẫy lỗi', 'ICD10')}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-[10.5px] font-bold transition-colors cursor-pointer"
                title="Mở Sổ tay 50+ bẫy lỗi xuất toán BHYT thường gặp"
              >
                <span>🛡️ 50+ Bẫy lỗi BHYT</span>
              </button>
            </div>
          </div>

          {/* Row 3: CDSS Clinical Decision Support (Kho CDSS) */}
          {cdssAlerts.length > 0 && (
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
              <span className="text-[11px] font-bold text-purple-800 shrink-0 flex items-center gap-1 min-w-[155px]">
                <span>⚡ Hỗ trợ ra quyết định (CDSS):</span>
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {cdssAlerts.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onOpenVaultDrawer?.(undefined, c.title, 'CDSS')}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white hover:bg-purple-50 text-purple-900 border border-purple-300/80 text-[11px] font-semibold transition-colors cursor-pointer shadow-2xs"
                    title={c.snippet}
                  >
                    <span className="text-purple-600">⚡</span>
                    <span className="truncate max-w-[240px]">{c.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3.5 border-t border-slate-200">
          <button
            id="btn-goto-protocol-top"
            onClick={() => onGoToProtocol(top.b.id)}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-md shadow-xs cursor-pointer transition-colors"
          >
            <span>Xem toàn bộ phác đồ điều trị</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onOpenVaultDrawer?.(top.b.ten, top.b.icd)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold text-xs rounded-md cursor-pointer transition-colors shadow-2xs"
            title="Tra cứu bài viết & phác đồ tương ứng từ Kho tri thức 2.400+ bài viết"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Tra cứu Vault EBM</span>
          </button>

          <button
            id="btn-print-report"
            onClick={onPrintReport}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs rounded-md cursor-pointer transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In báo cáo / Tải PDF</span>
          </button>

          {results.length > 1 && (
            <button
              type="button"
              onClick={() => setShowMatrix(!showMatrix)}
              className="flex items-center gap-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-md cursor-pointer transition-colors"
            >
              <Columns3 className="w-3.5 h-3.5 text-slate-500" />
              <span>{showMatrix ? 'Ẩn ma trận so sánh' : 'So sánh đối đầu'}</span>
            </button>
          )}

        </div>
      </div>

      {/* Head-to-Head Differential Comparison Matrix */}
      {showMatrix && results.length > 1 && (
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Columns3 className="w-4 h-4 text-blue-600" />
              <h4 className="font-display font-bold text-sm text-slate-800">
                Ma trận so sánh đối đầu (Differential Diagnosis Comparison Matrix)
              </h4>
            </div>
            <span className="text-xs text-slate-500">So sánh Top 3 chẩn đoán hàng đầu</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {results.slice(0, 3).map((res, i) => (
              <div
                key={res.b.id}
                className={`p-3 rounded-lg border flex flex-col justify-between ${
                  i === 0
                    ? 'bg-blue-50/50 border-blue-200 ring-1 ring-blue-300'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-xs text-slate-800">{res.b.ten}</span>
                    <span className="font-mono-custom text-[11px] font-bold text-blue-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      {res.pct}%
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mb-2 font-mono-custom">
                    ICD: {res.b.icd} {res.b.baoDong ? '· ⚑ Cấp cứu' : ''}
                  </div>

                  <div className="text-xs space-y-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-600 uppercase block">
                        Đã khớp ({res.matched.length}):
                      </span>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {res.matched.slice(0, 4).map((m, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-700"
                          >
                            {m.tc.ten}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-amber-700 uppercase block">
                        Cần thêm để phân biệt:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {res.missing.slice(0, 3).map((m, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 bg-amber-50 border border-amber-200 rounded text-[10px] text-amber-900"
                          >
                            {m.tc.ten}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => onGoToProtocol(res.b.id)}
                    className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Phác đồ</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Differential Diagnoses (Chẩn đoán phân biệt) */}
      {differentials.length > 0 && (
        <div className="flex flex-col gap-3 mt-2">
          {/* Differentials header with filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 rounded-lg p-2.5 px-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded flex items-center justify-center bg-slate-800 text-white text-xs font-bold font-mono-custom">
                Σ
              </span>
              <h3 className="font-display text-sm font-bold text-slate-800">
                Chẩn đoán phân biệt ({differentials.length})
              </h3>
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                (cần loại trừ hoặc theo dõi sát)
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Filter buttons */}
              <div className="flex border border-slate-200 rounded-md overflow-hidden p-0.5 bg-slate-100 text-xs">
                <button
                  type="button"
                  onClick={() => setDiffFilter('all')}
                  className={`px-2 py-0.5 font-semibold rounded cursor-pointer transition-all ${
                    diffFilter === 'all'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  type="button"
                  onClick={() => setDiffFilter('alert')}
                  className={`px-2 py-0.5 font-semibold rounded cursor-pointer transition-all ${
                    diffFilter === 'alert'
                      ? 'bg-red-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ⚑ Cấp cứu
                </button>
                <button
                  type="button"
                  onClick={() => setDiffFilter('high')}
                  className={`px-2 py-0.5 font-semibold rounded cursor-pointer transition-all ${
                    diffFilter === 'high'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ≥ 20%
                </button>
              </div>

              {/* Search input */}
              <div className="relative">
                <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-2" />
                <input
                  type="text"
                  value={searchDiff}
                  onChange={(e) => setSearchDiff(e.target.value)}
                  placeholder="Lọc tên, ICD..."
                  className="pl-7 pr-2 py-1 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500 text-slate-800 w-32 sm:w-40"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {differentials.map((diff) => {
              const isExpanded = expandedDiffs[diff.b.id] || false;
              const barColor =
                diff.pct >= 70 ? 'bg-blue-600' : diff.pct >= 40 ? 'bg-amber-500' : 'bg-slate-400';

              return (
                <div
                  key={diff.b.id}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-3.5 sm:p-4 shadow-xs transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-col gap-1 max-w-xl">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-bold text-sm text-slate-800">
                          {diff.b.ten}
                        </span>
                        {diff.b.baoDong && (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-red-50 text-red-700 border border-red-200 rounded flex items-center gap-1">
                            <ShieldAlert className="w-3 h-3" />
                            <span>⚑ KHÔNG THỂ BỎ QUA</span>
                          </span>
                        )}
                        <span className="px-1.5 py-0.5 text-[10px] font-mono-custom bg-slate-800 text-white rounded">
                          {diff.b.icd}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {diff.b.ghiChuBaoDong ? `${diff.b.ghiChuBaoDong} · ` : ''}
                        Phù hợp {diff.matched.length}/{diff.b.dd.length} dữ kiện:{' '}
                        {diff.matched
                          .slice(0, 3)
                          .map((m) => m.tc.ten)
                          .join(', ')}
                        {diff.matched.length > 3 ? '...' : ''}
                      </div>
                    </div>

                    {/* Progress Bar & Protocol button */}
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end w-24 sm:w-28">
                        <span className="font-display font-bold text-base text-slate-800">
                          {diff.pct}%
                        </span>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${barColor}`}
                            style={{ width: `${diff.pct}%` }}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onOpenVaultDrawer?.(diff.b.ten, diff.b.icd)}
                        className="px-2 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs font-semibold text-amber-800 rounded transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                        title={`Tra cứu công cụ lượng giá (CC), mã ICD-10 & phác đồ cho ${diff.b.ten}`}
                      >
                        <span>🧮</span>
                        <span className="hidden sm:inline">Thang điểm & ICD</span>
                      </button>

                      <button
                        onClick={() => onGoToProtocol(diff.b.id)}
                        className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 rounded transition-colors cursor-pointer"
                      >
                        Phác đồ →
                      </button>
                    </div>
                  </div>

                  {/* Expand / Collapse Details */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => toggleExpand(diff.b.id)}
                      className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                    >
                      <span>{isExpanded ? 'Thu gọn chi tiết' : 'Xem bằng chứng khớp & cần bổ sung'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-2 flex flex-col gap-2 text-xs">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {diff.matched.map((m, idx) => (
                            <li
                              key={idx}
                              className="p-1.5 bg-slate-50 border border-slate-200 rounded text-[11px] flex items-center justify-between"
                            >
                              <span className="text-slate-800">{m.tc.ten}</span>
                              <b className="font-mono-custom text-blue-600">+{m.w}</b>
                            </li>
                          ))}
                        </ul>

                        {diff.missing.length > 0 && (
                          <div className="p-2 bg-amber-50 border border-amber-200 rounded text-[11px] text-slate-800">
                            <b className="text-amber-800">Cần thêm để phân biệt: </b>
                            {diff.missing
                              .sort((a, b) => b.w - a.w)
                              .slice(0, 3)
                              .map((m) => `${m.tc.ten} (+${m.w})`)
                              .join(' · ')}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
