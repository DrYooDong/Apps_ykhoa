import React, { useState, useMemo } from 'react';
import {
  AlertTriangle,
  HeartPulse,
  Activity,
  Flame,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Stethoscope,
  ChevronDown,
  ChevronUp,
  Wind,
  Minimize2,
  Maximize2,
  SlidersHorizontal,
  BookmarkCheck,
  Calculator,
  Pencil
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
  data: ABGInput;
}

const PRESETS: Preset[] = [
  {
    name: 'Bình thường (Normal)',
    desc: 'Người khỏe mạnh thở khí trời',
    category: 'Chuẩn',
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
    category: 'Suy hô hấp',
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
    category: 'Hô hấp',
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
    name: 'DKA Nhiễm toan Ceton ĐTĐ',
    desc: 'Toan chuyển hóa tăng Anion Gap cực nặng, thở Kussmaul',
    category: 'Nội tiết',
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
    name: 'Sốc nhiễm khuẩn (Toan Lactic)',
    desc: 'Giảm tưới máu mô sâu, Lactate 5.1 mmol/L',
    category: 'Hồi sức',
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
    name: 'Nôn ói liên tục (Kiềm chuyển hóa)',
    desc: 'Mất acid HCl dịch vị, hạ Clo và Kali máu',
    category: 'Chuyển hóa',
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
    name: 'Toan hóa ống thận Type 1 (RTA)',
    desc: 'Toan chuyển hóa khoảng trống Anion bình thường (NAGMA)',
    category: 'Thận',
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
  const [isInputCollapsed, setIsInputCollapsed] = useState(false);
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
    const text = `=== BÁO CÁO PHÂN TÍCH KHÍ MÁU ĐỘNG MẠCH (ABG PRO) ===
Thông số: pH ${input.pH} | PaCO2 ${input.pCO2} ${input.unit} | PaO2 ${input.pO2} ${input.unit} | HCO3- ${input.hco3} mmol/L | BE ${input.be} mmol/L | SaO2 ${input.sao2}% | FiO2 ${input.fio2}%
1. TRAO ĐỔI KHÍ PHỔI: ${analysis.gasExchange.title} (${analysis.gasExchange.description})
2. THĂNG BẰNG TOAN KIỀM: ${analysis.acidBase.title} (${analysis.acidBase.description})
3. CÁC CHỈ SỐ CHUYÊN SÂU:
   - Nồng độ H+: ${analysis.calculations.hIonNmol} nmol/L
   - Tỉ lệ PaO2/FiO2: ${analysis.calculations.pfRatio} (${analysis.calculations.pfClass})
   - Phân áp oxy phế nang PAO2: ${analysis.calculations.pao2Alveolar} mmHg
   - Chênh lệch phế nang - mao mạch (A-a gradient): ${analysis.calculations.aaGradient} mmHg (Kỳ vọng: ~${analysis.calculations.expectedAaGradient} mmHg)
   ${analysis.calculations.anionGap !== undefined ? `- Khoảng trống Anion (Anion Gap): ${analysis.calculations.anionGap} mmol/L (${analysis.calculations.isAnionGapHigh ? 'TĂNG' : 'BÌNH THƯỜNG'})` : ''}
   ${analysis.calculations.deltaRatio !== undefined ? `- Tỷ số Delta (ΔAG/ΔHCO3): ${analysis.calculations.deltaRatio} (${analysis.calculations.deltaRatioInterpretation})` : ''}
4. KHUYẾN CÁO XỬ TRÍ LÂM SÀNG:
   - Liệu pháp Oxy: ${analysis.treatmentProtocols.oxygenTherapy}
   - Hỗ trợ thông khí: ${analysis.treatmentProtocols.ventilationSupport}
   - Biện pháp cốt lõi: ${analysis.treatmentProtocols.underlyingManagement.join('; ')}
   - Giám sát: ${analysis.treatmentProtocols.monitoringAdvice}
(Nguồn: Arterial Blood Gases Made Easy 2nd Ed & ABG Interpretation A case study approach)`;

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
      {/* Quick Presets Bar (Compact) */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Ca bệnh mẫu kinh điển (Nạp nhanh):</span>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Chọn để nạp tức thì số liệu ca bệnh
          </span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setInput(p.data)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 border border-slate-200 transition-all whitespace-nowrap text-left cursor-pointer"
              title={p.desc}
            >
              <span className="font-semibold">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* COMPACT TOP PARAMETER STRIP (Displays when user collapses the input panel to prioritize content) */}
      {isInputCollapsed && (
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 rounded-2xl p-3.5 text-white shadow-md border border-slate-700 flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-blue-500/20 rounded-lg border border-blue-400/30">
              <HeartPulse className="w-4 h-4 text-rose-400" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-bold text-indigo-200">
                Thông Số Khí Máu Hiện Tại:
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs font-bold">
                <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">
                  pH <strong className="text-amber-300">{input.pH}</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">
                  PaCO₂ <strong className="text-blue-300">{input.pCO2}</strong> {input.unit}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">
                  PaO₂ <strong className="text-emerald-300">{input.pO2}</strong> {input.unit}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">
                  HCO₃⁻ <strong className="text-purple-300">{input.hco3}</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">
                  BE <strong>{input.be}</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/10">
                  FiO₂ <strong>{input.fio2}%</strong>
                </span>
                {input.na !== undefined && input.cl !== undefined && (
                  <span className="px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-100 border border-indigo-400/40">
                    AG:{' '}
                    <strong className="text-amber-300">
                      {Math.round((input.na - (input.cl + input.hco3)) * 10) / 10}
                    </strong>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleUnitToggle(input.unit === 'mmHg' ? 'kPa' : 'mmHg')}
              className="px-2.5 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 font-semibold cursor-pointer"
            >
              Đổi sang {input.unit === 'mmHg' ? 'kPa' : 'mmHg'}
            </button>
            <button
              id="btn-expand-inputs"
              onClick={() => setIsInputCollapsed(false)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Mở Bảng Nhập Liệu</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Grid: Left Panel (Input, 4 cols) & Right Panel (Content, 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Compact Parameter Form (4 cols on lg when expanded) */}
        {!isInputCollapsed && (
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 sticky top-3">
              {/* Header & Collapse Button */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center space-x-2">
                  <HeartPulse className="w-4 h-4 text-rose-500" />
                  <h2 className="text-sm font-bold text-slate-900">Thông Số Khí Máu</h2>
                </div>

                <div className="flex items-center space-x-1.5">
                  {/* Unit toggle */}
                  <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200">
                    <button
                      type="button"
                      onClick={() => handleUnitToggle('mmHg')}
                      className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                        input.unit === 'mmHg'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      mmHg
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUnitToggle('kPa')}
                      className={`px-1.5 py-0.5 text-[10px] font-bold rounded ${
                        input.unit === 'kPa'
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      kPa
                    </button>
                  </div>

                  {/* Collapse to prioritize main content */}
                  <button
                    id="btn-collapse-inputs"
                    type="button"
                    onClick={() => setIsInputCollapsed(true)}
                    className="p-1 rounded-md text-slate-500 hover:text-blue-600 hover:bg-slate-100 border border-slate-200 cursor-pointer"
                    title="Thu gọn bảng thông số để nhường toàn bộ màn hình cho kết luận & phác đồ"
                  >
                    <Minimize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sub-tab Selector for Input Sections */}
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveInputTab('core')}
                  className={`flex-1 py-1 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeInputTab === 'core'
                      ? 'bg-white text-blue-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Khí Máu (Core)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveInputTab('labs')}
                  className={`flex-1 py-1 text-center text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center space-x-1 ${
                    activeInputTab === 'labs'
                      ? 'bg-white text-indigo-700 shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>Điện Giải &amp; Labs</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                </button>
              </div>

              {/* TAB 1: CORE BLOOD GAS VALUES */}
              {activeInputTab === 'core' && (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    {/* pH */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700">
                        <span>pH Máu</span>
                        <span className="text-[10px] text-slate-400">7.35-7.45</span>
                      </div>
                      <input
                        id="input-ph"
                        type="number"
                        step="0.01"
                        min="6.5"
                        max="8.0"
                        value={input.pH}
                        onChange={(e) => setInput({ ...input, pH: parseFloat(e.target.value) || 7.4 })}
                        className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                      />
                      <span className="text-[9px] text-slate-500 block">
                        [H⁺]: ~{analysis.calculations.hIonNmol} nmol/L
                      </span>
                    </div>

                    {/* PaCO2 */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700">
                        <span>PaCO₂ ({input.unit})</span>
                        <span className="text-[10px] text-slate-400">
                          {input.unit === 'mmHg' ? '35-45' : '4.7-6.0'}
                        </span>
                      </div>
                      <input
                        id="input-paco2"
                        type="number"
                        step={input.unit === 'kPa' ? '0.1' : '1'}
                        value={input.pCO2}
                        onChange={(e) => setInput({ ...input, pCO2: parseFloat(e.target.value) || 0 })}
                        className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                      />
                      <span className="text-[9px] text-slate-500 block">
                        {input.unit === 'mmHg'
                          ? `${analysis.calculations.paco2Kpa} kPa`
                          : `${analysis.calculations.paco2MmHg} mmHg`}
                      </span>
                    </div>

                    {/* PaO2 */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700">
                        <span>PaO₂ ({input.unit})</span>
                        <span className="text-[10px] text-slate-400">
                          {input.unit === 'mmHg' ? '&gt;80' : '&gt;10.6'}
                        </span>
                      </div>
                      <input
                        id="input-pao2"
                        type="number"
                        step={input.unit === 'kPa' ? '0.1' : '1'}
                        value={input.pO2}
                        onChange={(e) => setInput({ ...input, pO2: parseFloat(e.target.value) || 0 })}
                        className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                      />
                      <span className="text-[9px] text-slate-500 block">
                        {input.unit === 'mmHg'
                          ? `${analysis.calculations.pao2Kpa} kPa`
                          : `${analysis.calculations.pao2MmHg} mmHg`}
                      </span>
                    </div>

                    {/* HCO3- */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700">
                        <span>HCO₃⁻ (mmol/L)</span>
                        <span className="text-[10px] text-slate-400">22-26</span>
                      </div>
                      <input
                        id="input-hco3"
                        type="number"
                        step="0.5"
                        value={input.hco3}
                        onChange={(e) => setInput({ ...input, hco3: parseFloat(e.target.value) || 0 })}
                        className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                      />
                      <span className="text-[9px] text-slate-500 block">Standard Bicarbonate</span>
                    </div>

                    {/* Base Excess */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700">
                        <span>Base Excess (BE)</span>
                        <span className="text-[10px] text-slate-400">-2 đến +2</span>
                      </div>
                      <input
                        id="input-be"
                        type="number"
                        step="0.5"
                        value={input.be}
                        onChange={(e) => setInput({ ...input, be: parseFloat(e.target.value) || 0 })}
                        className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                      />
                      <span className="text-[9px] text-slate-500 block">Kiềm dư / Thiếu hụt</span>
                    </div>

                    {/* SaO2 */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700">
                        <span>SaO₂ (%)</span>
                        <span className="text-[10px] text-slate-400">&gt;95%</span>
                      </div>
                      <input
                        id="input-sao2"
                        type="number"
                        min="0"
                        max="100"
                        value={input.sao2}
                        onChange={(e) => setInput({ ...input, sao2: parseFloat(e.target.value) || 0 })}
                        className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
                      />
                      <span className="text-[9px] text-slate-500 block">Độ bão hòa Oxy</span>
                    </div>
                  </div>

                  {/* FiO2 & Device Selector */}
                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
                      <span>Phân suất Oxy FiO₂ (%)</span>
                      <strong className="text-blue-600">{input.fio2}%</strong>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <input
                        id="input-fio2"
                        type="number"
                        min="21"
                        max="100"
                        value={input.fio2}
                        onChange={(e) => setInput({ ...input, fio2: parseFloat(e.target.value) || 21 })}
                        className="w-16 px-2 py-1 text-xs font-bold text-center rounded-lg border border-slate-300 bg-slate-50/50"
                      />
                      <select
                        aria-label="Chọn thiết bị thở oxy"
                        value={input.fio2}
                        onChange={(e) => handleDeviceChange(parseFloat(e.target.value))}
                        className="flex-1 px-2 py-1 text-[11px] rounded-lg border border-slate-300 bg-white"
                      >
                        <option value={21}>Khí trời (21%)</option>
                        <option value={24}>Gọng mũi 1 L/p (24%)</option>
                        <option value={28}>Gọng mũi 2 L/p / Venturi 28%</option>
                        <option value={32}>Gọng mũi 3 L/p (32%)</option>
                        <option value={40}>Mask 5-6 L/p (40%)</option>
                        <option value={60}>Mask 8-10 L/p (60%)</option>
                        <option value={80}>Mask túi có thở lại (80%)</option>
                        <option value={100}>Thở máy 100% / Mask kín (100%)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ELECTROLYTES & LABS (Calculates AG & Delta) */}
              {activeInputTab === 'labs' && (
                <div className="space-y-2 animate-in fade-in duration-150">
                  <div className="p-2 rounded-lg bg-indigo-50/70 border border-indigo-100 text-[10px] text-indigo-900 leading-tight">
                    * Nhập Na⁺ và Cl⁻ để tự động tính Anion Gap và Tỷ số Delta/Delta ở bảng bên phải.
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {/* Na */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700">
                        <span>Na⁺ (mmol/L)</span>
                        <span className="text-[10px] text-slate-400">135-145</span>
                      </div>
                      <input
                        id="input-na"
                        type="number"
                        value={input.na ?? ''}
                        placeholder="140"
                        onChange={(e) =>
                          setInput({ ...input, na: e.target.value ? parseFloat(e.target.value) : undefined })
                        }
                        className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-slate-50/50"
                      />
                    </div>

                    {/* Cl */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700">
                        <span>Cl⁻ (mmol/L)</span>
                        <span className="text-[10px] text-slate-400">98-106</span>
                      </div>
                      <input
                        id="input-cl"
                        type="number"
                        value={input.cl ?? ''}
                        placeholder="100"
                        onChange={(e) =>
                          setInput({ ...input, cl: e.target.value ? parseFloat(e.target.value) : undefined })
                        }
                        className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-slate-50/50"
                      />
                    </div>

                    {/* K */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700">
                        <span>K⁺ (mmol/L)</span>
                        <span className="text-[10px] text-slate-400">3.5-5.0</span>
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
                        className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-slate-50/50"
                      />
                    </div>

                    {/* Albumin */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700">
                        <span>Albumin (g/dL)</span>
                        <span className="text-[10px] text-slate-400">3.5-5.0</span>
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
                        className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-slate-50/50"
                      />
                    </div>

                    {/* Lactate */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700">
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
                        className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-slate-50/50"
                      />
                    </div>

                    {/* Age */}
                    <div className="space-y-0.5">
                      <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700">
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
                        className="w-full px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-300 bg-slate-50/50"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Reset Button */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setInput(DEFAULT_INPUT)}
                  className="py-1.5 px-2.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center space-x-1 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 text-slate-400" />
                  <span>Đặt lại chuẩn</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsInputCollapsed(true)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                >
                  Thu gọn bảng ↗
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT COLUMN: Primary Diagnostic Content, 6-Step Analysis, Anion Gap Calculator & Treatment */}
        <div className={`${isInputCollapsed ? 'lg:col-span-12' : 'lg:col-span-8'} space-y-5 transition-all`}>
          {/* Quick Section Navigation Jumper */}
          <div className="flex items-center justify-between bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs text-xs font-semibold overflow-x-auto">
            <div className="flex items-center space-x-2 text-slate-600 shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Xem nhanh:</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto">
              <button
                onClick={() => scrollToSection('sec-conclusion')}
                className="px-2.5 py-1 rounded-lg hover:bg-slate-100 text-slate-700 whitespace-nowrap cursor-pointer text-[11px]"
              >
                1. Kết Luận Khí Máu
              </button>
              <button
                onClick={() => scrollToSection('sec-anion-gap')}
                className="px-2.5 py-1 rounded-lg hover:bg-indigo-50 text-indigo-700 font-bold whitespace-nowrap cursor-pointer text-[11px]"
              >
                2. Máy Tính Anion Gap &amp; Delta
              </button>
              <button
                onClick={() => scrollToSection('sec-six-steps')}
                className="px-2.5 py-1 rounded-lg hover:bg-slate-100 text-slate-700 whitespace-nowrap cursor-pointer text-[11px]"
              >
                3. Quy Trình 6 Bước
              </button>
              <button
                onClick={() => scrollToSection('sec-treatment')}
                className="px-2.5 py-1 rounded-lg hover:bg-blue-50 text-blue-700 font-bold whitespace-nowrap cursor-pointer text-[11px]"
              >
                4. Xử Trí Lâm Sàng
              </button>
            </div>
          </div>

          {/* Critical Alert Banner if warnings exist */}
          {analysis.criticalWarnings.length > 0 && (
            <div className="bg-rose-50 border border-rose-300 rounded-2xl p-4 shadow-xs space-y-2 animate-pulse">
              <div className="flex items-center space-x-2 text-rose-800 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>CẢNH BÁO NGUY KỊCH TRÊN KHÍ MÁU:</span>
              </div>
              <ul className="space-y-1 pl-6 list-disc text-xs font-medium text-rose-900">
                {analysis.criticalWarnings.map((warn, i) => (
                  <li key={i}>{warn}</li>
                ))}
              </ul>
            </div>
          )}

          {/* SECTION 1: PRIMARY DIAGNOSTIC CONCLUSION (Figure 22 & 23) */}
          <div id="sec-conclusion" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Stethoscope className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Kết Luận Chẩn Đoán Khí Máu</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopySummary}
                  className="flex items-center space-x-1 text-xs font-semibold text-slate-600 hover:text-blue-600 px-2.5 py-1 bg-slate-100 hover:bg-blue-50 rounded-lg border border-slate-200 transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Đã sao chép!' : 'Sao chép báo cáo'}</span>
                </button>
              </div>
            </div>

            {/* Dual-Axis Primary Diagnosis Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Axis 1: Pulmonary Gas Exchange */}
              <div className="p-4 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 space-y-2 shadow-2xs">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-800">
                  <Wind className="w-4 h-4 text-blue-600" />
                  <span>Trục 1: Trao Đổi Khí Phổi</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {analysis.gasExchange.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {analysis.gasExchange.description}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">
                    P/F = {analysis.calculations.pfRatio}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                    A-a = {analysis.calculations.aaGradient} mmHg
                  </span>
                  {analysis.gasExchange.severity !== 'normal' && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        analysis.gasExchange.severity === 'severe'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      Mức độ: {analysis.gasExchange.severity.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>

              {/* Axis 2: Acid-Base Balance */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50/60 to-teal-50/40 space-y-2 shadow-2xs">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span>Trục 2: Thăng Bằng Toan Kiềm</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {analysis.acidBase.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {analysis.acidBase.description}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-1.5">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      analysis.acidBase.acidaemiaStatus === 'acidaemia'
                        ? 'bg-rose-100 text-rose-800'
                        : analysis.acidBase.acidaemiaStatus === 'alkalaemia'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {analysis.acidBase.acidaemiaStatus === 'acidaemia'
                      ? 'Toan máu (Acidaemia)'
                      : analysis.acidBase.acidaemiaStatus === 'alkalaemia'
                      ? 'Kiềm máu (Alkalaemia)'
                      : 'pH Sinh lý bình thường'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">
                    Bù trừ: {analysis.acidBase.compensation}
                  </span>
                </div>
              </div>
            </div>

            {/* Calculations & Advanced Indices Grid */}
            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Các Chỉ Số Sinh Lý Chuyên Sâu
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {/* [H+] */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="text-[10px] text-slate-500 font-medium">Nồng độ [H⁺]</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {analysis.calculations.hIonNmol}{' '}
                    <span className="text-[10px] font-normal text-slate-500">nmol/L</span>
                  </div>
                  <div className="text-[10px] text-slate-400">Chuẩn: 35 - 45</div>
                </div>

                {/* P/F Ratio */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="text-[10px] text-slate-500 font-medium">Tỉ lệ PaO₂/FiO₂</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {analysis.calculations.pfRatio}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate" title={analysis.calculations.pfClass}>
                    {analysis.calculations.pfClass}
                  </div>
                </div>

                {/* A-a Gradient */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="text-[10px] text-slate-500 font-medium">A-a Gradient</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {analysis.calculations.aaGradient}{' '}
                    <span className="text-[10px] font-normal text-slate-500">mmHg</span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Tuổi dự kiến: ~{analysis.calculations.expectedAaGradient}
                  </div>
                </div>

                {/* PaCO2 Winter compensation */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                  <div className="text-[10px] text-slate-500 font-medium">PaCO₂ Kỳ Vọng (Winter)</div>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">
                    {analysis.calculations.expectedPaco2Winter
                      ? `${analysis.calculations.expectedPaco2Winter.min} - ${analysis.calculations.expectedPaco2Winter.max}`
                      : 'N/A'}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {analysis.calculations.expectedPaco2Winter ? 'Bù trừ toan CH' : 'Áp dụng toan CH'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: AUTOMATED ANION GAP & DELTA/DELTA CALCULATOR */}
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

          {/* SECTION 3: SIX-STEP INTERPRETATION WORKFLOW (Donna Pierre & Ranson) */}
          <div id="sec-six-steps" className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Quy Trình 6 Bước Đọc ABG Chuẩn Y Khoa (Donna Pierre &amp; Ranson)
                </h3>
                <p className="text-xs text-slate-500">Phân tích tuần tự theo từng nấc thang sinh lý học</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {analysis.sixSteps.map((step) => (
                <div
                  key={step.stepNumber}
                  className={`p-3.5 rounded-xl border text-xs space-y-1 transition-all ${
                    step.status === 'danger'
                      ? 'bg-rose-50/60 border-rose-200 text-rose-950'
                      : step.status === 'warning'
                      ? 'bg-amber-50/60 border-amber-200 text-amber-950'
                      : step.status === 'normal'
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-xs text-slate-900">{step.stepName}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/90 border border-slate-200 font-semibold shadow-2xs">
                      {step.finding}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-800">{step.title}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: CLINICAL TREATMENT & MANAGEMENT PROTOCOLS */}
          <div id="sec-treatment" className="bg-white rounded-2xl border border-blue-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center space-x-2">
              <Stethoscope className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="text-base font-bold text-slate-900">Hướng Dẫn Xử Trí Lâm Sàng Toàn Diện</h3>
                <p className="text-xs text-slate-500">Phác đồ hành động chuẩn y khoa dựa trên kết quả khí máu thu được</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-xs font-semibold text-blue-900 leading-relaxed">
              {analysis.treatmentProtocols.summary}
            </div>

            <div className="space-y-3 text-xs">
              {/* Oxygen therapy */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">1. Liệu pháp Oxy:</span>
                <p className="text-slate-700 leading-relaxed">{analysis.treatmentProtocols.oxygenTherapy}</p>
              </div>

              {/* Ventilation support */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">2. Hỗ trợ thông khí (NIV / Thở máy):</span>
                <p className="text-slate-700 leading-relaxed">
                  {analysis.treatmentProtocols.ventilationSupport}
                </p>
              </div>

              {/* Core medical management */}
              {analysis.treatmentProtocols.underlyingManagement.length > 0 && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">3. Điều trị nguyên nhân &amp; Dược lý học:</span>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                    {analysis.treatmentProtocols.underlyingManagement.map((m, idx) => (
                      <li key={idx}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Precautions */}
              {analysis.treatmentProtocols.precautions.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-300 text-amber-900 space-y-1">
                  <span className="font-bold block flex items-center space-x-1 text-amber-950">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
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
              <div className="text-[11px] text-slate-500 italic pt-1">
                * Khuyến nghị giám sát: {analysis.treatmentProtocols.monitoringAdvice}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
