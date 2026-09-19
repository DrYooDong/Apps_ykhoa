import React, { useState } from 'react';
import { 
  User, 
  Weight, 
  Ruler, 
  Clock, 
  Droplet, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { DialysisMode, Gender, Language, PatientState } from '../types';

interface PatientInputFormProps {
  patient: PatientState;
  onChange: (updated: Partial<PatientState>) => void;
  language: Language;
  needsHeight?: boolean;
}

export const PatientInputForm: React.FC<PatientInputFormProps> = ({
  patient,
  onChange,
  language,
  needsHeight = false
}) => {
  const [showCaseDetails, setShowCaseDetails] = useState(false);
  const isEn = language === 'en';

  const handleScrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value.replace(',', '.'));
    onChange({ scr: isNaN(val) ? 0 : val });
  };

  const handleUnitToggle = (newUnit: 'umol' | 'mgdl') => {
    if (newUnit === patient.scrUnit) return;
    if (newUnit === 'mgdl') {
      // umol to mgdl: / 88.4
      const converted = Math.round((patient.scr / 88.4) * 100) / 100;
      onChange({ scrUnit: 'mgdl', scr: converted });
    } else {
      // mgdl to umol: * 88.4
      const converted = Math.round(patient.scr * 88.4);
      onChange({ scrUnit: 'umol', scr: converted });
    }
  };

  const setPreset = (presetKey: string) => {
    if (presetKey === 'normal') {
      onChange({
        scr: patient.scrUnit === 'umol' ? 85 : 0.96,
        age: 52,
        gender: 'm',
        weight: 62,
        height: 168,
        dialysis: 'none'
      });
    } else if (presetKey === 'moderate') {
      onChange({
        scr: patient.scrUnit === 'umol' ? 165 : 1.87,
        age: 68,
        gender: 'm',
        weight: 58,
        height: 165,
        dialysis: 'none'
      });
    } else if (presetKey === 'hd') {
      onChange({
        scr: patient.scrUnit === 'umol' ? 480 : 5.43,
        age: 60,
        gender: 'f',
        weight: 52,
        height: 155,
        dialysis: 'hd'
      });
    } else if (presetKey === 'arc') {
      onChange({
        scr: patient.scrUnit === 'umol' ? 45 : 0.51,
        age: 28,
        gender: 'm',
        weight: 75,
        height: 175,
        dialysis: 'none'
      });
    } else if (presetKey === 'obese') {
      onChange({
        scr: patient.scrUnit === 'umol' ? 120 : 1.36,
        age: 58,
        gender: 'f',
        weight: 102,
        height: 158,
        dialysis: 'none'
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-6 mb-6">
      
      {/* Title & Presets Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900">
              {isEn ? 'Patient Clinical Demographics' : 'Thông số Bệnh nhân & Xét nghiệm'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEn ? 'Cockcroft-Gault CrCl & Anthropometrics' : 'Tính CrCl theo Cockcroft-Gault & Cân nặng'}
            </p>
          </div>
        </div>

        {/* Clinical Presets Chips */}
        <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
          <span className="text-xs font-semibold text-slate-600 mr-1 shrink-0 flex items-center">
            <Sparkles className="w-3 h-3 text-amber-500 mr-1" />
            {isEn ? 'Presets:' : 'Ca mẫu:'}
          </span>
          <button
            type="button"
            onClick={() => setPreset('normal')}
            className="px-2 py-1 text-xs font-medium rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 shrink-0 transition-colors"
          >
            {isEn ? 'Normal' : 'Bình thường'}
          </button>
          <button
            type="button"
            onClick={() => setPreset('moderate')}
            className="px-2 py-1 text-xs font-medium rounded-md bg-amber-50 hover:bg-amber-100 text-amber-800 shrink-0 transition-colors"
          >
            {isEn ? 'CKD Mild/Mod' : 'Suy thận vừa'}
          </button>
          <button
            type="button"
            onClick={() => setPreset('hd')}
            className="px-2 py-1 text-xs font-medium rounded-md bg-rose-50 hover:bg-rose-100 text-rose-800 shrink-0 transition-colors"
          >
            {isEn ? 'HD / Dialysis' : 'Lọc máu HD'}
          </button>
          <button
            type="button"
            onClick={() => setPreset('arc')}
            className="px-2 py-1 text-xs font-medium rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 shrink-0 transition-colors"
          >
            {isEn ? 'ARC (>130)' : 'ARC (>130)'}
          </button>
          <button
            type="button"
            onClick={() => setPreset('obese')}
            className="px-2 py-1 text-xs font-medium rounded-md bg-purple-50 hover:bg-purple-100 text-purple-800 shrink-0 transition-colors"
          >
            {isEn ? 'Obese' : 'Béo phì'}
          </button>
        </div>
      </div>

      {/* Main Parameters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        
        {/* 1. Serum Creatinine */}
        <div className="col-span-2 sm:col-span-1 lg:col-span-2 bg-slate-50/70 p-3 rounded-xl border border-slate-200/60">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center">
              <Droplet className="w-3.5 h-3.5 text-blue-600 mr-1" />
              {isEn ? 'Serum Creatinine (Scr)' : 'Creatinine huyết thanh'}
            </label>
            <div className="flex items-center bg-white border border-slate-300 rounded-md p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => handleUnitToggle('umol')}
                className={`px-1.5 py-0.5 rounded ${patient.scrUnit === 'umol' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
              >
                µmol/L
              </button>
              <button
                type="button"
                onClick={() => handleUnitToggle('mgdl')}
                className={`px-1.5 py-0.5 rounded ${patient.scrUnit === 'mgdl' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
              >
                mg/dL
              </button>
            </div>
          </div>
          <div className="relative">
            <input
              type="number"
              step={patient.scrUnit === 'mgdl' ? '0.01' : '1'}
              min="0.1"
              value={patient.scr || ''}
              onChange={handleScrChange}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-base font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={patient.scrUnit === 'umol' ? 'e.g. 90' : 'e.g. 1.0'}
            />
          </div>
        </div>

        {/* 2. Age */}
        <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/60">
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center">
            <Clock className="w-3.5 h-3.5 text-slate-500 mr-1" />
            {isEn ? 'Age (years)' : 'Tuổi'}
          </label>
          <input
            type="number"
            min="1"
            max="125"
            value={patient.age || ''}
            onChange={(e) => onChange({ age: parseInt(e.target.value) || 0 })}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-base font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 3. Gender */}
        <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/60">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            {isEn ? 'Sex / Gender' : 'Giới tính'}
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => onChange({ gender: 'm' })}
              className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                patient.gender === 'm'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {isEn ? 'Male' : 'Nam'}
            </button>
            <button
              type="button"
              onClick={() => onChange({ gender: 'f' })}
              className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                patient.gender === 'f'
                  ? 'bg-pink-600 text-white border-pink-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {isEn ? 'Female' : 'Nữ'}
            </button>
          </div>
        </div>

        {/* 4. Weight (TBW kg) */}
        <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/60">
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center">
            <Weight className="w-3.5 h-3.5 text-slate-500 mr-1" />
            {isEn ? 'Weight (kg)' : 'Cân nặng (kg)'}
          </label>
          <input
            type="number"
            min="10"
            max="300"
            step="0.5"
            value={patient.weight || ''}
            onChange={(e) => onChange({ weight: parseFloat(e.target.value) || 0 })}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-base font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* 5. Height (cm) */}
        <div className={`p-3 rounded-xl border transition-all ${
          needsHeight 
            ? 'bg-blue-50/70 border-blue-200 ring-1 ring-blue-300' 
            : 'bg-slate-50/70 border-slate-200/60'
        }`}>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center">
              <Ruler className="w-3.5 h-3.5 text-slate-500 mr-1" />
              {isEn ? 'Height (cm)' : 'Chiều cao (cm)'}
            </label>
            {needsHeight && (
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-600 text-white">
                {isEn ? 'IBW Req' : 'Cần tính IBW'}
              </span>
            )}
          </div>
          <input
            type="number"
            min="50"
            max="250"
            value={patient.height || ''}
            onChange={(e) => onChange({ height: parseFloat(e.target.value) || null })}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-base font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 165"
          />
        </div>

      </div>

      {/* Dialysis / RRT Mode Selection Row */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-700">
            {isEn ? 'Renal Replacement (RRT):' : 'Phương thức lọc máu (RRT):'}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'none', labelVi: 'Không lọc máu', labelEn: 'None (Conservative)' },
              { id: 'hd', labelVi: 'HD (Thận nhân tạo)', labelEn: 'Intermittent HD' },
              { id: 'crrt', labelVi: 'CRRT (Lọc liên tục)', labelEn: 'CRRT (CVVH/DF)' },
              { id: 'capd', labelVi: 'CAPD (Lọc màng bụng)', labelEn: 'Peritoneal CAPD' }
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => onChange({ dialysis: mode.id as DialysisMode })}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  patient.dialysis === mode.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {isEn ? mode.labelEn : mode.labelVi}
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Consultation Metadata for PDF */}
        <button
          type="button"
          onClick={() => setShowCaseDetails(!showCaseDetails)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
        >
          <span>{isEn ? 'Patient Case Details (For PDF)' : 'Thông tin bệnh án (In phiếu)'}</span>
          {showCaseDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Collapsible Patient Consultation Metadata */}
      {showCaseDetails && (
        <div className="mt-3 p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 animate-in fade-in duration-200">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              {isEn ? 'Patient Full Name' : 'Họ và tên bệnh nhân'}
            </label>
            <input
              type="text"
              value={patient.patientName || ''}
              onChange={(e) => onChange({ patientName: e.target.value })}
              placeholder={isEn ? 'e.g. Nguyen Van A' : 'vd: Nguyễn Văn A'}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              {isEn ? 'Medical Record / Patient ID' : 'Mã bệnh nhân / Số hồ sơ'}
            </label>
            <input
              type="text"
              value={patient.patientId || ''}
              onChange={(e) => onChange({ patientId: e.target.value })}
              placeholder="e.g. BN-2026-889"
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              {isEn ? 'Department / Ward' : 'Khoa / Phòng điều trị'}
            </label>
            <input
              type="text"
              value={patient.department || ''}
              onChange={(e) => onChange({ department: e.target.value })}
              placeholder={isEn ? 'e.g. ICU / Surgical Ward' : 'vd: Khoa Hồi sức tích cực (ICU)'}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              {isEn ? 'Primary Clinical Diagnosis' : 'Chẩn đoán lâm sàng'}
            </label>
            <input
              type="text"
              value={patient.diagnosis || ''}
              onChange={(e) => onChange({ diagnosis: e.target.value })}
              placeholder={isEn ? 'e.g. Septic shock / VAP' : 'vd: Sốc nhiễm khuẩn / Viêm phổi thở máy'}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-900"
            />
          </div>
        </div>
      )}

    </div>
  );
};
