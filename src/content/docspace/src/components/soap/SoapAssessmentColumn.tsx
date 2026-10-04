import React from 'react';
import {
  Compass,
  AlertOctagon,
  ShieldCheck,
  Zap,
  Split,
  Layers,
  Scale,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { SoapAssessment } from '../../types.ts';
import { FormattedClinicalText } from './FormattedClinicalText.tsx';

interface SoapAssessmentColumnProps {
  a: SoapAssessment;
  specialty?: string;
  isFocused?: boolean;
}

export const SoapAssessmentColumn: React.FC<SoapAssessmentColumnProps> = ({
  a,
  specialty,
  isFocused = false,
}) => {
  return (
    <div className="bg-white border border-amber-200/90 rounded-2xl shadow-xs flex flex-col overflow-hidden hover:border-amber-300 transition-colors h-full">
      {/* Column Header */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-orange-700 text-white p-3.5 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-white/20 flex items-center justify-center font-display font-black text-sm text-white shadow-inner">
            A
          </div>
          <div>
            <h3 className="font-display font-bold text-xs uppercase tracking-wider">
              ASSESSMENT
            </h3>
            <p className="text-[10.5px] text-amber-100">
              Đánh giá · Chẩn đoán &amp; Biện luận y học
            </p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-amber-800/70 text-amber-100 text-[10px] font-mono-custom font-semibold border border-amber-400/30 flex items-center gap-1">
          <span>🧠</span>
          <span>Tư duy</span>
        </span>
      </div>

      <div className={`p-4 flex-1 flex flex-col gap-4 text-xs text-slate-800 bg-white ${isFocused ? 'max-w-5xl mx-auto w-full' : ''}`}>
        {/* 1. CHẨN ĐOÁN SƠ BỘ / XÁC ĐỊNH (HERO DIAGNOSIS CARD) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              <span>1. Chẩn đoán sơ bộ / Xác định:</span>
            </span>
            <span className="text-[10px] text-amber-900 font-bold bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
              Chẩn đoán chính
            </span>
          </div>

          <div className="p-3.5 bg-gradient-to-br from-amber-50/90 via-amber-50/40 to-white border-2 border-amber-300 rounded-xl shadow-2xs relative">
            <div className="font-bold text-sm text-amber-950 leading-snug">
              {a.primaryDiagnosis}
            </div>
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <span className="font-mono-custom text-xs font-black bg-amber-200/90 text-amber-950 px-2.5 py-0.5 rounded-md border border-amber-400 shadow-2xs">
                ICD-10: {a.icd10}
              </span>
              {specialty && (
                <span className="text-[11px] text-amber-900 font-semibold bg-white px-2 py-0.5 rounded-md border border-amber-200">
                  {specialty}
                </span>
              )}
            </div>

            {/* Các tiêu chuẩn chẩn đoán đã thỏa mãn nếu có */}
            {a.treatmentCriteriaMet && a.treatmentCriteriaMet.length > 0 && (
              <div className="mt-2.5 pt-2 border-t border-amber-200/60 flex flex-wrap gap-1">
                {a.treatmentCriteriaMet.map((crit, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-white text-emerald-800 border border-emerald-200 rounded text-[10px] font-medium flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>{crit}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 2. BẢNG ĐẶT VẤN ĐỀ 3 TẦNG (PROBLEM LIST · PGS.TS HOÀNG VĂN SĨ) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5 text-amber-950">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>2. Đặt Vấn Đề (Problem List · 3 Tầng):</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              Tóm tắt bệnh án
            </span>
          </div>

          {a.problemList && a.problemList.length > 0 ? (
            <div className="space-y-2">
              {a.problemList.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs leading-relaxed transition-all shadow-2xs ${
                    item.priority === 'life-threatening'
                      ? 'bg-rose-50/70 border-rose-200 border-l-4 border-l-rose-600 text-rose-950'
                      : item.priority === 'chronic'
                      ? 'bg-blue-50/70 border-blue-200 border-l-4 border-l-blue-600 text-blue-950'
                      : 'bg-amber-50/70 border-amber-200 border-l-4 border-l-amber-500 text-amber-950'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[9.5px] font-black uppercase tracking-wide ${
                          item.priority === 'life-threatening'
                            ? 'bg-rose-600 text-white'
                            : item.priority === 'chronic'
                            ? 'bg-blue-600 text-white'
                            : 'bg-amber-500 text-white'
                        }`}
                      >
                        {item.priority === 'life-threatening'
                          ? 'Tầng 1 · Đe dọa'
                          : item.priority === 'chronic'
                          ? 'Tầng 3 · Mạn tính'
                          : 'Tầng 2 · Cấp tính'}
                      </span>
                      <span className="font-bold text-slate-900 text-[12px]">{item.problemName}</span>
                    </div>
                  </div>

                  {item.evidenceSummary && (
                    <div className="text-[11px] text-slate-700 mb-1.5 leading-relaxed bg-white/70 p-1.5 rounded border border-slate-200/50">
                      <b className="text-slate-900">Dữ kiện:</b> {item.evidenceSummary}
                    </div>
                  )}

                  {(item.diagnosticOrientation || item.immediateManagement) && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10.5px] pt-1 border-t border-slate-200/60 mt-1">
                      {item.diagnosticOrientation && (
                        <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                          <b className="text-sky-800 flex items-center gap-1 mb-0.5">
                            <span>🔬</span> CLS đề nghị:
                          </b>
                          <span className="text-slate-700 leading-normal">{item.diagnosticOrientation}</span>
                        </div>
                      )}
                      {item.immediateManagement && (
                        <div className="bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                          <b className="text-emerald-800 flex items-center gap-1 mb-0.5">
                            <span>💊</span> Xử trí tức thì:
                          </b>
                          <span className="text-slate-700 leading-normal">{item.immediateManagement}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {item.conflictWarning && (
                    <div className="mt-1.5 text-[10.5px] text-rose-800 font-semibold bg-white p-1.5 rounded-lg border border-rose-200 flex items-center gap-1">
                      <AlertOctagon className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>{item.conflictWarning}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-xl text-[11.5px] text-slate-700 space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-800 font-semibold text-xs">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Vấn đề lâm sàng chủ đạo của ca bệnh:</span>
              </div>
              <div className="font-bold text-slate-900 pl-3 border-l-2 border-amber-400">
                • {a.primaryDiagnosis}
              </div>
            </div>
          )}
        </div>

        {/* 3. CHẨN ĐOÁN PHÂN BIỆT */}
        {a.differentials && a.differentials.length > 0 && (
          <div>
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
              <Split className="w-3.5 h-3.5 text-amber-600" />
              <span>3. Chẩn đoán phân biệt cần loại trừ:</span>
            </span>
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              {a.differentials.map((diff, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-700 text-[11.5px] leading-relaxed">
                  <span className="text-amber-600 font-black text-xs shrink-0 mt-0.5">≠</span>
                  <span>{diff}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. PHÂN TẦNG NGUY CƠ & THANG ĐIỂM */}
        <div>
          <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block mb-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            <span>4. Phân tầng nguy cơ &amp; Thang điểm:</span>
          </span>
          <FormattedClinicalText
            text={a.riskStratification}
            className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 leading-relaxed"
          />
        </div>

        {/* 5. BIỆN LUẬN LÂM SÀNG CHI TIẾT */}
        {a.clinicalReasoning && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-amber-600" />
                <span>5. Biện luận lâm sàng chi tiết (Clinical Reasoning):</span>
              </span>
              <span className="text-[10px] text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                EBM
              </span>
            </div>
            <div className="bg-amber-50/40 p-3.5 rounded-xl border border-amber-200/80 max-h-80 overflow-y-auto">
              <FormattedClinicalText text={a.clinicalReasoning} />
            </div>
          </div>
        )}

        {/* 6. ĐÚC KẾT BIỆN LUẬN (DIAGNOSTIC PEARL) */}
        {a.diagnosticPearns || a.diagnosticPearls ? (
          <div className="mt-auto pt-2">
            <div className="p-3.5 bg-gradient-to-r from-amber-50/90 to-orange-50/60 border-l-4 border-l-amber-500 border border-amber-200 rounded-r-xl text-amber-950 shadow-2xs">
              <div className="flex items-center gap-1.5 font-display font-bold text-[11px] text-amber-900 mb-1.5">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <span>ĐÚC KẾT BIỆN LUẬN CHẨN ĐOÁN (DIAGNOSTIC PEARL)</span>
              </div>
              <p className="text-xs text-amber-950/90 leading-relaxed italic">
                {a.diagnosticPearls}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
