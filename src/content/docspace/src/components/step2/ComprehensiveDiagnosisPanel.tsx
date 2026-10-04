import React, { useState, useMemo } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Copy,
  Droplet,
  Droplets,
  Edit3,
  ExternalLink,
  Flame,
  Gauge,
  HeartPulse,
  Info,
  Layers,
  Microscope,
  Pill,
  Printer,
  RotateCcw,
  Scale,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  Thermometer,
  Timer,
  Zap,
} from 'lucide-react';
import {
  AnalysisResult,
  ClinicalFormState,
  EpidemiologyContext,
  LabsState,
  ProblemStatementEntry,
  TrieuChung,
  VitalsState,
} from '../../types.ts';
import {
  ComprehensiveDiagnosisResult,
  synthesizeComprehensiveDiagnosis,
} from '../../lib/diagnosticSynthesis.ts';

interface ComprehensiveDiagnosisPanelProps {
  topResult: AnalysisResult | null;
  results: AnalysisResult[];
  form: ClinicalFormState;
  vitals: VitalsState;
  labs: LabsState;
  selectedSymptoms: TrieuChung[];
  negatedSymptoms: TrieuChung[];
  problems?: ProblemStatementEntry[];
  epiContext?: EpidemiologyContext;
  onGoToStep?: (stepId: 't1' | 't2' | 't3' | 't4') => void;
  onGoToProtocol?: (diseaseId: string, options?: { gradeIdx?: number; complicationId?: string }) => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
  onPrintReport?: () => void;
}

export const ComprehensiveDiagnosisPanel: React.FC<ComprehensiveDiagnosisPanelProps> = ({
  topResult,
  results,
  form,
  vitals,
  labs,
  selectedSymptoms,
  negatedSymptoms,
  problems = [],
  epiContext,
  onGoToStep,
  onGoToProtocol,
  onOpenVaultDrawer,
  onPrintReport,
}) => {
  const [activeTab, setActiveTab] = useState<'synthesis' | 'diagnosis' | 'protocol'>('diagnosis');
  const [copiedDiag, setCopiedDiag] = useState(false);
  const [copiedEmr, setCopiedEmr] = useState(false);
  const [isEditingCustomText, setIsEditingCustomText] = useState(false);
  const [customText, setCustomText] = useState('');

  // 1. Kích hoạt Synthesis Engine
  const synthesis: ComprehensiveDiagnosisResult = useMemo(() => {
    return synthesizeComprehensiveDiagnosis(
      topResult,
      results,
      form,
      vitals,
      labs,
      selectedSymptoms,
      negatedSymptoms,
      problems,
      epiContext
    );
  }, [topResult, results, form, vitals, labs, selectedSymptoms, negatedSymptoms, problems, epiContext]);

  const handleCopyDiagnosisLine = () => {
    navigator.clipboard.writeText(synthesis.fullDiagnosisString);
    setCopiedDiag(true);
    setTimeout(() => setCopiedDiag(false), 2000);
  };

  const handleCopyFullEmr = () => {
    const textToCopy = customText || synthesis.emrStructuredText;
    navigator.clipboard.writeText(textToCopy);
    setCopiedEmr(true);
    setTimeout(() => setCopiedEmr(false), 2000);
  };

  const fluidPlan = synthesis.correspondingProtocol.fluidPlan;
  const isDengue = synthesis.definitive.diseaseName.toLowerCase().includes('dengue') ||
    synthesis.definitive.diseaseName.toLowerCase().includes('sốt xuất huyết');

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all">
      {/* 1. HEADER CHÍNH: KHẲNG ĐỊNH QUY TRÌNH PHÂN TÍCH TỔNG HỢP TOÀN DIỆN */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 px-4 sm:px-6 py-4 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shadow-inner">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/30 border border-blue-400/40 text-blue-200 uppercase tracking-wider">
                Quy Trình Phân Tích Đa Trục CDSS
              </span>
              <span className="text-xs text-slate-300">
                Lâm sàng · Cận lâm sàng động học · Phác đồ cá thể hóa
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
              Phân Tích Thông Tin Toàn Diện & Bộ Chẩn Đoán Phác Đồ Tương Ứng
            </h2>
          </div>
        </div>

        {/* Quick Diagnostic Badge & CTAs */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleCopyDiagnosisLine}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
              copiedDiag
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
            }`}
            title="Sao chép chuỗi chẩn đoán 1 dòng cho EMR"
          >
            {copiedDiag ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedDiag ? 'Đã sao chép' : 'Chép CĐ 1-Dòng'}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyFullEmr}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
              copiedEmr
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400/40 shadow-xs'
            }`}
            title="Sao chép toàn bộ văn bản biện luận và phác đồ cho hồ sơ bệnh án"
          >
            {copiedEmr ? <Check className="w-3.5 h-3.5" /> : <ClipboardCheck className="w-3.5 h-3.5" />}
            <span>{copiedEmr ? 'Đã sao chép EMR' : 'Sao chép Hồ sơ EMR'}</span>
          </button>
        </div>
      </div>

      {/* 2. THANH TAB ĐIỀU HƯỚNG QUY TRÌNH (WORKFLOW STEPPER) & NÚT HÀNH ĐỘNG NHANH */}
      <div className="bg-slate-50 border-b border-slate-200 px-3 sm:px-6 py-2 sm:py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
          {/* Tab 1 */}
          <button
            type="button"
            onClick={() => setActiveTab('synthesis')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 shrink-0 ${
              activeTab === 'synthesis'
                ? 'bg-white text-blue-900 border border-blue-200 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Microscope className="w-4 h-4 text-blue-600 shrink-0" />
            <span>1. Ma Trận Dữ Kiện LS &amp; CLS</span>
            {synthesis.severityAndPhase.warningSignsPresent.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
            )}
          </button>

          {/* Tab 2 */}
          <button
            type="button"
            onClick={() => setActiveTab('diagnosis')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 shrink-0 ${
              activeTab === 'diagnosis'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Stethoscope className="w-4 h-4 shrink-0" />
            <span>2. Bộ Chẩn Đoán (5 Thành Tố)</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20 font-mono-custom">
              {synthesis.definitive.confidencePct}%
            </span>
          </button>

          {/* Tab 3 */}
          <button
            type="button"
            onClick={() => setActiveTab('protocol')}
            className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 shrink-0 ${
              activeTab === 'protocol'
                ? 'bg-white text-emerald-900 border border-emerald-300 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Droplet className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>3. Phác Đồ Tương Ứng &amp; Bù Dịch</span>
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
              {synthesis.correspondingProtocol.triageLevel.toUpperCase()}
            </span>
          </button>
        </div>

        {/* Nút hành động nhanh sang Bước 4 - Tối ưu di động & Web, không bị che khuất */}
        {onGoToProtocol && (
          <button
            type="button"
            onClick={() =>
              onGoToProtocol(synthesis.definitive.diseaseIcd ? topResult?.b.id || 'sot_xuat_huyet' : 'sot_xuat_huyet', {
                gradeIdx: synthesis.correspondingProtocol.targetBranchIndex,
              })
            }
            className="flex items-center justify-center gap-2 px-3.5 py-2 sm:py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer transition-all hover:translate-x-0.5 w-full sm:w-auto shrink-0 touch-manipulation"
            title="Áp dụng toàn bộ chẩn đoán và chuyển sang Bước 4 (Phác đồ điều trị)"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-200 shrink-0 hidden sm:inline" />
            <span>Áp dụng vào Phác đồ (Bước 4)</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        )}
      </div>

      {/* 3. NỘI DUNG CHÍNH THEO TỪNG TAB */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* ========================================================================= */}
        {/* TAB 1: MA TRẬN PHÂN TÍCH TỔNG HỢP LÂM SÀNG & CẬN LÂM SÀNG                 */}
        {/* ========================================================================= */}
        {activeTab === 'synthesis' && (
          <div className="space-y-6">
            {/* 1A. Timeline Ngày Bệnh & Giai Đoạn Bệnh Sinh */}
            <div className="p-4 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 border border-blue-200 rounded-xl">
              <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-semibold uppercase">Động học ngày bệnh:</span>
                    <h3 className="text-sm font-bold text-slate-900">
                      {synthesis.definitive.diseaseDayText} &bull; {synthesis.severityAndPhase.phaseName} ({synthesis.severityAndPhase.phaseDayRange})
                    </h3>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-200">
                  {synthesis.severityAndPhase.phaseKeyCharacteristics.split('.')[0]}
                </span>
              </div>

              {/* 3 Blocks Giai đoạn trực quan */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs mt-3">
                <div
                  className={`p-3 rounded-lg border transition-all ${
                    synthesis.severityAndPhase.phaseName.includes('Sốt')
                      ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/30'
                      : 'bg-white border-slate-200 opacity-70'
                  }`}
                >
                  <span className="font-bold text-amber-900 block mb-1">
                    Giai đoạn 1: Sốt (N1 - N3)
                  </span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Sốt cao đột ngột, đau cơ khớp, nhức đầu. Virus máu tăng cao. Cần bù nước đường uống và hạ sốt an toàn.
                  </p>
                </div>

                <div
                  className={`p-3 rounded-lg border transition-all ${
                    synthesis.severityAndPhase.phaseName.includes('Nguy hiểm')
                      ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-400/30 font-semibold'
                      : 'bg-white border-slate-200 opacity-70'
                  }`}
                >
                  <span className="font-bold text-rose-900 block mb-1 flex items-center justify-between">
                    <span>Giai đoạn 2: Nguy hiểm (N4 - N6)</span>
                    {synthesis.severityAndPhase.phaseName.includes('Nguy hiểm') && (
                      <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
                    )}
                  </span>
                  <p className="text-rose-950 text-[11px] leading-relaxed">
                    Thoát huyết tương đỉnh điểm, Hct tăng cao, tiểu cầu giảm nhanh. Thời điểm vàng dễ xảy ra SỐC DENGUE.
                  </p>
                </div>

                <div
                  className={`p-3 rounded-lg border transition-all ${
                    synthesis.severityAndPhase.phaseName.includes('Hồi phục')
                      ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400/30'
                      : 'bg-white border-slate-200 opacity-70'
                  }`}
                >
                  <span className="font-bold text-emerald-900 block mb-1">
                    Giai đoạn 3: Hồi phục (N7 - N10)
                  </span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Tái hấp thu dịch vào lòng mạch, tiểu nhiều, ăn ngon miệng. CẢNH BÁO QUÁ TẢI DỊCH NẾU TIẾP TỤC TRUYỀN.
                  </p>
                </div>
              </div>
            </div>

            {/* 1B. Cận Lâm Sàng Động Học (Dynamic Paraclinical Workup) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span>Dữ kiện cận lâm sàng động học & Mức độ cô đặc máu:</span>
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  Tự động đối chiếu với ngưỡng chuẩn Bộ Y Tế
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {/* Hct */}
                <div
                  className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                    parseFloat(labs.lHct || '0') >= 44
                      ? 'bg-rose-50/90 border-rose-300 text-rose-950'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                      Hematocrit (Hct)
                    </span>
                    <div className="text-lg font-extrabold text-slate-900 font-mono-custom flex items-baseline gap-1">
                      <span>{labs.lHct || '--'}</span>
                      <span className="text-xs font-normal text-slate-500">%</span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-200/60 text-[11px]">
                    {parseFloat(labs.lHct || '0') >= 46 ? (
                      <span className="font-bold text-rose-700 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" /> Cô đặc máu nghiêm trọng
                      </span>
                    ) : parseFloat(labs.lHct || '0') >= 42 ? (
                      <span className="font-semibold text-amber-700">Hct tăng / Cảnh báo thoát dịch</span>
                    ) : (
                      <span className="text-slate-500">Trong giới hạn nền</span>
                    )}
                  </div>
                </div>

                {/* Tiểu cầu */}
                <div
                  className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                    parseFloat(labs.lTC || '150') < 50
                      ? 'bg-rose-50/90 border-rose-300 text-rose-950'
                      : parseFloat(labs.lTC || '150') < 100
                      ? 'bg-amber-50/90 border-amber-300 text-amber-950'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                      Tiểu cầu (PLT)
                    </span>
                    <div className="text-lg font-extrabold text-slate-900 font-mono-custom flex items-baseline gap-1">
                      <span>{labs.lTC || '--'}</span>
                      <span className="text-xs font-normal text-slate-500">G/L</span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-200/60 text-[11px]">
                    {parseFloat(labs.lTC || '150') < 50 ? (
                      <span className="font-bold text-rose-700 flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5" /> Giảm rất nặng (&lt; 50 G/L)
                      </span>
                    ) : parseFloat(labs.lTC || '150') < 100 ? (
                      <span className="font-bold text-amber-700">Giảm cảnh báo (&lt; 100 G/L)</span>
                    ) : (
                      <span className="text-slate-500">Tiểu cầu bình thường</span>
                    )}
                  </div>
                </div>

                {/* Bạch cầu */}
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                      Bạch cầu (WBC)
                    </span>
                    <div className="text-lg font-extrabold text-slate-900 font-mono-custom flex items-baseline gap-1">
                      <span>{labs.lBC || '--'}</span>
                      <span className="text-xs font-normal text-slate-500">G/L</span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-200/60 text-[11px]">
                    {parseFloat(labs.lBC || '6') < 4.0 ? (
                      <span className="text-blue-700 font-medium">Bạch cầu giảm (Ức chế tủy do virus)</span>
                    ) : parseFloat(labs.lBC || '6') > 10.0 ? (
                      <span className="text-amber-700 font-medium">Bạch cầu tăng (Nghi bội nhiễm)</span>
                    ) : (
                      <span className="text-slate-500">Bạch cầu bình thường</span>
                    )}
                  </div>
                </div>

                {/* Men gan AST/ALT */}
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
                      Men Gan (AST / ALT)
                    </span>
                    <div className="text-lg font-extrabold text-slate-900 font-mono-custom flex items-baseline gap-1">
                      <span>{labs.lAST || '--'}</span>
                      <span className="text-xs font-normal text-slate-500">/</span>
                      <span>{labs.lALT || '--'}</span>
                      <span className="text-xs font-normal text-slate-500">U/L</span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-200/60 text-[11px]">
                    {parseFloat(labs.lAST || '0') >= 1000 || parseFloat(labs.lALT || '0') >= 1000 ? (
                      <span className="font-bold text-rose-700 flex items-center gap-1">
                        <AlertOctagon className="w-3.5 h-3.5" /> Suy gan cấp (≥ 1000)
                      </span>
                    ) : (
                      <span className="text-slate-500">Theo dõi tổn thương tế bào gan</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 1C. Đánh Giá Dấu Hiệu Cảnh Báo (Warning Signs Checklist) */}
            <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Dấu hiệu cảnh báo nguy cơ diễn tiến nặng (Warning Signs):</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-200 text-amber-900 font-mono-custom">
                  {synthesis.severityAndPhase.warningSignsPresent.length} Dấu hiệu
                </span>
              </div>

              {synthesis.severityAndPhase.warningSignsPresent.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {synthesis.severityAndPhase.warningSignsPresent.map((sign, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-white border border-amber-300 text-xs text-amber-950 font-medium flex items-center gap-2 shadow-2xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-white/80 rounded-lg text-xs text-slate-600 border border-amber-200">
                  Chưa phát hiện dấu hiệu cảnh báo nguy cơ chuyển độ nặng trên lâm sàng và cận lâm sàng hiện tại.
                </div>
              )}
            </div>

            {/* 1D. Thể Trạng & Cân Nặng Tính Dịch (BMI & AdjBW Calculator) */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold text-slate-800 uppercase">
                    Đánh giá thể trạng & Cơ chế tính liều dịch an toàn:
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                  {synthesis.comorbidities.bmiCategoryText}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mt-3">
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 block mb-0.5">Cân nặng thực tế (TBW):</span>
                  <span className="text-base font-bold text-slate-900 font-mono-custom">
                    {fluidPlan?.actualWeightKg || 60} kg
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">Cân nặng cân được</span>
                </div>

                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-[11px] text-slate-500 block mb-0.5">Cân nặng lý tưởng (IBW - Devine):</span>
                  <span className="text-base font-bold text-blue-900 font-mono-custom">
                    {fluidPlan?.idealBodyWeightKg || 55} kg
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-1">Chuẩn theo chiều cao</span>
                </div>

                <div className="p-3 bg-indigo-50/80 rounded-lg border border-indigo-200">
                  <span className="text-[11px] text-indigo-900 font-semibold block mb-0.5">
                    Cân nặng hiệu chỉnh tính dịch (AdjBW):
                  </span>
                  <span className="text-base font-extrabold text-indigo-950 font-mono-custom">
                    {fluidPlan?.prescribedWeightKg || 55} kg
                  </span>
                  <span className="text-[11px] text-indigo-700 block mt-1 font-medium">
                    {fluidPlan?.weightBasis === 'adjusted' ? 'Áp dụng AdjBW chống phù phổi' : 'Áp dụng cân nặng thực'}
                  </span>
                </div>
              </div>

              {fluidPlan?.weightRationale && (
                <p className="mt-2 text-xs text-slate-600 leading-relaxed italic">
                  &bull; {fluidPlan.weightRationale}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: BỘ CHẨN ĐOÁN TOÀN DIỆN 5 THÀNH TỐ (COMPREHENSIVE DIAGNOSIS)        */}
        {/* ========================================================================= */}
        {activeTab === 'diagnosis' && (
          <div className="space-y-5">
            {/* THẺ TỔNG HỢP CHẨN ĐOÁN HOÀN CHỈNH 1 DÒNG (ONE-LINE SUMMARY CARD) */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 via-indigo-50/60 to-blue-50 border border-blue-200 shadow-2xs">
              <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ClipboardCheck className="w-4 h-4 text-blue-600" />
                  <span>Bộ chẩn đoán hoàn chỉnh theo chuẩn hồ sơ bệnh án:</span>
                </span>
                <span className="text-[11px] text-blue-700 font-semibold bg-blue-100 px-2 py-0.5 rounded">
                  Quy cách EMR / HIS
                </span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-blue-200/80 text-sm font-semibold text-slate-900 leading-relaxed font-display">
                {synthesis.fullDiagnosisString}
              </div>
            </div>

            {/* 5 CỘT THÀNH TỐ CHẨN ĐOÁN CHUYÊN SÂU */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Thành tố 1: Chẩn đoán Xác định / Bệnh chính */}
              <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-950 uppercase tracking-wide flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">1</span>
                    Chẩn đoán xác định / Bệnh chính:
                  </span>
                  <span className="text-xs font-mono-custom font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    ICD-10: {synthesis.definitive.diseaseIcd}
                  </span>
                </div>
                <div className="text-base font-extrabold text-blue-950">
                  {synthesis.definitive.diseaseName.toUpperCase()}
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>&bull; <span className="font-semibold">Thời điểm:</span> {synthesis.definitive.diseaseDayText}</div>
                  <div>&bull; <span className="font-semibold">Căn nguyên:</span> {synthesis.definitive.pathogen}</div>
                  <div>&bull; <span className="font-semibold">Mức độ tương thích CDSS:</span> {synthesis.definitive.confidencePct}%</div>
                </div>
              </div>

              {/* Thành tố 2: Phân độ & Giai đoạn bệnh sinh */}
              <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">2</span>
                    Phân độ lâm sàng & Giai đoạn:
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      synthesis.severityAndPhase.severityLevel === 'critical'
                        ? 'bg-rose-100 text-rose-800'
                        : synthesis.severityAndPhase.severityLevel === 'severe'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {synthesis.severityAndPhase.severityLevel.toUpperCase()}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {synthesis.severityAndPhase.gradeName}
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>&bull; <span className="font-semibold">Giai đoạn:</span> {synthesis.severityAndPhase.phaseName}</div>
                  <div>&bull; <span className="font-semibold">Dấu hiệu cảnh báo:</span> {synthesis.severityAndPhase.warningSignsPresent.length > 0 ? synthesis.severityAndPhase.warningSignsPresent.join(', ') : 'Chưa có'}</div>
                </div>
              </div>

              {/* Thành tố 3: Biến chứng hiện tại & Nguy cơ */}
              <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px]">3</span>
                  Biến chứng & Dự báo nguy cơ:
                </span>
                <div className="text-xs text-slate-700 space-y-1.5">
                  {synthesis.complications.identified.length > 0 ? (
                    <div>
                      <span className="font-semibold text-rose-900">Biến chứng hiện có:</span>
                      <ul className="list-disc pl-4 mt-0.5 space-y-0.5 text-rose-950 font-medium">
                        {synthesis.complications.identified.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="text-slate-500 italic">Chưa phát hiện biến chứng suy cơ quan</div>
                  )}

                  {synthesis.complications.riskForecast.length > 0 && (
                    <div className="pt-1 text-amber-900">
                      <span className="font-semibold">Dự báo nguy cơ:</span>
                      <span className="ml-1">{synthesis.complications.riskForecast.join('; ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Thành tố 4: Cơ địa & Bệnh đồng mắc */}
              <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">4</span>
                  Cơ địa & Bệnh đồng mắc (Phenotype):
                </span>
                <div className="text-xs text-slate-700 space-y-1">
                  <div>&bull; <span className="font-semibold">Thể trạng:</span> {synthesis.comorbidities.bmiCategoryText}</div>
                  <div>
                    &bull; <span className="font-semibold">Cân nặng:</span> Cân nặng thực {fluidPlan?.actualWeightKg} kg &bull; AdjBW tính dịch: <b className="text-indigo-900">{fluidPlan?.prescribedWeightKg} kg</b>
                  </div>
                  {synthesis.comorbidities.comorbidDiseases.length > 0 ? (
                    <div>&bull; <span className="font-semibold">Bệnh nền:</span> {synthesis.comorbidities.comorbidDiseases.join(', ')}</div>
                  ) : (
                    <div className="text-slate-500 italic">&bull; Không ghi nhận bệnh lý nền mạn tính nghiêm trọng</div>
                  )}
                </div>
              </div>
            </div>

            {/* Thành tố 5: Chẩn đoán Phân biệt & Đề xuất CLS loại trừ */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-700 text-white flex items-center justify-center text-[10px]">5</span>
                Chẩn đoán phân biệt cần loại trừ (Differentials):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs pt-1">
                {synthesis.differentials.map((diff, dIdx) => (
                  <div key={dIdx} className="p-3 bg-white rounded-lg border border-slate-200 shadow-2xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{diff.diseaseName}</span>
                      <span className="text-[10px] font-mono-custom text-slate-500">{diff.matchPct}%</span>
                    </div>
                    <div className="text-[11px] text-slate-600">
                      <span className="font-semibold text-slate-700">Đề xuất CLS loại trừ:</span>{' '}
                      <span className="text-blue-900 font-medium">{diff.confirmatoryExclusionTest}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PHÁC ĐỒ ĐIỀU TRỊ TƯƠNG ỨNG CÁ THỂ HÓA                              */}
        {/* ========================================================================= */}
        {activeTab === 'protocol' && (
          <div className="space-y-6">
            {/* 3A. Banner Tuyến Tiếp Nhận & Phân Tầng Phác Đồ */}
            <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50/50 to-white border border-emerald-300 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-emerald-800 font-bold uppercase tracking-wider block">
                    Phân Tầng Xử Trí Tương Ứng:
                  </span>
                  <h3 className="text-base font-extrabold text-emerald-950">
                    {synthesis.correspondingProtocol.triageTarget}
                  </h3>
                  <span className="text-xs text-slate-600">
                    Áp dụng nhánh: <b className="text-emerald-900">{synthesis.correspondingProtocol.targetBranchName}</b>
                  </span>
                </div>
              </div>

              {onGoToProtocol && (
                <button
                  type="button"
                  onClick={() =>
                    onGoToProtocol(topResult?.b.id || 'sot_xuat_huyet', {
                      gradeIdx: synthesis.correspondingProtocol.targetBranchIndex,
                    })
                  }
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-all flex items-center gap-1.5 self-start md:self-center"
                >
                  <span>Mở Bảng Y Lệnh Chi Tiết (Bước 4)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* 3B. BẢNG TÍNH LƯU LƯỢNG TRUYỀN DỊCH CÁ THỂ HÓA (FLUID RESUSCITATION CALCULATOR) */}
            {fluidPlan ? (
              <div className="p-4 sm:p-5 bg-white border border-blue-200 rounded-xl shadow-xs space-y-4">
                <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        Phác đồ Truyền Dịch Cá Thể Hóa theo Cân Nặng ({fluidPlan.prescribedWeightKg} kg)
                      </h4>
                      <span className="text-xs text-slate-500 font-medium">
                        Dung dịch khuyến cáo: <b className="text-blue-900">{fluidPlan.recommendedSolution}</b>
                      </span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-900 border border-blue-200 font-mono-custom">
                    Tổng ước tính: ~{fluidPlan.totalEstimated24hVolumeMl} ml/24h
                  </span>
                </div>

                {/* Bảng bậc thang truyền dịch chi tiết */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5 text-left">Giai đoạn bậc thang</th>
                        <th className="p-2.5 text-center">Lưu lượng (ml/kg/h)</th>
                        <th className="p-2.5 text-center bg-blue-50 text-blue-950">Lưu lượng giờ (ml/h)</th>
                        <th className="p-2.5 text-center bg-blue-100/60 text-blue-950 font-extrabold">Số giọt/phút</th>
                        <th className="p-2.5 text-left">Thời gian</th>
                        <th className="p-2.5 text-left">Ghi chú & Đánh giá lại</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {fluidPlan.steps.map((step, sIdx) => (
                        <tr key={sIdx} className="hover:bg-slate-50/70">
                          <td className="p-2.5 font-bold text-slate-900">{step.label}</td>
                          <td className="p-2.5 text-center font-mono-custom font-semibold text-slate-700">
                            {step.rateMlKgH} ml/kg/h
                          </td>
                          <td className="p-2.5 text-center font-mono-custom font-bold text-blue-900 bg-blue-50/40">
                            {step.rateMlPerHour} ml/h
                          </td>
                          <td className="p-2.5 text-center font-mono-custom font-extrabold text-blue-950 bg-blue-100/30">
                            {step.dropsPerMin} giọt/phút
                          </td>
                          <td className="p-2.5 text-slate-600 font-medium">{step.durationHours}</td>
                          <td className="p-2.5 text-slate-500 text-[11px] leading-tight">{step.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Cảnh báo an toàn và Tiêu chuẩn ngưng dịch */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2">
                  <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-lg space-y-1">
                    <span className="font-bold text-amber-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      Lưu ý an toàn dịch truyền:
                    </span>
                    <ul className="list-disc pl-4 text-amber-950 text-[11px] space-y-0.5">
                      {fluidPlan.safetyCautions.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-lg space-y-1">
                    <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Tiêu chuẩn ngưng truyền dịch (Tránh phù phổi):
                    </span>
                    <ul className="list-disc pl-4 text-emerald-950 text-[11px] space-y-0.5">
                      {fluidPlan.cessationCriteria.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl text-xs text-blue-900">
                <span className="font-bold block mb-1">Chỉ định bù dịch đường uống:</span>
                Tình trạng hiện tại chưa có chỉ định truyền dịch tĩnh mạch. Bù dịch đường uống bằng dung dịch Oresol, nước dừa xiêm, nước hoa quả 1.5 - 2 lít/ngày. Hẹn tái khám kiểm tra Hct mỗi 24 giờ.
              </div>
            )}

            {/* 3C. DANH MỤC Y LỆNH THUỐC TƯƠNG ỨNG BAN ĐẦU */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <Pill className="w-4 h-4 text-indigo-600" />
                <span>Danh mục Y lệnh Điều trị Tương ứng Ban đầu:</span>
              </span>

              <div className="space-y-2">
                {synthesis.correspondingProtocol.initialMedicationOrders.map((ord, oIdx) => (
                  <div
                    key={oIdx}
                    className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                      ord.isContraindicationAlert
                        ? 'bg-rose-50/90 border-rose-300 text-rose-950'
                        : 'bg-white border-slate-200 text-slate-900 shadow-2xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            ord.isContraindicationAlert
                              ? 'bg-rose-600 text-white'
                              : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
                          }`}
                        >
                          {ord.category}
                        </span>
                        <span className="font-bold text-slate-900 text-sm">{ord.name}</span>
                      </div>
                      <div className="text-slate-600 font-medium">
                        <span>Liều: <b className="text-slate-900">{ord.dosage}</b></span> &bull;{' '}
                        <span>Đường dùng: <b>{ord.route}</b></span> &bull;{' '}
                        <span>Tần suất: <b>{ord.frequency}</b></span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">{ord.clinicalInstruction}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D. Kế Hoạch Theo Dõi Cận Lâm Sàng & Tiêu Chuẩn Xuất Viện */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="font-bold text-slate-900 uppercase flex items-center gap-1.5">
                  <Timer className="w-4 h-4 text-blue-600" />
                  Kế hoạch kiểm tra cận lâm sàng & sinh hiệu:
                </span>
                <div className="space-y-2 text-[11px]">
                  {synthesis.correspondingProtocol.dynamicMonitoring.map((mon, mIdx) => (
                    <div key={mIdx} className="p-2 bg-white rounded border border-slate-200">
                      <div className="font-bold text-slate-900 flex justify-between">
                        <span>{mon.parameter}</span>
                        <span className="text-blue-700">{mon.frequency}</span>
                      </div>
                      <div className="text-slate-500 mt-0.5">Mục tiêu: {mon.targetGoal}</div>
                      <div className="text-rose-700 font-semibold mt-0.5">Ngưỡng báo động: {mon.alertThreshold}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="font-bold text-slate-900 uppercase flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Tiêu chuẩn xuất viện an toàn (Safe Discharge Checklist):
                </span>
                <div className="space-y-1.5 text-[11px]">
                  {synthesis.correspondingProtocol.safeDischargeCriteria.map((crit, cIdx) => (
                    <div key={cIdx} className="p-2 bg-white rounded border border-slate-200 flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700">{crit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. FOOTER HÀNH ĐỘNG LIÊN BƯỚC CHIẾN LƯỢC */}
      <div className="p-4 bg-slate-900 text-white border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center shrink-0 border border-blue-400/30">
            <ClipboardCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">
              Quy trình phân tích hoàn tất &bull; Đã xác lập phác đồ tương ứng
            </div>
            <div className="text-[11px] text-slate-300">
              Chuyển sang Bước 4 để điều chỉnh và duyệt y lệnh thuốc, dịch truyền và lộ trình theo dõi.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onGoToProtocol && (
            <button
              type="button"
              onClick={() =>
                onGoToProtocol(topResult?.b.id || 'sot_xuat_huyet', {
                  gradeIdx: synthesis.correspondingProtocol.targetBranchIndex,
                })
              }
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs cursor-pointer transition-all hover:translate-x-0.5"
            >
              <span>Xem Phác Đồ Chi Tiết (Bước 4)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {onOpenVaultDrawer && (
            <button
              type="button"
              onClick={() => onOpenVaultDrawer(synthesis.definitive.diseaseName, synthesis.definitive.diseaseIcd, 'PDDT')}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/20 font-medium text-xs rounded-xl cursor-pointer transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-300" />
              <span>Tra cứu EBM</span>
            </button>
          )}

          {onPrintReport && (
            <button
              type="button"
              onClick={onPrintReport}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/20 font-medium text-xs rounded-xl cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In PDF</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
