import React, { useMemo } from 'react';
import {
  MessageSquareQuote,
  Clock,
  User,
  Users,
  MapPin,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { SoapSubjective } from '../../types.ts';
import { FormattedClinicalText } from './FormattedClinicalText.tsx';

interface SoapSubjectiveColumnProps {
  s: SoapSubjective;
  isFocused?: boolean;
}

export const SoapSubjectiveColumn: React.FC<SoapSubjectiveColumnProps> = ({
  s,
  isFocused = false,
}) => {
  // Tự động phân tách bệnh sử thành các mốc thời gian nếu có từ khóa ngày/thời điểm
  const timelineSteps = useMemo(() => {
    if (!s.historyOfPresentIllness) return [];
    const lines = s.historyOfPresentIllness.split('\n').map((l) => l.trim()).filter(Boolean);
    const steps: { label: string; text: string }[] = [];

    lines.forEach((line) => {
      const match = line.match(/^[-*•]?\s*(\*\*.*?\*\*|Ngày\s*\d+[^:]*|Cách lúc[^:]*|Thời điểm[^:]*|Khởi phát[^:]*):?\s*(.*)$/i);
      if (match) {
        steps.push({
          label: match[1].replace(/\*\*/g, '').trim(),
          text: match[2].trim(),
        });
      }
    });

    return steps;
  }, [s.historyOfPresentIllness]);

  return (
    <div className="bg-white border border-sky-200/90 rounded-2xl shadow-xs flex flex-col overflow-hidden hover:border-sky-300 transition-colors h-full">
      {/* Column Header */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-cyan-700 text-white p-3.5 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center font-display font-black text-sm text-white shadow-inner">
            S
          </div>
          <div>
            <h3 className="font-display font-bold text-xs uppercase tracking-wider">
              SUBJECTIVE
            </h3>
            <p className="text-[10.5px] text-sky-100">
              Chủ quan · Bệnh sử &amp; Khai thác lâm sàng
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-sky-800/70 text-sky-100 text-[10px] font-mono-custom font-semibold border border-sky-400/30 flex items-center gap-1">
          <span>👂</span>
          <span>Lắng nghe</span>
        </span>
      </div>

      <div className={`p-4 flex-1 flex flex-col gap-4 text-xs text-slate-800 bg-white ${isFocused ? 'max-w-5xl mx-auto w-full' : ''}`}>
        {/* 1. THAN PHIỀN CHÍNH (CHIEF COMPLAINT) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-600"></span>
              <span>1. Than phiền chính (Chief Complaint):</span>
            </span>
            <span className="text-[10px] text-sky-700 font-semibold bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
              Lý do vào viện
            </span>
          </div>

          <div className="p-3.5 bg-gradient-to-br from-sky-50/90 via-sky-50/40 to-white border border-sky-200 rounded-xl shadow-2xs relative overflow-hidden">
            <div className="absolute right-2 top-1 text-sky-200/50 pointer-events-none">
              <MessageSquareQuote className="w-10 h-10" />
            </div>
            <p className="font-semibold text-sky-950 leading-relaxed text-[12.5px] relative z-10">
              "{s.chiefComplaint}"
            </p>
          </div>
        </div>

        {/* 2. DIỄN TIẾN BỆNH SỬ (PQRST TIMELINE) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-600" />
              <span>2. Diễn tiến bệnh sử (PQRST):</span>
            </span>
            {timelineSteps.length > 0 && (
              <span className="text-[10px] text-slate-500 font-medium">
                {timelineSteps.length} mốc diễn tiến
              </span>
            )}
          </div>

          {timelineSteps.length > 1 ? (
            <div className="bg-slate-50/90 p-3.5 rounded-xl border border-slate-200/80 flex flex-col gap-3 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-0.5 before:bg-sky-200">
              {timelineSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 relative z-10">
                  <div className="w-3.5 h-3.5 rounded-full bg-sky-500 border-2 border-white shadow-xs shrink-0 mt-0.5" />
                  <div className="flex-1 bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-2xs">
                    <div className="font-bold text-sky-900 text-[11px] mb-0.5">
                      {step.label}
                    </div>
                    <div className="text-slate-700 leading-relaxed text-[11.5px]">
                      {step.text || step.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <FormattedClinicalText
              text={s.historyOfPresentIllness}
              className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80"
            />
          )}
        </div>

        {/* 3. BỘ 3 TIỀN CĂN & BỐI CẢNH DỊCH TỄ HỌC (BUNG RỘNG TOÀN DIỆN - KHÔNG ĐÓNG KHUÔN NHỎ) */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-600"></span>
              <span>3. Tiền căn &amp; Bối cảnh dịch tễ:</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
              PMH &amp; Dịch tễ
            </span>
          </div>

          <div className="w-full bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-3.5">
            {/* 3a. Tiền căn bản thân & Dược sử */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold text-[11px]">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10.5px] font-bold bg-sky-100 text-sky-900 border border-sky-200">
                  <User className="w-3 h-3 text-sky-700" />
                  <span>Bản thân &amp; Dược sử</span>
                </span>
                <span className="text-[10.5px] text-slate-500 font-normal">
                  (Bệnh nền, thuốc mạn tính, dị ứng)
                </span>
              </div>
              <div className="pl-1 pt-0.5">
                <FormattedClinicalText
                  text={s.pastMedicalHistory || 'Chưa ghi nhận tiền căn đặc biệt'}
                  className="text-[12px] text-slate-800 leading-relaxed"
                  bulletColor="blue"
                />
              </div>
            </div>

            {/* 3b. Tiền căn gia đình */}
            {s.familyHistory && (
              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-[11px]">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10.5px] font-bold bg-indigo-100 text-indigo-900 border border-indigo-200">
                    <Users className="w-3 h-3 text-indigo-700" />
                    <span>Gia đình &amp; Di truyền</span>
                  </span>
                  <span className="text-[10.5px] text-slate-500 font-normal">
                    (Ung thư, tim mạch, bệnh lý huyết thống)
                  </span>
                </div>
                <div className="pl-1 pt-0.5">
                  <FormattedClinicalText
                    text={s.familyHistory}
                    className="text-[12px] text-slate-800 leading-relaxed"
                    bulletColor="amber"
                  />
                </div>
              </div>
            )}

            {/* 3c. Bối cảnh dịch tễ & Phơi nhiễm */}
            {s.epidemiology && (
              <div className="pt-3 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold text-[11px]">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10.5px] font-bold bg-cyan-100 text-cyan-950 border border-cyan-200">
                    <MapPin className="w-3 h-3 text-cyan-700" />
                    <span>Bối cảnh dịch tễ &amp; Phơi nhiễm</span>
                  </span>
                  <span className="text-[10.5px] text-slate-500 font-normal">
                    (Ổ dịch, vector, đường lây, vùng lưu hành)
                  </span>
                </div>
                <div className="pl-1 pt-0.5">
                  <FormattedClinicalText
                    text={s.epidemiology}
                    className="text-[12px] text-slate-800 leading-relaxed"
                    bulletColor="emerald"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. TRIỆU CHỨNG CƠ NĂNG (SYMPTOM CHIPS CLOUD) */}
        {s.symptomsList && s.symptomsList.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-600"></span>
                <span>4. Triệu chứng cơ năng ghi nhận:</span>
              </span>
              <span className="text-[10px] text-slate-500 font-semibold font-mono-custom">
                {s.symptomsList.length} dấu hiệu
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {s.symptomsList.map((sym, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-900 border border-sky-200 font-medium text-[11px] flex items-center gap-1 hover:bg-sky-100/70 transition-colors shadow-2xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                  <span>{sym}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 5. HẠT NGỌC KHAI THÁC BỆNH SỬ (HISTORY PEARL) */}
        {s.historyPearls && (
          <div className="mt-auto pt-2">
            <div className="p-3.5 bg-gradient-to-r from-sky-50/90 to-cyan-50/60 border-l-4 border-l-sky-500 border border-sky-200 rounded-r-xl text-sky-950 shadow-2xs">
              <div className="flex items-center gap-1.5 font-display font-bold text-[11px] text-sky-900 mb-1.5">
                <Lightbulb className="w-4 h-4 text-sky-600 shrink-0" />
                <span>BÀI HỌC KHAI THÁC BỆNH SỬ (HISTORY PEARL)</span>
              </div>
              <p className="text-xs text-sky-950/90 leading-relaxed italic">
                {s.historyPearls}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
