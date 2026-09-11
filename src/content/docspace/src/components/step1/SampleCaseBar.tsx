import React, { useState } from 'react';
import { Sparkles, RefreshCw, Check, Stethoscope } from 'lucide-react';
import { SAMPLE_CASES, SampleCase } from '../../data/seedData.ts';

interface SampleCaseBarProps {
  onLoadSample: (sample: SampleCase) => void;
  onReset?: () => void;
  className?: string;
}

export const SampleCaseBar: React.FC<SampleCaseBarProps> = ({
  onLoadSample,
  onReset,
  className = '',
}) => {
  const [activeCaseIdx, setActiveCaseIdx] = useState<number | null>(null);

  const handleSelectCase = (sample: SampleCase, idx: number) => {
    setActiveCaseIdx(idx);
    onLoadSample(sample);
    setTimeout(() => setActiveCaseIdx(null), 1500);
  };

  return (
    <div
      id="sample-cases-bar"
      className={`bg-white border border-slate-200/90 rounded-lg p-2.5 px-3 shadow-2xs flex flex-wrap items-center justify-between gap-2.5 transition-all ${className}`}
    >
      {/* Label with icon */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded-md flex items-center justify-center bg-blue-50 text-blue-600 border border-blue-200">
          <Stethoscope className="w-3 h-3" />
        </div>
        <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
          Ca bệnh mẫu:
        </span>
        <span className="text-[11px] text-slate-400 hidden lg:inline">
          (Nạp nhanh dữ kiện lâm sàng thực tế để trải nghiệm mô phỏng)
        </span>
      </div>

      {/* List of sample case chips or Empty Notice */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {SAMPLE_CASES.length === 0 ? (
          <div className="flex items-center gap-2 text-xs text-slate-500 py-0.5">
            <span className="italic text-slate-400">Chưa nạp ca mẫu — Bạn có thể tự nhập ca lâm sàng bên dưới</span>
          </div>
        ) : (
          SAMPLE_CASES.map((sample, idx) => {
            const isSelected = activeCaseIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectCase(sample, idx)}
                title={`${sample.ten}: ${sample.form.lyDo || ''}`}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs scale-102'
                    : 'bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border-slate-200 hover:border-blue-300'
                }`}
              >
                {isSelected ? (
                  <Check className="w-3 h-3 text-white shrink-0" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                )}
                <span className="font-semibold">{sample.ten}</span>
                <span
                  className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                    isSelected
                      ? 'bg-blue-700/50 text-blue-100'
                      : 'bg-slate-200/70 text-slate-600'
                  }`}
                >
                  {sample.sel.length} tc
                </span>
              </button>
            );
          })
        )}

        {/* Reset / Clear Button */}
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            title="Xóa trắng form dữ kiện để nhập ca mới"
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-md transition-colors cursor-pointer ml-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Xóa trắng form</span>
          </button>
        )}
      </div>
    </div>
  );
};
