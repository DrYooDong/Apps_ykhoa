import React from 'react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Zap, 
  ShieldAlert,
  Flame,
  ArrowDown
} from 'lucide-react';
import { CalculatedRenalMetrics, DialysisMode, Language } from '../types';

interface RenalSummaryCardProps {
  renal: CalculatedRenalMetrics;
  dialysis: DialysisMode;
  language: Language;
}

export const RenalSummaryCard: React.FC<RenalSummaryCardProps> = ({
  renal,
  dialysis,
  language
}) => {
  const isEn = language === 'en';

  const getStatusColor = () => {
    if (dialysis !== 'none') return 'from-purple-600 to-indigo-700';
    if (renal.isArc) return 'from-teal-600 to-emerald-700';
    if (renal.crcl >= 90) return 'from-emerald-600 to-teal-700';
    if (renal.crcl >= 60) return 'from-blue-600 to-cyan-700';
    if (renal.crcl >= 30) return 'from-amber-500 to-orange-600';
    if (renal.crcl >= 15) return 'from-orange-600 to-rose-600';
    return 'from-rose-600 to-red-700';
  };

  // Calculate position percentage on a 0 - 150 scale for the visual gauge
  const clampedCrcl = Math.min(150, Math.max(0, renal.crcl));
  const pointerPercent = Math.round((clampedCrcl / 150) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden mb-6">
      
      {/* Top Gradient Banner with Key Clinical Indicators */}
      <div className={`bg-gradient-to-r ${getStatusColor()} p-4 sm:p-5 text-white transition-all`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Main CrCl Metric */}
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20">
              {renal.isArc ? (
                <Flame className="w-7 h-7 text-yellow-300 animate-bounce" />
              ) : (
                <Activity className="w-7 h-7 text-white" />
              )}
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-white/80">
                {isEn ? 'Cockcroft-Gault Creatinine Clearance' : 'Độ thanh thải Creatinine (Cockcroft-Gault)'}
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl sm:text-4xl font-black tracking-tight font-mono">
                  {renal.crcl}
                </span>
                <span className="text-sm font-semibold text-white/90">
                  {isEn ? 'mL/min' : 'mL/phút'}
                </span>
                {dialysis !== 'none' && (
                  <span className="ml-2 px-2 py-0.5 rounded-md text-xs font-extrabold bg-white/25 text-white uppercase border border-white/30">
                    {dialysis === 'hd' ? 'HD (Thận NT)' : (dialysis === 'crrt' ? 'CRRT (Lọc liên tục)' : 'CAPD')}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Status Label & Renal Category Badge */}
          <div className="sm:text-right">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-xs text-white border border-white/30 mb-1">
              {isEn ? renal.categoryLabelEn : renal.categoryLabelVi}
            </div>
            <div className="text-xs text-white/90 font-medium">
              Scr: <span className="font-mono font-bold">{renal.scrUmol}</span> µmol/L (<span className="font-mono font-bold">{renal.scrMgdl}</span> mg/dL)
            </div>
          </div>

        </div>
      </div>

      {/* Visual Renal Function Spectrum Bar */}
      <div className="px-4 sm:px-6 pt-4 pb-2 bg-slate-50/70 border-b border-slate-200/60">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 mb-1">
          <span>{isEn ? 'Renal Elimination Spectrum & Clearance Zones:' : 'Phổ Thanh Thải & Mức Độ Chức Năng Thận:'}</span>
          <span className="text-blue-700">
            {isEn ? `Current: ${renal.crcl} mL/min (${Math.min(100, Math.round((renal.crcl / 100) * 100))}% nominal)` : `Hiện tại: ${renal.crcl} mL/phút (~${Math.min(100, Math.round((renal.crcl / 100) * 100))}% thanh thải chuẩn)`}
          </span>
        </div>

        {/* Multi-segmented gradient bar */}
        <div className="relative pt-4 pb-3">
          {/* Pointer */}
          <div 
            className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-300 z-10"
            style={{ left: `${pointerPercent}%` }}
          >
            <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-slate-900 text-white shadow-xs whitespace-nowrap">
              {renal.crcl}
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-slate-900 -mt-0.5" />
          </div>

          {/* Spectrum Bar Segments */}
          <div className="h-3.5 rounded-full overflow-hidden flex bg-slate-200 shadow-inner">
            <div style={{ width: '10%' }} className="bg-red-500" title="ESRD < 15 mL/min" />
            <div style={{ width: '10%' }} className="bg-orange-500" title="Severe 15 - 29 mL/min" />
            <div style={{ width: '20%' }} className="bg-amber-400" title="Moderate 30 - 59 mL/min" />
            <div style={{ width: '20%' }} className="bg-sky-400" title="Mild 60 - 89 mL/min" />
            <div style={{ width: '27%' }} className="bg-emerald-500" title="Normal 90 - 130 mL/min" />
            <div style={{ width: '13%' }} className="bg-teal-400" title="ARC > 130 mL/min" />
          </div>

          {/* Scale Labels */}
          <div className="flex justify-between text-[10px] font-semibold text-slate-500 mt-1.5">
            <span>0</span>
            <span className="text-red-700">ESRD (&lt;15)</span>
            <span className="text-orange-700">15-29 (Nặng)</span>
            <span className="text-amber-700">30-59 (Vừa)</span>
            <span className="text-blue-700">60-89 (Nhẹ)</span>
            <span className="text-emerald-700">≥90 (Chuẩn)</span>
            <span className="text-teal-700">&gt;130 (ARC)</span>
          </div>
        </div>
      </div>

      {/* Anthropometric & Weight Evaluation Sub-panel */}
      <div className="p-4 sm:p-5 bg-white">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-3">
          
          <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/70">
            <span className="text-slate-500 font-medium block">
              {isEn ? 'Used Weight (CrCl)' : 'Cân nặng dùng tính CrCl'}
            </span>
            <div className="text-sm font-bold text-slate-900 mt-0.5 font-mono">
              {renal.usedWeight} kg
            </div>
            <span className="text-[10px] text-blue-600 font-semibold block truncate">
              {renal.usedWeightType}
            </span>
          </div>

          <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/70">
            <span className="text-slate-500 font-medium block">
              {isEn ? 'Ideal Body Wt (IBW)' : 'Cân nặng lý tưởng (IBW)'}
            </span>
            <div className="text-sm font-bold text-slate-900 mt-0.5 font-mono">
              {renal.ibw ? `${renal.ibw} kg` : (isEn ? 'Requires Height' : 'Chưa có chiều cao')}
            </div>
            <span className="text-[10px] text-slate-400 block">
              {renal.ibw ? (isEn ? 'Devine Formula' : 'Công thức Devine') : '-'}
            </span>
          </div>

          <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/70">
            <span className="text-slate-500 font-medium block">
              {isEn ? 'Adjusted Wt (AdjBW)' : 'Cân nặng hiệu chỉnh'}
            </span>
            <div className="text-sm font-bold text-slate-900 mt-0.5 font-mono">
              {renal.adjBw ? `${renal.adjBw} kg` : '-'}
            </div>
            <span className="text-[10px] text-slate-400 block">
              {renal.adjBw ? 'IBW + 0.4*(TBW-IBW)' : '-'}
            </span>
          </div>

          <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/70">
            <span className="text-slate-500 font-medium block">
              {isEn ? 'Body Mass Index (BMI)' : 'Chỉ số khối cơ thể (BMI)'}
            </span>
            <div className="text-sm font-bold text-slate-900 mt-0.5 font-mono">
              {renal.bmi ? `${renal.bmi} kg/m²` : '-'}
            </div>
            <span className={`text-[10px] font-semibold block ${renal.bmi && renal.bmi >= 30 ? 'text-amber-600' : 'text-slate-500'}`}>
              {renal.bmi ? (renal.bmi >= 30 ? (isEn ? 'Obese Class I-III' : 'Béo phì') : (renal.bmi < 18.5 ? (isEn ? 'Underweight' : 'Nhẹ cân') : (isEn ? 'Normal range' : 'Bình thường'))) : '-'}
            </span>
          </div>

        </div>

        {/* Augmented Renal Clearance (ARC) Clinical Alert */}
        {renal.isArc && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start space-x-2.5 text-xs">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">
                {isEn ? 'CLINICAL ALERT: Augmented Renal Clearance (ARC > 130 mL/min)' : 'CẢNH BÁO LÂM SÀNG: Tăng thanh thải thận (ARC > 130 mL/phút)'}
              </span>
              <p className="mt-0.5 text-amber-800 leading-relaxed">
                {isEn 
                  ? 'Common in critically ill, septic, burn, or polytrauma ICU patients. Standard antibiotic doses frequently result in subtherapeutic serum concentrations and therapeutic failure. Consider high-end standard dosing, loading doses, or extended/continuous infusions.'
                  : 'Thường gặp ở bệnh nhân hồi sức tích cực (ICU), nhiễm khuẩn huyết nặng, chấn thương hoặc bỏng diện rộng. Liều chuẩn thông thường dễ bị đào thải nhanh dẫn tới nồng độ thuốc dưới ngưỡng điều trị. Khuyến cáo dùng liều tối đa cho phép, áp dụng truyền kéo dài và theo dõi TDM.'}
              </p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

