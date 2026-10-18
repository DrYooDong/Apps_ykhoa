import React from 'react';
import { PRESET_CASES, PresetCase } from '../data/presetCases';
import { X, Sparkles, ArrowRight, UserCheck, Stethoscope } from 'lucide-react';

interface PresetCasesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCase: (preset: PresetCase) => void;
}

export const PresetCasesModal: React.FC<PresetCasesModalProps> = ({
  isOpen,
  onClose,
  onSelectCase
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Bộ Ca Bệnh Mẫu Thực Tế Từ Y Văn (Clinical Presets)
              </h3>
              <p className="text-xs text-slate-500">
                Chọn một ca lâm sàng để nạp dữ liệu và kiểm nghiệm hệ thống CDSS
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mt-4 max-h-[65vh] overflow-y-auto pr-1">
          {PRESET_CASES.map((cs) => (
            <div
              key={cs.id}
              onClick={() => onSelectCase(cs)}
              className="p-4 rounded-xl border border-slate-200 hover:border-teal-400 bg-slate-50/60 hover:bg-teal-50/40 cursor-pointer transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider block mb-1">
                    {cs.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-900">
                    {cs.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {cs.subtitle}
                  </p>
                  <p className="text-xs text-slate-700 mt-2 bg-white p-2.5 rounded-lg border border-slate-200/80 leading-relaxed font-sans">
                    {cs.clinicalScenario}
                  </p>
                </div>

                <div className="shrink-0 p-2 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Đóng Lại
          </button>
        </div>
      </div>
    </div>
  );
};
