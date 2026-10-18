import React from 'react';
import { PatientData } from '../types/sepsis';
import { evaluatePatientCDSS } from '../utils/calculators';
import { X, Trash2, ArrowRight, Calendar, History } from 'lucide-react';

interface SavedAssessment {
  id: string;
  savedAt: string;
  patientData: PatientData;
}

interface CaseHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedCases: SavedAssessment[];
  onLoadCase: (data: PatientData) => void;
  onDeleteCase: (id: string) => void;
  onClearAll: () => void;
}

export const CaseHistoryModal: React.FC<CaseHistoryModalProps> = ({
  isOpen,
  onClose,
  savedCases,
  onLoadCase,
  onDeleteCase,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Lịch Sử Ca Bệnh Đã Lưu ({savedCases.length})
              </h3>
              <p className="text-xs text-slate-500">
                Hồ sơ lưu trữ trên trình duyệt hỗ trợ bàn giao ca trực & đối chiếu
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedCases.length > 0 && (
              <button
                onClick={onClearAll}
                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                title="Xóa tất cả hồ sơ"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List of cases */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {savedCases.length === 0 ? (
            <div className="text-center py-10">
              <History className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">Chưa có hồ sơ ca bệnh nào</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Nhấn biểu tượng lưu trên thanh công cụ để lưu ca hiện tại
              </p>
            </div>
          ) : (
            savedCases.map((c) => {
              const res = evaluatePatientCDSS(c.patientData);
              const isEmergency = res.urgencyLevel === 'emergency';
              const isUrgent = res.urgencyLevel === 'urgent';

              return (
                <div
                  key={c.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-teal-50/30 hover:border-teal-300 transition-all flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 truncate">
                        Ca {c.patientData.patientType === 'adult' ? 'Người lớn' : c.patientData.patientType === 'pediatric' ? 'Nhi khoa' : 'Sản khoa'} · {c.patientData.ageYears} tuổi ({c.patientData.gender === 'male' ? 'Nam' : 'Nữ'})
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
                        isEmergency ? 'bg-rose-100 text-rose-800' : isUrgent ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {res.primaryDiagnosis.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono mt-1">
                      <span>NEWS2: {res.news2Score}</span>
                      <span>LP-NEWS: {res.lpNewsScore}</span>
                      <span>Lactate: {c.patientData.lactateInitial ?? 'N/A'}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-[10px] flex items-center gap-1 font-sans">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {new Date(c.savedAt).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => onDeleteCase(c.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                      title="Xóa ca này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        onLoadCase(c.patientData);
                        onClose();
                      }}
                      className="px-2.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-sm"
                    >
                      <span>Mở</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/70 rounded-lg transition-colors"
          >
            Đóng Lại
          </button>
        </div>
      </div>
    </div>
  );
};
