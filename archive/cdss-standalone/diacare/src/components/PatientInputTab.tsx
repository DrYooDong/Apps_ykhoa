import React from 'react';
import { 
  UserCheck, 
  Scale, 
  HeartPulse, 
  FlaskConical, 
  AlertTriangle, 
  Pill, 
  Stethoscope,
  Info,
  Layers,
  Utensils
} from 'lucide-react';
import { PatientData, GlucoseUnit, DiabetesType, WardType, DietType } from '../types/cdss';
import { calculateBMI, mgDlToMmolL, mmolLToMgDl, calculateEffectiveOsmolality, calculateAnionGap } from '../utils/calculations';

interface PatientInputTabProps {
  patient: PatientData;
  onChangePatient: (updated: Partial<PatientData>) => void;
  unit: GlucoseUnit;
}

export const PatientInputTab: React.FC<PatientInputTabProps> = ({
  patient,
  onChangePatient,
  unit,
}) => {
  const bmi = calculateBMI(patient.weightKg, patient.heightCm);

  // Quick helper to handle glucose input according to current unit
  const handleCurrentGlucoseChange = (valStr: string) => {
    const val = parseFloat(valStr) || 0;
    onChangePatient({ currentGlucose: val, unit });
  };

  const handleFastingGlucoseChange = (valStr: string) => {
    const val = parseFloat(valStr) || 0;
    onChangePatient({ fastingGlucose: val });
  };

  const toggleOralMed = (med: string) => {
    const current = [...patient.currentOralMeds];
    const index = current.indexOf(med);
    if (index >= 0) {
      current.splice(index, 1);
    } else {
      current.push(med);
    }
    onChangePatient({ currentOralMeds: current });
  };

  // Calculate Quick Chemistry Metrics
  const currentGlucoseMmol = patient.unit === 'mmol_l' ? patient.currentGlucose : mgDlToMmolL(patient.currentGlucose);
  const effectiveOsm = (patient.sodium && currentGlucoseMmol) ? calculateEffectiveOsmolality(patient.sodium, currentGlucoseMmol) : null;
  const anionGap = (patient.sodium && patient.potassium && patient.chloride && patient.bicarbonate) 
    ? calculateAnionGap(patient.sodium, patient.potassium, patient.chloride, patient.bicarbonate) 
    : null;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* CDSS Clinical Disclaimer Banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start space-x-3 text-amber-900 dark:text-amber-200">
        <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm space-y-1">
          <p className="font-semibold text-amber-800 dark:text-amber-300">
            Hệ thống hỗ trợ ra quyết định lâm sàng (CDSS) - Không lưu trữ dữ liệu EMR
          </p>
          <p className="text-amber-700 dark:text-amber-400/90 leading-relaxed">
            Công cụ hỗ trợ bác sĩ và điều dưỡng tính toán liều insulin, tra cứu phác đồ và cảnh báo nguy cơ theo khuyến cáo ADA 2026, JBDS-IP và BV ĐHYD TP.HCM. 
            Mọi dữ liệu chỉ được xử lý tạm thời trên trình duyệt và tự động xóa khi đóng tab hoặc bấm làm mới. Bác sĩ cần đánh giá lâm sàng toàn diện trước khi ký y lệnh.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Demographics & Clinical Profile */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Thông tin cơ bản & Nhân trắc học */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                  Thông Tin Bệnh Nhân & Thể Trạng
                </h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                Bước 1 / 3
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                  Mã / Tên Bệnh Nhân (Tùy chọn)
                </label>
                <input
                  type="text"
                  value={patient.patientName}
                  onChange={(e) => onChangePatient({ patientName: e.target.value })}
                  placeholder="VD: Nguyễn Văn A (Phòng 402)"
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Tuổi (năm)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="110"
                    value={patient.age || ''}
                    onChange={(e) => onChangePatient({ age: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Giới tính
                  </label>
                  <select
                    value={patient.gender}
                    onChange={(e) => onChangePatient({ gender: e.target.value as 'male' | 'female' })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                  </select>
                </div>
              </div>

              {/* Weight & Height */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Cân nặng (kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="20"
                    max="250"
                    value={patient.weightKg || ''}
                    onChange={(e) => onChangePatient({ weightKg: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold text-teal-600 dark:text-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Chiều cao (cm)
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="220"
                    value={patient.heightCm || ''}
                    onChange={(e) => onChangePatient({ heightCm: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Calculated BMI Indicator */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <Scale className="w-4 h-4 text-slate-500" />
                  <span className="text-xs text-slate-600 dark:text-slate-400">BMI:</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-white">
                    {bmi > 0 ? `${bmi} kg/m²` : '---'}
                  </span>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                  bmi >= 30 ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                  bmi < 18.5 && bmi > 0 ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                  'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                }`}>
                  {bmi >= 30 ? 'Béo phì (Kháng insulin)' :
                   bmi >= 25 ? 'Thừa cân' :
                   bmi >= 18.5 ? 'Bình thường' :
                   bmi > 0 ? 'Gầy / Nguy cơ hạ ĐH' : 'Chưa nhập'}
                </span>
              </div>
            </div>

            {/* Phân loại ĐTĐ & Khu vực điều trị */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Phân loại Đái Tháo Đường
                </label>
                <select
                  value={patient.diabetesType}
                  onChange={(e) => onChangePatient({ diabetesType: e.target.value as DiabetesType })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                >
                  <option value="T2D">Đái tháo đường Típ 2 (T2DM)</option>
                  <option value="T1D">Đái tháo đường Típ 1 (T1DM - Phụ thuộc Insulin)</option>
                  <option value="NEW_ONSET">ĐTĐ mới chẩn đoán lúc nhập viện</option>
                  <option value="STRESS">Tăng đường huyết do stress / thuốc</option>
                  <option value="SECONDARY">ĐTĐ sau viêm tụy / Cắt tụy (Típ 3c)</option>
                </select>
                {patient.diabetesType === 'T1D' && (
                  <p className="text-[11px] text-red-600 dark:text-red-400 mt-1 font-medium">
                    ⚠️ Tuyệt đối không ngừng insulin nền ở ĐTĐ típ 1 ngay cả khi nhịn ăn (Nguy cơ DKA)!
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Khu vực điều trị nội viện
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onChangePatient({ wardType: 'NON_ICU' })}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition flex items-center justify-center space-x-1.5 ${
                      patient.wardType === 'NON_ICU'
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span>Khoa Nội / Ngoại</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangePatient({ wardType: 'ICU' })}
                    className={`py-2 px-3 text-xs font-bold rounded-xl border transition flex items-center justify-center space-x-1.5 ${
                      patient.wardType === 'ICU'
                        ? 'bg-red-600 text-white border-red-600 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <span>Hồi sức ICU / SSĐB</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {patient.wardType === 'ICU' 
                    ? 'Mục tiêu ĐH: 140 - 180 mg/dL (7.8 - 10.0 mmol/L). Ưu tiên truyền tĩnh mạch liên tục.'
                    : 'Mục tiêu ĐH: 100 - 180 mg/dL (5.6 - 10.0 mmol/L). Ưu tiên tiêm dưới da Basal-Bolus.'}
                </p>
              </div>
            </div>

            {/* Chế độ Dinh dưỡng / Ăn uống */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5 flex items-center space-x-1">
                <Utensils className="w-3.5 h-3.5 text-teal-600" />
                <span>Tình trạng Dinh Dưỡng / Ăn Uống Hiện Tại</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'ORAL_FULL' as DietType, label: 'Ăn đường miệng tốt', desc: 'Basal - Bolus' },
                  { id: 'ORAL_POOR' as DietType, label: 'Ăn kém / Ăn ít', desc: 'Basal Plus' },
                  { id: 'NPO' as DietType, label: 'Nhịn ăn (NPO / Mổ)', desc: 'Basal Plus / TTM' },
                  { id: 'ENTERAL_TUBE' as DietType, label: 'Nuôi ăn qua sonde dạ dày', desc: 'JBDS 05' },
                  { id: 'TPN' as DietType, label: 'Nuôi tĩnh mạch hoàn toàn (TPN)', desc: 'Thêm Regular vào dịch' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onChangePatient({ dietType: item.id })}
                    className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                      patient.dietType === item.id
                        ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-900 dark:text-teal-200 ring-1 ring-teal-500'
                        : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="text-xs font-bold">{item.label}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Tiền sử & Trạng thái điều trị trước đó */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
                <Pill className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                Tiền Sử Dùng Thuốc & Chuyển Đổi Tĩnh Mạch (IV)
              </h3>
            </div>

            {/* Is on IV Insulin */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                    Đang truyền Insulin tĩnh mạch liên tục (IV / VRIII / FRIII)
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Cần chuyển sang tiêm dưới da (SC) khi bệnh nhân bắt đầu ăn uống và ổn định
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={patient.isOnIVInsulin}
                  onChange={(e) => onChangePatient({ isOnIVInsulin: e.target.checked })}
                  className="w-5 h-5 accent-teal-600 rounded cursor-pointer"
                />
              </div>

              {patient.isOnIVInsulin && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                      Tốc độ truyền TB 6 giờ ổn định gần nhất (Đơn vị/giờ)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      max="30"
                      value={patient.ivRateLast6hAvg || ''}
                      onChange={(e) => onChangePatient({ ivRateLast6hAvg: parseFloat(e.target.value) || 0 })}
                      placeholder="VD: 1.5 U/h"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-teal-600 font-bold focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center bg-teal-500/10 p-2.5 rounded-xl border border-teal-500/20">
                    💡 Quy tắc chuyển đổi: TDD tiêm dưới da = 60 - 80% tổng liều IV 24h qua. Tiêm insulin nền dưới da ít nhất 1-2 giờ trước khi ngắt dây truyền tĩnh mạch.
                  </div>
                </div>
              )}
            </div>

            {/* Prior Home Insulin */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="priorInsulin"
                  checked={patient.isPriorInsulinTreated}
                  onChange={(e) => onChangePatient({ isPriorInsulinTreated: e.target.checked })}
                  className="w-4 h-4 accent-teal-600 rounded cursor-pointer"
                />
                <label htmlFor="priorInsulin" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  Đã từng dùng Insulin ngoại trú tại nhà
                </label>
              </div>

              {patient.isPriorInsulinTreated && (
                <div>
                  <input
                    type="number"
                    value={patient.priorHomeTdd || ''}
                    onChange={(e) => onChangePatient({ priorHomeTdd: parseFloat(e.target.value) || 0 })}
                    placeholder="Tổng liều tại nhà (ĐV/ngày)"
                    className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-teal-500"
                  />
                  <span className="text-[10px] text-slate-500">Khuyến cáo giảm 20-25% liều khi nhập viện</span>
                </div>
              )}
            </div>

            {/* Current Oral Antidiabetic Medications */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Thuốc hạ đường huyết đường uống (OAD) đang dùng trước đó:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'metformin', name: 'Metformin (Glucophage)' },
                  { id: 'gliclazide', name: 'Sulfonylurea (Gliclazide/Glimepiride)' },
                  { id: 'dapagliflozin', name: 'SGLT2i (Dapagliflozin/Empagliflozin)' },
                  { id: 'linagliptin', name: 'DPP-4i (Linagliptin/Sitagliptin)' },
                  { id: 'pioglitazone', name: 'Pioglitazone (Actos)' },
                  { id: 'semaglutide', name: 'GLP-1 RA (Ozempic/Trulicity)' },
                ].map((med) => {
                  const isChecked = patient.currentOralMeds.includes(med.id);
                  return (
                    <button
                      key={med.id}
                      type="button"
                      onClick={() => toggleOralMed(med.id)}
                      className={`px-2.5 py-1.5 rounded-lg border text-left text-xs transition ${
                        isChecked
                          ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-semibold'
                          : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '} {med.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Lab Results & Clinical Context Triggers */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 3: Xét Nghiệm Đường Huyết & Hóa Sinh */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-100 dark:border-slate-700/60">
              <div className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400">
                <FlaskConical className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                Xét Nghiệm Đường Huyết & Hóa Sinh
              </h3>
            </div>

            {/* Current Glucose */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Đường Huyết Hiện Tại (Điểm đo) <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400">
                  {unit === 'mg_dl' ? 'mg/dL' : 'mmol/L'}
                </span>
              </div>
              <div className="flex space-x-2 items-center">
                <input
                  type="number"
                  step={unit === 'mmol_l' ? '0.1' : '1'}
                  value={patient.currentGlucose || ''}
                  onChange={(e) => handleCurrentGlucoseChange(e.target.value)}
                  className="w-full px-3 py-2 text-base font-extrabold rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="text-[11px] text-slate-500 flex justify-between">
                <span>Quy đổi: {unit === 'mg_dl' ? `${mgDlToMmolL(patient.currentGlucose)} mmol/L` : `${mmolLToMgDl(patient.currentGlucose)} mg/dL`}</span>
                <span className={patient.currentGlucose < (unit === 'mg_dl' ? 70 : 3.9) ? 'text-red-600 font-bold' : ''}>
                  {patient.currentGlucose < (unit === 'mg_dl' ? 70 : 3.9) ? '⚠️ HẠ ĐƯỜNG HUYẾT' : 'Ngưỡng điều trị: ≥180 mg/dL'}
                </span>
              </div>
            </div>

            {/* Fasting Glucose for Basal Titration */}
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Đường huyết đói sáng nay (Fasting BG) - Dùng chỉnh liều nền
              </label>
              <input
                type="number"
                step={unit === 'mmol_l' ? '0.1' : '1'}
                value={patient.fastingGlucose || ''}
                onChange={(e) => handleFastingGlucoseChange(e.target.value)}
                placeholder={unit === 'mg_dl' ? 'VD: 145 mg/dL' : 'VD: 8.0 mmol/L'}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Lab Values Grid */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  HbA1c (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={patient.hba1c || ''}
                  onChange={(e) => onChangePatient({ hba1c: parseFloat(e.target.value) || undefined })}
                  placeholder="VD: 8.5"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  eGFR (mL/phút)
                </label>
                <input
                  type="number"
                  value={patient.egfr || ''}
                  onChange={(e) => onChangePatient({ egfr: parseFloat(e.target.value) || undefined })}
                  placeholder="VD: 45"
                  className={`w-full px-2.5 py-1.5 text-xs rounded-lg border bg-slate-50 dark:bg-slate-900 ${
                    patient.egfr && patient.egfr < 30 ? 'border-red-500 text-red-500 font-bold' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Kali máu (K+ mmol/L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={patient.potassium || ''}
                  onChange={(e) => onChangePatient({ potassium: parseFloat(e.target.value) || undefined })}
                  placeholder="VD: 4.2"
                  className={`w-full px-2.5 py-1.5 text-xs rounded-lg border bg-slate-50 dark:bg-slate-900 ${
                    patient.potassium && patient.potassium < 3.5 ? 'border-red-500 text-red-500 font-bold' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Ceton máu (mmol/L)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={patient.bloodKetones || ''}
                  onChange={(e) => onChangePatient({ bloodKetones: parseFloat(e.target.value) || undefined })}
                  placeholder="VD: 0.2"
                  className={`w-full px-2.5 py-1.5 text-xs rounded-lg border bg-slate-50 dark:bg-slate-900 ${
                    patient.bloodKetones && patient.bloodKetones >= 3.0 ? 'border-red-500 text-red-500 font-bold' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Khí máu pH tĩnh mạch
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={patient.venousPh || ''}
                  onChange={(e) => onChangePatient({ venousPh: parseFloat(e.target.value) || undefined })}
                  placeholder="VD: 7.35"
                  className={`w-full px-2.5 py-1.5 text-xs rounded-lg border bg-slate-50 dark:bg-slate-900 ${
                    patient.venousPh && patient.venousPh < 7.3 ? 'border-red-500 text-red-500 font-bold' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Bicarbonate (mmol/L)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={patient.bicarbonate || ''}
                  onChange={(e) => onChangePatient({ bicarbonate: parseFloat(e.target.value) || undefined })}
                  placeholder="VD: 22"
                  className={`w-full px-2.5 py-1.5 text-xs rounded-lg border bg-slate-50 dark:bg-slate-900 ${
                    patient.bicarbonate && patient.bicarbonate < 15 ? 'border-red-500 text-red-500 font-bold' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Natri máu (Na+ mmol/L)
                </label>
                <input
                  type="number"
                  value={patient.sodium || ''}
                  onChange={(e) => onChangePatient({ sodium: parseFloat(e.target.value) || undefined })}
                  placeholder="VD: 138"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Clo máu (Cl- mmol/L)
                </label>
                <input
                  type="number"
                  value={patient.chloride || ''}
                  onChange={(e) => onChangePatient({ chloride: parseFloat(e.target.value) || undefined })}
                  placeholder="VD: 102"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>
            </div>

            {/* Quick Calculated Metrics Display */}
            {(effectiveOsm || anionGap) && (
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs space-y-1 text-slate-700 dark:text-slate-300">
                {effectiveOsm && (
                  <div className="flex justify-between">
                    <span>Áp lực thẩm thấu hiệu dụng:</span>
                    <span className={`font-bold ${effectiveOsm >= 320 ? 'text-red-500' : ''}`}>
                      {effectiveOsm} mOsm/kg {effectiveOsm >= 320 ? '(Ngưỡng HHS)' : ''}
                    </span>
                  </div>
                )}
                {anionGap && (
                  <div className="flex justify-between">
                    <span>Khoảng trống Anion (Anion Gap):</span>
                    <span className={`font-bold ${anionGap > 16 ? 'text-red-500' : ''}`}>
                      {anionGap} mmol/L {anionGap > 16 ? '(Tăng toan chuyển hóa)' : ''}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Card 4: Các Tình Huống Lâm Sàng Đặc Thù */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 dark:border-slate-700/60">
              <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">
                <Stethoscope className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-sm sm:text-base">
                Yếu Tố Nguy Cơ & Bối Cảnh Lâm Sàng
              </h3>
            </div>

            {/* Steroids Trigger */}
            <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Đang dùng Glucocorticoid (Corticoid)
                </span>
                <input
                  type="checkbox"
                  checked={patient.isTakingSteroids}
                  onChange={(e) => onChangePatient({ isTakingSteroids: e.target.checked })}
                  className="w-4 h-4 accent-teal-600 rounded cursor-pointer"
                />
              </div>
              {patient.isTakingSteroids && (
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <select
                    value={patient.steroidType || 'prednisolone'}
                    onChange={(e) => onChangePatient({ steroidType: e.target.value as any })}
                    className="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  >
                    <option value="prednisolone">Prednisolone</option>
                    <option value="dexamethasone">Dexamethasone</option>
                    <option value="methylprednisolone">Methylprednisolone</option>
                    <option value="hydrocortisone">Hydrocortisone</option>
                  </select>
                  <input
                    type="number"
                    value={patient.steroidDoseMg || ''}
                    onChange={(e) => onChangePatient({ steroidDoseMg: parseFloat(e.target.value) || 0 })}
                    placeholder="Liều (mg/ngày)"
                    className="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                </div>
              )}
            </div>

            {/* Surgery Trigger */}
            <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Có chỉ định Phẫu Thuật / Thủ thuật (Chu phẫu)
                </span>
                <input
                  type="checkbox"
                  checked={patient.isScheduledSurgery}
                  onChange={(e) => onChangePatient({ isScheduledSurgery: e.target.checked })}
                  className="w-4 h-4 accent-teal-600 rounded cursor-pointer"
                />
              </div>
              {patient.isScheduledSurgery && (
                <div className="text-xs space-y-1">
                  <label className="text-[11px] text-slate-500">Số bữa ăn dự kiến phải nhịn:</label>
                  <select
                    value={patient.surgeryFastingExpectedMeals || 'more_than_one'}
                    onChange={(e) => onChangePatient({ surgeryFastingExpectedMeals: e.target.value as any })}
                    className="w-full px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  >
                    <option value="one_meal">Nhịn 1 bữa (Thủ thuật ngắn)</option>
                    <option value="more_than_one">Nhịn &gt; 1 bữa (Cân nhắc phác đồ VRIII)</option>
                  </select>
                </div>
              )}
            </div>

            {/* Dialysis Trigger */}
            <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Bệnh nhân Chạy Thận / Lọc Màng Bụng
                </span>
                <input
                  type="checkbox"
                  checked={patient.isOnDialysis}
                  onChange={(e) => onChangePatient({ isOnDialysis: e.target.checked })}
                  className="w-4 h-4 accent-teal-600 rounded cursor-pointer"
                />
              </div>
              {patient.isOnDialysis && (
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                  <select
                    value={patient.dialysisType || 'hemodialysis'}
                    onChange={(e) => onChangePatient({ dialysisType: e.target.value as any })}
                    className="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  >
                    <option value="hemodialysis">Chạy thận nhân tạo (HD)</option>
                    <option value="peritoneal">Lọc màng bụng (PD)</option>
                  </select>
                  {patient.dialysisType === 'hemodialysis' ? (
                    <label className="flex items-center space-x-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={patient.isDialysisDay}
                        onChange={(e) => onChangePatient({ isDialysisDay: e.target.checked })}
                        className="accent-teal-600"
                      />
                      <span className="text-[11px] font-medium">Hôm nay là ngày lọc máu</span>
                    </label>
                  ) : (
                    <select
                      value={patient.pdFluidType || 'glucose_based'}
                      onChange={(e) => onChangePatient({ pdFluidType: e.target.value as any })}
                      className="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    >
                      <option value="glucose_based">Dịch Glucose</option>
                      <option value="icodextrin">Dịch Icodextrin (Extraneal)</option>
                    </select>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
