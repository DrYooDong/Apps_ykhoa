import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
  CartesianGrid
} from 'recharts';
import { TdmEvaluationResult, TdmInput, InfusionMethod } from '../types';
import { Activity, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';

interface VancomycinPkChartProps {
  tdmInput: TdmInput;
  tdmResult: TdmEvaluationResult;
  regimenMethod: InfusionMethod;
  mic?: number;
}

export const VancomycinPkChart: React.FC<VancomycinPkChartProps> = ({
  tdmInput,
  tdmResult,
  regimenMethod,
  mic = 1.0
}) => {
  const isContinuous = regimenMethod === 'continuous';

  // Generate 24-hour pharmacokinetic simulation curve data points
  const chartData = useMemo(() => {
    const data: {
      time: number;
      timeLabel: string;
      conc: number;
      targetMin: number;
      targetMax: number;
      isPeak?: boolean;
      isTrough?: boolean;
    }[] = [];

    if (isContinuous) {
      // Continuous Infusion: Reaches steady state Css
      const css = tdmInput.steadyStateConcentration || 22.0;
      const kel = tdmResult.kel || 0.05; // default ~14h half-life if not known

      // 24 hours of steady or near-steady curve
      for (let t = 0; t <= 24; t += 0.5) {
        // Assume patient was already started or starting infusion
        // If at steady state, conc ~ css with small random fluctuation or smooth approach
        const conc = Number((css * (1 - 0.15 * Math.exp(-kel * t))).toFixed(1));
        data.push({
          time: t,
          timeLabel: `${t}h`,
          conc,
          targetMin: 20,
          targetMax: 25
        });
      }
    } else {
      // Intermittent Infusion (IIV)
      const dose = tdmInput.currentDoseMg || 1000;
      const tau = tdmInput.currentIntervalHours || 12; // dosing interval (8, 12, 24)
      const tinf = tdmInput.infusionDurationHours || 1.5;
      const kel = tdmResult.kel || 0.058; // default kel (~12h half-life)
      const cMax = tdmResult.cMaxEstimated || 32.0;
      const cMin = tdmResult.cMinEstimated || 11.5;

      const numDosesIn24h = Math.ceil(24 / tau);

      for (let t = 0; t <= 24; t += 0.5) {
        // cycle time within each dosing interval
        const tCycle = t % tau;
        let conc = cMin;

        if (tCycle <= tinf) {
          // During infusion: rising curve from cMin to cMax
          const progress = tinf > 0 ? tCycle / tinf : 1;
          conc = cMin + (cMax - cMin) * Math.sin((progress * Math.PI) / 2);
        } else {
          // After infusion: exponential elimination
          const tElim = tCycle - tinf;
          conc = cMax * Math.exp(-kel * tElim);
        }

        const pointConc = Math.max(0, Number(conc.toFixed(1)));
        
        // Check if this time aligns with peak or trough sample
        const isPeak = Math.abs(tCycle - (tinf + (tdmInput.peakTimeAfterEndHours || 1))) < 0.3;
        const isTrough = Math.abs(tCycle - (tau - (tdmInput.troughTimeBeforeNextHours || 0.5))) < 0.3;

        data.push({
          time: t,
          timeLabel: `${t}h`,
          conc: pointConc,
          targetMin: 10,
          targetMax: 15,
          isPeak,
          isTrough
        });
      }
    }

    return data;
  }, [tdmInput, tdmResult, isContinuous]);

  const aucValue = tdmResult.auc24 > 0 ? tdmResult.auc24 : (isContinuous ? (tdmInput.steadyStateConcentration || 22) * 24 : 480);
  const aucMicRatio = Number((aucValue / mic).toFixed(0));

  // Determine attainment badge
  const isTarget = aucMicRatio >= 400 && aucMicRatio <= 600;
  const isLow = aucMicRatio < 400;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-3.5 sm:p-4 mt-3">
      {/* Chart Header & Clinical Target Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 mb-2.5 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <Activity className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              Đường cong Dược động học & Diện tích dưới đường cong (AUC/MIC)
            </h3>
            <p className="text-[11px] text-slate-500">
              Mô phỏng nồng độ vancomycin 24 giờ dựa trên thông số TDM thực tế
            </p>
          </div>
        </div>

        {/* Dynamic AUC/MIC Clinical Target Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-baseline gap-1 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg">
            <span className="text-[10px] text-slate-500 font-medium">AUC24/MIC:</span>
            <span className="text-xs font-bold font-mono text-slate-900">{aucMicRatio}</span>
            <span className="text-[9px] text-slate-400">mg·h/L</span>
          </div>

          <span
            className={`px-2 py-0.5 rounded-md text-[10px] font-bold border tracking-tight ${
              isTarget
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                : isLow
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-rose-50 text-rose-700 border-rose-300'
            }`}
          >
            {isTarget ? '✓ ĐẠT ĐÍCH (400 - 600)' : isLow ? '⚠️ DƯỚI ĐÍCH (<400)' : '⛔ VƯỢT ĐÍCH (>600)'}
          </span>
        </div>
      </div>

      {/* Visual PK/PD Graph */}
      <div className="w-full h-52 sm:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
            <defs>
              {/* Teal Gradient under Curve */}
              <linearGradient id="concGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0d9488" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />

            <XAxis
              dataKey="time"
              unit="h"
              stroke="#94a3b8"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              domain={[0, 24]}
              ticks={[0, 4, 8, 12, 16, 20, 24]}
            />

            <YAxis
              stroke="#94a3b8"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              domain={[0, isContinuous ? 35 : 45]}
              unit=" mg/L"
            />

            {/* Shaded Target Zone (AUC therapeutic window) */}
            {isContinuous ? (
              <ReferenceArea
                y1={20}
                y2={25}
                fill="#10b981"
                fillOpacity={0.12}
                stroke="#10b981"
                strokeDasharray="2 2"
                strokeOpacity={0.4}
              />
            ) : (
              <ReferenceArea
                y1={10}
                y2={15}
                fill="#10b981"
                fillOpacity={0.08}
                stroke="#10b981"
                strokeDasharray="2 2"
                strokeOpacity={0.3}
              />
            )}

            {/* Nephrotoxicity Alert Threshold Line */}
            <ReferenceLine
              y={isContinuous ? 25 : 20}
              stroke="#f43f5e"
              strokeDasharray="3 3"
              strokeWidth={1.5}
              label={{
                value: isContinuous ? 'Ngưỡng độc tính >25' : 'Ngưỡng nguy cơ AKI >20',
                position: 'insideTopRight',
                fill: '#e11d48',
                fontSize: 9,
                fontWeight: 600
              }}
            />

            {/* Minimum Effective Trough Threshold Line */}
            <ReferenceLine
              y={10}
              stroke="#0284c7"
              strokeDasharray="2 2"
              strokeWidth={1}
              label={{
                value: 'Đích tối thiểu Cmin 10 mg/L',
                position: 'insideBottomRight',
                fill: '#0284c7',
                fontSize: 9
              }}
            />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-slate-900/90 text-white p-2 rounded-lg text-[10px] shadow-lg border border-slate-700 font-sans">
                      <p className="font-semibold text-teal-300">Thời điểm: {data.time} giờ</p>
                      <p className="font-mono text-xs font-bold text-white mt-0.5">
                        Nồng độ: {data.conc} mg/L
                      </p>
                      <p className="text-slate-400 mt-0.5">
                        {isContinuous
                          ? 'Mục tiêu Css: 20 - 25 mg/L'
                          : 'Đích C_trough an toàn: 10 - 15 mg/L'}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Area
              type="monotone"
              dataKey="conc"
              stroke="#0d9488"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#concGradient)"
              isAnimationActive={true}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Clinical Interpretation Footer */}
      <div className="mt-2 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500/20 border border-emerald-500"></span>
            Khoảng nồng độ mục tiêu
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-0.5 bg-rose-500"></span>
            Ngưỡng độc thận
          </span>
        </div>

        <span className="text-slate-400 italic">
          * Diện tích tô màu phản ánh tích phân AUC24 (Mục tiêu 400 – 600 mg·h/L)
        </span>
      </div>
    </div>
  );
};
