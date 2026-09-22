import React, { useState } from 'react';
import { 
  Activity, 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Zap,
  TrendingUp,
  RefreshCw,
  LineChart as ChartIcon,
  ChevronDown,
  ChevronUp,
  Clock,
  FlaskConical,
  Sliders,
  Sparkles,
  Info
} from 'lucide-react';
import { TdmInput, TdmEvaluationResult, InfusionMethod } from '../types';
import { VancomycinPkChart } from './VancomycinPkChart';

interface TdmCalculatorCardProps {
  tdmInput: TdmInput;
  tdmResult: TdmEvaluationResult;
  regimenMethod: InfusionMethod;
  mic?: number;
  onChange: (updated: Partial<TdmInput>) => void;
  onApplyAdjustment: (newDose: number, newInterval?: number) => void;
}

export const TdmCalculatorCard: React.FC<TdmCalculatorCardProps> = ({
  tdmInput,
  tdmResult,
  regimenMethod,
  mic = 1.0,
  onChange,
  onApplyAdjustment
}) => {
  const isContinuous = regimenMethod === 'continuous';
  const [showChart, setShowChart] = useState(true);

  // Active intermittent calculation method
  const intermittentMethod = tdmInput.intermittentMethod || 'bayesian_single';

  // Sample presets for quick clinical scenarios
  const loadPreset = (type: 'optimal' | 'low' | 'high' | 'random') => {
    if (isContinuous) {
      if (type === 'optimal') {
        onChange({ steadyStateConcentration: 22.0 });
      } else if (type === 'low') {
        onChange({ steadyStateConcentration: 14.5 });
      } else {
        onChange({ steadyStateConcentration: 32.0 });
      }
    } else if (intermittentMethod === 'bayesian_single') {
      if (type === 'optimal') {
        onChange({
          currentDoseMg: 1000,
          currentIntervalHours: 12,
          infusionDurationHours: 1.5,
          singleConcentration: 11.5,
          troughConcentration: 11.5,
          singleSampleType: 'trough',
          singleDoseNumber: 2
        });
      } else if (type === 'low') {
        onChange({
          currentDoseMg: 1000,
          currentIntervalHours: 12,
          infusionDurationHours: 1.5,
          singleConcentration: 6.0,
          troughConcentration: 6.0,
          singleSampleType: 'trough',
          singleDoseNumber: 2
        });
      } else if (type === 'high') {
        onChange({
          currentDoseMg: 1250,
          currentIntervalHours: 12,
          infusionDurationHours: 2.0,
          singleConcentration: 22.0,
          troughConcentration: 22.0,
          singleSampleType: 'trough',
          singleDoseNumber: 2
        });
      } else if (type === 'random') {
        onChange({
          currentDoseMg: 1000,
          currentIntervalHours: 12,
          infusionDurationHours: 1.5,
          singleConcentration: 14.0,
          singleSampleType: 'random',
          singleSampleHoursAfterDose: 18,
          singleDoseNumber: 2
        });
      }
    } else {
      // 2-point PK
      if (type === 'optimal') {
        onChange({
          currentDoseMg: 1000,
          currentIntervalHours: 12,
          infusionDurationHours: 1.5,
          peakConcentration: 28.5,
          peakTimeAfterEndHours: 1.0,
          troughConcentration: 12.0,
          troughTimeBeforeNextHours: 0.5
        });
      } else if (type === 'low') {
        onChange({
          currentDoseMg: 1000,
          currentIntervalHours: 12,
          infusionDurationHours: 1.5,
          peakConcentration: 18.0,
          peakTimeAfterEndHours: 1.0,
          troughConcentration: 6.5,
          troughTimeBeforeNextHours: 0.5
        });
      } else {
        onChange({
          currentDoseMg: 1250,
          currentIntervalHours: 12,
          infusionDurationHours: 2.0,
          peakConcentration: 38.0,
          peakTimeAfterEndHours: 1.0,
          troughConcentration: 21.0,
          troughTimeBeforeNextHours: 0.5
        });
      }
    }
  };

  const getAttainmentColor = (att: string) => {
    switch (att) {
      case 'target':
        return {
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          text: 'text-emerald-700',
          label: 'ĐẠT MỤC TIÊU (400 - 600 mg·h/L)'
        };
      case 'subtherapeutic':
        return {
          bg: 'bg-amber-50 border-amber-200 text-amber-900',
          badge: 'bg-amber-100 text-amber-800 border-amber-300',
          text: 'text-amber-700',
          label: 'DƯỚI MỤC TIÊU (< 400 mg·h/L)'
        };
      case 'supratherapeutic':
      default:
        return {
          bg: 'bg-rose-50 border-rose-200 text-rose-900',
          badge: 'bg-rose-100 text-rose-800 border-rose-300',
          text: 'text-rose-700',
          label: 'VƯỢT NGƯỠNG (> 600 mg·h/L) - NGUY CƠ AKI'
        };
    }
  };

  const statusStyle = getAttainmentColor(tdmResult.targetAttainment);
  const sampleConcentration = tdmInput.singleConcentration ?? tdmInput.troughConcentration ?? '';

  return (
    <div id="tdm-calculator-card" className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5">
      {/* Title & Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              Giám sát Nồng độ Thuốc TDM & Tính AUC24
            </h2>
            <p className="text-xs text-slate-500">
              {isContinuous
                ? 'Phương pháp truyền liên tục: AUC24 = Css × 24 (ASHP 2020)'
                : intermittentMethod === 'bayesian_single'
                ? 'Phần mềm Bayesian: Ước tính AUC24 từ 1 mẫu nồng độ trong 24–48h đầu (ASHP 2020)'
                : 'Mô hình giải tích 2 điểm (Peak - Trough) theo Pai & Rodvold 2014'}
            </p>
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-1 self-start sm:self-auto flex-wrap">
          <span className="text-[11px] text-slate-400 mr-1 hidden sm:inline">Mẫu thử:</span>
          <button
            type="button"
            onClick={() => loadPreset('optimal')}
            className="px-2 py-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-md border border-emerald-200 transition-colors"
          >
            Đạt đích
          </button>
          <button
            type="button"
            onClick={() => loadPreset('low')}
            className="px-2 py-1 text-[11px] font-medium bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-md border border-amber-200 transition-colors"
          >
            Dưới đích
          </button>
          <button
            type="button"
            onClick={() => loadPreset('high')}
            className="px-2 py-1 text-[11px] font-medium bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-md border border-rose-200 transition-colors"
          >
            Nguy cơ AKI
          </button>
          {!isContinuous && intermittentMethod === 'bayesian_single' && (
            <button
              type="button"
              onClick={() => loadPreset('random')}
              className="px-2 py-1 text-[11px] font-medium bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-md border border-sky-200 transition-colors"
            >
              Mẫu bất kỳ (18h)
            </button>
          )}
        </div>
      </div>

      {/* Intermittent Dosing Method Switcher */}
      {!isContinuous && (
        <div className="mb-4 p-2 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-teal-600" />
              Phương pháp phân tích Dược động học (TDM):
            </span>
            <span className="text-[10px] font-semibold text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded-full">
              ASHP/IDSA 2020 Guidelines
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => onChange({ intermittentMethod: 'bayesian_single' })}
              className={`p-2 rounded-lg text-left transition-all border ${
                intermittentMethod === 'bayesian_single'
                  ? 'bg-white border-teal-500 shadow-xs ring-1 ring-teal-500/20'
                  : 'bg-transparent border-transparent hover:bg-slate-200/50 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Phần mềm Bayesian (1 mẫu nồng độ)
                </span>
                <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                  Khuyến cáo ưu tiên
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Lấy 1 mẫu bất kỳ (hoặc đáy) trong 24–48h đầu; tự động ước tính AUC24 & chỉnh liều
              </p>
            </button>

            <button
              type="button"
              onClick={() => onChange({ intermittentMethod: 'two_point' })}
              className={`p-2 rounded-lg text-left transition-all border ${
                intermittentMethod === 'two_point'
                  ? 'bg-white border-teal-500 shadow-xs ring-1 ring-teal-500/20'
                  : 'bg-transparent border-transparent hover:bg-slate-200/50 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <FlaskConical className="w-3 h-3 text-slate-500" />
                  Dược động học 2 điểm (Peak - Trough)
                </span>
                <span className="text-[9px] font-medium px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                  Pai & Rodvold 2014
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Cần 2 mẫu: Đỉnh (sau truyền 1-2h) và Đáy (trước liều kế ≤ 30 phút)
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Input Fields */}
      {isContinuous ? (
        /* Continuous Infusion Input */
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 mb-4">
          <label className="block text-xs font-semibold text-slate-800 mb-1">
            Nồng độ ổn định huyết thanh (Css) khi truyền liên tục (mg/L):
          </label>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <input
                type="number"
                min="1"
                max="100"
                step="0.1"
                value={tdmInput.steadyStateConcentration || ''}
                onChange={(e) => onChange({ steadyStateConcentration: Number(e.target.value) })}
                placeholder="VD: 22.5"
                className="w-full px-3 py-2 text-base font-bold font-mono bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-hidden"
              />
              <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">mg/L</span>
            </div>
            <p className="text-xs text-slate-500">
              Lấy mẫu bất kỳ sau 24 - 48 giờ truyền liên tục không ngắt quãng (Mục tiêu: 20 – 25 mg/L).
            </p>
          </div>
        </div>
      ) : intermittentMethod === 'bayesian_single' ? (
        /* Bayesian 1-Sample Intermittent Input */
        <div className="space-y-3 mb-4">
          {/* Regimen Info Row */}
          <div className="grid grid-cols-3 gap-2.5 p-3 bg-slate-50/70 rounded-xl border border-slate-200/70 text-xs">
            <div>
              <label className="block font-medium text-slate-600 mb-1">Liều đang dùng (mg):</label>
              <input
                type="number"
                step="50"
                value={tdmInput.currentDoseMg || ''}
                onChange={(e) => onChange({ currentDoseMg: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 text-xs font-mono font-semibold bg-white border border-slate-200 rounded-lg outline-hidden"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-600 mb-1">Khoảng cách liều (giờ):</label>
              <select
                value={tdmInput.currentIntervalHours}
                onChange={(e) => onChange({ currentIntervalHours: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg outline-hidden"
              >
                <option value="8">Mỗi 8 giờ (q8h)</option>
                <option value="12">Mỗi 12 giờ (q12h)</option>
                <option value="24">Mỗi 24 giờ (q24h)</option>
                <option value="36">Mỗi 36 giờ (q36h)</option>
                <option value="48">Mỗi 48 giờ (q48h)</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-600 mb-1">Thời gian truyền (giờ):</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="6"
                value={tdmInput.infusionDurationHours || ''}
                onChange={(e) => onChange({ infusionDurationHours: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 text-xs font-mono font-semibold bg-white border border-slate-200 rounded-lg outline-hidden"
              />
            </div>
          </div>

          {/* Bayesian Single Sample Form */}
          <div className="p-3.5 rounded-xl border border-teal-200 bg-teal-50/40 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-teal-200/60">
              <div className="flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4 text-teal-700" />
                <span className="text-xs font-bold text-teal-900">
                  Thông tin mẫu nồng độ duy nhất (Bayesian Sampling)
                </span>
              </div>
              <span className="text-[11px] text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded-md font-medium">
                Trong 24–48 giờ đầu khởi trị
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              {/* Concentration Input */}
              <div className="sm:col-span-4">
                <label className="block text-xs font-bold text-teal-950 mb-1">
                  Nồng độ đo được (C_meas):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="100"
                    value={sampleConcentration}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      onChange({
                        singleConcentration: val,
                        troughConcentration: val
                      });
                    }}
                    placeholder="VD: 11.5"
                    className="w-full px-3 py-2 text-base font-bold font-mono bg-white border border-teal-300 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 outline-hidden"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">mg/L</span>
                </div>
              </div>

              {/* Sample Type Selection */}
              <div className="sm:col-span-4">
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Loại mẫu nồng độ:
                </label>
                <div className="grid grid-cols-2 gap-1 bg-white p-1 rounded-xl border border-teal-200">
                  <button
                    type="button"
                    onClick={() => onChange({ singleSampleType: 'trough' })}
                    className={`py-1.5 px-2 text-xs font-medium rounded-lg text-center transition-all ${
                      (tdmInput.singleSampleType || 'trough') === 'trough'
                        ? 'bg-teal-700 text-white font-bold shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Nồng độ đáy (C_trough)
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ singleSampleType: 'random' })}
                    className={`py-1.5 px-2 text-xs font-medium rounded-lg text-center transition-all ${
                      tdmInput.singleSampleType === 'random'
                        ? 'bg-teal-700 text-white font-bold shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Mẫu bất kỳ / Ngẫu nhiên
                  </button>
                </div>
              </div>

              {/* Timing */}
              <div className="sm:col-span-4">
                {tdmInput.singleSampleType === 'random' ? (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Thời điểm lấy mẫu:
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.5"
                        min="1"
                        max="72"
                        value={tdmInput.singleSampleHoursAfterDose || 18}
                        onChange={(e) => onChange({ singleSampleHoursAfterDose: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 text-xs font-mono font-bold bg-white border border-teal-200 rounded-lg outline-hidden"
                      />
                      <span className="absolute right-2.5 top-2 text-[11px] text-slate-400">giờ sau liều</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Thời điểm lấy mẫu đáy:
                    </label>
                    <div className="p-1.5 bg-white border border-teal-200 rounded-lg text-[11px] text-slate-600 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>Trước liều kế ≤ 30 phút (giờ thứ {(tdmInput.currentIntervalHours || 12) - 0.5})</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Dose timing / treatment phase */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-teal-200/50 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-700">Mẫu thuộc cữ liều:</span>
                <select
                  value={tdmInput.singleDoseNumber || 2}
                  onChange={(e) => onChange({ singleDoseNumber: Number(e.target.value) })}
                  className="px-2 py-1 bg-white border border-teal-200 rounded-md font-medium text-xs text-slate-800"
                >
                  <option value="1">Liều 1 (khởi đầu / sau nạp)</option>
                  <option value="2">Liều 2 (trong 24h đầu - chuẩn ASHP)</option>
                  <option value="3">Liều 3 (khoảng 24–36h)</option>
                  <option value="4">Liều 4+ / Trạng thái ổn định (sau 48h)</option>
                </select>
              </div>

              <div className="flex items-center gap-1 text-[11px] text-teal-800">
                <Info className="w-3.5 h-3.5 shrink-0" />
                <span>ASHP 2020: Phần mềm Bayes cho phép tính AUC24 từ 24h đầu, không cần đợi đạt cân bằng!</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 2-Point Intermittent Input */
        <div className="space-y-3 mb-4">
          {/* Regimen Info Row */}
          <div className="grid grid-cols-3 gap-2.5 p-3 bg-slate-50/70 rounded-xl border border-slate-200/70 text-xs">
            <div>
              <label className="block font-medium text-slate-600 mb-1">Liều đang dùng (mg):</label>
              <input
                type="number"
                step="50"
                value={tdmInput.currentDoseMg || ''}
                onChange={(e) => onChange({ currentDoseMg: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 text-xs font-mono font-semibold bg-white border border-slate-200 rounded-lg outline-hidden"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-600 mb-1">Khoảng cách liều (giờ):</label>
              <select
                value={tdmInput.currentIntervalHours}
                onChange={(e) => onChange({ currentIntervalHours: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg outline-hidden"
              >
                <option value="8">Mỗi 8 giờ (q8h)</option>
                <option value="12">Mỗi 12 giờ (q12h)</option>
                <option value="24">Mỗi 24 giờ (q24h)</option>
                <option value="36">Mỗi 36 giờ (q36h)</option>
                <option value="48">Mỗi 48 giờ (q48h)</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-600 mb-1">Thời gian truyền (giờ):</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="6"
                value={tdmInput.infusionDurationHours || ''}
                onChange={(e) => onChange({ infusionDurationHours: Number(e.target.value) })}
                className="w-full px-2.5 py-1.5 text-xs font-mono font-semibold bg-white border border-slate-200 rounded-lg outline-hidden"
              />
            </div>
          </div>

          {/* 2 Concentrations Samples Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Peak Sample */}
            <div className="p-3 rounded-xl border border-teal-200 bg-teal-50/40">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-teal-900">
                  Nồng độ Đỉnh (C_peak)
                </label>
                <span className="text-[11px] text-teal-700 bg-teal-100/70 px-1.5 py-0.5 rounded">
                  Sau truyền 1 - 2h
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={tdmInput.peakConcentration || ''}
                  onChange={(e) => onChange({ peakConcentration: Number(e.target.value) })}
                  placeholder="VD: 28.5"
                  className="w-full px-3 py-2 text-base font-bold font-mono bg-white border border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-hidden"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">mg/L</span>
              </div>
            </div>

            {/* Trough Sample */}
            <div className="p-3 rounded-xl border border-indigo-200 bg-indigo-50/40">
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-indigo-900">
                  Nồng độ Đáy (C_trough)
                </label>
                <span className="text-[11px] text-indigo-700 bg-indigo-100/70 px-1.5 py-0.5 rounded">
                  Trước liều kế ≤ 30p
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={tdmInput.troughConcentration || ''}
                  onChange={(e) => onChange({ troughConcentration: Number(e.target.value) })}
                  placeholder="VD: 12.0"
                  className="w-full px-3 py-2 text-base font-bold font-mono bg-white border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-hidden"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">mg/L</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Evaluation Results Banner */}
      {tdmResult.auc24 > 0 ? (
        <div className={`p-4 rounded-xl border ${statusStyle.bg} transition-all`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-200/50">
            <div className="flex items-center gap-2">
              <Target className={`w-5 h-5 ${statusStyle.text}`} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-600">
                    Giá trị AUC24 ước tính:
                  </span>
                  {tdmResult.estimationMethod === 'bayesian_single' && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-teal-100 text-teal-800 border border-teal-200">
                      MAP Bayesian (1 mẫu)
                    </span>
                  )}
                  {tdmResult.estimationMethod === 'two_point' && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-200 text-slate-800">
                      Mô hình 2 điểm PK
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black font-mono tracking-tight text-slate-900">
                    {tdmResult.auc24}
                  </span>
                  <span className="text-sm font-semibold text-slate-600">mg·h/L</span>
                  
                  <span className="text-xs font-semibold text-slate-500 ml-1">
                    (AUC24/MIC = <strong className="font-mono text-slate-800 font-bold">{Math.round(tdmResult.auc24 / mic)}</strong>)
                  </span>
                </div>
              </div>
            </div>

            <div className="sm:text-right">
              <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold border ${statusStyle.badge}`}>
                {statusStyle.label}
              </span>
              <p className="text-[11px] text-slate-500 mt-1">
                Khoảng đích an toàn & hiệu quả: <strong>400 – 600 mg·h/L</strong>
              </p>
            </div>
          </div>

          {/* PK Parameters */}
          <div className="py-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs border-b border-slate-200/50">
            {tdmResult.clEstimated && (
              <div>
                <span className="text-slate-500 block">Độ thanh thải CL:</span>
                <strong className="font-mono text-slate-800">
                  {tdmResult.clEstimated} L/h
                  {tdmResult.popCl && (
                    <span className="text-[10px] text-slate-400 font-normal ml-1">
                      (pop: {tdmResult.popCl})
                    </span>
                  )}
                </strong>
              </div>
            )}
            {tdmResult.vdEstimated && (
              <div>
                <span className="text-slate-500 block">Thể tích phân bố Vd:</span>
                <strong className="font-mono text-slate-800">
                  {tdmResult.vdEstimated} L
                  {tdmResult.popVd && (
                    <span className="text-[10px] text-slate-400 font-normal ml-1">
                      (pop: {tdmResult.popVd})
                    </span>
                  )}
                </strong>
              </div>
            )}
            {tdmResult.halfLifeHours && (
              <div>
                <span className="text-slate-500 block">Thời gian bán thải t½:</span>
                <strong className="font-mono text-slate-800">{tdmResult.halfLifeHours} giờ</strong>
              </div>
            )}
            {tdmResult.kel && (
              <div>
                <span className="text-slate-500 block">Tốc độ thải trừ k_el:</span>
                <strong className="font-mono text-slate-800">{tdmResult.kel} h⁻¹</strong>
              </div>
            )}
            {tdmResult.cMaxEstimated && (
              <div>
                <span className="text-slate-500 block">C_max dự kiến (ss):</span>
                <strong className="font-mono text-slate-800">{tdmResult.cMaxEstimated} mg/L</strong>
              </div>
            )}
            {tdmResult.cMinEstimated && (
              <div>
                <span className="text-slate-500 block">C_min dự kiến (ss):</span>
                <strong className="font-mono text-slate-800">{tdmResult.cMinEstimated} mg/L</strong>
              </div>
            )}
          </div>

          {/* Actionable Clinical Recommendation */}
          <div className="pt-3">
            <h4 className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-teal-600" /> Khuyến cáo hiệu chỉnh liều tiếp theo:
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {tdmResult.adjustedDoseRecommendation}
            </p>

            {tdmResult.suggestedDoseMg && (
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => onApplyAdjustment(tdmResult.suggestedDoseMg!, tdmResult.suggestedIntervalHours)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 active:scale-95 rounded-lg transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Áp dụng liều {tdmResult.suggestedDoseMg} mg {tdmResult.suggestedIntervalHours ? `mỗi ${tdmResult.suggestedIntervalHours}h` : ''} vào phác đồ
                </button>
                {tdmResult.predictedAuc24 && (
                  <span className="text-[11px] text-slate-500">
                    (Dự đoán AUC24 mới đạt ~<strong>{tdmResult.predictedAuc24}</strong> mg·h/L)
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-center text-xs text-slate-500">
          Nhập nồng độ đo được để hệ thống Bayesian tự động phân tích dược động học, tính AUC24 và đưa ra khuyến cáo chỉnh liều.
        </div>
      )}

      {/* Toggle Button for Pharmacokinetic Curve Chart */}
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
        <button
          type="button"
          onClick={() => setShowChart(!showChart)}
          className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-teal-50 transition-all cursor-pointer"
        >
          <ChartIcon className="w-3.5 h-3.5" />
          <span>{showChart ? 'Thu gọn biểu đồ nồng độ (AUC/MIC)' : 'Xem biểu đồ nồng độ theo thời gian (AUC/MIC)'}</span>
          {showChart ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
        </button>

        <span className="text-[10px] text-slate-400">
          Mô hình PK D3/Recharts 24h
        </span>
      </div>

      {/* Render Pharmacokinetic Curve Chart */}
      {showChart && (
        <VancomycinPkChart
          tdmInput={tdmInput}
          tdmResult={tdmResult}
          regimenMethod={regimenMethod}
          mic={mic}
        />
      )}
    </div>
  );
};
