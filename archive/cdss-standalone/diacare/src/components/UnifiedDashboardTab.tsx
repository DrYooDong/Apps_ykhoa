import React, { useState } from 'react';
import { 
  Activity,
  UserCheck, 
  Scale, 
  FlaskConical, 
  Pill, 
  Stethoscope, 
  Info, 
  Utensils, 
  Syringe, 
  TrendingUp, 
  Sliders, 
  ArrowRightLeft, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  HeartCrack, 
  Flame, 
  Droplet, 
  Clock, 
  Zap,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileDown
} from 'lucide-react';
import { 
  PatientData, 
  InsulinCalculationResult, 
  ClinicalAlert, 
  GlucoseUnit, 
  DiabetesType, 
  WardType, 
  DietType 
} from '../types/cdss';
import { 
  calculateBMI, 
  formatGlucose, 
  mgDlToMmolL, 
  mmolLToMgDl, 
  normalizeToMgDl, 
  normalizeToMmolL,
  getHypoProtocol,
  calculateEffectiveOsmolality,
  calculateAnionGap
} from '../utils/calculations';

interface UnifiedDashboardTabProps {
  patient: PatientData;
  insulinPlan: InsulinCalculationResult;
  alerts: ClinicalAlert[];
  unit: GlucoseUnit;
  onChangePatient: (updated: Partial<PatientData>) => void;
  onOpenReport: () => void;
}

export const UnifiedDashboardTab: React.FC<UnifiedDashboardTabProps> = ({
  patient,
  insulinPlan,
  alerts,
  unit,
  onChangePatient,
  onOpenReport,
}) => {
  const [showAdvancedLabs, setShowAdvancedLabs] = useState<boolean>(false);
  const [showSpecialTriggers, setShowSpecialTriggers] = useState<boolean>(
    patient.isTakingSteroids || patient.isScheduledSurgery || patient.isOnDialysis || patient.isOnIVInsulin
  );
  const [showAllCorrectionRows, setShowAllCorrectionRows] = useState<boolean>(false);
  const [selectedHypoAlgorithm, setSelectedHypoAlgorithm] = useState<'A' | 'B' | 'C' | 'D' | 'E'>(
    patient.dietType === 'ENTERAL_TUBE' ? 'E' :
    patient.dietType === 'NPO' ? 'D' :
    normalizeToMmolL(patient.currentGlucose, patient.unit) < 3.0 ? 'B' : 'A'
  );

  const bmi = calculateBMI(patient.weightKg, patient.heightCm);
  const currentGlucoseMgDl = normalizeToMgDl(patient.currentGlucose, patient.unit);
  const currentGlucoseMmol = normalizeToMmolL(patient.currentGlucose, patient.unit);

  const criticalAlerts = alerts.filter(a => a.level === 'CRITICAL');
  const warningAlerts = alerts.filter(a => a.level === 'WARNING');

  const activeHypoDetails = getHypoProtocol(
    { 
      ...patient, 
      dietType: selectedHypoAlgorithm === 'E' ? 'ENTERAL_TUBE' : selectedHypoAlgorithm === 'D' ? 'NPO' : patient.dietType 
    }, 
    currentGlucoseMmol
  );

  const effectiveOsm = (patient.sodium && currentGlucoseMmol) 
    ? calculateEffectiveOsmolality(patient.sodium, currentGlucoseMmol) 
    : null;
  const anionGap = (patient.sodium && patient.potassium && patient.chloride && patient.bicarbonate) 
    ? calculateAnionGap(patient.sodium, patient.potassium, patient.chloride, patient.bicarbonate) 
    : null;

  const toggleOralMed = (med: string) => {
    const current = [...patient.currentOralMeds];
    const index = current.indexOf(med);
    if (index >= 0) {
      current.splice(index, 1);
    } else {
      current.push(med);
    }
    onChangePatient({ currentOralMeds: current });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      {/* 1. Critical Clinical Alert Bar (Always Top of Mind if present) */}
      {criticalAlerts.length > 0 && (
        <div className="space-y-3">
          {criticalAlerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-red-50 dark:bg-red-950/50 border-2 border-red-500 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-red-600 text-white shrink-0 mt-0.5 animate-pulse">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-extrabold text-red-900 dark:text-red-200">
                      {alert.title}
                    </h4>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200">
                      BÁO ĐỘNG ĐỎ
                    </span>
                  </div>
                  <p className="text-xs text-red-800 dark:text-red-300 leading-relaxed font-medium">
                    {alert.message}
                  </p>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/80 text-xs text-slate-800 dark:text-slate-200 mt-2">
                    <strong className="text-red-600 dark:text-red-400 block mb-0.5">Xử trí tức thì:</strong>
                    <span>{alert.actionGuideline}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Top Summary Ribbon: TDD Result + Quick Target */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        {/* TDD Highlight Card */}
        <div className="sm:col-span-6 lg:col-span-5 bg-gradient-to-br from-teal-600 to-teal-800 dark:from-teal-700 dark:to-slate-900 rounded-2xl p-5 text-white shadow-md relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-200">
                Tổng Liều Insulin Tự Động (TDD)
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/20 font-bold">
                {insulinPlan.regimenType}
              </span>
            </div>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-4xl font-black tracking-tight">{insulinPlan.tddEstimated}</span>
              <span className="text-sm font-semibold text-teal-200">Đơn vị / ngày</span>
            </div>
            <p className="text-xs text-teal-100/90 mt-1 line-clamp-2">
              ~{insulinPlan.dosePerKgFactor} ĐV/kg thể trọng ({patient.weightKg} kg) • {insulinPlan.rationale}
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 mt-3 grid grid-cols-2 gap-2 text-xs">
            {insulinPlan.regimenType === 'PREMIX' ? (
              <>
                <div className="bg-white/10 rounded-xl p-2">
                  <span className="text-[10px] text-teal-200 block">Mũi Sáng (2/3 TDD):</span>
                  <strong className="text-base font-bold">{insulinPlan.premixDosing?.morningDose || Math.round(insulinPlan.tddEstimated * (2 / 3))} UI</strong>
                  <span className="text-[10px] block opacity-80">Trước ăn sáng</span>
                </div>
                <div className="bg-white/10 rounded-xl p-2">
                  <span className="text-[10px] text-teal-200 block">Mũi Chiều (1/3 TDD):</span>
                  <strong className="text-base font-bold">{insulinPlan.premixDosing?.eveningDose || (insulinPlan.tddEstimated - Math.round(insulinPlan.tddEstimated * (2 / 3)))} UI</strong>
                  <span className="text-[10px] block opacity-80">Trước ăn tối</span>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white/10 rounded-xl p-2">
                  <span className="text-[10px] text-teal-200 block">Nền (Basal 50%):</span>
                  <strong className="text-base font-bold">{insulinPlan.basalDose} UI</strong>
                  <span className="text-[10px] block opacity-80">21:00 tối</span>
                </div>
                <div className="bg-white/10 rounded-xl p-2">
                  <span className="text-[10px] text-teal-200 block">Bữa ăn (Prandial):</span>
                  <strong className="text-base font-bold">{insulinPlan.prandialDoseTotal} UI</strong>
                  <span className="text-[10px] block opacity-80">
                    {insulinPlan.regimenType === 'BASAL_BOLUS' ? 'Chia 3 bữa' : 'Hiệu chỉnh (Bolus)'}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Target & Current Glucose Quick Widget */}
        <div className="sm:col-span-6 lg:col-span-7 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Mục Tiêu Đường Huyết Nội Viện (ADA 2026 / JBDS-IP)
              </span>
              <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                {patient.wardType === 'ICU' 
                  ? '140 – 180 mg/dL (7.8 – 10.0 mmol/L)' 
                  : '100 – 180 mg/dL (5.6 – 10.0 mmol/L)'}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Đo gần nhất</span>
              <span className="text-base sm:text-lg font-extrabold text-teal-600 dark:text-teal-400">
                {formatGlucose(patient.currentGlucose, patient.unit, unit)}
              </span>
            </div>
          </div>

          {/* Quick Titration recommendation if available */}
          {insulinPlan.regimenType === 'PREMIX' ? (
            <div className="p-2.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 text-xs flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-bold flex items-center space-x-1 text-amber-800 dark:text-amber-300">
                  <ArrowRightLeft className="w-3.5 h-3.5 text-teal-600" />
                  <span>Quy tắc chỉnh liều chéo Premix:</span>
                </span>
                <span className="line-clamp-1">Liều Sáng chỉnh theo ĐH chiều • Liều Chiều chỉnh theo ĐH đói sáng</span>
              </div>
              <span className="font-bold text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 shadow-sm shrink-0 ml-2">
                ±10% - 30%
              </span>
            </div>
          ) : insulinPlan.basalTitrationGuidance ? (
            <div className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${
              insulinPlan.basalTitrationGuidance.alertSeverity === 'danger'
                ? 'bg-red-50 dark:bg-red-950/60 border-red-300 text-red-900 dark:text-red-200'
                : insulinPlan.basalTitrationGuidance.alertSeverity === 'warning'
                ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 text-amber-900 dark:text-amber-200'
                : 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 text-emerald-900 dark:text-emerald-200'
            }`}>
              <div className="space-y-0.5">
                <span className="font-bold flex items-center space-x-1">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Chỉnh liều nền hôm nay:</span>
                </span>
                <span className="line-clamp-1">{insulinPlan.basalTitrationGuidance.actionText}</span>
              </div>
              <span className="font-bold text-sm px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 shadow-sm shrink-0 ml-2">
                Liều mới: {Math.max(1, insulinPlan.basalDose + insulinPlan.basalTitrationGuidance.adjustmentUnits)} UI
              </span>
            </div>
          ) : (
            <div className="text-xs text-slate-500 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl">
              <span>Đường huyết đói sáng: Chưa có</span>
              <span className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">Nhập ĐH đói ở bảng dưới để tự động chỉnh liều</span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
            <span>• An toàn tuyệt đối: "4.0 is the floor" (&ge; 70 mg/dL)</span>
            <button
              onClick={onOpenReport}
              className="text-teal-600 dark:text-teal-400 font-bold hover:underline inline-flex items-center space-x-1"
              title="Mở phiếu báo cáo y lệnh và tải PDF"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Xem & In Báo Cáo Y Lệnh PDF &rarr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Thẻ Thông Số Bệnh Nhân Cốt Lõi (Core Patient Parameters Card - Compact & Optimized) */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-3 sm:p-3.5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-700/80">
          <div className="flex items-center space-x-2">
            <div className="p-1 rounded-md bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400">
              <Activity className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center space-x-1.5">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                Thông Số Bệnh Nhân Cốt Lõi
              </h3>
              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300">
                TDD Key
              </span>
            </div>
          </div>
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate max-w-[140px] sm:max-w-none">
            {patient.patientName || 'Bệnh nhân nội viện'}
          </span>
        </div>

        {/* Responsive Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {/* Card 1: Đường Huyết Hiện Tại */}
          <div className="p-2.5 rounded-lg bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                  <Flame className="w-3.5 h-3.5 text-rose-500" />
                  <span>Đường huyết hiện tại</span>
                  <span className="text-rose-500">*</span>
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                  {unit === 'mg_dl' ? 'mg/dL' : 'mmol/L'}
                </span>
              </div>

              <div className="relative">
                <input
                  type="number"
                  step={unit === 'mmol_l' ? '0.1' : '1'}
                  value={patient.currentGlucose || ''}
                  onChange={(e) => onChangePatient({ currentGlucose: parseFloat(e.target.value) || 0, unit })}
                  placeholder="Nhập ĐH"
                  className={`w-full px-2.5 py-1 text-lg font-black rounded-lg border bg-white dark:bg-slate-800 transition focus:ring-1 focus:ring-teal-500 ${
                    patient.currentGlucose < (unit === 'mg_dl' ? 70 : 3.9)
                      ? 'border-rose-500 text-rose-600 animate-pulse bg-rose-50/40 dark:bg-rose-950/30'
                      : patient.currentGlucose > (unit === 'mg_dl' ? 300 : 16.7)
                      ? 'border-rose-500 text-rose-600'
                      : patient.currentGlucose > (unit === 'mg_dl' ? 180 : 10.0)
                      ? 'border-amber-400 text-amber-600'
                      : 'border-slate-200 dark:border-slate-700 text-teal-600 dark:text-teal-400'
                  }`}
                />
                <span className="absolute right-2.5 top-1.5 text-[11px] font-bold text-slate-400">
                  {unit === 'mg_dl' ? 'mg/dL' : 'mmol/L'}
                </span>
              </div>
            </div>

            {/* Status and Unit conversion */}
            <div className="space-y-1 pt-0.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-500">Quy đổi:</span>
                <strong className="text-slate-700 dark:text-slate-300">
                  {unit === 'mg_dl'
                    ? `≈ ${currentGlucoseMmol.toFixed(1)} mmol/L`
                    : `≈ ${Math.round(currentGlucoseMgDl)} mg/dL`}
                </strong>
              </div>

              <div className="text-[10px] font-semibold">
                {currentGlucoseMmol < 4.0 ? (
                  <span className="px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 block text-center truncate">
                    🚨 Cảnh báo HẠ ĐƯỜNG HUYẾT
                  </span>
                ) : currentGlucoseMmol < 5.6 ? (
                  <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 block text-center truncate">
                    ⚠️ Mức đói / Looming hypo
                  </span>
                ) : currentGlucoseMmol <= 10.0 ? (
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 block text-center truncate">
                    ✓ Đạt mục tiêu (ADA 2026)
                  </span>
                ) : currentGlucoseMmol <= 16.6 ? (
                  <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 block text-center truncate">
                    ⚡ Tăng ĐH &ge; 10 mmol/L
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 block text-center truncate">
                    🔥 Tăng rất cao (&ge; 300 mg/dL)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Chỉ Số HbA1c (%) */}
          <div className="p-2.5 rounded-lg bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Chỉ số HbA1c</span>
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                  % (3 tháng)
                </span>
              </div>

              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={patient.hba1c || ''}
                  onChange={(e) => onChangePatient({ hba1c: parseFloat(e.target.value) || undefined })}
                  placeholder="VD: 8.2"
                  className="w-full px-2.5 py-1 text-lg font-black rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 focus:ring-1 focus:ring-indigo-500 transition"
                />
                <span className="absolute right-2.5 top-1.5 text-[11px] font-bold text-slate-400">
                  %
                </span>
              </div>
            </div>

            {/* HbA1c Clinical Meaning */}
            <div className="space-y-1 pt-0.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-500">Xuất viện:</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">
                  {patient.hba1c ? (patient.hba1c > 9.0 ? 'Insulin ngoại trú' : patient.hba1c > 7.0 ? 'Thêm OAD/Insulin' : 'Duy trì OAD') : 'Chưa có'}
                </span>
              </div>

              <div className="text-[10px] font-semibold">
                {!patient.hba1c ? (
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 block text-center truncate">
                    Chưa có xét nghiệm gần đây
                  </span>
                ) : patient.hba1c < 7.0 ? (
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 block text-center truncate">
                    ✓ Kiểm soát tốt (&lt; 7.0%)
                  </span>
                ) : patient.hba1c <= 8.5 ? (
                  <span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 block text-center truncate">
                    ℹ️ Kiểm soát TB (7.0 - 8.5%)
                  </span>
                ) : patient.hba1c <= 9.0 ? (
                  <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 block text-center truncate">
                    ⚠️ Kiểm soát kém (8.6 - 9.0%)
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 block text-center truncate">
                    🔥 Kháng insulin cao (&gt; 9.0%)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Card 3: Cân Nặng & Thể Trạng (BMI) */}
          <div className="p-2.5 rounded-lg bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                  <Scale className="w-3.5 h-3.5 text-teal-600" />
                  <span>Cân nặng &amp; Thể trạng</span>
                  <span className="text-rose-500">*</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300">
                  BMI: {bmi > 0 ? `${bmi} kg/m²` : '--'}
                </span>
              </div>

              <div className="grid grid-cols-12 gap-1.5">
                <div className="col-span-7 relative">
                  <input
                    type="number"
                    step="0.5"
                    value={patient.weightKg || ''}
                    onChange={(e) => onChangePatient({ weightKg: parseFloat(e.target.value) || 0 })}
                    placeholder="Cân nặng"
                    className="w-full px-2.5 py-1 text-lg font-black rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 focus:ring-1 focus:ring-teal-500 transition"
                  />
                  <span className="absolute right-2 top-1.5 text-[11px] font-bold text-slate-400">
                    kg
                  </span>
                </div>
                <div className="col-span-5 relative">
                  <input
                    type="number"
                    value={patient.heightCm || ''}
                    onChange={(e) => onChangePatient({ heightCm: parseFloat(e.target.value) || undefined })}
                    placeholder="Cao"
                    className="w-full px-2 py-1 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:ring-1 focus:ring-teal-500 transition"
                  />
                  <span className="absolute right-1.5 top-1.5 text-[10px] font-medium text-slate-400">
                    cm
                  </span>
                </div>
              </div>
            </div>

            {/* BMI & Dose factor status */}
            <div className="space-y-1 pt-0.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-500">Hệ số TDD:</span>
                <strong className="text-teal-700 dark:text-teal-300 font-bold">
                  ~{insulinPlan.dosePerKgFactor} ĐV/kg
                </strong>
              </div>

              <div className="text-[10px] font-semibold">
                {bmi > 0 && bmi < 18.5 ? (
                  <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 block text-center truncate">
                    Gầy (0.3 ĐV/kg - Nguy cơ hạ ĐH)
                  </span>
                ) : bmi >= 27.5 ? (
                  <span className="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 block text-center truncate">
                    Béo phì / Kháng insulin (0.55-0.6)
                  </span>
                ) : bmi >= 23.0 ? (
                  <span className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 block text-center truncate">
                    Thừa cân (0.5 ĐV/kg)
                  </span>
                ) : bmi > 0 ? (
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 block text-center truncate">
                    Thể trạng chuẩn (0.4 ĐV/kg)
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 block text-center truncate">
                    Nhập chiều cao tính BMI
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Main Workspace: Clinical Context (Left) + Direct Insulin & Scale (Right) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Tinh Gọn Nhập Liệu Bối Cảnh (md:col-span-5) */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
              <h3 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 flex items-center space-x-2">
                <UserCheck className="w-4 h-4 text-teal-600" />
                <span>Bối Cảnh Lâm Sàng &amp; Phác Đồ</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">Phiên làm việc RAM</span>
            </div>

            {/* Row 1: Tuổi & ĐH Đói (để chỉnh liều) */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Tuổi (năm)
                </label>
                <input
                  type="number"
                  value={patient.age || ''}
                  onChange={(e) => onChangePatient({ age: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  ĐH Đói sáng ({unit === 'mg_dl' ? 'mg/dL' : 'mmol/L'})
                </label>
                <input
                  type="number"
                  step={unit === 'mmol_l' ? '0.1' : '1'}
                  value={patient.fastingGlucose || ''}
                  onChange={(e) => onChangePatient({ fastingGlucose: parseFloat(e.target.value) || undefined })}
                  placeholder="Chỉnh nền Rushakoff"
                  className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold"
                />
              </div>
            </div>

            {/* Row 2: Phân loại ĐTĐ & Khoa phòng */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Phân loại ĐTĐ
                </label>
                <select
                  value={patient.diabetesType}
                  onChange={(e) => onChangePatient({ diabetesType: e.target.value as DiabetesType })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                >
                  <option value="T2D">ĐTĐ Típ 2</option>
                  <option value="T1D">ĐTĐ Típ 1 (Không bỏ nền)</option>
                  <option value="NEW_ONSET">Mới chẩn đoán</option>
                  <option value="STRESS">Do Stress / Thuốc</option>
                  <option value="SECONDARY">Típ 3c / Tụy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Khu vực
                </label>
                <select
                  value={patient.wardType}
                  onChange={(e) => onChangePatient({ wardType: e.target.value as WardType })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold"
                >
                  <option value="NON_ICU">Khoa Nội / Ngoại</option>
                  <option value="ICU">Hồi sức ICU / SSĐB</option>
                </select>
              </div>
            </div>

            {/* Core Row 4: Tình trạng Ăn uống */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Chế độ ăn uống:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'ORAL_FULL' as DietType, label: 'Ăn tốt (Basal-Bolus)' },
                  { id: 'ORAL_POOR' as DietType, label: 'Ăn kém (Basal Plus)' },
                  { id: 'NPO' as DietType, label: 'Nhịn ăn (NPO)' },
                  { id: 'ENTERAL_TUBE' as DietType, label: 'Sonde dạ dày' },
                  { id: 'TPN' as DietType, label: 'Nuôi tĩnh mạch TPN' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onChangePatient({ dietType: item.id })}
                    className={`py-1.5 px-2 rounded-lg text-center text-xs transition border ${
                      patient.dietType === item.id
                        ? 'bg-teal-600 text-white border-teal-600 font-bold'
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Phác đồ Điều Trị Mong Muốn */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Phác đồ điều trị:
                </label>
                <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold">
                  {patient.userPreferredRegimen ? 'Đang chỉ định cụ thể' : 'Tự động theo ADA & ăn uống'}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: undefined, label: 'Tự động (Theo ADA)' },
                  { id: 'BASAL_BOLUS' as const, label: 'Basal-Bolus (Nền - Bữa)' },
                  { id: 'BASAL_PLUS' as const, label: 'Basal Plus (Nền + Hiệu chỉnh)' },
                  { id: 'PREMIX' as const, label: 'Premix (Trộn sẵn 70/30)' },
                ].map((reg) => (
                  <button
                    key={reg.label}
                    type="button"
                    onClick={() => onChangePatient({ userPreferredRegimen: reg.id })}
                    className={`py-1.5 px-2 rounded-lg text-center text-xs transition border ${
                      patient.userPreferredRegimen === reg.id
                        ? 'bg-indigo-600 text-white border-indigo-600 font-bold shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {reg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Collapsible: Xét Nghiệm Nâng Cao (eGFR, Ceton, Khí máu, Điện giải) */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setShowAdvancedLabs(!showAdvancedLabs)}
                className="w-full flex items-center justify-between text-xs font-bold text-teal-600 dark:text-teal-400 py-1"
              >
                <span className="flex items-center space-x-1.5">
                  <FlaskConical className="w-3.5 h-3.5" />
                  <span>Xét nghiệm chuyên sâu (eGFR, Ceton, Khí máu, K+)</span>
                </span>
                {showAdvancedLabs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showAdvancedLabs && (
                <div className="grid grid-cols-3 gap-2.5 pt-3">
                  <div>
                    <label className="text-[11px] text-slate-500 block">eGFR (mL/ph)</label>
                    <input
                      type="number"
                      value={patient.egfr || ''}
                      onChange={(e) => onChangePatient({ egfr: parseFloat(e.target.value) || undefined })}
                      placeholder="VD: 45"
                      className="w-full px-2 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block">Ceton (mmol/L)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={patient.bloodKetones || ''}
                      onChange={(e) => onChangePatient({ bloodKetones: parseFloat(e.target.value) || undefined })}
                      placeholder="VD: 0.3"
                      className="w-full px-2 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block">K+ (mmol/L)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={patient.potassium || ''}
                      onChange={(e) => onChangePatient({ potassium: parseFloat(e.target.value) || undefined })}
                      placeholder="VD: 4.2"
                      className="w-full px-2 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block">pH tĩnh mạch</label>
                    <input
                      type="number"
                      step="0.01"
                      value={patient.venousPh || ''}
                      onChange={(e) => onChangePatient({ venousPh: parseFloat(e.target.value) || undefined })}
                      placeholder="VD: 7.35"
                      className="w-full px-2 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block">HCO3 (mmol/L)</label>
                    <input
                      type="number"
                      value={patient.bicarbonate || ''}
                      onChange={(e) => onChangePatient({ bicarbonate: parseFloat(e.target.value) || undefined })}
                      placeholder="VD: 22"
                      className="w-full px-2 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-500 block">Na+ (mmol/L)</label>
                    <input
                      type="number"
                      value={patient.sodium || ''}
                      onChange={(e) => onChangePatient({ sodium: parseFloat(e.target.value) || undefined })}
                      placeholder="VD: 138"
                      className="w-full px-2 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Collapsible: Tình Huống Đặc Thù (Corticoid, Phẫu thuật, Thận, Chuyển IV) */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setShowSpecialTriggers(!showSpecialTriggers)}
                className="w-full flex items-center justify-between text-xs font-bold text-teal-600 dark:text-teal-400 py-1"
              >
                <span className="flex items-center space-x-1.5">
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>Tình huống đặc thù (Corticoid, Chu phẫu, Lọc máu, Chuyển TTM)</span>
                </span>
                {showSpecialTriggers ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showSpecialTriggers && (
                <div className="space-y-3 pt-3 text-xs">
                  {/* Steroids */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Đang dùng Corticoid
                    </span>
                    <input
                      type="checkbox"
                      checked={patient.isTakingSteroids}
                      onChange={(e) => onChangePatient({ isTakingSteroids: e.target.checked })}
                      className="w-4 h-4 accent-teal-600 rounded"
                    />
                  </div>

                  {/* Surgery */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Chu phẫu / Phẫu thuật (Mổ phiên)
                    </span>
                    <input
                      type="checkbox"
                      checked={patient.isScheduledSurgery}
                      onChange={(e) => onChangePatient({ isScheduledSurgery: e.target.checked })}
                      className="w-4 h-4 accent-teal-600 rounded"
                    />
                  </div>

                  {/* Dialysis */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Lọc máu / Thận nhân tạo (mHDx)
                    </span>
                    <input
                      type="checkbox"
                      checked={patient.isOnDialysis}
                      onChange={(e) => onChangePatient({ isOnDialysis: e.target.checked, isDialysisDay: e.target.checked })}
                      className="w-4 h-4 accent-teal-600 rounded"
                    />
                  </div>

                  {/* IV Transition */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        Đang truyền TTM liên tục (IV $\rightarrow$ SC)
                      </span>
                      <input
                        type="checkbox"
                        checked={patient.isOnIVInsulin}
                        onChange={(e) => onChangePatient({ isOnIVInsulin: e.target.checked })}
                        className="w-4 h-4 accent-teal-600 rounded"
                      />
                    </div>
                    {patient.isOnIVInsulin && (
                      <div className="flex items-center space-x-2 pt-1">
                        <span className="text-[11px] text-slate-500">Tốc độ TB 6h qua:</span>
                        <input
                          type="number"
                          step="0.1"
                          value={patient.ivRateLast6hAvg || ''}
                          onChange={(e) => onChangePatient({ ivRateLast6hAvg: parseFloat(e.target.value) || 0 })}
                          placeholder="VD: 1.5"
                          className="w-20 px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-teal-600 font-bold"
                        />
                        <span className="text-[11px] text-slate-500">ĐV/h</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Oral Meds tags */}
            <div>
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                Thuốc uống OAD đang dùng:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'metformin', label: 'Metformin' },
                  { id: 'gliclazide', label: 'Sulfonylurea' },
                  { id: 'dapagliflozin', label: 'SGLT2i' },
                  { id: 'linagliptin', label: 'DPP-4i' },
                ].map((m) => {
                  const active = patient.currentOralMeds.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => toggleOralMed(m.id)}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-medium border transition ${
                        active 
                          ? 'bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border-teal-300 dark:border-teal-700 font-bold' 
                          : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {active ? '✓ ' : '+ '}{m.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quản Lý Liều Insulin & Cảnh Báo Lâm Sàng (7 cols) */}
        <div className="md:col-span-7 space-y-5">
          {/* Card: Phác Đồ Tiêm Dưới Da (SC Dosing Detail) */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-900/40 text-teal-600">
                  <Syringe className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                  Phân Bổ Liều Insulin Tiêm Dưới Da (SC)
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 font-semibold text-slate-600 dark:text-slate-300">
                U-100 (100 ĐV/mL)
              </span>
            </div>

            {/* Dosing Row */}
            {insulinPlan.regimenType === 'PREMIX' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Premix Morning Box (2/3 TDD) */}
                  <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Mũi Sáng (2/3 TDD)</span>
                      </span>
                      <span className="text-2xl font-black text-amber-700 dark:text-amber-300">
                        {insulinPlan.premixDosing?.morningDose || Math.round(insulinPlan.tddEstimated * (2 / 3))} <span className="text-xs font-normal">ĐV</span>
                      </span>
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                      <div><strong>Thời điểm:</strong> Trước ăn sáng 0-15 phút (Analog) hoặc 30 phút (Human)</div>
                      <div className="text-[11px] text-slate-500">
                        Chế phẩm: NovoMix 30 (Aspart), Humalog Mix 25/50 (Lispro), Mixtard 30
                      </div>
                      <div className="text-[11px] text-teal-700 dark:text-teal-400 font-semibold pt-1">
                        🎯 <strong>Quy tắc chỉnh liều:</strong> Dựa theo Đường huyết mao mạch TRƯỚC BỮA ĂN CHIỀU (hoặc sau ăn trưa).
                      </div>
                    </div>
                  </div>

                  {/* Premix Evening Box (1/3 TDD) */}
                  <div className="p-4 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-purple-800 dark:text-purple-400 uppercase tracking-wider flex items-center space-x-1.5">
                        <Utensils className="w-3.5 h-3.5" />
                        <span>Mũi Chiều / Tối (1/3 TDD)</span>
                      </span>
                      <span className="text-2xl font-black text-purple-700 dark:text-purple-300">
                        {insulinPlan.premixDosing?.eveningDose || (insulinPlan.tddEstimated - Math.round(insulinPlan.tddEstimated * (2 / 3)))} <span className="text-xs font-normal">ĐV</span>
                      </span>
                    </div>
                    <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                      <div><strong>Thời điểm:</strong> Trước ăn tối 0-15 phút (Analog) hoặc 30 phút (Human)</div>
                      <div className="text-[11px] text-slate-500">
                        Chế phẩm: NovoMix 30, Humalog Mix 25/50, Mixtard 30
                      </div>
                      <div className="text-[11px] text-teal-700 dark:text-teal-400 font-semibold pt-1">
                        🎯 <strong>Quy tắc chỉnh liều:</strong> Dựa theo Đường huyết mao mạch TRƯỚC BỮA ĂN SÁNG hôm sau (Fasting BG).
                      </div>
                    </div>
                  </div>
                </div>

                {/* Premix Safety Warning Banner */}
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start space-x-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold">Lưu ý an toàn tuyệt đối với Insulin Trộn Sẵn:</span>
                    <p className="text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
                      Bệnh nhân <strong>BẮT BUỘC</strong> phải ăn đúng giờ và đủ tinh bột. Cảnh báo nguy cơ hạ đường huyết vào giữa buổi chiều (đỉnh NPH mũi sáng) và từ 1:00 - 3:00 sáng (đỉnh NPH mũi chiều). Không dùng cho bệnh nhân nhịn ăn NPO hoặc chuẩn bị phẫu thuật.
                    </p>
                  </div>
                </div>

                {/* Premix Cross Titration Table */}
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
                      <ArrowRightLeft className="w-3.5 h-3.5 text-teal-600" />
                      <span>Quy Tắc Chỉnh Liều Chéo (TS.BS Trần Quang Nam - ĐHYD TP.HCM):</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold">
                      Chỉnh theo bước ±10 - 30%
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                    <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-left">
                      <thead className="bg-slate-50 dark:bg-slate-900 font-bold text-slate-700 dark:text-slate-300 text-[11px]">
                        <tr>
                          <th className="py-2 px-3">Mức Đường Huyết Thử Nghiệm</th>
                          <th className="py-2 px-3 text-center">Tỷ Lệ Chỉnh Liều</th>
                          <th className="py-2 px-3">Ý Nghĩa &amp; Hành Động</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-[11px]">
                        <tr className="bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-300">
                          <td className="py-2 px-3 font-semibold">&lt; 4.4 mmol/L (&lt; 80 mg/dL)</td>
                          <td className="py-2 px-3 text-center font-bold text-red-600 dark:text-red-400">-20% liều</td>
                          <td className="py-2 px-3">Hạ đường huyết: Giảm 20% liều tương ứng và xử trí cấp cứu ngay</td>
                        </tr>
                        <tr className="bg-teal-50/40 dark:bg-teal-950/20 text-teal-800 dark:text-teal-300">
                          <td className="py-2 px-3 font-semibold">4.4 - 7.7 mmol/L (81 - 139 mg/dL)</td>
                          <td className="py-2 px-3 text-center font-bold text-teal-600 dark:text-teal-400">Giữ nguyên (0%)</td>
                          <td className="py-2 px-3">ĐẠT MỤC TIÊU KIỂM SOÁT TỐT</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold">7.8 - 9.9 mmol/L (140 - 179 mg/dL)</td>
                          <td className="py-2 px-3 text-center font-bold text-amber-600">+10% liều</td>
                          <td className="py-2 px-3 text-slate-600 dark:text-slate-400">Tăng nhẹ liều tương ứng</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold">10.0 - 13.8 mmol/L (180 - 249 mg/dL)</td>
                          <td className="py-2 px-3 text-center font-bold text-amber-600">+20% liều</td>
                          <td className="py-2 px-3 text-slate-600 dark:text-slate-400">Tăng vừa liều tương ứng</td>
                        </tr>
                        <tr className="bg-red-50/30 dark:bg-red-950/10">
                          <td className="py-2 px-3 font-semibold">&ge; 13.9 mmol/L (&ge; 250 mg/dL)</td>
                          <td className="py-2 px-3 text-center font-bold text-red-600 dark:text-red-400">+30% liều</td>
                          <td className="py-2 px-3 text-slate-600 dark:text-slate-400">Tăng mạnh liều và rà soát chế độ ăn/nhiễm trùng</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Basal Dose Box */}
                <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Insulin Nền (50%)</span>
                    </span>
                    <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                      {insulinPlan.basalDose} <span className="text-xs font-normal">ĐV</span>
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                    <div><strong>Thời điểm:</strong> 21:00 tối cố định</div>
                    <div className="text-[11px] text-slate-500">
                      Thuốc: Glargine (Lantus), Degludec (Tresiba) hoặc Detemir
                    </div>
                    <div className="text-[10px] text-red-600 dark:text-red-400 font-medium pt-1">
                      ⚠️ Tuyệt đối không bỏ liều nền kể cả khi nhịn ăn NPO!
                    </div>
                  </div>
                </div>

                {/* Prandial Dose Box */}
                <div className="p-4 rounded-xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <Utensils className="w-3.5 h-3.5" />
                      <span>Insulin Bữa Ăn (50%)</span>
                    </span>
                    <span className="text-2xl font-black text-teal-600 dark:text-teal-400">
                      {insulinPlan.prandialDoseTotal} <span className="text-xs font-normal">ĐV</span>
                    </span>
                  </div>

                  {insulinPlan.regimenType === 'BASAL_BOLUS' ? (
                    <div className="text-xs space-y-1.5">
                      <div className="grid grid-cols-3 gap-1.5 text-center font-bold">
                        <div className="bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-teal-100 dark:border-teal-800">
                          <span className="text-[10px] text-slate-400 font-normal block">Sáng</span>
                          <span>{insulinPlan.prandialBreakfast} UI</span>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-teal-100 dark:border-teal-800">
                          <span className="text-[10px] text-slate-400 font-normal block">Trưa</span>
                          <span>{insulinPlan.prandialLunch} UI</span>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-1.5 rounded-lg border border-teal-100 dark:border-teal-800">
                          <span className="text-[10px] text-slate-400 font-normal block">Tối</span>
                          <span>{insulinPlan.prandialDinner} UI</span>
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Tiêm trước ăn 0-15 phút (Aspart, Lispro) hoặc Regular (trước 30 phút).
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-amber-800 dark:text-amber-300">
                      <strong>Chế độ Basal Plus:</strong> 0 ĐV cố định. Chỉ tiêm liều hiệu chỉnh khi ĐH &ge; 140 mg/dL.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Correction Scale Table */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Thang Liều Hiệu Chỉnh Trước Bữa Ăn:
                </span>
                <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400">
                  {insulinPlan.recommendedCorrectionColumn}
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-left">
                  <thead className="bg-slate-50 dark:bg-slate-900 font-bold text-slate-700 dark:text-slate-300">
                    <tr>
                      <th className="py-2 px-3">Mức Đường Huyết Trước Ăn</th>
                      <th className="py-2 px-3 text-center text-teal-700 dark:text-teal-300">Liều Bổ Sung</th>
                      <th className="py-2 px-3">Lưu ý</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {insulinPlan.correctionScale.slice(0, showAllCorrectionRows ? undefined : 4).map((row, idx) => (
                      <tr key={idx} className={idx === 0 ? 'bg-red-50/50 dark:bg-red-950/20 text-red-700' : ''}>
                        <td className="py-2 px-3 font-medium">{row.rangeDesc}</td>
                        <td className="py-2 px-3 text-center font-bold text-teal-600 dark:text-teal-400">
                          {insulinPlan.patientSensitivityCategory === 'SENSITIVE' ? (row.sensitiveDose > 0 ? `+${row.sensitiveDose}` : row.sensitiveDose) :
                           insulinPlan.patientSensitivityCategory === 'RESISTANT' ? (row.resistantDose > 0 ? `+${row.resistantDose}` : row.resistantDose) :
                           (row.usualDose > 0 ? `+${row.usualDose}` : row.usualDose)} UI
                        </td>
                        <td className="py-2 px-3 text-slate-500 text-[11px]">
                          {idx === 0 ? 'Hạ ĐH - Bù đường ngay' : idx === 1 ? 'Đạt mục tiêu' : 'Cộng vào liều bữa ăn'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center text-[11px]">
                <button
                  type="button"
                  onClick={() => setShowAllCorrectionRows(!showAllCorrectionRows)}
                  className="text-teal-600 dark:text-teal-400 font-bold hover:underline"
                >
                  {showAllCorrectionRows ? 'Thu gọn thang liều' : 'Xem toàn bộ 7 mức đường huyết (+12 UI)'}
                </button>
                <span className="text-slate-500 italic">Dùng cùng loại insulin nhanh</span>
              </div>
            </div>
          </div>

          {/* Card: Phác Đồ Cấp Cứu Hạ Đường Huyết (Nguyên tắc Make 4 the floor) */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-red-100 dark:bg-red-950 text-red-600">
                  <HeartCrack className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                  Xử Trí Khẩn Hạ Đường Huyết (JBDS-IP 01)
                </h3>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300">
                4.0 is the floor
              </span>
            </div>

            {/* Quick Pathway Selectors */}
            <div className="grid grid-cols-5 gap-1 text-[11px]">
              {[
                { id: 'A', label: 'Tỉnh, nuốt được' },
                { id: 'B', label: 'Lú lẫn/Kích động' },
                { id: 'C', label: 'Hôn mê/Co giật' },
                { id: 'D', label: 'Nhịn ăn (NPO)' },
                { id: 'E', label: 'Sonde dạ dày' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setSelectedHypoAlgorithm(btn.id as any)}
                  className={`py-1.5 px-1 rounded-lg border text-center font-semibold transition ${
                    selectedHypoAlgorithm === btn.id
                      ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span className="block font-bold">Phác đồ {btn.id}</span>
                  <span className="text-[9px] line-clamp-1 opacity-80">{btn.label}</span>
                </button>
              ))}
            </div>

            {/* Content of Selected Pathway */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
              <div className="font-bold text-slate-800 dark:text-slate-200">
                {activeHypoDetails.title}
              </div>
              <ul className="space-y-1 text-slate-600 dark:text-slate-400 pl-1">
                {activeHypoDetails.immediateAction.map((act, i) => (
                  <li key={i}>• {act}</li>
                ))}
              </ul>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-teal-700 dark:text-teal-300">
                <strong>Thử lại:</strong> {activeHypoDetails.retestInstructions}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
