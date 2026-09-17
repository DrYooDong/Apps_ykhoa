import React, { useState } from 'react';
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Columns3,
  HeartPulse,
  Info,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import { ProblemStatementEntry } from '../../types.ts';

interface ParallelActionBoardProps {
  problems: ProblemStatementEntry[];
}

export const ParallelActionBoard: React.FC<ParallelActionBoardProps> = ({ problems }) => {
  const [expanded, setExpanded] = useState(true);

  if (problems.length === 0) return null;

  const t1Problems = problems.filter((p) => p.priorityLevel === 'life-threatening');
  const t2Problems = problems.filter((p) => p.priorityLevel === 'acute' || !p.priorityLevel);
  const t3Problems = problems.filter((p) => p.priorityLevel === 'chronic');

  const conflicts = problems
    .filter((p) => Boolean(p.conflictNotes))
    .map((p) => ({ label: p.label, note: p.conflictNotes! }));

  return (
    <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs">
      {/* Top Bar: Title, Badges & Toggle */}
      <div className="bg-slate-50/90 px-4 py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Columns3 className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-none">
              Ma Trận Quyết Định Lâm Sàng 3 Tầng Song Song
            </h3>
            <span className="text-[10.5px] text-slate-400 font-medium">
              Parallel Clinical Action Board · Phân tầng ưu tiên can thiệp đồng thời
            </span>
          </div>
        </div>

        {/* Quick Badges & Expand Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-[10.5px] font-mono-custom">
            {t1Problems.length > 0 && (
              <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold border border-red-200">
                {t1Problems.length} Cấp cứu
              </span>
            )}
            {t2Problems.length > 0 && (
              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold border border-amber-200">
                {t2Problems.length} Cấp tính
              </span>
            )}
            {t3Problems.length > 0 && (
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium border border-slate-200">
                {t3Problems.length} Mạn tính
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* CẢNH BÁO XUNG ĐỘT ĐIỀU TRỊ (NẾU CÓ) */}
      {conflicts.length > 0 && (
        <div className="mx-4 mt-3 p-2.5 bg-amber-50 border border-amber-300/80 rounded-lg flex items-start gap-2 text-xs text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex flex-col gap-0.5">
            <b className="text-amber-950">Phát hiện mâu thuẫn chỉ định giữa các tầng bệnh cảnh:</b>
            {conflicts.map((c, idx) => (
              <span key={idx} className="text-[11.5px] text-amber-800">
                • <b>{c.label}:</b> {c.note}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* NỘI DUNG 3 CỘT MA TRẬN KHI MỞ RỘNG */}
      {expanded && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* CỘT TẦNG 1: ĐE DỌA SINH HIỆU */}
          <div className="p-3 rounded-lg border border-red-200 bg-red-50/30 flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1.5 border-b border-red-200/80">
              <span className="text-xs font-bold text-red-900 flex items-center gap-1">
                <HeartPulse className="w-3.5 h-3.5 text-red-600" />
                TẦNG 1: ĐE DỌA SINH HIỆU
              </span>
              <span className="text-[10px] font-mono-custom px-1.5 py-0.2 rounded bg-red-100 text-red-800 font-bold">
                Ưu tiên 1
              </span>
            </div>
            {t1Problems.length > 0 ? (
              <div className="flex flex-col gap-2">
                {t1Problems.map((p) => (
                  <div key={p.id} className="p-2 bg-white rounded border border-red-200 shadow-2xs text-xs">
                    <b className="text-red-950 block">{p.label}</b>
                    {p.evidence.length > 0 && (
                      <span className="text-[11px] text-slate-600 mt-1 block">
                        Dữ kiện: {p.evidence.join(' · ')}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic py-2">
                Không có vấn đề đe dọa sinh tồn khẩn cấp.
              </p>
            )}
          </div>

          {/* CỘT TẦNG 2: CẤP TÍNH & HỘI CHỨNG */}
          <div className="p-3 rounded-lg border border-amber-200 bg-amber-50/30 flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1.5 border-b border-amber-200/80">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                TẦNG 2: CẤP TÍNH & HỘI CHỨNG
              </span>
              <span className="text-[10px] font-mono-custom px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                Ưu tiên 2
              </span>
            </div>
            {t2Problems.length > 0 ? (
              <div className="flex flex-col gap-2">
                {t2Problems.map((p) => (
                  <div key={p.id} className="p-2 bg-white rounded border border-amber-200 shadow-2xs text-xs">
                    <b className="text-amber-950 block">{p.label}</b>
                    {p.evidence.length > 0 && (
                      <span className="text-[11px] text-slate-600 mt-1 block">
                        Dữ kiện: {p.evidence.join(' · ')}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic py-2">
                Chưa có hội chứng cấp tính được thiết lập.
              </p>
            )}
          </div>

          {/* CỘT TẦNG 3: MẠN TÍNH & BỆNH NỀN ĐỒNG MẮC */}
          <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col gap-2">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-slate-600" />
                TẦNG 3: MẠN TÍNH & BỆNH NỀN
              </span>
              <span className="text-[10px] font-mono-custom px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-medium">
                Ưu tiên 3
              </span>
            </div>
            {t3Problems.length > 0 ? (
              <div className="flex flex-col gap-2">
                {t3Problems.map((p) => (
                  <div key={p.id} className="p-2 bg-white rounded border border-slate-200 shadow-2xs text-xs">
                    <b className="text-slate-900 block">{p.label}</b>
                    {p.evidence.length > 0 && (
                      <span className="text-[11px] text-slate-600 mt-1 block">
                        Bệnh nền: {p.evidence.join(' · ')}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic py-2">
                Không ghi nhận bệnh nền mạn tính hoặc yếu tố nguy cơ.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
