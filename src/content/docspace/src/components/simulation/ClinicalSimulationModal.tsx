import React, { useState, useMemo } from 'react';
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  Award,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Dna,
  FileCheck,
  Flame,
  Heart,
  HelpCircle,
  Layers,
  Lightbulb,
  Microscope,
  Play,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  User,
  X,
  Zap,
} from 'lucide-react';
import {
  SimulationBranch,
  SimulationStage,
  SimulationUserAnswers,
} from '../../types/simulation.ts';
import { PARAMETRIC_DENGUE_BLUEPRINT } from '../../../data/simulation/parametric-dengue-blueprint.ts';
import {
  calculateOsceScore,
  convertBranchToClinicalInputs,
  validateClinicalSanity,
} from '../../lib/simulationEngine.ts';
import { ClinicalFormState, LabsState, VitalsState } from '../../types.ts';

interface ClinicalSimulationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadBranchIntoWorkspace: (data: {
    form: ClinicalFormState;
    vitals: VitalsState;
    labs: LabsState;
    selectedSymptoms: string[];
  }) => void;
}

export const ClinicalSimulationModal: React.FC<ClinicalSimulationModalProps> = ({
  isOpen,
  onClose,
  onLoadBranchIntoWorkspace,
}) => {
  const blueprint = PARAMETRIC_DENGUE_BLUEPRINT;
  const [selectedBranchIndex, setSelectedBranchIndex] = useState<number>(0);
  const [currentStage, setCurrentStage] = useState<SimulationStage>('stage1_initial');
  const [userAnswers, setUserAnswers] = useState<SimulationUserAnswers>({ selectedOptionIds: {} });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const activeBranch: SimulationBranch = useMemo(() => {
    return blueprint.branches[selectedBranchIndex] || blueprint.branches[0];
  }, [blueprint, selectedBranchIndex]);

  // Sanity check
  const sanityCheck = useMemo(() => {
    return validateClinicalSanity(activeBranch);
  }, [activeBranch]);

  // Score calculation
  const osceResult = useMemo(() => {
    return calculateOsceScore(activeBranch, userAnswers);
  }, [activeBranch, userAnswers]);

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (isSubmitted) return; // Locked after submit
    setUserAnswers((prev) => ({
      selectedOptionIds: {
        ...prev.selectedOptionIds,
        [questionId]: optionId,
      },
    }));
  };

  const handleResetBranch = () => {
    setCurrentStage('stage1_initial');
    setUserAnswers({ selectedOptionIds: {} });
    setIsSubmitted(false);
  };

  const handleRandomizeBranch = () => {
    const nextIdx = (selectedBranchIndex + 1) % blueprint.branches.length;
    setSelectedBranchIndex(nextIdx);
    handleResetBranch();
  };

  const handleLoadToClinicalWizard = () => {
    const inputs = convertBranchToClinicalInputs(activeBranch);
    onLoadBranchIntoWorkspace(inputs);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 p-4 sm:p-5 text-white flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300 shadow-inner">
              <Award className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30 uppercase tracking-wider">
                  OSCE Simulation Ground
                </span>
                <span className="text-xs font-mono-custom text-blue-300">
                  {blueprint.icdCode} · {blueprint.diseaseName}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-display tracking-tight text-white mt-0.5">
                {blueprint.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Branch Selector Bar */}
        <div className="bg-slate-50 border-b border-slate-200 p-2.5 px-4 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-slate-700 mr-1 flex items-center gap-1">
              <Dna className="w-3.5 h-3.5 text-blue-600" />
              <span>3 Nhánh Rẽ Nhân Quả:</span>
            </span>

            {blueprint.branches.map((b, idx) => (
              <button
                key={b.branchId}
                type="button"
                onClick={() => {
                  setSelectedBranchIndex(idx);
                  handleResetBranch();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  selectedBranchIndex === idx
                    ? 'bg-blue-600 text-white border-blue-700 shadow-2xs scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span>{b.branchTitle.split(':')[0]}</span>
                <span className="ml-1 opacity-80 text-[10px]">({b.demographics.label.split(',')[0]})</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRandomizeBranch}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              title="Xáo trộn sang nhánh tình huống ngẫu nhiên khác"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>🎲 Đổi Nhánh Ngẫu Nhiên</span>
            </button>
          </div>
        </div>

        {/* Progressive Revelation 4-Chặng Steps Indicator */}
        <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between gap-2 overflow-x-auto shrink-0 text-xs">
          <button
            type="button"
            onClick={() => setCurrentStage('stage1_initial')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap cursor-pointer transition-all ${
              currentStage === 'stage1_initial'
                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10.5px] font-bold">
              1
            </span>
            <span>Chặng 1: Bệnh Sử &amp; Khám Ban Đầu</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

          <button
            type="button"
            onClick={() => setCurrentStage('stage2_labs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap cursor-pointer transition-all ${
              currentStage === 'stage2_labs'
                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10.5px] font-bold">
              2
            </span>
            <span>Chặng 2: Mở Khóa Cận Lâm Sàng</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

          <button
            type="button"
            onClick={() => setCurrentStage('stage3_decisions')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap cursor-pointer transition-all ${
              currentStage === 'stage3_decisions'
                ? 'bg-blue-50 text-blue-800 border border-blue-200'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10.5px] font-bold">
              3
            </span>
            <span>Chặng 3: Thử Thách OSCE (4 Trụ Cột)</span>
          </button>

          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />

          <button
            type="button"
            onClick={() => setCurrentStage('stage4_debrief')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap cursor-pointer transition-all ${
              currentStage === 'stage4_debrief'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : isSubmitted
                ? 'text-emerald-700 hover:bg-emerald-50'
                : 'text-slate-400 cursor-not-allowed'
            }`}
            disabled={!isSubmitted}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10.5px] font-bold ${
              isSubmitted ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              4
            </span>
            <span>Chặng 4: Bảng Điểm &amp; Hạt Ngọc EBM</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/50">
          {/* Branch Overview Hero Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
            <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-900 border border-blue-200">
                    {activeBranch.branchBadge}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    Đối tượng: <b>{activeBranch.targetAudience}</b>
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-slate-900 mt-1">
                  {activeBranch.branchTitle}
                </h3>
              </div>

              <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono-custom text-xs font-semibold">
                Ngày bệnh: Thứ {activeBranch.timelineDay}
              </span>
            </div>

            <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
              {activeBranch.branchDescription}
            </p>

            {/* Quick Demographics & Comorbidities Pills */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 bg-blue-50/60 rounded-lg border border-blue-100">
                <span className="text-[10.5px] font-bold text-blue-900 uppercase block mb-0.5">
                  1. Cơ địa bệnh nhân:
                </span>
                <span className="font-semibold text-slate-900">{activeBranch.demographics.label}</span>
              </div>

              <div className="p-2.5 bg-amber-50/60 rounded-lg border border-amber-100">
                <span className="text-[10.5px] font-bold text-amber-900 uppercase block mb-0.5">
                  2. Bệnh nền &amp; Yếu tố nguy cơ:
                </span>
                <span className="font-semibold text-slate-900">{activeBranch.comorbidity.label}</span>
              </div>

              <div className="p-2.5 bg-purple-50/60 rounded-lg border border-purple-100">
                <span className="text-[10.5px] font-bold text-purple-900 uppercase block mb-0.5">
                  3. Tình trạng huyết động:
                </span>
                <span className="font-semibold text-slate-900">{activeBranch.vitalsVariant.statusLabel}</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CHẶNG 1: BỆNH SỬ & KHÁM BAN ĐẦU                                          */}
          {/* ========================================================================= */}
          {currentStage === 'stage1_initial' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  <h4 className="font-bold text-sm text-slate-900">
                    Bệnh sử &amp; Dấu hiệu Khám Thực Thể Ban Đầu
                  </h4>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-slate-800">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                    <b className="text-slate-900 block mb-1 text-[12.5px]">Lý do vào viện (Chief Complaint):</b>
                    <span className="text-slate-700 italic">"{activeBranch.chiefComplaint}"</span>
                  </div>

                  <div>
                    <b className="text-slate-900 block mb-1">Quá trình bệnh lý (History of Present Illness):</b>
                    <p className="text-slate-700">{activeBranch.historyOfPresentIllness}</p>
                  </div>

                  <div>
                    <b className="text-slate-900 block mb-1">Khám thực thể lúc nhập viện (Physical Examination):</b>
                    <p className="text-slate-700">{activeBranch.physicalExamSummary}</p>
                  </div>
                </div>

                {/* Vitals Grid */}
                <div className="p-3.5 bg-slate-900 text-white rounded-xl">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Dấu hiệu sinh tồn lúc vào viện:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                    <div className="p-2 bg-slate-800 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Thân nhiệt</span>
                      <b className="text-sm font-mono-custom text-amber-400">
                        {activeBranch.vitalsVariant.vitals.vNhiet}°C
                      </b>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Mạch</span>
                      <b className="text-sm font-mono-custom text-rose-400">
                        {activeBranch.vitalsVariant.vitals.vMach} l/p
                      </b>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Huyết áp</span>
                      <b className="text-sm font-mono-custom text-blue-300">
                        {activeBranch.vitalsVariant.vitals.vHATT}/{activeBranch.vitalsVariant.vitals.vHATTr}
                      </b>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Nhịp thở</span>
                      <b className="text-sm font-mono-custom text-slate-200">
                        {activeBranch.vitalsVariant.vitals.vTho} l/p
                      </b>
                    </div>
                    <div className="p-2 bg-slate-800 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">SpO₂</span>
                      <b className="text-sm font-mono-custom text-emerald-400">
                        {activeBranch.vitalsVariant.vitals.vSpo2}%
                      </b>
                    </div>
                  </div>
                </div>

                {/* Chuyển sang chặng 2 */}
                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStage('stage2_labs')}
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-xs cursor-pointer transition-colors"
                  >
                    <span>Mở Khóa Chặng 2: Kết Quả Cận Lâm Sàng</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* CHẶNG 2: MỞ KHÓA KẾT QUẢ CẬN LÂM SÀNG                                     */}
          {/* ========================================================================= */}
          {currentStage === 'stage2_labs' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Microscope className="w-4 h-4 text-purple-600" />
                    <h4 className="font-bold text-sm text-slate-900">
                      Kết Quả Cận Lâm Sàng Đã Mở Khóa
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10.5px] font-bold bg-purple-100 text-purple-900">
                    {activeBranch.labVariant.statusLabel}
                  </span>
                </div>

                {/* Core Labs Table */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[11px] text-slate-500 block">Dung tích hồng cầu (Hct)</span>
                    <b className={`text-base font-mono-custom ${
                      parseFloat(activeBranch.labVariant.labs.lHct) >= 44
                        ? 'text-rose-600'
                        : parseFloat(activeBranch.labVariant.labs.lHct) < 30
                        ? 'text-amber-600'
                        : 'text-slate-800'
                    }`}>
                      {activeBranch.labVariant.labs.lHct}%
                    </b>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {parseFloat(activeBranch.labVariant.labs.lHct) >= 44
                        ? '▲ Cô đặc máu'
                        : parseFloat(activeBranch.labVariant.labs.lHct) < 30
                        ? '▼ Tụt sâu (Nghi mất máu)'
                        : 'Bình thường'}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[11px] text-slate-500 block">Số lượng Tiểu cầu (PLT)</span>
                    <b className="text-base font-mono-custom text-rose-600">
                      {activeBranch.labVariant.labs.lTC} G/L
                    </b>
                    <span className="text-[10px] text-rose-500 block mt-0.5">
                      ▼ Giảm nặng (&lt; 50 G/L)
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[11px] text-slate-500 block">Số lượng Bạch cầu (WBC)</span>
                    <b className="text-base font-mono-custom text-slate-800">
                      {activeBranch.labVariant.labs.lBC} G/L
                    </b>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Bạch cầu giảm nhẹ
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[11px] text-slate-500 block">Đường huyết mao mạch</span>
                    <b className="text-base font-mono-custom text-slate-800">
                      {activeBranch.labVariant.labs.lGlu} mmol/L
                    </b>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      Trong giới hạn an toàn
                    </span>
                  </div>
                </div>

                {/* Additional Special Labs */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800 block">
                    Xét nghiệm chuyên khoa &amp; Chẩn đoán hình ảnh tại giường:
                  </span>
                  <div className="space-y-1.5">
                    {Object.entries(activeBranch.labVariant.additionalLabs || {}).map(([key, val], idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-purple-50/50 border border-purple-100 rounded-lg text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                      >
                        <b className="text-purple-950">{key}:</b>
                        <span className="text-slate-800 font-medium">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chuyển sang chặng 3 */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setCurrentStage('stage1_initial')}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    ← Quay lại Chặng 1
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStage('stage3_decisions')}
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-xs cursor-pointer transition-colors"
                  >
                    <span>Mở Khóa Chặng 3: Thử Thách OSCE</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* CHẶNG 3: THỬ THÁCH OSCE (4 TRỤ CỘT BẢNG KIỂM 100 ĐIỂM)                    */}
          {/* ========================================================================= */}
          {currentStage === 'stage3_decisions' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    <b>Quy chế thi OSCE:</b> Trả lời đầy đủ 4 câu hỏi tương ứng với 4 trụ cột năng lực lâm sàng. Thang điểm chuẩn: <b>100 điểm</b> (Đạt yêu cầu khi &ge; 70 điểm).
                  </span>
                </div>
                <span className="font-mono-custom font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  Đã trả lời: {Object.keys(userAnswers.selectedOptionIds).length}/4
                </span>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {activeBranch.questions.map((q, qIdx) => {
                  const selectedOptionId = userAnswers.selectedOptionIds[q.id];

                  return (
                    <div
                      key={q.id}
                      className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                        <span className="font-bold text-xs uppercase tracking-wider text-blue-700">
                          {q.pillarTitle}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10.5px] font-mono-custom bg-slate-100 text-slate-700 font-semibold">
                          Trọng số: {q.pillarWeight}đ
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                        Câu {qIdx + 1}: {q.prompt}
                      </h4>

                      <div className="space-y-2 pt-1">
                        {q.options.map((opt) => {
                          const isSelected = selectedOptionId === opt.id;

                          return (
                            <label
                              key={opt.id}
                              className={`p-3 rounded-lg border flex items-start gap-2.5 cursor-pointer transition-all ${
                                isSelected
                                  ? 'bg-blue-50/80 border-blue-500 text-blue-950 ring-1 ring-blue-500 shadow-2xs'
                                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                              }`}
                            >
                              <input
                                type="radio"
                                name={q.id}
                                checked={isSelected}
                                onChange={() => handleSelectOption(q.id, opt.id)}
                                className="mt-0.5 text-blue-600 cursor-pointer"
                              />
                              <span className="text-xs leading-relaxed font-medium">{opt.text}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setCurrentStage('stage2_labs')}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  ← Quay lại Xem Cận lâm sàng
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(true);
                    setCurrentStage('stage4_debrief');
                  }}
                  disabled={Object.keys(userAnswers.selectedOptionIds).length < 4}
                  className={`flex items-center gap-1.5 px-5 py-2.5 font-bold text-xs rounded-lg shadow-xs transition-all ${
                    Object.keys(userAnswers.selectedOptionIds).length >= 4
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-sm scale-[1.01]'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Nộp Bài &amp; Chấm Điểm OSCE Chặng 4</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* CHẶNG 4: BẢNG ĐIỂM OSCE & HẠT NGỌC LÂM SÀNG                              */}
          {/* ========================================================================= */}
          {currentStage === 'stage4_debrief' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Score Hero Banner */}
              <div className={`p-5 rounded-2xl border text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm ${
                osceResult.passed
                  ? 'bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 border-emerald-500/50'
                  : 'bg-gradient-to-r from-rose-900 via-red-950 to-slate-900 border-rose-500/50'
              }`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider ${
                      osceResult.passed ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                    }`}>
                      {osceResult.passed ? '✓ ĐẠT CHUẨN LÂM SÀNG' : '✗ CHƯA ĐẠT CHUẨN'}
                    </span>
                    <span className="text-xs text-slate-300">
                      Barem 100 điểm OSCE thích ứng
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-display tracking-tight text-white">
                    {osceResult.passed
                      ? 'Chúc mừng! Bạn đã ra quyết định lâm sàng chuẩn xác và an toàn.'
                      : 'Cần lưu ý: Bạn đã bỏ sót cờ đỏ hoặc chọn sai phác đồ bù dịch/an toàn.'}
                  </h3>
                  <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                    Ca bệnh: <b>{activeBranch.branchTitle}</b>
                  </p>
                </div>

                {/* Score Circular Gauge */}
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl p-3.5 border border-white/10 shrink-0 self-start sm:self-center">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-300 block">Tổng Điểm:</span>
                    <span className="text-3xl font-display font-extrabold text-white">
                      {osceResult.totalScore}<span className="text-lg text-slate-300 font-normal">/100</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* 4 Pillars Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {Object.entries(osceResult.pillarScores).map(([key, p], i) => (
                  <div
                    key={key}
                    className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10.5px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                        Trụ cột {i + 1}
                      </span>
                      <div className="font-bold text-xs text-slate-900">
                        {key === 'history_exam'
                          ? '1. Khai thác & Khám'
                          : key === 'labs_workup'
                          ? '2. Cận lâm sàng'
                          : key === 'diagnosis_staging'
                          ? '3. Xác lập Chẩn đoán'
                          : '4. Xử trí & An toàn'}
                      </div>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] font-bold font-mono-custom text-blue-700">
                        {p.earned} / {p.max}đ
                      </span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${
                        p.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {p.passed ? 'Đạt' : 'Chưa đạt'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detailed Questions Review & Rationales */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-4">
                <h4 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-blue-600" />
                  <span>Giải Phẫu Chi Tiết Quyết Định &amp; Phương Án Nhiễu</span>
                </h4>

                <div className="space-y-3.5">
                  {osceResult.feedbackList.map((fb, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                        fb.isCorrect
                          ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                          : 'bg-rose-50/50 border-rose-200 text-rose-950'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold">
                          Câu {idx + 1} ({fb.pillarTitle}): {fb.isCorrect ? '✓ ĐÚNG' : '✗ SAI'}
                        </span>
                        <span className="font-mono-custom font-bold px-2 py-0.5 rounded bg-white border border-slate-200">
                          +{fb.earnedScore}đ
                        </span>
                      </div>

                      <div className="text-slate-700">
                        <b>Lựa chọn của bạn:</b> <span>{fb.userOptionText}</span>
                      </div>

                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/80 text-[11.5px] leading-relaxed text-slate-800">
                        <b className="text-blue-900 block mb-0.5">Phân tích EBM &amp; Lý do:</b>
                        <span>{fb.rationale}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinical Pearls Cards */}
              <div className="bg-white border border-amber-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2 border-b border-amber-100 pb-2">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <h4 className="font-bold text-sm text-amber-950">
                    Hạt Ngọc Lâm Sàng (Clinical Pearls) Cốt Tử Cho Nhánh Này
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {activeBranch.clinicalPearls.map((cp, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-amber-50/50 border border-amber-200 rounded-xl text-xs space-y-2 flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <span className="font-bold text-amber-950 block text-[12.5px] leading-snug">
                          {cp.title}
                        </span>
                        <p className="text-slate-700 text-[11.5px] leading-relaxed">
                          <b>Bối cảnh:</b> {cp.context}
                        </p>
                        <p className="text-slate-700 text-[11.5px] leading-relaxed">
                          <b>Hành động:</b> <span className="text-blue-900 font-medium">{cp.action}</span>
                        </p>
                      </div>
                      <div className="pt-2 border-t border-amber-200/70 text-[11px] text-amber-900 italic leading-relaxed">
                        <b>Cơ chế:</b> {cp.mechanism}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cognitive Pitfalls Cards */}
              <div className="bg-white border border-rose-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2 border-b border-rose-100 pb-2">
                  <AlertOctagon className="w-4 h-4 text-rose-600" />
                  <h4 className="font-bold text-sm text-rose-950">
                    Cảnh Báo Bẫy Thiên Kiến Nhận Thức (Cognitive Biases Warning)
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeBranch.cognitivePitfalls.map((cp, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-rose-50/50 border border-rose-200 rounded-xl text-xs space-y-1.5"
                    >
                      <b className="text-rose-900 block text-[12px]">{cp.biasName}</b>
                      <p className="text-slate-700 text-[11.5px] leading-relaxed">
                        <b>Bẫy thường gặp:</b> {cp.warningText}
                      </p>
                      <p className="text-emerald-900 text-[11.5px] leading-relaxed">
                        <b>Cách hóa giải:</b> {cp.remedyAction}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="bg-white border-t border-slate-200 p-3.5 px-6 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetBranch}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Làm Lại Ca Này</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleLoadToClinicalWizard}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-all scale-[1.01]"
              title="Tự động nạp ca bệnh này vào Bước 1 để kiểm tra suy luận CDSS &amp; Phác đồ điều trị thực tế"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Nạp Ca Này Vào Chu Trình Lâm Sàng (Step 1)</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs cursor-pointer transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
