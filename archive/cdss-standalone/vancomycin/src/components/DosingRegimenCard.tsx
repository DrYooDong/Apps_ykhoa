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
  Info,
  Table as TableIcon,
  CheckCircle2,
  AlertTriangle,
  Filter,
  RotateCcw
} from 'lucide-react';
import { InitialDosingResult, InfusionMethod, ClinCalcDosingRegimen } from '../types';

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
  const [selectedCustomRegimen, setSelectedCustomRegimen] = useState<ClinCalcDosingRegimen | null>(null);
  const [onlyShowWithinGoal, setOnlyShowWithinGoal] = useState(true);

  // Active regimen values (either custom selected from grid or default recommendation)
  const activeDoseMg = selectedCustomRegimen ? selectedCustomRegimen.doseMg : dosing.maintenanceDoseMg;
  const activeIntervalHours = selectedCustomRegimen ? selectedCustomRegimen.intervalHours : dosing.maintenanceIntervalHours;
  const activeInfusionMinutes = selectedCustomRegimen ? selectedCustomRegimen.infusionMinutes : dosing.maintenanceInfusionMinutes;
  const activeDailyMaintenanceMg = selectedCustomRegimen ? selectedCustomRegimen.dailyDoseMg : dosing.dailyMaintenanceMg;

  const handleCopyPrescription = () => {
    let text = `[CDSS KHUYẾN CÁO VANCOMYCIN]\n`;
    if (dosing.loadingDoseMg > 0) {
      text += `• Liều nạp (Loading): ${dosing.loadingDoseMg} mg (truyền IV tối thiểu ${dosing.loadingInfusionMinutes} phút)\n`;
    }
    if (dosing.maintenanceMethod === 'continuous') {
      text += `• Liều duy trì: Truyền TM liên tục ${dosing.dailyMaintenanceMg} mg/24h (tốc độ ${dosing.continuousRateMgPerHour} mg/h)\n`;
      text += `• Nồng độ mục tiêu Css: 20 - 25 mg/L\n`;
    } else {
      text += `• Liều duy trì: ${activeDoseMg} mg mỗi ${activeIntervalHours} giờ (truyền IV trong ${activeInfusionMinutes} phút)\n`;
      text += `• Tổng liều 24h: ${activeDailyMaintenanceMg} mg/ngày\n`;
      if (selectedCustomRegimen) {
        text += `• Dự đoán PK: Peak ~${selectedCustomRegimen.cPeak} mg/L, Trough ~${selectedCustomRegimen.cTrough} mg/L, AUC24 ~${selectedCustomRegimen.auc24} mg·h/L\n`;
      }
      text += `• Mục tiêu AUC24: 400 - 600 mg·h/L (ASHP 2020)\n`;
    }
    text += `• Căn cứ: ${dosing.recommendationSource}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dilution recommendation
  const primaryDose = dosing.loadingDoseMg > 0 ? dosing.loadingDoseMg : activeDoseMg;
  const recommendedVolumeMl = Math.max(100, Math.ceil(primaryDose / 5 / 50) * 50); // <= 5mg/ml

  // Filtered dosing grid
  const displayedGrid = React.useMemo(() => {
    if (!dosing.dosingGrid) return [];
    if (onlyShowWithinGoal) {
      return dosing.dosingGrid.filter(r => r.isWithinGoal);
    }
    return dosing.dosingGrid;
  }, [dosing.dosingGrid, onlyShowWithinGoal]);

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
              Cá thể hóa theo chuẩn ClinCalc & ASHP 2020 (Đích AUC24 = 400 - 600 mg·h/L)
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
              <div className="flex items-center gap-1.5">
                {selectedCustomRegimen && (
                  <button
                    type="button"
                    onClick={() => setSelectedCustomRegimen(null)}
                    title="Khôi phục liều mặc định"
                    className="flex items-center gap-1 text-[10px] text-amber-700 bg-amber-100 hover:bg-amber-200 px-1.5 py-0.5 rounded font-medium transition-all"
                  >
                    <RotateCcw className="w-3 h-3" /> Mặc định
                  </button>
                )}
                <span className="text-[11px] font-semibold text-cyan-700 bg-cyan-100/80 px-2 py-0.5 rounded-full">
                  Tổng 24h: {activeDailyMaintenanceMg.toLocaleString('vi-VN')} mg
                </span>
              </div>
            </div>

            {dosing.maintenanceMethod === 'continuous' ? (
              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-cyan-900 tracking-tight font-mono">
                    {dosing.continuousRateMgPerHour}
                  </span>
                  <span className="text-base font-bold text-slate-700">mg/giờ</span>
                  <span className="text-xs text-slate-500 font-mono">
                    ({activeDailyMaintenanceMg} mg/24h)
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
                    {activeDoseMg.toLocaleString('vi-VN')}
                  </span>
                  <span className="text-base font-bold text-slate-600">mg</span>
                  <span className="text-sm font-semibold text-cyan-700 ml-1">
                    mỗi {activeIntervalHours} giờ
                  </span>
                  {selectedCustomRegimen && (
                    <span className="ml-auto text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                      Bác sĩ đã chọn từ bảng
                    </span>
                  )}
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
                : `${activeInfusionMinutes} phút mỗi cữ`}
            </span>
          </div>
        </div>
      </div>

      {/* ClinCalc Dosing Regimen Grid Table (Intermittent Mode) */}
      {selectedMethod === 'intermittent' && dosing.dosingGrid && dosing.dosingGrid.length > 0 && (
        <div className="mt-4 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
          {/* Table Header & Controls */}
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <TableIcon className="w-4 h-4 text-teal-600" />
                Ma trận Phân liều ClinCalc & Dự đoán Dược động học Quần thể (ASHP 2020)
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Mô hình Matzke: k<sub>e</sub> = {dosing.populationPk?.ke} h⁻¹, t½ = {dosing.populationPk?.halfLifeHours}h, V<sub>d</sub> = {dosing.populationPk?.vdLiters} L ({dosing.populationPk?.vdPerKg} L/kg), CL = {dosing.populationPk?.clLitersPerHour} L/h
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setOnlyShowWithinGoal(!onlyShowWithinGoal)}
                className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  onlyShowWithinGoal
                    ? 'bg-teal-50 border-teal-300 text-teal-800 font-medium'
                    : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Filter className="w-3 h-3" />
                {onlyShowWithinGoal ? 'Chỉ hiện đạt đích (AUC 400-600)' : 'Hiện tất cả liều'}
              </button>
            </div>
          </div>

          {/* Table responsive scroll */}
          <div className="overflow-x-auto max-h-80 overflow-y-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100/80 text-slate-700 sticky top-0 z-10 border-b border-slate-200 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="py-2 px-3">Liều đơn</th>
                  <th className="py-2 px-3">Khoảng cách</th>
                  <th className="py-2 px-3">Thời gian truyền</th>
                  <th className="py-2 px-3">Tổng 24h</th>
                  <th className="py-2 px-3">Peak (C<sub>max</sub>)</th>
                  <th className="py-2 px-3">Trough (C<sub>min</sub>)</th>
                  <th className="py-2 px-3">AUC<sub>24</sub></th>
                  <th className="py-2 px-3">AUC/MIC</th>
                  <th className="py-2 px-3 text-right">Lựa chọn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedGrid.map((reg, idx) => {
                  const isCurrentActive = selectedCustomRegimen 
                    ? (selectedCustomRegimen.doseMg === reg.doseMg && selectedCustomRegimen.intervalHours === reg.intervalHours)
                    : (dosing.maintenanceDoseMg === reg.doseMg && dosing.maintenanceIntervalHours === reg.intervalHours);

                  const isPreferred = reg.isPreferred;

                  return (
                    <tr
                      key={`${reg.doseMg}-${reg.intervalHours}-${idx}`}
                      onClick={() => setSelectedCustomRegimen(reg)}
                      className={`cursor-pointer transition-colors ${
                        isCurrentActive
                          ? 'bg-teal-50/90 font-semibold text-teal-950'
                          : isPreferred
                          ? 'bg-amber-50/70 hover:bg-amber-100/70 text-slate-900'
                          : 'hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <td className="py-2 px-3 font-mono font-bold">
                        {reg.doseMg} mg
                      </td>
                      <td className="py-2 px-3">
                        Mỗi {reg.intervalHours} giờ (Q{reg.intervalHours}h)
                      </td>
                      <td className="py-2 px-3 text-slate-600">
                        {reg.infusionMinutes} phút
                      </td>
                      <td className="py-2 px-3 font-mono">
                        {reg.dailyDoseMg} mg
                      </td>
                      <td className="py-2 px-3 font-mono">
                        {reg.cPeak} mg/L
                      </td>
                      <td className="py-2 px-3 font-mono">
                        <span className={`inline-flex items-center gap-1 ${
                          reg.isHighTroughRisk
                            ? 'text-rose-700 font-bold'
                            : reg.cTrough < 10
                            ? 'text-amber-700'
                            : 'text-emerald-700 font-semibold'
                        }`}>
                          {reg.cTrough} mg/L
                          {reg.isHighTroughRisk && (
                            <span title="Nguy cơ độc tính thận (Trough ≥ 20)" className="text-[10px] px-1 bg-rose-100 rounded text-rose-800">
                              Nguy cơ AKI
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="py-2 px-3 font-mono">
                        <span className={`font-bold ${
                          reg.isWithinGoal ? 'text-emerald-700 font-extrabold' : 'text-slate-500'
                        }`}>
                          {reg.auc24}
                        </span>
                      </td>
                      <td className="py-2 px-3 font-mono">
                        <span className={`px-1.5 py-0.5 rounded text-[11px] font-semibold ${
                          reg.isWithinGoal
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {reg.aucMicRatio}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        {isPreferred && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900 mr-1.5">
                            <Sparkles className="w-2.5 h-2.5" /> Khuyên dùng
                          </span>
                        )}
                        {isCurrentActive ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-600 text-white">
                            <Check className="w-3 h-3" /> Đang áp dụng
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCustomRegimen(reg);
                            }}
                            className="px-2 py-0.5 text-[11px] rounded border border-slate-300 hover:border-teal-500 hover:bg-teal-50 text-slate-700 transition-all"
                          >
                            Chọn
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Màu xanh lá: AUC<sub>24</sub> trong khoảng an toàn và hiệu quả (400 - 600 mg·h/L).
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Tô vàng: Chế độ tối ưu ClinCalc (Preferred Dose) cân bằng AUC ~500 và tiện dụng lâm sàng.
            </span>
          </div>
        </div>
      )}

      {/* Minimalist Administration & Rationale Strip */}
      <div className="mt-3.5 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1 font-medium text-slate-700">
            <span>💧 Pha loãng:</span>
            <strong className="text-slate-900">≤ 5 mg/mL (≥ {recommendedVolumeMl} mL)</strong>
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 font-medium text-slate-700">
            <span>⏱️ Tốc độ:</span>
            <strong className="text-slate-900">≤ 10 mg/phút (≥ 60 phút/1.000 mg)</strong>
          </span>
        </div>
        <div className="text-slate-500 font-mono text-[10px]">
          {dosing.recommendationSource}
        </div>
      </div>
    </div>
  );
};

