import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  HelpCircle,
  ShieldAlert,
  ShieldX,
} from 'lucide-react';
import { DailyTimelinePhase } from '../../lib/dailyTreatmentTimeline.ts';
import { SeverityGradingItem } from '../../../data/diagnostic-criteria-database.ts';

interface ClinicalCautionsSectionProps {
  cautionItems: string[];
  timelinePhases: DailyTimelinePhase[];
  activeSeverityGrade?: SeverityGradingItem;
  structuredCautions?: {
    cautions?: string[];
    contraindications?: string[];
    dischargeCriteria?: string[];
  };
}

export const ClinicalCautionsSection: React.FC<ClinicalCautionsSectionProps> = ({
  cautionItems,
  timelinePhases,
  activeSeverityGrade,
  structuredCautions,
}) => {
  // Phân loại tự động 3 nhóm:
  // [1] Lưu ý & Cảnh báo quan trọng
  // [2] Chống chỉ định (CCĐ)
  // [3] Tiêu chuẩn xuất viện hoặc chuyển tuyến

  const contraindications: string[] = [];
  const criticalAlerts: string[] = [];
  const dischargeCriteria: Array<{ dayRange?: string; phaseName?: string; text: string }> = [];

  // 0. Nạp trực tiếp từ structuredCautions của Enriched JSON (nếu có)
  if (structuredCautions?.cautions && Array.isArray(structuredCautions.cautions)) {
    structuredCautions.cautions.forEach((c) => {
      if (c && !criticalAlerts.includes(c)) criticalAlerts.push(c);
    });
  }
  if (structuredCautions?.contraindications && Array.isArray(structuredCautions.contraindications)) {
    structuredCautions.contraindications.forEach((cc) => {
      if (cc && !contraindications.includes(cc)) contraindications.push(cc);
    });
  }
  if (structuredCautions?.dischargeCriteria && Array.isArray(structuredCautions.dischargeCriteria)) {
    structuredCautions.dischargeCriteria.forEach((dc) => {
      if (dc && !dischargeCriteria.some((x) => x.text === dc)) {
        dischargeCriteria.push({ text: dc });
      }
    });
  }

  // 1. Phân loại từ cautionItems (phacDo.luuY)
  cautionItems.forEach((item) => {
    const lower = item.toLowerCase();
    if (/ccđ|chống chỉ định|cấm|tuyệt đối không|không được dùng|tránh dùng/i.test(lower)) {
      if (!contraindications.includes(item)) contraindications.push(item);
    } else if (/xuất viện|ra viện|chuyển tuyến|chuyển tầng|chuyển viện|tiêu chuẩn ra|tiêu chí ra/i.test(lower)) {
      if (!dischargeCriteria.some((x) => x.text === item)) dischargeCriteria.push({ text: item });
    } else {
      if (!criticalAlerts.includes(item)) criticalAlerts.push(item);
    }
  });

  // 2. Phân loại từ timelinePhases
  timelinePhases.forEach((phase) => {
    if (phase.cautionsAndDischarge?.cautions) {
      phase.cautionsAndDischarge.cautions.forEach((c) => {
        const lower = c.toLowerCase();
        if (/ccđ|chống chỉ định|cấm|tuyệt đối không|không được dùng/i.test(lower)) {
          if (!contraindications.includes(c)) contraindications.push(c);
        } else {
          if (!criticalAlerts.includes(c)) criticalAlerts.push(`[${phase.dayRange}] ${c}`);
        }
      });
    }

    if (phase.cautionsAndDischarge?.triageOrDischargeCriteria) {
      dischargeCriteria.push({
        dayRange: phase.dayRange,
        phaseName: phase.phaseName,
        text: phase.cautionsAndDischarge.triageOrDischargeCriteria,
      });
    }
  });

  // Fallbacks nếu danh sách trống
  if (contraindications.length === 0) {
    contraindications.push(
      'Không dùng thuốc khi bệnh nhân có tiền sử dị ứng hoặc sốc phản vệ với hoạt chất/tá dược liên quan.',
      'Thận trọng tối đa và hiệu chỉnh liều khi bệnh nhân có suy gan nặng, suy thận giai đoạn cuối chưa lọc máu.'
    );
  }

  if (criticalAlerts.length === 0) {
    criticalAlerts.push(
      'Theo dõi sát sinh hiệu mỗi 2-4 giờ trong 24 giờ đầu nhập viện hoặc sau khi thay đổi phác đồ.',
      'Báo động khẩn khi bệnh nhân có rối loạn tri giác, tụt huyết áp (MAP < 65 mmHg) hoặc khó thở cấp.'
    );
  }

  if (dischargeCriteria.length === 0) {
    dischargeCriteria.push({
      text: 'Hết sốt liên tục ≥ 48 giờ không dùng thuốc hạ sốt, sinh hiệu ổn định, ăn uống sinh hoạt bình thường.',
    });
    dischargeCriteria.push({
      text: 'Các chỉ số cận lâm sàng cải thiện rõ rệt: Tiểu cầu có xu hướng tăng, bạch cầu hồi phục, chức năng gan thận ổn định.',
    });
  }

  return (
    <div className="space-y-4">
      {/* Content: 3 Visual Blocks */}
      <div className="space-y-4">
        {/* [1] Lưu ý, cảnh báo quan trọng */}
        <div className="bg-amber-50/60 border border-amber-200/90 rounded-xl p-3.5 sm:p-4 shadow-2xs">
          <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-amber-200/80">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-amber-600 text-white flex items-center justify-center shadow-2xs">
                <AlertOctagon className="w-3.5 h-3.5" />
              </div>
              <h5 className="font-bold text-xs sm:text-sm text-amber-950">
                [1] Lưu ý &amp; Cảnh báo quan trọng (Critical Safety Warnings)
              </h5>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-200/80 text-amber-900 border border-amber-300">
              {criticalAlerts.length} cảnh báo
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {criticalAlerts.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-white border border-amber-200/80 shadow-2xs flex items-start gap-2.5 text-xs text-slate-800"
              >
                <span className="text-amber-600 font-bold shrink-0 mt-0.5">⚠️</span>
                <span className="leading-relaxed font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* [2] Chống chỉ định (CCĐ) */}
        <div className="bg-rose-50/60 border border-rose-200/90 rounded-xl p-3.5 sm:p-4 shadow-2xs">
          <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-rose-200/80">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-rose-600 text-white flex items-center justify-center shadow-2xs">
                <ShieldX className="w-3.5 h-3.5" />
              </div>
              <h5 className="font-bold text-xs sm:text-sm text-rose-950">
                [2] Chống chỉ định &amp; Thuốc cấm dùng (Contraindications)
              </h5>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-200/80 text-rose-900 border border-rose-300">
              {contraindications.length} điều cấm
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {contraindications.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-white border border-rose-200/80 shadow-2xs flex items-start gap-2.5 text-xs text-rose-950"
              >
                <span className="text-rose-600 font-bold shrink-0 mt-0.5">🚫</span>
                <span className="leading-relaxed font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* [3] Tiêu chuẩn xuất viện hoặc chuyển tuyến */}
        <div className="bg-emerald-50/60 border border-emerald-200/90 rounded-xl p-3.5 sm:p-4 shadow-2xs">
          <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-emerald-200/80">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center shadow-2xs">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <h5 className="font-bold text-xs sm:text-sm text-emerald-950">
                [3] Tiêu chuẩn xuất viện hoặc chuyển tuyến (Discharge &amp; Triage Criteria)
              </h5>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-200/80 text-emerald-900 border border-emerald-300">
              Quy chuẩn BYT / EBM
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {dischargeCriteria.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-white rounded-lg border border-emerald-200 shadow-2xs flex flex-col justify-between gap-2 text-xs"
              >
                <div>
                  {item.dayRange && (
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="px-2 py-0.2 rounded text-[10.5px] font-bold font-mono-custom bg-emerald-100 text-emerald-900 border border-emerald-200">
                        {item.dayRange}
                      </span>
                      {item.phaseName && (
                        <span className="text-[10px] font-semibold text-slate-500 truncate">
                          {item.phaseName.replace(/Giai đoạn\s*/i, '')}
                        </span>
                      )}
                    </div>
                  )}
                  <p className="text-[11.5px] text-slate-800 leading-relaxed font-medium">
                    {item.text}
                  </p>
                </div>

                <div className="pt-1.5 border-t border-slate-100 flex items-center gap-1.5 text-[10.5px] text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Đích an toàn cho phép ra viện / chuyển tầng</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
