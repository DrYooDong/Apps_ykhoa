import React, { useMemo, useState } from 'react';
import {
  Activity,
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Droplet,
  Layers,
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
import { ComprehensiveDiagnosisPanel } from './step2/ComprehensiveDiagnosisPanel.tsx';
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
  // Chế độ hiển thị phân tích:
  // 'synthesis': Bộ Chẩn Đoán Toàn Diện & Phác Đồ Tương Ứng (Mặc định)
  // 'reasoning': Biện Luận Lâm Sàng & Đề Nghị Cận Lâm Sàng (ĐHYD)
  // 'both': Hiển thị liên hoàn cả hai khối
  const [analysisViewMode, setAnalysisViewMode] = useState<'synthesis' | 'reasoning' | 'both'>('synthesis');

  const top = results && results.length > 0 ? results[0] : null;

  const safeForm: ClinicalFormState = useMemo(() => {
    return form || {
      gioiTinh: 'nam',
      tuoi: '',
      ngheNghiep: '',
      lyDo: '',
      text: { cn: '', tt: '', tc: '', cls: '' },
    };
  }, [form]);

  const safeVitals: VitalsState = useMemo(() => {
    return vitals || {
      vNhiet: '',
      vMach: '',
      vHATT: '',
      vHATTr: '',
      vTho: '',
      vSpo2: '',
    };
  }, [vitals]);

  const safeLabs: LabsState = useMemo(() => {
    return labs || {
      lBC: '',
      lTC: '',
      lHct: '',
      lGlu: '',
      lTrop: '',
    };
  }, [labs]);

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
      {/* 1. MÀN HÌNH CHƯA CÓ KẾT QUẢ PHÙ HỢP */}
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
            {/* 2. THANH CHUYỂN ĐỔI CHẾ ĐỘ PHÂN TÍCH (ANALYSIS WORKSPACE SWITCHER) */}
            <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Góc nhìn phân tích:
                </span>
                <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50 text-xs">
                  <button
                    type="button"
                    onClick={() => setAnalysisViewMode('synthesis')}
                    className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      analysisViewMode === 'synthesis'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <ClipboardCheck className="w-3.5 h-3.5" />
                    <span>Bộ Chẩn Đoán & Phác Đồ Tương Ứng</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAnalysisViewMode('reasoning')}
                    className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      analysisViewMode === 'reasoning'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>Biện Luận Chi Tiết (ĐHYD)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAnalysisViewMode('both')}
                    className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer hidden md:flex items-center gap-1.5 ${
                      analysisViewMode === 'both'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Xem Toàn Bộ</span>
                  </button>
                </div>
              </div>

              {/* Nút Chuyển nhanh sang Bước 4 */}
              <button
                type="button"
                onClick={() => onGoToProtocol(top.b.id)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs cursor-pointer transition-all self-start sm:self-center"
              >
                <span>Chuyển sang Bước 4 (Phác đồ)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3. KHỐI 1: BỘ CHẨN ĐOÁN TOÀN DIỆN & PHÁC ĐỒ ĐIỀU TRỊ TƯƠNG ỨNG */}
            {(analysisViewMode === 'synthesis' || analysisViewMode === 'both') && (
              <ComprehensiveDiagnosisPanel
                topResult={top}
                results={results}
                form={safeForm}
                vitals={safeVitals}
                labs={safeLabs}
                selectedSymptoms={selectedSymptoms}
                negatedSymptoms={negatedSymptoms}
                problems={problems}
                epiContext={epiContext}
                onGoToStep={onGoToStep}
                onGoToProtocol={onGoToProtocol}
                onOpenVaultDrawer={onOpenVaultDrawer}
                onPrintReport={onPrintReport}
              />
            )}

            {/* 4. KHỐI 2: BIỆN LUẬN LÂM SÀNG ĐHYD & TIÊU CHUẨN XÁC CHẨN */}
            {(analysisViewMode === 'reasoning' || analysisViewMode === 'both') && (
              <ClinicalReasoningPanel
                topResult={top}
                results={results}
                kb={kb}
                form={safeForm}
                vitals={safeVitals}
                labs={safeLabs}
                selectedSymptoms={selectedSymptoms}
                negatedSymptoms={negatedSymptoms}
                problems={problems}
                epiContext={epiContext}
                onGoToStep={onGoToStep}
                onOpenVaultDrawer={onOpenVaultDrawer}
                onGoToProtocol={onGoToProtocol}
                onPrintReport={onPrintReport}
              />
            )}
          </div>
        )
      )}
    </div>
  );
};
