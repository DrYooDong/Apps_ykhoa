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
            Hành chính &amp; LDVV
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
          <label className="block font-semibold text-slate-700 mb-1">LDVV (Lý do vào viện)</label>
          <input
            id="input-reason"
            type="text"
            value={form.lyDo}
            onChange={(e) => setForm((prev) => ({ ...prev, lyDo: e.target.value }))}
            placeholder="VD: Sốt cao ngày 4, đau cơ khớp, xuất huyết..."
            className="w-full border border-slate-200 rounded-md p-1.5 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 text-xs text-slate-800 font-medium transition-colors"
          />
        </div>
      </div>

      {/* Dòng 2: Ngày bệnh & Thể trạng tính liều phác đồ (Cân nặng, Chiều cao, BMI) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs mt-3 pt-3 border-t border-slate-100">
        {/* Ngày bệnh */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="font-semibold text-slate-700">Ngày thứ của bệnh</label>
            <span className="text-[10px] text-blue-600 font-bold uppercase">Động học bệnh</span>
          </div>
          <input
            id="input-disease-day"
            type="number"
            min={1}
            max={30}
            value={form.ngayBenh || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, ngayBenh: e.target.value }))}
            placeholder="VD: 4 (Giai đoạn nguy hiểm)"
            className="w-full border border-slate-200 rounded-md p-1.5 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 text-xs text-slate-800 font-semibold transition-colors"
          />
        </div>

        {/* Cân nặng */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Cân nặng (kg)</label>
          <input
            id="input-weight"
            type="number"
            step="0.5"
            min={1}
            max={250}
            value={form.canNang || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, canNang: e.target.value }))}
            placeholder="VD: 68"
            className="w-full border border-slate-200 rounded-md p-1.5 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 text-xs text-slate-800 font-semibold transition-colors"
          />
        </div>

        {/* Chiều cao */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Chiều cao (cm)</label>
          <input
            id="input-height"
            type="number"
            min={30}
            max={220}
            value={form.chieuCao || ''}
            onChange={(e) => setForm((prev) => ({ ...prev, chieuCao: e.target.value }))}
            placeholder="VD: 168"
            className="w-full border border-slate-200 rounded-md p-1.5 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 text-xs text-slate-800 font-semibold transition-colors"
          />
        </div>

        {/* BMI & Thể trạng tự động */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Thể trạng &amp; BMI tự động</label>
          <div className="p-1.5 rounded-md border border-slate-200 bg-slate-100 text-xs text-slate-700 flex items-center justify-between font-mono-custom">
            <span>
              {(() => {
                const w = parseFloat(form.canNang || '0');
                const h = parseFloat(form.chieuCao || '0');
                if (w > 0 && h > 0) {
                  const bmi = Math.round((w / ((h / 100) * (h / 100))) * 10) / 10;
                  const cat = bmi >= 25 ? 'Béo phì (Cần AdjBW)' : bmi >= 23 ? 'Thừa cân' : bmi < 18.5 ? 'Gầy' : 'Bình thường';
                  return `BMI: ${bmi} (${cat})`;
                }
                return 'Chưa tính BMI';
              })()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
