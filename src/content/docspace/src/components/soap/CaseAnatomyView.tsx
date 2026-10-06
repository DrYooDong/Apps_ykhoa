import React, { useState } from 'react';
import {
  AlertTriangle,
  Award,
  BookOpen,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  Flame,
  HeartPulse,
  Info,
  Layers,
  Lightbulb,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  Zap,
} from 'lucide-react';
import { SoapClinicalExperience } from '../../types.ts';
import { FormattedClinicalText } from './FormattedClinicalText.tsx';

interface CaseAnatomyViewProps {
  currentCase: SoapClinicalExperience;
  onNavigateTab: (tab: 'matrix' | 'problems' | 'roadmap' | 'reasoning' | 'markdown') => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
  className?: string;
}

export const CaseAnatomyView: React.FC<CaseAnatomyViewProps> = ({
  currentCase,
  onNavigateTab,
  onOpenVaultDrawer,
  className = '',
}) => {
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Trích xuất các nội dung pearls/pitfalls từ ca bệnh hoặc fallback
  const demographic = currentCase.demographicContext || 'Chưa có thông tin bối cảnh cụ thể.';
  const historyPearls = currentCase.s?.historyPearls || 'Ghi nhận đầy đủ diễn tiến thời gian và các mốc khởi phát triệu chứng then chốt.';
  const pitfalls = currentCase.o?.objectivePitfalls || 'Cần thận trọng phân biệt với các bệnh cảnh trùng lặp cận lâm sàng.';
  const diagnosticPearls = currentCase.a?.diagnosticPearls || currentCase.a?.reasoningCore || 'Biện luận chẩn đoán dựa trên sự hội tụ giữa lâm sàng, dịch tễ và xét nghiệm khách quan.';
  const takeaway = currentCase.p?.takeawayLessons || currentCase.p?.immediateActions || 'Nguyên tắc điều trị cá thể hóa, ưu tiên kiểm soát nguy cơ đe dọa tính mạng.';
  const outcome = currentCase.outcomeNotes || currentCase.p?.consultationOrReferral || 'Bệnh nhân được theo dõi và hồi phục theo phác đồ.';
  const source = currentCase.sourceReference || 'Hướng dẫn chẩn đoán và điều trị của Bộ Y tế Việt Nam';

  const handleCopySummary = async () => {
    const summaryText = `[GIẢI PHẪU CA BỆNH LÂM SÀNG: ${currentCase.title}]
- Mã ca: ${currentCase.id} | ICD-10: ${currentCase.a?.icd10 || 'N/A'} | Chuyên khoa: ${currentCase.specialty}
- Bối cảnh bệnh nhân: ${demographic}
- ⚡ Điểm tựa bệnh sử: ${historyPearls}
- ⚠️ Cận lâm sàng & Bẫy chẩn đoán: ${pitfalls}
- 🧠 Chìa khóa biện luận: ${diagnosticPearls}
- 🎯 Bài học điều trị: ${takeaway}
- 🏆 Kết cục: ${outcome}
- 📚 Nguồn: ${source}
(Trích xuất từ CliniPortal DocSpace SOAP)`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    } catch (e) {
      console.error('Lỗi sao chép:', e);
    }
  };

  return (
    <div id="soap-case-anatomy" className={`flex flex-col gap-4 ${className}`}>
      {/* 1. Header Banner & Action Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-3.5 sm:p-5 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5 sm:gap-4 border border-indigo-900/50">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 flex items-center gap-1 font-mono-custom uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-indigo-300" />
              <span>BENTO PEARLS &amp; PITFALLS</span>
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] sm:text-[10.5px] font-mono-custom bg-white/10 text-slate-300 border border-white/10">
              ICD-10: {currentCase.a?.icd10 || 'N/A'}
            </span>
            {currentCase.difficultyRating && (
              <span className="px-2 py-0.5 rounded-md text-[10px] sm:text-[10.5px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {'★'.repeat(currentCase.difficultyRating)} Độ khó {currentCase.difficultyRating}/5
              </span>
            )}
          </div>
          <h3 className="font-display text-base sm:text-xl font-bold tracking-tight text-white leading-snug">
            Giải Phẫu Ca Bệnh: {currentCase.title}
          </h3>
          <p className="text-xs text-indigo-200/80 leading-relaxed">
            Bản đồ tóm lược 6 trụ cột kinh nghiệm cốt lõi giúp bác sĩ nắm bắt thần tốc các điểm chốt lâm sàng, bẫy thường gặp và chiến lược an toàn kê đơn.
          </p>
        </div>

        <div className="w-full md:w-auto shrink-0 flex items-center justify-end">
          <button
            type="button"
            onClick={handleCopySummary}
            className="w-full md:w-auto px-3.5 py-2.5 sm:py-2 min-h-[42px] sm:min-h-[38px] rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/20 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs backdrop-blur-sm touch-manipulation"
          >
            {copiedSummary ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Đã sao chép tóm tắt!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-indigo-300" />
                <span>Sao chép tóm tắt 1-chạm</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Bento Grid 2x3 (6 Essential Pillars) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Pillar 1: Demographic & History Pearls */}
        <div className="bg-white border border-sky-200/90 rounded-2xl p-3.5 sm:p-4.5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200 flex items-center gap-1.5 font-mono-custom">
                <span className="w-2 h-2 rounded-full bg-sky-500" />
                <span>TRỤ CỘT 1: BỆNH SỬ &amp; BỐI CẢNH</span>
              </span>
              <span className="text-xs font-mono-custom text-slate-400 font-bold">#01</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-[11.5px] text-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Bối cảnh cơ địa:</span>
              <p className="font-semibold text-slate-800">{demographic}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-sky-900 flex items-center gap-1 uppercase tracking-wide">
                <span>⚡</span>
                <span>Hạt ngọc khai thác bệnh sử:</span>
              </span>
              <div className="text-xs text-slate-700 leading-relaxed bg-sky-50/40 p-2.5 rounded-xl border border-sky-100">
                <FormattedClinicalText text={historyPearls} />
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Xem triệu chứng chi tiết</span>
            <button
              type="button"
              onClick={() => onNavigateTab('matrix')}
              className="text-sky-700 font-semibold hover:text-sky-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Mục 1 (S)</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Pillar 2: Objective Pitfalls & Lab Traps */}
        <div className="bg-white border border-amber-200/90 rounded-2xl p-3.5 sm:p-4.5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5 font-mono-custom">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>TRỤ CỘT 2: BẪY LÂM SÀNG &amp; CLS</span>
              </span>
              <span className="text-xs font-mono-custom text-slate-400 font-bold">#02</span>
            </div>
            <div className="p-2.5 bg-amber-50/50 rounded-xl border border-amber-200/80 text-[11.5px] text-amber-950">
              <span className="text-[10px] text-amber-700 font-bold uppercase tracking-wider block mb-0.5">
                Cảnh báo sai sót cận lâm sàng:
              </span>
              <div className="text-xs leading-relaxed text-amber-950 font-medium">
                <FormattedClinicalText text={pitfalls} />
              </div>
            </div>
            {currentCase.o?.vitals && (
              <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between">
                <span>Dấu hiệu sinh tồn:</span>
                <span className="font-mono-custom font-semibold text-slate-800">
                  HA: {currentCase.o.vitals.bloodPressure || 'N/A'} · Mạch: {currentCase.o.vitals.heartRate || 'N/A'}
                </span>
              </div>
            )}
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Xem xét nghiệm chi tiết</span>
            <button
              type="button"
              onClick={() => onNavigateTab('matrix')}
              className="min-h-[36px] px-2 text-amber-800 font-semibold hover:text-amber-900 active:bg-amber-50 rounded-lg flex items-center gap-1 cursor-pointer touch-manipulation"
            >
              <span>Mục 2 (O)</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Pillar 3: Diagnostic Reasoning & Gold Standard */}
        <div className="bg-white border border-purple-200/90 rounded-2xl p-3.5 sm:p-4.5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200 flex items-center gap-1.5 font-mono-custom">
                <Scale className="w-3.5 h-3.5 text-purple-600" />
                <span>TRỤ CỘT 3: CHÌA KHÓA BIỆN LUẬN</span>
              </span>
              <span className="text-xs font-mono-custom text-slate-400 font-bold">#03</span>
            </div>
            <div className="p-2.5 bg-purple-50/40 rounded-xl border border-purple-100 text-xs text-slate-800 leading-relaxed">
              <span className="text-[10px] text-purple-700 font-bold uppercase tracking-wider block mb-0.5">
                Điểm tựa chẩn đoán &amp; Phân độ:
              </span>
              <FormattedClinicalText text={diagnosticPearls} />
            </div>
            {currentCase.a?.problemList && currentCase.a.problemList.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Ưu tiên hàng đầu:</span>
                <span className="px-2 py-0.5 rounded text-[10.5px] font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                  {currentCase.a.problemList[0]?.label || 'Tầng 1 cấp cứu'}
                </span>
              </div>
            )}
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Xem đặt vấn đề 3 tầng</span>
            <button
              type="button"
              onClick={() => onNavigateTab('problems')}
              className="min-h-[36px] px-2 text-purple-700 font-semibold hover:text-purple-900 active:bg-purple-50 rounded-lg flex items-center gap-1 cursor-pointer touch-manipulation"
            >
              <span>Tab Vấn Đề</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Pillar 4: Treatment Targets & Prescribing Safety */}
        <div className="bg-white border border-emerald-200/90 rounded-2xl p-3.5 sm:p-4.5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5 font-mono-custom">
                <Target className="w-3.5 h-3.5 text-emerald-600" />
                <span>TRỤ CỘT 4: CHIẾN LƯỢC ĐIỀU TRỊ</span>
              </span>
              <span className="text-xs font-mono-custom text-slate-400 font-bold">#04</span>
            </div>
            <div className="p-2.5 bg-emerald-50/40 rounded-xl border border-emerald-100 text-xs text-slate-800 leading-relaxed">
              <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block mb-0.5">
                Y lệnh then chốt &amp; Quy tắc ngưng/đổi thuốc:
              </span>
              <FormattedClinicalText text={takeaway} />
            </div>
            {currentCase.p?.medications && currentCase.p.medications.length > 0 && (
              <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between">
                <span>Số lượng thuốc chính:</span>
                <span className="font-mono-custom font-semibold text-emerald-800">
                  {currentCase.p.medications.length} nhóm thuốc
                </span>
              </div>
            )}
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Xem y lệnh &amp; lộ trình</span>
            <button
              type="button"
              onClick={() => onNavigateTab('roadmap')}
              className="min-h-[36px] px-2 text-emerald-700 font-semibold hover:text-emerald-900 active:bg-emerald-50 rounded-lg flex items-center gap-1 cursor-pointer touch-manipulation"
            >
              <span>Lộ Trình</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Pillar 5: Clinical Outcome & Discharge Criteria */}
        <div className="bg-white border border-blue-200/90 rounded-2xl p-3.5 sm:p-4.5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1.5 font-mono-custom">
                <Award className="w-3.5 h-3.5 text-blue-600" />
                <span>TRỤ CỘT 5: KẾT CỤC &amp; RA VIỆN</span>
              </span>
              <span className="text-xs font-mono-custom text-slate-400 font-bold">#05</span>
            </div>
            <div className="p-2.5 bg-blue-50/40 rounded-xl border border-blue-100 text-xs text-slate-800 leading-relaxed">
              <span className="text-[10px] text-blue-700 font-bold uppercase tracking-wider block mb-0.5">
                Diễn tiến lâm sàng &amp; Tiêu chuẩn ổn định:
              </span>
              <FormattedClinicalText text={outcome} />
            </div>
            {currentCase.p?.monitoringAndTargets && (
              <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Mục tiêu theo dõi:</span>
                <span className="line-clamp-2 text-slate-700 font-medium">{currentCase.p.monitoringAndTargets}</span>
              </div>
            )}
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Đọc toàn văn ca bệnh</span>
            <button
              type="button"
              onClick={() => onNavigateTab('markdown')}
              className="min-h-[36px] px-2 text-blue-700 font-semibold hover:text-blue-900 active:bg-blue-50 rounded-lg flex items-center gap-1 cursor-pointer touch-manipulation"
            >
              <span>Xem Markdown</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Pillar 6: Evidence, Guideline & Connected Tools */}
        <div className="bg-white border border-indigo-200/90 rounded-2xl p-3.5 sm:p-4.5 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200 flex items-center gap-1.5 font-mono-custom">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>TRỤ CỘT 6: CHỨNG CỨ &amp; KHO TRI THỨC</span>
              </span>
              <span className="text-xs font-mono-custom text-slate-400 font-bold">#06</span>
            </div>
            <div className="p-2.5 bg-indigo-50/40 rounded-xl border border-indigo-100 text-xs text-slate-800 leading-relaxed">
              <span className="text-[10px] text-indigo-700 font-bold uppercase tracking-wider block mb-0.5">
                Văn bản pháp lý &amp; Phác đồ gốc:
              </span>
              <p className="font-semibold text-slate-800">{source}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <button
                type="button"
                onClick={() => onOpenVaultDrawer?.(currentCase.title, currentCase.title)}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200 text-slate-700 font-semibold transition-colors cursor-pointer flex flex-col items-center gap-1 touch-manipulation"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[11px]">Kho Vault EBM</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'CC')}
                className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200 text-slate-700 font-semibold transition-colors cursor-pointer flex flex-col items-center gap-1 touch-manipulation"
              >
                <span>🧮</span>
                <span className="text-[11px]">Thang điểm LS</span>
              </button>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Mở toàn bộ 18 Kho tri thức</span>
            <button
              type="button"
              onClick={() => onOpenVaultDrawer?.(undefined, undefined, undefined)}
              className="min-h-[36px] px-2 text-indigo-700 font-semibold hover:text-indigo-900 active:bg-indigo-50 rounded-lg flex items-center gap-1 cursor-pointer touch-manipulation"
            >
              <span>Mở Drawer</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Cross-Project Clinical Bridges (Hệ Sinh Thái CliniPortal) */}
      <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-3.5 sm:p-4.5 mt-2 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <h4 className="font-display text-xs font-bold text-slate-900 uppercase tracking-wider">
              Liên Kết Đa Chiều Hệ Sinh Thái (Cross-Project Clinical Bridges)
            </h4>
          </div>
          <span className="text-[10.5px] text-slate-500 font-mono-custom hidden sm:inline">
            CliniPortal EBM Network
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Bridge 1: Cơ Sở Y Khoa */}
          <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/80 shadow-2xs space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono-custom uppercase">
                  🧬 CƠ SỞ Y KHOA (EBM)
                </span>
                <span className="text-[10px] text-slate-400">Guyton / Harper</span>
              </div>
              <h5 className="text-xs font-bold text-slate-800 leading-snug">
                Sinh lý &amp; Hóa sinh liên quan
              </h5>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Ôn lại cơ chế bệnh sinh, sinh lý chức năng tạng và dòng thác sinh hóa của ca này.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenVaultDrawer?.(currentCase.title, currentCase.title, 'SLB')}
              className="w-full mt-2 min-h-[38px] py-2 px-3 bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer touch-manipulation"
            >
              <span>Xem bài học Cơ sở</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
            </button>
          </div>

          {/* Bridge 2: Sơ đồ tiếp cận (Flowcharts) */}
          <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/80 shadow-2xs space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 font-mono-custom uppercase">
                  🧭 LƯU ĐỒ TIẾP CẬN
                </span>
                <span className="text-[10px] text-slate-400">Editorial SVG</span>
              </div>
              <h5 className="text-xs font-bold text-slate-800 leading-snug">
                Thuật toán chẩn đoán &amp; xử trí
              </h5>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Tra cứu lưu đồ phân nhánh trực quan theo triệu chứng và hướng dẫn Bộ Y tế.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenVaultDrawer?.(currentCase.title, currentCase.title, 'PDDT')}
              className="w-full mt-2 min-h-[38px] py-2 px-3 bg-sky-50 hover:bg-sky-100 active:bg-sky-200 text-sky-800 border border-sky-200 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer touch-manipulation"
            >
              <span>Mở Sơ đồ Phác đồ</span>
              <ExternalLink className="w-3.5 h-3.5 text-sky-700" />
            </button>
          </div>

          {/* Bridge 3: Standalone CDSS */}
          <div className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200/80 shadow-2xs space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 font-mono-custom uppercase">
                  ⚡ CDSS WEB MODULES
                </span>
                <span className="text-[10px] text-slate-400">Trợ lý tính toán</span>
              </div>
              <h5 className="text-xs font-bold text-slate-800 leading-snug">
                Hệ thống hỗ trợ ra quyết định
              </h5>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Máy tính bù dịch Dengue, phân tích khí máu ABG, thang điểm suy gan MELD/Child-Pugh.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'CDSS')}
              className="w-full mt-2 min-h-[38px] py-2 px-3 bg-purple-50 hover:bg-purple-100 active:bg-purple-200 text-purple-800 border border-purple-200 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer touch-manipulation"
            >
              <span>Khởi động Module CDSS</span>
              <ExternalLink className="w-3.5 h-3.5 text-purple-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
