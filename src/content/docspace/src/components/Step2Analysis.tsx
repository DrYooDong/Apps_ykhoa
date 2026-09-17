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
  Users,
} from 'lucide-react';
import {
  AnalysisResult,
  ClinicalFormState,
  EpidemiologyContext,
  KnowledgeBase,
  LabsState,
  ProblemStatementEntry,
  VitalsState,
} from '../types.ts';
import {
  DIAGNOSTIC_CHAIN_DATABASE,
  DiseaseReactionChainDefinition,
} from '../../data/diagnostic-criteria-database.ts';
import { ParallelActionBoard } from './step2/ParallelActionBoard.tsx';
import { RiskScoreTriagePanel } from './step2/RiskScoreTriagePanel.tsx';
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
}) => {
  const top = results && results.length > 0 ? results[0] : null;

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
      {/* Telemetry Bar & Summary Stats */}
      <div className="bg-white border border-slate-200 rounded-xl p-3 px-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-800 rounded-lg text-xs font-semibold border border-blue-200">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>{results.length} chẩn đoán khả dĩ</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 text-slate-700 rounded-lg text-xs font-medium border border-slate-200">
            <span>Dữ kiện:</span>
            <b className="text-slate-900">{selectedCount} đã chọn</b>
            {derivedCount > 0 && (
              <span className="text-emerald-700 font-medium">· +{derivedCount} suy luận</span>
            )}
            {negatedCount > 0 && (
              <span className="text-rose-700 font-medium">· -{negatedCount} phủ định</span>
            )}
          </div>

          {epiContext && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 text-purple-800 rounded-lg text-xs font-medium border border-purple-200">
              <Users className="w-3.5 h-3.5 text-purple-600" />
              <span>Dịch tễ: {epiContext.ageYears ? `${epiContext.ageYears} tuổi` : ''} ({epiContext.area || 'Toàn quốc'})</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrintReport}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-lg cursor-pointer transition-colors shadow-2xs"
            title="In tóm tắt ca bệnh & chẩn đoán ra PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In báo cáo / PDF</span>
          </button>
        </div>
      </div>

      {/* Primary Problem Badge Banner (if set in Step 2) */}
      {primaryProblem && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-200 rounded-xl p-3 px-4 text-xs flex flex-wrap items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-[10.5px]">
              VẤN ĐỀ CHÍNH
            </span>
            <span className="font-bold text-slate-900">{primaryProblem.title}</span>
            {primaryProblem.priorityLevel && (
              <span className="text-slate-500 font-mono-custom text-[11px]">
                ({primaryProblem.priorityLevel})
              </span>
            )}
          </div>
          <span className="text-slate-500 text-[11px] italic">
            Cơ sở định hướng suy luận CDSS &amp; biện luận phân biệt
          </span>
        </div>
      )}

      {/* KHỐI 1: BẢNG HÀNH ĐỘNG ĐỒNG THỜI (PARALLEL ACTION BOARD - PGS.TS HOÀNG VĂN SĨ) */}
      <ParallelActionBoard problems={problems} />

      {/* KHỐI 2: THANG ĐIỂM NGUY CƠ & PHÂN TẦNG CẤP CỨU (ESI, PEWS, NEWS2) */}
      <RiskScoreTriagePanel
        vitals={vitals}
        labs={labs}
        form={form}
        results={results}
        onOpenVaultDrawer={onOpenVaultDrawer}
      />

      {/* KHỐI 3: KẾT QUẢ PHÂN TÍCH SUY LUẬN LÂM SÀNG CDSS */}
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
            {/* Chẩn đoán sơ bộ Hàng đầu (Lead Diagnosis Card with 4 Tabs) */}
            <LeadDiagnosisCard
              topResult={top}
              kb={kb}
              onGoToProtocol={onGoToProtocol}
              onOpenVaultDrawer={onOpenVaultDrawer}
            />

            {/* Thanh tác vụ chiến lược cho Chẩn đoán sơ bộ */}
            <div className="flex flex-wrap items-center gap-2.5 p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs">
              <button
                id="btn-goto-protocol-top"
                type="button"
                onClick={() => onGoToProtocol(top.b.id)}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-xs cursor-pointer transition-colors"
              >
                <span>Xem toàn bộ phác đồ điều trị Bước 4</span>
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

            {/* KHỐI 4: ĐỀ NGHỊ CẬN LÂM SÀNG CHIẾN LƯỢC (TARGETED DIAGNOSTIC WORKUP) */}
            <TargetedDiagnosticWorkup
              topResult={top}
              results={results}
              activeChain={activeChain}
            />

            {/* KHỐI 5: CHẨN ĐOÁN PHÂN BIỆT & ĐỐI SÁNH ĐỐI ĐẦU */}
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
