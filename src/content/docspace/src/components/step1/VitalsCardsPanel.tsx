import React from 'react';
import { Activity, AlertTriangle, Heart, Thermometer, Wind } from 'lucide-react';
import { VitalsState } from '../../types.ts';

export interface VitalsStatusInfo {
  isTempAbnormal: boolean;
  isPulseAbnormal: boolean;
  isBPAbnormal: boolean;
  isRespAbnormal: boolean;
  isSpo2Abnormal: boolean;
  criticalCount: number;
}

interface VitalsCardsPanelProps {
  vitals: VitalsState;
  setVitals: React.Dispatch<React.SetStateAction<VitalsState>>;
  vitalsStatus: VitalsStatusInfo;
  derivedVitalsList: string[];
}

export const VitalsCardsPanel: React.FC<VitalsCardsPanelProps> = ({
  vitals,
  setVitals,
  vitalsStatus,
  derivedVitalsList,
}) => {
  return (
    <div className="mb-3.5 p-3 bg-slate-50 border border-slate-200 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-blue-600" />
          Thước đo DHST (Dấu hiệu sinh tồn)
        </span>
        <span className="text-[11px] text-slate-500">
          Vượt ngưỡng tham chiếu sẽ tự động suy ra dữ kiện chẩn đoán (⚙)
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 text-xs font-mono-custom">
        {/* Nhiệt độ */}
        <div className="bg-white p-2 border border-slate-200 rounded-md">
          <div className="flex items-center justify-between mb-1">
            <label className="font-sans font-semibold text-slate-700 flex items-center gap-1 text-[11px]">
              <Thermometer className="w-3 h-3 text-red-500" />
              T°C (Nhiệt độ)
            </label>
            <span className="text-[9.5px] text-slate-400 font-sans">36.5–37.5°C</span>
          </div>
          <div className="relative">
            <input
              id="vNhiet"
              type="number"
              step="0.1"
              value={vitals.vNhiet}
              onChange={(e) => setVitals((prev) => ({ ...prev, vNhiet: e.target.value }))}
              placeholder="37.0"
              className={`w-full border rounded p-1.5 text-xs font-bold ${
                vitalsStatus.isTempAbnormal
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
              }`}
            />
            <span className="absolute right-2 top-1.5 text-[10px] text-slate-400">°C</span>
          </div>
        </div>

        {/* Mạch */}
        <div className="bg-white p-2 border border-slate-200 rounded-md">
          <div className="flex items-center justify-between mb-1">
            <label className="font-sans font-semibold text-slate-700 flex items-center gap-1 text-[11px]">
              <Heart className="w-3 h-3 text-rose-500" />
              M (Mạch)
            </label>
            <span className="text-[9.5px] text-slate-400 font-sans">60–90 bpm</span>
          </div>
          <div className="relative">
            <input
              id="vMach"
              type="number"
              value={vitals.vMach}
              onChange={(e) => setVitals((prev) => ({ ...prev, vMach: e.target.value }))}
              placeholder="76"
              className={`w-full border rounded p-1.5 text-xs font-bold ${
                vitalsStatus.isPulseAbnormal
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
              }`}
            />
            <span className="absolute right-2 top-1.5 text-[10px] text-slate-400">l/p</span>
          </div>
        </div>

        {/* Huyết áp */}
        <div className="bg-white p-2 border border-slate-200 rounded-md">
          <div className="flex items-center justify-between mb-1">
            <label className="font-sans font-semibold text-slate-700 flex items-center gap-1 text-[11px]">
              <Activity className="w-3 h-3 text-blue-500" />
              HA (Huyết áp)
            </label>
            <span className="text-[9.5px] text-slate-400 font-sans">120/80</span>
          </div>
          <div className="flex items-center gap-1">
            <input
              id="vHATT"
              type="number"
              value={vitals.vHATT}
              onChange={(e) => setVitals((prev) => ({ ...prev, vHATT: e.target.value }))}
              placeholder="120"
              title="HA tâm thu (bình thường 90-139)"
              className={`w-full border rounded p-1.5 text-xs font-bold text-center ${
                vitalsStatus.isBPAbnormal
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
              }`}
            />
            <span className="text-slate-400 font-bold">/</span>
            <input
              id="vHATTr"
              type="number"
              value={vitals.vHATTr}
              onChange={(e) => setVitals((prev) => ({ ...prev, vHATTr: e.target.value }))}
              placeholder="80"
              title="HA tâm trương (bình thường 60-89)"
              className="w-full border border-slate-200 bg-slate-50 focus:bg-white rounded p-1.5 text-xs font-bold text-center text-slate-800"
            />
          </div>
        </div>

        {/* Nhịp thở */}
        <div className="bg-white p-2 border border-slate-200 rounded-md">
          <div className="flex items-center justify-between mb-1">
            <label className="font-sans font-semibold text-slate-700 flex items-center gap-1 text-[11px]">
              <Wind className="w-3 h-3 text-cyan-500" />
              NT (Nhịp thở)
            </label>
            <span className="text-[9.5px] text-slate-400 font-sans">12–20 l/p</span>
          </div>
          <div className="relative">
            <input
              id="vTho"
              type="number"
              value={vitals.vTho}
              onChange={(e) => setVitals((prev) => ({ ...prev, vTho: e.target.value }))}
              placeholder="16"
              className={`w-full border rounded p-1.5 text-xs font-bold ${
                vitalsStatus.isRespAbnormal
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
              }`}
            />
            <span className="absolute right-2 top-1.5 text-[10px] text-slate-400">l/p</span>
          </div>
        </div>

        {/* SpO2 */}
        <div className="bg-white p-2 border border-slate-200 rounded-md">
          <div className="flex items-center justify-between mb-1">
            <label className="font-sans font-semibold text-slate-700 flex items-center gap-1 text-[11px]">
              <Activity className="w-3 h-3 text-indigo-500" />
              SpO₂
            </label>
            <span className="text-[9.5px] text-slate-400 font-sans">≥ 95%</span>
          </div>
          <div className="relative">
            <input
              id="vSpo2"
              type="number"
              value={vitals.vSpo2}
              onChange={(e) => setVitals((prev) => ({ ...prev, vSpo2: e.target.value }))}
              placeholder="98"
              className={`w-full border rounded p-1.5 text-xs font-bold ${
                vitalsStatus.isSpo2Abnormal
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-slate-200 bg-slate-50 focus:bg-white text-slate-800'
              }`}
            />
            <span className="absolute right-2 top-1.5 text-[10px] text-slate-400">%</span>
          </div>
        </div>
      </div>

      {/* Auto-derived vitals badges */}
      {derivedVitalsList.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mt-2 pt-2 border-t border-slate-200">
          <span className="text-[11px] font-sans font-semibold text-blue-900">
            Dữ kiện suy luận được kích hoạt:
          </span>
          {derivedVitalsList.map((badge, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded text-[11px] font-mono-custom bg-blue-100/70 text-blue-800 border border-blue-300 font-semibold"
            >
              ⚙ {badge}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
