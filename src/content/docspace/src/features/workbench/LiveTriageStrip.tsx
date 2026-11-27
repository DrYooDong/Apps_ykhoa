import React, { useState } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  HeartPulse,
  ShieldCheck,
} from 'lucide-react';
import { TriageSummaryV2 } from '../../schemas/docspaceV2.ts';

interface LiveTriageStripProps {
  triage: TriageSummaryV2;
}

const URGENCY_STYLES: Record<
  TriageSummaryV2['urgency'],
  { bar: string; badge: string; icon: string }
> = {
  CRITICAL: {
    bar: 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100',
    badge: 'bg-rose-600 text-white',
    icon: 'text-rose-600 dark:text-rose-400',
  },
  HIGH: {
    bar: 'bg-orange-50 dark:bg-orange-950/40 border-orange-300 dark:border-orange-800 text-orange-950 dark:text-orange-100',
    badge: 'bg-orange-600 text-white',
    icon: 'text-orange-600 dark:text-orange-400',
  },
  MEDIUM: {
    bar: 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100',
    badge: 'bg-amber-600 text-white',
    icon: 'text-amber-600 dark:text-amber-400',
  },
  LOW: {
    bar: 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/70 text-emerald-950 dark:text-emerald-100',
    badge: 'bg-emerald-600 text-white',
    icon: 'text-emerald-600 dark:text-emerald-400',
  },
};

export const LiveTriageStrip: React.FC<LiveTriageStripProps> = ({ triage }) => {
  const [expanded, setExpanded] = useState(false);
  const style = URGENCY_STYLES[triage.urgency];
  const hasAlerts = triage.redFlags.length > 0 || triage.panicLabs.length > 0;

  return (
    <section
      aria-label="Thanh đánh giá sinh hiệu và cờ đỏ cấp cứu"
      className={`rounded-xl border px-3.5 py-2.5 transition-all ${style.bar}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {triage.urgency === 'CRITICAL' ? (
            <AlertOctagon className={`w-4 h-4 shrink-0 ${style.icon}`} />
          ) : triage.urgency === 'LOW' ? (
            <ShieldCheck className={`w-4 h-4 shrink-0 ${style.icon}`} />
          ) : (
            <AlertTriangle className={`w-4 h-4 shrink-0 ${style.icon}`} />
          )}
          <span
            className={`px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wide shrink-0 ${style.badge}`}
          >
            ESI {triage.esiLevel} · {triage.urgency}
          </span>
          <span className="text-xs sm:text-sm font-semibold truncate">{triage.urgencyLabel}</span>
        </div>

        {/* Real-time Vital Scores */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono-custom">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-100">
            <Activity className="w-3 h-3 text-[#087f9c]" />
            {triage.isPediatric && triage.pewsScore !== null
              ? `PEWS ${triage.pewsScore}`
              : `NEWS2 ${triage.news2Score}`}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-100">
            qSOFA {triage.qsofaScore}/3
          </span>
          {triage.mapValue !== null && (
            <span
              className={`px-2 py-0.5 rounded border font-semibold ${
                triage.mapValue < 65
                  ? 'bg-rose-600 text-white border-rose-700'
                  : 'bg-white/80 dark:bg-slate-900/70 border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-100'
              }`}
            >
              MAP {triage.mapValue}
            </span>
          )}
          {triage.shockIndex !== null && (
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border font-semibold ${
                triage.shockIndex >= 0.9
                  ? 'bg-rose-600 text-white border-rose-700'
                  : 'bg-white/80 dark:bg-slate-900/70 border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-100'
              }`}
            >
              <HeartPulse className="w-3 h-3" />
              SI {triage.shockIndex}
            </span>
          )}

          {hasAlerts && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-1 px-2.5 py-1 min-h-[32px] rounded-lg bg-white dark:bg-slate-900 border border-current/25 font-sans font-bold text-xs cursor-pointer hover:opacity-90 active:scale-[0.98]"
            >
              <span>
                {triage.redFlags.length} cờ đỏ
                {triage.panicLabs.length > 0 ? ` · ${triage.panicLabs.length} CLS bất thường` : ''}
              </span>
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>

      {/* Expanded Red Flags & Panic Lab Details */}
      {expanded && hasAlerts && (
        <div className="mt-2.5 pt-2.5 border-t border-current/15 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {triage.redFlags.length > 0 && (
            <div className="bg-white/85 dark:bg-slate-900/80 rounded-lg p-2.5 border border-rose-200/80 dark:border-rose-900/60">
              <div className="font-bold text-rose-700 dark:text-rose-300 mb-1">
                Cờ đỏ Sinh hiệu & Báo động Khẩn
              </div>
              <ul className="space-y-1 text-slate-700 dark:text-slate-200 list-disc pl-4">
                {triage.redFlags.map((flag, idx) => (
                  <li key={idx}>{flag}</li>
                ))}
              </ul>
            </div>
          )}

          {triage.panicLabs.length > 0 && (
            <div className="bg-white/85 dark:bg-slate-900/80 rounded-lg p-2.5 border border-amber-200/80 dark:border-amber-900/60">
              <div className="font-bold text-amber-800 dark:text-amber-300 mb-1">
                Cận lâm sàng ngoài khoảng tham chiếu
              </div>
              <ul className="space-y-1 text-slate-700 dark:text-slate-200">
                {triage.panicLabs.map((lab) => (
                  <li key={lab.labField} className="flex items-start gap-1.5">
                    <span
                      className={`mt-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold uppercase shrink-0 ${
                        lab.severity === 'panic'
                          ? 'bg-rose-600 text-white'
                          : 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200'
                      }`}
                    >
                      {lab.severity === 'panic' ? 'PANIC' : lab.direction === 'high' ? 'CAO' : 'THẤP'}
                    </span>
                    <span>
                      <strong>{lab.labName}:</strong> {lab.value} {lab.unit} — {lab.clinicalMeaning}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
