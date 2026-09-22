import React, { useState } from 'react';
import { 
  User, 
  Scale, 
  Droplet, 
  Building2, 
  AlertTriangle,
  ArrowRightLeft,
  Activity,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Edit3
} from 'lucide-react';
import { PatientProfile, RenalCalculations } from '../types';

interface PatientInputCardProps {
  patient: PatientProfile;
  renal: RenalCalculations;
  onChange: (updated: Partial<PatientProfile>) => void;
  defaultCollapsed?: boolean;
}

const NEPHROTOXIC_DRUGS = [
  'Piperacillin/Tazobactam',
  'Flucloxacillin',
  'Aminoglycoside',
  'Furosemide',
  'Amphotericin B',
  'Thuốc cản quang IV',
  'Thuốc vận mạch'
];

export const PatientInputCard: React.FC<PatientInputCardProps> = ({
  patient,
  renal,
  onChange,
  defaultCollapsed = false
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  const toggleNephrotoxin = (drug: string) => {
    const list = [...patient.concomitantNephrotoxins];
    const idx = list.indexOf(drug);
    if (idx >= 0) {
      list.splice(idx, 1);
    } else {
      list.push(drug);
    }
    onChange({ concomitantNephrotoxins: list });
  };

  const toggleScrUnit = () => {
    if (patient.scrUnit === 'umol_L') {
      const newScr = Number((patient.scrValue / 88.4).toFixed(2));
      onChange({ scrUnit: 'mg_dL', scrValue: newScr });
    } else {
      const newScr = Math.round(patient.scrValue * 88.4);
      onChange({ scrUnit: 'umol_L', scrValue: newScr });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 transition-all">
      {/* Header with Title and Collapse/Expand Toggle */}
      <div className="flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <User className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Thông tin Bệnh nhân & Thận</span>
              <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-normal">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                Không lưu trữ dữ liệu BN
              </span>
            </h2>
          </div>
        </div>

        {/* Action Controls: Age Pill + Collapse Toggle */}
        <div className="flex items-center gap-2">
          {!isCollapsed && (
            <div className="hidden sm:flex bg-slate-100 p-0.5 rounded-lg text-[11px] font-medium">
              <button
                type="button"
                onClick={() => onChange({ patientType: 'adult', ageUnit: 'years', age: Math.max(18, patient.age) })}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  patient.patientType === 'adult' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500'
                }`}
              >
                Người lớn
              </button>
              <button
                type="button"
                onClick={() => onChange({ patientType: 'pediatric', ageUnit: 'years', age: 8 })}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  patient.patientType === 'pediatric' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500'
                }`}
              >
                Trẻ em
              </button>
              <button
                type="button"
                onClick={() => onChange({ patientType: 'neonatal', ageUnit: 'weeks', age: 3 })}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  patient.patientType === 'neonatal' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500'
                }`}
              >
                Sơ sinh
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-lg transition-all flex items-center gap-1"
            title={isCollapsed ? 'Mở rộng bảng thông tin' : 'Thu gọn bảng thông tin'}
          >
            {isCollapsed ? (
              <>
                <Edit3 className="w-3 h-3 text-teal-600" />
                <span>Mở rộng</span>
                <ChevronDown className="w-3 h-3 ml-0.5" />
              </>
            ) : (
              <>
                <span>Thu gọn</span>
                <ChevronUp className="w-3 h-3 ml-0.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* COLLAPSED SUMMARY VIEW (Takes minimal space) */}
      {isCollapsed ? (
        <div 
          onClick={() => setIsCollapsed(false)}
          className="cursor-pointer bg-slate-50/80 hover:bg-slate-100/70 p-2.5 rounded-lg border border-slate-200/80 flex flex-wrap items-center justify-between gap-y-1.5 gap-x-3 text-xs transition-all"
        >
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">
              {patient.gender === 'male' ? 'Nam' : 'Nữ'}, {patient.age} {patient.ageUnit === 'years' ? 'tuổi' : 'tháng'}
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600 font-medium">
              {patient.weight}kg • {patient.height}cm
            </span>
            <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-semibold">
              BMI {renal.bmi}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="text-slate-500 font-medium">CrCl:</span>
              <span className={`font-bold font-mono ${
                renal.crcl >= 50 ? 'text-teal-700' : 'text-rose-700'
              }`}>
                {renal.crcl} mL/phút
              </span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-slate-500 font-medium">Khoa:</span>
              <span className="font-bold text-slate-800 uppercase text-[11px]">
                {patient.clinicalSetting}
              </span>
            </div>

            <span className="text-[10px] text-teal-700 font-semibold underline underline-offset-2">
              Chỉnh sửa &rarr;
            </span>
          </div>
        </div>
      ) : (
        /* EXPANDED FULL INPUT VIEW */
        <>
          {/* Main Ergonomic Input Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 text-xs">
            {/* Age */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Tuổi ({patient.ageUnit === 'years' ? 'năm' : patient.ageUnit === 'months' ? 'th' : 'wk'})
              </label>
              <input
                type="number"
                min="0"
                max="120"
                step="1"
                value={patient.age || ''}
                onChange={(e) => onChange({ age: Math.max(0, Number(e.target.value)) })}
                className="w-full h-8 px-2.5 text-xs bg-slate-50/70 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-hidden transition-all font-mono font-medium text-slate-900"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Giới tính
              </label>
              <div className="grid grid-cols-2 gap-0.5 bg-slate-100 p-0.5 rounded-lg h-8">
                <button
                  type="button"
                  onClick={() => onChange({ gender: 'male' })}
                  className={`text-[11px] font-medium rounded-md transition-all flex items-center justify-center ${
                    patient.gender === 'male' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500'
                  }`}
                >
                  Nam
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ gender: 'female' })}
                  className={`text-[11px] font-medium rounded-md transition-all flex items-center justify-center ${
                    patient.gender === 'female' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500'
                  }`}
                >
                  Nữ
                </button>
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Cân nặng (kg)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0.5"
                  max="250"
                  step="0.5"
                  value={patient.weight || ''}
                  onChange={(e) => onChange({ weight: Number(e.target.value) })}
                  className="w-full h-8 pl-2.5 pr-6 text-xs bg-slate-50/70 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-hidden transition-all font-mono font-medium text-slate-900"
                />
                <span className="absolute right-2 top-2 text-[10px] text-slate-400 font-medium pointer-events-none">kg</span>
              </div>
            </div>

            {/* Height */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Chiều cao (cm)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="30"
                  max="220"
                  step="1"
                  value={patient.height || ''}
                  onChange={(e) => onChange({ height: Number(e.target.value) })}
                  className="w-full h-8 pl-2.5 pr-6 text-xs bg-slate-50/70 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-hidden transition-all font-mono font-medium text-slate-900"
                />
                <span className="absolute right-2 top-2 text-[10px] text-slate-400 font-medium pointer-events-none">cm</span>
              </div>
            </div>

            {/* Serum Creatinine (Span 2) */}
            <div className="col-span-2 sm:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                  Creatinin huyết thanh (SCr)
                </label>
                <button
                  type="button"
                  onClick={toggleScrUnit}
                  className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 px-1.5 py-0.2 rounded transition-all"
                  title="Đổi đơn vị"
                >
                  <ArrowRightLeft className="w-2.5 h-2.5" />
                  <span>{patient.scrUnit === 'umol_L' ? 'µmol/L' : 'mg/dL'}</span>
                </button>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="1500"
                  step={patient.scrUnit === 'umol_L' ? '1' : '0.01'}
                  value={patient.scrValue || ''}
                  onChange={(e) => onChange({ scrValue: Number(e.target.value) })}
                  className="w-full h-8 pl-2.5 pr-14 text-xs bg-slate-50/70 border border-slate-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-hidden transition-all font-mono font-bold text-slate-900"
                />
                <span className="absolute right-2 top-2 text-[10px] text-slate-400 font-mono">
                  {patient.scrUnit === 'umol_L' ? `${renal.scrMgDl} mg/dL` : `${renal.scrUmolL} µM`}
                </span>
              </div>
            </div>

            {/* Indication (Span 2) */}
            <div className="col-span-2 sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Chỉ định
              </label>
              <div className="grid grid-cols-2 gap-1 bg-slate-100 p-0.5 rounded-lg h-8">
                <button
                  type="button"
                  onClick={() => onChange({ indication: 'severe_mrsa' })}
                  className={`text-[11px] font-medium rounded-md transition-all flex items-center justify-center ${
                    patient.indication === 'severe_mrsa' ? 'bg-white text-teal-900 shadow-2xs font-semibold' : 'text-slate-500'
                  }`}
                >
                  Nhiễm MRSA nặng
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ indication: 'non_severe' })}
                  className={`text-[11px] font-medium rounded-md transition-all flex items-center justify-center ${
                    patient.indication === 'non_severe' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500'
                  }`}
                >
                  Nhiễm khuẩn khác
                </button>
              </div>
            </div>
          </div>

          {/* Streamlined High-Density Metrics Strip */}
          <div className="mt-2.5 px-3 py-2 bg-slate-50/80 rounded-lg border border-slate-200/70 flex flex-wrap items-center justify-between gap-y-1.5 gap-x-3 text-[11px]">
            {/* CrCl Cockcroft-Gault */}
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-teal-600" />
              <span className="text-slate-500">CrCl (C-G):</span>
              <span className={`font-bold font-mono text-xs ${
                renal.crcl >= 90 ? 'text-emerald-700' :
                renal.crcl >= 50 ? 'text-teal-700' :
                renal.crcl >= 30 ? 'text-amber-700' : 'text-rose-700'
              }`}>
                {renal.crcl} mL/phút
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                ({renal.crclUsedWeight})
              </span>
            </div>

            {/* eGFR CKD-EPI */}
            <div className="flex items-center gap-1">
              <span className="text-slate-400">eGFR:</span>
              <span className="font-mono font-medium text-slate-700">{renal.egfrCkdEpi}</span>
              <span className="text-[9px] text-slate-400">mL/min/1.73m²</span>
            </div>

            {/* BMI & Weights */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500">BMI:</span>
              <span className="font-bold font-mono text-slate-800">{renal.bmi}</span>
              <span className={`px-1 py-0.2 rounded text-[10px] font-semibold ${
                renal.bmi >= 30 ? 'bg-amber-100 text-amber-800' : 'bg-slate-200/80 text-slate-600'
              }`}>
                {renal.bmiClassification}
              </span>
              <span className="text-slate-400 hidden sm:inline">|</span>
              <span className="text-slate-500 hidden sm:inline">
                IBW: <strong className="font-mono text-slate-700">{renal.ibw}</strong>
              </span>
              {renal.bmi >= 30 && (
                <span className="text-slate-500 hidden sm:inline">
                  ABW: <strong className="font-mono text-slate-700">{renal.abw}</strong>
                </span>
              )}
            </div>
          </div>

          {/* Clinical Setting & Dialysis Controls */}
          <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
            {/* Ward vs ICU (4 cols) */}
            <div className="sm:col-span-4">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-slate-400" /> Khoa điều trị
              </label>
              <div className="grid grid-cols-2 gap-1 bg-slate-100 p-0.5 rounded-lg h-7.5">
                <button
                  type="button"
                  onClick={() => onChange({ clinicalSetting: 'ward' })}
                  className={`text-[11px] font-medium rounded-md transition-all flex items-center justify-center ${
                    patient.clinicalSetting === 'ward' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500'
                  }`}
                >
                  Khoa thường
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ clinicalSetting: 'icu' })}
                  className={`text-[11px] font-medium rounded-md transition-all flex items-center justify-center ${
                    patient.clinicalSetting === 'icu' ? 'bg-rose-50 text-rose-700 shadow-2xs font-bold' : 'text-slate-500'
                  }`}
                >
                  Hồi sức (ICU)
                </button>
              </div>
            </div>

            {/* Renal / Dialysis Status (8 cols) */}
            <div className="sm:col-span-8">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1">
                <Droplet className="w-3 h-3 text-slate-400" /> Tình trạng thận & Lọc máu
              </label>
              <div className="grid grid-cols-4 gap-0.5 bg-slate-100 p-0.5 rounded-lg h-7.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => onChange({ renalStatus: 'normal_or_ckd' })}
                  className={`rounded-md font-medium transition-all text-center flex items-center justify-center ${
                    patient.renalStatus === 'normal_or_ckd' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-500'
                  }`}
                >
                  Không lọc
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ renalStatus: 'intermittent_hd' })}
                  className={`rounded-md font-medium transition-all text-center flex items-center justify-center ${
                    patient.renalStatus === 'intermittent_hd' ? 'bg-white text-blue-700 shadow-2xs font-semibold' : 'text-slate-500'
                  }`}
                >
                  IHD chu kỳ
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ renalStatus: 'crrt' })}
                  className={`rounded-md font-medium transition-all text-center flex items-center justify-center ${
                    patient.renalStatus === 'crrt' ? 'bg-white text-purple-700 shadow-2xs font-semibold' : 'text-slate-500'
                  }`}
                >
                  Lọc CRRT
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ renalStatus: 'sled' })}
                  className={`rounded-md font-medium transition-all text-center flex items-center justify-center ${
                    patient.renalStatus === 'sled' ? 'bg-white text-indigo-700 shadow-2xs font-semibold' : 'text-slate-500'
                  }`}
                >
                  Lọc SLED
                </button>
              </div>
            </div>
          </div>

          {/* Subtle IHD Membrane and Timing strip if Dialysis is chosen */}
          {patient.renalStatus === 'intermittent_hd' && (
            <div className="mt-2 p-2 bg-blue-50/60 border border-blue-200/60 rounded-lg flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-blue-900">Màng lọc:</span>
                <div className="flex bg-blue-100/60 p-0.5 rounded">
                  <button
                    type="button"
                    onClick={() => onChange({ hdDialyzerPermeability: 'high' })}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                      patient.hdDialyzerPermeability !== 'low' ? 'bg-white text-blue-900 font-bold shadow-2xs' : 'text-blue-700'
                    }`}
                  >
                    High-flux
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ hdDialyzerPermeability: 'low' })}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                      patient.hdDialyzerPermeability === 'low' ? 'bg-white text-blue-900 font-bold shadow-2xs' : 'text-blue-700'
                    }`}
                  >
                    Low-flux
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-blue-900">Thời điểm:</span>
                <div className="flex bg-blue-100/60 p-0.5 rounded">
                  <button
                    type="button"
                    onClick={() => onChange({ hdTiming: 'after_dialysis' })}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                      patient.hdTiming !== 'intradialytic' ? 'bg-white text-blue-900 font-bold shadow-2xs' : 'text-blue-700'
                    }`}
                  >
                    Sau lọc
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ hdTiming: 'intradialytic' })}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                      patient.hdTiming === 'intradialytic' ? 'bg-white text-blue-900 font-bold shadow-2xs' : 'text-blue-700'
                    }`}
                  >
                    Trong lọc (cuối)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Minimalist Nephrotoxic Drugs Row */}
          <div className="mt-2.5 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-500" />
                <span>Thuốc độc thận dùng kèm</span>
                {patient.concomitantNephrotoxins.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                    {patient.concomitantNephrotoxins.length}
                  </span>
                )}
              </label>
            </div>
            <div className="flex flex-wrap gap-1">
              {NEPHROTOXIC_DRUGS.map((drug) => {
                const isSelected = patient.concomitantNephrotoxins.includes(drug);
                return (
                  <button
                    key={drug}
                    type="button"
                    onClick={() => toggleNephrotoxin(drug)}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-all ${
                      isSelected
                        ? 'bg-rose-50 text-rose-800 border border-rose-300 font-semibold'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}
                    {drug}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
