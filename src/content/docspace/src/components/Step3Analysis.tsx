import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Droplet,
  Layers,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
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

export interface Step3AnalysisProps {
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

// Backward compatibility type alias
export type Step2Props = Step3AnalysisProps;

export const Step3Analysis: React.FC<Step3AnalysisProps> = ({
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

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedConfirmDiseaseId, setSelectedConfirmDiseaseId] = useState<string>('');

  const handleOpenConfirm = () => {
    if (top) {
      setSelectedConfirmDiseaseId(top.b.id);
      setIsConfirmModalOpen(true);
    }
  };

  const handleConfirmAndProceed = () => {
    const targetId = selectedConfirmDiseaseId || (top ? top.b.id : '');
    if (targetId) {
      setIsConfirmModalOpen(false);
      onGoToProtocol(targetId);
    }
  };

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

              {/* Nút Chuyển sang Bước 4 (Có cổng xác nhận Gate chẩn đoán) */}
              <button
                type="button"
                onClick={handleOpenConfirm}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs cursor-pointer transition-all self-start sm:self-center"
              >
                <span>Xác nhận & Vào Bước 4 (Phác đồ)</span>
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

            {/* 5. MODAL XÁC NHẬN CHẨN ĐOÁN (DIAGNOSTIC CONFIRMATION GATE) */}
            {isConfirmModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-scale-up">
                  <div className="p-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-300" />
                      <h3 className="font-bold text-sm sm:text-base">
                        Xác Nhận Định Hướng Chẩn Đoán Vào Phác Đồ
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsConfirmModalOpen(false)}
                      className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-4 sm:p-5 space-y-4 text-xs">
                    <p className="text-slate-600 leading-relaxed">
                      Vui lòng xác nhận bệnh lý làm trục điều trị chính. Hệ thống sẽ cá thể hoá y lệnh, Bảng 4 Cột và kiểm tra tương tác thuốc DDI theo đúng bệnh lý được chọn:
                    </p>

                    {/* Radio group selecting among top candidates */}
                    <div className="space-y-2">
                      {results.slice(0, 4).map((r, idx) => {
                        const isSelected = selectedConfirmDiseaseId === r.b.id;
                        const isTop = idx === 0;
                        return (
                          <label
                            key={r.b.id}
                            className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                              isSelected
                                ? 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-500/20 text-blue-950 font-medium'
                                : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                            }`}
                          >
                            <input
                              type="radio"
                              name="confirmDiagnosis"
                              checked={isSelected}
                              onChange={() => setSelectedConfirmDiseaseId(r.b.id)}
                              className="mt-1 text-blue-600 focus:ring-blue-500"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                                  {r.b.ten}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded text-[10.5px] font-mono font-bold ${
                                    isTop
                                      ? 'bg-blue-600 text-white'
                                      : 'bg-slate-200 text-slate-800'
                                  }`}
                                >
                                  {r.pct}%
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                                <span>ICD-10: <strong>{r.b.icd}</strong></span>
                                <span>•</span>
                                <span>Chuyên khoa: {r.b.nhom}</span>
                                {isTop && (
                                  <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                    Sơ bộ nổi trội
                                  </span>
                                )}
                                {r.isCriticalSafetyNet && (
                                  <span className="px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 text-[10px] font-bold flex items-center gap-1">
                                    <AlertTriangle className="w-2.5 h-2.5 text-rose-600" />
                                    Cấp cứu
                                  </span>
                                )}
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsConfirmModalOpen(false)}
                      className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 bg-white border border-slate-300 rounded-lg shadow-2xs hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      Quay lại biện luận
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmAndProceed}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Xác Nhận & Mở Phác Đồ (B4)</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

// Backward compatibility export alias
export const Step2Analysis = Step3Analysis;
export default Step3Analysis;
