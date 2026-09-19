import React, { useMemo } from 'react';
import {
  Activity,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Database,
  Layers,
  Printer,
  ShieldAlert,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import {
  AnalysisResult,
  ClinicalFormState,
  EpidemiologyContext,
  KnowledgeBase,
  LabsState,
  ProblemStatementEntry,
  TrieuChung,
  VitalsState,
} from '../types.ts';
import {
  DIAGNOSTIC_CHAIN_DATABASE,
  DiseaseReactionChainDefinition,
} from '../../data/diagnostic-criteria-database.ts';
import { ClinicalReasoningPanel } from './step2/ClinicalReasoningPanel.tsx';
import { LeadDiagnosisCard } from './step2/LeadDiagnosisCard.tsx';
import { TargetedDiagnosticWorkup } from './step2/TargetedDiagnosticWorkup.tsx';
import { DifferentialDiagnosisTable } from './step2/DifferentialDiagnosisTable.tsx';

interface Step2Props {
  kb: KnowledgeBase;
  results: AnalysisResult[];
  selectedCount: number;
  derivedCount: number;
  negatedCount: number;
  onGoToProtocol: (diseaseId: string, options?: { gradeIdx?: number; complicationId?: string }) => void;
  onSaveToPostgres: () => void;
  onPrintReport: () => void;
  onOpenVaultDrawer?: (diseaseName?: string, query?: string, khoCode?: string) => void;
  vitals?: VitalsState;
  labs?: LabsState;
  form?: ClinicalFormState;
  primaryProblem?: ProblemStatementEntry;
  problems?: ProblemStatementEntry[];
  epiContext?: EpidemiologyContext;
  selectedIds?: Set<string>;
  negatedIds?: Set<string>;
  onGoToStep?: (stepId: 't1' | 't2' | 't3' | 't4') => void;
}

export const Step2Analysis: React.FC<Step2Props> = ({
  kb,
  results,
  selectedCount,
  derivedCount,
  negatedCount,
  onGoToProtocol,
  onSaveToPostgres,
  onPrintReport,
  onOpenVaultDrawer,
  vitals,
  labs,
  form,
  primaryProblem,
  problems = [],
  epiContext,
  selectedIds,
  negatedIds,
  onGoToStep,
}) => {
  const top = results && results.length > 0 ? results[0] : null;

  const selectedSymptoms: TrieuChung[] = useMemo(() => {
    if (selectedIds && selectedIds.size > 0) {
      return kb.trieuChung.filter((tc) => selectedIds.has(tc.id));
    }
    return top ? top.matched.map((m) => m.tc) : [];
  }, [kb.trieuChung, selectedIds, top]);

  const negatedSymptoms: TrieuChung[] = useMemo(() => {
    if (negatedIds && negatedIds.size > 0) {
      return kb.trieuChung.filter((tc) => negatedIds.has(tc.id));
    }
    return [];
  }, [kb.trieuChung, negatedIds]);

  // Active diagnostic chain lookup (from enriched criteria database)
  const activeChain: DiseaseReactionChainDefinition | undefined = useMemo(() => {
    if (!top) return undefined;
    if (DIAGNOSTIC_CHAIN_DATABASE[top.b.id]) {
      return DIAGNOSTIC_CHAIN_DATABASE[top.b.id];
    }
    const cleanName = top.b.ten.toLowerCase().trim();
    const cleanIcd = top.b.icd.toUpperCase().trim();
    for (const [, c] of Object.entries(DIAGNOSTIC_CHAIN_DATABASE)) {
      if (
        c.diseaseName.toLowerCase().trim() === cleanName ||
        (c.icd10 && c.icd10.toUpperCase().trim() === cleanIcd)
      ) {
        return c;
      }
    }
    return undefined;
  }, [top]);

  return (
    <div className="space-y-4">
      {/* KẾT QUẢ PHÂN TÍCH SUY LUẬN LS CDSS */}
      {results.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-xs">
          <Stethoscope className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="font-display font-bold text-base text-slate-700">
            Chưa phát hiện bệnh lý phù hợp
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
            Hệ thống chưa tìm thấy bệnh lý nào trong cơ sở tri thức phù hợp với tổ hợp triệu chứng và cận lâm sàng hiện tại. Vui lòng quay lại Bước 1 để kiểm tra và bổ sung thêm các dấu chứng định hướng.
          </p>
        </div>
      ) : (
        top && (
          <div className="space-y-4">
            {/* KHỐI 3: BIỆN LUẬN LÂM SÀNG TOÀN DIỆN (CLINICAL REASONING ENGINE - PGS.TS HOÀNG VĂN SỸ & BSCKI TRẦN THANH TUẤN) */}
            <ClinicalReasoningPanel
              topResult={top}
              results={results}
              kb={kb}
              form={form || { gioiTinh: 'nam', tuoi: '', ngheNghiep: '', lyDo: '', text: { cn: '', tt: '', tc: '', cls: '' } }}
              vitals={vitals || { vNhiet: '', vMach: '', vHATT: '', vHATTr: '', vTho: '', vSpo2: '' }}
              labs={labs || { lBC: '', lTC: '', lHct: '', lGlu: '', lTrop: '' }}
              selectedSymptoms={selectedSymptoms}
              negatedSymptoms={negatedSymptoms}
              problems={problems}
              epiContext={epiContext}
              onGoToStep={onGoToStep}
              onOpenVaultDrawer={onOpenVaultDrawer}
            />

            {/* KHỐI 4: CĐSB HÀNG ĐẦU (LEAD DIAGNOSIS CARD WITH 4 TABS) */}
            <LeadDiagnosisCard
              topResult={top}
              kb={kb}
              onGoToProtocol={onGoToProtocol}
              onOpenVaultDrawer={onOpenVaultDrawer}
            />

            {/* Thanh tác vụ chiến lược cho CĐSB */}
            <div className="flex flex-wrap items-center gap-2.5 p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <button
                id="btn-goto-protocol-top"
                type="button"
                onClick={() => onGoToProtocol(top.b.id)}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-xs cursor-pointer transition-colors"
              >
                <span>Xem toàn bộ phác đồ ĐT Bước 4</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onOpenVaultDrawer?.(top.b.ten, top.b.icd)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold text-xs rounded-lg cursor-pointer transition-colors shadow-2xs"
                title="Tra cứu bài viết & phác đồ tương ứng từ Kho tri thức 2.400+ bài viết EBM"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>Tra cứu Vault EBM</span>
              </button>

              <button
                id="btn-print-report"
                type="button"
                onClick={onPrintReport}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs rounded-lg cursor-pointer transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>In báo cáo / Tải PDF</span>
              </button>
            </div>

            {/* KHỐI 5: ĐỀ NGHỊ CLS 2 TẦNG (TARGETED & ROUTINE WORKUP - PGS.TS HOÀNG VĂN SỸ) */}
            <TargetedDiagnosticWorkup
              topResult={top}
              results={results}
              activeChain={activeChain}
              vitals={vitals}
              labs={labs}
              form={form}
              problems={problems}
              epiContext={epiContext}
            />

            {/* KHỐI 6: CĐPB & ĐỐI SÁNH ĐỐI ĐẦU */}
            <DifferentialDiagnosisTable
              results={results}
              kb={kb}
              onGoToProtocol={onGoToProtocol}
              onOpenVaultDrawer={onOpenVaultDrawer}
            />
          </div>
        )
      )}
    </div>
  );
};
