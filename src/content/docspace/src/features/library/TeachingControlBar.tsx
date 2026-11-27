import React from 'react';
import { Eye, EyeOff, Pause, Play, Presentation, RotateCcw, Timer, Type } from 'lucide-react';
import { TeachingModeState } from '../../schemas/docspaceV2.ts';

interface TeachingControlBarProps {
  state: TeachingModeState;
  onSetFontScale: (scale: TeachingModeState['projectorFontScale']) => void;
  onToggleMask: (col: keyof TeachingModeState['maskedColumns']) => void;
  onRevealAll: () => void;
  onResetMasks: () => void;
  onSetTimerPreset: (minutes: number) => void;
  onToggleTimer: () => void;
}

export const TeachingControlBar: React.FC<TeachingControlBarProps> = ({
  state,
  onSetFontScale,
  onToggleMask,
  onRevealAll,
  onResetMasks,
  onSetTimerPreset,
  onToggleTimer,
}) => {
  const mins = Math.floor(state.timerSecondsLeft / 60);
  const secs = state.timerSecondsLeft % 60;
  const timeText = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return (
    <div className="bg-indigo-950 text-indigo-50 border border-indigo-800 rounded-xl px-3.5 py-2.5 shadow-sm flex flex-wrap items-center justify-between gap-3 no-print">
      <div className="flex items-center gap-2 text-xs font-bold">
        <Presentation className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="uppercase tracking-wider text-amber-300">Chế độ Giảng dạy</span>
      </div>

      {/* S-O-A-P Reveal Controls */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-[11px] text-indigo-300 mr-1">Ẩn/Hiện cột SOAP:</span>
        {(['s', 'o', 'a', 'p'] as const).map((col) => {
          const masked = state.maskedColumns[col];
          return (
            <button
              key={col}
              type="button"
              onClick={() => onToggleMask(col)}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border font-bold uppercase cursor-pointer ${
                masked
                  ? 'bg-indigo-900/70 border-indigo-700 text-indigo-300'
                  : 'bg-emerald-600 border-emerald-500 text-white'
              }`}
            >
              {masked ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              {col}
            </button>
          );
        })}
        <button
          type="button"
          onClick={onRevealAll}
          className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-[11px] font-semibold cursor-pointer"
        >
          Mở hết
        </button>
        <button
          type="button"
          onClick={onResetMasks}
          className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-[11px] font-semibold cursor-pointer"
          title="Che lại A và P để bắt đầu hỏi lớp"
        >
          Che A-P
        </button>
      </div>

      {/* Font Scale & Discussion Timer */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <div className="inline-flex items-center bg-indigo-900/80 rounded-lg p-0.5 border border-indigo-700">
          <Type className="w-3.5 h-3.5 text-indigo-300 mx-1.5" />
          {(['normal', 'large', 'xlarge'] as const).map((sc) => (
            <button
              key={sc}
              type="button"
              onClick={() => onSetFontScale(sc)}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                state.projectorFontScale === sc
                  ? 'bg-amber-400 text-slate-950'
                  : 'text-indigo-200 hover:text-white'
              }`}
            >
              {sc === 'normal' ? 'Chuẩn' : sc === 'large' ? 'Lớn' : 'Chiếu'}
            </button>
          ))}
        </div>

        <div className="inline-flex items-center gap-1.5 bg-indigo-900/80 border border-indigo-700 rounded-lg px-2 py-1">
          <Timer className="w-3.5 h-3.5 text-amber-400" />
          <span
            className={`font-mono-custom font-bold ${
              state.timerSecondsLeft <= 30 && state.timerSecondsLeft > 0
                ? 'text-rose-400 animate-pulse'
                : 'text-white'
            }`}
          >
            {timeText}
          </span>
          <button
            type="button"
            onClick={onToggleTimer}
            className="p-1 rounded bg-white/10 hover:bg-white/20 cursor-pointer"
            aria-label={state.timerRunning ? 'Tạm dừng đồng hồ' : 'Chạy đồng hồ thảo luận'}
          >
            {state.timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
          {[3, 5, 10].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onSetTimerPreset(m)}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                state.timerPresetMinutes === m ? 'bg-indigo-600 text-white' : 'text-indigo-300 hover:text-white'
              }`}
            >
              {m}p
            </button>
          ))}
          <button
            type="button"
            onClick={() => onSetTimerPreset(state.timerPresetMinutes)}
            className="p-1 text-indigo-300 hover:text-white cursor-pointer"
            title="Đặt lại đồng hồ"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
