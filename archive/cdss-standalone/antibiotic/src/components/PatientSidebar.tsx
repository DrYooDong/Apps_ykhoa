import React, { useState } from 'react';
import { 
  User, 
  Droplet, 
  Clock, 
  Weight, 
  Ruler, 
  Activity, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Edit3, 
  Maximize2, 
  Minimize2, 
  Flame, 
  AlertTriangle,
  ArrowDown,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { CalculatedRenalMetrics, DialysisMode, Language, PatientState } from '../types';

interface PatientSidebarProps {
  patient: PatientState;
  onChange: (updated: Partial<PatientState>) => void;
  renal: CalculatedRenalMetrics;
  dialysis: DialysisMode;
  language: Language;
  needsHeight?: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const PatientSidebar: React.FC<PatientSidebarProps> = ({
  patient,
  onChange,
  renal,
  dialysis,
  language,
  needsHeight = false,
  isCollapsed,
  onToggleCollapse
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
      const converted = Math.round((patient.scr / 88.4) * 100) / 100;
      onChange({ scrUnit: 'mgdl', scr: converted });
    } else {
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

  const getStatusBg = () => {
    if (dialysis !== 'none') return 'bg-purple-600';
    if (renal.isArc) return 'bg-teal-600';
    if (renal.crcl >= 90) return 'bg-emerald-600';
    if (renal.crcl >= 60) return 'bg-blue-600';
    if (renal.crcl >= 30) return 'bg-amber-500';
    if (renal.crcl >= 15) return 'bg-orange-600';
    return 'bg-rose-600';
  };

  const clampedCrcl = Math.min(150, Math.max(0, renal.crcl));
  const pointerPercent = Math.round((clampedCrcl / 150) * 100);

  // ==========================================
  // VIEW 1: COLLAPSED MODE (Clean Vertical Stack Layout)
  // ==========================================
  if (isCollapsed) {
    const isFemale = patient.gender === 'f';
    const genderLabel = isFemale ? (isEn ? 'Female' : 'Nữ') : (isEn ? 'Male' : 'Nam');

    // Dynamic accent styling based on CrCl level
    const isNormal = renal.crcl >= 60;
    const isModerate = renal.crcl >= 30 && renal.crcl < 60;
    const isSevere = renal.crcl < 30;

    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all duration-200 flex flex-col">
        {/* Header with Title */}
        <div className="p-3 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2 min-w-0">
            <div className="w-6 h-6 rounded-md bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <User className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-100 truncate">
              {isEn ? 'Patient & Renal Data' : 'Thông Số Bệnh Nhân'}
            </span>
          </div>
        </div>

        <div className="p-3 space-y-2.5">
          {/* Vertical Block 1: CrCl Primary Metric Card */}
          <div className={`p-3 rounded-xl border flex flex-col items-center text-center ${
            isNormal 
              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
              : isModerate 
              ? 'bg-amber-50/70 border-amber-200 text-amber-950' 
              : 'bg-rose-50/70 border-rose-200 text-rose-950'
          }`}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
              {isEn ? 'Cockcroft-Gault CrCl' : 'Độ thanh thải CrCl'}
            </span>
            <div className="flex items-baseline justify-center space-x-1">
              <span className={`text-3xl font-black font-mono tracking-tight ${
                isNormal ? 'text-emerald-700' : isModerate ? 'text-amber-700' : 'text-rose-700'
              }`}>
                {renal.crcl}
              </span>
              <span className="text-xs font-bold text-slate-500">mL/phút</span>
            </div>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
              isNormal 
                ? 'bg-emerald-100 text-emerald-800' 
                : isModerate 
                ? 'bg-amber-100 text-amber-800' 
                : 'bg-rose-100 text-rose-800'
            }`}>
              {isEn ? renal.categoryLabelEn : renal.categoryLabelVi}
            </span>

            {dialysis !== 'none' && (
              <span className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black uppercase bg-purple-100 text-purple-800 border border-purple-200">
                ● {dialysis === 'hd' ? 'Thận nhân tạo HD' : dialysis === 'crrt' ? 'CRRT' : 'CAPD'}
              </span>
            )}
            {renal.isArc && (
              <span className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800">
                <Flame className="w-3 h-3 mr-1 text-teal-600" /> Tăng thanh thải (ARC)
              </span>
            )}
          </div>

          {/* Vertical Block 2: Stacked Patient Attributes (Mỗi thông số 1 dòng rõ ràng) */}
          <div className="bg-slate-50 rounded-xl p-2.5 space-y-2 border border-slate-200/60 text-xs">
            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">{isEn ? 'Age / Sex:' : 'Tuổi & Giới:'}</span>
              <span className="font-bold text-slate-800">
                {patient.age}t • {genderLabel}
              </span>
            </div>

            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">{isEn ? 'Weight:' : 'Cân nặng:'}</span>
              <span className="font-bold text-slate-800">
                {patient.weight} kg {patient.height ? `(${patient.height}cm)` : ''}
              </span>
            </div>

            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">{isEn ? 'Serum Cr:' : 'Creatinine:'}</span>
              <span className="font-bold text-blue-700 font-mono">
                {renal.scrUmol} µmol/L
              </span>
            </div>

            <div className="flex justify-between items-center py-0.5 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">{isEn ? 'CrCl Weight:' : 'Cân tính CrCl:'}</span>
              <span className="font-bold text-slate-800">
                {renal.usedWeight} kg <span className="text-[10px] text-blue-600 font-semibold">({renal.weightFormulaUsed})</span>
              </span>
            </div>

            <div className="flex justify-between items-center py-0.5">
              <span className="text-slate-500 font-medium">{isEn ? 'Dialysis:' : 'Lọc máu:'}</span>
              <span className={`font-bold ${dialysis !== 'none' ? 'text-purple-700' : 'text-slate-700'}`}>
                {dialysis === 'none' ? (isEn ? 'None' : 'Không') : (dialysis === 'hd' ? 'HD' : dialysis === 'crrt' ? 'CRRT' : 'CAPD')}
              </span>
            </div>
          </div>

          {/* Quick Expand Button */}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl border border-blue-200 transition-colors flex items-center justify-center space-x-1.5 text-xs shadow-2xs"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>{isEn ? 'Expand Form' : 'Mở rộng bảng nhập'}</span>
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: EXPANDED MODE (Full Input & CrCl)
  // ==========================================
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all duration-300">
      
      {/* Top Header with Collapse Action */}
      <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold block leading-tight">
              {isEn ? 'Patient Demographics & Renal' : 'Nhập Thông Số Bệnh Nhân'}
            </h2>
            <p className="text-[10px] text-slate-400">
              {isEn ? 'Cockcroft-Gault & Anthropometrics' : 'Tính toán CrCl theo Cockcroft-Gault'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleCollapse}
          className="flex items-center space-x-1 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-2.5 py-1 rounded-lg transition-colors border border-slate-700"
          title={isEn ? 'Collapse to summary' : 'Thu gọn bảng nhập'}
        >
          <Minimize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isEn ? 'Collapse' : 'Thu gọn'}</span>
        </button>
      </div>

      {/* Main Interactive Form Inputs */}
      <div className="p-4 space-y-3.5 text-xs">
        
        {/* Clinical Presets */}
        <div>
          <div className="flex items-center justify-between mb-1 text-[11px]">
            <span className="font-bold text-slate-700 flex items-center">
              <Sparkles className="w-3 h-3 text-amber-500 mr-1" />
              {isEn ? 'Clinical Case Presets:' : 'Ca lâm sàng mẫu:'}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            <button
              type="button"
              onClick={() => setPreset('normal')}
              className="px-2 py-1 text-xs font-medium rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              {isEn ? 'Normal' : 'Chuẩn'}
            </button>
            <button
              type="button"
              onClick={() => setPreset('moderate')}
              className="px-2 py-1 text-xs font-medium rounded-md bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors"
            >
              {isEn ? 'Moderate' : 'Suy thận vừa'}
            </button>
            <button
              type="button"
              onClick={() => setPreset('hd')}
              className="px-2 py-1 text-xs font-medium rounded-md bg-rose-50 hover:bg-rose-100 text-rose-800 transition-colors"
            >
              {isEn ? 'HD' : 'Lọc máu HD'}
            </button>
            <button
              type="button"
              onClick={() => setPreset('arc')}
              className="px-2 py-1 text-xs font-medium rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors"
            >
              {isEn ? 'ARC' : 'ARC (>130)'}
            </button>
            <button
              type="button"
              onClick={() => setPreset('obese')}
              className="px-2 py-1 text-xs font-medium rounded-md bg-purple-50 hover:bg-purple-100 text-purple-800 transition-colors"
            >
              {isEn ? 'Obese' : 'Béo phì'}
            </button>
          </div>
        </div>

        {/* 1. Serum Creatinine */}
        <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/70">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center">
              <Droplet className="w-3.5 h-3.5 text-blue-600 mr-1" />
              {isEn ? 'Serum Creatinine (Scr):' : 'Creatinine huyết thanh (Scr):'}
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
          <input
            type="number"
            step={patient.scrUnit === 'mgdl' ? '0.01' : '1'}
            min="0.1"
            value={patient.scr || ''}
            onChange={handleScrChange}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-base font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
            placeholder={patient.scrUnit === 'umol' ? 'e.g. 90' : 'e.g. 1.0'}
          />
        </div>

        {/* 2. Age & Gender in 2 columns */}
        <div className="grid grid-cols-2 gap-2.5">
          
          {/* Age */}
          <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70">
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center">
              <Clock className="w-3 h-3 text-slate-500 mr-1" />
              {isEn ? 'Age (years)' : 'Tuổi'}
            </label>
            <input
              type="number"
              min="1"
              max="125"
              value={patient.age || ''}
              onChange={(e) => onChange({ age: parseInt(e.target.value) || 0 })}
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>

          {/* Gender */}
          <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {isEn ? 'Gender' : 'Giới tính'}
            </label>
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => onChange({ gender: 'm' })}
                className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  patient.gender === 'm'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                {isEn ? 'M' : 'Nam'}
              </button>
              <button
                type="button"
                onClick={() => onChange({ gender: 'f' })}
                className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                  patient.gender === 'f'
                    ? 'bg-pink-600 text-white border-pink-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                {isEn ? 'F' : 'Nữ'}
              </button>
            </div>
          </div>

        </div>

        {/* 3. Weight & Height in 2 columns */}
        <div className="grid grid-cols-2 gap-2.5">
          
          {/* Weight */}
          <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70">
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center">
              <Weight className="w-3 h-3 text-slate-500 mr-1" />
              {isEn ? 'Weight (kg)' : 'Cân nặng (kg)'}
            </label>
            <input
              type="number"
              min="10"
              max="300"
              step="0.5"
              value={patient.weight || ''}
              onChange={(e) => onChange({ weight: parseFloat(e.target.value) || 0 })}
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>

          {/* Height */}
          <div className={`p-2.5 rounded-xl border transition-all ${
            needsHeight 
              ? 'bg-blue-50/70 border-blue-200 ring-1 ring-blue-300' 
              : 'bg-slate-50/80 border-slate-200/70'
          }`}>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center">
              <Ruler className="w-3 h-3 text-slate-500 mr-1" />
              {isEn ? 'Height (cm)' : 'Chiều cao (cm)'}
            </label>
            <input
              type="number"
              min="50"
              max="250"
              value={patient.height || ''}
              onChange={(e) => onChange({ height: parseFloat(e.target.value) || null })}
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500 font-mono"
              placeholder="e.g. 165"
            />
          </div>

        </div>

        {/* 4. Dialysis Mode */}
        <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/70">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            {isEn ? 'Renal Replacement Therapy (Dialysis):' : 'Phương thức lọc máu (RRT):'}
          </label>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: 'none', labelVi: 'Không lọc máu', labelEn: 'None' },
              { id: 'hd', labelVi: 'HD (Thận NT)', labelEn: 'HD' },
              { id: 'crrt', labelVi: 'CRRT liên tục', labelEn: 'CRRT' },
              { id: 'capd', labelVi: 'CAPD (Màng bụng)', labelEn: 'CAPD' }
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => onChange({ dialysis: mode.id as DialysisMode })}
                className={`py-1.5 px-2 text-xs font-semibold rounded-lg transition-all ${
                  patient.dialysis === mode.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isEn ? mode.labelEn : mode.labelVi}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Case Details Toggle (For PDF) */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowCaseDetails(!showCaseDetails)}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center justify-between w-full p-2 rounded-lg bg-blue-50/60"
          >
            <span className="flex items-center">
              <FileText className="w-3.5 h-3.5 mr-1" />
              {isEn ? 'Case Info (Name, ID, Diagnosis)' : 'Thông tin bệnh án (Tên, Mã BN, Chẩn đoán)'}
            </span>
            {showCaseDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showCaseDetails && (
            <div className="mt-2 p-3 bg-blue-50/40 rounded-xl border border-blue-100 space-y-2 animate-in fade-in duration-150">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-0.5">
                  {isEn ? 'Patient Name' : 'Họ và tên bệnh nhân'}
                </label>
                <input
                  type="text"
                  value={patient.patientName || ''}
                  onChange={(e) => onChange({ patientName: e.target.value })}
                  placeholder="vd: Nguyễn Văn A"
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-0.5">
                  {isEn ? 'Patient ID / Medical Record' : 'Mã số bệnh án'}
                </label>
                <input
                  type="text"
                  value={patient.patientId || ''}
                  onChange={(e) => onChange({ patientId: e.target.value })}
                  placeholder="vd: BN-2026-889"
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-0.5">
                  {isEn ? 'Diagnosis' : 'Chẩn đoán lâm sàng'}
                </label>
                <input
                  type="text"
                  value={patient.diagnosis || ''}
                  onChange={(e) => onChange({ diagnosis: e.target.value })}
                  placeholder="vd: Viêm phổi thở máy / Sốc nhiễm khuẩn"
                  className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs"
                />
              </div>
            </div>
          )}
        </div>

        {/* Calculated Results Summary Box inside Expanded Mode */}
        <div className="mt-2 p-3.5 bg-slate-900 text-white rounded-xl space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-400">
              {isEn ? 'Calculated CrCl:' : 'Độ thanh thải CrCl:'}
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/30 text-blue-300 border border-blue-400/40">
              {isEn ? renal.categoryLabelEn : renal.categoryLabelVi}
            </span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-black font-mono text-emerald-400">
              {renal.crcl}
            </span>
            <span className="text-xs font-semibold text-slate-300">
              mL/phút
            </span>
            <span className="text-[11px] text-slate-400 ml-auto">
              (Dùng {renal.usedWeight} kg {renal.weightFormulaUsed})
            </span>
          </div>

          {/* Mini Spectrum */}
          <div className="h-2 rounded-full overflow-hidden flex bg-slate-700">
            <div style={{ width: '10%' }} className="bg-red-500" title="ESRD <15" />
            <div style={{ width: '10%' }} className="bg-orange-500" title="Nặng 15-29" />
            <div style={{ width: '20%' }} className="bg-amber-400" title="Vừa 30-59" />
            <div style={{ width: '20%' }} className="bg-sky-400" title="Nhẹ 60-89" />
            <div style={{ width: '27%' }} className="bg-emerald-500" title="Bình thường 90-130" />
            <div style={{ width: '13%' }} className="bg-teal-400" title="ARC >130" />
          </div>

          {/* Quick Metrics Breakdown Grid */}
          <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-800 text-[11px]">
            <div className="bg-slate-800/80 p-1.5 rounded-lg">
              <span className="text-slate-400 block text-[10px]">Creatinine máu:</span>
              <span className="font-bold text-white font-mono">{renal.scrUmol} µmol/L</span>
              <span className="text-slate-400 text-[10px] ml-1">({renal.scrMgdl} mg/dL)</span>
            </div>
            <div className="bg-slate-800/80 p-1.5 rounded-lg">
              <span className="text-slate-400 block text-[10px]">Cân nặng chuẩn IBW:</span>
              <span className="font-bold text-white font-mono">{renal.ibw ? `${renal.ibw} kg` : 'Cần chiều cao'}</span>
            </div>
            {renal.bmi && (
              <div className="bg-slate-800/80 p-1.5 rounded-lg">
                <span className="text-slate-400 block text-[10px]">Chỉ số BMI:</span>
                <span className="font-bold text-white font-mono">{renal.bmi} kg/m²</span>
              </div>
            )}
            <div className="bg-slate-800/80 p-1.5 rounded-lg">
              <span className="text-slate-400 block text-[10px]">Lọc máu (RRT):</span>
              <span className={`font-bold ${dialysis !== 'none' ? 'text-yellow-300 uppercase' : 'text-slate-300'}`}>
                {dialysis === 'none' ? 'Không' : dialysis.toUpperCase()}
              </span>
            </div>
          </div>

          {renal.isArc && (
            <div className="text-[11px] font-bold text-amber-300 flex items-center pt-1 border-t border-slate-800">
              <Flame className="w-3.5 h-3.5 mr-1 text-yellow-400 animate-bounce" />
              Cảnh báo ARC: Tăng thanh thải thận (&gt;130 mL/phút)
            </div>
          )}
        </div>

        {/* Button to Collapse */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors flex items-center justify-center space-x-1"
        >
          <Minimize2 className="w-3.5 h-3.5" />
          <span>{isEn ? 'Collapse to Summary' : 'Thu gọn bảng nhập (Hiện kết quả tóm tắt)'}</span>
        </button>

      </div>

    </div>
  );
};
