import { useState } from "react";
import { EcgCase, LeadName } from "../types";
import { Sliders, RefreshCw, PlusCircle, Check } from "lucide-react";

interface CustomEcgBuilderProps {
  onApplyCustomCase: (newCase: EcgCase) => void;
  baseCase: EcgCase;
}

export function CustomEcgBuilder({ onApplyCustomCase, baseCase }: CustomEcgBuilderProps) {
  const [heartRate, setHeartRate] = useState<number>(baseCase.metrics.heartRate);
  const [prInterval, setPrInterval] = useState<number>(baseCase.metrics.prInterval || 160);
  const [qrsDuration, setQrsDuration] = useState<number>(baseCase.metrics.qrsDuration);
  const [stElevationV2, setStElevationV2] = useState<number>(baseCase.leadsData.V2.stSegment.elevation);
  const [tAmplitudeV2, setTAmplitudeV2] = useState<number>(baseCase.leadsData.V2.tWave.amp);
  const [rhythmType, setRhythmType] = useState<string>(baseCase.metrics.rhythmType);

  const handleBuildAndApply = () => {
    // Clone baseCase with updated metrics
    const updatedCase: EcgCase = {
      ...baseCase,
      id: `custom-${Date.now()}`,
      title: `ECG Tùy Chỉnh: ${rhythmType} (${heartRate} l/p)`,
      metrics: {
        ...baseCase.metrics,
        heartRate,
        prInterval,
        qrsDuration,
        rhythmType,
      },
      leadsData: {
        ...baseCase.leadsData,
        V2: {
          ...baseCase.leadsData.V2,
          stSegment: {
            ...baseCase.leadsData.V2.stSegment,
            elevation: stElevationV2,
          },
          tWave: {
            ...baseCase.leadsData.V2.tWave,
            amp: tAmplitudeV2,
          },
        },
        V3: {
          ...baseCase.leadsData.V3,
          stSegment: {
            ...baseCase.leadsData.V3.stSegment,
            elevation: stElevationV2 * 0.9,
          },
          tWave: {
            ...baseCase.leadsData.V3.tWave,
            amp: tAmplitudeV2 * 0.9,
          },
        },
      },
    };

    onApplyCustomCase(updatedCase);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-xs">
            <Sliders className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Mô Phỏng &amp; Tinh Chỉnh Thông Số Sóng Điện Tim Thời Gian Thực
            </h3>
            <p className="text-xs text-slate-500">
              Điều chỉnh tần số, khoảng PR, thời gian QRS và độ chênh ST để quan sát biến đổi 12 chuyển đạo
            </p>
          </div>
        </div>

        <button
          onClick={handleBuildAndApply}
          className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Áp Dụng Lên Giấy Điện Tim
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
        <div>
          <label className="font-semibold text-slate-700 block mb-1">
            Tần Số Tim: <span className="font-mono text-rose-600 font-bold">{heartRate} bpm</span>
          </label>
          <input
            type="range"
            min="30"
            max="220"
            step="5"
            value={heartRate}
            onChange={(e) => setHeartRate(parseInt(e.target.value))}
            className="w-full accent-rose-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>30 (Chậm xoang)</span>
            <span>75 (Bình thường)</span>
            <span>220 (Nhanh)</span>
          </div>
        </div>

        <div>
          <label className="font-semibold text-slate-700 block mb-1">
            Khoảng PR/PQ: <span className="font-mono text-slate-900 font-bold">{prInterval} ms</span>
          </label>
          <input
            type="range"
            min="80"
            max="340"
            step="10"
            value={prInterval}
            onChange={(e) => setPrInterval(parseInt(e.target.value))}
            className="w-full accent-indigo-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>80 (WPW/Ngắn)</span>
            <span>160 (Chuẩn)</span>
            <span>340 (BAV I)</span>
          </div>
        </div>

        <div>
          <label className="font-semibold text-slate-700 block mb-1">
            Thời Gian QRS: <span className="font-mono text-slate-900 font-bold">{qrsDuration} ms</span>
          </label>
          <input
            type="range"
            min="60"
            max="180"
            step="10"
            value={qrsDuration}
            onChange={(e) => setQrsDuration(parseInt(e.target.value))}
            className="w-full accent-slate-800"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>60 (Hẹp)</span>
            <span>90 (Bình thường)</span>
            <span>180 (Bloc/VT)</span>
          </div>
        </div>

        <div>
          <label className="font-semibold text-slate-700 block mb-1">
            Độ Chênh ST V2-V3: <span className="font-mono text-rose-600 font-bold">{stElevationV2} mV</span>
          </label>
          <input
            type="range"
            min="-0.4"
            max="1.2"
            step="0.05"
            value={stElevationV2}
            onChange={(e) => setStElevationV2(parseFloat(e.target.value))}
            className="w-full accent-rose-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>-0.4 (Chênh xuống)</span>
            <span>0.0 (Đẳng điện)</span>
            <span>+1.2 (STEMI)</span>
          </div>
        </div>

        <div>
          <label className="font-semibold text-slate-700 block mb-1">
            Biên Độ Sóng T: <span className="font-mono text-slate-900 font-bold">{tAmplitudeV2} mV</span>
          </label>
          <input
            type="range"
            min="-0.8"
            max="1.5"
            step="0.05"
            value={tAmplitudeV2}
            onChange={(e) => setTAmplitudeV2(parseFloat(e.target.value))}
            className="w-full accent-amber-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>-0.8 (T âm sâu)</span>
            <span>+0.3 (Chuẩn)</span>
            <span>+1.5 (T nhọn khổng lồ)</span>
          </div>
        </div>

        <div>
          <label className="font-semibold text-slate-700 block mb-1">
            Kiểu Nhịp:
          </label>
          <select
            value={rhythmType}
            onChange={(e) => setRhythmType(e.target.value)}
            className="w-full rounded border border-slate-300 bg-slate-50 px-2 py-1 text-xs"
          >
            <option value="Nhịp xoang đều">Nhịp xoang đều</option>
            <option value="Rung nhĩ đáp ứng thất nhanh">Rung nhĩ (AFib)</option>
            <option value="Cuồng nhĩ dẫn truyền 2:1">Cuồng nhĩ (Flutter)</option>
            <option value="Nhịp nhanh trên thất kịch phát">Nhịp nhanh trên thất (SVT)</option>
            <option value="Nhịp nhanh thất đơn dạng">Nhịp nhanh thất (VT)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
