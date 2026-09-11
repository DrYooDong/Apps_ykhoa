import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  ClipboardCopy,
  Clock,
  Columns3,
  FileCheck,
  Filter,
  Flame,
  HeartPulse,
  Layers,
  Printer,
  Search,
  ShieldAlert,
  Sparkles,
  Stethoscope,
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
import { calculateClinicalRiskScore, ClinicalRiskScore } from '../lib/riskScore.ts';
import {
  getCdssForCondition,
  getIcd10Guidance,
  getKnowledgeVaultWebUrl,
  getToolsForDisease,
  VaultArticle,
} from '../lib/vaultBridge.ts';

interface Step2Props {
  kb: KnowledgeBase;
  results: AnalysisResult[];
  selectedCount: number;
  derivedCount: number;
  negatedCount: number;
  onGoToProtocol: (diseaseId: string) => void;
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

  const toggleExpand = (id: string) => {
    setExpandedDiffs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const top = results && results.length > 0 ? results[0] : null;

  // Calculate Clinical Risk Score
  const riskScore: ClinicalRiskScore = useMemo(() => {
    return calculateClinicalRiskScore(vitals, labs, results, form);
  }, [vitals, labs, results, form]);

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
    lines.push(`Phân tầng nguy cơ: ${riskScore.levelName} (${riskScore.totalScore} điểm) - ${riskScore.urgencyText}`);
    lines.push(`Khuyến nghị theo dõi: ${riskScore.monitoringFrequency}`);
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
    lines.push(`- ${riskScore.clinicalAction}`);
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

      {/* NEW FEATURE: Clinical Risk Score & Triage Urgency Level Card */}
      <div
        id="clinical-risk-score-card"
        className={`bg-white border ${riskScore.color.border} rounded-lg p-4 sm:p-5 shadow-xs transition-all`}
        style={{
          borderLeftWidth: '5px',
          borderLeftColor: riskScore.color.hex,
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          {/* Left Title & Urgency Description */}
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
                Thang điểm cảnh báo sớm NEWS2 / Cấp cứu
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
                {/* Level 1: Low (Green) */}
                <div
                  className={`flex-1 rounded-full transition-all ${
                    riskScore.level >= 1 ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                  title="Mức 1: Thấp (0-2 điểm)"
                />
                {/* Level 2: Medium (Yellow) */}
                <div
                  className={`flex-1 rounded-full transition-all ${
                    riskScore.level >= 2 ? 'bg-amber-500' : 'bg-slate-200'
                  }`}
                  title="Mức 2: Trung bình (3-4 điểm)"
                />
                {/* Level 3: High (Orange) */}
                <div
                  className={`flex-1 rounded-full transition-all ${
                    riskScore.level >= 3 ? 'bg-orange-500' : 'bg-slate-200'
                  }`}
                  title="Mức 3: Cao (5-6 điểm)"
                />
                {/* Level 4: Critical (Red) */}
                <div
                  className={`flex-1 rounded-full transition-all ${
                    riskScore.level >= 4 ? 'bg-rose-600 animate-pulse' : 'bg-slate-200'
                  }`}
                  title="Mức 4: Nguy kịch (≥7 điểm)"
                />
              </div>

              {/* Urgency scale ticks */}
              <div className="flex justify-between text-[10px] font-mono-custom text-slate-500 px-0.5">
                <span className={riskScore.level === 1 ? 'font-bold text-emerald-700' : ''}>
                  Thấp (0-2)
                </span>
                <span className={riskScore.level === 2 ? 'font-bold text-amber-700' : ''}>
                  Vừa (3-4)
                </span>
                <span className={riskScore.level === 3 ? 'font-bold text-orange-700' : ''}>
                  Cao (5-6)
                </span>
                <span className={riskScore.level === 4 ? 'font-bold text-rose-700' : ''}>
                  Nguy kịch (≥7)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Breakdown Toggle & Detail Table */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setShowScoreBreakdown(!showScoreBreakdown)}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline cursor-pointer self-start"
          >
            <span>
              {showScoreBreakdown
                ? 'Thu gọn bảng phân tích điểm'
                : `Xem chi tiết đóng góp điểm (${riskScore.breakdown.length} tiêu chuẩn)`}
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
          <div className="md:col-span-8 flex flex-col gap-2">
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

            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              {top.b.ten}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{top.b.tomTat}</p>

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

            {/* Matched Evidence Breakdown */}
            <div className="mt-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
                Bằng chứng khớp ({top.matched.length} dữ kiện):
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {top.matched.map((m, idx) => {
                  const roleConfig = ROLE_LABELS[m.role];
                  return (
                    <li
                      key={idx}
                      className="p-2 bg-slate-50 border border-slate-200 rounded-md text-xs flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="font-medium text-slate-800 truncate">{m.tc.ten}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${roleConfig.badgeClass}`}>
                          {roleConfig.label}
                        </span>
                        <span className="text-[10px] text-slate-400 italic">· {m.via}</span>
                      </div>
                      <b className="font-mono-custom text-blue-600 shrink-0">+{m.w}</b>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Missing criteria to confirm */}
            {top.missing.length > 0 && (
              <div className="mt-2 p-2.5 bg-amber-50 border border-amber-200 rounded-md text-xs text-slate-800">
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

            {/* 3-Vault Companion Widget: Kho Công cụ (CC), Kho ICD-10 & Kho CDSS */}
            <div className="mt-3 p-3 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 border border-slate-200 rounded-lg flex flex-col gap-2.5 text-xs shadow-2xs">
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
            <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-slate-200">
              <button
                id="btn-goto-protocol-top"
                onClick={() => onGoToProtocol(top.b.id)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-md shadow-xs cursor-pointer transition-colors"
              >
                <span>Xem phác đồ điều trị</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onOpenVaultDrawer?.(top.b.ten, top.b.icd)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold text-xs rounded-md cursor-pointer transition-colors shadow-2xs"
                title="Tra cứu bài viết & phác đồ tương ứng từ Kho tri thức 2.400+ bài viết"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>Tra cứu Vault EBM</span>
              </button>



              <button
                id="btn-print-report"
                onClick={onPrintReport}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs rounded-md cursor-pointer transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>In báo cáo / Tải PDF</span>
              </button>

              {results.length > 1 && (
                <button
                  type="button"
                  onClick={() => setShowMatrix(!showMatrix)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-md cursor-pointer transition-colors"
                >
                  <Columns3 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{showMatrix ? 'Ẩn ma trận so sánh' : 'So sánh đối đầu'}</span>
                </button>
              )}

              <span className="font-mono-custom text-[11px] text-slate-400 ml-auto">
                Khớp {top.matched.length}/{top.b.dd.length} tiêu chuẩn trong kho
              </span>
            </div>
          </div>
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
