import React, { useMemo } from 'react';
import { Stethoscope } from 'lucide-react';
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
import { ClinicalReasoningPanel } from './step2/ClinicalReasoningPanel.tsx';

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
            {/* KHỐI BIỆN LUẬN LÂM SÀNG TOÀN DIỆN (CARD HÌNH 1 NÂNG CẤP ĐỘC TÔN) */}
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
              onGoToProtocol={onGoToProtocol}
              onPrintReport={onPrintReport}
            />
          </div>
        )
      )}
    </div>
  );
};
