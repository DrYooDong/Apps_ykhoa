import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { PatientProfile, RenalCalculations } from '../types';

interface SafetyAlertsCardProps {
  patient: PatientProfile;
  renal: RenalCalculations;
}

export const SafetyAlertsCard: React.FC<SafetyAlertsCardProps> = ({
  patient,
  renal
}) => {
  const [showGuidelines, setShowGuidelines] = useState(false);

  const riskFactors: { title: string; desc: string; highRisk?: boolean }[] = [];

  if (renal.bmi >= 30) {
    riskFactors.push({
      title: 'Béo phì (BMI ≥ 30)',
      desc: 'Vd không tăng tuyến tính theo cân nặng; nguy cơ tích lũy liều cao hơn.',
      highRisk: true
    });
  }

  if (patient.clinicalSetting === 'icu') {
    riskFactors.push({
      title: 'Bệnh nhân ICU',
      desc: 'CL giảm ~15.5% (Zhang 2024); huyết động và độ lọc cầu thận biến động.',
      highRisk: true
    });
  }

  if (renal.crcl < 50) {
    riskFactors.push({
      title: `Suy giảm thận (CrCl ${renal.crcl} mL/phút)`,
      desc: 'Kéo dài thời gian bán thải vancomycin, bắt buộc giám sát TDM.',
      highRisk: true
    });
  }

  if (patient.concomitantNephrotoxins && patient.concomitantNephrotoxins.length > 0) {
    patient.concomitantNephrotoxins.forEach((drug) => {
      let isHigh = false;
      let desc = 'Tăng gánh nặng lên cầu thận và ống thận.';
      if (drug.includes('Piperacillin/Tazobactam')) {
        isHigh = true;
        desc = 'Tăng tỷ lệ tổn thương thận cấp AKI so với phối hợp Cefepime/Meropenem.';
      } else if (drug.includes('Flucloxacillin')) {
        isHigh = true;
        desc = 'Thử nghiệm CAMERA2 ghi nhận tăng độc tính thận khi phối hợp kéo dài.';
      } else if (drug.includes('Aminoglycoside')) {
        isHigh = true;
        desc = 'Cộng hưởng độc tế bào biểu mô ống thận và hoại tử ống thận cấp.';
      }
      riskFactors.push({
        title: `Phối hợp: ${drug}`,
        desc,
        highRisk: isHigh
      });
    });
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 transition-all">
      {/* Sleek Header */}
      <div className="flex items-center justify-between gap-2 pb-2 mb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
              An toàn & Kiểm soát Nguy cơ AKI
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-tight ${
            riskFactors.length > 0 
              ? 'bg-amber-50 text-amber-800 border border-amber-200/60' 
              : 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
          }`}>
            {riskFactors.length > 0 ? `${riskFactors.length} yếu tố nguy cơ` : 'Nguy cơ cơ bản'}
          </span>
          <button
            type="button"
            onClick={() => setShowGuidelines(!showGuidelines)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100 transition-all"
            title="Xem tiêu chuẩn KDIGO & Ngưỡng độc tính"
          >
            {showGuidelines ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Identified Risk Factors (Compact List) */}
      {riskFactors.length > 0 ? (
        <div className="space-y-1.5 mb-2">
          {riskFactors.map((r, i) => (
            <div 
              key={i} 
              className={`p-2 rounded-lg border text-xs flex items-start gap-2 transition-all ${
                r.highRisk ? 'bg-rose-50/50 border-rose-200/70 text-rose-950' : 'bg-amber-50/50 border-amber-200/70 text-amber-950'
              }`}
            >
              <AlertTriangle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${r.highRisk ? 'text-rose-600' : 'text-amber-600'}`} />
              <div className="min-w-0 flex-1">
                <span className="font-semibold text-[11px] block">{r.title}</span>
                <p className="text-[10px] text-slate-600 leading-tight mt-0.5">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-2 rounded-lg bg-emerald-50/50 border border-emerald-200/60 text-[11px] text-emerald-800 flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Chưa ghi nhận yếu tố độc thận phối hợp. Theo dõi SCr định kỳ mỗi 48h.</span>
        </div>
      )}

      {/* Collapsible / Micro KDIGO & Threshold Strip */}
      {showGuidelines ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] mt-2 pt-2 border-t border-slate-100">
          <div className="p-2 bg-slate-50/80 rounded-lg border border-slate-200/60">
            <strong className="font-semibold text-slate-800 flex items-center gap-1 mb-0.5">
              <Info className="w-3 h-3 text-teal-600" /> Tiêu chuẩn AKI (KDIGO):
            </strong>
            <p className="text-slate-600 leading-tight">
              SCr tăng <strong>≥ 0.3 mg/dL</strong> (≥ 26.5 µmol/L) trong 48h, hoặc tăng <strong>≥ 50%</strong> so với nền trong 7 ngày.
            </p>
          </div>

          <div className="p-2 bg-slate-50/80 rounded-lg border border-slate-200/60">
            <strong className="font-semibold text-slate-800 flex items-center gap-1 mb-0.5">
              <Flame className="w-3 h-3 text-rose-500" /> Ngưỡng độc tính:
            </strong>
            <p className="text-slate-600 leading-tight">
              Nguy cơ AKI tăng gấp 3–4 lần khi <strong>AUC24 &gt; 600 – 800 mg·h/L</strong> hoặc nồng độ đáy <strong>Trough &gt; 15 – 20 mg/L</strong>.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
          <span>Tiêu chuẩn KDIGO: SCr tăng ≥ 0.3 mg/dL hoặc ≥ 50%</span>
          <button 
            type="button" 
            onClick={() => setShowGuidelines(true)}
            className="text-teal-700 font-medium hover:underline"
          >
            Chi tiết &rarr;
          </button>
        </div>
      )}
    </div>
  );
};
