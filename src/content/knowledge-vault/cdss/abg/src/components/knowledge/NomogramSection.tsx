import React, { useState } from 'react';
import { GitFork, Sparkles, ArrowRight } from 'lucide-react';
import { ABGInput } from '../../types/abg';

interface NomogramSectionProps {
  onLoadPresetToAnalyzer?: (input: ABGInput) => void;
}

export const NomogramSection: React.FC<NomogramSectionProps> = ({ onLoadPresetToAnalyzer }) => {
  const [nomogramPco2, setNomogramPco2] = useState<number>(40);
  const [nomogramPh, setNomogramPh] = useState<number>(7.40);

  // Derive [H+] from pH: [H+] = 10^(9-pH) nmol/L
  const currentH = Math.round(Math.pow(10, 9 - nomogramPh));

  // Determine which nomogram zone the point falls into
  const getNomogramZone = (pco2: number, ph: number) => {
    if (ph >= 7.35 && ph <= 7.45 && pco2 >= 35 && pco2 <= 45) {
      return { name: 'Vùng Bình Thường (Normal Buffer Line)', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    }
    if (ph < 7.35 && pco2 > 45) {
      return { name: 'Toan Hô Hấp (Cấp tính hoặc Mạn tính)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    }
    if (ph < 7.35 && pco2 <= 45) {
      return { name: 'Toan Chuyển Hóa (Metabolic Acidosis)', color: 'text-rose-700 bg-rose-50 border-rose-200' };
    }
    if (ph > 7.45 && pco2 < 35) {
      return { name: 'Kiềm Hô Hấp (Respiratory Alkalosis)', color: 'text-blue-700 bg-blue-50 border-blue-200' };
    }
    if (ph > 7.45 && pco2 >= 35) {
      return { name: 'Kiềm Chuyển Hóa (Metabolic Alkalosis)', color: 'text-purple-700 bg-purple-50 border-purple-200' };
    }
    return { name: 'Rối loạn hỗn hợp phức tạp (Mixed Acid-Base Disorder)', color: 'text-slate-800 bg-slate-100 border-slate-300' };
  };

  const currentZone = getNomogramZone(nomogramPco2, nomogramPh);

  // Approximate Henderson-Hasselbalch HCO3- calculation
  // [H+] = 24 * (PaCO2 / HCO3-) => HCO3- = 24 * PaCO2 / [H+]
  const approxHco3 = Math.round((24 * nomogramPco2) / Math.max(10, currentH));

  const handleSimulateInAnalyzer = () => {
    if (!onLoadPresetToAnalyzer) return;

    const simulatedInput: ABGInput = {
      unit: 'mmHg',
      pH: nomogramPh,
      pCO2: nomogramPco2,
      pO2: 85,
      hco3: approxHco3,
      be: Math.round(approxHco3 - 24),
      sao2: 96,
      fio2: 21,
      na: 140,
      k: 4.0,
      cl: 104,
      lactate: 1.0,
    };

    onLoadPresetToAnalyzer(simulatedInput);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <GitFork className="w-5 h-5 text-indigo-600" />
            <span>Biểu Đồ Nomogram Thăng Bằng Toan Kiềm Tương Tác (Hình 16)</span>
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            Mô phỏng Nomogram Hennessey &amp; Janson (2007) xác định dải dung sai bù trừ 95% và phát hiện rối loạn toan kiềm kép.
          </p>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full">
          Mô Hình 2 Chiều
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input sliders (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Thử Nghiệm Tọa Độ Bệnh Nhân
          </h3>

          {/* pH slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <label htmlFor="slider-ph" className="text-slate-700">
                pH Máu:
              </label>
              <span className="text-blue-600 font-bold">{nomogramPh.toFixed(2)}</span>
            </div>
            <input
              id="slider-ph"
              type="range"
              min="6.9"
              max="7.7"
              step="0.01"
              value={nomogramPh}
              onChange={(e) => setNomogramPh(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="text-[11px] text-slate-500">
              Tương đương [H⁺] = <strong className="text-slate-800">{currentH} nmol/L</strong>
            </div>
          </div>

          {/* PaCO2 slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <label htmlFor="slider-paco2" className="text-slate-700">
                PaCO₂ (mmHg):
              </label>
              <span className="text-blue-600 font-bold">{nomogramPco2} mmHg</span>
            </div>
            <input
              id="slider-paco2"
              type="range"
              min="10"
              max="100"
              step="1"
              value={nomogramPco2}
              onChange={(e) => setNomogramPco2(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="text-[11px] text-slate-500">
              Tương đương: <strong className="text-slate-800">{(nomogramPco2 / 7.5).toFixed(1)} kPa</strong> | Ước tính HCO₃⁻ ≈ <strong className="text-slate-800">{approxHco3} mmol/L</strong>
            </div>
          </div>

          {/* Zone Result */}
          <div className={`p-3.5 rounded-xl border text-xs font-semibold ${currentZone.color}`}>
            <div className="text-[10px] uppercase tracking-wider mb-0.5">Vị Trí Rơi Vào:</div>
            <div className="text-sm font-bold">{currentZone.name}</div>
          </div>

          {onLoadPresetToAnalyzer && (
            <button
              id="btn-simulate-nomogram"
              onClick={handleSimulateInAnalyzer}
              className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-xs cursor-pointer active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              <span>Đưa Tọa Độ Vào Bộ Phân Tích</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right: Visual Canvas Nomogram Representation (8 cols) */}
        <div className="lg:col-span-8 p-5 rounded-xl border border-slate-200 bg-white space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700">Sơ đồ không gian các dải bù trừ 95%</span>
            <span>Trục hoành: PaCO₂ (mmHg) | Trục tung: [H⁺] / pH</span>
          </div>

          {/* Graphical Nomogram Visual Grid */}
          <div className="relative w-full h-80 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden p-4 select-none">
            {/* Axes Labels */}
            <div className="absolute top-2 left-2 text-[10px] font-bold text-slate-500">
              ↑ Toan ([H⁺] cao, pH &lt; 7.35)
            </div>
            <div className="absolute bottom-2 left-2 text-[10px] font-bold text-slate-500">
              ↓ Kiềm ([H⁺] thấp, pH &gt; 7.45)
            </div>
            <div className="absolute bottom-2 right-4 text-[10px] font-bold text-slate-500">
              PaCO₂ tăng →
            </div>

            {/* Normal Box */}
            <div className="absolute left-[35%] bottom-[45%] w-[12%] h-[15%] rounded-md bg-emerald-200/60 border border-emerald-500 flex items-center justify-center text-[10px] font-bold text-emerald-800 pointer-events-none shadow-xs">
              Bình Thường
            </div>

            {/* Acute Respiratory Acidosis Band */}
            <div className="absolute left-[45%] bottom-[30%] w-[35%] h-[35%] rounded-2xl bg-amber-200/40 border border-dashed border-amber-500 rotate-12 flex items-center justify-center text-[10px] font-bold text-amber-900 pointer-events-none">
              Toan Hô Hấp Cấp
            </div>

            {/* Metabolic Acidosis Band */}
            <div className="absolute left-[15%] top-[15%] w-[25%] h-[40%] rounded-2xl bg-rose-200/40 border border-dashed border-rose-500 -rotate-12 flex items-center justify-center text-[10px] font-bold text-rose-900 pointer-events-none">
              Toan Chuyển Hóa
            </div>

            {/* Respiratory Alkalosis Band */}
            <div className="absolute left-[15%] bottom-[10%] w-[30%] h-[25%] rounded-2xl bg-blue-200/40 border border-dashed border-blue-500 rotate-6 flex items-center justify-center text-[10px] font-bold text-blue-900 pointer-events-none">
              Kiềm Hô Hấp Cấp
            </div>

            {/* Patient Dynamic Coordinate Pin */}
            <div
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-200 flex flex-col items-center pointer-events-none"
              style={{
                left: `${Math.min(92, Math.max(8, ((nomogramPco2 - 10) / 90) * 100))}%`,
                top: `${Math.min(90, Math.max(10, ((nomogramPh - 6.9) / 0.8) * 100))}%`,
              }}
            >
              <div className="w-4 h-4 rounded-full bg-red-600 border-2 border-white shadow-md animate-ping absolute" />
              <div className="w-4 h-4 rounded-full bg-red-600 border-2 border-white shadow-md relative" />
              <div className="px-1.5 py-0.5 rounded bg-slate-900 text-white text-[9px] font-bold shadow-xs whitespace-nowrap mt-1">
                pH {nomogramPh.toFixed(2)} | {nomogramPco2} mmHg
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-600 bg-indigo-50/60 p-3.5 rounded-xl border border-indigo-100 flex items-start space-x-2">
            <span className="text-indigo-600 font-bold">💡 Ý nghĩa lâm sàng:</span>
            <span>
              Nếu tọa độ điểm của bệnh nhân nằm <strong>ngoài các dải giới hạn màu</strong>, bệnh nhân chắc chắn có <strong>rối loạn toan kiềm hỗn hợp phức tạp</strong> (ví dụ: Toan chuyển hóa kèm Toan hô hấp đồng thời ở bệnh nhân suy tim ứ huyết + phù phổi).
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
