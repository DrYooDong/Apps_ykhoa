import React from 'react';
import {
  Calendar,
  Check,
  ClipboardCopy,
  Layers,
  Sparkles,
} from 'lucide-react';
import { DailyTimelinePhase } from '../../lib/dailyTreatmentTimeline.ts';

interface PhaseProgressMiniNavProps {
  timelinePhases: DailyTimelinePhase[];
  activePhaseId?: string;
  onSelectPhase?: (phaseId: string) => void;
  currentCheckedCount: number;
  totalAllOrders: number;
  progressPercent: number;
  onCopyOrderSheet?: () => void;
  copySuccess?: boolean;
}

export const PhaseProgressMiniNav: React.FC<PhaseProgressMiniNavProps> = ({
  timelinePhases,
  activePhaseId,
  onSelectPhase,
  currentCheckedCount,
  totalAllOrders,
  progressPercent,
  onCopyOrderSheet,
  copySuccess = false,
}) => {
  if (!timelinePhases || timelinePhases.length === 0) return null;

  const handleJumpToPhase = (phaseId: string) => {
    onSelectPhase?.(phaseId);
    const el = document.getElementById(`phase-section-${phaseId}`);
    if (el) {
      const headerOffset = 130;
      const elPosition = el.getBoundingClientRect().top;
      const offsetPosition = elPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="sticky top-[58px] z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-y border-slate-200 dark:border-slate-800 px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 shadow-2xs transition-all duration-200">
      {/* Danh sách các Phase buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
          <Calendar className="w-3.5 h-3.5 text-blue-600" />
          <span className="hidden sm:inline">Lộ trình:</span>
        </span>

        {timelinePhases.map((phase, pIdx) => {
          const phaseKey = phase.id || String(pIdx);
          const isActive = activePhaseId === phaseKey;

          return (
            <button
              key={phaseKey}
              type="button"
              onClick={() => handleJumpToPhase(phaseKey)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white shadow-2xs font-bold'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              <span className={`font-mono ${isActive ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`}>
                {phase.dayRange}
              </span>
              <span className="hidden md:inline text-[11px] opacity-90 truncate max-w-[140px]">
                &bull; {phase.phaseName.split('(')[0].trim()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mini Progress & Quick EMR Copy */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-xs">
          <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 hidden sm:inline">
            Y lệnh:
          </span>
          <div className="w-16 sm:w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 rounded-full ${
                progressPercent >= 100
                  ? 'bg-emerald-600'
                  : progressPercent >= 50
                  ? 'bg-blue-600'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="font-mono text-[10.5px] font-bold text-slate-800 dark:text-slate-200">
            {currentCheckedCount}/{totalAllOrders}
          </span>
        </div>

        {onCopyOrderSheet && (
          <button
            type="button"
            onClick={onCopyOrderSheet}
            className={`px-2 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-all cursor-pointer shadow-2xs ${
              copySuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
            }`}
            title="Sao chép nhanh danh sách y lệnh"
          >
            {copySuccess ? <Check className="w-3 h-3" /> : <ClipboardCopy className="w-3 h-3 text-slate-400" />}
            <span className="hidden sm:inline">{copySuccess ? 'Đã chép' : 'Chép EMR'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
