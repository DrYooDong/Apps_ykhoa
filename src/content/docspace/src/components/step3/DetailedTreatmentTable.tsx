import React, { useState } from 'react';
import {
  Activity,
  AlertCircle,
  Calendar,
  Check,
  ClipboardCheck,
  ClipboardCopy,
  Layers,
  Pill,
  Plus,
  RotateCcw,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import { SeverityGradingItem } from '../../../data/diagnostic-criteria-database.ts';
import { DailyTimelinePhase } from '../../lib/dailyTreatmentTimeline.ts';
import { PhacDo } from '../../types.ts';
import { CustomOrder } from './ProtocolOrderSheet.tsx';
import { SafePrescribingDdiPanel } from '../SafePrescribingDdiPanel.tsx';

interface DetailedTreatmentTableProps {
  diseaseId: string;
  diseaseName: string;
  selectedGradeIdx: number;
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
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

export const DetailedTreatmentTable: React.FC<DetailedTreatmentTableProps> = ({
  diseaseId,
  diseaseName,
  selectedGradeIdx,
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
  onOpenVaultDrawer,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDrug, setNewDrug] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newNote, setNewNote] = useState('');

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

  const severityColorClass = () => {
    const sev = activeSeverityGrade?.severity || 'moderate';
    switch (sev) {
      case 'critical':
      case 'severe':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'mild':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col gap-4">
      {/* 1. Tiến độ thực thi y lệnh & Tác vụ */}
      <div className="p-3 sm:p-3.5 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-600 font-medium">
          Đối chiếu song song: <b>Phân loại</b> &bull; <b>Giai đoạn &amp; Mục tiêu</b> &bull; <b>Phác đồ &amp; Y lệnh</b> &bull; <b>Theo dõi LS &amp; CLS</b>
        </p>

        {/* Thanh tiến độ và các nút tác vụ */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Progress bar */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs text-xs">
            <span className="font-bold text-slate-700 hidden sm:inline">Tiến độ:</span>
            <div className="w-24 sm:w-32 bg-slate-200 rounded-full h-2 overflow-hidden">
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
      <div className="px-4">
        <SafePrescribingDdiPanel
          prescribedDrugNames={allPrescribedDrugNames || []}
          prescribedDrugs={allPrescribedDrugNames || []}
          patientAge={patientAge}
          patientGender={patientGender}
          patientCreatinine={patientCreatinine}
          onOpenVaultDrawer={onOpenVaultDrawer}
        />
      </div>

      {/* 2. BẢNG 4 CỘT CHUẨN HOÁ */}
      <div className="overflow-x-auto px-4 pb-4">
        <table className="w-full text-left border-collapse text-xs border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
          <thead>
            <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200 font-bold uppercase tracking-wider text-[11px]">
              <th className="p-3 w-[18%] min-w-[170px] border-r border-slate-200">
                1. Phân loại (Mức độ / Phân tầng)
              </th>
              <th className="p-3 w-[22%] min-w-[200px] border-r border-slate-200">
                2. Giai đoạn &amp; Mục tiêu
              </th>
              <th className="p-3 w-[36%] min-w-[300px] border-r border-slate-200">
                3. Phác đồ &amp; Y lệnh (Thuốc &amp; Xử trí)
              </th>
              <th className="p-3 w-[24%] min-w-[220px]">
                4. Theo dõi (Lâm sàng &amp; Cận lâm sàng)
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {timelinePhases.length > 0 ? (
              timelinePhases.map((phase, pIdx) => {
                const rawMonitoring = Array.isArray(phase?.monitoring)
                  ? phase.monitoring
                  : Array.isArray((phase as any)?.monitoringLabs)
                  ? (phase as any).monitoringLabs.map((l: any) => ({
                      type: 'CLS' as const,
                      metric: l.labName || l.metric || 'Xét nghiệm',
                      frequency: l.frequency || 'Theo dõi',
                      target: l.target || '',
                    }))
                  : [];
                const lsItems = rawMonitoring.filter(
                  (m) =>
                    m &&
                    (m.type === 'LS' ||
                      (!m.type &&
                        /sinh hiệu|mạch|huyết áp|thân nhiệt|tri giác|nước tiểu|thở|curb|khám|ban/i.test(
                          m.metric || ''
                        )))
                );
                const clsItems = rawMonitoring.filter(
                  (m) =>
                    m &&
                    (m.type === 'CLS' ||
                      (!m.type &&
                        !/sinh hiệu|mạch|huyết áp|thân nhiệt|tri giác|nước tiểu|thở|curb|khám|ban/i.test(
                          m.metric || ''
                        )))
                );

                return (
                  <tr key={phase.id || pIdx} className="hover:bg-slate-50/50 transition-colors align-top">
                    {/* Cột 1: Phân loại */}
                    <td className="p-3 border-r border-slate-200 bg-slate-50/40">
                      <div className="flex flex-col gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold border inline-block max-w-fit ${severityColorClass()}`}
                        >
                          {activeSeverityGrade?.grade ? activeSeverityGrade.grade.split(':')[0] : 'Phân tầng hiện tại'}
                        </span>
                        <div className="text-xs font-bold text-slate-900 leading-snug">
                          {activeSeverityGrade?.grade || 'Mức độ tiêu chuẩn'}
                        </div>
                        {activeSeverityGrade?.triage && (
                          <div className="text-[11px] text-slate-600 bg-white p-1.5 rounded border border-slate-200">
                            <b>Tuyến:</b> {activeSeverityGrade.triage}
                          </div>
                        )}
                        {activeSeverityGrade?.criteria && (
                          <p className="text-[11px] text-slate-500 line-clamp-3">
                            {activeSeverityGrade.criteria}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Cột 2: Giai đoạn & Mục tiêu */}
                    <td className="p-3 border-r border-slate-200">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold font-mono-custom bg-blue-100 text-blue-900 border border-blue-200">
                            {phase.dayRange}
                          </span>
                        </div>
                        <h5 className="font-bold text-xs text-slate-900 leading-snug">
                          {phase.phaseName}
                        </h5>
                        <div className="p-2 bg-blue-50/50 rounded border border-blue-100 text-[11px] text-blue-950 leading-relaxed">
                          <span className="font-bold text-blue-900 block mb-0.5">
                            🎯 Mục tiêu lâm sàng:
                          </span>
                          <span>{phase.clinicalGoal}</span>
                        </div>
                      </div>
                    </td>

                    {/* Cột 3: Phác đồ & Y lệnh */}
                    <td className="p-3 border-r border-slate-200">
                      <div className="flex flex-col gap-2">
                        {/* Treatments from phase */}
                        {(Array.isArray(phase?.treatments) ? phase.treatments : []).map((tr: any, tIdx: number) => {
                          const title = tr.category || tr.title || 'Can thiệp';
                          const content = tr.content || tr.detail || '';
                          const key = `phase-${phase.id}-${tIdx}`;
                          const isChecked = checkedOrders.has(key);

                          return (
                            <div
                              key={tIdx}
                              onClick={() => onToggleOrder(key)}
                              className={`p-2 rounded-md border text-xs leading-relaxed flex items-start gap-2 cursor-pointer transition-colors ${
                                isChecked
                                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium'
                                  : tr.isHighlighted
                                  ? 'bg-amber-50/70 border-amber-300 text-amber-950 font-medium'
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
                                  <span className={`font-bold text-xs ${isChecked ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                                    {title}
                                  </span>
                                  {tr.timing && (
                                    <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 text-[10px] font-mono-custom">
                                      {tr.timing}
                                    </span>
                                  )}
                                </div>
                                <p className={`text-[11.5px] ${isChecked ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                                  {content}
                                </p>
                              </div>
                            </div>
                          );
                        })}

                        {/* If this is the first phase, also display standard drug orders if any */}
                        {pIdx === 0 && phacDo.thuoc.length > 0 && (
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
                                      <span className={`font-bold text-xs ${isChecked ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                                        {drug}
                                      </span>
                                      <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-blue-50 text-blue-800 border border-blue-200">
                                        BHYT
                                      </span>
                                    </div>
                                    <div className={`text-[11px] text-slate-600 ${isChecked ? 'line-through text-slate-400' : ''}`}>
                                      <b>Liều:</b> {dose} {note && <span>&bull; <i>{note}</i></span>}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Custom orders added by BS */}
                        {pIdx === 0 && customOrders.length > 0 && (
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
                                    <div className={`font-bold text-xs ${co.completed ? 'line-through text-slate-400' : ''}`}>
                                      {co.drug}
                                    </div>
                                    <div className={`text-[11px] text-slate-600 ${co.completed ? 'line-through text-slate-400' : ''}`}>
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
                      </div>
                    </td>

                    {/* Cột 4: Theo dõi LS & CLS */}
                    <td className="p-3">
                      <div className="flex flex-col gap-2.5">
                        {/* Lâm sàng (LS) */}
                        {lsItems.length > 0 && (
                          <div>
                            <span className="font-bold text-[10.5px] uppercase tracking-wider text-blue-900 flex items-center gap-1 mb-1">
                              <Activity className="w-3 h-3 text-blue-600" />
                              <span>Lâm sàng &amp; Sinh hiệu</span>
                            </span>
                            <div className="space-y-1">
                              {lsItems.map((m, mIdx) => (
                                <div
                                  key={mIdx}
                                  className="p-1.5 bg-blue-50/40 rounded border border-blue-100 text-[11px] text-slate-800 leading-snug"
                                >
                                  <div className="flex items-center justify-between gap-1 font-semibold">
                                    <span>{m.metric}</span>
                                    <span className="px-1 py-0.2 rounded bg-blue-100 text-blue-800 text-[9.5px] font-mono-custom">
                                      {m.frequency}
                                    </span>
                                  </div>
                                  {m.target && (
                                    <div className="text-[10px] text-slate-600 italic mt-0.5">
                                      Đích: {m.target}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Cận lâm sàng (CLS) */}
                        {clsItems.length > 0 && (
                          <div>
                            <span className="font-bold text-[10.5px] uppercase tracking-wider text-purple-900 flex items-center gap-1 mb-1">
                              <span className="w-2 h-2 rounded-full bg-purple-600" />
                              <span>Cận lâm sàng &amp; Xét nghiệm</span>
                            </span>
                            <div className="space-y-1">
                              {clsItems.map((m, mIdx) => (
                                <div
                                  key={mIdx}
                                  className="p-1.5 bg-purple-50/40 rounded border border-purple-100 text-[11px] text-slate-800 leading-snug"
                                >
                                  <div className="flex items-center justify-between gap-1 font-semibold">
                                    <span>{m.metric}</span>
                                    <span className="px-1 py-0.2 rounded bg-purple-100 text-purple-800 text-[9.5px] font-mono-custom">
                                      {m.frequency}
                                    </span>
                                  </div>
                                  {m.target && (
                                    <div className="text-[10px] text-slate-600 italic mt-0.5">
                                      Đích: {m.target}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              /* Fallback khi không có timelinePhases */
              <tr className="align-top">
                <td className="p-3 border-r border-slate-200 bg-slate-50/40">
                  <div className="flex flex-col gap-2">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold border inline-block max-w-fit ${severityColorClass()}`}>
                      {activeSeverityGrade?.grade ? activeSeverityGrade.grade.split(':')[0] : 'Phân độ tiêu chuẩn'}
                    </span>
                    <div className="text-xs font-bold text-slate-900">
                      {activeSeverityGrade?.grade || 'Mức độ tiêu chuẩn'}
                    </div>
                    {activeSeverityGrade?.triage && (
                      <div className="text-[11px] text-slate-600 bg-white p-1.5 rounded border border-slate-200">
                        <b>Tuyến:</b> {activeSeverityGrade.triage}
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-3 border-r border-slate-200">
                  <div className="flex flex-col gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold font-mono-custom bg-blue-100 text-blue-900 border border-blue-200 max-w-fit">
                      Giai đoạn cấp
                    </span>
                    <div className="p-2 bg-blue-50/50 rounded border border-blue-100 text-[11px] text-blue-950">
                      <span className="font-bold block mb-0.5">🎯 Mục tiêu:</span>
                      <span>{activeSeverityGrade?.targetVitals || 'Ổn định huyết động, kiểm soát triệu chứng cấp tính.'}</span>
                    </div>
                  </div>
                </td>
                <td className="p-3 border-r border-slate-200">
                  <div className="flex flex-col gap-2">
                    {/* Quy trình xử trí ban đầu */}
                    {phacDo.tuyen.map((step, idx) => {
                      const key = `tuyen-${diseaseId}-g${selectedGradeIdx}-${idx}`;
                      const isChecked = checkedOrders.has(key);
                      return (
                        <div
                          key={idx}
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
                          <span className={`text-xs ${isChecked ? 'line-through text-slate-400' : ''}`}>
                            {step}
                          </span>
                        </div>
                      );
                    })}

                    {/* Y lệnh thuốc */}
                    {phacDo.thuoc.map(([drug, dose, note], idx) => {
                      const key = `thuoc-${diseaseId}-g${selectedGradeIdx}-${idx}`;
                      const isChecked = checkedOrders.has(key);
                      return (
                        <div
                          key={idx}
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
                              <span className={`font-bold text-xs ${isChecked ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                                {drug}
                              </span>
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-blue-50 text-blue-800 border border-blue-200">
                                BHYT
                              </span>
                            </div>
                            <div className={`text-[11px] text-slate-600 ${isChecked ? 'line-through text-slate-400' : ''}`}>
                              <b>Liều:</b> {dose} {note && <span>&bull; <i>{note}</i></span>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </td>
                <td className="p-3">
                  <div className="space-y-1.5">
                    {phacDo.theoDoi.map((item, idx) => {
                      const key = `theodoi-${diseaseId}-g${selectedGradeIdx}-${idx}`;
                      const isChecked = checkedOrders.has(key);
                      return (
                        <div
                          key={idx}
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
                          <span className={`text-[11.5px] ${isChecked ? 'line-through text-slate-400' : ''}`}>
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
