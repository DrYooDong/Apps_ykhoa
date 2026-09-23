import React from 'react';
import { PatientData } from '../types/sepsis';
import { evaluatePatientCDSS } from '../utils/calculators';
import { History, Trash2, ArrowRight, UserCheck, Calendar, Activity } from 'lucide-react';

interface SavedAssessment {
  id: string;
  savedAt: string;
  patientData: PatientData;
}

interface CaseHistoryViewProps {
  savedCases: SavedAssessment[];
  onLoadCase: (data: PatientData) => void;
  onDeleteCase: (id: string) => void;
  onClearAll: () => void;
}

export const CaseHistoryView: React.FC<CaseHistoryViewProps> = ({
  savedCases,
  onLoadCase,
  onDeleteCase,
  onClearAll
}) => {
  if (savedCases.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center max-w-xl mx-auto my-8 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
          <History className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-800">Chưa Có Hồ Sơ Nào Được Lưu</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Khi bạn hoàn thành đánh giá một bệnh nhân, bạn có thể lưu lại hồ sơ để theo dõi diễn tiến hoặc bàn giao ca trực.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20 md:pb-8">
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <History className="w-5 h-5 text-teal-600" />
          <div>
            <h3 className="text-base font-bold text-slate-900">Danh Sách Ca Bệnh Đã Lưu ({savedCases.length})</h3>
            <p className="text-xs text-slate-500">Lưu trữ cục bộ trên trình duyệt phục vụ theo dõi & bàn giao trực</p>
          </div>
        </div>

        <button
          onClick={onClearAll}
          className="px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors font-medium flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Xóa tất cả</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {savedCases.map((c) => {
          const res = evaluatePatientCDSS(c.patientData);
          const isEmergency = res.urgencyLevel === 'emergency';
          const isUrgent = res.urgencyLevel === 'urgent';

          return (
            <div
              key={c.id}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-teal-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {c.patientData.patientName || 'Không tên'} ({c.patientData.patientCode || 'Mã N/A'})
                    </span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {new Date(c.savedAt).toLocaleString('vi-VN')}
                    </span>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isEmergency
                      ? 'bg-rose-100 text-rose-800'
                      : isUrgent
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {res.primaryDiagnosis === 'septic_shock' ? 'SỐC NHIỄM KHUẨN' : res.primaryDiagnosis === 'confirmed_sepsis' ? 'SEPSIS' : 'NGHI NGỜ'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 my-3 text-center">
                  <div className="p-2 rounded bg-slate-50">
                    <span className="text-[10px] text-slate-500 uppercase block">NEWS2</span>
                    <span className="text-base font-bold font-mono text-slate-900">{res.news2Score}</span>
                  </div>

                  <div className="p-2 rounded bg-cyan-50">
                    <span className="text-[10px] text-cyan-800 uppercase block">LP-NEWS</span>
                    <span className="text-base font-bold font-mono text-cyan-950">{res.lpNewsScore}</span>
                  </div>

                  <div className="p-2 rounded bg-slate-50">
                    <span className="text-[10px] text-slate-500 uppercase block">Lactate</span>
                    <span className="text-base font-bold font-mono text-slate-900">{c.patientData.lactateInitial ?? 'N/A'}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {res.summarySentence}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onDeleteCase(c.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition-colors"
                  title="Xóa ca này"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onLoadCase(c.patientData)}
                  className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shadow-sm transition-all"
                >
                  <span>Mở Xem Chi Tiết</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
