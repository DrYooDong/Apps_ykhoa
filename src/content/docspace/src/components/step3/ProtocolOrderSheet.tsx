import React, { useState } from 'react';
import {
  Check,
  Clock,
  Droplets,
  Pill,
  Plus,
  ShieldAlert,
  Sparkles,
  Syringe,
  Trash2,
  Zap,
} from 'lucide-react';
import { SafePrescribingDdiPanel } from '../SafePrescribingDdiPanel.tsx';

export interface CustomOrder {
  id: string;
  drug: string;
  dosage: string;
  note: string;
  completed: boolean;
}

interface ProtocolOrderSheetProps {
  diseaseId: string;
  selectedGradeIdx: number;
  standardDrugs: Array<[string, string, string]>;
  customOrders: CustomOrder[];
  checkedOrders: Set<string>;
  onToggleOrder: (key: string) => void;
  onToggleCustomOrder: (id: string) => void;
  onAddCustomOrder: (order: { drug: string; dosage: string; note: string }) => void;
  onRemoveCustomOrder: (id: string) => void;
  allPrescribedDrugNames: string[];
  patientAge?: string;
  patientGender?: string;
  patientCreatinine?: string;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
  onOpenCdssModal?: (tool: 'dengue' | 'ecg' | 'abg' | 'xray' | 'hepa' | 'neuro' | 'microbio' | 'antibiotic' | 'vancomycin' | 'hub') => void;
}

export const ProtocolOrderSheet: React.FC<ProtocolOrderSheetProps> = ({
  diseaseId,
  selectedGradeIdx,
  standardDrugs,
  customOrders,
  checkedOrders,
  onToggleOrder,
  onToggleCustomOrder,
  onAddCustomOrder,
  onRemoveCustomOrder,
  allPrescribedDrugNames,
  patientAge,
  patientGender,
  patientCreatinine,
  onOpenVaultDrawer,
  onOpenCdssModal,
}) => {
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [newDrug, setNewDrug] = useState('');
  const [newDosage, setNewDosage] = useState('');
  const [newNote, setNewNote] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
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
    setShowAddCustom(false);
  };

  return (
    <div className="space-y-3.5">
      <div className="flex justify-end mb-1">
        <button
          type="button"
          onClick={() => setShowAddCustom(!showAddCustom)}
          className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Thêm y lệnh thuốc khác</span>
        </button>
      </div>

      {/* Custom order inline add form */}
      {showAddCustom && (
        <form
          onSubmit={handleFormSubmit}
          className="p-3 bg-blue-50/60 border border-blue-200 rounded-lg flex flex-col sm:flex-row gap-2 items-end animate-fadeIn text-xs"
        >
          <div className="flex-1 w-full">
            <label className="block font-semibold text-slate-700 mb-1">Tên thuốc / Hoạt chất</label>
            <input
              type="text"
              required
              value={newDrug}
              onChange={(e) => setNewDrug(e.target.value)}
              placeholder="VD: Paracetamol, Pantoprazol, Furosemid..."
              className="w-full border border-slate-200 rounded p-1.5 bg-white text-xs text-slate-800"
            />
          </div>
          <div className="flex-1 w-full">
            <label className="block font-semibold text-slate-700 mb-1">Liều & Đường dùng</label>
            <input
              type="text"
              value={newDosage}
              onChange={(e) => setNewDosage(e.target.value)}
              placeholder="VD: 500 mg TTM x 3 lần/ngày..."
              className="w-full border border-slate-200 rounded p-1.5 bg-white text-xs text-slate-800"
            />
          </div>
          <div className="flex-1 w-full">
            <label className="block font-semibold text-slate-700 mb-1">Ghi chú điều kiện</label>
            <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="VD: Khi sốt >= 38.5°C..."
              className="w-full border border-slate-200 rounded p-1.5 bg-white text-xs text-slate-800"
            />
          </div>
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <button
              type="submit"
              className="px-3 py-1.5 bg-blue-600 text-white font-semibold rounded text-xs hover:bg-blue-700 cursor-pointer shadow-xs whitespace-nowrap"
            >
              Thêm y lệnh
            </button>
            <button
              type="button"
              onClick={() => setShowAddCustom(false)}
              className="px-2.5 py-1.5 bg-white border border-slate-200 text-slate-600 rounded text-xs hover:bg-slate-100 cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </form>
      )}

      {/* Order Sheet Summary Stats Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-lg text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700 dark:text-slate-200">Tổng danh mục y lệnh:</span>
          <span className="px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
            {standardDrugs.length + customOrders.length} mục
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-600 dark:text-slate-300">
            Đã duyệt: <strong className="text-emerald-600 dark:text-emerald-400">{checkedOrders.size + customOrders.filter(c => c.completed).length}</strong>/{standardDrugs.length + customOrders.length}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="inline-flex items-center gap-1 text-cyan-700 dark:text-cyan-400">
            <Droplets className="w-3 h-3" /> Dịch truyền: {standardDrugs.filter(([d, ds, n]) => `${d} ${ds} ${n}`.toLowerCase().match(/ringer|lactat|nacl|natri|dextran|cao phân tử|gelafundin|hct|huyết tương|tiểu cầu|máu|ml\/kg|dịch truyền/)).length}
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400">
            <Pill className="w-3 h-3" /> Thuốc: {standardDrugs.filter(([d, ds, n]) => !`${d} ${ds} ${n}`.toLowerCase().match(/ringer|lactat|nacl|natri|dextran|cao phân tử|gelafundin|hct|huyết tương|tiểu cầu|máu|ml\/kg|dịch truyền/)).length}
          </span>
          {customOrders.length > 0 && (
            <>
              <span>•</span>
              <span className="inline-flex items-center gap-1 text-indigo-700 dark:text-indigo-400">
                <Sparkles className="w-3 h-3" /> Y lệnh BS: {customOrders.length}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Medical Order Table */}
      {(() => {
        const isFluidOrResus = (drugName: string, dosageStr: string, noteStr: string) => {
          const text = `${drugName} ${dosageStr} ${noteStr}`.toLowerCase();
          return Boolean(
            text.match(/ringer|lactat|nacl|natri|dextran|cao phân tử|gelafundin|hct|huyết tương|tiểu cầu|máu|ml\/kg|dịch truyền/)
          );
        };

        const standardWithIdx = standardDrugs.map(([drug, dosage, note], idx) => ({
          drug,
          dosage,
          note,
          originalIdx: idx,
          isFluid: isFluidOrResus(drug, dosage, note),
        }));

        const fluids = standardWithIdx.filter((item) => item.isFluid);
        const medications = standardWithIdx.filter((item) => !item.isFluid);

        const renderDrugRow = (
          item: { drug: string; dosage: string; note: string; originalIdx: number; isFluid: boolean },
          groupType: 'fluid' | 'med'
        ) => {
          const key = `thuoc-${diseaseId}-g${selectedGradeIdx}-${item.originalIdx}`;
          const isChecked = checkedOrders.has(key);
          const isInjectable =
            item.dosage.toLowerCase().includes('tm') ||
            item.dosage.toLowerCase().includes('ttm') ||
            item.dosage.toLowerCase().includes('tiêm') ||
            item.dosage.toLowerCase().includes('tdd');
          const isUrgent =
            item.note.toLowerCase().includes('sốc') ||
            item.note.toLowerCase().includes('tái sốc') ||
            item.note.toLowerCase().includes('khẩn') ||
            item.dosage.toLowerCase().includes('bolus') ||
            item.dosage.toLowerCase().includes('15-20 ml');

          return (
            <tr
              key={item.originalIdx}
              onClick={() => onToggleOrder(key)}
              className={`cursor-pointer transition-colors ${
                isChecked
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/30'
                  : groupType === 'fluid'
                  ? 'hover:bg-cyan-50/50 dark:hover:bg-cyan-950/20'
                  : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/50'
              }`}
            >
              <td className="p-2.5 text-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </td>
              <td className="p-2.5 font-bold text-slate-900 dark:text-slate-100">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {groupType === 'fluid' ? (
                    <Droplets className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                  ) : isInjectable ? (
                    <Syringe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  ) : (
                    <Pill className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  )}
                  <span className={isChecked ? 'line-through text-slate-400 dark:text-slate-500' : ''}>
                    {item.drug}
                  </span>
                  {isUrgent && (
                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                      <Zap className="w-2.5 h-2.5" /> STAT
                    </span>
                  )}
                </div>
              </td>
              <td className="p-2.5 font-mono-custom text-slate-800 dark:text-slate-200">
                <span
                  className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                    groupType === 'fluid'
                      ? 'bg-cyan-50 text-cyan-900 dark:bg-cyan-950/60 dark:text-cyan-200 border border-cyan-200 dark:border-cyan-800'
                      : isInjectable
                      ? 'bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                      : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {item.dosage}
                </span>
              </td>
              <td className="p-2.5 text-slate-600 dark:text-slate-300 italic">
                {item.note || 'Theo phác đồ chuẩn'}
              </td>
              <td className="p-2.5 text-center">
                {isChecked ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                    <Check className="w-3 h-3" />
                    Đã y lệnh
                  </span>
                ) : (
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10.5px] bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    Chờ duyệt
                  </span>
                )}
              </td>
            </tr>
          );
        };

        return (
          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-lg shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 font-semibold">
                  <th className="p-2.5 w-10 text-center">Y lệnh</th>
                  <th className="p-2.5">Tên thuốc / Hoạt chất</th>
                  <th className="p-2.5">Liều lượng & Đường dùng</th>
                  <th className="p-2.5">Điều kiện / Ghi chú</th>
                  <th className="p-2.5 w-24 text-center">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {/* 1. FLUID & VOLUME RESUSCITATION GROUP */}
                {fluids.length > 0 && (
                  <>
                    <tr className="bg-cyan-50/70 dark:bg-cyan-950/40 border-y border-cyan-200/80 dark:border-cyan-800/60 font-semibold text-cyan-900 dark:text-cyan-200">
                      <td colSpan={5} className="py-1.5 px-3">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                            <Droplets className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                            Dịch truyền & Hồi sức thể tích ({fluids.length})
                          </span>
                          <span className="text-[10.5px] font-normal text-cyan-700 dark:text-cyan-300 italic">
                            Theo dõi tốc độ & Hct sát sao
                          </span>
                        </div>
                      </td>
                    </tr>
                    {fluids.map((item) => renderDrugRow(item, 'fluid'))}
                  </>
                )}

                {/* 2. MEDICATIONS GROUP */}
                {medications.length > 0 && (
                  <>
                    <tr className="bg-amber-50/70 dark:bg-amber-950/40 border-y border-amber-200/80 dark:border-amber-800/60 font-semibold text-amber-900 dark:text-amber-200">
                      <td colSpan={5} className="py-1.5 px-3">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                            <Pill className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                            Thuốc điều trị triệu chứng & Đặc hiệu ({medications.length})
                          </span>
                          <span className="text-[10.5px] font-normal text-amber-700 dark:text-amber-300 italic">
                            Kiểm soát sốt, niêm mạc & bảo vệ tạng
                          </span>
                        </div>
                      </td>
                    </tr>
                    {medications.map((item) => renderDrugRow(item, 'med'))}
                  </>
                )}

                {/* 3. DOCTOR'S CUSTOM ORDERS GROUP */}
                {customOrders.length > 0 && (
                  <>
                    <tr className="bg-indigo-50/70 dark:bg-indigo-950/40 border-y border-indigo-200/80 dark:border-indigo-800/60 font-semibold text-indigo-900 dark:text-indigo-200">
                      <td colSpan={5} className="py-1.5 px-3">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide">
                            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                            Y lệnh bổ sung của Bác sĩ điều trị ({customOrders.length})
                          </span>
                          <span className="text-[10.5px] font-normal text-indigo-700 dark:text-indigo-300 italic">
                            Cá thể hóa theo ca bệnh
                          </span>
                        </div>
                      </td>
                    </tr>
                    {customOrders.map((co) => (
                      <tr
                        key={co.id}
                        onClick={() => onToggleCustomOrder(co.id)}
                        className={`cursor-pointer transition-colors ${
                          co.completed
                            ? 'bg-emerald-50/70 dark:bg-emerald-950/30'
                            : 'hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30'
                        }`}
                      >
                        <td className="p-2.5 text-center">
                          <input
                            type="checkbox"
                            checked={co.completed}
                            onChange={() => {}}
                            className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </td>
                        <td className="p-2.5 font-bold text-slate-900 dark:text-slate-100">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] px-1 bg-indigo-600 text-white rounded font-mono-custom font-semibold">
                              BS
                            </span>
                            <span className={co.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}>
                              {co.drug}
                            </span>
                          </div>
                        </td>
                        <td className="p-2.5 font-mono-custom text-slate-800 dark:text-slate-200">
                          <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800 font-semibold text-[11px]">
                            {co.dosage}
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-600 dark:text-slate-300 italic">
                          <div className="flex items-center justify-between gap-1">
                            <span>{co.note}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onRemoveCustomOrder(co.id);
                              }}
                              className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                              title="Xóa y lệnh tùy biến này"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="p-2.5 text-center">
                          {co.completed ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                              <Check className="w-3 h-3" />
                              Đã y lệnh
                            </span>
                          ) : (
                            <span className="inline-block px-2 py-0.5 rounded-full text-[10.5px] bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                              Chờ duyệt
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        );
      })()}

      {/* Safe Prescription & Clinical Decision Helpers */}
      <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
          <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
          <span>Trợ thủ an toàn kê đơn & Quy tắc BHYT:</span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => {
              if (onOpenCdssModal) {
                onOpenCdssModal('antibiotic');
              } else {
                onOpenVaultDrawer?.(undefined, 'kháng sinh', 'CDSS');
              }
            }}
            className="px-2.5 py-1 flex items-center gap-1.5 rounded bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-300 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
            title="Mở CDSS Quản Lý Liều Kháng Sinh & Suy Thận (WHO AWaRe & Sanford)"
            aria-label="Tính liều KS eGFR & PK/PD"
          >
            <Pill className="w-3.5 h-3.5 text-sky-600" />
            <span>⚡ Tính Liều Kháng Sinh (CDSS)</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenVaultDrawer?.(undefined, 'Cockcroft', 'CC')}
            className="w-7 h-7 flex items-center justify-center rounded bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs transition-colors cursor-pointer shadow-2xs"
            title="Công thức Cockcroft-Gault & CKD-EPI trong Kho Công cụ"
            aria-label="Độ thanh thải Cockcroft-Gault"
          >
            <span>🧮</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenVaultDrawer?.(undefined, 'Insulin', 'CC')}
            className="w-7 h-7 flex items-center justify-center rounded bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs transition-colors cursor-pointer shadow-2xs"
            title="Phác đồ Insulin Sliding Scale trong Kho Công cụ"
            aria-label="Insulin Sliding Scale"
          >
            <span>💉</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenVaultDrawer?.(undefined, 'bẫy lỗi', 'ICD10')}
            className="w-7 h-7 flex items-center justify-center rounded bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 text-xs transition-colors cursor-pointer shadow-2xs"
            title="Sổ tay 50+ bẫy lỗi xuất toán BHYT trong Kho ICD-10"
            aria-label="Bẫy lỗi xuất toán BHYT"
          >
            <span>🏷️</span>
          </button>
        </div>
      </div>

      {/* Safe Prescribing DDI & eGFR Sentinel Panel (Kho DUOC) */}
      <div className="mt-3">
        <SafePrescribingDdiPanel
          prescribedDrugNames={allPrescribedDrugNames}
          patientAge={patientAge}
          patientGender={patientGender}
          patientCreatinine={patientCreatinine}
          onOpenVaultDrawer={onOpenVaultDrawer}
        />
      </div>
    </div>
  );
};
