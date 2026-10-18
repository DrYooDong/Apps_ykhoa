import React from 'react';
import { 
  PatientData, 
  PatientType, 
  ClinicalSetting, 
  InfectionSource 
} from '../types/sepsis';
import { calculateMAP, calculateNLR, calculateLactateClearance } from '../utils/calculators';
import { 
  Heart, 
  Wind, 
  Thermometer, 
  Brain, 
  Droplet, 
  TestTube, 
  ShieldAlert, 
  AlertTriangle,
  HelpCircle,
  Dna,
  ArrowRight
} from 'lucide-react';

interface PatientFormProps {
  data: PatientData;
  onChange: (updated: PatientData) => void;
  onEvaluate: () => void;
}

export const PatientForm: React.FC<PatientFormProps> = ({ data, onChange, onEvaluate }) => {
  const map = calculateMAP(data.sbp, data.dbp);
  const nlrCalc = calculateNLR(data.neutrophilCount, data.lymphocyteCount);
  const lactateKinetics = calculateLactateClearance(data.lactateInitial, data.lactateRepeat6h);

  const update = <K extends keyof PatientData>(field: K, value: PatientData[K]) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const updateVasoactive = (key: keyof PatientData['vasoactiveUsed'], val: boolean) => {
    const updatedUsed = {
      ...data.vasoactiveUsed,
      [key]: val
    };
    const count = Object.values(updatedUsed).filter(Boolean).length;
    onChange({
      ...data,
      vasoactiveUsed: updatedUsed,
      vasoactiveMedCount: count
    });
  };

  return (
    <div className="space-y-6 pb-20 md:pb-8">
      {/* 1. Header & Quick Status Strip */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block"></span>
              Thu Thập Thông Tin Lâm Sàng Người Bệnh
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Hệ thống tự động tích hợp chuẩn NICE NG253 (2024/2026), Sepsis-3, Phoenix 2024, Obstetric SOFA và LP-NEWS
            </p>
          </div>

          <button
            onClick={onEvaluate}
            className="w-full md:w-auto px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <span>Phân Tích & Xem Kết Quả CDSS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Thông tin hành chính & Phân loại đối tượng */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nhóm đối tượng bệnh nhân *
            </label>
            <select
              value={data.patientType}
              onChange={(e) => update('patientType', e.target.value as PatientType)}
              className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-medium"
            >
              <option value="adult">Người lớn (≥ 18 tuổi - Sepsis-3 & NICE)</option>
              <option value="pediatric">Nhi khoa (&lt; 18 tuổi - Chuẩn Phoenix 2024)</option>
              <option value="maternal">Sản phụ khoa (Thai kỳ / Hậu sản)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Bối cảnh / Môi trường khám *
            </label>
            <select
              value={data.setting}
              onChange={(e) => update('setting', e.target.value as ClinicalSetting)}
              className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="acute_hospital">Bệnh viện cấp cứu / Khoa phòng nội trú</option>
              <option value="icu">Hồi sức tích cực (ICU / CVIU)</option>
              <option value="emergency_ambulance">Xe cấp cứu / Vận chuyển tiền viện</option>
              <option value="community_custodial">Cơ sở y tế ban đầu / Trạm y tế / Cộng đồng</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Họ tên & Mã bệnh nhân
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={data.patientName}
                onChange={(e) => update('patientName', e.target.value)}
                placeholder="Tên BN"
                className="w-2/3 h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              <input
                type="text"
                value={data.patientCode}
                onChange={(e) => update('patientCode', e.target.value)}
                placeholder="Mã số"
                className="w-1/3 h-10 px-2 text-xs font-mono bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {data.patientType === 'pediatric' ? 'Tuổi (Năm)' : 'Tuổi'}
              </label>
              <input
                type="number"
                min="0"
                max="120"
                value={data.ageYears}
                onChange={(e) => update('ageYears', Number(e.target.value))}
                className="w-full h-10 px-3 text-sm font-mono tabular-nums bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {data.patientType === 'pediatric' && data.ageYears < 2 && (
              <div className="w-24">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Số tháng
                </label>
                <input
                  type="number"
                  min="0"
                  max="24"
                  value={data.ageMonths ?? (data.ageYears * 12)}
                  onChange={(e) => update('ageMonths', Number(e.target.value))}
                  className="w-full h-10 px-2 text-sm font-mono tabular-nums bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            )}

            <div className="w-20">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Cân nặng
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="250"
                  value={data.weightKg}
                  onChange={(e) => update('weightKg', Number(e.target.value))}
                  className="w-full h-10 px-2 text-sm font-mono tabular-nums bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin đặc thù Sản khoa */}
        {data.patientType === 'maternal' && (
          <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200 rounded-lg flex flex-wrap items-center gap-4 text-xs">
            <span className="font-semibold text-amber-900">Chi tiết Sản khoa:</span>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={data.isPostpartum}
                onChange={(e) => update('isPostpartum', e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <span className="text-slate-800">Giai đoạn Hậu sản (≤ 4 tuần sau sinh)</span>
            </label>

            {!data.isPostpartum && (
              <div className="flex items-center gap-2">
                <span className="text-slate-700">Tuổi thai:</span>
                <input
                  type="number"
                  min="4"
                  max="42"
                  value={data.pregnancyWeek ?? 32}
                  onChange={(e) => update('pregnancyWeek', Number(e.target.value))}
                  className="w-16 h-8 px-2 text-xs font-mono bg-white border border-amber-300 rounded"
                />
                <span className="text-slate-600">tuần</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. Nhiễm trùng nghi ngờ & Các yếu tố nguy cơ cao theo NICE */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-3">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          Ổ Nhiễm Trùng & Các Yếu Tố Nguy Cơ Đặc Biệt (NICE Guideline NG253)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Trạng thái nghi ngờ nhiễm khuẩn *
            </label>
            <div className="flex items-center gap-4 h-10">
              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="suspectedInfection"
                  checked={data.suspectedInfection}
                  onChange={() => update('suspectedInfection', true)}
                  className="w-4 h-4 text-teal-600"
                />
                <span className="font-medium text-slate-800">Có nghi ngờ / Xác định</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="suspectedInfection"
                  checked={!data.suspectedInfection}
                  onChange={() => update('suspectedInfection', false)}
                  className="w-4 h-4 text-slate-400"
                />
                <span className="text-slate-600">Chưa ghi nhận</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Vị trí ổ nhiễm trùng tiên phát
            </label>
            <select
              value={data.infectionSource}
              onChange={(e) => update('infectionSource', e.target.value as InfectionSource)}
              className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              <option value="respiratory">Đường hô hấp (Viêm phổi, ARDS)</option>
              <option value="urinary">Đường tiết niệu (Viêm đài bể thận, bàng quang)</option>
              <option value="abdominal">Ổ bụng / Tiêu hóa (Viêm phúc mạc, thủng tạng)</option>
              <option value="skin_soft_tissue">Da & Mô mềm (Viêm mô tế bào, áp xe, loét tỳ đè)</option>
              <option value="bloodstream_catheter">Đường máu / Nhiễm khuẩn Catheter CVC/PICC</option>
              <option value="cns">Hệ thần kinh trung ương (Viêm màng não, não)</option>
              <option value="pelvic_obstetric">Tiểu khung / Sản khoa (Viêm nội mạc tử cung)</option>
              <option value="unknown">Chưa rõ ổ nhiễm tiên phát</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={data.feverOrRigors}
                onChange={(e) => update('feverOrRigors', e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <span>Có cơn sốt cao hoặc rét run gần đây (Rigors)</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={data.recentMultiplePresentations}
                onChange={(e) => update('recentMultiplePresentations', e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <span className="text-amber-800 font-medium">Đã khám lại nhiều lần trong đợt bệnh này</span>
            </label>
          </div>
        </div>

        {/* Các yếu tố cơ địa dễ tổn thương (Vulnerable groups) */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-700 block mb-2">
            Yếu tố nguy cơ cao theo NICE 1.2 (Tăng tính tổn thương):
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            <label className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 cursor-pointer hover:bg-slate-100">
              <input
                type="checkbox"
                checked={data.hasImmunosuppression}
                onChange={(e) => update('hasImmunosuppression', e.target.checked)}
                className="w-3.5 h-3.5 text-teal-600 rounded"
              />
              <span>Suy giảm MD / Hóa trị</span>
            </label>

            <label className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 cursor-pointer hover:bg-slate-100">
              <input
                type="checkbox"
                checked={data.hasRecentSurgery}
                onChange={(e) => update('hasRecentSurgery', e.target.checked)}
                className="w-3.5 h-3.5 text-teal-600 rounded"
              />
              <span>Phẫu thuật ≤ 6 tuần</span>
            </label>

            <label className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 cursor-pointer hover:bg-slate-100">
              <input
                type="checkbox"
                checked={data.hasIndwellingCatheter}
                onChange={(e) => update('hasIndwellingCatheter', e.target.checked)}
                className="w-3.5 h-3.5 text-teal-600 rounded"
              />
              <span>Catheter lưu / Sonde</span>
            </label>

            <label className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 cursor-pointer hover:bg-slate-100">
              <input
                type="checkbox"
                checked={data.hasSkinBreach}
                onChange={(e) => update('hasSkinBreach', e.target.checked)}
                className="w-3.5 h-3.5 text-teal-600 rounded"
              />
              <span>Tổn thương rách da</span>
            </label>

            <label className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 cursor-pointer hover:bg-slate-100">
              <input
                type="checkbox"
                checked={data.hasRepeatedAntibioticUse}
                onChange={(e) => update('hasRepeatedAntibioticUse', e.target.checked)}
                className="w-3.5 h-3.5 text-teal-600 rounded"
              />
              <span>Dùng KS lặp lại gần đây</span>
            </label>

            <label className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 cursor-pointer hover:bg-slate-100">
              <input
                type="checkbox"
                checked={data.communicationDifficulty}
                onChange={(e) => update('communicationDifficulty', e.target.checked)}
                className="w-3.5 h-3.5 text-teal-600 rounded"
              />
              <span>Khó giao tiếp / Sa sút</span>
            </label>
          </div>
        </div>
      </div>

      {/* 3. Sinh hiệu (Vital Signs) & Thần kinh */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-600" />
            Sinh Hiệu Cốt Lõi & Đánh Giá Tri Giác (NEWS2 & Huyết Động)
          </h3>
          <div className="text-xs text-slate-500 font-mono">
            Huyết áp trung bình MAP: <span className="font-bold text-slate-800">{map} mmHg</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Huyết áp tâm thu */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              HA Tâm thu (mmHg)
            </label>
            <input
              type="number"
              value={data.sbp}
              onChange={(e) => update('sbp', Number(e.target.value))}
              className={`w-full h-11 px-3 text-base font-mono tabular-nums border rounded-lg focus:ring-2 focus:ring-teal-500 ${
                data.sbp <= 90 ? 'border-rose-400 bg-rose-50 text-rose-900 font-semibold' : 'border-slate-300'
              }`}
            />
          </div>

          {/* Huyết áp tâm trương */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              HA Tâm trương (mmHg)
            </label>
            <input
              type="number"
              value={data.dbp}
              onChange={(e) => update('dbp', Number(e.target.value))}
              className="w-full h-11 px-3 text-base font-mono tabular-nums border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Nhịp tim */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Nhịp tim (bpm)
            </label>
            <input
              type="number"
              value={data.heartRate}
              onChange={(e) => update('heartRate', Number(e.target.value))}
              className={`w-full h-11 px-3 text-base font-mono tabular-nums border rounded-lg focus:ring-2 focus:ring-teal-500 ${
                data.heartRate > 130 ? 'border-rose-400 bg-rose-50 text-rose-900 font-semibold' : 'border-slate-300'
              }`}
            />
          </div>

          {/* Tần số thở */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Tần số thở (lần/phút)
            </label>
            <input
              type="number"
              value={data.respiratoryRate}
              onChange={(e) => update('respiratoryRate', Number(e.target.value))}
              className={`w-full h-11 px-3 text-base font-mono tabular-nums border rounded-lg focus:ring-2 focus:ring-teal-500 ${
                data.respiratoryRate >= 25 ? 'border-rose-400 bg-rose-50 text-rose-900 font-semibold' : 'border-slate-300'
              }`}
            />
          </div>

          {/* Thân nhiệt */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Thân nhiệt (°C)
            </label>
            <input
              type="number"
              step="0.1"
              value={data.temperature}
              onChange={(e) => update('temperature', Number(e.target.value))}
              className={`w-full h-11 px-3 text-base font-mono tabular-nums border rounded-lg focus:ring-2 focus:ring-teal-500 ${
                data.temperature <= 35 || data.temperature >= 39 ? 'border-amber-400 bg-amber-50 text-amber-900' : 'border-slate-300'
              }`}
            />
          </div>

          {/* SpO2 */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              SpO2 (%)
            </label>
            <input
              type="number"
              value={data.spo2}
              onChange={(e) => update('spo2', Number(e.target.value))}
              className={`w-full h-11 px-3 text-base font-mono tabular-nums border rounded-lg focus:ring-2 focus:ring-teal-500 ${
                data.spo2 <= 91 ? 'border-rose-400 bg-rose-50 text-rose-900 font-semibold' : 'border-slate-300'
              }`}
            />
          </div>
        </div>

        {/* Hỗ trợ hô hấp & Tăng CO2 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={data.onSupplementalOxygen}
                onChange={(e) => update('onSupplementalOxygen', e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <span>Thở Oxy hỗ trợ</span>
            </label>

            {data.onSupplementalOxygen && (
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-500">FiO2:</span>
                <input
                  type="number"
                  min="21"
                  max="100"
                  value={data.fio2Percent}
                  onChange={(e) => update('fio2Percent', Number(e.target.value))}
                  className="w-16 h-8 px-2 text-xs font-mono bg-white border border-slate-300 rounded"
                />
                <span className="text-xs text-slate-500">%</span>
              </div>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={data.copdOrHypercapnicRisk}
                onChange={(e) => update('copdOrHypercapnicRisk', e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <span>Nguy cơ tăng CO2 (NEWS2 SpO2 Thang 2: Đích 88-92%)</span>
            </label>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-700">
              <input
                type="checkbox"
                checked={data.invasiveMechanicalVentilation}
                onChange={(e) => update('invasiveMechanicalVentilation', e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded"
              />
              <span className="font-semibold text-rose-900">Thở máy xâm lấn (IMV)</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-700">
              <input
                type="checkbox"
                checked={data.nonInvasiveVentilation}
                onChange={(e) => update('nonInvasiveVentilation', e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <span>NIV / HFNC</span>
            </label>
          </div>
        </div>

        {/* Tri giác & Thần kinh */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-3 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Thang điểm Tri giác AVPU
            </label>
            <select
              value={data.avpu}
              onChange={(e) => update('avpu', e.target.value as PatientData['avpu'])}
              className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              <option value="A">A - Alert (Tỉnh táo hoàn toàn)</option>
              <option value="V">V - Voice (Đáp ứng lời nói)</option>
              <option value="P">P - Pain (Chỉ đáp ứng kích thích đau)</option>
              <option value="U">U - Unresponsive (Mất tri giác hoàn toàn)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Điểm Glasgow GCS (3 - 15)
            </label>
            <input
              type="number"
              min="3"
              max="15"
              value={data.gcs}
              onChange={(e) => update('gcs', Number(e.target.value))}
              className={`w-full h-10 px-3 text-sm font-mono tabular-nums border rounded-lg focus:ring-2 focus:ring-teal-500 ${
                data.gcs < 15 ? 'border-amber-400 bg-amber-50 text-amber-900 font-semibold' : 'border-slate-300'
              }`}
            />
          </div>

          <div className="flex flex-col justify-center">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={data.newAlteredMentalState}
                onChange={(e) => update('newAlteredMentalState', e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <span className="font-semibold text-amber-800">Lú lẫn / Thay đổi hành vi cấp</span>
            </label>
          </div>

          <div className="flex flex-col justify-center">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={data.bilateralFixedPupils}
                onChange={(e) => update('bilateralFixedPupils', e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded"
              />
              <span className="font-semibold text-rose-900">Đồng tử giãn cố định 2 bên (Phoenix 2đ)</span>
            </label>
          </div>
        </div>
      </div>

      {/* 4. Dấu hiệu Giảm tưới máu mô & Dấu hiệu da (NICE NG253 & SSC 2021) */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-3">
          <Droplet className="w-4 h-4 text-teal-600" />
          Dấu Hiệu Giảm Tưới Máu Mô, Da & Bài Tiết
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <label className={`p-3 rounded-lg border cursor-pointer transition-colors ${
            data.mottledOrAshen ? 'bg-rose-50 border-rose-300' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
          }`}>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.mottledOrAshen}
                onChange={(e) => update('mottledOrAshen', e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded"
              />
              <span className="text-xs font-semibold text-slate-900">Da vân đá / Tái xám (Mottled / Ashen)</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 pl-6">
              Dấu hiệu giảm tưới máu ngoại vi nghiêm trọng (NICE Red Flag)
            </p>
          </label>

          <label className={`p-3 rounded-lg border cursor-pointer transition-colors ${
            data.cyanosis ? 'bg-rose-50 border-rose-300' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
          }`}>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.cyanosis}
                onChange={(e) => update('cyanosis', e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded"
              />
              <span className="text-xs font-semibold text-slate-900">Tím tái da / Môi / Lưỡi (Cyanosis)</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 pl-6">
              Cảnh báo thiếu oxy mô nặng hoặc sốc (NICE Red Flag)
            </p>
          </label>

          <label className={`p-3 rounded-lg border cursor-pointer transition-colors ${
            data.nonBlanchingRash ? 'bg-rose-50 border-rose-300' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
          }`}>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.nonBlanchingRash}
                onChange={(e) => update('nonBlanchingRash', e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded"
              />
              <span className="text-xs font-semibold text-slate-900">Ban xuất huyết không mất màu</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 pl-6">
              Petechial / Purpuric rash nghi ngờ nhiễm não mô cầu
            </p>
          </label>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Thời gian hồi phục màu da CRT (giây)
            </label>
            <input
              type="number"
              step="0.5"
              value={data.capillaryRefillSeconds}
              onChange={(e) => update('capillaryRefillSeconds', Number(e.target.value))}
              placeholder="giây"
              className={`w-full h-10 px-3 text-sm font-mono border rounded-lg focus:ring-2 focus:ring-teal-500 ${
                data.capillaryRefillSeconds > 2 ? 'border-amber-400 bg-amber-50' : 'border-slate-300'
              }`}
            />
            <p className="text-[10px] text-slate-500 mt-1">Đích ANDROMEDA-SHOCK: CRT ≤ 2.0s</p>
          </div>
        </div>

        {/* Lượng nước tiểu & Vận mạch */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pt-3 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tình trạng bài tiết nước tiểu (18h qua)
            </label>
            <select
              value={data.urineOutputStatus}
              onChange={(e) => update('urineOutputStatus', e.target.value as PatientData['urineOutputStatus'])}
              className="w-full h-10 px-3 text-sm bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            >
              <option value="normal">Tiểu bình thường (&gt; 0.5 mL/kg/h)</option>
              <option value="not_12_18h">Không tiểu trong 12 - 18 giờ (Thiểu niệu)</option>
              <option value="not_over_18h">Không tiểu trong &gt; 18 giờ (Vô niệu - Nguy cơ rất cao)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nước tiểu qua sonde (mL/kg/giờ)
            </label>
            <input
              type="number"
              step="0.1"
              value={data.urineOutputMlKgHr ?? ''}
              onChange={(e) => update('urineOutputMlKgHr', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="VD: 0.4 mL/kg/h"
              className="w-full h-10 px-3 text-sm font-mono bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Thuốc vận mạch đang sử dụng ({data.vasoactiveMedCount} loại)
            </label>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {(['norepinephrine', 'epinephrine', 'vasopressin', 'dopamine', 'dobutamine'] as const).map((drug) => (
                <button
                  type="button"
                  key={drug}
                  onClick={() => updateVasoactive(drug, !data.vasoactiveUsed[drug])}
                  className={`px-2 py-1 text-xs rounded-md border font-medium transition-colors ${
                    data.vasoactiveUsed[drug]
                      ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {drug === 'norepinephrine' && 'Nor'}
                  {drug === 'epinephrine' && 'Epi'}
                  {drug === 'vasopressin' && 'Vaso'}
                  {drug === 'dopamine' && 'Dopa'}
                  {drug === 'dobutamine' && 'Dobu'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Cận lâm sàng, Động học Lactate & Dấu ấn Sinh học (LP-NEWS, NLR, PCT, CRP) */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <TestTube className="w-4 h-4 text-cyan-600" />
            Cận Lâm Sàng & Dấu Ấn Sinh Học (Biomarkers & Động Học)
          </h3>
          <div className="flex items-center gap-3 text-xs font-mono">
            {nlrCalc.nlr && (
              <span className={`px-2 py-0.5 rounded ${nlrCalc.riskLevel === 'high' ? 'bg-rose-100 text-rose-800 font-bold' : 'text-slate-600'}`}>
                NLR: {nlrCalc.nlr}
              </span>
            )}
            {lactateKinetics.clearancePercent !== undefined && (
              <span className={`px-2 py-0.5 rounded ${lactateKinetics.evaluation === 'adequate' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                Thanh thải: {lactateKinetics.clearancePercent}%
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Lactate ban đầu */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Lactate 0h (mmol/L) *
            </label>
            <input
              type="number"
              step="0.1"
              value={data.lactateInitial ?? ''}
              onChange={(e) => update('lactateInitial', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="VD: 3.5"
              className={`w-full h-11 px-3 text-base font-mono tabular-nums border rounded-lg focus:ring-2 focus:ring-teal-500 ${
                (data.lactateInitial ?? 0) > 2.0 ? 'border-rose-400 bg-rose-50 text-rose-900 font-semibold' : 'border-slate-300'
              }`}
            />
          </div>

          {/* Lactate lặp lại 2-6h */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Lactate 6h (mmol/L)
            </label>
            <input
              type="number"
              step="0.1"
              value={data.lactateRepeat6h ?? ''}
              onChange={(e) => update('lactateRepeat6h', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="VD: 2.1"
              className="w-full h-11 px-3 text-base font-mono tabular-nums border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Procalcitonin */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Procalcitonin (ng/mL)
            </label>
            <input
              type="number"
              step="0.1"
              value={data.procalcitonin ?? ''}
              onChange={(e) => update('procalcitonin', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="VD: 5.4"
              className={`w-full h-11 px-3 text-base font-mono tabular-nums border rounded-lg focus:ring-2 focus:ring-teal-500 ${
                (data.procalcitonin ?? 0) >= 2.0 ? 'border-cyan-400 bg-cyan-50 text-cyan-900 font-semibold' : 'border-slate-300'
              }`}
            />
          </div>

          {/* CRP */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              CRP (mg/L)
            </label>
            <input
              type="number"
              value={data.crp ?? ''}
              onChange={(e) => update('crp', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="VD: 120"
              className={`w-full h-11 px-3 text-base font-mono tabular-nums border rounded-lg focus:ring-2 focus:ring-teal-500 ${
                (data.crp ?? 0) > 100 ? 'border-amber-400 bg-amber-50 text-amber-900' : 'border-slate-300'
              }`}
            />
          </div>

          {/* Neutrophils */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Neutrophils (x10⁹/L)
            </label>
            <input
              type="number"
              step="0.1"
              value={data.neutrophilCount ?? ''}
              onChange={(e) => update('neutrophilCount', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="VD: 14.5"
              className="w-full h-11 px-3 text-base font-mono tabular-nums border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Lymphocytes */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Lymphocytes (x10⁹/L)
            </label>
            <input
              type="number"
              step="0.1"
              value={data.lymphocyteCount ?? ''}
              onChange={(e) => update('lymphocyteCount', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="VD: 1.2"
              className="w-full h-11 px-3 text-base font-mono tabular-nums border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Các xét nghiệm tạng bổ sung cho SOFA & Phoenix */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-4 pt-3 border-t border-slate-100">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Tiểu cầu (x10³/µL)
            </label>
            <input
              type="number"
              value={data.platelets ?? ''}
              onChange={(e) => update('platelets', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="VD: 120"
              className="w-full h-10 px-3 text-sm font-mono border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Bilirubin (µmol/L)
            </label>
            <input
              type="number"
              value={data.bilirubinUmolL ?? ''}
              onChange={(e) => update('bilirubinUmolL', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="VD: 25"
              className="w-full h-10 px-3 text-sm font-mono border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Creatinine (µmol/L)
            </label>
            <input
              type="number"
              value={data.creatinineUmolL ?? ''}
              onChange={(e) => update('creatinineUmolL', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="VD: 150"
              className="w-full h-10 px-3 text-sm font-mono border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              PaO2 (mmHg - nếu có)
            </label>
            <input
              type="number"
              value={data.pao2 ?? ''}
              onChange={(e) => update('pao2', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="VD: 75"
              className="w-full h-10 px-3 text-sm font-mono border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              INR Đông máu
            </label>
            <input
              type="number"
              step="0.05"
              value={data.inr ?? ''}
              onChange={(e) => update('inr', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="VD: 1.35"
              className="w-full h-10 px-3 text-sm font-mono border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              D-dimer (mg/L FEU)
            </label>
            <input
              type="number"
              step="0.1"
              value={data.dDimerMgL ?? ''}
              onChange={(e) => update('dDimerMgL', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="VD: 2.5"
              className="w-full h-10 px-3 text-sm font-mono border border-slate-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* 6. Vi sinh & Công nghệ Phân tử Nhanh T2Bacteria (Biomedicines 2026) */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 shadow-sm">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-3">
          <Dna className="w-4 h-4 text-purple-600" />
          Vi Sinh & Chẩn Đoán Phân Tử Nhanh (Cấy Máu & T2Bacteria / T2Resistance)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
            <span className="text-xs font-bold text-slate-800 block">Cấy máu thông thường (Gold Standard)</span>
            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={data.bloodCultureCollected}
                onChange={(e) => update('bloodCultureCollected', e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <span className="font-medium">Đã lấy 2 bộ cấy máu (hiếu khí & kỵ khí) trước khi dùng KS</span>
            </label>

            <div className="flex gap-2">
              <select
                value={data.bloodCultureResult ?? 'pending'}
                onChange={(e) => update('bloodCultureResult', e.target.value as any)}
                className="text-xs h-9 px-2 bg-white border border-slate-300 rounded"
              >
                <option value="pending">Đang nuôi cấy (Chờ kết quả ~48-120h)</option>
                <option value="positive">Cấy dương tính</option>
                <option value="negative">Cấy âm tính (No growth)</option>
              </select>

              {data.bloodCultureResult === 'positive' && (
                <input
                  type="text"
                  placeholder="Tên vi khuẩn mọc"
                  value={data.bloodCultureOrganism ?? ''}
                  onChange={(e) => update('bloodCultureOrganism', e.target.value)}
                  className="flex-1 text-xs h-9 px-2 bg-white border border-slate-300 rounded"
                />
              )}
            </div>
          </div>

          <div className="p-3 bg-purple-50/60 border border-purple-200 rounded-lg space-y-3">
            <span className="text-xs font-bold text-purple-900 block flex items-center justify-between">
              <span>Chẩn đoán phân tử siêu tốc T2MR (T2Bacteria / T2Resistance)</span>
              <span className="text-[10px] text-purple-700 font-normal">Kết quả trong 3-5h</span>
            </span>

            <label className="flex items-center gap-2 text-xs text-purple-900 cursor-pointer">
              <input
                type="checkbox"
                checked={data.rapidMolecularT2Done}
                onChange={(e) => update('rapidMolecularT2Done', e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded"
              />
              <span className="font-medium">Đã thực hiện bảng T2Bacteria từ máu toàn phần</span>
            </label>

            {data.rapidMolecularT2Done && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <select
                    value={data.rapidMolecularResult ?? 'pending'}
                    onChange={(e) => update('rapidMolecularResult', e.target.value as any)}
                    className="text-xs h-9 px-2 bg-white border border-purple-300 rounded"
                  >
                    <option value="pending">Đang chạy máy T2MR (~4h)</option>
                    <option value="positive">Dương tính (Phát hiện vi khuẩn trên panel)</option>
                    <option value="negative">Âm tính trên panel T2</option>
                  </select>

                  {data.rapidMolecularResult === 'positive' && (
                    <select
                      value={data.rapidMolecularPathogen ?? 'Klebsiella pneumoniae'}
                      onChange={(e) => update('rapidMolecularPathogen', e.target.value)}
                      className="flex-1 text-xs h-9 px-2 bg-white border border-purple-300 rounded font-semibold"
                    >
                      <option value="Klebsiella pneumoniae">Klebsiella pneumoniae</option>
                      <option value="Pseudomonas aeruginosa">Pseudomonas aeruginosa</option>
                      <option value="Acinetobacter baumannii">Acinetobacter baumannii</option>
                      <option value="Staphylococcus aureus">Staphylococcus aureus</option>
                      <option value="Enterococcus faecium">Enterococcus faecium</option>
                      <option value="Escherichia coli">Escherichia coli</option>
                    </select>
                  )}
                </div>

                {data.rapidMolecularResult === 'positive' && (
                  <div>
                    <span className="text-[11px] text-purple-800 font-medium block mb-1">
                      Gen kháng thuốc phát hiện (T2Resistance):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {['blaKPC', 'blaOXA-48', 'blaCTX-M', 'blaNDM', 'vanA/B', 'mecA/C'].map((gene) => {
                        const currentGenes = data.rapidMolecularResistanceGenes || [];
                        const isSelected = currentGenes.includes(gene);
                        return (
                          <button
                            type="button"
                            key={gene}
                            onClick={() => {
                              const next = isSelected
                                ? currentGenes.filter((g) => g !== gene)
                                : [...currentGenes, gene];
                              update('rapidMolecularResistanceGenes', next);
                            }}
                            className={`px-2 py-0.5 text-[11px] font-mono rounded border transition-colors ${
                              isSelected
                                ? 'bg-purple-700 text-white border-purple-700 shadow-sm'
                                : 'bg-white text-purple-900 border-purple-300 hover:bg-purple-100'
                            }`}
                          >
                            {gene}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating CTA Submit Button for quick evaluation */}
      <div className="pt-2">
        <button
          onClick={onEvaluate}
          className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
        >
          <span>Đánh Giá Khẩn Cấp & Xem Toàn Bộ Phân Tầng CDSS</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
