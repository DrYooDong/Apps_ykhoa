import React, { useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  ArrowUpRight,
  Ban,
  Building2,
  Check,
  CheckCircle2,
  CheckSquare,
  Droplet,
  FileCheck2,
  HelpCircle,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Sparkles,
  Stethoscope,
  Syringe,
  Zap,
} from 'lucide-react';
import { DailyTimelinePhase } from '../../lib/dailyTreatmentTimeline.ts';
import { SeverityGradingItem } from '../../../data/diagnostic-criteria-database.ts';
import {
  ClinicalIndicationGroup,
  ClinicalIndicationItem,
  PatientPhenotype,
} from '../../types.ts';

export interface StructuredCautions {
  cautions?: string[];
  contraindications?: string[];
  dischargeCriteria?: string[];
  clinicalIndications?: Array<ClinicalIndicationGroup | ClinicalIndicationItem | string>;
  treatmentIndications?: Array<ClinicalIndicationGroup | ClinicalIndicationItem | string>;
  indications?: Array<ClinicalIndicationGroup | ClinicalIndicationItem | string>;
}

interface ClinicalCautionsSectionProps {
  cautionItems: string[];
  timelinePhases: DailyTimelinePhase[];
  activeSeverityGrade?: SeverityGradingItem;
  specificTreatmentNotice?: string;
  patientPhenotype?: PatientPhenotype;
  structuredCautions?: StructuredCautions;
}

export const ClinicalCautionsSection: React.FC<ClinicalCautionsSectionProps> = ({
  cautionItems,
  timelinePhases,
  activeSeverityGrade,
  specificTreatmentNotice,
  patientPhenotype,
  structuredCautions,
}) => {
  // State quản lý checklist tiêu chuẩn ra viện
  const [checkedDischargeIndices, setCheckedDischargeIndices] = useState<Set<number>>(new Set());

  const toggleDischargeCheck = (idx: number) => {
    setCheckedDischargeIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  // Phân loại:
  // [1] Chỉ định Điều trị & Tiêu chuẩn Can thiệp (Truyền máu, Dịch cao phân tử, Thở máy...)
  // [2] Lưu ý & Cảnh báo quan trọng
  // [3] Chống chỉ định (CCĐ)
  // [4] Tiêu chuẩn xuất viện hoặc chuyển tuyến

  const contraindications: string[] = [];
  const criticalAlerts: string[] = [];
  const dischargeCriteria: Array<{ dayRange?: string; phaseName?: string; text: string }> = [];

  // 0. Bổ sung các Cờ Đỏ Ngữ Cảnh Cá Thể Hóa từ PatientPhenotype
  if (patientPhenotype?.hasRenalRisk) {
    const renalText = `🚫 [CƠ ĐỊA THẬN]: Chống chỉ định tuyệt đối NSAIDs & Aminoglycoside liều cao ở bệnh nhân có suy giảm chức năng thận (eGFR ${patientPhenotype.eGfr || '< 60'} mL/ph).`;
    if (!contraindications.includes(renalText)) contraindications.push(renalText);

    const alertText = `⚠️ [BILAN THẬN]: Theo dõi thể tích nước tiểu mỗi 4–6 giờ (duy trì ≥ 0.5 mL/kg/h) và kiểm tra lại Creatinine, Điện giải đồ (K+) sau 24–48h.`;
    if (!criticalAlerts.includes(alertText)) criticalAlerts.push(alertText);
  }

  if (patientPhenotype?.isPregnant) {
    const pregContra = `🚫 [THAI KỲ]: Chống chỉ định các thuốc Phân loại FDA C/D/X (Quinolone, Tetracycline, NSAIDs trong 3 tháng cuối do nguy cơ đóng sớm ống động mạch).`;
    if (!contraindications.includes(pregContra)) contraindications.push(pregContra);

    const pregAlert = `⚠️ [SẢN KHOA]: Theo dõi sát tim thai, cơn gò tử cung và nguy cơ dọa sinh non / chuyển dạ sớm mỗi 6–12 giờ.`;
    if (!criticalAlerts.includes(pregAlert)) criticalAlerts.push(pregAlert);
  }

  if (patientPhenotype?.ageCategory === 'elderly') {
    const elderlyAlert = `⚠️ [LÃO KHOA]: Nguy cơ quá tải tuần hoàn khi truyền dịch tốc độ nhanh. Thường xuyên nghe đáy phổi tìm ran ẩm và theo dõi SpO2.`;
    if (!criticalAlerts.includes(elderlyAlert)) criticalAlerts.push(elderlyAlert);
  }

  // 0b. Nạp trực tiếp từ structuredCautions của Enriched JSON (nếu có)
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

  // 0c. Xử lý Chỉ định Điều trị & Can thiệp Lâm sàng (Clinical Indications)
  const rawIndications =
    structuredCautions?.clinicalIndications ||
    structuredCautions?.treatmentIndications ||
    structuredCautions?.indications ||
    [];

  const indicationGroups: Array<{
    category: string;
    badgeText?: string;
    color?: string;
    items: Array<{
      indicationName: string;
      criteria: string;
      orderTarget?: string;
      note?: string;
    }>;
  }> = [];

  if (Array.isArray(rawIndications)) {
    rawIndications.forEach((entry: any) => {
      if (typeof entry === 'string') {
        indicationGroups.push({
          category: 'Chỉ định chung',
          badgeText: 'BYT / EBM',
          items: [{ indicationName: entry, criteria: entry }],
        });
      } else if (entry && Array.isArray(entry.items)) {
        // Cấu trúc nhóm (Group format)
        const items = entry.items.map((it: any) => {
          if (typeof it === 'string') {
            return { indicationName: it, criteria: it };
          }
          return {
            indicationName: it.indicationName || it.name || it.title || 'Chỉ định lâm sàng',
            criteria: it.criteria || it.description || '',
            orderTarget: it.orderTarget || it.target || '',
            note: it.note || '',
          };
        });
        indicationGroups.push({
          category: entry.category || 'Chỉ định Can thiệp',
          badgeText: entry.badgeText || 'Quy chuẩn BYT',
          color: entry.color || 'blue',
          items,
        });
      } else if (entry && (entry.indicationName || entry.criteria || entry.name)) {
        // Cấu trúc đơn lẻ (Flat item format)
        indicationGroups.push({
          category: entry.category || 'Chỉ định Can thiệp',
          badgeText: entry.badgeText || 'Bắt buộc',
          color: entry.color || 'blue',
          items: [
            {
              indicationName: entry.indicationName || entry.name || 'Chỉ định can thiệp',
              criteria: entry.criteria || entry.description || '',
              orderTarget: entry.orderTarget || entry.target || '',
              note: entry.note || '',
            },
          ],
        });
      }
    });
  }

  const hasIndications = indicationGroups.length > 0;
  const totalIndicationsCount = indicationGroups.reduce((acc, g) => acc + g.items.length, 0);

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
      {/* Content: Visual Blocks */}
      <div className="space-y-4">
        {/* Khối Chỉ định điều trị đặc hiệu (nếu có hoặc lưu ý căn nguyên) */}
        {specificTreatmentNotice && (
          <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-3.5 sm:p-4 shadow-2xs">
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-indigo-200/80">
              <span className="text-base">🎯</span>
              <h5 className="font-bold text-xs sm:text-sm text-indigo-950">
                Chỉ định &amp; Lưu ý Điều trị Đặc hiệu (Etiological &amp; Specific Therapy)
              </h5>
            </div>
            <p className="text-xs text-indigo-900 leading-relaxed font-medium">
              {specificTreatmentNotice}
            </p>
          </div>
        )}

        {/* [1] CHỈ ĐỊNH ĐIỀU TRỊ & TIÊU CHUẨN CAN THIỆP LÂM SÀNG (Nếu có) */}
        {hasIndications && (
          <div id="sub-indications" className="scroll-mt-24 bg-gradient-to-br from-blue-50/80 via-sky-50/50 to-indigo-50/60 border border-blue-200/90 rounded-xl p-3.5 sm:p-4 shadow-2xs">
            <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-blue-200/80">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center shadow-2xs">
                  <CheckSquare className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-blue-950 flex items-center gap-1.5">
                    [1] Tiêu chuẩn &amp; Chỉ định Can thiệp Lâm sàng (Clinical Indications)
                  </h5>
                  <p className="text-[10.5px] text-blue-800/80 font-medium">
                    Đối chiếu điều kiện ra y lệnh (Truyền máu, Chế phẩm, Dịch cao phân tử, Thở máy, Thủ thuật...)
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-200/80 text-blue-900 border border-blue-300">
                {totalIndicationsCount} chỉ định bắt buộc
              </span>
            </div>

            <div className="space-y-3">
              {indicationGroups.map((group, gIdx) => (
                <div
                  key={gIdx}
                  className="bg-white/95 border border-blue-200/80 rounded-lg p-3 shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-blue-100">
                    <span className="font-bold text-xs text-blue-950 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      {group.category}
                    </span>
                    {group.badgeText && (
                      <span className="px-1.5 py-0.5 rounded text-[9.5px] font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                        {group.badgeText}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {group.items.map((item, iIdx) => (
                      <div
                        key={iIdx}
                        className="p-2.5 rounded-lg bg-blue-50/40 border border-blue-100 flex flex-col justify-between gap-1.5 text-xs hover:border-blue-300 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1">
                            <span className="text-blue-600 font-bold shrink-0">🎯</span>
                            <span className="text-[12px]">{item.indicationName}</span>
                          </div>
                          <div className="text-[11.5px] text-slate-800 leading-relaxed font-medium pl-3 border-l-2 border-blue-400 my-1">
                            <strong className="text-blue-950">Tiêu chuẩn: </strong>
                            {item.criteria}
                          </div>
                        </div>

                        {item.orderTarget && (
                          <div className="pt-1.5 mt-0.5 border-t border-blue-100/80 flex items-start gap-1 text-[10.5px] text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold text-emerald-800">Đích can thiệp: </span>
                              <span className="font-medium text-slate-700">{item.orderTarget}</span>
                            </div>
                          </div>
                        )}
                        {item.note && (
                          <div className="text-[10px] text-amber-800 font-medium italic">
                            💡 {item.note}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* [2] Lưu ý, cảnh báo quan trọng */}
        <div id="sub-cautions" className="scroll-mt-24 bg-amber-50/60 border border-amber-200/90 rounded-xl p-3.5 sm:p-4 shadow-2xs">
          <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-amber-200/80">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-amber-600 text-white flex items-center justify-center shadow-2xs">
                <AlertOctagon className="w-3.5 h-3.5" />
              </div>
              <h5 className="font-bold text-xs sm:text-sm text-amber-950">
                {hasIndications ? '[2]' : '[1]'} Lưu ý &amp; Cảnh báo quan trọng (Critical Safety Warnings)
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

        {/* [3] Chống chỉ định (CCĐ) */}
        <div id="sub-contraindications" className="scroll-mt-24 bg-rose-50/70 border-2 border-rose-300 dark:border-rose-900 rounded-xl p-3.5 sm:p-4 shadow-2xs flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2 border-b border-rose-200 dark:border-rose-900/80 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-rose-600 text-white flex items-center justify-center shadow-2xs">
                <ShieldX className="w-3.5 h-3.5" />
              </div>
              <h5 className="font-bold text-xs sm:text-sm text-rose-950">
                {hasIndications ? '[3]' : '[2]'} Chống chỉ định &amp; Thuốc cấm dùng (Contraindications)
              </h5>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-200 text-rose-900 border border-rose-300">
              {contraindications.length} điều cấm
            </span>
          </div>

          {/* Quick-Ref Pill Chips cho các thuốc cấm phổ biến */}
          <div className="flex items-center gap-1.5 flex-wrap p-2 bg-white/80 rounded-lg border border-rose-200 text-[11px]">
            <span className="font-bold text-rose-900 flex items-center gap-1 shrink-0">
              <Ban className="w-3 h-3 text-rose-600" />
              <span>Thuốc cấm tuyệt đối:</span>
            </span>
            <span className="px-2 py-0.5 rounded-full font-bold bg-rose-100 text-rose-800 border border-rose-300">
              🚫 Aspirin
            </span>
            <span className="px-2 py-0.5 rounded-full font-bold bg-rose-100 text-rose-800 border border-rose-300">
              🚫 Ibuprofen
            </span>
            <span className="px-2 py-0.5 rounded-full font-bold bg-rose-100 text-rose-800 border border-rose-300">
              🚫 Toàn bộ nhóm NSAIDs
            </span>
            <span className="px-2 py-0.5 rounded-full font-bold bg-rose-100 text-rose-800 border border-rose-300">
              🚫 Analgin
            </span>
            <span className="px-2 py-0.5 rounded-full font-semibold bg-rose-100/70 text-rose-800 border border-rose-200">
              🚫 Tiêm bắp (Nguy cơ tụ máu lớn)
            </span>
            <span className="px-2 py-0.5 rounded-full font-semibold bg-rose-100/70 text-rose-800 border border-rose-200">
              🚫 Kháng sinh khi chưa có bằng chứng bội nhiễm
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {contraindications.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-white border border-rose-200/90 shadow-2xs flex items-start gap-2.5 text-xs text-rose-950"
              >
                <span className="text-rose-600 font-bold shrink-0 mt-0.5">🚫</span>
                <span className="leading-relaxed font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* [4] Tiêu chuẩn xuất viện hoặc chuyển tuyến - Interactive Checklist */}
        <div id="sub-discharge" className="scroll-mt-24 bg-emerald-50/70 border-2 border-emerald-300 rounded-xl p-3.5 sm:p-4 shadow-2xs flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-200 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center shadow-2xs">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <h5 className="font-bold text-xs sm:text-sm text-emerald-950">
                  {hasIndications ? '[4]' : '[3]'} Tiêu chuẩn xuất viện &amp; Chuyển tuyến an toàn (Interactive Checklist)
                </h5>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Tích chọn các tiêu chí đã đạt để đối chiếu điều kiện cho bệnh nhân ra viện hoặc hạ bậc điều trị:
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-white border border-emerald-300 text-emerald-900 shadow-2xs">
                Đạt: {checkedDischargeIndices.size} / {dischargeCriteria.length} tiêu chuẩn
              </span>
              <button
                type="button"
                onClick={() => {
                  if (checkedDischargeIndices.size === dischargeCriteria.length) {
                    setCheckedDischargeIndices(new Set());
                  } else {
                    setCheckedDischargeIndices(new Set(dischargeCriteria.map((_, i) => i)));
                  }
                }}
                className="px-2 py-1 text-[11px] font-semibold text-emerald-800 bg-white hover:bg-emerald-100 rounded border border-emerald-300 transition-colors cursor-pointer shadow-2xs"
              >
                {checkedDischargeIndices.size === dischargeCriteria.length ? 'Bỏ chọn hết' : 'Đánh dấu đạt tất cả'}
              </button>
            </div>
          </div>

          {/* Banner chúc mừng nếu đạt đủ điều kiện ra viện */}
          {dischargeCriteria.length > 0 && checkedDischargeIndices.size === dischargeCriteria.length && (
            <div className="p-2.5 bg-emerald-600 text-white rounded-lg flex items-center gap-2 text-xs font-bold animate-fadeIn shadow-xs">
              <Sparkles className="w-4 h-4 shrink-0 text-amber-300" />
              <span>
                BỆNH NHÂN ĐÃ ĐẠT TOÀN BỘ {dischargeCriteria.length} TIÊU CHUẨN XUẤT VIỆN AN TOÀN THEO QUY CHUẨN BỘ Y TẾ!
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {dischargeCriteria.map((item, idx) => {
              const isChecked = checkedDischargeIndices.has(idx);

              return (
                <div
                  key={idx}
                  onClick={() => toggleDischargeCheck(idx)}
                  className={`p-3 rounded-xl border-2 transition-all duration-150 flex flex-col justify-between gap-2.5 cursor-pointer ${
                    isChecked
                      ? 'bg-emerald-50/90 border-emerald-500 shadow-xs ring-1 ring-emerald-400'
                      : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/30'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {/* Checkbox vuông */}
                    <div className="shrink-0 pt-0.5">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                          isChecked
                            ? 'bg-emerald-600 text-white shadow-2xs'
                            : 'border-2 border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    <div className="flex-1">
                      {item.dayRange && (
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="px-2 py-0.2 rounded text-[10px] font-bold font-mono-custom bg-emerald-100 text-emerald-900 border border-emerald-200">
                            {item.dayRange}
                          </span>
                          {item.phaseName && (
                            <span className="text-[10px] font-semibold text-slate-500 truncate">
                              {item.phaseName.replace(/Giai đoạn\s*/i, '')}
                            </span>
                          )}
                        </div>
                      )}
                      <p
                        className={`text-[11.5px] leading-relaxed transition-colors ${
                          isChecked
                            ? 'text-emerald-950 font-bold'
                            : 'text-slate-800 font-medium'
                        }`}
                      >
                        {item.text}
                      </p>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
                    <span
                      className={`font-semibold flex items-center gap-1 ${
                        isChecked ? 'text-emerald-700' : 'text-slate-400'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isChecked ? 'Đã nghiệm thu đạt' : 'Chưa nghiệm thu'}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">#{idx + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
