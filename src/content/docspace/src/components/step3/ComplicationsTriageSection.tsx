import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  Droplets,
  Pill,
  Plus,
  ShieldAlert,
  Wind,
  Zap,
} from 'lucide-react';
import { DiseaseComplicationItem } from '../../../data/diagnostic-criteria-database.ts';
import { ComplicationSentinelPanel } from '../ComplicationSentinelPanel.tsx';
import { LabsState, VitalsState } from '../../types.ts';

interface ComplicationsTriageSectionProps {
  diseaseId: string;
  diseaseName: string;
  activeComplications: DiseaseComplicationItem[];
  activeComplicationIndices: Set<number>;
  onToggleComplication: (idx: number) => void;
  onAddComplicationOrder: (comp: DiseaseComplicationItem) => void;
  onAddPreventionOrder?: (drug: string, dosage: string, note: string) => void;
  vitals?: VitalsState;
  labs?: LabsState;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
}

// Helper phân tách dấu hiệu cảnh báo thành các chip lâm sàng tương tác
function parseWarningSignsList(text: string): { label: string; isHighAlert: boolean }[] {
  if (!text) return [];
  const parts = text
    .split(/[,;]\s+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return parts.map((part) => {
    const isHighAlert =
      /(HA=0|M=0|CRT\s*>\s*3|Hct\s*>\s*50%|SpO2\s*<\s*92%|AST.*>=|ALT.*>=|GCS\s*<\s*12|pH\s*<\s*7|toan|ngưng|hôn mê|sốc mất bù|khó thở|co giật)/i.test(
        part
      );
    return { label: part, isHighAlert };
  });
}

// Helper phân tách các bước xử trí lâm sàng tương tác
function parseActionStepsList(text: string): { stepNum: number; actionText: string; category: 'resus' | 'fluid' | 'drug' | 'eval' }[] {
  if (!text) return [];
  const rawSteps = text
    .split(/;\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return rawSteps.map((step, idx) => {
    let category: 'resus' | 'fluid' | 'drug' | 'eval' = 'eval';
    if (/oxy|thở|nội khí quản|CPAP|thông khí/i.test(step)) {
      category = 'resus';
    } else if (/Ringer|dịch|Dextran|cao phân tử|bơm|xả|bù dịch/i.test(step)) {
      category = 'fluid';
    } else if (/tiêm|truyền|liều|thuốc|Paracetamol|Furosemide|Diazepam|Noradrenaline|Lactulose|Vitamin|Albumin|Esomeprazole/i.test(step)) {
      category = 'drug';
    }
    return {
      stepNum: idx + 1,
      actionText: step,
      category,
    };
  });
}

export const ComplicationsTriageSection: React.FC<ComplicationsTriageSectionProps> = ({
  diseaseId,
  diseaseName,
  activeComplications,
  activeComplicationIndices,
  onToggleComplication,
  onAddComplicationOrder,
  onAddPreventionOrder,
  vitals,
  labs,
  onOpenVaultDrawer,
}) => {
  if (activeComplications.length === 0) {
    return (
      <p className="text-xs text-slate-500 italic">
        Chưa phát hiện biến chứng cấp tính cần can thiệp khẩn cho bệnh lý này.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {activeComplications.map((comp, cIdx) => {
          const isChecked = activeComplicationIndices.has(cIdx);
          return (
            <div
              key={cIdx}
              className={`p-3.5 rounded-lg border transition-all flex flex-col justify-between ${
                isChecked
                  ? 'bg-rose-50/80 border-rose-300 text-rose-950 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <label className="flex items-start gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggleComplication(cIdx)}
                      className="mt-0.5 rounded text-rose-600 cursor-pointer"
                    />
                    <span className="font-bold text-xs sm:text-sm">{comp.name}</span>
                  </label>
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-slate-100 text-slate-600 shrink-0 font-semibold">
                    {comp.timeframe === 'acute_24h' ? 'Cấp tính 24h' : 'Bán cấp 7 ngày'}
                  </span>
                </div>

                <div className="space-y-2.5 pl-6 text-xs">
                  {/* Dấu hiệu cảnh báo dạng Chips tương tác */}
                  <div>
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1 mb-1.5">
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                      <span>Dấu hiệu cảnh báo nhận diện:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {parseWarningSignsList(comp.warningSigns).map((sign, sIdx) => (
                        <span
                          key={sIdx}
                          className={`px-2 py-0.5 rounded text-[11px] transition-all ${
                            sign.isHighAlert
                              ? 'bg-rose-100 text-rose-900 border border-rose-300 font-semibold shadow-2xs'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {sign.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quy trình xử trí từng bước tương tác */}
                  <div>
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1 mb-1.5">
                      <Zap className="w-3 h-3 text-blue-500" />
                      <span>Quy trình xử trí từng bước:</span>
                    </div>
                    <div className="space-y-1.5">
                      {parseActionStepsList(comp.preventiveAction).map((step, stIdx) => {
                        const isFluid = step.category === 'fluid';
                        const isResus = step.category === 'resus';
                        const isDrug = step.category === 'drug';

                        return (
                          <div
                            key={stIdx}
                            className={`p-2 rounded-md border text-[11.5px] leading-relaxed flex items-start gap-2 transition-all ${
                              isResus
                                ? 'bg-blue-50/60 border-blue-200 text-blue-950'
                                : isFluid
                                ? 'bg-cyan-50/50 border-cyan-200 text-cyan-950'
                                : isDrug
                                ? 'bg-purple-50/50 border-purple-200 text-purple-950'
                                : 'bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                          >
                            <span
                              className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                                isResus
                                  ? 'bg-blue-600 text-white'
                                  : isFluid
                                  ? 'bg-cyan-600 text-white'
                                  : isDrug
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-slate-600 text-white'
                              }`}
                            >
                              {step.stepNum}
                            </span>
                            <div className="flex-1">{step.actionText}</div>
                            {isResus && <Wind className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />}
                            {isFluid && <Droplets className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />}
                            {isDrug && <Pill className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {isChecked && (
                <div className="mt-2.5 pt-2 border-t border-rose-200/80 flex flex-col gap-2">
                  <div className="bg-red-600 text-white rounded p-2 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
                    <AlertOctagon className="w-4 h-4 shrink-0" />
                    <span>LỆNH TRỰC: {comp.onCallAlertText}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddComplicationOrder(comp)}
                    className="self-start px-2.5 py-1 bg-white hover:bg-rose-100 text-rose-700 border border-rose-300 rounded text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                  >
                    <Plus className="w-3 h-3" />
                    <span>
                      {comp.orderSet && comp.orderSet.length > 0
                        ? `⚡ Nạp trọn bộ Y Lệnh Cấp Cứu (${comp.orderSet.length} y lệnh)`
                        : 'Nạp y lệnh xử trí biến chứng này vào đơn'}
                    </span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ComplicationSentinelPanel */}
      <div className="mt-3 pt-3 border-t border-rose-200">
        <ComplicationSentinelPanel
          diseaseId={diseaseId}
          diseaseName={diseaseName}
          vitals={vitals}
          labs={labs}
          onAddPreventionOrder={onAddPreventionOrder}
          onOpenVaultDrawer={onOpenVaultDrawer}
        />
      </div>
    </div>
  );
};
