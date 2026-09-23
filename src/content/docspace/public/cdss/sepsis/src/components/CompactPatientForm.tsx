import React, { useState } from 'react';
import { 
  PatientData, 
  PatientType, 
  ClinicalSetting, 
  InfectionSource 
} from '../types/sepsis';
import { calculateMAP, calculateNLR, calculateLactateClearance } from '../utils/calculators';
import { SmartNumberInput } from './SmartNumberInput';
import { 
  Heart, 
  Droplet, 
  TestTube, 
  ShieldAlert, 
  Dna, 
  User, 
  AlertCircle,
  ChevronsUp,
  ChevronsDown,
  ChevronsRight,
  ChevronsLeft,
  Layers
} from 'lucide-react';

interface CompactPatientFormProps {
  data: PatientData;
  onChange: (updated: PatientData) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const CompactPatientForm: React.FC<CompactPatientFormProps> = ({ 
  data, 
  onChange,
  isCollapsed: externalIsCollapsed,
  onToggleCollapse: externalOnToggleCollapse
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(false);
  const isAllCollapsed = externalIsCollapsed !== undefined ? externalIsCollapsed : internalCollapsed;
  const toggleCollapse = externalOnToggleCollapse || (() => setInternalCollapsed(!internalCollapsed));

  const map = calculateMAP(data.sbp, data.dbp);
  const nlrCalc = calculateNLR(data.neutrophilCount, data.lymphocyteCount);
  const lactateKinetics = calculateLactateClearance(data.lactateInitial, data.lactateRepeat6h);

  const getSettingLabel = (setting: ClinicalSetting) => {
    switch (setting) {
      case 'acute_hospital': return 'Cấp cứu / Khoa phòng';
      case 'icu': return 'ICU / Hồi sức';
      case 'emergency_ambulance': return 'Tiền viện / Cấp cứu 115';
      case 'community_custodial': return 'Trạm y tế / Ban đầu';
      default: return '';
    }
  };

  const getInfectionSourceLabel = (src: InfectionSource) => {
    switch (src) {
      case 'respiratory': return 'Hô hấp';
      case 'urinary': return 'Tiết niệu';
      case 'abdominal': return 'Ổ bụng';
      case 'skin_soft_tissue': return 'Da/Mô mềm';
      case 'bloodstream_catheter': return 'Máu/Catheter';
      case 'pelvic_obstetric': return 'Sản phụ khoa';
      default: return 'Chưa rõ';
    }
  };

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

  if (isAllCollapsed) {
    return (
      <div className="w-full">
        {/* Collapsed Desktop View: Slim Vertical Icon Rail */}
        <div className="hidden lg:flex flex-col items-center py-3 px-1 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3 sticky top-4">
          <button
            type="button"
            onClick={toggleCollapse}
            className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-xs transition-all active:scale-95"
            title="Bấm để mở rộng bảng dữ liệu bệnh nhân"
          >
            <ChevronsRight className="w-5 h-5" />
          </button>

          <div className="w-7 h-px bg-slate-200 my-0.5" />

          {/* 1. Icon Đối tượng */}
          <button
            type="button"
            onClick={toggleCollapse}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-teal-600 transition-all hover:scale-105"
            title={`1. Thông tin đối tượng (${data.patientType === 'adult' ? 'Người lớn' : data.patientType === 'pediatric' ? 'Nhi' : 'Sản khoa'}, ${data.ageYears} tuổi)`}
          >
            <User className="w-5 h-5" />
          </button>

          {/* 2. Icon Sinh hiệu & Huyết động */}
          <button
            type="button"
            onClick={toggleCollapse}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-rose-600 transition-all hover:scale-105 relative"
            title={`2. Sinh hiệu & Huyết động (HA: ${data.sbp}/${data.dbp}, MAP: ${map}, HR: ${data.heartRate} bpm, RR: ${data.respiratoryRate})`}
          >
            <Heart className="w-5 h-5" />
            {map < 65 && (
              <span className="w-2 h-2 rounded-full bg-rose-600 absolute top-1 right-1 ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* 3. Icon Da, Tưới máu & Vận mạch */}
          <button
            type="button"
            onClick={toggleCollapse}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 text-teal-600 transition-all hover:scale-105 relative"
            title={`3. Da, Tưới máu mô & Vận mạch (${data.vasoactiveMedCount > 0 ? `${data.vasoactiveMedCount} thuốc VM` : 'Không VM'}, CRT: ${data.capillaryRefillSeconds}s)`}
          >
            <Droplet className="w-5 h-5" />
            {(data.mottledOrAshen || data.vasoactiveMedCount > 0) && (
              <span className="w-2 h-2 rounded-full bg-rose-600 absolute top-1 right-1 ring-2 ring-white" />
            )}
          </button>

          {/* 4. Icon Cận lâm sàng & Vi sinh */}
          <button
            type="button"
            onClick={toggleCollapse}
            className="p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-300 text-cyan-600 transition-all hover:scale-105"
            title={`4. Cận lâm sàng: TPTTBM, Biomarkers & Vi sinh (WBC: ${data.wbc ?? 'N/A'}, Lac: ${data.lactateInitial ?? 'N/A'})`}
          >
            <TestTube className="w-5 h-5" />
          </button>
        </div>

        {/* Collapsed Mobile View: Slim Horizontal Bar */}
        <div className="flex lg:hidden items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <button
            type="button"
            onClick={toggleCollapse}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-teal-600 text-white rounded-lg shadow-2xs active:scale-95"
          >
            <ChevronsRight className="w-4 h-4" />
            <span>Mở rộng</span>
          </button>

          <div className="flex items-center gap-2">
            <button type="button" onClick={toggleCollapse} className="p-2 rounded-lg bg-slate-50 text-teal-600 border border-slate-200" title="Thông tin đối tượng">
              <User className="w-4 h-4" />
            </button>
            <button type="button" onClick={toggleCollapse} className="p-2 rounded-lg bg-slate-50 text-rose-600 border border-slate-200 relative" title="Sinh hiệu & Huyết động">
              <Heart className="w-4 h-4" />
              {map < 65 && <span className="w-1.5 h-1.5 rounded-full bg-rose-600 absolute top-0.5 right-0.5" />}
            </button>
            <button type="button" onClick={toggleCollapse} className="p-2 rounded-lg bg-slate-50 text-teal-600 border border-slate-200 relative" title="Da & Vận mạch">
              <Droplet className="w-4 h-4" />
              {(data.mottledOrAshen || data.vasoactiveMedCount > 0) && <span className="w-1.5 h-1.5 rounded-full bg-rose-600 absolute top-0.5 right-0.5" />}
            </button>
            <button type="button" onClick={toggleCollapse} className="p-2 rounded-lg bg-slate-50 text-cyan-600 border border-slate-200" title="Cận lâm sàng & Vi sinh">
              <TestTube className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      {/* Nút điều khiển Thu gọn / Mở rộng ĐỒNG LOẠT toàn bộ các bảng */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-r from-slate-100 via-slate-50 to-teal-50/60 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-2 text-slate-800">
          <Layers className="w-4 h-4 text-teal-600" />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block leading-tight">
              Bảng Dữ Liệu Bệnh Nhân
            </span>
            <span className="text-[10px] text-slate-500 block leading-tight">
              Đang mở rộng 4 bảng nhập liệu chi tiết
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleCollapse}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg shadow-2xs transition-all active:scale-[0.98] bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400"
          title="Bấm để thu gọn bảng dữ liệu thành các biểu tượng icon"
        >
          <ChevronsLeft className="w-4 h-4 text-slate-500" />
          <span>Thu gọn</span>
        </button>
      </div>

      {/* 1. Nhóm đối tượng & Hành chính nhanh */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm transition-all overflow-hidden">
        <div className="p-3.5 flex items-center justify-between gap-2 bg-white border-b border-slate-100">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 shrink-0">
              <User className="w-3.5 h-3.5 text-teal-600" />
              Thông Tin Đối Tượng
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Bộ chuyển đối tượng nhanh */}
            <div className="hidden sm:flex items-center gap-1">
              <button
                type="button"
                onClick={() => update('patientType', 'adult')}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded-md border transition-colors ${
                  data.patientType === 'adult'
                    ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Người lớn
              </button>
              <button
                type="button"
                onClick={() => update('patientType', 'pediatric')}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded-md border transition-colors ${
                  data.patientType === 'pediatric'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Nhi (&lt;18t)
              </button>
              <button
                type="button"
                onClick={() => update('patientType', 'maternal')}
                className={`px-2 py-0.5 text-[11px] font-semibold rounded-md border transition-colors ${
                  data.patientType === 'maternal'
                    ? 'bg-pink-600 text-white border-pink-600 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Sản khoa
              </button>
            </div>
          </div>
        </div>

        {/* Nội dung chi tiết */}
        <div className="p-3.5 pt-3 space-y-3">
            {/* Bộ chuyển đổi trên mobile nếu màn hình hẹp */}
            <div className="flex sm:hidden items-center gap-1 pb-1 border-b border-slate-100">
              <button
                type="button"
                onClick={() => update('patientType', 'adult')}
                className={`flex-1 py-1 text-[11px] font-semibold rounded-md border text-center transition-colors ${
                  data.patientType === 'adult'
                    ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                Người lớn
              </button>
              <button
                type="button"
                onClick={() => update('patientType', 'pediatric')}
                className={`flex-1 py-1 text-[11px] font-semibold rounded-md border text-center transition-colors ${
                  data.patientType === 'pediatric'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                Nhi (&lt;18t)
              </button>
              <button
                type="button"
                onClick={() => update('patientType', 'maternal')}
                className={`flex-1 py-1 text-[11px] font-semibold rounded-md border text-center transition-colors ${
                  data.patientType === 'maternal'
                    ? 'bg-pink-600 text-white border-pink-600 shadow-xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                Sản khoa
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <label className="text-[11px] font-medium text-slate-500 block mb-0.5">
                  {data.patientType === 'pediatric' ? 'Tuổi (Năm)' : 'Tuổi'}
                </label>
                <SmartNumberInput
                  placeholder="Tuổi"
                  value={data.ageYears}
                  fallbackValue={data.patientType === 'pediatric' ? 5 : 45}
                  min={0}
                  max={120}
                  onChange={(v) => update('ageYears', v ?? 45)}
                  className="w-full h-8 px-2 text-xs font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-1 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-500 block mb-0.5">Giới tính</label>
                <select
                  value={data.gender}
                  onChange={(e) => update('gender', e.target.value as 'male' | 'female')}
                  className="w-full h-8 px-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-1 focus:ring-teal-500"
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-500 block mb-0.5">Cân nặng (kg)</label>
                <SmartNumberInput
                  placeholder="kg"
                  value={data.weightKg}
                  isDecimal
                  fallbackValue={60}
                  min={1}
                  max={250}
                  onChange={(v) => update('weightKg', v ?? 60)}
                  className="w-full h-8 px-2 text-xs font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
              <span className="text-[11px] text-slate-500 shrink-0">Bối cảnh:</span>
              <select
                value={data.setting}
                onChange={(e) => update('setting', e.target.value as ClinicalSetting)}
                className="h-7 px-2 text-xs bg-slate-50 border border-slate-200 rounded-md flex-1 text-slate-800"
              >
                <option value="acute_hospital">Cấp cứu / Khoa phòng nội trú</option>
                <option value="icu">Hồi sức tích cực (ICU / CVIU)</option>
                <option value="emergency_ambulance">Xe cấp cứu / Tiền viện</option>
                <option value="community_custodial">Y tế ban đầu / Trạm xá</option>
              </select>
            </div>

            {data.patientType === 'maternal' && (
              <div className="p-2 bg-pink-50/70 border border-pink-200 rounded-md flex items-center justify-between text-xs text-pink-950">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={data.isPostpartum}
                    onChange={(e) => update('isPostpartum', e.target.checked)}
                    className="w-3.5 h-3.5 text-pink-600 rounded"
                  />
                  <span>Giai đoạn Hậu sản (≤ 4 tuần)</span>
                </label>
                {!data.isPostpartum && (
                  <div className="flex items-center gap-1">
                    <span>Tuần:</span>
                    <SmartNumberInput
                      value={data.pregnancyWeek ?? 32}
                      fallbackValue={32}
                      min={4}
                      max={44}
                      onChange={(v) => update('pregnancyWeek', v ?? 32)}
                      className="w-12 h-6 px-1 text-xs font-mono bg-white border border-pink-300 rounded"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
      </div>

      {/* 2. Lâm Sàng (LS): Sinh hiệu & Huyết động (Cốt lõi NEWS2) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm transition-all overflow-hidden">
        <div className="p-3.5 flex items-center justify-between gap-2 bg-white border-b border-slate-100">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 shrink-0">
              <Heart className="w-3.5 h-3.5 text-rose-600" />
              LS: Sinh Hiệu & Huyết Động
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
              MAP: <strong className={map < 65 ? 'text-rose-600' : 'text-slate-800'}>{map}</strong> mmHg
            </span>
          </div>
        </div>

        {/* Nội dung chi tiết sinh hiệu */}
        <div className="p-3.5 pt-3 space-y-3">
            <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-[10px] font-medium text-slate-500 block">HATT (mmHg)</label>
            <SmartNumberInput
              value={data.sbp}
              fallbackValue={120}
              min={30}
              max={300}
              onChange={(v) => update('sbp', v ?? 120)}
              className={`w-full h-8 px-2 text-xs font-mono tabular-nums rounded-md border ${
                data.sbp <= 90 ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>

          <div>
            <label className="text-[10px] font-medium text-slate-500 block">HATTr (mmHg)</label>
            <SmartNumberInput
              value={data.dbp}
              fallbackValue={80}
              min={10}
              max={200}
              onChange={(v) => update('dbp', v ?? 80)}
              className="w-full h-8 px-2 text-xs font-mono tabular-nums bg-slate-50 border border-slate-200 rounded-md"
            />
          </div>

          <div>
            <label className="text-[10px] font-medium text-slate-500 block">Mạch (HR) (bpm)</label>
            <SmartNumberInput
              value={data.heartRate}
              fallbackValue={80}
              min={20}
              max={250}
              onChange={(v) => update('heartRate', v ?? 80)}
              className={`w-full h-8 px-2 text-xs font-mono tabular-nums rounded-md border ${
                data.heartRate > 130 || data.heartRate < 40 ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>

          <div>
            <label className="text-[10px] font-medium text-slate-500 block">Thở (RR) (l/p)</label>
            <SmartNumberInput
              value={data.respiratoryRate}
              fallbackValue={16}
              min={4}
              max={70}
              onChange={(v) => update('respiratoryRate', v ?? 16)}
              className={`w-full h-8 px-2 text-xs font-mono tabular-nums rounded-md border ${
                data.respiratoryRate >= 25 || data.respiratoryRate <= 8 ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>

          <div>
            <label className="text-[10px] font-medium text-slate-500 block">T° Thân nhiệt (°C)</label>
            <SmartNumberInput
              value={data.temperature}
              isDecimal
              fallbackValue={37.0}
              min={25}
              max={45}
              onChange={(v) => update('temperature', v ?? 37.0)}
              className={`w-full h-8 px-2 text-xs font-mono tabular-nums rounded-md border ${
                data.temperature <= 35 || data.temperature >= 39 ? 'bg-amber-50 border-amber-400 font-bold text-amber-900' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>

          <div>
            <label className="text-[10px] font-medium text-slate-500 block">SpO2 (%)</label>
            <SmartNumberInput
              value={data.spo2}
              fallbackValue={98}
              min={40}
              max={100}
              onChange={(v) => update('spo2', v ?? 98)}
              className={`w-full h-8 px-2 text-xs font-mono tabular-nums rounded-md border ${
                data.spo2 <= 91 ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>
        </div>

        {/* Hỗ trợ oxy & COPD */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer text-[11px] text-slate-700">
            <input
              type="checkbox"
              checked={data.onSupplementalOxygen}
              onChange={(e) => update('onSupplementalOxygen', e.target.checked)}
              className="w-3.5 h-3.5 text-teal-600 rounded"
            />
            <span>Thở Oxy hỗ trợ</span>
          </label>

          {data.onSupplementalOxygen && (
            <div className="flex items-center gap-1 text-[11px]">
              <span className="text-slate-500">FiO2:</span>
              <SmartNumberInput
                min={21}
                max={100}
                value={data.fio2Percent}
                fallbackValue={21}
                onChange={(v) => update('fio2Percent', v ?? 21)}
                className="w-12 h-6 px-1 text-xs font-mono bg-slate-50 border border-slate-200 rounded text-center"
              />
              <span className="text-slate-500">%</span>
            </div>
          )}

          <label className="flex items-center gap-1.5 cursor-pointer text-[11px] text-slate-700">
            <input
              type="checkbox"
              checked={data.copdOrHypercapnicRisk}
              onChange={(e) => update('copdOrHypercapnicRisk', e.target.checked)}
              className="w-3.5 h-3.5 text-teal-600 rounded"
            />
            <span>COPD (Thang SpO2 2)</span>
          </label>
        </div>

        {/* Tri giác */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
          <div>
            <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Tri giác AVPU</label>
            <select
              value={data.avpu}
              onChange={(e) => update('avpu', e.target.value as any)}
              className="w-full h-7 px-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md"
            >
              <option value="A">A - Alert (Tỉnh táo)</option>
              <option value="V">V - Voice (Đáp ứng lời nói)</option>
              <option value="P">P - Pain (Đáp ứng đau)</option>
              <option value="U">U - Unresponsive (Mất tri giác)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-medium text-slate-500 block mb-0.5">Điểm GCS (3-15)</label>
            <SmartNumberInput
              min={3}
              max={15}
              value={data.gcs}
              fallbackValue={15}
              onChange={(v) => update('gcs', v ?? 15)}
              className="w-full h-7 px-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-md"
            />
          </div>
        </div>
          </div>
      </div>

      {/* 3. Lâm Sàng (LS): Dấu hiệu Da, Tưới Máu Mô & Vận Mạch */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm transition-all overflow-hidden">
        <div className="p-3.5 flex items-center justify-between gap-2 bg-white border-b border-slate-100">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 shrink-0">
              <Droplet className="w-3.5 h-3.5 text-teal-600" />
              LS: Da, Tưới Máu Mô & Vận Mạch
            </span>
          </div>
        </div>

        {/* Nội dung chi tiết */}
        <div className="p-3.5 pt-2.5 space-y-2.5">
            {/* Cảnh báo đỏ da */}
        <div className="grid grid-cols-2 gap-1.5">
          <label className={`p-2 rounded-lg border cursor-pointer text-[11px] transition-colors flex items-center gap-1.5 ${
            data.mottledOrAshen ? 'bg-rose-50 border-rose-300 font-semibold text-rose-900' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <input
              type="checkbox"
              checked={data.mottledOrAshen}
              onChange={(e) => update('mottledOrAshen', e.target.checked)}
              className="w-3.5 h-3.5 text-rose-600 rounded"
            />
            <span>Da vân đá / Tái xám</span>
          </label>

          <label className={`p-2 rounded-lg border cursor-pointer text-[11px] transition-colors flex items-center gap-1.5 ${
            data.cyanosis ? 'bg-rose-50 border-rose-300 font-semibold text-rose-900' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <input
              type="checkbox"
              checked={data.cyanosis}
              onChange={(e) => update('cyanosis', e.target.checked)}
              className="w-3.5 h-3.5 text-rose-600 rounded"
            />
            <span>Tím tái da / Môi</span>
          </label>

          <label className={`p-2 rounded-lg border cursor-pointer text-[11px] transition-colors flex items-center gap-1.5 ${
            data.nonBlanchingRash ? 'bg-rose-50 border-rose-300 font-semibold text-rose-900' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <input
              type="checkbox"
              checked={data.nonBlanchingRash}
              onChange={(e) => update('nonBlanchingRash', e.target.checked)}
              className="w-3.5 h-3.5 text-rose-600 rounded"
            />
            <span>Ban xuất huyết không mất</span>
          </label>

          <label className={`p-2 rounded-lg border cursor-pointer text-[11px] transition-colors flex items-center gap-1.5 ${
            data.newAlteredMentalState ? 'bg-amber-50 border-amber-300 font-semibold text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <input
              type="checkbox"
              checked={data.newAlteredMentalState}
              onChange={(e) => update('newAlteredMentalState', e.target.checked)}
              className="w-3.5 h-3.5 text-teal-600 rounded"
            />
            <span>Lú lẫn cấp tính mới</span>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
          <div>
            <label className="text-[10px] font-medium text-slate-500 block">Thời gian CRT (giây)</label>
            <SmartNumberInput
              value={data.capillaryRefillSeconds}
              isDecimal
              fallbackValue={2.0}
              min={0}
              max={15}
              onChange={(v) => update('capillaryRefillSeconds', v ?? 2.0)}
              className={`w-full h-7 px-2 text-xs font-mono rounded-md border ${
                data.capillaryRefillSeconds > 2 ? 'bg-amber-50 border-amber-300 font-semibold' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>

          <div>
            <label className="text-[10px] font-medium text-slate-500 block">Nước tiểu (18h)</label>
            <select
              value={data.urineOutputStatus}
              onChange={(e) => update('urineOutputStatus', e.target.value as any)}
              className="w-full h-7 px-1 text-xs bg-slate-50 border border-slate-200 rounded-md"
            >
              <option value="normal">Bình thường</option>
              <option value="not_12_18h">Thiểu niệu (12-18h)</option>
              <option value="not_over_18h">Vô niệu (&gt;18h - Red Flag)</option>
            </select>
          </div>
        </div>

        {/* Thuốc vận mạch */}
        <div className="pt-1 border-t border-slate-100">
          <span className="text-[10px] font-medium text-slate-500 block mb-1">Thuốc vận mạch đang dùng:</span>
          <div className="flex flex-wrap gap-1">
            {(['norepinephrine', 'epinephrine', 'vasopressin', 'dopamine'] as const).map((drug) => (
              <button
                type="button"
                key={drug}
                onClick={() => updateVasoactive(drug, !data.vasoactiveUsed[drug])}
                className={`px-2 py-0.5 text-[10px] font-semibold rounded border transition-colors ${
                  data.vasoactiveUsed[drug]
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                {drug === 'norepinephrine' && 'NorEpi'}
                {drug === 'epinephrine' && 'Epi'}
                {drug === 'vasopressin' && 'Vaso'}
                {drug === 'dopamine' && 'Dopa'}
              </button>
            ))}
          </div>
        </div>
          </div>
      </div>

      {/* 4. Cận Lâm Sàng (CLS): TPTTBM (CBC), Biomarkers & Vi Sinh */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm transition-all overflow-hidden">
        <div className="p-3.5 flex items-center justify-between gap-2 bg-white border-b border-slate-100">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 shrink-0">
              <TestTube className="w-3.5 h-3.5 text-cyan-600" />
              CLS: TPTTBM, Biomarkers & Vi Sinh
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {nlrCalc.nlr !== undefined && (
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                nlrCalc.riskLevel === 'high' ? 'bg-rose-100 text-rose-800' : nlrCalc.riskLevel === 'elevated' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                NLR: {nlrCalc.nlr}
              </span>
            )}
          </div>
        </div>

        {/* Nội dung chi tiết */}
        <div className="p-3.5 pt-3 space-y-3">
            {/* Khối TPTTBM (CBC) */}
        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-700 font-semibold">
            <span>Tổng phân tích tế bào máu (TPTTBM / CBC)</span>
            <span className="text-[10px] font-normal text-slate-500">Đơn vị: G/L (x10⁹/L)</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            <div>
              <label className="text-[9px] font-semibold text-slate-600 block">WBC (G/L)</label>
              <SmartNumberInput
                isDecimal
                value={data.wbc}
                onChange={(v) => update('wbc', v)}
                placeholder="4-10"
                className={`w-full h-7 px-1.5 text-xs font-mono rounded border ${
                  (data.wbc ?? 0) > 12 || ((data.wbc ?? 10) < 4 && data.wbc !== undefined) ? 'bg-amber-50 border-amber-400 font-bold text-amber-900' : 'bg-white border-slate-200'
                }`}
              />
            </div>

            <div>
              <label className="text-[9px] font-semibold text-slate-600 block">NEU (G/L)</label>
              <SmartNumberInput
                isDecimal
                value={data.neutrophilCount}
                onChange={(v) => update('neutrophilCount', v)}
                placeholder="2-7"
                className="w-full h-7 px-1.5 text-xs font-mono bg-white border border-slate-200 rounded"
              />
            </div>

            <div>
              <label className="text-[9px] font-semibold text-slate-600 block">LYM (G/L)</label>
              <SmartNumberInput
                isDecimal
                value={data.lymphocyteCount}
                onChange={(v) => update('lymphocyteCount', v)}
                placeholder="1-3"
                className="w-full h-7 px-1.5 text-xs font-mono bg-white border border-slate-200 rounded"
              />
            </div>

            <div>
              <label className="text-[9px] font-semibold text-slate-600 block">PLT (G/L)</label>
              <SmartNumberInput
                value={data.platelets}
                onChange={(v) => update('platelets', v)}
                placeholder="150-400"
                className={`w-full h-7 px-1.5 text-xs font-mono rounded border ${
                  (data.platelets ?? 300) < 100 && data.platelets !== undefined ? 'bg-rose-50 border-rose-400 font-bold text-rose-900' : 'bg-white border-slate-200'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Khối Biomarkers & Lactate */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div>
            <label className="text-[10px] font-medium text-slate-600 block">Lactate 0h (mmol/L)</label>
            <SmartNumberInput
              isDecimal
              value={data.lactateInitial}
              onChange={(v) => update('lactateInitial', v)}
              placeholder="< 2.0"
              className={`w-full h-7 px-2 text-xs font-mono rounded-md border ${
                (data.lactateInitial ?? 0) > 2 ? 'bg-rose-50 border-rose-400 font-bold text-rose-900' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>

          <div>
            <label className="text-[10px] font-medium text-slate-600 block">Lactate 6h (mmol/L)</label>
            <SmartNumberInput
              isDecimal
              value={data.lactateRepeat6h}
              onChange={(v) => update('lactateRepeat6h', v)}
              placeholder="mmol/L"
              className="w-full h-7 px-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-md"
            />
          </div>

          <div>
            <label className="text-[10px] font-medium text-slate-600 block">PCT (ng/mL)</label>
            <SmartNumberInput
              isDecimal
              value={data.procalcitonin}
              onChange={(v) => update('procalcitonin', v)}
              placeholder="< 0.5"
              className={`w-full h-7 px-2 text-xs font-mono rounded-md border ${
                (data.procalcitonin ?? 0) >= 2 ? 'bg-cyan-50 border-cyan-400 font-bold text-cyan-900' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>

          <div>
            <label className="text-[10px] font-medium text-slate-600 block">CRP (mg/L)</label>
            <SmartNumberInput
              isDecimal
              value={data.crp}
              onChange={(v) => update('crp', v)}
              placeholder="< 5"
              className="w-full h-7 px-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-md"
            />
          </div>
        </div>

        {/* Khối Suy Chức Năng Cơ Quan (SOFA) - Creatinine & Bilirubin */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
          <div>
            <label className="text-[10px] font-medium text-slate-600 block">Creatinine Thận (µmol/L)</label>
            <SmartNumberInput
              isDecimal
              value={data.creatinineUmolL}
              onChange={(v) => update('creatinineUmolL', v)}
              placeholder="60-110"
              className={`w-full h-7 px-2 text-xs font-mono rounded-md border ${
                (data.creatinineUmolL ?? 0) > 120 ? 'bg-amber-50 border-amber-400 font-bold text-amber-900' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>

          <div>
            <label className="text-[10px] font-medium text-slate-600 block">Bilirubin Gan (µmol/L)</label>
            <SmartNumberInput
              isDecimal
              value={data.bilirubinUmolL}
              onChange={(v) => update('bilirubinUmolL', v)}
              placeholder="< 20"
              className={`w-full h-7 px-2 text-xs font-mono rounded-md border ${
                (data.bilirubinUmolL ?? 0) > 33 ? 'bg-amber-50 border-amber-400 font-bold text-amber-900' : 'bg-slate-50 border-slate-200'
              }`}
            />
          </div>
        </div>

        {/* Ổ nhiễm trùng & T2MR PCR */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 shrink-0 font-medium">Nghi ngờ ổ nhiễm:</span>
            <select
              value={data.infectionSource}
              onChange={(e) => {
                const src = e.target.value as InfectionSource;
                onChange({
                  ...data,
                  infectionSource: src,
                  suspectedInfection: src !== 'unknown'
                });
              }}
              className="h-7 px-2 text-xs bg-slate-50 border border-slate-200 rounded-md flex-1 text-slate-800"
            >
              <option value="unknown">Chưa phát hiện / Khám sức khỏe</option>
              <option value="respiratory">Hô hấp (Viêm phổi, Đợt cấp)</option>
              <option value="urinary">Tiết niệu (Viêm đài bể thận)</option>
              <option value="abdominal">Ổ bụng / Viêm ruột thừa / Viêm tụy</option>
              <option value="skin_soft_tissue">Da & Mô mềm (Viêm mô tế bào)</option>
              <option value="bloodstream_catheter">Catheter / Nhiễm khuẩn huyết</option>
              <option value="pelvic_obstetric">Sản khoa / Tiểu khung</option>
            </select>
          </div>

          <div className="p-2 bg-purple-50/50 border border-purple-200 rounded-lg flex items-center justify-between text-xs text-purple-950">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={data.rapidMolecularT2Done}
                onChange={(e) => update('rapidMolecularT2Done', e.target.checked)}
                className="w-3.5 h-3.5 text-purple-600 rounded"
              />
              <span className="font-semibold text-[11px]">T2MR Phân Tử (3-5h)</span>
            </label>

            {data.rapidMolecularT2Done && (
              <select
                value={data.rapidMolecularResult ?? 'pending'}
                onChange={(e) => update('rapidMolecularResult', e.target.value as any)}
                className="h-6 px-1 text-[11px] bg-white border border-purple-300 rounded"
              >
                <option value="pending">Đang chạy máy</option>
                <option value="positive">Dương tính (+)</option>
                <option value="negative">Âm tính (-)</option>
              </select>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
