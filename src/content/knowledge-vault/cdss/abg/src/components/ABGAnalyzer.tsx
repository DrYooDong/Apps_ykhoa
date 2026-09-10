import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  HeartPulse,
  Activity,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Stethoscope,
  Wind,
  SlidersHorizontal,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ABGInput, PressureUnit } from '../types/abg';
import { analyzeABG, KPA_TO_MMHG, MMHG_TO_KPA } from '../utils/abgEngine';
import { AutomatedAnionGapCalculator } from './AutomatedAnionGapCalculator';

interface ABGAnalyzerProps {
  initialInput?: ABGInput;
  onSelectCase?: (caseId: number) => void;
  onInputChange?: (input: ABGInput) => void;
}

const DEFAULT_INPUT: ABGInput = {
  unit: 'mmHg',
  pH: 7.40,
  pCO2: 40,
  pO2: 95,
  hco3: 24,
  be: 0,
  sao2: 98,
  fio2: 21,
  na: 140,
  k: 4.0,
  cl: 100,
  lactate: 1.0,
  glucose: 5.0,
  albumin: 4.0,
  patientAge: 45
};

interface Preset {
  name: string;
  desc: string;
  category: string;
  badgeColor: string;
  data: ABGInput;
}

const PRESETS: Preset[] = [
  {
    name: 'Bình thường (Normal)',
    desc: 'Người khỏe mạnh thở khí trời 21%',
    category: 'Chuẩn',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800',
    data: {
      unit: 'mmHg',
      pH: 7.40,
      pCO2: 40,
      pO2: 95,
      hco3: 24,
      be: 0,
      sao2: 98,
      fio2: 21,
      na: 140,
      k: 4.0,
      cl: 100,
      lactate: 1.0,
      glucose: 5.0,
      albumin: 4.0,
      patientAge: 30
    }
  },
  {
    name: 'Viêm phổi thùy (Type 1)',
    desc: 'Suy hô hấp Type 1, kiềm hô hấp cấp do thở nhanh',
    category: 'Hô hấp',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/80 dark:text-sky-300 dark:border-sky-800',
    data: {
      unit: 'mmHg',
      pH: 7.50,
      pCO2: 28.1,
      pO2: 57.8,
      hco3: 23.9,
      be: -0.5,
      sao2: 88.7,
      fio2: 21,
      na: 138,
      k: 3.7,
      cl: 99,
      lactate: 1.2,
      glucose: 5.4,
      albumin: 3.8,
      patientAge: 25
    }
  },
  {
    name: 'Ngộ độc Morphin (Type 2 Cấp)',
    desc: 'Ức chế hô hấp cấp sau mổ, toan hô hấp chưa bù',
    category: 'Cấp cứu',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-800',
    data: {
      unit: 'mmHg',
      pH: 7.18,
      pCO2: 62.0,
      pO2: 50.0,
      hco3: 23.0,
      be: -5.0,
      sao2: 81.0,
      fio2: 21,
      na: 140,
      k: 4.2,
      cl: 101,
      lactate: 1.5,
      glucose: 5.2,
      albumin: 4.0,
      patientAge: 42
    }
  },
  {
    name: 'Đợt cấp COPD (Type 2 Mạn)',
    desc: 'Suy hô hấp Type 2 trên nền mạn, thận bù trừ giữ HCO3-',
    category: 'Mạn tính',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-800',
    data: {
      unit: 'mmHg',
      pH: 7.37,
      pCO2: 64.0,
      pO2: 58.0,
      hco3: 36.5,
      be: 8.9,
      sao2: 88.0,
      fio2: 21,
      na: 139,
      k: 4.0,
      cl: 102,
      lactate: 1.2,
      glucose: 5.0,
      albumin: 3.6,
      patientAge: 68
    }
  },
  {
    name: 'DKA Toan Ceton ĐTĐ',
    desc: 'Toan chuyển hóa tăng Anion Gap cực nặng, thở Kussmaul',
    category: 'Nội tiết',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-800',
    data: {
      unit: 'mmHg',
      pH: 7.05,
      pCO2: 11.0,
      pO2: 187.0,
      hco3: 6.0,
      be: -25.2,
      sao2: 99.8,
      fio2: 60,
      na: 141,
      k: 4.6,
      cl: 96,
      lactate: 1.0,
      glucose: 35.0,
      albumin: 4.2,
      patientAge: 35
    }
  },
  {
    name: 'Sốc Nhiễm Khuẩn (Toan Lactic)',
    desc: 'Giảm tưới máu mô sâu, Lactate 5.1 mmol/L',
    category: 'Hồi sức',
    badgeColor: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950/80 dark:text-red-300 dark:border-red-800',
    data: {
      unit: 'mmHg',
      pH: 7.36,
      pCO2: 31.5,
      pO2: 203.0,
      hco3: 17.3,
      be: -6.9,
      sao2: 100,
      fio2: 60,
      na: 140,
      k: 4.1,
      cl: 101,
      lactate: 5.1,
      glucose: 6.8,
      albumin: 2.8,
      patientAge: 64
    }
  },
  {
    name: 'Ngộ độc Aspirin (Salicylate)',
    desc: 'Rối loạn hỗn hợp: Kiềm hô hấp + Toan chuyển hóa tăng AG',
    category: 'Ngộ độc',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/80 dark:text-purple-300 dark:border-purple-800',
    data: {
      unit: 'mmHg',
      pH: 7.41,
      pCO2: 22.6,
      pO2: 97.5,
      hco3: 17.6,
      be: -8.3,
      sao2: 99.0,
      fio2: 21,
      na: 140,
      k: 3.6,
      cl: 99,
      lactate: 1.4,
      glucose: 5.0,
      albumin: 4.0,
      patientAge: 18
    }
  },
  {
    name: 'Nôn ói nhiều (Kiềm CH)',
    desc: 'Mất acid HCl dịch vị, hạ Clo và Kali máu',
    category: 'Chuyển hóa',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/80 dark:text-teal-300 dark:border-teal-800',
    data: {
      unit: 'mmHg',
      pH: 7.44,
      pCO2: 48.0,
      pO2: 83.0,
      hco3: 32.0,
      be: 4.0,
      sao2: 96.0,
      fio2: 21,
      na: 133,
      k: 3.0,
      cl: 91,
      lactate: 1.0,
      glucose: 5.0,
      albumin: 4.0,
      patientAge: 35
    }
  },
  {
    name: 'Toan hóa ống thận (RTA)',
    desc: 'Toan chuyển hóa khoảng trống Anion bình thường (NAGMA)',
    category: 'Thận',
    badgeColor: 'bg-slate-200 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    data: {
      unit: 'mmHg',
      pH: 7.37,
      pCO2: 31.5,
      pO2: 99.0,
      hco3: 18.0,
      be: -7.0,
      sao2: 99.0,
      fio2: 21,
      na: 137,
      k: 3.0,
      cl: 109,
      lactate: 1.0,
      glucose: 4.0,
      albumin: 4.0,
      patientAge: 52
    }
  }
];

export const ABGAnalyzer: React.FC<ABGAnalyzerProps> = ({ initialInput, onInputChange }) => {
  const [input, setInput] = useState<ABGInput>(initialInput || DEFAULT_INPUT);
  const [activeInputTab, setActiveInputTab] = useState<'core' | 'labs'>('core');
  const [copied, setCopied] = useState(false);

  // Sync if initialInput changes from outside
  React.useEffect(() => {
    if (initialInput) {
      setInput(initialInput);
    }
  }, [initialInput]);

  // Sync upwards if input changes
  React.useEffect(() => {
    if (onInputChange) {
      onInputChange(input);
    }
  }, [input, onInputChange]);

  // Unit toggle handler
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

  // Device quick select helper
  const handleDeviceChange = (fio2Val: number) => {
    setInput((prev) => ({ ...prev, fio2: fio2Val }));
  };

  // Run analysis engine
  const analysis = useMemo(() => analyzeABG(input), [input]);

  // Sync updates from AutomatedAnionGapCalculator
  const handleUpdateLabs = (updates: { na?: number; cl?: number; k?: number; albumin?: number }) => {
    setInput((prev) => ({
      ...prev,
      ...updates
    }));
  };

  // Copy clinical summary to clipboard
  const handleCopySummary = () => {
    const text = `=== BÁO CÁO PHÂN TÍCH KHÍ MÁU ĐỘNG MẠCH (ABG PRO CDSS) ===
Thông số: pH ${input.pH} | PaCO2 ${input.pCO2} ${input.unit} | PaO2 ${input.pO2} ${input.unit} | HCO3- ${input.hco3} mmol/L | BE ${input.be} mmol/L | SaO2 ${input.sao2}% | FiO2 ${input.fio2}%
1. TRAO ĐỔI KHÍ PHỔI: ${analysis.gasExchange.title} (${analysis.gasExchange.description})
2. THĂNG BẰNG TOAN KIỀM: ${analysis.acidBase.title} (${analysis.acidBase.description})
3. CÁC CHỈ SỐ CHUYÊN SÂU:
   - Nồng độ H+: ${analysis.calculations.hIonNmol} nmol/L
   - Tỉ lệ PaO2/FiO2: ${analysis.calculations.pfRatio} (${analysis.calculations.pfClass})
   - Phân áp oxy phế nang PAO2: ${analysis.calculations.pao2Alveolar} mmHg
   - Chênh lệch phế nang - mao mạch (A-a gradient): ${analysis.calculations.aaGradient} mmHg (Kỳ vọng: ~${analysis.calculations.expectedAaGradient} mmHg)
   ${analysis.calculations.anionGap !== undefined ? `- Khoảng trống Anion (AG): ${analysis.calculations.anionGap} mmol/L (${analysis.calculations.isAnionGapHigh ? 'TĂNG' : 'BÌNH THƯỜNG'})` : ''}
   ${analysis.calculations.deltaRatio !== undefined ? `- Tỷ số Delta (ΔAG/ΔHCO3): ${analysis.calculations.deltaRatio} (${analysis.calculations.deltaRatioInterpretation})` : ''}
4. KHUYẾN CÁO XỬ TRÍ LÂM SÀNG:
   - Liệu pháp Oxy: ${analysis.treatmentProtocols.oxygenTherapy}
   - Hỗ trợ thông khí: ${analysis.treatmentProtocols.ventilationSupport}
   - Xử trí nguyên nhân: ${analysis.treatmentProtocols.underlyingManagement.join('; ')}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Quick scroll to sections
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Status helper badges
  const getPhStatus = (ph: number) => {
    if (ph < 7.35) return { label: 'Toan Máu', color: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300' };
    if (ph > 7.45) return { label: 'Kiềm Máu', color: 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300' };
    return { label: 'Bình Thường', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300' };
  };

  const getPco2Status = (pco2: number, unit: PressureUnit) => {
    const min = unit === 'mmHg' ? 35 : 4.7;
    const max = unit === 'mmHg' ? 45 : 6.0;
    if (pco2 > max) return { label: 'Ứ CO₂', color: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300' };
    if (pco2 < min) return { label: 'Tăng Thông Khí', color: 'bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300' };
    return { label: 'Chuẩn', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300' };
  };

  const phStatus = getPhStatus(input.pH);
  const pco2Status = getPco2Status(input.pCO2, input.unit);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
      {/* Quick Presets Bar (Redesigned as Modern Clinical Chips) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3.5 shadow-xs transition-colors">
        <div className="flex items-center justify-between mb-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
            <span className="lung-pulse-dot shrink-0" />
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>Ca Bệnh Kinh Điển (Nạp Nhanh):</span>
          </div>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:inline font-medium">
            Chọn một ca để tự động nạp toàn bộ số liệu khí máu &amp; điện giải
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {PRESETS.map((p, idx) => {
            const isActive = input.pH === p.data.pH && input.pCO2 === p.data.pCO2 && input.pO2 === p.data.pO2;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setInput(p.data)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap text-left cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-blue-300 border-slate-200 dark:border-slate-700'
                }`}
                title={p.desc}
              >
                <span className={`px-1.5 py-0.2 text-[10px] rounded-md font-bold border ${isActive ? 'bg-white/20 text-white border-white/30' : p.badgeColor}`}>
                  {p.category}
                </span>
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left Panel (Input, 4 cols) & Right Panel (Content, 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Compact Parameter Form (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-3 sticky top-20 transition-colors">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="inline-flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-rose-500 shrink-0" />
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Thông Số Khí Máu</h2>
              </div>

              <div className="inline-flex items-center gap-1.5">
                {/* Unit toggle */}
                <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => handleUnitToggle('mmHg')}
                    className={`px-2 py-0.5 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                      input.unit === 'mmHg'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    mmHg
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUnitToggle('kPa')}
                    className={`px-2 py-0.5 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                      input.unit === 'kPa'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                    }`}
                  >
                    kPa
                  </button>
                </div>
              </div>
            </div>

            {/* Sub-tab Selector for Input Sections */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveInputTab('core')}
                className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeInputTab === 'core'
                    ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Khí Máu (Core)
              </button>
              <button
                type="button"
                onClick={() => setActiveInputTab('labs')}
                className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 ${
                  activeInputTab === 'labs'
                    ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>Điện Giải &amp; Labs</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              </button>
            </div>

            {/* TAB 1: CORE BLOOD GAS VALUES */}
            {activeInputTab === 'core' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2.5">
                  {/* pH */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      <span>pH Máu</span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${phStatus.color}`}>
                        {phStatus.label}
                      </span>
                    </div>
                    <input
                      id="input-ph"
                      type="number"
                      step="0.01"
                      min="6.5"
                      max="8.0"
                      value={input.pH}
                      onChange={(e) => setInput({ ...input, pH: parseFloat(e.target.value) || 7.4 })}
                      className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Chuẩn: 7.35 - 7.45</span>
                      <span>[H⁺]: ~{analysis.calculations.hIonNmol}</span>
                    </div>
                  </div>

                  {/* PaCO2 */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      <span>PaCO₂ ({input.unit})</span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${pco2Status.color}`}>
                        {pco2Status.label}
                      </span>
                    </div>
                    <input
                      id="input-paco2"
                      type="number"
                      step={input.unit === 'kPa' ? '0.1' : '1'}
                      value={input.pCO2}
                      onChange={(e) => setInput({ ...input, pCO2: parseFloat(e.target.value) || 0 })}
                      className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Chuẩn: {input.unit === 'mmHg' ? '35 - 45' : '4.7 - 6.0'}</span>
                      <span>{input.unit === 'mmHg' ? `${analysis.calculations.paco2Kpa} kPa` : `${analysis.calculations.paco2MmHg} mmHg`}</span>
                    </div>
                  </div>

                  {/* PaO2 */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      <span>PaO₂ ({input.unit})</span>
                      <span className="text-[10px] text-slate-400">
                        {input.unit === 'mmHg' ? '> 80' : '> 10.6'}
                      </span>
                    </div>
                    <input
                      id="input-pao2"
                      type="number"
                      step={input.unit === 'kPa' ? '0.1' : '1'}
                      value={input.pO2}
                      onChange={(e) => setInput({ ...input, pO2: parseFloat(e.target.value) || 0 })}
                      className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Oxy hóa máu</span>
                      <span>{input.unit === 'mmHg' ? `${analysis.calculations.pao2Kpa} kPa` : `${analysis.calculations.pao2MmHg} mmHg`}</span>
                    </div>
                  </div>

                  {/* HCO3- */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      <span>HCO₃⁻ (mmol/L)</span>
                      <span className="text-[10px] text-slate-400">22 - 26</span>
                    </div>
                    <input
                      id="input-hco3"
                      type="number"
                      step="0.5"
                      value={input.hco3}
                      onChange={(e) => setInput({ ...input, hco3: parseFloat(e.target.value) || 0 })}
                      className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <span className="text-[10px] text-slate-400 block">Standard Bicarbonate</span>
                  </div>

                  {/* Base Excess */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      <span>Base Excess (BE)</span>
                      <span className="text-[10px] text-slate-400">-2 đến +2</span>
                    </div>
                    <input
                      id="input-be"
                      type="number"
                      step="0.5"
                      value={input.be}
                      onChange={(e) => setInput({ ...input, be: parseFloat(e.target.value) || 0 })}
                      className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <span className="text-[10px] text-slate-400 block">Kiềm dư / Thiếu hụt</span>
                  </div>

                  {/* SaO2 */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      <span>SaO₂ (%)</span>
                      <span className="text-[10px] text-slate-400">&gt; 95%</span>
                    </div>
                    <input
                      id="input-sao2"
                      type="number"
                      min="0"
                      max="100"
                      value={input.sao2}
                      onChange={(e) => setInput({ ...input, sao2: parseFloat(e.target.value) || 0 })}
                      className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <span className="text-[10px] text-slate-400 block">Độ bão hòa Oxy</span>
                  </div>
                </div>

                {/* FiO2 & Device Selector */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    <span>Phân suất Oxy FiO₂</span>
                    <strong className="text-blue-600 dark:text-blue-400">{input.fio2}%</strong>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <input
                      id="input-fio2"
                      type="number"
                      min="21"
                      max="100"
                      value={input.fio2}
                      onChange={(e) => setInput({ ...input, fio2: parseFloat(e.target.value) || 21 })}
                      className="w-16 px-2 py-1.5 text-xs font-bold text-center rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                    <select
                      aria-label="Chọn thiết bị thở oxy"
                      value={input.fio2}
                      onChange={(e) => handleDeviceChange(parseFloat(e.target.value))}
                      className="flex-1 px-2 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value={21}>Khí trời (21%)</option>
                      <option value={24}>Gọng mũi 1 L/p (24%)</option>
                      <option value={28}>Gọng mũi 2 L/p / Venturi (28%)</option>
                      <option value={32}>Gọng mũi 3 L/p (32%)</option>
                      <option value={40}>Mask đơn giản 5-6 L/p (40%)</option>
                      <option value={60}>Mask có bóng thở lại 8-10 L/p (60%)</option>
                      <option value={80}>Mask túi không thở lại (80%)</option>
                      <option value={100}>Thở máy 100% / Mask kín (100%)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ELECTROLYTES & LABS (Calculates AG & Delta) */}
            {activeInputTab === 'labs' && (
              <div className="space-y-2.5 animate-in fade-in duration-150">
                <div className="p-2.5 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/50 text-[11px] text-indigo-900 dark:text-indigo-300 leading-relaxed">
                  * Nhập Na⁺ và Cl⁻ để tự động tính Anion Gap và Tỷ số Delta/Delta ở bảng phân tích.
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Na */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      <span>Na⁺ (mmol/L)</span>
                      <span className="text-[10px] text-slate-400">135 - 145</span>
                    </div>
                    <input
                      id="input-na"
                      type="number"
                      value={input.na ?? ''}
                      placeholder="140"
                      onChange={(e) =>
                        setInput({ ...input, na: e.target.value ? parseFloat(e.target.value) : undefined })
                      }
                      className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Cl */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      <span>Cl⁻ (mmol/L)</span>
                      <span className="text-[10px] text-slate-400">98 - 106</span>
                    </div>
                    <input
                      id="input-cl"
                      type="number"
                      value={input.cl ?? ''}
                      placeholder="100"
                      onChange={(e) =>
                        setInput({ ...input, cl: e.target.value ? parseFloat(e.target.value) : undefined })
                      }
                      className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* K */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      <span>K⁺ (mmol/L)</span>
                      <span className="text-[10px] text-slate-400">3.5 - 5.0</span>
                    </div>
                    <input
                      id="input-k"
                      type="number"
                      step="0.1"
                      value={input.k ?? ''}
                      placeholder="4.0"
                      onChange={(e) =>
                        setInput({ ...input, k: e.target.value ? parseFloat(e.target.value) : undefined })
                      }
                      className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Albumin */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      <span>Albumin (g/dL)</span>
                      <span className="text-[10px] text-slate-400">3.5 - 5.0</span>
                    </div>
                    <input
                      id="input-albumin"
                      type="number"
                      step="0.1"
                      value={input.albumin ?? ''}
                      placeholder="4.0"
                      onChange={(e) =>
                        setInput({ ...input, albumin: e.target.value ? parseFloat(e.target.value) : undefined })
                      }
                      className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Lactate */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      <span>Lactate (mmol/L)</span>
                      <span className="text-[10px] text-slate-400">&lt; 2.0</span>
                    </div>
                    <input
                      id="input-lactate"
                      type="number"
                      step="0.1"
                      value={input.lactate ?? ''}
                      placeholder="1.0"
                      onChange={(e) =>
                        setInput({ ...input, lactate: e.target.value ? parseFloat(e.target.value) : undefined })
                      }
                      className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Age */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                      <span>Tuổi bệnh nhân</span>
                      <span className="text-[10px] text-slate-400">Tính A-a</span>
                    </div>
                    <input
                      id="input-age"
                      type="number"
                      value={input.patientAge ?? ''}
                      placeholder="45"
                      onChange={(e) =>
                        setInput({ ...input, patientAge: e.target.value ? parseFloat(e.target.value) : undefined })
                      }
                      className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Reset Button */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setInput(DEFAULT_INPUT)}
                className="py-1.5 px-3 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 inline-flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Đặt lại chuẩn</span>
              </button>
              <span className="text-[10px] text-slate-400">7.40 / 40 / 95 / 24</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Bento Grid 3 Cards */}
        <div className="lg:col-span-8 space-y-4">
          {/* Quick Section Navigation Jumper */}
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-3.5 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs text-xs font-semibold overflow-x-auto gap-2 transition-colors">
            <div className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="hidden sm:inline">Xem nhanh:</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
              <button
                type="button"
                onClick={() => scrollToSection('sec-conclusion')}
                className="px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 whitespace-nowrap cursor-pointer text-[11px]"
              >
                1. Chẩn Đoán Khí Máu
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('sec-anion-gap')}
                className="px-2.5 py-1 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold whitespace-nowrap cursor-pointer text-[11px]"
              >
                2. Anion Gap &amp; Delta
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('sec-six-steps')}
                className="px-2.5 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 whitespace-nowrap cursor-pointer text-[11px]"
              >
                3. Quy Trình 6 Bước
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('sec-treatment')}
                className="px-2.5 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold whitespace-nowrap cursor-pointer text-[11px]"
              >
                4. Xử Trí Cấp Cứu
              </button>
            </div>
          </div>

          {/* Critical Alert Banner if warnings exist */}
          {analysis.criticalWarnings.length > 0 && (
            <div className="bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-900/60 rounded-2xl p-4 shadow-xs space-y-2">
              <div className="inline-flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                <span>CẢNH BÁO NGUY KỊCH TRÊN KHÍ MÁU:</span>
              </div>
              <ul className="space-y-1 pl-6 list-disc text-xs font-medium text-rose-900 dark:text-rose-200">
                {analysis.criticalWarnings.map((warn, i) => (
                  <li key={i}>{warn}</li>
                ))}
              </ul>
            </div>
          )}

          {/* BENTO CARD 1: PRIMARY DIAGNOSTIC CONCLUSION */}
          <div id="sec-conclusion" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4 transition-colors">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-4 h-4 shrink-0" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    Kết Luận Chẩn Đoán Khí Máu (2 Trục Sinh Lý)
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Phân tích kết hợp trao đổi khí phế nang và thăng bằng toan kiềm
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <Copy className="w-3.5 h-3.5 shrink-0" />}
                  <span>{copied ? 'Đã sao chép!' : 'Sao chép SOAP'}</span>
                </button>
              </div>
            </div>

            {/* Dual-Axis Primary Diagnosis Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Axis 1: Pulmonary Gas Exchange */}
              <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-gradient-to-br from-blue-50/70 to-indigo-50/40 dark:from-slate-800/80 dark:to-blue-950/40 space-y-2.5 shadow-2xs">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                  <Wind className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Trục 1: Trao Đổi Khí Phổi</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {analysis.gasExchange.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {analysis.gasExchange.description}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
                    P/F = {analysis.calculations.pfRatio}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    A-a = {analysis.calculations.aaGradient} mmHg
                  </span>
                  {analysis.gasExchange.severity !== 'normal' && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                        analysis.gasExchange.severity === 'severe'
                          ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                          : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                      }`}
                    >
                      Mức độ: {analysis.gasExchange.severity.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>

              {/* Axis 2: Acid-Base Balance */}
              <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-gradient-to-br from-emerald-50/70 to-teal-50/40 dark:from-slate-800/80 dark:to-emerald-950/40 space-y-2.5 shadow-2xs">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Trục 2: Thăng Bằng Toan Kiềm</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  {analysis.acidBase.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {analysis.acidBase.description}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-1.5">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                      analysis.acidBase.acidaemiaStatus === 'acidaemia'
                        ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                        : analysis.acidBase.acidaemiaStatus === 'alkalaemia'
                        ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800'
                        : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                    }`}
                  >
                    {analysis.acidBase.acidaemiaStatus === 'acidaemia'
                      ? 'Toan máu (Acidaemia)'
                      : analysis.acidBase.acidaemiaStatus === 'alkalaemia'
                      ? 'Kiềm máu (Alkalaemia)'
                      : 'pH Sinh lý bình thường'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    Bù trừ: {analysis.acidBase.compensation}
                  </span>
                </div>
              </div>
            </div>

            {/* Calculations & Advanced Indices Grid */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                Các Chỉ Số Sinh Lý Chuyên Sâu
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                {/* [H+] */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Nồng độ [H⁺]</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    {analysis.calculations.hIonNmol}{' '}
                    <span className="text-[10px] font-normal text-slate-500">nmol/L</span>
                  </div>
                  <div className="text-[10px] text-slate-400">Chuẩn: 35 - 45</div>
                </div>

                {/* P/F Ratio */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Tỉ lệ PaO₂/FiO₂</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    {analysis.calculations.pfRatio}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate" title={analysis.calculations.pfClass}>
                    {analysis.calculations.pfClass}
                  </div>
                </div>

                {/* A-a Gradient */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">A-a Gradient</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    {analysis.calculations.aaGradient}{' '}
                    <span className="text-[10px] font-normal text-slate-500">mmHg</span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    Tuổi dự kiến: ~{analysis.calculations.expectedAaGradient}
                  </div>
                </div>

                {/* PaCO2 Winter compensation */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">PaCO₂ Kỳ Vọng (Winter)</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    {analysis.calculations.expectedPaco2Winter
                      ? `${analysis.calculations.expectedPaco2Winter.min} - ${analysis.calculations.expectedPaco2Winter.max}`
                      : 'N/A'}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    {analysis.calculations.expectedPaco2Winter ? 'Bù trừ toan CH' : 'Áp dụng toan CH'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BENTO CARD 2: AUTOMATED ANION GAP & DELTA CALCULATOR */}
          <div id="sec-anion-gap">
            <AutomatedAnionGapCalculator
              na={input.na}
              cl={input.cl}
              hco3={input.hco3}
              k={input.k}
              albumin={input.albumin}
              onUpdateLabs={handleUpdateLabs}
            />
          </div>

          {/* BENTO CARD 3: SIX-STEP INTERPRETATION WORKFLOW (Donna Pierre & Ranson) */}
          <div id="sec-six-steps" className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-3.5 transition-colors">
            <div className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4 shrink-0" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Quy Trình 6 Bước Đọc ABG Chuẩn Y Khoa (Donna Pierre &amp; Ranson)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Phân tích tuần tự theo từng nấc thang sinh lý học</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {analysis.sixSteps.map((step) => (
                <div
                  key={step.stepNumber}
                  className={`p-3.5 rounded-xl border text-xs space-y-1 transition-all ${
                    step.status === 'danger'
                      ? 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-950 dark:text-rose-200'
                      : step.status === 'warning'
                      ? 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/60 text-amber-950 dark:text-amber-200'
                      : step.status === 'normal'
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-950 dark:text-emerald-200'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold gap-2">
                    <span className="text-xs text-slate-900 dark:text-white">{step.stepName}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 font-semibold shadow-2xs">
                      {step.finding}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{step.title}</div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* BENTO CARD 4: CLINICAL TREATMENT & MANAGEMENT PROTOCOLS */}
          <div id="sec-treatment" className="bg-white dark:bg-slate-900 rounded-2xl border border-blue-200 dark:border-blue-900/60 p-5 shadow-xs space-y-4 transition-colors">
            <div className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Stethoscope className="w-4 h-4 shrink-0" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Hướng Dẫn Xử Trí Lâm Sàng Toàn Diện
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Phác đồ hành động chuẩn y khoa dựa trên kết quả khí máu thu được
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900/60 text-xs font-semibold text-blue-900 dark:text-blue-200 leading-relaxed">
              {analysis.treatmentProtocols.summary}
            </div>

            <div className="space-y-3 text-xs">
              {/* Oxygen therapy */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">1. Liệu pháp Oxy:</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{analysis.treatmentProtocols.oxygenTherapy}</p>
              </div>

              {/* Ventilation support */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">2. Hỗ trợ thông khí (NIV / Thở máy):</span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {analysis.treatmentProtocols.ventilationSupport}
                </p>
              </div>

              {/* Core medical management */}
              {analysis.treatmentProtocols.underlyingManagement.length > 0 && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">3. Điều trị nguyên nhân &amp; Dược lý học:</span>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
                    {analysis.treatmentProtocols.underlyingManagement.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Precautions */}
              {analysis.treatmentProtocols.precautions.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 space-y-1">
                  <span className="font-bold block inline-flex items-center gap-1.5 text-amber-950 dark:text-amber-200">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    <span>Lưu ý thận trọng cốt tử:</span>
                  </span>
                  <ul className="list-disc pl-5 space-y-1 font-medium">
                    {analysis.treatmentProtocols.precautions.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Monitoring advice */}
              <div className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1">
                * Khuyến nghị giám sát: {analysis.treatmentProtocols.monitoringAdvice}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
