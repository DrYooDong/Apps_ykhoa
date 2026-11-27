import React, { useMemo, useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CalendarClock,
  Check,
  Copy,
  Pill,
  Plus,
  Printer,
  ShieldAlert,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { ENRICHED_DISEASES } from '../../../data/enriched/index.ts';
import { evaluateOrderSafety } from '../../engines/dosingSafetyEngine.ts';
import { getDailyTreatmentTimeline } from '../../lib/dailyTreatmentTimeline.ts';
import { KnowledgeBase, SoapClinicalExperience } from '../../types.ts';
import { ClinicalCaseSession, OrderSandboxItem } from '../../schemas/docspaceV2.ts';

interface ProtocolOrderSandboxPanelProps {
  kb: KnowledgeBase;
  session: ClinicalCaseSession;
  fallbackDiseaseId: string | null;
  linkedSoapCase?: SoapClinicalExperience;
  onChangeSession: (updater: (prev: ClinicalCaseSession) => ClinicalCaseSession) => void;
  onOpenPrintReport: () => void;
}

export const ProtocolOrderSandboxPanel: React.FC<ProtocolOrderSandboxPanelProps> = ({
  kb,
  session,
  fallbackDiseaseId,
  linkedSoapCase,
  onChangeSession,
  onOpenPrintReport,
}) => {
  const [newDrugName, setNewDrugName] = useState('');
  const [newDose, setNewDose] = useState('');
  const [newRoute, setNewRoute] = useState('Uống');
  const [copiedOrders, setCopiedOrders] = useState(false);

  const activeDiseaseId = session.selectedDiseaseId || fallbackDiseaseId || kb.benh[0]?.id || null;
  const activeDisease = useMemo(
    () => kb.benh.find((b) => b.id === activeDiseaseId) || kb.benh[0],
    [kb.benh, activeDiseaseId]
  );

  const enriched = activeDisease ? (ENRICHED_DISEASES as Record<string, any>)[activeDisease.id] : null;
  const branches: Array<{ id: string; name: string; criteria: string; triage?: string; targetVitals?: string; escalationCriteria?: string; dischargeCriteria?: string; drugs?: [string, string, string][] }> = useMemo(() => {
    if (enriched?.branchingSystem?.branches?.length) {
      return enriched.branchingSystem.branches;
    }
    if (activeDisease?.phacDo?.protocols?.length) {
      return activeDisease.phacDo.protocols.map((p, idx) => ({
        id: `grade_${idx}`,
        name: p.tabLabel,
        criteria: p.triage,
        triage: p.triage,
        targetVitals: p.targetVitals,
        escalationCriteria: p.escalationCriteria,
        dischargeCriteria: p.dischargeCriteria,
        drugs: p.drugs,
      }));
    }
    return [
      {
        id: 'default',
        name: activeDisease?.ten || 'Phác đồ chuẩn',
        criteria: activeDisease?.tomTat || '',
        triage: activeDisease?.phacDo?.tuyen?.join(' · ') || 'Đánh giá phân tuyến theo mức độ nặng',
        drugs: activeDisease?.phacDo?.thuoc || [],
      },
    ];
  }, [enriched, activeDisease]);

  const activeBranch =
    branches.find((b) => b.id === session.activeBranchId) || branches[0];

  const activeContextLabel = `${activeDisease?.ten || ''} ${linkedSoapCase?.a.primaryDiagnosis || ''}`;
  const safetyReport = useMemo(
    () => evaluateOrderSafety(session.orderItems, session.form, session.labs, activeContextLabel),
    [session.orderItems, session.form, session.labs, activeContextLabel]
  );

  const dailyTimeline = useMemo(() => {
    if (!activeDisease) return [];
    return getDailyTreatmentTimeline(activeDisease.id, activeDisease.ten, 0) || [];
  }, [activeDisease]);

  const addOrder = (drugName: string, dose: string, route: string, note = '') => {
    if (!drugName.trim()) return;
    const item: OrderSandboxItem = {
      id: `ord_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
      drugName: drugName.trim(),
      dose: dose.trim() || 'Theo phác đồ',
      route: route.trim() || 'Uống',
      frequency: '',
      category: 'specific',
      checked: true,
      note,
    };
    onChangeSession((prev) => ({ ...prev, orderItems: [...prev.orderItems, item] }));
  };

  const handleCopyOrders = () => {
    const lines = session.orderItems
      .filter((o) => o.checked)
      .map((o, idx) => `${idx + 1}. ${o.drugName} — ${o.dose} (${o.route})${o.note ? ` [${o.note}]` : ''}`);
    const text = `Y LỆNH TẬP KÊ (${activeDisease?.ten || session.title}):\n${lines.join('\n')}`;
    navigator.clipboard?.writeText(text);
    setCopiedOrders(true);
    setTimeout(() => setCopiedOrders(false), 1800);
  };

  const suggestedDrugs = activeBranch?.drugs?.length
    ? activeBranch.drugs
    : activeDisease?.phacDo?.thuoc || [];
  const canRevealExpert = !session.progressiveMode || session.revealStage >= 4;

  return (
    <div className="space-y-4">
      {/* LỚP 1: PHÂN TẦNG & MỤC TIÊU (≤ 5 GIÂY) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Lớp 1: Phân tầng Nhánh &amp; Mục tiêu Điều trị
            </h3>
            <p className="text-xs text-slate-500">Chọn bệnh lý và nhánh lâm sàng để xem đích theo dõi và cờ đỏ leo thang.</p>
          </div>
          <select
            value={activeDisease?.id || ''}
            onChange={(e) =>
              onChangeSession((prev) => ({
                ...prev,
                selectedDiseaseId: e.target.value,
                activeBranchId: null,
              }))
            }
            className="text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1.5 text-slate-900 dark:text-slate-100 max-w-[240px]"
          >
            {kb.benh.map((b) => (
              <option key={b.id} value={b.id}>
                {b.ten} ({b.icd})
              </option>
            ))}
          </select>
        </div>

        {/* Branch Selector Pills */}
        {branches.length > 1 && (
          <div className="flex flex-wrap gap-1.5">
            {branches.map((br) => {
              const active = br.id === activeBranch?.id;
              return (
                <button
                  key={br.id}
                  type="button"
                  onClick={() => onChangeSession((p) => ({ ...p, activeBranchId: br.id }))}
                  className={`px-3 py-1.5 min-h-[36px] rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
                    active
                      ? 'bg-[#087f9c] text-white border-[#06667e] shadow-2xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-[#087f9c]'
                  }`}
                >
                  {br.name}
                </button>
              );
            })}
          </div>
        )}

        {/* Key Clinical Targets Grid */}
        {activeBranch && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-200/80 dark:border-cyan-800/70">
              <div className="font-bold text-[#087f9c] dark:text-cyan-300 mb-0.5">Tuyến xử trí</div>
              <div className="text-slate-800 dark:text-slate-200">{activeBranch.triage || 'Theo dõi nội trú/ngoại trú theo phân độ'}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/70">
              <div className="font-bold text-emerald-800 dark:text-emerald-300 mb-0.5">Mục tiêu Sinh hiệu</div>
              <div className="text-slate-800 dark:text-slate-200">{activeBranch.targetVitals || 'Huyết động ổn định, nước tiểu ≥ 0.5 mL/kg/h'}</div>
            </div>
            <div className="p-2.5 rounded-lg bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-800/70">
              <div className="font-bold text-rose-800 dark:text-rose-300 mb-0.5">Cờ đỏ Leo thang / ICU</div>
              <div className="text-slate-800 dark:text-slate-200">{activeBranch.escalationCriteria || activeDisease?.ghiChuBaoDong || 'Tụt HA, suy hô hấp, rối loạn tri giác'}</div>
            </div>
          </div>
        )}
      </div>

      {/* LỚP 2: SÂN TẬP KÊ Y LỆNH AN TOÀN (ORDER SANDBOX + REAL-TIME SAFETY NET) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Pill className="w-4 h-4 text-[#087f9c]" />
              Lớp 2: Sân tập Kê Y Lệnh &amp; Kiểm duyệt An toàn Thuốc (Offline DDI/eGFR)
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={handleCopyOrders}
              disabled={session.orderItems.length === 0}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-200 disabled:opacity-40 cursor-pointer"
            >
              {copiedOrders ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedOrders ? 'Đã chép' : 'Chép Y lệnh'}
            </button>
            <button
              type="button"
              onClick={onOpenPrintReport}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-700 text-white font-semibold cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> In PDF
            </button>
          </div>
        </div>

        {/* Auto Dosing Metrics Strip */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono-custom bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2">
          <span>CN thực: <strong>{safetyReport.metrics.weightKg ?? '--'} kg</strong></span>
          <span>· IBW: <strong>{safetyReport.metrics.ibwKg ?? '--'} kg</strong></span>
          <span>· AdjBW: <strong>{safetyReport.metrics.adjBwKg ?? '--'} kg</strong></span>
          <span>· BMI: <strong>{safetyReport.metrics.bmi ?? '--'}</strong></span>
          <span
            className={`px-1.5 py-0.5 rounded font-bold ${
              safetyReport.metrics.eGfr !== null && safetyReport.metrics.eGfr < 60
                ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200'
                : 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200'
            }`}
          >
            eGFR: {safetyReport.metrics.eGfr !== null ? `${safetyReport.metrics.eGfr} mL/ph (${safetyReport.metrics.ckdStage})` : 'Nhập Creatinine + Tuổi'}
          </span>
        </div>

        {/* Quick-add Protocol Suggestions */}
        {suggestedDrugs.length > 0 && (
          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-slate-500">Nạp nhanh từ Phác đồ chuẩn:</div>
            <div className="flex flex-wrap gap-1.5">
              {suggestedDrugs.slice(0, 6).map(([name, dose, note], i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => addOrder(name, dose, 'Theo phác đồ', note)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-cyan-900 dark:text-cyan-200 text-[11px] font-semibold hover:bg-cyan-100 cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> {name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Custom Drug Order Input */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 text-xs">
          <input
            type="text"
            value={newDrugName}
            onChange={(e) => setNewDrugName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addOrder(newDrugName, newDose, newRoute);
                setNewDrugName('');
                setNewDose('');
              }
            }}
            placeholder="Tên thuốc / Dịch truyền (thử gõ Ibuprofen, Metformin, Dapagliflozin...)"
            className="sm:col-span-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-slate-100"
          />
          <input
            type="text"
            value={newDose}
            onChange={(e) => setNewDose(e.target.value)}
            placeholder="Liều dùng (VD: 500mg x 3)"
            className="sm:col-span-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-2 text-slate-900 dark:text-slate-100"
          />
          <select
            value={newRoute}
            onChange={(e) => setNewRoute(e.target.value)}
            className="sm:col-span-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2 py-2 text-slate-900 dark:text-slate-100"
          >
            <option value="Uống">Uống</option>
            <option value="TTM">TTM</option>
            <option value="TMC">TMC</option>
            <option value="TDD">TDD</option>
            <option value="Khí dung">Khí dung</option>
          </select>
          <button
            type="button"
            onClick={() => {
              addOrder(newDrugName, newDose, newRoute);
              setNewDrugName('');
              setNewDose('');
            }}
            className="sm:col-span-1 inline-flex items-center justify-center rounded-lg bg-[#087f9c] hover:bg-[#06667e] text-white font-bold min-h-[38px] cursor-pointer"
            aria-label="Thêm y lệnh"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Active Order List */}
        {session.orderItems.length > 0 && (
          <div className="space-y-1.5">
            {session.orderItems.map((ord) => (
              <div
                key={ord.id}
                className="flex items-center justify-between gap-2 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/50 text-xs"
              >
                <label className="flex items-center gap-2 min-w-0 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ord.checked}
                    onChange={() =>
                      onChangeSession((prev) => ({
                        ...prev,
                        orderItems: prev.orderItems.map((x) =>
                          x.id === ord.id ? { ...x, checked: !x.checked } : x
                        ),
                      }))
                    }
                  />
                  <span className="font-bold text-slate-900 dark:text-slate-100">{ord.drugName}</span>
                  <span className="text-slate-600 dark:text-slate-300 truncate">
                    {ord.dose} ({ord.route})
                  </span>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    onChangeSession((prev) => ({
                      ...prev,
                      orderItems: prev.orderItems.filter((x) => x.id !== ord.id),
                    }))
                  }
                  className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Real-time Safety Sentinel Feedback */}
        {safetyReport.alerts.length > 0 ? (
          <div className="space-y-2 pt-1">
            {safetyReport.alerts.map((al) => (
              <div
                key={al.id}
                className={`p-3 rounded-xl border text-xs space-y-1 ${
                  al.severity === 'contraindicated'
                    ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
                    : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5">
                  {al.severity === 'contraindicated' ? (
                    <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                  <span>{al.title}</span>
                </div>
                <p className="opacity-90">
                  <strong>Cơ chế:</strong> {al.mechanism}
                </p>
                <p className="font-semibold">
                  <strong>Khuyến cáo an toàn:</strong> {al.recommendation}
                </p>
              </div>
            ))}
          </div>
        ) : session.orderItems.length > 0 ? (
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 font-medium">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            Chưa phát hiện chống chỉ định theo bệnh lý, eGFR hoặc tương tác thuốc nghiêm trọng trong các dòng y lệnh đang chọn.
          </div>
        ) : (
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-500">
            <ShieldAlert className="w-4 h-4 shrink-0 text-slate-400" />
            Hãy thử kê thuốc (hoặc nạp từ phác đồ) để kiểm chứng động cơ cảnh báo DDI &amp; Chỉnh liều tự động.
          </div>
        )}
      </div>

      {/* LỚP 3: LỘ TRÌNH THEO NGÀY & ĐỐI CHIẾU PHÁC ĐỒ CHUYÊN GIA */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
          <CalendarClock className="w-4 h-4 text-[#087f9c]" />
          Lớp 3: Lộ trình Theo dõi &amp; Bài học Điều trị
        </h3>

        {dailyTimeline.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {dailyTimeline.slice(0, 4).map((phase, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1"
              >
                <div className="font-bold text-[#087f9c] dark:text-cyan-300">
                  {phase.phaseName || phase.dayRange}
                </div>
                <div className="text-slate-700 dark:text-slate-200 line-clamp-3">
                  {phase.clinicalGoal || 'Theo dõi diễn tiến sinh hiệu và đáp ứng điều trị'}
                </div>
              </div>
            ))}
          </div>
        )}

        {canRevealExpert && linkedSoapCase && (
          <div className="p-3 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs space-y-1.5">
            <div className="font-bold text-emerald-900 dark:text-emerald-200">
              ✅ Đối chiếu Kế hoạch Xử trí Chuyên gia (Ca SOAP)
            </div>
            <p className="text-slate-800 dark:text-slate-200 whitespace-pre-line">
              <strong>Xử trí ban đầu:</strong> {linkedSoapCase.p.immediateActions}
            </p>
            {linkedSoapCase.p.takeawayLessons && (
              <p className="text-emerald-900 dark:text-emerald-200">
                <strong>💡 Bài học cốt lõi:</strong> {linkedSoapCase.p.takeawayLessons}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
