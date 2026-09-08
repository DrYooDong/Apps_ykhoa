import React, { useState, useMemo } from 'react';
import {
  Activity,
  HeartPulse,
  Wind,
  Calculator,
  FileCheck2,
  Stethoscope,
  BookOpen,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Monitor,
  Share2,
  HelpCircle,
  Layers,
  ArrowRight,
  ShieldAlert,
  Flame,
  Plus,
  Minus
} from 'lucide-react';
import { ABGInput, PressureUnit } from '../../types/abg';
import { analyzeABG, KPA_TO_MMHG, MMHG_TO_KPA } from '../../utils/abgEngine';
import { AutomatedAnionGapCalculator } from '../AutomatedAnionGapCalculator';

interface MobileABGViewProps {
  input: ABGInput;
  setInput: React.Dispatch<React.SetStateAction<ABGInput>>;
  onSwitchToDesktop: () => void;
  onOpenGlossary?: (query?: string) => void;
}

export type MobileTab = 'diagnosis' | 'anion-gap' | 'steps' | 'treatment' | 'reference';

export const MobileABGView: React.FC<MobileABGViewProps> = ({
  input,
  setInput,
  onSwitchToDesktop,
  onOpenGlossary
}) => {
  const [activeTab, setActiveTab] = useState<MobileTab>('diagnosis');
  const [showInputSheet, setShowInputSheet] = useState<boolean>(true);
  const [inputSubTab, setInputSubTab] = useState<'core' | 'labs'>('core');
  const [copied, setCopied] = useState<boolean>(false);
  const [showPresetModal, setShowPresetModal] = useState<boolean>(false);

  // Run analysis engine
  const analysis = useMemo(() => analyzeABG(input), [input]);

  // Handle Stepper Increment / Decrement
  const handleStep = (field: keyof ABGInput, delta: number, min?: number, max?: number, decimals: number = 1) => {
    setInput((prev) => {
      const currentVal = (prev[field] as number) ?? 0;
      let nextVal = currentVal + delta;
      if (min !== undefined && nextVal < min) nextVal = min;
      if (max !== undefined && nextVal > max) nextVal = max;

      // Round to prevent float precision issues
      const factor = Math.pow(10, decimals);
      nextVal = Math.round(nextVal * factor) / factor;

      return {
        ...prev,
        [field]: nextVal
      };
    });
  };

  // Unit toggle
  const handleUnitToggle = (newUnit: PressureUnit) => {
    if (newUnit === input.unit) return;
    setInput((prev) => {
      const multiplier = newUnit === 'kPa' ? MMHG_TO_KPA : KPA_TO_MMHG;
      return {
        ...prev,
        unit: newUnit,
        pCO2: Math.round(prev.pCO2 * multiplier * 10) / 10,
        pO2: Math.round(prev.pO2 * multiplier * 10) / 10
      };
    });
  };

  // Sync updates from labs
  const handleUpdateLabs = (updates: { na?: number; cl?: number; k?: number; albumin?: number }) => {
    setInput((prev) => ({
      ...prev,
      ...updates
    }));
  };

  // Copy clinical summary to clipboard
  const handleCopySummary = () => {
    const text = `[ABG PRO MOBILE] BÁO CÁO NHANH KHÍ MÁU ĐỘNG MẠCH:
• Thông số: pH ${input.pH} | PaCO2 ${input.pCO2} ${input.unit} | PaO2 ${input.pO2} ${input.unit} | HCO3- ${input.hco3} mmol/L | BE ${input.be} | SaO2 ${input.sao2}% | FiO2 ${input.fio2}%
1. TRAO ĐỔI KHÍ: ${analysis.gasExchange.title}
   - P/F: ${analysis.calculations.pfRatio} (${analysis.calculations.pfClass}) | A-a: ${analysis.calculations.aaGradient} mmHg
2. TOAN KIỀM: ${analysis.acidBase.title}
   - [H+]: ${analysis.calculations.hIonNmol} nmol/L | Bù trừ: ${analysis.acidBase.compensation}
3. ANION GAP: ${analysis.calculations.anionGap ?? 'Chưa nhập Na/Cl'} mmol/L ${analysis.calculations.deltaRatio ? `| Tỷ số Delta: ${analysis.calculations.deltaRatio} (${analysis.calculations.deltaRatioInterpretation})` : ''}
4. HƯỚNG XỬ TRÍ: ${analysis.treatmentProtocols.summary}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Quick preset cases for mobile
  const MOBILE_PRESETS = [
    {
      name: 'Khỏe mạnh (Normal)',
      desc: 'pH 7.40, PaCO2 40, PaO2 95, HCO3 24',
      data: { ...input, pH: 7.40, pCO2: 40, pO2: 95, hco3: 24, be: 0, sao2: 98, fio2: 21, na: 140, cl: 100, k: 4.0, albumin: 4.0 }
    },
    {
      name: 'Viêm phổi (Type 1)',
      desc: 'pH 7.50, PaCO2 28.1, PaO2 58, FiO2 21%',
      data: { ...input, pH: 7.50, pCO2: 28.1, pO2: 57.8, hco3: 23.9, be: -0.5, sao2: 89, fio2: 21, na: 138, cl: 99 }
    },
    {
      name: 'Đợt cấp COPD (Type 2 Mạn)',
      desc: 'pH 7.37, PaCO2 64, PaO2 58, HCO3 36.5',
      data: { ...input, pH: 7.37, pCO2: 64.0, pO2: 58.0, hco3: 36.5, be: 8.9, sao2: 88, fio2: 21, na: 139, cl: 102 }
    },
    {
      name: 'DKA Nhiễm toan Ceton ĐTĐ',
      desc: 'pH 7.05, PaCO2 11, HCO3 6, AG 39 (Tăng rất cao)',
      data: { ...input, pH: 7.05, pCO2: 11.0, pO2: 187, hco3: 6.0, be: -25.2, sao2: 99, fio2: 60, na: 141, cl: 96, k: 4.6 }
    },
    {
      name: 'Sốc nhiễm khuẩn (Toan Lactic)',
      desc: 'pH 7.36, PaCO2 31.5, HCO3 17.3, Lactate 5.1',
      data: { ...input, pH: 7.36, pCO2: 31.5, pO2: 203, hco3: 17.3, be: -6.9, sao2: 100, fio2: 60, na: 140, cl: 101, lactate: 5.1 }
    },
    {
      name: 'Kiềm chuyển hóa do nôn',
      desc: 'pH 7.44, PaCO2 48, HCO3 32, hạ Cl và K',
      data: { ...input, pH: 7.44, pCO2: 48.0, pO2: 83, hco3: 32.0, be: 4.0, sao2: 96, fio2: 21, na: 133, cl: 91, k: 3.0 }
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-24 font-sans select-none sm:select-auto">
      {/* 1. TOP COMPACT MOBILE APP BAR */}
      <div className="sticky top-0 z-40 bg-slate-900 text-white shadow-md border-b border-slate-800">
        <div className="px-3.5 py-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white shadow-xs">
              <HeartPulse className="w-4 h-4 text-rose-300" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-sm tracking-tight">ABG Pro</span>
                <span className="px-1.5 py-0.2 text-[9px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/40 rounded">
                  MOBILE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-none">Chạm nhanh 1 tay</p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            {/* Unit Toggle Button */}
            <button
              onClick={() => handleUnitToggle(input.unit === 'mmHg' ? 'kPa' : 'mmHg')}
              className="px-2 py-1 rounded-md text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95 transition-all"
              title="Đổi đơn vị áp suất"
            >
              {input.unit}
            </button>

            {/* Quick Presets Modal Trigger */}
            <button
              onClick={() => setShowPresetModal(true)}
              className="px-2 py-1 rounded-md text-[11px] font-bold bg-indigo-600/40 hover:bg-indigo-600/60 text-indigo-200 border border-indigo-500/40 active:scale-95 transition-all flex items-center space-x-1"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Ca mẫu</span>
            </button>

            {/* Switch to Desktop Mode */}
            <button
              onClick={onSwitchToDesktop}
              className="p-1.5 rounded-md text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 active:scale-95 transition-all"
              title="Chuyển sang giao diện máy tính đầy đủ"
            >
              <Monitor className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. INSTANT DIAGNOSTIC HERO BANNER (Always Visible & Highly Scannable) */}
        <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 px-3.5 py-2.5 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Chẩn Đoán Tức Thì:</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopySummary}
                className="text-[10px] font-bold text-indigo-200 hover:text-white flex items-center space-x-1 bg-white/10 px-2 py-0.5 rounded border border-white/10 active:scale-95"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
              </button>

              <button
                onClick={() => setShowInputSheet(!showInputSheet)}
                className="text-[10px] font-bold text-blue-300 hover:text-blue-100 flex items-center space-x-0.5 bg-blue-500/20 px-2 py-0.5 rounded border border-blue-400/30"
              >
                <span>{showInputSheet ? 'Ẩn phím số' : 'Mở phím số'}</span>
                {showInputSheet ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </div>

          <div className="mt-1 space-y-1">
            {/* Primary diagnosis lines */}
            <div className="flex items-start justify-between gap-2">
              <div className="text-xs font-extrabold text-white leading-tight">
                {analysis.acidBase.title}
              </div>
              <span
                className={`px-1.5 py-0.2 rounded text-[10px] font-bold shrink-0 ${
                  analysis.acidBase.acidaemiaStatus === 'acidaemia'
                    ? 'bg-rose-500/30 text-rose-200 border border-rose-400/40'
                    : analysis.acidBase.acidaemiaStatus === 'alkalaemia'
                    ? 'bg-purple-500/30 text-purple-200 border border-purple-400/40'
                    : 'bg-emerald-500/30 text-emerald-200 border border-emerald-400/40'
                }`}
              >
                {analysis.acidBase.compensation}
              </span>
            </div>

            <div className="flex items-center justify-between text-[11px] text-blue-200">
              <span className="truncate pr-2">{analysis.gasExchange.title}</span>
              <span className="font-bold text-amber-300 shrink-0">
                P/F: {analysis.calculations.pfRatio}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MOBILE RAPID INPUT PAD (Collapsible Touch Steppers) */}
      {showInputSheet && (
        <div className="bg-white border-b border-slate-300 shadow-sm p-3 space-y-2.5 animate-in slide-in-from-top-3 duration-200">
          {/* Sub-selector: Core ABG vs Electrolytes */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => setInputSubTab('core')}
                className={`px-3 py-1 font-bold rounded-md transition-all ${
                  inputSubTab === 'core'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Khí Máu ĐM (Core)
              </button>
              <button
                onClick={() => setInputSubTab('labs')}
                className={`px-3 py-1 font-bold rounded-md transition-all flex items-center space-x-1 ${
                  inputSubTab === 'labs'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Điện Giải &amp; Labs</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </button>
            </div>

            <button
              onClick={() =>
                setInput({
                  unit: 'mmHg',
                  pH: 7.40,
                  pCO2: 40,
                  pO2: 95,
                  hco3: 24,
                  be: 0,
                  sao2: 98,
                  fio2: 21,
                  na: 140,
                  cl: 100,
                  k: 4.0,
                  albumin: 4.0
                })
              }
              className="text-[11px] text-slate-500 hover:text-slate-900 font-semibold flex items-center space-x-0.5"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* TAB A: CORE VALUES TOUCH STEPPERS */}
          {inputSubTab === 'core' && (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {/* pH Stepper */}
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                    <span>pH Máu</span>
                    <span className="text-[10px] text-slate-400">7.35-7.45</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <button
                      onClick={() => handleStep('pH', -0.02, 6.5, 8.0, 2)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-base shadow-2xs active:bg-blue-50 active:border-blue-500 active:scale-95"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      step="0.01"
                      value={input.pH}
                      onChange={(e) => setInput({ ...input, pH: parseFloat(e.target.value) || 7.4 })}
                      className="w-16 text-center text-base font-extrabold text-blue-700 bg-transparent border-0 focus:ring-0 p-0"
                    />
                    <button
                      onClick={() => handleStep('pH', 0.02, 6.5, 8.0, 2)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-base shadow-2xs active:bg-blue-50 active:border-blue-500 active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[9px] text-center text-slate-400 mt-0.5">
                    [H⁺]: ~{analysis.calculations.hIonNmol} nmol/L
                  </div>
                </div>

                {/* PaCO2 Stepper */}
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                    <span>PaCO₂ ({input.unit})</span>
                    <span className="text-[10px] text-slate-400">{input.unit === 'mmHg' ? '35-45' : '4.7-6.0'}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <button
                      onClick={() =>
                        handleStep(
                          'pCO2',
                          input.unit === 'kPa' ? -0.2 : -1,
                          0,
                          200,
                          input.unit === 'kPa' ? 1 : 0
                        )
                      }
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-base shadow-2xs active:bg-blue-50 active:border-blue-500 active:scale-95"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      step={input.unit === 'kPa' ? '0.1' : '1'}
                      value={input.pCO2}
                      onChange={(e) => setInput({ ...input, pCO2: parseFloat(e.target.value) || 0 })}
                      className="w-16 text-center text-base font-extrabold text-blue-700 bg-transparent border-0 focus:ring-0 p-0"
                    />
                    <button
                      onClick={() =>
                        handleStep(
                          'pCO2',
                          input.unit === 'kPa' ? 0.2 : 1,
                          0,
                          200,
                          input.unit === 'kPa' ? 1 : 0
                        )
                      }
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-base shadow-2xs active:bg-blue-50 active:border-blue-500 active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[9px] text-center text-slate-400 mt-0.5">
                    {input.unit === 'mmHg' ? `${analysis.calculations.paco2Kpa} kPa` : `${analysis.calculations.paco2MmHg} mmHg`}
                  </div>
                </div>

                {/* PaO2 Stepper */}
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                    <span>PaO₂ ({input.unit})</span>
                    <span className="text-[10px] text-slate-400">{input.unit === 'mmHg' ? '>80' : '>10.6'}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <button
                      onClick={() =>
                        handleStep(
                          'pO2',
                          input.unit === 'kPa' ? -0.5 : -2,
                          0,
                          600,
                          input.unit === 'kPa' ? 1 : 0
                        )
                      }
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-base shadow-2xs active:bg-blue-50 active:border-blue-500 active:scale-95"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      step={input.unit === 'kPa' ? '0.1' : '1'}
                      value={input.pO2}
                      onChange={(e) => setInput({ ...input, pO2: parseFloat(e.target.value) || 0 })}
                      className="w-16 text-center text-base font-extrabold text-blue-700 bg-transparent border-0 focus:ring-0 p-0"
                    />
                    <button
                      onClick={() =>
                        handleStep(
                          'pO2',
                          input.unit === 'kPa' ? 0.5 : 2,
                          0,
                          600,
                          input.unit === 'kPa' ? 1 : 0
                        )
                      }
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-base shadow-2xs active:bg-blue-50 active:border-blue-500 active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[9px] text-center text-slate-400 mt-0.5">
                    {input.unit === 'mmHg' ? `${analysis.calculations.pao2Kpa} kPa` : `${analysis.calculations.pao2MmHg} mmHg`}
                  </div>
                </div>

                {/* HCO3- Stepper */}
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                    <span>HCO₃⁻ (mmol/L)</span>
                    <span className="text-[10px] text-slate-400">22-26</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <button
                      onClick={() => handleStep('hco3', -1, 0, 80, 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-base shadow-2xs active:bg-blue-50 active:border-blue-500 active:scale-95"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      step="0.5"
                      value={input.hco3}
                      onChange={(e) => setInput({ ...input, hco3: parseFloat(e.target.value) || 0 })}
                      className="w-16 text-center text-base font-extrabold text-blue-700 bg-transparent border-0 focus:ring-0 p-0"
                    />
                    <button
                      onClick={() => handleStep('hco3', 1, 0, 80, 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 flex items-center justify-center font-bold text-base shadow-2xs active:bg-blue-50 active:border-blue-500 active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[9px] text-center text-slate-400 mt-0.5">
                    Bicarbonate huyết tương
                  </div>
                </div>
              </div>

              {/* FiO2 Quick Chips */}
              <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between gap-1 overflow-x-auto text-[11px]">
                <span className="font-bold text-slate-600 whitespace-nowrap">FiO₂:</span>
                {[21, 28, 40, 60, 100].map((fio2Val) => (
                  <button
                    key={fio2Val}
                    onClick={() => setInput({ ...input, fio2: fio2Val })}
                    className={`px-2 py-1 rounded-md font-bold whitespace-nowrap transition-all ${
                      input.fio2 === fio2Val
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {fio2Val}% {fio2Val === 21 ? '(Khí trời)' : ''}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB B: ELECTROLYTES & LABS (Calculates AG) */}
          {inputSubTab === 'labs' && (
            <div className="space-y-2">
              <div className="text-[10px] text-indigo-900 bg-indigo-50/70 p-1.5 rounded-lg border border-indigo-100">
                * Nhập Na⁺ &amp; Cl⁻ để tự động kích hoạt bộ tính toán Anion Gap và tỷ số Delta/Delta.
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* Na */}
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-600">Na⁺ (mmol/L)</div>
                  <div className="flex items-center justify-between mt-1">
                    <button
                      onClick={() => handleStep('na', -1, 100, 180, 0)}
                      className="w-7 h-7 rounded bg-white border border-slate-300 flex items-center justify-center text-xs font-bold active:scale-95"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={input.na ?? ''}
                      placeholder="140"
                      onChange={(e) =>
                        setInput({ ...input, na: e.target.value ? parseFloat(e.target.value) : undefined })
                      }
                      className="w-14 text-center font-bold text-sm bg-transparent border-0 focus:ring-0 p-0"
                    />
                    <button
                      onClick={() => handleStep('na', 1, 100, 180, 0)}
                      className="w-7 h-7 rounded bg-white border border-slate-300 flex items-center justify-center text-xs font-bold active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Cl */}
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-600">Cl⁻ (mmol/L)</div>
                  <div className="flex items-center justify-between mt-1">
                    <button
                      onClick={() => handleStep('cl', -1, 60, 140, 0)}
                      className="w-7 h-7 rounded bg-white border border-slate-300 flex items-center justify-center text-xs font-bold active:scale-95"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={input.cl ?? ''}
                      placeholder="100"
                      onChange={(e) =>
                        setInput({ ...input, cl: e.target.value ? parseFloat(e.target.value) : undefined })
                      }
                      className="w-14 text-center font-bold text-sm bg-transparent border-0 focus:ring-0 p-0"
                    />
                    <button
                      onClick={() => handleStep('cl', 1, 60, 140, 0)}
                      className="w-7 h-7 rounded bg-white border border-slate-300 flex items-center justify-center text-xs font-bold active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* K */}
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-600">K⁺ (mmol/L)</div>
                  <div className="flex items-center justify-between mt-1">
                    <button
                      onClick={() => handleStep('k', -0.1, 1, 10, 1)}
                      className="w-7 h-7 rounded bg-white border border-slate-300 flex items-center justify-center text-xs font-bold active:scale-95"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      step="0.1"
                      value={input.k ?? ''}
                      placeholder="4.0"
                      onChange={(e) =>
                        setInput({ ...input, k: e.target.value ? parseFloat(e.target.value) : undefined })
                      }
                      className="w-14 text-center font-bold text-sm bg-transparent border-0 focus:ring-0 p-0"
                    />
                    <button
                      onClick={() => handleStep('k', 0.1, 1, 10, 1)}
                      className="w-7 h-7 rounded bg-white border border-slate-300 flex items-center justify-center text-xs font-bold active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Albumin */}
                <div className="bg-slate-50 p-2 rounded-xl border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-600">Albumin (g/dL)</div>
                  <div className="flex items-center justify-between mt-1">
                    <button
                      onClick={() => handleStep('albumin', -0.2, 0.5, 7.0, 1)}
                      className="w-7 h-7 rounded bg-white border border-slate-300 flex items-center justify-center text-xs font-bold active:scale-95"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      step="0.1"
                      value={input.albumin ?? ''}
                      placeholder="4.0"
                      onChange={(e) =>
                        setInput({ ...input, albumin: e.target.value ? parseFloat(e.target.value) : undefined })
                      }
                      className="w-14 text-center font-bold text-sm bg-transparent border-0 focus:ring-0 p-0"
                    />
                    <button
                      onClick={() => handleStep('albumin', 0.2, 0.5, 7.0, 1)}
                      className="w-7 h-7 rounded bg-white border border-slate-300 flex items-center justify-center text-xs font-bold active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. MAIN MOBILE TAB CONTENT */}
      <div className="p-3.5 space-y-4">
        {/* TAB 1: DIAGNOSIS & QUICK METRICS */}
        {activeTab === 'diagnosis' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            {/* Critical Alert Banner */}
            {analysis.criticalWarnings.length > 0 && (
              <div className="bg-rose-50 border border-rose-300 rounded-xl p-3 space-y-1">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Cảnh báo nguy kịch:</span>
                </div>
                <ul className="text-xs text-rose-900 space-y-0.5 pl-5 list-disc font-medium">
                  {analysis.criticalWarnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Dual Diagnostic Cards */}
            <div className="bg-white rounded-xl border border-blue-200 p-3.5 shadow-2xs space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-blue-800 uppercase tracking-wider">
                <Wind className="w-4 h-4 text-blue-600" />
                <span>1. Trao Đổi Khí Phổi</span>
              </div>
              <div className="text-sm font-bold text-slate-900 leading-snug">
                {analysis.gasExchange.title}
              </div>
              <p className="text-xs text-slate-600">{analysis.gasExchange.description}</p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                  P/F: {analysis.calculations.pfRatio}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                  A-a: {analysis.calculations.aaGradient} mmHg
                </span>
                {analysis.gasExchange.severity !== 'normal' && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                    {analysis.gasExchange.severity.toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-emerald-200 p-3.5 shadow-2xs space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>2. Thăng Bằng Toan Kiềm</span>
              </div>
              <div className="text-sm font-bold text-slate-900 leading-snug">
                {analysis.acidBase.title}
              </div>
              <p className="text-xs text-slate-600">{analysis.acidBase.description}</p>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    analysis.acidBase.acidaemiaStatus === 'acidaemia'
                      ? 'bg-rose-100 text-rose-800'
                      : analysis.acidBase.acidaemiaStatus === 'alkalaemia'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {analysis.acidBase.acidaemiaStatus === 'acidaemia'
                    ? 'Toan máu'
                    : analysis.acidBase.acidaemiaStatus === 'alkalaemia'
                    ? 'Kiềm máu'
                    : 'pH Bình thường'}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                  {analysis.acidBase.compensation}
                </span>
              </div>
            </div>

            {/* Quick 4 Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Nồng độ [H⁺]</span>
                <strong className="text-sm text-slate-900">{analysis.calculations.hIonNmol} nmol/L</strong>
                <span className="text-[10px] text-slate-400 block">Chuẩn: 35-45</span>
              </div>
              <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">PaCO₂ Kỳ Vọng (Winter)</span>
                <strong className="text-sm text-slate-900">
                  {analysis.calculations.expectedPaco2Winter
                    ? `${analysis.calculations.expectedPaco2Winter.min} - ${analysis.calculations.expectedPaco2Winter.max}`
                    : 'N/A'}
                </strong>
                <span className="text-[10px] text-slate-400 block">Bù toan chuyển hóa</span>
              </div>
            </div>

            {/* Link to AG Calculator */}
            <button
              onClick={() => setActiveTab('anion-gap')}
              className="w-full py-2.5 px-3 bg-gradient-to-r from-indigo-50 to-blue-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl text-xs font-bold text-indigo-900 flex items-center justify-between shadow-2xs"
            >
              <div className="flex items-center space-x-2">
                <Calculator className="w-4 h-4 text-indigo-600" />
                <span>Mở Máy Tính Anion Gap &amp; Tỷ Số Delta</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-indigo-500" />
            </button>
          </div>
        )}

        {/* TAB 2: AUTOMATED ANION GAP & DELTA/DELTA RATIO */}
        {activeTab === 'anion-gap' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <AutomatedAnionGapCalculator
              na={input.na}
              cl={input.cl}
              hco3={input.hco3}
              k={input.k}
              albumin={input.albumin}
              onUpdateLabs={handleUpdateLabs}
            />
          </div>
        )}

        {/* TAB 3: SIX-STEP READING METHOD (Donna Pierre & Ranson) */}
        {activeTab === 'steps' && (
          <div className="space-y-2.5 animate-in fade-in duration-150">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
              <h3 className="text-xs font-bold text-slate-900">Quy Trình 6 Bước Đọc ABG Chuẩn Y Khoa</h3>
              <p className="text-[11px] text-slate-500">Tiếp cận tuần tự sinh lý học (Donna Pierre &amp; Ranson)</p>
            </div>

            {analysis.sixSteps.map((step) => (
              <div
                key={step.stepNumber}
                className={`p-3 rounded-xl border text-xs space-y-1 bg-white shadow-2xs ${
                  step.status === 'danger'
                    ? 'border-rose-300'
                    : step.status === 'warning'
                    ? 'border-amber-300'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{step.stepName}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      step.status === 'danger'
                        ? 'bg-rose-100 text-rose-800'
                        : step.status === 'warning'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {step.finding}
                  </span>
                </div>
                <div className="font-semibold text-slate-800">{step.title}</div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: CLINICAL MANAGEMENT & PROTOCOLS */}
        {activeTab === 'treatment' && (
          <div className="space-y-3 animate-in fade-in duration-150">
            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-900 leading-relaxed shadow-2xs">
              {analysis.treatmentProtocols.summary}
            </div>

            {/* Oxygen Therapy */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1 text-xs">
              <span className="font-bold text-slate-900 block">1. Liệu pháp Oxy:</span>
              <p className="text-slate-700 leading-relaxed">{analysis.treatmentProtocols.oxygenTherapy}</p>
            </div>

            {/* Ventilation Support */}
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1 text-xs">
              <span className="font-bold text-slate-900 block">2. Hỗ trợ thông khí (NIV / Thở máy):</span>
              <p className="text-slate-700 leading-relaxed">{analysis.treatmentProtocols.ventilationSupport}</p>
            </div>

            {/* Underlying Management */}
            {analysis.treatmentProtocols.underlyingManagement.length > 0 && (
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-1 text-xs">
                <span className="font-bold text-slate-900 block">3. Điều trị nguyên nhân:</span>
                <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                  {analysis.treatmentProtocols.underlyingManagement.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Precautions */}
            {analysis.treatmentProtocols.precautions.length > 0 && (
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-300 text-xs space-y-1 text-amber-900">
                <span className="font-bold block flex items-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Điều cần thận trọng:</span>
                </span>
                <ul className="list-disc pl-4 space-y-0.5">
                  {analysis.treatmentProtocols.precautions.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: CLINICAL REFERENCE & GLOSSARY */}
        {activeTab === 'reference' && (
          <div className="space-y-3 animate-in fade-in duration-150 text-xs">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <h3 className="text-sm font-bold text-slate-900">Kho Tra Cứu Y Khoa Nhanh</h3>
              <p className="text-slate-500 text-[11px]">
                Tài liệu tham khảo chuyên sâu &amp; từ điển thuật ngữ khí máu
              </p>

              {onOpenGlossary && (
                <button
                  onClick={() => onOpenGlossary()}
                  className="w-full py-2.5 px-3 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-between active:scale-98 transition-all"
                >
                  <div className="flex items-center space-x-2">
                    <HelpCircle className="w-4 h-4" />
                    <span>Mở Từ Điển Thuật Ngữ &amp; Viết Tắt ABG</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Reference Points */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <strong className="text-slate-800 block font-bold">Quy Tắc Thăng Bằng &amp; Bù Trừ Vàng:</strong>
              <div className="space-y-1.5 text-slate-700 text-[11px]">
                <p>• <strong>Toan chuyển hóa:</strong> PaCO₂ kỳ vọng = 1.5 × [HCO₃⁻] + 8 ± 2 (Winter).</p>
                <p>• <strong>Kiềm chuyển hóa:</strong> PaCO₂ tăng ~ 0.7 mmHg cho mỗi 1 mmol/L HCO₃⁻ tăng.</p>
                <p>• <strong>Toan hô hấp cấp:</strong> Mỗi 10 mmHg PaCO₂ tăng → HCO₃⁻ tăng 1 mmol/L.</p>
                <p>• <strong>Toan hô hấp mạn:</strong> Mỗi 10 mmHg PaCO₂ tăng → HCO₃⁻ tăng 3.5 - 4 mmol/L.</p>
                <p>• <strong>Kiềm hô hấp cấp:</strong> Mỗi 10 mmHg PaCO₂ giảm → HCO₃⁻ giảm 2 mmol/L.</p>
                <p>• <strong>Kiềm hô hấp mạn:</strong> Mỗi 10 mmHg PaCO₂ giảm → HCO₃⁻ giảm 4 - 5 mmol/L.</p>
                <p className="text-rose-700 font-semibold">
                  * Quy tắc vàng: Cơ thể không bao giờ bù trừ quá mức khiến pH đảo chiều!
                </p>
              </div>
            </div>

            {/* Switch to Full Desktop Mode Button */}
            <div className="pt-2">
              <button
                onClick={onSwitchToDesktop}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold flex items-center justify-center space-x-2 active:scale-98 transition-all"
              >
                <Monitor className="w-4 h-4 text-slate-600" />
                <span>Xem Giao Diện Máy Tính Đầy Đủ</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 5. PRESETS POPUP MODAL (Mobile Optimized) */}
      {showPresetModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col shadow-xl overflow-hidden">
            <div className="p-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h4 className="text-sm font-bold text-slate-900">Chọn Ca Bệnh Mẫu Kinh Điển</h4>
              </div>
              <button
                onClick={() => setShowPresetModal(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 p-1"
              >
                Đóng
              </button>
            </div>

            <div className="p-3.5 overflow-y-auto space-y-2 divide-y divide-slate-100">
              {MOBILE_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(p.data);
                    setShowPresetModal(false);
                  }}
                  className="w-full pt-2 first:pt-0 text-left hover:bg-blue-50/60 p-2 rounded-xl transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                      {p.name}
                    </span>
                    <span className="text-[10px] text-blue-600 font-semibold">Nạp ca →</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{p.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. FIXED BOTTOM NAVIGATION BAR (Native Mobile App Style) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1.5 flex items-center justify-around">
        {/* Tab 1: Diagnosis */}
        <button
          onClick={() => setActiveTab('diagnosis')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'diagnosis' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <HeartPulse className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Khí Máu</span>
        </button>

        {/* Tab 2: Anion Gap */}
        <button
          onClick={() => setActiveTab('anion-gap')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'anion-gap' ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calculator className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Anion Gap</span>
        </button>

        {/* Tab 3: 6 Steps */}
        <button
          onClick={() => setActiveTab('steps')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'steps' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileCheck2 className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">6 Bước</span>
        </button>

        {/* Tab 4: Treatment */}
        <button
          onClick={() => setActiveTab('treatment')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'treatment' ? 'text-emerald-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Stethoscope className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Xử Trí</span>
        </button>

        {/* Tab 5: Reference */}
        <button
          onClick={() => setActiveTab('reference')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'reference' ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Tra Cứu</span>
        </button>
      </nav>
    </div>
  );
};
