import React, { useState } from 'react';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Calendar,
  Check,
  ClipboardCheck,
  ClipboardCopy,
  Layers,
  Pill,
  Plus,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { SeverityGradingItem } from '../../../data/diagnostic-criteria-database.ts';
import {
  DailyTimelinePhase,
  TreatmentProblemRow,
  adaptPhaseToProblemRows,
  getGeneralComplications,
} from '../../lib/dailyTreatmentTimeline.ts';
import { PhacDo } from '../../types.ts';
import { CustomOrder } from './ProtocolOrderSheet.tsx';
import { SafePrescribingDdiPanel } from '../SafePrescribingDdiPanel.tsx';

interface DetailedTreatmentTableProps {
  diseaseId: string;
  diseaseName: string;
  selectedGradeIdx: number;
  onSelectGradeIdx?: (idx: number) => void;
  severityGrades?: SeverityGradingItem[];
  activeSeverityGrade?: SeverityGradingItem;
  phacDo: PhacDo;
  timelinePhases: DailyTimelinePhase[];
  customOrders: CustomOrder[];
  checkedOrders: Set<string>;
  onToggleOrder: (key: string) => void;
  onToggleCustomOrder: (id: string) => void;
  onAddCustomOrder: (order: { drug: string; dosage: string; note: string }) => void;
  onRemoveCustomOrder: (id: string) => void;
  onCompleteAll: () => void;
  onResetOrders: () => void;
  onCopyOrderSheet: () => void;
  copySuccess: boolean;
  currentCheckedCount: number;
  totalAllOrders: number;
  progressPercent: number;
  allPrescribedDrugNames: string[];
  patientAge?: string;
  patientGender?: string;
  patientCreatinine?: string;
  appliedComplications?: Array<{
    id: string;
    name: string;
    orders: string[];
    monitoring?: string;
    urgency?: string;
  }>;
  isRenalAdjustmentApplied?: boolean;
  renalEgfr?: number;
  renalStage?: string;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
  onOpenCdssModal?: (tool: 'dengue' | 'ecg' | 'abg' | 'xray' | 'hepa' | 'neuro' | 'microbio' | 'antibiotic' | 'vancomycin' | 'hub') => void;
}

export const DetailedTreatmentTable: React.FC<DetailedTreatmentTableProps> = ({
  diseaseId,
  diseaseName,
  selectedGradeIdx,
  onSelectGradeIdx,
  severityGrades,
  activeSeverityGrade,
  phacDo,
  timelinePhases,
  customOrders,
  checkedOrders,
  onToggleOrder,
  onToggleCustomOrder,
  onAddCustomOrder,
  onRemoveCustomOrder,
  onCompleteAll,
  onResetOrders,
  onCopyOrderSheet,
  copySuccess,
  currentCheckedCount,
  totalAllOrders,
  progressPercent,
  allPrescribedDrugNames,
  patientAge,
  patientGender,
  patientCreatinine,
  appliedComplications,
  isRenalAdjustmentApplied = false,
  renalEgfr,
  renalStage,
  onOpenVaultDrawer,
  onOpenCdssModal,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDrug, setNewDrug] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newNote, setNewNote] = useState('');

  const generalComplications = getGeneralComplications(diseaseId, diseaseName);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDrug.trim()) return;
    onAddCustomOrder({
      drug: newDrug.trim(),
      dosage: newDosage.trim() || 'Theo chỉ định BS',
      note: newNote.trim() || 'Y lệnh bổ sung',
    });
    setNewDrug('');
    setNewDosage('');
    setNewNote('');
    setShowAddModal(false);
  };

  const getSeverityBadgeColor = (sev: string = 'moderate', isSelected: boolean) => {
    switch (sev) {
      case 'critical':
      case 'severe':
        return isSelected
          ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
          : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100';
      case 'mild':
        return isSelected
          ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
          : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100';
      default:
        return isSelected
          ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
          : 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100';
    }
  };

  const renderProblemBadge = (prob: TreatmentProblemRow) => {
    if (prob.problemType === 'specific') {
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
          <span>🎯</span>
          <span>{prob.badgeLabel || 'ĐIỀU TRỊ ĐẶC HIỆU'}</span>
        </span>
      );
    }
    if (prob.problemType === 'complication') {
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
          <span>⚠️</span>
          <span>{prob.badgeLabel || 'BIẾN CHỨNG GIAI ĐOẠN'}</span>
        </span>
      );
    }
    if (prob.problemType === 'paraclinical') {
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
          <span>🧪</span>
          <span>{prob.badgeLabel || 'CẬN LÂM SÀNG'}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
        <span>🩺</span>
        <span>{prob.badgeLabel || 'LÂM SÀNG'}</span>
      </span>
    );
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col gap-4">
      {/* 1. THANH CHỌN PHÂN TẦNG / MỨC ĐỘ NẶNG (SEVERITY LEVEL PILLS) */}
      {severityGrades && severityGrades.length > 0 && (
        <div className="p-3 sm:p-4 bg-gradient-to-r from-slate-50 via-blue-50/20 to-slate-50 border-b border-slate-200 flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Phân tầng &amp; Mức độ lâm sàng:</span>
            </span>
            {activeSeverityGrade?.triage && (
              <span className="text-[11px] font-medium text-slate-600 bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                <b>Tuyến tiếp nhận:</b> {activeSeverityGrade.triage}
              </span>
            )}
          </div>

          {/* Các nút bấm phân tầng */}
          <div className="flex items-center gap-2 flex-wrap">
            {severityGrades.map((g, idx) => {
              const isSelected = selectedGradeIdx === idx;
              const sev = g.severity || 'moderate';
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectGradeIdx?.(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${getSeverityBadgeColor(
                    sev,
                    isSelected
                  )}`}
                  title={g.criteria || g.grade}
                >
                  <span className="font-bold">{g.grade.split(':')[0]}</span>
                  <span className="opacity-90 font-normal hidden sm:inline">
                    &bull; {g.grade.split(':')[1] || g.grade}
                  </span>
                </button>
              );
            })}
          </div>

          {activeSeverityGrade?.criteria && (
            <p className="text-[11.5px] text-slate-600 bg-white/80 p-2 rounded-md border border-slate-200/80 leading-relaxed">
              <b className="text-slate-800">Tiêu chuẩn phân độ:</b> {activeSeverityGrade.criteria}
            </p>
          )}
        </div>
      )}

      {/* 2. THANH TIẾN ĐỘ & TÁC VỤ Y LỆNH */}
      <div className="px-3 sm:px-4 py-3 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        {/* Thanh Quick-jump Timeline Anchor */}
        <div className="flex items-center gap-1.5 flex-wrap overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Giai đoạn:</span>
          </span>
          {timelinePhases.map((phase, pIdx) => (
            <a
              key={phase.id || pIdx}
              href={`#phase-section-${phase.id || pIdx}`}
              className="px-2 py-1 rounded text-[11px] font-semibold bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 transition-colors shadow-2xs flex items-center gap-1 shrink-0"
            >
              <span className="font-mono-custom text-blue-600 font-bold">{phase.dayRange}</span>
              <span className="hidden md:inline text-slate-500">&bull; {phase.phaseName.split('(')[0]}</span>
            </a>
          ))}
          {generalComplications.length > 0 && (
            <a
              href="#cross-phase-complications-table"
              className="px-2 py-1 rounded text-[11px] font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors shadow-2xs flex items-center gap-1 shrink-0"
            >
              <span>🚨 Biến chứng chung</span>
            </a>
          )}
        </div>

        {/* Thanh tiến độ và các nút tác vụ */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Progress bar */}
          <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs text-xs">
            <span className="font-bold text-slate-700 hidden sm:inline">Tiến độ:</span>
            <div className="w-20 sm:w-28 bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  progressPercent >= 100
                    ? 'bg-emerald-600'
                    : progressPercent >= 50
                    ? 'bg-blue-600'
                    : 'bg-amber-500'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono-custom font-bold text-slate-800 text-[11px]">
              {currentCheckedCount}/{totalAllOrders} ({progressPercent}%)
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              id="btn-complete-all-orders"
              onClick={onCompleteAll}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-md text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
              title="Đánh dấu hoàn thành toàn bộ y lệnh"
            >
              <Check className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Đã làm hết</span>
            </button>

            <button
              type="button"
              id="btn-reset-orders"
              onClick={onResetOrders}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-md text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
              title="Bỏ chọn toàn bộ y lệnh"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Đặt lại</span>
            </button>

            <button
              type="button"
              id="btn-copy-orders"
              onClick={onCopyOrderSheet}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md border text-xs font-semibold transition-all cursor-pointer shadow-2xs ${
                copySuccess
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
              title={copySuccess ? 'Đã sao chép vào bộ nhớ tạm!' : 'Sao chép y lệnh theo chuẩn EMR / Bệnh án điện tử'}
            >
              {copySuccess ? <Check className="w-3.5 h-3.5" /> : <ClipboardCopy className="w-3.5 h-3.5 text-slate-500" />}
              <span className="hidden sm:inline">{copySuccess ? 'Đã chép EMR' : 'Chép EMR'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-md text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
              title="Thêm y lệnh thuốc hoặc can thiệp bổ sung"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm y lệnh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal / Form thêm y lệnh bổ sung */}
      {showAddModal && (
        <form
          onSubmit={handleAddSubmit}
          className="mx-4 p-3 bg-blue-50/80 border border-blue-200 rounded-lg flex flex-col sm:flex-row gap-2.5 items-end text-xs animate-fadeIn"
        >
          <div className="flex-1 w-full">
            <label className="block font-semibold text-slate-700 mb-1">Tên thuốc / Can thiệp</label>
            <input
              type="text"
              required
              value={newDrug}
              onChange={(e) => setNewDrug(e.target.value)}
              placeholder="VD: Ceftriaxone, Pantoprazole, Đặt sonde dạ dày..."
              className="w-full border border-slate-300 rounded p-1.5 bg-white text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="w-full sm:w-48">
            <label className="block font-semibold text-slate-700 mb-1">Liều &amp; Đường dùng</label>
            <input
              type="text"
              value={newDosage}
              onChange={(e) => setNewDosage(e.target.value)}
              placeholder="VD: 1g TTM q12h"
              className="w-full border border-slate-300 rounded p-1.5 bg-white text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="w-full sm:w-56">
            <label className="block font-semibold text-slate-700 mb-1">Ghi chú / Điều kiện</label>
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="VD: Pha NaCl 0.9% 100ml truyền 30p"
              className="w-full border border-slate-300 rounded p-1.5 bg-white text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="submit"
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded cursor-pointer shadow-2xs"
            >
              Lưu
            </button>
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 rounded cursor-pointer"
            >
              Hủy
            </button>
          </div>
        </form>
      )}

      {/* DDI Safe Prescribing Panel */}
      <div className="px-3 sm:px-4">
        <SafePrescribingDdiPanel
          prescribedDrugNames={allPrescribedDrugNames || []}
          prescribedDrugs={allPrescribedDrugNames || []}
          patientAge={patientAge}
          patientGender={patientGender}
          patientCreatinine={patientCreatinine}
          onOpenVaultDrawer={onOpenVaultDrawer}
          onOpenCdssModal={onOpenCdssModal}
        />
      </div>

      {/* Dynamic Renal Adjustment Notice (Kích hoạt từ Mục 1c) */}
      {isRenalAdjustmentApplied && (
        <div className="mx-2 sm:mx-4 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 rounded-xl shadow-2xs flex items-start gap-3 text-xs text-emerald-950">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="font-bold text-emerald-900 flex items-center gap-2 mb-0.5">
              <span>ĐÃ KÍCH HOẠT HIỆU CHỈNH LIỀU THEO CHỨC NĂNG THẬN (PCSE)</span>
              {renalEgfr && (
                <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-emerald-200 text-emerald-900 border border-emerald-300">
                  eGFR: {renalEgfr} mL/ph ({renalStage || 'CKD'})
                </span>
              )}
            </div>
            <p className="text-slate-700 leading-relaxed">
              Toàn bộ y lệnh thuốc bài tiết qua thận được kích hoạt chế độ giám sát nồng độ, giảm liều 25–50% hoặc giãn khoảng cách liều. <b>Chống chỉ định tuyệt đối NSAIDs &amp; Aminoglycoside</b> nếu không có máy lọc máu hỗ trợ.
            </p>
          </div>
        </div>
      )}

      {/* Dynamic Active Complications Sheet (Kích hoạt từ Mục 1b) */}
      {appliedComplications && appliedComplications.length > 0 && (
        <div className="mx-2 sm:mx-4 p-3.5 bg-rose-50 border border-rose-300 rounded-xl shadow-2xs flex flex-col gap-2.5 text-xs text-rose-950">
          <div className="flex items-center justify-between gap-2 border-b border-rose-200 pb-2">
            <div className="font-bold text-rose-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse"></span>
              <span className="uppercase tracking-wide">
                Y LỆNH XỬ TRÍ BIẾN CHỨNG CẤP ĐÃ KÍCH HOẠT TỪ MỤC 1b ({appliedComplications.length} biến chứng)
              </span>
            </div>
            <span className="text-[11px] text-rose-700 font-medium italic">
              Ưu tiên xử trí song hành cùng phác đồ nền
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {appliedComplications.map((comp, cIdx) => (
              <div key={comp.id || cIdx} className="p-2.5 bg-white border border-rose-200 rounded-lg shadow-2xs flex flex-col gap-1.5">
                <div className="font-bold text-rose-800 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>{comp.name}</span>
                </div>
                <div className="text-slate-700 space-y-1">
                  {comp.orders.map((ord, oIdx) => (
                    <div key={oIdx} className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold shrink-0">•</span>
                      <span>{ord}</span>
                    </div>
                  ))}
                </div>
                {comp.monitoring && (
                  <div className="pt-1.5 border-t border-slate-100 text-[11px] text-slate-600 flex items-center gap-1">
                    <span className="font-semibold text-slate-800">Theo dõi:</span>
                    <span>{comp.monitoring}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. CÁC GIAI ĐOẠN ĐIỀU TRỊ CUỘN LIÊN TỤC (CONTINUOUS SCROLLING BLOCKS) */}
      <div className="px-2 sm:px-4 flex flex-col gap-6">
        {timelinePhases.map((phase, pIdx) => {
          // Lấy danh sách vấn đề của giai đoạn này
          const baseProblems = adaptPhaseToProblemRows(phase, diseaseId, diseaseName);
          const phaseComplications = phase.phaseComplications || [];
          const allProblems = [...baseProblems, ...phaseComplications];

          return (
            <div
              key={phase.id || pIdx}
              id={`phase-section-${phase.id || pIdx}`}
              className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs bg-white scroll-mt-6"
            >
              {/* Header Giai đoạn & Mục tiêu lâm sàng */}
              <div className="p-3 sm:p-3.5 bg-slate-100/90 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold font-mono-custom bg-blue-600 text-white shadow-2xs">
                    {phase.dayRange}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                    {phase.phaseName}
                  </h4>
                </div>

                {/* Mục tiêu lâm sàng cốt lõi */}
                {phase.clinicalGoal && (
                  <div className="text-[11.5px] text-blue-950 bg-blue-50/90 px-3 py-1.5 rounded-lg border border-blue-200/80 leading-relaxed max-w-2xl">
                    <span className="font-bold text-blue-900 mr-1">🎯 Mục tiêu:</span>
                    <span>{phase.clinicalGoal}</span>
                  </div>
                )}
              </div>

              {/* Bảng 3 cột tối giản */}
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse text-xs min-w-[720px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider text-[11px]">
                      <th className="p-3 w-[26%] min-w-[200px] border-r border-slate-200">
                        1. Vấn đề
                      </th>
                      <th className="p-3 w-[46%] min-w-[340px] border-r border-slate-200">
                        2. Phác đồ &amp; y lệnh
                      </th>
                      <th className="p-3 w-[28%] min-w-[220px]">
                        3. Theo dõi
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {allProblems.map((prob, probIdx) => {
                      const isNoSpecific = prob.isNoSpecificTreatment === true;

                      return (
                        <tr
                          key={prob.id || probIdx}
                          className={`hover:bg-slate-50/60 transition-colors align-top ${
                            prob.problemType === 'complication'
                              ? 'bg-rose-50/15'
                              : prob.problemType === 'specific'
                              ? 'bg-indigo-50/15'
                              : ''
                          }`}
                        >
                          {/* CỘT 1: 1. VẤN ĐỀ */}
                          <td className="p-3 border-r border-slate-200 bg-slate-50/30">
                            <div className="flex flex-col gap-1.5">
                              <div>{renderProblemBadge(prob)}</div>
                              <div className="text-xs font-bold text-slate-900 leading-snug">
                                {prob.problemName}
                              </div>
                              {prob.indicationNote && (
                                <p className="text-[11px] text-indigo-700 bg-indigo-50/80 p-1.5 rounded border border-indigo-200 leading-relaxed">
                                  <b>Chỉ định:</b> {prob.indicationNote}
                                </p>
                              )}
                            </div>
                          </td>

                          {/* CỘT 2: 2. PHÁC ĐỒ & Y LỆNH */}
                          <td className="p-3 border-r border-slate-200">
                            <div className="flex flex-col gap-2">
                              {/* Nếu chưa có điều trị đặc hiệu */}
                              {isNoSpecific ? (
                                <div className="p-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 text-xs italic leading-relaxed">
                                  {prob.treatments?.[0]?.content ||
                                    'Chưa có điều trị đặc hiệu (chủ yếu bù dịch, hạ sốt an toàn & hồi sức hỗ trợ theo dõi sát DHCB).'}
                                </div>
                              ) : (
                                <>
                                  {/* Treatments list */}
                                  {prob.treatments.map((tr, tIdx) => {
                                    const key = `phase-${phase.id}-prob-${probIdx}-tr-${tIdx}`;
                                    const isChecked = checkedOrders.has(key);
                                    return (
                                      <div
                                        key={tIdx}
                                        onClick={() => onToggleOrder(key)}
                                        className={`p-2 rounded-md border text-xs leading-relaxed flex items-start gap-2 cursor-pointer transition-colors ${
                                          isChecked
                                            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium'
                                            : tr.isHighlighted
                                            ? 'bg-amber-50/80 border-amber-300 text-amber-950 font-medium'
                                            : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                                        }`}
                                      >
                                        <input
                                          type="checkbox"
                                          checked={isChecked}
                                          onChange={() => {}}
                                          className="mt-0.5 rounded text-blue-600 cursor-pointer shrink-0"
                                        />
                                        <div className="flex-1">
                                          <div className="flex items-center justify-between gap-1 mb-0.5">
                                            <span
                                              className={`font-bold text-xs ${
                                                isChecked ? 'line-through text-slate-400' : 'text-slate-900'
                                              }`}
                                            >
                                              {tr.category || 'Y lệnh can thiệp'}
                                            </span>
                                            {tr.timing && (
                                              <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 text-[10px] font-mono-custom">
                                                {tr.timing}
                                              </span>
                                            )}
                                          </div>
                                          <p
                                            className={`text-[11.5px] ${
                                              isChecked ? 'line-through text-slate-400' : 'text-slate-700'
                                            }`}
                                          >
                                            {tr.content}
                                          </p>
                                        </div>
                                      </div>
                                    );
                                  })}

                                  {/* Y lệnh thuốc chuẩn theo phân tầng (chỉ chèn ở dòng đầu tiên của phase đầu tiên) */}
                                  {pIdx === 0 && probIdx === 1 && phacDo.thuoc.length > 0 && (
                                    <div className="mt-2 pt-2 border-t border-slate-200 space-y-1.5">
                                      <span className="text-[10.5px] font-bold text-blue-900 uppercase tracking-wider block">
                                        💊 Y lệnh thuốc chuẩn theo phân độ:
                                      </span>
                                      {phacDo.thuoc.map(([drug, dose, note], dIdx) => {
                                        const key = `thuoc-${diseaseId}-g${selectedGradeIdx}-${dIdx}`;
                                        const isChecked = checkedOrders.has(key);
                                        return (
                                          <div
                                            key={dIdx}
                                            onClick={() => onToggleOrder(key)}
                                            className={`p-2 rounded-md border flex items-start gap-2 cursor-pointer transition-colors ${
                                              isChecked
                                                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                                                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                                            }`}
                                          >
                                            <input
                                              type="checkbox"
                                              checked={isChecked}
                                              onChange={() => {}}
                                              className="mt-0.5 rounded text-blue-600 cursor-pointer shrink-0"
                                            />
                                            <div className="flex-1">
                                              <div className="flex items-center justify-between">
                                                <span
                                                  className={`font-bold text-xs ${
                                                    isChecked ? 'line-through text-slate-400' : 'text-slate-900'
                                                  }`}
                                                >
                                                  {drug}
                                                </span>
                                                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-blue-50 text-blue-800 border border-blue-200">
                                                  BHYT
                                                </span>
                                              </div>
                                              <div
                                                className={`text-[11px] text-slate-600 ${
                                                  isChecked ? 'line-through text-slate-400' : ''
                                                }`}
                                              >
                                                <b>Liều:</b> {dose}{' '}
                                                {note && (
                                                  <span>
                                                    &bull; <i>{note}</i>
                                                  </span>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}

                                  {/* Custom orders bổ sung của Bác sĩ */}
                                  {pIdx === 0 && probIdx === 1 && customOrders.length > 0 && (
                                    <div className="mt-2 pt-2 border-t border-indigo-100 space-y-1.5">
                                      <span className="text-[10.5px] font-bold text-indigo-900 uppercase tracking-wider block">
                                        📝 Y lệnh bổ sung của Bác sĩ ({customOrders.length}):
                                      </span>
                                      {customOrders.map((co) => (
                                        <div
                                          key={co.id}
                                          className={`p-2 rounded-md border flex items-start justify-between gap-2 transition-colors ${
                                            co.completed
                                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                                              : 'bg-indigo-50/50 border-indigo-200 text-indigo-950'
                                          }`}
                                        >
                                          <div
                                            className="flex items-start gap-2 flex-1 cursor-pointer"
                                            onClick={() => onToggleCustomOrder(co.id)}
                                          >
                                            <input
                                              type="checkbox"
                                              checked={co.completed}
                                              onChange={() => {}}
                                              className="mt-0.5 rounded text-indigo-600 cursor-pointer shrink-0"
                                            />
                                            <div>
                                              <div
                                                className={`font-bold text-xs ${
                                                  co.completed ? 'line-through text-slate-400' : ''
                                                }`}
                                              >
                                                {co.drug}
                                              </div>
                                              <div
                                                className={`text-[11px] text-slate-600 ${
                                                  co.completed ? 'line-through text-slate-400' : ''
                                                }`}
                                              >
                                                {co.dosage} &bull; {co.note}
                                              </div>
                                            </div>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => onRemoveCustomOrder(co.id)}
                                            className="text-slate-400 hover:text-red-600 p-0.5 transition-colors cursor-pointer"
                                            title="Xóa y lệnh bổ sung này"
                                          >
                                            <Trash2 className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          </td>

                          {/* CỘT 3: 3. THEO DÕI */}
                          <td className="p-3">
                            {/* Nếu chưa có điều trị đặc hiệu: BỎ TRỐNG THEO ĐÚNG YÊU CẦU */}
                            {isNoSpecific ? (
                              <div className="text-center text-slate-300 text-xs py-2">—</div>
                            ) : (
                              <div className="flex flex-col gap-2">
                                {(prob.monitoring || []).map((m, mIdx) => {
                                  const isCLS = m.type === 'CLS';
                                  return (
                                    <div
                                      key={mIdx}
                                      className={`p-2 rounded border text-[11px] leading-snug ${
                                        isCLS
                                          ? 'bg-purple-50/50 border-purple-100 text-slate-800'
                                          : 'bg-blue-50/50 border-blue-100 text-slate-800'
                                      }`}
                                    >
                                      <div className="flex items-center justify-between gap-1 font-semibold">
                                        <span className="flex items-center gap-1">
                                          <span
                                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                              isCLS ? 'bg-purple-600' : 'bg-blue-600'
                                            }`}
                                          />
                                          <span
                                            title={
                                              m.metric.includes('PLT')
                                                ? 'PLT: Platelets (Số lượng tiểu cầu)'
                                                : m.metric.includes('Hct')
                                                ? 'Hct: Hematocrit (Dung tích hồng cầu cô đặc máu)'
                                                : m.metric.includes('WBC')
                                                ? 'WBC: White Blood Cells (Số lượng bạch cầu)'
                                                : m.metric.includes('DHCB')
                                                ? 'DHCB: 7 Dấu hiệu cảnh báo theo Bộ Y tế'
                                                : m.metric
                                            }
                                          >
                                            {m.metric}
                                          </span>
                                        </span>
                                        <span
                                          className={`px-1.5 py-0.2 rounded text-[10px] font-mono-custom ${
                                            isCLS
                                              ? 'bg-purple-100 text-purple-800'
                                              : 'bg-blue-100 text-blue-800'
                                          }`}
                                        >
                                          {m.frequency}
                                        </span>
                                      </div>
                                      {m.target && (
                                        <div className="text-[10.5px] text-slate-600 italic mt-0.5">
                                          Đích: {m.target}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                                {(!prob.monitoring || prob.monitoring.length === 0) && (
                                  <div className="text-center text-slate-300 text-xs py-2">—</div>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {/* 4. BẢNG QUẢN LÝ BIẾN CHỨNG CHUNG (CROSS-PHASE COMPLICATIONS) */}
        {generalComplications.length > 0 && (
          <div
            id="cross-phase-complications-table"
            className="border-2 border-amber-300/80 rounded-xl overflow-hidden shadow-xs bg-white scroll-mt-6 mb-2"
          >
            <div className="p-3 sm:p-3.5 bg-gradient-to-r from-amber-100 via-amber-50 to-orange-50 border-b border-amber-200 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-amber-600 text-white flex items-center justify-center shadow-2xs shrink-0">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-amber-950">
                    Bảng Theo Dõi &amp; Xử Trí Biến Chứng Chung (Xuyên Suốt Các Giai Đoạn)
                  </h4>
                  <p className="text-[11px] text-amber-800">
                    Lời nhắc bác sĩ phòng ngừa và xử trí khẩn cấp các biến chứng toàn thân, biến chứng can thiệp hoặc bội nhiễm
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-200 text-amber-900 border border-amber-300">
                {generalComplications.length} biến chứng trọng tâm
              </span>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse text-xs min-w-[720px]">
                <thead>
                  <tr className="bg-amber-50/70 text-amber-950 border-b border-amber-200 font-bold uppercase tracking-wider text-[11px]">
                    <th className="p-3 w-[26%] min-w-[200px] border-r border-amber-200">
                      1. Vấn đề biến chứng
                    </th>
                    <th className="p-3 w-[46%] min-w-[340px] border-r border-amber-200">
                      2. Hướng xử trí &amp; Y lệnh cấp cứu
                    </th>
                    <th className="p-3 w-[28%] min-w-[220px]">
                      3. Theo dõi phát hiện sớm
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-amber-100">
                  {generalComplications.map((comp) => (
                    <tr key={comp.id} className="hover:bg-amber-50/40 transition-colors align-top">
                      {/* Cột 1 */}
                      <td className="p-3 border-r border-amber-100 bg-amber-50/20">
                        <div className="flex flex-col gap-1.5">
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-200/80 text-amber-900 border border-amber-300 w-fit">
                            <span>⚠️</span>
                            <span>BIẾN CHỨNG TOÀN DIỆN</span>
                          </span>
                          <span className="font-bold text-xs text-slate-900 leading-snug">
                            {comp.complicationName}
                          </span>
                          <p className="text-[11px] text-slate-600 leading-relaxed bg-white/70 p-1.5 rounded border border-amber-100">
                            <b>Biểu hiện:</b> {comp.manifestation}
                          </p>
                        </div>
                      </td>

                      {/* Cột 2 */}
                      <td className="p-3 border-r border-amber-100">
                        <div className="p-2.5 bg-amber-50/50 rounded-lg border border-amber-200 text-xs text-slate-800 leading-relaxed">
                          <span className="font-bold text-amber-950 block mb-1">
                            🚨 Phác đồ cấp cứu &amp; can thiệp:
                          </span>
                          <span>{comp.actionProtocol}</span>
                        </div>
                      </td>

                      {/* Cột 3 */}
                      <td className="p-3">
                        <div className="p-2 bg-white rounded-lg border border-amber-200 text-[11px] text-slate-800 leading-snug">
                          <span className="font-bold text-slate-900 block mb-1">
                            📊 Chỉ số &amp; Xét nghiệm tầm soát:
                          </span>
                          <span className="text-slate-700">{comp.monitoringMetrics}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
