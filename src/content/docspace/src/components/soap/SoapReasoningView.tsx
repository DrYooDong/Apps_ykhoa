import React from 'react';
import {
  AlertTriangle,
  Award,
  BookOpen,
  CheckCircle2,
  FileCheck,
  Flame,
  HelpCircle,
  Lightbulb,
  Scale,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Target,
  Zap,
} from 'lucide-react';
import { SoapClinicalExperience } from '../../types.ts';

interface SoapReasoningViewProps {
  currentCase: SoapClinicalExperience;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const SoapReasoningView: React.FC<SoapReasoningViewProps> = ({
  currentCase,
  onOpenVaultDrawer,
}) => {
  const clinicalReasoning = currentCase?.a?.clinicalReasoning || '';
  const historyPearls = currentCase?.historyPearls || currentCase?.s?.historyPearls || '';
  const objectivePitfalls = currentCase?.objectivePitfalls || currentCase?.o?.objectivePitfalls || '';
  const diagnosticPearls = currentCase?.diagnosticPearls || currentCase?.a?.diagnosticPearls || '';
  const takeawayLessons = currentCase?.takeawayLessons || currentCase?.p?.takeawayLessons || '';

  return (
    <div className="flex flex-col gap-5">
      {/* 1. Guideline & Evidence-Based Header Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Scale className="w-4 h-4" />
            </div>
            <h3 className="font-display text-lg font-bold text-slate-900 tracking-tight">
              Biện Luận Lâm Sàng &amp; Y Học Chứng Cứ (EBM)
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
              Evidence Based Medicine
            </span>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Phân tích chuyên sâu cơ sở chẩn đoán, biện giải các tiêu chí chỉ định điều trị và lựa chọn phác đồ
            tối ưu đối sánh với các Hướng dẫn Chẩn đoán &amp; Điều trị chính thức của Bộ Y tế.
          </p>
        </div>

        {/* Guideline reference badge & Vault shortcut */}
        <div className="flex items-center gap-2 flex-wrap">
          {currentCase.sourceReference && (
            <div className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-900">
              <span>Nguồn: </span>
              <span className="underline decoration-blue-300">{currentCase.sourceReference}</span>
            </div>
          )}
          <button
            type="button"
            onClick={() => onOpenVaultDrawer?.(currentCase.title, currentCase.title, 'GL')}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Tra cứu Hướng dẫn (GL)</span>
          </button>
        </div>
      </div>

      {/* 2. Primary Clinical Reasoning Text Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Biện Luận Lâm Sàng Chi Tiết Theo Tiêu Chuẩn Bộ Y Tế
            </h4>
          </div>
          <span className="text-[11px] font-mono-custom text-slate-500">
            {clinicalReasoning.length > 0 ? `${clinicalReasoning.length} ký tự biện giải` : 'Chưa có văn bản'}
          </span>
        </div>

        {clinicalReasoning ? (
          <div className="text-xs text-slate-800 leading-relaxed whitespace-pre-line space-y-3 font-sans">
            {clinicalReasoning}
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-slate-500">
            Ca bệnh này chưa cập nhật phân tích biện luận lâm sàng chuyên sâu.
          </div>
        )}
      </div>

      {/* 3. The Bento Grid: 4 Clinical Pearls & Pitfalls */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Bộ Tứ Hạt Ngọc Lâm Sàng &amp; Bẫy Cần Tránh (Pearls &amp; Pitfalls)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. History Pearls */}
          <div className="bg-white border border-sky-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:border-sky-300 transition-colors">
            <div className="space-y-2">
              <div className="flex items-center gap-2 border-b border-sky-100 pb-2">
                <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-sm">
                  ⚡
                </span>
                <div>
                  <h5 className="text-xs font-bold text-sky-950 uppercase tracking-wider">
                    Khai Thác Bệnh Sử (History Pearls)
                  </h5>
                  <p className="text-[10px] text-sky-600">Điểm then chốt trong hỏi bệnh</p>
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {historyPearls || 'Khai thác chính xác thời gian khởi phát và các triệu chứng báo hiệu.'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[10.5px] font-semibold text-sky-700">
              Giai đoạn S (Subjective)
            </div>
          </div>

          {/* 2. Objective Pitfalls */}
          <div className="bg-white border border-amber-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:border-amber-300 transition-colors">
            <div className="space-y-2">
              <div className="flex items-center gap-2 border-b border-amber-100 pb-2">
                <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                  ⚠️
                </span>
                <div>
                  <h5 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                    Bẫy Khám &amp; Cận Lâm Sàng (Objective Pitfalls)
                  </h5>
                  <p className="text-[10px] text-amber-600">Sai lầm thường gặp khi diễn giải CLS</p>
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {objectivePitfalls || 'Tránh bỏ sót giai đoạn cửa sổ hoặc các thay đổi sinh hiệu kín đáo.'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[10.5px] font-semibold text-amber-700">
              Giai đoạn O (Objective)
            </div>
          </div>

          {/* 3. Diagnostic Pearls */}
          <div className="bg-white border border-purple-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-colors">
            <div className="space-y-2">
              <div className="flex items-center gap-2 border-b border-purple-100 pb-2">
                <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                  🧠
                </span>
                <div>
                  <h5 className="text-xs font-bold text-purple-950 uppercase tracking-wider">
                    Đúc Kết Chẩn Đoán (Diagnostic Pearls)
                  </h5>
                  <p className="text-[10px] text-purple-600">Biện giải logic xác định bệnh</p>
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {diagnosticPearls || 'Tổng hợp hội chứng và đối chiếu tiêu chuẩn vàng để xác định bệnh.'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[10.5px] font-semibold text-purple-700">
              Giai đoạn A (Assessment)
            </div>
          </div>

          {/* 4. Takeaway Lessons */}
          <div className="bg-white border border-emerald-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-colors">
            <div className="space-y-2">
              <div className="flex items-center gap-2 border-b border-emerald-100 pb-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  🎯
                </span>
                <div>
                  <h5 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                    Bài Học Mang Về (Takeaway Lessons)
                  </h5>
                  <p className="text-[10px] text-emerald-600">Đúc kết giá trị chuyển giao thực tiễn</p>
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {takeawayLessons || 'Theo dõi tuân thủ phác đồ và đánh giá đáp ứng lâu dài của người bệnh.'}
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-100 text-[10.5px] font-semibold text-emerald-700">
              Giai đoạn P (Plan)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
