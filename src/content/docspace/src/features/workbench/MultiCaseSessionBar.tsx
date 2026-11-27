import React, { useRef } from 'react';
import {
  Download,
  Eye,
  EyeOff,
  FilePlus2,
  Lock,
  RotateCcw,
  Shield,
  Unlock,
  Upload,
  X,
} from 'lucide-react';
import { ClinicalCaseSession, ProgressiveRevealStage } from '../../schemas/docspaceV2.ts';

interface MultiCaseSessionBarProps {
  sessions: ClinicalCaseSession[];
  activeSession: ClinicalCaseSession;
  onSelectSession: (id: string) => void;
  onNewSession: () => void;
  onCloseSession: (id: string) => void;
  onSetRevealStage: (stage: ProgressiveRevealStage) => void;
  onToggleProgressiveMode: () => void;
  onExportJson: (anonymize: boolean) => void;
  onImportJson: (raw: string) => void;
  onResetSession: () => void;
}

const STAGE_LABELS: Array<{ stage: ProgressiveRevealStage; short: string; tip: string }> = [
  { stage: 1, short: '1. Lý do & Sinh hiệu', tip: 'Chỉ mở Hành chính, Lý do vào viện, Sinh hiệu' },
  { stage: 2, short: '2. Khám & Dịch tễ', tip: 'Mở thêm Khám thực thể, Tiền căn, Dịch tễ' },
  { stage: 3, short: '3. Cận lâm sàng', tip: 'Mở toàn bộ Xét nghiệm & Chẩn đoán hình ảnh' },
  { stage: 4, short: '4. Đáp án Chuyên gia', tip: 'Mở khóa chẩn đoán, biện luận A-P & bẫy lâm sàng' },
];

export const MultiCaseSessionBar: React.FC<MultiCaseSessionBarProps> = ({
  sessions,
  activeSession,
  onSelectSession,
  onNewSession,
  onCloseSession,
  onSetRevealStage,
  onToggleProgressiveMode,
  onExportJson,
  onImportJson,
  onResetSession,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === 'string') {
        onImportJson(ev.target.result);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2 shadow-2xs space-y-2">
      {/* Row 1: Multi-Case Tabs + Offline File Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full pb-0.5">
          {sessions.map((s) => {
            const isActive = s.id === activeSession.id;
            return (
              <div
                key={s.id}
                className={`group flex items-center gap-1 rounded-lg border text-xs transition-all shrink-0 ${
                  isActive
                    ? 'bg-cyan-50 dark:bg-cyan-950/50 border-[#087f9c] text-slate-950 dark:text-cyan-50 font-bold'
                    : 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectSession(s.id)}
                  className="px-2.5 py-1.5 min-h-[36px] max-w-[180px] truncate cursor-pointer text-left"
                  title={s.title}
                >
                  {s.sourceSoapId ? '📚 ' : '🩺 '}
                  {s.title}
                </button>
                {sessions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onCloseSession(s.id)}
                    aria-label={`Đóng tab ${s.title}`}
                    className="pr-2 py-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}

          <button
            type="button"
            onClick={onNewSession}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 min-h-[36px] rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-[#087f9c] hover:text-[#087f9c] cursor-pointer shrink-0"
            title="Mở thêm tab bệnh án mới (tối đa 10 ca lưu cục bộ)"
          >
            <FilePlus2 className="w-3.5 h-3.5" />
            <span>Ca mới</span>
          </button>
        </div>

        {/* Utility Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={onToggleProgressiveMode}
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 min-h-[36px] rounded-lg border font-semibold cursor-pointer transition-colors ${
              activeSession.progressiveMode
                ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-800 text-indigo-800 dark:text-indigo-200'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
            }`}
            title="Bật chế độ Mở dần dữ kiện từng chặng để tự luyện hoặc giảng dạy"
          >
            {activeSession.progressiveMode ? (
              <EyeOff className="w-3.5 h-3.5" />
            ) : (
              <Eye className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">
              {activeSession.progressiveMode ? 'Đang Mở Dần' : 'Hiện Toàn Bộ'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onExportJson(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 min-h-[36px] rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-[#087f9c] font-medium cursor-pointer"
            title="Xuất file JSON bài tập đã tự động ẩn danh PHI (100% Offline)"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Xuất ẩn danh</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 min-h-[36px] rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-[#087f9c] font-medium cursor-pointer"
            title="Nạp file bài làm JSON từ sinh viên/giảng viên"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Nhập JSON</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={onResetSession}
            className="inline-flex items-center gap-1 px-2 py-1.5 min-h-[36px] rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-600 hover:border-rose-300 cursor-pointer"
            title="Làm sạch ca hiện tại"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Row 2: Progressive Reveal Stepper (when Progressive Mode is active) */}
      {activeSession.progressiveMode && (
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wide text-indigo-700 dark:text-indigo-300 mr-1">
            Mở dần dữ kiện:
          </span>
          {STAGE_LABELS.map((item) => {
            const unlocked = activeSession.revealStage >= item.stage;
            const isCurrent = activeSession.revealStage === item.stage;
            return (
              <button
                key={item.stage}
                type="button"
                onClick={() => onSetRevealStage(item.stage)}
                title={item.tip}
                className={`inline-flex items-center gap-1 px-2.5 py-1 min-h-[32px] rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-2xs'
                    : unlocked
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-200 border-indigo-200 dark:border-indigo-800'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                }`}
              >
                {unlocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                <span>{item.short}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
