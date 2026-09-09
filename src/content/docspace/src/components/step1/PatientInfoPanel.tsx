import React from 'react';
import { ClinicalFormState, Gender } from '../../types.ts';

interface PatientInfoPanelProps {
  form: ClinicalFormState;
  setForm: React.Dispatch<React.SetStateAction<ClinicalFormState>>;
  className?: string;
}

export const PatientInfoPanel: React.FC<PatientInfoPanelProps> = ({
  form,
  setForm,
  className = '',
}) => {
  const ageNum = parseInt(form.tuoi, 10);
  const ageGroup =
    !isNaN(ageNum) && ageNum >= 60
      ? 'Cao tuổi'
      : !isNaN(ageNum) && ageNum <= 15
      ? 'Nhi khoa'
      : 'Trưởng thành';

  return (
    <div
      id="patient-info-panel"
      className={`bg-white border border-slate-200 rounded-lg p-3.5 sm:p-4 shadow-xs ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded flex items-center justify-center bg-slate-800 text-white text-xs font-bold font-mono-custom">
            A
          </span>
          <h2 className="font-display text-sm sm:text-base font-bold text-slate-800">
            Hành chính &amp; lý do vào viện
          </h2>
        </div>
        <span className="text-[11px] text-slate-500">
          Thông tin nhân trắc học &amp; định danh ban đầu
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        {/* Giới tính */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Giới tính</label>
          <div className="flex border border-slate-200 rounded-md overflow-hidden bg-slate-100 p-0.5">
            {(['nam', 'nu', 'khac'] as Gender[]).map((g) => (
              <button
                key={g}
                type="button"
                id={`btn-gender-${g}`}
                onClick={() => setForm((prev) => ({ ...prev, gioiTinh: g }))}
                className={`flex-1 py-1 font-semibold text-center transition-all cursor-pointer rounded ${
                  form.gioiTinh === g
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {g === 'nam' ? 'Nam' : g === 'nu' ? 'Nữ' : 'Khác'}
              </button>
            ))}
          </div>
        </div>

        {/* Tuổi */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="font-semibold text-slate-700">Tuổi</label>
            <span className="text-[10px] text-slate-400 font-medium">{ageGroup}</span>
          </div>
          <input
            id="input-age"
            type="number"
            min={0}
            max={130}
            value={form.tuoi}
            onChange={(e) => setForm((prev) => ({ ...prev, tuoi: e.target.value }))}
            placeholder="VD: 58"
            className="w-full border border-slate-200 rounded-md p-1.5 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 text-xs text-slate-800 transition-colors"
          />
        </div>

        {/* Nghề nghiệp */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Nghề nghiệp</label>
          <input
            id="input-job"
            type="text"
            value={form.ngheNghiep}
            onChange={(e) => setForm((prev) => ({ ...prev, ngheNghiep: e.target.value }))}
            placeholder="VD: Tài xế, Công nhân, Văn phòng..."
            className="w-full border border-slate-200 rounded-md p-1.5 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 text-xs text-slate-800 transition-colors"
          />
        </div>

        {/* Lý do vào viện */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Lý do vào viện</label>
          <input
            id="input-reason"
            type="text"
            value={form.lyDo}
            onChange={(e) => setForm((prev) => ({ ...prev, lyDo: e.target.value }))}
            placeholder="VD: Đau ngực trái dữ dội, Đau bụng HCP..."
            className="w-full border border-slate-200 rounded-md p-1.5 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 text-xs text-slate-800 font-medium transition-colors"
          />
        </div>
      </div>
    </div>
  );
};
