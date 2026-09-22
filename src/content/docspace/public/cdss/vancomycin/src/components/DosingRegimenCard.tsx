import React, { useState } from 'react';
import { 
  Pill, 
  Clock, 
  Sparkles, 
  Copy, 
  Check, 
  ShieldCheck, 
  AlertCircle,
  Activity,
  Layers,
  Info
} from 'lucide-react';
import { InitialDosingResult, InfusionMethod } from '../types';

interface DosingRegimenCardProps {
  dosing: InitialDosingResult;
  selectedMethod: InfusionMethod;
  onMethodChange: (method: InfusionMethod) => void;
  weightKg: number;
}

export const DosingRegimenCard: React.FC<DosingRegimenCardProps> = ({
  dosing,
  selectedMethod,
  onMethodChange,
  weightKg
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPrescription = () => {
    let text = `[CDSS KHUYẾN CÁO VANCOMYCIN]\n`;
    if (dosing.loadingDoseMg > 0) {
      text += `• Liều nạp (Loading): ${dosing.loadingDoseMg} mg (truyền IV tối thiểu ${dosing.loadingInfusionMinutes} phút)\n`;
    }
    if (dosing.maintenanceMethod === 'continuous') {
      text += `• Liều duy trì: Truyền TM liên tục ${dosing.dailyMaintenanceMg} mg/24h (tốc độ ${dosing.continuousRateMgPerHour} mg/h)\n`;
      text += `• Nồng độ mục tiêu Css: 20 - 25 mg/L\n`;
    } else {
      text += `• Liều duy trì: ${dosing.maintenanceDoseMg} mg mỗi ${dosing.maintenanceIntervalHours} giờ (truyền IV trong ${dosing.maintenanceInfusionMinutes} phút)\n`;
      text += `• Tổng liều 24h: ${dosing.dailyMaintenanceMg} mg/ngày\n`;
      text += `• Mục tiêu AUC24: 400 - 600 mg·h/L\n`;
    }
    text += `• Căn cứ: ${dosing.recommendationSource}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dilution recommendation
  const primaryDose = dosing.loadingDoseMg > 0 ? dosing.loadingDoseMg : dosing.maintenanceDoseMg;
  const recommendedVolumeMl = Math.max(100, Math.ceil(primaryDose / 5 / 50) * 50); // <= 5mg/ml

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 relative overflow-hidden">
      {/* Top Banner & Method Switch */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-100 gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <Pill className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              Phác đồ Vancomycin Khuyến cáo
            </h2>
            <p className="text-xs text-slate-500">
              Cá thể hóa theo cân nặng thực tế, chức năng thận & nguy cơ lâm sàng
            </p>
          </div>
        </div>

        {/* Method Toggle Buttons */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs font-medium">
            <button
              type="button"
              onClick={() => onMethodChange('intermittent')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                selectedMethod === 'intermittent'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Truyền ngắt quãng (IIV)
            </button>
            <button
              type="button"
              onClick={() => onMethodChange('continuous')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                selectedMethod === 'continuous'
                  ? 'bg-teal-600 text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Truyền liên tục (CIV)
            </button>
          </div>

          {/* Copy Icon Button */}
          <button
            type="button"
            onClick={handleCopyPrescription}
            title="Sao chép y lệnh vào bộ nhớ tạm"
            className="p-1.5 text-slate-500 hover:text-teal-700 hover:bg-teal-50 active:scale-95 rounded-lg border border-slate-200 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Primary Dosage Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* Loading Dose Card */}
        <div className="p-4 rounded-xl border border-teal-200 bg-linear-to-b from-teal-50/70 to-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-teal-800 uppercase tracking-wide flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Liều nạp (Loading Dose)
              </span>
              {dosing.loadingDoseMg > 0 && (
                <span className="text-[11px] font-semibold text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded-full">
                  ~{dosing.loadingDoseMgPerKg} mg/kg
                </span>
              )}
            </div>

            {dosing.loadingDoseMg > 0 ? (
              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                    {dosing.loadingDoseMg.toLocaleString('vi-VN')}
                  </span>
                  <span className="text-base font-bold text-slate-600">mg</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  {dosing.loadingNote}
                </p>
              </div>
            ) : (
              <div className="my-3 py-2 text-xs text-slate-500 italic">
                {dosing.loadingNote || 'Không chỉ định liều nạp cho đối tượng này.'}
              </div>
            )}
          </div>

          {dosing.loadingDoseMg > 0 && (
            <div className="pt-2.5 mt-2 border-t border-teal-100/80 flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" /> Thời gian truyền:
              </span>
              <span className="font-semibold text-slate-900 bg-white px-2 py-0.5 rounded border border-teal-100">
                Tối thiểu {dosing.loadingInfusionMinutes} phút
              </span>
            </div>
          )}
        </div>

        {/* Maintenance Dose Card */}
        <div className="p-4 rounded-xl border border-cyan-200 bg-linear-to-b from-cyan-50/70 to-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-cyan-800 uppercase tracking-wide flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-600" /> Liều duy trì (Maintenance)
              </span>
              <span className="text-[11px] font-semibold text-cyan-700 bg-cyan-100/80 px-2 py-0.5 rounded-full">
                Tổng 24h: {dosing.dailyMaintenanceMg.toLocaleString('vi-VN')} mg
              </span>
            </div>

            {dosing.maintenanceMethod === 'continuous' ? (
              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-cyan-900 tracking-tight font-mono">
                    {dosing.continuousRateMgPerHour}
                  </span>
                  <span className="text-base font-bold text-slate-700">mg/giờ</span>
                  <span className="text-xs text-slate-500 font-mono">
                    ({dosing.dailyMaintenanceMg} mg/24h)
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Truyền tĩnh mạch liên tục với bơm tiêm điện hoặc máy truyền dịch.
                </p>
              </div>
            ) : (
              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
                    {dosing.maintenanceDoseMg.toLocaleString('vi-VN')}
                  </span>
                  <span className="text-base font-bold text-slate-600">mg</span>
                  <span className="text-sm font-semibold text-cyan-700 ml-1">
                    mỗi {dosing.maintenanceIntervalHours} giờ
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Chia đều liều ngắt quãng qua đường truyền tĩnh mạch chậm.
                </p>
              </div>
            )}
          </div>

          <div className="pt-2.5 mt-2 border-t border-cyan-100/80 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> Thời gian truyền:
            </span>
            <span className="font-semibold text-slate-900 bg-white px-2 py-0.5 rounded border border-cyan-100">
              {dosing.maintenanceMethod === 'continuous'
                ? 'Truyền liên tục 24/24'
                : `${dosing.maintenanceInfusionMinutes} phút mỗi cữ`}
            </span>
          </div>
        </div>
      </div>

      {/* Rationale & Guideline Citation */}
      <div className="mt-3.5 p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-slate-700 font-medium leading-relaxed">
              <strong>Cơ sở tính toán:</strong> {dosing.dosingRationale}
            </p>
            <p className="text-slate-500">
              Nguồn dẫn chiếu: <strong className="text-teal-700">{dosing.recommendationSource}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Safe Administration Guide */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 bg-amber-50/70 border border-amber-200/70 rounded-xl text-amber-900">
          <strong className="block text-amber-950 mb-0.5">Quy cách pha loãng an toàn:</strong>
          Nồng độ tối đa ≤ 5 mg/mL (Liều {primaryDose} mg pha trong ít nhất {recommendedVolumeMl} mL NaCl 0.9% hoặc Glucose 5%).
        </div>
        <div className="p-2.5 bg-blue-50/70 border border-blue-200/70 rounded-xl text-blue-900">
          <strong className="block text-blue-950 mb-0.5">Tốc độ truyền tĩnh mạch an toàn:</strong>
          Tốc độ ≤ 10 mg/phút (ít nhất 60 phút/1000 mg) để phòng hội chứng Red Man & hạ huyết áp.
        </div>
      </div>
    </div>
  );
};
