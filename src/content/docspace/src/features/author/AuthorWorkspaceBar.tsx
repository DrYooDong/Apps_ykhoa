import React from 'react';
import { FileCode2, FilePlus2, Sparkles } from 'lucide-react';

interface AuthorWorkspaceBarProps {
  customCasesCount: number;
  onOpenQuickIngest: () => void;
  onOpenPromptBuilder: () => void;
}

export const AuthorWorkspaceBar: React.FC<AuthorWorkspaceBarProps> = ({
  customCasesCount,
  onOpenQuickIngest,
  onOpenPromptBuilder,
}) => {
  return (
    <div className="bg-slate-900 text-slate-100 border border-slate-700 rounded-xl px-3.5 py-2.5 shadow-sm flex flex-wrap items-center justify-between gap-2 text-xs no-print">
      <div className="flex items-center gap-2">
        <FileCode2 className="w-4 h-4 text-cyan-400 shrink-0" />
        <span className="font-bold uppercase tracking-wider text-cyan-300">
          Chế độ Biên soạn Học liệu (Offline Author Studio)
        </span>
        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px] text-slate-300">
          {customCasesCount} ca tự nạp cục bộ
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onOpenQuickIngest}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[34px] rounded-lg bg-[#087f9c] hover:bg-[#06667e] text-white font-bold cursor-pointer"
        >
          <FilePlus2 className="w-3.5 h-3.5" />
          Nạp ca SOAP Markdown (1-Click)
        </button>
        <button
          type="button"
          onClick={onOpenPromptBuilder}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 min-h-[34px] rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-100 font-semibold cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Tạo Prompt chuẩn NotebookLM
        </button>
      </div>
    </div>
  );
};
