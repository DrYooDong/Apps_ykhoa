import React, { useMemo } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  HeartPulse,
  Info,
  Milestone,
  Pill,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { SoapClinicalExperience } from '../../types.ts';
import { FormattedClinicalText } from './FormattedClinicalText.tsx';

interface SoapRoadmapViewProps {
  currentCase: SoapClinicalExperience;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

interface ParsedStage {
  stageNumber: number;
  stageTitle: string;
  stageBody: string;
}

export const SoapRoadmapView: React.FC<SoapRoadmapViewProps> = ({
  currentCase,
  onOpenVaultDrawer,
}) => {
  const roadmapRaw = currentCase?.p?.treatmentRoadmap || '';
  const medications = currentCase?.p?.medications || [];

  // Tách các giai đoạn từ treatmentRoadmap dựa trên #### 1. Giai đoạn 1... hoặc - **Giai đoạn 1...**:
  const stages: ParsedStage[] = useMemo(() => {
    if (!roadmapRaw) return [];

    const lines = roadmapRaw.split(/\r?\n/);
    const result: ParsedStage[] = [];
    let current: { title: string; bodyLines: string[] } | null = null;

    for (const line of lines) {
      const trimmed = line.trim();
      // Check if line is a stage header:
      // 1) #### 1. Giai đoạn 1: ...
      // 2) - **Giai đoạn 1: ...**:
      // 3) **Giai đoạn 1: ...**
      // 4) 1. **Giai đoạn 1: ...**
      const headerMatch = trimmed.match(
        /^(?:#{2,4}\s*(?:\d+[.)]\s*)?|[-*•]\s*\*\*|\*\*|\d+[.)]\s*\*\*)(Giai đoạn\s*\d+[\s\S]*?)(?:\*\*)?:?\s*$/i
      );

      if (headerMatch) {
        if (current) {
          result.push({
            stageNumber: result.length + 1,
            stageTitle: current.title,
            stageBody: current.bodyLines.join('\n').trim(),
          });
        }
        current = {
          title: headerMatch[1].replace(/^[*_`#\s]+|[*_`#:\s]+$/g, '').trim(),
          bodyLines: [],
        };
      } else if (current) {
        current.bodyLines.push(line);
      }
    }

    if (current) {
      result.push({
        stageNumber: result.length + 1,
        stageTitle: current.title,
        stageBody: current.bodyLines.join('\n').trim(),
      });
    }

    return result;
  }, [roadmapRaw]);

  // Trích xuất chuỗi sơ đồ tóm tắt dạng [Khởi trị...] ──► [Tuần 4...]
  const timelineDiagram = useMemo(() => {
    const codeMatch = roadmapRaw.match(/```(?:\w+)?\n([\s\S]*?)```/);
    if (codeMatch) {
      return codeMatch[1].trim();
    }
    const arrowLine = roadmapRaw.split('\n').find((l) => l.includes('──►') || l.includes('->'));
    return arrowLine ? arrowLine.trim() : null;
  }, [roadmapRaw]);

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {/* 1. Header Banner & Overview */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Lộ Trình Điều Trị &amp; Giám Sát Lâm Sàng
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-teal-100 text-teal-900 border border-teal-200">
              Protocol Driven
            </span>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Quy hoạch toàn diện lộ trình dùng thuốc, các mốc xét nghiệm đánh giá đáp ứng vi rút / lâm sàng,
            quản trị an toàn tương tác thuốc (DDI) và tiêu chuẩn ngưng thuốc chuẩn y học chứng cứ.
          </p>
        </div>

        {/* Action / Vault link */}
        <div className="w-full md:w-auto flex items-center justify-end">
          <button
            type="button"
            onClick={() => onOpenVaultDrawer?.(undefined, undefined, 'PT')}
            className="w-full md:w-auto px-3.5 py-2 min-h-[38px] rounded-xl bg-teal-50 hover:bg-teal-100 active:bg-teal-200 text-teal-800 border border-teal-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer touch-manipulation"
          >
            <Compass className="w-3.5 h-3.5 text-teal-700" />
            <span>Kho Phác đồ (PT)</span>
          </button>
        </div>
      </div>

      {/* 2. Visual Timeline Flowchart Diagram (if present) */}
      {timelineDiagram && (
        <div className="bg-slate-900 text-slate-100 border border-slate-800 rounded-2xl p-3.5 sm:p-5 shadow-xs overflow-x-auto touch-pan-x">
          <div className="text-[11px] font-mono uppercase tracking-wider text-teal-400 mb-2 flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Sơ Đồ Mốc Thời Gian (Timeline Milestones)</span>
          </div>
          <pre className="font-mono text-[11px] sm:text-xs text-teal-200 whitespace-pre overflow-x-auto leading-relaxed">
            {timelineDiagram}
          </pre>
        </div>
      )}

      {/* 3. Milestone Stages Cards Grid */}
      {stages.length > 0 ? (
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Milestone className="w-4 h-4 text-teal-600" />
            <span>Các Giai Đoạn Giám Sát Cụ Thể ({stages.length} Giai Đoạn)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {stages.map((stg) => (
              <div
                key={stg.stageNumber}
                className="bg-white border border-teal-200/90 rounded-2xl p-3.5 sm:p-4 shadow-xs flex flex-col justify-between hover:border-teal-300 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-teal-100">
                    <span className="w-6 h-6 rounded-lg bg-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {stg.stageNumber}
                    </span>
                    <h4 className="font-display text-xs font-bold text-teal-950 leading-snug line-clamp-2">
                      {stg.stageTitle}
                    </h4>
                  </div>
                  <div className="text-xs text-slate-700 leading-relaxed space-y-1">
                    <FormattedClinicalText text={stg.stageBody} bulletColor="emerald" />
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-teal-700 font-semibold flex items-center justify-between">
                  <span>Mục tiêu: Đạt đáp ứng</span>
                  <span className="flex items-center gap-1">
                    <span>Đúng hẹn</span>
                    <Clock className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : roadmapRaw ? (
        /* Render raw roadmap content if no specific #### stages are matched */
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-5 shadow-xs space-y-2">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
            <Milestone className="w-4 h-4 text-teal-600" />
            <span>Nội Dung Lộ Trình Điều Trị &amp; Giám Sát</span>
          </div>
          <div className="text-xs text-slate-800 leading-relaxed p-2">
            <FormattedClinicalText text={roadmapRaw} bulletColor="emerald" />
          </div>
        </div>
      ) : null}

      {/* 4. Structured Medications: Dual Mobile Cards & Desktop Table */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-3.5 sm:p-4 px-4 sm:px-5 bg-teal-50/70 border-b border-teal-100 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Pill className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-bold text-teal-950 uppercase tracking-wider">
              Y Lệnh Thuốc Điều Trị ({medications.length} Loại Thuốc)
            </span>
          </div>
          <span className="text-[10.5px] sm:text-[11px] text-teal-800 font-medium">
            Chuẩn phác đồ Bộ Y tế
          </span>
        </div>

        {medications.length > 0 ? (
          <>
            {/* Mobile View: Stacked Medication Cards (< md) */}
            <div className="block md:hidden divide-y divide-slate-100 p-2 sm:p-3 space-y-2.5">
              {medications.map((med, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-3 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-teal-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h5 className="font-display text-xs font-bold text-teal-950 leading-snug">
                        {med.drug}
                      </h5>
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[10.5px] font-mono-custom font-bold bg-teal-100 text-teal-900 border border-teal-200 shrink-0">
                      {med.route}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs bg-white p-2 rounded-lg border border-slate-200/60">
                    <span className="text-slate-500 font-medium text-[11px]">Liều dùng:</span>
                    <span className="font-mono-custom font-bold text-slate-900">
                      {med.dose}
                    </span>
                  </div>

                  {med.note && (
                    <div className="text-[11px] text-slate-700 bg-amber-50/50 border border-amber-100 p-2 rounded-lg leading-relaxed">
                      <span className="text-[10px] text-amber-800 font-bold uppercase tracking-wider block mb-0.5">
                        Lưu ý lâm sàng:
                      </span>
                      {med.note}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop View: Full 5-Column Table (>= md) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                    <th className="py-3 px-4 w-12 text-center">STT</th>
                    <th className="py-3 px-4 min-w-[220px]">Tên Thuốc &amp; Hoạt Chất</th>
                    <th className="py-3 px-4 min-w-[160px]">Liều Dùng &amp; Cách Dùng</th>
                    <th className="py-3 px-4 w-28 text-center">Đường Dùng</th>
                    <th className="py-3 px-4 min-w-[240px]">Lưu Ý &amp; Dược Lâm Sàng</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {medications.map((med, idx) => (
                    <tr key={idx} className="hover:bg-teal-50/20 transition-colors">
                      <td className="py-3 px-4 text-center font-bold text-slate-500">
                        {idx + 1}
                      </td>
                      <td className="py-3 px-4 font-bold text-teal-950">
                        {med.drug}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800 font-mono-custom">
                        {med.dose}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-md text-[11px] font-mono-custom font-bold bg-slate-100 text-slate-800 border border-slate-200">
                          {med.route}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 leading-relaxed">
                        {med.note || 'Theo dõi dung nạp lâm sàng'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="p-6 text-center text-xs text-slate-500">
            Không ghi nhận y lệnh thuốc đặc hiệu hoặc bệnh nhân điều trị hỗ trợ không dùng thuốc.
          </div>
        )}
      </div>

      {/* 5. Safety, Discontinuation & Lifestyle Dual Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Discontinuation & Referral Criteria */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <AlertOctagon className="w-4 h-4 text-red-600" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Tiêu Chuẩn Ngưng Thuốc / Chuyển Tuyến
            </h4>
          </div>

          {currentCase.p.discontinuationCriteria ? (
            <div className="p-3 bg-red-50/50 border border-red-200/80 rounded-xl text-xs text-red-950 leading-relaxed">
              <FormattedClinicalText text={currentCase.p.discontinuationCriteria} bulletColor="red" />
            </div>
          ) : (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 italic">
              Duy trì điều trị và tái khám định kỳ theo lịch hẹn của bác sĩ điều trị.
            </div>
          )}

          {currentCase.p.consultationOrReferral && (
            <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1.5">
              <span className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Chỉ Định Hội Chẩn / Chuyển Tuyến:</span>
              </span>
              <FormattedClinicalText text={currentCase.p.consultationOrReferral} bulletColor="amber" />
            </div>
          )}
        </div>

        {/* Lifestyle & Counseling */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
            <HeartPulse className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Chế Độ Sinh Hoạt &amp; Tư Vấn Sống Khỏe
            </h4>
          </div>

          {currentCase.p.lifestyleAndCounseling ? (
            <div className="p-3 bg-emerald-50/50 border border-emerald-200/80 rounded-xl text-xs text-emerald-950 leading-relaxed">
              <FormattedClinicalText text={currentCase.p.lifestyleAndCounseling} bulletColor="emerald" />
            </div>
          ) : (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 italic">
              Nghỉ ngơi, dinh dưỡng cân đối và kiêng cữ các chất gây hại cho gan/thận.
            </div>
          )}

          {/* Takeaway Lessons Callout */}
          {currentCase.p.takeawayLessons && (
            <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl text-xs text-blue-950 space-y-1.5">
              <span className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Bài Học Thực Chiến Đúc Kết:</span>
              </span>
              <FormattedClinicalText text={currentCase.p.takeawayLessons} bulletColor="blue" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
