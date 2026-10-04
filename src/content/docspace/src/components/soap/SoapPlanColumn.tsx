import React from 'react';
import {
  Pill,
  Target,
  Calendar,
  HeartHandshake,
  CheckCircle2,
  Award,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { SoapPlan } from '../../types.ts';
import { FormattedClinicalText } from './FormattedClinicalText.tsx';

interface SoapPlanColumnProps {
  p: SoapPlan;
  isFocused?: boolean;
}

export const SoapPlanColumn: React.FC<SoapPlanColumnProps> = ({
  p,
  isFocused = false,
}) => {
  return (
    <div className="bg-white border border-teal-200/90 rounded-2xl shadow-xs flex flex-col overflow-hidden hover:border-teal-300 transition-colors h-full">
      {/* Column Header */}
      <div className="bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 text-white p-3.5 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center font-display font-black text-sm text-white shadow-inner">
            P
          </div>
          <div>
            <h3 className="font-display font-bold text-xs uppercase tracking-wider">
              PLAN
            </h3>
            <p className="text-[10.5px] text-teal-100">
              Kế hoạch · Xử trí, Thuốc &amp; Lộ trình theo dõi
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-teal-800/70 text-teal-100 text-[10px] font-mono-custom font-semibold border border-teal-400/30 flex items-center gap-1">
          <span>⚡</span>
          <span>Hành động</span>
        </span>
      </div>

      <div className={`p-4 flex-1 flex flex-col gap-4 text-xs text-slate-800 bg-white ${isFocused ? 'max-w-5xl mx-auto w-full' : ''}`}>
        {/* 1. XỬ TRÍ CẤP CỨU & BAN ĐẦU */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-600"></span>
              <span>1. Xử trí cấp cứu &amp; Ban đầu:</span>
            </span>
            <span className="text-[10px] text-teal-800 font-semibold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Khẩn cấp
            </span>
          </div>

          <div className="bg-teal-50/60 p-3.5 rounded-xl border border-teal-200 shadow-2xs">
            <FormattedClinicalText
              text={p.immediateActions}
              className="text-slate-800 leading-relaxed"
            />
          </div>
        </div>

        {/* 2. BẢNG Y LỆNH THUỐC CỤ THỂ (DIGITAL MEDICATION SHEET) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Pill className="w-3.5 h-3.5 text-teal-600" />
              <span>2. Y lệnh thuốc cụ thể:</span>
            </span>
            {p.medications && p.medications.length > 0 && (
              <span className="text-[10px] text-teal-800 font-mono-custom font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                {p.medications.length} thuốc / dịch truyền
              </span>
            )}
          </div>

          {p.medications && p.medications.length > 0 ? (
            <div className="space-y-2">
              {p.medications.map((med, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50/90 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col gap-1 hover:border-teal-300 transition-colors"
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 text-[12px] flex-wrap gap-1">
                    <span className="text-slate-900">{med.drug}</span>
                    <span className="font-mono-custom text-[11px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {med.dose}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-600 flex items-center justify-between mt-1 pt-1 border-t border-slate-200/50 flex-wrap gap-1">
                    <span>
                      Đường dùng: <b className="text-slate-800">{med.route}</b>
                    </span>
                    {med.note && (
                      <span className="italic text-teal-900 font-medium bg-teal-50/50 px-1.5 py-0.2 rounded">
                        {med.note}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 italic text-center">
              Chưa ghi nhận y lệnh thuốc cụ thể
            </div>
          )}
        </div>

        {/* 3. CHỈ TIÊU THEO DÕI & MỤC TIÊU LÂM SÀNG */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-teal-600" />
              <span>3. Theo dõi &amp; Mục tiêu lâm sàng:</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              Chỉ số đích
            </span>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
            <FormattedClinicalText
              text={p.monitoringAndTargets}
              className="text-slate-700 leading-relaxed text-[11.5px]"
            />
          </div>
        </div>

        {/* 4. LỘ TRÌNH ĐIỀU TRỊ & GIÁM SÁT DÀI HẠN (TREATMENT ROADMAP) */}
        {p.treatmentRoadmap && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                <span>4. Lộ trình điều trị &amp; Giám sát (Roadmap):</span>
              </span>
              <span className="text-[10px] text-teal-800 font-semibold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Timeline
              </span>
            </div>

            <div className="bg-teal-50/40 p-3.5 rounded-xl border border-teal-200 max-h-72 overflow-y-auto shadow-2xs">
              <FormattedClinicalText text={p.treatmentRoadmap} />
            </div>
          </div>
        )}

        {/* 5. CHẾ ĐỘ SINH HOẠT & TƯ VẤN SỐNG KHỎE */}
        {p.lifestyleAndCounseling && (
          <div>
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-teal-600" />
              <span>5. Chế độ sinh hoạt &amp; Tư vấn sống khỏe:</span>
            </span>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 shadow-2xs">
              <FormattedClinicalText
                text={p.lifestyleAndCounseling}
                className="text-slate-700 leading-relaxed text-[11.5px]"
              />
            </div>
          </div>
        )}

        {/* 6. TIÊU CHUẨN NGƯNG THUỐC & TIÊU CHUẨN XUẤT VIỆN */}
        {(p.discontinuationCriteria || p.consultationOrReferral) && (
          <div className="flex flex-col gap-2">
            {p.discontinuationCriteria && (
              <div className="bg-amber-50/50 p-3 rounded-xl border border-amber-200/80 shadow-2xs">
                <div className="font-bold text-amber-950 text-[11px] flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Tiêu chuẩn cân nhắc ngưng thuốc:</span>
                </div>
                <FormattedClinicalText
                  text={p.discontinuationCriteria}
                  className="text-slate-700 leading-relaxed text-[11px]"
                />
              </div>
            )}

            {p.consultationOrReferral && (
              <div className="bg-sky-50/50 p-3 rounded-xl border border-sky-200/80 shadow-2xs">
                <div className="font-bold text-sky-950 text-[11px] flex items-center gap-1.5 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                  <span>Tiêu chuẩn chuyển khoa / Xuất viện an toàn:</span>
                </div>
                <FormattedClinicalText
                  text={p.consultationOrReferral}
                  className="text-slate-700 leading-relaxed text-[11px]"
                />
              </div>
            )}
          </div>
        )}

        {/* 7. BÀI HỌC KINH NGHIỆM ĐIỀU TRỊ (TAKEAWAY LESSON) */}
        {p.takeawayLessons && (
          <div className="mt-auto pt-2">
            <div className="p-3.5 bg-gradient-to-r from-teal-50/90 to-emerald-50/60 border-l-4 border-l-teal-600 border border-teal-200 rounded-r-xl text-teal-950 shadow-2xs">
              <div className="flex items-center gap-1.5 font-display font-bold text-[11px] text-teal-900 mb-1.5">
                <Award className="w-4 h-4 text-teal-600 shrink-0" />
                <span>BÀI HỌC KINH NGHIỆM ĐIỀU TRỊ (TAKEAWAY)</span>
              </div>
              <p className="text-xs text-teal-950/90 leading-relaxed italic">
                {p.takeawayLessons}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
