import React, { useState } from 'react';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Brain,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  ClipboardCopy,
  Clock,
  Compass,
  Dna,
  Droplets,
  Eye,
  EyeOff,
  Filter,
  Gauge,
  Heart,
  Layers,
  Pill,
  Plus,
  RotateCcw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  Trash2,
  Wind,
  X,
  Zap,
} from 'lucide-react';
import { SeverityGradingItem } from '../../../data/diagnostic-criteria-database.ts';
import {
  DailyTimelinePhase,
  TreatmentProblemRow,
  adaptPhaseToProblemRows,
  getGeneralComplications,
} from '../../lib/dailyTreatmentTimeline.ts';
import { BranchAxis, ClinicalSubBranch, CombinedProtocol, PhacDo } from '../../types.ts';
import { CustomOrder } from './ProtocolOrderSheet.tsx';
import { SafePrescribingDdiPanel } from '../SafePrescribingDdiPanel.tsx';
import { SevereSubBranchSelector } from './SevereSubBranchSelector.tsx';
import { PhaseProgressMiniNav } from './PhaseProgressMiniNav.tsx';

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
  activeCombinedProtocol?: CombinedProtocol | null;
  isMultiAxis?: boolean;
  axes?: BranchAxis[];
  activeAxisId?: string;
  onSelectAxis?: (axisId: string) => void;
  currentAxisLabel?: string;
  subBranches?: ClinicalSubBranch[];
  selectedSubBranchIds?: string[];
  onToggleSubBranch?: (subBranchId: string) => void;
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
  activeCombinedProtocol,
  isMultiAxis = false,
  axes,
  activeAxisId,
  onSelectAxis,
  currentAxisLabel,
  subBranches = [],
  selectedSubBranchIds = [],
  onToggleSubBranch,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDrug, setNewDrug] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newNote, setNewNote] = useState('');
  
  // State tìm kiếm và lọc phân loại vấn đề điều trị (Scan-first & Clean Filtering)
  const [searchQuery, setSearchQuery] = useState('');
  const [problemTypeFilter, setProblemTypeFilter] = useState<'all' | 'specific' | 'clinical' | 'paraclinical' | 'complication'>('all');

  // State quản lý thu gọn / mở rộng từng Giai đoạn điều trị (Phase Collapse/Expand)
  const [collapsedPhases, setCollapsedPhases] = useState<Record<string, boolean>>({});
  
  // State lọc xem theo Sub-branch cụ thể hoặc tất cả
  const [activeSubBranchTab, setActiveSubBranchTab] = useState<string>('all');

  const togglePhaseCollapse = (phaseId: string) => {
    setCollapsedPhases((prev) => ({
      ...prev,
      [phaseId]: !prev[phaseId],
    }));
  };

  const handleCollapseAllPhases = () => {
    const next: Record<string, boolean> = {};
    timelinePhases.forEach((p, idx) => {
      next[p.id || String(idx)] = true;
    });
    setCollapsedPhases(next);
  };

  const handleExpandAllPhases = () => {
    setCollapsedPhases({});
  };

  const getAxisIcon = (iconName?: string, axisType?: string) => {
    const iconKey = (iconName || '').toLowerCase();
    if (iconKey === 'gauge' || axisType === 'severity' || axisType === 'triage_score') return <Gauge className="w-3.5 h-3.5" />;
    if (iconKey === 'dna' || axisType === 'phenotype') return <Dna className="w-3.5 h-3.5" />;
    if (iconKey === 'syringe' || axisType === 'treatment_step') return <Syringe className="w-3.5 h-3.5" />;
    if (iconKey === 'compass' || axisType === 'stage') return <Compass className="w-3.5 h-3.5" />;
    if (iconKey === 'shieldalert' || axisType === 'comorbidity') return <ShieldAlert className="w-3.5 h-3.5" />;
    return <Layers className="w-3.5 h-3.5" />;
  };

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
      {/* 1. THANH NGỮ CẢNH PHÂN ĐỘ & ĐIỀU PHỐI BẬC ĐIỀU TRỊ (ACTIVE STAGING CONTEXT & ESCALATION) */}
      {severityGrades && severityGrades.length > 0 && (
        <div className="p-3 sm:p-3.5 bg-gradient-to-r from-slate-50 via-blue-50/30 to-indigo-50/20 border-b border-slate-200 flex flex-col gap-2.5">
          {activeCombinedProtocol && (
            <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 font-semibold shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse shrink-0" />
                <span><b>Tổ hợp phác đồ đang áp dụng:</b> {activeCombinedProtocol.combinedName}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-100 text-indigo-700 font-bold shrink-0">
                MULTI-AXIS ACTIVE
              </span>
            </div>
          )}

          {/* THANH TỔNG HỢP PHÂN LOẠI ĐÃ CHỌN (ĐỒNG BỘ TỪ MỤC 1 - KHÔNG TRÙNG NÚT BẤM) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>{currentAxisLabel ? `Phân nhánh đang áp dụng (${currentAxisLabel}):` : 'Phân độ đang áp dụng:'}</span>
              </span>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border shadow-2xs flex items-center gap-1.5 ${getSeverityBadgeColor(
                activeSeverityGrade?.severity || 'moderate',
                true
              )}`}>
                <span>{activeSeverityGrade?.grade || 'Mặc định'}</span>
              </span>
              {activeSeverityGrade?.triage && (
                <span className="text-[11px] font-medium text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs">
                  <b>Tuyến điều trị:</b> {activeSeverityGrade.triage}
                </span>
              )}
              {activeSeverityGrade?.targetVitals && (
                <span className="text-[11px] font-mono-custom text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shadow-2xs hidden md:inline">
                  <b>Đích SH:</b> {activeSeverityGrade.targetVitals}
                </span>
              )}
            </div>

            <a
              href="#sec-classification"
              className="text-blue-600 hover:text-blue-800 font-semibold text-[11px] flex items-center gap-1 transition-colors self-start sm:self-auto"
              title="Nhấn để xem hoặc thay đổi phân độ tại Mục 1"
            >
              <span>Tùy chỉnh phân nhánh tại Mục 1</span>
              <span>&uarr;</span>
            </a>
          </div>

          {/* ⚡ ESCALATION ALERT NẾU CÓ */}
          {(() => {
            const escalation = activeSeverityGrade?.escalationCriteria || (activeSeverityGrade?.protocol as any)?.escalationCriteria;
            if (!escalation) return null;

            return (
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50/90 border border-amber-200 text-amber-950 text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <b className="font-bold text-amber-900 uppercase tracking-wide">Tiêu chuẩn leo thang phác đồ: </b>
                  <span className="leading-relaxed">{escalation}</span>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* 1.5. THANH ĐIỀU HƯỚNG TIẾN ĐỘ MINI NAV (STICKY SCAN-FIRST UI) */}
      <PhaseProgressMiniNav
        timelinePhases={timelinePhases}
        currentCheckedCount={currentCheckedCount}
        totalAllOrders={totalAllOrders}
        progressPercent={progressPercent}
        onCopyOrderSheet={onCopyOrderSheet}
        copySuccess={copySuccess}
      />

      {/* 2. THANH TIẾN ĐỘ & TÁC VỤ Y LỆNH */}
      <div id="sub-orders" className="scroll-mt-24 px-3 sm:px-4 py-3 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
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
              href="#sub-safety-net"
              className="px-2 py-1 rounded text-[11px] font-semibold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors shadow-2xs flex items-center gap-1 shrink-0"
            >
              <span>🚨 Biến chứng chung</span>
            </a>
          )}

          {/* Nút Scan-First: Mở tất cả / Thu gọn tất cả các giai đoạn */}
          <div className="flex items-center gap-1 shrink-0 ml-1">
            <button
              type="button"
              onClick={handleExpandAllPhases}
              className="px-2 py-1 rounded text-[11px] font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
              title="Mở toàn bộ các giai đoạn"
            >
              <Eye className="w-3 h-3 text-blue-600" />
              <span className="hidden sm:inline">Mở hết</span>
            </button>
            <button
              type="button"
              onClick={handleCollapseAllPhases}
              className="px-2 py-1 rounded text-[11px] font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
              title="Thu gọn tất cả để chống ngộp chữ và dễ quét thông tin"
            >
              <EyeOff className="w-3 h-3 text-slate-500" />
              <span className="hidden sm:inline">Thu gọn</span>
            </button>
          </div>
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
      <div id="sub-ddi" className="scroll-mt-24 px-3 sm:px-4">
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

      {/* 2b. Severe Sub-Branch Selector Widget (Nếu bệnh có các nhánh nặng chuyên sâu) */}
      {subBranches && subBranches.length > 0 && (
        <div className="mx-2 sm:mx-4">
          <SevereSubBranchSelector
            subBranches={subBranches}
            selectedSubBranchIds={selectedSubBranchIds}
            onToggleSubBranch={onToggleSubBranch || (() => {})}
            onSelectAllSubBranches={() => {
              subBranches.forEach((sb) => {
                if (!selectedSubBranchIds.includes(sb.id) && onToggleSubBranch) {
                  onToggleSubBranch(sb.id);
                }
              });
            }}
            onClearSubBranches={() => {
              selectedSubBranchIds.forEach((id) => {
                if (onToggleSubBranch) onToggleSubBranch(id);
              });
            }}
            subBranchLabel="Phân loại & Lựa chọn các thể lâm sàng nặng (Sốc, Xuất huyết, Suy tạng)"
            subBranchMode="multi-select"
          />
        </div>
      )}

      {/* Sub-branches Filter & Specific Orders Strip (Khi có phân loại nặng chuyên sâu) */}
      {subBranches && subBranches.length > 0 && selectedSubBranchIds && selectedSubBranchIds.length > 0 && (
        <div className="mx-2 sm:mx-4 p-3.5 bg-gradient-to-r from-rose-50/90 via-red-50/50 to-slate-50 border-2 border-rose-300 rounded-xl shadow-2xs flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-200/80 pb-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="font-bold text-xs sm:text-sm text-rose-950">
                Phân nhánh thể bệnh nặng đang kích hoạt ({selectedSubBranchIds.length} thể):
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => setActiveSubBranchTab('all')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  activeSubBranchTab === 'all'
                    ? 'bg-rose-600 text-white shadow-2xs'
                    : 'bg-white text-rose-800 border border-rose-200 hover:bg-rose-100'
                }`}
              >
                Tất cả các thể
              </button>
              {subBranches
                .filter((sb) => selectedSubBranchIds.includes(sb.id))
                .map((sb) => (
                  <button
                    key={sb.id}
                    type="button"
                    onClick={() => setActiveSubBranchTab(sb.id)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                      activeSubBranchTab === sb.id
                        ? 'bg-rose-600 text-white shadow-2xs'
                        : 'bg-white text-rose-800 border border-rose-200 hover:bg-rose-100'
                    }`}
                  >
                    <span>{sb.badgeText || sb.name.split('/')[0].trim()}</span>
                  </button>
                ))}
            </div>
          </div>

          {/* Hiển thị chi tiết thuốc & can thiệp riêng của từng thể nặng khi click chọn */}
          {activeSubBranchTab !== 'all' && (() => {
            const activeSb = subBranches.find((s) => s.id === activeSubBranchTab);
            if (!activeSb) return null;
            return (
              <div className="bg-white p-3 rounded-lg border border-rose-200 flex flex-col gap-2 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-bold text-rose-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                    <span>Y lệnh can thiệp đặc thù cho thể: {activeSb.name}</span>
                  </div>
                  {activeSb.targetVitals && (
                    <span className="text-[11px] font-mono-custom text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      🎯 Đích: {activeSb.targetVitals}
                    </span>
                  )}
                </div>

                {activeSb.keyActions && (
                  <div className="text-[11px] text-slate-700 bg-rose-50/50 p-2 rounded border border-rose-100 space-y-1">
                    <span className="font-bold text-rose-800 block">Hành động khẩn cấp cần thực hiện:</span>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {activeSb.keyActions.map((ka, idx) => (
                        <li key={idx}>{ka}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeSb.drugs && activeSb.drugs.length > 0 && (
                  <div className="pt-1.5 border-t border-slate-100">
                    <span className="font-bold text-slate-800 text-[11px] block mb-1">
                      💊 Thuốc / Dịch truyền ưu tiên:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeSb.drugs.map(([dName, dDose, dNote], idx) => (
                        <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-200">
                          <div className="font-bold text-indigo-900">{dName}</div>
                          <div className="text-emerald-700 font-mono-custom text-[10.5px] font-semibold">{dDose}</div>
                          {dNote && <div className="text-slate-500 text-[10.5px] mt-0.5">{dNote}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* 2c. BỘ LỌC TÌM KIẾM Y LỆNH & PHÂN LOẠI VẤN ĐỀ (CLINICAL SEARCH & CATEGORY FILTER) */}
      <div className="mx-2 sm:mx-4 p-2.5 sm:p-3 bg-slate-50/90 border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-2.5 shadow-2xs">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm nhanh thuốc, liều, chỉ định, thông số theo dõi..."
            className="w-full pl-8 pr-7 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5"
              title="Xóa tìm kiếm"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => setProblemTypeFilter('all')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all ${
              problemTypeFilter === 'all'
                ? 'bg-blue-600 text-white shadow-2xs font-bold'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs'
            }`}
          >
            Tất cả vấn đề
          </button>
          <button
            type="button"
            onClick={() => setProblemTypeFilter('specific')}
            className={`px-2 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all flex items-center gap-1 ${
              problemTypeFilter === 'specific'
                ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                : 'bg-white hover:bg-slate-100 text-indigo-700 border border-indigo-200 shadow-2xs'
            }`}
          >
            <span>🎯 Đặc hiệu</span>
          </button>
          <button
            type="button"
            onClick={() => setProblemTypeFilter('clinical')}
            className={`px-2 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all flex items-center gap-1 ${
              problemTypeFilter === 'clinical'
                ? 'bg-sky-600 text-white shadow-2xs font-bold'
                : 'bg-white hover:bg-slate-100 text-sky-700 border border-sky-200 shadow-2xs'
            }`}
          >
            <span>🩺 Lâm sàng</span>
          </button>
          <button
            type="button"
            onClick={() => setProblemTypeFilter('paraclinical')}
            className={`px-2 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all flex items-center gap-1 ${
              problemTypeFilter === 'paraclinical'
                ? 'bg-purple-600 text-white shadow-2xs font-bold'
                : 'bg-white hover:bg-slate-100 text-purple-700 border border-purple-200 shadow-2xs'
            }`}
          >
            <span>🧪 Cận lâm sàng</span>
          </button>
          <button
            type="button"
            onClick={() => setProblemTypeFilter('complication')}
            className={`px-2 py-1 rounded-md text-xs font-semibold cursor-pointer transition-all flex items-center gap-1 ${
              problemTypeFilter === 'complication'
                ? 'bg-rose-600 text-white shadow-2xs font-bold'
                : 'bg-white hover:bg-slate-100 text-rose-700 border border-rose-200 shadow-2xs'
            }`}
          >
            <span>⚠️ Biến chứng</span>
          </button>
        </div>
      </div>

      {/* 3. CÁC GIAI ĐOẠN ĐIỀU TRỊ CUỘN LIÊN TỤC (CONTINUOUS SCROLLING BLOCKS) */}
      <div id="sub-timeline" className="scroll-mt-24 px-2 sm:px-4 flex flex-col gap-6">
        {timelinePhases.map((phase, pIdx) => {
          const phaseKey = phase.id || String(pIdx);
          const isPhaseCollapsed = Boolean(collapsedPhases[phaseKey]);

          // Lấy danh sách vấn đề của giai đoạn này
          const baseProblems = adaptPhaseToProblemRows(phase, diseaseId, diseaseName);
          const phaseComplications = phase.phaseComplications || [];
          const allProblems = [...baseProblems, ...phaseComplications];

          // Lọc danh sách vấn đề theo tìm kiếm và nhóm
          const filteredProblems = allProblems.filter((pr) => {
            if (problemTypeFilter !== 'all') {
              if (pr.problemType !== problemTypeFilter) return false;
            }
            if (searchQuery.trim()) {
              const q = searchQuery.toLowerCase().trim();
              const matchName = (pr.problemName || '').toLowerCase().includes(q);
              const matchNote = (pr.indicationNote || '').toLowerCase().includes(q);
              const matchTreatments = (pr.treatments || []).some(
                (t) =>
                  (t.content || '').toLowerCase().includes(q) ||
                  (t.category || '').toLowerCase().includes(q) ||
                  (t.timing || '').toLowerCase().includes(q)
              );
              const matchMonitoring = (pr.monitoring || []).some(
                (m) =>
                  (m.metric || '').toLowerCase().includes(q) ||
                  (m.target || '').toLowerCase().includes(q) ||
                  (m.frequency || '').toLowerCase().includes(q)
              );
              return matchName || matchNote || matchTreatments || matchMonitoring;
            }
            return true;
          });

          // Đếm tổng số y lệnh trong giai đoạn
          let phaseOrdersCount = 0;
          allProblems.forEach((pr) => {
            if (!pr.isNoSpecificTreatment && pr.treatments) {
              phaseOrdersCount += pr.treatments.length;
            }
          });

          return (
            <div
              key={phaseKey}
              id={`phase-section-${phaseKey}`}
              className={`border-2 rounded-xl overflow-hidden shadow-2xs bg-white scroll-mt-6 transition-all duration-200 ${
                isPhaseCollapsed ? 'border-slate-200 hover:border-slate-300' : 'border-blue-200/90 shadow-xs'
              }`}
            >
              {/* Header Giai đoạn (Phase Divider Card) - Click để thu gọn / mở rộng */}
              <div
                onClick={() => togglePhaseCollapse(phaseKey)}
                className={`p-3 sm:p-3.5 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 cursor-pointer transition-colors select-none ${
                  isPhaseCollapsed
                    ? 'bg-slate-50 hover:bg-slate-100/90 border-slate-200'
                    : 'bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-slate-50 border-blue-200'
                }`}
              >
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold font-mono-custom bg-blue-600 text-white shadow-2xs">
                    {phase.dayRange}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                    {phase.phaseName}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-slate-200/80 text-slate-700">
                    {phaseOrdersCount} y lệnh
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mục tiêu lâm sàng cốt lõi */}
                  {phase.clinicalGoal && (
                    <div className="text-[11.5px] text-blue-950 bg-blue-50/90 px-3 py-1 rounded-lg border border-blue-200/80 leading-relaxed max-w-xl hidden md:block truncate">
                      <span className="font-bold text-blue-900 mr-1">🎯 Mục tiêu:</span>
                      <span>{phase.clinicalGoal}</span>
                    </div>
                  )}

                  {/* Nút thu gọn / mở rộng */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePhaseCollapse(phaseKey);
                    }}
                    className="p-1 rounded-md hover:bg-white text-slate-500 hover:text-blue-700 transition-colors shrink-0 ml-auto sm:ml-0 cursor-pointer"
                    title={isPhaseCollapsed ? 'Mở rộng chi tiết giai đoạn' : 'Thu gọn giai đoạn'}
                  >
                    {isPhaseCollapsed ? (
                      <ChevronDown className="w-4 h-4 text-slate-600" />
                    ) : (
                      <ChevronUp className="w-4 h-4 text-blue-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Bảng 3 cột tối giản (chỉ render khi không bị thu gọn) */}
              {!isPhaseCollapsed && (
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
                    {filteredProblems.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="p-6 text-center text-slate-500 bg-slate-50/50">
                          <div className="flex flex-col items-center justify-center gap-1.5 text-xs">
                            <span className="font-semibold text-slate-700">
                              Không có vấn đề điều trị nào khớp với bộ lọc &quot;{searchQuery || problemTypeFilter}&quot; trong giai đoạn này.
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setSearchQuery('');
                                setProblemTypeFilter('all');
                              }}
                              className="text-blue-600 hover:underline font-semibold cursor-pointer"
                            >
                              Xóa bộ lọc để hiển thị toàn bộ
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredProblems.map((prob, probIdx) => {
                      const isNoSpecific = prob.isNoSpecificTreatment === true;

                      return (
                        <tr
                          key={prob.id || probIdx}
                          className={`hover:bg-slate-50/70 transition-colors align-top ${
                            prob.problemType === 'complication'
                              ? 'border-l-4 border-l-rose-500 bg-rose-50/10'
                              : prob.problemType === 'specific'
                              ? 'border-l-4 border-l-indigo-600 bg-indigo-50/10'
                              : prob.problemType === 'paraclinical'
                              ? 'border-l-4 border-l-purple-500 bg-purple-50/10'
                              : 'border-l-4 border-l-sky-500 bg-sky-50/10'
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

                          {/* CỘT 3: 3. THEO DÕI DẠNG CHIPS TRỰC QUAN (SCAN-FIRST) */}
                          <td className="p-3">
                            {/* Nếu chưa có điều trị đặc hiệu */}
                            {isNoSpecific ? (
                              <div className="text-center text-slate-300 text-xs py-2">—</div>
                            ) : (
                              <div className="flex flex-col gap-2">
                                {(prob.monitoring || []).map((m, mIdx) => {
                                  const isCLS = m.type === 'CLS';
                                  return (
                                    <div
                                      key={mIdx}
                                      className={`p-2 rounded-lg border text-[11px] leading-snug flex flex-col gap-1 shadow-2xs transition-all ${
                                        isCLS
                                          ? 'bg-purple-50/70 border-purple-200 text-purple-950'
                                          : 'bg-sky-50/70 border-sky-200 text-sky-950'
                                      }`}
                                    >
                                      {/* Hàng 1: Loại + Chỉ số + Tần suất */}
                                      <div className="flex items-center justify-between gap-1 font-bold">
                                        <div className="flex items-center gap-1.5 min-w-0">
                                          <span
                                            className={`px-1.5 py-0.2 rounded text-[9.5px] uppercase font-mono font-bold shrink-0 ${
                                              isCLS
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-sky-600 text-white'
                                            }`}
                                          >
                                            {isCLS ? 'CLS' : 'LS'}
                                          </span>
                                          <span className="truncate" title={m.metric}>
                                            {m.metric}
                                          </span>
                                        </div>

                                        <span className="px-1.5 py-0.2 rounded text-[10px] font-mono-custom bg-white border border-slate-200 text-slate-700 shrink-0 flex items-center gap-0.5">
                                          <Clock className="w-2.5 h-2.5 text-slate-400" />
                                          <span>{m.frequency}</span>
                                        </span>
                                      </div>

                                      {/* Hàng 2: Mục tiêu / Đích kiểm soát */}
                                      {m.target && (
                                        <div className="flex items-center gap-1 text-[10.5px] pt-1 border-t border-slate-100">
                                          <span className="font-semibold text-emerald-800 bg-emerald-100/80 px-1 py-0.2 rounded text-[9.5px]">
                                            ĐÍCH:
                                          </span>
                                          <span className="text-slate-700 italic">
                                            {m.target}
                                          </span>
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
                    }))}
                  </tbody>
                </table>
              </div>
              )}
            </div>
          );
        })}

        {/* 4. BẢNG QUẢN LÝ BIẾN CHỨNG CHUNG (CROSS-PHASE COMPLICATIONS) */}
        {generalComplications.length > 0 && (
          <div
            id="sub-safety-net"
            className="border-2 border-amber-300/80 rounded-xl overflow-hidden shadow-xs bg-white scroll-mt-24 mb-2"
          >
            <div className="p-3 sm:p-3.5 bg-gradient-to-r from-amber-100 via-amber-50 to-orange-50 border-b border-amber-200 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-amber-600 text-white flex items-center justify-center shadow-2xs shrink-0">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-amber-950">
                    Bảng Dự Phòng &amp; Xử Trí Biến Chứng Toàn Thân (Safety Net &bull; Xuyên Suốt Quá Trình Điều Trị)
                  </h4>
                  <p className="text-[11px] text-amber-800">
                    Lời nhắc bác sĩ phòng ngừa và xử trí các biến chứng phát sinh do can thiệp, quá tải dịch hoặc bội nhiễm (khác với biến chứng cấp ban đầu tại Mục 1b)
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
