import React from 'react';
import { DailyTimelinePhase } from '../../lib/dailyTreatmentTimeline.ts';

interface DailyTimelineTableProps {
  timelinePhases: DailyTimelinePhase[];
}

export const DailyTimelineTable: React.FC<DailyTimelineTableProps> = ({ timelinePhases }) => {
  if (timelinePhases.length === 0) {
    return (
      <div className="p-4 text-center text-xs text-slate-500 bg-slate-50 rounded-lg border border-slate-200">
        Chưa có lộ trình phân tầng từng ngày chi tiết cho phân độ này.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-2xs">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider text-[11px]">
            <th className="p-3 w-[24%] min-w-[200px] border-r border-slate-200">
              Giai đoạn &amp; Mục tiêu
            </th>
            <th className="p-3 w-[40%] min-w-[280px] border-r border-slate-200">
              Y lệnh (Thuốc, Dịch truyền &amp; Xử trí)
            </th>
            <th className="p-3 w-[36%] min-w-[280px]">
              Theo dõi: Lâm sàng (LS) &amp; Cận lâm sàng (CLS)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {timelinePhases.map((phase, pIdx) => {
            const rawMonitoring = Array.isArray(phase?.monitoring)
              ? phase.monitoring
              : Array.isArray((phase as any)?.monitoringLabs)
              ? (phase as any).monitoringLabs.map((l: any) => ({
                  type: 'CLS' as const,
                  metric: l.labName || l.metric || 'Xét nghiệm',
                  frequency: l.frequency || 'Theo dõi',
                  target: l.target || '',
                }))
              : [];
            const lsItems = rawMonitoring.filter(
              (m) =>
                m &&
                (m.type === 'LS' ||
                  (!m.type &&
                    /sinh hiệu|mạch|huyết áp|thân nhiệt|tri giác|nước tiểu|thở|curb|khám|ban/i.test(
                      m.metric || ''
                    )))
            );
            const clsItems = rawMonitoring.filter(
              (m) =>
                m &&
                (m.type === 'CLS' ||
                  (!m.type &&
                    !/sinh hiệu|mạch|huyết áp|thân nhiệt|tri giác|nước tiểu|thở|curb|khám|ban/i.test(
                      m.metric || ''
                    )))
            );

            return (
              <tr
                key={phase.id || pIdx}
                className="hover:bg-slate-50/50 transition-colors align-top"
              >
                {/* Cột 1: Giai đoạn & Mục tiêu */}
                <td className="p-3 border-r border-slate-200 bg-slate-50/40">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold font-mono-custom bg-blue-100 text-blue-900 border border-blue-200">
                        {phase.dayRange}
                      </span>
                    </div>
                    <h5 className="font-bold text-xs text-slate-900 leading-snug">
                      {phase.phaseName}
                    </h5>
                    <div className="p-2 bg-white rounded border border-slate-200 text-[11px] text-slate-700 leading-relaxed shadow-2xs">
                      <span className="font-bold text-blue-900 block mb-0.5">
                        🎯 Mục tiêu lâm sàng:
                      </span>
                      <span>{phase.clinicalGoal}</span>
                    </div>
                  </div>
                </td>

                {/* Cột 2: Y lệnh (Thuốc, Dịch truyền & Xử trí) */}
                <td className="p-3 border-r border-slate-200">
                  <div className="flex flex-col gap-2">
                    {(Array.isArray(phase?.treatments) ? phase.treatments : []).map((tr, tIdx) => (
                      <div
                        key={tIdx}
                        className={`p-2.5 rounded-md border text-xs leading-relaxed ${
                          tr.isHighlighted
                            ? 'bg-amber-50/70 border-amber-300 text-amber-950 font-medium'
                            : 'bg-white border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="font-bold text-slate-900 text-xs">
                            {tr.title}
                          </span>
                          {tr.timing && (
                            <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 text-[10px] font-mono-custom">
                              {tr.timing}
                            </span>
                          )}
                        </div>
                        <p className="text-[11.5px] text-slate-700">{tr.detail}</p>
                      </div>
                    ))}
                  </div>
                </td>

                {/* Cột 3: Theo dõi: Lâm sàng (LS) & Cận lâm sàng (CLS) */}
                <td className="p-3">
                  <div className="flex flex-col gap-3">
                    {/* Lâm sàng (LS) */}
                    {lsItems.length > 0 && (
                      <div>
                        <div className="font-bold text-[11px] uppercase tracking-wider text-blue-900 flex items-center gap-1 mb-1.5">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          <span>🩺 Lâm sàng (LS) &amp; Sinh hiệu</span>
                        </div>
                        <div className="space-y-1">
                          {lsItems.map((m, mIdx) => (
                            <div
                              key={mIdx}
                              className="p-1.5 rounded border border-blue-100 bg-blue-50/30 text-xs flex flex-col gap-0.5"
                            >
                              <div className="font-semibold text-slate-800 flex items-center justify-between gap-1">
                                <span>{m.metric}</span>
                                <span className="text-[10px] font-mono-custom px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 border border-blue-200 shrink-0">
                                  {m.frequency}
                                </span>
                              </div>
                              {m.target && (
                                <div className="text-[10.5px] text-emerald-800 flex items-center gap-1">
                                  <span className="font-medium">Đích:</span>
                                  <span>{m.target}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Cận lâm sàng (CLS) */}
                    {clsItems.length > 0 && (
                      <div>
                        <div className="font-bold text-[11px] uppercase tracking-wider text-purple-900 flex items-center gap-1 mb-1.5">
                          <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                          <span>🔬 Cận lâm sàng (CLS) &amp; Giám sát</span>
                        </div>
                        <div className="space-y-1">
                          {clsItems.map((m, mIdx) => (
                            <div
                              key={mIdx}
                              className="p-1.5 rounded border border-purple-100 bg-purple-50/30 text-xs flex flex-col gap-0.5"
                            >
                              <div className="font-semibold text-slate-800 flex items-center justify-between gap-1">
                                <span>{m.metric}</span>
                                <span className="text-[10px] font-mono-custom px-1.5 py-0.2 rounded bg-purple-100 text-purple-800 border border-purple-200 shrink-0">
                                  {m.frequency}
                                </span>
                              </div>
                              {m.target && (
                                <div className="text-[10.5px] text-purple-800 flex items-center gap-1">
                                  <span className="font-medium">Đích:</span>
                                  <span>{m.target}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
