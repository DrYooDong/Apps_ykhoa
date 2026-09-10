import React from 'react';
import { Database, FileCheck, Download, Upload, RotateCcw } from 'lucide-react';

interface DataActionsBarProps {
  onPrintReport?: () => void;
  onSaveToPostgres?: () => void;
  onExportCase: () => void;
  onImportCase: (file: File) => void;
  onReset?: () => void;
  className?: string;
}

export const DataActionsBar: React.FC<DataActionsBarProps> = ({
  onPrintReport,
  onExportCase,
  onImportCase,
  onReset,
  className = '',
}) => {
  return (
    <div
      id="data-actions-bar-widget"
      className={`bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs flex flex-col gap-2.5 ${className}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
          <Database className="w-4 h-4 text-blue-600" />
          <span>Dữ kiện bệnh án</span>
        </h3>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            title="Làm mới toàn bộ form"
            className="text-[11px] text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Xóa form</span>
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {onPrintReport && (
          <button
            type="button"
            id="btn-print-report-quick"
            onClick={onPrintReport}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>In / Xuất Báo Cáo Lâm Sàng</span>
          </button>
        )}

        {/* Secondary Import/Export Action Group */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            id="btn-export-case-json"
            onClick={onExportCase}
            className="flex items-center justify-center gap-1 py-1.5 px-2 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded hover:bg-slate-100 hover:border-slate-300 transition-colors cursor-pointer shadow-xs"
            title="Xuất dữ kiện ca lâm sàng ra file .json"
          >
            <Download className="w-3 h-3 text-slate-500" />
            <span>Xuất JSON</span>
          </button>

          <label
            className="flex items-center justify-center gap-1 py-1.5 px-2 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded hover:bg-slate-100 hover:border-slate-300 transition-colors cursor-pointer shadow-xs"
            title="Nạp dữ kiện ca lâm sàng từ file .json"
          >
            <Upload className="w-3 h-3 text-slate-500" />
            <span>Nạp JSON</span>
            <input
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onImportCase(file);
                  e.target.value = '';
                }
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
};
